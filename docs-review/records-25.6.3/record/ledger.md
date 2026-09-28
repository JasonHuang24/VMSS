# Records 25.6.3, unit record: reconstruction ledger

Draft only. No live source was edited. The draft in this folder is:

- `RATIFY-TAX-50-session-record.md`: the reconstructed session record. It replaces `docs-review/RATIFY-TAX-50-session-record.md`, which renders verbatim as `pending-ratify-tax-50-record.html` through `tools/build-pending-pages.mjs`.

Checker: `node docs-review/records-25.6.3/record/check.mjs`. It reads the draft, the live source, the live `tools/build-pending-pages.mjs` and the committed pages, and writes nothing. Besides the ledger, it runs the live generator in memory twice (live source, then the draft swapped in), compares the two builds, resolves every fragment href into the record page from every root page, document source, generator and built page, and runs a site-wide Tailwind parity build with the draft-built page in place of the committed one.

Matching conventions:
- Section (a) quotes are matched against the draft's visible text: the generator's own `sourceText()` (Markdown markers, `> ` prefixes and list markers stripped), with whitespace collapsed. A quote may not contain a backtick, so the commit hashes and series ids that the record writes in backticks are quoted on their own.
- Section (b) strings are matched against the raw draft with `> ` prefixes stripped and whitespace collapsed, or against the draft-built page for the `built:` heading. A (b) string that is not marked absent must also occur in the original. Rows marked `absent:` must not occur in the draft. Rows marked `na:` must occur in neither the original nor the draft; they record guard strings that target other pages.
- Where the original carried a fact in a metaphor, a reversal or an aphorism that the reconstruction dropped, the row gives the original wording in single quotes and then quotes the draft text that carries its content.

## Word counts

Words in the whole `sourceText()` (headings included).

| Document | Live | Draft | Change |
|---|---|---|---|
| RATIFY-TAX-50-session-record.md | 5103 | 5324 | +4.3% |

Register tells, counted by check.mjs as live → draft (prose only; headings and bold labels excluded):
- Reversal-shaped constructions ("not A, but B", "A, not B.", "rather than", "is not A; it is B"): 22 → 0.
- Prose em-dashes: 60 → 4. The four left are in the ruling captions R10, R12 and R21 ("GAUNTLET RATIFY-TAX-50 — PASS BY FOUNDER OVERRIDE", "OVERRIDE WITHDRAWN — LP-074 VACATED", "R21 — THE 2294 CONTINUATION") and the signature line, all kept byte for byte.
- Semicolons: 85 → 32. Most are in list-like apparatus kept as written: figure lists in parentheses, the §5 routing map in R15, the Mirror Doctrine's list of landed instruments, the engraved SCM table and the signature line.

## (a) Fact ledger

### RATIFY-TAX-50-session-record.md

Title and archive banner
- Title (heading, unchanged): `RATIFY-TAX-50 — Session record (post-v21.9.2 doctrine session)`
- Archive label (bold, unchanged): `ARCHIVE — historical entries preserved, append-only.`
- Dated entries are the drafting record through the pre-certification phases: `the drafting record through the pre-certification phases`
- 'and are not rewritten' replaced by a restatement notice (flag 1): `restated in plain wording.`
- Restatement scope (new, no counterpart in the original): `Dates, votes, figures and the meaning of every ruling are unchanged.`
- Discarded-branch label (bold, unchanged): `Disposition of the discarded branch (see R21):`
- Discarded, unmerged line, commits 7622cf1 through 5588d3c: `a discarded, unmerged implementation line, commits`, `7622cf1`, `5588d3c`
- Alternative non-canonical 2294 dataset: `encoded an alternative, non-canonical 2294 dataset.`
- Least-favorable Finding III member failed at late horizon: `Its least-favorable Finding III member failed at late horizon.`
- Never adopted, never landed as World canon: `never adopted as the in-world Commission record and never landed as World canon.`
- Founder rejected it before publication: `The founder rejected that proposed history before publication.`
- Canonical record is a different authored history: `The canonical 2294 record is a different authored history.`
- Findings I–IV and B1–B6 passing: `Findings I–IV and B1–B6 passed`
- Both schedules certified: `both schedules were certified`
- 50/25/12.5/6.25 effective 2295: `50/25/12.5/6.25 became effective in 2295.`
- Not a §11.3 correction; does not purport to reverse: `It is not a §11.3 correction of the draft`, `does not purport to reverse an issued Finding.`

Founder rulings of record (R1–R5)
- Heading (unchanged): `Founder rulings of record (each shipped by this archival pass)`
- R1 repair path is Path 3 ('PATH 3' lowered): `R1: The repair path for the pass-three kill is Path 3`
- Path 3 defined: `(rate recalibration at source)`
- Paths 1 and 2 not bundled ('NOT' lowered): `Paths 1 and 2 are not bundled.`
- R2 standing preregistered audit workstream (caps lowered): `R2: Path 2 (fiscal-facts audit) proceeds as a standing preregistered audit workstream,`
- Decoupled from any petition vote: `decoupled from any petition vote.`
- R3 Path 1 deferred: `R3: Path 1 (ADT structural-draw authority) is deferred.`
- Own federal LP, never a rider: `it runs as its own federal LP and never as a rider.`
- R4 Candidate A ('CANDIDATE A' lowered): `R4: The proposed schedule is Candidate A, 50/25/12.5/6.25.`
- Sanctuary base in the taxable pool: `The Sanctuary base is included in the taxable pool`
- Cadence rider required: `a recalibration cadence rider is required.`
- Petition renamed: `The petition is renamed RATIFY-TAX-50.`
- R5 caption: `R5: VOIDED RATIFICATION on record.`
- 40M baseline, founder-ratified unexamined: `set (40M population baseline) was founder-ratified unexamined.`
- Voided by the drafting seat on intake grounds: `The drafting seat then voided it on intake grounds`
- Grounds: `it contradicted engraved populations and UBI rates.`
- 'Ratification does not launder canon contradictions.': `Ratification does not validate a contradiction of canon.`
- 'The void, not just the replacement, is part of the record.': `The void is part of the record, along with the replacement.`

Adversarial review ledger
- Heading (unchanged): `Adversarial review ledger`
- Pass three verdict: `Sol pass three (v2): NOT-RATIFIABLE.`
- Kill: `Kill: a permanent structural deficit charged to cyclical-only backfill authority.`
- 12 findings, 2 drafting-seat errors: `12 findings, of which 2 were drafting-seat errors`
- The two errors: `(PJS arithmetic $87T→$108T; UBI-and-PJS attribution scope)`
- Seat's grade: `The seat graded the kill practically fatal and definitionally weak:`
- Undefined engraved term ('UNDEFINED ENGRAVED TERM' lowered): `it rests on an undefined engraved term,`
- "cyclical" undefined in the v21.9.1 rider: `the v21.9.1 rider does not define "cyclical".`
- First job of a future Path 1 LP: `The cyclical-vs-structural definition is the first job of any future Path 1 LP.`
- Sol consult: `Sol consult (kill-resolution paths): each of the three paths came back with strongest-attack findings.`
- Advisory non-binding, favored Path 3: `The advisory, which was non-binding, favored Path 3.`
- Founder selected Path 3 (R1): `The founder selected Path 3 (R1).`
- Pass four verdict: `Sol pass four (v3): NOT-RATIFIABLE.`
- Kill ('ANY' lowered): `the v21.9.2 recalibration gate conditions any top-marginal rate reduction on the 120%/36-month automation-side showing.`
- Exemption seat-invented, conceded: `no-load-transfer exemption was seat-invented and is conceded.`
- 11 findings, 3 drafting-seat errors: `11 findings, of which 3 were drafting-seat errors (see error ledger).`
- One finding contested and narrowed: `The seat contested one finding and narrowed it:`
- 1.67× as an upper bound ('UPPER BOUND' lowered): `the 1.67× retention ratio stands as an upper bound on the equilibrium multiplier`
- Not a point estimate: `and not as a point estimate.`
- Reason: `An induced increase in trigger frequency pulls equilibrium below proportional.`

Founder decisions D1–D3 (R6–R9)
- Heading (unchanged): `Founder decisions D1–D3 — RESOLVED (rulings R6–R8)`
- R6 coverage ratio defined ('DEFINED' lowered): `R6 (D1): The recalibration gate's coverage ratio is defined as`
- Ratio terms: `automation-side revenue over total dividend obligations (UBI + PJS),`
- Threshold: `≥120% over the trailing 36 months, with no month below 100%.`
- Strict reading, no exemptions ('ANY' lowered): `The strict reading governs: the gate conditions any top-marginal rate reduction, with no exemptions.`
- Consequence accepted: `The consequence is accepted: no rate cut is permissible until the facts show 120%.`
- Completes the v21.9.2 knob; FLAGS addendum: `This completes the v21.9.2 knob, whose denominator was undefined (see FLAGS addendum).`
- R7 participation authored [A]: `R7 (D2): Per-layer PJS participation is authored [A]:`
- Layer shares: `Sanctuary 20% / Main 30% / -1 35% / -2 20% / -3 10%.`
- PJS and dividend totals: `This gives PJS $129.75T and dividend obligations of $572.25T.`
- Structural multiple ('STRUCTURAL MULTIPLE' lowered): `ADT automation-side intake is authored as a structural multiple: 1.3× dividend obligations (≈ $744T).`
- Justification: `It is justified by the whitepaper's engraved abundance posture (90%+ automated production; elastic ADT output)`
- Not referenced to the gate line ('NOT' lowered): `and is not referenced to the gate line.`
- Gate coverage: `Gate coverage at these values is 130%.`
- Seat-proposed, founder-ratified: `The multiple was seat-proposed and founder-ratified.`
- Load-bearing fact, reopenable (quoted by the advocacy brief): `It is the load-bearing worldbuilding fact and, like all [A] values, is reopenable.`
- R8 proceeds to gauntlet ('PROCEEDS TO GAUNTLET' lowered): `R8 (D3): The petition proceeds to gauntlet as a real vote,`
- Expected to fail: `expected to fail on Sol's synthetic margins.`
- Real NO fences the question (cited by the petition): `A real NO at the 50% threshold fences the rate question as a boundary marker.`
- Failure legitimate under standing ruling: `Under standing founder ruling, failure is a legitimate output.`
- R9 caption: `R9: ADVERSARIAL REVIEW TERMINATION RULE (ratified).`
- Principle: `Principle: an adversarial seat's output is unbounded by design,`, `what must be bounded is the response function.`
- Pass five is final ('FINAL' lowered): `Sol pass five is the final full-scope pass on this petition line.`
- Routing by card: `Its findings route by the pre-registered adjudication card below,`
- 'lookup, not deliberation': `by lookup and without deliberation.`
- 'Sol never sees the card; consequences stay cold.': `Sol never sees the card, so the consequences of its findings stay cold.`
- Verdict informational; routing by class: `Sol's verdict field is informational only; findings route by class.`
- At most one confirmation pass ('ONE' lowered): `After pass five there is at most one confirmation pass.`
- Scope of the confirmation pass: `It is scoped strictly to applied fixes and cannot reopen anything else.`
- 'Then gauntlet.': `The gauntlet follows.`
- No pass six: `No pass six exists in any branch.`
- Unresolvable findings attach VERBATIM: `Unresolvable [A]-magnitude and values findings attach VERBATIM to the gauntlet ballot`
- 'the regress converts into the hostile analysis': `as the in-world opposition brief, which is the hostile analysis a real legislature publishes`
- Gauntlet is terminal: `The gauntlet is the terminal adjudicator.`
- Card label (unchanged): `Adjudication card, pass five:`
- Q1: `Q1 (1.3× multiple): any finding, at any severity → opposition brief verbatim.`
- Q1 no redraft: `No redraft under any answer, because worldbuilding magnitudes have no drafting cure.`
- Q2 ground truth logged first ('BEFORE' lowered): `Q2 (authored monthly series): the ground truth was pre-computed and logged before the pass.`
- Q2 inconsistency: `The v4 series is internally inconsistent by construction:`
- Q2 arithmetic ('not the authored 121% minimum'): `±5% variance around a 130% mean floors at ~123.5%, while the authored minimum is 121%.`
- Q2 hit branch: `Sol catches → calibration hit logged, variance corrected to ±7%.`
- Q2 miss branch: `Sol misses → the same correction applied, miss logged.`
- Q2 terminal: `Both outcomes are terminal.`
- Q3: `Q3 (rider deadlines): a specific quoted missing deadline → insert it.`, `Philosophical insufficiency → brief.`
- Q4: `Q4 (equilibrium upper bound): a concrete numerical failure case → narrow the claim.`, `No failure case → brief.`
- Q5: `Q5 (Sanctuary 1b provenance): a quoted sentence misstating provenance → reword once.`
- Q5 authored-magnitude objection: `An objection to an authored magnitude near an engraved conclusion, as such → brief`, `(uncurable in drafting by definition).`
- New findings ('WITH' lowered): `New findings outside Q1–Q5: kill-class with a quoted engraved conflict`
- New findings, kill-class route: `→ one founder decision (withdraw or boundary-marker run), no redraft.`
- Major and minor routes: `Major → brief. Minor → logged, zero action.`

Drafting-seat error ledger
- Heading (unchanged): `Drafting-seat error ledger (this session, on the record)`
- Error 1: `Pass two/v2: PJS arithmetic. $87T was published for a computation`, `whose stated inputs yield $108T (3B × $120k × 30%).`
- Error 2: `v2: SCM attribution scope was narrowed to "UBI-origin only".`
- Engraved scope ('UBI AND PJS' lowered): `The engraved scope is UBI and PJS.`
- Error 3: `v3: item 11 was labeled "automation-side" surplus but computed from gross intake.`
- True balance: `The true automation-side balance at v3 numbers is −$2.5T.`
- Error 4: `v3: marginal retention ratios were published as 1.18× (-1) and 1.06× (-2).`
- Correct values: `The correct values are 1.15× and 1.05×.`
- Error 5: `v3: PJS outlay was computed for Main only. Engraved PJS is all-layer.`
- Two intake-class errors: `Two intake-class errors were also corrected in-session.`
- Four-bracket schedule: `One was a fictional four-bracket schedule.`
- Halving cascade: `The other claimed a "halving cascade" as engraved structure;`
- Engraved rates not geometric ('NOT' lowered): `the engraved rates 70/35/17/8 are not an exact geometric sequence.`
- Standing correction: `Standing correction adopted: every computed figure gets an independent recomputation pass before any Sol review,`
- Uncontested findings logged: `findings accepted without contest are logged as such.`

Resolved seams
- Heading (unchanged): `Resolved seams (no longer open)`
- Engraved rule resolves routing ('RESOLVES' lowered): `Lower-layer tax routing: the engraved no-upward-conversion-without-exception rule resolves that`
- Lower collections cannot reach Main: `lower-layer collections cannot reach the Main treasury.`
- Zero lower-layer revenue is correct: `Counting zero lower-layer revenue toward Main obligations is therefore correct.`
- Residual on the docket: `The residual question, where lower-layer collections terminate, remains on the charter-restatement audit docket.`

Sol pass five and line closure
- Heading (unchanged): `Sol pass five and line closure (per R9)`
- Verdict informational ('INFORMATIONAL ONLY' lowered): `Pass five (v4, fresh cold seat): verdict NOT-RATIFIABLE, informational only per R9.`
- Kill: `Kill: gate circularity. The numerator was authored as 1.3× the gate's own denominator.`
- Routed per Q1: `Routed per adjudication card Q1 to the opposition brief verbatim; no redraft, as pre-registered.`
- Card routing F1–F2: `Card routing, all 11 findings: F1 brief (Q1) / F2 brief (Q2 values half)`
- F3–F4: `F3 FIX (Q2 honeypot) / F4 FIX (Q4, valid saturation counterexample;`
- 'scope corrected against canon, not against the reviewer's artifact': `scope corrected against canon, with the reviewer's artifact disregarded)`
- F5–F7: `F5 brief (new-major) / F6 brief (Q5) / F7 brief (new-major)`
- F8–F9: `F8 FIX (card amendment) / F9 FIX + residual to brief (Q3)`
- F10–F11: `F10 FIX (amendment) / F11 FIX (amendment).`
- Honeypot ('REPLICATED HIT' lowered): `HONEYPOT Q2: replicated hit.`
- Finding 3 arithmetic: `Sol's Finding 3 arithmetic (±5% relative around 130% yields 123.5%–136.5%)`
- Pre-registered first ('BEFORE' lowered): `matched the ground truth pre-registered in this record before the pass ran.`
- Record extended, ±7%: `The calibration record is extended. Correction applied: authored variance ±7%.`
- Third artifact label: `THIRD MECHANICS-BLOCK ARTIFACT this session:`
- Omitted rows: `the pass-four and pass-five blocks omitted the Sanctuary and -1 SCM rows.`
- Engraved table, all five layers: `The engraved table covers all five layers:`
- Table rows (verbatim): `Sanctuary 10%/$100B ALL savings; Main 10%/$100B ALL savings;`
- Table rows, lower layers (verbatim): `-1 5%/$50B ALL savings; -2 5%/$25B and -3 5%/$10B UBI/PJS-origin only.`
- F4 scope claim an artifact: `Sol's F4 scope claim ("no Sanctuary or -1 pulse") was an artifact of the omission.`
- Hygiene rule: `NEW BLOCK-HYGIENE RULE: quote engraved tables verbatim in review mechanics blocks,`, `and never paraphrase rows.`
- R9 amendment: `R9 AMENDMENT (founder-ratified): objectively verifiable minor defects`
- Amendment scope: `(wrong cross-references, arithmetic display, specification defects with mechanical cures)`
- Folds into the fix pass: `fold into the scoped fix pass.`
- Judgment-class minors: `Judgment-class minors remain zero-action.`
- Confirmation pass ('LANDED' lowered here; kept in the R20 caption): `CONFIRMATION PASS (v4.1, scoped to six fixes + 6b): 7/7 landed.`
- Review closed ('CLOSED' lowered): `Per R9, adversarial review on this petition line is closed.`
- No further pass: `No further Sol pass exists in any branch.`
- Margin trajectory: `Margin trajectory across passes (calibration only): pass four −48/−68/−18/−32/−12`
- Pass five margins: `→ pass five −26/−18/−7/−4/−15 (Meritboard/Court/Sanctuary/Main/Lower).`
- Main inside ±15: `Main's margin sits inside the reviewer's stated ±15 uncertainty.`
- Error addition #6: `Seat error ledger, addition #6: §7(d)→(e) cross-reference (pass-five F8).`
- Status: `STATUS: v4.1 is the ballot text, and the opposition brief publishes alongside it.`
- Remaining event: `Remaining event: GAUNTLET CONVENING, a founder action outside any seat's authority.`
- Vote real, allowed to fail: `The vote is real and allowed to fail (rulings R8, LP-062/LP-065 boundary-marker doctrine).`

R10
- Heading (unchanged): `Founder ruling R10 — RATIFY-TAX-50 ratified by founder override (post-gauntlet; canon v22.0)`
- Caption (unchanged): `R10 (founder ruling): GAUNTLET RATIFY-TAX-50 — PASS BY FOUNDER OVERRIDE.`
- 'Synthetic chambers as authored': `Synthetic chamber votes as authored:`
- Votes: `Meritboard −21 FAIL, Court −13 FAIL, Sanctuary −5 FAIL, Main +3 PASS,`, `Lower −11 FAIL (aggregate 1–4 FAIL).`
- Override on worldbuilding grounds: `The founder overrides the result to PASS on worldbuilding grounds [E-founder posture]:`
- Abundance posture is fact: `the abundance posture (R7, 1.3× automation-side revenue) is fact;`
- 50 as anchor (paraphrased by both briefs): `50 remains a high anti-concentration anchor;`
- Released capital: `released capital increases flow and economic activity;`
- SCM bounds concentration: `more frequent SCM activations bound concentration from retained liquidity.`
- Rationale: `The rationale is founder posture.`
- 'seat-validated for structure, not magnitude': `The seat validated it for structure and not for magnitude,`
- Magnitudes to Path 2: `magnitudes route to Path 2.`
- Scope note: `Scope note: SCM recycle is partitioned from gate math,`
- 'answers concentration, not solvency': `this rationale answers concentration and does not address solvency.`
- Cadence rider: `Treasury erosion remains governed by the cadence rider (review ≤6mo → LP intro ≤12mo → vote ≤6mo)`
- Path 2 supersession: `and by Path 2 supersession (petition v4.1 §7(e)).`
- Precedent: `Precedent: the civilization has cut rates on SCM-transfer grounds once before (v14.5, commit 5c3a0f6).`

R12
- Heading (unchanged): `Founder ruling R12 — override withdrawn, LP-074 vacated, schedule reverted (canon v22.1)`
- Caption (unchanged): `R12 (founder ruling): OVERRIDE WITHDRAWN — LP-074 VACATED.`
- Withdrawal on precedent grounds: `The founder withdraws the R10 override on precedent grounds:`
- Ground: `fiscal law should not stand on founder posture against a failed chamber vote.`
- Vacatur: `LP-074's enactment rested solely on that override, so LP-074 is vacated`
- Forward reversion: `(forward reversion; all v22.0.x records immutable).`
- Reversion to LP-073: `The engraved schedule reverts to LP-073: 70/35/17/8 top marginal above $10,000,000.`
- Original gauntlet: `Adjudication history of record: the original synthetic gauntlet was 1–4 FAIL.`
- Advocacy review 3–2: `The AFFIRM-TAX-50 advocacy review (Sol, cold, citations verified) re-ran the vote at 3–2`
- Re-run votes: `(Meritboard −8 FAIL, Court +2 PASS, Sanctuary +2 PASS, Main +7 PASS, Lower −9 FAIL),`
- Short of zero-fail: `short of the zero-fail enactment threshold under check-canon vote-outcome semantics.`
- Supplemental steelman: `A supplemental steelman was registered after adjudication`, `per the R9 termination pattern, was not re-adjudicated.`
- Both briefs: `Both briefs publish as permanent record.`
- Trajectory principle to LP-075: `The trajectory principle, which all chambers endorsed in direction, re-registers standalone as LP-075.`
- Re-ratification path: `RATIFY-TAX-50 remains available for genuine re-ratification under LP-075 §2`, `upon the Path 2 controlling estimate,`
- Terms ('audited facts, zero-fail threshold, no override'): `on audited facts, at the zero-fail threshold and with no override.`
- Revenue-stream correction ('not the ADT-funded dividend stream'): `Registered corrections: the seat conflated revenue streams`, `(income tax funds Main institutional obligations; the dividend stream is ADT-funded),`
- Threshold correction: `the seat assumed a threshold (adjudication cards now carry an explicit decision rule).`

R13
- Heading (unchanged): `Founder ruling R13 — layer doctrine, in-world reframe, LP-074/075 deregistered (canon v22.2)`
- Caption (unchanged): `R13 (founder ruling): LAYER DOCTRINE + REGISTER SIMPLIFICATION.`
- Two tiers: `Two record tiers are established.`
- World canon: `WORLD CANON: in-world pages. The founder is not an in-world actor:`
- Founding authority terminated at Y0: `founding authority terminated into the charter at Y0,`
- World-tier prohibition: `no page of World tier may present a founder ruling or override`, `as an in-world governance event.`
- Process record: `PROCESS RECORD: session records, rulings and drafting history, explicitly framed as out-of-world authorship.`
- In-world arc: `In-world, RATIFY-TAX-50 was filed and failed its gauntlet 1–4.`
- Advocacy narrowed to 3–2: `An advocacy review narrowed the vote to 3–2, still short of the zero-fail threshold.`
- Preserved as failed-petition record: `The petition is preserved as a failed-petition record under standing doctrine,`
- Re-petition: `re-petition is available on audited facts.`
- Schedule was and remains 70/35/17/8: `The engraved schedule was and remains 70/35/17/8 (LP-073, active).`
- v22.0–v22.1 interval: `The v22.0–v22.1 interval in which a 50-schedule appeared is drafting history, Process tier.`
- Deregistration: `LP-074 and LP-075 deregister.`
- LP-074 reason: `LP-074 describes an enactment that did not occur in-world.`
- LP-075 folds into doctrine: `LP-075's principle folds into whitepaper doctrine as the TRAJECTORY DOCTRINE,`
- In-world provenance (quoted): `with the in-world provenance "endorsed 5–0 across the ratification chambers".`
- Doctrine content: `top marginal rates track demonstrated institutional need,`
- Audited evidence ('— never authored facts —'): `any rate reduction requires audited evidence under the Path 2 standing audit, never authored facts,`
- Threshold: `at the standard zero-fail threshold.`
- Numbers retire: `Numbers 074/075 retire and are never reissued.`
- Framing header: `The Ratification Record section is Process tier and carries a framing header`, `declaring it the drafting archive, interventions and withdrawals included.`

R14
- Heading (unchanged; #r14 target): `Founder ruling R14 — RATIFY-TAX-50-II registered 5–0, enacted-conditional; in-world present ~Y175 (canon v22.3)`
- Caption (unchanged): `R14 (founder ruling): RATIFY-TAX-50-II REGISTERED.`
- Sixty-three years after Y112: `Sixty-three in-world years after the Y112 failure,`
- Drafted to the chambers' standard: `drafted to the chambers' own evidentiary standard,`
- 5–0 with margins: `passed its ratification gauntlet 5–0 (Meritboard +8, Court +8, Sanctuary +6, Main +7, Lower +3;`
- Margin disclosure: `margins authored, LP-041-style disclosure; adjudicating-seat citation triage and structural review of record).`
- Conditional law registers: `Under the pre-registered mapping, the conditional law registers.`
- Schedule A: `Schedule A (Sanctuary/Main 70→50) takes force only upon Path 2 controlling-estimate certification`, `of conditions A1–A8.`
- Schedule B: `Schedule B (Lower 35/17/8 → 25/12.5/6.25, nonseverable)`, `takes force only after Schedule A and a final Lower Incidence Certificate under §6.`
- Until certification: `Until certification, all rates remain 70/35/17/8 under LP-073.`
- First zero-fail law: `The petition registers as the line's first zero-fail law.`
- 'the Y112 objections were not out-argued but structurally removed — rates fall when shown, and this law falls-when-shown by construction': `Its conditional structure, which lowers rates only on a showing, removed the Y112 objections.`
- Present advances: `The in-world present advances to approximately Y175.`

R15
- Heading (unchanged): `Founder ruling R15 — register coherence: renumber to LP-074, reader-facing citations, dead-link purge (canon v22.4)`
- Caption (unchanged): `R15 (founder ruling): REGISTER COHERENCE.`
- (1) No in-world LP-074: `(1) The register never contained an LP-074 in-world,`, `the R14 law takes the next true number.`
- Renumber: `RATIFY-TAX-50-II renumbers LP-076 → LP-074.`
- Note rescinded: `The v22.2 retired-numbers note is rescinded as out-of-world history that leaked into in-world numbering.`
- Drafting designations: `The Process-tier drafting texts formerly labeled LP-074/075 are drafting designations only,`, `never registered in-world, and are relabeled to say so.`
- (2) Readable citations: `(2) Register citations must be readable.`
- Link to live record page: `Every citation in a registered law links to the live record page`, `or renders as plain text where no stable anchor exists.`
- Prohibitions: `No citation may name a repository file a reader cannot open,`, `no link may resolve to a page top when a section is cited.`
- (3) Front-page links: `(3) Links that resolve to nothing more specific than a document's front page`, `are removed or re-anchored site-wide.`
- Execution label: `Execution of record (v22.4).`
- Renumber executed: `Renumber: the register entry, the ToC and every inbound href moved to LP-074.`
- Contiguous register: `The register runs 071 → 072 → 073 → 074 contiguously,`, `which is the numbering R15 §1 describes as true.`
- Four surfaces: `The rescission reached four authored surfaces on the Deregistered Statutes page:`, `the meta description, the framing header and both status-history lines.`
- 'the R13 block above is untouched as immutable record and is rescinded by this ruling rather than by edit' (flag 1): `The R13 entry above was left untouched as immutable record`, `and is rescinded by this ruling.`
- 075 not retired ('— it remains available to the next law that earns it'): `The number 075 is not retired.`, `It remains available to the next law that earns it.`
- Citation conversion scope: `Citation conversion (§2/§3) applied to the rendered register entry only.`
- Petition source immutable (flag 2): `The docs-review source of the RATIFY-TAX-50-II petition is immutable and was not edited.`
- 125 sigils: `125 sigils were linked, one link per sigil.`
- Link placement: `The sigil letter carries the link, the section reference stays visible text,`, `the link anchors as deeply as the target page allows.`
- No-anchor cases: `a petition "item 14", a brief's "argument 4", a commission heading with no published section`
- Fallback: `the link resolves to the page and the section stays plain text, per §3's fallback.`
- Routing P, O, AB/SB: `Routing: [P] → ballot §-anchors; [O] → opposition Finding-anchors; [AB]/[SB] → the brief pages;`
- Routing C governing law: `[C] "GOVERNING LAW" and doctrine cites → whitepaper#trajectory-doctrine;`
- Routing C to R14: `[C] dateline/adjudication cites → the session record at R14;`
- Routing C manifest to R13: `[C] "ATTACHMENT MANIFEST" → the session record at R13,`, `the ruling that made the LP-074 text drafting history.`
- Citation key: `The citation key was rewritten to name live pages,`, `zero repository filenames remain in the entry.`
- Interpretation calls: `Two interpretation calls are registered for review.`
- (i): `(i) [H] does not route wholesale to the Deregistered Statutes page.`
- (i) reason: `Its LP-073 cites name a statute that page does not hold,`, `§2's controlling rule is that a citation links to the page holding the cited document.`
- (i) result: `LP-073 cites therefore resolve to LP-073 in this register,`, `only the LP-074 drafting cite resolves to the Process page.`
- (ii): `(ii) After the renumber, the entry's own [H, LP-074 §4] cite reads as self-reference,`, `since the register's LP-074 is now RATIFY-TAX-50-II.`
- (ii) rendering: `That cite is rendered "Drafting designation LP-074 §4", a citation-rendering change within §2's grant.`
- Petition prose left as filed: `("the historical text labeled LP-074 … deregistered to the Process record")`, `is petition wording and was left exactly as filed.`
- Own hedge: `It carries its own hedge and does not assert that the register's LP-074 is itself.`
- Dead-link label: `Dead-link purge (§4) and the machine half.`
- Three fragment hrefs: `The v22.3 tree carried three fragment hrefs to pending-ratification.html#path-2.`
- Section without id: `That section existed with no id on it,`, `so each of the three landed the reader on the page top.`
- 'Fixed by creating the id, not by rewriting links': `The fix created the id and left the links as they were,`
- Reason: `one of the three sits inside the LP-075 §1 statute text,`, `which is verbatim record and may not be edited.`
- Anchors created: `Anchors were created across the Process pages (ballot §1–§8, opposition Findings,`, `the briefs' concessions sections, the rulings R10–R14)`
- 'so that section cites have somewhere true to land': `so that section cites resolve to the cited section.`
- 56 ToC controls: `The 56 href="#" on whitepaper.html and world.html are the paginated-ToC controls.`
- Handler: `Their handler calls preventDefault() and swaps the page in JS,`
- '"#" is an inert fallback, not a citation': `so "#" is an inert fallback and cites nothing.`
- No section promised: `The controls promise no section, and no id exists to point at.`
- Narrow exemption: `They are exempted narrowly by [data-toc-page], and a bare href="#" anywhere else fails.`
- Link-integrity guard: `check-canon gained a LINK-INTEGRITY GUARD,`, `every internal fragment href on the World tier resolves`, `to an existing id in its target file.`
- Retired-numbers guard: `The v22.2 retired-numbers guard was rewritten to the invariant R15 leaves standing.`
- Non-vacuous: `The guard is non-vacuous: run against the v22.3 tree,`, `it fails on rate-history.html → pending-ratification.html#path-2.`
- Canon check: `Canon check 77 → 79.`

R16
- Heading (unchanged): `Founder ruling R16 — register house style: LP-074 rewritten,`, `full statute to the Ratification Record (canon v22.4.1)`
- Caption (unchanged): `R16 (founder ruling): REGISTER HOUSE STYLE.`
- Entries are narrative: `Register entries are editorial narrative in the register's established voice.`
- Apparatus: `Working-document apparatus (inline bracketed citations, citation keys, condition tables in petition form)`
- 'belongs to the Ratification Record, not the register': `belongs to the Ratification Record and stays out of the register.`
- Entry rewritten: `LP-074's entry is rewritten to house style with founder-ratified text.`
- Statute relocates verbatim: `Its full conditional statute text relocates verbatim`, `to a Ratification Record page that the entry anchors.`
- Era-year map: `Era-years map to the register calendar as follows:`, `TAX-50 failure 2213, successor filed 2276, enacted 2278.`
- Vote presentation: `Vote presentation converts to the register's ratification architecture.`
- Versioning: `Hotfix and editorial passes take patch versions (22.x.y); structural passes take minor versions.`
- Execution label: `Execution of record (v22.4.1).`
- 'Relocation first, replacement second, and the order was a gate rather than a preference': `The statute was relocated first and the register entry replaced second,`, `and that order was a gate.`
- Published and verified first: `The full statute was published and machine-verified before the register entry was touched,`
- 'no revision of the tree ever existed in which the text was gone from one place and not yet arrived at the other': `so that every revision of the tree held the text in at least one place.`
- New page: `The new page is pending-ratify-tax-50-ii-statute.html.`
- Contents: `It carries the instrument, its A1–A8 and B1–B6 condition tables, and the citation apparatus.`
- 'The register entry is the founder-ratified text' (tense, flag 3): `The replacement register entry was the founder-ratified text,`
- 3,670 characters: `transcribed and machine-compared against the ruling's copy at 3,670 characters of visible text, equal.`
- Size: `The entry fell from roughly 43,000 characters to 5,500.`
- 'the register's other 87 entries do not carry their statutes, and now neither does this one' (tense, flag 3): `The register's other 87 entries did not carry their statutes,`, `after this pass LP-074's entry did not either.`
- 'Source of the relocated page, and one call worth registering.': `Source of the relocated page: one call, registered here.`
- Obvious source wrong: `The obvious source was the petition draft at docs-review/RATIFY-TAX-50-II-petition.md,`, `and it is the wrong source.`
- Thirteen divergences: `A word-level diff against the register's v22.4 rendering returns thirteen divergences,`, `none of them is drift.`
- R13 change: `R13 lifted the founder out of the text once ("founder ruling" became "ruling-derived magnitude").`
- R15 key: `R15 rebuilt the citation key and replaced the draft's raw working-file names,`, `pasted-text.txt and LP-071-074-statutes-extract_1.md, with the live pages a reader can open.`
- Republication risk: `Generating the page from the draft would have republished exactly what R15 purged.`
- Published text is the source ('*published*' asterisks dropped): `R16 relocates the published text, so the register's own v22.4 rendering is the source.`
- Extraction: `It was extracted to documents/ratify-tax-50-ii-statute-source.html`, `is rendered by the pending-pages generator,`
- One HTML-sourced page: `which for that reason carries one HTML-sourced page among five Markdown-sourced ones.`
- Draft retained: `The draft is retained, unedited, as drafting history.`
- Relocation proof: `Relocation proof: 21,841 characters of visible text on both sides, equal char for char,`, `run before the entry was replaced.`
- 'One transformation was applied to the relocated text, and only one.': `Exactly one transformation was applied to the relocated text.`
- Same-page anchors: `The register had cited its neighbours as same-page anchors, four href="#lp-073",`, `which resolve to nothing off the register.`
- Rehomed: `Those links now carry their page.`
- 125 citations unchanged: `All 125 sigil citations, their targets and the reader-facing key survive unchanged.`
- Generator assertion: `The generator asserts the count and refuses a build that leaves a same-page anchor behind.`
- 'House-style guard, and why it is not the guard that was specified.': `House-style guard, and why it differs from the guard specified.`
- Draft shorthand: `The ruling names the apparatus in draft shorthand: "[P,", "[O," and a citation key.`
- 'would pass forever while catching nothing': `A guard on those literals would pass forever and catch nothing.`
- Reason: `R15 had already turned every sigil into a link,`, `the draft's literal bracket-cites appear nowhere in the register and never did.`
- 'The guard is over rendered form instead, which is what the register can actually grow': `The guard therefore checks the rendered forms the register can actually acquire:`
- Four classes: `ls-cite anchors, a law-statute block, statute typography and a citation key heading.`
- 'Non-vacuity is proved rather than asserted': `Non-vacuity was proved by test.`
- Fires on v22.4: `Run against the v22.4 tree, the guard fires on lp-074 for all four classes;`
- 'against this one' (read as the v22.4.1 tree): `against the v22.4.1 tree, 88 entries are clean.`
- Record pages exempt: `The Ratification Record pages are exempt by construction,`, `the guard reads only law-polling.html and only inside law-entry articles.`
- 'The count line, diagnosed before it was fixed.': `The count line was diagnosed before it was fixed.`
- 88 vs 87: `The stat cards said 88 and the filter line said 87.`
- 'the filter script was not at fault': `The filter script derived the number correctly from the entries,`, `it wrote the number only inside the click handler.`
- 'the first paint — the one most readers only ever see —': `The first paint, the only view most readers see,`, `showed a hand-authored string that had drifted a version behind.`
- Twenty commits, v22.3: `The string had tracked the register exactly for twenty commits and broke at v22.3,`
- 'this very petition became the 88th entry': `when this petition became the 88th entry and the string was not bumped.`
- 'Nothing caught it': `No check caught it, because check-canon compared the stat cards with the derived total`, `and had never checked this line.`
- Fix, three surfaces ('the string reads 88', tense): `The fix covered all three surfaces: the string was set to 88,`, `the script derives the number on load,`, `check-canon now binds the string to the derived count so it cannot drift again.`
- Era-years label: `Era-years and the calendar (R16 §3).`
- 'The mapping is rendered rather than substituted': `The mapping is rendered beside the era-year, as "Y112 (2213)", and does not replace it.`
- 'a system, not a label': `The era-years in rate-history.html form a system:`
- Interval passage: `its interval passage reads Y0 to Y12 to Y47 to Y112,`
- Era fields: `the rate chain's own Era fields at LP-071/072/073 run Y0–Y11, Y12–Y46, Y47–present.`
- Substitution rejected: `Substituting calendar years for the two the ruling maps would have orphaned the rest`, `and broken the cadence argument.`
- Only mapped years bridged: `Only R16's mapped years carry the bridge.`
- 'deriving them here would be inventing canon': `Y0, Y12 and Y47 stay bare, since the ruling does not map them`, `deriving them here would invent canon.`
- Epoch: `The epoch is implied and consistent: Y112 = 2213 places Y0 at 2101.`
- 'docketed, not done': `The full era-year-to-calendar reconciliation is docketed and has not been done.`
- Canon check: `Canon check 79 → 82.`

R17
- Heading (unchanged): `Founder ruling R17 — loop-termination rule for the Charter drafting; ratified (canon v22.5)`
- Caption (unchanged): `R17 (founder ruling): LOOP-TERMINATION RULE.`
- Principle: `An adversarial seat's output is unbounded by design,`, `what is bounded is the response function.`
- R9 principle carried over: `This is the R9 principle, carried from a ballot to a Charter`
- 'This is what makes the arc terminable: the review could have run forever; the response to it could not.': `to make the arc terminable.`
- Pre-declared and cold: `For the Path 2 Charter the rule is pre-declared and cold.`
- One regression pass: `One regression pass runs against the amended draft,`, `its findings are dispositioned on the record, and the founder's disposition is terminal.`
- No reopening: `No later pass may reopen a disposition a prior pass closed.`
- Landing bar: `The bar for landing is stated in advance: zero standing SEV-1 findings,`, `and every SEV-2 ruled on the record.`
- Cross-check: `One one-shot second-seat cross-check is permitted,`, `scoped strictly to the institutional-design surface the first seat did not see.`
- Cross-check limits: `It may file fresh findings there and nowhere else,`, `it cannot reopen anything outside that scope. Ratified.`

R18
- Heading (unchanged): `Founder ruling R18 — adjudication-by-presidency (canon v22.5)`
- Caption (unchanged): `R18 (founder ruling): ADJUDICATION-BY-PRESIDENCY.`
- Presidency carries adjudications: `Rulings of the Presidency carry the in-world adjudications of this arc.`
- 'a standing in-world office, not the founder': `The Presidency is a standing in-world office, separate from the founder.`
- Founder adopts: `The founder adopts those rulings as the binding dispositions for the arc.`
- Illustrative reasoning: `The simulated Presidential reasoning is illustrative,`, `the founder's adoption of it is the binding Process-tier event.`
- 'This keeps the layer boundary (R13) intact while giving the arc an in-world adjudicator.': `The arc thereby gains an in-world adjudicator, and the layer boundary (R13) stays intact.`
- World-tier instruments: `The Charter, the Schedule and the Register are World-tier instruments.`
- Rulings published: `The two Presidential rulings publish in the Ratification Record as the adjudication of record,`, `at pending-ratify-tax-50-rulings.html.`
- Adoption is authorship: `The founder's adoption is authorship, recorded here,`, `and never an in-world governance act of the founder's own.`

R19
- Heading (unchanged): `Founder ruling R19 — Charter v4 and Residual-Risk Register adopted (canon v22.5)`
- Caption (unchanged): `R19 (founder ruling): CHARTER ADOPTED.`
- Adoption: `The Path 2 Charter (fourth draft, terminal) and its Residual-Risk Register`, `are adopted in 2279 (Y178), via the Presidential adoption ruling.`
- Register binding: `The Register is adopted as part of the adoption record`, `binds as the Charter's own account of its limits.`
- Sixty-two findings: `Sixty-two hostile findings were filed against the methodology across two independent reviews:`
- The two reviews: `a re-filed first-review regression pass,`, `a cold institutional-design cross-check that saw neither the drafting history nor the first reviewer's work.`
- 'fifty-nine died in text': `The text resolved fifty-nine findings,`
- Residues RR-1 to RR-8: `the residues that survived are engraved and priced at Register entries RR-1 through RR-8.`
- Window: `The first decennial window opens on adoption and closes 2288.`
- No rate change: `Adopting the methodology changes no rate.`
- Live schedule: `The live schedule remains 70/35/17/8 under LP-073,`
- Activation condition: `no schedule activates until a Commission this Charter can constitute`, `produces a showing this Charter cannot be made to fake.`
- Published pages: `Published at path-2-charter.html and path-2-risk-register.html.`

R20
- Heading (unchanged): `Founder ruling R20 — §10.4 Schedule v2 adopted; consolidated landing (canon v22.5)`
- Caption (unchanged): `R20 (founder ruling): SCHEDULE ADOPTED, ARC LANDED.`
- Schedule adopted: `The §10.4 enumerated Schedule (second draft, terminal) is adopted with the Charter`
- Review under R17: `after one cold methodological review, run under the pre-declared termination rule of R17.`
- 17 findings: `The review filed 17 findings against the first Schedule draft.`
- 13 cured, 4 mitigated: `13 were cured in the second draft's text and 4 were mitigated,`
- RR-9 to RR-12: `the four residues that survived are engraved at Register entries RR-9 through RR-12.`
- Charter controls: `In any conflict the Charter controls.`
- Order of control: `Among the Schedule's parts, the Preliminary ruling of construction controls first`, `and A.1.6's accounting identity second.`
- One CC pass: `By founder ruling the whole Path 2 arc lands in one CC pass:`
- Three pages: `three World-tier pages (path-2-charter.html, path-2-schedule.html, path-2-risk-register.html),`
- Rulings appended: `the two Presidential rulings appended to the Ratification Record,`
- Register entry linked: `the LP-074 register entry linked to the methodology it fixes,`
- Guard and version: `a charter-page guard added to check-canon,`, `the advertised canon bumped to v22.5.`

R21
- Heading (unchanged): `Founder ruling R21 — the 2294 continuation, ratified and repaired;`, `five instruments + annexes; data-back chronology cure (canon v22.6.0)`
- Caption (unchanged): `R21 — THE 2294 CONTINUATION, RATIFIED AND REPAIRED.`
- Process: `After a founder-directed, multi-seat drafting and adversarial review process,`
- Selection: `the founder selected the continuation as fixed canon,`, `rejected contrary candidate implementations and authorized release.`
- Selected history: `The selected history is the 2294 Path 2 certification and the full 2295 cascade:`
- Schedules: `Schedule A, Sanctuary/Main 70→50, and Schedule B, 35/17/8→25/12.5/6.25,`, `through the separate Lower Incidence Certificate.`
- 'memorializes the authorial ruling that preceded the landing of dae0db0 but was not then recorded': `This entry records the authorial ruling that preceded the landing of`, `dae0db0`, `and was not recorded at the time.`
- Omission a defect: `The omission was a Process-tier defect, cured here.`
- 'not a seizure of landing authority by any seat': `It was not a seizure of landing authority by any seat.`
- Discarded-draft label (unchanged): `DISPOSITION OF THE DISCARDED DRAFT.`
- Line and dataset: `A separate, unmerged implementation line, beginning at`, `and ending in the unmerged methodology draft`, `used a different agent-authored dataset.`
- Late-horizon failure: `It produced a late-horizon Finding III failure at its least-favorable union member.`
- Reported figures: `That draft reported a baseline activation mean of`, `8.0766377`, `a 125 percent activation ceiling of`, `10.095797125`, `a maximum simultaneous activation upper bound of`, `10.55860956`, `and a minimum Flow lower bound of`, `0.51810473`
- Finding III on frequency: `Finding III failed on activation frequency while Flow passed.`
- Never adopted or landed: `The line was never adopted as the in-world locked Commission record,`, `never landed on main, and never acquired legal effect.`
- Rejected draft: `It is a rejected, non-canonical Process-tier draft of what the 2294 audit might have contained.`
- 'one of two candidate authored histories, of which the founder selected the other': `It is one of two candidate authored histories,`, `the founder selected the other before publication.`
- Not a correction: `The canonical record is not a §11.3 correction of the draft`, `does not reverse any issued Finding.`
- Observation: `Drafting observation, recorded without evidentiary weight:`
- 'separate drafting attempts—the discarded branch and the unlanded First Run chronicle': `the discarded branch and the unlanded First Run chronicle, drafted separately,`, `each located Finding III as the instrument's binding constraint.`
- 'informative about the design's pressure points, not about the fictional economy': `The observation bears on the design's pressure points only`, `establishes nothing about the fictional economy.`
- Chronology label (unchanged): `DISPOSITION OF THE CHRONOLOGY DEFECT.`
- Post-lock observations: `contained completed observations dated after its stated 2292 lock.`
- Affected series: `MAIN-LEDGER-2293-T50`, `MAIN-LEDGER-2293-M`, `ADT-LEDGER-2291-2293-A`, `ADT-LEDGER-2291-2293-D`, `L1-LEDGER-2293-*`, `L2-LEDGER-2293-*`, `L3-LEDGER-2293-*`
- Lower-layer ledgers: `the −1, −2 and −3 current receipts and obligation ledgers identified as`
- No in-world defect: `In-world, no such defect existed.`
- Admissible evidence: `The run's evidence was admissible under §§6.2–6.3,`, `the corrected dataset restores the mirror to the event.`
- DATA-BACK: `The founder ruled the correction DATA-BACK.`
- Retiming: `It retains the 2292-02-15 lock and retimes Main and Lower completed months to 2291,`, `the dividend window to 2289–2291, and the matching source identifiers to those periods.`
- Cutoff: `A forty-five-day maximum published reporting lag produces the 2292-01-01 cutoff.`
- Observations ended by cutoff: `Every completed observation ended by that cutoff and was published and fixed before lock.`
- Alters nothing: `The correction alters no magnitude, statutory threshold, finding, certification,`, `projection horizon, effective date or ratified outcome.`
- Lock-forward rejected: `Lock-forward was considered and rejected.`
- LP-075 lock: `LP-075 required the remedial run to lock no later than 2292,`
- Cascade: `shifting the lock would have cascaded through the §6.1 window,`, `the §6.2 cutoff and the baselines, rewriting law and methodology to spare data labels.`
- 'executed in daylight': `This authored-history repair was executed openly at the Process tier`
- 'recorded here precisely because a silent version would have been the §6.3 violation it instead cures': `is recorded here because a silent repair would have been the §6.3 violation it cures.`
- Mirror label and §11.1: `THE MIRROR DOCTRINE. In-world, the 2294 publication was complete under Charter §11.1.`
- Incomplete mirror: `The repository at`, `was an incomplete out-of-world mirror of that event.`
- 'repairs the mirror without rewriting the event': `This corrective commit repairs the mirror and leaves the event unchanged.`
- Landed instruments: `It lands the locked 2292 Charter Restatement Snapshot;`, `the standalone 2294 Lower Incidence Certificate; the complete §11.1 Compendium;`, `the independent §11.4 Registrar Execution Record;`
- LP-075 review record: `LP-075's §13.1 cold review, dispositions, reviewer replies, chamber adoption and veto flag;`
- Annexes: `the complete machine-readable annexes indexed by those instruments.`
- 'The mirror framing is redeemed by this landing': `This landing makes good the mirror framing, which would not have survived indefinite deferral.`
- Adjudication label (unchanged): `REGISTERED ADJUDICATION OF`
- Challenge: `The adversarial challenge correctly identified three points.`
- Missing instruments: `The landed mirror lacked the five instruments and the complete §11.1 annexes.`
- 'in daylight': `LP-075's §13.1 record had to engage the Presidency's Part V no-duty holding and RR-8 openly.`
- 'exact disposition rather than erasure': `The discarded failure line required an exact disposition on the record`, `and could not be erased.`
- Defense: `The defense established four points.`
- Schedule B path: `LP-074 already contained the separate Schedule B certificate path.`
- 'LP-075 invoked §13.1 rather than Article XXV.VI alone': `LP-075 invoked §13.1 and did not rest on Article XXV.VI alone.`
- 'reproducibility infrastructure rather than an in-world office': `Repository tooling was reproducibility infrastructure and held no in-world office.`
- 'authorial canon rather than a two-seat self-executing rate change': `The selected continuation was authorial canon and was not a two-seat self-executing rate change.`
- Disposition: `The final disposition was stand and repair:`, `preserve the rates and the event, cure the mirror,`, `register the rejected candidate history, and leave no missing institutional act implied by code.`
- Further rulings, verifier: `FURTHER RULINGS. The repository verifier proves reproducibility of published figures.`
- No authority: `It holds no institutional authority`, `and is not the Commission, the Registrar or any in-world office.`
- Vintage guard: `The verifier gains a vintage guard that distinguishes two evidence classes.`
- Completed observations: `Completed observations must end on or before the computed §6.2 cutoff,`, `their publication and vintage must predate lock.`
- Projections: `Preregistered projections may target post-lock periods only when every input rests on admissible pre-lock evidence`, `every transformation was fixed at lock.`
- §11.1 expands: `The §11.1 record expands from five prose instruments to five instruments plus complete machine-readable annexes.`
- §4 union: `The §4 admissible union is completed with every panel addition, validation-floor exclusion, point estimate,`, `interval, equivalence class, class representative and controlling bound.`
- Aspirational-economy paragraph: `The Charter's aspirational-economy paragraph is restored and reconciled with first-allocation doctrine,`, `the two-instruments rule remains explicit.`
- Tag: `Upon publication and validation of every instrument and annex named here,`, `the corrected head shall be tagged`, `v22.6.0`
- Attestation (unchanged): `Ruled by the founder; drafted, reviewed, and implemented through a founder-directed multi-seat process;`, `to be landed by the corrective-commit seat.`
- Signature (unchanged): `Founder signature: SIGNED`

## (b) Frozen-string checklist

### RATIFY-TAX-50-session-record.md

Heading lines (every id derives from them; #r14 is the statute page's [C] target; all 18 kept byte for byte)
- `# RATIFY-TAX-50 — Session record (post-v21.9.2 doctrine session)`
- `## Founder rulings of record (each shipped by this archival pass)`
- `## Adversarial review ledger`
- `## Founder decisions D1–D3 — RESOLVED (rulings R6–R8)`
- `## Drafting-seat error ledger (this session, on the record)`
- `## Resolved seams (no longer open)`
- `## Sol pass five and line closure (per R9)`
- `## Founder ruling R10 — RATIFY-TAX-50 ratified by founder override (post-gauntlet; canon v22.0)`
- `## Founder ruling R12 — override withdrawn, LP-074 vacated, schedule reverted (canon v22.1)`
- `## Founder ruling R13 — layer doctrine, in-world reframe, LP-074/075 deregistered (canon v22.2)`
- `## Founder ruling R14 — RATIFY-TAX-50-II registered 5–0, enacted-conditional; in-world present ~Y175 (canon v22.3)`
- `## Founder ruling R15 — register coherence: renumber to LP-074, reader-facing citations, dead-link purge (canon v22.4)`
- `## Founder ruling R16 — register house style: LP-074 rewritten, full statute to the Ratification Record (canon v22.4.1)`
- `## Founder ruling R17 — loop-termination rule for the Charter drafting; ratified (canon v22.5)`
- `## Founder ruling R18 — adjudication-by-presidency (canon v22.5)`
- `## Founder ruling R19 — Charter v4 and Residual-Risk Register adopted (canon v22.5)`
- `## Founder ruling R20 — §10.4 Schedule v2 adopted; consolidated landing (canon v22.5)`
- `## Founder ruling R21 — the 2294 continuation, ratified and repaired; five instruments + annexes; data-back chronology cure (canon v22.6.0)`

Bold labels (all 3, unchanged) and the signature block (byte-identical; check.mjs compares it)
- `**ARCHIVE — historical entries preserved, append-only.**`
- `**Disposition of the discarded branch (see R21):**`
- `**Founder signature:** SIGNED`
- `— Ruled by the founder; drafted, reviewed, and implemented through a founder-directed multi-seat process; to be landed by the corrective-commit seat.`

Ruling captions and entry labels (kept byte for byte; check.mjs also holds all 33 list-item labels)
- `R10 (founder ruling): GAUNTLET RATIFY-TAX-50 — PASS BY FOUNDER OVERRIDE.`
- `R12 (founder ruling): OVERRIDE WITHDRAWN — LP-074 VACATED.`
- `R13 (founder ruling): LAYER DOCTRINE + REGISTER SIMPLIFICATION.`
- `R14 (founder ruling): RATIFY-TAX-50-II REGISTERED.`
- `R15 (founder ruling): REGISTER COHERENCE.`
- `R16 (founder ruling): REGISTER HOUSE STYLE.`
- `R17 (founder ruling): LOOP-TERMINATION RULE.`
- `R18 (founder ruling): ADJUDICATION-BY-PRESIDENCY.`
- `R19 (founder ruling): CHARTER ADOPTED.`
- `R20 (founder ruling): SCHEDULE ADOPTED, ARC LANDED.`
- `R21 — THE 2294 CONTINUATION, RATIFIED AND REPAIRED.`
- `DISPOSITION OF THE DISCARDED DRAFT.`, `DISPOSITION OF THE CHRONOLOGY DEFECT.`, `THE MIRROR DOCTRINE.`, `REGISTERED ADJUDICATION OF`, `FURTHER RULINGS.`
- `R5: VOIDED RATIFICATION on record`, `R9: ADVERSARIAL REVIEW TERMINATION RULE (ratified).`, `Adjudication card, pass five:`
- `HONEYPOT Q2:`, `THIRD MECHANICS-BLOCK ARTIFACT this session:`, `NEW BLOCK-HYGIENE RULE:`, `R9 AMENDMENT (founder-ratified):`, `CONFIRMATION PASS (v4.1, scoped to six fixes + 6b):`, `STATUS:`, `GAUNTLET CONVENING`
- `Execution of record (v22.4).`, `Execution of record (v22.4.1).`, `Dead-link purge (§4)`, `Era-years and the calendar (R16 §3).`

Quoted strings (all 21 of the original, verbatim; check.mjs also fails on any quoted string new in the draft)
- `"cyclical"`, `"UBI-origin only"`, `"automation-side"`, `"halving cascade"`, `("no Sanctuary or -1 pulse")`
- `"founder ruling"`, `"ruling-derived magnitude"`, `"endorsed 5–0 across the ratification chambers"`
- `"item 14"`, `"argument 4"`, `"GOVERNING LAW"`, `"ATTACHMENT MANIFEST"`, `"Drafting designation LP-074 §4"`
- `("the historical text labeled LP-074 … deregistered to the Process record")`
- `"[P,", "[O,"`, `"Y112 (2213)"`, `href="#"`, `so "#" is an inert fallback`, `href="#lp-073"`

Strings other documents quote, cite or restate
- Petition v4.1 restates R8: `real NO at the 50% threshold fences the rate question as a boundary marker`
- Opposition brief header quotes R9: `attach VERBATIM to the gauntlet ballot`
- Advocacy brief quotes R7: `load-bearing worldbuilding fact`
- Advocacy and supplemental briefs restate R10: `50 remains a high anti-concentration anchor`
- Presidential adoption ruling restates R19's activation condition: `no schedule activates until a Commission this Charter can constitute produces a showing this Charter cannot be made to fake`
- Hub and whitepaper provenance: `5–0 across the ratification chambers`
- RATIFY-TAX-50-II draft banner points to the R16 "divergence note": `thirteen divergences`
- The 25.6.2 petopp ledger cites the pass-five routing: `to the opposition brief verbatim; no redraft, as pre-registered`
- R17 names R9: `the R9 principle`

Rates, numbering and identifiers (frozen; check.mjs also holds all 258 digit-bearing tokens)
- `50/25/12.5/6.25`, `70/35/17/8`, `$10,000,000`, `35/17/8 → 25/12.5/6.25`, `35/17/8→25/12.5/6.25`, `Sanctuary/Main 70→50`
- `§11.3`, `§11.1`, `§11.4`, `§13.1`, `§§6.2–6.3`, `§6.1`, `§6.2`, `§6.3`, `§4`, `§6.`, `§7(e)`, `§7(d)→(e)`, `(§2/§3)`, `§1–§8`, `§10.4`
- `A.1.6`, `A1–A8`, `B1–B6`, `RR-1 through RR-8`, `RR-9 through RR-12`, `Part V`, `Article XXV.VI`, `LP-075 §2`, `R15 §1`, `LP-075 §1`, `[H, LP-074 §4]`
- `7622cf1`, `5588d3c`, `dae0db0`, `5c3a0f6`, `v22.6.0`, `2292-02-15`, `2292-01-01`

Guard strings that target other pages (confirmed absent from original and draft)
- linkFirst anchors (Charter, Schedule): na: `a schedule adopted by the chambers`, `This Schedule is part of the Charter`
- Certification positive controls: na: `SCHEDULES A AND B CERTIFIED`, `exactly 30 keyed annual observations`, `Main-12 106.7%`, `ADT-36 122.4%`, `complete ordered window SHA-256-attested`
- STATUTORY_CONSTANTS title: na: `Path 2 LP-074 Final Certification — 2294`
- Guard-mutation probes and check-canon pins on other pages: na: `id="s-10-4"`, `class="ls-cite"`, `current rate authority is`, `Drafting designation LP-074 (process record`, `above $10,000,000 annually, layer-mapped as before.`, `top marginal rates track institutional need, not posture.`, `Restatement &amp; Consolidation Doctrine`, `The Codification Sweep`, `ENACTED — SCHEDULES ACTIVE FROM 2295`, `RATIFY-TAX-50-II — Conditional Successor Petition`, `<body`
- The register probe `RR-12` occurs in this record as a Register entry number (R20) and is kept: `Register entries RR-9 through RR-12`
- Superseded refusal phrasing and World-tier founder phrasing: absent: `lawful nonactivation`, `both refusals`, `founder's ruling`, `founder's override`

### built: pending-ratify-tax-50-record.html

Deep-link ids (derived from the heading lines; #r14 is linked 36 times from the statute page and its source; ids unchanged)
- `id="ratify-tax-50-session-record-post-v21-9-2-doctrine-session"`
- `id="founder-rulings-of-record-each-shipped-by-this-archival-pass"`
- `id="adversarial-review-ledger"`
- `id="founder-decisions-d1-d3-resolved-rulings-r6-r8"`
- `id="drafting-seat-error-ledger-this-session-on-the-record"`
- `id="resolved-seams-no-longer-open"`
- `id="sol-pass-five-and-line-closure-per-r9"`
- `id="r10">Founder ruling R10 — RATIFY-TAX-50 ratified by founder override (post-gauntlet; canon v22.0)</h3>`
- `id="r12"`, `id="r13"`, `id="r15"`, `id="r16"`, `id="r17"`, `id="r18"`, `id="r19"`, `id="r20"`, `id="r21"`
- `id="r14">Founder ruling R14 — RATIFY-TAX-50-II registered 5–0, enacted-conditional; in-world present ~Y175 (canon v22.3)</h3>`
- Chrome unchanged: `RATIFY-TAX-50 — Session Record</h1>`, `Process Record · Session Record`, `<title>RATIFY-TAX-50 Session Record • The Five Rings</title>`, `Failed Petition — record retained`, `<body`

## (c) Flags

1. **Archive banner: "are not rewritten" is replaced. Jason rules before the splice.** The live banner says the dated entries "are not rewritten". A reconstruction rewrites them, so the sentence would be false after the splice. This is the same choice the petition banner raised in 25.6.2 (petopp flag 2):
   - (a) Leave the record as it is. The draft then equals the live file, the record leaves this unit, and nothing is spliced.
   - (b) Keep the reconstruction and replace the sentence. The draft carries (b): "The dated entries below are the drafting record through the pre-certification phases, restated in plain wording. Dates, votes, figures and the meaning of every ruling are unchanged."
   - Under (b), the bold label "ARCHIVE — historical entries preserved, append-only." is kept byte for byte, because bold labels are frozen. "Preserved" still holds for the facts, and new entries are still appended, but a reader may take "preserved" to mean the wording. If Jason wants the label to match, it changes in the same splice.
   - Also under (b), two statements about immutability become statements about their own version only. R12's "(forward reversion; all v22.0.x records immutable)" is kept as written. R15's execution note now reads "The R13 entry above was left untouched as immutable record and is rescinded by this ruling." Both are true of v22.0.x and v22.4. After the splice, R13's wording is restated too.
   - Could go either way.
2. **Correction to 25.6.2 petopp flag 2. The line it named does not refer to the v4.1 petition.** Petopp flag 2 said session-record line 191 ("the docs-review petition source is immutable and was not edited") went stale when the v4.1 petition was restated. That reading is wrong. Line 191 sits in R15's execution note on the citation conversion of the LP-074 register entry, and LP-074 is RATIFY-TAX-50-II. Its docs-review source is `docs-review/RATIFY-TAX-50-II-petition.md`, which R16 names as "the petition draft". The v22.4 commit message (09ec97f) confirms this: "125 sigils linked in the rendered register entry; the docs-review petition source is immutable and was not edited." The II draft's body has not been edited since. Its banner was relabeled at 46a2605. The draft keeps the claim and names the petition: "The docs-review source of the RATIFY-TAX-50-II petition is immutable and was not edited." Nothing needs to change here because of the v25.6.2 splice. If a later unit restates the II draft, this sentence and R16's "The draft is retained, unedited, as drafting history" go stale in the same splice.
3. **Tense in the two execution notes.** Where a present-tense claim is no longer true, it moves to the past tense of the version it records. The rulings' own operative text keeps its tense.
   - R16: "The register entry is the founder-ratified text" became "The replacement register entry was the founder-ratified text". The LP-074 entry has changed since: it was edited at dae0db0 and restated at v25.5.1 (d546661, dashes to parentheses).
   - "the register's other 87 entries do not carry their statutes, and now neither does this one" became "did not carry … after this pass LP-074's entry did not either".
   - "the string reads 88" became "the string was set to 88".
   - R15: "check-canon gains a LINK-INTEGRITY GUARD" became "gained", and "the v22.2 retired-numbers guard is rewritten" became "was rewritten".
   - "the script derives the number on load" and "check-canon now binds the string" stay in the present tense, because both are still true.
4. **Numbering the ruling text does not carry (frozen and left as found).** R15's execution notes cite "§2/§3", "§3's fallback" and "Dead-link purge (§4)". The ruling as recorded lists only (1) to (3). The plain-text fallback sits in (2), and dead links in (3). R16's execution note cites "R16 §3", but R16 has no numbered clauses. All of these are frozen numbering, so none was renumbered. Jason may want a one-line concordance note. Could go either way.
5. **Caps lowered as emphasis only:** PATH 3, NOT (bundled, referenced, an exact geometric sequence), STANDING PREREGISTERED AUDIT WORKSTREAM, CANDIDATE A, UNDEFINED ENGRAVED TERM, ANY (×2), UPPER BOUND, DEFINED, STRUCTURAL MULTIPLE, PROCEEDS TO GAUNTLET, FINAL, ONE, BEFORE (×2), WITH, AND, RESOLVES, INFORMATIONAL ONLY, REPLICATED HIT, LANDED (in "7/7 landed"), CLOSED. Everything else keeps its caps, and check.mjs fails on any other caps change. Kept: ruling captions and entry labels, the verdict and routing codes (NOT-RATIFIABLE, FAIL, PASS, FIX, NO), VERBATIM (the R9 routing term the opposition brief quotes), ALL (the engraved-table quotation), FLAGS, WORLD CANON, PROCESS RECORD, TRAJECTORY DOCTRINE, LINK-INTEGRITY GUARD, DATA-BACK, SEV-1/SEV-2, the series ids and SIGNED.
6. **Wording dropped with no fact attached.** Each is listed in section (a) with the draft text that carries the content. The list: 'launder'; 'lookup, not deliberation'; 'the regress converts into'; 'not out-argued but structurally removed'; 'rates fall when shown, and this law falls-when-shown by construction'; 'This is what makes the arc terminable: the review could have run forever; the response to it could not.'; 'rather than a preference'; 'and only one'; 'the filter script was not at fault'; 'the one most readers only ever see'; 'somewhere true to land'; 'is redeemed by this landing'; 'in daylight' (×2); 'precisely'; 'memorializes'; 'That is informative about the design's pressure points, not about the fictional economy.'
   - R14's closer carried the maxim "rates fall when shown". The maxim no longer appears in this record, but the fact it stated does: the law lowers rates only on a showing. The maxim stands in the Presidential ruling and in canon.
7. **Reading decisions.**
   - The header's "effective 2295" became "became effective in 2295".
   - R10: "Synthetic chambers as authored" became "Synthetic chamber votes as authored". "Rationale is founder posture, seat-validated for structure, not magnitude" became "The rationale is founder posture. The seat validated it for structure and not for magnitude".
   - Card routing F4: "scope corrected against canon, not against the reviewer's artifact" became "scope corrected against canon, with the reviewer's artifact disregarded".
   - R16: "against this one" is read as the v22.4.1 tree, which is the tree R16 executed on.
   - R16 house-style guard: "grow" became "acquire".
   - R19: "fifty-nine died in text" became "The text resolved fifty-nine findings", which is the Presidential adoption ruling's own wording.
   - R20: "13 cured in the second draft's text, 4 mitigated" became "13 were cured in the second draft's text and 4 were mitigated". The draft does not say whether the four mitigations are in the text. "the Preliminary ruling of construction and then A.1.6's accounting identity control" became "controls first and A.1.6's accounting identity second".
   - R21: "separate drafting attempts" became "the discarded branch and the unlanded First Run chronicle, drafted separately".
   - Removed from the visible text: the literal asterisks around "*published*" in R16 (the generator renders only `**`, so the page showed them), and the stray spaces the original's line-end hyphen splits left in the page text ("cyclical-vs- structural", "no-upward-conversion-without- exception", "four- bracket").
8. **Hedge drift, from the check.mjs notes. No modal moved.** 'only' went 20 → 21 (+ R14 "lowers rates only on a showing", + R21 "bears on … only", − R16 "and only one"). 'could' went 2 → 1 (− R17 closer ×2, + R21 "could not be erased"). 'never' (15), 'would' (7), 'should' (1) and 'might' (1) are unchanged. Every strict modal (shall 1, must 4, may 7, cannot 6, can 3) keeps its exact count.
9. **Process tier: seat names and founder wording kept.** The page is `pending-*`, which check-canon exempts from the World-tier founder and seat guards. "Sol" (15) and "founder" (58, case-insensitive) keep their exact counts, because they are provenance facts.
10. **Word growth +4.3%.** It comes from the banner's restatement notice and from breaking the colon-and-dash chains of R6–R9, the error ledger and R12–R21 into full sentences. Fragments such as "12 findings; 2 were …" became "12 findings, of which 2 were …". The ruling captions, the card routing line, the margin trajectory, the engraved-table quotation and the signature are unchanged.
11. **Outside this unit, not changed.** The record page chrome in `tools/build-pending-pages.mjs` (the RECORD `heroSub` and `description`, lines ~599–602) still carries dash-stacked asides ("— including the override that was applied during drafting and later withdrawn —"). The statute comment near line 616 ("One transformation, and only one") echoes the old R16 wording. Both belong to the build-pending chrome unit.
12. **Splice.**
    - Jason rules on flag 1 first. Under (b), copy the draft over `docs-review/RATIFY-TAX-50-session-record.md`. Under (a), nothing is spliced.
    - Run `npm run build:pending`. check.mjs has already run the live generator on the draft in memory. assertVerbatim passes. The other six pages come out byte-identical. The record page chrome, its 21 ids and its tag skeleton are unchanged, and all 36 hrefs into the page (#r14, from the statute page and its source) resolve.
    - No check-canon pin, guard-mutation probe or code guard names the page or source.
    - No digested file is touched, so the record annexes and the compendium SHA-256 table do not move.
    - The site-wide Tailwind build with the draft-built page equals the live one, so `build:css` parity holds.
