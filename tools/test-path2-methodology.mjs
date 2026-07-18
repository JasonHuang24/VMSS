#!/usr/bin/env node
/** Independent methodological conformity tests for the corrected Path 2 run. */
import { createHash } from 'node:crypto';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  applyIdentificationForTest,
  directScalarBlockBootstrap,
  executeLockedAnalysis,
  legacyPooledValidation,
  resolveIdentification,
  studentizedBlockBootstrap,
  validateMemberOutcomeSpecific,
} from './path2-execution-engine.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const COMP = join(ROOT, 'documents/path2-compendium');
const preregistration = JSON.parse(readFileSync(join(COMP, 'preregistration-2292.json'), 'utf8'));
const execution = JSON.parse(readFileSync(join(COMP, 'execution-output.json'), 'utf8'));
const tests = [];
const test = (category, name, defect, fn) => tests.push({ category, name, defect, fn });
const clone = (value) => structuredClone(value);
const mean = (values) => values.reduce((total, value) => total + value, 0) / values.length;
const sha256File = (path) => createHash('sha256').update(readFileSync(path)).digest('hex');

function raw(finding) {
  const mapping = preregistration.dataSourceMappings.find((entry) => entry.finding === finding);
  return JSON.parse(readFileSync(join(ROOT, mapping.path), 'utf8')).observations;
}

function rawPaths(finding, rows) {
  const keys = {
    I: ['sharedDemographicIndex', 'treatmentReceipts50', 'counterfactualReceipts70', 'obligations'],
    II: ['sharedResidentDemandIndex', 'treatmentDividend50', 'counterfactualDividend70'],
    III: ['sharedLiquidityIndex', 'treatmentScmActivations50', 'counterfactualScmActivations70', 'treatmentFlowMargin50', 'counterfactualFlowMargin70'],
  }[finding];
  return Object.fromEntries(keys.map((key) => [key, rows.map((row) => Number(row[key]))]));
}

test('causal-contrast', 'changing Finding II attribution changes the calculated contrast', 'label-only identification assumptions', () => {
  const member = clone(preregistration.admissibleSpecificationSet.find((entry) => entry.id === 'II-refusal-linear-b2'));
  const rows = raw('II');
  const years = rows.map((row) => row.year);
  const original = mean(applyIdentificationForTest(member, rawPaths('II', rows), years).outcomes.attributedScheduleEffect);
  member.identificationRules.find((rule) => rule.type === 'schedule-attribution-share').value = 0.5;
  const changed = mean(applyIdentificationForTest(member, rawPaths('II', rows), years).outcomes.attributedScheduleEffect);
  return Math.abs(changed - original) > 0.05 && Math.abs(changed / original - 0.5) < 1e-9;
});

test('identification-consumption', 'an unconsumed identification assumption is rejected', 'assumption strings copied only into metadata', () => {
  const member = clone(preregistration.admissibleSpecificationSet[0]);
  member.identificationAssumptions.push('display-only assumption');
  try { resolveIdentification(member); return false; } catch (error) { return error.message.includes('unconsumed identification assumption'); }
});

function missingContrastRejected(finding, field) {
  const temp = mkdtempSync(join(tmpdir(), 'path2-contrast-'));
  try {
    for (const mapping of preregistration.dataSourceMappings) {
      const destination = join(temp, mapping.path);
      mkdirSync(dirname(destination), { recursive: true });
      copyFileSync(join(ROOT, mapping.path), destination);
    }
    const mapping = preregistration.dataSourceMappings.find((entry) => entry.finding === finding);
    const path = join(temp, mapping.path);
    const document = JSON.parse(readFileSync(path, 'utf8'));
    delete document.observations[0][field];
    writeFileSync(path, `${JSON.stringify(document, null, 2)}\n`);
    executeLockedAnalysis({ root: temp, preregistration });
    return false;
  } catch (error) {
    return error.message.includes(`missing explicit contrast field ${field}`);
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
}

test('causal-contrast', 'Finding II rejects a missing enacted-70 counterfactual', 'one-series dividend attribution', () => missingContrastRejected('II', 'counterfactualDividend70'));
test('causal-contrast', 'Finding III rejects a missing 50-schedule SCM path', 'one-series SCM/Flow certification', () => missingContrastRejected('III', 'treatmentScmActivations50'));

test('studentization', 'B-1 records replication-specific inner-bootstrap standard errors', 'fixed denominator mislabeled studentized', () => Object.values(execution.findings).flatMap((finding) => finding.members).filter((member) => member.interval.family === 'B-1').every((member) => member.interval.methodRecord.replicationSpecificStandardErrorSummary.every((summary) => summary.distinctRoundedValues > 1) && member.interval.methodRecord.replicationSpecificDenominatorDigest.length === 64));

test('studentization', 'the former fixed-denominator B-1 declaration is rejected', 'old standardized maximum-deviation algorithm surviving under a new label', () => {
  const member = clone(preregistration.admissibleSpecificationSet.find((entry) => entry.intervalFamily === 'B-1'));
  member.studentization = 'fixed-outer-standard-error';
  try {
    studentizedBlockBootstrap({ rows: raw('I'), member, years: [2295], transform: () => [1], directions: [-1] });
    return false;
  } catch (error) { return error.message.includes('fixed-denominator'); }
});

test('scalar-covariance', 'B-4 targets the discounted scalar directly', 'pointwise annual uncertainty assembled into OM', () => {
  const member = execution.findings.IV.members.find((entry) => entry.interval.family === 'B-4');
  return member.interval.methodRecord.target === 'discounted thirty-year net OM scalar' && member.interval.methodRecord.construction.includes('scalar estimator') && member.samplingUncertaintyWidth > 0 && member.identifiedRegionWidth > 0;
});

test('scalar-covariance', 'positive cross-year covariance increases scalar uncertainty above legacy RSS', 'root-sum-of-squares treatment of correlated forecasts', () => {
  const shocks = [0, 1.4, -0.8, 1.7, -1.1, 0.9, -0.6, 1.5, -1.3, 0.7, -0.5, 1.2, -0.9, 1.6, -1.2, 1.1, -0.7, 1.3, -1, 0.8];
  const rows = Array.from({ length: 20 }, (_, index) => ({
    year: 2272 + index, sharedVentureExposureIndex: 1,
    privateConsumerSurplus: 10 + index * 0.2 + shocks[index], privateProducerSurplus: 5 + index * 0.1 + shocks[index] * 0.5, qualityAdjustment: 1 + index * 0.02 + shocks[index] * 0.1,
    publicConsumerSurplus: 2 + index * 0.04, publicProducerSurplus: 1 + index * 0.02, publicQualityAdjustment: 0.3,
    displacementCost: 0.2, externalCost: 0.1, beyondHorizonValue: 0, publicCaptureSurplus: 1, canonicalConsumptionLevel: 50,
  }));
  const member = { finding: 'IV', id: 'synthetic-correlated-b4', model: 'linear', sharedExogenousElasticity: 1, seed: 99117, scalarReplications: 399, identificationAssumptions: ['ledger-traced ventures only', 'realized public allocation counterfactual', 'adverse displacement and external-cost region'], identificationRules: [{ assumption: 'ledger-traced ventures only', type: 'traceable-capital-share', value: 1 }, { assumption: 'realized public allocation counterfactual', type: 'realized-public-allocation-share', value: 1 }, { assumption: 'adverse displacement and external-cost region', type: 'adverse-cost-share', value: 0.04 }] };
  const years = Array.from({ length: 30 }, (_, index) => 2295 + index);
  const result = directScalarBlockBootstrap({ rows, member, years, replications: 399, scalarTransform: (paths) => paths.privateConsumerSurplus.reduce((total, value) => total + value, 0), contributionTransform: (paths) => paths.privateConsumerSurplus });
  return result.crossYearCovarianceContribution > 0 && result.fullScalarVariance > result.legacyIndependentVariance * 5;
});

test('multivariate-validation', 'one failed outcome cannot hide inside pooled raw-unit RMSE', 'large-scale outcome masking a required small-scale failure', () => {
  const rows = Array.from({ length: 20 }, (_, index) => ({ year: 2272 + index, sharedDemographicIndex: 1, treatmentReceipts50: 10000 + 100 * index, obligations: 9000 + 90 * index, counterfactualReceipts70: index < 15 ? 1 : 1 + 0.01 * (index - 14) }));
  const member = { finding: 'I', id: 'synthetic-pooled-mask', panel: 'refusal', model: 'linear', sharedExogenousElasticity: 1, identificationAssumptions: ['zero velocity credit'], identificationRules: [{ assumption: 'zero velocity credit', type: 'velocity-credit-share', value: 0 }] };
  const holdout = [2287, 2288, 2289, 2290, 2291];
  const corrected = validateMemberOutcomeSpecific(member, rows, holdout);
  const legacy = legacyPooledValidation(member, rows, holdout);
  return legacy.survived && !corrected.survived && corrected.outcomeComparisons.counterfactualReceipts70.survived === false;
});

test('precision-amendment', 'Finding II precision authority is engraved in public Charter history', 'weak hidden dividend-to-extinction amendment', () => {
  const source = readFileSync(join(ROOT, 'documents/path-2-charter-source.md'), 'utf8');
  const page = readFileSync(join(ROOT, 'path-2-charter.html'), 'utf8');
  return source.includes('Finding II precision amendment — adopted 2291') && source.includes('sample standard deviation') && page.includes('Finding II precision amendment') && page.includes('sample standard deviation');
});

test('method-labels', 'B-2 is reported as Bonferroni and never as an executed max-t distribution', 'inaccurate max-t method label', () => {
  const b2 = Object.values(execution.findings).flatMap((finding) => finding.members).filter((member) => member.interval.family === 'B-2');
  const verifier = readFileSync(join(ROOT, 'tools/verify-path2-certification-2294.mjs'), 'utf8');
  return b2.every((member) => member.interval.methodRecord.simultaneousMethod === 'one-sided Bonferroni simultaneous fallback' && member.interval.methodRecord.executedMaxTDistribution === false) && verifier.includes('no executed max-t distribution');
});

test('independent-recomputation', 'the estimator interface has no filed-bound input', 'verifier accepting expected filed bounds as estimator inputs', () => !String(executeLockedAnalysis).includes('expectedFiled') && !String(executeLockedAnalysis).includes('depositedOutput'));

test('digest-binding', 'raw data, preregistration, code, execution, Registrar, and manifest bindings verify', 'self-reproduction without cross-artifact identity', () => {
  const registrar = JSON.parse(readFileSync(join(COMP, 'registrar-certification.json'), 'utf8'));
  const manifest = JSON.parse(readFileSync(join(COMP, 'calculation-code-manifest.json'), 'utf8'));
  const lock = JSON.parse(readFileSync(join(COMP, 'preregistration-lock-certificate.json'), 'utf8'));
  return lock.preregistrationByteDigest === sha256File(join(COMP, 'preregistration-2292.json'))
    && registrar.executionOutputDigest === sha256File(join(COMP, 'execution-output.json'))
    && registrar.codeManifestDigest === sha256File(join(COMP, 'calculation-code-manifest.json'))
    && manifest.sources.every((source) => source.digest === sha256File(join(ROOT, source.path)))
    && preregistration.dataSourceMappings.every((mapping) => mapping.digest === sha256File(join(ROOT, mapping.path)));
});

let failed = 0;
for (const category of [...new Set(tests.map((entry) => entry.category))]) {
  console.log(`${category}:`);
  for (const entry of tests.filter((candidate) => candidate.category === category)) {
    let passed = false;
    let detail = '';
    try { passed = entry.fn() === true; } catch (error) { detail = error.message; }
    console.log(`  ${passed ? 'PASS' : 'FAIL'} ${entry.name} — catches ${entry.defect}${detail ? ` (${detail})` : ''}`);
    if (!passed) failed += 1;
  }
}
console.log(`Path 2 methodological tests — ${tests.length - failed} passed, ${failed} failed`);
if (failed) process.exit(1);
