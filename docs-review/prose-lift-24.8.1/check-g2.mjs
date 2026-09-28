// Prose lift 24.8.1, group 2 (Academic Resources r7, r12, r14): structure, table-cell and ledger-quote check.
// Run from the repo root: node docs-review/prose-lift-24.8.1/check-g2.mjs
import { readFileSync, existsSync } from 'node:fs';

const DIR = 'docs-review/prose-lift-24.8.1';
const PAGES = [7, 12, 14];
const src = readFileSync('documents/resources-source.html', 'utf8').replace(/\r\n/g, '\n');
const ledgerPath = `${DIR}/g2-ledger.md`;
const ledger = existsSync(ledgerPath) ? readFileSync(ledgerPath, 'utf8') : null;

function originalBlock(n) {
  const start = src.indexOf(`<div class="resource-page" id="r${n}">`);
  const end = src.indexOf('\n</div>\n', start) + '\n</div>\n'.length;
  return src.slice(start, end);
}
const decode = (s) => s.replace(/&rsquo;|&lsquo;/g, "'").replace(/&ldquo;|&rdquo;/g, '"').replace(/&mdash;/g, '—')
  .replace(/&sect;/g, '§').replace(/&eacute;/g, 'é').replace(/&plus;/g, '+').replace(/&amp;/g, '&');
const tags = (h) => h.match(/<\/?[a-zA-Z][^>]*>/g);
const text = (h) => decode(h.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
const words = (s) => s.split(/\s+/).filter((w) => /[A-Za-z0-9$]/.test(w)).length;
const cells = (h) => h.match(/<t[dh]\b[^>]*>[\s\S]*?<\/t[dh]>/g) || [];
const heads = (h) => h.match(/<h[2-6]\b[^>]*>[\s\S]*?<\/h[2-6]>|<p style="[^"]*">[\s\S]*?<\/p>/g) || [];
const paras = (h) => (h.match(/<p>[\s\S]*?<\/p>|<div class="resource-intro">[\s\S]*?<\/div>/g) || []);
const maxDash = (h) => Math.max(0, ...paras(h).map((p) => (p.match(/&mdash;|—/g) || []).length));

function ledgerQuotes(n) {
  if (!ledger) return null;
  const sec = ledger.split(/\n## /).find((s) => s.startsWith(`r${n} `) || s.startsWith(`r${n}\n`));
  if (!sec) return [];
  return sec.split('\n').filter((l) => l.startsWith('|')).flatMap((l) => [...l.matchAll(/`([^`]+)`/g)].map((m) => m[1]));
}

let fail = 0;
const out = [];
for (const n of PAGES) {
  const orig = originalBlock(n);
  const edit = readFileSync(`${DIR}/r${n}.html`, 'utf8').replace(/\r\n/g, '\n');
  const tO = tags(orig), tE = tags(edit);
  const structure = JSON.stringify(tO) === JSON.stringify(tE);
  const cO = cells(orig), cE = cells(edit);
  const tableCells = JSON.stringify(cO) === JSON.stringify(cE);
  const headsOk = JSON.stringify(heads(orig)) === JSON.stringify(heads(edit));
  const qs = ledgerQuotes(n);
  const editText = text(edit);
  const missing = qs ? qs.filter((q) => !editText.includes(q)) : [];
  const long = qs ? qs.filter((q) => words(q) > 15) : [];
  const wO = words(text(orig)), wE = words(editText);
  const ok = structure && tableCells && headsOk && qs && qs.length > 0 && missing.length === 0 && long.length === 0;
  if (!ok) fail++;
  out.push(`r${n}: ${ok ? 'PASS' : 'FAIL'} | tags ${tE.length}/${tO.length} structure=${structure} | table cells ${cE.length}/${cO.length} identical=${tableCells} | headings+subtitle identical=${headsOk} | ledger quotes ${qs ? qs.length : 'no ledger'}, missing ${missing.length}, over15 ${long.length} | words ${wO}->${wE} (${(((wE - wO) / wO) * 100).toFixed(1)}%) | max em-dash/para ${maxDash(orig)}->${maxDash(edit)}`);
  for (const q of missing) out.push(`   missing: ${q}`);
  for (const q of long) out.push(`   over 15 words: ${q}`);
}
console.log(out.join('\n'));
console.log(fail ? `${fail} page(s) FAILED` : 'ALL PASS');
process.exit(fail ? 1 : 0);
