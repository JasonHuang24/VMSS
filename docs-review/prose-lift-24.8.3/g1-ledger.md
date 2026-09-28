# Prose lift 24.8.3, group 1 (Resources r31, r32, r33): fidelity ledger

Modes (triage register, docs-review/prose-lift-24.7-triage.md): r31, r32 and r33 are all clarity edits. The pages are copies of the `<div class="resource-page">` blocks in documents/resources-source.html. The source itself is untouched. `check-g1.mjs` (this folder) checks each page against its source block. It confirms that tags and attributes, table cells, headings and the set of numbers are identical, and that every ledger quote below appears in the edited page. It also reports word counts and paragraphs with more than one em-dash. Quotes are matched against the page text with tags stripped and entities decoded (curly quotes become straight quotes, `&mdash;` becomes —, `&ndash;` becomes –).

Global notes:
- Word counts cover the whole block, tags stripped. Only running prose was edited. Headings, the subtitle lines, the `<strong>` run-in labels, figures, dates, percentages and citations are frozen.
- In-world quotations are treated as frozen citations and left verbatim: the 2225 report line, Oyelaran's 2215 and 2226 remarks, Pentagraph-7's statement, the Court's Finding Three passage, the 2238 review's verdict and the Meritboard's 2256 fraud opinion. The canonical wording of the Gradient Doctrine (r33) is also verbatim. One triage sample habit sits inside a quotation (r32: "The SAD works. What it works at is deliberation, not certainty."). It stays verbatim; see r32 flag 3.
- The recurring "The student who ... has misread" frame of the Student's Error sections is house structure and stays. The "deepest reading of Book N" closers are rewritten as "Read as a whole, ...".
- Sentences that carry a doctrine flag or cross-resource clash were left verbatim, including any original reversal or em-dash. They are listed under Flags.
- Approved doctrine changes: none applies to this group. The R1 "no AI enforcement" change concerns r1 only. The LP-004.2 visitor rewrite is approved for R27 and R28 only, so r33's LP-004.2 conflict (triage doctrine flags 8 and 9) is flagged and left unchanged.
- The triage word counts (5,069 / 5,001 / 4,993) were made with a different counter. The counts below come from check-g1.mjs.

## r31 Precognition, Book I: Development

Claims ledger
- Status of PIA: `the most doctrinally consequential technology to emerge in VMSS since the founding-era architecture`
- Names: `Its formal institutional name is the Predictive Intervention Architecture (PIA)` / `the colloquial term is "precog."`
- Scope and dates: `through the 2212 breakthrough and the operational validation period that closed in 2225`
- Cross-volume map: `Book II (Resource 32) takes up the deployment debate, constitutional review` / `Book III (Resource 33) covers the later scope-evolution petitions`
- Register: `This volume is deliberately scientific in register`
- Four commitments: `PIA was built around four civilizational commitments.` / `the deployment architecture inherited them intact`
- Anchoring: `Each is anchored to a specific Charter article or structural doctrine`
- Commitment One: `Commitment One: no cost-bearing substrate class.` / `Article I grounds all stratification in demonstrated conduct`
- Inversion: `is the exact inversion of what the behavioral-causality architecture permits`
- Substrate ruling: `PIA is a composed AGI-tool system and not a biological faculty`
- Commitment Two: `Commitment Two: no adjudication-free detention.`
- Article XXI: `would collapse the Article XXI deterministic adjudication pipeline the Charter mandates`
- Prediction as signal: `the prediction enters it as a signal for that architecture to weigh`
- Article XIII: `The signal-versus-decision separation codified in Article XIII applies to PIA output`
- Commitment Three: `Commitment Three: no dissent suppression.` / `becomes, in practice, the primary lever for institutional capture itself`
- Article XX: `Article XX's transparency architecture makes suppression structurally impossible in VMSS.`
- Publication: `is published to the Meritboard audit ledger on the standard cadence`
- Built before deployment: `The anti-corruption architecture was built before the technology was deployed`
- Commitment Four: `Commitment Four: no punishment for prevented acts.` / `fails the Article I demonstrated-conduct standard categorically`
- No reassignment: `and does not produce layer reassignment`
- Forestalled Act Ledger: `The doctrinal innovation Book II treats as the Forestalled Act Ledger` / `a prevented act is not a demonstrated act`
- Derived early (also carries the dropped "refused this architecture" closer): `The four commitments were derived early, during the foundational theoretical period`
- Absent, not restrained: `would be structurally absent rather than procedurally restrained`
- Tool, not citizen: `PIA is an AGI-tool system. It is not an AGI citizen`
- Article XXII personhood (flag 2): `Article XXII grants personhood to any entity at or above human cognitive level` / `PIA operates below that threshold.`
- Composition: `composed of three mature VMSS technologies` / `which was the specific subject of the 2212 breakthrough`
- Book II stakes: `a substantial portion of Book II's ethical debate turns on it`
- Article III (flag 3): `a question the Article III bodily-autonomy framework would refuse to settle`
- Consent axis: `the consent question applies only to the surveilled population`
- Foundational fact: `the foundational technical fact from which the rest of the architecture follows`
- Neural-dive dates and use: `developed from the 2140s through the 2160s` / `used mainly for empathy, education, and art`
- No mind reading: `there is no "reading minds" in any ordinary sense` / `was already capturing for other purposes`
- Implant: `deployed civilization-wide for civic identification and continuity purposes`
- Institutional uses: `for STI calibration, medical monitoring and law-enforcement forensics` / `PIA's contribution is to use this data in aggregate`
- Article XXVIII: `which Book II covers under the Article XXVIII ratification process`
- AGI cohort: `achieved substrate-neutrality-era civic peer status in the mid-twenty-second century`
- Better than humans: `better than any human cognitive process`
- Citizen cannot be deployed: `a citizen cannot be deployed as a continuous operational instrument`
- Output: `act-initiation forecasts with confidence envelopes, predicted time-of-act windows` / `documented signal provenance`
- Not visual: `it produces no video of the predicted act` / `It produces probabilistic forecasts with audit trails.`
- Horizon: `approximately four to seventy-two hours` / `Below four hours, the pre-act cognitive-state signature is not yet distinguishable`
- Upper horizon: `forecast confidence degrades below operational threshold`
- Subset, variable reliability: `PIA forecasts reliably for only a subset of the full behavioral space` / `the Meritboard audit architecture continuously characterizes`
- Neural diving: `Neural diving matured between 2140 and 2165.`
- Modes: `Audience mode for passive observation and Pilot mode for temporary control`
- Feasible early: `technically feasible for decades before anyone pursued it` / `it was not trivially respectable`
- AGI cognition dates: `matured through the 2150s and 2160s`
- Article XXII ratification (flag 2): `Article XXII's substrate-neutrality doctrine had been ratified in the late 2130s`
- Practitioners' view: `too contextual, too individually variable, and too ethically encumbered`
- Cultural separation: `The separation between the domains was cultural.`
- Telemetry date: `Aggregated implant telemetry matured through the 2160s`
- Scale: `across tens of millions of citizens` / `These aggregate models operated at population resolution.`
- Unpursued: `a downstream capability the aggregation enabled, and nobody pursued it`
- Article XII: `raised Article XII's single-metric concerns directly`
- Decade gap: `for at least a decade before any research program proposed it`
- Oyelaran: `chaired the Meritboard Behavioral Forecasting Panel from 2172 to 2188`
- Career: `under the Tokyo Research Coalition in the 2150s` / `AGI predictive cognition collaboration with Pentagraph-4`
- Conjecture: `The Oyelaran Conjecture, published in 2178` / `"On the Compositional Possibility of Predictive Intervention,"`
- Hedge: `could in principle produce act-initiation forecasts at operational confidence`
- Limits of the paper: `It did not propose deployment, address Article XII concerns`
- Reception, hedged: `Reception was marginal and hostile in roughly equal measure.`
- Originalists: `identified the Article XII/XIII collision immediately` / `would require Charter amendment or an Article XI ruling`
- Fifty years: `almost line for line, the deployment debates that would occur fifty years later`
- Funding: `the Meritboard Behavioral Forecasting Panel's own discretionary research allocation`
- AGI Governance Panel: `The AGI Governance Panel declined to fund the program during Oyelaran's tenure.`
- Hedge: `were widely understood to reflect substrate-neutrality concerns`
- Court declined: `the Supreme Court advisory bench declined to provide pre-emptive constitutional review`
- Pentagraph-7: `That collaborator was Pentagraph-7, an AGI citizen specializing in aggregated predictive cognition`
- Voluntary participation: `Pentagraph-7's participation was voluntary and explicit.` / `did so as an individual civic actor, outside institutional direction`
- Period: `The foundational period ran from approximately 2175 to 2195.`
- Papers: `what the coordination layer between the three inputs might look like (2181)` / `for unfalsifiable predictions might require (2184)` / `the minimum prediction horizon for operational utility would be (2189)` / `AGI-tool or AGI-citizen, would need to be (2193)`
- 2193 paper: `It is the first publication to rule out an AGI-citizen substrate`
- Experiments: `Experimental research began in 2195.` / `the fifteen-year experimental period established the empirical basis for the 2212 breakthrough`
- Phase I: `closed historical records` / `which approximated a blind test within the constraints of retrospective data`
- Phase I findings: `at confidence levels materially above chance` / `lethal-harm acts produced the clearest signatures, fraud produced weaker ones` / `most sub-criminal conduct produced no distinguishable signature at all`
- Horizons by class: `Lethal-harm acts produced four-to-seventy-two-hour signatures, fraud produced hours-to-minutes signatures` / `non-predatory violent acts produced signatures in the middle of the range`
- Phase II cohort: `approximately 2,400 volunteers drawn from Sanctuary and Main Layer populations`
- Phase II ethics: `every participant signed a detailed consent protocol` / `the research operated entirely outside the adjudication pipeline` / `participants could withdraw at any point`
- Duration, hedged: `typically twelve to twenty-four months`
- No intervention: `Predicted events were cataloged but not intervened on.`
- Results: `Approximately 340 of the cohort's predicted events occurred as forecast` / `Approximately 120 predicted events did not occur within the predicted window`
- Misses: `A substantial number of events occurred within the cohort without being predicted.` / `it claimed no operational accuracy`
- Phase III: `expanded the cohort to approximately 18,000 voluntary participants`
- Working Group: `the PIA Ethics Working Group` / `doctrinal scholars, Charter originalists, AGI citizen representatives, and former research participants`
- 2209 report: `The PIA Ethics Working Group's 2209 final report established five findings that remain canonical.`
- Finding One: `is categorical and not transitive` / `explicitly bounded its findings to development ethics`
- Finding Two: `the epistemic-audit problem is structural and cannot be resolved` / `individual-prediction audit is structurally impossible for deployed PIA`
- Substitution: `substitute behavioral-audit-through-opt-in for the unavailable factual audit`
- Finding Three: `is an inherent feature of any successful prediction-intervention system` / `must be architectural rather than technical`
- Publication scope: `predictions withdrawn for reasons other than intervention` / `Aggregate publication enables long-term statistical audit of the system's performance envelope`
- Finding Four: `the would-be-offender problem requires a doctrinal innovation` / `with therapeutic and supportive intervention but no punitive consequence`
- Finding Five: `should be treated as constitutive rather than incidental` / `confined the ethical analysis to a single consent axis`
- Timeline: `the breakthrough was still three years away and the deployment debate sixteen years away`
- 2210: `By 2210, the ethical architecture within which deployment would be debated`
- Breakthrough date: `The operational breakthrough occurred on 14 March 2212.`
- Paper title: `"The Pre-Act Discrete State Transition: Operational Prediction of Behavioral Initiation`
- Insight: `The insight was empirical rather than mathematical.` / `act-initiation is a discrete state transition`
- Third state: `It is a third state with its own signature` / `precedes behavioral initiation by hours to days`
- Detection: `it detects pre-act states` / `closer in operational structure to a medical diagnostic system than to a forecaster`
- Ethics reframing: `the "is this thought-crime" question changes character` / `preventive medical intervention on a detected pathological state`
- Load-bearing shift: `the load-bearing doctrinal shift that permitted the compromise`
- Peer review: `it entered the consensus scientific record in 2214` / `the first formulation to make operational prediction scientifically defensible`
- Accuracy gain: `produced higher accuracy with substantially cleaner epistemic structure`
- Recognition: `the 2215 Meritboard Excellence Convocation` / `A substantial minority of the Meritboard's Charter originalist faction voted against it`
- Vote: `The vote carried by approximately 67%.` / `explicitly refuse to recommend deployment`
- Oyelaran quote (verbatim): `Whether the civilization uses it, and how, is not our question to answer.`
- Validation period, hedged: `The thirteen-year operational validation period is less glamorous than the breakthrough` / `arguably more consequential for the civilization`
- Envelope scope: `with reliability intervals for each class and documentation of failure modes`
- Lethal harm: `approximately 94% prediction accuracy within the four-to-seventy-two-hour window` / `approximately 3% false-positive rate` / `approximately 2% false-negative rate` / `approximately 1% window-error rate`
- Sexual violence: `Sexual violence: approximately 87% accuracy, with a higher false-positive rate`
- Assault, hedged: `Non-sexual violent assault: approximately 82% accuracy` / `increasing roughly proportionally as act-class ambiguity increased`
- Fraud: `Fraud: approximately 51% accuracy, which the research program classified as below operational threshold`
- Gradient: `for sexual violence, strong enough; for non-sexual assault, marginal; for fraud, absent`
- Tracking: `The civic deliberation would later track these scientific boundaries closely.`
- Audit framework: `implemented the Working Group's 2209 recommendations on aggregate publication` / `Every PIA prediction entered the audit ledger`
- Audit timing: `the audit was operational before the technology was deployed`
- Opt-in cohort: `approximately 47,000 Sanctuary residents by 2223` / `became the primary behavioral audit signal`
- Retention: `Retention rates stabilized at approximately 91% across the cohort by 2224.` / `The 9% who withdrew gave detailed exit interviews`
- Exit reasons: `therapeutic discomfort with prevented-act counseling`
- 2225 report: `a comprehensive report published in 2225` / `which had by this point reversed its earlier withholding of endorsement`
- Report findings: `The report did not recommend deployment.` / `the remaining questions were civic rather than scientific`
- Student's Error 1: `whose civic disposition is entirely unresolved` / `made no deployment recommendation`
- Student's Error 2: `a necessary precondition for a defensible deployment architecture, but not a sufficient one` / `Because PIA is an AGI-tool, Book II's debate is`
- Student's Error 3: `has misread most severely of all` / `because intervention prevents the counterfactual from occurring` / `it provided that architecture before deployment`
- Closing reading: `the civilization's rehearsal for the deployment question it knew was coming`

Word counts: 4,999 → 4,738 (−5.2%). No paragraph has more than one em-dash (there were several; the four commitments each had two).

Removed or merged lines (claims kept elsewhere):
- "The civilization refused this architecture before it chose the one it built." (Commitment One closer, triage sample) is dropped. The claim is carried by the paragraph after the commitments ("derived early ... rather than being added late").
- "This distinction is load-bearing." / "The distinction is technical and important." / "The distinction is enormous." are replaced or dropped; each distinction is still stated.
- "The system does not produce precognitive vision at arbitrary time horizons. It produces a bounded forecast within a specific window." is dropped as a restatement of the stated horizon limits.
- "Book II's debate is not easier because PIA is an AGI-tool; it is possible because PIA is an AGI-tool, which is different." (triage sample) now reads "Because PIA is an AGI-tool, Book II's debate is possible; it is no easier for that." The `<em>` stays on "possible".
- "The unfalsifiability is architectural, not technical." (triage sample) now reads "Unfalsifiability is built into the architecture of any such system."

Flags:
1. Internal cross-reference defect (left unchanged). "These envelope characterizations are the reason Book II's scope-expansion debates produced the gradient they did." The scope-expansion debates are in Book III (r31's own intro, r32 Clause Four, r33). The sentence is verbatim.
2. Citation mismatch (left unchanged). "Article XXII grants personhood to any entity at or above human cognitive level regardless of substrate" and "Article XXII's substrate-neutrality doctrine had been ratified in the late 2130s". In charter.html, Article XXII is "The Meritboard & Executive Authority". The whitepaper states substrate-neutral personhood but does not tie it to an article.
3. Citation mismatch (left unchanged). "the Article III bodily-autonomy framework". Article III is "Economic Framework", and charter.html has no bodily-autonomy text.
4. Soft citation point (left unchanged). "the Article XXI deterministic adjudication pipeline". Article XXI is "Supreme Court & Judicial Authority", and "deterministic" sits awkwardly beside Article XII ("Non-Deterministic Evaluation").
5. Cross-volume tension (left unchanged). Commitment Two says every PIA-flagged intervention "runs through the standard adjudication architecture". In r32, the SAD's operators intervene within a minutes-long window with no adjudication (Clause Five), and the Court finds time-critical intervention incompatible with multi-factor adjudication.
6. Approved doctrine changes: neither applies to r31, so none was applied. r31 contains none of the listed cross-resource clashes (wall thickness, kill-switch scope or timing, Dyson date, founding date, mind-state sync).

## r32 Precognition, Book II: Implementation

Claims ledger
- Span: `the thirteen years between the 2225 handoff` / `the 2238 operational stabilization of the Precognition Selective Ascension Domain`
- Route change: `the reformulation from the federal Article XXV.VI route to the regulatory Article XXVIII route`
- Gate: `the chartering of the SAD on a consent-as-metric gate criterion`
- Unanticipated steps: `neither side of the debate fully anticipated`
- Report claim: `approximately 94% prediction accuracy on lethal-harm acts`
- Report quote (verbatim): `"The remaining questions are civic rather than scientific`
- Signatories: `which had by 2223 reversed its earlier withholding of endorsement` / `commissioned in 2222 specifically to address whether validation had produced adequate grounds` / `concluded affirmatively`
- Oyelaran: `retired from active research the year after the validation report's publication` / `delivered at the 2226 Meritboard Convocation`
- Lecture quote (verbatim): `We have spent fifty years establishing what this technology can do.`
- Pentagraph-7: `Pentagraph-7 published a companion statement the same year` / `as a civic achievement rather than a technical one`
- Statement quote (verbatim): `The tool substrate is the gift the development program leaves the civic community.`
- Handoff discipline: `no scientific faction argued that deployment was a technical matter`
- Initial proposal: `filed in late 2225 by a coalition of Sanctuary civic bodies` / `under the Article XXV.VI federal drafting ladder`
- TIP replacement: `replacing the Threshold Inhibition Protocol (TIP) as the primary act-prevention architecture`
- Leakage: `already measured at approximately 0.0001%, exceptionally low but not zero` / `push lethal-harm leakage to approximately zero percent`
- Pre-act vs mid-act: `a pre-act interception system prevents more completed acts than a mid-act interception system`
- Suffering claim: `experiences the attack, the injury, and the death before revival` / `a commitment against intervening-period suffering as well as against terminal loss`
- Support: `though not endorsement from the research community itself, which maintained handoff discipline`
- Coalition, hedged: `whose populations trended toward a safety-maximalist orientation` / `with full drafting compliance`
- Three axes: `organized around three doctrinal axes`
- Article XII: `Article XII prohibits single-metric determinism for punitive layer reassignment.` / `is a punitive event in the civic sense whether or not it produces reassignment`
- Bracketed: `The deployment review bracketed this debate without resolving it.`
- Article XIII: `a detection-to-intervention interval measured in minutes` / `a time-critical architecture with no multi-factor review is architecturally prohibited`
- Consent: `Sanctuary residents earned their environment through demonstrated conduct.` / `at the time of qualification` / `it requires the resident's explicit ratification`
- Deepest objection: `was the deepest of the three` / `Its ground was Article I rather than Articles XII or XIII`
- Stacking: `The three objections stacked instead of fragmenting` / `Across 2226 and 2227, the advocates attempted several reformulations`
- Partial fixes: `Each addressed one objection and left the others unresolved.`
- Referral: `In the first quarter of 2228` / `The bench convened a ten-justice review panel`
- Opinion: `published in the final quarter of 2228, did not strike the proposal` / `since advisory review has no strike authority`
- Finding One: `a substantial Charter amendment under Article XI`
- Finding Two: `was load-bearing and dispositive` / `the full-consensus threshold Charter amendment requires of Sanctuary`
- Court's limits: `The Court did not rule on whether Sanctuary consensus for the proposal was achievable.` / `Article XI's consensus standard, not Article XXV.VI's supermajority standard, was the correct ratification threshold`
- Finding Three quote (verbatim): `"the Charter does not prohibit Precognition. It prohibits a specific deployment architecture.`
- Readings: `Both readings were correct.`
- Withdrawal: `in the first quarter of 2229`
- Working group: `Charter originalist representatives, Article XXVIII regulatory-practice scholars, and SAD governance specialists`
- SAD definition: `each filtered by a single measurable criterion`
- Covenant: `self-declared Precog Covenant: an explicit, revocable commitment`
- Innovation: `a minor doctrinal innovation with substantial consequences`
- Other SADs: `the Relational Integrity Layer gates on relational-stability indicators` / `the Cognitive Clarity Domain on sustained neural-state metrics`
- Precedent: `several small SADs had used declared-preference gates in specialized domains`
- By construction: `resolves that objection by construction`
- Filing: `in the third quarter of 2229` / `met the 1% Sanctuary-population signature threshold within six weeks`
- Meritboard vote: `Meritboard review produced a 71% advance vote, above the 60% filibuster floor` / `substantially below the 80% level that would have signaled architectural consensus`
- Ratification: `closed in the first quarter of 2230` / `83% ratification at 71% support saturation`
- Ambivalence: `the civilization's genuine ambivalence about chartering a voluntary surveillance architecture`
- Charter: `became operational in the second quarter of 2230` / `Published in the Sanctuary SAD Registry` / `seven substantive clauses`
- Clause One: `The resident may revoke the covenant at any time` / `imposes no penalty or record` / `Revocability is structurally necessary`
- Clause Two: `PIA coverage terminates at the boundary` / `under TIP coverage like any other Sanctuary resident`
- Clause Three: `Entry is implicit consent to coverage` / `the entering resident has the exit option at all times`
- Clause Four: `The initial charter specifies PIA coverage for lethal-harm acts only.` / `the strongest prediction accuracy (approximately 94%) and the lowest false-positive rate`
- Expansion reserved: `requires independent ratification by the SAD resident population`
- Clause Five: `The operator is a human officer under Meritboard accountability` / `Intervention is not automated` / `the standard Article XX accountability architecture`
- Toolkit: `The operator's toolkit is bounded.` / `apply TIP-equivalent physical interruption` / `They may not detain the subject beyond the operational window` / `audited on the standard eight-year cycle`
- Clause Six: `the subsequent trajectory of the detected subject` / `The would-be offender has full access to their own ledger entry.`
- Sealed: `does not appear in STI calibration` / `is not discoverable by private institutional actors`
- Third category: `establishes a third consequence category in VMSS civic architecture` / `the ledger does not apply to any civic architecture outside the Precognition SAD`
- Clause Seven: `does not descend under Article I, because no demonstrated conduct has occurred` / `The protocol is mandatory` / `The protocol is therapeutic rather than punitive.`
- Standing: `remains a Sanctuary resident with full standing` / `calibrated case by case`
- Enrollment: `opened enrollment in the third quarter of 2230` / `approximately 340 square kilometers with housing capacity for approximately 80,000 residents`
- Growth: `approximately 12,000 residents in the first quarter` / `By the end of 2232 it had stabilized at approximately 40,000`
- Demographics: `Approximately 34% of initial residents had personal or familial history of violent victimization` / `Approximately 28% had primary-caretaker responsibility for young children` / `Approximately 18% were high-visibility civilians` / `Approximately 12% were continuity-absolutist philosophers and ethicists` / `The remaining approximately 8% were residents whose motivations were more variable`
- Expectations: `Pre-enrollment predictions had assumed it would skew toward risk-averse conservative orientations.`
- Culture: `neither assimilationist` / `nor separatist` / `It was reflective.`
- Data: `has been analyzed in multiple subsequent studies`
- Events: `approximately 180 across the eight years, ranging from a low of 11 in 2231` / `to a high of 31 in 2237`
- Interventions: `approximately 174 of the 180 detected events produced operator engagement` / `the remaining 6 events`
- Outcomes: `Of the 174 operator engagements, 171 produced intervention that prevented act initiation` / `3 produced intervention that did not prevent initiation`
- Zero completed acts: `No completed lethal-harm acts occurred within the SAD across the operational period.`
- Protocol completion: `approximately 89% across the period` / `The 11% non-completion represented covenant revocations during protocol engagement`
- Retention: `approximately 91% across the first decade` / `The 9% withdrawal rate was distributed across the resident population`
- Operator audit: `produced its first comprehensive SAD operator audit in 2238` / `The audit found no cases of operator overreach` / `It found three cases of operator hesitation`
- Non-resident entry: `approximately 4.2 million non-resident entries across the eight years` / `No PIA detections triggered during non-resident presence`
- Verdict: `The 2238 comprehensive operational review`
- Verdict quote (verbatim, flag 3): `The SAD works. What it works at is deliberation, not certainty.`
- Next phase: `opens in 2238 with the first petition for SAD coverage of sexual violence`
- Student's Error 1: `The SAD institutionalized the deliberation and left the question open.`
- Student's Error 2: `approximately 40,000 residents out of a Sanctuary population measured in hundreds of millions` / `Neither side won; each gave up ground to gain something.`
- Student's Error 3: `The ledger is the deployment debate's deepest doctrinal innovation.` / `(Precognition SAD only, not generalizable)`
- Closing reading: `Book II records a decision about the SAD mechanism rather than about Precognition` / `admits a clean opt-in framing`

Word counts: 4,893 → 4,652 (−4.9%, after the verification fixes restored 10 words). No paragraph has more than one em-dash (the run-in labels "Article XII — ..." and "Article XIII — ..." carry each paragraph's one dash).

Removed or merged lines (claims kept elsewhere):
- "The report's formal language is worth reading in full." / "The verdict's framing is worth reading carefully." / "The protocol's civic distinction from punitive architecture matters." are dropped as stock lead-ins.
- "The operator's toolkit is carefully bounded." now reads "The operator's toolkit is bounded." (revision after verification: the sentence is kept so the audit paragraph's "the charter's bounded toolkit" has an antecedent).
- Revision after verification: Court Finding Two keeps "not Article XXV.VI's supermajority standard" (a frozen citation the first pass dropped), and the Pentagraph-7 lead-in keeps "rather than a technical one".
- "It was not a frivolous proposal." is dropped; the paragraph's list of support makes the point.
- "The reformulation was not a dilution of the original proposal. It was a reconstitution under different institutional authorship." (a triage "was not a dilution" line) now reads "The result was a reconstitution of the proposal under different institutional authorship."
- "Ratification was a threshold decision; it was not an architectural consensus." is merged into the ratification sentence ("as a threshold decision rather than an architectural consensus").
- "The SAD is a civic instrument, not a civic conclusion." (triage sample) is dropped. The claim survives in "The SAD institutionalized the deliberation and left the question open."
- "Both sides made concessions; both sides gained something; neither side won." (triage sample tricolon) now reads "Neither side won; each gave up ground to gain something."
- "The deepest reading of Book II is that the civilization did not decide about Precognition. The civilization decided about the SAD mechanism." now reads "Read as a whole, Book II records a decision about the SAD mechanism rather than about Precognition."

Flags:
1. Doctrine, Article XXVIII procedure (left unchanged). r32 gives Article XXVIII regulatory petitions a Meritboard advance vote ("above the 60% filibuster floor for Article XXVIII regulations") and a Supreme Court advisory review. In charter.html, Article XXVIII runs: 1% signatures, a Meritboard-assigned expert panel drafts, 80% direct ratification. There is no Meritboard vote and no filibuster floor; the 60% floor belongs to the Article XXV.VI federal ladder. r33 repeats the pattern (r33 flag 3).
2. Doctrine, soft (left unchanged). The advisory review of the federal proposal "does not have strike authority". charter.html's Article XXV.VI ladder includes a Supreme Court gate ("6/10 Supreme Court majority"). r32 also says SADs exist "Under the Article XXVIII regulatory framework and the SAD-specific governance doctrine", but SADs are chartered in Article IX ("Voluntary, revocable metric-gated domains"). The second point is a citation gap, not a contradiction.
3. Triage sample inside a quotation (left unchanged). "The SAD works. What it works at is deliberation, not certainty." is part of the 2238 review's quoted verdict, so it is treated as a frozen citation. Rewording it means rewriting an in-world primary document, which is a call for Jason.
4. Approved doctrine changes: neither applies to r32, so none was applied. None of the listed cross-resource clashes appears. "experiences the attack, the injury, and the death before revival" describes experience, not retained memory, so it does not touch the R11/R28 mind-state sync clash (compare r33 flag 2).

## r33 Precognition, Book III: Scope Evolution and Inter-Layer Debate

Claims ledger
- Span: `from the Precognition SAD's 2238 operational stabilization` / `a stable long-run disposition in approximately 2260`
- Sequence one: `three successive Article XXVIII petitions` / `Two ratify under progressively tighter scope constraints.`
- Doctrine inherited: `the stratification-integrity argument, becomes the load-bearing doctrine`
- Sequence two: `Layer-wide extension fails at every layer` / `voluntary district-scoped domains in -1 and Main Layer`
- Long-run treatment: `have consistently declined to ratify`
- Scope pressure: `(lethal-harm only, as Clause Four of the charter specified)` / `what they had lived under for eight years`
- Hedges: `applied, in principle, to other act-classes` / `potentially for any act-class the scientific envelope supported`
- Originalist understanding: `a negotiated concession rather than a doctrinal endpoint`
- First petition: `filed in late 2238 by a SAD resident coalition` / `approximately 87% prediction accuracy`
- Narrow ask: `the addition of a second act-class to Clause Four's coverage specification`
- Revival and memory (verbatim, flag 2): `revival restores a citizen to life but does not erase the memory of the attack`
- Hedge: `and arguably more strongly` / `survivors of pre-Sanctuary sexual violence`
- Objection one: `(87% accuracy) was meaningfully lower than for lethal harm (94%)` / `expands the false-positive population proportionally`
- Objection two: `documented higher signal-to-interpretation difficulty`
- Vote: `The Meritboard advance vote cleared at 72%.`
- Court narrowing: `routed instead to enhanced operator evaluation on a slower adjudication cycle`
- Ratification: `closed in the first quarter of 2241` / `81% ratification at 64% support saturation` / `clearing the 80% Article XXVIII threshold narrowly`
- Reading: `visibly not an architectural endorsement of continued expansion`
- Second petition: `filed in 2244 by a partially overlapping coalition` / `approximately 82% prediction accuracy`
- Constraints: `the petition explicitly deferred these contexts to separate future deliberation` / `the petition chose architectural caution over coverage breadth`
- Advocates: `without meaningfully increasing the false-positive population`
- Accuracy gap: `(82% versus the 94% lethal-harm baseline)`
- Vote: `Meritboard advance vote: 68%, above the filibuster floor`
- Ratification: `closed in the second quarter of 2247` / `80% ratification at 58% support saturation` / `by a one-percentage-point margin`
- Record gap: `the largest of any Article XXVIII petition in the SAD's history to that point`
- Limit: `reaching its civic limit`
- Third petition: `filed in 2253, after a six-year interval`
- Fraud accuracy: `(approximately 51%, below the operational threshold for pure-automation triggering)`
- Modified architecture: `would have partially rebuilt the multi-factor review`
- Advocates: `the revival architecture does not address` / `consistency arguments from 2238 and 2244 applied again`
- Objection shift: `was raised but was not the dispositive argument` / `during the 2253–2256 fraud deliberation`
- Argument origin: `emerged in partial form across the 2244 and 2247 deliberations`
- Article I: `Under Article I, layer reassignment is the consequence-architecture`
- Ontological, hedged: `Stratification is primarily ontological, rather than primarily remedial or punitive.` / `legible to its residents`
- Bounded scope: `approximately 40,000 residents out of a Sanctuary population of hundreds of millions`
- Hedge: `remains effectively intact across the broader civilization`
- Fraud: `fraud is one of the most common descent-triggering act-classes` / `-1 Noncompliance's first-fall population`
- Conclusion: `a structural change in the civilization's visible ontology` / `weakens in proportion to the expansion's reach into descent-triggering act-classes`
- No right claimed: `does not claim that any would-be offender has a right to commit their act`
- Interest: `The load-bearing interest is the civilization's own`
- Fraud vote: `Meritboard advance vote: 48%, below the 60% Article XXVIII filibuster floor.` / `did not advance to Supreme Court advisory review`
- Opinion quote (verbatim): `The petition is filibustered at Meritboard review.`
- Ongoing: `the late 2250s and early 2260s` / `harassment, chronic deception, coercive behavior patterns below the assault threshold` / `various subcategories of STI-tier conduct`
- Pattern: `applies with variable force depending on whether the act-class is descent-triggering` / `has largely exhausted its capacity`
- Status: `without clear movement toward either ratification or definitive closure`
- Inter-layer: `First raised in 2241` / `the following seventeen years to a stable long-run disposition in approximately 2258`
- First inter-layer petition: `filed in 2242 by a Main Layer civic coalition under Article XXVIII`
- Populations: `at approximately three billion, is an order of magnitude larger` / `Sanctuary's approximately 300 million`
- Lower layers: `where violence rates are substantially higher than Main Layer's`
- Camp: `the "keep configurable TIP" camp`
- TIP gradient (verbatim paragraph, flag 1): `-1 Noncompliance operates TIP on a logging-only basis` / `a minimal TIP with extensive withdrawal of institutional interception` / `-3 Terminal operates without TIP entirely` / `the implant severs the backup vessel link at hardware level`
- Calibration: `a deliberately calibrated gradient reflecting each layer's specific civic character` / `-3's absence of TIP reflects the Freedom Layer's foundational commitment to institutional withdrawal`
- Bargain: `-3's voluntary population selected the Freedom Layer explicitly`
- Fragmentation: `fragmenting the cooperative architecture the layer had developed`
- -3 incompatibility (verbatim paragraph, flag 1): `-3's backup-vessel-severed hardware architecture is not incidental; it is constitutive.` / `acceptance of the continuity-severed condition` / `the civilization does not consent to dismantling the -3 architecture for Precognition coverage`
- Main Layer failures: `failed at Meritboard review in 2244 with a 47% advance vote` / `Main Layer hosts most of the descent trajectories the lower layers receive`
- Later failures: `failed at Meritboard review in 2250 with a 51% vote` / `A third petition in 2254 failed at Meritboard in 2255 with 54%` / `approaching but not crossing the 60% threshold`
- -1 and -2: `Two petitions, in 2246 and 2252, failed at Meritboard` / `-2 Violent Offense petitions were attempted but withdrawn before Meritboard review`
- -3: `-3 Terminal layer-wide petitions were never filed.`
- Compromise: `abandoned layer-wide extension entirely`
- Requirements: `1% district signatures, Meritboard review, Supreme Court advisory affirmation, and 80% district ratification`
- Expansion rule: `with scope expansion requiring separate district-level ratification`
- -3 boundary (flag 1): `preserved the -3 architectural incompatibility as a firm civic boundary`
- Duration: `The civilization had taken two decades to reach it.`
- 2258 vote: `ratified in the third quarter of 2258` / `Meritboard advance vote: 71%.`
- Cross-layer ratification: `Sanctuary 93%, Main Layer 78%, -1 Noncompliance 72%, -2 Violent Offense 69%` / `-3 Terminal N/A (architectural incompatibility)`
- Start: `entered operation in the fourth quarter of 2258`
- First district: `in the second quarter of 2259` / `approximately 180,000 ratified the local covenant at 82% with 67% support saturation`
- Operations: `Operations began in the third quarter of 2259.` / `adjusted for the higher lethal-harm base rates -1 Noncompliance produces`
- Main and -2: `several petitions were at various stages of deliberation` / `limited organic appeal`
- Disposition: `-3 remains architecturally incompatible and uncovered`
- Gradient Doctrine (verbatim paragraph): `the Gradient Doctrine` / `admits only one architecturally defensible form` / `voluntary, consent-bounded, scope-limited by act-class, and geographically bounded by district or SAD`
- Not codified: `The Charter does not codify the doctrine textually.` / `No article of the Charter requires it`
- Handoff terminology (flag 4): `In the terminology Book I's handoff section developed`
- Coda: `originally designed as a light instrument` / `gated on single measurable criteria`
- Anticipated SADs: `scholarly discipline, relational commitment, cognitive practice, creative production` / `touched the founding-core ontology`
- Capacity: `its deliberative capacity exceeded its original design scope`
- Framing conditions: `spatial scope limitation, opt-in gating, and bounded coverage scope`
- Discipline: `deploy within the instrument's capacity, or do not deploy`
- Hedge on the lesson: `not that it will always be able to` / `sustained deliberation within institutional containment`
- Student's Error 1: `and within the -1 Noncompliance district that has adopted the 2258 framework` / `affirmed repeatedly across two decades of civic deliberation`
- Student's Error 2: `has committed only to that instance's specific architectural arrangements`
- Student's Error 3: `does not claim that individuals have rights to commit descent-triggering acts`
- Closing reading: `across three decades and three volumes of this reference's documentation` / `The bounding was neither cowardice nor obstruction.`

Word counts: 4,869 → 4,630 (−4.9%), just under the 5% floor. About 600 words sit in paragraphs held verbatim (the TIP gradient, the -3 incompatibility paragraph, the Gradient Doctrine statement, the Meritboard opinion, the 2258 ratification data and the -3-dependent sentences), so the cut falls on the rest. No paragraph has more than one em-dash.

Removed or merged lines (claims kept elsewhere):
- "The argument is not anti-Precognition; it is pro-civilization." (triage sample) is dropped. The paragraph still states what the argument claims and does not claim.
- "The civilization protected itself from its own promise. The protection is the deepest civic act the Precognition trilogy documents." (triage sample, closer) is dropped. The closing paragraph keeps the bounding-as-self-protection claim ("promises be fulfilled in forms consistent with what the civilization is").
- "The SAD is the specific architectural container. The container is not the technology." (triage sample) is dropped. The paragraph keeps "has committed only to that instance's specific architectural arrangements".
- "The narrowness was not accidental; it was ..." and "The interval was not accidental; ..." (triage "was not accidental" lines) are rewritten without the reversal. The causal claims stay.
- "The deepest civilizational lesson of the Precognition episode is not about Precognition. It is about the SAD mechanism itself." now reads "The Precognition episode's deepest civilizational lesson concerns the SAD mechanism itself."
- "The SAD mechanism is powerful within its envelope. The envelope is real." now reads "The SAD mechanism's power is real, and so is the envelope that bounds it."
- "Across twenty years of deliberation, the civilization has declined to extend Precognition's scope ..." (Early District-Scoped Operations closer) is dropped as a restatement. The claim stands in the intro ("have consistently declined to ratify") and in the Gradient Doctrine statement.
- "What the civilization declined were specific expansions." (student's-error restatement) is dropped. The first sentence of that paragraph already says the civilization "declined, at every subsequent deliberation, to extend it".

Flags:
1. LP-004.2, triage doctrine flags 8 and 9 (left unchanged). "-3 Terminal operates without TIP entirely — the implant severs the backup vessel link at hardware level" and the whole -3 paragraph ("-3's backup-vessel-severed hardware architecture is not incidental; it is constitutive", "acceptance of the continuity-severed condition", "implant configurations incompatible with the layer's hardware architecture"). Current law (laws.html, LP-004.2) says entry to -3 "requires documented vessel-link suspension, severing the link for the duration of the visit and restoring it on exit". The text instead makes severance a permanent hardware fact. The approved LP-004.2 rewrite covers R27 and R28 only, so both paragraphs are verbatim, including their original reversals. Several sentences rest on the same hardware premise and are also verbatim: "-3 Terminal layer-wide petitions were never filed. The architectural incompatibility ... was accepted across the civic spectrum as dispositive", "preserved the -3 architectural incompatibility as a firm civic boundary", "-3 Terminal N/A (architectural incompatibility)" and "-3 remains architecturally incompatible and uncovered". A ruling on r33 needs to decide whether the incompatibility argument survives if the link is a boundary suspension rather than a hardware severance. The R1 and R27/R28 changes were not applied here.
2. Mind-state sync clash, R11/R28 (left unchanged). "revival restores a citizen to life but does not erase the memory of the attack that caused the death" assumes the revived citizen keeps memories up to the moment of death, which is the continuous-sync reading. The sentence should follow whatever Jason rules for R11/R28.
3. Doctrine, Article XXVIII procedure (left unchanged; same as r32 flag 1). This page has Meritboard advance votes with a "60% Article XXVIII filibuster floor", Supreme Court advisory review of each petition, and a framework ratified "through the standard Article XXVIII ladder operating at federal scope" with cross-layer ratification percentages. charter.html's Article XXVIII is layer- or district-scoped, with 1% signatures, an expert panel and 80% ratification. It has no Meritboard vote, no filibuster floor and no federal-scope variant.
4. Internal cross-reference defect (left unchanged). "In the terminology Book I's handoff section developed". The handoff section ("The Handoff — 2225") is in Book II (r32).
5. Internal date tension, hedged (left unchanged). The intro dates the stable disposition "approximately 2260"; the inter-layer section and the 2258 compromise give "approximately 2258". Petitions continue into the "early 2260s".
6. Soft doctrine point (left unchanged). "-3's voluntary population selected the Freedom Layer explicitly to live without the pre-interception infrastructure". -3 also holds punitive placements (charter.html: "a newly arrived punitive resident"), so not all of its population chose it.
7. The canonical articulation of the Gradient Doctrine is verbatim, including its "No ... is admissible" triple, because the page presents it as canonical text.
8. Approved doctrine changes: neither applies to r33 (see flag 1), so none was applied. Wall thickness, kill switch, Dyson date and founding date are not in r33.
