# Records 25.6.1, unit schedreg: reconstruction ledger

Drafts only. No live source was edited. The three drafts in this folder are:

- `path-2-schedule-source.md`: the reconstructed §10.4 Schedule. It replaces `documents/path-2-schedule-source.md`.
- `path-2-risk-register-source.md`: the reconstructed Residual-Risk Register. It replaces `documents/path-2-risk-register-source.md`.
- `build-path2-pages.mjs`: a full copy of `tools/build-path2-pages.mjs`. Only six lines differ: 456 and 461 (Charter hero sub and banner paragraph), 492 and 497 (Schedule), 523 and 528 (Register). The rulings chrome from v25.6.0 and all code are byte-identical.

Checker: `node docs-review/records-25.6.1/schedreg/check.mjs`. It reads the drafts, the live sources and the committed pages, and writes nothing. Besides the ledger, it runs the draft generator in memory on the drafts and the live generator on the live sources, then compares the two builds and applies the check-canon (g) pins, the guard-mutation probe strings and the World-tier guards to the draft-built pages.

Matching conventions:
- Section (a) quotes are matched against the draft's visible text. For the two Markdown drafts that is the generator's own `sourceText()` (Markdown markers stripped, table cells joined by spaces), with whitespace collapsed and curly quotes read as straight. For the .mjs draft it is the Charter, Schedule and Register build blocks with tags stripped and entities decoded.
- Section (b) strings are matched byte for byte against the raw draft (or the draft-built page, for `built:` headings), with whitespace collapsed only. Rows marked absent must not occur.
- Where the original carried a fact in a metaphor, a reversal or an aphorism that the reconstruction dropped, the row gives the original wording in single quotes and then quotes the draft text that carries its content.

## Word counts

Prose words. For the Markdown drafts: the whole `sourceText()` (headings and table cells included). For the .mjs draft: the six permitted literal lines only.

| Document | Live | Draft | Change |
|---|---|---|---|
| path-2-schedule-source.md | 1675 | 1748 | +4.4% |
| path-2-risk-register-source.md | 2408 | 2685 | +11.5% |
| build-path2-pages.mjs | 346 | 361 | +4.3% |

Register tells, counted by check.mjs as live → draft (prose only; headings, bold labels and the #/Sev/Status cells excluded):
- Reversal constructions ("is not A; it is B", "; it does not", "not A, but B"): Schedule 0 → 0, Register 2 → 0, chrome 0 → 0.
- Prose em-dashes: Schedule 14 → 0, Register 22 → 0, chrome 3 → 0. The em-dashes left are in headings and bold labels (`OM — Net Discounted…`, `RR-1 — Judgment…`, `PART A — …`), which are frozen.
- Semicolons: Schedule 22 → 0, Register 40 → 0, chrome 4 → 0 (the Register's title-block semicolons sit in frozen heading lines).

## (a) Fact ledger

### path-2-schedule-source.md

Title block (heading lines, unchanged)
- Title: `SCHEDULE TO THE PATH 2 CHARTER (§10.4) — SECOND DRAFT (TERMINAL)`
- Scope: `Enumerated Welfare Measures, Interval Families, and Preprocessing Methods`
- Adopted by the chambers with the Charter: `Adopted by the chambers with the Charter`
- Amendable only per §13.1; date 2279 (Y178): `Amendable only per §13.1 · 2279 (Y178)`
- Amended after cold methodological review: `Amended after cold methodological review`
- Residues at RR-9 through RR-12: `residues engraved at Register entries RR-9 through RR-12`

Preliminary ruling of construction
- Heading: `Preliminary ruling of construction`
- §10.5 menu union governs alternative ESTIMATORS of one estimand: `The Charter's §10.5 menu-union rule applies to alternative ESTIMATORS of one estimand.`
- 'not for choosing among welfare philosophies': `It does not apply to the choice among welfare philosophies.`
- Premise, rival conceptions: `If the controlling estimate were taken across rival conceptions of value`
- Harshest philosophy would decide every run in advance: `the harshest philosophy would decide every run in advance`
- 'A civilization picks what it counts as value once, in public, at adoption': `The civilization decides what it counts as value once, in public, at adoption`
- '— not per-run, where it can be shopped': `because a choice made run by run can be shopped`
- One Operative Measure fixed; conventions in text: `This Schedule fixes one Operative Measure, states its measurement conventions in text`
- Rival conceptions as Mandatory Diagnostics: `enumerates rival conceptions as Mandatory Diagnostics`
- Union confined under §A.4: `confines §10.5's union to estimators of the Operative Measure under §A.4's membership test`
- 'Whoever believes the civilization has chosen the wrong conception of value': `Anyone who believes the civilization has chosen the wrong conception of value`
- Lawful channel, §13.1 and the diagnostic record: `has §13.1 and the diagnostic record as the lawful channel`

PART A and A.1
- Part heading: `PART A — WELFARE MEASURES (Finding IV)`
- Section heading: `A.1 The Operative Measure (OM)`
- Defined term: `OM — Net Discounted Welfare Differential.`
- Present value of net welfare from private deployment of retained capital: `The present value of net welfare generated by private deployment of the retained capital`
- Minus the §3.4 counterfactual quantity: `minus the same quantity under §3.4's counterfactual`
- Thirty-year horizon: `summed over the thirty-year horizon`
- Canonical social discount rate published at lock: `discounted at the civilization's canonical social discount rate as published at lock`
- Scalar: `The OM is a SCALAR.`
- Pass comparison under §3.4 on the one-sided bound: `Its pass comparison under §3.4 is made on the one-sided bound`
- Of the discounted total itself, per Part B: `of the discounted total itself, constructed per Part B.`
- §5.6 vector rule governs Finding IV's concentration-event count: `The Charter's §5.6 vector rule governs Finding IV's concentration-event count`
- …and the annual-threshold Findings ('annual- threshold' wrap artifact joined): `and the annual-threshold Findings.`
- 'not this sum': `It does not govern this sum.`

A.1.1
- Label: `A.1.1 The contrast, made executable.`
- Treatment: `Treatment: deployment of the retained tranche`
- Retained tranche defined, 70 and 50 schedules: `the per-entity, per-year difference between the collections under the 70 and 50 schedules`
- Traced through the SCM property-attribution ledger: `as traced through the standing SCM property-attribution ledger`
- Untraceable flow generates no margin: `A flow not traceable through the ledger generates no margin.`
- 'untraceable is unattributed, and unattributed is zero': `An untraceable flow is unattributed, and an unattributed flow counts as zero`
- Always activation-unfavorable: `always in the activation-unfavorable direction`
- Counterfactual: `Counterfactual: deployment of the same tranche under the public-stream allocation function`
- Trailing-decade estimation, same ledger: `estimated from the trailing decade's realized public allocations in the same ledger`
- Unit of exposure: `Unit of exposure: the ledger-traced venture-year.`
- Attribution is identification: `Attribution of outcomes to traced deployment is identification`
- Governed by §4.5 and Part A.5: `governed by §4.5 conservatism and Part A.5`

A.1.2
- Label: `A.1.2 Unified margin rule.`
- Realized stream: `welfare is the discounted surplus stream from its realized availability date to horizon end`
- Minus counterfactual stream: `minus the discounted surplus stream from its counterfactual availability date to horizon end`
- Arrival date estimated under the locked design: `The counterfactual arrival date is estimated under the locked design`
- May exceed the horizon: `may exceed the horizon`
- No existence/acceleration boundary: `There is no existence/acceleration boundary.`
- Beyond horizon, full stream: `A venture whose counterfactual arrival falls beyond the horizon contributes its full within-horizon stream`
- 'one arriving a year later contributes one discounted year': `one whose counterfactual arrival is a year later contributes one discounted year`
- Continuous margin: `The margin is continuous in the arrival estimate`
- No forecast step makes a finite margin unbounded: `no forecast step converts a finite margin into an unbounded one`
- "Same venture" across the two regimes: `"Same venture" across the two regimes is decided by`
- Registry classification, finest granularity: `the canonical registry's product-and-function classification at the finest published granularity`
- Classification disputes under A.4: `Classification disputes are membership disputes under A.4.`

A.1.3
- Label: `A.1.3 Quality and variety.`
- Quality and variety surplus admissible only through: `Surplus attributable to quality and variety differentials is admissible only through`
- Published hedonic and quality-adjustment methods: `the canonical statistical authority's published hedonic and quality-adjustment methods`
- Same granularity as A.1.2: `applied at the same registry granularity as A.1.2`
- Below granularity is one product: `Differentiation below that granularity counts as one product.`
- 'The model-dependence that survives this rule': `The model-dependence that remains under this rule is engraved at RR-10.`

A.1.4
- Label: `A.1.4 Displacement netting, once.`
- Net of input surplus: `Each traced venture's margin is net of the surplus that its inputs`
- Inputs listed: `(talent, attention, coordination capacity, physical substrate)`
- Under the counterfactual allocation: `generate under the counterfactual allocation`
- Realized market and shadow prices per A.2: `valued at realized market and shadow prices per A.2's conventions`
- Against the REALIZED pattern: `against the counterfactual's REALIZED allocation pattern`
- 'not an imagined best alternative and not assumed idleness': `Neither an imagined best alternative nor assumed idleness is used as the comparison.`
- Netted once at venture level: `Displacement is netted exactly once, at the venture level`
- Under A.1.6: `under the accounting identity of A.1.6`

A.1.5
- Label: `A.1.5 External-cost netting.`
- Net of external costs: `Each traced venture's margin is net of its external costs`
- Three cost kinds: `(third-party harms, environmental costs, and systemic-risk contributions)`
- Canonical damage schedules at lock snapshot: `valued per the civilization's canonical damage schedules at the lock snapshot`
- Unscheduled demonstrated cost: `Where no canonical schedule prices a demonstrated external cost`
- Challenge-side panel may add a damage model under §4.4: `the challenge-side panel may add a damage model to the union under §4.4`
- §4.5 prices ambiguity against activation: `§4.5 prices the ambiguity against activation`
- 'valued at zero by silence': `No demonstrated external cost is valued at zero for lack of a schedule.`

A.1.6
- Label: `A.1.6 Accounting identity.`
- Formula, part 1: `OM = Σ over traced ventures of`
- Formula, part 2: `[discounted surplus differential (A.1.2, with A.1.3 adjustments) −`
- Formula, part 3: `displacement (A.1.4) − external cost (A.1.5)]`
- Each venture once, each cost once: `Each venture appears exactly once, and each cost is netted exactly once.`
- Verified in §11.4: `The identity is verified arithmetically in the §11.4 execution.`

A.2
- Heading: `A.2 Measurement conventions (fixed)`
- Marshallian, willingness-to-pay, uncompensated demand: `Surplus is Marshallian, measured by willingness-to-pay on uncompensated demand`
- Demand and supply systems under locked design: `constructed from demand and supply systems estimated under the locked design`
- Market boundaries: `Market boundaries follow the canonical registry classification.`
- Nonmarket and unpriced works: `Nonmarket and unpriced works enter only through reservation-price construction`
- New-goods method: `per the canonical statistical authority's published new-goods method`
- Taxes and transfers excluded: `Taxes and transfers are excluded from surplus`
- 'the OM measures welfare, not fiscal flows': `because the OM measures welfare`
- Findings I and II: `fiscal flows are the business of Findings I and II`
- Single canonical deflator at §6.3 vintage: `deflate to real terms by the single canonical deflator at the §6.3 vintage`
- 'no component-specific deflators': `Component-specific deflators are not used.`

A.3
- Heading: `A.3 Partial identification`
- Set-identified component: `Where a component of the OM is set-identified under the locked assumptions`
- The two components named: `(the counterfactual arrival date, the displacement opportunity set)`
- Bound-based member required: `the union must include a bound-based member`
- Valid confidence statements: `constructs valid confidence statements for the identified region`
- Named method: `the recognized partial-identification method named in the locked design`
- §4.5 takes the unfavorable end: `§4.5 takes the region's activation-unfavorable end.`
- Point-only union: `A union consisting only of point-identified members over a set-identified component`
- Incomplete union: `is an incomplete union`
- §9.2 checklist verifies the bound member: `The Registrar's §9.2 checklist verifies the presence of the bound member`
- Conformity item: `as a conformity item`

A.4
- Heading: `A.4 Membership test`
- If and only if: `An estimator is an estimator of the OM if and only if a derivation`
- Filed at §4.4 addition: `filed at its §4.4 addition shows that the object it estimates equals`
- Under this Schedule's conventions: `the OM under this Schedule's conventions`
- The three conventions: `A.1's contrast, A.2's surplus conventions and A.1.6's identity`
- Registrar verifies presence and arithmetic: `The Registrar verifies the derivation's presence and its arithmetic as conformity.`
- Appeal under §2.4: `Disputes over whether a derivation succeeds are appealable under §2.4`
- Decided as conformity to text: `the question is decided as conformity to this Schedule's text`
- Excluded objects: `Weighting schemes, compensated-demand constructions, and any object whose derivation`
- …are not estimators: `requires conventions other than A.2's are not estimators of the OM`
- 'whatever estimation vocabulary carries them': `whatever estimation vocabulary describes them`
- RR-11: `The semantic residue is engraved at RR-11.`

A.5
- Heading: `A.5 Attribution discipline`
- Assumptions stated: `Causal attribution of outcomes to traced deployment states its identification assumptions`
- In the locked design: `identification assumptions in the locked design`
- Contested assumptions per §4.5: `Contested assumptions are resolved per §4.5`
- Least favorable to activation: `computes the result under the admissible assumption least favorable to activation`
- Admissibility, §4.4 and §4.3: `Admissibility is established by §4.4 addition and §4.3 survival.`
- Correlation fails A.4: `Correlation presented as attribution fails the A.4 derivation.`

A.6
- Heading: `A.6 Mandatory Diagnostics (published, non-operative)`
- Every run, every member, each diagnostic: `Every run publishes, for every union member, each diagnostic computed`
- Mechanical transformation: `by mechanical transformation of that member`
- No separate estimators, no selective noncomputability: `No separate diagnostic estimators exist, so no diagnostic is selectively noncomputable.`
- Undefined transformation publishes the reason: `A member on which a transformation is undefined publishes the arithmetic reason`
- Verified in §11.4: `verified in the §11.4 execution`
- D-1: `D-1 Zero-discount variant. The member's OM at discount zero.`
- D-2 label: `D-2 Distribution-weighted variant.`
- D-2 content: `The member's OM under logarithmic consumption weights per the canonical series.`
- D-3 label: `D-3 Beyond-horizon share.`
- D-3 content: `The fraction of the member's margin arising from ventures`
- D-3 condition: `whose counterfactual arrival exceeds the horizon`
- D-4 label: `D-4 Public-capture fraction.`
- D-4 numerator: `Numerator: the member's estimated counterfactual surplus from the same traced ventures within the horizon.`
- D-4 denominator: `Denominator: the member's private-deployment surplus from the same ventures over the same horizon.`
- 'Published as the pair, not the quotient.': `Published as the pair, without the quotient.`
- D-5 label: `D-5 Concentration shadow.`
- D-5 content: `The Finding III activation-frequency projection`
- D-5 pair: `published beside the member's OM as the pair (frequency differential, OM)`
- 'not a ratio': `and never as a ratio`
- 'No division by a near-zero bound.': `No division by a near-zero bound occurs.`
- Diagnostics decide nothing: `Diagnostics decide nothing in the run.`
- 'the evidence base the §13.1 amendment channel argues from, engraved run over run': `Engraved run over run, they form the evidence base for the §13.1 amendment channel.`

PART B
- Part heading: `PART B — INTERVAL FAMILIES (§5.1)`
- One-sided, 95 percent, against activation: `All constructions are one-sided at 95 percent against activation.`
- OM construction targets the scalar total: `the construction targets the sampling distribution of the discounted scalar total directly`
- Summed bounds not admissible: `Summing pointwise or simultaneous annual bounds into a total is not admissible.`
- §5.6 for annual-threshold Findings: `For annual-threshold Findings, §5.6's simultaneous worst-year rule governs.`
- B-1 label: `B-1 Block bootstrap, studentized percentile.`
- B-1 block length: `Block length follows the canonical statistical authority's published automatic block-length rule.`
- 'studentized; centering at the estimate': `The statistic is studentized and centered at the estimate.`
- B-1 nonstationarity: `Nonstationarity is handled per the locked design's declared structure.`
- B-2 label: `B-2 Analytic, robust.`
- B-2 HAC: `Bartlett-kernel HAC variance with the published automatic bandwidth rule`
- B-2 cluster-robust with wild-cluster bootstrap: `or cluster-robust variance with the wild-cluster bootstrap mandatory below the effective-cluster threshold`
- B-2 threshold source: `stated in the locked design per the published small-cluster standard`
- B-2 max-t where §5.6 applies: `Where §5.6 applies, the construction is max-t simultaneous.`
- B-2 Bonferroni fallback: `The Bonferroni construction is admissible as a conservative fallback.`
- B-3 label: `B-3 Calibrated posterior quantile.`
- B-3 admissibility: `A Bayesian one-sided bound is admissible only with a preregistered operating-characteristic study`
- B-3 executed and escrowed at lock: `executed and escrowed at lock`
- B-3 at least 95 percent coverage: `demonstrates at least 95 percent repeated-sampling coverage of the one-sided bound`
- B-3 design space: `over the locked design space`
- 'prior class, parameterization, and sensitivity analysis locked with it': `The prior class, parameterization, and sensitivity analysis are locked with the study.`
- B-3 uncalibrated posterior: `An uncalibrated posterior is not a member.`
- B-4 label: `B-4 Identification-region bound.`
- B-4 content ('partial- identification' wrap artifact joined): `Confidence statements for set-identified components per the recognized partial-identification construction`
- B-4 named in locked design: `named in the locked design`
- B-4 enters the union per A.3: `They enter the union as A.3 requires.`
- Closed family list: `No family outside B-1 through B-4 may be selected.`
- '§10.5 applies: each panel selects; all selections enter the union.': `§10.5 applies: each panel selects, and all selections enter the union.`

PART C
- Part heading: `PART C — PREPROCESSING METHODS (§7.2)`
- 'Admissible beyond the §7.1 defaults, and nothing else': `Beyond the §7.1 defaults, only the following methods are admissible:`
- C-1: `C-1 Missing data. Multiple imputation only.`
- C-1 locked items, part 1: `The locked design states the missingness mechanism assumption, the imputation model`
- C-1 locked items, part 2: `the auxiliary variables, and a tipping-point sensitivity analysis published with the record`
- C-1 imputation models are members: `Imputation models are union members.`
- C-1 either panel may add under §4.4: `Either panel may add competing imputation models under §4.4`
- C-1 least favorable controls: `the least activation-favorable surviving member controls`
- C-1 no complete-case branch: `There is no complete-case branch.`
- 'Absence of a venue's outcome is itself an outcome to be modeled' (see flag 3): `A missing venture outcome is itself an outcome to be modeled`
- 'never a license to drop the venture': `never a ground for dropping the venture`
- C-2 label: `C-2 Deflation.`
- C-2 content: `The single canonical deflator series at the §6.3 vintage, for all components.`
- 'No alternatives.': `No alternative is admissible.`
- C-3: `C-3 Seasonal and population adjustment. The source authority's published method, and no other.`
- C-4: `C-4 Outliers. None.`
- 'An extreme observation is evidence, not noise.': `An extreme observation is evidence and is retained.`

PART D
- Part heading: `PART D — STATUS`
- Part of the Charter for §13.1: `This Schedule is part of the Charter for every purpose of §13.1.`
- Appendix A operationalizations under §10.3: `Selections from it at preregistration are Appendix A operationalizations under §10.3`
- No discretion beyond enumerated items: `confer no discretion beyond the enumerated items`
- Charter controls: `In any conflict, the Charter controls.`
- Preliminary ruling, then A.1.6: `the Preliminary ruling controls first, and A.1.6's identity controls next`

Closing note (italic)
- Adopted with the Charter: `Adopted with the Charter.`
- First window, 70/35/17/8 under LP-073: `During the first 2279–2288 window, the 70/35/17/8 schedule held under LP-073`
- Reason: `because no commencement duty existed`
- LP-075 compelled a process, selected no rate: `LP-075 later compelled a process but selected no rate.`
- Remedial lock 2292: `The remedial run locked in 2292`
- Applied in the 2294 audit: `applied this Schedule to the 2294 Path 2 audit`
- Findings I–IV, Schedule A: `Findings I–IV passed and Schedule A certified.`
- Lower audit, B1–B6, Schedule B: `The independent Lower audit passed B1–B6 and Schedule B certified.`
- Effective 2295: `Valid notice made 50/25/12.5/6.25 effective in 2295.`
- LP-073 historical: `LP-073 remains preserved as historical law.`

### path-2-risk-register-source.md

Title block (heading lines, unchanged)
- Title: `PATH 2 CHARTER — RESIDUAL-RISK REGISTER`
- 50 standing findings against v2: `Disposition of the 50 standing adversarial findings against v2`
- Adoption status: `Adopted alongside the Charter; part of the adoption record.`
- 2291 note: `2291 amendment note: LP-075 changed future commencement duty only.`
- 2293 note, part 1: `2293 amendment note: a §13.1-reviewed coupled-reversion rule made Schedule B dependent`
- 2293 note, part 2: `on an operative Schedule A and created a direct Lower-specific revocation route`
- Findings remain historical: `The adoption findings below remain historical dispositions`
- First no-run lawful: `the first 2279–2288 no-run was lawful under the then-operative §12.3`
- CURED: `Status codes: CURED (v3 text removes the exploit)`
- MITIGATED: `MITIGATED (v3 reduces it; named residue stands)`
- ACCEPTED: `ACCEPTED (residue engraved)`

Re-filed first-review findings (28)
- Heading: `Re-filed first-review findings (regression pass, 28 standing)`
- Table header: `# Status v3 disposition`
- 1, §4.5: `1 MITIGATED §4.5 identification conservatism prices contested attribution against activation.`
- 1, 'none excludes': `§4.4 panels add assumptions, and none excludes.`
- 1, residue: `none excludes. Residue → RR-1.`
- 2, §4.4 exclusion only by §4.3 floor: `2 CURED §4.4 adversarial construction: exclusion only by the §4.3 mechanical floor.`
- 2, 'curation abolished': `Curation is abolished.`
- 3, §§6.1–6.3 computed by formula: `3 MITIGATED §§6.1–6.3 compute window, cutoff and vintage by formula`
- 3, 'remove … selection entirely': `removing their selection entirely`
- 3, §6.6: `§6.6 adds exposure declarations.`
- 3, residue: `Residue → RR-3: memory cannot be escrowed.`
- 4, 'computed, not chosen': `4 CURED §§6.1–6.2: window and cutoff are computed, and neither is chosen.`
- 4, ten-year baselines: `§§3.2–3.3: baselines are the ten years ending at the cutoff.`
- 5, §3.1 enumeration snapshotted: `5 MITIGATED §3.1 enumerates the Restatement item by item, snapshotted at lock.`
- 5, §10.3: `§10.3 mandates canonical series.`
- 5, residue: `Residue → RR-2: mapping judgment where no canonical series exists.`
- 6, §3.2: `6 CURED §3.2 fixes the baseline by formula.`
- 6, attribution: `Attribution is governed by §4.5 conservatism under §4.4-constructed assumptions.`
- 11, §4.3 floor: `11 CURED §4.3 sets a charter-fixed validation floor`
- 11, benchmark: `(out-of-sample against a persistence benchmark)`
- 11, abolished: `Proponent-authored criteria are abolished.`
- 12, three cures: `12 MITIGATED §§1.1–1.2: top-of-ranking appointment. §1.4: mid-run recusal. §2.4: appeal.`
- 12, residue: `Residue → RR-4: alignment without enumerable interest.`
- 13, §2.4 appeal: `13 CURED §2.4: every Registrar determination is appealable to the Supreme Court`
- 13, burden and reasons: `the deviation claimant bears the burden, and reasons are published`
- 14, 'decided by executing, not predicting': `14 CURED §9.4 decides materiality by executing the recomputation instead of predicting its effect.`
- 16, inverted: `16 CURED §11.2 is inverted:`
- 16, escrow publication: `on a deadline breach, the Registrar publishes the escrowed compendium as the result`
- 16, consumes the window: `consuming the window`
- 16, suppression abolished: `Suppression by silence is abolished.`
- 17: `17 CURED §11.1, final sentence: an incomplete record voids certification, failure and void alike.`
- 20, content: `20 ACCEPTED Preregistration still carries content`
- 20, items: `union composition, §8.1 treatments, Appendix A within §10.3`
- 20, structural answer: `Structural answer: formulas (Art. VI), menus (§10.4), panels (§4.4), conservatism (§4.5).`
- 20, residue: `Irreducible residue → RR-1.`
- 24, classes: `24 CURED §4.6 equivalence classes: the bound runs over classes instead of members.`
- 24, charter-fixed, not self-authored: `The §4.3 floor is charter-fixed and not self-authored.`
- 25, precision floor: `25 CURED §5.3 sets the precision floor by arithmetic formula.`
- 25, indecidable designs: `Indecidable designs are void without consumption (§12.4(b)).`
- 26: `26 CURED §7.2 admits departures only from source-authority published methods or the §10.4 schedule.`
- 26, free text: `Free-text reasons are abolished.`
- 28, seal: `28 CURED §3.5 defines the seal in place`
- 28, conditioning and inputs: `conditioning is barred, and shared exogenous inputs are enumerated and identical`
- 28, dead cross-reference: `The dead cross-reference is removed.`
- 30, lock elements: `30 CURED §9.2: SHA-256 digest, canonical time authority, co-signature with the chambers clerk`
- 30, publication: `and publication to the chambers record`
- 31, vintage: `31 CURED §6.3: the vintage is the lock date, by formula`
- 31, symmetric: `symmetric for favorable and unfavorable revisions`
- 32, §8.1 classes: `32 CURED §8.1 enumerates minimum event classes plus panel additions.`
- 32, omission: `An omission is a material deviation attributed to Commission conduct, resolved under §§9.4–9.5.`
- 32, recomputation-defeating: `If it defeats recomputation, §12.4(b)(iv) requires a non-consuming replacement`
- 32, sanction: `sanctions the attributed entity`
- 34, correction: `34 CURED §11.3 supersession: a correction operates for every legal purpose`
- 34, reversal semantics: `reversal semantics are fixed in both directions`
- 35, reply: `35 MITIGATED §13.1: the reviewer's reply publishes before the vote`
- 35, flag (Charter §13.1 "dispositioned over the reviewer's standing objection"): `highest-severity dispositions made over the reviewer's standing objection are flagged to the Presidency`
- 35, veto consideration: `for veto consideration`
- 35, residue: `Residue → RR-5: the chambers may still adopt.`
- 36, §1.5/§1.7: `36 CURED §1.5 and §1.7 apply the canon identity doctrine`
- 36, identity: `(affiliates and substitutes are the entity)`
- 36, sanction: `Meritboard sanction enforces surviving duties.`
- 38: `38 CURED §2.5 milestone escrow: data at lock, code before analysis, compendium before issuance.`
- 38, 'escrow publication': `§11.2 publishes from escrow.`
- 40, inadmissible: `40 CURED §11.1: unpublishable data is inadmissible.`
- 40, lock condition: `Deposit and publication are secured at lock, or the series never enters a Finding.`
- 9: `9 CURED §10.4 enumerates interval families in the adopted schedule.`
- 9, menu union: `The §10.5 menu union makes selection symmetric and empty.`
- 10: `10 CURED §5.6 vector-to-bound rule: simultaneous coverage and a worst-year operative comparison.`
- 10, alternatives: `Alternatives are inadmissible.`
- 8: `8 CURED §3.4 fixes the counterfactual to the trailing decade's realized public deployment pattern.`
- 8, welfare measures: `Welfare measures come from the §10.4 schedule via the §10.5 union.`

Fresh v2 findings (22)
- Heading: `Fresh v2 findings (22)`
- 1, 'threshold-failing certification votes void': `1 CURED §1.6 voids votes certifying a threshold-failing Finding`
- 1, reproduction: `the instrument must reproduce the computed comparisons`
- 1, §11.4: `§11.4 execution gates issuance.`
- 2: `2 MITIGATED §2.1: Meritboard appointment, officer-standard tenure and removal, quarantines.`
- 2, appeal and residue: `§2.4: appeal. Residue → RR-4: someone appoints the appointers.`
- 3, fence justiciable: `3 MITIGATED §2.4 makes the §2.3 fence justiciable at the Supreme Court`
- 3, 'decided somewhere with authority, not claimed by either side': `a body with authority decides the boundary and neither side's claim settles it`
- 3, 'court capacity/latency': `Residue → RR-4: court capacity and latency.`
- 4: `4 CURED §9.2: checklist-bounded acceptance, a ninety-day clock, deemed acceptance, appeal.`
- 5: `5 CURED §9.2 lock mechanics: named digest, external time authority, co-signature, public record.`
- 6: `6 CURED §4.4: no exclusion of another party's addition`
- 6, floor: `except by the mechanical §4.3 floor`
- 7: `7 CURED §4.6 equivalence classes neutralize padding.`
- 8: `8 CURED §4.3: floor-failing members are excluded from the union and published.`
- 8, quoted ambiguity: `The ambiguity ("reported but excluded?") is resolved in text.`
- 9: `9 CURED §10.5 menu union: both panels' selections enter`
- 9, controlling bound: `the controlling bound is taken across all`
- 9, 'symmetric, therefore empty': `Menu shopping is symmetric and therefore empty.`
- 10: `10 MITIGATED The §10.3 canonical-series mandate narrows mapping discretion`
- 10, fence and residue: `§2.4 fences boundary disputes to the Court. Residue → RR-2.`
- 11: `11 CURED §§3.2–3.3: baselines are the ten years ending at the cutoff.`
- 12: `12 CURED §3.4 anchors the counterfactual to realized trailing-decade public deployment.`
- 13: `13 MITIGATED §4.5 prices contested identification against activation.`
- 13, entry: `Assumptions enter by §4.4 addition and §4.3 survival.`
- 13, residue: `Residue → RR-1: the assumption space itself.`
- 14: `14 CURED §5.6 simultaneous worst-year rule.`
- 15, 'snapshot-at-lock': `15 CURED §10.1: snapshot at lock.`
- 15, inter-run changes: `Inter-run changes to cross-referenced canon are Charter amendments requiring §13.1.`
- 16, 'consumption, not commencement, closes a window': `16 CURED §12.2: a window closes on consumption.`
- 16, commencement: `Commencement does not close it.`
- 16, replacement lock: `A §12.4(b) void permits one replacement lock.`
- 16, contradiction: `The contradiction is removed.`
- 17: `17 CURED §8.1: enumerated minimum, with omission attributed to Commission conduct.`
- 17, deviation: `§§9.4–9.5 govern the deviation`
- 17, replacement and sanctions: `if it defeats recomputation, §12.4(b)(iv) requires replacement and sanctions`
- 18: `18 CURED §2.5 escrow gives the Registrar custody of everything §11.2 publication requires.`
- 19: `19 CURED §11.3 supersession semantics apply in both directions, with rate consequences stated.`
- 20: `20 CURED §11.3 extends to Registrar-certified data-integrity defects.`
- 20, §14.4: `§14.4 routes later-sustained objections to revocation grounds.`
- 21: `21 CURED §13.2: revocation runs are expressly subject to §§12.1–12.2`
- 21, window: `as runs of their window`
- 22: `22 CURED §11.4: the Registrar executes the escrowed compendium`
- 22, matching: `matches output before issuance`

The engraved residues (RR-1 to RR-5)
- Heading: `The engraved residues`
- RR-1 label: `RR-1 — Judgment in identification.`
- RR-1, not enumerable: `The space of admissible causal assumptions cannot be enumerated by text.`
- RR-1, §4.4: `The structural answer is both-sides construction (§4.4)`
- RR-1, §4.3: `a mechanical survival floor (§4.3)`
- RR-1, §4.5: `conservatism pricing ambiguity against activation (§4.5)`
- RR-1, 'What remains: experts choose what to add.': `What remains is that experts choose what to add.`
- RR-1, disposition: `Accepted, priced, engraved.`
- RR-2 label: `RR-2 — Mapping judgment.`
- RR-2, mapping must be chosen: `Where no canonical series exists for an enumerated obligation, a mapping must be chosen.`
- RR-2, 'Narrowed by §10.3, fenced by §2.4.': `The choice is narrowed by §10.3 and fenced by §2.4. Accepted.`
- RR-3 label: `RR-3 — Memory.`
- RR-3, exposure: `No charter erases prior exposure to public history.`
- RR-3, 'Declared (§6.6)': `Exposure is declared (§6.6)`
- RR-3, 'formula-fixed away from choice (Art. VI)': `formulas fix what it could otherwise influence (Art. VI)`
- RR-3, 'not eliminable': `It is not eliminable. Accepted.`
- RR-4 label: `RR-4 — Residual trust in offices.`
- RR-4, the three: `Registrar appointment, court capacity, and alignment-without-interest are answered by the`
- RR-4, institutions: `civilization's standing institutions (Meritboard ranking, Supreme Court appeal, Presidential veto)`
- RR-4, not this Charter: `and not by this Charter`
- RR-4, regress: `an auditor-of-auditors regress terminates only in institutions and accountability`
- RR-4, 'relied upon, not restated': `The Charter relies on that design of VMSS without restating it. Accepted.`
- RR-5 label: `RR-5 — Adoption sovereignty.`
- RR-5, adopt over objection: `The chambers may adopt over a standing objection, which is flagged to the veto.`
- RR-5, 'A civilization that could not do this': `A civilization without that power would have transferred sovereignty to its reviewers.`
- RR-5, disposition: `Accepted, by design.`

Institutional-design cross-check findings (12)
- Heading: `Institutional-design cross-check findings (second review, cold, on the third draft, 12)`
- Table header: `# Sev Status v4 disposition`
- O-1, rebuilt: `O-1 1 CURED §4.4 is rebuilt.`
- O-1, 'panels hold mandates, not interests': `Panels hold mandates and are not interested parties.`
- O-1, duty: `Addition is a duty: the strongest surviving candidate per Finding`
- O-1, 'or a signed none-exists statement': `or a signed statement that none exists`
- O-1, scoring: `Performance is scored on the Meritboard`
- O-1, 'the financial stakes the quarantine rightly bars' ('rightly' dropped, flag 6): `merit stakes replace the financial stakes the quarantine bars`
- O-1, §1.4 carve-out (quoted term): `§1.4 carve-out: the mandate is not an "advocacy role."`
- O-1, 'merit incentives vs. true partisan hunger': `Residue → RR-7: merit incentives against true partisan motive.`
- O-2, symmetric: `O-2 1 CURED §1.6 binds votes symmetrically:`
- O-2, failing vote: `a vote failing a passing Finding is void`
- O-2, certifying vote: `exactly as a vote certifying a failing one`
- O-2, §11.4: `§11.4 verifies that disposition matches comparison for every instrument, certifying or failing.`
- O-3, inverted: `O-3 1 CURED §9.5 is inverted.`
- O-3, 'recomputable deviations no longer void': `Recomputable deviations no longer void`
- O-3, publishes on recomputed result: `the run publishes on the recomputed result`
- O-3, 'deviation buys no exit': `so deviation gives no exit`
- O-3, recomputation-defeating: `Only recomputation-defeating deviations void, non-consuming with replacement (§12.4(b)(iv))`
- O-3, entity: `the attributed entity is removed, sanctioned and excluded`
- O-3, residue: `Residue → RR-6.`
- O-4, three routes: `O-4 1 CURED Dead states are closed on all three routes.`
- O-4 (a): `(a) §2.1: a deputy Registrar and a ninety-day fill, with clocks tolled while vacant.`
- O-4 (b): `(b) The §9.2 executability check at acceptance`
- O-4 (b), burden: `§11.4 execution over class representatives bound the burden at lock`
- O-4 (c): `(c) §11.4 makes a missing §2.5 deposit a recomputation-defeating deviation`
- O-4 (c), resolution: `attributed to Commission conduct, resolved through §12.4(b)(iv)`
- O-5, ministerial: `O-5 2 CURED §9.2: the clerk's co-signature is ministerial`
- O-5, ten days: `deemed given after ten days`
- O-5, publication: `Registrar publication alone completes lock.`
- O-6, mechanical: `O-6 2 CURED §13.1: reviewer selection is mechanical`
- O-6, top-ranked: `the top-ranked eligible entity on the audit-methodology ranking, quarantined from sponsors`
- O-6, 'Nobody picks their own reviewer.': `No party picks its own reviewer.`
- O-7, tolling: `O-7 2 CURED §2.4: appeals toll §11.2`
- O-7, 'ninety-day decision or default affirmance' (Charter §2.4 "affirmed by default"): `the Court decides within ninety days or the Registrar's determination stands affirmed by default`
- O-7, one-year cap: `aggregate tolling is capped at one year`
- O-7, 'Litigation is not a clock.' (aphorism cut; the cap carries it): `aggregate tolling is capped at one year`
- O-7, residue: `Court-capacity residue remains at RR-4.`
- O-8, lock window: `O-8 2 CURED §12.2: a run belongs to its lock window`
- O-8, consumption: `its result consumes that window and no other`
- O-8, 'no concurrent runs anywhere': `Concurrent runs are barred everywhere.`
- O-8, closures: `The boundary straddle and the double-live-run are both closed.`
- O-9, taxonomy: `O-9 2 CURED The §12.4(b) predicate is rewritten as an enumerated void taxonomy`
- O-9, per-type: `with per-type consequences`
- O-9, §5.3: `§5.3 cross-references §12.4(b)(ii) directly.`
- O-9, 'the "before analysis" predicate is gone': `The "before analysis" predicate is removed.`
- O-10, 'iterative cascade …, not a single designee': `O-10 2 CURED §1.4: an iterative cascade down the competence ranking replaces the single designee.`
- O-10, exhaustion: `Exhaustion is a competence-collapse void, §12.4(b)(iii), non-consuming with replacement.`
- O-11, fresh panels: `O-11 2 CURED §13.2 seats fresh panels at every revocation lock.`
- O-11, 'may grow, never shrink': `The union may grow and never shrinks`
- O-11, 'faces a fattened union': `a thin-union certification faces a larger union on review`
- O-11, compounding: `O-1's cure addresses the compounding with O-1.`
- O-12, sunset: `O-12 3 MITIGATED §1.3 sunsets to disclosure after two windows.`
- O-12, 'First-window thinness stood': `First-window thinness remained`
- O-12, none constituted: `if no credible Commission could be constituted early, none was`
- O-12, lawful status quo: `original §12.3 made that the lawful status quo`
- O-12, 'not a failure': `which did not count as a failure`
- O-12, LP-075: `LP-075 later closed prospective omission by requiring commencement without weakening the methodology.`
- O-12, residue: `Residue → RR-8.`

Engraved residues (RR-6 to RR-8)
- Heading: `Engraved residues (continued)`
- RR-6 label: `RR-6 — The sabotage allocation.`
- RR-6, 'No consumption rule starves both saboteurs': `No consumption rule denies a benefit to both saboteurs.`
- RR-6, 'consuming a deviation-void pays the refuser': `Consuming a deviation-void rewards the refuser`
- RR-6, 'releasing it offers the certifier a re-roll': `releasing it gives the certifier a replacement run`
- RR-6, v4 chooses release: `v4 chooses release`
- RR-6, §9.5 reason: `§9.5 recomputation already denies the certifier the exit that made a replacement run valuable`
- RR-6, §11.2 reason: `the §11.2 escrow denies suppression`
- RR-6, pricing: `It prices what remains at removal, sanction, exclusion and a one-replacement cap.`
- RR-6, 'buy one fresh draw per window': `One insider can still obtain one replacement run per window`
- RR-6, 'at the cost of a career': `at the cost of a career`
- RR-6, disposition: `Priced, capped, engraved.`
- RR-7 label: `RR-7 — Manufactured motive.`
- RR-7, 'the partisan hunger true adversarial process runs on': `§4.4's mandates and Meritboard scoring substitute merit stakes for the partisan motive`
- RR-7, adversarial process: `that drives a true adversarial process`
- RR-7, 'Scored duty is better than unrewarded permission': `A scored duty is better than an unrewarded permission`
- RR-7, not guaranteed: `is not guaranteed to equal a motivated antagonist`
- RR-7, 'Accepted: the alternative — seating genuinely interested parties': `Accepted, because the alternative, seating genuinely interested parties`
- RR-7, reopens capture findings: `reopens every capture finding both reviewers filed`
- RR-8 label: `RR-8 — The first window.`
- RR-8, 'collided hardest in 2279–2288': `The historical quarantine and the competence pool conflicted most in 2279–2288.`
- RR-8, original §12.3 premise: `Under the original §12.3, if the civilization could not field a Commission it trusted`
- RR-8, first decade, rates held: `in the first decade after Charter adoption, the rates held`
- RR-8, 'which was the then-operative promise, not a failure': `That was the then-operative promise and did not count as a failure.`
- RR-8, LP-075 treatment: `LP-075 later treated the resulting omission as a procedural defect for future windows`
- RR-8, remedial run: `required a remedial run`
- RR-8, did not retroactively relabel the first window unlawful (verb shared with LP-075 review set R2 and LP075-R2): `It did not retroactively relabel the first window unlawful.`
- RR-8, 'Accepted as history; prospectively constrained.': `Accepted as history and prospectively constrained.`

Schedule findings (17)
- Heading: `Schedule findings (cold methodological review of the Schedule's first draft, 17)`
- Table header: `# Sev Status Schedule v2 disposition`
- S-1, executable: `S-1 1 CURED A.1.1 makes the contrast executable:`
- S-1, treatment: `treatment is traced through the standing SCM property-attribution ledger`
- S-1, 'counterfactual = public allocation function': `the counterfactual is the public allocation function from that ledger's trailing decade`
- S-1, zero margin: `Untraceable flows generate zero margin, always in the activation-unfavorable direction.`
- S-1, 'Residue (ledger coverage) → RR-9': `Residue → RR-9: ledger coverage.`
- S-2, conventions: `S-2 1 CURED A.2 fixes the conventions in text:`
- S-2, 'Marshallian, WTP, uncompensated demand': `Marshallian surplus, willingness-to-pay, uncompensated demand, registry market boundaries`
- S-2, rest: `the canonical new-goods reservation-price method, taxes and transfers excluded, a single deflator`
- S-3, damage schedules: `S-3 1 CURED A.1.5 nets external costs per the canonical damage schedules.`
- S-3, unscheduled costs: `Unscheduled demonstrated costs enter through challenge-side damage models under §4.4`
- S-3, §4.5: `with §4.5 pricing the ambiguity against activation`
- S-3, 'No cost zeroed by silence.': `No cost is zeroed for lack of a schedule.`
- S-4, identity: `S-4 1 CURED A.1.6 accounting identity:`
- S-4, 'one venture, one appearance, one netting': `each venture appears once and each cost is netted once`
- S-4, §11.4: `verified arithmetically in the §11.4 execution`
- S-5, limit: `S-5 1 CURED A.1.2 unified margin: existence is the continuous limit of acceleration`
- S-5, beyond horizon: `(counterfactual arrival beyond the horizon)`
- S-5, 'no boundary, no cliff, no year-31 exploit': `There is no boundary, no discontinuity and no year-31 exploit.`
- S-6: `S-6 1 MITIGATED A.1.3 admits quality and variety only through`
- S-6, hedonic methods: `the canonical authority's published hedonic methods at fixed registry granularity`
- S-6, one product: `Sub-granularity differentiation is one product.`
- S-6, residue: `Model-dependence residue → RR-10.`
- S-7: `S-7 1 MITIGATED A.1.4 values displacement against the counterfactual's realized allocation`
- S-7, prices: `at market and shadow prices`
- S-7, exclusions: `with no imagined best alternatives and no assumed idleness`
- S-7, netted once: `netted once under A.1.6`
- S-7, 'GE-closure residue': `General-equilibrium closure residue → RR-10.`
- S-8: `S-8 1 MITIGATED A.4 membership test:`
- S-8, derivation: `a filed derivation must reduce the estimated object to the OM under A.2's conventions`
- S-8, Registrar: `The Registrar verifies presence and arithmetic as conformity`
- S-8, disputes: `disputes go to §2.4 as conformity to text`
- S-8, residue: `Semantic residue → RR-11.`
- S-9: `S-9 1 CURED B-3 calibration: posterior bounds are admissible only`
- S-9, ≥95%: `with a preregistered, escrowed operating-characteristic study showing ≥95% frequentist coverage`
- S-9, uncalibrated: `Uncalibrated posteriors are not members.`
- S-10: `S-10 1 CURED A.3 and B-4: a set-identified component requires`
- S-10, member: `an identification-region bound member in the union`
- S-10, point-only: `a point-only union is incomplete at the §9.2 checklist`
- S-10, §4.5: `§4.5 takes the region's unfavorable end.`
- S-11: `S-11 1 CURED C-1 strikes the complete-case branch entirely.`
- S-12: `S-12 1 CURED C-1: imputation models are union members added by either panel.`
- S-12, locked items: `The mechanism assumption, auxiliaries and tipping-point sensitivity are locked and published.`
- S-12, control: `The least-favorable surviving member controls.`
- S-13: `S-13 1 CURED C-2: a single canonical deflator for all components.`
- S-13, struck: `The discretionary-basket alternative is struck.`
- S-14: `S-14 2 CURED A.1 and the Part B preamble: the OM is scalar`
- S-14, target: `constructions target the discounted total's sampling distribution directly`
- S-14, inadmissible: `Summed pointwise or simultaneous bounds are inadmissible`
- S-14, §5.6: `§5.6 is confined to annual-threshold comparisons.`
- S-15: `S-15 2 CURED B-1 and B-2 fix the construction defaults:`
- S-15, B-1/B-2 defaults: `automatic block-length rule, studentization, Bartlett HAC with automatic bandwidth`
- S-15, wild-cluster: `wild-cluster bootstrap below the effective-cluster threshold`
- S-15, 'max-t/Bonferroni conservative fallback': `max-t with Bonferroni as conservative fallback`
- S-16: `S-16 2 CURED A.6: diagnostics are mechanical transformations of union members`
- S-16, no separate estimators: `with no separate estimators and no selective computability`
- S-16, undefined: `Undefined transformations publish their arithmetic reason, verified in execution.`
- S-17: `S-17 2 CURED D-4 and D-5 are published as component pairs, never quotients`
- S-17, division: `so no division occurs at the decision boundary`

Engraved residues (RR-9 to RR-12) and close
- RR-9 label: `RR-9 — Ledger coverage.`
- RR-9, 'The OM sees only': `The OM counts only what the SCM property-attribution ledger traces.`
- RR-9, zero margin: `Deployment outside the ledger's reach generates zero margin.`
- RR-9, conservative: `That is conservative by construction`
- RR-9, decay: `a civilization whose ledger coverage decays measures less value than exists`
- RR-9, statistics: `The Registrar publishes ledger-coverage statistics with every run. Accepted.`
- RR-10 label: `RR-10 — Model-dependence of welfare measurement.`
- RR-10, the three: `Quality adjustment, variety valuation, and displacement's general-equilibrium closure`
- RR-10, model-dependent: `remain model-dependent after every convention this Schedule can fix`
- RR-10, reviewers: `as they are in every real methodology this Schedule's reviewers cited`
- RR-10, pricing: `The adversarial union and §4.5 conservatism price the dependence against activation`
- RR-10, 'they do not eliminate it': `without eliminating it. Accepted.`
- RR-11 label: `RR-11 — The estimand/estimator boundary.`
- RR-11, decidable: `A.4's derivation test makes membership decidable in the cases that matter`
- RR-11, appeal: `leaves hard semantic edges to the appeal channel`
- RR-11, 'a boundary that can be argued': `A boundary policed by a court can still be argued.`
- RR-11, alternative v1: `The alternative, a boundary policed by nobody, was v1`
- RR-11, 'and it died in review': `which did not survive review. Accepted.`
- RR-12 label: `RR-12 — The conventions themselves.`
- RR-12, choice: `Marshallian surplus at a positive social discount rate is a choice`
- RR-12, conceptions: `among defensible welfare conceptions, made once, in public, at adoption`
- RR-12, diagnostics: `with the rival conceptions published as diagnostics every run`
- RR-12, 'the Preliminary ruling's point, not its oversight': `The Preliminary ruling makes that choice deliberately.`
- RR-12, 'Accepted — and amendable only through §13.1, in daylight': `Accepted, and amendable only through §13.1, on the public record.`
- Close, 'the Charter's honesty about itself': `This Register is the Charter's own account of its limits.`
- Close, zero residual risk: `A methodology that claimed zero residual risk`
- Close, most dangerous: `would be the most dangerous finding of all`
- Close, veto: `would deserve the veto the Presidency holds for instruments of exactly that kind`

### build-path2-pages.mjs

Charter page chrome. Title, description, kicker, hero title, pb-label and crosslink labels are unchanged.
- Page title: `The Path 2 Charter — LP-074 Certification Methodology • The Five Rings`
- Description, dates: `adopted in 2279 and amended in 2291 and 2293`
- Description, 2294 and 2295: `governed the complete 2294 LP-074 certification effective in 2295`
- Kicker: `The Five Rings · Path 2 · Certification Methodology`
- Hero, LP-074 requires the methodology: `The methodology LP-074 requires before a rate can move.`
- Hero, 'where a choice can be fixed, this Charter fixes it': `The Charter fixes every choice that can be fixed.`
- Hero, 'where judgment is irreducible, it converts judgment into adversarial mechanism': `Where judgment is irreducible, the Charter converts it into adversarial mechanism`
- Hero, pricing: `prices ambiguity against activation`
- Hero, 'Adopted 2279 and amended in 2291.' (2293 added, flag 8): `Adopted in 2279 and amended in 2291 and 2293.`
- Banner label: `Adopted 2279 · Amended 2291 and 2293 · Applied by the 2294 certification`
- Banner lead: `HISTORICAL ADOPTION, CURRENT CONTROL.`
- Adoption changed no rate: `Adoption in 2279 changed no rate.`
- 'original §12.3 made the 2279–2288 no-run window lawful': `Under original §12.3, the 2279–2288 window closed lawfully without a run.`
- LP-075 compelled the remedial process: `LP-075 later compelled the remedial process.`
- 'without changing a condition or setting a rate': `It changed no condition and set no rate.`
- Lock 2292, 2294 certification: `That process locked in 2292 and produced the complete 2294 certification.`
- Findings I–IV and Schedule A: `Findings I–IV passed and Schedule A certified.`
- 'B1–B6 independently passed, and Schedule B certified': `B1–B6 passed independently, and Schedule B certified.`
- Cascade in force 2295: `The complete 50 / 25 / 12.5 / 6.25 cascade entered force in 2295.`
- Crosslink labels: `§10.4 Schedule — enumerated measures`
- `Residual-Risk Register — the adoption record`
- `LP-074 — the register entry`
- `LP-075 — the commencement duty`
- `2294 certification — activation record`
- `LP-073 — historical rate law`
- `Presidential rulings — the adoption record`
- `RATIFY-TAX-50-II — the conditional statute`

Schedule page chrome
- Page title: `The §10.4 Schedule to the Path 2 Charter • The Five Rings`
- Description, second draft terminal: `second draft, terminal`
- Description, date and amendment: `Adopted with the Charter in 2279 (Y178); amendable only per §13.1.`
- Kicker: `The Five Rings · Path 2 · Enumerated Schedule`
- Hero title: `The §10.4 Schedule`
- Hero, the schedule: `The Charter's enumerated schedule of welfare measures, interval families and preprocessing methods.`
- Hero, 'one Operative Measure fixed in text': `It fixes one Operative Measure in text`
- Hero, 'rival conceptions of value published as diagnostics': `publishes rival conceptions of value as diagnostics`
- Hero, 'the union confined to estimators of that measure': `confines the union to estimators of that measure`
- Hero, 'Adopted with the Charter; amendable only per §13.1.': `Adopted with the Charter and amendable only per §13.1.`
- Banner label: `Adopted with the Charter · Applied by the 2294 certification`
- Banner lead: `PART OF THE CHARTER (§10.4).`
- 'the audit may select from': `interval families and preprocessing methods from which the audit may select`
- Part of the Charter for §13.1: `It is part of the Path 2 Charter for every purpose of §13.1.`
- Residues RR-9 through RR-12: `Its residues are engraved at RR-9 through RR-12 of the Register.`
- 'explicit treatment/counterfactual contrasts': `applied this Schedule to explicit treatment and counterfactual contrasts`
- Findings I–IV and Schedule A: `Findings I–IV passed and Schedule A certified.`
- 'B1–B6 were then independently evaluated': `B1–B6 were then evaluated independently, and Schedule B certified.`
- Crosslink labels: `Path 2 Charter — §10.4`
- `Residual-Risk Register — RR-9 … RR-12`
- `2294 certification — audit output`

Register page chrome
- Page title: `Path 2 Charter — Residual-Risk Register • The Five Rings`
- Description, twelve residues: `the twelve engraved residues RR-1 through RR-12 the methodology cannot close`
- Kicker: `The Five Rings · Path 2 · Adoption Record`
- Hero, 'the disposition of every standing finding … across two independent hostile reviews': `The disposition of every standing finding from two independent hostile reviews`
- Hero, Schedule cold pass: `and the Schedule's cold methodological pass`
- Hero, '— cured, mitigated, or accepted —': `each marked cured, mitigated or accepted`
- Hero, 'the twelve residues it engraves rather than paints over': `the twelve residues the methodology cannot close`
- Hero, 'Adopted with the Charter, part of the adoption record.': `Adopted with the Charter as part of the adoption record.`
- Hero, 'The Charter’s honesty about itself' (moved to the banner's wording): `It binds as the Charter's own account of its limits.`
- Banner label: `Adoption record · 2291 cadence amendment noted`
- Banner lead: `THE ADOPTION RECORD.`
- 'ships with the Path 2 Charter and its §10.4 Schedule': `This Register was adopted with the Path 2 Charter and its §10.4 Schedule.`
- Disposes of the findings: `It disposes of the standing adversarial findings against the instrument`
- Twelve residues RR-1 through RR-12: `engraves the twelve residues, RR-1 through RR-12, that no text can close.`
- 2291 annotation: `Its 2291 annotation records LP-075's procedural amendment`
- 'its 2293 annotation records coupled reversion': `its 2293 annotation records the coupled-reversion rule`
- 'No finding here activated a rate by itself': `No finding in the Register activated a rate by itself.`
- 2294 certification and notice, 2295: `The valid 2294 certification and notice made both LP-074 schedules effective in 2295.`
- Crosslink labels: `Path 2 Charter — the instrument`
- `2294 certification — final record`

## (b) Frozen-string checklist

Every entry is confirmed by check.mjs against its target, byte for byte with whitespace collapsed. The checker also confirms these structural invariants in code:
- both Markdown drafts: every heading line, `---` rule, table header and separator line, table key cells (#, Sev, Status) and cell count, bold span, italic label and whole-paragraph italic unchanged; list shapes unchanged; the rendered tag skeleton and the full id sequence (17 Schedule ids, 19 Register slugs and `rr-N` anchors) unchanged; longest body line no wider than live; no hyphen-at-line-end word split;
- the draft generator's own `renderDoc` + `linkFirst` + `assertVerbatim` pass on both drafts, and the Schedule anchor first occurs inside PART D;
- operative modal counts (shall/may/must/cannot/can) unchanged in both sources: Schedule may 4, must 1, can 1; Register may 3, must 3, cannot 2, can 3;
- the .mjs draft differs from live only on lines 456, 461, 492, 497, 523 and 528, with each line's tag and attribute sequence unchanged; `node --check` passes;
- the in-memory builds: the live generator reproduces all four committed pages byte for byte; the draft build of `pending-ratify-tax-50-rulings.html` is byte-identical to live; the draft Charter page's instrument body is byte-identical; on all three World-tier pages the head, kicker, title, pb-label, crosslinks, tag skeleton, id sequence and href sequence are unchanged, every `x.html#frag` resolves, and check-canon's founder, seat-name, superseded-outcome and tier-claim regexes find nothing.

### path-2-schedule-source.md
- Heading line: `# SCHEDULE TO THE PATH 2 CHARTER (§10.4) — SECOND DRAFT (TERMINAL)`
- Heading line: `## Enumerated Welfare Measures, Interval Families, and Preprocessing`
- Heading line: `## Methods · Adopted by the chambers with the Charter · Amendable only`
- Heading line: `## per §13.1 · 2279 (Y178) · Amended after cold methodological review;`
- Heading line: `## residues engraved at Register entries RR-9 through RR-12`
- Heading line (id ruling-of-construction): `## Preliminary ruling of construction`
- Heading line (id part-a, deep-link target): `# PART A — WELFARE MEASURES (Finding IV)`
- Heading line (id om): `## A.1 The Operative Measure (OM)`
- Heading lines (ids a-2 to a-6): `## A.2 Measurement conventions (fixed)`, `## A.3 Partial identification`, `## A.4 Membership test`, `## A.5 Attribution discipline`, `## A.6 Mandatory Diagnostics (published, non-operative)`
- Heading lines (ids part-b to part-d): `# PART B — INTERVAL FAMILIES (§5.1)`, `# PART C — PREPROCESSING METHODS (§7.2)`, `# PART D — STATUS`
- Rule: `---`
- linkFirst phrase: `This Schedule is part of the Charter`
- check-canon (g) pins carried by the source: `Operative Measure`, `PART D`
- Bold labels (paraAnchor a-1-N reads the leading A.1.N token): `**OM — Net Discounted Welfare Differential.**`, `**A.1.1 The contrast, made executable.**`, `**A.1.2 Unified margin rule.**`, `**A.1.3 Quality and variety.**`, `**A.1.4 Displacement netting, once.**`, `**A.1.5 External-cost netting.**`, `**A.1.6 Accounting identity.**`
- Bold labels, lists: `**D-1 Zero-discount variant.**`, `**D-2 Distribution-weighted variant.**`, `**D-3 Beyond-horizon share.**`, `**D-4 Public-capture fraction.**`, `**D-5 Concentration shadow.**`, `**B-1 Block bootstrap, studentized percentile.**`, `**B-2 Analytic, robust.**`, `**B-3 Calibrated posterior quantile.**`, `**B-4 Identification-region bound.**`, `**C-1 Missing data.**`, `**C-2 Deflation.**`, `**C-3 Seasonal and population adjustment.**`, `**C-4 Outliers.**`
- Italic labels: `*Treatment:*`, `*Counterfactual:*`, `*Unit of exposure:*`
- Closing note is italic: `*Adopted with the Charter.`, `preserved as historical law.*`
- Formula: `OM = Σ over traced ventures of [discounted surplus differential (A.1.2, with A.1.3 adjustments) − displacement (A.1.4) − external cost (A.1.5)].`
- Section references: `§10.5`, `§A.4's membership test`, `§13.1`, `§3.4's counterfactual`, `§5.6 vector rule`, `§4.5 conservatism`, `Part A.5`, `§4.4`, `§11.4 execution`, `§6.3 vintage`, `§9.2 checklist`, `§2.4`, `§4.3 survival`, `§5.1`, `§7.2`, `§7.1 defaults`, `Appendix A`, `§10.3`, `Finding IV`, `Findings I and II`, `Finding III`
- Figures and dates: `thirty-year horizon`, `70 and 50`, `95 percent`, `at least 95`, `discount zero`, `2279–2288`, `70/35/17/8`, `LP-073`, `LP-075`, `2292`, `2294`, `Findings I–IV`, `B1–B6`, `50/25/12.5/6.25`, `2295`
- Defined terms: `ESTIMATORS`, `SCALAR`, `REALIZED`, `Mandatory Diagnostics`, `existence/acceleration boundary`, `"Same venture" across the two regimes`, `ledger-traced venture-year`, `SCM property-attribution ledger`, `public-stream allocation function`, `activation-unfavorable direction`, `bound-based member`, `incomplete union`, `conformity item`, `Marshallian`, `willingness-to-pay`, `uncompensated demand`, `reservation-price construction`, `new-goods method`, `single canonical deflator`, `Bartlett-kernel HAC`, `wild-cluster bootstrap`, `max-t simultaneous`, `Bonferroni`, `operating-characteristic`, `tipping-point sensitivity analysis`, `complete-case branch`, `Multiple imputation only.`
- Operative modals: `may exceed the horizon`, `the challenge-side panel may add`, `the union must include`, `may be selected`, `Either panel may add`, `can be shopped`
- absent: `annual- threshold`
- absent: `partial- identification`
- absent: `venue's`

### path-2-risk-register-source.md
- Heading lines (title block): `# PATH 2 CHARTER — RESIDUAL-RISK REGISTER`, `## Disposition of the 50 standing adversarial findings against v2`, `## Adopted alongside the Charter; part of the adoption record.`, `## 2291 amendment note: LP-075 changed future commencement duty only.`, `## 2293 amendment note: a §13.1-reviewed coupled-reversion rule made`, `## Schedule B dependent on an operative Schedule A and created a direct`, `## Lower-specific revocation route.`, `## The adoption findings below remain historical dispositions; the first`, `## 2279–2288 no-run was lawful under the then-operative §12.3.`, `## Status codes: CURED (v3 text removes the exploit) · MITIGATED`, `## (v3 reduces it; named residue stands) · ACCEPTED (residue engraved)`
- Heading lines (slug ids): `### Re-filed first-review findings (regression pass, 28 standing)`, `### Fresh v2 findings (22)`, `### The engraved residues`, `### Institutional-design cross-check findings (second review, cold, on the third draft, 12)`, `### Engraved residues (continued)`, `### Schedule findings (cold methodological review of the Schedule’s first draft, 17)`
- Table headers: `| # | Status | v3 disposition |`, `| # | Sev | Status | v4 disposition |`, `| # | Sev | Status | Schedule v2 disposition |`
- Table separators: `|---:|---|---|`, `|---:|---|---|---|`
- Bold labels (paraAnchor rr-N reads the leading RR-N token): `**RR-1 — Judgment in identification.**`, `**RR-2 — Mapping judgment.**`, `**RR-3 — Memory.**`, `**RR-4 — Residual trust in offices.**`, `**RR-5 — Adoption sovereignty.**`, `**RR-6 — The sabotage allocation.**`, `**RR-7 — Manufactured motive.**`, `**RR-8 — The first window.**`, `**RR-9 — Ledger coverage.**`, `**RR-10 — Model-dependence of welfare measurement.**`, `**RR-11 — The estimand/estimator boundary.**`, `**RR-12 — The conventions themselves.**`
- check-canon pin and guard-mutation probe: `RR-12`
- Row keys: `| O-1 | 1 | CURED |`, `| O-12 | 3 | MITIGATED |`, `| S-1 | 1 | CURED |`, `| S-17 | 2 | CURED |`, `| 20 | ACCEPTED |`, `| 8 | CURED |`
- Quoted strings: `"advocacy role."`, `("reported but excluded?")`, `"before analysis"`
- Operative modals: `memory cannot be escrowed`, `cannot be enumerated by text`, `the instrument must reproduce`, `a mapping must be chosen`, `must reduce the estimated object`, `the chambers may still adopt`, `The chambers may adopt over a standing objection`, `The union may grow`, `One insider can still obtain`, `this Schedule can fix`, `can still be argued`
- Figures: `50 standing`, `28 standing`, `(22)`, `third draft, 12`, `first draft, 17`, `ten years`, `ninety-day clock`, `ninety-day fill`, `ninety days`, `ten days`, `one year`, `two windows`, `SHA-256`, `≥95%`, `year-31`, `2279–2288`, `one-replacement cap`, `one replacement run per window`, `first decade`
- Closing sentence carries the adoption ruling's paraphrase: `zero residual risk`, `deserve the veto the Presidency holds`
- absent: `founder's ruling`
- absent: `lawful nonactivation`
- absent: `Sol regression pass`
- absent: `Opus cold pass`

### build-path2-pages.mjs
- linkFirst calls: `body = linkFirst(body, 'a schedule adopted by the chambers', SCHEDULE + '#part-a');`, `body = linkFirst(body, 'This Schedule is part of the Charter', CHARTER + '#s-10-4');`
- Source reads: `const mdSchedule = read('documents/path-2-schedule-source.md');`, `const mdRegister = read('documents/path-2-risk-register-source.md');`
- Verbatim assertions: `const chars = assertVerbatim(mdSchedule, body, SCHEDULE);`, `const chars = assertVerbatim(mdRegister, body, REGISTER);`
- Slug reset: `REGISTER_SLUGS = new Set();`
- Id strategies: `if ((m = text.match(/^PART ([A-D])\b/))) return `
- Banner aria labels: `aria-label="Charter status"`, `aria-label="Schedule status"`, `aria-label="Register status"`
- Banner leads: `<strong>HISTORICAL ADOPTION, CURRENT CONTROL.</strong>`, `<strong>PART OF THE CHARTER (§10.4).</strong>`, `<strong>THE ADOPTION RECORD.</strong>`
- Banner links: `<a href="law-polling.html#lp-075">LP-075</a>`, `<a href="${CERTIFICATION}">2294 certification</a>`, `<a href="${CHARTER}#s-10-4">Path 2 Charter</a>`, `<a href="${REGISTER}#rr-9">Register</a>`, `<a href="${CERTIFICATION}">2294 record</a>`, `<a href="${CHARTER}">Path 2 Charter</a>`, `<a href="${SCHEDULE}">§10.4 Schedule</a>`
- Banner strong figures: `<strong>50 / 25 / 12.5 / 6.25</strong> cascade entered force in 2295`, `<strong>RR-1 through RR-12</strong>`
- pb-labels (unchanged): `<span class="pb-label">Adopted 2279 · Amended 2291 and 2293 · Applied by the 2294 certification</span>`, `<span class="pb-label">Adopted with the Charter · Applied by the 2294 certification</span>`, `<span class="pb-label">Adoption record · 2291 cadence amendment noted</span>`
- Crosslinks with anchors: `cx(SCHEDULE + '#part-a', 'is-primary', 'fa-list-ol', '§10.4 Schedule — enumerated measures'),`, `cx(CHARTER + '#s-10-4', 'is-primary', 'fa-scale-balanced', 'Path 2 Charter — §10.4'),`, `cx('law-polling.html#lp-074', '', 'fa-scale-balanced', 'LP-074 — the register entry'),`
- Rulings chrome from v25.6.0 (untouched): `The first, the adoption-posture review, directed the chambers to take up the Charter only in its amended form.`, `<span class="pb-label">Historical adoption record — 2279 (Y178)</span>`, `<strong>THE ADJUDICATION OF RECORD.</strong>`

### built: path-2-charter.html
- `THE PATH 2 CHARTER`
- `id="art-1"`, `id="art-14"`
- Guard-mutation probe: `id="s-10-4"`
- Deep-link target: `id="s-12-3"`
- `law-polling.html#lp-074`
- `path-2-schedule.html#part-a`
- `<strong>50 / 25 / 12.5 / 6.25</strong> cascade entered force in 2295`

### built: path-2-schedule.html
- `Operative Measure`
- `PART D`
- `id="part-a"`
- `<a href="path-2-charter.html#s-10-4">This Schedule is part of the Charter</a>`
- `path-2-risk-register.html#rr-9`
- `id="a-1-6"`, `id="ruling-of-construction"`, `id="part-d"`
- `<body`

### built: path-2-risk-register.html
- Guard-mutation probe: `RR-12`
- `id="rr-9"`, `id="rr-12"`
- `path-2-charter.html`
- `path-2-schedule.html`
- `id="the-engraved-residues"`, `id="engraved-residues-continued-2"`
- `<body`

### live: path-2-certification-2294.html (not in this unit; untouched)
- Certification positive controls: `SCHEDULES A AND B CERTIFIED`, `exactly 30 keyed annual observations`, `Main-12 106.7%`, `ADT-36 122.4%`, `complete ordered window SHA-256-attested`
- Guard-mutation probe: `<body`

## (c) Flags

1. **Every heading line is unchanged in both sources, the title blocks included.** The Register slugs every heading into an id, and the check treats heading lines as frozen. That covers the Register's title-block notes ("2293 amendment note: …", the status-code legend) and the Schedule's five-line caption. Both read as record apparatus already. Their semicolons and em-dashes stay because they sit in headings.
2. **Two wrap artifacts are fixed, and the rendered text changes accordingly.** The live pages read "annual- threshold" (A.1) and "partial- identification" (B-4), because a hyphen at a line end joins to the next line with a space. The drafts read "annual-threshold" and "partial-identification". check.mjs now fails on any hyphen-at-line-end split.
3. **"venue's" → "venture" in C-1 (reading decision).** The live text says "Absence of a venue's outcome is itself an outcome to be modeled". "Venue" occurs nowhere else in the Schedule. The unit of exposure is the venture-year, and the same sentence ends "drop the venture". I read it as a typo. The draft says "A missing venture outcome is itself an outcome to be modeled and never a ground for dropping the venture." If "venue" was deliberate, restore it.
4. **Register table cells: form.** The #, Sev and Status cells are unchanged. The disposition cells lose their semicolon chains and em-dashes. Where the original opened a cell with a section label and a colon (`§9.2:`, `§2.4:`), the draft keeps that apparatus form and follows it with plain sentences. The "Residue → RR-N" cross-reference arrow is kept as the Register's own convention. Parenthetical residue descriptions now follow the pointer: "Residue → RR-3: memory cannot be escrowed."
5. **Word growth.** Schedule +4.4%, Register +11.5%, chrome +4.3%. In the Register, 244 of the 277 added words are in the 81 table rows, about 3 per row. They are the articles and verbs needed to turn telegraphic fragments into sentences. The RR paragraphs grew by 33 words. If Jason wants the tables denser, the fragment form can return row by row without touching any fact.
6. **Dropped wording with no fact attached.** Each is listed in section (a) with the draft text that carries the content.
   - 'rightly' (O-1, "the quarantine rightly bars").
   - 'Litigation is not a clock.' (O-7). The one-year aggregate cap and the ninety-day decision carry it.
   - 'in daylight' → 'on the public record' (RR-12).
   - 'The Charter’s honesty about itself' and 'rather than paints over' (Register hero). The banner already says "the Charter’s own account of its limits", and the Register's closing sentence now says the same.
   - 'died in review' → 'did not survive review' (RR-11).
   - 're-roll' / 'fresh draw' → 'replacement run' (RR-6). This is the §12.4(b) mechanism the metaphor named: one replacement lock per window.
7. **Cross-document paraphrases still hold.** Ruling 2 (adoption, Part II) paraphrases this Register:
   - Its "closing sentence … a methodology claiming zero residual risk would deserve the veto" still matches the closing sentence.
   - RR-6 now reads "denies a benefit to both saboteurs", which is the ruling's own wording.
   - RR-7 now uses "partisan motive", which matches the ruling's "a partisan's motive".
   - RR-8 still records the first window as the Charter's then-operative promise.
   A grep found no verbatim quotation of the Schedule or the Register anywhere else in the repo. The only live deep links in are `path-2-schedule.html#part-a` (x2) and `path-2-risk-register.html#rr-9`, and both resolve on the draft build.
8. **Charter hero now says "amended in 2291 and 2293".** The live hero said "amended in 2291" only. The same page's pb-label ("Amended 2291 and 2293") and meta description ("amended in 2291 and 2293") already carry 2293, so the fact is added to the hero for consistency. This is the only added fact in the unit.
9. **Scope: labels untouched (same decision as v25.6.0 flag 2).** Crosslink labels, titles, meta descriptions, kickers and pb-labels are unchanged. Two candidates for Jason:
   - The Register pb-label "Adoption record · 2291 cadence amendment noted" omits the 2293 amendment. The banner and the title block both record it.
   - The 2294 certification crosslink reads "activation record" (Charter), "audit output" (Schedule) and "final record" (Register and rulings).
10. **Not-X clauses kept where they state scope.** These remain because they fix what a rule does not reach. None is a rhetorical reversal.
   - "It does not apply to the choice among welfare philosophies" (Preliminary ruling)
   - "It does not govern this sum" (A.1)
   - "never as a ratio" (D-5)
   - "never quotients" (S-17)
   - the quoted §1.4 term "not an "advocacy role."" (O-1)
   - "did not count as a failure" (O-12, RR-8). This replaces "not a failure" and avoids the World-tier regex `lawful (?:nonactivation|failure)`.
11. **Reading decisions in the Schedule.**
   - A.1 moves the discount-rate clause after the sum ("summed over the thirty-year horizon and discounted at … as published at lock"). The present value is still taken at that rate.
   - A.1.2 "one arriving a year later" becomes "one whose counterfactual arrival is a year later".
   - A.3's two set-identified components and A.1.4's four inputs stay as parentheticals. The original did not say whether the lists are exhaustive, so the draft does not say either.
   - The CAPS construction markers ESTIMATORS, SCALAR and REALIZED are kept.
12. **Hedge drift, from the check.mjs notes. No operative modal moved.**
   - Schedule 'only' 7 → 8: Part C's lead "only the following methods are admissible" replaces "and nothing else".
   - Register 'ninety-day' 3 → 2 plus 'ninety' 1: O-7 now reads "within ninety days".
   - Chrome '2279' 4 → 5 and '2293' 3 → 4, from the Charter hero and banner dates.
13. **Outside this unit, not changed.** Session record R20 (`docs-review/RATIFY-TAX-50-session-record.md`, Process tier) says the Schedule review's 17 findings split "13 cured … 4 mitigated". The Register table, unchanged here, shows 14 CURED and 3 MITIGATED (S-6, S-7, S-8). One of the two is wrong; its own unit should decide which.
14. **Splice.**
   - Copy the two .md drafts over `documents/path-2-schedule-source.md` and `documents/path-2-risk-register-source.md`, and the .mjs draft over `tools/build-path2-pages.mjs`.
   - Run `npm run build:path2-pages`. check.mjs has already run the draft generator on the drafts in memory. The output was byte-identical for the rulings page and for the Charter instrument body, and every check-canon (g) pin and both probe strings (`RR-12`, `id="s-10-4"`) hold.
   - `build-path2-pages.mjs` is not a digested file, so the record annexes and the compendium SHA-256 table do not move.
   - No Tailwind class changed.
