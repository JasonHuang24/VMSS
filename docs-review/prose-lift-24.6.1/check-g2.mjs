// Prose lift 24.6.1, group 2 (Academy q26-q27): structure, frozen-text and ledger-quote check.
// Run from the repo root: node docs-review/prose-lift-24.6.1/check-g2.mjs
import { readFileSync, existsSync } from 'node:fs';

const DIR = 'docs-review/prose-lift-24.6.1';
const PAGES = [26, 27];
const src = readFileSync('documents/academy-source.html', 'utf8');
const ledgerPath = `${DIR}/g2-ledger.md`;
const ledger = existsSync(ledgerPath) ? readFileSync(ledgerPath, 'utf8') : null;

function originalBlock(n) {
  const start = src.indexOf(`<div class="question-page" id="q${n}">`);
  const end = src.indexOf('\n\n\n<!--', start);
  return src.slice(start, end) + '\n';
}
const ENT = { rsquo: "'", lsquo: "'", ldquo: '"', rdquo: '"', mdash: '—', ndash: '–', sect: '§', middot: '·', amp: '&' };
const tags = (h) => h.match(/<\/?[a-zA-Z][^>]*>/g);
const text = (h) => h.replace(/<[^>]*>/g, ' ').replace(/&(\w+);/g, (m, e) => ENT[e] ?? m).replace(/\s+/g, ' ').trim();
const words = (s) => s.split(/\s+/).filter((w) => /[A-Za-z0-9$]/.test(w)).length;
const frozen = (h) => [
  ...h.match(/<div class="question-header">[\s\S]*?<\/div>\s*<\/div>/g),
  ...h.match(/<div class="question-box">[\s\S]*?<\/div>/g),
  ...h.match(/<div class="meta-row">[\s\S]*?<\/div>/g),
  ...h.match(/<span class="grade-label">[\s\S]*?<\/span>/g),
  ...h.match(/<h[34]>[\s\S]*?<\/h[34]>/g),
];
const prose = (h) => [
  ...h.matchAll(/<span class="grade-text">([\s\S]*?)<\/span><\/div>|<div class="(?:fail|deep)-section">([\s\S]*?)<\/div>/g),
].map((m) => (m[1] ?? m[2]).replace(/<h4>[\s\S]*?<\/h4>/, ''));
const paras = (h) => prose(h).flatMap((p) => p.split(/<br><br>|<\/p>\s*<p>/));
const maxDash = (h) => Math.max(...paras(h).map((p) => (p.match(/&mdash;/g) || []).length));

function ledgerQuotes(n) {
  if (!ledger) return null;
  const sec = ledger.split(/\n## /).find((s) => s.startsWith(`q${n} `) || s.startsWith(`q${n}\n`));
  if (!sec) return [];
  return sec.split('\n').filter((l) => l.startsWith('|')).flatMap((l) => [...l.matchAll(/`([^`]+)`/g)].map((m) => m[1]));
}

let fail = 0;
const out = [];
for (const n of PAGES) {
  const orig = originalBlock(n);
  const edit = readFileSync(`${DIR}/q${n}.html`, 'utf8');
  const tO = tags(orig), tE = tags(edit);
  const structure = JSON.stringify(tO) === JSON.stringify(tE);
  const boxO = orig.match(/<div class="question-box">([\s\S]*?)<\/div>/)[1];
  const boxE = edit.match(/<div class="question-box">([\s\S]*?)<\/div>/)[1];
  const box = Buffer.from(boxO).equals(Buffer.from(boxE));
  const fz = JSON.stringify(frozen(orig)) === JSON.stringify(frozen(edit));
  const qs = ledgerQuotes(n);
  const editText = text(edit);
  const missing = qs ? qs.filter((q) => !editText.includes(q)) : [];
  const long = qs ? qs.filter((q) => words(q) > 15) : [];
  const wO = words(text(orig)), wE = words(editText);
  const pO = words(text(prose(orig).join(' '))), pE = words(text(prose(edit).join(' ')));
  const ok = structure && box && fz && qs && qs.length > 0 && missing.length === 0 && long.length === 0;
  if (!ok) fail++;
  out.push(`q${n}: ${ok ? 'PASS' : 'FAIL'} | tags ${tE.length}/${tO.length} structure=${structure} box=${box} frozenText=${fz} | ledger quotes ${qs ? qs.length : 'no ledger'}, missing ${missing.length}, over15 ${long.length} | words ${wO}->${wE} (${(((wE - wO) / wO) * 100).toFixed(1)}%), prose ${pO}->${pE} (${(((pE - pO) / pO) * 100).toFixed(1)}%) | max em-dash/para ${maxDash(orig)}->${maxDash(edit)}`);
  for (const q of missing) out.push(`   missing: ${q}`);
  for (const q of long) out.push(`   over 15 words: ${q}`);
}
console.log(out.join('\n'));
console.log(fail ? `${fail} page(s) FAILED` : 'ALL PASS');
process.exit(fail ? 1 : 0);
