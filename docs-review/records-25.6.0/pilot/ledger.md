# Records 25.6.0 pilot unit: reconstruction ledger

Drafts only. No live source was edited. This unit ships the pilot Jason approved on 2026-09-28. The five drafts in this folder are:

- `path-2-presidential-ruling-source.md`: the approved pilot draft with every fix from `docs-review/records-pilot/local-fixes.md` applied. It replaces `documents/path-2-presidential-ruling-source.md`.
- `path-2-adoption-ruling-source.md`: the approved pilot draft with its local fixes applied. It replaces `documents/path-2-adoption-ruling-source.md`.
- `path-2-commencement-duty-act.html`: the approved pilot draft with its local fixes applied and §6 restored byte for byte from the live page. It replaces `path-2-commencement-duty-act.html`.
- `build-path2-pages.mjs`: a full copy of `tools/build-path2-pages.mjs`. Only two lines differ: line 559 (rulings `heroSub`) and line 564 (the rulings banner paragraph).
- `build-pending-pages.mjs`: a full copy of `tools/build-pending-pages.mjs`. Only line 362 differs (the `statuteBanner()` pb-label).

Checker: `node docs-review/records-25.6.0/pilot/check.mjs`. It reads the drafts and the live sources and writes nothing.

Matching conventions:
- Section (a) and Local-fix quotes are matched against the draft's visible text. That text has tags stripped, entities decoded, Markdown markers removed, whitespace collapsed and curly quotes read as straight. For the Act it includes the `<title>` and meta description. For the two .mjs drafts it is the in-scope block: the rulings build block, and the `statuteBanner()` literal.
- Section (b) strings are matched byte for byte against the raw draft, with whitespace collapsed only. Rows marked absent must not occur.

## Word counts

These are prose words. For the rulings, that is the whole Markdown text with markup stripped. For the Act, it is the visible text inside `<main>`. For each .mjs draft, it is the permitted literal lines only.

| Document | Live | Draft | Change |
|---|---|---|---|
| path-2-presidential-ruling-source.md | 898 | 897 | -0.1% |
| path-2-adoption-ruling-source.md | 567 | 580 | +2.3% |
| path-2-commencement-duty-act.html | 695 | 700 | +0.7% |
| build-path2-pages.mjs | 107 | 119 | +11.2% |
| build-pending-pages.mjs | 6 | 7 | +16.7% |

Register tells, counted by check.mjs as live → draft:
- Reversal constructions ("is not A; it is B", "; it does not"): Ruling 1 3 → 0, Ruling 2 1 → 0, Act 3 → 0.
- Prose em-dashes in the rulings: 11 → 0 and 7 → 0.
- The Act's 14 em-dashes are all in labels, and both .mjs literals keep their label em-dashes.

## (a) Fact ledger

Each row names a fact in the live original and quotes, in 15 words or fewer, where it lands in the draft. Where the original carried a fact in a metaphor, a reversal or an aphorism that the reconstruction dropped, the row gives the original wording in single quotes and then quotes the draft sentence that carries its content.

### path-2-presidential-ruling-source.md

Caption and preamble
- Caption: `RULING OF THE PRESIDENCY`
- Matter: `In re: Adoption Posture of the Path 2 Charter (LP-074 Schedule A Methodology)`
- Date and stage: `2279 (Y178) · Executive-doctrinal review prior to chamber adoption`
- Draft Charter read: `The office has read the draft Charter`
- Forty findings of the commissioned hostile methodological review: `the forty findings of the commissioned hostile methodological review`
- Six proposed amendment blocks: `the drafting office's six proposed amendment blocks`
- Operative opening: `The office rules as follows.`

I. On the review itself
- Part token: `I. On the review itself.`
- Findings sustained in substance: `The findings are sustained in substance.`
- 'a constitution for a coin flip' and 'with great ceremony': lock moment fixed: `the draft fixed formally the moment at which the methodology would be locked`
- Lock content left open: `left entirely open what the lock could contain`
- The quoted rule: `"decide honestly, in advance, by whatever standard you choose"`
- Preregisters sincerity only: `preregisters sincerity and nothing else`
- Central charge: `a motivated certifier or a motivated refuser could each write their verdict into the lock`
- Full formal compliance: `still comply with every word of the Charter`
- Holding, correct and disqualifying: `The charge is correct, and it is disqualifying`
- Ground: `this civilization does not adopt instruments that measure the intentions of their operators`

II. Amendment Blocks A through F
- Part token and holding: `II. Amendment Blocks A through F: ADOPTED`
- One fence, set out in Part IV: `with one fence set out in Part IV`
- 'notes for the record why each survives': `The office records why each block survives doctrinal review.`
- Block A ground: `Block A, because the substance of a test belongs in the law that commissions it.`
- Block A content ('not implementation details; they are the test'): `Estimands, thresholds, admissible specification sets and interval discipline make up the test`
- Block A, delegation ('has delegated itself'): `a Charter that delegates them has delegated the test`
- Block B ground: `Block B, because no body may audit its own lock.`
- Block B, the review's disclosure finding: `The review found that the draft demanded fuller disclosure for a failure`
- Block B, the comparison: `than for the certification that changes the law`
- Block B, 'single most corrosive defect': `the most damaging defect in the instrument`
- Block B, what the asymmetry would have taught: `taught the civilization to trust success and interrogate only failure`
- Block B, repaired in the correct direction: `corrects the asymmetry in the right direction`
- Block B, favorable result bears the heavier burden: `the favorable result carries the heavier burden of proof`
- Block C ground ('quarantines that stop at the nameplate are theater'): `a quarantine that stops at the named signatories is ineffective`
- Block C reach ('the hands that build the models'): `The prohibition extends to the model builders`
- Block C, signers covered ('the seats that sign them'): `as well as the signers`
- Block D ground ('grander costumes'): `this office has vetoed more ambitious forms of entrenchment than a procedural void`
- Block D, engineered deviation ('burn a decade'): `A refuser who can consume a decennial window with an engineered deviation`
- Block D, ungranted veto: `holds a veto this Charter never granted`
- Block D contents: `materiality, cure, independent adjudication of voids, and windows not consumed by sabotage`
- Block D, adopted without reservation: `are adopted without reservation`
- Block E ground, the Charter's sentence quoted verbatim: `Block E, because "un-shown" must mean the world changed, not the ruler.`
- Block E, sentence adopted verbatim: `The office adopts the drafting office's sentence verbatim into doctrine.`
- Block F ground: `Block F, because evidence is not tainted by who once cited it.`
- Block F, 'Argument is quarantined; the world is not.': `The quarantine covers argument, not the underlying data.`

III. On the voting rule
- Part token: `III. On the voting rule.`
- Holding: `majority of three, per-finding, all votes and dissents published over signature.`
- Unanimity rejected: `Unanimity is rejected.`
- Conservatism sits in the evidentiary standard: `The Charter's conservatism belongs in its evidentiary standard, and it is already there`
- Four findings at the least-favorable bound: `four findings, each at the bound least favorable to activation`
- Full admissible set: `across the full admissible specification set`
- 'stack a personnel veto on top of an evidentiary fortress': `A unanimity rule would add a personnel veto on top of that standard`
- 'is not rigor; it is a second, hidden refusal mechanism': `would work as a second, hidden refusal mechanism`
- 'just finished striking those from the other side of the instrument': `This office has just struck such mechanisms from other parts of the instrument.`
- Published dissent against a recomputable record: `A dissent published over signature, against a record the whole civilization can recompute`
- More discipline than a silent veto: `imposes more discipline than a veto exercised in silence`

IV. On the Registrar
- Part token: `IV. On the Registrar.`
- Adopted with a fence: `Adopted, with a fence.`
- Doctrine applied ('instructed by'): `The office applies its own doctrine against federal sediment`
- Doctrine content ('hunt for new ones'): `institutions outlive their reasons and then look for new ones`
- Custody and verification ONLY: `standing custody and verification authority ONLY`
- Enumerated functions: `the lock, the archive, provenance, conformity, deviation adjudication, and the technical-objection docket`
- Barred from methodological authority: `It is expressly barred from methodological authority`
- 'Judgment belongs to the instrument.': `because judgment belongs to the instrument`
- Verifies conformity to the lock: `It verifies that the Commission did what it locked`
- 'rules never on whether what was locked was wise': `never rules on whether what was locked was wise`
- Drift read as exceeding its charter: `A Registrar that drifts toward merits review is to be read as exceeding its charter`
- Merits determinations void on their face: `any merits determination it makes is void on its face`
- 'Custody is a service.' (aphorism; carried by the custody-only grant): `holds standing custody and verification authority ONLY`

V. On the contested findings
- Part token: `V. On the contested findings.`
- Sustained on all three: `The drafting office is sustained on all three.`
- First, non-commencement not a defect: `First, non-commencement is not a defect.`
- First, 'it is the promise': `The Charter's promise is that the enacted schedule`
- Lawful state, the enacted schedule 70/35/17/8: `seventy, thirty-five, seventeen, eight remains the lawful state of this civilization`
- No construction placing the burden of motion on the status quo: `no instrument of this Charter may be construed to place the burden of motion`
- (same rule, object): `the burden of motion on the status quo`
- Rates fall when shown: `Rates fall when shown`
- No duty to seek the showing: `nothing in doctrine obliges anyone to go looking for the showing`
- Second, record sealed as argument: `the adjudication record of the prior proceedings remains sealed as argument`
- Second, 'admissible never': `is never admissible`
- Second, data untainted: `the data beneath it was never tainted by that argument`
- Third, clerical cross-reference: `Third, the finding is clerical: cross-reference the standing definition.`

VI. Adoption posture
- Part token: `VI. Adoption posture.`
- Directed to the amended form only: `The chambers are directed to take up the Charter only in its amended form.`
- Notice without prejudgment: `The office gives notice, without prejudgment, that it holds the veto`
- Scope of the reserved veto: `for instruments of exactly this kind`
- 'the delegation disease intact': `A Charter that reached adoption still delegating the substance of its test`
- Such a Charter would meet the veto: `would meet the veto`
- Amended draft will not: `the amended draft will not, if it conforms to this ruling`
- Condition, remaining review: `survives its remaining review`

VII. Closing observation
- Part token: `VII. A closing observation, for the record.`
- 'a sentence it should not be made to unlearn': `established a principle this civilization should not be made to abandon`
- The principle (cited on deregistered-statutes.html): `rates fall when shown, and hold when merely told`
- 'whatever its intentions': `Whatever its drafters intended, the first version of the draft Charter`
- 'a lock that spoke the verdict in advance in a steadier voice': `would have permitted a lock that stated the verdict in advance`
- A showing that was itself a telling: `so that a showing under it would itself have been a telling`
- 'the difference between those two things, written down': `This ruling adopts the amendments that write the difference between the two into the Charter.`

Close
- `So ruled.`
- `THE PRESIDENCY OF VMSS`
- `2279 (Y178)`

### path-2-adoption-ruling-source.md

Caption and preamble
- Caption: `RULING OF THE PRESIDENCY`
- Matter: `In re: Adoption of the Path 2 Charter and its Residual-Risk Register`
- Date and stage: `2279 (Y178) · Final executive-doctrinal review`
- Amended Charter read: `The office has read the amended Charter`
- Regression record of the first review: `the regression record of the first hostile review against it`
- Twelve findings of the second review: `the twelve findings of the second review`
- Commissioned cold: `commissioned cold against the instrument's offices and process`
- Blind reviewer: `a reviewer who saw neither the drafting history nor the first reviewer's work`
- Register 'ships with the text': `the Residual-Risk Register that accompanies the text`
- Operative opening: `The office rules as follows.`

I.
- Prior directives satisfied: `I. The directives of this office's prior ruling are satisfied.`
- 'The substance of the test lives in the Charter.': `The substance of the test is now in the Charter.`
- Registrar behind its fence: `The Registrar stands behind its fence`
- Fence justiciable: `the fence is now justiciable, not merely asserted`
- 'made honest in both directions': `The majority rule stands and now guards against error in both directions`
- Particular approval: `the office notes with particular approval`
- §1.6 voids a vote against the arithmetic either way: `amended §1.6 voids a vote against the arithmetic whichever way the arithmetic points`
- 'guarded only against false generosity would have been half a law': `A rule that voided only votes for activation would have guarded against error`
- (same sentence, close): `in one direction only`
- Two independent reviews: `Across two independent reviews`
- Sixty-two findings filed: `sixty-two hostile findings were filed against this methodology`
- 'fifty-nine died in text': `the text resolved fifty-nine of them`

II.
- 'the three that did not die' and their residues: `On the three findings the text did not resolve, and the residues engraved with them`
- Register read: `the office has read the Register`
- 'what this civilization's law is supposed to be': `It is what this civilization's law should be`
- Failures kept as boundary markers ('rather than painting over them'): `a record that keeps its failures visible as boundary markers`
- Register's closing sentence states the office's doctrine better: `states the doctrine of this office better than this office has`
- Zero residual risk would deserve the veto: `a methodology claiming zero residual risk would deserve the veto`
- Eight residues by name, priced, payer named ('says who pays'): `This methodology names eight residues, prices each, and states who bears the cost.`
- RR-6 ('no rule starves both saboteurs'): `RR-6 concedes that no rule denies a benefit to both`
- RR-6, the two saboteurs: `the refusing and the certifying saboteur`
- RR-6 arithmetic: `shows its arithmetic for the allocation chosen`
- RR-7 ('a partisan's hunger'): `RR-7 concedes that a scored duty does not supply a partisan's motive`
- RR-7 alternative: `explains why the alternative reopens every capture finding on the record`
- RR-8 concession: `RR-8 concedes that the first window may field no Commission at all`
- RR-8, 'calls that the promise kept, which it is': `correctly treats that outcome as the Charter's promise kept`
- 'This is not weakness disclosed; it is strength stated precisely.' (reversal; the approval is carried by): `It is what this civilization's law should be`

III.
- Veto lifted: `The veto noticed in the prior ruling is lifted.`
- 'The instrument that would have met it ... the delegation disease intact': `reserved for a Charter that reached adoption still delegating the substance of its test`
- 'does not exist': `no such instrument is before the office`
- 'fixes what can be fixed, mechanizes what cannot': `fixes in text what can be fixed and converts what cannot into mechanism`
- Prices what remains and publishes the price: `It prices the risk that remains against the change it governs, and publishes that price.`

IV.
- Adopted: `The Charter and its Register are ADOPTED.`
- Register part of the adoption record: `The Register is adopted as part of the adoption record`
- Binding as the Charter's account of its limits: `binds as the Charter's own account of its limits`
- First decennial window, today to 2288: `The first decennial window opens today and closes 2288.`
- Repeated so no reader mistakes the law: `So that no reader of this record mistakes the state of the law`
- No rate changes today: `the office repeats: no rate changes today.`
- Schedule 70/35/17/8: `The schedule is seventy, thirty-five, seventeen, eight`
- Until a Commission this Charter can constitute: `it will remain so until a Commission that this Charter can constitute`
- A showing that cannot be faked: `produces a showing that this Charter cannot be made to fake`

V.
- Part label: `A closing observation, for the record.`
- 'refused a rate cut that arrived as a promise', sixty-six years ago: `Sixty-six years ago the chambers rejected a rate cut offered as a promise.`
- 'can arrive only as a proof', last year: `Last year they enacted one that can take effect only on proof.`
- 'the instrument that decides the difference', today: `Today the civilization adopted the instrument that decides whether that proof has been made.`
- The third document: `The office observes that the third document`
- Could not have been written first: `the only one of the three that could not have been written first`
- Made of the failures of the other two: `It is made almost entirely of the failures of the other two`
- Engraved for the next drafter: `engraved where the next drafter can read them`

Close
- `So ruled. So adopted.`
- `THE PRESIDENCY OF VMSS`
- `2279 (Y178)`

### path-2-commencement-duty-act.html

Metadata and hero
- Page title: `LP-075 — Path 2 Commencement Duty Act • The Five Rings`
- Description, 2291 procedural amendment: `The 2291 federal procedural amendment that required a Path 2 commencement`
- Description, before activation: `before LP-074's schedules could activate`
- Description, compelled an answer without a rate change: `LP-075 compelled an answer without changing a rate`
- Description, gates not weakened: `weakening the Schedule A and B evidence gates`
- Kicker: `The Five Rings · Federal law · Path 2 amendment`
- Heading: `LP-075 — Path 2 Commencement Duty Act`
- Narrow procedural successor: `A narrow procedural successor, enacted after the first Path 2 window`
- 'the first lawful Path 2 window closed without a run': `closed lawfully without a run`
- 'It compels the test; it does not select the result.': `It compels the test and leaves the result to the existing Path 2 rules.`

Status banner
- Enacted 2291 (Y190): `ENACTED · 2291 (Y190).`
- Amends §12.3 under §13.1 and Article XXV.VI: `LP-075 amends Path 2 Charter §12.3 under §13.1 and Article XXV.VI.`
- 'neither lowers a rate': `It lowers no rate`
- 'nor weakens LP-074's A1–A8 or B1–B6 conditions': `leaves LP-074's A1–A8 and B1–B6 conditions intact`
- Outcome-neutral answer required and returned in 2294: `The 2294 execution returned the outcome-neutral answer the Act required`
- Both schedules certified: `both schedules certified`
- 'LP-074 and valid notice, not LP-075, set the rates and made them effective': `LP-074 set the rates and valid notice made them effective; LP-075 did neither.`

Cross-links (labels; hrefs in section b)
- `LP-075 — register entry`
- `Amended Charter §12.3`
- `LP-074 — conditional rate authority`
- `2294 certification record`

Question presented
- Heading: `Question presented`
- Premise: `When the civilization has enacted a conditional rate schedule`
- The question: `must it conduct the audit capable of activating or rejecting that schedule?`
- Answer yes as to commencement: `The Act answers yes as to commencement.`
- Evidence still required before any rate moves: `Evidence remains required before any rate moves`
- Omission may not become an undeclared permanent veto: `omission may not become an undeclared permanent veto`

§1 Scope
- Heading and labels: `Operative provisions Section Rule §1 — Scope`
- Applied while a schedule remained unresolved: `The Act applied while an LP-074 schedule remained unresolved.`
- $10 million threshold and SCM parameters preserved: `It preserves the $10 million threshold, every SCM parameter`
- Brackets, stream separation, evidentiary conditions preserved: `sub-threshold bracket administration, stream separation, and every statutory evidentiary condition`

§2 Commencement duty
- Label: `§2 — Commencement duty`
- One lawful commencement per decennial window: `In each decennial window, at least one lawful process commencement had to be attempted`
- Only for a schedule ready for its own pathway: `for a schedule legally ready for its own evidence pathway`
- A Schedule A run could not certify Schedule B: `A Path 2 run for Schedule A could not certify Schedule B`
- Schedule B required LP-074 §6's Lower Incidence Certificate: `which required LP-074 §6's separate Lower Incidence Certificate`

§3 Remedial first run
- Label: `§3 — Remedial first run`
- Trigger, 2279–2288 closed without a run: `Because the 2279–2288 window closed without a run`
- Commission within 180 days: `a Commission had to be constituted within 180 days of enactment`
- Lock by the amended deadline: `lock by the amended deadline`
- Publication through existing mechanisms: `publish through the existing Registrar, escrow, reproducibility, and cold-review mechanisms`
- 2292 lock belongs to 2289–2298: `The resulting lock in 2292 belongs to the 2289–2298 window`
- Does not rewrite the first window: `does not rewrite the first window`

§4 Outcome neutrality
- Label: `§4 — Outcome neutrality`
- Certification, failure or void under the pre-existing rules: `A certification, failure, or legally recognized void is governed by the pre-existing Path 2 rules.`
- Compels an answer, not certification: `The Act compels an answer, not a certification.`
- No chamber may command a result: `No chamber may command a desired result`
- No second political vote after a valid certificate: `impose a second political vote after a valid certificate`

§5 Anti-dissolution
- Label: `§5 — Anti-dissolution`
- Failure to lock without justification: `fails to lock without a recognized competence or integrity justification`
- Consequences: `replacement constitution, public attribution, and the standing Meritboard sanction process`
- §12.4(b) void keeps non-consumption and replacement: `A qualifying §12.4(b) void retains its non-consumption and replacement consequence.`
- Strategic non-locking cannot recreate the inaction veto: `Strategic non-locking cannot recreate the inaction veto.`

§6 Separate termination (byte-identical to the live page)
- Label: `§6 — Separate termination`
- Terminates separately: `The duty terminates separately when the relevant schedule certifies`
- Terminating events: `certifies, fails, is lawfully repealed or superseded, or another law expressly resolves it`
- 2294 record, both schedules: `The 2294 record certified Schedule A and then independently certified Schedule B after B1–B6 passed.`

Completed effect
- Label: `Completed effect.`
- 'passed Findings I–IV and certified Schedule A': `In the 2294 record, Findings I–IV passed and Schedule A certified.`
- Lower Incidence Certificate passed B1–B6 and certified Schedule B: `The independent Lower Incidence Certificate passed B1–B6 and certified Schedule B.`
- Valid notice, 50 / 25 / 12.5 / 6.25, effective 2295: `Valid notice made 50 / 25 / 12.5 / 6.25 effective in 2295.`
- 'LP-075 compelled the work; it did not set or activate any rate.' (cut as a restatement; carried by the banner): `LP-074 set the rates and valid notice made them effective; LP-075 did neither.`
- (same fact, carried by Express limit 1): `No rate changes directly through LP-075.`

Express limits
- Heading: `Express limits`
- No direct rate change: `No rate changes directly through LP-075.`
- No weakening, no favorable behavioral input: `No weakening of Schedule A or Schedule B, no favorable behavioral input`
- 'no cross-credit between Main, ADT, or Lower streams': `no cross-credit among the Main, ADT, and Lower streams`
- No revival of the failed petition: `No revival of the failed RATIFY-TAX-50 petition or its authored figures.`
- Shelter and exception bars: `No upper-layer speculative shelter, property-attribution exception, currency-conversion exception, or SCM change.`

Ratification record
- Heading and columns: `Ratification record Gate Result Recorded reasoning`
- Meritboard 73% met: `Meritboard 73% — met`
- Meritboard, integrity without weakening 'a success condition': `Mandatory measurement protects process integrity without weakening any success condition.`
- Meritboard, 'the institutional cadence cost produced the narrow margin': `The institutional cost of a mandatory cadence produced the narrow margin.`
- Supreme Court 7 / 10 met: `Supreme Court 7 / 10 — met`
- Court, no prejudgment: `Compelling an audit does not prejudge its fact-finding`
- Court, permissive method changed: `the amendment changes a deliberately permissive method`
- Sanctuary 97% met: `Sanctuary 97% — met`
- Sanctuary, 70% upper rate: `After generations at the 70% upper rate`
- Sanctuary, 'a 94% LP-074 vote': `a 94% vote for LP-074`
- Sanctuary, non-commencement rejected: `residents rejected non-commencement as a substitute for a factual determination`
- Main Layer 84% met: `Main Layer 84% — met`
- Main Layer reasoning: `Both enterprise capacity and legislative integrity supported an audit that still protects Main-treasury obligations.`
- Lower-Layer Aggregate 72% met: `Lower-Layer Aggregate 72% — met`
- Lower reasoning ('Lower observers'): `Lower-layer observers supported obtaining an answer while retaining Schedule B's separate incidence protections`
- Presidency, veto not exercised: `Presidency Veto not exercised`
- Presidency, 'preserves the division between process compulsion and factual certification': `The Act keeps process compulsion separate from factual certification.`

Historical construction
- Heading: `Historical construction`
- Original 2279 §12.3, no duty: `The original 2279 §12.3 imposed no duty to constitute or lock a Commission`
- 'the first window's silence': `the first window's lack of a run`
- Proved nothing about 50%: `proved neither that 50% was safe nor that it was unsafe`
- Procedural, not evidentiary, finding: `The later amendment records a procedural finding, not an evidentiary one`
- Defeat by omission: `a conditional law can be defeated by omission`
- (same finding, condition): `when no institution is obligated to perform the test`
- Original text visible: `The original text remains visible in the amended Charter.`

### build-path2-pages.mjs

Rulings page chrome (the `pending-ratify-tax-50-rulings.html` build block). Title, description, kicker, hero title, pb-label and crosslink labels are unchanged.
- Page title: `Presidential Rulings — Path 2 Charter • The Five Rings`
- Description, scope and date: `(LP-074 Schedule A methodology), 2279 (Y178)`
- Description, first ruling: `directing the chambers to take the Charter up only in amended form`
- Description, second ruling: `lifts the noticed veto and adopts the Charter with its Residual-Risk Register`
- Description, record membership: `Part of the TAX-50 Ratification Record.`
- Kicker: `Ratification Record · Presidential Rulings`
- Hero title: `Presidential Rulings — Path 2 Charter`
- Hero, two rulings, 2279 (Y178): `The two Rulings of the Presidency on the Path 2 Charter, issued in 2279 (Y178).`
- Hero, 'the adoption-posture review that directed the chambers': `The first, the adoption-posture review, directed the chambers`
- Hero, 'take the Charter up only in amended form': `to take up the Charter only in its amended form`
- Hero, 'the final ruling that lifted the noticed veto': `The second, the final ruling, lifted the veto noticed in the first`
- Hero, 'adopted the Charter with its Register': `adopted the Charter with its Residual-Risk Register`
- Hero, 'Read alongside the instruments they adjudicate.': `Read them alongside the instruments they adjudicate, which are linked below.`
- Banner label: `Historical adoption record — 2279 (Y178)`
- Banner lead: `THE ADJUDICATION OF RECORD.`
- Rulings adopted the Charter and Register: `These 2279 rulings adopted the Path 2 Charter and its Residual-Risk Register.`
- 'they changed no rate': `They changed no rate.`
- LP-075 compelled what the original Charter did not require: `LP-075 later compelled a process that the original Charter did not require.`
- 2294 certification applied the locked methodology and certified both schedules: `The 2294 certification applied the locked methodology and certified both LP-074 schedules.`
- 'supplied the certificates later made effective by notice': `Notice later made its certificates effective.`
- Historical rulings unchanged: `The historical rulings remain unchanged.`
- Crosslink labels: `Path 2 Charter — the instrument`
- `§10.4 Schedule`
- `Residual-Risk Register`
- `RATIFY-TAX-50-II — the conditional statute`
- `LP-074 — the register entry`
- `2294 certification — final record`
- `Ratification Record`

### build-pending-pages.mjs

The `statuteBanner()` literal. Only the label changed.
- Label, enacted: `Enacted ·`
- Label, 'Conditions not satisfied · Schedules inactive' (stale; contradicted the status line and the 2294 record): `Conditions satisfied · Schedules active from 2295`
- Status line: `ENACTED — SCHEDULES ACTIVE FROM 2295.`
- LP-074 registered 5–0, no rate change on passage: `LP-074 registered 5–0 and changed no rate on passage.`
- 2294 audit, Findings I–IV and Schedule A: `The 2294 Path 2 audit passed Findings I–IV, certified Schedule A`
- B1–B6 and Schedule B: `independently passed B1–B6, and certified Schedule B`
- Effective 2295: `Valid notice made the complete 50 / 25 / 12.5 / 6.25 schedule effective in 2295.`
- Conditional statute preserved as filed: `This page preserves the conditional statute exactly as filed.`

## Local fixes applied

Every fix in `docs-review/records-pilot/local-fixes.md`, quoted where it lands. The absent rows confirm that the pilot text each fix replaced is gone.

### path-2-presidential-ruling-source.md
- Block E verbatim quote restored: `Block E, because "un-shown" must mean the world changed, not the ruler.`
- absent: `the measuring ruler changed`
- Part III: `This office has just struck such mechanisms from other parts of the instrument.`
- absent: `from the void rules under Block D`
- Part V, 'was never tainted by that argument' restored: `the data beneath it was never tainted by that argument`
- absent: `the data beneath it is not tainted`
- Part V, defined term kept: `First, non-commencement is not a defect.`
- absent: `a window without a commencement`
- Part I: `the draft fixed formally the moment`
- absent: `fixed in detail`
- Block D: `vetoed more ambitious forms of entrenchment than a procedural void`
- absent: `in larger forms`
- Block C: `a quarantine that stops at the named signatories is ineffective`
- absent: `is a formality`
- Rewrap of pilot lines 49 and 82. check.mjs confirms that no body line in either ruling draft is longer than the live file's longest line: 75 characters for Ruling 1 (the draft's longest is 73) and 72 for Ruling 2. Block E is back on a single line: `Block E, because "un-shown" must mean the world changed, not the ruler.`
- Pilot line 82 rewrapped; its content now spans lines 81–83: `remains the lawful state of this civilization, and no instrument of this`

### path-2-adoption-ruling-source.md
- The 'only' sentence restored: `A rule that voided only votes for activation would have guarded against error`
- (same sentence, close): `in one direction only`
- `now guards against error in both directions`
- absent: `now binds in both directions`
- `engraved where the next drafter can read them`
- absent: `recorded where the next drafter`

### path-2-commencement-duty-act.html
- Lede: `It compels the test and leaves the result to the existing Path 2 rules.`
- absent: `It requires a run`
- Hero: `A narrow procedural successor, enacted after the first Path 2 window`
- (same sentence, close): `window closed lawfully without a run.`
- absent: `A narrow procedural act`
- Meritboard: `The institutional cost of a mandatory cadence produced the narrow margin.`
- absent: `The narrow margin reflected`
- Main Layer: `Both enterprise capacity and legislative integrity supported an audit`
- absent: `Enterprise-capacity and legislative-integrity grounds`
- §6 as live ('fails' kept): `terminates separately when the relevant schedule certifies, fails, is lawfully repealed or superseded`
- absent: `and then, after B1–B6 passed, independently`

## (b) Frozen-string checklist

Every entry is confirmed by check.mjs against the raw draft, byte for byte with whitespace collapsed. The checker also confirms these structural invariants in code:
- the heading lines, `---` rule, bold and italic spans, paragraph sequence and rendered tag skeleton of both rulings;
- that the generator's own `assertVerbatim`, taken from the draft .mjs, passes on both ruling drafts;
- the Act's `<head>`, tag skeleton, id and href sequences, headings, labels and vote figures;
- that each .mjs draft differs from live only on its permitted lines, with the tag sequence on those lines unchanged;
- `node --check` on both .mjs drafts;
- the World-tier regexes on every draft: no seat names, no founder's ruling or override, no superseded refusal phrasing, and no "taxation is charter-level" predication.

### path-2-presidential-ruling-source.md
- Heading line: `# RULING OF THE PRESIDENCY`
- Heading line: `## In re: Adoption Posture of the Path 2 Charter (LP-074 Schedule A Methodology)`
- Heading line: `### 2279 (Y178) · Executive-doctrinal review prior to chamber adoption`
- Rule: `---`
- Bold part tokens: `**I. On the review itself.**`
- `**II. Amendment Blocks A through F: ADOPTED**`
- `**III. On the voting rule.**`
- Bold holding: `**majority of three, per-finding, all votes and dissents published over signature.**`
- `**IV. On the Registrar.**`
- `**V. On the contested findings.**`
- `**VI. Adoption posture.**`
- `**VII. A closing observation, for the record.**`
- Signature: `**THE PRESIDENCY OF VMSS**`
- Signature date: `*2279 (Y178)*`
- Numbering: `Part IV`, `Block A,`, `Block B,`, `Block C,`, `Block D,`, `Block E,`, `Block F,`
- Verbatim quotation of the Charter's sentence: `"un-shown" must mean the world changed, not the ruler.`
- Quoted rule: `"decide honestly, in advance, by whatever standard you choose"`
- Phrase cited by deregistered-statutes.html: `rates fall when shown, and hold when merely told`
- Charter term: `burden of motion on the status quo`
- Defined terms: `non-commencement`, `doctrine against federal sediment`, `authority ONLY`, `preregisters`, `with a fence`
- Operative modals: `no body may audit its own lock`, `may be construed`
- Figures: `forty findings`, `six proposed amendment blocks`, `four findings`, `seventy, thirty-five, seventeen, eight`
- Close: `So ruled.`

### path-2-adoption-ruling-source.md
- Heading line: `# RULING OF THE PRESIDENCY`
- Heading line: `## In re: Adoption of the Path 2 Charter and its Residual-Risk Register`
- Heading line: `### 2279 (Y178) · Final executive-doctrinal review`
- Bold part tokens: `**I.**`, `**II.**`, `**III.**`, `**IV.**`, `**V.**`
- Signature: `**THE PRESIDENCY OF VMSS**`
- Signature date: `*2279 (Y178)*`
- Section and register numbering: `§1.6`, `RR-6`, `RR-7`, `RR-8`
- Figures and dates: `twelve findings`, `sixty-two hostile findings`, `fifty-nine`, `eight residues`, `closes 2288`, `Sixty-six years ago`, `seventy, thirty-five, seventeen, eight`
- Holding: `ADOPTED.`
- Defined terms: `justiciable`, `Residual-Risk Register`, `decennial window`, `commissioned cold`, `engraved`
- Close: `So ruled. So adopted.`

### path-2-commencement-duty-act.html
- Ids: `id="main-content"`, `id="navbar-placeholder"`, `id="question"`, `id="operative-provisions"`, `id="limits"`, `id="ratification"`, `id="historical-construction"`, `id="footer-placeholder"`
- Hrefs: `href="#main-content"`, `href="law-polling.html#lp-075"`, `href="path-2-charter.html#s-12-3"`, `href="law-polling.html#lp-074"`, `href="path-2-certification-2294.html"`
- Title: `<title>LP-075 — Path 2 Commencement Duty Act • The Five Rings</title>`
- Banner: `aria-label="LP-075 status"`, `<strong>ENACTED · 2291 (Y190).</strong>`, `§12.3 under §13.1 and Article XXV.VI`, `A1–A8`
- Vote figures: `<strong>73%</strong> — met`, `<strong>7 / 10</strong> — met`, `<strong>97%</strong> — met`, `<strong>84%</strong> — met`, `<strong>72%</strong> — met`, `<strong>Veto not exercised</strong>`
- Figures and dates: `$10 million`, `180 days`, `2279–2288`, `2289–2298`, `lock in 2292`, `§12.4(b)`, `LP-074 §6`, `Findings I&ndash;IV`, `B1&ndash;B6`, `50 / 25 / 12.5 / 6.25`, `2295`, `70% upper rate`, `94%`, `50% was safe`, `original 2279 §12.3`
- §6 row, byte-identical to live: `<tr><td>§6 — Separate termination</td><td>The duty terminates separately when the relevant schedule certifies, fails, is lawfully repealed or superseded, or another law expressly resolves it. The 2294 record certified Schedule A and then independently certified Schedule B after B1–B6 passed.</td></tr>`
- Operative modals: `No chamber may command`, `may not become an undeclared permanent veto`, `cannot recreate the inaction veto`, `can be defeated by omission`
- absent: `founder's ruling`, `lawful nonactivation`

### build-path2-pages.mjs
- linkFirst phrase, Charter: `linkFirst(body, 'a schedule adopted by the chambers', SCHEDULE + '#part-a');`
- linkFirst phrase, Schedule: `linkFirst(body, 'This Schedule is part of the Charter', CHARTER + '#s-10-4');`
- Source reads: `const mdRuling1 = read('documents/path-2-presidential-ruling-source.md');`, `const mdRuling2 = read('documents/path-2-adoption-ruling-source.md');`
- Verbatim assertions: `const c1 = assertVerbatim(mdRuling1, b1, 'ruling 1');`, `const c2 = assertVerbatim(mdRuling2, b2, 'ruling 2');`
- Ruling wrapper ids: `id="ruling-adoption-posture"`, `id="ruling-adoption"`
- Rulings page: `const RULINGS = 'pending-ratify-tax-50-rulings.html';`, `title: 'Presidential Rulings — Path 2 Charter • The Five Rings',`, `heroKicker: 'Ratification Record · Presidential Rulings',`, `heroTitle: 'Presidential Rulings — Path 2 Charter',`
- Rulings banner: `aria-label="Rulings status"`, `<span class="pb-label">Historical adoption record — 2279 (Y178)</span>`, `<strong>THE ADJUDICATION OF RECORD.</strong>`
- Rulings banner links: `<a href="path-2-charter.html">Path 2 Charter</a>`, `<a href="path-2-risk-register.html">Residual-Risk Register</a>`, `<a href="${CERTIFICATION}">2294 certification</a>`
- Rulings crosslinks: `cx('path-2-charter.html', 'is-primary', 'fa-scale-balanced', 'Path 2 Charter — the instrument'),`, `cx('pending-ratification.html', '', 'fa-arrow-left', 'Ratification Record'),`
- Charter-family anchors in other chrome (unchanged): `cx(SCHEDULE + '#part-a', 'is-primary', 'fa-list-ol', '§10.4 Schedule — enumerated measures'),`, `<a href="${CHARTER}#s-10-4">Path 2 Charter</a>`, `<a href="${REGISTER}#rr-9">Register</a>`
- Charter banner, other page (unchanged): `<strong>50 / 25 / 12.5 / 6.25</strong> cascade entered force in 2295`

### build-pending-pages.mjs
- Statute pins (check-canon e3): `<strong>ENACTED — SCHEDULES ACTIVE FROM 2295.</strong>`, `<strong>50 / 25 / 12.5 / 6.25</strong>`, `<a href="law-polling.html#lp-074">LP-074</a>`
- Statute build assertion: `if (cites !== 125)`
- Hub pins and probes (R22/R23): `Process ruling R22 &mdash; The Restatement &amp; Consolidation Doctrine`, `Process ruling R23 &mdash; The Codification Sweep`
- Hub deep link: `id="path-2"`
- Probe find-string (statute page template): `<body class=`
- New label: `<span class="pb-label">Enacted · Conditions satisfied · Schedules active from 2295</span>`
- absent: `ENACTED, CONDITION NOT SATISFIED`
- absent: `Conditions not satisfied`, `Schedules inactive`

### live: path-2-certification-2294.html (not in this unit; untouched)
- Certification positive controls: `SCHEDULES A AND B CERTIFIED`, `exactly 30 keyed annual observations`, `Main-12 106.7%`, `ADT-36 122.4%`, `complete ordered window SHA-256-attested`
- Guard-mutation probe: `<body`

### live: documents/ratify-tax-50-ii-statute-source.html (not in this unit; untouched)
- Statute pin: `RATIFY-TAX-50-II — Conditional Successor Petition`

## (c) Flags

1. **Act §6 is kept as live, and the pilot's flag 1 is closed.** The row is byte-identical to the live page, and 'fails' stays. Per local-fixes, the Act is itself the resolving statute under amended Charter §12.3, so the 'fails' trigger does not conflict with the Charter. The pilot had reordered §6's second sentence ("and then, after B1–B6 passed, independently certified Schedule B"). That change is reverted along with the rest of the row.
2. **Rulings-page crosslink labels, description and pb-label are left unchanged. This was a scope decision.** The task named "crosslink text" as in scope. The seven labels are short link labels, not prose. Four of them are word for word the labels the Charter, Schedule and Register pages use for the same targets: 'Path 2 Charter — the instrument', 'LP-074 — the register entry', '2294 certification — final record' and 'RATIFY-TAX-50-II — the conditional statute'. Rewording them here alone would split that set. The meta description is not in the named literals (heroSub, banner, crosslinks), so it was not touched. It still reads 'lifts the noticed veto', which matches the ruling. The pb-label 'Historical adoption record — 2279 (Y178)' is a label and is also unchanged.
3. **Rulings chrome: reading decisions.**
   - The hero now names the Register in full ('Residual-Risk Register', where it had 'its Register'). It also adds 'issued in' and 'which are linked below' (the crosslinks sit directly below the banner).
   - In the banner, 'supplied the certificates later made effective by notice' became 'Notice later made its certificates effective', where 'its' refers to the 2294 certification.
   - The banner still says 'These 2279 rulings adopted the Path 2 Charter'. Strictly, the first ruling directed the chambers and the second adopted. The original made the same compression, and it was kept.
4. **The statute pb-label now reads 'Enacted · Conditions satisfied · Schedules active from 2295'.** check-canon's statute check reads only `ENACTED — SCHEDULES ACTIVE FROM 2295`, `50 / 25 / 12.5 / 6.25` and the negative pin `ENACTED, CONDITION NOT SATISFIED`. The new label matches none of them. The CSS uppercases the label on screen, and the check reads the source, so there is no collision. The label now carries a third '2295', and the checker notes this as the only token-count change in that file. The generated `pending-ratify-tax-50-ii-statute.html` (line 151) still carries the stale label until `npm run build:pending` runs.
5. **'fixed formally the moment'.** This is the word order local-fixes specifies. 'formally fixed the moment' would be the more natural order, and it was not substituted.
6. **Hedge drift, from the check.mjs notes.** The operative modals shall, may, must, can and cannot keep the same count in every draft, and the checker fails on any change. Four non-operative counts moved:
   - Ruling 2 'only' 3 → 4, because the restored sentence carries two 'only's where the original 'half a law' sentence carried one.
   - Ruling 2 'would' 3 → 2. 'would have been half a law' and 'would have met it' became 'would have guarded' and 'was reserved for'.
   - Ruling 2 'should' 0 → 1, from 'is supposed to be' → 'should be'.
   - Ruling 1 'would' 4 → 7. Part III's rejected unanimity rule is stated conditionally ('would add', 'would work'), 'would meet the veto' is now explicit, and VII has 'would itself have been'.
   None of these touches a holding.
7. **The Act's Completed-effect cut is carried from the approved pilot.** 'LP-075 compelled the work; it did not set or activate any rate.' stays cut. The banner ('LP-075 did neither') and Express limit 1 carry the fact, and section (a) quotes both. As a result, LP-075 appears on the page 7 times instead of 8. The rate-history pin `/LP-075 compelled the (?:audit|remedial process)/i` is scoped to rate-history.html, not this page.
8. **"7 / 10" is kept spaced.** The page and the LP-075 register entry both use the spaced form. Only the annex JSON uses "7/10", and it is not in this unit (pilot flag 2).
9. **A paraphrase outside this unit.** `docs-review/RATIFY-TAX-50-session-record.md:223` says 'fifty-nine died in text', which echoes the adoption ruling's old wording. It is a Process-tier summary, not a quotation, so this unit does not force a change. Its own unit can decide.
10. **Superseded holding kept as history.** LP-075 prospectively reversed Ruling 1 Part V's no-duty holding. The holding stays as 2279 text, and nothing was added to it (pilot flag 10).
11. **Splice.**
    - Copy the two ruling drafts over `documents/path-2-{presidential,adoption}-ruling-source.md`, the Act draft over `path-2-commencement-duty-act.html`, and the two .mjs drafts over `tools/`.
    - Then run `npm run build:path2-pages` and `npm run build:pending`. check.mjs has already run the draft generator's `renderDoc` and `assertVerbatim` on both ruling drafts, and both pass.
    - Nothing in this unit feeds the certification generator or the hashed annexes, so no digest moves.
