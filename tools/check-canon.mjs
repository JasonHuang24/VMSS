#!/usr/bin/env node
/**
 * check-canon.mjs — VMSS site consistency checker (v20.7)
 *
 * Derives the true counts from the pages (simulation cards, law-polling
 * entries, badge totals) and verifies every hand-maintained advertised
 * number against them: meta descriptions, intro paragraphs, hub cards,
 * academy-source totals, law-polling stat cards, version stamps.
 *
 * Rationale: every count-drift bug found in the 2026-07 full-site audit
 * was a hand-maintained number. This script makes that entire bug
 * category impossible to ship silently.
 *
 * Run:  node tools/check-canon.mjs   (exit 0 = consistent, 1 = drift)
 */
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (f) => readFileSync(join(ROOT, f), 'utf8');
const stripComments = (html) => html.replace(/<!--[\s\S]*?-->/g, '');

const manifest = JSON.parse(read('tools/canon.json'));
const failures = [];
const passes = [];
const check = (ok, label, detail = '') => {
  (ok ? passes : failures).push(`${label}${detail ? ` — ${detail}` : ''}`);
};

/* Number → prose word, for "Forty-eight simulations" style claims. */
const ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
const word = (n) => {
  if (n < 20) return ONES[n];
  const t = TENS[Math.floor(n / 10)];
  return n % 10 ? `${t}-${ONES[n % 10].toLowerCase()}` : t;
};

/* ---- 1. Simulation archive counts ---- */
const world = read('simulations-world.html');
const residents = read('simulations-residents.html');
const hub = read('simulations.html');
const academy = read('documents/academy-source.html');

const W = (world.match(/class="simulation-card/g) || []).length;
const R = (residents.match(/class="simulation-card/g) || []).length;
const total = W + R;

check(world.includes(`${word(W)} scenario simulations`), 'world meta count', `expects "${word(W)} scenario simulations"`);
check(world.includes(`${word(W)} simulations examining`), 'world intro count', `expects "${word(W)} simulations examining"`);
check(residents.includes(`${word(R)} personality and life-path simulations`), 'residents meta count', `expects "${word(R)} personality and life-path simulations"`);
check(residents.includes(`${word(R)} simulations built around`), 'residents intro count', `expects "${word(R)} simulations built around"`);
check(hub.includes(`${W} simulations`), 'hub world card count', `expects "${W} simulations"`);
check(hub.includes(`${R} simulations`), 'hub residents card count', `expects "${R} simulations"`);
check(hub.includes(`and ${W - 5} more`), 'hub world card "N more"', `expects "and ${W - 5} more" (5 named)`);
check(hub.includes(`and ${R - 6} more`), 'hub residents card "N more"', `expects "and ${R - 6} more" (6 named)`);
check(academy.includes(`${total} stamped simulations`), 'academy-source stamped count', `expects "${total} stamped simulations"`);
check(academy.includes(`existing ${total} simulations`), 'academy-source existing count', `expects "existing ${total} simulations"`);

/* Stamp coverage: every simulation card carries a Doctrine Snapshot. */
const stamps = (f) => (f.match(/Doctrine Snapshot:/g) || []).length;
check(stamps(world) >= W, 'world stamps cover cards', `${stamps(world)} stamps / ${W} cards`);
check(stamps(residents) >= R, 'residents stamps cover cards', `${stamps(residents)} stamps / ${R} cards`);

/* Hub sim index: embedded JSON (tools/build-sim-index.mjs) matches the
   derived card total, and every anchor resolves in its target file. */
const idxMatch = hub.match(/<!-- SIM-INDEX-DATA:BEGIN -->\s*<script type="application\/json" id="sim-index-data">([\s\S]*?)<\/script>\s*<!-- SIM-INDEX-DATA:END -->/);
check(!!idxMatch, 'hub sim index data island present');
if (idxMatch) {
  const idx = JSON.parse(idxMatch[1]);
  check(idx.length === total, 'sim index entry count = derived card total', `${idx.length} entries / ${total} cards`);
  const idxFiles = { 'simulations-world.html': world, 'simulations-residents.html': residents };
  const deadAnchors = idx.filter((e) => {
    const [file, id] = e.a.split('#');
    return !idxFiles[file] || !idxFiles[file].includes(` id="${id}"`);
  }).map((e) => e.a);
  check(deadAnchors.length === 0, 'sim index anchors resolve', deadAnchors.length ? `dead: ${deadAnchors.join(', ')}` : `${idx.length} anchors ok`);
}

/* ---- 2. Academy / Resources totals vs hub cards ---- */
const resources = read('documents/resources-source.html');
const maxOf = (f, re) => Math.max(0, ...[...f.matchAll(re)].map((m) => Number(m[1])));
const Q = maxOf(academy, /Question (\d+)/g);
const RES = maxOf(resources, /Resource (\d+)/g);
check(hub.includes(`${Q} questions`), 'hub academy card count', `expects "${Q} questions"`);
check(hub.includes(`${RES} resources`), 'hub resources card count', `expects "${RES} resources"`);

/* ---- 3. Law-polling registry ---- */
const law = stripComments(read('law-polling.html'));
const entries = (law.match(/<article class="law-entry/g) || []).length;

const sectionCount = (startId, endId) => {
  const start = law.indexOf(`id="${startId}"`);
  const end = endId ? law.indexOf(`id="${endId}"`) : law.length;
  return (law.slice(start, end).match(/<article class="law-entry/g) || []).length;
};
const charter = sectionCount('charter-amendments', 'federal-laws');
const federal = sectionCount('federal-laws', 'regulatory-petitions');
const regulatory = sectionCount('regulatory-petitions', null);

check(charter + federal + regulatory === entries, 'law sections sum to total', `${charter}+${federal}+${regulatory} vs ${entries}`);
const statCard = (n, label) => new RegExp(`>${n}</p>\\s*<p class="text-xs text-\\[var\\(--text-muted\\)\\]">${label}<`).test(law);
check(statCard(entries, 'Entries'), 'stat card: Entries', `expects ${entries}`);
check(statCard(charter, 'Charter'), 'stat card: Charter', `expects ${charter}`);
check(statCard(federal, 'Federal'), 'stat card: Federal', `expects ${federal}`);
check(statCard(regulatory, 'Regulatory'), 'stat card: Regulatory', `expects ${regulatory}`);

const badges = (law.match(/class="status-badge status-[a-z]+"/g) || []).length;
check(badges === entries, 'status badges = entries', `${badges} badges / ${entries} entries`);

const pillars = (law.match(/class="pillar-label"/g) || []).length;
check(pillars === manifest.pillarFederalLaws, 'pillar law count', `${pillars} marked / ${manifest.pillarFederalLaws} canonical`);

const entryIds = [...law.matchAll(/<article class="law-entry[^"]*" id="(lp-[\w-]+)"/g)].map((m) => m[1]);
check(entryIds.length === entries, 'every entry has an anchor id', `${entryIds.length}/${entries}`);
check(new Set(entryIds).size === entryIds.length, 'entry anchor ids unique');

const tocLinks = (law.match(/class="toc-link"/g) || []).length;
check(tocLinks === entries, 'ToC links = entries (else run tools/build-law-toc.mjs)', `${tocLinks} links / ${entries} entries`);

/* Vote-outcome semantics: an Enacted entry's own ratification table must
   contain no failing gate; a Failed entry must show at least one. Mixed,
   rerouted, and advisory entries are exempt (their tables legitimately
   blend outcomes). Guards future LP authoring/correction sweeps. */
{
  const blocks = law.split(/(?=<article class="law-entry)/).slice(1);
  const bad = [];
  for (const b of blocks) {
    const id = (b.match(/id="(lp-[\w-]+)"/) || [])[1] || '?';
    const status = (b.match(/class="status-badge (status-[a-z]+)"/) || [])[1];
    const fails = (b.match(/<td class="fail"/g) || []).length;
    if (status === 'status-enacted' && fails > 0) bad.push(`${id}: enacted but ${fails} failing gate(s)`);
    if (status === 'status-failed' && fails === 0) bad.push(`${id}: failed but no failing gate shown`);
  }
  check(bad.length === 0, 'vote tables match declared outcomes', bad.length ? bad.join('; ') : `${blocks.length} entries consistent`);
}

/* ---- 4. LP citations elsewhere resolve to real anchors ---- */
const anchorSet = new Set(entryIds);
for (const file of ['whitepaper.html', 'simulations-world.html', 'simulations-residents.html']) {
  const refs = [...read(file).matchAll(/law-polling\.html#(lp-[\w-]+)/g)].map((m) => m[1]);
  const dead = refs.filter((r) => !anchorSet.has(r));
  check(dead.length === 0, `${file} LP deep links resolve`, dead.length ? `dead: ${[...new Set(dead)].join(', ')}` : `${refs.length} links ok`);
}

/* ---- 5. Version stamps in lockstep ---- */
const readmeV = (read('README.md').match(/\*\*Version:\*\* ([\d.]+)/) || [])[1];
const footerV = (read('footer.html').match(/Version ([\d.]+)/) || [])[1];
check(readmeV && readmeV === footerV, 'README/footer version stamps match', `README ${readmeV} vs footer ${footerV}`);

/* ---- 6. Known-stale-fact guards ---- */
const pages = ['index.html', 'charter.html', 'whitepaper.html', 'faq.html', 'systems.html', 'world.html',
  'why-vmss.html', 'technologies.html', 'law-polling.html', 'simulations-world.html', 'simulations-residents.html',
  'documents/academy-source.html', 'documents/resources-source.html'];
for (const p of pages) {
  const bad = stripComments(read(p)).match(/\bfive (siloed )?currenc/i);
  check(!bad, `${p}: no stale "five currencies"`);
}

/* ---- 7. Duplicate DOM ids per page ---- */
for (const p of ['whitepaper.html', 'law-polling.html', 'simulations-world.html', 'simulations-residents.html', 'charter.html']) {
  const ids = [...stripComments(read(p)).matchAll(/ id="([^"]+)"/g)].map((m) => m[1]);
  const dupes = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
  check(dupes.length === 0, `${p}: no duplicate ids`, dupes.length ? `dupes: ${dupes.join(', ')}` : `${ids.length} ids`);
}

/* ---- Report ---- */
console.log(`\nCanon check — ${passes.length} passed, ${failures.length} failed`);
console.log(`  derived: world=${W} residents=${R} total=${total} | law: ${charter}/${federal}/${regulatory} of ${entries} | academy=${Q} resources=${RES}\n`);
if (failures.length) {
  for (const f of failures) console.error(`  FAIL  ${f}`);
  console.error('\nDrift detected. Fix the advertised numbers (or the canon) before shipping.');
  process.exit(1);
}
console.log('  All advertised numbers match derived reality. Canon is consistent.');
