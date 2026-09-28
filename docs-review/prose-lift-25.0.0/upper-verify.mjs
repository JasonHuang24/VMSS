// Upper-layer pages verifier: structure identity, frozen-block identity, ledger quotes present.
import fs from 'fs';

const root = 'F:/Programming/VMSS/VMSS Website/';
const dir = root + 'docs-review/prose-lift-25.0.0/';
const pages = ['layer-+1.html', 'layer-0.html'];
const ledgerPath = dir + 'upper-ledger.md';
const ledger = fs.existsSync(ledgerPath) ? fs.readFileSync(ledgerPath, 'utf8') : '';
// DS-06/DS-24 paragraphs (layer-0.html) where the ruling allows numbers to change.
const DS24 = ['He applies for a cross-layer', 'He arrives in Sanctuary on', 'By his third week'];

const ENT = { mdash: '\u2014', ndash: '\u2013', rsquo: "'", lsquo: "'", ldquo: '"', rdquo: '"', amp: '&', nbsp: ' ' };
const norm = (s) => s
  .replace(/<\/?(em|strong|span|a)\b[^>]*>/g, '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&([a-z]+);/g, (x, n) => (n in ENT ? ENT[n] : x))
  .replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"')
  .replace(/\s+/g, ' ').trim();
const words = (s) => s.split(' ').filter((w) => /[A-Za-z0-9]/.test(w)).length;
const PROSE = /<(p|li|td|blockquote)\b[^>]*>([\s\S]*?)<\/\1>/g;
const strip = (h) => h.replace(/<(script|style)\b[\s\S]*?<\/\1>/g, '<$1>');
const tags = (h) => [...strip(h).matchAll(/<[^>]+>/g)].map((m) => m[0]);
const blocks = (h) => [...h.matchAll(/<(script|style)\b[\s\S]*?<\/\1>/g)].map((m) => m[0]);
const heads = (h) => [...h.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/g)].map((m) => m[0]);
const prose = (h) => [...strip(h).matchAll(PROSE)].map((m) => m[2]);
const outside = (h) => strip(h).replace(PROSE, (m, t) => m.slice(0, m.indexOf('>') + 1) + '</' + t + '>');
const nums = (s) => (s.match(/\d[\d,.]*/g) || []).map((n) => n.replace(/[.,]$/, '')).sort().join('|');
const TW = ['static', 'fixed', 'absolute', 'relative', 'sticky', 'block', 'inline', 'flex', 'grid', 'hidden', 'table', 'contents', 'container', 'visible', 'invisible', 'collapse', 'isolate', 'grow', 'shrink', 'border', 'rounded', 'shadow', 'outline', 'ring', 'blur', 'invert', 'sepia', 'grayscale', 'filter', 'transform', 'transition', 'truncate', 'italic', 'underline', 'overline', 'uppercase', 'lowercase', 'capitalize', 'ordinal', 'resize', 'antialiased', 'prose'];
const tokens = (h) => new Set(h.split(/[^A-Za-z0-9_-]+/));
const visible = (h) => norm(h.replace(/<(script|style)\b[\s\S]*?<\/\1>/g, ' ').replace(/<head>[\s\S]*?<\/head>/, ' '));

let allPass = true;
for (const page of pages) {
  const o = fs.readFileSync(root + page, 'utf8');
  const e = fs.readFileSync(dir + page, 'utf8');
  const to = tags(o), te = tags(e);
  const diffAt = to.findIndex((t, i) => t !== te[i]);
  const tagOk = to.length === te.length && diffAt === -1;
  const bo = blocks(o), be = blocks(e);
  const blockOk = bo.length === be.length && bo.every((b, i) => b === be[i]);
  const ldCount = (o.match(/application\/ld\+json/g) || []).length;
  const ho = heads(o), he = heads(e);
  const headOk = ho.length === he.length && ho.every((x, i) => x === he[i]);
  const outOk = outside(o) === outside(e);

  const po = prose(o), pe = prose(e);
  let wo = 0, we = 0, changed = 0;
  const longer = [], dash = [], numDiff = [], numAllowed = [];
  let dsO = 0, dsE = 0;
  po.forEach((p, i) => {
    const a = words(norm(p)), b = words(norm(pe[i]));
    wo += a; we += b;
    if (p !== pe[i]) changed++;
    const inDs = page === 'layer-0.html' && DS24.some((s) => norm(p).startsWith(s));
    if (inDs) { dsO += a; dsE += b; } // DS-24 story-mode rewrite: length checked as one block
    else if (b > a) longer.push(`#${i} ${a}->${b}`);
    const d = (pe[i].match(/\u2014|&mdash;/g) || []).length;
    if (d > 1 && p !== pe[i]) dash.push(`#${i}=${d}`);
    if (nums(norm(p)) !== nums(norm(pe[i]))) {
      const ds = page === 'layer-0.html' && DS24.some((s) => norm(p).startsWith(s));
      (ds ? numAllowed : numDiff).push(`#${i} [${nums(norm(p))}] -> [${nums(norm(pe[i]))}]`);
    }
  });
  if (dsE > dsO) longer.push(`DS-24 block ${dsO}->${dsE}`);
  const twNew = TW.filter((t) => tokens(e).has(t) && !tokens(o).has(t));

  const sec = ledger.split(/^## /m).find((s) => s.startsWith(page)) || '';
  const visE = visible(e);
  const quotes = [...sec.matchAll(/\u00ab([^\u00bb]+)\u00bb/g)].map((m) => m[1]);
  const missing = quotes.filter((q) => !visE.includes(norm(q)));
  const long = quotes.filter((q) => words(norm(q)) > 15);

  const pass = tagOk && blockOk && headOk && outOk && longer.length === 0 && dash.length === 0 && numDiff.length === 0 && twNew.length === 0 && missing.length === 0 && long.length === 0 && quotes.length > 0;
  allPass = allPass && pass;
  console.log(`${page}: ${pass ? 'PASS' : 'FAIL'}`);
  console.log(`  tags ${to.length}/${te.length} identical=${tagOk}${diffAt >= 0 ? ' firstDiff#' + diffAt : ''}`);
  console.log(`  script/style blocks ${bo.length}/${be.length} byte-identical=${blockOk}; JSON-LD blocks in page: ${ldCount}`);
  console.log(`  headings ${ho.length}/${he.length} byte-identical=${headOk}`);
  console.log(`  everything outside p/li/td/blockquote bodies byte-identical=${outOk}`);
  console.log(`  prose elements ${po.length}/${pe.length}, changed ${changed}; words ${wo}->${we} (${(((we - wo) / wo) * 100).toFixed(1)}%); longer: ${longer.length ? longer.join(', ') : 'none'}${dsO ? `; DS-24 block ${dsO}->${dsE}` : ''}`);
  console.log(`  number changes outside DS-24: ${numDiff.length ? numDiff.join('; ') : 'none'}${numAllowed.length ? '; DS-24 (allowed): ' + numAllowed.join('; ') : ''}`);
  console.log(`  changed elements with >1 em-dash: ${dash.length ? dash.join(', ') : 'none'}; new Tailwind-utility tokens: ${twNew.length ? twNew.join(', ') : 'none'}`);
  console.log(`  ledger quotes ${quotes.length - missing.length}/${quotes.length} found, >15 words: ${long.length}`);
  for (const q of missing) console.log('  MISSING: ' + q);
  for (const q of long) console.log('  TOO LONG: ' + q);
  if (!tagOk && diffAt >= 0) console.log(`  orig: ${to[diffAt]}\n  edit: ${te[diffAt]}`);
}
process.exit(allPass ? 0 : 1);
