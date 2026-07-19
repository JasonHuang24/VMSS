#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  DATA_FILE,
  NOTICE_FILE,
  evaluateCertification,
  loadCertificationSources,
} from './verify-path2-certification-2294.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const OUTPUT_FILE = 'path-2-certification-2294.html';

const esc = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);
const pct = (value, decimals = 1) => `${(value * 100).toFixed(decimals)}%`;
const pass = (value) => `<span class="cert-pass">${value ? 'PASS' : 'FAIL'}</span>`;
const row = (name, evidence, ok) => `<tr><td>${name}</td><td>${evidence}</td><td>${pass(ok)}</td></tr>`;
export const normalizeLineEndings = (value) => String(value).replace(/\r\n/g, '\n');

export function buildCertificationHtml(data, notice) {
  const result = evaluateCertification(data, notice);
  if (!result.certified) {
    throw new Error(`Refusing to generate from rejected certification sources: ${result.errors.join('; ')}`);
  }

  const C = result.standards;
  const s = data.sourceInputs;
  const a = result.metrics.scheduleA;
  const activeSchedule = C.authority.lp074.activeSchedule.join(' / ');
  const historicalSchedule = C.authority.lp073.historicalSchedule.join(' / ');
  const layerNames = Object.keys(C.scheduleB.layers);
  const layerRateList = layerNames.map((name) => `${name} at ${C.scheduleB.layers[name].rate}%`).join(', ');
  const designYear = data.record.auditDesignLocked.slice(0, 4);
  const auditYear = data.record.auditCompleted.slice(0, 4);
  const effectiveYear = data.record.effectiveAt.slice(0, 4);

  const findings = [
    row('Finding I — institutional adequacy', `Worst of ${C.annualObservations} keyed annual coverage lower bounds: ${result.metrics.findingICoverageMinimum.toFixed(3)} against strict floor &gt; ${C.findings.I.requiredCoverage.toFixed(3)}`, result.findings.I),
    row('Finding II — ADT elasticity', `All ${C.annualObservations} keyed years strictly clear both bounds; weakest dividend lower bound ${result.metrics.findingIIDividendMinimum.toFixed(2)} &gt; ${C.findings.II.baselineDividendPerResident.toFixed(2)}, and weakest schedule-effect lower bound ${result.metrics.findingIIScheduleEffectMinimum.toFixed(2)} &gt; ${C.findings.II.minimumScheduleEffect.toFixed(2)}`, result.findings.II),
    row('Finding III — concentration response', `SCM activation upper bound ${result.metrics.findingIIIActivationUpperBound.toFixed(2)} against strict ceiling &lt; ${result.metrics.findingIIIActivationCeiling.toFixed(2)}; minimum Flow ${result.metrics.findingIIIFlowMinimum.toFixed(3)} against strict floor &gt; ${C.findings.III.requiredMinimumFlow.toFixed(3)}`, result.findings.III),
    row('Finding IV — retained-capital utility', `Weakest annual net marginal-value lower bound ${result.metrics.findingIVNetMarginalValueMinimum.toFixed(2)} against strict floor &gt; ${C.findings.IV.requiredNetMarginalValue.toFixed(2)}; maximum attributable concentration events ${result.metrics.findingIVConcentrationMaximum}`, result.findings.IV),
  ].join('');

  const scheduleAEvidence = {
    A1: `${designYear} registry: ${s.scheduleA.transformRegistry.length} transforms and ${s.scheduleA.provenanceRegistry.length} locked sources; all ${s.scheduleA.mainCurrentWindow.length + s.scheduleA.mainForwardWindow.length + s.scheduleA.dividendWindow.length} rows resolve to them`,
    A2: `Main-12 ${pct(a.main12)} against ${pct(C.scheduleA.currentAggregate)}`,
    A3: `Main current weakest month ${pct(a.mainCurrentMinimum)} against ${pct(C.scheduleA.currentMonthly)}`,
    A4: `Main forward weakest of ${s.scheduleA.mainForwardWindow.length} months ${pct(a.mainForwardMinimum)} against ${pct(C.scheduleA.forwardMonthly)}; complete ordered window SHA-256-attested`,
    A5: `ADT-36 ${pct(a.adt36)} against ${pct(C.scheduleA.dividendAggregate)}`,
    A6: `Dividend weakest of ${s.scheduleA.dividendWindow.length} completed months ${pct(a.dividendMinimum)} against ${pct(C.scheduleA.dividendMonthly)}`,
    A7: `${s.scheduleA.provenanceRegistry.length} source classifications validated; prohibited cross-credit categories absent`,
    A8: 'A2–A7 and all reported metrics successfully recomputed from the raw monthly record',
  };
  const scheduleALabels = {
    A1: 'provenance', A2: 'Main current coverage', A3: 'Main monthly floor',
    A4: 'Main forward floor', A5: 'dividend aggregate', A6: 'dividend monthly floor',
    A7: 'stream separation', A8: 'reproducibility',
  };
  const scheduleA = Object.keys(scheduleALabels)
    .map((condition) => row(`${condition} — ${scheduleALabels[condition]}`, scheduleAEvidence[condition], result.scheduleAConditions[condition]))
    .join('');

  const reconciliationText = (layer) => {
    const values = result.metrics.scheduleBReconciliation[layer];
    return `${layer}: ${values.auditedCollections.toFixed(1)} audited = ${values.routedTotal.toFixed(1)} routed; ${values.obligationTotal.toFixed(1)} obligations funded`;
  };
  const bEvidence = {
    B1: layerNames.map(reconciliationText).join(' · '),
    B2: layerNames.map((layer) => `${layer}: ${s.scheduleB.layers[layer].obligationMap.obligations.length} ordered obligations; ${s.scheduleB.layers[layer].obligationMap.nonTaxSources.length} explicit non-tax zeros`).join(' · '),
    B3: `${C.currentMonths.length} keyed current months per layer at ${layerRateList}; every Li/Oi row resolves to an allowed layer-specific source`,
    B4: layerNames.map((layer) => `${layer}: ${pct(result.metrics.scheduleB[layer].currentAggregate, 2)} current aggregate (required ${pct(C.scheduleB.currentAggregate, 0)}), ${pct(result.metrics.scheduleB[layer].currentMinimum, 2)} current weakest (required ${pct(C.scheduleB.currentMonthly, 0)})`).join(' · '),
    B5: layerNames.map((layer) => `${layer}: ${pct(result.metrics.scheduleB[layer].forwardMinimum, 2)} forward weakest across ${C.forwardMonths.length} months (required ${pct(C.scheduleB.forwardMonthly, 0)}); complete ordered window SHA-256-attested`).join(' · '),
    B6: `${esc(s.scheduleB.adoptionRecord.recordId)} adopts B1–B6 for ${s.scheduleB.adoptionRecord.layers.join(', ')}; B1–B5 and all reported metrics recomputed successfully`,
  };
  const scheduleB = Object.keys(result.scheduleBConditions)
    .map((condition) => row(condition, bEvidence[condition], result.scheduleBConditions[condition])).join('');
  const chronology = data.chronology
    .map((entry) => `<li><strong>${esc(entry.year ?? entry.years)}:</strong> ${esc(entry.event)}</li>`).join('');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#07090f" media="(prefers-color-scheme: dark)" />
  <meta name="theme-color" content="#f5f7fb" media="(prefers-color-scheme: light)" />
  <title>${esc(data.record.title)} • The Five Rings</title>
  <meta name="description" content="The controlling ${auditYear} Path 2 certification: 30 annual observations, Findings I–IV, Schedule A A1–A8, and Schedule B B1–B6 passed; LP-074's ${activeSchedule} cascade entered force in ${effectiveYear}." />
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
    <h1 class="text-4xl md:text-5xl font-bold mb-4">LP-074 final certification — ${auditYear}</h1>
    <p class="text-lg text-[var(--text-muted)] max-w-3xl leading-relaxed">The controlling human-readable certification generated from the committed ${auditYear} dataset, external effective notice, and deterministic verifier.</p>
    <div class="cert-banner mt-10" role="status" aria-label="Certification disposition"><p><strong>SCHEDULES A AND B CERTIFIED.</strong> The ${auditYear} Path 2 audit passed Findings I–IV across exactly ${C.annualObservations} keyed annual observations, Schedule A A1–A8, and Schedule B B1–B6. Effective notice was valid. The complete <strong>${activeSchedule}</strong> exact halving cascade entered force in ${effectiveYear}. LP-073 is preserved historically at ${historicalSchedule} but superseded as operative rate law; LP-075 remains procedural only. The ${esc(C.unchangedCanon.threshold)} threshold and SCM remain unchanged.</p></div>
    <div class="cert-links">
      <a href="documents/path-2-certification-2294-authority.md"><i class="fas fa-scale-balanced" aria-hidden="true"></i> Authority map</a>
      <a href="${DATA_FILE}"><i class="fas fa-database" aria-hidden="true"></i> Controlling dataset</a>
      <a href="${NOTICE_FILE}"><i class="fas fa-bell" aria-hidden="true"></i> Effective notice</a>
      <a href="tools/verify-path2-certification-2294.mjs"><i class="fas fa-code" aria-hidden="true"></i> Verifier</a>
      <a href="tools/test-path2-certification-mutations.mjs"><i class="fas fa-vial" aria-hidden="true"></i> Mutation tests</a>
    </div>
    <div class="cert-grid">
      <div class="cert-card"><span class="label">Audit design locked</span><span class="value">${designYear}</span></div>
      <div class="cert-card"><span class="label">Annual horizon</span><span class="value">${C.annualObservations} years</span></div>
      <div class="cert-card"><span class="label">Audit completed</span><span class="value">${auditYear}</span></div>
      <div class="cert-card"><span class="label">Schedule A</span><span class="value">${notice.scheduleA}</span></div>
      <div class="cert-card"><span class="label">Schedule B</span><span class="value">${notice.scheduleB}</span></div>
      <div class="cert-card"><span class="label">Effective</span><span class="value">${effectiveYear}</span></div>
    </div>
    <h2 class="text-2xl font-bold mt-10 mb-4">Required chronology</h2><ul class="cert-list">${chronology}</ul>
    <h2 id="findings" class="text-2xl font-bold mt-12 mb-4">Mandatory Charter Findings I–IV</h2><div class="cert-table-wrap"><table class="cert-table"><thead><tr><th>Finding</th><th>Controlling result</th><th>Status</th></tr></thead><tbody>${findings}</tbody></table></div>
    <h2 id="schedule-a" class="text-2xl font-bold mt-12 mb-4">LP-074 Schedule A conditions</h2><div class="cert-table-wrap"><table class="cert-table"><thead><tr><th>Condition</th><th>Executed result</th><th>Status</th></tr></thead><tbody>${scheduleA}</tbody></table></div>
    <p class="cert-banner"><strong>Schedule A: ${notice.scheduleA}.</strong> All four Charter Findings and all A1–A8 statutory conditions pass.</p>
    <h2 id="schedule-b" class="text-2xl font-bold mt-12 mb-4">LP-074 Schedule B conditions</h2><div class="cert-table-wrap"><table class="cert-table"><thead><tr><th>Condition</th><th>Independent Lower-incidence result</th><th>Status</th></tr></thead><tbody>${scheduleB}</tbody></table></div>
    <p class="cert-banner"><strong>Schedule B: ${notice.scheduleB}.</strong> B1–B6 independently pass for ${layerNames.join(', ')}. Lower collections remain siloed and layer-attributed; the certification does not universalize SCM.</p>
    <h2 class="text-2xl font-bold mt-12 mb-4">Authority and effect</h2>
    <p class="text-[var(--text-secondary)] leading-relaxed"><strong>LP-074</strong> is the substantive rate law. <strong>LP-075</strong> compelled the audit but set no rate and activated no schedule. The valid ${auditYear} certificates and notice made LP-074 effective in ${effectiveYear}. <strong>LP-073</strong> governed the historical ${historicalSchedule} era and remains visible in the register and rate history, but it has no residual operative rate authority after ${effectiveYear}.</p>
  </div></section></main><script src="script.js" defer></script><div id="footer-placeholder"></div>
</body></html>
`;
}

function run() {
  const { data, notice } = loadCertificationSources();
  const html = buildCertificationHtml(data, notice);
  const outputPath = join(ROOT, OUTPUT_FILE);
  if (process.argv.includes('--check')) {
    if (normalizeLineEndings(readFileSync(outputPath, 'utf8')) !== normalizeLineEndings(html)) {
      console.error(`${OUTPUT_FILE} is stale; run node tools/build-path2-certification-page.mjs`);
      process.exit(1);
    }
    console.log(`${OUTPUT_FILE}: generated source agreement verified`);
  } else {
    writeFileSync(outputPath, html);
    console.log(`${OUTPUT_FILE}: generated from verified ${DATA_FILE} and ${NOTICE_FILE}`);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) run();
