#!/usr/bin/env node
/** Permanent negative tests for malformed Path 2 evidence. Test fixtures are
 * synthetic validator inputs only; they are not fiscal evidence or canon. */
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import {
  evaluatePath2Findings,
  hasDistinctLowerCertificate,
  hasVerifiedProvenance,
  prohibitedCreditsExcluded,
  validateMonthlyRows,
  validateTraceMap,
} from './path2-certification-core.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const clone = (value) => structuredClone(value);
const tests = [];
const test = (name, fn) => tests.push({ name, fn });
const month = (index) => `${Math.floor(index / 12)}-${String(index % 12 + 1).padStart(2, '0')}`;
const start = 2291 * 12 + 1;
const knownSources = ['TEST-NUMERATOR', 'TEST-DENOMINATOR'];
const rows = Array.from({ length: 12 }, (_, index) => {
  const rawDenominator = 1000 + index * 7;
  const rawNumerator = 1110 + index * 9;
  return {
    month: month(start + index),
    sourceNumerator: 'TEST-NUMERATOR',
    sourceDenominator: 'TEST-DENOMINATOR',
    rawUnits: 'test-only units',
    rawNumerator,
    rawDenominator,
    numeratorScale: 0.1,
    denominatorScale: 0.1,
    normalizedNumerator: rawNumerator * 0.1,
    normalizedDenominator: rawDenominator * 0.1,
    inclusionRule: 'all completed test months',
    adjustment: 'none',
    weight: 1,
    independenceMethod: 'independent test ledgers',
    numeratorDerivedFromDenominator: false,
  };
});
const validate = (candidate, overrides = {}) => validateMonthlyRows(candidate, {
  label: 'mutation fixture', expectedCount: 12, cutoffMonth: '2292-01', placement: 'trailing',
  knownSources, requireSection43: true, ...overrides,
});

test('valid test-only monthly shape is accepted', () => validate(rows).length === 0);
test('missing month is rejected', () => validate(rows.slice(1)).some((error) => error.includes('expected 12')));
test('invalid month format is rejected', () => { const value = clone(rows); value[0].month = '2291-13'; return validate(value).some((error) => error.includes('invalid month')); });
test('nonchronological order is rejected', () => { const value = clone(rows); [value[0], value[1]] = [value[1], value[0]]; return validate(value).some((error) => error.includes('chronological')); });
test('duplicate month is rejected', () => { const value = clone(rows); value[1].month = value[0].month; return validate(value).some((error) => error.includes('duplicate month')); });
test('nonconsecutive window is rejected', () => { const value = clone(rows); value[5].month = month(start + 20); return validate(value).some((error) => error.includes('consecutive')); });
test('cutoff-relative placement is enforced', () => validate(rows, { cutoffMonth: '2292-02' }).some((error) => error.includes('cutoff')));
test('empty source identifier is rejected', () => { const value = clone(rows); value[0].sourceNumerator = ''; return validate(value).some((error) => error.includes('missing sourceNumerator')); });
test('unrecognized source identifier is rejected', () => { const value = clone(rows); value[0].sourceNumerator = 'UNKNOWN'; return validate(value).some((error) => error.includes('unrecognized numerator source')); });
test('raw-to-normalized mismatch is rejected', () => { const value = clone(rows); value[0].normalizedNumerator += 1; return validate(value).some((error) => error.includes('recomputation mismatch')); });
test('derived numerator is rejected', () => { const value = clone(rows); value[0].numeratorDerivedFromDenominator = true; return validate(value).some((error) => error.includes('independence')); });
test('shared source identifier is rejected', () => { const value = clone(rows); value[0].sourceNumerator = value[0].sourceDenominator; return validate(value).some((error) => error.includes('share one source')); });
test('constant-multiple construction is rejected', () => { const value = clone(rows); for (const row of value) { row.rawNumerator = row.rawDenominator * 1.2; row.normalizedNumerator = row.rawNumerator * row.numeratorScale; } return validate(value).some((error) => error.includes('constant multiple')); });
test('missing inclusion/adjustment/weight fields are rejected', () => { const value = clone(rows); value[0].inclusionRule = ''; value[0].adjustment = ''; value[0].weight = 0; const errors = validate(value); return errors.some((error) => error.includes('inclusionRule')) && errors.some((error) => error.includes('adjustment')) && errors.some((error) => error.includes('weight')); });

const layer = {
  layer: '-1',
  routeMap: { auditId: 'TEST-ROUTE', destinations: [
    { id: 'one', legalFund: 'One', share: 0.6 },
    { id: 'two', legalFund: 'Two', share: 0.4 },
  ] },
  obligationMap: { auditId: 'TEST-OBLIGATION', destinations: [
    { routeId: 'one', obligations: [{ id: 'a', paymentOrder: 1, legalDescription: 'A', nonTaxSources: ['test source'], share: 0.6 }] },
    { routeId: 'two', obligations: [{ id: 'b', paymentOrder: 1, legalDescription: 'B', nonTaxSources: ['test source'], share: 0.4 }] },
  ] },
};
test('complete trace map reconciles', () => validateTraceMap(layer, [{ li: 10, oi: 8 }]).length === 0);
test('destination-specific reconciliation failure is rejected', () => { const value = clone(layer); value.routeMap.destinations[1].share = 0.3; return validateTraceMap(value, [{ li: 10, oi: 8 }]).some((error) => error.includes('reconcile')); });
test('incomplete trace map is rejected', () => { const value = clone(layer); value.obligationMap.destinations.pop(); return validateTraceMap(value, [{ li: 10, oi: 8 }]).some((error) => error.includes('incomplete')); });

const findingI = {
  members: [{
    id: 'test-member', equivalenceClass: 'test-class', sourceId: 'test-only',
    interval: { oneSidedLevel: 0.95, orientation: 'against-activation' },
    validationError: 1, persistenceError: 2,
    horizon: Array.from({ length: 30 }, (_, index) => ({ year: 2295 + index, coverageLowerBound: 1.01 })),
  }],
};
test('Finding I derives a passing worst-year bound', () => evaluatePath2Findings({ I: findingI }).I.pass === true);
test('Finding I least-favorable year controls', () => { const value = clone(findingI); value.members[0].horizon[29].coverageLowerBound = 0.99; return evaluatePath2Findings({ I: value }).I.pass === false; });
test('short Findings horizon is rejected', () => { const value = clone(findingI); value.members[0].horizon.pop(); return evaluatePath2Findings({ I: value }).I.detail.includes('30 years'); });
test('missing Findings II–IV never default to pass', () => ['II', 'III', 'IV'].every((id) => evaluatePath2Findings({ I: findingI })[id].pass === false));
test('prohibited cross-credit fails explicitly', () => prohibitedCreditsExcluded({ mainReceiptsIncluded: true }, ['mainReceiptsIncluded']) === false);
test('A1 cannot pass on a trusted boolean without deposited sources', () => hasVerifiedProvenance({ status: 'VERIFIED', authoredOrRulingDerivedMagnitudesUsed: false, sourceRegistry: [] }, ROOT) === false);
test('B6 cannot pass on adoption prose alone', () => hasDistinctLowerCertificate({ path2StandingAuditAdoption: 'adopted' }, ROOT) === false);

let failed = 0;
for (const entry of tests) {
  let passed = false;
  try { passed = entry.fn() === true; } catch { passed = false; }
  console.log(`  ${passed ? 'PASS' : 'FAIL'} ${entry.name}`);
  if (!passed) failed += 1;
}
console.log(`Path 2 mutation tests — ${tests.length - failed} passed, ${failed} failed`);
if (failed) process.exit(1);
