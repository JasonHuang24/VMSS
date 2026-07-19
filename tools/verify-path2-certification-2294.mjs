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

// These are the enacted standards. The evidence JSON must mirror them; it cannot
// lower its own gates and then ask the verifier to accept those weaker values.
export const STATUTORY_CONSTANTS = deepFreeze({
  schemaVersion: '6.0',
  projectionPeriods: 6,
  monthlyObservations: 12,
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
  scheduleA: {
    provenanceLocked: true,
    authoredTriggerValuesExcluded: true,
    mainCurrentCoverageRequired: 1.05,
    mainMonthlyFloorRequired: 1,
    mainForwardFloorRequired: 1,
    dividendAggregateRequired: 1.2,
    dividendMonthlyFloorRequired: 1,
    crossCreditsExcluded: true,
    reproducibleFromThisRecord: true,
  },
  scheduleB: {
    requiredAggregateCoverage: 1.05,
    requiredMonthlyCoverage: 1,
    requiredForwardCoverage: 1,
    prohibitedCrossCreditsExcluded: true,
    layerSpecificRevenueAttribution: true,
    monthlyDataPublished: true,
    path2AdoptedFiscalQuantities: true,
    layers: {
      '-1': { rate: 25, routeReconciledFraction: 1, obligationsEnumerated: true },
      '-2': { rate: 12.5, routeReconciledFraction: 1, obligationsEnumerated: true },
      '-3': { rate: 6.25, routeReconciledFraction: 1, obligationsEnumerated: true },
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
const sameValue = (actual, expected) => {
  if (Array.isArray(expected)) {
    return Array.isArray(actual)
      && actual.length === expected.length
      && expected.every((value, index) => sameValue(actual[index], value));
  }
  if (isObject(expected)) {
    return isObject(actual)
      && Object.keys(actual).length === Object.keys(expected).length
      && Object.keys(expected).every((key) => Object.hasOwn(actual, key) && sameValue(actual[key], expected[key]));
  }
  return Object.is(actual, expected);
};
const hasExactKeys = (value, keys) => isObject(value)
  && Object.keys(value).length === keys.length
  && keys.every((key) => Object.hasOwn(value, key));
const safeMinimum = (values) => Array.isArray(values) && values.length && values.every(isFiniteNumber)
  ? Math.min(...values) : Number.NaN;
const safeMaximum = (values) => Array.isArray(values) && values.length && values.every(isFiniteNumber)
  ? Math.max(...values) : Number.NaN;
const safeRatio = (rows) => {
  if (!Array.isArray(rows) || !rows.length || !rows.every((row) => isObject(row)
    && isFiniteNumber(row.receipts) && row.receipts > 0
    && isFiniteNumber(row.obligations) && row.obligations > 0)) return Number.NaN;
  return rows.reduce((sum, row) => sum + row.receipts, 0)
    / rows.reduce((sum, row) => sum + row.obligations, 0);
};
const strictDateValue = (value, timestamp = false) => {
  const pattern = timestamp
    ? /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/
    : /^\d{4}-\d{2}-\d{2}$/;
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
  errors,
  sameValue(actual, expected),
  `${path} must exactly match the enacted constant`,
);
const exactNumericVector = (errors, value, length, path) => pushUnless(
  errors,
  Array.isArray(value) && value.length === length && value.every(isFiniteNumber),
  `${path} must contain exactly ${length} finite numeric observations`,
);

export function loadCertificationSources() {
  return {
    data: JSON.parse(readFileSync(join(ROOT, DATA_FILE), 'utf8')),
    notice: JSON.parse(readFileSync(join(ROOT, NOTICE_FILE), 'utf8')),
  };
}

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
  pushUnless(schemaErrors, hasExactKeys(root, ['schemaVersion', 'record', 'chronology', 'authority', 'unchangedCanon', 'sourceInputs']), 'certification record has malformed top-level keys');
  exactMirror(schemaErrors, root.schemaVersion, C.schemaVersion, 'schemaVersion');

  const record = isObject(root.record) ? root.record : {};
  exactMirror(chronologyErrors, record, C.record, 'record');
  const dateFields = ['auditDesignLocked', 'auditCompleted', 'scheduleACertified', 'scheduleBCertified', 'noticePublished', 'effectiveAt'];
  const dateValues = dateFields.map((field) => strictDateValue(record[field]));
  pushUnless(chronologyErrors, dateValues.every(Number.isFinite), 'record dates must be strict valid YYYY-MM-DD dates');
  pushUnless(chronologyErrors, dateValues.every((value, index) => index === 0 || value > dateValues[index - 1]), 'record dates must be strictly monotonically ordered');
  exactMirror(chronologyErrors, root.chronology, C.chronology, 'chronology');
  if (Array.isArray(root.chronology)) {
    const starts = root.chronology.map((entry) => {
      if (!isObject(entry)) return Number.NaN;
      if (isFiniteNumber(entry.year)) return entry.year;
      const match = typeof entry.years === 'string' ? entry.years.match(/^(\d{4})–(\d{4})$/) : null;
      return match && Number(match[2]) >= Number(match[1]) ? Number(match[1]) : Number.NaN;
    });
    pushUnless(chronologyErrors, starts.every(Number.isFinite), 'chronology years must be valid years or ascending year ranges');
    pushUnless(chronologyErrors, starts.every((year, index) => index === 0 || year >= starts[index - 1]), 'chronology entries must be monotonically ordered');
  }

  const source = isObject(root.sourceInputs) ? root.sourceInputs : {};
  pushUnless(schemaErrors, hasExactKeys(source, ['description', 'findingI', 'findingII', 'findingIII', 'findingIV', 'scheduleA', 'scheduleB']), 'sourceInputs has malformed keys');
  pushUnless(schemaErrors, typeof source.description === 'string' && source.description.trim().length > 0, 'sourceInputs.description must be nonempty');
  const findingI = isObject(source.findingI) ? source.findingI : {};
  const findingII = isObject(source.findingII) ? source.findingII : {};
  const findingIII = isObject(source.findingIII) ? source.findingIII : {};
  const findingIV = isObject(source.findingIV) ? source.findingIV : {};
  pushUnless(schemaErrors, hasExactKeys(findingI, ['requiredCoverage', 'projectedCoverageLowerBounds']), 'findingI has malformed keys');
  pushUnless(schemaErrors, hasExactKeys(findingII, ['baselineDividendPerResident', 'projectedDividendLowerBounds', 'scheduleEffectLowerBounds']), 'findingII has malformed keys');
  pushUnless(schemaErrors, hasExactKeys(findingIII, ['baselineScmActivationMean', 'maximumMultiple', 'projectedActivationUpperBounds', 'requiredMinimumFlow', 'projectedFlowLowerBounds']), 'findingIII has malformed keys');
  pushUnless(schemaErrors, hasExactKeys(findingIV, ['requiredNetMarginalValue', 'netMarginalValueLowerBound', 'maximumAttributableConcentrationEvents', 'attributableConcentrationEventsUpperBound']), 'findingIV has malformed keys');
  exactMirror(schemaErrors, findingI.requiredCoverage, C.findings.I.requiredCoverage, 'findingI.requiredCoverage');
  exactMirror(schemaErrors, findingII.baselineDividendPerResident, C.findings.II.baselineDividendPerResident, 'findingII.baselineDividendPerResident');
  exactMirror(schemaErrors, findingIII.baselineScmActivationMean, C.findings.III.baselineScmActivationMean, 'findingIII.baselineScmActivationMean');
  exactMirror(schemaErrors, findingIII.maximumMultiple, C.findings.III.maximumMultiple, 'findingIII.maximumMultiple');
  exactMirror(schemaErrors, findingIII.requiredMinimumFlow, C.findings.III.requiredMinimumFlow, 'findingIII.requiredMinimumFlow');
  exactMirror(schemaErrors, findingIV.requiredNetMarginalValue, C.findings.IV.requiredNetMarginalValue, 'findingIV.requiredNetMarginalValue');
  exactMirror(schemaErrors, findingIV.maximumAttributableConcentrationEvents, C.findings.IV.maximumAttributableConcentrationEvents, 'findingIV.maximumAttributableConcentrationEvents');
  const vectorsValid = {
    I: exactNumericVector(schemaErrors, findingI.projectedCoverageLowerBounds, C.projectionPeriods, 'findingI.projectedCoverageLowerBounds'),
    IIa: exactNumericVector(schemaErrors, findingII.projectedDividendLowerBounds, C.projectionPeriods, 'findingII.projectedDividendLowerBounds'),
    IIb: exactNumericVector(schemaErrors, findingII.scheduleEffectLowerBounds, C.projectionPeriods, 'findingII.scheduleEffectLowerBounds'),
    IIIa: exactNumericVector(schemaErrors, findingIII.projectedActivationUpperBounds, C.projectionPeriods, 'findingIII.projectedActivationUpperBounds'),
    IIIb: exactNumericVector(schemaErrors, findingIII.projectedFlowLowerBounds, C.projectionPeriods, 'findingIII.projectedFlowLowerBounds'),
  };
  pushUnless(schemaErrors, isFiniteNumber(findingIV.netMarginalValueLowerBound), 'findingIV.netMarginalValueLowerBound must be a finite number');
  pushUnless(schemaErrors, isFiniteNumber(findingIV.attributableConcentrationEventsUpperBound), 'findingIV.attributableConcentrationEventsUpperBound must be a finite number');

  const findings = {
    I: vectorsValid.I && safeMinimum(findingI.projectedCoverageLowerBounds) >= C.findings.I.requiredCoverage,
    II: vectorsValid.IIa && vectorsValid.IIb
      && findingII.projectedDividendLowerBounds.every((value) => value >= C.findings.II.baselineDividendPerResident)
      && findingII.scheduleEffectLowerBounds.every((value) => value >= C.findings.II.minimumScheduleEffect),
    III: vectorsValid.IIIa && vectorsValid.IIIb
      && safeMaximum(findingIII.projectedActivationUpperBounds) <= C.findings.III.baselineScmActivationMean * C.findings.III.maximumMultiple
      && safeMinimum(findingIII.projectedFlowLowerBounds) >= C.findings.III.requiredMinimumFlow,
    IV: isFiniteNumber(findingIV.netMarginalValueLowerBound)
      && isFiniteNumber(findingIV.attributableConcentrationEventsUpperBound)
      && findingIV.netMarginalValueLowerBound > C.findings.IV.requiredNetMarginalValue
      && findingIV.attributableConcentrationEventsUpperBound <= C.findings.IV.maximumAttributableConcentrationEvents,
  };
  Object.entries(findings).forEach(([name, passed]) => pushUnless(conditionErrors, passed, `Finding ${name} failed`));

  const scheduleA = isObject(source.scheduleA) ? source.scheduleA : {};
  const scheduleAKeys = ['provenanceLocked', 'authoredTriggerValuesExcluded', 'mainCurrentCoverageRequired', 'mainCurrentCoverage', 'mainMonthlyFloorRequired', 'mainMonthlyCoverageMinimum', 'mainForwardFloorRequired', 'mainForwardCoverageMinimum', 'dividendAggregateRequired', 'dividendAggregateCoverage', 'dividendMonthlyFloorRequired', 'dividendMonthlyCoverageMinimum', 'crossCreditsExcluded', 'reproducibleFromThisRecord'];
  pushUnless(schemaErrors, hasExactKeys(scheduleA, scheduleAKeys), 'scheduleA has malformed keys');
  Object.entries(C.scheduleA).forEach(([key, value]) => exactMirror(schemaErrors, scheduleA[key], value, `scheduleA.${key}`));
  ['mainCurrentCoverage', 'mainMonthlyCoverageMinimum', 'mainForwardCoverageMinimum', 'dividendAggregateCoverage', 'dividendMonthlyCoverageMinimum'].forEach((key) => {
    pushUnless(schemaErrors, isFiniteNumber(scheduleA[key]), `scheduleA.${key} must be a finite number`);
  });
  const scheduleAConditions = {
    A1: scheduleA.provenanceLocked === C.scheduleA.provenanceLocked && scheduleA.authoredTriggerValuesExcluded === C.scheduleA.authoredTriggerValuesExcluded,
    A2: isFiniteNumber(scheduleA.mainCurrentCoverage) && scheduleA.mainCurrentCoverage >= C.scheduleA.mainCurrentCoverageRequired,
    A3: isFiniteNumber(scheduleA.mainMonthlyCoverageMinimum) && scheduleA.mainMonthlyCoverageMinimum >= C.scheduleA.mainMonthlyFloorRequired,
    A4: isFiniteNumber(scheduleA.mainForwardCoverageMinimum) && scheduleA.mainForwardCoverageMinimum >= C.scheduleA.mainForwardFloorRequired,
    A5: isFiniteNumber(scheduleA.dividendAggregateCoverage) && scheduleA.dividendAggregateCoverage >= C.scheduleA.dividendAggregateRequired,
    A6: isFiniteNumber(scheduleA.dividendMonthlyCoverageMinimum) && scheduleA.dividendMonthlyCoverageMinimum >= C.scheduleA.dividendMonthlyFloorRequired,
    A7: scheduleA.crossCreditsExcluded === C.scheduleA.crossCreditsExcluded,
    A8: scheduleA.reproducibleFromThisRecord === C.scheduleA.reproducibleFromThisRecord,
  };
  Object.entries(scheduleAConditions).forEach(([name, passed]) => pushUnless(conditionErrors, passed, `${name} failed`));
  const scheduleACertified = Object.values(findings).every(Boolean) && Object.values(scheduleAConditions).every(Boolean);

  const scheduleB = isObject(source.scheduleB) ? source.scheduleB : {};
  const scheduleBKeys = ['requiredAggregateCoverage', 'requiredMonthlyCoverage', 'requiredForwardCoverage', 'layers', 'prohibitedCrossCreditsExcluded', 'layerSpecificRevenueAttribution', 'monthlyDataPublished', 'path2AdoptedFiscalQuantities'];
  pushUnless(schemaErrors, hasExactKeys(scheduleB, scheduleBKeys), 'scheduleB has malformed keys');
  for (const key of ['requiredAggregateCoverage', 'requiredMonthlyCoverage', 'requiredForwardCoverage', 'prohibitedCrossCreditsExcluded', 'layerSpecificRevenueAttribution', 'monthlyDataPublished', 'path2AdoptedFiscalQuantities']) {
    exactMirror(schemaErrors, scheduleB[key], C.scheduleB[key], `scheduleB.${key}`);
  }
  const layers = isObject(scheduleB.layers) ? scheduleB.layers : {};
  const layerNames = Object.keys(C.scheduleB.layers);
  pushUnless(schemaErrors, hasExactKeys(layers, layerNames), `scheduleB.layers must contain exactly ${layerNames.join(', ')}`);
  const layerValidity = {};
  for (const name of layerNames) {
    const layer = isObject(layers[name]) ? layers[name] : {};
    pushUnless(schemaErrors, hasExactKeys(layer, ['rate', 'routeReconciledFraction', 'obligationsEnumerated', 'currentWindow', 'forwardCoverageMinimum']), `scheduleB.layers.${name} has malformed keys`);
    for (const [key, expected] of Object.entries(C.scheduleB.layers[name])) exactMirror(schemaErrors, layer[key], expected, `scheduleB.layers.${name}.${key}`);
    pushUnless(schemaErrors, isFiniteNumber(layer.forwardCoverageMinimum), `scheduleB.layers.${name}.forwardCoverageMinimum must be a finite number`);
    const rowsValid = pushUnless(schemaErrors,
      Array.isArray(layer.currentWindow)
        && layer.currentWindow.length === C.monthlyObservations
        && layer.currentWindow.every((row) => hasExactKeys(row, ['receipts', 'obligations'])
          && isFiniteNumber(row.receipts) && row.receipts > 0
          && isFiniteNumber(row.obligations) && row.obligations > 0),
      `scheduleB.layers.${name}.currentWindow must contain exactly ${C.monthlyObservations} positive finite receipt/obligation rows`,
    );
    layerValidity[name] = { layer, rowsValid };
  }
  const entries = layerNames.map((name) => [name, layerValidity[name]?.layer ?? {}]);
  const scheduleBConditions = {
    B1: entries.every(([name, layer]) => layer.routeReconciledFraction === C.scheduleB.layers[name].routeReconciledFraction),
    B2: entries.every(([name, layer]) => layer.obligationsEnumerated === C.scheduleB.layers[name].obligationsEnumerated),
    B3: entries.every(([name, layer]) => layer.rate === C.scheduleB.layers[name].rate && layerValidity[name].rowsValid)
      && scheduleB.prohibitedCrossCreditsExcluded === C.scheduleB.prohibitedCrossCreditsExcluded
      && scheduleB.layerSpecificRevenueAttribution === C.scheduleB.layerSpecificRevenueAttribution,
    B4: entries.every(([name, layer]) => layerValidity[name].rowsValid
      && safeRatio(layer.currentWindow) >= C.scheduleB.requiredAggregateCoverage
      && safeMinimum(layer.currentWindow.map((row) => row.receipts / row.obligations)) >= C.scheduleB.requiredMonthlyCoverage),
    B5: entries.every(([, layer]) => isFiniteNumber(layer.forwardCoverageMinimum)
      && layer.forwardCoverageMinimum >= C.scheduleB.requiredForwardCoverage),
    B6: scheduleB.monthlyDataPublished === C.scheduleB.monthlyDataPublished
      && scheduleB.path2AdoptedFiscalQuantities === C.scheduleB.path2AdoptedFiscalQuantities,
  };
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
  pushUnless(noticeErrors, Number.isFinite(publishedTimestamp) && Number.isFinite(effectiveTimestamp), 'effective notice timestamps must be strict valid UTC timestamps');
  pushUnless(noticeErrors, publishedTimestamp < effectiveTimestamp, 'effective notice must be published before its effective instant');
  pushUnless(noticeErrors, externalNotice?.publishedAt?.slice(0, 10) === record.noticePublished, 'effective notice publication date must match the certification record');
  pushUnless(noticeErrors, externalNotice?.effectiveAt?.slice(0, 10) === record.effectiveAt, 'effective notice effective date must match the certification record');
  const noticeValid = noticeErrors.length === 0 && authorityValid;

  const schemaValid = schemaErrors.length === 0;
  const chronologyValid = chronologyErrors.length === 0;
  const certified = schemaValid && chronologyValid && authorityValid && unchangedCanonValid
    && scheduleACertified && scheduleBIndependentCertified && noticeValid;
  const errors = [...schemaErrors, ...chronologyErrors, ...authorityErrors, ...unchangedCanonErrors, ...noticeErrors, ...conditionErrors];

  return {
    certified,
    errors,
    validation: {
      schemaValid,
      chronologyValid,
      authorityValid,
      unchangedCanonValid,
      noticeValid,
    },
    findings,
    scheduleAConditions,
    scheduleACertified,
    scheduleBConditions,
    scheduleBIndependentCertified,
    scheduleBCertified,
    notice: noticeValid,
    metrics: {
      findingICoverageMinimum: safeMinimum(findingI.projectedCoverageLowerBounds),
      findingIIIActivationCeiling: C.findings.III.baselineScmActivationMean * C.findings.III.maximumMultiple,
      findingIIIActivationUpperBound: safeMaximum(findingIII.projectedActivationUpperBounds),
      findingIIIFlowMinimum: safeMinimum(findingIII.projectedFlowLowerBounds),
      scheduleBCoverage: Object.fromEntries(entries.map(([name, layer]) => [name, safeRatio(layer.currentWindow)])),
      scheduleBMonthlyMinimum: Object.fromEntries(entries.map(([name, layer]) => [name, safeMinimum(Array.isArray(layer.currentWindow) ? layer.currentWindow.map((row) => row.receipts / row.obligations) : [])])),
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
  for (const finding of ['I', 'II', 'III', 'IV']) console.log(`Finding ${finding}: PASS`);
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
