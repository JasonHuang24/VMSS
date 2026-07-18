import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { executeLockedAnalysis } from './path2-execution-engine.mjs';

const EPSILON = 1e-5;
const executionCache = new Map();
const REQUIRED_COMPENDIUM = [
  'raw-data', 'preregistration', 'preregistration-lock-certificate', 'public-chambers-lock-record',
  'analytic-data', 'executed-calculation-output', 'calculation-code', 'environment-manifest',
  'source-provenance', 'transformation-rules', 'seeds', 'execution-logs',
  'section-4-3-validation-records', 'union-estimates-and-intervals',
  'finding-iv-member-derivations', 'mandatory-d1-d5-diagnostics', 'precision-measurement-amendment', 'cold-review-record',
  'commission-votes-dissents-declarations', 'registrar-certifications',
  'lower-incidence-certificate', 'lower-incidence-adoption',
];

export const pct = (value) => Number.isFinite(value) ? `${(value * 100).toFixed(2)}%` : 'not computable';
export const sum = (rows, key) => rows.reduce((total, row) => total + Number(row[key]), 0);
export const sha256File = (path) => createHash('sha256').update(readFileSync(path)).digest('hex');
export const payloadDigest = (value) => {
  const payload = structuredClone(value);
  delete payload.artifactDigest;
  return createHash('sha256').update(JSON.stringify(payload)).digest('hex');
};
const jsonByteDigest = (value) => createHash('sha256').update(`${JSON.stringify(value, null, 2)}\n`).digest('hex');

export function prohibitedCreditsExcluded(record, requiredKeys) {
  return Array.isArray(requiredKeys) && requiredKeys.length > 0
    && requiredKeys.every((key) => record?.[key] === false);
}

export function validateSourceRegistry(registry, root) {
  const errors = [];
  if (!Array.isArray(registry) || registry.length === 0) return ['source registry is empty'];
  const ids = new Set();
  const paths = new Set();
  for (const [index, source] of registry.entries()) {
    const prefix = `source registry row ${index + 1}`;
    if (typeof source?.id !== 'string' || !source.id.trim()) errors.push(`${prefix}: empty source id`);
    if (typeof source?.path !== 'string' || !source.path.trim()) errors.push(`${prefix}: empty source path`);
    if (source?.id && ids.has(source.id)) errors.push(`${prefix}: duplicate source id ${source.id}`);
    if (source?.path && paths.has(source.path)) errors.push(`${prefix}: duplicate source path ${source.path}`);
    if (source?.id) ids.add(source.id);
    if (source?.path) paths.add(source.path);
    const path = source?.path ? join(root, source.path) : null;
    if (!path || !existsSync(path)) {
      errors.push(`${prefix}: unresolved source artifact`);
    } else if (!/^[a-f0-9]{64}$/.test(String(source?.digest)) || sha256File(path) !== source.digest) {
      errors.push(`${prefix}: SHA-256 digest mismatch`);
    }
  }
  return errors;
}

export function hasVerifiedProvenance(provenance, root) {
  return provenance?.status === 'VERIFIED'
    && provenance?.authoredOrRulingDerivedMagnitudesUsed === false
    && provenance?.rawSourceDataPublished === true
    && provenance?.normalizationRulesPublished === true
    && provenance?.numeratorDenominatorIndependenceDemonstrated === true
    && validateSourceRegistry(provenance?.sourceRegistry, root).length === 0;
}

export function validateCompendium(compendium, provenance, root) {
  const errors = [];
  const inventory = compendium?.inventory;
  if (!Array.isArray(inventory)) return ['compendium inventory absent'];
  const ids = new Set();
  const paths = new Set();
  for (const item of inventory) {
    if (!item?.id || ids.has(item.id)) errors.push(`compendium duplicate or missing id ${item?.id || '(empty)'}`);
    if (!item?.path || paths.has(item.path)) errors.push(`compendium duplicate or missing path ${item?.path || '(empty)'}`);
    if (item?.id) ids.add(item.id);
    if (item?.path) paths.add(item.path);
    const path = item?.path ? join(root, item.path) : null;
    if (item?.required !== true || item?.complete !== true) errors.push(`compendium ${item?.id || '(empty)'} not complete`);
    if (!path || !existsSync(path)) errors.push(`compendium ${item?.id || '(empty)'} unresolved artifact`);
    else if (!/^[a-f0-9]{64}$/.test(String(item?.digest)) || sha256File(path) !== item.digest) errors.push(`compendium ${item.id} digest mismatch`);
  }
  for (const id of REQUIRED_COMPENDIUM) if (!ids.has(id)) errors.push(`compendium missing required item ${id}`);

  const manifestPath = compendium?.digestManifestPath ? join(root, compendium.digestManifestPath) : null;
  if (!manifestPath || !existsSync(manifestPath)) return [...errors, 'digest manifest absent'];
  let manifest;
  try { manifest = JSON.parse(readFileSync(manifestPath, 'utf8')); } catch { return [...errors, 'digest manifest malformed']; }
  if (manifest?.algorithm !== 'SHA-256' || !Array.isArray(manifest?.entries) || manifest.entries.length === 0) errors.push('digest manifest incomplete');
  const manifestIds = new Set();
  const manifestPaths = new Set();
  for (const entry of manifest?.entries || []) {
    if (!entry?.id || manifestIds.has(entry.id)) errors.push(`digest manifest duplicate or missing id ${entry?.id || '(empty)'}`);
    if (!entry?.path || manifestPaths.has(entry.path)) errors.push(`digest manifest duplicate or missing path ${entry?.path || '(empty)'}`);
    if (entry?.id) manifestIds.add(entry.id);
    if (entry?.path) manifestPaths.add(entry.path);
    const path = entry?.path ? join(root, entry.path) : null;
    if (!path || !existsSync(path)) errors.push(`digest manifest unresolved artifact ${entry?.path || '(empty)'}`);
    else if (!/^[a-f0-9]{64}$/.test(String(entry?.digest)) || sha256File(path) !== entry.digest) errors.push(`digest manifest mismatch ${entry.path}`);
  }
  for (const item of inventory) {
    if (!manifest?.entries?.some((entry) => entry.path === item.path && entry.digest === item.digest)) errors.push(`digest manifest omits compendium ${item.id}`);
  }
  for (const source of provenance?.sourceRegistry || []) {
    if (!manifest?.entries?.some((entry) => entry.path === source.path && entry.digest === source.digest)) errors.push(`digest manifest omits source ${source.id}`);
  }
  return errors;
}

export function monthIndex(month) {
  const match = /^(\d{4})-(0[1-9]|1[0-2])$/.exec(String(month));
  return match ? Number(match[1]) * 12 + Number(match[2]) - 1 : null;
}

export function validateMonthlyRows(rows, options = {}) {
  const { label = 'series', expectedCount, cutoffMonth, placement, knownSources = [], requireSection43 = true } = options;
  const errors = [];
  if (!Array.isArray(rows)) return [`${label}: rows must be an array`];
  if (Number.isInteger(expectedCount) && rows.length !== expectedCount) errors.push(`${label}: expected ${expectedCount} months, received ${rows.length}`);
  const known = new Set(knownSources.map((source) => typeof source === 'string' ? source : source?.id).filter(Boolean));
  const indexes = [];
  const seen = new Set();
  const ratios = [];
  for (const [index, row] of rows.entries()) {
    const prefix = `${label} row ${index + 1}`;
    const mi = monthIndex(row?.month);
    if (mi === null) errors.push(`${prefix}: invalid month format`);
    if (mi !== null && seen.has(mi)) errors.push(`${prefix}: duplicate month ${row.month}`);
    if (mi !== null) { seen.add(mi); indexes.push(mi); }
    if (!requireSection43) continue;
    for (const field of ['sourceNumerator', 'sourceDenominator', 'rawUnits', 'normalizationRule', 'inclusionRule', 'adjustment', 'independenceMethod']) {
      if (typeof row?.[field] !== 'string' || !row[field].trim()) errors.push(`${prefix}: missing ${field}`);
    }
    if (row?.sourceNumerator && !known.has(row.sourceNumerator)) errors.push(`${prefix}: unrecognized numerator source ${row.sourceNumerator}`);
    if (row?.sourceDenominator && !known.has(row.sourceDenominator)) errors.push(`${prefix}: unrecognized denominator source ${row.sourceDenominator}`);
    if (row?.sourceNumerator && row.sourceNumerator === row.sourceDenominator) errors.push(`${prefix}: numerator and denominator share one source identifier`);
    if (row?.numeratorDerivedFromDenominator !== false) errors.push(`${prefix}: numerator/denominator independence not established`);
    const values = ['rawNumerator', 'rawDenominator', 'numeratorScale', 'denominatorScale', 'normalizedNumerator', 'normalizedDenominator', 'weight'].map((field) => Number(row?.[field]));
    if (!values.every(Number.isFinite) || values[1] <= 0 || values[2] <= 0 || values[3] <= 0 || values[5] <= 0 || values[6] <= 0) {
      errors.push(`${prefix}: invalid raw, normalization, or weight quantity`);
    } else {
      if (Math.abs(values[0] * values[2] - values[4]) > EPSILON || Math.abs(values[1] * values[3] - values[5]) > EPSILON) errors.push(`${prefix}: raw-to-normalized recomputation mismatch`);
      ratios.push(values[0] / values[1]);
    }
  }
  for (let index = 1; index < indexes.length; index += 1) {
    if (indexes[index] <= indexes[index - 1]) errors.push(`${label}: months are not strictly chronological`);
    if (indexes[index] !== indexes[index - 1] + 1) errors.push(`${label}: months are not consecutive`);
  }
  const cutoff = monthIndex(cutoffMonth);
  if (cutoffMonth && cutoff === null) errors.push(`${label}: invalid cutoff month`);
  if (cutoff !== null && indexes.length) {
    if (placement === 'trailing' && indexes.at(-1) !== cutoff) errors.push(`${label}: trailing window does not end at cutoff`);
    if (placement === 'forward' && indexes[0] !== cutoff + 1) errors.push(`${label}: forward window does not begin after cutoff`);
  }
  if (requireSection43 && ratios.length > 2 && ratios.every((ratio) => Math.abs(ratio - ratios[0]) < EPSILON)) errors.push(`${label}: numerator is a constant multiple of denominator`);
  return errors;
}

function parseCsvLedger(path) {
  const lines = readFileSync(path, 'utf8').trim().split(/\r?\n/).slice(1);
  return new Map(lines.map((line) => { const [date, value] = line.split(','); return [date, Number(value)]; }));
}

export function validateMonthlySourceValues(rows, registry, root, label = 'series') {
  const errors = [];
  const sources = new Map((registry || []).map((source) => [source.id, source]));
  const ledgers = new Map();
  const ledger = (id) => {
    if (!ledgers.has(id)) {
      const source = sources.get(id);
      ledgers.set(id, source && existsSync(join(root, source.path)) && source.path.endsWith('.csv') ? parseCsvLedger(join(root, source.path)) : null);
    }
    return ledgers.get(id);
  };
  for (const [index, row] of (rows || []).entries()) {
    const numerator = ledger(row.sourceNumerator);
    const denominator = ledger(row.sourceDenominator);
    if (!numerator || !denominator) errors.push(`${label} row ${index + 1}: unresolved raw ledger`);
    else {
      if (Math.abs(Number(numerator.get(row.month)) - Number(row.rawNumerator)) > EPSILON) errors.push(`${label} row ${index + 1}: numerator differs from raw source`);
      if (Math.abs(Number(denominator.get(row.month)) - Number(row.rawDenominator)) > EPSILON) errors.push(`${label} row ${index + 1}: denominator differs from raw source`);
    }
  }
  return errors;
}

export function validateTraceMap(layer, rows = []) {
  const errors = [];
  const label = layer?.layer || 'unknown layer';
  const routes = layer?.routeMap?.destinations;
  const destinations = layer?.obligationMap?.destinations;
  if (typeof layer?.routeMap?.auditId !== 'string' || !layer.routeMap.auditId.trim()) errors.push(`${label}: missing route-map audit id`);
  if (!Array.isArray(routes) || routes.length === 0) return [...errors, `${label}: route map is empty`];
  if (typeof layer?.obligationMap?.auditId !== 'string' || !layer.obligationMap.auditId.trim()) errors.push(`${label}: missing obligation-map audit id`);
  if (!Array.isArray(destinations) || destinations.length === 0) return [...errors, `${label}: obligation map is empty`];
  const routeMap = new Map();
  let routeShare = 0;
  for (const route of routes) {
    if (!route?.id || routeMap.has(route.id) || !route?.legalFund || !Number.isFinite(Number(route?.share))) errors.push(`${label}: invalid or duplicate route`);
    else routeMap.set(route.id, route);
    routeShare += Number(route?.share);
  }
  if (Math.abs(routeShare - 1) > EPSILON) errors.push(`${label}: route shares do not reconcile`);
  const mappedRoutes = new Set();
  const obligationIds = new Set();
  for (const destination of destinations) {
    if (!routeMap.has(destination?.routeId) || mappedRoutes.has(destination?.routeId)) errors.push(`${label}: destination route mismatch`);
    mappedRoutes.add(destination?.routeId);
    const orders = [];
    let destinationShare = 0;
    if (!Array.isArray(destination?.obligations) || destination.obligations.length === 0) errors.push(`${label}: route has no explicit obligation disposition`);
    for (const obligation of destination?.obligations || []) {
      if (!obligation?.id || obligationIds.has(obligation.id) || !obligation?.legalDescription || !Number.isFinite(Number(obligation?.share))) errors.push(`${label}: invalid or duplicate obligation`);
      if (!Number.isInteger(obligation?.paymentOrder) || obligation.paymentOrder < 1 || orders.includes(obligation.paymentOrder)) errors.push(`${label}: invalid payment order`);
      if (!Array.isArray(obligation?.nonTaxSources) || obligation.nonTaxSources.length === 0) errors.push(`${label}: missing non-tax source attribution`);
      obligationIds.add(obligation?.id);
      orders.push(obligation?.paymentOrder);
      destinationShare += Number(obligation?.share);
    }
    if (orders.length && [...orders].sort((a, b) => a - b).some((order, index) => order !== index + 1)) errors.push(`${label}: payment order is incomplete`);
    if (routeMap.has(destination?.routeId) && Math.abs(destinationShare - Number(routeMap.get(destination.routeId).share)) > EPSILON) errors.push(`${label}: obligation shares do not match destination route ${destination.routeId}`);
  }
  if (mappedRoutes.size !== routeMap.size) errors.push(`${label}: trace map is incomplete`);
  for (const [index, row] of rows.entries()) {
    const li = Number(row?.normalizedNumerator ?? row?.li);
    const oi = Number(row?.normalizedDenominator ?? row?.oi);
    if (!Number.isFinite(li) || !Number.isFinite(oi)) { errors.push(`${label}: trace row ${index + 1} is nonnumeric`); continue; }
    if (!Array.isArray(row?.destinationAllocations) || row.destinationAllocations.length !== routes.length) { errors.push(`${label}: destination allocations missing at row ${index + 1}`); continue; }
    for (const allocation of row.destinationAllocations) {
      const route = routeMap.get(allocation.routeId);
      const destination = destinations.find((item) => item.routeId === allocation.routeId);
      const obligationShare = (destination?.obligations || []).reduce((total, obligation) => total + Number(obligation.share), 0);
      if (!route || Math.abs(Number(allocation.li) - li * Number(route.share)) > EPSILON || Math.abs(Number(allocation.oi) - oi * obligationShare) > EPSILON) errors.push(`${label}: destination-specific reconciliation fails at row ${index + 1} route ${allocation.routeId}`);
    }
    const allocatedLi = row.destinationAllocations.reduce((total, item) => total + Number(item.li), 0);
    const allocatedOi = row.destinationAllocations.reduce((total, item) => total + Number(item.oi), 0);
    if (Math.abs(allocatedLi - li) > EPSILON || Math.abs(allocatedOi - oi) > EPSILON) errors.push(`${label}: monthly destination totals do not reconcile at row ${index + 1}`);
  }
  return errors;
}

function requiredFinite(value, label, errors) {
  if (!Number.isFinite(Number(value))) errors.push(label);
}

function validateHorizonMembers(finding, kind, knownSourceIds = []) {
  const errors = [];
  const members = finding?.members;
  if (!Array.isArray(members) || members.length === 0) return { errors: [`Finding ${kind}: no admissible members`], members: [] };
  const panels = new Set();
  const classes = new Set();
  const signatures = new Set();
  const known = new Set(knownSourceIds);
  for (const member of members) {
    if (!member?.id || !member?.equivalenceClass || !member?.sourceId || !member?.functionalClass || !Array.isArray(member?.identificationAssumptions)) errors.push(`Finding ${kind}: incomplete member trace`);
    if (!['certification', 'refusal'].includes(member?.panel)) errors.push(`Finding ${kind}: invalid panel identity`); else panels.add(member.panel);
    if (classes.has(member?.equivalenceClass)) errors.push(`Finding ${kind}: duplicate equivalence class`); else classes.add(member?.equivalenceClass);
    const signature = `${member?.functionalClass}|${JSON.stringify(member?.identificationRules || [])}`;
    if (signatures.has(signature)) errors.push(`Finding ${kind}: equivalence-class padding`); else signatures.add(signature);
    if (known.size && !known.has(member?.sourceId)) errors.push(`Finding ${kind}: unrecognized member source`);
    const interval = member?.interval || {};
    if (interval.oneSidedLevel !== 0.95 || interval.orientation !== 'against-activation' || (kind === 'IV' ? interval.simultaneous !== false : interval.simultaneous !== true)) errors.push(`Finding ${kind}: invalid uncertainty interval`);
    requiredFinite(interval.width, `Finding ${kind}: nonfinite interval width`, errors);
    requiredFinite(interval.precisionFloor, `Finding ${kind}: nonfinite precision floor`, errors);
    if (Number(interval.width) <= 0 || Number(interval.precisionFloor) <= 0 || !Array.isArray(interval.precisionChecks) || !interval.precisionChecks.length || interval.precisionChecks.some((check) => !Number.isFinite(Number(check.width)) || !Number.isFinite(Number(check.ceiling)) || check.width <= 0 || check.ceiling <= 0 || check.passed !== (Number(check.width) <= Number(check.ceiling) + EPSILON)) || interval.precisionSatisfied !== interval.precisionChecks.every((check) => check.passed)) errors.push(`Finding ${kind}: interval exceeds or misstates an outcome-specific precision floor`);
    if (!Array.isArray(member?.identificationRules) || !member?.identificationExecution?.everyDeclaredAssumptionConsumed || member.identificationExecution.consumedAssumptions?.length !== member.identificationAssumptions.length) errors.push(`Finding ${kind}: identification assumption is not consumed`);
    requiredFinite(member?.validationError, `Finding ${kind}: nonfinite validation error`, errors);
    requiredFinite(member?.persistenceError, `Finding ${kind}: nonfinite persistence error`, errors);
    if (Number(member?.validationError) > Number(member?.persistenceError)) errors.push(`Finding ${kind}: §4.3 validation floor not met`);
    if (!Array.isArray(member?.horizon) || member.horizon.length !== 30) errors.push(`Finding ${kind}: horizon must contain 30 years`);
    const years = (member?.horizon || []).map((row) => Number(row.year));
    if (years[0] !== 2295 || years.some((year) => !Number.isInteger(year)) || years.some((year, index) => index > 0 && year !== years[index - 1] + 1)) errors.push(`Finding ${kind}: horizon years are not 30 consecutive activation years`);
  }
  if (!panels.has('certification') || !panels.has('refusal')) errors.push(`Finding ${kind}: missing certification or refusal panel member`);
  return { errors, members };
}

export function evaluatePath2Findings(path2Findings, knownSourceIds = []) {
  const results = {};
  for (const id of ['I', 'II', 'III', 'IV']) {
    const finding = path2Findings?.[id];
    const checked = validateHorizonMembers(finding, id, knownSourceIds);
    const errors = [...checked.errors];
    if (checked.errors.length === 0 && (!Array.isArray(finding?.votes) || finding.votes.length !== 3)) errors.push(`Finding ${id}: invalid Commission vote record`);
    let controllingMember = null;
    let pass = false;
    let detail = errors.join('; ');
    if (errors.length === 0 && id === 'I') {
      for (const member of checked.members) for (const row of member.horizon) {
        requiredFinite(row?.treatmentReceipts50Point, 'Finding I: nonfinite 50-schedule receipts', errors);
        requiredFinite(row?.counterfactualReceipts70Point, 'Finding I: nonfinite 70-schedule receipts', errors);
        requiredFinite(row?.scheduleReceiptsContrastPoint, 'Finding I: nonfinite receipts contrast', errors);
        requiredFinite(row?.obligationsPoint, 'Finding I: nonfinite obligations', errors);
        requiredFinite(row?.treatmentCoveragePoint, 'Finding I: nonfinite coverage point', errors);
        requiredFinite(row?.treatmentCoverageLowerBound, 'Finding I: nonfinite coverage bound', errors);
        const ratio = Number(row.treatmentReceipts50Point) / Number(row.obligationsPoint);
        if (!(Number(row.treatmentReceipts50Point) > 0 && Number(row.counterfactualReceipts70Point) > 0 && Number(row.obligationsPoint) > 0) || Math.abs(Number(row.treatmentCoveragePoint) - ratio) > 0.000002 || Math.abs(Number(row.scheduleReceiptsContrastPoint) - (Number(row.treatmentReceipts50Point) - Number(row.counterfactualReceipts70Point))) > 0.000002) errors.push('Finding I: treatment, counterfactual, or coverage does not reconcile');
        if (Number(row.treatmentCoverageLowerBound) > Number(row.treatmentCoveragePoint) || Number(row.treatmentCoveragePoint) - Number(row.treatmentCoverageLowerBound) > Number(member.interval.width) + EPSILON) errors.push('Finding I: adverse coverage interval does not reconcile');
      }
      controllingMember = checked.members.reduce((worst, member) => Math.min(...member.horizon.map((row) => Number(row.treatmentCoverageLowerBound))) < Math.min(...worst.horizon.map((row) => Number(row.treatmentCoverageLowerBound))) ? member : worst);
      const bound = Math.min(...controllingMember.horizon.map((row) => Number(row.treatmentCoverageLowerBound)));
      pass = errors.length === 0 && checked.members.every((member) => member.interval.precisionSatisfied) && bound > Number(finding.threshold);
      detail = `least-favorable worst-year coverage ${pct(bound)} (${controllingMember.id})`;
    } else if (errors.length === 0 && id === 'II') {
      requiredFinite(finding?.baselineMean, 'Finding II: missing or nonfinite baseline mean', errors);
      if (!Array.isArray(finding?.baseline) || finding.baseline.length !== 10) errors.push('Finding II: ten-year baseline missing');
      else {
        const baselineValues = finding.baseline.map((row) => Number(row.realDividendPerResident));
        if (baselineValues.some((value) => !Number.isFinite(value)) || Math.abs(Number(finding.baselineMean) - baselineValues.reduce((total, value) => total + value, 0) / baselineValues.length) > 0.00000002) errors.push('Finding II: baseline mean does not reconcile');
      }
      for (const member of checked.members) for (const row of member.horizon) {
        for (const [field, label] of [['treatmentDividend50Point', '50-schedule dividend'], ['counterfactualDividend70Point', '70-schedule dividend'], ['rawScheduleEffectPoint', 'raw schedule effect'], ['attributedScheduleEffectPoint', 'attributed schedule effect'], ['attributedScheduleEffectLowerBound', 'attributed effect bound'], ['attributedTreatmentDividendPoint', 'attributed treatment dividend'], ['attributedTreatmentDividendLowerBound', 'attributed dividend bound']]) requiredFinite(row?.[field], `Finding II: missing or nonfinite ${label}`, errors);
        if (typeof row?.attributableToSchedule !== 'boolean' || typeof row?.attributionDisposition !== 'string' || !row.attributionDisposition.trim()) errors.push('Finding II: missing attribution disposition');
        if (Number(row.attributedTreatmentDividendLowerBound) > Number(row.attributedTreatmentDividendPoint) || Number(row.attributedTreatmentDividendPoint) - Number(row.attributedTreatmentDividendLowerBound) > Number(member.interval.width) + EPSILON || Math.abs(Number(row.rawScheduleEffectPoint) - (Number(row.treatmentDividend50Point) - Number(row.counterfactualDividend70Point))) > 0.000002) errors.push('Finding II: treatment/counterfactual contrast or adverse interval does not reconcile');
      }
      controllingMember = checked.members.reduce((worst, member) => Math.min(...member.horizon.map((row) => Number(row.attributedTreatmentDividendLowerBound))) < Math.min(...worst.horizon.map((row) => Number(row.attributedTreatmentDividendLowerBound))) ? member : worst);
      const impairment = Math.max(...checked.members.map((member) => member.horizon.filter((row) => Number(row.attributedTreatmentDividendLowerBound) < Number(finding.baselineMean) && Number(row.attributedScheduleEffectLowerBound) < 0 && row.attributableToSchedule === true).length));
      pass = errors.length === 0 && checked.members.every((member) => member.interval.precisionSatisfied) && impairment === 0;
      detail = `least-favorable impairment years ${impairment} (${controllingMember.id})`;
    } else if (errors.length === 0 && id === 'III') {
      requiredFinite(finding?.baselineActivationMean, 'Finding III: nonfinite baseline mean', errors);
      if (!Array.isArray(finding?.baseline) || finding.baseline.length !== 10) errors.push('Finding III: ten-year baseline missing');
      else {
        const baselineValues = finding.baseline.map((row) => Number(row.annualScmActivations));
        if (baselineValues.some((value) => !Number.isFinite(value)) || Math.abs(Number(finding.baselineActivationMean) - baselineValues.reduce((total, value) => total + value, 0) / baselineValues.length) > 0.00000002) errors.push('Finding III: baseline mean does not reconcile');
      }
      for (const member of checked.members) for (const row of member.horizon) {
        requiredFinite(row?.activationFrequencyPoint, 'Finding III: nonfinite activation point', errors);
        requiredFinite(row?.activationFrequencyUpperBound, 'Finding III: nonfinite activation bound', errors);
        requiredFinite(row?.flowMarginPoint, 'Finding III: nonfinite Flow point', errors);
        requiredFinite(row?.flowMarginLowerBound, 'Finding III: nonfinite Flow bound', errors);
        if (Number(row.activationFrequencyUpperBound) < Number(row.activationFrequencyPoint) || Number(row.activationFrequencyUpperBound) - Number(row.activationFrequencyPoint) > Number(member.interval.width) + EPSILON) errors.push('Finding III: activation-frequency interval does not reconcile');
        if (Number(row.flowMarginLowerBound) > Number(row.flowMarginPoint) || Number(row.flowMarginPoint) - Number(row.flowMarginLowerBound) > Number(member.interval.width) + EPSILON) errors.push('Finding III: Flow interval does not reconcile');
      }
      controllingMember = checked.members.reduce((worst, member) => Math.max(...member.horizon.map((row) => Number(row.activationFrequencyUpperBound))) > Math.max(...worst.horizon.map((row) => Number(row.activationFrequencyUpperBound))) ? member : worst);
      const activation = Math.max(...checked.members.flatMap((member) => member.horizon.map((row) => Number(row.activationFrequencyUpperBound))));
      const flow = Math.min(...checked.members.flatMap((member) => member.horizon.map((row) => Number(row.flowMarginLowerBound))));
      pass = errors.length === 0 && checked.members.every((member) => member.interval.precisionSatisfied) && activation < Number(finding.baselineActivationMean) * 1.25 && flow > 0;
      detail = `worst activation ${activation.toFixed(4)} against ${(Number(finding.baselineActivationMean) * 1.25).toFixed(4)}; Flow margin ${flow.toFixed(4)} (${controllingMember.id})`;
    } else if (errors.length === 0 && id === 'IV') {
      requiredFinite(finding?.retainedCapitalQuantity, 'Finding IV: nonfinite retained capital', errors);
      if (typeof finding?.publicCounterfactual !== 'string' || !finding.publicCounterfactual.trim()) errors.push('Finding IV: public counterfactual absent');
      for (const member of checked.members) {
        requiredFinite(member?.omPoint, 'Finding IV: nonfinite OM point', errors);
        requiredFinite(member?.omLowerBound, 'Finding IV: nonfinite OM bound', errors);
        for (const row of member.horizon) {
          requiredFinite(row?.privateMarginalValue, 'Finding IV: nonfinite private marginal value', errors);
          requiredFinite(row?.publicCounterfactualMarginalValue, 'Finding IV: nonfinite public marginal value', errors);
          requiredFinite(row?.discountFactor, 'Finding IV: nonfinite discount factor', errors);
          requiredFinite(row?.discountedNetMarginalValue, 'Finding IV: nonfinite discounted OM contribution', errors);
          requiredFinite(row?.concentrationEventsUpperBound, 'Finding IV: nonfinite concentration bound', errors);
          const expected = (Number(row.privateMarginalValue) - Number(row.publicCounterfactualMarginalValue)) * Number(row.discountFactor);
          if (Math.abs(Number(row.discountedNetMarginalValue) - expected) > 0.00000002) errors.push('Finding IV: discounted OM row does not reconcile');
        }
        const expectedOm = member.horizon.reduce((total, row) => total + Number(row.discountedNetMarginalValue), 0);
        if (Math.abs(Number(member.omPoint) - expectedOm) > 0.00000005 || Math.abs(Number(member.omLowerBound) - (Number(member.omPoint) - Number(member.interval.width))) > 0.00000005) errors.push('Finding IV: OM total or lower bound does not reconcile');
      }
      controllingMember = checked.members.reduce((worst, member) => Number(member.omLowerBound) < Number(worst.omLowerBound) ? member : worst);
      const om = Math.min(...checked.members.map((member) => Number(member.omLowerBound)));
      const events = Math.max(...checked.members.flatMap((member) => member.horizon.map((row) => Number(row.concentrationEventsUpperBound))));
      pass = errors.length === 0 && checked.members.every((member) => member.interval.precisionSatisfied) && om > 0 && events === 0;
      detail = `least-favorable OM ${om.toFixed(4)}; concentration events ${events} (${controllingMember.id})`;
    }
    if (controllingMember && finding?.leastFavorableMember !== controllingMember.id) errors.push(`Finding ${id}: declared least-favorable member is incorrect`);
    const precisionVoid = checked.members.some((member) => member?.interval?.precisionSatisfied === false);
    const expectedDisposition = precisionVoid ? 'VOID_INDECISION' : pass && errors.length === 0 ? 'PASS' : 'FAIL';
    const expectedVote = expectedDisposition === 'PASS' ? 'CERTIFY' : expectedDisposition === 'VOID_INDECISION' ? 'VOID' : 'REFUSE';
    if (finding?.disposition !== expectedDisposition || finding?.votes?.some((vote) => vote?.vote !== expectedVote)) errors.push(`Finding ${id}: disposition or Commission votes do not match executed result`);
    if (errors.length) { pass = false; detail = errors.join('; '); }
    results[id] = { pass, detail, errors, controllingMember: controllingMember?.id || null };
  }
  return results;
}

function readJson(root, path) {
  if (!path || !existsSync(join(root, path))) return null;
  try { return JSON.parse(readFileSync(join(root, path), 'utf8')); } catch { return null; }
}

function validateSelfDigest(document, label) {
  if (!document || !/^[a-f0-9]{64}$/.test(String(document.artifactDigest)) || payloadDigest(document) !== document.artifactDigest) return [`${label}: artifact payload digest mismatch`];
  return [];
}

export function validateLp075Review(review, root = process.cwd()) {
  const document = typeof review === 'string' ? readJson(root, review) : review;
  if (!document) return ['LP-075 review artifact missing or malformed'];
  const errors = validateSelfDigest(document, 'LP-075 review');
  if (document.artifactType !== 'LP075_SECTION_13_1_COLD_REVIEW') errors.push('LP-075 review artifact type invalid');
  if (!document?.reviewer?.name || !document?.reviewer?.selectionMethod?.includes('highest-ranked eligible') || !Number.isInteger(document?.reviewer?.eligibilityRank)) errors.push('LP-075 reviewer selection incomplete');
  const completed = Date.parse(document.reviewCompletedAt);
  const replies = Date.parse(document.drafterRepliesPublishedAt);
  const vote = Date.parse(document.voteAt);
  if (![completed, replies, vote].every(Number.isFinite) || !(completed < replies && replies < vote)) errors.push('LP-075 review must complete with replies before vote');
  if (!Array.isArray(document.findings) || document.findings.length === 0) errors.push('LP-075 review findings absent');
  for (const finding of document.findings || []) {
    for (const field of ['id', 'severity', 'finding', 'drafterDisposition', 'reviewerReply']) if (typeof finding?.[field] !== 'string' || !finding[field].trim()) errors.push(`LP-075 finding missing ${field}`);
    if (typeof finding?.unresolvedObjection !== 'boolean' || typeof finding?.presidentialFlag !== 'boolean') errors.push('LP-075 finding missing objection or presidential flag disposition');
    if (finding?.severity === 'highest' && finding?.unresolvedObjection === true && finding?.presidentialFlag !== true) errors.push('LP-075 highest-severity objection lacks presidential flag');
  }
  if (document?.finalVote?.zeroFails !== true || Object.values(document?.finalVote?.chambers || {}).some((value) => value !== 'PASS')) errors.push('LP-075 final zero-fail vote invalid');
  if (typeof document?.inWorldRecoveryNotice !== 'string' || !document.inWorldRecoveryNotice.includes('2300-07-18')) errors.push('LP-075 recovery/publication date distinction absent');
  return errors;
}

export function validateRevocationAmendment(amendment, root = process.cwd()) {
  const document = typeof amendment === 'string' ? readJson(root, amendment) : amendment;
  if (!document) return ['revocation amendment missing or malformed'];
  const errors = validateSelfDigest(document, 'revocation amendment');
  const review = Date.parse(document.reviewCompletedAt);
  const reply = Date.parse(document.reviewerReplyPublishedAt);
  const adopted = Date.parse(document.adoptedAt);
  if (![review, reply, adopted].every(Number.isFinite) || !(review < reply && reply < adopted)) errors.push('revocation amendment §13.1 chronology invalid');
  if (Object.values(document?.vote || {}).some((value) => value !== 'PASS') || document?.unresolvedHighestSeverity !== false) errors.push('revocation amendment vote or review unresolved');
  const rule = document?.rule || {};
  if (rule.bothActive !== '50 / 25 / 12.5 / 6.25' || rule.scheduleBRevokedWhileAActive !== '50 / 35 / 17 / 8' || rule.scheduleARevoked !== '70 / 35 / 17 / 8') errors.push('revocation state table incomplete');
  if (!String(rule.coupledDependency).includes('automatically') || !String(rule.directLowerRoute).includes('Lower-specific')) errors.push('revocation dependency or direct Lower route absent');
  return errors;
}

export function validateSequenceDocuments(documents, digests = {}) {
  const errors = [];
  const { registrarExecution, scheduleA, lowerCertificate, lowerAdoption, scheduleB, effectiveNotice } = documents || {};
  for (const [label, document] of Object.entries({ registrarExecution, scheduleA, lowerCertificate, lowerAdoption, scheduleB, effectiveNotice })) errors.push(...validateSelfDigest(document, label));
  const times = [Date.parse(registrarExecution?.completedAt), Date.parse(scheduleA?.publishedAt), Date.parse(lowerCertificate?.publishedAt), Date.parse(lowerAdoption?.adoptedAt), Date.parse(scheduleB?.publishedAt), Date.parse(effectiveNotice?.publishedAt)];
  if (!times.every(Number.isFinite) || times.some((time, index) => index > 0 && time <= times[index - 1])) errors.push('certification instruments are not strictly ordered Registrar execution → A → Lower → adoption → B → notice');
  if (times.at(-1) > Date.parse('2294-02-15T12:00:00Z')) errors.push('certification publication exceeds the two-year lock deadline');
  if (scheduleA?.registrarExecutionDigest !== digests.registrarExecution) errors.push('Schedule A does not bind prior Registrar execution');
  if (lowerCertificate?.scheduleACertificateDigest !== digests.scheduleA) errors.push('Lower certificate does not bind the Schedule A artifact digest');
  if (lowerAdoption?.lowerCertificateDigest !== digests.lowerCertificate || lowerAdoption?.scheduleACertificateDigest !== digests.scheduleA) errors.push('Lower adoption does not bind prior certificate digests');
  if (scheduleB?.scheduleACertificateDigest !== digests.scheduleA || scheduleB?.lowerCertificateDigest !== digests.lowerCertificate || scheduleB?.lowerAdoptionDigest !== digests.lowerAdoption) errors.push('Schedule B does not bind prior instrument digests');
  if (effectiveNotice?.scheduleACertificateDigest !== digests.scheduleA || effectiveNotice?.lowerCertificateDigest !== digests.lowerCertificate || effectiveNotice?.lowerAdoptionDigest !== digests.lowerAdoption || effectiveNotice?.scheduleBCertificateDigest !== digests.scheduleB) errors.push('effective notice does not bind complete certification chain');
  for (const [label, document] of Object.entries({ lowerCertificate, lowerAdoption, scheduleB, effectiveNotice })) if (document?.registrarExecutionDigest !== digests.registrarExecution) errors.push(`${label} does not bind prior Registrar execution`);
  const activated = scheduleA?.result === 'CERTIFIED' && lowerAdoption?.result === 'ADOPTED' && scheduleB?.result === 'CERTIFIED';
  if (activated) {
    if (Number(effectiveNotice?.effectiveAt?.slice?.(0, 4)) !== 2295 || effectiveNotice?.rates?.sanctuaryAndMain !== 50 || effectiveNotice?.rates?.lower1 !== 25 || effectiveNotice?.rates?.lower2 !== 12.5 || effectiveNotice?.rates?.lower3 !== 6.25) errors.push('2295 effective notice rates invalid');
  } else if (scheduleA?.result !== 'REFUSED' || lowerCertificate?.status !== 'NOT_ISSUED_SCHEDULE_A_REFUSED' || lowerAdoption?.result !== 'NOT_ADOPTED_SCHEDULE_A_REFUSED' || scheduleB?.result !== 'NOT_ISSUED_SCHEDULE_A_REFUSED' || effectiveNotice?.effectiveAt !== null || effectiveNotice?.rates?.sanctuaryAndMain !== 70 || effectiveNotice?.rates?.lower1 !== 35 || effectiveNotice?.rates?.lower2 !== 17 || effectiveNotice?.rates?.lower3 !== 8) {
    errors.push('non-activation sequence does not preserve LP-073 after Schedule A refusal');
  }
  return errors;
}

export function validateCertificationSequence(sequence, root) {
  const artifacts = sequence?.artifacts || {};
  const paths = { registrarExecution: artifacts.registrarExecution, scheduleA: artifacts.scheduleA, lowerCertificate: artifacts.lowerCertificate, lowerAdoption: artifacts.lowerAdoption, scheduleB: artifacts.scheduleB, effectiveNotice: artifacts.effectiveNotice };
  const documents = Object.fromEntries(Object.entries(paths).map(([key, path]) => [key, readJson(root, path)]));
  const digests = Object.fromEntries(Object.entries(paths).map(([key, path]) => [key, path && existsSync(join(root, path)) ? sha256File(join(root, path)) : null]));
  return validateSequenceDocuments(documents, digests);
}

export function hasDistinctLowerCertificate(publication, root) {
  return Boolean(publication?.separateCertificatePath && existsSync(join(root, publication.separateCertificatePath))
    && publication?.adoptionInstrumentPath && existsSync(join(root, publication.adoptionInstrumentPath))
    && publication?.path2StandingAuditAdoption?.date && /^[a-f0-9]{64}$/.test(String(publication?.path2StandingAuditAdoption?.instrumentDigest)));
}

const sameJson = (left, right) => JSON.stringify(left) === JSON.stringify(right);

/** Validate the §9 lock and independently recompute every deposited Finding. */
export function validateLockedExecution(data, root = process.cwd(), overrides = {}) {
  const errors = [];
  const audit = data?.authorityAudit || {};
  const readOverride = (name, path) => overrides[name] ?? readJson(root, path);
  const preregPath = audit?.preregistrationLock?.preregistrationPath;
  const lockPath = audit?.preregistrationLock?.lockCertificatePath;
  const publicPath = audit?.preregistrationLock?.publicRecordPath;
  const registrarPath = audit?.registrarExecution?.artifactPath;
  const outputPath = audit?.registrarExecution?.outputPath;
  const preregistration = readOverride('preregistration', preregPath);
  const lock = readOverride('lock', lockPath);
  const publicRecord = readOverride('publicRecord', publicPath);
  const registrar = readOverride('registrar', registrarPath);
  const depositedOutput = readOverride('executionOutput', outputPath);

  errors.push(...validateSelfDigest(preregistration, 'preregistration'));
  errors.push(...validateSelfDigest(lock, 'preregistration lock'));
  errors.push(...validateSelfDigest(registrar, 'Registrar execution'));
  const requiredPrereg = ['admissibleSpecificationSet', 'exclusionReasons', 'panelAdditions', 'equivalenceClasses', 'dependenceDesign', 'preprocessingSelections', 'intercurrentEventTreatments', 'computedWindow', 'computedCutoff', 'vintage', 'validation', 'appendixA', 'codeEntryPoints', 'dataSourceMappings', 'randomSeedProcedure', 'precisionClarification'];
  for (const field of requiredPrereg) if (preregistration?.[field] == null || (Array.isArray(preregistration[field]) && preregistration[field].length === 0)) errors.push(`preregistration §9.1 field missing: ${field}`);
  if (!Array.isArray(preregistration?.admissibleSpecificationSet) || preregistration.admissibleSpecificationSet.some((member) => !member?.id || !member?.finding || !member?.panel || !member?.equivalenceClass || !member?.functionalClass || !Array.isArray(member?.identificationAssumptions) || !Array.isArray(member?.identificationRules) || member.identificationRules.length !== member.identificationAssumptions.length || !Number.isFinite(Number(member?.sharedExogenousElasticity)) || !member?.dependenceStructure || !member?.clusteringUnit || !member?.intervalFamily || !member?.preprocessing || !member?.model)) errors.push('preregistration admissible member is incomplete');
  const b1Members = (preregistration?.admissibleSpecificationSet || []).filter((member) => member.intervalFamily === 'B-1');
  if (b1Members.some((member) => !Number.isInteger(member.seed) || member.outerReplications !== 999 || member.innerReplications !== 199 || member.studentization !== 'nested-bootstrap-t-replication-specific' || !member.blockLengthRule)) errors.push('preregistration B-1 seed, nested replications, replication-specific studentization, or block-length rule missing');
  if (b1Members.some((member) => member.blockLengthRule !== 'round(1.5*cuberoot(n)), minimum 2')) errors.push('preregistration B-1 automatic block-length rule is not executable');
  if ((preregistration?.admissibleSpecificationSet || []).filter((member) => member.intervalFamily === 'B-2').some((member) => member.bandwidthRule !== 'floor(4*(n/100)^(2/9)), minimum 1')) errors.push('preregistration automatic HAC bandwidth rule is not executable');
  if ((preregistration?.admissibleSpecificationSet || []).filter((member) => member.intervalFamily === 'B-4').some((member) => !Number.isInteger(member.seed) || member.scalarReplications !== 1999 || member.blockLengthRule !== 'round(1.5*cuberoot(n)), minimum 2' || !member.identificationRules.some((rule) => rule.type === 'adverse-cost-share' && rule.value > 0 && rule.value < 1))) errors.push('preregistration B-4 direct scalar resampling or identified-region endpoint is missing');
  if ((preregistration?.admissibleSpecificationSet || []).some((member) => member.preprocessing !== 'identity transform; chronological order; no deletion, imputation, winsorization, or outlier removal')) errors.push('preregistration member preprocessing does not match executable Appendix A');
  if (preregistration?.computedWindow?.start !== 2272 || preregistration?.computedWindow?.end !== 2291 || preregistration?.validation?.trainingYears?.[0] !== 2272 || preregistration?.validation?.trainingYears?.[1] !== 2286 || !sameJson(preregistration?.validation?.heldOutYears, [2287, 2288, 2289, 2290, 2291])) errors.push('preregistration window, training segment, or held-out segment invalid');

  const serializedPreregDigest = preregistration ? jsonByteDigest(preregistration) : null;
  if (lock?.preregistrationPath !== preregPath || lock?.preregistrationByteDigest !== serializedPreregDigest) errors.push('lock preregistration path or byte digest mismatch');
  if (lock?.acceptanceDisposition !== 'ACCEPTED_WITHIN_90_DAYS' || !lock?.canonicalTimestamp || !lock?.canonicalTimeAuthority || !lock?.registrarSignature?.signature) errors.push('lock acceptance, canonical timestamp, or Registrar signature missing');
  if (!(lock?.clerkSignature?.signature || lock?.clerkSignature?.deemedSignatureUsed === true)) errors.push('lock clerk signature or lawful deemed-signature missing');
  if (!lock?.publicChambersRecordReference || !lock?.executabilityChecklist?.passed || !lock?.executabilityChecklist?.section114CompletableBeforeDeadline || Object.values(lock?.section91Checklist || {}).some((value) => value !== true) || Object.keys(lock?.section91Checklist || {}).length < 13) errors.push('lock §9.1 executability checklist incomplete');
  if (publicRecord?.reference !== lock?.publicChambersRecordReference || publicRecord?.digest !== lock?.preregistrationByteDigest || !Array.isArray(publicRecord?.signatures) || publicRecord.signatures.length !== 2) errors.push('public chambers lock record does not reproduce lock publication');

  for (const mapping of preregistration?.dataSourceMappings || []) {
    const path = mapping?.path ? join(root, mapping.path) : null;
    if (!path || !existsSync(path) || mapping.digest !== sha256File(path)) errors.push(`locked raw-source digest mismatch: ${mapping?.sourceId || '(missing)'}`);
    else {
      const raw = readJson(root, mapping.path);
      const years = raw?.observations?.map((row) => Number(row.year));
      if (!Array.isArray(years) || years.length !== 20 || years.some((year, index) => year !== 2272 + index)) errors.push(`locked raw-source observation window incomplete: ${mapping.sourceId}`);
    }
  }

  const codeManifestPath = 'documents/path2-compendium/calculation-code-manifest.json';
  const codeManifest = readOverride('codeManifest', codeManifestPath);
  if (!sameJson(codeManifest, preregistration?.codeEntryPoints)) errors.push('locked code manifest does not match preregistration');
  if (!Array.isArray(codeManifest?.sources) || codeManifest.sources.length < 6) errors.push('calculation code manifest is incomplete');
  for (const source of codeManifest?.sources || []) {
    const path = source?.path ? join(root, source.path) : null;
    if (!path || !existsSync(path) || source.digest !== sha256File(path)) errors.push(`locked calculation source digest mismatch: ${source?.path || '(missing)'}`);
  }

  const amendmentPath = preregistration?.precisionClarification?.amendmentPath;
  const amendment = readOverride('precisionAmendment', amendmentPath);
  errors.push(...validateSelfDigest(amendment, 'precision measurement amendment'));
  if (!amendmentPath || !existsSync(join(root, amendmentPath)) || preregistration?.precisionClarification?.amendmentDigest !== (amendmentPath && existsSync(join(root, amendmentPath)) ? sha256File(join(root, amendmentPath)) : null)) errors.push('precision clarification digest binding invalid');
  const amendmentTimes = [Date.parse(amendment?.reviewCompletedAt), Date.parse(amendment?.reviewerRepliesPublishedAt), Date.parse(amendment?.chambersAdoptedAt), Date.parse(amendment?.publishedAt), Date.parse(lock?.canonicalTimestamp)];
  if (!amendmentTimes.every(Number.isFinite) || amendmentTimes.some((time, index) => index > 0 && time <= amendmentTimes[index - 1]) || amendment?.unresolvedHighestSeverity !== false || Object.values(amendment?.vote || {}).some((vote) => vote !== 'PASS') || amendment?.findings?.some((finding) => !finding.reviewerReply || finding.presidentialFlag !== false)) errors.push('precision clarification §13.1 review, adoption, or pre-lock chronology invalid');

  let recomputed = null;
  if (errors.length === 0) {
    try {
      const cacheKey = `${root}:${serializedPreregDigest}`;
      if (!executionCache.has(cacheKey)) executionCache.set(cacheKey, executeLockedAnalysis({ root, preregistration }));
      recomputed = executionCache.get(cacheKey);
    } catch (error) { errors.push(`locked execution is not reproducible: ${error.message}`); }
  }
  if (!sameJson(recomputed, depositedOutput)) errors.push('independent recomputation does not match deposited execution output');
  if (!sameJson(depositedOutput?.findings, data?.path2Findings)) errors.push('published Findings do not match deposited execution output');
  const allMemberIds = (preregistration?.admissibleSpecificationSet || []).map((member) => member.id);
  if (!Array.isArray(depositedOutput?.validationRecords) || depositedOutput.validationRecords.length !== allMemberIds.length || depositedOutput.validationRecords.some((record) => !allMemberIds.includes(record.memberId) || record?.rowLevel?.length !== 5 || !record?.outcomeComparisons || Object.values(record.outcomeComparisons).some((outcome) => !Number.isFinite(outcome.memberRmse) || !Number.isFinite(outcome.persistenceRmse) || !Number.isFinite(outcome.errorRatio) || outcome.survived !== (outcome.memberRmse <= outcome.persistenceRmse + EPSILON)) || !Number.isFinite(record.validationError) || record.persistenceError !== 1 || record.survived !== Object.values(record.outcomeComparisons).every((outcome) => outcome.survived))) errors.push('§4.3 outcome-specific row-level validation record is incomplete');
  const failedIds = (depositedOutput?.validationRecords || []).filter((record) => !record.survived).map((record) => record.memberId);
  if (failedIds.length === 0 || failedIds.some((id) => !depositedOutput?.excludedMembers?.some((entry) => entry.memberId === id))) errors.push('§4.3 failed-member retention record is incomplete');

  const admittedIds = Object.values(depositedOutput?.findings || {}).flatMap((finding) => (finding.members || []).map((member) => member.id));
  const diagnosticsFile = readOverride('diagnostics', 'documents/path2-compendium/mandatory-diagnostics.json');
  if (!sameJson(diagnosticsFile?.diagnostics, depositedOutput?.diagnostics) || admittedIds.some((id) => !diagnosticsFile?.diagnostics?.some((entry) => entry.memberId === id && ['D1', 'D2', 'D3', 'D4', 'D5'].every((key) => entry[key]?.status && (entry[key].status === 'COMPUTED' || entry[key]?.arithmeticExplanation))))) errors.push('mandatory D-1–D-5 diagnostics missing or incomplete');
  const derivationsFile = readOverride('derivations', 'documents/path2-compendium/finding-iv-member-derivations.json');
  const ivIds = (depositedOutput?.findings?.IV?.members || []).map((member) => member.id);
  if (!sameJson(derivationsFile?.derivations, depositedOutput?.findingIvDerivations) || ivIds.some((id) => !derivationsFile?.derivations?.some((entry) => entry.memberId === id && entry.treatment && entry.counterfactual && entry.marshallianSurplusConvention && entry.ventureIdentity && entry.displacementNetting && entry.externalCostNetting && entry.accountingIdentity?.reconciles === true && Array.isArray(entry.sourceBindings) && entry.sourceBindings.length))) errors.push('Finding IV Schedule A.4 member derivation missing or invalid');
  for (const derivation of derivationsFile?.derivations || []) for (const row of derivation?.rows || []) {
    const privateValue = Number(row.privateConsumerSurplus) + Number(row.privateProducerSurplus) + Number(row.qualityAdjustment) - Number(row.displacementCost) - Number(row.externalCost);
    const publicValue = Number(row.publicConsumerSurplus) + Number(row.publicProducerSurplus) + Number(row.publicQualityAdjustment);
    const contribution = (privateValue - publicValue) * Number(row.discountFactor);
    if (![privateValue, publicValue, contribution].every(Number.isFinite) || Math.abs(privateValue - Number(row.private)) > 0.00000005 || Math.abs(publicValue - Number(row.publicCounterfactual)) > 0.00000005 || Math.abs(contribution - Number(row.identityContribution)) > 0.00000005) errors.push(`Finding IV Schedule A.4 arithmetic mismatch: ${derivation.memberId} ${row.year}`);
  }

  const registrarTime = Date.parse(registrar?.completedAt);
  const firstInstrumentTime = Date.parse(readJson(root, data?.authorityAudit?.scheduleSequence?.artifacts?.scheduleA)?.publishedAt);
  if (!Number.isFinite(registrarTime) || !Number.isFinite(firstInstrumentTime) || registrarTime >= firstInstrumentTime || registrarTime > Date.parse(lock?.executabilityChecklist?.publicationDeadline)) errors.push('Registrar §11.4 execution did not precede instrument issuance within deadline');
  if (registrar?.preregistrationDigest !== serializedPreregDigest || registrar?.lockCertificateDigest !== (lockPath && existsSync(join(root, lockPath)) ? sha256File(join(root, lockPath)) : null) || registrar?.codeManifestDigest !== (existsSync(join(root, codeManifestPath)) ? sha256File(join(root, codeManifestPath)) : null) || registrar?.executionOutputDigest !== (outputPath && existsSync(join(root, outputPath)) ? sha256File(join(root, outputPath)) : null) || registrar?.section114Disposition !== 'EXECUTED_AND_MATCHED_BEFORE_ISSUANCE' || !registrar?.signature) errors.push('Registrar execution artifact bindings or signed §11.4 disposition invalid');
  return { errors, preregistration, lock, registrar, depositedOutput, recomputed, pass: errors.length === 0 };
}

function basicSeries(rows, numerator, denominator, expected, label) {
  const errors = validateMonthlyRows(rows, { label, expectedCount: expected, requireSection43: false });
  const parsed = Array.isArray(rows) ? rows.map((row) => ({ ...row, numerator: Number(row?.[numerator]), denominator: Number(row?.[denominator]), ratio: Number(row?.[numerator]) / Number(row?.[denominator]) })) : [];
  if (parsed.some((row) => !Number.isFinite(row.numerator) || !Number.isFinite(row.denominator) || row.denominator <= 0)) errors.push(`${label}: invalid quantity`);
  return { errors, rows: parsed };
}

export function computeCandidateArithmetic(data) {
  const main = basicSeries(data?.mainCurrent, 't50', 'm', 12, 'Main current');
  const forward = basicSeries(data?.mainForward, 't50', 'm', 36, 'Main forward');
  const adt = basicSeries(data?.adtTrailing, 'a', 'd', 36, 'ADT trailing');
  const aggregate = (series) => series.rows.length ? series.rows.reduce((total, row) => total + row.numerator, 0) / series.rows.reduce((total, row) => total + row.denominator, 0) : NaN;
  return { main12: aggregate(main), mainMinimum: main.rows.length ? Math.min(...main.rows.map((row) => row.ratio)) : NaN, mainForwardMinimum: forward.rows.length ? Math.min(...forward.rows.map((row) => row.ratio)) : NaN, adt36: aggregate(adt), adtMinimum: adt.rows.length ? Math.min(...adt.rows.map((row) => row.ratio)) : NaN, errors: [...main.errors, ...forward.errors, ...adt.errors] };
}

function validateReconciliation(record, data) {
  const errors = [];
  if (!Array.isArray(record?.entries) || record.entries.length !== 4 || Number(record?.unreconciledAmount) !== 0) return ['stream reconciliation incomplete'];
  const expected = new Map([
    ['MAIN-T50-LEDGER-2294', data.mainCurrent.reduce((total, row) => total + Number(row.t50), 0)],
    ['MAIN-OBLIGATION-LEDGER-2294', data.mainCurrent.reduce((total, row) => total + Number(row.m), 0)],
    ['ADT-RECEIPTS-LEDGER-2294', data.adtTrailing.reduce((total, row) => total + Number(row.a), 0)],
    ['DIVIDEND-OBLIGATION-LEDGER-2294', data.adtTrailing.reduce((total, row) => total + Number(row.d), 0)],
  ]);
  const seen = new Set();
  for (const entry of record.entries) {
    if (!entry?.sourceId || seen.has(entry.sourceId) || !entry?.destinationId || !Number.isFinite(Number(entry?.amount))) errors.push('stream reconciliation entry invalid');
    seen.add(entry?.sourceId);
    if (!expected.has(entry?.sourceId) || Math.abs(Number(entry.amount) - expected.get(entry.sourceId)) > EPSILON) errors.push(`stream reconciliation mismatch ${entry?.sourceId}`);
  }
  return errors;
}

export function evaluateAuthorityRecord(data, options = {}) {
  const root = options.root || process.cwd();
  const candidate = computeCandidateArithmetic(data);
  const registry = data?.provenance?.sourceRegistry || [];
  const registryErrors = validateSourceRegistry(registry, root);
  const findings = evaluatePath2Findings(data?.path2Findings, registry.map((source) => source.id));
  const compendiumErrors = validateCompendium(data?.authorityAudit?.compendium, data?.provenance, root);
  const seriesSpecs = [
    [data?.mainCurrent, 'Main current', 12, 'trailing'],
    [data?.mainForward, 'Main forward', 36, 'forward'],
    [data?.adtTrailing, 'ADT trailing', 36, 'trailing'],
  ];
  const section43Errors = [];
  for (const [rows, label, count, placement] of seriesSpecs) {
    section43Errors.push(...validateMonthlyRows(rows, { label, expectedCount: count, cutoffMonth: '2292-01', placement, knownSources: registry, requireSection43: true }));
    section43Errors.push(...validateMonthlySourceValues(rows, registry, root, label));
  }
  const reconciliationErrors = validateReconciliation(data?.provenance?.streamReconciliation, data);
  const lower = data?.lowerIncidence || {};
  const traceErrors = [];
  const lowerSection43Errors = [];
  const bArithmetic = [];
  for (const layer of lower.layers || []) {
    const current = layer?.currentRecords || [];
    const forward = layer?.forwardRecords || [];
    traceErrors.push(...validateTraceMap(layer, [...current, ...forward]));
    for (const [rows, label, count, placement] of [[current, `${layer.layer} current Lower record`, 12, 'trailing'], [forward, `${layer.layer} forward Lower record`, 36, 'forward']]) {
      lowerSection43Errors.push(...validateMonthlyRows(rows, { label, expectedCount: count, cutoffMonth: '2292-01', placement, knownSources: registry, requireSection43: true }));
      lowerSection43Errors.push(...validateMonthlySourceValues(rows, registry, root, label));
    }
    const aggregate = current.length ? current.reduce((total, row) => total + Number(row.normalizedNumerator), 0) / current.reduce((total, row) => total + Number(row.normalizedDenominator), 0) : NaN;
    const monthly = current.length ? Math.min(...current.map((row) => Number(row.normalizedNumerator) / Number(row.normalizedDenominator))) : NaN;
    const forwardMinimum = forward.length ? Math.min(...forward.map((row) => Number(row.normalizedNumerator) / Number(row.normalizedDenominator))) : NaN;
    bArithmetic.push({ layer: layer.layer, aggregate, monthly, forwardMinimum });
  }
  const sequenceErrors = validateCertificationSequence(data?.authorityAudit?.scheduleSequence, root);
  const lockedExecution = validateLockedExecution(data, root, options.lockOverrides || {});
  const lp075Errors = validateLp075Review(data?.authorityAudit?.lp075?.reviewPath, root);
  const revocationErrors = validateRevocationAmendment(data?.authorityAudit?.revocation?.amendmentPath, root);
  const sourceRegistryComplete = hasVerifiedProvenance(data?.provenance, root);
  const a = {
    A1: sourceRegistryComplete && registryErrors.length === 0,
    A2: candidate.main12 >= 1.05,
    A3: candidate.mainMinimum >= 1,
    A4: candidate.mainForwardMinimum >= 1,
    A5: candidate.adt36 >= 1.2,
    A6: candidate.adtMinimum >= 1,
    A7: section43Errors.length === 0 && reconciliationErrors.length === 0 && prohibitedCreditsExcluded(data?.provenance?.crossCredits, ['lowerLayerReceiptsIncludedInMain', 'adtReceiptsIncludedInMain', 'scmRecycleIncludedInAdt', 'incomeTaxIncludedInAdt', 'cyclicalBackfillIncluded']),
    A8: section43Errors.length === 0 && compendiumErrors.length === 0,
  };
  const separateLower = hasDistinctLowerCertificate(lower?.publication, root) && sequenceErrors.length === 0;
  const b = {
    B1: traceErrors.length === 0 && separateLower,
    B2: traceErrors.length === 0 && separateLower,
    B3: sourceRegistryComplete && lowerSection43Errors.length === 0 && prohibitedCreditsExcluded(lower?.crossCredits, ['sanctuaryReceiptsIncluded', 'mainReceiptsIncluded', 'adtReceiptsIncluded', 'scmRecycleIncluded', 'cyclicalBackfillIncluded']) && separateLower,
    B4: bArithmetic.length === 3 && bArithmetic.every((row) => row.aggregate >= 1.05 && row.monthly >= 1),
    B5: bArithmetic.length === 3 && bArithmetic.every((row) => row.forwardMinimum >= 1),
    B6: separateLower,
  };
  const lp070 = a.A5 && a.A6 && section43Errors.length === 0 && registryErrors.length === 0;
  const lp075 = lp075Errors.length === 0;
  const sequence = sequenceErrors.length === 0;
  const revocation = revocationErrors.length === 0;
  const path2Pass = Object.values(findings).every((result) => result.pass);
  const certified = path2Pass && Object.values(a).every(Boolean) && Object.values(b).every(Boolean) && compendiumErrors.length === 0 && lockedExecution.pass && lp070 && lp075 && sequence && revocation
    && data?.record?.disposition === 'CERTIFIED_COMPLETE' && data?.activation?.legallyEffective === true && data?.record?.operativeSchedule === '50 / 25 / 12.5 / 6.25';
  const lawfulFailure = !path2Pass && compendiumErrors.length === 0 && lockedExecution.pass && lp070 && lp075 && sequence && revocation
    && String(data?.record?.disposition || '').startsWith('FAILED_') && data?.activation?.legallyEffective === false && data?.activation?.status === 'NOT_ACTIVATED'
    && data?.record?.operativeSchedule === '70 / 35 / 17 / 8' && data?.record?.proposedSchedule === '50 / 25 / 12.5 / 6.25';
  const valid = certified || lawfulFailure;
  const errors = [
    ...candidate.errors, ...registryErrors, ...compendiumErrors, ...section43Errors, ...reconciliationErrors,
    ...traceErrors, ...lowerSection43Errors, ...sequenceErrors, ...lockedExecution.errors, ...lp075Errors, ...revocationErrors,
    ...Object.values(findings).flatMap((result) => result.errors || []),
  ];
  return { candidate, findings, lockedExecution, compendiumErrors, registryErrors, section43Errors, reconciliationErrors, traceErrors, lowerSection43Errors, sequenceErrors, lp075Errors, revocationErrors, a, b, bArithmetic, lp070, lp075, sequence, revocation, certified, lawfulFailure, valid, errors };
}
