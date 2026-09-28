# Records 25.6.2, unit petopp: reconstruction ledger

Drafts only. No live source was edited. The two drafts in this folder are:

- `RATIFY-TAX-50-petition-v4.1.md`: the reconstructed ballot petition. It replaces `docs-review/RATIFY-TAX-50-petition-v4.1.md`, which renders as `pending-ratify-tax-50-ballot.html`.
- `RATIFY-TAX-50-opposition-brief.md`: the reconstructed opposition brief. It replaces `docs-review/RATIFY-TAX-50-opposition-brief.md`, which renders as `pending-ratify-tax-50-opposition.html`.

Checker: `node docs-review/records-25.6.2/petopp/check.mjs`. It reads the drafts, the live sources, the live `tools/build-pending-pages.mjs` and the committed pages, and writes nothing. Besides the ledger, it runs the live generator in memory twice (live sources, then the drafts swapped in), compares the two builds, resolves every statute-source link into the two pages, and runs a site-wide Tailwind parity build with the draft-built pages in place of the committed ones.

Matching conventions:
- Section (a) quotes are matched against the draft's visible text: the generator's own `sourceText()` (Markdown markers, `> ` prefixes and list markers stripped, table cells joined by spaces), with whitespace collapsed.
- Section (b) strings are matched against the raw draft with `> ` prefixes stripped and whitespace collapsed, or against the draft-built page for `built:` headings. A (b) string that is not marked absent must also occur in the original. Rows marked `absent:` must not occur in the draft. Rows marked `na:` must occur in neither the original nor the draft; they record guard strings that target other pages.
- Where the original carried a fact in a metaphor, a reversal or an aphorism that the reconstruction dropped, the row gives the original wording in single quotes and then quotes the draft text that carries its content.

## Word counts

Words in the whole `sourceText()` (headings and table cells included).

| Document | Live | Draft | Change |
|---|---|---|---|
| RATIFY-TAX-50-petition-v4.1.md | 1422 | 1555 | +9.4% |
| RATIFY-TAX-50-opposition-brief.md | 742 | 759 | +2.3% |

Register tells, counted by check.mjs as live → draft (prose only; headings and bold labels excluded):
- Reversal-shaped constructions ("is not A; it is B", "not A, but B", "A, not B.", "rather than"): petition 3 → 0, opposition 5 → 2. Both left are in the reviewer's finding blockquotes, which are restored verbatim under R9 (Finding 1 "composition, not absolute revenue …", Finding 6 "$3T rather than below $1T").
- Prose em-dashes: petition 10 → 0, opposition 3 → 1. The one left sits inside the verbatim Finding 9 blockquote ("[seat note: cured in v4.1 — expedited vote …]"). The em-dashes in headings and bold labels are frozen.
- Semicolons: petition 30 → 8, opposition 10 → 9. The petition's are in the §5 provenance key, in table cells and in parenthetical figure lists ("all savings; B*≈20F at saturation"). All nine of the opposition's are in the verbatim finding blockquotes.

## (a) Fact ledger

### RATIFY-TAX-50-petition-v4.1.md

Title, banner and status
- Title (heading, unchanged): `RATIFY-TAX-50 — Petition v4.1 (DRAFT — NOT RATIFIED)`
- Archive status: `ARCHIVE / NON-OPERATIVE.`
- Ballot of record: `This failed petition is the ballot of record,`
- 'preserved verbatim' replaced by a restatement notice, since the body is lifted (option (b); Jason rules, see flag 2): `restated in plain wording.`
- Restatement scope (new in the draft, no counterpart in the original): `Its figures, numbering and the meaning of every provision are unchanged.`
- Superseded by RATIFY-TAX-50-II: `RATIFY-TAX-50-II superseded it.`
- Status docs-review only: `Status: docs-review only.`
- Runs as a real federal LP vote ('REAL' caps lowered): `The petition runs as a real federal LP vote`
- Allowed to fail: `and is allowed to fail.`
- Failed outcome is a boundary marker, LP-062/LP-065: `A failed outcome is a boundary marker under LP-062/LP-065 doctrine.`
- Supersedes v3; Sol pass four verdict NOT-RATIFIABLE: `This version supersedes v3, which Sol pass four found NOT-RATIFIABLE.`
- All pass-four findings repaired, contested or founder-resolved: `Every pass-four finding is repaired, contested or founder-resolved below.`
- Governing rulings R1–R8 in the session record: `Governing rulings: R1–R8 in docs-review/RATIFY-TAX-50-session-record.md.`

§1 Proposal
- Heading: `1. Proposal`
- Current engraved §12.1 schedule 70 / 35 / 17 / 8: `Reduce the engraved §12.1 top marginal schedule from 70 / 35 / 17 / 8 to`
- Proposed 50 / 25 / 12.5 / 6.25, layer order: `50 / 25 / 12.5 / 6.25 (Sanctuary+Main / -1 / -2 / -3)`
- $10M threshold unchanged: `The $10M threshold is unchanged.`
- SCM parameters unchanged: `All SCM parameters are unchanged.`
- Sub-threshold brackets layer-administered, 'untouched': `The sub-threshold bracket structure remains layer-administered and is not changed.`
- Exact geometric halving: `The proposed schedule has an exact geometric halving structure.`
- Current schedule approximately geometric: `The current engraved schedule (70/35/17/8) is approximately geometric`
- 'not exactly so': `but not exact`
- 'the exact cascade is a property of this proposal, not of the engraving': `the exact cascade is a property of this proposal alone`
- Correction source: `(corrected per pass-four Finding 7)`
- §12.1 recalibrates via XXV.VI: `§12.1 recalibrates via XXV.VI`
- Charter III.III restates (object supplied: the new schedule), RULING-TIER convention: `Charter III.III restates the new schedule (RULING-TIER convention).`

§2 The case
- Heading: `2. The case (values-led)`
- Label: `Legibility and recruitment (design principle 11).`
- Slogan (quoted string, kept verbatim; the opposition's Ungrounded instincts also calls it a slogan): `The slogan "Keep half your marginal dollar" serves recruitment`
- 'border-queue currency': `serves recruitment in the border queue.`
- 'round, honest, memorable, true' ('honest' dropped as a duplicate of 'true'): `It is round, memorable and true at every dollar above the`
- Scope of the slogan: `true at every dollar above the threshold in Sanctuary and Main.`
- Label (quoted by opposition Finding 6): `The tax retains its engraved function at the proposed rates — at the schema's authored values.`
- At §5's values: `At §5's values, the proposed schedule funds`
- 12.5% margin over enumerated Main obligations: `the enumerated Main obligations from tax revenue with a 12.5% margin (§6).`
- Both decisive inputs [A], reopenable: `Both decisive inputs are [A] and reopenable.`
- Audit workstream, ruling R2, supersedes: `The standing preregistered audit workstream (ruling R2) supersedes them as its estimates land`
- §7(e) binds reviews to audit values: `§7(e) binds future reviews to the audit values.`
- No permanent ADT support: `The schedule requires no permanent ADT support.`
- Backfill authority 'untouched': `The cyclical-only backfill authority is unchanged`
- Drawdown ledger 'retains full diagnostic meaning': `its drawdown ledger keeps its full diagnostic meaning.`
- Label: `Instrument clarity (recast per pass-four Finding 9).`
- Primary federal dial: `The tax rate is the primary federal dial on elite retention flow.`
- Not the sole determinant: `It is not the sole determinant of the elite equilibrium.`
- Co-determinants ('co-determine'): `The SCM pulse, its duty cycle and`
- Article XXVII's continuous escalated rate: `Article XXVII's continuous escalated rate jointly set equilibrium height.`
- -2/-3 whale savings outside SCM attribution: `In -2/-3, private whale savings sit wholly outside SCM attribution`
- 'bounded by no stock instrument': `no stock instrument bounds them.`
- Moves the retention dial only: `This petition moves the retention dial only.`
- 'openly, and discloses … as a bound in §3': `It does so openly and states the equilibrium consequence as a bound in §3.`

§3 Disclosed costs
- Heading: `3. Disclosed costs (undiluted)`
- Item 1 label and scope: `Top-bracket marginal retention rises 1.67× in Sanctuary and Main`
- Formula: `((1−0.50)/(1−0.70))`
- Layer ratios: `The layer-specific retention ratios are -1 1.15×, -2 1.05× and -3 1.02×`
- Correction source: `(corrected per pass-four Finding 10)`
- 'stated as a bound, not a point estimate': `The equilibrium consequence is stated as a bound and carries no point estimate`
- Correction sources: `(per pass-four Finding 8, refined per pass-five Finding 4)`
- 'at MOST 1.67×' (caps lowered): `Equilibrium balances scale by at most 1.67×.`
- 'with equality in saturated districts': `They reach that bound in saturated districts`
- Saturated district scales linearly, S←0.9S+F, B*=10F: `a district already triggering every month scales linearly (S←0.9S+F yields B*=10F).`
- Below saturation: `Below saturation, induced increases in trigger frequency pull realized equilibrium under the bound.`
- Sanctuary and Main bound terms: `The bound covers Sanctuary and Main (engraved 10% pulse, $100B/district, all savings).`
- -1 bound 1.15×, 5% pulse, $50B/district: `The corresponding -1 bound is 1.15× (engraved 5% pulse, $50B/district,`
- -1 all savings, B*≈20F: `all savings; B*≈20F at saturation).`
- 'duty-cycle-endogenous and unmodeled': `The exact value depends on the duty cycle and is not modeled.`
- Item 2 label: `Incidence shifts onto triggered-district savers in Sanctuary, Main, and -1.`
- Mechanism: `Higher whale retention raises district aggregates at the margin, which raises trigger frequency.`
- Uniform pulse: `The pulse is uniform and does not distinguish whale savings from modest savings.`
- Where it applies: `applies wherever the engraved pulse reads all savings (Sanctuary, Main, -1).`
- -2/-3 SCM reach: `In -2/-3 the SCM reaches only UBI/PJS-attributed savings`
- Private whale gains there: `so private whale gains there do not move the trigger.`
- Item 3 label and base: `Main-treasury revenue declines from ~$12.6T to ~$9T annually at the authored base.`
- Consumed share: `The consumed share of retained dollars leaves the taxpayer's SCM exposure.`
- Saved share to ADT: `The saved share, when garnished, routes to the ADT as dividend`
- 'not to the treasury': `and does not reach the treasury.`
- Treasury recovery only on above-threshold whale income: `The treasury recovers revenue only on the share of downstream flows`
- …: `that becomes above-threshold whale income.`
- 'partial and indirect, never full': `That recovery is partial and indirect, and it is never full.`
- Item 4 label: `Hysteresis.`
- Re-raise recovers nothing: `A later re-raise recovers nothing retained during the low-rate interval.`
- 'Cheap to enact, expensive to regret.' (restates the sentence before it; dropped, no fact lost): `A later re-raise recovers nothing retained during the low-rate interval.`

§4 Velocity
- Heading: `4. Velocity — measurement mandate`
- No velocity benefit asserted or priced in: `The petition asserts no velocity benefit and prices none in.`
- Condition of enactment, clearing directorate publishes: `As a condition of enactment, the central-bank clearing directorate publishes`
- Quarterly, 36 months: `circulation velocity quarterly for 36 months.`
- Fixed all-district panel, stratified: `It reports a fixed all-district panel, stratified by trigger status,`
- Preregistered baseline: `against a preregistered pre-enactment baseline.`
- Fixed panel per pass-five Finding 11: `The panel is fixed per pass-five Finding 11:`
- Treatment-endogenous: `trigger status is treatment-endogenous, so a sample of triggered districts only`
- Composition change: `would change composition with the policy.`
- Output feeds the audit and future rate LPs: `The output feeds the standing audit workstream and any future rate LP.`
- Parenthetical label: `Directorate authority and data definitions:`
- Directorate already observes every settlement: `by engraved design, the clearing directorate already observes every settlement.`
- 'adds publication, not surveillance': `The mandate adds publication and no new surveillance.`

§5 Fiscal facts schema
- Heading: `5. Fiscal facts schema`
- Provenance key: `Provenance: [E] engraved; [A] authored, founder-ratified, reopenable;`
- Provenance key, [R]: `[R] founder ruling of record this session.`
- Item 1a: `1a Main base above threshold $15T/yr [A]`
- Item 1b value: `$3T/yr. Sanctuary's legal inclusion in the pool follows from §12.1's shared rate [E].`
- Item 1b, 'independently attackable': `The dollar magnitude is authored and open to independent attack.`
- Item 1b failure point: `At a Sanctuary base below $1T (holding Main at $15T), §6's full-funding claim fails.`
- Items 2–4: `2–4 -1 / -2 / -3 bases $0.9T / $0.2T / $0.1T`
- Items 2–4 note: `(informational; zero counted toward Main revenue, see item 15)`
- Item 5: `5 Main obligations total $8T/yr [A]`
- Item 6: `enforcement 34% / courts 22% / boundary infrastructure 18%`
- Item 7: `7 Obligations growth 2%/yr real [A]`
- Item 8 figure: `~$744T/yr (exact: $743.925T; displayed figures rounded).`
- Item 8 structural multiple (quoted by Finding 1): `It is authored as a structural multiple: 1.3× total dividend obligations.`
- Item 8 justification: `justified by the engraved abundance posture (90%+ automated production;`
- Item 8, 'NOT derived' (quoted by Finding 1): `elastic ADT output funding expansion on demand) and is NOT derived from the gate line.`
- Item 8 recycle: `SCM garnish recycle (~$12T/yr [A]) is partitioned separately and never enters gate computations.`
- Item 8 provenance: `[A/R7]`
- Item 9: `$442.5T/yr (engraved rates × engraved populations, all five layers) [E]`
- Item 10 total: `$129.75T/yr, per-layer participation [A]:`
- Item 10 upper layers: `Sanctuary 20% ($7.2T) / Main 30% ($108T) / -1 35% ($12.6T)`
- Item 10 lower layers: `-2 20% ($1.8T) / -3 10% ($0.15T).`
- Item 10 'engraved looser': `Lower-layer qualifying definitions are engraved as looser.`
- Item 10 offsets: `The participation values reflect institutional-withdrawal offsets and are authored.`
- Item 11: `11 Total dividend obligations $572.25T/yr (items 9+10) derived`
- Item 12: `~$171.7T/yr (exact: $171.675T; item 8 − item 11, recycle excluded) derived`
- Item 13: `22% of district-months triggered; 8% avg overage`
- Item 14 formula: `Coverage = automation-side revenue / total dividend obligations,`
- Item 14 limbs: `≥120% over the trailing 36 months, with no month below 100%.`
- Item 14 R6 and v21.9.2: `The denominator is defined by founder ruling R6, which completes the v21.9.2 knob.`
- Item 14 'ANY … no exemptions' (caps lowered): `The gate applies to any top-marginal rate reduction, with no exemptions.`
- Item 14 v3 exemption withdrawn: `The v3 no-load-transfer exemption is conceded and withdrawn.`
- Item 14 provenance: `[E/R6]`
- Item 15 status: `RESOLVED (pass-four Finding 11).`
- Item 15 rule: `Upward conversion is prohibited without exception, so lower-layer collections cannot reach the Main treasury`
- Item 15 count: `and §6 counts zero.`
- Item 15 docket: `Where those collections terminate in-layer remains on the charter-restatement audit docket.`

§6 Fiscal computation and the gate
- Heading: `6. Fiscal computation and the gate`
- Treasury arithmetic: `Treasury: 50% × $18T = $9.0T/yr against $8T obligations.`
- 112.5%, zero lower-layer revenue: `Coverage from tax alone is 112.5%, with zero lower-layer revenue counted.`
- 'No structural ADT draw exists': `There is no structural ADT draw.`
- Backfill cyclical-only: `Backfill remains cyclical-only, as engraved.`
- Gate arithmetic: `Gate (R6 definition): $743.925T automation-side / $572.25T dividend obligations = 130.0% aggregate`
- Exactness: `(exact by the multiple's construction)`
- Monthly series authored: `Monthly limb: the trailing 36-month series is an authored in-world fact [A].`
- Range and minimum: `Monthly coverage over the window ranged 121%–138%, with a minimum month of 121%.`
- ±7% variance: `The range reflects seasonal automation-output variance of ±7% around trend.`
- −6.9% excursion: `A 121% floor is a −6.9% relative excursion and lies within the band`
- Correction source, Q2: `(corrected per pass-five Finding 3, matching the pre-registered Q2 ground truth)`
- No month below 100%: `No month falls below 100%.`
- Both limbs satisfied: `The 120% aggregate limb and the 100% monthly limb are both satisfied.`
- Session principle: `Per session principle, Sol may demand that authored facts exist.`
- 'attackable as [A]': `The series now exists and is open to attack as [A].`
- Sensitivity label: `Sensitivity (break-evens):`
- Tax base break-even: `Full funding breaks if the tax base falls below $16T (−11.1%)`
- Obligations break-even: `or obligations rise above $9T (+12.5%).`
- Automation revenue break-even: `The gate's 120% limb breaks if automation-side revenue falls below $686.7T (−7.7%)`
- Dividend break-even: `or dividend obligations rise above $620T (+8.3%).`
- Erosion path: `At 2%/yr obligations growth with real-flat revenue, treasury coverage reaches 100% in ~6 years.`
- Detected and escalated by §7 (source parenthetical kept): `That decline is detected and escalated (not "handled") by §7.`

§7 Recalibration cadence rider
- Heading: `7. Recalibration cadence rider [A — ratified with the schedule]`
- (a) trigger: `(a) A Meritboard fiscal review is mandatory whenever trailing-12-month tax coverage`
- (a) 105%: `of enumerated obligations falls below 105%,`
- (a) five-year review: `and in any case every 5 years from enactment.`
- (b) label: `(b) Deadlines (per pass-four Finding 6):`
- (b) review in 6 months: `the review completes within 6 months of the trigger.`
- (b) projection: `If the review projects sub-100% coverage within 36 months,`
- (b) introduction in 12 months: `a corrective rate LP must be introduced within 12 months of the review's completion.`
- (b) expedited scheduling: `The corrective LP receives expedited scheduling`
- (b) vote in 6 months: `its gauntlet vote must occur within 6 months of introduction (per pass-five Finding 9).`
- (c) 'bind the introduction deadline, not the outcome': `(c) Review outputs bind the introduction deadline. They do not bind the outcome.`
- (c) standard process, RULING-TIER: `Any rate change runs the standard federal LP process (rates are federal-tier per RULING-TIER).`
- (c) warning-and-escalation: `The rider is a warning-and-escalation mechanism.`
- (c) 'teeth on process, not a solvency guarantee — stated plainly': `It enforces process and does not guarantee solvency.`
- (d) v21.9.1 rider governs backfill: `(d) Cyclical backfill draws in the interim are governed exclusively by the v21.9.1 rider`
- (d) per-drawdown publication: `and are published per drawdown.`
- (e) audit estimates: `(e) Reviews must consume the standing audit's most recent preregistered estimates,`
- (e) supersession: `which supersede this petition's [A] values.`

§8 Sequence
- Heading: `8. Sequence`
- Pass five, fresh seat: `This v4 goes to Sol cold pass five (fresh seat, prompt + attachment only),`
- Gauntlet as a real vote: `then to the gauntlet as a real federal LP vote.`
- Expected to FAIL: `On current synthetic margins the vote is expected to FAIL.`
- Run anyway per R8: `It runs anyway per ruling R8:`
- R8 wording (session record R8, kept verbatim): `a real NO at the 50% threshold fences the rate question as a boundary marker.`
- Prior margins: `Prior synthetic margins bind nothing.`

### RATIFY-TAX-50-opposition-brief.md

Title, banner and status
- Title (heading, unchanged): `RATIFY-TAX-50 — Opposition Brief (publishes alongside the ballot)`
- Archive status: `ARCHIVE / NON-OPERATIVE.`
- 'the failed RATIFY-TAX-50 record': `This is the record of the failed RATIFY-TAX-50 petition.`
- 'preserved below rather than current authority': `It is preserved below and is not current authority.`
- Figures never activated law: `Its authored figures never activated law.`
- Error notice: `Superseded implementation error — not VMSS canon.`
- 'said' → 'stated': `A discarded repository implementation stated that the later LP-074 execution failed.`
- Both schedules certified: `Canon records that both schedules certified`
- 'taking effect in 2295': `and that 50 / 25 / 12.5 / 6.25 took effect in 2295.`
- 'This original opposition remains historical only': `This original opposition brief is historical only.`
- Status: `Status: in-world document.`
- R9 routing: `Under ruling R9, adversarial-review findings with no drafting cure attach VERBATIM`
- Destination: `to the gauntlet ballot as the opposition brief.`
- Source pass: `Source: Sol cold pass five (fresh seat, prompt + petition v4 only).`
- Not softened: `The drafting seat has not softened, answered or annotated these findings`
- Exceptions: `beyond this header and the provenance notes marked [seat note].`
- Voters weigh §2–§3: `Voters weigh the petition's disclosed case (§2–§3) against this brief.`
- 'the gauntlet is the terminal adjudicator': `The gauntlet is the final adjudicator.`

The six finding blockquotes and the Ungrounded-instincts list are the reviewer's own words. Under R9 they are restored byte for byte to the live source (check.mjs compares all 46 quoted lines), so their rows below quote the reviewer's text unchanged. Only the banner, the Status header, the three [seat note] paragraphs and the margins line are reconstructed.

Finding 1
- Heading: `Finding 1 — Gate compliance is circular (kill / mechanics)`
- "NOT derived" leaves the dependence (verbatim): `Calling it "NOT derived" does not break the algebraic dependence.`
- Denominator D: `The gate denominator is total dividend obligations, D;`
- Numerator 1.3D: `the petition defines the numerator as 1.3D.`
- Identically 130%: `Coverage is therefore identically 130%.`
- Numerator follows D: `If D changes and revenue remains a "structural multiple," the numerator follows it`
- Gate cannot fail: `and the gate cannot fail.`
- Empirical-estimate branch: `If $744T is instead a fixed empirical estimate,`
- No derivation: `the petition supplies no independent derivation for it.`
- Alternative readings: `Alternative abundance readings produce no engraved 130% result:`
- Demand-matching: `demand-matching elasticity gives R = D = $572.25T, coverage 100%,`
- Fails 120% limb: `failing the 120% limb;`
- 90% reading: `"90% abundance" applied to dividend demand gives coverage 90%;`
- Production-share reading: `a literal production-share interpretation leaves both total production Q`
- …: `and the ADT capture fraction c unengraved.`
- Composition only: `Abundance establishes composition, not absolute revenue or a 20% reserve margin.`
- Multiplier: `The 1.3 multiplier launders the desired gate result.`
- Seat note, §5 item 8: `[seat note] The petition's answer is before the voter at §5 item 8.`
- Ruling R7: `The multiple is a founder-authored worldbuilding fact (ruling R7).`
- 'reopenable, and flagged rather than hidden': `It is reopenable and openly flagged.`
- 'precisely the question this brief puts to the vote': `Whether an authored world can ever satisfy its own gate`
- …: `is the question this brief puts to the vote.`

Finding 2
- Heading: `Finding 2 — The historical gate limb is stipulated, not demonstrated`
- Severity line: `(major / values) A range`
- 36-point series: `A range and minimum are not a 36-point series.`
- Missing components: `No monthly numerators, denominators, weights, or dates are supplied,`
- Not reproducible: `so neither the trailing aggregate nor the monthly limb is independently reproducible.`
- Condition precedent: `A historical condition precedent cannot retain meaning`
- Authored history: `if a petitioner may author precisely the history needed to satisfy it.`

Finding 5
- Heading: `Finding 5 — Lower-layer defunding is unassessed (major / mechanics)`
- Main exclusion resolved, incidence not: `Main exclusion is resolved; lower-layer fiscal incidence is not.`
- Cuts now: `Yet the proposal cuts those rates now.`
- Basis: `At the petition's own bases, annual siloed collections fall by approximately:`
- Figures: `−1: $90B; −2: $9B; −3: $1.75B; total: $100.75B.`
- Unknowns: `Because the destination and supported obligations remain unknown,`
- Cannot assess: `the petition cannot assess what those cuts defund.`
- Policy consequence: `Zero Main revenue is not zero policy consequence.`
- Seat note, docket: `The termination point of lower-layer collections is on the charter-restatement audit docket.`
- Strongest argument for Lower NO: `This finding is the strongest argument for the Lower bodies' NO vote`
- Undiluted: `and is presented to them undiluted.`

Finding 6
- Heading: `Finding 6 — Authored magnitude beside engraved conclusion`
- Severity line: `(major / values) Legal inclusion`
- Legal inclusion: `Legal inclusion answers only whether Sanctuary revenue belongs in the pool;`
- $3T vs below $1T: `it supplies no evidence that the base is $3T rather than below $1T.`
- Dependency admitted: `The drafting now admits the dependency cleanly,`
- §2 authored scenario: `but §2 still presents an entirely authored fiscal scenario as proof`
- Quoted petition label: `that the tax "retains its engraved function."`

Finding 7
- Heading: `Finding 7 — Future audits cannot validate a present gate condition`
- Severity line: `(major / values) A future audit`
- Future correction: `A future audit may inform a future correction,`
- No retroactive validation: `it cannot retroactively establish that a rate reduction satisfied its ratified gate`
- …: `when enacted.`
- Hysteresis: `The petition's own hysteresis finding makes "cut now, validate later" especially unsafe.`

Finding 9, residual
- Heading: `Finding 9, residual — No outcome guarantee in the cadence rider`
- Severity line: `(major / mechanics) There is`
- No deadline to vote: `There is no deadline to vote`
- Seat note (kept verbatim): `[seat note: cured in v4.1 — expedited vote within 6 months of introduction]`
- No required passage, no restoration: `no requirement to pass a correction, and no automatic rate restoration.`
- Elision marker kept: `rate restoration. ... The ordinary LP`
- Pending or fail: `The ordinary LP may remain pending or fail,`
- Structural shortfall: `while the resulting trend shortfall is structural`
- Not cured by cyclical authority: `and therefore not cured by cyclical-only ADT authority.`
- Procedure only: `The rider has procedural teeth but no solvency teeth.`
- Seat note, residual: `The residual is the absence of a forced outcome and of automatic restoration.`
- 'outcome-binding territory that RULING-TIER forecloses to a rider': `Both would bind outcomes, and RULING-TIER forecloses outcome-binding terms to a rider.`
- 'disclosed here rather than papered over': `The residual is disclosed here in full.`

Ungrounded instincts
- Heading: `Ungrounded instincts (fenced by the reviewer as uncitable)`
- Slogan: `The recruitment claim is slogan-supported;`
- No elasticity: `no migration or taxable-base elasticity is supplied.`
- Avoidance: `A top-bracket cut may induce avoidance reclassification around the earned-income definition,`
- No behavioral model: `but the petition provides no behavioral model from which to quantify it.`

Closing
- Margins label: `Reviewer's predicted margins at publication (calibration only, ±15):`
- Margins: `Meritboard −26 / Court −18 / Sanctuary −7 / Main −4 / Lower −15.`

## (b) Frozen-string checklist

### RATIFY-TAX-50-petition-v4.1.md

Heading lines (ids sec-1..sec-8 derive from the leading number; all lines kept byte for byte)
- `# RATIFY-TAX-50 — Petition v4.1 (DRAFT — NOT RATIFIED)`
- `## 1. Proposal`
- `## 2. The case (values-led)`
- `## 3. Disclosed costs (undiluted)`
- `## 4. Velocity — measurement mandate`
- `## 5. Fiscal facts schema`
- `## 6. Fiscal computation and the gate`
- `## 7. Recalibration cadence rider [A — ratified with the schedule]`
- `## 8. Sequence`

Bold labels (all 13, unchanged)
- `**ARCHIVE / NON-OPERATIVE.**`
- `**50 / 25 / 12.5 / 6.25**`
- `**Legibility and recruitment (design principle 11).**`
- `**The tax retains its engraved function at the proposed rates — at the schema's authored values.**`
- `**Instrument clarity (recast per pass-four Finding 9).**`
- `**Top-bracket marginal retention rises 1.67×**`
- `**Incidence shifts onto triggered-district savers in Sanctuary, Main, and -1.**`
- `**Main-treasury revenue declines from ~$12.6T to ~$9T annually**`
- `**Hysteresis.**`
- `**Treasury:**`
- `**Gate (R6 definition):**`
- `**130.0%**`
- `**Sensitivity (break-evens):**`

Table structure (header, separator and every row's #, Item and Prov. cells)
- `| # | Item | Value | Prov. |`
- `|---|------|-------|-------|`
- `| 1a | Main base above threshold | $15T/yr | [A] |`
- `| 1b | Sanctuary base above threshold |`
- `| 2–4 | -1 / -2 / -3 bases |`
- `| 5 | Main obligations total | $8T/yr | [A] |`
- `| 6 | Top-3 obligation split |`
- `| 7 | Obligations growth | 2%/yr real | [A] |`
- `| 8 | ADT automation-side revenue |`, `| [A/R7] |`
- `| 9 | UBI outlay |`
- `| 10 | PJS outlay |`
- `| 11 | Total dividend obligations | $572.25T/yr (items 9+10) | derived |`
- `| 12 | ADT structural surplus, automation-side |`
- `| 13 | SCM duty-cycle | 22% of district-months triggered; 8% avg overage | [A] |`
- `| 14 | Gate definition |`, `| [E/R6] |`
- `| 15 | Lower-layer routing | RESOLVED (pass-four Finding 11)`

Ordered list and clause labels cited by the statute, II-petition, briefs and hub (§3 items 1–4, §7(a)–(e))
- `1. **Top-bracket`, `2. **Incidence`, `3. **Main-treasury`, `4. **Hysteresis.**`
- `(a)`, `(b) Deadlines`, `(c) Review outputs`, `(d) Cyclical backfill`, `(e) Reviews must consume`

Strings other documents quote or restate
- Quoted by opposition Finding 1: `NOT derived`, `structural multiple`
- Quoted by opposition Finding 6: `retains its engraved function`
- Slogan named by the opposition's "Ungrounded instincts": `"Keep half your marginal dollar"`
- Ruling R8 wording (session record): `a real NO at the 50% threshold fences the rate question as a boundary marker`
- Hub cites §7(e) for audit supersession: `§7(e) binds future reviews`, `(e) Reviews must consume the standing audit's most recent preregistered estimates`
- canon.json schedule strings: `70 / 35 / 17 / 8`, `50 / 25 / 12.5 / 6.25`

Guard strings that target other pages (confirmed absent from original and draft)
- linkFirst anchors (Charter, Schedule): na: `a schedule adopted by the chambers`, `This Schedule is part of the Charter`
- Certification positive controls: na: `SCHEDULES A AND B CERTIFIED`, `exactly 30 keyed annual observations`, `Main-12 106.7%`, `ADT-36 122.4%`, `complete ordered window SHA-256-attested`
- STATUTORY_CONSTANTS title: na: `Path 2 LP-074 Final Certification — 2294`
- Guard-mutation probes on other pages: na: `RR-12`, `id="s-10-4"`, `class="ls-cite"`, `current rate authority is`, `Drafting designation LP-074 (process record`
- Superseded refusal phrasing: absent: `lawful nonactivation`

### built: pending-ratify-tax-50-ballot.html

Deep-link ids (targets of the statute page's P-citations; ids unchanged)
- `id="sec-1">1. Proposal</h3>`
- `id="sec-2">2. The case (values-led)</h3>`
- `id="sec-3">3. Disclosed costs (undiluted)</h3>`
- `id="sec-4">4. Velocity — measurement mandate</h3>`
- `id="sec-5">5. Fiscal facts schema</h3>`
- `id="sec-6">6. Fiscal computation and the gate</h3>`
- `id="sec-7">7. Recalibration cadence rider [A — ratified with the schedule]</h3>`
- `id="sec-8">8. Sequence</h3>`
- `id="ratify-tax-50-petition-v4-1-draft-not-ratified"`
- Chrome unchanged: `RATIFY-TAX-50 — The Ballot`, `Ratification Record · Ballot Text`, `<body`

### RATIFY-TAX-50-opposition-brief.md

Heading lines (ids finding-N and the slug derive from them; all kept byte for byte)
- `# RATIFY-TAX-50 — Opposition Brief (publishes alongside the ballot)`
- `## Finding 1 — Gate compliance is circular (kill / mechanics)`
- `## Finding 2 — The historical gate limb is stipulated, not demonstrated`
- `## Finding 5 — Lower-layer defunding is unassessed (major / mechanics)`
- `## Finding 6 — Authored magnitude beside engraved conclusion`
- `## Finding 7 — Future audits cannot validate a present gate condition`
- `## Finding 9, residual — No outcome guarantee in the cadence rider`
- `## Ungrounded instincts (fenced by the reviewer as uncitable)`

Severity lines under the wrapped headings
- `demonstrated (major / values)`, `conclusion (major / values)`, `condition (major / values)`, `cadence rider (major / mechanics)`

Bold labels (all 3, unchanged)
- `**ARCHIVE / NON-OPERATIVE.**`
- `**Superseded implementation error — not VMSS canon.**`
- `**50 / 25 / 12.5 / 6.25**`

Quotations of the petition and of the drafting seat
- `"NOT derived"`, `"structural multiple,"`, `"90% abundance"`, `"retains its engraved function."`, `"cut now, validate later"`
- `[seat note: cured in v4.1 — expedited vote within 6 months of introduction]`
- `[seat note] The petition's answer`, `[seat note] The termination point`, `[seat note] The residual`
- `restoration. ... The ordinary LP`

Finding blockquotes and the Ungrounded-instincts list (R9 verbatim; check.mjs also compares all 46 quoted lines byte for byte)
- `The 1.3 multiplier launders the desired gate result.`, `Zero Main revenue is not zero policy consequence.`, `The rider has procedural teeth but no solvency teeth.`, `The recruitment claim is slogan-supported;`

Routing and provenance terms
- `attach VERBATIM to the gauntlet ballot`, `Sol cold pass five`, `(§2–§3)`, `RULING-TIER`
- `Meritboard −26 / Court −18 / Sanctuary −7 / Main −4 / Lower −15.`

Guard strings that target other pages (confirmed absent from original and draft)
- linkFirst anchors: na: `a schedule adopted by the chambers`, `This Schedule is part of the Charter`
- Certification positive controls: na: `SCHEDULES A AND B CERTIFIED`, `exactly 30 keyed annual observations`, `Main-12 106.7%`, `ADT-36 122.4%`, `complete ordered window SHA-256-attested`
- Guard-mutation probes on other pages: na: `RR-12`, `id="s-10-4"`, `class="ls-cite"`
- Superseded refusal phrasing: absent: `lawful nonactivation`, `both refusals`

### built: pending-ratify-tax-50-opposition.html

Deep-link ids (targets of the statute page's O-citations; ids unchanged)
- `id="finding-1">Finding 1 — Gate compliance is circular (kill / mechanics)</h3>`
- `id="finding-2">Finding 2 — The historical gate limb is stipulated, not demonstrated</h3>`
- `id="finding-5">Finding 5 — Lower-layer defunding is unassessed (major / mechanics)</h3>`
- `id="finding-6"`
- `id="finding-7">Finding 7 — Future audits cannot validate a present gate condition</h3>`
- `id="finding-9">Finding 9, residual — No outcome guarantee in the cadence rider</h3>`
- `id="ungrounded-instincts-fenced-by-the-reviewer-as-uncitable">Ungrounded instincts (fenced by the reviewer as uncitable)</h3>`
- `id="ratify-tax-50-opposition-brief-publishes-alongside-the-ballo"`
- Chrome unchanged: `RATIFY-TAX-50 — Opposition Brief</h1>`, `Ratification Record · Opposition Brief`, `<body`

## (c) Flags

1. **The opposition's findings are restored verbatim.** The six finding blockquotes and the Ungrounded-instincts list are the reviewer's (Sol pass five) words. R9, the brief's own header ("attach VERBATIM", "has not softened, answered or annotated these findings") and the session record ("to the opposition brief verbatim; no redraft, as pre-registered") freeze them. The unit brief freezes verbatim quotations of other instruments. Every `> ` line after the first rule is back to the live bytes (live lines 22-36, 47-51, 55-60, 70-74, 79-82, 87-92, 100-104), and check.mjs now fails if any of the 46 lines differs. The reconstruction is limited to the banner, the Status header, the three [seat note] paragraphs and the margins line, so the header's "has not softened" sentence is true again.
2. **Petition banner: the verbatim claim is replaced (option (b)). Jason rules before the splice.** The live banner says the petition is "preserved verbatim as the ballot of record". That is false once the body is lifted. There are two cures:
   - (a) Revert the body to the source bytes and keep the banner. The draft then equals the live file, so the petition leaves this unit and is not spliced. The banner and session-record line 191 stand as written.
   - (b) Keep the lift and rewrite the banner. The draft carries (b), because Jason's depth ruling covers instruments. The banner now reads: "This failed petition is the ballot of record, restated in plain wording. Its figures, numbering and the meaning of every provision are unchanged. RATIFY-TAX-50-II superseded it." It says "the meaning of every provision" rather than "every provision unchanged", because the provisions' wording did change. It says "numbering" to cover §, item and clause addresses together.
   - Under (b), `docs-review/RATIFY-TAX-50-session-record.md` line 191 (R15 execution of record: "the docs-review petition source is immutable and was not edited") must change in the record unit in the same splice. "Was not edited" stays true of v22.4. Only "is immutable" goes stale.
   - Could go either way.
3. **Process tier: seat names and founder wording kept.** Both pages are `pending-*`, which check-canon exempts from the founder and seat guards. "Sol" (petition 3, opposition 1) and "founder" (petition 4, opposition 1) keep their exact counts, because they are provenance facts. The World-tier rule in the unit brief does not reach these pages.
4. **Caps.** Lowered as emphasis only: REAL (status), MOST (§3 item 1), LEGAL (§5 item 1b), ANY (§5 item 14). Kept because they are codes, verdicts or quoted wording: NOT derived (quoted by Finding 1), NOT-RATIFIABLE, FAIL, NO, RESOLVED, VERBATIM (the R9 routing term), RULING-TIER. check.mjs fails on any other caps change.
5. **Wording dropped with no fact attached.** Each is listed in section (a) with the draft text that carries the content.
   - Petition: 'honest' (a duplicate of 'true'); 'border-queue currency'; 'Cheap to enact, expensive to regret.'; 'stated plainly'; 'teeth on process, not a solvency guarantee'. The aphorism in §3 item 4 restated the sentence before it and is now dropped outright. The earlier paraphrase ("The cut is cheap to enact and costly to reverse.") is gone, because it was a thesis closer and it changed "recovers nothing" into "costly to reverse".
   - Opposition (banner, header and seat notes only): 'flagged rather than hidden'; 'rather than papered over'; 'precisely the question'; 'terminal adjudicator'.
   - The advocacy and supplemental briefs paraphrase "procedural but no solvency teeth" and "guarantees process, not passage or solvency". Finding 9's "procedural teeth but no solvency teeth" is back verbatim. The second paraphrase still matches the substance of §7(c).
6. **Cross-document addresses held.** The statute source (84 links, all resolved on the draft build), the II-petition, the advocacy and supplemental briefs and the hub cite §1–§7, §3 items 1–4, §5 items 1–15, §6 "Sensitivity", §7(a)–(e), Findings 1, 2, 5, 6, 7 and 9 residual with their seat notes, and "Ungrounded instincts". Every cited fact stays in the numbered unit it was in, so each citation still points at the text it names.
7. **Shared banner wording.** The opposition's archive banner ("Superseded implementation error — not VMSS canon. A discarded repository implementation said …") is shared word for word with the advocacy and supplemental briefs. This unit reworded its copy: "said" became "stated", "taking effect" became "took effect", and the lead sentence was split. The three bold spans are unchanged. The verifier found this is not a defect, because the advocacy and supplemental banners already differ in substance. Aligning the three is optional.
8. **Reading decisions.**
   - §1: "Charter III.III restates" has no object in the original. The draft supplies "the new schedule", which is what III.III restates under the RULING-TIER convention.
   - §2: "Keep half your marginal dollar" is introduced as "The slogan". The opposition's Ungrounded instincts uses the same word. "Rule" would blur the slogan with operative text.
   - §3 item 1: the dash apposition after "with equality in saturated districts" is read as the reason ("because a district already triggering every month scales linearly").
   - §4: "adds publication, not surveillance" became "adds publication and no new surveillance". "New" follows from the preceding sentence: the directorate already observes every settlement.
   - §7(c): the colon clause is split into sentences. The rule is unchanged: outputs bind the introduction deadline, not the outcome, and any rate change runs the standard process.
   - Finding 9 seat note: "outcome-binding territory that RULING-TIER forecloses to a rider" became "Both would bind outcomes, and RULING-TIER forecloses outcome-binding terms to a rider".
9. **Hedge drift, from the check.mjs notes. No modal moved.** The opposition's 'would' went 0 → 1, in the Finding 9 seat note ("Both would bind outcomes"). Every strict modal (may, must, cannot, can) keeps its exact count in both drafts, and the petition's 'only' count is unchanged.
10. **Word growth.** Petition +9.4%, opposition +2.3%. The opposition's findings are verbatim, so its growth is in the banner, header and seat notes. The petition's growth comes from turning table fragments, dash appositions and colon chains into full sentences. The §5 table rows 1a, 2–4, 5, 6, 7, 9, 11, 12 and 13 were already plain and are unchanged.
11. **Outside this unit, not changed.** The ballot and opposition chrome in `tools/build-pending-pages.mjs` (`heroSub` lines 527 and 545) still carries dash-stacked asides ("— still short of the zero-fail threshold", "— the case against the schedule, and the one the advocacy review could not move Meritboard or Lower off"). It belongs to the build-pending chrome unit.
12. **Splice.**
    - Jason rules on flag 2 first. Under (b), copy the two drafts over `docs-review/RATIFY-TAX-50-petition-v4.1.md` and `docs-review/RATIFY-TAX-50-opposition-brief.md`, and change session-record line 191 in the record unit in the same splice. Under (a), copy only the opposition draft.
    - Run `npm run build:pending`. check.mjs has already run the live generator on the drafts in memory. assertVerbatim passes. The other five pages come out byte-identical. The ballot and opposition chrome, id sequences and tag skeletons are unchanged, and all 84 statute links resolve.
    - No check-canon pin, guard-mutation probe or code guard names either page or source.
    - No digested file is touched, so the record annexes and the compendium SHA-256 table do not move.
    - The site-wide Tailwind build with the draft-built pages equals the live one, so `build:css` parity holds.
