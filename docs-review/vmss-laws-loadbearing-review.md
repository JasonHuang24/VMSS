# VMSS Charter Load-Bearing Audit — Architect Review of Run L1

Architect review, 2026-07-21, of `feat/charter-loadbearing-audit` @ `aae169f` (phases c8bb365 ·
cc88e07 · 5f873dc · aae169f). Deliverables under review: `documents/charter-dependency-graph.json`
and `docs-review/vmss-laws-loadbearing-register.md`, per the handoff §12 checklist.

## Verdict

**ACCEPTED as the Run L1 data deliverable, with three register errata (E-L1–E-L3) that bind L2's
drafting.** No erratum reverses a classification, disturbs any of the five demotion candidates, or
weakens either hard-case keep. The register is now Jason's ratification surface; Run L2 does not
exist until he ratifies it personally (handoff §7).

## What the architect verified independently (not inherited)

- **Gates.** check-canon **133 passed / 0 failed** re-run at `aae169f`. Diff `db2e9bc..aae169f`
  touches `docs-review/` and `documents/` only (+18,460 lines, 3 files). History discipline held:
  four plain commits, fast-forward from the architect's spec push; no rewrite, no force-push, no
  tag operation.
- **Graph integrity, mechanically.** 421 nodes (0 duplicate ids), 1221 edges — E1 335 · E2 310 ·
  E3 400 · E4 131 · E5 45, matching the register and the graph's own `counts` block. Every edge
  carries `from`/`fromLoc:line`/`to`/`type`/`quote`; zero edges cite a worktree path; the two
  unresolved edge targets are declared in `unresolvedEdgeTargets` (one of them, `XXIII.II`, *is*
  canon defect F-1 — correctly kept unresolved rather than silently attached).
- **The §2 in-degree table recomputed from raw edges: exact match on all 12 audited rows**,
  including XXV.VI's E1=111 and III.II's 0/2 candidate signature.
- **Load-bearing quotes verified verbatim at source**: whitepaper §10.6.1 and the routing test
  (whitepaper.html:802–806, including the treason-ceiling analogy at :804); the XI lock
  (charter.html:292); "load-bearing rather than cemented" (:289); the XXV.VI ladder restatement
  inside XI (:294); all five candidate texts at their cited lines; D-1's derivation sentence
  (:190); D-3's bound sentence (:202); D-2's explicitly hypothetical 40% baseline (:423).
- **Case A's decisive datum is real**: LP-011 at law-polling.html:2519, "Supreme Court
  Classification — Structural (unanimous)" at :2537, rerouted to the XI gauntlet, not pursued.
  The keep verdict for XXV.I–III stands on it exactly as argued.
- **Critic claims re-verified, not inherited.** The two headline refutation exemplars check out
  against source — law-polling.html:699's Outcome row records the XI route was *declined*, and
  pending-ratification.html:129 holds III.III's rates to be "restatement … not Charter-tier
  engraving" — both texts deny the dependency originally typed. All 41 edge-audit rows are present
  in `criticFindings` with old and corrected types; exactly 2 touch III.V (matching "loses two of
  nine"); the post-correction arithmetic for XI (15/29) and XXV.VI (107) reconciles. N-1's
  negative magnitudes exist verbatim (:190, :286 twice); N-2's restatement examples verify (:242,
  :294, :266 vs :175).
- **E4 anchor census reproduced independently**: 55 external references (laws.html 44,
  simulations.html 10, faq.html 1); 31 distinct provision anchors, all referenced. charter.html
  carries 34 `id=` attributes total — the 3 extras are page chrome (`main-content`,
  `navbar-placeholder`, `footer-placeholder`), so the operative rule (no provision anchor may be
  renamed in L2) is confirmed as stated.
- **Edge-typing audit**: 31 E1/E2 edges spot-audited across all 18 contributing surfaces. The
  typing is defensible on the large majority; every questionable row falls inside the critic's
  documented over-conferring classes, lands on a keep, and affects no candidate (see O-L1).
- **§12 inherited-residual check re-run on a sample**: cluster-architecture spine names resolve
  into the 61 via the inventory's documented rename/merge table (verified for the Failsafe
  Configuration Act → Implant Instrumentation Act fold).
- **III.II's two conferring edges read personally**: charter.html:234 and :423 both depend on PJS
  *existing as an untaxed inflow stream* and survive demotion of every rate figure — the §4.1
  signature holds.
- **Proposal hygiene**: the §10 replacement texts contain no magnitudes; the register's status
  header, the worklog, and the diff all confirm nothing was enacted. LP-076 is unused on every
  surface; LP-075 is the highest existing number, as §11 claims.

## Errata — required corrections to the register, binding on L2's drafting

- **E-L1 (the one that matters).** `charter.html:202` — inside III.IV's text — restates III.V's
  band endpoints in retained-percentage form: *"The same progressive scale applies — 10% retained
  on the first $1M, scaling down to 1% above $1B."* This occurrence appears in **neither** §10's
  III.V relocation list (:209–215, :206, :216) **nor** finding N-2's restatement inventory, and
  the graph carries only the pointer E2 from :202 (*"using the downward transfer retention
  schedule (Article III.V)"*) — the magnitude restatement has no edge. As drafted, L2 would demote
  the III.V bands while the Charter retains two of their values one article up. This is exactly
  the occurrence-counting failure class N-2 itself warns about. **Fix: add charter.html:202 to the
  III.V relocation set; the sentence keeps its pointer form ("The same progressive scale applies —
  per the retention schedule — converted at destination-layer purchasing power" or equivalent
  L2-drafted text) and loses the band values.**
- **E-L2 (same class, same line as its candidate).** `charter.html:423`'s trailing sentence —
  *"no rational actor accumulates sufficient savings under 60–90% escalation to survive long at
  135%"* — restates the illustration's magnitudes *after* §4.5's quoted candidate span ends, as
  does the earlier *"already-punitive rates of children three and four"* passage's context. L2's
  XXVII edit must cover the full passage, not the quoted span alone. Fix: note in §4.5 that the
  relocation is occurrence-complete across the whole of :423.
- **E-L3 (internal inconsistency, one line).** §6 Case A states "19 E1/E2 in-edges (1 E1, 18 E2)"
  for XXV.I–III; the graph — and the register's own §2 rows — sum to **7 E1 + 23 E2 = 30**. The
  real counts are *higher*, so the keep only strengthens; the sentence needs correcting or the
  subset it counts needs defining.

These are register-text corrections. No re-run is required; they may be folded into the register by
the L2 session as its first commit, with this review as the citation.

## O-L1 — Observation on graph consumption (no action required for ratification)

Two asymmetries surfaced by the architect's edge audit, both inside the critic's documented
over-conferring bias, both affecting only keeps:

1. **Anchor-field typing differs by surface.** laws.html "Charter anchor" meta fields were typed
   E1 (e.g. LP-037 at laws.html:1073, "Articles II, XX"), while law-polling "Canon Anchor" fields
   were typed E4 (the register's §13.4 weaker-choice call). Same semantic field, two types.
2. **Narrative surfaces contribute conferring edges.** simulations.html and
   documents/resources-source.html narrations ("the statute cleared the Article XXV.VI ladder…")
   carry E1 edges, though §3's legend restricts conferring status to in-force rules.

Consequence: any future mechanical consumer of the graph should apply the `criticFindings`
corrections and discount narrative-source E1/E2 before computing conferring in-degree. Neither
asymmetry moves a §3 or §4 result — verified against the candidate set.

## Ratifications of the run's flagged judgments (delegated orchestration)

- **D-1 (keep the III.II derivation sentence): ENDORSED** — the refinement the run most wanted
  push-back on survives it. The kept chain (III.I amounts → mirror at :189 → ÷4 at :190 → the
  20-hour threshold at :189) makes every demoted figure arithmetically derivable from retained
  Charter text, which converts the amendment's core claim from asserted to provable. One drafting
  note for L2: the -3 rate is printed `$15.63` where the derivation yields $15.625 — the receiving
  instrument must carry the figure byte-identically as printed, and the fidelity guard must
  compare strings, not arithmetic.
- **D-2 (XXVII: one operative magnitude): ENDORSED** — :423's "If a family's baseline…" is
  explicitly hypothetical; 60/90/135 are consequences. Subject to E-L2's occurrence rule.
- **D-3 (keep III.IV's gradient ranges): ENDORSED** — a range bounding what the central bank may
  derive is a constraint on an instrument beneath the Charter, which is §10.6.1's own definition
  of Charter content. The strongest of the five divergences.
- **D-4, D-5: ENDORSED** as argued; both verified at source.
- **§13.3 (III.V lookback receiving instrument): recommendation for Jason** — the Central Banking
  Authority, keeping the whole III.IV/III.V settlement family in one instrument; the
  anti-avoidance kinship with LP-069/070 is real but attribution's home is the savings base, not
  asset liquidation. Jason picks; either is defensible.
- **§13.4 (Canon Anchor typed E4): ENDORSED** — the weaker choice was the instructed tie-break;
  O-L1 records the cross-surface asymmetry it produced.
- **§13.5 (no range fan-out), §13.6 (deliberate truncation), §13.7 (docs-review exclusion):
  ENDORSED.**

## What Jason personally ratifies (nothing below is delegated)

1. **The five clause-level demotions** (III.II rates · III.IV forfeiture band · III.V bands +
   lookbacks · III.VII/VIII triggers, rates, windows · XXVII escalation rate), with their target
   tiers and receiving instruments — including the two **new schedule instruments** the amendment
   must mint (the Overtime Premium Protocol; the III.IV/III.V settlement schedule home), since the
   latent sweep's home rule correctly excluded these schedules and no receiving instrument exists.
   This is the L2 authoring cost the register prices in §4's structural finding.
2. **The two hard-case keeps**: XXV.I–III (the LP-011 reroute argument) and III.IV's gradient
   ranges (D-3).
3. **The §11 flags**: the enacted-entry idiom (all 7 existing Charter-amendment entries failed —
   a success has no house form and authoring one is doctrine, outside any run's licence without
   his word); the in-world dates (proposed Filed 2296 / Concluded 2299 — derived, not canonical);
   and the first-success-in-seven framing.
4. **The seven canon defects** (register §12, F-1–F-7) — all verified real where checked (F-1
   confirmed at source). None is L1's or L2's scope unless he assigns them; recommendation: bundle
   F-1–F-5 as a small errata commit inside L2, decide F-6 (the External Force Doctrine's dangling
   Charter reference) as doctrine, and let F-7 die with the B8 fields' supersession by the graph.

**Sequence from here**: Jason ratifies (or amends) this register → the architect drafts the Run L2
handoff (branch `feat/vmss-laws-v23.0.0` per handoff §10, incorporating E-L1–E-L3, the N-1/N-2
guard requirements — rule-scoped, occurrence-counting, negative-magnitude-aware — and the §4.2
`90-99%` LP-071 collision warning) → a fresh Opus session executes. Until ratification, nothing
moves.
