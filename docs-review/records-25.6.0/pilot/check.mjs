#!/usr/bin/env node
// Records 25.6.0 pilot-unit checker. Run: node docs-review/records-25.6.0/pilot/check.mjs
// Reads the five drafts in this folder and the live sources; writes nothing.
// Checks: LF endings; node --check on both .mjs drafts; .mjs diffs confined to the
// permitted literal lines; Act tag skeleton, <head>, ids, hrefs and labels unchanged;
// Act §6 row byte-identical to live; ruling heading lines, bold/italic spans, rules and
// rendered block skeleton unchanged; ruling drafts pass the generator's own
// assertVerbatim; frozen tokens and operative modals preserved; World-tier guard
// regexes; every ledger quote (fact ledger and local-fix rows) verbatim in its draft
// and <= 15 words; every frozen-string checklist entry present (or absent where
// marked); the pilot ledger re-checked against the fixed drafts; word counts.
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..', '..');
const raw = (p) => readFileSync(p, 'utf8');
const rd = (p) => raw(p).replace(/\r\n?/g, '\n');

const fails = [];
const notes = [];
const fail = (m) => fails.push(m);

/* ---------- text helpers ---------- */
const ENT = { '&ndash;': '–', '&mdash;': '—', '&rsquo;': '’', '&lsquo;': '‘', '&ldquo;': '“', '&rdquo;': '”', '&amp;': '&', '&sect;': '§', '&nbsp;': ' ', '&lt;': '<', '&gt;': '>' };
const dec = (s) => s.replace(/&[a-z]+;/g, (e) => ENT[e] ?? e);
const norm = (s) => s.replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim();
const inlineStrip = (s) => s.replace(/<\/?(?:strong|em|a|i)\b[^>]*>/g, '').replace(/<[^>]+>/g, ' ');
const flat = (s) => s.replace(/\s+/g, ' ');
const words = (t) => t.split(' ').filter((w) => /[A-Za-z0-9]/.test(w)).length;
const htmlMain = (h) => norm(dec(inlineStrip((h.match(/<main[\s\S]*?<\/main>/) || [''])[0])));
const htmlFull = (h) => {
  const title = (h.match(/<title>([\s\S]*?)<\/title>/) || [, ''])[1];
  const desc = (h.match(/<meta name="description" content="([^"]*)"/) || [, ''])[1];
  return norm(dec(title + ' \n ' + desc)) + ' ' + htmlMain(h);
};
const mdText = (md) => norm(md.split('\n').map((l) => l.replace(/^#{1,6}\s+/, '')).filter((l) => l.trim() !== '---')
  .join(' ').replace(/\*\*/g, '').replace(/\*/g, ''));
const slice = (s, [a, b]) => {
  const i = s.indexOf(a); const j = s.indexOf(b, i + 1);
  if (i < 0 || j < 0) throw new Error(`block markers not found: ${a} / ${b}`);
  return s.slice(i, j);
};
const blockText = (s, markers) => norm(dec(inlineStrip(slice(s, markers))));

/* ---------- the unit ---------- */
const D = {
  'path-2-presidential-ruling-source.md': { kind: 'md', live: 'documents/path-2-presidential-ruling-source.md', pilot: 'docs-review/records-pilot/path-2-presidential-ruling-source.md' },
  'path-2-adoption-ruling-source.md': { kind: 'md', live: 'documents/path-2-adoption-ruling-source.md', pilot: 'docs-review/records-pilot/path-2-adoption-ruling-source.md' },
  'path-2-commencement-duty-act.html': { kind: 'html', live: 'path-2-commencement-duty-act.html', pilot: 'docs-review/records-pilot/path-2-commencement-duty-act.html' },
  'build-path2-pages.mjs': {
    kind: 'mjs', live: 'tools/build-path2-pages.mjs',
    block: ['/* ---- Presidential rulings', 'for (const [f, html] of built)'],
    allowed: { 559: "    heroSub: 'The two Rulings of the Presidency", 564: '            <p><strong>THE ADJUDICATION OF RECORD.</strong>' },
  },
  'build-pending-pages.mjs': {
    kind: 'mjs', live: 'tools/build-pending-pages.mjs',
    block: ['const statuteBanner', "/* The section's Process-tier declaration"],
    allowed: { 362: '            <span class="pb-label">' },
  },
};
for (const [key, d] of Object.entries(D)) {
  d.key = key;
  d.draftPath = join(HERE, key);
  d.rawDraft = raw(d.draftPath);
  d.o = rd(join(ROOT, d.live));
  d.r = rd(d.draftPath);
  if (d.rawDraft.includes('\r')) fail(`[${key}] draft contains CR characters (LF required)`);
  if (d.kind === 'md') { d.oText = mdText(d.o); d.rText = mdText(d.r); }
  if (d.kind === 'html') { d.oText = htmlFull(d.o); d.rText = htmlFull(d.r); }
  if (d.kind === 'mjs') { d.oText = blockText(d.o, d.block); d.rText = blockText(d.r, d.block); }
}

/* ---------- 1. node --check on both .mjs drafts ---------- */
for (const key of ['build-path2-pages.mjs', 'build-pending-pages.mjs']) {
  try { execFileSync(process.execPath, ['--check', D[key].draftPath], { stdio: 'pipe' }); notes.push(`node --check ${key}: ok`); }
  catch (e) { fail(`[${key}] node --check failed: ${String(e.stderr || e.message).trim()}`); }
}

/* ---------- 2. .mjs drafts: only the permitted literal lines changed ---------- */
const tagSeq = (s) => (s.match(/<[^>]+>/g) || []).join('');
const ids = (s) => [...s.matchAll(/\bid="([^"]*)"/g)].map((m) => m[1]).join('|');
for (const key of ['build-path2-pages.mjs', 'build-pending-pages.mjs']) {
  const d = D[key];
  const ol = d.o.split('\n'); const rl = d.r.split('\n');
  if (ol.length !== rl.length) { fail(`[${key}] line count ${ol.length} -> ${rl.length}`); continue; }
  const changed = [];
  for (let i = 0; i < ol.length; i++) if (ol[i] !== rl[i]) changed.push(i + 1);
  for (const n of changed) if (!(n in d.allowed)) fail(`[${key}] line ${n} changed outside the permitted literals`);
  for (const [n, prefix] of Object.entries(d.allowed)) {
    if (!rl[n - 1].startsWith(prefix)) fail(`[${key}] permitted line ${n} is not the expected literal (${prefix.trim()})`);
    if (tagSeq(ol[n - 1]) !== tagSeq(rl[n - 1])) fail(`[${key}] line ${n}: tag/attribute sequence changed`);
  }
  if (ids(d.o) !== ids(d.r)) fail(`[${key}] id="" sequence changed`);
  notes.push(`${key}: changed lines ${JSON.stringify(changed)} (permitted ${JSON.stringify(Object.keys(d.allowed).map(Number))})`);
}

/* ---------- 3. Act structure ---------- */
{
  const d = D['path-2-commencement-duty-act.html'];
  const skeleton = (h) => h.replace(/>[^<]*</g, '><');
  if (skeleton(d.o) !== skeleton(d.r)) fail('[Act] HTML tag skeleton differs (tags, attributes, classes, ids or hrefs)');
  if (d.o.split('<body')[0] !== d.r.split('<body')[0]) fail('[Act] <head> differs');
  if (ids(d.o) !== ids(d.r)) fail('[Act] id sequence changed');
  const hrefs = (s) => [...s.matchAll(/\bhref="([^"]*)"/g)].map((m) => m[1]).join('|');
  if (hrefs(d.o) !== hrefs(d.r)) fail('[Act] href sequence changed');
  const pick = (h, re) => [...h.matchAll(re)].map((m) => norm(dec(inlineStrip(m[1]))));
  for (const [label, re] of [
    ['h1/h2', /<h[12]\b[^>]*>([\s\S]*?)<\/h[12]>/g],
    ['th', /<th>([\s\S]*?)<\/th>/g],
    ['row labels', /<tr><td>([\s\S]*?)<\/td>/g],
    ['link labels', /<a href="[^"]*">([\s\S]*?)<\/a>/g],
    ['results column', /<td><strong>([\s\S]*?)<\/td>/g],
    ['kicker', /<p class="text-sm[^"]*"[^>]*>([\s\S]*?)<\/p>/g],
    ['list items', /<li>([\s\S]*?)<\/li>/g],
  ]) {
    const a = pick(d.o, re); const b = pick(d.r, re);
    if (label === 'list items') { if (a.length !== b.length) fail('[Act] list item count changed'); continue; }
    if (JSON.stringify(a) !== JSON.stringify(b)) fail(`[Act] ${label} text changed`);
  }
  const s6 = (h) => h.split('\n').find((l) => l.includes('<tr><td>§6 — Separate termination</td>'));
  if (!s6(d.r) || s6(d.o) !== s6(d.r)) fail('[Act] §6 row is not byte-identical to the live source');
  else notes.push('Act §6 row: byte-identical to live');
}

/* ---------- 4. Ruling structure + generator verbatim check ---------- */
const genSrc = D['build-path2-pages.mjs'].r;
const fnSrc = slice(genSrc, ['const esc = ', '/* ------------------------------------------------------------------ *\n * Heading-id strategies']);
const GEN = new Function(`${fnSrc}\nreturn { renderDoc, assertVerbatim, linkFirst };`)();
for (const key of ['path-2-presidential-ruling-source.md', 'path-2-adoption-ruling-source.md']) {
  const d = D[key];
  const heads = (m) => m.split('\n').filter((l) => /^#{1,6} /.test(l));
  if (JSON.stringify(heads(d.o)) !== JSON.stringify(heads(d.r))) fail(`[${key}] heading lines changed`);
  const hr = (m) => m.split('\n').filter((l) => l.trim() === '---').length;
  if (hr(d.o) !== hr(d.r)) fail(`[${key}] --- rule count changed`);
  const joined = (m) => m.replace(/\n(?!\n)/g, ' ');
  const bold = (m) => [...joined(m).matchAll(/\*\*(.+?)\*\*/g)].map((x) => norm(x[1]));
  if (JSON.stringify(bold(d.o)) !== JSON.stringify(bold(d.r))) fail(`[${key}] bold spans changed`);
  const ital = (m) => [...joined(m).replace(/\*\*/g, '').matchAll(/\*(.+?)\*/g)].map((x) => norm(x[1]));
  if (JSON.stringify(ital(d.o)) !== JSON.stringify(ital(d.r))) fail(`[${key}] italic spans changed`);
  const lead = (m) => m.split(/\n\s*\n/).map((p) => p.trim().split(/\s+/).slice(0, 2).join(' '));
  if (JSON.stringify(lead(d.o)) !== JSON.stringify(lead(d.r))) fail(`[${key}] paragraph sequence changed: ${JSON.stringify(lead(d.o))} vs ${JSON.stringify(lead(d.r))}`);
  if (/^\s*(?:-|\d+\.)\s/m.test(d.r) !== /^\s*(?:-|\d+\.)\s/m.test(d.o)) fail(`[${key}] list shape changed`);
  const maxBody = (m) => Math.max(...m.split('\n').filter((l) => !/^#/.test(l)).map((l) => [...l].length));
  if (maxBody(d.r) > maxBody(d.o)) fail(`[${key}] wrap: longest body line ${maxBody(d.r)} > live ${maxBody(d.o)}`);
  else notes.push(`${key}: longest body line ${maxBody(d.r)} chars (live ${maxBody(d.o)})`);
  const skeleton = (h) => h.replace(/>[^<]*</g, '><');
  const bo = GEN.renderDoc(d.o); const br = GEN.renderDoc(d.r);
  if (skeleton(bo) !== skeleton(br)) fail(`[${key}] rendered block skeleton differs`);
  try { const n = GEN.assertVerbatim(d.r, br, key); notes.push(`${key}: generator assertVerbatim passes (${n} chars)`); }
  catch (e) { fail(`[${key}] generator assertVerbatim: ${e.message}`); }
}
for (const [src, phrase] of [
  ['documents/path-2-charter-source.md', 'a schedule adopted by the chambers'],
  ['documents/path-2-schedule-source.md', 'This Schedule is part of the Charter'],
]) {
  try { GEN.linkFirst(GEN.renderDoc(rd(join(ROOT, src))), phrase, '#x'); notes.push(`linkFirst anchor present in ${src}: "${phrase}"`); }
  catch (e) { fail(`linkFirst anchor missing from ${src}: ${phrase}`); }
}

/* ---------- 5. Frozen tokens and modals (original -> draft) ---------- */
const TOKENS = [
  /LP-\d+(?:\.\d+)?/g, /RR-\d+/g, /§\d+(?:\.\d+)?(?:\([a-z]\))?/g, /Article [IVXL]+(?:\.[IVXL]+)?/g, /\bY\d+\b/g,
  /\b[AB]\d(?:–[AB]\d)?\b/g, /Findings I–IV/g, /\$10 million/g, /\b\d+(?:\.\d+)?%/g, /\b\d{4}(?:–\d{4})?\b/g,
  /\b\d+(?:\.\d+)? \/ \d+(?:\.\d+)?(?: \/ \d+(?:\.\d+)?)*\b/g, /\b\d+–\d+\b/g, /\b180\b/g,
  /\b(?:forty|twelve|six|seventy|thirty-five|seventeen|eight|sixty-two|fifty-nine|three|sixty-six|four|two)\b/gi,
  /\b(?:ADOPTED|ONLY|ENACTED)\b/g,
];
const STRICT_MODALS = /\b(?:shall|may|must|cannot|can)\b/gi;
const SOFT = /\b(?:only|will|would|should)\b/gi;
const tally = (t, res) => { const m = new Map(); for (const re of res) for (const x of t.matchAll(re)) { const k = x[0].toLowerCase(); m.set(k, (m.get(k) || 0) + 1); } return m; };
for (const d of Object.values(D)) {
  const o = tally(d.oText, TOKENS); const r = tally(d.rText, TOKENS);
  for (const [k, n] of o) {
    const rn = r.get(k) || 0;
    if (rn === 0) fail(`[${d.key}] frozen token missing: "${k}" (original ${n}x)`);
    else if (rn !== n) notes.push(`[${d.key}] token count ${k}: ${n} -> ${rn}`);
  }
  for (const [k, n] of r) if (!o.has(k)) notes.push(`[${d.key}] token new in draft: "${k}" (${n}x)`);
  const mo = tally(d.oText, [STRICT_MODALS]); const mr = tally(d.rText, [STRICT_MODALS]);
  for (const k of new Set([...mo.keys(), ...mr.keys()])) if ((mo.get(k) || 0) !== (mr.get(k) || 0)) fail(`[${d.key}] modal "${k}" count ${mo.get(k) || 0} -> ${mr.get(k) || 0}`);
  const so = tally(d.oText, [SOFT]); const sr = tally(d.rText, [SOFT]);
  for (const k of new Set([...so.keys(), ...sr.keys()])) if ((so.get(k) || 0) !== (sr.get(k) || 0)) notes.push(`[${d.key}] hedge "${k}" count ${so.get(k) || 0} -> ${sr.get(k) || 0}`);
}

/* ---------- 6. World-tier guard regexes (applied to every draft) ---------- */
const SEAT = /\b(Sol|Opus|Fable|GPT|Claude)\b/;
const FOUNDER = /founder(?:'|’)?s? (?:ruling|override)/i;
const TIER = /\b(?:tax(?:ation|es)?|tax code|rate schedule|top marginal rates?|the (?:rate )?cascade)\b[^.!?]{0,60}\b(?:is|are|sits? at|remains?)\b[^.!?]{0,40}\b(?:charter-level|charter level|constitutional(?:ly)?|charter-tier)\b/i;
const SUPERSEDED = [/lawful nonactivation/i, /Schedule A[^.]{0,120}\brefused\b/i];
for (const d of Object.values(D)) {
  const t = d.rText;
  if (SEAT.test(t)) fail(`[${d.key}] seat name: ${t.match(SEAT)[1]}`);
  if (FOUNDER.test(t)) fail(`[${d.key}] founder ruling/override phrasing`);
  if (TIER.test(t)) fail(`[${d.key}] taxation-is-Charter-level predication`);
  for (const re of SUPERSEDED) if (re.test(t)) fail(`[${d.key}] superseded refusal phrasing: ${re}`);
}
for (const v of ['73%', '7 / 10', '97%', '84%', '72%']) if (!htmlMain(D['path-2-commencement-duty-act.html'].r).includes(v)) fail(`[Act] vote figure missing: ${v}`);

/* ---------- 7. Ledger ---------- */
const ledger = rd(join(HERE, 'ledger.md'));
const ticks = (s) => [...s.matchAll(/`([^`]+)`/g)].map((m) => m[1]);
let section = null; let target = null;
const counts = {};
for (const line of ledger.split('\n')) {
  if (/^## /.test(line)) {
    section = /^## \(a\)/.test(line) ? 'a' : /^## \(b\)/.test(line) ? 'b' : /^## Local fixes/.test(line) ? 'fix' : null;
    target = null; continue;
  }
  if (/^### /.test(line)) {
    const h = line.replace(/^### /, '').trim();
    const live = h.match(/^live: (\S+)/);
    if (live) target = { key: `live:${live[1]}`, flatRaw: flat(rd(join(ROOT, live[1]))), text: null };
    else {
      const d = D[h.split(' ')[0]];
      if (!d) { fail(`ledger heading names no draft: ${line}`); target = null; continue; }
      target = { key: d.key, flatRaw: flat(d.r), text: d.rText };
    }
    continue;
  }
  if (!section || !target || !/^- /.test(line)) continue;
  const spans = ticks(line);
  const absent = /\babsent:/.test(line);
  const c = (counts[`${section}:${target.key}`] ||= { rows: 0, spans: 0 });
  c.rows++;
  if (!spans.length) { fail(`[ledger ${section} ${target.key}] row has no quote: ${line}`); continue; }
  for (const s of spans) {
    c.spans++;
    if (section === 'b') {
      const hit = target.flatRaw.includes(flat(s));
      if (absent && hit) fail(`[frozen ${target.key}] must be absent but present: ${s}`);
      if (!absent && !hit) fail(`[frozen ${target.key}] frozen string missing: ${s}`);
    } else {
      const q = norm(dec(s));
      const hit = target.text.includes(q);
      if (absent && hit) fail(`[ledger ${section} ${target.key}] must be absent but present: "${s}"`);
      if (!absent && !hit) fail(`[ledger ${section} ${target.key}] quote not in draft: "${s}"`);
      if (!absent && words(q) > 15) fail(`[ledger ${section} ${target.key}] quote over 15 words (${words(q)}): "${s}"`);
    }
  }
}
for (const key of Object.keys(D)) {
  if (!counts[`a:${key}`]) fail(`fact ledger has no rows for ${key}`);
  if (!counts[`b:${key}`]) fail(`frozen checklist has no rows for ${key}`);
}

/* ---------- 8. Pilot ledger re-checked against the fixed drafts ---------- */
const EXPECTED_STALE = new Set([
  'path-2-commencement-duty-act.html|A narrow procedural act, enacted after the first Path 2 window',
  'path-2-commencement-duty-act.html|It requires a run and leaves the result to the existing Path 2 rules.',
  'path-2-commencement-duty-act.html|The 2294 record certified Schedule A and then, after B1–B6 passed',
  'path-2-commencement-duty-act.html|The narrow margin reflected the institutional cost of a mandatory cadence.',
  'path-2-commencement-duty-act.html|Enterprise-capacity and legislative-integrity grounds both supported an audit',
  'path-2-presidential-ruling-source.md|fixed in detail the moment at which the methodology would be locked',
  'path-2-presidential-ruling-source.md|a quarantine that stops at the named signatories is a formality',
  'path-2-presidential-ruling-source.md|this office has vetoed entrenchment in larger forms than a procedural void',
  'path-2-presidential-ruling-source.md|"un-shown" must mean that the world changed, not that the measuring ruler changed',
  'path-2-presidential-ruling-source.md|This office has just struck such mechanisms from the void rules under Block D.',
  'path-2-presidential-ruling-source.md|a window without a commencement is not a defect',
  'path-2-presidential-ruling-source.md|the data beneath it is not tainted by that argument',
  'path-2-adoption-ruling-source.md|The majority rule stands and now binds in both directions',
  'path-2-adoption-ruling-source.md|recorded where the next drafter can read them',
]);
{
  const pl = rd(join(ROOT, 'docs-review/records-pilot/ledger.md'));
  let cur = null; let total = 0; const stale = new Set();
  for (const line of pl.split('\n')) {
    if (/^## /.test(line)) { cur = Object.values(D).find((d) => d.kind !== 'mjs' && line.includes(d.key)) || null; continue; }
    if (!cur || !/^- /.test(line)) continue;
    for (const s of ticks(line)) { total++; if (!cur.rText.includes(norm(s))) stale.add(`${cur.key}|${s}`); }
  }
  for (const s of stale) if (!EXPECTED_STALE.has(s)) fail(`pilot ledger quote lost without a local fix: ${s}`);
  for (const s of EXPECTED_STALE) if (!stale.has(s)) fail(`local fix not applied (pilot text still present): ${s}`);
  notes.push(`pilot ledger re-check: ${total} quotes, ${stale.size} superseded by local fixes (expected ${EXPECTED_STALE.size})`);
}

/* ---------- 9. Word counts vs the ledger table ---------- */
const proseWords = (d, which) => {
  const s = which === 'o' ? d.o : d.r;
  if (d.kind === 'md') return words(mdText(s));
  if (d.kind === 'html') return words(htmlMain(s));
  const lines = s.split('\n');
  return words(norm(dec(inlineStrip(Object.keys(d.allowed).map((n) => lines[n - 1]).join(' ')))).replace(/^heroSub: '|',$/g, ''));
};
for (const d of Object.values(D)) {
  d.ow = proseWords(d, 'o'); d.rw = proseWords(d, 'r');
  const row = ledger.split('\n').find((l) => l.startsWith('| ') && l.includes(d.key));
  const nums = row ? [...row.matchAll(/\|\s*([\d,]+)\s*(?=\|)/g)].map((m) => Number(m[1].replace(/,/g, ''))) : [];
  if (nums[0] !== d.ow || nums[1] !== d.rw) fail(`[${d.key}] ledger word counts ${JSON.stringify(nums)} != computed [${d.ow}, ${d.rw}]`);
}

/* ---------- 10. Register tells (report only) ---------- */
const REVERSAL = /\b(?:is|are|was) not [^.;:]{1,60}; (?:it|they|this) (?:is|are|was)\b|; (?:it|they) (?:does|do|did) not\b/gi;
for (const d of Object.values(D)) {
  const body = (x) => (d.kind === 'md' ? mdText(x) : d.kind === 'html' ? htmlMain(x) : blockText(x, d.block));
  const n = (t) => (t.match(REVERSAL) || []).length;
  const em = (t) => (t.match(/—/g) || []).length;
  d.tells = `reversals ${n(body(d.o))} -> ${n(body(d.r))}; em-dashes ${em(body(d.o))} -> ${em(body(d.r))}`;
}

/* ---------- report ---------- */
for (const d of Object.values(D)) {
  const a = counts[`a:${d.key}`] || { rows: 0, spans: 0 }; const b = counts[`b:${d.key}`] || { rows: 0, spans: 0 }; const f = counts[`fix:${d.key}`] || { rows: 0, spans: 0 };
  const pct = d.ow ? (((d.rw - d.ow) / d.ow) * 100).toFixed(1) : '0.0';
  console.log(`${d.key}: words ${d.ow} -> ${d.rw} (${pct}%); fact ledger ${a.rows} rows/${a.spans} quotes; frozen ${b.rows} rows/${b.spans} strings; local-fix ${f.rows} rows; ${d.tells}`);
}
for (const k of Object.keys(counts).filter((k) => k.includes('live:'))) console.log(`${k}: ${counts[k].rows} rows/${counts[k].spans} strings`);
for (const n of notes) console.log(`  note: ${n}`);
if (fails.length) { console.log(`FAIL (${fails.length})`); for (const f of fails) console.log(`  - ${f}`); process.exit(1); }
console.log('PASS: frozen strings present, headings/ids/structure unchanged, ledger quotes verbatim, .mjs drafts parse');
