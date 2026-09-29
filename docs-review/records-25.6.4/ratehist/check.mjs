#!/usr/bin/env node
// ratehist draft checker. Run: node docs-review/records-25.6.4/ratehist/check.mjs
// Compares the reconstruction (rate-history.html in this folder) against the live
// rate-history.html at the repo root. Checks:
//   1. frozen strings present (probe, pins, doctrine quotes, figures) and the
//      check-canon rate-history regexes (authority, exact cascade, stale-claim,
//      World-tier refusal, tier-claim, seat, founder) behave as check-canon expects;
//   2. heading and id tokens unchanged (h1/h2 text, every id=, every href, frozen
//      numeric/statutory token set);
//   3. structure unchanged (tag skeleton, <head> except the description, the rate
//      table byte for byte, strong/em span text, list shape, crosslink labels);
//   4. every backticked quote in ledger.md section (a) is verbatim in the draft and
//      <= 15 words; every backticked item in section (b) is present;
//   5. every x.html#frag link in the draft resolves to an id in the repo.
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..', '..');
const rd = (p) => readFileSync(p, 'utf8');
const ORIG = rd(join(ROOT, 'rate-history.html'));
const DRAFT = rd(join(HERE, 'rate-history.html'));
const LEDGER = rd(join(HERE, 'ledger.md'));

const fails = [];
const notes = [];
const fail = (m) => fails.push(m);

if (/\r/.test(DRAFT)) fail('draft has CR characters (LF only required)');
if (/\r/.test(LEDGER)) fail('ledger has CR characters (LF only required)');
if (/\r/.test(rd(fileURLToPath(import.meta.url)))) fail('check.mjs has CR characters (LF only required)');

/* ---- text extraction ---- */
const ENT = { '&ndash;': '–', '&mdash;': '—', '&rsquo;': '’', '&lsquo;': '‘', '&amp;': '&', '&sect;': '§', '&nbsp;': ' ', '&lt;': '<', '&gt;': '>', '&rarr;': '→' };
const dec = (s) => s.replace(/&[a-z]+;/g, (e) => ENT[e] ?? e);
const norm = (s) => s.replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim();
const inlineStrip = (s) => s.replace(/<\/?(?:strong|em|a|i|span|br)\b[^>]*>/g, (t) => (/^<br/.test(t) ? ' ' : '')).replace(/<[^>]+>/g, ' ');
const mainOf = (h) => (h.match(/<main[\s\S]*?<\/main>/) || [''])[0];
const mainText = (h) => norm(dec(inlineStrip(mainOf(h))));
const fullText = (h) => {
  const title = (h.match(/<title>([\s\S]*?)<\/title>/) || [, ''])[1];
  const desc = (h.match(/<meta name="description" content="([^"]*)"/) || [, ''])[1];
  return norm(dec(`${title} \n ${desc}`)) + ' \n ' + mainText(h);
};
const words = (t) => t.split(' ').filter((w) => /[A-Za-z0-9]/.test(w)).length;

/* check-canon's own normalisations, replicated exactly */
const stripComments = (html) => html.replace(/<!--[\s\S]*?-->/g, '');
const normalizedText = (src) => stripComments(src)
  .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&(?:nbsp|thinsp);/gi, ' ')
  .replace(/&(?:rarr|rightarrow);/gi, '→')
  .replace(/&mdash;/gi, '—')
  .replace(/&ndash;/gi, '–')
  .replace(/\s+/g, ' ')
  .trim();
const rendered = (html) => stripComments(html)
  .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ')
  .replace(/\s+/g, ' ');

const oFull = fullText(ORIG); const dFull = fullText(DRAFT);
const oNT = normalizedText(ORIG); const dNT = normalizedText(DRAFT);

/* ---- 1. frozen strings and check-canon regexes ---- */
const FROZEN_RAW = [
  'current rate authority is <a href="law-polling.html#',           // guard-mutation probe find-string
  'The register&rsquo;s LP-074 is <a href="law-polling.html#lp-074">RATIFY-TAX-50-II</a>',
];
for (const s of FROZEN_RAW) {
  if (!ORIG.includes(s)) fail(`frozen raw string not in ORIGINAL (spec drift): ${s}`);
  if (!DRAFT.includes(s)) fail(`frozen raw string missing from draft: ${s}`);
}
const FROZEN_TEXT = [
  '50 / 25 / 12.5 / 6.25', '70 / 35 / 17 / 8', '"90–99% / 45–50% / 20–25% / 10–15%,"',
  'The current rate authority is LP-074 at 50 / 25 / 12.5 / 6.25',
  'LP-073 is historical.',
  'LP-075 compelled the remedial process in 2291',
  'LP-075 compelled the audit;',
  'Band-to-point is itself doctrine: point rates are what a matured enforcement capability produces.',
  'any rate reduction requires audited evidence per the Path 2 standing audit — never authored facts — at the standard zero-fail threshold',
  'Top marginal rates track demonstrated institutional need.',
  '5–0 across the ratification chambers',
  'rates fall when shown, and hold when a required fact is not shown.',
  'roughly one million citizens', '$100,000-per-citizen', '$100 billion', '$200M', '$60M', '70% top marginal rate',
  'Findings I–IV', 'B1–B6', 'Y175 (2276)', 'Y112 (2213)', '2279–2288', 'sixty-three years', '63 years',
  '12, 35, and 65 years', '~65-year', '(Y12, Y47, Y112, ~Y175)', 'canon v22.0 and v22.1', 'v22.2',
  'That issuance does not validate the deregistered text.',
  'The old drafting designations remain non-canon.',
  'Consolidation Era held through 2294 and was superseded in 2295 by the Exact Halving-Cascade Era',
];
for (const s of FROZEN_TEXT) {
  const q = norm(s);
  if (!oFull.includes(q)) fail(`frozen text not in ORIGINAL (spec drift): ${s}`);
  if (!dFull.includes(q)) fail(`frozen text missing from draft: ${s}`);
}
const AUTHORITY = [/current rate authority is LP-074/i, /LP-073 is historical/i, /LP-075 compelled the (?:audit|remedial process)/i];
for (const re of AUTHORITY) if (!re.test(dNT)) fail(`check-canon authority regex fails on draft: ${re}`);
const exactCascade = /(?:\b50\s*%?\s*\/\s*25\s*%?\s*\/\s*12\.5\s*%?\s*\/\s*6\.25\s*%?\b|\b50%[^.!?]{0,240}\b25%[^.!?]{0,240}\b12\.5%[^.!?]{0,240}\b6\.25%)/;
if (!exactCascade.test(dNT)) fail('check-canon exact-cascade regex fails on draft');
const forbiddenCurrent = /(?:LP-073[^.!?]{0,120}(?:remains|is|still)\s+(?:current|active|operative)|(?:current|active|operative|since 2295|from 2295)[^.!?]{0,100}(?:70\s*%?\s*\/\s*35\s*%?\s*\/\s*17\s*%?\s*\/\s*8\s*%?|\b35%|\b17%|\b8%)|2294[^.!?]{0,120}(?:Finding III[^.!?]{0,50}(?:fail|did not pass)|Schedule [AB]\b[^.!?]{0,50}(?:refus|reject|not certified|not reached))|three findings passed[^.!?]{0,50}(?:one did not|one failed)|both refusals|chain with three links|executed (?:that logic|the logic) once already)/i;
const stale = dNT.match(forbiddenCurrent)?.[0];
if (stale) fail(`check-canon stale-claim regex matches draft: "${stale}"`);
const supersededOutcome = /(?:Finding III[^.!?]{0,100}(?:fail(?:ed|ure)?|did not pass)|Schedule A\b[^.!?]{0,100}(?:refus(?:ed|al)|reject(?:ed|ion)|not certified)|Schedule B\b[^.!?]{0,100}(?:not reached|refus(?:ed|al)|reject(?:ed|ion)|not certified)|2294[^.!?]{0,120}(?:three findings passed|one finding failed|both refusals)|lawful (?:nonactivation|failure)|both refusals|chain with three links)/i;
const leak = dNT.match(supersededOutcome)?.[0];
if (leak) fail(`check-canon World-tier refusal regex matches draft: "${leak}"`);
const TIER = /\b(?:tax(?:ation|es)?|tax code|rate schedule|top marginal rates?|the (?:rate )?cascade)\b[^.!?]{0,60}\b(?:is|are|sits? at|remains?)\b[^.!?]{0,40}\b(?:charter-level|charter level|constitutional(?:ly)?|charter-tier)\b/i;
if (TIER.test(dNT)) fail(`tier-claim regex matches draft: "${dNT.match(TIER)[0]}"`);
const SEAT = /\b(Sol|Opus|Fable|GPT|Claude)\b/;
const FOUNDER = /founder(?:'|’)?s? (?:ruling|override)/i;
const dRendered = rendered(DRAFT);
if (SEAT.test(dRendered)) fail(`seat name in draft: ${dRendered.match(SEAT)[1]}`);
if (FOUNDER.test(dRendered)) fail('founder ruling/override phrasing in draft');

/* ---- 2. heading and id tokens ---- */
const pickAll = (h, re) => [...h.matchAll(re)].map((m) => m[1]);
const same = (label, a, b) => { if (JSON.stringify(a) !== JSON.stringify(b)) fail(`${label} changed:\n    orig  ${JSON.stringify(a)}\n    draft ${JSON.stringify(b)}`); };
same('h1/h2 headings', pickAll(ORIG, /<h[1-6]\b[^>]*>([\s\S]*?)<\/h[1-6]>/g), pickAll(DRAFT, /<h[1-6]\b[^>]*>([\s\S]*?)<\/h[1-6]>/g));
same('id attributes', pickAll(ORIG, /\sid="([^"]*)"/g), pickAll(DRAFT, /\sid="([^"]*)"/g));
same('href attributes', pickAll(ORIG, /\shref="([^"]*)"/g), pickAll(DRAFT, /\shref="([^"]*)"/g));
same('<title>', pickAll(ORIG, /<title>([\s\S]*?)<\/title>/g), pickAll(DRAFT, /<title>([\s\S]*?)<\/title>/g));
const TOKENS = [
  /LP-\d+/g, /§\d+(?:\.\d+)?/g, /\bY\d+\b/g, /~Y\d+/g, /\b[AB]\d(?:–[AB]\d)?\b/g, /Findings I–IV/g,
  /\$[\d,.]+(?:M| billion)?/g, /\b\d+(?:\.\d+)?%/g, /\b\d{4}(?:–\d{4})?\b/g, /\b\d–\d\b/g,
  /\b\d+(?:\.\d+)? \/ \d+(?:\.\d+)?(?: \/ \d+(?:\.\d+)?)*\b/g, /\bv\d+(?:\.\d+)*\b/g, /\b[0-9a-f]{7}\b/g,
  /\b(?:sixty-three|one million|two generations|twice a century|six decades|three|two|fourth|fifth)\b/gi,
  /\b(?:shall|may|must|cannot|can|could|only)\b/gi,
];
const tokenCount = (t) => { const m = new Map(); for (const re of TOKENS) for (const x of t.matchAll(re)) { const k = x[0].toLowerCase(); m.set(k, (m.get(k) || 0) + 1); } return m; };
{
  const o = tokenCount(oFull); const r = tokenCount(dFull);
  for (const [k, n] of o) {
    const rn = r.get(k) || 0;
    if (rn === 0) fail(`frozen token missing from draft: "${k}" (original ${n}x)`);
    else if (rn !== n) notes.push(`token count "${k}": ${n} -> ${rn}`);
  }
  for (const [k, n] of r) if (!o.has(k)) notes.push(`token new in draft: "${k}" (${n}x)`);
}

/* ---- 3. structure ---- */
const skeleton = (h) => h.replace(/>[^<]*</g, '><');
const maskDesc = (h) => h.replace(/(<meta name="description" content=")[^"]*(")/, '$1…$2');
if (skeleton(maskDesc(ORIG)) !== skeleton(maskDesc(DRAFT))) {
  const a = skeleton(maskDesc(ORIG)).split('><'); const b = skeleton(maskDesc(DRAFT)).split('><');
  const i = a.findIndex((x, k) => x !== b[k]);
  fail(`HTML tag skeleton differs at tag #${i}: "${a[i]}" vs "${b[i]}"`);
}
if (maskDesc(ORIG).split('<body')[0] !== maskDesc(DRAFT).split('<body')[0]) fail('<head> differs outside the meta description');
if (ORIG.split('</main>')[1] !== DRAFT.split('</main>')[1]) fail('content after </main> differs');
const table = (h) => (h.match(/<div class="pending-table-wrap">[\s\S]*?<\/table>\s*<\/div>/) || [''])[0];
if (!table(ORIG) || table(ORIG) !== table(DRAFT)) fail('rate table is not byte-identical');
same('strong spans', pickAll(ORIG, /<strong>([\s\S]*?)<\/strong>/g), pickAll(DRAFT, /<strong>([\s\S]*?)<\/strong>/g));
same('em spans', pickAll(ORIG, /<em>([\s\S]*?)<\/em>/g), pickAll(DRAFT, /<em>([\s\S]*?)<\/em>/g));
same('hash spans', pickAll(ORIG, /<span class="hash">([\s\S]*?)<\/span>/g), pickAll(DRAFT, /<span class="hash">([\s\S]*?)<\/span>/g));
same('labels (kicker, eb-label, pn-label, era chips)', pickAll(ORIG, /<(?:p class="text-sm[^"]*"|span class="(?:eb-label|pn-label|era-chip[^"]*)")>([\s\S]*?)<\/(?:p|span)>/g), pickAll(DRAFT, /<(?:p class="text-sm[^"]*"|span class="(?:eb-label|pn-label|era-chip[^"]*)")>([\s\S]*?)<\/(?:p|span)>/g));
same('crosslink labels', pickAll(ORIG, /class="pending-crosslink[^"]*">([\s\S]*?)<\/a>/g), pickAll(DRAFT, /class="pending-crosslink[^"]*">([\s\S]*?)<\/a>/g));
same('inline link labels', pickAll(ORIG, /<a href="[^"]*">([\s\S]*?)<\/a>/g), pickAll(DRAFT, /<a href="[^"]*">([\s\S]*?)<\/a>/g));
same('list shape (ul/li counts)', [(ORIG.match(/<ul\b/g) || []).length, (ORIG.match(/<li\b/g) || []).length], [(DRAFT.match(/<ul\b/g) || []).length, (DRAFT.match(/<li\b/g) || []).length]);
same('paragraph count', (ORIG.match(/<p\b/g) || []).length, (DRAFT.match(/<p\b/g) || []).length);

/* ---- 4. ledger ---- */
const ticks = (s) => [...s.matchAll(/`([^`]+)`/g)].map((m) => m[1]);
let section = null; let quoted = 0; let spans = 0; let cuts = 0; let frozenItems = 0;
for (const line of LEDGER.split('\n')) {
  if (/^## /.test(line)) { section = /^## \(a\)/.test(line) ? 'a' : /^## \(b\)/.test(line) ? 'b' : null; continue; }
  if (!/^\s*- /.test(line)) continue;
  const sp = ticks(line);
  if (section === 'a') {
    if (/\bcut:/.test(line) && sp.length === 0) { cuts++; continue; }
    if (sp.length === 0) { fail(`ledger (a) row has no quote and no cut: ${line}`); continue; }
    quoted++;
    for (const s of sp) {
      spans++;
      const q = norm(s);
      if (!dFull.includes(q)) fail(`ledger quote not verbatim in draft: "${s}"`);
      if (words(q) > 15) fail(`ledger quote over 15 words (${words(q)}): "${s}"`);
    }
  } else if (section === 'b') {
    for (const s of sp) {
      frozenItems++;
      const re = s.match(/^\/(.+)\/([a-z]*)$/);
      if (re) { if (!new RegExp(re[1], re[2]).test(dNT)) fail(`ledger (b) regex not satisfied by draft: ${s}`); }
      else if (!DRAFT.includes(s) && !dFull.includes(norm(s)) && !dNT.includes(s)) fail(`ledger (b) frozen item missing from draft: ${s}`);
    }
  }
}
if (quoted === 0) fail('ledger section (a) has no quoted rows');
if (frozenItems === 0) fail('ledger section (b) has no frozen items');
const wc = [...LEDGER.matchAll(/^\| rate-history\.html \| (\d+) \| (\d+) \|/gm)][0];
const oW = words(mainText(ORIG)); const dW = words(mainText(DRAFT));
if (!wc || Number(wc[1]) !== oW || Number(wc[2]) !== dW) fail(`ledger word counts ${wc ? `[${wc[1]}, ${wc[2]}]` : 'missing'} != computed [${oW}, ${dW}]`);

/* ---- 5. link resolution ---- */
let links = 0;
for (const m of DRAFT.matchAll(/\shref="([^"#:]+\.(?:html|json))(?:#([^"]+))?"/g)) {
  const [, file, frag] = m;
  const p = join(ROOT, file);
  if (!existsSync(p)) { fail(`link target file missing: ${file}`); continue; }
  if (frag) {
    links++;
    if (!new RegExp(`\\sid="${frag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`).test(rd(p))) fail(`link fragment does not resolve: ${file}#${frag}`);
  }
}

/* ---- register tells (report only) ---- */
const REVERSAL = /\b(?:is|are|was) not [^.;:]{1,60}; (?:it|they|this) (?:is|are|was)\b|; (?:it|they) (?:does|do|did) not\b|, not [a-z]+ but\b|\bnot [^.;:,]{1,40} — (?:it|they) (?:is|are|was)\b/gi;
const tells = (h) => {
  const body = mainText(h.replace(/<div class="pending-table-wrap">[\s\S]*?<\/table>\s*<\/div>/, '').replace(/<div class="pending-crosslinks"[\s\S]*?<\/div>/g, ''));
  return { reversals: (body.match(REVERSAL) || []).length, emdash: (body.match(/—/g) || []).length };
};
const to = tells(ORIG); const td = tells(DRAFT);

/* ---- report ---- */
console.log(`rate-history.html: words ${oW} -> ${dW} (${(((dW - oW) / oW) * 100).toFixed(1)}%)`);
console.log(`ledger: ${quoted} quoted rows (${spans} spans) + ${cuts} cut rows; ${frozenItems} frozen items in (b); ${links} fragment links resolved`);
console.log(`prose tells outside table/crosslinks: reversal patterns ${to.reversals} -> ${td.reversals}; em-dashes ${to.emdash} -> ${td.emdash}`);
for (const n of notes) console.log(`  note: ${n}`);
if (fails.length) { console.log(`FAIL (${fails.length})`); for (const f of fails) console.log(`  - ${f}`); process.exit(1); }
console.log('PASS: frozen strings and check-canon regexes hold; headings, ids, hrefs, tag skeleton, head, table and labels unchanged; ledger quotes verbatim and <= 15 words; fragment links resolve');
