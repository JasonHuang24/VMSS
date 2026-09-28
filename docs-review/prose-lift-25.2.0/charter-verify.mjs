import fs from 'node:fs';
const root = 'F:/Programming/VMSS/VMSS Website/';
const dir = root + 'docs-review/prose-lift-25.2.0/';
const o = fs.readFileSync(root + 'charter.html', 'utf8');
const c = fs.readFileSync(dir + 'charter.html', 'utf8');
const ledger = fs.readFileSync(dir + 'charter-ledger.md', 'utf8');
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const res = [];
const ok = (name, pass, detail = '') => res.push([pass, name, detail]);

// 1. Tag + attribute sequence (every tag string incl. comments), headings, blocks
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

// 2. Ledger quotes
const all = (re) => [...ledger.matchAll(re)].map((m) => m[1]);
const claims = all(/«([^»]+)»/g), afters = all(/⟪([^⟫]+)⟫/g), befores = all(/⟦([^⟧]+)⟧/g);
const words = (s) => s.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
const missC = claims.filter((q) => !c.includes(q));
const longC = claims.filter((q) => words(q) > 15);
ok('every «» ledger quote appears in the copy', missC.length === 0, `${claims.length - missC.length}/${claims.length}` + (missC.length ? ' MISSING: ' + missC.join(' | ') : ''));
ok('every «» ledger quote is 15 words or fewer', longC.length === 0, longC.join(' | '));
const missA = afters.filter((q) => !c.includes(q));
ok('every ⟪after⟫ text appears in the copy', missA.length === 0, `${afters.length - missA.length}/${afters.length}` + (missA.length ? ' MISSING: ' + missA.join(' | ') : ''));
const badB = befores.filter((q) => !o.includes(q) || c.includes(q));
ok('every ⟦before⟧ text is in the original and gone from the copy', badB.length === 0, `${befores.length - badB.length}/${befores.length}` + (badB.length ? ' BAD: ' + badB.join(' | ') : ''));

// 3. Fidelity extras: numbers, modals/hedges, guard strings, changed lines
const text = (h) => h.replace(blockRe, ' ').replace(/<!--[\s\S]*?-->/g, ' ').replace(/<[^>]+>/g, ' ');
const nums = (h) => (text(h).match(/\d[\d,.:]*%?/g) || []).sort();
ok('number/rate/year multiset identical', eq(nums(o), nums(c)), `${nums(o).length} numeric tokens`);
const HEDGES = ['shall', 'must', 'may', 'may not', 'only', 'unless', 'except', 'tends to', 'generally', 'approximately', 'roughly', 'typically', 'naturally', 'cannot', 'never'];
const cnt = (h, w) => (text(h).match(new RegExp(`\\b${w}\\b`, 'gi')) || []).length;
const hedgeDiff = HEDGES.filter((w) => cnt(o, w) !== cnt(c, w)).map((w) => `${w} ${cnt(o, w)}->${cnt(c, w)}`);
ok('modal/hedge counts identical', hedgeDiff.length === 0, hedgeDiff.join(', ') || HEDGES.map((w) => `${w}=${cnt(o, w)}`).join(' '));
const TERMS = ['phase', 'phasing', 'elective residen', 'voluntary permanent residency', 'Meritboard', 'terminal reassignment', 'load-bearing', 'founding core', 'retention schedule', 'pre-positioning', 'Overtime Premium Protocol', 'time dividend', 'boundary-riding', 'pulse', 'novelty filter', 'consensus', 'supermajority', 'leakage', 'kill switch', 'reassignment', 'Sanctuary'];
const tc = (h, t) => text(h).split(t).length - 1;
const termDiff = TERMS.filter((t) => tc(o, t) !== tc(c, t)).map((t) => `${t} ${tc(o, t)}->${tc(c, t)}`);
ok('defined-term counts identical', termDiff.length === 0, termDiff.join(', ') || `${TERMS.length} terms`);
const occ = (h, s) => h.split(s).length - 1;
const PINNED = [['There is no minimum wage in VMSS', 1], ['No minimum participation quorum is imposed', 1],
  ['There is no limit on consecutive terms', 1], ['not a supermajority, full agreement', 1]];
const pinBad = PINNED.filter(([s, n]) => occ(c, s) !== n || occ(o, s) !== n).map(([s]) => s);
ok('check-canon negative magnitudes x1 in copy', pinBad.length === 0, pinBad.join(' | '));
ok('advisory flag (comma form) unchanged', occ(o, 'advisory, not institutionally enforced') === occ(c, 'advisory, not institutionally enforced'));
ok('no LP reference introduced', !/\bLP-\d/.test(c));
ok('no exact cascade introduced', !/\b50\s*%?\s*\/\s*25\s*%?\s*\/\s*12\.5\s*%?\s*\/\s*6\.25/.test(text(c)));
for (const f of ['<h2 id="preamble"', '>Article I – Vertical Moral', '</body>']) ok(`mutation find present: ${f}`, occ(c, f) === occ(o, f) && occ(c, f) > 0);
const tocRe = /<a href="#([\w-]+)" class="toc-link"><span class="toc-num">([^<]*)<\/span> <span class="toc-txt">([\s\S]*?)<\/span><\/a>/g;
ok('TOC census rows identical (30)', eq([...o.matchAll(tocRe)].map((m) => m[0]), [...c.matchAll(tocRe)].map((m) => m[0])) && [...c.matchAll(tocRe)].length === 30);
const ol = o.split('\n'), cl = c.split('\n');
const changed = ol.map((l, i) => (l !== cl[i] ? i + 1 : 0)).filter(Boolean);
const EXPECTED = [157, 169, 192, 204, 221, 287, 288, 316, 319, 359, 362, 392, 464];
ok('changed lines are exactly the 13 ledgered elements', ol.length === cl.length && eq(changed, EXPECTED), `changed: ${changed.join(',')}`);
const dash = (s) => (s.match(/—|&mdash;/g) || []).length;
const dashLog = changed.map((n) => `L${n}:${dash(ol[n - 1])}->${dash(cl[n - 1])}`).join(' ');
ok('em-dash count never rises on a changed line', changed.every((n) => dash(cl[n - 1]) <= dash(ol[n - 1])), dashLog);
const tw = ['sticky', 'hidden', 'block', 'flex', 'grid', 'absolute', 'fixed'];
const twAdd = tw.filter((w) => cnt(c, w) > cnt(o, w));
ok('no bare Tailwind token added', twAdd.length === 0, twAdd.join(','));

let pass = true;
for (const [p, n, d] of res) { if (!p) pass = false; console.log(`${p ? 'PASS' : 'FAIL'}  ${n}${d ? '  [' + d + ']' : ''}`); }
console.log(pass ? 'ALL PASS' : 'FAIL');
process.exit(pass ? 0 : 1);
