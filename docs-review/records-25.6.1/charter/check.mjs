#!/usr/bin/env node
// Records 25.6.1 charter-unit checker. Run: node docs-review/records-25.6.1/charter/check.mjs
// Reads the draft in this folder, the live source and the live generator; writes nothing.
// Checks: LF endings; heading lines, rules, paragraph sequence, paragraph labels,
// bold spans, italic spans and list shape unchanged; the live generator's renderDoc
// (charterCfg) gives the same tag/id skeleton for draft and original; art-1..14
// contiguous, s-10-4 / s-12-3 / parameter-schedule present; linkFirst finds 'a schedule
// adopted by the chambers' inside §10.4; the generator's assertVerbatim passes on the
// linked body; frozen quotations (§12.3 original text, Parameter Schedule, the Block E
// sentence the Presidential ruling quotes, §4.5's cross-quotes) unchanged; numeric,
// section, LP/RR, Article/Finding and number-word tokens unchanged; operative modals
// unchanged paragraph by paragraph; World-tier regexes; every ledger quote verbatim in
// the draft (<= 15 words); every frozen-string row present (or absent where marked);
// every original paragraph has a fact-ledger heading; word counts match the ledger.
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..', '..');
const raw = (p) => readFileSync(p, 'utf8');
const rd = (p) => raw(p).replace(/\r\n?/g, '\n');
const KEY = 'path-2-charter-source.md';
const fails = [];
const notes = [];
const fail = (m) => fails.push(m);

const O = rd(join(ROOT, 'documents', KEY));
const R = rd(join(HERE, KEY));
for (const f of [KEY, 'ledger.md', 'check.mjs']) if (raw(join(HERE, f)).includes('\r')) fail(`${f}: contains CR characters (LF required)`);

/* ---------- text helpers ---------- */
const norm = (s) => s.replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim();
const flat = (s) => s.replace(/\s+/g, ' ');
const mdText = (md) => norm(md.split('\n').map((l) => l.replace(/^#{1,6}\s+/, '')).filter((l) => l.trim() !== '---')
  .join(' ').replace(/\*\*/g, '').replace(/\*/g, ''));
const words = (t) => t.split(' ').filter((w) => /[A-Za-z0-9]/.test(w)).length;
const oText = mdText(O);
const rText = mdText(R);

/* ---------- the live generator's own functions ---------- */
const gen = rd(join(ROOT, 'tools/build-path2-pages.mjs'));
const a = gen.indexOf('const esc = ');
const b = gen.indexOf('const scheduleCfg');
if (a < 0 || b < 0) throw new Error('generator slice markers not found');
const GEN = new Function(`${gen.slice(a, b)}\nreturn { renderDoc, assertVerbatim, linkFirst, htmlText, charterCfg };`)();

/* ---------- 1. Markdown structure ---------- */
const heads = (m) => m.split('\n').filter((l) => /^#{1,6} /.test(l));
if (JSON.stringify(heads(O)) !== JSON.stringify(heads(R))) fail('heading lines changed');
else notes.push(`heading lines: ${heads(R).length} unchanged`);
const hr = (m) => m.split('\n').filter((l) => l.trim() === '---').length;
if (hr(O) !== hr(R)) fail(`--- rule count ${hr(O)} -> ${hr(R)}`);
if (/^\s*(?:-|\d+\.)\s/m.test(O) !== /^\s*(?:-|\d+\.)\s/m.test(R)) fail('list shape changed');
const joined = (m) => m.replace(/\n(?!\n)/g, ' ');
const bold = (m) => [...joined(m).matchAll(/\*\*(.+?)\*\*/g)].map((x) => norm(x[1]));
if (JSON.stringify(bold(O)) !== JSON.stringify(bold(R))) fail('bold spans changed');
else notes.push(`bold spans: ${bold(R).length} unchanged`);
const ital = (m) => [...joined(m).replace(/\*\*/g, '').matchAll(/\*(.+?)\*/g)].map((x) => norm(x[1]));
const NOTE = 'Disposition history note:';
const italKey = (list) => list.map((s) => (s.startsWith(NOTE) ? NOTE : s));
if (JSON.stringify(italKey(ital(O))) !== JSON.stringify(italKey(ital(R)))) fail('italic spans changed');
else notes.push(`italic spans: ${ital(R).length} unchanged (disposition-note body compared by label only)`);

const blocks = (m) => m.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
const kind = (p) => (/^#{1,6} /.test(p) ? 'h' : p === '---' ? 'hr' : 'p');
const label = (p) => {
  const t = norm(p);
  let m;
  if ((m = t.match(/^\*\*(.+?)\*\*/))) return m[1];
  if ((m = t.match(/^\*([^*]+?:)\*/))) return m[1];
  if ((m = t.match(/^\*([^*]+?:)/))) return m[1];
  return t.replace(/\*/g, '').split(' ').slice(0, 3).join(' ');
};
const bo = blocks(O);
const br = blocks(R);
if (bo.length !== br.length) fail(`block count ${bo.length} -> ${br.length}`);
const paraLabels = [];
for (let i = 0; i < Math.min(bo.length, br.length); i++) {
  if (kind(bo[i]) !== kind(br[i])) { fail(`block ${i}: kind ${kind(bo[i])} -> ${kind(br[i])}`); continue; }
  if (kind(bo[i]) !== 'p') continue;
  const lo = label(bo[i]);
  paraLabels.push(lo);
  const isMarked = /^\*/.test(bo[i]);
  if (isMarked && lo !== label(br[i])) fail(`block ${i}: paragraph label "${lo}" -> "${label(br[i])}"`);
  const ao = GEN.charterCfg.paraAnchor(bo[i].split('\n').join(' '));
  const ar = GEN.charterCfg.paraAnchor(br[i].split('\n').join(' '));
  if (ao !== ar) fail(`block ${i}: paragraph anchor ${ao} -> ${ar}`);
}
const bodyMax = (m) => Math.max(...m.split('\n').filter((l) => !/^#/.test(l)).map((l) => [...l].length));
if (bodyMax(R) > bodyMax(O)) fail(`wrap: longest body line ${bodyMax(R)} > live ${bodyMax(O)}`);
else notes.push(`longest body line ${bodyMax(R)} chars (live ${bodyMax(O)})`);

/* ---------- 2. Rendered structure via the live generator ---------- */
const skeleton = (h) => h.replace(/>[^<]*</g, '><');
const hO = GEN.renderDoc(O, GEN.charterCfg);
let hR = GEN.renderDoc(R, GEN.charterCfg);
if (skeleton(hO) !== skeleton(hR)) fail('rendered tag/attribute skeleton differs from the original');
else notes.push('rendered tag/attribute skeleton identical to the original');
const ids = (h) => [...h.matchAll(/\bid="([^"]*)"/g)].map((m) => m[1]);
if (JSON.stringify(ids(hO)) !== JSON.stringify(ids(hR))) fail('rendered id sequence changed');
const art = ids(hR).filter((x) => /^art-\d+$/.test(x)).map((x) => Number(x.slice(4)));
if (!(art.length === 14 && art.every((n, i) => n === i + 1))) fail(`art-1..14 not contiguous: ${art.join(',')}`);
for (const id of ['s-10-4', 's-12-3', 'parameter-schedule']) if (!ids(hR).includes(id)) fail(`rendered id missing: ${id}`);
notes.push(`rendered ids: ${ids(hR).length} (art-${art[0]}..art-${art[art.length - 1]}), identical to the original`);
const PHRASE = 'a schedule adopted by the chambers';
try {
  const at = hR.indexOf(PHRASE);
  const s104 = hR.indexOf('id="s-10-4"');
  const next = hR.indexOf('<p ', s104 + 1);
  if (!(s104 >= 0 && at > s104 && at < next)) fail('linkFirst phrase: first occurrence is not inside the §10.4 paragraph');
  hR = GEN.linkFirst(hR, PHRASE, 'path-2-schedule.html#part-a');
  notes.push('linkFirst anchor found inside §10.4');
} catch (e) { fail(`linkFirst: ${e.message}`); }
try { const n = GEN.assertVerbatim(R, hR, 'charter draft'); notes.push(`generator assertVerbatim passes on the linked body (${n} chars)`); }
catch (e) { fail(`generator assertVerbatim: ${e.message}`); }
const hRtext = GEN.htmlText(hR);

/* ---------- 3. Frozen quotations and frozen blocks ---------- */
const quoteOf = (m) => (m.match(/“[^”]+”/) || [''])[0].replace(/\s+/g, ' ');
if (!quoteOf(O) || quoteOf(O) !== quoteOf(R)) fail('§12.3 original 2279 text is not verbatim');
else notes.push('§12.3 original 2279 text: verbatim');
const paramBlock = (m) => { const bl = blocks(m); const i = bl.findIndex((p) => p.startsWith('## Parameter Schedule')); return norm(bl[i + 1] || ''); };
if (!paramBlock(O) || paramBlock(O) !== paramBlock(R)) fail('Parameter Schedule paragraph changed');
else notes.push('Parameter Schedule paragraph: verbatim');
const ruling = rd(join(ROOT, 'documents/path-2-presidential-ruling-source.md'));
const blockE = (norm(ruling).match(/Block E, because ("un-shown"[^.]*\.)/) || [])[1];
if (!blockE) fail('could not extract the Block E quotation from the live Presidential ruling');
else if (!rText.includes(blockE)) fail(`Block E quotation missing from draft: ${blockE}`);
else notes.push(`Block E quotation present verbatim: ${blockE}`);
const blockBy = (bl, lab) => bl.find((p) => label(p) === lab) || '';
for (const [phrase, homes] of [
  ['by attribution to the schedule change', ['§3.2 Finding II — ADT elasticity.', '§4.5 Identification conservatism.']],
  ['attributable to the retained capital', ['§3.4 Finding IV — Marginal utility of retained capital.', '§4.5 Identification conservatism.']],
]) for (const h of homes) if (!norm(blockBy(br, h)).includes(phrase)) fail(`cross-quoted phrase "${phrase}" missing from ${h}`);

/* ---------- 4. Tokens ---------- */
const TOKENS = {
  numeric: /\d+(?:[.\/:-]\d+)*/g,
  section: /§§?\d+(?:\.\d+)?[A-Z]?(?:\([a-z]+\))?(?:\([ivx]+\))?(?:–\d+(?:\.\d+)?)?/g,
  refs: /\b(?:LP|RR)-\d+|\bSchedule [AB]\b|\bB\d(?:–B\d)?\b|\bY\d{3}\b|SHA-256/g,
  roman: /\b(?:Findings?|Articles?|Part) [IVX]+\b(?:(?:–| and )[IVX]+\b)?/g,
  enumerators: /\((?:[a-f]|i|ii|iii|iv)\)/g,
  numberWords: /\b(?:one|two|three|four|ten|twenty|thirty|ninety|eighty|hundred|zero|single)\b/gi,
};
const tally = (t, re) => { const m = new Map(); for (const x of t.matchAll(re)) { const k = x[0].toLowerCase(); m.set(k, (m.get(k) || 0) + 1); } return m; };
const ALLOWED_TOKEN_DELTAS = new Set([]);
for (const [name, re] of Object.entries(TOKENS)) {
  const o = tally(oText, re); const r = tally(rText, re);
  let diffs = 0;
  for (const k of new Set([...o.keys(), ...r.keys()])) {
    const on = o.get(k) || 0; const rn = r.get(k) || 0;
    if (on === rn) continue;
    diffs++;
    const msg = `${name} token "${k}": ${on} -> ${rn}`;
    if (ALLOWED_TOKEN_DELTAS.has(`${name}:${k}`)) notes.push(`${msg} (allowed; see ledger flags)`); else fail(msg);
  }
  if (!diffs) notes.push(`${name} tokens: ${[...o.values()].reduce((x, y) => x + y, 0)} unchanged`);
}

/* ---------- 5. Operative modals, paragraph by paragraph ---------- */
const MODAL = /\b(?:shall|may|must|cannot|can)\b/gi;
const ALLOWED_MODAL_DELTAS = new Set([]);
let modalTotal = 0;
for (let i = 0; i < Math.min(bo.length, br.length); i++) {
  if (kind(bo[i]) !== 'p') continue;
  const o = tally(mdText(bo[i]), MODAL); const r = tally(mdText(br[i]), MODAL);
  for (const k of new Set([...o.keys(), ...r.keys()])) {
    const on = o.get(k) || 0; const rn = r.get(k) || 0;
    modalTotal += on;
    if (on !== rn && !ALLOWED_MODAL_DELTAS.has(`${label(bo[i])}|${k}`)) fail(`[${label(bo[i])}] modal "${k}" ${on} -> ${rn}`);
  }
}
notes.push(`operative modals: ${modalTotal} in the original, per-paragraph counts unchanged`);
const SOFT = /\b(?:only|not|no|never|nothing|none|neither|every|each|any|all|would|should|will|could)\b/gi;
{
  const o = tally(oText, SOFT); const r = tally(rText, SOFT);
  const d = [...new Set([...o.keys(), ...r.keys()])].filter((k) => (o.get(k) || 0) !== (r.get(k) || 0)).map((k) => `${k} ${o.get(k) || 0}->${r.get(k) || 0}`);
  notes.push(`quantifier/negation drift (report only): ${d.join(', ') || 'none'}`);
}

/* ---------- 6. World-tier regexes (check-canon) on the rendered draft text ---------- */
const SEAT = /\b(Sol|Opus|Fable|GPT|Claude)\b/;
const FOUNDER = /founder(?:'|’)?s? (?:ruling|override)/i;
const TIER = /\b(?:tax(?:ation|es)?|tax code|rate schedule|top marginal rates?|the (?:rate )?cascade)\b[^.!?]{0,60}\b(?:is|are|sits? at|remains?)\b[^.!?]{0,40}\b(?:charter-level|charter level|constitutional(?:ly)?|charter-tier)\b/i;
const SUPERSEDED = /(?:Finding III[^.!?]{0,100}(?:fail(?:ed|ure)?|did not pass)|Schedule A\b[^.!?]{0,100}(?:refus(?:ed|al)|reject(?:ed|ion)|not certified)|Schedule B\b[^.!?]{0,100}(?:not reached|refus(?:ed|al)|reject(?:ed|ion)|not certified)|2294[^.!?]{0,120}(?:three findings passed|one finding failed|both refusals)|lawful (?:nonactivation|failure)|both refusals|chain with three links)/i;
for (const [name, re] of [['seat name', SEAT], ['founder ruling/override', FOUNDER], ['taxation-is-Charter-level', TIER], ['superseded refusal outcome', SUPERSEDED]]) {
  const m = hRtext.match(re);
  if (m) fail(`World-tier guard (${name}): "${m[0]}"`);
}
notes.push('World-tier regexes (seat names, founder ruling/override, tier misattribution, superseded refusal outcome): clean');

/* ---------- 7. Ledger ---------- */
const ledger = rd(join(HERE, 'ledger.md'));
const ticks = (s) => [...s.matchAll(/`([^`]+)`/g)].map((m) => m[1]);
const TARGETS = {
  [KEY]: { flatRaw: flat(R), text: rText },
  [`rendered: ${KEY}`]: { flatRaw: flat(hR), text: null },
};
const liveTarget = (p) => ({ flatRaw: flat(rd(join(ROOT, p))), text: null });
let section = null; let target = null; let tname = null;
const counts = {};
const ledgerHeads = new Set();
for (const line of ledger.split('\n')) {
  if (/^## /.test(line)) { section = /^## \(a\)/.test(line) ? 'a' : /^## \(b\)/.test(line) ? 'b' : null; target = null; continue; }
  if (/^#### /.test(line)) { if (section === 'a') ledgerHeads.add(norm(line.replace(/^#### /, ''))); continue; }
  if (/^### /.test(line)) {
    const h = line.replace(/^### /, '').trim();
    const live = h.match(/^live: (\S+)/);
    tname = live ? `live:${live[1]}` : h.split(' (')[0];
    target = live ? liveTarget(live[1]) : TARGETS[tname];
    if (!target) fail(`ledger heading names no target: ${line}`);
    continue;
  }
  if (!section || !target || !/^- /.test(line)) continue;
  const spans = ticks(line);
  const absent = /^- absent:/.test(line);
  const c = (counts[`${section}:${tname}`] ||= { rows: 0, spans: 0 });
  c.rows++;
  if (!spans.length) { fail(`[ledger ${section} ${tname}] row has no quote: ${line}`); continue; }
  for (const s of spans) {
    c.spans++;
    if (section === 'b' || !target.text) {
      const hit = target.flatRaw.includes(flat(s));
      if (absent && hit) fail(`[frozen ${tname}] must be absent but present: ${s}`);
      if (!absent && !hit) fail(`[frozen ${tname}] frozen string missing: ${s}`);
    } else {
      const q = norm(s);
      const hit = target.text.includes(q);
      if (absent && hit) fail(`[ledger a] must be absent but present: "${s}"`);
      if (!absent && !hit) fail(`[ledger a] quote not in draft: "${s}"`);
      if (!absent && words(q) > 15) fail(`[ledger a] quote over 15 words (${words(q)}): "${s}"`);
    }
  }
}
if (!counts[`a:${KEY}`]) fail('fact ledger has no rows for the draft');
if (!counts[`b:${KEY}`]) fail('frozen checklist has no rows for the draft');
const hasHead = (l) => [...ledgerHeads].some((h) => h.startsWith(norm(l)));
const uncovered = paraLabels.filter((l) => !hasHead(l));
if (!hasHead('Title block')) uncovered.unshift('Title block');
for (const l of uncovered) fail(`fact ledger has no #### heading for original paragraph: ${l}`);
notes.push(`fact-ledger coverage: ${paraLabels.length} original paragraphs + title block, each with a #### heading`);

/* ---------- 8. Word counts vs the ledger table ---------- */
const ow = words(oText); const rw = words(rText);
{
  const row = ledger.split('\n').find((l) => l.startsWith('| ') && l.includes(KEY));
  const nums = row ? [...row.matchAll(/\|\s*([\d,]+)\s*(?=\|)/g)].map((m) => Number(m[1].replace(/,/g, ''))) : [];
  if (nums[0] !== ow || nums[1] !== rw) fail(`ledger word counts ${JSON.stringify(nums)} != computed [${ow}, ${rw}]`);
}

/* ---------- 9. Register tells (report only) ---------- */
const prose = (m) => norm(blocks(m).filter((p) => kind(p) === 'p').map((p) => p.replace(/\n/g, ' ')).join(' ')
  .replace(/\*\*.+?\*\*/g, ' ').replace(/\*[^*]+?:\*/g, ' '));
const REVERSAL = /\b(?:is|are|was) not [^.;:]{1,60}; (?:it|they|this) (?:is|are|was)\b|; (?:it|they) (?:does|do|did) not\b|, not (?:by |an? |the )?\w+[,;.]/gi;
const em = (t) => (t.match(/—/g) || []).length;
const rev = (t) => (t.match(REVERSAL) || []).length;
const semis = (t) => (t.match(/;/g) || []).length;
notes.push(`register tells (report only): prose em-dashes ${em(prose(O))} -> ${em(prose(R))}; reversal patterns ${rev(prose(O))} -> ${rev(prose(R))}; semicolons ${semis(prose(O))} -> ${semis(prose(R))}`);

/* ---------- 10. Pins that live outside this file (untouched pages) ---------- */
const sched = rd(join(ROOT, 'documents/path-2-schedule-source.md'));
if (!sched.includes('Operative Measure') || !/part d/i.test(sched)) fail('schedule source lost Operative Measure / Part D (not this unit, but reported)');
if (O.includes('Operative Measure') || /part d/i.test(O)) notes.push('NOTE: original charter carries Operative Measure / Part D');
notes.push(`'Operative Measure' and /part d/i: schedule pins (absent from the charter original ${O.includes('Operative Measure') || /part d/i.test(O) ? 'NO' : 'and draft alike'}); present in documents/path-2-schedule-source.md`);

/* ---------- report ---------- */
const pct = (((rw - ow) / ow) * 100).toFixed(1);
const fa = counts[`a:${KEY}`] || { rows: 0, spans: 0 };
const fb = Object.entries(counts).filter(([k]) => k.startsWith('b:')).map(([k, v]) => `${k.slice(2)} ${v.rows}/${v.spans}`).join('; ');
console.log(`${KEY}: words ${ow} -> ${rw} (${pct}%); fact ledger ${fa.rows} rows/${fa.spans} quotes; frozen checklist rows/strings: ${fb}`);
for (const n of notes) console.log(`  note: ${n}`);
if (fails.length) { console.log(`FAIL (${fails.length})`); for (const f of fails) console.log(`  - ${f}`); process.exit(1); }
console.log('PASS: frozen strings present, headings/ids/structure unchanged, generator assertVerbatim + linkFirst pass, modals and tokens unchanged, ledger quotes verbatim');
