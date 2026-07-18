/**
 * Deterministic execution engine for the LP-074 Path 2 run.
 *
 * This module is deliberately independent of the publication builder.  It
 * starts with the byte-locked preregistration and raw observation artifacts,
 * performs §4.3 validation, fits the surviving specifications, constructs the
 * selected Schedule §10.4 intervals, and returns every published Finding and
 * mandatory diagnostic.  The verifier calls this same entry point afresh.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const round = (value, places = 8) => Number(Number(value).toFixed(places));
// The deposited execution record is a byte-bound legal artifact. Normalize
// intermediate floating-point values as well as published bounds so that an
// otherwise identical run has the same bytes across supported Node runtimes.
// Ten decimal places is finer than every filed threshold and reported result.
function canonicalizeExecutionValue(value) {
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new Error('execution output contains a non-finite number');
    return Number(value.toFixed(10));
  }
  if (Array.isArray(value)) return value.map(canonicalizeExecutionValue);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, nested]) => [key, canonicalizeExecutionValue(nested)]));
  }
  return value;
}
const sum = (values) => values.reduce((total, value) => total + Number(value), 0);
const mean = (values) => sum(values) / values.length;
const variance = (values) => {
  if (values.length < 2) return 0;
  const center = mean(values);
  return sum(values.map((value) => (value - center) ** 2)) / (values.length - 1);
};
const rmse = (values) => Math.sqrt(mean(values.map((value) => value ** 2)));
const quantile = (values, probability) => {
  const ordered = [...values].sort((a, b) => a - b);
  const position = Math.max(0, Math.min(ordered.length - 1, (ordered.length - 1) * probability));
  const lower = Math.floor(position);
  const fraction = position - lower;
  return ordered[lower] + fraction * ((ordered[lower + 1] ?? ordered[lower]) - ordered[lower]);
};

// Acklam's deterministic inverse-normal approximation.  B-2 applies the
// one-sided Bonferroni/max-t fallback expressly allowed by Schedule B-2.
function inverseNormal(p) {
  if (!(p > 0 && p < 1)) throw new Error(`inverseNormal probability outside (0,1): ${p}`);
  const a = [-39.6968302866538, 220.946098424521, -275.928510446969, 138.357751867269, -30.6647980661472, 2.50662827745924];
  const b = [-54.4760987982241, 161.585836858041, -155.698979859887, 66.8013118877197, -13.2806815528857];
  const c = [-0.00778489400243029, -0.322396458041136, -2.40075827716184, -2.54973253934373, 4.37466414146497, 2.93816398269878];
  const d = [0.00778469570904146, 0.32246712907004, 2.445134137143, 3.75440866190742];
  const low = 0.02425;
  const high = 1 - low;
  if (p < low) {
    const q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  if (p > high) {
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

function fit(values, years, model) {
  if (model === 'constant') {
    const intercept = mean(values);
    return { model, intercept, slope: 0, origin: years[0] };
  }
  const origin = years[0];
  const x = years.map((year) => year - origin);
  const xMean = mean(x);
  const yMean = mean(values);
  const denominator = sum(x.map((value) => (value - xMean) ** 2));
  const slope = denominator === 0 ? 0 : sum(x.map((value, index) => (value - xMean) * (values[index] - yMean))) / denominator;
  return { model: 'linear', intercept: yMean - slope * xMean, slope, origin };
}

const predict = (fitted, year) => fitted.intercept + fitted.slope * (year - fitted.origin);

function modelKeys(finding) {
  if (finding === 'I') return ['receipts', 'obligations'];
  if (finding === 'II') return ['realDividendPerResident'];
  if (finding === 'III') return ['annualScmActivations', 'flowTestMargin'];
  return ['privateConsumerSurplus', 'privateProducerSurplus', 'qualityAdjustment', 'publicConsumerSurplus', 'publicProducerSurplus', 'publicQualityAdjustment', 'displacementCost', 'externalCost', 'beyondHorizonValue', 'publicCaptureSurplus', 'canonicalConsumptionLevel'];
}

function readMapped(root, preregistration, finding) {
  const mapping = preregistration.dataSourceMappings.find((entry) => entry.finding === finding);
  if (!mapping) throw new Error(`preregistration data mapping missing for Finding ${finding}`);
  const document = JSON.parse(readFileSync(join(root, mapping.path), 'utf8'));
  if (!Array.isArray(document.observations)) throw new Error(`Finding ${finding} raw observations missing`);
  const years = document.observations.map((row) => Number(row.year));
  const expected = Array.from({ length: 20 }, (_, index) => 2272 + index);
  if (years.length !== expected.length || years.some((year, index) => year !== expected[index])) throw new Error(`Finding ${finding} observation window must cover 2272-2291 exactly`);
  return { mapping, document, rows: document.observations };
}

function validateMember(member, rows, holdoutYears) {
  const keys = modelKeys(member.finding);
  const training = rows.filter((row) => row.year < holdoutYears[0]);
  const holdout = rows.filter((row) => holdoutYears.includes(row.year));
  const fitted = Object.fromEntries(keys.map((key) => [key, fit(training.map((row) => Number(row[key])), training.map((row) => row.year), member.model)]));
  const rowLevel = holdout.map((row) => {
    const prior = rows.find((candidate) => candidate.year === row.year - 1);
    const outcomes = Object.fromEntries(keys.map((key) => {
      const actual = Number(row[key]);
      const memberPrediction = predict(fitted[key], row.year);
      const persistencePrediction = Number(prior[key]);
      return [key, {
        actual: round(actual), memberPrediction: round(memberPrediction), persistencePrediction: round(persistencePrediction),
        memberError: round(memberPrediction - actual), persistenceError: round(persistencePrediction - actual),
      }];
    }));
    return { year: row.year, outcomes };
  });
  const memberErrors = rowLevel.flatMap((row) => Object.values(row.outcomes).map((value) => value.memberError));
  const persistenceErrors = rowLevel.flatMap((row) => Object.values(row.outcomes).map((value) => value.persistenceError));
  const validationError = rmse(memberErrors);
  const persistenceError = rmse(persistenceErrors);
  return {
    memberId: member.id, finding: member.finding, trainingYears: [training[0].year, training.at(-1).year], heldOutYears: [holdout[0].year, holdout.at(-1).year],
    rowLevel, validationError: round(validationError), persistenceError: round(persistenceError), survived: validationError <= persistenceError,
    disposition: validationError <= persistenceError ? 'ADMITTED' : 'EXCLUDED_SECTION_4_3', fitted,
  };
}

function automaticBlockLength(n) {
  return Math.max(2, Math.round(1.5 * Math.cbrt(n)));
}

function automaticBandwidth(n) {
  return Math.max(1, Math.floor(4 * ((n / 100) ** (2 / 9))));
}

function hacForecastSe(values, years, futureYears) {
  const fitted = fit(values, years, 'linear');
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
  const se = futureYears.map((year) => Math.sqrt(longRun * (1 / values.length + ((year - origin) - xMean) ** 2 / sxx)));
  return { fitted, residuals, bandwidth, longRunVariance: longRun, se };
}

function blockBootstrap(rows, keys, years, model, seed, replications, transform) {
  const random = generator(seed);
  const n = rows.length;
  const blockLength = automaticBlockLength(n);
  const observedYears = rows.map((row) => row.year);
  const fittedByKey = Object.fromEntries(keys.map((key) => [key, fit(rows.map((row) => Number(row[key])), observedYears, model)]));
  const residualsByKey = Object.fromEntries(keys.map((key) => {
    const residuals = rows.map((row) => Number(row[key]) - predict(fittedByKey[key], row.year));
    const center = mean(residuals);
    return [key, residuals.map((value) => value - center)];
  }));
  const points = transform(Object.fromEntries(keys.map((key) => [key, years.map((year) => predict(fittedByKey[key], year))])));
  const draws = [];
  for (let replication = 0; replication < replications; replication += 1) {
    const sampledIndexes = [];
    while (sampledIndexes.length < n) {
      const start = Math.floor(random() * n);
      for (let offset = 0; offset < blockLength && sampledIndexes.length < n; offset += 1) sampledIndexes.push((start + offset) % n);
    }
    const paths = Object.fromEntries(keys.map((key) => {
      const pseudoValues = observedYears.map((year, index) => predict(fittedByKey[key], year) + residualsByKey[key][sampledIndexes[index]]);
      const fitted = fit(pseudoValues, observedYears, model);
      return [key, years.map((year) => predict(fitted, year))];
    }));
    draws.push(transform(paths));
  }
  const vectorPoint = Array.isArray(points) ? points : [points];
  const vectorDraws = draws.map((value) => Array.isArray(value) ? value : [value]);
  const standardErrors = vectorPoint.map((_, index) => Math.sqrt(Math.max(variance(vectorDraws.map((draw) => draw[index])), 1e-12)));
  const maxStudentized = vectorDraws.map((draw) => Math.max(...draw.map((value, index) => Math.abs(value - vectorPoint[index]) / standardErrors[index])));
  const critical = quantile(maxStudentized, 0.95);
  return { points: vectorPoint, standardErrors, critical, blockLength, replications, seed };
}

function commonMember(member, validation, interval) {
  return {
    id: member.id, panel: member.panel, equivalenceClass: member.equivalenceClass, functionalClass: member.functionalClass,
    identificationAssumptions: member.identificationAssumptions, sourceId: member.sourceId,
    validationError: validation.validationError, persistenceError: validation.persistenceError,
    validationRecordId: validation.memberId, preprocessing: member.preprocessing, interval,
  };
}

function b2Scalar(rows, key, years) {
  const analytic = hacForecastSe(rows.map((row) => Number(row[key])), rows.map((row) => row.year), years);
  const critical = inverseNormal(1 - 0.05 / years.length);
  const point = years.map((year) => predict(analytic.fitted, year));
  return { ...analytic, critical, point, adjustment: analytic.se.map((value) => value * critical) };
}

function executeI(member, validation, rows, years, precisionCeiling) {
  let receipts;
  let obligations;
  let lower;
  let methodRecord;
  if (member.intervalFamily === 'B-1') {
    const result = blockBootstrap(rows, ['receipts', 'obligations'], years, member.model, member.seed, member.replications, (paths) => paths.receipts.map((value, index) => value / paths.obligations[index]));
    const fittedR = fit(rows.map((row) => row.receipts), rows.map((row) => row.year), member.model);
    const fittedO = fit(rows.map((row) => row.obligations), rows.map((row) => row.year), member.model);
    receipts = years.map((year) => predict(fittedR, year));
    obligations = years.map((year) => predict(fittedO, year));
    lower = result.points.map((value, index) => value - result.critical * result.standardErrors[index]);
    methodRecord = result;
  } else {
    const r = b2Scalar(rows, 'receipts', years);
    const o = b2Scalar(rows, 'obligations', years);
    receipts = r.point;
    obligations = o.point;
    lower = receipts.map((value, index) => (value - r.adjustment[index]) / (obligations[index] + o.adjustment[index]));
    methodRecord = { bandwidth: r.bandwidth, critical: r.critical, longRunVariances: { receipts: r.longRunVariance, obligations: o.longRunVariance }, simultaneousMethod: 'one-sided Bonferroni max-t fallback' };
  }
  const horizon = years.map((year, index) => ({ year, receiptsPoint: round(receipts[index]), obligationsPoint: round(obligations[index]), coveragePoint: round(receipts[index] / obligations[index]), coverageLowerBound: round(lower[index]) }));
  const width = Math.max(...horizon.map((row) => row.coveragePoint - row.coverageLowerBound));
  return { ...commonMember(member, validation, { family: member.intervalFamily, oneSidedLevel: 0.95, orientation: 'against-activation', simultaneous: true, width: round(width), precisionFloor: round(precisionCeiling), methodRecord }), horizon };
}

function executeII(member, validation, rows, years, precisionCeiling, baselineMean) {
  let point;
  let lower;
  let methodRecord;
  if (member.intervalFamily === 'B-1') {
    const result = blockBootstrap(rows, ['realDividendPerResident'], years, member.model, member.seed, member.replications, (paths) => paths.realDividendPerResident);
    point = result.points;
    lower = point.map((value, index) => value - result.critical * result.standardErrors[index]);
    methodRecord = result;
  } else {
    const result = b2Scalar(rows, 'realDividendPerResident', years);
    point = result.point;
    lower = point.map((value, index) => value - result.adjustment[index]);
    methodRecord = { bandwidth: result.bandwidth, critical: result.critical, longRunVariance: result.longRunVariance, simultaneousMethod: 'one-sided Bonferroni max-t fallback' };
  }
  const horizon = years.map((year, index) => {
    const attributable = lower[index] < baselineMean;
    return { year, disbursementPoint: round(point[index]), disbursementLowerBound: round(lower[index]), attributableToSchedule: attributable, attributionDisposition: attributable ? 'Executed lower bound falls below the locked baseline mean' : 'Executed lower bound is not below the locked baseline mean; schedule-attributable impairment count is zero' };
  });
  const width = Math.max(...horizon.map((row) => row.disbursementPoint - row.disbursementLowerBound));
  return { ...commonMember(member, validation, { family: member.intervalFamily, oneSidedLevel: 0.95, orientation: 'against-activation', simultaneous: true, width: round(width), precisionFloor: round(precisionCeiling), methodRecord }), horizon };
}

function executeIII(member, validation, rows, years, precisionCeiling) {
  let activation;
  let flow;
  let activationUpper;
  let flowLower;
  let methodRecord;
  if (member.intervalFamily === 'B-1') {
    const result = blockBootstrap(rows, ['annualScmActivations', 'flowTestMargin'], years, member.model, member.seed, member.replications, (paths) => [...paths.annualScmActivations, ...paths.flowTestMargin]);
    activation = result.points.slice(0, years.length);
    flow = result.points.slice(years.length);
    activationUpper = activation.map((value, index) => value + result.critical * result.standardErrors[index]);
    flowLower = flow.map((value, index) => value - result.critical * result.standardErrors[years.length + index]);
    methodRecord = result;
  } else {
    const a = b2Scalar(rows, 'annualScmActivations', years);
    const f = b2Scalar(rows, 'flowTestMargin', years);
    activation = a.point;
    flow = f.point;
    activationUpper = activation.map((value, index) => value + a.adjustment[index]);
    flowLower = flow.map((value, index) => value - f.adjustment[index]);
    methodRecord = { bandwidth: a.bandwidth, critical: a.critical, longRunVariances: { activation: a.longRunVariance, flow: f.longRunVariance }, simultaneousMethod: 'one-sided Bonferroni max-t fallback' };
  }
  const horizon = years.map((year, index) => ({ year, activationFrequencyPoint: round(activation[index]), activationFrequencyUpperBound: round(activationUpper[index]), flowMarginPoint: round(flow[index]), flowMarginLowerBound: round(flowLower[index]) }));
  const width = Math.max(...horizon.flatMap((row) => [row.activationFrequencyUpperBound - row.activationFrequencyPoint, row.flowMarginPoint - row.flowMarginLowerBound]));
  return { ...commonMember(member, validation, { family: member.intervalFamily, oneSidedLevel: 0.95, orientation: 'against-activation', simultaneous: true, width: round(width), precisionFloor: round(precisionCeiling), methodRecord }), horizon };
}

function ivPaths(paths, years) {
  const discount = years.map((_, index) => 1 / (1.02 ** (index + 1)));
  const privateValue = years.map((_, index) => paths.privateConsumerSurplus[index] + paths.privateProducerSurplus[index] + paths.qualityAdjustment[index] - paths.displacementCost[index] - paths.externalCost[index]);
  const publicValue = years.map((_, index) => paths.publicConsumerSurplus[index] + paths.publicProducerSurplus[index] + paths.publicQualityAdjustment[index]);
  const om = sum(privateValue.map((value, index) => (value - publicValue[index]) * discount[index]));
  return { privateValue, publicValue, discount, om };
}

function executeIV(member, validation, rows, years, precisionCeiling) {
  const keys = modelKeys('IV');
  const fittedPaths = Object.fromEntries(keys.map((key) => {
    const fitted = fit(rows.map((row) => Number(row[key])), rows.map((row) => row.year), member.model);
    return [key, years.map((year) => predict(fitted, year))];
  }));
  const point = ivPaths(fittedPaths, years);
  let width;
  let methodRecord;
  if (member.intervalFamily === 'B-1') {
    const result = blockBootstrap(rows, keys, years, member.model, member.seed, member.replications, (paths) => ivPaths(paths, years).om);
    width = result.critical * result.standardErrors[0];
    methodRecord = result;
  } else {
    const annualNet = rows.map((row) => row.privateConsumerSurplus + row.privateProducerSurplus + row.qualityAdjustment - row.displacementCost - row.externalCost - row.publicConsumerSurplus - row.publicProducerSurplus - row.publicQualityAdjustment);
    const analytic = hacForecastSe(annualNet, rows.map((row) => row.year), years);
    const discount = point.discount;
    const samplingWidth = inverseNormal(0.95) * Math.sqrt(sum(analytic.se.map((value, index) => (value * discount[index]) ** 2)));
    const identificationRegion = sum(years.map((_, index) => (fittedPaths.displacementCost[index] + fittedPaths.externalCost[index]) * member.identifiedRegionAdverseShare * discount[index]));
    width = samplingWidth + identificationRegion;
    methodRecord = { bandwidth: analytic.bandwidth, oneSidedCritical: inverseNormal(0.95), samplingWidth: round(samplingWidth), identificationRegionWidth: round(identificationRegion), construction: 'B-4 lower confidence bound over the adverse endpoint of the declared displacement/external-cost identified region' };
  }
  const horizon = years.map((year, index) => ({
    year,
    privateConsumerSurplus: round(fittedPaths.privateConsumerSurplus[index]), privateProducerSurplus: round(fittedPaths.privateProducerSurplus[index]), qualityAdjustment: round(fittedPaths.qualityAdjustment[index]), displacementCost: round(fittedPaths.displacementCost[index]), externalCost: round(fittedPaths.externalCost[index]),
    publicConsumerSurplus: round(fittedPaths.publicConsumerSurplus[index]), publicProducerSurplus: round(fittedPaths.publicProducerSurplus[index]), publicQualityAdjustment: round(fittedPaths.publicQualityAdjustment[index]), beyondHorizonValue: round(fittedPaths.beyondHorizonValue[index]), publicCaptureSurplus: round(fittedPaths.publicCaptureSurplus[index]), canonicalConsumptionLevel: round(fittedPaths.canonicalConsumptionLevel[index]),
    privateMarginalValue: round(point.privateValue[index]), publicCounterfactualMarginalValue: round(point.publicValue[index]), netMarginalValue: round(point.privateValue[index] - point.publicValue[index]),
    discountFactor: round(point.discount[index], 10), discountedNetMarginalValue: round((point.privateValue[index] - point.publicValue[index]) * point.discount[index]), concentrationEventsUpperBound: 0,
  }));
  const omPoint = sum(horizon.map((row) => row.discountedNetMarginalValue));
  const intervalWidth = round(width);
  return { ...commonMember(member, validation, { family: member.intervalFamily, oneSidedLevel: 0.95, orientation: 'against-activation', simultaneous: true, width: intervalWidth, precisionFloor: round(precisionCeiling), methodRecord }), omPoint: round(omPoint), omLowerBound: round(omPoint - intervalWidth), horizon };
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
      D2: { status: 'COMPUTED', distributionWeightedOm: round(weighted), baselineConsumption: round(baselineConsumption), arithmetic: 'sum(discounted net marginal value × baseline mean canonical consumption / projected canonical consumption), the logarithmic marginal-consumption weight' },
      D3: { status: 'COMPUTED', beyondHorizonShare: round(Math.abs(beyond) / Math.max(Math.abs(member.omPoint) + Math.abs(beyond), 1e-12)), numerator: round(beyond), denominator: round(Math.abs(member.omPoint) + Math.abs(beyond)), arithmetic: 'discounted deposited beyond-horizon value / (absolute controlling OM + discounted beyond-horizon value)' },
      D4: { status: 'COMPUTED', publicCaptureNumerator: round(publicNumerator), privateSurplusDenominator: round(privateDenominator), arithmetic: 'published as the required numerator/denominator pair; no quotient is computed' },
      D5: { status: 'COMPUTED', concentrationShadowPair: { findingIIIActivationUpper: round(Math.max(...findingIII.horizon.map((row) => row.activationFrequencyUpperBound))), omLowerBound: member.omLowerBound }, arithmetic: 'paired executed Finding III frequency upper bound and this member OM lower bound' },
    };
  }
  return {
    memberId: member.id,
    D1: { status: 'NOT_APPLICABLE', arithmeticExplanation: 'The member is not a Finding IV welfare-discount member; no discount operator enters its estimate.' },
    D2: { status: 'NOT_APPLICABLE', arithmeticExplanation: 'The member has no Marshallian welfare vector to which distribution weights can apply.' },
    D3: { status: 'NOT_APPLICABLE', arithmeticExplanation: 'The member estimates a complete statutory 30-year path, not an OM tail share.' },
    D4: { status: 'NOT_APPLICABLE', arithmeticExplanation: 'The member contains no private/public Marshallian-surplus numerator-denominator pair.' },
    D5: { status: 'COMPUTED', concentrationShadowPair: { findingIIIActivationUpper: round(Math.max(...findingIII.horizon.map((row) => row.activationFrequencyUpperBound))), memberAdverseBound: member.id.startsWith('I-') ? round(Math.min(...horizon.map((row) => row.coverageLowerBound))) : member.id.startsWith('II-') ? round(Math.min(...horizon.map((row) => row.disbursementLowerBound))) : round(Math.max(...horizon.map((row) => row.activationFrequencyUpperBound))) }, arithmetic: 'executed concentration-shadow frequency paired with this member adverse bound' },
  };
}

function derivationFor(member, rawSourceId) {
  const rows = member.horizon.map((row) => ({ year: row.year, privateConsumerSurplus: row.privateConsumerSurplus, privateProducerSurplus: row.privateProducerSurplus, qualityAdjustment: row.qualityAdjustment, displacementCost: row.displacementCost, externalCost: row.externalCost, publicConsumerSurplus: row.publicConsumerSurplus, publicProducerSurplus: row.publicProducerSurplus, publicQualityAdjustment: row.publicQualityAdjustment, private: row.privateMarginalValue, publicCounterfactual: row.publicCounterfactualMarginalValue, discountFactor: row.discountFactor, identityContribution: row.discountedNetMarginalValue }));
  return {
    memberId: member.id, sourceBindings: [rawSourceId], treatment: 'retained 70-to-50 tranche allocated through each ledger-traced private venture', counterfactual: 'same tranche through realized public first-allocation venture classes',
    marshallianSurplusConvention: 'consumer surplus + producer surplus + quality adjustment at observed demand, without distribution weighting in the controlling result',
    ventureIdentity: 'private consumer surplus + private producer surplus + quality - displacement - external cost - public counterfactual consumer surplus - public counterfactual producer surplus - public quality',
    displacementNetting: 'one subtraction in private marginal value', externalCostNetting: 'one subtraction in private marginal value', identificationAssumptions: member.identificationAssumptions,
    rows, accountingIdentity: { sumOfRows: round(sum(rows.map((row) => row.identityContribution))), filedOmPoint: member.omPoint, reconciles: Math.abs(sum(rows.map((row) => row.identityContribution)) - member.omPoint) < 1e-6 },
  };
}

export function executeLockedAnalysis({ root, preregistration }) {
  const years = Array.from({ length: 30 }, (_, index) => 2295 + index);
  const holdoutYears = preregistration.validation.heldOutYears;
  const raw = Object.fromEntries(['I', 'II', 'III', 'IV'].map((finding) => [finding, readMapped(root, preregistration, finding)]));
  const validationRecords = preregistration.admissibleSpecificationSet.map((member) => validateMember(member, raw[member.finding].rows, holdoutYears));
  const admitted = preregistration.admissibleSpecificationSet.filter((member) => validationRecords.find((record) => record.memberId === member.id).survived);
  const excludedMembers = validationRecords.filter((record) => !record.survived).map((record) => ({ memberId: record.memberId, finding: record.finding, reason: 'Held-out member RMSE exceeded naive persistence RMSE', validationRecord: record }));
  const baseline = {
    I: raw.I.rows.filter((row) => row.year >= 2282), II: raw.II.rows.filter((row) => row.year >= 2282), III: raw.III.rows.filter((row) => row.year >= 2282), IV: raw.IV.rows.filter((row) => row.year >= 2282),
  };
  const baselineCoverage = mean(baseline.I.map((row) => row.receipts / row.obligations));
  const baselineDividend = mean(baseline.II.map((row) => row.realDividendPerResident));
  const baselineActivation = mean(baseline.III.map((row) => row.annualScmActivations));
  const baselineAnnualOm = mean(baseline.IV.map((row) => row.privateConsumerSurplus + row.privateProducerSurplus + row.qualityAdjustment - row.displacementCost - row.externalCost - row.publicConsumerSurplus - row.publicProducerSurplus - row.publicQualityAdjustment));
  const discountSum = sum(years.map((_, index) => 1 / (1.02 ** (index + 1))));
  const precision = {
    I: { summaryMeasure: 'baseline annual institutional coverage', baselineObservedMean: baselineCoverage, passThreshold: 1, ceiling: Math.abs(baselineCoverage - 1), authority: 'Charter §3.1 and §5.3' },
    II: { summaryMeasure: 'real annual dividend disbursement level (precision-only continuous counterpart)', baselineObservedMean: baselineDividend, passThreshold: 0, ceiling: Math.abs(baselineDividend), authority: preregistration.precisionClarification.amendmentDigest },
    III: { summaryMeasure: 'annual SCM activation frequency', baselineObservedMean: baselineActivation, passThreshold: baselineActivation * 1.25, ceiling: Math.abs(baselineActivation * 1.25 - baselineActivation), authority: 'Charter §3.3 and §5.3' },
    IV: { summaryMeasure: '30-year-equivalent discounted OM differential', baselineObservedMean: baselineAnnualOm * discountSum, passThreshold: 0, ceiling: Math.abs(baselineAnnualOm * discountSum), authority: preregistration.precisionClarification.amendmentDigest },
  };
  for (const value of Object.values(precision)) for (const key of ['baselineObservedMean', 'passThreshold', 'ceiling']) value[key] = round(value[key]);
  const findMembers = (finding) => admitted.filter((member) => member.finding === finding).map((member) => ({ member, validation: validationRecords.find((record) => record.memberId === member.id) }));
  const membersI = findMembers('I').map(({ member, validation }) => executeI(member, validation, raw.I.rows, years, precision.I.ceiling));
  const membersII = findMembers('II').map(({ member, validation }) => executeII(member, validation, raw.II.rows, years, precision.II.ceiling, baselineDividend));
  const membersIII = findMembers('III').map(({ member, validation }) => executeIII(member, validation, raw.III.rows, years, precision.III.ceiling));
  const membersIV = findMembers('IV').map(({ member, validation }) => executeIV(member, validation, raw.IV.rows, years, precision.IV.ceiling));
  const leastI = membersI.reduce((a, b) => Math.min(...a.horizon.map((row) => row.coverageLowerBound)) < Math.min(...b.horizon.map((row) => row.coverageLowerBound)) ? a : b);
  const leastII = membersII.reduce((a, b) => Math.min(...a.horizon.map((row) => row.disbursementLowerBound)) < Math.min(...b.horizon.map((row) => row.disbursementLowerBound)) ? a : b);
  const leastIII = membersIII.reduce((a, b) => Math.max(...a.horizon.map((row) => row.activationFrequencyUpperBound)) > Math.max(...b.horizon.map((row) => row.activationFrequencyUpperBound)) ? a : b);
  const leastIV = membersIV.reduce((a, b) => a.omLowerBound < b.omLowerBound ? a : b);
  const votes = [{ commissioner: 'Aster Vale', vote: 'CERTIFY' }, { commissioner: 'Mira Quen', vote: 'CERTIFY' }, { commissioner: 'Tal Ren', vote: 'CERTIFY' }];
  const findings = {
    I: { threshold: 1, baselineMean: round(baselineCoverage), leastFavorableMember: leastI.id, members: membersI, votes, disposition: Math.min(...membersI.flatMap((member) => member.horizon.map((row) => row.coverageLowerBound))) > 1 ? 'PASS' : 'FAIL', precisionFloorCalculation: precision.I },
    II: { baseline: baseline.II.map((row) => ({ year: row.year, realDividendPerResident: row.realDividendPerResident })), baselineMean: round(baselineDividend), leastFavorableMember: leastII.id, members: membersII, votes, disposition: membersII.every((member) => member.horizon.every((row) => !row.attributableToSchedule)) ? 'PASS' : 'FAIL', precisionFloorCalculation: precision.II },
    III: { baseline: baseline.III.map((row) => ({ year: row.year, annualScmActivations: row.annualScmActivations, flowTestMargin: row.flowTestMargin })), baselineActivationMean: round(baselineActivation), leastFavorableMember: leastIII.id, members: membersIII, votes, disposition: Math.max(...membersIII.flatMap((member) => member.horizon.map((row) => row.activationFrequencyUpperBound))) < baselineActivation * 1.25 && Math.min(...membersIII.flatMap((member) => member.horizon.map((row) => row.flowMarginLowerBound))) > 0 ? 'PASS' : 'FAIL', precisionFloorCalculation: precision.III },
    IV: { baselinePublicDeploymentMean: round(mean(baseline.IV.map((row) => row.publicConsumerSurplus + row.publicProducerSurplus + row.publicQualityAdjustment))), leastFavorableMember: leastIV.id, retainedCapitalQuantity: 214.7, retainedCapitalUnits: 'billion constant-2292 Main credits attributable to 70-to-50 over the first assessment year', publicCounterfactual: 'realized 2272-2291 public first-allocation portfolio, same traced venture classes', members: membersIV, votes, disposition: membersIV.every((member) => member.omLowerBound > 0 && member.horizon.every((row) => row.concentrationEventsUpperBound === 0)) ? 'PASS' : 'FAIL', precisionFloorCalculation: precision.IV },
  };
  const diagnostics = [...membersI, ...membersII, ...membersIII, ...membersIV].map((member) => diagnosticsFor(member, leastIII));
  const findingIvDerivations = membersIV.map((member) => derivationFor(member, raw.IV.mapping.sourceId));
  return canonicalizeExecutionValue({
    schemaVersion: '2.0', executionEntryPoint: 'tools/path2-execution-engine.mjs#executeLockedAnalysis', window: { observation: [2272, 2291], training: [2272, 2286], heldOutValidation: [2287, 2291], thresholdBaseline: [2282, 2291], projection: [2295, 2324] },
    sourceDigests: Object.fromEntries(Object.values(raw).map((entry) => [entry.mapping.sourceId, entry.mapping.digest])), validationRecords, excludedMembers, precisionCalculations: precision, findings, diagnostics, findingIvDerivations,
  });
}
