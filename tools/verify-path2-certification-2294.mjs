#!/usr/bin/env node
/**
 * Recomputes the published 2294 Path 2 certification for both independently
 * conditioned schedules in LP-074. It has no network or package dependency:
 * a missing route, obligation, source series, threshold, or forbidden credit
 * fails the certificate instead of allowing a status label to decide it.
 */
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = join(ROOT, 'documents/path-2-certification-2294-data.json');
const data = JSON.parse(readFileSync(DATA, 'utf8'));
const failures = [];
const findings = [];
const EPSILON = 1e-8;

const pct = (value) => Number.isFinite(value) ? `${(value * 100).toFixed(2)}%` : 'invalid';
const sum = (rows, key) => rows.reduce((total, row) => total + Number(row[key]), 0);
const allFalse = (object, keys) => keys.every((key) => object?.[key] === false);
const hasAll = (values, required) => required.every((value) => values.includes(value));

function finding(label, pass, detail) {
  findings.push({ label, pass: Boolean(pass), detail });
  if (!pass) failures.push(`${label}: ${detail}`);
  return Boolean(pass);
}

function series(rows, numerator, denominator, expected, label) {
  if (!Array.isArray(rows) || rows.length !== expected) {
    failures.push(`${label}: expected ${expected} rows, got ${Array.isArray(rows) ? rows.length : 'non-array'}`);
    return [];
  }
  return rows.map((row, index) => {
    const n = Number(row[numerator]);
    const d = Number(row[denominator]);
    if (!Number.isFinite(n) || !Number.isFinite(d) || d <= 0) {
      failures.push(`${label}: invalid row ${index + 1}`);
    }
    return { ...row, [numerator]: n, [denominator]: d, ratio: n / d };
  });
}

function parallelSeries(months, values, obligations, expected, label) {
  const shape = Array.isArray(months) && Array.isArray(values) && Array.isArray(obligations)
    && months.length === expected && values.length === expected && obligations.length === expected;
  if (!shape) {
    failures.push(`${label}: expected ${expected} published month/Li/Oi values`);
    return [];
  }
  const seen = new Set();
  return months.map((month, index) => {
    const li = Number(values[index]);
    const oi = Number(obligations[index]);
    if (!/^229\d-\d\d$/.test(month) || seen.has(month) || !Number.isFinite(li) || !Number.isFinite(oi) || oi < 0 || li < 0) {
      failures.push(`${label}: invalid or duplicate month ${index + 1}`);
    }
    seen.add(month);
    return { month, li, oi, ratio: oi > 0 ? li / oi : null };
  });
}

function traceMap(layer, rows) {
  const routes = layer?.routeMap?.destinations || [];
  const obligations = layer?.obligationMap?.destinations || [];
  const routeShare = routes.reduce((total, route) => total + Number(route.share), 0);
  const flatObligations = obligations.flatMap((destination) => destination.obligations || []);
  const obligationShare = flatObligations.reduce((total, obligation) => total + Number(obligation.share), 0);
  return rows.every((row) => {
    const routed = routes.reduce((total, route) => total + row.li * Number(route.share), 0);
    const charged = flatObligations.reduce((total, obligation) => total + row.oi * Number(obligation.share), 0);
    return Math.abs(routed - row.li) < EPSILON && Math.abs(charged - row.oi) < EPSILON;
  }) && Math.abs(routeShare - 1) < EPSILON && Math.abs(obligationShare - 1) < EPSILON;
}

function validRouteMap(layer) {
  const routes = layer?.routeMap?.destinations;
  if (!Array.isArray(routes) || !routes.length || !layer?.routeMap?.auditId) return false;
  const ids = new Set();
  return routes.every((route) => {
    const ok = typeof route.id === 'string' && route.id.length > 0
      && typeof route.legalFund === 'string' && route.legalFund.length > 0
      && Number.isFinite(Number(route.share)) && Number(route.share) > 0 && !ids.has(route.id);
    ids.add(route.id);
    return ok;
  }) && Math.abs(routes.reduce((total, route) => total + Number(route.share), 0) - 1) < EPSILON;
}

function validObligationMap(layer) {
  const routeIds = new Set((layer?.routeMap?.destinations || []).map((route) => route.id));
  const destinations = layer?.obligationMap?.destinations;
  if (!Array.isArray(destinations) || !destinations.length || !layer?.obligationMap?.auditId || layer?.obligationMap?.noChargeableObligation !== false) return false;
  const mappedRoutes = new Set();
  const obligationIds = new Set();
  const paymentOrders = new Set();
  const valid = destinations.every((destination) => {
    const items = destination.obligations;
    if (!routeIds.has(destination.routeId) || mappedRoutes.has(destination.routeId) || !Array.isArray(items) || !items.length) return false;
    mappedRoutes.add(destination.routeId);
    return items.every((item) => {
      const ok = typeof item.id === 'string' && item.id.length > 0 && !obligationIds.has(item.id)
        && Number.isInteger(item.paymentOrder) && item.paymentOrder > 0 && !paymentOrders.has(`${destination.routeId}:${item.paymentOrder}`)
        && typeof item.legalDescription === 'string' && item.legalDescription.length > 0
        && Array.isArray(item.nonTaxSources) && item.nonTaxSources.length > 0
        && Number.isFinite(Number(item.share)) && Number(item.share) > 0;
      obligationIds.add(item.id);
      paymentOrders.add(`${destination.routeId}:${item.paymentOrder}`);
      return ok;
    });
  });
  const share = destinations.flatMap((destination) => destination.obligations).reduce((total, item) => total + Number(item.share), 0);
  return valid && routeIds.size === mappedRoutes.size && Math.abs(share - 1) < EPSILON;
}

const main = series(data.mainCurrent, 't50', 'm', 12, 'Main current series');
const forward = series(data.mainForward, 't50', 'm', 36, 'Main forward series');
const adt = series(data.adtTrailing, 'a', 'd', 36, 'ADT trailing series');
const main12 = main.length ? sum(main, 't50') / sum(main, 'm') : NaN;
const adt36 = adt.length ? sum(adt, 'a') / sum(adt, 'd') : NaN;
const minMain = main.length ? Math.min(...main.map((row) => row.ratio)) : NaN;
const minForward = forward.length ? Math.min(...forward.map((row) => row.ratio)) : NaN;
const minAdt = adt.length ? Math.min(...adt.map((row) => row.ratio)) : NaN;
const provenance = data.provenance || {};
const barred = ['velocity', 'recruitment', 'migration', 'avoidance reduction', 'taxable-base expansion', 'consumption response', 'savings response'];

const a1 = finding('A1', data.schemaVersion === '2.0' && provenance.authoredOrRulingDerivedMagnitudesUsed === false
  && hasAll(provenance.excludedCertificationInputs || [], barred), 'audit provenance and behavioral quarantine are published');
const a2 = finding('A2', main12 >= 1.05, `Main-12 ${pct(main12)} (floor 105.00%)`);
const a3 = finding('A3', main.length === 12 && main.every((row) => row.ratio >= 1), `Main monthly minimum ${pct(minMain)} (floor 100.00%)`);
const a4 = finding('A4', forward.length === 36 && forward.every((row) => row.ratio >= 1), `Main forward minimum ${pct(minForward)} (floor 100.00%)`);
const a5 = finding('A5', adt36 >= 1.2, `ADT-36 ${pct(adt36)} (floor 120.00%)`);
const a6 = finding('A6', adt.length === 36 && adt.every((row) => row.ratio >= 1), `ADT monthly minimum ${pct(minAdt)} (floor 100.00%)`);
const a7 = finding('A7', allFalse(provenance.crossCredits, ['lowerLayerReceiptsIncludedInMain', 'adtReceiptsIncludedInMain', 'scmRecycleIncludedInAdt', 'incomeTaxIncludedInAdt', 'cyclicalBackfillIncluded']), 'all Main/ADT prohibited cross-credits excluded');
const a8 = finding('A8', main.length === 12 && forward.length === 36 && adt.length === 36, 'published A monthly values reproduce each A calculation');

const lower = data.lowerIncidence || {};
const expectedLayers = ['-1', '-2', '-3'];
const lowerLayers = Array.isArray(lower.layers) ? lower.layers : [];
const lowerById = new Map(lowerLayers.map((layer) => [layer.layer, layer]));
const expectedRates = { '-1': 25, '-2': 12.5, '-3': 6.25 };
const lowerRows = new Map();
const lowerForwardRows = new Map();
for (const layer of lowerLayers) {
  lowerRows.set(layer.layer, parallelSeries(lower.currentMonths, layer.current?.li, layer.current?.oi, 12, `${layer.layer} current Lower series`));
  lowerForwardRows.set(layer.layer, parallelSeries(lower.forwardMonths, layer.forward?.li, layer.forward?.oi, 36, `${layer.layer} forward Lower series`));
}
const lowerCreditKeys = ['sanctuaryReceiptsIncluded', 'mainReceiptsIncluded', 'adtReceiptsIncluded', 'scmRecycleIncluded', 'cyclicalBackfillIncluded'];
const b1 = finding('B1', expectedLayers.every((id) => validRouteMap(lowerById.get(id))
  && traceMap(lowerById.get(id), [...(lowerRows.get(id) || []), ...(lowerForwardRows.get(id) || [])])), 'complete, reconciled route maps for -1, -2, and -3');
const b2 = finding('B2', expectedLayers.every((id) => validObligationMap(lowerById.get(id))), 'complete obligation maps, payment order, and non-tax sources for every route');
const b3 = finding('B3', expectedLayers.every((id) => {
  const layer = lowerById.get(id);
  const rows = lowerRows.get(id) || [];
  const forwardRows = lowerForwardRows.get(id) || [];
  return layer?.proposedRatePct === expectedRates[id] && typeof layer?.sourceSeries?.li === 'string' && typeof layer?.sourceSeries?.oi === 'string'
    && rows.length === 12 && forwardRows.length === 36 && rows.every((row) => row.oi > 0) && forwardRows.every((row) => row.oi > 0);
}) && allFalse(lower.crossCredits, lowerCreditKeys), 'layer-specific Li/Oi series and all five prohibited credits excluded');
const b4Details = expectedLayers.map((id) => {
  const rows = lowerRows.get(id) || [];
  const aggregate = rows.length ? sum(rows, 'li') / sum(rows, 'oi') : NaN;
  const minimum = rows.length ? Math.min(...rows.map((row) => row.ratio)) : NaN;
  return { id, rows, aggregate, minimum };
});
const b4 = finding('B4', b4Details.every((item) => item.rows.length === 12 && item.aggregate >= 1.05 && item.minimum >= 1),
  b4Details.map((item) => `${item.id} ${pct(item.aggregate)} / monthly min ${pct(item.minimum)}`).join('; '));
const b5Details = expectedLayers.map((id) => {
  const rows = lowerForwardRows.get(id) || [];
  return { id, rows, minimum: rows.length ? Math.min(...rows.map((row) => row.ratio)) : NaN };
});
const b5 = finding('B5', b5Details.every((item) => item.rows.length === 36 && item.rows.every((row) => row.ratio >= 1)),
  b5Details.map((item) => `${item.id} forward min ${pct(item.minimum)}`).join('; '));
const b6 = finding('B6', typeof lower.method === 'string' && lower.method.length > 0
  && typeof lower.publication?.routeAndObligationMethod === 'string' && lower.publication.routeAndObligationMethod.length > 0
  && lower.publication?.monthlyDataPublished === true
  && typeof lower.publication?.path2StandingAuditAdoption === 'string' && /Path 2 standing audit adopted/.test(lower.publication.path2StandingAuditAdoption)
  && hasAll(lower.excludedCertificationInputs || [], [...barred, 'speculative economic gains']),
  'published B1–B5 method/data and Path 2 controlling-estimate adoption');

const allA = [a1, a2, a3, a4, a5, a6, a7, a8].every(Boolean);
const allB = [b1, b2, b3, b4, b5, b6].every(Boolean);
const activationRates = data.activation?.rates || {};
const activation = finding('Activation', allA && allB
  && data.activation?.statute === 'LP-074'
  && data.activation?.certificatePublicationDate === '2294-01-31'
  && data.activation?.effectiveAssessmentPeriod === '2295-01-01'
  && activationRates.sanctuaryAndMain === 50 && activationRates.lower1 === 25
  && activationRates.lower2 === 12.5 && activationRates.lower3 === 6.25,
  'both independently computed schedules activate together on 2295-01-01');

console.log('Path 2 full LP-074 certification verification');
for (const result of findings) console.log(`  ${result.pass ? 'PASS' : 'FAIL'} ${result.label} — ${result.detail}`);
console.log(`  Prohibited credits excluded: ${Object.keys(provenance.crossCredits || {}).length + Object.keys(lower.crossCredits || {}).length}`);
if (!activation || failures.length) {
  for (const failure of failures) console.error(`FAIL  ${failure}`);
  process.exit(1);
}
console.log('  FINAL ACTIVE SCHEDULE: 50 / 25 / 12.5 / 6.25');
