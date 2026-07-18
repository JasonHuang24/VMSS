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
import { execFileSync } from 'child_process';
import { readFileSync, readdirSync } from 'fs';
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
const path2NoindexPages = [
  'path-2-charter.html', 'path-2-schedule.html', 'path-2-risk-register.html',
  'path-2-certification-2294.html', 'path-2-commencement-duty-act.html',
];
const indexedPath2 = path2NoindexPages.filter((f) => sitemap.includes(f));
check(indexedPath2.length === 0, 'sitemap omits Path 2 noindex pages',
  indexedPath2.length ? `indexed: ${indexedPath2.join(', ')}` : `${path2NoindexPages.length} pages omitted`);

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

/* The filter's own count line. The stat cards above were checked against the
   derived total from the start; this line was not, and it spent v22.3 and v22.4
   a version behind — server-rendered 87 against 88 real entries, corrected only
   once a reader clicked a chip. The script now derives it on load, so this
   guards the no-JS first paint the reader sees before that. */
const countLine = (law.match(/data-law-count[^>]*>Showing all (\d+) entries</) || [])[1];
check(Number(countLine) === entries, 'filter count line = entries',
  `line says ${countLine ?? 'nothing'} / ${entries} entries`);

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

/* Fiscal authority after the 2294 full LP-074 certificate. LP-073 remains
   historical evidence of the rounded 70/35/17/8 era, but has no operative rate
   after 2295. LP-074 supplies all four active rates through independently
   certified Schedules A and B; LP-075 supplies procedure only. */
const statusOfLp = (id) => {
  const block = law.split(/(?=<article class="law-entry)/).find((x) => x.includes(`id="${id}"`)) || '';
  return (block.match(/class="status-badge (status-[a-z]+)"/) || [])[1] || null;
};
{
  const lp073 = law.split(/(?=<article class="law-entry)/).find((b) => b.includes('id="lp-073"')) || '';
  const lp074Entry = law.split(/(?=<article class="law-entry)/).find((b) => b.includes('id="lp-074"')) || '';
  const lp075 = law.split(/(?=<article class="law-entry)/).find((b) => b.includes('id="lp-075"')) || '';
  const need = [
    ['LP-071 remains superseded', statusOfLp('lp-071') === 'status-superseded'],
    ['LP-072 remains superseded', statusOfLp('lp-072') === 'status-superseded'],
    ['LP-073 is superseded', statusOfLp('lp-073') === 'status-superseded'],
    ['LP-073 is historical only after 2295', lp073.includes('fully superseded') && lp073.includes('historical')],
    ['LP-074 is enacted', statusOfLp('lp-074') === 'status-enacted'],
    ['LP-074 is RATIFY-TAX-50-II', lp074Entry.includes('RATIFY-TAX-50-II')],
    ['LP-074 states both schedules active', lp074Entry.includes('Schedules A and B Active')],
    ['LP-074 states the exact cascade', lp074Entry.includes('50% / 25% / 12.5% / 6.25%')],
    ['LP-075 is enacted', statusOfLp('lp-075') === 'status-enacted'],
    ['LP-075 is the Path 2 Commencement Duty Act', lp075.includes('Path 2 Commencement Duty Act')],
  ];
  const missing = need.filter(([, ok]) => !ok).map(([k]) => k);
  check(missing.length === 0, 'post-certification fiscal authority is full LP-074 (A + B) with procedural LP-075',
    missing.length ? `missing: ${missing.join('; ')}` : '50 / 25 / 12.5 / 6.25 under LP-074; LP-073 historical only');

  const stale = [...law.matchAll(/\blp-076\b/gi)].map((m) => m[0]);
  check(stale.length === 0, 'register carries no LP-076 (R15 renumber complete)',
    stale.length ? `found ${stale.length}` : 'clear');
}

/* (b) The deregistered texts survive verbatim off-register. Deregistration is
   relocation, not deletion; this is the guard that keeps it honest. */
{
  const dereg = read('deregistered-statutes.html');
  const need = [
    ['LP-074 §1', 'The engraved schedule is 50% / 25% / 12.5% / 6.25% top marginal above $10,000,000 annually, layer-mapped as before.'],
    ['LP-075 §1', 'top marginal rates track institutional need, not posture.'],
  ];
  const missing = need.filter(([, t]) => !dereg.includes(t)).map(([k]) => k);
  check(missing.length === 0, 'deregistered-statutes.html preserves both §1 texts verbatim',
    missing.length ? `missing: ${missing.join(', ')}` : 'both present');

  /* (b2) …and are labeled as drafting designations, not the later official
     statutes. A reader arriving here must be able to distinguish both official
     register issuances from their similarly numbered process texts. */
  const labels = [
    ['LP-074 designation label', /Drafting designation LP-074 \(process record — never registered in-world\)/],
    ['LP-075 designation label', /Drafting designation LP-075 \(process record — never registered in-world\)/],
    ['disambiguation header', /The register’s LP-074 is (<[^>]+>)*RATIFY-TAX-50-II/],
    ['LP-075 official-law disambiguation', /its LP-075 is the <a [^>]*>Path 2 Commencement Duty Act/],
  ];
  const unlabeled = labels.filter(([, re]) => !re.test(dereg)).map(([k]) => k);
  check(unlabeled.length === 0,
    'deregistered-statutes.html distinguishes both drafting designations from official laws',
    unlabeled.length ? `missing: ${unlabeled.join(', ')}` : 'both labels + official LP-074/075 disambiguation');
}

/* (c) The principle survives as doctrine, in the whitepaper, in R13's wording. */
{
  const DOCTRINE = 'top marginal rates track demonstrated institutional need, and any rate reduction requires audited evidence per the Path 2 standing audit — never authored facts — at the standard zero-fail threshold.';
  check(read('whitepaper.html').includes(DOCTRINE),
    'whitepaper carries the Trajectory Doctrine (R13 wording)', 'whitepaper.html §12.1');
}

/* (d) LAYER GUARD (R13): the founder is not an in-world actor. Founding
   authority terminated into the charter at Y0, so no World-tier page may
   present a founder ruling or override as an in-world governance event. The
   Process tier — the Ratification Record set (pending-*, which are the
   docs-review-derived pages and include the session record) and the
   deregistered-statutes archive — is exempt by definition: it exists to carry
   exactly that authorship history, explicitly framed as out-of-world.
   Checked against rendered text, so a comment explaining the rule does not
   trip it, and neither does a filename. */
{
  const PROCESS_TIER = (f) => f.startsWith('pending-') || f === 'deregistered-statutes.html';
  const rendered = (html) => stripComments(html)
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ');
  const BANNED = /founder(?:'|’)?s? (?:ruling|override)/i;
  /* Seat-name class (v22.5.1). The out-of-world reviewer seats — the models
     that authored the adversarial passes — are Process-tier authorship, never
     in-world text. v22.5 shipped three of them in the Residual-Risk Register's
     section headings ("Sol regression pass", "Opus cold pass"); the corrected
     in-world framing removed them, and this check makes that leak class
     mechanical from now on. Case-sensitive and word-bounded so ordinary prose
     ("console", "Solar", a lowercase "opus") does not trip it; the Process tier
     is exempt by the same PROCESS_TIER definition the founder rule uses. */
  const SEAT = /\b(Sol|Opus|Fable|GPT|Claude)\b/;
  const worldPages = readdirSync(ROOT).filter((f) => f.endsWith('.html') && !PROCESS_TIER(f));
  const founderOffenders = [];
  const seatOffenders = [];
  for (const f of worldPages) {
    const txt = rendered(read(f));
    if (BANNED.test(txt)) founderOffenders.push(f);
    const seat = txt.match(SEAT);
    if (seat) seatOffenders.push(`${f} ("${seat[1]}")`);
  }
  check(founderOffenders.length === 0,
    `layer guard: no World-tier page presents the founder as an in-world actor (${worldPages.length} pages)`,
    founderOffenders.length ? `offenders: ${founderOffenders.join(', ')}` : 'clean');
  check(seatOffenders.length === 0,
    `layer guard: no World-tier page names an out-of-world reviewer seat (${worldPages.length} pages)`,
    seatOffenders.length ? `offenders: ${seatOffenders.join(', ')}` : 'clean');
}

const STATUTE_PAGE = 'pending-ratify-tax-50-ii-statute.html';
const CERTIFICATION_PAGE = 'path-2-certification-2294.html';
const COMMENCEMENT_ACT_PAGE = 'path-2-commencement-duty-act.html';
const CERTIFICATION_DATA = 'documents/path-2-certification-2294-data.json';
const CERTIFICATION_VERIFIER = 'tools/verify-path2-certification-2294.mjs';

/* (e) LP-074 is a conditional statute whose two independently evidenced
   schedules are now active. The register must make the complete authority,
   legal effect, and statute-page trail visible. */
const lp074 = law.split(/(?=<article class="law-entry)/).find((b) => b.includes('id="lp-074"')) || '';
{
  const need = [
    ['entry present', !!lp074],
    ['title', lp074.includes('RATIFY-TAX-50-II &mdash; Conditional Rate Schedule')],
    ['enacted badge', /class="status-badge status-enacted"/.test(lp074)],
    ['Schedules A and B active', lp074.includes('Schedules A and B Active')],
    ['historical no-rate-on-passage distinction', lp074.includes('it changed no rate on passage')],
    ['2294 certification link', lp074.includes('path-2-certification-2294.html')],
    ['2295 legal effect', lp074.includes('effective in the first 2295 assessment period')],
    ['active exact cascade named', lp074.includes('50% / 25% / 12.5% / 6.25%')],
    ['separate Lower Incidence Certificate certified', lp074.includes('Lower Incidence Certificate') && lp074.includes('B1&ndash;B6')],
    ['anchors the full statute', lp074.includes(STATUTE_PAGE)],
  ];
  const missing = need.filter(([, ok]) => !ok).map(([k]) => k);
  check(missing.length === 0, 'LP-074 register entry records both active schedules',
    missing.length ? `missing: ${missing.join(', ')}` : 'entry + certificate + 2295 effect + full authority + statute anchor');
}

/* (e2) HOUSE-STYLE GUARD (R16, v22.4.1). Register entries are editorial
   narrative in the register's voice. The apparatus of a working document —
   inline bracketed citations, a citation key, the statute's own sectioned text
   — belongs to the Ratification Record, where a reader has come for the
   instrument. LP-074 carried all of it into the register and made the case for
   the rule: the entry ran 43,000 characters, most of it petition text, and the
   register's other 87 entries do not read that way.

   The guard is over rendered form, not draft shorthand. R15 had already turned
   the sigils into links, so the drafts' literal "[P," never appears in the
   register — a guard on that string would pass forever while catching nothing.
   What the register can actually grow is what LP-074 actually had: ls-cite
   anchors, a law-statute block, a citation key. Those are what this refuses.
   The Ratification Record pages are exempt by construction: this reads only
   law-polling.html, and only inside law-entry articles. */
{
  const APPARATUS = [
    ['inline citation links', /class="ls-cite"/],
    ['statute text block', /class="law-statute"/],
    ['citation key', /Citation key/i],
    ['statute typography', /class="ls-(h|p|list|quote|hr)\b/],
  ];
  const blocks = law.split(/(?=<article class="law-entry)/).slice(1);
  const offenders = [];
  for (const b of blocks) {
    const id = (b.match(/id="(lp-[\w-]+)"/) || [])[1] || '?';
    const found = APPARATUS.filter(([, re]) => re.test(b)).map(([k]) => k);
    if (found.length) offenders.push(`${id}: ${found.join(', ')}`);
  }
  check(offenders.length === 0,
    'house style: register entries carry no working-document apparatus (R16)',
    offenders.length ? offenders.join('; ') : `${blocks.length} entries clean`);
}

/* (e3) The statute the register entry stops short of. R16 moved the full
   conditional text out of the register on the condition that it stay published
   and stay reachable — an entry that anchors a page that does not exist would
   be worse than the entry that carried its own text. So: the page exists, it is
   the instrument (not a summary of one), and it is not a register entry. */
{
  let src = '';
  try { src = read(STATUTE_PAGE); } catch { /* absent — reported below */ }
  const need = [
    ['page exists', !!src],
    ['Schedule A conditions (A1)', /A1/.test(src)],
    ['Schedule B conditions (B1)', /B1/.test(src)],
    ['full statute text', src.includes('RATIFY-TAX-50-II — Conditional Successor Petition')],
    ['citation apparatus retained', (src.match(/class="ls-cite"/g) || []).length >= 125],
    ['not a register entry', !src.includes('<article class="law-entry')],
    ['links back to LP-074', src.includes('law-polling.html#lp-074')],
    ['current wrapper: both schedules active from 2295', /Schedules? A and B (?:were )?certified in 2294[\s\S]{0,100}active from 2295/i.test(src)],
    ['current wrapper links final certificate', src.includes('path-2-certification-2294.html')],
  ];
  const missing = need.filter(([, ok]) => !ok).map(([k]) => k);
  check(missing.length === 0, `full conditional statute published at ${STATUTE_PAGE} (R16)`,
    missing.length ? `missing: ${missing.join(', ')}` : 'instrument + conditions + apparatus + backlink');
}

/* (f) ACTIVE-TAX-CANON GUARD. The rejected split implementation proved that a
   positive rate mention is insufficient. These assertions require the exact
   full cascade, both Schedule statuses, and narrowly reject split/pending/
   residual prose from current surfaces without suppressing labeled history. */
{
  const TAX = manifest.taxCanon || {};
  const RATE = TAX.composite;
  const text = (src) => stripComments(src)
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(nbsp|#160);/gi, ' ')
    .replace(/\s+/g, ' ');
  const hasCascade = (src) => /50%?[\s\S]{0,1000}25%?[\s\S]{0,1000}12\.5%?[\s\S]{0,1000}6\.25%?/.test(src);

  const manifestOk = RATE === '50 / 25 / 12.5 / 6.25'
    && TAX.effectiveYear === 2295
    && TAX.scheduleA === 'active'
    && TAX.scheduleB === 'active'
    && TAX.threshold === '$10 million'
    && TAX.lp073 === 'superseded'
    && TAX.lp075 === 'procedural'
    && TAX.scm === 'unchanged';
  check(manifestOk, 'tax canon manifest locks 50/25/12.5/6.25, 2295, A+B active, $10M, LP-073 superseded, LP-075 procedural, SCM unchanged',
    manifestOk ? RATE : JSON.stringify(TAX));

  const rateSurfaces = [
    'law-polling.html', 'rate-history.html', 'whitepaper.html', 'systems.html',
    'charter.html', 'faq.html', 'why-vmss.html', 'path-2-certification-2294.html',
    'path-2-charter.html', 'path-2-schedule.html', 'pending-ratification.html',
    STATUTE_PAGE,
  ];
  const silent = rateSurfaces.filter((f) => !hasCascade(read(f)));
  check(silent.length === 0, `current fiscal surfaces state the ${RATE} exact cascade`,
    silent.length ? `missing the live schedule: ${silent.join(', ')}` : rateSurfaces.join(', '));

  /* Ordered numbers are not enough: the public World-tier surfaces must map
     each number to the correct layer. This guards against a rate appearing in
     an unrelated historical table or a prose list with the lower layers
     silently transposed. */
  const hasLayerMap = (src) => [
    /(?:\+1\s*Sanctuary|Sanctuary[\s\S]{0,48}Main)[\s\S]{0,140}50%/i,
    /(?:−|-)1\s*Noncompliance[\s\S]{0,140}25%/i,
    /(?:−|-)2\s*Violent Offense[\s\S]{0,140}12\.5%/i,
    /(?:−|-)3\s*Terminal[\s\S]{0,140}6\.25%/i,
  ].every((re) => re.test(src));
  const layerMapNeed = ['systems.html', 'charter.html', 'whitepaper.html']
    .filter((file) => !hasLayerMap(read(file)));
  check(layerMapNeed.length === 0, 'Systems, Charter, and Whitepaper map every active rate to its correct layer',
    layerMapNeed.length ? `missing a four-layer mapping: ${layerMapNeed.join(', ')}` : '+1/Main 50; -1 25; -2 12.5; -3 6.25');

  const teachingNeed = [
    ['Academy source states the complete active mapping',
      read('documents/academy-source.html').includes('active LP-074 exact halving cascade is 50% in Main and Sanctuary, 25% in -1, 12.5% in -2, and 6.25% in -3')],
    ['Resources source states the complete active mapping',
      read('documents/resources-source.html').includes('active LP-074 exact halving cascade is 50% in Main and Sanctuary, 25% in -1, 12.5% in -2, and 6.25% in -3')],
    ['rate history calls the 2295 stratum exact and fully LP-074',
      read('rate-history.html').includes('Schedule A supplies 50% and Schedule B supplies 25% / 12.5% / 6.25%; LP-073 is fully superseded as operative law.')],
    ['FAQ gives -3 the active 6.25% top marginal rate',
      read('faq.html').includes('6.25% top marginal rate under the active LP-074 Schedule B')],
    ['current simulation uses the -3 6.25% tax rate',
      /(?:−|-)3[\s\S]{0,180}6\.25% (?:top-marginal )?tax/i.test(read('simulations.html'))],
    ['-1 layer page gives the active 25% top marginal tax rate',
      read('layer--1.html').includes('25% top marginal tax rate')],
    ['-3 layer page gives the active 6.25% top-marginal tax rate',
      read('layer--3.html').includes('6.25% top-marginal taxation')],
  ];
  const teachingMissing = teachingNeed.filter(([, ok]) => !ok).map(([label]) => label);
  check(teachingMissing.length === 0, 'teaching, history, FAQ, simulation, and layer surfaces carry the corrected active rates',
    teachingMissing.length ? teachingMissing.join('; ') : 'teaching + history + FAQ + simulation + layers aligned');

  const authorityNeed = [
    ['law-polling.html', [
      ['Schedules A and B active', /Schedules A and B Active/],
      ['2295 effect', /effective in the first 2295 assessment period/],
      ['SCM unchanged', /all SCM parameters[\s\S]{0,260}unchanged/],
    ]],
    ['path-2-certification-2294.html', [
      ['Schedule A and B activation', /Schedule A and Schedule B[\s\S]{0,240}(activates|activation|effective)/i],
      ['B1–B6 findings', /B1[\s\S]{0,500}B6/],
      ['2295 effect', /first assessment period on 1 January 2295/],
      ['SCM unchanged', /No Savings Circulation Mandate parameter[\s\S]{0,260}changed/],
    ]],
    ['systems.html', [
      ['Schedule A and B active', /Schedule A and Schedule B are active/],
      ['2295 effect', /from 2295/],
      ['SCM unchanged', /SCM\) parameter remains unchanged/],
    ]],
  ];
  const authorityMissing = [];
  for (const [file, needs] of authorityNeed) {
    const src = read(file);
    for (const [label, re] of needs) if (!re.test(src)) authorityMissing.push(`${file}: ${label}`);
  }
  check(authorityMissing.length === 0, 'authoritative tax surfaces state both activations, 2295 effect, and unchanged SCM',
    authorityMissing.length ? authorityMissing.join('; ') : 'register + certificate + Systems agree');

  const currentStatusSurfaces = ['law-polling.html', 'systems.html', 'charter.html', 'faq.html', 'whitepaper.html', 'why-vmss.html', CERTIFICATION_PAGE, 'path-2-charter.html', 'path-2-schedule.html', 'path-2-risk-register.html', 'pending-ratification.html', STATUTE_PAGE];
  const currentTaxDetailSurfaces = [
    'systems.html', 'charter.html', 'faq.html', 'whitepaper.html', 'why-vmss.html',
    'simulations.html', 'layer--1.html', 'layer--2.html', 'layer--3.html',
    'documents/academy-source.html', 'documents/resources-source.html',
  ];
  const legacyLowerRate = (rate) => new RegExp(
    `(?:\\b${rate}\\s*%\\s+(?:top\\s*)?marginal(?:\\s+(?:tax|rate))?|\\b(?:top\\s*)?marginal(?:\\s+(?:tax|rate))?[^.]{0,42}\\b${rate}\\s*%|\\b(?:tax(?:ation)?\\s+rate|rate\\s+of)[^.]{0,24}\\b${rate}\\s*%)`,
    'i',
  );
  const staleCurrentTax = currentStatusSurfaces.flatMap((file) => {
    const src = text(read(file));
    const bad = [
      /50\s*\/\s*35\s*\/\s*17\s*\/\s*8/i,
      /50%\s*\/\s*35%\s*\/\s*17%\s*\/\s*8%/i,
      /Schedule B (?:remains |is )?pending/i,
      /residual lower-rate authority/i,
      /LP-073 (?:remains|retains|supplies)[^.]{0,130}(?:authority|lower|rate)/i,
      /evidence-responsive split/i,
    ].filter((re) => re.test(src));
    return bad.length ? [`${file}: ${bad.length} stale current-tax pattern(s)`] : [];
  }).concat(currentTaxDetailSurfaces.flatMap((file) => {
    const src = text(read(file));
    const stale = [35, 17, 8].filter((rate) => legacyLowerRate(rate).test(src));
    return stale.length ? [`${file}: stale current lower tax rate(s) ${stale.join('/')}%`] : [];
  }));
  check(staleCurrentTax.length === 0, 'current fiscal surfaces contain no split/pending/residual tax doctrine',
    staleCurrentTax.length ? staleCurrentTax.join('; ') : 'narrowly enumerated surfaces clean');

  /* Current World-tier explanation pages may mention 70 only as explicitly
     historical contrast. A raw 70% tax table/claim here is a regression even
     if an unrelated paragraph happens to contain the new composite. */
  const currentOnlySurfaces = ['systems.html', 'charter.html', 'faq.html', 'why-vmss.html', 'whitepaper.html'];
  const legacyTaxClaims = (file) => {
    const src = text(read(file));
    const needles = [/\b70\s*%/gi, /\b70\s*\/\s*35\s*\/\s*17\s*\/\s*8\b/gi];
    const offenders = [];
    for (const re of needles) {
      for (const m of src.matchAll(re)) {
        const sentenceStart = src.lastIndexOf('.', m.index) + 1;
        const sentenceEnd = src.indexOf('.', m.index + m[0].length);
        const sentence = src.slice(sentenceStart, sentenceEnd === -1 ? src.length : sentenceEnd + 1);
        const taxRelated = /\b(tax|taxation|marginal|income|schedule)\b/i.test(sentence);
        const historic = /\b(historical|former|prior|then-live|pre-certification|through 2294|before 2295|at the time|contrast|from 70 to 50)\b/i.test(sentence);
        if (taxRelated && !historic) offenders.push(sentence.trim().slice(0, 180));
      }
    }
    return offenders;
  };
  const unlabelledLegacy = currentOnlySurfaces.flatMap((f) => legacyTaxClaims(f).map((excerpt) => `${f}: ${excerpt}`));
  check(unlabelledLegacy.length === 0, 'current doctrine surfaces contain no unlabelled live 70-tax claim',
    unlabelledLegacy.length ? unlabelledLegacy.slice(0, 3).join('; ') : '70 appears only as labeled history where applicable');

  /* Search descriptions, Open Graph, and Twitter metadata separately: their
     stale content is invisible to the body-text checks above. */
  const metadataOffenders = [];
  for (const file of readdirSync(ROOT).filter((f) => f.endsWith('.html'))) {
    const metas = read(file).match(/<meta\b[^>]*>/gi) || [];
    for (const tag of metas) {
      if (!/(?:name|property)=["'](?:description|og:description|twitter:description)["']/i.test(tag)) continue;
      const content = (tag.match(/\bcontent=(["'])([\s\S]*?)\1/i) || [])[2] || '';
      const hasLegacyTax = /\b70\s*%(?:[^.]{0,120})\b(?:tax|marginal|rate|schedule)\b|\b(?:tax|marginal|rate|schedule)\b[^.]{0,120}\b70\s*%|\b70\s*\/\s*35\s*\/\s*17\s*\/\s*8\b/i.test(content);
      const historic = /\bhistorical\b|\bformer\b|\bthrough 2294\b/i.test(content);
      if (hasLegacyTax && !historic) metadataOffenders.push(`${file}: ${content}`);
    }
  }
  check(metadataOffenders.length === 0, 'page descriptions and social metadata carry no stale current 70-tax claim',
    metadataOffenders.length ? metadataOffenders.join('; ') : 'all description/OG/Twitter fields clean');

  const metadataNeed = [
    ['rate-history metadata labels historical 70 and active exact cascade',
      read('rate-history.html').includes('historical 70/35/17/8') && read('rate-history.html').includes('active exact 50/25/12.5/6.25')],
    ['certificate metadata gives 2295 full effect',
      read('path-2-certification-2294.html').includes('both LP-074 schedules') && read('path-2-certification-2294.html').includes('effective in 2295')],
    ['statute metadata gives both schedules 2294/2295 status',
      /Schedules? A and B[\s\S]{0,100}(?:certified|active)/i.test(read(STATUTE_PAGE)) && read(STATUTE_PAGE).includes('2295')],
  ];
  const metadataMissing = metadataNeed.filter(([, ok]) => !ok).map(([label]) => label);
  check(metadataMissing.length === 0, 'tax-bearing metadata identifies the current state or labels history',
    metadataMissing.length ? metadataMissing.join('; ') : 'rate history + certificate + statute metadata aligned');

  /* Raw source and process records retain original historical language. Their
     wrappers must survive so a repository grep cannot turn record text into a
     present-tense claim. */
  const archiveLabels = [
    ['docs-review/session-handoff-post-path2-arc.md', 'Historical handoff status'],
    ['docs-review/first-run-cold-pass-prompt.md', 'Historical review frame'],
    ['docs-review/first-run-preregistration-record.md', 'Historical review frame'],
    ['docs-review/path2-charter-schedule-10-4.md', 'Historical source status'],
    ['docs-review/path-2-charter-draft-v4.md', 'Historical draft status'],
    ['docs-review/RATIFY-TAX-50-session-record.md', 'Process-record status'],
    ['docs-review/RATIFY-TAX-50-opposition-brief.md', 'Archival / pre-certificate brief'],
    ['docs-review/AFFIRM-TAX-50-advocacy-brief.md', 'Historical advocacy record'],
    ['docs-review/AFFIRM-TAX-50-supplemental-brief.md', 'Historical advocacy record'],
    ['docs-review/RATIFY-TAX-50-II-petition.md', 'Historical filed/enacted conditional instrument'],
  ];
  const unframedArchives = archiveLabels.filter(([file, label]) => !read(file).includes(label)).map(([file]) => file);
  check(unframedArchives.length === 0, 'historical/process sources frame their retained historical language',
    unframedArchives.length ? `missing archive frame: ${unframedArchives.join(', ')}` : `${archiveLabels.length} retained records framed`);
}

/* (f2) The 2294 certification is a public, reproducible activation record for
   both independently conditioned schedules, not merely a relabeled A-only
   document. Its data and offline verifier must travel with the certificate;
   the 2291 Act remains narrow procedural law. */
{
  const optionalRead = (f) => { try { return read(f); } catch { return ''; } };
  const cert = optionalRead(CERTIFICATION_PAGE);
  const act = optionalRead(COMMENCEMENT_ACT_PAGE);
  const data = optionalRead(CERTIFICATION_DATA);
  const certNeed = [
    ['certificate page exists', !!cert],
    ['certificate is noindex', /name="robots" content="noindex, follow"/.test(cert)],
    ['certificate records A1–A8', cert.includes('A1 — Provenance') && cert.includes('A8 — Reproducibility')],
    ['certificate records B1–B6', cert.includes('B1 — Complete route map') && cert.includes('B6 — Reproducibility and adoption')],
    ['certificate links public JSON', cert.includes(CERTIFICATION_DATA)],
    ['certificate links deterministic verifier', cert.includes(CERTIFICATION_VERIFIER)],
    ['certificate sets 2295 effect', cert.includes('first assessment period on 1 January 2295')],
    ['certificate activates exact Schedule B rates', cert.includes('25% / 12.5% / 6.25%') && cert.includes('Schedule A and Schedule B independently cleared')],
    ['public appendix exists', !!data],
    ['public appendix has all A and B monthly series', data.includes('"mainCurrent"') && data.includes('"mainForward"') && data.includes('"adtTrailing"') && data.includes('"lowerIncidence"') && data.includes('"currentMonths"') && data.includes('"forwardMonths"')],
  ];
  const certMissing = certNeed.filter(([, ok]) => !ok).map(([k]) => k);
  check(certMissing.length === 0, '2294 full LP-074 certificate is public and reproducible',
    certMissing.length ? `missing: ${certMissing.join('; ')}` : 'page + A1–A8 + B1–B6 + data + verifier + 2295 effect');

  const actNeed = [
    ['Act page exists', !!act],
    ['Act is noindex', /name="robots" content="noindex, follow"/.test(act)],
    ['Act identifies LP-075 and 2291', act.includes('LP-075 — Path 2 Commencement Duty Act') && act.includes('2291 (Y190)')],
    ['Act preserves A1–A8 and B1–B6', act.includes('A1–A8') && act.includes('B1–B6')],
    ['Act requires 180-day remedial constitution', act.includes('within 180 days')],
    ['Act preserves the 2292 lock', act.includes('lock in 2292')],
    ['Act makes no direct rate change', act.includes('No rate changes directly through LP-075.')],
    ['Act keeps Schedule B findings independent', /Schedule A(?:[’']s)? (?:showing|finding(?:s)?|evidence)[\s\S]{0,160}(?:cannot|does not|did not) substitute for Schedule B/i.test(act)],
  ];
  const actMissing = actNeed.filter(([, ok]) => !ok).map(([k]) => k);
  check(actMissing.length === 0, 'LP-075 remains a noindex procedural commencement Act',
    actMissing.length ? `missing: ${actMissing.join('; ')}` : '2291 + cadence + lock + unchanged gates + independent B findings');

  let verifierOutput = '';
  let verifierOk = false;
  try {
    verifierOutput = execFileSync(process.execPath, [join(ROOT, CERTIFICATION_VERIFIER)], { encoding: 'utf8' });
    verifierOk = /PASS A1[\s\S]*PASS A8[\s\S]*PASS B1[\s\S]*PASS B6[\s\S]*FINAL ACTIVE SCHEDULE: 50 \/ 25 \/ 12\.5 \/ 6\.25/.test(verifierOutput);
  } catch (error) {
    verifierOutput = String(error?.stderr || error?.message || error);
  }
  check(verifierOk, '2294 deterministic certification verifier passes all A and B findings',
    verifierOk ? 'A1–A8 + B1–B6 reproduce from the public appendix' : verifierOutput.trim().slice(0, 240));
}

/* (g) PATH 2 CHARTER PAGES (R17–R20, v22.5). The certification methodology
   LP-074 fixes in advance lands as three World-tier instruments — the Charter,
   its §10.4 Schedule, and its Residual-Risk Register — cross-linked into a
   closed set (the two Presidential rulings that adopted them are Process tier,
   in the Ratification Record, and are not this guard's business). Modeled on
   the statute-page guard (e3): each page exists, is the instrument rather than
   a summary of one, carries its load-bearing anchors, and its cross-links
   resolve. The Article count is derived from the page (contiguous I–XIV), not
   asserted against a literal that would rot if the Charter were amended. */
const CHARTER_PAGE = 'path-2-charter.html';
const SCHEDULE_PAGE = 'path-2-schedule.html';
const REGISTER_PAGE = 'path-2-risk-register.html';
{
  const src = (f) => { try { return read(f); } catch { return ''; } };
  const charterSrc = src(CHARTER_PAGE);
  const scheduleSrc = src(SCHEDULE_PAGE);
  const registerSrc = src(REGISTER_PAGE);

  const artNums = [...charterSrc.matchAll(/id="art-(\d+)"/g)].map((m) => Number(m[1])).sort((a, b) => a - b);
  const artsItoXIV = artNums.length === 14 && artNums.every((n, i) => n === i + 1);

  const need = [
    ['charter page exists', !!charterSrc],
    ['charter is the instrument (THE PATH 2 CHARTER)', charterSrc.includes('THE PATH 2 CHARTER')],
    ['charter carries Articles I–XIV anchors (art-1 … art-14, contiguous)', artsItoXIV],
    ['charter links the register entry (law-polling.html#lp-074)', charterSrc.includes('law-polling.html#lp-074')],
    ['charter links LP-075', charterSrc.includes('law-polling.html#lp-075')],
    ['charter links 2294 certificate', charterSrc.includes(CERTIFICATION_PAGE)],
    ['charter links the Schedule', charterSrc.includes(SCHEDULE_PAGE)],
    ['schedule page exists', !!scheduleSrc],
    ['schedule is the instrument (Operative Measure)', scheduleSrc.includes('Operative Measure')],
    ['schedule carries Part D', /part d/i.test(scheduleSrc)],
    ['schedule links the Charter', scheduleSrc.includes(CHARTER_PAGE)],
    ['schedule links 2294 certificate', scheduleSrc.includes(CERTIFICATION_PAGE)],
    ['register page exists', !!registerSrc],
    ['register engraves through RR-12', registerSrc.includes('RR-12')],
    ['register links the Charter', registerSrc.includes(CHARTER_PAGE)],
    ['register links the Schedule', registerSrc.includes(SCHEDULE_PAGE)],
    ['register links 2294 certificate', registerSrc.includes(CERTIFICATION_PAGE)],
  ];
  const missing = need.filter(([, ok]) => !ok).map(([k]) => k);
  check(missing.length === 0, 'Path 2 Charter pages published + cross-linked (R17–R20)',
    missing.length ? `missing: ${missing.join('; ')}` : 'charter + schedule + register present, anchored, cross-linked');

  /* The two-way §10.4 ↔ Schedule chain, asserted where it lives: the link is
     present and its fragment resolves to a real id in the target. This is the
     same failure mode the R15 link-integrity guard closed generally; named
     here so a broken Charter/Schedule cross-reference fails as itself. */
  const chain = [
    ['charter → schedule#part-a present', charterSrc.includes(`${SCHEDULE_PAGE}#part-a`)],
    ['schedule #part-a resolves', scheduleSrc.includes('id="part-a"')],
    ['schedule → charter#s-10-4 present', scheduleSrc.includes(`${CHARTER_PAGE}#s-10-4`)],
    ['charter #s-10-4 resolves', charterSrc.includes('id="s-10-4"')],
    ['schedule → register#rr-9 present', scheduleSrc.includes(`${REGISTER_PAGE}#rr-9`)],
    ['register #rr-9 resolves', registerSrc.includes('id="rr-9"')],
  ];
  const broken = chain.filter(([, ok]) => !ok).map(([k]) => k);
  check(broken.length === 0, 'Path 2 Charter cross-links resolve to real anchors',
    broken.length ? `broken: ${broken.join('; ')}` : 'two-way §10.4 ↔ Schedule + Register chain resolves');
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
  'systems.html', 'technologies.html', 'faq.html', 'why-vmss.html',
  'path-2-certification-2294.html', 'path-2-commencement-duty-act.html']) {
  const ids = [...stripComments(read(p)).matchAll(/ id="([^"]+)"/g)].map((m) => m[1]);
  const dupes = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
  check(dupes.length === 0, `${p}: no duplicate ids`, dupes.length ? `dupes: ${dupes.join(', ')}` : `${ids.length} ids`);
}

/* ---- 8b. LINK-INTEGRITY GUARD (R15 §2/§5) ----
   R15's readability rule has a machine half: a citation may not promise a
   section and deliver a page top. Section 9 below already checks in-page
   anchors on five pages; this checks the case that actually broke — a fragment
   href from a World-tier page into *another* file, where the id has to exist in
   the target rather than locally. At v22.3 three such links pointed at
   pending-ratification.html#path-2, a section that existed with no id on it;
   every one of them silently landed the reader on the page top.

   Scope is every published root HTML page, including the Process record: an
   archive may preserve historic wording, but it may not leave a reader at the
   top of an unrelated page. Two exemptions, both narrow:
     - href="#" on a [data-toc-page] control. These are the whitepaper/world
       paginated-ToC buttons: the click handler calls preventDefault() and swaps
       the page in JS, so "#" is an inert fallback, not a citation. They promise
       no section and there is no id to point at. A bare href="#" anywhere else
       still fails.
     - mailto:/http(s):/external hrefs, which this guard does not own. */
{
  const sitePages = readdirSync(ROOT).filter((f) => f.endsWith('.html'));
  const idCache = new Map();
  const idsIn = (f) => {
    if (!idCache.has(f)) {
      try { idCache.set(f, new Set([...stripComments(read(f)).matchAll(/ id="([^"]+)"/g)].map((m) => m[1]))); }
      catch { idCache.set(f, null); } // file missing
    }
    return idCache.get(f);
  };
  const dead = [];
  let checked = 0;
  for (const f of sitePages) {
    const src = stripComments(read(f));
    // cross-file: page.html#fragment
    for (const m of src.matchAll(/href="([A-Za-z0-9._/-]+\.html)#([^"]+)"/g)) {
      const [, tgt, frag] = m;
      checked++;
      const ids = idsIn(tgt);
      if (ids === null) { dead.push(`${f} -> ${tgt} (no such file)`); continue; }
      if (!ids.has(frag)) dead.push(`${f} -> ${tgt}#${frag}`);
    }
    // in-page: #fragment, incl. the empty href="#". Match the whole <a> tag:
    // data-toc-page sits after href in the markup, so attributes must be read
    // from the full tag rather than the slice preceding href.
    const local = idsIn(f);
    for (const m of src.matchAll(/<a\b[^>]*>/g)) {
      const tag = m[0];
      const href = (tag.match(/href="#([^"]*)"/) || [])[1];
      if (href === undefined) continue;
      if (href === '') {
        if (/data-toc-page=/.test(tag)) continue; // JS pager control, not a link
        dead.push(`${f} -> href="#" (not a ToC control)`);
        continue;
      }
      checked++;
      if (!local.has(href)) dead.push(`${f} -> #${href}`);
    }
  }
  check(dead.length === 0,
    `link integrity: every internal fragment href on published pages resolves (${sitePages.length} pages, ${checked} links)`,
    dead.length ? `dead: ${[...new Set(dead)].slice(0, 8).join('; ')}` : 'no page-top fallbacks, no dead fragments');
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
