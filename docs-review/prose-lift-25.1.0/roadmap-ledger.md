# Prose lift 25.1.0 ledger (roadmap.html)

Mode: clarity. Only the text inside running-prose `<p>` and `<li>` elements of `docs-review/prose-lift-25.1.0/roadmap.html` was edited. The page has no `<blockquote>` and no JSON-LD; its `<td>` cells hold only years and percentages and were not touched.

Left byte-identical: `<head>` and all meta text, every heading and `<summary>`, all SVG text, rail chips and meters, both script blocks and the noscript style, every `<strong>` run-in label, the hero subtitle, the hero meta paragraph, the sr-only trajectory summary, every `rm-stat` line (including the `#now-quote` pull quote and the Phase 1-6 stat captions), every `rm-detail-muted` population/leakage line, and the gradient table.

Quotes are verbatim from the edited copy's visible text (entities decoded, inline tags stripped), each 15 words or fewer, inside « ». `roadmap-verify.mjs roadmap.html` checks every quote in this section against the copy. Original wording is in single quotes where it changed.

## roadmap.html

### Word counts

- All 132 `<p>`/`<li>`/`<td>` elements: 2,669 → 2,593 words (-2.8%), as counted by `roadmap-verify.mjs`.
- Running prose (excluding the 30 numeric `<td>` cells and the frozen `rm-stat`, `rm-detail-muted` and sr-only lines): 2,365 → 2,289 words (-3.2%).
- The 36 changed elements: 1,356 → 1,280 words (-5.6%).
- No element is longer than its original. No changed element has more than one em-dash; the only multi-dash element left is the Backup vessels bullet, whose second dash sits in its frozen `<strong>` label.
- Number tokens in the prose are identical as a multiset, including every "-1", "-2", "-3" layer reference.
- No new Tailwind-utility tokens.

### Claims ledger

**Hero and 21st Century**
- «Leakage is the gap between stated consequence and actual consequence delivery»
- «The founding aspiration is 0%.»
- «VMSS today delivers roughly 10% of its stated promise»
- «The other ~90% is leakage, and this roadmap is about closing it.» (was 'closing it is the entire roadmap')
- «establishes VMSS as a civilizational target, with no construction schedule attached» (was 'It is not a construction schedule.')
- «Weighted across all technology categories» (was 'Using a weighted assessment across')
- «approximately 10% of its stated promise»
- «operates at approximately 90% leakage across all enforcement and infrastructure categories combined»
- «every wall breach, apprehension failure, backup vessel death, or enforcement network gap»
- «The founding aspiration is 0% leakage.»
- «The 974-year roadmap traces that gap closing from 90% to 0.01%.»
- «Leakage varies by category.» (was 'is not uniform across categories')
- «Three are load-bearing: backup vessels, the implant ledger, and autonomous enforcement.»
- «core promises fail without them regardless of progress elsewhere»
- «pulled toward 90% primarily by these three gaps rather than by the category average»

**Load-bearing gaps**
- «No functional analog exists. Cryonics has no successful revival record.»
- «the single largest leakage category by weight, is a complete miss with current technology»
- «exist but are fragmented and gameable, without continuous identity-anchored monitoring»
- «China's social credit system shows national-scale behavioral scoring is feasible.» (was 'proves')
- «The gap is comprehensiveness and the identity anchor.»
- «Military drone hardware prototypes exist» (was 'exist militarily')
- «doesn't exist at civilian scale»
- «Police response times average 10–15 minutes.»
- «The US-Mexico border wall, the closest physical analog to the megawall»
- «without full sensor and response integration»

**Partial foundations**
- «Finland, Kenya, and Stockton pilots prove feasibility at small scale.»
- «Alaska's Permanent Fund has distributed automation-equivalent dividends since 1982.»
- «The economic model is proven in principle; the political will»
- «funding mechanism at civilizational scale are not»
- «gene editing (CRISPR), organ transplantation, and joint replacement prove the concept»
- «Leg lengthening surgery is a crude analog for body scaling.»
- «The direction is established and advancing rapidly.»
- «voluntarily opt into rule-governed civilizational contracts with defined consequences»
- «The concept is mature; the scale is not.»
- «Restraining orders, the closest analog, are essentially non-functional as a VMSS equivalent.»
- «requires backup vessel technology and implant ledger to exist first»
- «further along than the headline leakage figure suggests»
- «The ideas already exist in primitive form across existing institutions.»
- «What VMSS waits on is enabling technology» (was 'It is waiting for enabling technologies')
- «operable at civilizational scale, with the precision the framework requires»
- «Phases 0 and 1 are the period in which those technologies must cross»
- «construction becomes possible only after that» (was 'Phases 0 and 1 are not construction.')
- Pull quote kept in the frozen `#now-quote` line: «We are drafting blueprints for an aircraft» and «The blueprint is sound. The world needs time.»

**Phase 0**
- «The treaty is signed, the charter released, the research programs seeded.»
- «No ring is built in this phase: the enabling technologies must first begin to exist.»
- «The civilizational blueprint is established, but the enabling technologies do not yet exist.»
- «In this phase they must begin to be developed before construction becomes possible.»
- «Founding treaty signed March 29, 2026»
- «Sovereign charter entity and non-profit foundation established to hold land and technology rights.»
- «neuroscience, materials engineering, AI systems, ethics, law, and governance»
- «Seed funding secured from aligned long-horizon investors.»
- «First public whitepaper and charter released.»
- «then limited consenting human trials»
- «No timeline for civilian deployment exists; the work is foundational science.» (was 'this is foundational science, not product development')
- «Backup vessel research initiated as a long-horizon program.»
- «Human-grade revival remains decades away.»
- «STI ledger architecture designed and stress-tested in closed simulation environments.»
- «Autonomous drone enforcement prototypes tested in controlled settings.»
- «proving the automation dividend concept before civilizational deployment»
- «Cancer treatment improving but fundamental cures remain elusive.»
- «Medical completeness delivery in upper layers estimated at ~35–40%»
- «No physical ring construction in this phase.»
- «beginning to approach their critical thresholds without yet crossing them» (was 'approach — but not yet crossing — their')

**Phase 1**
- «First reliable human revival, identity-anchored monitoring at small scale» (lede)
- «and enforcement measured in seconds» (was 'Enforcement in seconds, not minutes.')
- «A prototype community of thousands runs the full system for the first time.»
- «For the first time, meaningful physical infrastructure becomes possible.»
- «the single most significant technological event in VMSS history»
- «Revival failure rate still high, but the category crosses from non-functional to operational.»
- «STI computation proven reliable in a closed community environment.»
- «response times approaching seconds rather than minutes in prototype zones»
- «hundreds to low thousands of voluntary citizens operating under full VMSS conditions»
- «No ring or mega-wall, just a controlled settlement» (was 'Not a ring, not a mega-wall —')
- «proving the integrated system works before physical scaling begins»
- «Full UBI and Primary Job Subsidy system operational within the prototype community.»
- «The mega-wall is a 22nd–24th century project»
- «Leakage within the prototype community estimated at 40–50%»
- «substantially better than the 90% baseline»
- «reaches ~25% by the close of the phase (whitepaper §29.1)»
- «approaches 50–55% by end of phase»
- «The 0.01% aspiration formally adopted as the civilizational standard.»

**Phase 2**
- «billions of citizens, off-world outposts, lifespans of 250–300+ years»
- «One leakage number becomes five»
- «Lifespan extension reaches 250–300+ years practical for most citizens.»
- «VMSS becomes the dominant governance model for new human settlements beyond Earth.»
- «Early interstellar probe missions launched with backup vessel technology aboard.»
- «reaches approximately 70–80% by end of phase: most cancers curable»
- «documented as structural rather than technological»
- «private market dynamics in -2 and -3 determine who reaches it»
- «System leakage estimated at approximately 25% by 2150»

**Phase 3**
- «the largest continuous engineering project in human history»
- «Full wall network construction across all five ring boundaries»
- «proven to eliminate tunnelling and aviation-based breach approaches»
- «toward full saturation within Main Layer and above»
- «accumulate two centuries of edge case data»
- «-3 sub-stratification into voluntary and punitive communities is well-established»
- «Private justice infrastructure operates reliably across punitive layers.»
- «~8% (2350) → ~4% (2450) → ~2% (2550)»
- «Energy planning horizon set at 2600 for first partial deployment.»
- «Upper layer medical completeness approaches 90–95%.»
- «newly emergent conditions, the tail end of a centuries-long elimination program»
- «the structural consequence of institutional withdrawal»
- «Private medical markets in -1 and -2 have matured»
- «access inequality persists in proportion to wealth distribution»

**Phase 4**
- «Revival failure approaches near-zero.»
- «the first Dyson swarm segments catch light by 2600»
- «Leakage enters single-digit territory.»
- «detectable by seismic and sensor networks before completion»
- «Continuity guarantee becomes reliable at civilizational scale.»
- «achieves near-complete coverage, and apprehension failure becomes rare» (was 'the exception rather than the rule')
- «First partial Dyson swarm segments operational by 2600»
- «350+ years of lived civilizational experience»
- «the Freedom Layer, the Balanced Layer, the Lower Restrictions Layer»
- «known disease elimination approaching completion in institutionally covered layers»
- «Remaining upper layer medical leakage is statistical noise rather than a systemic gap.»
- «stabilizes at its structural floor»
- «because technology does not drive that gap, it no longer narrows» (was 'as it is not driven by technology')
- «~2% (2550) → ~1% (2650)»

**Phase 5**
- «makes a planetary forcefield an engineering problem instead of a theoretical one»
- «By 2850 the boundary is layered, redundant, and impenetrable»
- «the largest single leakage source collapses»
- «turns the forcefield upgrade from a theoretical question into an engineering one»
- «Forcefield prototype tested on a single wall section by 2750.»
- «Partial forcefield integration across primary layer boundaries by 2800.»
- «previously the largest single leakage source, drops sharply and becomes functionally negligible»
- «Full forcefield network operational by 2850.»
- «impenetrable by any means available to individuals or organized groups»
- «edge case classification accuracy approaches theoretical limits»
- «~1% (2650) → ~0.5% (2750) → ~0.3% (2800) → ~0.1% (2850)»
- «Parabolic acceleration begins.»

**Phase 6**
- «land inside the same 150-year window and compound»
- «The last 0.09% of leakage falls faster than the preceding 24.91%.»
- «Technologies converge and leakage collapses parabolically.» (was 'The final approach. Technologies converge. Leakage collapses parabolically.')
- «The civilization the founding accord envisioned becomes real.»
- «coverage gaps that produced apprehension failures essentially disappear»
- «Revival failure eliminated as a meaningful failure category.»
- «as close to absolute as physics permits»
- «has no known bypass available to any non-civilizational actor»
- «after nearly a millennium of refinement»
- «arrive within the same 150-year window and compound each other's effect»
- «The last 0.09% of leakage is eliminated faster than the preceding 24.91%.»
- «~0.1% (2850) → ~0.05% (2900) → ~0.02% (2950) → ~0.01% (3000)»
- «measures its consequence delivery at 0.01% leakage across all categories»
- «What the founding accord promised in 2026»
- «short of perfection but as close as any human institution has ever come» (was 'not perfectly, but as close to perfectly as'; an earlier draft's 'closer to it than' overstated the claim and was reverted to parity)

**Epilogue: The Leakage Gradient**
- «within full institutional reach: +1 Sanctuary, Main Layer, and -1 Noncompliance»
- «The headline number hides a spread between layers» (was 'masks a meaningful spread')
- «upper layers approaching near-zero while the terminal layer keeps a structural floor»
- «The terminal layer's ~1% floor at civilizational maturity is structural rather than technological»
- «a fully privatized environment operating without institutional coverage»
- «The 0.01% headline is measured within full institutional reach»
- «what each layer produces under its own design philosophy» (was 'five design philosophies, each yielding the leakage native to what it is')
- Table (untouched): «2150 ~15% ~20% ~30% ~40% ~55%»; «2350 ~4% ~6% ~10% ~15% ~30%»; «2550 ~0.8% ~1.5% ~3% ~5% ~12%»; «2850 ~0.01% ~0.05% ~0.2% ~0.4% ~1.2%»; «3000 ~0.0001% ~0.005% ~0.05% ~0.2% ~1%»

### Flags

1. **Possible doctrine tension, left unchanged.** Epilogue: «a fully privatized environment operating without institutional coverage» describes -3. The current ruling has STI and the public ledger running in -3. The sentence may mean enforcement and protection coverage only, but read literally it says -3 has no institutional coverage. Phase 3's «the structural consequence of institutional withdrawal» (lower-layer medical) is the same shape, also left unchanged. Needs a ruling on whether to add "enforcement" or similar.
2. **Possible doctrine tension, left unchanged.** Phase 3: «Private justice infrastructure operates reliably across punitive layers.» Standing guidance holds that -3 private justice is probabilistic, not guaranteed. "Reliably" may overstate it. This is not one of the five rulings named in the brief, so it is only noted.
3. **Aircraft aphorism removed from the 21st Century detail paragraph (judgment call).** The three sentences ('We are drafting blueprints ... The world needs time.') closed that paragraph and also appear word for word in the frozen `#now-quote` pull quote directly above it. They survive on the page there; only the duplicate closer in the collapsed record was cut. Easy to restore if the repetition is intended.
4. **"Phases 0 and 1 are not construction" vs Phase 1 content.** The line survives as «construction becomes possible only after that», but Phase 1 lists «initial construction begun» on wall sections and an enclosed prototype community. The original carries the same tension; not resolved here.
5. **Frozen stat and caption lines still carry AI habits.** The `rm-stat` captions (for example «the parabolic acceleration commences») and the Phase 2 lede's «the leakage native to what it is» were left alone as short UI captions or persuasive ledes. The matching epilogue closer was rewritten, so the lede now echoes a phrase the epilogue no longer uses.
6. **Length.** Changed elements are 5.6% shorter; the page as a whole is only about 3% shorter. Most of the list prose was already plain and fact-dense, and cutting further would have meant dropping hedges or claims.
7. **Phase 3 span.** The Phase 3 record opens «Two centuries of systematic construction» for a phase dated 2350–2500. Left unchanged as a frozen number.
8. **Phase 6 closer wording differs from the verifier's suggested fix.** The verifier asked for 'short of perfection but as close to it as any human institution has ever come'. That text makes the element one word longer than the original (42 vs 41), which breaks the same-or-shorter rule. «short of perfection but as close as any human institution has ever come» restores the same parity claim (level with the best any institution has done, not beyond it) and keeps the element at 40 words.
