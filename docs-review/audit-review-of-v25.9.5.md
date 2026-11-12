# Review of main at 1d8c1a6 (v25.9.5) against the v25.9.0 consistency audit

Reviewed: `git diff 51c233c 1d8c1a6`, read in full at sentence level (27 files, about 200 changed sentences), then each audit item re-checked against the tree at `1d8c1a6`. Read-only on site pages. Line numbers are lines in the HTML at `1d8c1a6`.

State of the tree: check-canon 141/141, css-cascade clean, code-guards pass, certification and Path 2 annex checks pass. At `7c444be` both PDFs matched their sources sentence for sentence; the v25.9.5 PDFs were not re-compared.

One correction to my own audit comes first, because two of your dispositions rest on it.

## 0. Correction to the audit: The Revival Loop and private vessel hardware

The audit said Academy Q27 and The Revival Loop story contradict Charter Article IV ("No private actor in any layer can replicate it"). That was overstated. `whitepaper.html:1068` (§17.1.5, "Portable and Black-Market Revival Hardware") is canon for exactly this: "salvaged or smuggled backup-vessel hardware operating outside institutional infrastructure — portable units in -3's outskirt economies, captive-revival rigs run by criminal syndicates, fidelity well below institutional guarantee." The story's Syndicate acquired units "in a private deal with a -2 tech broker"; it possesses hardware, it does not replicate the technology.

Consequences:

- Your Academy Q27 and Resource 1 rewording ("black-market vessel hardware … whitepaper §17.1.5") is right and is the correct fix.
- The Off-canon chip added to The Revival Loop (`simulations.html:1502`) is not needed. The card illustrates §17.1.5. Its only loose phrase is "fabrication capacity" for what §17.1.5 calls hardware. See D1.

---

## A. Batch 1 at 1d8c1a6

Every item was applied, and the sweep found copies I had not listed (`faq.html:624` Ceiling Seal, `whitepaper.html:442` "opted out", `law-polling.html:1240` Article XIV, Resource 27 "zero mortality risk"). A site-wide search finds no surviving copy of: "zero mortality", "could not lose", "functionally immortal" (as fact), "day of arrival", "day he arrived", "under Article XIV" (warrant sense), "24.91", "and growing", "killing line", "murder line", "opted out", "§28.0 convention". `faq.html` JSON-LD carries none of the old wording.

| Item | Verdict |
|---|---|
| A risk-free visitors: whitepaper, faq, layer--3 | Applied correctly |
| A `simulations.html:863` narrator line | Not applied; card chipped Off-canon instead. See D1 |
| B failsafe: layer-0, whitepaper §19.2–19.3, Academy Q16 | Applied correctly |
| C TIP: technologies, faq, Code entry | Applied correctly |
| D capital harm | Applied correctly under the v25.9.4 ruling (one precision note below) |
| E Ceiling Seal: why-vmss, Saurian Park, Cyberpunk intro | Applied correctly |
| F single lines | Applied correctly, except The Parity Enactment date (D1) |
| G cross-references | Applied correctly. "XXI (Categorical Evaluation)" kept: accepted, Article XXI does carry the categorical rule. Article IV added beside the existing anchors: accepted |
| H arithmetic and register prose | Applied correctly |
| I README | Applied correctly |

Departures judged:

- **rate-history "$60M" with a hedge**: accepted. The line summarises a stamped story and the new wording no longer misstates the rule.
- **Resource 20, Ember and Axis**: correct. `resources-source.html:756` designates Ember the future Sanctuary and Axis is Main.
- **LP-062.3 "first entry for a draft killed at dual-key classification review"**: correct. LP-003 (2112) was rerouted at dual-key, not killed.

Notes, no action required:

- `roadmap.html:476` — "Leakage falls from about 2% toward 1%" for 2500–2600. The table gives ~4% at 2450 and ~2% at 2550, so the phase opens nearer 3%. Exact alternative: "Leakage falls from about 3% to under 2%."
- Capital harm. The ruling keeps manslaughter and negligent homicide at -2 (`whitepaper.html:1071`), but the Code line reads "capital harm, a killing or another capital act" (`laws.html:1972`, also `whitepaper.html:446`, `layer--2.html:83`, `:85`, `diagrams.js`). "A killing" is Jason's phrase, so I leave it; if he wants the Code to carry the carve-out, the exact replacement is "capital harm, a murder or another capital act such as child rape".

---

## B. Second group: your dispositions

### B1. Right passage, right disposition

- **No bailout in -3** (`whitepaper.html:1081`): correct. `layer--3.html:135` already agreed.
- **LP-044 footholds** (`whitepaper.html:791`, `law-polling.html:1566`): correct against `charter.html:245` ("In -3 Terminal, no fabrication proxy is present"). The Code entry (`laws.html:1005`) lists no footholds, so nothing else needed.
- **Continuity Integrity Act** (`laws.html:2038`, `faq.html:98`, Resource 22 `:2208`): correct.
- **Corridor Tier 3** (`whitepaper.html:1989`): correct, and it now matches `world.html:1127` ("construed as Tier 3 by the deployment itself").
- **"§28.0 envelope pattern"**: correct.
- **Resource 33**: the one-million district and the Article XXV.VI ladder for the 2258 framework are correct. The lower-layer aggregate clears 70% provided -3 voted at 61% or more, which the text leaves open.
- **Resource 22** (bailout bounds forced revival): correct, and it matches `layer--2.html:108`.
- **Resource 18** (kill-switch timing): correct, and now consistent with Resource 17 (`:824`).
- **Resource 3, Resource 11, Academy Q21, Q24, Q26, Q27, Q30**: correct. Q26's grader note is a better answer than the one I flagged.
- **Extradition**: accepted as not a conflict on your reading (citizens abroad versus foreign entrants). `academy-source.html:1583` now states it cleanly.
- **Article XI Gate 2, Article VI "absolute federal laws", food safety, the LP-062 holding, Resource 28**: agreed, not conflicts. For Gate 2 the register's practice settles it: a returned draft is a new filing under a suffixed number.
- **Five Instruments**: agreed. `whitepaper.html:1120` lists the five by name; augmentation in §23.2 describes personnel, not an instrument.

### B2. Applied edit that is incomplete or creates a new gap

1. **STI visibility drops the score.**
   - Now: `whitepaper.html:1784`, `:2027`, `technologies.html:429` — "private systems see the criminal record log and major STI entries, while minor STI entries stay private (Article II)."
   - Governing: `whitepaper.html:505` — "The score gates access to Trust Threshold Domains, Selective Ascension Domains, and high-trust opportunities including certain contracts, partnerships, and professional positions." A private gate must read the score.
   - Replacement, all three lines: "private systems see the STI score, the criminal record log and major STI entries, while minor STI entries stay private (Article II)."

2. **Savings base: "UBI-equivalent portion" left behind.**
   - Now: `laws.html:880` — "If savings exceed cumulative UBI and subsidy receipts in that window, only the UBI-equivalent portion is subject." `systems.html:291` — "above that, only the UBI-equivalent portion is."
   - The threshold now counts both receipts but the portion still names UBI alone.
   - Replacement: `laws.html:880` "only the portion equal to those receipts is subject."; `systems.html:291` "above that, only the portion equal to those receipts is."
   - Note for the parked Charter list: the Code entry says it received this rule from Charter III.VII, and `charter.html:231` still reads "cumulative UBI receipts", so the Code now differs from the text it cites until the Charter wording is settled.

3. **Allied "full access": two copies missed.**
   - `world.html:984` and `whitepaper.html:1464` — "Alliance treaty partners receive full access to VMSS exports — fabrication technology, medical systems, automation infrastructure, and advanced materials …"
   - Governing: `world.html:1076` — "No treaty, no payment, and no allied relationship produces access to Tier 0."
   - Replacement, both: "Alliance treaty partners receive full access to VMSS's civilian-grade exports (export Tier 1) — civilian fabrication technology, non-implant medical systems, automation infrastructure, and advanced materials …"

4. **`whitepaper.html:973` now departs from the Charter's own words.**
   - Before v25.9.1: "Judicial review weighs impairment as a contextual factor in assessing culpability", which is `charter.html:416` verbatim.
   - Now: "Article XVIII's contextual evaluation weighs impairment as a factor …" (and `simulations.html:584` "The Article XVIII evaluation was brief").
   - The cite is sound (Article XVIII is "Contextual Evaluation & Network Attribution"), and I see the reason: no tribunal weighs placement. But the whitepaper is now the outlier against a Charter sentence. Either restore the Charter's wording or add `charter.html:416` "Judicial review" to the parked Charter-wording list. Do not leave it unrecorded.

### B3. The wrong passage was fixed

5. **The Court step in the Precognition trilogy.** The conflict I meant is in Resource 32, not Resource 33.
   - Still live: `resources-source.html:1529` — "referred to the Supreme Court advisory bench under the standard pre-ratification review process Article XXV.VI specifies for federal legislation with constitutional implications." `:1530` — "did not strike the proposal, since advisory review has no strike authority."
   - Governing: Charter Article XXV.VI — "A 6/10 justice majority is required to clear this gate." The process Article XXV.VI specifies is a binding gate, not an advisory review.
   - Replacement for `:1529`: "referred to the Supreme Court advisory bench for an opinion ahead of the Article XXV.VI ladder, whose Court gate is binding." Leave `:1530` as it is; it is then true of the advisory opinion.
   - What you changed instead: `:1663` dropped "Meritboard review, Supreme Court advisory affirmation" from the 2258 framework's district-petition requirements. That line was not in conflict. A federal framework may add steps on top of Article XXVIII, the glossary records that the Precognition charter "required substantive constitutional review" (`whitepaper.html:1968`), and the trilogy's other Article XXVIII petitions still narrate both steps (`:1541`, `:1614`). Resource 33 now describes its 2241 and 2247 expansions with steps its 2258 framework lacks. Recommend restoring `:1663`.

6. **Resource 29, `:2643`.** You replaced "the property ownership caps" and restored the rest. The restoration is defensible: the paragraph's argument is sound, since -3 private capital sits outside the mandate and the caps. What remains is an imprecision, not an error of substance, so treat the edit below as optional.
   - Still reads: "The Savings Circulation Mandate, the tiered progressive taxation, and the Sanctuary property cap with Main's idle-asset attribution all operate on the upper-layer currency. An unrestricted upward channel from a layer that does not honor those constraints …"
   - Governing: `charter.html:224` — "A savings circulation mandate applies across all layers in proportion to the institutional presence VMSS maintains in each"; Article III.III — "Progressive taxation applies across all layers"; `charter.html:240` — in -3 the mandate "applies only to UBI-origin savings".
   - Replacement: "The Savings Circulation Mandate on total savings, the 50% top rate, and the Sanctuary property cap with Main's idle-asset attribution operate at full strength only on the upper-layer currency; in -3 the mandate reaches UBI-origin savings alone and the top rate is 6.25%. An unrestricted upward channel from a layer that carries those constraints only in reduced form …"

### The two reversals you asked about

- **Extradition left as it was** (`laws.html:2376`, `whitepaper.html:1512`): right. Those lines sit in the recall protocol and the dual-citizenship section and concern VMSS citizens abroad; "VMSS does not extradite" (`laws.html:2392`, `world.html:755`) concerns foreign entrants. The audit read the two as one rule. `academy-source.html:1583` now says which is which.
- **Resource 29 sentence restored with only the cap wording changed**: right in substance; see item 6 above for the optional precision edit.

### B4. "Not a conflict" that I do not accept

7. **Federal entry into -3.** Your v25.9.1 edit to `systems.html:484` is fine in itself; it now quotes `charter.html:380`. The conflict stands between Charter sentences and is not resolved by it:
   - `charter.html:260` — the -3 floor activates on "violation of absolute federal laws (Articles XXV.I–XXV.III)". `layer--3.html:60` — "Federal law enforcement enters for civilizational-level violations (nuclear weapons, implant hacking, organized sovereignty threats) and withdraws after resolution." `layer--3.html:133` agrees.
   - `charter.html:377` — "Continued pursuit of such capability within -3 is handled by private justice without VMSS intervention."
   - If Article VI and the pages' consensus govern, as with the other outliers, then `charter.html:377` and `:380` are Charter wording outliers and belong on the parked list, with `systems.html:480` and `:484` as their copies. See D3.

8. **Article VIII "instrumentation-bearing" clause.** "Not a conflict" holds only on one reading, and the Charter sentence does not say which. See D4.

### B5. Off-canon chips

9. Both chips are a heavier treatment than the facts need, and `simulations.html:248` tells readers such cards "depart from canon on purpose", which is true of neither. The Revival Loop is canon under §17.1.5 (section 0). The Parity Enactment is the card its own header links to LP-004.2, and it departs on one year. The same releases edited other stamped story bodies (`simulations.html:809`, `:2423`, `:3300–3309`, `:3407–3413`), so the standing rule was not applied uniformly. See D1.

---

## C. Still live at 1d8c1a6 and settled by the Charter or the agreed pages

Each needs no ruling. Governing quote, then the exact edit.

1. **`whitepaper.html:381`** — "pre-intervention in the highest-trust layer (acts halted before completion) and post-intervention everywhere else (acts complete, consequence follows)."
   Governing: `whitepaper.html:1866` — "Heaven Layers operate pre-intervention, Main and the lower layers operate post-intervention, and -3 Terminal operates with no daily enforcement at all."
   Edit: "pre-intervention in Sanctuary and its domains (acts halted before completion), post-intervention in Main, -1 and -2 (acts complete, consequence follows), and no daily enforcement in -3 Terminal."

2. **`world.html:819`, `:1086`, `whitepaper.html:1437`** — "Fabrication proxy access revoked."
   Governing: `whitepaper.html:1811` — proxies are "Closed to the local economy, staffed entirely by federal infrastructure"; `world.html:1076` lists "fabrication proxy operational architecture" in Tier 0. No foreign state has access to revoke.
   Edit: "Civilian fabrication exports end." (`:1086`: "civilian fabrication exports ended").

3. **"System-wide" leakage** — `roadmap.html:52`, `:101`, `:269`, `:284`, `:288`; `why-vmss.html:423`, `:639`.
   Governing: `roadmap.html:614` — "The trajectory figures in the timeline track the layers within full institutional reach: +1 Sanctuary, Main Layer, and -1 Noncompliance."
   Edit: replace "system-wide" with "headline" in each ("headline leakage begins at approximately 90%"; "~25% headline by 2150"; `:284` "The headline figure reaches ~25%"; why-vmss "a headline target of ~25% by 2150", "to ~25% on the headline measure by 2150").

4. **`systems.html:231`** — "Wrongful conviction is not a category, because the mechanism that produces consequence cannot be wrong about what occurred."
   Governing: `charter.html:304` — "If the system's own audit mechanisms (Article XX) identify a reassignment produced by verified institutional error … the Supreme Court holds remedial authority to address the case as a constitutional novelty."
   Edit: "Wrongful factual determination is structurally improbable, because the layered observation architecture records what occurred; verified institutional error keeps its Article XV remedy before the Supreme Court."

5. **`whitepaper.html:536`** — "Layer phasing — the non-punitive return of a citizen to the layer below their current standing when they no longer meet that layer's behavioral threshold".
   Governing: `whitepaper.html:1958` — "The mobility mechanism governing movement between Main Layer (0) and +1 Sanctuary … STI cannot by itself move a citizen below Main (Article II)".
   Edit: "Layer phasing — the non-punitive return of a Sanctuary resident to Main Layer when they no longer meet Sanctuary's behavioral threshold".

6. **`whitepaper.html:1044`** — "A visitor's backup vessel syncs to the fabrication infrastructure of their origin layer, not the destination layer."
   Governing: `whitepaper.html:785` — "In -3 Terminal, backup vessel coverage does not cross the boundary at all".
   Edit: append ", except in -3 Terminal, where no vessel link crosses the boundary (LP-004.2)."

7. **`world.html:1212`** — "in +1 Sanctuary the act cannot physically complete because the Threshold Inhibition Protocol halts it mid-motion."
   Governing: `llms.txt` — TIP is "on by default in Main against sexual assault under LP-062.2".
   Edit: "in +1 Sanctuary the act cannot physically complete because the Threshold Inhibition Protocol halts it mid-motion, and in Main the same protocol halts it by default under LP-062.2 unless the bearer has switched that coverage off."

8. **`law-polling.html:3304`** (LP-082) — "(coverage elected under her home layer's regulation)", said of a Sanctuary visitor.
   Governing: `whitepaper.html:2063` — "Mandatory and continuous in +1 Sanctuary and all SADs."
   Edit: "(coverage set under her home layer's regulation)".

9. **`law-polling.html:281`** — "Every Charter amendment and federal law carried to a disposition since the civilization began operating is recorded here".
   Governing: `law-polling.html:2421`, `:2444` — the 2213 RATIFY-TAX-50 petition failed 1–4 and has no entry of its own.
   Edit: add after that clause "(the 2213 RATIFY-TAX-50 petition is recorded under LP-073 and LP-074)".

10. **`resources-source.html:1156`** (Resource 4) — "the energy abundance that drives leakage from ~2% to ~0.01% in the final centuries."
    Governing: `whitepaper.html:1802` — "the final leakage reduction from ~1% to ~0.01%."
    Edit: "~2%" to "~1%".

11. **`resources-source.html:1433`** (Resource 31) — "Article XXII's substrate-neutrality doctrine had been ratified in the late 2130s".
    Governing: `law-polling.html:695` — one Charter amendment has ever succeeded (LP-076, 2299); Article XXII is founding text.
    Edit: "Article XXII's substrate-neutrality doctrine had stood in the Charter since the founding".

12. **`resources-source.html:1529`** — see B3 item 5.

13. **`resources-source.html:2643`** — see B3 item 6.

14. **`academy-source.html:1382`** (Q25, A+) — "But wall breach leakage at 2800 is already projected at ~0.3%".
    Governing: whitepaper §29.1 table, 2800 row — "~0.3%" in the weighted-average column, for all categories.
    Edit: "But total leakage at 2800, wall breaches included, is already projected at ~0.3%".

15. **`README.md:34`, `:177`** — "current-state delivery annotations". `technologies.html` now labels them "At Founding (2026)".
    Edit: "founding-era (2026) delivery annotations"; `:177` "no founding-era annotations".

16. **`pending-ratification.html:153`** — "registered 5–0 at ~Y175 (enacted 2278)".
    Governing: `rate-history.html:240` — "at approximately Y175 (2276) a successor line was filed"; `path-2-charter.html:133` — "enacted 2278 (Y177)".
    Edit, in the generator source: "filed at ~Y175 (2276) and enacted 5–0 in 2278".

Withdrawn from the audit on re-reading: `faq.html:279` (the informational step belongs to trajectory flags, not TIP); `resources-source.html:2142` (a proposal, not a statement of rule); LP-081's "Article XXVII escalation curve" (it quotes the scope phrase that remains in the Charter); the STI console's -2 routing (correct: no capital act other than a killing is offered as an action).

---

## D. Needs Jason's ruling

One line each, two readings.

1. **Off-canon chips on The Parity Enactment and The Revival Loop.** (a) Keep the chips and the text. (b) Remove both chips; change "2111" to "2115" at `simulations.html:860` and attribute "risk-free" to promoters at `:863`; in The Revival Loop change "fabrication capacity" to "revival hardware" at `:1515`. I recommend (b): both cards are canon apart from those words.
2. **The founding-era timeline.** (a) The register's dates govern (a populated -3 by 2093) and the roadmap's Phases 0 and 1 move. (b) The roadmap governs (no ring before 2150) and the early register dates and Resources 14 to 17 are re-dated.
3. **Federal enforcement inside -3.** (a) It enters for nuclear, hacking and sovereignty violations (Article VI, `layer--3.html:60`, `:133`). (b) Inside -3 those are left to private justice (`charter.html:377`, `:380`).
4. **Article VIII "instrumentation-bearing" clause** (`charter.html:269`) against LP-052 and LP-066. (a) It covers only non-maternal carriers such as artificial gestation, and the unimplanted-pregnancy gap stands. (b) It already admits clinic apparatus, and LP-052's failure and LP-066's "still-unresolved axis" describe a gap that does not exist.
5. **Removing the implant abroad** (`world.html:693`, `whitepaper.html:1514`) against "voluntary and removable at any time" (`whitepaper.html:1050`). (a) Removal is free everywhere and only tampering is recovered. (b) Removal outside VMSS borders is treated as tampering.
6. **Territorial accession.** (a) No offer has ever been accepted (`world.html:525`, `laws.html:2103` "never expanded"). (b) Some were (`world.html:1148` "refused most"; glossary "Most offers are refused").
7. **Hostile-state embargo level.** (a) Hostile states sit at sanctions Tier 2, humanitarian goods continuing (`whitepaper.html:1437`, Resource 12). (b) Hostile status is full severance (glossary Technology Transfer Tier 3, Resource 7 `:583`).
8. **Backup-vessel "precursor" exports to allies** (Resource 12 `:468`). (a) Withheld as Tier 0. (b) A lesser category allies may receive.
9. **Five Planet Federation.** (a) Shared with allied civilizations within centuries of the Dyson swarm (glossary `whitepaper.html:1833`). (b) VMSS-only worlds, complete in the mid-7th millennium (Resource 20).
10. **Stamped stories that show a ruled-out mechanism**: Tyson (`simulations.html:4362`, TIP "slowed the act without stopping it"), The Disgruntled Resident (`layer-+1.html:137`, SAD access suspended on elective departure), Trump against Dahmer (`:3849`, `:4134`, reassignment on intent). (a) Leave under their stamps. (b) Chip or correct.
11. **Charter wording, parked list.** Already on it: Articles I and IV on -3, III.VII's "that layer's aggregate", "UBI receipts". Add: `charter.html:416` "Judicial review" (B2 item 4); `charter.html:377` and `:380` if D3 is ruled (a); `charter.html:343` (25% leakage in the 21st and 22nd centuries against ~90% at the founding).
