// Prose lift 24.8.1 group 1 (r3, r5): structure + ledger check.
// Usage: node docs-review/prose-lift-24.8.1/check-g1.mjs
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(join(here, '../../documents/resources-source.html'), 'utf8');
const ledger = readFileSync(join(here, 'g1-ledger.md'), 'utf8');
const pages = ['r3', 'r5'];

function block(html, id) {
  const open = `<div class="resource-page" id="${id}">`;
  const start = html.indexOf(open);
  if (start < 0) throw new Error(`missing ${id}`);
  const re = /<\/?div\b[^>]*>/g;
  re.lastIndex = start;
  let depth = 0, m;
  while ((m = re.exec(html))) {
    depth += m[0][1] === '/' ? -1 : 1;
    if (depth === 0) return html.slice(start, re.lastIndex);
  }
  throw new Error(`unclosed ${id}`);
}
const decode = s => s
  .replace(/&rsquo;|&lsquo;/g, "'").replace(/&ldquo;|&rdquo;/g, '"')
  .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').replace(/&sect;/g, '§')
  .replace(/&deg;/g, '°').replace(/&middot;/g, '·').replace(/&amp;/g, '&')
  .replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
const text = h => decode(h.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const tags = h => h.match(/<[^>]+>/g);
const cells = h => (h.match(/<t[dh]\b[^>]*>[\s\S]*?<\/t[dh]>/g) || []);
const heads = h => (h.match(/<h[1-6]\b[^>]*>[\s\S]*?<\/h[1-6]>/g) || []);
const nums = h => (text(h).match(/\d[\d,.:]*/g) || []).map(n => n.replace(/[.,:]$/, '')).sort();
const words = h => text(h).split(' ').filter(w => /[A-Za-z0-9]/.test(w)).length;

let fail = 0;
const out = [];
for (const id of pages) {
  const orig = block(src, id);
  const edit = readFileSync(join(here, `${id}.html`), 'utf8').trim();
  const t0 = tags(orig), t1 = tags(edit);
  const tagsOk = t0.length === t1.length && t0.every((t, i) => t === t1[i]);
  const c0 = cells(orig), c1 = cells(edit);
  const cellsOk = c0.length === c1.length && c0.every((c, i) => c === c1[i]);
  const h0 = heads(orig), h1 = heads(edit);
  const headsOk = h0.length === h1.length && h0.every((c, i) => c === h1[i]);
  const n0 = new Set(nums(orig)), n1 = new Set(nums(edit));
  const lostNums = [...n0].filter(n => !n1.has(n));
  const addedNums = [...n1].filter(n => !n0.has(n));
  const sec = ledger.split(/^## /m).find(s => s.startsWith(id + ' '));
  if (!sec) throw new Error(`ledger section for ${id} missing`);
  const claims = sec.split(/^Word counts/m)[0];
  const quotes = [...claims.matchAll(/`([^`]+)`/g)].map(m => decode(m[1]));
  const body = text(edit);
  const missing = quotes.filter(q => !body.includes(q));
  const long = quotes.filter(q => q.split(/\s+/).length > 15);
  const paras = edit.match(/<p\b[^>]*>[\s\S]*?<\/p>|<div class="resource-intro">[\s\S]*?<\/div>/g);
  const dashParas = paras.filter(p => (p.match(/&mdash;/g) || []).length > 1).length;
  const ok = tagsOk && cellsOk && headsOk && !missing.length && !long.length && !lostNums.length && !addedNums.length;
  if (!ok) fail++;
  out.push(`${id}: tags ${tagsOk ? 'identical' : 'DIFFER'} (${t0.length}/${t1.length}); table cells ${cellsOk ? 'identical' : 'DIFFER'} (${c0.length}); headings ${headsOk ? 'identical' : 'DIFFER'} (${h0.length}); number set ${lostNums.length || addedNums.length ? `DIFFERS lost=${lostNums} added=${addedNums}` : `identical (${n0.size})`}; ledger quotes ${quotes.length - missing.length}/${quotes.length} found${long.length ? `, ${long.length} over 15 words` : ''}; words ${words(orig)} -> ${words(edit)} (${((words(edit) / words(orig) - 1) * 100).toFixed(1)}%); paragraphs with >1 em-dash: ${dashParas}`);
  for (const q of missing) out.push(`  MISSING: ${q}`);
  for (const q of long) out.push(`  LONG: ${q}`);
}
console.log(out.join('\n'));
console.log(fail ? `FAIL (${fail} page(s))` : 'PASS');
process.exit(fail ? 1 : 0);
