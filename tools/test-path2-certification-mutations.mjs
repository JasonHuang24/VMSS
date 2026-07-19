#!/usr/bin/env node
import { buildCertificationHtml } from './build-path2-certification-page.mjs';
import { evaluateCertification, loadCertificationSources } from './verify-path2-certification-2294.mjs';

const source = loadCertificationSources();
const cloneValue = (value) => JSON.parse(JSON.stringify(value));
const clone = () => cloneValue(source);
const mutations = [];
const hostile = (category, name, mutate) => mutations.push({ category, name, mutate });

hostile('schema', 'schema version laundering', ({ data }) => { data.schemaVersion = '5.9'; });
hostile('schema', 'extra root field', ({ data }) => { data.certified = true; });
hostile('schema', 'missing source inputs', ({ data }) => { delete data.sourceInputs; });
hostile('schema', 'empty source description', ({ data }) => { data.sourceInputs.description = ''; });
hostile('schema', 'extra Schedule A field', ({ data }) => { data.sourceInputs.scheduleA.override = true; });

hostile('record', 'disposition downgraded', ({ data }) => { data.record.disposition = 'PENDING'; });
hostile('record', 'record title changed', ({ data }) => { data.record.title = 'Unofficial certification'; });
hostile('record', 'record units changed', ({ data }) => { data.record.units = 'nominal credits'; });
hostile('dates', 'invalid calendar date', ({ data }) => { data.record.auditCompleted = '2294-02-30'; });
hostile('dates', 'non-ISO record date', ({ data }) => { data.record.noticePublished = 'December 1, 2294'; });
hostile('dates', 'equal certification dates', ({ data }) => { data.record.scheduleBCertified = data.record.scheduleACertified; });
hostile('dates', 'reversed completion and lock dates', ({ data }) => { data.record.auditDesignLocked = '2294-10-16'; });
hostile('dates', 'wrong effective year', ({ data }) => { data.record.effectiveAt = '2294-12-31'; });
hostile('chronology', 'empty chronology', ({ data }) => { data.chronology = []; });
hostile('chronology', 'missing chronology event', ({ data }) => { data.chronology.pop(); });
hostile('chronology', 'changed refusal-era account', ({ data }) => { data.chronology[1].event = 'Path 2 was refused repeatedly'; });
hostile('chronology', 'invalid year range', ({ data }) => { data.chronology[1].years = '2288–2279'; });
hostile('chronology', 'unordered year', ({ data }) => { data.chronology[4].year = 2280; });

hostile('finding I', 'weakened required coverage mirror', ({ data }) => { data.sourceInputs.findingI.requiredCoverage = 0.9; });
hostile('finding I', 'empty projection vector', ({ data }) => { data.sourceInputs.findingI.projectedCoverageLowerBounds = []; });
hostile('finding I', 'short projection vector', ({ data }) => { data.sourceInputs.findingI.projectedCoverageLowerBounds.pop(); });
hostile('finding I', 'long projection vector', ({ data }) => { data.sourceInputs.findingI.projectedCoverageLowerBounds.push(1.02); });
hostile('finding I', 'nonnumeric projection evidence', ({ data }) => { data.sourceInputs.findingI.projectedCoverageLowerBounds[0] = '1.026'; });
hostile('finding I', 'nonfinite projection evidence', ({ data }) => { data.sourceInputs.findingI.projectedCoverageLowerBounds[0] = Number.NaN; });
hostile('finding I', 'coverage shortfall', ({ data }) => { data.sourceInputs.findingI.projectedCoverageLowerBounds[0] = 0.999; });

hostile('finding II', 'weakened dividend baseline mirror', ({ data }) => { data.sourceInputs.findingII.baselineDividendPerResident = 99; });
hostile('finding II', 'empty dividend vector', ({ data }) => { data.sourceInputs.findingII.projectedDividendLowerBounds = []; });
hostile('finding II', 'mismatched vector cardinality', ({ data }) => { data.sourceInputs.findingII.scheduleEffectLowerBounds.pop(); });
hostile('finding II', 'nonnumeric dividend evidence', ({ data }) => { data.sourceInputs.findingII.projectedDividendLowerBounds[0] = null; });
hostile('finding II', 'dividend impairment', ({ data }) => { data.sourceInputs.findingII.projectedDividendLowerBounds[0] = 99.99; });
hostile('finding II', 'negative schedule effect', ({ data }) => { data.sourceInputs.findingII.scheduleEffectLowerBounds[0] = -0.01; });

hostile('finding III', 'weakened activation baseline mirror', ({ data }) => { data.sourceInputs.findingIII.baselineScmActivationMean = 9; });
hostile('finding III', 'weakened maximum multiple mirror', ({ data }) => { data.sourceInputs.findingIII.maximumMultiple = 2; });
hostile('finding III', 'weakened Flow floor mirror', ({ data }) => { data.sourceInputs.findingIII.requiredMinimumFlow = 0.4; });
hostile('finding III', 'empty activation vector', ({ data }) => { data.sourceInputs.findingIII.projectedActivationUpperBounds = []; });
hostile('finding III', 'short Flow vector', ({ data }) => { data.sourceInputs.findingIII.projectedFlowLowerBounds.pop(); });
hostile('finding III', 'nonnumeric activation evidence', ({ data }) => { data.sourceInputs.findingIII.projectedActivationUpperBounds[0] = {}; });
hostile('finding III', 'activation ceiling breach', ({ data }) => { data.sourceInputs.findingIII.projectedActivationUpperBounds[0] = 10.101; });
hostile('finding III', 'Flow shortfall', ({ data }) => { data.sourceInputs.findingIII.projectedFlowLowerBounds[0] = 0.499; });

hostile('finding IV', 'weakened marginal-value floor mirror', ({ data }) => { data.sourceInputs.findingIV.requiredNetMarginalValue = -1; });
hostile('finding IV', 'weakened event ceiling mirror', ({ data }) => { data.sourceInputs.findingIV.maximumAttributableConcentrationEvents = 1; });
hostile('finding IV', 'strict-floor equality', ({ data }) => { data.sourceInputs.findingIV.netMarginalValueLowerBound = 0; });
hostile('finding IV', 'nonnumeric marginal value', ({ data }) => { data.sourceInputs.findingIV.netMarginalValueLowerBound = '0.42'; });
hostile('finding IV', 'excess concentration event', ({ data }) => { data.sourceInputs.findingIV.attributableConcentrationEventsUpperBound = 1; });

hostile('Schedule A', 'provenance unlocked', ({ data }) => { data.sourceInputs.scheduleA.provenanceLocked = false; });
hostile('Schedule A', 'authored values admitted', ({ data }) => { data.sourceInputs.scheduleA.authoredTriggerValuesExcluded = false; });
hostile('Schedule A', 'weakened A2 threshold mirror', ({ data }) => { data.sourceInputs.scheduleA.mainCurrentCoverageRequired = 1; });
hostile('Schedule A', 'weakened A3 floor mirror', ({ data }) => { data.sourceInputs.scheduleA.mainMonthlyFloorRequired = 0.99; });
hostile('Schedule A', 'weakened A4 floor mirror', ({ data }) => { data.sourceInputs.scheduleA.mainForwardFloorRequired = 0.99; });
hostile('Schedule A', 'weakened A5 threshold mirror', ({ data }) => { data.sourceInputs.scheduleA.dividendAggregateRequired = 1.1; });
hostile('Schedule A', 'weakened A6 floor mirror', ({ data }) => { data.sourceInputs.scheduleA.dividendMonthlyFloorRequired = 0.99; });
hostile('Schedule A', 'A2 current coverage shortfall', ({ data }) => { data.sourceInputs.scheduleA.mainCurrentCoverage = 1.049; });
hostile('Schedule A', 'A3 monthly shortfall', ({ data }) => { data.sourceInputs.scheduleA.mainMonthlyCoverageMinimum = 0.999; });
hostile('Schedule A', 'A4 forward shortfall', ({ data }) => { data.sourceInputs.scheduleA.mainForwardCoverageMinimum = 0.999; });
hostile('Schedule A', 'A5 dividend aggregate shortfall', ({ data }) => { data.sourceInputs.scheduleA.dividendAggregateCoverage = 1.199; });
hostile('Schedule A', 'A6 dividend monthly shortfall', ({ data }) => { data.sourceInputs.scheduleA.dividendMonthlyCoverageMinimum = 0.999; });
hostile('Schedule A', 'cross-credit contamination', ({ data }) => { data.sourceInputs.scheduleA.crossCreditsExcluded = false; });
hostile('Schedule A', 'reproducibility disabled', ({ data }) => { data.sourceInputs.scheduleA.reproducibleFromThisRecord = false; });
hostile('Schedule A', 'nonnumeric coverage', ({ data }) => { data.sourceInputs.scheduleA.mainCurrentCoverage = '1.067'; });

hostile('Schedule B', 'weakened aggregate threshold mirror', ({ data }) => { data.sourceInputs.scheduleB.requiredAggregateCoverage = 1; });
hostile('Schedule B', 'weakened monthly floor mirror', ({ data }) => { data.sourceInputs.scheduleB.requiredMonthlyCoverage = 0.9; });
hostile('Schedule B', 'weakened forward floor mirror', ({ data }) => { data.sourceInputs.scheduleB.requiredForwardCoverage = 0.9; });
hostile('Schedule B', 'empty layers object', ({ data }) => { data.sourceInputs.scheduleB.layers = {}; });
hostile('Schedule B', 'missing exact layer key', ({ data }) => { delete data.sourceInputs.scheduleB.layers['-2']; });
hostile('Schedule B', 'extra layer key', ({ data }) => { data.sourceInputs.scheduleB.layers['-4'] = cloneValue(data.sourceInputs.scheduleB.layers['-3']); });
hostile('Schedule B', 'renamed layer key', ({ data }) => { data.sourceInputs.scheduleB.layers.lower1 = data.sourceInputs.scheduleB.layers['-1']; delete data.sourceInputs.scheduleB.layers['-1']; });
hostile('Schedule B', 'wrong -1 rate', ({ data }) => { data.sourceInputs.scheduleB.layers['-1'].rate = 35; });
hostile('Schedule B', 'wrong -2 rate', ({ data }) => { data.sourceInputs.scheduleB.layers['-2'].rate = 17; });
hostile('Schedule B', 'wrong -3 rate', ({ data }) => { data.sourceInputs.scheduleB.layers['-3'].rate = 8; });
hostile('Schedule B', 'incomplete route reconciliation', ({ data }) => { data.sourceInputs.scheduleB.layers['-1'].routeReconciledFraction = 0.999; });
hostile('Schedule B', 'obligation omission', ({ data }) => { data.sourceInputs.scheduleB.layers['-2'].obligationsEnumerated = false; });
hostile('Schedule B', 'empty monthly observations', ({ data }) => { data.sourceInputs.scheduleB.layers['-3'].currentWindow = []; });
hostile('Schedule B', 'eleven monthly observations', ({ data }) => { data.sourceInputs.scheduleB.layers['-1'].currentWindow.pop(); });
hostile('Schedule B', 'thirteen monthly observations', ({ data }) => { data.sourceInputs.scheduleB.layers['-2'].currentWindow.push({ receipts: 63, obligations: 60 }); });
hostile('Schedule B', 'extra monthly row field', ({ data }) => { data.sourceInputs.scheduleB.layers['-1'].currentWindow[0].month = 1; });
hostile('Schedule B', 'nonnumeric receipts', ({ data }) => { data.sourceInputs.scheduleB.layers['-1'].currentWindow[0].receipts = '106'; });
hostile('Schedule B', 'zero obligations', ({ data }) => { data.sourceInputs.scheduleB.layers['-2'].currentWindow[0].obligations = 0; });
hostile('Schedule B', 'aggregate coverage shortfall', ({ data }) => { data.sourceInputs.scheduleB.layers['-2'].currentWindow.forEach((row) => { row.receipts = row.obligations * 1.049; }); });
hostile('Schedule B', 'monthly coverage shortfall', ({ data }) => { data.sourceInputs.scheduleB.layers['-3'].currentWindow[0].receipts = 29.99; });
hostile('Schedule B', 'forward coverage shortfall', ({ data }) => { data.sourceInputs.scheduleB.layers['-1'].forwardCoverageMinimum = 0.999; });
hostile('Schedule B', 'nonnumeric forward coverage', ({ data }) => { data.sourceInputs.scheduleB.layers['-2'].forwardCoverageMinimum = null; });
hostile('Schedule B', 'prohibited cross-credit contamination', ({ data }) => { data.sourceInputs.scheduleB.prohibitedCrossCreditsExcluded = false; });
hostile('Schedule B', 'layer attribution disabled', ({ data }) => { data.sourceInputs.scheduleB.layerSpecificRevenueAttribution = false; });
hostile('Schedule B', 'monthly data unpublished', ({ data }) => { data.sourceInputs.scheduleB.monthlyDataPublished = false; });
hostile('Schedule B', 'Path 2 quantities not adopted', ({ data }) => { data.sourceInputs.scheduleB.path2AdoptedFiscalQuantities = false; });

hostile('authority', 'LP-073 made operative', ({ data }) => { data.authority.lp073.status = 'OPERATIVE'; });
hostile('authority', 'LP-073 history removed', ({ data }) => { data.authority.lp073.historicalRecordPreserved = false; });
hostile('authority', 'LP-073 schedule rewritten', ({ data }) => { data.authority.lp073.historicalSchedule[0] = 50; });
hostile('authority', 'LP-074 status altered', ({ data }) => { data.authority.lp074.status = 'CONDITIONAL'; });
hostile('authority', 'LP-074 substantive authority denied', ({ data }) => { data.authority.lp074.substantiveRateLaw = false; });
hostile('authority', 'LP-074 active rate altered', ({ data }) => { data.authority.lp074.activeSchedule[3] = 8; });
hostile('authority', 'LP-075 audit duty denied', ({ data }) => { data.authority.lp075.compelsAudit = false; });
hostile('authority', 'LP-075 made rate-setting', ({ data }) => { data.authority.lp075.setsRates = true; });
hostile('authority', 'LP-075 made schedule-activating', ({ data }) => { data.authority.lp075.activatesSchedules = true; });
hostile('authority', 'embedded notice invalidated', ({ data }) => { data.authority.effectiveNotice.status = 'INVALID'; });
hostile('authority', 'notice record redirected', ({ data }) => { data.authority.effectiveNotice.record = 'documents/other.json'; });

hostile('unchanged canon', 'threshold altered', ({ data }) => { data.unchangedCanon.threshold = '$9 million'; });
hostile('unchanged canon', 'SCM parameters altered', ({ data }) => { data.unchangedCanon.scmParameters = 'CHANGED'; });
hostile('unchanged canon', 'currency siloing altered', ({ data }) => { data.unchangedCanon.currencySiloing = 'CHANGED'; });
hostile('unchanged canon', 'upper asset restrictions altered', ({ data }) => { data.unchangedCanon.upperLayerSpeculativeAssetRestrictions = 'CHANGED'; });
hostile('unchanged canon', 'lower market rules altered', ({ data }) => { data.unchangedCanon.lowerLayerPropertyAndMarketRules = 'CHANGED'; });
hostile('unchanged canon', 'upper SCM scope broadened', ({ data }) => { data.unchangedCanon.scmScope.sanctuaryAndMain = 'all layers'; });
hostile('unchanged canon', 'Lower -1 SCM scope altered', ({ data }) => { data.unchangedCanon.scmScope.lower1 = 'universal SCM'; });
hostile('unchanged canon', 'Lower -2/-3 SCM scope broadened', ({ data }) => { data.unchangedCanon.scmScope.lower2AndLower3 = 'all private gains'; });
hostile('unchanged canon', 'private gains included', ({ data }) => { data.unchangedCanon.scmScope.excludedPrivateGains = false; });

hostile('external notice', 'notice object emptied', ({ notice }) => { Object.keys(notice).forEach((key) => delete notice[key]); });
hostile('external notice', 'artifact type altered', ({ notice }) => { notice.artifactType = 'DRAFT'; });
hostile('external notice', 'invalid publication timestamp', ({ notice }) => { notice.publishedAt = '2294-13-01T12:00:00Z'; });
hostile('external notice', 'publication moved after effect', ({ notice }) => { notice.publishedAt = '2295-01-02T12:00:00Z'; });
hostile('external notice', 'effective timestamp altered', ({ notice }) => { notice.effectiveAt = '2295-02-01T00:00:00Z'; });
hostile('external notice', 'Schedule A status altered', ({ notice }) => { notice.scheduleA = 'PENDING'; });
hostile('external notice', 'Schedule B status altered', ({ notice }) => { notice.scheduleB = 'PENDING'; });
hostile('external notice', 'Main rate altered', ({ notice }) => { notice.rates.sanctuaryAndMain = 70; });
hostile('external notice', 'Lower -1 rate altered', ({ notice }) => { notice.rates.lower1 = 35; });
hostile('external notice', 'Lower -2 rate altered', ({ notice }) => { notice.rates.lower2 = 17; });
hostile('external notice', 'Lower -3 rate altered', ({ notice }) => { notice.rates.lower3 = 8; });
hostile('external notice', 'LP-073 authority altered', ({ notice }) => { notice.lp073 = 'OPERATIVE'; });
hostile('external notice', 'LP-075 authority altered', ({ notice }) => { notice.lp075 = 'RATE_SETTING'; });
hostile('external notice', 'threshold altered', ({ notice }) => { notice.threshold = '$9 million — changed'; });
hostile('external notice', 'SCM status altered', ({ notice }) => { notice.scm = 'expanded to all layers'; });
hostile('external notice', 'notice validity altered', ({ notice }) => { notice.status = 'INVALID'; });

let failures = 0;
const positiveResult = evaluateCertification(source.data, source.notice);
let positiveHtml = '';
try { positiveHtml = buildCertificationHtml(source.data, source.notice); } catch { positiveHtml = ''; }
const positivePassed = positiveResult.certified && positiveHtml.includes('SCHEDULES A AND B CERTIFIED');
console.log(`  ${positivePassed ? 'PASS' : 'FAIL'} positive control certifies and generates`);
if (!positivePassed) failures += 1;

for (const entry of mutations) {
  const candidate = clone();
  entry.mutate(candidate);
  let rejectedByVerifier = false;
  let rejectedByGenerator = false;
  try { rejectedByVerifier = evaluateCertification(candidate.data, candidate.notice).certified === false; } catch { rejectedByVerifier = true; }
  try { buildCertificationHtml(candidate.data, candidate.notice); } catch { rejectedByGenerator = true; }
  const passed = rejectedByVerifier && rejectedByGenerator;
  console.log(`  ${passed ? 'PASS' : 'FAIL'} [${entry.category}] ${entry.name}`);
  if (!passed) failures += 1;
}

const rejected = mutations.length - (failures - (positivePassed ? 0 : 1));
console.log(`Path 2 hostile mutation suite — ${rejected} hostile mutations rejected, ${mutations.length - rejected} accepted; positive control ${positivePassed ? 'passed' : 'failed'}`);
if (failures) process.exit(1);
