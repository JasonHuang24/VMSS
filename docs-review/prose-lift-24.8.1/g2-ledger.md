# Prose Lift 24.8.1: Group 2 (Academic Resources r7, r12, r14)

2026-09-28. Three resource pages from `documents/resources-source.html`, edited in copies in this folder (`r7.html`, `r12.html`, `r14.html`). The source file is untouched. Modes follow the triage register (`docs-review/prose-lift-24.7-triage.md`): r7 and r12 clarity edit, r14 light edit. Checker: `node docs-review/prose-lift-24.8.1/check-g2.mjs`, run from the repo root.

| Page | Mode | Block words (orig → edit) | Max em-dashes per paragraph (orig → edit) | Tags / table cells / headings | Status |
|---|---|---|---|---|---|
| r7 | clarity edit | 3581 → 3395 (−5.2%) | 5 → 0 | identical (148/148) / none on page (0/0) / identical | ready; one cross-resource flag, one soft doctrine flag |
| r12 | clarity edit | 2583 → 2449 (−5.2%) | 4 → 0 | identical (126/126) / none on page (0/0) / identical | ready; one cross-resource flag |
| r14 | light edit | 2628 → 2569 (−2.2%) | 6 → 1 | identical (62/62) / none on page (0/0) / identical | ready; two internal-defect flags, one typo fix |

**Conventions**
- **Word counts.** Block = all visible text in the `resource-page` div, tags stripped (title, subtitle and headings included, so the figures sit slightly below the triage register's counts). A word is any whitespace-separated token containing a letter, digit or `$`.
- **Frozen.** Tag and attribute sequence, headings, the styled subtitle line, `<strong>` run-in labels and the r12 `<em>` phrase are byte-identical. None of the three pages holds a table. Every number, date, citation (§24.1, §25.1, Article III.IV, Article VIII), named mechanism and hedge is kept.
- **Ledger quotes.** Backtick spans in the claims tables are verbatim from the edited page (tags stripped, whitespace collapsed, `&rsquo;` read as `'`), 15 words or fewer. The checker confirms each one.
- **Cross-resource clashes in scope.** None of the six named clashes (wall thickness R3/R16, kill-switch scope R3/R15, kill-switch timing R17/R18, Dyson date R4/R19, R20 founding date, mind-state sync R11/R28) makes a claim on these pages. r7 and r14 mention the kill switch only as a list item, and r12 mentions a "Dyson-class energy trajectory" with no date. r14's dates bear on the R20 ruling and are recorded under r14.
- **Approved doctrine changes.** None apply to this group. The R1 wording change and the R27/R28 LP-004.2 rewrites are on other pages, and none of these three pages mentions -3 visitors, vessel links or -3 monitoring.

---

## r7 — The Alliance Lifecycle

**Claims ledger**

| # | Claim / figure / citation / mechanism / hedge | Survives as |
|---|---|---|
| 1 | VMSS does not recruit allies | `VMSS does not recruit allies.` |
| 2 | Publishes standards and waits | `It publishes governance standards, opens the treaty table, and waits.` |
| 3 | Capability list | `revive the dead, and field autonomous militaries` |
| 4 | Terms non-negotiable at entry, irreversible after | `non-negotiable at entry and structurally irreversible after integration` |
| 5 | Structural gravity makes departure irrational | `the structural gravity that makes departure irrational` |
| 6 | Four diplomatic categories | `one of four diplomatic categories` |
| 7 | Access, not approval | `The categories rank access rather than approval` |
| 8 | Hostile triggers EFD Tier 1 | `Hostile status triggers the External Force Doctrine's Tier 1 response` |
| 9 | Stage 3 embargo | `full trade embargo at Stage 3` |
| 10 | Published off-ramps | `published off-ramps specifying the exact behavioral changes` |
| 11 | Hostile: no exports | `Hostile nations receive no VMSS exports.` |
| 12 | Hostile: no entry | `Their citizens cannot enter VMSS territory.` |
| 13 | Orbital surveillance | `monitored through orbital surveillance and classified intelligence channels` |
| 14 | Hostile status not permanent | `Hostile status lasts only as long as the behavior that triggered it.` |
| 15 | Transparency at every tier | `the External Force Doctrine requires transparency at every tier` |
| 16 | Non-allied under Tier 2 terms | `Non-allied states trade with VMSS under Tier 2 terms` |
| 17 | Restricted catalogue closed to non-allied | `no access to fabrication technology, medical systems, automation infrastructure, or advanced materials` |
| 18 | Hedge "may" (visits) | `Their citizens may visit VMSS territory through controlled border infrastructure` |
| 19 | Visitor implant protocols | `external monitoring or visitor implant protocols` |
| 20 | No stigma | `Non-allied status carries no stigma.` |
| 21 | Hedge "may" (adjacent practices) | `Adjacent nations may apply STI-like social scoring` |
| 22 | Adjacent managed bilaterally | `They are managed bilaterally, as neither enemies nor treaty allies.` |
| 23 | Allied ring counts vary | `some with four rings and others with six` |
| 24 | Allied benefit list | `Meritboard-credentialed diplomatic representation` |
| 25 | Voluntary at entry | `Alliance is voluntary at entry; after integration` |
| 26 | Founding ally, contested era | `One founding ally provided critical support during the contested era` |
| 27 | Whitepaper §25.1 | `Whitepaper §25.1 explicitly distinguishes from the broader alliance tier` |
| 28 | Four-tier framework, Whitepaper §24.1 | `four-tier escalation framework (Whitepaper §24.1)` |
| 29 | Tier 1 before military | `always deployed before any military instrument` |
| 30 | Tier 2 defensive mobilization | `Tier 2 is defensive mobilization` |
| 31 | Tier 3 authorization | `requiring Supreme Court emergency session plus presidential signature` |
| 32 | Preemption/prevention distinction | `the preemption/prevention distinction the Charter enforces` |
| 33 | Tier 4 unthrottled | `the only tier at which the full military capability engages` |
| 34 | Tier 4 = mutual defense | `Tier 4 response is the mutual defense guarantee treaty allies receive` |
| 35 | Tier 3 protects allies | `Tier 3 protects allies from imminent attack before a full-scale invasion materializes` |
| 36 | Standards published, identical | `published, non-negotiable, and identical for every applicant` |
| 37 | Catastrophic-technology rationale | `technologies that would be catastrophic in the hands of a state` |
| 38 | Four-ring minimum, uncapped maximum | `The minimum is four rings, and the maximum is uncapped.` |
| 39 | Ring count sovereign | `Ring count is sovereign.` |
| 40 | Three-ring system fails | `A three-ring system that compresses the entire punitive gradient into a single layer` |
| 41 | Kill switch a sovereign choice | `even the presence or absence of a kill switch` |
| 42 | Torture prohibition | `prohibition on torture as state policy` |
| 43 | Due process | `judicial or automated due process before punitive reassignment` |
| 44 | Article VIII | `child protection equivalent to VMSS Article VIII standing` |
| 45 | Child relocation right | `every child retains the right to relocate to the highest available layer` |
| 46 | Right of exit | `a civilian right of exit from the civilization` |
| 47 | Protections, not values | `it does not require the applicant to adopt VMSS values` |
| 48 | Reciprocal and binding | `The commitment is reciprocal and binding.` |
| 49 | Refusal forfeits standing, not as punishment | `The reason is credibility rather than punishment` |
| 50 | Unprovoked aggression unbacked | `forfeits VMSS military backing for that operation` |
| 51 | Defensive by design | `The alliance is defensive by treaty design.` |
| 52 | Telemetry sovereignty | `retaining full sovereignty over raw implant telemetry` |
| 53 | No external telemetry access | `No external actor, including VMSS, accesses an ally's implant data at the telemetry level.` |
| 54 | Implant ledger sovereign | `The implant ledger is sovereign infrastructure in every treaty nation.` |
| 55 | No political alignment required | `Treaty membership does not require political alignment, cultural conformity, economic integration` |
| 56 | Distasteful ally in good standing | `a way VMSS finds distasteful is still an ally in good standing` |
| 57 | Cohesion without uniformity | `institutional cohesion without ideological uniformity` |
| 58 | Six-ring cost profile | `six-ring systems expand the gradient with finer distinctions at higher administrative cost` |
| 59 | Neither model superior | `Neither is inherently superior` |
| 60 | Ceiling Seal | `depends on the Ceiling Seal` |
| 61 | Recovery-model argument | `demonstrated rehabilitation should have a pathway` |
| 62 | Hedge "genuinely" | `An ally whose recovery pathway genuinely works` |
| 63 | Failure pressure internal | `faces pressure from its own institutional degradation, not from VMSS` |
| 64 | Trust across civilizational time | `trusts the architecture to sort this out across civilizational time` |
| 65 | No realistic timeline | `technologies it cannot develop independently within any realistic timeline` |
| 66 | Fabrication restricted to partners | `That is why it is restricted to treaty partners` |
| 67 | Full vessel architecture non-transferable | `which is sovereign and non-transferable` |
| 68 | Orders of magnitude | `see healthcare outcomes improve by orders of magnitude` |
| 69 | Medical benefit hardest to relinquish | `it is also the hardest to relinquish` |
| 70 | Tier 4 response for allies | `An attack on the ally triggers VMSS Tier 4 response under treaty terms.` |
| 71 | Nanobot plumes | `deploys nanobot neutralization plumes does not bluff about defense commitments` |
| 72 | Third-ring mapping | `a citizen in an ally's third ring is mapped to the VMSS layer` |
| 73 | Mapping not automatic placement | `The mapping is a starting assessment, not automatic placement` |
| 74 | Brain drain as recruitment | `Brain drain is the alliance's most effective recruitment mechanism.` |
| 75 | Hedge "eventually" | `year after year eventually confront the question` |
| 76 | Adjacent unstable for three reasons | `Adjacent status is unstable for three reasons` |
| 77 | Hedge "approaches" | `approaches the elimination of permanent death` |
| 78 | Pressure not orchestrated | `VMSS does not orchestrate this pressure; the comparison generates it.` |
| 79 | Hedge "indefinitely" | `no adjacent government can indefinitely resist` |
| 80 | Compounding over decades | `at rates that compound over decades` |
| 81 | Self-reinforcing cycle | `a self-reinforcing cycle that accelerates over time` |
| 82 | No institutional buffer | `has no institutional buffer` |
| 83 | Hedge "eventually" (adjacency) | `Nations that can meet the treaty standards eventually do` |
| 84 | Timeline variance | `from decades for some to generations for others` |
| 85 | Three decades of fabrication | `operated VMSS fabrication technology for three decades` |
| 86 | Foundation analogy | `Removing the foundation does not return the building to its pre-foundation state` |
| 87 | Medical integration blocks departure | `makes departure politically impossible in any system where the population has a voice` |
| 88 | Surgical mortality | `near-zero surgical mortality and comprehensive disease elimination` |
| 89 | Hedge "most nations" | `as most nations do` |
| 90 | Tier 1 → Tier 2 demotion | `A departing ally drops from Tier 1 to Tier 2` |
| 91 | Demotion not punitive | `The demotion is structural rather than punitive` |
| 92 | Not coercion | `Coercion requires the threat of harm imposed from outside` |
| 93 | Infrastructure does the work | `the ally's own infrastructure does the work` |
| 94 | No envoys, no bonuses | `It sends no envoys to pitch the alliance` |
| 95 | Demonstration over persuasion | `demonstration rather than persuasion` |
| 96 | Waiting-room leverage | `The leverage lies in that hospital waiting room, not in any argument for alliance.` |
| 97 | Immigration from every nation | `attract immigration from every nation on Earth` |
| 98 | Murder temporary | `A civilization where murder is temporary` |
| 99 | Hedge "within institutional reach" | `disease is eliminated within institutional reach` |
| 100 | VMSS does not force the choice | `VMSS does not force the choice.` |
| 101 | §24.1 position | `The External Force Doctrine (§24.1) states the doctrine's position` |
| 102 | Tier 1 preference | `The civilization prefers that every international relationship resolve at Tier 1` |
| 103 | Upper tiers' reason | `not every nation responds to structural incentive` |
| 104 | Imperialism error | `has confused structural gravity with coercive force` |
| 105 | No invasion for declining | `No nation is invaded for declining` |
| 106 | Opposite error | `The student who concludes that alliance is purely voluntary has made the opposite error.` |
| 107 | Leave technically, not practically | `a nation can technically leave but practically cannot` |
| 108 | Self-sufficient, dominant, magnetic | `materially self-sufficient, militarily dominant, and demographically magnetic` |
| 109 | Structural DNA | `now shares VMSS's structural DNA` |
| 110 | Model expands, not territory | `The alliance expands the governance model, not VMSS territory` |
| 111 | Deepest product | `is the alliance lifecycle's deepest product` |

**Word counts:** 3581 → 3395 (−5.2%). Em-dashes per paragraph: max 5 → 0 (the frozen subtitle keeps its dash).

**Flags**
1. **Cross-resource, not changed (r7 vs r12).** r7 says hostile nations "receive no VMSS exports" and places the full embargo at Stage 3 of the hostile response. r12 describes graduated Stages 1–2 in which some goods, and in Stage 2 humanitarian goods, still flow, and reserves Stage 3 for nations "that have crossed into Tier 2 (active hostility)". r7 defines Tier 2 as "defensive mobilization". The two pages use Tier 2 differently. Jason to rule.
2. **Soft doctrine note, not changed.** `A civilization where murder is temporary` is a general statement. Death in −3 is final (LP-004.2), so the sentence holds only outside −3. It is left as written because it is a civilization-level generalization.
3. **Sentences removed as restatements (no claim lost).** "The treaty governs architecture, not ideology." (restates the sovereignty-costs paragraph); "The alliance lifecycle is not just a technology-transfer story…" (restates the tier mapping just given); "The voluntariness is genuine at the point of decision. The irreversibility is genuine after the point of integration." and "Both truths coexist." (restate the preceding sentence); "The distinction is load-bearing." became "the difference matters"; "and the student who names it has seen what the treaty table was built to produce" became "it is what the treaty table was built to produce".
4. **Stock phrases replaced.** "makes alliance load-bearing" became "ties an ally's institutions to VMSS". "It becomes load-bearing after integration" became "after integration, the ally's institutions come to rest on it". "the Ceiling Seal is load-bearing for the civilization's consequence architecture" became "the civilization's consequence architecture depends on the Ceiling Seal". "hemorrhage" became "lose". The concept term "structural gravity" is kept because the page's section heading ("The Gravity Problem") names it.
5. **No approved doctrine change applies.**
6. **Verifier revisions (second pass).** (a) Gravity Problem, factories paragraph: the first edit turned the original's denial of client-patron dependence into a comparison of degree. It now reads "Its productive economy is not tied to VMSS the way a client state is tied to a patron. It rests on VMSS technology the way a building rests on its foundation." The denial is the premise of the later "This is not coercion" argument, so the reversal is kept here. (b) Leverage section: three edits had softened an absolute into a comparative. The lead-in again reads "structural rather than rhetorical:". The waiting-room line is now `The leverage lies in that hospital waiting room, not in any argument for alliance.` The outcomes paragraph now reads "lies not in what it says at the negotiating table but in what it is:". Each keeps the original's claim that rhetoric is not a source of leverage, as one sentence rather than the original two-sentence reversal. (c) Student's Error, final paragraph: "That voluntary, structural and irreversible convergence is…" replaces the comma-bracketed version, which read like a four-item list.

---

## r12 — International Trade

**Claims ledger**

| # | Claim / figure / citation / mechanism / hedge | Survives as |
|---|---|---|
| 1 | Currency inconvertible externally | `VMSS currency is inconvertible externally, and none of it circulates` |
| 2 | Goods-for-goods, oldest commerce | `the oldest form of commerce, applied at civilizational scale` |
| 3 | 90%+ automated capacity | `automated production at 90%+ capacity` |
| 4 | Dyson-class trajectory | `a Dyson-class energy trajectory` |
| 5 | Orbital extraction | `or from orbital extraction operations` |
| 6 | Self-sufficiency unmatched on Earth | `materially self-sufficient in a way no Earth nation has ever been` |
| 7 | Three strategic, non-economic reasons | `VMSS trades for three strategic reasons, none of them economic` |
| 8 | Primary non-military instrument | `the civilization's primary non-military instrument of international influence` |
| 9 | Dependency not coercive | `The dependency is not coercive` |
| 10 | Hedge "easily" | `a relationship the recipient cannot easily exit` |
| 11 | Tier 1, §24.1 | `Trade access is Tier 1 of the External Force Doctrine (§24.1)` |
| 12 | Most powerful non-military sanction | `the most powerful sanction the civilization can impose without deploying military capability` |
| 13 | Imports raw intelligence | `VMSS exports technology and imports raw intelligence` |
| 14 | Meritboard intelligence analysis | `the Meritboard's intelligence analysis can read that shift from the trade data alone` |
| 15 | Charter Article III.IV | `currency siloing architecture (Charter Article III.IV) extended to international boundaries` |
| 16 | Not a trade restriction | `rather than a trade restriction` |
| 17 | Three effects | `The currency wall produces three effects` |
| 18 | Dollar-reserve dependency | `financially dependent on US monetary policy` |
| 19 | No monetary imperialism | `cannot be accused of monetary imperialism` |
| 20 | Arbitrage eliminated | `The currency wall eliminates this category of financial activity` |
| 21 | Only physical goods cross | `Every unit of value that crosses the border is a physical good` |
| 22 | Sanctions on goods pipeline | `the sanctions operate on the goods pipeline directly` |
| 23 | Shell-corporation route closed | `through a shell corporation holding VMSS currency` |
| 24 | Sanctions enforceability | `enforceable at a level Earth sanctions have never achieved` |
| 25 | Two tiers published | `The distinction is published and non-negotiable` |
| 26 | Restricted "at any price" | `non-allied states cannot obtain at any price` |
| 27 | Molecular fidelity | `the manufacturing systems that produce goods at molecular fidelity` |
| 28 | Capability transfer deliberate | `This is deliberate, because the alliance is stronger` |
| 29 | Fabrication most significant | `the most strategically significant export because it transfers productive capability` |
| 30 | Full vessel architecture non-transferable | `which is sovereign and non-transferable` |
| 31 | Outcomes improve dramatically | `see healthcare outcomes improve dramatically` |
| 32 | UBI or equivalent | `the economic base for implementing UBI or equivalent social floor programs` |
| 33 | Automation most transformative | `The automation export is the most transformative trade item` |
| 34 | Advanced materials exceed domestic | `These materials exceed anything the ally can manufacture domestically` |
| 35 | Bilateral under Federation Treaty | `The terms are negotiated bilaterally under the Federation Treaty framework.` |
| 36 | Exchange-rate anchor | `anchored to the goods' assessed value to each party` |
| 37 | Rare-earth example | `A nation with abundant rare earth minerals trades raw feedstock for fabrication technology.` |
| 38 | Tier 2: non-restricted only | `with access to non-restricted exports only` |
| 39 | Commodity exports | `trades commodity exports (agricultural products, minerals, manufactured goods)` |
| 40 | Non-strategic list | `such as communications equipment, entertainment technology` |
| 41 | Restriction not punitive | `is structural and carries no punitive intent` |
| 42 | Unauditable manufacturing base | `a manufacturing base the civilization cannot audit and does not control` |
| 43 | Dual-use | `The same fabrication technology that builds medical systems can build weapons` |
| 44 | Verified through admission | `verified through the treaty admission process` |
| 45 | Sanctions primary Tier 1 instrument | `Economic sanctions are the primary instrument of Tier 1` |
| 46 | Friction threshold | `crosses the diplomatic friction threshold` |
| 47 | Economic before military | `deploys economic pressure before military capability` |
| 48 | Graduated, not binary | `Sanctions are graduated across the non-restricted export catalogue rather than binary` |
| 49 | Stage 1 | `Stage 1: restriction on specific non-strategic exports.` |
| 50 | Minimum collateral impact | `minimum collateral impact on its civilian population` |
| 51 | Stage 2 humanitarian exception | `Only humanitarian goods (food, basic medical supplies) continue flowing.` |
| 52 | Stage 3 reserved for Tier 2 | `reserved for nations that have crossed into Tier 2 (active hostility)` |
| 53 | Allies expected to align | `treaty allies are expected to align their own trade relationships` |
| 54 | No direct penalty | `faces no direct penalty from VMSS` |
| 55 | Hedge "may" | `may affect future treaty negotiations` |
| 56 | Published off-ramp | `Every sanctions deployment includes a published off-ramp` |
| 57 | Conditions calibrated | `The conditions are calibrated to the behavior that triggered the sanctions.` |
| 58 | 1,000 tons of copper | `trades 1,000 tons of copper for VMSS consumer electronics` |
| 59 | Hedge "effectively" | `has effectively priced those electronics in copper` |
| 60 | No margins, no labor costs | `with no need for profit margins, no labor costs` |
| 61 | Structural, not hostile | `The competitive pressure is structural rather than hostile.` |
| 62 | Not trying to destroy | `VMSS is not trying to destroy Earth manufacturing.` |
| 63 | Scarcity constraints transcended | `scarcity constraints VMSS has transcended` |
| 64 | Commodity hierarchy reshaped | `VMSS's trade preferences reshape the global commodity hierarchy` |
| 65 | Terms bilateral and published | `the trade terms are bilateral and published` |
| 66 | Autarky choice | `pursue autarky (economic self-sufficiency) and accept the quality gap` |
| 67 | Obsolescence | `the autarky path produces obsolescence` |
| 68 | Third option incentivized | `is the one VMSS's trade architecture is designed to incentivize` |
| 69 | No forced joining | `The civilization does not force nations to join the alliance.` |
| 70 | Alternative less attractive | `It makes the alternative progressively less attractive.` |
| 71 | Total self-sufficiency | `a position of total material self-sufficiency` |
| 72 | Containment through integration | `The strategic logic is containment through integration.` |
| 73 | Isolation breeds fear | `fear, resentment, and strategic desperation in non-allied states` |
| 74 | 80% disease drop | `watches its disease burden drop by 80%` |
| 75 | Culture import | `the one category fabrication cannot produce: culture` |
| 76 | Imports authenticity | `VMSS imports authenticity` |
| 77 | ImmersionTube | `ImmersionTube content captured in foreign environments` |
| 78 | Technology for culture | `the goods-for-goods exchange is technology for culture` |
| 79 | Alliance the rational choice | `make the alliance the rational economic choice` |
| 80 | Permanent gaps | `a permanent quality gap, a permanent technology gap` |
| 81 | Gap compounds | `The gap compounds every year` |
| 82 | Economic gravity | `The long-horizon outcome is economic gravity rather than military conquest` |
| 83 | Voluntary alignment | `the gradual, voluntary alignment of the global economy around the alliance network` |
| 84 | Benevolent misreading | `has read the goods correctly and the strategy incorrectly` |
| 85 | Not an empire | `is not an empire in any meaningful sense` |
| 86 | Irresistible, not compulsory | `designed to make the alliance irresistible without making it compulsory` |

**Word counts:** 2583 → 2449 (−5.2%). Em-dashes per paragraph: max 4 → 0 (the frozen subtitle keeps its dash).

**Flags**
1. **Cross-resource, not changed (r12 vs r7).** See r7 flag 1: here Stage 3 is "reserved for nations that have crossed into Tier 2 (active hostility)", while r7 defines EFD Tier 2 as defensive mobilization and says hostile nations receive no exports at all. The text is unchanged. Jason to rule.
2. **Sentences removed as restatements or aphorism closers (no claim lost).** "The trade relationship is a sensor as much as an exchange." "The currency stays inside the walls." "Neither option is comfortable." "The trade is what it appears to be…" was folded into the preceding sentence. "The trade restrictions on non-allied nations and the trade access for allied nations create a structural incentive to meet the treaty admission standards." was cut because the preceding sentence ("designed to incentivize") already states it; Jason may reinstate it. The closing triple verdict keeps both misreadings, and its third limb now reads "The accurate reading is that…" in place of "The student who recognizes… has understood the strategic logic at the level the resource was written to convey."
3. **Antecedent made explicit.** "which is why trade access is the most powerful sanction" became "which is why withdrawing trade access is the most powerful sanction". The original's sanction is the loss of access, so the meaning is unchanged.
4. **Dyson note.** "Dyson-class energy trajectory" gives no date, so it takes no side in the R4/R19 Dyson-date clash.
5. **No approved doctrine change applies.**

---

## r14 — The Territory

**Claims ledger**

| # | Claim / figure / citation / mechanism / hedge | Survives as |
|---|---|---|
| 1 | Continent-scale need | `VMSS needed continent-scale territory to exist.` |
| 2 | Founding Treaty date | `the Founding Treaty of March 29, 2026 was constructed` |
| 3 | Relocation framework + contractor exception | `a voluntary-relocation framework with a skilled-contractor exception` |
| 4 | Acquisition determines moral defensibility | `determines how morally defensible the founding is` |
| 5 | Five rings, billions | `five concentric rings with populations scaling to billions` |
| 6 | Hedge "roughly", 4–5M km² | `roughly four to five million square kilometers` |
| 7 | Secession examples | `(Sudan, Czechoslovakia, the Soviet successor states)` |
| 8 | Post-war examples | `(Israel, the Balkan states)` |
| 9 | Not a declining empire's remnant | `was not being carved out of a declining empire` |
| 10 | Newly conceived entity | `It was a newly conceived sovereign entity` |
| 11 | Chen's eighteen-month evaluation | `The Chief Architect, Daniel Chen, had conducted an eighteen-month evaluation` |
| 12 | Alaska | `the cession of even Alaska faced insurmountable constitutional and political resistance` |
| 13 | Siberia | `Russian Siberia met the geographic requirements` |
| 14 | Greenland 80% | `Greenland was 80% ice sheet` |
| 15 | Antarctic Treaty System | `Antarctica was locked by the Antarctic Treaty System.` |
| 16 | Canada the only option | `That left Canada, the only country on Earth` |
| 17 | Four structural features | `Canada presented four structural features that no other candidate combined.` |
| 18 | Ten million km² | `nearly ten million square kilometers` |
| 19 | 150 km | `concentrated within 150 kilometers of the United States border` |
| 20 | Density; hedge "effectively" | `effectively empty at population densities under one person per hundred square kilometers` |
| 21 | Constitutional channels | `negotiate a permanent cession through constitutional channels` |
| 22 | US bilateral guarantor track | `VMSS's founding military guarantor through a separate bilateral track` |
| 23 | NORAD | `a continental security framework (NORAD)` |
| 24 | Hedge "considerably" | `considerably lighter than the acquisition would have been` |
| 25 | Economics decisive | `The economic case was the decisive factor.` |
| 26 | $5–10T cession; hedge "on the order of" | `on the order of five to ten trillion US dollars` |
| 27 | $10–30T contracts | `plus ten to thirty trillion US dollars in construction contracts` |
| 28 | 300–500% GDP | `a three-to-five-hundred-percent permanent increase in Canadian GDP` |
| 29 | Founding partner | `the infrastructure-adjacent founding partner of the most consequential civilization in history` |
| 30 | Rational, not sacrificial | `it made the cession rational rather than sacrificial` |
| 31 | Ottawa signing | `signed in Ottawa on March 29, 2026, by Daniel Chen` |
| 32 | Thirty-one months | `took an additional thirty-one months to complete` |
| 33 | Operational late 2028 | `did not become operational until late 2028` |
| 34 | Presence early 2029 | `did not begin until early 2029` |
| 35 | Ceded territories | `the full extent of Nunavut, the Northwest Territories, and Yukon` |
| 36 | Sixtieth parallel | `approximated but did not exactly match the sixtieth parallel` |
| 37 | Hudson Bay excluded | `Hudson Bay was excluded from VMSS territory and remained Canadian` |
| 38 | Half the landmass | `half of Canada's pre-cession landmass` |
| 39 | <2% population | `less than two percent of Canada's pre-cession population` |
| 40 | >90% reserves | `over ninety percent of Canada's pre-cession untapped resource reserves` |
| 41 | Three compensation phases | `The compensation structure operated in three phases.` |
| 42 | Thirty-month window | `across the thirty-month constitutional amendment window` |
| 43 | Inverted structure | `inverting the typical conquest-then-compensation structure` |
| 44 | Fifty years of contracts | `across the first fifty years of the founding era` |
| 45 | Tier 1 trade preference | `under the Federation Treaty's Tier 1 access architecture` |
| 46 | Guarantor not ceremonial | `with obligations that went beyond ceremony` |
| 47 | Russia and China protest | `Russia and China both protested the cession at the United Nations` |
| 48 | Hedge "in part" | `Neither attempted kinetic action, in part because` |
| 49 | 130,000 people | `Approximately one hundred and thirty thousand people lived within its boundaries` |
| 50 | Communities named | `Inuit, Dene, Métis, and First Nations communities` |
| 51 | Canadian Charter | `the Canadian Charter of Rights and Freedoms` |
| 52 | Displacement impermissible | `made any displacement against community will categorically impermissible` |
| 53 | Materially better off | `leave every affected individual materially better off` |
| 54 | Median-income-for-life | `scaled to produce median-income-for-life from passive investment returns alone` |
| 55 | Joint transit corridors | `designated transit corridors administered jointly by VMSS and the Canadian federal government` |
| 56 | Ten-year contracts | `were offered ten-year renewable contracts with dual-citizenship status` |
| 57 | Elective residency | `transition to elective residency within VMSS` |
| 58 | Both pathways offered | `every individual in the affected territory was offered both pathways` |
| 59 | 2031 data | `published jointly by VMSS and the Canadian federal government in 2031` |
| 60 | ~70% relocation | `approximately seventy percent of the affected population accepted the relocation package` |
| 61 | ~22% contractor | `approximately twenty-two percent accepted ten-year skilled-contractor positions` |
| 62 | ~6% declined | `approximately six percent declined all options` |
| 63 | Five-year delay | `up to five additional years` |
| 64 | ~2% combination | `approximately two percent exercised a combination pathway` |
| 65 | Not perfect | `The framework was not perfect and produced documented friction` |
| 66 | Negotiation, not displacement | `friction produced negotiation rather than displacement` |
| 67 | Great Slave Lake centre | `Great Slave Lake in the Northwest Territories serving as the conceptual center` |
| 68 | Canadian Shield | `the geological stability of the Canadian Shield bedrock` |
| 69 | +1 Sanctuary innermost | `+1 Sanctuary occupied the innermost ring` |
| 70 | Main Layer (0) | `Main Layer (0) occupied the bulk of the habitable ceded territory` |
| 71 | Microclimate over decades | `mega-wall microclimate effects that would develop over decades` |
| 72 | −3 outermost | `with -3 Terminal occupying the outermost ring` |
| 73 | Three natural sides | `anchored by natural geography on three sides` |
| 74 | Southern boundary built | `required pure construction across relatively flat land` |
| 75 | Canada retains ~5M km² | `Canada retained approximately five million square kilometers of pre-cession territory` |
| 76 | Hedge "partially" (Arctic waters) | `The Arctic Ocean became partially VMSS territorial water` |
| 77 | Perimeter >1,000 km | `northward by more than a thousand kilometers` |
| 78 | Hedge "some critics" | `as some critics had predicted during the constitutional amendment debates` |
| 79 | Gateway provinces; hedge "notably" | `notably British Columbia, Alberta, Saskatchewan, Manitoba, Ontario, and Quebec` |
| 80 | Gateway cities | `Vancouver, Calgary, Winnipeg, Toronto, and Montreal experienced unprecedented economic expansion` |
| 81 | Land not empty | `The land was not empty.` |
| 82 | Millennia of continuity | `cultural continuity extending across thousands of years` |
| 83 | Greater dignity | `address every affected party with greater dignity` |
| 84 | First moral test | `the first moral test of the VMSS project` |
| 85 | Hedge "Most" | `Most have done so through conquest, displacement, or legal fictions` |
| 86 | Documented consent | `documented voluntary consent from every affected party` |
| 87 | Hedge "necessarily" | `the resistance that any such acquisition necessarily provokes` |
| 88 | Morally clean, and why | `The founding was morally clean because Chen and the founding team understood` |
| 89 | Proof of concept | `The Canadian cession was the proof-of-concept` |
| 90 | Four Founding Lines | `the Federation Treaty, the Four Founding Lines` |
| 91 | Formal agreement | `the ground's prior inhabitants had formally agreed to` |
| 92 | Comparable civilizations failed | `comparable civilizations attempted in less morally careful founding eras all failed` |

**Word counts:** 2628 → 2569 (−2.2%, light edit). Em-dashes per paragraph: max 6 → 1. Dash clusters in seven paragraphs (Why Canada ¶1 and ¶2, the compensation paragraph, the term-contract paragraph, Ring Architecture ¶3, Geography ¶2, Student's Error ¶2) became parentheses, commas or colons. The ceded-territory paragraph went from 2 to 1.

**Lines edited (light mode):** the intro closer ("The territory is the ground under everything else VMSS became."); the anaphoric "It was not… It was not… It was not…" run; the circular "Canada was the only remaining option, and the evaluation concluded that Canada was the only remaining option" sentence; "Canada would not merely be compensated…"; "Its role was not ceremonial."; "…was not a replacement for the relocation option."; "The choice of center was not arbitrary."; the Student's Error reversals ("The founding did not succeed because the land was a vacuum…", "The deeper observation belongs to the student who…", "morally clean not because… but because…"), and "The student who understands this has understood…" framing. Everything else is as written.

**Flags**
1. **Internal defect, not changed.** The amendment period is "an additional thirty-one months" in the Founding Treaty paragraph but "the thirty-month constitutional amendment window" in the compensation paragraph. Jason to rule.
2. **Internal tension, not changed.** The Student's Error claims `documented voluntary consent from every affected party` and says the ground's prior inhabitants "had formally agreed to" the mechanism. The uptake data says about six percent "declined all options" and were accommodated through delayed relocation. Whether declining and then choosing within five years counts as consent is for Jason.
3. **R20 founding-date clash, recorded, not changed.** This page dates the founding signature to March 29, 2026, with the cession operational in late 2028 and institutional presence from early 2029. That supports R20's "signed in 2026" reading, and "2030s" could describe the build-out period rather than the founding. It is recorded here for the R20 ruling.
4. **Typo fixed.** "centerd" became "centered" (+1 Sanctuary paragraph). This is a one-letter spelling fix, not a habit edit, and Jason may revert it.
5. **Blanket claim kept.** "comparable civilizations attempted in less morally careful founding eras all failed" is a world-history claim, so it is kept as written. Only the "The student who understands this has understood…" framing around it changed.
6. **Kill switch.** It appears only as an item in the "Everything VMSS did afterward" list. The page takes no side in the R3/R15 scope or R17/R18 timing clashes.
7. **No approved doctrine change applies.**
