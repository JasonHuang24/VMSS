import fs from 'node:fs';
import { execSync } from 'node:child_process';
const root = 'F:/Programming/VMSS/VMSS Website/';
const dir = root + 'docs-review/prose-lift-25.5.1/';
// The original is the committed page, read straight from git.
const o = execSync('git show HEAD:law-polling.html', { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const live = fs.readFileSync(root + 'law-polling.html', 'utf8');
const c = fs.readFileSync(dir + 'law-polling.html', 'utf8');
const ledger = fs.readFileSync(dir + 'lp2-ledger.md', 'utf8');
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const res = [];
const ok = (name, pass, detail = '') => res.push([pass, name, detail]);

ok('live law-polling.html untouched (equals HEAD)', live === o);

// 0. Patch range: from the opening tag of the element carrying id="lp-049" to the close of the last entry (LP-082).
const S = '<article class="law-entry" id="lp-049">';
const END = '</article>\n\n</div>\n</section>';
const si = (h) => h.indexOf(S);
const ei = (h) => h.indexOf(END) + '</article>'.length;
ok('range markers found once each', [o, c].every((h) => si(h) > 0 && h.split(S).length === 2 && h.split(END).length === 2 && ei(h) > si(h)));
ok('RANGE CHECK: everything before the id="lp-049" opening tag is byte-identical to HEAD (git show HEAD:law-polling.html)',
  si(o) === si(c) && o.slice(0, si(o)) === c.slice(0, si(c)), `${si(o)} bytes`);
ok('RANGE CHECK: everything after the last entry (footer links, page script) is byte-identical to HEAD',
  o.slice(ei(o)) === c.slice(ei(c)), `${o.length - ei(o)} bytes`);
const tocBlock = (h) => h.slice(h.indexOf('<!-- LAW-TOC:BEGIN'), h.indexOf('<!-- LAW-TOC:END -->'));
ok('generated ToC block byte-identical', tocBlock(o) === tocBlock(c) && tocBlock(o).length > 1000, `${tocBlock(o).length} bytes`);
const all = (h, re) => h.match(re) || [];
const metas = (h) => all(h, /<div class="law-meta-grid">[\s\S]*?\n  <\/div>/g);
ok('every law-meta-grid (scope, filed, dates, drafter, threshold, anchor, era, provenance) byte-identical', eq(metas(o), metas(c)) && metas(o).length > 0, `${metas(o).length} meta grids`);
const tables = (h) => all(h, /<table class="vote-table">[\s\S]*?<\/table>/g);
ok('every vote table (tallies, outcomes, saturation cells) byte-identical', eq(tables(o), tables(c)) && tables(o).length > 0, `${tables(o).length} vote tables`);
const headers = (h) => all(h, /<div class="law-header">[\s\S]*?\n  <\/div>/g);
ok('every law-header (LP number, entry title, status badge) byte-identical', eq(headers(o), headers(c)) && headers(o).length > 0, `${headers(o).length} headers`);
ok('pillar markers byte-identical', eq(all(o, /<p class="pillar-label">[^<]*<\/p>/g), all(c, /<p class="pillar-label">[^<]*<\/p>/g)), `${all(o, /class="pillar-label"/g).length} pillar labels`);
ok('strata labels and section sub-lines byte-identical', eq(all(o, /<p class="(?:strata-label|law-section-sub)">[\s\S]*?<\/p>/g), all(c, /<p class="(?:strata-label|law-section-sub)">[\s\S]*?<\/p>/g)));

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
  .concat(all(h, /<th\b[^>]*>[\s\S]*?<\/th>/g), all(h, /<td\b[^>]*>[\s\S]*?<\/td>/g), all(h, /<h4>[\s\S]*?<\/h4>/g), all(h, /<caption\b[\s\S]*?<\/caption>/g), all(h, /<p class="text-xs text-\[var\(--text-muted\)\]">[^<]*<\/p>/g));
ok('nav/button/label/badge/chip/th/td/h4/caption/count text identical', eq(labelText(o), labelText(c)), `${labelText(o).length} elements`);

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
ok('every ⟪after⟫ text appears in the copy', missA.length === 0 && afters.length > 0, `${afters.length - missA.length}/${afters.length}` + (missA.length ? ' MISSING: ' + missA.join(' | ') : ''));
const badB = befores.filter((q) => !o.includes(q) || c.includes(q));
ok('every ⟦before⟧ text is in the original and gone from the copy', badB.length === 0 && befores.length > 0, `${befores.length - badB.length}/${befores.length}` + (badB.length ? ' BAD: ' + badB.join(' | ') : ''));

// 3. Fidelity. 27 dash pairs become parentheses (one becomes a pair of commas); 3 elements each
//    lose one aphorism closer. So HEAD minus exactly those three closers must have the copy's
//    word-token sequence, and every changed line must match its original (less its closer)
//    once dashes, parentheses, commas and whitespace are removed.
const DELETED = [
  [1914, ' Displacement stayed continuous; transition stopped being lossy.'],
  [2041, ' The demand is real. The refusal is the design.'],
  [3246, ' Freedom keeps the switch; protection makes flipping it a mark carried in daylight.'],
];
let oMinus = o;
for (const [, s] of DELETED) oMinus = oMinus.split(s).length === 2 ? oMinus.replace(s, '') : 'DELETION NOT UNIQUE';
const tokens = (h) => norm(h).match(/[A-Za-z0-9$%§.\/+-]*[A-Za-z0-9]/g) || [];
ok('word-token sequence of the whole page = HEAD minus the three ledgered closers (no other word added, dropped, swapped or moved)', eq(tokens(oMinus), tokens(c)),
  `${tokens(o).length} -> ${tokens(c).length} tokens`);
const range = (h) => h.slice(si(h), ei(h));
const text = (h) => norm(range(h));
const ms = (arr) => [...arr].sort();
const nums = (h) => ms(text(h).match(/\d[\d,.:–\/]*%?/g) || []);
ok('number/rate/tally/year/threshold multiset identical (range)', eq(nums(o), nums(c)), `${nums(o).length} numeric tokens`);
const numWords = /\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|sixty|hundred|thousand|million|billion|first|second|third|fourth|fifth|sixth|half|four-fifths|decade|decades|century)\b/gi;
const nw = (h) => ms((text(h).match(numWords) || []).map((w) => w.toLowerCase()));
ok('spelled-out number multiset identical (range)', eq(nw(o), nw(c)), `${nw(o).length} number words`);
const cites = (h) => ms(text(h).match(/§§?\s?[\d.–]+|\bLP-\d+(?:\.\d+)?|\bArticles? [IVXL]+(?:\.[IVXL]+)?|\bR\d\d?\b|\bResources? R?\d+\b/g) || []);
ok('citation multiset identical (§, LP-, Article, R-, Resource)', eq(cites(o), cites(c)), `${cites(o).length} citations`);
const quotes = (h) => ms(text(h).match(/"[^"]{1,600}"/g) || []);
ok('quoted-text multiset identical (every “…” run, incl. Court, Meritboard and coalition quotations)', eq(quotes(o), quotes(c)), `${quotes(o).length} quoted strings`);
const ems = (h) => all(range(h), /<em>[\s\S]*?<\/em>/g);
ok('<em> runs identical and in order (quoted opinions, defined labels)', eq(ems(o), ems(c)), `${ems(o).length} em runs`);
const strongs = (h) => all(range(h), /<strong>[\s\S]*?<\/strong>/g);
ok('<strong> runs identical and in order (provision labels, bloc names)', eq(strongs(o), strongs(c)), `${strongs(o).length} strong runs`);
const links = (h) => all(h, /href="[^"]*"/g);
ok('href sequence identical (whole page)', eq(links(o), links(c)), `${links(o).length} hrefs`);
const HEDGES = ['shall', 'must', 'may', 'may not', 'could', 'would', 'should', 'can', 'cannot', 'only', 'unless', 'except', 'tends to', 'generally',
  'approximately', 'never', 'not', 'no', 'without', 'any', 'regardless', 'always', 'solely', 'exactly', 'directly', 'explicitly',
  'strictly', 'narrow', 'narrowly', 'however', 'still', 'likely', 'plausible', 'partially', 'effectively', 'rather than', 'almost', 'nearly',
  'most', 'every', 'all', 'none', 'just', 'precisely', 'deliberately', 'already'];
const cnt = (h, w) => (text(h).match(new RegExp(`\\b${w}\\b`, 'gi')) || []).length;
const hedgeDelta = Object.fromEntries(HEDGES.map((w) => [w, cnt(c, w) - cnt(o, w)]).filter(([, d]) => d !== 0));
ok('hedge, modal and negation counts identical (range)', Object.keys(hedgeDelta).length === 0,
  Object.entries(hedgeDelta).map(([w, d]) => `${w} ${d}`).join(', ') || `${HEDGES.length} forms checked`);
const TERMS = ['Meritboard', 'Supreme Court', 'Sanctuary', 'Main Layer', 'consensus', 'supermajority', 'filibuster', 'federal floor',
  'lower-layer aggregate', 'Lower-layer aggregate', 'Lower-Layer Aggregate', 'refined-child', 'refined child', 'failed-parent', 'failed parent',
  'dual-key', 'Dual-key', 'dual key', 'coherence', 'founding core', 'reassignment', 'punitive reassignment', 'terminal severance',
  'relocation right', 'autoparenting', 'backup vessel', 'backup-vessel', 'continuity', 'Continuity-by-default', 'continuity-by-default',
  'Continuity Integrity Act', 'Substrate Personhood', 'Citizenship Admission Act', 'unsigned genesis claim', 'citizen-originator',
  'Clean-Record', 'clean-record', 'elective residency', 'elective resident', 'Status-Based vs. Territorial Jurisdiction', 'status-based',
  'territorial', 'Threshold Inhibition Protocol', 'TIP', 'opt-out-able', 'opt-in', 'non-disableable', 'soft-power', 'soft-coercion',
  'pressure-architecture', 'pressure architecture', 'implant', 'duress', 'refusal directive', 'novelty filter', 'Article XXI filter',
  'Savings Circulation Mandate', 'SCM', 'Primary Job Subsidy', 'UBI', 'Automation Dividend Treasury', 'Path 2', 'Trajectory Doctrine',
  'Lower Incidence Certificate', 'zero-fail', 'support saturation', 'advisory-only', 'advisory', 'Colosseum', 'Metric Gated Domain', 'MGD',
  'weight-state', 'AGI', 'handoff', 'displacement', 'phasing', 'STI', 'anti-gaming', 'bioengineered-companion', 'LP-041 disclosure',
  'federal-administration', 'cognition', 'firewall', 'visitation', 'layer-graduated', 'defensive authority', 'Sanctuary-ward',
  'post-intervention', 'pre-intervention', 'voluntary-district', 'cooperative', 'heirship', 'revival strand', 'living strands',
  'currency wall', 'escalation curve', 'curve', 'Pillar', 'pillar', 'non-pillar', 'Charter', 'gauntlet', 'register'];
const tcm = (h, t) => norm(range(h)).split(t).length - 1;
const EXPECTED_TERM_DELTA = {};
const delta = Object.fromEntries(TERMS.map((t) => [t, tcm(c, t) - tcm(o, t)]).filter(([, d]) => d !== 0));
const unexplained = Object.entries(delta).filter(([t, d]) => (EXPECTED_TERM_DELTA[t] ?? 0) !== d);
ok('defined-term counts identical (no term swapped, dropped or added)', unexplained.length === 0,
  (Object.entries(delta).map(([t, d]) => `${t} ${d}`).join(', ') || 'no delta') + ` across ${TERMS.length} terms`);
ok('the deleted closers carry no number, citation, quotation, hedge, negation or modal',
  DELETED.every(([, s]) => !/\d|LP-|Article|§|&ldquo;|\b(shall|must|may|can|could|would|only|not|no|never|unless|except|one|two|three|four)\b/i.test(s)));

// 4. Scope of edits
const ol = o.split('\n'), cl = c.split('\n');
const changed = ol.map((l, i) => (l !== cl[i] ? i + 1 : 0)).filter(Boolean);
// line: [em-dashes removed, commas added, parenthesis pairs added]
const EXPECTED = {
  1912: [2, 0, 1], 1914: [0, 0, 0], 1945: [2, 0, 1], 2041: [2, 0, 1], 2071: [2, 0, 1], 2167: [2, 1, 1], 2257: [2, 0, 1],
  2288: [2, 0, 1], 2443: [2, 0, 1], 2515: [2, 0, 1], 2536: [2, 1, 1], 2580: [2, 0, 1], 2600: [2, 1, 1], 2612: [2, 0, 1],
  2644: [4, 1, 2], 2679: [2, 1, 1], 3182: [2, 1, 1], 3211: [4, 3, 1], 3213: [2, 0, 1], 3214: [2, 1, 1], 3231: [2, 0, 1],
  3245: [2, 0, 1], 3246: [2, 1, 1], 3261: [2, 0, 1], 3275: [2, 0, 1], 3303: [2, 0, 1],
};
const EXPECTED_LINES = Object.keys(EXPECTED).map(Number);
ok('changed lines are exactly the 26 ledgered elements', ol.length === cl.length && eq(changed, EXPECTED_LINES), `changed: ${changed.join(',')}`);
const startLine = ol.findIndex((l) => l.includes(S)) + 1;
const endLine = ol.findIndex((l, i) => i > startLine && l === '</section>') + 1;
ok('every changed line sits inside the range (after the lp-049 opening tag, before the entries close)',
  changed.every((n) => n > startLine && n < endLine), `range lines ${startLine}-${endLine}`);
ok('every changed line is a single <p> element',
  changed.every((n) => /^\s*<p[ >]/.test(ol[n - 1]) && /<\/p>\s*$/.test(ol[n - 1]) && (ol[n - 1].match(/<p[ >]/g) || []).length === 1));
const strip = (s) => s.replace(/&mdash;|—|[(),]|\s/g, '');
const delLine = Object.fromEntries(DELETED);
ok('every changed line equals its original (less its ledgered closer) once dashes, parentheses, commas and whitespace are removed',
  changed.every((n) => strip(delLine[n] ? ol[n - 1].replace(delLine[n], '') : ol[n - 1]) === strip(cl[n - 1])));
ok('the 3 closer lines contain their ledgered sentence exactly once in HEAD and not in the copy',
  DELETED.every(([n, s]) => ol[n - 1].split(s).length === 2 && !cl[n - 1].includes(s)));
const dash = (s) => (s.match(/—|&mdash;/g) || []).length;
const dashDrop = changed.reduce((a, n) => a + dash(ol[n - 1]) - dash(cl[n - 1]), 0);
ok('em-dashes removed: exactly the 27 ledgered pairs (54 dashes), per line as ledgered; none added',
  dashDrop === 54 && changed.every((n) => dash(ol[n - 1]) - dash(cl[n - 1]) === EXPECTED[n][0]),
  changed.map((n) => `L${n}:${dash(ol[n - 1])}->${dash(cl[n - 1])}`).join(' '));
const commas = (s) => (s.match(/,/g) || []).length;
const commaAdd = changed.reduce((a, n) => a + commas(cl[n - 1]) - commas(delLine[n] ? ol[n - 1].replace(delLine[n], '') : ol[n - 1]), 0);
ok('commas added only where ledgered (11: one where a closing dash also ended a clause, plus the two around "the drafters argued")',
  commaAdd === 11 && changed.every((n) => commas(cl[n - 1]) - commas(delLine[n] ? ol[n - 1].replace(delLine[n], '') : ol[n - 1]) === EXPECTED[n][1]));
const po = (s) => (s.match(/\(/g) || []).length;
ok('parenthesis pairs added exactly as ledgered (26), balanced on every changed line',
  changed.every((n) => po(cl[n - 1]) - po(ol[n - 1]) === EXPECTED[n][2] && po(cl[n - 1]) === (cl[n - 1].match(/\)/g) || []).length)
  && changed.reduce((a, n) => a + po(cl[n - 1]) - po(ol[n - 1]), 0) === 26);
const tw = ['sticky', 'hidden', 'block', 'flex', 'grid', 'absolute', 'fixed'];
const twc = (h, w) => (norm(h).match(new RegExp(`\\b${w}\\b`, 'gi')) || []).length;
ok('no bare Tailwind token added', tw.every((w) => twc(c, w) <= twc(o, w)));
// Held sentences: every range sentence with 2+ em-dashes left in the copy is byte-identical (as text) to one in HEAD.
const sentences = (h) => {
  const out = [];
  for (const el of all(range(h), /<(p|li|td|blockquote)\b[^>]*>[\s\S]*?<\/\1>/g)) {
    for (const s of norm(el).split(/(?<=[.!?]["]?)\s+(?=[A-Z(-])/)) if ((s.match(/—/g) || []).length >= 2) out.push(s.trim());
  }
  return out;
};
const so = sentences(o), sc = sentences(c);
ok('held multi-dash sentences (operative text, holdings, frozen labels, table cells) survive unchanged; no new multi-dash sentence',
  sc.every((s) => so.includes(s)) && so.length - sc.length === 27, `range sentences with 2+ em-dashes: ${so.length} -> ${sc.length}`);

// 5. check-canon / mutation-suite strings, and the guards that read law-polling.html.
const lits = ['tools/check-canon.mjs', 'tools/test-canon-guard-mutations.mjs'].flatMap((f) =>
  [...fs.readFileSync(root + f, 'utf8').matchAll(/'((?:[^'\\\n]|\\.){6,})'|"((?:[^"\\\n]|\\.){6,})"|`([^`$\n]{6,})`/g)].map((m) => m[1] || m[2] || m[3]));
const inPage = [...new Set(lits)].filter((s) => o.includes(s));
const lcount = (h, s) => h.split(s).length - 1;
const inCut = (s) => DELETED.reduce((a, [, d]) => a + lcount(d, s), 0);
const litDrift = inPage.filter((s) => lcount(o, s) - lcount(c, s) !== inCut(s));
const cutHits = inPage.filter((s) => inCut(s) > 0).map((s) => `"${s}" ${lcount(o, s)}->${lcount(c, s)}`);
ok('every check-canon / mutation-suite literal found in law-polling.html survives at the same count, less only its occurrences inside a cut sentence', litDrift.length === 0,
  `${inPage.length} literals matched` + (cutHits.length ? `; inside a cut sentence: ${cutHits.join(', ')}` : '; none inside a cut sentence') + (litDrift.length ? ' DRIFT: ' + litDrift.join(' | ') : ''));
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
const entry = (h, id) => h.split(/(?=<article class="law-entry)/).find((b) => b.includes(`id="${id}"`)) || '';
ok('LP-073, LP-074 and LP-075 entries byte-identical to HEAD (the guarded rate-authority chain)',
  ['lp-073', 'lp-075'].every((id) => entry(o, id) === entry(c, id)) && entry(o, 'lp-074').replace(/&mdash; argued to the limit of what argument can do &mdash;/, '')
    === entry(c, 'lp-074').replace(/\(argued to the limit of what argument can do\)/, '') && entry(o, 'lp-074') !== '');
const lp076 = entry(c, 'lp-076');
ok('LP-076 dual-track record intact (title, lower-layer row, Presidential row, 0 no votes, no RATIFY-TAX-50)',
  lp076.includes('The Enabling Consolidation Amendment') && !/RATIFY-TAX-50/.test(lp076) &&
  lcount(lp076, '<th scope="row">Lower-Layer Aggregate</th>') === 1 && lcount(lp076, '<th scope="row">Presidential Disposition</th>') === 1 && lcount(lp076, '0 no votes') === 1);
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
