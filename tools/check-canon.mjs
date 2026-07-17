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

/* Supersession chain (v22.0.1; re-anchored v22.1; closed v22.2): the excavated
   rate-history statutes form a single chain LP-071 → LP-072 → LP-073. Every
   link but the last is a superseded statute; exactly one — the tail — is the
   active schedule in force. Guards the record class against a second "active"
   schedule, a broken chain, or a renumbering that leaves the trajectory without
   a live terminus.

   The chain is now three links and ends there. From v22.0 to v22.1 it appeared
   to terminate at the drafting designation LP-074; R13 (v22.2) established that
   this was drafting history rather than world canon — the schedule never carried
   a chamber vote — and both designations were deregistered to the Process record.
   (The register's own LP-074, since R15, is RATIFY-TAX-50-II: a different
   instrument that changes no rate. See guard (a).) The guards below replace the
   old per-statute status assertions: they hold the register's numbering honest,
   hold the designation texts preserved verbatim off-register, hold the principle
   in doctrine, and hold the tier boundary itself. */
const statusOfLp = (id) => {
  const block = law.split(/(?=<article class="law-entry)/).find((x) => x.includes(`id="${id}"`)) || '';
  return (block.match(/class="status-badge (status-[a-z]+)"/) || [])[1] || null;
};
{
  const CHAIN = ['lp-071', 'lp-072', 'lp-073'];
  const chainStatuses = CHAIN.map(statusOfLp);
  const missing = CHAIN.filter((_, i) => chainStatuses[i] === null);
  const active = chainStatuses.filter((s) => s === 'status-active').length;
  const superseded = chainStatuses.filter((s) => s === 'status-superseded').length;
  const tailActive = chainStatuses[CHAIN.length - 1] === 'status-active';
  const ok = missing.length === 0 && active === 1 && superseded === CHAIN.length - 1 && tailActive;
  check(ok, 'rate-history supersession chain (LP-071→072→073, exactly one active)',
    missing.length ? `missing: ${missing.join(', ')}`
      : `active=${active} superseded=${superseded} tail=${chainStatuses[CHAIN.length - 1]}`);
}
/* (a) Register numbering is in-world numbering (R15, superseding the v22.2
   retired-numbers note). R13 had retired 074/075 permanently; R15 rescinds that
   as out-of-world history leaking into in-world numbering. The register never
   contained an LP-074 in world, so the R14 law takes the next true number and
   RATIFY-TAX-50-II renumbers LP-076 -> LP-074. What the earlier guard protected
   — the register must not assert a statute that never registered — is now
   protected by the facts themselves: LP-074 *is* a registered statute, and the
   drafting designations live off-register, labeled as designations (guard (b2)).

   (a1) The register's LP-074 is RATIFY-TAX-50-II, not a restored drafting text.
   (a2) The old number is fully retired from the tree: a stale #lp-076 would be a
        link into a slot the register no longer has. */
{
  const entry = law.split(/(?=<article class="law-entry)/).find((b) => b.includes('id="lp-074"')) || '';
  check(entry.includes('RATIFY-TAX-50-II'),
    "register's LP-074 is RATIFY-TAX-50-II (R15: the R14 law takes the next true number)",
    entry ? 'entry present, titled RATIFY-TAX-50-II' : 'no lp-074 entry');

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

  /* (b2) …and are labeled as designations, not statutes (R15 §1). The register's
     LP-074 is now a live law, so these texts must say what they are on their face:
     a reader arriving at either one must not read it as the register's LP-074. */
  const labels = [
    ['LP-074 designation label', /Drafting designation LP-074 \(process record — never registered in-world\)/],
    ['LP-075 designation label', /Drafting designation LP-075 \(process record — never registered in-world\)/],
    ['disambiguation header', /The register’s LP-074 is (<[^>]+>)*RATIFY-TAX-50-II/],
  ];
  const unlabeled = labels.filter(([, re]) => !re.test(dereg)).map(([k]) => k);
  check(unlabeled.length === 0,
    'deregistered-statutes.html labels both texts as drafting designations (R15 §1)',
    unlabeled.length ? `missing: ${unlabeled.join(', ')}` : 'both labeled + header');
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
  const worldPages = readdirSync(ROOT).filter((f) => f.endsWith('.html') && !PROCESS_TIER(f));
  const offenders = worldPages.filter((f) => BANNED.test(rendered(read(f))));
  check(offenders.length === 0,
    `layer guard: no World-tier page presents the founder as an in-world actor (${worldPages.length} pages)`,
    offenders.length ? `offenders: ${offenders.join(', ')}` : 'clean');
}

/* (e) LP-074 is registered, and registered as an uncommenced law (v22.4). The
   entry's whole legal character is that it is in force as a rule while both its
   rate schedules are inactive; the commencement line is what tells a reader so
   before they reach the schedules. An entry that lost that line would read as a
   50-schedule enactment, which is exactly the drift v22.2 spent a version
   correcting. */
const lp074 = law.split(/(?=<article class="law-entry)/).find((b) => b.includes('id="lp-074"')) || '';
{
  const need = [
    ['entry present', !!lp074],
    ['title', lp074.includes('RATIFY-TAX-50-II &mdash; Conditional Rate Schedule')],
    ['enacted badge', /class="status-badge status-enacted"/.test(lp074)],
    ['commencement line', lp074.includes('<strong>IN FORCE: rule only.</strong>')],
    ['schedules marked inactive', /Schedules A and B <strong>INACTIVE<\/strong>/.test(lp074)],
    ['live rates named', lp074.includes('<strong>70 / 35 / 17 / 8</strong>')],
  ];
  const missing = need.filter(([, ok]) => !ok).map(([k]) => k);
  check(missing.length === 0, 'LP-074 registered with its commencement line (enacted, schedules uncommenced)',
    missing.length ? `missing: ${missing.join(', ')}` : 'entry + badge + commencement + live rates');
}

/* (f) SCHEDULE-INACTIVITY GUARD (v22.3). Two halves, both load-bearing.

   The live schedule is 70/35/17/8 and nothing registered at v22.3 changes it:
   LP-074 registers a rule, not a rate. So every canon rate surface must still
   state the live schedule, and the 50-schedule must not appear anywhere on the
   World tier except inside the LP-074 entry, where it is quoted petition text
   describing what *would* take force on a certification that has not happened.

   The v22.2 World-tier numeral restriction therefore continues, with the
   register entry as its single sanctioned exception. 6.25 is the signature: it
   is the cascade's terminal rate, it appears in no other canon context, and it
   stood at zero across the World tier before this entry existed. (12.5 is not
   usable — the whitepaper numbers a section §12.5.) */
{
  const RATE = '70 / 35 / 17 / 8';
  const rateSurfaces = ['law-polling.html', 'rate-history.html'];
  const silent = rateSurfaces.filter((f) => !read(f).includes(RATE));
  check(silent.length === 0, `schedule-inactivity: rate surfaces still state ${RATE} (LP-073 in force)`,
    silent.length ? `missing the live schedule: ${silent.join(', ')}` : rateSurfaces.join(', '));

  const PROCESS_TIER = (f) => f.startsWith('pending-') || f === 'deregistered-statutes.html';
  const CASCADE = /6\.25/g;
  const worldPages = readdirSync(ROOT).filter((f) => f.endsWith('.html') && !PROCESS_TIER(f));
  const leaks = [];
  for (const f of worldPages) {
    const src = stripComments(read(f));
    const outside = f === 'law-polling.html' ? src.split(lp074).join(' ') : src;
    const n = (outside.match(CASCADE) || []).length;
    if (n) leaks.push(`${f} (${n})`);
  }
  check(leaks.length === 0,
    'schedule-inactivity: 50-schedule confined to the LP-074 entry, stated nowhere as in force',
    leaks.length ? `50-schedule outside LP-074: ${leaks.join(', ')}` : `${worldPages.length} World pages clear`);
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

/* ---- 8b. LINK-INTEGRITY GUARD (R15 §2/§5) ----
   R15's readability rule has a machine half: a citation may not promise a
   section and deliver a page top. Section 9 below already checks in-page
   anchors on five pages; this checks the case that actually broke — a fragment
   href from a World-tier page into *another* file, where the id has to exist in
   the target rather than locally. At v22.3 three such links pointed at
   pending-ratification.html#path-2, a section that existed with no id on it;
   every one of them silently landed the reader on the page top.

   Scope is every World-tier page (R15 §5), and targets may be any file, since
   the World tier cites the Process record. Two exemptions, both narrow:
     - href="#" on a [data-toc-page] control. These are the whitepaper/world
       paginated-ToC buttons: the click handler calls preventDefault() and swaps
       the page in JS, so "#" is an inert fallback, not a citation. They promise
       no section and there is no id to point at. A bare href="#" anywhere else
       still fails.
     - mailto:/http(s):/external hrefs, which this guard does not own. */
{
  const PROCESS_TIER = (f) => f.startsWith('pending-') || f === 'deregistered-statutes.html';
  const worldPages = readdirSync(ROOT).filter((f) => f.endsWith('.html') && !PROCESS_TIER(f));
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
  for (const f of worldPages) {
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
    `link integrity: every internal fragment href on the World tier resolves (${worldPages.length} pages, ${checked} links)`,
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
