#!/usr/bin/env node
// Records 25.6.1 schedreg unit checker. Run: node docs-review/records-25.6.1/schedreg/check.mjs
// Reads the three drafts in this folder, the live sources and the committed pages; writes nothing.
// Checks:
//  1. LF endings; node --check on the .mjs draft.
//  2. .mjs draft differs from live only on the six permitted chrome lines (Charter, Schedule,
//     Register heroSub + banner paragraph); tag/attribute sequence on those lines unchanged.
//  3. Markdown structure: heading lines, --- rules, table header/separator lines, table row keys
//     (#, Sev, Status) and cell counts, bold spans, italic label spans, whole-paragraph italics,
//     list shapes, rendered tag skeleton and every id, all unchanged; wrap width not widened;
//     no hyphen-at-line-end word splits.
//  4. The draft generator's own renderDoc / linkFirst / assertVerbatim pass on both drafts, and the
//     Schedule's linkFirst anchor lands in PART D.
//  5. Frozen tokens (sections, RR/S/O/A/B/C/D labels, figures, dates, status codes) survive;
//     operative modal counts unchanged.
//  6. World-tier guard regexes on the drafts.
//  7. In-memory build with the draft generator + drafts vs the live generator + live sources:
//     live build == committed pages; rulings page byte-identical; heads, pb-labels, crosslinks,
//     id and href sequences unchanged; Charter body unchanged; check-canon (g) pins and chain,
//     guard-mutation probes, World-tier guards (founder, seat, superseded outcome, tier claim) and
//     fragment resolution on the draft-built pages.
//  8. Ledger: every (a) quote verbatim in its draft and <= 15 words; every (b) string present
//     (or absent where marked) in its target; word-count table matches.
import { readFileSync, existsSync } from 'fs';
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
const ENT = { '&ndash;': '–', '&mdash;': '—', '&rsquo;': '’', '&lsquo;': '‘', '&ldquo;': '“', '&rdquo;': '”', '&amp;': '&', '&sect;': '§', '&nbsp;': ' ', '&lt;': '<', '&gt;': '>', '&hellip;': '…' };
const dec = (s) => s.replace(/&[a-z]+;/g, (e) => ENT[e] ?? e);
const norm = (s) => s.replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim();
const inlineStrip = (s) => s.replace(/<\/?(?:strong|em|a|i|span)\b[^>]*>/g, '').replace(/<[^>]+>/g, ' ');
const flat = (s) => s.replace(/\s+/g, ' ');
const words = (t) => t.split(' ').filter((w) => /[A-Za-z0-9]/.test(w)).length;
const slice = (s, [a, b]) => {
  const i = s.indexOf(a); const j = s.indexOf(b, i + 1);
  if (i < 0 || j < 0) throw new Error(`block markers not found: ${a} / ${b}`);
  return s.slice(i, j);
};
const tagSeq = (s) => (s.match(/<[^>]+>/g) || []).join('');
const idSeq = (s) => [...s.matchAll(/\bid="([^"]*)"/g)].map((m) => m[1]);
const hrefSeq = (s) => [...s.matchAll(/\bhref="([^"]*)"/g)].map((m) => m[1]);
const skeleton = (h) => h.replace(/>[^<]*</g, '><');

/* ---------- the unit ---------- */
const MJS_BLOCK = ['/* ---- Charter (World tier) ---- */', '/* ---- Presidential rulings'];
const D = {
  'path-2-schedule-source.md': { kind: 'md', live: 'documents/path-2-schedule-source.md', cfg: 'scheduleCfg' },
  'path-2-risk-register-source.md': { kind: 'md', live: 'documents/path-2-risk-register-source.md', cfg: 'registerCfg' },
  'build-path2-pages.mjs': {
    kind: 'mjs', live: 'tools/build-path2-pages.mjs',
    allowed: {
      456: "    heroSub: 'The methodology LP-074 requires",
      461: '            <p><strong>HISTORICAL ADOPTION, CURRENT CONTROL.</strong>',
      492: "    heroSub: 'The Charter’s enumerated schedule",
      497: '            <p><strong>PART OF THE CHARTER (§10.4).</strong>',
      523: "    heroSub: 'The disposition of every standing finding",
      528: '            <p><strong>THE ADOPTION RECORD.</strong>',
    },
  },
};
for (const [key, d] of Object.entries(D)) {
  d.key = key;
  d.draftPath = join(HERE, key);
  d.rawDraft = raw(d.draftPath);
  d.o = rd(join(ROOT, d.live));
  d.r = rd(d.draftPath);
  if (d.rawDraft.includes('\r')) fail(`[${key}] draft contains CR characters (LF required)`);
}
if (raw(join(HERE, 'ledger.md')).includes('\r')) fail('[ledger.md] contains CR characters');
if (raw(join(HERE, 'check.mjs')).includes('\r')) fail('[check.mjs] contains CR characters');

/* ---------- 1. node --check ---------- */
try { execFileSync(process.execPath, ['--check', D['build-path2-pages.mjs'].draftPath], { stdio: 'pipe' }); notes.push('node --check build-path2-pages.mjs: ok'); }
catch (e) { fail(`[build-path2-pages.mjs] node --check failed: ${String(e.stderr || e.message).trim()}`); }

/* ---------- 2. .mjs draft: only the permitted literal lines changed ---------- */
{
  const d = D['build-path2-pages.mjs'];
  const ol = d.o.split('\n'); const rl = d.r.split('\n');
  if (ol.length !== rl.length) fail(`[mjs] line count ${ol.length} -> ${rl.length}`);
  else {
    const changed = [];
    for (let i = 0; i < ol.length; i++) if (ol[i] !== rl[i]) changed.push(i + 1);
    for (const n of changed) if (!(n in d.allowed)) fail(`[mjs] line ${n} changed outside the permitted literals`);
    for (const [n, prefix] of Object.entries(d.allowed)) {
      if (!rl[n - 1].startsWith(prefix)) fail(`[mjs] permitted line ${n} is not the expected literal (${prefix.trim()})`);
      if (tagSeq(ol[n - 1]) !== tagSeq(rl[n - 1])) fail(`[mjs] line ${n}: tag/attribute sequence changed`);
      if (!changed.includes(Number(n))) notes.push(`[mjs] permitted line ${n} left unchanged`);
    }
    notes.push(`build-path2-pages.mjs: changed lines ${JSON.stringify(changed)}`);
  }
  if (idSeq(d.o).join('|') !== idSeq(d.r).join('|')) fail('[mjs] id="" sequence changed');
  if (hrefSeq(d.o).join('|') !== hrefSeq(d.r).join('|')) fail('[mjs] href="" sequence changed');
}

/* ---------- generator functions, taken from the draft .mjs ---------- */
const genSrc = D['build-path2-pages.mjs'].r;
const fnSrc = slice(genSrc, ['const esc = ', '/* ------------------------------------------------------------------ *\n * Page chrome']);
const GEN = new Function(`${fnSrc}\nreturn { renderDoc, sourceText, htmlText, assertVerbatim, linkFirst, scheduleCfg, registerCfg, resetSlugs: () => { REGISTER_SLUGS = new Set(); } };`)();
const render = (d, md) => { GEN.resetSlugs(); return GEN.renderDoc(md, GEN[d.cfg]); };

for (const d of Object.values(D)) {
  if (d.kind === 'md') { d.oText = norm(GEN.sourceText(d.o)); d.rText = norm(GEN.sourceText(d.r)); }
  else { d.oText = norm(dec(inlineStrip(slice(d.o, MJS_BLOCK)))); d.rText = norm(dec(inlineStrip(slice(d.r, MJS_BLOCK)))); }
}

/* ---------- 3 + 4. Markdown structure and generator checks ---------- */
const joined = (m) => m.replace(/\n(?!\n)/g, ' ');
for (const key of ['path-2-schedule-source.md', 'path-2-risk-register-source.md']) {
  const d = D[key];
  const lines = (m) => m.split('\n');
  const heads = (m) => lines(m).filter((l) => /^#{1,6} /.test(l));
  if (JSON.stringify(heads(d.o)) !== JSON.stringify(heads(d.r))) fail(`[${key}] heading lines changed`);
  else notes.push(`${key}: ${heads(d.r).length} heading lines unchanged`);
  const hr = (m) => lines(m).filter((l) => l.trim() === '---').length;
  if (hr(d.o) !== hr(d.r)) fail(`[${key}] --- rule count changed`);
  // tables: header + separator lines verbatim; each row's key cells and cell count unchanged
  const rows = (m) => lines(m).filter((l) => l.startsWith('|'));
  const cells = (l) => l.replace(/^\|/, '').replace(/\|\s*$/, '').split('|').map((c) => c.trim());
  const ro = rows(d.o); const rr = rows(d.r);
  if (ro.length !== rr.length) fail(`[${key}] table line count ${ro.length} -> ${rr.length}`);
  else {
    for (let i = 0; i < ro.length; i++) {
      const a = cells(ro[i]); const b = cells(rr[i]);
      const isHead = /^#$/.test(a[0]) || /^[-:]+$/.test(a[0]);
      if (isHead && ro[i] !== rr[i]) fail(`[${key}] table header/separator changed: ${ro[i]}`);
      if (a.length !== b.length) fail(`[${key}] table row ${a[0]} cell count ${a.length} -> ${b.length}`);
      if (JSON.stringify(a.slice(0, -1)) !== JSON.stringify(b.slice(0, -1))) fail(`[${key}] table row key cells changed: ${a.slice(0, -1).join(' | ')} -> ${b.slice(0, -1).join(' | ')}`);
    }
    notes.push(`${key}: ${ro.length} table lines, keys and cell counts unchanged`);
  }
  const bold = (m) => [...joined(m).matchAll(/\*\*(.+?)\*\*/g)].map((x) => norm(x[1]));
  if (JSON.stringify(bold(d.o)) !== JSON.stringify(bold(d.r))) fail(`[${key}] bold spans changed`);
  else notes.push(`${key}: ${bold(d.r).length} bold labels unchanged`);
  const ital = (m) => [...joined(m).replace(/\*\*/g, '').matchAll(/\*(.+?)\*/g)].map((x) => norm(x[1]));
  const io = ital(d.o); const ir = ital(d.r);
  if (io.length !== ir.length) fail(`[${key}] italic span count ${io.length} -> ${ir.length}`);
  else io.forEach((s, i) => {
    const para = words(s) > 12;
    if (para !== words(ir[i]) > 12) fail(`[${key}] italic span ${i} changed kind`);
    else if (!para && s !== ir[i]) fail(`[${key}] italic label changed: "${s}" -> "${ir[i]}"`);
  });
  const paraItalics = (m) => m.split(/\n\s*\n/).filter((p) => /^\*[^*]/.test(p.trim()) && /[^*]\*$/.test(p.trim())).length;
  if (paraItalics(d.o) !== paraItalics(d.r)) fail(`[${key}] whole-paragraph italic count changed`);
  const listShape = (m) => lines(m).filter((l) => /^\s*(?:-|\d+\.)\s/.test(l)).map((l) => `${l.match(/^\s*/)[0].length}:${(l.match(/\*\*([A-Z]-\d)/) || [, '?'])[1]}`).join(',');
  if (listShape(d.o) !== listShape(d.r)) fail(`[${key}] list shape changed: ${listShape(d.o)} vs ${listShape(d.r)}`);
  const hyphenSplit = d.r.match(/[A-Za-z]-\n\s*[a-z]/g);
  if (hyphenSplit) fail(`[${key}] hyphen-at-line-end word split(s): ${JSON.stringify(hyphenSplit)}`);
  const maxBody = (m) => Math.max(...lines(m).filter((l) => !/^#/.test(l) && !l.startsWith('|')).map((l) => [...l].length));
  if (maxBody(d.r) > maxBody(d.o)) fail(`[${key}] wrap: longest body line ${maxBody(d.r)} > live ${maxBody(d.o)}`);
  else notes.push(`${key}: longest body line ${maxBody(d.r)} chars (live ${maxBody(d.o)})`);
  // rendered structure with the generator's own id strategy
  const bo = render(d, d.o); const br = render(d, d.r);
  if (skeleton(bo) !== skeleton(br)) fail(`[${key}] rendered tag skeleton differs`);
  if (idSeq(bo).join('|') !== idSeq(br).join('|')) fail(`[${key}] rendered id sequence differs`);
  else notes.push(`${key}: ${idSeq(br).length} rendered ids unchanged`);
  let body = br;
  if (key === 'path-2-schedule-source.md') {
    try {
      body = GEN.linkFirst(br, 'This Schedule is part of the Charter', 'path-2-charter.html#s-10-4');
      const at = br.indexOf('This Schedule is part of the Charter'); const partD = br.indexOf('id="part-d"');
      if (!(partD > 0 && at > partD)) fail('[schedule] linkFirst anchor first occurs outside PART D');
      else notes.push('schedule: linkFirst anchor "This Schedule is part of the Charter" first occurs in PART D');
    } catch (e) { fail(`[schedule] linkFirst: ${e.message}`); }
  }
  try { const n = GEN.assertVerbatim(d.r, body, key); notes.push(`${key}: generator assertVerbatim passes (${n} chars)`); }
  catch (e) { fail(`[${key}] generator assertVerbatim: ${e.message}`); }
}

/* ---------- 5. Frozen tokens and modals (original -> draft) ---------- */
const TOKENS = [
  /LP-\d+(?:\.\d+)?/g, /§§?[\dA-Z][\d.]*\d(?:–\d+(?:\.\d+)?)?(?:\([a-z]+\))*/g, /\bArt(?:icle|\.) [IVXL]+\b/g, /\bY\d+\b/g,
  /\b[AB]\d(?:–[AB]\d)?\b/g, /\bFindings? (?:I–IV|I and II|III|IV)\b/g, /\b\d+(?:\.\d+)?%/g, /≥\d+%/g, /\b\d{4}(?:–\d{4})?\b/g,
  /\b\d+(?:\.\d+)?(?:\/\d+(?:\.\d+)?){2,}\b/g, /\b(?:A\.\d(?:\.\d)?|[BCD]-\d)\b/g, /\bv[1-4]\b/g,
  /\bthirty-year\b/g, /\bninety(?:-day)?\b/g, /\bten (?:years|days)\b/g, /\bone year\b/g, /\btwo windows\b/g, /\b95 percent\b/g,
  /\bat least 95\b/g, /\byear-31\b/g, /\bSHA-256\b/g, /\b70 and 50\b/g, /\bdiscount zero\b/g, /\bone-replacement\b/g,
  /\bAppendix A\b/g, /\bPart (?:A\.5|B)\b/g, /\b(?:SCALAR|ESTIMATORS|REALIZED)\b/g, /\bOperative Measure\b/g, /\bMandatory Diagnostics\b/g,
  /\b50 \/ 25 \/ 12\.5 \/ 6\.25\b/g, /\b(?:twelve|two|three|all three)\b/gi,
];
const EXACT = [/\b(?:CURED|MITIGATED|ACCEPTED)\b/g, /\b[SO]-\d+\b/g, /\bRR-\d+\b/g, /\bPART [A-D]\b/g];
const STRICT_MODALS = /\b(?:shall|may|must|cannot|can)\b/gi;
const SOFT = /\b(?:only|will|would|should|could)\b/gi;
const tally = (t, res) => { const m = new Map(); for (const re of res) for (const x of t.matchAll(re)) { const k = x[0].toLowerCase(); m.set(k, (m.get(k) || 0) + 1); } return m; };
for (const d of Object.values(D)) {
  const o = tally(d.oText, TOKENS); const r = tally(d.rText, TOKENS);
  for (const [k, n] of o) {
    const rn = r.get(k) || 0;
    if (rn === 0) fail(`[${d.key}] frozen token missing: "${k}" (original ${n}x)`);
    else if (rn !== n) notes.push(`[${d.key}] token count ${k}: ${n} -> ${rn}`);
  }
  for (const [k, n] of r) if (!o.has(k)) notes.push(`[${d.key}] token new in draft: "${k}" (${n}x)`);
  const eo = tally(d.oText, EXACT); const er = tally(d.rText, EXACT);
  for (const k of new Set([...eo.keys(), ...er.keys()])) if ((eo.get(k) || 0) !== (er.get(k) || 0)) fail(`[${d.key}] exact token "${k}" count ${eo.get(k) || 0} -> ${er.get(k) || 0}`);
  const mo = tally(d.oText, [STRICT_MODALS]); const mr = tally(d.rText, [STRICT_MODALS]);
  if (d.kind === 'md') for (const k of new Set([...mo.keys(), ...mr.keys()])) if ((mo.get(k) || 0) !== (mr.get(k) || 0)) fail(`[${d.key}] modal "${k}" count ${mo.get(k) || 0} -> ${mr.get(k) || 0}`);
  const so = tally(d.oText, [SOFT]); const sr = tally(d.rText, [SOFT]);
  for (const k of new Set([...so.keys(), ...sr.keys()])) if ((so.get(k) || 0) !== (sr.get(k) || 0)) notes.push(`[${d.key}] hedge "${k}" count ${so.get(k) || 0} -> ${sr.get(k) || 0}`);
}

/* ---------- 6. World-tier guard regexes (check-canon's own patterns) ---------- */
const SEAT = /\b(Sol|Opus|Fable|GPT|Claude)\b/;
const FOUNDER = /founder(?:'|’)?s? (?:ruling|override)/i;
const TIER = /\b(?:tax(?:ation|es)?|tax code|rate schedule|top marginal rates?|the (?:rate )?cascade)\b[^.!?]{0,60}\b(?:is|are|sits? at|remains?)\b[^.!?]{0,40}\b(?:charter-level|charter level|constitutional(?:ly)?|charter-tier)\b/i;
const SUPERSEDED = /(?:Finding III[^.!?]{0,100}(?:fail(?:ed|ure)?|did not pass)|Schedule A\b[^.!?]{0,100}(?:refus(?:ed|al)|reject(?:ed|ion)|not certified)|Schedule B\b[^.!?]{0,100}(?:not reached|refus(?:ed|al)|reject(?:ed|ion)|not certified)|2294[^.!?]{0,120}(?:three findings passed|one finding failed|both refusals)|lawful (?:nonactivation|failure)|both refusals|chain with three links)/i;
const worldGuards = (label, t) => {
  if (SEAT.test(t)) fail(`[${label}] seat name: ${t.match(SEAT)[1]}`);
  if (FOUNDER.test(t)) fail(`[${label}] founder ruling/override phrasing`);
  if (TIER.test(t)) fail(`[${label}] taxation-is-Charter-level predication: ${t.match(TIER)[0]}`);
  if (SUPERSEDED.test(t)) fail(`[${label}] superseded outcome phrasing: ${t.match(SUPERSEDED)[0]}`);
};
for (const d of Object.values(D)) worldGuards(d.key, d.rText);

/* ---------- 7. In-memory build: draft generator + drafts vs live generator + live sources ---------- */
function build(src, mode) {
  const body = src
    .replace(/^#!.*\n/, '')
    .replace(/^import .*$/gm, '')
    .replace("const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');", '')
    .replace('for (const [f, html] of built) write(f, html);', 'return built;');
  const stubRead = (p, enc) => {
    const u = String(p).replace(/\\/g, '/');
    if (mode === 'draft' && u.endsWith('documents/path-2-schedule-source.md')) return readFileSync(D['path-2-schedule-source.md'].draftPath, enc);
    if (mode === 'draft' && u.endsWith('documents/path-2-risk-register-source.md')) return readFileSync(D['path-2-risk-register-source.md'].draftPath, enc);
    return readFileSync(p, enc);
  };
  const fn = new Function('readFileSync', 'writeFileSync', 'join', 'dirname', 'fileURLToPath', 'ROOT', body);
  return Object.fromEntries(fn(stubRead, () => { throw new Error('write attempted'); }, join, dirname, fileURLToPath, ROOT));
}
let LIVE = {}; let DRAFT = {};
try { LIVE = build(D['build-path2-pages.mjs'].o, 'live'); } catch (e) { fail(`live in-memory build failed: ${e.message}`); }
try { DRAFT = build(genSrc, 'draft'); } catch (e) { fail(`draft in-memory build failed: ${e.message}`); }
const PAGES = ['path-2-charter.html', 'path-2-schedule.html', 'path-2-risk-register.html', 'pending-ratify-tax-50-rulings.html'];
const stripComments = (html) => html.replace(/<!--[\s\S]*?-->/g, '');
const normalizedText = (src) => stripComments(src)
  .replace(/<script\b[\s\S]*?<\/script>/gi, ' ').replace(/<style\b[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ')
  .replace(/&(?:nbsp|thinsp);/gi, ' ').replace(/&(?:rarr|rightarrow);/gi, '→').replace(/&mdash;/gi, '—').replace(/&ndash;/gi, '–').replace(/\s+/g, ' ');
const renderedText = (html) => stripComments(html).replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
if (Object.keys(LIVE).length && Object.keys(DRAFT).length) {
  for (const p of PAGES) {
    const disk = rd(join(ROOT, p));
    if (LIVE[p] !== disk) fail(`[baseline] live generator output differs from committed ${p}`);
    if (!DRAFT[p]) { fail(`[build] draft build did not produce ${p}`); continue; }
    if (!DRAFT[p].includes('<body')) fail(`[probe] ${p} lacks <body`);
  }
  notes.push('baseline: live generator + live sources reproduce all 4 committed pages byte for byte');
  if (DRAFT['pending-ratify-tax-50-rulings.html'] !== LIVE['pending-ratify-tax-50-rulings.html']) fail('[build] rulings page is not byte-identical to live');
  else notes.push('rulings page: draft build byte-identical to live');
  const headPart = (h) => h.split('<p class="text-lg')[0];
  const crossPart = (h) => (h.match(/<div class="p2-crosslinks[\s\S]*?\n {8}<\/div>/) || [''])[0];
  const pbLabel = (h) => (h.match(/<span class="pb-label">[\s\S]*?<\/span>/) || [''])[0];
  const statute = (h) => h.slice(h.indexOf('<div class="law-statute">'));
  for (const p of PAGES.slice(0, 3)) {
    const a = LIVE[p]; const b = DRAFT[p];
    if (headPart(a) !== headPart(b)) fail(`[${p}] head/kicker/title region changed`);
    if (crossPart(a) !== crossPart(b)) fail(`[${p}] crosslinks changed`);
    if (pbLabel(a) !== pbLabel(b)) fail(`[${p}] pb-label changed`);
    if (idSeq(a).join('|') !== idSeq(b).join('|')) fail(`[${p}] page id sequence changed`);
    if (hrefSeq(a).join('|') !== hrefSeq(b).join('|')) fail(`[${p}] page href sequence changed`);
    if (skeleton(a) !== skeleton(b)) fail(`[${p}] page tag skeleton changed`);
    worldGuards(`built ${p}`, normalizedText(b));
    if (FOUNDER.test(renderedText(b)) || SEAT.test(renderedText(b))) fail(`[built ${p}] layer guard (rendered text)`);
    for (const href of hrefSeq(b)) {
      const m = href.match(/^([\w.-]+\.html)#([\w-]+)$/); if (!m) continue;
      const target = DRAFT[m[1]] ?? (existsSync(join(ROOT, m[1])) ? rd(join(ROOT, m[1])) : '');
      if (!target.includes(`id="${m[2]}"`)) fail(`[${p}] fragment does not resolve: ${href}`);
    }
  }
  if (statute(LIVE['path-2-charter.html']) !== statute(DRAFT['path-2-charter.html'])) fail('[charter] instrument body changed');
  else notes.push('charter page: instrument body byte-identical to live; only hero sub and banner differ');
  const C = DRAFT['path-2-charter.html']; const S = DRAFT['path-2-schedule.html']; const R = DRAFT['path-2-risk-register.html'];
  const arts = [...C.matchAll(/id="art-(\d+)"/g)].map((m) => Number(m[1])).sort((x, y) => x - y);
  const pins = [
    ['charter is the instrument (THE PATH 2 CHARTER)', C.includes('THE PATH 2 CHARTER')],
    ['charter art-1..14 contiguous', arts.length === 14 && arts.every((n, i) => n === i + 1)],
    ['charter links law-polling.html#lp-074', C.includes('law-polling.html#lp-074')],
    ['charter links the Schedule', C.includes('path-2-schedule.html')],
    ['schedule is the instrument (Operative Measure)', S.includes('Operative Measure')],
    ['schedule carries Part D', /part d/i.test(S)],
    ['schedule links the Charter', S.includes('path-2-charter.html')],
    ['register engraves through RR-12', R.includes('RR-12')],
    ['register links the Charter', R.includes('path-2-charter.html')],
    ['register links the Schedule', R.includes('path-2-schedule.html')],
    ['charter -> schedule#part-a', C.includes('path-2-schedule.html#part-a')],
    ['schedule #part-a resolves', S.includes('id="part-a"')],
    ['schedule -> charter#s-10-4', S.includes('path-2-charter.html#s-10-4')],
    ['charter #s-10-4 resolves (probe id="s-10-4")', C.includes('id="s-10-4"')],
    ['schedule -> register#rr-9', S.includes('path-2-risk-register.html#rr-9')],
    ['register #rr-9 resolves', R.includes('id="rr-9"')],
    ['probe RR-12 find-string', R.includes('RR-12')],
    ['Schedule linkFirst injected', S.includes('<a href="path-2-charter.html#s-10-4">This Schedule is part of the Charter</a>')],
  ];
  for (const [k, ok] of pins) if (!ok) fail(`[check-canon (g) on draft build] ${k}`);
  notes.push(`draft-built pages: ${pins.length} check-canon (g)/probe pins hold; World-tier guards clear; all fragments resolve`);
}

/* ---------- 8. Ledger ---------- */
const ledger = rd(join(HERE, 'ledger.md'));
const ticks = (s) => [...s.matchAll(/`([^`]+)`/g)].map((m) => m[1]);
let section = null; let target = null;
const counts = {};
for (const line of ledger.split('\n')) {
  if (/^## /.test(line)) { section = /^## \(a\)/.test(line) ? 'a' : /^## \(b\)/.test(line) ? 'b' : null; target = null; continue; }
  if (/^### /.test(line)) {
    const h = line.replace(/^### /, '').trim();
    const lv = h.match(/^live: (\S+)/); const bt = h.match(/^built: (\S+)/);
    if (lv) target = { key: `live:${lv[1]}`, flatRaw: flat(rd(join(ROOT, lv[1]))), text: null };
    else if (bt) target = { key: `built:${bt[1]}`, flatRaw: flat(DRAFT[bt[1]] || ''), text: null };
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
      if (!target.text) { fail(`[ledger a] quote row under a non-draft heading: ${line}`); continue; }
      const q = norm(dec(s));
      const hit = target.text.includes(q);
      if (absent && hit) fail(`[ledger a ${target.key}] must be absent but present: "${s}"`);
      if (!absent && !hit) fail(`[ledger a ${target.key}] quote not in draft: "${s}"`);
      if (!absent && words(q) > 15) fail(`[ledger a ${target.key}] quote over 15 words (${words(q)}): "${s}"`);
    }
  }
}
for (const key of Object.keys(D)) {
  if (!counts[`a:${key}`]) fail(`fact ledger has no rows for ${key}`);
  if (!counts[`b:${key}`]) fail(`frozen checklist has no rows for ${key}`);
}

/* ---------- 9. Word counts vs the ledger table ---------- */
const proseWords = (d, s) => {
  if (d.kind === 'md') return words(norm(GEN.sourceText(s)));
  const lines = s.split('\n');
  return Object.keys(d.allowed).reduce((n, k) => n + words(norm(dec(inlineStrip(lines[k - 1].replace(/^\s*heroSub: '|',\s*$/g, ''))))), 0);
};
for (const d of Object.values(D)) {
  d.ow = proseWords(d, d.o); d.rw = proseWords(d, d.r);
  const row = ledger.split('\n').find((l) => l.startsWith('| ') && l.includes(d.key));
  const nums = row ? [...row.matchAll(/\|\s*([\d,]+)\s*(?=\|)/g)].map((m) => Number(m[1].replace(/,/g, ''))) : [];
  if (nums[0] !== d.ow || nums[1] !== d.rw) fail(`[${d.key}] ledger word counts ${JSON.stringify(nums)} != computed [${d.ow}, ${d.rw}]`);
}

/* ---------- 10. Register tells (report only) ---------- */
const REVERSAL = /\b(?:is|are|was) not [^.;:]{1,60}; (?:it|they|this) (?:is|are|was)\b|; (?:it|they) (?:does|do|did) not\b|\bnot [^.;,]{1,40}, but\b/gi;
const prose = (d, s) => {
  if (d.kind === 'mjs') { const l = s.split('\n'); return norm(dec(inlineStrip(Object.keys(d.allowed).map((k) => l[k - 1]).join(' ')))); }
  return norm(s.split('\n').filter((l) => !/^#/.test(l)).join('\n').replace(/\*\*[^*]+\*\*/g, ' ').replace(/^\|[^|]*\|(?:[^|]*\|){0,2}/gm, ' '));
};
for (const d of Object.values(D)) {
  const n = (t) => (t.match(REVERSAL) || []).length; const em = (t) => (t.match(/—/g) || []).length; const semi = (t) => (t.match(/;/g) || []).length;
  d.tells = `reversals ${n(prose(d, d.o))} -> ${n(prose(d, d.r))}; prose em-dashes ${em(prose(d, d.o))} -> ${em(prose(d, d.r))}; semicolons ${semi(prose(d, d.o))} -> ${semi(prose(d, d.r))}`;
}

/* ---------- report ---------- */
for (const d of Object.values(D)) {
  const a = counts[`a:${d.key}`] || { rows: 0, spans: 0 }; const b = counts[`b:${d.key}`] || { rows: 0, spans: 0 };
  const pct = d.ow ? (((d.rw - d.ow) / d.ow) * 100).toFixed(1) : '0.0';
  console.log(`${d.key}: words ${d.ow} -> ${d.rw} (${pct}%); fact ledger ${a.rows} rows/${a.spans} quotes; frozen ${b.rows} rows/${b.spans} strings; ${d.tells}`);
}
for (const k of Object.keys(counts).filter((k) => /:(live|built):/.test(k))) console.log(`${k}: ${counts[k].rows} rows/${counts[k].spans} strings`);
for (const n of notes) console.log(`  note: ${n}`);
if (fails.length) { console.log(`FAIL (${fails.length})`); for (const f of fails) console.log(`  - ${f}`); process.exit(1); }
console.log('PASS: frozen strings present, headings/ids/structure unchanged, ledger quotes verbatim, .mjs draft parses, draft build holds every pin');
