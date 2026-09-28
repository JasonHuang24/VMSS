import fs from 'node:fs';
const root = 'F:/Programming/VMSS/VMSS Website/';
const src = fs.readFileSync(root + 'documents/resources-source.html', 'utf8').replace(/\r\n/g, '\n');
const ledgerPath = root + 'docs-review/prose-lift-24.8.1/g3-ledger.md';
const ledger = fs.existsSync(ledgerPath) ? fs.readFileSync(ledgerPath, 'utf8').replace(/\r\n/g, '\n') : '';
const block = (html, id) => {
  const start = html.indexOf(`<div class="resource-page" id="${id}">`);
  const end = html.indexOf('\n</div>', start);
  return html.slice(start, end + 7);
};
const tags = h => h.match(/<[^>]+>/g);
const cells = h => h.match(/<t[dh][^>]*>[\s\S]*?<\/t[dh]>/g) || [];
const ent = { rsquo: "'", lsquo: "'", ldquo: '"', rdquo: '"', mdash: '—', ndash: '–', sect: '§', amp: '&', minus: '−', times: '×', nbsp: ' ' };
const text = h => h.replace(/<[^>]+>/g, ' ').replace(/&(\w+);/g, (m, e) => ent[e] ?? m).replace(/\s+/g, ' ');
const words = h => text(h).trim().split(' ').filter(w => /\w/.test(w)).length;
const dashMax = h => Math.max(...(h.match(/<(p|div class="resource-intro")[\s\S]*?<\/(p|div)>/g) || []).map(p => (p.match(/&mdash;/g) || []).length));
let ok = true;
for (const id of ['r15', 'r16']) {
  const orig = block(src, id);
  const ed = fs.readFileSync(root + `docs-review/prose-lift-24.8.1/${id}.html`, 'utf8').replace(/\r\n/g, '\n');
  const tagsSame = JSON.stringify(tags(orig)) === JSON.stringify(tags(ed));
  const cellsSame = JSON.stringify(cells(orig)) === JSON.stringify(cells(ed));
  const sec = ledger.split(/^## /m).find(s => s.startsWith(id + '\n')) || '';
  const quotes = [...sec.matchAll(/`([^`]+)`/g)].map(m => m[1]);
  const t = text(ed);
  const missing = quotes.filter(q => !t.includes(q));
  const long = quotes.filter(q => q.split(/\s+/).length > 15);
  if (!tagsSame || !cellsSame || missing.length || long.length || !quotes.length) ok = false;
  console.log(`${id}: tags ${tagsSame ? 'identical' : 'DIFFER'} (${tags(ed).length}); table cells ${cellsSame ? 'identical' : 'DIFFER'} (${cells(ed).length}); words ${words(orig)} -> ${words(ed)} (${((words(ed) / words(orig) - 1) * 100).toFixed(1)}%); max em-dashes/para ${dashMax(orig)} -> ${dashMax(ed)}; ledger quotes ${quotes.length - missing.length}/${quotes.length} found; >15 words: ${long.length}`);
  missing.forEach(q => console.log('  MISSING: ' + q));
  long.forEach(q => console.log('  TOO LONG: ' + q));
}
console.log(ok ? 'ALL CHECKS PASS' : 'CHECK FAILED');
