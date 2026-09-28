import fs from 'node:fs';
import { execSync } from 'node:child_process';
const root = 'F:/Programming/VMSS/VMSS Website/';
const dir = root + 'docs-review/prose-lift-25.3.2/';
// The original is the committed page, read straight from git.
const o = execSync('git show HEAD:whitepaper.html', { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const live = fs.readFileSync(root + 'whitepaper.html', 'utf8');
const c = fs.readFileSync(dir + 'whitepaper.html', 'utf8');
const ledger = fs.readFileSync(dir + 'wp3-ledger.md', 'utf8');
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const res = [];
const ok = (name, pass, detail = '') => res.push([pass, name, detail]);

ok('live whitepaper.html untouched (equals HEAD)', live === o);

// 0. Patch range: §23 through the end of the §34 glossary. Everything outside is byte-identical to HEAD.
const S = '<h2>23. Military Posture', E = '<div class="pagination-wrap">';
const si = (h) => h.indexOf(S), ei = (h) => h.indexOf(E);
ok('range markers found once each', [o, c].every((h) => si(h) > 0 && ei(h) > si(h) && h.split(S).length === 2 && h.split(E).length === 2));
ok('RANGE CHECK: text before <h2>23. byte-identical to HEAD', o.slice(0, si(o)) === c.slice(0, si(c)), `${si(o)} bytes`);
ok('RANGE CHECK: everything after the last glossary entry (from the §34 </article> on) byte-identical to HEAD',
  o.slice(o.lastIndexOf('</article>', ei(o))) === c.slice(c.lastIndexOf('</article>', ei(c))), `${o.length - o.lastIndexOf('</article>', ei(o))} bytes`);
const lastEntry = (h) => h.slice(h.lastIndexOf('<h3>', ei(h)), h.lastIndexOf('</article>', ei(h)));
ok('last glossary entry (Zero Leakage Aspiration) unchanged', lastEntry(o) === lastEntry(c) && lastEntry(c).includes('Zero Leakage Aspiration'));

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

// 3. Fidelity inside §23–34: numbers, citations, quotations, modals/hedges, defined terms
const range = (h) => h.slice(si(h), ei(h));
const text = (h) => norm(range(h));
const ms = (arr) => [...arr].sort();
const nums = (h) => ms(text(h).match(/\d[\d,.:–]*%?/g) || []);
ok('number/rate/year multiset identical (§23–34)', eq(nums(o), nums(c)), `${nums(o).length} numeric tokens`);
const cites = (h) => ms(text(h).match(/§§?\s?[\d.–]+x?|\bLP-\d+(?:\.\d+)?|\bArticles? [IVXL]+(?:\.[IVXL]+)?(?:[–/][IVXL.]+)?|\bSection \d+(?:\.\d+)?|\bResources? \d+(?:–\d+)?|\bWorld §\d+|\bpage \d+/g) || []);
ok('citation multiset identical (§, LP-, Article, Section, Resource, World, page)', eq(cites(o), cites(c)), `${cites(o).length} citations`);
const quotes = (h) => ms(text(h).match(/"[^"]{1,200}"/g) || []);
ok('quoted-text multiset identical', eq(quotes(o), quotes(c)), `${quotes(o).length} quoted strings`);
const links = (h) => h.match(/href="[^"]*"/g) || [];
ok('href sequence identical (whole page)', eq(links(o), links(c)), `${links(o).length} hrefs`);
const HEDGES = ['shall', 'must', 'may', 'may not', 'only', 'unless', 'except', 'tends to', 'generally', 'approximately', 'roughly',
  'typically', 'naturally', 'cannot', 'never', 'can', 'should', 'would', 'largely', 'predominantly', 'substantially', 'nearly', 'almost',
  'primarily', 'fully', 'not', 'no', 'without', 'absolute', 'any', 'regardless', 'categorically', 'exclusively', 'deliberately'];
const cnt = (h, w) => (text(h).match(new RegExp(`\\b${w}\\b`, 'gi')) || []).length;
// Deltas are the ledgered "not X" reversals and restating closers. No rule modal or scope hedge moves.
// not -9: A1 "is not a symbolic gesture", A2 "not on the actor's", A3 "This is not optional", A4 "is not ceremonial",
// A6 "not consequence", A7 "does not sever", A9 "not diplomatic", A10 "is not accidental", A12 "is not incidental".
const EXPECTED_HEDGE = { not: -9 };
const hedgeDelta = Object.fromEntries(HEDGES.map((w) => [w, cnt(c, w) - cnt(o, w)]).filter(([, d]) => d !== 0));
ok('hedge/negation counts change only by the ledgered cuts', eq(hedgeDelta, EXPECTED_HEDGE),
  Object.entries(hedgeDelta).map(([w, d]) => `${w} ${d}`).join(', ') || 'none');
const RULE_MODALS = ['shall', 'must', 'may', 'may not', 'cannot', 'can', 'only', 'unless', 'except', 'never', 'should', 'would'];
ok('rule modals and qualifiers identical (shall/must/may/may not/cannot/can/only/unless/except/never/should/would)',
  RULE_MODALS.every((w) => cnt(o, w) === cnt(c, w)), RULE_MODALS.map((w) => `${w}=${cnt(c, w)}`).join(' '));
const TERMS = ['External Force Doctrine', 'Federation Treaty', 'Meritboard', 'Supreme Court', 'kill switch', 'nanobot',
  'Five Instruments', 'recall protocol', 'status-based', 'territorial', 'tier-equivalent transfer', 'elective residen', 'elective',
  'voluntary permanent residen', 'reassignment', 'Layer reassignment', 'phasing', 'backup vessel', 'implant', 'leakage', 'load-bearing',
  'envelope', 'Redundant Envelope', 'Sanctuary', 'Main Layer', 'Tier 0', 'Tier 1', 'Tier 2', 'Tier 3', 'Tier 4', 'sovereignty violation',
  'layer equivalent', 'mapping', 'revival identity', 'Continuity Sovereignty', 'founding core', 'Article XI gauntlet', 'gauntlet',
  'PIA', 'Precognition', 'AGI', 'ASI', 'SAD', 'MGD', 'STI', 'TIP', 'Heaven Layers', 'Freedom Layer', 'Universe of VMSS',
  'Five Planet Federation', 'Five Rings', 'ImmersionTube', 'Origin Purists', 'Self-Authorship Modernists', 'clearable', 'null STI',
  'transit', 'Hostile State Doctrine', 'Transit-Right Doctrine', 'sanctions', 'longevity stack', 'medical technology transfers',
  'imminence', 'HUMINT', 'SIGINT', 'dual citizenship', 'citizenship', 'federal floor', 'Founding Treaty', 'stratification architecture',
  'AGI-tool system', 'AGI citizen', 'shared-stack', 'stratification', 'continuity', 'UBI', 'PJS', 'SCM', 'Automation Dividend Treasury',
  'external', 'architectural', 'geography'];
const EXPECTED = { reassignment: -1, 'Layer reassignment': -1, architectural: -1, geography: -1 };
const tc = (h, t) => text(h).split(t).length - 1;
const delta = Object.fromEntries(TERMS.map((t) => [t, tc(c, t) - tc(o, t)]).filter(([, d]) => d !== 0));
ok('defined-term counts change only by the ledgered cuts (no term swapped)', eq(delta, EXPECTED),
  Object.entries(delta).map(([t, d]) => `${t} ${d}`).join(', ') || `${TERMS.length} terms checked`);

// 4. Scope of edits
const ol = o.split('\n'), cl = c.split('\n');
const changed = ol.map((l, i) => (l !== cl[i] ? i + 1 : 0)).filter(Boolean);
const EXPECTED_LINES = [1441, 1444, 1452, 1465, 1483, 1503, 1515, 1516, 1523, 1528, 1543, 1552, 1589, 1686, 1692, 1696,
  1766, 1835, 1868, 1871, 1891, 1945, 1969, 2067];
ok('changed lines are exactly the 24 ledgered elements', ol.length === cl.length && eq(changed, EXPECTED_LINES), `changed: ${changed.join(',')}`);
ok('every changed line is a single <p> element',
  changed.every((n) => /^\s*<p[ >]/.test(ol[n - 1]) && /<\/p>\s*$/.test(ol[n - 1])));
const dash = (s) => (s.match(/—|&mdash;/g) || []).length;
ok('em-dash count never rises on a changed line', changed.every((n) => dash(cl[n - 1]) <= dash(ol[n - 1])),
  changed.map((n) => `L${n}:${dash(ol[n - 1])}->${dash(cl[n - 1])}`).join(' '));
const tw = ['sticky', 'hidden', 'block', 'flex', 'grid', 'absolute', 'fixed'];
const twc = (h, w) => (norm(h).match(new RegExp(`\\b${w}\\b`, 'gi')) || []).length;
ok('no bare Tailwind token added', tw.every((w) => twc(c, w) <= twc(o, w)));

// 5. check-canon / mutation-test strings that read whitepaper.html (all sit before §23; must survive byte for byte)
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
const forbiddenCurrent = /(?:LP-073[^.!?]{0,120}(?:remains|is|still)\s+(?:current|active|operative)|(?:current|active|operative|since 2295|from 2295)[^.!?]{0,100}(?:70\s*%?\s*\/\s*35\s*%?\s*\/\s*17\s*%?\s*\/\s*8\s*%?|\b35%|\b17%|\b8%)|2294[^.!?]{0,120}(?:Finding III[^.!?]{0,50}(?:fail|did not pass)|Schedule [AB]\b[^.!?]{0,50}(?:refus|reject|not certified|not reached))|three findings passed[^.!?]{0,50}(?:one did not|one failed)|both refusals|chain with three links|executed (?:that logic|the logic) once already)/i;
const TIER = /\b(?:tax(?:ation|es)?|tax code|rate schedule|top marginal rates?|the (?:rate )?cascade)\b[^.!?]{0,60}\b(?:is|are|sits? at|remains?)\b[^.!?]{0,40}\b(?:charter-level|charter level|constitutional(?:ly)?|charter-tier)\b/i;
const supersededOutcome = /(?:Finding III[^.!?]{0,100}(?:fail(?:ed|ure)?|did not pass)|Schedule A\b[^.!?]{0,100}(?:refus(?:ed|al)|reject(?:ed|ion)|not certified)|Schedule B\b[^.!?]{0,100}(?:not reached|refus(?:ed|al)|reject(?:ed|ion)|not certified)|2294[^.!?]{0,120}(?:three findings passed|one finding failed|both refusals)|lawful (?:nonactivation|failure)|both refusals|chain with three links)/i;
const rendered = (h) => h.replace(/<!--[\s\S]*?-->/g, ' ').replace(blockRe, ' ').replace(/<[^>]+>/g, ' ');
ok('no forbidden stale-rate, tier-claim, refusal-outcome, founder or reviewer-seat match introduced',
  (forbiddenCurrent.test(nt) === forbiddenCurrent.test(norm(o))) && (TIER.test(nt) === TIER.test(norm(o)))
  && (supersededOutcome.test(nt) === supersededOutcome.test(norm(o)))
  && !/founder(?:'|’)?s? (?:ruling|override)/i.test(rendered(c)) && !/\b(Sol|Opus|Fable|GPT|Claude)\b/.test(rendered(c)));
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
console.log(`INFO  words: page ${bodyWords(o)} -> ${bodyWords(c)}; §23–34 ${rangeWords(o)} -> ${rangeWords(c)}`);
console.log(`INFO  sentences in §23–34 with 2+ em-dashes: ${multiDash(o)} -> ${multiDash(c)}`);
console.log(`INFO  ledger markers: ${befores.length} before, ${afters.length} after, ${claims.length} claim quotes`);

let pass = true;
for (const [p, n, d] of res) { if (!p) pass = false; console.log(`${p ? 'PASS' : 'FAIL'}  ${n}${d ? '  [' + d + ']' : ''}`); }
console.log(pass ? 'ALL PASS' : 'FAIL');
process.exit(pass ? 0 : 1);
