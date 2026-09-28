# Records 25.6.1 charter unit: reconstruction ledger

This folder holds a draft only. No live source was edited.

- `path-2-charter-source.md` is the reconstructed Path 2 Charter. It replaces `documents/path-2-charter-source.md`, and `npm run build:path2-pages` then regenerates `path-2-charter.html`.
- Checker: `node docs-review/records-25.6.1/charter/check.mjs`. It reads the draft, the live source and the live generator, and writes nothing.

Matching conventions:
- Section (a) quotes are matched against the draft's visible text. That is the Markdown with heading markers, `**` and `*` removed, whitespace collapsed and curly quotes read as straight. Each quote is 15 words or fewer. Where the original carried a fact in an aphorism, a reversal or a closer that the reconstruction dropped, the row gives the original wording in single quotes and then quotes the draft sentence that now carries the content.
- Section (b) strings are matched byte for byte against the raw draft, with whitespace collapsed only. Rows under `rendered:` are matched against the draft as the live generator renders it (`renderDoc` with `charterCfg`, then `linkFirst`). Rows under `live:` are matched against files this unit does not touch. Rows marked absent must not occur.

## Word counts

These are prose words: the whole Markdown text with markup stripped.

| Document | Live | Draft | Change |
|---|---|---|---|
| path-2-charter-source.md | 5,195 | 5,239 | +0.8% |

Register tells, counted by check.mjs as live → draft:
- Em-dashes in paragraph prose: 33 → 0. The em-dashes that remain are all in heading lines and bold section labels, which are frozen.
- Reversal constructions: 7 → 1. The one left is inside the frozen Block E sentence ("not the ruler").
- Semicolons in paragraph prose: 80 → 29. Most of those left separate the items of enumerated lists (§2.2, §2.5, §8.1, §9.1, §12.4) and the dated steps of the Finding II amendment.

## (a) Fact ledger

### path-2-charter-source.md

#### Title block
- Instrument title: `THE PATH 2 CHARTER — FOURTH DRAFT (TERMINAL), AS AMENDED`
- Subject: `Certification Methodology for LP-074 Schedule A`
- Enabling rule 2278 (Y177), adopted 2279 (Y178): `Adopted under the rule enacted 2278 (Y177) · Adopted, 2279 (Y178)`
- Amended by LP-075 in 2291 (Y190): `Amended by LP-075, the Path 2 Commencement Duty Act, 2291 (Y190)`
- Conforms to the 2279 Ruling of the Presidency: `Conforms to the Ruling of the Presidency, 2279`
- Amended per the institutional-design review: `Amended per the institutional-design review`
- Register ships with the Charter as part of the adoption record: `Ships with its Residual-Risk Register, which is part of the adoption record`

#### LP-074 changed no (Preamble)
- LP-074 changed no rate: `LP-074 changed no rate.`
- LP-074 adopted a rule, 70 to 50: `It adopted a rule: the Sanctuary/Main top marginal rate falls from 70 to 50`
- 'when — and only when —': `when, and only when, a Path 2 audit certifies`
- Methodology fixed in advance, system can carry the change: `under a methodology fixed in advance, that the system can carry the change`
- This Charter is that methodology: `This Charter is that methodology.`
- 'Where a choice could be fixed, this text fixes it.': `It fixes in its text each choice that could be fixed.`
- Irreducible expert judgment ('this text does not pretend otherwise'): `Where expert judgment is irreducible`
- Judgment converted into adversarial mechanism: `converts that judgment into adversarial mechanism`
- Ambiguity priced against activation: `prices ambiguity against activation`
- Remainder engraved in the Register adopted alongside: `engraves what remains in the Residual-Risk Register adopted with it`
- No reading activates any schedule: `Nothing in this Charter may be read to activate any schedule.`
- Activation belongs to the certification event alone: `Activation belongs to the certification event alone.`
- Original Charter placed no burden of motion on the status quo: `The original Charter placed no burden of motion on the status quo`
- That rule governed the first window: `that rule governed the first window`
- 'LP-075 later amends cadence prospectively': `LP-075 later amended cadence prospectively.`
- Compels commencement, enacted schedule preserved until certification: `It compels commencement and preserves the enacted schedule unless and until`, `the certification event occurs`

#### §1.1 Constitution.
- Authority vests in a three-seat Commission: `Certification authority vests in a Path 2 Audit Commission of three seats`
- Constituted by the chambers from the three highest-ranked eligible entities: `constituted by the chambers from the three highest-ranked eligible entities`
- Rankings named in §1.2: `on the Meritboard rankings named in §1.2`
- 'substrate-neutral per the standing definition of the Charter of VMSS' (flag 1): `Selection is substrate-neutral per the standing definition of the Charter of VMSS.`

#### §1.2 Competence.
- Three competences: `Eligibility requires demonstrated standing in fiscal estimation, causal inference, or audit methodology`
- Rankings then in force: `per the Meritboard rankings then in force`
- Seats must cover all three: `The three seats together must cover all three fields.`
- Top of each ranking: `Each seat is drawn from the top of its ranking`
- Disqualification below: `among entities not disqualified below`

#### §1.3 Quarantine — historical.
- Bar on TAX-50 participants: `No seat may be held by any party who authored, advocated, opposed, or adjudicated`
- Proceedings of 2213 and 2276–2278: `any instrument of the TAX-50 proceedings of 2213 or 2276–2278`
- Two decennial windows: `This quarantine binds for two decennial windows from this Charter's adoption.`
- Then disclosure: `It then converts to a disclosure requirement.`

#### §1.4 Quarantine — current.
- Present financial interest: `any party with a present financial interest in the schedule outcome`
- Present advocacy role: `a present advocacy role concerning the schedule`
- Position in a body whose funding the Findings adjudicate: `a present position in any body whose funding the Findings adjudicate`
- Panel mandate carve-out: `The §4.4 panel mandate is not an advocacy role within this section.`
- Mid-run recusal on the record: `A seat that discovers such an interest mid-run recuses on the record.`
- Next-ranked entity completes the cycle: `The next-ranked eligible entity on the same competence ranking completes the cycle`
- 'iterating down the ranking as needed': `continuing down the ranking as needed`
- Exhaustion with coverage failure: `If the eligible ranking is exhausted mid-run and §1.2's coverage fails`
- Void for competence collapse: `the run is void for competence collapse per §12.4(b)`

#### §1.5 Quarantine — engagement.
- Extension to the engagement organization: `§§1.3–1.4 extend to the Commission's entire engagement organization`
- Its members: `staff, contractors, model builders, data vendors, and counsel`
- No intermediaries: `A prohibited party may not perform through an intermediary`, `what it may not perform in a seat`
- Defined terms "Party" and "entity": `"Party" and "entity" carry the standing canon identity doctrine throughout this Charter`
- 'affiliates ... of a disqualified entity are the entity': `the affiliates, controlled substitutes, and successor identities of a disqualified entity`, `are treated as that entity`

#### §1.6 Action rule.
- Majority of three: `The Commission acts by majority of three.`
- Each Finding voted separately: `Each Finding is voted separately`
- Votes and dissents over signature: `every vote and dissent is published over signature`
- Vote-binding is symmetric: `Vote-binding is symmetric.`
- Certify vote against a failing estimate is void: `A vote to certify a Finding whose controlling estimate fails its threshold`, `under §10.2 is void`
- Fail vote against a passing estimate is equally void: `A vote to fail a Finding whose controlling estimate meets its threshold is equally void.`
- Disposition is the computed comparison: `The disposition of each Finding is the computed comparison itself.`
- Instrument must reproduce bound and comparison: `the instrument must reproduce the computed controlling bound and the threshold comparison`
- No instrument before §11.4 certification, either direction: `No instrument, certifying or failing, issues until the Registrar's §11.4 execution certifies`
- Reproduced comparisons match the escrowed computation: `the reproduced comparisons match the escrowed computation`
- Dispositions match comparisons: `every disposition matches its comparison`
- 'Signatures attest the record, not the arithmetic; the arithmetic attests itself, in both directions': `A signature attests the record only.`

#### §1.7 Tenure.
- One cycle, dissolving on publication: `Seats are held for one certification cycle and dissolve with the run's published result.`
- No consecutive windows: `No entity, under §1.5's identity doctrine, may hold a seat in two consecutive decennial windows.`
- Duty to respond survives dissolution: `The duty to respond to Registrar and appellate inquiries concerning a run survives dissolution`
- Enforceable as a Meritboard sanction: `enforceable as a standing Meritboard sanction`

#### §2.1 Office.
- Standing office: `A Path 2 Registrar exists as a standing office`
- Separate, custody and verification only: `institutionally separate from the Commission, with custody and verification authority only`
- 'The Registrar is appointed by the chambers': `The chambers appoint the Registrar from the highest-ranked eligible entity`
- Audit-methodology ranking, quarantines apply: `on the Meritboard's audit-methodology ranking, subject to the §§1.3–1.5 quarantines`
- Tenure and removal: `Tenure and removal follow the standing Meritboard officer standard.`
- Pre-designated deputy: `A deputy, the next-ranked eligible entity, is pre-designated`, `assumes the office immediately upon vacancy`
- Double vacancy filled within ninety days: `A vacancy of both offices must be filled from the ranking within ninety days.`
- Clocks toll while vacant: `All run and commencement clocks under §§2.4, 11.2, and 12.3 toll`, `during any period in which no Registrar holds office`

#### §2.2 Duties.
- (a) Custody of preregistrations and escrow: `(a) holds each preregistration and every escrow deposit under §2.5`, `as hashed, timestamped, read-only public or sealed artifacts per §9.2's lock mechanics`
- (b) Pre-lock compliance: `(b) verifies pre-lock compliance with §6.4, including custody of the §6.6 exposure declarations`
- (c) Conformity by execution: `(c) verifies by the §11.4 execution that executed analysis conforms to the locked preregistration`, `including code identity and data provenance`
- (d) Deviations: `(d) adjudicates claimed deviations under §§9.3–9.6`
- (e) Docket: `(e) maintains the technical-objection docket under §14.4`
- (f) Publication: `(f) certifies the completeness and executability of publication under Article XI`

#### §2.3 The fence.
- Barred from methodological authority: `The Registrar is expressly barred from methodological authority`
- 'Custody is a service; judgment belongs to the instrument.': `methodological authority, which belongs to the instrument`
- Verifies what was locked: `It verifies that the Commission did what it locked`
- 'it rules never on whether what was locked was wise': `it never rules on whether what was locked was wise`
- Merits determinations void on their face: `Any Registrar determination touching the merits of a specification, estimand, threshold, or finding`, `is void on its face`

#### §2.4 Appeal.
- Every determination, with the listed kinds: `Every Registrar determination, including acceptance, deviation, materiality, coverage, attribution, completeness, and docket scope`
- Appealable by the three parties: `is appealable to the Supreme Court by the Commission, either §4.4 panel, or the chambers`
- Conformity as legal interpretation: `The Court reviews conformity questions as questions of legal interpretation.`
- Fence boundary justiciable there only: `The boundary of §2.3's fence is itself justiciable in the Court and nowhere else.`
- Burden on the asserting party: `The party asserting a deviation bears the burden of showing it.`
- Reasons and evidence published: `Registrar determinations issue with published reasons and evidence.`
- Appeal tolls §11.2: `A pending appeal tolls the §11.2 clock.`
- Ninety days or default affirmance: `The Court decides within ninety days of filing`, `the Registrar's determination stands affirmed by default`
- One-year aggregate cap ('Litigation is not a clock.'): `Aggregate appellate tolling per run may not exceed one year`
- Later appeals do not toll: `further appeals after that year proceed without tolling`

#### §2.5 Escrow.
- Deposits mandatory: `Milestone deposits are mandatory`
- At lock: `at lock, the data snapshot at the §6.3 vintage`
- Before analysis: `before analysis, the complete analysis code and computational environment`
- Before issuance: `before any instrument issues, the full compendium of §11.1`
- 'sealed until publication, then public': `Deposits are sealed until publication and public after it.`
- Missing deposit halts the run: `A run whose milestone deposit is absent may not proceed past that milestone.`

#### Certification requires all (Article III lead paragraph)
- All four Findings at the controlling estimate: `Certification requires all four Findings, each met at its controlling estimate as defined in §10.2.`
- 'Failure of any one fails the run entire.': `The failure of any one Finding fails the entire run.`
- Elements fixed by the Article: `this Article fixes the population, the variable, the causal contrast, the horizon`, `the summary measure, and the pass threshold`
- Appendix A limits: `Appendix A may operationalize measurement within §10.3's limits.`, `It may not define success.`

#### §3.1 Finding I — Institutional adequacy.
- Population: `the institutional obligations of Main as enumerated, item by item`, `in the Charter Restatement snapshotted at lock per §10.1`
- Variable ('real terms'): `annual income-tax receipts in real terms`, `per the source authority's canonical series for each enumerated item`
- Contrast: `the 50 schedule against the enacted 70 schedule, all else per Article VIII`
- Horizon: `Horizon: thirty years from projected activation.`
- Summary: `the annual coverage ratio (receipts over enumerated obligations) for each horizon year`
- Threshold 1.00 every year: `a coverage ratio of at least 1.00 in every horizon year`, `at the controlling estimate under §5.6's worst-year rule`
- Dividend stream inadmissible: `The dividend stream and its funding base are inadmissible to this Finding.`

#### §3.2 Finding II — ADT elasticity.
- Population: `the ADT base and the dividend stream it funds`
- Variable: `real dividend disbursement per resident`
- Contrast and baseline: `Contrast: as §3.1. Baseline: the ten years ending at the §6.2 cutoff.`
- Horizon: `Horizon: thirty years. Summary: the count of horizon years`
- Summary: `projected real per-resident disbursement falls below the baseline mean`, `by attribution to the schedule change under Article IV's identification rules`
- Threshold zero years: `Threshold: zero such years, at the controlling estimate.`
- Income-tax stream inadmissible: `The income-tax stream and its adequacy are inadmissible to this Finding.`

#### §3.3 Finding III — Concentration response.
- Population: `Population: all schedule-subject holdings.`
- Variables: `(i) annual SCM activation frequency; (ii) Flow Test status per the canon definition`, `snapshotted at lock per §10.1`
- Contrast and baseline: `lock per §10.1. Contrast: as §3.1. Baseline: the ten years ending at the §6.2 cutoff`
- Horizon and summary (i): `cutoff. Horizon: thirty years. Summary: (i) projected activation frequency relative to the baseline mean`
- Summary (ii): `(ii) Flow Test status per projected year`
- Threshold, 125 percent: `projected activation frequency not exceeding 125 percent of the baseline mean in any horizon year`
- Threshold, Flow Test, under §5.6: `the Flow Test holding in every horizon year, both at the controlling estimate under §5.6`

#### §3.4 Finding IV — Marginal utility of retained capital.
- Population: `capital retained in the upper stack by operation of the schedule change`
- Its measure: `(the difference between the 70 and 50 schedules' collections)`
- Variable: `net marginal value of that capital's private deployment`, `under the welfare measures of §10.4's enumerated schedule`
- Counterfactual: `public capture and deployment per the realized deployment pattern of the public streams`, `over the ten years ending at the §6.2 cutoff`
- 'the public portfolio as it was, not as either side would idealize or degrade it': `The pattern is taken as realized, without idealization or degradation by either side.`
- Horizon: `or degradation by either side. Horizon: thirty years.`
- Summary (i): `(i) net marginal value of private over counterfactual public deployment`
- Summary (ii): `(ii) count of projected concentration events attributable to the retained capital under Article IV`
- Threshold: `net marginal value strictly greater than zero at the controlling estimate`, `zero attributable concentration events at the controlling estimate`
- 'No measurable marginal utility fails this Finding.' (flag 1): `If no marginal utility is measurable, this Finding fails.`

#### §3.5 Conjunction and seal.
- Conjunctive: `Conjunction and seal. The four Findings are conjunctive.`
- Streams I and II sealed: `The streams of Findings I and II are evidentially sealed`
- Seal content: `neither Finding's model or conclusion may be conditioned on, offset by, or informed by`, `the other stream's adequacy`
- Shared exogenous inputs: `Shared exogenous inputs (macroeconomic series, demographic series) are permitted only if enumerated`, `in the preregistration and identical wherever used`
- 'No surplus under any Finding argues for a deficit under another.': `A surplus under any Finding does not offset a deficit under another.`

#### §4.1 The admissible set.
- Admissible specification set: `The preregistration names an admissible specification set spanning the plausible space of functional forms`
- Its span: `identifying assumptions, and estimators`
- 'with stated reasons for every candidate class considered and excluded': `It states the reasons for every candidate class that was considered and excluded.`

#### §4.2 Controlling across the union.
- Taken across the union: `The controlling estimate for each Finding is taken across the entire admissible union`
- Union composition: `every set member from every source under §4.4, crossed with every menu selection under §10.5`
- Least favorable bound over classes: `It is the bound least favorable to activation among all equivalence classes under §4.6.`
- No privilege, none ignored: `No member is privileged, and none may be ignored.`

#### §4.3 Validation floor.
- 'fixed by this section, not by its proponent': `Every set member carries the validation test fixed by this section`, `whichever party proposed the member`
- Out-of-sample test: `out-of-sample projection against a held-out terminal segment of the observation window`
- Persistence benchmark: `projection error no worse than the naive persistence benchmark on the same segment`
- Exclusion: `A member failing the floor is excluded from the controlling union.`
- Published in full: `Its failure, its estimates, and the recomputation verifying the exclusion are published in full.`
- Registrar verifies: `The Registrar verifies by §11.4 execution that the exclusion followed this floor and nothing else.`

#### §4.4 Adversarial construction.
- Two panels upon constitution: `Upon constitution of a Commission, the chambers seat two panels`
- Same rankings and quarantines, carve-out: `from the same rankings and quarantines as §§1.1–1.5, as modified by §1.4's mandate carve-out`
- The two sides: `a certification-side panel and a challenge-side panel`
- 'Each panel holds a MANDATE, not an interest' (flag 1): `Each panel holds a MANDATE rather than an interest.`
- Certification-side duty: `The certification-side panel's duty is to add the specification-set members, identification assumptions`, `and menu selections that make the strongest admissible case for activation`
- 'the challenge-side panel's duty is the strongest admissible case against' (flag 1): `The challenge-side panel has the same duty for the case against activation.`
- 'Addition is a duty, not a permission': `Addition is mandatory`
- Must add or publish a signed statement: `each panel must add at least its strongest surviving candidate per its mandate`, `or publish a signed statement that none exists`
- Scoring after publication ('the stake is merit, which in this civilization is the currency that matters'): `Panel performance is scored on the standing Meritboard rankings after publication.`
- Exclusion only by the floor, mechanically: `Neither panel, nor the Commission, may exclude another party's addition`, `except by mechanical application of the §4.3 floor`
- 'Curation dies because nobody curates; abstention dies because abstention is scored.' (cut as an aphorism; carried by the two rows above): `may exclude another party's addition`, `Panel performance is scored`

#### §4.5 Identification conservatism.
- Contested identification: `Wherever attribution depends on contested identification assumptions`
- Least favorable admissible assumption: `the controlling estimate is computed under the admissible assumption least favorable to activation`
- The two attribution phrases, cross-quoted from §3.2 and §3.4: `This rule governs both "by attribution to the schedule change" and`, `"attributable to the retained capital."`
- 'Attribution ambiguity is not argued; it is priced against activation.': `computed under the admissible assumption least favorable to activation`
- 'established by §4.4 addition and §4.3 survival, not by argument': `An assumption is admissible only through §4.4 addition and §4.3 survival.`

#### §4.6 Non-redundancy.
- Equivalence classes: `Set members sharing identification assumptions and functional class form one equivalence class.`
- Bound over classes: `The controlling bound is taken over classes`
- Class representative ('Padding a class multiplies nothing.'): `each class is represented by its own surviving member least favorable to activation`

#### §5.1 Framework.
- One-sided 95 percent, against activation: `All intervals are one-sided at the 95 percent level and oriented against activation.`
- Family from §10.4: `They are constructed by a family from the §10.4 enumerated schedule`
- Dependence and clustering: `with dependence structure and clustering unit as declared in the preregistered design`, `verified in §11.4 execution`

#### §5.2 Joint assurance.
- Conjunctive: `Joint assurance. The four Findings are conjunctive.`
- Each at its own level: `Each is tested at its own 95 percent one-sided level`
- No multiplicity loosening: `no multiplicity adjustment may loosen any individual bound`
- Allocation against activation: `Every uncertainty allocation in this Charter runs against activation.`

#### §5.3 Precision floor, by formula.
- Maximum width: `the maximum admissible width of the controlling interval is the absolute distance`
- Formula terms: `between the pass threshold and the baseline-period observed mean of the summary measure`
- Too-wide design: `A locked design whose §11.4-verified interval width exceeds this bound`, `cannot certify and cannot fail the Finding on precision alone`
- Void for indecision: `It is void for indecision per §12.4(b)(ii), attributed to the lock's gap.`
- Registrar computes: `The formula is arithmetic, and the Registrar computes it.`

#### §5.4 Boundary rule.
- Unrounded values: `All threshold comparisons are made on unrounded values.`
- Exact-threshold bound fails: `A controlling bound exactly at a threshold fails.`

#### §5.5 Point estimates.
- 'publish in the instrument, favorable or not': `The instrument publishes point estimates and full intervals for every union member, favorable or not.`

#### §5.6 Vector-to-bound rule.
- Scope: `For Findings whose thresholds bind in every horizon year`
- Simultaneous coverage: `intervals are constructed with simultaneous one-sided 95 percent coverage across the horizon path`
- Worst year: `The operative comparison is the worst horizon year at the simultaneous bound.`
- Inadmissible inference: `Pointwise, pooled, or selective-year inference is not admissible.`

#### §6.1 The observation window, by formula.
- Window: `The window ends at the §6.2 cutoff and extends backward the greater of twenty years`
- Two cycles: `the span covering two complete cycles per the §10.1 snapshot definition`
- 'No party selects the window; this section computes it.': `This section computes the window, and no party selects it.`

#### §6.2 Fixed cutoff, by formula.
- Cutoff: `The cutoff is the lock date minus the source authorities' maximum published reporting lag`, `for the enumerated series`
- Computed, not selected: `This section computes the cutoff from the lock date, and no party selects it.`

#### §6.3 Vintage, by formula.
- Vintage: `The as-of vintage governing all series is the lock date.`
- Revisions: `A post-cutoff revision to a pre-cutoff observation is admissible only if published`, `by the lock date. Otherwise the pre-revision value stands.`
- Symmetry: `The rule applies identically to favorable and unfavorable revisions.`

#### §6.4 Pre-lock prohibition.
- Prohibition: `Before lock, no Commission or panel party may examine window data`
- Scope: `prior vintages of it, aggregates or proxies substantially derived from it`, `adjacent-period data selected for outcome-revealing power`

#### §6.5 Evidence floor.
- Observed measurements: `Findings rest on observed measurements.`
- Model output as projection layers only: `Simulation and model output are admissible only as projection layers that survived §4.3.`
- No self-validation: `No model's output serves as the observational validation of that model.`

#### §6.6 Exposure declarations.
- Declaration before lock: `Before lock, every Commission and panel party files a signed declaration`, `of prior professional exposure to the window's public series`
- Escrowed and published: `Declarations are escrowed and published with the record.`
- False declaration: `A false declaration is a material deviation attributed to Commission conduct.`
- 'This section mitigates what no text can erase': `This section mitigates prior exposure, which no text can erase.`
- Residue RR-3: `The residue is Register entry RR-3.`

#### §7.1 Defaults.
- 'No observation exclusions' and 'no outlier removal': `No observation is excluded and no outlier is removed.`
- Missing data: `Missing data follow the source authority's published method`
- Weights: `weights follow the source series`
- Seasonal and population adjustment: `seasonal and population adjustment follow the source authority`
- Transformations: `Transformations are limited to those in Article III's estimand text.`

#### §7.2 Departures.
- Admissible departures: `A preprocessing departure from §7.1 is admissible only if it is itself`, `a source authority's published method or an item of the §10.4 enumerated schedule`
- 'Free-form departures, however reasoned, are amendments under §13.1.': `Any other departure, however reasoned, is an amendment under §13.1.`

#### §8.1 Enumerated minimum.
- Treatment required: `The preregistration must state attribution and sensitivity treatment`, `for at least the following anticipated event classes`
- Classes: `statutory change to any enumerated obligation; change to ADT structure; change to SCM doctrine`, `demographic-regime change per the canon definition; and any event class either §4.4 panel adds`
- Omission: `Omission of an enumerable class is a material deviation attributed to Commission conduct.`

#### §8.2 Unanticipated.
- Routing: `An unanticipated event routes to the Registrar`
- Publication beside the locked text: `which publishes it beside the locked text`
- Coverage ruling only, appealable: `rules, appealably per §2.4, only on whether the locked treatment covers it`
- 'Covered: the run proceeds.': `If covered, the run proceeds.`
- 'Not covered: void without window consumption': `If not, the run is void without window consumption per §12.4(b)`
- Gap cured at next lock: `the gap is cured at the next lock`

#### §9.1 Contents.
- Set, reasons, additions: `The preregistration comprises: the admissible set with exclusion reasons (§4.1) and panel additions (§4.4)`
- Menus, design, treatments: `menu selections (§10.5); the declared dependence design (§5.1); intercurrent treatments (§8.1)`
- Appendix A: `Appendix A operationalizations within §10.3`
- Computations: `the computed window, cutoff, and vintage of §§6.1–6.3, shown as computations`
- Reserved matter excluded: `It contains nothing that Articles III–VIII or Article X reserve to this Charter.`

#### §9.2 Lock mechanics.
- Lock on acceptance: `Lock occurs when the Registrar accepts the preregistration against the §9.1 checklist.`
- Ninety days, deemed acceptance: `Acceptance or a stated checklist defect is due within ninety days`, `the absence of either is deemed acceptance`
- Executability: `The checklist includes executability`, `the Registrar verifies, as a conformity matter, that the locked design's §11.4 execution`, `over the §4.6 class representatives is completable within the §11.2 period`
- SHA-256 digest: `the Registrar computes the artifact's SHA-256 digest from its bytes`
- Timestamp: `obtains a timestamp from the civilization's canonical time authority`
- Publication and signatures: `publishes the digest and timestamp to the public chambers record`, `over the signatures of the Registrar and the clerk of the chambers`
- Clerk ministerial: `The clerk's co-signature is ministerial.`
- Ten days, deemed given: `Withheld beyond ten days, it is deemed given`
- Registrar alone completes lock: `the Registrar's publication alone completes lock`
- No prohibited examination before lock: `No §6.4-prohibited examination may precede lock.`

#### §9.3 Deviation.
- Definition: `Any departure from the locked preregistration is a deviation.`
- Claimed, adjudicated, appealable: `Deviations are claimed to and adjudicated by the Registrar, appealably.`

#### §9.4 Materiality, by recomputation.
- Test: `A deviation is material if Registrar recomputation under the locked alternative changes`, `any operative comparison of §5.6, or if the deviation defeats recomputation`
- 'Materiality is decided by executing, not predicting.': `Materiality is decided by execution alone.`
- Immaterial deviations curable: `Immaterial deviations are curable on the record.`

#### §9.5 Consequences.
- Repairable deviation does not void: `A material deviation that recomputation can repair does not void the run.`
- Run publishes on the recomputed result: `The run proceeds and publishes on the recomputed result`, `with the deviation and repair published alongside it`
- 'buys any party an exit from publication': `No deviation that can be computed away relieves any party of publication.`
- Only recomputation-defeating deviations void: `Only a recomputation-defeating deviation voids the run.`
- Consequences under §12.4(b)(iv): `Its window consequence`, `the removal and Meritboard sanction of any entity to whose conduct the Registrar attributes it`, `are governed by §12.4(b)(iv)`

#### §9.6 Adjudication.
- Rulings published: `Deviation rulings are published with reasons and the recomputation record.`
- No self-certified conformity: `No Commission determination of its own conformity is final.`

#### §10.1 Snapshot at lock.
- Defined terms incorporated: `Flow Test, cycle, and institutional obligations are incorporated from the standing canon`, `and the Charter Restatement as in force at lock`
- Snapshot immutable: `That snapshot governs the run immutably.`
- Between-run amendments: `An amendment to any cross-referenced source between runs is an amendment to this Charter's schedules`, `must clear §13.1 before the next lock`

#### §10.2 Controlling estimate.
- Definition: `the controlling estimate is the interval bound least favorable to activation across the §4.2 union`
- Class and vector rules: `under the §4.6 class rule and the §5.6 vector rule`
- Sole source of law: `This section is the term's sole source of law.`

#### §10.3 Appendix A.
- 'A preregistration artifact.': `Appendix A is a preregistration artifact.`
- Permitted content: `It may operationalize measurement through series mappings, computational procedure`, `and selections from the §10.4 schedule, and nothing else`
- 'which must be the source authority's canonical series wherever one exists': `Series mappings must use the source authority's canonical series wherever one exists.`
- Prohibitions: `It may not define success, alter a threshold, or redefine a frozen term.`
- Conflict rule: `In any conflict, this Charter controls.`

#### §10.4 Enumerated schedule.
- Items enumerated: `The welfare measures (Finding IV), the interval families (§5.1)`, `and the admissible preprocessing methods (§7.2)`
- Schedule adopted with the Charter: `are enumerated in a schedule adopted by the chambers with this Charter`
- Amendable only per §13.1: `The schedule is amendable only per §13.1.`
- Nothing outside selectable: `Nothing outside the schedule may be selected.`

#### §10.5 Menu union.
- Panel selections: `Where the schedule permits alternatives, each §4.4 panel makes its selections`
- 'Menu shopping is symmetric and therefore empty.' (cut as a restatement; carried by): `all selections enter the §4.2 union`

#### §11.1 Symmetric disclosure.
- Every outcome publishes the compendium: `Every outcome, whether certification, failure, or void, publishes the full compendium`
- Contents: `raw and analytic data, complete code, computational environment, execution logs, seeds, provenance chain`, `point estimates and intervals for every union member, votes, dissents, declarations`, `and every Registrar certification`
- Unpublishable data inadmissible: `Data that cannot be published cannot be admitted.`
- Secured at lock: `No enumerated series enters any Finding unless its deposit and publication are secured at lock.`
- Incomplete record voids any outcome: `An incomplete record voids the outcome it accompanies, whether certification, failure, or void.`

#### §11.2 Deadline.
- Two years: `The run publishes within two years of lock.`
- Escrow publication on breach: `On breach, the Registrar publishes the escrowed compendium`, `the computed comparisons of the §11.4 execution as the run's result`
- Published and consuming: `The run is thereby published and consumes its window.`
- 'published, not voided' and 'Suppression by silence is not available to any party': `A breach neither voids the run nor lets any party suppress its result.`

#### §11.3 Correction and supersession.
- Certified defect within one year: `A material computational or data-integrity defect certified by the Registrar within one year of publication`
- One corrected re-analysis: `permits one corrected re-analysis of the same locked compendium`
- 'never new data, never a new run': `The re-analysis admits no new data and opens no new run.`
- Supersession: `The corrected result supersedes the original for every legal purpose.`
- Reversed certification: `A correction reversing a certification voids it ab initio`, `with prospective rate reversion from the correction's publication`
- Reversed failure: `A correction reversing a failure is the certification event.`
- Side by side: `Both instruments publish side by side, and only the correction operates.`

#### §11.4 Execution.
- Independent execution: `Before any instrument issues, the Registrar independently executes the escrowed code`, `on the escrowed data in the escrowed environment`
- Class representatives: `The execution runs over the §4.6 class representatives, which decide every controlling bound.`
- Verification: `The Registrar verifies that the reported comparisons match the executed output`, `every §1.6 disposition matches its comparison`
- Blocking: `Non-execution or mismatch blocks issuance.`
- Missing deposit: `A Commission's failure to make any §2.5 milestone deposit is a recomputation-defeating deviation`, `attributed to Commission conduct`
- 'Execution is conformity, not merits, per §2.3.': `Under §2.3, execution tests conformity only.`

#### §12.1 Windows.
- Anchor: `Decennial windows anchor to LP-074's enactment (2278).`
- First window: `The first opens on adoption of this Charter and closes 2288.`
- Later windows: `Each subsequent window spans ten years from the last close.`

#### §12.2 Commencement and consumption.
- Commencement at lock: `A run commences at lock and belongs to the window in which it locks.`
- Consumption: `Its result, whenever published, consumes that window and no other.`
- No concurrent runs: `No run may lock while any run is pending anywhere.`
- Only consumption closes: `Only consumption closes a window to further commencement.`
- One consuming run: `No window has more than one consuming run`
- One replacement after a void: `a §12.4(b) void permits one replacement commencement within the run's window`

#### §12.3 Commencement duty — amended by LP-075 (2291).
- Amendment by LP-075 (2291): `§12.3 Commencement duty — amended by LP-075 (2291).`
- Original text governed 2279–2288: `Original 2279 text, governing the first 2279–2288 window:`
- Quoted original, sentence 1: `"A window without a run is the lawful status quo.`
- Quoted original, sentence 2: `Nothing compels the chambers to constitute a Commission or a Commission to lock.`
- Quoted original, sentence 3: `Once constituted, a Commission that has not locked within two years dissolves without window consequence."`
- 'That original rule made the first window's no-run lawful': `Under that rule the first window closed lawfully without a run.`
- No result: `The closure produced no certification, failure, or void`
- Neither safe nor unsafe: `proved Schedule A neither safe nor unsafe`

#### Current rule, prospective from LP-075's enactment:
- Label: `Current rule, prospective from LP-075's enactment:`
- Condition: `While either LP-074 schedule remains unresolved`
- Duty: `the chambers must cause at least one valid Path 2 commencement`
- Every window, ready schedule: `in every decennial window for the schedule`, `legally ready for its own evidence pathway`
- Commencement defined: `A commencement is a lock under §12.2.`
- Schedule A governance: `Schedule A remains governed by this Charter's Findings and LP-074 §§4–5.`
- Schedule B governance: `Schedule B remains governed by LP-074 §6's separate Lower Incidence Certificate.`
- No certification or prejudgment by an A result (flag 1): `A Schedule A result neither certifies nor prejudges it.`
- Path 2 acts on Schedule B limited: `A Path 2 act concerning Schedule B may only adopt or reject fiscal quantities`, `supplied by that separate certificate under its own standard`

#### Remedial first run:
- Label: `Remedial first run:`
- Trigger: `Because the 2279–2288 window closed without a lock`
- One hundred eighty days: `the chambers must constitute a Commission within one hundred eighty days of LP-075's enactment`
- Lock by 2292: `cause a lock no later than 2292`
- Belongs to 2289–2298: `That lock belongs to the 2289–2298 window.`
- First window untouched: `It neither consumes nor rewrites the closed first window.`
- Dissolution only on recognized justification ('upon a Registrar or Court-recognized competence or integrity justification'): `A constituted Commission that has not locked by its applicable deadline`, `may dissolve only upon a competence or integrity justification`, `recognized by the Registrar or the Court`
- Otherwise replacement, attribution, referral: `Otherwise the Registrar orders replacement constitution, publishes attribution`, `refers every responsible entity to the standing Meritboard sanction process`
- Strategic non-locking: `Strategic non-locking has no lawful window consequence other than replacement.`

#### Outcome neutrality and separate termination:
- Label: `Outcome neutrality and separate termination:`
- Existing rules govern disposition: `A certification, failure, or legally recognized void is dispositioned only`, `under the existing Path 2 rules`
- No result commanded, no second vote: `This amendment commands no result and creates no second political vote after a valid certificate.`
- 'and therefore retains its mandatory replacement consequence': `A §12.4(b) void does not consume its window`, `so its mandatory replacement consequence still applies`
- Separate termination triggers: `The duty ends separately for each schedule, and only when that schedule certifies`, `LP-074 is lawfully repealed or superseded, or another statute expressly resolves it`
- A certification does not end the B duty: `Schedule A certification does not end the duty concerning unresolved Schedule B.`

#### §12.4 Consumption rules.
- (a) Published results consume: `(a) A published result, including a §11.2 escrow publication`, `a §9.5 recomputed publication, and an operative §11.3 correction, consumes the run's window`
- (b) Non-consuming voids: `(b) The following voids do not consume the window`, `each permits the single §12.2 replacement commencement`
- (i)–(iii): `(i) §8.2 non-coverage; (ii) §5.3 indecision; (iii) §1.4 competence collapse`
- (iv) and its consequences: `(iv) a recomputation-defeating deviation, with the entity to whose conduct the Registrar attributes it`, `removed from every Path 2 role, sanctioned per the standing Meritboard standard`, `and excluded from the replacement run`
- 'Sabotage buys the saboteur nothing that publication would not have given': `A saboteur therefore gains nothing that publication would not have given`
- 'costs the saboteur everything the Meritboard can price': `bears every cost the Meritboard can impose`
- Residue RR-6: `The residue this allocation cannot close is engraved at Register entry RR-6.`
- 'Attribution rulings publish and are appealable.': `Attribution rulings are published and are appealable.`
- Void lawful but no discharge: `A recognized void is a lawful outcome under §12.3`, `it cannot discharge the replacement obligation that this subsection imposes`

#### §12.5 No interim process.
- Fragment made a sentence: `No supplemental estimates, interim reruns, or partial recertifications are permitted beyond §11.3's single correction.`

#### §13.1 Amendments.
- Every amendment, any direction: `Every amendment to this Charter or its §10.4 schedule, whether loosening, tightening, or neutral`
- Adoption and cold review: `requires chamber adoption and must first survive a cold adversarial review`
- 'The reviewer is not selected by any sponsor': `No sponsor selects the reviewer.`
- Reviewer identity: `The reviewer is the highest-ranked eligible entity on the Meritboard's audit-methodology ranking`
- Quarantine and access: `quarantined per §§1.3–1.5 from the amendment's sponsors and authors, with full evidence access`
- "Survive" defined, first limb: `"Survive" means that every finding is dispositioned on the published record`
- Second limb: `the reviewer's reply to each disposition is published before the adoption vote`
- Third limb: `any highest-severity finding dispositioned over the reviewer's standing objection`, `is flagged to the Presidency for veto consideration on that ground`

#### LP-075 cleared this (LP-075 clearance note)
- Cleared in 2291: `LP-075 cleared this procedure in 2291.`
- 'It amended cadence only: it did not alter': `It amended cadence only and did not alter a Finding, threshold, estimand`, `evidentiary quarantine, or Schedule B's distinct incidence standard`

#### Finding II precision amendment — adopted 2291 after §13.1 cold review.
- Label: `Finding II precision amendment — adopted 2291 after §13.1 cold review.`
- Dates: `Filed 2291-05-20; independent review completed 2291-07-02`, `reviewer replies published 2291-07-19; adopted by every chamber 2291-08-04`, `published 2291-08-05, before the 2292 lock`
- Reason: `The impairment-count summary has no coherent baseline-period observed mean`
- Measure: `Finding II uncertainty is measured on the annual schedule-attributable impairment margin`
- Width: `Its maximum width is the sample standard deviation of the ten enacted-70 baseline dividend observations`
- Adverse year: `An adverse year still requires both a below-baseline dividend bound and a negative schedule-effect bound`
- Threshold unchanged: `The substantive threshold remains zero schedule-attributable impairment years.`
- 'remain preserved ... and are summarized by the 2294 authority map': `The filed cold review, replies, zero-fail vote, and adopted rule are preserved`, `in the Charter adoption history and summarized by the 2294 authority map`

#### §13.2 Revocation.
- Revocation run only: `A certification is revocable only by a revocation run`
- Same elements: `which uses the same Findings, thresholds, and controlling-estimate rule`, `the certifying run's locked instrument (definitions, union, schedule selections)`
- Window update only: `That instrument is updated only for the data window computed under §§6.1–6.3`, `at the new lock, and enlarged as follows`
- Fresh panels may add: `fresh §4.4 panels are seated at the revocation lock and may add to the union`, `under the same duties, floor, and class rules`
- 'The union may grow; it may never shrink.': `The union may grow but may never shrink.`
- 'Growing the evidence is not changing the ruler.' (cut; carried by): `All other instrument changes require §13.1 amendment.`
- Window rules apply: `Revocation runs are subject to §§12.1–12.2 as runs of their window.`
- Reversion to 70 percent upper rate: `If the Findings fail on revocation review, Sanctuary and Main revert prospectively`, `to LP-073's 70 percent upper rate`
- Lower schedule under its own authority: `LP-073's lower schedule remains subject to its own operative authority unless separately changed.`
- 'What was shown can be un-shown; what was un-shown restores the prior law': `What was shown can be un-shown, and un-showing it restores the prior law.`
- Sentence adopted verbatim by the Presidential ruling (Block E): `"un-shown" must mean the world changed, not the ruler.`

#### §13.2A Coupled reversion amendment — adopted 2293 after §13.1 cold review.
- Label: `§13.2A Coupled reversion amendment — adopted 2293 after §13.1 cold review.`
- Dependence: `Schedule B is legally dependent on an operative Schedule A.`
- A revoked suspends B, restores 70/35/17/8: `Revocation of Schedule A automatically suspends Schedule B`, `restores the complete prior LP-073 schedule, 70/35/17/8, until both schedules lawfully recertify`
- Lower-specific revocation: `A Lower-specific revocation run may suspend Schedule B without disturbing a still-valid Schedule A.`
- 50/35/17/8: `That state restores only the LP-073 Lower rates, producing 50/35/17/8.`
- 'The lawful states are therefore:': `The lawful states are:`
- The three states: `both schedules active, 50/25/12.5/6.25`, `Schedule A active and Schedule B revoked, 50/35/17/8`, `Schedule A revoked, 70/35/17/8, with Schedule B automatically suspended`
- Unlawful state: `No 70/25/12.5/6.25 state is lawful.`
- 'remain preserved': `The filed cold review, replies, zero-fail vote, and adoption record are preserved`

#### §14.1 Schedule B untouched; procedural bridge limited.
- Schedule A only: `This Charter governs Schedule A certification only.`
- Distinct certificate: `The Lower Incidence Certificate of LP-074 §6 is a distinct instrument`, `under a distinct evidentiary standard`
- No effect on B: `Nothing certified here satisfies, advances, or presumes any element of Schedule B.`
- 'LP-075's commencement duty does not collapse the two instruments': `LP-075's commencement duty keeps the two instruments separate.`
- B-only bridge: `Where Schedule B alone remains unresolved, Path 2 may receive and disposition`, `the separately produced fiscal quantities only as LP-074 §6 requires`
- No substitution: `It may not substitute a Schedule A model, finding, threshold, or certificate`, `for any B condition`

#### §14.2 Argument quarantine.
- TAX-50 argument inadmissible: `The petitions, briefs, advocacy, opposition, and adjudication reasoning of the TAX-50 proceedings`, `are inadmissible to any Finding`
- 'Argument is quarantined; the world is not': `The quarantine covers argument only.`
- Primary data: `Primary data is admissible if independently sourced.`

#### §14.3 No advocacy channel.
- No filings: `No brief, petition, or merits argument may be filed with the Commission.`
- 'The §4.4 panels speak once, before lock, by addition only.': `The §4.4 panels make their submissions once, before lock, and by addition only.`
- 'The Commission reads the lock and the data. It does not take meetings.': `The Commission reads the lock and the data and takes no meetings.`

#### §14.4 Technical objections.
- Scope and filing: `Written objections limited to data integrity and computational error`, `may be filed with the Registrar at any time`
- Screening and publication: `The Registrar screens them for scope, appealably, and publishes each with its disposition.`
- Within the §11.3 year: `An objection sustained within §11.3's year routes to correction.`
- 'grounds a revocation run's commencement but changes nothing by itself': `One sustained later grounds a revocation run's commencement and has no other effect.`

#### Horizon 30 years (Parameter Schedule paragraph, verbatim)
- Findings I–II parameters: `Horizon 30 years (all Findings) · coverage ratio ≥ 1.00 every horizon year (I)`, `impairment years = 0 (II) · activation frequency ≤ 125% of baseline mean`
- Findings III–IV parameters: `Flow Test holds every year (III) · net marginal value > 0`, `attributable concentration events = 0 (IV) · baselines = ten years ending at cutoff`
- Intervals and precision: `intervals one-sided 95%, simultaneous over horizon, worst-year operative`, `precision ceiling = |threshold − baseline mean|`
- Window, cutoff, vintage, floor: `window = max(20y, 2 cycles) ending at cutoff · cutoff = lock − max reporting lag`, `vintage = lock date · validation floor = beat persistence benchmark out-of-sample`
- Deadlines: `acceptance ≤ 90 days else deemed · publication ≤ 2 years from lock (breach = escrow publication)`, `correction ≤ 1 year from publication · original lock-or-dissolve ≤ 2 years from constitution governed 2279–2288`
- LP-075 cadence: `LP-075 remedial constitution ≤ 180 days from 2291 enactment and lock ≤ 2292`, `future commencement mandatory while a schedule remains unresolved · seat gap ≥ 2 consecutive windows`
- Lock mechanics: `digest SHA-256, timestamp per canonical time authority, co-signed to chambers record`, `(clerk deemed-signed after 10 days)`
- Appeals and vacancy: `appeal decision ≤ 90 days else affirmed · aggregate appellate tolling ≤ 1 year per run`, `Registrar vacancy filled ≤ 90 days, clocks toll while vacant`
- Sunset, replacement, concurrency: `historical quarantine sunsets to disclosure after 2 windows`, `replacement commencement ≤ 1 per window · no concurrent runs.`

#### Disposition history note:
- Label: `Disposition history note:`
- First window: `the first 2279–2288 window closed without a run under the original no-duty rule.`
- 'without selecting a rate': `LP-075 compelled a remedial process and selected no rate.`
- 2292 lock, 2294 record, Findings I–IV, Schedule A: `The valid 2292 lock produced a complete 2294 record in which Findings I–IV passed`, `and Schedule A certified`
- Lower audit, B1–B6, Schedule B: `The separate Lower audit then passed B1–B6, and Schedule B certified.`
- Effective 2295: `Valid notice made LP-074's 50/25/12.5/6.25 cascade effective in 2295.`
- LP-073 historical: `LP-073's 70/35/17/8 schedule is preserved as historical law.`

## (b) Frozen-string checklist

Every entry is confirmed by check.mjs. The checker also confirms these structural invariants in code:
- The 27 heading lines are identical, in order. So are the 6 `---` rules, the 67 bold spans and the 34 italic spans. The disposition note's italic span is compared by its label only, because its body is prose.
- The draft has the same 75 paragraphs in the same order. Each marked paragraph keeps its leading bold or italic label, and each keeps its `s-N-M` paragraph anchor. Neither version has a list.
- The live generator's `renderDoc(md, charterCfg)` gives the same tag, attribute and id skeleton for the draft as for the original. That is 80 ids, with `art-1` to `art-14` contiguous.
- The first occurrence of the linkFirst phrase lies inside the §10.4 paragraph. The generator's own `assertVerbatim` passes on the linked body.
- The §12.3 quotation of the original 2279 text and the Parameter Schedule paragraph are unchanged. The Block E sentence that the live Presidential ruling quotes is present verbatim.
- These token multisets are unchanged: numeric tokens, § references, LP/RR references, Schedule A/B, B-condition and Y-year tokens, Article/Finding numerals, (a)–(f) and (i)–(iv) enumerators, and number words.
- The operative modals shall, may, must, can and cannot keep the same count in every paragraph. That is 53 in total.
- The World-tier regexes from check-canon find nothing in the rendered draft. They cover seat names, a founder's ruling or override, taxation-is-Charter-level predication, and superseded refusal outcomes, including "lawful nonactivation".

### path-2-charter-source.md
- Heading lines: `# THE PATH 2 CHARTER — FOURTH DRAFT (TERMINAL), AS AMENDED`, `## Certification Methodology for LP-074 Schedule A`, `### Adopted under the rule enacted 2278 (Y177) · Adopted, 2279 (Y178)`, `### Amended by LP-075, the Path 2 Commencement Duty Act, 2291 (Y190)`, `### Conforms to the Ruling of the Presidency, 2279 · Amended per the`, `### institutional-design review · Ships with its Residual-Risk Register,`, `### which is part of the adoption record`
- Heading lines: `## Preamble`, `# PART ONE — OFFICES`, `## Article I — The Commission`, `## Article II — The Registrar`, `# PART TWO — THE TEST`, `## Article III — Estimands and Pass Thresholds`, `## Article IV — Specification Discipline, Adversarial Construction,`, `## and Identification`, `## Article V — Uncertainty`, `## Article VI — Data`, `## Article VII — Preprocessing`, `## Article VIII — Intercurrent Events`
- Heading lines: `# PART THREE — PROCESS`, `## Article IX — Preregistration and Lock`, `## Article X — Definitions, Hierarchy, and Menus`, `## Article XI — Publication`, `## Article XII — Cadence`, `## Article XIII — Symmetry`, `## Article XIV — Boundaries`, `## Parameter Schedule (adoption visibility)`
- check-canon (g) pin: `THE PATH 2 CHARTER`
- linkFirst phrase (build-path2-pages.mjs): `a schedule adopted by the chambers`
- Deep-link paragraph labels (they yield ids s-10-4 and s-12-3): `**§10.4 Enumerated schedule.**`, `**§12.3 Commencement duty — amended by LP-075 (2291).**`
- Bold labels, Article I: `**§1.1 Constitution.**`, `**§1.2 Competence.**`, `**§1.3 Quarantine — historical.**`, `**§1.4 Quarantine — current.**`, `**§1.5 Quarantine — engagement.**`, `**§1.6 Action rule.**`, `**§1.7 Tenure.**`
- Bold labels, Article II: `**§2.1 Office.**`, `**§2.2 Duties.**`, `**§2.3 The fence.**`, `**§2.4 Appeal.**`, `**§2.5 Escrow.**`
- Bold labels, Article III: `**§3.1 Finding I — Institutional adequacy.**`, `**§3.2 Finding II — ADT elasticity.**`, `**§3.3 Finding III — Concentration response.**`, `**§3.4 Finding IV — Marginal utility of retained capital.**`, `**§3.5 Conjunction and seal.**`
- Bold labels, Article IV: `**§4.1 The admissible set.**`, `**§4.2 Controlling across the union.**`, `**§4.3 Validation floor.**`, `**§4.4 Adversarial construction.**`, `**§4.5 Identification conservatism.**`, `**§4.6 Non-redundancy.**`
- Bold labels, Article V: `**§5.1 Framework.**`, `**§5.2 Joint assurance.**`, `**§5.3 Precision floor, by formula.**`, `**§5.4 Boundary rule.**`, `**§5.5 Point estimates.**`, `**§5.6 Vector-to-bound rule.**`
- Bold labels, Article VI: `**§6.1 The observation window, by formula.**`, `**§6.2 Fixed cutoff, by formula.**`, `**§6.3 Vintage, by formula.**`, `**§6.4 Pre-lock prohibition.**`, `**§6.5 Evidence floor.**`, `**§6.6 Exposure declarations.**`
- Bold labels, Articles VII–VIII: `**§7.1 Defaults.**`, `**§7.2 Departures.**`, `**§8.1 Enumerated minimum.**`, `**§8.2 Unanticipated.**`
- Bold labels, Article IX: `**§9.1 Contents.**`, `**§9.2 Lock mechanics.**`, `**§9.3 Deviation.**`, `**§9.4 Materiality, by recomputation.**`, `**§9.5 Consequences.**`, `**§9.6 Adjudication.**`
- Bold labels, Article X: `**§10.1 Snapshot at lock.**`, `**§10.2 Controlling estimate.**`, `**§10.3 Appendix A.**`, `**§10.5 Menu union.**`
- Bold labels, Article XI: `**§11.1 Symmetric disclosure.**`, `**§11.2 Deadline.**`, `**§11.3 Correction and supersession.**`, `**§11.4 Execution.**`
- Bold labels, Article XII: `**§12.1 Windows.**`, `**§12.2 Commencement and consumption.**`, `**§12.4 Consumption rules.**`, `**§12.5 No interim process.**`
- Bold labels, Article XIII: `**§13.1 Amendments.**`, `**Finding II precision amendment — adopted 2291 after §13.1 cold review.**`, `**§13.2 Revocation.**`, `**§13.2A Coupled reversion amendment — adopted 2293 after §13.1 cold review.**`
- Bold labels, Article XIV: `**§14.1 Schedule B untouched; procedural bridge limited.**`, `**§14.2 Argument quarantine.**`, `**§14.3 No advocacy channel.**`, `**§14.4 Technical objections.**`
- Italic field labels: `*Population:*`, `*Variable:*`, `*Contrast:*`, `*Baseline:*`, `*Counterfactual:*`, `*Horizon:*`, `*Summary:*`, `*Threshold:*`
- Italic defined terms (§10.1): `*Flow Test*, *cycle*, and *institutional obligations*`
- Italic §12.3 labels: `*Original 2279 text, governing the first 2279–2288 window:*`, `*Current rule, prospective from LP-075's enactment:*`, `*Remedial first run:*`, `*Outcome neutrality and separate termination:*`
- Italic note label: `*Disposition history note:`
- Verbatim quotation of the original 2279 §12.3 text: `“A window without a run is the lawful status quo. Nothing compels the chambers to constitute a Commission or a Commission to lock. Once constituted, a Commission that has not locked within two years dissolves without window consequence.”`
- Sentence quoted verbatim by the Presidential ruling (Block E): `"un-shown" must mean the world changed, not the ruler.`
- Phrases §4.5 quotes from §3.2 and §3.4: `by attribution to the schedule change`, `attributable to the retained capital`
- Defined terms: `controlling estimate`, `admissible specification set`, `admissible union`, `equivalence class`, `preregistration`, `MANDATE`, `certification-side panel`, `challenge-side panel`, `mandate carve-out`
- Defined terms: `recomputation-defeating deviation`, `material deviation`, `competence collapse`, `void for indecision`, `window consumption`, `decennial window`, `replacement commencement`, `certification event`, `revocation run`, `Lower-specific revocation run`
- Defined terms: `Lower Incidence Certificate`, `standing canon identity doctrine`, `technical-objection docket`, `naive persistence benchmark`, `held-out terminal segment`, `operative comparison`, `simultaneous bound`, `as-of vintage`, `canonical time authority`
- Defined terms: `Charter Restatement`, `Residual-Risk Register`, `Strategic non-locking`, `Vote-binding is symmetric`, `schedule-attributable impairment margin`, `zero-fail vote`, `2294 authority map`, `Charter adoption history`, `engagement organization`
- Defined terms: `audit-methodology ranking`, `standing Meritboard officer standard`, `burden of motion on the status quo`, `substrate-neutral`, `ab initio`, `engraved`, `outcome-revealing power`, `Flow Test`
- Figures and dates: `from 70 to 50`, `three seats`, `2213 or 2276–2278`, `two decennial windows`, `within ninety days`, `one year`, `ten days`, `within two years of lock`, `one hundred eighty days`, `no later than 2292`, `2289–2298`, `closes 2288`, `(2278)`
- Figures and dates: `95 percent`, `125 percent`, `at least 1.00`, `thirty years`, `ten years ending at the §6.2 cutoff`, `twenty years`, `two complete cycles`, `70 percent upper rate`, `strictly greater than zero`
- Rates: `70/35/17/8`, `50/35/17/8`, `50/25/12.5/6.25`, `No 70/25/12.5/6.25 state is lawful.`
- Amendment dates: `2291-05-20`, `2291-07-02`, `2291-07-19`, `2291-08-04`, `2291-08-05`, `adopted 2293`
- References: `SHA-256`, `RR-3`, `RR-6`, `B1–B6`, `Findings I–IV`, `2295`, `LP-074 §§4–5`, `LP-074 §6`, `§12.4(b)(ii)`, `§12.4(b)(iv)`
- Operative modals, Articles I–II: `may be read to activate any schedule`, `No seat may be held`, `must cover all three fields`, `may not perform through an intermediary`, `must reproduce`, `may hold a seat`, `must be filled from the ranking within ninety days`, `may not exceed one year`, `may not proceed past that milestone`
- Operative modals, Articles III–VI: `may operationalize measurement within §10.3's limits`, `may not define success`, `may be conditioned on`, `none may be ignored`, `must add at least its strongest surviving candidate`, `may exclude another party's addition`, `may loosen any individual bound`, `cannot certify and cannot fail`, `may examine window data`, `no text can erase`
- Operative modals, Articles VIII–XI: `must state attribution`, `may precede lock`, `can repair`, `can be computed away`, `must clear §13.1`, `may operationalize measurement through`, `must use the source authority's canonical series`, `may be selected`, `cannot be published cannot be admitted`
- Operative modals, Article XII: `No run may lock`, `must cause at least one valid Path 2 commencement`, `may only adopt or reject`, `must constitute a Commission`, `may dissolve only upon`, `can impose`, `cannot close`, `cannot discharge`
- Operative modals, Articles XIII–XIV: `must first survive`, `may add to the union`, `may grow but may never shrink`, `can be un-shown`, `must mean the world changed`, `may suspend Schedule B`, `may receive and disposition`, `may not substitute`, `may be filed with the Commission`, `may be filed with the Registrar`
- absent: `founder`
- absent: `lawful nonactivation`
- absent: `Opus`, `Fable`, `GPT`, `Claude`
- absent: removed aphorisms `Litigation is not a clock`, `Curation dies`, `Padding a class multiplies nothing`, `Menu shopping`, `Custody is a service`, `the arithmetic attests itself`, `Growing the evidence is not changing the ruler`, `It does not take meetings`

### rendered: path-2-charter-source.md (the draft through the live renderDoc(md, charterCfg) and linkFirst)
- check-canon (g) pin: `THE PATH 2 CHARTER`
- Guard-mutation probe find-string: `id="s-10-4"`
- Deep-link targets: `id="s-10-4"`, `id="s-12-3"`
- Article anchors: `id="art-1"`, `id="art-2"`, `id="art-3"`, `id="art-4"`, `id="art-5"`, `id="art-6"`, `id="art-7"`, `id="art-8"`, `id="art-9"`, `id="art-10"`, `id="art-11"`, `id="art-12"`, `id="art-13"`, `id="art-14"`
- Parameter Schedule anchor: `id="parameter-schedule"`
- linkFirst result (feeds the check-canon chain "charter → schedule#part-a"): `<a href="path-2-schedule.html#part-a">a schedule adopted by the chambers</a>`

### live: tools/build-path2-pages.mjs (untouched)
- Source read: `const mdCharter = read('documents/path-2-charter-source.md');`
- linkFirst calls: `body = linkFirst(body, 'a schedule adopted by the chambers', SCHEDULE + '#part-a');`, `body = linkFirst(body, 'This Schedule is part of the Charter', CHARTER + '#s-10-4');`

### live: tools/check-canon.mjs (untouched)
- Charter and schedule pins: `charterSrc.includes('THE PATH 2 CHARTER')`, `scheduleSrc.includes('Operative Measure')`, `/part d/i.test(scheduleSrc)`, `charterSrc.includes('id="s-10-4"')`

### live: tools/test-canon-guard-mutations.mjs (untouched)
- Charter probe: `find: 'id="s-10-4"'`

### live: documents/path-2-schedule-source.md (not in this unit; untouched)
- Schedule pins named in the task (they are schedule pins, absent from the charter original and draft): `Operative Measure`, `PART D — STATUS`
- Schedule linkFirst phrase: `This Schedule is part of the Charter`

### live: path-2-charter.html (generated; regenerated from the draft at splice)
- Current probe and deep links: `id="s-10-4"`, `id="s-12-3"`, `law-polling.html#lp-074`, `path-2-schedule.html#part-a`

### live: laws.html (inbound deep link)
- `path-2-charter.html#s-12-3`

### live: law-polling.html (inbound deep link)
- `path-2-charter.html#s-12-3`

### live: path-2-commencement-duty-act.html (inbound deep link)
- `path-2-charter.html#s-12-3`

### live: path-2-schedule.html (inbound deep link)
- `path-2-charter.html#s-10-4`

### live: documents/path-2-presidential-ruling-source.md (quotes this Charter)
- `Block E, because "un-shown" must mean the world changed, not the ruler.`

### live: path-2-certification-2294.html (not in this unit; untouched)
- Certification positive controls: `SCHEDULES A AND B CERTIFIED`, `exactly 30 keyed annual observations`, `Main-12 106.7%`, `ADT-36 122.4%`, `complete ordered window SHA-256-attested`
- Guard-mutation probe: `<body`

### live: tools/verify-path2-certification-2294.mjs (not in this unit; untouched)
- STATUTORY_CONSTANTS title: `title: 'Path 2 LP-074 Final Certification — 2294',`

## (c) Flags

1. **Reading decisions.** Each could reasonably go the other way.
   - **§1.1.** 'substrate-neutral per the standing definition' had no clear subject in the original. It now attaches to "Selection", meaning the chambers' choice of seat-holders.
   - **§3.4.** 'No measurable marginal utility fails this Finding.' now reads "If no marginal utility is measurable, this Finding fails." That matches the threshold, which requires net marginal value strictly greater than zero. The original could be misread as "no amount of utility fails".
   - **§4.4, the mandate.** 'holds a MANDATE, not an interest' became "holds a MANDATE rather than an interest". The contrast is kept because it links to §1.4's quarantine on interests.
   - **§4.4, the challenge-side duty.** 'the challenge-side panel's duty is the strongest admissible case against' became "has the same duty for the case against activation". The original left out the verb and object. The draft supplies them from the certification-side sentence.
   - **§4.5.** The two quoted attribution phrases are now introduced by "This rule governs both". The general "Wherever attribution depends…" clause still leads, so the phrases do not narrow the rule's scope.
   - **§12.3 current rule.** "A Schedule A result neither certifies nor prejudges it" keeps the original pronoun. Schedule B is the nearest subject, but the Lower Incidence Certificate is also a possible antecedent. That ambiguity is carried over from the original, not resolved.
   - **§12.3 original text.** The comment on the quoted 2279 text now reads "the first window closed lawfully without a run". The approved Act pilot uses the same wording. The superseded refusal phrasing ("lawful nonactivation") is absent, and the check-canon regex confirms it.
   - **§1.6, §2.3 and §11.4.** The closing aphorisms became plain scope statements:
     - "A signature attests the record only."
     - "methodological authority, which belongs to the instrument"
     - "execution tests conformity only"

     The adoption ruling's own phrase "judgment belongs to the instrument" is the ruling's wording, not a quotation of the Charter, so no quoted text moved.
   - **§12.4.** "A saboteur therefore gains nothing that publication would not have given and bears every cost the Meritboard can impose." This sentence is kept, although it states a rationale, because the next sentence's "this allocation" and the RR-6 residue depend on it. 'Price' became 'impose'.
   - **§13.2.** 'Growing the evidence is not changing the ruler.' is cut. "All other instrument changes require §13.1 amendment" carries its legal effect. "ruler" now appears only inside the frozen Block E sentence, which is introduced by "Here".
2. **Left verbatim on purpose.**
   - The Parameter Schedule paragraph. It is a figure table, and every figure is frozen.
   - The quoted 2279 §12.3 text.
   - All 27 heading lines.
   - The §3.2 and §3.3 field text, §5.4, §6.4 and §8.1. These were already in plain record voice, and rewording them would change nothing.
3. **Line wrap.** The draft is rewrapped at 72 columns, and its longest body line is 74 characters against the live 82. The generator joins lines, so the rendered output is unaffected. A `git diff` of the source will show most paragraphs as rewrapped.
4. **The Register echoes removed Charter aphorisms.** `documents/path-2-risk-register-source.md` paraphrases four of them in its own disposition rows:
   - 'Litigation is not a clock' (row O-7)
   - 'Menu shopping symmetric, therefore empty' (row 9)
   - 'decided by executing, not predicting' (row 14)
   - 'Suppression by silence abolished' (row 16)

   None of these is a quotation, and the rows cite by § number, so nothing breaks. The Register's own unit decides whether to follow.
5. **Quantifier and negation drift.** This is reported by check.mjs and is not a failure:
   - no 39 → 44
   - only 23 → 27
   - not 40 → 23
   - nothing 10 → 8
   - each 21 → 24
   - every 29 → 30
   - neither 5 → 6
   - never 4 → 2
   - would 2 → 1

   The falls in "not" and "never" come from removing reversal constructions ('not a permission', 'not predicting', 'rules never'). The rises in "only" and "each" come from stating scope positively (§1.6, §2.1, §4.5, §8.2, §9.4, §11.4, §14.2). One "no" is §12.2's "No window has more than one consuming run", which keeps the original's cap of one per window. No threshold, condition or scope changed. The operative modals match paragraph by paragraph.
6. **'Operative Measure' and 'Part D'.** The task lists them for this unit, but they are check-canon pins on the Schedule page (`check-canon.mjs` lines 1275–1276). Neither occurs in the charter source, before or after. Section (b) confirms them in `documents/path-2-schedule-source.md`, which is untouched.
7. **Splice.**
   - Copy `path-2-charter-source.md` over `documents/path-2-charter-source.md`, then run `npm run build:path2-pages`.
   - check.mjs has already run the live generator's `renderDoc`, `linkFirst` and `assertVerbatim` on the draft, and all three pass.
   - The regenerated page keeps every id, so the probe `id="s-10-4"`, the ten inbound `#s-12-3` links and the three inbound `#s-10-4` links still resolve.
   - No certification generator input or hashed annex reads this file, so no digest moves.
