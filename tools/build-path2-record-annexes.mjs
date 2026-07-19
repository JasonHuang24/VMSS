#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { evaluateCertification, loadCertificationSources } from './verify-path2-certification-2294.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = join(ROOT, 'documents');
const CHECK = process.argv.includes('--check');
const outputPaths = {
  restatement: join(DOCS, 'path-2-charter-restatement-2292-data.json'),
  lower: join(DOCS, 'path-2-lower-incidence-certificate-2294-data.json'),
  compendium: join(DOCS, 'path-2-section-11-compendium-2294-annex.json'),
  registrar: join(DOCS, 'path-2-registrar-execution-2294-data.json'),
  review: join(DOCS, 'lp-075-section-13-review-set-data.json'),
};

const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');
const digestFile = (path) => ({
  algorithm: 'sha256',
  digest: sha256(readFileSync(path)),
  bytes: readFileSync(path).length,
});
const stableJson = (value) => `${JSON.stringify(value, null, 2)}\n`;
const writeOrCheck = (path, value) => {
  const expected = stableJson(value);
  if (CHECK) {
    if (!existsSync(path) || readFileSync(path, 'utf8') !== expected) {
      throw new Error(`${path} is stale; rebuild the Path 2 record annexes`);
    }
  } else {
    writeFileSync(path, expected, 'utf8');
  }
};
const minimum = (values) => Math.min(...values);
const maximum = (values) => Math.max(...values);
const sum = (values) => values.reduce((total, value) => total + value, 0);
const ratio = (rows) => sum(rows.map((row) => row.receipts)) / sum(rows.map((row) => row.obligations));
const minRatio = (rows) => minimum(rows.map((row) => row.receipts / row.obligations));

const sources = loadCertificationSources();
const result = evaluateCertification(sources.data, sources.notice);
if (!result.certified) throw new Error(`Controlling certification does not verify: ${result.errors.join('; ')}`);
const data = sources.data;
const C = result.standards;

const mainItems = [
  { obligationId: 'MAIN-ENFORCEMENT-NETWORK', legalHead: 'Federal enforcement network', paymentOrder: 1, monthlyAmount: 40 },
  { obligationId: 'MAIN-CONSTITUTIONAL-COURTS', legalHead: 'Constitutional and federal courts', paymentOrder: 2, monthlyAmount: 25 },
  { obligationId: 'MAIN-BOUNDARY-INFRASTRUCTURE', legalHead: 'Layer boundary infrastructure', paymentOrder: 3, monthlyAmount: 35 },
];
const itemizeMainWindow = (rows, sourceField) => rows.map((row) => ({
  month: row.month,
  items: mainItems.map((item) => ({ obligationId: item.obligationId, amount: item.monthlyAmount })),
  enumeratedTotal: sum(mainItems.map((item) => item.monthlyAmount)),
  controllingM: row.m,
  sourceId: row[sourceField],
  reconciles: sum(mainItems.map((item) => item.monthlyAmount)) === row.m,
}));

const restatement = {
  schemaVersion: '1.0',
  instrumentId: 'PATH2-RESTATEMENT-SNAPSHOT-2292',
  status: 'LOCKED_AT_2292_02_15',
  lockDate: C.record.auditDesignLocked,
  cutoff: C.vintagePolicy.computedCutoff,
  units: C.record.units,
  rule: 'The population is fixed item by item under Charter sections 3.1 and 10.1; no unenumerated obligation enters M(m).',
  obligations: mainItems,
  currentWindow: itemizeMainWindow(data.sourceInputs.scheduleA.mainCurrentWindow, 'mSourceId'),
  forwardWindow: itemizeMainWindow(data.sourceInputs.scheduleA.mainForwardWindow, 'mSourceId'),
  exclusions: [
    'Automation Dividend Treasury dividend obligations',
    'Savings Circulation Mandate recycling',
    'Lower-layer obligations',
    'Discretionary expenditure not enumerated at lock',
    'Cyclical backfill',
  ],
  reconciliation: {
    currentRows: data.sourceInputs.scheduleA.mainCurrentWindow.length,
    forwardRows: data.sourceInputs.scheduleA.mainForwardWindow.length,
    everyMonthReconciles: true,
    oldPetitionAllocationUsed: false,
  },
};
writeOrCheck(outputPaths.restatement, restatement);

const lowerLayers = Object.fromEntries(Object.entries(data.sourceInputs.scheduleB.layers).map(([name, layer]) => {
  const metrics = {
    currentAggregate: ratio(layer.currentWindow),
    currentMinimum: minRatio(layer.currentWindow),
    forwardMinimum: minRatio(layer.forwardWindow),
  };
  return [name, {
    rate: layer.rate,
    routeMap: layer.routeMap,
    obligationMap: layer.obligationMap,
    currentWindow: layer.currentWindow,
    forwardWindow: layer.forwardWindow,
    metrics,
    comparisons: {
      aggregate: { value: metrics.currentAggregate, required: C.scheduleB.currentAggregate, pass: metrics.currentAggregate >= C.scheduleB.currentAggregate },
      currentMonthly: { value: metrics.currentMinimum, required: C.scheduleB.currentMonthly, pass: metrics.currentMinimum >= C.scheduleB.currentMonthly },
      forwardMonthly: { value: metrics.forwardMinimum, required: C.scheduleB.forwardMonthly, pass: metrics.forwardMinimum >= C.scheduleB.forwardMonthly },
    },
  }];
}));
const lower = {
  schemaVersion: '1.0',
  instrumentId: 'LP074-LOWER-INCIDENCE-CERTIFICATE-2294',
  restatementDependency: 'PATH2-RESTATEMENT-SNAPSHOT-2292',
  evidenceCutoff: C.vintagePolicy.computedCutoff,
  certifiedAt: C.record.scheduleBCertified,
  scheduleADerivationProhibited: true,
  layers: lowerLayers,
  findings: {
    B1: { pass: result.scheduleBConditions.B1, basis: 'Every collection route reconciles to named destinations.' },
    B2: { pass: result.scheduleBConditions.B2, basis: 'Every ordered obligation and explicit non-tax zero reconciles.' },
    B3: { pass: result.scheduleBConditions.B3, basis: 'Proposed-rate quantities use admissible layer-specific sources at the pre-lock vintage.' },
    B4: { pass: result.scheduleBConditions.B4, basis: 'Each layer clears 105 percent aggregate and 100 percent every completed month.' },
    B5: { pass: result.scheduleBConditions.B5, basis: 'Each layer clears 100 percent in all 36 preregistered forward months.' },
    B6: { pass: result.scheduleBConditions.B6, basis: 'The standing Path 2 audit independently adopted B1-B5 after recomputation.' },
  },
  disposition: 'SCHEDULE_B_CERTIFIED',
};
writeOrCheck(outputPaths.lower, lower);

const baselineDividendOffsets = [-0.6, -0.5, -0.4, -0.2, -0.1, 0.1, 0.2, 0.4, 0.5, 0.6];
const baselineScmActivations = [7.9, 8.0, 8.1, 8.2, 8.0, 8.1, 8.2, 8.0, 8.1, 8.2];
const baselineCoverage = [1.03, 1.035, 1.04, 1.045, 1.05, 1.03, 1.035, 1.04, 1.045, 1.05];
const observationWindow = Array.from({ length: 20 }, (_, index) => {
  const year = 2272 + index;
  const baselineIndex = index - 10;
  return {
    year,
    cycleId: index < 10 ? 'CYCLE-2272-2281' : 'CYCLE-2282-2291',
    enacted70CoverageRatio: index < 10 ? 1.035 + (index % 4) * 0.005 : baselineCoverage[baselineIndex],
    dividendPerResident: index < 10 ? 99.2 + index * 0.1 : 100 + baselineDividendOffsets[baselineIndex],
    scmActivationFrequency: index < 10 ? 7.7 + (index % 5) * 0.1 : baselineScmActivations[baselineIndex],
    flowMeasure: 0.6 + (index % 4) * 0.005,
    realizedPublicDeploymentValue: 0.5,
    evidenceClass: 'COMPLETED_OBSERVATION',
    observedThrough: `${year}-12-31`,
    publishedAt: '2292-02-01',
    vintageAt: '2292-02-01',
  };
});
const lastTen = observationWindow.slice(-10);
const mean = (values) => sum(values) / values.length;
const sampleStandardDeviation = (values) => {
  const average = mean(values);
  return Math.sqrt(sum(values.map((value) => (value - average) ** 2)) / (values.length - 1));
};
const findingIIBaselineStandardDeviation = sampleStandardDeviation(lastTen.map((row) => row.dividendPerResident));

const validation = (survives) => ({
  heldOutTerminalSegment: 'last 20 percent of the section 6.1 observation window',
  projectionError: survives ? 0.82 : 1.04,
  persistenceBenchmarkError: 1,
  passesFloor: survives,
});
const makeMember = ({ finding, id, source, equivalenceClass, survives, representative, controlling, offset }) => {
  const annual = data.sourceInputs.annualHorizon.map((row) => {
    if (finding === 'I') return {
      year: row.year,
      pointEstimate: row.coverageLowerBound + 0.018 + offset,
      oneSidedLower95: row.coverageLowerBound + offset,
    };
    if (finding === 'II') return {
      year: row.year,
      dividendPointEstimate: row.dividendPerResidentLowerBound + 0.35 + offset,
      dividendOneSidedLower95: row.dividendPerResidentLowerBound + offset,
      scheduleEffectPointEstimate: row.scheduleEffectLowerBound + 0.045 + offset / 10,
      scheduleEffectOneSidedLower95: row.scheduleEffectLowerBound + offset / 10,
    };
    if (finding === 'III') return {
      year: row.year,
      activationPointEstimate: row.scmActivationUpperBound - 0.24 - offset,
      activationOneSidedUpper95: row.scmActivationUpperBound - offset,
      flowPointEstimate: row.flowLowerBound + 0.045 + offset / 10,
      flowOneSidedLower95: row.flowLowerBound + offset / 10,
    };
    return {
      year: row.year,
      netValuePointEstimate: row.netMarginalValueLowerBound + 0.09 + offset,
      netValueOneSidedLower95: row.netMarginalValueLowerBound + offset,
      concentrationEventsPointEstimate: 0,
      concentrationEventsOneSidedUpper95: row.attributableConcentrationEventsUpperBound,
    };
  });
  return {
    memberId: id,
    source,
    finding,
    functionalClass: equivalenceClass.includes('STRESS') ? 'stress-envelope' : 'locked-linear-envelope',
    identificationAssumption: equivalenceClass,
    estimator: 'preregistered deterministic bound estimator',
    uncertaintyFamily: 'simultaneous one-sided 95 percent adverse interval',
    equivalenceClass,
    validation: validation(survives),
    survivesValidation: survives,
    classRepresentative: representative,
    controlling,
    pointEstimatesAndIntervals: annual,
  };
};
const union = {};
for (const finding of ['I', 'II', 'III', 'IV']) {
  union[finding] = [
    makeMember({ finding, id: `${finding}-PREREG-BASE`, source: 'PREREGISTRATION', equivalenceClass: `${finding}-LOCKED-BASE`, survives: true, representative: false, controlling: false, offset: finding === 'III' ? 0.12 : 0.012 }),
    makeMember({ finding, id: `${finding}-CERT-ROBUST`, source: 'CERTIFICATION_PANEL', equivalenceClass: `${finding}-LOCKED-BASE`, survives: true, representative: true, controlling: false, offset: finding === 'III' ? 0.06 : 0.006 }),
    makeMember({ finding, id: `${finding}-CHALLENGE-STRESS`, source: 'CHALLENGE_PANEL', equivalenceClass: `${finding}-STRESS-IDENTIFICATION`, survives: true, representative: true, controlling: true, offset: 0 }),
    makeMember({ finding, id: `${finding}-CHALLENGE-UNSTABLE`, source: 'CHALLENGE_PANEL', equivalenceClass: `${finding}-UNSTABLE`, survives: false, representative: false, controlling: false, offset: finding === 'III' ? -0.03 : -0.003 }),
  ];
}

const commissionSeats = Array.from({ length: 7 }, (_, index) => ({
  seatId: `COMMISSION-${String(index + 1).padStart(2, '0')}`,
  exposureDeclaration: 'NO_DISQUALIFYING_EXPOSURE',
  findings: { I: 'PASS', II: 'PASS', III: 'PASS', IV: 'PASS' },
  scheduleA: 'CERTIFY',
  dissent: null,
  signedAt: `2294-10-${String(21 + index).padStart(2, '0')}`,
}));
const compendium = {
  schemaVersion: '1.0',
  compendiumId: 'PATH2-SECTION-11-COMPENDIUM-2294',
  lockDate: C.record.auditDesignLocked,
  cutoff: C.vintagePolicy.computedCutoff,
  publicationDate: C.record.scheduleBCertified,
  observedData: {
    sourceAuthority: 'PATH2-OBSERVED-SERIES-AUTHORITY',
    window: '2272-2291',
    cycleDefinition: 'Two complete ten-year fiscal and concentration cycles fixed under section 10.1',
    rows: observationWindow,
    baseline2292: {
      years: '2282-2291',
      findingICoverageMean: mean(lastTen.map((row) => row.enacted70CoverageRatio)),
      findingIIDividendMean: mean(lastTen.map((row) => row.dividendPerResident)),
      findingIIDividendSampleStandardDeviation: findingIIBaselineStandardDeviation,
      findingIIIActivationMean: mean(lastTen.map((row) => row.scmActivationFrequency)),
      findingIIIFlowMean: mean(lastTen.map((row) => row.flowMeasure)),
      findingIVPublicDeploymentMean: mean(lastTen.map((row) => row.realizedPublicDeploymentValue)),
    },
  },
  admissibleUnion: {
    rule: 'Every preregistered member and every panel addition enters; exclusion occurs only through the section 4.3 validation floor.',
    findings: union,
    controllingMemberByFinding: { I: 'I-CHALLENGE-STRESS', II: 'II-CHALLENGE-STRESS', III: 'III-CHALLENGE-STRESS', IV: 'IV-CHALLENGE-STRESS' },
    excludedMembers: ['I-CHALLENGE-UNSTABLE', 'II-CHALLENGE-UNSTABLE', 'III-CHALLENGE-UNSTABLE', 'IV-CHALLENGE-UNSTABLE'],
  },
  precision: {
    I: { maximumAdmissibleWidth: 0.04, controllingMaximumWidth: 0.018, pass: true },
    II: { maximumAdmissibleWidth: findingIIBaselineStandardDeviation, controllingMaximumWidth: 0.35, pass: true },
    III: {
      activationMaximumAdmissibleWidth: 2.02,
      activationControllingMaximumWidth: 0.24,
      flowMaximumAdmissibleWidth: mean(lastTen.map((row) => row.flowMeasure)) - C.findings.III.requiredMinimumFlow,
      flowControllingMaximumWidth: 0.045,
      pass: true,
    },
    IV: { maximumAdmissibleWidth: 0.5, controllingMaximumWidth: 0.09, pass: true },
  },
  commissionVotes: commissionSeats,
  panelDeclarations: [
    { panel: 'CERTIFICATION_PANEL', declaration: 'STRONGEST_SURVIVING_MEMBER_ADDED_FOR_EACH_FINDING', signedAt: '2292-02-15' },
    { panel: 'CHALLENGE_PANEL', declaration: 'STRONGEST_SURVIVING_MEMBER_ADDED_FOR_EACH_FINDING', signedAt: '2292-02-15' },
  ],
  deterministicExecution: {
    runtime: 'Node.js 22 LTS',
    externalDependencies: [],
    locale: 'C',
    timezone: 'UTC',
    randomSeed: null,
    seedDeclaration: 'NO_RANDOM_SEED_DETERMINISTIC_EXECUTION',
    comparisonRule: 'UNROUNDED_VALUES_ONLY',
  },
  artifacts: {
    controllingData: { path: 'documents/path-2-certification-2294-data.json', ...digestFile(join(DOCS, 'path-2-certification-2294-data.json')) },
    effectiveNotice: { path: 'documents/path-2-effective-notice-2295.json', ...digestFile(join(DOCS, 'path-2-effective-notice-2295.json')) },
    verifier: { path: 'tools/verify-path2-certification-2294.mjs', ...digestFile(join(ROOT, 'tools', 'verify-path2-certification-2294.mjs')) },
    recordVerifier: { path: 'tools/verify-path2-record-annexes.mjs', ...digestFile(join(ROOT, 'tools', 'verify-path2-record-annexes.mjs')) },
    annexGenerator: { path: 'tools/build-path2-record-annexes.mjs', ...digestFile(join(ROOT, 'tools', 'build-path2-record-annexes.mjs')) },
    certificationPageGenerator: { path: 'tools/build-path2-certification-page.mjs', ...digestFile(join(ROOT, 'tools', 'build-path2-certification-page.mjs')) },
    restatement: { path: 'documents/path-2-charter-restatement-2292-data.json', ...digestFile(outputPaths.restatement) },
    lowerCertificate: { path: 'documents/path-2-lower-incidence-certificate-2294-data.json', ...digestFile(outputPaths.lower) },
    lp075Review: { path: 'documents/lp-075-section-13-review-set-data.json', digestStatus: 'ADDED_AFTER_REVIEW_ANNEX_GENERATION' },
  },
};

const review = {
  schemaVersion: '1.0',
  reviewSetId: 'LP075-SECTION-13-1-REVIEW-SET',
  amendmentFiled: '2289-03-01',
  rankingSnapshot: '2289-03-15',
  ranking: [
    { rank: 1, entityId: 'AUDIT-METHOD-ENTITY-01', eligible: false, reason: 'prior authorship exposure' },
    { rank: 2, entityId: 'AUDIT-METHOD-ENTITY-12', eligible: true, reason: 'highest-ranked unexposed entity' },
    { rank: 3, entityId: 'AUDIT-METHOD-ENTITY-27', eligible: true, reason: 'not reached' },
  ],
  selectedReviewer: 'AUDIT-METHOD-ENTITY-12',
  selectionMethod: 'MECHANICAL_HIGHEST_RANKED_ELIGIBLE',
  reviewPublished: '2290-01-15',
  findings: [
    { id: 'LP075-R1', severity: 'HIGHEST', issue: 'The amendment reverses the Presidency Part V no-duty holding.', disposition: 'SUSTAINED_AS_PROSPECTIVE_AMENDMENT', replyPublished: '2290-05-01', reviewerReply: 'The conflict is real and cannot be construed away. Section 13.1 permits the chambers to amend cadence prospectively while preserving the first window and all evidentiary gates.', standingObjection: true },
    { id: 'LP075-R2', severity: 'HIGH', issue: 'RR-8 prices first-window non-commencement as lawful history.', disposition: 'SUSTAINED_AND_PRESERVED', replyPublished: '2290-05-01', reviewerReply: 'The remedial duty does not retroactively relabel 2279-2288 and therefore does not contradict RR-8.', standingObjection: false },
    { id: 'LP075-R3', severity: 'HIGH', issue: 'Compelled commencement could become compelled certification.', disposition: 'CURED_BY_OUTCOME_NEUTRALITY', replyPublished: '2290-05-01', reviewerReply: 'Certification, failure, and recognized void remain available; no rate or evidentiary threshold changes.', standingObjection: false },
    { id: 'LP075-R4', severity: 'MEDIUM', issue: 'Strategic non-locking could recreate omission.', disposition: 'CURED_BY_REPLACEMENT_AND_ATTRIBUTION', replyPublished: '2290-05-01', reviewerReply: 'Replacement constitution, public attribution, and Meritboard sanction close the dissolution route.', standingObjection: false },
  ],
  repliesCompletedBeforeAdoption: true,
  adoption: {
    adoptedAt: '2291-01-15',
    Meritboard: '73%',
    SupremeCourt: '7/10',
    Sanctuary: '97%',
    Main: '84%',
    LowerAggregate: '72%',
  },
  presidency: {
    highestSeverityFlagRaised: true,
    vetoExercised: false,
    dispositionPublished: '2291-01-20',
    reason: 'The chambers used section 13.1 to reverse the no-duty rule prospectively, preserved the first window, and left factual certification entirely with the locked instrument.',
  },
  enactedAt: '2291-01-20',
};
writeOrCheck(outputPaths.review, review);
compendium.artifacts.lp075Review = { path: 'documents/lp-075-section-13-review-set-data.json', ...digestFile(outputPaths.review) };
writeOrCheck(outputPaths.compendium, compendium);

const registrar = {
  schemaVersion: '1.0',
  executionId: 'PATH2-REGISTRAR-EXECUTION-2294-10-20',
  office: 'Independent Path 2 Registrar',
  executionStarted: '2294-10-15T09:00:00Z',
  executionCompleted: '2294-10-20T17:30:00Z',
  issuedBeforeInstruments: true,
  conformityNotMerits: true,
  environment: compendium.deterministicExecution,
  escrowedArtifacts: {
    controllingData: compendium.artifacts.controllingData,
    verifier: compendium.artifacts.verifier,
    recordVerifier: compendium.artifacts.recordVerifier,
    annexGenerator: compendium.artifacts.annexGenerator,
    certificationPageGenerator: compendium.artifacts.certificationPageGenerator,
    restatement: compendium.artifacts.restatement,
    lowerCertificate: compendium.artifacts.lowerCertificate,
    compendiumAnnex: { path: 'documents/path-2-section-11-compendium-2294-annex.json', ...digestFile(outputPaths.compendium) },
  },
  classRepresentativesExecuted: compendium.admissibleUnion.controllingMemberByFinding,
  executionLog: [
    { at: '2294-10-15T09:00:00Z', step: 'VERIFY_ESCROW_DIGESTS', outcome: 'MATCH' },
    { at: '2294-10-15T10:30:00Z', step: 'LOAD_LOCKED_ENVIRONMENT', outcome: 'READY' },
    { at: '2294-10-16T08:00:00Z', step: 'EXECUTE_VALIDATION_FLOOR', outcome: '12_SURVIVE_4_EXCLUDED' },
    { at: '2294-10-17T08:00:00Z', step: 'EXECUTE_SECTION_4_6_REPRESENTATIVES', outcome: '8_EXECUTED' },
    { at: '2294-10-18T08:00:00Z', step: 'RECOMPUTE_FINDINGS_I_IV', outcome: 'ALL_PASS' },
    { at: '2294-10-19T08:00:00Z', step: 'RECOMPUTE_A1_A8_AND_B1_B6', outcome: 'ALL_PASS' },
    { at: '2294-10-20T15:00:00Z', step: 'VERIFY_SECTION_1_6_DISPOSITIONS', outcome: 'MATCH' },
    { at: '2294-10-20T17:30:00Z', step: 'ISSUE_CONFORMITY_CERTIFICATE', outcome: 'ISSUANCE_PERMITTED' },
  ],
  comparisons: {
    findings: result.findings,
    scheduleA: result.scheduleAConditions,
    scheduleB: result.scheduleBConditions,
    metrics: result.metrics,
  },
  everyReportedComparisonMatched: true,
  everyDispositionMatchedSection1_6: true,
  deviations: [],
  disposition: 'CONFORMITY_CERTIFIED_ISSUANCE_PERMITTED',
};
writeOrCheck(outputPaths.registrar, registrar);

console.log(`${CHECK ? 'Verified' : 'Built'} five Path 2 machine-readable record annexes.`);
