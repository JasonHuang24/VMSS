# VMSS Laws — Prompt 4 Conformance Report

Adversarial verification of the shipped restructure against `docs-review/vmss-laws-architecture.md`
(RATIFIED 2026-07-20, D1–D5 as recommended). Branch `feat/vmss-laws-v22.7.0`, commits `90839fb`
(Prompt 1), `4cf6517` (Prompt 2), `3908bb4` (Prompt 3).

**Nothing in this report has been fixed.** Prompt 4 is report-only; every item below is a proposed
fix for the architect to accept, reject, or reschedule.

## Method

Mechanical gates were run directly. The analytical audit was an eight-dimension hostile fan-out —
one reviewer per Prompt-4 requirement, each instructed to assume the implementation is wrong — and
every finding it produced was then handed to an independent reviewer instructed to **refute** it.
Findings that survived refutation are reported as confirmed; findings that did not are recorded as
refuted and are not carried forward.

- **145 requirement verdicts**: **116 PASS**, **29 FAIL**.
- **54 raw findings** → **50 refuted**, **4 confirmed**.
- 62 review agents, ~4.2M reviewer tokens, 864 tool calls.

The refutation pass mattered: it killed 50 of 54 findings, including several that read plausibly but
misquoted the architecture or objected to matters of taste. The 29 FAIL verdicts and the 4 confirmed
findings overlap — the same defect was found independently by up to three dimensions.

---

## 1. Mechanical gates — ALL PASS

| Gate | Result |
|---|---|
| `node tools/check-canon.mjs` | **120 passed, 0 failed** (baseline 103, so +17) |
| `npm run build:css` | no post-build diff on `assets/css/tailwind.css` |
| `node tools/build-law-toc.mjs` (both modes) | idempotent — second run byte-identical |
| `node tools/build-law-toc.mjs --laws` | idempotent |
| `node tools/build-law-toc.mjs --law-polling` | idempotent |
| Hostile mutation suite (17 mutations vs the new guards) | 17 rejected, 0 accepted |
| `simulations.html` → charter article anchors | 6 distinct anchors, all resolve after the trim |
| Version lockstep | footer 22.7.0 · README 22.7.0 |

---

## 2. FAIL — deliverable missing

### F1. R22 is not registered anywhere. **(blocker)**

Architecture §8 lists the Phase 1+2 deliverable set as "laws.html + charter III.III trim +
alignment map + guard flips + **R22 registered in the process record**". Four of five shipped. R22
did not.

A repo-wide search for `R22` returns only two code comments in `tools/check-canon.mjs` and unrelated
Academic-Resource ids. There is no ruling registered in the Ratification Record, and no in-world or
process-tier entry stating the Restatement & Consolidation Doctrine.

This is load-bearing rather than bookkeeping, because two shipped things depend on it:

- **§4** relies on R22(a) to make the charter trim "amends nothing". The trim shipped; the ruling
  that authorizes it did not.
- **D4** licenses the on-page title "VMSS Laws — The Consolidated Code" *"by broadened R22"*, and
  states the fallback explicitly: *"If R22 is registered narrow … drop 'The Consolidated Code' for
  descriptive lowercase until it's broadened."* The title ships (laws.html:9, :11, :17, :280) while
  R22 is registered neither broadly nor narrowly.
- **§2.1** relies on R22 to retire the line-202 "binding schedule" designation — see F2.

**Root cause: the prompt pack never assigned it.** Prompts 1–4 do not mention registering R22; §8
does. This is a gap between the architecture and the pack, not an implementer omission.

**Not fixed deliberately.** Registering a ruling means authoring process-tier doctrinal prose and
choosing where in the Ratification Record it sits — neither is specified by any prompt, and the
no-invented-doctrine rule outranks completing the task. **Architect decision required.**

**Proposed fix:** register R22 (a)/(b)/(c) as an entry in the Ratification Record, using the text
already drafted in architecture §4, before this branch merges. If R22 is instead registered narrow,
apply D4's own fallback and retitle the page.

---

## 3. FAIL — canon contradictions the restructure did not reach

### F2. The register still carries the designation D5 retires, and a now-false statement about the Charter. **(major)**

`law-polling.html:2301`, inside the **LP-070 entry** (`status-enacted`, therefore *primary
authority* under LP-042):

> "…the top-marginal rate figures are federal-law-tier, and their appearance in Charter III.III is
> restatement of **the binding schedule at Whitepaper §12.1** … The same ruling seats a restatement
> convention in the Charter — **III.III now carries a marker pointing to its binding source**."

Two problems, both created by this restructure:

1. **"the binding schedule at Whitepaper §12.1"** is exactly the designation D5 / R22(c) retires.
   It now survives in a primary-authority instrument while the Code declares the whitepaper's
   sections to hold *specification weight*, not bindingness.
2. **"their appearance in Charter III.III"** and **"III.III now carries a marker"** are false as of
   `4cf6517`. The rates no longer appear in III.III, and the restatement marker was removed.

**This is a genuine conflict inside the architecture, not an implementation slip.** §6's
`law-polling.html` row says "One line added to the page role statement … **No entry changes**",
while D5 requires the designation retired. Both cannot hold. Prompt 3 obeyed §6.

**Proposed fix (architect's call):** amend the LP-070 entry's second paragraph so the dual-key
ruling it records is stated in the past tense with respect to placement — the ruling itself
(rate figures are federal-tier) is unchanged and should survive verbatim; only its description of
where the figures *currently sit* is stale. Note that editing an enacted register entry is a canon
act and may want a ruling of its own.

### F3. The whitepaper's canonical hierarchy treatment does not link the Code. **(major)**

`whitepaper.html:799` (§10.6 Jurisdictional Hierarchy) and `whitepaper.html:803` (§10.6.1 **What the
Charter Does Not Contain**) both teach the four-tier hierarchy and neither links `laws.html`.
§10.6.1 is the site's canonical treatment of precisely the doctrine this restructure ships — a
reader arriving there is asking the question the Code was built to answer.

Strictly, Prompt 3 is conformant: §6's whitepaper row enumerates only the framing lines and the
relocated paragraphs. But architecture §6's own standard — "every page teaching the four-tier
hierarchy links the Code consistently" — is not met.

**Proposed fix:** add a Code link to §10.6 and §10.6.1. One sentence each, no doctrinal change.

---

## 4. FAIL — precision defects in the shipped Code (confirmed findings)

### F4. `laws.html:300` misquotes Charter XXVIII.II — a sentence is elided inside the quotation marks, with no ellipsis. **(minor; found independently by 3 dimensions, survived refutation 3×)**

`charter.html:448` reads:

> "…which is subordinate to the charter. **No district regulation may contradict a layer-wide
> regulation.** The hierarchy is absolute: charter, federal law, layer-wide regulation, district
> regulation. Each tier operates within the bounds of the tier above it."

`laws.html:300` presents the flanking sentences as one continuous quotation with the middle sentence
dropped and no elision mark (`grep -c hellip laws.html` → 0).

Architecture §3.1.2 and Prompt 1 step 4 both say **verbatim**. The lead-in makes it worse: it reads
"states the ordering **without qualification**", and the sentence removed is a qualification. On a
page whose stated discipline is "this index restates nothing", silently editing constitutional text
displayed in quotation marks is the wrong kind of error to ship.

**Proposed fix:** restore the omitted sentence (preferred — it is a live non-contradiction rule the
Tier 4 section relies on) and change the lead-in to "states the ordering directly:". Or mark the cut
with an explicit ellipsis. One-line change, no guard impact.

### F5. Code-integrity guard (b) is page-scoped, not entry-scoped — it passes vacuously for two entries. **(nit, but it is guard theatre)**

`tools/check-canon.mjs:604`:

```js
const anchorMismatch = lawEntries.filter((e) => !laws.includes(`href="law-polling.html#${e.source}"`))
```

The guard's own comment claims the opposite of what the code does: *"the Source link on each entry
has to point at that entry's own register anchor, not merely at some real anchor."* `laws.includes`
searches the whole document, so a second link to the same anchor anywhere on the page satisfies it.

`laws.html` has exactly two doubled anchors — `lp-074` (Taxation preamble at :582 + entry Source at
:614) and `lp-042` (header authority paragraph at :286 + entry Source at :1497). The reviewer
mutated an in-memory copy: deleting **either** entry's own Source link leaves the guard with zero
offenders. A control deletion (`lp-063`) correctly reports one offender.

I introduced this guard in Prompt 2 and its mutation test did not catch the vacuity, because the
mutation I wrote (`(b) break an entry's own source link while keeping it resolvable`) targeted
`lp-021`, which has no duplicate anchor. **The suite proved the guard on a case where it works.**

**Proposed fix (verified green on the current tree):** scope the test to the entry body using the
body-capturing regex the generator already uses, and assert
`body.includes('href="law-polling.html#' + source + '"')`. All 87 entries satisfy the stricter form
today.

---

## 5. FAIL — hedge and naming defects in `laws.html`

These are Prompt-0 rule violations (rules 2 and 3) in my own authoring. Reported, not fixed, per
Prompt 4's "fix nothing".

| # | Location | Defect | Proposed fix |
|---|---|---|---|
| F6 | laws.html:1266/1272, :1444/1450, :1476/1482, :1492/1499 | The verbatim hedge **"advisory, not institutionally enforced"** is present and comma-exact on all six mixed-petition -3 rows and both advisory district entries, but **absent from the four all-layer Tier 3 entries** (LP-013, LP-026, LP-036, LP-042) whose register rows are marked `-3 Terminal (advisory)` | Add the hedge to those four entries' scope statements |
| F7 | laws.html:1519 (LP-061, -3 row) | Drops "**and the voluntary districts vote to keep it**" from `law-polling.html:2989`. That clause carries -3 agency — the districts *choose* the unregulated state; without it the row reads as mere absence | Restore the clause |
| F8 | laws.html:915–929 (LP-031) | Never states the entry is in force. The register says LP-031 is "**operative only as an implementing specification** under LP-045.2's extensibility clause"; the Code gives only a Supersession pointer, so the isolation test fails on "is it currently in force?" | State "Operative as an implementing specification under LP-045.2" |
| F9 | laws.html:630 (LP-075) | "that Charter's §13.1" — the naming table requires **the Path 2 Charter** always carry "Path 2" | "the Path 2 Charter's §13.1" |
| F10 | laws.html Tier 1 rows (all 30) | Isolation: an entry's tier is carried only by the machine attribute `data-tier="charter"` and a section-level badge outside the rows. Retrieval landing on one row alone cannot state its tier | Accepted trade of the bare-index design (architecture §3.1.4 forbids gists); flagged as a known limit rather than a fix |

---

## 6. FAIL — guard coverage narrower than the architecture specifies

None of these is a weakened or deleted check; all are **new** guards that under-reach their spec.

| # | Guard | Gap | Proposed fix |
|---|---|---|---|
| F11 | §7.3f tier-claim (`check-canon.mjs:664`) | Implemented as a **copula-predication** test; §7.3f specifies **proximity**. Probes that escape: "The rate schedule is Charter text.", "Article III.III sets the top marginal rates for every layer.", "The Charter fixes the 50/25/12.5/6.25 cascade.", "Rates are set at charter level.", "These rates are constitutionally fixed." It *does* catch the original faq:818 defect | Widen carefully. A reviewer tested the literal proximity spec and reports **it fails on true canon** — "constitutional" legitimately sits near tax vocabulary throughout the corpus — so the fix is a broader predication set, not raw proximity |
| F12 | cascade `currentSurfaces` (`:463–467`) | Tests `exactCascade` against the **whole normalized file**, so one attributed occurrence anywhere clears every unattributed occurrence on that page. This is pre-existing behaviour, not introduced here, but it is why F13/F14 below pass CI | Section-scoped variant, or accept and rely on the ambiguity audit |
| F13 | §7.3a status whitelist | Asserts **set membership only**. §3.3 additionally requires "advisory = flag mandatory" and "mixed = per-layer outcomes only" — neither is machine-asserted, which is why F6 shipped green | Assert the verbatim advisory flag on advisory-derived entries and the presence of a per-layer table on mixed-derived entries |
| F14 | R16 apparatus guard (e2) | Splits on `<article class="law-entry` over `law-polling.html` only. `laws.html` uses `code-entry` and is outside it, so the Code could grow `ls-cite` anchors or a citation key without failing CI | Extend (e2) to `laws.html`'s `code-entry` blocks, exempting the sanctioned Taxation preamble |
| F15 | tier-claim `worldPages` roster | `readdirSync(ROOT)` is non-recursive, so `documents/academy-source.html` and `documents/resources-source.html` are swept by `currentSurfaces` but **not** by the tier-claim guard | Pre-existing roster shape; extend if the architect wants parity |

---

## 7. FAIL — ambiguity audit, section-level (content outside §6's change set)

Prompt 4 step 3 asks for tier attribution "within the same section of the page" for **every**
occurrence on all 12 cascade surfaces. **10 of 12 surfaces PASS.** Two fail at section level while
passing CI (see F12):

| # | Surface | Unattributed occurrences |
|---|---|---|
| F16 | `layer--3.html:152` | "6.25% top-marginal taxation" inside *Alternative Story — The Freedom Layer* (opens :142). No `federal` / `LP-0NN` / `XXV.VI` token anywhere from :142 to EOF. The page's other mention (:50) is properly attributed |
| F17 | `simulations.html` | Six section-level occurrences with no attribution inside their enclosing simulation card: `:696`, `:705`, `:775`, `:1600`, `:1621`, `:2709`. The page passes CI on the strength of the page-level banner at `:45` alone |

Neither page is in §6's alignment map, so neither was scheduled for change. Reported because the
ambiguity audit is the point of the project: an LLM retrieving one of those chunks gets a rate with
no tier.

**Proposed fix:** one clause per occurrence, as was done for `systems.html:263`.

---

## 8. FAIL — completeness nits

| # | Item | Note |
|---|---|---|
| F18 | `README.md` Pages table (:24–48) and Structure tree (:66–84) omit `laws.html` | §6 required only version lockstep, which shipped. But the README lists `charter.html` and `law-polling.html`, so a new primary doctrine surface is missing from its own index. (A reviewer notes the table omits several path-2 pages too, so it was never exhaustive.) |
| F19 | `charter.html` XXVIII.III (:451–458) enumerates all four tiers and does not link the Code | The Charter links `laws.html` exactly once, at :196. §6 did not require more |
| F20 | `law-polling.html:2406` calls `pending-ratify-tax-50-ii-statute.html` "the Ratification Record" | Naming table reserves that name for `pending-ratification.html`. **Pre-existing text**; the new prose is conformant (laws.html:617 labels the same target "Instrument record") |

---

## 9. Decision register (§9) cross-check

| Decision | Honoured? |
|---|---|
| **D1** — new laws.html + slimmed charter.html | **PASS** — both shipped; the Code is a fourth restatement surface with guard 7.3a converting staleness into CI red, exactly the accepted trade |
| **D2** — minimal Phase-1 strip, III.III block only | **PASS** — only the III.III block left; LP-069 survives at III.VII under a one-entry whitelist with a Phase 3 TODO, as §4's "known residual" predicted |
| **D3** — defer Phase 3 | **PASS** — no category-B relocation attempted; §5 remains the standing docket |
| **D4** — title "The Consolidated Code", nav "VMSS Laws"/"Laws" | **CONDITIONAL FAIL** — the title ships, but D4 licenses it "by broadened R22" and R22 is registered nowhere (**F1**). Either register R22 broadened, or apply D4's own fallback |
| **D5** — retire the line-202 "binding schedule" designation | **PARTIAL** — retired from `charter.html` (the line is gone) and correctly reframed on `laws.html` and `whitepaper.html`; **survives at `law-polling.html:2301`** (**F2**) |

Also verified as LP-042-compliant: the word "binding" was **not** transferred to the Code — it
declares itself "a consolidation, a finding aid … **secondary authority under LP-042**" and "creates
no law, amends no instrument, and adds no rank to the hierarchy" (laws.html:286) — and the
whitepaper was **not** demoted to "explanation only"; all three rewritten framing lines carry the
specification-weight clause.

---

## 10. What passed

Recorded so the FAIL list above is read in proportion. 116 of 145 requirement verdicts passed,
including every one of these:

- **§2.1** authority chain, LP-042 classification, and the conflicts clause verbatim and pinned.
- **§2.4** Path 2 disambiguation present at the Taxation title; no renames in the path-2 family.
- **§3.2** machine markup contract exact — 87 `code-entry` articles, four tier-section ids, correct
  `data-tier`/`data-source`, TOC inside the `LAWS-TOC` markers.
- **§3.3** status whitelist: 49 enacted register entries consolidated 1:1, no failed/superseded/
  rerouted filing published as an entry.
- **§4** every charter-trim disposition applied as specified; the rationale paragraphs relocated
  **verbatim**; no `h2`/`h3` id touched; all six `simulations.html` deep links still resolve.
- **§5 category B/C keeps intact** — the deliberately-retained Charter parameters (PJS overtime
  cascade, retention bands, forfeiture schedule, SCM triggers, lookbacks, XXVII curve, UBI amounts,
  leakage trajectories) are all still present. **An over-trim would have been as much a defect as an
  under-trim, and did not occur.**
- **§7.1** all three retargets are moves, not deletions; `currentSurfaces` still has exactly 12
  members. **No check was deleted or weakened anywhere in the change.**
- **§7.2** charter purity: zero cascade matches page-wide, exactly one whitelisted LP reference.
- **§7.4** generator idempotent in both modes; the register's own parsing untouched.
- **§7.5** auto-enrolled sweeps clean over `laws.html` from its first commit; manual lists enrolled.
- **10 of 12** cascade surfaces carry section-level tier attribution.
- **R13** clean: no founder-as-actor, no reviewer seat names on any World-tier page.
- **Naming table** conformant across all touched files, with the two exceptions at F9 and F20.
- **Pillar markers**: exactly the 7 canonical Pillar Federal Laws, and no others.

---

## 11. Recommended disposition before merge

**Blocking:** F1 (register R22, or apply D4's fallback) — it is a named §8 deliverable and D4 depends
on it.

**Should fix in this branch (cheap, and they are defects in what shipped):** F4 (misquotation), F5
(vacuous guard), F6–F9 (hedge and naming).

**Architect decision, may want its own ruling:** F2 (editing an enacted register entry), F3.

**Reasonable to defer:** F10–F20.

**Nothing in this report was fixed.** The branch is left in its last green state: check-canon 120
passed / 0 failed, both generator modes idempotent, `build:css` clean.
