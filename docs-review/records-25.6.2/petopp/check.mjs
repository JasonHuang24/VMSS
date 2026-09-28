#!/usr/bin/env node
// Records 25.6.2 petopp unit checker. Run: node docs-review/records-25.6.2/petopp/check.mjs
// Reads the two drafts in this folder, the live sources, the live generator and the committed
// pages; writes nothing. Checks:
//  1. LF endings on the drafts, the ledger and this file.
//  2. Markdown structure, original -> draft: heading lines byte-identical; --- rule count; table
//     header/separator lines byte-identical; table row key cells (#, Item, Prov.) and cell counts;
//     bold spans; list shapes (inside blockquotes too); [seat note] and "..." counts; wrap width not
//     widened; no hyphen-at-line-end word splits; rendered tag skeleton and id sequence (the
//     generator's own renderDoc/headingId); the generator's own assertVerbatim on each draft; the
//     opposition's finding blockquotes byte-identical to the live source (R9 verbatim).
//  3. Frozen tokens (figures, sections, rulings, findings, versions, formulas, margins) survive;
//     caps codes, provenance tags, seat and founder mentions and strict modals keep exact counts;
//     the only caps words allowed to drop are the petition's emphasis caps REAL, MOST, LEGAL, ANY.
//  4. In-memory build with the live build-pending-pages.mjs: live sources reproduce all committed
//     pages byte for byte; with the drafts swapped in, every other page is byte-identical, and the
//     ballot and opposition pages keep their chrome, id sequence and tag skeleton; the deep-link ids
//     (#sec-1..5, #sec-7, #finding-1/2/5/7/9, #ungrounded-...) exist, and every href into either
//     page from the statute source resolves.
//  5. Guard scope: no check-canon pin or guard-mutation probe names either page or source.
//  6. Tailwind: a site-wide components+utilities build with the two draft-built pages swapped in for
//     the committed ones equals the build from disk (control: swapping in the live-built pages).
//  7. Ledger: every (a) quote verbatim in its draft and <= 15 words; every (b) string present in
//     its target (absent where marked absent:, absent from original and draft where marked na:);
//     word-count table matches.
import { readFileSync } from 'fs';
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
const D = {
  'RATIFY-TAX-50-petition-v4.1.md': { live: 'docs-review/RATIFY-TAX-50-petition-v4.1.md', page: 'pending-ratify-tax-50-ballot.html', capsDrop: ['REAL', 'MOST', 'LEGAL', 'ANY'],
    ids: ['sec-1', 'sec-2', 'sec-3', 'sec-4', 'sec-5', 'sec-7'] },
  'RATIFY-TAX-50-opposition-brief.md': { live: 'docs-review/RATIFY-TAX-50-opposition-brief.md', page: 'pending-ratify-tax-50-opposition.html', capsDrop: [],
    ids: ['finding-1', 'finding-2', 'finding-5', 'finding-7', 'finding-9', 'ungrounded-instincts-fenced-by-the-reviewer-as-uncitable'] },
};
for (const [key, d] of Object.entries(D)) {
  d.key = key;
  d.draftPath = join(HERE, key);
  if (raw(d.draftPath).includes('\r')) fail(`[${key}] draft contains CR characters (LF required)`);
  d.o = rd(join(ROOT, d.live));
  d.r = rd(d.draftPath);
  if (d.o === d.r) fail(`[${key}] draft is identical to the live source`);
}
for (const f of ['ledger.md', 'check.mjs']) if (raw(join(HERE, f)).includes('\r')) fail(`[${f}] contains CR characters`);

/* ---------- generator functions, taken from the live build-pending-pages.mjs ---------- */
const GEN_SRC = rd(join(ROOT, 'tools/build-pending-pages.mjs'));
const cut = (s, a, b) => { const i = s.indexOf(a); const j = s.indexOf(b, i + 1); if (i < 0 || j < 0) throw new Error(`markers not found: ${a}`); return s.slice(i, j); };
const fnSrc = cut(GEN_SRC, 'const esc = ', '/* ------------------------------------------------------------------ *\n * Page chrome');
const GEN = new Function(`${fnSrc}\nreturn { renderDoc, sourceText, htmlText, assertVerbatim };`)();
for (const d of Object.values(D)) { d.oText = norm(GEN.sourceText(d.o)); d.rText = norm(GEN.sourceText(d.r)); }

/* ---------- 2. Markdown structure ---------- */
const lines = (m) => m.split('\n');
for (const d of Object.values(D)) {
  const k = d.key;
  const heads = (m) => lines(m).filter((l) => /^#{1,6} /.test(l));
  if (JSON.stringify(heads(d.o)) !== JSON.stringify(heads(d.r))) fail(`[${k}] heading lines changed`);
  else notes.push(`${k}: ${heads(d.r).length} heading lines byte-identical`);
  const hr = (m) => lines(m).filter((l) => l.trim() === '---').length;
  if (hr(d.o) !== hr(d.r)) fail(`[${k}] --- rule count ${hr(d.o)} -> ${hr(d.r)}`);
  const rows = (m) => lines(m).filter((l) => l.startsWith('|'));
  const cells = (l) => l.replace(/^\|/, '').replace(/\|\s*$/, '').split('|').map((c) => c.trim());
  const ro = rows(d.o); const rr = rows(d.r);
  if (ro.length !== rr.length) fail(`[${k}] table line count ${ro.length} -> ${rr.length}`);
  else if (ro.length) {
    for (let i = 0; i < ro.length; i++) {
      const a = cells(ro[i]); const b = cells(rr[i]);
      if (i < 2 && ro[i] !== rr[i]) fail(`[${k}] table header/separator changed: ${ro[i]}`);
      if (a.length !== b.length) fail(`[${k}] table row ${a[0]} cell count ${a.length} -> ${b.length}`);
      const key = (c) => [c[0], c[1], c[c.length - 1]].join(' | ');
      if (key(a) !== key(b)) fail(`[${k}] table row key cells changed: ${key(a)} -> ${key(b)}`);
    }
    notes.push(`${k}: ${ro.length} table lines, header/separator byte-identical, row keys (#, Item, Prov.) and cell counts unchanged`);
  }
  const joined = (m) => unquote(m).replace(/\n(?!\n)/g, ' ');
  const bold = (m) => [...joined(m).matchAll(/\*\*(.+?)\*\*/g)].map((x) => norm(x[1]));
  if (JSON.stringify(bold(d.o)) !== JSON.stringify(bold(d.r))) fail(`[${k}] bold spans changed: ${JSON.stringify(bold(d.o).filter((b, i) => b !== bold(d.r)[i]))}`);
  else notes.push(`${k}: ${bold(d.r).length} bold spans unchanged`);
  const listShape = (m) => lines(unquote(m)).filter((l) => /^\s*(?:-|\d+\.)\s/.test(l)).map((l) => `${l.match(/^\s*/)[0].length}:${l.trim().match(/^(-|\d+\.)/)[1]}`).join(',');
  if (listShape(d.o) !== listShape(d.r)) fail(`[${k}] list shape changed: ${listShape(d.o)} vs ${listShape(d.r)}`);
  else notes.push(`${k}: list shape unchanged (${listShape(d.r) || 'none'})`);
  const qLines = (m) => lines(m).filter((l) => l.startsWith('>')).length;
  if ((qLines(d.o) > 0) !== (qLines(d.r) > 0)) fail(`[${k}] blockquote presence changed`);
  for (const [lab, re] of [['[seat note]', /\[seat note\]/g], ['[seat note:', /\[seat note:/g], ['...', /\.\.\./g]]) {
    const a = (d.o.match(re) || []).length; const b = (d.r.match(re) || []).length;
    if (a !== b) fail(`[${k}] ${lab} count ${a} -> ${b}`);
  }
  const hyphenSplit = d.r.match(/[A-Za-z]-\n[>\s]*[a-z]/g);
  if (hyphenSplit) fail(`[${k}] hyphen-at-line-end word split(s): ${JSON.stringify(hyphenSplit)}`);
  const maxBody = (m) => Math.max(...lines(m).filter((l) => !/^#/.test(l) && !l.startsWith('|')).map((l) => [...l].length));
  if (maxBody(d.r) > maxBody(d.o)) fail(`[${k}] wrap: longest body line ${maxBody(d.r)} > live ${maxBody(d.o)}`);
  else notes.push(`${k}: longest body line ${maxBody(d.r)} chars (live ${maxBody(d.o)})`);
  const bo = GEN.renderDoc(d.o); const br = GEN.renderDoc(d.r);
  if (skeleton(bo) !== skeleton(br)) fail(`[${k}] rendered tag skeleton differs`);
  else notes.push(`${k}: rendered tag skeleton unchanged (${(br.match(/<[a-z0-9]+/g) || []).length} tags)`);
  if (idSeq(bo).join('|') !== idSeq(br).join('|')) fail(`[${k}] rendered id sequence differs: ${idSeq(br).join(', ')}`);
  else notes.push(`${k}: ${idSeq(br).length} rendered ids unchanged`);
  for (const id of d.ids) if (!idSeq(br).includes(id)) fail(`[${k}] deep-link id missing: ${id}`);
  try { GEN.assertVerbatim(d.r, br, k); notes.push(`${k}: generator assertVerbatim passes`); }
  catch (e) { fail(`[${k}] generator assertVerbatim: ${e.message}`); }
}
// R9: the opposition's finding blockquotes (everything quoted after the first ---) are the
// reviewer's words and stay byte-identical to the live source.
{
  const d = D['RATIFY-TAX-50-opposition-brief.md'];
  const q = (m) => m.slice(m.indexOf('\n---\n')).split('\n').filter((l) => l.startsWith('>')).join('\n');
  if (q(d.o) !== q(d.r)) fail(`[${d.key}] finding blockquotes differ from the live source (R9 verbatim)`);
  else notes.push(`${d.key}: all ${q(d.r).split('\n').length} finding blockquote lines byte-identical to the live source (R9 verbatim)`);
}

/* ---------- 3. Frozen tokens, caps, modals ---------- */
const TOKENS = [
  /~?\$[\d.,]+[TBM]?(?:\/(?:yr|district))?/g, /[≥±+−-]?\d+(?:\.\d+)?%(?:–\d+%)?/g, /\d+(?:\.\d+)?×/g, /§§?\d+(?:\.\d+)?(?:'s)?(?:\([a-e]\))?(?:–§\d+)?/g,
  /\bR\d+(?:–R\d+)?\b/g, /\bLP-\d+(?:\/LP-\d+)?\b/g, /\bv\d+(?:\.\d+)*\b/g, /\bpass-(?:four|five) Finding \d+\b/g, /\bFinding \d+\b/g,
  /\bitems? \d+(?:\+\d+)?\b/g, /\b(?:XXV\.VI|III\.III|XXVII)\b/g, /\b\d+ (?:months|years)\b/g, /\b\d+-month\b/g, /~\d+\b/g,
  /S←0\.9S\+F/g, /B\*=10F/g, /B\*≈20F/g, /\(1−0\.50\)\/\(1−0\.70\)/g, /R = D = \$572\.25T/g, /\b1\.3D?\b/g,
  /70 \/ 35 \/ 17 \/ 8/g, /70\/35\/17\/8/g, /50 \/ 25 \/ 12\.5 \/ 6\.25/g, /(?:Meritboard|Court|Sanctuary|Main|Lower) −\d+/g, /[−-][123]: \$[\d.]+B/g,
  /\b2295\b/g, /\bQ2\b/g, /\bdesign principle 11\b/g, /\(kill \/ mechanics\)|\(major \/ (?:values|mechanics)\)/g, /\bRATIFY-TAX-50(?:-II)?\b/g,
  /-1 \/ -2 \/ -3/g, /-2\/-3/g, /Sanctuary\+Main/g, /\b(?:34|22|18)%/g, /\[(?:A|E|R|A\/R7|E\/R6)\]/g,
];
const EXACT = [/\bNOT(?:-RATIFIABLE)?\b/g, /\bFAIL\b/g, /\bNO\b/g, /\bRESOLVED\b/g, /\bVERBATIM\b/g, /\bRULING-TIER\b/g, /\bARCHIVE\b/g, /\bNON-OPERATIVE\b/g,
  /\bDRAFT\b/g, /\bRATIFIED\b/g, /\[(?:A|E|R|A\/R7|E\/R6)\]/g, /\bSol\b/g, /\b[Ff]ounder\b/g, /\[seat note/g];
const MODALS = /\b(?:shall|may|must|cannot|can)\b/gi;
const SOFT = /\b(?:only|will|would|should|could)\b/gi;
for (const d of Object.values(D)) {
  const o = tally(d.oText, TOKENS); const r = tally(d.rText, TOKENS);
  for (const [k, n] of o) {
    const rn = r.get(k) || 0;
    if (rn === 0) fail(`[${d.key}] frozen token missing: "${k}" (original ${n}x)`);
    else if (rn !== n) notes.push(`[${d.key}] token count ${k}: ${n} -> ${rn}`);
  }
  for (const [k, n] of r) if (!o.has(k)) fail(`[${d.key}] token new in draft: "${k}" (${n}x)`);
  const eo = tally(d.oText, EXACT); const er = tally(d.rText, EXACT);
  for (const k of new Set([...eo.keys(), ...er.keys()])) if ((eo.get(k) || 0) !== (er.get(k) || 0)) fail(`[${d.key}] exact token "${k}" count ${eo.get(k) || 0} -> ${er.get(k) || 0}`);
  const caps = (t) => tally(t, [/\b[A-Z][A-Z]+(?:-[A-Z]+)*\b/g]);
  const co = caps(d.oText); const cr = caps(d.rText);
  for (const [k, n] of co) {
    const rn = cr.get(k) || 0;
    if (rn === 0 && !d.capsDrop.includes(k)) fail(`[${d.key}] caps word dropped: ${k}`);
    if (rn > 0 && d.capsDrop.includes(k)) fail(`[${d.key}] emphasis caps expected to drop but present: ${k}`);
  }
  for (const [k] of cr) if (!co.has(k)) fail(`[${d.key}] caps word new in draft: ${k}`);
  const mo = tally(d.oText.toLowerCase(), [MODALS]); const mr = tally(d.rText.toLowerCase(), [MODALS]);
  for (const k of new Set([...mo.keys(), ...mr.keys()])) if ((mo.get(k) || 0) !== (mr.get(k) || 0)) fail(`[${d.key}] modal "${k}" count ${mo.get(k) || 0} -> ${mr.get(k) || 0}`);
  notes.push(`${d.key}: modals ${JSON.stringify(Object.fromEntries(mr))} unchanged; seat/founder mentions unchanged`);
  const so = tally(d.oText.toLowerCase(), [SOFT]); const sr = tally(d.rText.toLowerCase(), [SOFT]);
  for (const k of new Set([...so.keys(), ...sr.keys()])) if ((so.get(k) || 0) !== (sr.get(k) || 0)) notes.push(`[${d.key}] hedge "${k}" count ${so.get(k) || 0} -> ${sr.get(k) || 0}`);
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
    if (mode === 'draft') for (const d of Object.values(D)) if (u.endsWith(d.live)) return readFileSync(d.draftPath, enc);
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
const docPart = (h) => { const i = h.indexOf('<div class="pending-doc">'); const j = h.indexOf('\n        </div>\n\n      </div>', i); return [h.slice(0, i), h.slice(i, j), h.slice(j)]; };
if (LIVE.size && DRAFT.size) {
  for (const [f, html] of LIVE) if (rd(join(ROOT, f)) !== html.replace(/\r\n?/g, '\n')) fail(`[baseline] live generator output differs from committed ${f}`);
  notes.push(`baseline: live generator + live sources reproduce all ${LIVE.size} committed pages byte for byte`);
  const targets = Object.values(D).map((d) => d.page);
  for (const [f, html] of LIVE) if (!targets.includes(f) && DRAFT.get(f) !== html) fail(`[build] ${f} is not byte-identical to live`);
  notes.push(`draft build: the ${LIVE.size - 2} other pages are byte-identical to live`);
  for (const d of Object.values(D)) {
    const a = LIVE.get(d.page); const b = DRAFT.get(d.page);
    const [ah, ad, at] = docPart(a); const [bh, bd, bt] = docPart(b);
    if (ah !== bh || at !== bt) fail(`[${d.page}] chrome outside the pending-doc changed`);
    if (ad === bd) fail(`[${d.page}] document body unchanged`);
    if (idSeq(a).join('|') !== idSeq(b).join('|')) fail(`[${d.page}] page id sequence changed`);
    if (skeleton(a) !== skeleton(b)) fail(`[${d.page}] page tag skeleton changed`);
    for (const id of d.ids) if (!b.includes(`id="${id}"`)) fail(`[${d.page}] deep-link id missing on built page: ${id}`);
    notes.push(`${d.page}: chrome byte-identical, ${idSeq(b).length} ids and tag skeleton unchanged, deep-link ids ${d.ids.map((x) => '#' + x).join(' ')} present`);
  }
  const statute = rd(join(ROOT, 'documents/ratify-tax-50-ii-statute-source.html'));
  let n = 0;
  for (const m of statute.matchAll(/href="(pending-ratify-tax-50-(?:ballot|opposition)\.html)#([\w-]+)"/g)) {
    n++;
    if (!DRAFT.get(m[1]).includes(`id="${m[2]}"`)) fail(`[statute source] ${m[1]}#${m[2]} does not resolve on the draft build`);
  }
  notes.push(`statute source: ${n} hrefs into the ballot/opposition resolve on the draft build`);
}

/* ---------- 5. Guard scope ---------- */
for (const g of ['tools/check-canon.mjs', 'tools/test-canon-guard-mutations.mjs', 'tools/test-code-founding-guards.mjs']) {
  const s = rd(join(ROOT, g));
  for (const name of ['pending-ratify-tax-50-ballot', 'pending-ratify-tax-50-opposition', 'RATIFY-TAX-50-petition-v4.1', 'RATIFY-TAX-50-opposition-brief']) if (s.includes(name)) fail(`[guard scope] ${g} references ${name}: a pin or probe may target this unit`);
}
notes.push('guard scope: no check-canon pin, guard-mutation probe or code guard names either page or source');

/* ---------- 6. Tailwind parity for the two rebuilt pages ---------- */
try {
  const require = createRequire(join(ROOT, 'package.json'));
  const postcss = require('postcss'); const tailwindcss = require('tailwindcss');
  const cfg = require(join(ROOT, 'tailwind.config.js'));
  // Whole-site parity: the configured content globs as on disk, versus the same globs with the two
  // pages excluded and their draft-built (or, as a control, live-built) text supplied raw.
  const gen = async (content) => (await postcss([tailwindcss({ ...cfg, content })]).process('@tailwind components; @tailwind utilities;', { from: undefined })).css;
  const R = ROOT.replace(/\\/g, '/');
  const globs = cfg.content.map((g) => `${R}/${g.replace(/^\.\//, '')}`);
  const swap = (m) => [...globs, ...Object.values(D).map((d) => `!${R}/${d.page}`), ...Object.values(D).map((d) => ({ raw: m.get(d.page), extension: 'html' }))];
  const [cs, cl, cd] = await Promise.all([gen(globs), gen(swap(LIVE)), gen(swap(DRAFT))]);
  if (cs !== cl) fail('[tailwind] control failed: swapping the live-built pages in raw changed the site CSS, so the exclusion did not work');
  if (cl !== cd) {
    const rules = (css) => new Set(css.split('}').map((x) => x.trim()).filter(Boolean));
    const extra = [...rules(cd)].filter((x) => !rules(cl).has(x));
    const lost = [...rules(cl)].filter((x) => !rules(cd).has(x));
    fail(`[tailwind] generated utilities differ. New from draft text: [${extra.map((x) => x.split('{')[0].trim()).join(', ')}]; lost from live text: [${lost.map((x) => x.split('{')[0].trim()).join(', ')}]`);
  } else notes.push(`tailwind: site-wide components+utilities with the two draft-built pages equal the live site (${cd.length} bytes; control swap identical)`);
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
    else {
      const d = D[h.split(' ')[0]];
      if (!d) { fail(`ledger heading names no draft: ${line}`); target = null; continue; }
      target = { key: d.key, flatRaw: flat(unquote(d.r)), flatOrig: flat(unquote(d.o)), text: d.rText };
    }
    continue;
  }
  if (!section || !target || !/^- /.test(line)) continue;
  const spans = ticks(line);
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
      const hit = target.text.includes(q);
      if (!hit) fail(`[ledger a ${target.key}] quote not in draft: "${s}"`);
      if (words(q) > 15) fail(`[ledger a ${target.key}] quote over 15 words (${words(q)}): "${s}"`);
    }
  }
}
for (const key of Object.keys(D)) {
  if (!counts[`a:${key}`]) fail(`fact ledger has no rows for ${key}`);
  if (!counts[`b:${key}`]) fail(`frozen checklist has no rows for ${key}`);
}

/* ---------- 8. Word counts vs the ledger table ---------- */
for (const d of Object.values(D)) {
  d.ow = words(d.oText); d.rw = words(d.rText);
  const row = ledger.split('\n').find((l) => l.startsWith('| ') && l.includes(d.key));
  const nums = row ? [...row.matchAll(/\|\s*([\d,]+)\s*(?=\|)/g)].map((m) => Number(m[1].replace(/,/g, ''))) : [];
  if (nums[0] !== d.ow || nums[1] !== d.rw) fail(`[${d.key}] ledger word counts ${JSON.stringify(nums)} != computed [${d.ow}, ${d.rw}]`);
}

/* ---------- 9. Register tells (report only) ---------- */
const REVERSAL = /\b(?:is|are|was) not [^.;:]{1,60}; (?:it|they|this) (?:is|are|was)\b|; (?:it|they) (?:does|do|did) not\b|\bnot [^.;,]{1,40}, but\b|\brather than\b|, not [^.;,]{1,40}[.;]/gi;
const prose = (m) => norm(GEN.sourceText(m.split('\n').filter((l) => !/^#/.test(l)).join('\n').replace(/\*\*[^*]+\*\*/g, ' ')));
for (const d of Object.values(D)) {
  const n = (t) => (t.match(REVERSAL) || []).length; const em = (t) => (t.match(/—/g) || []).length; const semi = (t) => (t.match(/;/g) || []).length;
  d.tells = `reversal-shaped ${n(prose(d.o))} -> ${n(prose(d.r))}; prose em-dashes ${em(prose(d.o))} -> ${em(prose(d.r))}; semicolons ${semi(prose(d.o))} -> ${semi(prose(d.r))}`;
}

/* ---------- report ---------- */
for (const d of Object.values(D)) {
  const a = counts[`a:${d.key}`] || { rows: 0, spans: 0 }; const b = counts[`b:${d.key}`] || { rows: 0, spans: 0 };
  const pct = (((d.rw - d.ow) / d.ow) * 100).toFixed(1);
  console.log(`${d.key}: words ${d.ow} -> ${d.rw} (${pct}%); fact ledger ${a.rows} rows/${a.spans} quotes; frozen ${b.rows} rows/${b.spans} strings; ${d.tells}`);
}
for (const k of Object.keys(counts).filter((k) => /:built:/.test(k))) console.log(`${k}: ${counts[k].rows} rows/${counts[k].spans} strings`);
for (const n of notes) console.log(`  note: ${n}`);
if (fails.length) { console.log(`FAIL (${fails.length})`); for (const f of fails) console.log(`  - ${f}`); process.exit(1); }
console.log('PASS: frozen strings present, headings/ids/structure unchanged, ledger quotes verbatim, draft build holds every deep link, Tailwind parity holds');
