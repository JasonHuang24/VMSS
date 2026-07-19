#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const DATA_FILE = 'documents/path-2-certification-2294-data.json';
export const NOTICE_FILE = 'documents/path-2-effective-notice-2295.json';

const deepFreeze = (value) => {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value);
    Object.values(value).forEach(deepFreeze);
  }
  return value;
};

const monthIds = (startYear, startMonth, count) => Array.from({ length: count }, (_, index) => {
  const offset = startMonth - 1 + index;
  const year = startYear + Math.floor(offset / 12);
  const month = (offset % 12) + 1;
  return `${year}-${String(month).padStart(2, '0')}`;
});

const layerConstants = (prefix, rate, expectedCurrentTotal, obligationAmounts) => ({
  rate,
  expectedCurrentTotal,
  routeDestinations: [`${prefix}-OBLIGATION-TREASURY`, `${prefix}-ADT-SURPLUS`],
  obligations: ['UBI', 'PJS', 'CIVIC', 'RESERVE'].map((suffix, index) => ({
    obligationId: `${prefix}-${suffix}`,
    fundingDestinationId: `${prefix}-OBLIGATION-TREASURY`,
    paymentOrder: index + 1,
    amount: obligationAmounts[index],
  })),
  nonTaxSources: [
    { sourceId: `${prefix}-NONTAX-CARRY`, disposition: 'EXPLICIT_ZERO_NOT_USED' },
    { sourceId: `${prefix}-INTERLAYER`, disposition: 'EXPLICIT_ZERO_PROHIBITED' },
  ],
  currentSources: [`${prefix}-CURRENT-RECEIPTS`, `${prefix}-CURRENT-OBLIGATIONS`],
  forwardSources: [`${prefix}-FORWARD-RECEIPTS`, `${prefix}-FORWARD-OBLIGATIONS`],
});

// All gates live here, outside the evidence. The record cannot lower a threshold,
// shorten a window, rename a source, or declare its own result.
export const STATUTORY_CONSTANTS = deepFreeze({
  schemaVersion: '7.0',
  annualStartYear: 2295,
  annualObservations: 30,
  currentMonths: monthIds(2293, 1, 12),
  forwardMonths: monthIds(2295, 1, 36),
  dividendMonths: monthIds(2291, 1, 36),
  record: {
    title: 'Path 2 LP-074 Final Certification — 2294',
    disposition: 'CERTIFIED_BOTH_SCHEDULES',
    auditDesignLocked: '2292-02-15',
    auditCompleted: '2294-10-15',
    scheduleACertified: '2294-11-01',
    scheduleBCertified: '2294-11-15',
    noticePublished: '2294-12-01',
    effectiveAt: '2295-01-01',
    units: 'billions of layer credits, constant 2292 purchasing power',
  },
  chronology: [
    { year: 2278, event: 'LP-074 enacted conditionally' },
    { years: '2279–2288', event: 'No Path 2 run; the original framework imposed no mandatory commencement duty' },
    { years: '2289–2291', event: 'The inaction-veto dispute produced LP-075' },
    { year: 2291, event: 'LP-075 created a mandatory commencement duty without setting a rate' },
    { year: 2292, event: 'Audit design, evidence rules, methods, and source definitions locked' },
    { year: 2294, event: 'Audit completed; Schedules A and B independently certified; effective notice published' },
    { year: 2295, event: 'The complete LP-074 exact halving cascade entered force' },
    { year: 2300, event: 'Current canon operates at 50 / 25 / 12.5 / 6.25' },
  ],
  findings: {
    I: { requiredCoverage: 1 },
    II: { baselineDividendPerResident: 100, minimumScheduleEffect: 0 },
    III: { baselineScmActivationMean: 8.08, maximumMultiple: 1.25, requiredMinimumFlow: 0.5 },
    IV: { requiredNetMarginalValue: 0, maximumAttributableConcentrationEvents: 0 },
  },
  annualProvenanceRegistry: [{
    provenanceId: 'PATH2-ANNUAL-LOCK-2292',
    sourceClass: 'LOCKED_ANNUAL_MODEL',
    documentId: 'AUDIT-2292-ANNUAL-HORIZON',
    transformId: 'ANNUAL-LOWER-UPPER-BOUNDS',
    lockedAt: '2292-02-15',
  }],
  scheduleA: {
    currentAggregate: 1.05,
    currentMonthly: 1,
    forwardMonthly: 1,
    dividendAggregate: 1.2,
    dividendMonthly: 1,
    transforms: [
      { transformId: 'REAL-2292', formula: 'reportedValue * adjustment * weight', units: 'constant 2292 purchasing power' },
      { transformId: 'RATIO-SUM', formula: 'sum(effectiveNumerator) / sum(effectiveDenominator)', units: 'ratio' },
      { transformId: 'RATIO-MONTH', formula: 'effectiveNumerator / effectiveDenominator', units: 'ratio' },
    ],
    provenance: [
      { sourceId: 'MAIN-CURRENT-T50', sourceClass: 'MAIN_TAX_RECEIPTS', documentId: 'MAIN-LEDGER-2293-T50', transformId: 'REAL-2292', lockedAt: '2292-02-15' },
      { sourceId: 'MAIN-CURRENT-M', sourceClass: 'MAIN_OBLIGATIONS', documentId: 'MAIN-LEDGER-2293-M', transformId: 'REAL-2292', lockedAt: '2292-02-15' },
      { sourceId: 'MAIN-FORWARD-T50', sourceClass: 'INDEPENDENT_MAIN_RECEIPTS_PROJECTION', documentId: 'MAIN-PROJECTION-2295-2297-T50', transformId: 'REAL-2292', lockedAt: '2292-02-15' },
      { sourceId: 'MAIN-FORWARD-M', sourceClass: 'INDEPENDENT_MAIN_OBLIGATIONS_PROJECTION', documentId: 'MAIN-PROJECTION-2295-2297-M', transformId: 'REAL-2292', lockedAt: '2292-02-15' },
      { sourceId: 'ADT-AUTOMATION-A', sourceClass: 'ADT_AUTOMATION_RECEIPTS', documentId: 'ADT-LEDGER-2291-2293-A', transformId: 'REAL-2292', lockedAt: '2292-02-15' },
      { sourceId: 'ADT-DIVIDEND-D', sourceClass: 'DIVIDEND_OBLIGATIONS', documentId: 'ADT-LEDGER-2291-2293-D', transformId: 'REAL-2292', lockedAt: '2292-02-15' },
    ],
    prohibitedSourceClasses: [
      'MAIN_TAX_CROSS_CREDIT', 'LOWER_LAYER_RECEIPTS', 'SCM_RECIRCULATION',
      'PRIVATE_VELOCITY', 'BACKFILL',
    ],
  },
  scheduleB: {
    currentAggregate: 1.05,
    currentMonthly: 1,
    forwardMonthly: 1,
    provenance: [
      { sourceId: 'L1-CURRENT-RECEIPTS', sourceClass: 'LAYER_MINUS_1_RECEIPTS', documentId: 'L1-LEDGER-2293-LI', lockedAt: '2292-02-15' },
      { sourceId: 'L1-CURRENT-OBLIGATIONS', sourceClass: 'LAYER_MINUS_1_OBLIGATIONS', documentId: 'L1-LEDGER-2293-OI', lockedAt: '2292-02-15' },
      { sourceId: 'L1-FORWARD-RECEIPTS', sourceClass: 'LAYER_MINUS_1_RECEIPTS_PROJECTION', documentId: 'L1-PROJECTION-2295-2297-LI', lockedAt: '2292-02-15' },
      { sourceId: 'L1-FORWARD-OBLIGATIONS', sourceClass: 'LAYER_MINUS_1_OBLIGATIONS_PROJECTION', documentId: 'L1-PROJECTION-2295-2297-OI', lockedAt: '2292-02-15' },
      { sourceId: 'L2-CURRENT-RECEIPTS', sourceClass: 'LAYER_MINUS_2_RECEIPTS', documentId: 'L2-LEDGER-2293-LI', lockedAt: '2292-02-15' },
      { sourceId: 'L2-CURRENT-OBLIGATIONS', sourceClass: 'LAYER_MINUS_2_OBLIGATIONS', documentId: 'L2-LEDGER-2293-OI', lockedAt: '2292-02-15' },
      { sourceId: 'L2-FORWARD-RECEIPTS', sourceClass: 'LAYER_MINUS_2_RECEIPTS_PROJECTION', documentId: 'L2-PROJECTION-2295-2297-LI', lockedAt: '2292-02-15' },
      { sourceId: 'L2-FORWARD-OBLIGATIONS', sourceClass: 'LAYER_MINUS_2_OBLIGATIONS_PROJECTION', documentId: 'L2-PROJECTION-2295-2297-OI', lockedAt: '2292-02-15' },
      { sourceId: 'L3-CURRENT-RECEIPTS', sourceClass: 'LAYER_MINUS_3_RECEIPTS', documentId: 'L3-LEDGER-2293-LI', lockedAt: '2292-02-15' },
      { sourceId: 'L3-CURRENT-OBLIGATIONS', sourceClass: 'LAYER_MINUS_3_OBLIGATIONS', documentId: 'L3-LEDGER-2293-OI', lockedAt: '2292-02-15' },
      { sourceId: 'L3-FORWARD-RECEIPTS', sourceClass: 'LAYER_MINUS_3_RECEIPTS_PROJECTION', documentId: 'L3-PROJECTION-2295-2297-LI', lockedAt: '2292-02-15' },
      { sourceId: 'L3-FORWARD-OBLIGATIONS', sourceClass: 'LAYER_MINUS_3_OBLIGATIONS_PROJECTION', documentId: 'L3-PROJECTION-2295-2297-OI', lockedAt: '2292-02-15' },
    ],
    prohibitedSourceClasses: [
      'MAIN_TAX_CROSS_CREDIT', 'OTHER_LAYER_RECEIPTS', 'SCM_RECIRCULATION',
      'PRIVATE_VELOCITY', 'BACKFILL',
    ],
    layers: {
      '-1': layerConstants('L1', 25, 1270.1, [600, 300, 200, 100]),
      '-2': layerConstants('L2', 12.5, 759, [300, 180, 144, 96]),
      '-3': layerConstants('L3', 6.25, 378.9, [150, 90, 72, 48]),
    },
    adoptionRecord: {
      recordId: 'LP074-PATH2-ADOPTION-2294',
      adoptedAt: '2294-11-15',
      authority: 'LP-074',
      scope: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6'],
      layers: ['-1', '-2', '-3'],
    },
  },
  authority: {
    lp073: { status: 'SUPERSEDED_IN_2295', historicalSchedule: [70, 35, 17, 8], historicalRecordPreserved: true },
    lp074: { status: 'ENACTED_SCHEDULES_ACTIVE_FROM_2295', substantiveRateLaw: true, activeSchedule: [50, 25, 12.5, 6.25] },
    lp075: { status: 'ENACTED_PROCEDURAL_DUTY_SATISFIED', compelsAudit: true, setsRates: false, activatesSchedules: false },
    effectiveNotice: { status: 'VALID', record: NOTICE_FILE },
  },
  unchangedCanon: {
    threshold: '$10 million',
    scmParameters: 'UNCHANGED',
    currencySiloing: 'UNCHANGED',
    upperLayerSpeculativeAssetRestrictions: 'UNCHANGED',
    lowerLayerPropertyAndMarketRules: 'UNCHANGED',
    scmScope: {
      sanctuaryAndMain: 'upper-layer SCM rules',
      lower1: 'the applicable -1 SCM rules',
      lower2AndLower3: 'only canon-covered UBI and Primary Job Subsidy savings categories',
      excludedPrivateGains: true,
    },
  },
  notice: {
    artifactType: 'LP074_UNIFIED_EFFECTIVE_NOTICE',
    publishedAt: '2294-12-01T12:00:00Z',
    effectiveAt: '2295-01-01T00:00:00Z',
    scheduleA: 'CERTIFIED',
    scheduleB: 'CERTIFIED',
    rates: { sanctuaryAndMain: 50, lower1: 25, lower2: 12.5, lower3: 6.25 },
    lp073: 'SUPERSEDED_AS_OPERATIVE_RATE_LAW',
    lp075: 'PROCEDURAL_COMMENCEMENT_DUTY_SATISFIED',
    threshold: '$10 million — unchanged',
    scm: 'unchanged in parameters and layer-specific scope',
    status: 'VALID',
  },
});

const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const isFiniteNumber = (value) => typeof value === 'number' && Number.isFinite(value);
const positiveNumber = (value) => isFiniteNumber(value) && value > 0;
const nearlyEqual = (actual, expected, tolerance = 1e-9) => isFiniteNumber(actual)
  && isFiniteNumber(expected) && Math.abs(actual - expected) <= tolerance;
const sum = (values) => values.every(isFiniteNumber) ? values.reduce((total, value) => total + value, 0) : Number.NaN;
const safeMinimum = (values) => Array.isArray(values) && values.length && values.every(isFiniteNumber)
  ? Math.min(...values) : Number.NaN;
const safeMaximum = (values) => Array.isArray(values) && values.length && values.every(isFiniteNumber)
  ? Math.max(...values) : Number.NaN;
const safeRatio = (rows, numerator = 'receipts', denominator = 'obligations') => {
  if (!Array.isArray(rows) || !rows.length || !rows.every((row) => isObject(row)
    && positiveNumber(row[numerator]) && positiveNumber(row[denominator]))) return Number.NaN;
  return sum(rows.map((row) => row[numerator])) / sum(rows.map((row) => row[denominator]));
};
const effectiveRatio = (rows, numerator, denominator) => {
  if (!Array.isArray(rows) || !rows.length || !rows.every((row) => isObject(row)
    && positiveNumber(row[numerator]) && positiveNumber(row[denominator])
    && positiveNumber(row.adjustment) && positiveNumber(row.weight))) return Number.NaN;
  return sum(rows.map((row) => row[numerator] * row.adjustment * row.weight))
    / sum(rows.map((row) => row[denominator] * row.adjustment * row.weight));
};
const sameValue = (actual, expected) => {
  if (Array.isArray(expected)) {
    return Array.isArray(actual) && actual.length === expected.length
      && expected.every((value, index) => sameValue(actual[index], value));
  }
  if (isObject(expected)) {
    return isObject(actual) && Object.keys(actual).length === Object.keys(expected).length
      && Object.keys(expected).every((key) => Object.hasOwn(actual, key) && sameValue(actual[key], expected[key]));
  }
  return Object.is(actual, expected);
};
const hasExactKeys = (value, keys) => isObject(value)
  && Object.keys(value).length === keys.length && keys.every((key) => Object.hasOwn(value, key));
const strictDateValue = (value, timestamp = false) => {
  const pattern = timestamp ? /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/ : /^\d{4}-\d{2}-\d{2}$/;
  if (typeof value !== 'string' || !pattern.test(value)) return Number.NaN;
  const parsed = Date.parse(timestamp ? value : `${value}T00:00:00Z`);
  if (!Number.isFinite(parsed)) return Number.NaN;
  const normalized = new Date(parsed).toISOString();
  if (timestamp ? normalized.replace('.000Z', 'Z') !== value : normalized.slice(0, 10) !== value) return Number.NaN;
  return parsed;
};
const pushUnless = (errors, condition, message) => {
  if (!condition) errors.push(message);
  return condition;
};
const exactMirror = (errors, actual, expected, path) => pushUnless(
  errors, sameValue(actual, expected), `${path} must exactly match the locked constant`,
);

export function loadCertificationSources() {
  return {
    data: JSON.parse(readFileSync(join(ROOT, DATA_FILE), 'utf8')),
    notice: JSON.parse(readFileSync(join(ROOT, NOTICE_FILE), 'utf8')),
  };
}

const validateMonthSequence = (errors, rows, expectedMonths, path) => {
  const months = Array.isArray(rows) ? rows.map((row) => row?.month) : [];
  return pushUnless(errors, sameValue(months, expectedMonths),
    `${path} must contain the exact ordered ${expectedMonths.length}-month horizon`);
};

const validateAWindow = (errors, rows, config, sourceIds, path) => {
  const rowsArray = Array.isArray(rows) ? rows : [];
  const validLength = pushUnless(errors, rowsArray.length === config.months.length,
    `${path} must contain exactly ${config.months.length} observations`);
  const sequenceValid = validateMonthSequence(errors, rowsArray, config.months, path);
  const rowsValid = rowsArray.length === config.months.length && rowsArray.every((row, index) => {
    const keysValid = hasExactKeys(row, config.keys);
    const dateValid = config.dateRequired ? strictDateValue(row?.date) && row.date === `${config.months[index]}-01` : true;
    const valuesValid = positiveNumber(row?.[config.numerator]) && positiveNumber(row?.[config.denominator]);
    const inclusionValid = config.inclusionRule === undefined || (row?.inclusionRule === config.inclusionRule
      && positiveNumber(row?.adjustment) && positiveNumber(row?.weight));
    const provenanceValid = row?.[config.numeratorSource] === sourceIds[0]
      && row?.[config.denominatorSource] === sourceIds[1];
    return keysValid && Boolean(dateValid) && valuesValid && inclusionValid && provenanceValid;
  });
  pushUnless(errors, rowsValid, `${path} rows must have exact fields, values, dates, rules, weights, and provenance`);
  return validLength && sequenceValid && rowsValid;
};

const validateBWindow = (errors, rows, months, sourceIds, path) => {
  const rowsArray = Array.isArray(rows) ? rows : [];
  const validLength = pushUnless(errors, rowsArray.length === months.length,
    `${path} must contain exactly ${months.length} observations`);
  const sequenceValid = validateMonthSequence(errors, rowsArray, months, path);
  const rowsValid = rowsArray.length === months.length && rowsArray.every((row) => hasExactKeys(row,
    ['month', 'receipts', 'obligations', 'receiptsSourceId', 'obligationsSourceId'])
    && positiveNumber(row.receipts) && positiveNumber(row.obligations)
    && row.receiptsSourceId === sourceIds[0] && row.obligationsSourceId === sourceIds[1]);
  pushUnless(errors, rowsValid, `${path} rows must have exact positive Li/Oi values and locked provenance`);
  return validLength && sequenceValid && rowsValid;
};

export function evaluateCertification(data, externalNotice) {
  const schemaErrors = [];
  const chronologyErrors = [];
  const authorityErrors = [];
  const unchangedCanonErrors = [];
  const noticeErrors = [];
  const conditionErrors = [];
  const C = STATUTORY_CONSTANTS;

  pushUnless(schemaErrors, isObject(data), 'certification record must be an object');
  const root = isObject(data) ? data : {};
  pushUnless(schemaErrors, hasExactKeys(root,
    ['schemaVersion', 'record', 'chronology', 'authority', 'unchangedCanon', 'sourceInputs']),
  'certification record has malformed top-level keys');
  exactMirror(schemaErrors, root.schemaVersion, C.schemaVersion, 'schemaVersion');

  const record = isObject(root.record) ? root.record : {};
  exactMirror(chronologyErrors, record, C.record, 'record');
  const dateFields = ['auditDesignLocked', 'auditCompleted', 'scheduleACertified', 'scheduleBCertified', 'noticePublished', 'effectiveAt'];
  const dateValues = dateFields.map((field) => strictDateValue(record[field]));
  pushUnless(chronologyErrors, dateValues.every(Number.isFinite), 'record dates must be strict valid YYYY-MM-DD dates');
  pushUnless(chronologyErrors, dateValues.every((value, index) => index === 0 || value > dateValues[index - 1]),
    'record dates must be strictly monotonically ordered');
  exactMirror(chronologyErrors, root.chronology, C.chronology, 'chronology');

  const source = isObject(root.sourceInputs) ? root.sourceInputs : {};
  pushUnless(schemaErrors, hasExactKeys(source,
    ['description', 'annualProvenanceRegistry', 'annualHorizon', 'scheduleA', 'scheduleB']),
  'sourceInputs has malformed keys');
  pushUnless(schemaErrors, typeof source.description === 'string' && source.description.trim().length > 0,
    'sourceInputs.description must be nonempty');

  const annualRegistryValid = exactMirror(schemaErrors, source.annualProvenanceRegistry,
    C.annualProvenanceRegistry, 'annualProvenanceRegistry');
  const annualRows = Array.isArray(source.annualHorizon) ? source.annualHorizon : [];
  const annualKeys = ['year', 'coverageLowerBound', 'dividendPerResidentLowerBound',
    'scheduleEffectLowerBound', 'scmActivationUpperBound', 'flowLowerBound',
    'netMarginalValueLowerBound', 'attributableConcentrationEventsUpperBound', 'provenanceId'];
  const annualLengthValid = pushUnless(schemaErrors, annualRows.length === C.annualObservations,
    `annualHorizon must contain exactly ${C.annualObservations} observations`);
  const annualYearsValid = pushUnless(schemaErrors,
    annualRows.length === C.annualObservations
      && annualRows.every((row, index) => row?.year === C.annualStartYear + index),
    `annualHorizon must contain exactly the ordered years ${C.annualStartYear}-${C.annualStartYear + C.annualObservations - 1}`);
  const annualRowsValid = pushUnless(schemaErrors,
    annualRows.length === C.annualObservations && annualRows.every((row) => hasExactKeys(row, annualKeys)
      && annualKeys.slice(1, 8).every((key) => isFiniteNumber(row[key]))
      && row.provenanceId === C.annualProvenanceRegistry[0].provenanceId),
    'annualHorizon rows must have exact finite fields and locked provenance');
  const annualEvidenceValid = annualRegistryValid && annualLengthValid && annualYearsValid && annualRowsValid;

  const findings = {
    I: annualEvidenceValid && annualRows.every((row) => row.coverageLowerBound >= C.findings.I.requiredCoverage),
    II: annualEvidenceValid && annualRows.every((row) => row.dividendPerResidentLowerBound >= C.findings.II.baselineDividendPerResident
      && row.scheduleEffectLowerBound >= C.findings.II.minimumScheduleEffect),
    III: annualEvidenceValid && annualRows.every((row) => row.scmActivationUpperBound
      <= C.findings.III.baselineScmActivationMean * C.findings.III.maximumMultiple
      && row.flowLowerBound >= C.findings.III.requiredMinimumFlow),
    IV: annualEvidenceValid && annualRows.every((row) => row.netMarginalValueLowerBound > C.findings.IV.requiredNetMarginalValue
      && row.attributableConcentrationEventsUpperBound <= C.findings.IV.maximumAttributableConcentrationEvents),
  };
  Object.entries(findings).forEach(([name, passed]) => pushUnless(conditionErrors, passed, `Finding ${name} failed`));

  const scheduleA = isObject(source.scheduleA) ? source.scheduleA : {};
  pushUnless(schemaErrors, hasExactKeys(scheduleA,
    ['transformRegistry', 'provenanceRegistry', 'mainCurrentWindow', 'mainForwardWindow', 'dividendWindow', 'reportedMetrics']),
  'scheduleA has malformed keys');
  const transformsValid = exactMirror(schemaErrors, scheduleA.transformRegistry, C.scheduleA.transforms,
    'scheduleA.transformRegistry');
  const aProvenanceValid = exactMirror(schemaErrors, scheduleA.provenanceRegistry, C.scheduleA.provenance,
    'scheduleA.provenanceRegistry');
  const aSourceClasses = Array.isArray(scheduleA.provenanceRegistry)
    ? scheduleA.provenanceRegistry.map((entry) => entry?.sourceClass) : [];
  const aSourceClassValid = aProvenanceValid && aSourceClasses.every((sourceClass) =>
    !C.scheduleA.prohibitedSourceClasses.includes(sourceClass));

  const mainCurrentValid = validateAWindow(schemaErrors, scheduleA.mainCurrentWindow, {
    months: C.currentMonths,
    keys: ['month', 'date', 't50', 'm', 'inclusionRule', 'adjustment', 'weight', 't50SourceId', 'mSourceId'],
    dateRequired: true,
    numerator: 't50', denominator: 'm', numeratorSource: 't50SourceId', denominatorSource: 'mSourceId',
    inclusionRule: 'INCLUDE_LOCKED_MONTH',
  }, ['MAIN-CURRENT-T50', 'MAIN-CURRENT-M'], 'scheduleA.mainCurrentWindow');
  const mainForwardValid = validateAWindow(schemaErrors, scheduleA.mainForwardWindow, {
    months: C.forwardMonths,
    keys: ['month', 'date', 't50', 'm', 't50SourceId', 'mSourceId'],
    dateRequired: true,
    numerator: 't50', denominator: 'm', numeratorSource: 't50SourceId', denominatorSource: 'mSourceId',
  }, ['MAIN-FORWARD-T50', 'MAIN-FORWARD-M'], 'scheduleA.mainForwardWindow');
  const dividendValid = validateAWindow(schemaErrors, scheduleA.dividendWindow, {
    months: C.dividendMonths,
    keys: ['month', 'date', 'a', 'd', 'inclusionRule', 'adjustment', 'weight', 'aSourceId', 'dSourceId'],
    dateRequired: true,
    numerator: 'a', denominator: 'd', numeratorSource: 'aSourceId', denominatorSource: 'dSourceId',
    inclusionRule: 'INCLUDE_COMPLETED_MONTH',
  }, ['ADT-AUTOMATION-A', 'ADT-DIVIDEND-D'], 'scheduleA.dividendWindow');

  const aMetrics = {
    main12: effectiveRatio(scheduleA.mainCurrentWindow, 't50', 'm'),
    mainCurrentMinimum: safeMinimum(Array.isArray(scheduleA.mainCurrentWindow)
      ? scheduleA.mainCurrentWindow.map((row) => positiveNumber(row?.t50) && positiveNumber(row?.m)
        ? row.t50 / row.m : Number.NaN) : []),
    mainForwardMinimum: safeMinimum(Array.isArray(scheduleA.mainForwardWindow)
      ? scheduleA.mainForwardWindow.map((row) => positiveNumber(row?.t50) && positiveNumber(row?.m)
        ? row.t50 / row.m : Number.NaN) : []),
    adt36: effectiveRatio(scheduleA.dividendWindow, 'a', 'd'),
    dividendMinimum: safeMinimum(Array.isArray(scheduleA.dividendWindow)
      ? scheduleA.dividendWindow.map((row) => positiveNumber(row?.a) && positiveNumber(row?.d)
        ? row.a / row.d : Number.NaN) : []),
  };
  const reportedAKeysValid = pushUnless(schemaErrors, hasExactKeys(scheduleA.reportedMetrics,
    ['main12', 'mainCurrentMinimum', 'mainForwardMinimum', 'adt36', 'dividendMinimum'])
    && Object.values(scheduleA.reportedMetrics).every(isFiniteNumber),
  'scheduleA.reportedMetrics must contain exactly five finite derived values');
  const aMetricsReconciled = pushUnless(schemaErrors, reportedAKeysValid
    && Object.entries(aMetrics).every(([key, value]) => nearlyEqual(scheduleA.reportedMetrics[key], value)),
  'scheduleA.reportedMetrics must exactly reconcile to raw evidence');

  const scheduleAConditions = {
    A1: transformsValid && aProvenanceValid && mainCurrentValid && mainForwardValid && dividendValid,
    A2: mainCurrentValid && aMetrics.main12 >= C.scheduleA.currentAggregate,
    A3: mainCurrentValid && aMetrics.mainCurrentMinimum >= C.scheduleA.currentMonthly,
    A4: mainForwardValid && aMetrics.mainForwardMinimum >= C.scheduleA.forwardMonthly,
    A5: dividendValid && aMetrics.adt36 >= C.scheduleA.dividendAggregate,
    A6: dividendValid && aMetrics.dividendMinimum >= C.scheduleA.dividendMonthly,
    A7: aSourceClassValid,
    A8: aMetricsReconciled && Object.values(findings).every(Boolean),
  };
  scheduleAConditions.A8 = scheduleAConditions.A8
    && ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7'].every((key) => scheduleAConditions[key]);
  Object.entries(scheduleAConditions).forEach(([name, passed]) => pushUnless(conditionErrors, passed, `${name} failed`));
  const scheduleACertified = Object.values(findings).every(Boolean) && Object.values(scheduleAConditions).every(Boolean);

  const scheduleB = isObject(source.scheduleB) ? source.scheduleB : {};
  pushUnless(schemaErrors, hasExactKeys(scheduleB, ['provenanceRegistry', 'layers', 'adoptionRecord']),
    'scheduleB has malformed keys');
  const bProvenanceValid = exactMirror(schemaErrors, scheduleB.provenanceRegistry, C.scheduleB.provenance,
    'scheduleB.provenanceRegistry');
  const bSourceClasses = Array.isArray(scheduleB.provenanceRegistry)
    ? scheduleB.provenanceRegistry.map((entry) => entry?.sourceClass) : [];
  const bSourceClassValid = bProvenanceValid && bSourceClasses.every((sourceClass) =>
    !C.scheduleB.prohibitedSourceClasses.includes(sourceClass));
  const adoptionValid = exactMirror(schemaErrors, scheduleB.adoptionRecord, C.scheduleB.adoptionRecord,
    'scheduleB.adoptionRecord');
  const layers = isObject(scheduleB.layers) ? scheduleB.layers : {};
  const layerNames = Object.keys(C.scheduleB.layers);
  pushUnless(schemaErrors, hasExactKeys(layers, layerNames),
    `scheduleB.layers must contain exactly ${layerNames.join(', ')}`);

  const layerValidation = {};
  for (const name of layerNames) {
    const layer = isObject(layers[name]) ? layers[name] : {};
    const LC = C.scheduleB.layers[name];
    pushUnless(schemaErrors, hasExactKeys(layer,
      ['rate', 'routeMap', 'obligationMap', 'currentWindow', 'forwardWindow', 'reportedMetrics']),
    `scheduleB.layers.${name} has malformed keys`);
    const rateValid = pushUnless(schemaErrors, Object.is(layer.rate, LC.rate),
      `scheduleB.layers.${name}.rate must match LP-074`);
    const currentValid = validateBWindow(schemaErrors, layer.currentWindow, C.currentMonths,
      LC.currentSources, `scheduleB.layers.${name}.currentWindow`);
    const forwardValid = validateBWindow(schemaErrors, layer.forwardWindow, C.forwardMonths,
      LC.forwardSources, `scheduleB.layers.${name}.forwardWindow`);

    const currentRows = Array.isArray(layer.currentWindow) ? layer.currentWindow : [];
    const currentReceipts = sum(currentRows.map((row) => row?.receipts));
    const currentObligations = sum(currentRows.map((row) => row?.obligations));
    const routeMap = isObject(layer.routeMap) ? layer.routeMap : {};
    const destinations = Array.isArray(routeMap.destinations) ? routeMap.destinations : [];
    const routeShapeValid = hasExactKeys(routeMap, ['auditedCollectionTotal', 'destinations'])
      && positiveNumber(routeMap.auditedCollectionTotal) && destinations.length === LC.routeDestinations.length
      && destinations.every((destination, index) => hasExactKeys(destination,
        ['destinationId', 'name', 'amount'])
        && destination.destinationId === LC.routeDestinations[index]
        && typeof destination.name === 'string' && destination.name.trim().length > 0
        && positiveNumber(destination.amount));
    pushUnless(schemaErrors, routeShapeValid, `scheduleB.layers.${name}.routeMap must enumerate the exact destination map`);
    const routeReconciled = routeShapeValid && currentValid
      && nearlyEqual(routeMap.auditedCollectionTotal, LC.expectedCurrentTotal)
      && nearlyEqual(routeMap.auditedCollectionTotal, currentReceipts)
      && nearlyEqual(sum(destinations.map((destination) => destination.amount)), routeMap.auditedCollectionTotal);
    pushUnless(schemaErrors, routeReconciled,
      `scheduleB.layers.${name}.routeMap must reconcile every destination to audited collections`);

    const obligationMap = isObject(layer.obligationMap) ? layer.obligationMap : {};
    const obligations = Array.isArray(obligationMap.obligations) ? obligationMap.obligations : [];
    const nonTaxSources = Array.isArray(obligationMap.nonTaxSources) ? obligationMap.nonTaxSources : [];
    const obligationsShapeValid = hasExactKeys(obligationMap, ['obligations', 'nonTaxSources'])
      && obligations.length === LC.obligations.length
      && obligations.every((obligation, index) => {
        const expected = LC.obligations[index];
        return hasExactKeys(obligation,
          ['obligationId', 'name', 'fundingDestinationId', 'paymentOrder', 'amount'])
          && obligation.obligationId === expected.obligationId
          && obligation.fundingDestinationId === expected.fundingDestinationId
          && obligation.paymentOrder === expected.paymentOrder
          && obligation.amount === expected.amount
          && typeof obligation.name === 'string' && obligation.name.trim().length > 0;
      })
      && nonTaxSources.length === LC.nonTaxSources.length
      && nonTaxSources.every((sourceEntry, index) => {
        const expected = LC.nonTaxSources[index];
        return hasExactKeys(sourceEntry, ['sourceId', 'name', 'availableAmount', 'disposition'])
          && sourceEntry.sourceId === expected.sourceId
          && sourceEntry.disposition === expected.disposition
          && Object.is(sourceEntry.availableAmount, 0)
          && typeof sourceEntry.name === 'string' && sourceEntry.name.trim().length > 0;
      });
    pushUnless(schemaErrors, obligationsShapeValid,
      `scheduleB.layers.${name}.obligationMap must enumerate ordered obligations and explicit non-tax zeros`);
    const obligationTotal = sum(obligations.map((obligation) => obligation?.amount));
    const treasuryDestination = destinations.find((destination) => destination?.destinationId === LC.routeDestinations[0]);
    const obligationsReconciled = obligationsShapeValid && currentValid
      && nearlyEqual(obligationTotal, currentObligations)
      && nearlyEqual(treasuryDestination?.amount, obligationTotal);
    pushUnless(schemaErrors, obligationsReconciled,
      `scheduleB.layers.${name}.obligations must reconcile to monthly Oi and its funding destination`);

    const bMetrics = {
      currentAggregate: safeRatio(layer.currentWindow),
      currentMinimum: safeMinimum(currentRows.map((row) => positiveNumber(row?.receipts)
        && positiveNumber(row?.obligations) ? row.receipts / row.obligations : Number.NaN)),
      forwardMinimum: safeMinimum(Array.isArray(layer.forwardWindow)
        ? layer.forwardWindow.map((row) => positiveNumber(row?.receipts) && positiveNumber(row?.obligations)
          ? row.receipts / row.obligations : Number.NaN) : []),
    };
    const reportedMetricsValid = hasExactKeys(layer.reportedMetrics,
      ['currentAggregate', 'currentMinimum', 'forwardMinimum'])
      && Object.values(layer.reportedMetrics).every(isFiniteNumber)
      && Object.entries(bMetrics).every(([key, value]) => nearlyEqual(layer.reportedMetrics[key], value));
    pushUnless(schemaErrors, reportedMetricsValid,
      `scheduleB.layers.${name}.reportedMetrics must reconcile to raw monthly evidence`);

    layerValidation[name] = {
      rateValid, currentValid, forwardValid, routeReconciled, obligationsReconciled,
      reportedMetricsValid, metrics: bMetrics,
    };
  }

  const layerEntries = layerNames.map((name) => layerValidation[name] ?? {});
  const scheduleBConditions = {
    B1: layerEntries.every((entry) => entry.routeReconciled),
    B2: layerEntries.every((entry) => entry.obligationsReconciled),
    B3: bSourceClassValid && layerEntries.every((entry) => entry.rateValid && entry.currentValid),
    B4: layerEntries.every((entry) => entry.currentValid && entry.reportedMetricsValid
      && entry.metrics.currentAggregate >= C.scheduleB.currentAggregate
      && entry.metrics.currentMinimum >= C.scheduleB.currentMonthly),
    B5: layerEntries.every((entry) => entry.forwardValid && entry.reportedMetricsValid
      && entry.metrics.forwardMinimum >= C.scheduleB.forwardMonthly),
    B6: false,
  };
  scheduleBConditions.B6 = adoptionValid && ['B1', 'B2', 'B3', 'B4', 'B5'].every((key) => scheduleBConditions[key]);
  Object.entries(scheduleBConditions).forEach(([name, passed]) => pushUnless(conditionErrors, passed, `${name} failed`));
  const scheduleBIndependentCertified = Object.values(scheduleBConditions).every(Boolean);
  const scheduleBCertified = scheduleACertified && scheduleBIndependentCertified;

  exactMirror(authorityErrors, root.authority, C.authority, 'authority');
  const authorityValid = authorityErrors.length === 0;
  exactMirror(unchangedCanonErrors, root.unchangedCanon, C.unchangedCanon, 'unchangedCanon');
  const unchangedCanonValid = unchangedCanonErrors.length === 0;

  exactMirror(noticeErrors, externalNotice, C.notice, 'external effective notice');
  const publishedTimestamp = strictDateValue(externalNotice?.publishedAt, true);
  const effectiveTimestamp = strictDateValue(externalNotice?.effectiveAt, true);
  pushUnless(noticeErrors, Number.isFinite(publishedTimestamp) && Number.isFinite(effectiveTimestamp),
    'effective notice timestamps must be strict valid UTC timestamps');
  pushUnless(noticeErrors, publishedTimestamp < effectiveTimestamp,
    'effective notice must be published before its effective instant');
  pushUnless(noticeErrors, externalNotice?.publishedAt?.slice(0, 10) === record.noticePublished,
    'effective notice publication date must match the certification record');
  pushUnless(noticeErrors, externalNotice?.effectiveAt?.slice(0, 10) === record.effectiveAt,
    'effective notice effective date must match the certification record');
  const noticeValid = noticeErrors.length === 0 && authorityValid;

  const schemaValid = schemaErrors.length === 0;
  const chronologyValid = chronologyErrors.length === 0;
  const certified = schemaValid && chronologyValid && authorityValid && unchangedCanonValid
    && scheduleACertified && scheduleBIndependentCertified && noticeValid;
  const errors = [...schemaErrors, ...chronologyErrors, ...authorityErrors,
    ...unchangedCanonErrors, ...noticeErrors, ...conditionErrors];

  return {
    certified,
    errors,
    validation: { schemaValid, chronologyValid, authorityValid, unchangedCanonValid, noticeValid },
    annualObservationCount: annualRows.length,
    findings,
    scheduleAConditions,
    scheduleACertified,
    scheduleBConditions,
    scheduleBIndependentCertified,
    scheduleBCertified,
    notice: noticeValid,
    metrics: {
      findingICoverageMinimum: safeMinimum(annualRows.map((row) => row?.coverageLowerBound)),
      findingIIDividendMinimum: safeMinimum(annualRows.map((row) => row?.dividendPerResidentLowerBound)),
      findingIIScheduleEffectMinimum: safeMinimum(annualRows.map((row) => row?.scheduleEffectLowerBound)),
      findingIIIActivationCeiling: C.findings.III.baselineScmActivationMean * C.findings.III.maximumMultiple,
      findingIIIActivationUpperBound: safeMaximum(annualRows.map((row) => row?.scmActivationUpperBound)),
      findingIIIFlowMinimum: safeMinimum(annualRows.map((row) => row?.flowLowerBound)),
      findingIVNetMarginalValueMinimum: safeMinimum(annualRows.map((row) => row?.netMarginalValueLowerBound)),
      findingIVConcentrationMaximum: safeMaximum(annualRows.map((row) => row?.attributableConcentrationEventsUpperBound)),
      scheduleA: aMetrics,
      scheduleB: Object.fromEntries(layerNames.map((name) => [name, layerValidation[name]?.metrics ?? {}])),
      scheduleBReconciliation: Object.fromEntries(layerNames.map((name) => {
        const layer = isObject(layers[name]) ? layers[name] : {};
        const destinations = Array.isArray(layer.routeMap?.destinations) ? layer.routeMap.destinations : [];
        const obligations = Array.isArray(layer.obligationMap?.obligations) ? layer.obligationMap.obligations : [];
        return [name, {
          auditedCollections: layer.routeMap?.auditedCollectionTotal,
          routedTotal: sum(destinations.map((destination) => destination?.amount)),
          obligationTotal: sum(obligations.map((obligation) => obligation?.amount)),
        }];
      })),
    },
    standards: C,
  };
}

function printResult(result) {
  if (!result.certified) {
    console.error('Path 2 certification: REJECTED');
    result.errors.forEach((error) => console.error(`- ${error}`));
    return;
  }
  console.log(`Annual horizon: ${result.annualObservationCount} keyed observations (2295-2324)`);
  for (const finding of ['I', 'II', 'III', 'IV']) console.log(`Finding ${finding}: PASS`);
  for (const condition of ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8']) console.log(`${condition}: PASS`);
  console.log('Schedule A: CERTIFIED');
  for (const condition of ['B1', 'B2', 'B3', 'B4', 'B5', 'B6']) console.log(`${condition}: PASS`);
  console.log('Schedule B: CERTIFIED');
  console.log('Effective notice: VALID');
  console.log(`Active schedule from 2295: ${result.standards.authority.lp074.activeSchedule.join(' / ')}`);
  console.log('LP-073 status: SUPERSEDED');
  console.log('LP-075 status: PROCEDURAL ONLY');
  console.log('SCM parameters: UNCHANGED');
  console.log('$10 million threshold: UNCHANGED');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const { data, notice } = loadCertificationSources();
    const result = evaluateCertification(data, notice);
    printResult(result);
    if (!result.certified) process.exit(1);
  } catch (error) {
    console.error(`Unable to verify Path 2 certification sources: ${error.message}`);
    process.exit(1);
  }
}
