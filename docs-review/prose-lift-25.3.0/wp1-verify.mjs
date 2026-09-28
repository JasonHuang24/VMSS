import fs from 'node:fs';
const root = 'F:/Programming/VMSS/VMSS Website/';
const dir = root + 'docs-review/prose-lift-25.3.0/';
const o = fs.readFileSync(root + 'whitepaper.html', 'utf8');
const c = fs.readFileSync(dir + 'whitepaper.html', 'utf8');
const ledger = fs.readFileSync(dir + 'wp1-ledger.md', 'utf8');
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const res = [];
const ok = (name, pass, detail = '') => res.push([pass, name, detail]);

// 0. Patch range: everything outside §1–11 is byte-identical
const S = '<h2>1. Executive Summary', E = '<h2>12. Economic Model: Taxation';
const si = (h) => h.indexOf(S), ei = (h) => h.indexOf(E);
ok('range markers found once each', [o, c].every((h) => si(h) > 0 && ei(h) > si(h) && h.split(S).length === 2 && h.split(E).length === 2));
ok('front matter before §1 byte-identical', o.slice(0, si(o)) === c.slice(0, si(c)), `${si(o)} bytes`);
ok('§12 onward byte-identical', o.slice(ei(o)) === c.slice(ei(c)), `${o.length - ei(o)} bytes`);

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

// 3. Fidelity: numbers, citations, quotations, modals/hedges, defined terms (range text)
const range = (h) => h.slice(si(h), ei(h));
const text = (h) => norm(range(h));
const ms = (arr) => [...arr].sort();
const nums = (h) => ms(text(h).match(/\d[\d,.:–]*%?/g) || []);
ok('number/rate/year multiset identical (§1–11)', eq(nums(o), nums(c)), `${nums(o).length} numeric tokens`);
const cites = (h) => ms(text(h).match(/§\s?[\d.]+|\bLP-\d+(?:\.\d+)?|\bArticles? [IVXL]+(?:\.[IVXL]+)?(?:–[IVXL.]+)?|\bSection \d+(?:\.\d+)?/g) || []);
ok('citation multiset identical (§, LP-, Article, Section)', eq(cites(o), cites(c)), `${cites(o).length} citations`);
const quotes = (h) => ms(text(h).match(/"[^"]{1,200}"/g) || []);
ok('quoted-text multiset identical', eq(quotes(o), quotes(c)), `${quotes(o).length} quoted strings`);
const links = (h) => h.match(/href="[^"]*"/g) || [];
ok('href sequence identical (whole page)', eq(links(o), links(c)), `${links(o).length} hrefs`);
const HEDGES = ['shall', 'must', 'may', 'may not', 'only', 'unless', 'except', 'tends to', 'generally', 'approximately', 'roughly',
  'typically', 'naturally', 'cannot', 'never', 'can', 'should', 'would', 'largely', 'predominantly', 'substantially', 'nearly', 'almost'];
const cnt = (h, w) => (text(h).match(new RegExp(`\\b${w}\\b`, 'gi')) || []).length;
// "would" drops once: W29 cuts "not because someone would pay for it" (a counterfactual, not a rule modal or hedge).
const EXPECTED_HEDGE = { would: -1 };
const hedgeDelta = Object.fromEntries(HEDGES.map((w) => [w, cnt(c, w) - cnt(o, w)]).filter(([, d]) => d !== 0));
ok('modal/hedge counts unchanged except the ledgered "would"', eq(hedgeDelta, EXPECTED_HEDGE),
  Object.entries(hedgeDelta).map(([w, d]) => `${w} ${d}`).join(', ') || 'none');
const RULE_MODALS = ['shall', 'must', 'may', 'may not', 'cannot', 'only', 'unless', 'except'];
ok('rule modals and qualifiers identical (shall/must/may/may not/cannot/only/unless/except)', RULE_MODALS.every((w) => cnt(o, w) === cnt(c, w)),
  RULE_MODALS.map((w) => `${w}=${cnt(c, w)}`).join(' '));
const TERMS = ['phase-back', 'phasing', 'elective residen', 'voluntary permanent residency', 'Meritboard', 'terminal reassignment',
  'reassignment', 'load-bearing', 'founding core', 'founding principles', 'novelty filter', 'consensus', 'supermajority', 'Sanctuary',
  'STI', 'civic floor', 'federal floor', 'backup vessel', 'Colosseum', 'dual-key', 'Article XI', 'gauntlet', 'Two-level moral causality',
  'time dividend', 'Freedom Layer', 'counter-sovereignty', 'performance signal', 'electoral mandate', 'Selective Ascension Domains',
  'Metric Gated Domains', 'Threshold Inhibition Protocol', 'Trust Threshold Domains', 'External Force Doctrine'];
// Every delta is a whole-sentence or whole-clause cut logged in the ledger; none is a synonym swap.
const EXPECTED = { 'STI': -2, 'phasing': -1, 'reassignment': -1, 'load-bearing': -1, 'founding principles': -1, 'Two-level moral causality': -1 };
const tc = (h, t) => text(h).split(t).length - 1;
const delta = Object.fromEntries(TERMS.map((t) => [t, tc(c, t) - tc(o, t)]).filter(([, d]) => d !== 0));
ok('defined-term count changes equal the ledgered cuts', eq(Object.entries(delta).sort(), Object.entries(EXPECTED).sort()),
  Object.entries(delta).map(([t, d]) => `${t} ${d}`).join(', '));

// 4. Scope of edits
const ol = o.split('\n'), cl = c.split('\n');
const changed = ol.map((l, i) => (l !== cl[i] ? i + 1 : 0)).filter(Boolean);
const EXPECTED_LINES = [361, 362, 405, 413, 416, 440, 451, 457, 512, 518, 535, 536, 549, 556, 565, 584, 610, 619, 623, 625, 632, 750, 786, 790, 806, 807, 811, 838, 857];
ok('changed lines are exactly the 29 ledgered elements', ol.length === cl.length && eq(changed, EXPECTED_LINES), `changed: ${changed.join(',')}`);
ok('every changed line is a <p> element', changed.every((n) => /^\s*<p[ >]/.test(ol[n - 1]) && /<\/p>\s*$/.test(ol[n - 1])));
const dash = (s) => (s.match(/—|&mdash;/g) || []).length;
ok('em-dash count never rises on a changed line', changed.every((n) => dash(cl[n - 1]) <= dash(ol[n - 1])),
  changed.map((n) => `L${n}:${dash(ol[n - 1])}->${dash(cl[n - 1])}`).join(' '));
const tw = ['sticky', 'hidden', 'block', 'flex', 'grid', 'absolute', 'fixed'];
const twc = (h, w) => (norm(h).match(new RegExp(`\\b${w}\\b`, 'gi')) || []).length;
ok('no bare Tailwind token added', tw.every((w) => twc(c, w) <= twc(o, w)));

// 5. check-canon / mutation-test strings that read whitepaper.html (all outside the range; must survive)
const DOCTRINE = 'top marginal rates track demonstrated institutional need, and any rate reduction requires audited evidence per the Path 2 standing audit — never authored facts — at the standard zero-fail threshold.';
ok('Trajectory Doctrine guard string intact', c.includes(DOCTRINE) && o.includes(DOCTRINE));
for (const s of ['LP-070 remains the enacted standing future gate', 'aggregate dividend coverage', 'top marginal rates track demonstrated institutional need'])
  ok(`guard find string intact: ${s}`, c.split(s).length === o.split(s).length && c.includes(s));
ok('no stale "five currencies"', !/\bfive (siloed )?currenc/i.test(c.replace(/<!--[\s\S]*?-->/g, '')));
const lpRefs = (h) => [...h.matchAll(/law-polling\.html#(lp-[\w-]+)/g)].map((m) => m[1]);
ok('LP deep links identical', eq(lpRefs(o), lpRefs(c)), `${lpRefs(o).length} links`);

// Informational
const spaced = (h) => norm(h.replace(/<[^>]+>/g, ' ')).replace(/[—–]/g, ' ');
const bodyWords = (h) => words(spaced(h.slice(h.indexOf('<body'), h.indexOf('</body>'))));
const rangeWords = (h) => words(spaced(range(h)));
const lineWords = (n) => `L${n} ${words(spaced(ol[n - 1]))}->${words(spaced(cl[n - 1]))}`;
console.log(`INFO  element words: ${changed.map(lineWords).join(', ')}`);
const multiDash = (h) => text(h).split(/(?<=[.!?])\s+/).filter((s) => (s.match(/—/g) || []).length >= 2).length;
console.log(`INFO  words: page ${bodyWords(o)} -> ${bodyWords(c)}; §1–11 ${rangeWords(o)} -> ${rangeWords(c)}`);
console.log(`INFO  sentences in §1–11 with 2+ em-dashes: ${multiDash(o)} -> ${multiDash(c)}`);
console.log(`INFO  ledger markers: ${befores.length} before, ${afters.length} after, ${claims.length} claim quotes`);

let pass = true;
for (const [p, n, d] of res) { if (!p) pass = false; console.log(`${p ? 'PASS' : 'FAIL'}  ${n}${d ? '  [' + d + ']' : ''}`); }
console.log(pass ? 'ALL PASS' : 'FAIL');
process.exit(pass ? 0 : 1);
