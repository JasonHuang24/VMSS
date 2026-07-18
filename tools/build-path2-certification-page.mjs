#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { evaluateAuthorityRecord, pct } from './path2-certification-core.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA_FILE = 'documents/path-2-certification-2294-data.json';
const OUTPUT_FILE = 'path-2-certification-2294.html';
const data = JSON.parse(readFileSync(join(ROOT, DATA_FILE), 'utf8'));
const result = evaluateAuthorityRecord(data, { root: ROOT });
if (!result.certified) throw new Error(`Refusing to generate a final certificate from an invalid record: ${result.errors.slice(0, 5).join('; ')}`);
const esc = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const row = (label, detail) => `<tr><td>${esc(label)}</td><td>${esc(detail)}</td><td class="cert-pass">PASS</td></tr>`;
const findingRows = ['I', 'II', 'III', 'IV'].map((id) => row(`Finding ${id}`, result.findings[id].detail)).join('\n');
const aRows = [
  row('A1 - Provenance', 'Fourteen unique source artifacts verify against their SHA-256 registry entries.'),
  row('A2 - Main current coverage', `Main-12 is ${pct(result.candidate.main12)} (threshold 105%).`),
  row('A3 - Main monthly floor', `Worst current month is ${pct(result.candidate.mainMinimum)} (threshold 100%).`),
  row('A4 - Main forward floor', `Worst forward month is ${pct(result.candidate.mainForwardMinimum)} (threshold 100%).`),
  row('A5 - Dividend aggregate / LP-070', `ADT-36 is ${pct(result.candidate.adt36)} (threshold 120%).`),
  row('A6 - Dividend monthly floor', `Worst ADT month is ${pct(result.candidate.adtMinimum)} (threshold 100%).`),
  row('A7 - Stream separation', 'Main, ADT, Lower, SCM recycle, and cyclical backfill streams reconcile without cross-credit.'),
  row('A8 - Reproducibility', 'The byte-locked preregistration, complete 2272–2291 observations, executable source manifest, §4.3 rows, deterministic seeds, diagnostics, derivations, logs, and pre-issuance Registrar execution are deposited.'),
].join('\n');
const bRows = [
  row('B1 - Complete route maps', 'Every Lower receipt route reconciles per destination and month.'),
  row('B2 - Complete obligation maps', 'Every destination has enumerated obligations and a complete, unique lawful payment order.'),
  row('B3 - Proposed-rate quantities', 'Raw Li/Oi ledgers verify independently with all prohibited credits excluded.'),
  row('B4 - Current coverage', result.bArithmetic.map((item) => `${item.layer}: ${pct(item.aggregate)}, monthly minimum ${pct(item.monthly)}`).join('; ')),
  row('B5 - Forward coverage', result.bArithmetic.map((item) => `${item.layer}: minimum ${pct(item.forwardMinimum)}`).join('; ')),
  row('B6 - Reproduction and adoption', 'Separate Lower Certificate issued after A, then adopted before the final Schedule B certificate.'),
].join('\n');
const compendiumRows = data.authorityAudit.compendium.inventory.map((item) => `<li><a href="${esc(item.path)}"><code>${esc(item.id)}</code></a> - SHA-256 <code>${esc(item.digest.slice(0, 16))}...</code></li>`).join('\n');
const locked = result.lockedExecution;
const executionRows = [
  row('§9.2 lock', `${locked.lock.preregistrationByteDigest} at ${locked.lock.canonicalTimestamp}; ${locked.lock.publicChambersRecordReference}; Registrar and clerk signed.`),
  row('Observation and validation windows', 'Observations 2272–2291; training 2272–2286; held-out validation 2287–2291; threshold baseline 2282–2291; projections 2295–2324.'),
  row('§4.3 validation', `${locked.depositedOutput.validationRecords.filter((entry) => entry.survived).length} members admitted and ${locked.depositedOutput.excludedMembers.length} failed members retained with row-level predictions and residuals.`),
  row('§10.4 execution', 'B-1 studentized residual block bootstrap uses published seeds and automatic block lengths; B-2 uses automatic Bartlett HAC and simultaneous max-t; B-4 adds the adverse identified-region endpoint.'),
  row('§5.3 precision', Object.entries(locked.depositedOutput.precisionCalculations).map(([id, value]) => `${id}: |${value.baselineObservedMean} − ${value.passThreshold}| = ${value.ceiling}`).join('; ')),
  row('Schedule A.4 and A.6', `${locked.depositedOutput.findingIvDerivations.length} member derivations and D-1–D-5 diagnostics for all ${locked.depositedOutput.diagnostics.length} admitted union members.`),
  row('§11.4 independent execution', `${locked.registrar.completedAt}, before every instrument; output ${locked.registrar.executionOutputDigest.slice(0, 16)}… bound to code manifest ${locked.registrar.codeManifestDigest.slice(0, 16)}….`),
].join('\n');

const html = `<!DOCTYPE html>
<html data-theme="dark" lang="en">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <meta name="theme-color" content="#07090f" media="(prefers-color-scheme: dark)">
  <meta name="theme-color" content="#f5f7fb" media="(prefers-color-scheme: light)">
  <title>Path 2 LP-074 Final Certification - 2294 | The Five Rings</title>
  <meta name="description" content="Final reproducible 2294 Path 2 certification of LP-074 Schedules A and B, activating the 50/25/12.5/6.25 cascade for the 2295 assessment year."/>
  <link rel="canonical" href="https://jasonhchronicles.com/VMSS/path-2-certification-2294.html"/>
  <script>const saved=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',saved);</script>
  <link href="styles.css" rel="stylesheet"/><link rel="stylesheet" href="assets/css/tailwind.css">
  <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" rel="stylesheet" crossorigin>
  <link href="favicon.ico" rel="icon" type="image/x-icon"/>
  <style>
    .cert-banner{border:1px solid var(--border-strong);border-left:4px solid #34d399;border-radius:14px;background:var(--bg-secondary);padding:1.1rem 1.35rem}.cert-banner p{color:var(--text-secondary);line-height:1.65}.cert-banner strong{color:var(--text-primary)}
    .cert-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(205px,1fr));gap:1rem;margin:1.5rem 0 2.25rem}.cert-card{padding:1rem;border:1px solid var(--border);border-radius:12px;background:var(--bg-secondary);color:var(--text-secondary)}.cert-card .label{display:block;font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;color:var(--text-muted);margin-bottom:.35rem}.cert-card .value{color:var(--text-primary);font-size:1.15rem;font-weight:700}
    .cert-table-wrap{overflow-x:auto;border:1px solid var(--border);border-radius:10px;margin:1rem 0 1.75rem}.cert-table{width:100%;border-collapse:collapse;min-width:680px;color:var(--text-secondary);font-size:.92rem}.cert-table th,.cert-table td{padding:.72rem .85rem;text-align:left;vertical-align:top;border-bottom:1px solid var(--border)}.cert-table th{background:var(--bg-tertiary);color:var(--text-primary)}.cert-table tr:last-child td{border-bottom:0}.cert-pass{color:#34d399;font-weight:700;white-space:nowrap}
    .cert-links{display:flex;gap:.75rem;flex-wrap:wrap;margin:1.4rem 0 2.4rem}.cert-links a{display:inline-flex;align-items:center;gap:.45rem;border:1px solid var(--border);border-radius:999px;padding:.5rem .9rem;color:var(--text-secondary);text-decoration:none}.cert-links a:hover{border-color:var(--accent);color:var(--accent)}
    .cert-list{color:var(--text-secondary);line-height:1.8;margin-left:1.25rem;list-style:disc}.cert-list code{color:var(--text-primary)}
  </style>
</head>
<body class="bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col min-h-screen"><a href="#main-content" class="sr-only-focusable">Skip to content</a>
  <div id="navbar-placeholder"></div><main id="main-content" class="flex-1"><section class="pt-32 pb-28"><div class="lg:max-w-[70%] mx-auto px-6 max-w-4xl">
    <p class="text-sm uppercase tracking-[0.3em] text-[var(--text-muted)] mb-3">The Five Rings - Path 2 - final certificate</p>
    <h1 class="text-4xl md:text-5xl font-bold mb-4">LP-074 final certification - 2294</h1>
    <p class="text-lg text-[var(--text-muted)] max-w-3xl leading-relaxed">Generated from the same machine-readable record and SHA-256-bound compendium independently executed by the verifier.</p>
    <div class="cert-banner mt-10" role="status" aria-label="Certification disposition"><p><strong>CERTIFIED / COMPLETE.</strong> The Registrar independently executed the locked code and data on 2294-01-10. Schedule A issued on 2294-01-20; the separate Lower Incidence Certificate then issued, was adopted, and supported Schedule B on 2294-02-05. The complete <strong>${esc(data.record.operativeSchedule)}</strong> schedule took effect on <strong>${esc(data.record.effectiveAssessmentPeriod)}</strong>. The $10 million threshold and SCM architecture did not change.</p></div>
    <div class="cert-links">
      <a href="documents/path-2-certification-2294-authority.md"><i class="fas fa-scale-balanced" aria-hidden="true"></i> Authority matrix</a>
      <a href="${DATA_FILE}"><i class="fas fa-database" aria-hidden="true"></i> Machine-readable record</a>
      <a href="documents/path2-compendium/digest-manifest.json"><i class="fas fa-fingerprint" aria-hidden="true"></i> Digest manifest</a>
      <a href="documents/path2-compendium/preregistration-lock-certificate.json"><i class="fas fa-lock" aria-hidden="true"></i> Lock certificate</a>
      <a href="documents/path2-compendium/execution-output.json"><i class="fas fa-gears" aria-hidden="true"></i> Executed output</a>
      <a href="tools/verify-path2-certification-2294.mjs"><i class="fas fa-code" aria-hidden="true"></i> Verifier</a>
      <a href="tools/test-path2-certification-mutations.mjs"><i class="fas fa-vial" aria-hidden="true"></i> Mutation suite</a>
    </div>
    <h2 class="text-2xl font-bold mt-10 mb-4">Authority chronology</h2>
    <div class="cert-grid">
      <div class="cert-card"><span class="label">Commission constituted</span><span class="value">2291-05-12</span><p class="mt-2 text-sm">Three-seat competence coverage and exposure declarations deposited.</p></div>
      <div class="cert-card"><span class="label">Preregistration locked</span><span class="value">2292-02-15</span><p class="mt-2 text-sm">Union, cutoff, vintage, treatments, and code identity fixed.</p></div>
      <div class="cert-card"><span class="label">Registrar execution</span><span class="value">2294-01-10</span><p class="mt-2 text-sm">Locked code and data independently recomputed before issuance.</p></div>
      <div class="cert-card"><span class="label">Schedule A certificate</span><span class="value">2294-01-20</span><p class="mt-2 text-sm">Findings I-IV and A1-A8 passed.</p></div>
      <div class="cert-card"><span class="label">Schedule B certificate</span><span class="value">2294-02-05</span><p class="mt-2 text-sm">Issued after separate Lower certification and adoption.</p></div>
    </div>
    <h2 id="execution" class="text-2xl font-bold mt-12 mb-4">Lock and independent execution</h2><div class="cert-table-wrap"><table class="cert-table"><thead><tr><th>Requirement</th><th>Executed record</th><th>Status</th></tr></thead><tbody>${executionRows}</tbody></table></div>
    <h2 id="findings" class="text-2xl font-bold mt-12 mb-4">Mandatory Charter Findings I-IV</h2><div class="cert-table-wrap"><table class="cert-table"><thead><tr><th>Finding</th><th>Controlling adverse result</th><th>Status</th></tr></thead><tbody>${findingRows}</tbody></table></div>
    <h2 id="schedule-a" class="text-2xl font-bold mt-12 mb-4">LP-074 Schedule A conditions</h2><div class="cert-table-wrap"><table class="cert-table"><thead><tr><th>Condition</th><th>Executed result</th><th>Status</th></tr></thead><tbody>${aRows}</tbody></table></div>
    <h2 id="schedule-b" class="text-2xl font-bold mt-12 mb-4">LP-074 Schedule B conditions</h2><div class="cert-table-wrap"><table class="cert-table"><thead><tr><th>Condition</th><th>Executed result</th><th>Status</th></tr></thead><tbody>${bRows}</tbody></table></div>
    <h2 id="revocation" class="text-2xl font-bold mt-12 mb-4">Revocation states</h2>
    <div class="cert-table-wrap"><table class="cert-table"><thead><tr><th>State</th><th>Operative schedule</th></tr></thead><tbody><tr><td>A and B active</td><td>50 / 25 / 12.5 / 6.25</td></tr><tr><td>A active, B revoked</td><td>50 / 35 / 17 / 8</td></tr><tr><td>A revoked</td><td>70 / 35 / 17 / 8; B automatically suspended</td></tr></tbody></table></div>
    <h2 id="compendium" class="text-2xl font-bold mt-12 mb-4">Charter §11.1 compendium</h2><ul class="cert-list">${compendiumRows}</ul>
    <p class="text-[var(--text-secondary)] leading-relaxed mt-8">Economic interpretation: the rate reduction expands private first-allocation capacity and upper-layer velocity while SCM retains the anti-hoarding boundary. No Earth-style speculative shelter assumption enters any certification estimate.</p>
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
