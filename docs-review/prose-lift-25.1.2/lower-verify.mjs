// Structure + ledger check for the 25.1.2 doctrine-fix copies (lower-layer and mechanism pages).
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..', '..');
const pages = ['layer--3.html', 'layer--2.html', 'systems.html', 'roadmap.html'];
const ledger = readFileSync(join(here, 'lower-ledger.md'), 'utf8');

const blocks = (h) => [...h.matchAll(/<(script|style)\b[\s\S]*?<\/\1>/gi)].map((m) => m[0]);
const strip = (h) => h.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, '');
const tags = (h) => [...strip(h).matchAll(/<\/?[a-zA-Z][^>]*>/g)].map((m) => m[0]);
const headings = (h) => [...strip(h).matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => m[0]);
const prose = (h) => [...strip(h).matchAll(/<(p|li|blockquote|td)\b[^>]*>([\s\S]*?)<\/\1>/gi)]
  .map((m) => m[2].replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' '));
const words = (s) => s.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;

// Ledger sections: "## <page>" then quotes in «...»
const sections = {};
let cur = null;
for (const line of ledger.split(/\r?\n/)) {
  const m = line.match(/^## (\S+\.html)/);
  if (m) { cur = m[1]; sections[cur] = []; continue; }
  if (cur) for (const q of line.matchAll(/«([^»]+)»/g)) sections[cur].push(q[1]);
}

let ok = true;
for (const p of pages) {
  const a = readFileSync(join(root, p), 'utf8');
  const b = readFileSync(join(here, p), 'utf8');
  const tagEq = JSON.stringify(tags(a)) === JSON.stringify(tags(b));
  const headEq = JSON.stringify(headings(a)) === JSON.stringify(headings(b));
  const blkEq = JSON.stringify(blocks(a)) === JSON.stringify(blocks(b));
  const pa = prose(a), pb = prose(b);
  const wa = pa.reduce((n, s) => n + words(s), 0), wb = pb.reduce((n, s) => n + words(s), 0);
  const changed = pa.map((s, i) => [s, pb[i]]).filter(([x, y]) => x !== y);
  const cwa = changed.reduce((n, [x]) => n + words(x), 0), cwb = changed.reduce((n, [, y]) => n + words(y), 0);
  const quotes = sections[p] || [];
  const missing = quotes.filter((q) => !b.includes(q));
  const long = quotes.filter((q) => words(q) > 15);
  const pass = tagEq && headEq && blkEq && pa.length === pb.length && quotes.length > 0 && !missing.length && !long.length;
  ok &&= pass;
  console.log(`${p}: ${pass ? 'PASS' : 'FAIL'} | tags ${tags(a).length}=${tagEq} headings ${headings(a).length}=${headEq} script/style/JSON-LD ${blocks(a).length}=${blkEq} | prose words ${wa}->${wb}, changed elements ${changed.length} (${cwa}->${cwb}) | ledger quotes ${quotes.length}, missing ${missing.length}, over-15 ${long.length}`);
  for (const q of missing) console.log('  MISSING: ' + q);
  for (const q of long) console.log('  TOO LONG: ' + q);
}
console.log(ok ? 'ALL PASS' : 'FAILURES');
process.exit(ok ? 0 : 1);
