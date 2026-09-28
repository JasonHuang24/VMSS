// faq.html verifier: structure identity, frozen-block identity, JSON-LD sync, ledger quotes present.
import fs from 'fs';

const root = 'F:/Programming/VMSS/VMSS Website/';
const dir = root + 'docs-review/prose-lift-24.8.5/';
const page = 'faq.html';
const ledger = fs.readFileSync(dir + 'faq-ledger.md', 'utf8');

const ENT = { mdash: '\u2014', ndash: '\u2013', rsquo: "'", lsquo: "'", ldquo: '"', rdquo: '"', amp: '&', nbsp: ' ', asymp: '\u2248', rarr: '\u2192', sect: '\u00a7', hellip: '\u2026' };
const norm = (s) => s
  .replace(/<\/?(em|strong|span|a)\b[^>]*>/g, '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&([a-z]+);/g, (x, n) => (n in ENT ? ENT[n] : x))
  .replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"')
  .replace(/\s+/g, ' ').trim();
const words = (s) => s.split(' ').filter((w) => /[A-Za-z0-9]/.test(w)).length;
const tags = (h) => [...h.replace(/<(script|style)\b[\s\S]*?<\/\1>/g, '<$1>').matchAll(/<[^>]+>/g)].map((m) => m[0]);
const blocks = (h) => [...h.matchAll(/<(script|style)\b[\s\S]*?<\/\1>/g)].map((m) => m[0]);
const heads = (h) => [...h.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/g)].map((m) => m[0]);
const paras = (h) => [...h.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)].map((m) => m[1]);
const outside = (h) => h.replace(/(<p\b[^>]*>)[\s\S]*?(<\/p>)/g, '$1$2');
const nums = (s) => (s.match(/\d[\d,.]*/g) || []).map((n) => n.replace(/[.,]$/, '')).sort();
const TW = ['static', 'fixed', 'absolute', 'relative', 'sticky', 'block', 'inline', 'flex', 'grid', 'hidden', 'table', 'contents', 'container', 'visible', 'invisible', 'collapse', 'isolate', 'grow', 'shrink', 'border', 'rounded', 'shadow', 'outline', 'ring', 'blur', 'invert', 'sepia', 'grayscale', 'filter', 'transform', 'transition', 'truncate', 'italic', 'underline', 'overline', 'uppercase', 'lowercase', 'capitalize', 'ordinal', 'resize', 'antialiased', 'prose'];
const tokens = (h) => new Set(h.split(/[^A-Za-z0-9_-]+/));
const ldText = (h) => h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1];
const visible = (h) => norm(h.replace(/<(script|style)\b[\s\S]*?<\/\1>/g, ' ').replace(/<head>[\s\S]*?<\/head>/, ' '));

const o = fs.readFileSync(root + page, 'utf8');
const e = fs.readFileSync(dir + page, 'utf8');

const to = tags(o), te = tags(e);
const diffAt = to.findIndex((t, i) => t !== te[i]);
const tagOk = to.length === te.length && diffAt === -1;
const bo = blocks(o), be = blocks(e);
const blockOk = bo.length === be.length && bo.every((b, i) => b === be[i]);
const ho = heads(o), he = heads(e);
const headOk = ho.length === he.length && ho.every((x, i) => x === he[i]);
const outOk = outside(o) === outside(e);

// JSON-LD: parse both, compare structure; synced answers = originals that were verbatim copies of visible text.
const jo = JSON.parse(ldText(o)), je = JSON.parse(ldText(e));
const shape = (j) => JSON.stringify({ c: j['@context'], t: j['@type'], q: j.mainEntity.map((q) => [q['@type'], q.name, Object.keys(q), Object.keys(q.acceptedAnswer), q.acceptedAnswer['@type']]) });
const ldShapeOk = shape(jo) === shape(je);
const visO = visible(o), visE = visible(e);
const synced = jo.mainEntity.map((q, i) => visO.includes(norm(q.acceptedAnswer.text)) ? i : -1).filter((i) => i >= 0);
const syncOk = synced.every((i) => visE.includes(norm(je.mainEntity[i].acceptedAnswer.text)));
const unsyncedSame = jo.mainEntity.every((q, i) => synced.includes(i) || q.acceptedAnswer.text === je.mainEntity[i].acceptedAnswer.text);
const ldByteOk = ldText(o) === ldText(e);

const po = paras(o), pe = paras(e);
let wo = 0, we = 0, changed = 0;
const longer = [], dash = [];
po.forEach((p, i) => {
  const a = words(norm(p)), b = words(norm(pe[i]));
  wo += a; we += b;
  if (p !== pe[i]) changed++;
  if (b > a) longer.push(`#${i} ${a}->${b}`);
  const d = (pe[i].match(/\u2014|&mdash;/g) || []).length;
  if (d > 1) dash.push(`#${i}=${d}`);
});
const no = nums(norm(po.join(' '))).join('|'), ne = nums(norm(pe.join(' '))).join('|');
const numOk = no === ne;
const to2 = tokens(o), te2 = tokens(e);
const twNew = TW.filter((t) => te2.has(t) && !to2.has(t));

const quotes = [...ledger.matchAll(/\u00ab([^\u00bb]+)\u00bb/g)].map((m) => m[1]);
const missing = quotes.filter((q) => !visE.includes(norm(q)));
const long = quotes.filter((q) => words(norm(q)) > 15);

const pass = tagOk && blockOk && headOk && outOk && ldShapeOk && syncOk && unsyncedSame && numOk && longer.length === 0 && dash.length === 0 && twNew.length === 0 && missing.length === 0 && long.length === 0 && quotes.length > 0;
console.log(`${page}: ${pass ? 'PASS' : 'FAIL'}`);
console.log(`  tags ${to.length}/${te.length} identical=${tagOk}${diffAt >= 0 ? ' firstDiff#' + diffAt : ''}`);
console.log(`  script/style blocks ${bo.length}/${be.length} byte-identical=${blockOk} (JSON-LD block byte-identical=${ldByteOk})`);
console.log(`  JSON-LD parses; structure identical=${ldShapeOk} (${je.mainEntity.length} questions); synced answers ${synced.length}, all present verbatim=${syncOk}; unsynced answers unchanged=${unsyncedSame}`);
console.log(`  headings ${ho.length}/${he.length} byte-identical=${headOk}`);
console.log(`  everything outside <p> bodies byte-identical=${outOk}`);
console.log(`  <p> ${po.length}/${pe.length}, changed ${changed}; words ${wo}->${we} (${(((we - wo) / wo) * 100).toFixed(1)}%); longer paragraphs: ${longer.length ? longer.join(', ') : 'none'}`);
console.log(`  number tokens in prose identical=${numOk}; paragraphs with >1 em-dash: ${dash.length ? dash.join(', ') : 'none'}`);
console.log(`  new Tailwind-utility tokens: ${twNew.length ? twNew.join(', ') : 'none'}`);
console.log(`  ledger quotes ${quotes.length - missing.length}/${quotes.length} found, >15 words: ${long.length}`);
for (const q of missing) console.log('  MISSING: ' + q);
for (const q of long) console.log('  TOO LONG: ' + q);
if (!tagOk && diffAt >= 0) console.log(`  orig: ${to[diffAt]}\n  edit: ${te[diffAt]}`);
if (!numOk) console.log(`  nums orig: ${no}\n  nums edit: ${ne}`);
process.exit(pass ? 0 : 1);
