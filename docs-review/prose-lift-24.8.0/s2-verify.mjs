// Prose lift 24.8.0, session S2 verifier. Run from the repo root:
//   node docs-review/prose-lift-24.8.0/s2-verify.mjs
// Checks, per page: tag+attribute sequence, heading text, script/style/JSON-LD/comment
// blocks, all text outside running-prose elements, per-paragraph length, ledger quotes.
import { readFileSync } from 'node:fs';

const DIR = 'docs-review/prose-lift-24.8.0';
const PAGES = ['index.html', 'join.html', 'layers.html', 'audiobook.html'];
const EDITABLE = new Set(['p', 'li', 'blockquote', 'td']);
const VOID = new Set(['meta', 'link', 'img', 'source', 'input', 'br', 'hr', 'area', 'base', 'col', 'embed', 'wbr', 'path', 'circle']);
const TW = ['sticky', 'hidden', 'block', 'flex', 'grid', 'absolute', 'fixed', 'relative', 'static', 'inline', 'table', 'contents',
  'visible', 'invisible', 'italic', 'underline', 'truncate', 'uppercase', 'lowercase', 'capitalize', 'shadow', 'border', 'rounded',
  'container', 'transition', 'transform', 'grow', 'shrink', 'outline', 'ring', 'blur', 'collapse', 'isolate', 'resize', 'filter',
  'invert', 'sepia', 'grayscale', 'antialiased', 'ordinal', 'overline', 'lining', 'diagonal', 'hyphens', 'transparent'];

const decode = s => s
  .replace(/&nbsp;/g, ' ').replace(/&minus;/g, '−').replace(/&rsquo;|&lsquo;/g, "'")
  .replace(/&ldquo;|&rdquo;/g, '"').replace(/&mdash;/g, '—').replace(/&ndash;/g, '–')
  .replace(/&sect;/g, '§').replace(/&rarr;/g, '→').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
const norm = s => decode(s).replace(/\s+/g, ' ').trim();
const words = s => norm(s).split(' ').filter(w => /[\p{L}\p{N}$]/u.test(w));

function analyse(html) {
  const blocks = html.match(/<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>|<!--[\s\S]*?-->/g) || [];
  const body = html.replace(/<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>|<!--[\s\S]*?-->/g, '\u0000');
  const tokens = body.match(/<[^>]+>|[^<]+/g) || [];
  const tags = [], frozenText = [], headings = [], paras = [];
  const stack = [];
  let edit = null, head = null;
  for (const t of tokens) {
    if (t.startsWith('<')) {
      tags.push(t);
      if (edit) edit.text += ' ';
      const m = t.match(/^<(\/?)([a-zA-Z][\w-]*)/);
      if (!m) continue;
      const name = m[2].toLowerCase();
      if (m[1]) {
        const i = stack.lastIndexOf(name);
        if (i >= 0) stack.length = i;
        if (edit && edit.depth > stack.length) { paras.push(edit.text); edit = null; }
        if (head && head.depth > stack.length) { headings.push(norm(head.text)); head = null; }
      } else if (!VOID.has(name) && !t.endsWith('/>')) {
        stack.push(name);
        if (!edit && EDITABLE.has(name)) edit = { depth: stack.length, text: '' };
        if (!head && /^h[1-6]$/.test(name)) head = { depth: stack.length, text: '' };
      }
    } else {
      if (edit) edit.text += t; else frozenText.push(t);
      if (head) head.text += t;
    }
  }
  const text = norm(body.replace(/<[^>]+>/g, ' ').replace(/\u0000/g, ' ')).replace(/ ([,.:;!?)])/g, '$1');
  return { blocks, tags, frozenText, headings, paras, text,
    ld: blocks.filter(b => /application\/ld\+json/.test(b)).length,
    scripts: blocks.filter(b => b.startsWith('<script')).length,
    styles: blocks.filter(b => b.startsWith('<style')).length };
}

const eq = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);
const ledger = readFileSync(`${DIR}/s2-ledger.md`, 'utf8');
let failures = 0;
const fail = msg => { failures++; console.log('  FAIL ' + msg); };
let totO = 0, totE = 0;

for (const page of PAGES) {
  const O = analyse(readFileSync(page, 'utf8'));
  const E = analyse(readFileSync(`${DIR}/${page}`, 'utf8'));
  console.log(`\n${page}`);
  if (!eq(O.tags, E.tags)) fail(`tag/attribute sequence differs (${O.tags.length} vs ${E.tags.length})`);
  else console.log(`  tags+attributes identical: ${O.tags.length}/${E.tags.length}`);
  if (!eq(O.headings, E.headings)) fail('heading text differs');
  else console.log(`  headings identical: ${O.headings.length}`);
  if (!eq(O.blocks, E.blocks)) fail('script/style/comment blocks differ');
  else console.log(`  byte-identical blocks: ${O.scripts} script, ${O.styles} style, ${O.ld} JSON-LD, ${O.blocks.length - O.scripts - O.styles} comments`);
  if (!eq(O.frozenText, E.frozenText)) {
    const i = O.frozenText.findIndex((x, k) => x !== E.frozenText[k]);
    fail(`text outside prose elements differs at node ${i}: ${JSON.stringify(O.frozenText[i])} vs ${JSON.stringify(E.frozenText[i])}`);
  } else console.log(`  text outside prose elements identical: ${O.frozenText.length} nodes`);
  if (O.paras.length !== E.paras.length) fail('prose element count differs');
  let changed = 0, wo = 0, we = 0, dashO = 0, dashE = 0;
  const exempt = [];
  O.paras.forEach((p, i) => {
    const a = words(p).length, b = words(E.paras[i]).length;
    wo += a; we += b;
    const edited = norm(p) !== norm(E.paras[i]);
    if (edited) changed++;
    if (b > a) fail(`paragraph ${i} grew ${a} -> ${b}: ${norm(E.paras[i]).slice(0, 60)}`);
    const d = (E.paras[i].match(/—/g) || []).length;
    dashO = Math.max(dashO, (p.match(/—/g) || []).length); dashE = Math.max(dashE, d);
    if (d > 1 && edited) fail(`edited paragraph ${i} has ${d} em-dashes`);
    else if (d > 1) exempt.push(`${JSON.stringify(norm(p))} (${b} words, unchanged)`);
  });
  totO += wo; totE += we;
  console.log(`  prose elements: ${O.paras.length}, edited: ${changed}; words ${wo} -> ${we} (${((we - wo) / wo * 100).toFixed(1)}%); max em-dashes/paragraph ${dashO} -> ${dashE}`);
  if (exempt.length) console.log(`  em-dash exemption (short UI line left frozen): ${exempt.join('; ')}`);
  const origWords = new Set(words(O.text).map(w => w.toLowerCase().replace(/[^\p{L}-]/gu, '')));
  const added = [...new Set(E.paras.flatMap(p => words(p).map(w => w.toLowerCase().replace(/[^\p{L}-]/gu, ''))))].filter(w => w && !origWords.has(w));
  const twHits = added.filter(w => TW.includes(w));
  if (twHits.length) fail(`new Tailwind-utility tokens: ${twHits.join(', ')}`);
  else console.log(`  new words (${added.length}), none a bare Tailwind utility: ${added.join(' ')}`);
  const sec = ledger.split(/^## /m).find(s => s.startsWith(page));
  if (!sec) { fail('no ledger section'); continue; }
  const quotes = [...sec.matchAll(/«([^»]+)»/g)].map(m => m[1]);
  let ok = 0;
  for (const q of quotes) {
    const n = q.split(/\s+/).length;
    if (n > 15) fail(`quote over 15 words: ${q}`);
    else if (!E.text.includes(norm(q))) fail(`quote not in copy: ${q}`);
    else ok++;
  }
  console.log(`  ledger quotes found in copy: ${ok}/${quotes.length}`);
}
console.log(`\nTOTAL prose words ${totO} -> ${totE} (${((totE - totO) / totO * 100).toFixed(1)}%)`);
console.log(failures ? `\nRESULT: ${failures} failure(s)` : '\nRESULT: PASS');
process.exitCode = failures ? 1 : 0;
