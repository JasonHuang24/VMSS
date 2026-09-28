import fs from 'node:fs';
import { execSync } from 'node:child_process';
const root = 'F:/Programming/VMSS/VMSS Website/';
const dir = root + 'docs-review/prose-lift-25.4.1/';
// The original is the committed page, read straight from git.
const o = execSync('git show HEAD:laws.html', { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const live = fs.readFileSync(root + 'laws.html', 'utf8');
const c = fs.readFileSync(dir + 'laws.html', 'utf8');
const ledger = fs.readFileSync(dir + 'laws2-ledger.md', 'utf8');
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const res = [];
const ok = (name, pass, detail = '') => res.push([pass, name, detail]);

ok('live laws.html untouched (equals HEAD)', live === o);

// 0. Patch range: from the Dividend Sourcing article to the end of the code entries
//    (the last </article> before the Cross-References card).
const S = '<article class="code-entry" id="code-fc-dividend-sourcing-interlayer-levy"';
const XREF = '<div class="mt-16 rounded-3xl border border-[var(--border)] bg-[var(--bg-secondary)]/80 p-6">';
const si = (h) => h.indexOf(S), xi = (h) => h.indexOf(XREF);
ok('range markers found once each', [o, c].every((h) => si(h) > 0 && xi(h) > si(h) && h.split(S).length === 2 && h.split(XREF).length === 2));
ok('RANGE CHECK: everything before the code-fc-dividend-sourcing-interlayer-levy article byte-identical to HEAD (the v25.4.0 half)',
  o.slice(0, si(o)) === c.slice(0, si(c)), `${si(o)} bytes`);
ok('RANGE CHECK: from the Cross-References card (after the last code entry) to end of file byte-identical to HEAD',
  o.slice(xi(o)) === c.slice(xi(c)), `${o.length - xi(o)} bytes`);
const tocBlock = (h) => h.slice(h.indexOf('<!-- LAWS-TOC:BEGIN'), h.indexOf('<!-- LAWS-TOC:END -->'));
ok('ToC block byte-identical', tocBlock(o) === tocBlock(c) && tocBlock(o).length > 1000, `${tocBlock(o).length} bytes`);
const metas = (h) => h.match(/<div class="law-meta-grid">[\s\S]*?\n  <\/div>/g) || [];
ok('every law-meta-grid (meta rows) byte-identical', eq(metas(o), metas(c)) && metas(o).length > 0, `${metas(o).length} meta grids`);

// 1. Tag + attribute sequence, headings, script/style/JSON-LD blocks, head, labels
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
const th = (h) => h.match(/<th\b[^>]*>[\s\S]*?<\/th>|<h4>[\s\S]*?<\/h4>|<caption\b[\s\S]*?<\/caption>/g) || [];
ok('table header, h4 and caption text identical', eq(th(o), th(c)), `${th(o).length} elements`);

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
ok('every «» ledger quote appears in the copy', claims.length > 0 && missC.length === 0, `${claims.length - missC.length}/${claims.length}` + (missC.length ? ' MISSING: ' + missC.join(' | ') : ''));
ok('every «» ledger quote is 15 words or fewer', longC.length === 0, longC.join(' | '));
const missA = afters.filter((q) => !c.includes(q));
ok('every ⟪after⟫ text appears in the copy', missA.length === 0, `${afters.length - missA.length}/${afters.length}` + (missA.length ? ' MISSING: ' + missA.join(' | ') : ''));
const badB = befores.filter((q) => !o.includes(q) || c.includes(q));
ok('every ⟦before⟧ text is in the original and gone from the copy', badB.length === 0, `${befores.length - badB.length}/${befores.length}` + (badB.length ? ' BAD: ' + badB.join(' | ') : ''));
// The ledgered before->after pairs, applied to HEAD, must reproduce the copy byte for byte.
const replay = befores.reduce((h, b, i) => (h.split(b).length === 2 ? h.replace(b, () => afters[i]) : h + '\u0000'), o);
ok('applying exactly the ledgered ⟦before⟧→⟪after⟫ pairs to HEAD reproduces the copy byte for byte', befores.length === afters.length && replay === c, `${befores.length} pairs`);

// 3. Fidelity inside the range
const range = (h) => h.slice(si(h), xi(h));
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
const HEDGES = ['shall', 'must', 'may', 'may not', 'only', 'unless', 'except', 'tends to', 'generally', 'approximately', 'typically',
  'cannot', 'never', 'not', 'no', 'without', 'any', 'every', 'each', 'regardless', 'always', 'solely', 'sole', 'exactly', 'directly',
  'explicitly', 'deliberately', 'strictly', 'narrow', 'narrowly', 'unconditionally', 'mandatory', 'advisorily', 'advisory', 'still', 'largely'];
const cnt = (h, w) => (text(h).match(new RegExp(`\\b${w}\\b`, 'gi')) || []).length;
const hedgeDelta = Object.fromEntries(HEDGES.map((w) => [w, cnt(c, w) - cnt(o, w)]).filter(([, d]) => d !== 0));
ok('hedge, modal, quantifier and negation counts identical (range)', Object.keys(hedgeDelta).length === 0,
  Object.entries(hedgeDelta).map(([w, d]) => `${w} ${d}`).join(', ') || `${HEDGES.length} words checked`);
const TERMS = ['Article XXVIII', 'Meritboard', 'domain-expert', 'AI governance system', 'district', 'petition', 'curfew', 'minors-only',
  'commercial-corridor nighttime', 'seasonal festival periods', 'ratifying district', 'register', 'representative', 'geographic zone',
  'layer-wide regulation', 'advisory, not institutionally enforced', 'Sanctuary', 'Main Layer', 'reassignment', 'elective residen',
  'voluntary permanent residen', 'Founding Treaty', 'implant', 'ledger', 'civic floor', 'Threshold Inhibition Protocol', 'Colosseum'];
const tc = (h, t) => text(h).split(t).length - 1;
const delta = Object.fromEntries(TERMS.map((t) => [t, tc(c, t) - tc(o, t)]).filter(([, d]) => d !== 0));
ok('defined-term counts identical (no term swapped)', Object.keys(delta).length === 0,
  Object.entries(delta).map(([t, d]) => `${t} ${d}`).join(', ') || `${TERMS.length} terms checked`);

// 4. Scope of edits
const ol = o.split('\n'), cl = c.split('\n');
const changed = ol.map((l, i) => (l !== cl[i] ? i + 1 : 0)).filter(Boolean);
const EXPECTED_LINES = [2802, 2828];
ok('changed lines are exactly the 2 ledgered elements', ol.length === cl.length && eq(changed, EXPECTED_LINES), `changed: ${changed.join(',')}`);
ok('every changed line is a single <p> element',
  changed.every((n) => /^\s*<p[ >]/.test(ol[n - 1]) && /<\/p>\s*$/.test(ol[n - 1]) && (ol[n - 1].match(/<p[ >]/g) || []).length === 1));
ok('no changed line carries shall/must/may', changed.every((n) => !/\b(shall|must|may)\b/i.test(norm(ol[n - 1]))));
const strip = (s) => s.replace(/&mdash;|—|[(),]|\s/g, '');
ok('C1 (LP-020, line 2828) differs from the original only in dashes and parentheses', strip(ol[2827]) === strip(cl[2827]));
const tokens = (h) => norm(h).match(/[A-Za-z0-9$%§.\/+-]*[A-Za-z0-9]/g) || [];
const to = tokens(o), tcpy = tokens(c);
const cut = to.findIndex((t, i) => t === 'rather' && to[i + 1] === 'than' && to[i + 2] === 'exhaustively');
ok('word-token sequence of the whole page equals HEAD minus exactly "rather than exhaustively" (C2)',
  cut > 0 && eq([...to.slice(0, cut), ...to.slice(cut + 3)], tcpy), `${to.length} -> ${tcpy.length} tokens`);
const dash = (s) => (s.match(/—|&mdash;/g) || []).length;
ok('em-dashes: C1 drops one pair, C2 keeps its single dash; none added',
  dash(ol[2827]) - dash(cl[2827]) === 2 && dash(ol[2801]) === dash(cl[2801]),
  changed.map((n) => `L${n}:${dash(ol[n - 1])}->${dash(cl[n - 1])}`).join(' '));
const paren = (h) => (h.match(/\(/g) || []).length - (h.match(/\)/g) || []).length;
ok('parentheses balanced on every changed line', changed.every((n) => paren(cl[n - 1]) === 0));
const tw = ['sticky', 'hidden', 'block', 'flex', 'grid', 'absolute', 'fixed'];
const twc = (h, w) => (norm(h).match(new RegExp(`\\b${w}\\b`, 'gi')) || []).length;
ok('no bare Tailwind token added', tw.every((w) => twc(c, w) <= twc(o, w)));

// 5. check-canon / mutation-suite strings. Every string literal in both tools that occurs in
//    laws.html must occur the same number of times in the copy, and the guards that read
//    laws.html must give the same answer on the copy as on the original.
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
ok('exact cascade present; stale-rate and tier-claim guards unchanged',
  exactCascade.test(gc) && !forbiddenCurrent.test(gc) && TIER.test(gc) === TIER.test(go));
const entries = (h) => new Map([...h.matchAll(/<article class="code-entry[^"]*" id="([\w.-]+)"[\s\S]*?<\/article>/g)].map((m) => [m[1], guardText(m[0])]));
const eo = entries(o), ec = entries(c);
const entryDiff = [...eo.keys()].filter((k) => eo.get(k) !== ec.get(k));
ok('code entries whose rendered text changed: LP-020 only (C2 sits in the Tier 4 section sub, outside any entry)', eq(entryDiff, ['code-lp-020']), entryDiff.join(', '));
const ADV = 'advisory, not institutionally enforced';
const owes = ['code-lp-013', 'code-lp-015', 'code-lp-016', 'code-lp-017', 'code-lp-018', 'code-lp-019', 'code-lp-026', 'code-lp-036', 'code-lp-042', 'code-lp-061', 'code-lp-009', 'code-lp-030'];
ok('advisory flag present in every Tier 3/4 entry that carries it, page count unchanged', owes.every((id) => ec.get(id).includes(ADV)) && lcount(o, ADV) === lcount(c, ADV), `${lcount(c, ADV)} occurrences`);
ok('no stale "five currencies"', !/\bfive (siloed )?currenc/i.test(c.replace(/<!--[\s\S]*?-->/g, '')));
const ids = (h) => [...h.replace(/<!--[\s\S]*?-->/g, '').matchAll(/ id="([^"]+)"/g)].map((m) => m[1]);
ok('id sequence identical, no duplicates', eq(ids(o), ids(c)) && new Set(ids(c)).size === ids(c).length, `${ids(c).length} ids`);
const codeEntryHeads = (h) => [...h.matchAll(/<article class="code-entry[^"]*" id="([\w.-]+)" data-tier="([a-z]+)"(?: data-instrument="([a-z]+)")? data-source="([^"]*)">/g)].map((m) => m.slice(1).join('|'));
ok('code-entry id/tier/instrument/source sequence identical', eq(codeEntryHeads(o), codeEntryHeads(c)), `${codeEntryHeads(c).length} entries`);

// Informational
const spaced = (h) => norm(h.replace(/<[^>]+>/g, ' ')).replace(/[—–]/g, ' ');
const bodyWords = (h) => words(spaced(h.slice(h.indexOf('<body'), h.indexOf('</body>'))));
const rangeWords = (h) => words(spaced(range(h)));
const lineWords = (n) => `L${n} ${words(spaced(ol[n - 1]))}->${words(spaced(cl[n - 1]))}`;
const sentMulti = (s) => s.split(/(?<=[.!?])\s+(?=[A-Z-])/).filter((x) => (x.match(/—/g) || []).length >= 2).length;
const proseLines = (h, pred) => range(h).split('\n').filter((l) => /<(p|li|td|blockquote)\b/.test(l)).filter(pred);
const multiDash = (h) => proseLines(h, () => true).reduce((a, l) => a + sentMulti(norm(l)), 0);
const founding = [...range(o).matchAll(/<article class="code-entry[^"]*" id="([\w.-]+)" data-tier="federal" data-instrument="founding"[\s\S]*?<\/article>/g)];
const foundingMulti = founding.reduce((a, m) => a + (m[0].match(/<p class="law-summary">[\s\S]*?<\/p>/g) || []).reduce((b, p) => b + sentMulti(norm(p)), 0), 0);
const foundingWithMulti = founding.filter((m) => (m[0].match(/<p class="law-summary">[\s\S]*?<\/p>/g) || []).some((p) => sentMulti(norm(p)) > 0)).length;
console.log(`INFO  element words: ${changed.map(lineWords).join(', ')}`);
console.log(`INFO  words: page ${bodyWords(o)} -> ${bodyWords(c)}; range ${rangeWords(o)} -> ${rangeWords(c)}`);
console.log(`INFO  prose sentences in range with 2+ em-dashes: ${multiDash(o)} -> ${multiDash(c)}`);
console.log(`INFO  founding entries in range: ${founding.length}; held with 2+-dash sentences: ${foundingWithMulti} entries, ${foundingMulti} sentences`);
console.log(`INFO  ledger markers: ${befores.length} before, ${afters.length} after, ${claims.length} claim quotes`);

let pass = true;
for (const [p, n, d] of res) { if (!p) pass = false; console.log(`${p ? 'PASS' : 'FAIL'}  ${n}${d ? '  [' + d + ']' : ''}`); }
console.log(pass ? 'ALL PASS' : 'FAIL');
process.exit(pass ? 0 : 1);
