# VMSS Charter Load-Bearing Audit — Run L1 Worklog

Run L1 (data phase only) of `docs-review/vmss-laws-loadbearing-handoff.md`.
Branch: `feat/charter-loadbearing-audit`. Executing session: Opus, 2026-07-21.

**Hard boundary honoured for the whole run:** no `charter.html` edit, no `laws.html` edit, no guard
change. Every artifact this run commits lives in `docs-review/` or `documents/`.

---

## Phase 0 — Setup and baseline

| Item | Value |
|---|---|
| `git remote -v` | `https://github.com/JasonHuang24/VMSS.git` (fetch + push) — verified |
| Branch | `feat/charter-loadbearing-audit`, checked out from `origin/feat/charter-loadbearing-audit` at `908903c`. **Not recreated, not rebased.** |
| Branch base | `9638212` `canon v22.8.0: latent-corpus codification` (merged into the branch at `e258241`) |
| History discipline (handoff §9) | The launch block instructed **no history rewrite, no force-push, no tag operations**. None were performed. Recorded here verbatim as §9 requires. |
| check-canon baseline | **133 passed / 0 failed** — `derived: archive=94 (world=48 residents=46) sections=10 versions=26 \| law 7/60/22 of 89 \| academy=33 resources=33 \| faq=79 why=32` |
| Register ground truth | law-polling.html stat cards: **89 = 7 Charter-amendment / 60 Federal / 22 Regulatory** |
| Code ground truth | laws.html carries **60** `data-instrument="founding"` entries |

Specs read in full, in the order the launch block gave: loadbearing-handoff · architecture (§5 =
the validation prior) · latent-inventory (B8 `parent-authority` + `charter-touchpoints` on all 61
instruments — confirmed present, 61/61) · latent-dispositions · latent-final-review ·
opus-prompts Prompt 0.

**Node seed disposition.** `documents/charter-provision-nodes.draft.json` (214 nodes,
Preamble–Article XXIV, self-declared UNVERIFIED) was **not** adopted. The whole Charter body
(charter.html:147–474) was re-read in this session and the node set was regenerated from the text,
with the draft used only as a cross-check for coverage. Per the launch block: the graph committed
here is this run's to stand behind.

---

## Phase 1 — The typed dependency graph (handoff §3)

### Method

Multi-modal extraction, each lens blind to the others, fanned out under ultracode.

**Node lens** — 12 agents over disjoint `charter.html` line ranges, splitting article bodies into
separable rule units at clause level (a schedule, a prohibition, a grant, a procedural rule each
count separately). Each agent also returned an exhaustive magnitude ledger for its range, which is
the completeness critic's input.

**Edge lenses** — 14 agents, one per extraction mode:

| Lens | Surface | Primary edge types |
|---|---|---|
| `cite:whitepaper` | whitepaper.html | E1/E2/E3 |
| `cite:world+systems+tech` | world, systems, technologies, sads, layers | E1/E3 |
| `cite:layer-pages+faq` | five layer pages, faq, why-vmss, index, join, roadmap | E3/E4 |
| `cite:simulations+records` | simulations family, path-2 family, pending-ratify family, rate-history, deregistered | E4 |
| `inv:B8 #1–31`, `inv:B8 #32–61` | latent-inventory PART 1 `parent-authority` + `charter-touchpoints` | E1/E2/E3 |
| `reg:law-polling federal` | the 60 Federal register entries | E1/E2 |
| `reg:charter-amend + regulatory` | the 7 Charter-amendment entries + 22 Regulatory | E1/E2/E3 |
| `code:laws.html` | the Consolidated Code, incl. all 30 Tier-1 index rows | E1/E3/E4 |
| `internal:charter cross-refs` | charter.html against itself — **the E2 core** | E2 |
| `tooling:E5 guard pins` | tools/check-canon.mjs, tools/build-law-toc.mjs | E5 |
| `mag:Article III magnitudes` | every Article III magnitude, grepped corpus-wide | E3 |
| `mag:non-III magnitudes` | every Charter magnitude outside Article III, corpus-wide | E3 |
| `close:XXV.I–III + III.IV gradients` | the two hard cases handoff §5 names, plus unmarked dependencies | E1/E2 |

**Critic lens** — 3 adversarial agents: a magnitude completeness critic and a deontic-clause
completeness critic, each independently re-deriving ground truth from `charter.html` rather than
trusting the extraction; and an edge-type auditor prompted to **refute** every E1/E2 edge, since
those are the only types that confer load-bearing status.

House fact honoured throughout: subagent structured returns carry a hard 64k output-token ceiling
(the Phase M run lost a whole clustering lens to it). Every lens was therefore chunked, every
schema carries a `truncated` flag, and per-edge output was held to a `from | fromLoc | to | type |
quote(≤140)` row.

### Results

29 agents, **0 errors, 0 empty results**, ~2.33M subagent tokens, 400 tool uses, 18 min wall clock.

| Artifact | Value |
|---|---|
| Provision nodes | 422 raw → **421** committed (one literal id collision, `xi-pillar-article-marker`, dropped by the assembler's dedup) |
| Provision labels covered | **49** — Preamble, Four Founding Lines, I–XXVIII with every sub-article, Founding Affirmation |
| Nodes carrying magnitudes | 113 |
| Typed edges | **1221** — E1 335 · E2 310 · E3 400 · E4 131 · E5 45 |
| Truncated returns | **1 of 29**, and it was deliberate consolidation, not a cutoff (see below) |

**The 64k ceiling held.** One lens returned `truncated: true`: the simulations/records citation
lens, which consolidated ~225 pedagogical Article citations in `documents/academy-source.html` and
`documents/resources-source.html` into ~20 representative rows and set the flag to say so. Those
are PDF-generation sources at explainer rank carrying no E1/E2; they cannot change a
classification. Recorded rather than re-run. No lens was lost — the failure mode that cost the
Phase M run a whole clustering lens did not recur.

### Two assembler bugs, found and fixed before the graph was committed

1. **Roman-numeral alternation was leftmost-matching.** `'I|II|III|...'` made `III.I` normalise to
   `I`, collapsing every Article III sub-article onto Article I — the provision count came out as
   **6** instead of 49. Fixed by sorting the alternation longest-first. Recorded because it is
   silent: the graph looked well-formed and every count was wrong.
2. **Prefix-strip ordering.** `charter.html` was stripped to `.html` because the bare `charter:`
   prefix rule ran before the `charter.html` rule. Fixed by ordering the specific case first.

### Completeness critics (handoff §3's proof obligation)

Three adversarial critics, each re-deriving ground truth from `charter.html` rather than trusting
the extraction. Results are recorded in full in the register §13b and in the graph's
`criticFindings`; the headline is that **all three returned findings and none moved a
classification**:

- **Magnitudes: the numeric ledger closes exactly.** Every `$`, `%`, `x`, `n/n`, `n:n` literal —
  including all 12 leakage-trajectory rows and both 24-month lookbacks — has exactly one owner.
  Its genuine misses are a class the extraction had no rule for: **negative magnitudes** stated as
  an absence (*"There is no minimum wage in VMSS"*, *"No minimum participation quorum is
  imposed"*). Consequential for L2's purity guard, which scans for strings.
- **Deontic clauses: 9 clause-granularity gaps.** Every line the critic named *does* carry a node;
  the gaps are distinct deontic clauses sharing a line with a covered clause. Reported as a
  granularity gap rather than softened. All nine sit in provisions already load-bearing on
  independent grounds.
- **Edge types: 41 mistypes, all in one direction.** Every one inflates a non-conferring edge into
  E1/E2; zero E1/E2 edges were found deflated into E3. Impact tested mechanically: four of the five
  demotion candidates lose zero corrected edges, III.V loses two of nine and keeps its result. An
  over-conferring bias can only produce false *keeps*, so the demotion set is safe against it.

### Independent checks run beyond the lenses

- **E4 anchor census, derived mechanically:** 55 external `charter.html#` references (laws.html 44,
  simulations.html 10, faq.html 1) against charter.html's 31 ids — **all 31 are referenced**. An
  initial census was wrong because the pattern also matched `path-2-charter.html#`; corrected with
  a boundary and re-derived.
- **Architect §12 residual check** (`cluster-architecture.md` spot-check for instrument-shaped
  content absent from the 61): **clean.** Every spine name absent from PART 1 — Failsafe
  Configuration, Consequence Classification, STI Measurement Schedule, Continuity Guarantee,
  Continuity Consent, Monetary Sovereignty — resolves through the inventory's own documented
  rename/merge table. No latent-set miss; no missing E1 edges from that cause.
- **Worktree hygiene:** `.claude/worktrees/` holds full repo copies that pollute repo-wide greps.
  Verified after extraction that **zero edges cite a worktree path**.

---

## Phase 2 — Classification, validation, and the register

Applied the handoff §4 L1–L4 test per provision, edge-typed. Validated against the architecture §5
prior: **the prior's direction is reproduced on every row** — five refinements and two line-number
corrections, all recorded in register §9 with evidence, none suppressed and none silently adopted.

Both hard cases adjudicated with evidence rather than deferred (register §6).

**Judgment exercised beyond the spec** — flagged in register §13, and summarised for the architect:
the derivation-sentence keep in III.II (D-1); the XXVII single-magnitude reading (D-2); the
recommendation to *keep* III.IV's gradient ranges as a bound on a delegated power (D-3); the
`Canon Anchor` typing sensitivity (~70 E4 rows would re-type to E1 in bulk under a different
reading, changing the in-degree table but no result); and the choice not to fan out the
`Articles XXV.I–XXV.III` range citations into three edges rather than invent evidence.

## Gates

| Gate | Result |
|---|---|
| check-canon | **133 passed / 0 failed** at every commit — unchanged from baseline. This run touches no root `.html` file. |
| `build:css` | Not run and not required — no HTML/JS class changed. |
| TOC modes | Not run and not required — no register or Code entry changed. |
| Files touched | `docs-review/` and `documents/` only, as the hard boundary requires. |
| History discipline | No rewrite, no force-push, no tag operation. One `git pull --rebase` of a single unpushed local commit onto an architect push (§12 checklist) — ordinary integration, no published history altered. |

## Milestones pushed

1. `c8bb365` — worklog opened (setup, baseline, method).
2. `cc88e07` — `documents/charter-dependency-graph.json` (421 nodes, 1221 typed edges).
3. `5f873dc` — `docs-review/vmss-laws-loadbearing-register.md` (the gate deliverable).
4. This commit — critic findings folded into the graph and register; worklog completed.

**STOP condition reached as specified.** The register is pushed. Jason ratifies it personally
before any Run L2 enactment exists. No PR, no merge, never main.

---
---

# Run L2 — Enactment: the Enabling Consolidation Amendment (canon v23.0.0)

Run L2 of `docs-review/vmss-laws-loadbearing-handoff.md` — **§13 (ratification record) and §14
(execution spec) govern**. Branch: `feat/vmss-laws-v23.0.0`. Executing session: Opus, 2026-07-21.

Jason ratified the register with the architect's errata (handoff §13). This run authors in-world
constitutional history **exactly as ratified and nothing more**; every judgment taken beyond the
ratified licence is flagged in this worklog.

## L2 Phase 0 — Setup and baseline

| Item | Value |
|---|---|
| `git remote -v` | `https://github.com/JasonHuang24/VMSS.git` (fetch + push) — verified |
| Branch | `feat/vmss-laws-v23.0.0`, created from `origin/feat/charter-loadbearing-audit` at `913ab52` (the L2 handoff commit). The L1 branch is not touched again. |
| L1 branch state consumed | `913ab52` — carries the graph, the register, the architect's L1 review, and handoff §13–§16 |
| History discipline (handoff §9) | The launch block instructed **no history rewrite, no force-push, no tag operations**. None were performed. Recorded verbatim as §9 requires. |
| check-canon baseline | **133 passed / 0 failed** — `derived: archive=94 (world=48 residents=46) sections=10 versions=26 \| law 7/60/22 of 89 \| academy=33 resources=33 \| faq=79 why=32` |
| Stat-card ground truth at branch time | law-polling.html: **89 = 7 Charter-amendment / 60 Federal / 22 Regulatory**. This run moves it to **90 = 8/60/22**. |
| Founding-count ground truth | laws.html: **60** `data-instrument="founding"` entries. **Must not move** — new entries are enacted under LP-076, never marked founding. |

Specs read in full, in the launch block's order: loadbearing-handoff (§13 ratification record, §14
execution spec; §7–§10 background) · loadbearing-register (the ratified content authority) ·
loadbearing-review (errata E-L1–E-L3, observation O-L1) · architecture · opus-prompts Prompt 0.

## L2 Phase 1 — Record-keeping: errata folded, register marked RATIFIED (§14.1)

`docs-review/vmss-laws-loadbearing-register.md` only. No canon surface touched; check-canon
unchanged at 133/0.

| Change | Where |
|---|---|
| Status header rewritten PROPOSED → **RATIFIED**, citing handoff §13 and the review doc; the original status line preserved verbatim as the historical record | register head |
| **E-L1** folded: `charter.html:202` joins the III.V relocation set; the sentence keeps pointer form and loses the band values; noted that the purchasing-power gradients on the same line are a §6-case-B **keep**, so the :202 edit is surgical | §4.3, §10 (III.V) |
| **E-L2** folded: the XXVII relocation is **occurrence-complete across the whole of `charter.html:423`**, covering the trailing `60–90%` / `135%` sentence beyond the originally quoted span | §4.5, §10 (XXVII) |
| **E-L3** folded: §6 Case A's count corrected from "19 (1 E1, 18 E2)" to **30 (7 E1, 23 E2)**, matching the graph and the register's own §2 rows; the erratum records the original figure and notes the keep only strengthens | §6 Case A |
| §13.3's open pick **closed**: the III.V 24-month lookbacks receive at the **Central Banking Authority** (architect recommendation adopted at ratification — the whole III.IV/III.V settlement family in one instrument) | §4.3, §13.3 |
| §11's three flags marked **settled** at ratification: LP-076, the title, Filed 2296 / Concluded 2299, the first-success framing, and the licence to author the enacted-entry idiom at minimal delta | §11 |

Committed `935049d`, pushed. check-canon 133/0.

## L2 Phases 2–3 — Promotion: LP-076 enacted, receiving instruments loaded (§14.2, §14.3)

**Ordering correction, forced by a guard and recorded as such.** §14 lists laws.html (step 2) before
law-polling.html (step 3). Code integrity guard (a4) requires every enacted register entry to have a
Code entry, and the register-entry resolution guard requires each Code entry's `data-source` to
resolve to a register anchor — so the two surfaces are mutually pinned and **cannot** be split across
commits without an intermediate red. They landed in one commit (`e2f748b`). This is §14's own
"guard retargets land in the same commit as the content change they pin" rule applied to content.

### The event record (law-polling.html)

| Item | Value |
|---|---|
| Entry | `id="lp-076"`, appended as the last entry of `#charter-amendments`, before the Federal Laws banner |
| Title | The Enabling Consolidation Amendment |
| Dates | Filed **2296**, Vote Concluded **2299 (3 years)** — as ratified |
| Badge | `status-badge status-enacted`, label `Enacted` — **the site's existing enacted styling, reused**, not a new class. §11 flagged that the Charter-amendment section has no success idiom; it does not, but the *page* does (34 bare `Enacted` badges at federal and regulatory tier), so the delta is a class swap, not an invention |
| Meta grid | The same six fields in the same fixed order; `Scope` and `Threshold` strings **verbatim** as all seven failed entries carry them |
| Vote table | Same four gates in the same fixed order. Three `class="pass"` cells as the failed entries already use, and the fourth — which is `class="fail"` in every existing entry — becomes `class="pass"`. That is the whole structural delta of a success |
| Main Layer | **81%** — the floor of the 80–90% band, with the Article XI gravity rationale stated in the closing commentary, per the ratified §11 proposal |
| Drafter | *Meritboard Governance-Architecture Panel* — reused verbatim from LP-001 rather than inventing a body (guarding against invented-vocabulary-that-sounds-canonical) |
| Closing commentary | `First Charter-tier success; the amendment ladder stands 1-for-8.` — minimal delta from LP-066's `Seventh consecutive Charter-tier failure; the amendment ladder stands 0-for-7.` |
| Stat cards | **89 = 7/60/22 → 90 = 8/60/22**, advertised and derived atomically. The four cards are derived by `statCard()` from the section counts, so the guard proves the atomicity rather than trusting it. Filter count line and both TOCs regenerated (`build-law-toc.mjs`) |

**No companion Ratification Record entry was authored.** The pending-ratification pipeline carries
*pre-vote* material (the gauntlet ballot); LP-076 concluded, so the register entry is its complete
record. §14.3's conditional ("if the pipeline idiom requires one") is answered *no*, and recorded here
rather than resolved silently.

### The receiving instruments (laws.html)

| Receiving entry | Receives | Note |
|---|---|---|
| **`code-lp-076` The Overtime Premium Protocol** (NEW, federal, `data-source="lp-076"`) | III.II's per-hour cascade | **Not** `data-instrument="founding"` — founding count stays **60**. Slotted at the end of `subject-economy`, preserving that subject's ascending LP order. Also satisfies guard (a4)'s 1:1 requirement for LP-076 |
| **`code-fc-central-banking-authority`** (founding) | III.IV's forfeiture band; III.V's five retention bands; **both** 24-month lookbacks; E-L1's band endpoints | The whole III.IV/III.V settlement family in one instrument, per §13.3 as closed at ratification |
| **`code-lp-069`** | -2/-3 triggers, the 5% rate, the 24-month attribution window, and III.VIII's restatement of the same rule (N-2) | |
| **`code-lp-070`** | +1/Main and -1 triggers and rates, the 90-day rolling average, both equilibrium illustrations | |
| **`code-lp-064`** | The 50%-per-child escalation rate and its worked illustration, including E-L2's trailing sentence | |

**Amendment idiom for a founding entry — flagged.** §14.2 anticipated that no house pattern exists.
It does not: the Code's only provenance idiom is supersession (`Register status: Enacted · Superseded
by LP-005.3`), which is the wrong relation. A minimal **`Amended`** meta-item was authored on the
pattern of the existing `Enacted` / `Effective` meta-items, naming the year, the source articles,
LP-076 by link, and the words *at identical values*. The Central Banking Authority's note also states
that the founding instrument is otherwise untouched, so the entry cannot be read as re-founded.

## L2 Phase 4 — The Charter amendment (§14.4)

Committed `15c0810`. The five ratified §10 replacement texts, plus E-L1 and E-L2.

**Removal verified mechanically, not by reading.** Zero occurrences in `charter.html` of every
demoted magnitude, checked rule-scoped: the cascade figures, `90-99%`, all five band rows, the `$1M`
/ `$1B` endpoints, both `24 months`, `$100 billion`, `$50 billion`, `$25 billion`, `$10 billion`,
`90-day`, `50% per child`, `135%`, `60–90%`, and every `LP-` reference. **30 `<h2 id=>` headings
unchanged**; Tier-1 index equality guards (d1/d2) green; no heading text or anchor touched.

**Keeps verified present, verbatim:** every N-1 negative magnitude; the derivation sentence (D-1);
`Upward conversion is prohibited without exception`; the involuntary-descent `One hundred percent …
without exception`; `on a progressive scale`; `pre-positioning does not shield assets from
consequence`; `no floor, no exemptions, and no means testing`; the corrective-pulse sentence; the
2.5 target; `This principle is absolute and non-negotiable`; `The civilization does not prevent
births — it prices them`; and all three purchasing-power gradient hedges with `The gradient is not a
fixed exchange rate` (the §6 case B keep — the :202 edit under E-L1 is surgical to the two band
endpoints and leaves the gradients alone).

**Three drafting judgments beyond the ratified text, flagged:**

1. **Downstream pointers reworded so they still resolve.** III.V's `liquidated per the above
   schedule` and two `within 24 months` clauses would have dangled once the schedule left. They now
   read `per the retention schedule` and `within the pre-positioning lookback window`. No rule
   changes; the sentences keep pointer form exactly as E-L1 directs for :202.
2. **Two illustrations kept at Charter tier.** `A citizen holding $10,000 is garnished in the same
   cycle as a citizen holding $10 million` illustrates *uniform application with no floor, no
   exemptions* — an explicit §4.4 keep — and states no trigger, rate or window; the `$5,000/month
   UBI baseline` in III.VII's -1 paragraph is III.I's amount, a keep. Both stay. The two *equilibrium*
   illustrations, which do encode the rate, were relocated.
3. **The Category-A cure is a citation swap, not a deletion.** `(LP-069)` at the savings-base
   paragraph became *the specification is federal law, consolidated in VMSS Laws* — the reference
   survives at the correct altitude instead of vanishing.

## L2 Phase 5 — Guards (§14.5)

**check-canon 133 → 136. Delta explained per guard — all three are new; none was weakened, retargeted
away, or deleted.**

| # | Guard | Why +1 |
|---|---|---|
| +1 | `consolidation purity: the Charter states no magnitude LP-076 relocated (rule-scoped, occurrence-counting)` | The purity-guard expansion §8 called for. Runs off a 16-row `RELOCATED` table keyed by **rule**, each row listing **every phrasing** the Charter used, and **counts** occurrences rather than testing existence — the N-2 discipline, and the reason E-L1's second occurrence would now be caught |
| +1 | `consolidation fidelity: every relocated magnitude is stated by its receiving instrument` | The vintage-guard discipline made permanent. Runs off the **same table**, scoped to the receiving Code entry by id, so a magnitude dropped en route *or* landing in the wrong instrument goes red |
| +1 | `charter tier: the negative magnitudes stand (N-1 — a floor of none is still a floor)` | Finding N-1: a floor, quorum, ceiling or threshold of **none** carries no digits, so no magnitude sweep can see it being dropped. Four stances pinned verbatim |

**Guards retargeted, never deleted:**

- **`CHARTER_LP_WHITELIST` emptied by removal.** The guard's own staleness check rejects a blanked
  entry (`['LP-069', '']` still fails), so the entry had to be *retired*. Post-L2 the whitelist is
  empty, as architecture §8 predicted. The architecture's standing Phase-3 TODO is discharged.
- **The R15 LP-076 pin (a2) retargeted — flagged as the run's largest judgment beyond spec.** It
  asserted `register carries no LP-076`, because LP-076 was a drafting designation R15 renumbered to
  LP-074. Ratification assigns LP-076 to the amendment, so the guard as written blocks the ratified
  instruction. It was **not** deleted or loosened to nothing: R15's own holding is that in-world
  numbering takes the next true number, and this number was never consumed in world (its only
  surviving mention is the renumbering record itself). The guard now asserts the slot **is the
  amendment and carries no RATIFY-TAX-50 subject matter** — the property (a2) was written to protect.
  Both halves are required, and the comment says so. *The architect should re-derive this
  independently; it is the one place this run changed what a guard asserts.*
- **The `:533` comment claim re-verified, not inherited**, as §14.5 requires. It asserted III.II's PJS
  figures "do not match the cascade regex — verified, not assumed". Re-checked: `exactCascade`
  requires 50 / 25 / 12.5 / 6.25 with percent semantics; the PJS figures are dollar amounts in a
  different ratio. The claim was true, is now spent (the figures are no longer Charter text), and the
  comment records that rather than being deleted.

**Mutation testing — 8 probes, every one red for the reason under test** (the P4 lesson). Probe
script run from the scratchpad; each probe mutates one file, runs check-canon, and restores the file
byte-for-byte. Final restore verified at **136 passed / 0 failed**.

| Probe | Mutation | Guard that bit |
|---|---|---|
| P1 | cascade figures creep back into III.II | consolidation purity — *3 occurrences still at Charter tier* |
| P1b | E-L1's band endpoints creep back into III.IV:202 | consolidation purity — *1 occurrence* |
| P1c | E-L2's trailing `60–90% … 135%` creeps back into XXVII | consolidation purity — *1 occurrence* |
| P2 | LP-064 loses the 50%-per-child rate en route | consolidation fidelity |
| P2b | the 90-day window is reworded inside LP-070 | consolidation fidelity |
| P3 | `There is no minimum wage in VMSS` quietly dropped | negative magnitudes stand |
| P4 | the LP-076 slot resurrected as a RATIFY-TAX-50 designation | the retargeted R15 pin |
| P5 | an LP reference returns to the Charter page | charter purity whitelist |

**LP-071 collision safety (§4.2's highest-risk item) verified.** LP-071's founding net-worth cap
survives untouched at `rate-history.html:160` and `:217`, `law-polling.html:2364`/`:2368`/`:2384`, and
`pending-ratify-tax-50-supplemental.html:139`. No new guard scans those surfaces, and III.IV's band is
matched only in its forfeiture context (`90-99% forfeiture that prevents arbitrage`), never as bare
digits.

## L2 Phase 8 — Version v23.0.0 (§14.8)

`README.md:5` and `footer.html:28` in lockstep (the §6 stamp-equality guard fails on either alone).
`footer.html` is injected by `script.js`, so the stamp is single-sourced across all pages — nothing
else in the tree carries a site version.

**One §14.8 premise corrected.** The handoff's "version log" does not exist as a surface: check-canon's
`versions=26` derives from `simulations.html` doctrine-snapshot `data-version` attributes (the vintage
each simulation was authored against, latest `v20.5`) and is unrelated to the site version. A v23.0.0
bump does not move it, and it did not. **No Process Ruling was authored**: v22.8.0 needed R23 because
declaratory codification required a doctrine ruling; an in-world Article XI amendment carries its own
record in the register and needs none. Authoring one would be doctrine beyond the ratified licence.

**Must-complete gate met and pushed at `800f796`** — steps 1–5 and 8, check-canon **136 / 0**.

## L2 Phase 6 — E3 tier attribution (§14.6)

Scope as specified: E3 edges targeting the **five candidate provisions only**, and only where the
surface **attributes a demoted magnitude to the Charter**. Pure restatements carrying no tier claim
are untouched — the graph's E3 rows for III.I, III.III, XXIII, II and XXVIII.I are out of scope by
construction, and the layer pages' rate blocks make no tier claim.

The pattern is `systems.html:263`'s, as the register's §7 directs.

| Surface | Was | Now |
|---|---|---|
| `faq.html:227` | *"through the downward transfer retention schedule (Article III.IV–III.V)"* | *"…schedule — a federal-tier schedule under LP-076, with Articles III.IV–III.V retaining the principle and reaching no band —"* |
| `whitepaper.html:905` | *"Full schedule in Article III.V of the Charter."* | *"Full schedule at federal tier under LP-076, not Charter text — Article III.V retains the principle and reaches no band."* |
| `systems.html:343` | block-level attribution of the escalation to Article XXVII | *"; the escalation rate below is a federal-tier rate under LP-064, not Charter text."* |
| `whitepaper.html:1327` | *"Article XXVII's replenishment tax — a compounding 50% tax escalation per child beyond the second that…"* | *"…per child beyond the second, a federal-tier rate under LP-064 rather than Charter text, that…"* |
| `world.html:1224` | same sentence | same fix |

**The magnitudes on these surfaces were not removed.** E3 restatements follow the law to whatever
tier it lives at; only the tier claim was wrong, and only the tier claim changed.

**Recorded, not edited (with reasons):**
- `pending-ratify-tax-50-ballot.html:143` attributes an escalated rate to Article XXVII. The
  pending-ratification surfaces carry **frozen pre-vote ballot text**; editing one would rewrite a
  historical artifact rather than align a restatement. Flagged for Jason.
- `documents/VERBATIM-SOURCE-TEMPLATE.md:376` (*"Downward retention schedule (90-99% to treasury) —
  anchored in Article III.IV/V"*) and the PDF print sources `documents/resources-source.html:532`,
  `:540` and `documents/academy-source.html:479`, `:806`. These are generation inputs at explainer
  rank, not published surfaces. Recorded.
- `faq.html:829`'s *"Article XXVII establishes a replenishment tax with a target of 2.5 children per
  family"* is **correct as it stands** — the 2.5 target is a keep and remains Charter content.
- The register §7 **alignment gaps** (layer pages carrying no tax content; `layers.html` carrying no
  Charter citation; `layer--3.html` never stating III.I's amount) are **out of scope per §14.6** —
  recorded, not authored.

## L2 Phase 7 — Canon-defect errata (§14.7)

| # | Surface | Fix |
|---|---|---|
| F-1 | `simulations.html:456` | *"Article XXIII.II"* → **Article XXV.II**. XXIII is Zero Leakage Aspiration and has no sub-articles; the nuclear-weapons prohibition is XXV.II |
| F-2 | `why-vmss.html:532` | *"The Article XIV provisions"* → **Article III.V**. XIV is Proportional Response; asset conversion on descent is III.V |
| F-3 | `whitepaper.html:1692` | *"the Article XI gauntlet described in Section 8"* → **Section 9**. §8 is security classification |
| F-4 | `laws.html` LP-002 Charter anchor | *"Article III.I"* → **Article III.II**. PJS and the overtime premium live in III.II |
| F-4b | `law-polling.html` LP-002 Canon Anchor | Same defect, same entry, on the register surface: *"Articles XXV.VI, III.I"* → **III.II**. Found while fixing F-4; the register listed only the laws.html occurrence. Fixed for consistency and flagged here |
| F-5 | `world.html:1156`, `:1165` | **NOT fixed — no provable citation**, as §14.7 requires. "Substrate" appears in charter.html only at Article IV, and the metric-governance half of :1165 genuinely does match XXII, so the correct target is undetermined. Recorded for Jason |
| F-6 | `charter.html:262` | Out of L2 scope by §13 — the External Force Doctrine's dangling Charter reference stays open as a doctrine question for Jason |
| F-7 | inventory B8 fields | Superseded by the graph; dies here as recommended |

## L2 Phase V — Adversarial verification, and what it broke (§14.9)

Six independent verifiers, each given one claim of the amendment's and told to **refute** it, each
required to work from `git diff 913ab52..HEAD` and to default to "violation found" when uncertain.
**Four of the six refuted their claim.** Every finding below was reproduced before being acted on.
This section is the honest record: the run's own first draft was wrong in two load-bearing ways.

### The blocking finding — E-L4, and the guard that should have caught it did not

Three verifiers converged independently on the same line. `charter.html`'s III.VII **opening
paragraph** — never enumerated by the register's §10 relocation set, and therefore never edited —
still read:

> *"A citizen holding $100,000 at the opening of a monthly cycle **owes 10% on that amount** …"*

That is the upper-layer garnishing rate, sitting thirteen lines above the new enabling grant which
declares the Charter *"reaches no threshold or rate."* The Charter contradicted itself on the same
page, and the amendment's core claim was false as shipped.

**This is the third instance of the exact class N-2, E-L1 and E-L2 were each written to catch** — a
magnitude restated at a second location the candidate enumeration missed. The register's §4.4 lists
`:230, :232, :235, :239, :242` and omits the intro paragraph. **Recorded as erratum E-L4**, on the
same footing as the architect's E-L1: an occurrence the L1 enumeration missed, cured in drafting.

**Why the guard was blind, and the deeper defect it exposed.** The purity row's phrasing list carried
`garnishing rate is 10% of each citizen`; the intro's phrasing is `owes 10% on that amount`. The
guard was **phrasing-bound and therefore only as complete as the enumeration it was built from**. A
guard generated from the register cannot catch what the register missed. Recorded for the architect
as a structural limit of this guard class, not merely a missed row.

*Fix:* the illustration relocated to LP-070 byte-identically, the Charter sentence rewritten to state
the pulse-at-start principle without the rate, and the phrasing added to the guard table as E-L4.

### The guard defect — `.test()` on an alternation, and how it was defeated

The fidelity guard stored each rule as one regex alternation and called `.test()`, which is satisfied
by **any one** alternative. The verifier reproduced the consequence: **five relocated magnitudes
simultaneously corrupted inside their receiving instruments — `99% to treasury, 1% retained` → 50/50,
`10%` → `99%`, `135%` → `999%`, `$10 billion` → `$1`, `24 months` → `240 months` — with check-canon
green at 136/0.** The guard did not assert the property its own label claimed.

*Fix:* phrasings are now stored as a **list**, and **every phrasing is asserted individually on both
sides**. Design note (4) records why. 16 rules / 36 phrasings.

### Two further guard holes, both reproduced, both closed

- **Charter tier is two surfaces.** The purity guard scanned `charter.html` only, but `laws.html`'s
  Tier 1 mirrors the Charter at `data-tier="charter"`. The verifier injected the relocated cascade
  into the mirror: **green**. Now both surfaces are scanned (design note (5)).
- **The negative-magnitude guard was existence-testing**, violating the block's own stated design
  constraint (2). Now occurrence-**counting** against a pinned count per stance.

### Canon contradictions the amendment left standing

- **`laws.html:584` still read *"All seven Charter amendments ever filed have failed"*** — and linked
  to a section that now contains an enacted eighth. Fixed.
- **LP-076's entry carried four overstatements**, each corrected against the register's own record:
  *"seven amendments asked the ratifying populations"* (only five reached a population gate — LP-046
  and LP-050 died at institutional gates); *"the drafters argued the gravity down"* (invented a
  drafter-side advocacy step; LP-057 establishes that the Presidency sets the gravity point);
  *"the register carries the full relocation table"* (dangling — the relocation table is a
  Process-tier artifact, an R13 leak); and *"the floor of the 80–90% band"* paired with an
  unstated gravity point.
- **Missing LP-041 disclosure.** Every post-2140 Charter entry carries one; LP-076 is filed 2296 with
  a Meritboard body as drafter — the exact case LP-041 targets — and disclosed nothing. Added, and
  the Threshold field now states `Main 80% (gravity-set)` per the LP-057 house rule, so the `met`
  claim is checkable.

### Charter prose defects introduced by the drafting, now fixed

- III.VII's -1 paragraph carried a **dangling comparative** (*"The lower rate and threshold"* — the
  comparator left with the upper-layer figures) and **two incompatible definitions of "equilibrium
  point"** in adjacent paragraphs. Both rewritten.
- III.VII's -2/-3 paragraph had fused two sentences into one **mis-scoped predicate** (a
  district-aggregate threshold is not a portion of an individual's balance). Split.
- III.V's *"the retention schedule **above**"* no longer had anything above it. Cured.

### Tier-attribution completeness gaps

Phase VI's pass missed five surfaces that attribute a relocated magnitude to Charter tier, three of
them unrecorded. Now cured: `faq.html:634` and `simulations.html:576` (same construction as lines
cured two lines away in the same commit), and — the worst — `documents/academy-source.html:1252`,
which listed the SCM thresholds and the retention schedule as **"Charter-stable variables … require
Article XI amendment gauntlet"**, the exact inverse of what LP-076 makes true. Also
`documents/resources-source.html:2655`. These three feed distributed PDFs, not drafts.

### Mutation testing, round 2

**11 probes, all biting for the reason under test** — the original 8 plus every attack Phase V used
to defeat the first draft (magnitude corrupted in place ×3, the Tier-1 mirror injection, and E-L4).
One probe (`V-E`) initially **missed** because the pinned phrasing carried a leading `A ` and these
comparisons are case-exact; the pin was tightened and the probe now bites. Recorded because a probe
that misses is the only evidence the probe set is doing work.

### What survived refutation

- **Byte-identity: 26/26 relocated fragments match character-for-character.** `$15.63` landed as
  `$15.63`, not `$15.625`. No magnitude changed value anywhere in the diff.
- **Every register-listed keep and hedge present verbatim** — 0 violations across §4.1–§4.5, §5,
  §6 case B and N-1, including all three `approximately` gradient hedges.
- **Structure**: 30 h2s, id inventory diff-identical, all heading text diff-identical, Tier-1 index
  byte-equal, all 31 anchors resolve, every external reference into `charter.html` resolves.
- **Founding count still exactly 60**; stat cards, filter line and both TOCs re-derived independently.
- **The whitelist emptying is a strict strengthening** — any `LP-` on the Charter page now fails.
- **No dead regexes**: all 36 phrasings matched the pre-amendment `charter.html`, so every pin was
  capable of biting.

### Open, flagged for the architect — not fixed by this run

1. **The R15 retarget narrowed scope.** The old pin scanned all of `law-polling.html` for `lp-076`;
   the new one asserts within the lp-076 entry. `LP-076 RATIFY-TAX-50` co-occurring **elsewhere** on
   the page would now pass. Judged acceptable (the entry is the only place the designation could
   masquerade as a register record) but it is a genuine narrowing and should be reviewed.
2. **One LP number, two titles, two tiers.** LP-076 is a Charter amendment in `law-polling.html` and
   titles a federal Code entry (*The Overtime Premium Protocol*) in `laws.html`. No other LP does
   this. It is **forced** — code-integrity guard (a4) requires a Code entry for every enacted
   register entry, and LP-076's only federal output is the Protocol — but it is a new registry
   convention and the architect should bless or redirect it. The Code entry's
   `Federal · Article XXV.VI` badge names the ladder that recalibrates the Protocol, not its
   enacting route; the summary states the distinction explicitly.
3. **XXVII's retained ordinal profile still constrains a relocated rate.** The Charter keeps *"the
   fifth is unsurvivable"* and *"which the schedule reaches at the fifth child"* — arithmetic
   consequences of the 50%/child rate against a 40% baseline. A federal recalibration moving the
   crossover off child five would falsify retained Charter text. This is arguably correct
   (a bound on delegated power, the §6 case B pattern) but it is undeclared.
4. **Grant-formula asymmetry.** III.II, III.III, III.V and III.VII grants say *"enacted and
   recalibrated through the Article XXV.VI ladder"*; III.IV's forfeiture, the savings-base cure and
   XXVII's rate say only *"federal law … consolidated in VMSS Laws"*. The §10 ratified texts are
   written that way and were followed verbatim, so this was **not** corrected — three relocated
   schedules have no Charter-stated recalibration authority. Flagged as a register-text question.
5. **`pending-ratify-tax-50-ballot.html:143`** attributes an escalated rate to Article XXVII. Frozen
   pre-vote text; not edited.
6. **F-5** remains unfixed for want of a provable citation; **F-6** remains Jason's doctrine question.

---

# Run L3a — Charter codification: the mapping proposal (§18.1)

Executed 2026-07-21 on `feat/vmss-laws-v23.0.0`, entered at origin tip `610f5da` (fast-forward from
`edaf83a`; no rewrite, no force-push, no tag operation). Docs-only: the sole deliverable is
`docs-review/vmss-laws-codification-proposal.md`. **check-canon 136 passed / 0 failed at entry and
at exit.** No root `.html`, no `tools/` file, no guard touched — the Sol peer-review packet stays
valid against the branch's frozen `.html` state.

## Method

Mechanical work was done in-session by script; judgment work was fanned out. A workflow ran 22
agents in three phases: **Survey** (four independent misfit lenses — post-amendment title fit,
numbering integrity, external consistency, and a skeptic briefed to argue "change nothing" — plus a
guard-retarget census and a cleanup sweep), **Refute** (every deduplicated proposal sent to three
adversarial refuters on distinct lenses: textual, cost, and scope), and **Critic** (a completeness
critic told to assume all of the above missed something). 1.68M subagent tokens, 376 tool calls.

The citation partition was **not** delegated. A read-only Node script enumerated all 43 root `.html`
files plus `documents/*.html` across five occurrence kinds (prose `Article N`, `Art. N`,
`charter.html#` hrefs, bare `#` fragments, bare sub-article tokens), yielding **1,562 occurrences**
classed LIVE 793 / FROZEN 362 / SOURCE 407. Mechanical derivation over agent testimony is the
standing rule of this project and it applied here.

## Result

**Zero mapping changes across all 48 units.** Five proposals were generated and every one died:

| Proposal | Outcome |
|---|---|
| XXII.II → XXII.I (renumber) | refuted 3/3 |
| Designate XXII lead text as XXII.I | survived 2/3, then **refuted by the critic** |
| Article XXVII retitle | refuted 3/3 |
| Two lone-subdivision variants | refuted 3/3 each |

Lens 1 (post-amendment title fit) returned **zero proposals** unprompted: no Charter title contains
the words *rate*, *band*, *schedule*, *threshold*, *window*, or *percent*, so LP-076's removals
orphaned nothing. That is the null result's structural cause and it is stated in the proposal's §0.

## What the adversarial pass and the critic changed

- **The one surviving proposal was wrong.** Designating Article XXII's lead text `XXII.I` would
  strand `charter.html:336` — a paragraph about the Meritboard's breadth, not the review cycle —
  inside `XXII.II`. Article XXII is the **only** article with article-level prose after its final
  sub-article (III ends :240, XXV :410, XXVIII :458). Text moving between units is out of scope.
  Two of three refuters would have let it through; the critic caught it. **I re-verified it at
  source before adopting it** — the project's rule that critic claims are not inherited.
- **The register's §8b guard line numbers had all moved** (+168 lines in `check-canon.mjs`) and
  `build-law-toc.mjs:120` was never a designation pin at all. Corrected in the proposal's §4.1.

## Findings that outlive this run

- **G1 — `charter.html`'s own table of contents (`:104`–`:141`) restates all 30 titles and numerals
  a second time inside the same file, hand-authored, with no generator and no guard.** I verified
  both halves myself: `build-law-toc.mjs` never opens `charter.html`, no `check-canon` reference
  reads `toc-txt`, and all 30 values are currently exact suffix copies of their h2 titles. The
  invariant holds and nothing enforces it. Recommended as a standalone guard addition — out of
  L3a's docs-only scope, so reported, not performed.
- **G2/G3** — 17 of 18 sub-articles carry no `id` and appear in no guard; visible designation prose
  is unpinned even where its href is.
- **Fresh sweep found eight items**, headed by two high-severity tier misattributions L2's step 6
  did not reach: `faq.html:829` attributes the whole XXVII escalation schedule to the Charter, and
  `systems.html:281` points at Article III.V for a schedule that is no longer there.
- **N-6 is a regression in this branch's own errata commit.** F-2's cure repointed
  `why-vmss.html:532` from *"Article XIV"* onto *"Article III.V"* — a schedule LP-076 had just
  hollowed, and the wrong sub-article for a conversion ratio besides (that is III.IV's gradient).
  Recorded with both readings, including the one that partly exonerates it.

## Judgments beyond spec, flagged

1. **The null mapping** — §18.1 anticipated a mapping with content.
2. **§5.1 recommends not filing LP-077 at all.** If nothing renames, the cleanup is all below
   Charter tier, and under LP-042 reference hygiene is consolidation, not amendment — so it costs no
   in-world event. This is the run's most consequential recommendation and it is a judgment.
3. **The frozen/live classification** of `rate-history.html`, `deregistered-statutes.html` and
   `path-2-certification-2294.html` is this run's call (all three contribute 0 occurrences, so no
   number moves).
4. **`documents/*.html` classed SOURCE, not LIVE** — 407 occurrences, 26% of the census, held as a
   third class. If read as live, LIVE rises 793 → 1,200.
5. **One sweep "finding" was already dispositioned** and is recorded as such rather than re-raised:
   the LP-076 one-number-two-titles collision was **blessed** by the architect's Part II review,
   disposition 2. What is genuinely new is its discoverable cost (proposal N-3), not the convention.

## Gate

Proposal committed and pushed. **STOP.** Jason personally ratifies the mapping, the instrument
design, and the cleanup dispositions — F-6 explicitly carries no recommendation from this run —
before any L3b enactment exists. No PR, no merge, never main.
