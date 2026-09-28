#!/usr/bin/env node
// Records 25.6.3 record unit checker. Run: node docs-review/records-25.6.3/record/check.mjs
// Reads the draft in this folder, the live source, the live generator and the committed pages;
// writes nothing. Checks:
//  1. LF endings on the draft, the ledger and this file.
//  2. Markdown structure, original -> draft: heading lines byte-identical (every id derives from
//     them); --- rule count; bold spans; list shapes (marker, indent, order); blockquote presence;
//     paragraph/list block sequence per section; no hyphen-at-line-end word splits; wrap not
//     widened; rendered tag skeleton and id sequence (the generator's own renderDoc/headingId);
//     the generator's own assertVerbatim on the draft; the signature block byte-identical.
//  3. Frozen tokens: every digit-bearing token (figures, dates, votes, sections, versions,
//     commits, series ids) survives and none is new; spelled numbers survive; every quoted
//     string ("...") of the original survives verbatim and the draft quotes nothing new;
//     verdict and routing codes, provenance tags, seat and founder mentions and strict modals
//     keep exact counts; caps words may drop only from the declared emphasis list.
//  4. In-memory build with the live build-pending-pages.mjs: live sources reproduce all committed
//     pages byte for byte; with the draft swapped in, every other page is byte-identical, the record
//     page keeps its chrome, id sequence and tag skeleton, and every href into the record page
//     from any page, document source or generator resolves (#r14 included).
//  5. Guard scope: no check-canon pin, guard-mutation probe or code guard names the page or source.
//  6. Tailwind: a site-wide components+utilities build with the draft-built page swapped in for the
//     committed one equals the build from disk (control: swapping in the live-built page).
//  7. Ledger: every (a) quote verbatim in the draft and <= 15 words; every (b) string present in
//     its target (absent where marked absent:, absent from original and draft where marked na:);
//     word-count table matches.
import { readFileSync, readdirSync } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..', '..');
const raw = (p) => readFileSync(p, 'utf8');
const rd = (p) => raw(p).replace(/\r\n?/g, '\n');

const fails = [];
const notes = [];
const fail = (m) => fails.push(m);

/* ---------- helpers ---------- */
const norm = (s) => s.replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim();
const flat = (s) => s.replace(/\s+/g, ' ');
const unquote = (m) => m.replace(/^> ?/gm, '');
const words = (t) => t.split(' ').filter((w) => /[A-Za-z0-9]/.test(w)).length;
const idSeq = (s) => [...s.matchAll(/\bid="([^"]*)"/g)].map((m) => m[1]);
const skeleton = (h) => h.replace(/>[^<]*</g, '><');
const tally = (t, res) => { const m = new Map(); for (const re of res) for (const x of t.matchAll(re)) { const k = x[0]; m.set(k, (m.get(k) || 0) + 1); } return m; };

/* ---------- the unit ---------- */
const KEY = 'RATIFY-TAX-50-session-record.md';
const LIVE_SRC = 'docs-review/RATIFY-TAX-50-session-record.md';
const PAGE = 'pending-ratify-tax-50-record.html';
const DEEP_IDS = ['r14'];
// Emphasis caps lowered in running text. Ruling captions, codes, verdicts, series ids and the
// engraved-table quotation keep their caps; any other caps change fails.
const CAPS_DROP = ['PATH', 'NOT', 'STANDING', 'PREREGISTERED', 'AUDIT', 'WORKSTREAM', 'CANDIDATE', 'UNDEFINED', 'ENGRAVED', 'TERM',
  'ANY', 'UPPER', 'BOUND', 'DEFINED', 'STRUCTURAL', 'MULTIPLE', 'PROCEEDS', 'TO', 'FINAL', 'ONE', 'BEFORE', 'WITH', 'AND', 'RESOLVES',
  'INFORMATIONAL', 'ONLY', 'REPLICATED', 'HIT', 'CLOSED'];

const draftPath = join(HERE, KEY);
for (const f of [KEY, 'ledger.md', 'check.mjs']) if (raw(join(HERE, f)).includes('\r')) fail(`[${f}] contains CR characters (LF required)`);
const O = rd(join(ROOT, LIVE_SRC));
const R = rd(draftPath);
if (O === R) fail('draft is identical to the live source');

/* ---------- generator functions, taken from the live build-pending-pages.mjs ---------- */
const GEN_SRC = rd(join(ROOT, 'tools/build-pending-pages.mjs'));
const cut = (s, a, b) => { const i = s.indexOf(a); const j = s.indexOf(b, i + 1); if (i < 0 || j < 0) throw new Error(`markers not found: ${a}`); return s.slice(i, j); };
const fnSrc = cut(GEN_SRC, 'const esc = ', '/* ------------------------------------------------------------------ *\n * Page chrome');
const GEN = new Function(`${fnSrc}\nreturn { renderDoc, sourceText, htmlText, assertVerbatim };`)();
const oText = norm(GEN.sourceText(O));
const rText = norm(GEN.sourceText(R));

/* ---------- 2. Markdown structure ---------- */
const lines = (m) => m.split('\n');
{
  const heads = (m) => lines(m).filter((l) => /^#{1,6} /.test(l));
  if (JSON.stringify(heads(O)) !== JSON.stringify(heads(R))) fail('heading lines changed');
  else notes.push(`${heads(R).length} heading lines byte-identical`);
  const hr = (m) => lines(m).filter((l) => l.trim() === '---').length;
  if (hr(O) !== hr(R)) fail(`--- rule count ${hr(O)} -> ${hr(R)}`);
  const joined = (m) => unquote(m).replace(/\n(?!\n)/g, ' ');
  const bold = (m) => [...joined(m).matchAll(/\*\*(.+?)\*\*/g)].map((x) => norm(x[1]));
  if (JSON.stringify(bold(O)) !== JSON.stringify(bold(R))) fail(`bold spans changed: ${JSON.stringify(bold(R))}`);
  else notes.push(`${bold(R).length} bold spans unchanged`);
  const listShape = (m) => lines(unquote(m)).filter((l) => /^\s*(?:-|\d+\.)\s/.test(l)).map((l) => `${l.match(/^\s*/)[0].length}:${l.trim().match(/^(-|\d+\.)/)[1]}`).join(',');
  if (listShape(O) !== listShape(R)) fail(`list shape changed: ${listShape(O)} vs ${listShape(R)}`);
  else notes.push(`list shape unchanged (${listShape(R).split(',').length} marker lines)`);
  // Each list item's leading label (R1:, Sol pass three (v2):, Q1 (1.3× multiple):, 1. Pass two/v2: ...)
  const labels = (m) => lines(m).filter((l) => /^\s*(?:-|\d+\.)\s/.test(l)).map((l) => l.replace(/^\s*(?:-|\d+\.)\s+/, '').match(/^[^:]*:/)?.[0] || '');
  const lo = labels(O); const lr = labels(R);
  lo.forEach((x, i) => { if (x !== lr[i]) fail(`list item label ${i + 1} changed: "${x}" -> "${lr[i]}"`); });
  notes.push(`${lr.length} list item labels unchanged`);
  const qLines = (m) => lines(m).filter((l) => l.startsWith('>')).length;
  if (qLines(O) !== qLines(R)) fail(`blockquote line count ${qLines(O)} -> ${qLines(R)}`);
  const hyphenSplit = R.match(/[A-Za-z]-\n[>\s]*[a-z]/g);
  if (hyphenSplit) fail(`hyphen-at-line-end word split(s): ${JSON.stringify(hyphenSplit)}`);
  // One-line paragraphs (R10 onward) stay one line each; line count per block is unchanged.
  const blockLines = (m) => m.slice(m.indexOf('## Founder ruling R10')).split(/\n\s*\n/).map((b) => b.split('\n').length).join(',');
  if (blockLines(O) !== blockLines(R)) fail('R10 onward: line count per block changed (wrap style)');
  // Wrapped sections (everything before the R10 heading) stay wrapped at the original width.
  const wrapped = (m) => m.slice(0, m.indexOf('## Founder ruling R10')).split('\n').slice(4);
  const maxW = (m) => Math.max(...wrapped(m).filter((l) => !/^#/.test(l)).map((l) => [...l].length));
  if (maxW(R) > maxW(O)) fail(`wrapped sections: longest line ${maxW(R)} > live ${maxW(O)}`);
  else notes.push(`wrapped sections: longest line ${maxW(R)} chars (live ${maxW(O)}); one-line paragraphs kept one line each`);
  // Paragraph shape of the one-line-paragraph sections (R10 onward): same paragraph count per section.
  const paras = (m) => m.split(/\n(?=## )/).map((s) => s.split(/\n\s*\n/).filter((b) => b.trim()).length);
  if (JSON.stringify(paras(O)) !== JSON.stringify(paras(R))) fail(`blocks per section changed: ${paras(O)} vs ${paras(R)}`);
  else notes.push(`blocks per section unchanged (${paras(R).join(' ')})`);
  const sig = (m) => m.slice(m.lastIndexOf('\n— Ruled by the founder'));
  if (sig(O) !== sig(R)) fail('signature block changed');
  else notes.push('signature block byte-identical');
  const bo = GEN.renderDoc(O); const br = GEN.renderDoc(R);
  if (skeleton(bo) !== skeleton(br)) fail('rendered tag skeleton differs');
  else notes.push(`rendered tag skeleton unchanged (${(br.match(/<[a-z0-9]+/g) || []).length} tags)`);
  if (idSeq(bo).join('|') !== idSeq(br).join('|')) fail(`rendered id sequence differs: ${idSeq(br).join(', ')}`);
  else notes.push(`${idSeq(br).length} rendered ids unchanged (${idSeq(br).join(' ')})`);
  for (const id of DEEP_IDS) if (!idSeq(br).includes(id)) fail(`deep-link id missing: ${id}`);
  try { GEN.assertVerbatim(R, br, KEY); notes.push('generator assertVerbatim passes'); }
  catch (e) { fail(`generator assertVerbatim: ${e.message}`); }
}

/* ---------- 3. Frozen tokens, quotations, caps, modals ---------- */
{
  // Digit-bearing tokens: split on whitespace and em-dashes, strip edge punctuation.
  const numTok = (t) => { const m = new Map(); for (let w of t.split(/[\s—]+/)) { w = w.replace(/^[(\[{"'`“‘*,;:.!?]+|[)\]}"'`”’*,;:.!?]+$/g, ''); if (/\d/.test(w)) m.set(w, (m.get(w) || 0) + 1); } return m; };
  const o = numTok(oText); const r = numTok(rText);
  let n = 0;
  for (const [k, c] of o) { n++; const rc = r.get(k) || 0; if (!rc) fail(`frozen token missing: "${k}" (original ${c}x)`); else if (rc !== c) notes.push(`token count ${k}: ${c} -> ${rc}`); }
  for (const [k, c] of r) if (!o.has(k)) fail(`token new in draft: "${k}" (${c}x)`);
  notes.push(`${n} distinct digit-bearing tokens all present, none new`);
  const NUMWORDS = /\b(?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|twenty|sixty-three|sixty-two|fifty-nine|forty-five-day|first|second|third|fourth)\b/gi;
  const wo = tally(oText.toLowerCase(), [NUMWORDS]); const wr = tally(rText.toLowerCase(), [NUMWORDS]);
  for (const [k, c] of wo) { const rc = wr.get(k) || 0; if (!rc) fail(`spelled number missing: ${k}`); else if (rc !== c) notes.push(`spelled number ${k}: ${c} -> ${rc}`); }
  // Quoted strings: every "..." span of the original survives; the draft quotes nothing new.
  const quotes = (t) => [...t.matchAll(/"([^"]+)"/g)].map((x) => x[1]);
  const qo = quotes(oText); const qr = new Set(quotes(rText));
  for (const q of qo) if (!qr.has(q)) fail(`quoted string lost or altered: "${q}"`);
  for (const q of qr) if (!qo.includes(q)) fail(`quoted string new in draft: "${q}"`);
  notes.push(`${qo.length} quoted strings of the original all present verbatim; none new`);
  // Exact-count codes: verdicts, routing classes, provenance tags, seat and founder mentions.
  const EXACT = [/\bNOT-RATIFIABLE\b/g, /\bFAIL\b/g, /\bPASS\b/g, /\bFIX\b/g, /\bNO\b/g, /\bVERBATIM\b/g, /\bALL savings\b/g, /\bRESOLVED\b/g,
    /\[A\]/g, /\[E-founder posture\]/g, /\[(?:P|O|C|H|AB|SB)\b/g, /\bSol\b/g, /\bSIGNED\b/g, /\bDATA-BACK\b/g,
    /\bTRAJECTORY DOCTRINE\b/g, /\bWORLD CANON\b/g, /\bPROCESS RECORD\b/g, /\bLINK-INTEGRITY GUARD\b/g, /\bHONEYPOT\b/g, /\bSTATUS\b/g];
  const eo = tally(oText, EXACT); const er = tally(rText, EXACT);
  for (const k of new Set([...eo.keys(), ...er.keys()])) if ((eo.get(k) || 0) !== (er.get(k) || 0)) fail(`exact token "${k}" count ${eo.get(k) || 0} -> ${er.get(k) || 0}`);
  notes.push(`exact codes unchanged: ${[...eo].map(([k, c]) => `${k} ${c}`).join(', ')}`);
  // Founder mentions are provenance facts: exact count, case-insensitive (sentence-initial "The founder" may replace "Founder").
  const fo = (oText.match(/\bfounder\b/gi) || []).length; const fr = (rText.match(/\bfounder\b/gi) || []).length;
  if (fo !== fr) fail(`founder mentions ${fo} -> ${fr}`); else notes.push(`founder mentions unchanged (${fr}, case-insensitive)`);
  const caps = (t) => tally(t, [/\b[A-Z][A-Z]+(?:-[A-Z]+)*\b/g]);
  const co = caps(oText); const cr = caps(rText);
  const dropped = [];
  for (const [k] of co) {
    const rc = cr.get(k) || 0;
    if (rc === 0 && !CAPS_DROP.includes(k)) fail(`caps word dropped: ${k}`);
    if (rc === 0) dropped.push(k);
    if (rc > 0 && CAPS_DROP.includes(k) && (co.get(k) === rc)) fail(`declared emphasis caps unchanged: ${k}`);
  }
  for (const [k] of cr) if (!co.has(k)) fail(`caps word new in draft: ${k}`);
  notes.push(`caps lowered (declared emphasis only): ${dropped.join(' ')}`);
  const MODALS = /\b(?:shall|may|must|cannot|can)\b/gi;
  const mo = tally(oText.toLowerCase(), [MODALS]); const mr = tally(rText.toLowerCase(), [MODALS]);
  for (const k of new Set([...mo.keys(), ...mr.keys()])) if ((mo.get(k) || 0) !== (mr.get(k) || 0)) fail(`modal "${k}" count ${mo.get(k) || 0} -> ${mr.get(k) || 0}`);
  notes.push(`strict modals unchanged ${JSON.stringify(Object.fromEntries(mr))}`);
  const SOFT = /\b(?:only|never|will|would|should|could|might)\b/gi;
  const so = tally(oText.toLowerCase(), [SOFT]); const sr = tally(rText.toLowerCase(), [SOFT]);
  for (const k of new Set([...so.keys(), ...sr.keys()])) if ((so.get(k) || 0) !== (sr.get(k) || 0)) notes.push(`hedge "${k}" count ${so.get(k) || 0} -> ${sr.get(k) || 0}`);
}

/* ---------- 4. In-memory build ---------- */
function build(mode) {
  const body = GEN_SRC
    .replace(/^#!.*\n/, '')
    .replace(/^import .*$/gm, '')
    .replace("const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');", '');
  const out = new Map();
  const stubRead = (p, enc) => {
    const u = String(p).replace(/\\/g, '/');
    if (mode === 'draft' && u.endsWith(LIVE_SRC)) return readFileSync(draftPath, enc);
    return readFileSync(p, enc);
  };
  const stubWrite = (p, s) => out.set(basename(String(p)), s);
  const quiet = { log: () => {} };
  new Function('readFileSync', 'writeFileSync', 'join', 'dirname', 'fileURLToPath', 'ROOT', 'console', body)(stubRead, stubWrite, join, dirname, fileURLToPath, ROOT, quiet);
  return out;
}
let LIVE = new Map(); let DRAFT = new Map();
try { LIVE = build('live'); } catch (e) { fail(`live in-memory build failed: ${e.message}`); }
try { DRAFT = build('draft'); } catch (e) { fail(`draft in-memory build failed (assertVerbatim runs inside page()): ${e.message}`); }
const docPart = (h) => { const i = h.indexOf('<div class="pending-doc">'); const j = h.indexOf('\n        </div>\n\n      </div>', i); if (i < 0 || j < 0) throw new Error('pending-doc markers not found'); return [h.slice(0, i), h.slice(i, j), h.slice(j)]; };
if (LIVE.size && DRAFT.size) {
  for (const [f, html] of LIVE) if (rd(join(ROOT, f)) !== html.replace(/\r\n?/g, '\n')) fail(`[baseline] live generator output differs from committed ${f}`);
  notes.push(`baseline: live generator + live sources reproduce all ${LIVE.size} committed pages byte for byte`);
  for (const [f, html] of LIVE) if (f !== PAGE && DRAFT.get(f) !== html) fail(`[build] ${f} is not byte-identical to live`);
  notes.push(`draft build: the ${LIVE.size - 1} other pages are byte-identical to live`);
  const a = LIVE.get(PAGE); const b = DRAFT.get(PAGE);
  const [ah, ad, at] = docPart(a); const [bh, bd, bt] = docPart(b);
  if (ah !== bh || at !== bt) fail(`[${PAGE}] chrome outside the pending-doc changed`);
  if (ad === bd) fail(`[${PAGE}] document body unchanged`);
  if (idSeq(a).join('|') !== idSeq(b).join('|')) fail(`[${PAGE}] page id sequence changed`);
  if (skeleton(a) !== skeleton(b)) fail(`[${PAGE}] page tag skeleton changed`);
  for (const id of DEEP_IDS) if (!b.includes(`id="${id}"`)) fail(`[${PAGE}] deep-link id missing on built page: ${id}`);
  notes.push(`${PAGE}: chrome byte-identical, ${idSeq(b).length} ids and tag skeleton unchanged, #${DEEP_IDS.join(' #')} present`);
  // Every href into the record page, from any root page, document source, the generators or the
  // draft-built pages themselves, resolves on the draft build.
  const sources = [
    ...readdirSync(ROOT).filter((f) => f.endsWith('.html')).map((f) => [f, rd(join(ROOT, f))]),
    ...readdirSync(join(ROOT, 'documents')).filter((f) => /\.(html|md|json)$/.test(f)).map((f) => [`documents/${f}`, rd(join(ROOT, 'documents', f))]),
    ...readdirSync(join(ROOT, 'tools')).filter((f) => f.endsWith('.mjs')).map((f) => [`tools/${f}`, rd(join(ROOT, 'tools', f))]),
    ...[...DRAFT].map(([f, h]) => [`built:${f}`, h]),
  ];
  let n = 0; const files = new Set();
  for (const [f, s] of sources) for (const m of s.matchAll(/pending-ratify-tax-50-record\.html#([\w-]+)/g)) {
    n++; files.add(f.replace(/^built:/, ''));
    if (!b.includes(`id="${m[1]}"`)) fail(`[${f}] ${PAGE}#${m[1]} does not resolve on the draft build`);
  }
  notes.push(`${n} fragment hrefs into ${PAGE} (from ${[...files].join(', ')}) resolve on the draft build`);
}

/* ---------- 5. Guard scope ---------- */
for (const g of ['tools/check-canon.mjs', 'tools/test-canon-guard-mutations.mjs', 'tools/test-code-founding-guards.mjs']) {
  const s = rd(join(ROOT, g));
  for (const name of ['pending-ratify-tax-50-record', 'RATIFY-TAX-50-session-record', 'session-record']) if (s.includes(name)) fail(`[guard scope] ${g} references ${name}: a pin or probe may target this unit`);
}
notes.push('guard scope: no check-canon pin, guard-mutation probe or code guard names the page or source');

/* ---------- 6. Tailwind parity for the rebuilt page ---------- */
try {
  const require = createRequire(join(ROOT, 'package.json'));
  const postcss = require('postcss'); const tailwindcss = require('tailwindcss');
  const cfg = require(join(ROOT, 'tailwind.config.js'));
  const gen = async (content) => (await postcss([tailwindcss({ ...cfg, content })]).process('@tailwind components; @tailwind utilities;', { from: undefined })).css;
  const RR = ROOT.replace(/\\/g, '/');
  const globs = cfg.content.map((g) => `${RR}/${g.replace(/^\.\//, '')}`);
  const swap = (m) => [...globs, `!${RR}/${PAGE}`, { raw: m.get(PAGE), extension: 'html' }];
  const [cs, cl, cd] = await Promise.all([gen(globs), gen(swap(LIVE)), gen(swap(DRAFT))]);
  if (cs !== cl) fail('[tailwind] control failed: swapping the live-built page in raw changed the site CSS, so the exclusion did not work');
  if (cl !== cd) {
    const rules = (css) => new Set(css.split('}').map((x) => x.trim()).filter(Boolean));
    const extra = [...rules(cd)].filter((x) => !rules(cl).has(x));
    const lost = [...rules(cl)].filter((x) => !rules(cd).has(x));
    fail(`[tailwind] generated utilities differ. New from draft text: [${extra.map((x) => x.split('{')[0].trim()).join(', ')}]; lost from live text: [${lost.map((x) => x.split('{')[0].trim()).join(', ')}]`);
  } else notes.push(`tailwind: site-wide components+utilities with the draft-built page equal the live site (${cd.length} bytes; control swap identical)`);
} catch (e) { fail(`[tailwind] parity check could not run: ${e.message}`); }

/* ---------- 7. Ledger ---------- */
const ledger = rd(join(HERE, 'ledger.md'));
const ticks = (s) => [...s.matchAll(/`([^`]+)`/g)].map((m) => m[1]);
let section = null; let target = null;
const counts = {};
for (const line of ledger.split('\n')) {
  if (/^## /.test(line)) { section = /^## \(a\)/.test(line) ? 'a' : /^## \(b\)/.test(line) ? 'b' : null; target = null; continue; }
  if (/^### /.test(line)) {
    const h = line.replace(/^### /, '').trim();
    const bt = h.match(/^built: (\S+)/);
    if (bt) target = { key: `built:${bt[1]}`, flatRaw: flat(DRAFT.get(bt[1]) || ''), flatOrig: flat(LIVE.get(bt[1]) || ''), text: null };
    else if (h.split(' ')[0] === KEY) target = { key: KEY, flatRaw: flat(unquote(R)), flatOrig: flat(unquote(O)), text: rText };
    else { fail(`ledger heading names no draft: ${line}`); target = null; }
    continue;
  }
  if (!section || !target || !/^- /.test(line)) continue;
  const spans = ticks(line.replace(/''[^']*''/g, ''));
  const absent = /\babsent:/.test(line); const na = /\bna:/.test(line);
  const c = (counts[`${section}:${target.key}`] ||= { rows: 0, spans: 0 });
  c.rows++;
  if (!spans.length) { fail(`[ledger ${section} ${target.key}] row has no quote: ${line}`); continue; }
  for (const s of spans) {
    c.spans++;
    if (section === 'b') {
      const hit = target.flatRaw.includes(flat(s));
      if (na) { if (hit || target.flatOrig.includes(flat(s))) fail(`[frozen ${target.key}] marked na: but present in original or draft: ${s}`); continue; }
      if (absent && hit) fail(`[frozen ${target.key}] must be absent but present: ${s}`);
      if (!absent && !hit) fail(`[frozen ${target.key}] frozen string missing: ${s}`);
      if (!absent && !target.flatOrig.includes(flat(s))) fail(`[frozen ${target.key}] listed as frozen but not in the original: ${s}`);
    } else {
      if (!target.text) { fail(`[ledger a] quote row under a non-draft heading: ${line}`); continue; }
      const q = norm(s.replace(/\*\*/g, ''));
      if (!target.text.includes(q)) fail(`[ledger a] quote not in draft: "${s}"`);
      if (words(q) > 15) fail(`[ledger a] quote over 15 words (${words(q)}): "${s}"`);
    }
  }
}
if (!counts[`a:${KEY}`]) fail('fact ledger has no rows');
if (!counts[`b:${KEY}`]) fail('frozen checklist has no rows');

/* ---------- 8. Word counts vs the ledger table ---------- */
const ow = words(oText); const rw = words(rText);
{
  const row = ledger.split('\n').find((l) => l.startsWith('| ') && l.includes(KEY));
  const nums = row ? [...row.matchAll(/\|\s*([\d,]+)\s*(?=\|)/g)].map((m) => Number(m[1].replace(/,/g, ''))) : [];
  if (nums[0] !== ow || nums[1] !== rw) fail(`ledger word counts ${JSON.stringify(nums)} != computed [${ow}, ${rw}]`);
}

/* ---------- 9. Register tells (report only) ---------- */
const REVERSAL = /\b(?:is|are|was) not [^.;:]{1,60}; (?:it|they|this) (?:is|are|was)\b|; (?:it|they) (?:does|do|did) not\b|\bnot [^.;,]{1,40}, but\b|\bnot [^.;,]{1,30} but\b|\brather than\b|, not [^.;,]{1,40}[.;)]/gi;
const prose = (m) => norm(GEN.sourceText(m.split('\n').filter((l) => !/^#/.test(l)).join('\n').replace(/\*\*[^*]+\*\*/g, ' ')));
const cnt = (t, re) => (t.match(re) || []).length;
const tells = `reversal-shaped ${cnt(prose(O), REVERSAL)} -> ${cnt(prose(R), REVERSAL)}; prose em-dashes ${cnt(prose(O), /—/g)} -> ${cnt(prose(R), /—/g)}; semicolons ${cnt(prose(O), /;/g)} -> ${cnt(prose(R), /;/g)}`;

/* ---------- report ---------- */
const a = counts[`a:${KEY}`] || { rows: 0, spans: 0 }; const b = counts[`b:${KEY}`] || { rows: 0, spans: 0 };
console.log(`${KEY}: words ${ow} -> ${rw} (${(((rw - ow) / ow) * 100).toFixed(1)}%); fact ledger ${a.rows} rows/${a.spans} quotes; frozen ${b.rows} rows/${b.spans} strings; ${tells}`);
for (const k of Object.keys(counts).filter((k) => /:built:/.test(k))) console.log(`${k}: ${counts[k].rows} rows/${counts[k].spans} strings`);
for (const n of notes) console.log(`  note: ${n}`);
if (fails.length) { console.log(`FAIL (${fails.length})`); for (const f of fails) console.log(`  - ${f}`); process.exit(1); }
console.log('PASS: frozen strings present, headings/ids/structure unchanged, ledger quotes verbatim, draft build holds every deep link, Tailwind parity holds');
