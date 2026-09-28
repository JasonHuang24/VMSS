# Prose lift 24.8.4, group 1 (Resources r21, r22): fidelity ledger

Modes (triage register, docs-review/prose-lift-24.7-triage.md): r21 and r22 are both clarity edits. The pages are copies of the `<div class="resource-page">` blocks in documents/resources-source.html. The source itself is untouched. `check-g1.mjs` (this folder) checks each page against its source block. It confirms that tags and attributes, table cells, headings and the set of numbers are identical, and that every ledger quote below appears in the edited page. It also reports word counts and paragraphs with more than one em-dash. Quotes are matched against the page text with tags stripped and entities decoded (curly quotes become straight quotes, `&mdash;` becomes —, `&sect;` becomes §).

Global notes:
- Word counts cover the whole block, tags stripped. Only running prose was edited. Headings, the subtitle lines, figures, dates, percentages, LP numbers and citations are frozen. Neither page has a table.
- The "The student who ... has misread" frame of the Student's Error sections is house structure and stays.
- Sentences that carry a doctrine flag were left verbatim, including any original em-dash. They are listed under Flags.
- Approved doctrine changes: none applies to this group. The R1 "no AI enforcement" change concerns r1 only, and the LP-004.2 visitor rewrite is approved for R27 and R28 only. Neither r21 nor r22 has a -3 visitor-with-active-link passage (r22's severance lines are resident-scoped; see r22 flag 4).
- None of the listed cross-resource clashes (wall thickness, kill-switch scope or timing, Dyson date, R20 founding date, mind-state sync) appears in r21 or r22. The S4 items that touch this group are the PPG worked example (r22 flag 1) and R26's cross-reference to R21 (r21 flag 1).
- Hedges were checked by count against the source (typically, approximately, often, perhaps, primarily, tends, partially, overwhelmingly, substantially, broadly, disproportionately, almost, rarely, occasional, may, might); every one survives.
- The triage word counts (3,319 / 4,881) were made with a different counter. The counts below come from check-g1.mjs.

## r21 The Balanced Layer

Claims ledger
- Framing: `The intermediate layers are doctrinally significant and sociologically under-analyzed.` / `because the extremes produce the most narratively striking material`
- Intermediate layers: `-1 Noncompliance and -2 Violent Offense` / `actually operates for the majority of reassigned citizens`
- Nickname: `-1 Noncompliance, the Balanced Layer`
- First punitive layer: `-1 Noncompliance is the first punitive layer` / `the lower layers, which are progressively more privately governed`
- Article I: `The Charter's Article I establishes the categorical distinction between Main and -1` / `the line between continuous-behavior adjudication and post-intervention reassignment`
- -1/-2 line: `VMSS distinguishes non-trivial violations from predatory harm.`
- -1 conduct: `single incidents that cross the incarceration threshold without crossing the predation threshold` / `the predation threshold all produce -1.`
- -2 conduct: `Rape, severe assault, systematic exploitation, and conduct whose character is predatory` / `predatory rather than merely harmful produce -2.`
- Severity-vs-predation: `The severity-vs-predation distinction is what makes -1 the Balanced Layer` / `rather than a weaker version of -2.` / `the sharper institutional withdrawal of the Lower Restrictions Layer`
- Two pathways: `Two pathways qualify for -1 assignment: a single qualifying event` / `would resolve with incarceration rather than a fine` / `driving under the influence, assault, fraud at meaningful scale`
- Pattern pathway: `an unremediable pattern (sustained accumulation of minor infractions without corrective signal across time)`
- Pathway vs classification: `The classification matters more than the pathway`
- First-fall share (flag 4): `disproportionately composed of first-fall citizens` / `whose current placement is their first reassignment`
- Transition: `from institutional abundance to partial institutional withdrawal`
- Demographics: `The demographics are broad: working-age adults with employment histories`
- Contrast with -2 and -3: `whose population skews toward serious violent history` / `both punitive arrivals and voluntary permanent residents who chose the Freedom Layer`
- Orientations: `The -1 population is psychologically varied.` / `shock and adaptation among those reassigned through isolated events` / `defiance and grievance among those who contest the justice of their placement`
- Neutral infrastructure: `designed to serve all of them without privileging any`
- Elective residents: `A third population warrants separate treatment: voluntary elective residents` / `retaining origin-layer status under the Charter's elective residency framework`
- Business orientation (hedge): `This population is overwhelmingly business-oriented`
- LP-074 rate: `a 25% top marginal rate on earned income exceeding $10 million annually` / `under LP-074's active 50% / 25% / 12.5% / 6.25% exact cascade`
- Article III.VII: `speculative equity markets, which Article III.VII excludes from upper layers`
- 2294 tax cut and SCM: `The 2294 tax cut increases first-pass private allocation` / `SCM remains unchanged and still reaches qualifying idle savings under -1's applicable rules`
- Characteristic ratio: `institutional presence and private enterprise meet in their most characteristic ratio`
- Main Layer figures: `with the current 50% top marginal tax, full UBI at $10,000/month` / `full Primary Job Subsidy infrastructure, and comprehensive service delivery`
- -3 pole: `-3 Terminal operates under the federal floor only`
- -1 position: `partial institutional presence supplemented by organic private enterprise`
- -1 features: `Universal Basic Income at $5,000 per month` / `Primary Job Subsidy at $5,000 per month for qualifying work` / `a 25% top marginal tax above $10 million`
- -1 features (cont.): `the unchanged -1 Savings Circulation Mandate rules` / `the layer-specific Compliance Token currency`
- PPG (hedge): `approximately 1.3 to 1.8 times Main Layer purchasing power`
- Tax premium: `The 25% versus 50% gap gives high-income earners a real economic premium`
- Highest speculative layer: `the highest layer on which the Charter permits speculative equity markets` / `natural destination for certain categories of economic activity`
- Reform scope: `The tax reform left currency siloing and upper-layer speculative-asset restrictions unchanged.`
- Regulatory floor: `The regulatory floor on -1 is substantive.` / `Article XXVIII regulatory law operates at full institutional intensity`
- XXVIII mechanics: `the 1% petition threshold, the Meritboard expert panel drafting` / `the 80% population ratification, and the AI governance system's enforcement`
- Same architecture: `The floor is not categorically dissimilar from the upper pair` / `what differs is the specific regulations the -1 population ratifies`
- Lighter regulation (hedge): `tends to favor lighter-touch regulation on commerce, employment, and enterprise` / `real and enforceable but calibrated to the layer's economic character`
- Bundle: `attractive to business-oriented voluntary residents`
- MGDs and §21: `Metric Gated Domains (MGDs)` / `gated on transparent measurable criteria (defined in Whitepaper §21)`
- MGD density (hedge): `at higher density than on any other layer except perhaps Main`
- MGD services: `provide services that Main Layer receives institutionally` / `specialized medical care beyond the federal-floor provision`
- MGDs open, XXVIII: `The MGDs operate openly under Article XXVIII regulatory law` / `the same 1% signature threshold that Main Layer districts use`
- Hybrid day: `The economy is therefore hybrid.` / `a qualifying PJS position administered by the Meritboard's federal-administration ranking`
- Coexistence: `Neither the institution nor the market fully displaces the other.`
- Infrastructure density: `at the density the Charter's federal commitments require`
- Fabrication proxies: `closed sovereign facilities that provide backup vessel continuity within the layer` / `operate at lower density than Main Layer fabrication facilities`
- Revival rates: `The revival failure rate is approximately 1 in 10,000` / `approximately 1 in 1,000,000 in Main Layer` / `a 99.99% probability of successful revival`
- Reliability: `measurably less reliable than Main`
- Drones: `Enforcement drone coverage is present but thinner than on Main Layer.` / `logging-only AI tracking rather than the pre-intervention posture`
- Post-act posture: `Acts may complete, victims are revived or treated` / `further reassignment (to -2 or below)` / `the same three-axis framework that operates in Main Layer`
- Response times: `Response times are measured in minutes rather than the seconds` / `Dense urban districts in -1 see response times approaching Main Layer benchmarks`
- Cooperative security (hedge): `a gap the private cooperatives partially fill`
- Medical: `Medical infrastructure operates through a combined institutional-private system.` / `Federal medical drones provide emergency response, backup vessel queuing, and baseline care.`
- Medical use (hedge): `A resident with a chronic condition typically uses both systems` / `interoperable at the data level through the implant ledger`
- Reduced trust infrastructure (flag 2): `operates at reduced intensity on -1 relative to Main`
- MGD role: `Reputation-gated MGDs are the layer's primary mechanism for economic coordination.` / `work quality, contract adherence, dispute resolution history, referral patterns`
- CCTN: `the Clean Conduct Trade Network (CCTN)` / `catalogued alongside nine MGD instances on the civilization's public SAD/MGD reference page`
- CCTN admission: `whose record since descent to -1 is unblemished` / `whose fulfillment ratio on prior contracts passes the network's bar`
- CCTN effect: `the difference between operating in -1's better districts and the contested ones`
- Reputation as currency: `The sorting turns reputation into a currency with real purchasing power`
- STI vs MGD: `MGD membership is distinct from the STI.` / `a civilization-wide institutional score administered through the AI governance system` / `local, community-defined, and privately maintained`
- Divergence (hedges): `perhaps because they arrived at -1 recently` / `perhaps because their institutional record is affected by their reassignment history`
- Federal floor in MGDs: `Federal floor law binds inside every MGD regardless of layer`
- Article XIV: `Article XIV's three-axis proportionality framework applies to private actors within -1`
- Private detention limits: `Private detention is permitted` / `indefinite solitary confinement, sustained corporal punishment, non-lethal torment` / `forced revival to deny a resident the bailout option`
- Operator liability: `build pattern on their own ledger`
- Designation ground (flag 5): `This two-way constraint earns -1 the Balanced Layer designation` / `residents cannot escape consequence, and the powerful cannot weaponize it`
- Mobility: `substantive social mobility within the layer` / `compete with or exceed what the same resident might have achieved in Main Layer`
- Article VII: `the Charter's Article VII seals the upward pathway after punitive reassignment`
- First-fall share (flag 4): `overwhelmingly composed of first-fall residents` / `differs materially from what the deeper punitive layers produce`
- Categorical shift: `reduced UBI, thinner medical response, logging-only enforcement` / `comprehensive fabrication-proxy-independent service delivery`
- Not a hell-analog: `though not as a hell-analog`
- Adjustment period (hedge): `The first-fall adjustment period typically runs six to eighteen months.`
- Supports: `mandatory enrollment in a relocation-orientation program` / `assignment of a cooperative liaison` / `not as rehabilitative placement`
- SCM grace period (flag 6): `a grace period on Savings Circulation Mandate calculations during the first year` / `the asset disposition effects of involuntary descent (Charter Article III.V)`
- Stable patterns (hedge): `typically settle into one of several stable patterns` / `petitioning for layer-wide and district regulations`
- Further descent (hedge): `approximately ten to fifteen percent of the first-fall population based on long-horizon studies` / `descend further to -2 or below`
- Majority stable: `The majority stabilize at -1 and build durable lives there.`
- SAD stacks: `Selective Ascension Domain (SAD) credential stacks` / `SADs are Sanctuary-exclusive and state-chartered`
- SAD erasure: `punitive reassignment to -1 erases every SAD membership the resident held`
- Named SADs: `Relational Integrity Layer, Cognitive Clarity Domain, Physique Standards Domain` / `Intelligence Standards Domain, Creative Output Domain, and Lineage Integrity Domain`
- Stack meaning: `decades of sustained performance on specific measurable criteria` / `because Article VII seals the upward pathway permanently`
- Income vs credential loss: `The income differential from Sanctuary or Main to -1 is small by comparison.` / `employment signals, matching-market leverage, residential community access, partnership verification`
- STI intact: `with their STI record intact but with every voluntary credential erased`
- Identity loss (hedge): `this describes most long-horizon Sanctuary-credentialed residents` / `the economic framing of -1 as "comfortable" fails to capture`
- Sub-population: `one of the more distinctive sub-populations`
- Nickname usage: `-1 Noncompliance is nicknamed the Balanced Layer`
- Balance terms: `between federal governance and organic social structure` / `(the federal floor, backup vessel revival, UBI)` / `(cooperative participation, reputation-network management, self-directed economic coordination)`
- Deliberate graduation: `they chose the graduated approach deliberately` / `(institutional hell to private sector freedom)` / `at sustainable density rather than being overwhelmed by sudden demand`
- Connectivity (hedge): `elective residency in -1 is the most common form of downward elective movement`
- Visitation (flag 3): `visitation from -2 is not permitted upward to Main or +1`
- Interface: `interface between institutional and private governance`
- Student 1: `concludes that -1 is a mild punishment, a gentler Main Layer` / `sealed upward pathway, and permanent reassignment status are real constraints` / `not a lesser version of the same one`
- Balanced vs severity: `describes the layer's internal architecture and says nothing about its severity relative to Main`
- Student 2: `Most -1 residents stay on -1 and make it their home.` / `durable lives that extend across generations`
- Child relocation right: `the same right to relocate to Main Layer that the Charter guarantees every child`
- Student 3: `its most sustained sociological test` / `the evidence from centuries of operation is that it can`
- Not a failure: `Far from being a failure of the full institutional model`
- Gradient: `a governance gradient rather than a punishment gradient` / `rather than a station on the way somewhere else`

Word counts: 3,310 → 3,142 (−5.1%). No paragraph has more than one em-dash (the intro, the MGD definition, fabrication-proxy, Article XIV, mobility, first-fall, SAD and Student's Error paragraphs each had two or three). The one remaining dash sits in the frozen pathway parenthesis.

Removed or merged lines (claims kept elsewhere):
- "-1 is not a mild Main Layer. It is a different civilization." (triage sample) is merged into the first Student's Error sentence ("a mild punishment, a gentler Main Layer") and "enters a fundamentally different environment, not a lesser version of the same one".
- "The layer is not a holding pattern. It is a home." (triage sample) now reads "Most -1 residents stay on -1 and make it their home." The closer "It is not waiting for residents to leave." is dropped as a restatement.
- "It is not a punishment gradient. It is a governance gradient." (triage sample) now reads "VMSS's gradient is a governance gradient rather than a punishment gradient". The claim is unchanged.
- "-1 is not a failure of the full institutional model. It is the model's working demonstration ..." now reads "Far from being a failure of the full institutional model, -1 is its working demonstration ...". The tricolon "societies that function, residents who thrive, and civilizational textures worth preserving" now reads "functioning societies in which residents thrive and whose civilizational textures are worth preserving".
- "... and they deserve dedicated analytical treatment" (intro) is dropped; the resource's existence makes the point.
- "The balance is not accidental." is dropped; "they chose the graduated approach deliberately" carries it. "The connectivity matters." is dropped as a stock lead-in.
- "What differs is not the regulatory architecture but the specific regulations ..." now reads "what differs is the specific regulations the -1 population ratifies", joined to the frozen "not categorically dissimilar" line.
- "The MGDs are not underground — they operate openly ..." now reads "The MGDs operate openly under Article XXVIII regulatory law ...".
- "the private action is not outside the proportionality framework; it is inside it" now reads "Private action sits inside the proportionality framework". "This is what earns -1 the Balanced Layer designation. The layer constrains both directions: ..." is merged into "This two-way constraint earns -1 the Balanced Layer designation: ...".
- "The shift is not experienced as a hell-analog ... but it is experienced as real, measurable consequence." now reads "Residents experience the shift as real, measurable consequence, though not as a hell-analog".
- "... so the MGD architecture operates within the constitutional framework rather than outside it" loses "rather than outside it".
- "The taxation differential is structurally consequential." is dropped; the next sentence states the premium.
- "categorically fails to capture" now reads "fails to capture" (blanket intensifier). "is structurally consequential", "genuinely", "genuine" are dropped as intensifiers where the claim stands without them.

Flags:
1. S4 cross-reference note (no change here). The triage says R26's pointer to "the Sanctuary-credentialed cohort ... analyzed in R21" should read R25. r21's First-Fall section does analyze former Sanctuary-credentialed SAD stack holders after descent (`Selective Ascension Domain (SAD) credential stacks`). Jason may want to check which cohort R26 means before retargeting it.
2. STI ruling, soft (left unchanged). "Where institutional trust infrastructure (STI scoring, the AI governance system's network attribution, formal compliance review) operates at reduced intensity on -1 relative to Main". The STI console rulings hold that the STI runs in every layer, including -3. "Reduced intensity" may be compatible, but it is worth a ruling. Sentence verbatim.
3. Article VII visitation (left unchanged). "-1 is often the layer ... through which -2 residents interact with less punitive institutional architecture (visitation from -2 is not permitted upward to Main or +1, but visitation is permitted within each layer's own boundaries)". Article VII (charter.html): "Citizens may not visit layers above their current placement. Punitive residents hold no visitation rights to higher layers." The parenthesis bars only Main and +1, which implies -2 residents might reach -1. Sentence verbatim.
4. Internal wording (left unchanged). The first-fall share is "disproportionately composed" in the Entry section and "overwhelmingly composed" in the First-Fall section. Both hedges kept.
5. Internal (left unchanged). The Balanced Layer name is given two grounds: the Article XIV two-way constraint ("This two-way constraint earns -1 the Balanced Layer designation") and the institutional/private balance in the designation section. Also, "A third population" follows only one population named as such. Both kept.
6. Citation, unverified (left unchanged). The first-year SCM grace period is cited to "Charter Article III.V". III.V in charter.html is "Asset Treatment on Layer Movement"; it covers asset disposition but no SCM grace period appears in charter.html. The other citations check out against charter.html headings: Article I, III.V, III.VII (SCM text excludes speculative markets from upper layers), VII, XIV, XXVIII.
7. Doctrine changes applied: none (no approved change applies to r21).

## r22 The Lower Restrictions Layer

Claims ledger
- Cousin: `-2 Violent Offense is a close structural cousin to -3 Terminal.` / `minimal federal institutional presence in daily life`
- One axis (hedge): `They differ primarily on one axis that matters enormously` / `-2 retains backup vessel proxy access, and -3 does not.`
- Similar otherwise (hedge): `Everything else is broadly similar between the two layers`
- Reversible death: `death on -2 is federally reversible`
- -3 severance (flag 4): `the implant's backup vessel link is severed at -3 entry`
- Framing: `death-protected but body-unprotected` / `made not-quite-terminal by one specific federal commitment`
- Threshold: `requires a qualifying behavioral breach beyond the threshold that -1 Noncompliance covers`
- Three axes: `three-axis proportionality framework (severity, pattern, reversibility)`
- Qualifying acts (hedge): `-2 placement typically follows acts that score severely across multiple axes` / `homicide under adjudicated circumstances, rape, aggravated assault producing irreversible harm, human trafficking`
- Direct assignment: `produces direct -2 assignment without transit through -1`
- Article XVIII escalation: `may also escalate to -2 through the Article XVIII network attribution framework`
- Population: `skews toward residents with serious violent history in their behavioral ledger` / `dominated by first-fall residents from diverse offense categories`
- Severity: `by definition, caused harm that any functioning justice system would treat as severe`
- Secondary population: `A secondary population exists` / `direct adjudication from Main Layer without transit`
- Elective presences: `is smaller than on -1 but present` / `tourism, commercial engagement with the layer's industrial base` / `retain their origin-layer standing during their -2 presence`
- Reese: `Callum Reese arrived through punitive reassignment` / `domestic violence escalating to aggravated assault` / `Three years later he works within an eight-person crew`
- Reese calibration: `a single murder on -2 ends whatever is left of his record permanently`
- Webb: `Marcus Webb descended eleven years ago for aggravated coercion` / `It has forty-three employees` / `a hostile underprice attempt in year nine`
- Territorial MGDs: `territorial MGDs that control physical geography, infrastructure, and the resources`
- §21 (hedge): `The MGD framework (Whitepaper §21) does not require territorial control` / `most MGDs across the civilization operate without geographic dominion`
- De facto governance: `exercise de facto territorial governance` / `approximate what local government performs in Earth-era societies`
- ORC: `the Operational Reliability Cooperative (ORC)` / `as the illustrative -2 example`
- ORC admission: `zero contract defaults and zero local-ground violations since arrival on the layer`
- Reliability value: `membership that guarantees reliability is structural rather than sentimental` / `scale this ORC-class reliability requirement up to a geographic domain`
- Commercial status: `commercial rather than political entities` / `They receive no federal sanction or institutional backing.`
- Article XXVIII on -2: `to the extent that the layer's population ratifies specific regulations` / `produces fewer binding regulations than on -1`
- Petition drivers (hedge): `disproportionately driven by the private security cooperatives` / `into ratified layer-wide standards`
- Floor inside MGDs: `Article XXV federal law, the no-killing constraint, and the UBI distribution` / `MGDs govern their members but not the civilizational minimums the Charter establishes`
- Economy (hedge): `resource-exploitative and industrial` / `often operate as vertically integrated firms`
- UBI: `The Universal Basic Income on -2 is $2,500 per month` / `half the -1 rate and a quarter of the Main Layer rate`
- PJS: `The Primary Job Subsidy matches at $2,500 per month for qualifying work.`
- PPG (hedges; flag 1): `The purchasing power gradient (PPG) compensates partially` / `approximately 1.8 to 2.5 times Main Layer purchasing power`
- PPG example (flag 1): `real consumption power of $4,500 to $6,250 in Main Layer equivalent terms`
- Shortfall: `the real income shortfall relative to upper layers is still substantial`
- Narrow floor (flag 3): `Federal protection on -2 is narrow.` / `cover five categories, and nothing beyond them`
- Five categories: `Universal Basic Income distribution at $2,500 per month per citizen` / `Clean Energy Mandate, Nuclear Weapons Prohibition, Implant and Institutional Hacking Prohibition`
- XXV.IV: `the enforcement escalation ladder in Article XXV.IV`
- -2 revival rate (hedge): `at a revival failure rate of approximately 1 in 1,000`
- Homicide reassignment: `automatic reassignment of perpetrators to -3 Terminal when one -2 resident kills another`
- Full scope (flag 3): `That is the full scope of federal presence in daily life.`
- Revival center: `the operational center of the federal floor on -2` / `has a 99.9% probability of successful revival`
- Main comparison: `though Main delivers it at a tighter failure rate`
- Reversibility (hedge): `Death on -2 is reversible in the overwhelming majority of cases.`
- Identification: `identified via implant ledger data and automatically reassigned to -3 Terminal` / `loses their own backup vessel access permanently`
- Deterrent: `the victim is revived, and the perpetrator loses revival for good`
- Homicide rate (hedge): `-2 residents commit homicide at substantially higher rates than Main Layer residents` / `distinguishes -2 from a truly unprotected environment`
- Non-lethal gap: `Everything else is outside federal response.` / `no federal drone arrives and no federal search operates` / `held in forced labor, sexually assaulted` / `they respond only to federal-law violations and to killings`
- Doctrinal choice: `The gap is a doctrinal choice.`
- Scope of commitment: `The commitment covers their lives and does not extend to their bodies, property, or freedom.`
- Doctrine not resources: `as a matter of doctrine rather than resource constraint`
- Private fill (hedge): `Private structures fill the protection gap, partially and unevenly.` / `Private insurance products offer restitution for specific categories of loss.`
- Coverage limit: `These structures are substantial but not universal.`
- Lived asymmetry: `The asymmetry between lethal and non-lethal protection defines -2's lived character.` / `narrower than it sounds when stated abstractly`
- Medical (hedge): `operates primarily as support for the backup vessel revival system` / `queue revival events, synchronize mind-state data`
- Medical beyond revival (hedge): `federal medical presence is minimal` / `relies primarily on cooperative-operated clinics, private practitioners`
- Medical logic: `commercial rather than humanitarian logic`
- Commons (hedge): `the geography between their territories is effectively ungoverned` / `federal enforcement responds only to killings and Article XXV violations`
- Travel problem: `-2's defining travel problem` / `travelers without adequate protection are reliably victimized`
- Wilderness meaning (hedge): `refers primarily to ungoverned space rather than undeveloped terrain`
- Bandit terminal status: `loses their own backup vessel access and moves to terminal status`
- Bandit ceiling: `a hard ceiling on bandit violence: maximum harm short of death` / `Robbery is viable. Kidnapping for ransom is viable.` / `even torture short of lethal effect`
- Internal enforcement: `a killer in the group endangers every member's continued backup vessel access` / `is a commercial rule rather than a moral principle`
- Tiers: `personal, executive, commercial, or collective`
- Motorcades (hedge): `Motorcades serve the personal and executive tier.` / `The motorcade is typically smaller than a commercial caravan`
- Motorcade users (hedge): `A visiting Meritboard administrator on an inspection tour of a -2 district` / `would all typically travel by motorcade`
- Caravans: `Caravans serve the commercial and merchant tier.` / `can run the equivalent of several months of UBI` / `one of the layer's substantial industries`
- Other options: `air freight moves high-value cargo above the bandit envelope` / `Scheduled group convoys provide economy-tier protected transit`
- Protection fees: `informal and legally grey but commercially well-established option` / `many frequent travelers use`
- Lowest tier: `produces the bulk of the victim population that sustains the bandit economy`
- Stability: `The system is stable in its current operational form.`
- Teleportation: `operational teleportation technology (Resource 1)` / `predates teleportation deployment to the lower layers`
- Forced revival: `developed into a commercial instrument`
- Automatic revival (flag 2): `Revival on -2 operates automatically when a resident dies from causes unrelated`
- Revival debt: `a revival-cost debt that the cooperative advanced`
- Non-homicide window: `operates specifically within the non-homicide death window` / `industrial accident, disease, environmental hazard, self-harm`
- Supreme Court limits: `doctrinally sanctioned within narrow limits the Supreme Court has established` / `across centuries of adjudication`
- Permitted case: `permitted only where the worker's pre-death contractual obligations explicitly contemplated post-revival service`
- Struck and invalidated: `Revival purely for debt enforcement, without contractual grounding, has been struck` / `de facto perpetual servitude have been invalidated`
- Minimal intervention: `the Charter's commitment to minimal federal intervention in -2's internal governance`
- Cultural feature: `does not reliably end a commercial relationship` / `most frequently cite when they choose not to visit or reside in -2`
- Inversion: `the cruelest forms of -2 detention are objectively worse than -3` / `Each attempted self-termination triggers another revival`
- Not prohibited: `The system does not prohibit this.` / `bounded only by the non-lethal constraint and by the Article XIV three-axis framework`
- Operator practice: `most -2 operators make a different calculation`
- Commentary quote: `"the worst punitive placement in the operational VMSS architecture."`
- Weighted features: `the elevated permanent-death probability` / `Each of these features is real, but the description is incomplete.`
- Culture (hedges): `upper-layer observers typically do not experience directly` / `at an intensity upper layers rarely generate`
- Trust: `Trust relationships on -2, when they form, are unusually durable`
- Export: `exported across the federation` / `among the most valued cultural outputs the civilization produces`
- Canonical works: `several canonical works of VMSS literature have been produced by residents of -2`
- Not a hell (triage sample): `not a hell or a failure of the architecture`
- Later movers (hedge): `the occasional reputation-driven network of upper-layer hiring`
- -1 flows (hedge): `family visits where relationships extend across the layer boundary` / `occasional voluntary permanent descent by -1 residents` / `The flows are modest but continuous.`
- -3 relationship: `-3 Terminal is the Freedom Layer` / `a categorical discontinuity that the -1-to-2 transition does not`
- Severance on moving (flag 4): `the implant's backup vessel link severance at -3 entry produces`
- Voluntary descent: `Some -2 residents move to -3 voluntarily`
- Hardest boundary: `The -2/-3 boundary is the hardest in the architecture.` / `Crossing upward from -3 to -2 is impossible under Charter doctrine`
- No restoration (flag 4): `cannot be restored once severed at -3 entry`
- Self-sorting (hedge): `partially self-sorted across the boundary by preference`
- Resentment (hedge): `documented resentment` / `almost all of which fail because the hardware severance is not contestable`
- Fatalism: `a fatalistic attachment to the cooperative structures whose pressure they resent`
- Treated as predictable: `predictable consequences of the consequence gradient` / `the civilization's sharpest architectural line`
- Student 1: `concludes that -2 is a humanitarian failure of the VMSS architecture` / `it never intended the layer as a humanitarian floor`
- Life only: `where life is federally protected and nothing else is`
- Commitments: `(UBI, Article XXV federal law enforcement, backup vessel revival, perpetrator reassignment for homicide)`
- Declines to answer: `the Charter's design philosophy explicitly declines to answer`
- Student 2 (-1 contrast): `federal enforcement drones patrol for non-lethal harm` / `the 1-in-10,000 revival failure rate reflects comprehensive fabrication proxy coverage`
- -2 withdrawal: `withdraws from nearly everything else` / `Its closest structural cousin is -3 Terminal.`
- Survivability: `survivable across the resident's expected lifespan`
- Student 3: `a coherent (if harsh) civilizational environment` / `The Charter holds that a resident` / `their life will not be permanently taken, and nothing else`
- Preamble: `no life is ended (Preamble, Four Founding Lines)`
- Earth-era bundling (hedge): `morally unusual by Earth-era standards` / `which typically bundled life-protection with body-protection and freedom-protection`
- Unbundling: `-2 is where the unbundling is most visible`
- Closing claim: `commitment to never ending a life meets its commitment to not governing that life intensively`

Word counts: 4,876 → 4,589 (−5.9%). No paragraph has more than one em-dash (the intro, the Territorial MGD, Federal Floor, Commons, security-transit and Student's Error paragraphs had two or more). Three single dashes remain, each in a sentence held verbatim or unchanged: the "accept the travel risk and hope" line, the automatic-revival sentence (flag 2) and the -3-to-2 crossing sentence (flag 4).

Removed or merged lines (claims kept elsewhere):
- "The gap is not a failure of federal delivery. It is a doctrinal choice." (triage sample) now reads "The gap is a doctrinal choice." "The commitment is to their lives, not to their bodies, property, or freedom." now reads "The commitment covers their lives and does not extend to their bodies, property, or freedom." The two "equally unambiguous" sentences are merged into one.
- "The layer is not a hell. It is not a failure of the architecture. It is a functional society ..." (triage sample) now reads "-2 is a functional society under specific governance conditions, not a hell or a failure of the architecture".
- "The victim returns. The perpetrator does not." (triage sample) now reads "the victim is revived, and the perpetrator loses revival for good".
- "A resident considering murder knows that they gain nothing ... and lose everything ..." is dropped as an explanation after the point had landed. The two facts (victim revives; perpetrator's vessel access ends with -3 reassignment) are stated in the same section.
- The anaphoric run "They can be maimed, and no federal drone arrives. They can be kidnapped, ... They can be tortured, ..." is merged into one list sentence ending "no federal drone arrives and no federal search operates" (verifier fix: "federal" restored on both clauses so the sentence does not deny the private security response described later).
- "The territorial MGDs are commercial entities, not political ones. They do not receive ..." now reads "commercial rather than political entities. They receive no federal sanction ...".
- "MGD membership with reliability guarantees is structural rather than sentimental" now reads "membership that guarantees reliability is structural rather than sentimental" (verifier fix: the original contrast restored).
- "they become the constituency that formalizes through petition what they were already enforcing ..." is merged into the Article XXVIII sentence.
- "The layer's residents span this range and every point between it." is dropped as a restatement.
- "VMSS did not design -2 as a humanitarian floor. It designed -2 as ..." now reads "VMSS designed -2 as ...; it never intended the layer as a humanitarian floor."
- "The closest structural cousin to -2 is not -1 but -3 Terminal" now reads "Its closest structural cousin is -3 Terminal."
- "A resident who understands -2's architecture understands that the civilization means what it says: ..." and "The student who grasps this has understood what the Lower Restrictions Layer is actually for. It is the place where ..." are cut to one closing sentence ("The Lower Restrictions Layer is where ..."); the life/body/property claims are stated earlier in the paragraph.
- "'Don't kill' is not a moral principle in bandit culture; it is a commercial rule" now reads "is a commercial rule rather than a moral principle".
- "The term 'wilderness' on -2 does not refer primarily to undeveloped terrain; it refers to ..." now reads "refers primarily to ungoverned space rather than undeveloped terrain".
- "The flows are not dramatic but they are continuous." now reads "The flows are modest but continuous."
- Kept verbatim on purpose: "The gap between 'your life is protected' and 'everything else is not' is narrower than it sounds when stated abstractly and broader than it sounds when lived concretely." It is an aphorism closer, but any paraphrase risked changing what it claims.

Flags:
1. S4 cross-resource check, PPG worked example (left unchanged). r22: "$2,500 in -2 has real consumption power of $4,500 to $6,250 in Main Layer equivalent terms" multiplies by the PPG. The triage notes that R29's worked example divides by the PPG, which cancels the advantage r22 assumes. charter.html III.V's illustration also divides at conversion ("roughly ... 4,700 lower-restrictions tokens in -2" for $10,000). The two readings may both hold (nominal UBI paid in -2 currency vs conversion of Main value), but Jason should rule on one worked-example convention. Sentence verbatim.
2. Internal (left unchanged). "Revival on -2 operates automatically when a resident dies from causes unrelated to another -2 resident's agency — accident, illness, self-termination, or any non-homicidal cause." Read alone, it implies homicide victims are not revived automatically, but the Federal Floor section says every death, "through violence" included, has a 99.9% revival probability and the victim is revived. The sentence is scoped to the forced-revival window; it is kept verbatim for a ruling on wording.
3. STI ruling, soft (left unchanged). "The Charter's commitments to the layer cover five categories, and nothing beyond them ... That is the full scope of federal presence in daily life." The list leaves out the STI and the public ledger, which the rulings say run in every layer including -3; the same section uses "implant ledger data" to identify perpetrators. This matches triage flag 6 on R27. Paragraph verbatim.
4. LP-004.2 (checked, no change). laws.html LP-004.2: -3 entry "requires documented vessel-link suspension ... restoring it on exit", and "Death inside -3 is final for visitor and resident alike." r22's four severance references (intro, the -2-to-3 move, "cannot be restored once severed at -3 entry", "the hardware severance is not contestable") all describe -3 residents, so they are consistent, as the triage found. "cannot be restored once severed" holds only for residents; a visitor's link is restored on exit. The text never mentions visitors here, so nothing was changed.
5. Mind-state sync (no clash). "synchronize mind-state data" describes revival-event handling and does not claim continuous sync, so it is outside the R11/R28 clash. No change.
6. Citations check out against charter.html: Article XIV (Proportional Response), XVIII (Contextual Evaluation & Network Attribution), XXV.I–XXV.IV (the three named laws plus the Enforcement Escalation Ladder), XXVIII, the Supreme Court (XXV.VI review), and the Preamble's Four Founding Lines ("No life is ended.").
7. Doctrine changes applied: none (no approved change applies to r22).
