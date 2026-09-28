# Prose lift 25.1.2: doctrine-fix pass, mechanism pages (sads, technologies, faq)

Doctrine-fix pass only. Fixes 12-15 were applied to copies in this folder; the live pages are untouched. Everything outside the fixed strings is byte-identical to main at 0672302.

**Page mapping correction.** The task assigned fix 12 to sads.html and fixes 13-14 to technologies.html. The target strings actually live the other way round, and the source flags match that: the "Heaven access" STI intro is technologies.html:421 (25.1.1 tech-ledger flag 1), and the closing SAD note and the RIL "sustained" line are sads.html:222 and :68 (25.1.1 sads-ledger flags 1-2). Each fix was applied where its string lives.

Quotes in «» are verbatim from the edited copy; the verifier checks each one against the copy named in its section.

## sads.html

### Fixes

**Fix 13, closing SAD note (sads.html:222; 25.1.1 sads-ledger flag 1).**
- Before: "Violation of the gating metric results in automatic exclusion back to the layer below (usually +1 Sanctuary or Main)."
- After: «Violation of the gating metric results in automatic exclusion from the domain.»
- Canon source: the page's own intro, «Violating a domain&rsquo;s metric means automatic exclusion from that domain and nothing more», and the note's next sentence, «No VMSS reassignment or punishment occurs — only loss of domain access.» "The layer below ... Main" read as a layer move; the fix brings the first sentence into line with both. Every SAD is inside Sanctuary (the MGD intro: «SADs are charter-recognized and exclusive to +1 Sanctuary»), so the excluded resident simply stays a Sanctuary resident; I did not add that clause, since the intro already carries it.

**Fix 14, RIL "sustained" (sads.html:68; 25.1.1 sads-ledger flag 2).**
- Before: "Sanctuary residents qualified for +1 through sustained demonstrated conduct across the full behavioral spectrum"
- After: «Sanctuary residents qualified for +1 through demonstrated conduct across the full behavioral spectrum»
- Canon source: STI >= 85 makes a non-punitive citizen immediately eligible for Sanctuary, with no duration requirement (current ruling; project STI Console Rulings).

### Claims ledger (edited paragraphs)

| Claim | Verbatim quote |
|---|---|
| SADs are voluntary and revocable | «SADs are voluntary and revocable.» |
| Exclusion is automatic on metric violation | «automatic exclusion from the domain» |
| No reassignment or punishment | «No VMSS reassignment or punishment occurs» |
| Only domain access is lost | «only loss of domain access» |
| Entry is merit-based, self-selected | «Entry is merit-based and self-selected.» |
| RIL heads the SAD list; reason | «relational honesty is the most frequently tested human-scale dimension of trust» |
| Sanctuary qualification rests on demonstrated conduct | «qualified for +1 through demonstrated conduct across the full behavioral spectrum» |
| RIL filter: flawless partnership conduct | «demonstrated conduct in partnership and intimacy has been flawless» |
| Implant record makes it auditable | «relational-event record makes the metric auditable» |
| Disqualifying patterns | «coordinated dishonesty about sexual or emotional involvement» |
| Binary metric, single infraction | «a single documented infraction disqualifies the resident» |
| No probation or second chance | «with no probation and no second chance within the RIL» |

### Word counts (edited elements)

| Element | Before | After |
|---|---|---|
| RIL paragraph (:68) | 101 | 100 |
| Closing SAD note (:222) | 40 | 33 |
| Page change | | -8 words |

### Flags

1. Task mislabelled the page for fixes 13 and 14 (they were listed under technologies.html); applied in sads.html, where the strings are.
2. Fix 13 wording: "from the domain" was chosen over "to general Sanctuary residence" because it touches fewer words and matches the page intro. A resident whose STI later falls below 85 still phases back through the ordinary mechanism; SAD exclusion does not cause that, so nothing about it was added.

## technologies.html

### Fixes

**Fix 12, STI intro (technologies.html:421; 25.1.1 tech-ledger flag 1).**
- Before: "High STI unlocks better jobs, partnerships, and Heaven access."
- After: «High STI unlocks better jobs, partnerships, and Sanctuary eligibility.»
- Canon source: STI never sets placement; STI >= 85 makes a non-punitive citizen immediately eligible for +1 Sanctuary, and moving in is voluntary. "Sanctuary eligibility" was chosen over "Heaven eligibility" because the 85 threshold is specifically Sanctuary's, and "Heaven" on this page names the upper layers as a group («In Heaven Layers and Main Layer»).

### Claims ledger (edited paragraph)

| Claim | Verbatim quote |
|---|---|
| STI is separate from criminal record; non-criminal violations | «Separate reputational system for non-criminal trust violations.» |
| Tiered visibility | «Tiered visibility.» |
| Gates SADs and high-trust opportunities | «Gates access to many SADs and high-trust opportunities.» |
| Only outward actions count; cognition non-public | «Only outward actions affect it — cognition is non-public.» |
| High STI: jobs, partnerships, Sanctuary eligibility | «High STI unlocks better jobs, partnerships, and Sanctuary eligibility.» |

### Word counts (edited element)

| Element | Before | After |
|---|---|---|
| STI intro (:421) | 34 | 34 |

### Flags

1. Task mislabelled the page for fix 12 (listed under sads.html); applied in technologies.html, where the string is.
2. Unchanged and still held for Jason from 25.1.1 (tech-ledger flags 2-4): "STI governs ... phasing eligibility", the -3 "severs the backup vessel link" verb against LP-004.2's suspension framing, and the autoparenting upward relocation. Not in this patch's fix list.

## faq.html

### Fix

**Fix 15, FAQPage JSON-LD (faq.html:1005-1072; 24.8.5 faq-ledger flag 8).** All 12 acceptedAnswer.text strings rewritten. Every "name", key, @context/@type and the question order are unchanged, and the block JSON.parses (verified). Em-dashes: 26 before, 0 after. Visible faq prose untouched.

Changes per answer, with the visible answer each moved toward:
- Can I leave VMSS? Three em-dashes removed; "only descending further, or" becomes the visible answer's «Two movements remain open there: descending further» framing.
- What happens if I die? Four em-dashes removed; the -3 clause follows the visible «-3 has no fabrication station presence.» The "Continuity is preserved, not innocence" line is kept because the visible answer keeps it.
- Can I opt out of implants? Two em-dashes removed.
- Do children ... inherit? Three em-dashes removed.
- Is VMSS a democracy? Em-dash removed; the "two different questions, two different mechanisms" tag is now a full sentence.
- Who governs VMSS? Em-dash pair removed; the "metric separation, not pool separation" reversal is cut to «Independence comes from metric separation», as in the visible answer (which also drops "not pool separation"; the contrast is implied by the next clause).
- How long can a President serve? Em-dash removed; passive clause made active.
- Too many children? Two em-dashes removed. "Economic consequence, not criminalization." is kept because it matches the visible answer word for word.
- Prisons? Em-dash removed.
- Founding principles? Two em-dashes removed; the reversal "not locked by prohibition; it is protected by" becomes «No rule prohibits changing the founding core; what protects it», following the visible answer. The em-dash before "and then the honest path" is gone.
- Military? Three em-dashes removed; "not governance, not policing" becomes «never for governance or policing» (visible: "Never governance, policing, or dispute resolution").
- Daily life in -3? Two em-dashes removed.

### Claims ledger (JSON-LD answers)

| Q | Claim | Verbatim quote |
|---|---|---|
| Leave | Exit allowed from Main and above | «Yes, from Main Layer and above» |
| Leave | Heaven Layers may descend | «from the Heaven Layers you may descend voluntarily» |
| Leave | No exit from -1/-2 | «From -1 and -2 there is no exit.» |
| Leave | Further descent open | «descending further» |
| Leave | Allied-state transfer under treaty | «tier-equivalent transfer to a VMSS-adjacent allied state under reciprocal treaty coordination» |
| Leave | Contract attaches in full | «with your status-based contract attaching in full» |
| Leave | -3 terminal | «From -3, exit is impossible; it is terminal.» |
| Leave | Re-entry moral accounting | «requires moral accounting (STI evaluation, psychological screening)» |
| Leave | Prior crimes count | «and prior crimes count» |
| Die | Sanctuary/Main full-fidelity revival | «In +1 Sanctuary and Main Layer, a backup vessel revives you at full fidelity» |
| Die | 1 in 1,000,000 | «approximately 1 in 1,000,000 failure» |
| Die | Proxy installations in -1/-2 | «revival runs through VMSS-operated fabrication proxy installations» |
| Die | Closed sovereign facilities | «which are closed sovereign facilities» |
| Die | Failure rates -1 / -2 | «approximately 1 in 10,000 in -1 and 1 in 1,000 in -2» |
| Die | No fabrication in -3 | «-3 has no fabrication station presence.» |
| Die | Link severed at terminal reassignment | «The implant severs the backup vessel link at the moment of terminal reassignment» |
| Die | Death final, hardware level | «death is final at the hardware level» |
| Die | Continuity not innocence; status/STI kept | «Continuity is preserved, not innocence: you keep your layer status and STI record.» |
| Implants | Voluntary | «Implants are voluntary» |
| Implants | Access consequences listed | «no backup vessels, no neural diving, no SADs, reduced institutional access» |
| Implants | Mandatory in Sanctuary | «In +1 Sanctuary the implant is mandatory» |
| Implants | Removal phases to Main, not penalty | «is phased to Main Layer rather than penalized» |
| Implants | Identity/record not erased | «Removal does not erase identity or record» |
| Implants | AR makes identity non-repudiable | «AR surveillance infrastructure makes identity non-repudiable» |
| Implants | STI and record remain visible | «your STI and criminal record remain visible» |
| Children | Clean record | «Every child born in any layer starts with a clean record» |
| Children | Zero violations/history | «zero STI violations, zero criminal history» |
| Children | Conduct, not birthplace | «The system judges conduct, not birthplace» |
| Children | -3 child same standing | «a child born in -3 has the same standing as a child born in Main Layer» |
| Children | Relocation right any age, advocacy | «relocate to Main Layer autoparenting at any age, with full legal advocacy» |
| Children | No child trapped | «ensures no child is trapped by their parents' placement» |
| Democracy | No elections etc. | «No elections, campaigns, parties, or constituencies.» |
| Democracy | Competence ranking | «Leadership is determined by a continuously updating competence ranking» |
| Democracy | Ten-year blind review | «the President faces a blind performance review every ten years» |
| Democracy | 80% ratification | «requires 80% direct population ratification» |
| Democracy | Citizens vote on the rule | «with citizens voting on the actual rule» |
| Democracy | Comparison to Earth | «more directly democratic than any Earth system on the regulatory side» |
| Democracy | Meritocratic executive | «more meritocratic on the executive side» |
| Democracy | Two questions, two mechanisms | «two different questions with two different mechanisms» |
| Governs | Merit-based executive | «A merit-based executive structure.» |
| Governs | Meritboard is a ranking, not appointed | «continuously updating competence ranking rather than an appointed body» |
| Governs | Role sub-rankings | «with separate sub-rankings for each role's competencies» |
| Governs | President's ranking | «The President is drawn from the executive-doctrinal-leadership ranking» |
| Governs | Justices' ranking | «Supreme Court justices from the legal-interpretation ranking» |
| Governs | Metric separation | «Independence comes from metric separation» |
| Governs | Non-overlapping populations | «produce non-overlapping candidate populations» |
| Governs | No authority over own metric | «No entity ranked by a metric holds authority over the design of that metric.» |
| President | Serve while winning | «As long as they keep winning.» |
| President | Ten-year blind challenge | «Every ten years a blind review challenge tests the President» |
| President | Unknown challenger, unknown metrics | «against an unknown challenger on unknown metrics» |
| President | Panel appointed by Court | «A Presidential Review Panel appointed by the Supreme Court selects the challenger» |
| President | Weighting hidden until review | «the weighting between public sentiment and panel assessment stay hidden» |
| President | Immediate succession | «If the challenger wins, succession is immediate.» |
| President | No term limits, no free ride | «There are no term limits and no free ride» |
| President | Can't game the test | «you can't game a test you can't see coming» |
| Children tax | Economic, not criminal | «Economic consequence, not criminalization.» |
| Children tax | Art. XXVII, 2.5 target | «Article XXVII targets 2.5 children per family» |
| Children tax | LP-064 federal schedule | «the escalation schedule is federal law under LP-064» |
| Children tax | First two free | «The first two children carry no added burden.» |
| Children tax | 50% compounding from third | «From the third, a 50% compounding escalation» |
| Children tax | 40 → 60 → 90 → 135% | «baseline 40% aggregate effective rate to 60%, then 90%, then 135% at the fifth» |
| Children tax | Unsustainable vs total inflow | «mathematically impossible to sustain, measured against total parental inflow» |
| Children tax | Habitual residence, LP-081 | «habitual residence at each child's birth (LP-081)» |
| Children tax | Sixth child consequence | «The sixth child triggers immediate bankruptcy and -1 reassignment for both parents.» |
| Children tax | Children harmless | «Children are held completely harmless» |
| Children tax | UBI vesting 18, advocacy, relocation | «stewarded UBI vesting at 18, full legal advocacy, and a standing relocation right» |
| Prisons | Layers define enforcement relationship | «The layers define the relationship between the individual and the enforcement infrastructure» |
| Prisons | Not absolute quality of life | «not the absolute quality of life» |
| Prisons | Progressive withdrawal | «VMSS withdraws institutional protection progressively as you descend» |
| Prisons | No mandated chaos | «it does not mandate chaos or misery» |
| Prisons | Distinct environments | «Lower layers are distinct civilizational environments» |
| Prisons | Economic/social/hierarchy | «economic character, social texture, and internal hierarchy» |
| Prisons | -3 minimal presence, floor intact | «with minimal institutional presence and the federal floor intact» |
| Prisons | Frontier economy | «more accurately described as a frontier economy than a prison» |
| Founding | Art. XI gauntlet in sequence | «clearing the full Article XI gauntlet in sequence, with no gate skippable» |
| Founding | 70% Meritboard | «70% Meritboard approval» |
| Founding | 7/10 Court | «a 7/10 Supreme Court majority» |
| Founding | Full Sanctuary consensus | «full Sanctuary consensus» |
| Founding | 80–90% Main | «an 80–90% Main Layer supermajority» |
| Founding | Presidential assent | «and presidential assent» |
| Founding | No prohibition lock | «No rule prohibits changing the founding core» |
| Founding | Protected by cost | «what protects it is how expensive it is to reach» |
| Founding | Clearing civ has moved past core | «has already moved past the core» |
| Founding | Honest path is amendment | «the honest path is amendment» |
| Military | Yes, unconventional | «Yes, but it bears no resemblance to conventional armed forces.» |
| Military | Two acknowledged instruments | «two publicly acknowledged instruments» |
| Military | Kill switch, national command | «blackboxed hardware-level implant kill switch under national military command authority» |
| Military | Properties | «(instantaneous, any scale, no collateral damage)» |
| Military | Nanobot plumes | «nanobot neutralization plumes for non-implanted threats» |
| Military | Defense track only | «invoked exclusively on the national defense track» |
| Military | Not governance/policing | «never for governance or policing» |
| Military | Four-tier doctrine | «a four-tier external force doctrine» |
| Military | Overwhelming, temporary | «overwhelming by design and temporary by doctrine» |
| Military | Classified specifics | «Operational specifics beyond what is publicly acknowledged remain classified.» |
| -3 life | Depends on position | «It depends entirely on who you are and where you sit» |
| -3 life | Minimal presence, floor intact | «minimal institutional presence, with the federal floor intact» |
| -3 life | Libertarian residents comfortable | «private infrastructure live genuinely comfortably» |
| -3 life | Punitive arrivals harder | «Newly arrived punitive residents with no local currency face a much harder landing» |
| -3 life | Affiliation and reputation | «access runs on affiliation and reputation» |
| -3 life | Ledger travels | «The public ledger travels with every resident.» |
| -3 life | Death final for all | «Death is final for all» |
| -3 life | No revival infrastructure | «there is no revival infrastructure in -3» |
| -3 life | Chosen vs assigned | «sits differently for those who chose the layer than for those assigned to it» |

### Word counts (JSON-LD answer text; em-dashes count as no words)

| Answer | Before | After |
|---|---|---|
| Can I leave VMSS? | 68 | 74 |
| What happens if I die? | 85 | 92 |
| Can I opt out of implants? | 64 | 65 |
| Children inherit status? | 65 | 66 |
| Is VMSS a democracy? | 66 | 77 |
| Who governs VMSS? | 71 | 70 |
| How long can a President serve? | 77 | 81 |
| Too many children? | 100 | 106 |
| Lower layers prisons? | 73 | 73 |
| Founding principles changed? | 71 | 75 |
| Military? | 77 | 80 |
| Daily life in -3? | 90 | 96 |
| Total | 907 | 955 |

### Flags

1. Length grew about 5%. Every removed em-dash became a word ("and", "with", "which are") and the length target does not apply to this patch; nothing was padded, and no claim was dropped.
2. "Continuity is preserved, not innocence" and "Economic consequence, not criminalization" keep their "X, not Y" form because the lifted visible answers keep them word for word, and fix 15 asks for the JSON-LD to move toward the visible text.
3. Doctrine, held unchanged: the death answer keeps "The implant severs the backup vessel link at the moment of terminal reassignment", which matches the visible answer but uses "severs" where current canon frames -3 in LP-004.2 terms (suspension for visitors, death final for all). It concerns residents at reassignment, so it is probably the terminal-severance track and compatible, but it is the same open verb question as 25.1.1 tech-ledger flag 3.
4. Doctrine, held unchanged: the children answer keeps the standing right to relocate to Main Layer autoparenting (an upward move from a lower layer), the same question as 25.1.1 tech-ledger flag 4.
5. The prisons answer says VMSS "withdraws institutional protection progressively"; that is consistent with STI and the ledger running in -3 (protection and enforcement are what thin out), so it was left as is.
