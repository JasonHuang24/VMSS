# Prose Lift 24.8.2: Group 2 (Academic Resources r6, r10)

2026-09-28. Two resource pages from `documents/resources-source.html`, edited in copies in this folder (`r6.html`, `r10.html`). The source file is untouched. Both pages are clarity edits per the triage register (`docs-review/prose-lift-24.7-triage.md`). Checker: `node docs-review/prose-lift-24.8.2/check-g2.mjs`, run from the repo root.

| Page | Mode | Block words (orig → edit) | Max em-dashes per paragraph (orig → edit) | Tags / table cells / headings / numbers | Status |
|---|---|---|---|---|---|
| r6 | clarity edit | 3900 → 3703 (−5.1%) | 5 → 1 | identical (150/150) / none on page (0/0) / identical / identical set | ready; one internal-defect flag |
| r10 | clarity edit | 2122 → 2011 (−5.2%) | 4 → 1 | identical (84/84) / none on page (0/0) / identical / identical set | ready; no flags beyond notes |

**Conventions**
- **Word counts.** Block = all visible text in the `resource-page` div, tags stripped (title, subtitle and headings included, so the figures sit below the triage register's counts). A word is any whitespace-separated token containing a letter, digit or `$`.
- **Frozen.** Tag and attribute sequence, headings, the styled subtitle line, `<strong>` run-in labels and every `<em>` span are byte-identical. Neither page holds a table. Every number, date, citation, named mechanism and hedge is kept; the checker also compares the set of numeric tokens on each page.
- **Ledger quotes.** Backtick spans in the claims tables are verbatim from the edited page (tags stripped, whitespace collapsed, `&rsquo;` read as `'`, curly double quotes read as `"`, `&sect;` as `§`), 15 words or fewer. The checker confirms each one.
- **Cross-resource clashes in scope.** None of the six named clashes (wall thickness R3/R16, kill-switch scope R3/R15, kill-switch timing R17/R18, Dyson date R4/R19, R20 founding date, mind-state sync R11/R28) makes a claim on these pages. r6 cites Q22's "backup vessel sync" but says nothing about whether sync is continuous; that sentence keeps its wording.
- **Approved doctrine changes.** None apply. Neither page mentions -3 monitoring (R1) or -3 visitor vessel coverage (R27/R28, LP-004.2).

---

## r6 — Time Travel

**Claims ledger**

| # | Claim / figure / citation / mechanism / hedge | Survives as |
|---|---|---|
| 1 | Time travel = observation of the past | `time travel means observing the past` |
| 2 | Sensor directed backward | `directing a sensor backward along the temporal axis` |
| 3 | No travel, no movement, no paradox | `Nobody travels, nothing moves, and no paradox is created.` |
| 4 | Same clarity as implant | `the same evidentiary clarity the implant provides for the present` |
| 5 | Load-bearing constraint | `is the load-bearing constraint of the entire technology` |
| 6 | Hedge: theoretically consistent under specific interpretations | `theoretically consistent with known physics under specific interpretations` |
| 7 | Physics frameworks named | `general relativity and quantum mechanics` |
| 8 | Intervention paradoxes unresolved | `Intervention produces paradoxes that no physical framework has resolved.` |
| 9 | Information dispersed, not destroyed | `information about past events survives in dispersed form` |
| 10 | Photon traces | `photons that radiated outward at the speed of light` |
| 11 | Entropy degrades reconstruction | `progressively harder to reconstruct as time passes and entropy increases` |
| 12 | Sensor of extraordinary resolution | `The technology required for temporal observation is a sensor of extraordinary resolution` |
| 13 | 10 billion light-years | `observing a galaxy 10 billion light-years away` |
| 14 | 10 billion years ago | `an event that occurred 10 billion years ago` |
| 15 | Local reconstruction | `reconstructs what happened in a specific room on a specific date` |
| 16 | Reconstruction fidelity challenge | `The engineering challenge is reconstruction fidelity.` |
| 17 | SNR exponential decay | `The signal-to-noise ratio degrades exponentially with time elapsed.` |
| 18 | Orders of magnitude | `orders of magnitude easier to observe than one from a century ago` |
| 19 | Resolution gradient | `It has a resolution gradient.` |
| 20 | Horizon unrecoverable | `unrecoverable regardless of sensor capability` |
| 21 | Reconstruction threshold | `dispersed the information below the reconstruction threshold` |
| 22 | Gradient narrows with maturity | `The resolution gradient narrows as the technology matures.` |
| 23 | Hedge: first-generation decade | `A first-generation temporal sensor might reconstruct events from the past decade` |
| 24 | Hedge: mature centuries | `a mature system might reach centuries` |
| 25 | Thermodynamic limit | `a theoretical limit set by thermodynamics rather than engineering` |
| 26 | Intervention requires backward send | `sending information or energy backward along the temporal axis` |
| 27 | Causal loops | `causal loops that violate the consistency conditions of every known physical framework` |
| 28 | Infinite regress | `an infinite regress with no stable state` |
| 29 | Physics forbids intervention | `because the physics does not permit it` |
| 30 | Physical, not doctrinal | `the limit is physical rather than doctrinal` |
| 31 | Observes, does not alter | `can read the record of the past but cannot alter the past itself` |
| 32 | Forensics most immediate | `most immediate application is criminal forensics` |
| 33 | Transforms leakage architecture | `where it transforms the civilization's leakage architecture` |
| 34 | Pre-implant gap | `most persistent evidentiary gap is pre-implant conduct` |
| 35 | Moral accounting at intake | `classified using moral accounting based on available records` |
| 36 | Record types | `criminal histories, documented conduct, behavioral data from Earth-era systems` |
| 37 | Best with evidence available | `the best the civilization could do with the evidence it had` |
| 38 | Too lenient | `Some were classified too leniently` |
| 39 | Too harsh | `politically contaminated or fabricated` |
| 40 | Honest uncertainty | `an honest process operating under honest uncertainty` |
| 41 | Q29 cross-reference | `Q29 (The Credible Record) examines the epistemological tension` |
| 42 | Eliminates uncertainty | `Temporal observation eliminates that uncertainty.` |
| 43 | Forensic fidelity | `reconstruct past events at forensic fidelity` |
| 44 | Mass executioner, clean-slate | `entered Main Layer under clean-slate protection` |
| 45 | Dissident physician | `The dissident physician accused of bioterrorism` |
| 46 | Reclassification ≠ punishment | `differs from retroactive punishment` |
| 47 | Meets evidentiary standard | `evidence that now meets its own evidentiary standard` |
| 48 | Three-axis framework | `three-axis proportionality framework (severity, pattern, reversibility)` |
| 49 | Governs all reassignment | `that governs all layer reassignment` |
| 50 | Source differs, quality equal | `(temporal sensor vs. implant) but is equivalent in quality` |
| 51 | Cold cases solvable | `Every unsolved case in the civilization's history becomes solvable` |
| 52 | Wall breaches | `every wall breach where the perpetrator was not identified` |
| 53 | Network attribution | `where the active architect was suspected but not confirmed` |
| 54 | Question shift | `the question shifts from "what can we prove?" to "what happened?"` |
| 55 | Largest application | `The founding-era intake is the largest single application` |
| 56 | Implant-removal gap as leakage | `currently falls in a leakage category` |
| 57 | STI initialization | `would affect the STI initialization if observed` |
| 58 | Criminal-flag severity | `did not reach criminal-flag severity` |
| 59 | Charter Art II, Whitepaper §5.12 | `null-scoring period for juveniles (Charter Article II, Whitepaper §5.12)` |
| 60 | Independent sensor | `observing the same events from an independent sensor` |
| 61 | New evidence category | `retroactively observed conduct` |
| 62 | Hedge: likely, Article XXI | `likely through the Supreme Court's novelty filter (Article XXI)` |
| 63 | Genuine constitutional novelty | `the first case in each category is a genuine constitutional novelty` |
| 64 | First question | `carry the same evidentiary weight as implant-observed conduct` |
| 65 | Functionally identical | `the evidence is functionally identical` |
| 66 | Hedge: may carry lower weight | `the evidence may carry a lower confidence weight` |
| 67 | Court sets threshold (hedge "would") | `The Court would need to set the fidelity threshold` |
| 68 | Second question | `does the civilization have a temporal statute of limitations?` |
| 69 | Implant eliminated degradation | `The implant eliminated this problem for post-installation conduct` |
| 70 | Resolution range | `any point within its resolution range` |
| 71 | 500 years (flagged, verbatim) | `A citizen who committed an act 500 years ago, before VMSS existed` |
| 72 | Bounded or absolute | `is temporally bounded or absolute` |
| 73 | Every domain | `across every domain the civilization operates in` |
| 74 | Caesar, Pyramid | `The assassination of Julius Caesar, the construction of the Great Pyramid` |
| 75 | Magna Carta | `the drafting of the Magna Carta` |
| 76 | Discipline survives | `someone still has to contextualize, analyze and explain` |
| 77 | Pointing the sensor | `is answered by pointing the sensor rather than by inference` |
| 78 | Unrepeatable experiments | `Experiments that cannot be repeated become observable` |
| 79 | Mass extinction | `what caused a specific mass extinction event observes the extinction` |
| 80 | New scientific category | `direct observation of unrepeatable events` |
| 81 | Temporal autobiography | `a form of temporal autobiography with no precedent` |
| 82 | Privacy significant | `its privacy implications are significant` |
| 83 | Every moment observable (hedge "potentially") | `makes every moment of every citizen's life potentially observable` |
| 84 | Article V, §15.2 | `cognition-is-non-public principle (Article V, §15.2) must address` |
| 85 | Physical events, not thoughts | `the sensor observes physical events rather than thoughts` |
| 86 | Hedge: may reveal | `may reveal information the citizen chose not to share` |
| 87 | Contested boundary | `"observed conduct" and "private life" becomes contested` |
| 88 | Territorial claim | `we were here first` |
| 89 | War crimes | `a war crimes accusation that a foreign government denies can be observed` |
| 90 | Diplomatic shift | `"we believe our evidence" to "we observed what happened."` |
| 91 | Power dynamics | `alters the power dynamics of every international dispute` |
| 92 | Library of Alexandria | `The Library of Alexandria can be read` |
| 93 | Hedge: acoustic condition | `if the performance occurred in a space where acoustic traces are reconstructable` |
| 94 | Heritage preserved | `The cultural heritage of the entire species is preserved` |
| 95 | Hedge: arguably more rigorous | `and arguably more so` |
| 96 | Whitepaper §8 | `Security Classification System (Whitepaper §8)` |
| 97 | Top Secret | `classified at Top Secret (named roles with specific clearance)` |
| 98 | Meritboard authorization chain | `a chain that the Meritboard's federal-administration ranking defines` |
| 99 | No unilateral authorization | `No individual, including the President, can authorize temporal observation unilaterally.` |
| 100 | Same tier as implant blueprints | `the same tier as implant blueprints, fabrication station access` |
| 101 | Backup vessel operations | `backup vessel infrastructure operations` |
| 102 | Novelty jurisdiction | `establish the procedural precedent through its novelty jurisdiction` |
| 103 | Hedge: likely mirrors Tier 3 | `likely mirrors the structure of the Tier 3 preemption authorization` |
| 104 | EFD §24 | `External Force Doctrine (§24)` |
| 105 | Scope limits | `specific events, specific time windows and specific locations` |
| 106 | Scoped, justified, auditable | `Every observation is scoped, justified and auditable.` |
| 107 | Cognition non-public content | `no thought, desire, fantasy or internal deliberation carries institutional consequence` |
| 108 | Guarantee intact | `Temporal observation leaves this guarantee intact` |
| 109 | Diary reconstruction | `can reconstruct the act of writing` |
| 110 | Cognition vs expression | `between cognition (protected) and expression (observable)` |
| 111 | Q22 (47-Minute Gap) | `Q22 (47-Minute Gap) asked whether captured-but-unexpressed cognition` |
| 112 | Backup vessel sync | `from a backup vessel sync is protected` |
| 113 | Parallel question | `is observed-but-destroyed private expression protected?` |
| 114 | Thought/action line | `the doctrine's line between thought and action` |
| 115 | Sovereign to citizen | `what remains sovereign to the citizen regardless of the system's capability` |
| 116 | Article XX audit | `The Meritboard's Article XX audit mandate extends to temporal observation` |
| 117 | Logging | `Every observation is logged and every authorization is recorded` |
| 118 | Review criteria | `drift, bias or overreach` |
| 119 | Justice, not curiosity | `an instrument of justice rather than of institutional curiosity` |
| 120 | Categorical change | `The change is categorical` |
| 121 | Implant comparison | `when it made the present continuously observable` |
| 122 | Every event resolvable | `Every contested event in human history is resolvable.` |
| 123 | Hedge: may contradict myths | `may directly contradict national founding myths` |
| 124 | Religious claims | `Religious claims about historical events may be verified or falsified.` |
| 125 | Family histories | `may be revealed as inaccurate` |
| 126 | Article XX, §22.2 (hedge "suggests") | `commitment to transparency (Article XX, §22.2) suggests it will publish` |
| 127 | Hedge: potentially destabilizing | `unpredictable and potentially destabilizing` |
| 128 | Survived every stress test; hedge: may be hardest | `survived every previous doctrinal stress test, but observing its own past may prove` |
| 129 | Last significant leakage category | `closes the last significant leakage category: pre-implant conduct` |
| 130 | Approaches zero | `The leakage rate for intake classification approaches zero.` |
| 131 | 0.01% at year 3000 | `The 0.01% leakage target at year 3000 was calculated without temporal observation.` |
| 132 | Hedge: post-3000 may approach | `may approach a leakage rate the founding roadmap did not model` |
| 133 | Not zero | `would not reach zero` |
| 134 | Physics prevents perfection | `the laws of physics prevent perfect reconstruction at all time depths` |
| 135 | Below asymptotic target | `closer to zero than the roadmap's asymptotic target` |
| 136 | Accountability via record | `becomes potentially accountable for their conduct through the historical record` |
| 137 | Dead beyond jurisdiction | `the dead are beyond the civilization's jurisdiction` |
| 138 | Hedge: may be reevaluated | `may be reevaluated when temporal observation reveals` |
| 139 | Attribution | `perpetrators were never identified may be attributed` |
| 140 | No prosecution, record corrected | `The civilization does not prosecute the dead, but it corrects the record` |
| 141 | First founding line | `The first founding line says that consequence follows conduct.` |
| 142 | Not limited to recorded conduct | `It does not limit this to observed conduct, documented conduct or implant-recorded conduct.` |
| 143 | Literally true | `makes the founding line literally true across all of time` |
| 144 | Deliverable consequence | `because the evidence was unavailable becomes deliverable` |
| 145 | Aspirational origin | `began as an aspirational claim` |
| 146 | Past no longer closed | `a universe where the past is no longer closed` |
| 147 | Q29 border epistemology | `the border epistemology problem Q29 describes is a temporary condition` |
| 148 | Billions at intake | `The founding-era intake processed billions under uncertainty` |
| 149 | Retroactive elimination | `eliminates the uncertainty retroactively` |
| 150 | Articles XIV, XX | `Article XIV proportional response, Article XX system accountability` |
| 151 | Article XXI | `Article XXI Supreme Court novelty jurisdiction` |
| 152 | Built for future evidence | `The architecture was built to handle evidence it did not yet have.` |
| 153 | Defense quote (verbatim) | `How do you know the sensor observed this timeline?` |
| 154 | Physically incoherent | `The defense is physically incoherent` |
| 155 | Formal ruling needed | `require a formal ruling rather than a dismissal` |
| 156 | Many-worlds | `under many-worlds interpretations of quantum mechanics` |
| 157 | Closes category permanently | `closes the category permanently` |
| 158 | No parallel access | `The temporal observation sensor does not access parallel universes.` |
| 159 | Inputs local | `Every input to the reconstruction is local.` |
| 160 | Same light cone | `the same light cone and the same thermodynamic history` |
| 161 | No interpretation proposes it | `No interpretation of quantum mechanics proposes this.` |
| 162 | Decoherence branching | `branches at quantum decoherence events` |
| 163 | Traces stay in branch | `each branch's physical traces remain within that branch` |
| 164 | No mechanism | `The defense has no mechanism by which evidence from a parallel branch enters` |
| 165 | Fidelity, not metaphysics | `reconstruction fidelity rather than metaphysical certainty about the nature of time` |
| 166 | No implant parallel claim | `no defendant has ever argued that their implant recorded events` |
| 167 | Same traces | `Both instruments operate on the same physical traces in the same universe.` |
| 168 | Cannot coherently reject | `cannot coherently reject that the temporal sensor accurately reconstructs` |
| 169 | Hedge: would likely establish three points | `would likely establish three points as settled doctrine` |
| 170 | Point 1: local traces | `derived from physical traces local to the observable universe` |
| 171 | Causal connection | `causally connected to the events it reconstructs` |
| 172 | Point 2: inadmissible | `the parallel universe defense is categorically inadmissible` |
| 173 | Court does not rule on physics | `the Court does not rule on physics` |
| 174 | No philosophy | `the Court does not adjudicate philosophy` |
| 175 | Point 3: fidelity defined | `the degree to which the sensor's output matches the physical traces` |
| 176 | Admissibility criteria | `certified as equivalent to implant observation, the evidence is admissible` |
| 177 | Challenge fidelity, not universe | `The defendant may challenge the fidelity, but not the universe` |
| 178 | Novelty extinction | `Novelty extinction applies after the ruling` |
| 179 | Never again | `the same defense can never reach the Court again` |
| 180 | AI governance applies ruling | `the AI governance system applies the ruling automatically` |

**Word counts:** 3900 → 3703 (−5.1%). Em-dashes: 5 per paragraph max → 1 (the two remaining single em-dashes are in the flagged "500 years" sentence and the Security classification list; the defendant's quoted speech keeps its em-dash verbatim).

**Flags**
- **Internal defect (left verbatim, needs Jason's ruling):** "A citizen who committed an act 500 years ago, before VMSS existed, and entered during the founding immigration" does not hold together. The founding immigration was a living-entrant intake, so an act 500 years before it predates any entrant's lifetime. Measured from the post-3000 observation date instead, 500 years ago falls after VMSS existed. The sentence and its em-dash are unchanged.
- **Mind-state sync (R11/R28):** r6 mentions only "a backup vessel sync" as Q22's premise and makes no claim about continuous sync, so the clash is not engaged. Wording kept.
- **Removed closer, noted for fidelity:** the original "The past is closed. The record of it is not." sat against the later "a universe where the past is no longer closed". The triage lists the first as a habit and it is cut. Its claim survives as row 31. The later metaphor is kept verbatim (row 146), so the two lines no longer appear to contradict each other.
- **Cut restatements (no claim lost):** "Temporal observation is the evidence catching up to the architecture." (restates row 152); "The first defendant to try it creates the precedent that ensures no one else can." (restates rows 178-179); "The Q22 (47-Minute Gap) connection is direct." (the triage's re-explained Q22 link; the link itself survives as row 111).
- **Checked, no flag:** the Top Secret tier for implant blueprints, fabrication station access and backup vessel operations matches whitepaper §8.
- **Approved doctrine changes:** none applied; none apply to r6.
- **Verifier revision:** restored the claim that the civilization "has survived every previous doctrinal stress test" (row 128), and restored the explicit subject "The technology required for temporal observation" in place of an antecedent-less "The device" (row 12). Words 3701 → 3703.

---

## r10 — Memory, Repair, and Moral Lag

**Claims ledger**

| # | Claim / figure / citation / mechanism / hedge | Survives as |
|---|---|---|
| 1 | 10:1 penalty-to-recovery ratio | `The STI operates on a 10:1 penalty-to-recovery ratio` |
| 2 | Hedge: approximately ten times | `trust is approximately ten times harder to rebuild than it is to lose` |
| 3 | Emotionally contested | `one of the doctrine's most emotionally contested design choices` |
| 4 | Critics and defenders | `Critics call it punitive and defenders call it realistic.` |
| 5 | Charter quote | `The Charter calls it "calibrated to how trust actually operates."` |
| 6 | Structural analysis framing | `a structural analysis of what trust is` |
| 7 | Consequence-based systems | `how consequence-based systems must handle it` |
| 8 | Observable truth | `formalizes an observable truth about how trust operates` |
| 9 | Every human society | `in every human society that has ever existed` |
| 10 | Not arbitrary | `It was not chosen as an arbitrary policy parameter.` |
| 11 | Repeated observation | `it is built through repeated observation` |
| 12 | One data point | `has given you one data point` |
| 13 | Pattern | `a hundred times has given you a pattern` |
| 14 | Prediction of behavior | `which produces a prediction about future behavior` |
| 15 | Hedge: approximately linear | `The accumulation is approximately linear` |
| 16 | Hedge: roughly equal | `adding a roughly equal increment to the trust prediction` |
| 17 | Betrayal reframes | `It reframes the pattern.` |
| 18 | Ten years | `reliable for ten years and then betrays you` |
| 19 | Incomplete | `either incomplete (they were always capable of this)` |
| 20 | Conditional | `conditional (they were reliable only under certain circumstances you did not identify)` |
| 21 | Deteriorating | `or deteriorating (something changed and you did not detect it in time)` |
| 22 | Contaminates record | `The betrayal contaminates the entire prior record` |
| 23 | Not a moral judgment | `it carries no moral judgment` |
| 24 | Informational asymmetry | `formalizes the informational asymmetry between building a predictive pattern` |
| 25 | Building profile | `(slow, incremental, roughly linear)` |
| 26 | Invalidating profile | `(fast, discontinuous, retroactively contaminating)` |
| 27 | Calibrated to reality | `The ratio is calibrated to how trust actually operates` |
| 28 | Not to wishes | `rather than to how the civilization wishes it operated` |
| 29 | Boundary-riding closure | `it closes the boundary-riding exploit` |
| 30 | Boundary-riding defined | `sustained low-level harm that stays below any single reassignment threshold` |
| 31 | One per month | `commits one minor harassment per month` |
| 32 | Below escalation threshold | `below the severity threshold for escalation` |
| 33 | Pattern recognized | `The system must eventually recognize the resulting pattern as meaningful.` |
| 34 | Clean record without ratio | `maintaining an indefinitely clean active record` |
| 35 | Community harm | `producing sustained harm at the community level` |
| 36 | Clearance slower | `by making clearance slower than accumulation` |
| 37 | Penalty rate | `A minor infraction costs trust at the penalty rate` |
| 38 | One-tenth recovery | `restores trust at one-tenth the penalty rate` |
| 39 | Compounding | `the second penalty compounds on top of the incomplete recovery from the first` |
| 40 | Downward slope | `The trajectory slopes downward even though each individual act is clearable` |
| 41 | Structurally insufficient | `structurally insufficient to restore the baseline` |
| 42 | Pattern legible | `eventually makes their behavioral pattern legible to the system` |
| 43 | No single-act punishment | `They are not punished for any single act` |
| 44 | Cannot flatten | `cannot flatten through selective clearance` |
| 45 | Losing strategy | `turns a potential exploit into a losing strategy` |
| 46 | Intent not penalized | `reading intent the doctrine does not penalize` |
| 47 | Self-defeating | `repeated low-level harm are inherently self-defeating` |
| 48 | Costs acceptable | `which the doctrine acknowledges but considers acceptable` |
| 49 | Moral lag scenario | `takes full responsibility, makes restitution and demonstrates sustained behavioral correction` |
| 50 | Depressed STI | `will still carry a depressed STI score` |
| 51 | Score lags | `The score lags behind the reality.` |
| 52 | Hedge: may be exemplary | `present character may be exemplary` |
| 53 | 10:1 recovery rate | `the 10:1 recovery rate has not yet restored the trust` |
| 54 | Historical debt | `describes a historical debt rather than a current reality` |
| 55 | §5.11 citation | `(§5.11 — trajectory weighting)` |
| 56 | Best-outcomes weighting | `weighted on best outcomes across the behavioral record` |
| 57 | Trajectory, not trough | `scored on the trajectory rather than the trough` |
| 58 | Lag not eliminated | `Trajectory weighting does not eliminate the moral lag` |
| 59 | No compounding trap | `prevent the lag from compounding into a trap` |
| 60 | Direction credited | `credit for the direction of movement` |
| 61 | Upward trajectory treated differently | `A citizen whose trajectory is upward is treated differently` |
| 62 | Double punishment perception | `may feel that slow STI recovery is a second punishment` |
| 63 | Social consequences | `public visibility, relationship damage, professional exclusion, community judgment` |
| 64 | Done their time | `the citizen has "done their time"` |
| 65 | Reliability prediction, not punishment | `STI is a reliability prediction and does not function as a punishment mechanism` |
| 66 | Pre-breach confidence | `restore the prediction to pre-breach confidence` |
| 67 | Serves strangers | `The STI serves the people who do not know them` |
| 68 | Audience examples | `the district evaluating whether to accept a new resident` |
| 69 | Informational vs emotional | `the informational reality of the breach rather than the emotional reality` |
| 70 | No extraordinary credit | `receives no extraordinary credit in the STI` |
| 71 | No repair bonus | `The 10:1 ratio has no "repair bonus"` |
| 72 | Same base rate | `recover at the same base rate` |
| 73 | Active vs passive | `improvement through active repair and improvement through passive cessation` |
| 74 | Known limitation | `this is a known design limitation, and a deliberate one` |
| 75 | Gaming vector | `A repair bonus would create a gaming vector.` |
| 76 | Harm-then-performance | `a cycle of harm-then-performance that the system rewards` |
| 77 | Uniformity prevents exploit | `The 10:1 ratio's uniformity prevents this exploit.` |
| 78 | No premium either way | `Genuine repair receives no metric premium, and neither does performed repair.` |
| 79 | Public signal distinguishes | `through the public signal component, can tell the difference` |
| 80 | Public signal accelerates | `the public signal input accelerates the trajectory accordingly` |
| 81 | Base rate stays 10:1 | `The base rate remains 10:1 regardless of repair quality.` |
| 82 | Conduct and time | `a statement about the relationship between conduct and time` |
| 83 | Consequence follows conduct | `The civilization claims that consequence follows conduct` |
| 84 | How long | `much longer than the conduct itself took to commit` |
| 85 | Five seconds, years | `A betrayal that took five seconds to commit takes years to recover from` |
| 86 | Not bureaucratic lag | `This temporal asymmetry is deliberate rather than bureaucratic.` |
| 87 | Foundational truth | `a truth the doctrine considers foundational` |
| 88 | Damage radiates | `The damage radiates forward in time` |
| 89 | Hedge: approximately at baseline | `The score returns to baseline approximately when those effects have dissipated` |
| 90 | Scoring audience | `the population that relies on the score as a trust prediction` |
| 91 | Not calibrated to fairness | `What feels fair to the person being scored does not set it.` |
| 92 | Slow return | `It returns slowly, act by act` |
| 93 | Observable social systems | `in observable human social systems` |
| 94 | Lived experience | `through lived experience rather than constitutional text` |
| 95 | Feature or cost | `is moral lag a feature or a cost?` |
| 96 | Earned | `moral lag ensures that trust is earned rather than declared` |
| 97 | Cannot announce change | `A citizen cannot announce "I have changed"` |
| 98 | Trajectory takes time | `trust is a trajectory, and trajectories take time to establish` |
| 99 | Penalizes present | `moral lag penalizes the present for the past` |
| 100 | Not disbelief | `the system does not disbelieve them` |
| 101 | Gap from design | `that gap comes from the ratio's design` |
| 102 | Both correct | `Both arguments are correct` |
| 103 | Same thing | `the feature and the cost are the same thing` |
| 104 | Doctrine chose protection | `The doctrine chose the protection` |
| 105 | Cost comparison | `(moral lag for the individual) is lower than the cost of premature restoration` |
| 106 | Population vulnerability | `(vulnerability for the population)` |
| 107 | What STI gates | `it gates contracts, partnerships, domain access, and phasing eligibility` |
| 108 | Serves no one | `it serves no one, including the citizen it describes` |
| 109 | Genuine cost | `moral lag is a genuine cost` |
| 110 | Article XI gauntlet | `re-examine the ratio through the Article XI gauntlet` |
| 111 | Calibration review | `still calibrated to observed trust dynamics` |
| 112 | Not changed casually | `because it is load-bearing, it cannot be changed casually` |
| 113 | Can be re-evaluated | `The ratio can be re-evaluated` |

**Word counts:** 2122 → 2011 (−5.2%). Em-dashes: 4 per paragraph max → 1 (the only one left is inside the frozen citation "(§5.11 — trajectory weighting)"; the subtitle's em-dash is frozen).

**Flags**
- **No cross-resource clash or doctrine conflict found.** Checked against canon: the Charter quote "calibrated to how trust actually operates" appears in charter.html; best-outcomes weighting matches the Charter's STI formula text; the Charter's own threshold-riding line matches the boundary-riding section; technologies.html confirms that STI "governs social standing and phasing eligibility" (row 107).
- **Soft note, no change:** row 68 has a district using STI to decide whether to accept a new resident. This is an audience example, not layer placement, so it does not engage the "STI never sets placement" ruling. Recorded so Jason can confirm.
- **Cut restatements (no claim lost):** "The lag persists. The system sees through it." (rows 58-60 carry it); "The ratio is not sacred. It is load-bearing. Load-bearing things can be re-evaluated. They just cannot be changed casually." (rows 112-113); the "protection or the penalty" restatement after the feature/cost pair (rows 102-104 carry it); the three-student tricolon became two sentences plus the question the resource is designed to reach.
- **Approved doctrine changes:** none applied; none apply to r10.
