# Records 25.6.3, unit statutehub: reconstruction ledger

Drafts only. No live source was edited. The two drafts in this folder are:

- `ratify-tax-50-ii-statute-source.html`: the reconstructed RATIFY-TAX-50-II statute. It replaces `documents/ratify-tax-50-ii-statute-source.html`, which renders as `pending-ratify-tax-50-ii-statute.html`.
- `build-pending-pages.mjs`: the generator with its prose literals reconstructed. It replaces `tools/build-pending-pages.mjs`. Changed: the section banner paragraph, the statute banner paragraph, the first process-frame paragraph, every page's `description` and `heroSub`, and the hub body paragraphs and lists. Unchanged: all code and comments, the R22/R23 ruling blocks, every label (`pb-label`, `pf-label`), titles, hero titles, kickers, headings and crosslink labels.

Checker: `node docs-review/records-25.6.3/statutehub/check.mjs`. It reads the drafts, the live sources, the committed pages and the guard files, and writes nothing. Besides the ledger, it runs `node --check` on the draft generator. It runs the live generator in memory on the live sources and requires all 7 committed pages byte for byte. It then runs the draft generator on the draft statute and compares every page. It evaluates the check-canon pins and probe find-strings on the draft build, resolves every statute link into the pending pages, and runs a site-wide Tailwind parity build.

Matching conventions:
- Section (a) quotes are matched against the draft's visible text. Block tags become a space, inline tags (`strong`, `a`, `code`) are removed, entities are decoded, curly quotes are read as straight, and whitespace is collapsed. For the generator, the text is that of its prose-literal lines only.
- Section (b) strings are matched raw (whitespace collapsed) against the draft source, or against the draft-built page for `built:` headings. A (b) string not marked absent must also occur in the original. Rows marked `absent:` must not occur in the draft.
- Where the original carried a fact in a reversal, a dash aside or a figure of speech that the reconstruction dropped, the row gives the original wording in single quotes and then quotes the draft text that carries its content.

## Word counts

Words in the visible text (statute: headings, table cells and citations included; generator: prose-literal lines only).

| Document | Live | Draft | Change |
|---|---|---|---|
| ratify-tax-50-ii-statute-source.html | 3212 | 3270 | +1.8% |
| build-pending-pages.mjs | 1325 | 1346 | +1.6% |

Register tells, counted by check.mjs as live → draft (prose only; headings, bold labels, code, bracketed citations and the Doctrine quotation excluded):
- Reversal-shaped constructions ("is not A; it is B", "not A, but B", "A, not B.", "rather than"): statute 6 → 0, generator prose 5 → 0.
- Prose em-dashes: statute 14 → 9, generator prose 26 → 6. The statute's nine are the eight A1–A8 condition labels and the frozen anchor text "Ballot — RATIFY-TAX-50, petition v4.1". The generator's six are the label separators after the six bold criteria in the hub's Path 2 list. The labels are frozen.
- Semicolons: statute 39 → 9, generator prose 8 → 0. The statute's nine end enumerated items in the §4.2 definitions, the Main-12 formula line and the §7 quarantine list.

## (a) Fact ledger

### ratify-tax-50-ii-statute-source.html

Header and filing
- Title (heading, unchanged): `RATIFY-TAX-50-II — Conditional Successor Petition`
- Filed approximately Y175 under the Trajectory Doctrine: `Filed: approximately Y175, under the Trajectory Doctrine.`
- New petition line: `This petition opens a new petition line`
- About sixty-three years after the Y112 failure of RATIFY-TAX-50: `approximately sixty-three years after RATIFY-TAX-50 failed in Y112.`
- 'neither reopens nor revises that closed line': `It does not reopen or revise that closed line.`
- Path 2 chartered at about Y113, 'in the failure's immediate aftermath': `chartered immediately after that failure, at approximately Y113,`
- Six decades of preregistered fiscal data available: `so six decades of preregistered fiscal data are available.`
- Petition authors none of that record: `This petition authors none of that record's contents.`
- Status sought, conditional law: `Status sought: conditional law.`
- Chambers vote on the written rule: `The chambers vote on the rule written below.`
- 'not on a claim that any fiscal condition is presently true': `They are not asked to find that any fiscal condition is presently true.`
- Zero-fail vote registers the rule: `A zero-fail vote registers the rule.`
- No rate change before certification of every assigned condition: `No rate changes until the controlling audit estimate certifies every condition`
- Conditions assigned per schedule: `every condition assigned to the relevant schedule.`
- Any chamber fail closes the line: `Any chamber fail closes this petition line under the preregistered adjudication rule.`
- Historical LP-074 text deregistered to the Process record: `the historical text labeled LP-074 has been deregistered to the Process record`
- Used only as drafting history: `and is used only as drafting history.`
- Trajectory Doctrine is governing law: `The Trajectory Doctrine supplied with this commission is governing law.`

§1 Governing rule and construction
- Heading: `1. Governing rule and construction`
- 'enacted under, and not as an exception to' the Doctrine: `The petition is enacted under the Trajectory Doctrine and is not an exception to it.`
- Doctrine quotation (verbatim): `Top marginal rates track demonstrated institutional need;`
- Doctrine quotation, audited evidence: `any rate reduction requires audited evidence per the Path 2 standing audit`
- Doctrine quotation, no authored facts, zero-fail: `never authored facts — at the standard zero-fail threshold.`
- Item 1, what ratification approves: `Ratification approves only the conditional schedules, definitions, quarantine, and review procedure`
- Item 1, what it does not approve: `It does not approve, adopt, or deem true any base, receipt, obligation,`
- Item 1, estimate list: `growth, incidence, reserve, behavioral, or coverage estimate.`
- Item 2, only a final controlling estimate: `Only a final Path 2 controlling estimate produced from the standing audit's preregistered method`
- Item 2: `may satisfy a condition.`
- Item 2, who may not substitute: `A petition, chamber, founder, or later reviewer may not substitute an authored fact,`
- Item 2, barred substitutes: `a ruling-derived magnitude, or a ratio whose numerator is defined`
- Item 2, constructed ratio: `as a desired multiple of its denominator.`
- Item 3, historical evidence explains: `Historical structural evidence may explain why the rule is proposed.`
- Item 3, cannot certify: `It cannot certify activation.`
- Item 3, earlier ratchet attributed: `The record attributes the earlier ratchet to the transfer of the anti-concentration function`
- Item 3, to the SCM: `to the Savings Circulation Mandate.`
- Item 3, Doctrine requires audited evidence: `The present Doctrine separately requires audited evidence for this reduction.`

§2 Conditional schedules
- Headings: `2. Conditional schedules`, `2.1 Schedule A — Sanctuary and Main`, `2.2 Schedule B — Lower layers`, `2.3 Time of effect`
- Schedule A trigger, §§4–5: `Upon Schedule A certification under §§4–5,`
- Threshold $10,000,000 unchanged: `the top marginal rate on income above the unchanged $10,000,000 threshold`
- 70% to 50% in Sanctuary and Main: `in Sanctuary and Main changes from 70% to 50%.`
- 70% until certification: `Until that certification, the 70% rate remains in force.`
- Threshold, SCM, sub-threshold administration unchanged: `The threshold, every SCM parameter, and all sub-threshold bracket administration remain unchanged.`
- Schedule B one nonseverable Lower schedule: `change as one nonseverable Lower schedule,`
- Schedule B only after A and a separate certificate under §6: `and only after Schedule A certification and a separate Lower Incidence Certificate under §6.`
- Rate table header: `Layer Pre-certification rate Certified rate`
- −1 35% to 25%: `−1 35% 25%`
- −2 17% to 12.5%: `−2 17% 12.5%`
- −3 8% to 6.25%: `−3 8% 6.25%`
- Pre-certification schedule is the post-Y112 schedule: `are the schedule left in place after the Y112 petition failed.`
- Exact geometric cascade: `The successor rates complete the proposed exact 50/25/12.5/6.25 geometric cascade.`
- Any §6 failure keeps all three Lower rates: `If any Lower layer fails any §6 condition,`
- All three stay in force: `all three pre-certification Lower rates remain in force.`
- Schedule A may operate on its own certification: `Schedule A may nevertheless operate after its own certification,`
- 'while their in-layer destinations and supported obligations remain unresolved': `even while the in-layer destinations and supported obligations of Lower collections remain unresolved,`
- Reason, Lower collections cannot reach Main: `because those collections cannot reach the Main treasury.`
- Time of effect: `Each schedule takes effect for the first assessment period beginning after its required certificate`
- Final publication: `is published as final.`
- Non-final audits do not activate: `Publication of a failing, qualified, incomplete, nonreproducible, or merely preliminary audit does not activate`
- 'changes timing only': `This clause governs timing only.`
- No substitute, no second vote: `It does not permit a non-audit substitute or a second chamber vote on authored facts.`

§3 Separated streams
- Heading: `3. Fiscal architecture — separated streams`
- Operative accounting rule: `This petition carries forward the record's fiscal separation as an operative accounting rule:`
- Income-tax stream tested against Main obligations: `Income-tax receipts are tested only against the enumerated Main institutional obligations`
- Assigned to that stream: `legally assigned to that stream.`
- No Lower receipt as Main revenue: `No Lower receipt is counted as Main revenue.`
- Dividend stream: `Automation-side ADT receipts are tested only against total dividend obligations.`
- SCM recycle excluded: `SCM garnish recycle is separately partitioned and excluded from the dividend-coverage numerator.`
- No cross-credit, ADT for income tax: `ADT coverage cannot cure an income-tax coverage failure.`
- No cross-credit, income tax for ADT: `An income-tax surplus cannot cure an ADT coverage failure.`
- No cross-credit, unidentified Lower receipt: `An unidentified Lower receipt cannot cure either failure.`
- Prior record's treatment: `The prior record treats the disclosed tax-revenue effect as a Main-treasury issue`
- ADT reserve separate: `and the ADT reserve as a separate dividend issue.`
- Backfill authority: `Cyclical backfill remains governed only by the preexisting authority identified in the prior cadence rider`
- Published per drawdown: `and must be published per drawdown.`
- Excluded from numerators: `It is excluded from every activation coverage numerator.`
- Lower quarantine: `Before Schedule B certification, Lower receipts stay outside both federal coverage calculations`
- 'retain their existing rates': `and are collected at the existing rates.`
- 'assumes neither their destination nor the obligations they support': `This petition makes no assumption about their destination or the obligations they support.`

§4 Trigger instrument
- Headings: `4. Path 2 trigger instrument and defined tests`, `4.1 Controlling estimate`, `4.2 Defined quantities`, `4.3 Reproducibility and independence`
- Defined term: `"Path 2 controlling estimate" means the final estimate designated controlling`
- Definition basis: `under the standing audit's preregistered method.`
- 'The estimate, not this petition, must supply': `The estimate must supply all observed inputs, counterfactual calculations, uncertainty treatment, and findings needed below.`
- Same, the petition's part: `This petition supplies none of them.`
- Multidecade record available: `The audit has a multidecade record available at the commissioned dateline.`
- Petition states no result: `This petition states no result from that record.`
- Monthly publication duty: `For each month m in the applicable audit window, the controlling estimate must publish:`
- T50(m): `T50(m): income-tax receipts the audit estimates would be attributable to Sanctuary and Main`
- T50(m) basis: `under the 50% top rate, using the audited tax base`
- T50(m) exclusions: `excluding any uncited velocity, recruitment, migration, avoidance, or taxable-base-elasticity benefit;`
- M(m): `M(m): enumerated Main obligations legally assigned to income-tax funding;`
- A(m): `A(m): automation-side ADT receipts, excluding income tax, SCM garnish recycle, Lower collections, and cyclical backfill;`
- D(m): `D(m): total legally due dividend obligations.`
- Main-12 formula and window: `Main-12 = Σ T50(m) / Σ M(m) for the twelve completed months`
- Preceding the cutoff: `immediately preceding the audit cutoff;`
- ADT-36 formula and window: `ADT-36 = Σ A(m) / Σ D(m) for the thirty-six completed months`
- Carried parameters, twelve-month review and 105% line: `The twelve-month Main review period, the 105% warning line,`
- Carried parameters, thirty-six-month horizon and test: `the thirty-six-month projection horizon, and the ADT trailing thirty-six-month test`
- Source of the parameters: `are carried from the prior petition's disclosed gate and cadence mechanics.`
- Reproducibility fields: `The estimate must publish, for every included month, the date, numerator, denominator,`
- Reproducibility fields, continued: `inclusion rule, adjustment, and weight sufficient to reproduce each aggregate and monthly result.`
- A(m) independently derived: `A(m) must be independently derived from audited automation-side receipts`
- A(m) not a multiple of D(m): `and may not be defined as a multiple of D(m).`
- Insufficient showings: `A range, minimum, structural multiplier, or narrative abundance claim does not satisfy this subsection.`

§5 Concessions and Schedule A conditions
- Headings: `5. Concessions and conditions — Schedule A`, `5.1 Concessions`, `5.2 Schedule A conditions`
- Unqualified concession on Y112: `This successor petition concedes without qualification that the Y112 record`
- Predicates not demonstrated: `did not independently demonstrate its fiscal predicates:`
- Circular ratio: `the dividend ratio was circular,`
- Series not reproducible: `the historical series was not reproducible,`
- Magnitudes authored: `the Main and Sanctuary magnitudes were authored,`
- No retroactive cure: `a future audit could not retroactively cure the condition precedent.`
- Further concessions (new counting sentence, flag 4): `It further concedes four points.`
- Lower incidence unidentified: `Lower incidence remains unidentified.`
- Rider guarantees neither passage nor solvency: `The cadence rider cannot guarantee passage or solvency.`
- Hysteresis: `Hysteresis is real.`
- No unaudited behavioral benefit: `No behavioral benefit may be priced without audited evidence.`
- If and only if, one estimate: `Schedule A activates if and only if one Path 2 controlling estimate certifies`
- Without qualification: `all conditions below without qualification:`
- A1 provenance: `A1 — Provenance Every input and transformation used for certification is audit-derived`
- A1 method: `under the preregistered Path 2 method.`
- A1 bar: `No authored or ruling-derived magnitude is used as evidence of compliance.`
- A2: `A2 — Main current coverage Main-12 ≥ 105%.`
- A3: `A3 — Main monthly floor For each of the same twelve months, T50(m) / M(m) ≥ 100%.`
- A3 no aggregate masking: `The audit may not use an aggregate surplus to conceal a monthly shortfall.`
- A4 baseline: `A4 — Main forward floor Under the audit's preregistered baseline,`
- A4 horizon: `no month in the thirty-six months after the audit cutoff`
- A4 floor: `is estimated below 100% Main coverage.`
- A4 and B5, no barred behavioral credit: `No favorable behavioral response barred by §4.2 may be credited.`
- A5: `A5 — Dividend aggregate ADT-36 ≥ 120%.`
- A6: `A6 — Dividend monthly floor For every month in the same thirty-six-month window, A(m) / D(m) ≥ 100%.`
- A7: `A7 — Stream separation Conditions A2–A6 remain satisfied after excluding all cross-credits prohibited by §3.`
- A8: `A8 — Reproducibility The publication satisfies §4.3 and reproduces every asserted limb from disclosed monthly values.`
- Denominators positive and audit-derived: `Each denominator required by A2–A6 must be positive and audit-derived.`
- Undefined ratio fails: `An undefined ratio fails certification.`
- 'These are conditions, not findings.': `The table sets activation conditions.`
- No claim of satisfaction: `This petition makes no claim that any A condition is satisfied.`
- No retroactive validation of Y112: `A later audit cannot retroactively validate the Y112 petition.`
- Only activates the new rule: `It can only activate this newly ratified conditional rule.`

§6 Schedule B certificate
- Heading: `6. Schedule B certification — Lower incidence restatement`
- Opposition's basis: `Using the old petition's authored bases, the opposition estimated`
- About $100.75B annual reduction: `an approximately $100.75B annual reduction in siloed Lower collections.`
- Destinations unknown, conceded: `It conceded that the destinations and supported obligations of those collections were unknown.`
- Retained only as adverse record: `That number is retained here only as cited adverse record.`
- 'neither adopted as fact nor used in any trigger calculation': `It is not adopted as fact and is not used in any trigger calculation.`
- After Schedule A, if and only if: `After Schedule A is certified, Schedule B activates if and only if`
- Issuing audit and certificate: `the charter-restatement incidence audit publishes a final Lower Incidence Certificate`
- Per layer, separately: `for each of −1, −2, and −3 separately, satisfies all of the following:`
- B1 route map: `Complete route map. It identifies every legal fund, account, or other termination point`
- B1 collection: `receiving that layer's top-marginal income-tax collection`
- B1 reconciliation: `and reconciles the full audited collection stream to those destinations.`
- B1 failure: `Any unreconciled amount fails the condition.`
- B2 obligation map: `Complete obligation map. It identifies every legally enumerated obligation funded in whole or part`
- B2 payment order: `from each destination, the lawful order of payment,`
- B2 non-tax sources: `and every legally available non-tax source.`
- B2 express zero: `If there is no such obligation, it must expressly certify zero`
- 'rather than infer zero from silence': `and not infer zero from silence.`
- B3 Li(m): `Proposed-rate quantities. For each month, it publishes Li(m),`
- B3 Li(m) meaning: `the receipts estimated under that layer's proposed rate,`
- B3 Oi(m): `and Oi(m), the obligations legally chargeable to those receipts.`
- B3 no cross-credit: `It uses no Sanctuary, Main, ADT, SCM-recycle, or cyclical-backfill cross-credit.`
- B4 positive obligations: `Current coverage. Where Oi(m) is positive, the audit must find for each layer that`
- B4 aggregate 105%: `Σ Li(m) / Σ Oi(m) ≥ 105% over the twelve completed months before the cutoff`
- B4 monthly 100%: `and Li(m) / Oi(m) ≥ 100% in every included month.`
- B4 zero-obligation layer: `A zero-obligation layer satisfies this limb only if the complete maps in B1–B2`
- B4 express certification: `expressly certify that no obligation was legally chargeable in any included month.`
- B4 reporting duty (tie made explicit, flag 3): `For such a layer, the audit must report "no chargeable obligation"`
- B4 no manufactured ratio: `and must not manufacture a ratio.`
- B4 failures: `An undefined ratio or mixed zero/positive series not evaluated month by month fails.`
- B5 baseline: `Forward coverage. Under the incidence audit's preregistered baseline,`
- B5 floor: `no Lower layer is estimated below 100% coverage`
- B5 horizon: `in any of the thirty-six months after the cutoff.`
- B6 reproducibility: `Reproducibility and Path 2 adoption. The incidence audit publishes the monthly data and method`
- B6 scope: `needed to reproduce conditions B1–B5,`
- B6 adoption: `and the Path 2 standing audit adopts its fiscal quantities into the controlling estimate`
- B6 timing: `before Schedule B certification.`
- B6 failure: `A narrative assurance or an audit-pending entry fails.`
- 'These are conditions, not findings.': `The list sets activation conditions.`
- No claim about Lower streams: `This petition makes no claim that any Lower stream, destination, obligation,`
- Safe or funded, either way: `or proposed-rate coverage condition is safe, unsafe, funded, or unfunded.`

§7 Evidentiary quarantine
- Heading: `7. Evidentiary quarantine`
- May remain in the record: `The following material may remain in the historical record`
- Legally incapable of activation: `but is legally incapable of activating either schedule:`
- Old authored figures: `the old petition's authored tax bases, obligations, growth rate, coverage margins, ADT magnitude,`
- Old authored figures, continued: `PJS participation, SCM duty cycle, and break-even sensitivities;`
- Constructed 1.3× numerator and 130% ratio: `the constructed 1.3-times-dividend-obligation numerator, the resulting 130% ratio,`
- Monthly range: `and the summarized monthly range;`
- Ruling-derived magnitudes: `any ruling-derived magnitude or chamber statement offered as a fiscal measurement;`
- Retroactive-cure claims: `any claim that later evidence retroactively cured the Y112 condition precedent;`
- Unmeasured behavioral responses: `any quantified velocity, recruitment, migration, avoidance, taxable-base elasticity, consumption, or savings response`
- Unmeasured by the audit: `not measured by the preregistered audit; and`
- Opposition's estimate: `the opposition's authored-base Lower collection estimate except as adverse historical disclosure.`
- No inference from six decades of history: `No inference may be drawn from the six decades of available audit history`
- Until the result publishes: `until the controlling estimate publishes the relevant result.`
- Inactive states: `If the record shows silence, pendency, ambiguity, partial compliance, or conflicting estimates,`
- Schedule stays inactive: `the affected schedule remains inactive.`

§8 Disclosed costs and limits
- Heading: `8. Disclosed costs and limits`
- Retention rises: `The proposed rates increase marginal retention.`
- 1.67× Sanctuary/Main: `The prior record calculated retention ratios of 1.67× in Sanctuary/Main,`
- 1.15×, 1.05×, 1.02×: `1.15× in −1, 1.05× in −2, and 1.02× in −3.`
- Rate arithmetic: `Those ratios are rate arithmetic.`
- 'not audit certification of fiscal or equilibrium outcomes': `They are not an audit certification of any fiscal or equilibrium outcome.`
- SCM feedback and −2/−3 whale savings: `The prior record described SCM feedback and disclosed that private whale savings`
- Outside SCM attribution: `in −2 and −3 sit outside SCM attribution.`
- 'does not convert those descriptions into a fiscal-safety finding': `This petition does not treat those descriptions as a fiscal-safety finding.`
- Hysteresis: `Hysteresis remains.`
- Retained income unrecoverable: `A later rate increase cannot recover income retained during a lower-rate interval.`
- No behavioral benefit priced: `No velocity, recruitment, migration, avoidance, taxable-base-elasticity, consumption, or savings benefit`
- Asserted or priced: `is asserted or priced into certification.`
- Schedule B withheld ('precisely' dropped): `Schedule B is withheld because unidentified Lower incidence establishes neither safety nor concrete defunding.`
- Rider guarantees process: `The cadence rider below guarantees review, introduction, and a vote.`
- Not passage, restoration, solvency: `It does not guarantee passage, restoration, or solvency.`

§9 Cadence rider
- Heading: `9. Trajectory Doctrine cadence rider`
- Applies after activation: `After either schedule activates:`
- Meritboard review trigger: `Meritboard must complete a fiscal review whenever trailing-twelve-month coverage`
- 105% trigger: `for any activated income-tax schedule falls below 105%,`
- Five-year review: `and in all events every five years from that schedule's activation.`
- Six-month review: `A triggered review must finish within six months.`
- Projection trigger: `If the latest Path 2 controlling estimate projects below-100% coverage within thirty-six months,`
- Twelve-month introduction: `a corrective rate LP must be introduced within twelve months after review completion`
- Six-month vote: `and must receive its gauntlet vote within six months after introduction.`
- 'bind those process deadlines, not the outcome': `Review findings bind those process deadlines.`
- Same: `They do not bind the outcome.`
- Corrective change route: `Any corrective rate change proceeds under the Trajectory Doctrine`
- Zero-fail process: `and the applicable federal zero-fail process.`
- 'neither restores a rate automatically nor compels a chamber's vote': `This rider does not restore a rate automatically and does not compel a chamber's vote.`
- Latest estimate: `Every review must use the most recent Path 2 controlling estimate.`
- Quarantine holds: `The quarantined material in §7 may not return as an operating premise.`
- Backfill per §3.4: `Cyclical backfill draws remain governed and published as stated in §3.4.`
- Backfill proves nothing: `Neither a draw nor unused authority counts as proof that an activated rate remains adequate.`
- Later reductions: `Any later reduction is a new application of the Trajectory Doctrine`
- New evidence at zero-fail: `and requires new Path 2 audited evidence at the zero-fail threshold.`
- No reusable exception: `Nothing in this petition establishes a reusable exception.`

§10 Design rationale
- Heading and table header: `10. Design rationale`, `Structural choice Objection structurally removed`
- Row 1: `Conditional registration separates the chambers' legal judgment from the audit's factual judgment.`
- Row 1: `No schedule activates on the petition's assertion.`
- Row 1 answer: `Meritboard: the chambers are no longer asked to vote that authored fiscal facts are true.`
- Row 2: `Final Path 2 certification precedes effect,`
- Row 2: `the audit must disclose reproducible monthly inputs`
- Row 2: `and independently derive both sides of each ratio.`
- Row 2 answer: `Meritboard: the proposal no longer asks a future audit to retroactively validate a present cut.`
- Row 2 answer: `The constructed 130% showing cannot satisfy the trigger.`
- Row 3: `The evidentiary quarantine bars every old authored magnitude, ruling-derived magnitude,`
- Row 3: `summarized monthly history, and behavioral instinct from the trigger.`
- Row 3 answer, 'disclosure is replaced by legal inadmissibility, eliminating the old petition's dependence on authored compliance': `Meritboard: the old petition disclosed its authored material and still depended on authored compliance.`
- Same: `This petition makes that material legally inadmissible and removes the dependence.`
- Row 4: `Income-tax/Main and ADT/dividend coverage are independently tested with no cross-credit.`
- Row 4 answer, 'cannot launder' (the statute's own verb 'cure' from §3): `Meritboard and Sanctuary: dividend reserve evidence cannot cure a Main-tax shortfall,`
- Same: `and a tax surplus cannot cure a dividend shortfall.`
- Row 5: `Schedule B is separate, later, and nonseverable.`
- Row 5: `All Lower rates stay unchanged unless the restatement traces every receipt and obligation`
- Row 5: `and all three layers clear the conditions.`
- Row 5 answer, ~$100.75B/yr: `Lower: the unknown incidence of the cited ~$100.75B/yr authored-base estimate`
- Row 5 answer: `no longer attaches to an immediate Lower rate cut.`
- Row 6 ('but routes'): `The cadence rider retains mandatory review and deadlines`
- Row 6: `and routes every later rate decision through the Trajectory Doctrine.`
- Row 6 answer: `Court and Meritboard residual: the rider has process force.`
- Row 6 answer, 'without pretending to guarantee solvency': `It does not claim to guarantee solvency,`
- Row 6 answer, 'or evading the governing vote rule': `and it does not evade the governing vote rule.`
- Lower design, conservative by design: `The Lower design is deliberately more conservative than a rule`
- Compared rule: `making the whole cascade depend on Main-only evidence.`
- Sanctuary/Main rule operates: `It permits the audited Sanctuary/Main rule to operate`
- Lower reductions withheld: `and withholds every Lower reduction until the record identifies what those collections do`
- Coverage demonstrated: `and demonstrates proposed-rate coverage.`
- 'without treating uncertainty as proof': `It does not treat uncertainty as proof.`

§11 Ratification clause
- Heading: `11. Ratification clause`
- One question: `The chambers are asked one question:`
- The question (bold, unchanged): `Shall RATIFY-TAX-50-II register as the conditional rule in §§1–10?`
- Zero fails registers: `Zero chamber fails: the conditional law registers.`
- Schedule A after §§4–5: `Schedule A takes force only after §§4–5 are certified.`
- Schedule B after A and §6: `Schedule B takes force only after Schedule A and §6 are certified.`
- Any fail, nothing registers: `Any chamber fails: no provision registers and no rate changes.`
- Line closes until the audit lands: `This petition line closes as failed until the audit lands,`
- No iterative resubmission: `without iterative resubmission in this line.`
- No synthetic margin (unchanged): `No synthetic margin is stated or predicted by the drafting seat.`

Citation key
- Heading: `Citation key — attached record only`
- 'Every citation below' (the citations are above the key, flag 3): `Every citation in this instrument resolves to a page a reader can open.`
- Sigil is the link: `The sigil is the link.`
- 'stays text': `The section reference beside it is plain text,`
- 'lands on that section where the page carries one': `and the link lands on that section where the target page has one.`
- [C]: `[C] Commission of record, Process tier: the commissioning request, cited by named heading.`
- [C] governing law: `Its governing law is published as the Trajectory Doctrine.`
- [C] dateline and adjudication: `Its dateline and adjudication are recorded at the Session Record.`
- [P]: `[P] Ballot — RATIFY-TAX-50, petition v4.1, cited by section and item.`
- [O]: `[O] Opposition Brief, cited by finding or named section.`
- [AB]: `[AB] Advocacy Brief, cited by numbered argument or "Concessions and why."`
- [SB]: `[SB] Supplemental Steelman, cited by numbered argument or "Concessions."`
- [H]: `[H] Rate-line statutes, cited by statute section or labeled field.`
- 'LP-073 stands in this register' (flag 3): `LP-073 is in the law register.`
- Drafting designation LP-074 preserved: `The drafting designation LP-074 is preserved at the Deregistered Statutes of record`
- Never registered in world: `and was never registered in world.`

Citations
- All 72 bracketed citations are byte-identical and in their original positions (check.mjs compares them in sequence), so each still follows the sentence it supports. Two samples: `[C, "IN-WORLD DATELINE"]`, `H, Drafting designation LP-074 §4, treated as drafting history under the filing notice]`

### build-pending-pages.mjs

Section banner (`banner()`, carried by the ballot, brief, record and hub pages)
- Label (unchanged) and outcome: `FAILED PETITION: 1–4 at gauntlet and 3–2 on advocacy review,`
- Short of zero-fail: `short of the zero-fail threshold.`
- 'remains final': `That verdict is final, and its authored figures never activated law.`
- 'distinct conditional statute': `The later LP-074 successor was a separate conditional statute.`
- Findings I–IV: `Its 2294 Path 2 audit passed Findings I–IV`
- A and B certified independently: `and certified Schedules A and B independently,`
- 'making 50 / 25 / 12.5 / 6.25 effective in 2295': `and 50 / 25 / 12.5 / 6.25 took effect in 2295.`
- Briefs published as record: `All three original briefs are published as historical record.`
- 'not current-rate authority': `None of them is current-rate authority.`

Statute banner (`statuteBanner()`; label frozen since v25.6.0)
- Status and 5–0 registration: `ENACTED — SCHEDULES ACTIVE FROM 2295. LP-074 registered 5–0 and changed no rate on passage.`
- Audit sequence: `The 2294 Path 2 audit passed Findings I–IV, certified Schedule A,`
- B1–B6 then Schedule B: `independently passed B1–B6, and certified Schedule B.`
- Valid notice, 2295: `Valid notice made the complete 50 / 25 / 12.5 / 6.25 schedule effective in 2295.`
- 'preserves the conditional statute exactly as filed' (flag 1): `This page carries the conditional statute as filed, restated in plain wording.`
- Restatement scope: `Its figures, numbering and the meaning of every provision are unchanged.`

Process frame (`processFrame()`, first paragraph; the R22/R23 blocks are frozen)
- Drafting archive defined: `the out-of-world authorship history behind the civilization's fiscal law.`
- 'not a page of the world's own record': `It is not part of the world's own record,`
- Nothing in force: `and nothing in it is in force.`
- Interventions and withdrawal (bold, unchanged): `The archive keeps interventions and their withdrawal alike.`
- In world, failed: `In world, RATIFY-TAX-50 failed.`
- LP-074 enacted separately: `The later LP-074 conditional successor was enacted separately,`
- Both schedules 2294: `and both of its schedules certified in 2294.`
- LP-073 historical after 2295: `LP-073's 70 / 35 / 17 / 8 schedule is historical after 2295.`

Ballot page
- Description: `Historical ballot text for the failed RATIFY-TAX-50 petition, retained with its briefs.`
- Description: `Its authored evidence never activated law.`
- Description: `The later conditional successor certified independently in 2294.`
- Hero: `Petition v4.1, the text carried to the gauntlet.`
- Hero, 1–4: `It failed there 1–4.`
- Hero, 3–2: `An advocacy review narrowed the vote to 3–2,`
- Hero, '— still short of the zero-fail threshold': `which was still short of the zero-fail threshold.`
- Hero, 'Read alongside the three briefs retained with it': `The three briefs retained with it are linked below.`

Opposition page
- Description: `The in-world opposition brief for RATIFY-TAX-50:`
- Description, attached verbatim: `the adversarial-review findings attached verbatim to the gauntlet ballot.`
- Description, held two chambers: `Its findings held Meritboard and Lower at both adjudications, and the petition failed.`
- Description and hero, permanent record: `Retained as permanent record.`
- Hero, 'the case against the schedule': `The case against the schedule:`
- Hero, 'a real legislature' ('real' dropped): `the hostile analysis a legislature publishes alongside a proposal.`
- Hero: `It attached to the ballot verbatim and is retained as permanent record.`
- Hero, 'the one the advocacy review could not move Meritboard or Lower off': `The advocacy review could not move Meritboard or Lower off it.`

Advocacy page
- Description: `The affirmative advocacy brief for RATIFY-TAX-50, a cold, citation-verified review.`
- Description, 3–2 and three chambers: `It re-ran the chamber vote at 3–2 and moved Court, Sanctuary, and Main.`
- Description, 'but falling short of the zero-fail enactment threshold': `The result fell short of the zero-fail enactment threshold.`
- Hero: `The strongest affirmative case the record supports,`
- Hero: `argued cold with every citation verified.`
- Hero, three chambers moved: `It re-ran the vote and moved three chambers: Court, Sanctuary, and Main.`
- Hero, zero-fail rule and the two holds: `Meritboard and Lower held, and enactment requires zero failing chambers.`

Supplemental page
- Description: `The supplemental steelman for RATIFY-TAX-50, a fuller affirmative restatement`
- Description, timing: `registered after the 3–2 adjudication.`
- Description, 'Per the R9 termination pattern': `Under the R9 termination pattern it did not reopen the vote.`
- Hero: `The affirmative case restated at full length,`
- Hero, 'had already closed': `registered after the 3–2 adjudication had closed.`
- Hero, no re-adjudication: `Under the R9 termination pattern it was recorded without re-adjudication.`
- Hero, 'a brief the record keeps but the vote never heard': `It was not before the chambers when they voted.`

Session record page
- Description: `The drafting provenance behind RATIFY-TAX-50: the authorial rulings of record,`
- Description: `the adversarial-review ledger, and the line closure that produced the v4.1 ballot text`
- Description, tier: `Process tier.`
- Description: `It records out-of-world authorship,`
- Description: `including the interventions that were made and later withdrawn.`
- Hero: `The out-of-world drafting provenance:`
- Hero, the override aside: `The rulings include the override applied during drafting and later withdrawn.`
- Hero, 'simply failed': `In world, the petition failed.`

Statute page
- Description, 'The full enacted text of LP-074' (flag 1): `The full conditional statute enacted as LP-074:`
- Description, contents: `governing rule, Schedules A and B, A1–A8 and B1–B6, evidentiary quarantine, and cadence rider.`
- Description, 2294 and 2295: `Both schedules certified in 2294 and became active in 2295.`
- Hero, 'The instrument as filed and enacted': `The conditional rule the chambers voted, as filed and enacted.`
- Hero, A then B independently: `Its 2294 Path 2 audit certified Schedule A and then, independently, Schedule B.`

Hub page
- Description: `The drafting archive behind the civilization's ratification record.`
- Description: `RATIFY-TAX-50 failed and remains failed.`
- Description, 'the later independently audited LP-074 successor': `The later LP-074 successor, independently audited, certified both schedules in 2294.`
- Hero: `The drafting archive: decided proposals, the adversarial briefs published alongside them,`
- Hero, '— interventions and withdrawals included': `and their authorship provenance, including interventions and their withdrawal.`
- Body: `This section is the drafting archive behind the civilization's ratification record.`
- Body: `It holds proposals that were drafted, adversarially reviewed and carried to a decision,`
- Body: `with the briefs published alongside each.`
- Body, 'not pre-decided': `Outcomes are not decided in advance.`
- Body, failed vote legitimate: `A failed vote is a legitimate output and a boundary marker`
- Body, LP-062 / LP-065: `under standing doctrine (LP-062 / LP-065).`
- Body, 'what the drafting did and then undid': `As an archive of authorship, it keeps the interventions made during drafting`
- Body: `and their withdrawal.`
- Body, world's record: `The world's own record keeps only what the world decided.`
- Failed petition, §12.1 reduction: `FAILED PETITION. The original petition would have reduced the §12.1 top-marginal schedule to`
- Proposed schedule: `50 / 25 / 12.5 / 6.25.`
- Votes: `It failed 1–4 at gauntlet and 3–2 on advocacy review.`
- 'never activated anything': `Its authored evidence activated nothing.`
- 'a distinct enactment': `The later LP-074 conditional successor was a separate enactment.`
- 'making the complete cascade effective in 2295': `and the complete cascade took effect in 2295.`
- 'What survived the original failure was the direction.': `The direction of the original petition survived its failure.`
- 5–0 endorsement: `Every chamber endorsed the trajectory principle, 5–0 across the ratification chambers,`
- Magnitude refused (wording kept, flag 6): `while refusing the magnitude then supported.`
- Doctrine location: `The principle stands as the Trajectory Doctrine at Whitepaper §12.1.`
- Successor's evidence: `The later successor proceeded on independently locked audit evidence`
- No retroactive validation: `and did not retroactively validate the failed petition's authored figures.`
- Briefs as record: `All three original briefs are published as permanent historical record.`
- Drafting note, interval and override: `During the v22.0–v22.1 interval, on an authorial override of the failed chamber result,`
- Drafting note, register entry: `the reduced schedule was written into the law register as an enacted statute`
- Drafting note, designation: `under the drafting designation LP-074.`
- Drafting note, LP-075: `A trajectory statute was registered beside it as LP-075.`
- Drafting note, withdrawal and deregistration: `The override was withdrawn at v22.1, and both entries were deregistered at v22.2.`
- Drafting note, first reason: `The first was deregistered because it described an enactment that never occurred in world.`
- Drafting note, second reason ('rather than the register'): `The second was deregistered because its principle belongs in doctrine and not in the register.`
- Drafting note, verbatim preservation: `Both texts are preserved verbatim at the deregistered statutes of record,`
- Drafting note, 'the full sequence is told in the session record': `and the session record sets out the full sequence.`
- Drafting note, non-canon: `None of that drafting designation history is world canon.`
- Drafting note, register's LP-074: `The register's LP-074 is RATIFY-TAX-50-II, registered 5–0 at ~Y175 (enacted 2278).`
- Drafting note, LP-075 non-canon: `The former drafting designation LP-075 remains non-canon.`
- Drafting note, number reissued: `Its number was later issued in world to LP-075, the Path 2 Commencement Duty Act,`
- Drafting note, 2291: `enacted 2291.`
- Drafting note, no validation: `That later issuance does not validate the deregistered text.`
- Path 2, workstream ('decoupled from'): `Path 2 is a standing preregistered audit workstream, independent of any petition vote.`
- Path 2, supersession: `Its estimates supersede the ballot's authored values as they land (petition v4.1 §7(e)).`
- Path 2, 'the gate rather than a follow-up': `Under the Trajectory Doctrine, the audit comes first and is the gate for any reduction.`
- Path 2, re-petition: `A failed reduction may be re-petitioned when the controlling estimate lands,`
- Path 2, standard: `on audited facts and at the standard zero-fail threshold.`
- Path 2, genuine ratification: `A genuine ratification would have to answer the questions below.`
- Path 2, six criteria: `The audit binds itself to six enforceability criteria:`
- Criterion 1: `Preregistered methodology — the estimation method is fixed and published before any results.`
- Criterion 2: `Fixed data cutoff — each estimate names the data window it draws on.`
- Criterion 3, 'defined ahead of the numbers': `Definitions frozen before results — measured terms are defined before the numbers exist`
- Criterion 3: `and are never fitted to them.`
- Criterion 4, 'no directional thumb on the scale': `Symmetric revision — estimates move up or down on the evidence, with no directional bias.`
- Criterion 5, 'ships with its band, not as a bare point estimate': `Published uncertainty — every controlling figure is published with its uncertainty band.`
- Criterion 6, 'settled in advance of seeing the values': `Predetermined controlling-estimate rule — the rule for which estimate governs`
- Criterion 6: `is settled before the values are seen.`
- Two questions: `Two questions were preregistered to the workstream:`
- Question (a) label: `(a) SCM activation-frequency response to released liquidity.`
- Question (a): `Whether the liquidity released at the proposed 50 / 25 / 12.5 / 6.25 schedule`
- Question (a): `would raise district aggregates enough to increase Savings Circulation Mandate trigger frequency,`
- Question (a): `and by how much.`
- Question (a), 'the bound the affirmative case leans on to answer concentration': `The affirmative case relies on this bound to answer the concentration objection.`
- Question (b) label: `(b) Marginal utility of private capital flow in a post-scarcity upper stack.`
- Question (b): `What an additional retained dollar of elite liquidity buys the civilization`
- Question (b): `once survival and the dividend are already funded from the automation side.`
- 'Those questions received a rulebook': `The rules for answering those questions are the Path 2 Charter, its §10.4 Schedule,`
- Register: `and its Residual-Risk Register.`
- First window: `The first window, 2279–2288, closed without a run.`
- LP-075 remedial process, 2292: `LP-075 later compelled the remedial process, which locked in 2292.`
- 2294 certification: `The 2294 certification passed Findings I–IV and certified both LP-074 schedules independently.`
- Valid notice: `Valid notice made 50 / 25 / 12.5 / 6.25 effective in 2295.`

## (b) Frozen-string checklist

### ratify-tax-50-ii-statute-source.html
- check-canon (e3) full statute text: `RATIFY-TAX-50-II — Conditional Successor Petition`
- check-canon (e3) /A1/ and /B1/: `A1 — Provenance`, `B1–B2`, `B1–B5`
- check-canon (e3) citation apparatus (>= 125) and guard-mutation probe find-string: `class="ls-cite"`
- Build assertion (exactly 125 sigil cites; check.mjs counts 125 of 133 ls-cite): `class="ls-cite">C</a>`, `class="ls-cite">P</a>`, `class="ls-cite">O</a>`, `class="ls-cite">AB</a>`, `class="ls-cite">SB</a>`, `class="ls-cite">H</a>`
- Same-page anchors the build rehomes to law-polling.html: `href="#lp-073" class="ls-cite">H</a>`, `href="#lp-073" class="ls-cite">LP-073</a>`
- Deep link, session record: `pending-ratify-tax-50-record.html#r14`
- Deep links, ballot: `pending-ratify-tax-50-ballot.html#sec-1`, `pending-ratify-tax-50-ballot.html#sec-2`, `pending-ratify-tax-50-ballot.html#sec-3`, `pending-ratify-tax-50-ballot.html#sec-4`, `pending-ratify-tax-50-ballot.html#sec-5`, `pending-ratify-tax-50-ballot.html#sec-7`
- Deep links, opposition: `pending-ratify-tax-50-opposition.html#finding-1`, `pending-ratify-tax-50-opposition.html#finding-2`, `pending-ratify-tax-50-opposition.html#finding-5`, `pending-ratify-tax-50-opposition.html#finding-7`, `pending-ratify-tax-50-opposition.html#finding-9`, `pending-ratify-tax-50-opposition.html#ungrounded-instincts-fenced-by-the-reviewer-as-uncitable`
- Deep links, briefs: `pending-ratify-tax-50-advocacy.html#concessions-and-why`, `href="pending-ratify-tax-50-advocacy.html" class="ls-cite">AB</a>`, `pending-ratify-tax-50-supplemental.html#concessions`, `href="pending-ratify-tax-50-supplemental.html" class="ls-cite">SB</a>`
- Deep links, deregistered and whitepaper: `deregistered-statutes.html#lp-074`, `whitepaper.html#trajectory-doctrine`
- Verbatim quotation of the Trajectory Doctrine: `Top marginal rates track demonstrated institutional need; any rate reduction requires audited evidence per the Path 2 standing audit — never authored facts — at the standard zero-fail threshold.`
- Defined terms: `“Path 2 controlling estimate” means`, `“no chargeable obligation”`, `Lower Incidence Certificate`, `Savings Circulation Mandate`
- Ratification question: `<strong>Shall RATIFY-TAX-50-II register as the conditional rule in §§1–10?</strong>`
- Formulas: `Main-12 = Σ T50(m) / Σ M(m)`, `ADT-36 = Σ A(m) / Σ D(m)`, `Main-12 ≥ 105%`, `ADT-36 ≥ 120%`, `T50(m) / M(m) ≥ 100%`, `A(m) / D(m) ≥ 100%`, `Σ Li(m) / Σ Oi(m) ≥ 105%`, `Li(m) / Oi(m) ≥ 100%`
- Schedule B rate rows: `<tr><td>−1</td><td>35%</td><td><strong>25%</strong></td></tr>`, `<tr><td>−2</td><td>17%</td><td><strong>12.5%</strong></td></tr>`, `<tr><td>−3</td><td>8%</td><td><strong>6.25%</strong></td></tr>`
- Schedule A rate: `changes from 70% to <strong>50%</strong>.`
- Cascade: `50/25/12.5/6.25`
- Condition labels: `A2 — Main current coverage`, `A3 — Main monthly floor`, `A4 — Main forward floor`, `A5 — Dividend aggregate`, `A6 — Dividend monthly floor`, `A7 — Stream separation`, `A8 — Reproducibility`
- Bold labels: `<strong>Filed:</strong>`, `<strong>Status sought:</strong>`, `<strong>Controlling-law notice:</strong>`, `<strong>Income-tax stream.</strong>`, `<strong>Dividend stream.</strong>`, `<strong>No cross-credit.</strong>`, `<strong>Backfill is not structural revenue.</strong>`, `<strong>Lower quarantine.</strong>`, `<strong>Complete route map.</strong>`, `<strong>Complete obligation map.</strong>`, `<strong>Proposed-rate quantities.</strong>`, `<strong>Current coverage.</strong>`, `<strong>Forward coverage.</strong>`, `<strong>Reproducibility and Path 2 adoption.</strong>`, `<strong>Zero chamber fails:</strong>`, `<strong>Any chamber fails:</strong>`, `<strong>Court and Meritboard residual:</strong>`
- Headings: `<p class="ls-h ls-h2">1. Governing rule and construction</p>`, `<p class="ls-h ls-h3">2.1 Schedule A — Sanctuary and Main</p>`, `<p class="ls-h ls-h3">2.2 Schedule B — Lower layers</p>`, `<p class="ls-h ls-h2">3. Fiscal architecture — separated streams</p>`, `<p class="ls-h ls-h2">5. Concessions and conditions — Schedule A</p>`, `<p class="ls-h ls-h2">6. Schedule B certification — Lower incidence restatement</p>`, `<p class="ls-h ls-h2">11. Ratification clause</p>`, `<p class="ls-h ls-h2">Citation key — attached record only</p>` (check.mjs compares all 21 headings)
- Citation samples (check.mjs compares all 72 in sequence): `[<a href="pending-ratify-tax-50-record.html#r14" class="ls-cite">C</a>, “IN-WORLD DATELINE”]`, `[<a href="whitepaper.html#trajectory-doctrine" class="ls-cite">C</a>, “GOVERNING LAW”; <a href="deregistered-statutes.html#lp-074" class="ls-cite">H</a>, Drafting designation LP-074 §4, treated as drafting history under the filing notice]`
- Modal verbs in operative text, sample (check.mjs holds shall 1, may 12, must 16, cannot 11, can 2): `may not substitute an authored fact`, `must expressly certify zero`, `must not manufacture a ratio`, `may not return as an operating premise`
- Seat and founder wording (Process tier, kept with exact counts): `A petition, chamber, founder, or later reviewer`, `by the drafting seat`
- Not in this file (pins, probes, positive controls and linkFirst phrases that target other pages): absent: `a schedule adopted by the chambers`, `This Schedule is part of the Charter`, `SCHEDULES A AND B CERTIFIED`, `exactly 30 keyed annual observations`, `Main-12 106.7%`, `ADT-36 122.4%`, `complete ordered window SHA-256-attested`, `Path 2 LP-074 Final Certification — 2294`, `id="s-10-4"`, `RR-12`, `lawful nonactivation`
- Stale or banned forms: absent: `ENACTED, CONDITION NOT SATISFIED`, `<article class="law-entry`, `founder's ruling`, `founder’s override`

### build-pending-pages.mjs
- check-canon R22 pin, doctrine name in entity form: `Process ruling R22 &mdash; The Restatement &amp; Consolidation Doctrine`
- check-canon R23 pin, doctrine name: `Process ruling R23 &mdash; The Codification Sweep`
- R22/R23 labels: `<span class="pf-label">Process ruling R22 — registered 2026-07-20</span>`, `<span class="pf-label">Process ruling R23 — registered 2026-07-20</span>`
- R22 ruling text (check.mjs compares both blocks byte for byte): `(a) Numeric restatements of subordinate-tier law appearing on the Charter page were always publication apparatus, never enacted constitutional text; relocating them amends nothing.`
- R23 ruling text: `Naming an instrument latent in the founding corpus is declaratory codification: the rule was always in force; the name is publication apparatus.`
- Deep-link target (linked 8 times across the site): `<h2 class="pending-h pending-h2" id="path-2">Path 2 — Standing preregistered fiscal-facts audit</h2>`
- statuteBanner label fixed at v25.6.0: `<span class="pb-label">Enacted · Conditions satisfied · Schedules active from 2295</span>`
- check-canon statute wrapper pins: `<strong>ENACTED — SCHEDULES ACTIVE FROM 2295.</strong>`, `<strong>50 / 25 / 12.5 / 6.25</strong>`, `<a href="law-polling.html#lp-074">LP-074</a>`
- Build assertion and rehoming (code): `class="ls-cite">[A-Z]{1,2}<\/a>`, `if (cites !== 125)`, `'href="law-polling.html#$1"'`, `read('documents/ratify-tax-50-ii-statute-source.html')`
- Section banner and frame labels: `<span class="pb-label">Failed Petition — record retained</span>`, `<strong>FAILED PETITION</strong>`, `<span class="pf-label">Process Record — drafting archive, not world canon</span>`
- Process-frame bold spans: `<strong>drafting archive</strong>`, `<strong>interventions and their withdrawal alike</strong>`, `<strong>RATIFY-TAX-50 failed</strong>`
- Hub heading and bold labels: `<h2 class="pending-h pending-h2">RATIFY-TAX-50 — Failed petition</h2>`, `<strong>FAILED PETITION.</strong>`, `<strong>Drafting note.</strong>`, `<strong>standing preregistered audit workstream</strong>`, `<strong>Preregistered methodology</strong>`, `<strong>Predetermined controlling-estimate rule</strong>`, `<strong>(a) SCM activation-frequency response to released liquidity.</strong>`, `<strong>(b) Marginal utility of private capital flow in a post-scarcity upper stack.</strong>`
- Hub cascade in bold with no-break spaces: `<strong>50&nbsp;/&nbsp;25&nbsp;/&nbsp;12.5&nbsp;/&nbsp;6.25</strong>`
- Hub register line (same shape as the deregistered-page pin): `The register’s LP-074 is <a href="law-polling.html#lp-074">RATIFY-TAX-50-II</a>, registered 5–0 at ~Y175 (enacted 2278).`
- Crosslink labels: `'RATIFY-TAX-50-II — the full conditional statute'`, `'Opposition Brief — the case against'`, `'Path 2 Charter — certification methodology'`, `'Deregistered statutes — drafting designations 074 / 075'`
- Titles and hero titles: `title: 'RATIFY-TAX-50-II — Full Conditional Statute • The Five Rings'`, `heroTitle: 'RATIFY-TAX-50-II — Full Conditional Statute'`, `title: 'Ratification Record • The Five Rings'`
- Replaced sentence (flag 1): absent: `This page preserves the conditional statute exactly as filed.`
- Stale label fixed at v25.6.0: absent: `Enacted · Conditions not satisfied · Schedules inactive`
- linkFirst phrases live in the build-path2-pages sources: absent: `a schedule adopted by the chambers`, `This Schedule is part of the Charter`

### built: pending-ratification.html
- check-canon R22/R23 pins and guard-mutation probe find-strings: `R22`, `R23`, `Restatement &amp; Consolidation Doctrine`, `The Codification Sweep`
- Deep-link target: `id="path-2"`

### built: pending-ratify-tax-50-ii-statute.html
- check-canon (e3) and the 2295 wrapper pin: `RATIFY-TAX-50-II — Conditional Successor Petition`, `class="ls-cite"`, `law-polling.html#lp-074`, `ENACTED — SCHEDULES ACTIVE FROM 2295`, `50 / 25 / 12.5 / 6.25`
- Guard-mutation probe find-strings: `class="ls-cite"`, `<body`
- Rehomed same-page anchor: `href="law-polling.html#lp-073" class="ls-cite">H</a>`
- Must stay absent: absent: `ENACTED, CONDITION NOT SATISFIED`, `<article class="law-entry`, `href="#lp-`, `exactly as filed`

## (c) Flags

1. **The statute banner's "exactly as filed" claim is replaced. Jason rules before the splice.** The live statute banner ends "This page preserves the conditional statute exactly as filed." That is false once the statute body is reconstructed. This is the same choice as petopp flag 2:
   - (a) Revert the statute to the source bytes and keep the banner. The statute then leaves this unit, and only the generator draft is spliced. Under (a) the three chrome changes tied to the restatement must be reverted too: the banner's last two sentences, the statute description ("The full conditional statute enacted as LP-074") and the statute hero ("as filed and enacted").
   - (b) Keep the reconstruction. The draft carries (b), because Jason's depth ruling covers instruments. The banner now reads "This page carries the conditional statute as filed, restated in plain wording. Its figures, numbering and the meaning of every provision are unchanged." This matches the ballot banner's wording in petopp.
   - Under (b), four other texts still describe the page as the untouched register text. None is rendered prose in this unit. The comments in `tools/build-pending-pages.mjs` (lines 487–494, "R16 moves the *published* text"; lines 615–623, "the register's v22.4 text untouched") and the header comment of the statute source ("this is the instrument itself") are code comments, frozen with the code in this unit. They should be updated at the splice. `docs-review/RATIFY-TAX-50-session-record.md` line 199 (R16: "its full conditional statute text relocates verbatim") belongs to the record unit. It stays true of the v22.4.1 relocation, but it now needs a restatement note.
   - Could go either way.
2. **Operative text: meaning held, drafting left where it was already plain.** The statute is enacted law, so the reconstruction is limited to what the voice rules require. Semicolon chains and colon chains are split into sentences. The six reversal forms ("not X", ", not Y.", "rather than") are rewritten, and three figures of speech are dropped ('launder', 'precisely', 'without pretending'). Everything that sets the rule is untouched:
   - All 21 headings, all 133 links, all 72 bracketed citations, all 33 bold spans, all 18 code spans, all 48 curly-quoted strings and the Doctrine quotation are byte-identical.
   - Each citation still follows the sentence it supports.
   - Strict modals keep exact counts: shall 1, may 12, must 16, cannot 11, can 2.
   - These provisions are unchanged word for word: §1 items 1–2, §2.1, §3 items 1–2, all of §4.2 and §4.3, the first §5.1 paragraph, conditions A2–A8, B1, B3, B5 and B6, the §7 lead-in and quarantine list, §8 item 4, and §9 items 1, 2, 4 and 6.
3. **Reading decisions.** Each could be read another way:
   - §2.2: "while their in-layer destinations … remain unresolved" is read as concessive ("even while"), placed before the reason clause. The reason (Lower collections cannot reach the Main treasury) is unchanged.
   - §3 item 5: Lower receipts "retain their existing rates" became "are collected at the existing rates". Receipts do not hold rates. The rates on the income that produces them do.
   - §6 B4: the original's semicolon tied the "no chargeable obligation" duty to the zero-obligation layer. The draft says so ("For such a layer").
   - §5.2 and §6: "These are conditions, not findings." became "The table sets activation conditions." and "The list sets activation conditions." The sentence after each, "This petition makes no claim that any … is satisfied" (unchanged), carries "not findings".
   - §10 row 4: 'cannot launder' became "cannot cure", the verb §3 item 3 already uses for the same prohibition.
   - §10 row 3: 'disclosure is replaced by legal inadmissibility, eliminating the old petition's dependence on authored compliance' is now two sentences: the old petition disclosed its authored material and still depended on it, and this petition makes that material inadmissible.
   - Citation key: "Every citation below" became "Every citation in this instrument". The citations sit above the key.
   - Citation key [H]: "LP-073 stands in this register" became "LP-073 is in the law register". The text dates from when the statute sat inside law-polling.html. The page is no longer the register, and the build rehomes the link to `law-polling.html#lp-073`.
4. **Small additions.** Each states something the original implied:
   - "It further concedes four points." counts the four clauses that follow.
   - "This petition supplies none of them." carries the original's "The estimate, not this petition, must supply".
   - "They are not asked to find" carries "not on a claim that".
5. **Chrome kept as labels.** The following are unchanged: every crosslink label (several carry an em-dash, "Opposition Brief — the case against"), every `pb-label` and `pf-label`, including "Process Record — drafting archive, not world canon", and every title, hero title, kicker and heading. Rewording a label is out of scope for prose reconstruction and would move text a reader navigates by. The six criteria in the hub keep the "**Label** — text" separator because the bold labels are frozen. Only the text after each dash was rewritten.
6. **Wording kept because it is ambiguous.** Hub: "refusing the magnitude then supported". It can mean the magnitude the petition then argued for, or the magnitude the evidence then supported. The draft keeps the phrase and does not resolve it.
7. **Dropped with no fact attached.** Each is listed in (a) with the draft text that carries the content:
   - statute: 'precisely' (§8 item 5); 'without pretending to' (§10 row 6); 'deliberately' is kept, as the design rationale's statement of intent.
   - chrome: 'real' in "a real legislature"; 'simply' in "the petition simply failed"; 'no directional thumb on the scale' became "no directional bias"; 'not as a bare point estimate' (implied by "published with its uncertainty band"); 'a brief the record keeps but the vote never heard' became "It was not before the chambers when they voted."
8. **Process tier: founder and seat wording kept.** Both pages are `pending-*`, which check-canon exempts from the World-tier founder and seat guards. The statute's "founder" (§1 item 2, operative: a founder may not substitute an authored fact) and "drafting seat" (§11) keep their exact counts. The chrome adds no mention. The superseded-outcome and tier-misattribution regexes find nothing new in the rebuilt chrome.
9. **Hedge and negation drift. check.mjs reports it, and it is not a failure.**
   - Statute: "neither/nor" goes 5 → 2 and "not" goes 25 → 30, because "neither X nor Y" became "does not X and does not Y" or "not X or Y". "none" goes 1 → 2 ("This petition supplies none of them."). "no" goes 26 → 27 ("makes no assumption"). "only" is unchanged.
   - Chrome: "never" goes 6 → 4 ("never activated anything" became "activated nothing", and the supplemental hero's "never heard" is gone). "none" goes 1 → 2.
   - No strict modal moved in either file.
10. **Word growth.** Statute +1.8%, generator prose +1.6%. The growth comes from splitting chains into sentences, which repeats subjects.
11. **Splice.**
    - Jason rules on flag 1 first.
    - Under (b), copy the statute draft over `documents/ratify-tax-50-ii-statute-source.html` and the generator draft over `tools/build-pending-pages.mjs`. Update the three comments named in flag 1 in the same commit, and carry the session-record line 199 note into the record unit. Then run `npm run build:pending`.
    - Under (a), copy only the generator after reverting its three statute-restatement chrome changes.
    - check.mjs has already built both drafts in memory. All 7 pages build. assertVerbatim passes on the five Markdown pages, whose bodies are byte-identical. Every page keeps its title, h1, labels, crosslinks, id sequence and tag skeleton. The statute still renders 125 sigil cites. All 104 statute links into the pending pages resolve. `#path-2` stands.
    - The check-canon (e3), 2295-wrapper, R22 and R23 conditions hold on the draft build, and so do the probe find-strings `R22`, `R23`, `class="ls-cite"` and `<body`.
    - No digested file is touched, so the record annexes and the compendium SHA-256 table do not move.
    - `documents/*.html` is in the Tailwind content globs. The site-wide build with the draft statute and the 7 draft-built pages equals the live build, so `build:css` parity holds.
