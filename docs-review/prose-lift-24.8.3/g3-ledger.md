# Prose lift 24.8.3, Resources group 3 (r8, r9) fidelity ledger

Source: `documents/resources-source.html` (unchanged). Edited blocks: `r8.html` (light edit) and `r9.html` (clarity edit) in this folder. Verifier: `g3-verify.mjs` (run from anywhere: `node "docs-review/prose-lift-24.8.3/g3-verify.mjs"`).

Conventions:
- Quotes are verbatim from the edited block after stripping tags, decoding entities (&rsquo; to ', &ldquo;/&rdquo; to ", &mdash; to —, &ndash; to –, &sect; to §) and collapsing whitespace. The verifier checks every backticked span in each page section against that page. Each quote is 15 words or fewer.
- Frozen and untouched: every tag and attribute, the h2 title, the grey subtitle line, every h3 heading and every bold run-in label. Neither page has a table. The verifier compares tag sequence, table cells, and headings/labels/subtitle byte for byte.
- Word counts cover the whole block's visible text (headings included), counted by the verifier. The triage's counts (2,524 and 2,333) use a different tokenizer.
- Em-dash cap: at most one per paragraph or intro block, now met on both pages.

## r8

Mode: light edit. Only the triage-quoted lines, lines like them, and em-dash clusters were touched; the mechanism sections are otherwise byte-identical.

Word count: 2,472 → 2,365 (−4.3%). Max em-dashes per paragraph: 4 → 1.

What changed: intro drops "Almost none of them do" and the blanket "the most misunderstood component of the STI system" (the "more constrained and more powerful" claim stays); the "The AI does not have opinions. It has weights." pair and the "is not a human judgment. It is a computation" reversal became direct statements; the "Public signals amplify trajectory. They do not create it." closer was cut (the same claim is stated just before it and again as the "cannot create trajectory" constraint); "This is not a bug. It is a deliberate design feature." became "The difference is deliberate."; "This is not a judicial proceeding. It is a threshold..." and "A citizen does not file a report. They express a signal" reworded without the reversal; "load-bearing architecture, not administrative convenience" became "the rest of the architecture depends on those limits"; the chiasmus "does not treat all opinions as equal because all opinions are not equally informed" became a plain statement; the staccato reputation-laundering run and the "The formula is the same. ... The score reflects both." tricolon were merged; the Design Logic closer ("not trying to replace ... It is not trying to replace ..." plus "The foundation cannot be overridden. The texture cannot be ignored. The score is richer than either input alone.") became one sentence on the composite; the student closer was cut to two sentences with the same claim. Nine em-dash clusters were broken up with colons, commas or parentheses.

Claims ledger:
- Not purely machine-observed: `The STI is not purely machine-observed.`
- Population signals as weighted input: `population-scale endorsement and disapproval signals as a weighted input`
- Citation: `Most students meet this fact in Whitepaper §5.6`
- Constrained and powerful: `both more constrained and more powerful than a casual reading suggests`
- Design goal: `either a popularity contest or an opaque machine judgment`
- Two channels: `two independent channels that converge into a single score update`
- Implant data: `intent trajectory, motor execution, environmental conditions, relational dynamics`
- AR corroboration: `The AR surveillance infrastructure (drones, cameras, environmental sensors) corroborates the implant telemetry`
- Seven domains: `civic compliance, contribution, relational integrity, social conduct, cognitive integrity, economic behavior, crisis response`
- Preliminary adjustment: `produces a preliminary score adjustment`
- No human judgment: `The assessment is a computation with no human judgment in it.`
- Formula citation: `applies the formula (proprietary, classified, dynamic — §5.4.1)`
- Weights evolve: `Those weights evolve as the AI governance system's understanding of trust matures`
- Deterministic: `at any given moment the assessment is deterministic`
- Same act, same result: `the same act with the same contextual data produces the same preliminary adjustment every time`
- Signal properties: `These signals are voluntary, individual, and continuous.`
- Not a report: `Rather than filing a report, a citizen expresses a signal`
- Not votes: `The signals are not votes.`
- No override: `They do not override the AI's assessment.`
- No independent outcome: `They do not independently determine any STI outcome.`
- Named function: `acceleration or deceleration inputs`
- Faster gains: `will see faster STI gains than one whose conduct is equally positive`
- Faster decline: `receives broad public disapproval will see faster STI decline`
- Critical constraint: `public signals cannot move STI against the grain of observed behavior.`
- No volume down: `no volume of public disapproval can make the score go down`
- No volume up: `no volume of public endorsement can make the score go up`
- Direction: `The AI's preliminary assessment establishes the direction.`
- Speed: `The public signal input adjusts the speed.`
- Machine dominant: `the machine's observation is structurally dominant`
- No reversal: `It cannot reverse it.`
- Proximity-weighting: `The system applies proximity-weighting`
- Rationale: `proximity correlates with observational quality`
- Witness closer to AI quality: `closer to the AI's own observation in informational quality`
- Three axes: `The proximity gradient operates on three axes:`
- Physical axis: `The implant records location, so the system knows who was physically present.`
- Relational axis: `neighbors, colleagues, friends, family`
- Trajectory shift: `providing information about a trajectory shift that a stranger's signal cannot contain`
- Consequential axis weight: `carry the most weight of all`
- Hedge kept: `however close, fully possesses`
- Strongest axis: `Consequential proximity is the strongest axis`
- Compounding: `The three axes compound.`
- Highest weight: `produces the highest-weight signal`
- Lowest weight: `produces the lowest-weight signal`
- Informed weighting: `The system weights each opinion by how well informed it is.`
- Limits load-bearing: `the rest of the architecture depends on those limits`
- Cannot create trajectory: `cannot be damaged by public disapproval alone`
- District example: `If every person in a district signals disapproval`
- Popularity contest: `This constraint is what prevents STI from becoming a popularity contest`
- Ground truth: `the machine's observation is the ground truth`
- Depth: `at a depth and continuity no human observer can match`
- Intent trajectory: `The implant records intent trajectory, not just visible action.`
- Time horizon: `The AI reads patterns across months and years, not just incidents.`
- Protection: `protects citizens from moral panic, social prejudice, and collective misjudgment`
- Append-only: `is appended to the ledger, not substituted for prior entries`
- Both signals weighted: `both are visible, both are weighted, and the trajectory reflects the sequence`
- Named mechanism: `This prevents retroactive reputation laundering.`
- Cannot erase: `but it cannot erase the condemnation`
- Charter citation: `do not produce punitive layer reassignment (Charter Articles XII and XIII)`
- Two tracks: `Layer reassignment requires the criminal record log (Track 2), not the STI score (Track 1).`
- STI only: `Public signals feed into the STI score only.`
- No criminal pathway: `They have no mechanism to trigger the criminal evaluation pathway.`
- Figure: `A citizen whose STI drops to 10`
- Flagged not reassigned: `socially flagged and trust-gated, but not reassigned`
- Named framework: `the three-axis proportionality framework`
- Qualifying event: `Public opinion is not a qualifying event.`
- Two correction mechanisms: `Two correction mechanisms allow citizens to challenge the AI's own interpretation.`
- §5.7: `Civil court contestation (§5.7).`
- Local court: `may bring a contestation claim to a local civil court`
- Weighted modifier: `ingests as a weighted modifier on the original entry`
- Not erased: `The original record is not erased.`
- Appended: `The correction is appended, and both remain visible on the ledger.`
- Scope: `the category of dispute already has doctrinal precedent`
- Layer variation: `The quality of civil court infrastructure varies by layer.`
- Named gradient: `consistent with the doctrine's institutional withdrawal gradient`
- §5.8: `Popular signal correction (§5.8).`
- Collective dispute: `disputes the AI's characterization of a recorded event`
- Not judicial: `No judicial proceeding is involved.`
- Proximity threshold: `The threshold is weighted toward proximity`
- Population modifier: `a population-sourced contextual modifier that adjusts the STI impact of the event`
- Permanently visible: `both remain permanently visible on the ledger`
- Continuous vs event-specific: `public signals are ongoing, continuous, and feed into every score update`
- Threshold-gated: `Popular signal correction is event-specific, threshold-gated`
- Formula identical: `The STI formula is identical across all layers.`
- Public rating varies: `What varies is the public rating component`
- +1 Sanctuary: `The peers scoring conduct in +1 Sanctuary`
- Lower-layer standard: `The same conduct rated by the population of –2 or –3`
- Deliberate: `The difference is deliberate.`
- Context legitimate: `The doctrine treats context as a legitimate variable in reputational assessment.`
- Near-universal: `holds with near-universal consistency`
- Hedge kept: `The same rudeness in –2 may register as unremarkable`
- Movers keep score: `(through visitation or elective residency) carries the same STI score`
- Visitor in –3: `A Sanctuary resident visiting –3 receives public signals`
- Hedge kept: `Their STI may move differently in –3`
- Formula vs environment: `The formula is the same everywhere; the signal environment is layer-specific.`
- Trust not purely behavioral: `social trust is not purely behavioral`
- Hedge kept: `the dimension of trust that behavior alone does not fully express`
- Not weaponizable: `ensures this human judgment cannot be weaponized`
- Only accelerate: `The public input can only accelerate or decelerate a trajectory`
- Informed outweigh: `The proximity-weighting ensures informed signals outweigh uninformed ones.`
- Track separation: `ensures public opinion cannot produce punitive layer reassignment`
- Composite: `with the machine as the structural foundation and the population as the contextual texture`
- Student misread: `"just likes and dislikes"`
- Both channels needed: `The STI needs both channels, and neither channel alone would produce a score`

Flags:
- No cross-resource clash from the list (wall thickness, kill-switch scope or timing, Dyson date, founding date, mind-state sync) appears in r8.
- Approved doctrine changes: none apply to r8. It has no "AI monitoring" line and no −3 visitor backup-vessel coverage. None applied.
- Consistent with current rulings, no change: "A Sanctuary resident visiting –3 receives public signals" fits the STI-and-public-ledger-run-in-−3 ruling; the Track 1/Track 2 separation fits STI-never-sets-placement.
- Blanket assertion removed: "the most misunderstood component of the STI system" was cut from the intro as a habit, not a claim. If Jason reads it as a claim, restore it from source.
- No internal defects found. The seven-domain list matches the whitepaper's measurement domains; "The weights, the dimensions, the computation" loosely calls them dimensions and was left as written (frozen dash line).

## r9

Mode: clarity edit.

Word count: 2,298 → 2,115 (−8.0%). Max em-dashes per paragraph: 3 → 1.

What changed: the "eliminate bribery, eliminate campaign politics…" anaphora became one list under one verb; "That is not the problem." was cut; "Not because they are smarter. Not because the system is rigged. Because the environment…" became one sentence with the same three claims; "The fluency is not biased. The distribution of fluency is concentrated." was cut (the previous sentence already says the metrics reward an advantage they do not create); "But resistance is not immunity." was cut; "This is not a designed solution. It is an emergent consequence" and "not because the subset cheated, but because…" were reworded without the reversal; the fragment run in the Imperial China paragraph was joined, and its "The exams were open. The preparation was not." restatement cut; "The deepest honest answer:" and the aphorism closer "A civilization that publishes the problem is better governed than a civilization that denies it." were cut; the three-student closer became two reader sentences plus the resource's conclusion. Blanket assertions were narrowed (see flags). Em-dash pairs became parentheses or colons.

Claims ledger:
- Cannot be bought: `cannot be bribed, lobbied, or campaigned into`
- No electoral apparatus: `no election cycle, donor class, political party, or revolving door`
- Ranking fills roles: `roles are filled from the top of the relevant ranking`
- Substrate openness: `(human, AI, AGI, cyborg)`
- Thesis: `the pathways to the metrics are sociologically concentrated`
- Three constraints: `three interlocking constraints`
- Article XXII, metric governance: `No entity ranked by a metric holds authority over the design of that metric.`
- Drift audit: `The Meritboard audits AI governance for drift`
- Mutual audit: `AI governance administers the metrics but is audited by the body those metrics produce.`
- Circularity broken: `The design breaks the circularity`
- Metric separation: `The Presidency and the Supreme Court draw from different Meritboard sub-rankings`
- Non-overlap: `produce non-overlapping populations of qualified candidates`
- Capture isolation: `capture of one ranking does not compromise the other`
- Faction: `A coordinated faction would need to dominate two unrelated competence metrics at once`
- Designed to prevent: `which the metric architecture is designed to prevent`
- Categories: `research output, cognitive metrics, institutional contribution, doctrinal comprehension, sustained STI record`
- Charter anchor: `The Charter anchors the metric categories to objectively measurable outputs`
- Article XI: `adding or removing a category would require the Article XI amendment gauntlet`
- Operational weighting: `The weighting within categories is operational (administered by AI governance)`
- Constitutional tier: `cemented at the highest tier of doctrinal protection`
- What the constraints eliminate: `these constraints eliminate bribery, campaign politics, constituency capture, revolving-door corruption`
- Self-grading: `the self-grading problem that undermines Earth-era meritocratic institutions`
- Procedural claim: `The system is procedurally open and procedurally incorruptible.`
- Openness gap: `Procedural openness does not guarantee sociological openness.`
- Hedge kept: `the pathways to performing well on them may not be`
- Uneven probability: `is not evenly distributed across the population`
- Uneven environments: `the environments that nurture exceptional performance are not evenly distributed`
- Sanctuary: `the civilization's densest educational infrastructure`
- MGD: `the richest MGD ecosystem for specialized development`
- Main Layer: `access to the same formal infrastructure but a different ambient culture`
- –1: `reputation-based commerce and private enterprise rather than institutional contribution`
- –2/–3: `survival, territorial navigation, and private order`
- No bias, no closure: `No metric is biased, and no pathway is formally closed.`
- Mentored by members: `was mentored by current or former Meritboard members`
- Hedge kept: `will, on average, outperform the citizen`
- Comparison layers: `–1's repair cooperatives or –3's frontier economy`
- Not smarter, not rigged: `The Sanctuary citizen is not smarter and the system is not rigged`
- Concentration: `concentrated in the layers where Meritboard members already live`
- Definition: `can still narrow leadership recruitment to a cultural subset of the population`
- No cheating: `without anyone cheating`
- Earth record (narrowed): `Earth's meritocratic systems repeatedly encountered this problem and did not solve it.`
- Dates and superlative: `(605–1905 CE) was the longest-running meritocracy in human history`
- Exam features: `open to any male citizen, tested a standardized curriculum, graded anonymously`
- Era hedge: `procedurally incorruptible by the standards of its era`
- Governing class: `drawn overwhelmingly from families that could afford tutors`
- Qing: `By the late Qing dynasty, the examination bureaucracy was sociologically closed.`
- Exams fair: `The exams remained fair`
- Narrow stratum: `concentrated in a narrow stratum of society`
- University features: `Standardized tests, blind grading, and need-based financial aid`
- University intake: `drawn disproportionately from families with educational resources, cultural capital`
- University not rigged: `The system is not rigged, but the pathway through it is sociologically concentrated.`
- Corporate claim: `claims to promote based on performance`
- Corporate concentration: `concentrated in demographics that already hold leadership positions`
- Corporate metrics: `The metrics are real, but the ecosystem that produces metric performance is narrow.`
- VMSS more resistant: `more resistant to these failure modes than any historical analog`
- Why: `constitutional rather than administrative`
- Structurally possible: `structurally possible`
- Scope of constraints: `protect against metric manipulation, not against environmental concentration`
- Partial resistance: `partial resistance to sociological narrowing`
- Substrate neutrality: `ranks human, AI, AGI, and cyborg entities in any combination`
- Independence: `structurally independent of any layer's sociological environment`
- AGI example: `outperforms every human candidate on the legal-interpretation ranking`
- Unintended: `The system did not intend this effect.`
- Any source: `the ranking accepts performance from any source`
- Output not origin: `The metrics are defined by output rather than origin.`
- Pedigree: `demonstrated capability rather than educational pedigree`
- Identical ranking: `is ranked identically to a Sanctuary citizen who produces the same output`
- Breadth: `The ranking spans every major discipline the civilization produces`
- Disciplines: `science, engineering, medicine, art`
- No single pipeline: `no single cultural pipeline can dominate the entire ranking`
- Hedge kept: `may not excel at frontier engineering or crisis response`
- §7.5: `The civic health participation metric (§7.5).`
- Article XX: `Article XX's accountability mandate includes surfacing engagement anomalies.`
- Top 100: `the top 100 entities on the executive-doctrinal-leadership ranking`
- Flag as anomaly: `the civic health metric would flag the pattern as an engagement anomaly`
- Publication duty: `The Meritboard is constitutionally required to publish its assessment of the anomaly`
- Population evaluates: `genuine merit concentration or sociological closure`
- Defenses incomplete: `The existing defenses are real but incomplete.`
- Three residuals: `Three residual vulnerabilities persist:`
- Metrics objective: `The Meritboard's metrics are objective.`
- Fluency: `reward a specific kind of institutional fluency`
- Advantage rewarded: `an advantage that the metrics do not create but do reward`
- Mentorship legal: `mentorship is a positive social contribution that the STI rewards`
- Self-similar cohort: `a self-similar cohort through cultural reproduction rather than exclusion`
- Mentored better prepared: `Candidates who had access to high-ranking mentors are better prepared for the metrics`
- Unaddressable: `real, legal, and unaddressable by anti-capture constraints`
- Visibility requirement: `To be ranked, your output must be visible to the AI governance system`
- Hedge kept: `A citizen producing exceptional work in a remote –3 cooperative may generate output`
- Infrastructure upper layers: `is concentrated in upper layers`
- Implant records all: `The implant records everything the citizen does`
- Recognized achievement: `research that is published, contributions that are institutionally recorded`
- Hedge kept: `may be metrically invisible despite being substantively qualified`
- No clean solution: `The merit problem has no clean doctrinal solution`
- Works as built: `The metrics and the anti-capture constraints work, and the procedural openness is real.`
- Second-order effect: `a second-order effect of environmental stratification`
- Intended differentiation: `different layers to develop different cultures, institutions, and ambient competencies`
- Consequence of success: `The merit problem is the governance consequence of that success.`
- Three levels: `The composable response operates on three levels:`
- Transparency: `The Meritboard's composition and rankings are public`
- Transparency limit: `Transparency does not solve the problem, but it keeps the problem from being invisible.`
- AGI no home layer: `An AGI has no home layer and no cultural pipeline`
- Dilution: `the more they dilute any human cultural concentration`
- Emergent, undesigned: `This emergent consequence of substrate neutrality was not designed`
- 974 years: `across the 974-year trajectory`
- Petition thresholds: `1% signature threshold, expert panel drafting, 80% population ratification`
- Article XXVIII: `would follow the standard Article XXVIII path`
- Jurisdiction: `they exceed regulatory jurisdiction and require the Article XI amendment gauntlet`
- Cost of meritocracy: `The merit problem is the cost of meritocracy.`
- Concentration over time: `will, over time, concentrate the environmental factors that produce that performance`
- Alternatives worse: `(electoral politics, hereditary authority, random selection)`
- Instruments: `(transparency, substrate diversification, regulatory pathway)`
- Without abandoning: `to manage it without abandoning the principle`
- Manageable: `The problem cannot be eliminated, but it can be managed`
- Manageable how: `visible, monitorable, and addressable`
- Sham misread: `A reader who concludes that the Meritboard is a sham has misread the evidence`
- Perfect misread: `has missed the sociological dimension those constraints do not reach`
- Best model: `a genuine, persistent, manageable cost of the best available governance model`
- Better instruments: `better than any alternative's instruments`

Flags:
- No cross-resource clash from the list (wall thickness, kill-switch scope or timing, Dyson date, founding date, mind-state sync) appears in r9.
- Approved doctrine changes: none apply to r9 (no "AI monitoring" line; no −3 visitor backup-vessel coverage). None applied. "The implant records everything the citizen does" in a −3 cooperative is consistent with STI and the public ledger running in −3.
- Blanket assertions narrowed (triage-directed habits, claim direction kept). Restore from source if Jason reads any as a claim:
  - "the most sophisticated governance architecture in the VMSS framework" was cut.
  - "the failure modes that have destroyed every previous meritocratic system" became "a failure mode that has undermined earlier meritocratic systems".
  - "undermines every Earth-era meritocratic institution" became "undermines Earth-era meritocratic institutions".
  - "Every meritocratic system on Earth has encountered this problem and failed to solve it." became "Earth's meritocratic systems repeatedly encountered this problem and did not solve it."
  - "the anti-capture constraints are the strongest governance architecture ever designed" became "the anti-capture constraints are the strongest part of its design".
  - "Every system that selects on measured performance" became "Any system that selects on measured performance" (same universal claim, kept deliberately).
- Cut as an aphorism closer, not treated as a claim: "A civilization that publishes the problem is better governed than a civilization that denies it."
- Canon check, no change: the Article XXVIII path (1% signatures, expert panel, 80% ratification) matches the Charter's regulatory-petition thresholds. The Charter describes the panel as a domain-expert review panel; r9's "expert panel drafting" was left as written.
- INTERNAL, left unchanged: the Breadth defense says the ranking spans "every major discipline", including art. The Level three and Metric separation passages speak of role-specific sub-rankings, and the Charter category list (research output, cognitive metrics, institutional contribution, doctrinal comprehension, sustained STI record) does not name art or medicine as categories. This reads as sub-rankings inside the constitutional categories, but it is worth a check.
