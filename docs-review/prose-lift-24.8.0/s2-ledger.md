# Prose lift 24.8.0, session S2 ledger (index, join, layers, audiobook)

Mode: clarity. Edited copies sit in this folder; the live pages are untouched. Verifier: `node docs-review/prose-lift-24.8.0/s2-verify.mjs`, run from the repo root.

Conventions:
- Edited: text inside `<p>`, `<li>`, `<blockquote>` and `<td>` only. Frozen and checked: every tag with its attributes (in order), every heading, every script/style/JSON-LD block and HTML comment, and every text node outside those prose elements (labels, buttons, chips, spans, eyebrows, the join form, the layer-band descriptions on index).
- Short UI text inside prose elements (hero decks under 8 words, "Required field", the Ring Atlas deck, rule and key lines, the sr-only map description, the library card blurbs, the glossary pointer) was left as is.
- Quotes sit between guillemets and are verbatim from the edited copy after tags are stripped, entities decoded and whitespace collapsed; each is 15 words or fewer. The verifier checks every one.
- Word counts cover the prose elements only (a word is a whitespace token containing a letter, digit or `$`).

| Page | Prose elements (edited) | Words (orig → edit) | Max em-dashes per paragraph (orig → edit) | Structure / blocks / frozen text | Status |
|---|---|---|---|---|---|
| index.html | 38 (15) | 538 → 517 (−3.9%) | 1 → 0 | identical / byte-identical / identical | ready; 2 ruling-adjacent flags |
| join.html | 10 (4) | 220 → 213 (−3.2%) | 2 → 2 (frozen 7-word hero line only) | identical / byte-identical / identical | ready; 1 ruling flag, sentence left verbatim |
| layers.html | 25 (13) | 976 → 956 (−2.0%) | 2 → 1 | identical / byte-identical / identical | ready; 2 ruling flags, upper-pair paragraph left verbatim |
| audiobook.html | 16 (8) | 288 → 282 (−2.1%) | 2 → 1 | identical / byte-identical / identical | ready |
| **Total** | 89 (40) | 2022 → 1968 (−2.7%) | | | |

**Length.** The total lands at −2.7%, under the 5–15% aim. These pages are mostly compact card blurbs, flowchart captions and short deck lines, with few restatements. Most fixes swap an em-dash or a reversal for a plain clause, which saves little. Cutting further would mean dropping claims or making sentences denser. No paragraph grew, and the verifier checks that.

**Em-dashes.** Every edited paragraph has at most one. The only prose element left with two is join's 7-word hero line ("The choice — and the consequences — are yours."), which is frozen as short UI text. The verifier reports it as an exemption.

**Tailwind.** The verifier lists every word in the edited prose that the original page lacked. None is a bare Tailwind utility; join's "visible" was changed back to "legible" for this reason.

## index.html

Claims ledger:
- Hero description: «A proposed voluntary civilization: five distinct worlds of trust, technology, and freedom»
- Hero, consequence link: «connected by the consequences of what we do»
- Premise, three pillars: «built on layered governance, technological accountability, and consequence-bound freedom»
- Premise, outcomes tied to behavior: «Safety, abundance, continuity, and descent are designed to follow from behavior.»
- Principle I: «Rights, access, and insulation follow visibly from conduct»
- Principle I contrast: «not from ideology or inherited status»
- Principle II: «Brain implants, backup vessels, audits, and AI mediation make continuity and consequence operational.»
- Principle III: «Five distinct civilizational environments, each complete on its own terms.»
- Principle III movement: «Movement depends on what citizens do.»
- Principle IV (unchanged): «Citizen petitions, expert drafting, and direct population ratification create the law.»
- Diagram intro (unchanged): «from the protected center to the voluntary frontier»
- Justice flow components: «joins prevention, neural detection, STI accountability, autonomous enforcement, and judicial reassignment»
- Justice flow unity: «in one civic mechanism»
- Stage 1 (unchanged): «Violent urges, deliberate violations, or socially harmful acts begin here.»
- Stage 2 (unchanged): «Implant warnings, motor overrides, and voluntary restraint provide a chance to stop escalation.»
- Stage 3: «The act happens, and the VMSS monitoring infrastructure registers it.»
- Stage 4 (unchanged): «detect what happened and who was involved»
- Stage 5: «adjusts according to severity, pattern, and context»
- Stage 5 hedge (may): «Major violations may enter the public ledger.»
- Ledger visibility (unchanged): «Major non-criminal violations can become publicly viewable.»
- Score reduction (unchanged): «STI falls in proportion to the breach and its social meaning.»
- Social fallout (unchanged): «Relationships, reputation, opportunities, and endorsements are affected.»
- Recovery, hedge (gradually): «Long-term good behavior, service, and endorsements can gradually rebuild STI.»
- Escalation threshold (unchanged): «severe enough to trigger autonomous state response»
- Enforcement network (unchanged): «Central authority drones and distributed units respond immediately.»
- Sedation: «the subject has already committed a major violation»
- Transport: «removed from the scene and delivered to the judicial system»
- Judicial review (unchanged): «Evidence, telemetry, context, and severity are reviewed within the VMSS legal framework.»
- Reassignment frequency: «reassignment is the common outcome»
- Section purpose (atmosphere kept as the lesser aim): «Beyond atmosphere, the aim is legibility»
- What a reader should grasp: «the moral logic, the rings, and the technologies that enforce the system»
- Pillar 01, agency kept: «The system leaves human agency in place.»
- Pillar 01, descent: «Harmful agency carries visible, permanent descent.»
- Pillar 02, Sanctuary basis (flag 2): «an engineered sanctuary reserved for sustained non-harmful conduct»
- Pillar 02, not by decree: «not a utopia by decree»
- Pillar 03, what vessels keep: «Backup vessels preserve identity, memory, and civil continuity»
- Pillar 03, what they do not: «but not innocence or an escape from consequence»
- Civic gradient, layer character: «with its own economy, social texture, and institutional character»
- Civic gradient, variation: «From ring to ring, enforcement, risk, and trust behave differently.»
- World feature list (unchanged): «Full sensory media. Bioengineered companions. Food synthesis. AGI assistants.»
- World feature, shared infrastructure: «The infrastructure that governs the rings also shapes everyday life.»
- Library, technologies (unchanged): «Implants, backup vessels, neural diving»
- Library, audiobook (unchanged): «starting with the free introduction»
- Library, simulations (unchanged): «Resident stories, world scenarios, and the interactive Social Trust Index console.»
- Entry (unchanged): «Entry is opt-in.»

Flags:
1. Ruling-adjacent, frozen: principle III sits under the frozen heading "Layered ascent", and "Movement depends on what citizens do" is broad next to the downward-only mobility ruling. Not a contradiction (Sanctuary phase-up is automatic at 85), so the sentence was only trimmed ("actually" cut).
2. Ruling-adjacent, left verbatim: Pillar 02 "reserved for sustained non-harmful conduct". "Sustained" can be read against the ruling that Sanctuary eligibility at 85 is immediate. Only the reversal around it was rewritten; the phrase is unchanged for Jason to rule on.
3. Cut word: "texture of everyday life" became "everyday life" (stock phrase). No claim lost.
4. Not edited: the five `.vmss-layer-desc` spans are UI text outside prose elements and stay frozen, including the -1 band's em-dash.

## join.html

Claims ledger:
- Scale of the step: «Joining is a bigger step than moving to a better city.»
- Contract: «You opt into a different civilizational contract»
- Linkage: «trust, safety, and opportunity are structurally linked to how you behave»
- Intake sorting: «a qualifying criminal history sorts to -1, -2, or -3»
- Default placement: «everyone else begins in Main Layer (0)»
- Day-one package: «$10,000/month UBI, backup vessel continuity, full access to advanced technologies»
- Freedom: «the freedom to build any life you choose»
- Outward actions only: «Your outward actions are legible to a system built around consequence.»
- Permanence: «Harm permanently changes the environment you are allowed to inhabit.»
- Upward path (flag 1, verbatim): «Sustained compliance opens higher layers.»
- Transparency: «The system is explicit about what it does and why.»
- Who should join: «Join if you want a civilization that builds trust into its architecture.»
- Who should not: «If you want the benefits without the consequences, don't join.»
- Before you begin, step 1: «to understand that layer reassignment is permanent and what each ring offers»
- Step 2 (unchanged): «voluntary, but refusal carries real social and access consequences»
- Step 3 (unchanged): «reviewed against your Earth history, psychological profile, and behavioral trajectory»
- Audiobook offer (unchanged): «All applicants receive free access to»
- Audiobook length (unchanged): «a 1-hour narrated introduction to the civilization»

Flags:
1. Ruling-adjacent, left unchanged: "Sustained compliance opens higher layers." The plural "higher layers" reads as a general upward path, which sits against the downward-only mobility ruling (from Main the only higher layer is +1), and "sustained" sits against immediate eligibility at 85. Kept verbatim for Jason.
2. The hero line "The choice — and the consequences — are yours." is 7 words, so it counts as short UI text and keeps both em-dashes.
3. Form labels, checkbox consent text (`<span>` inside `<label>`), placeholders and the modal are frozen and byte-identical.

## layers.html

Claims ledger:
- Hero (unchanged): «divided by continuous boundary walls 15 km high»
- Atlas deck (unchanged): «Select a movement to see who crosses which wall, and in which direction.»
- Gradient, five environments: «five distinct civilizational environments, each with its own economic character»
- Gradient, four attributes: «social texture, institutional presence, and enforcement posture»
- Not prisons: «They are not prisons stacked on top of one another.»
- Higher layers: «the more institutional infrastructure the civilization maintains on your behalf»
- Lower layers: «the more private enterprise and organic social order fill that space»
- Ordinary civilization: «innocent and harmful people are constantly forced to share the same space»
- Design failure: «VMSS treats that as a design failure»
- Core solution: «Its core solution is behavioral separation»
- High-trust grouping: «people who repeatedly preserve trust live among other high-trust people»
- Reassignment by risk: «reassigned to environments built for their actual level of risk»
- Coherence: «Each layer becomes socially coherent on its own terms.»
- Lower layers not worse: «Lower layers are less regulated, not worse.»
- Private order fills the gap: «fill the space that institutions vacate»
- Mixed population: «penalized residents, elective residents, voluntary permanent residents, and cross-layer visitors»
- Richer than a penal colony: «a social identity far richer than a penal colony»
- Shared UBI and currency: «share the same $10,000/month UBI, the same currency»
- Shared baseline: «the same post-scarcity baseline»
- Income range: «collecting UBI, Primary Job Subsidy, and market wages starts at $240,000–$300,000 annually»
- Income class: «comfortably upper-middle-class before any entrepreneurial income»
- Border crossing, hedge (routinely): «routinely cross into Main for commerce, dining, and cultural life»
- Borough comparison: «neighboring boroughs of one city»
- What differs: «Crossing the border changes trust infrastructure but leaves income the same.»
- Permanence: «Punitive reassignment is permanent across all lower layers.»
- No reintegration aim: «does not seek reintegration into higher-trust environments after a qualifying breach»
- Priorities: «protecting the innocent first, making consequences legible»
- Hedge (naturally): «what it naturally becomes when the right people inhabit it»
- Visitation direction: «Cross-layer visitation flows downward»
- Visitation freedom: «citizens may visit layers below their placement freely»
- Economic neutrality: «arriving economically neutral in the destination environment»
- Visit reason 1: «Some visit for research.»
- Visit reason 2, hedge (can): «can feel constraining»
- -2 visit: «a legitimate change of pace, not a suicide mission»
- LP-004.2: «LP-004.2 suspends the visitor's backup vessel link at the boundary»
- -3 death final: «death inside the Freedom Layer is final for visitor and resident alike»
- +1 prevention: «Harm is stopped before completion.»
- +1 domains: «the safest, freest, and most selective domains in the civilization»
- +1 population: «300 million residents in the primary ring»
- SAD size: «intimate communities of tens to hundreds of thousands»
- SAD gate: «each gated by a single shared metric»
- Small-town feel: «These communities offer a small-town feel no metropolis can.»
- Main population: «billions of residents»
- Main scale: «a civilization at full human scale»
- Main, completion before intervention: «Harmful acts can complete before intervention, which makes the choices here real.»
- Main by choice: «having seen what lies above and below»
- Main as destination: «as a destination rather than a waiting room»
- Upper pair, ascent (flag 1, paragraph verbatim): «residents who sustain high compliance ascend to Sanctuary»
- Upper pair, 85 floor: «whose STI drops below the 85-point floor phase back to Main»
- Upper pair, upkeep: «the highest-upkeep residency in the civilization, not a permanent reward»
- -1 presence: «Partial institutional presence alongside growing private enterprise.»
- -1 threshold: «for non-trivial but non-predatory violations»
- -1 contraction: «Status and access contract»
- -1 floor: «the market economy, reduced taxation, and UBI floor all remain»
- -1 population: «Penalized residents live alongside elective residents, voluntary permanent residents, and visitors from above»
- -1 culture: «a commercial district culture with its own rhythm»
- -1 STI role: «Placement is permanent, but STI improvement determines local standing and access within the layer.»
- -2 economy: «Predominantly private economy with reduced institutional presence.»
- -2 penalized residents: «whose actions demonstrated predatory danger to others»
- -2 voluntary residents: «voluntary residents who chose -2 for its hybrid economic character»
- -2 private order: «Private security, private justice, and organic community hierarchy fill the institutional void.»
- -2 voluntary districts: «maintain genuine infrastructure and functioning markets alongside the contested zones»
- -2 permanence: «Punitive reassignment here is permanent»
- -2 continuity of life (contrast and "genuine" kept): «but life, commerce, and genuine social order continue on the layer's own terms»
- -3 federal floor: «a federal floor of UBI, taxation, and federal law enforcement»
- -3 governance: «with daily governance withdrawn»
- -3 economy: «low taxation, no regulatory infrastructure for daily commerce»
- -3 voluntary draw: «These frontier conditions make some people choose this layer voluntarily.»
- -3 share by choice: «A meaningful portion of -3 residents are there by choice, not consequence.»
- -3 ledger (ruling: ledger runs in -3): «The public ledger travels with every resident»
- -3 internal order: «develop their own internal order»
- -3 completeness (own sentence, no causal link): «The layer is complete on its own terms.»
- Why, knowledge: «Every resident knows what each layer protects, what it permits»
- Why, cost: «what it costs to lose access»
- Why, visibility: «moral causality is visible instead of abstract»
- Why, five layers: «richer with all five layers than it would be with one»
- Why, distinct offers: «each offers something the others cannot»
- Justice, hedge (primarily): «justice is primarily a change in the environment you are allowed to inhabit»
- Justice, contrast: «rather than a sentence measured in years»
- Environments have life: «genuine texture, economy, and social life of its own»
- Law as design: «turns law from an after-the-fact reaction into a stable social design»
- Systems pointer (two em-dashes became parentheses): «(UBI, taxation, subsidy, and overtime premium), see Systems»

Flags:
1. Ruling-adjacent, left unchanged: the upper-pair note ("residents who sustain high compliance ascend to Sanctuary") uses "sustain", which can be read against immediate Sanctuary eligibility at 85. The whole paragraph is verbatim, em-dash included, for Jason to rule on.
2. Ruling-adjacent, kept: Main "having seen what lies above and below". Upward visits are banned, but a resident who phased back from Sanctuary has seen above, so this is not a direct contradiction. Kept.
3. Rulings checked and consistent: -3 vessel-link suspension (LP-004.2), downward-only visitation, the ledger in -3, and -1 STI governing local standing but never placement.
4. "Every resident knows" (Why the Rings Matter) is a blanket assertion, but it is the paragraph's claim, so it stays.
5. -2: "genuine social order" and the "but" contrast are restored (verifier fix). The draft had cut "genuine" as a repeat, but it asserts that the lower layers have real social order, a separate claim from "genuine infrastructure".
6. Ruling-adjacent, left verbatim: the upper-pair paragraph says "Sanctuary residents whose STI drops below the 85-point floor phase back to Main". That has STI driving a change of placement, which may bear on the ruling that STI never sets placement. Paragraph unchanged for Jason to rule on.
7. Verifier fixes: the Sanctuary card's "They offer" became "These communities offer" (antecedent was ambiguous); the -3 card's "so the layer is complete" was split back into two sentences, since "so" added a causal claim the original did not make.

## audiobook.html

Claims ledger:
- Series scope: «Five volumes, one civilization»
- Series range: «from foundational architecture to an outsider's reckoning»
- Series form: «the VMSS doctrine, recorded and narrated, from foundational architecture»
- Free intro contents: «the core doctrine, the five rings, and the foundational logic»
- Free intro version: «VMSS doctrine v8.5 is an earlier snapshot of the architecture, presented without flair.»
- Free intro advice: «To learn what VMSS is before committing to the full series, start here.»
- Trilogy: «Volumes 1–3 form the core doctrinal arc»
- Trilogy arc: «from architecture to enforcement to simulation»
- Trilogy version: «VMSS doctrine v11: the full doctrine at that snapshot, narrated with depth and flair.»
- Vol 1 topics: «five concentric rings, voluntary entry, and moral causality as governance»
- Vol 1 technologies: «UBI, backup vessels, neural diving»
- Vol 1 case: «separating the harmless from the harmful by design rather than force»
- Vol 2 subject: «The implant. The Central Ledger.»
- Vol 2 recording: «Behavioral recording at the neural level»
- Vol 2 scope: «what the system sees, what it ignores, and why the distinction matters»
- Vol 2 thesis: «How moral accounting replaces incarceration.»
- Vol 3 STI: «The Social Trust Index in seven dimensions»
- Vol 3 simulations: «Case-by-case simulations of how the system processes real behavioral profiles»
- Vol 3 dimensions named: «civic compliance, contribution, relational integrity, and more»
- Standalone version: «Independent works at VMSS doctrine v11.»
- Standalone independence: «Each stands on its own, with no prerequisite reading.»
- Vol 4 premise: «expecting a thought experiment and finds a civilization framework that resists dismissal»
- Vol 4 system: «answers every objection before it's raised»
- Vol 5 (unchanged): «cosmetic transformation is available to everyone, aging is optional»
- Vol 5 (unchanged): «the definition of human appearance has permanently expanded»

Flags:
1. Vol 4: "something far stranger" was cut as a flourish; the premise and the "resists dismissal" claim remain.
2. Vol 5 is unchanged: it has no listed habit worth a rewrite.
3. "~1 hour", "Free", the volume kickers and all button text are frozen UI.
