# VMSS site v25.9.0 — internal-consistency audit

Audited: `JasonHuang24/VMSS` at `51c233c` ("site v25.9.0: canon reconciliation release"), 2026-11-11. Read-only; nothing in the repository was changed.

Scope: every live page (Charter, Laws, Law Polling, Whitepaper, the descriptive pages, Simulations, both PDF sources, the record pages), plus `llms.txt`, `README.md`, and the doctrine text embedded in `assets/js/diagrams.js` and `assets/js/sti-sim.js`. About 3.5 MB of text, read in full in thirteen slices, each compared against `llms.txt` and the whitepaper glossary. Every quotation below was re-checked against the source after the read.

Line numbers are lines in the HTML file named. "Favoured" follows the site's own order: Charter > enacted law > whitepaper > descriptive pages > Resources, Academy, stories.

---

## 1. What is confirmed

- **Version.** `README.md:5` and `footer.html:32` both read 25.9.0; HEAD is the v25.9.0 commit. The live domain could not be reached from the audit environment, so the deployed copy is unverified.
- **Repo suites** all pass at HEAD: check-canon 141/141, css-cascade clean, code-guards 8/8, certification verifier, Path 2 record annexes verified and in sync.
- **PDFs match their sources.** All 4,187 sentences of `resources-source.html` and all 2,424 of `academy-source.html` appear in the committed PDFs; cache-busters are `?v=2588` and `?v=2587`.
- **Sitemap, navbar, footer and README page table** agree with the files on disk; the pages missing from the sitemap are exactly the `noindex` ones.
- **Headline numbers agree everywhere they appear:** populations 300M / 3B / 600M / 300M / 100M = 4.3B; UBI 10,000 / 5,000 / 2,500 / 1,250; overtime 125 / 62.50 / 31.25 / 15.63; tax 50 / 25 / 12.5 / 6.25 from 2295 above $10M, 70 / 35 / 17 / 8 before; SCM 100B / 50B / 25B / 10B; revival failure 1e-6 / 1e-4 / 1e-3 / none; mega-wall 15 km / 5 km / 1 km / ~1 m; STI floor 85 and 10:1; Article XI and federal-ladder thresholds; 10 justices; 10-year review; the §29.1 leakage table (whitepaper, Charter, roadmap identical from 2150 on); advertised counts (93 stories, 33 + 33, 96 register entries, 125 glossary entries, 34 sections, 28 articles).
- **The Precognition chronology is clean** across Resources 31–33, `sads.html` and the glossary (2178, 2209, 2212, 2230, 2241, 2247, 2253–2256, 2258; scope and extension petitions die at dual-key classification). The Main extension petitions of 2242 (failed 2244) and 2249 (failed 2250) are two petitions, not one petition with two dates.
- **The record pages** (rate history, Path 2, RATIFY-TAX-50) agree with each other, the register and the Code on every rate, date, vote and finding. No page presents the 50% schedule as pending.
- **Every vote table in the register** clears or fails its gate as its badge says; filed years precede enacted years; every cited LP exists; redraft chains agree.

---

## 2. Reconciled rulings that did not reach every copy

These are the items the v25.8.x line set out to settle. The ruling is in `llms.txt` and the glossary; the lines below still carry the earlier wording.

### 2.1 "Risk-free" visitors (ruling: v25.8.4, attributed to promoters; early revival failed often)

| Stale line | Text |
|---|---|
| `whitepaper.html:784` | "A visitor could take the most dangerous work at zero mortality risk … where they literally could not lose" |
| `faq.html:910` | "taking the most dangerous jobs at zero mortality risk, entering Colosseums where they literally couldn't lose" |
| `layer--3.html:126` | "someone whose probability of permanent death was one in a million" (said of "the civilization's early decades") |
| `simulations.html:863` | narrator: "monetized risk-free upper-layer bodies" (story, low priority) |

Against: `llms.txt` standing corrections; `law-polling.html:770` ("promoters sold as risk-free"); `law-polling.html:283`; `roadmap.html:278` ("Revival failure rate still high"). The whitepaper line is tier 3 and is the source the FAQ and the dossier copy.

### 2.2 Failsafe (ruling: warns and holds, can be pushed through)

- `layer-0.html:92` — "the only reason to disable it is to preserve the option of following through on something the system would stop … the possibility of encountering someone who opted out." Under the ruling an enabled failsafe can be overridden, so harm in Main does not depend on anyone opting out.
- `whitepaper.html:1140`, `:1150` (§19.2–19.3) — "The failsafe issues escalating alerts … the citizen can heed them, pause, or disable the failsafe"; table cell "Escalating failsafe alerts, motor inhibition offer". Alert-only wording; the hold is absent.
- `academy-source.html:896` (Q16, A-grade) — "the car won't start … The citizen has to (1) deliberately disable the failsafe". Names the failsafe correctly but makes it a block that must be switched off.

### 2.3 TIP: which layers, and what it is

- `technologies.html:262` — "mandatory in Sanctuary, opt-in in Main Layer" — omits SADs and opt-in in -1 and -2. `llms.txt` cites this page as its source for the fuller rule.
- `faq.html:289` — "an athlete whose legitimate striking would make TIP misfire can scope-adjust or disable the protocol". In Main the running layer is the failsafe; TIP is off unless elected (LP-062.2 default aside).
- `faq.html:279` — presents TIP's first step as "informational: a conversation, a recommended pause, a referral. The resident remains free to continue."
- `laws.html:1661` (Code, founding TIP entry) and `law-polling.html:3213` (LP-062 holding) — "user-configurable in all other implant-bearing layers" / "every implant-bearing layer below Sanctuary", with no -3 exception and (in the Code entry) no LP-062.2 default. The glossary (`whitepaper.html:2063`) adds "every layer but -3".
- "no preemptive intervention" in -1 and -2: `laws.html:1906`, `layer--1.html:66`, `layer--2.html:63`, `whitepaper.html:444`. The glossary places the failsafe in -1 and -2 (`whitepaper.html:1814`) and opt-in TIP reaches both. Readable as a default, but nothing on these lines says so.
- `law-polling.html:3304` (LP-082) — a Sanctuary visitor's configuration described as "coverage elected"; in Sanctuary it is mandatory.

### 2.4 Post-intervention and -3 (ruling: -3 has no daily enforcement)

- `charter.html:164` — "Lower Layers (-1, -2, -3): Post-Intervention"; `charter.html:244` — "post-intervention in Main Layer and below"; `whitepaper.html:381` — "post-intervention everywhere else".
- Against: `charter.html:260` (Article VI: "No daily intervention"), glossary `whitepaper.html:1962` (post-intervention = Main, -1, -2) and `:1866`.
- The Charter disagrees with itself here, so this needs a ruling rather than a copy-edit.

### 2.5 Smaller leftovers

- **Capital harm in -2** (v25.8.9 changed `layer--2.html:83,85` to "a killing or another capital act such as child rape"). Still "a killing" only: `assets/js/diagrams.js` -2 entry ("One law is enforced with certainty: a killing sends the killer to −3"; "Below the killing line"); `resources-source.html:2184` (R22: "when one -2 resident kills another" — also overbroad against `whitepaper.html:1071`, which keeps manslaughter at -2).
- **Ceiling Seal** closes at filing (`charter.html:210`, `:220`; glossary `:1748`). `why-vmss.html:537` and `simulations.html:809` say "on the day of arrival" / "the day he arrived".
- **PCD population**: `sads.html:184` "approximately 40,000 covenant residents and growing"; glossary `whitepaper.html:1968` and R32 say stable.
- **LP-004.2 date in a story**: `simulations.html:860` (The Parity Enactment, chip LP-004.2) — "cleared its Article XXV.VI ladder in 2111". 2111 is the failed LP-004; LP-004.2 was enacted 2115 (`law-polling.html:803`).
- **Retention schedule location**: `layer--3.html:98` "Article III.V's progressive retention schedule"; `systems.html:280` and `faq.html:229` say the schedule sits in LP-076 and the Charter keeps the principle only.
- **Glossary count**: `academy-source.html:833` "the whitepaper's glossary (50+ entries)"; there are 125.

---

## 3. The founding-era timeline (largest open cluster; needs an author ruling)

`llms.txt` lists the founding-era population and "which present a page speaks from" as unsettled. The disagreement is wider than that list: the site carries three early histories that cannot all be true.

**A. Roadmap** — `roadmap.html:215` Phase 0 (2026–2070): "No physical ring construction in this phase." `:214` prototype settlement "of a few thousand volunteers … in the late 2050s". `:281` Phase 1 (2070–2150): "a few thousand voluntary citizens. No ring or mega-wall". `:283` wall "a 22nd–24th century project". Agrees with `technologies.html:497` and `whitepaper.html:1103`, `:1600`.

**B. Academic Resources 14–18 (the founding decade)** — `resources-source.html:766` "The first wall segment … was begun in mid-2030"; `:774` southern wall ~40% complete by 2036, ~70% by 2050; `:823–829` an implanted contractor in 2030, first kill-switch activation November 2032, nanobot plume August 2038, a fabrication facility in 2029; `:735` "By 2100 … VMSS fielded autonomous military forces capable of operational deployment anywhere on Earth". `world.html:459–479` adds a Contested Period of wars and "Walls reached full height".

**C. Register, whitepaper, FAQ, -3 dossier** — LP-002 (2095) records a lower-layer aggregate vote; LP-006 (2093), LP-004 (2111) and LP-004.2 (2115) presuppose a populated -3 with colosseums, corporate networks and a vessel-link boundary (`whitepaper.html:784–785`, `faq.html:911`, `layer--3.html:126`); `rate-history.html:223` and `law-polling.html:2401` put the founding-era population at about one million.

Inside B, two further contradictions between Resources:

- **Wall in 2026–2036**: `resources-source.html:700` (R15) "The mega-wall was not yet under construction" versus `:766`, `:774` (R16) begun 2030, 40% by 2036.
- **First kill-switch activation**: `resources-source.html:824` (R17) "activated thirty-one seconds after the transfer began" versus `:882` (R18) "Chen reviewed the evidence package for more than an hour before authorizing activation"; R17 describes data exfiltration, R18 a "sabotage attempt".

Related:

- `charter.html:343` — "In the formative phases of the 21st and 22nd centuries, leakage of approximately 25% … is anticipated". The Charter never states the ~90% (2026) starting figure used by the glossary (`whitepaper.html:1904`, `:2094`), roadmap and README; its table begins at 2150.
- `academy-source.html:1792` (Q32, B-grade) — mega-wall construction begins 2060–2076; demonstration community of 50,000 by 2040–2060.
- `resources-source.html:1433` (R31) — "Article XXII's substrate-neutrality doctrine had been ratified in the late 2130s"; the Charter treats Article XXII as original, and `:2091` (R11) credits an AGI on a Meritboard team in 2112.

The v25.8.3 commit notes record TL-05 and TL-06 as held. A ruling on which history governs would resolve this whole section; the register (tier 2) dates fix history C, so the roadmap or the Resources would have to move.

---

## 4. Charter and enacted law (tiers 1 and 2)

Most serious first. Where the Charter contradicts itself, only the author can decide.

1. **SCM trigger in -2 and -3: layer or district.** `charter.html:231` (III.VII) "measured against that layer's aggregate UBI-origin savings" versus `charter.html:240` (III.VIII) "at the district aggregate trigger". Code (`laws.html:880`, `:1610`) and glossary say district.
2. **Extradition.** `laws.html:2392` and `world.html:755` — "VMSS does not extradite" (world: allies too, the refusal merely "softened"). `laws.html:2376` and `whitepaper.html:1512` — "Extradition to non-allied states is refused by default"; `whitepaper.html:1516` has allies "coordinating on recall, extradition".
3. **Article VIII versus the register.** `charter.html:269` — the continuity link "is instrumentation-bearing, not maternity-specific: any implant-grade apparatus … extends the provision". `law-polling.html:550` (LP-052, Failed) says Article VIII limits the link to the mother's implant and that the amendment to widen it failed; `law-polling.html:644` (LP-066, 2214) calls it "the still-unresolved axis". No enacted amendment accounts for the Charter's wording.
4. **Article XI, Gate 2.** `charter.html:280` "Failure at any gate terminates the amendment" versus `charter.html:283` "Anything below 7/10 returns the amendment for redrafting or terminates it outright".
5. **Federal entry into -3.** `charter.html:260` — the -3 floor activates on "violation of absolute federal laws (Articles XXV.I–XXV.III)"; `layer--3.html:60` — "Federal law enforcement enters for … nuclear weapons, implant hacking". Against: `charter.html:377`, `:380` and `systems.html:480`, `:484` — continued conduct within -3 "is handled by private justice without VMSS intervention". Also `charter.html:385` treats clean energy (XXV.I) as a graduated regulatory matter, not an absolute law.
6. **Food safety.** `charter.html:404` — cross-layer mandates "operate as a floor of guaranteed conditions"; `laws.html:1890` — food-safety-class mandates stand "advisory internally".
7. **Continuity Integrity Act.** `laws.html:2038` — vessel maintenance "is not a free entitlement", yet "a citizen who dies with the implant in place and no refusal logged is revived automatically at full fidelity". LP-065 (`laws.html:1417`) leaves the unfunded unfunded.
8. **Charter anchors that name the wrong article.**
   - `laws.html:1142` and `whitepaper.html:1088` — "a Supreme Court warrant under Article XIV". Article XIV is Proportional Response (`charter.html:299`); the Court is Article XXI.
   - `laws.html:1198` (LP-045.2, substrate continuity) anchors Articles VIII, XXII; `laws.html:1180` (LP-038.2, sync frequency) anchors III, VIII. Continuity is Article IV.
   - `laws.html:1232` and `law-polling.html:2113` — "XXI (Categorical Evaluation)"; `law-polling.html:590` — "VI (Backup Vessels)". The headings are "Supreme Court & Judicial Authority" and "Enforcement & Restoration Protocol".
9. **SCM scope wording in -2/-3.** Charter `:231` and `laws.html:880`: "UBI-origin … only the UBI-equivalent portion is subject" (though the window counts "UBI and subsidy receipts"). `whitepaper.html:925` and `systems.html:291`: "savings attributable to VMSS-distributed funds (UBI and PJS)".
10. **STI ledger visibility.** `charter.html:168` "tiered visibility (minor entries private, major ones public)" and `whitepaper.html:411`; glossary `whitepaper.html:1784`, `:2027` "Both persistent, non-erasable, and visible to institutional and private systems".
11. **Lower-confidence items:** -3 tax base (`charter.html:240` "A base tax rate" versus `laws.html:1558` nothing taxed below the threshold); attempted murder (`laws.html:2425` "minimum -2" versus `:1906` "to -3"); `laws.html:1956` "same reassignment regardless of which layer" versus origin-layer routing in `:1906`; LP-002 sets an hourly PJS rate (`laws.html:812`) against a monthly PJS; LP-026's 8-year Meritboard recalibration (`laws.html:2702`) against `charter.html:173–174`; STI weights on "dimensions" (Charter, LP-026) versus "measurement domains" (glossary `:2021`).

---

## 5. Whitepaper against itself

1. **Authorized bailout in -3.** `whitepaper.html:1081` — protection "in layers where institutional enforcement density is thin (primarily -2 and -3)"; bailout forces vessel revival, and `:1038` has "-3 Terminal N/A — death is final".
2. **Revival infrastructure inside -3.** `whitepaper.html:791` lists among footholds "inside -3 voluntary-district geography" "the fabrication proxies supporting -1/-2 coverage … emergency revival infrastructure" (same list in LP-044, `law-polling.html:1566`). `charter.html:245`: "In -3 Terminal, no fabrication proxy is present."
3. **Five Instruments.** Glossary `:1830` and §28.0 `:1556` count two Charter instruments plus three wartime technologies; §23.2 (`:1369–1372`) lists four, including biological augmentation.
4. **Corridor violations.** Glossary `:1989` "construed as Tier 3 … without additional signaling"; §23.4 `:1394` escalates "from warning to interdiction to destruction"; Tier 3 (`:1414`) requires a Court session and presidential signature.
5. **Wrong cross-references.** `:1337` cites §25.8 for the unimplanted-foreign-national rule; §25.8 is "Foreign Embassies on VMSS Soil" (`:1493`), and the rule is in Charter Article V. `:929`, `:930`, `:1071` cite a "§28.0 convention" for naming residual gaps that §28.0 does not contain.
6. **Technology access for allies.** `:1464` (and `world.html:781`, `:984`, `:1004`) give treaty partners "full" access; Tier 0 (`world.html:1076`, glossary `:2054`) is withheld from everyone.
7. **Lower-confidence:** `:536` defines phasing as return "to the layer below their current standing" (generic; canon limits it to Sanctuary/Main); `:1044` visitor revival rule stated without the -3 exception at `:785`; `:381` "guaranteeing revival" against `:1062`; sixth-child "-1 reassignment" (`:954`) is empty for a -1 household, where the schedule also applies (`:960`).

---

## 6. Descriptive pages

- `roadmap.html:476` — Phase 4 (2500–2600): "Leakage enters single-digit territory." The page's own figures (`:419`) reach ~8% in 2350.
- `roadmap.html:52`, `:269`; `why-vmss.html:423`, `:639` — "system-wide" leakage; `roadmap.html:614`, `:623` say the headline tracks +1, Main and -1 only.
- `roadmap.html:560`, `:598` — "the preceding 24.91%"; 25% to 0.1% is 24.9.
- `why-vmss.html:576` — regulations: "the entire population votes directly: 80% must approve"; ratification is by the affected layer.
- `systems.html:231` — "Wrongful conviction is not a category, because the mechanism … cannot be wrong"; `faq.html:899` — "'structurally improbable' is not 'impossible' … the Supreme Court holds remedial authority".
- `world.html:819`, `:1086` (and `whitepaper.html:1437`) — sanction: "Fabrication proxy access revoked". Proxies are closed federal installations inside -1/-2 that no foreign state can access.
- `world.html:693` — removing the implant abroad "triggers hardware-level failsafes. The citizen is recovered via drone"; `whitepaper.html:1050` — "voluntary and removable at any time". Also uses "failsafe" in a sense the glossary rules out.
- `world.html:525` and `laws.html:2103` — boundaries "never expanded"; `world.html:1148` — "refused most of these offers".
- `world.html:1058` — cites "§13" for the sanctions framework (it is §8) and takes its two tier names from different ladders.
- `world.html:718` versus `:755` — a foreign record "maps to the appropriate lower layer" versus no placement below Main "on foreign evidence alone".
- `why-vmss.html:225` "tens of thousands" versus `layers.html:137` "tens to hundreds of thousands" for SAD communities.
- `layer--1.html:96` — in -2/-3 a parent's coercion against child relocation is left to "the community"; the right is federally enforced (`layer--3.html:64`).
- `technologies.html:288` — -3 "medical leakage floor … approximately 1%" against `layer--3.html:63` "no medical service".

---

## 7. Law register against itself (wording; no vote or date is wrong)

- `law-polling.html:3292` (LP-062.3, 2204) — "this is the first such entry" for a draft killed before ratification; LP-046 (2188), LP-055 (2195) and LP-058 (2198) are earlier.
- `:1979` (LP-055, concluded 2195) — "the 0/5 Charter LP enactment record"; the fifth failure, LP-053, concluded 2196 (`:587`, `:600`).
- `:281` — "Every Charter amendment and federal law carried to a disposition … is recorded here"; RATIFY-TAX-50 (2213, failed 1–4) has no entry of its own (`:2421`, `:2444`).
- `:695` (LP-076) — "the widest ballot in the register's history — all five layers voting"; every federal law polls all five layers.
- `:2601` (LP-079) — 78% lower-layer vote "unusually high"; LP-065 and LP-049 reached 88%.
- Loose intervals: `:2074`, `:2199` "eight years" (2198 to 2208); `:644` LP-004.2 "had recently sealed" (2115, seen from 2211); `:3214` "months earlier" (2199 to 2201); `:1881` "a decade" (2152 to 2172); `:614` "an order of magnitude" (7.1M against 1.3–2.4M); `:2504` 73% "narrowly" against a 60% floor.
- `:2073` (LP-059) — "human revival runs at 1-in-10,000" states a failure rate as the revival rate.
- `:2645–2646` (LP-081, 2305) — "the Article XXVII escalation curve"; LP-076 (2299) moved the rate into LP-064.
- `:855` — LP-005.2 badged "Enacted · Superseded by LP-005.3" but filtered as Enacted; `:3272` LP-062.3 badged "Rejected". Neither fits the badge list in `llms.txt`.

---

## 8. Academic Resources (tier 5; not era-pinned)

**Against the Charter or enacted law**

- `resources-source.html:1375` (R20) — Charter amendments ratified "across all five planets", which includes the -1, -2 and -3 planets; lower layers do not vote on Charter amendments.
- `:592` (R7) — Article VIII as "the right to relocate to the highest available layer"; the Charter says Main (`charter.html:270`).
- `:2643` (R29) — "The Savings Circulation Mandate, the tiered progressive taxation … all operate on the upper-layer currency"; both apply in every layer (`charter.html:224`, `:240`). `:2659`, `:2676` route tax revenue to the Automation Dividend Treasury; `whitepaper.html:934` sends it to the Main treasury first.
- `:1667` (R33) — a -1 district of "approximately 180,000"; a district is one million.
- `:1665` (R33) — the 2258 framework "through the standard Article XXVIII ladder" with Main 78% and -1 72%, both under Article XXVIII's 80%; the figures fit the federal ladder instead. `:1602`, `:1663` and `:1665` also describe the framework's reach three ways.
- `:1530`, `:1541`, `:1663` (R32–R33) — the Court's review "has no strike authority"; "Meritboard advance vote". Neither is in Article XXVIII (`sads.html:188` uses the same idiom).
- `:2142` (R21) — an SCM "grace period" attributed to Charter III.V, which contains none and liquidates 100%.
- `:1362` (R20) — VPR onto the same-layer planet (VPR is only downward); `:1336` (R19) revival-capable fabrication proxies on every colony planet, including the -3 world.

**Against the whitepaper**

- `:2212` (R22) — "Under forced revival in -2, that exit is closed"; authorized bailout routes revival out of the captor's reach (`whitepaper.html:1083`, `layer--2.html:108`).
- `:2619` (R28) — bailout has "no iteration limits, no consequences"; `whitepaper.html:1083` arrests on arrival where consequence is pending.
- `:1939–1975` (R11) — category weights sum to 75%, omitting the implant ledger and enforcement (20% each in `whitepaper.html:1907`).
- `:1156` (R4) — Dyson drives leakage "from ~2% to ~0.01%"; glossary `:1802` says from ~1%.
- `:583` (R7) hostile status = Stage 3 full embargo, against `:483` (R12) and `whitepaper.html:1437`; `:468` (R12) allies receive "backup vessel precursor technology", against Tier 0.
- Glossary `whitepaper.html:1833` (Five Planet Federation: "with allied civilizational partners", "in the centuries following" the swarm) against R20 `:1328`, `:1361` (VMSS-only worlds, mid-7th millennium), which the entry cites as its full treatment.

**Internal arithmetic**

- `:1622` (R33) — 2247: "80% ratification … cleared the threshold by a one-percentage-point margin" against an 80% threshold; the one-point margin was 2241 (81%).
- `:1705` (R5) — 60–70 °C at 5 km on a 25–30 °C/km gradient (125–150 °C).
- `:1322` (R19) — 100-light-year envelope "within a week … per round trip" at one light-year per hour (200 hours); `:1329` "As of the late 5th millennium" against warp drive in 5012.
- `:944` versus `:994` (R1) and `:1070` (R2) — teleportation's first civilian deployment after 3400, about 3250, or after 3500.
- `:1093` (R2) — flat 1x/2x/4x/8x gradient (the Resource's own stamp at `:1042` discloses it as stale).

---

## 9. Academy (top-grade answers, rubric and grader commentary only)

- `academy-source.html:865`, `:867` (Q15) — kill switch "activation protocols are constitutionally defined"; Charter and glossary say classified.
- `:1309` (Q24, A-grade) — "The kill switch activates on every implanted Kessari asset"; the glossary makes it domestic only, and the same question says the Kessari have no implants.
- `:1486`, `:1495` (Q27, A-grade and grader) — "private fabrication capacity already exists in the lower layers … most developed in -3"; `charter.html:245` "No private actor in any layer can replicate it". The cited source is the story at `simulations.html:1515` (The Revival Loop: private portable vessel units at "97.5%" fidelity, itself at odds with Article IV and binary revival, with no Off-canon chip).
- `:1380` (Q25, A-grade) — parabolic acceleration "From 2800 onward"; Charter, whitepaper and roadmap say 2850. `:1382` (A+) treats the system-wide ~0.3% at 2800 as wall-breach leakage.
- `:1128`, `:1137` (Q21) — network attribution tracks "beneficial outcomes"; Article XVIII tracks harmful outcomes and exempts passive beneficiaries.
- `:803`, `:807`, `:816` — SCM as a standing personal garnish with a $100,000 break-even; the trigger is the district aggregate.
- `:1667` (Q30, B-grade, uncorrected) — a reassigned citizen arrives "with whatever the retention schedule provided"; involuntary descent liquidates 100% (`charter.html:207`).
- `:1434` (Q26) — implant export "neither clearly prohibited nor clearly permitted"; Tier 0 withholds it.

---

## 10. Stories (era-pinned; mechanism points only)

- `simulations.html:4362` (Tyson, snapshot v9.0) — "The TIP engaged only partially and slowed the act without stopping it".
- `layer-+1.html:137` (The Disgruntled Resident, v9.0) — an elective resident's CCD access "suspended automatically upon departure"; `layer-0.html:66` and `layer-+1.html:72` say SAD memberships travel.
- `simulations.html:3849` (Trump) reassigns on "intent plus imminent execution"; `:4134` (Dahmer, same snapshot) — "Reassignment waits for an executed act".
- `simulations.html:2423` (The Wider Door) — "about 14 billion, roughly 40% of Earth's total human population" against 8.1 billion at `:975`.
- `layer--2.html:70` — the second aggravated assault "would trigger reassignment"; the first already would.
- `simulations.html:5705` (Cyberpunk section intro, not a story) — "Ceiling Seal (the rule that makes a descent to -3 permanent)"; the seal applies to any reassignment or VPR.
- Not a finding: the twelve-justice Court at `simulations.html:5654` is a Year 626 card recording a later amendment.

---

## 11. Record pages (low)

- `pending-ratify-tax-50-rulings.html:157–158` and record R19 — 62 findings, 59 resolved, "eight residues"; `path-2-risk-register.html:110` — "twelve residues", and its statuses tally 49 cured, 12 mitigated, 1 accepted.
- `pending-ratification.html:153` — LP-074 "registered 5–0 at ~Y175 (enacted 2278)"; Y175 is 2276, the filing year.
- `rate-history.html:229` — "grosses $200M and keeps $60M at the 70% top marginal rate"; with the $10M threshold it is $67M. `:255` — intervals of 12, 35 and 65 years "roughly double".
- `path-2-charter.html:157` "at least 1.00" against §5.4 `:173` "exactly at a threshold fails".

---

## 12. Housekeeping

- `README.md` structure block: `docs-review/` "pruned to 7 keepers 2026-07-24"; the directory holds 59 entries and 302 files. The tree also omits `law-polling.html`, `llms.txt`, `rate-history.html` and the Path 2 / pending pages.
- The v25.8.3–v25.8.7 commit messages cite `docs-review/logic-recon-2026-11.md` and `docs-review/trim-recon-2026-11`; neither is in the repository.
- `llms.txt` badge list does not cover "Enacted · Superseded" or "Rejected" (§7).

---

## Suggested order of work

1. Section 2 (stale copies of settled rulings): mechanical, no new decisions, mostly one-line edits; three of them sit in the whitepaper and the Code, above the pages that were fixed.
2. Section 4 items 1–8 and section 5 items 1–5: need short rulings, then one-line edits.
3. Section 3: one ruling on the founding-era history, then a sweep of the roadmap or Resources 14–18.
4. Sections 6–9 as a batch; sections 10–12 at leisure.

Sections 2, 4.8, 5.5, 6 (roadmap arithmetic) and 7 would also be cheap to turn into `check-canon` guards so they cannot recur.
