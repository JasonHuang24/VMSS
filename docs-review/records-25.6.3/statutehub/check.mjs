#!/usr/bin/env node
// Records 25.6.3 statutehub unit checker. Run: node docs-review/records-25.6.3/statutehub/check.mjs
// Reads the two drafts in this folder, the live sources, the committed pages and the guard files;
// writes nothing. Checks:
//  1. LF endings on the drafts, the ledger and this file; the draft generator passes `node --check`.
//  2. Statute source structure, original -> draft: the header comment, every heading, every <a>
//     element, every bracketed citation, every bold and code span, every curly-quoted string, the
//     Trajectory Doctrine blockquote and the Schedule B rate table are byte-identical; the tag
//     skeleton (every tag with its attributes, text removed) is identical; 133 class="ls-cite",
//     125 sigil cites by the generator's own regex, same-page #lp- anchors still present to rehome.
//  3. Statute frozen tokens (figures, rates, sections, years, conditions, formulas) keep exact
//     counts; strict modals (shall, may, must, cannot, can) keep exact counts; founder/seat mentions
//     keep exact counts.
//  4. Generator draft: same line count; every changed line is a prose literal (description, heroSub,
//     the two banner paragraphs, the process-frame paragraph, hubBody paragraphs and lists); each
//     changed line keeps its tag skeleton; the R22/R23 ruling blocks, the statuteBanner label,
//     id="path-2" and all code are byte-identical; prose-literal tokens and strict modals keep
//     exact counts.
//  5. In-memory build: the live generator on the live sources reproduces all 7 committed pages byte
//     for byte; the draft generator on the draft statute builds all 7 pages; per page, title, h1,
//     crosslinks, labels, id sequence and tag skeleton (meta description neutralised) are
//     unchanged; the five brief/record documents are byte-identical; the check-canon pins (e3, the
//     2295 wrapper pin, R22/R23 pins) and the guard-mutation probe find-strings hold on the draft
//     build; every pending-page href in the draft statute resolves; #path-2 resolves.
//  6. Tailwind: a site-wide components+utilities build with the 7 draft-built pages and the draft
//     statute source swapped in equals the build from disk (control: live-built pages swapped in).
//  7. Ledger: every (a) quote verbatim in its draft and <= 15 words; every (b) string present in
//     its target and in the original (absent where marked absent:); word-count table matches.
import { readFileSync } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { execFileSync } from 'child_process';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..', '..');
const raw = (p) => readFileSync(p, 'utf8');
const rd = (p) => raw(p).replace(/\r\n?/g, '\n');

const fails = [];
const notes = [];
const fail = (m) => fails.push(m);
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/* ---------- helpers ---------- */
const norm = (s) => s.replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim();
const flat = (s) => s.replace(/\s+/g, ' ');
const decode = (s) => s.replace(/&ndash;/g, '–').replace(/&mdash;/g, '—').replace(/&rsquo;/g, '’').replace(/&ldquo;/g, '“')
  .replace(/&rdquo;/g, '”').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
// Visible text: block tags become a space, inline tags vanish, entities decoded.
const vis = (h) => decode(h.replace(/<!--[\s\S]*?-->/g, ' ')
  .replace(/<\/?(?:p|li|td|th|tr|ul|ol|blockquote|table|thead|tbody|div|hr|h\d|span|i)\b[^>]*>/g, ' ')
  .replace(/<[^>]+>/g, ''));
const words = (t) => t.split(' ').filter((w) => /[A-Za-z0-9]/.test(w)).length;
const idSeq = (s) => [...s.matchAll(/\bid="([^"]*)"/g)].map((m) => m[1]);
const skeleton = (h) => h.replace(/(<meta name="description" content=")[^"]*"/, '$1"').replace(/>[^<]*</g, '><');
const all = (s, re) => [...s.matchAll(re)].map((m) => m[0]);
const tally = (t, res) => { const m = new Map(); for (const re of res) for (const x of t.matchAll(re)) { const k = x[0]; m.set(k, (m.get(k) || 0) + 1); } return m; };
const cmpTally = (label, o, r, exact) => {
  for (const k of new Set([...o.keys(), ...r.keys()])) {
    const a = o.get(k) || 0; const b = r.get(k) || 0;
    if (a === b) continue;
    if (exact) fail(`[${label}] token "${k}" count ${a} -> ${b}`);
    else notes.push(`[${label}] "${k}" count ${a} -> ${b}`);
  }
};

/* ---------- the unit ---------- */
const S = { key: 'ratify-tax-50-ii-statute-source.html', live: 'documents/ratify-tax-50-ii-statute-source.html' };
const G = { key: 'build-pending-pages.mjs', live: 'tools/build-pending-pages.mjs' };
for (const d of [S, G]) {
  d.draftPath = join(HERE, d.key);
  if (raw(d.draftPath).includes('\r')) fail(`[${d.key}] draft contains CR characters (LF required)`);
  d.o = rd(join(ROOT, d.live));
  d.r = rd(d.draftPath);
  if (d.o === d.r) fail(`[${d.key}] draft is identical to the live source`);
}
for (const f of ['ledger.md', 'check.mjs']) if (raw(join(HERE, f)).includes('\r')) fail(`[${f}] contains CR characters`);
try { execFileSync(process.execPath, ['--check', G.draftPath], { encoding: 'utf8' }); notes.push('draft generator: node --check passes'); }
catch (e) { fail(`[${G.key}] node --check failed: ${e.stderr || e.message}`); }

/* ---------- 2. Statute source structure ---------- */
S.oText = norm(vis(S.o)); S.rText = norm(vis(S.r));
{
  const k = S.key;
  const comment = (h) => (h.match(/^<!--[\s\S]*?-->/) || [''])[0];
  if (comment(S.o) !== comment(S.r)) fail(`[${k}] header comment changed`);
  const groups = [
    ['headings', /<p class="ls-h[^"]*">[\s\S]*?<\/p>/g],
    ['<a> elements', /<a [^>]*>[\s\S]*?<\/a>/g],
    ['bracketed citations', /\[<a [\s\S]*?\]/g],
    ['bold spans', /<strong>[\s\S]*?<\/strong>/g],
    ['code spans', /<code[^>]*>[\s\S]*?<\/code>/g],
    ['curly-quoted strings', /“[^”]*”/g],
    ['blockquotes', /<blockquote[\s\S]*?<\/blockquote>/g],
    ['tables', /<table[\s\S]*?<\/table>/g],
  ];
  for (const [lab, re] of groups) {
    const a = all(S.o, re); const b = all(S.r, re);
    if (lab === 'tables') {
      // The Schedule B rate table is frozen whole. The A1–A8 table keeps its header and condition
      // labels; the design-rationale table keeps its header and bold chamber labels (checked above
      // with the bold spans); both keep their row shape through the tag skeleton.
      if (a.length !== 3 || b.length !== 3) { fail(`[${k}] table count ${a.length} -> ${b.length}`); continue; }
      if (a[0] !== b[0]) fail(`[${k}] Schedule B rate table changed`);
      const keyCells = (t) => all(t, /<tr><td>[^<]*<\/td>/g);
      const head = (t) => (t.match(/<thead>[\s\S]*?<\/thead>/) || [''])[0];
      if (!same(keyCells(a[1]), keyCells(b[1])) || keyCells(b[1]).length !== 8) fail(`[${k}] A1–A8 condition labels changed`);
      for (let i = 1; i < 3; i++) if (head(a[i]) !== head(b[i])) fail(`[${k}] table ${i + 1} header changed`);
      notes.push(`${k}: 3 tables; Schedule B rate table byte-identical; A1–A8 condition labels and both table headers unchanged`);
      continue;
    }
    if (!same(a, b)) {
      const diff = a.map((x, i) => (x !== b[i] ? `${x}  ->  ${b[i]}` : null)).filter(Boolean).slice(0, 3);
      fail(`[${k}] ${lab} changed (${a.length} -> ${b.length}): ${diff.join(' | ')}`);
    } else notes.push(`${k}: ${a.length} ${lab} byte-identical`);
  }
  if (skeleton(S.o) !== skeleton(S.r)) fail(`[${k}] tag skeleton (tags + attributes) differs`);
  else notes.push(`${k}: tag skeleton identical (${(S.r.match(/<[a-z][a-z0-9]*/g) || []).length} tags, every attribute unchanged)`);
  const lsc = (h) => (h.match(/class="ls-cite"/g) || []).length;
  const sig = (h) => (h.match(/class="ls-cite">[A-Z]{1,2}<\/a>/g) || []).length;
  if (lsc(S.r) !== 133 || sig(S.r) !== 125) fail(`[${k}] ls-cite ${lsc(S.r)} (want 133), sigil cites ${sig(S.r)} (want 125)`);
  else notes.push(`${k}: class="ls-cite" 133, sigil cites 125 (the build's assertion)`);
  const lp = (h) => (h.match(/href="#lp-/g) || []).length;
  if (lp(S.r) !== lp(S.o) || lp(S.r) === 0) fail(`[${k}] same-page #lp- anchors ${lp(S.o)} -> ${lp(S.r)}`);
  const lines = (h) => h.split('\n').length;
  if (lines(S.o) !== lines(S.r)) fail(`[${k}] line count ${lines(S.o)} -> ${lines(S.r)}`);
}

/* ---------- 3. Statute tokens, modals, mentions ---------- */
const TOKENS = [
  /~?\$[\d,.]+[BMT]?(?:\/yr)?/g, /[≥]?\s?\d+(?:\.\d+)?%/g, /\d+(?:\.\d+)?×/g, /§§?\d+(?:\.\d+)?(?:\([a-e]\))?(?:–(?:\([a-e]\)|\d+))?/g,
  /\bY\d+\b/g, /\bLP-\d+\b/g, /\bv\d+(?:\.\d+)*\b/g, /\bFindings? \d+(?:–\d+)?\b/g, /\bitems? \d+(?:–\d+)?\b/g, /\bobjection \d\b/g,
  /\bargument(?:s)? \d+(?:–\d+)?\b/g, /\b[AB]\d(?:–[AB]\d)?\b/g, /[−-][123]\b/g, /50\/25\/12\.5\/6\.25/g, /\b(?:1\.3|130)\b/g,
  /\bRATIFY-TAX-50(?:-II)?\b/g, /\b(?:Main-12|ADT-36|T50\(m\)|M\(m\)|A\(m\)|D\(m\)|Li\(m\)|Oi\(m\))/g,
  /\b(?:sixty-three|six decades|multidecade|twelve|thirty-six|five years|six months|twelve months|one question|all three)\b/gi,
  /\b(?:\d{4})\b/g, /\b(?:Sanctuary|Main|Lower|Meritboard|Court)\b/g, /\b(?:Schedule [AB])\b/g,
  /“[^”]*”/g, /\bif and only if\b/g, /\bLower Incidence Certificate\b/g, /\bPath 2 controlling estimate\b/g, /\bTrajectory Doctrine\b/g,
];
const MODALS = /\b(?:shall|may|must|cannot|can)\b/gi;
const SOFT = /\b(?:only|will|would|should|could|not|no|never|neither|nor|none)\b/gi;
const MENTION = [/\bfounder\b/gi, /\bseat\b/gi, /\b(?:Sol|Opus|Fable|GPT|Claude)\b/g, /founder(?:'|’)?s? (?:ruling|override)/gi];
cmpTally(S.key, tally(S.oText, TOKENS), tally(S.rText, TOKENS), true);
cmpTally(`${S.key} modals`, tally(S.oText.toLowerCase(), [MODALS]), tally(S.rText.toLowerCase(), [MODALS]), true);
cmpTally(`${S.key} mentions`, tally(S.oText, MENTION), tally(S.rText, MENTION), true);
cmpTally(`${S.key} hedge/negation`, tally(S.oText.toLowerCase(), [SOFT]), tally(S.rText.toLowerCase(), [SOFT]), false);
notes.push(`${S.key}: figures/sections/years/conditions/formulas, strict modals ${JSON.stringify(Object.fromEntries(tally(S.rText.toLowerCase(), [MODALS])))} and founder/seat mentions keep exact counts`);

/* ---------- 4. Generator draft ---------- */
const PROSE_LINE = [
  /^  description: '/, /^  heroSub: '/,
  /^            <p><strong>FAILED PETITION<\/strong>/, /^            <p><strong>ENACTED — SCHEDULES ACTIVE FROM 2295\.<\/strong>/,
  /^          <p>This section is the <strong>drafting archive<\/strong>: the out-of-world/,
];
const hubRange = (lines) => [lines.indexOf('const hubBody = ['), lines.indexOf("].join('\\n');", lines.indexOf('const hubBody = ['))];
const isHubProse = (l) => /^  `<(?:p class="pending-p"|ul class="pending-list")/.test(l);
const proseLines = (src) => {
  const L = src.split('\n'); const [a, b] = hubRange(L);
  return L.map((l, i) => ({ l, i })).filter(({ l, i }) => PROSE_LINE.some((re) => re.test(l)) || (i > a && i < b && isHubProse(l)));
};
{
  const k = G.key;
  const lo = G.o.split('\n'); const lr = G.r.split('\n');
  if (lo.length !== lr.length) fail(`[${k}] line count ${lo.length} -> ${lr.length}`);
  const allowed = new Set(proseLines(G.o).map((x) => x.i));
  let changed = 0;
  for (let i = 0; i < lo.length; i++) {
    if (lo[i] === lr[i]) continue;
    changed++;
    if (!allowed.has(i)) { fail(`[${k}] line ${i + 1} changed but is not a prose literal: ${lo[i].slice(0, 90)}`); continue; }
    const key = (l) => (l.match(/^\s*(?:\w+: '|`<[a-z]+|<p>)/) || [''])[0];
    if (key(lo[i]) !== key(lr[i])) fail(`[${k}] line ${i + 1} lead changed`);
    const tagsOnly = (l) => all(l, /<[^>]+>/g).join('');
    if (tagsOnly(lo[i]) !== tagsOnly(lr[i])) fail(`[${k}] line ${i + 1} tags/attributes changed`);
    if (/^  (?:description|heroSub): '/.test(lr[i]) && !/^  \w+: '[^'\\]*',$/.test(lr[i])) fail(`[${k}] line ${i + 1} string literal malformed`);
  }
  notes.push(`${k}: ${changed} lines changed, all prose literals with tags and attributes unchanged; every other line (all code, comments, R22/R23, labels, crosslinks) byte-identical`);
  const block = (s, a, b) => { const i = s.indexOf(a); const j = s.indexOf(b, i); return i < 0 || j < 0 ? null : s.slice(i, j); };
  const r2223 = (s) => block(s, '<div class="process-frame" role="note" aria-label="Process ruling R22">', '</div>`;');
  if (!r2223(G.o) || r2223(G.o) !== r2223(G.r)) fail(`[${k}] R22/R23 ruling blocks changed`);
  else notes.push(`${k}: R22/R23 ruling blocks byte-identical (${r2223(G.r).length} chars)`);
  for (const s of ['<span class="pb-label">Enacted · Conditions satisfied · Schedules active from 2295</span>', 'id="path-2"',
    '<span class="pb-label">Failed Petition — record retained</span>', '<span class="pf-label">Process Record — drafting archive, not world canon</span>'])
    if (!G.r.includes(s) || !G.o.includes(s)) fail(`[${k}] frozen string missing: ${s}`);
  G.oProse = norm(vis(proseLines(G.o).map((x) => x.l).join('\n')));
  G.rProse = norm(vis(proseLines(G.r).map((x) => x.l).join('\n')));
  G.oText = G.oProse; G.rText = G.rProse;
  const GT = [
    /\b\d+–\d+\b/g, /\bI–IV\b/g, /\b(?:19|2[0-9])\d\d\b/g, /~?Y\d+\b/g, /\bLP-\d+\b/g, /\bR\d+\b/g, /\bv\d+(?:\.\d+)*\b/g,
    /§§?\d+(?:\.\d+)*(?:\([a-e]\))?/g, /\b[AB]\d(?:–[AB]\d)?\b/g, /50 \/ 25 \/ 12\.5 \/ 6\.25/g, /70 \/ 35 \/ 17 \/ 8/g,
    /\bRATIFY-TAX-50(?:-II)?\b/g, /\bAFFIRM-TAX-50\b/g, /\b(?:Court|Sanctuary|Main|Meritboard|Lower)\b/g, /\bSchedules? A\b|\bSchedule B\b/g,
    /\b(?:three|six|two|both|all)\b/gi, /\bFAILED PETITION\b|\bENACTED — SCHEDULES ACTIVE FROM 2295\b/g,
  ];
  cmpTally(`${k} prose tokens`, tally(G.oProse, GT), tally(G.rProse, GT), true);
  cmpTally(`${k} prose modals`, tally(G.oProse.toLowerCase(), [MODALS]), tally(G.rProse.toLowerCase(), [MODALS]), true);
  cmpTally(`${k} prose mentions`, tally(G.oProse, MENTION), tally(G.rProse, MENTION), true);
  cmpTally(`${k} prose hedge/negation`, tally(G.oProse.toLowerCase(), [SOFT]), tally(G.rProse.toLowerCase(), [SOFT]), false);
  notes.push(`${k}: prose-literal figures, votes, years, versions, rulings and strict modals keep exact counts`);
}

/* ---------- 5. In-memory builds ---------- */
function build(genSrc, statutePath) {
  const body = genSrc
    .replace(/^#!.*\n/, '')
    .replace(/^import .*$/gm, '')
    .replace("const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');", '');
  const out = new Map();
  const stubRead = (p, enc) => {
    const u = String(p).replace(/\\/g, '/');
    if (statutePath && u.endsWith(S.live)) return readFileSync(statutePath, enc);
    return readFileSync(p, enc);
  };
  const stubWrite = (p, s) => out.set(basename(String(p)), s);
  new Function('readFileSync', 'writeFileSync', 'join', 'dirname', 'fileURLToPath', 'ROOT', 'console', body)(stubRead, stubWrite, join, dirname, fileURLToPath, ROOT, { log: () => {} });
  return out;
}
let LIVE = new Map(); let DRAFT = new Map();
try { LIVE = build(G.o, null); } catch (e) { fail(`live in-memory build failed: ${e.message}`); }
try { DRAFT = build(G.r, S.draftPath); } catch (e) { fail(`draft in-memory build failed: ${e.message}`); }
const HUB = 'pending-ratification.html';
const STATUTE = 'pending-ratify-tax-50-ii-statute.html';
const stripComments = (s) => s.replace(/<!--[\s\S]*?-->/g, '');
const docPart = (h) => { const i = h.indexOf('<div class="pending-doc">'); const j = h.indexOf('\n        </div>\n\n      </div>', i); return h.slice(i, j); };
if (LIVE.size && DRAFT.size) {
  for (const [f, html] of LIVE) if (rd(join(ROOT, f)) !== html.replace(/\r\n?/g, '\n')) fail(`[baseline] live generator output differs from committed ${f}`);
  notes.push(`baseline: live generator + live sources reproduce all ${LIVE.size} committed pages byte for byte`);
  if (!same([...LIVE.keys()], [...DRAFT.keys()])) fail('[build] draft build produced a different page set');
  const pick = (h, re) => all(h, re).join('\n');
  for (const [f, a] of LIVE) {
    const b = DRAFT.get(f);
    if (a === b) { fail(`[build] ${f} unchanged by the draft (every page carries reconstructed chrome)`); continue; }
    for (const [lab, re] of [['title', /<title>[^<]*<\/title>/g], ['h1', /<h1[^>]*>[^<]*<\/h1>/g], ['kicker', /<p class="text-sm uppercase[^>]*>[^<]*<\/p>/g],
      ['labels', /<span class="p[bf]-label">[^<]*<\/span>/g], ['crosslinks', /<div class="pending-crosslinks[\s\S]*?<\/div>/g], ['h2', /<h2[^>]*>[\s\S]*?<\/h2>/g]])
      if (pick(a, re) !== pick(b, re)) fail(`[${f}] ${lab} changed`);
    if (!same(idSeq(a), idSeq(b))) fail(`[${f}] id sequence changed`);
    if (skeleton(a) !== skeleton(b)) fail(`[${f}] tag skeleton changed`);
    if (f !== HUB && f !== STATUTE && docPart(a) !== docPart(b)) fail(`[${f}] document body changed (source outside this unit)`);
  }
  notes.push(`draft build: all ${DRAFT.size} pages keep title, h1, kicker, labels, crosslinks, h2s, id sequence and tag skeleton; the 5 brief/record bodies are byte-identical`);
  const st = DRAFT.get(STATUTE); const hub = stripComments(DRAFT.get(HUB));
  const pins = [
    ['e3 page exists', !!st], ['e3 A1', /A1/.test(st)], ['e3 B1', /B1/.test(st)],
    ['e3 full statute text', st.includes('RATIFY-TAX-50-II — Conditional Successor Petition')],
    ['e3 citation apparatus >=125', (st.match(/class="ls-cite"/g) || []).length >= 125],
    ['e3 not a register entry', !st.includes('<article class="law-entry')],
    ['e3 links back to LP-074', st.includes('law-polling.html#lp-074')],
    ['wrapper: no stale label', !st.includes('ENACTED, CONDITION NOT SATISFIED')],
    ['wrapper: ENACTED — SCHEDULES ACTIVE FROM 2295', st.includes('ENACTED — SCHEDULES ACTIVE FROM 2295')],
    ['wrapper: 50 / 25 / 12.5 / 6.25', st.includes('50 / 25 / 12.5 / 6.25')],
    ['R22 number', /\bR22\b/.test(hub)], ['R22 doctrine (entity form)', hub.includes('Restatement &amp; Consolidation Doctrine')],
    ['R23 number', /\bR23\b/.test(hub)], ['R23 doctrine', hub.includes('The Codification Sweep')],
    ['hub id="path-2"', DRAFT.get(HUB).includes('id="path-2"')],
    ['probe hub R22', DRAFT.get(HUB).includes('R22')], ['probe hub R23', DRAFT.get(HUB).includes('R23')],
    ['probe statute class="ls-cite"', st.includes('class="ls-cite"')], ['probe statute <body', st.includes('<body')],
  ];
  const miss = pins.filter(([, ok]) => !ok).map(([n]) => n);
  if (miss.length) fail(`[pins] failing on the draft build: ${miss.join(', ')}`);
  else notes.push(`pins: all ${pins.length} check-canon conditions and probe find-strings hold on the draft build`);
  const stDoc = docPart(st); const stDocLive = docPart(LIVE.get(STATUTE));
  if (all(stDoc, /<a [^>]*>[\s\S]*?<\/a>/g).join('\n') !== all(stDocLive, /<a [^>]*>[\s\S]*?<\/a>/g).join('\n')) fail('[statute page] rendered links changed');
  const cites = (stDoc.match(/class="ls-cite">[A-Z]{1,2}<\/a>/g) || []).length;
  if (cites !== 125) fail(`[statute page] ${cites} sigil cites rendered`);
  let n = 0;
  for (const m of S.r.matchAll(/href="(pending-[\w-]+\.html)#([\w-]+)"/g)) {
    n++;
    const tgt = DRAFT.get(m[1]);
    if (!tgt || !tgt.includes(`id="${m[2]}"`)) fail(`[statute source] ${m[1]}#${m[2]} does not resolve on the draft build`);
  }
  notes.push(`statute source: ${n} hrefs into pending pages resolve on the draft build; 125 sigil cites rendered; rendered link list identical`);
  // World-tier regexes do not apply to pending-* pages; run them anyway on the rebuilt chrome as a sanity check.
  const SUPERSEDED = /(?:Finding III[^.!?]{0,100}(?:fail(?:ed|ure)?|did not pass)|Schedule A\b[^.!?]{0,100}(?:refus(?:ed|al)|reject(?:ed|ion)|not certified)|Schedule B\b[^.!?]{0,100}(?:not reached|refus(?:ed|al)|reject(?:ed|ion)|not certified)|2294[^.!?]{0,120}(?:three findings passed|one finding failed|both refusals)|lawful (?:nonactivation|failure)|both refusals|chain with three links)/i;
  const TIER = /\b(?:tax(?:ation|es)?|tax code|rate schedule|top marginal rates?|the (?:rate )?cascade)\b[^.!?]{0,60}\b(?:is|are|sits? at|remains?)\b[^.!?]{0,40}\b(?:charter-level|charter level|constitutional(?:ly)?|charter-tier)\b/i;
  for (const re of [SUPERSEDED, TIER]) if (re.test(G.rProse) && !re.test(G.oProse)) fail(`[chrome] new match for ${re.source.slice(0, 40)}…`);
  notes.push('chrome: no new superseded-outcome or tier-misattribution phrasing');
}

/* ---------- 6. Tailwind parity ---------- */
try {
  const require = createRequire(join(ROOT, 'package.json'));
  const postcss = require('postcss'); const tailwindcss = require('tailwindcss');
  const cfg = require(join(ROOT, 'tailwind.config.js'));
  const gen = async (content) => (await postcss([tailwindcss({ ...cfg, content })]).process('@tailwind components; @tailwind utilities;', { from: undefined })).css;
  const R = ROOT.replace(/\\/g, '/');
  const globs = cfg.content.map((g) => `${R}/${g.replace(/^\.\//, '')}`);
  const pages = [...LIVE.keys()];
  const swap = (m, statute) => [...globs, ...pages.map((p) => `!${R}/${p}`), `!${R}/${S.live}`,
    ...pages.map((p) => ({ raw: m.get(p), extension: 'html' })), { raw: statute, extension: 'html' }];
  const [cs, cl, cd] = await Promise.all([gen(globs), gen(swap(LIVE, S.o)), gen(swap(DRAFT, S.r))]);
  if (cs !== cl) fail('[tailwind] control failed: swapping the live-built pages in raw changed the site CSS');
  if (cl !== cd) {
    const rules = (css) => new Set(css.split('}').map((x) => x.trim()).filter(Boolean));
    const extra = [...rules(cd)].filter((x) => !rules(cl).has(x));
    const lost = [...rules(cl)].filter((x) => !rules(cd).has(x));
    fail(`[tailwind] generated utilities differ. New: [${extra.map((x) => x.split('{')[0].trim()).join(', ')}]; lost: [${lost.map((x) => x.split('{')[0].trim()).join(', ')}]`);
  } else notes.push(`tailwind: site-wide components+utilities with the 7 draft-built pages and the draft statute source equal the live site (${cd.length} bytes; control swap identical)`);
} catch (e) { fail(`[tailwind] parity check could not run: ${e.message}`); }

/* ---------- 7. Ledger ---------- */
const ledger = rd(join(HERE, 'ledger.md'));
const ticks = (s) => [...s.matchAll(/`([^`]+)`/g)].map((m) => m[1]);
const D = { [S.key]: S, [G.key]: G };
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
      target = { key: d.key, flatRaw: flat(d.r), flatOrig: flat(d.o), text: d.rText };
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
      if (absent) { if (hit) fail(`[frozen ${target.key}] must be absent but present: ${s}`); continue; }
      if (!hit) fail(`[frozen ${target.key}] frozen string missing: ${s}`);
      if (!target.flatOrig.includes(flat(s))) fail(`[frozen ${target.key}] listed as frozen but not in the original: ${s}`);
    } else {
      if (!target.text) { fail(`[ledger a] quote row under a non-draft heading: ${line}`); continue; }
      const q = norm(s);
      if (!target.text.includes(q)) fail(`[ledger a ${target.key}] quote not in draft: "${s}"`);
      if (words(q) > 15) fail(`[ledger a ${target.key}] quote over 15 words (${words(q)}): "${s}"`);
    }
  }
}
for (const key of Object.keys(D)) {
  if (!counts[`a:${key}`]) fail(`fact ledger has no rows for ${key}`);
  if (!counts[`b:${key}`]) fail(`frozen checklist has no rows for ${key}`);
}

/* ---------- 8. Word counts vs the ledger table ---------- */
for (const d of [S, G]) {
  d.ow = words(d.oText); d.rw = words(d.rText);
  const row = ledger.split('\n').find((l) => l.startsWith('| ') && l.includes(d.key));
  const nums = row ? [...row.matchAll(/\|\s*([\d,]+)\s*(?=\|)/g)].map((m) => Number(m[1].replace(/,/g, ''))) : [];
  if (nums[0] !== d.ow || nums[1] !== d.rw) fail(`[${d.key}] ledger word counts ${JSON.stringify(nums)} != computed [${d.ow}, ${d.rw}]`);
}

/* ---------- 9. Register tells (report only) ---------- */
const REVERSAL = /\b(?:is|are|was) not [^.;:]{1,60}; (?:it|they|this) (?:is|are|was)\b|; (?:it|they) (?:does|do|did) not\b|\bnot [^.;,]{1,40}, but\b|\brather than\b|, not [^.;,]{1,40}[.;]/gi;
// Prose only: drop headings, bold labels, code, bracketed citations and the verbatim Doctrine quote.
const statuteProse = (h) => norm(vis(h.replace(/<p class="ls-h[\s\S]*?<\/p>/g, ' ').replace(/<blockquote[\s\S]*?<\/blockquote>/g, ' ')
  .replace(/<strong>[\s\S]*?<\/strong>/g, ' ').replace(/<code[\s\S]*?<\/code>/g, ' ').replace(/\[<a [\s\S]*?\]/g, ' ')));
const genProse = (src) => norm(vis(proseLines(src).map((x) => x.l).join('\n').replace(/<strong>[\s\S]*?<\/strong>/g, ' ').replace(/<a [^>]*>[\s\S]*?<\/a>/g, ' ')));
const tells = (o, r) => {
  const n = (t) => (t.match(REVERSAL) || []).length; const em = (t) => (t.match(/—/g) || []).length; const semi = (t) => (t.match(/;/g) || []).length;
  return `reversal-shaped ${n(o)} -> ${n(r)}; prose em-dashes ${em(o)} -> ${em(r)}; semicolons ${semi(o)} -> ${semi(r)}`;
};
S.tells = tells(statuteProse(S.o), statuteProse(S.r));
G.tells = tells(genProse(G.o), genProse(G.r));

/* ---------- report ---------- */
for (const d of [S, G]) {
  const a = counts[`a:${d.key}`] || { rows: 0, spans: 0 }; const b = counts[`b:${d.key}`] || { rows: 0, spans: 0 };
  const pct = (((d.rw - d.ow) / d.ow) * 100).toFixed(1);
  console.log(`${d.key}: words ${d.ow} -> ${d.rw} (${pct}%); fact ledger ${a.rows} rows/${a.spans} quotes; frozen ${b.rows} rows/${b.spans} strings; ${d.tells}`);
}
for (const k of Object.keys(counts).filter((k) => /:built:/.test(k))) console.log(`${k}: ${counts[k].rows} rows/${counts[k].spans} strings`);
for (const n of notes) console.log(`  note: ${n}`);
if (fails.length) { console.log(`FAIL (${fails.length})`); for (const f of fails) console.log(`  - ${f}`); process.exit(1); }
console.log('PASS: frozen strings present, headings/ids/structure unchanged, ledger quotes verbatim, draft build holds every pin, probe and deep link, Tailwind parity holds');
