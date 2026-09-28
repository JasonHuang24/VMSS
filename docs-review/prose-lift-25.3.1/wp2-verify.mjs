import fs from 'node:fs';
import { execSync } from 'node:child_process';
const root = 'F:/Programming/VMSS/VMSS Website/';
const dir = root + 'docs-review/prose-lift-25.3.1/';
// The original is the committed page, read straight from git.
const o = execSync('git show HEAD:whitepaper.html', { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const live = fs.readFileSync(root + 'whitepaper.html', 'utf8');
const c = fs.readFileSync(dir + 'whitepaper.html', 'utf8');
const ledger = fs.readFileSync(dir + 'wp2-ledger.md', 'utf8');
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const res = [];
const ok = (name, pass, detail = '') => res.push([pass, name, detail]);

ok('live whitepaper.html untouched (equals HEAD)', live === o);

// 0. Patch range: everything outside §12–22 is byte-identical to HEAD
const S = '<h2>12. Economic Model: Taxation', E = '<h2>23. Military Posture';
const si = (h) => h.indexOf(S), ei = (h) => h.indexOf(E);
ok('range markers found once each', [o, c].every((h) => si(h) > 0 && ei(h) > si(h) && h.split(S).length === 2 && h.split(E).length === 2));
ok('RANGE CHECK: text before <h2>12. byte-identical to HEAD', o.slice(0, si(o)) === c.slice(0, si(c)), `${si(o)} bytes`);
ok('RANGE CHECK: text from <h2>23. onward byte-identical to HEAD', o.slice(ei(o)) === c.slice(ei(c)), `${o.length - ei(o)} bytes`);

// 1. Tag + attribute sequence, headings, script/style/JSON-LD blocks, head
const blockRe = /<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi;
const tags = (h) => h.replace(blockRe, '<$1/>').match(/<[^>]+>/g);
const heads = (h) => h.match(/<h[1-6]\b[^>]*>[\s\S]*?<\/h[1-6]>/gi) || [];
const blocks = (h) => h.match(blockRe) || [];
const ld = (h) => h.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g) || [];
ok('tag+attribute sequence identical', eq(tags(o), tags(c)), `${tags(o).length} tags`);
ok('heading sequence identical', eq(heads(o), heads(c)), `${heads(o).length} headings`);
const bo = blocks(o), bc = blocks(c);
ok('script/style blocks byte-identical', bo.length === bc.length && bo.every((b, i) => b === bc[i]), `${bo.length} blocks`);
ok('JSON-LD blocks byte-identical', eq(ld(o), ld(c)), `${ld(o).length} JSON-LD blocks`);
ok('head byte-identical', o.split('</head>')[0] === c.split('</head>')[0]);

// 2. Ledger markers
const norm = (s) => s.replace(/<!--[\s\S]*?-->/g, ' ').replace(blockRe, ' ').replace(/<[^>]+>/g, '')
  .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').replace(/&rsquo;|&lsquo;|’|‘/g, "'")
  .replace(/&ldquo;|&rdquo;|“|”/g, '"').replace(/&sect;/g, '§').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ')
  .replace(/\s+/g, ' ');
const cText = norm(c);
const all = (re) => [...ledger.matchAll(re)].map((m) => m[1]);
const claims = all(/«([^»]+)»/g), afters = all(/⟪([^⟫]+)⟫/g), befores = all(/⟦([^⟧]+)⟧/g);
const words = (s) => s.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
const missC = claims.filter((q) => !cText.includes(norm(q)));
const longC = claims.filter((q) => words(norm(q)) > 15);
ok('every «» ledger quote appears in the copy', missC.length === 0, `${claims.length - missC.length}/${claims.length}` + (missC.length ? ' MISSING: ' + missC.join(' | ') : ''));
ok('every «» ledger quote is 15 words or fewer', longC.length === 0, longC.join(' | '));
const missA = afters.filter((q) => !c.includes(q));
ok('every ⟪after⟫ text appears in the copy', missA.length === 0, `${afters.length - missA.length}/${afters.length}` + (missA.length ? ' MISSING: ' + missA.join(' | ') : ''));
const badB = befores.filter((q) => !o.includes(q) || c.includes(q));
ok('every ⟦before⟧ text is in the original and gone from the copy', badB.length === 0, `${befores.length - badB.length}/${befores.length}` + (badB.length ? ' BAD: ' + badB.join(' | ') : ''));

// 3. Fidelity inside §12–22: numbers, citations, quotations, modals/hedges, defined terms
const range = (h) => h.slice(si(h), ei(h));
const text = (h) => norm(range(h));
const ms = (arr) => [...arr].sort();
const nums = (h) => ms(text(h).match(/\d[\d,.:–]*%?/g) || []);
ok('number/rate/year multiset identical (§12–22)', eq(nums(o), nums(c)), `${nums(o).length} numeric tokens`);
const cites = (h) => ms(text(h).match(/§\s?[\d.]+x?|\bLP-\d+(?:\.\d+)?|\bArticles? [IVXL]+(?:\.[IVXL]+)?(?:–[IVXL.]+)?|\bSection \d+(?:\.\d+)?|\bCharter Article [IVXL]+/g) || []);
ok('citation multiset identical (§, LP-, Article, Section)', eq(cites(o), cites(c)), `${cites(o).length} citations`);
const quotes = (h) => ms(text(h).match(/"[^"]{1,200}"/g) || []);
ok('quoted-text multiset identical', eq(quotes(o), quotes(c)), `${quotes(o).length} quoted strings`);
const links = (h) => h.match(/href="[^"]*"/g) || [];
ok('href sequence identical (whole page)', eq(links(o), links(c)), `${links(o).length} hrefs`);
const HEDGES = ['shall', 'must', 'may', 'may not', 'only', 'unless', 'except', 'tends to', 'generally', 'approximately', 'roughly',
  'typically', 'naturally', 'cannot', 'never', 'can', 'should', 'would', 'largely', 'predominantly', 'substantially', 'nearly', 'almost',
  'primarily', 'fully', 'not', 'no', 'without', 'absolute', 'any'];
const cnt = (h, w) => (text(h).match(new RegExp(`\\b${w}\\b`, 'gi')) || []).length;
// Deltas are whole-sentence cuts of restatements, each ledgered; no rule modal or scope hedge moves.
// not -6: E ("does not criminalize"), I ("does not return"), P ("Descent/Death does not erase", 2), R ("is not arbitrary"),
// U ("not against registered communities"). fully -1: E. without -1: F ("Without it, VMSS is...").
const EXPECTED_HEDGE = { fully: -1, not: -6, without: -1 };
const hedgeDelta = Object.fromEntries(HEDGES.map((w) => [w, cnt(c, w) - cnt(o, w)]).filter(([, d]) => d !== 0));
ok('hedge/negation counts change only by the ledgered cuts', eq(hedgeDelta, EXPECTED_HEDGE),
  Object.entries(hedgeDelta).map(([w, d]) => `${w} ${d}`).join(', ') || 'none');
const RULE_MODALS = ['shall', 'must', 'may', 'may not', 'cannot', 'can', 'only', 'unless', 'except', 'never', 'should', 'would'];
ok('rule modals and qualifiers identical (shall/must/may/may not/cannot/can/only/unless/except/never/should/would)',
  RULE_MODALS.every((w) => cnt(o, w) === cnt(c, w)), RULE_MODALS.map((w) => `${w}=${cnt(c, w)}`).join(' '));
const TERMS = ['Savings Circulation Mandate', 'SCM', 'Automation Dividend Treasury', 'ADT', 'purchasing power gradient', 'PPG',
  'elective residen', 'voluntary permanent residen', 'VPR', 'terminal reassignment', 'reassignment', 'Meritboard', 'STI',
  'Threshold Inhibition Protocol', 'TIP', 'backup vessel', 'terminal sync capture', 'federal floor', 'federal-floor', 'status-based',
  'territorial', 'SAD', 'MGD', 'phasing', 'load-bearing', 'clean-record', 'autoparenting', 'pulse-at-start', 'minimal tax base',
  'minimal-base', 'founder-calibratable', 'Named rather than denied', 'do-nothing', 'unsigned continuity claim', 'unsigned genesis claim',
  'elective-lapse', 'Authorized bailout', 'authorized bailout', 'kill switch', 'Five Instruments', 'redundant-envelope', 'cognition',
  'non-public', 'Pillar Federal Law', 'three-axis', 'layer-graduated', 'reasonable-perception', 'Trajectory Doctrine', 'Path 2',
  'Primary Job Subsidy', 'PJS', 'replenishment', 'continuity', 'ledger continuity', 'revival continuity', 'Biological continuity',
  'fabrication proxy', 'fabrication-proxy', 'sovereign VMSS fabrication facility', 'implant', 'failsafe', 'pre-intervention',
  'post-intervention', 'Sanctuary', 'Main Layer', 'Colosseum', 'network attribution', 'civic ledger', 'implant ledger',
  'state-non-surveillance', 'state non-surveillance', 'category/calibration', 'novelty', 'substrate', 'AGI', 'ASI', 'Cyborg', 'cyborg'];
const EXPECTED = {};
const tc = (h, t) => text(h).split(t).length - 1;
const delta = Object.fromEntries(TERMS.map((t) => [t, tc(c, t) - tc(o, t)]).filter(([, d]) => d !== 0));
ok('defined-term counts unchanged (no term cut or swapped)', eq(delta, EXPECTED),
  Object.entries(delta).map(([t, d]) => `${t} ${d}`).join(', ') || `${TERMS.length} terms checked`);

// 4. Scope of edits
const ol = o.split('\n'), cl = c.split('\n');
const changed = ol.map((l, i) => (l !== cl[i] ? i + 1 : 0)).filter(Boolean);
const EXPECTED_LINES = [878, 898, 925, 973, 985, 1010, 1026, 1027, 1050, 1062, 1065, 1068, 1081, 1084, 1087, 1133, 1141, 1263, 1304, 1337, 1344];
ok('changed lines are exactly the 21 ledgered elements', ol.length === cl.length && eq(changed, EXPECTED_LINES), `changed: ${changed.join(',')}`);
ok('every changed line is a single <p> or <li> element',
  changed.every((n) => /^\s*<(p|li)[ >]/.test(ol[n - 1]) && /<\/(p|li)>\s*$/.test(ol[n - 1])));
const dash = (s) => (s.match(/—|&mdash;/g) || []).length;
ok('em-dash count never rises on a changed line', changed.every((n) => dash(cl[n - 1]) <= dash(ol[n - 1])),
  changed.map((n) => `L${n}:${dash(ol[n - 1])}->${dash(cl[n - 1])}`).join(' '));
const tw = ['sticky', 'hidden', 'block', 'flex', 'grid', 'absolute', 'fixed'];
const twc = (h, w) => (norm(h).match(new RegExp(`\\b${w}\\b`, 'gi')) || []).length;
ok('no bare Tailwind token added', tw.every((w) => twc(c, w) <= twc(o, w)));

// 5. check-canon / mutation-test strings that read whitepaper.html (must survive byte for byte)
const DOCTRINE = 'top marginal rates track demonstrated institutional need, and any rate reduction requires audited evidence per the Path 2 standing audit — never authored facts — at the standard zero-fail threshold.';
ok('Trajectory Doctrine guard string intact', c.includes(DOCTRINE) && o.includes(DOCTRINE));
for (const s of ['LP-070 remains the enacted standing future gate', 'aggregate dividend coverage', 'top marginal rates track demonstrated institutional need'])
  ok(`guard find string intact: ${s}`, c.split(s).length === o.split(s).length && c.includes(s));
const nt = norm(c);
ok('LP-070 figure/gate/substitution guards still match',
  nt.includes('122.4% aggregate dividend coverage') && nt.includes('101.1% at the weakest month')
  && /trailing 36-month window, with no single month below 100%/i.test(nt)
  && /tax receipts, Lower-layer receipts, SCM recirculation, private velocity, backfill[^.]{0,100}do not count/i.test(nt));
ok('exact cascade still present', /\b50\s*%?\s*\/\s*25\s*%?\s*\/\s*12\.5\s*%?\s*\/\s*6\.25\s*%?\b/.test(nt));
const forbiddenCurrent = /(?:LP-073[^.!?]{0,120}(?:remains|is|still)\s+(?:current|active|operative)|(?:current|active|operative|since 2295|from 2295)[^.!?]{0,100}(?:70\s*%?\s*\/\s*35\s*%?\s*\/\s*17\s*%?\s*\/\s*8\s*%?|\b35%|\b17%|\b8%)|both refusals|chain with three links)/i;
const TIER = /\b(?:tax(?:ation|es)?|tax code|rate schedule|top marginal rates?|the (?:rate )?cascade)\b[^.!?]{0,60}\b(?:is|are|sits? at|remains?)\b[^.!?]{0,40}\b(?:charter-level|charter level|constitutional(?:ly)?|charter-tier)\b/i;
ok('no forbidden stale-rate, tier-claim, founder or reviewer-seat match introduced',
  (forbiddenCurrent.test(nt) === forbiddenCurrent.test(norm(o))) && (TIER.test(nt) === TIER.test(norm(o)))
  && !/founder(?:'|’)?s? (?:ruling|override)/i.test(nt) && !/\b(Sol|Opus|Fable|GPT|Claude)\b/.test(c.replace(blockRe, ' ').replace(/<[^>]+>/g, ' ')));
ok('no stale "five currencies"', !/\bfive (siloed )?currenc/i.test(c.replace(/<!--[\s\S]*?-->/g, '')));
const lpRefs = (h) => [...h.matchAll(/law-polling\.html#(lp-[\w-]+)/g)].map((m) => m[1]);
ok('LP deep links identical', eq(lpRefs(o), lpRefs(c)), `${lpRefs(o).length} links`);
const ids = (h) => [...h.replace(/<!--[\s\S]*?-->/g, '').matchAll(/ id="([^"]+)"/g)].map((m) => m[1]);
ok('id sequence identical, no duplicates', eq(ids(o), ids(c)) && new Set(ids(c)).size === ids(c).length, `${ids(c).length} ids`);

// Informational
const spaced = (h) => norm(h.replace(/<[^>]+>/g, ' ')).replace(/[—–]/g, ' ');
const bodyWords = (h) => words(spaced(h.slice(h.indexOf('<body'), h.indexOf('</body>'))));
const rangeWords = (h) => words(spaced(range(h)));
const lineWords = (n) => `L${n} ${words(spaced(ol[n - 1]))}->${words(spaced(cl[n - 1]))}`;
console.log(`INFO  element words: ${changed.map(lineWords).join(', ')}`);
const multiDash = (h) => text(h).split(/(?<=[.!?])\s+/).filter((s) => (s.match(/—/g) || []).length >= 2).length;
console.log(`INFO  words: page ${bodyWords(o)} -> ${bodyWords(c)}; §12–22 ${rangeWords(o)} -> ${rangeWords(c)}`);
console.log(`INFO  sentences in §12–22 with 2+ em-dashes: ${multiDash(o)} -> ${multiDash(c)}`);
console.log(`INFO  ledger markers: ${befores.length} before, ${afters.length} after, ${claims.length} claim quotes`);

let pass = true;
for (const [p, n, d] of res) { if (!p) pass = false; console.log(`${p ? 'PASS' : 'FAIL'}  ${n}${d ? '  [' + d + ']' : ''}`); }
console.log(pass ? 'ALL PASS' : 'FAIL');
process.exit(pass ? 0 : 1);
