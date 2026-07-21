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

---

## Prompt 3 — Site-wide alignment (architecture §6)

### Files changed

| File | Change | Delta |
|---|---|---|
| `navbar.html` | "Laws" between Charter and Whitepaper, desktop + mobile | +2 |
| `footer.html` | laws.html in the link row; version stamp → 22.7.0 | +1 / −1 |
| `README.md` | version lockstep → 22.7.0 | +1 / −1 |
| `whitepaper.html` | three framing lines → the three-way division | +3 / −3 |
| `faq.html` | `:796` four-tier explainer gains a Code link | +1 / −1 |
| `systems.html` | `:231` hierarchy bullet gains a Code link; `:263` rate block gains tier attribution | +2 / −2 |
| `law-polling.html` | role statement gains "the enactment register" line | +2 / −1 |

`sitemap.xml` and the `faq:818` rewrite landed in Prompt 2 (judgments J8/J9); nothing further was
needed here.

### Gate

- `node tools/check-canon.mjs` → **120 passed, 0 failed**.
- `npm run build:css` → no post-build diff.
- `node tools/build-law-toc.mjs` → the law-polling role line landed **outside** parsed territory,
  confirmed by byte-comparing law-polling.html across a regeneration: no ToC change.

### Whitepaper framing — LP-042 compliance

The three-way division now reads: the Charter defines the **constitutional law**; VMSS Laws is the
**consolidated statement of the law in force at every tier**; the whitepaper is **explanatory, and
its designated sections carry specification weight under LP-042**.

Checked against the two failure modes the architecture names: the word "binding" was **not**
transferred to the Code (it is secondary authority under LP-042 and says so), and the whitepaper was
**not** demoted to "explanation only" — the specification-weight clause is stated explicitly on all
three lines.

**Line 1697 (was :1693) is exempt, as instructed, after reading it.** It is the Founding Treaty
passage in the closing "The Jury Has Spoken" section: *"The Founding Treaty is the commitment. This
whitepaper is the explanation. The Charter is the law."* That is a Treaty triad about the Treaty's
own standing, not a Charter-binding framing line about the whitepaper's relationship to the Code.
Rewriting it would have damaged Treaty framing to fix a problem it does not have. Left untouched.

The two relocated rationale paragraphs were read in place: they now follow the Trajectory Doctrine
block, under a one-line lead-in ("What the current top-bracket rate produces on the private side of
the ledger:"), and immediately precede §12.2 Currency Siloing. §12.1 keeps its rate table and its
cascade sentence, and whitepaper.html remains in the cascade sweep.

### Browser verification (localhost:4188, DOM geometry — screenshots timed out in the pane)

| Check | Result |
|---|---|
| Nav ordering, all widths | `charter.html > laws.html > whitepaper.html` ✔ |
| Desktop label | "Laws" at all xl+ widths |
| Mobile menu | "VMSS Laws", single line (24px), between Charter and Whitepaper, no page overflow at 375px ✔ |
| laws.html render | 87 entries (30/39/14/4), 4 tier sections, 7 subject titles, 7 pillar marks, 1 preamble block, 87 ToC links, ToC opens on click, **0 horizontal overflow**, **0 console errors** |
| charter.html after trim | 3 paragraphs in III.III; **0** cascade matches page-wide; exactly **one** LP reference (LP-069); all article anchors intact |
| footer | Version 22.7.0 renders |

### FINDING — pre-existing navbar overflow (not introduced here, but worsened)

Prompt 3 step 1 asked me to verify no wrap or overflow at 1280 / 1919 / 1920. **The desktop nav row
already overflowed its available width at all three widths before this change.** Measured
`need − available` for the `hidden xl:flex` link row:

| Viewport | Without a Laws link | With it | Cost of the link |
|---|---|---|---|
| 1280 | **+53 px over** | +84 px over | 31 px |
| 1919 | **+38 px over** | +69 px over | 31 px |
| 1920 | **+397 px over** | +427 px over | 30 px |

The 1920 figure is the largest because that breakpoint switches the row from `gap-1.5` (6px) to
`gap-7` (28px) — 16 gaps × 28px = 448px of gutter in a 1344px container. The row is `flex-nowrap`,
so it does not wrap; it spills, and the page scrolls horizontally.

**This is a pre-existing navbar capacity defect, not a regression I introduced** — the "without"
column is the current `main` behaviour with my link hidden. But adding a 17th item makes it ~30px
worse at every width, and honesty requires flagging that rather than reporting "verified, no wrap".

I applied the remedy the prompt prescribes for exactly this case ("if tight, keep 'Laws' at all xl+
widths"): the dual-span was collapsed to a plain `Laws` label, so the desktop nav never renders
"VMSS Laws". The mobile menu, which has room, keeps the full name. That is the whole of the remedy
available inside §6's scope — **curing the underlying overflow means changing the navbar's own
layout (gap scale, breakpoint, or overflow strategy), which is not in the architecture and which I
did not do.** Recommend it as a follow-up; it is independent of this restructure.

### Judgments exercised beyond the architecture — flagged for review

- **J13 — navbar dual-span collapsed to a single short label.** The architecture §6 and Prompt 3
  step 1 both specify the dual-span pattern *with* the "if tight, keep 'Laws' at all xl+ widths"
  fallback. Measurement showed it is tight at every tested width, so the fallback applies. The
  mobile menu still carries "VMSS Laws" in full.
- **J14 — the law-polling role line was added as a new paragraph rather than edited into the
  existing one,** so it lands above the stat cards and far outside the ToC generator's parsed
  territory. Verified by regeneration diff rather than by inspection.
- **J15 — the systems.html `:263` clause is stronger than the architecture's minimum.** §6 asks for
  "a federal-tier schedule under LP-074". I wrote "a federal-tier schedule under LP-074, **not
  Charter text**" because the chunk-level reader this clause exists for benefits from the negative
  as much as the positive. Trim the three words if the architect prefers the literal minimum.

---

## Prompt 4 — Adversarial verification pass (report, don't fix)

### Files changed

| File | Change | Delta |
|---|---|---|
| `docs-review/vmss-laws-p4-conformance.md` | **new** — the conformance report | +~290 |
| `docs-review/vmss-laws-worklog.md` | this section | — |

**No source file was touched.** Prompt 4 is report-only, and it was honoured literally: every defect
found is written up as a proposed fix for the architect, including the ones that are defects in my
own Prompt 1 and Prompt 2 output and that I could have quietly corrected.

### Gate (re-run from scratch)

- `node tools/check-canon.mjs` → **120 passed, 0 failed**.
- `npm run build:css` → no post-build diff.
- `node tools/build-law-toc.mjs` → idempotent in **both** modes and in each single mode; second run
  byte-identical.
- `simulations.html` Charter deep links → 6 distinct anchors, all resolve after the trim.
- Version lockstep → footer 22.7.0, README 22.7.0.

### Method and scale

Eight-dimension hostile fan-out (one reviewer per Prompt-4 requirement), then an independent
refutation pass over every finding. 62 review agents, ~4.2M reviewer tokens, 864 tool calls.

- **145 requirement verdicts: 116 PASS, 29 FAIL.**
- **54 raw findings → 50 refuted, 4 confirmed.**

The refutation pass earned its keep: it killed 50 of 54 findings, most of which misread the
architecture or objected to style. Full detail in `docs-review/vmss-laws-p4-conformance.md`.

### Headline results

**One blocker: R22 is registered nowhere.** Architecture §8 names "R22 registered in the process
record" as a Phase 1+2 deliverable, and D4 licenses the shipped page title "The Consolidated Code"
*"by broadened R22"*. Four of five §8 deliverables shipped; this one did not, because **no prompt in
the pack assigns it** — it is a gap between the architecture and the implementation pack, not an
omission inside a prompt. I did not invent the registration: authoring a ruling and choosing its
place in the Ratification Record is doctrinal prose that no prompt specifies, and the
no-invented-doctrine rule outranks completing the task. Architect decision required before merge.

**One genuine architecture self-conflict.** `law-polling.html:2301` (the LP-070 entry, enacted,
therefore primary authority) still carries the "binding schedule at Whitepaper §12.1" designation
that D5/R22(c) retires, and still states that Charter III.III "carries a marker pointing to its
binding source" — false as of the trim. §6 says law-polling gets "**No entry changes**"; D5 says the
designation must be retired. Both cannot hold. Prompt 3 obeyed §6.

**Four confirmed findings**, three of which are the same defect found independently by three
dimensions: `laws.html:300` quotes Charter XXVIII.II with a sentence silently elided inside the
quotation marks and no ellipsis, under a lead-in that says "without qualification" — while the
sentence removed is a qualification. The fourth is a guard of mine that passes vacuously.

**A guard I shipped is partly theatre, and my own mutation suite missed it.** Code-integrity guard
(b) uses `laws.includes(...)`, a whole-document test, so an entry whose register anchor is linked
twice on the page passes even with its own Source link deleted. That is true of exactly two entries
(LP-074 and LP-042). My Prompt 2 mutation targeted LP-021, which has no duplicate anchor — so the
suite proved the guard on a case where it works. Recorded in full because "17 mutations, 17
rejected" would otherwise read as stronger evidence than it is.

**Hedge and naming defects in my own authoring** (Prompt-0 rules 2 and 3): the verbatim
"advisory, not institutionally enforced" is missing from four Tier 3 all-layer entries whose
register rows carry -3 advisory outcomes; LP-061's -3 row drops the clause carrying -3 agency;
LP-031 never states it remains operative; LP-075 says "that Charter's" where the naming table
requires "the Path 2 Charter's".

### What passed

116 of 145, including every §7.1 retarget verified as a move rather than a deletion
(`currentSurfaces` still exactly 12), §7.2 charter purity, the §3.2 markup contract, the §3.3 1:1
consolidation of all 49 enacted register entries, generator idempotency, R13 cleanliness, exactly
the 7 canonical pillar markers, and — worth stating because an over-trim would have been as bad as
an under-trim — **every architecture §5 category-B and category-C Charter parameter still present
and intact**.

### Recommended disposition

Blocking: F1 (R22). Cheap and should land in this branch: F4–F9. Architect's call, possibly needing
its own ruling: F2, F3. Deferrable: F10–F20.

### Judgments exercised beyond the architecture — flagged for review

- **J16 — "fix nothing" was honoured literally, including against my own defects.** F4–F9 are small
  and I could have corrected them silently. Prompt 4 says "Fix nothing; list proposed fixes for the
  architect", and a verification pass that edits what it is verifying is not a verification pass.
  The branch is therefore delivered with known, documented, non-blocking defects rather than with
  quietly-patched ones. Say the word and they are a few minutes' work.

---

## Fix Pack A (A1–A12) — architect dispositions applied

Applied per `docs-review/vmss-laws-review-dispositions.md`, which supplies every fix's verbatim text
or exact rule. **No doctrinal judgment was exercised.** Docket items (F10–F12, F15–F17, F19, F20,
the LP-005.2 badge anomaly, the Lite-site trim) were deliberately not touched.

### Files changed

| File | Change | Delta |
|---|---|---|
| `tools/check-canon.mjs` | A5 de-vacuation, A10 + A11 new guards, A1 + A2 durability pins | +104 / −6 |
| `laws.html` | A4, A6, A7, A8, A9, A11 marker (+ the casing cure below) | +11 / −11 |
| `pending-ratification.html` | A1 — R22 registered | +9 |
| `whitepaper.html` | A3 — §10.6 and §10.6.1 link the Code | +2 / −2 |
| `law-polling.html` | A2 — LP-070 placement description cured | +1 / −1 |
| `README.md` | A12 — Pages table + Structure tree rows | +2 |

### Gate

- `node tools/check-canon.mjs` → **126 passed, 0 failed** (was 120; **+6 checks**).
- `npm run build:css` → no post-build diff.
- `node tools/build-law-toc.mjs` → both modes idempotent, byte-identical on re-run.
- A2 specifically: `law-polling.html` re-run through the generator after the in-entry edit —
  **TOC byte-stable**, confirmed by file comparison rather than inspection.

### Per-fix disposition

| Fix | Applied |
|---|---|
| **A1** | R22 registered on `pending-ratification.html` as a `process-frame` ruling block above the status banner, verbatim (a)/(b)/(c) + the LP-070 anchor note. Pin added on both `R22` and `Restatement &amp; Consolidation Doctrine` in the entity form the page actually uses. **D4's condition is cleared — the title stands, no retitle.** |
| **A2** | Both replacement sentences applied exactly as written. Stale-fact pin added: `law-polling.html` must not contain `III.III now carries`. |
| **A3** | Both appended sentences verbatim, using the whitepaper's own page-link class (`text-[var(--accent)] font-semibold hover:underline`) per "match each location's existing conventions". |
| **A4** | Elided sentence restored in position; lead-in changed to "states the ordering directly:". |
| **A5** | `codeEntries` now captures entry bodies with the generator's own regex; guard (b) asserts against `e.body`. Comment rewritten to match the code. |
| **A6** | Hedge added to LP-013, LP-026, LP-036, LP-042 Scope values: "Layer-wide, all layers; in -3 Terminal, advisory, not institutionally enforced". |
| **A7** | "and the voluntary districts vote to keep it" restored on LP-061's -3 row. |
| **A8** | LP-031 now opens "**Operative as an implementing specification under LP-045.2's extensibility clause.**" |
| **A9** | "that Charter's §13.1" → "the Path 2 Charter's §13.1". |
| **A10** | New guards (a5) advisory-flag and (a6) mixed per-layer structure — see the scope note below. |
| **A11** | Guard (e2) extended to `laws.html`'s `code-entry` blocks with the same four bans, plus a check that the `data-r22="taxation-preamble"` marker exists at all, so the exemption cannot lose its anchor silently. |
| **A12** | `laws.html` row added to the Pages table after `charter.html`, and to the Structure tree. |

### Two things the verification caught that the dispositions did not anticipate

**1. A10, as first implemented, did not cover the A6 entries — the verification step caught it.**
A10(i) names "`status-advisory` register entries and mixed petitions' -3 rows". I implemented
exactly that, and mutation (ii) came back **ACCEPTED**: LP-013/026/036/042 are `status-enacted` in
the register, so a status-derived scope excludes precisely the four entries F6 was about. The
disposition's own definition of done requires mutation (ii) to fail, so the scope was widened to a
rule still derived mechanically from the register rather than from a hand-kept list: **an entry owes
the flag if the register books it advisory outright, or if the register's own outcome table carries
an advisory row** (`<td class="advisory">`). That resolves to exactly 12 entries — the 6 mixed
petitions, the 4 all-layer regulations, and the 2 advisory district entries — with no list to
maintain. Recorded because a status-only rule would have shipped green while leaving F6's exact gap
open.

**2. The new A10 guard immediately caught a defect the P4 report had cleared.** On first run it
failed on `code-lp-009` and `code-lp-030`. The P4 conformance report states the hedge was "present
and comma-exact … [on] both `status-advisory` district entries". It was not: both carried
**"Advisory, not institutionally enforced"** sentence-initial, so the canonical lowercase literal
did not appear. Cured by rewording so the hedge sits mid-sentence in its charter form; wording
otherwise unchanged, meta fields untouched. `laws.html` now carries the comma-exact literal 12
times. **P4 §5 F6's claim that those two entries were clean is erratum-worthy** — the audit read
them case-insensitively.

### Mutation results — the four targeted cases, all on paths that previously escaped

| # | Mutation | Result |
|---|---|---|
| (i) | Delete **LP-074's own** entry Source link (doubled-anchor case) | **REJECTED** — guard (b) |
| (i-b) | Same for **LP-042**, the other doubled-anchor entry | **REJECTED** — guard (b) |
| (ii) | Delete the advisory hedge from an A6 entry (LP-026) | **REJECTED** — guard (a5) |
| (iii) | Insert an `ls-cite` anchor into a `code-entry` body (LP-063) | **REJECTED** — R16 Code guard |
| (iv-a) | Apparatus **inside** the sanctioned Taxation preamble | **GREEN** — exemption covers its own block, correctly |
| (iv-b) | Ordinary entry forging `data-r22="taxation-preamble"` + apparatus | **REJECTED** — exemption is not claimable by entries |

**6 probes, 6 correct, 0 leaks.** Both (i) and (i-b) were green before A5 — they are the exact
vacuity F5 identified. A methodological note: my first (iv-a) probe used `href="#x"`, which turned
CI red on the *link-integrity* guard rather than proving anything about the R16 exemption. The probe
was corrected to a resolving fragment before the result was accepted; a red build is not evidence
unless it is red for the reason under test.

No mutation residue remains: `laws.html` contains exactly one `data-r22` marker and zero `ls-cite` /
`Citation key` strings.

### Judgments — none doctrinal

- **J17 — the A10 scope widening** described above. Mechanically derived, no list, no doctrine; taken
  because the disposition's verification step mandates the behaviour.
- **J18 — the LP-009/LP-030 casing cure.** Required to satisfy the literal pin A10 mandates. The
  hedge's wording is unchanged; only sentence position and casing moved.
