# VMSS Laws — Architect Review Dispositions (Fix Pack A)

Architect review of commits `90839fb`…`e63551d` against the ratified architecture, 2026-07-20.
Verdict: **implementation accepted** — gates independently re-verified (120/0; css clean; both TOC modes idempotent), the P4 conformance report is accurate where spot-checked, and judgments J1–J16 are **ratified as exercised** (J1: §3.3 wins as resolved; the LP-005.2 badge anomaly goes to the register docket, not this branch. J9: correct call — guard and defect must land atomically).

This file is the complete, self-contained fix list. Every fix carries its exact text or exact rule — the implementer exercises **no doctrinal judgment**. Anything not listed under Fix Pack A is deferred (see Docket).

---

## Fix Pack A — apply in this branch, one commit

### A1 (= F1, blocker) — Register R22 on the Ratification Record

Place on `pending-ratification.html`, in the page's existing process-note idiom (Process tier — World-tier guards do not apply), as a compact ruling block near the page's top-level explainer. Text, verbatim:

> **Process ruling R22 — The Restatement & Consolidation Doctrine** (registered 2026-07-20, process record; ratified with the v22.7.0 restructure).
> (a) Numeric restatements of subordinate-tier law appearing on the Charter page were always publication apparatus, never enacted constitutional text; relocating them amends nothing.
> (b) VMSS Laws (laws.html) is established as publication apparatus of the ledger's enforcement state, classified secondary authority under LP-042.
> (c) The former designation of Whitepaper §12.1 as "the binding schedule" is reclassified as apparatus superseded by consolidation; §12.1 retains specification weight under LP-042.
> The in-world anchor for (a) predates this ruling: LP-070's dual-key tier ruling (2211) already held that Charter III.III's rate figures were "restatement … not Charter-tier engraving."

Add one durability pin to check-canon: `pending-ratification.html` must contain `R22` and `Restatement &amp; Consolidation Doctrine` (mind the entity form actually used on the page — pin what you write).

This clears D4's condition: the title "The Consolidated Code" is now licensed. No retitle.

### A2 (= F2, major) — Cure the LP-070 entry's stale placement description

Architecture erratum (recorded by the architect in `vmss-laws-architecture.md` Errata): §6's law-polling row is amended from "No entry changes" to "No changes to any entry's ruling, votes, or meta; narrative placement descriptions may be cured to track the consolidation." The ruling text survives; only its description of where the figures sit is past-tensed. Two edits in the LP-070 entry, exact:

1. `…and their appearance in Charter III.III is restatement of the binding schedule at Whitepaper §12.1 (Tiered Progressive Taxation), not Charter-tier engraving.`
   → `…and the rate figures' then-current appearance in Charter III.III was restatement of the schedule then designated binding at Whitepaper §12.1 (Tiered Progressive Taxation), not Charter-tier engraving.`
2. `The same ruling seats a restatement convention in the Charter &mdash; III.III now carries a marker pointing to its binding source, the first instance of a full Charter restatement audit queued separately on the open docket.`
   → `The same ruling seated the restatement convention under which reader-facing restatements are publication apparatus, not engraving &mdash; the convention under which the schedule's public restatement now sits in the consolidated code (VMSS Laws) beside its instrument, while the Charter states the principle and reaches no rate. The full Charter restatement audit remains queued on the open docket.`

Run `node tools/build-law-toc.mjs` afterward (the edit is inside parsed territory of the register; confirm the TOC is byte-stable). Add one stale-fact pin: `law-polling.html` must NOT contain `III.III now carries`.

### A3 (= F3) — Whitepaper hierarchy sections link the Code

- §10.6 (whitepaper.html:799): append — `The consolidated statement of law in force at every tier is <a href="laws.html">VMSS Laws</a>.`
- §10.6.1 (:803): append — `What the Charter does contain is indexed, and everything below it consolidated, at <a href="laws.html">VMSS Laws</a>.`
(Match each location's existing link markup/class conventions.)

### A4 (= F4) — Repair the XXVIII.II quotation on laws.html

At laws.html:300: restore the elided sentence **"No district regulation may contradict a layer-wide regulation."** inside the quotation at its correct position, and change the lead-in `states the ordering without qualification:` → `states the ordering directly:`.

### A5 (= F5) — De-vacuate Code-integrity guard (b)

Apply the P4-verified fix: scope the source-link assertion to each entry's body (reuse the generator's body-capturing regex); assert `body.includes('href="law-polling.html#' + source + '"')`. Update the guard's comment to match the code.

### A6 (= F6) — Advisory hedge on the four all-layer Tier 3 entries

Add the verbatim hedge **"advisory, not institutionally enforced"** (comma-exact) to the -3 scope statements of LP-013, LP-026, LP-036, LP-042 entries in laws.html, matching the phrasing pattern already used on the six mixed-petition -3 rows.

### A7 (= F7) — Restore the -3 agency clause on LP-061

laws.html:1519: restore **"and the voluntary districts vote to keep it"** per law-polling.html:2989.

### A8 (= F8) — LP-031 states its force

laws.html LP-031 entry: add **"Operative as an implementing specification under LP-045.2's extensibility clause."** as the entry's force statement (register phrasing).

### A9 (= F9) — Naming-table fix

laws.html:630: `that Charter's §13.1` → `the Path 2 Charter's §13.1`.

### A10 (= F13) — Machine-assert what F6 proved assertable

Extend guard §7.3a: (i) every Code entry derived from a `status-advisory` register entry, and every -3 row derived from a mixed petition's advisory outcome, must contain the literal `advisory, not institutionally enforced`; (ii) every entry derived from a `status-mixed` register entry must contain a per-layer outcome structure (assert on the markup you actually used for those rows — pin the real pattern, not an aspiration).

### A11 (= F14) — Extend the R16 apparatus guard to the Code

Extend guard (e2) to iterate `laws.html`'s `code-entry` blocks with the same bans (ls-cite anchors, law-statute blocks, "Citation key" headings, statute typography), exempting the sanctioned Taxation-title preamble block by a stable structural marker (give the preamble a `data-r22="taxation-preamble"` attribute and exempt on that).

### A12 (= F18) — README indexes its new page

Add `laws.html` rows to the README Pages table and Structure tree, phrased consistently with the charter/law-polling rows.

### Verification for Fix Pack A (definition of done)

1. `node tools/check-canon.mjs` — 0 failures; report the new pass count (expect >120 with the added pins).
2. Mutation-test the three strengthened guards, specifically on the cases that previously escaped: (i) delete **LP-074's own** entry Source link (the doubled-anchor case) → guard must fail; (ii) delete the advisory hedge from one A6 entry → must fail; (iii) insert an `ls-cite` anchor into a `code-entry` body → must fail; (iv) confirm the Taxation preamble exemption does NOT exempt other entries.
3. `npm run build:css` clean; both TOC modes idempotent.
4. Append a Fix Pack A section to `docs-review/vmss-laws-worklog.md` (files, deltas, pass count, mutation results).
5. One commit; push the feature branch. No PR, no merge, no main.

---

## Post-Fix-Pack-A record (architect, 2026-07-20, after delta review of 9a5e403)

- **J17 ratified.** A10(i)'s literal scope (status-derived) excluded the four F6 entries the guard existed to protect; the implementer widened to a mechanically register-derived rule (entry owes the hedge if the register books it advisory **or** its own outcome table carries a `td.advisory` row → exactly 12 entries) because the disposition's own mutation (ii) demanded that behavior. Correct resolution; the A10 spec, not the implementation, was wrong.
- **P4 erratum (F6 row).** The conformance report claimed the hedge was "present and comma-exact" on both advisory district entries. False: LP-009 and LP-030 carried it sentence-initial capitalized, so the canonical lowercase literal was absent — the P4 auditor read case-insensitively. Discovered by the new A10 guard on first run; cured by moving the hedge mid-sentence, wording untouched. The conformance report stands as shipped (report-only); this note is its erratum.
- Delta review verified independently: 126/0; both TOC modes idempotent; R22 registered ×3 on the Ratification Record; LP-070 cure exact with zero stale-pattern survivors; 12 hedge occurrences; six mutation probes as reported.

## Docket — deferred deliberately (do NOT fix in this branch)

| Item | Why deferred | Owner |
|---|---|---|
| F10 bare-index isolation limit | Accepted trade of the ratified no-gists design | Closed (recorded) |
| F11 tier-claim predication widening | Raw proximity fails on true canon per P4's own test; needs a corpus-safe predication set designed against the live corpus | Architect, Phase 2.1 |
| F12 section-scoped cascade sweep | Pre-existing behavior; pairs with F16/F17 | Architect, Phase 2.1 |
| F15 tier-claim roster parity (documents/) | Pre-existing roster shape | Architect, Phase 2.1 |
| F16 layer--3.html:152 / F17 simulations.html ×6 | Edits inside archived/era-pinned narrative canon (Alternative Story, Doctrine-Snapshot cards) — canon judgment, not a fix pack | **Jason** |
| F19 Charter XXVIII.III Code link | An edit inside Charter article text — canon judgment | **Jason** |
| F20 law-polling:2406 naming nit | Pre-existing text | Register docket |
| LP-005.2 badge anomaly (only "Enacted" entry that is textually superseded; LP-071–073 use `status-superseded`) | Register vocabulary decision | **Jason** (register docket) |
| Lite charter.html:51 cascade + Path 2 narration | Separate repo; same Restatement Doctrine trim, own PR | **Jason** + architect |
