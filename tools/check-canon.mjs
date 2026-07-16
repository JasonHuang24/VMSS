#!/usr/bin/env node
/**
 * check-canon.mjs — VMSS site consistency checker (v21.0)
 *
 * Derives the true counts from the pages and verifies every
 * hand-maintained advertised number and structural invariant against
 * them: the consolidated simulation archive (simulations.html), the
 * retired-dossier redirect stubs, the law-polling registry, LP deep-link
 * resolution, version stamps, stale-fact guards, duplicate DOM ids,
 * in-page anchor resolution, and the search/chip filter pages
 * (faq, why-vmss, technologies).
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
const setEq = (a, b) => a.size === b.size && [...a].every((x) => b.has(x));

/* ---- 1. Consolidated simulation archive (simulations.html) ---- */
const hub = read('simulations.html');
const academy = read('documents/academy-source.html');

const cards = (hub.match(/class="simulation-card/g) || []).length;
const W = (hub.match(/data-collection="world"/g) || []).length;
const R = (hub.match(/data-collection="residents"/g) || []).length;
check(W + R === cards, 'archive collection counts sum to cards', `world=${W}+residents=${R} vs ${cards} cards`);

/* Per-card block: valid collection/section/version + an aria-controls that
   resolves to an in-block content id; all anchors unique; one per card. */
const cardBlocks = hub.split(/(?=<div class="simulation-card)/).slice(1);
const KNOWN_SECTIONS = new Set([
  'system-mechanisms', 'stress-tests', 'civilizational',
  'historical', 'criminal', 'full-spectrum', 'lifestyle', 'long-horizon', 'cyberpunk', 'boundary',
]);
const cardSections = new Set();
const cardVersions = new Set();
const anchors = [];
const invalid = [];
cardBlocks.forEach((b, i) => {
  const coll = (b.match(/data-collection="(world|residents)"/) || [])[1];
  const sect = (b.match(/data-section="([^"]+)"/) || [])[1];
  const ver = (b.match(/data-version="([^"]+)"/) || [])[1];
  if (!coll || !sect || !KNOWN_SECTIONS.has(sect) || !ver) {
    invalid.push(`card ${i + 1}: collection=${coll || '∅'} section=${sect || '∅'} version=${ver || '∅'}`);
  }
  if (sect) cardSections.add(sect);
  if (ver) cardVersions.add(ver);
  const ac = (b.match(/aria-controls="([^"]+)"/) || [])[1];
  if (!ac) {
    invalid.push(`card ${i + 1}: no aria-controls`);
  } else {
    anchors.push(ac);
    if (!b.includes(`id="${ac}"`)) invalid.push(`card ${i + 1}: aria-controls "${ac}" has no in-block id`);
  }
});
check(invalid.length === 0, 'every card block valid (collection/section/version/anchor)',
  invalid.length ? invalid.slice(0, 6).join('; ') : `${cardBlocks.length} blocks`);
check(anchors.length === cards, 'one aria-controls per card', `${anchors.length} anchors / ${cards} cards`);
check(new Set(anchors).size === anchors.length, 'card anchors unique');

/* Card section-set === section-header set, in both directions. */
const headerSections = new Set([...hub.matchAll(/data-section-header="([^"]+)"/g)].map((m) => m[1]));
check(setEq(cardSections, headerSections), 'card sections match section headers',
  `cards {${[...cardSections].sort().join(',')}} vs headers {${[...headerSections].sort().join(',')}}`);

/* Every distinct section/version has a matching static <option>. */
const selectBody = (id) => (hub.match(new RegExp(`<select[^>]*id="${id}"[^>]*>([\\s\\S]*?)</select>`)) || [])[1] || '';
const catOptions = selectBody('sim-idx-cat');
const snapOptions = selectBody('sim-idx-snap');
const missingCat = [...cardSections].filter((s) => !catOptions.includes(`value="${s}"`));
const missingSnap = [...cardVersions].filter((v) => !snapOptions.includes(`value="${v}"`));
check(missingCat.length === 0, 'every card section has a category <option>',
  missingCat.length ? `missing: ${missingCat.join(', ')}` : `${cardSections.size} sections`);
check(missingSnap.length === 0, 'every card version has a snapshot <option>',
  missingSnap.length ? `missing: ${missingSnap.join(', ')}` : `${cardVersions.size} versions`);

/* Every simulation card carries a Doctrine Snapshot stamp. */
const stamps = (hub.match(/Doctrine Snapshot:/g) || []).length;
check(stamps >= cards, 'archive stamps cover cards', `${stamps} stamps / ${cards} cards`);

/* Advertised total in intro prose + the server-rendered count line. */
check(hub.includes(`All ${cards} simulations`), 'archive intro count', `expects "All ${cards} simulations"`);
check(hub.includes(`Showing all ${cards} simulations`), 'archive count line', `expects "Showing all ${cards} simulations"`);

/* ---- 2. Redirect stubs + sitemap ---- */
for (const stub of ['simulations-world.html', 'simulations-residents.html']) {
  const s = read(stub);
  check(/noindex/i.test(s), `${stub}: noindex`);
  check(s.includes('url=simulations.html'), `${stub}: meta-refresh to simulations.html`);
  check(s.includes("location.replace('simulations.html'"), `${stub}: JS hash-preserving redirect`);
  check(!s.includes('simulation-card'), `${stub}: no migrated cards left`);
}
const sitemap = read('sitemap.xml');
check(!sitemap.includes('simulations-world.html') && !sitemap.includes('simulations-residents.html'),
  'sitemap drops retired dossier urls');

/* ---- 3. Academy / Resources totals vs hub cards ---- */
check(academy.includes(`${cards} stamped simulations`), 'academy-source stamped count', `expects "${cards} stamped simulations"`);
check(academy.includes(`existing ${cards} simulations`), 'academy-source existing count', `expects "existing ${cards} simulations"`);
const resources = read('documents/resources-source.html');
const maxOf = (f, re) => Math.max(0, ...[...f.matchAll(re)].map((m) => Number(m[1])));
const Q = maxOf(academy, /Question (\d+)/g);
const RES = maxOf(resources, /Resource (\d+)/g);
check(hub.includes(`${Q} questions`), 'hub academy card count', `expects "${Q} questions"`);
check(hub.includes(`${RES} resources`), 'hub resources card count', `expects "${RES} resources"`);

/* ---- 4. Law-polling registry ---- */
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

/* Supersession chain (v22.0.1): the excavated rate-history statutes form a
   single chain LP-071 → LP-072 → LP-073 → LP-074. Every link but the last is a
   superseded statute; exactly one — the tail — is the active schedule in force.
   Guards the record class against a second "active" schedule, a broken chain,
   or a renumbering that leaves the trajectory without a live terminus. */
{
  const CHAIN = ['lp-071', 'lp-072', 'lp-073', 'lp-074'];
  const statusOf = (id) => {
    const block = law.split(/(?=<article class="law-entry)/).find((x) => x.includes(`id="${id}"`)) || '';
    return (block.match(/class="status-badge (status-[a-z]+)"/) || [])[1] || null;
  };
  const chainStatuses = CHAIN.map(statusOf);
  const missing = CHAIN.filter((_, i) => chainStatuses[i] === null);
  const active = chainStatuses.filter((s) => s === 'status-active').length;
  const superseded = chainStatuses.filter((s) => s === 'status-superseded').length;
  const tailActive = chainStatuses[CHAIN.length - 1] === 'status-active';
  const ok = missing.length === 0 && active === 1 && superseded === CHAIN.length - 1 && tailActive;
  check(ok, 'rate-history supersession chain (LP-071→072→073→074, exactly one active)',
    missing.length ? `missing: ${missing.join(', ')}`
      : `active=${active} superseded=${superseded} tail=${chainStatuses[CHAIN.length - 1]}`);
}

/* ---- 5. LP citations elsewhere resolve to real anchors ---- */
const anchorSet = new Set(entryIds);
for (const file of ['whitepaper.html', 'simulations.html']) {
  const refs = [...read(file).matchAll(/law-polling\.html#(lp-[\w-]+)/g)].map((m) => m[1]);
  const dead = refs.filter((r) => !anchorSet.has(r));
  check(dead.length === 0, `${file} LP deep links resolve`, dead.length ? `dead: ${[...new Set(dead)].join(', ')}` : `${refs.length} links ok`);
}

/* ---- 6. Version stamps in lockstep ---- */
const readmeV = (read('README.md').match(/\*\*Version:\*\* ([\d.]+)/) || [])[1];
const footerV = (read('footer.html').match(/Version ([\d.]+)/) || [])[1];
check(readmeV && readmeV === footerV, 'README/footer version stamps match', `README ${readmeV} vs footer ${footerV}`);

/* ---- 7. Known-stale-fact guards ---- */
const pages = ['index.html', 'charter.html', 'whitepaper.html', 'faq.html', 'systems.html', 'world.html',
  'why-vmss.html', 'technologies.html', 'law-polling.html', 'simulations.html',
  'documents/academy-source.html', 'documents/resources-source.html'];
for (const p of pages) {
  const bad = stripComments(read(p)).match(/\bfive (siloed )?currenc/i);
  check(!bad, `${p}: no stale "five currencies"`);
}

/* ---- 8. Duplicate DOM ids per page ---- */
for (const p of ['whitepaper.html', 'law-polling.html', 'simulations.html', 'charter.html',
  'systems.html', 'technologies.html', 'faq.html', 'why-vmss.html']) {
  const ids = [...stripComments(read(p)).matchAll(/ id="([^"]+)"/g)].map((m) => m[1]);
  const dupes = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
  check(dupes.length === 0, `${p}: no duplicate ids`, dupes.length ? `dupes: ${dupes.join(', ')}` : `${ids.length} ids`);
}

/* ---- 9. In-page href="#x" anchors resolve to a real id ---- */
for (const p of ['simulations.html', 'charter.html', 'systems.html', 'technologies.html', 'law-polling.html']) {
  const src = stripComments(read(p));
  const ids = new Set([...src.matchAll(/ id="([^"]+)"/g)].map((m) => m[1]));
  const dead = [...new Set([...src.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]))]
    .filter((h) => h && !ids.has(h));
  check(dead.length === 0, `${p}: in-page anchors resolve`, dead.length ? `dead: ${dead.join(', ')}` : `${ids.size} ids`);
}

/* ---- 10. Filter-page guards (faq / why-vmss / technologies) ----
   count line matches derived card count; every card data-cat is covered
   by a filter chip; why-vmss + technologies accordions pair aria-controls to ids. */
const catFilterPage = (file, cardClass, noun) => {
  const src = read(file);
  const n = (src.match(new RegExp(`class="${cardClass}`, 'g')) || []).length;
  const phrase = `Showing all ${n} ${noun}`;
  check(src.includes(phrase), `${file}: count line`, `expects "${phrase}"`);
  const chips = new Set([...src.matchAll(/data-filter="([^"]+)"/g)].map((m) => m[1]).filter((v) => v !== 'all'));
  const cats = new Set([...src.matchAll(/data-cat="([^"]+)"/g)].flatMap((m) => m[1].split(/\s+/)));
  const uncovered = [...cats].filter((c) => c && !chips.has(c));
  check(uncovered.length === 0, `${file}: every data-cat has a chip`,
    uncovered.length ? `uncovered: ${uncovered.join(', ')} (chips: ${[...chips].join(',')})` : `${cats.size} cats / ${chips.size} chips`);
  return n;
};
const F = catFilterPage('faq.html', 'faq-card', 'questions');
const WY = catFilterPage('why-vmss.html', 'why-card', 'entries');

{
  const src = read('why-vmss.html');
  const why = (src.match(/class="why-card/g) || []).length;
  const wblocks = src.split(/(?=<div class="why-card)/).slice(1);
  const wacs = [];
  const bad = [];
  wblocks.forEach((b, i) => {
    const ac = (b.match(/aria-controls="([^"]+)"/) || [])[1];
    if (!ac) { bad.push(`why card ${i + 1}: no aria-controls`); return; }
    wacs.push(ac);
    if (!b.includes(`id="${ac}"`)) bad.push(`why card ${i + 1}: aria-controls "${ac}" has no in-block id`);
  });
  check(bad.length === 0 && wacs.length === why && new Set(wacs).size === wacs.length,
    'why-vmss accordions: aria-controls resolve + unique',
    bad.length ? bad.slice(0, 6).join('; ') : `${why} cards`);
}

{
  const src = read('technologies.html');
  const tech = (src.match(/class="tech-card/g) || []).length;
  const tblocks = src.split(/(?=<div class="tech-card)/).slice(1);
  const tacs = [];
  const bad = [];
  tblocks.forEach((b, i) => {
    const ac = (b.match(/aria-controls="([^"]+)"/) || [])[1];
    if (!ac) { bad.push(`tech card ${i + 1}: no aria-controls`); return; }
    tacs.push(ac);
    if (!b.includes(`id="${ac}"`)) bad.push(`tech card ${i + 1}: aria-controls "${ac}" has no in-block id`);
  });
  check(bad.length === 0 && tacs.length === tech && new Set(tacs).size === tacs.length,
    'technologies accordions: aria-controls resolve + unique',
    bad.length ? bad.slice(0, 6).join('; ') : `${tech} cards`);
}

/* ---- Report ---- */
console.log(`\nCanon check — ${passes.length} passed, ${failures.length} failed`);
console.log(`  derived: archive=${cards} (world=${W} residents=${R}) sections=${cardSections.size} versions=${cardVersions.size}` +
  ` | law ${charter}/${federal}/${regulatory} of ${entries} | academy=${Q} resources=${RES} | faq=${F} why=${WY}\n`);
if (failures.length) {
  for (const f of failures) console.error(`  FAIL  ${f}`);
  console.error('\nDrift detected. Fix the advertised numbers (or the canon) before shipping.');
  process.exit(1);
}
console.log('  All advertised numbers match derived reality. Canon is consistent.');
