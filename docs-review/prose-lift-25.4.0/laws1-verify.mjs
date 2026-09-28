import fs from 'node:fs';
import { execSync } from 'node:child_process';
const root = 'F:/Programming/VMSS/VMSS Website/';
const dir = root + 'docs-review/prose-lift-25.4.0/';
// The original is the committed page, read straight from git.
const o = execSync('git show HEAD:laws.html', { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const live = fs.readFileSync(root + 'laws.html', 'utf8');
const c = fs.readFileSync(dir + 'laws.html', 'utf8');
const ledger = fs.readFileSync(dir + 'laws1-ledger.md', 'utf8');
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const res = [];
const ok = (name, pass, detail = '') => res.push([pass, name, detail]);

ok('live laws.html untouched (equals HEAD)', live === o);

// 0. Patch range: main content start up to (not including) the Dividend Sourcing article.
const S = '<main id="main-content"', E = '<article class="code-entry" id="code-fc-dividend-sourcing-interlayer-levy"';
const si = (h) => h.indexOf(S), ei = (h) => h.indexOf(E);
ok('range markers found once each', [o, c].every((h) => si(h) > 0 && ei(h) > si(h) && h.split(S).length === 2 && h.split(E).length === 2));
ok('RANGE CHECK: everything before <main> byte-identical to HEAD', o.slice(0, si(o)) === c.slice(0, si(c)), `${si(o)} bytes`);
ok('RANGE CHECK: from the code-fc-dividend-sourcing-interlayer-levy article to end of file byte-identical to HEAD',
  o.slice(ei(o)) === c.slice(ei(c)), `${o.length - ei(o)} bytes`);
const tocBlock = (h) => h.slice(h.indexOf('<!-- LAWS-TOC:BEGIN'), h.indexOf('<!-- LAWS-TOC:END -->'));
ok('ToC block byte-identical', tocBlock(o) === tocBlock(c) && tocBlock(o).length > 1000, `${tocBlock(o).length} bytes`);
const metas = (h) => h.match(/<div class="law-meta-grid">[\s\S]*?\n  <\/div>/g) || [];
ok('every law-meta-grid (meta rows) byte-identical', eq(metas(o), metas(c)) && metas(o).length > 0, `${metas(o).length} meta grids`);

// 1. Tag + attribute sequence, headings, script/style/JSON-LD blocks, head
const blockRe = /<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi;
const tags = (h) => h.replace(blockRe, '<$1/>').match(/<[^>]+>/g);
const heads = (h) => h.match(/<h[1-6]\b[^>]*>[\s\S]*?<\/h[1-6]>/gi) || [];
const blocks = (h) => h.match(blockRe) || [];
const ld = (h) => h.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g) || [];
ok('tag+attribute sequence identical', eq(tags(o), tags(c)), `${tags(o).length} tags`);
ok('heading sequence identical (h1-h6, text included)', eq(heads(o), heads(c)), `${heads(o).length} headings`);
const bo = blocks(o), bc = blocks(c);
ok('script/style blocks byte-identical', bo.length === bc.length && bo.every((b, i) => b === bc[i]), `${bo.length} blocks`);
ok('JSON-LD blocks byte-identical', eq(ld(o), ld(c)), `${ld(o).length} JSON-LD blocks`);
ok('head byte-identical', o.split('</head>')[0] === c.split('</head>')[0]);
const labelText = (h) => [...h.matchAll(/<(button|span|div)\b[^>]*class="[^"]*(?:law-chip|status-badge|label|value|toc-|code-preamble-label|pillar-label|law-number|text-xs uppercase)[^"]*"[^>]*>[\s\S]*?<\/\1>/g)].map((m) => m[0]);
ok('button/badge/label/chip text identical', eq(labelText(o), labelText(c)), `${labelText(o).length} elements`);

// 2. Ledger markers
const norm = (s) => s.replace(/<!--[\s\S]*?-->/g, ' ').replace(blockRe, ' ').replace(/<[^>]+>/g, '')
  .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').replace(/&rsquo;|&lsquo;|’|‘/g, "'")
  .replace(/&ldquo;|&rdquo;|“|”/g, '"').replace(/&sect;/g, '§').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ')
  .replace(/&middot;/g, '·').replace(/\s+/g, ' ');
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

// 3. Fidelity: the words themselves. Every edit is punctuation-only, so the word-token
//    sequence of the whole page must be identical, and each changed line must match
//    its original once dashes, parentheses, commas and whitespace are removed.
const tokens = (h) => norm(h).match(/[A-Za-z0-9$%§.\/+-]*[A-Za-z0-9]/g) || [];
ok('word-token sequence of the whole page identical (no word added, dropped, swapped or moved)', eq(tokens(o), tokens(c)), `${tokens(o).length} tokens`);
const range = (h) => h.slice(si(h), ei(h));
const text = (h) => norm(range(h));
const ms = (arr) => [...arr].sort();
const nums = (h) => ms(text(h).match(/\d[\d,.:–\/]*%?/g) || []);
ok('number/rate/year/threshold multiset identical (range)', eq(nums(o), nums(c)), `${nums(o).length} numeric tokens`);
const cites = (h) => ms(text(h).match(/§§?\s?[\d.–]+|\bLP-\d+(?:\.\d+)?|\bArticles? [IVXL]+(?:\.[IVXL]+)?(?:[–/][IVXL.]+)?|\bR\d\d\b|\bTier (?:[0-4]|I{1,3})\b|\bSchedule [AB]\b|\b[AB]\d\b/g) || []);
ok('citation multiset identical (§, LP-, Article, R-ruling, Tier, Schedule)', eq(cites(o), cites(c)), `${cites(o).length} citations`);
const quotes = (h) => ms(text(h).match(/"[^"]{1,300}"/g) || []);
ok('quoted-text multiset identical', eq(quotes(o), quotes(c)), `${quotes(o).length} quoted strings`);
const links = (h) => h.match(/href="[^"]*"/g) || [];
ok('href sequence identical (whole page)', eq(links(o), links(c)), `${links(o).length} hrefs`);
const HEDGES = ['shall', 'must', 'may', 'may not', 'only', 'unless', 'except', 'tends to', 'generally', 'approximately',
  'cannot', 'never', 'not', 'no', 'without', 'any', 'regardless', 'always', 'solely', 'sole', 'exactly', 'directly',
  'explicitly', 'deliberately', 'strictly', 'narrow', 'narrowly', 'unconditionally', 'mandatory', 'advisorily', 'still'];
const cnt = (h, w) => (text(h).match(new RegExp(`\\b${w}\\b`, 'gi')) || []).length;
const hedgeDelta = Object.fromEntries(HEDGES.map((w) => [w, cnt(c, w) - cnt(o, w)]).filter(([, d]) => d !== 0));
ok('hedge, modal and negation counts identical (range)', Object.keys(hedgeDelta).length === 0,
  Object.entries(hedgeDelta).map(([w, d]) => `${w} ${d}`).join(', ') || HEDGES.map((w) => `${w}=${cnt(c, w)}`).join(' '));
const TERMS = ['Meritboard', 'Supreme Court', 'elective residen', 'voluntary permanent residen', 'reassignment', 'punitive reassignment',
  'Sanctuary', 'Main Layer', 'Enabling Consolidation Amendment', 'Founding Treaty', 'Founding Corpus', 'Law Polling record',
  'Ratification Record', 'Path 2 Charter', 'Charter of VMSS', 'secondary authority', 'primary authority', 'Continuity Integrity Act',
  'Metric Gated Domain Act', 'Social Trust Measurement Standard', 'secondary observation envelope', 'civic floor', 'civic-floor',
  'federal-administration sub-ranking', 'Colosseum', 'gate-contract', 'economic-coercion', 'violence-equivalent', 'three-axis',
  'personhood doctrine', 'substrate', 'continuity infrastructure', 'curve-exempt', 'escalation curve', 'territorial', 'status-based',
  'revival-identity', 'currency wall', 'floor content', 'dual-key', 'Pillar Federal Law', 'Savings Circulation Mandate',
  'Automation Dividend Treasury', 'Primary Job Subsidy', 'UBI', 'STI', 'MGD', 'AGI', 'ASI', 'implant', 'ledger', 'duress',
  'refusal directive', 'revival-refusal directive', 'one-bit flag', 'Article XI gauntlet', 'gauntlet', 'exact cascade', 'founding core'];
const tc = (h, t) => text(h).split(t).length - 1;
const delta = Object.fromEntries(TERMS.map((t) => [t, tc(c, t) - tc(o, t)]).filter(([, d]) => d !== 0));
ok('defined-term counts identical (no term swapped)', Object.keys(delta).length === 0,
  Object.entries(delta).map(([t, d]) => `${t} ${d}`).join(', ') || `${TERMS.length} terms checked`);

// 4. Scope of edits
const ol = o.split('\n'), cl = c.split('\n');
const changed = ol.map((l, i) => (l !== cl[i] ? i + 1 : 0)).filter(Boolean);
const EXPECTED_LINES = [323, 327, 614, 727, 792, 860, 861, 1192, 1263, 1298, 1351, 1383, 1433, 1468, 1501];
ok('changed lines are exactly the 15 ledgered elements', ol.length === cl.length && eq(changed, EXPECTED_LINES), `changed: ${changed.join(',')}`);
ok('every changed line is a single <p> element',
  changed.every((n) => /^\s*<p[ >]/.test(ol[n - 1]) && /<\/p>\s*$/.test(ol[n - 1]) && (ol[n - 1].match(/<p[ >]/g) || []).length === 1));
const strip = (s) => s.replace(/&mdash;|—|[(),]|\s/g, '');
ok('each changed line differs from the original only in dashes, parentheses and commas',
  changed.every((n) => strip(ol[n - 1]) === strip(cl[n - 1])));
const dash = (s) => (s.match(/—|&mdash;/g) || []).length;
const dashDrop = changed.reduce((a, n) => a + dash(ol[n - 1]) - dash(cl[n - 1]), 0);
ok('em-dashes removed: exactly the 16 ledgered pairs (32 dashes); none added on any line', dashDrop === 32 && changed.every((n) => dash(cl[n - 1]) < dash(ol[n - 1])),
  changed.map((n) => `L${n}:${dash(ol[n - 1])}->${dash(cl[n - 1])}`).join(' '));
const paren = (h) => (h.match(/\(/g) || []).length - (h.match(/\)/g) || []).length;
ok('parentheses balanced on every changed line', changed.every((n) => paren(cl[n - 1]) === 0));
const tw = ['sticky', 'hidden', 'block', 'flex', 'grid', 'absolute', 'fixed'];
const twc = (h, w) => (norm(h).match(new RegExp(`\\b${w}\\b`, 'gi')) || []).length;
ok('no bare Tailwind token added', tw.every((w) => twc(c, w) <= twc(o, w)));
const multiDash = (h) => text(h).split(/(?<=[.!?])\s+/).filter((s) => (s.match(/—/g) || []).length >= 2).length;

// 5. check-canon / mutation-suite strings. Every string literal in both tools that occurs in
//    laws.html must occur the same number of times in the copy, and the regex guards that
//    read laws.html must give the same answer on the copy as on the original.
const lits = ['tools/check-canon.mjs', 'tools/test-canon-guard-mutations.mjs'].flatMap((f) =>
  [...fs.readFileSync(root + f, 'utf8').matchAll(/'((?:[^'\\\n]|\\.){6,})'|"((?:[^"\\\n]|\\.){6,})"|`([^`$\n]{6,})`/g)].map((m) => m[1] || m[2] || m[3]));
const inLaws = [...new Set(lits)].filter((s) => o.includes(s));
const lcount = (h, s) => h.split(s).length - 1;
const litDrift = inLaws.filter((s) => lcount(o, s) !== lcount(c, s));
ok('every check-canon / mutation-suite literal found in laws.html survives at the same count', litDrift.length === 0,
  `${inLaws.length} literals matched` + (litDrift.length ? ' DRIFT: ' + litDrift.join(' | ') : ''));
const guardText = (src) => src.replace(/<!--[\s\S]*?-->/g, ' ').replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style\b[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&(?:nbsp|thinsp);/gi, ' ')
  .replace(/&(?:rarr|rightarrow);/gi, '→').replace(/&mdash;/gi, '—').replace(/&ndash;/gi, '–').replace(/\s+/g, ' ').trim();
const go = guardText(o), gc = guardText(c);
ok('conflicts clause pin intact', gc.includes('If this consolidation and the enacted instrument diverge, the enacted instrument — as recorded in its Law Polling register entry and any published instrument page — controls.'));
ok('LP-074/073/075 authority assertions intact', [/LP-074 is the substantive rate law/i, /LP-073.{0,80}fully superseded as operative law/i, /LP-075 remains procedural only/i].every((re) => re.test(gc)));
const exactCascade = /(?:\b50\s*%?\s*\/\s*25\s*%?\s*\/\s*12\.5\s*%?\s*\/\s*6\.25\s*%?\b|\b50%[^.!?]{0,240}\b25%[^.!?]{0,240}\b12\.5%[^.!?]{0,240}\b6\.25%)/;
const forbiddenCurrent = /(?:LP-073[^.!?]{0,120}(?:remains|is|still)\s+(?:current|active|operative)|(?:current|active|operative|since 2295|from 2295)[^.!?]{0,100}(?:70\s*%?\s*\/\s*35\s*%?\s*\/\s*17\s*%?\s*\/\s*8\s*%?|\b35%|\b17%|\b8%)|2294[^.!?]{0,120}(?:Finding III[^.!?]{0,50}(?:fail|did not pass)|Schedule [AB]\b[^.!?]{0,50}(?:refus|reject|not certified|not reached))|three findings passed[^.!?]{0,50}(?:one did not|one failed)|both refusals|chain with three links|executed (?:that logic|the logic) once already)/i;
const TIER = /\b(?:tax(?:ation|es)?|tax code|rate schedule|top marginal rates?|the (?:rate )?cascade)\b[^.!?]{0,60}\b(?:is|are|sits? at|remains?)\b[^.!?]{0,40}\b(?:charter-level|charter level|constitutional(?:ly)?|charter-tier)\b/i;
const supersededOutcome = /(?:Finding III[^.!?]{0,100}(?:fail(?:ed|ure)?|did not pass)|Schedule A\b[^.!?]{0,100}(?:refus(?:ed|al)|reject(?:ed|ion)|not certified)|Schedule B\b[^.!?]{0,100}(?:not reached|refus(?:ed|al)|reject(?:ed|ion)|not certified)|2294[^.!?]{0,120}(?:three findings passed|one finding failed|both refusals)|lawful (?:nonactivation|failure)|both refusals|chain with three links)/i;
ok('exact cascade present; stale-rate, tier-claim and refusal-outcome guards unchanged',
  exactCascade.test(gc) && !forbiddenCurrent.test(gc) && TIER.test(gc) === TIER.test(go) && supersededOutcome.test(gc) === supersededOutcome.test(go));
const RELOCATED = { 'code-lp-076': ['overtime rate of $125 per hour', '$62.50/hr in -1', '$31.25/hr in -2', '$15.63/hr in -3', 'owes $1,250 in overtime'],
  'code-fc-central-banking-authority': ['90-99% forfeiture that prevents arbitrage', '90% to treasury, 10% retained', '93% to treasury, 7% retained',
    '96% to treasury, 4% retained', '98% to treasury, 2% retained', '99% to treasury, 1% retained', '10% retained on the first $1M, scaling down to 1% above $1B',
    'within 24 months prior to a punitive reassignment', 'within 24 months prior to filing'],
  'code-lp-070': ['reaches $100 billion', 'population-average of $100,000', 'garnishing rate is 10% of each citizen',
    'holding $100,000 at the opening of a monthly cycle owes 10% on that amount', '90-day rolling average of total district savings',
    'reaches $50 billion, a garnishing cycle activates at 5%', 'a citizen holding $100,000 loses $10,000/month', 'a citizen holding $50,000 loses $2,500/month'],
  'code-lp-069': ['$25 billion aggregate UBI-origin savings in -2', '$10 billion aggregate UBI-origin savings in -3', '24-month rolling window of UBI and subsidy receipts',
    '24-month cumulative UBI receipts', '$10 billion district aggregate trigger and 5% monthly rate'],
  'code-lp-064': ['escalation compounds at 50% per child beyond the threshold', 'baseline aggregate effective rate is 40%', 'raises it to 60%', 'raises it to 90%',
    'raises it to 135%', 'under 60–90% escalation to survive long at 135%'] };
const entries = (h) => new Map([...h.matchAll(/<article class="code-entry[^"]*" id="([\w.-]+)"[\s\S]*?<\/article>/g)].map((m) => [m[1], guardText(m[0]).replace(/[‐-―−]/g, '-')]));
const eo = entries(o), ec = entries(c);
const fold = (s) => s.replace(/[‐-―−]/g, '-');
const relocMiss = Object.entries(RELOCATED).flatMap(([id, alts]) => alts.filter((a) => (ec.get(id) || '').split(fold(a)).length !== (eo.get(id) || '').split(fold(a)).length || !(ec.get(id) || '').includes(fold(a))).map((a) => `${id}: ${a}`));
ok('consolidation-fidelity magnitudes present in their receiving entries at unchanged counts', relocMiss.length === 0, relocMiss.join(' | ') || '33 phrasings');
ok('advisory flag count unchanged', lcount(o, 'advisory, not institutionally enforced') === lcount(c, 'advisory, not institutionally enforced'));
ok('no founder ruling/override or reviewer-seat name introduced',
  !/founder(?:'|’)?s? (?:ruling|override)/i.test(norm(c)) && (norm(c).match(/\b(Sol|Opus|Fable|GPT|Claude)\b/g) || []).length === (norm(o).match(/\b(Sol|Opus|Fable|GPT|Claude)\b/g) || []).length);
ok('no stale "five currencies"', !/\bfive (siloed )?currenc/i.test(c.replace(/<!--[\s\S]*?-->/g, '')));
const ids = (h) => [...h.replace(/<!--[\s\S]*?-->/g, '').matchAll(/ id="([^"]+)"/g)].map((m) => m[1]);
ok('id sequence identical, no duplicates', eq(ids(o), ids(c)) && new Set(ids(c)).size === ids(c).length, `${ids(c).length} ids`);

// Informational
const spaced = (h) => norm(h.replace(/<[^>]+>/g, ' ')).replace(/[—–]/g, ' ');
const bodyWords = (h) => words(spaced(h.slice(h.indexOf('<body'), h.indexOf('</body>'))));
const rangeWords = (h) => words(spaced(range(h)));
const lineWords = (n) => `L${n} ${words(spaced(ol[n - 1]))}->${words(spaced(cl[n - 1]))}`;
console.log(`INFO  element words: ${changed.map(lineWords).join(', ')}`);
console.log(`INFO  words: page ${bodyWords(o)} -> ${bodyWords(c)}; range ${rangeWords(o)} -> ${rangeWords(c)}`);
console.log(`INFO  sentences in range with 2+ em-dashes: ${multiDash(o)} -> ${multiDash(c)}`);
console.log(`INFO  ledger markers: ${befores.length} before, ${afters.length} after, ${claims.length} claim quotes`);

let pass = true;
for (const [p, n, d] of res) { if (!p) pass = false; console.log(`${p ? 'PASS' : 'FAIL'}  ${n}${d ? '  [' + d + ']' : ''}`); }
console.log(pass ? 'ALL PASS' : 'FAIL');
process.exit(pass ? 0 : 1);
