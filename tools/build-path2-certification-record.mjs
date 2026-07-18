#!/usr/bin/env node
/**
 * Builds the fictional 2294 Path 2 evidentiary record from deterministic,
 * committed methods. The authored numbers are in-world observations, not
 * claims about any real economy. Every derived value is recomputable from the
 * raw ledgers emitted here.
 */
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { executeLockedAnalysis } from './path2-execution-engine.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const COMP = join(ROOT, 'documents/path2-compendium');
const RAW = join(COMP, 'raw');
mkdirSync(RAW, { recursive: true });

const rel = (path) => relative(ROOT, path).replaceAll('\\', '/');
const json = (value) => `${JSON.stringify(value, null, 2)}\n`;
const write = (path, value) => writeFileSync(path, typeof value === 'string' ? value : json(value));
const shaBytes = (value) => createHash('sha256').update(value).digest('hex');
const shaFile = (path) => shaBytes(readFileSync(path));
const artifactDigest = (value) => {
  const payload = structuredClone(value);
  delete payload.artifactDigest;
  return shaBytes(JSON.stringify(payload));
};
const stamp = (value) => Date.parse(value);
const monthIndex = (month) => Number(month.slice(0, 4)) * 12 + Number(month.slice(5)) - 1;
const month = (index) => `${Math.floor(index / 12)}-${String(index % 12 + 1).padStart(2, '0')}`;
const months = (start, count) => Array.from({ length: count }, (_, index) => month(monthIndex(start) + index));
const round = (value, places = 6) => Number(value.toFixed(places));
const sum = (values) => values.reduce((total, value) => total + value, 0);
const mean = (values) => sum(values) / values.length;

const cutoff = '2292-01';
const mainCurrentMonths = months('2291-02', 12);
const mainForwardMonths = months('2292-02', 36);
const adtMonths = months('2289-02', 36);
const allMainMonths = [...mainCurrentMonths, ...mainForwardMonths];
const lowerMonths = [...mainCurrentMonths, ...mainForwardMonths];
const seasonA = [0, 390, -210, 520, -330, 170, 610, -120, 260, -440, 340, 90];
const seasonB = [180, -260, 310, -120, 430, -350, 70, 280, -190, 360, -80, 150];

function rawValues(monthList, base, trend, season) {
  return monthList.map((date, index) => ({ date, value: round(base + trend * index + season[index % season.length], 3) }));
}

const rawSeries = [
  { id: 'MAIN-T50-LEDGER-2294', file: 'main-t50.csv', description: 'Audited Sanctuary/Main receipts estimated under the 50 percent schedule', rows: rawValues(allMainMonths, 108900, 76, seasonA) },
  { id: 'MAIN-OBLIGATION-LEDGER-2294', file: 'main-obligations.csv', description: 'Enumerated Main obligations legally assigned to income tax', rows: rawValues(allMainMonths, 102000, 81, seasonB) },
  { id: 'ADT-RECEIPTS-LEDGER-2294', file: 'adt-receipts.csv', description: 'Automation-side ADT receipts excluding tax, SCM recycle, Lower receipts, and backfill', rows: rawValues(adtMonths, 165200, 109, seasonA) },
  { id: 'DIVIDEND-OBLIGATION-LEDGER-2294', file: 'dividend-obligations.csv', description: 'Legally due dividend obligations', rows: rawValues(adtMonths, 134200, 91, seasonB) },
  { id: 'L1-RECEIPTS-LEDGER-2294', file: 'lower-1-receipts.csv', description: 'Layer -1 receipts under the 25 percent proposed rate', rows: rawValues(lowerMonths, 48200, 42, seasonA.map((x) => x * 0.18)) },
  { id: 'L1-OBLIGATION-LEDGER-2294', file: 'lower-1-obligations.csv', description: 'Layer -1 legally chargeable obligations', rows: rawValues(lowerMonths, 45100, 45, seasonB.map((x) => x * 0.16)) },
  { id: 'L2-RECEIPTS-LEDGER-2294', file: 'lower-2-receipts.csv', description: 'Layer -2 receipts under the 12.5 percent proposed rate', rows: rawValues(lowerMonths, 16750, 17, seasonB.map((x) => x * 0.07)) },
  { id: 'L2-OBLIGATION-LEDGER-2294', file: 'lower-2-obligations.csv', description: 'Layer -2 legally chargeable obligations', rows: rawValues(lowerMonths, 15640, 18, seasonA.map((x) => x * 0.06)) },
  { id: 'L3-RECEIPTS-LEDGER-2294', file: 'lower-3-receipts.csv', description: 'Layer -3 receipts under the 6.25 percent proposed rate', rows: rawValues(lowerMonths, 6020, 6.4, seasonA.map((x) => x * 0.022)) },
  { id: 'L3-OBLIGATION-LEDGER-2294', file: 'lower-3-obligations.csv', description: 'Layer -3 legally chargeable obligations', rows: rawValues(lowerMonths, 5630, 6.8, seasonB.map((x) => x * 0.019)) },
];

for (const source of rawSeries) {
  const csv = ['month,nominal_million_credits', ...source.rows.map((row) => `${row.date},${row.value.toFixed(3)}`)].join('\n') + '\n';
  write(join(RAW, source.file), csv);
}

function rawSource(id) {
  return rawSeries.find((source) => source.id === id);
}

function scaleFor(date) {
  const offset = monthIndex(date) - monthIndex('2289-02');
  const canonicalDeflator = 96.8 + offset * 0.071 + seasonB[(offset % 12 + 12) % 12] / 10000;
  return round((100 / canonicalDeflator) / 1000, 12);
}

function pairRows(monthList, numeratorId, denominatorId, inclusionRule) {
  const numerator = new Map(rawSource(numeratorId).rows.map((row) => [row.date, row.value]));
  const denominator = new Map(rawSource(denominatorId).rows.map((row) => [row.date, row.value]));
  return monthList.map((date) => {
    const rawNumerator = numerator.get(date);
    const rawDenominator = denominator.get(date);
    const scale = scaleFor(date);
    return {
      month: date,
      sourceNumerator: numeratorId,
      sourceDenominator: denominatorId,
      rawUnits: 'nominal million layer credits',
      rawNumerator,
      rawDenominator,
      numeratorScale: scale,
      denominatorScale: scale,
      normalizedNumerator: round(rawNumerator * scale),
      normalizedDenominator: round(rawDenominator * scale),
      normalizationRule: 'multiply nominal million credits by the month-specific canonical 2292 deflator and divide by 1,000',
      inclusionRule,
      adjustment: 'canonical source-authority deflator only; no behavioral uplift, exclusions, seasonal override, or outlier removal',
      weight: 1,
      independenceMethod: 'numerator and denominator are separately administered ledgers with distinct custodians, source identifiers, and artifact paths',
      numeratorDerivedFromDenominator: false,
    };
  });
}

const mainCurrent = pairRows(mainCurrentMonths, 'MAIN-T50-LEDGER-2294', 'MAIN-OBLIGATION-LEDGER-2294', 'twelve completed months immediately preceding the 2292-01 cutoff');
const mainForward = pairRows(mainForwardMonths, 'MAIN-T50-LEDGER-2294', 'MAIN-OBLIGATION-LEDGER-2294', 'thirty-six preregistered baseline months immediately after the 2292-01 cutoff');
const adtTrailing = pairRows(adtMonths, 'ADT-RECEIPTS-LEDGER-2294', 'DIVIDEND-OBLIGATION-LEDGER-2294', 'thirty-six completed months ending at the 2292-01 cutoff');

function withAliases(rows, numeratorKey, denominatorKey) {
  return rows.map((row) => ({ ...row, [numeratorKey]: row.normalizedNumerator, [denominatorKey]: row.normalizedDenominator }));
}

const findingRaw = {
  I: { sourceId: 'FINDING-I-OBSERVATIONS-2294', file: 'finding-i-observations.json', description: 'Institutional receipts and obligation observation-window summary' },
  II: { sourceId: 'FINDING-II-OBSERVATIONS-2294', file: 'finding-ii-observations.json', description: 'Real dividend disbursement and attribution observation-window summary' },
  III: { sourceId: 'FINDING-III-OBSERVATIONS-2294', file: 'finding-iii-observations.json', description: 'SCM activation-frequency and Flow Test observation-window summary' },
  IV: { sourceId: 'FINDING-IV-OBSERVATIONS-2294', file: 'finding-iv-observations.json', description: 'Retained-capital and realized public-deployment welfare observation-window summary' },
};

const observedYears = Array.from({ length: 20 }, (_, index) => 2272 + index);
const findingObservations = {
  I: observedYears.map((year, index) => {
    const treatmentReceipts50 = round(1184 + index * 18.2 + seasonA[index % 12] / 160);
    return {
      year, sharedDemographicIndex: round(1 + index * 0.0075 + seasonB[index % 12] / 100000, 8),
      treatmentReceipts50, counterfactualReceipts70: round(treatmentReceipts50 * 1.315 + 4.2 + seasonB[index % 12] / 210),
      obligations: round(1082 + index * 16.4 + seasonB[index % 12] / 180),
    };
  }),
  II: observedYears.map((year, index) => {
    const treatmentDividend50 = round(97.1 + index * 0.245 + seasonA[index % 12] / 9000, 6);
    return {
      year, sharedResidentDemandIndex: round(1 + index * 0.0042 + seasonB[index % 12] / 120000, 8),
      treatmentDividend50, counterfactualDividend70: round(treatmentDividend50 + 0.22 + index * 0.002 + seasonB[index % 12] / 180000, 6),
    };
  }),
  III: observedYears.map((year, index) => {
    const treatmentScmActivations50 = round(7.58 + index * 0.052 + seasonB[index % 12] / 12000, 6);
    const treatmentFlowMargin50 = round(0.91 - index * 0.006 + seasonA[index % 12] / 30000, 6);
    return {
      year, sharedLiquidityIndex: round(1 + index * 0.0035 + seasonA[index % 12] / 160000, 8),
      treatmentScmActivations50, counterfactualScmActivations70: round(treatmentScmActivations50 - 0.24 - index * 0.0015 - seasonA[index % 12] / 210000, 6),
      treatmentFlowMargin50, counterfactualFlowMargin70: round(treatmentFlowMargin50 + 0.041 + index * 0.0002 + seasonB[index % 12] / 240000, 6),
    };
  }),
  IV: observedYears.map((year, index) => ({
    year, sharedVentureExposureIndex: round(1 + index * 0.006 + seasonA[index % 12] / 140000, 8),
    privateConsumerSurplus: round(0.43 + index * 0.008 + seasonA[index % 12] / 100000, 6),
    privateProducerSurplus: round(0.31 + index * 0.006 + seasonB[index % 12] / 110000, 6),
    qualityAdjustment: round(0.082 + index * 0.0012, 6),
    publicConsumerSurplus: round(0.26 + index * 0.0048 + seasonB[index % 12] / 130000, 6),
    publicProducerSurplus: round(0.19 + index * 0.0036 + seasonA[index % 12] / 140000, 6),
    publicQualityAdjustment: round(0.051 + index * 0.0008, 6),
    displacementCost: round(0.047 + index * 0.00035, 6),
    externalCost: round(0.029 + index * 0.00022, 6),
    beyondHorizonValue: round(0.012 + index * 0.0001, 6),
    publicCaptureSurplus: round(0.46 + index * 0.008, 6),
    canonicalConsumptionLevel: round(52.4 + index * 0.37 + seasonB[index % 12] / 5000, 6),
  })),
};
write(join(RAW, findingRaw.I.file), { units: 'billion constant-2292 Main credits', observationWindow: [2272, 2291], contrastDesign: 'separately administered 50-schedule matched-receipt series and enacted-70 receipt series under one demographic index', observations: findingObservations.I });
write(join(RAW, findingRaw.II.file), { units: 'constant-2292 dividend credits per resident', observationWindow: [2272, 2291], contrastDesign: 'matched 50-schedule and enacted-70 dividend outcomes under one resident-demand index', observations: findingObservations.II });
write(join(RAW, findingRaw.III.file), { units: 'annual district-equivalent SCM pulses and dimensionless Flow Test margin', observationWindow: [2272, 2291], contrastDesign: 'matched 50-schedule and enacted-70 SCM/Flow outcomes under one liquidity index', observations: findingObservations.III });
write(join(RAW, findingRaw.IV.file), { units: 'billion constant-2292 credits and welfare-credit equivalents', observationWindow: [2272, 2291], contrastDesign: 'ledger-traced retained-capital deployment and realized public first-allocation outcomes under one venture-exposure index', observations: findingObservations.IV });

const sourceRegistry = [
  ...rawSeries.map((source) => ({ id: source.id, path: rel(join(RAW, source.file)), digest: shaFile(join(RAW, source.file)), custodian: `${source.description} authority`, description: source.description })),
  ...Object.values(findingRaw).map((source) => ({ id: source.sourceId, path: rel(join(RAW, source.file)), digest: shaFile(join(RAW, source.file)), custodian: 'Canonical Statistical Authority, Path 2 escrow desk', description: source.description })),
];
write(join(COMP, 'source-registry.json'), { schemaVersion: '1.0', lockVintage: '2292-02-15', sources: sourceRegistry });
write(join(COMP, 'raw-data-index.json'), { schemaVersion: '1.0', cutoff, unitsNotice: 'Each raw ledger preserves original nominal million-credit units. The verifier applies the declared deflator conversion.', sources: sourceRegistry });

const precisionAmendment = {
  artifactType: 'PATH2_SECTION_13_1_PRECISION_MEASUREMENT_CLARIFICATION', filedAt: '2291-05-20T09:00:00Z', coldReviewer: 'Solace Measurement Review Guild', reviewerSelection: 'highest-ranked eligible measurement-methodology entity after mechanical quarantine', reviewCompletedAt: '2291-07-02T16:00:00Z', reviewerRepliesPublishedAt: '2291-07-19T12:00:00Z', chambersAdoptedAt: '2291-08-04T14:00:00Z', publishedAt: '2291-08-05T09:00:00Z',
  scope: 'Measurement-only clarification of Charter §5.3; substantive Finding II zero-impairment and Finding IV positive-OM thresholds are unchanged.',
  rule: { findingII: 'For Finding II only, uncertainty is measured on the annual schedule-attributable impairment margin. Its maximum width is the sample standard deviation of the ten enacted-70 baseline dividend observations. The operative threshold remains zero schedule-attributable impairment years and an adverse year still requires both a below-baseline dividend bound and a negative schedule-effect bound.', findingIV: 'For §5.3, apply the operative 30-year discount operator to the baseline-period observed mean annual net OM differential and compare that like-scaled summary with the zero OM boundary.' },
  findings: [
    { id: 'PC-1', finding: 'The count summary has no coherent baseline-period observed mean, while the former dividend-level-to-extinction comparison would make precision nonbinding.', disposition: 'Accepted. Width is now limited by baseline dividend dispersion on the threshold-aligned annual impairment margin.', reviewerReply: 'Resolved: the ceiling is observable, finite, materially smaller than the dividend level, and the zero-impairment threshold is unchanged.', presidentialFlag: false },
    { id: 'PC-2', finding: 'The OM baseline must use the same horizon and discount scale as the operative summary.', disposition: 'Accepted with the like-scaled 30-year operator.', reviewerReply: 'Resolved without changing the positive-OM threshold.', presidentialFlag: false },
  ],
  vote: { Sanctuary: 'PASS', Main: 'PASS', Lower: 'PASS', Court: 'PASS', Meritboard: 'PASS' }, unresolvedHighestSeverity: false,
};
precisionAmendment.artifactDigest = artifactDigest(precisionAmendment);
const precisionAmendmentPath = join(COMP, 'precision-measurement-amendment-2291.json');
write(precisionAmendmentPath, precisionAmendment);

const codePaths = ['tools/build-path2-certification-record.mjs', 'tools/path2-execution-engine.mjs', 'tools/path2-certification-core.mjs', 'tools/verify-path2-certification-2294.mjs', 'tools/test-path2-methodology.mjs', 'tools/test-path2-certification-mutations.mjs', 'tools/build-path2-certification-page.mjs', 'package-lock.json'];
const codeManifest = { artifactType: 'PATH2_COMPLETE_CALCULATION_CODE_MANIFEST', runtime: 'Node.js >=20', sources: codePaths.map((path) => ({ path, digest: shaFile(join(ROOT, path)) })), executionEntryPoint: 'tools/path2-execution-engine.mjs#executeLockedAnalysis', buildEntryPoint: 'tools/build-path2-certification-record.mjs', verificationEntryPoint: 'tools/verify-path2-certification-2294.mjs' };
const codeManifestPath = join(COMP, 'calculation-code-manifest.json');
write(codeManifestPath, codeManifest);

const rule = (assumption, type, value, operation) => ({ assumption, type, value, operation });
const member = (finding, id, panel, suffix, functionalClass, identificationRules, intervalFamily, model, seed = null, extras = {}) => ({
  finding, id, panel, equivalenceClass: `${finding}-ec-${suffix}`, functionalClass,
  identificationAssumptions: identificationRules.map((entry) => entry.assumption), identificationRules,
  sourceId: findingRaw[finding].sourceId, intervalFamily, model, sharedExogenousElasticity: 1,
  preprocessing: 'identity transform; chronological order; no deletion, imputation, winsorization, or outlier removal', dependenceStructure: 'annual serial dependence', clusteringUnit: 'civilization-year',
  bandwidthRule: intervalFamily === 'B-2' ? 'floor(4*(n/100)^(2/9)), minimum 1' : null,
  blockLengthRule: ['B-1', 'B-4'].includes(intervalFamily) ? 'round(1.5*cuberoot(n)), minimum 2' : null,
  seed,
  outerReplications: intervalFamily === 'B-1' ? 999 : null,
  innerReplications: intervalFamily === 'B-1' ? 199 : null,
  studentization: intervalFamily === 'B-1' ? 'nested-bootstrap-t-replication-specific' : null,
  scalarReplications: intervalFamily === 'B-4' ? 1999 : null,
  ...extras,
});
const admissibleSpecificationSet = [
  member('I', 'I-certification-linear-b1', 'certification', 'dynamic', 'shared-path linear 50/70 receipts and obligations projection', [rule('no behavioral uplift', 'behavioral-uplift-share', 0, 'multiply projected 50-schedule receipts by 1 + locked share')], 'B-1', 'linear', 74001),
  member('I', 'I-refusal-linear-b2', 'refusal', 'analytic', 'shared-path linear 50/70 receipts and obligations with analytic adverse bounds', [rule('zero velocity credit', 'velocity-credit-share', 0, 'multiply projected 50-schedule receipts by 1 + locked velocity-credit share')], 'B-2', 'linear'),
  member('I', 'I-certification-constant-failed', 'certification', 'constant', 'shared-path constant 50/70 receipts and obligations projection', [rule('no behavioral uplift', 'behavioral-uplift-share', 0, 'multiply projected 50-schedule receipts by 1 + locked share')], 'B-2', 'constant'),
  member('II', 'II-certification-linear-b1', 'certification', 'dynamic', 'shared-path linear treatment/counterfactual dividend contrast', [rule('direct schedule attribution', 'schedule-attribution-share', 0.65, 'counterfactual + locked share x (50 outcome - 70 outcome)'), rule('no cross-credit', 'cross-credit-share', 0, 'add locked share x enacted-70 dividend; locked at zero')], 'B-1', 'linear', 74002),
  member('II', 'II-refusal-linear-b2', 'refusal', 'analytic', 'shared-path linear maximum-attribution dividend contrast', [rule('maximum admissible schedule attribution', 'schedule-attribution-share', 1, 'counterfactual + locked share x (50 outcome - 70 outcome)'), rule('no cross-credit', 'cross-credit-share', 0, 'add locked share x enacted-70 dividend; locked at zero')], 'B-2', 'linear'),
  member('II', 'II-refusal-constant-failed', 'refusal', 'constant', 'shared-path constant maximum-attribution dividend contrast', [rule('maximum admissible schedule attribution', 'schedule-attribution-share', 1, 'counterfactual + locked share x (50 outcome - 70 outcome)'), rule('no cross-credit', 'cross-credit-share', 0, 'add locked share x enacted-70 dividend; locked at zero')], 'B-2', 'constant'),
  member('III', 'III-certification-linear-b1', 'certification', 'dynamic', 'shared-path joint linear 50/70 SCM and Flow contrast', [rule('bounded liquidity response', 'liquidity-response-share', 0.65, 'counterfactual + locked response share x observed 50-minus-70 contrast'), rule('SCM parameters fixed', 'scm-parameter-multiplier', 1, 'multiply the attributed SCM contrast by the locked parameter multiplier')], 'B-1', 'linear', 74003),
  member('III', 'III-refusal-linear-b2', 'refusal', 'analytic', 'shared-path joint maximum-response 50/70 SCM and Flow contrast', [rule('maximum admissible liquidity response', 'liquidity-response-share', 1, 'counterfactual + locked response share x observed 50-minus-70 contrast'), rule('SCM parameters fixed', 'scm-parameter-multiplier', 1, 'multiply the attributed SCM contrast by the locked parameter multiplier')], 'B-2', 'linear'),
  member('III', 'III-refusal-constant-failed', 'refusal', 'constant', 'shared-path constant maximum-response SCM and Flow contrast', [rule('maximum admissible liquidity response', 'liquidity-response-share', 1, 'counterfactual + locked response share x observed 50-minus-70 contrast'), rule('SCM parameters fixed', 'scm-parameter-multiplier', 1, 'multiply the attributed SCM contrast by the locked parameter multiplier')], 'B-2', 'constant'),
  member('IV', 'IV-certification-linear-b1', 'certification', 'demand', 'componentwise shared-exposure linear Marshallian OM scalar', [rule('ledger-traced ventures only', 'traceable-capital-share', 1, 'multiply private/public welfare contrast by traceable retained-capital share'), rule('realized public allocation counterfactual', 'realized-public-allocation-share', 1, 'multiply realized public first-allocation surplus path by locked share')], 'B-1', 'linear', 74004),
  member('IV', 'IV-refusal-partial-id-b4', 'refusal', 'partial-id', 'joint-resampled scalar partial-identification OM lower bound', [rule('ledger-traced ventures only', 'traceable-capital-share', 1, 'multiply private/public welfare contrast by traceable retained-capital share'), rule('realized public allocation counterfactual', 'realized-public-allocation-share', 1, 'multiply realized public first-allocation surplus path by locked share'), rule('adverse displacement and external-cost region', 'adverse-cost-share', 0.04, 'subtract locked share of projected displacement plus external costs after scalar sampling uncertainty')], 'B-4', 'linear', 74005),
  member('IV', 'IV-certification-constant-failed', 'certification', 'constant', 'componentwise shared-exposure constant Marshallian OM scalar', [rule('ledger-traced ventures only', 'traceable-capital-share', 1, 'multiply private/public welfare contrast by traceable retained-capital share'), rule('realized public allocation counterfactual', 'realized-public-allocation-share', 1, 'multiply realized public first-allocation surplus path by locked share')], 'B-2', 'constant'),
];
const preregistration = {
  artifactType: 'PATH2_PREREGISTRATION', schemaVersion: '2.0', preparedAt: '2291-12-01T12:00:00Z',
  admissibleSpecificationSet, exclusionReasons: [{ category: 'non-enumerated method', reason: 'Any method outside Schedule §10.4 is inadmissible' }, { category: 'unsecured data', reason: 'Any series lacking deposit and publication custody is inadmissible' }], panelAdditions: { certification: admissibleSpecificationSet.filter((entry) => entry.panel === 'certification').map((entry) => entry.id), refusal: admissibleSpecificationSet.filter((entry) => entry.panel === 'refusal').map((entry) => entry.id) },
  equivalenceClasses: Object.fromEntries(admissibleSpecificationSet.map((entry) => [entry.id, { class: entry.equivalenceClass, functionalClass: entry.functionalClass, identificationAssumptions: entry.identificationAssumptions, identificationRules: entry.identificationRules, intervalFamily: entry.intervalFamily }])),
  dependenceDesign: { structure: 'annual serial dependence preserved', clusteringUnit: 'civilization-year', B1: 'nested bootstrap-t circular block construction: 999 outer replications, 199 inner replications per outer draw, replication-specific inner standard errors, automatic block length, and maximum one-sided adverse studentized statistic', B2: 'Bartlett HAC with automatic bandwidth and one-sided Bonferroni simultaneous fallback; no max-t distribution is estimated', B4: '1,999-draw joint circular residual-block bootstrap of the discounted thirty-year OM scalar, followed separately by the adverse displacement/external-cost identified-region endpoint' },
  preprocessingSelections: ['identity transform', 'chronological order', 'no imputation', 'no outlier removal', 'no behavioral adjustment'],
  intercurrentEventTreatments: [{ event: 'obligation-law change', treatment: 'publish and classify under §8; covered event retains observations' }, { event: 'ADT structural change', treatment: 'publish and classify under §8' }, { event: 'SCM doctrine change', treatment: 'freeze lock-date parameters' }, { event: 'demographic regime change', treatment: 'retain observed series; no post-lock model change' }],
  computedWindow: { enactmentAnchor: 2278, requiredMinimumYears: 20, completedCyclesRequireLonger: false, start: 2272, end: 2291, arithmetic: '2291 - 20 + 1 = 2272' }, computedCutoff: { lockDate: '2292-02-15', maximumReportingLagMonths: 1, result: '2292-01-15', includedThroughYear: 2291 }, vintage: { canonicalAt: '2292-02-15T12:00:00Z', rule: 'all secured series as available at lock; no later revision admitted' },
  validation: { trainingYears: [2272, 2286], heldOutYears: [2287, 2288, 2289, 2290, 2291], benchmark: 'naive one-year persistence on the identical held-out outcome', survivalRule: 'every preregistered legally operative outcome is tested separately; a member survives only if each outcome-specific RMSE is no worse than its matching persistence RMSE; the maximum RMSE ratio controls', outcomes: { I: ['50 receipts', '70 receipts', 'obligations', 'receipt contrast', '50 coverage', '70 coverage'], II: ['50 dividend', '70 dividend', 'raw schedule effect', 'attributed effect', 'attributed treatment dividend'], III: ['50 and 70 SCM', 'SCM contrast and attributed SCM', '50 and 70 Flow', 'Flow contrast and attributed Flow'], IV: ['private marginal value', 'realized-public counterfactual marginal value', 'net marginal value'] } },
  appendixA: { executableProcedure: ['read each byte-locked raw contrast artifact', 'verify exact 2272-2291 coverage and explicit 50/70 fields', 'consume and validate every identification rule', 'fit on 2272-2286 only under the shared exogenous path', 'validate every legally operative outcome separately on 2287-2291 and retain failures', 'refit surviving member on all 20 observations', 'project both schedules over 2295-2324', 'construct the selected B-1/B-2/B-4 bound', 'apply outcome-aligned §5.3 precision ceilings', 'select the least-activation-favorable surviving equivalence class and dispose each Finding'], treatmentCounterfactual: { I: '50-schedule receipts versus enacted-70 receipts with common obligations and demographic path', II: '50-schedule dividend versus enacted-70 dividend under a numerical schedule-attribution share', III: '50-schedule versus enacted-70 SCM activation and Flow paths under a numerical liquidity-response share', IV: 'retained tranche through traced private ventures versus the same tranche through realized public first allocation' }, discountRate: 0.02, concentrationEventRule: 'zero admitted concentration events required', diagnosticProcedures: { D1: 'set all 30 discount factors to one and sum net OM', D2: 'apply logarithmic marginal-consumption weights: baseline mean canonical consumption / projected canonical consumption', D3: 'discounted deposited beyond-horizon value divided by absolute OM plus that value', D4: 'publish discounted public-capture surplus numerator and discounted gross private Marshallian-surplus denominator as a pair, without quotient', D5: 'pair each member adverse bound with the executed Finding III frequency upper bound' } },
  codeEntryPoints: codeManifest,
  dataSourceMappings: Object.values(findingRaw).map((source) => {
    const finding = Object.keys(findingRaw).find((key) => findingRaw[key] === source);
    const designs = {
      I: { treatmentQuantity: 'annual real receipts under the proposed 50 percent schedule', counterfactualQuantity: 'annual real receipts under the enacted 70 percent schedule; obligations are common', observedOrEstimatedSources: ['separately administered matched 50-schedule receipt series', 'enacted-70 receipt ledger', 'enumerated obligation ledger'], sharedExogenousInput: 'sharedDemographicIndex, projected once and applied identically to both schedules', uncertaintyConstruction: 'joint B-1 bootstrap-t or B-2 Bonferroni HAC construction over coverage and receipt contrast' },
      II: { treatmentQuantity: 'real per-resident dividend under the proposed 50 schedule', counterfactualQuantity: 'real per-resident dividend under enacted 70', observedOrEstimatedSources: ['matched 50-schedule ADT/dividend series', 'enacted-70 ADT/dividend series'], sharedExogenousInput: 'sharedResidentDemandIndex', uncertaintyConstruction: 'simultaneous bounds for attributed treatment dividend and the numerical schedule effect' },
      III: { treatmentQuantity: 'SCM activation frequency and Flow margin under proposed 50', counterfactualQuantity: 'the same outcomes under enacted 70', observedOrEstimatedSources: ['matched schedule-subject holding panels under 50 and 70'], sharedExogenousInput: 'sharedLiquidityIndex', uncertaintyConstruction: 'joint simultaneous bounds for both outcome paths and both schedule contrasts' },
      IV: { treatmentQuantity: 'welfare from ledger-traced private deployment of the retained 70-to-50 tranche', counterfactualQuantity: 'welfare from the same tranche under realized public first allocation', observedOrEstimatedSources: ['venture ledger private surplus/cost series', 'realized public allocation surplus series'], sharedExogenousInput: 'sharedVentureExposureIndex', uncertaintyConstruction: 'B-1 bootstrap-t or B-4 direct joint block bootstrap of the discounted scalar, with the identified-region endpoint added separately' },
    };
    return { finding, sourceId: source.sourceId, path: rel(join(RAW, source.file)), digest: shaFile(join(RAW, source.file)), fields: Object.keys(findingObservations[finding][0]), transform: 'shared-exposure normalization followed by the locked functional class; no cross-credit or behavioral adjustment except an executed locked rule', custodian: 'Canonical Statistical Authority, Path 2 escrow desk', ...designs[finding] };
  }),
  randomSeedProcedure: { generator: '32-bit LCG (1664525*x + 1013904223 mod 2^32)', subSeedDerivation: 'mix32(baseSeed XOR ((outer+1)*0x9e3779b1) XOR ((inner+1)*0x85ebca6b)); inner zero reserved for outer draw', B1: { outerReplications: 999, innerReplications: 199, failureHandling: 'discard zero/nonfinite inner-SE outer replicate; abort below 90 percent valid; abort on zero original-estimate SE', quantileConvention: 'Hyndman-Fan type 7 at 0.95' }, B4: { scalarReplications: 1999, target: 'discounted thirty-year net OM scalar' }, seeds: Object.fromEntries(admissibleSpecificationSet.filter((entry) => ['B-1', 'B-4'].includes(entry.intervalFamily)).map((entry) => [entry.id, entry.seed])) },
  precisionClarification: { amendmentPath: rel(precisionAmendmentPath), amendmentDigest: shaFile(precisionAmendmentPath), scope: precisionAmendment.scope },
};
preregistration.artifactDigest = artifactDigest(preregistration);
const preregistrationPath = join(COMP, 'preregistration-2292.json');
write(preregistrationPath, preregistration);
const preregistrationByteDigest = shaFile(preregistrationPath);
const lockCertificate = {
  artifactType: 'PATH2_PREREGISTRATION_LOCK_CERTIFICATE', preregistrationPath: rel(preregistrationPath), preregistrationByteDigest, algorithm: 'SHA-256', canonicalTimestamp: '2292-02-15T12:00:00Z', canonicalTimeAuthority: 'Civilization Standard Time Authority receipt CST-2292-046-120000', acceptanceDisposition: 'ACCEPTED_WITHIN_90_DAYS', registrarSignature: { signer: 'Ilex Public Reproduction Office / Registrar Sen Vale', signature: 'REG-SEN-VALE-9A4C' }, clerkSignature: { signer: 'Chambers Clerk Oren Pell', signature: 'CLK-OREN-PELL-44B1', signedAt: '2292-02-15T12:08:00Z', deemedSignatureUsed: false }, publicChambersRecordReference: 'PCR-2292-046-PATH2-LOCK-01', section91Checklist: { admissibleSet: true, exclusions: true, panelAdditions: true, equivalenceClasses: true, functionalAndIdentificationAssumptions: true, dependenceAndClustering: true, section104Selections: true, preprocessing: true, intercurrentTreatments: true, computedWindowCutoffVintage: true, executableAppendixA: true, codeAndDataMappings: true, seeds: true }, executabilityChecklist: { passed: true, classRepresentativesRunnable: true, section114CompletableBeforeDeadline: true, measuredWorstCaseMinutes: 3, publicationDeadline: '2294-02-15T12:00:00Z' },
};
lockCertificate.artifactDigest = artifactDigest(lockCertificate);
const lockCertificatePath = join(COMP, 'preregistration-lock-certificate.json');
write(lockCertificatePath, lockCertificate);
write(join(COMP, 'public-chambers-lock-record.json'), { reference: lockCertificate.publicChambersRecordReference, publishedAt: lockCertificate.canonicalTimestamp, preregistrationPath: lockCertificate.preregistrationPath, digest: lockCertificate.preregistrationByteDigest, signatures: [lockCertificate.registrarSignature, lockCertificate.clerkSignature], lockCertificatePath: rel(lockCertificatePath), lockCertificateDigest: shaFile(lockCertificatePath) });

const execution = executeLockedAnalysis({ root: ROOT, preregistration });
const findings = execution.findings;
write(join(COMP, 'validation-records.json'), { schemaVersion: '2.0', records: execution.validationRecords, excludedMembers: execution.excludedMembers });
write(join(COMP, 'mandatory-diagnostics.json'), { schemaVersion: '2.0', diagnostics: execution.diagnostics });
write(join(COMP, 'finding-iv-member-derivations.json'), { schemaVersion: '2.0', derivations: execution.findingIvDerivations });
write(join(COMP, 'execution-output.json'), execution);
write(join(COMP, 'union-estimates.json'), { schemaVersion: '2.0', activationYear: 2295, derivedBy: execution.executionEntryPoint, findings });

function lowerLayer(layer, rate, numId, denId, routes, obligationDestinations) {
  const currentRecords = pairRows(mainCurrentMonths, numId, denId, 'twelve completed months immediately preceding the 2292-01 cutoff');
  const forwardRecords = pairRows(mainForwardMonths, numId, denId, 'thirty-six preregistered baseline months immediately after the 2292-01 cutoff');
  const destinationAllocations = (row) => routes.map((route) => ({
    routeId: route.id,
    li: round(row.normalizedNumerator * route.share),
    oi: round(row.normalizedDenominator * obligationDestinations.find((destination) => destination.routeId === route.id).obligations.reduce((total, obligation) => total + obligation.share, 0)),
  }));
  for (const row of [...currentRecords, ...forwardRecords]) row.destinationAllocations = destinationAllocations(row);
  return {
    layer, proposedRatePct: rate, units: `billion constant-2292 ${layer} credits`, sourceSeries: { li: numId, oi: denId },
    routeMap: { auditId: `${layer}-ROUTE-2294`, destinations: routes },
    obligationMap: { auditId: `${layer}-OBLIGATION-2294`, noChargeableObligation: false, destinations: obligationDestinations },
    currentRecords, forwardRecords,
    current: { li: currentRecords.map((row) => row.normalizedNumerator), oi: currentRecords.map((row) => row.normalizedDenominator) },
    forward: { li: forwardRecords.map((row) => row.normalizedNumerator), oi: forwardRecords.map((row) => row.normalizedDenominator) },
  };
}

const lowerLayers = [
  lowerLayer('-1', 25, 'L1-RECEIPTS-LEDGER-2294', 'L1-OBLIGATION-LEDGER-2294', [
    { id: 'l1-civil-settlement', legalFund: '-1 Civil Administration Settlement Account', share: 0.58 },
    { id: 'l1-continuity-reserve', legalFund: '-1 Continuity Reserve', share: 0.42 },
  ], [
    { routeId: 'l1-civil-settlement', obligations: [
      { id: 'l1-district-restoration', paymentOrder: 1, legalDescription: 'district restoration and civil-service settlement', nonTaxSources: ['contract recovery receipts, excluded from Li'], share: 0.35 },
      { id: 'l1-record-continuity', paymentOrder: 2, legalDescription: 'registry, notice, and continuity service', nonTaxSources: ['fee remissions, excluded from Li'], share: 0.23 },
    ] },
    { routeId: 'l1-continuity-reserve', obligations: [{ id: 'l1-emergency-floor', paymentOrder: 1, legalDescription: 'legally assigned emergency continuity floor', nonTaxSources: ['restitution recoveries, excluded from Li'], share: 0.42 }] },
  ]),
  lowerLayer('-2', 12.5, 'L2-RECEIPTS-LEDGER-2294', 'L2-OBLIGATION-LEDGER-2294', [
    { id: 'l2-safety-settlement', legalFund: '-2 Safety and Settlement Account', share: 0.61 },
    { id: 'l2-service-continuity', legalFund: '-2 Service Continuity Reserve', share: 0.39 },
  ], [
    { routeId: 'l2-safety-settlement', obligations: [
      { id: 'l2-harm-response', paymentOrder: 1, legalDescription: 'assigned harm-response and safety settlement', nonTaxSources: ['court-order recovery receipts, excluded from Li'], share: 0.38 },
      { id: 'l2-boundary-service', paymentOrder: 2, legalDescription: 'boundary notice and custody-service floor', nonTaxSources: ['service-fee recoveries, excluded from Li'], share: 0.23 },
    ] },
    { routeId: 'l2-service-continuity', obligations: [{ id: 'l2-continuity-floor', paymentOrder: 1, legalDescription: 'legally assigned continuity reserve floor', nonTaxSources: ['asset recovery proceeds, excluded from Li'], share: 0.39 }] },
  ]),
  lowerLayer('-3', 6.25, 'L3-RECEIPTS-LEDGER-2294', 'L3-OBLIGATION-LEDGER-2294', [
    { id: 'l3-terminal-settlement', legalFund: '-3 Terminal Settlement Account', share: 0.64 },
    { id: 'l3-record-floor', legalFund: '-3 Record and Notice Reserve', share: 0.36 },
  ], [
    { routeId: 'l3-terminal-settlement', obligations: [
      { id: 'l3-terminal-notice', paymentOrder: 1, legalDescription: 'terminal notice, registry, and settlement obligation', nonTaxSources: ['contract filing receipts, excluded from Li'], share: 0.39 },
      { id: 'l3-boundary-record', paymentOrder: 2, legalDescription: 'legally assigned boundary-record service', nonTaxSources: ['estate recovery receipts, excluded from Li'], share: 0.25 },
    ] },
    { routeId: 'l3-record-floor', obligations: [{ id: 'l3-emergency-record', paymentOrder: 1, legalDescription: 'terminal emergency-record continuity floor', nonTaxSources: ['voluntary filing receipts, excluded from Li'], share: 0.36 }] },
  ]),
];
write(join(COMP, 'lower-route-obligation-ledgers.json'), { schemaVersion: '1.0', layers: lowerLayers.map(({ currentRecords, forwardRecords, current, forward, ...layer }) => layer) });

const lp075Review = {
  artifactType: 'LP075_SECTION_13_1_COLD_REVIEW',
  inWorldRecoveryNotice: 'Recovered and repository-published 2300-07-18; event dates below are original chamber timestamps.',
  reviewer: { name: 'Sable Meridian Audit Cooperative', eligibilityRank: 1, selectionMethod: 'highest-ranked eligible audit-methodology entity after mechanical quarantine screening', selectedAt: '2290-03-02T09:00:00Z' },
  reviewCompletedAt: '2290-07-18T16:00:00Z',
  drafterRepliesPublishedAt: '2290-08-10T12:00:00Z',
  voteAt: '2291-01-20T14:00:00Z',
  enactedAt: '2291-01-22T10:00:00Z',
  findings: [
    { id: 'CR-1', severity: 'medium', finding: 'The remedial cadence must not deem either schedule certified.', drafterDisposition: 'Accepted; outcome-neutrality and separate termination added to §12.3.', reviewerReply: 'Resolved; language preserves every substantive gate.', unresolvedObjection: false, presidentialFlag: false },
    { id: 'CR-2', severity: 'medium', finding: 'Schedule B must remain dependent on its distinct Lower Incidence Certificate.', drafterDisposition: 'Accepted; §12.3 and §14.1 expressly preserve the distinct pathway.', reviewerReply: 'Resolved; no Schedule A evidence cross-credits Schedule B.', unresolvedObjection: false, presidentialFlag: false },
    { id: 'CR-3', severity: 'low', finding: 'Non-locking sanctions require attribution and appeal.', drafterDisposition: 'Accepted; Registrar attribution and §2.4 appeal incorporated.', reviewerReply: 'Resolved.', unresolvedObjection: false, presidentialFlag: false },
  ],
  finalVote: { chambers: { Sanctuary: 'PASS', Main: 'PASS', Lower: 'PASS', Court: 'PASS', Meritboard: 'PASS' }, zeroFails: true },
};
lp075Review.artifactDigest = artifactDigest(lp075Review);
write(join(COMP, 'lp-075-section-13-1-review.json'), lp075Review);

const revocationAmendment = {
  artifactType: 'PATH2_COUPLED_REVERSION_AMENDMENT', filedAt: '2293-02-03T10:00:00Z', reviewer: 'Orison Method Review Trust', reviewerSelection: 'highest-ranked eligible entity after §13.1 quarantine', reviewCompletedAt: '2293-04-14T18:00:00Z', reviewerReplyPublishedAt: '2293-05-02T10:00:00Z', adoptedAt: '2293-06-11T15:30:00Z', vote: { Sanctuary: 'PASS', Main: 'PASS', Lower: 'PASS', Court: 'PASS', Meritboard: 'PASS' }, unresolvedHighestSeverity: false,
  rule: {
    bothActive: '50 / 25 / 12.5 / 6.25',
    scheduleBRevokedWhileAActive: '50 / 35 / 17 / 8',
    scheduleARevoked: '70 / 35 / 17 / 8',
    coupledDependency: 'Schedule B is suspended automatically whenever Schedule A ceases to be operative.',
    directLowerRoute: 'A Lower-specific revocation run may suspend Schedule B while leaving a valid Schedule A in force.',
  },
  reviewFindings: [{ finding: 'Prevent accidental 70 / 25 / 12.5 / 6.25 state.', disposition: 'Accepted through automatic B suspension.', reviewerReply: 'Resolved before vote.', presidentialFlag: false }],
};
revocationAmendment.artifactDigest = artifactDigest(revocationAmendment);
write(join(COMP, 'revocation-amendment-2293.json'), revocationAmendment);

write(join(COMP, 'environment-manifest.json'), { runtime: 'Node.js', minimumVersion: '20.0.0', dependencyLock: 'package-lock.json', locale: 'en-US', timezone: 'UTC', deterministic: true, entryPoints: codeManifest, requiredCommand: 'node tools/verify-path2-certification-2294.mjs' });
write(join(COMP, 'transformations.md'), '# Path 2 transformation rules\n\nRaw nominal million-credit monthly ledgers are multiplied by the published row scale and divided by 1,000. Each annual Finding source publishes treatment, counterfactual, and one shared exogenous path. Models fit shared-exposure-normalized quantities on 2272–2286, validate every operative outcome separately on 2287–2291 against matching one-year persistence, refit surviving members on 2272–2291, and project both schedules through 2324. Every identification rule is an executed numeric parameter. B-1 is a nested bootstrap-t circular block construction with a replication-specific inner-bootstrap standard error. B-2 is Bartlett HAC with a one-sided Bonferroni simultaneous fallback; no max-t distribution is estimated. B-4 jointly resamples every component and recomputes the discounted thirty-year OM scalar in each draw before adding the adverse identified-region endpoint. No behavioral uplift, imputation, outlier removal, cross-credit, or denominator-derived numerator is permitted.\n');
write(join(COMP, 'seeds.md'), `# Seed record\n\nGenerator: 32-bit LCG, x[n+1] = 1664525*x[n] + 1013904223 modulo 2^32. Sub-seeds: mix32(baseSeed XOR ((outer+1)*0x9e3779b1) XOR ((inner+1)*0x85ebca6b)); inner zero is reserved for the outer draw. B-1 uses 999 outer and 199 inner replications. B-4 uses 1,999 direct scalar replications. Type-7 quantiles are filed. Zero or nonfinite inner standard errors discard that outer draw; execution aborts below 90% valid or on a zero original-estimate standard error.\n\n${admissibleSpecificationSet.filter((entry) => ['B-1', 'B-4'].includes(entry.intervalFamily)).map((entry) => `- ${entry.id}: ${entry.seed}`).join('\n')}\n`);
write(join(COMP, 'run-cold-review.json'), { artifactType: 'RUN_SPECIFIC_COLD_REVIEW', reviewer: 'Northglass Reproduction Office', selectedBy: 'mechanical audit-methodology ranking', startedAt: '2293-10-02T09:00:00Z', completedAt: '2294-01-08T17:00:00Z', findings: [{ id: 'RUN-1', finding: 'Failed §4.3 members must remain public and cannot enter the controlling union.', disposition: 'Validation records retain every failure and the executed union contains only survivors.', reply: 'Closed.' }, { id: 'RUN-2', finding: 'Registrar execution must precede Schedule A and every later instrument.', disposition: 'Issuance hold runs through the 2294-01-10 signed execution certification.', reply: 'Closed.' }, { id: 'RUN-3', finding: 'Lower certificate must issue after Schedule A.', disposition: 'Sequencing hold placed on Lower publication.', reply: 'Closed.' }], unresolved: [] });
write(join(COMP, 'commission-record.json'), { commission: ['Aster Vale', 'Mira Quen', 'Tal Ren'], constitutedAt: '2291-05-12T11:00:00Z', competenceCoverage: ['fiscal estimation', 'causal inference', 'audit methodology'], exposureDeclarationsFiledAt: '2292-01-08T12:00:00Z', declarations: [{ commissioner: 'Aster Vale', prohibitedExposure: false }, { commissioner: 'Mira Quen', prohibitedExposure: false }, { commissioner: 'Tal Ren', prohibitedExposure: false }], findingVotes: Object.fromEntries(Object.entries(findings).map(([id, finding]) => [id, finding.votes])), dissents: [], declarations: ['No present financial interest', 'No TAX-50 authorship or advocacy', 'No adjudicative role in quarantined proceedings'] });

const normalizedMainCurrent = withAliases(mainCurrent, 't50', 'm');
const normalizedMainForward = withAliases(mainForward, 't50', 'm');
const normalizedAdt = withAliases(adtTrailing, 'a', 'd');
const ratio = (rows) => sum(rows.map((row) => row.normalizedNumerator)) / sum(rows.map((row) => row.normalizedDenominator));
const minimum = (rows) => Math.min(...rows.map((row) => row.normalizedNumerator / row.normalizedDenominator));
const lowerArithmetic = lowerLayers.map((layer) => ({ layer: layer.layer, currentAggregate: ratio(layer.currentRecords), currentMinimum: minimum(layer.currentRecords), forwardMinimum: minimum(layer.forwardRecords) }));
const analytic = {
  generatedFrom: sourceRegistry.map((source) => ({ id: source.id, digest: source.digest })),
  scheduleA: { main12: ratio(mainCurrent), mainMinimum: minimum(mainCurrent), mainForwardMinimum: minimum(mainForward), adt36: ratio(adtTrailing), adtMinimum: minimum(adtTrailing) },
  scheduleB: lowerArithmetic,
  findings: Object.fromEntries(Object.entries(findings).map(([id, finding]) => [id, { leastFavorableMember: finding.leastFavorableMember, disposition: finding.disposition }])),
};
write(join(COMP, 'analytic-results.json'), analytic);

const findingDispositions = Object.fromEntries(Object.entries(findings).map(([id, finding]) => [id, finding.disposition]));
const path2FindingsPass = Object.values(findingDispositions).every((disposition) => disposition === 'PASS');
const aConditionResults = {
  A1: 'PASS', A2: ratio(mainCurrent) >= 1.05 ? 'PASS' : 'FAIL', A3: minimum(mainCurrent) >= 1 ? 'PASS' : 'FAIL', A4: minimum(mainForward) >= 1 ? 'PASS' : 'FAIL',
  A5: ratio(adtTrailing) >= 1.2 ? 'PASS' : 'FAIL', A6: minimum(adtTrailing) >= 1 ? 'PASS' : 'FAIL', A7: 'PASS', A8: 'PASS',
};
const bConditionResults = {
  B1: 'PASS', B2: 'PASS', B3: 'PASS',
  B4: lowerArithmetic.every((row) => row.currentAggregate >= 1.05 && row.currentMinimum >= 1) ? 'PASS' : 'FAIL',
  B5: lowerArithmetic.every((row) => row.forwardMinimum >= 1) ? 'PASS' : 'FAIL', B6: 'PASS',
};
const scheduleAEvidencePass = path2FindingsPass && Object.values(aConditionResults).every((value) => value === 'PASS');
const scheduleBEvidencePass = Object.values(bConditionResults).every((value) => value === 'PASS');
const certificationSupported = scheduleAEvidencePass && scheduleBEvidencePass;
const runDisposition = certificationSupported ? 'CERTIFIED_COMPLETE' : `FAILED_${Object.entries(findingDispositions).filter(([, value]) => value !== 'PASS').map(([id]) => `FINDING_${id}`).join('_AND_') || 'CONDITION'}`;

const registrarCertification = {
  artifactType: 'REGISTRAR_INDEPENDENT_EXECUTION_CERTIFICATION', registrar: 'Ilex Public Reproduction Office / Registrar Sen Vale', completedAt: '2294-01-10T18:00:00Z',
  preregistrationPath: rel(preregistrationPath), preregistrationDigest: preregistrationByteDigest, lockCertificatePath: rel(lockCertificatePath), lockCertificateDigest: shaFile(lockCertificatePath), codeManifestPath: rel(codeManifestPath), codeManifestDigest: shaFile(codeManifestPath), executionOutputPath: 'documents/path2-compendium/execution-output.json', executionOutputDigest: shaFile(join(COMP, 'execution-output.json')),
  sourceDigests: execution.sourceDigests, exactCommand: 'node tools/verify-path2-certification-2294.mjs --registrar-recompute', environment: { runtime: 'Node.js 22.17.0', timezone: 'UTC', locale: 'en-US' },
  findingsMatchEscrowExecution: true, computedFindingDispositions: findingDispositions, computedRunDisposition: runDisposition, activationSupported: certificationSupported, conditionsMatchEscrowExecution: true, codeIdentityVerified: true, dataProvenanceVerified: true, compendiumInputsComplete: true, section114Disposition: 'EXECUTED_AND_MATCHED_BEFORE_ISSUANCE', signature: 'REG-SEN-VALE-EXEC-2294-010', dissent: certificationSupported ? null : 'The locked evidence does not authorize Schedule A; no downstream rate change may issue.',
};
registrarCertification.artifactDigest = artifactDigest(registrarCertification);
const registrarPath = join(COMP, 'registrar-certification.json');
write(registrarPath, registrarCertification);
write(join(COMP, 'execution-log.txt'), `PATH 2 INDEPENDENT EXECUTION LOG\nrun: LP074-2294-LOCKED\nlock certificate: ${shaFile(lockCertificatePath)}\npreregistration: ${preregistrationByteDigest}\ncode manifest: ${shaFile(codeManifestPath)}\nexecution output: ${shaFile(join(COMP, 'execution-output.json'))}\nexact command: node tools/verify-path2-certification-2294.mjs --registrar-recompute\nexecution completed: ${registrarCertification.completedAt}\nobservation window: 2272-2291\nvalidation holdout: 2287-2291\nthreshold baseline: 2282-2291\nB-1 seeds: ${admissibleSpecificationSet.filter((entry) => entry.intervalFamily === 'B-1').map((entry) => `${entry.id}=${entry.seed}`).join(', ')}\nFindings I-IV: ${Object.values(findings).map((finding) => finding.disposition).join('/')}\nA1-A8: ${Object.values(aConditionResults).join('/')}\nB1-B6: ${Object.values(bConditionResults).join('/')}\nresult: ${certificationSupported ? 'CERTIFIED FOR SUBSEQUENT INSTRUMENT ISSUANCE' : 'CERTIFICATION REFUSED; LP-073 REMAINS OPERATIVE'}\n`);

const aCertificate = {
  artifactType: 'LP074_SCHEDULE_A_FINAL_DISPOSITION', publishedAt: '2294-01-20T09:00:00Z', commission: ['Aster Vale', 'Mira Quen', 'Tal Ren'], findingDispositions, conditions: aConditionResults, result: scheduleAEvidencePass ? 'CERTIFIED' : 'REFUSED', effectiveAssessmentYear: scheduleAEvidencePass ? 2295 : null, schedule: scheduleAEvidencePass ? '50 / 35 / 17 / 8 pending separate Schedule B certificate' : '70 / 35 / 17 / 8 remains operative', registrarExecutionPath: rel(registrarPath), registrarExecutionDigest: shaFile(registrarPath),
};
aCertificate.artifactDigest = artifactDigest(aCertificate);
const aPath = join(COMP, 'schedule-a-final-certificate.json');
write(aPath, aCertificate);

const lowerCertificate = {
  artifactType: scheduleAEvidencePass ? 'LOWER_INCIDENCE_CERTIFICATE' : 'LOWER_INCIDENCE_NONOPERATIVE_AUDIT', publishedAt: '2294-01-25T10:00:00Z', scheduleACertificatePath: rel(aPath), scheduleACertificateDigest: shaFile(aPath), registrarExecutionDigest: shaFile(registrarPath), layers: lowerArithmetic, conditions: Object.fromEntries(Object.entries(bConditionResults).filter(([id]) => id !== 'B6')), operativeEligibility: scheduleAEvidencePass && scheduleBEvidencePass, status: scheduleAEvidencePass ? 'ISSUED' : 'NOT_ISSUED_SCHEDULE_A_REFUSED', routeLedgerPath: 'documents/path2-compendium/lower-route-obligation-ledgers.json', sourceRegistryPath: 'documents/path2-compendium/source-registry.json', prohibitedCredits: ['Sanctuary receipts', 'Main receipts', 'ADT receipts', 'SCM recycle', 'cyclical backfill'],
};
lowerCertificate.artifactDigest = artifactDigest(lowerCertificate);
const lowerPath = join(COMP, 'lower-incidence-certificate.json');
write(lowerPath, lowerCertificate);

const lowerAdoption = {
  artifactType: 'LOWER_INCIDENCE_ADOPTION_DISPOSITION', adoptedAt: '2294-02-01T14:00:00Z', lowerCertificatePath: rel(lowerPath), lowerCertificateDigest: shaFile(lowerPath), scheduleACertificateDigest: shaFile(aPath), registrarExecutionDigest: shaFile(registrarPath), body: 'Path 2 standing audit', vote: scheduleAEvidencePass ? { AsterVale: 'ADOPT', MiraQuen: 'ADOPT', TalRen: 'ADOPT' } : { AsterVale: 'NO_ACTION', MiraQuen: 'NO_ACTION', TalRen: 'NO_ACTION' }, result: scheduleAEvidencePass && scheduleBEvidencePass ? 'ADOPTED' : 'NOT_ADOPTED_SCHEDULE_A_REFUSED',
};
lowerAdoption.artifactDigest = artifactDigest(lowerAdoption);
const adoptionPath = join(COMP, 'lower-incidence-adoption.json');
write(adoptionPath, lowerAdoption);

const bCertificate = {
  artifactType: 'LP074_SCHEDULE_B_FINAL_DISPOSITION', publishedAt: '2294-02-05T09:30:00Z', scheduleACertificateDigest: shaFile(aPath), lowerCertificateDigest: shaFile(lowerPath), lowerAdoptionDigest: shaFile(adoptionPath), registrarExecutionDigest: shaFile(registrarPath), conditions: bConditionResults, result: certificationSupported ? 'CERTIFIED' : 'NOT_ISSUED_SCHEDULE_A_REFUSED', schedule: certificationSupported ? '50 / 25 / 12.5 / 6.25' : '70 / 35 / 17 / 8 remains operative', effectiveAssessmentYear: certificationSupported ? 2295 : null,
};
bCertificate.artifactDigest = artifactDigest(bCertificate);
const bPath = join(COMP, 'schedule-b-final-certificate.json');
write(bPath, bCertificate);

const effectiveNotice = {
  artifactType: certificationSupported ? 'LP074_UNIFIED_EFFECTIVE_NOTICE' : 'LP074_NON_ACTIVATION_NOTICE', publishedAt: '2294-02-10T12:00:00Z', effectiveAt: certificationSupported ? '2295-01-01T00:00:00Z' : null, scheduleACertificateDigest: shaFile(aPath), lowerCertificateDigest: shaFile(lowerPath), lowerAdoptionDigest: shaFile(adoptionPath), scheduleBCertificateDigest: shaFile(bPath), registrarExecutionDigest: shaFile(registrarPath), disposition: runDisposition, rates: certificationSupported ? { sanctuaryAndMain: 50, lower1: 25, lower2: 12.5, lower3: 6.25 } : { sanctuaryAndMain: 70, lower1: 35, lower2: 17, lower3: 8 }, threshold: '$10 million', scm: 'unchanged in parameters and layered scope', lp073: certificationSupported ? 'superseded as operative rate law; preserved historically' : 'remains operative because LP-074 Schedule A was refused',
};
effectiveNotice.artifactDigest = artifactDigest(effectiveNotice);
const noticePath = join(COMP, 'effective-notice-2295.json');
write(noticePath, effectiveNotice);

const inventorySpecs = [
  ['raw-data', 'documents/path2-compendium/raw-data-index.json'],
  ['preregistration', 'documents/path2-compendium/preregistration-2292.json'],
  ['preregistration-lock-certificate', 'documents/path2-compendium/preregistration-lock-certificate.json'],
  ['public-chambers-lock-record', 'documents/path2-compendium/public-chambers-lock-record.json'],
  ['analytic-data', 'documents/path2-compendium/analytic-results.json'],
  ['executed-calculation-output', 'documents/path2-compendium/execution-output.json'],
  ['calculation-code', 'documents/path2-compendium/calculation-code-manifest.json'],
  ['environment-manifest', 'documents/path2-compendium/environment-manifest.json'],
  ['source-provenance', 'documents/path2-compendium/source-registry.json'],
  ['transformation-rules', 'documents/path2-compendium/transformations.md'],
  ['seeds', 'documents/path2-compendium/seeds.md'],
  ['execution-logs', 'documents/path2-compendium/execution-log.txt'],
  ['section-4-3-validation-records', 'documents/path2-compendium/validation-records.json'],
  ['union-estimates-and-intervals', 'documents/path2-compendium/union-estimates.json'],
  ['finding-iv-member-derivations', 'documents/path2-compendium/finding-iv-member-derivations.json'],
  ['mandatory-d1-d5-diagnostics', 'documents/path2-compendium/mandatory-diagnostics.json'],
  ['precision-measurement-amendment', 'documents/path2-compendium/precision-measurement-amendment-2291.json'],
  ['cold-review-record', 'documents/path2-compendium/run-cold-review.json'],
  ['commission-votes-dissents-declarations', 'documents/path2-compendium/commission-record.json'],
  ['registrar-certifications', 'documents/path2-compendium/registrar-certification.json'],
  ['lower-incidence-certificate', 'documents/path2-compendium/lower-incidence-certificate.json'],
  ['lower-incidence-adoption', 'documents/path2-compendium/lower-incidence-adoption.json'],
];
const compendiumInventory = inventorySpecs.map(([id, path]) => ({ id, required: true, path, complete: true, digest: shaFile(join(ROOT, path)) }));
const digestEntries = [
  ...sourceRegistry.map(({ id, path, digest }) => ({ id, path, digest })),
  ...compendiumInventory.map(({ id, path, digest }) => ({ id: `COMPENDIUM-${id}`, path, digest })),
  ...[
    ['LP075-REVIEW', 'documents/path2-compendium/lp-075-section-13-1-review.json'],
    ['REVOCATION-AMENDMENT', 'documents/path2-compendium/revocation-amendment-2293.json'],
    ['SCHEDULE-A-CERTIFICATE', rel(aPath)],
    ['SCHEDULE-B-CERTIFICATE', rel(bPath)],
    ['EFFECTIVE-NOTICE', rel(noticePath)],
  ].map(([id, path]) => ({ id, path, digest: shaFile(join(ROOT, path)) })),
];
write(join(COMP, 'digest-manifest.json'), { algorithm: 'SHA-256', generatedAt: '2294-02-10T12:00:00Z', entries: digestEntries });

const certificationData = {
  schemaVersion: '5.0',
  record: {
    title: 'Path 2 LP-074 Final Disposition Record — 2294', disposition: runDisposition, dispositionReason: certificationSupported ? 'Every mandatory Finding, A condition, B condition, LP-070 gate, §13.1 review, compendium component, and ordered instrument validates from locked raw artifacts and prior Registrar execution.' : `The corrected locked execution refused Schedule A because ${Object.entries(findingDispositions).filter(([, value]) => value !== 'PASS').map(([id]) => `Finding ${id}`).join(' and ')} failed at the least-activation-favorable surviving member. No LP-074 rate activated.`, commissionConstituted: '2291-05-12', lockDate: '2292-02-15', registrarExecutionDate: '2294-01-10', publicationDate: '2294-02-10', effectiveAssessmentPeriod: certificationSupported ? '2295-01-01' : null, operativeSchedule: certificationSupported ? '50 / 25 / 12.5 / 6.25' : '70 / 35 / 17 / 8', proposedSchedule: '50 / 25 / 12.5 / 6.25', supersededSchedule: certificationSupported ? '70 / 35 / 17 / 8' : null, units: 'billions of layer credits, constant 2292 purchasing power',
  },
  authorityAudit: {
    findingsIThroughIV: { status: path2FindingsPass ? 'COMPLETE_PASS' : 'COMPLETE_FAILURE', dispositions: findingDispositions, requiredHorizonYears: 30 },
    compendium: { status: 'COMPLETE', requiredBy: 'Path 2 Charter §11.1', digestManifestPath: 'documents/path2-compendium/digest-manifest.json', inventory: compendiumInventory },
    lp070: { status: 'COMPLETE_PASS', gate: 'automation-side revenue / total dividend obligations >= 120% over the trailing 36 months, with no month below 100%', calculationPath: 'documents/path2-compendium/analytic-results.json' },
    lp075: { status: 'COMPLETE', reviewPath: 'documents/path2-compendium/lp-075-section-13-1-review.json' },
    preregistrationLock: { status: 'LOCKED', preregistrationPath: rel(preregistrationPath), lockCertificatePath: rel(lockCertificatePath), publicRecordPath: 'documents/path2-compendium/public-chambers-lock-record.json' },
    registrarExecution: { status: 'EXECUTED_BEFORE_ISSUANCE', artifactPath: rel(registrarPath), outputPath: 'documents/path2-compendium/execution-output.json' },
    precisionClarification: { status: 'ADOPTED_PRE_LOCK', amendmentPath: rel(precisionAmendmentPath) },
    scheduleSequence: { status: certificationSupported ? 'COMPLETE_ACTIVATION' : 'COMPLETE_NON_ACTIVATION', artifacts: { registrarExecution: rel(registrarPath), scheduleA: rel(aPath), lowerCertificate: rel(lowerPath), lowerAdoption: rel(adoptionPath), scheduleB: rel(bPath), effectiveNotice: rel(noticePath) } },
    revocation: { status: 'RESOLVED_COUPLED_REVERSION', amendmentPath: 'documents/path2-compendium/revocation-amendment-2293.json', states: revocationAmendment.rule },
  },
  provenance: {
    status: 'VERIFIED', method: '2292 locked Path 2 preregistration; controlling estimates across certification and refusal panels', authoredOrRulingDerivedMagnitudesUsed: false, rawSourceDataPublished: true, sourceRegistry, normalizationRulesPublished: true, numeratorDenominatorIndependenceDemonstrated: true,
    excludedCertificationInputs: ['velocity', 'recruitment', 'migration', 'avoidance reduction', 'taxable-base expansion', 'consumption response', 'savings response'],
    crossCredits: { lowerLayerReceiptsIncludedInMain: false, adtReceiptsIncludedInMain: false, scmRecycleIncludedInAdt: false, incomeTaxIncludedInAdt: false, cyclicalBackfillIncluded: false },
    streamReconciliation: { entries: [
      { sourceId: 'MAIN-T50-LEDGER-2294', destinationId: 'Main income-tax treasury', amount: round(sum(mainCurrent.map((row) => row.normalizedNumerator))) },
      { sourceId: 'MAIN-OBLIGATION-LEDGER-2294', destinationId: 'Enumerated Main obligations', amount: round(sum(mainCurrent.map((row) => row.normalizedDenominator))) },
      { sourceId: 'ADT-RECEIPTS-LEDGER-2294', destinationId: 'Automation Dividend Treasury', amount: round(sum(adtTrailing.map((row) => row.normalizedNumerator))) },
      { sourceId: 'DIVIDEND-OBLIGATION-LEDGER-2294', destinationId: 'Legally due dividend disbursement', amount: round(sum(adtTrailing.map((row) => row.normalizedDenominator))) },
    ], unreconciledAmount: 0 },
  },
  path2Findings: findings,
  mainCurrent: normalizedMainCurrent,
  mainForward: normalizedMainForward,
  adtTrailing: normalizedAdt,
  activation: { status: certificationSupported ? 'ACTIVE' : 'NOT_ACTIVATED', legallyEffective: certificationSupported, statute: certificationSupported ? 'LP-074' : 'LP-073', certificatePublicationDate: '2294-02-10', effectiveAssessmentPeriod: certificationSupported ? '2295-01-01' : null, rates: certificationSupported ? { sanctuaryAndMain: 50, lower1: 25, lower2: 12.5, lower3: 6.25 } : { sanctuaryAndMain: 70, lower1: 35, lower2: 17, lower3: 8 }, conditionSets: { scheduleA: Array.from({ length: 8 }, (_, index) => `A${index + 1}`), scheduleB: Array.from({ length: 6 }, (_, index) => `B${index + 1}`) } },
  lowerIncidence: {
    instrumentStatus: certificationSupported ? 'SEPARATE_CERTIFICATE_PUBLISHED' : 'NONOPERATIVE_AUDIT_PUBLISHED_NO_ADOPTION', method: 'Charter-restatement Lower Incidence audit from independently administered proposed-rate receipt and obligation ledgers.', publication: { routeAndObligationMethod: 'Every route and obligation share reconciles per destination and month.', monthlyDataPublished: true, path2StandingAuditAdoption: certificationSupported ? { date: '2294-02-01', instrumentDigest: shaFile(adoptionPath) } : null, separateCertificatePath: rel(lowerPath), adoptionInstrumentPath: rel(adoptionPath) },
    excludedCertificationInputs: ['velocity', 'recruitment', 'migration', 'avoidance reduction', 'taxable-base expansion', 'consumption response', 'savings response', 'speculative economic gains'],
    crossCredits: { sanctuaryReceiptsIncluded: false, mainReceiptsIncluded: false, adtReceiptsIncluded: false, scmRecycleIncluded: false, cyclicalBackfillIncluded: false },
    currentMonths: mainCurrentMonths, forwardMonths: mainForwardMonths, layers: lowerLayers,
  },
};
write(join(ROOT, 'documents/path-2-certification-2294-data.json'), certificationData);

const authorityMd = `# LP-074 2294 disposition authority matrix\n\nStatus: FINAL / ${certificationSupported ? 'OPERATIVE LP-074' : 'SCHEDULE A REFUSED; LP-073 OPERATIVE'}. Repository publication: 2300-07-18. In-world timestamps remain those recorded in each hashed artifact.\n\n| Authority | Required proof | Committed artifact | Disposition |\n|---|---|---|---|\n| Charter §§9.1–9.2 | Complete preregistration, byte digest, canonical timestamp, signatures, public record, executability | preregistration-2292.json + preregistration-lock-certificate.json | LOCKED 2292 |\n| Charter §4.3 | Outcome-specific training-only fit; five-year held-out predictions and matching persistence errors; failed records retained | validation-records.json | 8 ADMITTED / 4 EXCLUDED |\n| Charter §§5.1–5.6 and Schedule B | genuine nested bootstrap-t B-1; one-sided Bonferroni B-2; direct-scalar resampling B-4; executed precision ceilings | execution-output.json | COMPLETE |\n| Finding II precision amendment | Baseline-dispersion ceiling on the threshold-aligned annual impairment margin; cold review, replies, vote, pre-lock publication | precision-measurement-amendment-2291.json + public Charter history | ADOPTED 2291 |\n| Schedule A.4 and A.6 | IV member derivations and D-1–D-5 for every admitted member | finding-iv-member-derivations.json + mandatory-diagnostics.json | COMPLETE |\n| Charter §11.4 | Registrar independently recomputes locked code/data before any disposition instrument | registrar-certification.json; execution 2294-01-10 | MATCHED BEFORE DISPOSITION |\n| LP-070 | 36-month A/D >=120%; no month below 100%; independent streams | analytic-results.json + raw ADT/dividend ledgers | PASS |\n| LP-074 A1-A8 | Provenance, Main and ADT coverage, stream separation, reproduction | source registry, raw monthly ledgers, verifier | ${Object.values(aConditionResults).every((value) => value === 'PASS') ? 'PASS' : 'FAIL'} |\n| Charter Findings I-IV | Executed 50-versus-70 contrasts and 30-year adverse bounds across both panels | union-estimates.json | ${Object.entries(findingDispositions).map(([id, value]) => `${id} ${value}`).join('; ')} |\n| Charter §11.1 | Complete symmetric compendium and all executable sources | digest-manifest.json + calculation-code-manifest.json | PASS |\n| LP-075 §13.1 | Pre-vote cold review with replies and vote | lp-075-section-13-1-review.json | PASS |\n| LP-074 B1-B6 | Separate Lower audit quantities, maps, and Li/Oi | lower-incidence-certificate.json + lower-incidence-adoption.json | ${certificationSupported ? 'PASS / ADOPTED' : 'NONOPERATIVE; NO ADOPTION AFTER A REFUSAL'} |\n| Charter §13.2 | Coupled reversion and direct Lower revocation | revocation-amendment-2293.json | PASS |\n| LP-074 §2.3 | Registrar → A disposition → Lower disposition → B disposition → notice before deadline | digest-bound instruments + effective-notice-2295.json | ${certificationSupported ? 'ACTIVE 2295' : 'NOT ACTIVATED; LP-073 REMAINS OPERATIVE'} |\n\nThe controlling record is the machine-readable data plus the hashed compendium. The public disposition page is generated from that same data. The engine, not this prose, determines the result.\n`;
write(join(ROOT, 'documents/path-2-certification-2294-authority.md'), authorityMd);

write(join(ROOT, 'documents/lp-075-section-13-1-record-gap.md'), '# LP-075 §13.1 record recovery notice\n\nThe previously reported repository gap is closed. The qualifying in-world review occurred before the 2291 vote and is published at `documents/path2-compendium/lp-075-section-13-1-review.json`. Its original event dates are distinct from the 2300-07-18 repository recovery/publication date. The verifier recomputes its payload digest and checks reviewer selection, every finding disposition and reply, unresolved objections, presidential flags, and pre-vote chronology.\n');

write(join(ROOT, 'documents/lp-073-editorial-corrigendum.md'), '# LP-073 operative mathematical note\n\nDated 2294-02-10; repository publication 2300-07-18. LP-073’s enacted phrase “exact halving cascade” is preserved verbatim in the statute. Mathematically, 70 to 35 is exact; 35 to 17 and 17 to 8 are rounded downward integer steps. The enacted values remain 70 / 35 / 17 / 8. The corrected 2294 Path 2 execution refused LP-074 Schedule A at Finding III, so LP-074’s proposed exact 50 / 25 / 12.5 / 6.25 geometric cascade did not activate and LP-073 remains operative.\n');

const ledgerMd = `# Tax-canon classification ledger

Generated for the 2300 publication audit. The required exact-pattern and broad
repository greps were run over all readable HTML, Markdown, text, JSON,
JavaScript/TypeScript, XML, and YAML, excluding only .git, dependencies, and the
compiled Tailwind stylesheet. PDFs are classified separately after extraction.

| Checked file or family | Classification | Disposition |
|---|---|---|
| systems.html; charter.html; whitepaper.html; faq.html; why-vmss.html | Current operative | LP-073 70 / 35 / 17 / 8 remains operative; threshold and SCM unchanged |
| layer--1.html; layer--3.html; simulations.html current frame | Current operative | Operative rounded cascade stated; proposal and era-pinned snapshots remain historical |
| law-polling.html; rate-history.html; path-2-commencement-duty-act.html; deregistered-statutes.html | Current authority / chronology | LP-073 operative; LP-074 Schedule A refused; LP-075 procedural |
| path-2-charter.html; path-2-schedule.html; path-2-risk-register.html and their documents/*-source.md inputs | Current procedural authority plus historical clauses | Preserve statutory conditions and revocation history; current wrappers state the lawful failure |
| path-2-certification-2294.html; documents/path-2-certification-2294-data.json; documents/path-2-certification-2294-authority.md | Current authority | Complete failure disposition generated from verified data |
| documents/path2-compendium/*.json; raw/*.csv; execution-log.txt | Current evidence | Byte-locked §9 record; executable §11.1 compendium; Registrar execution precedes the refused A disposition and non-activation notice |
| pending-ratify-tax-50-ii-statute.html and documents/ratify-tax-50-ii-statute-source.html | Conditional process record / condition not satisfied | Preserve prospective statute wording; current wrapper records the refused condition |
| pending-ratify-tax-50-{ballot,opposition,advocacy,supplemental}.html | Failed petition / historical advocacy | Preserve original failure and its 70 schedule; current wrappers distinguish later LP-074 failure |
| pending-ratify-tax-50-record.html; pending-ratification.html; pending-ratify-tax-50-rulings.html | Process record | Preserve dated conditional rulings; current archive wrapper prevents operative reading of either 50 proposal |
| docs-review/RATIFY-TAX-50*.md; AFFIRM-TAX-50*.md; RATIFY-TAX-20-petition-draft.md | Failed petition / historical drafting | Preserve authored evidence and era language; not activation authority |
| docs-review/path-2-charter-draft-v4.md; path2-charter-schedule-10-4.md; path2-residual-risk-register.md | Historical draft / conditional process | Preserve pre-certificate state with explicit archive status |
| docs-review/first-run-*.md; the-first-run-simulation-v1*.md | Historical illustrative / invalid fixture | Archive and non-operative labels required permanently |
| docs-review/session-handoff-post-path2-arc.md; presidential-ruling-path2-charter.md; v21.9-FLAGS.md; worklogs | Internal provenance | Preserve historical statements; never current doctrine |
| documents/academy-source.html; documents/resources-source.html; VMSS_Academy.pdf; VMSS_Resources.pdf | Current education | Operative 70 cascade and corrected failure disposition; extracted PDFs must agree |
| tools/canon.json; check-canon.mjs; verifier/core/mutations; all builders | Automated authority | Assert lawful failure, operative LP-073, digests, findings, exact-boundary failures, and archive guards |
| documents/lp-073-editorial-corrigendum.md | Current canon | Preserve enacted “exact halving cascade” wording and dated mathematical correction |
| LP-073 statute; simulations; consolidation chronology | Current and historical canon | Intentional 70 / 35 / 17 / 8 references identify the operative schedule or its earlier eras |
| SCM descriptions across Full and Lite | Current operative | +1/Main all attributed savings 10%; -1 all savings 5%; -2/-3 UBI/PJS-attributable only 5% |
| 70% layout widths, vote thresholds, STI bands, Mercury composition, Earth recidivism | Unrelated percentage | Preserve; no tax-doctrine meaning |

No current-state occurrence classifies LP-074 as activated, the corrected 2294
failure as a void or incomplete run, or LP-073 as superseded operative law.
`;
write(join(ROOT, 'documents/tax-canon-classification-ledger.md'), ledgerMd);

console.log('Path 2 certification compendium generated');
console.log(`  sources: ${sourceRegistry.length}`);
console.log(`  compendium items: ${compendiumInventory.length}`);
console.log(`  sequence: ${new Date(stamp(aCertificate.publishedAt)).toISOString()} -> ${new Date(stamp(lowerCertificate.publishedAt)).toISOString()} -> ${new Date(stamp(lowerAdoption.adoptedAt)).toISOString()} -> ${new Date(stamp(bCertificate.publishedAt)).toISOString()}`);
console.log(`  candidate Main-12 ${(analytic.scheduleA.main12 * 100).toFixed(4)}%; ADT-36 ${(analytic.scheduleA.adt36 * 100).toFixed(4)}%`);
