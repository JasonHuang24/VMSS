#!/usr/bin/env node
// Records 25.6.2 advsupp checker. Run: node docs-review/records-25.6.2/advsupp/check.mjs
// Reads the two drafts in this folder, the live sources in docs-review/, the live
// generator tools/build-pending-pages.mjs and the live pages that link in; writes nothing.
// Checks:
//  1. LF endings in every file of this unit.
//  2. Heading lines unchanged; the live generator's headingId() gives the same id
//     sequence, including #concessions-and-why (advocacy) and #concessions (supplemental).
//  3. Markdown structure unchanged: block sequence and kinds, list markers with their
//     indents, blockquote banner byte-identical, bold spans identical except the ten and
//     nine argument titles (count and position still fixed), argument 9 of the advocacy
//     brief still the Lower objection (the statute cites "AB, argument 9").
//  4. The live generator's renderDoc() gives the same tag/attribute/id skeleton for draft
//     and original, the live page body equals renderDoc(original) (baseline), and the
//     generator's own assertVerbatim() passes on the draft.
//  5. Every citation parenthetical unchanged, block by block.
//  6. Frozen tokens (figures, %, x-ratios, $ amounts, layer tokens, LP/R/section/Finding
//     tokens, number words, modals, defined terms) present; count drift reported.
//  7. Seat-name and founder mentions: no new occurrence (Process-tier pages are exempt
//     from the World-tier guard, so the originals' own mentions stay).
//  8. Ledger: every (a) row carries a backticked draft quote (<= 15 words, verbatim in
//     the draft's visible text); every «original» quote is verbatim in the original;
//     every prose block of each original has a ledger subsection; every (b) row present
//     (or absent where marked); word counts match the ledger table.
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..', '..');
const raw = (p) => readFileSync(p, 'utf8');
const rd = (p) => raw(p).replace(/\r\n?/g, '\n');
const fails = [];
const notes = [];
const fail = (m) => fails.push(m);

const DOCS = [
  { key: 'AFFIRM-TAX-50-advocacy-brief.md', short: 'ADV', page: 'pending-ratify-tax-50-advocacy.html', slug: 'concessions-and-why', args: 10 },
  { key: 'AFFIRM-TAX-50-supplemental-brief.md', short: 'SUPP', page: 'pending-ratify-tax-50-supplemental.html', slug: 'concessions', args: 9 },
];
for (const d of DOCS) { d.O = rd(join(ROOT, 'docs-review', d.key)); d.R = rd(join(HERE, d.key)); }
for (const f of [...DOCS.map((d) => d.key), 'ledger.md', 'check.mjs']) if (raw(join(HERE, f)).includes('\r')) fail(`${f}: contains CR characters (LF required)`);

/* ---------- the live generator's own functions ---------- */
const gen = rd(join(ROOT, 'tools/build-pending-pages.mjs'));
const a = gen.indexOf('const esc = ');
const b = gen.indexOf('const PENDING_STYLE');
if (a < 0 || b < 0) throw new Error('generator slice markers not found');
const GEN = new Function(`${gen.slice(a, b)}\nreturn { renderDoc, assertVerbatim, htmlText, sourceText, headingId };`)();
for (const d of DOCS) {
  const k = d.key === DOCS[0].key ? 'adv' : 'supp';
  if (!gen.includes(`${k}: 'docs-review/${d.key}'`)) fail(`[${d.short}] generator SRC.${k} no longer points at docs-review/${d.key}`);
  if (!new RegExp(`body: renderDoc\\(md\\.${k}\\),\\s*verbatim: \\{ md: md\\.${k} \\}`).test(gen)) fail(`[${d.short}] generator no longer renders md.${k} with a verbatim check`);
}

/* ---------- text helpers ---------- */
const norm = (s) => s.replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim();
const words = (t) => t.split(' ').filter((w) => /[A-Za-z0-9]/.test(w)).length;
for (const d of DOCS) {
  d.oVis = norm(GEN.sourceText(d.O));
  d.rVis = norm(GEN.sourceText(d.R));
  d.oWords = words(d.oVis);
  d.rWords = words(d.rVis);
}
const blocks = (m) => m.split(/\n\s*\n/).map((p) => p.replace(/\s+$/, '')).filter((p) => p.trim() !== '');
const kind = (p) => {
  const t = p.replace(/^ +/, '');
  if (/^#{1,6} /.test(t)) return 'h';
  if (t.startsWith('>')) return 'quote';
  let m;
  if ((m = p.match(/^( *)(\d+)\. \*\*/))) return `ol${m[2]}@${m[1].length}`;
  if ((m = p.match(/^( *)- /))) return `ul@${m[1].length}`;
  return `p@${(p.match(/^ */) || [''])[0].length}`;
};
const markers = (m) => m.split('\n').filter((l) => /^ *(?:\d+\.|-) /.test(l)).map((l) => l.match(/^ *(?:\d+\.|-) /)[0]);
const joinLines = (m) => m.replace(/\n(?!\n)/g, ' ');
const boldSpans = (m) => [...joinLines(m).matchAll(/\*\*(.+?)\*\*/g)].map((x) => x[1].replace(/\s*>\s*/g, ' ').replace(/\s+/g, ' ').trim());
const titleSpans = (m) => m.split('\n').filter((l) => /^ *\d+\. \*\*/.test(l)).map((l) => l.match(/^ *\d+\. \*\*(.+?)\*\*/)[1]);

/* Citation parentheticals: "(" + a cited instrument, to the matching ")" (nesting aware). */
const CITE_START = /\((?=Petition v4\.1|LP-07\d|Session Record|Opposition Brief|Rate-History Extract)/g;
function citations(s) {
  const out = [];
  const t = s.replace(/\n\s*/g, ' ');
  for (const m of t.matchAll(CITE_START)) {
    let depth = 0;
    let i = m.index;
    for (; i < t.length; i++) {
      if (t[i] === '(') depth++;
      else if (t[i] === ')') { depth--; if (depth === 0) break; }
    }
    out.push(t.slice(m.index, i + 1));
  }
  return out;
}
const stripCites = (s) => { let t = s.replace(/\n\s*/g, ' '); for (const c of citations(s)) t = t.split(c).join(' '); return t; };

for (const d of DOCS) {
  const S = d.short;
  /* ---------- 2. headings and ids ---------- */
  const heads = (m) => m.split('\n').filter((l) => /^#{1,6} /.test(l));
  if (JSON.stringify(heads(d.O)) !== JSON.stringify(heads(d.R))) fail(`[${S}] heading lines changed`);
  const hO = GEN.renderDoc(d.O);
  const hR = GEN.renderDoc(d.R);
  const ids = (h) => [...h.matchAll(/\bid="([^"]*)"/g)].map((m) => m[1]);
  if (JSON.stringify(ids(hO)) !== JSON.stringify(ids(hR))) fail(`[${S}] rendered id sequence changed: ${ids(hR).join(',')}`);
  if (!ids(hR).includes(d.slug)) fail(`[${S}] deep-link id missing: ${d.slug}`);
  notes.push(`[${S}] heading lines ${heads(d.R).length} unchanged; ids ${ids(hR).map((x) => '#' + x).join(', ')}`);

  /* ---------- 3. Markdown structure ---------- */
  const bo = blocks(d.O);
  const br = blocks(d.R);
  if (bo.length !== br.length) fail(`[${S}] block count ${bo.length} -> ${br.length}`);
  const ko = bo.map(kind);
  const kr = br.map(kind);
  if (JSON.stringify(ko) !== JSON.stringify(kr)) fail(`[${S}] block kinds/indents changed`);
  if (JSON.stringify(markers(d.O)) !== JSON.stringify(markers(d.R))) fail(`[${S}] list markers or indents changed`);
  const quoteO = bo.filter((p) => p.startsWith('>'));
  const quoteR = br.filter((p) => p.startsWith('>'));
  if (JSON.stringify(quoteO) !== JSON.stringify(quoteR)) fail(`[${S}] banner blockquote not byte-identical`);
  const tO = titleSpans(d.O);
  const tR = titleSpans(d.R);
  if (tO.length !== d.args || tR.length !== d.args) fail(`[${S}] argument title count ${tO.length} -> ${tR.length} (expected ${d.args})`);
  const bO = boldSpans(d.O).filter((x) => !tO.includes(x));
  const bR = boldSpans(d.R).filter((x) => !tR.includes(x));
  if (JSON.stringify(bO) !== JSON.stringify(bR)) {
    const diff = bO.map((x, i) => (x === bR[i] ? null : `"${x}" -> "${bR[i]}"`)).filter(Boolean);
    fail(`[${S}] frozen bold spans changed: ${diff.slice(0, 3).join('; ')}`);
  }
  if (boldSpans(d.O).length !== boldSpans(d.R).length) fail(`[${S}] bold span count changed`);
  const changedTitles = tO.filter((x, i) => x !== tR[i]).length;
  notes.push(`[${S}] ${bo.length} blocks, kinds and list markers unchanged; banner byte-identical; ${bR.length} frozen bold spans identical; ${changedTitles} of ${d.args} argument titles reworded`);
  if (S === 'ADV') {
    const nine = br.find((p) => /^9\. \*\*/.test(p)) || '';
    if (!/\[Chamber objection: Lower — /.test(nine)) fail('[ADV] argument 9 is no longer the Lower objection (statute cites "AB, argument 9")');
  }

  /* ---------- 4. rendered skeleton, baseline, generator verbatim check ---------- */
  const skeleton = (h) => h.replace(/>[^<]*</g, '><');
  if (skeleton(hO) !== skeleton(hR)) fail(`[${S}] rendered tag/attribute skeleton differs from the original`);
  const livePage = rd(join(ROOT, d.page));
  const indent = (h) => h.split('\n').map((l) => (l ? '          ' + l : l)).join('\n'); // as page() inserts the body
  const baseline = livePage.includes(`<div class="pending-doc">\n${indent(hO)}\n        </div>`);
  if (!baseline) fail(`[${S}] baseline: live ${d.page} body is not renderDoc(original) (sources and page out of sync)`);
  let verbatimOk = true;
  try { GEN.assertVerbatim(d.R, hR, `${S} draft`); } catch (e) { verbatimOk = false; fail(`[${S}] generator assertVerbatim: ${e.message.split('\n')[0]}`); }
  if (skeleton(hO) === skeleton(hR) && baseline && verbatimOk) notes.push(`[${S}] rendered skeleton identical (${(hR.match(/<[a-z0-9]+/g) || []).length} tags); live page body = renderDoc(original); assertVerbatim passes on the draft`);

  /* ---------- 5. citation parentheticals ---------- */
  let nCites = 0;
  for (let i = 0; i < Math.min(bo.length, br.length); i++) {
    const co = citations(bo[i]);
    const cr = citations(br[i]);
    nCites += co.length;
    if (JSON.stringify(co) !== JSON.stringify(cr)) fail(`[${S}] block ${i}: citations changed: ${JSON.stringify(co)} -> ${JSON.stringify(cr)}`);
  }
  notes.push(`[${S}] ${nCites} citation parentheticals identical, block by block`);

  /* ---------- 6. frozen tokens ---------- */
  const TOKENS = [
    /\$\d+(?:\.\d+)? (?:million|billion|trillion)/g, /\b\d+(?:\.\d+)?%/g, /\d+(?:\.\d+)?×/g, /\b\d+\/\d+\/\d+\/\d+\b/g,
    /\b\d+ \/ \d+(?:\.\d+)? \/ \d+(?:\.\d+)? \/ \d+(?:\.\d+)?\b/g, /[−-][123]\b/g, /\bLP-\d+\b/g, /\bR\d+\b/g, /§+[0-9][0-9.()a-z–]*/g,
    /\bFindings? (?:\d+|I–IV|III)\b/g, /\bB1–B6\b/g, /\b\d+(?:\.\d+)?\b/g, /\bv\d+(?:\.\d+)+\b/g, /\\\([^)]*\\\)/g, /`[^`]+`/g,
    /\b(?:one|two|three|four|five|six|seven|eight|nine|ten|twelve|once|fifty|seventy)\b/gi,
    /\b(?:must|may|cannot|can|should|shall|would|could|only|never)\b/gi,
    /\b(?:RULING-TIER|Trajectory Principle|Path 2|cadence rider|condition precedent|SCM|ADT|PJS|RATIFY-TAX-50|AFFIRM-TAX-50|hysteresis|Hysteresis|Main-treasury|automation-side|gate|Meritboard|Court|Sanctuary|Main|Lower|whale savings|stock-level|real-flat|corrective LP|federal-tier|abundance posture|anti-concentration anchor|Record field|Trigger field)\b/g,
  ];
  const count = (t) => { const m = new Map(); for (const re of TOKENS) for (const x of t.matchAll(re)) { const k = /[A-Z]/.test(x[0]) && re.flags.includes('i') ? x[0].toLowerCase() : x[0]; m.set(k, (m.get(k) || 0) + 1); } return m; };
  const co = count(d.oVis);
  const cr = count(d.rVis);
  let drift = [];
  for (const [k, n] of co) {
    const rn = cr.get(k) || 0;
    if (rn === 0) fail(`[${S}] frozen token missing: "${k}" (original ${n}x)`);
    else if (rn !== n) drift.push(`${k} ${n}->${rn}`);
  }
  const fresh = [...cr.keys()].filter((k) => !co.has(k));
  notes.push(`[${S}] ${co.size} distinct frozen tokens all present` + (drift.length ? `; count drift: ${drift.join(', ')}` : '') + (fresh.length ? `; new: ${fresh.join(', ')}` : ''));

  /* ---------- 7. seat names and founder mentions ---------- */
  const SEAT = /\b(Sol|Opus|Fable|GPT|Claude)\b/g;
  const FOUNDER = /\bfounder\b[^ ]*(?: \w+)?/gi;
  const list = (t, re) => [...t.matchAll(re)].map((m) => m[0]);
  const so = list(d.oVis, SEAT);
  const sr = list(d.rVis, SEAT);
  if (JSON.stringify(so) !== JSON.stringify(sr)) fail(`[${S}] seat-name mentions changed: ${so.join(',')} -> ${sr.join(',')}`);
  const fo = list(d.oVis, FOUNDER).map((x) => x.split(' ')[0]);
  const fr = list(d.rVis, FOUNDER).map((x) => x.split(' ')[0]);
  if (fr.length > fo.length) fail(`[${S}] new founder mention`);
  if (/founder(?:'|’)?s ruling/i.test(d.rVis) && !/founder(?:'|’)?s ruling/i.test(d.oVis)) fail(`[${S}] new founder's-ruling phrasing`);
  if (/lawful nonactivation/i.test(d.rVis) || /Schedule A[^.]{0,120}\brefused\b/i.test(d.rVis)) fail(`[${S}] superseded refusal phrasing`);
  notes.push(`[${S}] seat names unchanged (${sr.join(', ') || 'none'}); founder mentions ${fo.length} -> ${fr.length} (Process tier: exempt from the World-tier guard)`);

  /* ---------- register tells (report only) ---------- */
  const prose = (m) => stripCites(m.split('\n').filter((l) => !/^#/.test(l) && !/^>/.test(l)).join('\n')).replace(/\*\*[^*]+\*\*/g, ' ');
  const em = (m) => (prose(m).match(/—/g) || []).length;
  const REV = [/\b(?:is|are|was) not [^.;:]{1,60}[;:] (?:it|they|this) (?:is|are|was)\b/gi, /\bnot [^.;:]{1,60}\. (?:It|They|This) (?:is|are|was)\b/g, /—not\b/g, /\bis not the same as\b/g, /\bis therefore not\b/g, /\bis not neutrality\b/g];
  const rev = (m) => REV.reduce((n, re) => n + (prose(m).match(re) || []).length, 0);
  d.tells = `em-dashes in prose ${em(d.O)} -> ${em(d.R)}; reversal constructions ${rev(d.O)} -> ${rev(d.R)}`;
}

/* ---------- 8. ledger ---------- */
const ledger = rd(join(HERE, 'ledger.md'));
const TICKS = /``\s(.+?)\s``|`([^`]+)`/g;
const ticks = (s) => [...s.matchAll(TICKS)].map((m) => m[1] ?? m[2]);
const origQ = (s) => [...s.matchAll(/«([^»]+)»/g)].map((m) => m[1]);
let section = null;
let cur = null;
let liveFile = null;
let mode = null;
const stat = Object.fromEntries(DOCS.map((d) => [d.short, { rows: 0, spans: 0, orig: 0, blocks: new Set(), frozen: 0 }]));
let liveRows = 0;
let absentRows = 0;
let renderedRows = 0;
for (const line of ledger.split('\n')) {
  if (/^## /.test(line)) { section = /^## \(a\)/.test(line) ? 'a' : /^## \(b\)/.test(line) ? 'b' : null; cur = null; mode = null; continue; }
  if (/^### /.test(line)) {
    cur = DOCS.find((d) => line.includes(d.key)) || null;
    mode = /^### live:/.test(line) ? 'live' : /^### absent:/.test(line) ? 'absent' : /^### rendered:/.test(line) ? 'rendered' : cur ? 'doc' : null;
    liveFile = mode === 'live' ? line.match(/^### live: (\S+)/)[1] : null;
    continue;
  }
  if (section === 'a' && cur && /^#### /.test(line)) {
    for (const m of line.matchAll(/\[b(\d+)\]/g)) stat[cur.short].blocks.add(Number(m[1]));
    continue;
  }
  if (!/^\s*- /.test(line)) continue;
  const spans = ticks(line);
  if (section === 'a' && cur) {
    stat[cur.short].rows++;
    if (!spans.length) { fail(`[${cur.short}] ledger (a) row has no draft quote: ${line}`); continue; }
    for (const s of spans) {
      stat[cur.short].spans++;
      const q = norm(s);
      if (!cur.rVis.includes(q)) fail(`[${cur.short}] ledger quote not in draft: "${s}"`);
      if (words(q) > 15) fail(`[${cur.short}] ledger quote over 15 words (${words(q)}): "${s}"`);
    }
    for (const s of origQ(line)) {
      stat[cur.short].orig++;
      if (!cur.oVis.includes(norm(s))) fail(`[${cur.short}] «original» quote not in original: "${s}"`);
      if (words(norm(s)) > 15) fail(`[${cur.short}] «original» quote over 15 words: "${s}"`);
    }
  }
  if (section === 'b') {
    if (!spans.length) { fail(`ledger (b) row has no string: ${line}`); continue; }
    for (const s of spans) {
      const q = s.replace(/\s+/g, ' ');
      if (mode === 'doc') { stat[cur.short].frozen++; if (!cur.R.replace(/\s+/g, ' ').includes(q)) fail(`[${cur.short}] frozen string missing from draft: "${s}"`); }
      else if (mode === 'rendered') { renderedRows++; if (!GEN.renderDoc(cur.R).includes(q)) fail(`[${cur.short}] rendered string missing: "${s}"`); }
      else if (mode === 'live') { liveRows++; if (!rd(join(ROOT, liveFile)).replace(/\s+/g, ' ').includes(q)) fail(`live string missing from ${liveFile}: "${s}"`); }
      else if (mode === 'absent') { absentRows++; for (const d of DOCS) if (d.R.includes(q)) fail(`[${d.short}] string marked absent occurs in draft: "${s}"`); }
    }
  }
}
for (const d of DOCS) {
  const need = blocks(d.O).map((p, i) => [p, i]).filter(([p]) => !/^#/.test(p)).map(([, i]) => i);
  const miss = need.filter((i) => !stat[d.short].blocks.has(i));
  if (miss.length) fail(`[${d.short}] original blocks without a ledger subsection: ${miss.map((i) => 'b' + i).join(', ')}`);
  const row = ledger.split('\n').find((l) => l.startsWith('|') && l.includes(d.key));
  const nums = row ? [...row.matchAll(/\|\s*([\d,]+)\s*(?=\|)/g)].map((m) => Number(m[1].replace(/,/g, ''))) : [];
  if (nums[0] !== d.oWords || nums[1] !== d.rWords) fail(`[${d.short}] ledger word counts ${JSON.stringify(nums)} != computed [${d.oWords}, ${d.rWords}]`);
}

/* ---------- report ---------- */
for (const n of notes) console.log(n);
for (const d of DOCS) {
  const s = stat[d.short];
  const pct = (((d.rWords - d.oWords) / d.oWords) * 100).toFixed(1);
  console.log(`[${d.short}] words ${d.oWords} -> ${d.rWords} (${pct}%); ${d.tells}; ledger (a) ${s.rows} rows, ${s.spans} draft quotes, ${s.orig} original quotes, ${s.blocks.size} blocks covered; (b) ${s.frozen} frozen strings`);
}
console.log(`ledger (b): ${renderedRows} rendered, ${liveRows} live, ${absentRows} absent rows`);
if (fails.length) { console.log(`FAIL (${fails.length})`); for (const f of fails) console.log(`  - ${f}`); process.exit(1); }
console.log('PASS: headings, ids, structure, citations, frozen strings and tokens intact; generator verbatim check passes; every ledger quote verbatim in the draft');
