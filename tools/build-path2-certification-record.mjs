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

const baselineII = Array.from({ length: 10 }, (_, index) => ({ year: 2282 + index, realDividendPerResident: round(99.42 + index * 0.118 + seasonA[index] / 10000, 4) }));
const baselineIII = Array.from({ length: 10 }, (_, index) => ({ year: 2282 + index, annualScmActivations: round(8.04 + index * 0.051 + seasonB[index] / 10000, 4), flowTestMargin: round(0.72 + (index % 4) * 0.03, 4) }));
write(join(RAW, findingRaw.I.file), { units: 'billion constant-2292 Main credits', observedYears: Array.from({ length: 20 }, (_, index) => ({ year: 2272 + index, receipts: round(1184 + index * 17.3 + seasonA[index % 12] / 100), obligations: round(1096 + index * 16.8 + seasonB[index % 12] / 100) })) });
write(join(RAW, findingRaw.II.file), { units: 'constant-2292 dividend credits per resident', baseline: baselineII });
write(join(RAW, findingRaw.III.file), { units: 'annual district-equivalent SCM pulses and dimensionless Flow Test margin', baseline: baselineIII });
write(join(RAW, findingRaw.IV.file), { units: 'billion constant-2292 credits and discounted welfare-credit equivalents', observedPublicDeployment: Array.from({ length: 10 }, (_, index) => ({ year: 2282 + index, publicFirstAllocation: round(38.2 + index * 0.61 + seasonA[index] / 1000), realizedWelfare: round(42.7 + index * 0.66 + seasonB[index] / 1000) })) });

const sourceRegistry = [
  ...rawSeries.map((source) => ({ id: source.id, path: rel(join(RAW, source.file)), digest: shaFile(join(RAW, source.file)), custodian: `${source.description} authority`, description: source.description })),
  ...Object.values(findingRaw).map((source) => ({ id: source.sourceId, path: rel(join(RAW, source.file)), digest: shaFile(join(RAW, source.file)), custodian: 'Canonical Statistical Authority, Path 2 escrow desk', description: source.description })),
];
write(join(COMP, 'source-registry.json'), { schemaVersion: '1.0', lockVintage: '2292-02-15', sources: sourceRegistry });
write(join(COMP, 'raw-data-index.json'), { schemaVersion: '1.0', cutoff, unitsNotice: 'Each raw ledger preserves original nominal million-credit units. The verifier applies the declared deflator conversion.', sources: sourceRegistry });

const horizonYears = Array.from({ length: 30 }, (_, index) => 2295 + index);
const interval = (family, width, precisionFloor) => ({ family, oneSidedLevel: 0.95, orientation: 'against-activation', simultaneous: true, width, precisionFloor });
const memberBase = (id, panel, equivalenceClass, functionalClass, assumptions, sourceId, validationError, persistenceError, family, width, precisionFloor) => ({
  id, panel, equivalenceClass, functionalClass, identificationAssumptions: assumptions, sourceId,
  validationError, persistenceError, interval: interval(family, width, precisionFloor),
});

const findings = {
  I: {
    threshold: 1,
    baselineMean: 1.0864,
    leastFavorableMember: 'I-refusal-stress',
    members: [
      { ...memberBase('I-certification-panel', 'certification', 'I-ec-dynamic', 'dynamic receipts-obligations projection', ['canonical demographic path', 'no behavioral tax-base uplift'], findingRaw.I.sourceId, 0.0182, 0.0267, 'B-1 block bootstrap', 0.0251, 0.0864), horizon: horizonYears.map((year, i) => ({ year, receiptsPoint: round(1518 + i * 22.9), obligationsPoint: round(1450 + i * 22.1), coveragePoint: round(1.0469 - i * 0.00018 + (i % 4) * 0.0005), coverageLowerBound: round(1.0287 - i * 0.00018 + (i % 4) * 0.0005) })) },
      { ...memberBase('I-refusal-stress', 'refusal', 'I-ec-local-trend', 'local-trend adverse obligation projection', ['upper demographic obligation path', 'zero velocity credit'], findingRaw.I.sourceId, 0.0204, 0.0267, 'B-2 analytic max-t', 0.0294, 0.0864), horizon: horizonYears.map((year, i) => ({ year, receiptsPoint: round(1509 + i * 22.2), obligationsPoint: round(1454 + i * 22.0), coveragePoint: round(1.0378 - i * 0.00022 + (i % 5) * 0.00035), coverageLowerBound: round(1.0209 - i * 0.00022 + (i % 5) * 0.00035) })) },
    ],
    votes: [{ commissioner: 'Aster Vale', vote: 'CERTIFY' }, { commissioner: 'Mira Quen', vote: 'CERTIFY' }, { commissioner: 'Tal Ren', vote: 'CERTIFY' }],
    disposition: 'PASS',
  },
  II: {
    baseline: baselineII,
    baselineMean: round(mean(baselineII.map((row) => row.realDividendPerResident)), 8),
    leastFavorableMember: 'II-refusal-attribution',
    members: [
      { ...memberBase('II-certification-panel', 'certification', 'II-ec-state-space', 'state-space dividend projection', ['ADT-only funding', 'schedule attribution through prohibited-credit exclusion'], findingRaw.II.sourceId, 0.0141, 0.0216, 'B-1 block bootstrap', 1.5, 1.84), horizon: horizonYears.map((year, i) => ({ year, disbursementPoint: round(101.14 + i * 0.075 + (i % 4) * 0.03), disbursementLowerBound: round(100.34 + i * 0.052 + (i % 4) * 0.02), attributableToSchedule: false, attributionDisposition: 'No schedule-attributable impairment under the adverse identification member' })) },
      { ...memberBase('II-refusal-attribution', 'refusal', 'II-ec-local-level', 'local-level adverse dividend projection', ['ADT-only funding', 'maximum admissible adverse schedule attribution'], findingRaw.II.sourceId, 0.0168, 0.0216, 'B-2 analytic max-t', 1.4, 1.84), horizon: horizonYears.map((year, i) => ({ year, disbursementPoint: round(100.91 + i * 0.061 + (i % 3) * 0.02), disbursementLowerBound: round(100.12 + i * 0.041 + (i % 3) * 0.015), attributableToSchedule: false, attributionDisposition: 'Lower bound remains above the observed baseline; attributable impairment count is zero' })) },
    ],
    votes: [{ commissioner: 'Aster Vale', vote: 'CERTIFY' }, { commissioner: 'Mira Quen', vote: 'CERTIFY' }, { commissioner: 'Tal Ren', vote: 'CERTIFY' }],
    disposition: 'PASS',
  },
  III: {
    baseline: baselineIII,
    baselineActivationMean: round(mean(baselineIII.map((row) => row.annualScmActivations)), 8),
    leastFavorableMember: 'III-refusal-tail',
    members: [
      { ...memberBase('III-certification-panel', 'certification', 'III-ec-count-panel', 'count-panel activation model', ['SCM parameters fixed', 'simultaneous upper frequency path'], findingRaw.III.sourceId, 0.031, 0.044, 'B-1 block bootstrap', 0.82, 2.11), horizon: horizonYears.map((year, i) => ({ year, activationFrequencyPoint: round(8.74 + i * 0.021 + (i % 4) * 0.04), activationFrequencyUpperBound: round(9.44 + i * 0.019 + (i % 4) * 0.035), flowMarginPoint: round(0.69 - i * 0.003 + (i % 5) * 0.008), flowMarginLowerBound: round(0.39 - i * 0.002 + (i % 5) * 0.006) })) },
      { ...memberBase('III-refusal-tail', 'refusal', 'III-ec-threshold-hazard', 'threshold-hazard activation model', ['SCM parameters fixed', 'maximum admissible liquidity response'], findingRaw.III.sourceId, 0.036, 0.044, 'B-2 analytic max-t', 0.98, 2.11), horizon: horizonYears.map((year, i) => ({ year, activationFrequencyPoint: round(8.88 + i * 0.023 + (i % 4) * 0.04), activationFrequencyUpperBound: round(9.62 + i * 0.02 + (i % 4) * 0.035), flowMarginPoint: round(0.63 - i * 0.0032 + (i % 5) * 0.006), flowMarginLowerBound: round(0.31 - i * 0.0025 + (i % 5) * 0.004) })) },
    ],
    votes: [{ commissioner: 'Aster Vale', vote: 'CERTIFY' }, { commissioner: 'Mira Quen', vote: 'CERTIFY' }, { commissioner: 'Tal Ren', vote: 'CERTIFY' }],
    disposition: 'PASS',
  },
  IV: {
    baselinePublicDeploymentMean: 43.18,
    leastFavorableMember: 'IV-refusal-partial-id',
    retainedCapitalQuantity: 214.7,
    retainedCapitalUnits: 'billion constant-2292 Main credits attributable to 70-to-50 over the first assessment year',
    publicCounterfactual: 'realized 2282-2291 public first-allocation portfolio, same traced venture classes',
    members: [
      { ...memberBase('IV-certification-panel', 'certification', 'IV-ec-demand-system', 'venture-level demand-system OM', ['ledger-traced ventures only', 'realized public allocation counterfactual'], findingRaw.IV.sourceId, 0.022, 0.031, 'B-1 block bootstrap', 1.04, 43.18), omPoint: 4.86, omLowerBound: 3.12, horizon: horizonYears.map((year, i) => ({ year, privateMarginalValue: round(0.41 + i * 0.018), publicCounterfactualMarginalValue: round(0.31 + i * 0.014), concentrationEventsUpperBound: 0 })) },
      { ...memberBase('IV-refusal-partial-id', 'refusal', 'IV-ec-partial-id', 'partial-identification OM bound', ['ledger-traced ventures only', 'adverse displacement and external-cost bounds'], findingRaw.IV.sourceId, 0.026, 0.031, 'B-4 identification-region bound', 1.37, 43.18), omPoint: 3.91, omLowerBound: 1.84, horizon: horizonYears.map((year, i) => ({ year, privateMarginalValue: round(0.36 + i * 0.016), publicCounterfactualMarginalValue: round(0.30 + i * 0.0145), concentrationEventsUpperBound: 0 })) },
    ],
    votes: [{ commissioner: 'Aster Vale', vote: 'CERTIFY' }, { commissioner: 'Mira Quen', vote: 'CERTIFY' }, { commissioner: 'Tal Ren', vote: 'CERTIFY' }],
    disposition: 'PASS',
  },
};

// Reconcile every published finding statistic to its row-level inputs.  The
// interval width is a simultaneous-family ceiling; the realized adverse gap
// may be smaller.  Precision floors are the preregistered distance from the
// operative boundary on the locked baseline scale.
for (const member of findings.I.members) {
  for (const row of member.horizon) {
    row.coveragePoint = round(row.receiptsPoint / row.obligationsPoint);
    if (row.coverageLowerBound >= row.coveragePoint) row.coverageLowerBound = round(row.coveragePoint - member.interval.width * 0.72);
  }
}
const findingIIIMargin = round(findings.III.baselineActivationMean * 0.25, 8);
for (const member of findings.III.members) member.interval.precisionFloor = findingIIIMargin;
for (const member of findings.IV.members) {
  for (const [index, row] of member.horizon.entries()) {
    row.netMarginalValue = round(row.privateMarginalValue - row.publicCounterfactualMarginalValue);
    row.discountFactor = round(1 / (1.02 ** (index + 1)), 10);
    row.discountedNetMarginalValue = round(row.netMarginalValue * row.discountFactor, 8);
  }
  member.omPoint = round(sum(member.horizon.map((row) => row.discountedNetMarginalValue)), 8);
  member.omLowerBound = round(member.omPoint - member.interval.width, 8);
}

findings.I.precisionFloorCalculation = 'locked observed coverage mean 1.0864 minus the operative 1.0000 boundary = 0.0864';
findings.II.precisionFloorCalculation = 'minimum finite baseline-to-impairment attribution margin fixed at 1.84 real dividend credits per resident';
findings.III.precisionFloorCalculation = `125% forbidden boundary minus the locked baseline mean = 25% of ${findings.III.baselineActivationMean}, or ${findingIIIMargin}`;
findings.IV.precisionFloorCalculation = 'locked realized public-deployment baseline mean, 43.18 welfare-credit equivalents, is the conservative identification scale';

write(join(COMP, 'union-estimates.json'), { schemaVersion: '1.0', activationYear: 2295, findings });

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

write(join(COMP, 'preregistration-2292.json'), {
  artifactType: 'PATH2_PREREGISTRATION', lockedAt: '2292-02-15T12:00:00Z', cutoff, vintage: '2292-02-15', observationWindow: '2272-02 through 2292-01', maximumReportingLagMonths: 1,
  panels: { certification: 'Lumen Fiscal Methods Collective', refusal: 'Cairn Adverse Inference Bench' },
  admissibleMembers: Object.fromEntries(Object.entries(findings).map(([id, finding]) => [id, finding.members.map((member) => ({ id: member.id, panel: member.panel, equivalenceClass: member.equivalenceClass, family: member.interval.family }))])),
  intercurrentTreatments: ['obligation-law change', 'ADT structural change', 'SCM doctrine change', 'demographic regime change'],
  codeEntryPoint: 'tools/verify-path2-certification-2294.mjs', seeds: 'not applicable; analytic and deterministic interval inputs are deposited, with no stochastic recomputation step',
});
write(join(COMP, 'environment-manifest.json'), { runtime: 'Node.js', minimumVersion: '20.0.0', dependencies: [], locale: 'en-US', timezone: 'UTC', deterministic: true, entryPoints: ['tools/build-path2-certification-record.mjs', 'tools/verify-path2-certification-2294.mjs'] });
write(join(COMP, 'transformations.md'), '# Path 2 transformation rules\n\nRaw nominal million-credit ledger values are multiplied by the published month-specific canonical deflator ratio and divided by 1,000 to obtain billion constant-2292 credits. All rows carry that scale explicitly. No behavioral uplift, outlier removal, cross-credit, or denominator-derived numerator is permitted. Finding members use the locked §10.4 interval family shown in the union record; simultaneous adverse bounds control annual paths.\n');
write(join(COMP, 'seeds.md'), '# Seed record\n\nNo pseudorandom seed is applicable. The published interval inputs and every verification calculation are deterministic. The original in-world resampling execution is represented by its deposited member bounds; repository reproduction validates those deposited calculations without rerunning stochastic sampling.\n');
write(join(COMP, 'run-cold-review.json'), { artifactType: 'RUN_SPECIFIC_COLD_REVIEW', reviewer: 'Northglass Reproduction Office', selectedBy: 'mechanical audit-methodology ranking', startedAt: '2293-10-02T09:00:00Z', completedAt: '2294-01-24T17:00:00Z', findings: [{ id: 'RUN-1', finding: 'Refusal-panel member must control Findings I-IV where least favorable.', disposition: 'Verified in executed union.', reply: 'Closed.' }, { id: 'RUN-2', finding: 'Lower certificate must issue after Schedule A.', disposition: 'Sequencing hold placed on Lower publication.', reply: 'Closed.' }], unresolved: [] });
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

const aCertificate = {
  artifactType: 'LP074_SCHEDULE_A_FINAL_CERTIFICATE', publishedAt: '2294-01-31T09:00:00Z', commission: ['Aster Vale', 'Mira Quen', 'Tal Ren'], findingDispositions: { I: 'PASS', II: 'PASS', III: 'PASS', IV: 'PASS' }, conditions: Object.fromEntries(Array.from({ length: 8 }, (_, index) => [`A${index + 1}`, 'PASS'])), effectiveAssessmentYear: 2295, schedule: '50 / 35 / 17 / 8 pending separate Schedule B certificate', registrarExecutionRequired: true,
};
aCertificate.artifactDigest = artifactDigest(aCertificate);
const aPath = join(COMP, 'schedule-a-final-certificate.json');
write(aPath, aCertificate);

const lowerCertificate = {
  artifactType: 'LOWER_INCIDENCE_CERTIFICATE', publishedAt: '2294-02-12T10:00:00Z', scheduleACertificatePath: rel(aPath), scheduleACertificateDigest: shaFile(aPath), layers: lowerArithmetic, conditions: { B1: 'PASS', B2: 'PASS', B3: 'PASS', B4: 'PASS', B5: 'PASS' }, routeLedgerPath: 'documents/path2-compendium/lower-route-obligation-ledgers.json', sourceRegistryPath: 'documents/path2-compendium/source-registry.json', prohibitedCredits: ['Sanctuary receipts', 'Main receipts', 'ADT receipts', 'SCM recycle', 'cyclical backfill'],
};
lowerCertificate.artifactDigest = artifactDigest(lowerCertificate);
const lowerPath = join(COMP, 'lower-incidence-certificate.json');
write(lowerPath, lowerCertificate);

const lowerAdoption = {
  artifactType: 'LOWER_INCIDENCE_ADOPTION', adoptedAt: '2294-02-20T14:00:00Z', lowerCertificatePath: rel(lowerPath), lowerCertificateDigest: shaFile(lowerPath), scheduleACertificateDigest: shaFile(aPath), body: 'Path 2 standing audit', vote: { AsterVale: 'ADOPT', MiraQuen: 'ADOPT', TalRen: 'ADOPT' }, result: 'ADOPTED',
};
lowerAdoption.artifactDigest = artifactDigest(lowerAdoption);
const adoptionPath = join(COMP, 'lower-incidence-adoption.json');
write(adoptionPath, lowerAdoption);

const bCertificate = {
  artifactType: 'LP074_SCHEDULE_B_FINAL_CERTIFICATE', publishedAt: '2294-02-21T09:30:00Z', scheduleACertificateDigest: shaFile(aPath), lowerCertificateDigest: shaFile(lowerPath), lowerAdoptionDigest: shaFile(adoptionPath), conditions: Object.fromEntries(Array.from({ length: 6 }, (_, index) => [`B${index + 1}`, 'PASS'])), schedule: '50 / 25 / 12.5 / 6.25', effectiveAssessmentYear: 2295,
};
bCertificate.artifactDigest = artifactDigest(bCertificate);
const bPath = join(COMP, 'schedule-b-final-certificate.json');
write(bPath, bCertificate);

const effectiveNotice = {
  artifactType: 'LP074_UNIFIED_EFFECTIVE_NOTICE', publishedAt: '2294-02-22T12:00:00Z', effectiveAt: '2295-01-01T00:00:00Z', scheduleACertificateDigest: shaFile(aPath), lowerCertificateDigest: shaFile(lowerPath), lowerAdoptionDigest: shaFile(adoptionPath), scheduleBCertificateDigest: shaFile(bPath), rates: { sanctuaryAndMain: 50, lower1: 25, lower2: 12.5, lower3: 6.25 }, threshold: '$10 million', scm: 'unchanged in parameters and layered scope', lp073: 'superseded as operative rate law; preserved historically',
};
effectiveNotice.artifactDigest = artifactDigest(effectiveNotice);
const noticePath = join(COMP, 'effective-notice-2295.json');
write(noticePath, effectiveNotice);

write(join(COMP, 'registrar-certification.json'), { artifactType: 'REGISTRAR_COMPLETENESS_AND_EXECUTION_CERTIFICATION', registrar: 'Ilex Public Reproduction Office', completedAt: '2294-02-21T18:00:00Z', findingsMatchEscrowExecution: true, conditionsMatchEscrowExecution: true, codeIdentityVerified: true, dataProvenanceVerified: true, compendiumComplete: true, independentExecution: 'Node.js verifier executed over escrowed files; all comparisons and digests matched.', dissent: null });
write(join(COMP, 'execution-log.txt'), `PATH 2 INDEPENDENT EXECUTION LOG\nrun: LP074-2294-REMEDIAL\nlock: 2292-02-15T12:00:00Z\nexecution completed: 2294-02-21T18:00:00Z\nMain-12: ${(analytic.scheduleA.main12 * 100).toFixed(4)}%\nMain minimum: ${(analytic.scheduleA.mainMinimum * 100).toFixed(4)}%\nMain forward minimum: ${(analytic.scheduleA.mainForwardMinimum * 100).toFixed(4)}%\nADT-36: ${(analytic.scheduleA.adt36 * 100).toFixed(4)}%\nADT minimum: ${(analytic.scheduleA.adtMinimum * 100).toFixed(4)}%\nFindings I-IV: PASS\nA1-A8: PASS\nB1-B6: PASS\nresult: CERTIFIED\n`);

const inventorySpecs = [
  ['raw-data', 'documents/path2-compendium/raw-data-index.json'],
  ['analytic-data', 'documents/path2-compendium/analytic-results.json'],
  ['calculation-code', 'tools/path2-certification-core.mjs'],
  ['environment-manifest', 'documents/path2-compendium/environment-manifest.json'],
  ['source-provenance', 'documents/path2-compendium/source-registry.json'],
  ['transformation-rules', 'documents/path2-compendium/transformations.md'],
  ['seeds', 'documents/path2-compendium/seeds.md'],
  ['execution-logs', 'documents/path2-compendium/execution-log.txt'],
  ['union-estimates-and-intervals', 'documents/path2-compendium/union-estimates.json'],
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
write(join(COMP, 'digest-manifest.json'), { algorithm: 'SHA-256', generatedAt: '2294-02-22T12:00:00Z', entries: digestEntries });

const certificationData = {
  schemaVersion: '4.0',
  record: {
    title: 'Path 2 LP-074 Final Certification Record — 2294', disposition: 'CERTIFIED_COMPLETE', dispositionReason: 'Every mandatory Finding, A condition, B condition, LP-070 gate, §13.1 review, compendium component, and ordered instrument validates from committed artifacts.', commissionConstituted: '2291-05-12', lockDate: '2292-02-15', publicationDate: '2294-02-22', effectiveAssessmentPeriod: '2295-01-01', operativeSchedule: '50 / 25 / 12.5 / 6.25', supersededSchedule: '70 / 35 / 17 / 8', units: 'billions of layer credits, constant 2292 purchasing power',
  },
  authorityAudit: {
    findingsIThroughIV: { status: 'COMPLETE_PASS', requiredHorizonYears: 30 },
    compendium: { status: 'COMPLETE', requiredBy: 'Path 2 Charter §11.1', digestManifestPath: 'documents/path2-compendium/digest-manifest.json', inventory: compendiumInventory },
    lp070: { status: 'COMPLETE_PASS', gate: 'automation-side revenue / total dividend obligations >= 120% over the trailing 36 months, with no month below 100%', calculationPath: 'documents/path2-compendium/analytic-results.json' },
    lp075: { status: 'COMPLETE', reviewPath: 'documents/path2-compendium/lp-075-section-13-1-review.json' },
    scheduleSequence: { status: 'COMPLETE', artifacts: { scheduleA: rel(aPath), lowerCertificate: rel(lowerPath), lowerAdoption: rel(adoptionPath), scheduleB: rel(bPath), effectiveNotice: rel(noticePath) } },
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
  activation: { status: 'ACTIVE', legallyEffective: true, statute: 'LP-074', certificatePublicationDate: '2294-02-22', effectiveAssessmentPeriod: '2295-01-01', rates: { sanctuaryAndMain: 50, lower1: 25, lower2: 12.5, lower3: 6.25 }, conditionSets: { scheduleA: Array.from({ length: 8 }, (_, index) => `A${index + 1}`), scheduleB: Array.from({ length: 6 }, (_, index) => `B${index + 1}`) } },
  lowerIncidence: {
    instrumentStatus: 'SEPARATE_CERTIFICATE_PUBLISHED', method: 'Charter-restatement Lower Incidence audit from independently administered proposed-rate receipt and obligation ledgers.', publication: { routeAndObligationMethod: 'Every route and obligation share reconciles per destination and month.', monthlyDataPublished: true, path2StandingAuditAdoption: { date: '2294-02-20', instrumentDigest: shaFile(adoptionPath) }, separateCertificatePath: rel(lowerPath), adoptionInstrumentPath: rel(adoptionPath) },
    excludedCertificationInputs: ['velocity', 'recruitment', 'migration', 'avoidance reduction', 'taxable-base expansion', 'consumption response', 'savings response', 'speculative economic gains'],
    crossCredits: { sanctuaryReceiptsIncluded: false, mainReceiptsIncluded: false, adtReceiptsIncluded: false, scmRecycleIncluded: false, cyclicalBackfillIncluded: false },
    currentMonths: mainCurrentMonths, forwardMonths: mainForwardMonths, layers: lowerLayers,
  },
};
write(join(ROOT, 'documents/path-2-certification-2294-data.json'), certificationData);

const authorityMd = `# LP-074 2294 certification authority matrix\n\nStatus: FINAL / OPERATIVE. Repository publication: 2300-07-18. In-world timestamps remain those recorded in each hashed artifact.\n\n| Authority | Required proof | Committed artifact | Disposition |\n|---|---|---|---|\n| LP-070 | 36-month A/D >=120%; no month below 100%; independent streams | analytic-results.json + raw ADT/dividend ledgers | PASS |\n| LP-074 A1-A8 | Provenance, Main and ADT coverage, stream separation, reproduction | source registry, raw monthly ledgers, verifier | PASS |\n| Charter Findings I-IV | 30-year adverse bounds across both panels | union-estimates.json | PASS |\n| Charter §11.1 | Complete symmetric compendium | digest-manifest.json and inventory | PASS |\n| LP-075 §13.1 | Pre-vote cold review with replies and vote | lp-075-section-13-1-review.json | PASS |\n| LP-074 B1-B6 | Separate Lower certificate, maps, Li/Oi, adoption | lower-incidence-certificate.json + lower-incidence-adoption.json | PASS |\n| Charter §13.2 | Coupled reversion and direct Lower revocation | revocation-amendment-2293.json | PASS |\n| LP-074 §2.3 | Certificates before next assessment period | ordered instruments + effective-notice-2295.json | ACTIVE 2295 |\n\nThe controlling record is the machine-readable data plus the hashed compendium. The public certificate is generated from that same data. LP-073 remains preserved as historical prior law.\n`;
write(join(ROOT, 'documents/path-2-certification-2294-authority.md'), authorityMd);

write(join(ROOT, 'documents/lp-075-section-13-1-record-gap.md'), '# LP-075 §13.1 record recovery notice\n\nThe previously reported repository gap is closed. The qualifying in-world review occurred before the 2291 vote and is published at `documents/path2-compendium/lp-075-section-13-1-review.json`. Its original event dates are distinct from the 2300-07-18 repository recovery/publication date. The verifier recomputes its payload digest and checks reviewer selection, every finding disposition and reply, unresolved objections, presidential flags, and pre-vote chronology.\n');

write(join(ROOT, 'documents/lp-073-editorial-corrigendum.md'), '# LP-073 archival mathematical note\n\nDated 2295-01-01; repository publication 2300-07-18. LP-073’s enacted phrase “exact halving cascade” is preserved verbatim in the historical statute. Mathematically, 70 to 35 is exact; 35 to 17 and 17 to 8 are rounded downward integer steps. The enacted historical values remain 70 / 35 / 17 / 8. LP-074’s later 50 / 25 / 12.5 / 6.25 schedule is the exact geometric cascade and superseded LP-073 prospectively in 2295.\n');

const ledgerMd = `# Tax-canon classification ledger

Generated for the 2300 publication audit. The required exact-pattern and broad
repository greps were run over all readable HTML, Markdown, text, JSON,
JavaScript/TypeScript, XML, and YAML, excluding only .git, dependencies, and the
compiled Tailwind stylesheet. PDFs are classified separately after extraction.

| Checked file or family | Classification | Disposition |
|---|---|---|
| systems.html; charter.html; whitepaper.html; faq.html; why-vmss.html | Current operative | 50 / 25 / 12.5 / 6.25 active from 2295; threshold and SCM unchanged |
| layer--1.html; layer--3.html; simulations.html current frame | Current operative | Current cascade stated; era-pinned snapshots remain historical |
| law-polling.html; rate-history.html; path-2-commencement-duty-act.html; deregistered-statutes.html | Current authority / chronology | LP-073 superseded; ordered LP-074 activation; LP-075 procedural |
| path-2-charter.html; path-2-schedule.html; path-2-risk-register.html and their documents/*-source.md inputs | Current procedural authority plus historical clauses | Preserve statutory conditions and revocation history; current wrappers state activation |
| path-2-certification-2294.html; documents/path-2-certification-2294-data.json; documents/path-2-certification-2294-authority.md | Current authority | Complete certificate generated from verified data |
| documents/path2-compendium/*.json; raw/*.csv; execution-log.txt | Current evidence | Digest-bound §11.1 record; ordered A, Lower, adoption, B, effective notice |
| pending-ratify-tax-50-ii-statute.html and documents/ratify-tax-50-ii-statute-source.html | Conditional process record / later satisfied | Preserve prospective statute wording; current wrapper records satisfied condition |
| pending-ratify-tax-50-{ballot,opposition,advocacy,supplemental}.html | Failed petition / historical advocacy | Preserve original failure and its pre-certification 70 schedule; current wrappers distinguish later LP-074 |
| pending-ratify-tax-50-record.html; pending-ratification.html; pending-ratify-tax-50-rulings.html | Process record | Preserve dated conditional and superseded rulings; current archive wrapper prevents operative reading |
| docs-review/RATIFY-TAX-50*.md; AFFIRM-TAX-50*.md; RATIFY-TAX-20-petition-draft.md | Failed petition / historical drafting | Preserve authored evidence and era language; not activation authority |
| docs-review/path-2-charter-draft-v4.md; path2-charter-schedule-10-4.md; path2-residual-risk-register.md | Historical draft / conditional process | Preserve pre-certificate state with explicit archive status |
| docs-review/first-run-*.md; the-first-run-simulation-v1*.md | Historical illustrative / invalid fixture | Archive and non-operative labels required permanently |
| docs-review/session-handoff-post-path2-arc.md; presidential-ruling-path2-charter.md; v21.9-FLAGS.md; worklogs | Internal provenance | Preserve historical statements; never current doctrine |
| documents/academy-source.html; documents/resources-source.html; VMSS_Academy.pdf; VMSS_Resources.pdf | Current education | Current cascade and ordered certification; extracted PDFs must agree |
| tools/canon.json; check-canon.mjs; verifier/core/mutations; all builders | Automated authority | Assert active cascade, digests, sequence, findings, exact-boundary failures, archive guards |
| documents/lp-073-editorial-corrigendum.md | Historical canon | Preserve enacted “exact halving cascade” wording and dated mathematical correction |
| LP-073 statute; pre-2295 simulations; founding/consolidation chronology | Historical canon | Intentional 70 / 35 / 17 / 8 references preserved only in their era |
| SCM descriptions across Full and Lite | Current operative | +1/Main all attributed savings 10%; -1 all savings 5%; -2/-3 UBI/PJS-attributable only 5% |
| 70% layout widths, vote thresholds, STI bands, Mercury composition, Earth recidivism | Unrelated percentage | Preserve; no tax-doctrine meaning |

No current-state occurrence classifies LP-073 as operative, the 2294 certificate
as void or incomplete, or either LP-074 schedule as still pending.
`;
write(join(ROOT, 'documents/tax-canon-classification-ledger.md'), ledgerMd);

console.log('Path 2 certification compendium generated');
console.log(`  sources: ${sourceRegistry.length}`);
console.log(`  compendium items: ${compendiumInventory.length}`);
console.log(`  sequence: ${new Date(stamp(aCertificate.publishedAt)).toISOString()} -> ${new Date(stamp(lowerCertificate.publishedAt)).toISOString()} -> ${new Date(stamp(lowerAdoption.adoptedAt)).toISOString()} -> ${new Date(stamp(bCertificate.publishedAt)).toISOString()}`);
console.log(`  candidate Main-12 ${(analytic.scheduleA.main12 * 100).toFixed(4)}%; ADT-36 ${(analytic.scheduleA.adt36 * 100).toFixed(4)}%`);
