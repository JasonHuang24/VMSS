#!/usr/bin/env node
/**
 * Recomputes the public, deterministic Schedule A certification appendix.
 * It intentionally has no network or package dependency. A failed condition
 * exits nonzero so the record cannot silently drift from its data.
 */
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = join(ROOT, 'documents/path-2-certification-2294-data.json');
const data = JSON.parse(readFileSync(DATA, 'utf8'));
const failures = [];

const fail = (label, detail) => failures.push(`${label}: ${detail}`);
const sum = (rows, key) => rows.reduce((total, row) => total + Number(row[key]), 0);
const ratio = (n, d) => n / d;
const pct = (value) => `${(value * 100).toFixed(2)}%`;
const validSeries = (rows, numerator, denominator, expected, label) => {
  if (!Array.isArray(rows) || rows.length !== expected) {
    fail(label, `expected ${expected} rows, got ${Array.isArray(rows) ? rows.length : 'non-array'}`);
    return [];
  }
  return rows.map((row, index) => {
    const n = Number(row[numerator]);
    const d = Number(row[denominator]);
    if (!Number.isFinite(n) || !Number.isFinite(d) || d <= 0) fail(label, `invalid row ${index + 1}`);
    return { ...row, ratio: ratio(n, d) };
  });
};

const main = validSeries(data.mainCurrent, 't50', 'm', 12, 'Main current series');
const forward = validSeries(data.mainForward, 't50', 'm', 36, 'Main forward series');
const adt = validSeries(data.adtTrailing, 'a', 'd', 36, 'ADT trailing series');

const main12 = ratio(sum(main, 't50'), sum(main, 'm'));
const adt36 = ratio(sum(adt, 'a'), sum(adt, 'd'));
const minMain = Math.min(...main.map((row) => row.ratio));
const minForward = Math.min(...forward.map((row) => row.ratio));
const minAdt = Math.min(...adt.map((row) => row.ratio));

if (!(main12 >= 1.05)) fail('A2 Main-12', `${pct(main12)} is below 105.00%`);
if (!main.every((row) => row.ratio >= 1)) fail('A3 Main monthly floor', `minimum ${pct(minMain)} is below 100.00%`);
if (!forward.every((row) => row.ratio >= 1)) fail('A4 Main forward floor', `minimum ${pct(minForward)} is below 100.00%`);
if (!(adt36 >= 1.2)) fail('A5 ADT-36', `${pct(adt36)} is below 120.00%`);
if (!adt.every((row) => row.ratio >= 1)) fail('A6 ADT monthly floor', `minimum ${pct(minAdt)} is below 100.00%`);

const p = data.provenance || {};
if (p.authoredOrRulingDerivedMagnitudesUsed !== false) fail('A1 provenance', 'authored or ruling-derived magnitude allowed');
const barred = ['velocity', 'recruitment', 'migration', 'avoidance reduction', 'taxable-base expansion', 'consumption response', 'savings response'];
if (!barred.every((name) => (p.excludedCertificationInputs || []).includes(name))) fail('A1/A4 quarantine', 'a prohibited behavioral input is not excluded');
const credits = p.crossCredits || {};
if (Object.values(credits).some((value) => value !== false)) fail('A7 stream separation', 'a prohibited cross-credit is enabled');
if (!main.length || !forward.length || !adt.length) fail('A8 reproducibility', 'one or more monthly series is missing');

console.log('Path 2 Schedule A certification verification');
console.log(`  Main-12: ${pct(main12)} (threshold 105.00%)`);
console.log(`  Main monthly minimum: ${pct(minMain)} (threshold 100.00%)`);
console.log(`  Main 36-month forward minimum: ${pct(minForward)} (threshold 100.00%)`);
console.log(`  ADT-36: ${pct(adt36)} (threshold 120.00%)`);
console.log(`  ADT monthly minimum: ${pct(minAdt)} (threshold 100.00%)`);
console.log(`  Stream-separation checks: ${Object.keys(credits).length} prohibited credits excluded`);

if (failures.length) {
  for (const item of failures) console.error(`FAIL  ${item}`);
  process.exit(1);
}
console.log('  PASS  A1–A8 reproduce from the published appendix.');
