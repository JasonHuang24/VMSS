import { existsSync } from 'fs';
import { join } from 'path';

const EPSILON = 1e-9;

export const pct = (value) => Number.isFinite(value) ? `${(value * 100).toFixed(2)}%` : 'not computable';
export const sum = (rows, key) => rows.reduce((total, row) => total + Number(row[key]), 0);

export function prohibitedCreditsExcluded(record, requiredKeys) {
  return Array.isArray(requiredKeys) && requiredKeys.length > 0
    && requiredKeys.every((key) => record?.[key] === false);
}

export function hasVerifiedProvenance(provenance, root) {
  const registry = provenance?.sourceRegistry;
  return provenance?.status === 'VERIFIED'
    && provenance?.authoredOrRulingDerivedMagnitudesUsed === false
    && Array.isArray(registry) && registry.length > 0
    && registry.every((source) => source?.id && source?.path && source?.digest && existsSync(join(root, source.path)));
}

export function hasDistinctLowerCertificate(publication, root) {
  return Boolean(publication?.separateCertificatePath
    && existsSync(join(root, publication.separateCertificatePath))
    && publication?.adoptionInstrumentPath
    && existsSync(join(root, publication.adoptionInstrumentPath))
    && publication?.path2StandingAuditAdoption?.date
    && publication?.path2StandingAuditAdoption?.instrumentDigest);
}

export function monthIndex(month) {
  const match = /^(\d{4})-(0[1-9]|1[0-2])$/.exec(String(month));
  return match ? Number(match[1]) * 12 + Number(match[2]) - 1 : null;
}

export function validateMonthlyRows(rows, options = {}) {
  const {
    label = 'series',
    expectedCount,
    cutoffMonth,
    placement,
    knownSources = [],
    requireSection43 = true,
  } = options;
  const errors = [];
  if (!Array.isArray(rows)) return [`${label}: rows must be an array`];
  if (Number.isInteger(expectedCount) && rows.length !== expectedCount) {
    errors.push(`${label}: expected ${expectedCount} months, received ${rows.length}`);
  }

  const known = new Set(knownSources.map((source) => typeof source === 'string' ? source : source?.id).filter(Boolean));
  const indexes = [];
  const seen = new Set();
  const ratios = [];
  for (const [index, row] of rows.entries()) {
    const prefix = `${label} row ${index + 1}`;
    const mi = monthIndex(row?.month);
    if (mi === null) errors.push(`${prefix}: invalid month format`);
    if (mi !== null && seen.has(mi)) errors.push(`${prefix}: duplicate month ${row.month}`);
    if (mi !== null) {
      seen.add(mi);
      indexes.push(mi);
    }

    if (!requireSection43) continue;
    for (const field of ['sourceNumerator', 'sourceDenominator', 'rawUnits', 'inclusionRule', 'adjustment', 'independenceMethod']) {
      if (typeof row?.[field] !== 'string' || row[field].trim() === '') errors.push(`${prefix}: missing ${field}`);
    }
    if (row?.sourceNumerator && !known.has(row.sourceNumerator)) errors.push(`${prefix}: unrecognized numerator source ${row.sourceNumerator}`);
    if (row?.sourceDenominator && !known.has(row.sourceDenominator)) errors.push(`${prefix}: unrecognized denominator source ${row.sourceDenominator}`);
    if (row?.sourceNumerator && row.sourceNumerator === row.sourceDenominator) errors.push(`${prefix}: numerator and denominator share one source identifier`);
    if (row?.numeratorDerivedFromDenominator !== false) errors.push(`${prefix}: numerator/denominator independence not established`);

    const rawN = Number(row?.rawNumerator);
    const rawD = Number(row?.rawDenominator);
    const scaleN = Number(row?.numeratorScale);
    const scaleD = Number(row?.denominatorScale);
    const normN = Number(row?.normalizedNumerator);
    const normD = Number(row?.normalizedDenominator);
    const weight = Number(row?.weight);
    if (![rawN, rawD, scaleN, scaleD, normN, normD, weight].every(Number.isFinite) || rawD <= 0 || normD <= 0 || scaleN <= 0 || scaleD <= 0 || weight <= 0) {
      errors.push(`${prefix}: invalid raw, normalization, or weight quantity`);
    } else {
      if (Math.abs(rawN * scaleN - normN) > EPSILON || Math.abs(rawD * scaleD - normD) > EPSILON) {
        errors.push(`${prefix}: raw-to-normalized recomputation mismatch`);
      }
      ratios.push(rawN / rawD);
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

  if (requireSection43 && ratios.length > 2 && ratios.every((ratio) => Math.abs(ratio - ratios[0]) < EPSILON)) {
    errors.push(`${label}: numerator is a constant multiple of denominator`);
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

  const routeIds = new Set();
  let routeShare = 0;
  for (const route of routes) {
    if (!route?.id || routeIds.has(route.id) || !route?.legalFund) errors.push(`${label}: invalid or duplicate route`);
    routeIds.add(route.id);
    routeShare += Number(route?.share);
  }
  if (Math.abs(routeShare - 1) > EPSILON) errors.push(`${label}: route shares do not reconcile`);

  const mappedRoutes = new Set();
  const obligationIds = new Set();
  let obligationShare = 0;
  for (const destination of destinations) {
    if (!routeIds.has(destination?.routeId) || mappedRoutes.has(destination?.routeId)) errors.push(`${label}: destination route mismatch`);
    mappedRoutes.add(destination?.routeId);
    const orders = new Set();
    if (!Array.isArray(destination?.obligations) || destination.obligations.length === 0) errors.push(`${label}: route has no explicit obligation disposition`);
    for (const obligation of destination?.obligations || []) {
      if (!obligation?.id || obligationIds.has(obligation.id) || !obligation?.legalDescription) errors.push(`${label}: invalid or duplicate obligation`);
      if (!Number.isInteger(obligation?.paymentOrder) || obligation.paymentOrder < 1 || orders.has(obligation.paymentOrder)) errors.push(`${label}: invalid payment order`);
      if (!Array.isArray(obligation?.nonTaxSources) || obligation.nonTaxSources.length === 0) errors.push(`${label}: missing non-tax source attribution`);
      obligationIds.add(obligation?.id);
      orders.add(obligation?.paymentOrder);
      obligationShare += Number(obligation?.share);
    }
  }
  if (mappedRoutes.size !== routeIds.size) errors.push(`${label}: trace map is incomplete`);
  if (Math.abs(obligationShare - 1) > EPSILON) errors.push(`${label}: obligation shares do not reconcile`);

  for (const [index, row] of rows.entries()) {
    if (!Number.isFinite(Number(row?.li)) || !Number.isFinite(Number(row?.oi))) errors.push(`${label}: trace row ${index + 1} is nonnumeric`);
    const routed = routes.reduce((total, route) => total + Number(row?.li) * Number(route.share), 0);
    const charged = destinations.flatMap((item) => item.obligations || []).reduce((total, obligation) => total + Number(row?.oi) * Number(obligation.share), 0);
    if (Math.abs(routed - Number(row?.li)) > EPSILON || Math.abs(charged - Number(row?.oi)) > EPSILON) errors.push(`${label}: destination-specific reconciliation fails at row ${index + 1}`);
  }
  return errors;
}

function validateHorizonMembers(finding, kind) {
  const errors = [];
  const members = finding?.members;
  if (!Array.isArray(members) || members.length === 0) return { errors: [`Finding ${kind}: no admissible members`], members: [] };
  for (const member of members) {
    if (!member?.id || !member?.equivalenceClass || !member?.sourceId) errors.push(`Finding ${kind}: incomplete member trace`);
    if (member?.interval?.oneSidedLevel !== 0.95 || member?.interval?.orientation !== 'against-activation') errors.push(`Finding ${kind}: invalid uncertainty interval`);
    if (!Number.isFinite(Number(member?.validationError)) || !Number.isFinite(Number(member?.persistenceError)) || Number(member.validationError) > Number(member.persistenceError)) errors.push(`Finding ${kind}: §4.3 validation floor not met`);
    if (!Array.isArray(member?.horizon) || member.horizon.length !== 30) errors.push(`Finding ${kind}: horizon must contain 30 years`);
    const years = (member?.horizon || []).map((row) => Number(row.year));
    if (years.some((year) => !Number.isInteger(year)) || years.some((year, index) => index > 0 && year !== years[index - 1] + 1)) errors.push(`Finding ${kind}: horizon years are not consecutive`);
  }
  return { errors, members };
}

export function evaluatePath2Findings(path2Findings) {
  const results = {};
  if (!path2Findings || typeof path2Findings !== 'object') {
    for (const id of ['I', 'II', 'III', 'IV']) results[id] = { pass: false, detail: 'mandatory finding record missing' };
    return results;
  }

  for (const id of ['I', 'II', 'III', 'IV']) {
    const checked = validateHorizonMembers(path2Findings[id], id);
    if (checked.errors.length) {
      results[id] = { pass: false, detail: checked.errors.join('; ') };
      continue;
    }
    if (id === 'I') {
      const bound = Math.min(...checked.members.flatMap((member) => member.horizon.map((row) => Number(row.coverageLowerBound))));
      results[id] = { pass: bound > 1, detail: `least-favorable worst-year coverage ${pct(bound)}` };
    } else if (id === 'II') {
      const baseline = Number(path2Findings[id].baselineMean);
      const impairment = Math.max(...checked.members.map((member) => member.horizon.filter((row) => Number(row.disbursementLowerBound) < baseline && row.attributableToSchedule === true).length));
      results[id] = { pass: impairment === 0, detail: `least-favorable impairment years ${impairment}` };
    } else if (id === 'III') {
      const baseline = Number(path2Findings[id].baselineActivationMean);
      const activation = Math.max(...checked.members.flatMap((member) => member.horizon.map((row) => Number(row.activationFrequencyUpperBound))));
      const flow = Math.min(...checked.members.flatMap((member) => member.horizon.map((row) => Number(row.flowMarginLowerBound))));
      results[id] = { pass: Number.isFinite(baseline) && activation < baseline * 1.25 && flow > 0, detail: `worst activation ${activation}; Flow Test margin ${flow}` };
    } else {
      const om = Math.min(...checked.members.map((member) => Number(member.omLowerBound)));
      const events = Math.max(...checked.members.flatMap((member) => member.horizon.map((row) => Number(row.concentrationEventsUpperBound))));
      results[id] = { pass: om > 0 && events === 0, detail: `least-favorable OM ${om}; concentration events ${events}` };
    }
  }
  return results;
}

function basicSeries(rows, numerator, denominator, expected, label) {
  const errors = validateMonthlyRows(rows, { label, expectedCount: expected, requireSection43: false });
  const parsed = Array.isArray(rows) ? rows.map((row) => ({
    ...row,
    numerator: Number(row?.[numerator]),
    denominator: Number(row?.[denominator]),
    ratio: Number(row?.[numerator]) / Number(row?.[denominator]),
  })) : [];
  if (parsed.some((row) => !Number.isFinite(row.numerator) || !Number.isFinite(row.denominator) || row.denominator <= 0)) errors.push(`${label}: invalid quantity`);
  return { errors, rows: parsed };
}

export function computeCandidateArithmetic(data) {
  const main = basicSeries(data?.mainCurrent, 't50', 'm', 12, 'Main current');
  const forward = basicSeries(data?.mainForward, 't50', 'm', 36, 'Main forward');
  const adt = basicSeries(data?.adtTrailing, 'a', 'd', 36, 'ADT trailing');
  const main12 = main.rows.length ? main.rows.reduce((n, row) => n + row.numerator, 0) / main.rows.reduce((n, row) => n + row.denominator, 0) : NaN;
  const adt36 = adt.rows.length ? adt.rows.reduce((n, row) => n + row.numerator, 0) / adt.rows.reduce((n, row) => n + row.denominator, 0) : NaN;
  return {
    main12,
    mainMinimum: main.rows.length ? Math.min(...main.rows.map((row) => row.ratio)) : NaN,
    mainForwardMinimum: forward.rows.length ? Math.min(...forward.rows.map((row) => row.ratio)) : NaN,
    adt36,
    adtMinimum: adt.rows.length ? Math.min(...adt.rows.map((row) => row.ratio)) : NaN,
    errors: [...main.errors, ...forward.errors, ...adt.errors],
  };
}

export function evaluateAuthorityRecord(data, options = {}) {
  const root = options.root || process.cwd();
  const candidate = computeCandidateArithmetic(data);
  const findings = evaluatePath2Findings(data?.path2Findings);
  const compendiumInventory = data?.authorityAudit?.compendium?.inventory || [];
  const compendiumErrors = [];
  for (const item of compendiumInventory) {
    if (!item?.required) continue;
    if (!item?.path || !existsSync(join(root, item.path)) || item?.complete !== true) compendiumErrors.push(item?.id || 'unnamed compendium item');
  }
  if (compendiumInventory.length === 0) compendiumErrors.push('compendium inventory absent');

  const sourceRegistry = data?.provenance?.sourceRegistry || [];
  const sourceRegistryComplete = hasVerifiedProvenance(data?.provenance, root);
  const section43Rows = [
    ...(data?.mainCurrent || []),
    ...(data?.mainForward || []),
    ...(data?.adtTrailing || []),
  ];
  const section43Errors = validateMonthlyRows(section43Rows, {
    label: 'A-side published monthly record',
    knownSources: sourceRegistry,
    requireSection43: true,
  });

  const lower = data?.lowerIncidence || {};
  const traceErrors = [];
  const lowerSection43Errors = [];
  const bArithmetic = [];
  for (const layer of lower.layers || []) {
    const current = (lower.currentMonths || []).map((month, index) => ({ month, li: Number(layer?.current?.li?.[index]), oi: Number(layer?.current?.oi?.[index]) }));
    const forward = (lower.forwardMonths || []).map((month, index) => ({ month, li: Number(layer?.forward?.li?.[index]), oi: Number(layer?.forward?.oi?.[index]) }));
    traceErrors.push(...validateTraceMap(layer, [...current, ...forward]));
    lowerSection43Errors.push(...validateMonthlyRows(layer?.currentRecords, {
      label: `${layer?.layer || 'unknown'} current Lower record`, expectedCount: 12,
      cutoffMonth: '2292-01', placement: 'trailing', knownSources: sourceRegistry, requireSection43: true,
    }));
    lowerSection43Errors.push(...validateMonthlyRows(layer?.forwardRecords, {
      label: `${layer?.layer || 'unknown'} forward Lower record`, expectedCount: 36,
      cutoffMonth: '2292-01', placement: 'forward', knownSources: sourceRegistry, requireSection43: true,
    }));
    const aggregate = current.length ? current.reduce((n, row) => n + row.li, 0) / current.reduce((n, row) => n + row.oi, 0) : NaN;
    const monthly = current.length ? Math.min(...current.map((row) => row.li / row.oi)) : NaN;
    const forwardMinimum = forward.length ? Math.min(...forward.map((row) => row.li / row.oi)) : NaN;
    bArithmetic.push({ layer: layer.layer, aggregate, monthly, forwardMinimum });
  }

  const crossCredits = data?.provenance?.crossCredits || {};
  const lowerCrossCredits = lower?.crossCredits || {};
  const streamReconciliation = data?.provenance?.streamReconciliation;
  const reconciliationComplete = Array.isArray(streamReconciliation?.entries) && streamReconciliation.entries.length > 0
    && streamReconciliation.entries.every((entry) => entry?.sourceId && entry?.destinationId && Number.isFinite(Number(entry?.amount)))
    && Number(streamReconciliation?.unreconciledAmount) === 0;
  const a = {
    A1: sourceRegistryComplete,
    A2: candidate.main12 >= 1.05,
    A3: candidate.mainMinimum >= 1,
    A4: candidate.mainForwardMinimum >= 1,
    A5: candidate.adt36 >= 1.2,
    A6: candidate.adtMinimum >= 1,
    A7: section43Errors.length === 0 && reconciliationComplete
      && prohibitedCreditsExcluded(crossCredits, ['lowerLayerReceiptsIncludedInMain', 'adtReceiptsIncludedInMain', 'scmRecycleIncludedInAdt', 'incomeTaxIncludedInAdt', 'cyclicalBackfillIncluded']),
    A8: section43Errors.length === 0 && compendiumErrors.length === 0,
  };
  const b = {
    B1: traceErrors.length === 0 && lower?.instrumentStatus === 'SEPARATE_CERTIFICATE_PUBLISHED',
    B2: traceErrors.length === 0 && lower?.instrumentStatus === 'SEPARATE_CERTIFICATE_PUBLISHED',
    B3: sourceRegistryComplete && lowerSection43Errors.length === 0
      && prohibitedCreditsExcluded(lowerCrossCredits, ['sanctuaryReceiptsIncluded', 'mainReceiptsIncluded', 'adtReceiptsIncluded', 'scmRecycleIncluded', 'cyclicalBackfillIncluded'])
      && lower?.instrumentStatus === 'SEPARATE_CERTIFICATE_PUBLISHED',
    B4: bArithmetic.length === 3 && bArithmetic.every((row) => row.aggregate >= 1.05 && row.monthly >= 1),
    B5: bArithmetic.length === 3 && bArithmetic.every((row) => row.forwardMinimum >= 1),
    B6: hasDistinctLowerCertificate(lower?.publication, root),
  };

  const lp070 = a.A5 && a.A6 && section43Errors.length === 0;
  const lp075 = data?.authorityAudit?.lp075?.status === 'COMPLETE';
  const sequence = data?.authorityAudit?.scheduleSequence?.status === 'COMPLETE';
  const path2Pass = Object.values(findings).every((result) => result.pass);
  const certified = path2Pass && Object.values(a).every(Boolean) && Object.values(b).every(Boolean)
    && compendiumErrors.length === 0 && lp070 && lp075 && sequence;
  const declaredVoid = data?.record?.disposition === 'VOID_INCOMPLETE' && data?.activation?.legallyEffective === false;
  return {
    candidate,
    findings,
    compendiumErrors,
    section43Errors,
    traceErrors,
    lowerSection43Errors,
    a,
    b,
    bArithmetic,
    lp070,
    lp075,
    sequence,
    certified,
    declaredVoid,
    internallyConsistent: !certified && declaredVoid && data?.record?.operativeSchedule === '70 / 35 / 17 / 8',
  };
}
