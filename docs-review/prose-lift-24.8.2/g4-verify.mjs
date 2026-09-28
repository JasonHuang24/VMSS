// G4 verifier (r19, r20): tag/attribute sequence identity, table-cell identity, ledger quotes present.
import fs from 'fs';

const root = 'F:/Programming/VMSS/VMSS Website/';
const dir = root + 'docs-review/prose-lift-24.8.2/';
const src = fs.readFileSync(root + 'documents/resources-source.html', 'utf8');
const ledger = fs.existsSync(dir + 'g4-ledger.md') ? fs.readFileSync(dir + 'g4-ledger.md', 'utf8') : '';
const pages = ['r19', 'r20'];

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
const cells = (b) => [...b.matchAll(/<(td|th)\b[^>]*>[\s\S]*?<\/\1>/g)].map((m) => m[0]);
const heads = (b) => [...b.matchAll(/<(h[1-6])\b[^>]*>[\s\S]*?<\/\1>/g)].map((m) => m[0]);
const ENT = { mdash: '\u2014', ndash: '\u2013', rsquo: "'", lsquo: "'", ldquo: '"', rdquo: '"', sect: '\u00a7', middot: '\u00b7', rarr: '\u2192', amp: '&', nbsp: ' ' };
const norm = (s) => s
  .replace(/<\/?(em|strong|span)\b[^>]*>/g, '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&([a-z]+);/g, (x, n) => (n in ENT ? ENT[n] : x))
  .replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"')
  .replace(/\s+/g, ' ').trim();
const words = (s) => s.split(' ').filter((w) => /[A-Za-z0-9]/.test(w)).length;
const prose = (b) => [...b.matchAll(/<div class="resource-intro">([\s\S]*?)<\/div>|<p>([\s\S]*?)<\/p>/g)].map((m) => m[1] ?? m[2]);

let ok = true;
for (const id of pages) {
  const open = `<div class="resource-page" id="${id}">`;
  const orig = divBlock(src, open);
  const edited = fs.readFileSync(dir + id + '.html', 'utf8').trim();
  const eb = divBlock(edited, open);
  const extra = edited.replace(eb, '').trim();

  const to = tagSeq(orig), te = tagSeq(eb);
  const diffAt = to.findIndex((t, i) => t !== te[i]);
  const structOk = to.length === te.length && diffAt === -1 && extra === '';
  const co = cells(orig), ce = cells(eb);
  const cellsOk = co.length === ce.length && co.every((c, i) => c === ce[i]);
  const headsOk = JSON.stringify(heads(orig)) === JSON.stringify(heads(eb));

  const sec = (ledger.split(/^## /m).find((s) => s.startsWith(id)) || '');
  const quotes = [...sec.matchAll(/\u00ab([^\u00bb]+)\u00bb/g)].map((m) => m[1]);
  const text = norm(eb);
  const missing = quotes.filter((q) => !text.includes(norm(q)));
  const long = quotes.filter((q) => words(norm(q)) > 15);

  const po = prose(orig).map(norm), pe = prose(eb).map(norm);
  const wo = po.reduce((a, s) => a + words(s), 0), we = pe.reduce((a, s) => a + words(s), 0);
  const dashes = prose(eb).map((p) => (p.match(/&mdash;|\u2014/g) || []).length);

  const pass = structOk && cellsOk && headsOk && missing.length === 0 && long.length === 0 && quotes.length > 0;
  ok = ok && pass;
  console.log(`${id}: ${pass ? 'PASS' : 'FAIL'} | tags ${to.length}/${te.length} identical=${structOk}${diffAt >= 0 ? ' firstDiff#' + diffAt : ''} | table cells ${co.length}/${ce.length} identical=${cellsOk} | headings identical=${headsOk} | ledger quotes ${quotes.length - missing.length}/${quotes.length} found, >15w=${long.length} | block words ${words(norm(orig))}->${words(text)} | prose words ${wo}->${we} (${(((we - wo) / wo) * 100).toFixed(1)}%) | max em-dash per prose paragraph ${Math.max(...dashes)}`);
  for (const q of missing) console.log('  MISSING: ' + q);
  for (const q of long) console.log('  TOO LONG: ' + q);
  if (!structOk && diffAt >= 0) console.log(`  orig: ${to[diffAt]}\n  edit: ${te[diffAt]}`);
}
console.log(ok ? 'ALL PASS' : 'FAILURES');
process.exit(ok ? 0 : 1);
