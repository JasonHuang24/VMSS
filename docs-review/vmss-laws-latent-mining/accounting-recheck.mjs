// Independent re-derivation of the Phase M id accounting from the COMMITTED
// annex notes + inventory only — no reliance on the uncommitted assign.mjs or
// the workflow JSON that the synthesis pass failed to return (inventory:1571's
// "returned JSON's `excluded` array" reference is dangling; this file replaces it).
//
// Run from the repo root: node docs-review/vmss-laws-latent-mining/accounting-recheck.mjs
// Rewrites accounting-recheck.json beside itself. Architect review tool (Fix Pack B1);
// re-run after ANY edit to the inventory or annex and commit the regenerated JSON.
import { readFileSync, writeFileSync } from 'node:fs';

const MINING = 'docs-review/vmss-laws-latent-mining';
const INVENTORY = 'docs-review/vmss-laws-latent-inventory.md';
const FILES = {
  'mine-faq-front.md': 'faq-front', 'mine-layers-sads.md': 'layers-sads',
  'mine-path2-record.md': 'path2-record', 'mine-sims.md': 'sims',
  'mine-systems.md': 'systems', 'mine-technologies.md': 'technologies',
  'mine-world.md': 'world', 'mine-wp-01-08.md': 'wp-01-08',
  'mine-wp-09-12.md': 'wp-09-12', 'mine-wp-13-16.md': 'wp-13-16',
  'mine-wp-17-19.md': 'wp-17-19', 'mine-wp-20-22.md': 'wp-20-22',
  'mine-wp-23-26.md': 'wp-23-26', 'mine-wp-27-34.md': 'wp-27-34',
};

// Mined-class sniffing. The annex formats are heterogeneous (three table shapes,
// ### heading entries, bold-inline entries): table rows classify from their own
// line only; heading entries from the block to the next entry (≤12 lines).
const classify = (text) => {
  if (/charter-home-excluded|\bCHX\b/.test(text)) return 'CHX';
  if (/schedule-under-authority|\bSUA\b/.test(text)) return 'SUA';
  if (/founding-act|\bFA\b/.test(text)) return 'FA';
  if (/regulatory-flag|\bRF\b/.test(text)) return 'RF';
  if (/gap-flag|\bGF\b/.test(text)) return 'GF';
  if (/not-law|\bNL\b/.test(text)) return 'NL';
  if (/ambiguous|\bAMB\b/.test(text)) return 'AMB';
  return '(unknown)';
};

const pool = new Map(); // id -> {file, minedClass}
for (const [file, prefix] of Object.entries(FILES)) {
  const lines = readFileSync(`${MINING}/${file}`, 'utf8').split('\n');
  const idRe = new RegExp(`\\b(${prefix}-\\d+[a-z]?)\\b`, 'g');
  const firstLine = new Map();
  lines.forEach((l, i) => {
    for (const m of l.matchAll(idRe)) if (!firstLine.has(m[1])) firstLine.set(m[1], i);
  });
  const defs = [...firstLine.entries()].sort((a, b) => a[1] - b[1]);
  defs.forEach(([id, ln], k) => {
    const isRow = lines[ln].trimStart().startsWith('|');
    const end = isRow ? ln + 1 : Math.min(k + 1 < defs.length ? defs[k + 1][1] : lines.length, ln + 12);
    const block = lines.slice(ln, Math.max(end, ln + 1)).join('\n');
    if (!pool.has(id)) pool.set(id, { file, minedClass: classify(block) });
  });
}

const invLines = readFileSync(INVENTORY, 'utf8').split('\n');
const idxOf = (p) => invLines.findIndex((l) => l.includes(p));
const P1 = idxOf('## PART 1'); const P2 = idxOf('## PART 2');
const RESID = idxOf('### Residual exclusion block');
const P3 = idxOf('## PART 3'); const P4 = idxOf('## PART 4');

// Full ids set a prefix; bare "-NN" tokens continue it ONLY when adjacent
// (≤3 chars — "wp-09-12-50, -51" expands; prose layer tokens like "-3 Terminal" don't).
function extractIds(text) {
  const out = [];
  const tokRe = /\b((?:wp-\d\d-\d\d|systems|technologies|world|layers-sads|sims|faq-front|path2-record))-(\d+[a-z]?)\b|(?:(?<=[\s,(])|^)-(\d+[a-z]?)\b/g;
  let m; let lastPrefix = null; let lastEnd = -99;
  while ((m = tokRe.exec(text)) !== null) {
    if (m[1]) { lastPrefix = m[1]; lastEnd = tokRe.lastIndex; out.push(`${m[1]}-${m[2]}`); }
    else if (m[3] && lastPrefix && m.index - lastEnd <= 3) { lastEnd = tokRe.lastIndex; out.push(`${lastPrefix}-${m[3]}`); }
  }
  return out;
}

const assigned = new Set();
for (let i = P1; i < P2; i++) {
  if (invLines[i].includes('**candidate ids**')) for (const id of extractIds(invLines[i])) assigned.add(id);
}
const namedExcl = new Set(extractIds(invLines.slice(P2, RESID).join('\n')));
const flagged = new Set(extractIds(invLines.slice(P3, P4).join('\n')));
const promoted = new Set(['path2-record-121', 'path2-record-129']);

const ledger = {};
for (const [id, { file, minedClass }] of [...pool.entries()].sort()) {
  const disposition = assigned.has(id) ? 'assigned'
    : flagged.has(id) ? 'flag-cited'
    : namedExcl.has(id) ? 'named-excluded'
    : (id.startsWith('path2-record-') && !promoted.has(id)) ? 'path2-categorical-excluded'
    : 'residual-undispositioned';
  ledger[id] = { file: file.replace('mine-', '').replace('.md', ''), minedClass, disposition };
}
const phantom = [...new Set([...assigned, ...namedExcl, ...flagged])].filter((id) => !pool.has(id));
const suspicious = Object.entries(ledger)
  .filter(([, v]) => v.disposition === 'residual-undispositioned'
    && ['FA', 'SUA', 'AMB', 'RF', 'GF', '(unknown)'].includes(v.minedClass)
    && !v.file.startsWith('sims'))
  .map(([id]) => id);

const summary = {
  poolTotal: pool.size,
  dispositions: {},
  phantomRefs: phantom,
  suspiciousResiduals: suspicious,
  note: 'pool derived from committed annex notes; prior claims (pool 1,320/1,321; 121+640=731) do not reconcile against them',
};
for (const v of Object.values(ledger)) summary.dispositions[v.disposition] = (summary.dispositions[v.disposition] || 0) + 1;
writeFileSync(`${MINING}/accounting-recheck.json`, `${JSON.stringify({ summary, ledger }, null, 1)}\n`);
console.log(JSON.stringify(summary, null, 2));
