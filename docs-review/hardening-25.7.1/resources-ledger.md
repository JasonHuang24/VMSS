# Hardening 25.7.1 — unit "resources" ledger

Source: `documents/resources-source.html`. Plan: `docs-review/hardening-25.7-plan.json`, 111 matching items (41 fix, 70 lift, 0 broken). No queue or non-defect items touched. None were marked introduced_by_lift, so no pre-lift restorations were needed.

Totals: 111 applied (one sub-part of #17 declined as not applicable), 0 declined outright.

Checks after the edit: `node tools/check-canon.mjs` 141 passed / 0 failed; `node tools/check-css-cascade.mjs` clean. The LP-074 cascade surface still carries the exact 50/25/12.5/6.25 schedule. Tailwind-sensitive words in the diff: no additions. Tag balance: one `<p>` fewer (an R29 paragraph merged, as instructed) and one `<em>` fewer (the R13 "exactly" sentence deleted, as instructed).

## Applied

| # | Res | Quote | New wording (≤25 words) |
|---|-----|-------|--------------------------|
| 0 | R28 | "…no architectural path to achieve this, because the vessel will be revived regardless…" | "Whitepaper §17.2 lets the resident refuse revival… What the doctrine does not settle is what happens next to the revival-ready vessel…"; next para "by contesting what happens to their vessel after a refused revival" |
| 1 | R28 | "It prohibited non-lethal harm in -2 to express…" | "did not leave non-lethal harm in -2 unprevented…" / "It left that harm unprevented to express…" |
| 2 | R25 | "practical lifespan maximum of three hundred years" | "practical lifespan of two to three hundred years (longevity augmentation lets residents who pursue it go well beyond…)"; "the resident is on the road toward the Centurial Domain" |
| 3 | R27 | "An enterprise becomes legal in -3 the moment…" | "The colosseum classification settles how a death inside the gate is treated; whether an enterprise can operate at all is a separate question. More broadly, …" |
| 4 | R27 | "Death is on the table at even odds with survival, openly" | "Death is declared openly as a possible outcome alongside survival" |
| 5 | R28 | "the bailout problem analyzed above" / "analyzed earlier" | "analyzed below" / "analyzed later in this resource" |
| 6 | R25 | "the texture problem the Mara pattern documents" | "the texture problem the departing residents describe ("the absence of being wrong is making them stupid")" |
| 7 | R31 | "Book II’s scope-expansion debates" | "Book III’s scope-expansion debates" |
| 8 | R32 | "171 formal entries corresponding to the interventions that prevented act initiation" | "174 formal entries, one per operator engagement; 171 record… prevented… and 3 record… TIP-equivalent interruption"; "171 would-be offenders whose acts were prevented" |
| 9 | R33 | "in approximately 2260" | "in approximately 2258" ("three decades" in the closing left as is) |
| 10 | R27 | "continuity parity (Article XXV.VI)" | "continuity parity (LP-004.2, Backup Vessel Parity, a federal law enacted under Article XXV.VI)" |
| 11 | R29 | "…most closely inherited from Earth-era central banking…" | "borrows the most familiar name of any VMSS institution, the central bank, and gives it an operational architecture with no Earth-era analog"; "kept the institution’s name and built new mechanics" |
| 12 | R26 | "all four conditions simultaneously" | "all three conditions simultaneously"; "has the institutional support, and the trust density besides, but not…" |
| 13 | R30 | "the mother is not the primary site of the consequence" | "where the consequence attaches: to the act, not to the mother as a person." |
| 14 | R29 | "…between 125,000 and 200,000 -3 freedom tokens…" | added: "Fewer units come out than went in because each freedom token buys two and a half to four times what a Main unit buys…" |
| 15 | R28 | "the Academy’s Q22 47-minute gap is structurally anomalous" | "the Academy’s Q22 scenario, in which Dr. Yara Osei dies in a structural collapse and wakes… with the last 47 minutes… missing, is…" |
| 16 | R25 | "closer to a billion" | "closer to 1.4 billion" |
| 17 | R26 | "under the 10:1 ratio" (+6 terms) | "STI’s 10:1 penalty-to-recovery ratio (trust is rebuilt about ten times more slowly…)"; autoparenting gloss; "(Sanctuary and Main)"; "(-1)"; "Primary Job Subsidy (PJS)-funded"; novelty-filter gloss. Sub-part (6) declined: r26 contains no "MGD". |
| 18 | R29 | "at PPG-adjusted rates" | "at rates adjusted for the purchasing power gradient (PPG)" |
| 19 | R26/R29 | "This is canonical at the website level." | deleted; "Current doctrine has made / operates / is"; "Both operate under current doctrine"; "at VMSS universities" |
| 20 | R26 | "and Main is the second." | "and Main is a metabolic center, not a default." |
| 21 | R28 | "where the implant is mandatory for residency" | "where the implant is a condition of residency and removing it means leaving" |
| 22 | R28 | "parfit-style" | "Parfit-style" |
| 23 | R29 | "…statistically indistinguishable at resident-experience scale." | paragraph deleted, bookkeeping sentence merged up; Doctrinal Response "the economic result would be the same, as shown above"; Student’s Error restatements cut to one clause |
| 24 | R25–R33 | "has misread most severely of all" / "The deepest observation belongs…" | one "The student who… concludes" per section; others "A common misreading holds…", "Another misreading…", "Nor is…"; closers open "Seen at full scale, …" |
| 25 | R32 | "The SAD works. What it works at is deliberation, not certainty." | "The SAD has functioned as an instrument for continued deliberation; it has not settled, and was not designed to settle, the underlying question." |
| 26 | R33 | "The SAD mechanism’s power is real, and so is the envelope…" | deleted; "The civilization deployed Precognition only where the SAD mechanism could process it, and not elsewhere."; "The bounding expressed…" |
| 27 | R31 | "They matter as much as the technology, because…" | deleted; "The technology was then built so that each refused capability was absent from its design rather than restrained by procedure." |
| 28 | R25 | "The answer is unambiguous and measurable…" | two repeat sentences cut; "On the reservoir model this resource sets out, the answer is yes, and the effect compounds with each generation the reservoir feeds." |
| 29 | R27 | "-3 shows the foundation on its own, and it is stronger…" | "The upper layers add institutional architecture on top of this foundation; -3 is the foundation without the additions."; opener "-3 is defined by what VMSS withdraws…" |
| 30 | R26 | "…why the layer feels most alive of any environment VMSS produces." | deleted; closer trimmed to body-and-organs image ending "Main is where the civilization lives." |
| 31 | R30 | "The child she would have had was had…" | "The child she would have raised is raised anyway…"; "This is the continuity-not-innocence doctrine…"; "Neither commitment is weakened to accommodate the other." |
| 32 | R29 | "…transformed beyond what its Earth-era predecessors could have imagined" | "is part of the ongoing refinement of that rebuilt institution." |
| 33 | R32 | "during protocol engagement — the would-be offender chose" | colon / comma / colon / parentheses in the four places named |
| 34 | R27 | "His personal archive closes with a line…" | "The layer’s voluntary-cohort literature sums up his life in a line it frequently cites:" |
| 35 | R33 | "…does not erase the memory of the attack that caused the death" | "…addresses only terminal outcomes. Revival restores a citizen killed in an attack but does not erase the memory of it, and most sexual violence stops short of death…" |
| 36 | R12 | "Tier 1: Allied Nations (Federation Treaty Partners)" | "Trade Access Tier 1: …" / "Trade Access Tier 2: …"; added "These trade-access tiers are separate from the External Force Doctrine’s four escalation tiers." |
| 37 | R7 | "under Tier 2 terms" | "under standard (Trade Access Tier 2) terms"; "full allied (Trade Access Tier 1) trade access"; "drops from allied to standard trade access"; "sit inside" |
| 38 | R3 | "has not destroyed any VMSS personnel (because there are no VMSS personnel…)" | "has inflicted no permanent VMSS casualties (VMSS vehicles carry no crew, and any VMSS soldier killed revives from backup)"; Instrument 3 edits |
| 39 | R6 | "a mature system might reach centuries" | appended to General Use Cases intro: "The deepest cases below (…) hold only if the sensor’s horizon eventually extends well past the centuries…" |
| 40 | R11 | "from ~2% to ~0.5%" | "from ~1% to ~0.5%" |
| 41 | R11 | "recorded in the Founders' Archive Domain (SAD) as contributing scholars" | "recorded as contributing scholars in the Founders’ Archive Domain, a Selective Ascension Domain (SAD)." |
| 42 | R1 | "(post-Q25 delay)" | "(the roadmap’s ~2850, pushed back fifty years by the setback in Academy Q25)"; list item "28th–29th century: forcefield integration (delayed by Q25)" |
| 43 | R12 | "needs nothing the outside world produces" | "needs no material good the outside world produces" |
| 44 | R12 | "comes to depend on VMSS for maintenance, upgrades, and replacement parts" | "…replacement parts, at least until an allied recipient builds its own fabrication capacity" |
| 45 | R3 | "has sustained total permanent casualties among its deployed personnel" | "has lost every deployed soldier to death or capture"; "(killed permanently or captured)" |
| 46 | R3 | "Pre-emptive war is ruled out" | "Preventive war is ruled out" |
| 47 | R5 | "atmospheric density at 15km is approximately 12%…" | "wind load falls with altitude (air density at 15km is about 12% of sea level), and each section carries only the tapering mass above it…" |
| 48 | R5 | "The capsules accelerate and decelerate passengers across…" | "Each capsule carries passengers horizontally across the wall’s 1km base and vertically between the levels of the transit stations on either side." |
| 49 | R4 | "At some point in the far future, centuries beyond the Dyson swarm’s initial operational date" | "Phase 4 begins when deep extraction winds down around 2800 and runs for centuries. Eventually the extraction program has consumed…" |
| 50 | R4 | "operational by the 26th century" | "operational during the 26th century, as Phase 2 launches begin (2550+)" |
| 51 | R2 | "The 47-minute gap from Q22 becomes a 47-month gap." | "dead for the hours it takes the mind-state to transmit home plus the time to fabricate a vessel"; "…stretches to about four hours of one-way light-time." |
| 52 | R2 | "Multi-year transit time creates a communication delay" | "Interplanetary distance creates a communication delay" |
| 53 | R2 | "The PPG (1x/2x/4x/8x) governs five Earth-based layers." | "…governs five Earth-based layers through four currencies, because Sanctuary and Main share one." |
| 54 | R2 | "human comprehension of why… exceeds the population's ability to verify" | "the reasoning behind why a particular entity is ranked #1 exceeds the population’s ability to comprehend or verify" |
| 55 | R2 | "not democratic, not authoritarian, not meritocratic, but…" | "governance structures that fit no human category, including democracy, authoritarianism and meritocracy"; "What if the standards simply don’t apply?"; two other reversals cut |
| 56 | R8 | "cannot move the STI if the behavioral data does not support their reading" | appended: "The one channel through which the population can revise the AI’s reading… is popular signal correction (§5.8, below)…" |
| 57 | R10 | "receives no extraordinary credit in the STI" | "receives no extraordinary credit in the STI’s base recovery rate" |
| 58 | R10 | "The doctrine leaves one question open" | "The doctrine has made its choice, but one question stays open to the civilization’s lived experience rather than to constitutional text…" |
| 59 | R7 | "full trade embargo at Stage 3" | "…at Stage 3 (the complete-embargo stage of the graduated sanctions described in Resource 12)"; Ceiling Seal gloss added |
| 60 | R1 | "The forcefield failed at football-field scale for 10 seconds" | "The forcefield prototype in Academy Q25 held a football-field-sized barrier for only 10 seconds"; second-segment gloss added |
| 61 | R6 | "Yet the physical events of a citizen's private life, observed retroactively…" | Personal history: "…potentially observable, and the privacy question this raises is taken up under Privacy architecture below." |
| 62 | R11 | "…before the Meritboard defense, which is where misclassification is most expensive…" | "…before the Meritboard defense panel, where a misclassification exposed under adversarial examination would cost the team the most." |
| 63 | R1 | "The founding generation built the walls and the mature generation perfected them." | "Teleportation is the first technology in the roadmap that could make the walls themselves unnecessary, which is why its deployment is a governance decision…"; post-3000 sentence reworded |
| 64 | R3 | "To everyone else, it is a neighbor with a very large fence…" | "Everyone else faces a neighbor that has nothing to gain from attacking them."; slogan deleted; Instrument 1 merged |
| 65 | R12 | "has read the goods correctly and the strategy incorrectly…" | "Trade policy here is neither benevolent nor imperial: the goods are generous, the strategy is deliberate, and the constraints rule out coercion." |
| 66 | R7 | "VMSS's leverage lies not in what it says… but in what it is" | "VMSS’s leverage is its own existence as a functioning demonstration…"; "That hospital visit does more than any argument for alliance."; "That convergence is…" |
| 67 | R5 | "A fence separates property; the wall separates civilizations." | "The wall’s job is to make layer placement physical."; forcefield sentence deleted; final line "The wall closes the gap between what the law assigns and what the citizen actually lives in." |
| 68 | R6 | "The defendant may challenge the fidelity, but not the universe…" | "The defendant may challenge the reconstruction’s fidelity; the parallel-universe argument is closed."; two closers deleted/reworded |
| 69 | R8 | "The public signal can speed up or slow down…" | both Convergence sentences and the Design Logic duplicate deleted; "One is warm and present; the other is correct but distant." |
| 70 | R4 | "The extraction program is not a luxury project for upper layers…" | "The extraction program raises the material floor in every layer, not only the upper ones."; Phase 1 sentence deleted |
| 71 | R4 | "ten billion people" | "about 4.3 billion people" |
| 72 | R19 | "…quantum-entanglement-based signal transmission that bypasses light-speed…" | "…through local command authority: each planet holds its own command authority node, so activation never waits on a signal crossing interstellar distance…" |
| 73 | R21 | "under LP-074’s active 50% / 25% / 12.5% / 6.25% exact cascade…" | "under LP-074, the current tax law, whose exact halving cascade (top marginal rates of 50%… 6.25% on -3) was certified in 2294…"; SCM gloss; "LP-074 left" |
| 74 | R20 | "in the same hall where Chen signed the first treaty" | "in the founding-era chamber where the Charter stele stands"; "founded on the Canadian ceded territory in 2026" |
| 75 | R20 | "It leaves the specific timing of the transition open" | "It dates the transition only approximately, by millennium"; "following centuries of infrastructure preparation" |
| 76 | R19 | "approximately two millennia of sustained research" | "approximately fifteen hundred years…"; "approximately two and a half millennia"; "fifteen centuries of post-Dyson research" |
| 77 | R16/R19 | "as Dyson-class energy becomes available" | "as partial Dyson-swarm energy becomes available"; "Full Dyson-class stellar energy, operational from approximately 2900 AD after partial swarms in the preceding centuries," |
| 78 | R15 | "five of them across the founding decade’s full duration" | "five of them across the twenty-year contested era"; "US ratification in 2026" |
| 79 | R15 | "twenty years after operational cession" | "twenty years after the Founding Treaty’s signing" |
| 80 | R17 | "marking the first anniversary of the Canadian cession’s operational completion" | "marking the Canadian cession’s operational completion" |
| 81 | R17 | "under the Indigenous term-contract framework" | "on a founding-era term contract" |
| 82 | R15 | "decades from operational maturity" | "more than a decade from operational maturity" |
| 83 | R18 | "approximately eighteen months before" | "approximately six months before"; "the following decades at the center" |
| 84 | R14 | "thirty-month constitutional amendment window" | "thirty-one-month…"; "committed during the founding decade" |
| 85 | R22 | "Revival on -2 operates automatically when a resident dies from causes unrelated…" | "Revival on -2 is automatic for every death. When the death has no attributable -2 perpetrator (…), a cooperative…" |
| 86 | R24 | "federal floor (UBI, Article XXV enforcement, backup vessel revival) and nothing more" | "institutional provision (UBI, the Primary Job Subsidy, federal medical and enforcement drones, Article XXVIII regulation, backup vessel revival) and nothing more" |
| 87 | R24 | "The territorial cooperatives I analyzed in the -2 sociological studies" | "The territorial cooperatives analyzed in the -2 sociological study" |
| 88 | R20 | "Article R12 identified" | "Resource 12 identified" |
| 89 | R23 | "can charter an SAD whose gating metric is" | "can petition under Article XXVIII for a SAD whose gating metric is"; "by petitioning for or joining such a domain" |
| 90 | R23 | "meets the 140+ intelligence threshold" | "meets the 145+ intelligence threshold" |
| 91 | R23 | "stacks Silent Practice Enclave adjacency + PLD + CND and lives at theirs" | "stacks Polyglot Domain (PLD) + Centurial Domain (CND) membership, lives alongside the Silent Practice Enclave (a Sanctuary MGD rather than a SAD)…"; CCD/COD expanded |
| 92 | R23 | "She introduces herself: “…" | "Consider a Sanctuary resident’s matching profile, which reads in full: “…"; "That one line communicates"; quoted list unchanged |
| 93 | R23 | "…even sustained analysis has consistently missed it across iterations." | "None of these sources spells out what SADs do… and most commentary has missed it."; circular final sentence deleted |
| 94 | R23 | "Guilds are one MGD instance; SADs are the state-verified parallel…" | "Guilds are MGDs. SADs are the state-verified parallel at Sanctuary scale: a single mechanism from which guild-like functions… emerge…" |
| 95 | R21/R22 | "of the Lower Restrictions Layer" | "of -2 Violent Offense, the Lower Restrictions Layer"; R22 intro same; gloss "(between a Main Layer resident whose conduct is scored continuously… and a resident moved down a layer after a qualifying event or unremediable pattern)" |
| 96 | R21 | "comprehensive fabrication-proxy-independent service delivery" | "the loss of Main Layer’s full institutional services, which there do not depend on sparse proxy installations"; "forced revival used to deny a resident escape from detention through death" |
| 97 | R21 | "(visitation from -2 is not permitted upward to Main or +1, but…)" | "meet less punitive institutional architecture (they cannot visit -1 or any higher layer, so the contact runs through -1 visitors, elective residents and cooperatives entering -2)" |
| 98 | R22/R21 | "A secondary population exists: … and citizens who arrive through direct adjudication…" | "A secondary population descends from -1 through continued behavioral breach or serious accumulation."; R21 "A further population" |
| 99 | R22 | "narrower than it sounds when stated abstractly and broader…" | "In practice, a resident whose life is guaranteed can still be robbed, beaten or held captive without any federal response." |
| 100 | R22 | "a question the Charter’s design philosophy explicitly declines to answer" | "a question the Charter answers by design" |
| 101 | R13 | "earns $10,000 UBI + $10,000 PJS + $5,000 overtime premium." | "earns, for that month, $10,000 UBI + $10,000 PJS, plus a $5,000 overtime premium for that week alone (40 hours above the 20-hour line × $125/hr)." |
| 102 | R13 | "this is the architecture operating as designed, not a failure. Each layer delivers…" | "The doctrine’s response is that each layer delivers what its design promises."; "Every layer delivers exactly…" deleted |
| 103 | R13 | "One earthquake of one magnitude produces five different civilizational responses" | "Followed through all five layers (three struck directly, two as doctrinal counterfactuals), one earthquake…"; "One earthquake, traced through five layers, produced…" |
| 104 | R15 | "The technology did not flow in a single direction." | deleted; "In effect, the US received…" |
| 105 | R14 | "…why comparable civilizations attempted in less morally careful founding eras all failed." | "That is why VMSS became possible."; "hard to do cleanly, and this one held up because Chen…" |
| 106 | R15 | "a signatory can honour a commitment bounded by its scope, while an unlimited commitment…" | "because the US could honour a commitment with defined edges." |
| 107 | R17 | "The doctrine asks the student to hold both facts…" | deleted; "Simpler defensive designs would have failed." deleted |
| 108 | R18 | "remembered as the author of the document that made the founder’s absence possible…" | "remembered less as a founder who ruled VMSS than as the author of the document that let it run without him." |
| 109 | R19–R24 | "The deepest observation belongs to the student who notices that" | kept only in R23; R19/R20/R21/R22/R24 open with the claim directly; R20, R22, R24 first openers varied to "A student might conclude…" |
| 110 | R24 | "Without them the layer architecture would have no social life, and with them…" | "Without them, a civilization of billions would have a layer architecture and no social life."; intro clause deleted |

## Declined

- #17 sub-part (6), the MGD gloss at its first use in r26: r26 contains no "MGD". The first uses are in R21 (already glossed there) and R25. Not applied. The other six sub-parts were applied.

## Extra-scope changes and judgment calls

- #95: the plan's gloss said "after a qualifying act". I checked it against Charter Article I, which gives two pathways to -1 (a single qualifying event, or an unremediable pattern), and changed the wording to "after a qualifying event or unremediable pattern".
- #29 (R27 closer): once the opener became "-3 is defined by what VMSS withdraws…", the later "-3 is defined by what VMSS withdraws, and what stays is…" repeated it. That clause now reads "On -3, what stays is…".
- #23 (R29): The Case for Recirculation, last paragraph (named in the locator), had its "below the threshold at which any resident… would observably notice it" restatement cut to "(see below)".
- #24: the R28 closer "Finally, the student may notice that…" is a variant of the stock closer and became "Finally, the rest of the civilization’s doctrine depends…". The R27 closer was handled under #29.
- #67: "Replace the final line" was read as the resource's closing paragraph (R5, What the Wall Is For).
- #89: "an SAD" at R33 l.1616 was left alone, because the instruction limits the article fix to R23–R24. No other "an SAD" remains in R23–R24.
- R29 closer: the repeated "no Earth-era analog" sentence was cut in the verifier revision below.

## Verifier revision

- "Seen at full scale," (R25, R26, R29, R30 closers): dropped. The sentences now open "Sanctuary’s importance…", "Main is the layer…", "The monetary silo borrows…", "Autoparenting is…".
- "A common misreading holds" varied in three of R25–R32. R27: "It is tempting to read -3 as anarchist or stateless; the layer in fact has…". R28: "Continuous sync does not resolve the identity question, though it is often taken to." R30: "The autoparented cohort is sometimes assumed to be structurally disadvantaged." R25, R26 and R29 keep the formula.
- R29 closer: "The institution is recognizable as a central bank, but its operational architecture has no Earth-era analog." became "The institution is recognizable as a central bank; its operations are not."
- R29 Student's Error: "Nor is the retirement-versus-recirculation question unimportant, because of what it reveals about the architecture." became "…unimportant: what it reveals about the architecture is the reason to study it."
- After the revision, check-canon passes 141/0 and the guard-mutation suite passes 98/98.
