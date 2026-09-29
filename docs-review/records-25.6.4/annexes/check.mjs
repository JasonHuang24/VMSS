#!/usr/bin/env node
// Records 25.6.4 annexes unit checker. Run: node docs-review/records-25.6.4/annexes/check.mjs
// Reads the six drafts in this folder, the live sources in documents/, ledger.md and the guard
// tools; writes nothing. Checks:
//  1. LF endings on the drafts, the ledger and this file; every draft differs from its source.
//  2. Markdown structure, original -> draft: heading lines byte-identical; block-type sequence
//     (heading level, fields, para, table, list) identical; bold spans identical; the header
//     field block byte-identical; every field line keeps its bold label and hard-break spaces,
//     and only Disposition / Reviewer reply values may change; every list line byte-identical;
//     every table byte-identical except the authority map's Function and Result columns (row
//     count, column count, header, alignment and the other columns still fixed); the footer
//     line identical; the compendium's SHA-256 table byte-identical.
//  3. Frozen tokens: every digit-bearing token survives and none is new; all-caps identifiers,
//     section tokens, Finding numerals, caps words, dates, hashes and code spans keep exact
//     counts; spelled numbers survive; strict modals keep exact counts (soft hedges reported);
//     double-quoted strings unchanged.
//  4. World-tier regexes (seat names, founder ruling/override, superseded refusal phrasing,
//     taxation-is-Charter-level) clean on originals and drafts.
//  5. Guard scope: no check-canon pin, guard-mutation probe, certification or annex verifier,
//     or code guard names these six files; no link anywhere carries a #fragment into them.
//  6. Ledger: every (a) quote verbatim in its draft and <= 15 words; every (b) string present
//     in original and draft (absent from both where marked na:, absent from the draft where
//     marked absent:); word-count table matches.
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..', '..');
const raw = (p) => readFileSync(p, 'utf8');
const rd = (p) => raw(p).replace(/\r\n?/g, '\n');

const KEYS = [
  'path-2-certification-2294-authority.md',
  'path-2-section-11-compendium-2294.md',
  'path-2-registrar-execution-record-2294.md',
  'path-2-lower-incidence-certificate-2294.md',
  'lp-075-section-13-review-set.md',
  'path-2-charter-restatement-snapshot-2292.md',
];
const SHORT = { [KEYS[0]]: 'authority', [KEYS[1]]: 'compendium', [KEYS[2]]: 'registrar', [KEYS[3]]: 'lower', [KEYS[4]]: 'review', [KEYS[5]]: 'snapshot' };
// Table columns (0-based) whose cells may be rewritten. Every other table cell is frozen.
const EDITABLE_COLS = { [KEYS[0]]: { 'Authority|Function|Controlling artifact|Result': [1, 3] } };
// Field labels whose values may be rewritten (review-set finding blocks). Header fields are frozen.
const EDITABLE_FIELDS = new Set(['**Disposition:**', '**Reviewer reply:**']);

const fails = [];
const notes = [];
const fail = (m) => fails.push(m);

/* ---------- helpers ---------- */
const norm = (s) => s.replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim();
const text = (md) => norm(md.replace(/`/g, '').replace(/\*\*/g, ''));
const flatRaw = (md) => norm(md.replace(/`/g, ''));
const words = (t) => t.split(' ').filter((w) => /[A-Za-z0-9]/.test(w)).length;
const plain = (md) => norm(md.split('\n').filter((l) => !/^\|[-:| ]+\|$/.test(l))
  .map((l) => l.replace(/^#{1,6}\s+/, '').replace(/^\s*-\s+/, '')).join(' ').replace(/[`|]/g, ' ').replace(/\*\*/g, ''));
const tally = (t, res) => { const m = new Map(); for (const re of res) for (const x of t.matchAll(re)) { const k = x[0]; m.set(k, (m.get(k) || 0) + 1); } return m; };
const sameCounts = (label, a, b, key, exact = true) => {
  for (const k of new Set([...a.keys(), ...b.keys()])) {
    const x = a.get(k) || 0; const y = b.get(k) || 0;
    if (x === y) continue;
    if (exact) fail(`[${key}] ${label} "${k}" count ${x} -> ${y}`);
    else if (y === 0) fail(`[${key}] ${label} missing: "${k}"`);
    else if (x === 0) fail(`[${key}] ${label} new in draft: "${k}"`);
    else notes.push(`[${key}] ${label} ${k}: ${x} -> ${y}`);
  }
};
const blocks = (md) => md.split(/\n[ \t]*\n/).map((b) => b.replace(/^\n+|\n+$/g, '')).filter(Boolean).map((b) => {
  const first = b.split('\n')[0];
  const type = /^#{1,6} /.test(first) ? `h${first.match(/^#+/)[0].length}`
    : /^\|/.test(first) ? 'table'
      : /^\s*- /.test(first) ? 'list'
        : /^\*\*[^*]+:\*\*/.test(first) ? 'fields' : 'para';
  return { type, text: b };
});
const cells = (row) => row.replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());

/* ---------- 1. load, LF ---------- */
for (const f of [...KEYS, 'ledger.md', 'check.mjs']) if (raw(join(HERE, f)).includes('\r')) fail(`[${f}] contains CR characters (LF required)`);
const D = KEYS.map((key) => ({ key, s: SHORT[key], O: rd(join(ROOT, 'documents', key)), R: rd(join(HERE, key)) }));
for (const d of D) {
  if (d.O === d.R) fail(`[${d.s}] draft is identical to the live source`);
  d.oText = text(d.O); d.rText = text(d.R);
  d.oWords = words(plain(d.O)); d.rWords = words(plain(d.R));
}

/* ---------- 2. structure ---------- */
for (const d of D) {
  const { O, R, s, key } = d;
  const heads = (m) => m.split('\n').filter((l) => /^#{1,6} /.test(l));
  if (JSON.stringify(heads(O)) !== JSON.stringify(heads(R))) fail(`[${s}] heading lines changed`);
  const bo = blocks(O); const br = blocks(R);
  const seq = (b) => b.map((x) => x.type).join(',');
  if (seq(bo) !== seq(br)) { fail(`[${s}] block-type sequence changed:\n    ${seq(bo)}\n    ${seq(br)}`); continue; }
  const joined = (m) => m.replace(/\n(?!\n)/g, ' ');
  const bold = (m) => [...joined(m).matchAll(/\*\*(.+?)\*\*/g)].map((x) => norm(x[1]));
  if (JSON.stringify(bold(O)) !== JSON.stringify(bold(R))) fail(`[${s}] bold spans changed`);
  let fieldBlocks = 0; let tables = 0; let lists = 0; let editedCells = 0; let editedFields = 0;
  const firstH2 = bo.findIndex((b) => b.type === 'h2');
  bo.forEach((b, i) => {
    const r = br[i];
    if (b.type === 'fields') {
      fieldBlocks++;
      const ol = b.text.split('\n'); const rl = r.text.split('\n');
      if (ol.length !== rl.length) { fail(`[${s}] field block ${fieldBlocks}: line count ${ol.length} -> ${rl.length}`); return; }
      const header = firstH2 < 0 || i < firstH2;
      ol.forEach((l, j) => {
        const lab = (x) => (x.match(/^\*\*[^*]+:\*\*/) || [''])[0];
        if (lab(l) !== lab(rl[j])) fail(`[${s}] field label changed: ${lab(l)} -> ${lab(rl[j])}`);
        if (/ {2}$/.test(l) !== / {2}$/.test(rl[j])) fail(`[${s}] hard-break spaces changed on ${lab(l)}`);
        if (l !== rl[j]) {
          if (header || !EDITABLE_FIELDS.has(lab(l))) fail(`[${s}] frozen field line changed: ${lab(l)}`);
          else editedFields++;
        }
      });
    } else if (b.type === 'list') {
      lists++;
      if (b.text !== r.text) fail(`[${s}] list ${lists} changed (lists are kept verbatim)`);
    } else if (b.type === 'table') {
      tables++;
      const ol = b.text.split('\n'); const rl = r.text.split('\n');
      const head = cells(ol[0]).join('|');
      const editable = (EDITABLE_COLS[key] || {})[head] || [];
      if (ol.length !== rl.length) { fail(`[${s}] table "${head}": row count ${ol.length} -> ${rl.length}`); return; }
      if (ol[0] !== rl[0] || ol[1] !== rl[1]) fail(`[${s}] table "${head}": header or alignment row changed`);
      for (let j = 2; j < ol.length; j++) {
        const oc = cells(ol[j]); const rc = cells(rl[j]);
        if (oc.length !== rc.length) { fail(`[${s}] table "${head}" row ${j - 1}: column count ${oc.length} -> ${rc.length}`); continue; }
        oc.forEach((c, k) => {
          if (c === rc[k]) return;
          if (editable.includes(k)) editedCells++;
          else fail(`[${s}] table "${head}" row ${j - 1} col ${k + 1} frozen cell changed: "${c}" -> "${rc[k]}"`);
        });
        if (!editable.length && ol[j] !== rl[j]) fail(`[${s}] table "${head}" row ${j - 1} not byte-identical`);
      }
    }
  });
  const FOOTER = 'Part of the 2294 Ratification Record';
  const last = (m) => m.trimEnd().split('\n').pop();
  if ((last(O) === FOOTER) !== (last(R) === FOOTER)) fail(`[${s}] record footer added, removed or changed`);
  notes.push(`[${s}] ${heads(R).length} headings, ${br.length} blocks (${seq(br).split(',').filter((x) => x === 'para').length} para), ${fieldBlocks} field blocks (${editedFields} value lines rewritten), ${tables} tables (${editedCells} editable cells rewritten), ${lists} lists verbatim; bold spans unchanged`);
}
{ // compendium SHA-256 table
  const d = D.find((x) => x.s === 'compendium');
  const sha = (m) => m.slice(m.indexOf('| Artifact | SHA-256 |'), m.indexOf('\n\n', m.indexOf('| Artifact | SHA-256 |')));
  if (!sha(d.O).length || sha(d.O) !== sha(d.R)) fail('[compendium] SHA-256 table not byte-identical');
  else notes.push(`[compendium] SHA-256 table byte-identical (${sha(d.R).split('\n').length - 2} rows)`);
}

/* ---------- 3. frozen tokens ---------- */
const numTok = (t) => { const m = new Map(); for (let w of t.split(/\s+/)) { w = w.replace(/^[(\[{"'`|*,;:.!?]+|[)\]}"'`|*,;:.!?]+$/g, ''); if (/\d/.test(w)) m.set(w, (m.get(w) || 0) + 1); } return m; };
const NUMWORDS = /\b(?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|sixteen|twenty|thirty|thirty-six|thirty-year|forty-five|first|second|third)\b/gi;
for (const d of D) {
  const { s } = d;
  const o = numTok(d.oText); const r = numTok(d.rText);
  sameCounts('digit token', o, r, s, false);
  sameCounts('identifier', tally(d.oText, [/\b[A-Z0-9]+(?:[-_][A-Z0-9]+)+\b/g]), tally(d.rText, [/\b[A-Z0-9]+(?:[-_][A-Z0-9]+)+\b/g]), s);
  const SEC = [/§§?\s?\d+(?:\.\d+)*(?:\([a-z]\))?(?: and \d+(?:\.\d+)*)?/g, /\bSection \d+(?:\.\d+)*/g, /\bFindings? (?:I|II|III|IV)(?:–IV)?\b/g, /\bPart V\b/g];
  sameCounts('section/Finding token', tally(d.oText, SEC), tally(d.rText, SEC), s);
  sameCounts('caps word', tally(d.oText, [/\b[A-Z]{2,}\b/g]), tally(d.rText, [/\b[A-Z]{2,}\b/g]), s);
  sameCounts('date', tally(d.oText, [/\b\d{4}-\d{2}(?:-\d{2})?(?: \d{2}:\d{2} UTC)?\b/g]), tally(d.rText, [/\b\d{4}-\d{2}(?:-\d{2})?(?: \d{2}:\d{2} UTC)?\b/g]), s);
  sameCounts('hash', tally(d.O, [/\b[0-9a-f]{64}\b/g]), tally(d.R, [/\b[0-9a-f]{64}\b/g]), s);
  sameCounts('code span', tally(d.O, [/`[^`]+`/g]), tally(d.R, [/`[^`]+`/g]), s);
  sameCounts('spelled number', tally(d.oText.toLowerCase(), [NUMWORDS]), tally(d.rText.toLowerCase(), [NUMWORDS]), s, false);
  sameCounts('strict modal', tally(d.oText.toLowerCase(), [/\b(?:shall|may|must|cannot|can)\b/g]), tally(d.rText.toLowerCase(), [/\b(?:shall|may|must|cannot|can)\b/g]), s);
  const so = tally(d.oText.toLowerCase(), [/\b(?:only|never|will|would|should|could|might|automatically|expressly|explicitly|exactly)\b/g]);
  const sr = tally(d.rText.toLowerCase(), [/\b(?:only|never|will|would|should|could|might|automatically|expressly|explicitly|exactly)\b/g]);
  for (const k of new Set([...so.keys(), ...sr.keys()])) if ((so.get(k) || 0) !== (sr.get(k) || 0)) notes.push(`[${s}] hedge "${k}" count ${so.get(k) || 0} -> ${sr.get(k) || 0}`);
  const q = (t) => JSON.stringify([...t.matchAll(/"([^"]+)"/g)].map((x) => x[1]));
  if (q(d.oText) !== q(d.rText)) fail(`[${s}] double-quoted strings changed`);
}
notes.push('frozen tokens: digit tokens all present and none new; identifiers, section/Finding tokens, caps words, dates, hashes, code spans and strict modals at exact counts');

/* ---------- 4. World-tier regexes ---------- */
const SEAT = /\b(Sol|Opus|Fable|GPT|Claude)\b/;
const FOUNDER = /founder(?:'|’)?s? (?:ruling|override)/i;
const TIER = /\b(?:tax(?:ation|es)?|tax code|rate schedule|top marginal rates?|the (?:rate )?cascade)\b[^.!?]{0,60}\b(?:is|are|sits? at|remains?)\b[^.!?]{0,40}\b(?:charter-level|charter level|constitutional(?:ly)?|charter-tier)\b/i;
const SUPERSEDED = [/lawful nonactivation/i, /Schedule A[^.]{0,120}\brefused\b/i];
for (const d of D) for (const [which, t] of [['original', d.oText], ['draft', d.rText]]) {
  if (SEAT.test(t)) fail(`[${d.s} ${which}] seat name: ${t.match(SEAT)[1]}`);
  if (FOUNDER.test(t)) fail(`[${d.s} ${which}] founder ruling/override phrasing`);
  if (TIER.test(t)) fail(`[${d.s} ${which}] taxation-is-Charter-level predication`);
  for (const re of SUPERSEDED) if (re.test(t)) fail(`[${d.s} ${which}] superseded refusal phrasing: ${re}`);
}
notes.push('World-tier regexes clean on all six originals and drafts');

/* ---------- 5. guard scope and links ---------- */
{
  const GUARDS = ['tools/check-canon.mjs', 'tools/test-canon-guard-mutations.mjs', 'tools/test-code-founding-guards.mjs',
    'tools/test-path2-certification-mutations.mjs', 'tools/verify-path2-certification-2294.mjs', 'tools/verify-path2-record-annexes.mjs',
    'tools/build-path2-record-annexes.mjs', 'tools/canon.json'];
  let n = 0;
  for (const g of GUARDS) {
    if (!existsSync(join(ROOT, g))) { fail(`[guard scope] ${g} not found`); continue; }
    n++;
    const t = rd(join(ROOT, g));
    for (const k of KEYS) if (t.includes(k)) fail(`[guard scope] ${g} names ${k}: a pin, probe or digest may target this unit`);
  }
  notes.push(`guard scope: none of ${n} guard, verifier and annex tools names the six files`);
  const sources = [
    ...readdirSync(ROOT).filter((f) => /\.(html|md)$/.test(f)).map((f) => [f, rd(join(ROOT, f))]),
    ...readdirSync(join(ROOT, 'documents')).filter((f) => /\.(html|md|json)$/.test(f)).map((f) => [`documents/${f}`, rd(join(ROOT, 'documents', f))]),
    ...readdirSync(join(ROOT, 'tools')).filter((f) => /\.(mjs|json)$/.test(f)).map((f) => [`tools/${f}`, rd(join(ROOT, 'tools', f))]),
    ...D.map((d) => [`draft:${d.key}`, d.R]),
  ];
  let refs = 0; const from = new Set();
  for (const [f, t] of sources) for (const k of KEYS) {
    const esc = k.replace(/[.]/g, '\\.');
    for (const m of t.matchAll(new RegExp(`${esc}(#[\\w-]*)?`, 'g'))) {
      if (f === `documents/${k}` || f === `draft:${k}`) continue;
      refs++; from.add(f);
      if (m[1]) fail(`[links] ${f} links ${k}${m[1]}: a fragment into a raw Markdown annex`);
    }
  }
  const cert = rd(join(ROOT, 'path-2-certification-2294.html'));
  const certLinks = KEYS.filter((k) => cert.includes(`href="documents/${k}"`)).length;
  if (certLinks !== 5) fail(`[links] certification page links ${certLinks} of the annexes, expected 5`);
  notes.push(`links: ${refs} references to the six basenames (from ${[...from].join(', ')}), none with a fragment; certification page links 5 annexes; basenames unchanged`);
}

/* ---------- 6. ledger ---------- */
const ledger = rd(join(HERE, 'ledger.md'));
const ticks = (s) => [...s.matchAll(/`([^`]+)`/g)].map((m) => m[1]);
let section = null; let target = null;
const counts = {};
for (const line of ledger.split('\n')) {
  if (/^## /.test(line)) { section = /^## \(a\)/.test(line) ? 'a' : /^## \(b\)/.test(line) ? 'b' : null; target = null; continue; }
  if (/^### /.test(line)) {
    const h = line.replace(/^### /, '').trim();
    if (h === 'All six files') target = D;
    else { const d = D.find((x) => h.split(' ')[0] === x.key); if (!d) { fail(`ledger heading names no draft: ${line}`); target = null; } else target = [d]; }
    continue;
  }
  if (!section || !target || !/^- /.test(line)) continue;
  const spans = ticks(line);
  const absent = /\babsent:/.test(line); const na = /\bna:/.test(line);
  const ck = `${section}:${target.length > 1 ? 'all' : target[0].s}`;
  const c = (counts[ck] ||= { rows: 0, spans: 0 });
  c.rows++;
  if (!spans.length) { fail(`[ledger ${ck}] row has no quote: ${line}`); continue; }
  for (const sp of spans) {
    c.spans++;
    for (const d of target) {
      if (section === 'b') {
        const inR = flatRaw(d.R).includes(norm(sp)); const inO = flatRaw(d.O).includes(norm(sp));
        if (na) { if (inR || inO) fail(`[frozen ${d.s}] marked na: but present in original or draft: ${sp}`); continue; }
        if (absent) { if (inR) fail(`[frozen ${d.s}] must be absent from the draft: ${sp}`); continue; }
        if (!inR) fail(`[frozen ${d.s}] frozen string missing from draft: ${sp}`);
        if (!inO) fail(`[frozen ${d.s}] listed as frozen but not in the original: ${sp}`);
      } else {
        const q = norm(sp.replace(/\*\*/g, ''));
        if (!d.rText.includes(q)) fail(`[ledger a ${d.s}] quote not in draft: "${sp}"`);
        if (words(q) > 15) fail(`[ledger a ${d.s}] quote over 15 words (${words(q)}): "${sp}"`);
      }
    }
  }
}
for (const d of D) {
  if (!counts[`a:${d.s}`]) fail(`[${d.s}] fact ledger has no rows`);
  if (!counts[`b:${d.s}`]) fail(`[${d.s}] frozen checklist has no rows`);
  const row = ledger.split('\n').find((l) => l.startsWith('| ') && l.includes(d.key));
  const nums = row ? [...row.matchAll(/\|\s*([\d,]+)\s*(?=\|)/g)].map((m) => Number(m[1].replace(/,/g, ''))) : [];
  if (nums[0] !== d.oWords || nums[1] !== d.rWords) fail(`[${d.s}] ledger word counts ${JSON.stringify(nums)} != computed [${d.oWords}, ${d.rWords}]`);
}

/* ---------- register tells (report only) ---------- */
const REVERSAL = /\b(?:is|are|was) not [^.;:]{1,60}; (?:it|they|this) (?:is|are|was)\b|; (?:it|they) (?:does|do|did) not\b|\bnot [^.;,]{1,40}, but\b|\bnot [^.;,]{1,30} but\b|\brather than\b|, not [^.;,]{1,40}[.;)]|\b(?:does|do|did) not [^.]{1,80}\. (?:It|They) (?:is|are|was|creates?|makes?)\b/gi;
const prose = (m) => norm(blocks(m).filter((b) => b.type === 'para' || b.type === 'fields').map((b) => b.text).join(' ').replace(/\*\*[^*]+:\*\*/g, ' ').replace(/`/g, ''));
const cnt = (t, re) => (t.match(re) || []).length;

/* ---------- report ---------- */
for (const d of D) {
  const a = counts[`a:${d.s}`] || { rows: 0, spans: 0 }; const b = counts[`b:${d.s}`] || { rows: 0, spans: 0 };
  console.log(`${d.key}: words ${d.oWords} -> ${d.rWords} (${(((d.rWords - d.oWords) / d.oWords) * 100).toFixed(1)}%); fact ledger ${a.rows} rows/${a.spans} quotes; frozen ${b.rows} rows/${b.spans} strings; reversal-shaped ${cnt(prose(d.O), REVERSAL)} -> ${cnt(prose(d.R), REVERSAL)}; prose em-dashes ${cnt(prose(d.O), /—/g)} -> ${cnt(prose(d.R), /—/g)}`);
}
if (counts['b:all']) console.log(`all six files: frozen ${counts['b:all'].rows} rows/${counts['b:all'].spans} strings`);
for (const n of notes) console.log(`  note: ${n}`);
if (fails.length) { console.log(`FAIL (${fails.length})`); for (const f of fails) console.log(`  - ${f}`); process.exit(1); }
console.log('PASS: frozen strings present, headings and id tokens unchanged, Markdown structure unchanged, ledger quotes verbatim');
