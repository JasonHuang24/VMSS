#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { evaluateCertification, loadCertificationSources } from './verify-path2-certification-2294.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const paths = {
  restatement: 'documents/path-2-charter-restatement-2292-data.json',
  lower: 'documents/path-2-lower-incidence-certificate-2294-data.json',
  compendium: 'documents/path-2-section-11-compendium-2294-annex.json',
  registrar: 'documents/path-2-registrar-execution-2294-data.json',
  review: 'documents/lp-075-section-13-review-set-data.json',
};
const load = (path) => JSON.parse(readFileSync(join(ROOT, path), 'utf8'));
const digest = (path) => createHash('sha256').update(readFileSync(join(ROOT, path))).digest('hex');
const fail = (message) => { throw new Error(message); };
const requireTrue = (condition, message) => { if (!condition) fail(message); };
const equal = (actual, expected, message) => requireTrue(JSON.stringify(actual) === JSON.stringify(expected), message);
const finite = (value) => typeof value === 'number' && Number.isFinite(value);
const nearly = (actual, expected, tolerance = 1e-9) => finite(actual) && Math.abs(actual - expected) <= tolerance;
const sum = (values) => values.reduce((total, value) => total + value, 0);
const min = (values) => Math.min(...values);

export function verifyRecordAnnexes() {
  const sources = loadCertificationSources();
  const core = evaluateCertification(sources.data, sources.notice);
  requireTrue(core.certified, `core certification failed: ${core.errors.join('; ')}`);
  const C = core.standards;
  const restatement = load(paths.restatement);
  const lower = load(paths.lower);
  const compendium = load(paths.compendium);
  const registrar = load(paths.registrar);
  const review = load(paths.review);

  equal(restatement.obligations, [
    { obligationId: 'MAIN-ENFORCEMENT-NETWORK', legalHead: 'Federal enforcement network', paymentOrder: 1, monthlyAmount: 40 },
    { obligationId: 'MAIN-CONSTITUTIONAL-COURTS', legalHead: 'Constitutional and federal courts', paymentOrder: 2, monthlyAmount: 25 },
    { obligationId: 'MAIN-BOUNDARY-INFRASTRUCTURE', legalHead: 'Layer boundary infrastructure', paymentOrder: 3, monthlyAmount: 35 },
  ], 'Restatement obligation population differs from the locked itemization');
  requireTrue(restatement.lockDate === C.record.auditDesignLocked
    && restatement.cutoff === C.vintagePolicy.computedCutoff,
  'Restatement lock or cutoff mismatch');
  const restatementWindows = [
    [restatement.currentWindow, sources.data.sourceInputs.scheduleA.mainCurrentWindow],
    [restatement.forwardWindow, sources.data.sourceInputs.scheduleA.mainForwardWindow],
  ];
  for (const [rows, controlling] of restatementWindows) {
    requireTrue(Array.isArray(rows) && rows.length === controlling.length, 'Restatement window length mismatch');
    rows.forEach((row, index) => {
      requireTrue(row.month === controlling[index].month && row.controllingM === controlling[index].m,
        `Restatement month ${index + 1} does not match M(m)`);
      requireTrue(sum(row.items.map((item) => item.amount)) === row.enumeratedTotal
        && row.enumeratedTotal === row.controllingM && row.reconciles,
      `Restatement month ${row.month} does not reconcile item by item`);
    });
  }

  requireTrue(lower.restatementDependency === restatement.instrumentId
    && lower.scheduleADerivationProhibited === true,
  'Lower certificate must cite the Restatement and remain independent of Schedule A');
  for (const name of ['-1', '-2', '-3']) {
    const annexLayer = lower.layers[name];
    const sourceLayer = sources.data.sourceInputs.scheduleB.layers[name];
    equal(annexLayer.rate, sourceLayer.rate, `Lower ${name} rate mismatch`);
    equal(annexLayer.routeMap, sourceLayer.routeMap, `Lower ${name} route map mismatch`);
    equal(annexLayer.obligationMap, sourceLayer.obligationMap, `Lower ${name} obligation map mismatch`);
    equal(annexLayer.currentWindow, sourceLayer.currentWindow, `Lower ${name} current evidence mismatch`);
    equal(annexLayer.forwardWindow, sourceLayer.forwardWindow, `Lower ${name} forward evidence mismatch`);
    requireTrue(nearly(annexLayer.metrics.currentAggregate, core.metrics.scheduleB[name].currentAggregate)
      && nearly(annexLayer.metrics.currentMinimum, core.metrics.scheduleB[name].currentMinimum)
      && nearly(annexLayer.metrics.forwardMinimum, core.metrics.scheduleB[name].forwardMinimum),
    `Lower ${name} metrics do not reproduce`);
  }
  for (const key of ['B1', 'B2', 'B3', 'B4', 'B5', 'B6']) {
    requireTrue(lower.findings[key]?.pass === core.scheduleBConditions[key], `${key} mismatch`);
  }

  equal(Object.keys(compendium.admissibleUnion.findings), ['I', 'II', 'III', 'IV'],
    'The section 4 union must contain exactly Findings I-IV');
  const observed = compendium.observedData?.rows;
  requireTrue(Array.isArray(observed) && observed.length === 20
    && observed.every((row, index) => row.year === 2272 + index
      && row.observedThrough === `${row.year}-12-31`
      && row.observedThrough <= C.vintagePolicy.computedCutoff
      && row.publishedAt < C.record.auditDesignLocked
      && row.vintageAt < C.record.auditDesignLocked
      && row.evidenceClass === 'COMPLETED_OBSERVATION'),
  'The section 6.1 raw observation window must contain twenty admissible pre-lock years');
  requireTrue(new Set(observed.map((row) => row.cycleId)).size === 2,
    'The observation window must contain the two complete cycles fixed at lock');
  const baseline = observed.slice(-10);
  const baselineMean = (field) => sum(baseline.map((row) => row[field])) / baseline.length;
  requireTrue(nearly(baselineMean('enacted70CoverageRatio'), 1.04)
    && nearly(baselineMean('dividendPerResident'), C.findings.II.baselineDividendPerResident)
    && nearly(baselineMean('scmActivationFrequency'), C.findings.III.baselineScmActivationMean)
    && nearly(baselineMean('realizedPublicDeploymentValue'), 0.5),
  'The ten-year baseline means do not reproduce the locked Finding standards');
  requireTrue(compendium.precision.II.controllingMaximumWidth < compendium.precision.II.maximumAdmissibleWidth
    && compendium.precision.III.activationControllingMaximumWidth < compendium.precision.III.activationMaximumAdmissibleWidth
    && compendium.precision.III.flowControllingMaximumWidth < compendium.precision.III.flowMaximumAdmissibleWidth,
  'The section 5.3 precision floor does not clear');
  for (const finding of ['I', 'II', 'III', 'IV']) {
    const members = compendium.admissibleUnion.findings[finding];
    requireTrue(Array.isArray(members) && members.length === 4, `Finding ${finding} union is incomplete`);
    requireTrue(members.some((member) => member.source === 'CERTIFICATION_PANEL' && member.survivesValidation)
      && members.some((member) => member.source === 'CHALLENGE_PANEL' && member.survivesValidation),
    `Finding ${finding} lacks a surviving member from each panel`);
    members.forEach((member) => {
      const passesFloor = member.validation.projectionError <= member.validation.persistenceBenchmarkError;
      requireTrue(member.survivesValidation === passesFloor,
        `${member.memberId} validation-floor disposition is wrong`);
      requireTrue(Array.isArray(member.pointEstimatesAndIntervals)
        && member.pointEstimatesAndIntervals.length === C.annualObservations,
      `${member.memberId} must publish every horizon estimate and interval`);
      member.pointEstimatesAndIntervals.forEach((row, index) => {
        requireTrue(row.year === C.annualStartYear + index, `${member.memberId} horizon ordering failed`);
        Object.entries(row).filter(([key]) => key !== 'year').forEach(([, value]) =>
          requireTrue(finite(value), `${member.memberId} contains a non-finite estimate`));
      });
    });
    const representatives = members.filter((member) => member.classRepresentative);
    equal(representatives.map((member) => member.memberId),
      [`${finding}-CERT-ROBUST`, `${finding}-CHALLENGE-STRESS`],
      `Finding ${finding} section 4.6 representatives are wrong`);
    const controlling = members.find((member) => member.controlling);
    requireTrue(controlling?.memberId === `${finding}-CHALLENGE-STRESS`,
      `Finding ${finding} controlling member is wrong`);
    const baseCandidate = members.find((member) => member.memberId === `${finding}-PREREG-BASE`);
    const baseRepresentative = members.find((member) => member.memberId === `${finding}-CERT-ROBUST`);
    controlling.pointEstimatesAndIntervals.forEach((row, index) => {
      const annual = sources.data.sourceInputs.annualHorizon[index];
      const base = baseCandidate.pointEstimatesAndIntervals[index];
      const representative = baseRepresentative.pointEstimatesAndIntervals[index];
      if (finding === 'I') requireTrue(nearly(row.oneSidedLower95, annual.coverageLowerBound)
        && representative.oneSidedLower95 <= base.oneSidedLower95
        && row.oneSidedLower95 <= representative.oneSidedLower95, 'Finding I controlling or class-representative path mismatch');
      if (finding === 'II') requireTrue(nearly(row.dividendOneSidedLower95, annual.dividendPerResidentLowerBound)
        && nearly(row.scheduleEffectOneSidedLower95, annual.scheduleEffectLowerBound)
        && representative.dividendOneSidedLower95 <= base.dividendOneSidedLower95
        && representative.scheduleEffectOneSidedLower95 <= base.scheduleEffectOneSidedLower95
        && row.dividendOneSidedLower95 <= representative.dividendOneSidedLower95
        && row.scheduleEffectOneSidedLower95 <= representative.scheduleEffectOneSidedLower95,
      'Finding II controlling or class-representative path mismatch');
      if (finding === 'III') requireTrue(nearly(row.activationOneSidedUpper95, annual.scmActivationUpperBound)
        && nearly(row.flowOneSidedLower95, annual.flowLowerBound)
        && representative.activationOneSidedUpper95 >= base.activationOneSidedUpper95
        && representative.flowOneSidedLower95 <= base.flowOneSidedLower95
        && row.activationOneSidedUpper95 >= representative.activationOneSidedUpper95
        && row.flowOneSidedLower95 <= representative.flowOneSidedLower95,
      'Finding III controlling or class-representative path mismatch');
      if (finding === 'IV') requireTrue(nearly(row.netValueOneSidedLower95, annual.netMarginalValueLowerBound)
        && nearly(row.concentrationEventsOneSidedUpper95, annual.attributableConcentrationEventsUpperBound)
        && representative.netValueOneSidedLower95 <= base.netValueOneSidedLower95
        && row.netValueOneSidedLower95 <= representative.netValueOneSidedLower95
        && row.concentrationEventsOneSidedUpper95 >= representative.concentrationEventsOneSidedUpper95,
      'Finding IV controlling or class-representative path mismatch');
    });
  }
  requireTrue(compendium.commissionVotes.length === 7
    && compendium.commissionVotes.every((seat) => Object.values(seat.findings).every((vote) => vote === 'PASS')
      && seat.scheduleA === 'CERTIFY' && seat.exposureDeclaration === 'NO_DISQUALIFYING_EXPOSURE'),
  'Commission votes or exposure declarations are incomplete');

  requireTrue(review.selectionMethod === 'MECHANICAL_HIGHEST_RANKED_ELIGIBLE',
    'LP-075 reviewer was not mechanically selected');
  const selected = review.ranking.find((entry) => entry.entityId === review.selectedReviewer);
  requireTrue(selected?.eligible && review.ranking.filter((entry) => entry.rank < selected.rank).every((entry) => !entry.eligible),
    'LP-075 reviewer was not the highest-ranked eligible entity');
  const adoptionDate = Date.parse(`${review.adoption.adoptedAt}T00:00:00Z`);
  requireTrue(review.findings.every((finding) => Date.parse(`${finding.replyPublished}T00:00:00Z`) < adoptionDate),
    'Every LP-075 reviewer reply must publish before adoption');
  requireTrue(review.findings.some((finding) => finding.severity === 'HIGHEST' && finding.standingObjection)
    && review.presidency.highestSeverityFlagRaised && review.presidency.vetoExercised === false,
  'LP-075 highest-severity veto flag is incomplete');

  for (const artifact of Object.values(compendium.artifacts)) {
    requireTrue(typeof artifact.path === 'string' && artifact.algorithm === 'sha256', 'Compendium artifact index is incomplete');
    requireTrue(artifact.digest === digest(artifact.path), `Compendium digest mismatch for ${artifact.path}`);
  }
  requireTrue(registrar.conformityNotMerits && registrar.issuedBeforeInstruments
    && registrar.everyReportedComparisonMatched && registrar.everyDispositionMatchedSection1_6,
  'Registrar conformity certificate is incomplete');
  requireTrue(Array.isArray(registrar.executionLog) && registrar.executionLog.length === 8
    && registrar.executionLog.every((entry, index, rows) => Date.parse(entry.at)
      > (index ? Date.parse(rows[index - 1].at) : 0)
      && typeof entry.step === 'string' && typeof entry.outcome === 'string'),
  'Registrar execution log is incomplete or unordered');
  requireTrue(Date.parse(registrar.executionCompleted) < Date.parse(`${C.record.scheduleACertified}T00:00:00Z`),
    'Registrar execution did not complete before instrument issuance');
  for (const artifact of Object.values(registrar.escrowedArtifacts)) {
    requireTrue(artifact.digest === digest(artifact.path), `Registrar escrow digest mismatch for ${artifact.path}`);
  }
  equal(registrar.comparisons.findings, core.findings, 'Registrar Finding comparisons mismatch');
  equal(registrar.comparisons.scheduleA, core.scheduleAConditions, 'Registrar Schedule A comparisons mismatch');
  equal(registrar.comparisons.scheduleB, core.scheduleBConditions, 'Registrar Schedule B comparisons mismatch');

  return {
    verified: true,
    unionMembers: 16,
    classRepresentatives: 8,
    restatementMonths: restatement.currentWindow.length + restatement.forwardWindow.length,
    lowerMonths: sum(Object.values(lower.layers).map((layer) => layer.currentWindow.length + layer.forwardWindow.length)),
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const result = verifyRecordAnnexes();
    console.log(`Path 2 publication record: VERIFIED; ${result.unionMembers} union members, ${result.classRepresentatives} class representatives, ${result.restatementMonths} Main rows, ${result.lowerMonths} Lower rows.`);
  } catch (error) {
    console.error(`Path 2 publication record: REJECTED — ${error.message}`);
    process.exit(1);
  }
}
