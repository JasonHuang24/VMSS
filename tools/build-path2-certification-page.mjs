#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { evaluateAuthorityRecord, pct } from './path2-certification-core.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA_FILE = 'documents/path-2-certification-2294-data.json';
const OUTPUT_FILE = 'path-2-certification-2294.html';
const data = JSON.parse(readFileSync(join(ROOT, DATA_FILE), 'utf8'));
const result = evaluateAuthorityRecord(data, { root: ROOT });
const esc = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const row = (label, detail, status = 'UNSATISFIED') => `<tr><td>${esc(label)}</td><td>${esc(detail)}</td><td class="${status === 'ARITHMETIC ONLY' ? 'cert-limited' : 'cert-fail'}">${status}</td></tr>`;

const findingRows = ['I', 'II', 'III', 'IV'].map((id) =>
  row(`Finding ${id}`, result.findings[id].detail, result.findings[id].pass ? 'PASS' : 'NOT COMPUTABLE')).join('\n');
const aRows = [
  row('A1 — Provenance', 'No deposited raw-source registry establishes audit provenance.'),
  row('A2 — Main current coverage', `Normalized candidate arithmetic is ${pct(result.candidate.main12)}; it has no legal effect without A1, A7, A8, and Findings I–IV.`, 'ARITHMETIC ONLY'),
  row('A3 — Main monthly floor', `Normalized candidate minimum is ${pct(result.candidate.mainMinimum)}.`, 'ARITHMETIC ONLY'),
  row('A4 — Main forward floor', `Normalized candidate minimum is ${pct(result.candidate.mainForwardMinimum)}.`, 'ARITHMETIC ONLY'),
  row('A5 — Dividend aggregate / LP-070 gate', `Normalized candidate arithmetic is ${pct(result.candidate.adt36)}; raw A/D provenance and independence are absent.`, 'ARITHMETIC ONLY'),
  row('A6 — Dividend monthly floor', `Normalized candidate minimum is ${pct(result.candidate.adtMinimum)}.`, 'ARITHMETIC ONLY'),
  row('A7 — Stream separation', 'Boolean exclusions are not a source-level reconciliation and cannot establish this condition.'),
  row('A8 — Reproducibility', 'Raw quantities, transformations, §4.3 fields, the §11.1 compendium, and Registrar execution are absent.'),
].join('\n');
const bRows = [
  row('B1 — Complete route map', 'Named routes appear in an embedded candidate module, but no independently sourced Lower Incidence instrument exists.'),
  row('B2 — Complete obligation map', 'Named obligations lack deposited source ledgers and separate certificate custody.'),
  row('B3 — Proposed-rate quantities', 'Li/Oi arrays lack raw units, recognized sources, transformations, and per-month §4.3 fields.'),
  row('B4 — Current coverage', `Normalized candidate arithmetic: ${result.bArithmetic.map((item) => `${item.layer} ${pct(item.aggregate)} / monthly minimum ${pct(item.monthly)}`).join('; ')}.`, 'ARITHMETIC ONLY'),
  row('B5 — Forward coverage', `Normalized candidate minima: ${result.bArithmetic.map((item) => `${item.layer} ${pct(item.forwardMinimum)}`).join('; ')}.`, 'ARITHMETIC ONLY'),
  row('B6 — Reproducibility and adoption', 'No separate Lower Incidence Certificate, dated adoption instrument, or structured Path 2 adoption record exists.'),
].join('\n');
const missingRows = result.compendiumErrors.map((id) => `<li><code>${esc(id)}</code></li>`).join('\n');

const html = `<!DOCTYPE html>
<html data-theme="dark" lang="en">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <meta name="theme-color" content="#07090f" media="(prefers-color-scheme: dark)">
  <meta name="theme-color" content="#f5f7fb" media="(prefers-color-scheme: light)">
  <title>Path 2 LP-074 Authority Audit — Purported 2294 Record • The Five Rings</title>
  <meta name="description" content="Authority audit of the incomplete purported 2294 Path 2 record. Findings I–IV, the §11.1 compendium, LP-070 proof, LP-075 cold-review provenance, and a separate Lower Incidence Certificate are absent; LP-073’s 70/35/17/8 schedule remains operative." />
  <meta name="robots" content="noindex, follow" />
  <link rel="canonical" href="https://jasonhchronicles.com/VMSS/path-2-certification-2294.html" />
  <script>const saved=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',saved);</script>
  <link href="styles.css" rel="stylesheet"/><link rel="stylesheet" href="assets/css/tailwind.css">
  <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" rel="stylesheet" crossorigin>
  <link href="favicon.ico" rel="icon" type="image/x-icon"/>
  <style>
    .cert-banner{border:1px solid var(--border-strong);border-left:4px solid #f87171;border-radius:14px;background:var(--bg-secondary);padding:1.1rem 1.35rem}.cert-banner p{color:var(--text-secondary);line-height:1.65}.cert-banner strong{color:var(--text-primary)}
    .cert-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(205px,1fr));gap:1rem;margin:1.5rem 0 2.25rem}.cert-card{padding:1rem;border:1px solid var(--border);border-radius:12px;background:var(--bg-secondary);color:var(--text-secondary)}.cert-card .label{display:block;font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;color:var(--text-muted);margin-bottom:.35rem}.cert-card .value{color:var(--text-primary);font-size:1.15rem;font-weight:700}
    .cert-table-wrap{overflow-x:auto;border:1px solid var(--border);border-radius:10px;margin:1rem 0 1.75rem}.cert-table{width:100%;border-collapse:collapse;min-width:680px;color:var(--text-secondary);font-size:.92rem}.cert-table th,.cert-table td{padding:.72rem .85rem;text-align:left;vertical-align:top;border-bottom:1px solid var(--border)}.cert-table th{background:var(--bg-tertiary);color:var(--text-primary)}.cert-table tr:last-child td{border-bottom:0}.cert-fail{color:#f87171;font-weight:700;white-space:nowrap}.cert-limited{color:#fbbf24;font-weight:700;white-space:nowrap}
    .cert-links{display:flex;gap:.75rem;flex-wrap:wrap;margin:1.4rem 0 2.4rem}.cert-links a{display:inline-flex;align-items:center;gap:.45rem;border:1px solid var(--border);border-radius:999px;padding:.5rem .9rem;color:var(--text-secondary);text-decoration:none}.cert-links a:hover{border-color:var(--accent);color:var(--accent)}
    .cert-list{color:var(--text-secondary);line-height:1.7;margin-left:1.25rem;list-style:disc}.cert-list code{color:var(--text-primary)}
  </style>
</head>
<body class="bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col min-h-screen"><a href="#main-content" class="sr-only-focusable">Skip to content</a>
  <div id="navbar-placeholder"></div><main id="main-content" class="flex-1"><section class="pt-32 pb-28"><div class="lg:max-w-[70%] mx-auto px-6 max-w-4xl">
    <p class="text-sm uppercase tracking-[0.3em] text-[var(--text-muted)] mb-3">The Five Rings · Path 2 · Authority audit</p>
    <h1 class="text-4xl md:text-5xl font-bold mb-4">Purported 2294 certification — void record</h1>
    <p class="text-lg text-[var(--text-muted)] max-w-3xl leading-relaxed">The repository does not contain the governing evidence needed to certify LP-074. This page is generated from the machine-readable authority audit and records the gap without supplying invented facts.</p>
    <div class="cert-banner mt-10" role="note" aria-label="Certification disposition"><p><strong>VOID / INCOMPLETE — NO RATE EFFECT.</strong> The operative schedule remains <strong>${esc(data.record.operativeSchedule)}</strong> under LP-073. LP-074’s <strong>${esc(data.record.candidateSchedule)}</strong> schedule remains conditional. The normalized values below are candidate arithmetic only; they are not audit provenance, Charter Findings, a §11.1 compendium, or a certificate.</p></div>
    <div class="cert-links">
      <a href="documents/path-2-certification-2294-authority.md"><i class="fas fa-scale-balanced" aria-hidden="true"></i> Authority matrix</a>
      <a href="${DATA_FILE}"><i class="fas fa-database" aria-hidden="true"></i> Machine-readable audit</a>
      <a href="tools/verify-path2-certification-2294.mjs"><i class="fas fa-code" aria-hidden="true"></i> Authority verifier</a>
      <a href="tools/test-path2-certification-mutations.mjs"><i class="fas fa-vial" aria-hidden="true"></i> Mutation tests</a>
      <a href="documents/lp-075-section-13-1-record-gap.md"><i class="fas fa-file-circle-xmark" aria-hidden="true"></i> LP-075 record gap</a>
    </div>
    <h2 class="text-2xl font-bold mt-10 mb-4">Claimed chronology and verified legal effect</h2>
    <div class="cert-grid">
      <div class="cert-card"><span class="label">Claimed constitution</span><span class="value">${esc(data.record.commissionConstituted)}</span><p class="mt-2 text-sm">No constitution or exposure-declaration artifact is deposited.</p></div>
      <div class="cert-card"><span class="label">Claimed lock</span><span class="value">${esc(data.record.lockDate)}</span><p class="mt-2 text-sm">No preregistration bytes, digest, timestamp, or Appendix A is deposited.</p></div>
      <div class="cert-card"><span class="label">Purported publication</span><span class="value">${esc(data.record.publicationDate)}</span><p class="mt-2 text-sm">The mandatory compendium and Registrar execution are absent.</p></div>
      <div class="cert-card"><span class="label">Legal effect</span><span class="value">None</span><p class="mt-2 text-sm">The claimed ${esc(data.record.claimedEffectiveAssessmentPeriod)} activation is withdrawn.</p></div>
    </div>
    <h2 id="findings" class="text-2xl font-bold mt-12 mb-4">Mandatory Charter Findings I–IV</h2><div class="cert-table-wrap"><table class="cert-table"><thead><tr><th>Finding</th><th>Calculated disposition</th><th>Status</th></tr></thead><tbody>${findingRows}</tbody></table></div>
    <h2 id="schedule-a" class="text-2xl font-bold mt-12 mb-4">LP-074 Schedule A conditions</h2><div class="cert-table-wrap"><table class="cert-table"><thead><tr><th>Condition</th><th>Repository result</th><th>Status</th></tr></thead><tbody>${aRows}</tbody></table></div>
    <h2 id="schedule-b" class="text-2xl font-bold mt-12 mb-4">LP-074 Schedule B conditions</h2><p class="text-[var(--text-secondary)] leading-relaxed">Schedule B legally follows a complete Schedule A certificate and a separately produced and adopted Lower Incidence Certificate. Neither prerequisite exists in this repository.</p><div class="cert-table-wrap"><table class="cert-table"><thead><tr><th>Condition</th><th>Repository result</th><th>Status</th></tr></thead><tbody>${bRows}</tbody></table></div>
    <h2 id="compendium" class="text-2xl font-bold mt-12 mb-4">Missing §11.1 compendium components</h2><ul class="cert-list">${missingRows}</ul>
    <h2 id="authority-gaps" class="text-2xl font-bold mt-12 mb-4">Additional authority-chain gaps</h2>
    <div class="cert-table-wrap"><table class="cert-table"><thead><tr><th>Authority</th><th>Disposition</th></tr></thead><tbody>
      <tr><td>LP-070</td><td>The 120% trailing-36-month automation-side gate remains binding. Candidate normalized A/D arithmetic cannot satisfy it without independently sourced raw series and non-circular normalization.</td></tr>
      <tr><td>LP-075 §13.1</td><td>No qualifying named, dated, pre-vote cold-review record was found. The repository therefore cannot use LP-075 compliance as independent authority for the claimed remedial run.</td></tr>
      <tr><td>Schedule B sequence</td><td>No distinct Lower Incidence Certificate or adoption instrument exists; an embedded module in this same record is insufficient.</td></tr>
      <tr><td>Revocation</td><td>Charter §13.2 expressly restores the upper 70% rate after Schedule A revocation but does not automatically revoke Schedule B. The possible ${esc(data.authorityAudit.revocation.possibleMixedSchedule)} state requires an express policy decision before activation.</td></tr>
    </tbody></table></div>
  </div></section></main><script src="script.js" defer></script><div id="footer-placeholder"></div>
</body></html>
`;

const outputPath = join(ROOT, OUTPUT_FILE);
if (process.argv.includes('--check')) {
  const existing = readFileSync(outputPath, 'utf8');
  if (existing !== html) {
    console.error(`${OUTPUT_FILE} is stale; run node tools/build-path2-certification-page.mjs`);
    process.exit(1);
  }
  console.log(`${OUTPUT_FILE}: generated source agreement verified`);
} else {
  writeFileSync(outputPath, html);
  console.log(`${OUTPUT_FILE}: generated from ${DATA_FILE}`);
}
