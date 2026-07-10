// submit-application — server-side intake for the VMSS entry-application form.
//
// Replaces the old client-only abuse controls (honeypot + localStorage
// cooldown in script.js, both trivially bypassed by a direct REST call) with
// real, server-enforced controls:
//
//   1. Payload shape + length validation — same bounds as the DB CHECK
//      constraints in supabase/hardening.sql §3 (code-point counts, matching
//      Postgres char_length), plus the required-field contract the join form
//      enforces.
//   2. Cloudflare Turnstile token verification (the primary bot wall).
//   3. Per-IP rate limiting (~3/hour), backed by a Postgres table + an atomic
//      check-and-log RPC (see supabase/rate-limit.sql).
//   4. Insert with the service-role key, which bypasses RLS.
//
// Layered on purpose: the IP throttle is best-effort (the client IP is derived
// from proxy headers), so every submission ALSO has to clear a single-use
// Turnstile token and pass full server-side validation before it can reach the
// table. Once this is live, the anon INSERT policy on public.applications can
// be dropped — no client ever writes to the table directly again.
//
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are auto-injected into the Edge
// Function runtime (the SUPABASE_ prefix is reserved — you cannot and need not
// set them). TURNSTILE_SECRET_KEY and RATE_LIMIT_SALT are REQUIRED secrets set
// via `supabase secrets set`; the function fails closed if either is missing.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.110.2';

// ── Config ──────────────────────────────────────────────────────────────────
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const TURNSTILE_SECRET = Deno.env.get('TURNSTILE_SECRET_KEY') ?? '';
const RATE_LIMIT_SALT = Deno.env.get('RATE_LIMIT_SALT') ?? '';
const ALLOWED_ORIGINS = (Deno.env.get('ALLOWED_ORIGINS') ?? 'https://jasonhchronicles.com')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW = '1 hour'; // Postgres interval literal, cast inside the RPC.
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

// ── CORS ────────────────────────────────────────────────────────────────────
function corsHeaders(origin: string | null): Record<string, string> {
  const allow = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin',
  };
}

function json(body: unknown, status: number, origin: string | null): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
  });
}

// ── Validation (mirrors supabase/hardening.sql §3 + the form's required set) ──
interface Payload {
  full_name: string;
  age: number;
  city: string;
  state: string;
  country: string;
  phone: string;
  motivation: string;
  consent_implants: boolean;
  consent_reassignment: boolean;
  consent_continuity: boolean;
  consent_charter: boolean;
}

type ValidationResult =
  | { ok: true; value: Payload }
  | { ok: false; message: string };

// Count Unicode code points, matching Postgres char_length() exactly (JS
// String.length counts UTF-16 code units and would over-reject astral chars).
const cp = (s: string) => [...s].length;

function validate(raw: Record<string, unknown>): ValidationResult {
  if (typeof raw !== 'object' || raw === null) {
    return { ok: false, message: 'Malformed request.' };
  }

  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
  const full_name = str(raw.full_name);
  const city = str(raw.city);
  const state = str(raw.state);
  const country = str(raw.country);
  const phone = str(raw.phone);
  const motivation = str(raw.motivation);
  const age = Number(raw.age);

  // Length / range bounds match the applications_* CHECK constraints.
  // Presence (non-empty) matches the fields the join form marks `required`.
  if (cp(full_name) < 1 || cp(full_name) > 200) {
    return { ok: false, message: 'Please enter your full name.' };
  }
  if (!Number.isInteger(age) || age < 18 || age > 150) {
    return { ok: false, message: 'Age must be a whole number between 18 and 150.' };
  }
  if (cp(city) < 1 || cp(city) > 120) {
    return { ok: false, message: 'Please enter a valid city.' };
  }
  if (cp(state) > 120) {
    return { ok: false, message: 'State / region is too long.' };
  }
  if (cp(country) < 1 || cp(country) > 120) {
    return { ok: false, message: 'Please enter a valid country.' };
  }
  if (cp(phone) > 40) {
    return { ok: false, message: 'Phone number is too long.' };
  }
  if (cp(motivation) < 1 || cp(motivation) > 5000) {
    return { ok: false, message: 'Please tell us why you want to join.' };
  }

  // All four acknowledgements are `required` checkboxes on the form.
  const consent_implants = raw.consent_implants === true;
  const consent_reassignment = raw.consent_reassignment === true;
  const consent_continuity = raw.consent_continuity === true;
  const consent_charter = raw.consent_charter === true;
  if (!(consent_implants && consent_reassignment && consent_continuity && consent_charter)) {
    return { ok: false, message: 'All consent acknowledgements are required.' };
  }

  return {
    ok: true,
    value: {
      full_name,
      age,
      city,
      state,
      country,
      phone,
      motivation,
      consent_implants,
      consent_reassignment,
      consent_continuity,
      consent_charter,
    },
  };
}

// ── Turnstile ─────────────────────────────────────────────────────────────────
async function verifyTurnstile(token: string, ip: string | null): Promise<boolean> {
  if (!token) return false;

  const body = new URLSearchParams({ secret: TURNSTILE_SECRET, response: token });
  if (ip) body.set('remoteip', ip);

  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
    const data = await res.json();
    return data?.success === true;
  } catch (err) {
    console.error('Turnstile verification request failed:', err);
    return false;
  }
}

// ── Client IP (best-effort; Turnstile is the primary bot control) ────────────
// Do NOT trust the left-most X-Forwarded-For entry — it is client-supplied and
// spoofable. Supabase's edge sits behind Cloudflare, which sets cf-connecting-ip
// to the real connecting IP (unspoofable, it overwrites any client value), and
// the trusted proxy chain APPENDS the real peer to the END of X-Forwarded-For.
// So: prefer cf-connecting-ip, then the last XFF hop, then x-real-ip.
function clientIp(req: Request): string | null {
  const cf = req.headers.get('cf-connecting-ip');
  if (cf) return cf.trim();

  const xff = req.headers.get('x-forwarded-for');
  if (xff) {
    const parts = xff.split(',').map((s) => s.trim()).filter(Boolean);
    if (parts.length) return parts[parts.length - 1];
  }

  return req.headers.get('x-real-ip');
}

// Salted SHA-256 so the rate-limit table never stores a raw IP (this project
// treats applicant data as sensitive — the throttle key should be too). The
// salt is required and validated at request time, so this is never unsalted.
async function hashIp(ip: string): Promise<string> {
  const bytes = new TextEncoder().encode(`${RATE_LIMIT_SALT}:${ip}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// ── Handler ───────────────────────────────────────────────────────────────────
Deno.serve(async (req) => {
  const origin = req.headers.get('origin');

  try {
    if (req.method === 'OPTIONS') {
      return new Response('ok', { headers: corsHeaders(origin) });
    }
    if (req.method !== 'POST') {
      return json({ error: 'method', message: 'Method not allowed.' }, 405, origin);
    }

    // Fail closed on missing secrets — a misconfigured function must never wave
    // submissions through without a bot check, nor store unsalted IP hashes.
    if (!TURNSTILE_SECRET || !RATE_LIMIT_SALT) {
      console.error('Missing required secret: TURNSTILE_SECRET_KEY and/or RATE_LIMIT_SALT.');
      return json({ error: 'server', message: 'Submission service is not configured.' }, 500, origin);
    }

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return json({ error: 'validation', message: 'Malformed request.' }, 400, origin);
    }

    // 1 ─ Validate payload.
    const validated = validate(body);
    if (!validated.ok) {
      return json({ error: 'validation', message: validated.message }, 400, origin);
    }

    const ip = clientIp(req);
    const rateKey = ip ?? 'unknown'; // unresolved-IP traffic shares one throttle bucket

    // 2 ─ Verify the Turnstile token before doing any DB work.
    const humanVerified = await verifyTurnstile(String(body.turnstileToken ?? ''), ip);
    if (!humanVerified) {
      return json(
        { error: 'verification', message: 'Verification failed. Please complete the challenge and try again.' },
        403,
        origin,
      );
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    // 3 ─ Rate limit by IP (atomic check-and-log in Postgres). The RPC returns
    // the new hit's id when under the limit, or NULL when at/over it.
    const ipHash = await hashIp(rateKey);
    const { data: hitId, error: rlError } = await supabase.rpc('check_submission_rate_limit', {
      p_ip_hash: ipHash,
      p_max: RATE_LIMIT_MAX,
      p_window: RATE_LIMIT_WINDOW,
    });
    if (rlError) {
      console.error('Rate-limit check failed:', rlError);
      return json({ error: 'server', message: 'Submission service is temporarily unavailable.' }, 500, origin);
    }
    if (hitId == null) {
      return json(
        { error: 'rate_limit', message: 'Too many submissions from your network. Please try again in about an hour.' },
        429,
        origin,
      );
    }

    // 4 ─ Insert with the service-role key (bypasses RLS).
    const { error: insertError } = await supabase.from('applications').insert([validated.value]);
    if (insertError) {
      console.error('Insert failed:', insertError);
      // Release the rate-limit hit we just charged, so a server-side failure
      // doesn't cost this (already human-verified) applicant one of their
      // ~3/hour attempts. Best-effort: if the delete fails we're no worse off.
      await supabase.from('submission_rate_limit').delete().eq('id', hitId);
      return json({ error: 'server', message: 'Submission failed. Please try again later.' }, 500, origin);
    }

    return json({ ok: true }, 201, origin);
  } catch (err) {
    // Any unexpected throw still returns a CORS-friendly JSON 500 (Deno.serve's
    // default error response carries no CORS headers, which the browser sees as
    // an opaque network failure).
    console.error('Unhandled error in submit-application:', err);
    return json({ error: 'server', message: 'Submission failed. Please try again later.' }, 500, origin);
  }
});
