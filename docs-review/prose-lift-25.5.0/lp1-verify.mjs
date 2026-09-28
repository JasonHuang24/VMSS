import fs from 'node:fs';
import { execSync } from 'node:child_process';
const root = 'F:/Programming/VMSS/VMSS Website/';
const dir = root + 'docs-review/prose-lift-25.5.0/';
// The original is the committed page, read straight from git.
const o = execSync('git show HEAD:law-polling.html', { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const live = fs.readFileSync(root + 'law-polling.html', 'utf8');
const c = fs.readFileSync(dir + 'law-polling.html', 'utf8');
const ledger = fs.readFileSync(dir + 'lp1-ledger.md', 'utf8');
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const res = [];
const ok = (name, pass, detail = '') => res.push([pass, name, detail]);

ok('live law-polling.html untouched (equals HEAD)', live === o);

// 0. Patch range: main content start up to (not including) the element carrying id="lp-049".
const S = '<main id="main-content"', E = '<article class="law-entry" id="lp-049">';
const si = (h) => h.indexOf(S), ei = (h) => h.indexOf(E);
ok('range markers found once each', [o, c].every((h) => si(h) > 0 && ei(h) > si(h) && h.split(S).length === 2 && h.split(E).length === 2));
ok('RANGE CHECK: everything before <main> byte-identical to HEAD', o.slice(0, si(o)) === c.slice(0, si(c)), `${si(o)} bytes`);
ok('RANGE CHECK: from the id="lp-049" opening tag to end of file byte-identical to HEAD (git show HEAD:law-polling.html)',
  ei(o) === ei(c) - (c.length - o.length) && o.slice(ei(o)) === c.slice(ei(c)), `${o.length - ei(o)} bytes`);
const tocBlock = (h) => h.slice(h.indexOf('<!-- LAW-TOC:BEGIN'), h.indexOf('<!-- LAW-TOC:END -->'));
ok('generated ToC block byte-identical', tocBlock(o) === tocBlock(c) && tocBlock(o).length > 1000, `${tocBlock(o).length} bytes`);
const all = (h, re) => h.match(re) || [];
const metas = (h) => all(h, /<div class="law-meta-grid">[\s\S]*?\n  <\/div>/g);
ok('every law-meta-grid (scope, filed, dates, drafter, threshold, anchor) byte-identical', eq(metas(o), metas(c)) && metas(o).length > 0, `${metas(o).length} meta grids`);
const tables = (h) => all(h, /<table class="vote-table">[\s\S]*?<\/table>/g);
ok('every vote table (tallies, outcomes) byte-identical', eq(tables(o), tables(c)) && tables(o).length > 0, `${tables(o).length} vote tables`);
const headers = (h) => all(h, /<div class="law-header">[\s\S]*?\n  <\/div>/g);
ok('every law-header (LP number, entry title, status badge) byte-identical', eq(headers(o), headers(c)) && headers(o).length > 0, `${headers(o).length} headers`);
ok('pillar markers byte-identical', eq(all(o, /<p class="pillar-label">[^<]*<\/p>/g), all(c, /<p class="pillar-label">[^<]*<\/p>/g)), `${all(o, /class="pillar-label"/g).length} pillar labels`);

// 1. Tag + attribute sequence, headings, script/style/JSON-LD blocks, head
const blockRe = /<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi;
const tags = (h) => h.replace(blockRe, '<$1/>').match(/<[^>]+>/g);
const heads = (h) => all(h, /<h[1-6]\b[^>]*>[\s\S]*?<\/h[1-6]>/gi);
const blocks = (h) => all(h, blockRe);
const ld = (h) => all(h, /<script type="application\/ld\+json">[\s\S]*?<\/script>/g);
ok('tag+attribute sequence identical', eq(tags(o), tags(c)), `${tags(o).length} tags`);
ok('heading sequence identical (h1-h6, text included)', eq(heads(o), heads(c)), `${heads(o).length} headings`);
const bo = blocks(o), bc = blocks(c);
ok('script/style blocks byte-identical', bo.length === bc.length && bo.every((b, i) => b === bc[i]), `${bo.length} blocks`);
ok('JSON-LD blocks byte-identical', eq(ld(o), ld(c)), `${ld(o).length} JSON-LD blocks (the page carries none)`);
ok('head byte-identical', o.split('</head>')[0] === c.split('</head>')[0]);
const labelText = (h) => all(h, /<(button|span|div|p|th|h4|caption)\b[^>]*class="[^"]*(?:law-chip|status-badge|label|value|toc-|pillar-label|law-number|law-filter-count|text-xs uppercase|text-2xl font-bold)[^"]*"[^>]*>[\s\S]*?<\/\1>/g)
  .concat(all(h, /<th\b[^>]*>[\s\S]*?<\/th>/g), all(h, /<h4>[\s\S]*?<\/h4>/g), all(h, /<caption\b[\s\S]*?<\/caption>/g), all(h, /<p class="text-xs text-\[var\(--text-muted\)\]">[^<]*<\/p>/g));
ok('nav/button/label/badge/chip/th/h4/caption/count text identical', eq(labelText(o), labelText(c)), `${labelText(o).length} elements`);

// 2. Ledger markers
const norm = (s) => s.replace(/<!--[\s\S]*?-->/g, ' ').replace(blockRe, ' ').replace(/<[^>]+>/g, '')
  .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').replace(/&rsquo;|&lsquo;|’|‘/g, "'")
  .replace(/&ldquo;|&rdquo;|“|”/g, '"').replace(/&sect;/g, '§').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ')
  .replace(/&middot;/g, '·').replace(/&rarr;/g, '→').replace(/\s+/g, ' ');
const cText = norm(c);
const marks = (re) => [...ledger.matchAll(re)].map((m) => m[1]);
const claims = marks(/«([^»]+)»/g), afters = marks(/⟪([^⟫]+)⟫/g), befores = marks(/⟦([^⟧]+)⟧/g);
const words = (s) => s.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
const missC = claims.filter((q) => !cText.includes(norm(q)));
const longC = claims.filter((q) => words(norm(q)) > 15);
ok('every «» ledger quote appears in the copy', missC.length === 0 && claims.length > 0, `${claims.length - missC.length}/${claims.length}` + (missC.length ? ' MISSING: ' + missC.join(' | ') : ''));
ok('every «» ledger quote is 15 words or fewer', longC.length === 0, longC.join(' | '));
const missA = afters.filter((q) => !c.includes(q));
ok('every ⟪after⟫ text appears in the copy', missA.length === 0, `${afters.length - missA.length}/${afters.length}` + (missA.length ? ' MISSING: ' + missA.join(' | ') : ''));
const badB = befores.filter((q) => !o.includes(q) || c.includes(q));
ok('every ⟦before⟧ text is in the original and gone from the copy', badB.length === 0, `${befores.length - badB.length}/${befores.length}` + (badB.length ? ' BAD: ' + badB.join(' | ') : ''));

// 3. Fidelity. 21 elements are punctuation-only; 2 elements each lose one aphorism
//    closer. So HEAD minus exactly those two sentences must have the copy's word-token
//    sequence, and every other changed line must match its original once dashes,
//    parentheses, commas and whitespace are removed.
const DELETED = [
  [643, 'A child-shaped hole in a hardware-absolute boundary is a hole. '],
  [1673, ' Consensus kept its character; deliberation gained its clock.'],
];
let oMinus = o;
for (const [, s] of DELETED) oMinus = oMinus.split(s).length === 2 ? oMinus.replace(s, '') : 'DELETION NOT UNIQUE';
const tokens = (h) => norm(h).match(/[A-Za-z0-9$%§.\/+-]*[A-Za-z0-9]/g) || [];
ok('word-token sequence of the whole page = HEAD minus the two ledgered closers (no other word added, dropped, swapped or moved)', eq(tokens(oMinus), tokens(c)),
  `${tokens(o).length} -> ${tokens(c).length} tokens`);
const range = (h) => h.slice(si(h), ei(h));
const text = (h) => norm(range(h));
const ms = (arr) => [...arr].sort();
const nums = (h) => ms(text(h).match(/\d[\d,.:–\/]*%?/g) || []);
ok('number/rate/tally/year/threshold multiset identical (range)', eq(nums(o), nums(c)), `${nums(o).length} numeric tokens`);
const cites = (h) => ms(text(h).match(/§§?\s?[\d.–]+|\bLP-\d+(?:\.\d+)?|\bArticles? [IVXL]+(?:\.[IVXL]+)?|\bR\d\d?\b|\bResources? R?\d+\b/g) || []);
ok('citation multiset identical (§, LP-, Article, R-, Resource)', eq(cites(o), cites(c)), `${cites(o).length} citations`);
const quotes = (h) => ms(text(h).match(/"[^"]{1,600}"/g) || []);
ok('quoted-text multiset identical (every “…” run, incl. Court and Meritboard quotations)', eq(quotes(o), quotes(c)), `${quotes(o).length} quoted strings`);
const ems = (h) => all(range(h), /<em>[\s\S]*?<\/em>/g);
ok('<em> runs identical and in order (quoted opinions, defined labels)', eq(ems(o), ems(c)), `${ems(o).length} em runs`);
const links = (h) => all(h, /href="[^"]*"/g);
ok('href sequence identical (whole page)', eq(links(o), links(c)), `${links(o).length} hrefs`);
const HEDGES = ['shall', 'must', 'may', 'may not', 'could', 'would', 'only', 'unless', 'except', 'tends to', 'generally', 'approximately',
  'cannot', 'never', 'not', 'no', 'without', 'any', 'regardless', 'always', 'solely', 'exactly', 'directly', 'explicitly',
  'strictly', 'narrow', 'narrowly', 'however', 'still', 'likely', 'plausible', 'partially', 'effectively', 'rather than'];
const cnt = (h, w) => (text(h).match(new RegExp(`\\b${w}\\b`, 'gi')) || []).length;
const hedgeDelta = Object.fromEntries(HEDGES.map((w) => [w, cnt(c, w) - cnt(o, w)]).filter(([, d]) => d !== 0));
ok('hedge, modal and negation counts identical (range)', Object.keys(hedgeDelta).length === 0,
  Object.entries(hedgeDelta).map(([w, d]) => `${w} ${d}`).join(', ') || `${HEDGES.length} forms checked`);
const TERMS = ['Meritboard', 'Supreme Court', 'Sanctuary', 'Main Layer', 'consensus', 'supermajority', 'filibuster floor', 'federal floor',
  'deliberation window', 'standing dissent', 'refined-child', 'failed-parent', 'dual-key', 'Dual-key', 'coherence review', 'founding core',
  'reassignment', 'punitive reassignment', 'terminal severance', 'relocation right', 'hardware-absolute', 'autoparenting', 'backup vessel',
  'vessel-link suspension', 'compromised-consent', 'consent architecture', 'layer-graduated proportionality', 'strict proportionality',
  'temporal scope', 'temporal hedge', 'per-incident', 'Network Attribution', 'implant ledger', 'lethal-impunity', 'vigilante',
  'defense-of-others', 'incapacitated-victim', 'reasonable-perception', 'three-axis', 'status-based', 'substrate', 'functional-equivalence',
  'secondary-authority', 'Founding Treaty', 'Founding-corpus', 'VMSS Laws', 'enacted instrument', 'Enabling Consolidation Amendment',
  'Overtime Premium Protocol', 'Central Banking Authority', 'gravity-set', 'set point', 'amendment point', 'lower-layer aggregate',
  'Lower-layer aggregate', 'Pillar', 'Recovery Gradient', 'constitutional-honesty', 'moral causality', 'clean-record', 'captive-revival',
  'continuity-first', 'instrumentation-contingent', 'autonomy-protective', 'continuity-foundational', 'civic floor', 'elective'];
const tc = (h, t) => text(h).split(t).length - 1;
const termRange = (h) => norm(range(h));
const tcm = (h, t) => termRange(h).split(t).length - 1;
const EXPECTED_TERM_DELTA = { 'hardware-absolute': -1, consensus: 0 };
const delta = Object.fromEntries(TERMS.map((t) => [t, tcm(c, t) - tcm(o, t)]).filter(([, d]) => d !== 0));
const unexplained = Object.entries(delta).filter(([t, d]) => (EXPECTED_TERM_DELTA[t] ?? 0) !== d);
ok('defined-term counts identical except the ledgered closer deletions (no term swapped)', unexplained.length === 0,
  (Object.entries(delta).map(([t, d]) => `${t} ${d}`).join(', ') || 'no delta') + ` across ${TERMS.length} terms`);
ok('the deleted closers carry no number, citation, quotation, hedge or modal',
  DELETED.every(([, s]) => !/\d|LP-|Article|§|&ldquo;|\b(shall|must|may|only|not|no|unless|except)\b/i.test(s)));

// 4. Scope of edits
const ol = o.split('\n'), cl = c.split('\n');
const changed = ol.map((l, i) => (l !== cl[i] ? i + 1 : 0)).filter(Boolean);
const EXPECTED = { 281: 2, 505: 2, 520: 2, 581: 4, 612: 4, 642: 2, 643: 0, 644: 6, 674: 2, 675: 2, 694: 2, 769: 4, 827: 2, 947: 2,
  1389: 2, 1594: 2, 1653: 2, 1673: 0, 1685: 2, 1715: 2, 1771: 2, 1783: 2, 1813: 2 };
const EXPECTED_LINES = Object.keys(EXPECTED).map(Number);
ok('changed lines are exactly the 23 ledgered elements (all inside the range)', ol.length === cl.length && eq(changed, EXPECTED_LINES), `changed: ${changed.join(',')}`);
const rangeEndLine = ol.findIndex((l) => l.includes(E)) + 1;
ok('every changed line sits before the lp-049 line', changed.every((n) => n < rangeEndLine), `lp-049 at line ${rangeEndLine}`);
ok('every changed line is a single <p> element',
  changed.every((n) => /^\s*<p[ >]/.test(ol[n - 1]) && /<\/p>\s*$/.test(ol[n - 1]) && (ol[n - 1].match(/<p[ >]/g) || []).length === 1));
const strip = (s) => s.replace(/&mdash;|—|[(),]|\s/g, '');
const delLine = Object.fromEntries(DELETED);
ok('21 changed lines differ from the original only in dashes, parentheses and commas',
  changed.filter((n) => !delLine[n]).every((n) => strip(ol[n - 1]) === strip(cl[n - 1])));
ok('the 2 deletion lines equal the original with exactly the ledgered sentence removed',
  DELETED.every(([n, s]) => ol[n - 1].replace(s, '') === cl[n - 1] && ol[n - 1].includes(s)));
const dash = (s) => (s.match(/—|&mdash;/g) || []).length;
const dashDrop = changed.reduce((a, n) => a + dash(ol[n - 1]) - dash(cl[n - 1]), 0);
ok('em-dashes removed: exactly the 26 ledgered pairs (52 dashes), per line as ledgered; none added',
  dashDrop === 52 && changed.every((n) => dash(ol[n - 1]) - dash(cl[n - 1]) === EXPECTED[n]),
  changed.map((n) => `L${n}:${dash(ol[n - 1])}->${dash(cl[n - 1])}`).join(' '));
const paren = (s) => (s.match(/\(/g) || []).length - (s.match(/\)/g) || []).length;
ok('parentheses balanced on every changed line', changed.every((n) => paren(cl[n - 1]) === 0));
const commas = (s) => (s.match(/,/g) || []).length;
const commaAdd = changed.reduce((a, n) => a + commas(cl[n - 1]) - commas(ol[n - 1]), 0);
ok('commas added only where a closing dash also ended a clause (6, lines 612/644/674/675/694/1653)', commaAdd === 6 &&
  changed.every((n) => commas(cl[n - 1]) - commas(ol[n - 1]) === ([612, 644, 674, 675, 694, 1653].includes(n) ? 1 : 0)));
const tw = ['sticky', 'hidden', 'block', 'flex', 'grid', 'absolute', 'fixed'];
const twc = (h, w) => (norm(h).match(new RegExp(`\\b${w}\\b`, 'gi')) || []).length;
ok('no bare Tailwind token added', tw.every((w) => twc(c, w) <= twc(o, w)));
// Held sentences: every range sentence with 2+ em-dashes left in the copy is byte-identical (as text) to one in HEAD.
const sentences = (h) => {
  const out = [];
  for (const el of all(range(h), /<(p|li|td|blockquote)\b[^>]*>[\s\S]*?<\/\1>/g)) {
    for (const s of norm(el).split(/(?<=[.!?]["]?)\s+(?=[A-Z(])/)) if ((s.match(/—/g) || []).length >= 2) out.push(s.trim());
  }
  return out;
};
const so = sentences(o), sc = sentences(c);
ok('held multi-dash sentences (operative or proposal text) survive unchanged; no new multi-dash sentence',
  sc.every((s) => so.includes(s)) && sc.length === 13, `range sentences with 2+ em-dashes: ${so.length} -> ${sc.length}`);

// 5. check-canon / mutation-suite strings, and the guards that read law-polling.html.
const lits = ['tools/check-canon.mjs', 'tools/test-canon-guard-mutations.mjs'].flatMap((f) =>
  [...fs.readFileSync(root + f, 'utf8').matchAll(/'((?:[^'\\\n]|\\.){6,})'|"((?:[^"\\\n]|\\.){6,})"|`([^`$\n]{6,})`/g)].map((m) => m[1] || m[2] || m[3]));
const inPage = [...new Set(lits)].filter((s) => o.includes(s));
const lcount = (h, s) => h.split(s).length - 1;
// A literal may only lose the occurrences that sat inside a ledgered cut sentence.
const inCut = (s) => DELETED.reduce((a, [, d]) => a + lcount(d, s), 0);
const litDrift = inPage.filter((s) => lcount(o, s) - lcount(c, s) !== inCut(s));
const cutHits = inPage.filter((s) => inCut(s) > 0).map((s) => `"${s}" ${lcount(o, s)}->${lcount(c, s)}`);
ok('every check-canon / mutation-suite literal found in law-polling.html survives at the same count, less only its occurrences inside a cut sentence', litDrift.length === 0,
  `${inPage.length} literals matched` + (cutHits.length ? `; inside a cut sentence: ${cutHits.join(', ')}` : '') + (litDrift.length ? ' DRIFT: ' + litDrift.join(' | ') : ''));
// 'boundary' is check-canon's KNOWN_SECTIONS key for simulations.html cards (line 52); no guard reads it from law-polling.html.
ok('no literal that a law-polling guard reads lost an occurrence', inPage.filter((s) => lcount(o, s) !== lcount(c, s)).every((s) => s === 'boundary'));
const strip2 = (s) => s.replace(/<!--[\s\S]*?-->/g, '');
const guardText = (src) => strip2(src).replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style\b[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&(?:nbsp|thinsp);/gi, ' ')
  .replace(/&(?:rarr|rightarrow);/gi, '→').replace(/&mdash;/gi, '—').replace(/&ndash;/gi, '–').replace(/\s+/g, ' ').trim();
const go = guardText(o), gc = guardText(c);
ok('law-polling authority assertions intact (LP-073 superseded; LP-075 procedural)',
  /LP-073 is fully superseded as operative rate law/i.test(gc) && /LP-075.{0,120}(?:compel(?:led|s|ling) (?:the )?(?:audit|commencement|process)|procedural)/i.test(gc));
const exactCascade = /(?:\b50\s*%?\s*\/\s*25\s*%?\s*\/\s*12\.5\s*%?\s*\/\s*6\.25\s*%?\b|\b50%[^.!?]{0,240}\b25%[^.!?]{0,240}\b12\.5%[^.!?]{0,240}\b6\.25%)/;
const forbiddenCurrent = /(?:LP-073[^.!?]{0,120}(?:remains|is|still)\s+(?:current|active|operative)|(?:current|active|operative|since 2295|from 2295)[^.!?]{0,100}(?:70\s*%?\s*\/\s*35\s*%?\s*\/\s*17\s*%?\s*\/\s*8\s*%?|\b35%|\b17%|\b8%)|2294[^.!?]{0,120}(?:Finding III[^.!?]{0,50}(?:fail|did not pass)|Schedule [AB]\b[^.!?]{0,50}(?:refus|reject|not certified|not reached))|three findings passed[^.!?]{0,50}(?:one did not|one failed)|both refusals|chain with three links|executed (?:that logic|the logic) once already)/i;
const supersededOutcome = /(?:Finding III[^.!?]{0,100}(?:fail(?:ed|ure)?|did not pass)|Schedule A\b[^.!?]{0,100}(?:refus(?:ed|al)|reject(?:ed|ion)|not certified)|Schedule B\b[^.!?]{0,100}(?:not reached|refus(?:ed|al)|reject(?:ed|ion)|not certified)|2294[^.!?]{0,120}(?:three findings passed|one finding failed|both refusals)|lawful (?:nonactivation|failure)|both refusals|chain with three links)/i;
ok('exact cascade present; stale-rate and refusal-outcome guards give the same answer as HEAD',
  exactCascade.test(gc) && !forbiddenCurrent.test(gc) && supersededOutcome.test(gc) === supersededOutcome.test(go));
ok('no stale "III.III now carries" claim', !strip2(c).includes('III.III now carries'));
const lp076 = (h) => h.split(/(?=<article class="law-entry)/).find((b) => b.includes('id="lp-076"')) || '';
ok('LP-076 dual-track record intact (title, lower-layer row, Presidential row, 0 no votes, no RATIFY-TAX-50)',
  lp076(c).includes('The Enabling Consolidation Amendment') && !/RATIFY-TAX-50/.test(lp076(c)) &&
  lcount(lp076(c), '<th scope="row">Lower-Layer Aggregate</th>') === 1 && lcount(lp076(c), '<th scope="row">Presidential Disposition</th>') === 1 && lcount(lp076(c), '0 no votes') === 1);
const census = (h) => [all(h, /<article class="law-entry/g).length, all(h, /class="status-badge status-[a-z]+"/g).length,
  all(h, /class="pillar-label"/g).length, all(h, /class="toc-link"/g).length, (h.match(/Showing all (\d+) entries/) || [])[1]];
ok('register census identical (entries, badges, pillars, ToC links, count line)', eq(census(o), census(c)), census(c).join(' / '));
const ids = (h) => [...strip2(h).matchAll(/ id="([^"]+)"/g)].map((m) => m[1]);
ok('id sequence identical, no duplicates', eq(ids(o), ids(c)) && new Set(ids(c)).size === ids(c).length, `${ids(c).length} ids`);
const idSet = new Set(ids(c));
const dead = [...new Set([...strip2(c).matchAll(/href="#([^"]+)"/g)].map((m) => m[1]))].filter((h) => !idSet.has(h));
ok('in-page anchors resolve', dead.length === 0, dead.join(', '));
ok('R16 house style: no apparatus added inside law-entry articles',
  !/class="ls-cite"|class="law-statute"|Citation key|class="[^"]*\bls-(?:h|p|list|quote|hr|code|table|ruling)\b/i.test(c.split(/(?=<article class="law-entry)/).slice(1).join('')));

// Informational
const spaced = (h) => norm(h.replace(/<[^>]+>/g, ' ')).replace(/[—–]/g, ' ');
const bodyWords = (h) => words(spaced(h.slice(h.indexOf('<body'), h.indexOf('</body>'))));
const rangeWords = (h) => words(spaced(range(h)));
const lineWords = (n) => `L${n} ${words(spaced(ol[n - 1]))}->${words(spaced(cl[n - 1]))}`;
console.log(`INFO  element words: ${changed.map(lineWords).join(', ')}`);
console.log(`INFO  words: page ${bodyWords(o)} -> ${bodyWords(c)}; range ${rangeWords(o)} -> ${rangeWords(c)}`);
console.log(`INFO  range sentences with 2+ em-dashes: ${so.length} -> ${sc.length}`);
console.log(`INFO  ledger markers: ${befores.length} before, ${afters.length} after, ${claims.length} claim quotes`);

let pass = true;
for (const [p, n, d] of res) { if (!p) pass = false; console.log(`${p ? 'PASS' : 'FAIL'}  ${n}${d ? '  [' + d + ']' : ''}`); }
console.log(pass ? 'ALL PASS' : 'FAIL');
process.exit(pass ? 0 : 1);
