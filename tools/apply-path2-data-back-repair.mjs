#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dataFile = join(root, 'documents', 'path-2-certification-2294-data.json');
const lockDate = '2292-02-15';
const cutoff = '2292-01-01';
const publicationDate = '2292-02-01';
const reportingLagDays = 45;

const data = JSON.parse(readFileSync(dataFile, 'utf8'));
if (data.schemaVersion !== '7.0' && data.schemaVersion !== '8.0') {
  throw new Error(`Unexpected certification schema ${data.schemaVersion}`);
}

const shiftMonth = (month, years) => `${Number(month.slice(0, 4)) + years}${month.slice(4)}`;
const shiftDate = (date, years) => `${Number(date.slice(0, 4)) + years}${date.slice(4)}`;
const shiftWindow = (rows, years) => rows.forEach((row) => {
  row.month = shiftMonth(row.month, years);
  if (row.date) row.date = shiftDate(row.date, years);
});
const isLeafObject = (value) => value && typeof value === 'object' && !Array.isArray(value)
  && Object.values(value).every((entry) => entry === null || typeof entry !== 'object');
const formatJson = (value, depth = 0, arrayElement = false) => {
  const indent = '  '.repeat(depth);
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (arrayElement && isLeafObject(value)) return JSON.stringify(value);
  if (Array.isArray(value)) {
    if (!value.length) return '[]';
    return `[\n${value.map((entry) => `${'  '.repeat(depth + 1)}${formatJson(entry, depth + 1, true)}`).join(',\n')}\n${indent}]`;
  }
  const entries = Object.entries(value);
  if (!entries.length) return '{}';
  return `{\n${entries.map(([key, entry]) => `${'  '.repeat(depth + 1)}${JSON.stringify(key)}: ${formatJson(entry, depth + 1, false)}`).join(',\n')}\n${indent}}`;
};

if (data.schemaVersion === '7.0') {
  shiftWindow(data.sourceInputs.scheduleA.mainCurrentWindow, -2);
  shiftWindow(data.sourceInputs.scheduleA.dividendWindow, -2);
  Object.values(data.sourceInputs.scheduleB.layers)
    .forEach((layer) => shiftWindow(layer.currentWindow, -2));
}

const observedMetadata = (observedThrough) => ({
  evidenceClass: 'COMPLETED_OBSERVATION',
  observedThrough,
  publishedAt: publicationDate,
  vintageAt: publicationDate,
  maxReportingLagDays: reportingLagDays,
  lockedAt: lockDate,
});
const projectionMetadata = (targetThrough) => ({
  evidenceClass: 'PREREGISTERED_PROJECTION',
  inputCutoff: cutoff,
  targetThrough,
  transformationLockedAt: lockDate,
  lockedAt: lockDate,
});

data.schemaVersion = '8.0';
data.sourceInputs.description = 'The controlling fictional historical observations fixed at the 2292 lock and published with the 2294 certification. Completed observations end by the section 6.2 cutoff; projections may target later periods only from preregistered transformations over admissible pre-lock inputs. Every result below is recomputed from keyed annual or monthly evidence; thresholds are pinned only in the verifier.';
data.sourceInputs.vintagePolicy = {
  lockDate,
  maximumPublishedReportingLagDays: reportingLagDays,
  computedCutoff: cutoff,
  completedObservationRule: 'PERIOD_END_ON_OR_BEFORE_CUTOFF_AND_PUBLICATION_AND_VINTAGE_BEFORE_LOCK',
  preregisteredProjectionRule: 'TARGET_MAY_POSTDATE_LOCK_INPUT_CUTOFF_AND_TRANSFORMATION_FIXED_AT_LOCK',
};

data.sourceInputs.annualProvenanceRegistry = data.sourceInputs.annualProvenanceRegistry.map((entry) => ({
  ...entry,
  ...projectionMetadata('2324-12-31'),
}));

const scheduleAProvenance = {
  'MAIN-CURRENT-T50': ['MAIN-LEDGER-2291-T50', observedMetadata('2291-12-31')],
  'MAIN-CURRENT-M': ['MAIN-LEDGER-2291-M', observedMetadata('2291-12-31')],
  'MAIN-FORWARD-T50': ['MAIN-PROJECTION-2295-2297-T50', projectionMetadata('2297-12-31')],
  'MAIN-FORWARD-M': ['MAIN-PROJECTION-2295-2297-M', projectionMetadata('2297-12-31')],
  'ADT-AUTOMATION-A': ['ADT-LEDGER-2289-2291-A', observedMetadata('2291-12-31')],
  'ADT-DIVIDEND-D': ['ADT-LEDGER-2289-2291-D', observedMetadata('2291-12-31')],
};
data.sourceInputs.scheduleA.provenanceRegistry = data.sourceInputs.scheduleA.provenanceRegistry.map((entry) => {
  const [documentId, metadata] = scheduleAProvenance[entry.sourceId] ?? [];
  if (!documentId) throw new Error(`Unclassified Schedule A source ${entry.sourceId}`);
  return { ...entry, documentId, ...metadata };
});

data.sourceInputs.scheduleB.provenanceRegistry = data.sourceInputs.scheduleB.provenanceRegistry.map((entry) => {
  const observed = entry.sourceId.includes('-CURRENT-');
  const documentId = observed ? entry.documentId.replace('2293', '2291') : entry.documentId;
  return {
    ...entry,
    documentId,
    ...(observed ? observedMetadata('2291-12-31') : projectionMetadata('2297-12-31')),
  };
});

writeFileSync(dataFile, `${formatJson(data)}\n`, 'utf8');
console.log('Applied disclosed DATA-BACK chronology repair to the Path 2 evidence record.');
