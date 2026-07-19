#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA_FILE = 'documents/path-2-certification-2294-data.json';
const EXPECTED_RATES = { sanctuaryAndMain: 50, '-1': 25, '-2': 12.5, '-3': 6.25 };

const minimum = (values) => Math.min(...values.map(Number));
const maximum = (values) => Math.max(...values.map(Number));
const ratio = (rows) => rows.reduce((sum, row) => sum + Number(row.receipts), 0)
  / rows.reduce((sum, row) => sum + Number(row.obligations), 0);

export function evaluateCertification(data) {
  const s = data.sourceInputs;
  const layers = s.scheduleB.layers;

  const findings = {
    I: minimum(s.findingI.projectedCoverageLowerBounds) >= s.findingI.requiredCoverage,
    II: s.findingII.projectedDividendLowerBounds.every((value, index) =>
      value >= s.findingII.baselineDividendPerResident
      && s.findingII.scheduleEffectLowerBounds[index] >= 0),
    III: maximum(s.findingIII.projectedActivationUpperBounds)
      <= s.findingIII.baselineScmActivationMean * s.findingIII.maximumMultiple
      && minimum(s.findingIII.projectedFlowLowerBounds) >= s.findingIII.requiredMinimumFlow,
    IV: s.findingIV.netMarginalValueLowerBound > s.findingIV.requiredNetMarginalValue
      && s.findingIV.attributableConcentrationEventsUpperBound
        <= s.findingIV.maximumAttributableConcentrationEvents,
  };

  const a = s.scheduleA;
  const scheduleAConditions = {
    A1: a.provenanceLocked === true && a.authoredTriggerValuesExcluded === true,
    A2: a.mainCurrentCoverage >= a.mainCurrentCoverageRequired,
    A3: a.mainMonthlyCoverageMinimum >= a.mainMonthlyFloorRequired,
    A4: a.mainForwardCoverageMinimum >= a.mainForwardFloorRequired,
    A5: a.dividendAggregateCoverage >= a.dividendAggregateRequired,
    A6: a.dividendMonthlyCoverageMinimum >= a.dividendMonthlyFloorRequired,
    A7: a.crossCreditsExcluded === true,
    A8: a.reproducibleFromThisRecord === true,
  };
  const scheduleACertified = Object.values(findings).every(Boolean)
    && Object.values(scheduleAConditions).every(Boolean);

  const layerEntries = Object.entries(layers);
  const scheduleBConditions = {
    B1: layerEntries.every(([, layer]) => layer.routeReconciledFraction === 1),
    B2: layerEntries.every(([, layer]) => layer.obligationsEnumerated === true),
    B3: layerEntries.every(([name, layer]) => layer.rate === EXPECTED_RATES[name]
      && layer.currentWindow.length === 12
      && layer.currentWindow.every((row) => row.receipts > 0 && row.obligations > 0))
      && s.scheduleB.prohibitedCrossCreditsExcluded === true
      && s.scheduleB.layerSpecificRevenueAttribution === true,
    B4: layerEntries.every(([, layer]) => ratio(layer.currentWindow)
      >= s.scheduleB.requiredAggregateCoverage
      && minimum(layer.currentWindow.map((row) => row.receipts / row.obligations))
        >= s.scheduleB.requiredMonthlyCoverage),
    B5: layerEntries.every(([, layer]) => layer.forwardCoverageMinimum
      >= s.scheduleB.requiredForwardCoverage),
    B6: s.scheduleB.monthlyDataPublished === true
      && s.scheduleB.path2AdoptedFiscalQuantities === true,
  };
  const scheduleBCertified = scheduleACertified && Object.values(scheduleBConditions).every(Boolean);

  const authority = data.authority;
  const notice = authority.effectiveNotice.status === 'VALID'
    && data.record.effectiveAt.startsWith('2295')
    && authority.lp074.substantiveRateLaw === true
    && authority.lp074.activeSchedule.join(' / ') === '50 / 25 / 12.5 / 6.25'
    && authority.lp073.status === 'SUPERSEDED_IN_2295'
    && authority.lp075.compelsAudit === true
    && authority.lp075.setsRates === false
    && authority.lp075.activatesSchedules === false
    && data.unchangedCanon.threshold === '$10 million'
    && data.unchangedCanon.scmParameters === 'UNCHANGED';

  return {
    findings,
    scheduleAConditions,
    scheduleACertified,
    scheduleBConditions,
    scheduleBCertified,
    notice,
    metrics: {
      findingICoverageMinimum: minimum(s.findingI.projectedCoverageLowerBounds),
      findingIIIActivationCeiling: s.findingIII.baselineScmActivationMean * s.findingIII.maximumMultiple,
      findingIIIActivationUpperBound: maximum(s.findingIII.projectedActivationUpperBounds),
      findingIIIFlowMinimum: minimum(s.findingIII.projectedFlowLowerBounds),
      scheduleBCoverage: Object.fromEntries(layerEntries.map(([name, layer]) => [name, ratio(layer.currentWindow)])),
    },
  };
}

function printResult(result) {
  for (const finding of ['I', 'II', 'III', 'IV']) {
    console.log(`Finding ${finding}: ${result.findings[finding] ? 'PASS' : 'FAIL'}`);
  }
  console.log('');
  console.log(`Schedule A: ${result.scheduleACertified ? 'CERTIFIED' : 'NOT CERTIFIED'}`);
  console.log('');
  for (const condition of ['B1', 'B2', 'B3', 'B4', 'B5', 'B6']) {
    console.log(`${condition}: ${result.scheduleBConditions[condition] ? 'PASS' : 'FAIL'}`);
  }
  console.log('');
  console.log(`Schedule B: ${result.scheduleBCertified ? 'CERTIFIED' : 'NOT CERTIFIED'}`);
  console.log(`Effective notice: ${result.notice ? 'VALID' : 'INVALID'}`);
  console.log('Active schedule from 2295: 50 / 25 / 12.5 / 6.25');
  console.log('LP-073 status: SUPERSEDED');
  console.log('LP-075 status: PROCEDURAL ONLY');
  console.log('SCM parameters: UNCHANGED');
  console.log('$10 million threshold: UNCHANGED');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  let data;
  try {
    data = JSON.parse(readFileSync(join(ROOT, DATA_FILE), 'utf8'));
  } catch (error) {
    console.error(`Unable to read ${DATA_FILE}: ${error.message}`);
    process.exit(1);
  }
  const result = evaluateCertification(data);
  printResult(result);
  if (!result.scheduleACertified || !result.scheduleBCertified || !result.notice) process.exit(1);
}
