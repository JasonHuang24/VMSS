# Prose lift 25.3.2, patch wp3: whitepaper §23–34 (strict mode)

This is a strict, clarity-only pass on `whitepaper.html`, sections 23 through 34 (the glossary sections 32–34 included). It was made against main at 6a26c3c (v25.3.1, which already carries the §1–11 and §12–22 lifts). The range runs from `<h2>23. Military Posture` up to the `</article>` that closes the §34 glossary. The edits are in the copy in this folder; the live `whitepaper.html` is untouched and still equals `git show HEAD:whitepaper.html`.

**Range check.** Everything before the `<h2>23.` marker (306,930 bytes) is byte-identical to HEAD. Everything from the §34 `</article>` onward (the pagination block, the Constitutional Reference card, the footer placeholder and both scripts, 6,459 bytes) is byte-identical to HEAD, and the last glossary entry (Zero Leakage Aspiration) is unchanged. Inside the range only the 24 `<p>` elements listed below changed. `wp3-verify.mjs` asserts all of this.

Markers (checked by `wp3-verify.mjs`):
- Text inside ⟦⟧ is the before text, as raw source. It must appear in the original and must not appear in the copy.
- Text inside ⟪⟫ is the after text, as raw source. It must appear in the copy.
- Text inside «» is a claims-ledger quote, as rendered text. It must appear in the copy and be 15 words or fewer.

**Frozen strings checked before editing.** Every guard in `tools/check-canon.mjs` and `tools/test-canon-guard-mutations.mjs` that reads `whitepaper.html` was checked. The literal pins (Trajectory Doctrine, LP-070 standing gate, "aggregate dividend coverage", the 36-month window, the prohibited substitutions, the exact cascade) all sit in §12 (lines 877, 882, 884, 935), before this range. The page-wide guards also read this range: the stale-rate (`forbiddenCurrent`) pattern, the tier-claim guard, the superseded-refusal guard, the founder ruling/override and reviewer-seat layer guards, the stale "five currencies" check, the duplicate-id check, the LP deep-link resolution check (and its `law-polling.html#lp-0` mutation), the founding-entry `<h2>` section pins and the link-integrity guard. `wp3-verify.mjs` re-runs each of them against the copy. No edit touches a tag, an attribute, an href, an id or a heading.

**Quoted elsewhere.** Before editing, a distinctive 6–8 word run of every candidate sentence was searched for across all `*.html` files. No live page quotes any edited sentence as whitepaper text; the only exact hits were earlier prose-lift copies under `docs-review/`. Where a candidate turned out to be Charter or Code text in the same words, it was left alone (flag 2). Parallel prose found on other pages is noted per change and in flag 3.

## whitepaper.html

### Changes (24 elements)

Nine elements lose a "not X" reversal or a closer that restates what the element already says (A1b, A2, A3b, A4, A6, A7, A9b, A10, A12). Three lose a stock aphorism (A13, A14, A15). Fifteen dash pairs become parentheses or commas, with the words unchanged and in the same order (A1a, A3a, A5, A8, A9a, A11, G1–G8). One sentence is reordered so its dash pair goes (A16). A1b also turns "is the removal of" into "removes". No number, citation, defined term, rule modal, hedge, quotation, link or tag changed. The glossary entries (G1–G8) change punctuation only: no definition's scope, inclusions or exclusions changed, and every defined term, including the term being defined, is as it was.

**A1. §24.4, the biological leverage (line 1441).** Two edits.
- A1a. Habit: stacked em-dashes (a six-word list).
  - Before: `⟦Allied nations receive medical technology transfers &mdash; advanced diagnostics, fabrication-grade pharmaceuticals, infrastructure-grade automation &mdash; but never⟧`
  - After: `⟪Allied nations receive medical technology transfers (advanced diagnostics, fabrication-grade pharmaceuticals, infrastructure-grade automation) but never⟫`
  - Reason: parentheses keep "but never" attached to "receive". world.html:833 already uses this parenthesized form for the same sentence.
- A1b. Habit: a "not X. It is Y" reversal where the negation adds nothing.
  - Before: `⟦withdrawing medical technology transfers is not a symbolic gesture. It is the removal of healthcare infrastructure⟧`
  - After: `⟪withdrawing medical technology transfers removes healthcare infrastructure⟫`
  - Reason: the positive clause carries the claim; "cannot replicate independently" already says the loss is material. world.html:833 made the same change.
- Unchanged: "200–300", "Tier 1", "cannot", "never", "does not leave VMSS borders" and the closing sentence («The asymmetry is not a policy instrument — it is a physical reality»), whose single dash and contrast stay (flag 5).

**A2. §24.4, cross-treaty environmental trigger (line 1444).** Habit: a thesis closer restating the rule.
- Before: `⟦would produce treaty downgrade review. The trigger operates on the act, not on the actor&rsquo;s diplomatic classification.</p>⟧`
- After: `⟪would produce treaty downgrade review.</p>⟫` The paragraph now ends here.
- Reason: the paragraph opens by saying the concern holds «regardless of treaty status» and says just before the cut «Allied nations are not exempt». The closer restates both.
- Unchanged: "Article XXV.I", "§24.1", "Tier 1", "Tier 3 or Tier 4", "§25.1", "may", "regardless" (twice) and the four-item harm list (its 13-word dash pair stays; flag 4).

**A3. §24.6, intelligence operations (line 1452).** Two edits.
- A3a. Habit: stacked em-dashes (a six-word gloss).
  - Before: `⟦imminence verification requirement — verified deployment readiness of bypass-capable weapons — requires⟧`
  - After: `⟪imminence verification requirement (verified deployment readiness of bypass-capable weapons) requires⟫`
  - Reason: parentheses keep the subject joined to its verb, "requires".
- A3b. Habit: redundant restatement (stock filler).
  - Before: `⟦This is not optional; the doctrine is unoperatable without it.⟧`
  - After: `⟪cyber-intrusion infrastructure. The doctrine is unoperatable without it.⟫`
  - Reason: "requires" in the first sentence and "unoperatable without it" both say the capacity is mandatory; "This is not optional" said it a third time. "it" still refers to the surveillance named in the sentence before.
- Unchanged: the four surveillance targets and the transparency sentence (single dash kept). The Code's parallel (laws.html:2198, "is mandatory — the force doctrine is unoperatable without it —") is its own wording and was not touched.

**A4. §25.1, revival identity recognition (line 1465).** Habit: a "not X; it is Y" reversal where the negation adds nothing.
- Before: `⟦The recognition is not ceremonial; it is a structural condition⟧`
- After: `⟪The recognition is a structural condition⟫`
- Reason: nothing in the paragraph suggests the recognition might be ceremonial. The bold label and "must recognize" already make it a requirement, and the sentence's work is its "because" clause, which is unchanged.
- Unchanged: "must", "may", "§26.3", the five persisting items and the three long-horizon examples.

**A5. §25.6, sovereignty mapping (line 1483).** Habit: stacked em-dashes, where the closing dash made "governing" attach loosely.
- Before: `⟦internal layer equivalent &mdash; rule-of-law posture, human-rights record, institutional reliability, treaty conduct &mdash; governing⟧`
- After: `⟪internal layer equivalent (rule-of-law posture, human-rights record, institutional reliability, treaty conduct), governing⟫`
- Reason: with parentheses, "governing" clearly takes "layer equivalent" as its subject, matching the glossary entry («The mapping governs treaty scope»).
- Unchanged: all four criteria and all four governed items. The Code's twin (laws.html:2279) omits the criteria list; it was not touched.

**A6. §26.1, -1 travel (line 1503).** Habit: an aphorism closer.
- Before: `⟦attaching in full. Transfer changes geography, not consequence. <strong>⟧`
- After: `⟪attaching in full. <strong>-2 Violent Offense:</strong>⟫`
- Reason: it restates the clause it follows («with the citizen's status-based contract attaching in full»).
- Unchanged: "only", "may" (twice), the -2 and -3 rules, «The -2 and -3 gates are principles, not parameters», and the -2 closer («not an exit»), which states the no-lighter-environment rule the -1 closer did not.

**A7. §26.3, citizenship revocation (line 1515).** Habit: redundant restatement.
- Before: `⟦exclusion from the civilization. Layer reassignment moves the citizen within VMSS; it does not sever the relationship. The civilization keeps⟧`
- After: `⟪exclusion from the civilization. The civilization keeps⟫`
- Reason: the cut sentence says what the sentence before it says («Consequence is delivered through layer placement, not through exclusion from the civilization»), and the next sentence says it again for the most withdrawn layer.
- Unchanged: "Article X", "cannot", "always", the three departure mechanisms and all three "does not" commitments. The term "reassignment" drops once with the cut; "reassigns" survives in the next sentence.

**A8. §26.3, hostile-nation dual citizenship (line 1516).** Habit: stacked em-dashes, where the closing dash split "remains permitted" from "but triggers".
- Before: `⟦dual citizenship remains permitted &mdash; VMSS does not revoke citizenship for foreign-state affiliation &mdash; but triggers⟧`
- After: `⟪dual citizenship remains permitted (VMSS does not revoke citizenship for foreign-state affiliation) but triggers⟫`
- Reason: the aside gives the reason for "remains permitted"; parentheses keep "but triggers" attached to "dual citizenship".
- Unchanged: "Tier 2 or higher", "Tier 3 or higher", "§25.1", "§25.6", the three restricted-role examples and "applies fully".

**A9. §26.5, unauthorized entry (line 1523).** Two edits.
- A9a. Habit: stacked em-dashes (a four-word list).
  - Before: `⟦by any state &mdash; allied, non-allied, or hostile &mdash; is treated⟧`
  - After: `⟪by any state (allied, non-allied, or hostile) is treated⟫`
  - Reason: parentheses keep the subject joined to "is treated". The Code's version (laws.html:2311) keeps its own dash pair and a different continuation; it was not touched.
- A9b. Habit: an aphorism closer.
  - Before: `⟦committing the same act. Border sovereignty is architectural, not diplomatic.</p>⟧`
  - After: `⟪committing the same act.</p>⟫` The paragraph now ends here.
  - Reason: it restates «The response is not governed by which state crossed the border» and the allied-incursion example that follows it.
- Unchanged: "§24.4", "§24.1", the military-character list and the not-governed-by sentence.

**A10. §27, introduction (line 1528).** Habit: a "not X. It is Y" reversal.
- Before: `⟦The shared-stack character is not accidental. It is the design philosophy.⟧`
- After: `⟪The shared-stack character is the design philosophy.⟫`
- Reason: calling it the design philosophy already says it is intended. The §16.3 callout (line 1021, outside this range and outside the editable set) keeps its own "not accidental; it is" wording.
- Unchanged: the three shared-stack examples (single dash kept).

**A11. §27.5, space colonization (line 1543).** Habit: stacked em-dashes (a four-word name).
- Before: `⟦interstellar expansion — the Universe of VMSS — but⟧`
- After: `⟪interstellar expansion (the Universe of VMSS), but⟫`
- Reason: the name is an aside. world.html:984 already uses exactly this form.
- Unchanged: every capability claim and "the Universe of VMSS".

**A12. §28.0, the redundant envelope pattern (line 1552).** Habit: a "not X; it is Y" reversal.
- Before: `⟦The pattern is not incidental; it is the architecture&rsquo;s primary defense⟧`
- After: `⟪The pattern is the architecture&rsquo;s primary defense⟫`
- Reason: "primary defense" already says the pattern is deliberate, and the paragraph opens by naming it an architectural pattern.
- Unchanged: «three to five stacked deterrent envelopes», "any" (twice) and the whole closing §28.0 paragraph («The answer is uniform: there is a next envelope.»).

**A13. §29, introduction (line 1589).** Habit: an aphorism closer.
- Before: `⟦the prototype of 2150. That gap is the point.</p>⟧`
- After: `⟪the prototype of 2150.</p>⟫` The paragraph now ends here.
- Reason: that the gap is intended is already said by «oriented toward the 31st century as the horizon of mature operation».
- Unchanged: "31st century", "3000", "2150".

**A14. §30.1 (line 1686).** Habit: stock filler (a proverb).
- Before: `⟦coherence over universality. Frameworks that try to be everything to everyone end up being nothing to anyone. A system⟧`
- After: `⟪coherence over universality. A system⟫`
- Reason: the proverb restates «VMSS chose coherence over universality», and the section's own argument follows in the next sentence.
- Unchanged: "cannot" and the stronger-than comparison.

**A15. §31, conclusion (line 1692).** Habit: an aphorism closer.
- Before: `⟦in an executive summary. The depth is the point.</p>⟧`
- After: `⟪in an executive summary.</p>⟫` The paragraph now ends here.
- Reason: it restates «The document is comprehensive because the civilization is comprehensive».
- Unchanged: "thirty sections", both lists and "cannot".

**A16. §31, The Jury Has Spoken (line 1696).** Habit: stacked em-dashes, where the closing dash left "not constitutional" hanging after a 14-word list of questions.
- Before: `⟦The questions that remain are operational — how fast does leakage close, how does the technology mature, how does the civilization scale — not constitutional.⟧`
- After: `⟪The questions that remain are operational, not constitutional: how fast does leakage close, how does the technology mature, how does the civilization scale.⟫`
- Reason: the contrast now sits next to the word it qualifies and the colon introduces the questions. The words are the same; only their order and punctuation changed.
- Unchanged: "March 29, 2026" and every other sentence in the paragraph. The reversal sentence «The framework described in this whitepaper is not asking for permission» would otherwise have been a cut candidate; it was left because it is part of an apparent tension (flag 7a).

**G1. Glossary, Clearable vs. Permanent Infractions (line 1766).** Habit: stacked em-dashes (a three-item list).
- Before: `⟦Minor infractions — fraud, harassment, compulsive deception — are clearable⟧`
- After: `⟪Minor infractions (fraud, harassment, compulsive deception) are clearable⟫`
- Reason: parentheses keep the subject joined to "are clearable". The list is unchanged, so the definition covers exactly the same infractions. The Charter's Art. XV sentences on minor infractions use different words and were not touched.
- Unchanged: "Article XV" (heading), "can", "never", the permanent-flag list.

**G2. Glossary, The Five Rings (line 1835).** Habit: stacked em-dashes (a three-word aside in a sentence that already has a semicolon).
- Before: `⟦names something else — the stratification architecture — but serves⟧`
- After: `⟪names something else (the stratification architecture) but serves⟫`
- Reason: parentheses keep "but serves" attached to "VMSS". The three quoted strings are untouched.
- Unchanged: every quoted string, "five concentric terraced mega-rings", both name senses.

**G3. Glossary, Hostile State Doctrine (line 1868).** Habit: stacked em-dashes (a five-word aside).
- Before: `⟦micro-drone networks — some as small as insects — maintain⟧`
- After: `⟪micro-drone networks, some as small as insects, maintain⟫`
- Reason: commas keep the subject joined to "maintain". world.html:1001 already uses this comma form. The entry's other pair (the 15-word classification-margin gloss) stays (flag 4).
- Unchanged: "deliberately", "largely", "any hostile-classified state".

**G4. Glossary, ImmersionTube (line 1871).** Habit: stacked em-dashes (a seven-item list).
- Before: `⟦Full sensory capture — audio, vision, taste, touch, smell, proprioception, emotional tone — producing⟧`
- After: `⟪Full sensory capture (audio, vision, taste, touch, smell, proprioception, emotional tone) producing⟫`
- Reason: §27.1 (line 1531) gives the same list in parentheses; the glossary now takes the same form.
- Unchanged: all seven senses and the other three sentences.

**G5. Glossary, Juvenile Null-Scoring (line 1891).** Habit: stacked em-dashes (a three-word gloss).
- Before: `⟦null STI scores — unreported and uncomputed — while⟧`
- After: `⟪null STI scores (unreported and uncomputed) while⟫`
- Reason: parentheses mark the gloss as a definition of "null" and keep "while" in the main sentence.
- Unchanged: "18" (twice), "§5.12" (heading), "trajectory weighting formula".

**G6. Glossary, Origin Purists / Self-Authorship Modernists (line 1945).** Habit: stacked em-dashes, where the closing dash left "philosophically aligned" hanging.
- Before: `⟦inherited luck — editing yourself as agency, not shame — philosophically⟧`
- After: `⟪inherited luck (editing yourself as agency, not shame), philosophically⟫`
- Reason: with parentheses, "philosophically aligned" clearly describes the Modernists. The Origin Purists sentence keeps its single dash.
- Unchanged: both faction names, "may", "Lineage Integrity Domains", "Sanctuary".

**G7. Glossary, Predictive Intervention Architecture (line 1969).** Habit: stacked em-dashes (a four-word contrast).
- Before: `⟦PIA is an AGI-tool system — not an AGI citizen — composed⟧`
- After: `⟪PIA is an AGI-tool system, not an AGI citizen, composed⟫`
- Reason: commas keep the contrast in the main line of the sentence (parentheses would have played down a distinction the architecture rests on) and keep "composed" attached to "system".
- Unchanged: every reliability figure, "4-to-72-hour", "only", "2258", "Resources 31–33". The single dash inside the reliability parenthesis stays.

**G8. Glossary, Transit-Right Doctrine (line 2067).** Habit: stacked em-dashes (a six-word aphorism inside a rule sentence).
- Before: `⟦the transit itself requires — movement through is not presence within — while⟧`
- After: `⟪the transit itself requires (movement through is not presence within), while⟫`
- Reason: parentheses keep "while VMSS retains authority" attached to the rule. The aphorism is kept, not cut: the Code's version (laws.html:2311) leaves it out, but the glossary is the only place that states it.
- Unchanged: "may", "never", "without exception", "no immunity", "§26.5". The earlier single dash in the tiering sentence stays.

### Claims ledger

Every claim, number and citation in each edited element, quoted from the copy.

**Line 1441 (§24.4, biological leverage)**

| Claim | Verbatim quote |
|---|---|
| Leverage | «The decisive leverage is biological.» |
| Lifespan | «VMSS citizens live 200–300 years with full cognitive integrity.» |
| Longevity stays home | «Longevity augmentation is proprietary technology that does not leave VMSS borders.» |
| Allied transfers | «Allied nations receive medical technology transfers» |
| Transfer list | «(advanced diagnostics, fabrication-grade pharmaceuticals, infrastructure-grade automation)» |
| Never longevity | «but never the longevity stack itself» |
| Tier 1 effect | «A Tier 1 sanction withdrawing medical technology transfers removes healthcare infrastructure» |
| Cannot replicate | «that the sanctioned nation cannot replicate independently» |
| Not policy | «The asymmetry is not a policy instrument — it is a physical reality» |
| No external power | «created by technology that no external power possesses» |

**Line 1444 (§24.4, environmental trigger)**

| Claim | Verbatim quote |
|---|---|
| Label | «Cross-treaty environmental enforcement trigger.» |
| Regardless of treaty | «Planetary ecological damage is treated as a civilizational concern regardless of treaty status.» |
| Art. XXV.I | «The Article XXV.I clean energy mandate operates as a cross-layer prohibition inside VMSS» |
| External counterpart | «its external counterpart is this sanctions-architecture trigger for damage that crosses sovereign boundaries» |
| Harm (1) | «Sustained industrial-scale ecological harm by a non-VMSS nation» |
| Harm (2) | «atmospheric toxin release, irreversible biosphere degradation, biodiversity collapse» |
| Harm (3) | «produced by state-scale industrial policy» |
| Tier 1 entry | «enters the sanctions ladder at Tier 1 on first detection» |
| Escalation | «escalates on the same Meritboard-audited process as any other sanctions trigger» |
| Rationale | «The externality principle is the architectural rationale» |
| Borders | «ecological harm does not respect treaty borders» |
| Downstream | «VMSS's own population is a downstream recipient of planetary environmental conditions» |
| Sovereign status | «regardless of the sanctioned nation's sovereign status» |
| May enter defense track | «Sustained noncompliance under escalating sanctions may enter the national defense track» |
| §24.1 tiers | «under §24.1 Tier 3 or Tier 4» |
| Imminence | «where verified, deployment-ready ecological threat meets the imminence thresholds» |
| Force Doctrine | «the Force Doctrine already defines» |
| Allies, §25.1 | «Allied nations are not exempt — alliance membership requires meeting §25.1 criteria» |
| Downgrade | «ecological harm at civilizational scale would produce treaty downgrade review.» |

**Line 1452 (§24.6)**

| Claim | Verbatim quote |
|---|---|
| Requirement | «The External Force Doctrine's imminence verification requirement» |
| Gloss | «(verified deployment readiness of bypass-capable weapons)» |
| Capacity | «requires continuous defensive foreign intelligence capacity» |
| Targets (1) | «The civilization maintains surveillance of non-allied state weapons development, force posture» |
| Targets (2) | «diplomatic signaling, and cyber-intrusion infrastructure» |
| Necessity | «The doctrine is unoperatable without it.» |
| Transparency | «Published doctrine on hostile-state surveillance makes the posture transparent» |
| Known | «hostile states know they are being watched» |
| Deterrent | «the transparency itself is part of the deterrent» |

**Line 1465 (§25.1, revival identity)**

| Claim | Verbatim quote |
|---|---|
| Prerequisite | «Revival identity recognition is a treaty prerequisite.» |
| Must recognize | «Alliance partners must recognize the legal continuity of VMSS citizens across revival events» |
| Persisting (1) | «property ownership, contractual obligations, marital status, institutional standing» |
| Persisting (2) | «and legal personhood all persist through backup vessel revival» |
| Same person | «resumes the same legal person they were before the death event» |
| No break | «with no break in ownership, obligation, or standing» |
| Structural condition | «The recognition is a structural condition of treaty membership» |
| Operations (1) | «long-horizon citizen operations (multi-century property holdings, cross-revival contracts» |
| Operations (2) | «marriages that outlive multiple revivals) depend on the allied legal system» |
| Continuity | «treating continuity as continuity» |
| Non-allied | «Non-allied states carry no such obligation.» |
| Risks | «may find property re-adjudicated, contracts voided, or marital status unrecognized under foreign law» |
| Remediation, §26.3 | «the recall protocol (§26.3) and VMSS's own institutional channels provide whatever remediation is possible» |
| Accepted cost | «foreign non-recognition is accepted as the cost of operating in non-allied jurisdictions» |

**Line 1483 (§25.6)**

| Claim | Verbatim quote |
|---|---|
| Mechanical mapping | «Alliance interoperability at the border operates through a mechanical cross-system layer classification mapping.» |
| At signing | «is mapped to VMSS's five-layer architecture at treaty signing» |
| Not ad hoc | «with the mapping structure rather than an ad-hoc per-case translation» |
| Arrival | «arrives at VMSS border carrying their allied-system classification» |
| Conversion | «the mapping converts that classification to its VMSS equivalent» |
| Processing | «standard border processing proceeds against the VMSS equivalent» |
| Symmetric | «The mapping is explicit and symmetric» |
| Reverse direction | «VMSS citizens crossing in the other direction carry their VMSS classification mapped» |
| Ring counts | «Ring-count differences (four-ring, five-ring, six-ring) are absorbed by the mapping structure» |
| No bespoke | «citizens do not encounter bespoke case-by-case interpretation at each border crossing» |
| Sovereignty mapping | «Each recognized foreign sovereignty is additionally mapped to an internal layer equivalent» |
| Criteria | «(rule-of-law posture, human-rights record, institutional reliability, treaty conduct)» |
| Governs (1) | «governing treaty scope, extradition posture, transit-right conditions» |
| Governs (2) | «and downward-transfer rate applicability, updated as sovereign conditions evolve» |

**Line 1503 (§26.1)**

| Claim | Verbatim quote |
|---|---|
| Explicit | «The per-layer matrix is explicit.» |
| +1/Main | «+1 Sanctuary and Main Layer: free international travel through controlled border infrastructure» |
| Destination | «subject to destination-side requirements» |
| -1 restricted | «-1 Noncompliance: restricted-list travel under bilateral monitoring agreements with the destination state» |
| Per trip | «federal review required per trip» |
| May approve | «Destinations willing to accept behaviorally-flagged citizens under monitoring terms may approve; others decline.» |
| Only transfer | «Permanent relocation exists only as tier-equivalent transfer» |
| May accept | «an allied jurisdiction operating under published reciprocal treaty coordination may accept a -1 resident» |
| Contract attaches | «into its equivalent consequence tier, with the citizen's status-based contract attaching in full.» |
| -2 no travel | «-2 Violent Offense: no international travel.» |
| Either direction | «-2 residents do not cross the VMSS border in either direction, with a single exception» |
| Exception | «tier-equivalent transfer to an allied jurisdiction under reciprocal treaty coordination» |
| Equivalent tier | «the receiving state maintains an equivalent consequence tier» |
| Attaches | «the citizen's status-based contract attaches in full» |
| Not an exit | «The transfer is a change of custody framework between treaty partners, not an exit» |
| Not lighter | «no resident crosses into an environment lighter than the one their conduct assigned» |
| -3 sealed | «-3 Terminal: the border is sealed in both directions.» |
| No leave, no enter | «-3 residents do not leave; foreign visitors do not enter.» |
| Categorical | «The seal is categorical and operates at the infrastructure level» |
| Commitment | «not a policy preference but a load-bearing architectural commitment» |
| Terminal character | «consistent with -3's terminal character (death is final; the layer is institutionally withdrawn» |
| Seal follows | «the border seal follows the withdrawal)» |
| Principles | «The -2 and -3 gates are principles, not parameters» |
| Calibration detail | «the -1 monitoring list is a calibration detail administered through the standard bilateral treaty mechanism» |

**Line 1515 (§26.3, revocation)**

| Claim | Verbatim quote |
|---|---|
| Label | «Citizenship revocation: voluntary yes, involuntary no.» |
| Three mechanisms | «Three departure mechanisms operate distinctly.» |
| Exit, Art. X | «Exit (Article X) is physical departure with citizenship retained» |
| Relationship persists | «the citizen travels or lives abroad while the institutional relationship persists» |
| Re-entry | «re-entry is always possible subject to moral accounting on return» |
| Voluntary revocation | «Voluntary revocation is formal termination initiated by the citizen» |
| Effects | «the citizen files, the relationship ends, obligations and protections are released» |
| New immigration | «re-entry is treated as new immigration rather than return» |
| Blocked | «Voluntary revocation is blocked during an active recall protocol» |
| Cannot escape | «a citizen cannot use revocation to escape pending consequence» |
| Involuntary | «Involuntary revocation is not a VMSS instrument.» |
| No punishment | «The architecture does not revoke citizenship as punishment, does not exile for conduct» |
| No strip | «does not strip citizenship as a consequence for any act» |
| Layer placement | «Consequence is delivered through layer placement, not through exclusion from the civilization.» |
| Keeps every citizen | «The civilization keeps every citizen it has» |
| Most withdrawn layer | «including the ones it reassigns to its most withdrawn layer» |

**Line 1516 (§26.3, dual citizenship)**

| Claim | Verbatim quote |
|---|---|
| Label | «Three-tier dual citizenship doctrine.» |
| Three tiers | «Dual citizenship is permitted across three diplomatic tiers, each with different VMSS posture.» |
| Allied | «Allied nations: dual citizenship operates under published reciprocal treaty agreements» |
| Coordination, §25.1 | «coordinating on recall, extradition, revival-identity recognition (§25.1)» |
| §25.6 | «and border mapping (§25.6). This is the fully-coordinated case.» |
| Non-allied | «Non-allied nations: dual citizenship is permitted but VMSS carries no treaty obligation» |
| Both | «The citizen holds both citizenships» |
| Own jurisdiction | «VMSS exercises its own jurisdiction over the citizen in VMSS territory» |
| No reference | «without reference to foreign claims» |
| Likewise | «foreign jurisdictions do likewise within their borders» |
| No recognition | «No mutual recognition, no coordination, no extradition pathway.» |
| Hostile (1) | «Hostile nations (states under active sanctions Tier 2 or higher» |
| Hostile (2) | «or subject to External Force Doctrine Tier 3 or higher)» |
| Still permitted | «dual citizenship remains permitted (VMSS does not revoke citizenship for foreign-state affiliation)» |
| Scrutiny | «but triggers enhanced scrutiny, access limitations on sensitive institutional roles» |
| Roles (1) | «(Meritboard sub-rankings involving national security» |
| Roles (2) | «federal-administration positions touching classified infrastructure» |
| Roles (3) | «Supreme Court clerkships handling sovereign-tier cases)» |
| Applies fully | «standard layer-reassignment architecture applies fully for any offense without deportation substitution» |
| Practice | «The tiered doctrine matches modern developed-state practice» |
| Restrictions | «broad permission with context-specific restrictions rather than categorical ban» |

**Line 1523 (§26.5)**

| Claim | Verbatim quote |
|---|---|
| Any state | «Unauthorized entry into VMSS airspace or territorial waters by any state» |
| Violation | «(allied, non-allied, or hostile) is treated as a sovereignty violation» |
| §24.4 | «escalates to the appropriate sanctions tier under §24.4» |
| §24.1 | «or to the national defense track under §24.1 when the incursion carries military character» |
| Military list | «(armed vessels, military aircraft, coordinated sovereign-state operations)» |
| Not identity | «The response is not governed by which state crossed the border» |
| Character | «it is governed by the character of the crossing» |
| Allied, same | «An allied state committing an unauthorized military incursion faces the same national defense response» |
| As hostile | «as a hostile state committing the same act.» |

**Line 1528 (§27 introduction)**

| Claim | Verbatim quote |
|---|---|
| Governance framing | «The governance framing of this whitepaper describes how VMSS controls behavior.» |
| This section | «This section describes why people want to live there.» |
| Same stack | «The two framings rest on the same technology stack» |
| Implant | «the implant that enforces boundaries also enables full sensory media» |
| Fabrication | «the fabrication that builds backup vessels also synthesizes food» |
| Augmentation | «the augmentation that produces soldiers also produces dragons» |
| Design philosophy | «The shared-stack character is the design philosophy.» |

**Line 1543 (§27.5)**

| Claim | Verbatim quote |
|---|---|
| Death in space | «Backup vessels mean death in space is not permanent.» |
| Modifiable | «Biological augmentation means humans can be modified for low-gravity, high-radiation environments.» |
| On-site | «Fabrication satellites mean infrastructure can be built on-site from raw materials.» |
| Moon, Mars | «Moon colonies and Mars settlements are near-future applications of existing VMSS capabilities.» |
| Interstellar | «extends beyond the solar system into interstellar expansion (the Universe of VMSS)» |
| Near-term | «the near-term colonies are logical extensions of infrastructure already operating in orbit» |

**Line 1552 (§28.0)**

| Claim | Verbatim quote |
|---|---|
| Bounded | «the architectural pattern that makes every category bounded rather than catastrophic» |
| Naming | «deserves explicit naming» |
| No single instrument | «VMSS does not depend on any single instrument for any load-bearing function.» |
| Three to five | «Every load-bearing capability carries three to five stacked deterrent envelopes» |
| Next layer | «so that evasion of any single one falls into the next layer» |
| Primary defense | «The pattern is the architecture's primary defense against the single-point-of-failure problem» |
| Catastrophic regimes | «produces catastrophic regimes when load-bearing infrastructure is captured, compromised, or evaded» |

**Line 1589 (§29 introduction)**

| Claim | Verbatim quote |
|---|---|
| Long-duration | «VMSS is designed as a long-duration civilization rather than a temporary political arrangement.» |
| Oriented (1) | «Its infrastructure, governance model, energy planning, and leakage reduction trajectory» |
| Oriented (2) | «oriented toward the 31st century as the horizon of mature operation» |
| 3000 | «The civilization of 3000 will be unrecognizable in its precision» |
| 2150 | «compared to the prototype of 2150.» |

**Line 1686 (§30.1)**

| Claim | Verbatim quote |
|---|---|
| Specificity | «A civilization that defines layer reassignment at granular specificity» |
| Criteria | «publishes threshold criteria for every offense category» |
| Neural level | «operationalizes pre-intervention at the neural level» |
| Cannot go vague | «cannot then go vague on contested questions and maintain credibility» |
| Neutrality worse | «Neutrality on a question the architecture's logic clearly resolves would be more damaging» |
| Than position | «than the controversial position itself» |
| Signal | «it would signal that the architects either had not thought about it» |
| Impossible | «(impossible given the system's detail level)» |
| Afraid | «or were afraid to state their position» |
| Coherence | «VMSS chose coherence over universality.» |
| Stronger (1) | «A system that is internally consistent and externally controversial is stronger» |
| Stronger (2) | «than a system that is externally inoffensive and internally hollow.» |

**Line 1692 (§31)**

| Claim | Verbatim quote |
|---|---|
| Thirty sections | «the Vertical Moral Stratification System across thirty sections» |
| Scope (1) | «from founding philosophy through governance, economy, technology, enforcement, domains, rights» |
| Scope (2) | «military posture, international relations, and civilizational trajectory» |
| Comprehensive | «The document is comprehensive because the civilization is comprehensive.» |
| Governs (1) | «A system that governs layer placement, economic participation, trust measurement, military defense» |
| Governs (2) | «cultural life, and population sustainability» |
| No summary | «cannot be explained in an executive summary.» |

**Line 1696 (§31, The Jury Has Spoken)**

| Claim | Verbatim quote |
|---|---|
| Date, not proposal | «The Founding Treaty, signed March 29, 2026, is not a proposal awaiting approval.» |
| Ratified | «It is a constitutional instrument that has already been ratified.» |
| Framework | «The framework described in this whitepaper is not asking for permission» |
| Explaining | «it is explaining what has been enacted» |
| Operational | «The questions that remain are operational, not constitutional» |
| Questions (1) | «how fast does leakage close, how does the technology mature» |
| Questions (2) | «how does the civilization scale.» |
| Settled | «The architecture is settled.» |
| Founding generation | «The founding generation chose it, signed it, and began building on it.» |
| Fixed standard | «What comes next is execution against a fixed standard» |
| Not debate | «not continued debate about whether the standard is correct.» |

**Line 1766 (Glossary, Clearable vs. Permanent Infractions)**

| Claim | Verbatim quote |
|---|---|
| Distinction (1) | «The distinction between minor violations that can be removed from the active record» |
| Distinction (2) | «if trajectory improves, and major offenses that carry permanent flags» |
| Never clear | «Murder, rape, and severe predatory violence produce permanent flags that never clear.» |
| Minor list | «Minor infractions (fraud, harassment, compulsive deception) are clearable» |
| Through improvement | «are clearable through sustained behavioral improvement.» |
| Direction | «Trajectory evaluation watches direction, not moments.» |

**Line 1835 (Glossary, The Five Rings)**

| Claim | Verbatim quote |
|---|---|
| Proper name | «The proper name of the civilization» |
| Polity | «the polity the Founding Treaty established and the Charter Preamble constitutes» |
| Preamble words | «"We establish The Five Rings Civilization"» |
| Literal | «The name is literal: the territory is five concentric terraced mega-rings on a single landmass» |
| Center, perimeter | «+1 Sanctuary at the center, -3 Terminal at the perimeter» |
| Mega-wall | «each boundary a continuous mega-wall» |
| Parallel | «The relationship between the two names parallels "the United States" and "America."» |
| By structure | «The Five Rings names the polity by its structure» |
| United States | «as "United States" names a union of states» |
| Something else | «VMSS technically names something else (the stratification architecture)» |
| Everyday name | «but serves as the civilization's everyday name» |
| America | «as "America" technically names a continent yet serves as the country's» |
| Interchangeable | «In ordinary usage the names are interchangeable» |
| Precise (1) | «in precise usage, The Five Rings is the nation» |
| Precise (2) | «VMSS is the system the nation runs on» |

**Line 1868 (Glossary, Hostile State Doctrine)**

| Claim | Verbatim quote |
|---|---|
| Declared posture | «The publicly declared surveillance posture toward states classified as hostile.» |
| Assets | «Stealth aircraft, orbital satellites, and micro-drone networks, some as small as insects» |
| Coverage | «maintain continuous intelligence coverage of any hostile-classified state» |
| Declared | «This is declared doctrine, not covert operations» |
| Watched | «hostile states know they are being watched» |
| Deterrent | «that transparency is itself a deterrent» |
| Thin margin | «The classification margin is deliberately thin» |
| Suspected (1) | «suspected alignment with adversarial powers draws the same surveillance and trade-restriction regime» |
| Suspected (2) | «as confirmed hostility» |
| Neutral states | «neutral states with clean diplomatic records are largely left alone» |
| Path | «The path from hostile to allied is open but requires demonstrated commitment» |
| Order | «clean slate first, then treaty application» |

**Line 1871 (Glossary, ImmersionTube)**

| Claim | Verbatim quote |
|---|---|
| Platform | «The civilization's primary media platform.» |
| Capture list | «Full sensory capture (audio, vision, taste, touch, smell, proprioception, emotional tone)» |
| No Earth medium | «producing experiences no Earth-era medium can approximate» |
| Prior formats | «Makes all prior media formats partial by comparison.» |
| Art form | «Sensory artists compose original experiences as a new art form.» |

**Line 1891 (Glossary, Juvenile Null-Scoring)**

| Claim | Verbatim quote |
|---|---|
| Under 18 | «citizens under age 18 carry null STI scores (unreported and uncomputed)» |
| Data accumulates | «while behavioral data accumulates in the implant ledger» |
| At 18 | «At 18, the ledger initializes against the accumulated record» |
| Formula | «using the trajectory weighting formula» |
| First score | «the first published score reflects the entire childhood conduct» |
| Observed, not scored | «Children are behaviorally observed but not yet scored against peers.» |
| Purpose | «Prevents scoring pressure from shaping childhood development» |
| Record kept | «while preserving the behavioral record the initialization requires» |

**Line 1945 (Glossary, Origin Purists / Self-Authorship Modernists)**

| Claim | Verbatim quote |
|---|---|
| Factions | «The two cultural factions produced when advanced biological augmentation made baseline embodiment editable.» |
| Purists | «Origin Purists prize untouched inheritance and unbroken natural lineage» |
| Purist view | «unmodified form as authentic, engineered beauty as manufactured» |
| May concentrate | «over long horizons they may concentrate into Lineage Integrity Domains within Sanctuary» |
| Enclaves | «high-trust enclaves where genetic purity is institutionally verified» |
| Modernists | «Self-Authorship Modernists hold chosen embodiment more meaningful than inherited luck» |
| Agency | «(editing yourself as agency, not shame)» |
| Aligned | «philosophically aligned with the civilization's emphasis on self-determination» |
| Ugliness | «Augmentation eliminated involuntary ugliness as a civilizational condition» |
| Hierarchy | «it did not eliminate status hierarchy, it mutated it into a gradient of origin legitimacy» |
| Coexist | «The two factions coexist within the same architectural framework» |
| Metric logic | «gated by the same metric logic, serving entirely different philosophies» |

**Line 1969 (Glossary, Predictive Intervention Architecture)**

| Claim | Verbatim quote |
|---|---|
| Formal name | «The formal institutional name for Precognition.» |
| Tool, not citizen | «PIA is an AGI-tool system, not an AGI citizen» |
| Composition | «composed of three mature VMSS technologies operating under a coordination layer» |
| Technologies | «neural-dive infrastructure, aggregated implant telemetry, and AGI predictive cognition» |
| Output | «Output: act-initiation forecasts with confidence envelopes, predicted time-of-act windows» |
| Provenance | «and documented signal provenance» |
| Horizon | «Operational envelope: 4-to-72-hour prediction horizons on specific act-classes» |
| Reliability (1) | «with reliability varying by class (~94% lethal-harm, ~87% sexual violence» |
| Reliability (2) | «~82% non-sexual violent assault, ~51% fraud — below operational threshold)» |
| Precog | «Colloquially called precog.» |
| Deployed only | «Deployed only within the Precognition Covenant Domain» |
| 2258 | «voluntary district-scoped Precog-analog domains under the 2258 inter-layer compromise» |
| Resources | «Full treatment in Resources 31–33.» |

**Line 2067 (Glossary, Transit-Right Doctrine)**

| Claim | Verbatim quote |
|---|---|
| Sovereign | «The doctrine governing passage through VMSS airspace and territorial waters, which are sovereign.» |
| No blanket | «No blanket transit right exists» |
| Authorization | «crossing requires explicit authorization tiered by the diplomatic classification of the crossing state» |
| Allied (1) | «allied states through designated treaty corridors with advance notification» |
| Allied (2) | «implant-verified crew manifests, and real-time tracking» |
| Non-allied | «non-allied states case by case through diplomatic channels, never automatic» |
| Hostile | «hostile states denied without exception» |
| Character | «Unauthorized entry is a sovereignty violation answered by the character of the crossing» |
| Not identity | «not the identity of the crosser» |
| No immunity | «Authorized transit confers no immunity for acts committed during it.» |
| Persons | «The state frame does not reach persons» |
| May traverse | «any citizen or recognized foreign national may traverse VMSS territory» |
| No trigger | «without triggering entry, residency, or an expanded jurisdictional claim» |
| Aphorism | «beyond what the transit itself requires (movement through is not presence within)» |
| Retained authority, §26.5 | «while VMSS retains authority over acts committed during transit. §26.5.» |

### Word counts

Counts are of visible body text: tags, the head, and script and style blocks are excluded, and dashes are not counted as words.

| Element | Before | After |
|---|---|---|
| Line 1441 (§24.4 leverage) | 91 | 82 |
| Line 1444 (§24.4 environmental trigger) | 185 | 173 |
| Line 1452 (§24.6) | 70 | 66 |
| Line 1465 (§25.1 revival identity) | 161 | 157 |
| Line 1483 (§25.6) | 149 | 149 |
| Line 1503 (§26.1) | 246 | 241 |
| Line 1515 (§26.3 revocation) | 162 | 149 |
| Line 1516 (§26.3 dual citizenship) | 190 | 190 |
| Line 1523 (§26.5) | 99 | 93 |
| Line 1528 (§27 introduction) | 67 | 63 |
| Line 1543 (§27.5) | 71 | 71 |
| Line 1552 (§28.0) | 79 | 75 |
| Line 1589 (§29 introduction) | 57 | 52 |
| Line 1686 (§30.1) | 116 | 102 |
| Line 1692 (§31) | 71 | 66 |
| Line 1696 (§31 The Jury Has Spoken) | 98 | 98 |
| Line 1766 (Clearable vs. Permanent Infractions) | 53 | 53 |
| Line 1835 (The Five Rings) | 133 | 133 |
| Line 1868 (Hostile State Doctrine) | 101 | 101 |
| Line 1871 (ImmersionTube) | 41 | 41 |
| Line 1891 (Juvenile Null-Scoring) | 71 | 71 |
| Line 1945 (Origin Purists / Self-Authorship Modernists) | 116 | 116 |
| Line 1969 (Predictive Intervention Architecture) | 102 | 102 |
| Line 2067 (Transit-Right Doctrine) | 138 | 138 |
| **§23–34 range** | **18,482** | **18,397** (−85) |
| **Page** | **54,097** | **54,012** (−85) |

These are the figures `wp3-verify.mjs` prints on its INFO lines.

### Flags

1. **Sequencing.** This copy was made from HEAD 6a26c3c, which already includes the v25.3.0 (§1–11) and v25.3.1 (§12–22) edits, so it holds all three patches and can ship as is. `wp3-verify.mjs` compares against `git show HEAD:whitepaper.html`, so it will fail by design once HEAD moves.
2. **Twin text left as the Charter or Code words it.**
   - Glossary, Consensus Window Deliberation: «Every vote — yes, no, or abstain — may be rescinded» is the Charter's wording, and wp1 kept the same sentence in §9.2 (line 759; wp1 flag 3). The glossary copy keeps its dash pair so all three stay parallel.
   - Glossary, Backup Vessel: «Revival is binary — full fidelity or revival failure — with layer-graduated failure probability». Charter Art. IV (charter.html:246) opens with the same words and the same dash ("Revival is binary — full fidelity or failure"). Left so the shared opening stays parallel. It could reasonably go either way, since the Charter continues differently.
   - §25.6, «Entry denial is the mechanical response to mapping mismatch.» This restates the sentence before it, but the Code (laws.html:2279) carries the same clause. Left so the two stay parallel.
3. **Parallel prose on other pages (not quotations).** No live page quotes an edited sentence as whitepaper text.
   - world.html already uses the forms A1 (line 833), A11 (line 984) and G3 (line 1001) adopt, and §27.1 (line 1531) already uses G4's form.
   - The Code has near-twins of A3 (laws.html:2198), A5 and §25.6 (laws.html:2279), A9a and G8 (laws.html:2311), in its own words. None was edited.
   - A10 leaves §27 reading differently from the §16.3 callout (line 1021, «The shared-stack character is not accidental; it is the design philosophy»), which is outside both this range and the editable set.
4. **Paired em-dashes mostly left.** 48 sentences in §23–34 carried two or more em-dashes before this pass; 33 still do (the verify script's sentence splitter, approximate). Pairs were converted only when:
   - the pair wrapped seven words or fewer and was not Charter or Code text (A1a, A3a, A8, A9a, A11, G1–G5, G7, G8);
   - the closing dash made the next word's role unclear (A5 "governing", A8 "but triggers", A16 "not constitutional", G6 "philosophically aligned").

   The rest are glosses or lists of seven words or more, the same calibration as wp1 and wp2 flag 4. Examples: the §24 counter-sovereignty gloss, the §24.2 prevention list, the §24.4 harm list, the §24.5 and glossary voluntary-accession definitions, the §25.5 "Everything else" gloss, the §25.6 lenient-classification gloss, the §25.7 operational, Tier 0 and humanitarian asides, the §26.2 foreign-nationals and sponsorship lists, the §28 promise-chain list, the §28.2 supporting-systems list and the hedged "whenever they occur across the 21st and 22nd centuries", the §28.3 error-class glosses, and the glossary entries for Boundary-Riding, Continuity Sovereignty, Five Instruments (the pair wraps a citation), Forestalled Act Ledger, Hostile State Doctrine (margin gloss), Implant Kill Switch, Layer STI Ambient Standard, Leakage, Oyelaran Conjecture, Pre-Act Discrete State Transition and Technology Transfer Tiers. The STI entry's two dashes sit in separate parentheticals.
5. **Closers and reversals kept on purpose.** Each restates something, but either carries a frozen modal or qualifier, answers an objection, or makes a claim nothing else in its element makes:
   - §23, "The acknowledgment itself is the deterrent", the section's thesis, repeated in the Five Instruments entry.
   - §23.1, "The cleanest military instrument available." It is the only superlative claim for the kill switch.
   - §24.2, "The civilization that wants to be the kind of civilization VMSS is cannot afford a doctrine…". It restates the preemption rule but carries "cannot". It could reasonably go either way.
   - §24.4, «The asymmetry is not a policy instrument — it is a physical reality». The contrast between policy and physical fact is the claim (world.html reorders it; here it stays).
   - §24.4, "Sanctions are not a one-way ratchet." It is the de-escalation paragraph's topic sentence.
   - §25.1, "The absence of a centralized court is a deliberate design choice, not a gap —…". It answers the gap objection. It could reasonably go either way.
   - §26.2, "Automatic waiver and automatic condemnation are both rejected." and "…the population, on its own initiative, does not let them starve." The second is the only statement that refugees are not left to starve.
   - §26.5, «The response is not governed by which state crossed the border». The negation carries the allied case.
   - §27.4, "The four lines do not need a standard form to be honored." It gives a reason and does not restate one.
   - §28.0's closing paragraph («The answer is uniform: there is a next envelope.»), the doctrine's reasoning frame.
   - §28.2, "The average obscures the structural dependency."; §29.1, "…is not a gap to be closed. It is the direct expression…" (the negation is the claim) and "Both are operating exactly as intended."
   - §31, "The civilization does not drift. It holds unless deliberately moved." Cutting the first would leave "It" with a vaguer antecedent, and the second carries "unless".
   - Glossary scope closers: Clean-Record "Nothing else." (exclusivity), Ceiling Seal "The only structural guarantee…", Founding Core "not untouchable", Authorized Bailout "Not an evasion mechanism", Civic Health "Not a punitive instrument", Meritboard "Not an appointed body", Metric Governance "The circularity is broken by design.", Stratification-Integrity "not a rights-based claim".
6. **Callouts untouched.** Every `div.callout-principle` in the range (§24.6, §27, §28, §30) is outside the editable element set. The two `div.callout` blocks (§23.2 "The asymmetry is total" and §31 "VMSS is not a utopia") contain `<p>` elements but are rhetorical set pieces and were treated like the principle callouts, as in wp1 and wp2.
7. **Possible tensions, left unchanged.**
   - a. §31 says the Founding Treaty «is not a proposal awaiting approval» and that the whitepaper «is not asking for permission». Its last paragraph calls VMSS «the most comprehensive proposal ever published». These can be read together (the treaty is enacted in-world; the whitepaper presents it to outside readers as a proposal), but the words collide. That is why A16 left the "not asking for permission" reversal in place.
   - b. Dyson timing. The Dyson Swarm entry says «reaching Dyson-class abundance by the 28th». §29.2 says «Full Dyson-class energy abundance by 2900», and the §29.1 table puts Dyson-class energy at 2900.
   - c. Revival Failure entry: «elimination as a meaningful leakage category by the 28th century». §29.1 lists «backup vessel revival failure approaches zero» among the 2850–3000 improvements. "Meaningful category" and "approaches zero" can be read together, but the timing differs.
   - d. §25 says the allied civilizations are «not a federation», while the instruments are the Federation Treaty and the Five Planet Federation. This is probably a deliberate contrast between name and structure.
   - e. §25.1 gives treaty partners «full access to VMSS exports», including fabrication technology. §25.7 withholds Tier 0 items from everyone and limits allies to civilian-grade fabrication. The two can be read together (Tier 0 items are never exports at all), but "full access" reads broader.
8. **Clarity note, left unchanged (not a listed habit).** §25.6, «with the mapping structure rather than an ad-hoc per-case translation», appears to be missing a word (perhaps "with the mapping fixed in structure"). Repairing it would be a rewrite, so it stands.
9. **Hedge, term and figure counts.** Across the range, the cuts remove nine uses of "not" (A1b, A2, A3b, A4, A6, A7, A9b, A10, A12). None is a rule modal or a scope hedge on a surviving rule. The counts of shall, must, may, may not, cannot, can, only, unless, except, never, should and would are identical, as are "regardless", "categorically", "deliberately" and "any". Term counts move only by the cuts: "reassignment" and "Layer reassignment" −1 (A7), "architectural" −1 (A9b), "geography" −1 (A6). No term was replaced by a synonym. The 563 numeric tokens, 150 citations and 8 quoted strings in the range are identical. `wp3-verify.mjs` asserts these exact deltas and fails on any other.
