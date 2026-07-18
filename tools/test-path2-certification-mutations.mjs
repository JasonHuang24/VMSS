#!/usr/bin/env node
/** Permanent negative tests. Fixtures mutate the committed fictional record;
 * no fixture is canon or evidence. */
import { createHash } from 'node:crypto';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  evaluateAuthorityRecord,
  evaluatePath2Findings,
  hasDistinctLowerCertificate,
  payloadDigest,
  prohibitedCreditsExcluded,
  sha256File,
  validateCertificationSequence,
  validateLp075Review,
  validateLockedExecution,
  validateMonthlyRows,
  validateSequenceDocuments,
  validateSourceRegistry,
  validateTraceMap,
} from './path2-certification-core.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(readFileSync(join(ROOT, 'documents/path-2-certification-2294-data.json'), 'utf8'));
const clone = (value) => structuredClone(value);
const tests = [];
const test = (name, fn) => tests.push({ name, fn });
const rows = data.mainCurrent;
const knownSources = data.provenance.sourceRegistry;
const validate = (candidate, overrides = {}) => validateMonthlyRows(candidate, { label: 'mutation fixture', expectedCount: 12, cutoffMonth: '2292-01', placement: 'trailing', knownSources, requireSection43: true, ...overrides });
const redigest = (document) => { document.artifactDigest = payloadDigest(document); return document; };
const jsonByteDigest = (value) => createHash('sha256').update(`${JSON.stringify(value, null, 2)}\n`).digest('hex');
const preregistration = JSON.parse(readFileSync(join(ROOT, data.authorityAudit.preregistrationLock.preregistrationPath), 'utf8'));
const lockCertificate = JSON.parse(readFileSync(join(ROOT, data.authorityAudit.preregistrationLock.lockCertificatePath), 'utf8'));
const registrarExecution = JSON.parse(readFileSync(join(ROOT, data.authorityAudit.registrarExecution.artifactPath), 'utf8'));
const executionOutput = JSON.parse(readFileSync(join(ROOT, data.authorityAudit.registrarExecution.outputPath), 'utf8'));
const diagnostics = JSON.parse(readFileSync(join(ROOT, 'documents/path2-compendium/mandatory-diagnostics.json'), 'utf8'));
const derivations = JSON.parse(readFileSync(join(ROOT, 'documents/path2-compendium/finding-iv-member-derivations.json'), 'utf8'));
const codeManifest = JSON.parse(readFileSync(join(ROOT, 'documents/path2-compendium/calculation-code-manifest.json'), 'utf8'));
const precisionAmendment = JSON.parse(readFileSync(join(ROOT, preregistration.precisionClarification.amendmentPath), 'utf8'));
const lockedErrors = (overrides = {}) => validateLockedExecution(data, ROOT, overrides).errors;
const mutatePreregistration = (mutator) => {
  const candidate = clone(preregistration);
  mutator(candidate);
  redigest(candidate);
  const lock = clone(lockCertificate);
  lock.preregistrationByteDigest = jsonByteDigest(candidate);
  redigest(lock);
  return { preregistration: candidate, lock };
};

test('complete committed authority record certifies', () => evaluateAuthorityRecord(data, { root: ROOT }).certified === true);
test('valid monthly shape is accepted', () => validate(rows).length === 0);
test('missing month is rejected', () => validate(rows.slice(1)).some((error) => error.includes('expected 12')));
test('invalid month format is rejected', () => { const value = clone(rows); value[0].month = '2291-13'; return validate(value).some((error) => error.includes('invalid month')); });
test('nonchronological order is rejected', () => { const value = clone(rows); [value[0], value[1]] = [value[1], value[0]]; return validate(value).some((error) => error.includes('chronological')); });
test('duplicate month is rejected', () => { const value = clone(rows); value[1].month = value[0].month; return validate(value).some((error) => error.includes('duplicate month')); });
test('nonconsecutive window is rejected', () => { const value = clone(rows); value[5].month = '2301-01'; return validate(value).some((error) => error.includes('consecutive')); });
test('cutoff-relative placement is enforced', () => validate(rows, { cutoffMonth: '2292-02' }).some((error) => error.includes('cutoff')));
test('empty source identifier is rejected', () => { const value = clone(rows); value[0].sourceNumerator = ''; return validate(value).some((error) => error.includes('sourceNumerator')); });
test('unrecognized source identifier is rejected', () => { const value = clone(rows); value[0].sourceNumerator = 'UNKNOWN'; return validate(value).some((error) => error.includes('unrecognized numerator')); });
test('raw-to-normalized mismatch is rejected', () => { const value = clone(rows); value[0].normalizedNumerator += 1; return validate(value).some((error) => error.includes('recomputation mismatch')); });
test('derived numerator is rejected', () => { const value = clone(rows); value[0].numeratorDerivedFromDenominator = true; return validate(value).some((error) => error.includes('independence')); });
test('shared source identifier is rejected', () => { const value = clone(rows); value[0].sourceNumerator = value[0].sourceDenominator; return validate(value).some((error) => error.includes('share one source')); });
test('constant-multiple construction is rejected', () => { const value = clone(rows); for (const row of value) { row.rawNumerator = row.rawDenominator * 1.2; row.normalizedNumerator = row.rawNumerator * row.numeratorScale; } return validate(value).some((error) => error.includes('constant multiple')); });
test('missing inclusion/adjustment/weight fields are rejected', () => { const value = clone(rows); value[0].inclusionRule = ''; value[0].adjustment = ''; value[0].weight = 0; const errors = validate(value); return errors.some((error) => error.includes('inclusionRule')) && errors.some((error) => error.includes('adjustment')) && errors.some((error) => error.includes('weight')); });
test('missing normalization rule is rejected', () => { const value = clone(rows); value[0].normalizationRule = ''; return validate(value).some((error) => error.includes('normalizationRule')); });

const layer = data.lowerIncidence.layers[0];
test('complete destination trace map reconciles', () => validateTraceMap(layer, layer.currentRecords).length === 0);
test('globally unbalanced route map is rejected', () => { const value = clone(layer); value.routeMap.destinations[1].share -= 0.01; return validateTraceMap(value, value.currentRecords).some((error) => error.includes('route shares')); });
test('per-route obligation-share swap preserving global total is rejected', () => { const value = clone(layer); const a = value.obligationMap.destinations[0].obligations[0]; const b = value.obligationMap.destinations[1].obligations[0]; [a.share, b.share] = [b.share, a.share]; return validateTraceMap(value, value.currentRecords).some((error) => error.includes('do not match destination route')); });
test('incomplete trace map is rejected', () => { const value = clone(layer); value.obligationMap.destinations.pop(); return validateTraceMap(value, value.currentRecords).some((error) => error.includes('incomplete')); });
test('duplicate payment order is rejected', () => { const value = clone(layer); value.obligationMap.destinations[0].obligations[1].paymentOrder = 1; return validateTraceMap(value, value.currentRecords).some((error) => error.includes('payment order')); });
test('missing monthly destination allocations are rejected', () => { const value = clone(layer); delete value.currentRecords[0].destinationAllocations; return validateTraceMap(value, value.currentRecords).some((error) => error.includes('allocations missing')); });

test('all four committed Findings pass', () => Object.values(evaluatePath2Findings(data.path2Findings, knownSources.map((source) => source.id))).every((finding) => finding.pass));
test('Finding I least-favorable year controls', () => { const value = clone(data.path2Findings); value.I.members[1].horizon[29].coverageLowerBound = 0.999; return evaluatePath2Findings(value).I.pass === false; });
test('short Findings horizon is rejected', () => { const value = clone(data.path2Findings); value.I.members[0].horizon.pop(); return evaluatePath2Findings(value).I.detail.includes('30 years'); });
test('missing Finding II baseline is rejected', () => { const value = clone(data.path2Findings); delete value.II.baselineMean; return evaluatePath2Findings(value).II.detail.includes('baseline mean'); });
test('NaN Finding II bound is rejected', () => { const value = clone(data.path2Findings); value.II.members[0].horizon[0].disbursementLowerBound = NaN; return evaluatePath2Findings(value).II.detail.includes('nonfinite disbursement bound'); });
test('nonnumeric Finding II bound is rejected', () => { const value = clone(data.path2Findings); value.II.members[0].horizon[0].disbursementLowerBound = 'not-a-number'; return evaluatePath2Findings(value).II.detail.includes('nonfinite disbursement bound'); });
test('missing Finding II attribution flag is rejected', () => { const value = clone(data.path2Findings); delete value.II.members[0].horizon[0].attributableToSchedule; return evaluatePath2Findings(value).II.detail.includes('attribution disposition'); });
test('interval exceeding precision floor is rejected', () => { const value = clone(data.path2Findings); value.III.members[0].interval.width = value.III.members[0].interval.precisionFloor + 0.01; return evaluatePath2Findings(value).III.detail.includes('precision floor'); });
test('exact-threshold boundary fails', () => { const value = clone(data.path2Findings); for (const member of value.I.members) for (const row of member.horizon) row.coverageLowerBound = 1.01; value.I.members[1].horizon[0].coverageLowerBound = 1; value.I.leastFavorableMember = value.I.members[1].id; return evaluatePath2Findings(value).I.pass === false; });
test('missing refusal-panel member is rejected', () => { const value = clone(data.path2Findings); value.IV.members = value.IV.members.filter((member) => member.panel !== 'refusal'); value.IV.leastFavorableMember = value.IV.members[0].id; return evaluatePath2Findings(value).IV.detail.includes('missing certification or refusal'); });
test('equivalence-class padding is rejected', () => { const value = clone(data.path2Findings); value.I.members[1].functionalClass = value.I.members[0].functionalClass; value.I.members[1].identificationAssumptions = clone(value.I.members[0].identificationAssumptions); return evaluatePath2Findings(value).I.detail.includes('padding'); });
test('incorrect least-favorable declaration is rejected', () => { const value = clone(data.path2Findings); value.III.leastFavorableMember = value.III.members[0].id; return evaluatePath2Findings(value).III.detail.includes('least-favorable member'); });
test('exact 125 percent Finding III boundary fails', () => { const value = clone(data.path2Findings); const boundary = value.III.baselineActivationMean * 1.25; for (const member of value.III.members) for (const row of member.horizon) row.activationFrequencyUpperBound = boundary - 0.1; value.III.members[1].horizon[0].activationFrequencyUpperBound = boundary; value.III.leastFavorableMember = value.III.members[1].id; return evaluatePath2Findings(value).III.pass === false; });
test('exact zero Finding IV boundary fails', () => { const value = clone(data.path2Findings); value.IV.members[1].omLowerBound = 0; return evaluatePath2Findings(value).IV.pass === false; });

test('prohibited cross-credit fails explicitly', () => prohibitedCreditsExcluded({ mainReceiptsIncluded: true }, ['mainReceiptsIncluded']) === false);
test('real source registry digests verify', () => validateSourceRegistry(knownSources, ROOT).length === 0);
test('fake digest is rejected', () => { const value = clone(knownSources); value[0].digest = '0'.repeat(64); return validateSourceRegistry(value, ROOT).some((error) => error.includes('digest mismatch')); });
test('duplicate source ID is rejected', () => { const value = clone(knownSources); value[1].id = value[0].id; return validateSourceRegistry(value, ROOT).some((error) => error.includes('duplicate source id')); });
test('duplicate source path is rejected', () => { const value = clone(knownSources); value[1].path = value[0].path; value[1].digest = value[0].digest; return validateSourceRegistry(value, ROOT).some((error) => error.includes('duplicate source path')); });
test('modified file after digest registration is rejected', () => {
  const dir = mkdtempSync(join(tmpdir(), 'path2-digest-'));
  try {
    const path = join(dir, 'source.txt');
    writeFileSync(path, 'locked');
    const registry = [{ id: 'LOCKED', path: 'source.txt', digest: sha256File(path) }];
    writeFileSync(path, 'modified');
    return validateSourceRegistry(registry, dir).some((error) => error.includes('digest mismatch'));
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

const sequencePaths = data.authorityAudit.scheduleSequence.artifacts;
const sequenceDocs = Object.fromEntries(Object.entries(sequencePaths).map(([key, path]) => [key, JSON.parse(readFileSync(join(ROOT, path), 'utf8'))]));
const sequenceDigests = Object.fromEntries(Object.entries(sequencePaths).map(([key, path]) => [key, sha256File(join(ROOT, path))]));
test('committed certification sequence verifies from files', () => validateCertificationSequence(data.authorityAudit.scheduleSequence, ROOT).length === 0);
test('Lower adoption preceding Schedule A is rejected', () => { const docs = clone(sequenceDocs); docs.lowerAdoption.adoptedAt = '2294-01-01T00:00:00Z'; redigest(docs.lowerAdoption); return validateSequenceDocuments(docs, sequenceDigests).some((error) => error.includes('strictly ordered')); });
test('Schedule B certificate preceding adoption is rejected', () => { const docs = clone(sequenceDocs); docs.scheduleB.publishedAt = '2294-02-19T00:00:00Z'; redigest(docs.scheduleB); return validateSequenceDocuments(docs, sequenceDigests).some((error) => error.includes('strictly ordered')); });
test('Schedule B with wrong adoption digest is rejected', () => { const docs = clone(sequenceDocs); docs.scheduleB.lowerAdoptionDigest = 'f'.repeat(64); redigest(docs.scheduleB); return validateSequenceDocuments(docs, sequenceDigests).some((error) => error.includes('Schedule B does not bind')); });
test('trusted COMPLETE status without supporting artifact is rejected', () => { const value = clone(data); value.authorityAudit.scheduleSequence.status = 'COMPLETE'; value.authorityAudit.scheduleSequence.artifacts.lowerAdoption = 'documents/path2-compendium/not-present.json'; return evaluateAuthorityRecord(value, { root: ROOT }).certified === false; });
test('narrative Lower adoption without files is rejected', () => hasDistinctLowerCertificate({ path2StandingAuditAdoption: { date: '2294-02-20', instrumentDigest: 'a'.repeat(64) } }, ROOT) === false);

const lp075 = JSON.parse(readFileSync(join(ROOT, data.authorityAudit.lp075.reviewPath), 'utf8'));
test('committed LP-075 review verifies', () => validateLp075Review(lp075).length === 0);
test('LP-075 review dated after vote is rejected', () => { const value = clone(lp075); value.reviewCompletedAt = '2291-02-01T00:00:00Z'; redigest(value); return validateLp075Review(value).some((error) => error.includes('before vote')); });
test('LP-075 payload with stale artifact digest is rejected', () => { const value = clone(lp075); value.findings[0].finding = 'tampered'; return validateLp075Review(value).some((error) => error.includes('payload digest')); });
test('LP-075 missing reviewer reply is rejected', () => { const value = clone(lp075); value.findings[0].reviewerReply = ''; redigest(value); return validateLp075Review(value).some((error) => error.includes('reviewerReply')); });

// §9 lock, §4.3 execution, §5.3 precision, Schedule A.4/A.6, and §11.4
// issuance-order mutations. These guard against a merely self-consistent
// certificate assembled from authored output scalars.
test('Registrar execution after Schedule A is rejected', () => { const value = clone(registrarExecution); value.completedAt = '2294-01-21T00:00:00Z'; redigest(value); return lockedErrors({ registrar: value }).some((error) => error.includes('did not precede instrument issuance')); });
test('unsigned Registrar execution is rejected', () => { const value = clone(registrarExecution); value.signature = ''; redigest(value); return lockedErrors({ registrar: value }).some((error) => error.includes('signed §11.4 disposition')); });
test('Registrar artifact with stale self-digest is rejected', () => { const value = clone(registrarExecution); value.completedAt = '2294-01-09T00:00:00Z'; return lockedErrors({ registrar: value }).some((error) => error.includes('artifact payload digest mismatch')); });
test('unsigned preregistration lock is rejected', () => { const value = clone(lockCertificate); value.registrarSignature.signature = ''; redigest(value); return lockedErrors({ lock: value }).some((error) => error.includes('Registrar signature missing')); });
test('lock without clerk or deemed signature is rejected', () => { const value = clone(lockCertificate); value.clerkSignature.signature = ''; value.clerkSignature.deemedSignatureUsed = false; redigest(value); return lockedErrors({ lock: value }).some((error) => error.includes('clerk signature')); });
test('unregistered preregistration byte digest is rejected', () => { const value = clone(lockCertificate); value.preregistrationByteDigest = '0'.repeat(64); redigest(value); return lockedErrors({ lock: value }).some((error) => error.includes('byte digest mismatch')); });
test('mismatched public chambers lock record is rejected', () => { const value = JSON.parse(readFileSync(join(ROOT, data.authorityAudit.preregistrationLock.publicRecordPath), 'utf8')); value.reference = 'UNREGISTERED'; return lockedErrors({ publicRecord: value }).some((error) => error.includes('public chambers lock record')); });
test('missing §9.1 admissible set is rejected', () => { const values = mutatePreregistration((value) => { delete value.admissibleSpecificationSet; }); return lockedErrors(values).some((error) => error.includes('§9.1 field missing')); });
test('incomplete locked observation-window computation is rejected', () => { const values = mutatePreregistration((value) => { value.computedWindow.start = 2282; }); return lockedErrors(values).some((error) => error.includes('window, training segment')); });
test('missing locked raw artifact is rejected', () => { const values = mutatePreregistration((value) => { value.dataSourceMappings[0].path = 'documents/path2-compendium/raw/not-present.json'; }); return lockedErrors(values).some((error) => error.includes('locked raw-source digest mismatch')); });
test('changed raw-source digest is rejected', () => { const values = mutatePreregistration((value) => { value.dataSourceMappings[1].digest = 'f'.repeat(64); }); return lockedErrors(values).some((error) => error.includes('locked raw-source digest mismatch')); });
test('changed bootstrap seed without regenerated output is rejected', () => { const values = mutatePreregistration((value) => { value.admissibleSpecificationSet.find((member) => member.id === 'I-certification-linear-b1').seed += 1; }); return lockedErrors(values).some((error) => error.includes('independent recomputation')); });
test('changed model selection without regenerated output is rejected', () => { const values = mutatePreregistration((value) => { value.admissibleSpecificationSet.find((member) => member.id === 'II-certification-linear-b1').model = 'constant'; }); return lockedErrors(values).some((error) => error.includes('independent recomputation')); });
test('changed HAC bandwidth rule is rejected', () => { const values = mutatePreregistration((value) => { value.admissibleSpecificationSet.find((member) => member.intervalFamily === 'B-2').bandwidthRule = 'fixed 1'; }); return lockedErrors(values).some((error) => error.includes('automatic HAC bandwidth')); });
test('changed block-length rule is rejected', () => { const values = mutatePreregistration((value) => { value.admissibleSpecificationSet.find((member) => member.intervalFamily === 'B-1').blockLengthRule = 'fixed 2'; }); return lockedErrors(values).some((error) => error.includes('automatic block-length')); });
test('changed preprocessing rule is rejected', () => { const values = mutatePreregistration((value) => { value.admissibleSpecificationSet[0].preprocessing = 'winsorize'; }); return lockedErrors(values).some((error) => error.includes('preprocessing')); });
test('missing B-1 seed is rejected', () => { const values = mutatePreregistration((value) => { value.admissibleSpecificationSet.find((member) => member.intervalFamily === 'B-1').seed = null; }); return lockedErrors(values).some((error) => error.includes('B-1 seed')); });
test('missing §4.3 row-level validation record is rejected', () => { const value = clone(executionOutput); value.validationRecords.pop(); return lockedErrors({ executionOutput: value }).some((error) => error.includes('§4.3 row-level')); });
test('authored validation scalar without matching rows is rejected', () => { const value = clone(executionOutput); value.validationRecords[0].validationError = 0; return lockedErrors({ executionOutput: value }).some((error) => error.includes('independent recomputation')); });
test('failed §4.3 member removal is rejected', () => { const value = clone(executionOutput); value.excludedMembers = []; return lockedErrors({ executionOutput: value }).some((error) => error.includes('failed-member retention')); });
test('authored horizon bound without recomputation is rejected', () => { const value = clone(executionOutput); value.findings.I.members[0].horizon[0].coverageLowerBound += 0.01; return lockedErrors({ executionOutput: value }).some((error) => error.includes('independent recomputation')); });
test('arbitrary deposited precision ceiling is rejected', () => { const value = clone(data); value.path2Findings.I.members[0].interval.precisionFloor = 999; return evaluateAuthorityRecord(value, { root: ROOT }).certified === false; });
test('missing union-member diagnostic is rejected', () => { const value = clone(diagnostics); value.diagnostics.pop(); return lockedErrors({ diagnostics: value }).some((error) => error.includes('D-1–D-5')); });
test('missing D-1 diagnostic is rejected', () => { const value = clone(diagnostics); delete value.diagnostics[0].D1; return lockedErrors({ diagnostics: value }).some((error) => error.includes('D-1–D-5')); });
test('undefined diagnostic without arithmetic explanation is rejected', () => { const value = clone(diagnostics); value.diagnostics[0].D2 = { status: 'NOT_APPLICABLE' }; return lockedErrors({ diagnostics: value }).some((error) => error.includes('D-1–D-5')); });
test('missing Finding IV member derivation is rejected', () => { const value = clone(derivations); value.derivations.pop(); return lockedErrors({ derivations: value }).some((error) => error.includes('Schedule A.4')); });
test('Finding IV derivation without source binding is rejected', () => { const value = clone(derivations); value.derivations[0].sourceBindings = []; return lockedErrors({ derivations: value }).some((error) => error.includes('Schedule A.4')); });
test('modified digest-bound calculation source is rejected', () => { const value = clone(codeManifest); value.sources[0].digest = '0'.repeat(64); return lockedErrors({ codeManifest: value }).some((error) => error.includes('calculation source digest mismatch')); });
test('incomplete calculation-code manifest is rejected', () => { const value = clone(codeManifest); value.sources = value.sources.slice(0, 2); return lockedErrors({ codeManifest: value }).some((error) => error.includes('code manifest is incomplete')); });
test('precision amendment with stale digest is rejected', () => { const value = clone(precisionAmendment); value.scope = 'tampered'; return lockedErrors({ precisionAmendment: value }).some((error) => error.includes('artifact payload digest mismatch')); });
test('post-lock precision amendment is rejected', () => { const value = clone(precisionAmendment); value.publishedAt = '2292-03-01T00:00:00Z'; redigest(value); return lockedErrors({ precisionAmendment: value }).some((error) => error.includes('pre-lock chronology')); });
test('Registrar execution-output digest mismatch is rejected', () => { const value = clone(registrarExecution); value.executionOutputDigest = '0'.repeat(64); redigest(value); return lockedErrors({ registrar: value }).some((error) => error.includes('artifact bindings')); });
test('failed lock executability checklist is rejected', () => { const value = clone(lockCertificate); value.executabilityChecklist.passed = false; redigest(value); return lockedErrors({ lock: value }).some((error) => error.includes('executability checklist')); });

let failed = 0;
for (const entry of tests) {
  let passed = false;
  let detail = '';
  try { passed = entry.fn() === true; } catch (error) { detail = error.message; }
  console.log(`  ${passed ? 'PASS' : 'FAIL'} ${entry.name}${detail ? ` — ${detail}` : ''}`);
  if (!passed) failed += 1;
}
console.log(`Path 2 mutation tests — ${tests.length - failed} passed, ${failed} failed`);
if (failed) process.exit(1);
