# Prose lift 25.2.0: Charter (strict mode)

This is a strict, clarity-only pass on `charter.html`, made against main at 2667c56. The edits are in the copy in this folder. The live `charter.html` is untouched. Outside the 13 changed elements listed below, the copy is byte-identical to the original.

Markers (checked by `charter-verify.mjs`):
- Text inside ⟦⟧ is the before text. It must appear in the original and must not appear in the copy.
- Text inside ⟪⟫ is the after text. It must appear in the copy.
- Text inside «» is a claims-ledger quote. It must appear in the copy and be 15 words or fewer.

**Frozen strings checked before editing.** Every guard in `tools/check-canon.mjs` and `tools/test-canon-guard-mutations.mjs` that reads `charter.html` was checked:
- the (f2) cascade and LP whitelist (the Charter carries no LP reference);
- the (f2b) relocated magnitudes (all absent);
- the (f2b) negative magnitudes, each pinned ×1;
- the (g1) TOC census (30 rows);
- the (a5) advisory flag in its comma form;
- the stale "five currencies" check, the duplicate-id check and the in-page-anchor checks;
- the mutation finds (`There is no minimum wage in VMSS`, `<h2 id="preamble"`, `>Article I – Vertical Moral`, `</body>`).

No edit touches any of them. The pinned strings still stand in the copy:
- «There is no minimum wage in VMSS.»
- «No minimum participation quorum is imposed.»
- «There is no limit on consecutive terms»
- «not a supermajority, full agreement»
- «advisory, not institutionally enforced»

**Quoted elsewhere, so left unedited:** before cutting, each candidate sentence was searched for across the site. Art. XXI's "The absence of a judge is not a gap — it is the design." is a clear aphorism, but simulations.html:3093 quotes it verbatim as Charter text, so it stays (flag 5). None of the edited sentences below is quoted verbatim anywhere else.

## charter.html

### Changes (13 elements)

Ten edits cut a sentence or clause. Three change punctuation only, keeping the same words in the same order. No sentence was reworded.

**C1. Preamble, note under the Four Founding Lines (line 157).** Habit: stock filler.
- Before: ⟦amendable through the Article XI gauntlet, and the Charter is honest about that fact. But⟧
- After: ⟪amendable through the Article XI gauntlet. But the four lines⟫
- Reason: the cut clause comments on the Charter and adds nothing. The amendability rule it followed is intact.
- Unchanged: "not legally immutable", "Article XI gauntlet" and "Chief Architect". The cut had no modal, hedge or number.

**C2. Art. II, 10:1 paragraph (line 169).** Habit: a thesis closer restating the rule.
- Before: ⟦without recovering between incidents. Threshold-riding is a losing strategy over time, not a loophole.⟧
- After: ⟪still compounds under 10:1 without recovering between incidents.⟫ The paragraph now ends here.
- Reason: this restates the sentence before it («The ratio also closes the boundary-riding exploit»). It also used a second name, "threshold-riding", for the defined "boundary-riding exploit".
- Unchanged: both "10:1" figures, "approximately ten times", "boundary-riding exploit" and "not punitive". The cut had no number or modal.

**C3. Art. III.II, overtime paragraph (line 192).** Habit: redundant restatement.
- Before: ⟦not funded by the civilization. Workers benefit from the premium; employers bear the cost. The weekly⟧
- After: ⟪paid out of pocket — not funded by the civilization. The weekly subsidy value⟫
- Reason: the sentence before it already says the employer owes the worker the premium out of pocket and the civilization does not fund it.
- Unchanged: the guard string "There is no minimum wage in VMSS" (×1), "may set", "Overtime Premium Protocol", "time dividend", "20 per week", "four weeks", "Article XXV.VI", "only through" and the LP-076 formula sentence ("The Charter fixes … and reaches no rate").

**C4. Art. III.IV, transfer paragraph (line 204).** Habit: stacked em-dashes.
- Before: ⟦The same progressive scale applies — per the retention schedule — converted at destination-layer purchasing power.⟧
- After: ⟪The same progressive scale applies per the retention schedule, converted at destination-layer purchasing power.⟫
- Reason: two dashes wrapped a four-word phrase. The words and their order are unchanged.
- Unchanged: every range (1.3–1.8x, 1.8–2.5x, 2.5–4x), $10,000, 6,500, 4,700, 3,100, "approximately", "roughly" and "may transfer".

**C5. Art. III.VI (line 221).** Habit: stacked em-dashes.
- Before: ⟦Punitive reassignment to any lower layer — -1, -2, or -3 — closes the upward pathway permanently.⟧
- After: ⟪Punitive reassignment to any lower layer (-1, -2, or -3) closes the upward pathway permanently.⟫
- Reason: each dash sat against a layer's minus sign ("— -1", "-3 —"). Parentheses keep the list and remove the clash. The words are the same.
- Unchanged: "permanently", "seals the ceiling, not the floor" and "does not restore eligibility".

**C6. Art. XI, founding-core paragraph (line 287).** Habit: a thesis closer ("not X, it is Y").
- Before: ⟦and at that point the cost is legitimate. This is the deliberate choice of the Charter: the core's strength is not declared, it is structurally demonstrated.⟧
- After: ⟪and at that point the cost is legitimate.⟫ The paragraph now ends here.
- Reason: this restates the paragraph's own opening («is load-bearing rather than cemented», «Its protection is structural»).
- Unchanged: "load-bearing", "founding core" with its four elements, "80–90% supermajority" and "not untouchable".

**C7. Art. XI, "immutable" paragraph (line 288).** Habit: a thesis closer.
- Before: ⟦with no gray zone and no quiet reinterpretation. The Charter chooses the honest form of protection.⟧
- After: ⟪with no gray zone and no quiet reinterpretation.⟫ The paragraph now ends here.
- Reason: this restates the sentence before it («The actual guarantee is better than textual prohibition»).
- Unchanged: "load-bearing", "not immutable" and both quoted phrases ("immutable", "this cannot be amended").

**C8. Art. XX, participation paragraph (line 316).** Habit: redundant restatement.
- Before: ⟦The metric measures engagement, not satisfaction — it tells the civilization whether its feedback loops are receiving input, not whether the population is happy with the outputs.⟧
- After: ⟪The metric measures engagement, not satisfaction. The assessment is public.⟫
- Reason: the dash clause restates the engagement-versus-satisfaction contrast a second time. The first half, which sets the metric's scope, is kept.
- Unchanged: "Article XX", "required input", "historical baselines" and "self-reinforcing". The cut had no modal or hedge.

**C9. Art. XXI, composition paragraph (line 319).** Habit: an aphorism closer.
- Before: ⟦No political faction nominates them. Competence is measured, not campaigned for.⟧
- After: ⟪No constituency elects them. No political faction nominates them.⟫ The paragraph now ends here.
- Reason: this restates «Selection is purely meritocratic» and the two sentences before it.
- Unchanged: "10 justices", "legal-interpretation ranking", "appointed by the President" and "may be human, AI, AGI, cyborg".

**C10. Art. XXIII (line 359).** Habit: stock filler.
- Before: ⟦compared to the VMSS of 2150. That is the point. The founding generation⟧
- After: ⟪compared to the VMSS of 2150. The founding generation builds the framework.⟫
- Reason: "That is the point." states nothing.
- Unchanged: 3000 and 2150.

**C11. Art. XXIV (line 362).** Habit: stacked em-dashes.
- Before: ⟦within full institutional reach — +1 Sanctuary, Main Layer, and -1 Noncompliance — and across all leakage categories;⟧
- After: ⟪within full institutional reach (+1 Sanctuary, Main Layer, and -1 Noncompliance) and across all leakage categories;⟫
- Reason: the opening dash sat against "+1", and the closing dash against "Noncompliance" read as part of the list. Parentheses fix both. The words are the same.
- Unchanged: 0.01%, 3000, "not a uniform promise" and "inherently graduated".

**C12. Art. XXV.V (line 392).** Habit: a stock filler closer.
- Before: ⟦enters the second instrument's operational envelope instead. The civilization anticipated this and designed accordingly.⟧
- After: ⟪enters the second instrument's operational envelope instead.⟫ The paragraph now ends here.
- Reason: this restates the paragraph's first sentence («closes the primary evasion vector»).
- Unchanged: "kill switch" and "second instrument". The cut had no number or modal.

**C13. Founding Affirmation (line 464).** Habit: an aphorism closer.
- Before: ⟦has found a way to improve on what was written. The Charter is how. The four lines are why.⟧
- After: ⟪has found a way to improve on what was written.⟫ The paragraph now ends here.
- Reason: this restates the paragraph's first two sentences, which already restate the closing lines of the line-157 note.
- Unchanged: "not because they cannot" (the amendability hedge). See flag 10.

### Claims ledger (every claim, number and citation in the 13 edited elements)

**Line 157**

| Claim | Verbatim quote |
|---|---|
| The four lines are the symbolic anchor | «These four lines are the civilization's symbolic anchor.» |
| They are not legally immutable | «They are not legally immutable» |
| Every clause is amendable through Article XI | «every clause in this Charter is amendable through the Article XI gauntlet» |
| Untouched since the Chief Architect wrote them | «the four lines have never been touched since the Chief Architect wrote them» |
| The room in which the articles argue | «they are the room inside which every subsequent article argues with itself» |
| The Charter defines how | «The Charter defines how the civilization does the work.» |
| The four lines define what for | «These four lines define what the civilization is for.» |

**Line 169**

| Claim | Verbatim quote |
|---|---|
| 10:1 ratio | «The STI operates on a 10:1 penalty-to-recovery ratio.» |
| About ten times harder to rebuild | «Trust is approximately ten times harder to rebuild than it is to lose.» |
| Years erased in hours | «A single serious violation can erase years of accumulated trust in hours» |
| Restoration takes years | «restoring that same ground takes years of sustained good conduct» |
| Not punitive, calibrated | «The asymmetry is not punitive — it is calibrated to how trust actually operates.» |
| Closes the boundary-riding exploit | «The ratio also closes the boundary-riding exploit» |
| Sub-threshold harm | «sustained low-level harm that stays below any single reassignment threshold» |
| Compounds under 10:1 | «still compounds under 10:1 without recovering between incidents» |

**Line 192**

| Claim | Verbatim quote |
|---|---|
| No minimum wage | «There is no minimum wage in VMSS.» |
| Employers set wages freely | «Employers may set market wages freely.» |
| The time dividend is protected | «What the system protects is the time dividend itself.» |
| Hours beyond 20 trigger the protocol | «Every hour of qualifying work beyond 20 per week triggers the Overtime Premium Protocol» |
| The employer owes the indexed rate | «the employer owes the worker the layer's primary subsidy rate indexed by the hour» |
| Per hour, out of pocket, not civilization-funded | «per additional hour, paid out of pocket — not funded by the civilization» |
| Weekly value derivation | «calculated as the monthly subsidy divided by four weeks» |
| Premium and scaling are federal law | «The indexed hourly premium and its layer scaling are federal law» |
| Changed only through the ladder | «enacted, amended, and recalibrated only through the» |
| Citation: XXV.VI ladder | «Article XXV.VI» |
| Citation: consolidated in VMSS Laws | «ladder and consolidated in» |
| The Charter fixes entitlement and derivation | «The Charter fixes the entitlement and its derivation» |
| Premium definition | «the premium is the weekly subsidy value indexed by the hour» |
| Owed by the employer; no rate at Charter tier | «owed by the employer out of pocket — and reaches no rate» |
| No subsidy beyond 20 hours | «The civilization does not subsidize hours beyond 20.» |

**Line 204**

| Claim | Verbatim quote |
|---|---|
| Visitors and elective residents may transfer | «Visitors and elective residents of lower layers may transfer a portion» |
| Of origin assets into destination currency | «of their origin-layer assets to the destination layer's currency» |
| Citation: retention schedule, III.V | «using the downward transfer retention schedule (Article III.V)» |
| Same progressive scale | «The same progressive scale applies per the retention schedule» |
| Converted at destination purchasing power | «converted at destination-layer purchasing power» |
| Greater purchasing power per unit | «Lower-layer currencies carry greater purchasing power per unit than Main» |
| −1 band | «-1 at approximately 1.3–1.8x» |
| −2 band | «-2 at approximately 1.8–2.5x» |
| −3 band | «-3 at approximately 2.5–4x» |
| The central bank derives settlement rates | «The central bank derives settlement rates from observed economic conditions within these ranges.» |
| Retire and issue at each conversion | «origin-layer currency is retired and destination-layer currency is issued» |
| No currency crosses | «no currency transfers between economies, preserving the integrity of each silo» |
| Not a fixed rate | «The gradient is not a fixed exchange rate» |
| Emergent drivers | «it emerges from scarcity, institutional withdrawal, and inflationary pressure from tourism inflow» |
| Varies by district | «varies by district within each layer» |
| Illustration basis | «As an approximate illustration at midpoint settlement rates» |
| $10,000 retained | «a citizen retaining $10,000 in Main value» |
| 6,500 in −1 | «roughly 6,500 compliance tokens in -1» |
| 4,700 in −2 | «4,700 lower-restrictions tokens in -2» |
| 3,100 in −3 | «3,100 freedom tokens in -3» |
| Fewer tokens, more purchasing power | «fewer nominal tokens, but each carrying proportionally greater purchasing power» |
| Cap per transfer | «The transferred amount is capped per transfer at the retention schedule» |
| Untransferred assets stay | «untransferred assets remain in the origin layer untouched» |
| Arrives neutral | «A citizen who transfers nothing arrives economically neutral» |
| Must earn locally | «must earn destination currency through work or local means» |

**Line 221**

| Claim | Verbatim quote |
|---|---|
| Punitive reassignment closes the upward pathway | «Punitive reassignment to any lower layer (-1, -2, or -3) closes the upward pathway permanently.» |
| Ceiling sealed, not the floor | «Reassignment seals the ceiling, not the floor.» |
| STI recovery is local | «STI recovery within a punitive layer determines local opportunities and social standing» |
| No restoration of upward eligibility | «does not restore eligibility for upward movement» |

**Line 287**

| Claim | Verbatim quote |
|---|---|
| Founding core elements | «moral causality, pre-intervention in Sanctuary, post-intervention in Main, continuity not innocence» |
| Load-bearing, not cemented | «is load-bearing rather than cemented» |
| No textual bar | «No textual rule forbids reaching it.» |
| Protection is structural | «Its protection is structural» |
| Same gauntlet as any amendment | «must clear the same Article XI gauntlet as any other amendment» |
| Ratifiers qualified by living under the core | «were qualified to hold it precisely because they live under the core» |
| Bodies (1) | «the Meritboard, the Supreme Court, +1 Sanctuary by consensus» |
| Bodies (2), 80–90% | «Main Layer by 80–90% supermajority, and the President» |
| Already drifted past the core | «a civilization that has already drifted past the core the original founders wrote» |
| The honest path is amendment | «the honest path is amendment — not textual prohibition, not judicial reinterpretation» |
| Not revolution | «not revolution by other means» |
| Not untouchable | «The founding core is not untouchable.» |
| Expensive enough | «It is expensive enough to reach that only a civilization genuinely beyond it» |
| The cost is legitimate | «and at that point the cost is legitimate.» |

**Line 288**

| Claim | Verbatim quote |
|---|---|
| The older framing is abandoned | «is abandoned here as honest language» |
| Not immutable, load-bearing | «is not immutable — it is load-bearing» |
| Protection depends on the full gauntlet | «A principle whose protection depends on the full weight of the amendment gauntlet» |
| The old framing mis-stated both guarantees | «Calling it immutable overstated the textual guarantee while understating the structural one.» |
| Better than textual prohibition | «The actual guarantee is better than textual prohibition» |
| A textual bar bends or breaks | «must either be reinterpreted under pressure or produce revolution when it fails» |
| The structural core holds or visibly fails | «a core protected by structural improbability either holds or visibly fails» |
| No gray zone | «with no gray zone and no quiet reinterpretation.» |

**Line 316**

| Claim | Verbatim quote |
|---|---|
| AI surfaces anomalies | «The AI governance system surfaces civic participation anomalies» |
| Anomaly examples | «declining petition rates, dropping regulatory ratification participation, falling contestation volume» |
| Scope | «shrinking engagement in any district, domain, or demographic» |
| Citation: required input to the Art. XX audit | «as a required input to the Meritboard's Article XX audit cycle» |
| Below baseline: review and publish | «When participation drops below historical baselines, the Meritboard reviews and publishes its assessment» |
| Engagement, not satisfaction | «The metric measures engagement, not satisfaction.» |
| The assessment is public | «The assessment is public.» |
| Explanation contestable | «is itself contestable through the same participation mechanisms the metric measures» |
| Self-reinforcing | «making the metric self-reinforcing» |

**Line 319**

| Claim | Verbatim quote |
|---|---|
| 10 justices | «The Supreme Court of VMSS consists of 10 justices» |
| Source ranking and appointment | «drawn from the Meritboard's legal-interpretation ranking and appointed by the President» |
| Purely meritocratic | «Selection is purely meritocratic» |
| Ranking criteria | «demonstrated analytical depth, doctrinal comprehension, and sustained judgment under complexity» |
| Flexible composition | «justices may be human, AI, AGI, cyborg, or any combination thereof» |
| Any ratio | «in any ratio, reflecting the civilizational diversity the Court adjudicates» |
| No constituency | «No constituency elects them.» |
| No faction | «No political faction nominates them.» |

**Line 359**

| Claim | Verbatim quote |
|---|---|
| 3000 precision | «The VMSS of 3000 will be unrecognizable in its precision» |
| Compared with 2150 | «compared to the VMSS of 2150» |
| The founders build the framework | «The founding generation builds the framework.» |
| Later generations tighten it | «Every generation that follows tightens it.» |

**Line 362**

| Claim | Verbatim quote |
|---|---|
| 0.01% by 3000 | «The 0.01% leakage target by 3000 is measured across the layers» |
| Layers within full reach | «(+1 Sanctuary, Main Layer, and -1 Noncompliance)» |
| All categories | «and across all leakage categories» |
| Not a uniform promise | «it is not a uniform promise applied identically to every resident of every ring» |
| Graduated leakage | «Leakage is inherently graduated across the five-layer architecture» |
| Not a deficiency | «that graduation is not a deficiency» |
| Design expression | «It is the direct expression of each layer's design philosophy.» |

**Line 392**

| Claim | Verbatim quote |
|---|---|
| Closes the evasion vector | «The non-implanted pathway closes the primary evasion vector.» |
| Removing the implant to evade the kill switch | «Any actor who removes their implant to evade the kill switch» |
| Falls to the second instrument | «enters the second instrument's operational envelope instead.» |

**Line 464**

| Claim | Verbatim quote |
|---|---|
| The articles do the work | «Every article of this Charter is the civilization doing the work.» |
| The lines are what it is for | «The four founding lines in the Preamble are what the civilization is for.» |
| The articles change | «The articles change as the civilization learns.» |
| The lines do not change, though they can | «The four lines do not change, not because they cannot» |
| No generation has improved them | «no generation that has read them has found a way to improve» |

### Word counts

Counts are of visible body text: tags, the head, and script and style blocks are excluded, and dashes are not counted as words.

| Element | Before | After |
|---|---|---|
| Line 157 (Founding Lines note) | 78 | 70 |
| Line 169 (Art. II, 10:1) | 91 | 81 |
| Line 192 (III.II overtime) | 149 | 140 |
| Line 204 (III.IV transfers) | 217 | 217 |
| Line 221 (III.VI) | 42 | 42 |
| Line 287 (XI founding core) | 179 | 161 |
| Line 288 (XI "immutable") | 105 | 97 |
| Line 316 (XX participation) | 107 | 87 |
| Line 319 (XXI composition) | 82 | 76 |
| Line 359 (XXIII) | 32 | 28 |
| Line 362 (XXIV) | 66 | 66 |
| Line 392 (XXV.V) | 33 | 26 |
| Line 464 (Founding Affirmation) | 68 | 59 |
| **Page** | **14,954** | **14,855** (−99) |

### Flags

1. **Apparent conflict, left unchanged.** Art. XXI (line 321) says «No judge weighs the case. No judicial discretion modulates the outcome.» Art. XXVI (line 416) says «Judicial review weighs impairment as a contextual factor in assessing culpability». Neither sentence was touched.
2. **Apparent tension, left unchanged.** Art. XXI line 322 says «The same category of question can never reach the Court again through the novelty filter.» Line 323 says «A Court ruling that proves wrong in retrospect is revisable». The Charter names no route by which a revision reaches the Court.
3. **Possible conflict with the STI ruling, left unchanged.** The ruling says Sanctuary eligibility at STI ≥ 85 is immediate, with no duration requirement; this is the ruling that removed "sustained" from sads.html in 25.1.2. Art. VII line 264 still opens «Upward movement is earned through sustained compliance and demonstrated behavioral trajectory.» Related wording describes a population rather than an eligibility test: XXIV line 363 («has demonstrated sustained non-harmful conduct») and XI line 284 («through sustained demonstrated conduct»).
4. **Art. IX wording versus sads.html, left unchanged.** Line 273 says «Violation results in automatic exclusion back to the layer below.» sads.html (25.1.2, fix 13) now says "exclusion from the domain". The two agree if "the layer below" means the SAD's host Heaven Layer. A reader could instead take it as a layer move.
5. **Aphorism kept because it is quoted.** Art. XXI line 321, "The absence of a judge is not a gap — it is the design.", qualifies as an aphorism. simulations.html:3093 quotes it verbatim as Charter text, and editing it here would falsify that quote.
6. **Parallel sentences on other pages.** Several cut sentences have near-twins in other pages' own prose. These are not quotations of the Charter, so nothing breaks, but the 25.3 whitepaper pass will meet the same sentences:
   - C2: technologies.html:450
   - C3: systems.html:253, whitepaper.html:854 and :1948
   - C7: a longer variant at whitepaper.html:767
   - C8: whitepaper.html:625
7. **Paired em-dashes mostly left.** 43 sentences carry two em-dashes. Only three were converted (C4, C5, C11): the ones where the dashes wrapped a redundant phrase or clashed with a layer sign. The other 40 are defining parentheticals and were left, because converting them changes no meaning and adds churn to the highest-authority text. Examples:
   - the three axis definitions in XIV;
   - the four founding-core elements;
   - the LP-076 formula sentences, "The Charter fixes … — … — and reaches no rate", which are the text of an enacted amendment.
8. **Reversals kept on purpose.** In each of the following, the negation carries doctrine (what the rule excludes), so none qualified as a reversal "where the negation adds nothing":
   - "not welfare, but birthright" (III.I)
   - "The layers are not a hierarchy of suffering" (VII)
   - "Null is not a number" (II)
   - "This is not a promise — it is a direction" (XXIII)
   - "The threshold for -1 reassignment is not a countdown" (XV)
   - "not a reward to be collected, but a standard to be continuously met" (VII)
   - "The veto is not ceremonial" (XI)
9. **Unclear phrase left.** XI line 288, «is abandoned here as honest language», probably means "in favour of honest language". Fixing it would mean choosing a meaning, so it stays.
10. **Ceremonial-frame cuts.** C1 (the Founding Lines note) and C13 (the Founding Affirmation's "The Charter is how. The four lines are why.") are in the page's ceremonial frame. Both qualify under the rules, but Jason may want the cadence back. Either one reverts without touching anything else.
11. **Term removed.** C2 removes the Charter's only use of "threshold-riding" (technologies.html:450 still uses it). The Charter's defined term stays "boundary-riding exploit".
12. **Inscribed text untouched.** The Four Founding Lines (lines 153–156) were treated as inscribed instrument text, so they, the Preamble and every heading are unchanged.
