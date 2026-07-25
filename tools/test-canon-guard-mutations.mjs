#!/usr/bin/env node
/**
 * test-canon-guard-mutations.mjs — mutation suite for check-canon.mjs itself.
 *
 * check-canon.mjs is the only thing standing between an editorial sweep and a
 * silent canon regression. Nothing was standing behind check-canon. This suite
 * is that thing: for every guard family in the checker, it corrupts the property
 * that guard claims to protect — in a throwaway copy of the repo — and asserts
 * the checker goes red FOR THAT GUARD. A guard that stays green under corruption
 * is a false-green, and a false-green is worse than no guard at all, because the
 * project has been trusting it.
 *
 * Five such guards were found and repaired by the v23.5 code audit. Each of
 * their probes is marked REGRESSION below and corrupts in the count-preserving
 * way that used to slip through:
 *   - archive stamps, status badges, register ToC links: page-wide totals, so a
 *     dropped item plus a stray duplicate elsewhere netted out to green.
 *   - pillar labels: counted but never identified, so a label could migrate to
 *     the wrong entry.
 *   - technologies accordions: `class="tech-card` required the token to lead the
 *     class attribute; the page writes it mid-attribute, so the guard had been
 *     matching zero of eleven accordions and passing on an empty set.
 * The census-floor probes cover that last class generally: no derived count may
 * be empty, so a renamed class fails loudly instead of quietly switching a guard
 * off.
 *
 * DESIGN
 *
 * One repo copy, reused. Each probe edits, runs the checker, and restores only
 * the files it touched. Copying per probe would triple the runtime and prove
 * nothing extra.
 *
 * The nested hostile-certification suite is STUBBED in the copy. check-canon
 * spawns tools/test-path2-certification-mutations.mjs (2272 mutations, ~5.7s of
 * its ~6.8s); at ~60 probes that is six minutes of re-proving something
 * `npm run test:certification` already proves on its own. The stub prints the
 * exact line the guard greps for, and the baseline run below is performed WITH
 * the stub in place, so every probe's red/green is measured against the same
 * conditions. The guard that reads that subprocess is still probed — see the
 * `nested cert suite` family, which corrupts the stub so the guard stops
 * recognising its output. The real failure mode (the suite exiting nonzero) is
 * covered by execFileSync throwing into check-canon's own catch.
 *
 * A red build is evidence only if it is red for the reason under test, so every
 * probe asserts its own guard's label appears in a FAIL line. Collateral (other
 * guards also firing) is reported but not failed on: canon is interconnected and
 * many corruptions legitimately trip more than one guard.
 *
 * ADDING A PROBE: append to PROBES. `find` is a literal substring by default
 * (first occurrence; `all: true` for every occurrence, `regex: true` to treat it
 * as a RegExp source). The harness fails loudly if a find-string is absent or an
 * edit is a no-op, so a probe can never pass by silently not corrupting
 * anything — which is the failure mode a mutation suite must not have.
 *
 * Run: node tools/test-canon-guard-mutations.mjs   (exit 0 = every guard bit)
 */
import { cpSync, mkdtempSync, readFileSync, writeFileSync, rmSync, existsSync } from 'fs';
import { execFileSync } from 'child_process';
import { tmpdir } from 'os';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/* family  — the guard family under test, as it appears in the coverage map
   label   — what the corruption is, in the terms an editor would recognise
   expect  — substring that must appear in a check-canon FAIL line
   edits   — the corruption */
const PROBES = [
  /* ---- 1. Consolidated simulation archive ---- */
  { family: 'archive: card block validity', expect: 'every card block valid',
    label: 'a card declares a section outside the known set',
    edits: [{ file: 'simulations.html', find: 'data-section="system-mechanisms"', replace: 'data-section="system-mechanismz"' }] },
  { family: 'archive: collection sums', expect: 'archive collection counts sum to cards',
    label: 'a card loses its collection attribute',
    edits: [{ file: 'simulations.html', find: 'data-collection="world"', replace: 'data-collection="worldz"' }] },
  { family: 'archive: section headers', expect: 'card sections match section headers',
    label: 'a section header no longer matches any card',
    edits: [{ file: 'simulations.html', find: 'data-section-header="boundary"', replace: 'data-section-header="boundaryX"' }] },
  { family: 'archive: category options', expect: 'every card section has a category <option>',
    label: 'a live section loses its filter <option>',
    edits: [{ file: 'simulations.html', find: 'value="stress-tests"', replace: 'value="stress-testsX"' }] },
  { family: 'archive: snapshot options', expect: 'every card version has a snapshot <option>',
    label: 'a live doctrine version loses its snapshot <option>',
    edits: [{ file: 'simulations.html', regex: true, find: '<option value="v8\\.0"', replace: '<option value="v8.0X"' }] },
  { family: 'archive: anchor uniqueness', expect: 'card anchors unique',
    label: 'two cards share one aria-controls target',
    edits: [{ file: 'simulations.html', regex: true, find: 'aria-controls="([^"]+)"([\\s\\S]*?)aria-controls="([^"]+)"', replace: 'aria-controls="$1"$2aria-controls="$1"' }] },
  { family: 'archive: anchor resolution', expect: 'every card block valid',
    label: 'every aria-controls retargeted — count and uniqueness preserved, resolution broken',
    edits: [{ file: 'simulations.html', regex: true, find: 'aria-controls="([^"]+)"', replace: 'aria-controls="$1-nope"' }] },
  { family: 'archive: stamps (REGRESSION)', expect: 'archive stamps cover cards',
    label: 'one card loses its Doctrine Snapshot stamp while another gains a duplicate — page-wide total unchanged',
    edits: [
      { file: 'simulations.html', find: 'Doctrine Snapshot:', replace: 'Snapshot vintage:' },
      { file: 'simulations.html', find: 'Doctrine Snapshot:', replace: 'Doctrine Snapshot: Doctrine Snapshot:' }] },
  { family: 'archive: advertised totals', expect: 'archive intro count',
    label: 'the intro prose advertises a stale simulation total',
    edits: [{ file: 'simulations.html', find: 'All 94 simulations', replace: 'All 93 simulations' }] },

  /* ---- 2. Redirect stubs + sitemap ---- */
  { family: 'redirect stubs: noindex', expect: 'simulations-world.html: noindex',
    label: 'a retired dossier stub becomes indexable',
    edits: [{ file: 'simulations-world.html', find: 'noindex', replace: 'index', all: true }] },
  { family: 'redirect stubs: meta-refresh', expect: 'meta-refresh to simulations.html',
    label: 'a stub redirects somewhere other than the hub',
    edits: [{ file: 'simulations-residents.html', find: 'url=simulations.html', replace: 'url=simulations-hub.html' }] },
  { family: 'redirect stubs: no migrated cards', expect: 'no migrated cards left',
    label: 'a migrated simulation card reappears on a stub',
    edits: [{ file: 'simulations-world.html', find: '</body>', replace: '<div class="simulation-card"></div></body>' }] },
  { family: 'sitemap: retired urls excluded', expect: 'sitemap drops retired dossier urls',
    label: 'a retired dossier url returns to the sitemap',
    edits: [{ file: 'sitemap.xml', find: '</urlset>', replace: '<url><loc>https://x/simulations-world.html</loc></url></urlset>' }] },

  /* ---- 3. Academy / Resources ---- */
  { family: 'academy: stamped count', expect: 'academy-source stamped count',
    label: 'the academy source advertises a stale stamped total',
    edits: [{ file: 'documents/academy-source.html', find: '94 stamped simulations', replace: '93 stamped simulations' }] },
  { family: 'academy: hub card counts', expect: 'hub academy card count',
    label: 'a question is added to the academy without updating the hub card',
    edits: [{ file: 'documents/academy-source.html', find: 'Question 33', replace: 'Question 34' }] },

  /* ---- 4. Law-polling register ---- */
  { family: 'register: section sums / stat cards', expect: 'stat card',
    label: 'a section boundary moves, reassigning entries between Federal and Regulatory',
    edits: [{ file: 'law-polling.html', regex: true, find: '(<article class="law-entry[^"]*" id="lp-050")', replace: '<span id="regulatory-petitions"></span>$1' }] },
  { family: 'register: stat card totals', expect: 'stat card: Entries',
    label: 'the Entries stat card drifts from the derived total',
    edits: [{ file: 'law-polling.html', find: '<p class="text-xs text-[var(--text-muted)]">Entries<', replace: '<p class="text-xs text-[var(--text-muted)]">Entriez<' }] },
  { family: 'register: status badges (REGRESSION)', expect: 'status badges = entries',
    label: 'an entry loses its status badge while a stray badge restores the page-wide count',
    edits: [
      { file: 'law-polling.html', regex: true, find: 'class="status-badge (status-[a-z]+)"', replace: 'class="status-badgeGONE $1"' },
      { file: 'law-polling.html', find: '<h2 class="law-section-header" id="regulatory-petitions">', replace: '<span class="status-badge status-enacted">stray</span><h2 class="law-section-header" id="regulatory-petitions">' }] },
  { family: 'register: pillar count', expect: 'pillar law count',
    label: 'a pillar label is dropped outright',
    edits: [{ file: 'law-polling.html', find: 'class="pillar-label"', replace: 'class="pillar-labelX"' }] },
  { family: 'register: pillar identity (REGRESSION)', expect: 'pillar law identity',
    label: 'a pillar label migrates to a different entry — the count is preserved, the designated set is wrong',
    edits: [
      { file: 'law-polling.html', find: 'class="pillar-label"', replace: 'class="pillar-labelX"' },
      { file: 'law-polling.html', find: '<h2 class="law-section-header" id="regulatory-petitions">', replace: '<span class="pillar-label">stray</span><h2 class="law-section-header" id="regulatory-petitions">' }] },
  { family: 'register: entry anchor ids unique', expect: 'entry anchor ids unique',
    label: 'two register entries collide on one anchor id',
    edits: [{ file: 'law-polling.html', find: 'id="lp-002"', replace: 'id="lp-001"' }] },
  { family: 'register: ToC parity (REGRESSION)', expect: 'ToC links = entries',
    label: 'an entry drops out of the index while a stray toc-link holds the count',
    edits: [
      { file: 'law-polling.html', find: 'class="toc-link"', replace: 'class="toc-linkGONE"' },
      { file: 'law-polling.html', find: '<h2 class="law-section-header" id="regulatory-petitions">', replace: '<a class="toc-link">stray</a><h2 class="law-section-header" id="regulatory-petitions">' }] },
  { family: 'register: vote-outcome semantics', expect: 'vote tables match declared outcomes',
    label: 'a failed entry is rebadged enacted while keeping its failing gates',
    edits: [{ file: 'law-polling.html', find: 'class="status-badge status-failed"', replace: 'class="status-badge status-enacted"' }] },
  { family: 'register: supersession chain', expect: 'rate-history supersession chain',
    label: 'a superseded rate law is rebadged enacted, breaking the single-tail chain',
    edits: [{ file: 'law-polling.html', regex: true, find: '(id="lp-073"[\\s\\S]{0,6000}?)class="status-badge status-superseded"', replace: '$1class="status-badge status-enacted"' }] },
  { family: 'register: LP-074 identity (R15)', expect: "register's LP-074 is RATIFY-TAX-50-II",
    label: 'the register entry stops naming RATIFY-TAX-50-II',
    edits: [{ file: 'law-polling.html', find: 'RATIFY-TAX-50-II', replace: 'RATIFY-TAX-50-Two', all: true }] },
  { family: 'register: LP-076 identity (R15)', expect: 'LP-076 is the Enabling Consolidation Amendment',
    label: 'the LP-076 slot stops being the Enabling Consolidation Amendment',
    edits: [{ file: 'law-polling.html', find: 'The Enabling Consolidation Amendment', replace: 'The Consolidation Enabling Amendment', all: true }] },
  { family: 'register: LP-076 dual-track ballot', expect: 'LP-076 dual-track record',
    label: 'the Presidential disposition row is renamed away from the dual-track record',
    edits: [{ file: 'law-polling.html', find: '<th scope="row">Presidential Disposition</th>', replace: '<th scope="row">Presidential Note</th>' }] },
  { family: 'register: authority chain', expect: 'law-register authority chain',
    label: 'the active substantive rate law loses its enacted badge',
    edits: [{ file: 'law-polling.html', regex: true, find: '(id="lp-074"[\\s\\S]{0,6000}?)class="status-badge status-enacted"', replace: '$1class="status-badge status-superseded"' }] },
  { family: 'register: house style (R16)', expect: 'house style: register entries carry no working-document apparatus',
    label: 'a citation key grows inside a register entry',
    edits: [{ file: 'law-polling.html', find: '</article>', replace: '<p>Citation key</p></article>' }] },
  { family: 'register: stale III.III placement', expect: 'no stale claim that Charter III.III carries a restatement marker',
    label: 'the retired restatement-marker claim returns',
    edits: [{ file: 'law-polling.html', find: '<h2 class="law-section-header" id="regulatory-petitions">', replace: '<p>III.III now carries a restatement marker.</p><h2 class="law-section-header" id="regulatory-petitions">' }] },

  /* ---- 5. Deregistered archive + doctrine pins ---- */
  { family: 'deregistered: verbatim §1 texts', expect: 'preserves both §1 texts verbatim',
    label: 'a deregistered §1 text is silently reworded',
    edits: [{ file: 'deregistered-statutes.html', find: 'above $10,000,000 annually, layer-mapped as before.', replace: 'above $10,000,000 per annum, layer-mapped as before.' }] },
  { family: 'deregistered: designation labels (R15)', expect: 'labels both texts as drafting designations',
    label: 'a drafting-designation label is softened, so a reader can mistake it for the register entry',
    edits: [{ file: 'deregistered-statutes.html', find: 'Drafting designation LP-074 (process record', replace: 'Designation LP-074 (process record' }] },
  { family: 'whitepaper: Trajectory Doctrine (R13)', expect: 'whitepaper carries the Trajectory Doctrine',
    label: 'the doctrine sentence is reworded',
    edits: [{ file: 'whitepaper.html', find: 'top marginal rates track demonstrated institutional need', replace: 'top marginal rates reflect demonstrated institutional need' }] },
  { family: 'whitepaper: LP-070 standing gate', expect: 'whitepaper preserves LP-070 as the standing future gate',
    label: 'the standing-gate sentence loses its pinned wording',
    edits: [{ file: 'whitepaper.html', find: 'LP-070 remains the enacted standing future gate', replace: 'LP-070 is the enacted standing future gate' }] },
  { family: 'whitepaper: dataset-derived figures', expect: 'whitepaper reports the dataset-derived LP-070 figures',
    label: 'the dividend-coverage figures stop matching the controlling dataset',
    edits: [{ file: 'whitepaper.html', find: 'aggregate dividend coverage', replace: 'aggregate dividend cover', all: true }] },

  /* ---- 6. Layer + tier guards ---- */
  { family: 'layer guard: founder (R13)', expect: 'no World-tier page presents the founder',
    label: 'a World-tier page presents a founder ruling as an in-world governance event',
    edits: [{ file: 'index.html', find: '</body>', replace: "<p>The founder's ruling settled the matter.</p></body>" }] },
  { family: 'layer guard: reviewer seats', expect: 'names an out-of-world reviewer seat',
    label: 'a World-tier page names an out-of-world reviewer seat',
    edits: [{ file: 'index.html', find: '</body>', replace: '<p>The Opus pass confirmed it.</p></body>' }] },
  { family: 'tier-claim guard', expect: 'tier-claim guard',
    label: 'a World-tier page places the rate schedule at the constitutional tier',
    edits: [{ file: 'index.html', find: '</body>', replace: '<p>In VMSS, taxation is charter-level and layer-stratified.</p></body>' }] },
  { family: 'refusal leaks', expect: 'World-tier pages contain no superseded refusal outcome',
    label: 'a superseded 2294 refusal outcome is stated on a World-tier page',
    edits: [{ file: 'index.html', find: '</body>', replace: '<p>In 2294 three findings passed, one failed.</p></body>' }] },

  /* ---- 7. Cascade surfaces + charter purity ---- */
  { family: 'cascade: surface coverage', expect: 'current surfaces carry the normalized exact cascade',
    label: 'a current surface loses the exact cascade entirely',
    edits: [{ file: 'layer--1.html', find: '50 / 25 / 12.5 / 6.25', replace: 'the engraved cascade', all: true }] },
  { family: 'cascade: forbidden stale claims', expect: 'current surfaces carry the normalized exact cascade',
    label: 'a surface reasserts the superseded schedule as active',
    edits: [{ file: 'systems.html', find: '</body>', replace: '<p>The active schedule from 2295 is 70% / 35% / 17% / 8%.</p></body>' }] },
  { family: 'cascade: authority assertions', expect: 'current-law surfaces positively identify LP-074 authority',
    label: 'a current-law surface stops naming the current rate authority',
    edits: [{ file: 'rate-history.html', find: 'current rate authority is <a href="law-polling.html#', replace: 'current rate basis is <a href="law-polling.html#' }] },
  { family: 'charter purity: no cascade', expect: 'charter purity: the Charter states no subordinate-tier rate cascade',
    label: 'the rate cascade returns to the constitutional surface',
    edits: [{ file: 'charter.html', find: '</body>', replace: '<p>Top marginal rates are 50 / 25 / 12.5 / 6.25.</p></body>' }] },
  { family: 'charter purity: LP whitelist', expect: 'no unwhitelisted LP reference',
    label: 'an LP instrument is cited on the Charter page',
    edits: [{ file: 'charter.html', find: '</body>', replace: '<p>See LP-070 for the garnishing schedule.</p></body>' }] },
  { family: 'consolidation purity (LP-076)', expect: 'consolidation purity',
    label: 'a relocated magnitude returns to Charter tier',
    edits: [{ file: 'charter.html', find: '</body>', replace: '<p>The overtime rate of $125 per hour applies.</p></body>' }] },
  { family: 'consolidation fidelity (LP-076)', expect: 'consolidation fidelity',
    label: 'a relocated magnitude is dropped from the Code entry that received it',
    edits: [{ file: 'laws.html', find: '90-day rolling average of total district savings', replace: 'rolling average of total district savings' }] },
  { family: 'charter: negative magnitudes', expect: 'negative magnitudes stand',
    label: 'a floor-of-none stance is deleted from the Charter',
    edits: [{ file: 'charter.html', find: 'There is no minimum wage in VMSS', replace: 'A statutory wage floor applies in VMSS' }] },
  { family: 'charter: TOC census', expect: 'charter TOC census',
    label: 'a Charter heading anchor is renamed, orphaning its index row',
    edits: [{ file: 'charter.html', find: '<h2 id="preamble"', replace: '<h2 id="preamblez"' }] },

  /* ---- 8. Code integrity ---- */
  { family: 'code (c): tier vocabulary', expect: 'code integrity (c)',
    label: 'the Code declares a tier outside the vocabulary',
    edits: [{ file: 'laws.html', find: 'data-tier="federal"', replace: 'data-tier="imperial"' }] },
  { family: 'code (iv): instrument vocabulary', expect: 'code integrity (iv)',
    label: 'a forged data-instrument value would route an entry out of the register guards',
    edits: [{ file: 'laws.html', find: 'data-instrument="founding"', replace: 'data-instrument="charterlike"' }] },
  { family: 'code (a1): source resolution', expect: 'code integrity (a1)',
    label: "a Code entry's data-source resolves to no register entry",
    edits: [{ file: 'laws.html', find: 'data-source="lp-042"', replace: 'data-source="lp-not-a-real-entry"' }] },
  { family: 'code (a2): publishable status', expect: 'code integrity (a2)',
    label: 'the Code publishes an entry derived from a superseded filing',
    edits: [{ file: 'laws.html', find: 'data-source="lp-064"', replace: 'data-source="lp-073"' }] },
  { family: 'code (a3): no double consolidation', expect: 'code integrity (a3)',
    label: 'one register entry is consolidated twice',
    edits: [{ file: 'laws.html', find: 'data-source="lp-064"', replace: 'data-source="lp-069"' }] },
  { family: 'code (a4): 1:1 enacted coverage', expect: 'code integrity (a4)',
    label: 'an enacted register entry loses its Code entry',
    edits: [{ file: 'laws.html', find: 'data-source="lp-064"', replace: 'data-source="lp-064-x"' }] },
  { family: 'code (a5): advisory flag', expect: 'code integrity (a5)',
    label: 'the pinned advisory hedge loses its comma',
    edits: [{ file: 'laws.html', find: 'advisory, not institutionally enforced', replace: 'advisory not institutionally enforced' }] },
  { family: 'code (a6): mixed per-layer outcomes', expect: 'code integrity (a6)',
    label: 'mixed petitions are flattened to a summary',
    edits: [{ file: 'laws.html', find: '<div class="law-vote">', replace: '<div class="law-voteX">', all: true }] },
  { family: 'code (b): own register anchor', expect: 'code integrity (b)',
    label: "an entry's own in-body Source link points at another entry's anchor",
    edits: [{ file: 'laws.html', regex: true, find: '(id="code-lp-076"[\\s\\S]*?)href="law-polling\\.html#lp-076"', replace: '$1href="law-polling.html#lp-074"' }] },
  { family: 'code (d1): Tier 1 index census', expect: 'code integrity (d1)',
    label: 'a Tier 1 index row is dropped',
    edits: [{ file: 'laws.html', find: '<a class="code-index-title" href="charter.html#article-i">', replace: '<a class="code-index-titleX" href="charter.html#article-i">' }] },
  { family: 'code (d2): Tier 1 title equality', expect: 'code integrity (d2)',
    label: 'a Charter heading title drifts from its Tier 1 row',
    edits: [{ file: 'charter.html', find: '>Article I – Vertical Moral', replace: '>Article I – The Vertical Moral' }] },
  { family: 'code (e): sitemap coverage', expect: 'code integrity (e)',
    label: 'the Code drops out of the sitemap',
    edits: [{ file: 'sitemap.xml', find: 'laws.html', replace: 'lawsz.html' }] },
  { family: 'code: house style (R16)', expect: 'the Code marks its one sanctioned apparatus block',
    label: 'the sanctioned R22 preamble marker is removed, unanchoring the exemption',
    edits: [{ file: 'laws.html', find: 'data-r22="taxation-preamble"', replace: 'data-r22x="taxation-preamble"' }] },
  { family: 'code: conflicts clause', expect: 'VMSS Laws declares the conflicts clause',
    label: 'the Code stops declaring which text controls',
    edits: [{ file: 'laws.html', find: 'If this consolidation and the enacted instrument diverge', replace: 'Where this consolidation and the enacted instrument diverge' }] },
  { family: 'code: ToC parity', expect: 'Code ToC indexes every entry',
    label: 'a provision drops out of the generated Code index',
    edits: [{ file: 'laws.html', find: 'class="toc-link"', replace: 'class="toc-linkX"' }] },
  { family: 'process record: R22 pin', expect: 'R22 is registered',
    label: 'the ruling the Code architecture rests on is removed from the process record',
    edits: [{ file: 'pending-ratification.html', find: 'R22', replace: 'R2X', all: true }] },
  { family: 'process record: R23 pin', expect: 'R23 is registered',
    label: 'the ruling the founding corpus rests on is removed from the process record',
    edits: [{ file: 'pending-ratification.html', find: 'R23', replace: 'R2Y', all: true }] },

  /* ---- 9. Path 2 certification apparatus ---- */
  { family: 'canon manifest: cascade', expect: 'canon manifest: exact cascade active from 2295',
    label: 'the manifest states a different active cascade',
    edits: [{ file: 'tools/canon.json', find: '50 / 25 / 12.5 / 6.25', replace: '70 / 35 / 17 / 8' }] },
  { family: 'canon manifest: evidence vintage', expect: 'canon manifest: DATA-BACK completed-evidence vintage',
    label: 'the manifest states a different audit-design lock date',
    edits: [{ file: 'tools/canon.json', find: '"lockDate": "2292-02-15"', replace: '"lockDate": "2292-02-16"' }] },
  { family: 'canon manifest: publication record', expect: 'canon manifest: complete',
    label: 'the manifest states a different §4 union membership',
    edits: [{ file: 'tools/canon.json', find: '"section4UnionMembers": 16', replace: '"section4UnionMembers": 15' }] },
  { family: 'structured certification result', expect: 'structured certification result',
    label: 'the controlling dataset states a different effective date',
    edits: [{ file: 'documents/path-2-certification-2294-data.json', find: '"effectiveAt": "2295-01-01"', replace: '"effectiveAt": "2295-01-02"' }] },
  { family: 'Path 2 publication record', expect: 'complete Path 2 publication record',
    label: 'a controlling record annex loses a required key',
    edits: [{ file: 'documents/path-2-charter-restatement-2292-data.json', find: '"obligations"', replace: '"obligationsX"' }] },
  { family: 'generated certification page', expect: 'generated certification page agrees',
    label: 'the generated certification page diverges from the controlling dataset',
    edits: [{ file: 'path-2-certification-2294.html', find: '<body', replace: '<body data-tampered="1"' }] },
  { family: 'generated record annexes', expect: 'five machine-readable Path 2 annexes agree',
    label: 'a generated annex diverges from its controlling source',
    edits: [{ file: 'documents/path-2-registrar-execution-2294-data.json', find: '"schemaVersion": "1.0"', replace: '"schemaVersion": "1.1"' }] },
  { family: 'nested cert suite', expect: 'hostile certification mutation suite',
    label: 'the nested hostile suite stops reporting a result the guard recognises',
    edits: [{ file: 'tools/test-path2-certification-mutations.mjs', regex: true, find: '^[\\s\\S]*$', replace: "console.log('all good');\n" }] },
  { family: 'statute page (R16)', expect: 'full conditional statute published',
    label: 'the published statute falls below its retained citation apparatus',
    edits: [{ file: 'pending-ratify-tax-50-ii-statute.html', find: 'class="ls-cite"', replace: 'class="ls-citeX"', all: true }] },
  { family: 'statute wrapper', expect: 'full LP-074 statute wrapper',
    label: 'the superseded condition-not-satisfied status returns to the statute wrapper',
    edits: [{ file: 'pending-ratify-tax-50-ii-statute.html', find: '<body', replace: '<body data-x="ENACTED, CONDITION NOT SATISFIED"' }] },
  { family: 'Path 2 charter pages (R17–R20)', expect: 'Path 2 Charter pages published',
    label: 'the Residual-Risk Register stops engraving through RR-12',
    edits: [{ file: 'path-2-risk-register.html', find: 'RR-12', replace: 'RR-XII', all: true }] },
  { family: 'Path 2 cross-links', expect: 'Path 2 Charter cross-links resolve',
    label: 'the §10.4 anchor the Schedule cites is renamed',
    edits: [{ file: 'path-2-charter.html', find: 'id="s-10-4"', replace: 'id="s-10-4x"' }] },

  /* ---- 10. Site-wide structural guards ---- */
  { family: 'LP deep links', expect: 'whitepaper.html LP deep links resolve',
    label: 'a whitepaper LP citation points at a nonexistent register entry',
    edits: [{ file: 'whitepaper.html', regex: true, find: 'law-polling\\.html#lp-0', replace: 'law-polling.html#lp-9', all: true }] },
  { family: 'version stamps', expect: 'README/footer version stamps match',
    label: 'the README and footer version stamps fall out of lockstep',
    edits: [{ file: 'README.md', find: '**Version:**', replace: '**Version:** 99.9.9 <!--' }] },
  { family: 'stale-fact: five currencies', expect: 'no stale "five currencies"',
    label: 'the retired five-currency claim returns',
    edits: [{ file: 'index.html', find: '</body>', replace: '<p>VMSS runs five currencies.</p></body>' }] },
  { family: 'duplicate DOM ids', expect: 'no duplicate ids',
    label: 'a page grows a duplicate element id',
    edits: [{ file: 'faq.html', find: '</body>', replace: '<div id="main-content"></div></body>' }] },
  { family: 'link integrity (R15)', expect: 'link integrity',
    label: 'a World-tier page cites a fragment that does not exist in the target',
    edits: [{ file: 'index.html', find: '</body>', replace: '<a href="charter.html#no-such-anchor-here">x</a></body>' }] },
  { family: 'in-page anchors', expect: 'charter.html: in-page anchors resolve',
    label: 'an in-page citation points at no local id',
    edits: [{ file: 'charter.html', find: '</body>', replace: '<a href="#not-a-real-local-id">x</a></body>' }] },

  /* ---- 11. Filter pages ---- */
  { family: 'filter pages: count line', expect: 'faq.html: count line',
    label: 'the server-rendered count line drifts from the derived card count',
    edits: [{ file: 'faq.html', find: 'Showing all 79 questions', replace: 'Showing all 78 questions' }] },
  { family: 'filter pages: chip coverage', expect: 'every data-cat has a chip',
    label: 'cards gain a category with no filter chip to reach it',
    edits: [{ file: 'faq.html', regex: true, find: 'data-cat="([^"]+)"', replace: 'data-cat="$1 uncovered-cat"', all: true }] },
  { family: 'why-vmss accordions', expect: 'why-vmss accordions',
    label: 'an accordion aria-controls resolves to no in-block id',
    edits: [{ file: 'why-vmss.html', find: 'aria-controls="', replace: 'aria-controls="zz' }] },
  { family: 'technologies accordions (REGRESSION)', expect: 'technologies accordions',
    label: 'an accordion aria-controls resolves to no in-block id — invisible until the class-position repair',
    edits: [{ file: 'technologies.html', find: 'aria-controls="tech-content-1"', replace: 'aria-controls="tech-content-orphan"' }] },

  /* ---- 12. Census floor ---- */
  { family: 'census floor: archive (REGRESSION)', expect: 'census floor',
    label: 'the simulation-card class is renamed wholesale, zeroing the archive census',
    edits: [{ file: 'simulations.html', find: 'simulation-card', replace: 'sim-entry-card', all: true }] },
  { family: 'census floor: why-vmss (REGRESSION)', expect: 'census floor',
    label: 'the why-card class is renamed wholesale, zeroing that census',
    edits: [{ file: 'why-vmss.html', find: 'why-card', replace: 'reason-card', all: true }] },
  { family: 'census floor: technologies (REGRESSION)', expect: 'census floor',
    label: 'the tech-card class is renamed wholesale, zeroing that census',
    edits: [{ file: 'technologies.html', find: 'tech-card', replace: 'technology-card', all: true }] },
];

/* ---- Harness ---- */
const TMP = mkdtempSync(join(tmpdir(), 'vmss-guard-'));
cpSync(ROOT, TMP, {
  recursive: true,
  filter: (src) => !/node_modules|[\\/]\.git[\\/]|[\\/]\.git$|[\\/]\.claude/.test(src),
});

/* Stub the nested certification mutation suite — see DESIGN above. The stub
   prints the exact line check-canon's guard greps for. `npm run test:certification`
   runs the real one; the `nested cert suite` probe proves this guard still bites. */
const CERT_SUITE = join(TMP, 'tools/test-path2-certification-mutations.mjs');
writeFileSync(CERT_SUITE,
  "console.log('  PASS positive control certifies and generates complete evidence');\n"
  + "console.log('Path 2 hostile mutation suite — 2272 hostile mutations rejected, 0 accepted; positive control passed');\n");

const pristine = new Map();
const restoreAll = () => { for (const [f, src] of pristine) writeFileSync(join(TMP, f), src); };

const runCanon = () => {
  try {
    const out = execFileSync(process.execPath, [join(TMP, 'tools/check-canon.mjs')],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], cwd: TMP });
    return { code: 0, out };
  } catch (e) {
    return { code: e.status ?? 'CRASH', out: `${e.stdout || ''}${e.stderr || ''}` };
  }
};
const failLines = (out) => out.split('\n').filter((l) => l.trim().startsWith('FAIL')).map((l) => l.trim());

/* The scratch baseline must be green — with the stub in place — or nothing a
   probe reports afterwards means anything. */
const base = runCanon();
if (base.code !== 0) {
  console.error('Scratch baseline is not green; the mutation suite cannot report on guards it cannot trust.');
  console.error(base.out.trim().split('\n').slice(-12).join('\n'));
  rmSync(TMP, { recursive: true, force: true });
  process.exit(1);
}

const results = [];
for (const probe of PROBES) {
  let specError = null;
  for (const e of probe.edits) {
    const abs = join(TMP, e.file);
    if (!existsSync(abs)) { specError = `no such file ${e.file}`; break; }
    if (!pristine.has(e.file)) pristine.set(e.file, readFileSync(abs, 'utf8'));
    const cur = readFileSync(abs, 'utf8');
    let next;
    if (e.regex) {
      next = cur.replace(new RegExp(e.find, e.all ? 'g' : ''), e.replace);
    } else {
      if (!cur.includes(e.find)) { specError = `find string absent in ${e.file}: ${JSON.stringify(e.find.slice(0, 90))}`; break; }
      next = e.all ? cur.split(e.find).join(e.replace) : cur.replace(e.find, e.replace);
    }
    if (next === cur) { specError = `edit was a no-op in ${e.file}`; break; }
    writeFileSync(abs, next);
  }

  if (specError) {
    results.push({ ...probe, ok: false, detail: `PROBE SPEC BROKEN — ${specError}` });
    restoreAll();
    continue;
  }

  const r = runCanon();
  const fails = failLines(r.out);
  const hit = fails.filter((l) => l.includes(probe.expect));
  const collateral = fails.length - hit.length;
  const ok = r.code === 1 && hit.length > 0;
  results.push({
    ...probe,
    ok,
    detail: ok
      ? `bit: ${probe.expect}${collateral ? ` (+${collateral} collateral)` : ''}`
      : (r.code === 0
        ? 'FALSE-GREEN — the guarded property was corrupted and the checker stayed green'
        : r.code === 'CRASH'
          ? 'checker crashed instead of reporting'
          : `red, but not for this guard (${fails.length} other failure(s))`),
  });
  restoreAll();
}

rmSync(TMP, { recursive: true, force: true });

const failed = results.filter((r) => !r.ok);
for (const r of results) console.log(`  ${r.ok ? 'PASS' : 'FAIL'}  ${r.family} — ${r.detail}`);
console.log(`\ncanon-guard mutation suite — ${results.length - failed.length}/${results.length} guard families bit`);
if (failed.length) {
  console.error('\nA guard did not behave as specified:');
  for (const r of failed) console.error(`  ${r.family}: ${r.label}\n    ${r.detail}`);
  console.error('\nA guard that stays green under corruption is worse than no guard — the project has been trusting it.');
  process.exit(1);
}
console.log('Every guard family went red for its own reason under corruption.');
