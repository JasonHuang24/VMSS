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
