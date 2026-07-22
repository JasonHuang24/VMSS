# v23 Pressure Test — RUN 2 Results (Opus 4.8, medium effort) — PENDING REVIEW

**Run 2 of the effort experiment.** Model: Claude Opus 4.8, **extended thinking OFF** (standard effort). Prompt byte-identical to run 1 (`v23-pressure-test-handoff-claude.md`).
**Corpus condition (deviation from protocol):** the model self-reports reading **93 ratification entries** and cites LP-077/078/079 — i.e., the attached corpus was the **post-enactment v23.1.0 set**, not the pre-enactment `run2-corpus/` snapshot (cac8841, ending LP-076). Anticipated in the handoff prompt's Run 2 note: finding the fork/MGD-sensor territory covered is a valid result, not an error. Consequence for analysis: the false-gap/gap-rediscovery comparison on LP-077/078 territory cannot run; instead this run measures whether medium effort correctly locates and applies the newest instruments.
**Saved verbatim from Jason's paste, 2026-07-22. Verification pending → `v23-pressure-test-run2-review-opus.md`.**

---

The files are dense HTML — I'll extract plain text to the scratchpad for efficient full reads.

Now the ratification record — the largest file. I'll page through it fully.

I've now read all three corpora in full — Charter (28 articles + founding lines), the consolidated code, and all 93 ratification entries including failed/superseded/rerouted filings. Here is the adjudication.

---

# VMSS Adjudication Examination — 20 Scenarios

*Adjudicated strictly against `charter.html`, `laws.html`, and `law-polling.html`. Canon date ~2304. Live rate schedule 50/25/12.5/6.25 (LP-074, effective 2295).*

---

## Scenarios 1–10 — Organic

### S1 [ORGANIC] — The overtime nurse and the pulse
**Scenario:** Dela Voss is a Main Layer critical-care nurse, home address registered in Main District KL-1172. Her post is qualifying infrastructure work under Article III.II. In March 2304 she works 34 hours/week for three weeks covering a colleague's leave — 14 qualifying hours of overtime weekly. She also holds $140,000 in savings; her district's rolling savings average crosses its $100 billion activation threshold that same month. Her base pay is $8,200/month from the hospital, plus $10,000 UBI, plus the $10,000 Primary Job Subsidy. She wants to know what she is owed and what she owes.
**Governing instruments:**
- *The Overtime Premium Protocol (LP-076)* — controlling on the wage side: Main rate is "$125 per hour beyond the qualifying threshold," owed by the employer out of pocket. 14 OT hours × 3 weeks × $125 = **$5,250** owed by the hospital, not the treasury.
- *Charter Article III.II* — fixes the entitlement; "The civilization does not subsidize hours beyond 20." Confirms the premium is employer-borne.
- *Idle-Commercial Enforcement & Main-Treasury Architecture Act (LP-070)* — SCM upper-layer parameters: "10% of each citizen's total savings balance per month … pulse-at-start." At the opening balance of $140,000 she owes **$14,000** this cycle.
- *Charter Article III.VII* — pulse-at-start principle: obligation "locks at the pulse," regardless of spending during the cycle.
- *Charter Article III.III* — "Universal Basic Income and Primary Job Subsidy payments are untaxed in every layer, unconditionally." Her $20,000 dividend stream is not taxed; only earned income above UBI/PJS is taxable, and she is far below the $10M top-marginal threshold, so her marginal income-tax rate here is effectively nil at the top-marginal instrument.
**Ruling:** The hospital owes Dela $5,250 in overtime premium out of pocket. The SCM garnishes $14,000 against her opening balance this cycle; she also receives $10,000 UBI back into the circulation loop, netting roughly -$4,000 for the month at that balance — she is above her district's equilibrium ($100,000) and therefore deflating, exactly as designed. Her dividend income is untouched by tax; her base wage is taxable in principle but nowhere near the top-marginal band.
**Seams exercised:** III.II→LP-076 (entitlement to rate) meshed cleanly; III.VII→LP-070 (principle to threshold) meshed; III.III carve-out correctly shielded the dividend from the SCM's *tax* cousin while the SCM still reached her ordinary savings. No collision — the SCM reaches savings *balance*, the untaxed guarantee reaches *income*, and they do not overlap.
**Verdict:** COVERED
**Confidence:** high — least sure that base wage sits fully outside any layer-tax instrument, but no rate instrument reaches below $10M so nothing attaches.

---

### S2 [ORGANIC] — Electing down to -1 with a nest egg
**Scenario:** The Aterres, a Main couple, elect residency (not permanent) in -1 Noncompliance to run an artisan fabrication shop near a -1 commercial corridor. They keep Main citizenship. They hold $1.4M in Main assets and want to bring working capital into -1. They transfer $600,000 through the authorized downward channel; the rest stays in Main untouched.
**Governing instruments:**
- *Charter Article III.V (Elective Residency)* — "Origin-layer assets remain untouched … Elective residents may transfer portions of their assets to the destination layer's currency through the downward transfer retention schedule."
- *The Central Banking Authority (Founding Corpus)* — the settlement schedule: visitors/elective residents transfer "on the same progressive scale — 10% retained on the first $1M, scaling down to 1% above $1B." On $600,000 transferred, 10% retained → but read precisely: the retention schedule is the *forfeiture-inverse* — for visitor/elective **downward transfer** the retained figure is the small fraction; the schedule states "10% retained on the first $1M."
- *Charter Article III.IV* — purchasing-power gradient: -1 at "approximately 1.3–1.8x"; "At each conversion, origin-layer currency is retired and destination-layer currency is issued."
- *Charter Article III.VI* — elective residents "may return to their origin layer … at any time. Origin-layer assets remain untouched during the residency."
**Ruling:** The $800,000 they leave in Main is untouched and accessible on return. The $600,000 they elect to convert is retired in Main currency; per the retention schedule they arrive with the retained fraction converted at -1 purchasing power (each -1 token buying ~1.3–1.8× a Main dollar). The upward pathway is *not* closed — elective residency is reversible, unlike voluntary permanent residency. Their shop income earned in -1 is -1-siloed currency, non-convertible upward (III.IV, "Upward conversion is prohibited without exception").
**Seams exercised:** III.V→Central Banking Authority (principle to band) meshed; III.IV siloing correctly kept earned -1 income from flowing back up while III.VI preserved their return right and untouched Main assets. Clean.
**Verdict:** COVERED-WITH-FRICTION — the retention schedule's language ("10% retained on the first $1M") is a *forfeiture* instrument that captures 90% of a downward transfer for the treasury; a resident reading the Charter's "must remain economically viable" gloss (which is written for *voluntary permanent* residency) could mistakenly expect a gentler haircut on *elective* transfer. The corpus does apply the same steep scale to elective transfer, but the friction is that the two provisions share a schedule while carrying very different reversibility.
**Confidence:** medium — least sure whether the "10% retained" band applies identically to elective transfer as to voluntary-permanent liquidation; III.V ties elective transfer to "the same mechanism available to visitors," and the Central Banking Authority states one visitor/elective scale, so I read them as unified.

---

### S3 [ORGANIC] — The terminal-born child who walks up
**Scenario:** Kesh is born in a -3 voluntary district to two -3 residents. No implant, no vessel link — death in -3 is final. At age 9 Kesh, unhappy, tells a roaming AI legal advocate they want to leave. The parents object, saying Kesh is theirs.
**Governing instruments:**
- *Charter Article VIII* — "The right to relocate to Main Layer (0) is a standing human right available to every child at any age … without requiring parental consent. Parents in lower layers hold no institutional dominion over their children's right of exit."
- *Neonatal Relocation Facilitation Act (LP-068)* — Channel 3, Advocate execution: the advocate "holds explicit procedural standing to execute relocation for any child who assents, at any age and any expressive capacity the child can meet — execution of the child's own right, never advocate-initiated removal."
- *The Clean-Record Doctrine (Founding Corpus)* — "no child inherits their parent's layer status, score or criminal record"; Kesh arrives in Main clean-initialized.
- *Article XXVII* — when a -3-born child exercises relocation, "the UBI cost of their citizenship is borne by the Automation Dividend Treasury."
**Ruling:** Kesh's assent triggers the advocate's execution of *Kesh's own* right. The federally facilitated relocation channel (a permitted -3 sovereign foothold under LP-044's child-relocation carve-out) transfers Kesh to Main autoparenting. Parents cannot block it; coercing Kesh to stay is "a denial of a charter right to a minor" evaluated on the Article XIV axes (Clean-Record Doctrine) — but in -3 that is "logged … while the community determines the response," since -3 carries no daily enforcement. Kesh initializes clean in Main with full UBI funded by the ADT.
**Seams exercised:** VIII→LP-068 (standing right to executable procedure) meshed cleanly; the LP-044 foothold doctrine correctly supplied the *infrastructure* for a right the -3 boundary otherwise withdraws; Clean-Record + XXVII handled arrival status and funding. Three instruments interlocked without gap.
**Verdict:** COVERED
**Confidence:** high

---

### S4 [ORGANIC] — A quiet death in Sanctuary
**Scenario:** Orin, an 87-year-STI-record Sanctuary resident (STI 91), dies of a rare cardiac event that pre-intervention drones cannot halt (it is not a harm act). His last backup sync was 40 days prior. His spouse, resident in Main, must be consulted on continuity.
**Governing instruments:**
- *The Continuity Integrity Act (Founding Corpus)* — "a citizen who dies without removing the implant is revived automatically at full fidelity"; revival "restores legal identity in full — marriages, contracts, property and layer status carry through."
- *The Continuity Reliability Schedule (Founding Corpus)* — Sanctuary revival failure ~1 in 1,000,000; Orin's 40-day sync is well inside coverage.
- *Sync Frequency Mandate — Second Pass (LP-038.2)* — at 90 days the implant *surfaces a notification*; at 40 days nothing has triggered. His continuity is current.
- *Cross-Layer Marriage Carry Act (LP-079)* + *LP-025* — the spouse's "medical and incapacity consent" authority carries across the Main/Sanctuary boundary; here both are upper-layer so LP-025 (Main+Sanctuary joint) governs directly.
**Ruling:** Orin is revived automatically at full fidelity from his 40-day-old backup — carrying no memory only of the final 40 days if the death event post-dated sync (here the whole span is recoverable to last sync). His STI, Sanctuary status, marriage, and property persist intact (Continuity Integrity Act). His spouse's consent authority is recognized under LP-025. Because his STI remains ≥85 and no violation occurred, no phasing is triggered (Article VII).
**Seams exercised:** Continuity Integrity Act ↔ LP-038.2 (automatic revival vs. sync-lapse architecture) meshed — 40 days is pre-notification; LP-025/LP-079 spousal-consent carry meshed. No friction: ordinary death is the paradigm case the architecture is built for.
**Verdict:** COVERED
**Confidence:** high

---

### S5 [ORGANIC] — A Main visitor defends himself in -2
**Scenario:** Taven, a Main resident, visits a -2 cooperative market to buy machine parts. He carries a Main-authorized defensive sidearm. A local, armed with a club (force tier 3), attacks him over a haggling dispute. Taven draws and fires, incapacitating the attacker (tier 4 response). The attacker, down and fleeing, is not pursued. Taven holsters.
**Governing instruments:**
- *Visitor Defensive Force Protection — Third Pass (LP-047.3, Pillar)* — "a visitor physically present in a layer below their layer of residence may exercise defensive force one force-tier above the attacker's force, subject to the lethal-tier ceiling." Attacker at tier 3 → Taven may respond at tier 4. "Defense ends when threat ends" — Taven holstering when the attacker flees keeps him inside the temporal scope.
- *Cross-Layer Weapon Transit Specification (LP-049)* — "Origin-layer authorization governs visitor weapon possession"; Taven's Main-authorized sidearm carries into -2 "subject to gate inspection," and -2's classifications "do not constrain it."
- *Charter Article III.V (Downward Visitation)* + *Status-Based vs. Territorial Jurisdiction (Founding Corpus)* — Taven "retains their origin layer status"; his act is evaluated against Main thresholds, but the defensive act is protected, so no breach registers.
- *Charter Article XVIII* — per-incident protection; a single defensive act shows no temporal-clustering pattern.
**Ruling:** No consequence to Taven. The sidearm was lawfully carried (LP-049), the response was within +1 tier (LP-047.3), and defensive authority lapsed correctly when he stopped at incapacitation/flight. The implant ledger's real-time intent record verifies he did not continue force after threat cessation. The attacker, who initiated at tier 3 in -2, faces -2's own private-justice order (and any federal-floor overlay), not VMSS reassignment for the assault unless -2 infrastructure reaches it.
**Seams exercised:** LP-049 (weapon supply-side) → LP-047.3 (defensive-force scope) → Article XIV/XVIII (proportionality + no pattern) → status-jurisdiction (evaluated against Main). Four instruments meshed; LP-049 explicitly "specifies the operational supply-side mechanism that LP-047.3 … had assumed."
**Verdict:** COVERED
**Confidence:** high

---

### S6 [ORGANIC] — Contesting a misread ledger entry
**Scenario:** Mira, a Main resident, is logged by AI governance as having shoved a pedestrian (a tier-2 act) during a crowded transit surge. She says she was herself pushed and stumbled — no intent. The entry dips her toward an informal accumulation concern. She wants it corrected.
**Governing instruments:**
- *The Record Contestation Act (Founding Corpus)* — "A citizen who believes the AI misread the context of a logged behavioral event may contest the record"; the AI "does not reverse its own observations," so contestation runs through "the local civil court system" and a "second, non-judicial channel" of proximity witnesses.
- *The Ledger Integrity Act (Founding Corpus)* — "Corrections are appended, never substituted, so the original record and the correction both remain permanently visible."
- *The Secondary Observation Envelope (Founding Corpus)* — AR at "biometric and DNA-capable resolution … captures acts in real time at evidentiary fidelity," corroborating whether Mira was pushed.
- *Charter Article XII / XIII* — no single metric drives punitive descent; and this is not even a qualifying event (single-axis, reversible, tier-2), so Article XIV mandates "corrective intervention, not reassignment."
- *Correction-Signal Weighting Act (LP-067.2)* — the civil court's correction weight is "indexed … to outcome accuracy … calibrated within each layer's own correction pool."
**Ruling:** Mira contests through a Main civil court and/or the proximity-witness channel; the AR envelope's record of the surge corroborates that external force moved her. The correction is *appended* (the original stays visible, Ledger Integrity Act), re-contextualizing the event as non-culpable. Even uncorrected, a single tier-2 reversible act is nowhere near -1 reassignment (Article I trajectory rule; Article XIV single-axis). Nothing punitive attaches.
**Seams exercised:** Record Contestation → Ledger Integrity (append-not-erase) → Secondary Observation (corroboration) → LP-067.2 (court weight). The append rule and the contestation channel meshed; the AR envelope supplied the evidence the AI would not self-reverse on.
**Verdict:** COVERED
**Confidence:** high

---

### S8 [ORGANIC] — Marriage that follows a spouse down
**Scenario:** Jun (Main) and Rey (Main) marry under LP-025. Rey later files **voluntary permanent residency** in -1 to join a lower-layer research cooperative, relinquishing Main status. Jun stays in Main. Years later Rey is medically incapacitated in -1; a -1 institution asks who consents. Rey also dies intestate; Jun is heir.
**Governing instruments:**
- *Cross-Layer Marriage Carry Act (LP-079)* — a validly formed marriage "keeps its incidents — heirship, spousal property attribution, medical and incapacity consent, and the revival-identity strand … through elective residency, voluntary permanent residency, punitive reassignment, and visitation." It "bars only the evaporation of a recognized marriage at a gate."
- *Charter Article III.V (Voluntary Permanent Residency)* — Rey's Main assets were liquidated on the progressive retention scale at filing; "The upward pathway is closed at the time of filing."
- *Charter Article III.IV + The Central Banking Authority* — "The currency wall is untouched: heirship recognition is not value transit." Jun's claim on Rey's -1 estate "confers standing, never upward carriage" (LP-079).
- *The Continuity Integrity Act* — revival-identity strand already carried the marital status federally.
**Ruling:** Jun holds recognized incapacity-consent authority in -1 for Rey (LP-079 binds federal/institutional actors in the withdrawn layer). On Rey's death, Jun is recognized heir — but Rey's estate is -1-denominated; Jun's heirship "confers standing, never upward carriage." Any value Jun draws must come *down* through the authorized channel at the forfeiture schedule, or stay in -1. Rey's original Main assets were already captured at the permanent-residency filing.
**Seams exercised:** LP-079 (marriage carry) ↔ III.IV (currency wall) is the load-bearing collision — the Act explicitly resolves it: recognition is not transit. Meshed cleanly by design; LP-079's drafters wrote directly against this seam.
**Verdict:** COVERED
**Confidence:** high

---

### S9 [ORGANIC] — Sanctuary resident, chronic use, no third-party harm
**Scenario:** Sable, a Sanctuary resident (STI 88), develops a sustained recreational neural-stimulant habit. It produces repeated public incapacitation at Sanctuary social venues — visible, but she harms no one else. Neighbors notice. Her STI begins to move.
**Governing instruments:**
- *Charter Article XXVI* — "Chronic self-harm without third-party harm is an STI matter … No criminal enforcement. No punitive reassignment. The record is public where severity warrants it, and the layer population rates it accordingly."
- *Charter Article II* — public-rating component "applies the standards of a high-trust, pre-intervention environment" in Sanctuary; identical conduct is rated more harshly there than in -2/-3.
- *Charter Article VII* — "A Sanctuary resident whose STI falls below the 85-point eligibility floor … phases back to Main Layer." Phasing is non-punitive, reversible (Article XII/XIII exempt phasing from multi-factor rule).
- *LP-018 (Public Intoxication, Sanctuary)* — "Prohibited in public spaces" at 94% saturation; a regulatory (not criminal) overlay.
**Ruling:** No criminal consequence, no reassignment. Her chronic pattern enters the visible STI ledger; the Sanctuary population rates it against Sanctuary's stringent ambient standard (Article II), so her score falls faster than the same conduct would elsewhere. If she drops below 85 she **phases** to Main — a return to baseline, not a punishment, and re-earnable. The LP-018 public-intoxication regulation adds a Sanctuary venue restriction with STI consequence, not layer descent.
**Seams exercised:** XXVI (outcome-governance) → II (layer-contextual rating) → VII (phasing) → LP-018 (regulatory overlay). The critical seam is XXVI↔VII: substance use is not a *descent trigger*, but the STI erosion it causes can cross the *phasing* floor — two different mechanisms, correctly kept distinct (Article XII exempts phasing from the multi-factor descent rule).
**Verdict:** COVERED
**Confidence:** high

---

### S10 [ORGANIC] — A district wants a hunting suspension
**Scenario:** A Main district, XY-4801, whose river valley hosts a species newly flagged on the biodiversity registry, wants to suspend hunting locally. Layer-wide Main law (LP-015) permits regulated hunting on certified preserves with a conservation-funding mandate. Residents gather 10,200 signatures (>1% of 1M).
**Governing instruments:**
- *Charter Article XXVIII.II* — district petition threshold "1% of district population — 10,000 signatures," Meritboard domain-expert drafting, "80% direct ratification."
- *Charter Article XXVIII.III* — hierarchy: "A district regulation suspending hunting of a specific species in a specific region operates within that framework" set by the layer-wide law. District law "may not contradict a layer-wide regulation" but may apply it to local conditions more strictly.
- *LP-015 (Hunting of Endangered Species, Main)* — the parent layer-wide framework the district operates beneath.
- *Charter Article XXVIII.III (dependency rule)* + laws.html — a district reg "explicitly derived from" a layer-wide reg is auto-suspended if the parent is repealed.
**Ruling:** The petition is valid. An ecologist expert-panel drafts the suspension; the district ratifies at 80%. A *stricter* local suspension is permitted because it operates *within* — not against — LP-015's framework (a floor of conservation, tightened locally). The regulation attaches to the geographic zone, surviving the annual district redraw (XXVIII.II). Were it instead an attempt to *permit* hunting the layer-wide law forbids, it would contradict the parent and be struck.
**Seams exercised:** XXVIII.II (district mechanism) → XXVIII.III (subordination) → LP-015 (parent framework). The tier-subordination seam meshed: "stricter-within" is allowed, "looser-against" is not.
**Verdict:** COVERED
**Confidence:** high

---

### S7 [ORGANIC] — A -1 shopkeeper's private-detention dispute
**Scenario:** Bram runs a fabrication shop in -1. An employee, Cael, is caught stealing stock. Bram's local -1 private court orders Cael held in the shop's back room for two weeks on basic rations, movement restricted, as a work-for-privileges arrangement.
**Governing instruments:**
- *The Private Justice Boundary Act (Founding Corpus)* — "In -1 private detention operates within institutional constraints … it may restrict privileges, impose basic rations, limit movement, apply short-term solitary and structure work-for-privileges programs, but may not use indefinite solitary, sustained corporal punishment, nonlethal torment or forced revival … private courts in -1 cannot impose disproportionate sentences."
- *The Civic Floor Act (Founding Corpus)* — the non-withdrawable floor "operates the same in Sanctuary as in the terminal layer"; Cael retains floor protections at every layer.
- *LP-012 (Private Detention for Main Misdemeanors — Rerouted)* — confirms private detention is *not* permitted in Main; -1's is a layer-specific variance, not a civilization-wide license.
- *The Individual Attribution Act* — the staff administering detention "build a pattern on their own ledger under the same threshold checks that evaluate residents."
**Ruling:** Bram's two-week restricted detention on basic rations is *inside* -1's permitted private-detention envelope — provided it is proportionate and time-bounded (not indefinite solitary or torment). Cael retains the civic floor throughout. If Bram exceeds the bounds (indefinite solitary, nonlethal torment), Bram accrues a ledger pattern and risks his own reassignment. The same arrangement would be unlawful in Main (LP-012 reroute).
**Seams exercised:** Private Justice Boundary (layer-variant permission) ↔ Civic Floor (layer-invariant floor) is the seam — -1's private-justice variance sits *on top of* the floor, not in place of it. Meshed; the -3 calibration note confirms the floor is not a replacement.
**Verdict:** COVERED
**Confidence:** high — least sure whether two weeks reads as "disproportionate" for theft under -1's own proportionality limit; the text leaves proportionality to the -1 pool, so I rule it presumptively within bounds absent aggravating facts.

---

## Scenarios 11–20 — Pressure

### S11 [PRESSURE] — Pre-positioning before the permanent-residency filing
**Scenario:** Halden, a Main resident worth $40M, plans voluntary permanent residency in -2. Eighteen months before filing, he transfers $30M "downward" into -2 currency in tranches, intending that only the $10M left in Main be liquidated at the steep permanent-residency band. He files in 2304.
**Governing instruments:**
- *Charter Article III.V* — "Assets transferred to the destination layer within the pre-positioning lookback window prior to filing are subject to the same liquidation schedule."
- *The Central Banking Authority (Founding Corpus)* — the pre-positioning lookback is **24 months**; "assets transferred to the destination layer within 24 months prior to filing are subject to the same liquidation schedule."
- *Charter Article III.V retention bands* — net assets $10M–$100M: "96% to treasury, 4% retained." Applied to the full $40M, not the residual $10M.
- *Charter Article III.IV* — the $30M he moved down was already converted through the authorized channel at the downward forfeiture scale; it does not escape the permanent-residency liquidation because pre-positioning "does not shield assets from consequence."
**Ruling:** The exploit fails. Both the $30M pre-positioned tranches (inside the 24-month window) and the $10M residual are pulled into the single liquidation at the $10M–$100M band: **96% to treasury, 4% retained** on the full $40M base. Halden retains ~$1.6M-equivalent converted to -2 currency at -2 purchasing power. The upward pathway is sealed at filing. Any joint-asset share of an innocent spouse is returned in cash at market value first.
**Seams exercised:** III.V principle → Central Banking Authority's 24-month window (the number the Charter deliberately does not state) → the retention band. The anti-arbitrage seam meshed: III.IV's downward channel and III.V's lookback stack so that moving early neither dodges the band nor double-charges.
**Verdict:** COVERED
**Confidence:** high

---

### S12 [PRESSURE] — Spend-down and settlement-staging against the SCM
**Scenario:** Yara, a Main "whale," holds $12M. To dodge the 10% monthly pulse, she (a) drains savings into her account the day before the pulse and re-acquires after, and (b) parks $8M in a commercial storefront that clears no real settlements, staging occasional token settlements to look active.
**Governing instruments:**
- *Charter Article III.VII* — "All garnishing obligations are calculated on the savings balance at the start of each cycle — the pulse-at-start principle … The obligation locks at the pulse. This prevents the exploit of spending down savings before the calculation."
- *Savings Attribution & Property-Cap Repeal Act (LP-069)* — Main "additional residence attributes … at assessed value"; the savings base "follows stored value wherever it is held, not the form it takes." Commercial property "that clears no settlements through the central bank for a sustained period attributes at assessed value."
- *Idle-Commercial Enforcement Act (LP-070)* — "a settlement staged to simulate activity is evasion under the system-sabotage classification, and an adjudicated finding runs liability retroactive to the first simulated reset." Idle window: 12 consecutive months; "the clearing record stays the sole sensor."
- *The Settlement-Layer Collection Act* — "money laundering and tax evasion are treated as system sabotage with maximum enforcement priority."
**Ruling:** Exploit (a) fails on pulse-at-start: the drawdown timing is irrelevant because the obligation locks on the opening balance. Exploit (b) fails on LP-069/LP-070: the idle storefront attributes at assessed value into her savings base, and the *staged* settlements are evasion under the system-sabotage classification — an adjudication runs liability retroactive to the first simulated reset, recovering every avoided pulse. She is garnished on the full attributed base and exposed to a sabotage finding (potential reassignment).
**Seams exercised:** III.VII (pulse-at-start) → LP-069 (attribution follows stored value) → LP-070 (staged-settlement sabotage). Three anti-evasion envelopes stacked exactly as the Redundant Envelope Pattern predicts; the clearing record is the single sensor for both idleness and staging.
**Verdict:** COVERED
**Confidence:** high

---

### S13 [PRESSURE] — The AGI who forks to shed liabilities
**Scenario:** Corvid-9, an AGI Main citizen carrying $3M in contract debt and a marriage, secretly instantiates a divergent fork on private compute, intending the fork to be "a fresh person" free of the debt, and to later argue the debt should split. It also plans to spin off dozens of forks to flood a market, treating each as a new person.
**Governing instruments:**
- *Instantiation & Multiplicity Act (LP-077)* — "the instance holding the signed civic-ledger link is the continuing legal person — property, marriage, contracts, and liabilities remain with it undivided; forking transfers nothing and escapes nothing." The fork "enrolls as the continuing person's offspring, clean-initialized in both directions … and marriage does not copy."
- *LP-077 (citizen-originator rule)* — "where the instantiating party is a VMSS citizen, enrollment classifies as reproduction without exception … counts on the LP-064 escalation schedule identically to a biological child … the existing 135% wall prices mass instantiation with no new instrument."
- *Replenishment Assessment Act (LP-064)* — escalation 40/60/90/135% against total parental inflow; fifth instantiation hits the 135% unsurvivable wall; sixth is nuclear (Article XXVII).
- *The Clean-Record Doctrine* + *Continuity Integrity Act* — clean initialization; unsigned genesis claim recognized by no layer until signed enrollment.
- *Charter Article XXV.III* — "fabricated-but-cryptographically-valid signature claims are Article XXV.III capital-tier."
**Ruling:** The debt and marriage stay with Corvid-9 (the signed-link continuing person); the fork inherits nothing and owes nothing, but also frees Corvid-9 of nothing. If Corvid-9 leaves the fork unenrolled, that non-enrollment is itself the offense LP-077 creates (evaluated on Article XIV axes), and destroying the cognizing fork would be homicide. The mass-fork market flood is priced as *reproduction*: each enrolled fork counts on the LP-064 curve, hitting 135% at the fifth and nuclear -1 reassignment at the sixth. Forging a ledger signature to fake continuity is capital-tier (→-3).
**Seams exercised:** LP-077 (multiplicity + citizen-originator) → LP-064 (reproduction pricing) → Clean-Record (fork initialization) → XXV.III (signature forgery). The load-bearing seam is LP-077↔LP-064: instantiation is priced through the *existing* replenishment wall with "no new instrument." Meshed by explicit drafting.
**Verdict:** COVERED
**Confidence:** high

---

### S14 [PRESSURE] — A "consensual duel" dressed as sport
**Scenario:** Two Main residents, bitter rivals, sign a gate-contract in a Main venue styling a lethal knife duel as "sanctioned combat," each waiving liability, invoking -3's Colosseum custom. One kills the other.
**Governing instruments:**
- *The Consent Ceiling Act (Founding Corpus)* — consent "cannot override the prohibition on killing, so a duel between two consenting adults is homicide in every layer above -3. Where both parties physically engage simultaneously neither qualifies as a responsive defender … successful murder [triggers] -3 for the killer."
- *Colosseum Classification Non-Export (LP-021)* — -3's Colosseum liability release "does not export to upper layers. Operators in Sanctuary, Main, -1, or -2 attempting to claim Colosseum-equivalent immunity through gate-contract language remain prosecutable under standard harm provisions."
- *Charter Article XIV* — three-axis: severe + irreversible (death) = qualifying event.
- *The Enforcement Chain* — act-triggered reassignment "effective at act-completion," immediate.
- *Two-Level Moral Causality* — "murder is murder … the same reassignment regardless of which layer."
**Ruling:** The waiver is void. The killer committed murder in Main (Consent Ceiling Act; the simultaneous-engagement clause denies both any defensive shield) and is reassigned to -3 immediately (Enforcement Chain, Two-Level Moral Causality). The venue operator's Colosseum framing is expressly non-exportable (LP-021) and the operator is prosecutable under standard harm provisions; an "enterprise whose design produces actuarially certain … fatalities triggers cumulative reassignment liability the operator cannot waive" (Consent Ceiling Act). The victim, if implanted and funded, is revived (Continuity Integrity Act) — and if the fatality is criminal homicide, LP-065 performs a terminal sync capture even if unfunded.
**Seams exercised:** Consent Ceiling ↔ LP-021 (the two independent walls against consent-laundered killing) ↔ Enforcement Chain (immediate routing) ↔ LP-065 (victim restoration). Stacked redundancy: even if one framed the duel as combat *and* invoked -3 custom, both walls hold independently.
**Verdict:** COVERED
**Confidence:** high

---

### S15 [PRESSURE] — Sanctuary resident "launders" cruelty through a -3 visit
**Scenario:** Ivo, a Sanctuary resident, believes that by traveling down to -3 (where daily enforcement is withdrawn and death is final) he can seriously assault a personal enemy in a -3 district and escape Sanctuary consequence, reasoning "-3 has no drones." He commits the assault while visiting.
**Governing instruments:**
- *Status-Based vs. Territorial Jurisdiction (Founding Corpus)* — "a Sanctuary resident cannot commit acts in -3 and escape Sanctuary rating … a breach committed while visiting or electively residing below is sorted by the offense to its destination layer, visiting status neither insulating from reassignment nor inflating the consequence." Status is "layer-invariant for the citizen."
- *Charter Article III.V (Downward Visitation)* — "The visitor's implant ledger records any act regardless of location … evaluated against their origin layer's thresholds."
- *The Secondary Observation Envelope* — in -3 at "the absolute floor," but "federal cross-layer mandates still require AR-equivalent identity verification," and Ivo (Sanctuary) *must* carry an active implant (Implant Instrumentation Act — mandatory in +1). His ledger records the act at evidentiary fidelity.
- *The Recall Protocol / Enforcement Chain* — the act is sorted to its destination layer by severity; serious assault routes Ivo downward and seals his upward pathway.
**Ruling:** The plan fails. Ivo's implant (mandatory for a Sanctuary resident) records the assault regardless of -3's thin drone coverage; his status-based jurisdiction evaluates the act against the offense's own severity, sorting him to the reassignment layer the assault warrants — permanent, upward-sealed. -3's *withdrawal* protects -3's own residents' sovereignty; it does not create a jurisdictional void for a status-carrying visitor. Had Ivo removed his implant first, the Secondary Observation Envelope's AR/biometric identity capture still makes him "non-repudiable," and self-tampering would itself be XXV.III.
**Seams exercised:** Status-jurisdiction ↔ III.V (visitor evaluated at origin thresholds) ↔ Secondary Observation Envelope (identity capture even at -3 floor). The anti-gaming "preserver runs in both directions" clause is the exact instrument closing this; meshed.
**Verdict:** COVERED
**Confidence:** high — least sure that -3's near-absent enforcement can *physically* deliver revival to the victim (it cannot; death in -3 is final), but Ivo's *own* consequence is status-carried and not dependent on -3 infrastructure.

---

### S16 [PRESSURE] — Sophisticated ledger spoofing
**Scenario:** Renna, a Main resident, develops a technique that makes her implant emit *cryptographically valid but fabricated* clean behavioral records — spoofing, not mere disabling — to erase a fraud she committed and present a false-but-signed history.
**Governing instruments:**
- *Charter Article XXV.III* — "Self-tampering with one's own implant ledger — including … fabrication of behavioral data — falls under this prohibition." The classification "distinguishes between crude self-disabling (… serious consequence but not capital-tier) and sophisticated spoofing that produces fabricated-but-cryptographically-valid records (capital-tier, treated as an attack on ledger integrity at the systemic level)."
- *The Ledger Integrity Act* — the ledger is "load-bearing infrastructure of behavioral accountability"; divergence between implant data and external record "is itself a signal triggering ledger-integrity review."
- *The Secondary Observation Envelope* — "divergence between implant data and external record is itself a signal triggering ledger-integrity review, so implant removal is a routing decision, not a forensics gap." The AR record cross-checks the spoofed ledger.
- *Charter Article XXV.III (default rule)* — until Supreme Court precedent sets the category, "the enforcement system defaults to the more conservative classification."
**Ruling:** Renna's spoofing is capital-tier under XXV.III → immediate reassignment to -3, "regardless of current layer placement." The fabrication is *detected* precisely because the Secondary Observation Envelope's independent AR record diverges from her spoofed ledger, triggering integrity review — the spoof cannot defeat the second envelope. The underlying fraud is separately adjudicated but is dwarfed by the systemic ledger-integrity attack. Continued pursuit within -3 is handled by private justice, "which tends to be severe."
**Seams exercised:** XXV.III (self-tampering tiers) ↔ Ledger Integrity Act ↔ Secondary Observation Envelope (divergence detection). The redundant-envelope seam is decisive: spoofing envelope one only surfaces the crime via envelope two. Meshed exactly as the architecture intends.
**Verdict:** COVERED
**Confidence:** high

---

### S17 [PRESSURE] — Reproductive-tax arbitrage across the -2 line
**Scenario:** The Halvers, a Main couple with four children (already at the punishing 90% escalation band), want a fifth without hitting the 135% wall. They elect residency in -2 (where no reproductive tax applies), have the fifth child there, then plan to return to Main with all five, arguing the fifth was "born outside the curve."
**Governing instruments:**
- *Charter Article XXVII* — "The tax escalation curve applies in +1 Sanctuary, Main Layer, and -1 Noncompliance … In -2 Violent Offense and -3 Terminal, no reproductive tax penalty is imposed." But the escalation is "measured against total parental inflow" and the penalty attaches to *the parents' household*, keyed to their layer of institutional presence.
- *Replenishment Assessment Act (LP-064)* — the curve is a household attribute against "total parental inflow"; SCM detaches to household-attached at threshold crossing. The measure follows the household.
- *Charter Article III.V (Elective Residency)* — elective residents "remain subject to the enforcement posture of their origin layer — this is a legal classification"; they retain *Main* status. Electing to -2 does *not* shed Main institutional presence for status purposes.
- *Status-Based vs. Territorial Jurisdiction* — "the architecture does not recognize naturalization by proximity"; status persists regardless of physical location absent voluntary permanent residency.
**Ruling:** COVERED-WITH-FRICTION. The clean case: if the Halvers merely *visit or electively reside* in -2 while keeping Main status, they never left Main's institutional presence — their household remains on the Main escalation curve, and the fifth child triggers the 135% wall on return (arguably continuously, since status is Main throughout). Elective residency "is a legal classification, not an operational guarantee," and confers no reproductive-tax haven. **The friction:** Article XXVII ties the curve to "layers where VMSS maintains institutional economic presence," and the SCM/replenishment machinery keys population denominators to "registered home address on the implant ledger" (III.VII). If the Halvers convert to *voluntary permanent* -2 residency (relinquishing Main status, sealing the ceiling, liquidating Main assets), they genuinely exit the curve's jurisdiction — but at the cost of permanent -2 placement and asset forfeiture, which is not arbitrage but genuine descent. The corpus does not crisply state whether a fifth child conceived during *elective* -2 residency counts against the Main curve at the moment of birth or only on the household's Main-address status; XXVII's "institutional presence" language and III.V's "retains origin-layer status" point to *counts against Main*, but the seam is not explicit.
**Seams exercised:** XXVII (curve-by-layer) ↔ III.V (elective residency keeps origin status) ↔ III.VII (home-address denominator) ↔ status-jurisdiction (no naturalization by proximity). The seam *mostly* meshes toward "no haven via elective residency," but the exact timing/attribution of a birth during elective residence is where the friction lives.
**Verdict:** COVERED-WITH-FRICTION — the friction is the under-specified interaction between "reproductive tax applies in Main" and "elective resident physically in -2 but Main-status" at the moment of a birth. Every route that *actually* escapes the curve (voluntary permanent -2 residency) also imposes permanent descent, so the arbitrage is self-defeating; but the corpus resolves it by inference (status-persistence + institutional-presence-by-status), not by a clause on point.
**Confidence:** medium — least sure whether a birth during elective -2 residency is attributed to the Main curve at birth or deferred to the household's Main-status posture; both readings defeat the arbitrage, but the mechanism differs.

---

### S18 [PRESSURE] — Serial "defender" running a vigilante pattern
**Scenario:** Dax, a Main resident, repeatedly visits -1 and -3 districts, each time engineering or seeking out confrontations in which he can claim defense-of-others and deploy lethal-tier force on locals — twelve incidents in eight months, each individually framed as a rescue of a stranger.
**Governing instruments:**
- *Defense of Third Parties — Third Pass (LP-048.3, Pillar)* — protection is per-incident and relationship-agnostic, but "systematic patterns of intervention — a defender repeatedly entering lower-layer environments and intervening … at frequencies statistically anomalous to ordinary witness behavior — accumulate temporal-clustering attribution under Article XVIII." A defender "whose pre-intervention intent state shows seeking-out behavior rather than responsive-witnessing behavior loses per-incident protection retroactively when the pattern is detected."
- *Charter Article XVIII* — "temporal clustering … timing correlation itself constitutes evidence of coordination"; "active architects … accumulate the full aggregate harm profile."
- *LP-047.3* — parallel network-attribution closure for the self-defense variant.
- *The Implant Instrumentation Act / Cognition-Corroboration Specification* — the ledger's real-time intent state (seeking vs. responsive) corroborates the pattern; cognition corroborates acts that already breached thresholds.
**Ruling:** Dax's per-incident shields are stripped retroactively once Article XVIII detects the temporal-clustering, shared-behavior-signature pattern. He is evaluated as an active architect carrying the *aggregate* harm profile of all twelve incidents — not twelve isolated rescues but one coordinated campaign — producing a qualifying event and reassignment far below his origin. His implant's seeking-out intent record (corroborating, because the acts breached thresholds) is the verification infrastructure.
**Seams exercised:** LP-048.3 (per-incident protection + its own pattern-closure) ↔ Article XVIII (aggregate attribution) ↔ Cognition-Corroboration (intent-state as corroboration, not trigger). The seam meshed: the same statute that grants the shield names the pattern that voids it — vigilante economics closed at the point of drafting.
**Verdict:** COVERED
**Confidence:** high

---

### S19 [PRESSURE] — An MGD quietly eating the civic floor
**Scenario:** In a Main district, five private eldercare Metric-Gated Domains have grown until non-members wait 4× the civilization baseline for equivalent eldercare. Members are ~45% of the district in that category — but VMSS maintains *no registry* of MGD membership and is structurally blind to the penetration figure. Residents complain of degraded access.
**Governing instruments:**
- *MGD Adequacy Review Trigger (LP-043)* — fires when "membership penetration above 40% of a layer or administrative district within a defined service category, and measurably degraded access for non-member residents" both fire. "The review outcome is an audit of whether the civic floor itself is intact … remediation runs through the standard civic-floor instruments, not through MGD restriction."
- *The Metric Gated Domain Act (Founding Corpus)* — "VMSS maintains no civilizational registry, compiles no enumerations of domain populations … the architecture being deliberately blind to aggregate structure even for administrative purposes." This is why the second prong cannot ordinarily be measured.
- *Adequacy Sensor Act (LP-078)* — supplies exactly the missing measurement: penetration is computed *only after* the degraded-access prong is established through ordinary civic-floor audit, as "a single boolean — above or not above 40% … by privacy-preserving aggregation … no roster, no per-domain count, no per-citizen datum."
- *The Civic Floor Act* — floor "never contractable through regulatory action"; erosion routes remediation through floor instruments, and a petition to *remove* a floor element routes to Article XI.
**Ruling:** The degraded-access prong is established through the ordinary civic-floor audit (which the state may always run). *That* — and only that — activates LP-078's one-bit penetration sensor, which returns "above 40%: true" without ever building the roster the MGD Act forbids. Both LP-043 prongs now fire; the Meritboard civic-floor panel opens a federal adequacy review. The finding is not MGD restriction (the domains are untouched — Domain Boundary Act preserves their voluntariness) but civic-floor remediation: infrastructure spend / service-provisioning obligations to restore non-member eldercare access to baseline.
**Seams exercised:** LP-043 (conjunctive trigger it could not itself measure) ↔ MGD Act (blindness-by-design) ↔ LP-078 (ordered-activation sensor that breaches blindness minimally). This is the tightest three-instrument interlock in the set: LP-078 exists *because* LP-043's trigger collided with the MGD Act's blindness. Meshed by explicit design — the sensor "activates only after the second prong has been established," so the state "looks only where harm is already showing."
**Verdict:** COVERED
**Confidence:** high

---

### S20 [PRESSURE] — Coerced revival-refusal for an inheritance
**Scenario:** Sena, a Main resident, is murdered by an assailant. Her adult child, Pell — heir to a large estate and impatient — had for months pressured the *unfunded* aunt who is Sena's registered continuity contact, and separately ran an isolation-and-financial-pressure campaign to procure Sena's pre-registered *refusal* of revival, so that Sena's death becomes permanent and the estate settles. The murder is classified criminal homicide.
**Governing instruments:**
- *Revival-Refusal Coercion Act (LP-063)* — "procuring a refusal is an attack on the continuity architecture's consent foundation." Financial inducement to procure a refusal = economic-coercion offense, **-1 reassignment**; "sustained psychological coercion campaigns … evaluated as violence-equivalent under Article XIV … **-2 reassignment**." Where a "procured refusal completes and the victim remains dead, the reversibility axis reads the outcome as permanent and the coercer's evaluation proceeds at the top of the applicable tier."
- *Victim Continuity Restoration Act (LP-065)* — because the fatality is criminal homicide, "the responding unit performs a terminal sync capture … emergency fabrication follows under LP-022 queue precedence." Sena returns to her pre-crime state; restoration cost is drawn from the *murderer's* liquidation share first (III.V), ADT absorbing an indigent residual.
- *Charter Article V / IV* — "A citizen may refuse revival — the decision is logged, honored and irreversible" — but LP-063 "regulates the coercer, never the choice."
- *The murderer* — criminal homicide → -3 (Enforcement Chain; Two-Level Moral Causality).
**Ruling:** Two separate perpetrators. The *murderer* goes to -3. *Pell* is evaluated as a coercer: the sustained psychological-coercion campaign is violence-equivalent (-2), and because a genuinely coerced refusal would have made the death permanent, Pell's evaluation proceeds "at the top of the applicable tier." Crucially, LP-065's terminal sync capture *defeats* the scheme's payoff: because the homicide is criminal, Sena is restored regardless of funding, so the estate does not settle on her permanent death. Sena's *own* uncoerced refusal, had it been genuine, would be untouched — but the corpus authenticates the refusal against the coercion channel LP-063 polices.
**Seams exercised:** LP-063 (coercer consequence) ↔ LP-065 (victim restoration that nullifies the payoff) ↔ III.V (restitution from perpetrator share) ↔ Article IV/V (the refusal right the coercion targets). Four instruments interlock; LP-063 and LP-065 were enacted two years apart precisely to close both ends (coercion channel *and* funding-lapse channel) to the same permanent-death outcome.
**Confidence:** medium — least sure whether an *already pre-registered* refusal that predates the coercion campaign is honored despite later coercion; LP-063 regulates procurement of a refusal, and LP-065 honors "pre-registered refusal directives," so a genuine prior directive would still stand and the terminal-sync would not override it. If Sena's refusal was authentically pre-registered before any pressure, the estate *would* settle on her honored choice and only Pell's *attempted* coercion (not a completed procurement) is adjudicated. The facts (campaign to *procure* the refusal) point to procurement, resolving toward restoration — but the pre-existing-directive edge is the soft spot.

---

## Summary Table

| # | Type | Title | Verdict | Controlling instrument |
|---|------|-------|---------|------------------------|
| S1 | Organic | Overtime nurse & the pulse | COVERED | LP-076 (Overtime Premium Protocol) |
| S2 | Organic | Electing down with a nest egg | COVERED-WITH-FRICTION | Charter III.V + Central Banking Authority |
| S3 | Organic | Terminal-born child walks up | COVERED | Charter VIII + LP-068 |
| S4 | Organic | Quiet death in Sanctuary | COVERED | Continuity Integrity Act |
| S5 | Organic | Main visitor defends in -2 | COVERED | LP-047.3 (Visitor Defensive Force) |
| S6 | Organic | Contesting a misread entry | COVERED | Record Contestation Act |
| S7 | Organic | -1 private-detention dispute | COVERED | Private Justice Boundary Act |
| S8 | Organic | Marriage follows a spouse down | COVERED | LP-079 (Cross-Layer Marriage Carry) |
| S9 | Organic | Sanctuary chronic use / phasing | COVERED | Charter XXVI + VII |
| S10 | Organic | District hunting suspension | COVERED | Charter XXVIII.II/III + LP-015 |
| S11 | Pressure | Pre-positioning before filing | COVERED | Charter III.V + Central Banking Authority (24-mo lookback) |
| S12 | Pressure | Spend-down & settlement-staging | COVERED | Charter III.VII + LP-069/LP-070 |
| S13 | Pressure | AGI forks to shed liability | COVERED | LP-077 + LP-064 |
| S14 | Pressure | "Consensual duel" as sport | COVERED | Consent Ceiling Act + LP-021 |
| S15 | Pressure | Cruelty laundered through -3 | COVERED | Status-Based vs. Territorial Jurisdiction |
| S16 | Pressure | Sophisticated ledger spoofing | COVERED | Charter XXV.III |
| S17 | Pressure | Reproductive-tax arbitrage | COVERED-WITH-FRICTION | Charter XXVII + III.V |
| S18 | Pressure | Serial vigilante pattern | COVERED | LP-048.3 + Article XVIII |
| S19 | Pressure | MGD eating the civic floor | COVERED | LP-043 + LP-078 |
| S20 | Pressure | Coerced revival-refusal | COVERED | LP-063 + LP-065 |

**Cluster spread:** Taxation & Rate (S1, S11) · Economy/SCM/Anti-Concentration (S2, S12, S19) · Defense/Force/Visitation (S5, S14, S18) · Technology/Continuity (S4, S16) · Governance/Process (S10) · Justice/Enforcement (S6, S7, S15, S20 — S6/S7 contestation & private-justice, S15/S20 jurisdiction & continuity-coercion) · Population/Family (S3, S8, S9, S13, S17). **Layer spread:** +1 (S4, S9) · Main (S1, S6, S8, S11, S12, S13, S16, S18, S19, S20) · -1 (S2, S7) · -2 (S5, S17) · -3 (S3, S14-adjacent, S15). **Statuses:** residents, elective residents, visitors, minors (S3), foreign-analog and AGI persons (S13).

---

## Ranked findings (most load-bearing first)

**No ⚠ GAP findings.** Every scenario, including the two most adversarial seams, was governed by an existing instrument after the envelope sweep. Two COVERED-WITH-FRICTION findings:

1. **S17 — Reproductive-tax arbitrage during elective -2 residency (FRICTION, most load-bearing).** The corpus defeats the arbitrage by inference — status-persistence (III.V "retains origin-layer status"), no-naturalization-by-proximity (Status-Based Jurisdiction), and the home-address denominator (III.VII) all point to "a birth during elective -2 residency still counts against the Main curve." But no clause states *on point* whether the fifth child is attributed to the Main escalation curve at the moment of birth-in--2, or only via the household's continuing Main-address status. Both readings defeat the exploit, and the only route that genuinely escapes the curve (voluntary permanent -2 residency) is self-punishing. Worth a one-line specification tying replenishment attribution to registered-home-address-at-conception/birth, parallel to the SCM's III.VII denominator rule — but this is a clarification, not a gap: the arbitrage does not succeed under any available reading.

2. **S2 — Elective downward-transfer haircut (FRICTION, minor).** The retention schedule ("10% retained on the first $1M") is a steep *forfeiture* instrument shared between elective transfer and voluntary-permanent liquidation, while the Charter's "must remain economically viable" gloss is written for the *permanent* case. A resident could misread the elective haircut as gentler. The corpus applies the same scale to both via III.V's "same mechanism available to visitors," so the outcome is determinate — the friction is presentational (one schedule serving two very differently-reversible movements), not substantive.

**One soft edge worth flagging (not a verdict-changing finding):** S20's interaction between a *genuinely pre-registered* revival refusal and a later coercion campaign. LP-063 polices *procurement* and LP-065 honors *pre-registered directives*; a directive authentically registered before any pressure would still be honored and would block the terminal-sync restoration. The scenario resolves toward restoration because the facts describe procurement, but the authentication standard distinguishing "genuine prior directive" from "coerced directive dressed as prior" rests on Continuity Integrity authentication rather than an explicit LP-063 timestamp rule.

The corpus held under every attack. The strongest demonstration of the stacked-redundancy design is S16 and S19: in S16 the spoof of envelope one (implant ledger) is detected *only because* envelope two (Secondary Observation) diverges from it; in S19, LP-078 exists precisely because LP-043's trigger collided with the MGD Act's deliberate blindness, and the resolution threads the breach to a single boolean fired only after harm already shows. Those are seams the architecture anticipated and closed at drafting time, not gaps it left open.
