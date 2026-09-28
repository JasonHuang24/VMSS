// G1 verifier (q24, q25): structure identity, question-box byte identity, ledger quotes present.
import fs from 'fs';

const root = 'F:/Programming/VMSS/VMSS Website/';
const dir = root + 'docs-review/prose-lift-24.6.1/';
const src = fs.readFileSync(root + 'documents/academy-source.html', 'utf8');
const ledger = fs.existsSync(dir + 'g1-ledger.md') ? fs.readFileSync(dir + 'g1-ledger.md', 'utf8') : '';
const pages = ['q24', 'q25'];

function divBlock(html, openTag) {
  const start = html.indexOf(openTag);
  if (start < 0) throw new Error('not found: ' + openTag);
  const re = /<\/?div\b[^>]*>/g;
  re.lastIndex = start;
  let depth = 0, m;
  while ((m = re.exec(html))) {
    depth += m[0][1] === '/' ? -1 : 1;
    if (depth === 0) return html.slice(start, re.lastIndex);
  }
  throw new Error('unclosed: ' + openTag);
}
const tagSeq = (b) => [...b.matchAll(/<[^>]+>/g)].map((m) => m[0]);
const ENT = { mdash: '\u2014', ndash: '\u2013', rsquo: "'", lsquo: "'", ldquo: '"', rdquo: '"', sect: '\u00a7', middot: '\u00b7', eacute: '\u00e9', bull: '\u2022', amp: '&', nbsp: ' ' };
const norm = (s) => s
  .replace(/<\/?(em|strong|span)\b[^>]*>/g, '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&([a-z]+);/g, (x, n) => (n in ENT ? ENT[n] : x))
  .replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"')
  .replace(/\s+/g, ' ').trim();
const words = (s) => s.split(' ').filter((w) => /[A-Za-z0-9]/.test(w)).length;
const prose = (b) => [...b.matchAll(/<span class="grade-text">([\s\S]*?)<\/span>|<p>([\s\S]*?)<\/p>/g)].map((m) => m[1] ?? m[2]);
// a paragraph = a prose element, split further on <br><br>
const paras = (b) => prose(b).flatMap((p) => p.split(/<br><br>/));

let ok = true;
for (const id of pages) {
  const open = `<div class="question-page" id="${id}">`;
  const orig = divBlock(src, open);
  const edited = fs.readFileSync(dir + id + '.html', 'utf8').trim();
  const eb = divBlock(edited, open);
  const extra = edited.replace(eb, '').trim();

  const to = tagSeq(orig), te = tagSeq(eb);
  const diffAt = to.findIndex((t, i) => t !== te[i]);
  const structOk = to.length === te.length && diffAt === -1 && extra === '';

  const qbOpen = '<div class="question-box">';
  const qbOk = divBlock(orig, qbOpen) === divBlock(eb, qbOpen);
  const metaOpen = '<div class="question-meta">';
  const metaOk = divBlock(orig, metaOpen) === divBlock(eb, metaOpen);
  const labels = (b) => [...b.matchAll(/<span class="grade-label">[^<]*<\/span>/g)].map((m) => m[0]).join('|');
  const labelOk = labels(orig) === labels(eb);

  const sec = (ledger.split(/^## /m).find((s) => s.startsWith(id)) || '');
  const quotes = [...sec.matchAll(/\u00ab([^\u00bb]+)\u00bb/g)].map((m) => m[1]);
  const text = norm(eb);
  const missing = quotes.filter((q) => !text.includes(norm(q)));
  const long = quotes.filter((q) => words(norm(q)) > 15);

  const wo = prose(orig).map(norm).reduce((a, s) => a + words(s), 0);
  const we = prose(eb).map(norm).reduce((a, s) => a + words(s), 0);
  const dashO = Math.max(...paras(orig).map((p) => (p.match(/&mdash;|\u2014/g) || []).length));
  const dashE = Math.max(...paras(eb).map((p) => (p.match(/&mdash;|\u2014/g) || []).length));

  const pass = structOk && qbOk && metaOk && labelOk && missing.length === 0 && long.length === 0 && quotes.length > 0;
  ok = ok && pass;
  console.log(`${id}: ${pass ? 'PASS' : 'FAIL'} | tags ${to.length}/${te.length} identical=${structOk}${diffAt >= 0 ? ' firstDiff#' + diffAt : ''} | question-box byte-identical=${qbOk} | meta byte-identical=${metaOk} | grade labels identical=${labelOk} | ledger quotes ${quotes.length - missing.length}/${quotes.length} found, >15w=${long.length} | block words ${words(norm(orig))}->${words(text)} | prose words ${wo}->${we} (${(((we - wo) / wo) * 100).toFixed(1)}%) | max em-dash per paragraph ${dashO}->${dashE}`);
  for (const q of missing) console.log('  MISSING: ' + q);
  for (const q of long) console.log('  TOO LONG: ' + q);
  if (!structOk && diffAt >= 0) console.log(`  orig: ${to[diffAt]}\n  edit: ${te[diffAt]}`);
}
console.log(ok ? 'ALL PASS' : 'FAILURES');
process.exit(ok ? 0 : 1);
