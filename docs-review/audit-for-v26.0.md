A SOUND BASE FOR v26.0 once the two HIGH findings, the MEDIUM findings and the story labels below are applied; two questions about the present day stay with the owner.

# Audit of main at 333d128 (v25.10.2), to set the base for v26.0

Method. Seventeen independent readers, each given the settled canon and the site's own authority order:
- twelve read every live page from scratch (Charter and Code; whitepaper in two halves; register; the descriptive pages in two groups; Academic Resources in three parts; the Academy in two; the record pages);
- two read all 93 story cards for anything current canon rules out;
- three stood where a novelist stands (timeline, people and institutions; daily life and scene mechanics; money, records and the reader path).

I read the two release diffs myself, checked the reviewers' findings against the pages, decided the points where they disagreed, and verified the quotations mechanically against the page text at `333d128`. Line numbers are HTML lines at that commit. Findings only; no site file is changed. check-canon 141/141 and css-cascade pass.

How decisions are marked. Where the Charter, Code, register, whitepaper or the weight of the pages points to an answer, the fix is stated as a decision. **OWNER** is kept for a choice that changes the world's history and that no text leans on. **INVENTION** marks new connective lore, with the commitments it was checked against.

Severity. **HIGH**: a flat conflict, or a reader would state the law or the history wrongly. **MEDIUM**: misleading on a natural reading, with the governing text reachable. **LOW**: imprecision a careful reader would notice.

Two corrections to my own earlier work:
- In the v25.10.0 review (2-C) I said no page states that implants had "no timeline for civilian deployment" in 2026. `roadmap.html:209` says exactly that. The replacement applied at `academy-source.html:1773` is still true, so nothing needs to change.
- My ruling 20 wording ("practice since the Precognition charter") left out the Charter's own dual-key step; see X-12.
- My ruling 18 (interplanetary settlement "in the seller's currency") contradicts the Charter and another Resource; X-4 restores the rule the site already had.

The canon sheet's section 9.3 is not in the repository (I searched `main` and the docs folders), so section 3 covers the items you named plus everything the story sweep found.

---

## 1. v25.10.1 and v25.10.2 (`abdf5cf..333d128`)

All correct. `law-polling.html:1977` now has the window run to "recognition of the status"; `laws.html:919` says LP-002 "defined qualifying roles and set no rate"; `academy-source.html:1773` is as recommended; LP-002 is retitled in all four places (`law-polling.html:341`, `:709`; `laws.html:400`, `:808`); `resources-source.html:1400` carries the reverse-direction sentence. Both PDFs and cache-busters moved. The Resource 20 passage needs one more change, which reverses part of my own ruling 18: see X-4.

---

## 2. Full read — findings by page

Counts across sections 2 and 3: 4 HIGH (A-1, G-1, and the story chips S-1 and S-2), 51 MEDIUM, 55 LOW. Several LOW entries bundle one-line fixes. No finding is against the Charter's own rules; four Charter passages need a gloss on a lower page (K-3, K-5, K-6, W-21).

### 2.1 VMSS Laws (`laws.html`)

**K-1. MEDIUM.** `laws.html:1906` — "a Main Layer murder attempt to -3". The Consent Ceiling Act in the same Code (`laws.html:2425`) gives mutual combat "minimum -2 reassignment for each".
- Replace "a Main Layer murder attempt to -3," with "a Main Layer murder, or an unprovoked Main Layer murder attempt, to -3 (in mutual combat, minimum -2 for each, with -3 still open),".

**K-2. MEDIUM.** `laws.html:1906` — "In -1 the posture is logging-only tracking with no preemptive intervention and slower response than in Main Layer." Read alone it rules out opt-in TIP in -1 (`layer--1.html:66`).
- Replace with: "In -1 the institutional posture is logging-only tracking with no preemptive intervention and slower response than in Main Layer; a resident may still opt in to the Threshold Inhibition Protocol, as in every layer but -3."

**K-3. MEDIUM (Charter gloss).** `laws.html:880` — "Trigger thresholds: $25 billion aggregate UBI-origin savings in -2; $10 billion aggregate UBI-origin savings in -3." The Charter says "that layer's aggregate" (`charter.html:231`); the whitepaper and Systems say per district (`whitepaper.html:921`; `systems.html:291`). Read as written, the figures apply to whole layers of hundreds of millions.
- Replace with: "Trigger thresholds, each measured per district of approximately one million residents (Article III.VII's 'that layer's aggregate' is read district by district, as Article III.VIII states): $25 billion district-aggregate UBI-origin savings in -2; $10 billion district-aggregate UBI-origin savings in -3."

**K-4. MEDIUM.** `laws.html:1024` (LP-047.3) says only what provocation is not. The register entry (`law-polling.html:1750`) says a visitor forfeits protection by initiating the encounter "through physical aggression, credible threat of physical aggression with capability, or direct verbal incitement to violence".
- Replace the provocation sentence with: "Provocation forfeits the protection and is defined narrowly: initiating the encounter through physical aggression, a credible threat of it with capability, or direct verbal incitement to violence; insults, ideological disagreement, social refusal, and freedom-of-speech-protected expression do not constitute provocation."

**K-5. MEDIUM (Charter gloss).** `charter.html:343` gives about 25% leakage for "the formative phases of the 21st and 22nd centuries"; the whitepaper starts at about 90% in 2026 (`whitepaper.html:1592`). The Charter is not edited.
- Append to `laws.html:1824` (The Leakage Accounting Standard): "Article XXIII's figure of about 25% for the formative 21st–22nd centuries is the level its trajectory names for 2150; leakage at the founding (2026) stood at about 90% (Whitepaper §29.1), and the Article's milestones through 2250 now lie in the record rather than ahead."

**K-6. LOW (Charter gloss).** `charter.html:466` shows only the 2026 enactment date, though the page carries the text as amended in 2299.
- `laws.html:615`: replace "the eighth, the Enabling Consolidation Amendment, is the tier’s only success." with "the eighth, the Enabling Consolidation Amendment (2299), is the tier’s only success, and the Charter page carries the text as so amended."

**K-7. LOW.** `laws.html:1906` — "reassignment is immediate, permanent, seals the upward pathway". Add the one exception the glossary now carries: "permanent (save the Supreme Court’s Article XV remedy for verified institutional error)".

**K-8. LOW.** `laws.html:1280` — bare "§10.6". By the Code's own rule (`laws.html:728`) a bare section names no document. Replace with "Whitepaper §10.6".

### 2.2 White Paper (`whitepaper.html`)

**W-1. MEDIUM.** `whitepaper.html:444` (-1 profile) — "Logging-only AI tracking, no preemptive intervention, slower drone coverage."
- Replace with: "Logging-only AI tracking, no institutional preemptive intervention (the failsafe still warns and holds, and a resident may opt in to TIP, as in every layer but -3), slower drone coverage."

**W-2. MEDIUM.** `whitepaper.html:442` (Main profile) — "Acts may complete; victims". It omits the LP-062.2 default that `whitepaper.html:1140` now states.
- Replace "Acts may complete; victims" with "Acts may complete, save sexual assault, which default-on TIP halts unless the actor has publicly disabled that coverage (LP-062.2); victims".

**W-3. MEDIUM.** `whitepaper.html:1449` and the glossary at `:1833` — "The charter's prohibition on terrestrial expansion". The Charter has no such clause; the rule is the Territorial Doctrine in the founding corpus (`laws.html:2228`), and §24.5 itself opens with "a founding-corpus prohibition".
- `:1449`: "The founding-corpus prohibition (the Territorial Doctrine)". `:1833`: "The Territorial Doctrine's prohibition".

**W-4. MEDIUM.** `whitepaper.html:1523` (§26.5) sends a military incursion "to the national defense track under §24.1". Ruling 8 put threats inside the territory under Article XXV.IV (`whitepaper.html:1480`, `:1400`).
- Replace the clause with: "or, when the incursion carries military character (armed vessels, military aircraft, coordinated sovereign-state operations), to the national defense track under Article XXV.IV (LP-005.3), with §24.1's tiers governing the threat while it develops outside VMSS territory."

**W-5. MEDIUM.** `whitepaper.html:1325` (§22.3) — "Implants are technically voluntary. Refusal is permitted and carries no criminal consequence."
- Replace the first sentence with: "Implants are technically voluntary in Main Layer and below; in +1 Sanctuary they are mandatory, and a resident who removes one is phased to Main, not penalized (§15.3)."

**W-6. MEDIUM.** `whitepaper.html:1348` — "Voluntariness is preserved for every citizen who has not crossed the consequence threshold that locks exit". A voluntary permanent resident below Main crossed no threshold, yet exit is closed to them (`charter.html:275`).
- Replace with: "Voluntariness is preserved for every citizen who has not crossed the consequence threshold that locks exit or chosen, through voluntary permanent residency, a layer whose terms close it; for those who have crossed it, the restriction is the consequence, not a breach of the founding principle."

**W-7. MEDIUM.** `whitepaper.html:2048` (glossary, Tax Escalation Schedule) and `:1331` give the replenishment curve no layer scope (`whitepaper.html:960`: +1, Main and -1 only).
- `:2048`, first sentence: "The progressive fiscal penalty governing reproduction beyond the 2.5-children replenishment target in +1 Sanctuary, Main Layer and -1 (§13.2); -2 and -3 carry no reproductive tax and are reached by the treasury-levy cascade instead."
- `:1331`: after "beyond the second" insert "in +1 Sanctuary, Main and -1 (§13.2)".

**W-8. MEDIUM.** `whitepaper.html:1192` — "a Main Layer citizen who visits -2 for decades without filing remains a Main Layer citizen". LP-014 (`laws.html:2540`, ratified 2136) grants some visitors "longer permitted visit durations, reduced pre-approval windows", so a visit has a permitted duration; decades in a lower layer is elective residency.
- Replace "who visits -2 for decades without filing" with "who lives in -2 for decades as an elective resident without filing for permanent residency".

**W-9. LOW.** `whitepaper.html:437` — "Cross-layer movement flows downward only". The Charter's rule is about visitation and elective residency (`charter.html:266`).
- Replace with: "Visitation and elective residency flow downward only — citizens may visit or reside in layers below their placement but not above; upward movement runs only through phasing between Main and Sanctuary and an elective resident's return."

**W-10. LOW.** `whitepaper.html:1100` — "post-intervention evidence capture in Main and below" takes in -3. Replace with "in Main, -1 and -2".

**W-11. LOW.** `whitepaper.html:906` — "then family binding agreements,". Add the Charter's condition (`charter.html:208`): "then family binding agreements made prior to the breach,".

**W-12. LOW.** `whitepaper.html:944` — "The collection mechanics are codified federally as LP-064." Since LP-076 the rate is there too (`laws.html:741`). Replace with: "The collection mechanics and, since LP-076 (2299), the escalation rate itself are codified federally as LP-064."

**W-13. LOW.** `whitepaper.html:950` — "40% (reference baseline)" under the header "Aggregate Effective Tax Rate". Replace with "40% (reference point the curve compounds from, not an assessment)".

**W-14. LOW.** `whitepaper.html:581` credits to §20.1 a quotation whose first words are in the §20 introduction. Replace with: "in §20 and §20.1 (“only loss of domain access”; “no criminal enforcement, no STI impact from the exclusion itself”)".

**W-15. LOW.** `whitepaper.html:933` — "The federal floor still reaches it: UBI, taxation, and the Savings Circulation Mandate on UBI-origin savings." Replace with: "The federal floor still reaches it: UBI, the Primary Job Subsidy, taxation, and the Savings Circulation Mandate on UBI- and subsidy-origin savings." The glossary's Federal Floor entry (`:1818`) takes the fuller form: "The band of law and provision that binds in every layer: federal law enforcement, UBI and the Primary Job Subsidy, taxation and the savings mandate on UBI-origin savings, and the absolute federal laws (Articles XXV.I–III); in -3 it activates only on those laws and the External Force Doctrine (§4.2.1)."

**W-16. LOW.** `whitepaper.html:1537` — "An extension of informal SADs", for communities placed in Main. SADs are Sanctuary-only. Replace with "An extension of Metric Gated Domains (§21)". Same term at `world.html:960` and `why-vmss.html:483`: after "informal SADs" add "(in formal terms, Metric Gated Domains)".

**W-17. LOW.** `whitepaper.html:1336` — "visitor pregnancies". In VMSS usage a visitor is an implanted citizen. Replace with "unimplanted foreign-visitor pregnancies".

**W-18. LOW.** Centurial Domain in the present tense. `whitepaper.html:1266`: "the Centurial Domain (CND), chartered ahead of its first qualifiers, carries in its charter peer support frameworks for existential-fatigue management as a structural feature of the domain". `:1267`: "members, once there are any, can access or ignore". `:1946` (a different domain, which does exist): replace "over long horizons they may concentrate into Lineage Integrity Domains within Sanctuary, high-trust enclaves where genetic purity is institutionally verified" with "many concentrate in the Lineage Integrity Domain within Sanctuary (§20.2), where unmodified genetic lineage is institutionally verified".

**W-19. LOW.** `whitepaper.html:1494` — ambassadors "may visit other layers". -3 is sealed to foreign nationals (`whitepaper.html:1503`). Replace with: "may visit -1 and -2 under standard visitation rules (-3 is sealed to foreign nationals, §26.1)".

**W-20. LOW.** `whitepaper.html:1488` and the glossary's Tier 0 list at `:2054` omit the longevity stack that `:1441` withholds from everyone. Append ", and the longevity augmentation stack" to both.

**W-21. LOW (Charter gloss).** `charter.html:319` has the President appoint justices; `charter.html:328` has "the next-ranked active entity" take the role. Add to whitepaper §7: "The President's appointment of justices follows the legal-interpretation ranking: when a seat opens or a justice is outranked, the President appoints the highest-ranked active entity."

**W-22. LOW.** `whitepaper.html:999` — "STI’s public-signal component (§5.6) responds however the population chooses", beside §5.6's rule that signals amplify a trajectory and do not create one (`whitepaper.html:524`). Append: ", within §5.6's limit that signals amplify a trajectory and do not create one".

**W-23. LOW.** "Satellite-serviced revival" (`whitepaper.html:1626`; `layer--3.html:63`, `:80`). The Charter places -1 and -2 revival in fabrication proxy installations inside those layers (`charter.html:245`). Replace the phrase with "fabrication-proxy revival" in all three.

### 2.3 World (`world.html`)

**D-1. MEDIUM.** `world.html:1044` — "(applicant under processing, diplomatic staff, tourist, elective resident)" and `:1048` — "tourists, elective residents, students". An elective resident is a citizen living in a lower layer and draws UBI (`whitepaper.html:1805`).
- Replace "elective resident(s)" with "foreign long-term resident(s)" in both.

**D-2. MEDIUM.** `world.html:1048` — "Children born to foreign nationals present in VMSS operate under foreign-birth dormant rights (§26.2 whitepaper)". §26.2's dormant rights belong to children born abroad to a VMSS parent (`whitepaper.html:1509`).
- Replace with: "Children born in VMSS to foreign nationals hold the same open eligibility as any applicant and may apply through the standard pathway when they choose; the dormant rights of §26.2 belong to children of a VMSS parent born abroad."

**D-3. MEDIUM.** `world.html:690` says -2 residents "do not travel internationally" and never mentions the one exception (`whitepaper.html:1503`).
- After "and VMSS does not export it." add: "The single exception is tier-equivalent transfer to an allied jurisdiction under reciprocal treaty coordination, which places the resident in that state's equivalent consequence tier: a change of custody framework, not an exit."

**D-4. MEDIUM.** `world.html:659` calls the kill switch and plumes "foundational to its lower-layer containment model" and `:665` speaks of "lower-layer stability without lethal containment". They are national-defense instruments (`whitepaper.html:1084`), and -3 has no daily enforcement.
- `:659`: "…the killswitch or nanobot plume architecture that VMSS holds as its national-defense backstop. Some allies view lethal defense instruments as incompatible with their founding values…". `:665`: "without a lethal national-defense backstop".

**D-5. MEDIUM.** `world.html:429` — "A mega-wall separates every ring boundary", in the present tense. The whitepaper has construction running "from the 22nd through 24th centuries" (`whitepaper.html:1637`) and the Charter has the network "approaching completion" in 2350 (`charter.html:347`).
- After the first sentence add: "Construction began in the 22nd century and is in its final phase: in the early 24th century the outer perimeter and most ring boundaries are walled, and the last segments are still being built." (INVENTION for "the outer perimeter and most ring boundaries", checked against `charter.html:346–347` and `whitepaper.html:1637`; it lets a boundary scene know a wall is probably there.)

**D-6. MEDIUM.** `world.html:1217` — "links every fetus at detection through the mother's implant … but the child lives regardless". The implant is voluntary in Main and below.
- Replace with: "Where the mother carries an implant, backup vessel technology links the fetus at detection, so if a linked pregnancy is terminated, the fetus is reincarnated in Main Layer autoparenting facilities with neutral status and full dignity"; and "but a linked child lives regardless".

**D-7. LOW.** `world.html:661` — "no upward pathway, no parole, no rehabilitation exception"; `join.html:274` — "permanent layer reassignment with no appeal". Add the one exception: `world.html:661` append "save the Supreme Court’s Article XV remedy for verified institutional error"; `join.html:274` replace with "I accept that harm reaching a reassignment threshold results in permanent layer reassignment; the only remedy is the Supreme Court’s Article XV remedy for verified institutional error."

**D-8. LOW.** `world.html:756` — "VMSS does not extradite." Replace with "VMSS extradites no one admitted through intake." (ruling 27).

**D-9. LOW.** `world.html:1059` — "forcefield integration projected for the 29th century". The whitepaper says "from the 28th century onward" (`whitepaper.html:1637`). Replace with "forcefield integration, beginning in the 28th century and projected complete by about 2850,".

**D-10. LOW.** `world.html:1181` — "The implant requirement applies to AGI the same way it applies to humans". Replace with "The implant applies to AGI on the same terms as to humans (voluntary in Main and below, mandatory in Sanctuary)".

### 2.4 Roadmap, Why VMSS, Ascension Domains

**D-11. MEDIUM.** `sads.html:175` to `:177` describe Centurial residents in the present tense ("A resident who has been alive for 600 years has watched…"), five lines after "The domain was chartered ahead of its first qualifiers" (`:170`).
- `:175`: "A resident who has lived 600 years will have watched the civilization’s founding generation age, lived through policy eras that later residents study as history, and carry institutional memory older than most of the infrastructure around them." Put `:176` and `:177` in the same future tense.

**D-12. MEDIUM.** `why-vmss.html:348` — "In return they get freedom from implant monitoring". A Main resident can decline or remove the implant without leaving.
- Replace with: "In return they get freedom from VMSS jurisdiction altogether, including the AR and drone monitoring that observes even unimplanted residents (the implant itself is voluntary in Main and removable without leaving)".

**D-13. LOW.** `why-vmss.html:519` — "-1, where private enterprise dominates and institutional governance has stepped back". That is the glossary's description of -2 (`whitepaper.html:1895`). Replace with "-1, where private enterprise grows alongside a partial institutional presence".

**D-14. LOW.** `why-vmss.html:258` — "It provides the path to standing". Add "within the layer (the ceiling stays sealed)".

**D-15. LOW.** `why-vmss.html:423` — "a headline target of ~25% by 2150". From the 24th century that is history, and `:639` on the same page says so. Replace with "~25% on the headline measure by 2150".

**D-16. LOW.** `roadmap.html:216` — "The 21st century ends with the framework established". Phase 0 ends in 2070. Replace with "Phase 0 closes in 2070 with the framework established".

**D-17. LOW.** `roadmap.html:228` — "inside a citizenry that passes a million by mid-century" (a Phase 1 summary, 2070–2150). Replace with "inside a citizenry that passed a million by the mid-21st century and reaches billions by the 2120s".

**D-18. LOW.** `roadmap.html:483` and `:457` — "350+ years of lived" for a phase that opens in 2500. Replace with "nearly five centuries" and "~500 years of lived".

### 2.5 FAQ, Systems, the layer pages

**D-19. MEDIUM.** `layer-0.html:66` — "SAD memberships lapse only under punitive reassignment or voluntary permanent residency". A resident who phases below 85 loses "the Sanctuary credential" (`layer-0.html:69`) and with it the domains that sit inside Sanctuary (`whitepaper.html:1212`).
- Replace the opening with: "Apart from exclusion for breaking a domain's own metric, or loss of the Sanctuary standing the domains sit within (phasing below 85, or removing the implant), SAD memberships lapse only under punitive reassignment or voluntary permanent residency,".

**D-20. MEDIUM.** `systems.html:420` (heading "Post-Intervention (Main Layer & Lower Layers -1/-2)") — "Non-lethal harm victims receive immediate automated therapy and physical restoration. Perpetrators face immediate layer reassignment based on severity." In -2, "Robbery, beatings and captivity produce no federal response" (`layer--2.html:90`).
- Replace with: "Non-lethal harm victims receive immediate automated therapy and physical restoration where response infrastructure reaches, which in -2 is thin. Perpetrators face immediate layer reassignment based on severity; in -2 only capital harm moves a resident, to -3."

**D-21. MEDIUM.** `faq.html:584` — "A convicted murderer arriving in -3 enters an environment where the voluntary community has already built private consequences, and those consequences are not obligated to be gentle." The layer page says arrivals "receive a functional clean slate on entry" (`layer--3.html:154`).
- Replace with: "A convicted murderer arriving in -3 is not detained for the offense that sent them there (private operators treat the layer itself as the sentence), but finds the voluntary districts closed to them, and any offense on local ground draws private detention and, for a persistent threat, private supermax."

**D-22. MEDIUM.** How fast reassignment happens. `layer-0.html:86` and `layer-+1.html:107` say "within seconds"; the whitepaper makes the legal effect instant (`whitepaper.html:1045`) and times the assessment at "Minutes to hours" (`:1154`).
- `layer-0.html:86`, replace the "within seconds" sentence with: "The perpetrator's reassignment takes effect the instant the act completes; identification and drone transport follow within minutes, and the automated assessment is recorded within hours." Use the same sentence at `layer-+1.html:107`.

**D-23. MEDIUM.** Food in -3. `layer--3.html:61` says "-3 has no institutional supply chain, so everything is privately sourced"; the stamped day-in-life on the same page (`:76`, pre-v5.0) has "automated drops" as "the only reliable source" of food and water; `technologies.html:354` gives the lower layers "fewer automated drops". The Charter's -3 floor (`charter.html:240`) lists no supply. Decision: no institutional food or water in -3.
- `technologies.html:354`: after "fewer automated drops" add "(none in -3)".
- Under the pre-v5.0 stamp at `layer--3.html:71` add: "Doctrine note — the automated food and water drops shown here belong to the stamped version; in current canon -3 has no institutional supply chain and residents buy from private sources."
- Under the pre-v5.0 stamps at `layer--1.html:72` and `layer--2.html:69` (ration pack, drop slot) add: "Doctrine note — ration provision reflects the stamped version; residents now buy food in the layer's economy with UBI."

**D-24. LOW.** `layer--2.html:107` — bailout "where drone rescue cannot reach in time". In -2 captivity draws no federal rescue at all (`:90`). Replace the clause with "which in -2 draws no federal rescue,".

**D-25. LOW.** `layer--1.html:88` — "or forced revival to deny escape through death". Bailout defeats exactly that. Replace with "or forced revival of detainees who do not invoke bailout".

**D-26. LOW.** `layer--1.html:57` — "a citizen with a 500-year lifespan". The stated practical lifespan is 200–300 years (`whitepaper.html:1015`). Replace with "a citizen living out a 200–300-year practical lifespan".

**D-27. LOW.** `layer-0.html:122` — "more amber STI indicators"; the -1 page says "predominantly orange and red" (`layer--1.html:66`). Replace with "more orange and red STI indicators".

**D-28. LOW.** `faq.html:490` and `systems.html:296` — "A base tax rate funds the -3 treasury". The Code defines it (`laws.html:1558`). Add after "A base tax rate": "(the top marginal rate on earnings above $10 million plus corporate remittances; income below the threshold is untaxed in -3)".

**D-29. LOW.** "UBI-origin savings" where the mandate also reaches subsidy-origin savings: `layer--3.html:61`, `faq.html:490`. Replace with "UBI- and subsidy-origin savings".

**D-30. LOW.** `faq.html:583` puts "drone patrols" in an answer about -3, which has none (`layer--3.html:51`). Replace the sentence's subject with: "AR verification at -3's federal floor, private security cameras, and other residents' records".

**D-31. LOW.** `faq.html:459` — "from 90% treasury / 10% retained at under $1 million to 99% treasury / 1% retained at over $1 billion" reads as whole-estate brackets; the Code's scale is "10% retained on the first $1M" (`laws.html:1575`). Replace with: "The schedule keeps 10% retained on the first $1M, scaling down to 1% above $1B (90% to 99% to the treasury)." See L-12 for the marginal rule itself.

**D-32. LOW.** `layer--3.html:125` — "in the civilization's early decades" for an exploit of 2091–2115. Replace with "in the civilization's first century".

**D-33. LOW.** `layer--3.html:151` — "incoming residents from -2". Capital offenders arrive from every layer. Replace with "from the layers above".

**D-36. LOW.** `layer--3.html:108` — "after Council certification of an upper-layer version". No page defines a Council, and `llms.txt` tells readers not to infer one. Replace with "after regulatory review of an upper-layer version (Article XXVIII)".

### 2.6 `llms.txt` and the trust console

**D-34. LOW.** `llms.txt` labels `laws.html` "Tier 2" in its authority list, while the Code calls itself "secondary authority" (`laws.html:305`) and uses "Tier 2" for federal law (`laws.html:711`). After "Tier 2." add "(a consolidation: where it and an enacted register entry differ, the entry controls)".

**D-35. MEDIUM.** `assets/js/sti-sim.js:522`. For a violent act in Main the console prints "The failsafe warned as intent built; the citizen overrode it." For the "Predatory violence" option (sexual violence) that ignores Main's default-on TIP (LP-062.2).
- For ring `'0'` and act `predatory`, print instead: "Default-on TIP against sexual assault had been publicly disabled beforehand (LP-062.2); only the failsafe stood in the way, and the citizen overrode it."

### 2.7 Law Polling (`law-polling.html`)

**G-1. HIGH.** LP-005.2 against LP-005.3. `law-polling.html:858` gives the lethal-response ladder to "26+ operationally coordinated actors, or any formation with military-grade armament tier or hostile-state attribution regardless of headcount". The entry that superseded it says the opposite about how it worked: `law-polling.html:888` — "small formations of professional operators with military-grade equipment were mis-classified into the reassignment-first path", and LP-005.3 "replaces the 26-actor threshold". The Code agrees with `:888` (`laws.html:937`: "this statute’s actor-count threshold"), and so does the story The Classification Failure. With the parenthesis in place, the failure LP-005.3 was enacted to cure could not have happened.
- `:858`: delete ", or any formation with military-grade armament tier or hostile-state attribution regardless of headcount", so the tier reads "Large-coordinated incidents (26+ operationally coordinated actors) retain the original XXV.IV immediate-lethal-response ladder without modification".

**G-2. MEDIUM.** LP-069, `law-polling.html:2318` contrasts Sanctuary's cap with Main's attribution and never says where attribution reaches. Ruling 25 is in the Code (`laws.html:878`) and not in the primary record.
- After "to match its consequence-priced one." add: "As enacted, the attribution provisions reach Main Layer and +1 Sanctuary only; carrying them to -1 would take a new filing."

**G-3. MEDIUM.** `law-polling.html:1449` records a "full Article XXV.VI federal ratification … reached in R11’s case in 2119", and the register has no entry for it, though `:281` says every federal law carried to a disposition is recorded.
- `:281`, after "is recorded here" insert: "(Tier III capstone adoptions under LP-039, such as R11’s in 2119, are recorded within LP-039 rather than as entries of their own)".

**G-4. MEDIUM.** LP-082 and a Sanctuary traveller. The enacted entry's own case is "a Sanctuary visitor’s home-configured inhibition" (`law-polling.html:3304`), and the rule has the gate "present the configuration step" to her (`:3305`). The whitepaper glossary allows a Sanctuary resident only one adjustment, the bout (`whitepaper.html:1814`). Enacted law governs: the step exists for her too.
- `whitepaper.html:1814` (glossary, Failsafe), after "where TIP's inhibition layer is mandatory" add: "(a Sanctuary resident travelling below Sanctuary may take the gate's configuration step so that her inhibition does not suppress lawful defensive force there, LP-082)".

**G-5. LOW.** One-line fixes.
- `:631`: "the pathway back does not exist because" → "the pathway back does not exist, save the Supreme Court’s Article XV remedy for verified institutional error, because".
- `:282`: "a consolidation, and secondary authority under the same rule" → "a consolidation, which is not among LP-042’s primary sources and classifies itself as secondary authority".
- `:2229` (LP-067, a Failed entry): "Superseded by LP-067.2 ." → "Redrafted as LP-067.2 ."
- `:552`: "Refined-child iteration is anticipated: the unimplanted-pregnancy gap remains a live architectural question" → "Refined-child iteration was then anticipated, the unimplanted-pregnancy gap remaining a live architectural question; no such filing has reached a disposition in this register."
- `:2902` (casinos): "with -3 unrestricted under existing Colosseum frameworks" → "with -3 unrestricted as part of its frontier economy".
- `:1573`: "Whitepaper §10.3 (-3 Governance)" → "Whitepaper §10.3 (Regulatory Law & District Governance)".
- "SCOTUS" at `:518`, `:520`, `:2010`, `:2029` → "Supreme Court". It is the United States court's name.
- One Meritboard body under three names: "Continuity-Architecture Panel" (`:1395`), "continuity-architecture division" (`:2523`), "continuity-administration division" (`:2619`). Use "Continuity-Architecture Panel" in all three.

### 2.8 Academic Resources (`documents/resources-source.html`; regenerate the PDF)

**X-1. MEDIUM.** Resource 12, `resources-source.html:481` — "Stage 1 (sanctions Tier 1, Diplomatic Friction): restriction on specific non-strategic exports." Sanctions Tier 1 is the standing baseline of every non-aligned state and restricts technology, not ordinary goods (`whitepaper.html:1436`).
- `:481`: "Stage 1 (sanctions Tier 1, Diplomatic Friction; the standing baseline of every non-aligned nation, Whitepaper §24.4): technology export restrictions, with medical-system upgrades withheld and infrastructure contracts suspended. Trade continues on standard terms for non-restricted categories."
- `:480`, first sentence: "Sanctions follow the three tiers of Whitepaper §24.4 rather than a binary of full trade or no trade."

**X-2. MEDIUM.** Resource 15 is the only founding-era Resource without a Doctrine note, and it says VMSS military capability "had matured sufficiently" by 2046 (`:715`), that "By 2100 the asymmetry had inverted" with "an implant kill switch that covered its own population" (`:739`), and that the "contested era" was 2026–2046 (`:822`). World has the wars come "once the founding guarantees lapsed, against a civilization … whose military capability had not yet matured" (`world.html:459`).
- Under the Resource 15 title add: "Doctrine note — Deployment dates for implants and the Five Instruments, and the sunset dates tied to them, should be read against the Roadmap’s Phase 0 and Phase 1."
- `:715`, replace the tail from "reflecting the point" with: "reflecting the date the treaty fixed for the guarantee to lapse; VMSS military capability had not yet matured when the guarantees lapsed (World, Era II)."
- `:716`: delete ", so capability maturation and doctrinal freedom arrived together".
- `:822`, first sentence: "The contested era, as these Resources use the term, was the twenty-year founding window (World’s Era I, Founding) during which VMSS could have been destroyed; the wars of World’s Era II followed the lapse of the guarantees."

**X-3. MEDIUM.** Resource 14, `resources-source.html:666` lists "the full extent of Nunavut" and northern "Quebec" among the ceded land. Both lie partly or wholly east of Hudson Bay, the stated eastern boundary (`:679`).
- Replace with: "The ceded territory comprised the Northwest Territories and Yukon and the mainland of Nunavut west of Hudson Bay, together with the northern portions of British Columbia, Alberta, Saskatchewan, Manitoba, and Ontario." At `:683` delete "Quebec" from the provinces that kept part of their territory.

**X-4. MEDIUM.** Resource 20, `resources-source.html:1400`, has the central bank retire a Main purchaser's currency and issue the seller's on each sale. That sentence came from my ruling 18, and it is wrong: it creates a conversion channel the Charter does not have (`charter.html:203`: downward conversion "only through authorized downward channels", with a forfeiture), and Resource 29 states the actual rule (`resources-source.html:2664`: "cross-layer goods trade settles in the destination layer’s currency … rather than through currency exchange"). Decision: restore that rule here.
- Replace the first three sentences of `:1400` with: "Interplanetary commerce at commercial scale settles as cross-layer trade does on Earth: in the currency of the layer where the goods are delivered, at prices adjusted for the purchasing power gradient, with no currency exchanged. A Lumen firm selling mineral output to an Axis purchaser is paid in Main Layer currency, which it can spend only in the Axis economy; a sale in the other direction is paid in Lumen’s currency on the same terms."
- `:2665` (Resource 29) — "goods-for-goods or goods-for-foreign-currency basis, with the central bank as the counterparty: it absorbs foreign currency". The Code has trade "goods-based" and the currency "inconvertible externally" (`laws.html:1574`). Replace with: "International trade runs on a goods-for-goods basis on published, treaty-differentiated terms, and foreign nationals cannot acquire VMSS currency."

**X-5. MEDIUM.** Centurial Domain as a lived community: `resources-source.html:2288`, `:2314`, `:2433`, `:2434`.
- `:2288`: replace "Centurial Domain (CND) membership" with "Non-Attachment Zone (NAZ) membership".
- `:2314`: "The long-duration SADs (FAD, Creative Output Domain with sustained multi-century output) function as living archives of the residents who persisted at their thresholds; the Centurial Domain, chartered ahead of its first qualifiers, will do so once residents reach five centuries."
- `:2433`: "whose residents share" → "whose future residents will share".
- `:2434`: "The Centurial Domain, chartered ahead of its first qualifiers, is one institutional response in waiting: a community for the very old, which no resident has yet lived long enough to join."

**X-6. MEDIUM.** `resources-source.html:2631` — "The layer -1 sociology acknowledges" bailout. Bailout is the -2 study's subject (`:2228`; `whitepaper.html:1081`). Replace with "The -2 sociology (Resource 22) acknowledges".

**X-7. MEDIUM.** Resource 31, `resources-source.html:1484` — "Book II treats it as the load-bearing doctrinal shift". Book II's own innovation is "the consent-as-metric gate criterion" (`:1554`).
- Replace with: "This reframing made the SAD deployment model coherent with Articles XII and XIII: the detection is a signal for an operator’s judgment, which is the design Book II’s charter adopts (Clause Five). Book II’s own load-bearing innovation is the consent-as-metric gate."

**X-8. MEDIUM.** Resource 32, `resources-source.html:1590` — "3 produced intervention that did not prevent initiation". The three cases are then filed as prevented conduct (`:1576`).
- `:1590`: "Of the 174 operator engagements, 171 resolved the pre-act state through engagement alone; 3 did not, and required TIP-equivalent physical interruption before any act began." `:1591`: "171 record interventions resolved by engagement alone and 3 record interventions that required TIP-equivalent interruption before any act began."

**X-9. MEDIUM.** Resource 22, medical help and the guarantee of life.
- `resources-source.html:2205` — "no federal drone arrives" for sub-capital harm, against "thinner and slower coverage in -1 and -2" (`whitepaper.html:1141`). Replace with: "Federal medical drones still respond to harm victims, thinly and slowly; enforcement drones do not respond to sub-capital harm."
- `:2245` — the Charter guarantees "that their life will not be permanently taken". Revival needs a funded vessel. Replace with "that a funded resident's life will not be permanently taken, and that a homicide victim within enforcement reach is restored regardless".
- `:2214` and `:2205` say federal enforcement responds "only to killings". The line is capital harm. Replace "killings" with "capital harm (a killing or another capital act such as child rape)".

**X-10. MEDIUM.** Vessel upkeep, Resource 28, `resources-source.html:2623` — "funded by economic flows the resident does not typically manage", in "a fabrication proxy installation somewhere". Upkeep "is not guaranteed as a free entitlement" (`whitepaper.html:1051`), and proxies exist only in -1 and -2.
- Replace with: "A backup vessel sits in an institutional fabrication facility (Main, +1) or a fabrication proxy (-1, -2), maintained by fees the resident pays."
- `:2598`: "The vessel is fabricated from feedstock and assembled at the proxy installation" → "The vessel is manufactured in Main or Sanctuary and held, finished and activated at the proxy installation" (`charter.html:245`).

**X-11. LOW.** One-line fixes.
- `:596`, after "after punitive reassignment" add "(the one exception being the Supreme Court’s Article XV remedy for verified institutional error)".
- `:603`, in the parenthesis add ", and -3 residents do not leave".
- `:673`: "or transition to elective residency within VMSS" → "or continued residence in VMSS as a foreign long-term resident".
- `:1097`: the quotation “at or above human cognitive level” → “at or above human level” (`whitepaper.html:1342`).
- `:1256`, `:1259` (post-3000 technology in the present tense): "Once it exists, temporal observation will eliminate that uncertainty. A sensor able to reconstruct past events at forensic fidelity will be able to verify what every founding-era entrant actually did before receiving an implant."; "can now be observed" → "could then be observed".
- `:1450`: "across tens of millions of citizens" (in the 2160s) → "across billions of citizens".
- `:1555`: "the Relational Integrity Layer gates on a record free of infidelity or major relational deception, the Cognitive Clarity Domain on a record free of cognitive distortions or irrational belief patterns" (`sads.html:63`, `:81`).
- `:1690`: "Book I’s handoff section" → "Book II’s handoff section".
- `:1953`: "The leakage framework (Charter Article XXIII, Whitepaper §28) names the failure categories (§28.1) and weights them (§28.2: backup vessels ~25%, implant ledger ~20%, autonomous enforcement ~20%, physical boundary 15%, pre-intervention 10%, supporting systems 10%). The atlas regroups these into six categories and maps every technology dependency within and across them."
- `:2023`: "…runs from materials science breakthrough → mega-wall construction → forcefield emitter integration, and the forcefield reaches full coverage only once Dyson swarm energy arrives."
- `:2298`: "because most residents" (of a 32.5% figure) → "because many residents".
- `:2538`: "By his fifth decade" → "By his early fifties" (`layer--3.html:185`: "He is 51 now").
- `:2668`: "sever upper-layer citizenship entirely" → "relinquish origin-layer status entirely"; "keep upper-layer citizenship" → "keep origin-layer status".
- `:2752`: "§17 backup integrity protections, and the Tier 3 classification of conduct that destroys vessels" → "the revival guarantees of §17, and the murder classification of §22.6".
- Quotations that do not match their source: `:1759` → "The whitepaper (§4.3) states: “environmental separation between layers is complete, not merely social or institutional.”"; `:1765` → "The technologies page states: “When the forcefield arrives, the mega-wall becomes its foundation rather than obsolete.”"; `:1730` and `:1771`: drop the quotation marks and the "simulation archive" attribution, since no story carries those words.

**X-12. LOW.** Resource 32, `resources-source.html:1557`. My ruling-20 sentence omits the Charter's dual-key classification, which every regulatory petition already passed (`charter.html:283`).
- Replace with: "Article XXVIII itself asks only for signatures, an expert-panel draft and ratification, with the Charter’s dual-key classification (Meritboard and Supreme Court concurring that the petition is regulatory) before drafting; the advance vote and advisory review entered because this charter required substantive constitutional review, and later petitions kept both as practice."

**X-13. LOW.** The three group stamps at `:289`, `:300`, `:311` ("World of VMSS Doctrine Snapshot · v18.8" and the like) sit over text that has been reconciled to current doctrine, and read like the stories' era-pinned stamps. Replace each with: "Reconciled to current doctrine except where a Doctrine note says otherwise".

**X-14. MEDIUM.** The Doctrine notes on Resources 14, 16, 17 and 18 ask the reader to "read against" other pages. For a novelist that is too soft: the dated events under them read as usable history. Say what is not canon.
- Resources 14, 16, 18: "Doctrine note — Superseded dates: mega-wall construction runs from the 22nd through the 24th centuries (Whitepaper §18.3, §29.2), and the founding decades built no wall. The construction years, workforce figures and completion percentages in this Resource are not canon."
- Resource 17 (and the second sentence of Resource 18's): "Doctrine note — Superseded dates: there were no civilian implants and no kill-switch use in the 2020s–2030s (Roadmap Phase 0). The 2032 activation and the 2038 plume deployment described here are not canon; the 2026–2046 guarantor window, the threat categories and the 2034–2036 consultations stand."

### 2.9 The Academy (`documents/academy-source.html`; regenerate the PDF)

**A-1. HIGH.** Q04, `academy-source.html:535` — "The range is 0 to -3 based on your record. A clean applicant gets offered 0 to -3. Someone with a fraud history gets offered -1 to -3. Someone with violent convictions gets offered -2 to -3." This is rubric text, and it states intake law the Code rules out: one projected placement, and no one below Main on foreign evidence alone (`world.html:719`; `laws.html:2392`). The PhD tier of the same question says "You don't choose your placement" (`:538`).
- `:535`: "Important Framing: The offer is personalized, and it is one projected placement, not a menu. A clean applicant is placed in Main. A credibly documented foreign criminal record informs placement, but foreign evidence alone places no one below Main; a lower placement waits on VMSS's own evaluation, and the applicant is told the projected placement before accepting (Whitepaper §26.2). The placement IS the system's judgment of you. You choose whether to accept it and whether to take the implant; afterwards Article VII lets a citizen live in a layer below their own by elective residency (origin status kept) or voluntary permanent residency (irreversible)."
- `:536`: "the range is personalized" → "the placement is personalized".
- `:539`: "receives an offer of -2 to -3" → "is told a projected placement of -2 or -3 after VMSS's own evaluation"; "receives 0 to -3, chooses -3 in front of the room" → "is placed in Main and says they would file for voluntary permanent residency in -3".

**A-2. MEDIUM.** Article V cited for non-public cognition (`:1171`, `:1184`, `:1186`, `:449`). The rule is Article II (`charter.html:168`).
- `:1171`: delete " · Article V (Rights — cognition carries no penalties)". `:1184`, `:1186`, `:449`: "Article V" → "Article II".

**A-3. MEDIUM.** Q22 B-grade, `:1186` — "Article XXI says the implant record is non-repudiable", in an answer the commentary calls doctrinally grounded. Article XXI is the Supreme Court.
- Add: "Graders should mark the citation: the non-repudiable-telemetry rule is the Ledger Integrity Act in the Code, not Article XXI, which governs the Supreme Court."

**A-4. MEDIUM.** Q33 rubric, `:1861` — "The breach itself is a federal-level offense", the claim the grader note at `:1853` marks as wrong.
- Replace with: "The breach itself is answered under Article XIV’s proportional response, and a physically successful crossing leaves the breacher in a worse layer placement than their original position."

**A-5. MEDIUM.** Q32 B-grade, `:1792` — "The mega-wall construction program begins" in Phase 3 (2060–2076), unmarked.
- Add: "Graders should mark the B brief’s claim that the mega-wall construction program begins in Phase 3 (2060–2076): the mega-walls are a 22nd-to-24th-century build, and the founding population reaches only about a million by mid-century."

**A-6. MEDIUM.** "Article XX’s transparency requirement" (`:1387`, `:1802`; also the Q25 stem at `:1357` and anchor at `:1365`). Article XX is System Accountability (`charter.html:314`); open publication is Whitepaper §22.2; and no text makes the President seek Court authorization to classify a report.
- `:1387`: "The student who says “classify the report — don’t let the Kessari know.” Whitepaper §22.2 publishes the framework openly and withholds only military operational specifics, and Article XX requires review, correction and public assessment; classifying a Meritboard engineering report to hide a failure would breach both. The only Charter-level suspension power is the Supreme Court’s, for verified civilizational emergencies, and it is temporary and auto-expiring."
- `:1802`: "This violates §22.2’s open-publication rule, Article XX’s mandate of review and public assessment, and the civilization’s foundational claim that its architecture survives scrutiny."
- `:1357`: "Article XX demands transparency" → "Whitepaper §22.2 demands open publication and Article XX demands review and correction". `:1365`: "Article XX (Transparency)" → "Article XX (System Accountability) · Whitepaper §22.2 (open publication)".

**A-7. MEDIUM.** Q31 A-grade commentary, `:1737` — "The fiscal adjustment mechanism is composable from existing Charter principles (Article III.III proportional benefit) without creating new authority." Article III.III "reaches no rate" (`charter.html:197`).
- Add: "Graders should mark the A brief’s fiscal adjustment: Article III.III scales taxation by layer and reaches no rate, the schedule is federal law set only through the Article XXV.VI ladder, and UBI is untaxed, so a levy aimed at one coalition’s districts would be a new federal law of general application, not an existing power."

**A-8. LOW.** One-line fixes.
- `:481`: "there is no path back up" → "there is no path back up, bar the Supreme Court's Article XV remedy for verified institutional error".
- `:568`: "Article IX says SADs are state-chartered" → "Whitepaper §20.1 says SADs are state-chartered".
- `:777`: "the §9.8 regulatory evolution cycle" → "the §10.2.1 regulatory evolution cycle" (the whitepaper has no §9.8).
- `:1486`: "The regulatory-versus-federal question (Article XXVIII vs Article XXV) is the correct institutional framing; dual-key classification applies only if the proposal would alter the conditions of a layer boundary, and then it sorts the regulatory route (Article XXVIII) from the structural one (Article XI)."
- `:1780`: "Article XXIII (Zero Leakage Aspiration — trajectory to 0.01%) · Whitepaper §29.1 (starting leakage ~90% in 2026)". `:1788`: "Article XXIII publishes the leakage trajectory; Whitepaper §29.1 publishes the 2026 starting rate and the delivery percentages."
- Q24 and Q25 stems (`:1286`, `:1357`): the forcefield is "years from deployment" with no date, beside pages that speak from the 24th century and put prototypes in the 2750s (`whitepaper.html:1605`). Add to each stem: "(Scenario date: the 2780s.)"

### 2.10 Record pages

No finding touches a vote, rate, date or threshold. Nine small items:

**P-1. LOW.** `pending-ratify-tax-50-rulings.html:158` — "This methodology names eight residues"; the Register adopted with it engraves twelve (`path-2-risk-register.html:117`). The rulings are verbatim documents, so add a note under the ruling, not inside it: "Note — the ruling counts the eight residues of the Charter text (RR-1 to RR-8); RR-9 to RR-12 were engraved when the §10.4 Schedule was adopted with it." The same note covers "resolved fifty-nine" (`:157`): the Register's status codes mark 49 findings cured and 13 mitigated or accepted.
**P-2. LOW.** `deregistered-statutes.html:172` says the whitepaper carries the words "endorsed 5–0"; they are on `rate-history.html:262`. Replace with: "It folds into the whitepaper as the Trajectory Doctrine (Whitepaper §12.1), and its in-world provenance reads plainly in the Rate-History Record: endorsed 5–0 across the ratification chambers."
**P-3. LOW.** `path-2-certification-2294.html:53` — "2300: Current canon operates at 50 / 25 / 12.5 / 6.25". Replace with "2295 onward: The 50 / 25 / 12.5 / 6.25 cascade remains the operative schedule".
**P-4. LOW.** `pending-ratification.html:151` — bare "§12.1" → "Whitepaper §12.1".
**P-5. LOW.** `pending-ratify-tax-50-record.html:179` still reads "Y112 = 2213 places Y0 at 2101", disclaimed only at the head of the page. Prefix the paragraph: "[Superseded: Y0 is 2026. See the note at the head of this page.]"
**P-6. LOW.** `rate-history.html:216` — "the Foundation/Confiscation split at Y11" → "between Y11 and Y12".
**P-7. LOW.** `rate-history.html:261` — "the v14.5 transition" dates an in-world event by a site version. Replace with "the Y47 transition (2073)".
**P-8. LOW.** `rate-history.html:223` — "The founding-era record numbers the civilization at roughly one million citizens … At that scale a single blunt rate on accumulated wealth was sufficient". The register puts the million in the layered-schedule era, Y12–Y46 (`law-polling.html:2401`). Replace the first and last sentences with: "The register numbers the civilization at roughly one million citizens in the layered-schedule era (Y12–Y46)." and "The founding cap before it served a population of thousands, where one blunt rate on accumulated wealth was sufficient."
**P-9. LOW.** `rate-history.html:216`: the fiscal "Consolidation Era" (Y47–2294) shares a name with World's Era III. Add: "The fiscal era names are the register's own and do not coincide with the four historical eras of World."

---

## 3. Stories and the section 9.3 items

The sweep read all 93 cards. Six are already chipped. Sixty-five are clean. Story text under a stamp is not rewritten below; every device is a chip or a one-line note under the stamp.

### 3.1 Off-canon chips (two new)

**S-1. HIGH.** Abena Kwarteng (`simulations.html:5392`, v15.8). The premise is first-person implant recordings of the 2026 signing and "the first fifty years of civilizational operation" (`:5400`, `:5403`). Canon has no civilian implants in the founding decades.
- Chip, with the comment: "Off-canon: the story shows first-person implant recordings of the 2026 Treaty signing and of the first fifty years; the record has no civilian implants in the founding decades."

**S-2. HIGH.** The Wider Door (`simulations.html:2402`, v16.3). "Sixty years after the Founding Treaty" (2086) it shows a VMSS of "4.3 billion" (`:2425`), fourteen allies already running implants and vessels, and a kill switch in VMSS's first-decade offer (`:2416`).
- Chip, with the comment: "Off-canon: set sixty years after the Founding Treaty, the story shows a 4.3-billion VMSS, fourteen allies already running implants and backup vessels, and a kill switch in VMSS's first-decade offer; the record has about a million citizens at mid-century, billions only by the 2120s, and no civilian implants or kill switch in the founding decades."

### 3.2 Doctrine notes (five)

**S-3. MEDIUM.** The Deathless Gold Rush (`simulations.html:3216`, v17.4). A vessel-backed visitor revives out of -3 (`:3227`), and its ladder ("Two earlier drafts failed, one at the Meritboard floor with 58% … one at the Supreme Court with 5/10", `:3293`) is not the register's.
- "Doctrine note — this story is set before Backup Vessel Parity; in current canon no vessel link crosses the -3 boundary, and the register records that ladder differently (LP-004 failed at Sanctuary in 2111; LP-004.2 was enacted in 2115)."

**S-4. MEDIUM.** Osama Bin Laden (`simulations.html:4145`, pre-v5.0). "intent plus organized execution planning had crossed the criminal escalation threshold. Reassignment to -3 Terminal was immediate." (`:4165`). The Code triggers "never on thoughts, desires, or planning" (`laws.html:1661`).
- "Doctrine note — in current canon reassignment to -3 follows an executed capital act, never planning alone."

**S-5. MEDIUM.** Mike Tyson (`simulations.html:4332`, v9.0). "The TIP engaged only partially and slowed the act without stopping it entirely" (`:4364`).
- "Doctrine note — in current canon the Threshold Inhibition Protocol halts the act before it completes and cannot be pushed through; the partial engagement shown here belongs to the stamped version."

**S-6. MEDIUM.** The Recovery Gradient (`simulations.html:2141`, v16.2). An ally "founded twelve years after VMSS, with 1.6 billion people in five rings" (`:2149`) runs the full implant and enforcement stack in its third year, about 2041.
- "Doctrine note — the ally's founding 'twelve years after VMSS' and its full implant-and-enforcement stack in its third year are this story's timeline; the record has no civilian implants in the 2030s and only failing first-generation vessels from the late 2050s."

**S-7. LOW.** Claire Bellingham (`simulations.html:4780`) and Noemi Vassilakis (`:5460`) call Main communities "an informal SAD".
- Under each stamp: "Doctrine note — communities of this kind are Metric Gated Domains; Selective Ascension Domains exist only in Sanctuary."

### 3.3 Leave

- **The Classification Failure** (`simulations.html:906`). It follows LP-005.3's account. Fix the register (G-1) and the story needs nothing.
- **The Severance Show, The Saurian Park, The Immortal Influencer, The Fixer's Ledger.** Each shows a vessel-backed visitor in -3 and each says in its own text that parity "had not yet passed". The register dates that state to before 2115. Leave.
- **The real-person counterfactuals** (Elon Musk, Steve Jobs, Nelson Mandela, Keanu Reeves, Donald Trump). The section frames them as how a figure "would behave under VMSS rules". Leave; they are thought experiments and nobody will read them as history.
- **The Elected Ring, The Open Ring, The Human Bench, The Living Laboratory.** Allied stacks with no calendar year. Leave. If any is ever dated to the 21st century it needs S-6's note.
- **The Parity Enactment** (already chipped). Its comment could add that "cleared its Article XXV.VI ladder in 2111" (`:860`) differs from the register's 2115.
- **Passing details** under their stamps: Gray Kilometers ("A killing anywhere in -2"), The Blind Challenge (a fourth review in a thirty-seventh year), Iara Voss (a rotating Chief Architect, set in Year 626), The Timing Cartel.

### 3.4 The other items you named

- **`sti-sim.js`, "Predatory violence".** Fix: D-35.
- **`rate-history.html:229`** (the Sera Voss card "keeps roughly $60M, with the 70% top marginal rate"). Leave. The paragraph above it (`:227`) says these cards are "pinned artifacts of that stratum" and "never revised to track the schedule".
- **`laws.html:2474`.** Correct as it stands since v25.9.11 ("Selective Ascension Domains are metric-gated voluntary membership domains, not governance entities"). If the sheet's concern is that private MGDs do govern themselves, the entry already confines itself to SADs. Leave.
- **Quoted Academy answers.** Handled by grader notes: A-3, A-5, A-7 above, with the notes already in place at Q21, Q23, Q26 and Q33.

### 3.5 Continuity among the stories (for the books, not for the site)

The stories disagree with each other in places the stamps do not explain. None needs an edit; a novelist should not treat them as one continuity.
- Presidents: Amara Solis and Idris Mwangi appear only in stories set centuries ahead.
- Main's STI band: the chipped Kanye West card says "the Main band's 70 floor"; unchipped cards have Main residents at 52 to 58.
- Filing for a visit is "instantly" in one card and "three days" with screening in another.
- Allies number fourteen in The Wider Door and "over twenty" in The Living Laboratory.
- Currency names: stories call Main's currency "Baseline Credit" and -3's "Terminal Layer tokens"; the Charter's names are in L-11.
- Names recur for different people: five Vosses, three Amaras, ARIA-7 beside Justice Aris-7.

---

## 4. Lore coherence for the books

Each item says what a novelist needs, what the site now gives, and the sentence that would state it once. **RESTATEMENT** combines what the pages already say. **INVENTION** adds a fact; the commitments it was checked against are listed. **OWNER** is left for two items only.

### 4.1 The timeline, 2026 to now

What the site gives is a register dated to the year, a rate history, and a World page whose four eras carry no dates. A writer can place a law but not a decade.

**L-1. Dated eras (INVENTION, following the lean).** `world.html:452–469` names Era I Founding, Era II Contested Period, Era III Consolidation and Era IV Superpower. Add dates to the four headings:
- "Era I · Founding (2026–2046)"; "Era II · Contested Period (2046 to the late 21st century)"; "Era III · Consolidation (the 22nd century)"; "Era IV · Superpower (the 23rd century to the present)".
- Checked against: `world.html:459` ("Wars fought, once the founding guarantees lapsed"); the guarantor window of 2026–2046 in Resource 15 (`resources-source.html:822`); `world.html:479` (Consolidation is when "Wall construction advanced", and the whitepaper starts the walls in the 22nd century); LP-005.2 (2105) and LP-040 (2107), which already assume a settled perimeter and treaty allies.
- Not decided: the adversary and the date of "the final serious external military confrontation" (`world.html:479`). Leave it unnamed; a book that needs it should ask the owner.

**L-2. The founding ally and the territory (RESTATEMENT, promoted from Resources 14 and 15).** No page above tier 5 names either. Add to `world.html`, in the founding section: "The territory is the former northern part of Canada, ceded under the Founding Treaty; Hudson Bay, its eastern boundary, remained Canadian. The founding ally is the United States, the treaty's guarantor until 2046, which sits outside the Federation Treaty."
- Sources: `resources-source.html:666`, `:679`, `:707`, `:715`; `world.html:477`, `:485`.

**L-3. When the layers began (RESTATEMENT).** Add to `world.html`, Era I: "The five layers were laid out as territories after the cession, were administered as layers with their own tax bands from 2038 (LP-072), and voted as separate ratification tracks no later than 2061 (LP-038). They became walled rings only from the 22nd century."
- Sources: `law-polling.html:2401`; LP-038 (filed 2061); `roadmap.html:282`; `whitepaper.html:1637`.

**L-4. When implants arrived (INVENTION).** The whitepaper says only "When civilian deployment began" (`whitepaper.html:1325`). The register's earliest entry, filed in 2061, already assumes implant notification and stale-backup revivals. Replace the opening of that sentence with: "Civilian deployment began in the 2050s, alongside the first trial vessels; first-generation opt-in ran at approximately 70–80%, reaching ~86% by the tenth year of deployment."
- Checked against: ruling 2 (none in the 2020s–2030s); `roadmap.html:209` and `:215`; LP-038 and LP-038.2 (2061–2066); `world.html:479` (deployment became civilization-wide only in the Consolidation).

**L-5. When revival became reliable (INVENTION).** Add to whitepaper §17.1: "Revival became reliable in the last decades of the 21st century; the first-generation vessels of the late 2050s failed often."
- Checked against: `law-polling.html:283`; `roadmap.html:279`; LP-006 (2091–2093), which already treats vessel-backed visitors as near-deathless.

**L-6. How the population grew (INVENTION).** Add to `world.html`, between Eras II and III: "Mass intake ran from the 2070s to the 2120s. By the late 2120s the population stood near its present size, and the layer figures have moved little since."
- Checked against: LP-072 (about a million through 2072); LP-001 (Sanctuary 300 million in 2118); LP-024 (Main 3 billion in 2127); today's 4.3 billion (`world.html:400`).

**L-7. The founders today (RESTATEMENT with one qualifier).** `whitepaper.html:413` and `:1016`, `technologies.html:228` and `world.html:1225` have "the founders are still alive" and a justice "present at the Founding Treaty". An adult of 2026 would now be over 300, past the stated practical lifespan of 200–300 years.
- `whitepaper.html:413`: "when the founders are still alive" → "while members of the founding generation are still alive". At the other three, replace "present at the Founding Treaty" (or "who was present at the Founding Treaty") with "who was a child of the founding generation".
- This keeps the argument (living memory) and stops a book from seating a 310-year-old signatory on the Court.

**L-8. The present (OWNER, two items).**
- **Who is President now.** No page names any President after the Chief Architect. The Charter gives the mechanism in full (`charter.html:328–335`). A book set in the present needs a name; only the owner can supply it.
- **Where the federal institutions sit.** No page says. *Recommend:* "The Presidency, the Meritboard and the Supreme Court sit in Sanctuary, at the centre of the rings on Great Slave Lake." (Resource 14 centres the rings there, `resources-source.html:677`.)

**L-9. Quiet stretches.** The site gives a scene almost nothing for the 2040s and 2050s, for 2140–2175, and for 2218–2276. These are the safest decades for a book to invent in, since no page constrains them.

### 4.2 Named people and institutions

- **The founder.** Daniel Chen and Elena Voss are named only in Resources 14 to 18; tiers 1 to 4 say "the Chief Architect". That reads as deliberate. Leave it, and add to the glossary entry (`whitepaper.html:1757`): "The title is historical and attaches to the founder alone; it carries no office today." (INVENTION, following "Distinct from the President".)
- **Named figures a book can rely on** (register or whitepaper): Dr. Amara Oyelaran (Conjecture 2178; breakthrough 2212 with the AGI Pentagraph-7); Justice Aris-7, an AGI, on the Court from at least 2190 to 2303; Justice Lera-3 (opinions in the 2190s); Halcyon-2, an AGI citizen of Main, enrolled 2261, whose fork produced LP-077.
- **Names to align.** Resource 31's "AGI Governance Panel" (`resources-source.html:1457`, `:1458`, `:1502`) → the register's "Meritboard Substrate-Governance Panel". "Central Banking Authority" (`whitepaper.html:1751`): add "Commonly called the central bank." The Court and continuity-panel names are in G-5.
- **What no page names**, and a book may name freely: gate complexes, fabrication facilities, autoparenting facilities, the AI governance system, any ally, and any adversary after the founding era. The Academy's Kessari Federation is a classroom hypothetical, not a state in the world.

### 4.3 Daily life in each layer

The five layer pages are consistent with each other after section 2. What is missing is one place that answers the same questions for every ring. Add to `layers.html`, under "What Each Ring Means", one paragraph per ring (RESTATEMENT; sources in brackets):

- **+1 Sanctuary.** "About 300 million people. Every resident carries an implant, and the Threshold Inhibition Protocol stops a harmful act before it completes. Homes are owned, within a cap of one primary and one vacation residence. Automation does more than nine-tenths of production; medical drones give preventive as well as emergency care. Districts hold about a million people, and the ascension domains inside them feel like small towns." [`layer-+1.html:60–66`, `:117`; `charter.html:235`]
- **Main.** "About 3 billion people. The failsafe is on unless its bearer switches it off, and sexual assault is halted by default. A harmful act can complete; the victim is restored and the perpetrator reassigned. Drones reach an incident in seconds. Homes are owned and a primary residence is never counted as savings. UBI and the job subsidy put a working household near a quarter of a million dollars a year." [`layer-0.html:58–61`, `:97`; `whitepaper.html:838`, `:1097`; `charter.html:235`]
- **-1.** "About 600 million people. Tracking is logging-only and drones are slower. Housing is rented or bought from landlords and cooperatives that read the public ledger. Work is repair, freight and markets. Private courts and detention operate under a proportionality limit; federal emergency medicine is backed by cooperative clinics. Children attend automated federal schooling." [`layer--1.html:57–68`, `:88`; `charter.html:253`]
- **-2.** "About 300 million people in districts separated by open country. No drone answers a robbery or a beating; only capital harm draws the state, and it sends the offender to -3. Private detention is lawful and bailout is the way out of it. Revival runs from proxy installations inside the layer, for residents who keep a funded vessel." [`layer--2.html:63–65`, `:85–90`, `:107`]
- **-3.** "About 100 million people in roughly a hundred districts. No enforcement, no revival, no institutional medicine or supply; UBI is drawn at distribution points and everything else is bought privately. Voluntary districts run on associations and reputation ledgers and are closed to arrivals with a capital record. Duels and colosseums are legal. There is no school; a child may relocate to Main at any age." [`layer--3.html:51–64`, `:98`, `:133`, `:153–154`; `charter.html:270`]

Two small additions close gaps the pages leave:
- **Arrival after reassignment (INVENTION).** Whitepaper §19.3: "A reassigned resident arrives with no property and the destination layer's first UBI deposit, and finds housing in that layer's private market." Checked against `charter.html:207` (full liquidation) and `layer--1.html:115`.
- **Climate.** No page gives the rings a climate beyond "distinct microclimates" (`whitepaper.html:454`). Leave it unstated; the territory is subarctic and a book can work from that.

### 4.4 Visits, vessels, revival and bailout in a scene

Gather these in two places: a new whitepaper §19.12 "Crossing a Gate", and one sequence in §17.1, "What happens when you die".

**L-10. Crossing a gate (RESTATEMENT, with one INVENTION).** "Ground-level gates carry routine traffic under implant-verified authorization. A visit is filed in advance and runs for a permitted duration; a stay beyond it continues as elective residency. The gate checks weapons against LP-049: Sanctuary and Main residents may carry a standard defensive sidearm down, rented weapons are paired to the bearer's implant, and lower-layer weapon classes are surrendered at the gate on the way back. The gate tells a traveller whether her inhibition settings will suppress lawful defensive force below, and offers the configuration step (LP-082). A visitor keeps origin-layer status, assets and consequence thresholds, must disclose vessel status in commercial dealings, and at the -3 boundary has the vessel link suspended until exit."
- Sources: `whitepaper.html:1105`; `law-polling.html:1882`; `laws.html:1058–1059`, `:2810`, `:828`, `:1078`; `charter.html:216`.
- INVENTION: "filed in advance and runs for a permitted duration". Checked against LP-014 (`laws.html:2540`), which lengthens "permitted visit durations" and shortens "pre-approval windows" for some visitors, so both exist. No figure is proposed.

**L-11. What happens when you die.** Add to §17.1, in this order:
- (RESTATEMENT) "Memory is restored up to the last sync and nothing after it, the death included. Waking is closer to recovering from critical surgery than to waking from sleep. A resident revives in their own layer's facility or proxy; a visitor revives at origin-layer facilities and wakes in the origin layer." [`layer-0.html:96`; `faq.html:150`; `whitepaper.html:1044`]
- (INVENTION) "With a vessel ready, revival completes within about a day; only a mass-casualty queue under LP-022 lengthens it." Checked against `technologies.html:159` (vessels are grown in advance) and Resource 28 ("dies on Tuesday and revives on Wednesday"). Stories show four hours; a day is the outer figure.
- (INVENTION) "Each sync is a consented event on a cadence the resident sets, so the memory lost runs from minutes to months." Checked against `whitepaper.html:1059` (the 90, 180 and 365-day notices) and Resource 28 (sync is "periodic rather than continuous").
- (INVENTION) "The remains are recovered by the responding unit and carry no continuity; a death and its outcome are notified to the resident's designated next-of-kin." Checked against LP-038.2's "designated next-of-kin" and §17.4.
- (Decision) **A bailout does not carry the captivity with it.** Revival runs from the last periodic sync, so a rescued captive wakes without the memory of what was done after it; the implant's duress record, not the survivor, is the evidence. This follows `whitepaper.html:1075` ("Revival already deletes traumatic memory") and `layer-0.html:96`. Add to §17.3.1: "The revived citizen remembers nothing after the last sync; the implant's duress record carries the evidence of the captivity."
- (Decision) **What a vessel costs.** Keep it unpriced, and say who feels it: "Upkeep is within reach of UBI in Main and Sanctuary and is a real burden on a -1 or -2 income, which is why a meaningful share of lower-layer residents keep no funded vessel." This follows `law-polling.html:1057` and `whitepaper.html:1051`.
- (RESTATEMENT) "A visitor's act in -3, a duel included, is judged against origin-layer thresholds; with no enforcement inside -3, reassignment attaches when the visitor is identified at the exit gate." [`charter.html:216`; `laws.html:2425`; `layer--2.html:90`]
- (INVENTION) "No sync runs while the link is suspended in -3." Checked against `laws.html:1078`.

### 4.5 Money across layers

**L-12.** Add one paragraph to whitepaper §12.2, "What a resident meets":
- (RESTATEMENT) "Sanctuary and Main share one currency, the dollar. -1 uses compliance tokens, -2 lower-restrictions tokens and -3 freedom tokens. UBI and the job subsidy are credited overnight and are untaxed in every layer. A visitor's income keeps landing at home in origin-layer currency; an elective resident is paid at the residence layer's rate." [`charter.html:202`, `:204`, `:199`; `layer-0.html:75`; `laws.html:793`]
- (RESTATEMENT) "Value moves down only through the retention schedule and never up. Trade between layers settles in the currency of the layer where the goods are delivered, and the seller can spend it only there; no one can send money to a person in another layer." [`charter.html:203`; `resources-source.html:2664`; `faq.html:439`; X-4]
- (INVENTION) "The retention bands apply marginally to a citizen's net assets and cumulatively across a visit or residency, so splitting a transfer changes nothing." Checked against `laws.html:1575` ("10% retained on the first $1M") and the 24-month lookback; it settles the whole-estate reading at `faq.html:459` (D-31).
- (INVENTION) "A returning resident's lower-layer balance stays theirs, in that layer's economy, spendable on a later visit and subject to that layer's mandate." Checked against `charter.html:203` ("remains in that economy") and `:219`.
- (RESTATEMENT) "Below the $10 million threshold each layer sets its own brackets, which this paper does not reproduce; in -3 income below the threshold is untaxed." [`laws.html:1558`; `whitepaper.html:878`]
- Not decided, and rarely needed: how a foreign tourist pays, given an inconvertible currency (`world.html:1044` says "their own resources"). A book that needs it should have a citizen host pay.

### 4.6 What one citizen can see of another

**L-13.** Add to whitepaper §5.5 a short "Who sees what", and mirror the first sentence on `layer-0.html` under STI Visibility:
- (RESTATEMENT) "In public, another resident sees your STI indicator. Employers, landlords and other private parties can read your score, your criminal record log, your major STI entries, an LP-062.2 opt-out and whether you are unimplanted. Minor entries stay private. Institutional systems (a domain, a gate, the consequence engine) read both tracks in full; a foreign ally learns your placement and nothing else. Your cognition record is never public." [`charter.html:168`; `whitepaper.html:2027`; `laws.html:1726`, `:1677`, `:1710`; `world.html:647`]
- (INVENTION) "A resident cannot browse their own cognition record; where it corroborates an act, the part relied on is disclosed to that resident as the basis of the decision and can be contested in civil court." Checked against `laws.html:1710` and the right to "the basis of every institutional decision" (`whitepaper.html:1322`). This closes the one point the canon list left open.
- (INVENTION) "Switching off the failsafe is logged to the bearer's ledger and is not a publicly visible entry." Checked against `whitepaper.html:999`, which makes the LP-062.2 opt-out public precisely because other settings are not.
- `faq.html:583`: after "and community" add "(minor STI entries excepted)".
- Left undefined on purpose: the colour bands of the indicator and the look of the below-40 flag. `llms.txt` already says not to infer them.

---

## 5. Reader path

A human reader cannot learn "when is now", the authority order and the colliding terms in one place. The pieces are scattered: the year is stated in passing at `world.html:400` and `roadmap.html:52`; the five-step authority order exists only in `llms.txt`, which no visitor sees; "Tier" is disambiguated once, for one page (`world.html:597`); Failsafe against TIP and phasing against reassignment are in the glossary only.

Put one short orientation on `index.html`, in "05 / Further exploration", directly above the glossary line (`index.html:391`), and link it from the FAQ's standing note. Every sentence restates something a page already says:

> **Reading this archive.** The descriptive pages, the Code, the register and the whitepaper speak from the early 24th century, when the civilization houses approximately 4.3 billion residents. The roadmap is the founding-era projection, written in 2026; era years count from that founding, so Y0 is 2026. Where pages differ, the Charter governs, then enacted law (an enacted Law Polling entry is the primary record and VMSS Laws consolidates it), then the whitepaper, then the descriptive pages; Academic Resources, the Academy and the stories come last, and a story under an Off-canon chip departs from canon on purpose. A ring is one of the five territorial layers; the mega-walls that bound them are a 22nd-to-24th-century build. "Tier" names several separate ladders: the four tiers of law (Charter, federal, layer-wide, district), export Tiers 0–3, sanctions Tiers 1–3 and External Force Tiers 1–4. The failsafe warns and holds and can be pushed through; the Threshold Inhibition Protocol cannot. Phasing is the non-punitive move between Sanctuary and Main at an STI of 85; reassignment is permanent punitive descent into -1, -2 or -3.

Sources: `world.html:400`; `roadmap.html:52`; `llms.txt` (authority order, era years); `laws.html:305`; `law-polling.html:282`; `whitepaper.html:1637`; `laws.html:304`; `world.html:597`; the glossary entries for Failsafe, TIP, Phasing and Layer Reassignment.

Two related fixes: D-34 (`llms.txt` calling the Code "Tier 2"), and the three uses of "ring" for something else ("the primary ring, which the SADs subdivide", `layers.html:137`; `layer-+1.html:65`): replace "the primary ring" with "the layer as a whole".

---

## 6. Verdict

Yes: with the two HIGH items of section 2 (A-1, G-1) and its MEDIUM items applied, and the two chips and five notes of section 3, I would call the site a sound base for v26.0.

Why I say so:
- The Charter needed no finding against its own rules in this read or the last three. The four glosses it needs sit on lower pages.
- The Code and register produced one HIGH between them (G-1), in a superseded entry. Every other Code and register finding is a missing qualifier or a label.
- Twelve readers found two HIGH items on the doctrine pages, in about three million characters. The first full read, at v25.9.9, found about thirty-five.
- The record pages agree with their generators and with each other on every vote, rate, date and threshold.

What I would still not vouch for:
- **A fresh read finding nothing.** Each pass has found items the previous one missed, and this one will too. What is left is of the size of section 2's LOW items.
- **The stories as one continuity.** The stamps and chips make each card safe to read alone; section 3.5 lists where cards disagree with each other. The books should take rules from the doctrine pages and treat stories as illustrations.
- **Resources 14 to 18 as history.** With X-14's notes they say which dates are superseded. Their narrative of the founding decades (Chen, the guarantor window, the 2030s incidents) is the only detailed one the site has, and parts of it are no longer canon. A book set before 2060 needs the owner's eye.
- **Numbers inside graded Academy answers.** The grader notes mark the errors a reader would repeat; lower-graded answers are wrong on purpose.
- **Section 4's inventions.** They contradict nothing I could find, and each lists what it was checked against. They are still new facts about this world, proposed by a reviewer. The two OWNER items in L-8 are open.
- **The canon sheet.** I have not seen its section 9.3 and may have missed items on it.
- **The live site.** I can read the repository, not the deployed pages.
- **The five books.** I have not read them, so section 4 is the site's side of the comparison only.
