#!/usr/bin/env node
/**
 * test-code-founding-guards.mjs — mutation suite for the founding-corpus
 * parser fixes and guards (latent-corpus sweep, Fix Pack B6).
 *
 * The two Code parsers (check-canon.mjs code-integrity block, build-law-toc.mjs
 * sibling mode) both matched `data-tier="…" data-source="…"` adjacent; the
 * founding markup places data-instrument between them. This suite proves, on a
 * throwaway copy of the repo, that:
 *   1. a founding entry with data-instrument between data-tier and data-source is
 *      SEEN by both parsers (generator indexes it; checker keeps its ToC in sync
 *      and exits clean) — the parser fix works. Injected net-neutrally (swap, not
 *      add) so it also leaves count-parity guard (v) satisfied;
 *   2. a forged data-instrument value fails guard (iv);
 *   3. a founding entry citing a nonexistent Whitepaper § fails guard (i-wp);
 *   4. an unresolved data-source fails guard (i);
 *   5. a non-canon (charter) data-source fails guard (ii);
 *   6. a name colliding with a register/Code title fails guard (iii);
 *   7. DELETING a founding entry — so the count falls below PART 1 minus the held
 *      list — fails count-parity guard (v), in isolation (probe v).
 * A red build is evidence only if it is red for the reason under test, so each
 * negative asserts the SPECIFIC guard label appears in the failure list.
 *
 * Run: node tools/test-code-founding-guards.mjs   (exit 0 = all probes bit)
 */
import { cpSync, mkdtempSync, readFileSync, writeFileSync, rmSync } from 'fs';
import { execFileSync } from 'child_process';
import { tmpdir } from 'os';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TMP = mkdtempSync(join(tmpdir(), 'vmss-founding-'));
cpSync(ROOT, TMP, {
  recursive: true,
  filter: (src) => !src.includes(`${'/'}node_modules`) && !src.includes(`${'/'}.git`),
});
const LAWS = join(TMP, 'laws.html');
const pristineLaws = readFileSync(LAWS, 'utf8');

const results = [];
const record = (name, ok, detail) => { results.push({ name, ok, detail }); };

/* Build a founding entry from overrides. Defaults are a valid entry: bare
   whitepaper.html data-source (resolves), a real §8 pin, a unique name. */
const foundingEntry = (o = {}) => {
  const id = o.id || 'code-fc-mutation-probe';
  const instrument = o.instrument ?? 'founding';
  const source = o.source ?? 'whitepaper.html';
  const section = o.section ?? '8';
  const name = o.name ?? 'The Mutation Probe Standard';
  const instrAttr = instrument === null ? '' : ` data-instrument="${instrument}"`;
  return `<article class="code-entry" id="${id}" data-tier="federal"${instrAttr} data-source="${source}">
  <div class="law-header">
    <div>
      <div class="law-number"><span class="fc-badge">Founding corpus</span></div>
      <h3 class="law-title">${name}</h3>
    </div>
    <span class="status-badge tier-federal">Founding corpus &middot; Whitepaper &sect;${section}</span>
  </div>
  <p class="law-summary">A mutation-test fixture standing in for a founding-corpus instrument; its provisions derive from Whitepaper &sect;${section} and it carries no ladder record.</p>
  <div class="law-meta-grid">
    <div class="meta-item"><span class="label">Source</span><span class="value"><a href="whitepaper.html">Whitepaper &sect;${section} &middot; the specification corpus</a></span></div>
    <div class="meta-item"><span class="label">Enacted</span><span class="value">Founding corpus</span></div>
  </div>
</article>`;
};

const inject = (entry) => pristineLaws.replace(
  '<h3 class="code-subject" id="subject-economy">Economy, SCM &amp; Anti-Concentration</h3>',
  `<h3 class="code-subject" id="subject-economy">Economy, SCM &amp; Anti-Concentration</h3>\n\n${entry}`,
);

/* The count-parity guard (v) reads the founding-entry count, so probes that must
   leave it satisfied edit net-neutrally: swapFirstFounding replaces the first
   real founding entry (id="code-fc-…") with `entry`, holding the count at 60 =
   PART 1 (61) − held (1). deleteFirstFounding removes one, dropping it to 59 —
   the mutation probe (v) exists to prove (v) rejects. */
const FIRST_FOUNDING = /<article class="code-entry" id="code-fc-[\s\S]*?<\/article>\n?/;
const swapFirstFounding = (entry) => pristineLaws.replace(FIRST_FOUNDING, `${entry}\n`);
const deleteFirstFounding = () => pristineLaws.replace(FIRST_FOUNDING, '');

const run = (script, args = []) => {
  try {
    const stdout = execFileSync(process.execPath, [join(TMP, script), ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    return { code: 0, out: stdout };
  } catch (e) {
    return { code: e.status ?? 1, out: `${e.stdout || ''}${e.stderr || ''}` };
  }
};
const failLines = (out) => out.split('\n').filter((l) => l.includes('FAIL'));

/* ---- 1. POSITIVE CONTROL: seen by both parsers, accepted by every guard ----
   Swap (not add) a valid founding entry in for the first one: the fixture is
   still SEEN by both parsers and accepted by (i)-(iv), and the net-neutral edit
   keeps count-parity guard (v) satisfied (60 = 61 − 1), so a clean build is a
   clean build for the right reason rather than a count that happens to match. */
{
  writeFileSync(LAWS, swapFirstFounding(foundingEntry()));
  const gen = run('tools/build-law-toc.mjs', ['--laws']);
  const seenByGenerator = gen.code === 0 && /laws-toc: \d+ provisions/.test(gen.out);
  const chk = run('tools/check-canon.mjs');
  const seenByChecker = chk.code === 0; // ToC-sync + extraction + count-parity pass ⇒ both parsers agree the entry exists
  record('positive: generator indexes the founding entry (data-instrument between tier and source)', seenByGenerator, gen.out.trim().split('\n').pop());
  record('positive: check-canon accepts a valid founding entry and keeps its ToC in sync', seenByChecker, chk.out.trim().split('\n').filter(Boolean).pop());
}

/* ---- Negatives: inject a broken entry, assert the SPECIFIC guard bites ---- */
const negative = (label, entry, needle, mustNotContain) => {
  writeFileSync(LAWS, inject(entry));
  const chk = run('tools/check-canon.mjs');
  const fails = failLines(chk.out);
  const bit = chk.code === 1 && fails.some((l) => l.includes(needle));
  const clean = !mustNotContain || !fails.some((l) => l.includes(mustNotContain));
  record(label, bit && clean, bit ? (clean ? `bit: ${needle}` : `also tripped ${mustNotContain}`) : `guard did not fire (${needle})`);
};

negative('(iv) forged data-instrument value fails the vocabulary guard',
  foundingEntry({ instrument: 'fnding' }), 'code integrity (iv)');
negative('(i-wp) nonexistent Whitepaper § fails the section-existence guard',
  foundingEntry({ section: '99' }), 'code integrity (i-wp)');
negative('(i) unresolved data-source fragment fails the resolution guard',
  foundingEntry({ source: 'whitepaper.html#no-such-anchor' }), 'code integrity (i):', 'code integrity (i-wp)');
negative('(ii) charter data-source fails the canon-source guard (home rule)',
  foundingEntry({ source: 'charter.html#article-iii' }), 'code integrity (ii)');
negative('(iii) name colliding with a register title fails the collision guard',
  foundingEntry({ name: 'Lower-Layer Economic Disclosure Law' }), 'code integrity (iii)');

/* ---- (v) COUNT PARITY: the one probe that removes rather than injects.
   Deleting a real founding entry drops the count below PART 1 (61) − held (1);
   the ToC is regenerated first so ToC-sync cannot bite, leaving the count-parity
   guard as the only thing that can fail — proving (v) fires red for its own
   reason, not on collateral. ---- */
{
  writeFileSync(LAWS, deleteFirstFounding());
  run('tools/build-law-toc.mjs', ['--laws']); // resync the ToC so ONLY (v) can bite
  const chk = run('tools/check-canon.mjs');
  const fails = failLines(chk.out);
  const bit = chk.code === 1 && fails.some((l) => l.includes('code integrity (v)'));
  const collateral = fails.filter((l) => l.includes('code integrity') && !l.includes('code integrity (v)'));
  record('(v) a missing founding entry fails the count-parity guard (PART 1 − held)',
    bit && collateral.length === 0,
    bit ? (collateral.length ? `also tripped ${collateral.length} other code guard(s)` : 'bit: code integrity (v), in isolation')
      : 'guard did not fire (code integrity (v))');
}

/* ---- Report ---- */
rmSync(TMP, { recursive: true, force: true });
const failed = results.filter((r) => !r.ok);
for (const r of results) console.log(`  ${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.detail ? ` — ${r.detail}` : ''}`);
console.log(`\nfounding-guard mutation suite — ${results.length - failed.length}/${results.length} probes bit`);
if (failed.length) { console.error('\nA guard did not behave as specified.'); process.exit(1); }
console.log('All founding-guard mutation probes bit exactly as specified.');
