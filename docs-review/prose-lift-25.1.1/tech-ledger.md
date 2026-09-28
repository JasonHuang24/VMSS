# Prose lift 25.1.1 ledger (technologies.html)

Mode: clarity. Only the text inside running-prose `<p>` and `<li>` elements of `docs-review/prose-lift-25.1.1/technologies.html` was edited. The page has no `<blockquote>`, no `<td>` and no JSON-LD.

Left byte-identical: `<head>` and all meta text, every heading (h1-h4), the "Expand all" chip, every accordion button, every "Current State — ~N% Delivery" and "Emergent Application — ..." label (they sit in `<div>`s), both script blocks and the noscript style, every `<strong>` run-in label, the hero subtitle, the italic pull quote under Technoneural Implants, the quoted maxim «Backup vessels preserve continuity, not innocence.», the short spec list items (capabilities, modes, revival rules, failure rates, modifications, longevity, AR capabilities and tiers, How STI Works, wall specifications), and four paragraphs held for doctrine flags (the STI intro, the autoparenting paragraph, the -1/-2 and -3 revival items).

Quotes are verbatim from the edited copy's visible text (entities decoded, inline tags stripped), each 15 words or fewer, inside « ». `tech-verify.mjs technologies.html` checks every quote in this section against the copy. Original wording, where it changed, is in single quotes.

## technologies.html

### Word counts

- All 105 `<p>`/`<li>` elements: 5,154 → 5,026 words (-2.5%), as counted by `tech-verify.mjs` (after the two verifier fixes, which added 2 words net).
- The 43 changed elements: 4,112 → 3,982 words (-3.2%).
- Elements of 25 words or more (the running prose; the other 50 are short spec items): 4,639 → 4,511 words (-2.8%).
- No element is longer than its original. No changed element has more than one em-dash.
- Number tokens in the prose are identical as a multiset, including every "-1", "-2", "-3" layer reference, "SGR-A1", "24/7" and "10:1".
- No new Tailwind-utility tokens.

### Claims ledger

**Technoneural Implants**
- «serve as identity anchor, intent monitor, failsafe device, personal dashboard»
- «continuity bridge for backup vessels»
- «Implants are voluntary at civilization entry for Main Layer and below»
- «refusal carries real consequences but is permitted»
- «In +1 Sanctuary they are mandatory»
- «pre-intervention runs on the Threshold Inhibition Protocol, which requires neural hardware» (was 'the Threshold Inhibition Protocol requires neural hardware to function, and pre-intervention cannot operate without it')
- «can be fully disabled outside +1 Sanctuary»
- «cognition is non-public — not broadcast to other citizens or external systems» (list item, unchanged)
- «STI ledger integration for trust scoring»
- «the implant serves as identity, citizenship proof, and behavioral record»
- «Opt-in and removable in Main Layer and below»
- «refusal or removal carries real consequences but is permitted»
- «In +1 Sanctuary the implant is mandatory»
- «a resident who removes theirs is phased to Main Layer rather than penalized»
- «Cognition is non-public and never broadcast to other citizens, employers, or external systems»
- «reads behavioral signals for risk-state detection and threshold evaluation»
- «only outward expression or action triggers a penalty or STI change» (was 'no penalty or STI change is triggered without outward expression or action')
- «can be disabled at any time outside Sanctuary»
- «Data is encrypted and user-owned.»
- «STI ledger disclosure follows Article II's tiered visibility»
- «minor violations private, major violations public»
- «The implant does not judge your mind. It only records what you actually do.» (pull quote, unchanged)
- «demonstrated basic motor intent reading in small numbers of patients»
- «This work is the implant's hardware prototype» ; «proves that a brain-computer interface is achievable» (was 'the conceptual proof that')
- «continuous intent monitoring across billions of people, non-repudiable identity anchoring»
- «real-time STI ledger integration»
- «failsafe motor inhibition required for the Threshold Inhibition Protocol»
- «The direction is established; the required scale and precision are several generations away.»

**Neural Diving**
- «Direct consensual mind-to-mind interface technology.»
- «Audience Mode (passive viewing) or Pilot Mode (active control with revocable consent)»
- «Temporary active control (consent revocable at any time)»
- «Education, therapy, empathy training, creative collaboration, augmentation previews, entertainment»
- «Real snuff, CSAM, or non-consensual content triggers immediate reassignment.»
- «All sessions are logged for safety.» ; «Consent is explicit and revocable at any moment.»

**Full Sensory Media**
- «anything it can record it can distribute»
- «a governance tool and also the most revolutionary entertainment platform in human history» (was '— not just a governance tool')
- «audio, vision, taste, touch, smell, proprioception, and emotional tone in a single recording»
- «A cooking show where the audience tastes the dish.»
- «The platform, ImmersionTube, makes every prior media format partial by comparison»
- «film captures two senses, music captures one»
- «ImmersionTube captures all of them at once»
- «Sensory artists compose original experiences from scratch»
- «using the full human sensorium as a medium no Earth art form has» (was the closer 'No Earth art form has this canvas.')

**Virtual Reality Without Hardware**
- «without external hardware such as a headset, haptic suit or treadmill» ('The implant IS the headset.' removed; it restated this clause)
- «a fantasy world indistinguishable from physical reality»
- «complete sensory immersion, full motor feedback, unlimited environmental complexity»
- «trauma processing in safe reconstructed environments»

**Transanimal Experiences**
- «piloting animal hosts for espionage, is documented in the World Dossier»
- «The civilian application is equally transformative.»
- «echolocation as a dolphin, thermal vision as a pit viper»
- «streamed from actual animal hosts carrying neural relay implants, not simulated»
- «Their educational value is immense and their entertainment value obvious.»
- «They also aid conservation» (was 'the conservation value is real')
- «develop visceral investment in that species' survival»

**Counter-Radicalization**
- «Radicalization requires a clean separation between "us" and "them,"»
- «neural diving collapses it through direct experience»
- «cannot easily sustain a dehumanized view of that population»
- «did not design neural diving for counter-radicalization»
- «the effect follows from what the existing system already permits»
- «The radicalization pipeline requires information isolation»
- «which neural diving makes structurally impossible to maintain»

**Neural Diving, current state (~5%)**
- «prove that humans want richer presence technology and will build it»
- «what a photograph of fire is to being burned»
- «does not exist even in theory»
- «we have no model yet for how subjective experience is encoded in neural activity»
- «points the direction but offers no functional analog» (was 'is a directional signal, not a functional analog')

**Backup Vessels**
- «Periodic encrypted mind-state backups stored in secure vaults.»
- «Backup vessels preserve continuity, not innocence.»
- «Full revival in same layer via institutional backup vessel infrastructure»
- «closed sovereign facilities within each layer, inaccessible to the local economy»
- «Elevated revival failure probability reflects reduced infrastructure.»
- «Implant severs the backup vessel link programmatically at the moment of terminal reassignment.» (held, Flag 3)
- «Death is final — enforced at the hardware level.»
- «Revival is binary: full fidelity or revival failure (death)»
- «+1 Sanctuary & Main Layer: ~1 in 1,000,000 failure rate»
- «-1 Noncompliance: ~1 in 10,000 failure rate»
- «-2 Violent Offense: ~1 in 1,000 failure rate»
- «Victim can refuse revival (permanent death respected)»
- «produce entire human bodies with full neurological fidelity»
- «Food is orders of magnitude simpler»
- «a trivial downstream application of fabrication technology»
- «eliminates food scarcity as a concept, removes supply chain dependency for nutrition»
- «culinary experimentation impossible through conventional agriculture or preparation»
- «A citizen can eat a meal that has never existed before»
- «Post-scarcity food production needs no separate technology» (was 'is not a separate technology')
- «fabrication technology pointed at a simpler problem»
- «Cryonics has been practiced since the 1960s with no successful revival on record» (current-state paragraph unchanged)
- «the single largest leakage category by weight»
- «the most load-bearing of VMSS's three foundational promises»

**Biological Augmentation**
- «Consensual, reversible modifications using nanotech, gene editing, and organoid fabrication.»
- «Perfect gender reassignment (default opposite-gender equivalent)»
- «Age reversal / pinning (appear any age)»
- «Lifespan: 200–300 years practical (1,000 theoretical for elites)»
- «Fertility window: 18–500 years with no complications»
- «Subsidized in higher layers»
- «Longevity is a personal benefit and also a governance technology.» (was 'is not just a personal benefit — it is')
- «live for 200–300 years with full cognitive integrity»
- «retains institutional knowledge in living people»
- «remembers the original intent instead of guessing at it»
- «adjudicated the first -3 Terminal case carries the precedent in personal memory»
- «every 40–60 years, the people who built the system are gone»
- «Constitutional originalism is a symptom»
- «the people who wrote the Charter are still alive and serving»
- «they correct drift in real time»
- «The resulting asymmetry is decisive.»
- «A 250-year-old President drawn from the Meritboard»
- «four years of experience and a briefing book»
- «the knowledge gap between them is categorical» (was 'is not incremental — it is categorical')
- «VMSS governance improves with age while Earth governance cycles»
- «distinct from biological aristocracy»
- «parents who have lived for 150 years»
- «a century and a half of compounded knowledge»
- «founded a business in 2030 is still running it in 2180»
- «served on the Meritboard for sixty years»
- «sits across the dinner table rather than in journals or letters»
- «This differs from bio-aristocracy, which passes genetic advantage through inheritance.»
- «It is human capital aristocracy»
- «a family network where no one dies»
- «The advantage is temporal rather than genetic» (was 'The advantage is not genetic. It is temporal.')
- «it does not dilute across generations. It accumulates»
- «gills for underwater operation, wings for military deployment, nanosuit-skin for ballistic protection»
- «The lifestyle application is equally significant»
- «makes your body an editable canvas»
- «the models are the designs»
- «consensual, reversible, and previewed through neural diving before commitment»
- «appearance becomes a signal of taste, choice, and creative identity rather than genetic luck»
- «it can engineer novel organisms as companions»
- «methane-based biological gas ignition»
- «A pet dragon is applied bioengineering» (was 'is not a fantasy — it is')
- «the same technology stack that produces military augmentations»
- «limited only by biological feasibility and ethical review»
- «the same animal welfare protections as any living organism under VMSS law»
- «CRISPR gene editing, and joint replacement prove the concept»
- «Leg lengthening surgery is a crude analog for body scaling.»
- «broad social and medical acceptance of consensual body modification»
- «precision, reversibility, and the full spectrum of transformations the system permits»
- «The direction is the most established of any VMSS technology category.» ; «The pace is accelerating.»

**Enforcement Systems**
- «the mega-walls that make pre- and post-intervention possible»
- «The rapid response layer of a fully integrated medical system.»
- «Deployed instantly after any harm event in Main and above»
- «arriving in seconds rather than minutes»
- «nanite injectors for field stabilization, immediate cellular repair of treatable injuries»
- «nobody bleeds out in transit or has a stroke unattended»
- «every harm event gets a response» (was 'no harm event goes unresponded to')
- «ICU capacity handle what field treatment cannot»
- «The hospital remains, as the destination the drone delivers you to» (was 'does not disappear — it becomes')
- «In Heaven Layers, medical drones also provide preventive and chronic care»
- «without the friction of scheduling or triage»
- «Pre-intervention in Heaven (halt acts mid-motion).»
- «Post-intervention logging and evidence capture in Main and below.»
- «non-lethal foam, nets, sonic disorientation, or sedative mist»
- «15km above ground, 5km below ground, 1km base cross-section»
- «elevated gates at ~1km altitude with drone-lift infrastructure»
- «Forcefield integration underway in the 28th–29th century»
- «not deployed at civilian enforcement scale with the contextual judgment VMSS requires»
- «Police response times average 10–15 minutes in urban areas»
- «orders of magnitude slower than VMSS enforcement»
- «The US-Mexico border wall is the closest physical analog to the megawall»
- «without full sensor and response integration»
- «Pre-intervention via the Threshold Inhibition Protocol has no meaningful analog»
- «restraining orders come closest, and they work poorly» (was 'their effectiveness is poor')
- «a named leakage category within VMSS»
- «every known physical ailment is treatable for every resident within institutional reach»
- «The leakage gradient here mirrors the institutional gradient across layers.»
- «medical completeness tracks directly with technological advancement»
- «the drone delivers you there before the window closes» (verifier fix: kept as two sentences, dash replaced with a comma; the merged single sentence was denser)
- «upper layer medical leakage is a technology problem that closes as science advances»
- «approximately 35–40%»
- «Most trauma, infection, and cardiovascular disease handled.» ; «Cancer survival rates improving.»
- «Neurodegenerative disease, rare genetic conditions, and newly emergent diseases remain the primary gap.»
- «a 23rd–24th century milestone»
- «medical leakage is an access problem rather than a technology problem»
- «wealth and geography, not the civilization's technology, decide whether the drone arrives»
- «reaches a wealthy -2 resident in a gated compound»
- «a newly arrived punitive resident with no local currency»
- «This gap is structural» ; «it does not close as technology advances»
- «approximately 1% by 3000 regardless of how advanced the civilization's medicine becomes»

**AR Surveillance Architecture**
- «backstops the implant ledger when the implant is absent, removed, or technically compromised»
- «AR cameras are structurally the implant's peer and load-bearing in their own right» (was 'not fine print to the implant story but a load-bearing staple')
- «parallels the Five Instruments architecture»
- «the kill switch covers implant-bearing threats»
- «the nanobot plume covers non-implant-bearing threats»
- «AR covers equivalent external observation for non-implant-bearers»
- «redundant forensic backup for everyone else»
- «identity non-repudiable regardless of implant status»
- «Network attribution data feeding Article XVIII coordination-detection»
- «civic court contestation under §5.7»
- «+1/Main at maximum, -1 reduced, -2 federal-infrastructure minimum, -3 absolute floor»
- «federal cross-layer mandates require AR-equivalent verification at boundaries»
- «The cognition-non-public guarantee (§22.1) extends to AR.»
- «carries no independent institutional consequence»
- «corroborates evidence for acts that have breached reassignment thresholds»
- «never independently triggers reassignment» (was 'AR data does not independently trigger reassignment')
- «capture is dense, broadcast restricted, and independent consequence foreclosed»
- «A surveillance architecture with a single instrument has a single evasion vector.»
- «built AR as the secondary envelope»
- «A resident who removes the implant is still observed externally at near-implant fidelity» (was 'is not invisible —')
- «identity preserved through biometric and DNA verification»
- «checked against the AR external record»
- «triggers ledger-integrity review under Article XXV.III»
- «Removing the implant opens no forensics gap» (was 'is not a forensics gap; it is a routing decision')
- «reroutes the forensic record through the external observation channel»
- «the system anticipated the evasion and answered it»
- «The directional analog is well-developed and accelerating.»
- «China's social credit infrastructure integrates camera networks with biometric identification»
- «Clearview AI demonstrated population-scale facial recognition with billions of indexed images»
- «Wall-penetrating radar exists in research and limited military deployment.»
- «moving from research into commercial deployment»
- «approach population coverage in some jurisdictions»
- «the infrastructure that enforces the cognition-non-public guarantee»
- «The components exist or are emerging»
- «what Earth has not built is their integration into a non-broadcast forensic-corroboration envelope» ('The trajectory is established.' removed; the paragraph's first sentence already says it)

**Automated Labor & UBI Foundation**
- «generates the surplus that funds the Universal Basic Income across all layers»
- «the economic engine that makes post-scarcity possible»
- «the Primary Job Subsidy still rewards human contribution»
- «In Heaven and Main, AI handles 90%+ of production.»
- «fewer automated drops, and more human labor filling gaps»
- «a rawer market economy where human capability commands direct value»
- «UBI pilots have run successfully in Finland, Kenya, and Stockton California.»
- «to every resident annually since 1982»
- «the closest operational analog to the automation dividend concept»
- «The economic theory is proven at pilot scale»
- «the political will and funding mechanism at civilizational scale»
- «the degree of automation needed to sustain it indefinitely»

**Military Technologies**
- «does not resemble conventional warfare»
- «no aircraft, artillery, or infantry deployment in the traditional sense»
- «kept innovating past conventional weapons» (was 'did not stop innovating at')
- «Two primary instruments are publicly acknowledged; operational specifics remain classified.»
- «a blackboxed hardware-level kill switch accessible only through national military command authority»
- «operates simultaneously at any scale»
- «neutralized in the same moment as a coalition of ten»
- «no collateral damage, emissions, or structural destruction»
- «The capability is domestic only.»
- «operates on residents who consented to implant installation and has no external application»
- «publicly acknowledged as a deterrent; activation protocols are classified»
- «Classified technology for non-implanted threats.»
- «near-instant lethality»
- «Each capsule capable of neutralising thousands.»
- «Closes the primary evasion vector»
- «enters this instrument's operational envelope instead»
- «do not require implant consent and constitute the civilization's primary external deterrent»
- «Operational specifics are classified.»
- «removed their implants to evade the kill switch, and designed accordingly» (closer merged into the sentence)

**Autoparenting & Child Systems**
- «Fully automated, high-quality child-rearing facilities in Main Layer.» (paragraph held, Flag 4)
- «a standing right to relocate here at any age»
- «without parental consent»
- «an independent AI legal advocate from birth»
- «neutral status and full dignity in Main Layer (0)»
- «no inheritance of parental layer status or STI»
- «AI nannies provide 24/7 supervision, nutrition, learning, and emotional support.»
- «Human mentors rotate in for relational modeling.»
- «society can assume parental responsibility for children separated from their biological parents» ('The concept works.' removed; "prove that" already says it)
- «foster systems are chronically underfunded and produce measurably inconsistent outcomes»
- «a first-class civilizational institution rather than a safety net of last resort»
- «The will to protect children exists institutionally»
- «universally accessible infrastructure does not»

**Social Trust Index (STI) Ledger**
- «Separate reputational system for non-criminal trust violations.» (paragraph held, Flag 1)
- «Gates access to many SADs and high-trust opportunities.»
- «Only outward actions affect it — cognition is non-public.»
- «High STI unlocks better jobs, partnerships, and Heaven access.»
- «the behavioral accountability framework that underpins everyday life»
- «Instead of relying only on reactive law enforcement» (was 'Rather than relying exclusively on')
- «a dynamic trust metric»
- «The STI ledger is a dual-account system.»
- «a continuous behavioral reliability metric tracking non-criminal conduct»
- «honesty in disputes, contract reliability, harassment patterns, relational breaches»
- «carries hard flags for qualifying offenses»
- «murder, assault, fraud, and other acts that cross the reassignment threshold»
- «persistent, non-erasable, and visible to institutional and private systems reading the ledger»
- «makes the ledger load-bearing without collapsing non-criminal trust signals into criminal consequence»
- «STI governs social standing and phasing eligibility» (held verbatim, Flag 2)
- «qualifying criminal conduct enters the broader multi-factor consequence system»
- «Implant telemetry and contextual AR systems detect behavioral events.»
- «severity, pattern, and social impact»
- «Minor events may remain private, while major violations appear on a public ledger.»
- «Serious violations are recorded in an open public ledger.»
- «replaces many traditional background checks and legal disputes»
- «does not automatically imply criminal punishment»
- «contracts, employment, partnerships, and personal relationships»
- «Unlike permanent criminal records, STI is designed to evolve over time.»
- «prolonged good behavior, community service, and verified endorsements from others»
- «Major violations remain visible within the ledger»
- «trust is approximately ten times harder to rebuild than it is to lose»
- «can erase years of accumulated trust in hours»
- «The 10:1 penalty-to-recovery ratio reflects how trust already works.»
- «A credit score drops overnight from one missed payment»
- «a single felony follows a person for decades»
- «one betrayal in a personal relationship can take years to repair»
- «calibrated to make every point of trust genuinely earned, not to punish» (was 'The asymmetry is not punitive. It is calibrated to ensure')
- «pattern-based boundary riding: sustained low-level harm»
- «just below any single reassignment threshold»
- «compound under the 10:1 ratio without recovering between them»
- «Threshold-riding is a losing strategy over time, not a loophole.»
- «STI is the primary accountability layer for most social behavior.»
- «enters the standard consequence pipeline»
- «against established thresholds and existing doctrine»
- «Judicial review is reserved for genuine constitutional novelty»
- «through the Supreme Court's novelty filter»
- «puts prevention and transparency ahead of constant coercive intervention»
- «primitive STI implementations that already gate access to housing, employment, and financial products»
- «China's social credit system, whatever its political problems»
- «national-scale behavioral scoring with real consequences is technically achievable today»
- «reactive logging in monitored spaces»
- «non-repudiable and non-gameable»
- «The concept is proven; the execution is fragmented.»

**Mega-Walls & Border Security**
- «15km above ground, 5km below ground, with a 1km base cross-section»
- «tapering parabolically above midpoint to a ~1m crest at peak altitude»
- «not yet available at construction scale»
- «nearly insurmountable between zones by any direct approach»
- «the stratosphere begins at 12km»
- «eliminates tunnelling approaches at any scale achievable by individuals or small groups»
- «The 1km base at a 15:1 slenderness ratio handles buckling and wind loading»
- «atmospheric density at 15km is approximately 12% of sea level»
- «The walls are a 22nd–24th century construction project.»
- «The walls produce microclimate effects at civilizational scale.»
- «A continuous barrier 15km above ground significantly influences weather on both sides»
- «produce distinct microclimates within each ring»
- «Beyond social and institutional separation, the layers are completely separated environmentally.» (was 'Environmental separation between layers is complete, not merely social and institutional.'; verifier fix: "complete" applies only to environmental separation, since canon allows cross-layer visitation under LP-047.3. The verifier's suggested wording made the paragraph 47 words against the original 45, so this 11-word variant with the same scope is used instead)
- «includes a forcefield upgrade trajectory»
- «As energy infrastructure approaches Dyson-class abundance»
- «the cost of maintaining a planetary forcefield becomes viable»
- «Partial forcefield integration is anticipated around 2800, sharply reducing wall breach leakage»
- «with full network operation projected by 2850»
- «By 3000 the physical mega-wall and energy barrier operate simultaneously»
- «layered, redundant, and impenetrable by any means available to individuals or organized groups»
- «the mega-wall becomes its foundation rather than obsolete» (was 'does not become obsolete ... It becomes its foundation.')
- «15km above ground / 5km below ground / 1km base tapering to ~1m crest»
- «eliminates tunnelling as a practical breach approach»
- «impervious to civilian aviation»
- «preserving ground-level seal integrity during contested events»
- «partial by 2800, full network by 2850 — parabolic leakage reduction begins»
- «The continuous-barrier concept is ancient.»
- «The Great Wall of China runs 13,000 miles»
- «at roughly 8m tall it is 0.05% of the VMSS mega-wall's vertical target»
- «the template for a sensor-integrated boundary is already operational»
- «The Korean DMZ has run 70+ years of continuous surveillance»
- «Samsung SGR-A1 automated sentry guns show autonomous-turret deployment on a live boundary is real» (was 'demonstrating that ... is not theoretical')
- «combines 600 miles of physical barrier with sensor towers, radar, and drone patrol»
- «tunnel-detection networks are actively deployed at the US-Mexico border»
- «roughly 25% delivered»
- «the concepts are proven, the integration is fragmented»
- «The delivery gap widens at the structural wall itself.»
- «(Burj Khalifa, 828m) reaches 5.5% of the mega-wall's above-ground height»
- «The deepest mines reach ~4km, approaching the 5km sub-surface depth as a point proof»
- «Three Gorges at 115m base»
- «Dam engineering achieves 100m+ thickness at localized scale»
- «kilometer-thick continuous construction at civilizational length has no engineering precedent»
- «neither engineered nor tapered»
- «Neither the materials science for a 15km-tall continuous tapered composite blade»
- «nor the manufacturing capacity for a kilometer-thick tapered barrier at civilizational length exists»
- «The forcefield integration projected for 2800–2850 depends entirely on Dyson-class energy abundance»
- «further along than almost any other VMSS technology»
- «the wall itself is among the furthest behind»
- «a 22nd-to-24th-century construction project by the whitepaper's own estimate»
- «makes that timeline honest rather than conservative»

### Flags

1. **STI and Heaven access (held unchanged).** The STI intro paragraph says «High STI unlocks better jobs, partnerships, and Heaven access.» Read alone, this says STI sets placement into the upper layer, against the ruling that STI never sets placement. It fits the ruling only if "Heaven access" means eligibility to phase into +1 Sanctuary once STI reaches 85, where eligibility is immediate. The whole paragraph is kept verbatim. Suggested wording if the ruling is confirmed: 'High STI unlocks better jobs and partnerships, and an STI of 85 or above makes a resident eligible for +1 Sanctuary.'
2. **"STI governs ... phasing eligibility" (held verbatim, low risk).** This fits the ruling, since the Sanctuary phase-back line is eligibility and not placement. But "governs" could be read as STI setting placement. The rest of the paragraph was edited.
3. **-3 revival wording (held unchanged).** The -3 item says «Implant severs the backup vessel link programmatically at the moment of terminal reassignment.» and «Death is final — enforced at the hardware level.» The current ruling describes LP-004.2 as a vessel-link *suspension* in -3. "Severs" and "Death is final" may be the terminal-severance track, which is compatible, or older wording that predates the suspension framing. Needs a ruling on the verb. The -1/-2 item next to it was also left alone.
4. **Autoparenting relocation (held unchanged).** The paragraph's «Every child born in any layer has a standing right to relocate here» describes a child moving from a lower layer up into Main Layer. That conflicts on its face with "mobility is downward only" unless children's autoparenting relocation is a standing carve-out, which the page implies («no inheritance of parental layer status or STI») but does not say. Paragraph kept verbatim.
5. **Length.** The cut is -2.5% across all prose elements (-3.2% across the changed ones), short of the 5-15% aim. Half the 105 elements are short spec list items (failure rates, capabilities, wall dimensions) that are frozen or already terse. Three of the largest paragraphs are held for Flags 1, 3 and 4, and the current-state and wall paragraphs are dense with numbers and named analogs that can't be cut without dropping claims. Replacing em-dashes with words also adds length, and the verifier counts no words for a bare dash.
6. **Sentences removed as restatement.** 'The implant IS the headset.' (VR), 'The concept works.' (autoparenting current state) and 'The trajectory is established.' (AR current state) each restated a claim made earlier in the same paragraph, and that claim is still in the ledger. Merged closers: 'No Earth art form has this canvas.', 'It designed accordingly.', 'It becomes its foundation.'.
7. **Minor timeline wording (not a doctrine ruling, untouched).** The Enforcement Systems wall item says «Forcefield integration underway in the 28th–29th century», and the Mega-Walls section says partial by 2800 and full by 2850. These are broadly consistent, but "28th century" ends in 2800. Left as is.
8. **Doctrine rulings otherwise checked.** No text on the page says STI or the ledger stop in -3 (AR density keeps «-3 absolute floor»). The implant paragraphs keep Sanctuary's mandatory implant and the phase-down to Main Layer on removal, which fits downward-only mobility.
