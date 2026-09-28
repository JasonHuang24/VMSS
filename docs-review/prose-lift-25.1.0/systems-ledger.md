# Prose lift 25.1.0 ledger (systems.html)

Mode: clarity. Only the text inside running-prose `<p>` and `<li>` elements of the copy at `docs-review/prose-lift-25.1.0/systems.html` was edited (the page has no `<blockquote>` or `<td>`; its one `<ol>` is `<li>` items). Left byte-identical: `<head>` and all meta text, every heading (h1-h4), the filter chips, the ToC, the "Showing all 6 domains" count line, both script blocks and the style block, every `<strong>` run-in label, the hero subtitle, the flow-diagram captions (Governance Flow, Economic Flow, Enforcement Flow), the LP-074 tax-frame paragraph, the UBI and tax-rate lists, the italic "The system measures — and acts." line, and the closing cross-link block (it sits in a `<div>`, not a prose element). The page carries no JSON-LD.

Quotes are verbatim from the edited copy's visible text (entities decoded, inline tags stripped), each 15 words or fewer, inside « ». `systems-verify.mjs systems.html` checks every quote against the copy. Original wording, where it matters, is in single quotes.

## systems.html

### Word counts

- All 127 prose elements (`<p>`, `<li>`): 5,608 → 5,453 words (-2.8%). 59 changed; 68 unchanged. (Revision 1 added 5 words: 2 for the overtime-premium split, 3 for restoring "with that knowledge".)
- The cut is below the 5-15% aim (see Flag 5). No element is longer than its original.
- No changed element has more than one em-dash. Number tokens in the prose are identical as a multiset, including every "-1", "-2", "-3" layer reference and every "(0)".
- No new Tailwind-utility tokens.

### Claims ledger

**Intro**
- «VMSS runs on more than ideology» (was 'is not sustained by ideology alone')
- «a constitutional charter, AI-assisted policy design, automated enforcement»
- «abundance, consequence and long-term civilizational stability»
- «how does this civilization actually function?»

**Governance**
- «a foundational charter developed with AI-assisted modeling and simulation-based policy validation»
- «The Chief Architect established the original framework»
- «amendments now route through the full Article XI gauntlet»
- «Meritboard review, Supreme Court review, population ratification and presidential veto»
- «when simulation and real-world performance demonstrate an improvement»
- «moral causality, pre-intervention in Sanctuary, post-intervention in Main, continuity not innocence»
- «is load-bearing rather than cemented»
- «No textual rule forbids reaching it»
- «the populations qualified to ratify it qualified precisely because they live under the core»
- «Leadership is performance-based.» ; «replace an incumbent by outperforming them on the relevant criteria»
- «violation results in immediate loss of position» (paragraph's one em-dash kept)
- «demonstrated capability, not election»

**Governance Principles**
- «policies are tested through simulation before adoption»; «the charter can evolve, but not casually»
- «protected by structural difficulty, not by any retained founder veto»
- «capability outranks popularity»; «leadership must continuously justify itself through competence»
- «protected by structural difficulty, not textual prohibition»; «only by a civilization that has already drifted past them»
- «citizens surface regulatory gaps through petition (1% of layer population)»
- «domain-expert panels draft the regulation»; «direct population ratification at 80% supermajority enacts it»
- «with no legislators, representatives or campaigns» (was 'No legislators, no representatives, no campaigns.')
- «jurisdictional units of one million residents»; «the AI governance system redraws annually»
- «charter → federal law → layer-wide regulation → district regulation»; «each subordinate to the one above»
- «The law in force at every tier is consolidated in VMSS Laws»
- «In -3 Terminal, enacted regulations are advisory only»; «Full mechanism in Article XXVIII»
- «AI governance operates as environmental physics, not institutional judgment»
- «consequence follows the act the way gravity follows a jump»
- «an outcome of what you did rather than a decision made about you»
- «No tribunal weighs your case and no appeals process disputes the fall»
- «Wrongful conviction is not a category»; «cannot be wrong about what occurred»
- «Contestation under STI Sections 5.7 and 5.8 adjusts how the record is contextualized»
- Cut as restatement: 'The system does not guess — it knows.' (carried by «cannot be wrong about what occurred») and 'The event happened. The consequence is physics.' (carried by «operates as environmental physics»).

**Economy**
- «a deliberate set of layer-proportional economic mechanisms» (was 'carefully designed')
- «Universal Basic Income is the civilizational dividend of an automated economy»
- «labor is no longer the primary driver of survival, not charity»
- «What you do with your time above survival is entirely yours»

**UBI by Layer**
- «UBI scales proportionally with the institutional benefits each layer receives»
- «Citizens in fully served layers receive the full baseline»
- «receive a baseline reduced to match»
- «without removing dignity from any resident»
- List (unchanged): «$10,000/month — full institutional coverage»; «$5,000/month — partial institutional presence»; «$2,500/month — reduced institutional presence»; «$1,250/month — no institutional intervention, minimal services»
- «UBI disburses at the habitual-residence layer's rate (LP-081)»; «No layer permits starvation»; «All figures indexed to 2025 Earth values»

**Primary Job Subsidy**
- «The Primary Job Subsidy matches UBI at each layer level»
- «one qualifying job of 20 or more hours per week»
- «Its primary purpose is time rather than income» (was 'is not income. It is time.')
- «twenty qualifying hours unlock the full subsidy»
- «collects $10,000 in subsidy on top of their $10,000 UBI»
- «keeps significant weekly hours for creative work»
- «There is no minimum wage in VMSS»; «employers set market wages freely for the qualifying 20 hours»
- «employers could demand 40, 60, or 80-hour weeks at any market wage»
- «effectively nullifying the time dividend»
- «The Overtime Premium Protocol closes that gap»
- «For every qualifying hour worked beyond 20 per week»
- «the layer's primary subsidy rate indexed by the hour»
- «out of pocket rather than from government funds» (was 'out of pocket, not government-funded')
- «$125/hr in Main Layer and Sanctuary, $62.50/hr in -1»; «$31.25/hr in -2 and $15.63/hr in -3»
- «requesting 30 qualifying hours owes $1,250 in overtime premium»
- «Workers benefit from the premium and employers bear the cost»
- «a real cost-benefit threshold before requesting extra hours»
- «This is a considerably stronger check than real-world time-and-a-half regimes»; «apply only above a minimum wage floor» (split into its own sentence in revision 1)
- «Employers are free to pay the premium» (was 'The civilization has no objection to employers paying it')
- «they simply have to justify each hour beyond the time dividend»
- «Qualifying work is defined by contribution to critical infrastructure»; «Non-qualifying work is not stigmatized»
- «has no need of the subsidy and was never the intended recipient»
- «legal, market-rewarded, subsidy does not apply, fully permitted»
- «Upper layers apply stricter definitions»

**Tiered Taxation**
- «follows a deliberate sociopolitical gradient»
- «operate as highly socialized post-scarcity environments»
- «heavy progressive taxation funds the full institutional apparatus»
- «The middle layers (-1 and -2) are hybrid economies»
- «The terminal layer (-3) is a capitalist frontier economy»
- «By design, each layer's economic character matches its demographic and institutional reality» (was 'intentional design, not incidental')
- Tax frame (unchanged): «a federal-tier schedule under LP-074, not Charter text»; «the 2294 Path 2 audit certified both LP-074 schedules»; «50 / 25 / 12.5 / 6.25 exact halving cascade is operative from 2295»
- Rate list (unchanged): «50% top marginal rate on earned income exceeding $10 million annually»; «25% top marginal rate»; «12.5% top marginal rate»; «6.25% top marginal rate»
- «untaxed in every layer, unconditionally and without exception»
- «because they are civilizational dividends rather than income»
- «capital gains, business revenue, private enterprise profits and high-income employment»
- «funds enumerated public obligations»
- «the separate instrument against idle wealth concentration»
- «does not cross-credit the tax stream, replace an adequacy test, or permit hoarding»
- Cut as restatement: 'Two instruments, two functions.' (carried by «the separate instrument»).
- Unchanged: «The 50% upper-bracket rate increases first-pass private allocation»; «the 6.25% top rate combines with low regulatory overhead»

**Currency Siloing**
- «+1 Sanctuary and Main Layer share a common currency»; «Upward conversion is prohibited without exception»
- «permitted only through authorized downward channels»
- «inconvertible externally and does not circulate outside the civilization's borders»
- «international trade is goods-based»
- «The siloing is deliberate.» (was 'This is intentional architecture.')
- «open conversion would enable arbitrage that destabilizes those funding mechanisms»
- «the downward transfer retention schedule (1-10%)»
- «-1 at approximately 1.3–1.8x, -2 at approximately 1.8–2.5x»; «-3 at approximately 2.5–4x»
- «arrives economically neutral and must earn local currency through work»

**Central Banking Authority**
- «the sole issuing authority for all layer currencies»
- «controls monetary supply across the four siloed economies»
- «executes settlement when citizens cross layer boundaries»
- «retires the origin currency and issues destination-layer currency»
- «no private institution or market mechanism handles cross-layer monetary exchange»
- «the only genuinely new institution VMSS introduces with no direct Earth analog»
- «four non-convertible currencies within one civilization»

**Asset Treatment**
- «Involuntary descent triggers full asset liquidation at market value»
- «100% of proceeds transfer to the Automation Dividend Treasury»
- «citizens retain between 1% and 10% of liquidated assets depending on net worth»
- «keeps the choice viable while capturing value for the treasury»
- «Elective residency and downward visitation trigger no liquidation»
- «Full schedule at federal tier under LP-076»; «Article III.V retains the principle and reaches no band»

**Savings Circulation Mandate**
- «scaled to the institutional presence VMSS maintains in each»
- «VMSS-distributed funds from being hoarded indefinitely in lower layers»
- «use the registered home address on each citizen's implant ledger»
- «physical location at any given time does not affect layer assignment»
- «Activation uses a 90-day rolling average of total district savings»
- «so coordinated capital movement cannot game activation timing»
- «reaches $100 billion, a district-wide 10% monthly garnishing activates uniformly»
- «with no floor and no exemptions»; «There is no personal threshold»
- «a citizen holding $10,000 is garnished in the same cycle as one holding $10 million»
- «at $10,000/month UBI, equilibrium stabilizes naturally»
- «Whales holding millions lose hundreds of thousands monthly»
- «Stock speculation is excluded as a complementary loophole closure»
- «evaluated independently per Main Layer district»; «without cross-layer aggregation»
- «At $5,000/month UBI, equilibrium scales accordingly» (-1 paragraph unchanged)
- «VMSS does not reach into private economic gains in lower layers»
- «savings attributable to VMSS-distributed funds (UBI and Primary Job Subsidy)»
- «$25 billion district aggregate in -2, $10 billion district aggregate in -3»
- «Attribution uses a 24-month rolling pro-rata window»
- «at or below 24 months of UBI receipts, the full balance is subject» (was 'less than or equal to')
- «only the UBI-equivalent portion is»
- «many -2 and -3 residents will have removed or disabled their implants»
- «a private bank statement suffices to calculate the obligation»
- «Each citizen's obligation locks at the pulse»
- «with in-month deposits routed to the next window»
- «return to the Automation Dividend Treasury and redistribute as UBI»
- «Every cycle is self-terminating and deactivates when the relevant aggregate drops below threshold»

**Terminal Realm Economic Autonomy**
- «operates outside ordinary VMSS economic oversight»
- «no VMSS-administered oversight of private economic activity»
- «UBI-origin savings at the $10 billion district aggregate trigger»
- «partitioned from the Meritboard's economics division»
- «the economic environment is organic»
- «private banking, private lending, private contract enforcement»
- «the Freedom Layer in the fullest economic sense»
- «terminal realm wealth cannot be converted upward»
- «the wall between them is economic as much as physical»

**Economic Principles**
- «The dividend is civilizational, not earned through hardship»
- «20 qualifying hours buys the rest of the week»; «the subsidy achieves that without coercion»
- «Wealth cannot be arbitraged across layer boundaries in either direction»
- «+1 and Main: 10% monthly at $100 billion district aggregate»; «-1: 5% monthly at $50 billion district aggregate»
- «at $25 billion and $10 billion district aggregate respectively»
- «would become garnishing loopholes» (was 'would function as')
- «without VMSS circulation oversight»
- «money laundering and tax evasion are treated as system sabotage»
- «one primary and one vacation residence per citizen in +1 Sanctuary»; «vacant additional residences attribute in full (LP-069)»
- «The baseline removes desperation but not drive.»

**Population Sustainability**
- «Article XXVII of the Charter establishes a compounding replenishment tax»; «a federal-tier rate under LP-064, not Charter text»
- «without criminalizing reproduction itself»
- «2.5 children per family»; «The third child triggers the replenishment tax»
- «a 50% compounding escalation per child beyond the second»
- «earned income, UBI and Primary Job Subsidy combined»
- «A baseline 40% aggregate effective rate rises to 60% at the third child»
- «90% at the fourth, and 135% at the fifth — mathematically unsurvivable»
- «maintains institutional economic presence: +1 Sanctuary, Main Layer, and -1 Noncompliance»
- «No reproductive tax penalty is imposed in -2 or -3»
- «the layer of the household's habitual residence at the child's birth (LP-081)»
- «at 135%, the scheduled liability exceeds total parental inflow»
- «dividend-living households face the same arithmetic as market earners»
- «The household's descent is arithmetic rather than punitive» (was 'doesn't descend by punishment — it descends by arithmetic')
- «-1 reassignment for both parents without a repayment window»
- «the tax burden falls on the parents, never the children»
- «vesting at 18, so reproduction adds no parent-capturable income»
- Cut as restatement: 'The system penalises the reproductive decision, not the people produced by it.' (carried by «falls on the parents, never the children»).
- «cannot permit unlimited population growth without degrading those guarantees»
- «The tax makes the trade-off legible and self-enforcing»; «Full mechanism in Article XXVII»

**Energy Infrastructure**
- «The VMSS electrical grid runs on renewable energy»
- «orbital and terrestrial solar arrays supplying the majority of total grid input»
- «expand beyond planetary renewables into Dyson-class energy systems»
- «civilizational energy abundance rather than permanent scarcity»

**Rights, Transparency, and Citizenship**
- «Government may not overreach the rights established in the charter»
- «Public-benefit information is transparent by default»
- «military operational specifics and, beyond that, the exploit surface, never the rule»
- «their own score and placement, and the basis of every institutional decision»
- «Anyone may join VMSS; there is no population cap»
- «The main gatekeeping mechanism is behavioral sorting rather than membership scarcity»
- «according to their existing criminal history and demonstrated risk level»
- «voluntary in the narrow technical sense»
- «citizens who refuse them lose important privileges»
- «visible on the public Social Trust Index ledger»; «refusal is strongly stigmatized»
- «Removing an implant also does not erase identity or record»
- «makes identity non-repudiable regardless of hardware status»
- «gates access to SADs and high-trust environments»; «It does not directly trigger physical enforcement»
- «The STI operates on a 10:1 penalty-to-recovery ratio»
- «trust is approximately ten times harder to rebuild than to lose»
- «making boundary-riding a losing strategy»
- «layer reassignment history, violent offense records, capital crime convictions»
- «Both tracks travel with every citizen across layer boundaries»
- «VMSS administers neither in -3, but the information is present and actionable» (kept verbatim, Flag 1)
- «Citizens in Main Layer and above may leave VMSS freely»
- «departure would function as an escape hatch from consequence»
- «-1 residents may travel abroad only to restricted-list destinations»
- «-2 residents do not travel internationally»
- «tier-equivalent transfer to an allied state under reciprocal treaty coordination»
- «The right to relocate to Main Layer (0) is a standing human right»
- «without requiring parental consent»; «an independent AI legal advocate from birth»
- «does not treat children as parental property»
- «through its quality, not through legal authority»

**Critical Infrastructure Security**
- «treated as critical civilizational infrastructure»
- «combines automated security with hardened analog fallback systems»
- «purely digital systems are vulnerable to systemic failure»
- «designed to remain functional even during electromagnetic disruption»

**Enforcement & Restoration Protocol**
- «the backbone of moral causality in The Five Rings»
- «Pre-Intervention in Heaven Layers (+1 and SADs)»
- «Post-Intervention in Main Layer (0) and the lower layers (-1, -2)»
- «minimal institutional presence and no daily enforcement or restoration»
- Pre-Intervention (unchanged): «the Threshold Inhibition Protocol (TIP) halts harmful acts before completion»; «The victim receives optional neural therapy»
- Post-Intervention (unchanged): «a small layer-dependent probability of revival failure»
- Examples (unchanged): «victim revived in Main medical bay → perpetrator to -3»; «perpetrator to -2 or -3 if escalation warrants it»
- «Warning signals fire; the resident overrides them»
- «so the system responds instead of preventing» (was 'does not prevent — it responds')
- «Medical drones arrive within seconds»
- «with intent, execution and outcome recorded»; «No trial is needed for the factual record»
- «the violent-predatory threshold that -1 does not cover»; «reassigned to -2 Violent Offense»
- «The immediate, permanent reassignment seals the upward pathway and triggers asset liquidation»
- «The consequence is the environment, not confinement within it»
- «minutes, not months, with no courtroom, plea bargain or parole hearing»
- «Their absence is by design.» (was 'This is not an omission — it is the architecture.')
- «Consequence delivery is categorical»
- «regardless of district, circumstance or judicial sympathy»
- «genuine constitutional novelty rather than routine consequence arbitration»
- Cut as restatement: 'The system measured, acted, and moved on.'

**Threshold, Phasing, Edge Cases**
- «The boundary between Main Layer and -1 is categorical, not a continuum»
- «Minor infractions, which are clearable and amendable»
- «a DUI, an assault, meaningful fraud»; «Correction resets the trajectory»
- «It is STI-driven, reversible, and earned through demonstrated character» (kept verbatim, Flag 2)
- «whose STI falls below the 85-point eligibility floor»
- «the pathway between 0 and +1 remains open in both directions»
- «Reassignment governs descent into -1, -2, and -3»
- «triggered by qualifying behavioral breaches and is immediate and permanent»
- «Reassignment seals the ceiling, not the floor»
- «User opts out (available outside +1 Sanctuary)»
- «set by the offense rather than the layer visited»
- «committing a -1-level offense while visiting -2 is reassigned to -1»
- «neither insulates a citizen from reassignment nor inflates the consequence»

**Error Handling, Attribution, AI Governance**
- «VMSS assumes that even advanced systems can fail»
- «studied rather than hidden»
- «remain classified (the exploit surface, never the rule)» (revision 1: restores the original formula, matching the transparency paragraph; dash became parentheses)
- «the existence and citizen-facing consequences of every protocol are public»
- «VMSS does not recognize corporate personhood and has no need to»
- «the implant ledger attributes every decision to the individual who made it»
- «the system evaluates every person within the decision chain rather than the entity»
- «correlates individually innocuous acts across multiple ledgers»
- «Plausible deniability fails when the implant recorded what each person knew» (was 'collapses')
- «when they knew it and what they decided with that knowledge» (revision 1: restores the knowledge-to-decision link)
- «Leadership descent triggers standard asset liquidation»
- «is a form of centralized planning, and the doctrine says so» (was 'The doctrine is honest about this.')
- «The planning is centralized, but consent is distributed»
- «80% population ratification enacts binding law»
- «the Supreme Court retains constitutional review authority»
- «the AI does not restrict unilaterally»
- «governed by institutional consent rather than executive authority»
- «and it is not anti-paternalistic governance in the pure sense» (revision 1: 'so' replaced by 'and'; consent is not the reason the system falls short of anti-paternalism)
- «ecological central planning costs regulatory friction»; «ecological laissez-faire costs extinctions»

**Federal Law**
- «without surrendering civilizational sovereignty»
- «Certain laws apply across all five rings without exception»
- «externalities that cross layer boundaries»
- «Industrial-scale pollution is prohibited across all layers»
- «The threshold is externality, not technology»; «the mega-walls separate populations, not weather systems»
- «No jurisdictional exception.» (nuclear card unchanged); «triggers immediate reassignment to -3 Terminal»
- «Continued pursuit within -3 is handled by private justice»
- «The implant ledger is load-bearing civilizational infrastructure» (unchanged card)
- «tracks biodiversity for all species within VMSS territory at the genetic level»
- «because population counts alone miss genetic bottlenecks» (was 'not just population counts')
- «regulatory response through Article XXVIII or federal intervention through Article XXV»
- «This mandate applies in -3 Terminal»
- «Local private enforcement handles compliance first»
- «-2 supporting -3, -1 supporting -2, Main Layer supporting -1»
- «escalating to +1 Sanctuary for maximum resources»
- «Upper-layer enforcement is graduated and proportional: it enters, resolves the violation» (revision 1: fixes the dangling modifier)
- «as civilizational maintenance, not occupation» (revision 1: original's wording restored to hold paragraph length)
- «This track does not follow the graduated ladder»
- «deploy national armed forces with full military capability, overwhelming by design»
- «VMSS has no interest in governing -3 day-to-day»
- «threaten the other four layers»

**Military and close**
- «Both operate on the national defense track exclusively» (unchanged); «Operational details are classified.»
- «Systems turn a philosophy into a civilization.»
- «freedom is broad and consequence is real»
- «designed for civilizational longevity»

### Flags

1. **STI/ledger in -3 (held unchanged).** The sentence «VMSS administers neither in -3, but the information is present and actionable» can be read as saying the STI and the criminal record log do not run in -3, which would contradict the ruling that STI and the public ledger run in -3. It could also be read as saying only that VMSS does not *act on* either track there, which would match the ruling. The sentence is kept verbatim; the rest of its paragraph was edited. It needs a ruling on the wording. The verifier agrees, and suggests this wording if the ruling is confirmed: 'Both keep running in -3, where no VMSS institution acts on them, but private actors can read and act on the information.'
2. **Phasing wording (held unchanged, low risk).** «It is STI-driven, reversible, and earned through demonstrated character» and the 85-point phase-back sentence are kept verbatim. They fit the ruling (STI's only placement effect is the Sanctuary phase-back below 85; eligibility at 85 is immediate). But "STI-driven" and "earned" could be read as a score-set, earned-over-time entry into Sanctuary. «remains open in both directions» describes phasing between 0 and +1, not reassignment, so it does not conflict with downward-only mobility. That rule is stated in the same paragraph as «Reassignment seals the ceiling, not the floor».
3. **Post-Intervention scope (unchanged).** The paragraph under the "(Main Layer & Lower Layers -1/-2)" heading says «Murder victims are revived in backup vessels» and opens "In Main Layer and the lower layers". The heading scopes it to -1/-2, which fits the LP-004.2 vessel-link suspension in -3, but the body sentence taken alone does not exclude -3. Left as is.
4. **Main→-1 single-event list (unchanged content).** «a DUI, an assault, meaningful fraud» as single qualifying events is the Article I reading in the open Article I / Article XIV tension. Its wording was not touched beyond the em-dash.
5. **Length.** The cut is -2.8%, short of the 5-15% aim. Much of the page is specification: rate lists, the LP-074 frame, SCM parameters, the edge-case and example lists and flow captions. These are frozen or already terse. The largest cuts are in the argumentative paragraphs (AI governance as physics, overtime premium, children held harmless, the threshold-breach aftermath, corporate attribution). Replacing em-dashes with words adds length, and the verifier counts no words for a bare dash. Several run-in paragraphs therefore kept their single em-dash rather than grow.
6. **Flow captions not edited.** The short `<p>` captions inside the three flow diagrams (for example "Load-bearing principles protected by the full amendment gauntlet, not textual prohibition.") were treated as UI captions and left byte-identical.
7. **Revision 1 deviations from the verifier's suggested wording.** #113: the verifier's first option ('remain classified because they are the exploit surface, never the rule:') made the paragraph 30→33 words. It now uses the verifier's second option, the original formula kept verbatim, with parentheses in place of the dash because a colon would have produced two colons in the sentence. #123: the verifier's fix adds two words ("is", "it"), not one, which made the paragraph 65→67 by `systems-verify.mjs`. Parity is restored by writing "Upper-layer" (the page already uses «upper-layer economic position») and by going back to the original's «maintenance, not occupation». The dangling-modifier fix itself is applied as specified.
