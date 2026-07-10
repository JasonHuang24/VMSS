-- Server-side submission rate limiting for the VMSS entry-application form.
--
-- Backs the `submit-application` Edge Function (supabase/functions/). Run this
-- ONCE in the Supabase SQL editor (dashboard → SQL), same as hardening.sql.
-- It closes the last item from the 2026-07 security audit: the abuse controls
-- on the join form were client-only (honeypot + localStorage cooldown in
-- script.js), so a direct REST call bypassed them entirely.
--
-- hardening.sql locked down reads and added payload CHECK constraints; this
-- file adds the per-IP throttle. Re-running is safe — every object uses
-- create-if-not-exists / create-or-replace.

-- 1 ─ Rate-limit log ---------------------------------------------------------
-- One row per accepted attempt. `ip_hash` is a salted SHA-256 of the client IP
-- computed inside the Edge Function; the raw IP is never stored here.
create table if not exists public.submission_rate_limit (
  id         bigint generated always as identity primary key,
  ip_hash    text        not null,
  created_at timestamptz not null default now()
);

create index if not exists submission_rate_limit_ip_time
  on public.submission_rate_limit (ip_hash, created_at desc);

-- Only the service role (used by the Edge Function) may touch this table.
-- RLS with no policy = deny-by-default for anon/authenticated; the explicit
-- REVOKE is belt-and-suspenders. service_role bypasses RLS.
alter table public.submission_rate_limit enable row level security;
revoke all on table public.submission_rate_limit from anon, authenticated;

-- 2 ─ Atomic check-and-log ---------------------------------------------------
-- Returns the new hit's id when the caller is UNDER the limit (and records the
-- hit), or NULL when they are at/over it. Returning the id lets the Edge
-- Function release the charge if the subsequent applications insert fails, so a
-- server-side error doesn't cost an already-verified applicant an attempt.
-- A per-IP transaction-scoped advisory lock serializes concurrent calls for the
-- same IP so two simultaneous submissions can't both read a stale count and
-- slip past the threshold.
create or replace function public.check_submission_rate_limit(
  p_ip_hash text,
  p_max     integer,
  p_window  text
)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  recent integer;
  new_id bigint;
begin
  perform pg_advisory_xact_lock(hashtext(p_ip_hash));

  -- Opportunistic cleanup so the table stays small without a cron job. Gated to
  -- ~2% of calls so the global DELETE doesn't run on every submission (and so
  -- concurrent different-IP calls rarely contend on it).
  if random() < 0.02 then
    delete from public.submission_rate_limit
      where created_at < now() - interval '1 day';
  end if;

  select count(*) into recent
    from public.submission_rate_limit
    where ip_hash = p_ip_hash
      and created_at > now() - (p_window)::interval;

  if recent >= p_max then
    return null;
  end if;

  insert into public.submission_rate_limit (ip_hash)
    values (p_ip_hash)
    returning id into new_id;
  return new_id;
end;
$$;

-- Only the Edge Function (service role) should ever call this.
revoke execute on function public.check_submission_rate_limit(text, integer, text) from public;
grant  execute on function public.check_submission_rate_limit(text, integer, text) to service_role;

-- 3 ─ After submit-application is deployed AND verified -----------------------
-- Inserts now go exclusively through the service-role Edge Function, which
-- bypasses RLS. Drop the anonymous INSERT policy so the anon/publishable key
-- can no longer write to the table directly. Run this LAST, not before the
-- function is live, or the form will break in the gap.
--
--   drop policy if exists "anon_insert_applications" on public.applications;
--
-- (Confirm the exact policy name first in dashboard → Authentication →
-- Policies; hardening.sql suggested "anon_insert_applications" but a
-- pre-existing project may have named it differently.)
