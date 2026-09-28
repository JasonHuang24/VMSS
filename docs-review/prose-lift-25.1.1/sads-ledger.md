# Prose lift 25.1.1 ledger (sads.html)

Mode: clarity. Only the text inside running-prose `<p>` elements of the copy at `docs-review/prose-lift-25.1.1/sads.html` was edited. The page has no `<li>`, `<td>`, `<blockquote>` or JSON-LD.

Left byte-identical: `<head>` and all meta text, every heading (h1-h3) and `<summary>` ("Extended"), the theme script, the page style block, the noscript style and the footer script, the "What SADs Are" eyebrow, the hero subtitle, all 27 "Gating Metric:" lines (17 primary domains, HGMD, 9 MGDs), and all 9 "Ring:" chips. The Gating Metric lines were held frozen as definitional metric text even where they run past 8 words (see Flag 5).

Quotes are verbatim from the edited copy's visible text (entities decoded, inline tags stripped), each 15 words or fewer, inside « ». `sads-verify.mjs sads.html` checks every quote in this section against the copy. Original wording is in single quotes where it changed.

## sads.html

### Word counts

- All 98 `<p>` elements: 4,180 → 3,968 words (-5.1%), as counted by `sads-verify.mjs`.
- Running prose (the 61 `<p>` elements left after excluding the 27 Gating Metric lines, the 9 Ring chips and the hero subtitle): 3,798 → 3,581 words (-5.7%).
- The 47 changed elements: 3,407 → 3,190 words (-6.4%). 14 running-prose elements were left unchanged (RIL, PSD, BMD, WMD, GD, MHD and ISD summaries; PCD Academic Resources pointer; the closing SAD note; HGMD; ATWG, MCG, VLRC and CCTN cards).
- No element is longer than its original. No changed element has more than one em-dash; most changed elements now have none.
- Number tokens in the prose are identical as a multiset, including every "+1", "-1", "-2", "-3" layer reference, every year and every percentage. Word-numbers (seventeen, nine, three, seven, six-to-twelve) are also kept.
- No new Tailwind-utility tokens.

### Claims ledger

**What SADs Are**
- «Sanctuary is a complete life: fully livable, serviced and safe» (was 'fully livable, fully serviced, fully safe')
- «with no requirement to go anywhere else»
- «filtered more precisely than trust alone can provide»
- «a voluntary, revocable domain within Sanctuary, gated by a single measurable compliance metric»
- «A resident may qualify for several at once»
- «filtered for reasoning discipline and relational honesty»
- «automatic exclusion from that domain and nothing more»
- «with no VMSS reassignment and no punishment» (was 'nothing more: no VMSS reassignment, no punishment')
- «Sanctuary remains the destination, and SADs are optional refinements within it.» (was 'Sanctuary is the destination;')

**Relational Integrity Layer**
- «Creates a space of absolute trust in partnerships.» (summary unchanged)
- «the most frequently tested human-scale dimension of trust»
- «Sanctuary residents qualified for +1 through sustained demonstrated conduct» (unchanged; see Flag 2)
- «whose demonstrated conduct in partnership and intimacy has been flawless» (was 'in the specific domain of partnership and intimacy'; Article I term "demonstrated" restored on verifier pass)
- «The implant's relational-event record makes the metric auditable.»
- «coordinated dishonesty about sexual or emotional involvement, and related patterns all disqualify»
- «a single documented infraction disqualifies the resident, with no probation and no second chance» (was 'no probationary mechanism')
- «The binary structure is deliberate.»
- «certainty that every other resident has kept the same standard»
- «would cast doubt on the current state of every other resident's record»
- «Permanent exclusion is costly, and that cost sustains the environment's character.»
- «the resident keeps full Sanctuary standing under all other protections»
- «re-entry to the RIL is not available within the resident's lifetime»
- «because honesty is presumed rather than negotiated»
- «Partnerships form with less friction around disclosure.»
- «the metric produces the opposite of a surveillance culture» (was 'does not produce a surveillance culture but its inverse')
- «documented certainty of partners' past honesty reduces monitoring in current relationships» (was 'reduces rather than increases monitoring behavior')
- «a high bar at entry produces a low-surveillance environment inside»

**Physique Standards Domain** (unchanged)
- «body composition discipline rather than vague wellness claims»
- «Example equivalents may include 10% men / 15% women»
- «15% men / 20% women, and 20% men / 30% women»

**Cognitive Clarity Domain**
- «A home for sharp, bias-resistant thinkers.» (was 'A haven for razor-sharp, bias-resistant thinkers.')
- «Regular reasoning audits hold the environment to clear, coherent and disciplined thought.» (was 'preserve an environment optimized for clarity, coherence, and disciplined thought')
- «The CCD gates on reasoning discipline verified through periodic audits.»
- «The audits are structured conversations rather than coercive tests» (was 'not tests in the coercive sense. They are structured conversations')
- «an AGI citizen assigned to the audit function»
- «across domains of their choosing»
- «The process is cooperative. The resident selects the topics»
- «motivated reasoning, confirmation patterns, selective evidence weighting, unfalsifiable commitments»
- «conclusion-preservation rather than evidence-following»
- «whether the observed patterns are consistent with the CCD's standard»
- «quarterly for initial residents, extending to annual once a decade of sustained qualification» (was 'The audit cadence is substantial.' → 'Audits are frequent')
- «Non-participation is not forbidden, but it triggers automatic exclusion.»
- «The resident consents to each session separately»
- «can withdraw from one without prejudice»
- «withdrawing from multiple consecutive sessions triggers review»
- «publishes it in aggregate through the Meritboard audit channel»
- «confidential to the resident and the auditing AGI»
- «selected for reasoning discipline rather than shared conclusions»
- «disagree on substantive matters regularly and vigorously»
- «arguments are traced to their premises, premises are checked against evidence» (was 'tracked', 'evaluated for evidence-base')
- «evidence quality is assessed»
- «slower and more productively than disagreements in unselected environments typically do» (hedge "typically" kept)
- «the quality of these disagreements, more than any consensus, is what they value most» (was 'not the consensus, but the quality of the disagreement')

**Beauty, Wealth, Gamers, Metalheads** (unchanged)
- «Cosmetic augmentation allowed to qualify or maintain rating.»
- «Wealth is personal — no redistribution inside the domain.»
- «All subgenres and platforms count.»
- «live neural concerts, mosh-pit simulations, subgenre deep-dives»

**Lineage Integrity Domain**
- «A high-trust enclave preserving untouched biological inheritance.»
- «The domain does not ask why you are there; purists and preservationists coexist»
- «continuous implant-ledger lineage verification keep the standard continuous» (was 'maintain continuity of standard')
- «works less like a sealed preserve and more like a motherland»
- «whose members can still move outward, carrying lineage and culture» (was 'flow outward')
- «The domain holds two different philosophies under one metric.» (was 'accommodates two fundamentally different')
- «prize untouched inheritance for ideological reasons coexist with preservationists»
- «what it felt like to be human before augmentation»
- «as it was lived for hundreds of thousands of years»
- «Theirs is a culture that survives through deliberate practice, and it needs no walls.» (was 'That is not ideology requiring walls to survive. It is culture requiring intentionality to preserve.')
- «The SAD does not ask about motives» (merges 'does not ask why you are there. Same qualifying metric, completely different motivations.')
- «a living museum of what humanity chose to leave behind»
- «kept alive by people who think that choice deserves a witness»

**Intelligence Standards Domain**
- «An intellectual collaboration zone for residents who want peers matched by analytical depth.» (summary unchanged)
- «Academic (IQ ≥120), Gifted (≥130), Genius (≥145), and Prodigy (≥160)»
- «with equivalent research or achievement pathways where appropriate»
- «IQ is one route in» (was 'The domain is not an IQ gate alone')
- «research, invention, or analytical output is an alternative qualification pathway»
- «clears a peer-verified substantive-contribution bar may qualify regardless of traditional testing score»
- «without research output may qualify on score alone»
- «The environment is built for deep collaborative work among intellectual peers.» (was 'optimized')
- «its most valuable feature is the baseline assumption of analytical rigor» (was 'the most valuable feature is not the prestige but'; superlative restored on verifier pass)
- «in everyday conversation, more than any prestige»
- «without the extensive scaffolding needed to include participants of varying analytical depth»
- «implies no judgment about residents who operate outside the ISD»

**Non-Attachment Zone**
- «relationships form and dissolve without ownership dynamics»
- «The metric ignores relationship duration and commitment» (was 'does not measure ... — it measures')
- «absence of possessive control, jealousy-driven behavior, and coercive bonding patterns»
- «the most distinctive feature is how relationships end» (was 'the quality of separation')
- «without surveillance, punishment, or the social architecture of blame»
- «The domain began with Sanctuary residents who observed» (was 'emerged from a population of')
- «relational possessiveness persists as a behavioral pattern even in a high-trust environment»
- «It shows up as social friction rather than harm, which TIP handles.» (was 'not as harm (TIP handles that) but as social friction')
- «are not criminal, nor harmful in the way that triggers layer reassignment»
- «incompatible with how they prefer to relate»
- «The NAZ gates on the absence of that pattern.»
- «monitoring a partner's location without consent»
- «retaliatory emotional withdrawal after perceived boundary violations»
- «attempts to restrict a partner's social connections»
- «None of these trigger VMSS consequence, but all of them disqualify from the NAZ.»
- «Relationships there carry no ownership assumption»
- «dissolve when interest changes»
- «blame, guilt, or territorial defense that characterize possessive relational models»
- «often mistaken for anti-commitment» (was 'frequently mischaracterized as anti-commitment. It is not.')
- «long-term partnerships exist in the NAZ at rates comparable to broader Sanctuary»
- «commitment sustained by ongoing choice rather than possessive attachment»
- «The difference is subtle from outside and obvious from within.»

**Sobriety Baseline Domain**
- «A clear-headed environment for residents who prefer unaltered cognition.»
- «any recreational substance use, including legal and socially normalized substances, triggers automatic exclusion»
- «Medical and therapeutic use under documented treatment does not count as recreational.» (was 'qualify as')
- «The domain does not moralize about substance use»
- «a place for people who prefer sober company» (was 'provides a space for people who simply prefer')

**Creative Output Domain**
- «A community of makers. The metric measures output»
- «does not curate taste or evaluate artistic merit»
- «rather than only consuming it» (was 'exclusively consuming')
- «The population's default mode is creation»
- «collaboration emerges organically» (hedge kept)
- «a cumulative, ongoing production threshold»
- «a minimum volume of verified creative output sustained over a rolling period»
- «Any medium counts» (was 'The specific medium is irrelevant')
- «biological sculpture, and immersive experiential environments»
- «calibrated for sustained creators rather than one-time contributors»
- «A single published work qualifies for entry»
- «maintaining residency requires continued output over years»
- «Quality is deliberately left out.» (was 'The domain does not evaluate quality.' + 'This is deliberate')
- «three visitors and one with three million visitors count equally»
- «quality is subjective, culturally contingent, and changes over time, while output is measurable»
- «celebrated artists alongside obscure experimentalists»
- «what they share is consistent production»
- «ambient creative momentum»
- «the social default shifts from consumption to creation»
- «every potential collaborator is already mid-project»
- «the rhythm of making, the cost of interruption»
- «the value of arriving with work instead of an opinion»
- Cut as restatement: 'What matters is that the resident produces.' (carried by «A community of makers. The metric measures output») and 'The domain wants makers, not critics.' (same).

**Centurial Domain**
- «A community for the very old»
- «categorically different from someone at year 50 or even year 200»
- «The metric measures duration alone, with no test of wisdom or accomplishment.» (was 'does not measure wisdom or accomplishment — it measures duration')
- «lived through centuries of civilizational change»
- «shorter-lived residents cannot replicate, whatever their other qualities»
- «cannot be simulated, studied, or approximated»
- «A resident who has been alive for 600 years»
- «watched the civilization's founding generation age»
- «policy eras that current residents study as history»
- «institutional memory older than most of the infrastructure around them» (was 'predates')
- «urgency, loss, novelty, and purpose»
- «a 50-year-old or even a 200-year-old cannot access»
- «the pace of conversation»
- «do not rush to conclusions»
- «discussions unfold over weeks or months rather than hours»
- «may take a year to resolve»
- «Neither is being stubborn»
- «the interesting part of a disagreement rarely shows in the first exchange»
- «either deeply calming or insufferably slow, depending on temperament»
- «Existential fatigue management is built into the domain.» (was 'is a structural feature of')
- «outlived multiple generations of relationships»
- «the full cycle of novelty-to-familiarity across centuries»
- «peer support frameworks designed by and for people»
- «the challenge of extreme longevity is the recurring need to find new reasons to care» (was 'is not boredom — it is')
- «already cared about and watched end, rather than boredom» (categorical denial of boredom restored on verifier pass; the earlier 'less boredom than' read as a comparison)

**Precognition Covenant Domain**
- «The only SAD whose chartering required substantive constitutional review.»
- «The PCD is the institutional form Precognition takes in VMSS» (was 'operates as')
- «a voluntary, consent-bounded domain within Sanctuary»
- «pre-act-state detection for specified act-classes»
- «lethal-harm, sexual violence, and non-sexual violent assault»
- «a 2256 fraud extension failed on the stratification-integrity argument»
- «approximately 40,000 covenant residents and growing»
- «required substantive constitutional review before ratification»
- «Chartered in 2230 under Article XXVIII»
- «after the 2225–2228 federal TIP-replacement proposal failed» (was 'following the failure of')
- «operates on a consent-as-metric gate»
- «the first SAD to use a self-declared covenant»
- «rather than externally-measured conduct or attribute as its single qualifying metric»
- «The innovation was doctrinally necessary»
- «Supreme Court advisory review of the original federal deployment proposal»
- «blanket PIA coverage across Sanctuary collided with Article I demonstrated-conduct standing»
- «Article XII non-deterministic evaluation, Article XIII signal-versus-decision separation»
- «and surveilled-population consent»
- «every PCD resident has individually ratified their own coverage»
- «explicitly commits them to three things»
- «coverage by PIA within the domain boundary»
- «acceptance of operator intervention on detected pre-act cognitive states»
- «Forestalled Act Ledger and Restorative Intervention Protocol for any prevented act»
- «identified as the would-be offender»
- «The covenant is revocable at any time without penalty.»
- «Revocation ends PCD residency on filing and imposes no civic consequence.» (was 'terminates PCD residency effective the filing')
- «The revocability is architecturally load-bearing»
- «would reintroduce the consent objections the SAD mechanism was built to resolve» (was 'constructed')
- Cut as restatement: 'The covenant is the gate.' (carried by «operates on a consent-as-metric gate»).
- «Coverage has expanded twice since the original 2230 charter, which covered lethal-harm acts only.»
- «A 2241 expansion petition extended coverage to sexual violence»
- «ratified at 81% with 64% support saturation, a narrow threshold passage»
- «A 2247 expansion petition extended it to non-sexual violent assault»
- «ratified at 80% with 58% support saturation»
- «the narrowest ratification in the PCD's history»
- «A 2256 petition to extend coverage to fraud failed at Meritboard review at 48%»
- «below the filibuster floor»
- «preempting a population-meaningful volume of descent-triggering conduct»
- «weakens the civilization's visible conduct-to-placement ontology»
- «foundational doctrine on the limits of Precognition scope expansion»
- «The PCD's population is demographically heterogeneous.»
- «survivors of pre-Sanctuary violence for whom suffering-prevention is personal»
- «continuity-maximalist commitments extend to the intervening-experience dimension of harm»
- «high-visibility civilians whose personal security calculus reflects their civic visibility»
- «continuity-absolutist philosophers who prioritize suffering elimination over decision-window autonomy» (dropped 'whose architectural commitments')
- «the individual calculation each has made about what the covenant commits them to»
- «and what it returns»
- «has stabilized at approximately 91%»
- «without concentrating in any subgroup»
- «one of the civilization's most doctrinally significant innovations»
- «a third consequence category between demonstrated conduct producing stratification (Article I)»
- «and no record (the default state)»
- «the would-be offender, the SAD governance body, and the Meritboard audit panel»
- «it produces no stratification and ordinary institutional actors cannot discover it»
- «The ledger's scope is bounded to the PCD.»
- «has not generalized into broader civic architecture»
- «consistent with the scope-expansion limits set by the domain's petition history»
- «see Academic Resources 31, 32, and 33» (pointer unchanged)

**Service Continuity Domain**
- «Filters for residents whose default mode is showing up for others.»
- «The metric measures consistency of presence rather than impact or quality of service.» (was 'does not measure ... — it measures')
- «mentors Main Layer citizens approaching Sanctuary eligibility for three hours a week» (unchanged clause; see Flag 3)
- «every week, for years»
- «one who volunteers in cross-layer educational programs»
- «give time as a habit rather than an occasion»

**Polyglot Domain**
- «built around linguistic range and cross-cultural depth»
- «breadth of fluency regardless of native origin» (was 'not native origin —')
- «learned seven languages over three centuries qualifies alongside one who grew up multilingual»
- «code-switching is ambient»
- «untranslatable concepts are discussed in their original language»
- «ordinary speech is unusually dense with cross-cultural reference» (was 'cross-cultural reference density in ordinary speech is unusually high')

**Founders' Archive Domain**
- «the civilization's memory of itself»
- «the custodians of the original founding archives live here»
- «The metric gates on sustained engagement (published interpretation, teaching»
- «or equivalent scholarly output), not political position» (em-dash pair → parentheses)
- «Origin purists and reform theorists coexist under the same metric.»
- «The domain's breadth is deliberate.»
- «technologies the founders could not have anticipated»
- «tracking the Charter's evolution across centuries»
- «records of every amendment since founding»
- «In practice the domain does three things.» (was 'practical function is threefold')
- «maintains the canonical record of every Charter amendment»
- «curates the original script of the four founding lines against interpretive drift»
- «longest-running seminars on what the Preamble means under each new technology»
- «the ritual of the anchor being lived»
- «are not textually sacred: no article of the Charter prohibits their amendment»
- «possible through the Article XI gauntlet like any other Charter modification»
- «continuous scholarly engagement with what they mean»
- «Every generation of FAD residents interprets them, teaches them, argues with them»
- «protected by being lived rather than by textual insulation» (was a separate closer: 'protected by being continuously lived rather than by being textually insulated')
- «the civilization's longest-running intellectual tradition»
- «Multi-decade seminars on specific interpretive questions are not unusual»
- «what "moral causality" means under post-biological substrates»
- «when backup vessel revival can produce forking scenarios»
- «when a technology perfects a metric at architectural cost»
- «inherit seminars from departed or retired predecessors»
- «across generational boundaries that they themselves will not live to see close»
- «They do not guard the founding core; they interpret it, argue with it» (was two sentences; flat denial restored on verifier pass)
- «and pass their interpretations on» (the dropped transmission clause, restored on verifier pass)
- «the ritual of the anchor being lived rather than enshrined»

**Closing note and Miscellaneous SADs**
- «SADs are voluntary and revocable.» (paragraph unchanged; see Flag 1)
- «automatic exclusion back to the layer below (usually +1 Sanctuary or Main)»
- «No VMSS reassignment or punishment occurs — only loss of domain access.»
- «Entry is merit-based and self-selected.»
- «niche overlaps and specialty communities beyond the seventeen primary domains» (was 'These represent')
- «Ultimate niche overlap — metal soundtracks while gaming» (HGMD unchanged)

**Metric Gated Domains**
- «SADs are charter-recognized and exclusive to +1 Sanctuary.»
- «MGDs are private, self-organized, and exist in every ring.»
- «any transparent measurable criterion their founders choose»
- «they do not affect STI or layer status; exclusion means only loss of access» (was 'exclusion is loss of access, nothing more')
- «Federal floor law binds inside every MGD regardless of layer.»
- «The nine examples below illustrate the range without exhausting it.» (was 'the range, not the limit')
- «MGDs are private and not centrally indexed.»
- «across the civilization, MGDs number in the hundreds of thousands» (was 'the actual MGD population ... runs into')
- «A six-to-twelve person research circle» (ATWG unchanged)
- «The state runs the discipline; ATWG runs the project.»
- «sustained hours in a specific attentional discipline»
- «No charter recognizes the discipline, and the MGD needs only practitioners.» (was 'does not need recognition — it needs practitioners')
- «The guild exists because its members wanted it to.» (MCG unchanged)
- «Conversations assume the books have been read.» (VLRC unchanged)
- «work with -1 residents on the long climb to local standing» (CLMN clause unchanged; see Flag 3)
- «The metric counts hours and does not grade results» (was 'The metric is hours, not outcomes —')
- «keep showing up across layer boundaries»
- «the difference between operating in the layer's better districts and the contested ones» (CCTN unchanged)
- «proven consistency in an environment that punishes inconsistency»
- «members can rely on one another, which in -2 is structural rather than sentimental» (was 'can be relied on by other members. In -2, that is structural, not sentimental.')
- «Default on a contract and every vendor in the network knows within days.»
- «the layer's most consequential private penalty»
- «no institutional appeal and no comparable network to migrate to» (dropped 'other')
- «operates in both Main Layer and -1» (was 'operates simultaneously in')
- «Cross-layer membership is unusual and load-bearing»
- «layer status and skill are separable»
- «honor skill without the state having to mediate layer status» (was 'the latter ... the former')

### Flags

1. **Closing SAD note (doctrine, left unchanged).** «automatic exclusion back to the layer below (usually +1 Sanctuary or Main)» conflicts with the same page's intro and the note's own next sentence, which say exclusion carries no VMSS reassignment. A SAD sits inside Sanctuary, so exclusion "to Main" reads as a layer move. The whole paragraph was left byte-identical for a ruling.
2. **RIL "sustained" (possible tension, left unchanged).** «Sanctuary residents qualified for +1 through sustained demonstrated conduct» may read as a duration requirement for Sanctuary entry, against the ruling that eligibility at STI 85 is immediate. It most likely describes the conduct behind the STI, so no change was made.
3. **Upward-mobility phrasing (checked, left unchanged).** SCD «mentors Main Layer citizens approaching Sanctuary eligibility» is consistent with the Sanctuary-at-85 ruling. CLMN's gating line («-1 residents pursuing STI recovery», frozen) and its card text «the long climb to local standing» describe standing within -1, not a layer climb, which fits "mobility is downward only" and "STI never sets placement". A reader could still take "climb" as a route out of -1.
4. **No other doctrine conflicts found.** The page doesn't touch STI or the ledger in -3, or LP-004.2. The PCD Forestalled Act Ledger is a separate instrument bounded to the PCD. «technologies the founders could not have anticipated» refers to plural in-world founders and is not a founder-as-actor reference.
5. **Frozen-scope call (could go either way).** The 27 Gating Metric lines were treated as definitional metric text and frozen, though several run past 8 words. If they count as running prose, a later pass could lift the three with em-dashes (LID, COD, CND).
6. **Cuts are restatements only.** Dropped or merged: 'The covenant is the gate.', 'What matters is that the resident produces.', 'The domain wants makers, not critics.', 'Same qualifying metric, completely different motivations.', 'The result is a community where relationships carry no ownership assumption.' (kept as «Relationships there carry no ownership assumption»), and the FAD closer on being "continuously lived", now folded into the preceding sentence. Each claim survives elsewhere, as listed in the ledger above.
7. **RIL "probationary mechanism" → "probation".** The next paragraph still says "A probationary mechanism", so the two now use different terms for the same thing. They were kept that way on purpose, and the meaning doesn't change.
8. **Length.** The page total is -5.1%, at the bottom of the 5-15% target, because 37 frozen elements and 14 clean-enough summaries were left as they were. The running prose is -5.7%. The verifier pass restored four claims (RIL "demonstrated", ISD superlative, LCD categorical denial of boredom, FAD flat denial plus "pass their interpretations on"), adding 9 words.
