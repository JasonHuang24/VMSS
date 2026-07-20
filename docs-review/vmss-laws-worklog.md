# VMSS Laws — Implementation Worklog

Solo execution of `docs-review/vmss-laws-opus-prompts.md` (Prompts 1–4) against the ratified
`docs-review/vmss-laws-architecture.md` (D1–D5 as recommended), on branch `feat/vmss-laws-v22.7.0`.

This file is a review artifact. Each prompt appends its own section: files changed with deltas,
check-canon pass counts, mapping tables, and every judgment exercised beyond the architecture.
Failures are recorded as failures.

Baseline at branch head `8033370`: `node tools/check-canon.mjs` → **103 passed, 0 failed**.

---

## Prompt 1 — Build laws.html (the Consolidated Code)

### Files changed

| File | Change | Delta |
|---|---|---|
| `laws.html` | **new** | +1645 |
| `assets/css/tailwind.css` | rebuilt, no diff (laws.html introduced no new utility classes) | 0 |

No other file touched, per Prompt 1 step 9.

### Gate

- `node tools/check-canon.mjs` → **103 passed, 0 failed** (unchanged from baseline; Prompt 1 adds no
  checks — the three auto-enrolled sweeps simply widened to cover the new file and pass over it).
- `npm run build:css` → no post-build diff on `assets/css/tailwind.css`.
- Auto-enrolled sweeps verified passing over `laws.html` from its first commit: layer guard
  (founder phrasing + seat-name ban), refusal-leak sweep, link-integrity 8b (cross-file **and**
  in-page halves). Every `law-polling.html#lp-*`, every `charter.html#*`, and every in-page TOC
  link resolves.

### Derived status breakdown (parse reconciled against the register's own stat cards)

The register was parsed programmatically and the parse checked against `law-polling.html`'s stat
cards before any entry was authored, per the stop condition on register parsing.

| Section | Entries | Stat card | Match |
|---|---|---|---|
| Charter Amendments | 7 | 7 | ✔ |
| Federal Laws | 60 | 60 | ✔ |
| Regulatory Petitions | 22 | 22 | ✔ |
| **Total** | **89** | **89** | ✔ |

Status split:

- **Federal (60):** enacted **39**, failed 16, superseded 3, rerouted 2.
- **Regulatory (22):** enacted **10**, mixed 6, advisory 2, rerouted 2, failed 2.
- **Charter (7):** failed 7 (the 7/7 failed-amendment record).

This reconciles to the architecture's expectation of 39 Federal enacted and 10 Regulatory enacted.
Pillar Federal Laws parsed as exactly the 7 canonical entries: LP-005.3, LP-007.2, LP-039, LP-041,
LP-045.2, LP-047.3, LP-048.3.

### Code composition

87 `code-entry` elements: 30 Tier 1 + 39 Tier 2 + 14 Tier 3 + 4 Tier 4.

- **Tier 1 (30):** Preamble + Articles I–XXVIII + Founding Affirmation. Generated mechanically from
  `charter.html`'s `<h2 id="...">` headings so index titles are byte-equal to the Charter's own
  headings (guard 7.3d pre-verified: 0 mismatches; 28 `<h2 id="article-` + 2 = 30).
- **Tier 2 (39):** every `status-enacted` Federal register entry, 1:1.
- **Tier 3 (14):** 8 enacted layer-scoped + 6 `status-mixed` parallel petitions rendered as
  per-layer outcomes (never flattened).
- **Tier 4 (4):** LP-010, LP-020, LP-009, LP-030.

Guards 7.3(a)–(d) were pre-verified against the authored page before commit: every enacted register
entry has exactly one code entry (0 missing), every `data-source` resolves to a real register anchor
(0 unresolved, 0 duplicates), every code entry's register status is whitelisted (0 violations),
`data-tier` vocabulary is exactly {charter, federal, layer, district}, and `laws.html` has 0
duplicate DOM ids.

Check-canon pin strings verified present on `laws.html` ahead of Prompt 2's retarget:
`exactCascade` matches; `LP-074 is the substantive rate law`; `LP-073 … fully superseded as
operative law`; `LP-075 remains procedural only`; the conflicts clause verbatim. The
`forbiddenCurrent`, `supersededOutcome`, seat-name and founder-phrasing patterns all return **no
match**.

### Tier 2 — LP → subject-title mapping

Architecture §3.5 supplies the eight proposed subject titles; §3.5 also says implementation maps
entries and the architect reviews the mapping.

| Subject title | n | Entries |
|---|---|---|
| Taxation & Rate Law | 3 | LP-064, LP-074, LP-075 |
| Economy, SCM & Anti-Concentration | 5 | LP-002, LP-006, LP-043, LP-069, LP-070 |
| Defense, Force & Visitation | 8 | LP-005.2, LP-005.3 ⬥, LP-029, LP-040, LP-044, LP-047.3 ⬥, LP-048.3 ⬥, LP-049 |
| Technology, Implants & Continuity | 10 | LP-004.2, LP-022, LP-028, LP-031, LP-032, LP-037, LP-038.2, LP-045.2 ⬥, LP-056, LP-060 |
| Governance, Process & Disclosure | 5 | LP-007.2 ⬥, LP-039 ⬥, LP-041 ⬥, LP-046.2, LP-051 |
| Justice & Enforcement | 5 | LP-021, LP-035, LP-063, LP-065, LP-067.2 |
| Population & Family | 3 | LP-023, LP-034, LP-068 |
| *Cross-Domain* | 0 | *(not rendered — see judgment J3)* |
| **Total** | **39** | |

### Tier 3 / Tier 4 split

| Tier | Entries |
|---|---|
| 3 — Layer-Wide | LP-013, LP-014, LP-025, LP-026, LP-027, LP-036, LP-042, LP-062.2 (enacted); LP-015, LP-016, LP-017, LP-018, LP-019, LP-061 (mixed, per-layer outcomes) |
| 4 — District | LP-010, LP-020 (enacted, representative-case convention); LP-009, LP-030 (advisory) |

### Adversarial pre-commit audit

A 7-way canon-fidelity fan-out (one auditor per subject group plus one over the non-entry frame
prose), each finding then independently refutation-tested, produced **20 raw findings, 18 refuted,
2 confirmed**. Both confirmed findings were fixed before commit:

1. **LP-046.2 — dropped condition (real defect, fixed).** The Code stated the twelve-month
   deliberation-window extension as an at-will petition right. The register conditions it: *"when
   standing dissent sits within the boundary band and active engagement cycles are demonstrably
   narrowing it."* The condition is restored verbatim. This was a genuine broader-than-canon
   statement of force.
2. **LP-005.2 — superseded statute presented as code (real ambiguity, cured; see judgment J1).**

One refuted finding surfaced a true incidental: `laws.html` carried the only instance of the
spelling "Defence" in the repository, against the register's "defense". Corrected to `Defense`.

### Judgments exercised beyond the architecture — flagged for review

- **J1 — LP-005.2 is kept as an entry, with the supersession as its lead.** The architecture is in
  tension with itself here and the tension is worth the architect's eye. §3.3 makes coverage of
  `status-enacted` entries **mandatory 1:1** (and §7.3a asserts it in both directions, so dropping
  the entry would fail the guard I am about to write). §3.4 says **in-force only**, and §3.1.5 says
  supersession is **pointer metadata**. LP-005.2 is the single register entry whose machine status
  is `status-enacted` while its badge text reads *"Enacted · Superseded by LP-005.3"*. I resolved in
  favour of §3.3 — it is the explicit, guard-backed rule — and cured the ambiguity §3.4 is
  protecting by rewriting the entry so the supersession is its first sentence, adding a
  `Register status` meta field carrying the register's own badge text verbatim, and stating
  explicitly that the entry "is indexed here because the register carries it at enacted status, not
  because it states force." **If the architect prefers §3.4 to win, the correct alternative is to
  narrow guard 7.3a's 1:1 rule to exclude register entries whose badge text declares supersession,
  and delete this entry** — that is an architecture change, not an implementation choice, so I did
  not make it.
- **J2 — Tier 1 index rows are `code-entry` articles carrying `data-tier="charter"`.** §3.2
  prescribes exactly this, but does not restate the class for Tier 1 rows. I kept the class string
  exactly `code-entry` (no second class) and styled the compact index form via the
  `[data-tier="charter"]` attribute selector, so the markup contract stays byte-exact.
- **J3 — the empty "Cross-Domain" subject title is not rendered.** All 39 entries mapped cleanly to
  the other seven titles. Rendering an empty title, or forcing entries into it, both seemed worse
  than omitting it. The title remains available if the architect wants entries moved into it.
- **J4 — LP-064 is filed under Taxation & Rate Law, not Population & Family.** Grounded in
  architecture §5 category A, which names it "reproduction-tax collection mechanics". The entry
  carries its child-dividend-stewardship provisions in full regardless of where it is filed.
- **J5 — LP-029 (Orbital Debris Attribution Tax) is filed under Defense, Force & Visitation.** It is
  nominally a fee schedule, but its Charter anchor is XXV.V and its function is orbital sovereignty
  enforcement through an economic rather than military instrument. Filing it beside the rate law
  would have been actively misleading about tier and subject.
- **J6 — the TOC was produced by a generator, not typed by hand.** Prompt 1 says hand-author the TOC
  and Prompt 2 delivers the generator. I wrote the sibling-mode generator logic first (in scratch),
  emitted the block from it, and pasted the result, so that Prompt 2's regeneration is guaranteed
  byte-identical rather than merely close. The logic is ported verbatim into
  `tools/build-law-toc.mjs` in Prompt 2. Idempotency was verified byte-wise at this prompt: a second
  run over the committed file produces an identical file.
- **J7 — per-layer outcome tables carry the regulatory outcome, not the ratification and
  support-saturation percentages.** The percentages are enactment-record apparatus and belong to the
  register; the outcome text ("Permitted with licensing and reporting") is what is in force. The
  `advisory, not institutionally enforced` formula is carried verbatim, comma included, on every -3
  row.

---

## Prompt 2 — Charter trim + guard flips (single commit)

### Files changed

| File | Change | Delta |
|---|---|---|
| `charter.html` | III.III trim: Path 2 narration deleted, four rate bullets replaced by the ratified sentence, restatement paragraph removed, two rationale paragraphs relocated out | −11 / +2 |
| `whitepaper.html` | receives the two rationale paragraphs **verbatim**, after the Trajectory Doctrine block, with a one-line lead-in | +4 |
| `tools/check-canon.mjs` | 3 retargets + 2 guard families + 3 manual enrollments | +203 / −6 |
| `tools/build-law-toc.mjs` | sibling mode for laws.html | +152 / −2 |
| `sitemap.xml` | adds laws.html (22 → 23 URLs) | +6 |
| `faq.html` | :818 tier misattribution rewritten (see judgment J9) | −1 / +1 |

One commit, as required — CI never sees the intermediate state where the Charter has lost its
cascade but the pins still point at it.

### Gate

- `node tools/check-canon.mjs` → **120 passed, 0 failed**. Baseline 103, so **+17 checks**.
- `npm run build:css` → no post-build diff.
- `node tools/build-law-toc.mjs` (both modes) → idempotent; second run byte-identical. The
  generator's output for `laws.html` is byte-identical to the block committed in Prompt 1, so the
  hand-off and the tool agree exactly.

### charter.html III.III — dispositions actually applied

| Architecture §4 row | Applied |
|---|---|
| line 195 final sentence (Path 2 narration) | deleted |
| lines 196–201 (four rate bullets) | replaced by the ratified sentence |
| line 202 (restatement apparatus) | removed; lives in the Code's Taxation-title preamble |
| lines 204–205 (rate-keyed rationale) | relocated **verbatim** to whitepaper §12.1 |
| line 195 (rest), line 203 | kept — grants and rights, no mutable parameters |

No `h2`/`h3` id was touched; `simulations.html`'s Charter article-anchor deep links are unaffected
(re-verified by link-integrity 8b, which passes).

Post-trim Charter state, as the architecture predicted exactly: **one** surviving LP reference —
LP-069 at III.VII — and **zero** cascade matches. Article III.II's PJS overtime figures
($125 / $62.50 / $31.25 / $15.63) were confirmed not to trip the cascade regex, as instructed
(verified, not assumed).

### Retargets — moved, never deleted

| Pin | Was | Now |
|---|---|---|
| Binding-source precedence | `charter.html` restatement sentence | `laws.html` conflicts clause (verbatim §2.1 sentence) |
| Authority assertions (3 patterns) | `charter.html` row | `laws.html` row — same three patterns, same strictness |
| Cascade `currentSurfaces` | `charter.html` | `laws.html` — **still 12 surfaces** |

The other two authority rows (`rate-history.html`, `law-polling.html`) are untouched. **No check was
deleted or weakened anywhere in this prompt.**

### New guards

**§7.2 Charter purity** — 3 checks: no cascade on the constitutional surface; no LP reference outside
a one-entry whitelist; and a stale-whitelist check so the whitelist cannot outlive what it exempts.
The whitelist entry carries its own architecture citation (§5 category A, Phase 3 TODO).

**§7.3 Code integrity** — 10 checks: (a1) data-source resolves, (a2) no failed/superseded/rerouted
source, (a3) no double consolidation, (a4) every enacted register entry consolidated 1:1,
(b) each entry links its own register anchor, (c) data-tier vocabulary, (d1) Tier 1 row count from
the element-anchored `<h2 id="article-` regex, (d2) Tier 1 title text-equality in order,
(e) positive sitemap coverage, plus a ToC-sync check mirroring the register's existing one.

**§7.3f Tier-claim guard** — 1 check over all World-tier pages. Deliberately a predication test
("taxation is charter-level"), not adjacency, because "constitutional" legitimately sits near tax
vocabulary throughout the corpus.

### Manual-list enrollment — confirmed individually

- Cascade `currentSurfaces` — **confirmed** (laws.html swapped in, step 2).
- Stale-fact pages (`five currencies`) — **confirmed**, laws.html added.
- Duplicate-id pages — **confirmed**, laws.html added.
- In-page-anchor pages — **confirmed**, laws.html added (belt-and-braces beside 8b).
- Auto-enrolled sweeps (layer guard, refusal-leak, link-integrity 8b) — **no action needed**;
  verified passing over laws.html since its first commit.

### Hostile mutation suite — every new guard proven to bite

17 mutations applied to a live tree, each expected to turn CI red. **17 rejected, 0 accepted.**

| Mutation | Result |
|---|---|
| reintroduce the exact cascade into charter.html | REJECTED |
| reintroduce an unwhitelisted LP reference into charter.html | REJECTED |
| drop LP-069 while leaving it whitelisted | REJECTED |
| delete a consolidated enacted entry | REJECTED |
| point an entry at a failed/rerouted filing | REJECTED |
| point an entry at a nonexistent register anchor | REJECTED |
| invent a data-tier on a ToC link | REJECTED |
| invent a data-tier on an entry article | REJECTED |
| drift a Tier 1 index title | REJECTED |
| drop a Tier 1 index row | REJECTED |
| break an entry's own source link (still resolvable) | REJECTED |
| drop laws.html from the sitemap | REJECTED |
| remove an authority assertion from laws.html | REJECTED |
| alter the conflicts clause | REJECTED |
| restore the faq:818 tier misattribution | REJECTED |
| assert the rate schedule is constitutional on systems.html | REJECTED |
| stale Code ToC (entry present, link missing) | REJECTED |

The suite found one genuine hole on its first run: guard (c) originally read `data-tier` only from
entry articles, so a bogus tier on a generated ToC link passed. The guard was widened to every
`data-tier` on the page and the mutation now fails as it should. Recorded because it is exactly the
kind of guard that would have looked green forever.

### Judgments exercised beyond the architecture — flagged for review

- **J8 — the sitemap entry was added in this prompt, not Prompt 3.** Prompt 2 step 4(e) explicitly
  sanctions this ("or add the sitemap entry here and note it"). Noted.
- **J9 — faq:818 was rewritten in this prompt, not Prompt 3.** This one is a real deviation and
  needs the architect's eye. Guard 7.3f is specified for Prompt 2, but faq:818 is the live defect
  that guard exists to catch, and it is scheduled for repair in Prompt 3. Shipping the guard and the
  defect in different commits would mean knowingly leaving CI red across a prompt boundary, which
  the definition of done forbids. I applied the same resolution the pack itself prescribes for the
  identical ordering conflict at 4(e): pull the minimum forward and say so. **Only the misattributed
  clause moved**; Prompt 3 still owns the `:796` four-tier explainer link and everything else in §6.
  The wording used is the one Prompt 3 specifies. Alternative, if the architect prefers strict
  prompt scoping: move guard 7.3f into the Prompt 3 commit instead.
- **J10 — the generator defaults to running both modes.** `--laws` and `--law-polling` select one.
  Default-both keeps the maintainer instruction printed on law-polling.html ("re-run after adding or
  renaming any LP entry: `node tools/build-law-toc.mjs`") correct now that a second index depends on
  the same record. The register's existing parsing is untouched, as required — this is a CLI
  addition, not a parser change.
- **J11 — a ToC-sync check was added beyond the §7.3 list.** It mirrors the register's long-standing
  `ToC links = entries` check on the same terms. An extension, not a deletion; drop it if the
  architect wants §7.3 held to exactly its enumerated members.
- **J12 — the replacement sentence for the rate bullets is the architecture's draft wording,
  verbatim.** Architecture §4 marks it "Jason approves final wording". It ships as drafted and is
  flagged here as pending that approval.
