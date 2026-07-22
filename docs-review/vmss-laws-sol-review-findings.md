# Sol Peer Review — Findings (verbatim)

> **Provenance (architect header — everything below the rule is Sol's text, unedited).**
> Reviewer: "Sol" (ChatGPT, running in Codex with read-only repository access).
> Brief: `docs-review/vmss-laws-sol-review-brief.md` at commit `4f65d46`.
> Review target: `feat/vmss-laws-v23.0.0` at `4f65d46036cfe9356e5ebc491b02985ef56ac72b`.
> Relayed by Jason on 2026-07-21; committed verbatim per the triage protocol in §17 of the
> load-bearing handoff. Sol's file links use his local checkout paths (`F:/Programming/VMSS/...`);
> they are preserved as received. Architect triage: Part IV of
> `docs-review/vmss-laws-loadbearing-review.md`.

---

**Canon baseline: 136 passed / 0 failed.** Derived inventory: archive 94; Charter sections 30; versions 26; Law Polling 90; Academy/resources 33/33; FAQ 79; Why VMSS 32.

Review state: `feat/vmss-laws-v23.0.0` at `4f65d46036cfe9356e5ebc491b02985ef56ac72b`, synchronized with `origin`; final tree clean. I made no file changes.

Overall severity: **BLOCKER** — 1 blocker, 3 major findings, 2 minor findings.

## S-1 — Procedural legitimacy

### Gate-by-gate audit

| Gate | Requirement | LP-076 record | Result |
|---|---|---|---|
| Charter structure | No covert article removal | 30 `<h2>` headings before and after; titles unchanged | Pass |
| Meritboard | 70% | 88% | Pass |
| Supreme Court | 7/10 | 9/10 | Numerically passes; scope opinion is materially incomplete under S2-F1 |
| Main Layer | 80–90%, gravity-set | 81% against an 80% point | Pass numerically |
| Sanctuary | Full agreement among votes cast at close | "Reached — … no standing dissent bloc" | Not adequately proved; S1-F2 |
| Presidential veto | Must remain available after all gates | Narrative says it was not exercised; results table has no row | Substantively asserted, formally incomplete; S1-F3 |
| Federal receiver enactments | Each proposed federal law must independently clear XXV.VI | No lower-layer vote or concurrent federal ballot exists | **Fails; S1-F1** |

The seven failed Charter entries—LP-001, LP-046, LP-050, LP-052, LP-053, LP-057, and LP-066—and LP-076 all use exactly the same six meta-fields, in the same order:

`Scope → Filed → Vote Concluded → Drafter → Threshold → Canon Anchor`

They also use the same four vote rows:

`Meritboard Filibuster Floor → Supreme Court → Main Layer → Sanctuary Consensus`

LP-076 therefore **copied the failed-entry form exactly**. That consistency is real, but the form was designed for measures that died before the final gate. The first success needed an affirmative Presidential disposition row. Because LP-076 also enacted federal-tier text, it additionally needed an XXV.VI result block or linked concurrent enactment record.

### S1-F1 — BLOCKER: LP-076 enacted federal instruments without the mandatory federal electorate

**Exact evidence:** Article XXV.VI says, "Federal law binds all five layers, so all five layers participate in ratification" and "Any single track failing terminates the draft. All three must clear independently." [charter.html:398](</F:/Programming/VMSS/VMSS Website/charter.html:398>)

LP-076 says, "Every relocated magnitude re-enacts at its receiving instrument," but its results contain only the four Article XI rows. [law-polling.html:661](</F:/Programming/VMSS/VMSS Website/law-polling.html:661>) [law-polling.html:672](</F:/Programming/VMSS/VMSS Website/law-polling.html:672>)

**Claim:** LP-076's Article XI vote could amend the Charter, but it could not simultaneously mint or amend federal law without the independent XXV.VI three-track population ratification.

**Reasoning:** Article XI deliberately excludes -1, -2, and -3. Article XXV.VI deliberately includes them because federal rules bind their daily lives. The electorates are different, not nested; calling Article XI "stricter" cannot substitute for the missing constituency.

The branch expressly:

- Mints the federal Overtime Premium Protocol.
- Adds rates to LP-064.
- Adds parameters to LP-069 and LP-070.
- Amends the federal-tier Central Banking Authority.

The prior LP-064 ballot, for example, enacted collection mechanics in 2206 but did not enact the escalation rate later inserted in 2299. [law-polling.html:2151](</F:/Programming/VMSS/VMSS Website/law-polling.html:2151>) The Code confirms that the rate was added only through LP-076. [laws.html:714](</F:/Programming/VMSS/VMSS Website/laws.html:714>)

No secondary or pending record supplies a concurrent XXV.VI ballot. Numerical identity does not dispense with enactment requirements.

**Impact:** A lower-layer litigant can argue that the Charter numbers were validly removed while the intended federal replacements never became law, leaving the schedules orphaned or unenforceable. This reaches overtime wages, liquidation, garnishment, and replenishment liability.

**Minimum cure:** Supply or conduct a concurrent XXV.VI enactment covering every receiving instrument, including Meritboard, Court, Sanctuary, Main, lower-layer aggregate, and Presidential disposition. Until that record exists, the branch should not describe the receivers as enacted.

### S1-F2 — MAJOR: "No standing dissent bloc" does not certify Sanctuary unanimity

**Exact evidence:** Article XI defines consensus as "not a supermajority, full agreement" among those who cast a vote by close. [charter.html:282](</F:/Programming/VMSS/VMSS Website/charter.html:282>)

LP-076 records: "Reached — window closed with no standing dissent bloc." [law-polling.html:676](</F:/Programming/VMSS/VMSS Website/law-polling.html:676>)

**Claim:** Absence of an organized dissenting bloc is not proof that the final count contained zero dissenting votes.

**Reasoning:** One standing "no" vote defeats full agreement even if it is not a bloc. The narrative also acknowledges published objections; it does not establish whether every objector ultimately voted yes, abstained, rescinded, or remained no. "Reached" states the legal conclusion without publishing the fact that conclusion depends on.

**Minimum cure:** Record the closing tally explicitly—yes, no, abstention—and certify zero final no votes. If any final no remained, the amendment failed.

### S1-F3 — MINOR: The first-success record lacks a complete final-gate audit trail

**Exact evidence:** Article XI places the Presidential veto after all prior gates. [charter.html:283](</F:/Programming/VMSS/VMSS Website/charter.html:283>) LP-076's narrative says "the Presidential veto was not exercised," but its results table stops at Sanctuary. [law-polling.html:661](</F:/Programming/VMSS/VMSS Website/law-polling.html:661>)

**Claim:** The veto fact is narrated but not formally certified in the enactment results, and the related gravity-setting consultation is likewise undocumented.

**Reasoning:** The omission probably does not invalidate LP-076 by itself because non-exercise is affirmatively stated. It nevertheless makes the first success less auditable than its own threshold field promises. Article XXII also says the President sets amendment thresholds "in consultation with the Court"; LP-076 identifies the Presidency as setter but does not certify that consultation. [charter.html:327](</F:/Programming/VMSS/VMSS Website/charter.html:327>)

**Minimum cure:** Add a `Presidential veto — not exercised` result with date/certification, and state that the 80% point was set before voting after consultation with the Court.

### Strongest in-world litigant attack

A -3 employer disputing the `$15.63/hr` premium has the cleanest standing:

> Article XI excluded my layer. Article XXV.VI says my layer's aggregate consent is required before federal law binds my daily life. LP-076's Charter vote may have removed the constitutional rate, but it did not enact the federal Protocol. No lower-layer vote exists, so the claimed federal obligation never took effect.

That argument uses the Charter's express electorate distinction, not a technicality. It is stronger than the Sanctuary-record attack because the absence of the federal ballot is facial and undisputed.

## S-2 — Substantive preservation

### Five-schedule comparison

| Provision | What left the Charter | Receiving law | Present actor-facing result |
|---|---|---|---|
| III.II | `$125 / $62.50 / $31.25 / $15.63` hourly cascade | Overtime Premium Protocol | Same printed employer premiums, subject to the derivation defect in S5-F1 |
| III.IV | 90–99% downward-conversion forfeiture | Central Banking Authority | Same conversion burden and retained purchasing-power gradients |
| III.V | Five retention bands and two 24-month lookbacks | Central Banking Authority | Same liquidation percentages and lookback duration |
| III.VII/VIII | `$100B/$50B/$25B/$10B` triggers, 10%/5% rates, 90-day and 24-month windows | LP-070 upper; LP-069 lower | Same nominal garnishment obligations |
| XXVII | 40→60→90→135 worked schedule and 50% compounding | LP-064 | Same intended parental burden, but the receiver fails to make the 40% baseline operative; S3-F1 |

The numeric comparison is clean: no printed magnitude changed. If the receivers were lawfully enacted, no current invoice, forfeiture, liquidation, garnishment, or replenishment calculation was intended to change.

That does **not** make the amendment legally empty. Each rule moved from:

- 70% Meritboard to 60%.
- 7/10 Court to 6/10.
- Sanctuary unanimity to 90%.
- Main 80–90% to 70–80%.
- No lower-layer vote to a 70–80% lower-layer aggregate.
- Constitutional supremacy to subordinate federal law.

### S2-F1 — MAJOR: "No right changed; only the register changed" misstates the amendment's legal incidence

**Exact evidence:** LP-076 says it "changes no number and no right" and its "only effect on a citizen is which register a schedule is read from." [law-polling.html:661](</F:/Programming/VMSS/VMSS Website/law-polling.html:661>)

Article XXV.VI calls lower-layer participation "genuine standing" and says their consent is required because federal law reaches daily life. [charter.html:402](</F:/Programming/VMSS/VMSS Website/charter.html:402>)

**Claim:** Although current numbers were preserved, LP-076 changed amendment authority, entrenchment, voting constituencies, and consent standing for every relocated obligation.

**Reasoning:** Lower-layer residents gained a future vote; Sanctuary lost its unanimity protection; Main, the Court, and Meritboard face lower thresholds. Federal lawmakers gained authority they did not possess while the figures were supreme Charter text. Those are immediate legal effects even if today's dollar value is unchanged.

The related assertion that all schedules were "already being recalibrated by federal instruments" is also too broad. Federal instruments administered adjacent mechanics, but they could not lawfully alter contrary Charter numbers. The Overtime Protocol is newly minted; the Central Banking Authority has no ladder record; LP-064/069/070 state that their received parameters were added only in 2299.

Because the institutional gates adopted this "empty of substance" framing, the overstatement is material to ratification legitimacy.

**Minimum cure:** Replace the holding with something like:

> LP-076 changes no present magnitude or substantive entitlement. It does change the competent lawmaking tier, future ratification constituencies, and degree of entrenchment for each relocated schedule.

The Court's scope note should acknowledge that procedural standing and constitutional protection changed.

## S-3 — Receiving instruments and corpus propagation

### Every grant-to-receiver pair checked

| Charter grant | Receiving Code entry | Result |
|---|---|---|
| III.II | LP-076, Overtime Premium Protocol | Printed schedule matches |
| III.IV | Founding, Central Banking Authority | 90–99% forfeiture and visitor/elective retention endpoints match |
| III.V | Founding, Central Banking Authority | All five bands and both 24-month windows match |
| III.VII upper | LP-070 | `$100B/10%/90-day` and `$50B/5%` match |
| III.VII lower + III.VIII | LP-069 | `$25B`, `$10B`, 5%, and 24-month pro-rata attribution match |
| XXVII | LP-064 | 50% compounding and 40→60→90→135 illustration copied, but not made unconditional |

I also swept Whitepaper §§10.5–10.6.1, Systems, World, FAQ, Why VMSS, layer dossiers, simulations, Academy/resources sources, and pending-ratification records. No pending record supplies the missing XXV.VI enactment.

I did not duplicate the proposal's recorded N-1 through N-8 or G1 findings. Those already cover the stale Charter attributions, wrong retention receiver, pre-positioning attribution, External Force Doctrine gloss, III.IV/III.V conflation, asymmetric tier labeling, Article XXI gloss, and unguarded Charter TOC. [codification proposal](</F:/Programming/VMSS/VMSS Website/docs-review/vmss-laws-codification-proposal.md:587>)

### S3-F1 — MAJOR: LP-064 states the 40% baseline only hypothetically while the Charter makes child five categorically insolvent

**Exact evidence:** LP-064 says, "**If** a family's baseline aggregate effective rate is 40%," followed by 60%, 90%, and 135%. [laws.html:710](</F:/Programming/VMSS/VMSS Website/laws.html:710>)

The Charter now says the federal schedule reaches liability exceeding total inflow "at the fifth child." [charter.html:419](</F:/Programming/VMSS/VMSS Website/charter.html:419>)

**Claim:** The federal receiver provides a worked conditional, not an operative baseline capable of satisfying the Charter's fixed fifth-child result.

**Reasoning:** With 50% compounding, fifth-child liability is `baseline × 1.5³`. It exceeds 100% only when the baseline exceeds approximately `29.63%`. A 25% baseline produces `84.375%` at child five, contradicting the Charter's categorical result. FAQ, Systems, and the Whitepaper treat 40% as the actual baseline, but LP-064—the controlling federal receiver—does not.

This directly challenges the inside review's disposition that the ordinals safely bind the federal schedule. The theory is sound; the enacted receiver does not yet implement it.

**Minimum cure:** Change the federal text to:

> The baseline aggregate effective rate is 40% for households within the escalation's +1, Main, and -1 scope. The first and second children add no burden. The rate compounds by 50% for each child beyond the second: 60% at the third, 90% at the fourth, and 135% at the fifth.

Alternatively, if the baseline is intended to vary, the Charter must state a constraint rather than a categorical fifth-child result.

## S-4 — Voice, form, and canonical style

**No separate S-4 findings.**

Rejected suspects:

- The repeated enabling-grant formula is slightly legalistic but matches III.III and the Charter's existing jurisdictional voice.
- LP-076's self-skeptical "empty of substance" commentary reads as an in-world institutional reservation, not repository voice.
- One LP number carrying an amendment title in Law Polling and a minted instrument title in the Code is unusual but expressly blessed by the recorded house convention. [load-bearing review](</F:/Programming/VMSS/VMSS Website/docs-review/vmss-laws-loadbearing-review.md:228>)
- Thirty headings remain before and after; no title, anchor, or article was silently removed.

The procedural form defects are already captured in S1 rather than duplicated here.

## S-5 — Fresh-eyes audit

### Candidate ledger

| Candidate tested | Disposition |
|---|---|
| Charter amendment used as federal enactment | Promoted to S1-F1 |
| Sanctuary "bloc" versus zero dissent | Promoted to S1-F2 |
| Missing successful-veto row | Promoted to S1-F3 |
| "Only the register changed" | Promoted to S2-F1 |
| Conditional 40% baseline | Promoted to S3-F1 |
| Overtime derivation and rounding | Promoted to S5-F1 |
| One number/two titles/two tiers | Dismissed: expressly ratified convention |
| Grant-formula asymmetry | Known O-4 issue; answered in S6 |
| Presidency as threshold setter | Dismissed as new-power concern: Article XXII already assigns it |
| Article-count or anchor loss | Dismissed mechanically: 30/30 |
| Secondary N-1 through N-8/G1 drift | Already recorded; not duplicated |
| Frozen pending-record discrepancies | Dismissed as intentionally historical |
| Overtime omission of "Sanctuary" in the Code sentence | Dismissed: III.I gives Sanctuary/Main the same baseline and the retained layer-scaling derivation covers it |
| Thin constitutional keeps | Re-prosecuted independently in S6 |

### S5-F1 — MINOR: The retained overtime derivation lacks both the `/20` operator and a rounding rule

**Exact evidence:** The Charter says the weekly subsidy equals the monthly subsidy divided by four, and calls the premium "the weekly subsidy value indexed by the hour." [charter.html:190](</F:/Programming/VMSS/VMSS Website/charter.html:190>)

The receiver says the `$2,500` weekly value "implies" `$125/hr` and that every figure is recoverable from the Charter. [laws.html:853](</F:/Programming/VMSS/VMSS Website/laws.html:853>)

**Claim:** The asserted arithmetic requires an unstated division by 20 and an unstated half-cent rounding convention.

**Reasoning:** The intended calculation is evidently:

`monthly subsidy ÷ 4 weeks ÷ 20 qualifying hours`

That yields `$125`, `$62.50`, `$31.25`, and `$15.625`. The last printed rate is `$15.63`, so the Code also assumes rounding to cents. Neither operation is actually written. Paying `$15.63` per hour before multiplication differs from calculating exact aggregate liability and rounding once.

The branch preserved the legacy printed value, but its stronger assertion that every figure is recoverable is false without these rules.

**Minimum cure:**

> The hourly premium equals one-twentieth of the weekly subsidy value. The per-hour schedule is rounded to the nearest cent, half up, before multiplication by qualifying overtime hours.

## S-6 — Adversarial legal questions

### 1. Grant-formula asymmetry

It is **legally nonfatal for future recalibration**, because Article XXV.VI independently requires every proposed federal law to clear its ladder. A terse statement that a parameter "is federal law" cannot create a bypass.

It is still bad constitutional drafting. The asymmetry made the LP-076 dual-enactment defect easier to miss and invites arguments that "set by federal law" describes status without specifying amendment procedure.

My preferred exact uniform formula is:

> The [named parameter set] is federal law, enacted, amended, and recalibrated only through the Article XXV.VI ladder and consolidated in VMSS Laws. The Charter fixes [the named architecture or constraint] and reaches no [rate, band, threshold, or window].

Apply it consistently to:

- III.II's hourly premium and layer scaling.
- III.IV's downward-conversion forfeiture band.
- III.V's retention bands and lookback windows.
- III.VII/VIII's thresholds, rates, and windows.
- XXVII's escalation baseline and multiplier.
- The separate III.VII savings-base/attribution specification if it remains expressly federal.

The word **only** is useful: it makes the independent federal enactment requirement unmistakable.

### 2. Main Layer threshold setter

The allocation is defensible and is not new procedural canon. Article XXII expressly assigns the President the role of "setting amendment thresholds in consultation with the Court." [charter.html:327](</F:/Programming/VMSS/VMSS Website/charter.html:327>)

The inside review's statement that Article XI names the range but not the setter is therefore mistaken. [load-bearing review](</F:/Programming/VMSS/VMSS Website/docs-review/vmss-laws-loadbearing-review.md:249>)

The residual process risk is narrower:

- The Charter does not state when the point becomes immutable.
- LP-076 does not certify Court consultation.
- The result record does not state that the 80% point was announced before voting.

The safe practice is to publish the gravity point at filing, certify Court consultation, and prohibit alteration after the vote window opens.

### 3. Fifth- and sixth-child ordinals

The inside review's legal theory is coherent: child five's insolvency crossover is a Charter constraint on federal calibration, while child six's immediate consequence remains directly constitutional.

That necessarily overconstrains the federal schedule—but by design. Federal law may change rates only inside the space where child five still exceeds total parental inflow. Moving the crossover would require Article XI.

The present defect is implementation, not allocation: LP-064's conditional "if 40%" does not actually guarantee the Charter result. S3-F1's baseline cure is therefore required before the declared ordinal interpretation works.

### Thin keeps: independent prosecution and verdict

For every hypothetical demotion below, the new changer would be the XXV.VI coalition: 60% Meritboard, 6/10 Court, Sanctuary 90%, Main 70–80%, lower-layer aggregate 70–80%, subject to Presidential veto.

| Text | Strongest demotion case and surviving reading | What breaks; strongest defense | Verdict |
|---|---|---|---|
| Four Founding Lines + Founding Affirmation | Symbolic, sparse, and largely non-operative; could survive as a federal interpretive canon | Federal placement would let a lower tier redefine the founding core that Articles XI and XXV.VI treat as constitutionally distinct. They supply interpretive identity even without dependency edges | **KEEP — 99%** |
| Article XVI, System Stability | Open-ended policy aspiration; a federal stability standard could administer volatility without changing placement criteria | It constrains every tier's system design and prevents short-term majorities from authorizing destabilizing movement mechanics | **KEEP — 80%** |
| Article XVII, Resistance to Exploitation | Could become a federal anti-gaming design statute; many specific exploit closures already exist below | It is a system-wide constitutional design constraint, not one exploit rule. Demotion lets the system enact rules that affirmatively reward gaming | **KEEP — 88%** |
| Article XIX, Feedback Loop Awareness | Overlaps Article XX and could survive as a federal audit duty | It requires the decision architecture itself to model endogenous effects; deleting its supremacy narrows constitutional review of self-reinforcing harms | **KEEP — 74%** |
| Article XXIII, Zero Leakage Aspiration | The dated trajectory is expressly "not a promise" and resembles a planning roadmap suited to federal administration | Because it is non-operative, demotion would not improve recalibration; it would instead turn a constitutional direction into an ordinary policy objective. Its purpose is to define the social contract's measuring direction | **KEEP — 65%** |
| Article XXIV, Leakage Gradient & Medical Access | Service levels and forecasts could be administered as federal infrastructure policy | It defines what residents are and are not constitutionally promised across layers, including the absence of guaranteed -3 medical access. That is layer ontology and rights-boundary text | **KEEP — 96%** |
| Article XXVI, Substance Use | Could be an ordinary federal criminal classification: punish harm, not ingestion | It supplies a liberty rule—no criminal or layer consequence for harmless use—and constrains what lower-tier criminal law may prohibit | **KEEP — 98%** |
| III.IV purchasing-power gradients | The ranges are approximate, emergent, and central-bank administered; a federal CBA schedule could operate unchanged | They bound delegated monetary power and preserve silo integrity. Without a supreme range, the bank/federal coalition could recalibrate settlement strongly enough to defeat the retained anti-arbitrage architecture | **KEEP — 79%** |

I therefore sustain every challenged keep, though XXIII is the closest case. Its trajectory is constitutional context rather than an enforceable parameter; if future cleanup separates context from operative law, that should be an editorial reorganization, not a quiet federal demotion.

## Overall verdict

**BLOCK MERGE AS ENACTED CANON.**

Required order of cure:

1. Establish independent XXV.VI ratification for every federal receiver.
2. Publish an exact Sanctuary closing tally.
3. Add Presidential non-veto and threshold-consultation certification.
4. Correct the "no right/only register" account of legal incidence.
5. Make LP-064's 40% baseline operative.
6. Specify the overtime `/20` derivation and rounding convention.

After those changes, rerun the canon gate and repeat the receiver-pair audit. The current 136/0 result proves structural synchronization, not legal validity.

## Non-coverage

- I did not assess whether the fictional economic schedules are empirically desirable or physically realistic beyond internal arithmetic.
- I treated frozen pending and historical records as evidence, not proposed edit targets.
- Per instruction, `.claude/` and `docs-review/sol-packet/` were excluded from the corpus sweep.
- I performed no visual/UI, accessibility, or browser-rendering review.
- No files, commits, tags, or other repository state were changed beyond the expressly permitted branch checkout/fast-forward.

[REVIEW COMPLETE]
