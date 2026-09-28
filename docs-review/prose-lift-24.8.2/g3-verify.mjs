import fs from 'node:fs';
const root = 'F:/Programming/VMSS/VMSS Website/';
const dir = root + 'docs-review/prose-lift-24.8.2/';
const src = fs.readFileSync(root + 'documents/resources-source.html', 'utf8').replace(/\r\n/g, '\n');
const ledgerPath = dir + 'g3-ledger.md';
const ledger = fs.existsSync(ledgerPath) ? fs.readFileSync(ledgerPath, 'utf8').replace(/\r\n/g, '\n') : '';
const block = (html, id) => {
  const start = html.indexOf(`<div class="resource-page" id="${id}">`);
  const end = html.indexOf('\n</div>', start);
  return html.slice(start, end + 7);
};
const tags = h => h.match(/<[^>]+>/g);
const cells = h => h.match(/<t[dh][^>]*>[\s\S]*?<\/t[dh]>/g) || [];
const frozen = h => [...(h.match(/<h[2-4][^>]*>[\s\S]*?<\/h[2-4]>|<strong>[\s\S]*?<\/strong>|<p style=[\s\S]*?<\/p>/g) || [])];
const ent = { rsquo: "'", lsquo: "'", ldquo: '"', rdquo: '"', mdash: '—', ndash: '–', sect: '§', amp: '&', minus: '−', times: '×', nbsp: ' ', rarr: '→', middot: '·', aacute: 'á' };
const text = h => h.replace(/<[^>]+>/g, ' ').replace(/&(\w+);/g, (m, e) => ent[e] ?? m).replace(/\s+/g, ' ');
const words = h => text(h).trim().split(' ').filter(w => /\w/.test(w)).length;
const dashMax = h => Math.max(...(h.match(/<(p|li|div class="resource-intro")[\s\S]*?<\/(p|li|div)>/g) || []).map(p => (p.match(/&mdash;/g) || []).length));
let ok = true;
for (const id of ['r11', 'r13']) {
  const orig = block(src, id);
  const ed = fs.readFileSync(dir + `${id}.html`, 'utf8').replace(/\r\n/g, '\n');
  const tagsSame = JSON.stringify(tags(orig)) === JSON.stringify(tags(ed));
  const cellsSame = JSON.stringify(cells(orig)) === JSON.stringify(cells(ed));
  const frozenSame = JSON.stringify(frozen(orig)) === JSON.stringify(frozen(ed));
  const sec = ledger.split(/^## /m).find(s => s.startsWith(id + '\n')) || '';
  const quotes = [...sec.matchAll(/`([^`]+)`/g)].map(m => m[1]);
  const t = text(ed);
  const missing = quotes.filter(q => !t.includes(q));
  const long = quotes.filter(q => q.split(/\s+/).length > 15);
  if (!tagsSame || !cellsSame || !frozenSame || missing.length || long.length || !quotes.length) ok = false;
  console.log(`${id}: tags ${tagsSame ? 'identical' : 'DIFFER'} (${tags(ed).length}); table cells ${cellsSame ? 'identical' : 'DIFFER'} (${cells(ed).length}); headings/labels/subtitle ${frozenSame ? 'identical' : 'DIFFER'}; words ${words(orig)} -> ${words(ed)} (${((words(ed) / words(orig) - 1) * 100).toFixed(1)}%); max em-dashes/para ${dashMax(orig)} -> ${dashMax(ed)}; ledger quotes ${quotes.length - missing.length}/${quotes.length} found; >15 words: ${long.length}`);
  missing.forEach(q => console.log('  MISSING: ' + q));
  long.forEach(q => console.log('  TOO LONG: ' + q));
}
console.log(ok ? 'ALL CHECKS PASS' : 'CHECK FAILED');
