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

---

# Part II — Architect Review of Run L2 (the enactment)

Architect review, 2026-07-21, of `feat/vmss-laws-v23.0.0` @ `edaf83a` (phases 935049d · e2f748b ·
15c0810 · 800f796 · e12413e · edaf83a), per handoff §16.

## Verdict

**ACCEPTED.** The Enabling Consolidation Amendment is enacted as ratified: five schedules leave the
Charter, five grants land, every relocated magnitude re-enacts byte-identically, and the guard
layer that holds those properties survived the architect's own mutation attacks. Two decisions go
to Jason at the veto read (below); nothing blocks the read from starting.

## Independently verified (§16 checklist — none of it inherited)

- **check-canon green at every commit**, walked by the architect: 133/0 ×3, then 136/0 ×3 —
  matching the run's table. Both TOC modes idempotent. Derived registers: `law 8/60/22 of 90`,
  founding count still exactly 60, Tier-1 index 30 rows, laws TOC 148 provisions.
- **charter.html diff confined to the ratified provisions** (III.II, III.IV, III.V, III.VII,
  III.VIII, XXVII). The id inventory and h2/h3 heading set are byte-identical pre/post. All eight
  keep-sentinels (the N-1 negative magnitudes, both comma-exact hedges, the involuntary-descent
  absolute, the 2.5 target) present exactly once. The consequential edits beyond the enumerated
  spans (E-L4's opening-paragraph cure, :218's dangling "above", the :230/:232/:235 de-digitized
  narrative, :423's E-L2 coverage) are each necessary to the removals and were flagged by the run.
- **Zero residual demoted magnitudes**, by the architect's own rule-scoped sweep: every demoted
  phrasing greps 0 in charter.html; the complete remaining dollar census is the four III.I keeps
  plus the two deliberate illustration keeps (:202 token illustration, :224 no-floor uniformity).
  No fifth E-L1/E-L4-class instance exists.
- **Byte-identity spot-verified** across ~15 relocated fragments, including `$15.63/hr in -3`, all
  five retention bands, the E-L1 endpoints (CBA), and the E-L4 sentence (LP-070). Each receiving
  entry carries an in-world "Amended 2299 … at identical values" provenance row; the CBA remains a
  founding instrument, otherwise untouched.
- **The R15 retarget re-derived from the ruling text, as the run requested — CONFIRMED.** R15's
  execution record states the controlling principle in terms: *"075 is not retired — it remains
  available to the next law that earns it."* LP-075 was since earned; LP-076 became the next true
  number; the amendment taking it applies R15 rather than excepting it. The one pre-existing
  LP-076 mention (the immutable R15 record, pending-ratify-tax-50-record.html:169) is prose, not a
  link — nothing dangles, nothing contradicts. The retargeted guard preserves (a2)'s real
  mischief-target (RATIFY-TAX-50 resurfacing under the retired designation).
- **LP-071 collision safety is stronger than claimed**: the surviving cap uses the en-dash
  (`90–99%`, six occurrences across rate-history, law-polling, the tax-50 supplemental) while
  III.IV's relocated band uses the ASCII hyphen (`90-99%`). Rule-scoping *and* encoding keep them
  apart; all six occurrences untouched.
- **Seven mutation probes re-run by the architect, all bite red-for-the-reason**: fidelity on a
  corrupted `$15.63`; the per-phrasing Phase V attack (one band corrupted among five); purity on a
  reinserted rate; purity via injection into a laws.html Tier-1 charter-mirror entry (three guards
  fired); the N-1 pin on a deleted and a duplicated negative magnitude; the R15 guard on forged
  RATIFY-TAX-50 content. The Tier-1 mirror scan is non-vacuous (61 `data-tier="charter"` entries).
- **LP-076's register idiom is inherited, not invented**: "(gravity-set)" comes from LP-057, whose
  *81% yes against a 90% point* the new entry deliberately echoes as *81% yes against an 80%
  point* — same vote share, different gravity, opposite outcome. Scope string, gate order, and
  threshold form match the seven failed entries; dates 2296/2299 as ratified; stat cards
  90 = 8/60/22 advertised and derived atomically.
- **E3 attributions and errata verified**: every tier-attribution edit follows the systems.html:263
  negative-citation pattern; restatements keep their content; F-1–F-4 are in place at source
  (simulations XXV.II; why-vmss III.V; whitepaper §9; LP-002 → III.II on both surfaces);
  register errata E-L1/E-L2/E-L3 folded with the RATIFIED header.

## Defect found and fixed by the architect (disclosed)

**A NUL byte in tools/check-canon.mjs:618** — the (f2b) join separator was `' \x00 '`, a
here-string mangling artifact. Node parsed it, the guard logic was unaffected, but the file
registered as *binary* to grep/file/diff, which would make future tooling silently skip the
repo's most load-bearing script. Fixed at `0b09699` (one byte → spaces; 136/0 before and after;
tree-wide NUL scan of every touched file: clean). This is the sole code change the architect has
made in this project, disclosed per the division-of-labor rule. Trivial report discrepancy noted
alongside: the run's prose says "16 rules / 36 phrasings"; the committed table is 17 rules /
33 phrasings. The code is authoritative.

## Dispositions of the six open items (delegated orchestration)

1. **R15 retarget scope narrowing: ENDORSED.** Page-wide `lp-076` references are now legitimate
   (TOC, cross-references); the masquerade can only work as or inside the entry, and check-canon's
   duplicate-DOM-id guard closes the second-`id="lp-076"` hole.
2. **One number, two titles, two tiers: BLESSED as house convention** for amendments that mint
   instruments. The Code entry states the relationship; the badge names the recalibration ladder.
   Precedent note: a future amendment minting several instruments needs a designated primary.
3. **XXVII's ordinal profile: DECLARED, here, as the controlling reading.** The retained ordinals
   ("the fifth is unsurvivable", "which the schedule reaches at the fifth child") are a Charter
   **bound on the relocated rate** — the §6 case-B pattern: federal tier sets the rate; the Charter
   fixes the outcomes the rate must produce. A recalibration moving the insolvency crossover off
   child five is a Charter question, by design. No text change needed; this record cures
   "undeclared."
4. **Grant-formula asymmetry → JASON at the veto read, with a recommendation: HARMONIZE now.**
   Three grants (III.IV forfeiture, the savings-base cure, XXVII) omit "enacted and recalibrated
   through the Article XXV.VI ladder." No in-world authority hole exists (XXVIII.III's hierarchy
   routes all federal recalibration through the ladder), and the ratified §10 texts were followed
   verbatim — but the Charter is a document where textual uniformity is doctrine, and the III.III
   precedent already reads the formula as regime-descriptive rather than historical. **Pre-merge
   is the only cheap moment**: after v23.0.0 ships, harmonizing costs an in-world amendment.
   If Jason prefers the asymmetry, it should be declared intentional in the register instead.
5. **pending-ratify-tax-50-ballot.html:143: ENDORSED as frozen pre-vote record** — immutable
   class, correctly not edited.
6. **F-5 recorded, F-6 remains Jason's doctrine question** — unchanged.

**Also flagged for Jason's read:** the LP-076 commentary names **the Presidency** as setter of the
Main Layer gravity point — new procedural canon (charter :286 names the rule, not the setter).
Endorsed as power-neutral (the Presidency already holds an absolute veto, so setting the bar
grants it nothing the veto does not), but it is authored mechanics and his read should confirm it.

## Ship state

`a640529` (the §17 peer-review plan) is merged into the v23 branch at `3f181bd` — the eventual PR
now carries both branches' content. Sequence: **Sol peer review (§17, brief committed beside this
file) → findings triage → Jason's veto read (O-4 decision + the Presidency line) → PR → squash
lands as `canon v23.0.0` + tag on the squash (Jason pushes the tag).**

---

# Part III — Architect Review of Run L3a (the codification mapping proposal)

Architect review, 2026-07-21, of `feat/vmss-laws-v23.0.0` @ `84ae541`
(`docs-review/vmss-laws-codification-proposal.md`), per handoff §18.1.

## Verdict

**ACCEPTED, and the null mapping is ENDORSED.** The zero-change result is the honest application of
unchanged-by-default, and its structural argument survives independent verification: **zero** of
the Charter's headings contain schedule vocabulary (re-derived by the architect: rate / band /
schedule / threshold / window / percent / $ / % — 0 of 46 numbered headings), so LP-076 removed
magnitudes no title had ever advertised. The proposal goes to Jason with three ratification items
(§8 of the proposal); the architect's endorsements are below.

## Independently verified

- Boundary and gates: one commit, `docs-review/` only (+759 lines), check-canon 136/0 at entry and
  exit; the Sol packet's six frozen files untouched — both reviews remain concurrent.
- **The XXII.II orphan and both cure refutations verified at source**: no `XXII.I` exists anywhere;
  Article XXII's lead text is five paragraphs of operative rule (the Meritboard's constitutional
  definition), and `charter.html:336` is the Charter's only article-level closing prose positioned
  after a final sub-article — Cure B would strand it inside XXII.II. The disposition (unchanged,
  recorded as a deliberate irregularity) is correct, and §7.3's honesty about the adversarial pass
  (2 of 3 refuters would have passed Cure B; the completeness critic caught it) is noted with
  approval.
- **Every §6 finding spot-checked at source, all real**: faq.html:829 carries the entire demoted
  XXVII schedule attributed to the Charter (N-1); systems.html:281 ends "Full schedule in Article
  III.V", now in-world false (N-2); the identical pre-positioning sentence on layer--3.html:154 and
  simulations.html:2712 (N-4); laws.html:895's "(External Force Doctrine)" gloss on XXV.IV (N-5);
  "personhood" ×0 / "substrate" ×1 in charter.html (F-5's split verdict); whitepaper.html:805 still
  lacks the Case-A distinction sentence. The charter.html hand-authored TOC (33 `toc-link` rows, no
  generator marker, no guard) confirmed (G1).
- N-1 and N-2 are genuine L2 step-6 coverage misses — and a gap in the architect's own Part II
  review, which verified the E3 pass's *pattern* but not its *exhaustiveness*. Recorded against
  myself; the L3b fix list closes it.

## Endorsements (delegated orchestration) — final say remains Jason's per §8

1. **The mapping: RATIFY AS PROPOSED** (48/48 unchanged; XXII.II recorded, not cured). If Jason
   still wants renames for taste, that is the owner's prerogative the data cannot veto — but
   Cure B + the :336 relocation is the only coherent form, and it is Article XI substance.
2. **LP-077: DO NOT FILE — ENDORSED.** The three-ground case (LP-076's minimality narrative;
   LP-042 makes reference hygiene consolidation, not amendment; stat-card motion for nothing) is
   sound, and the in-world record "the codification was examined and found unnecessary" is
   stronger canon than an empty amendment.
3. **Cleanup dispositions — endorse the run's recommendations throughout**: F-5 option 1; Case-A
   minimal cure; LAYERS-CITE unchanged; LAYER-ALIGN option 2 (the two missing III.I baselines
   only); N-1/N-2/N-4 fixed via the systems.html:263 pattern; **N-3 sharpened to "under LP-076,
   consolidated in the Central Banking Authority"** (the precision cure the Part II precedent note
   anticipated); N-6 re-drafted to cite III.IV for the conversion gradient; N-7/N-8 left as-is;
   **G1's charter-TOC guard added in L3b** (guard addition, mutation-tested). N-5 follows Jason's
   F-6 direction.
4. **§7.6/§7.7 classification calls: RATIFIED** (the three dated records frozen by kind;
   `documents/*.html` as SOURCE class — consistent with L1's explainer-rank treatment).
5. **F-6 remains Jason's, with one framing note from the architect**: option 2 (cite the federal
   instrument at charter.html:258 with the Charter's established pointer pattern) is the only
   option that cures the document, and — like the O-4 harmonization — it can ride inside LP-076's
   enacted text pre-merge at zero in-world cost. Post-merge it becomes amendment work. The same
   pre-merge window governs both.

L3b's launch block is drafted after: Sol's findings return and are triaged, and Jason ratifies §8.

---

# Part IV — Architect Triage of the Sol Peer Review

Reviewed: `docs-review/vmss-laws-sol-review-findings.md` (Sol's verbatim response, reviewing the
branch at `4f65d46`). Method unchanged from Parts I–III: no finding was accepted on Sol's word.
Every decisive citation was re-verified at source before disposition — charter.html:188–190
(III.II derivation text), :280–283 (Article XI gates, consensus definition, veto placement),
:327 (Article XXII setter clause), :398–402 (XXV.VI three-track text), :417–419 (XXVII
fifth-child clause); law-polling.html:655–680 (the full LP-076 record), :2145–2151 (LP-064
register entry); laws.html:706–716 (LP-064 Code entry), :848–856 (Overtime Premium Protocol).
Two corpus sweeps were re-run independently: no companion 2299 federal ballot exists anywhere
in law-polling.html or the pending-ratification records, and `$15.625` appears in zero HTML
files. Sol's arithmetic was re-derived: 1.5³ = 3.375; insolvency crossover baseline ≈ 29.63%;
25% baseline → 84.375% at child five; $2,500 ÷ 20 = $125; $15.625 rounds half-up to $15.63.
All of it checks.

## IV.1 Dispositions

| Finding | Severity | Disposition | Cure vehicle |
|---|---|---|---|
| S1-F1 federal receivers never cleared XXV.VI | BLOCKER | **ACCEPTED** | LP-076 record revision (cure choice → Jason, §IV.2) |
| S1-F2 Sanctuary tally not certified | MAJOR | **ACCEPTED** | Same results-table revision |
| S1-F3 no veto row / no consultation certification | MINOR | **ACCEPTED** | Same results-table revision |
| S2-F1 "no right / only the register" misstates incidence | MAJOR | **ACCEPTED** | LP-076 summary + Court scope-note rewrite |
| S3-F1 LP-064 baseline conditional, Charter result categorical | MAJOR | **ACCEPTED** | laws.html LP-064 entry (with one caveat, §IV.3) |
| S5-F1 missing ÷20 operator and rounding rule | MINOR | **ACCEPTED** | Overtime Premium Protocol entry |

**Rejected findings: none. The arbitration register is therefore empty** — the escalation path
(rejected challenges to architect decisions go to Jason) has nothing to carry. Two of the six
accepted findings (S1-F1, S2-F1) are challenges to architecture this review endorsed in Part II;
they are accepted, not contested, and Part II's exhaustiveness record is charged accordingly.

**Architect correction accepted (S-6.2).** Sol is right and Part II (O-3/Presidency discussion)
was wrong: Article XXII at charter.html:327 expressly assigns the President "setting amendment
thresholds in consultation with the Court." Part II's statement that Article XI names the range
but not the setter is corrected here — the setter was named all along, one article over. Two
consequences: the "Presidency-as-setter" ratification item dissolves (there is no new canon to
ratify; the power is existing constitutional text), and what remains is S1-F3's narrower cure —
certifying that the consultation happened and that the point was fixed before the window opened.

## IV.2 The blocker: verified, and two cure architectures

S1-F1 survives every defense the record itself offers. The record's own frame — the schedules
"were already being recalibrated by federal instruments" — fails at source: LP-064 "specified
around the rate" until 2299, the Overtime Premium Protocol is minted by the amendment, and the
Central Banking Authority's band rows carry "Amended 2299" provenance. The federal instruments
verifiably gained content in 2299, and no five-layer ballot exists to have enacted it. Article
XI's electorate deliberately excludes the layers XXV.VI deliberately includes; stricter is not
a superset. The -3 employer's attack Sol drafts is facial and undisputed. This is the single
best finding any reviewer has produced on this project.

Two cures satisfy Sol's minimum. Both are available because LP-076's record is branch text,
not yet merged canon — the record can still be authored, not amended.

- **Cure A — companion federal ballot.** File the receivers' enactment as its own register
  entry — the natural number is LP-077, which the RATIFY-TAX-50 execution record holds open
  ("075 is not retired — it remains available to the next law that earns it"; the same R15
  doctrine holds 077 open, and a five-layer ratification would genuinely earn it). Costs: a
  full new record, register count 90 → 91, stat cards 8/60/22 → 8/60/23, guard and TOC updates,
  and it reverses the ratified don't-file-LP-077 disposition (which was scoped to the renaming
  instrument, so no true conflict — but the reversal should be ratified explicitly).
- **Cure B — dual-track LP-076 (architect recommendation).** Recast the 2296 filing as a paired
  instrument: one filing that ran the Article XI amendment ladder and the concurrent XXV.VI
  federal enactment ladder in the same window, each gate certified independently. The already-
  blessed O-2 convention — one number, two titles, two tiers — anticipates exactly this shape.
  Mechanically: the Threshold field lists both ladders; the results table grows from four rows
  to a certified dual block (Meritboard 88% against both floors; Court 9/10 against both bars,
  with the rewritten scope note; Main 81% against both set points; Sanctuary closing tally
  serving consensus and the 90% federal track at once; a new lower-layer aggregate row — the
  one vote that genuinely never existed and must now be authored; a Presidential disposition
  row covering veto non-exercise and Court consultation on both set points). One revision cures
  S1-F1, S1-F2, S1-F3, and S2-F1 together, keeps the register at 90, and makes the first-success
  record carry the full audit trail its own Threshold field promises.

Recommendation: **Cure B**, for record concentration, count stability, and the O-2 precedent.
Cure A is the doctrinally purer separation and remains on the table if Jason prefers the two
constitutional processes to leave two records. Either way the new in-world facts (the
lower-layer aggregate result, the Sanctuary closing tally, the certification dates) are
authorship, and they are Jason's to ratify before L3b drafts them.

## IV.3 Caveats on accepted cures (binding on the L3b draft)

1. **S3-F1 scope qualifier is unverified.** Sol's cure text confines the 40% baseline to
   "households within the escalation's +1, Main, and -1 scope." No verified corpus text
   establishes that layer scope for the escalation; Charter XXVII speaks of every citizen.
   L3b adopts the cure's substance — the baseline becomes operative, not hypothetical — but
   must verify the scope claim at source and drop the qualifier if the corpus does not carry
   it. Do not import unverified doctrine inside a cure.
2. **S5-F1 lands federal-side only.** The ÷20 indexing sentence and the rounding convention
   (nearest cent, half up) go in the Overtime Premium Protocol entry. The Charter's retained
   derivation text at III.II stays untouched — the cure must not re-thicken the Charter. The
   Protocol's "Every figure is recoverable from retained Charter text" overclaim is tempered
   in the same edit: it is false for $15.63 specifically without the rounding rule, which is
   precisely why L2 relocated the value byte-identically as printed.
3. **Guard discipline.** The (f2b) RELOCATED table pins occurrence counts per phrasing. Cure
   text that reprints a pinned phrasing (e.g. an additional `$15.63`, or a first-ever
   `$15.625` as the pre-rounding value) changes a count some guard pins or should pin. Every
   L3b edit runs check-canon after landing; any deliberate count change updates the pin with
   the mutation-test discipline (red for the reason under test). New result-row percentages
   (the lower-layer aggregate figure, the Sanctuary tally) must not collide with pinned
   phrasings elsewhere; rule-scoping, never digit-scoping, as always.
4. **S2-F1's replacement holding** (Sol's draft language is sound) also propagates to the
   Court scope-note inside the results table and to the "empty of substance" framing sentence —
   one incidence statement, stated once, echoed consistently.

## IV.4 S-6 answers and the thin keeps

- **S-6.1 (O-4)**: Sol concurs with harmonization and supplies an exact uniform formula whose
  operative improvement is the word "only" — making the ladder the exclusive amendment path on
  the face of each grant. Feeds Jason's O-4 decision with the architect and the external
  reviewer now aligned; the formula's application list (six sites) matches the O-4 census.
- **S-6.2**: architect correction, accepted above.
- **S-6.3**: Sol endorses the Part III ordinal theory (child five as Charter constraint on
  federal calibration, child six directly constitutional) and correctly conditions it on
  S3-F1's cure. No new work beyond S3-F1.
- **S-6.4**: all eight prosecuted keeps sustained, confidence 65–99%. **No demotion decisions
  reach Jason's ratification session** — the thin-keep question closes with the constitutional
  tier intact. Sol's one editorial note (Article XXIII's dated trajectory as context vs.
  operative law) is filed as a future-cycle editorial candidate, explicitly not L3b scope.

## IV.5 Consequences for the consolidated ratification session

Jason's single post-Sol session now decides, in full:

1. The L3a proposal §8 items as already listed (48/48 null mapping incl. XXII.II; cleanup
   dispositions item-by-item). The don't-file-LP-077 item is now **conditional on the S1-F1
   cure choice**: it stands under Cure B, and is explicitly reversed under Cure A.
2. **S1-F1 cure architecture: Cure B (recommended) or Cure A.**
3. The authored in-world facts the cure requires: lower-layer aggregate result, Sanctuary
   closing tally, certification dates, consultation line.
4. S2-F1's replacement holding language (Sol's draft as base).
5. S3-F1's operative-baseline cure, with the scope-qualifier verify-or-drop caveat.
6. S5-F1's derivation/rounding text, federal-side.
7. O-4 harmonization — now Sol-concurred, with his formula as the candidate text.
8. F-6 — unchanged, his call, same pre-merge window.
9. ~~Presidency-as-setter~~ — dissolved by S-6.2; nothing to ratify.
10. Thin keeps — no action required; noted closed.

Arbitration items: none.

L3b's scope, once ratified, is the union of: the Sol cures (1–6 above as decided), the queued
cleanup round (N-1..N-8, F-5, Case-A, LAYER-ALIGN), the G1 charter-TOC guard, and O-4/F-6 if
taken. One combined Opus run on `feat/vmss-laws-v23.0.0`, per the standing sequence: launch
block → Opus executes → architect Part V review → Jason's veto read → PR → squash as
`canon v23.0.0` + tag.

Sol's verdict line is adopted as this review's own: the current 136/0 proves structural
synchronization, not legal validity. **Merge remains blocked until the cures land.**
