#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { evaluateCertification } from './verify-path2-certification-2294.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = JSON.parse(readFileSync(join(ROOT, 'documents/path-2-certification-2294-data.json'), 'utf8'));
const clone = () => JSON.parse(JSON.stringify(source));
const tests = [];
const test = (name, mutate, assertion) => tests.push({ name, mutate, assertion });
const rejected = (field) => (result) => result[field] === false;

test('unmodified record certifies both schedules and notice', () => {}, (r) => r.scheduleACertified && r.scheduleBCertified && r.notice);
test('Finding I shortfall is rejected', (d) => { d.sourceInputs.findingI.projectedCoverageLowerBounds[0] = 0.999; }, (r) => !r.findings.I);
test('Finding II dividend impairment is rejected', (d) => { d.sourceInputs.findingII.projectedDividendLowerBounds[0] = 99.99; }, (r) => !r.findings.II);
test('Finding II negative schedule effect is rejected', (d) => { d.sourceInputs.findingII.scheduleEffectLowerBounds[0] = -0.01; }, (r) => !r.findings.II);
test('Finding III activation ceiling breach is rejected', (d) => { d.sourceInputs.findingIII.projectedActivationUpperBounds[0] = 10.101; }, (r) => !r.findings.III);
test('Finding III Flow shortfall is rejected', (d) => { d.sourceInputs.findingIII.projectedFlowLowerBounds[0] = 0.499; }, (r) => !r.findings.III);
test('Finding IV nonpositive marginal value is rejected', (d) => { d.sourceInputs.findingIV.netMarginalValueLowerBound = 0; }, (r) => !r.findings.IV);
test('Schedule A current coverage shortfall is rejected', (d) => { d.sourceInputs.scheduleA.mainCurrentCoverage = 1.049; }, rejected('scheduleACertified'));
test('Schedule A dividend coverage shortfall is rejected', (d) => { d.sourceInputs.scheduleA.dividendAggregateCoverage = 1.199; }, rejected('scheduleACertified'));
test('Schedule A cross-credit contamination is rejected', (d) => { d.sourceInputs.scheduleA.crossCreditsExcluded = false; }, rejected('scheduleACertified'));
test('B1 incomplete route map is rejected', (d) => { d.sourceInputs.scheduleB.layers['-1'].routeReconciledFraction = 0.999; }, (r) => !r.scheduleBConditions.B1);
test('B2 incomplete obligation map is rejected', (d) => { d.sourceInputs.scheduleB.layers['-2'].obligationsEnumerated = false; }, (r) => !r.scheduleBConditions.B2);
test('B3 wrong -3 rate is rejected', (d) => { d.sourceInputs.scheduleB.layers['-3'].rate = 8; }, (r) => !r.scheduleBConditions.B3);
test('B3 cross-credit contamination is rejected', (d) => { d.sourceInputs.scheduleB.prohibitedCrossCreditsExcluded = false; }, (r) => !r.scheduleBConditions.B3);
test('B3 missing monthly quantity is rejected', (d) => { d.sourceInputs.scheduleB.layers['-1'].currentWindow.pop(); }, (r) => !r.scheduleBConditions.B3);
test('B4 aggregate coverage shortfall is rejected', (d) => { d.sourceInputs.scheduleB.layers['-2'].currentWindow.forEach((row) => { row.receipts = row.obligations * 1.049; }); }, (r) => !r.scheduleBConditions.B4);
test('B4 monthly coverage shortfall is rejected', (d) => { d.sourceInputs.scheduleB.layers['-3'].currentWindow[0].receipts = 29.99; }, (r) => !r.scheduleBConditions.B4);
test('B5 forward coverage shortfall is rejected', (d) => { d.sourceInputs.scheduleB.layers['-1'].forwardCoverageMinimum = 0.999; }, (r) => !r.scheduleBConditions.B5);
test('B6 unpublished monthly data is rejected', (d) => { d.sourceInputs.scheduleB.monthlyDataPublished = false; }, (r) => !r.scheduleBConditions.B6);
test('invalid effective notice is rejected', (d) => { d.authority.effectiveNotice.status = 'INVALID'; }, rejected('notice'));
test('operative LP-073 regression is rejected', (d) => { d.authority.lp073.status = 'OPERATIVE'; }, rejected('notice'));
test('rate-setting LP-075 regression is rejected', (d) => { d.authority.lp075.setsRates = true; }, rejected('notice'));
test('threshold change is rejected', (d) => { d.unchangedCanon.threshold = '$9 million'; }, rejected('notice'));
test('SCM parameter change is rejected', (d) => { d.unchangedCanon.scmParameters = 'CHANGED'; }, rejected('notice'));

let failed = 0;
for (const entry of tests) {
  const data = clone();
  entry.mutate(data);
  let passed = false;
  try { passed = entry.assertion(evaluateCertification(data)) === true; } catch { passed = false; }
  console.log(`  ${passed ? 'PASS' : 'FAIL'} ${entry.name}`);
  if (!passed) failed += 1;
}
console.log(`Path 2 mutation tests — ${tests.length - failed} passed, ${failed} failed`);
if (failed) process.exit(1);
