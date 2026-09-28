# Records 25.6.2 advsupp unit: reconstruction ledger

This folder holds drafts only. The live sources in `docs-review/` were not edited.

- `AFFIRM-TAX-50-advocacy-brief.md` is the reconstructed advocacy brief. It replaces `docs-review/AFFIRM-TAX-50-advocacy-brief.md`, and `npm run build:pending` then regenerates `pending-ratify-tax-50-advocacy.html`.
- `AFFIRM-TAX-50-supplemental-brief.md` is the reconstructed supplemental steelman. It replaces `docs-review/AFFIRM-TAX-50-supplemental-brief.md`, and the same build regenerates `pending-ratify-tax-50-supplemental.html`.
- Checker: `node docs-review/records-25.6.2/advsupp/check.mjs`. It reads the drafts, the live sources, the live generator and the pages that link in, and writes nothing.

Matching conventions:
- Section (a) quotes (in backticks) are matched against the draft's visible text. That is the text the live generator's `sourceText()` produces (heading markers, `**`, list markers and `>` removed), with whitespace collapsed and curly quotes read as straight. Each quote is 15 words or fewer. Where the reconstruction changed the wording that carried a fact, the row gives the original wording in «guillemets» (checked verbatim against the original) and then quotes the draft wording that now carries it.
- Every original block except the two heading lines has a subsection in (a), labelled with its block number `[bN]` (blocks are split on blank lines). check.mjs fails if a block has no subsection.
- The pin cites (the parenthetical citations that close most paragraphs) are frozen byte for byte. They are listed once in (b) and compared block by block by check.mjs, so (a) does not repeat them.
- Section (b) strings are matched against the raw draft with whitespace collapsed. Rows under `rendered:` are matched against the draft as the live `renderDoc()` renders it. Rows under `live:` are matched against files this unit does not touch. Rows under `absent:` must not occur in either draft.

## Word counts

Prose words: the generator's `sourceText()` of the whole Markdown file (headings, banner, labels and pin cites included).

| Document | Live | Draft | Change |
|---|---|---|---|
| AFFIRM-TAX-50-advocacy-brief.md | 2,256 | 2,322 | +2.9% |
| AFFIRM-TAX-50-supplemental-brief.md | 2,404 | 2,434 | +1.2% |

Register tells, counted by check.mjs as live → draft (paragraph prose only; headings, banner, bold labels and pin cites excluded):
- Advocacy: em-dashes 6 → 0; reversal constructions ("is not X; it is Y", "not X. It is Y", "—not", "is not the same as") 5 → 0.
- Supplemental: em-dashes 4 → 0; reversal constructions 11 → 0.

The em-dashes that remain are in the frozen H1 lines, the frozen banner label, the frozen `[Chamber objection: …]` labels and the pin cites that quote the Rate-History heading "The through-line — the Trajectory Principle".

## (a) Fact ledger

### AFFIRM-TAX-50-advocacy-brief.md

#### [b1] Archive banner (left byte-identical)
- Archive status: `ARCHIVE / NON-OPERATIVE.`
- Pre-certification argument, no evidentiary weight or authority: `This brief preserves a pre-certification argument; it is not evidence or current authority.`
- Superseded implementation error label: `Superseded implementation error — not VMSS canon.`
- Discarded implementation's claim: `A discarded repository implementation said Finding III failed.`
- Findings I–IV and B1–B6 passed: `Canon records Findings I–IV and B1–B6 passing`
- Both LP-074 schedules certified: `both LP-074 schedules certifying`
- Schedule and effective year: `50 / 25 / 12.5 / 6.25 taking effect in 2295.`

#### [b2] Opening proposition
- The strongest affirmative case: `This brief states the strongest affirmative case`
- «does not pretend the 130% gate figure was independently measured»: `without claiming that the 130% gate figure was independently measured`
- Narrower proposition: `The case rests on a narrower proposition.`
- Controlled, reviewable ratchet on structural precedent: `LP-074 was a controlled, reviewable ratchet justified by structural precedent`
- Magnitudes openly marked: `its disputed magnitudes were openly marked`
- «subjected to supersession»: `made subject to supersession`
- Barred from future reductions: `barred from supporting future reductions.`

#### [b3] Argument 1 heading
- Title reworded from «Gate circularity defeats the claimed measurement—not the structural case for enactment.»: `Gate circularity defeats the claimed measurement but leaves the structural case for enactment intact.`
- Objection (frozen label): `Chamber objection: Meritboard/Court — gate circularity and condition precedent`
- Strength: `Strength: ARGUABLE`

#### [b4] Argument 1: the algebra
- «The opposition is algebraically correct»: `The opposition's algebra is correct.`
- The \(1.3D\) definition makes coverage 130%: `Defining automation-side revenue as \(1.3D\) makes coverage 130% by construction`
- «supplies no independent derivation of the numerator»: `gives no independent derivation of the numerator.`
- Monthly history cannot reproduce compliance: `The abbreviated monthly history also cannot independently reproduce compliance.`

#### [b5] Argument 1: what circularity proves
- «It proves that the authored 130% figure deserves no independent evidentiary weight.»: `the authored 130% figure carries no independent evidentiary weight.`
- Not proof that coverage is below 120%: `It does not show that actual coverage is below 120%`
- Not proof that the policy structure is unsound: `or that LP-074's policy structure is unsound.`
- R7's words (quoted instrument): `R7 openly identifies the multiplier as the "load-bearing worldbuilding fact,"`
- «founder-ratified but reopenable»: `founder-ratified and reopenable.`
- The `[A/R7]` label: `` The petition labels it `[A/R7]` and does not present it as audited evidence. ``

#### [b6] Argument 1: the defensible position
- «was therefore not "the audit has already been done."»: `never claimed that the audit had already been done.`
- Accept the authored abundance posture for this transition: `accept the openly authored abundance posture for this transition`
- «replace—not validate—the authored magnitudes»: `let the standing Path 2 audit replace the authored magnitudes without validating them.`
- A later audit cannot retroactively prove the gate: `a later audit cannot retroactively prove the gate.`
- The open policy question: `a transparent, one-time pre-audit transition with prospective correction was the better policy choice.`

#### [b7] Argument 2 heading (title unchanged)
- `LP-074 quarantines the disputed evidentiary method instead of establishing it as precedent.`
- `Chamber objection: Meritboard/Court — an authored gate can never fail`
- `Strength: STRONG`

#### [b8] Argument 2: the LP-074 bar
- Audited evidence, "never authored facts" (quoted instrument): `LP-074 expressly requires audited Path 2 evidence, "never authored facts," for every future rate reduction.`
- Controlling estimate supersedes: `Path 2's controlling estimate supersedes the petition's authored values`
- Cadence rider governs review: `the cadence rider then governs review.`

#### [b9] Argument 2: no reusable loophole
- Disclosed transitional exception: `Ratification therefore created a disclosed transitional exception`
- «simultaneously abolished that method for the next reduction»: `in the same act, abolished that method for the next reduction.`
- «did not create a reusable loophole»: `It left no reusable loophole through which a later petitioner could define revenue`
- Convenient multiple: `as a convenient multiple of obligations.`

#### [b10] Argument 2: limits of supersession
- «does not recover dollars already retained»: `Supersession recovers no dollars already retained`
- No retroactive cure: `does not retroactively cure the original showing.`
- Prevents permanent assumptions: `It does prevent disputed estimates from becoming permanent operating assumptions`
- «materially distinguishes»: `separates bounded pre-audit ratification from unconditional acceptance of circular compliance.`

#### [b11] Argument 3 heading (title unchanged)
- `The controlling historical precedent supports ratcheting on structural function-transfer evidence.`
- `Chamber objection: Meritboard/Court — no reduction before measured proof`

#### [b12] Argument 3: LP-073
- SCM assumed the function: `LP-073 records that the SCM assumed the tax rate's anti-concentration function.`
- Concurrent operation: `After the two instruments had operated concurrently`
- Older instrument judged redundant: `the older one was judged redundant`
- Cut to 70/35/17/8: `the founding bands were cut to the 70/35/17/8 schedule.`
- Ground of the ratchet: `The recorded ground for that ratchet is structural transfer to the SCM.`
- «not a reproduced fiscal-magnitude audit»: `No reproduced fiscal-magnitude audit is recorded as its basis.`

#### [b13] Argument 3: the rule predates the petition
- Conduct performed at v14.5: `LP-074 therefore codifies conduct the civilization had already performed at v14.5`
- The rule: `rates decline when their institutional functions retire.`
- «It does not invent that decision rule for RATIFY-TAX-50.»: `The decision rule predates RATIFY-TAX-50.`

#### [b14] Argument 3: no new condition on the second ratchet
- «Insisting that only independently measured magnitudes may justify LP-074»: `A requirement that only independently measured magnitudes may justify LP-074`
- New condition: `would impose on the second ratchet an evidentiary condition`
- Not the basis of the first: `that the record does not identify as the basis of the first.`
- Measurement controls magnitude: `Measurement should control magnitude and correction`
- History justifies direction: `structural history can still justify direction.`

#### [b15] Argument 4 heading (title unchanged)
- `The dividend-risk asymmetry misidentifies the principal causal exposure.`
- `Chamber objection: Sanctuary/Meritboard — stipulated median voter bears dividend risk without tax benefit`

#### [b16] Argument 4: the stipulated voter
- $10 million threshold unchanged: `For the stipulated voter with no income above the unchanged $10 million threshold`
- No liability avoided: `rejecting the cut avoids no direct tax liability`
- Schedule applies only above threshold: `the revised schedule applies only above that threshold.`

#### [b17] Argument 4: dividend revenue is separate
- «But acceptance does not directly reduce»: `Acceptance, however, does not directly reduce the automation-side revenue that funds dividend obligations.`
- ADT and income tax separated: `The petition separates automation-side ADT revenue from income-tax revenue`
- SCM recycle excluded: `excludes SCM recycle from gate computations`
- Main-treasury fall: `identifies the disclosed fiscal reduction as a fall in Main-treasury revenue.`
- No mechanism: `It supplies no mechanism by which lowering the top income-tax rate`
- «itself lowers automation-side ADT output»: `would itself lower automation-side ADT output.`

#### [b18] Argument 4: saved and consumed shares
- Saved and garnished income: `Retained income that is saved and later garnished routes through the ADT as dividend.`
- Consumed share: `Only the consumed share leaves SCM exposure.`
- «does not quantify either share»: `The record quantifies neither share and asserts no velocity benefit`
- Not priced: `so neither effect may be priced into the case.`

#### [b19] Argument 4: the voter's uncertainty
- «The voter's real uncertainty»: `The voter's actual uncertainty is therefore whether the ADT reserve`
- «independently unverified ADT reserve is adequate»: `which has not been independently verified, is adequate.`
- «—not evidence that the tax cut causes dividend funding to decline»: `That uncertainty supplies no evidence that the tax cut causes dividend funding to decline.`
- Direct gamble: `Treating acceptance as a direct gamble with the dividend stream`
- Conflation: `conflates a disputed condition precedent with the policy's disclosed treasury mechanism.`

#### [b20] Argument 4: the cost of rejection
- Reversible in nominal law: `Rejection is reversible in nominal rate law`
- «it is not costless by assumption»: `its cost cannot be assumed to be zero.`
- Trajectory: `The recorded trajectory says rates should fall when their functions retire.`
- R10's consequences: `R10 identifies released capital and increased flow as structural consequences`
- «while expressly declining to validate their magnitude»: `expressly declines to validate their magnitude.`
- Not quantifiable: `Those benefits cannot be quantified.`
- «neither can they rationally be priced at zero»: `They also cannot rationally be priced at zero.`

#### [b21] Argument 5 heading (title unchanged)
- `The compounding-risk premise is bounded by feedback in Sanctuary, Main, and −1.`
- `Chamber objection: Sanctuary/Main/Meritboard — risky and compounding acceptance`

#### [b22] Argument 5: hysteresis (unchanged)
- `Hysteresis is real: a later rate increase cannot recover income retained during LP-074's low-rate interval.`

#### [b23] Argument 5: bounded equilibrium
- «is not the same as indefinitely compounding concentration»: `Hysteresis differs from indefinitely compounding concentration.`
- 1.67× bound: `the petition places the equilibrium increase at no more than 1.67×`
- More frequent triggers: `higher aggregate savings induce more frequent SCM triggers.`
- Finite equilibrium: `At saturation, the stated recurrence produces a finite equilibrium.`
- −1 bound: `The corresponding −1 bound is 1.15×.`

#### [b24] Argument 5: R10
- R10 adopts the mechanism: `R10 adopts that structural mechanism.`
- 50 as anchor (R10's wording): `50 remains a high anti-concentration anchor`
- Activation bounds concentration: `more frequent SCM activation bounds concentration arising from retained liquidity.`
- «carefully limits that rationale to concentration rather than solvency»: `R10 limits that rationale to concentration and does not extend it to solvency.`

#### [b25] Argument 5: conclusion for three layers
- Three layers: `In the three layers where the SCM reads all savings`
- «changes the equilibrium bound rather than removing the feedback system»: `acceptance therefore changes the equilibrium bound and leaves the feedback system in place.`
- «The objection remains serious»: `The objection is serious`
- Quoted objection overstates: `the phrase "risky and compounding" overstates the documented mechanism.`

#### [b26] Argument 6 heading
- Title reworded from «Treasury erosion is a conditional sensitivity with an advance-warning mechanism, not an established six-year forecast.»: `Treasury erosion is a conditional sensitivity with an advance-warning mechanism.`, `The record does not establish it as a six-year forecast.`
- `Chamber objection: Main/Meritboard — 112.5% erodes to approximately 100%`

#### [b27] Argument 6: the authored case (unchanged)
- $9 trillion revenue: `The petition's authored case starts with $9 trillion of tax revenue`
- $8 trillion, 112.5%: `against $8 trillion of Main obligations, or 112.5% coverage.`
- Six-year result conditional: `Its approximately six-year erosion result is expressly conditional`
- 2% growth, real-flat revenue: `on obligations growing 2% annually while revenue remains real-flat.`

#### [b28] Argument 6: a sensitivity
- «That conditional arithmetic should not be denied.»: `The conditional arithmetic is correct.`
- «What should be denied is treating it as an independently established forecast»: `It should not be treated as an independently established forecast`
- The `[A]` magnitudes: `` both the tax base and the obligation magnitudes are `[A]` ``
- Path 2 supersedes: `Path 2's estimates supersede them.`
- «The model overstates only when converted from a sensitivity into an inevitability.»: `The model overstates the risk only when a sensitivity is read as an inevitability.`

#### [b29] Argument 6: the rider's mechanics
- «places the first mandatory review threshold above insolvency»: `The rider sets the first mandatory review threshold above insolvency`
- 105%: `at coverage below 105%`
- Five-year review: `also requires review every five years.`
- Six-month review: `A review must finish within six months.`
- Sub-100% within 36 months: `If it projects sub-100% coverage within 36 months`
- Introduction within 12 months: `a corrective LP must be introduced within 12 months`
- Vote within six months: `voted within six months after introduction.`

#### [b30] Argument 6: what the mechanism does
- Detects before 100%: `designed to detect deterioration before the 100% line`
- «to defeat agenda delay»: `to prevent agenda delay.`
- No guarantee of passage: `It does not guarantee that a corrective LP will pass`
- «so it is not a solvency guarantee»: `and so it does not guarantee solvency.`
- «earlier verified information plus compulsory legislative confrontation»: `It provides earlier verified information and a legislature compelled to take up the problem.`

#### [b31] Argument 7 heading
- Title reworded from «The absence of automatic restoration reflects constitutional limits, not an empty rider.»: `The absence of automatic restoration reflects constitutional limits on the rider`, `whose process controls remain in force.`
- `Chamber objection: Court — cadence has procedural but no solvency teeth`

#### [b32] Argument 7: why no automatic restoration
- «accurately observes»: `The opposition correctly observes that the cadence rider cannot force passage`
- No automatic restoration: `automatically restore the old rates.`
- «It also records why»: `It also records the reason.`
- Federal-tier: `Outcome-binding rate changes are federal-tier matters`
- RULING-TIER: `RULING-TIER forecloses them to a rider.`

#### [b33] Argument 7: the process controls
- «would evade the very federal LP process»: `A rider that guaranteed the later outcome would evade the federal LP process`
- The Court's role: `that the Court is supposed to protect.`
- Controls: `LP-074 supplies meaningful process controls: mandatory review, binding introduction deadlines`
- Controls, continued: `expedited scheduling, public drawdown reporting, and audit-based premises.`

#### [b34] Argument 7: the distinction for the Court
- «distinguish "cannot constitutionally predetermine the next vote" from "does nothing."»: `The Court should distinguish a rider that cannot constitutionally predetermine the next vote`, `from a rider that does nothing.`
- Authority preserved: `This rider preserves legislative authority`
- «while removing the ability to ignore adverse evidence indefinitely»: `removes the ability to ignore adverse evidence indefinitely.`

#### [b35] Argument 8 heading (title unchanged)
- `The authored magnitudes were exposed to voters at their weakest points.`
- `Chamber objection: Meritboard — authored magnitude beside engraved conclusion`

#### [b36] Argument 8: labels and breakpoints (unchanged)
- Labelled inputs: `The petition labels the Main and Sanctuary bases, obligations, growth, PJS participation, SCM duty cycle`
- Authored or ruling-derived: `and automation-side revenue as authored or ruling-derived rather than engraved.`
- Breakpoints: `It also discloses the breakpoints at which treasury funding or gate compliance fails.`

#### [b37] Argument 8: the deficits
- $3 trillion base not established: `legal inclusion of Sanctuary does not establish a $3 trillion base`
- Not reproducible: `the monthly history is not independently reproducible.`
- «Those remain genuine evidentiary deficits.»: `Both remain genuine evidentiary deficits.`

#### [b38] Argument 8: disclosure
- «the record did not launder those deficits»: `The record kept those deficits in view.`
- Findings with the ballot: `The adverse findings accompanied the ballot`
- 1–4 vote and override disclosed: `the failed 1–4 synthetic vote and the founder override remain permanently disclosed`
- Path 2 controls: `Path 2 controls later estimates.`

#### [b39] Argument 8: what disclosure does
- «That transparency does not make the estimates true.»: `Disclosure does not make the estimates true.`
- More defensible: `It makes a provisional structural vote more defensible`
- Visible at enactment: `the uncertainty, the breakpoints, the institutional remedy, and the contrary case`, `were all visible at enactment.`

#### [b40] Argument 9 heading
- Title reworded from «The Lower objection establishes uncertainty, not demonstrated defunding.»: `The Lower objection establishes uncertainty and does not demonstrate defunding.`
- `Chamber objection: Lower — unknown destination and obligations for siloed collections`
- `Strength: WEAK`

#### [b41] Argument 9: the opposition's claim
- Destination and obligations unknown: `the destination of Lower collections and the obligations they support are unknown`
- Effect not assessable: `so the effect cannot be assessed.`
- No claim to know: `It does not claim to know which Lower obligations lose funding.`
- Authored-base figure: `Its authored-base calculation places the aggregate reduction in Lower collections at $100.75 billion.`

#### [b42] Argument 9: caution, not proof
- Legitimate caution: `That is a legitimate reason for caution.`
- «cannot simultaneously serve as proof»: `It cannot also serve as proof that identified essential obligations will be defunded.`
- Only resolution: `The record resolves only that Lower collections cannot reach the Main treasury.`
- Docket: `Their in-layer termination remains on the charter-restatement audit docket.`

#### [b43] Argument 9: the gradient principle
- Counterweight: `The affirmative structural counterweight is the gradient principle.`
- «are characterized as extraction rather than governance»: `It characterizes upper rates in environments receiving minimal institutional services`, `as extraction rather than governance`
- «is supposed to track benefit received»: `it holds that the layered schedule should track benefit received.`

#### [b44] Argument 9: the unresolved residue
- «Still, −2 and −3 private whale savings fall outside SCM attribution»: `Private whale savings in −2 and −3 fall outside SCM attribution`
- No stock instrument: `have no stock instrument`
- Destinations unresolved: `their fiscal destinations remain unresolved.`
- 1.05× and 1.02×: `The record supports only the narrower retention changes of 1.05× and 1.02×`
- No safety: `does not establish safety.`
- «This was the hardest chamber to flip.»: `Lower was the hardest chamber to flip.`

#### [b45] Argument 10 heading
- Title reworded from «Fifty percent was a ratchet, not an abandonment of taxation's remaining functions.»: `Fifty percent was a ratchet that preserved taxation's remaining functions.`
- `Chamber objection: All negative chambers — reduction is premature or too deep`

#### [b46] Argument 10: what LP-074 keeps (unchanged)
- `LP-074 preserves the $10 million threshold`
- `retains a 50% Sanctuary/Main top marginal rate`
- `leaves all SCM parameters unchanged`
- `adopts a legible geometric schedule across layers.`

#### [b47] Argument 10: authored scenario and R10 (unchanged)
- Covers Main obligations: `Under the petition's expressly authored scenario, the tax still covers enumerated Main obligations`
- No permanent ADT support: `without permanent ADT support.`
- R10 on 50%: `R10 separately describes 50% as a high anti-concentration anchor.`

#### [b48] Argument 10: direction
- «did not declare revenue, concentration, or trust irrelevant»: `It did not treat revenue, concentration, or trust as irrelevant.`
- Reduced reliance: `The proposal reduced reliance on the marginal rate`
- After structural instruments assumed part of the work: `after structural instruments had assumed part of its former work`
- «while retaining the rate as a substantial backstop»: `it kept the rate as a substantial backstop.`
- «the same direction recorded in the LP-073 transition»: `The LP-073 transition moved in the same direction`
- «codified by LP-074's Trajectory Principle»: `LP-074's Trajectory Principle codifies it.`

#### [b50] Concession: gate compliance (bold lead frozen)
- `Independent gate compliance was not demonstrated.`
- `The 130% figure is circular`
- `the monthly summary is not a reproducible 36-point series.`
- «These defects must be conceded»: `Both defects must be conceded`
- `the attachments contain no independent revenue derivation or complete historical series.`

#### [b51] Concession: no retroactive cure (bold lead frozen)
- `A later audit cannot retroactively satisfy the original condition precedent.`
- `Path 2 is defensible as prospective supersession and correction.`
- «not retrospective proof»: `It cannot serve as retrospective proof.`

#### [b52] Concession: authored magnitudes (unchanged)
- `The fiscal magnitudes remain authored.`
- `The record cannot prove the $18 trillion combined base`
- `$8 trillion obligations, or 112.5% starting treasury coverage as measured facts.`

#### [b53] Concession: erosion sensitivity (unchanged)
- `The six-year erosion sensitivity is valid under its stated assumptions.`
- `The record supplies no fiscal basis for replacing real-flat revenue with a more favorable forecast.`

#### [b54] Concession: the rider (bold lead frozen)
- `The cadence rider cannot guarantee solvency.`
- `It guarantees review, introduction, and a vote.`
- «not passage or restoration»: `It does not guarantee passage or restoration.`

#### [b55] Concession: hysteresis (unchanged)
- `Hysteresis is real.`
- `Later action cannot recover income retained while the lower rate operated.`

#### [b56] Concession: Lower incidence (unchanged)
- `Lower-layer fiscal incidence remains unresolved`
- `−2/−3 lack a stock-level bound for private whale savings.`
- `The available record supports caution but cannot establish either safety or concrete defunding.`

#### [b57] Concession: behavioral benefits (unchanged)
- `No velocity, recruitment, migration, avoidance, or taxable-base elasticity benefit can be priced into the case.`
- `The petition asserts no velocity benefit`
- `the reviewer fences the remaining behavioral instincts as uncitable.`

### AFFIRM-TAX-50-supplemental-brief.md

#### [b1] Archive banner (left byte-identical)
- `ARCHIVE / NON-OPERATIVE.`
- `This steelman preserves a pre-certification argument; it is not evidence or current authority.`
- `Superseded implementation error — not VMSS canon.`
- `A discarded repository implementation said Finding III failed.`
- `Canon records Findings I–IV and B1–B6 passing`
- `both LP-074 schedules certifying`
- `50 / 25 / 12.5 / 6.25 taking effect in 2295.`

#### [b2] Opening: the baseline
- Addressee and the 70/35/17/8 baseline: `Claude: treating 70/35/17/8 as the safe natural state`
- Justification of every departure: `requiring LP-074 to justify every departure from it`
- «the wrong baseline»: `applies the wrong baseline.`
- Opposite presumption: `The historical record establishes the opposite presumption.`
- Temporary instruments: `Tax rates are temporary instruments`
- «whose justification diminishes»: `their justification diminishes as mature institutions assume their functions.`

#### [b3] Argument 1 heading (title unchanged)
- `The tax cut is the intended reward for civilizational maturity.`
- `Chamber objection: All chambers — retaining 70 is the safe default`

#### [b4] Argument 1: the founding cap
- 90–99% cap: `The founding civilization required a 90–99% wealth cap`
- No recycling mechanism: `because it had no structural recycling mechanism.`
- «That single blunt instrument stood alone»: `The cap was a single blunt instrument`
- Against dominance and dynastic control: `the only one against dominance and dynastic control.`

#### [b5] Argument 1: the bands
- Layer-mapped bands: `The next civilization required high, layer-mapped income-tax bands`
- «three functions simultaneously»: `taxation then carried three functions at once: institutional revenue, anti-concentration, and public trust.`
- «young enough to administer ranges»: `Its enforcement institutions were still young`
- Ranges, not point rates: `so they administered ranges rather than precise point rates.`

#### [b6] Argument 1: maturation (unchanged)
- `Maturation produced specialized institutions.`
- `The SCM assumed the anti-concentration function`
- `mature enforcement replaced bands with point rates`
- `the schedule fell to 70/35/17/8`
- `because the older blunt instrument had become redundant with the more precise structural one.`

#### [b7] Argument 1: LP-074's principle
- «LP-074 continues that exact trajectory.»: `LP-074 continues the same trajectory.`
- Principle as the brief states it: `Its standing principle says rates track institutional need, not political posture.`
- Functions retire: `The revenue, anti-concentration, and trust functions retire`
- As institutions mature: `as automation revenue, structural recycling, and institutional credibility mature.`

#### [b8] Argument 1: the operative question
- The question: `The operative question is therefore what remaining institutional need justifies preserving`
- Founding-era burden: `a founding-era burden after its functions have transferred.`
- «Can the proponent prove that cutting taxes is riskless?»: `The proponent is not required to prove that cutting taxes is riskless.`

#### [b9] Argument 1: rejection
- «Rejection is not neutrality.»: `Rejection is itself a decision.`
- Legacy rate: `It keeps taxing at a legacy rate`
- «despite the constitutional record saying rates should fall»: `although the constitutional record says rates should fall when better instruments assume their work.`
- Benefit of institutions: `The civilization should receive the benefit of the institutions it successfully built.`

#### [b10] Argument 2 heading (title unchanged)
- `Meritboard should distinguish a structural invariant from an estimate manufactured to predict itself.`
- `Chamber objection: Meritboard — gate circularity`

#### [b11] Argument 2: the algebra
- `The algebra is undisputed.`
- \(R\) defined as \(1.3D\): `If automation-side revenue \(R\) is defined as \(1.3D\), coverage is 130% by construction`
- «That prevents the ratio from serving as independent empirical evidence»: `the ratio cannot serve as independent empirical evidence for the multiplier.`

#### [b12] Argument 2: R7's structural fact
- «But R7 does not present \(1.3D\) as a statistical estimate»: `R7 presents \(1.3D\) as a structural world fact`
- Not a statistical estimate: `not as a statistical estimate of an unrelated revenue stream.`
- Elastic expansion: `automation-side output funding expands elastically with dividend obligations`
- 1.3 times: `maintains revenue at 1.3 times those obligations.`
- Founder-ratified, load-bearing, reopenable: `The record identifies the proposition as founder-ratified, load-bearing, and reopenable.`

#### [b13] Argument 2: dependence is the mechanism
- «That distinction matters.» (cut as a signpost; the distinction is stated in [b12]): `R7 presents \(1.3D\) as a structural world fact`
- Scaling system: `In a system designed to scale capacity with demand`
- Numerator follows denominator: `the numerator is expected to follow the denominator.`
- Dependent reserve rule: `A reserve rule that maintains 130% coverage is mathematically dependent`
- «because dependence is the mechanism»: `because the dependence is the mechanism.`
- Cannot fall below the gate: `While the rule remains operative, coverage cannot fall below the gate.`
- «not automatically evidence of fraud»: `That is a safety property and is not, by itself, evidence of fraud.`

#### [b14] Argument 2: the alternative readings
- «readings—100%, 90%, or an unspecified production share—show»: `The opposition's alternative abundance readings (100%, 90%, or an unspecified production share)`
- No entailment of 130%: `show that the engraved abundance language alone does not entail 130%.`
- «They do not displace R7»: `R7 resolves which abundance rule governs the current world-state`, `those readings do not displace it.`

#### [b15] Argument 2: what Meritboard may conclude
- `Meritboard may properly conclude that independent measurement is still required.`
- «convert "not independently verified" into "affirmatively false"»: `It may not treat a fact that has not been independently verified as affirmatively false`
- «or "absent from canon."»: `or as absent from canon.`
- R7 governs: `R7 supplies the present governing fact`
- Path 2 tests: `Path 2 tests and supersedes its magnitudes.`

#### [b16] Argument 3 heading (title unchanged)
- `The current gate treatment cannot become a reusable epistemic loophole.`
- `Chamber objection: Meritboard/Court — authored compliance destroys the gate permanently`

#### [b17] Argument 3: the LP-074 bar
- «explicitly bars authored facts from supporting every future reduction»: `LP-074 expressly bars authored facts from supporting any future reduction.`
- Audited evidence: `Every future reduction requires audited Path 2 evidence`
- Supersession: `Path 2's controlling estimate supersedes the authored values that support LP-074.`

#### [b18] Argument 3: the precedent
- «not "author whatever multiple passes the gate."»: `The precedent therefore gives no license to author whatever multiple passes the gate.`
- «The precedent is:»: `It consists of five steps:`

#### [b19] Argument 3: the five steps (unchanged)
- `disclose the constitutive fact and its provenance;`
- `expose the complete opposition;`
- `enact one transitional ratchet;`
- `replace authored magnitudes with preregistered audit estimates;`
- `prohibit authored facts from supporting the next reduction.`

#### [b20] Argument 3: Path 2's function
- «correctly says»: `The opposition is correct that Path 2 cannot retroactively prove the original gate.`
- «It does not need to.»: `The affirmative case does not require it to.`
- «to prevent provisional premises from becoming permanent premises»: `Path 2's function is to keep provisional premises from becoming permanent premises`
- Next review and future reduction: `to control the next review and any future reduction.`

#### [b21] Argument 3: the chambers
- «Court should recognize this as precedent control.»: `Court should treat this as precedent control`
- «Meritboard should recognize it as epistemic quarantine.»: `Meritboard should treat it as epistemic quarantine.`
- No general endorsement: `Neither chamber must endorse circularity as a general method`
- One disclosed transition: `to uphold this one disclosed transition.`

#### [b22] Argument 4 heading (title unchanged)
- `The median voter's apparent risk asymmetry omits the cost and irreversibility of rejection.`
- `Chamber objection: Sanctuary — no tax benefit, full dividend exposure, cheap rejection`

#### [b23] Argument 4: the stipulated voter
- «Accept the stipulated voter's position»: `Take the stipulated voter's position as given`
- $10 million threshold: `no income above the unchanged $10 million threshold`
- Concern for dividends: `complete concern for dividend continuity.`
- No direct reduction: `That voter receives no direct tax reduction.`

#### [b24] Argument 4: the funding streams
- Misprices acceptance: `The voter nevertheless misprices acceptance by treating the income-tax cut`
- As a dividend reduction: `as a direct reduction in dividend funding.`
- «Dividend obligations are covered by automation-side ADT revenue»: `Automation-side ADT revenue covers dividend obligations.`
- Income tax covers Main: `Income-tax revenue covers enumerated Main obligations.`
- SCM recycle outside: `SCM recycle remains outside gate computation.`

#### [b25] Argument 4: a Main-treasury loss
- `The petition's disclosed revenue loss is therefore a Main-treasury loss.`
- «not a modeled decline in automation-side dividend revenue»: `The petition models no decline in automation-side dividend revenue.`
- Saved and garnished: `Retained income that is saved and later garnished routes to the ADT as dividend`
- Consumed share: `the consumed share leaves SCM exposure.`
- Not quantified: `The record quantifies neither behavioral share and asserts no velocity benefit.`

#### [b26] Argument 4: the gate dispute
- «is thus uncertainty about the adequacy of a separate reserve»: `The gate dispute is therefore uncertainty about the adequacy of a separate reserve`
- «—not evidence that LP-074 causes dividend revenue to decline»: `it supplies no evidence that LP-074 causes dividend revenue to decline.`

#### [b27] Argument 4: rejection's cost
- «Rejection is also not costless merely because»: `Rejection has a cost even though the stipulated voter avoids personal tax liability.`
- Burden preserved: `It preserves a burden after the record says the burden's functions have transferred.`
- R10's benefits: `R10 identifies released capital and increased economic flow as structural benefits of the reduction`
- «without assigning them a magnitude»: `assigns them no magnitude.`

#### [b28] Argument 4: irreversibility
- «Nor is irreversibility one-sided.»: `Irreversibility applies to both choices.`
- Hysteresis: `Acceptance creates the petition's disclosed hysteresis`
- No reclaim: `a later increase cannot reclaim income already retained.`
- «delayed acceptance cannot transform the elapsed high-tax interval»: `Delayed acceptance, in turn, cannot convert the elapsed high-tax interval`
- Governed by LP-074: `into an interval governed by LP-074.`
- `Time passes irreversibly under either policy.`

#### [b29] Argument 4: the comparison
- «not "risky action versus free delay."» (cut as a rhetorical foil; the cost of delay is stated in [b27] and [b28]): `Rejection has a cost even though the stipulated voter avoids personal tax liability.`
- Bounded transition: `The rational comparison is therefore between a bounded mature-state transition`
- Legacy burden: `the continued application of a legacy burden`
- Opportunity cost: `whose opportunity cost is structurally recognized but unquantified.`

#### [b30] Argument 5 heading (title unchanged)
- `The concentration objection mistakes a higher bounded equilibrium for uncontrolled compounding.`
- `Chamber objection: Sanctuary/Main/Meritboard — retained wealth compounds without control`

#### [b31] Argument 5: retention ratios
- «The petition does not deny increased retention.»: `The petition concedes increased retention.`
- 1.67×: `Sanctuary/Main marginal retention rises 1.67×`
- Lower ratios: `the corresponding changes are 1.15×, 1.05×, and 1.02× in −1, −2, and −3.`

#### [b32] Argument 5: the bound
- `In Sanctuary and Main, however, the SCM reads all savings.`
- `Higher aggregate savings induce more frequent triggers`
- At most 1.67×: `a stated equilibrium bound of at most 1.67×`
- «rather than indefinitely compounding divergence»: `in place of indefinitely compounding divergence.`
- −1 bound: `The −1 all-savings system produces the corresponding 1.15× bound.`

#### [b33] Argument 5: R10
- `R10 adopts that mechanism.`
- 50 as anchor (R10's wording): `It holds that 50 remains a high anti-concentration anchor`
- Activation bounds concentration: `increased SCM activation bounds concentration arising from retained liquidity.`
- «carefully separates that concentration rationale from solvency»: `R10 keeps that concentration rationale separate from solvency.`

#### [b34] Argument 5: which instrument
- «is not choosing between anti-concentration and tax reduction»: `Anti-concentration continues under either answer.`
- The choice: `The choice before the civilization is which instrument should perform anti-concentration`
- Blunt rate: `a blunt marginal rate designed when no alternative existed`
- SCM: `the SCM, designed to respond directly to accumulated savings.`
- «LP-073 already resolved that structural choice once.»: `LP-073 has already made that structural choice once.`

#### [b35] Argument 6 heading (title unchanged)
- `The treasury sensitivity contains its own advance-detection mechanism.`
- `Chamber objection: Main/Meritboard — 112.5% erodes to approximately 100%`
- `Strength: STRONG for detection; ARGUABLE for correction`

#### [b36] Argument 6: authored values (unchanged)
- `Under the petition's authored values, LP-074 yields $9 trillion`
- `against $8 trillion of Main obligations, or 112.5% coverage.`
- `The approximately six-year erosion result assumes 2% annual real obligation growth`
- `real-flat tax revenue.`

#### [b37] Argument 6: a sensitivity
- «That is a sensitivity»: `That result is a sensitivity.`
- Authored values: `The tax base and obligation values are authored`
- Path 2 supersedes: `Path 2's controlling estimates supersede them`
- «not an independently established forecast»: `so the result is not an independently established forecast.`
- Inevitability: `Treating the six-year path as inevitable gives a conditional scenario evidentiary weight`
- Not claimed: `that the petition does not claim for it.`

#### [b38] Argument 6: detection timing
- «catches the problem»: `the mechanism detects the problem before the stated endpoint.`
- 105%, above 100%: `Review is triggered when coverage falls below 105%, which is above the 100% line`
- «independently mandatory every five years»: `is separately mandatory every five years.`
- Year six: `The stated sensitivity reaches approximately 100% around year six`
- 36-month horizon: `which falls within the 36-month projection horizon of the mandatory five-year review.`

#### [b39] Argument 6: deadlines (unchanged)
- `The review must finish within six months.`
- `If it projects sub-100% coverage within 36 months`
- `a corrective LP must be introduced within 12 months`
- `voted within six months after introduction.`

#### [b40] Argument 6: what the rider guarantees (unchanged)
- `The rider therefore guarantees detection, audited reassessment, introduction, and adjudication.`
- `It does not guarantee that the corrective measure will pass before a shortfall`
- `it should not be represented as doing so.`

#### [b41] Argument 6: the constitutional limit
- «constitutional rather than careless»: `That remaining limitation is a constitutional requirement.`
- Binding through a rider: `An automatic restoration or compelled outcome would bind federal-tier rate law through a rider`
- RULING-TIER: `which RULING-TIER forecloses.`

#### [b42] Argument 6: Main's choice
- «not between secure 70 and unmanaged erosion at 50»: `Main's choice is therefore between retaining a structurally superseded rate at 70`, `Erosion under the transition is managed`
- Positive-margin transition: `accepting a positive-margin transition at 50.`
- Monitored above insolvency: `the adverse sensitivity is expressly monitored above insolvency`
- Back to the legislature: `forced back before the federal legislature.`

#### [b43] Argument 7 heading
- Title reworded from «a reason to demand justification for the tax»: `Lower's unidentified incidence calls for justification of the tax`
- «—not to preserve it automatically»: `gives no ground to preserve it automatically.`
- `Chamber objection: Lower — unidentified siloed collections may fund unknown obligations`

#### [b44] Argument 7: the opposition's calculation
- $100.75 billion: `The opposition calculates that Lower collections fall by $100.75 billion`
- Authored bases: `at the petition's authored bases.`
- «accurately states»: `It then correctly states that the destination of those collections`
- Unknown: `and the obligations they support are unknown.`

#### [b45] Argument 7: uncertainty only
- `That establishes uncertainty.`
- «It does not establish defunding of any identified obligation.»: `It does not establish the defunding of any identified obligation.`

#### [b46] Argument 7: the burden
- «More importantly» (cut as a signpost): `The Trajectory Principle places the burden on institutional need`
- Principle as the brief states it: `rates track demonstrated need, not inherited posture.`
- Unidentified destination: `A government that cannot identify where a tax terminates or what it funds`
- «institutional need for preserving its former rate»: `has not demonstrated the institutional need to preserve its former rate.`

#### [b47] Argument 7: the Lower principle
- «points in the same direction»: `The Lower constitutional principle points the same way.`
- `Taxation is mapped by benefit received`
- `imposing upper rates in low-service environments is described as extraction rather than governance.`

#### [b48] Argument 7: no one-way ratchet
- «cannot be allowed to function as a one-way ratchet»: `The opposition's uncertainty cannot be allowed to operate in one direction only:`

#### [b49] Argument 7: the three limits
- `it cannot prove the cut safe;`
- «but it also cannot turn»: `it also cannot turn unidentified expenditures into vested fiscal necessities;`
- `it cannot override the documented requirement that rates correspond to institutional benefit.`

#### [b50] Argument 7: Lower rates kept
- «retains Lower taxation at 25%, 12.5%, and 6.25% above $10 million rather than eliminating it»: `LP-074 keeps Lower taxation in place at 25%, 12.5%, and 6.25% above $10 million.`
- Retention changes: `The corresponding marginal-retention changes are limited to the disclosed 1.15×, 1.05×, and 1.02×.`

#### [b51] Argument 7: −1 against −2 and −3 (unchanged)
- `In −1, the SCM reads all savings and supplies the stated equilibrium bound.`
- `In −2 and −3, private whale savings remain outside SCM attribution`
- `so no stock-level safety claim is available.`

#### [b52] Argument 7: where the burden falls
- `Lower must therefore choose which burden governs uncertainty.`
- «The stronger constitutional rule is that government must justify extraction»: `Under the stronger constitutional rule, government must justify extraction through identifiable institutional need`
- «not that taxpayers must prove unidentified government receipts unnecessary»: `taxpayers need not prove unidentified government receipts unnecessary.`

#### [b53] Argument 8 heading
- Title reworded from «The schedule is a conservative ratchet, not a retreat from public obligation.»: `The schedule is a conservative ratchet that preserves public obligation.`
- `Chamber objection: All chambers — the reduction abandons fiscal and distributive responsibility`

#### [b54] Argument 8: what LP-074 keeps (unchanged)
- `LP-074 preserves the $10 million threshold`
- `retains a 50% Sanctuary/Main marginal rate`
- `leaves every SCM parameter unchanged`
- `keeps cyclical backfill authority intact.`

#### [b55] Argument 8: scenario and safeguards (unchanged)
- `Under the petition's openly authored scenario, the new rate continues to fund`
- `enumerated Main obligations without permanent ADT support.`
- `The schedule includes audit supersession, a 105% review trigger, mandatory five-year review`
- `corrective-LP deadlines, and expedited voting.`

#### [b56] Argument 8: division of labor (unchanged)
- `The division of institutional labor is deliberate:`

#### [b57] Argument 8: the five assignments (unchanged)
- `taxation remains a substantial revenue and backstop instrument;`
- `the SCM performs structural anti-concentration;`
- `automation-side revenue supports dividend obligations;`
- `Path 2 supplies controlling measurement;`
- `the cadence rider forces legislative reconsideration.`

#### [b58] Argument 8: the compromise
- «is not laissez-faire abandonment» (cut as a foil; the retained obligations are stated in [b54]–[b57] and the title): `The schedule is a conservative ratchet that preserves public obligation.`
- The compromise: `A 50% top marginal rate is the mature compromise between continuing public obligations`
- The principle: `the principle that government should relinquish burdens`
- Transferred functions: `whose original functions have been successfully transferred.`

#### [b59] Argument 9 heading (title unchanged)
- `The permanent adverse record proves the trust function no longer requires confiscatory posture.`
- `Chamber objection: Court/Meritboard — accepting uncertainty undermines institutional trust`

#### [b60] Argument 9: the permanent record (unchanged)
- `LP-074 permanently records the original 1–4 synthetic failure, the chamber margins`
- `the founder override, and the continuing publication of the opposition brief.`

#### [b61] Argument 9: the petition's labels
- `The petition separately labels authored, engraved, derived, and ruling-based claims`
- `publishes its breakpoints`
- `binds later review to superseding audit estimates.`

#### [b62] Argument 9: the maturation thesis
- «That does not make weak evidence strong.»: `Disclosure does not make weak evidence strong.`
- «It demonstrates something relevant to the maturation thesis»: `It bears on the maturation thesis in another way.`
- «possesses procedures capable of exposing error»: `The institution has procedures that expose error, retain opposition, distinguish provenance, and compel reconsideration`
- No extreme taxation needed: `so it no longer needs extreme taxation as a substitute for credibility.`
- Rate-history record: `The rate-history record identifies verified institutional track record as the mechanism`
- Trust function retires: `by which taxation's trust function retires.`

#### [b63] Argument 9: conclusion
- `Preserving a trust-signaling tax after the system has demonstrated transparent self-correction`
- «would deny the very maturation»: `would deny the maturation that the historical trajectory records.`

#### [b65] Concessions (six items)
- 1.3 multiplier: `The record contains no independent derivation of the 1.3 multiplier`
- 36-point series: `no reproducible 36-point monthly series.`
- R7 governs: `Circularity limits evidentiary confidence even if R7 remains the governing structural fact.`
- No retroactive proof: `Path 2 cannot retroactively prove the original gate condition.`
- Prospective supersession: `It prospectively supersedes the authored premises and governs later review.`
- Authored margins: `The treasury bases, obligations, growth figures, and resulting margins remain authored rather than audited.`
- «The cadence rider guarantees process, not passage or solvency.»: `The cadence rider guarantees process.`, `It guarantees neither passage nor solvency.`
- Lower incidence: `Lower fiscal incidence remains unidentified`
- No stock-level bound: `−2/−3 private whale savings lack a stock-level SCM bound.`
- Hysteresis (cited as "SB, Concessions" by the RATIFY-TAX-50-II statute): `Hysteresis is real.`
- No behavioral response quantified: `No velocity, recruitment, migration, avoidance, or taxable-base response can be quantified from the record.`

#### [b66] Closing
- `Those concessions limit certainty`
- «They do not reverse the constitutional presumption»: `leave in place the constitutional presumption established by LP-071 through LP-074.`
- `High rates were necessary when taxation had to do everything.`
- `Lower rates are justified when mature institutions perform those functions better.`

## (b) Frozen-string checklist

No check-canon pin and no guard-mutation probe targets either page (grep of `tools/check-canon.mjs` and `tools/test-canon-guard-mutations.mjs` for the two page names and the two source names: no hit). Both pages are Process tier, so the World-tier seat-name and founder-phrasing regexes do not apply (`PROCESS_TIER` row below). The linkFirst phrases and the certification positive controls belong to other files; they are confirmed below as `live:` rows and are absent from these drafts.

### AFFIRM-TAX-50-advocacy-brief.md

Headings (the ids derive from them):
- `# AFFIRM-TAX-50 — Advocacy Brief`
- `## Concessions and why`

Banner (the whole block is compared byte for byte by check.mjs):
- `> **ARCHIVE / NON-OPERATIVE.** This brief preserves a pre-certification`
- `**Superseded implementation > error — not VMSS canon.**`
- `Findings I–IV and B1–B6 passing, both LP-074 > schedules certifying`
- `**50 / 25 / 12.5 / 6.25** taking effect in 2295.`

Chamber-objection labels (sequence compared by check.mjs):
- `**[Chamber objection: Meritboard/Court — gate circularity and condition precedent] [Strength: ARGUABLE]**`
- `**[Chamber objection: Meritboard/Court — an authored gate can never fail] [Strength: STRONG]**`
- `**[Chamber objection: Meritboard/Court — no reduction before measured proof] [Strength: STRONG]**`
- `**[Chamber objection: Sanctuary/Meritboard — stipulated median voter bears dividend risk without tax benefit] [Strength: STRONG]**`
- `**[Chamber objection: Sanctuary/Main/Meritboard — risky and compounding acceptance] [Strength: STRONG]**`
- `**[Chamber objection: Main/Meritboard — 112.5% erodes to approximately 100%] [Strength: ARGUABLE]**`
- `**[Chamber objection: Court — cadence has procedural but no solvency teeth] [Strength: STRONG]**`
- `**[Chamber objection: Meritboard — authored magnitude beside engraved conclusion] [Strength: ARGUABLE]**`
- `**[Chamber objection: Lower — unknown destination and obligations for siloed collections] [Strength: WEAK]**`
- `**[Chamber objection: All negative chambers — reduction is premature or too deep] [Strength: STRONG]**`

Argument numbering (the RATIFY-TAX-50-II statute cites AB arguments 1, 1–2, 4 and 9):
- `1. **Gate circularity`
- `2. **LP-074 quarantines`
- `4. **The dividend-risk asymmetry`
- `9. **The Lower objection`
- `10. **Fifty percent`

Concession bold leads (cited as "AB, Concessions and why" by the statute):
- `**Independent gate compliance was not demonstrated.**`
- `**A later audit cannot retroactively satisfy the original condition precedent.**`
- `**The fiscal magnitudes remain authored.**`
- `**The six-year erosion sensitivity is valid under its stated assumptions.**`
- `**The cadence rider cannot guarantee solvency.**`
- `**Hysteresis is real.**`
- `**Lower-layer fiscal incidence remains unresolved, and −2/−3 lack a stock-level bound for private whale savings.**`
- `**No velocity, recruitment, migration, avoidance, or taxable-base elasticity benefit can be priced into the case.**`

Quoted instruments and record labels in prose:
- `"load-bearing worldbuilding fact,"` (Session Record R7, verbatim)
- `"never authored facts,"` (LP-074 §4, verbatim)
- `` `[A/R7]` ``
- `` `[A]` ``
- `\(1.3D\)`
- `50 remains a high anti-concentration anchor` (R10's wording)
- `"risky and compounding"` (the chamber objection's own words)

Defined terms:
- `RULING-TIER`
- `Trajectory Principle`
- `condition precedent`
- `cadence rider`
- `Main-treasury`
- `charter-restatement audit docket`
- `gradient principle`

Pin cites (45; check.mjs compares them block by block):
- [b2] `(Petition v4.1 §§5–7; LP-074 §§3–5; Session Record R7 and R10.)`
- [b4] `(Opposition Brief, Findings 1–2; Petition v4.1 §5 item 8 and §6.)`
- [b5] `(Session Record R7; Petition v4.1 §5 items 8 and 14.)`
- [b6] `(Opposition Brief, Findings 1 and 7; Petition v4.1 §7(e); LP-074 §4.)`
- [b8] `(LP-074 §4; Rate-History Extract, "The through-line — the Trajectory Principle.")`
- [b9] `(LP-074 §§4–5.)`
- [b10] `(Petition v4.1 §§3.4 and 7(e); LP-074 §4.)`
- [b12] `(LP-073 §§1–2 and Trigger field.)`
- [b13] `(LP-074 §§3 and 5; Rate-History Extract, "The supersession chain" and "The through-line — the Trajectory Principle.")`
- [b14] `(LP-073 §§1–4; LP-074 §§3–5.)`
- [b16] `(LP-074 §1.)`
- [b17] `(Petition v4.1 §3.3, §5 items 8–14, and §6; Session Record R10, "Scope note.")`
- [b18] `(Petition v4.1 §§3.3 and 4.)`
- [b19] `(Petition v4.1 §§5–6; Opposition Brief, Findings 1–2.)`
- [b20] `(LP-074 §3; Rate-History Extract, "The through-line — the Trajectory Principle"; Session Record R10.)`
- [b22] `(Petition v4.1 §3.4.)`
- [b23] `(Petition v4.1 §§3.1–3.2.)`
- [b24] `(Session Record R10.)`
- [b25] `(Petition v4.1 §§2–3; Session Record, "Sol pass five and line closure," mechanics-table correction.)`
- [b27] `(Petition v4.1 §5 items 1–7 and §6.)`
- [b28] `(Petition v4.1 §§5–7(e).)`
- [b29] `(Petition v4.1 §7(a)–(c).)`
- [b30] `(Petition v4.1 §§6–7; Opposition Brief, Finding 9 residual; Session Record R10.)`
- [b32] `(Opposition Brief, Finding 9 residual and seat note; Petition v4.1 §7(c).)`
- [b33] `(Petition v4.1 §7(a)–(e).)`
- [b34] `(Petition v4.1 §7; Opposition Brief, Finding 9 seat note.)`
- [b36] `(Petition v4.1 §5 and §6, "Sensitivity.")`
- [b37] `(Opposition Brief, Findings 2 and 6.)`
- [b38] `(LP-074 §§2 and 4; Session Record R10; Rate-History Extract, "The through-line — the Trajectory Principle.")`
- [b39] `(Petition v4.1 §§5–7; LP-074 §§2–5.)`
- [b41] `(Opposition Brief, Finding 5.)`
- [b42] `(Petition v4.1 §5 item 15; Session Record, "Resolved seams.")`
- [b43] `(LP-073 §4; LP-072 §§1–3.)`
- [b44] `(Petition v4.1 §§2–3 and §5 item 15.)`
- [b46] `(Petition v4.1 §1; LP-074 §1.)`
- [b47] `(Petition v4.1 §§2 and 6; Session Record R10.)`
- [b48] `(LP-073 §§1–4; LP-074 §3.)`
- [b50] `(Opposition Brief, Findings 1–2; Petition v4.1 §§5–6.)`
- [b51] `(Opposition Brief, Finding 7; LP-074 §4.)`
- [b52] `(Petition v4.1 §§5–6; Opposition Brief, Finding 6.)`
- [b53] `(Petition v4.1 §6.)`
- [b54] `(Petition v4.1 §7; Opposition Brief, Finding 9 residual.)`
- [b55] `(Petition v4.1 §3.4.)`
- [b56] `(Petition v4.1 §§2–3 and §5 item 15; Opposition Brief, Finding 5.)`
- [b57] `(Petition v4.1 §4; Opposition Brief, "Ungrounded instincts.")`

### AFFIRM-TAX-50-supplemental-brief.md

Headings (the ids derive from them):
- `# AFFIRM-TAX-50 — Full Steelman to Claude`
- `## Concessions`

Banner (the whole block is compared byte for byte by check.mjs):
- `> **ARCHIVE / NON-OPERATIVE.** This steelman preserves a pre-certification`
- `**Superseded implementation > error — not VMSS canon.**`
- `Findings I–IV and B1–B6 passing, both LP-074 > schedules certifying`
- `**50 / 25 / 12.5 / 6.25** taking effect in 2295.`

Chamber-objection labels (sequence compared by check.mjs):
- `**[Chamber objection: All chambers — retaining 70 is the safe default] [Strength: STRONG]**`
- `**[Chamber objection: Meritboard — gate circularity] [Strength: ARGUABLE]**`
- `**[Chamber objection: Meritboard/Court — authored compliance destroys the gate permanently] [Strength: STRONG]**`
- `**[Chamber objection: Sanctuary — no tax benefit, full dividend exposure, cheap rejection] [Strength: STRONG]**`
- `**[Chamber objection: Sanctuary/Main/Meritboard — retained wealth compounds without control] [Strength: STRONG]**`
- `**[Chamber objection: Main/Meritboard — 112.5% erodes to approximately 100%] [Strength: STRONG for detection; ARGUABLE for correction]**`
- `**[Chamber objection: Lower — unidentified siloed collections may fund unknown obligations] [Strength: ARGUABLE]**`
- `**[Chamber objection: All chambers — the reduction abandons fiscal and distributive responsibility] [Strength: STRONG]**`
- `**[Chamber objection: Court/Meritboard — accepting uncertainty undermines institutional trust] [Strength: STRONG]**`

Argument numbering (the statute cites SB arguments 4 and 7):
- `4. **The median voter's apparent risk asymmetry`
- `7. **Lower's unidentified incidence`

Quoted instruments, principles and record labels in prose:
- `\(R\)`
- `\(1.3D\)`
- `founder-ratified, load-bearing, and reopenable` (R7's three attributes)
- `rates track institutional need, not political posture` (the brief's statement of the LP-074 principle)
- `rates track demonstrated need, not inherited posture` (the same, in argument 7)
- `50 remains a high anti-concentration anchor` (R10's wording)
- `Hysteresis is real.` (cited as "SB, Concessions" by the statute)

Defined terms:
- `RULING-TIER`
- `Trajectory Principle`
- `cadence rider`
- `Main-treasury`
- `cyclical backfill authority`
- `epistemic quarantine`
- `precedent control`

Pin cites (44; check.mjs compares them block by block):
- [b4] `(LP-071 §§1–4.)`
- [b5] `(LP-072 §§1–4; Rate-History Extract, "The band-to-point precision arc.")`
- [b6] `(LP-073 §§1–4.)`
- [b7] `(LP-074 §§3–5; Rate-History Extract, "The through-line — the Trajectory Principle.")`
- [b11] `(Opposition Brief, Finding 1; Petition v4.1 §5 item 8 and §6.)`
- [b12] `(Session Record R7; Petition v4.1 §5 item 8.)`
- [b14] `(Opposition Brief, Finding 1; Session Record R7.)`
- [b15] `(Session Record R7; Petition v4.1 §7(e).)`
- [b17] `(LP-074 §4; Rate-History Extract, "The through-line — the Trajectory Principle.")`
- [b19] `(Petition v4.1 §§5–7; LP-074 §§2 and 4.)`
- [b20] `(Opposition Brief, Finding 7; Petition v4.1 §7(e); LP-074 §4.)`
- [b23] `(LP-074 §1.)`
- [b24] `(Petition v4.1 §3.3, §5 items 8–14, and §6; Session Record R10.)`
- [b25] `(Petition v4.1 §§3.3 and 4.)`
- [b27] `(LP-074 §3; Session Record R10.)`
- [b28] `(Petition v4.1 §3.4; LP-073 schedule field; LP-074 §1.)`
- [b31] `(Petition v4.1 §3.1.)`
- [b32] `(Petition v4.1 §§3.1–3.2.)`
- [b33] `(Session Record R10.)`
- [b34] `(LP-071 §3; LP-073 §§1–2 and Trigger field.)`
- [b36] `(Petition v4.1 §§5–6.)`
- [b37] `(Petition v4.1 §§5–7(e).)`
- [b38] `(Petition v4.1 §§6–7(a)–(b).)`
- [b39] `(Petition v4.1 §7(b)–(c).)`
- [b40] `(Petition v4.1 §7(c); Opposition Brief, Finding 9 residual.)`
- [b41] `(Opposition Brief, Finding 9 seat note; Petition v4.1 §7(c).)`
- [b44] `(Opposition Brief, Finding 5.)`
- [b46] `(LP-074 §§3–4; Petition v4.1 §5 item 15.)`
- [b47] `(LP-072 §§1–4; LP-073 §4.)`
- [b50] `(LP-074 §1; Petition v4.1 §§1 and 3.1.)`
- [b51] `(Petition v4.1 §§2–3.)`
- [b54] `(Petition v4.1 §§1–2 and 7(d); LP-074 §1.)`
- [b55] `(Petition v4.1 §§6–7.)`
- [b57] `(Petition v4.1 §§2 and 5–7; LP-073 §§1–2; LP-074 §§3–5.)`
- [b58] `(LP-074 §§1 and 3; Session Record R10.)`
- [b60] `(LP-074 §2 and Record field.)`
- [b61] `(Petition v4.1 §§5–7.)`
- [b62] `(LP-074 §3; Rate-History Extract, "The through-line — the Trajectory Principle.")`
- [b65] `(Opposition Brief, Findings 1–2; Session Record R7.)`
- [b65] `(Opposition Brief, Finding 7; Petition v4.1 §7(e).)`
- [b65] `(Petition v4.1 §§5–6.)`
- [b65] `(Petition v4.1 §7; Opposition Brief, Finding 9 residual.)`
- [b65] `(Petition v4.1 §§2–3 and §5 item 15; Opposition Brief, Finding 5.)`
- [b65] `(Petition v4.1 §§3.4 and 4; Opposition Brief, "Ungrounded instincts.")`

### rendered: AFFIRM-TAX-50-advocacy-brief.md (the draft through the live renderDoc)
- `id="affirm-tax-50-advocacy-brief"`
- `id="concessions-and-why">Concessions and why</h3>`
- `<blockquote class="pending-quote">`

### rendered: AFFIRM-TAX-50-supplemental-brief.md (the draft through the live renderDoc)
- `id="affirm-tax-50-full-steelman-to-claude"`
- `id="concessions">Concessions</h3>`
- `<blockquote class="pending-quote">`

### live: documents/ratify-tax-50-ii-statute-source.html (inbound deep links and argument cites; untouched)
- `pending-ratify-tax-50-advocacy.html#concessions-and-why`
- `pending-ratify-tax-50-supplemental.html#concessions`
- `AB</a>, argument 1 and`
- `AB</a>, arguments 1–2 and`
- `AB</a>, argument 4]`
- `AB</a>, argument 9]`
- `SB</a>, argument 4]`
- `SB</a>, argument 7]`

### live: pending-ratify-tax-50-ii-statute.html (generated from the file above; untouched)
- `pending-ratify-tax-50-advocacy.html#concessions-and-why`
- `pending-ratify-tax-50-supplemental.html#concessions`

### live: tools/build-pending-pages.mjs (generator; untouched)
- `adv: 'docs-review/AFFIRM-TAX-50-advocacy-brief.md'`
- `supp: 'docs-review/AFFIRM-TAX-50-supplemental-brief.md'`
- `verbatim: { md: md.adv }`
- `verbatim: { md: md.supp }`

### live: tools/check-canon.mjs (Process-tier exemption covering both pages; untouched)
- `const PROCESS_TIER = (f) => f.startsWith('pending-') || f === 'deregistered-statutes.html';`

### live: documents/path-2-charter-source.md (linkFirst phrase; not in this unit)
- `a schedule adopted by the chambers`

### live: documents/path-2-schedule-source.md (linkFirst phrase; not in this unit)
- `This Schedule is part of the Charter`

### live: path-2-certification-2294.html (certification positive controls; not in this unit)
- `SCHEDULES A AND B CERTIFIED`
- `exactly 30 keyed annual observations`
- `Main-12 106.7%`
- `ADT-36 122.4%`
- `complete ordered window SHA-256-attested`

### absent: strings that must not occur in either draft
- `lawful nonactivation`
- `founder's ruling`
- `founder’s ruling`
- `a schedule adopted by the chambers`
- `SCHEDULES A AND B CERTIFIED`

## (c) Flags

1. **Argument titles reworded (7 of 19).** Advocacy titles 1, 6, 7, 9 and 10 and supplemental titles 7 and 8 carried the "X, not Y" or em-dash form. They are bold list-item leads, not headings, so they produce no id. A grep of the repo finds no quotation of any title. The statute cites arguments by number (AB 1, 1–2, 4, 9; SB 4, 7), and numbering and each argument's chamber-objection label are unchanged. This could go either way: if the titles count as frozen "bold labels", restore those seven from the «original» wording in (a). The bodies do not depend on the new wording.
2. **Left byte-identical on purpose.** Three things were not rewritten:
   - The archive banner in both files. It is shared with the opposition brief and ballot pages, its two bold labels are frozen, and its plain sentence is already in record voice.
   - All 19 chamber-objection labels and the 8 advocacy concession leads. The statute cites "Concessions and why" for their content.
   - All 89 pin cites.
3. **Seat names and founder wording stay.** These are Process-tier pages. The seat name "Sol" is inside the frozen pin cite to the Session Record heading "Sol pass five and line closure". "Claude" is in the supplemental H1, which produces the id `affirm-tax-50-full-steelman-to-claude`, and in the addressee of its opening sentence. The founder wording kept is "founder-ratified" (R7) and "founder override" (advocacy argument 8, supplemental argument 9), both facts of the record. The World-tier regexes exempt `pending-*` pages, and check.mjs confirms that no mention was added.
4. **"Not X" wording kept inside the stated principle.** The supplemental states LP-074's principle as "rates track institutional need, not political posture" (argument 1) and as "rates track demonstrated need, not inherited posture" (argument 7). Both are the brief's report of an instrument's principle, so they stay. They are not check-canon strings. The deregistered pin 'top marginal rates track institutional need, not posture.' and the R13 doctrine sentence live on other pages and are untouched.
5. **Modal and quantifier drift.** check.mjs reports this and it is not a failure. The supplemental's "must" goes from 6 to 5, because «not that taxpayers must prove unidentified government receipts unnecessary» became "taxpayers need not prove unidentified government receipts unnecessary". The meaning is the same. The rises in "cannot" (advocacy 14 → 17, supplemental 10 → 12) come from stating rebuttals positively. These briefs are non-operative archive argument, so there is no operative text in them.
6. **Cuts.** Each of these was a signpost or rhetorical foil, and its content is carried elsewhere:
   - supplemental 'That distinction matters.' ([b13])
   - supplemental 'More importantly' ([b46])
   - the foil «not "risky action versus free delay."» ([b29])
   - «is not laissez-faire abandonment» ([b58])
   - the advocacy's 'launder' metaphor ([b38])

   The (a) rows give the draft sentence that carries each one.
7. **Small additions.** Each makes explicit something the original implied:
   - "It consists of five steps:" ([b18]) counts the five list items that follow.
   - "Anti-concentration continues under either answer." ([b34]) restates «is not choosing between anti-concentration and tax reduction».
   - "at 70" and "at 50" ([b42]) name the two rates of the original's «secure 70 and unmanaged erosion at 50».
   - "That uncertainty supplies no evidence…" (advocacy [b19]) replaces the em-dash tail.
8. **Chrome not in this unit.** The hero, description and banner of both pages are authored in `tools/build-pending-pages.mjs`, which is outside the two sources and was not edited. The supplemental hero still says "Supplemental Steelman", which matches the H1.
9. **Splice.**
   - Copy both drafts over `docs-review/AFFIRM-TAX-50-advocacy-brief.md` and `docs-review/AFFIRM-TAX-50-supplemental-brief.md`, then run `npm run build:pending`.
   - check.mjs has already run the live `renderDoc`, and it gives the same tag, attribute and id skeleton as the original. The generator's own `assertVerbatim` passes on both drafts, so the build will not throw.
   - The inbound `#concessions-and-why` (7 links) and `#concessions` (1 link) on the statute page keep resolving.
   - No hash, pin or probe binds these files.
   - The drafts keep the original layout: one line per paragraph, the banner wrapped as before, LF endings.
