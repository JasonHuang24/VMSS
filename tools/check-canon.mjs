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

/* (f) AUTHORITY-FIRST TAX CANON. Page agreement does not activate LP-074;
   the committed, digest-verified disposition record controls. */
{
  const data = JSON.parse(read(CERTIFICATION_DATA));
  const authority = read('documents/path-2-certification-2294-authority.md');
  const lp075Gap = read('documents/lp-075-section-13-1-record-gap.md');
  const certPage = read(CERTIFICATION_PAGE);
  const certSource = read('tools/build-path2-certification-page.mjs');
  const coreSource = read('tools/path2-certification-core.mjs');
  const executionSource = read('tools/path2-execution-engine.mjs');
  const mutationSource = read('tools/test-path2-certification-mutations.mjs');
  const currentPages = {
    'systems.html': read('systems.html'),
    'charter.html': read('charter.html'),
    'whitepaper.html': read('whitepaper.html'),
    'faq.html': read('faq.html'),
    'why-vmss.html': read('why-vmss.html'),
    'law-polling.html': law,
    'rate-history.html': read('rate-history.html'),
    'simulations.html': read('simulations.html'),
    'layer--1.html': read('layer--1.html'),
    'layer--3.html': read('layer--3.html'),
    'documents/academy-source.html': read('documents/academy-source.html'),
    'documents/resources-source.html': read('documents/resources-source.html'),
  };
  const entry = (id) => law.split(/(?=<article class="law-entry)/).find((b) => b.includes(`id="${id}"`)) || '';
  const status = (block) => (block.match(/class="status-badge (status-[a-z]+)"/) || [])[1];
  const lp073 = entry('lp-073');
  const lp074 = entry('lp-074');
  const lp075 = entry('lp-075');

  check(status(entry('lp-071')) === 'status-superseded' && status(entry('lp-072')) === 'status-superseded',
    'law register: LP-071 and LP-072 remain superseded');
  check(!/\blp-076\b/i.test(law), 'law register: no LP-076 renumbering regression');
  check(manifest.taxCanon.composite === '70 / 35 / 17 / 8' && manifest.taxCanon.lp073 === 'operative',
    'canon manifest: operative composite is LP-073');
  check(manifest.taxCanon.proposedComposite === '50 / 25 / 12.5 / 6.25',
    'canon manifest: LP-074 proposed composite preserved');
  check(manifest.taxCanon.scheduleA === 'refused-finding-iii' && manifest.taxCanon.scheduleB === 'not-reached',
    'canon manifest: Schedule A refused and Schedule B not reached');
  check(manifest.taxCanon.certificate2294 === 'complete-failure-finding-iii' && manifest.taxCanon.effectiveYear === 2271,
    'canon manifest: complete 2294 failure leaves LP-073 effective year unchanged');
  check(manifest.taxCanon.threshold === '$10 million' && manifest.taxCanon.scm === 'unchanged',
    'canon manifest: threshold and SCM remain unchanged');
  check(status(lp073) === 'status-enacted' && lp073.includes('point rates, exact halving cascade') && lp073.includes('editorial-corrigendum'),
    'law register: operative LP-073 wording preserved verbatim with dated corrigendum');
  check(status(lp074) === 'status-enacted' && lp074.includes('Conditions Not Satisfied'),
    'law register: LP-074 enacted but its evidence conditions were not satisfied');
  check(status(lp075) === 'status-enacted' && lp075.includes('lp-075-section-13-1-review.json'),
    'law register: LP-075 enacted with qualifying §13.1 review linked');

  check(data.record?.disposition === 'FAILED_FINDING_III' && data.activation?.legallyEffective === false,
    'certificate data: complete lawful failure and no activation');
  check(data.record?.operativeSchedule === '70 / 35 / 17 / 8' && data.record?.proposedSchedule === '50 / 25 / 12.5 / 6.25' && data.record?.supersededSchedule === null,
    'certificate data: operative and proposed schedules distinguished');
  check(data.authorityAudit?.lp070?.status === 'COMPLETE_PASS',
    'certificate data: LP-070 120%/36-month/no-month-below-100 gate satisfied');
  check(data.authorityAudit?.lp075?.status === 'COMPLETE',
    'certificate data: LP-075 §13.1 cold-review record complete');
  check(data.authorityAudit?.scheduleSequence?.status === 'COMPLETE_NON_ACTIVATION',
    'certificate data: Registrar execution → Schedule A refusal → non-activation sequence complete');
  check(data.authorityAudit?.preregistrationLock?.status === 'LOCKED' && data.authorityAudit?.registrarExecution?.status === 'EXECUTED_BEFORE_ISSUANCE',
    'certificate data: valid lock and pre-instrument §11.4 execution recorded');
  check(data.authorityAudit?.precisionClarification?.status === 'ADOPTED_PRE_LOCK',
    'certificate data: narrow Findings II/IV precision clarification predates lock');
  check(data.authorityAudit?.revocation?.status === 'RESOLVED_COUPLED_REVERSION' &&
        data.authorityAudit?.revocation?.states?.scheduleARevoked === '70 / 35 / 17 / 8',
    'certificate data: coupled-reversion state table resolved');

  const compendium = data.authorityAudit?.compendium?.inventory || [];
  const requiredCompendium = [
    'raw-data', 'preregistration', 'preregistration-lock-certificate', 'public-chambers-lock-record',
    'analytic-data', 'executed-calculation-output', 'calculation-code', 'environment-manifest',
    'source-provenance', 'transformation-rules', 'seeds', 'execution-logs',
    'section-4-3-validation-records', 'union-estimates-and-intervals',
    'finding-iv-member-derivations', 'mandatory-d1-d5-diagnostics', 'precision-measurement-amendment', 'cold-review-record',
    'commission-votes-dissents-declarations', 'registrar-certifications',
    'lower-incidence-certificate', 'lower-incidence-adoption',
  ];
  check(requiredCompendium.every((id) => compendium.some((x) => x.id === id && x.complete === true && /^[a-f0-9]{64}$/.test(x.digest))),
    '§11.1 compendium inventory: every component complete and digested', `${compendium.length} inventoried`);
  check(data.authorityAudit?.findingsIThroughIV?.status === 'COMPLETE_FAILURE' &&
        JSON.stringify(data.authorityAudit?.findingsIThroughIV?.dispositions) === JSON.stringify({ I: 'PASS', II: 'PASS', III: 'FAIL', IV: 'PASS' }) &&
        data.authorityAudit?.findingsIThroughIV?.requiredHorizonYears === 30,
    'controlling Findings I–IV explicitly complete with Finding III failure');
  {
    const executed = JSON.parse(read('documents/path2-compendium/execution-output.json'));
    const prereg = JSON.parse(read('documents/path2-compendium/preregistration-2292.json'));
    const lock = JSON.parse(read('documents/path2-compendium/preregistration-lock-certificate.json'));
    const registrar = JSON.parse(read('documents/path2-compendium/registrar-certification.json'));
    const scheduleA = JSON.parse(read(data.authorityAudit.scheduleSequence.artifacts.scheduleA));
    const codeManifest = JSON.parse(read('documents/path2-compendium/calculation-code-manifest.json'));
    check(JSON.stringify(executed.window) === JSON.stringify({ observation: [2272, 2291], training: [2272, 2286], heldOutValidation: [2287, 2291], thresholdBaseline: [2282, 2291], projection: [2295, 2324] }),
      'locked execution: observation, training, validation, baseline, and projection windows distinct');
    check(executed.validationRecords.length === prereg.admissibleSpecificationSet.length && executed.validationRecords.every((record) => record.rowLevel.length === 5) && executed.excludedMembers.length === 4,
      '§4.3 execution: every member has five held-out rows and failures remain published');
    check(Object.values(executed.findings).flatMap((finding) => finding.members).some((member) => member.interval.family === 'B-1' && Number.isInteger(member.interval.methodRecord.seed) && Number.isInteger(member.interval.methodRecord.blockLength)) &&
          Object.values(executed.findings).flatMap((finding) => finding.members).some((member) => member.interval.family === 'B-2' && Number.isInteger(member.interval.methodRecord.bandwidth)) &&
          executed.findings.IV.members.some((member) => member.interval.family === 'B-4' && member.interval.methodRecord.identificationRegionWidth > 0),
      '§10.4 execution: B-1 seed/block, B-2 HAC bandwidth, and B-4 identified region computed');
    check(Math.abs(executed.precisionCalculations.I.ceilings.coverage - 0.0974642798) < 1e-9 &&
          Math.abs(executed.precisionCalculations.II.ceilings.attributableDividend - 0.7465770967) < 1e-9 &&
          Math.abs(executed.precisionCalculations.III.ceilings.activation - 2.019159425) < 1e-9 &&
          Math.abs(executed.precisionCalculations.III.ceilings.flow - 0.872021) < 1e-9 &&
          Math.abs(executed.precisionCalculations.IV.ceilings.omScalar - 7.2617617981) < 1e-9 &&
          Object.values(executed.findings).flatMap((finding) => finding.members).every((member) => member.interval.width <= member.interval.precisionFloor),
      '§5.3 execution: outcome-specific precision ceilings recomputed and every interval fits');
    check(executed.findingIvDerivations.length === executed.findings.IV.members.length && executed.findingIvDerivations.every((item) => item.accountingIdentity.reconciles),
      'Schedule A.4: every admitted Finding IV member has a reconciled derivation');
    check(executed.diagnostics.length === Object.values(executed.findings).flatMap((finding) => finding.members).length && executed.diagnostics.every((item) => ['D1', 'D2', 'D3', 'D4', 'D5'].every((key) => item[key])),
      'Schedule A.6: D-1–D-5 present for every admitted union member');
    check(lock.registrarSignature.signature && lock.clerkSignature.signature && lock.publicChambersRecordReference && Object.values(lock.section91Checklist).every(Boolean),
      '§9.2 lock: signatures, public record, digest, and executability checklist complete');
    check(Date.parse(registrar.completedAt) < Date.parse(scheduleA.publishedAt) && Date.parse(scheduleA.publishedAt) < Date.parse('2294-02-15T12:00:00Z'),
      '§11.4 execution: Registrar completed before Schedule A and within two-year deadline');
    check(codeManifest.sources.length >= 6 && codeManifest.sources.some((source) => source.path === 'tools/path2-execution-engine.mjs') && codeManifest.sources.some((source) => source.path === 'package-lock.json'),
      '§11.1 calculation code: execution engine, builders, verifier, core, and dependency lock digested');
    check(executionSource.includes('studentizedBlockBootstrap') && executionSource.includes('hacForecastSe') && executionSource.includes('directScalarBlockBootstrap') && executionSource.includes('validateMemberOutcomeSpecific') && executionSource.includes('executeLockedAnalysis'),
      'calculation engine contains outcome-specific validation, genuine B-1, B-2 HAC, and direct-scalar B-4 paths');
  }
  check(authority.includes('LP-070') && authority.includes('Charter §11.1') && authority.includes('NOT ACTIVATED; LP-073 REMAINS OPERATIVE'),
    'authority matrix maps every disposition authority to committed evidence');
  check(lp075Gap.includes('previously reported repository gap is closed') && lp075Gap.includes('2300-07-18'),
    'LP-075 recovery notice distinguishes event and repository-publication dates');
  check(certPage.includes('SCHEDULE A REFUSED / COMPLETE RECORD') && certPage.includes('70 / 35 / 17 / 8') && certPage.includes('2294-01-10') && certPage.includes('Lock and independent execution'),
    'generated disposition page states complete failure and operative LP-073 schedule');
  check(certSource.includes('evaluateAuthorityRecord') && coreSource.includes('validateMonthlyRows'),
    'certificate generator uses shared authority and row validators');
  check(mutationSource.includes('tests.length'), 'permanent mutation-test suite present');
  {
    const statutePage = read(STATUTE_PAGE);
    const statuteSource = read('documents/ratify-tax-50-ii-statute-source.html');
    check(statutePage.includes('ENACTED, CONDITION NOT SATISFIED') && statutePage.includes('LP-073') && statutePage.includes('remains operative'),
      'full LP-074 statute page carries the non-activation status wrapper');
    check(statuteSource.includes('After Schedule A is certified, Schedule B activates if and only if') &&
          statuteSource.includes('final Lower Incidence Certificate'),
      'LP-074 source preserves the separate Schedule B condition');
    check(statutePage.includes('6. Schedule B certification') && statutePage.includes('Complete route map') &&
          statutePage.includes('Reproducibility and Path 2 adoption'),
      'full LP-074 statute page retains §6 and B1–B6');
  }

  for (const file of ['systems.html', 'charter.html', 'whitepaper.html', 'faq.html', 'why-vmss.html',
    'law-polling.html', 'rate-history.html', 'simulations.html', 'layer--1.html', 'layer--3.html',
    'documents/academy-source.html', 'documents/resources-source.html']) {
    const src = currentPages[file];
    check(src.includes('70 / 35 / 17 / 8') || src.includes('70%') && src.includes('35%') && src.includes('17%') && src.includes('8%'),
      `${file}: operative 70 / 35 / 17 / 8 represented`);
  }
  check(read('whitepaper.html').includes('at or above 120% over a trailing 36-month window, with no single month below 100%'),
    'whitepaper: exact LP-070 gate restored');

  const forbidden = [];
  for (const file of Object.keys(currentPages)) {
    const src = stripComments(read(file));
    if (/certificate (?:is )?(?:incomplete|void)|LP-074[^\n]{0,140}(?:schedules? (?:are )?active|activated in 2295|took effect in 2295)|LP-073[^\n]{0,140}(?:fully superseded|historical only)/i.test(src)) forbidden.push(file);
  }
  check(forbidden.length === 0, 'current-state surfaces contain no stale LP-074 activation or superseded-LP-073 claim',
    forbidden.length ? forbidden.join(', ') : 'clear');

  const firstRun = read('docs-review/the-first-run-simulation-v1.md');
  const firstRunReview = read('docs-review/the-first-run-simulation-v1-review-copy.md');
  check(firstRun.includes('ARCHIVE / NON-OPERATIVE') && firstRun.includes('illustrative'),
    'first-run chronicle cannot be mistaken for operative authority');
  check(firstRunReview.includes('INVALID NON-CANONICAL REVIEW FIXTURE'),
    'corrupted first-run review copy remains explicitly invalid');

  try {
    const out = execFileSync(process.execPath, [join(ROOT, CERTIFICATION_VERIFIER)], { encoding: 'utf8' });
    check(out.includes('FAILURE DISPOSITION VERIFIED: FAILED_FINDING_III; 70 / 35 / 17 / 8 remains operative'),
      'authority verifier confirms complete Finding III failure disposition');
  } catch (error) {
    check(false, 'authority verifier confirms complete Finding III failure disposition', String(error.stdout || error.message));
  }
  try {
    execFileSync(process.execPath, [join(ROOT, 'tools/build-path2-certification-page.mjs'), '--check'], { encoding: 'utf8' });
    check(true, 'generated certificate page agrees with authority data');
  } catch (error) {
    check(false, 'generated certificate page agrees with authority data', String(error.stdout || error.message));
  }
  try {
    const out = execFileSync(process.execPath, [join(ROOT, 'tools/test-path2-certification-mutations.mjs')], { encoding: 'utf8' });
    check(/85 passed, 0 failed/.test(out), 'malformed-record mutation suite', out.trim().split('\n').at(-1));
  } catch (error) {
    check(false, 'malformed-record mutation suite', String(error.stdout || error.message));
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
