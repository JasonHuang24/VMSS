#!/usr/bin/env node
import { buildCertificationHtml } from './build-path2-certification-page.mjs';
import { evaluateCertification, loadCertificationSources } from './verify-path2-certification-2294.mjs';

const source = loadCertificationSources();
const cloneValue = (value) => JSON.parse(JSON.stringify(value));
const clone = () => cloneValue(source);
const mutations = [];
const hostile = (category, name, mutate) => mutations.push({ category, name, mutate });

const hostileLeafValue = (value) => {
  if (typeof value === 'string') return '';
  if (typeof value === 'number') return Number.NaN;
  if (typeof value === 'boolean') return !value;
  return null;
};

// Attack every committed primitive field, including every annual/monthly value and
// every provenance reference. Structural cases below attack counts and ordering.
const enumerateLeafMutations = (value, rootName, path = []) => {
  if (Array.isArray(value)) {
    value.forEach((item, index) => enumerateLeafMutations(item, rootName, [...path, index]));
    return;
  }
  if (value !== null && typeof value === 'object') {
    Object.entries(value).forEach(([key, item]) => enumerateLeafMutations(item, rootName, [...path, key]));
    return;
  }
  hostile('exhaustive leaf', `${rootName}.${path.join('.')}`, (candidate) => {
    let target = candidate[rootName];
    for (let index = 0; index < path.length - 1; index += 1) target = target[path[index]];
    target[path.at(-1)] = hostileLeafValue(value);
  });
};
enumerateLeafMutations(source.data, 'data');
enumerateLeafMutations(source.notice, 'notice');

hostile('schema', 'extra root declaration', ({ data }) => { data.certified = true; });
hostile('schema', 'missing sourceInputs', ({ data }) => { delete data.sourceInputs; });
hostile('schema', 'threshold smuggled into annual evidence', ({ data }) => { data.sourceInputs.requiredCoverage = 0; });
hostile('schema', 'threshold smuggled into Schedule A', ({ data }) => { data.sourceInputs.scheduleA.requiredCoverage = 0; });
hostile('schema', 'threshold smuggled into Schedule B', ({ data }) => { data.sourceInputs.scheduleB.requiredCoverage = 0; });

const annual = (candidate) => candidate.data.sourceInputs.annualHorizon;
hostile('annual count', 'zero annual observations', (candidate) => { candidate.data.sourceInputs.annualHorizon = []; });
hostile('annual count', 'six annual observations', (candidate) => { candidate.data.sourceInputs.annualHorizon = annual(candidate).slice(0, 6); });
hostile('annual count', 'twenty-nine annual observations', (candidate) => { annual(candidate).pop(); });
hostile('annual count', 'thirty-one annual observations', (candidate) => { annual(candidate).push(cloneValue(annual(candidate).at(-1))); });
hostile('annual keys', 'duplicate year', (candidate) => { annual(candidate)[15].year = annual(candidate)[14].year; });
hostile('annual keys', 'missing middle year', (candidate) => { annual(candidate)[15].year = 2311; });
hostile('annual keys', 'unordered years', (candidate) => { [annual(candidate)[5], annual(candidate)[6]] = [annual(candidate)[6], annual(candidate)[5]]; });
hostile('annual keys', 'start year out of range', (candidate) => { annual(candidate)[0].year = 2294; });
hostile('annual keys', 'end year out of range', (candidate) => { annual(candidate)[29].year = 2325; });
hostile('annual keys', 'extra annual row field', (candidate) => { annual(candidate)[0].pass = true; });
hostile('annual provenance', 'empty annual registry', ({ data }) => { data.sourceInputs.annualProvenanceRegistry = []; });
hostile('annual provenance', 'unregistered annual reference', (candidate) => { annual(candidate)[14].provenanceId = 'UNREGISTERED'; });

const findingFailures = {
  I: (row) => { row.coverageLowerBound = 0.999; },
  II: (row) => { row.dividendPerResidentLowerBound = 99.99; },
  III: (row) => { row.scmActivationUpperBound = 10.101; },
  IV: (row) => { row.netMarginalValueLowerBound = 0; },
};
for (const [finding, mutate] of Object.entries(findingFailures)) {
  for (const [label, index] of [['year 1', 0], ['middle year', 14], ['year 30', 29]]) {
    hostile(`Finding ${finding}`, `${label} failure`, (candidate) => mutate(annual(candidate)[index]));
  }
}
hostile('Finding II', 'negative schedule effect', (candidate) => { annual(candidate)[14].scheduleEffectLowerBound = -0.01; });
hostile('Finding III', 'Flow shortfall', (candidate) => { annual(candidate)[14].flowLowerBound = 0.499; });
hostile('Finding IV', 'concentration event', (candidate) => { annual(candidate)[14].attributableConcentrationEventsUpperBound = 1; });
hostile('Finding I equality', 'coverage exactly at 1.00 strict floor', (candidate) => { annual(candidate)[14].coverageLowerBound = 1; });
hostile('Finding II equality', 'dividend exactly at baseline', (candidate) => { annual(candidate)[14].dividendPerResidentLowerBound = 100; });
hostile('Finding II equality', 'schedule effect exactly at zero floor', (candidate) => { annual(candidate)[14].scheduleEffectLowerBound = 0; });
hostile('Finding III equality', 'activation exactly at 1.25x ceiling', (candidate) => { annual(candidate)[14].scmActivationUpperBound = 10.1; });
hostile('Finding III equality', 'Flow exactly at floor', (candidate) => { annual(candidate)[14].flowLowerBound = 0.5; });
hostile('Finding IV equality', 'net marginal value exactly at strict floor', (candidate) => { annual(candidate)[14].netMarginalValueLowerBound = 0; });

const a = (candidate) => candidate.data.sourceInputs.scheduleA;
for (const [window, expected] of [['mainCurrentWindow', 12], ['mainForwardWindow', 36], ['dividendWindow', 36]]) {
  hostile('Schedule A periods', `${window} zero rows`, (candidate) => { a(candidate)[window] = []; });
  hostile('Schedule A periods', `${window} short`, (candidate) => { a(candidate)[window].pop(); });
  hostile('Schedule A periods', `${window} long`, (candidate) => { a(candidate)[window].push(cloneValue(a(candidate)[window].at(-1))); });
  hostile('Schedule A identifiers', `${window} duplicate month`, (candidate) => { a(candidate)[window][1].month = a(candidate)[window][0].month; });
  hostile('Schedule A identifiers', `${window} unordered month`, (candidate) => { [a(candidate)[window][0], a(candidate)[window][1]] = [a(candidate)[window][1], a(candidate)[window][0]]; });
  hostile('Schedule A identifiers', `${window} out-of-range month`, (candidate) => { a(candidate)[window][expected - 1].month = '2299-01'; });
}
hostile('Schedule A schema', 'extra current row field', (candidate) => { a(candidate).mainCurrentWindow[0].override = true; });
hostile('Schedule A schema', 'extra forward row field', (candidate) => { a(candidate).mainForwardWindow[0].override = true; });
hostile('Schedule A schema', 'extra dividend row field', (candidate) => { a(candidate).dividendWindow[0].override = true; });
hostile('Schedule A provenance', 'missing transform', (candidate) => { a(candidate).transformRegistry.pop(); });
hostile('Schedule A provenance', 'duplicate source ID', (candidate) => { a(candidate).provenanceRegistry[1].sourceId = a(candidate).provenanceRegistry[0].sourceId; });
hostile('Schedule A provenance', 'forbidden source class', (candidate) => { a(candidate).provenanceRegistry[0].sourceClass = 'MAIN_TAX_CROSS_CREDIT'; });
hostile('Schedule A provenance', 'malformed lock date', (candidate) => { a(candidate).provenanceRegistry[0].lockedAt = '2292-02-30'; });
hostile('vintage guard', 'completed source observed after cutoff', (candidate) => { a(candidate).provenanceRegistry[0].observedThrough = '2292-01-02'; });
hostile('vintage guard', 'completed source published at lock', (candidate) => { a(candidate).provenanceRegistry[0].publishedAt = '2292-02-15'; });
hostile('vintage guard', 'completed source vintage at lock', (candidate) => { a(candidate).provenanceRegistry[0].vintageAt = '2292-02-15'; });
hostile('vintage guard', 'completed source mislabeled projection', (candidate) => { a(candidate).provenanceRegistry[0].evidenceClass = 'PREREGISTERED_PROJECTION'; });
hostile('vintage guard', 'projection input after cutoff', (candidate) => { a(candidate).provenanceRegistry[2].inputCutoff = '2292-01-02'; });
hostile('vintage guard', 'projection transformation after lock', (candidate) => { a(candidate).provenanceRegistry[2].transformationLockedAt = '2292-02-16'; });
hostile('vintage guard', 'Main completed month after cutoff', (candidate) => { a(candidate).mainCurrentWindow[11].month = '2292-01'; a(candidate).mainCurrentWindow[11].date = '2292-01-01'; });
hostile('vintage guard', 'dividend completed month after cutoff', (candidate) => { a(candidate).dividendWindow[35].month = '2292-01'; a(candidate).dividendWindow[35].date = '2292-01-01'; });
hostile('Schedule A provenance', 'authored trigger source', (candidate) => { a(candidate).mainCurrentWindow[0].t50SourceId = 'AUTHOR-TRIGGER'; });
hostile('Schedule A plausible field', 'small valid-looking adjustment change', (candidate) => { a(candidate).mainCurrentWindow[5].adjustment = 1.001; });
hostile('Schedule A plausible field', 'small valid-looking weight change', (candidate) => { a(candidate).mainCurrentWindow[5].weight = 0.999; });
hostile('Schedule A raw evidence', 'A2 aggregate shortfall', (candidate) => { a(candidate).mainCurrentWindow.forEach((row) => { row.t50 = row.m * 1.049; }); });
hostile('Schedule A raw evidence', 'A3 current month shortfall', (candidate) => { a(candidate).mainCurrentWindow[6].t50 = 99.9; });
hostile('Schedule A raw evidence', 'A4 forward month shortfall', (candidate) => { a(candidate).mainForwardWindow[18].t50 = 99.9; });
hostile('Schedule A raw evidence', 'A5 ADT-36 shortfall', (candidate) => { a(candidate).dividendWindow.forEach((row) => { row.a = row.d * 1.199; }); });
hostile('Schedule A raw evidence', 'A6 dividend month shortfall', (candidate) => { a(candidate).dividendWindow[18].a = 99.9; });
hostile('Schedule A recomputation', 'plausible but false Main-12', (candidate) => { a(candidate).reportedMetrics.main12 = 1.068; });
hostile('Schedule A recomputation', 'plausible but false dividend minimum', (candidate) => { a(candidate).reportedMetrics.dividendMinimum = 1.012; });
hostile('Main forward digest', 'in-range numerator change', (candidate) => { a(candidate).mainForwardWindow[5].t50 += 0.01; });
hostile('Main forward digest', 'in-range denominator change', (candidate) => { a(candidate).mainForwardWindow[5].m += 0.01; });
hostile('Main forward digest', 'non-minimum month change preserving minimum', (candidate) => { a(candidate).mainForwardWindow[20].t50 += 0.01; });
hostile('Main forward digest', 'compensated numerator changes preserve aggregate and minimum', (candidate) => {
  a(candidate).mainForwardWindow[1].t50 += 0.01;
  a(candidate).mainForwardWindow[2].t50 -= 0.01;
});
hostile('Main forward digest', 'ordered identifiers with payloads exchanged', (candidate) => {
  const first = a(candidate).mainForwardWindow[1].t50;
  a(candidate).mainForwardWindow[1].t50 = a(candidate).mainForwardWindow[2].t50;
  a(candidate).mainForwardWindow[2].t50 = first;
});
hostile('Main forward digest', 'reordered complete months', (candidate) => {
  [a(candidate).mainForwardWindow[1], a(candidate).mainForwardWindow[2]]
    = [a(candidate).mainForwardWindow[2], a(candidate).mainForwardWindow[1]];
});
hostile('Main forward digest', 'valid-looking source substitution', (candidate) => { a(candidate).mainForwardWindow[5].t50SourceId = 'MAIN-CURRENT-T50'; });
hostile('Main forward digest', 'valid-looking provenance document revision', (candidate) => { a(candidate).provenanceRegistry[2].documentId = 'MAIN-PROJECTION-2295-2297-T50-REV-A'; });
hostile('Main forward digest', 'injected valid-looking adjustment field', (candidate) => { a(candidate).mainForwardWindow[5].adjustment = 1.001; });
hostile('Main forward digest', 'injected valid-looking weight field', (candidate) => { a(candidate).mainForwardWindow[5].weight = 0.999; });

const b = (candidate) => candidate.data.sourceInputs.scheduleB;
hostile('Schedule B schema', 'empty layer map', (candidate) => { b(candidate).layers = {}; });
hostile('Schedule B schema', 'missing layer', (candidate) => { delete b(candidate).layers['-2']; });
hostile('Schedule B schema', 'extra layer', (candidate) => { b(candidate).layers['-4'] = cloneValue(b(candidate).layers['-3']); });
hostile('Schedule B provenance', 'missing provenance entry', (candidate) => { b(candidate).provenanceRegistry.pop(); });
hostile('Schedule B provenance', 'duplicate provenance source ID', (candidate) => { b(candidate).provenanceRegistry[1].sourceId = b(candidate).provenanceRegistry[0].sourceId; });
hostile('Schedule B provenance', 'forbidden source class', (candidate) => { b(candidate).provenanceRegistry[0].sourceClass = 'OTHER_LAYER_RECEIPTS'; });
hostile('vintage guard', 'Lower completed source after cutoff', (candidate) => { b(candidate).provenanceRegistry[0].observedThrough = '2292-01-02'; });
hostile('vintage guard', 'Lower projection input after cutoff', (candidate) => { b(candidate).provenanceRegistry[2].inputCutoff = '2292-01-02'; });

for (const layerName of ['-1', '-2', '-3']) {
  const layer = (candidate) => b(candidate).layers[layerName];
  const forwardProvenanceIndex = { '-1': 2, '-2': 6, '-3': 10 }[layerName];
  for (const [window, expected] of [['currentWindow', 12], ['forwardWindow', 36]]) {
    hostile('Schedule B periods', `${layerName} ${window} zero rows`, (candidate) => { layer(candidate)[window] = []; });
    hostile('Schedule B periods', `${layerName} ${window} short`, (candidate) => { layer(candidate)[window].pop(); });
    hostile('Schedule B periods', `${layerName} ${window} long`, (candidate) => { layer(candidate)[window].push(cloneValue(layer(candidate)[window].at(-1))); });
    hostile('Schedule B identifiers', `${layerName} ${window} duplicate month`, (candidate) => { layer(candidate)[window][1].month = layer(candidate)[window][0].month; });
    hostile('Schedule B identifiers', `${layerName} ${window} unordered month`, (candidate) => { [layer(candidate)[window][0], layer(candidate)[window][1]] = [layer(candidate)[window][1], layer(candidate)[window][0]]; });
    hostile('Schedule B identifiers', `${layerName} ${window} out-of-range month`, (candidate) => { layer(candidate)[window][expected - 1].month = '2299-01'; });
    hostile('Schedule B provenance', `${layerName} ${window} unknown receipts source`, (candidate) => { layer(candidate)[window][0].receiptsSourceId = 'UNKNOWN'; });
    hostile('Schedule B provenance', `${layerName} ${window} unknown obligations source`, (candidate) => { layer(candidate)[window][0].obligationsSourceId = 'UNKNOWN'; });
  }
  hostile('Schedule B schema', `${layerName} extra monthly field`, (candidate) => { layer(candidate).currentWindow[0].override = true; });
  hostile('Schedule B B1', `${layerName} missing route destination`, (candidate) => { layer(candidate).routeMap.destinations.pop(); });
  hostile('Schedule B B1', `${layerName} extra route destination`, (candidate) => { layer(candidate).routeMap.destinations.push({ destinationId: 'EXTRA', name: 'Extra', amount: 1 }); });
  hostile('Schedule B B1', `${layerName} duplicate route destination`, (candidate) => { layer(candidate).routeMap.destinations[1].destinationId = layer(candidate).routeMap.destinations[0].destinationId; });
  hostile('Schedule B B1', `${layerName} unreconciled route total`, (candidate) => { layer(candidate).routeMap.destinations[1].amount += 0.1; });
  hostile('Schedule B B1', `${layerName} audited total mismatch`, (candidate) => { layer(candidate).routeMap.auditedCollectionTotal += 0.1; });
  hostile('Schedule B B2', `${layerName} omitted obligation`, (candidate) => { layer(candidate).obligationMap.obligations.pop(); });
  hostile('Schedule B B2', `${layerName} extra obligation`, (candidate) => { layer(candidate).obligationMap.obligations.push(cloneValue(layer(candidate).obligationMap.obligations[0])); });
  hostile('Schedule B B2', `${layerName} duplicate obligation ID`, (candidate) => { layer(candidate).obligationMap.obligations[1].obligationId = layer(candidate).obligationMap.obligations[0].obligationId; });
  hostile('Schedule B B2', `${layerName} payment order gap`, (candidate) => { layer(candidate).obligationMap.obligations[2].paymentOrder = 4; });
  hostile('Schedule B B2', `${layerName} wrong funding destination`, (candidate) => { layer(candidate).obligationMap.obligations[0].fundingDestinationId = 'OTHER'; });
  hostile('Schedule B B2', `${layerName} obligation total mismatch`, (candidate) => { layer(candidate).obligationMap.obligations[0].amount += 1; });
  hostile('Schedule B B2', `${layerName} missing non-tax source`, (candidate) => { layer(candidate).obligationMap.nonTaxSources.pop(); });
  hostile('Schedule B B2', `${layerName} non-tax source nonzero`, (candidate) => { layer(candidate).obligationMap.nonTaxSources[0].availableAmount = 0.01; });
  hostile('Schedule B B4', `${layerName} aggregate shortfall`, (candidate) => { layer(candidate).currentWindow.forEach((row) => { row.receipts = row.obligations * 1.049; }); });
  hostile('Schedule B B4', `${layerName} current weakest shortfall`, (candidate) => { layer(candidate).currentWindow[6].receipts = layer(candidate).currentWindow[6].obligations * 0.999; });
  hostile('Schedule B B5', `${layerName} forward weakest shortfall`, (candidate) => { layer(candidate).forwardWindow[18].receipts = layer(candidate).forwardWindow[18].obligations * 0.999; });
  hostile('Schedule B recomputation', `${layerName} false aggregate metric`, (candidate) => { layer(candidate).reportedMetrics.currentAggregate += 0.001; });
  hostile('Schedule B recomputation', `${layerName} false forward metric`, (candidate) => { layer(candidate).reportedMetrics.forwardMinimum += 0.001; });
  hostile('Lower forward digest', `${layerName} in-range numerator change`, (candidate) => { layer(candidate).forwardWindow[5].receipts += 0.01; });
  hostile('Lower forward digest', `${layerName} in-range denominator change`, (candidate) => { layer(candidate).forwardWindow[5].obligations += 0.01; });
  hostile('Lower forward digest', `${layerName} non-minimum month change preserving minimum`, (candidate) => { layer(candidate).forwardWindow[20].receipts += 0.01; });
  hostile('Lower forward digest', `${layerName} compensated numerator changes preserve aggregate and minimum`, (candidate) => {
    layer(candidate).forwardWindow[1].receipts += 0.01;
    layer(candidate).forwardWindow[2].receipts -= 0.01;
  });
  hostile('Lower forward digest', `${layerName} ordered identifiers with payloads exchanged`, (candidate) => {
    const first = layer(candidate).forwardWindow[1].receipts;
    layer(candidate).forwardWindow[1].receipts = layer(candidate).forwardWindow[2].receipts;
    layer(candidate).forwardWindow[2].receipts = first;
  });
  hostile('Lower forward digest', `${layerName} reordered complete months`, (candidate) => {
    [layer(candidate).forwardWindow[1], layer(candidate).forwardWindow[2]]
      = [layer(candidate).forwardWindow[2], layer(candidate).forwardWindow[1]];
  });
  hostile('Lower forward digest', `${layerName} valid-looking source substitution`, (candidate) => { layer(candidate).forwardWindow[5].receiptsSourceId = layer(candidate).currentWindow[5].receiptsSourceId; });
  hostile('Lower forward digest', `${layerName} valid-looking provenance document revision`, (candidate) => { b(candidate).provenanceRegistry[forwardProvenanceIndex].documentId += '-REV-A'; });
  hostile('Lower forward digest', `${layerName} injected valid-looking adjustment field`, (candidate) => { layer(candidate).forwardWindow[5].adjustment = 1.001; });
  hostile('Lower forward digest', `${layerName} injected valid-looking weight field`, (candidate) => { layer(candidate).forwardWindow[5].weight = 0.999; });
}

hostile('Schedule B adoption', 'missing adoption record', (candidate) => { delete b(candidate).adoptionRecord; });
hostile('Schedule B adoption', 'partial B scope', (candidate) => { b(candidate).adoptionRecord.scope.pop(); });
hostile('Schedule B adoption', 'wrong adopted authority', (candidate) => { b(candidate).adoptionRecord.authority = 'LP-075'; });
hostile('Schedule B adoption', 'omitted adopted layer', (candidate) => { b(candidate).adoptionRecord.layers.pop(); });
hostile('external notice', 'notice object emptied', ({ notice }) => { Object.keys(notice).forEach((key) => delete notice[key]); });
hostile('plausible date', 'valid adjacent audit completion date', ({ data }) => { data.record.auditCompleted = '2294-10-16'; });
hostile('plausible date', 'valid adjacent effective date', ({ data }) => { data.record.effectiveAt = '2295-01-02'; });
hostile('plausible date', 'valid adjacent monthly observation date', (candidate) => { a(candidate).mainCurrentWindow[5].date = '2291-06-02'; });
hostile('plausible date', 'valid adjacent provenance lock date', (candidate) => { a(candidate).provenanceRegistry[0].lockedAt = '2292-02-16'; });
hostile('plausible date', 'valid adjacent notice timestamp', ({ notice }) => { notice.publishedAt = '2294-12-02T12:00:00Z'; });
hostile('plausible authority', 'small active Main rate change', ({ data }) => { data.authority.lp074.activeSchedule[0] = 50.01; });
hostile('plausible authority', 'small historical Main rate change', ({ data }) => { data.authority.lp073.historicalSchedule[0] = 69.99; });
hostile('plausible authority', 'procedural status revision', ({ data }) => { data.authority.lp075.status = 'ENACTED_PROCEDURAL_DUTY_PENDING'; });
hostile('plausible numeric', 'small current receipt change', (candidate) => { b(candidate).layers['-1'].currentWindow[5].receipts += 0.001; });
hostile('plausible numeric', 'small route amount change', (candidate) => { b(candidate).layers['-2'].routeMap.destinations[1].amount += 0.001; });

let failures = 0;
const positiveResult = evaluateCertification(source.data, source.notice);
let positiveHtml = '';
try { positiveHtml = buildCertificationHtml(source.data, source.notice); } catch { positiveHtml = ''; }
const positivePassed = positiveResult.certified
  && positiveResult.annualObservationCount === 30
  && positiveHtml.includes('SCHEDULES A AND B CERTIFIED')
  && positiveHtml.includes('exactly 30 keyed annual observations')
  && positiveHtml.includes('Main-12 106.7%')
  && positiveHtml.includes('ADT-36 122.4%')
  && positiveHtml.includes('complete ordered window SHA-256-attested');
console.log(`  ${positivePassed ? 'PASS' : 'FAIL'} positive control certifies and generates complete evidence`);
if (!positivePassed) failures += 1;

for (const entry of mutations) {
  const candidate = clone();
  entry.mutate(candidate);
  let rejectedByVerifier = false;
  let rejectedByGenerator = false;
  try { rejectedByVerifier = evaluateCertification(candidate.data, candidate.notice).certified === false; } catch { rejectedByVerifier = true; }
  try { buildCertificationHtml(candidate.data, candidate.notice); } catch { rejectedByGenerator = true; }
  if (!(rejectedByVerifier && rejectedByGenerator)) {
    failures += 1;
    console.error(`  FAIL [${entry.category}] ${entry.name}: verifier=${rejectedByVerifier}, generator=${rejectedByGenerator}`);
  }
}

const accepted = failures - (positivePassed ? 0 : 1);
const rejected = mutations.length - accepted;
console.log(`Path 2 hostile mutation suite — ${rejected} hostile mutations rejected, ${accepted} accepted; positive control ${positivePassed ? 'passed' : 'failed'}`);
if (failures) process.exit(1);
