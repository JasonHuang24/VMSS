#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { evaluateCertification } from './verify-path2-certification-2294.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA_FILE = 'documents/path-2-certification-2294-data.json';
const OUTPUT_FILE = 'path-2-certification-2294.html';
const data = JSON.parse(readFileSync(join(ROOT, DATA_FILE), 'utf8'));
const result = evaluateCertification(data);
if (!result.scheduleACertified || !result.scheduleBCertified || !result.notice) {
  throw new Error('Refusing to generate a certification page from a non-certifying record');
}

const esc = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);
const pass = (value) => `<span class="cert-pass">${value ? 'PASS' : 'FAIL'}</span>`;
const row = (name, evidence, ok) => `<tr><td>${name}</td><td>${evidence}</td><td>${pass(ok)}</td></tr>`;

const findings = [
  row('Finding I — institutional adequacy', `Worst projected coverage lower bound ${result.metrics.findingICoverageMinimum.toFixed(3)} against 1.000`, result.findings.I),
  row('Finding II — ADT elasticity', 'Every projected dividend lower bound remains above the 100.00 baseline and every schedule-effect lower bound remains nonnegative', result.findings.II),
  row('Finding III — concentration response', `SCM activation upper bound ${result.metrics.findingIIIActivationUpperBound.toFixed(2)} against ceiling ${result.metrics.findingIIIActivationCeiling.toFixed(2)}; minimum Flow ${result.metrics.findingIIIFlowMinimum.toFixed(3)} against 0.500`, result.findings.III),
  row('Finding IV — retained-capital utility', `Net marginal-value lower bound ${data.sourceInputs.findingIV.netMarginalValueLowerBound.toFixed(2)}; attributable concentration-event upper bound 0`, result.findings.IV),
].join('');

const scheduleA = [
  ['A1 — provenance', '2292 lock complete; authored trigger values excluded'],
  ['A2 — Main current coverage', `${(data.sourceInputs.scheduleA.mainCurrentCoverage * 100).toFixed(1)}% against 105%`],
  ['A3 — Main monthly floor', `${(data.sourceInputs.scheduleA.mainMonthlyCoverageMinimum * 100).toFixed(1)}% minimum against 100%`],
  ['A4 — Main forward floor', `${(data.sourceInputs.scheduleA.mainForwardCoverageMinimum * 100).toFixed(1)}% minimum against 100%`],
  ['A5 — dividend aggregate', `${(data.sourceInputs.scheduleA.dividendAggregateCoverage * 100).toFixed(1)}% against 120%`],
  ['A6 — dividend monthly floor', `${(data.sourceInputs.scheduleA.dividendMonthlyCoverageMinimum * 100).toFixed(1)}% minimum against 100%`],
  ['A7 — stream separation', 'Income tax, ADT, SCM recycle, Lower receipts, and backfill remain separately attributed'],
  ['A8 — reproducibility', 'The committed dataset and verifier reproduce every disposition'],
].map(([name, evidence], index) => row(name, evidence, result.scheduleAConditions[`A${index + 1}`])).join('');

const bEvidence = {
  B1: 'Every -1, -2, and -3 collection route reconciles in full to its lawful destination',
  B2: 'Every funded obligation, order of payment, and available non-tax source is enumerated by layer',
  B3: 'Li(m) and Oi(m) publish at 25%, 12.5%, and 6.25%; prohibited cross-credits are excluded',
  B4: Object.entries(result.metrics.scheduleBCoverage).map(([layer, value]) => `${layer}: ${(value * 100).toFixed(2)}% aggregate with every month at or above 100%`).join(' · '),
  B5: Object.entries(data.sourceInputs.scheduleB.layers).map(([layer, value]) => `${layer}: ${(value.forwardCoverageMinimum * 100).toFixed(1)}% minimum`).join(' · '),
  B6: 'Monthly quantities and methods publish, and Path 2 independently adopts the fiscal quantities',
};
const scheduleB = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6']
  .map((condition) => row(condition, bEvidence[condition], result.scheduleBConditions[condition])).join('');

const chronology = data.chronology.map((entry) => `<li><strong>${esc(entry.year ?? entry.years)}:</strong> ${esc(entry.event)}</li>`).join('');

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#07090f" media="(prefers-color-scheme: dark)" />
  <meta name="theme-color" content="#f5f7fb" media="(prefers-color-scheme: light)" />
  <title>LP-074 Path 2 Certification — 2294 • The Five Rings</title>
  <meta name="description" content="The controlling 2294 Path 2 certification: Findings I–IV and Schedule B B1–B6 passed; LP-074's 50 / 25 / 12.5 / 6.25 cascade entered force in 2295." />
  <meta name="robots" content="noindex, follow" />
  <link rel="canonical" href="https://jasonhchronicles.com/VMSS/${OUTPUT_FILE}" />
  <link rel="stylesheet" href="assets/css/tailwind.css" />
  <link rel="stylesheet" href="styles.css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js" defer></script>
  <style>
    .cert-shell{max-width:76rem;margin:0 auto}.cert-banner{border:1px solid color-mix(in srgb,var(--accent) 55%,var(--border));border-radius:14px;padding:1.25rem 1.4rem;background:color-mix(in srgb,var(--accent) 9%,var(--bg-secondary));color:var(--text-secondary);line-height:1.75}.cert-banner strong{color:var(--text-primary)}
    .cert-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(205px,1fr));gap:1rem;margin:1.5rem 0 2.25rem}.cert-card{padding:1rem;border:1px solid var(--border);border-radius:12px;background:var(--bg-secondary);color:var(--text-secondary)}.cert-card .label{display:block;font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;color:var(--text-muted);margin-bottom:.35rem}.cert-card .value{color:var(--text-primary);font-size:1.15rem;font-weight:700}
    .cert-table-wrap{overflow-x:auto;border:1px solid var(--border);border-radius:10px;margin:1rem 0 1.75rem}.cert-table{width:100%;border-collapse:collapse;min-width:680px;color:var(--text-secondary);font-size:.92rem}.cert-table th,.cert-table td{padding:.72rem .85rem;text-align:left;vertical-align:top;border-bottom:1px solid var(--border)}.cert-table th{background:var(--bg-tertiary);color:var(--text-primary)}.cert-table tr:last-child td{border-bottom:0}.cert-pass{color:#34d399;font-weight:700;white-space:nowrap}
    .cert-links{display:flex;gap:.75rem;flex-wrap:wrap;margin:1.4rem 0 2.4rem}.cert-links a{display:inline-flex;align-items:center;gap:.45rem;border:1px solid var(--border);border-radius:999px;padding:.5rem .9rem;color:var(--text-secondary);text-decoration:none}.cert-links a:hover{border-color:var(--accent);color:var(--accent)}.cert-list{color:var(--text-secondary);line-height:1.8;margin-left:1.25rem;list-style:disc}
  </style>
</head>
<body class="bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col min-h-screen"><a href="#main-content" class="sr-only-focusable">Skip to content</a>
  <div id="navbar-placeholder"></div><main id="main-content" class="flex-1 cert-shell"><section class="pt-32 pb-28"><div class="lg:max-w-[76%] mx-auto px-6 max-w-5xl">
    <p class="text-sm uppercase tracking-[0.3em] text-[var(--text-muted)] mb-3">The Five Rings · Path 2 · final certification</p>
    <h1 class="text-4xl md:text-5xl font-bold mb-4">LP-074 final certification — 2294</h1>
    <p class="text-lg text-[var(--text-muted)] max-w-3xl leading-relaxed">The controlling human-readable certification generated from the committed 2294 dataset and deterministic verifier.</p>
    <div class="cert-banner mt-10" role="status" aria-label="Certification disposition"><p><strong>SCHEDULES A AND B CERTIFIED.</strong> The 2294 Path 2 audit passed Findings I–IV and independently passed Schedule B conditions B1–B6. Effective notice was valid. The complete <strong>50 / 25 / 12.5 / 6.25</strong> exact halving cascade entered force in 2295. LP-073 is preserved historically but superseded as operative rate law; LP-075 remains procedural only. The $10 million threshold and SCM remain unchanged.</p></div>
    <div class="cert-links">
      <a href="documents/path-2-certification-2294-authority.md"><i class="fas fa-scale-balanced" aria-hidden="true"></i> Authority map</a>
      <a href="${DATA_FILE}"><i class="fas fa-database" aria-hidden="true"></i> Controlling dataset</a>
      <a href="documents/path-2-effective-notice-2295.json"><i class="fas fa-bell" aria-hidden="true"></i> Effective notice</a>
      <a href="tools/verify-path2-certification-2294.mjs"><i class="fas fa-code" aria-hidden="true"></i> Verifier</a>
      <a href="tools/test-path2-certification-mutations.mjs"><i class="fas fa-vial" aria-hidden="true"></i> Mutation tests</a>
    </div>
    <div class="cert-grid">
      <div class="cert-card"><span class="label">Audit design locked</span><span class="value">2292</span></div>
      <div class="cert-card"><span class="label">Audit completed</span><span class="value">2294</span></div>
      <div class="cert-card"><span class="label">Schedule A</span><span class="value">CERTIFIED</span></div>
      <div class="cert-card"><span class="label">Schedule B</span><span class="value">CERTIFIED</span></div>
      <div class="cert-card"><span class="label">Effective</span><span class="value">2295</span></div>
    </div>
    <h2 class="text-2xl font-bold mt-10 mb-4">Required chronology</h2><ul class="cert-list">${chronology}</ul>
    <h2 id="findings" class="text-2xl font-bold mt-12 mb-4">Mandatory Charter Findings I–IV</h2><div class="cert-table-wrap"><table class="cert-table"><thead><tr><th>Finding</th><th>Controlling result</th><th>Status</th></tr></thead><tbody>${findings}</tbody></table></div>
    <h2 id="schedule-a" class="text-2xl font-bold mt-12 mb-4">LP-074 Schedule A conditions</h2><div class="cert-table-wrap"><table class="cert-table"><thead><tr><th>Condition</th><th>Executed result</th><th>Status</th></tr></thead><tbody>${scheduleA}</tbody></table></div>
    <p class="cert-banner"><strong>Schedule A: CERTIFIED.</strong> All four Charter Findings and all A1–A8 statutory conditions pass.</p>
    <h2 id="schedule-b" class="text-2xl font-bold mt-12 mb-4">LP-074 Schedule B conditions</h2><div class="cert-table-wrap"><table class="cert-table"><thead><tr><th>Condition</th><th>Independent Lower-incidence result</th><th>Status</th></tr></thead><tbody>${scheduleB}</tbody></table></div>
    <p class="cert-banner"><strong>Schedule B: CERTIFIED.</strong> B1–B6 independently pass for -1, -2, and -3. Lower collections remain siloed and layer-attributed; the certification does not universalize SCM.</p>
    <h2 class="text-2xl font-bold mt-12 mb-4">Authority and effect</h2>
    <p class="text-[var(--text-secondary)] leading-relaxed"><strong>LP-074</strong> is the substantive rate law. <strong>LP-075</strong> compelled the audit but set no rate and activated no schedule. The valid 2294 certificates and notice made LP-074 effective in 2295. <strong>LP-073</strong> governed the historical 70 / 35 / 17 / 8 era and remains visible in the register and rate history, but it has no residual operative rate authority after 2295.</p>
  </div></section></main><script src="script.js" defer></script><div id="footer-placeholder"></div>
</body></html>
`;

const outputPath = join(ROOT, OUTPUT_FILE);
if (process.argv.includes('--check')) {
  if (readFileSync(outputPath, 'utf8') !== html) {
    console.error(`${OUTPUT_FILE} is stale; run node tools/build-path2-certification-page.mjs`);
    process.exit(1);
  }
  console.log(`${OUTPUT_FILE}: generated source agreement verified`);
} else {
  writeFileSync(outputPath, html);
  console.log(`${OUTPUT_FILE}: generated from verified ${DATA_FILE}`);
}
