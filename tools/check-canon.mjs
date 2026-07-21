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
import { evaluateCertification } from './verify-path2-certification-2294.mjs';
import { verifyRecordAnnexes } from './verify-path2-record-annexes.mjs';

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

/* Rate-law supersession chain. The official LP-074 is distinct from the
   deregistered drafting designation and became the current tail in 2295. */
const statusOfLp = (id) => {
  const block = law.split(/(?=<article class="law-entry)/).find((x) => x.includes(`id="${id}"`)) || '';
  return (block.match(/class="status-badge (status-[a-z]+)"/) || [])[1] || null;
};
{
  const CHAIN = ['lp-071', 'lp-072', 'lp-073', 'lp-074'];
  const chainStatuses = CHAIN.map(statusOfLp);
  const missing = CHAIN.filter((_, i) => chainStatuses[i] === null);
  const superseded = chainStatuses.slice(0, -1).every((s) => s === 'status-superseded');
  const tailActive = chainStatuses[chainStatuses.length - 1] === 'status-enacted' && law.includes('Schedules Active from 2295');
  const ok = missing.length === 0 && superseded && tailActive;
  check(ok, 'rate-history supersession chain (LP-071→072→073→074, active enacted tail)',
    missing.length ? `missing: ${missing.join(', ')}`
      : `historical=${chainStatuses.slice(0, -1).join('/')} tail=${chainStatuses[chainStatuses.length - 1]}`);
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
   (a2) The old LP-076 designation is fully retired: the number was a drafting
        designation that never registered in world, and RATIFY-TAX-50 content
        may never reappear under it. RETARGETED at v23.0.0: R15's own holding is
        that in-world numbering takes the next true number, so a number that was
        never consumed in world is available. The Enabling Consolidation
        Amendment was ratified into the lp-076 slot in 2299. The guard therefore
        no longer asserts the slot is empty — it asserts the slot is not the old
        designation: any lp-076 entry must be the amendment, and must carry no
        RATIFY-TAX-50 subject matter. Deleting either half re-opens the exact
        hole (a2) was written to close. */
{
  const entry = law.split(/(?=<article class="law-entry)/).find((b) => b.includes('id="lp-074"')) || '';
  check(entry.includes('RATIFY-TAX-50-II'),
    "register's LP-074 is RATIFY-TAX-50-II (R15: the R14 law takes the next true number)",
    entry ? 'entry present, titled RATIFY-TAX-50-II' : 'no lp-074 entry');

  const lp076 = law.split(/(?=<article class="law-entry)/).find((b) => b.includes('id="lp-076"')) || '';
  const lp076Ok = lp076.includes('The Enabling Consolidation Amendment') && !/RATIFY-TAX-50/.test(lp076);
  check(lp076Ok, 'register\'s LP-076 is the Enabling Consolidation Amendment, never the retired RATIFY-TAX-50 designation (R15)',
    lp076 ? (lp076Ok ? 'entry present, titled the Enabling Consolidation Amendment' : 'lp-076 entry is not the amendment, or carries RATIFY-TAX-50 subject matter') : 'no lp-076 entry');
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

/* (e) LP-074 is the active substantive rate law after the independent 2294
   Schedule A and B certifications. LP-073 remains visible but superseded;
   LP-075 remains procedural only. */
const lp073 = law.split(/(?=<article class="law-entry)/).find((b) => b.includes('id="lp-073"')) || '';
const lp074 = law.split(/(?=<article class="law-entry)/).find((b) => b.includes('id="lp-074"')) || '';
const lp075 = law.split(/(?=<article class="law-entry)/).find((b) => b.includes('id="lp-075"')) || '';
{
  const need = [
    ['LP-073 entry present and superseded', !!lp073 && /status-badge status-superseded/.test(lp073)],
    ['LP-074 entry present', !!lp074],
    ['title', lp074.includes('RATIFY-TAX-50-II &mdash; Conditional Rate Schedule')],
    ['enacted badge', /class="status-badge status-enacted"/.test(lp074)],
    ['active-from-2295 status', lp074.includes('Schedules Active from 2295')],
    ['Schedule A certified', lp074.includes('Schedule A') && lp074.includes('certified')],
    ['B1–B6 passed', lp074.includes('B1&ndash;B6') && lp074.includes('passed')],
    ['current cascade named', lp074.includes('50 / 25 / 12.5 / 6.25')],
    ['LP-075 procedural', !!lp075 && lp075.includes('compelling commencement, not by directing a rate')],
  ];
  const missing = need.filter(([, ok]) => !ok).map(([k]) => k);
  check(missing.length === 0, 'law-register authority chain: LP-073 superseded; LP-074 active; LP-075 procedural',
    missing.length ? `missing: ${missing.join(', ')}` : 'authority chain complete');
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

  /* (e2b) The same rule over the Code (v22.7.1). R16 binds laws.html exactly as
     it binds the register — entries are narrative plus meta — but until now the
     ban was enforced only on law-polling.html's .law-entry blocks, so the Code
     could have grown a citation key or a statute block without failing CI.

     The Taxation-title preamble is the one apparatus block R22 sanctions, and
     it is exempted by a structural marker rather than by position, so moving it
     cannot silently widen the exemption. Note the exemption is scoped to that
     block only: entries are matched separately and none of them can claim it. */
  const codeSrc = stripComments(read('laws.html'));
  const sanctioned = codeSrc.match(/<div class="code-preamble" data-r22="taxation-preamble">[\s\S]*?<\/div>\s*<article/);
  check(!!sanctioned, 'house style: the Code marks its one sanctioned apparatus block (R22 taxation preamble)',
    sanctioned ? 'data-r22="taxation-preamble" present' : 'marker missing — the R16 exemption has no stable anchor');
  const codeBlocks = [...codeSrc.matchAll(/<article class="code-entry[^"]*" id="([\w.-]+)"[\s\S]*?<\/article>/g)];
  const codeOffenders = [];
  for (const m of codeBlocks) {
    const found = APPARATUS.filter(([, re]) => re.test(m[0])).map(([k]) => k);
    if (found.length) codeOffenders.push(`${m[1]}: ${found.join(', ')}`);
  }
  check(codeOffenders.length === 0,
    'house style: Code entries carry no working-document apparatus (R16)',
    codeOffenders.length ? codeOffenders.join('; ') : `${codeBlocks.length} code entries clean`);
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
  ];
  const missing = need.filter(([, ok]) => !ok).map(([k]) => k);
  check(missing.length === 0, `full conditional statute published at ${STATUTE_PAGE} (R16)`,
    missing.length ? `missing: ${missing.join(', ')}` : 'instrument + conditions + apparatus + backlink');
}

/* (f) ACTIVE TAX-CANON GUARD. The controlling dataset and verifier decide the
   certification; public-page agreement alone is not enough. */
{
  const data = JSON.parse(read('documents/path-2-certification-2294-data.json'));
  const notice = JSON.parse(read('documents/path-2-effective-notice-2295.json'));
  const certification = evaluateCertification(data, notice);
  const normalizedText = (src) => stripComments(src)
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:nbsp|thinsp);/gi, ' ')
    .replace(/&(?:rarr|rightarrow);/gi, '→')
    .replace(/&(?:ndash|mdash);/gi, '–')
    .replace(/\s+/g, ' ')
    .trim();
  const tax = manifest.taxCanon;
  check(tax.activeSchedule === '50 / 25 / 12.5 / 6.25' && tax.effectiveYear === 2295,
    'canon manifest: exact cascade active from 2295');
  check(['findingI', 'findingII', 'findingIII', 'findingIV'].every((key) => tax[key] === 'pass') &&
        tax.scheduleA === 'certified' && tax.scheduleB === 'certified' && tax.effectiveNotice === 'valid',
    'canon manifest: Findings I–IV, Schedule A, B1–B6/Schedule B, and notice pass');
  check(tax.lp073 === 'superseded-in-2295' && tax.lp074 === 'active-substantive-rate-law' && tax.lp075 === 'procedural-only',
    'canon manifest: LP-073/074/075 authority roles');
  check(tax.threshold === '$10 million' && tax.scm === 'unchanged',
    'canon manifest: threshold and SCM unchanged');
  check(tax.lockDate === '2292-02-15' && tax.evidenceCutoff === '2292-01-01'
        && tax.mainAndLowerCompletedYear === 2291 && tax.dividendCompletedWindow === '2289-2291',
    'canon manifest: DATA-BACK completed-evidence vintage');
  check(tax.section4UnionMembers === 16 && tax.section4ClassRepresentatives === 8
        && tax.publicationRecord === 'complete',
    'canon manifest: complete §4 union and §11.1 publication record');

  check(certification.certified, 'structured certification result: complete record certifies',
    certification.certified ? 'schema + chronology + authority + unchanged canon + schedules + external notice' : certification.errors.join('; '));
  check(Object.values(certification.findings).every(Boolean)
        && certification.scheduleACertified
        && certification.scheduleBIndependentCertified
        && certification.scheduleBCertified,
    'structured certification result: Findings I–IV, Schedule A, and independent B1–B6 pass');
  check(Object.values(certification.validation).every(Boolean),
    'structured certification result: schema, chronology, authority, unchanged canon, and notice validate');
  try {
    const publicationRecord = verifyRecordAnnexes();
    check(publicationRecord.verified && publicationRecord.unionMembers === 16
      && publicationRecord.classRepresentatives === 8,
    'complete Path 2 publication record: §4 union, Restatement, Lower certificate, Registrar, and LP-075 review verify',
    `${publicationRecord.unionMembers} members / ${publicationRecord.classRepresentatives} representatives`);
  } catch (error) {
    check(false, 'complete Path 2 publication record verifies', error.message);
  }
  const whitepaperTax = normalizedText(read('whitepaper.html'));
  const dividendAggregate = `${(certification.metrics.scheduleA.adt36 * 100).toFixed(1)}%`;
  const dividendWeakest = `${(certification.metrics.scheduleA.dividendMinimum * 100).toFixed(1)}%`;
  check(whitepaperTax.includes(`${dividendAggregate} aggregate dividend coverage`)
        && whitepaperTax.includes(`${dividendWeakest} at the weakest month`)
        && !/123\.0809%|122\.39%/.test(whitepaperTax),
    'whitepaper reports the dataset-derived LP-070 figures', `${dividendAggregate} aggregate / ${dividendWeakest} weakest`);
  check(/LP-070 remains the enacted standing future gate/i.test(whitepaperTax)
        && /trailing 36-month window, with no single month below 100%/i.test(whitepaperTax)
        && /tax receipts, Lower-layer receipts, SCM recirculation, private velocity, backfill[^.]{0,100}do not count/i.test(whitepaperTax),
    'whitepaper preserves LP-070 as the standing future gate with prohibited substitutions excluded');
  /* Binding-source precedence, retargeted at v22.7.0. The sentence used to live
     on charter.html, inside the restatement paragraph that carried the federal
     rate schedule on the constitutional surface. R22 relocated that apparatus to
     the Code's Taxation-title preamble, so the pin moves with it: the Code is a
     consolidation classified secondary authority under LP-042, and it says so in
     the conflicts clause this pins. Retarget, not deletion — the invariant
     (some surface declares which text controls) is unchanged. */
  check(normalizedText(read('laws.html')).includes('If this consolidation and the enacted instrument diverge, the enacted instrument — as recorded in its Law Polling register entry and any published instrument page — controls.'),
    'VMSS Laws declares the conflicts clause (enacted instrument controls)');

  /* Cascade surfaces: charter.html swapped for laws.html at v22.7.0 (still 12).
     The Charter no longer states a subordinate-tier rate at all — the purity
     guard below now asserts the opposite of what this list used to assert about
     it — and the Code is the surface that must carry the schedule. */
  const currentSurfaces = ['laws.html', 'systems.html', 'whitepaper.html', 'faq.html', 'why-vmss.html',
    'layer--1.html', 'layer--3.html', 'simulations.html', 'documents/academy-source.html',
    'documents/resources-source.html', 'rate-history.html', 'law-polling.html'];
  const exactCascade = /(?:\b50\s*%?\s*\/\s*25\s*%?\s*\/\s*12\.5\s*%?\s*\/\s*6\.25\s*%?\b|\b50%[^.!?]{0,240}\b25%[^.!?]{0,240}\b12\.5%[^.!?]{0,240}\b6\.25%)/;
  const staleCurrent = [];
  const forbiddenCurrent = /(?:LP-073[^.!?]{0,120}(?:remains|is|still)\s+(?:current|active|operative)|(?:current|active|operative|since 2295|from 2295)[^.!?]{0,100}(?:70\s*%?\s*\/\s*35\s*%?\s*\/\s*17\s*%?\s*\/\s*8\s*%?|\b35%|\b17%|\b8%)|2294[^.!?]{0,120}(?:Finding III[^.!?]{0,50}(?:fail|did not pass)|Schedule [AB]\b[^.!?]{0,50}(?:refus|reject|not certified|not reached))|three findings passed[^.!?]{0,50}(?:one did not|one failed)|both refusals|chain with three links|executed (?:that logic|the logic) once already)/i;
  for (const file of currentSurfaces) {
    const src = normalizedText(read(file));
    const staleClaim = src.match(forbiddenCurrent)?.[0];
    if (!exactCascade.test(src) || staleClaim) staleCurrent.push(`${file}: ${staleClaim ? `forbidden "${staleClaim}"` : 'exact cascade absent'}`);
  }
  check(staleCurrent.length === 0, 'current surfaces carry the normalized exact cascade and reject old active-rate/refusal claims',
    staleCurrent.length ? staleCurrent.join(', ') : `${currentSurfaces.length} surfaces clear`);

  /* Authority assertions: the charter.html row became the laws.html row at
     v22.7.0. Same three patterns, same strictness — they moved with the
     apparatus block they were always describing. */
  const authorityAssertions = [
    ['laws.html', /LP-074 is the substantive rate law/i, /LP-073.{0,80}fully superseded as operative law/i, /LP-075 remains procedural only/i],
    ['rate-history.html', /current rate authority is LP-074/i, /LP-073 is historical/i, /LP-075 compelled the (?:audit|remedial process)/i],
    ['law-polling.html', /LP-073 is fully superseded as operative rate law/i, /LP-075.{0,120}(?:compel(?:led|s|ling) (?:the )?(?:audit|commencement|process)|procedural)/i],
  ];
  const missingAuthority = authorityAssertions.flatMap(([file, ...patterns]) => {
    const src = normalizedText(read(file));
    return patterns.filter((pattern) => !pattern.test(src)).map((pattern) => `${file}: ${pattern.source}`);
  });
  check(missingAuthority.length === 0, 'current-law surfaces positively identify LP-074 authority and LP-073/075 limits',
    missingAuthority.length ? missingAuthority.join('; ') : `${authorityAssertions.length} authority surfaces clear`);

  const worldPages = readdirSync(ROOT).filter((f) => f.endsWith('.html') && !f.startsWith('pending-') && f !== 'deregistered-statutes.html');
  const supersededOutcome = /(?:Finding III[^.!?]{0,100}(?:fail(?:ed|ure)?|did not pass)|Schedule A\b[^.!?]{0,100}(?:refus(?:ed|al)|reject(?:ed|ion)|not certified)|Schedule B\b[^.!?]{0,100}(?:not reached|refus(?:ed|al)|reject(?:ed|ion)|not certified)|2294[^.!?]{0,120}(?:three findings passed|one finding failed|both refusals)|lawful (?:nonactivation|failure)|both refusals|chain with three links)/i;
  const refusalLeaks = worldPages.flatMap((file) => {
    const claim = normalizedText(read(file)).match(supersededOutcome)?.[0];
    return claim ? [`${file}: "${claim}"`] : [];
  });
  check(refusalLeaks.length === 0, 'World-tier pages contain no superseded refusal outcome',
    refusalLeaks.length ? refusalLeaks.join(', ') : `${worldPages.length} pages clear`);

  /* (f2) CHARTER PURITY GUARD (v22.7.0, architecture §7.2). The structural half
     of the restructure, and the exact inverse of what the cascade list above
     used to assert about charter.html.

     Until v22.6 the Charter page carried the live federal rate schedule as
     article-text bullets. It was labelled a restatement, and it was one, but
     placement beat labelling: an LP-074 activation mutated the constitutional
     surface, and a reader — human or model — reasonably concluded the
     constitution had changed. R22 relocated the apparatus to the Code. This
     guard is what stops it coming back: the Charter states no subordinate-tier
     rate or schedule, and references no LP instrument outside a whitelist.

     Scope is deliberately exact. "No rate or schedule", not "no LP reference" —
     charter:247's LP-069 mention is category A under architecture §5 and is
     whitelisted here until the Phase 3 III.VII cure relocates it. Article
     III.II's PJS overtime figures ($125 / $62.50 / $31.25 / $15.63) are
     genuinely enacted Charter text, are category B under §5, and do not match
     the cascade regex — verified, not assumed. */
  {
    const charterSrc = read('charter.html');
    const charterText = normalizedText(charterSrc);
    const cascadeHit = charterText.match(exactCascade)?.[0];
    check(!cascadeHit, 'charter purity: the Charter states no subordinate-tier rate cascade',
      cascadeHit ? `found "${cascadeHit}"` : 'no exact-cascade match on the constitutional surface');

    /* Whitelist is by LP number, and it is a list of exactly one. Adding to it
       requires an architecture citation; the entry below carries its own. */
    const CHARTER_LP_WHITELIST = new Map([
      ['LP-069', 'architecture §5 category A — III.VII savings-base attribution; Phase 3 TODO: relocate with the III.VII text cure'],
    ]);
    const lpRefs = [...new Set([...stripComments(charterSrc).matchAll(/\bLP-\d[\d.]*/g)].map((m) => m[0]))];
    const unlisted = lpRefs.filter((lp) => !CHARTER_LP_WHITELIST.has(lp));
    check(unlisted.length === 0, 'charter purity: no unwhitelisted LP reference on the Charter page',
      unlisted.length ? `unlisted: ${unlisted.join(', ')}` : `${lpRefs.length} whitelisted (${lpRefs.join(', ') || 'none'})`);
    const stale = [...CHARTER_LP_WHITELIST.keys()].filter((lp) => !lpRefs.includes(lp));
    check(stale.length === 0, 'charter purity: whitelist carries no entry the Charter no longer references',
      stale.length ? `retire from whitelist: ${stale.join(', ')}` : 'whitelist exactly matches the survivors');
  }

  /* (f3) CODE INTEGRITY GUARDS (v22.7.0, architecture §7.3). laws.html is a
     consolidation of an enacted record, so the failure mode it can develop is
     silent divergence from that record. These convert that into CI red.

     The register is parsed here rather than trusted as a constant: the entry
     count, the section split, and every status are derived from law-polling.html
     the same way section 4 above derives them. */
  {
    const laws = stripComments(read('laws.html'));
    const registerBlocks = law.split(/(?=<article class="law-entry)/).slice(1);
    const regFederalStart = law.indexOf('id="federal-laws"');
    const regRegulatoryStart = law.indexOf('id="regulatory-petitions"');
    const registerStatus = new Map();
    let scan = 0;
    for (const block of registerBlocks) {
      const at = law.indexOf(block, scan);
      scan = at + 1;
      const id = (block.match(/id="(lp-[\w-]+)"/) || [])[1];
      if (!id) continue;
      registerStatus.set(id, {
        status: (block.match(/class="status-badge (status-[a-z]+)"/) || [])[1],
        section: at > regRegulatoryStart ? 'regulatory' : at > regFederalStart ? 'federal' : 'charter',
        /* The register marks a -3 advisory outcome with an advisory cell in the
           entry's own outcome table, independently of the entry's status badge. */
        advisoryOutcome: /<td class="advisory"/.test(block),
      });
    }

    /* Body-capturing, matching the generator's own regex. The body matters: at
       v22.7.0 the (b) source-anchor check tested the whole page, so an entry
       whose register anchor happened to be linked twice on the page passed even
       with its own Source link deleted — true of exactly LP-074 and LP-042.
       Entry-scoped is the only form that means what the label says. */
    /* Founding-corpus entries (latent-corpus sweep, v22.8.0) place an optional
       data-instrument="founding" between data-tier and data-source. The capture
       is optional so register-derived entries still match; founding entries are
       then explicitly partitioned out of the register guards (a1)/(a2)/(a3)/(b)
       and the (a4) 1:1 count below — never left to non-match silently — and are
       held to their own guards (i)-(iv). */
    const codeEntries = [...laws.matchAll(/<article class="code-entry[^"]*" id="([\w.-]+)" data-tier="([a-z]+)"(?: data-instrument="([a-z]+)")? data-source="([^"]*)">([\s\S]*?)<\/article>/g)]
      .map((m) => ({ id: m[1], tier: m[2], instrument: m[3], source: m[4], body: m[5] }));

    /* (c) tier vocabulary first — the later checks read data-tier. Asserted over
       EVERY data-tier on the page, not only the ones on entry articles: the
       generated ToC carries the attribute too, and a guard that only reads the
       articles would pass while the index above them advertised a fifth tier
       that does not exist. */
    const TIERS = new Set(['charter', 'federal', 'layer', 'district']);
    const declaredTiers = [...new Set([...laws.matchAll(/data-tier="([^"]*)"/g)].map((m) => m[1]))];
    const badTier = declaredTiers.filter((t) => !TIERS.has(t));
    check(badTier.length === 0, 'code integrity (c): data-tier vocabulary is charter|federal|layer|district',
      badTier.length ? `invalid: ${badTier.join(', ')}` : `${codeEntries.length} entries, ${declaredTiers.length} tiers declared`);

    /* (iv) data-instrument vocabulary — the founding partition below trusts this
       attribute to route an entry out of the register guards, so a forged or
       misspelled value must fail loudly rather than silently fall back to the
       register path. Absent = register-derived (the common case). Only
       'founding' is licensed today. Asserted over EVERY data-instrument on the
       page, ToC included, on the same principle as (c). */
    const INSTRUMENTS = new Set(['founding']);
    const declaredInstruments = [...new Set([...laws.matchAll(/data-instrument="([^"]*)"/g)].map((m) => m[1]))];
    const badInstrument = declaredInstruments.filter((t) => !INSTRUMENTS.has(t));
    check(badInstrument.length === 0, 'code integrity (iv): data-instrument vocabulary is {founding}',
      badInstrument.length ? `invalid: ${badInstrument.join(', ')}` : `${declaredInstruments.length || 'no'} data-instrument value(s) declared`);

    const lawEntries = codeEntries.filter((e) => e.tier !== 'charter');
    /* Founding-corpus entries derive from canon prose, not the register, so they
       are exempt from the register-1:1 guards but bound to (i)-(iii) below. */
    const foundingEntries = lawEntries.filter((e) => e.instrument === 'founding');
    const registerEntries = lawEntries.filter((e) => e.instrument !== 'founding');

    /* (a) Status whitelist, asserted in BOTH directions. Forward: every entry the
       Code publishes derives from a register entry whose status is publishable
       (enacted 1:1, mixed as per-layer outcomes, advisory with its flag).
       Backward: every enacted register entry — Federal and Regulatory alike —
       has exactly one Code entry. Forgetting to consolidate a new LP is the
       standing co-maintenance risk this project accepted; this is the tripwire. */
    const PUBLISHABLE = new Set(['status-enacted', 'status-mixed', 'status-advisory']);
    const unresolved = registerEntries.filter((e) => !registerStatus.has(e.source)).map((e) => `${e.id}→${e.source}`);
    check(unresolved.length === 0, 'code integrity (a1): every register-derived code entry data-source resolves to a register entry',
      unresolved.length ? `unresolved: ${unresolved.join(', ')}` : `${registerEntries.length} register entries resolve (${foundingEntries.length} founding entries partitioned out)`);

    const notPublishable = registerEntries
      .filter((e) => registerStatus.has(e.source) && !PUBLISHABLE.has(registerStatus.get(e.source).status))
      .map((e) => `${e.source}=${registerStatus.get(e.source).status}`);
    check(notPublishable.length === 0, 'code integrity (a2): no code entry derives from a failed/superseded/rerouted filing',
      notPublishable.length ? `not publishable: ${notPublishable.join(', ')}` : `${registerEntries.length} entries within the §3.3 whitelist`);

    const sources = registerEntries.map((e) => e.source);
    const duplicated = [...new Set(sources.filter((s, i) => sources.indexOf(s) !== i))];
    check(duplicated.length === 0, 'code integrity (a3): no register entry is consolidated twice',
      duplicated.length ? `duplicated: ${duplicated.join(', ')}` : `${sources.length} distinct sources`);

    const enactedIds = [...registerStatus.entries()].filter(([, v]) => v.status === 'status-enacted').map(([k]) => k);
    const unconsolidated = enactedIds.filter((id) => !sources.includes(id));
    check(unconsolidated.length === 0, 'code integrity (a4): every enacted register entry has a code entry (1:1)',
      unconsolidated.length ? `missing from the Code: ${unconsolidated.join(', ')}` : `${enactedIds.length} enacted entries consolidated`);

    /* (a5) §3.3 says advisory entries carry the advisory flag and mixed entries
       carry per-layer outcomes. Until v22.7.1 (a1)–(a4) asserted only status-set
       membership, so those two clauses were prose rather than enforcement — and
       four all-layer Tier 3 entries shipped without the flag under a green
       build. The hedge is pinned in its exact comma form, matching
       charter.html's own wording, because the comma is the hedge. */
    const ADVISORY_FLAG = 'advisory, not institutionally enforced';
    const mixedSources = registerEntries.filter((e) => registerStatus.get(e.source)?.status === 'status-mixed');
    /* Scope is derived from the register, not from a hand-kept list: an entry
       owes the flag if the register books it advisory outright, OR if the
       register's own outcome table carries an advisory row — which is how the
       -3 position is recorded for parallel petitions AND for the all-layer
       regulations that bind everywhere but are unenforced in -3. Deriving it
       this way is what makes the check bite on the four all-layer entries
       (LP-013/026/036/042), whose register status is plain `status-enacted`;
       a status-only rule would have left exactly the gap F6 found. */
    const owesFlag = registerEntries.filter((e) => {
      const reg = registerStatus.get(e.source);
      return reg && (reg.status === 'status-advisory' || reg.advisoryOutcome);
    });
    const missingFlag = owesFlag.filter((e) => !e.body.includes(ADVISORY_FLAG)).map((e) => e.id);
    check(missingFlag.length === 0,
      `code integrity (a5): every entry with an advisory -3 outcome carries "${ADVISORY_FLAG}" verbatim`,
      missingFlag.length ? `missing the flag: ${missingFlag.join(', ')}`
        : `${owesFlag.length} entries carry the flag, comma-exact`);

    /* (a6) Mixed petitions diverged along the layer gradient; §3.1.6 forbids
       flattening them to one summary. Assert the structure that actually
       carries the divergence: a per-layer outcome table with a row per layer. */
    const flattenedMixed = mixedSources.filter((e) => {
      const rows = (e.body.match(/<tr><th scope="row">/g) || []).length;
      return !/<div class="law-vote">/.test(e.body) || rows < 5;
    }).map((e) => e.id);
    check(flattenedMixed.length === 0,
      'code integrity (a6): every mixed petition states per-layer outcomes, never a flattened summary',
      flattenedMixed.length ? `flattened: ${flattenedMixed.join(', ')}`
        : `${mixedSources.length} mixed petitions carry a per-layer table`);

    /* (b) Belt-and-braces beside 8b: the Source link on each entry has to point
       at that entry's own register anchor, not merely at some real anchor. The
       test is scoped to the entry's own body — a page-wide substring test would
       let a second link to the same anchor elsewhere on the page satisfy it,
       which is how this check passed vacuously for LP-074 and LP-042 until
       v22.7.1. */
    const anchorMismatch = registerEntries.filter((e) => !e.body.includes(`href="law-polling.html#${e.source}"`)).map((e) => e.id);
    check(anchorMismatch.length === 0, 'code integrity (b): every register-derived code entry links its own register anchor from its own body',
      anchorMismatch.length ? `no source link in body: ${anchorMismatch.join(', ')}` : `${registerEntries.length} source links present`);

    /* (i)-(iii) FOUNDING-CORPUS GUARDS (latent-corpus sweep, v22.8.0; handoff
       §7.4 + architect note (b)). Founding instruments derive from canon prose
       and carry no register entry, so they cannot pass (a1)/(b); these are their
       equivalents. Vacuously green while no founding entry is authored — that is
       correct: the sweep authors them in Phase A and each becomes visible here at
       its first commit. Mutation-tested in tools/test-code-founding-guards.mjs. */
    const CANON_SOURCE = /^(?:whitepaper|systems|technologies|world|layers|layer-(?:\+1|0|-1|-2|-3)|sads)\.html$/;
    /* (i) data-source resolves: a bare existing page, or a file#anchor whose
       fragment is a real id in that file. whitepaper.html has no per-section
       anchors (F2), so founding entries cite it as a bare page and pin the
       section through the (i-wp) heading check instead. */
    const foundingResolve = foundingEntries.flatMap((e) => {
      const [file, frag] = e.source.split('#');
      let target; try { target = read(file); } catch { return [`${e.id}: no such file ${file}`]; }
      if (frag && !new RegExp(` id="${frag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`).test(target)) {
        return [`${e.id}: ${file}#${frag} does not resolve`];
      }
      return [];
    });
    check(foundingResolve.length === 0, 'code integrity (i): every founding entry data-source resolves (bare page or file#anchor)',
      foundingResolve.length ? foundingResolve.join('; ') : `${foundingEntries.length} founding data-sources resolve`);

    /* (i-wp) Whitepaper section pin: every "Whitepaper §N" a founding entry cites
       must exist as an <h2>N. heading. This is what gives (i) real bite for the
       whitepaper-homed instruments whose data-source is a bare page. */
    const whitepaper = read('whitepaper.html');
    const wpSection = (n) => new RegExp(`<h2[^>]*>\\s*${n}\\.`).test(whitepaper);
    const badWpCite = foundingEntries.flatMap((e) =>
      [...e.body.matchAll(/Whitepaper\s*&sect;\s*(\d+)|Whitepaper\s*§\s*(\d+)/g)]
        .map((m) => m[1] || m[2])
        .filter((n) => !wpSection(n))
        .map((n) => `${e.id}: Whitepaper §${n}`));
    check(badWpCite.length === 0, 'code integrity (i-wp): every cited Whitepaper §N exists as an <h2>N. heading',
      badWpCite.length ? badWpCite.join('; ') : `${foundingEntries.length} founding entries pin real whitepaper sections`);

    /* (ii) every founding entry names a whitepaper or World-tier canon source as
       its data-source — never charter.html (the home rule forbids a founding name
       for Charter-homed rules) and never a Process-tier or front page. */
    const noCanon = foundingEntries.filter((e) => !CANON_SOURCE.test(e.source.split('#')[0])).map((e) => `${e.id}→${e.source}`);
    check(noCanon.length === 0, 'code integrity (ii): every founding entry cites a whitepaper or World-tier canon source',
      noCanon.length ? noCanon.join('; ') : `${foundingEntries.length} founding entries are canon-sourced`);

    /* (iii) name-collision: no founding entry's title may equal an existing
       register law-title or a register-derived Code entry title — canon-already-
       named things are promoted verbatim, not re-minted under a colliding name. */
    const titleOf = (body) => (body.match(/<h3 class="law-title">([\s\S]*?)<\/h3>/) || [])[1]?.trim();
    const registerTitles = new Set([...law.matchAll(/<h3 class="law-title">([\s\S]*?)<\/h3>/g)].map((m) => m[1].trim()));
    const codeTitles = new Set(registerEntries.map((e) => titleOf(e.body)).filter(Boolean));
    const nameCollision = foundingEntries.flatMap((e) => {
      const t = titleOf(e.body);
      if (!t) return [`${e.id}: no law-title`];
      return (registerTitles.has(t) || codeTitles.has(t)) ? [`${e.id}: "${t}"`] : [];
    });
    check(nameCollision.length === 0, 'code integrity (iii): no founding entry name collides with a register or Code title',
      nameCollision.length ? nameCollision.join('; ') : `${foundingEntries.length} founding names are collision-free`);

    /* (v) FOUNDING-COUNT PARITY (latent-corpus sweep follow-up F1). The founding
       corpus is exactly the ratified inventory's PART 1 instrument set, less the
       instruments explicitly held from authoring. Both sides are derived
       mechanically — the PART 1 `### N.` instrument headings from the inventory,
       the founding entries from laws.html — so a dropped, duplicated or
       forgotten founding entry (or a silently grown/renumbered inventory) fails
       loudly here rather than drifting in under a green build; (i)-(iii) bind
       each founding entry's shape but say nothing about how many there must be.
       The held list is the one hand-kept constant: today a single instrument,
       PART 1 #55 The High-Consequence Environment Certification Standard (slug
       high-consequence-certification), held — not authored — because its sole
       source is simulations.html and handoff §4 forbids authoring a rule from
       narrative (worklog "The 60 vs 61 — #55 held (stop-condition-adjacent,
       flagged)"). Mutation-tested (probe v) in tools/test-code-founding-guards.mjs. */
    const HELD_FROM_FOUNDING = [55]; // PART 1 instrument numbers held, not authored (worklog "60 vs 61")
    const inventoryLines = read('docs-review/vmss-laws-latent-inventory.md').split('\n');
    const invP1 = inventoryLines.findIndex((l) => l.startsWith('## PART 1'));
    const invP2 = inventoryLines.findIndex((l) => l.startsWith('## PART 2'));
    const part1Instruments = (invP1 >= 0 && invP2 > invP1)
      ? [...inventoryLines.slice(invP1, invP2).join('\n').matchAll(/^### \d+\. /gm)].length
      : -1;
    const expectedFounding = part1Instruments - HELD_FROM_FOUNDING.length;
    check(part1Instruments > 0 && foundingEntries.length === expectedFounding,
      'code integrity (v): founding entries equal PART 1 instruments minus the held list',
      part1Instruments <= 0
        ? 'could not parse PART 1 instrument headings from docs-review/vmss-laws-latent-inventory.md'
        : `${foundingEntries.length} founding / ${expectedFounding} expected (${part1Instruments} PART 1 − ${HELD_FROM_FOUNDING.length} held: #${HELD_FROM_FOUNDING.join(', #')})`);

    /* (d) Tier 1 is an index of the Charter's own headings, and it must stay
       mechanically equal to them — count AND title text. Count-only would let a
       gist drift in under a correct number, which is the drift class the whole
       restructure exists to close. The regex is element-anchored so the h3
       `article-xxv-vi` is excluded by construction. */
    const charterHeads = [...read('charter.html').matchAll(/<h2 id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g)]
      .map((m) => ({ id: m[1], title: m[2].trim() }));
    const articleHeads = (read('charter.html').match(/<h2 id="article-/g) || []).length;
    const expectedRows = articleHeads + 2; // + Preamble + Founding Affirmation
    const indexRows = [...laws.matchAll(/<article class="code-entry[^"]*" id="[\w.-]+" data-tier="charter" data-source="([^"]+)">\s*<a class="code-index-title" href="charter\.html#([^"]+)">([\s\S]*?)<\/a>/g)]
      .map((m) => ({ source: m[1], href: m[2], title: m[3].trim() }));
    check(indexRows.length === expectedRows, 'code integrity (d1): Tier 1 indexes every Charter heading',
      `${indexRows.length} index rows / ${expectedRows} expected (${articleHeads} articles + Preamble + Founding Affirmation)`);
    const titleDrift = indexRows.flatMap((row, i) => {
      const head = charterHeads[i];
      if (!head) return [`row ${i + 1} (${row.source}): no matching Charter heading`];
      if (head.id !== row.source || head.id !== row.href) return [`row ${i + 1}: anchor ${row.source}/${row.href} vs Charter ${head.id}`];
      if (head.title !== row.title) return [`${head.id}: "${row.title}" vs Charter "${head.title}"`];
      return [];
    });
    check(titleDrift.length === 0, 'code integrity (d2): Tier 1 titles are textually equal to the Charter headings',
      titleDrift.length ? titleDrift.slice(0, 4).join('; ') : `${indexRows.length} titles equal, in order`);

    /* (e) Positive sitemap coverage. Section 2 above is negative-only — it
       asserts what the sitemap must NOT contain — so a new primary doctrine
       surface could ship unlisted forever. The Code is indexable by design
       (unlike rate-history/deregistered), so absence is a defect. */
    check(read('sitemap.xml').includes('laws.html'), 'code integrity (e): sitemap.xml lists laws.html');

    /* R22 durability pin (v22.7.1). The Code's title, its secondary-authority
       classification, and the Charter trim all rest on R22 being registered in
       the process record. It shipped as prose on a Process-tier page, so
       nothing but this pin stops a later edit from removing the ruling while
       leaving everything that depends on it standing. Pinned in the entity form
       the page actually uses. */
    const record = read('pending-ratification.html');
    const r22 = [
      ['ruling number', record.includes('R22')],
      ['doctrine name', record.includes('Restatement &amp; Consolidation Doctrine')],
    ].filter(([, ok]) => !ok).map(([k]) => k);
    check(r22.length === 0, 'R22 is registered on the Ratification Record (process record)',
      r22.length ? `missing: ${r22.join(', ')}` : 'ruling number + doctrine name present');

    /* R23 durability pin (latent-corpus sweep, v22.8.0). The founding-corpus Code
       band and the law-polling register-intro cure both rest on R23 being
       registered as the declaratory-codification ruling; pin it in the entity
       form the page uses so a later edit cannot remove the ruling while leaving
       the 60 founding entries that depend on it standing. */
    const r23 = [
      ['ruling number', record.includes('R23')],
      ['doctrine name', record.includes('The Codification Sweep')],
    ].filter(([, ok]) => !ok).map(([k]) => k);
    check(r23.length === 0, 'R23 is registered on the Ratification Record (process record)',
      r23.length ? `missing: ${r23.join(', ')}` : 'ruling number + doctrine name present');

    /* ToC sync, mirroring the register's own 'ToC links = entries' check above.
       The Code's index is generated, so a mismatch means the generator was not
       re-run after an entry landed — the same failure the register guard has
       caught since v20.5.5, on the same terms. */
    const tocLinks = [...laws.matchAll(/<a href="#([\w.-]+)" class="toc-link"/g)].map((m) => m[1]);
    const entryIdSet = new Set(codeEntries.map((e) => e.id));
    const orphanLinks = tocLinks.filter((id) => !entryIdSet.has(id));
    const unindexed = codeEntries.filter((e) => !tocLinks.includes(e.id)).map((e) => e.id);
    check(tocLinks.length === codeEntries.length && !orphanLinks.length && !unindexed.length,
      'code integrity: Code ToC indexes every entry (else run tools/build-law-toc.mjs --laws)',
      orphanLinks.length || unindexed.length
        ? `orphan links: ${orphanLinks.join(', ') || 'none'}; unindexed: ${unindexed.join(', ') || 'none'}`
        : `${tocLinks.length} links / ${codeEntries.length} entries`);
  }

  /* (f4) TIER-CLAIM GUARD (v22.7.0, architecture §7.3f). The live-misattribution
     class this project was opened to cure: faq.html asserted "no federal tax
     code (taxation is charter-level and layer-stratified)" — flatly false
     against the Charter's own restatement note and against LP-074. Prose that
     attributes the rate schedule to the constitutional tier is now a CI failure
     rather than a thing a reader has to catch.

     Deliberately narrow: it fires on a predication ("taxation is charter-level",
     "the rate schedule is constitutional"), not on mere adjacency, because
     "constitutional" legitimately appears near tax vocabulary all over the
     corpus — Article III is in the constitution, and saying so is correct. */
  {
    const TIER_MISATTRIBUTION = /\b(?:tax(?:ation|es)?|tax code|rate schedule|top marginal rates?|the (?:rate )?cascade)\b[^.!?]{0,60}\b(?:is|are|sits? at|remains?)\b[^.!?]{0,40}\b(?:charter-level|charter level|constitutional(?:ly)?|charter-tier)\b/i;
    const offenders = worldPages.flatMap((file) => {
      const hit = normalizedText(read(file)).match(TIER_MISATTRIBUTION)?.[0];
      return hit ? [`${file}: "${hit}"`] : [];
    });
    check(offenders.length === 0,
      `tier-claim guard: no World-tier page places the rate schedule at the constitutional tier (${worldPages.length} pages)`,
      offenders.length ? offenders.join('; ') : 'no tier misattribution');
  }

  const statute = read(STATUTE_PAGE);
  check(statute.includes('ENACTED, CONDITION NOT SATISFIED') === false &&
        statute.includes('ENACTED — SCHEDULES ACTIVE FROM 2295') &&
        statute.includes('50 / 25 / 12.5 / 6.25'),
    'full LP-074 statute wrapper states both schedules active from 2295');

  try {
    execFileSync(process.execPath, [join(ROOT, 'tools/build-path2-certification-page.mjs'), '--check'], { encoding: 'utf8' });
    check(true, 'generated certification page agrees with controlling dataset');
  } catch (error) {
    check(false, 'generated certification page agrees with controlling dataset', String(error.stdout || error.message));
  }
  try {
    execFileSync(process.execPath, [join(ROOT, 'tools/build-path2-record-annexes.mjs'), '--check'], { encoding: 'utf8' });
    check(true, 'five machine-readable Path 2 annexes agree with their controlling sources');
  } catch (error) {
    check(false, 'five machine-readable Path 2 annexes agree with their controlling sources', String(error.stdout || error.message));
  }
  try {
    const out = execFileSync(process.execPath, [join(ROOT, 'tools/test-path2-certification-mutations.mjs')], { encoding: 'utf8' });
    const summary = out.trim().split('\n');
    check(/\d+ hostile mutations rejected, 0 accepted; positive control passed/.test(out), 'hostile certification mutation suite', summary[summary.length - 1]);
  } catch (error) {
    check(false, 'hostile certification mutation suite', String(error.stdout || error.message));
  }
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
    ['charter links the Schedule', charterSrc.includes(SCHEDULE_PAGE)],
    ['schedule page exists', !!scheduleSrc],
    ['schedule is the instrument (Operative Measure)', scheduleSrc.includes('Operative Measure')],
    ['schedule carries Part D', /part d/i.test(scheduleSrc)],
    ['schedule links the Charter', scheduleSrc.includes(CHARTER_PAGE)],
    ['register page exists', !!registerSrc],
    ['register engraves through RR-12', registerSrc.includes('RR-12')],
    ['register links the Charter', registerSrc.includes(CHARTER_PAGE)],
    ['register links the Schedule', registerSrc.includes(SCHEDULE_PAGE)],
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
const pages = ['index.html', 'charter.html', 'laws.html', 'whitepaper.html', 'faq.html', 'systems.html', 'world.html',
  'why-vmss.html', 'technologies.html', 'law-polling.html', 'simulations.html',
  'documents/academy-source.html', 'documents/resources-source.html'];
for (const p of pages) {
  const bad = stripComments(read(p)).match(/\bfive (siloed )?currenc/i);
  check(!bad, `${p}: no stale "five currencies"`);
}

/* Stale-placement pin (v22.7.1). The register's LP-070 entry used to say the
   Charter "now carries a marker pointing to its binding source". The trim
   removed that marker, so the sentence became false about a live surface. The
   ruling it records is untouched; only the placement description was cured, and
   this stops the stale phrasing coming back. */
check(!stripComments(read('law-polling.html')).includes('III.III now carries'),
  'law-polling: no stale claim that Charter III.III carries a restatement marker');

/* ---- 8. Duplicate DOM ids per page ---- */
for (const p of ['whitepaper.html', 'law-polling.html', 'laws.html', 'simulations.html', 'charter.html',
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
for (const p of ['simulations.html', 'charter.html', 'laws.html', 'systems.html', 'technologies.html', 'law-polling.html']) {
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
