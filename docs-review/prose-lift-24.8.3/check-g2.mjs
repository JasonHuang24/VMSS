// Prose lift 24.8.3, group 2 (Resources r23, r24): structure, table, heading, number and ledger-quote check.
// Run from the repo root: node docs-review/prose-lift-24.8.3/check-g2.mjs
import { readFileSync, existsSync } from 'node:fs';

const DIR = 'docs-review/prose-lift-24.8.3';
const PAGES = [23, 24];
const src = readFileSync('documents/resources-source.html', 'utf8');
const ledgerPath = `${DIR}/g2-ledger.md`;
const ledger = existsSync(ledgerPath) ? readFileSync(ledgerPath, 'utf8') : null;

function originalBlock(n) {
  const start = src.indexOf(`<div class="resource-page" id="r${n}">`);
  const end = src.indexOf('\n\n\n<!--', start);
  return src.slice(start, end) + '\n';
}
const tags = (h) => h.match(/<\/?[a-zA-Z][^>]*>/g);
const cells = (h) => h.match(/<t[dh][^>]*>[\s\S]*?<\/t[dh]>/g) || [];
const heads = (h) => h.match(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>|<p style=[^>]*>[\s\S]*?<\/p>|<strong>[\s\S]*?<\/strong>|<em>[\s\S]*?<\/em>/g) || [];
const text = (h) => h.replace(/<[^>]*>/g, ' ')
  .replace(/&[rl]squo;/g, "'").replace(/&[rl]dquo;/g, '"').replace(/&mdash;/g, '—').replace(/&ndash;/g, '–')
  .replace(/&sect;/g, '§').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const words = (s) => s.split(/\s+/).filter((w) => /[A-Za-z0-9$]/.test(w)).length;
const nums = (s) => [...new Set((s.match(/[+-]?\d[\d,.]*%?\+?/g) || []).map((x) => x.replace(/[.,]+$/, '')))].sort();
const maxDash = (h) => Math.max(...(h.match(/<p>[\s\S]*?<\/p>|<div class="resource-intro">[\s\S]*?<\/div>/g) || []).map((p) => (p.match(/&mdash;|—/g) || []).length));

function ledgerQuotes(n) {
  if (!ledger) return null;
  const sec = ledger.split(/\n## /).find((s) => s.startsWith(`r${n} `));
  if (!sec) return [];
  return sec.split('\n').filter((l) => l.startsWith('|')).flatMap((l) => [...l.matchAll(/`([^`]+)`/g)].map((m) => m[1]));
}

let fail = 0;
for (const n of PAGES) {
  const orig = originalBlock(n);
  const edit = readFileSync(`${DIR}/r${n}.html`, 'utf8');
  const structure = JSON.stringify(tags(orig)) === JSON.stringify(tags(edit));
  const table = JSON.stringify(cells(orig)) === JSON.stringify(cells(edit));
  const frozen = JSON.stringify(heads(orig)) === JSON.stringify(heads(edit));
  const nO = nums(text(orig)), nE = nums(text(edit));
  const numbers = JSON.stringify(nO) === JSON.stringify(nE);
  const qs = ledgerQuotes(n);
  const et = text(edit);
  const missing = qs ? qs.filter((q) => !et.includes(q)) : [];
  const long = qs ? qs.filter((q) => words(q) > 15) : [];
  const wO = words(text(orig)), wE = words(et);
  const ok = structure && table && frozen && numbers && qs && qs.length > 0 && !missing.length && !long.length;
  if (!ok) fail++;
  console.log(`r${n}: ${ok ? 'PASS' : 'FAIL'} | tags ${tags(edit).length}/${tags(orig).length} identical=${structure} | table cells ${cells(edit).length}/${cells(orig).length} identical=${table} | headings/subtitle/strong/em identical=${frozen} | number set identical=${numbers} | ledger quotes ${qs ? qs.length : 'no ledger'}, missing ${missing.length}, over15 ${long.length} | words ${wO}->${wE} (${(((wE - wO) / wO) * 100).toFixed(1)}%) | max em-dash/para ${maxDash(orig)}->${maxDash(edit)}`);
  if (!numbers) console.log(`   numbers orig ${nO.join(' ')}\n   numbers edit ${nE.join(' ')}`);
  for (const q of missing) console.log(`   missing: ${q}`);
  for (const q of long) console.log(`   over 15 words: ${q}`);
}
console.log(fail ? `${fail} page(s) FAILED` : 'ALL PASS');
process.exit(fail ? 1 : 0);
