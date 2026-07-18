#!/usr/bin/env node
/**
 * Verifies the legal and evidentiary status of the purported 2294 Path 2
 * record. A successful process exit means the repository describes that
 * status consistently; it does not mean a certification exists. Use
 * --require-certification to require an operative certificate.
 */
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { evaluateAuthorityRecord, pct } from './path2-certification-core.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA_PATH = join(ROOT, 'documents/path-2-certification-2294-data.json');
const data = JSON.parse(readFileSync(DATA_PATH, 'utf8'));
const result = evaluateAuthorityRecord(data, { root: ROOT });
const requireCertification = process.argv.includes('--require-certification');

const mark = (pass) => pass ? 'PASS' : 'UNSATISFIED';
console.log('Path 2 LP-074 authority-chain verification');
console.log(`  Declared disposition: ${data.record.disposition}`);
console.log(`  Operative schedule: ${data.record.operativeSchedule}`);
console.log(`  Conditional LP-074 candidate: ${data.record.candidateSchedule}`);

for (const id of ['I', 'II', 'III', 'IV']) {
  const finding = result.findings[id];
  console.log(`  ${mark(finding.pass)} Finding ${id} — ${finding.detail}`);
}

const aDetails = {
  A1: 'audit provenance and source custody',
  A2: `candidate Main-12 arithmetic ${pct(result.candidate.main12)}`,
  A3: `candidate Main monthly minimum ${pct(result.candidate.mainMinimum)}`,
  A4: `candidate Main forward minimum ${pct(result.candidate.mainForwardMinimum)}`,
  A5: `candidate ADT-36 arithmetic ${pct(result.candidate.adt36)}`,
  A6: `candidate ADT monthly minimum ${pct(result.candidate.adtMinimum)}`,
  A7: 'source-level stream separation and §4.3 independence',
  A8: 'raw-to-normalized reproduction and complete §11.1 record',
};
for (const id of Object.keys(aDetails)) console.log(`  ${mark(result.a[id])} ${id} — ${aDetails[id]}`);

const bDetails = {
  B1: 'separate, independently sourced route map',
  B2: 'separate obligation map and lawful payment order',
  B3: 'recognized raw Li/Oi sources and prohibited-credit exclusion',
  B4: `candidate current arithmetic ${result.bArithmetic.map((row) => `${row.layer} ${pct(row.aggregate)} / min ${pct(row.monthly)}`).join('; ') || 'not computable'}`,
  B5: `candidate forward minima ${result.bArithmetic.map((row) => `${row.layer} ${pct(row.forwardMinimum)}`).join('; ') || 'not computable'}`,
  B6: 'distinct Lower Incidence Certificate, adoption instrument, and Path 2 adoption',
};
for (const id of Object.keys(bDetails)) console.log(`  ${mark(result.b[id])} ${id} — ${bDetails[id]}`);

console.log(`  ${mark(result.lp070)} LP-070 recalibration gate — raw A/D provenance and independence required`);
console.log(`  ${mark(result.lp075)} LP-075 §13.1 authority record — qualifying pre-vote cold-review record required`);
console.log(`  ${mark(result.sequence)} Ordered Schedule A/B sequence — distinct Lower instrument and adoption required`);
console.log(`  §11.1 missing components: ${result.compendiumErrors.join(', ')}`);
console.log(`  §4.3/source-validation errors: ${result.section43Errors.length}`);
console.log(`  Revocation issue: ${data.authorityAudit.revocation.status}; possible mixed schedule ${data.authorityAudit.revocation.possibleMixedSchedule}`);

if (result.certified) {
  console.log(`  CERTIFICATION VERIFIED: ${data.record.candidateSchedule}`);
} else {
  console.log('  CERTIFICATION DISPOSITION VERIFIED: VOID / INCOMPLETE');
  console.log(`  NO RATE EFFECT: LP-073 remains operative at ${data.record.operativeSchedule}`);
}

if (requireCertification && !result.certified) process.exit(1);
if (!result.internallyConsistent && !result.certified) process.exit(1);
