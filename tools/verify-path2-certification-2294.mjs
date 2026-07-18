#!/usr/bin/env node
/** Verifies the complete LP-074 authority chain. Any incomplete or malformed
 * record exits nonzero; a merely self-consistent void state is not success. */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { evaluateAuthorityRecord, pct } from './path2-certification-core.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(readFileSync(join(ROOT, 'documents/path-2-certification-2294-data.json'), 'utf8'));
const result = evaluateAuthorityRecord(data, { root: ROOT });
const mark = (pass) => pass ? 'PASS' : 'FAIL';

console.log('Path 2 LP-074 complete authority-chain verification');
console.log(`  Declared disposition: ${data.record.disposition}`);
console.log(`  Operative schedule: ${data.record.operativeSchedule}`);
console.log(`  Superseded schedule: ${data.record.supersededSchedule}`);
for (const id of ['I', 'II', 'III', 'IV']) console.log(`  ${mark(result.findings[id].pass)} Finding ${id} — ${result.findings[id].detail}`);

const aDetails = {
  A1: 'verified source custody and cryptographic provenance',
  A2: `Main-12 ${pct(result.candidate.main12)}`,
  A3: `Main monthly minimum ${pct(result.candidate.mainMinimum)}`,
  A4: `Main forward minimum ${pct(result.candidate.mainForwardMinimum)}`,
  A5: `ADT-36 / LP-070 ${pct(result.candidate.adt36)}`,
  A6: `ADT monthly minimum ${pct(result.candidate.adtMinimum)}`,
  A7: 'source-level stream separation and destination reconciliation',
  A8: 'raw reproduction, digest verification, and complete §11.1 compendium',
};
for (const id of Object.keys(aDetails)) console.log(`  ${mark(result.a[id])} ${id} — ${aDetails[id]}`);

const bDetails = {
  B1: 'separate reconciled route maps',
  B2: 'destination-specific obligation maps and complete payment ordering',
  B3: 'recognized raw Li/Oi sources and prohibited-credit exclusion',
  B4: result.bArithmetic.map((row) => `${row.layer} ${pct(row.aggregate)} / min ${pct(row.monthly)}`).join('; '),
  B5: result.bArithmetic.map((row) => `${row.layer} forward min ${pct(row.forwardMinimum)}`).join('; '),
  B6: 'distinct Lower Certificate, adoption, and digest-bound sequence',
};
for (const id of Object.keys(bDetails)) console.log(`  ${mark(result.b[id])} ${id} — ${bDetails[id]}`);

console.log(`  ${mark(result.lp070)} LP-070 trailing-36-month gate`);
console.log(`  ${mark(result.lp075)} LP-075 §13.1 pre-vote cold review`);
console.log(`  ${mark(result.sequence)} ordered Schedule A → Lower Certificate → adoption → Schedule B → notice`);
console.log(`  ${mark(result.revocation)} coupled-reversion amendment and direct Lower revocation route`);
console.log(`  ${mark(result.compendiumErrors.length === 0)} §11.1 compendium and SHA-256 manifest`);
console.log(`  ${mark(result.section43Errors.length === 0 && result.lowerSection43Errors.length === 0)} §4.3 raw-source and normalization reconciliation`);
const locked = result.lockedExecution;
console.log(`  ${mark(locked.pass)} §9 lock — ${locked.lock.preregistrationByteDigest} at ${locked.lock.canonicalTimestamp}`);
console.log(`    signers: ${locked.lock.registrarSignature.signer}; ${locked.lock.clerkSignature.signer}`);
console.log(`    public record: ${locked.lock.publicChambersRecordReference}; checklist ${Object.values(locked.lock.section91Checklist).filter(Boolean).length}/${Object.keys(locked.lock.section91Checklist).length}`);
console.log(`  ${mark(locked.pass)} windows — observations ${locked.depositedOutput.window.observation.join('–')}; training ${locked.depositedOutput.window.training.join('–')}; held out ${locked.depositedOutput.window.heldOutValidation.join('–')}; baseline ${locked.depositedOutput.window.thresholdBaseline.join('–')}`);
for (const record of locked.depositedOutput.validationRecords) console.log(`    ${record.survived ? 'ADMIT' : 'EXCLUDE'} ${record.memberId}: RMSE ${record.validationError.toFixed(6)} vs persistence ${record.persistenceError.toFixed(6)} (${record.rowLevel.length} held-out rows)`);
for (const [id, precision] of Object.entries(locked.depositedOutput.precisionCalculations)) console.log(`    §5.3 ${id}: |${precision.baselineObservedMean} - ${precision.passThreshold}| = ${precision.ceiling}`);
for (const finding of Object.values(locked.depositedOutput.findings)) for (const member of finding.members) {
  const method = member.interval.methodRecord;
  const mechanics = member.interval.family === 'B-1' ? `seed ${method.seed}, auto block ${method.blockLength}, ${method.replications} reps` : member.interval.family === 'B-2' ? `Bartlett HAC bandwidth ${method.bandwidth}, max-t ${method.critical.toFixed(6)}` : `Bartlett HAC bandwidth ${method.bandwidth}, identified-region width ${method.identificationRegionWidth}`;
  console.log(`    ${member.id}: ${member.interval.family}; ${mechanics}; width ${member.interval.width} <= ceiling ${member.interval.precisionFloor}`);
}
console.log(`  ${mark(locked.depositedOutput.findingIvDerivations.length === locked.depositedOutput.findings.IV.members.length)} Schedule A.4 derivations — ${locked.depositedOutput.findingIvDerivations.length}/${locked.depositedOutput.findings.IV.members.length} IV members`);
console.log(`  ${mark(locked.depositedOutput.diagnostics.length === Object.values(locked.depositedOutput.findings).flatMap((finding) => finding.members).length)} D-1–D-5 diagnostics — ${locked.depositedOutput.diagnostics.length} union members`);
console.log(`  ${mark(Date.parse(locked.registrar.completedAt) < Date.parse(JSON.parse(readFileSync(join(ROOT, data.authorityAudit.scheduleSequence.artifacts.scheduleA), 'utf8')).publishedAt))} §11.4 execution ${locked.registrar.completedAt} precedes Schedule A`);
console.log(`    execution output: ${locked.registrar.executionOutputDigest}; code manifest: ${locked.registrar.codeManifestDigest}`);

if (!result.certified) {
  console.error(`  CERTIFICATION FAILED — ${result.errors.length} validation error(s)`);
  for (const error of [...new Set(result.errors)].slice(0, 40)) console.error(`    - ${error}`);
  process.exit(1);
}
console.log(`  CERTIFICATION VERIFIED: ${data.record.operativeSchedule} effective ${data.record.effectiveAssessmentPeriod}`);
