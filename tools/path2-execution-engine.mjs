/**
 * Deterministic execution engine for the LP-074 Path 2 run.
 *
 * Every Finding is estimated as an explicit 50-schedule versus enacted
 * 70-schedule contrast.  Identification rules are executable parameters,
 * validation is outcome-specific, B-1 is a nested bootstrap-t construction,
 * and B-4 resamples the discounted OM scalar directly.
 */
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const round = (value, places = 8) => Number(Number(value).toFixed(places));
function canonicalizeExecutionValue(value) {
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new Error('execution output contains a non-finite number');
    return Number(value.toFixed(10));
  }
  if (Array.isArray(value)) return value.map(canonicalizeExecutionValue);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, nested]) => [key, canonicalizeExecutionValue(nested)]));
  return value;
}
const sum = (values) => values.reduce((total, value) => total + Number(value), 0);
const mean = (values) => sum(values) / values.length;
const variance = (values) => {
  if (values.length < 2) return 0;
  const center = mean(values);
  return sum(values.map((value) => (value - center) ** 2)) / (values.length - 1);
};
const standardDeviation = (values) => Math.sqrt(Math.max(variance(values), 0));
const rmse = (values) => Math.sqrt(mean(values.map((value) => value ** 2)));
const quantile = (values, probability) => {
  if (!values.length) throw new Error('quantile requires at least one value');
  const ordered = [...values].sort((a, b) => a - b);
  const position = Math.max(0, Math.min(ordered.length - 1, (ordered.length - 1) * probability));
  const lower = Math.floor(position);
  const fraction = position - lower;
  return ordered[lower] + fraction * ((ordered[lower + 1] ?? ordered[lower]) - ordered[lower]);
};

// Acklam inverse-normal approximation, used only by the B-2 Bonferroni fallback.
function inverseNormal(p) {
  if (!(p > 0 && p < 1)) throw new Error(`inverseNormal probability outside (0,1): ${p}`);
  const a = [-39.6968302866538, 220.946098424521, -275.928510446969, 138.357751867269, -30.6647980661472, 2.50662827745924];
  const b = [-54.4760987982241, 161.585836858041, -155.698979859887, 66.8013118877197, -13.2806815528857];
  const c = [-0.00778489400243029, -0.322396458041136, -2.40075827716184, -2.54973253934373, 4.37466414146497, 2.93816398269878];
  const d = [0.00778469570904146, 0.32246712907004, 2.445134137143, 3.75440866190742];
  if (p < 0.02425) {
    const q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  if (p > 0.97575) {
    const q = Math.sqrt(-2 * Math.log(1 - p));
    return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  const q = p - 0.5;
  const r = q * q;
  return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
}

function generator(seed) {
  let state = Number(seed) >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

function deriveSeed(baseSeed, outerIndex, innerIndex = 0) {
  let value = (Number(baseSeed) ^ Math.imul(outerIndex + 1, 0x9e3779b1) ^ Math.imul(innerIndex + 1, 0x85ebca6b)) >>> 0;
  value ^= value >>> 16;
  value = Math.imul(value, 0x7feb352d) >>> 0;
  value ^= value >>> 15;
  return value >>> 0;
}

function fit(values, years, model) {
  if (model === 'constant') return { model, intercept: mean(values), slope: 0, origin: years[0] };
  if (model !== 'linear') throw new Error(`unimplemented functional class: ${model}`);
  const origin = years[0];
  const x = years.map((year) => year - origin);
  const xMean = mean(x);
  const yMean = mean(values);
  const denominator = sum(x.map((value) => (value - xMean) ** 2));
  const slope = denominator === 0 ? 0 : sum(x.map((value, index) => (value - xMean) * (values[index] - yMean))) / denominator;
  return { model, intercept: yMean - slope * xMean, slope, origin };
}
const predict = (fitted, year) => fitted.intercept + fitted.slope * (year - fitted.origin);

export function modelKeys(finding) {
  if (finding === 'I') return ['treatmentReceipts50', 'counterfactualReceipts70', 'obligations'];
  if (finding === 'II') return ['treatmentDividend50', 'counterfactualDividend70'];
  if (finding === 'III') return ['treatmentScmActivations50', 'counterfactualScmActivations70', 'treatmentFlowMargin50', 'counterfactualFlowMargin70'];
  return ['privateConsumerSurplus', 'privateProducerSurplus', 'qualityAdjustment', 'publicConsumerSurplus', 'publicProducerSurplus', 'publicQualityAdjustment', 'displacementCost', 'externalCost', 'beyondHorizonValue', 'publicCaptureSurplus', 'canonicalConsumptionLevel'];
}

const exogenousKeys = {
  I: 'sharedDemographicIndex',
  II: 'sharedResidentDemandIndex',
  III: 'sharedLiquidityIndex',
  IV: 'sharedVentureExposureIndex',
};

function readMapped(root, preregistration, finding) {
  const mapping = preregistration.dataSourceMappings.find((entry) => entry.finding === finding);
  if (!mapping) throw new Error(`preregistration data mapping missing for Finding ${finding}`);
  const document = JSON.parse(readFileSync(join(root, mapping.path), 'utf8'));
  if (!Array.isArray(document.observations)) throw new Error(`Finding ${finding} raw observations missing`);
  const expected = Array.from({ length: 20 }, (_, index) => 2272 + index);
  const years = document.observations.map((row) => Number(row.year));
  if (years.length !== expected.length || years.some((year, index) => year !== expected[index])) throw new Error(`Finding ${finding} observation window must cover 2272-2291 exactly`);
  const required = [...modelKeys(finding), exogenousKeys[finding]];
  for (const [index, row] of document.observations.entries()) for (const key of required) {
    if (!Number.isFinite(Number(row[key]))) throw new Error(`Finding ${finding} raw observation ${index + 1} missing explicit contrast field ${key}`);
  }
  if (!mapping.treatmentQuantity || !mapping.counterfactualQuantity || !mapping.sharedExogenousInput || !mapping.uncertaintyConstruction) throw new Error(`Finding ${finding} contrast source mapping is incomplete`);
  return { mapping, document, rows: document.observations };
}

const allowedRuleTypes = {
  I: new Set(['behavioral-uplift-share', 'velocity-credit-share']),
  II: new Set(['schedule-attribution-share', 'cross-credit-share']),
  III: new Set(['liquidity-response-share', 'scm-parameter-multiplier']),
  IV: new Set(['traceable-capital-share', 'realized-public-allocation-share', 'adverse-cost-share']),
};

export function resolveIdentification(member) {
  if (!Array.isArray(member.identificationAssumptions) || !Array.isArray(member.identificationRules)) throw new Error(`${member.id}: identification assumptions and executable rules are required`);
  const assumptions = new Set(member.identificationAssumptions);
  const ruleAssumptions = new Set();
  const values = {};
  for (const rule of member.identificationRules) {
    if (!rule?.assumption || !rule?.type || !Number.isFinite(Number(rule.value))) throw new Error(`${member.id}: malformed identification rule`);
    if (!allowedRuleTypes[member.finding]?.has(rule.type)) throw new Error(`${member.id}: unconsumed identification rule type ${rule.type}`);
    if (ruleAssumptions.has(rule.assumption)) throw new Error(`${member.id}: duplicate identification rule for ${rule.assumption}`);
    ruleAssumptions.add(rule.assumption);
    values[rule.type] = Number(rule.value);
  }
  const unconsumed = [...assumptions].filter((assumption) => !ruleAssumptions.has(assumption));
  const undeclared = [...ruleAssumptions].filter((assumption) => !assumptions.has(assumption));
  if (unconsumed.length || undeclared.length) throw new Error(`${member.id}: unconsumed identification assumption (${[...unconsumed, ...undeclared].join(', ')})`);
  if (!(Number(member.sharedExogenousElasticity) >= 0 && Number(member.sharedExogenousElasticity) <= 2)) throw new Error(`${member.id}: shared exogenous elasticity is not executable`);
  for (const [type, value] of Object.entries(values)) {
    if (type.endsWith('-share') && !(value >= 0 && value <= 1)) throw new Error(`${member.id}: ${type} must be in [0,1]`);
    if (type === 'scm-parameter-multiplier' && !(value > 0 && value <= 2)) throw new Error(`${member.id}: SCM multiplier is outside the locked range`);
  }
  return { values, consumedAssumptions: [...ruleAssumptions] };
}

function fitSystem(rows, keys, model, exogenousKey, elasticity = 1) {
  const years = rows.map((row) => Number(row.year));
  const exogenousValues = rows.map((row) => Number(row[exogenousKey]));
  const exogenousFit = fit(exogenousValues, years, 'linear');
  const fittedByKey = Object.fromEntries(keys.map((key) => {
    const normalized = rows.map((row) => Number(row[key]) / (Number(row[exogenousKey]) ** elasticity));
    return [key, fit(normalized, years, model)];
  }));
  const path = (targetYears) => {
    const exogenous = targetYears.map((year) => predict(exogenousFit, year));
    return {
      [exogenousKey]: exogenous,
      ...Object.fromEntries(keys.map((key) => [key, targetYears.map((year, index) => predict(fittedByKey[key], year) * (exogenous[index] ** elasticity))])),
    };
  };
  const fittedObserved = path(years);
  const residuals = {
    [exogenousKey]: exogenousValues.map((value, index) => value - fittedObserved[exogenousKey][index]),
    ...Object.fromEntries(keys.map((key) => {
      const residual = rows.map((row, index) => Number(row[key]) / (Number(row[exogenousKey]) ** elasticity) - predict(fittedByKey[key], years[index]));
      const center = mean(residual);
      return [key, residual.map((value) => value - center)];
    })),
  };
  return { rows, years, keys, model, exogenousKey, elasticity, exogenousFit, fittedByKey, fittedObserved, residuals, path };
}

export function automaticBlockLength(n) {
  return Math.max(2, Math.round(1.5 * Math.cbrt(n)));
}

function pseudoRows(system, seed) {
  const random = generator(seed);
  const n = system.rows.length;
  const blockLength = automaticBlockLength(n);
  const indexes = [];
  while (indexes.length < n) {
    const start = Math.floor(random() * n);
    for (let offset = 0; offset < blockLength && indexes.length < n; offset += 1) indexes.push((start + offset) % n);
  }
  return system.years.map((year, index) => {
    const exogenous = Math.max(1e-8, system.fittedObserved[system.exogenousKey][index] + system.residuals[system.exogenousKey][indexes[index]]);
    const row = { year, [system.exogenousKey]: exogenous };
    for (const key of system.keys) {
      const normalized = predict(system.fittedByKey[key], year) + system.residuals[key][indexes[index]];
      row[key] = normalized * (exogenous ** system.elasticity);
    }
    return row;
  });
}

function ivComponents(paths, years, config) {
  const traceShare = config.values['traceable-capital-share'] ?? 1;
  const publicShare = config.values['realized-public-allocation-share'] ?? 1;
  const privateValue = years.map((_, index) => traceShare * (paths.privateConsumerSurplus[index] + paths.privateProducerSurplus[index] + paths.qualityAdjustment[index] - paths.displacementCost[index] - paths.externalCost[index]));
  const publicValue = years.map((_, index) => traceShare * publicShare * (paths.publicConsumerSurplus[index] + paths.publicProducerSurplus[index] + paths.publicQualityAdjustment[index]));
  const discount = years.map((_, index) => 1 / (1.02 ** (index + 1)));
  const netMarginalValue = privateValue.map((value, index) => value - publicValue[index]);
  return { privateValue, publicValue, netMarginalValue, discount, om: sum(netMarginalValue.map((value, index) => value * discount[index])) };
}

function identifiedOutcomes(member, paths, years) {
  const config = resolveIdentification(member);
  const value = (type, fallback = 0) => config.values[type] ?? fallback;
  if (member.finding === 'I') {
    const adjustmentShare = value('behavioral-uplift-share') + value('velocity-credit-share');
    const treatment = paths.treatmentReceipts50.map((entry) => entry * (1 + adjustmentShare));
    const counterfactual = paths.counterfactualReceipts70;
    return { config, outcomes: { treatmentReceipts50: treatment, counterfactualReceipts70: counterfactual, obligations: paths.obligations, scheduleReceiptsContrast: treatment.map((entry, index) => entry - counterfactual[index]), treatmentCoverage: treatment.map((entry, index) => entry / paths.obligations[index]), counterfactualCoverage: counterfactual.map((entry, index) => entry / paths.obligations[index]) } };
  }
  if (member.finding === 'II') {
    const share = value('schedule-attribution-share', 1);
    const crossCredit = value('cross-credit-share');
    const rawEffect = paths.treatmentDividend50.map((entry, index) => entry - paths.counterfactualDividend70[index]);
    const attributedEffect = rawEffect.map((entry, index) => share * entry + crossCredit * paths.counterfactualDividend70[index]);
    const attributedTreatment = paths.counterfactualDividend70.map((entry, index) => entry + attributedEffect[index]);
    return { config, outcomes: { treatmentDividend50: paths.treatmentDividend50, counterfactualDividend70: paths.counterfactualDividend70, rawScheduleEffect: rawEffect, attributedScheduleEffect: attributedEffect, attributedTreatmentDividend: attributedTreatment } };
  }
  if (member.finding === 'III') {
    const share = value('liquidity-response-share', 1);
    const scmMultiplier = value('scm-parameter-multiplier', 1);
    const scmRawEffect = paths.treatmentScmActivations50.map((entry, index) => entry - paths.counterfactualScmActivations70[index]);
    const flowRawEffect = paths.treatmentFlowMargin50.map((entry, index) => entry - paths.counterfactualFlowMargin70[index]);
    const modeledScm = paths.counterfactualScmActivations70.map((entry, index) => entry + share * scmMultiplier * scmRawEffect[index]);
    const modeledFlow = paths.counterfactualFlowMargin70.map((entry, index) => entry + share * flowRawEffect[index]);
    return { config, outcomes: { treatmentScmActivations50: paths.treatmentScmActivations50, counterfactualScmActivations70: paths.counterfactualScmActivations70, scmScheduleContrast: scmRawEffect, modeledScmActivations: modeledScm, treatmentFlowMargin50: paths.treatmentFlowMargin50, counterfactualFlowMargin70: paths.counterfactualFlowMargin70, flowScheduleContrast: flowRawEffect, modeledFlowMargin: modeledFlow } };
  }
  const components = ivComponents(paths, years, config);
  return { config, outcomes: { privateMarginalValue: components.privateValue, publicCounterfactualMarginalValue: components.publicValue, netMarginalValue: components.netMarginalValue, discountedOmScalar: [components.om] }, components };
}

export function applyIdentificationForTest(member, paths, years) {
  return identifiedOutcomes(member, paths, years);
}

function observedPaths(rows, keys, exogenousKey) {
  return { [exogenousKey]: rows.map((row) => Number(row[exogenousKey])), ...Object.fromEntries(keys.map((key) => [key, rows.map((row) => Number(row[key]))])) };
}

const validationOutcomeNames = {
  I: ['treatmentReceipts50', 'counterfactualReceipts70', 'obligations', 'scheduleReceiptsContrast', 'treatmentCoverage', 'counterfactualCoverage'],
  II: ['treatmentDividend50', 'counterfactualDividend70', 'rawScheduleEffect', 'attributedScheduleEffect', 'attributedTreatmentDividend'],
  III: ['treatmentScmActivations50', 'counterfactualScmActivations70', 'scmScheduleContrast', 'modeledScmActivations', 'treatmentFlowMargin50', 'counterfactualFlowMargin70', 'flowScheduleContrast', 'modeledFlowMargin'],
  IV: ['privateMarginalValue', 'publicCounterfactualMarginalValue', 'netMarginalValue'],
};

export function validateMemberOutcomeSpecific(member, rows, holdoutYears) {
  resolveIdentification(member);
  const keys = modelKeys(member.finding);
  const exogenousKey = exogenousKeys[member.finding];
  const training = rows.filter((row) => row.year < holdoutYears[0]);
  const holdout = rows.filter((row) => holdoutYears.includes(row.year));
  const system = fitSystem(training, keys, member.model, exogenousKey, member.sharedExogenousElasticity);
  const predictions = identifiedOutcomes(member, system.path(holdoutYears), holdoutYears).outcomes;
  const actuals = identifiedOutcomes(member, observedPaths(holdout, keys, exogenousKey), holdoutYears).outcomes;
  const persistenceRows = holdout.map((row) => rows.find((candidate) => candidate.year === row.year - 1));
  const persistence = identifiedOutcomes(member, observedPaths(persistenceRows, keys, exogenousKey), holdoutYears).outcomes;
  const names = validationOutcomeNames[member.finding];
  const rowLevel = holdout.map((row, rowIndex) => ({
    year: row.year,
    outcomes: Object.fromEntries(names.map((name) => {
      const actual = actuals[name][rowIndex];
      const memberPrediction = predictions[name][rowIndex];
      const persistencePrediction = persistence[name][rowIndex];
      return [name, { actual: round(actual), memberPrediction: round(memberPrediction), persistencePrediction: round(persistencePrediction), memberError: round(memberPrediction - actual), persistenceError: round(persistencePrediction - actual) }];
    })),
  }));
  const outcomeComparisons = Object.fromEntries(names.map((name) => {
    const memberRmse = rmse(rowLevel.map((row) => row.outcomes[name].memberError));
    const persistenceRmse = rmse(rowLevel.map((row) => row.outcomes[name].persistenceError));
    const errorRatio = persistenceRmse <= 1e-12 ? (memberRmse <= 1e-12 ? 0 : Number.POSITIVE_INFINITY) : memberRmse / persistenceRmse;
    return [name, { memberRmse: round(memberRmse), persistenceRmse: round(persistenceRmse), errorRatio: round(errorRatio), survived: memberRmse <= persistenceRmse + 1e-12 }];
  }));
  const survived = Object.values(outcomeComparisons).every((outcome) => outcome.survived);
  const worstErrorRatio = Math.max(...Object.values(outcomeComparisons).map((outcome) => outcome.errorRatio));
  return {
    memberId: member.id, finding: member.finding, trainingYears: [training[0].year, training.at(-1).year], heldOutYears: [holdout[0].year, holdout.at(-1).year],
    validationRule: 'each preregistered legally operative outcome must separately beat same-outcome one-year persistence; maximum error ratio controls',
    rowLevel, outcomeComparisons, validationError: round(worstErrorRatio), persistenceError: 1, survived,
    disposition: survived ? 'ADMITTED' : 'EXCLUDED_SECTION_4_3_OUTCOME_SPECIFIC',
  };
}

export function legacyPooledValidation(member, rows, holdoutYears) {
  const result = validateMemberOutcomeSpecific(member, rows, holdoutYears);
  const memberErrors = result.rowLevel.flatMap((row) => Object.values(row.outcomes).map((outcome) => outcome.memberError));
  const persistenceErrors = result.rowLevel.flatMap((row) => Object.values(row.outcomes).map((outcome) => outcome.persistenceError));
  return { memberRmse: rmse(memberErrors), persistenceRmse: rmse(persistenceErrors), survived: rmse(memberErrors) <= rmse(persistenceErrors) };
}

function summarizeReplicationStandardErrors(replicationStandardErrors) {
  if (!replicationStandardErrors.length) return [];
  return replicationStandardErrors[0].map((_, index) => {
    const values = replicationStandardErrors.map((row) => row[index]);
    return { minimum: round(Math.min(...values), 10), maximum: round(Math.max(...values), 10), distinctRoundedValues: new Set(values.map((value) => value.toFixed(10))).size };
  });
}

export function studentizedBlockBootstrap({ rows, member, years, transform, directions }) {
  if (member.studentization !== 'nested-bootstrap-t-replication-specific') throw new Error(`${member.id}: B-1 fixed-denominator or undeclared studentization is inadmissible`);
  const keys = modelKeys(member.finding);
  const exogenousKey = exogenousKeys[member.finding];
  const system = fitSystem(rows, keys, member.model, exogenousKey, member.sharedExogenousElasticity);
  const point = transform(system.path(years));
  if (!Array.isArray(point) || point.length !== directions.length) throw new Error(`${member.id}: bootstrap transform/direction mismatch`);
  const outerPoints = [];
  const replicationStandardErrors = [];
  const studentizedStatistics = [];
  let failedReplications = 0;
  for (let outer = 0; outer < member.outerReplications; outer += 1) {
    const outerRows = pseudoRows(system, deriveSeed(member.seed, outer));
    const outerSystem = fitSystem(outerRows, keys, member.model, exogenousKey, member.sharedExogenousElasticity);
    const outerPoint = transform(outerSystem.path(years));
    const innerPoints = [];
    for (let inner = 0; inner < member.innerReplications; inner += 1) {
      const innerRows = pseudoRows(outerSystem, deriveSeed(member.seed, outer, inner + 1));
      const innerSystem = fitSystem(innerRows, keys, member.model, exogenousKey, member.sharedExogenousElasticity);
      innerPoints.push(transform(innerSystem.path(years)));
    }
    const innerSe = point.map((_, index) => standardDeviation(innerPoints.map((draw) => draw[index])));
    if (innerSe.some((value) => !Number.isFinite(value) || value <= 1e-12)) { failedReplications += 1; continue; }
    outerPoints.push(outerPoint);
    replicationStandardErrors.push(innerSe);
    studentizedStatistics.push(Math.max(...outerPoint.map((value, index) => directions[index] * (value - point[index]) / innerSe[index])));
  }
  if (outerPoints.length < Math.ceil(member.outerReplications * 0.9)) throw new Error(`${member.id}: fewer than 90% valid studentized outer replications`);
  const standardErrors = point.map((_, index) => standardDeviation(outerPoints.map((draw) => draw[index])));
  if (standardErrors.some((value) => !Number.isFinite(value) || value <= 1e-12)) throw new Error(`${member.id}: original-estimate bootstrap standard error is zero`);
  const critical = quantile(studentizedStatistics, 0.95);
  const bounds = point.map((value, index) => value + directions[index] * critical * standardErrors[index]);
  const denominatorDigest = createHash('sha256').update(JSON.stringify(replicationStandardErrors.map((row) => row.map((value) => round(value, 12))))).digest('hex');
  return {
    points: point, bounds, standardErrors, critical, directions,
    blockLength: automaticBlockLength(rows.length), seed: member.seed, outerReplications: member.outerReplications, innerReplications: member.innerReplications,
    validOuterReplications: outerPoints.length, failedReplications,
    studentization: 'replication-specific inner circular-block bootstrap standard error',
    replicationSpecificStandardErrorSummary: summarizeReplicationStandardErrors(replicationStandardErrors),
    replicationSpecificDenominatorDigest: denominatorDigest,
    seedDerivation: 'mix32(baseSeed XOR ((outer+1)*0x9e3779b1) XOR ((inner+1)*0x85ebca6b)); inner index zero is reserved for the outer resample',
    zeroStandardErrorHandling: 'discard outer replication; abort if fewer than 90 percent remain; abort for zero original-estimate standard error',
    quantileConvention: 'Hyndman-Fan type 7 linear interpolation at p=0.95',
    simultaneousStatistic: 'maximum one-sided adverse studentized deviation across every filed path coordinate',
  };
}

function automaticBandwidth(n) {
  return Math.max(1, Math.floor(4 * ((n / 100) ** (2 / 9))));
}

function hacForecastSe(values, years, futureYears, model = 'linear') {
  const fitted = fit(values, years, model);
  const residuals = values.map((value, index) => value - predict(fitted, years[index]));
  const bandwidth = automaticBandwidth(values.length);
  let longRun = mean(residuals.map((value) => value ** 2));
  for (let lag = 1; lag <= bandwidth; lag += 1) {
    const covariance = mean(residuals.slice(lag).map((value, index) => value * residuals[index]));
    longRun += 2 * (1 - lag / (bandwidth + 1)) * covariance;
  }
  longRun = Math.max(longRun, variance(residuals) * 0.1, 1e-12);
  const origin = years[0];
  const x = years.map((year) => year - origin);
  const xMean = mean(x);
  const sxx = sum(x.map((value) => (value - xMean) ** 2));
  const se = futureYears.map((year) => Math.sqrt(longRun * (1 / values.length + (model === 'constant' ? 0 : ((year - origin) - xMean) ** 2 / sxx))));
  return { fitted, residuals, bandwidth, longRunVariance: longRun, se };
}

function b2Outcome(rows, member, outcomeName, years) {
  const keys = modelKeys(member.finding);
  const exogenousKey = exogenousKeys[member.finding];
  const actual = identifiedOutcomes(member, observedPaths(rows, keys, exogenousKey), rows.map((row) => row.year)).outcomes[outcomeName];
  const elasticity = member.sharedExogenousElasticity;
  const normalized = actual.map((value, index) => value / (Number(rows[index][exogenousKey]) ** elasticity));
  const analytic = hacForecastSe(normalized, rows.map((row) => row.year), years, member.model);
  const exogenousFit = fit(rows.map((row) => Number(row[exogenousKey])), rows.map((row) => row.year), 'linear');
  const exogenous = years.map((year) => predict(exogenousFit, year));
  return { point: years.map((year, index) => predict(analytic.fitted, year) * (exogenous[index] ** elasticity)), se: analytic.se.map((entry, index) => entry * (exogenous[index] ** elasticity)), bandwidth: analytic.bandwidth, longRunVariance: analytic.longRunVariance };
}

export function directScalarBlockBootstrap({ rows, member, years, scalarTransform, contributionTransform = null, replications = member.scalarReplications }) {
  const keys = modelKeys(member.finding);
  const exogenousKey = exogenousKeys[member.finding];
  const system = fitSystem(rows, keys, member.model, exogenousKey, member.sharedExogenousElasticity);
  const point = scalarTransform(system.path(years));
  const draws = [];
  const contributionDraws = [];
  for (let replication = 0; replication < replications; replication += 1) {
    const drawRows = pseudoRows(system, deriveSeed(member.seed, replication));
    const drawSystem = fitSystem(drawRows, keys, member.model, exogenousKey, member.sharedExogenousElasticity);
    const drawPaths = drawSystem.path(years);
    draws.push(scalarTransform(drawPaths));
    if (contributionTransform) contributionDraws.push(contributionTransform(drawPaths));
  }
  const adverseDeviations = draws.map((draw) => point - draw);
  const samplingWidth = Math.max(0, quantile(adverseDeviations, 0.95));
  const legacyIndependentVariance = contributionDraws.length ? sum(contributionDraws[0].map((_, index) => variance(contributionDraws.map((draw) => draw[index])))) : null;
  const fullScalarVariance = variance(draws);
  return {
    point, samplingWidth, scalarStandardError: standardDeviation(draws), blockLength: automaticBlockLength(rows.length), seed: member.seed, replications,
    target: 'discounted thirty-year net OM scalar', construction: 'one-sided 95% basic circular residual-block bootstrap of the scalar estimator',
    dependencePreservation: 'each replication resamples one joint annual residual block across every OM component and the shared exposure path, then recomputes all thirty forecasts and their discounted scalar sum',
    scalarDrawDigest: createHash('sha256').update(JSON.stringify(draws.map((value) => round(value, 12)))).digest('hex'),
    fullScalarVariance: round(fullScalarVariance, 12), legacyIndependentVariance: legacyIndependentVariance == null ? null : round(legacyIndependentVariance, 12),
    crossYearCovarianceContribution: legacyIndependentVariance == null ? null : round(fullScalarVariance - legacyIndependentVariance, 12),
    seedDerivation: 'mix32(baseSeed XOR ((replication+1)*0x9e3779b1) XOR 0x85ebca6b)', quantileConvention: 'Hyndman-Fan type 7 linear interpolation at p=0.95',
  };
}

function commonMember(member, validation, interval, identificationExecution) {
  return {
    id: member.id, panel: member.panel, equivalenceClass: member.equivalenceClass, functionalClass: member.functionalClass,
    identificationAssumptions: member.identificationAssumptions, identificationRules: member.identificationRules, identificationExecution,
    sharedExogenousInput: { field: exogenousKeys[member.finding], elasticity: member.sharedExogenousElasticity, treatmentAndCounterfactualUseSameProjectedPath: true },
    sourceId: member.sourceId, validationError: validation.validationError, persistenceError: validation.persistenceError,
    validationRecordId: validation.memberId, preprocessing: member.preprocessing, interval,
  };
}

function identificationExecution(member, paths, years, extra = {}) {
  const identified = identifiedOutcomes(member, paths, years);
  const records = member.identificationRules.map((rule) => {
    let effect;
    if (rule.type === 'behavioral-uplift-share' || rule.type === 'velocity-credit-share') effect = mean(paths.treatmentReceipts50) * rule.value;
    else if (rule.type === 'schedule-attribution-share') effect = mean(identified.outcomes.attributedScheduleEffect);
    else if (rule.type === 'cross-credit-share') effect = mean(paths.counterfactualDividend70) * rule.value;
    else if (rule.type === 'liquidity-response-share') effect = { scm: mean(identified.outcomes.modeledScmActivations) - mean(paths.counterfactualScmActivations70), flow: mean(identified.outcomes.modeledFlowMargin) - mean(paths.counterfactualFlowMargin70) };
    else if (rule.type === 'scm-parameter-multiplier') effect = rule.value === 1 ? 0 : (rule.value - 1) * mean(identified.outcomes.scmScheduleContrast);
    else if (rule.type === 'traceable-capital-share') effect = identified.components.om;
    else if (rule.type === 'realized-public-allocation-share') effect = -rule.value * sum(identified.components.publicValue.map((entry, index) => entry * identified.components.discount[index]));
    else if (rule.type === 'adverse-cost-share') effect = extra.identificationRegionWidth ?? 0;
    return { assumption: rule.assumption, ruleType: rule.type, lockedValue: rule.value, numericalEffectOnFiledScale: canonicalizeExecutionValue(effect), operation: rule.operation };
  });
  return { consumedAssumptions: identified.config.consumedAssumptions, everyDeclaredAssumptionConsumed: records.length === member.identificationAssumptions.length, records };
}

function precisionCheck(estimand, width, ceiling) {
  return { estimand, width: round(width), ceiling: round(ceiling), passed: width <= ceiling + 1e-12 };
}

function executeI(member, validation, rows, years, precisionCeilings) {
  const system = fitSystem(rows, modelKeys('I'), member.model, exogenousKeys.I, member.sharedExogenousElasticity);
  const basePaths = system.path(years);
  const points = identifiedOutcomes(member, basePaths, years).outcomes;
  let coverageLower;
  let contrastLower;
  let methodRecord;
  if (member.intervalFamily === 'B-1') {
    const result = studentizedBlockBootstrap({ rows, member, years, transform: (paths) => { const output = identifiedOutcomes(member, paths, years).outcomes; return [...output.treatmentCoverage, ...output.scheduleReceiptsContrast]; }, directions: Array(years.length * 2).fill(-1) });
    coverageLower = result.bounds.slice(0, years.length);
    contrastLower = result.bounds.slice(years.length);
    methodRecord = result;
  } else {
    const treatment = b2Outcome(rows, member, 'treatmentReceipts50', years);
    const obligations = b2Outcome(rows, member, 'obligations', years);
    const contrast = b2Outcome(rows, member, 'scheduleReceiptsContrast', years);
    const critical = inverseNormal(1 - 0.05 / (years.length * 3));
    coverageLower = treatment.point.map((entry, index) => (entry - critical * treatment.se[index]) / (obligations.point[index] + critical * obligations.se[index]));
    contrastLower = contrast.point.map((entry, index) => entry - critical * contrast.se[index]);
    methodRecord = { bandwidth: treatment.bandwidth, critical, comparisons: years.length * 3, longRunVariances: { treatmentReceipts: treatment.longRunVariance, obligations: obligations.longRunVariance, contrast: contrast.longRunVariance }, simultaneousMethod: 'one-sided Bonferroni simultaneous fallback', executedMaxTDistribution: false };
  }
  const horizon = years.map((year, index) => ({ year, treatmentReceipts50Point: round(points.treatmentReceipts50[index]), counterfactualReceipts70Point: round(points.counterfactualReceipts70[index]), scheduleReceiptsContrastPoint: round(points.scheduleReceiptsContrast[index]), scheduleReceiptsContrastLowerBound: round(contrastLower[index]), obligationsPoint: round(points.obligations[index]), treatmentCoveragePoint: round(points.treatmentCoverage[index]), treatmentCoverageLowerBound: round(coverageLower[index]), counterfactualCoveragePoint: round(points.counterfactualCoverage[index]), contrastRole: 'Required causal contrast; operative threshold remains absolute 50-schedule coverage.' }));
  const width = Math.max(...horizon.map((row) => row.treatmentCoveragePoint - row.treatmentCoverageLowerBound));
  const checks = [precisionCheck('50-schedule annual coverage ratio', width, precisionCeilings.coverage)];
  return { ...commonMember(member, validation, { family: member.intervalFamily, oneSidedLevel: 0.95, orientation: 'against-activation', simultaneous: true, width: round(width), precisionFloor: round(precisionCeilings.coverage), precisionChecks: checks, precisionSatisfied: checks.every((entry) => entry.passed), methodRecord }, identificationExecution(member, basePaths, years)), horizon };
}

function executeII(member, validation, rows, years, precisionCeilings, baselineMean) {
  const system = fitSystem(rows, modelKeys('II'), member.model, exogenousKeys.II, member.sharedExogenousElasticity);
  const basePaths = system.path(years);
  const points = identifiedOutcomes(member, basePaths, years).outcomes;
  let attributedLower;
  let effectLower;
  let methodRecord;
  if (member.intervalFamily === 'B-1') {
    const result = studentizedBlockBootstrap({ rows, member, years, transform: (paths) => { const output = identifiedOutcomes(member, paths, years).outcomes; return [...output.attributedTreatmentDividend, ...output.attributedScheduleEffect]; }, directions: Array(years.length * 2).fill(-1) });
    attributedLower = result.bounds.slice(0, years.length);
    effectLower = result.bounds.slice(years.length);
    methodRecord = result;
  } else {
    const attributed = b2Outcome(rows, member, 'attributedTreatmentDividend', years);
    const effect = b2Outcome(rows, member, 'attributedScheduleEffect', years);
    const critical = inverseNormal(1 - 0.05 / (years.length * 2));
    attributedLower = attributed.point.map((entry, index) => entry - critical * attributed.se[index]);
    effectLower = effect.point.map((entry, index) => entry - critical * effect.se[index]);
    methodRecord = { bandwidth: attributed.bandwidth, critical, comparisons: years.length * 2, longRunVariances: { attributedTreatment: attributed.longRunVariance, attributedEffect: effect.longRunVariance }, simultaneousMethod: 'one-sided Bonferroni simultaneous fallback', executedMaxTDistribution: false };
  }
  const horizon = years.map((year, index) => {
    const attributable = attributedLower[index] < baselineMean && effectLower[index] < 0;
    return { year, treatmentDividend50Point: round(points.treatmentDividend50[index]), counterfactualDividend70Point: round(points.counterfactualDividend70[index]), rawScheduleEffectPoint: round(points.rawScheduleEffect[index]), attributedScheduleEffectPoint: round(points.attributedScheduleEffect[index]), attributedScheduleEffectLowerBound: round(effectLower[index]), attributedTreatmentDividendPoint: round(points.attributedTreatmentDividend[index]), attributedTreatmentDividendLowerBound: round(attributedLower[index]), baselineMean: round(baselineMean), attributableToSchedule: attributable, attributionDisposition: attributable ? 'The simultaneous adverse bound is below baseline and the schedule-effect bound is negative.' : 'No year simultaneously has a below-baseline adverse dividend bound and a negative schedule-effect bound.' };
  });
  const width = Math.max(...horizon.map((row) => row.attributedTreatmentDividendPoint - row.attributedTreatmentDividendLowerBound));
  const checks = [precisionCheck('annual schedule-attributable dividend impairment margin', width, precisionCeilings.attributableDividend)];
  return { ...commonMember(member, validation, { family: member.intervalFamily, oneSidedLevel: 0.95, orientation: 'against-activation', simultaneous: true, width: round(width), precisionFloor: round(precisionCeilings.attributableDividend), precisionChecks: checks, precisionSatisfied: checks.every((entry) => entry.passed), methodRecord }, identificationExecution(member, basePaths, years)), horizon };
}

function executeIII(member, validation, rows, years, precisionCeilings) {
  const system = fitSystem(rows, modelKeys('III'), member.model, exogenousKeys.III, member.sharedExogenousElasticity);
  const basePaths = system.path(years);
  const points = identifiedOutcomes(member, basePaths, years).outcomes;
  let activationUpper;
  let flowLower;
  let scmContrastUpper;
  let flowContrastLower;
  let methodRecord;
  if (member.intervalFamily === 'B-1') {
    const result = studentizedBlockBootstrap({ rows, member, years, transform: (paths) => { const output = identifiedOutcomes(member, paths, years).outcomes; return [...output.modeledScmActivations, ...output.modeledFlowMargin, ...output.scmScheduleContrast, ...output.flowScheduleContrast]; }, directions: [...Array(years.length).fill(1), ...Array(years.length).fill(-1), ...Array(years.length).fill(1), ...Array(years.length).fill(-1)] });
    activationUpper = result.bounds.slice(0, years.length);
    flowLower = result.bounds.slice(years.length, years.length * 2);
    scmContrastUpper = result.bounds.slice(years.length * 2, years.length * 3);
    flowContrastLower = result.bounds.slice(years.length * 3);
    methodRecord = result;
  } else {
    const activation = b2Outcome(rows, member, 'modeledScmActivations', years);
    const flow = b2Outcome(rows, member, 'modeledFlowMargin', years);
    const scmContrast = b2Outcome(rows, member, 'scmScheduleContrast', years);
    const flowContrast = b2Outcome(rows, member, 'flowScheduleContrast', years);
    const critical = inverseNormal(1 - 0.05 / (years.length * 4));
    activationUpper = activation.point.map((entry, index) => entry + critical * activation.se[index]);
    flowLower = flow.point.map((entry, index) => entry - critical * flow.se[index]);
    scmContrastUpper = scmContrast.point.map((entry, index) => entry + critical * scmContrast.se[index]);
    flowContrastLower = flowContrast.point.map((entry, index) => entry - critical * flowContrast.se[index]);
    methodRecord = { bandwidth: activation.bandwidth, critical, comparisons: years.length * 4, longRunVariances: { activation: activation.longRunVariance, flow: flow.longRunVariance, scmContrast: scmContrast.longRunVariance, flowContrast: flowContrast.longRunVariance }, simultaneousMethod: 'one-sided Bonferroni simultaneous fallback', executedMaxTDistribution: false };
  }
  const horizon = years.map((year, index) => ({ year, treatmentScmActivations50Point: round(points.treatmentScmActivations50[index]), counterfactualScmActivations70Point: round(points.counterfactualScmActivations70[index]), scmScheduleContrastPoint: round(points.scmScheduleContrast[index]), scmScheduleContrastUpperBound: round(scmContrastUpper[index]), activationFrequencyPoint: round(points.modeledScmActivations[index]), activationFrequencyUpperBound: round(activationUpper[index]), treatmentFlowMargin50Point: round(points.treatmentFlowMargin50[index]), counterfactualFlowMargin70Point: round(points.counterfactualFlowMargin70[index]), flowScheduleContrastPoint: round(points.flowScheduleContrast[index]), flowScheduleContrastLowerBound: round(flowContrastLower[index]), flowMarginPoint: round(points.modeledFlowMargin[index]), flowMarginLowerBound: round(flowLower[index]) }));
  const activationWidth = Math.max(...horizon.map((row) => row.activationFrequencyUpperBound - row.activationFrequencyPoint));
  const flowWidth = Math.max(...horizon.map((row) => row.flowMarginPoint - row.flowMarginLowerBound));
  const checks = [precisionCheck('annual SCM activation frequency', activationWidth, precisionCeilings.activation), precisionCheck('annual Flow Test margin', flowWidth, precisionCeilings.flow)];
  return { ...commonMember(member, validation, { family: member.intervalFamily, oneSidedLevel: 0.95, orientation: 'against-activation', simultaneous: true, width: round(Math.max(activationWidth, flowWidth)), precisionFloor: round(Math.min(precisionCeilings.activation, precisionCeilings.flow)), precisionChecks: checks, precisionSatisfied: checks.every((entry) => entry.passed), methodRecord }, identificationExecution(member, basePaths, years)), horizon };
}

function executeIV(member, validation, rows, years, precisionCeilings) {
  const system = fitSystem(rows, modelKeys('IV'), member.model, exogenousKeys.IV, member.sharedExogenousElasticity);
  const fittedPaths = system.path(years);
  const identified = identifiedOutcomes(member, fittedPaths, years);
  const point = identified.components;
  let samplingWidth;
  let identificationRegion = 0;
  let methodRecord;
  if (member.intervalFamily === 'B-1') {
    const result = studentizedBlockBootstrap({ rows, member, years, transform: (paths) => [identifiedOutcomes(member, paths, years).components.om], directions: [-1] });
    samplingWidth = result.points[0] - result.bounds[0];
    methodRecord = { ...result, target: 'discounted thirty-year net OM scalar directly' };
  } else {
    const bootstrap = directScalarBlockBootstrap({ rows, member, years, scalarTransform: (paths) => identifiedOutcomes(member, paths, years).components.om, contributionTransform: (paths) => { const components = identifiedOutcomes(member, paths, years).components; return components.netMarginalValue.map((value, index) => value * components.discount[index]); } });
    samplingWidth = bootstrap.samplingWidth;
    const adverseShare = resolveIdentification(member).values['adverse-cost-share'] ?? 0;
    identificationRegion = sum(years.map((_, index) => (fittedPaths.displacementCost[index] + fittedPaths.externalCost[index]) * adverseShare * point.discount[index]));
    methodRecord = { ...bootstrap, samplingWidth: round(samplingWidth), identificationRegionWidth: round(identificationRegion), totalAdverseWidth: round(samplingWidth + identificationRegion), identifiedRegionEndpoint: 'sampling lower endpoint minus the locked adverse displacement/external-cost region', covarianceOrResamplingProvenance: bootstrap.dependencePreservation };
  }
  const width = samplingWidth + identificationRegion;
  const horizon = years.map((year, index) => ({
    year,
    privateConsumerSurplus: round(fittedPaths.privateConsumerSurplus[index]), privateProducerSurplus: round(fittedPaths.privateProducerSurplus[index]), qualityAdjustment: round(fittedPaths.qualityAdjustment[index]), displacementCost: round(fittedPaths.displacementCost[index]), externalCost: round(fittedPaths.externalCost[index]),
    publicConsumerSurplus: round(fittedPaths.publicConsumerSurplus[index]), publicProducerSurplus: round(fittedPaths.publicProducerSurplus[index]), publicQualityAdjustment: round(fittedPaths.publicQualityAdjustment[index]), beyondHorizonValue: round(fittedPaths.beyondHorizonValue[index]), publicCaptureSurplus: round(fittedPaths.publicCaptureSurplus[index]), canonicalConsumptionLevel: round(fittedPaths.canonicalConsumptionLevel[index]),
    privateMarginalValue: round(point.privateValue[index]), publicCounterfactualMarginalValue: round(point.publicValue[index]), netMarginalValue: round(point.netMarginalValue[index]), discountFactor: round(point.discount[index], 10), discountedNetMarginalValue: round(point.netMarginalValue[index] * point.discount[index]), concentrationEventsUpperBound: 0,
  }));
  const omPoint = sum(horizon.map((row) => row.discountedNetMarginalValue));
  const checks = [precisionCheck('discounted thirty-year net OM scalar', width, precisionCeilings.omScalar)];
  return { ...commonMember(member, validation, { family: member.intervalFamily, oneSidedLevel: 0.95, orientation: 'against-activation', simultaneous: false, width: round(width), precisionFloor: round(precisionCeilings.omScalar), precisionChecks: checks, precisionSatisfied: checks.every((entry) => entry.passed), methodRecord }, identificationExecution(member, fittedPaths, years, { identificationRegionWidth: identificationRegion })), omPoint: round(omPoint), omLowerBound: round(omPoint - width), samplingUncertaintyWidth: round(samplingWidth), identifiedRegionWidth: round(identificationRegion), horizon };
}

function diagnosticsFor(member, findingIII) {
  const horizon = member.horizon;
  if (member.id.startsWith('IV-')) {
    const zeroDiscount = sum(horizon.map((row) => row.netMarginalValue));
    const baselineConsumption = mean(horizon.map((row) => row.canonicalConsumptionLevel));
    const weighted = sum(horizon.map((row) => row.discountedNetMarginalValue * baselineConsumption / row.canonicalConsumptionLevel));
    const beyond = sum(horizon.map((row) => row.beyondHorizonValue * row.discountFactor));
    const publicNumerator = sum(horizon.map((row) => row.publicCaptureSurplus * row.discountFactor));
    const privateDenominator = sum(horizon.map((row) => (row.privateConsumerSurplus + row.privateProducerSurplus + row.qualityAdjustment) * row.discountFactor));
    return {
      memberId: member.id,
      D1: { status: 'COMPUTED', zeroDiscountOm: round(zeroDiscount), arithmetic: 'sum(private marginal value - public counterfactual marginal value), discount factor fixed to one' },
      D2: { status: 'COMPUTED', distributionWeightedOm: round(weighted), baselineConsumption: round(baselineConsumption), arithmetic: 'sum(discounted net marginal value x baseline mean canonical consumption / projected canonical consumption)' },
      D3: { status: 'COMPUTED', beyondHorizonShare: round(Math.abs(beyond) / Math.max(Math.abs(member.omPoint) + Math.abs(beyond), 1e-12)), numerator: round(beyond), denominator: round(Math.abs(member.omPoint) + Math.abs(beyond)), arithmetic: 'discounted deposited beyond-horizon value / (absolute controlling OM + discounted beyond-horizon value)' },
      D4: { status: 'COMPUTED', publicCaptureNumerator: round(publicNumerator), privateSurplusDenominator: round(privateDenominator), arithmetic: 'required numerator/denominator pair; no quotient' },
      D5: { status: 'COMPUTED', concentrationShadowPair: { findingIIIActivationUpper: round(Math.max(...findingIII.horizon.map((row) => row.activationFrequencyUpperBound))), omLowerBound: member.omLowerBound }, arithmetic: 'paired executed Finding III frequency upper bound and this member OM lower bound' },
    };
  }
  return {
    memberId: member.id,
    D1: { status: 'NOT_APPLICABLE', arithmeticExplanation: 'The member is not a Finding IV welfare-discount member.' },
    D2: { status: 'NOT_APPLICABLE', arithmeticExplanation: 'The member has no Marshallian welfare vector.' },
    D3: { status: 'NOT_APPLICABLE', arithmeticExplanation: 'The member estimates a complete statutory path, not an OM tail share.' },
    D4: { status: 'NOT_APPLICABLE', arithmeticExplanation: 'The member contains no private/public Marshallian-surplus pair.' },
    D5: { status: 'COMPUTED', concentrationShadowPair: { findingIIIActivationUpper: round(Math.max(...findingIII.horizon.map((row) => row.activationFrequencyUpperBound))), memberAdverseBound: member.id.startsWith('I-') ? round(Math.min(...horizon.map((row) => row.treatmentCoverageLowerBound))) : member.id.startsWith('II-') ? round(Math.min(...horizon.map((row) => row.attributedTreatmentDividendLowerBound))) : round(Math.max(...horizon.map((row) => row.activationFrequencyUpperBound))) }, arithmetic: 'executed concentration-shadow frequency paired with this member adverse bound' },
  };
}

function derivationFor(member, rawSourceId) {
  const rows = member.horizon.map((row) => ({ year: row.year, privateConsumerSurplus: row.privateConsumerSurplus, privateProducerSurplus: row.privateProducerSurplus, qualityAdjustment: row.qualityAdjustment, displacementCost: row.displacementCost, externalCost: row.externalCost, publicConsumerSurplus: row.publicConsumerSurplus, publicProducerSurplus: row.publicProducerSurplus, publicQualityAdjustment: row.publicQualityAdjustment, private: row.privateMarginalValue, publicCounterfactual: row.publicCounterfactualMarginalValue, discountFactor: row.discountFactor, identityContribution: row.discountedNetMarginalValue }));
  return {
    memberId: member.id, sourceBindings: [rawSourceId], treatment: 'retained 70-to-50 tranche allocated through each ledger-traced private venture', counterfactual: 'the same tranche through the realized public first-allocation venture classes',
    marshallianSurplusConvention: 'consumer surplus + producer surplus + quality adjustment at observed demand, without distribution weighting in the controlling result',
    ventureIdentity: 'trace share x [private consumer surplus + private producer surplus + quality - displacement - external cost - realized-public-allocation share x public counterfactual surplus]',
    displacementNetting: 'one subtraction in private marginal value', externalCostNetting: 'one subtraction in private marginal value', identificationAssumptions: member.identificationAssumptions, identificationExecution: member.identificationExecution,
    rows, accountingIdentity: { sumOfRows: round(sum(rows.map((row) => row.identityContribution))), filedOmPoint: member.omPoint, reconciles: Math.abs(sum(rows.map((row) => row.identityContribution)) - member.omPoint) < 1e-6 },
  };
}

function findingVotes(disposition) {
  const vote = disposition === 'PASS' ? 'CERTIFY' : disposition === 'VOID_INDECISION' ? 'VOID' : 'REFUSE';
  return ['Aster Vale', 'Mira Quen', 'Tal Ren'].map((commissioner) => ({ commissioner, vote }));
}

export function executeLockedAnalysis({ root, preregistration }) {
  const years = Array.from({ length: 30 }, (_, index) => 2295 + index);
  const holdoutYears = preregistration.validation.heldOutYears;
  const raw = Object.fromEntries(['I', 'II', 'III', 'IV'].map((finding) => [finding, readMapped(root, preregistration, finding)]));
  for (const member of preregistration.admissibleSpecificationSet) resolveIdentification(member);
  const validationRecords = preregistration.admissibleSpecificationSet.map((member) => validateMemberOutcomeSpecific(member, raw[member.finding].rows, holdoutYears));
  const admitted = preregistration.admissibleSpecificationSet.filter((member) => validationRecords.find((record) => record.memberId === member.id).survived);
  const excludedMembers = validationRecords.filter((record) => !record.survived).map((record) => ({ memberId: record.memberId, finding: record.finding, reason: 'At least one outcome-specific held-out RMSE exceeded same-outcome persistence RMSE', failedOutcomes: Object.entries(record.outcomeComparisons).filter(([, value]) => !value.survived).map(([name]) => name), validationRecord: record }));
  for (const finding of ['I', 'II', 'III', 'IV']) {
    const panels = new Set(admitted.filter((member) => member.finding === finding).map((member) => member.panel));
    if (!panels.has('certification') || !panels.has('refusal')) throw new Error(`Finding ${finding}: outcome-specific validation left no surviving member for both adversarial panels`);
  }
  const baselineRows = Object.fromEntries(Object.entries(raw).map(([finding, entry]) => [finding, entry.rows.filter((row) => row.year >= 2282)]));
  const baselineCoverage = mean(baselineRows.I.map((row) => row.treatmentReceipts50 / row.obligations));
  const baselineDividend = mean(baselineRows.II.map((row) => row.counterfactualDividend70));
  const baselineDividendSd = standardDeviation(baselineRows.II.map((row) => row.counterfactualDividend70));
  const baselineActivation = mean(baselineRows.III.map((row) => row.counterfactualScmActivations70));
  const baselineFlow = mean(baselineRows.III.map((row) => row.counterfactualFlowMargin70));
  const ivBaseMember = admitted.find((member) => member.finding === 'IV');
  const baselineIvPaths = observedPaths(baselineRows.IV, modelKeys('IV'), exogenousKeys.IV);
  const baselineAnnualOm = mean(identifiedOutcomes(ivBaseMember, baselineIvPaths, baselineRows.IV.map((row) => row.year)).outcomes.netMarginalValue);
  const discountSum = sum(years.map((_, index) => 1 / (1.02 ** (index + 1))));
  const precision = {
    I: { summaryMeasure: '50-schedule annual institutional coverage ratio', baselineObservedMean: baselineCoverage, passThreshold: 1, ceilings: { coverage: Math.abs(baselineCoverage - 1) }, authority: 'Charter §3.1 and §5.3' },
    II: { summaryMeasure: 'annual schedule-attributable dividend impairment margin', baselineObservedMean: baselineDividend, passThreshold: 0, ceilings: { attributableDividend: baselineDividendSd }, ceilingFormula: 'sample standard deviation of the ten enacted-70 baseline dividend observations', authority: preregistration.precisionClarification.amendmentDigest },
    III: { summaryMeasure: 'annual SCM activation frequency and annual Flow Test margin', baselineObservedMean: { activation: baselineActivation, flow: baselineFlow }, passThreshold: { activation: baselineActivation * 1.25, flow: 0 }, ceilings: { activation: Math.abs(baselineActivation * 1.25 - baselineActivation), flow: Math.abs(baselineFlow) }, authority: 'Charter §3.3 and §5.3, applied outcome by outcome' },
    IV: { summaryMeasure: 'discounted thirty-year net OM scalar', baselineObservedMean: baselineAnnualOm * discountSum, passThreshold: 0, ceilings: { omScalar: Math.abs(baselineAnnualOm * discountSum) }, authority: preregistration.precisionClarification.amendmentDigest },
  };
  const findMembers = (finding) => admitted.filter((member) => member.finding === finding).map((member) => ({ member, validation: validationRecords.find((record) => record.memberId === member.id) }));
  const membersI = findMembers('I').map(({ member, validation }) => executeI(member, validation, raw.I.rows, years, precision.I.ceilings));
  const membersII = findMembers('II').map(({ member, validation }) => executeII(member, validation, raw.II.rows, years, precision.II.ceilings, baselineDividend));
  const membersIII = findMembers('III').map(({ member, validation }) => executeIII(member, validation, raw.III.rows, years, precision.III.ceilings));
  const membersIV = findMembers('IV').map(({ member, validation }) => executeIV(member, validation, raw.IV.rows, years, precision.IV.ceilings));
  const leastI = membersI.reduce((a, b) => Math.min(...a.horizon.map((row) => row.treatmentCoverageLowerBound)) < Math.min(...b.horizon.map((row) => row.treatmentCoverageLowerBound)) ? a : b);
  const leastII = membersII.reduce((a, b) => Math.min(...a.horizon.map((row) => row.attributedTreatmentDividendLowerBound)) < Math.min(...b.horizon.map((row) => row.attributedTreatmentDividendLowerBound)) ? a : b);
  const leastIII = membersIII.reduce((a, b) => Math.max(...a.horizon.map((row) => row.activationFrequencyUpperBound)) > Math.max(...b.horizon.map((row) => row.activationFrequencyUpperBound)) ? a : b);
  const leastIV = membersIV.reduce((a, b) => a.omLowerBound < b.omLowerBound ? a : b);
  const dispose = (members, substantivePass) => members.some((member) => !member.interval.precisionSatisfied) ? 'VOID_INDECISION' : substantivePass ? 'PASS' : 'FAIL';
  const dispositions = {
    I: dispose(membersI, Math.min(...membersI.flatMap((member) => member.horizon.map((row) => row.treatmentCoverageLowerBound))) > 1),
    II: dispose(membersII, membersII.every((member) => member.horizon.every((row) => !row.attributableToSchedule))),
    III: dispose(membersIII, Math.max(...membersIII.flatMap((member) => member.horizon.map((row) => row.activationFrequencyUpperBound))) < baselineActivation * 1.25 && Math.min(...membersIII.flatMap((member) => member.horizon.map((row) => row.flowMarginLowerBound))) > 0),
    IV: dispose(membersIV, membersIV.every((member) => member.omLowerBound > 0 && member.horizon.every((row) => row.concentrationEventsUpperBound === 0))),
  };
  const findings = {
    I: { treatment: '50 percent schedule receipts under the locked shared demographic path', counterfactual: 'enacted 70 percent schedule receipts under that identical path', threshold: 1, baselineMean: round(baselineCoverage), leastFavorableMember: leastI.id, members: membersI, votes: findingVotes(dispositions.I), disposition: dispositions.I, precisionFloorCalculation: precision.I },
    II: { treatment: '50-schedule dividend path', counterfactual: 'enacted-70 dividend path', baseline: baselineRows.II.map((row) => ({ year: row.year, realDividendPerResident: row.counterfactualDividend70 })), baselineMean: round(baselineDividend), leastFavorableMember: leastII.id, members: membersII, votes: findingVotes(dispositions.II), disposition: dispositions.II, precisionFloorCalculation: precision.II },
    III: { treatment: '50-schedule SCM activation and Flow paths', counterfactual: 'enacted-70 SCM activation and Flow paths', baseline: baselineRows.III.map((row) => ({ year: row.year, annualScmActivations: row.counterfactualScmActivations70, flowTestMargin: row.counterfactualFlowMargin70 })), baselineActivationMean: round(baselineActivation), baselineFlowMean: round(baselineFlow), leastFavorableMember: leastIII.id, members: membersIII, votes: findingVotes(dispositions.III), disposition: dispositions.III, precisionFloorCalculation: precision.III },
    IV: { treatment: 'ledger-traced private deployment of the retained 70-to-50 tranche', counterfactual: 'same tranche through the realized public first-allocation portfolio', baselinePublicDeploymentMean: round(mean(baselineRows.IV.map((row) => row.publicConsumerSurplus + row.publicProducerSurplus + row.publicQualityAdjustment))), leastFavorableMember: leastIV.id, retainedCapitalQuantity: 214.7, retainedCapitalUnits: 'billion constant-2292 Main credits attributable to 70-to-50 over the first assessment year', publicCounterfactual: 'realized 2282-2291 public first-allocation portfolio, same traced venture classes', members: membersIV, votes: findingVotes(dispositions.IV), disposition: dispositions.IV, precisionFloorCalculation: precision.IV },
  };
  const diagnostics = [...membersI, ...membersII, ...membersIII, ...membersIV].map((member) => diagnosticsFor(member, leastIII));
  const findingIvDerivations = membersIV.map((member) => derivationFor(member, raw.IV.mapping.sourceId));
  return canonicalizeExecutionValue({
    schemaVersion: '3.0', executionEntryPoint: 'tools/path2-execution-engine.mjs#executeLockedAnalysis', window: { observation: [2272, 2291], training: [2272, 2286], heldOutValidation: [2287, 2291], thresholdBaseline: [2282, 2291], projection: [2295, 2324] },
    contrastArchitecture: Object.fromEntries(Object.entries(raw).map(([finding, entry]) => [finding, { treatmentQuantity: entry.mapping.treatmentQuantity, counterfactualQuantity: entry.mapping.counterfactualQuantity, observedOrEstimatedSources: entry.mapping.observedOrEstimatedSources, sharedExogenousInput: entry.mapping.sharedExogenousInput, identificationAssumptionExecution: 'member.identificationRules, verified consumed before validation and execution', uncertaintyConstruction: entry.mapping.uncertaintyConstruction, leastActivationFavorableSelection: 'minimum or maximum adverse bound across every surviving equivalence class' }])),
    sourceDigests: Object.fromEntries(Object.values(raw).map((entry) => [entry.mapping.sourceId, entry.mapping.digest])), validationRecords, excludedMembers, precisionCalculations: precision, findings, diagnostics, findingIvDerivations,
  });
}
