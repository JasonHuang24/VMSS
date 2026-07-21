# VMSS Charter — Load-Bearing Register (Run L1 output)

**Status: RATIFIED — Jason ratified this register with the architect's errata on 2026-07-21**
(*"I ratify the register with your errata — draft the L2 handoff."*). Ratification record:
`docs-review/vmss-laws-loadbearing-handoff.md` §13. Review basis:
`docs-review/vmss-laws-loadbearing-review.md` (architect, 2026-07-21, register accepted at
`aae169f`). Errata **E-L1, E-L2, E-L3** are folded into the text below and marked inline; the §13.3
open pick is closed to the Central Banking Authority per the review's recommendation, adopted at
ratification. Run L2 (`feat/vmss-laws-v23.0.0`) enacts this document and nothing beyond it.

*Historical status line, as the document stood at the L1 gate:* **PROPOSED — nothing here is
enacted.** This was Jason's ratification surface, the D1–D5 pattern. No `charter.html` edit, no
`laws.html` edit, and no guard change occurred in Run L1. The amendment text (§10) and the in-world
event record (§11) shipped as **proposals**; Run L2 did not exist until Jason ratified this
document personally.

Run L1 of `docs-review/vmss-laws-loadbearing-handoff.md`, executed 2026-07-21 on branch
`feat/charter-loadbearing-audit` (base: `canon v22.8.0`). Machine-readable companion:
`documents/charter-dependency-graph.json` — 421 provision nodes, 1221 typed edges, every edge
carrying `file:line` and verbatim evidence. Method and gates: `vmss-laws-loadbearing-worklog.md`.

Every count and line number below is derived from the working tree at execution time. Nothing is
inherited from a spec snapshot.

---

## 1. The standard applied — and where it comes from

The handoff §4 test (L1 machinery · L2 XI-locked membership criteria · L3 rights/grants/principles ·
L4 constitutive in-degree) is applied exactly as written. One finding reframes it:

> **The load-bearing test is already canon.** Whitepaper §10.6.1 "What the Charter Does Not
> Contain" (whitepaper.html:802–806) states this project's premise in the corpus's own voice, at
> LP-042 *specification weight*:
>
> "The Charter contains structural principles, placement criteria, and constraints on what
> instruments beneath it can do. It does not contain the substantive prohibition list. What the
> Charter does contain is indexed, and everything below it consolidated, at VMSS Laws."
>
> And the routing test at whitepaper.html:806, restating §10.5's dual key:
>
> "does the proposed instrument control who goes to which layer? If yes, it touches placement
> criteria and routes to Article XI. If no but cross-layer, it routes to XXV.VI. If within-layer
> operational, it routes to XXVIII."

Consequence: **L2 is not an imported standard — it is the routing test's first branch**, already
binding at charter.html:292, charter.html:460, and whitepaper §10.5. The audit applies canon's own
test rather than a new one. This should be said in the amendment's own justification: the
Enabling Consolidation Amendment does not introduce a tier doctrine, it completes one the corpus
already declares.

**Edge discipline.** E1 (authority-derivation) and E2 (constitutive dependency) confer load-bearing
status. E3 (parametric restatement), E4 (navigational), and E5 (tooling pin) **never** do. Every
extraction lens was instructed to choose the *weaker* type when torn and to record the call; those
records are in the graph's `lensNotes` and are surfaced as flags in §13.

---

## 2. Provision-level in-degree (the decision data)

Exact in-degree per provision label, E1/E2 only (the conferring types). Full table including
E3/E4/E5 is in the graph's `provisionIndex`.

| Provision | Nodes | E1 | E2 | Reading |
|---|--:|--:|--:|---|
| XXV.VI | 13 | **111** | 8 | The federal ladder. Highest authority-derivation in-degree in the corpus by a factor of two. |
| XXVIII | 3 | **46** | 22 | Regulatory machinery; every layer/district instrument derives from it. |
| XI | 35 | 15 | **37** | Amendment machinery; the corpus routes structural change *into* it. |
| XIV | 5 | 19 | 18 | The three-axis proportionality frame; XVIII and XXI both compute on it. |
| XX | 5 | 13 | 15 | Audit authority; XV's institutional-error remedy depends on it. |
| XXII | 20 | 8 | 17 | Supplies the Court, the Presidency, and every ranking. |
| IV | 9 | 12 | 12 | Continuity + the STI-dimension routing rule. |
| VIII | 14 | 9 | 14 | Child protections; XXVII's advocate mechanism depends on it. |
| II | 21 | 8 | 14 | STI; VII, X, XII, XIII, XXII, III.VI all read it. |
| XVIII | 9 | 11 | 10 | Network attribution. |
| XXI | 17 | 4 | 15 | The Court. |
| VI | 5 | 9 | 6 | Enforcement/restoration; the -3 federal floor. |
| XXV (art.) | 1 | 1 | 11 | |
| XXV.III | 6 | 4 | 11 | |
| XXV.I | 3 | 3 | 9 | |
| XXV.II | 3 | 0 | 3 | |
| I | 9 | 5 | 9 | |
| III (art.) | 1 | 6 | 1 | |
| **III.VII** | 22 | 5 | 7 | Mixed — see §4.4. |
| **III.I** | 3 | 6 | 5 | Keep — see §5. |
| III.III | 5 | 4 | 7 | Already cured at v22.7.0. |
| **III.V** | 18 | 1 | 9 | Mixed — the E2s are *pointers to the schedule*, see §4.3. |
| V | 11 | 8 | 1 | |
| XXV.IV | 5 | 6 | 2 | |
| XII | 3 | 0 | 10 | |
| XIII | 3 | 1 | 6 | |
| **III.IV** | 15 | 1 | 5 | Mixed — see §4.2. |
| VII | 19 | 0 | 6 | |
| XXIII | 9 | 3 | 3 | Keep — see §5. |
| Preamble | 5 | 1 | 4 | |
| **XXVII** | 20 | 2 | 3 | Mixed — see §4.5. |
| XXV.V | 6 | 4 | 0 | |
| IX | 4 | 3 | 0 | |
| XV | 9 | 1 | 2 | |
| XXIV | 10 | 3 | 0 | |
| **III.II** | 9 | **0** | 2 | The demotion-candidate signature. See §4.1. |
| X | 4 | 0 | 2 | |
| XXVI | 7 | 0 | 2 | |
| III.VI | 4 | 0 | 1 | |
| III.VIII | 7 | 0 | 1 | |
| XXII.II | 12 | 1 | 0 | Machinery (L1) on kind, not in-degree. |
| XXVIII.I | 7 | 0 | 0 | Machinery (L1) on kind. E3=21 — heavily restated. |
| XXVIII.II | 6 | 1 | 0 | Machinery (L1) on kind. |
| XXVIII.III | 5 | 0 | 0 | Machinery (L1) on kind. |
| XVI, XVII, XIX | 4 | 0 | 0 | Principles (L3) on kind. |
| **Four Founding Lines** | 7 | **0** | **0** | **Zero in-degree of any type.** See below. |
| Founding Affirmation | 3 | 0 | 0 | |

**The Four Founding Lines carry zero in-edges of every type and are obviously not demotable.**
This is the register's own proof that **L4 cannot be the whole test and L3 does real work**: a
purely in-degree-driven procedure would flag the civilization's symbolic anchor as a candidate.
The kind test is load-bearing for the load-bearing test. Recorded because a future run tempted to
mechanise §4 entirely needs to see this case.

---

## 3. Full per-provision classification

Legend: **L1** machinery · **L2** XI-locked membership criteria · **L3** rights/grants/principles ·
**L4** constitutive in-degree (≥1 E1 or E2 from an in-force rule) · **CAND** demotion candidate.

Provisions are classified at clause level where they are mixed; the classification below states the
governing result for the provision and points at §4 for the split.

| Provision | Result | Grounds |
|---|---|---|
| Preamble | Load-bearing | L3 (founding principles) + L4 (E2=4) |
| Four Founding Lines | Load-bearing | **L3 only** — zero in-degree; the symbolic anchor, amendable but not a parameter |
| I | Load-bearing | L2 (layer assignment basis, the categorical 0→-1 threshold) + L4 |
| II | Load-bearing | L2 (85-point floor, XI-locked at :292) + L3 + L4. **10:1 keeps — see §5** |
| III (art. head) | Load-bearing | L3 + L4 (E1=6) |
| III.I | Load-bearing | L3 (birthright framing) + L4 (E1=6, E2=5). **Amounts keep — see §5** |
| III.II | **Mixed → CAND** | Grant/stance L3; **the enumerated per-hour figures are CAND** — §4.1 |
| III.III | Load-bearing (cured) | L3 principle only; the schedule left at v22.7.0. No residual candidate |
| III.IV | **Mixed → CAND** | Siloing + upward-conversion prohibition L3; **forfeiture band CAND**; gradients = description — §4.2, §6 |
| III.V | **Mixed → CAND** | Involuntary-descent absolute + joint-asset rules L3; **five-band schedule + lookbacks CAND** — §4.3 |
| III.VI | Load-bearing | L2 (upward pathway = permanence of reassignment, XI-locked) |
| III.VII | **Mixed → CAND** | Pulse/aggregate/no-exemption principles L3; **triggers, rates, windows CAND** — §4.4 |
| III.VIII | **Mixed → CAND** | -3 autonomy + non-reach boundary L3; **the restated $10B/5% CAND with III.VII** — §4.4 |
| IV | Load-bearing | L1 (continuity infrastructure) + L2 (dimension-set change routes to XI) + L4 |
| V | Load-bearing | L3 (rights and stances) + L4 (E1=8) |
| VI | Load-bearing | L1 (enforcement regimes) + L4 (E1=9, E2=6) |
| VII | Load-bearing | **L2 — the article the routing test names**: phasing, visitation, ascension |
| VIII | Load-bearing | L3 (child protections) + L4 |
| IX | Load-bearing | L3 + L4; SAD criteria are XXVIII-petitioned, not Charter parameters |
| X | Load-bearing | L2 (exit/re-entry criteria) |
| XI | Load-bearing | **L1 — the amendment machinery.** Never a candidate |
| XII | Load-bearing | L3 (non-determinism) + L4 (E2=10) |
| XIII | Load-bearing | L3 + L4 |
| XIV | Load-bearing | L1 (the three-axis evaluation frame) + L4 (E1=19, E2=18) |
| XV | Load-bearing | L2 (clearability, trajectory) + L3 |
| XVI, XVII, XIX | Load-bearing | **L3 only** — stated principles, no parameters, near-zero in-degree |
| XVIII | Load-bearing | L1 (attribution machinery) + L4 |
| XX | Load-bearing | L1 (audit machinery) + L4 |
| XXI | Load-bearing | **L1 — the Court.** 10 justices / 7-10 / 6-10 are machinery constants |
| XXII / XXII.II | Load-bearing | **L1 — the Meritboard and executive.** Ten-year cycle is machinery |
| XXIII | Load-bearing | **L3 aspiration.** E3-heavy, operatively inert — see §5 |
| XXIV | Load-bearing | L3 (the medical-access floor and the graduation principle) |
| XXV (art. head) | Load-bearing | L3 + L4 (E2=11) |
| XXV.I / .II / .III | Load-bearing | **L4 decisively — see §6 hard case A.** Not demotable |
| XXV.IV | Load-bearing | L1 (the escalation ladder) + L4 |
| XXV.V | Load-bearing | L1 (military instruments) + L3 |
| XXV.VI | Load-bearing | **L1 — the federal ladder. E1=111.** The corpus's single highest authority anchor |
| XXVI | Load-bearing | L3 (outcomes-not-inputs stance); routes STI mechanics to II |
| XXVII | **Mixed → CAND** | Target, children-held-harmless, pricing-not-preventing L3; **the escalation rate CAND** — §4.5 |
| XXVIII.I / .II / .III | Load-bearing | **L1 — regulatory machinery and the jurisdictional hierarchy** |
| Founding Affirmation | Load-bearing | L3 |

**No provision is classified as a whole-article demotion candidate.** Every candidate is a clause
inside a provision that also carries L1/L2/L3 content — exactly the pattern the v22.7.0 III.III
trim established. The Tier-1 index stays at 30 rows by construction; nothing here removes an
article.

---

## 4. Demotion candidates, with target tier, receiving instrument, and edge evidence

**Receiving-instrument rule applied in strict order** (handoff §4): an existing enacted LP already
holding the mechanics > a founding-corpus instrument from the latent sweep covering the domain > a
new schedule instrument enacted by the amendment itself.

> **Structural finding that governs every row below.** The handoff §2.2 expected the latent sweep
> to have created the receiving instruments. It largely did not — **because the sweep's own home
> rule excluded exactly these schedules.** The Layer Provisioning Schedule's rationale
> (`vmss-laws-latent-inventory.md`, instrument #5) says so in terms: *"the dividend amounts,
> subsidy rates, overtime schedule and circulation-mandate parameters are all Charter-home (III.I,
> III.II, III.VII) and excluded."* Spine 2 of `cluster-architecture.md` carries four instruments
> and none of them is a schedule home. This is not a defect in the sweep — the home rule was
> correct at the time, and the sweep could not have anticipated which Charter-home rules L1 would
> later find demotable. It does mean the third tier of the receiving-instrument rule (a new
> schedule instrument minted by the amendment) is reached more often than the spec anticipated.
> **Flagged for Jason:** this raises L2's authoring load and should be priced before ratification.

### 4.1 III.II — the Overtime Premium Protocol per-hour cascade

- **Candidate text** (charter.html:190): *"In Main Layer, the monthly subsidy is $10,000 — weekly
  value $2,500 — implying an overtime rate of $125 per hour beyond the qualifying threshold. The
  rate scales by layer: $62.50/hr in -1, $31.25/hr in -2, $15.63/hr in -3. An employer requesting
  30 hours of qualifying work in Main Layer owes $1,250 in overtime on top of whatever the agreed
  base wage is."*
- **In-edges: E1 = 0, E2 = 2, E3 = 12.** The cleanest candidate signature in the Charter. Neither
  E2 targets the schedule: charter.html:234 (III.VII) and charter.html:423 (XXVII) depend on *PJS
  existing as an untaxed inflow stream*, not on any per-hour figure.
- **Target tier:** Federal. Scope is cross-layer (all four rates), so the architecture's tier test
  routes it to XXV.VI — and canon's routing test agrees: it does not control who goes to which
  layer.
- **Receiving instrument:** **new schedule instrument** — *the Overtime Premium Protocol*. It is
  canon-named in the Charter's own text at charter.html:190 and carries a whitepaper section
  heading of its own (whitepaper.html:803, §11.3), so the name is promoted from canon, not minted.
  Tier-1 and tier-2 of the receiving rule were checked and fail: **LP-002** (*PJS Rate Calibration
  — Medical Research Roles*, enacted, law-polling.html:656) holds *a* PJS rate-calibration
  mechanic and establishes the tier precedent — a PJS rate was already recalibrated federally,
  under XXV.VI — but its scope is credentialed medical-research roles, not the overtime cascade;
  and no founding-corpus instrument covers it (excluded by the home rule, above).
- **Refinement on the prior — keep the derivation rule.** The architecture §5 prior demotes the
  whole cascade. **The register recommends keeping the sentence "The weekly subsidy value is
  calculated as the monthly subsidy divided by four weeks" at Charter tier.** It is the derivation
  that binds the premium to III.I's UBI baselines: $10,000 ÷ 4 ÷ 20 = $125. Demote it too and a
  federal instrument could set an unbound rate — a substantive change wearing tier-hygiene
  clothes. Keep it and every demoted figure is arithmetically derivable from retained Charter
  text, which makes the amendment's core claim ("changes no number and no right") *provable*
  rather than merely asserted. **Divergence from the §5 prior; evidence is the sentence itself.**

### 4.2 III.IV — the downward-conversion forfeiture band

- **Candidate text** (charter.html:201): the band `90-99%` inside *"Downward conversion is
  permitted only through authorized downward channels — a 90-99% forfeiture that prevents
  arbitrage while allowing citizens to arrive in lower layers with limited capital."*
- **In-edges: E1 = 1, E2 = 5, E3 = 24.** None of the five E2s reads the band. They read the
  *siloing architecture* (III.V at :218 and :216, III.VIII at :244, the Central Banking Authority
  at laws.html:1417) — which stays.
- **Target tier:** Federal (cross-layer).
- **Receiving instrument:** **the Central Banking Authority** (founding-corpus instrument #3,
  laws.html Tier 2). Second-tier of the receiving rule, and a clean fit: its provision 2 already
  reads *"executes settlement when citizens cross layer boundaries, retiring origin currency and
  issuing destination-layer currency at the applicable schedule"* — "the applicable schedule" is
  the enabling hook, and the instrument's `charter-touchpoints` already record III.IV.
- **Keeps:** *"Upward conversion is prohibited without exception"* (L3 absolute), the whole
  siloing rationale, and the currency-retirement/issuance mechanic.
- **⚠ L2 GUARD WARNING.** The strings `90-99%` at rate-history.html:160, law-polling.html:2336, and
  pending-ratify-tax-50-supplemental.html:139 are **LP-071's founding net-worth cap, not III.IV's
  forfeiture** — same digits, different rule. A naive "charter states no demoted magnitude" purity
  guard, or a naive consolidation-fidelity guard, will collide on them. The guard must be
  rule-scoped, not digit-scoped. This is the single highest-risk item in §8.

### 4.3 III.V — the five-band retention schedule and the 24-month lookbacks

- **Candidate text** (charter.html:209–215, the five `<li>` bands; charter.html:206 and :216, the
  two 24-month lookback windows; **charter.html:202**, per erratum E-L1 below).
- **⚠ ERRATUM E-L1 (architect review, ratified — binding on L2's drafting).** `charter.html:202`,
  inside III.IV's text, restates III.V's band endpoints in retained-percentage form: *"The same
  progressive scale applies — 10% retained on the first $1M, scaling down to 1% above $1B."* The
  occurrence appears in neither the §10 relocation list as originally drafted nor finding N-2's
  restatement inventory, and the graph carries only the pointer E2 from :202 (*"using the downward
  transfer retention schedule (Article III.V)"*) — the magnitude restatement has no edge. As
  originally drafted, L2 would have demoted the III.V bands while the Charter retained two of their
  values one article up: exactly the occurrence-counting failure class N-2 warns about. **Fix, now
  in force: charter.html:202 joins the III.V relocation set. The sentence keeps its pointer form and
  loses the band values** (L2-drafted text of the form *"The same progressive scale applies — per
  the retention schedule — converted at destination-layer purchasing power"*). Note that the
  purchasing-power gradients later in the same line are a **keep** (§6 case B) — the :202 edit is
  surgical to the two band endpoints.
- **In-edges: E1 = 1, E2 = 9, E3 = 16.** **Read the E2s carefully — this is the row most likely to
  be misread.** Every one of the nine is a *pointer to the schedule as a whole*, not a dependency
  on a band value: charter VII:267 *"liquidated per the schedule in Article III.V"*; charter
  III.IV:202 *"using the downward transfer retention schedule (Article III.V)"*; whitepaper §19.5
  at :1168 and §19.11 at :1189 and §22.8 at :1342; LP-065 at law-polling.html:2149 and
  whitepaper.html:1068, whose claim is about *liquidation-share priority order*, not band values.
  A pointer to "the schedule" survives the schedule's relocation intact, provided the Charter
  retains an enabling grant that the pointer can still resolve against. **This is why the
  replacement text in §10 keeps the phrase "on a progressive scale" — the pointers need a
  Charter-tier referent.**
- **Target tier:** Federal (cross-layer).
- **Receiving instrument:** **the Central Banking Authority** for the retention bands (same
  settlement mechanism as §4.2 — III.IV:202 already routes visitors and elective residents through
  the III.V schedule, so the two belong in one instrument). **The 24-month lookbacks: RESOLVED at
  ratification to the Central Banking Authority as well** — the flag below was the open pick; the
  architect recommended keeping the whole III.IV/III.V settlement family in one instrument (the
  anti-avoidance kinship with LP-069/070 is real, but attribution's home is the savings base, not
  asset liquidation), and Jason adopted that recommendation. *Original flag, recorded:* the
  lookbacks are an anti-avoidance rule, arguably closer in kind to LP-069/LP-070's attribution
  family than to settlement.
- **Keeps:** the involuntary-descent 100% absolute (a rule of kind, not a tunable band — *"One
  hundred percent of proceeds are transferred … without exception"*), joint-asset treatment,
  victim-restoration priority, and the anti-pre-positioning principle *"pre-positioning does not
  shield assets from consequence"*.

### 4.4 III.VII / III.VIII — Savings Circulation Mandate triggers, rates, and windows

- **Candidate text:** `$100 billion` / `$100,000` population-average / `90-day rolling average` /
  `10%` monthly (charter.html:230); `$50 billion` / `5%` / `$50,000` equilibrium (:232);
  `$25 billion`, `$10 billion`, `5%`, the `24-month` attribution window (:235); the restated
  `$10 billion` / `5%` in III.VIII (:242); and the worked equilibrium illustrations.
- **In-edges: III.VII E1 = 5, E2 = 7, E3 = 13.** The E1s are the strongest receiving-instrument
  evidence in the register: **LP-069** *"Specification of Article III.VII's savings base"*
  (laws.html:810, law-polling.html:2269) and **LP-070** (laws.html:833, charter anchor *"Articles
  III.VII, III.III, XXV.VI"*). The E2s depend on the *mechanism* — the pulse-at-start principle
  (whitepaper §12.5 at :926, LP-070 at law-polling.html:2300), the monitoring boundary (whitepaper
  §12.1 at :876) — all of which stay.
- **Target tier:** Federal.
- **Receiving instrument:** **LP-069 + LP-070** — tier-1 of the receiving rule, an enacted LP pair
  that already holds the mechanics. LP-070 already reads the 90-day rolling average as an operative
  input (laws.html:828: *"The monthly pulse reads the 90-day rolling average as of the month's
  start"*), so the window has a federal home today. This is the cleanest demotion in the register.
- **Keeps:** proportionality to institutional presence; the pulse-at-start principle; district-
  aggregate-not-personal; the rolling-average-not-snapshot rationale; *"no floor, no exemptions,
  and no means testing"*; the -2/-3 non-reach boundary; the implant-agnostic design commitment;
  automatic deactivation; *"The mandate is a corrective pulse, not a permanent taxation regime."*
- **Category-A residual cured here.** charter.html:239's LP-069 reference — the architecture's
  standing Phase-3 TODO and the sole entry in the purity-guard whitelist — is relocated with this
  row. Post-L2 the whitelist is expected **empty**. (Architecture §5 cites this as `charter:247`;
  it is at **charter.html:239** in the current tree, moved by the v22.7.0 III.III trim.)

### 4.5 XXVII — the reproduction escalation rate

- **Candidate text** (charter.html:423): *"The escalation compounds at 50% per child beyond the
  threshold"* plus the worked illustration *"If a family's baseline aggregate effective rate is
  40%: the third child raises it to 60%. The fourth child raises it to 90%. The fifth child raises
  it to 135%"*.
- **⚠ ERRATUM E-L2 (architect review, ratified — binding on L2's drafting).** The relocation is
  **occurrence-complete across the whole of charter.html:423**, not merely across the span quoted
  above. The line's trailing sentence — *"no rational actor accumulates sufficient savings under
  60–90% escalation to survive long at 135%"* — restates the illustration's magnitudes *after* the
  quoted candidate span ends, as does the *"already-punitive rates of children three and four"*
  passage's context. L2's XXVII edit covers the full line; the retained prose keeps its qualitative
  force (the runway to bankruptcy, the unsurvivability of the fifth child) and loses the figures.
- **In-edges: E1 = 2, E2 = 3, E3 = 14.** Both E1s are **LP-064** (*Replenishment Assessment and
  Child Dividend Stewardship Act*, laws.html:707, law-polling.html:2119): *"Implementing
  specification of Charter Article XXVII — collection mechanics, not new doctrine."*
- **Target tier:** Federal. **Receiving instrument: LP-064** — tier-1 of the receiving rule,
  already enacted, already holding the measurement base (*"the escalation percentages compute
  against total parental inflow"*) and the residual-assessment mechanic. The rate is the one thing
  LP-064 specifies *around* rather than *containing*.
- **Refinement on the prior — one magnitude, not four.** The §5 prior lists the curve as
  "40→60→90→135%". The Charter text shows 60/90/135 are **arithmetic consequences** of a single
  rule (compounding at 50% per child) applied to an explicitly *hypothetical* baseline (*"If a
  family's baseline aggregate effective rate is 40%"*). Exactly **one** operative magnitude is in
  play. Demoting the illustration alongside the rule is correct; describing it as a four-value
  curve overstates what moves. **Divergence from the §5 prior in scope, not in direction.**
- **Keeps:** the 2.5 replenishment target (see §5); *"Every citizen, including every newborn, holds
  an unconditional right to full UBI"*; children held harmless (*"This principle is absolute and
  non-negotiable"*); the never-withheld-at-source absolute; *"The civilization does not prevent
  births — it prices them"*; the sixth-child nuclear consequence as a rule of kind; the -2/-3
  non-imposition; the inter-layer treasury levy cascade; the stabilizer ordering.

---

## 5. Deliberate keeps that the data could have been read as candidates

| Kept | Prior | Data |
|---|---|---|
| **III.I UBI amounts** ($10,000 / $5,000 / $2,500 / $1,250) | §5 category C keep | **Confirmed, and on stronger ground than the prior gives.** E1=6 (instruments derive authority from III.I) and E2=5 — including charter.html:230, where **III.VII's own equilibrium mechanic reads the UBI amount**: *"at $10,000/month UBI, a citizen holding $100,000 loses $10,000/month and receives $10,000/month back — equilibrium"*, and charter.html:189, where III.II's subsidy *"Baseline amounts mirror UBI by layer."* The amounts are not a parameter parked at Charter tier; they are the input two other Charter provisions compute on. L4 satisfied outright, on top of L3's birthright framing. |
| **II's 10:1 penalty-to-recovery ratio** | §5 category C keep, marked "borderline" | **Confirmed, and the register proposes better ground than "ledger architecture".** 10:1 governs how fast STI recovers; STI gates the 85-point Sanctuary floor (charter.html:266); Article XI at :292 locks *"behavioral thresholds, phasing mechanics"* to the amendment process. Changing 10:1 changes how long it takes to re-qualify for a layer — that is **L2, not a borderline L3**. Not borderline. |
| **XXIII / XXIV leakage trajectories** | §5 category C keep | **Confirmed.** E3=11 across roadmap.html, whitepaper, and the PDF sources; the only E1s belong to *The Leakage Accounting Standard*, which derives authority from XXIII rather than depending on a trajectory row. Canon's own hedge is decisive and must be preserved verbatim: *"This is not a promise — it is a direction."* Operatively inert; heavy restatement is E3 and confers nothing. |
| **XI / XXV.VI / XXI / XXII / XXVIII thresholds** | §5 rules 1–2, never candidates | **Confirmed by kind and by in-degree.** These are lawmaking and adjudication machinery. XXV.VI's E1=111 makes it the corpus's single highest authority anchor. |
| **III.V involuntary-descent 100%** | not addressed by the prior | Kept. "One hundred percent … without exception" is a rule of kind (total forfeiture), not a tunable band. |
| **II's 85-point floor, VII's phasing** | §5 rule 2 | Confirmed L2 — the routing test's first branch, verbatim. |

---

## 6. The two hard cases the spec named

### Case A — Articles XXV.I–XXV.III: **load-bearing where they stand. Not demotable.**

The spec predicted heavy E2 in-degree and said the graph decides. It does.

- **30 E1/E2 in-edges target XXV.I–III specifically** (7 E1, 23 E2 — the sum of the §2 rows for
  XXV.I, XXV.II, and XXV.III), plus 12 further E2 and 1 E1 at Article-XXV granularity from VI, VII,
  XXVIII.I, XXVIII.III, and the Federal Reach Boundary Act.
  **⚠ ERRATUM E-L3 (architect review, ratified).** This line read *"19 E1/E2 in-edges … (1 E1, 18
  E2)"* at the L1 gate — an internal inconsistency with the graph and with the register's own §2
  rows, which sum to 7 E1 + 23 E2 = 30. The real counts are *higher*, so the keep verdict only
  strengthens; the corrected figures are stated above.
- **Article VI's -3 federal floor is unintelligible without them** — charter.html:262 makes the
  floor activate on *"violation of absolute federal laws (Articles XXV.I–XXV.III)"*. Demote them
  and the Charter's only statement of when the civilization reaches into the Terminal layer points
  at a federal instrument that a later federal instrument could amend.
- **The decisive datum is in the register, not the Charter.** **LP-011** (law-polling.html:2524) —
  a -3 petition seeking exemption from XXV.I — was dual-key classified **"Structural (unanimous)"**
  and rerouted to Article XI. That reroute is only correct while XXV.I sits at Charter tier.
  Demote XXV.I–III to federal and the very exemption the dual key held to *exceed* the XXV.VI
  ladder becomes reachable *by* the XXV.VI ladder. The demotion would silently overturn an enacted
  classification ruling.
- Canon supplies the doctrine for why they sit where they sit: whitepaper.html:804 analogises
  constitutional placement of a substantive prohibition to treason in the US Constitution —
  *"a protective ceiling on a crime the Founders feared would be abused as a political weapon, not
  a substantive floor."* XXV.I–III are ceilings on what the federal tier may redefine, which is
  precisely the "constraints on what instruments beneath it can do" that §10.6.1 assigns to the
  Charter.

**Verdict: keep. No candidate rows.** Note the tension this creates with whitepaper.html:804's
other claim that *"XXV is the document that contains the civilization's prohibition list"* — the
prohibition *list* is federal and grows through XXV.VI, while XXV.I–III are the three absolutes
that list may not contract. The register recommends L2 state that distinction explicitly rather
than leave §10.6.1 reading as if all of XXV were federal.

### Case B — Article III.IV purchasing-power gradients: **description, with one operative reader.**

- Canon's hedges are uniform and load-bearing (charter.html:202): *"approximately 1.3–1.8x"*,
  *"approximately 1.8–2.5x"*, *"approximately 2.5–4x"*, and decisively *"The gradient is not a
  fixed exchange rate — it emerges from scarcity, institutional withdrawal, and inflationary
  pressure from tourism inflow, and varies by district within each layer."*
- **Exactly one in-force rule reads the numbers, and it reads them as a bound, not a rate:** the
  central bank *"derives settlement rates from observed economic conditions within these ranges"*
  (charter.html:202), restated at whitepaper.html:892 (§12.2.1): *"The central bank derives
  settlement rates from district-level economic data within these ranges."*
- **Classification (explicit, as the spec requires): the gradient is descriptive text, EXCEPT that
  the three ranges function as an operative ceiling-and-floor on a delegated power.** That is a
  bounded delegation, not an exchange rate.
- **Recommendation: keep at Charter tier, and do not demote.** A range that bounds what the central
  bank may derive is a "constraint on what instruments beneath it can do" — §10.6.1's own
  definition of Charter content. Demoting it would let the bank's own tier set the bound on the
  bank's own discretion. **This is a divergence from the §5 prior's "may simply stay" only in
  confidence, not direction — the prior was unsure; the data settles it.**
- Related: the token illustration (`6,700` / `4,700` / `3,100` at charter.html:202) appears on **no
  other published surface** — the only other occurrences are this run's own draft artifacts. It is
  pure illustration. It may stay or go; nothing reads it. Recorded so L2 does not treat its absence
  elsewhere as a consolidation-fidelity failure.

---

## 7. E3 alignment worklist for L2

Every surface restating a Charter magnitude, by target provision. E3 confers nothing; this list is
mechanical work for L2 and nothing more. Full rows with `file:line` and quotes:
`documents/charter-dependency-graph.json`, filter `type == "E3"` (400 edges).

| Target | Restating surfaces (published) |
|---|---|
| III.I | world, layer-+1, layer-0, layer--1, layer--2, layer--3, faq, why-vmss, join, systems, whitepaper, layers, simulations |
| III.II | systems, whitepaper, faq (+ documents/resources-source, VERBATIM-SOURCE-TEMPLATE) |
| III.IV | layer--1, layer--2, layer--3, faq, systems, whitepaper, simulations (+ documents/academy-source) |
| III.V | systems, layer--3, faq, why-vmss, whitepaper, simulations |
| III.VII | faq, systems, whitepaper, simulations, rate-history (+ documents/academy-source) |
| III.VIII | faq, whitepaper |
| XXVII | world, systems, faq, why-vmss, whitepaper, pending-ratify-tax-50-ballot |
| XXIII | roadmap, whitepaper (+ documents/resources-source, academy-source) |
| II | faq, whitepaper, systems, technologies, simulations, law-polling (+ documents/resources-source) |
| XXVIII.I | 21 E3 edges — the 1% / 80% / 12-month thresholds are the corpus's most-restated machinery constants |

**Only the rows for §4's candidates require tier attribution in L2** (III.II, III.IV forfeiture,
III.V, III.VII/VIII, XXVII). The rest restate provisions that stay at Charter tier and are already
correctly attributed.

**Alignment gaps found (no edge possible — surfaces that should restate and do not):**
- `layer-+1.html`, `layer-0.html`, `layer--2.html` carry **no tax content at all**; only layer--1
  and layer--3 carry the LP-074 "Current tax frame" block.
- `layer--3.html` never states III.I's `$1,250/month` — only *"Minimal UBI distributed in -3
  currency"*.
- `layers.html` contains **zero** Charter citations of any kind (verified by grep).
- `systems.html:263` is a **model negative citation** worth copying as the house pattern: *"The
  rates below are a federal-tier schedule under LP-074, not Charter text."* L2's tier-attribution
  clauses should follow this wording.

---

## 8. E4 anchor-stability list for L2

Mechanically derived, whole corpus (`grep -ohE '(^|[^-2a-z])charter\.html#[a-z0-9-]+'`, excluding
`path-2-charter.html#` false positives):

- **55 external anchor references** — `laws.html` 44, `simulations.html` 10, `faq.html` 1.
- **charter.html carries exactly 31 ids**: `#preamble`, `#article-i` … `#article-xxviii` (28),
  `#article-xxv-vi`, `#founding-affirmation`.
- **All 31 are externally referenced.** There is no unreferenced anchor. **No h2/h3 id may be
  renamed, removed, or reordered in L2.**
- The strictest pin is not a link but a guard: `check-canon.mjs` (Tier-1 index) requires
  laws.html's 30 index rows to be **byte-equal to charter.html's h2 heading text and in document
  order**, and `build-law-toc.mjs` hard-throws on `preamble`, `founding-affirmation`, the
  `article-*` prefix, and the `' – '` en-dash inside each heading. Heading text is as immutable as
  heading ids.
- Bare `charter.html` hrefs naming no provision (whitepaper.html:249, :380, :1697, :2065;
  systems.html:231, :351) are whole-document anchor items, not per-anchor.

## 8b. E5 tooling retarget list for L2

45 E5 edges. Grouped by what breaks:

**Breaks if a Charter magnitude moves to a federal instrument:** check-canon.mjs:483, :480, :491
(`exactCascade` + `currentSurfaces`); :540 (charter purity — the cascade must be *absent* from
charter.html, so a move *into* charter breaks it); **:533** (a comment asserting the III.II PJS
figures *"do not match the cascade regex — verified, not assumed"* — this assertion is about
exactly the §4.1 candidate and must be re-verified, not inherited); :981 (five-currencies text
sweep); :661/:660 (the comma-exact advisory hedge quoted from charter.html); :474/:498/:506/:875/
:991 (III.III placement and tier-attribution prose).

**Breaks if an h2/h3 id or heading text changes:** check-canon.mjs:792, :794, :795, :796, :798,
:807 (Tier-1 count, anchor, and title equality); :994, :1064, :1058, :1020 (anchor and fragment
resolution); build-law-toc.mjs:120, :142, :144, :145, :146, :147 (hard-throws).

**Whitelist to retire:** the `CHARTER_LP_WHITELIST` at check-canon.mjs:~545 holds exactly one
entry, `LP-069`, with its own architecture citation and Phase-3 TODO. §4.4 relocates that
reference; the guard's own staleness check (*"whitelist carries no entry the Charter no longer
references"*) will then require the entry to be **removed, not emptied in place**. Post-L2
expectation: **whitelist empty**, as architecture §8 predicts.

**Judgment flagged:** check-canon.mjs:274, :283, :515, :1020, :1058, :994, :1064 sweep root `.html`
by glob or list, so charter.html is only incidentally in scope. Typed E5 because charter.html is in
the swept set; a reviewer may prefer to drop them as non-charter-specific.

---

## 9. Divergences from the architecture §5 validation prior

Per handoff §5: divergences are findings with evidence, never suppressed and never silently
adopted. **The computed register reproduces the prior's direction on every row.** Five refinements
and two corrections:

| # | Prior | Computed | Evidence |
|---|---|---|---|
| D-1 | III.II overtime cascade → Federal, whole | Demote the enumerated figures; **keep the derivation sentence** *"The weekly subsidy value is calculated as the monthly subsidy divided by four weeks."* | charter.html:190. Keeping it makes every demoted figure derivable from retained Charter text and makes "no magnitude changed" provable. §4.1 |
| D-2 | XXVII curve = "40→60→90→135%" | **One** operative magnitude ("compounds at 50% per child"); 60/90/135 are arithmetic consequences of an explicitly hypothetical 40% baseline | charter.html:423. §4.5 |
| D-3 | III.IV gradients "arguably descriptive… may simply stay" | **Descriptive, and keep** — the three ranges are an operative *bound* on a delegated power, which is Charter content by §10.6.1's own definition | charter.html:202, whitepaper.html:892. §6 case B |
| D-4 | II's 10:1 = "ledger architecture; borderline, keep" | Keep on **L2**, not borderline L3 — 10:1 sets STI recovery speed, STI gates the 85-point floor, and XI locks phasing mechanics | charter.html:167, :266, :292. §5 |
| D-5 | III.I UBI amounts = category C keep (layer architecture, birthright) | Keep on **L4 as well** — III.VII's equilibrium mechanic and III.II's baseline mirror both compute on the amounts | charter.html:230, :189. §5 |
| C-1 | §5 cites LP-069 at `charter:247` | It is at **charter.html:239** | Moved by the v22.7.0 III.III trim. Editorial only |
| C-2 | §5 cites the XI membership lock at `charter:300` | It is at **charter.html:292** | Same cause. Handoff §4 already cites :292 correctly. Editorial only |

**No divergence reverses a prior decision.** Every provision the prior would keep, the data keeps;
every schedule the prior would demote, the data demotes. The prior was sound; the data sharpens
scope and supplies grounds.

---

## 10. PROPOSED amendment text — the Enabling Consolidation Amendment

**PROPOSAL ONLY. Nothing below is enacted, and Run L2 does not exist until Jason ratifies this
document.** Pattern is the v22.7.0 III.III worked example (charter.html:196). Every replacement
keeps the principle and reaches no magnitude; every demoted magnitude re-enacts byte-identically in
its receiving instrument. **If any number would change, the amendment is out of scope and stops.**

**III.II** — replacing the enumerated figures at charter.html:190, keeping the surrounding text and
the derivation sentence:
> The indexed hourly premium and its layer scaling are federal law, enacted and recalibrated
> through the Article XXV.VI ladder and consolidated in VMSS Laws. The Charter fixes the
> entitlement and its derivation — the premium is the weekly subsidy value indexed by the hour,
> owed by the employer out of pocket — and reaches no rate.

**III.IV** — replacing the band inside the retained sentence at charter.html:201:
> Downward conversion is permitted only through authorized downward channels — a forfeiture,
> set by federal law and consolidated in VMSS Laws, that prevents arbitrage while allowing
> citizens to arrive in lower layers with limited capital.

**III.V** — replacing the five bands at charter.html:209–215, the two 24-month windows at
:206 and :216, and (per E-L1) the band-endpoint restatement inside III.IV at :202, which keeps its
pointer form:
> The retention schedule and the pre-positioning lookback window are federal law, enacted and
> recalibrated through the Article XXV.VI ladder and consolidated in VMSS Laws. The Charter fixes
> the principle — origin-layer assets are liquidated on a progressive scale, voluntary permanent
> residency must remain economically viable while still capturing value for the treasury, and
> pre-positioning does not shield assets from consequence — and reaches no band.

**III.VII / III.VIII** — replacing the triggers, rates, and windows at charter.html:230, :232,
:235, :239, :242:
> District-aggregate activation thresholds, garnishing rates, the rolling-average window and the
> attribution window are federal law, enacted and recalibrated through the Article XXV.VI ladder
> and consolidated in VMSS Laws. The Charter fixes the mechanism — a district-aggregate trigger,
> a pulse that locks at the start of each cycle, uniform application with no floor, no exemptions
> and no means testing, and automatic deactivation when the aggregate falls below its trigger —
> and reaches no threshold or rate.

**XXVII** — replacing the escalation rate and its worked illustration at charter.html:423,
occurrence-complete across the whole line per E-L2:
> The escalation rate is federal law, consolidated in VMSS Laws. The Charter fixes the
> architecture — comprehensive fiscal escalation measured against total parental inflow,
> compounding per child beyond the threshold, with the dividend never withheld at source and the
> children held harmless — and reaches no rate.

**Properties the drafting must keep provable** (handoff §7): no magnitude changes; no right
changes; no h2/h3 id changes; the Tier-1 index stays at 30 rows; every demoted magnitude appears
byte-identically in its receiving instrument.

---

## 11. PROPOSED in-world event record

**PROPOSAL ONLY — this is the one place Run L1 touches authored history, and it ships unenacted.**

House style derived mechanically from the 7 existing entries at law-polling.html:430–648
(LP-001, 046, 050, 052, 053, 057, 066). Each carries: `law-number` self-link · `law-title` ·
right-aligned `status-badge` phrased *"Failed at &lt;gate&gt;"* · 1–4 `law-summary` paragraphs ·
a `law-meta-grid` of exactly six fields in fixed order (**Scope** — the string *"Charter Amendment
(Article XI)"* verbatim in all 7 — **Filed**, **Vote Concluded**, **Drafter**, **Threshold**,
**Canon Anchor**) · `law-vote` > h4 *"Ratification Results"* > a four-row table in fixed gate order
(Meritboard Filibuster Floor / Supreme Court / Main Layer / Sanctuary Consensus), cells classed
`pass`/`fail` or plain *"Not reached"* after the terminating gate · closing italic `text-xs`
commentary giving the running failure tally.

Proposed entry:

- **Number:** LP-076 (highest existing is LP-075).
- **Title:** The Enabling Consolidation Amendment.
- **Scope:** `Charter Amendment (Article XI)` — verbatim.
- **Threshold:** `70% Meritboard · 7/10 Court · Main 80–90%+ · Sanctuary consensus · Presidential
  veto` — the string 6 of the 7 existing entries carry.
- **Canon Anchor:** `Article XI; Articles III.II, III.IV, III.V, III.VII, III.VIII, XXVII;
  Article XXV.VI; Whitepaper §10.6.1 (What the Charter Does Not Contain); LP-042; LP-064; LP-069;
  LP-070`.
- **Summary line the whole entry turns on:** the amendment changes no magnitude and no right. It
  relocates enumerated schedules to the tier that already recalibrates them, and replaces each with
  an enabling grant plus the retained principle. Main Layer's supermajority sits at the **lower**
  end of the 80–90% range, because charter.html:286 sets the point in range by *"the gravity of the
  proposed change"* and this change reaches no substantive rule.

**Three flags Jason must settle before L2 can author this — ALL THREE SETTLED at ratification
(handoff §13):** the number LP-076, the title, the dates **Filed 2296 / Vote Concluded 2299**, the
first-success-in-seven framing, and **licence to author the enacted-entry idiom at minimal delta
from the seven failed entries** are granted. The flags are retained below as the record of what was
outstanding and why.

1. **⚠ There is no enacted idiom in the Charter Amendments section.** All 7 entries failed; the
   section has no `status-badge` class, no passing vote-table phrasing, and no closing-commentary
   pattern for a success. The existing commentary line counts *consecutive failures* (*"seventh
   consecutive Charter-tier failure"*) — a success breaks that sentence's own form. This is
   authored canon idiom, not derivable from the corpus, and it is outside the register's licence.
2. **⚠ In-world date — flagged for review, as the spec requires.** The site's present is post-2295
   (LP-074's schedules effective 2295; a 2289–2298 window named at law-polling.html:2436; the
   latest year anywhere in the register is 2298). **Proposal: Filed 2296, Vote Concluded 2299.**
   Derived, not canonical — Jason sets it.
3. **⚠ The first success against a 7/7 record is a major canon event.** The register recommends the
   entry state *why* it passed where seven others failed — that it changes no number and no right —
   because that is the property the drafting is built to keep provable, and it is the honest
   in-world explanation.

---

## 12. Findings for Jason — canon defects the graph surfaced

Found while building the graph; none is in scope for L1 to fix, all are cheap.

| # | Surface | Defect |
|---|---|---|
| F-1 | `simulations.html:456` | Cites *"Article XXIII.II"* for nuclear-weapons development. The prohibition is **XXV.II**; Article XXIII is Zero Leakage Aspiration and **has no sub-articles**. Verified against charter.html:378 and :342. |
| F-2 | `why-vmss.html:532` | Cites *"The Article XIV provisions"* for the descent-asset schedule. Asset conversion is **III.V**; XIV is Proportional Response. |
| F-3 | `whitepaper.html:1692` | *"the Article XI gauntlet described in Section 8"* — the gauntlet is **§9**; §8 is security classification. |
| F-4 | `laws.html:765` | LP-002 (a PJS hourly-rate law) is anchored to *"Article III.I"*; PJS and the overtime premium live in **III.II**. Bears directly on §4.1's receiving-instrument analysis. |
| F-5 | `world.html:1156`, `:1165` | Attribute *"substrate neutrality"* to Article XXII. "Substrate" appears in charter.html only at :248 (Article IV). The metric-governance half of :1165 does match XXII; the substrate half may be misattributed or uncited. |
| F-6 | `charter.html:262` | *"the External Force Doctrine"* is a **dangling reference inside the Charter** — line 262 is its only occurrence and no Charter provision defines it. The latent corpus now supplies an instrument of that exact name (#36), so the reference resolves at federal tier but the Charter never says so. |
| F-7 | inventory B8 fields | `charter-touchpoints` reuse `charter.html:176` verbatim for **every** Article III sub-article and `charter.html:372` for every XXV sub-article. These are stale placeholders, not verified lines. The graph records the article label only and never propagates them. Harmless to this run; would mislead the next one. |

---

## 13. Judgments exercised beyond the spec, flagged for review

1. **§4.1's derivation-sentence keep (D-1)** is a scope refinement the spec did not anticipate.
2. **§6 case B recommends keeping** a magnitude the prior left open. A reviewer could read the
   ranges as a demotable parameter; the register's ground is that a bound on a delegated power is
   §10.6.1 Charter content.
3. **§4.3's lookback receiving instrument is genuinely open** — settlement (Central Banking
   Authority) vs. attribution (LP-069/070 family). Recorded, not decided. **CLOSED at ratification
   to the Central Banking Authority** (architect recommendation adopted; see §4.3).
4. **`Canon Anchor` typing.** The register-lens typed Charter articles appearing *only* in an
   entry's `Canon Anchor` meta field as **E4** (weaker choice per instruction). If a reviewer reads
   `Canon Anchor` as a parent-authority field, roughly **70 E4 rows re-type to E1 in bulk**. This
   is the single largest typing sensitivity in the graph. It would not change any §3 or §4 result
   — every affected provision is already load-bearing on other grounds — but it would change the
   in-degree table in §2 materially.
5. **XXV.I–III range citations.** charter.html:262 and whitepaper.html:455 cite the range
   *"Articles XXV.I–XXV.III"*; the lens emitted one edge against XXV.I. Fanning out to XXV.II and
   XXV.III would raise their in-degree and strengthen §6 case A further. Not done, to avoid
   inventing evidence.
6. **One extraction lens returned `truncated: true`** — the simulations/records citation lens,
   which reports the truncation as *deliberate consolidation* of ~225 pedagogical Article citations
   in `documents/academy-source.html` and `documents/resources-source.html` down to ~20
   representative rows, not an output cutoff. Those are PDF-generation sources at explainer rank;
   they carry no E1/E2 and cannot change a classification. Recorded rather than re-run.
7. **`docs-review/` was outside the magnitude lenses' stated scope** and is excluded from the E3
   worklist. Its mining drafts carry many further magnitude matches; they are drafts, not published
   surfaces. `.claude/worktrees/` copies were excluded from every lens (verified: zero edges cite a
   worktree path).

---

## 13b. Completeness-critic results (the handoff §3 proof obligation)

Three adversarial critics ran against the extraction, each independently re-deriving ground truth
from `charter.html` rather than trusting it. Both completeness critics returned **GAPS_FOUND**.
Their findings are recorded in full here and in the graph's `criticFindings`. **No finding changes
any §3 classification or any §4 candidate** — verified line by line — but two are load-bearing for
L2 and are not buried.

**Magnitude completeness — the numeric ledger closes exactly.** The critic re-enumerated
charter.html:147–474 and confirmed that *every* `$`, `%`, `x`, `n/n`, and `n:n` literal — including
all 12 leakage-trajectory rows and both 24-month lookbacks — has exactly one owning node. That is
the handoff §3 obligation discharged for numerics.

**⚠ Finding N-1 — negative magnitudes.** All of the magnitude critic's genuine misses are a class
the extraction had no rule for: **magnitudes expressed as an absence.** *"There is no minimum wage
in VMSS"* (charter.html:190), *"No minimum participation quorum is imposed"* (:286), *"There is no
limit on consecutive terms"* (:336), and *"+1 Sanctuary votes by consensus — not a supermajority,
full agreement"* (:286) are all operative magnitudes stating a floor, quorum, ceiling, or threshold
of **none**. They carry no digits and no mechanical sweep will see them.
*Consequence for L2:* the purity guard proposed in handoff §8 scans for magnitude *strings*. It
would not notice a negative magnitude being relocated, added, or lost. Two of these sit inside
demotion candidates' provisions — `no minimum wage` is in III.II — and the register keeps every one
of them at Charter tier as L3 stances. The guard must be told they exist.

**⚠ Finding N-2 — intra-Charter magnitude restatement.** Several magnitudes are stated at **two
Charter locations**: III.VIII:242 restates III.VII's *"$10 billion district aggregate trigger and
5% monthly rate"*; XI:294 restates all five XXV.VI ladder thresholds; VII:266 and II:175 both carry
the 85-point floor; XI:286's `80–90%` band is owned twice within XI itself.
*Consequence for L2:* a demotion must relocate **every occurrence**, and the consolidation-fidelity
guard must count occurrences rather than test existence. §4.4 already treats III.VIII:242 as
travelling with III.VII; this finding is why that is mandatory rather than tidy. Combined with the
§4.2 `90-99%` collision warning (LP-071's net-worth cap shares III.IV's digits), the guard design
for L2 must be **rule-scoped and occurrence-counting**, not digit-matching.

**Deontic completeness — 9 clause-granularity gaps, 8 mislabels, 24 duplicate clusters.**
Every line the critic named *does* carry a node; what it found are **distinct deontic clauses
sharing a line with a covered clause** — e.g. charter.html:440's *"enforced by the AI governance
system through the same implant-ledger infrastructure"* sits on the same line as the 80%
ratification threshold that owns it. This is a genuine granularity gap and is reported as one, not
softened. All nine sit in III.VII's keeps, XXV, XXV.VI, XXVIII.I, XXVIII.II, or XXVIII.III — every
one already load-bearing on independent grounds, so no classification moves. The 8 `deontic`
mislabels (e.g. `iii-v-prepositioning-lookback-24-months` labelled `prohibition` where its text is
an obligation) are metadata errors in the graph, not classification errors: the L1–L4 test reads
`kind` and in-degree, not `deontic`. The 24 duplicate clusters are canon's own cross-article
restatements that the extraction mirrored instead of deduplicating — the same phenomenon as N-2.
One literal id collision (`xi-pillar-article-marker`, emitted twice) was dropped by the assembler's
dedup; raw 422 nodes → 421 committed.

**⚠ Finding N-3 — the extraction has a systematic over-conferring bias, and it does not change a
single result.** The third critic was prompted to *refute* every E1/E2 edge. It found **41
mistypes, and every one of the 41 inflates a non-conferring edge into E1 or E2. Zero E1/E2 edges
were found deflated into E3** — the 15+ E3 spot-checks all held as restatement. Five patterns:
the inventory's own `restates-content` touchpoint fields typed E2 (7); section and glossary
headings carrying a parenthetical article citation typed E1 while structurally identical headings
elsewhere were typed E3 (4); **comparison, contrast, and outright negation sentences typed E2** (7
— e.g. *"mirrors XI"*, *"in deliberate contrast to Article XI, which excludes them"*, *"needs no
Article XXVIII petition"*, *"are not a third trigger"* — the cited rule operates with the article
removed); bare restatements typed E2, several with an E3-typed twin of the same sentence elsewhere
(13); and quote/anchor provenance failures (6).

Two are worth naming because they would have conferred status from text that *denies* it:
`law-polling.html:699` (LP-003) was typed E1 to XI from an Outcome row reading *"Petitioners
declined to pursue Article XI gauntlet"* — a record that the route was **not** taken; and
`pending-ratification.html:129` was typed E2 to III.III from a dual-key ruling that holds
III.III's rate content to be **restatement, not engraving** — the opposite of a constitutive
dependency.

**Impact test, run mechanically: no classification moves.** Applying all 41 corrections, the
provisions that lose conferring edges are XI (−8), XXV.VI (−4), XXII (−4), XXV (−3), Preamble (−3),
VIII (−3), and thirteen others at −1 or −2. **Every one is a keep that remains load-bearing by a
wide margin** — XI retains 15 E1 / 29 E2; XXV.VI retains 107 E1. Among the five demotion
candidates, four are untouched (III.II, III.IV, III.VII/VIII, XXVII lose **zero** corrected edges)
and **III.V loses two**, taking it from E2=9 to E2=7. That does not change §4.3's result and mildly
strengthens it: §4.3's whole argument is that III.V's E2s are *pointers to the schedule* rather
than dependencies on band values, and two of the nine turn out not to be dependencies at all.

The direction of the bias is the reassuring part. An extraction that over-confers produces
**false keeps**, never false demotions — it can only make the register too conservative about what
leaves the Charter. Since no candidate depended on an inflated edge, the demotion set is safe
against this error class. Full critic output, all 41 rows with corrected types, is in the graph's
`criticFindings`.

**Honest statement of what is proven and what is not.** The numeric-magnitude obligation is
discharged exactly. The deontic-clause obligation is discharged at line granularity and
**substantially but not exactly at clause granularity** — nine known exceptions, all enumerated
above, none in a candidate. A future run should not read this register as claiming clause-level
exhaustiveness it did not achieve.

## 14. Gate

Per handoff §6: `documents/charter-dependency-graph.json` and this register are committed and the
branch pushed. **STOP.** No PR, no merge, never main. Jason ratifies this register personally
before any Run L2 enactment exists.
