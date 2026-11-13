STOPPING RULE MET at 08cc7f3: every HIGH finding from the stopping-rule pass is fixed, and every changed sentence in v25.9.13 agrees with the text that governs it.

# Verification of main at 08cc7f3 (v25.9.13)

Reviewed: `git diff 325e205 08cc7f3` and nothing else, at sentence level (28 changed passages in 10 files), each checked against the passage that governs it at `08cc7f3`. check-canon 141/141, css-cascade, the founding-guard suite (8/8) and the law index (155 provisions) pass. The regenerated Academic Resources PDF carries the new Resource sentence and its cache-buster moved (`?v=2603`). Findings only.

## A. Each changed sentence

All correct. No replacement is needed anywhere in the diff.

My three findings and A-2:

- **B-1**, `whitepaper.html:1748`, `:1898` — as written; agrees with `charter.html:304`.
- **B-2**, `whitepaper.html:1044`, `:1191`, with `laws.html:2021` and `resources-source.html:2588` — correct, and all four say the same thing. LP-004.2 is 2115 as stated.
- **B-3**, `laws.html:1545` — your wording is better than mine. "the audited-evidence gate dates from the 2213–2214 refusal of RATIFY-TAX-50 (LP-074 record)" says only what `law-polling.html:2444` says. My "endorsed 5–0" put the vote on the gate, and the records put it on the direction (`pending-ratification.html:152` — "Every chamber endorsed the trajectory principle, 5–0 across the ratification chambers, while refusing the magnitude then supported").
- **A-2**, `faq.html:680` — as written.

Your five local findings:

- `laws.html:1401` (LP-063) — LP-080 is 2306 and the sentence matches its register entry.
- `laws.html:1759` (Record Contestation Act) — LP-067.2 is enacted 2218 and weights correction signals by outcome accuracy "calibrated within each layer’s own correction pool" (`law-polling.html:2258`). Correct.
- `law-polling.html:3213`, `whitepaper.html:1974` — "every layer but -3" agrees with `whitepaper.html:998`.
- `whitepaper.html:1512` — agrees with `laws.html:2376` ("by digital transmission to backup vessels within VMSS territory, the body not required").
- `whitepaper.html:1140`, `:1962` — agree with LP-062.2 (`laws.html:2794`: disabling "writes a publicly-visible entry to the bearer’s ledger").

The mirrors and the three founding-corpus provisions:

- `laws.html:741` (LP-077, 2303), `:878` (LP-070, 2211), `:1024` (LP-048.3, 2168), `:1059` (LP-082, ratified 2306), `:1194` (LP-031, 2130): each matches the register sentence it mirrors and the later entry's date.
- `laws.html:1775` — LP-026 was ratified 2118; "externally audited" is the whitepaper's own phrase (`whitepaper.html:1575`).
- `laws.html:2021` — as above. `laws.html:2425` — LP-047.3 is 2152.

Copies: `roadmap.html:368`, `:375`, `:415` and `whitepaper.html:1566`. "Into the stratosphere" is right for a 15 km wall (`technologies.html:476` — "the stratosphere begins at 12km"); "above" was not.

## B. Verdict on the stopping rule

Met, under the rule as redefined in the v25.9.12 review: one reader pass over the Charter, Code, register and whitepaper for HIGH findings; its findings fixed; the fixes verified by diff.

Reasons:

- The pass ran twice in parallel, by my four readers and your three. Eight HIGH findings came out, none in the Charter. All eight are applied.
- Every sentence the fixes wrote agrees with its governing passage, and none decides an owner item. B-3 was the one place where the applied wording differs from mine, and yours is the more accurate.
- The structural work held: no finding in either pass came from a Code entry dropping its source's condition where the source is a register entry, or from a register entry missing its later law. The five mirrors in this release extend that to the Code.

What this verdict does not claim:

- It is not "a fresh read finds nothing". Your readers and mine found eight items with no overlap, which is the same pattern as the two full reads. A further pass would likely find a few more of the same size. They are residual, each a missing pointer or a stale summary, and the authority order in `llms.txt` and the FAQ standing note tell a reader which text governs.
- It covers the four canon pages only. Descriptive pages, Academic Resources and the Academy were last read in full at v25.9.10 and rest on their disclaimers.
- It does not cover the owner list. Thirty-five questions remain where the doctrine gives two answers and only the owner can choose.

## C. Final consolidated owner list at 08cc7f3

Numbers are the ones used in earlier reviews. Ordered by how much each unlocks; each line ends with my recommendation.

### Unlocks other items

- **1. Era-year epoch.** Y0 = 2026 or 2101. Unlocks every era number on the record pages. *Y0 = 2026; drop era numbers paired with calendar years.*
- **2. Founding-era hardware dates** (Resources 16, 17; `world.html:464`, `:479`). Unlocks 3 and 4. *The whitepaper governs; Resources 16 and 17 take a deferring note.*
- **34. Founding-corpus preamble**, `laws.html:1529` ("the rule was always in force") against entries that now date part of a rule to a later law. Unlocks 35 and the framing of every founding entry. *Add "save where an entry names the later law that added part of its rule".*
- **33. The 2213 tally.** All five chambers voted (1–4, then 3–2), though `charter.html:396` ends a draft at the first failed gate. Unlocks the record pages' vote language. *Keep the numbers; say the later chambers published advisory positions on a draft that had already died at the Meritboard.*
- **5. Charter wording, the parked list.** Decides whether the Charter page is ever edited. *Leave the Charter; the lower pages carry each gloss.*

### Rules in the Code and register

- **8. Internal threats in -3:** External Force Doctrine or Article XXV.IV. *XXV.IV.*
- **12. Education in -3** (LP-034 against Charter Article V). *The floor runs +1 to -2.*
- **11. Voluntary revocation of citizenship below Main.** *Main and above only.*
- **28. LP-055 and open removal.** *Removal stays open; recast the entry as a pathway to recognized objector status and trim the two quoted lines.*
- **32. Sanctuary implant removal** (phased to Main, not penalized). *Confirm.*
- **26. Dual nationality** (`laws.html:2392` against `whitepaper.html:1516`). *Code states the default; add "save as a published reciprocal treaty with an ally provides".*
- **27. Extradition of a naturalized entrant with allied citizenship.** *No extradition of anyone admitted through intake.*
- **24. A single assault in -1** (`layer--1.html:86`). *Keep the line for a serious assault, the prior record supplying the pattern axis; a moderate, reversible one stays corrective.*
- **25. LP-069's attribution and -1.** *Main and Sanctuary only, as enacted.*
- **31. What parity delivers under LP-004.2 in -1 and -2.** *The destination-layer rate.*
- **10. LP-070's figures.** *They belong to LP-074's Schedule A.*
- **35. The cross-crediting clause** (`laws.html:1542`). *LP-074, whose Schedule A carries stream separation; consistent with 10.*
- **9. LP-002 and the subsidy rate.** *It defined qualifying roles.*
- **13. LP-078's scope.** *"Wherever LP-043 reaches".*
- **15. Sanctions Tier 1 and dependency.** *Recast around goods and lapsed allies.*

### Whitepaper and descriptive pages

- **14. Cross-layer communication** (mediated or free). *Free.*
- **7. Centurial Domain** (500+ years). *Chartered ahead of its first qualifiers.*
- **4. First-generation implant opt-in** as a projection. *Past tense, after 1 and 2.*
- **6. The Charter's present-day figures.** *No edit.*
- **3. Founding geography and diplomacy** (Resources 14 to 16). *Hudson Bay as the eastern boundary.*

### Academic Resources and Academy only

- **16. Kill switch used protectively on citizens** (Q24). *Threats only.*
- **23. Kill-switch authorization across planets** (Resource 19). *Leave the mechanism unstated.*
- **29. Frontier survey crews and revival** (Resource 19). *As applied: none on Frontier.*
- **18. Interplanetary settlement currency** (Resource 20). *Central-bank settlement in the seller's currency.*
- **19. Pilgrimage to Earth** (Resource 20). *Only those whose standing allows.*
- **20. Advance votes and advisory affirmations** (Resources 9, 32, 33). *Practice since the Precognition charter.*
- **21. Resource 12's Stage 1.** *It is sanctions Tier 1.*
- **17. "Retired" currency** (Q23). *Retired means out of circulation.*
- **22. Q33's citation.** *Article XIV.*
- **30. Q24's sanctions tier.** *State Tier 2.*

Closed by standing rulings and not listed: The Parity Enactment and The Revival Loop under their Off-canon chips; stamped stories; Article VIII's instrumentation clause.

With the rule met, I have nothing further to review until the owner rules on this list.
