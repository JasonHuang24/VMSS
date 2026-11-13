All 35 rulings are on the pages as recommended. One (28, LP-055) leaves a clause of the losing reading; two further sentences need a small fix; three owner items remain open.

# Verification of main at 14f8eec (v25.10.0)

Reviewed: `git diff 21646ae 14f8eec`, at sentence level (161 changed passages in 36 files), each checked against the ruling it applies and the text that governs it. Then a search of every page for surviving copies of the rejected readings. This review checks how the rulings were applied; the rulings themselves are taken as the request states them. Findings only. Line numbers are HTML lines at `14f8eec`.

Suites at `14f8eec`: check-canon 141/141, css-cascade, founding guards 8/8, law index (155 provisions), the five Path 2 record annexes and the 2294 certification verifier all pass. Running `build-pending-pages.mjs` and `build-path2-pages.mjs` leaves the tree unchanged, so the generated record pages match their sources. Both PDFs carry the new sentences and both cache-busters moved.

---

## 1. The 35 rulings

Each is stated as recommended, with nothing added beyond it, except where section 2 says otherwise.

| # | Ruling | Where applied | Verdict |
|---|---|---|---|
| 1 | Y0 = 2026 | `llms.txt:79`; `rate-history.html`; the pending and Path 2 record pages and their generators | Correct |
| 2 | Whitepaper governs hardware dates | `world.html:441`, `:464`, `:473`, `:479`; doctrine notes on Resources 14, 16, 17, 18 | Correct |
| 3 | Hudson Bay as eastern boundary | `resources-source.html:679`; `world.html:485` | Correct |
| 4 | Opt-in in past tense | `whitepaper.html:1325`; `academy-source.html:507`, `:1780` | Correct |
| 5 | Leave the Charter | `charter.html` has no diff | Correct |
| 6 | Charter figures stand | `llms.txt:79` | Correct |
| 7 | Centurial Domain chartered ahead | `sads.html:170`; `whitepaper.html:1257` | Correct |
| 8 | Internal threats under XXV.IV | `whitepaper.html:451`, `:1480`; `laws.html:1890`; `faq.html:966`; `layer--3.html:91` | Correct |
| 9 | LP-002 defined qualifying roles | `law-polling.html:713`; `laws.html:812` | Correct; one mirror, 2-B |
| 10 | LP-070's figures are LP-074's Schedule A | `whitepaper.html:883`, `:935`; `laws.html:899` | Correct |
| 11 | Revocation in Main and above | `laws.html:2360`; `whitepaper.html:1515` | Correct |
| 12 | Educational floor +1 to -2 | `law-polling.html:1301`; `laws.html:1485`, `:1874`; `whitepaper.html:460` | Correct |
| 13 | LP-078 "wherever LP-043 reaches" | `law-polling.html:2552` | Correct |
| 14 | Cross-layer communication free | `layer-0.html:95`; `resources-source.html:2738` | Correct |
| 15 | Sanctions Tier 1 recast | `whitepaper.html:1441`; `world.html:825`, `:830` | Correct |
| 16 | Kill switch: threats only | `academy-source.html:1337` | Correct |
| 17 | "Retired" currency | `academy-source.html:1245`, `:1258` | Correct |
| 18 | Settlement in the seller's currency | `resources-source.html:1398`, `:1400` | Correct for the case stated; see 4-B |
| 19 | Pilgrimage by standing | `resources-source.html:1403`, `:1405` | Correct |
| 20 | Advance votes as practice | `resources-source.html:1557`, `:1630`, `:1679` | Correct |
| 21 | Stage 1 is sanctions Tier 1 | `resources-source.html:481` | Correct |
| 22 | Q33 cites Article XIV | `academy-source.html:1838`, `:1853`, `:1868` | Correct |
| 23 | Kill-switch mechanism unstated | `resources-source.html:1339`, `:1351`, `:1394` | Correct |
| 24 | Single serious assault in -1 | `layer--1.html:86`; `laws.html:1906` | Correct |
| 25 | LP-069 reaches Main and Sanctuary | `laws.html:878` | Correct |
| 26 | Dual nationality, treaty exception | `laws.html:2392`; `world.html:760` | Correct |
| 27 | No extradition after intake | `laws.html:2392`; `whitepaper.html:1515` | Correct |
| 28 | LP-055 recast | `law-polling.html:1977` to `:1979` | One clause left, 2-A |
| 29 | No revival on Frontier | `resources-source.html:1351` | Correct |
| 30 | Q24 at sanctions Tier 2 | `academy-source.html:1286` | Correct |
| 31 | Parity is the destination rate | `laws.html:1077`, `:2021`; `law-polling.html:770`, `:799`; `whitepaper.html:785`, `:1044`, `:1191` | Correct |
| 32 | Sanctuary removal confirmed | `laws.html:1679` (source line gains §15.3) | Correct |
| 33 | 2213 tally: later chambers advisory | `law-polling.html:2421`; `rate-history.html:191`, `:236`; `whitepaper.html:883`; `pending-ratify-tax-50-advocacy.html:117` | Correct |
| 34 | Founding-corpus preamble | `laws.html:1529` | Correct |
| 35 | Cross-crediting dates from LP-074 | `laws.html:1545` | Correct |

---

## 2. Three sentences to fix

**2-A. Ruling 28, LP-055.** `law-polling.html:1977` — "a 5-year mandatory window between initial request and removal procedure". The entry now ends "Removal itself stayed open to any citizen inside VMSS territory", so a window before a "removal procedure" still has the pathway granting removal.
- Replace with: "a 5-year mandatory window between initial request and recognition of the status".
- The two quoted lines are trimmed by deletion only; each surviving quotation is a subset of the old one. Correct.

**2-B. Ruling 9, mirror.** `laws.html:919` — "LP-002 (2095) is the oldest federal instrument specifying around a Primary Job Subsidy rate". Beside `laws.html:812` ("It sets no rate: the hourly rates stood as Charter text until LP-076") this now reads as the losing side.
- Replace with: "LP-002 (2095) is the oldest federal instrument on the Primary Job Subsidy; it defined qualifying roles and set no rate, two centuries before the cascade itself moved."

**2-C. Ruling 2, Academy Q32.** `academy-source.html:1773` — "Implants exist only as prototypes in limited consenting human trials, with no timeline for civilian deployment." The stem is set in 2026. The Roadmap puts human trials later in Phase 0 (`roadmap.html:209` — "early implant prototypes tested in animal models, then limited consenting human trials"), and "no timeline" is a detail no page states.
- Replace with: "Implants exist only as early prototypes; human trials and civilian deployment are still ahead."

---

## 3. The calls you made

- **Founding-pace edits to the roadmap under ruling 1.** Correct. They are the edits from the v25.9.6 review, section C5, word for word, and the figures come from the register: LP-072's "roughly one million citizens", LP-001's 300 million and LP-024's "3-billion population". The Phase 0 line agrees with them.
- **`rate-history.html:255`, the intervals.** Correct. With Y0 = 2026 the point cascade at Y47 is 2073, so 2073 to 2213 is 140 years and 2213 to 2276 is 63. "The fifth beat did not follow the rhythm" follows from those numbers and adds no fact.
- **`llms.txt:79`, "The five layers existed as territories, voting as layers, before the walls made them rings."** Correct. It is the sentence that lets the 22nd-century ratification votes stand beside a later wall, and the roadmap now says the same at `:282`.
- **Ruling 33 naming Lower.** Correct. The draft died at the Meritboard, so every later chamber, Lower included, is advisory.
- **Ruling 12.** Correct. The general civic floor stays in -3; only the educational floor stops at -2.
- **Ruling 4.** Correct. "When civilian deployment began" dates nothing to the 2030s.
- **Doctrine notes.** Correct, and Resource 14 carries one as well as 16, 17 and 18. Resource 18's is a fair mirror.
- **`laws.html:899` and `whitepaper.html:883`.** Correct. LP-070 is 2211, before the refusal, so the audited-evidence condition has to be dated later, as `laws.html:1545` does.
- **`world.html:441`, "ring-boundary checkpoints".** Correct. The counts hold (four inward, five boundaries with the perimeter).
- **`resources-source.html:679`, "the Bay itself remaining Canadian".** Correct. It is Resource 14's own statement at `:666`.
- **Off-canon chips on Earth Introduction (v14.1) and its Alternative (v16.0).** Within the limits: the story text and the stamp strings are unchanged, and only a chip, an attribute and a comment were added. The chips follow from rulings 1 and 2. They are a labelling decision beyond the 35, and the owner's standing ruling left stamped stories under their stamps, so this goes to the owner for confirmation (4-C). I agree with it.

---

## 4. Mirrors, limits, and what remains open

**Mirrors.** Searched every page for: content mediation; era years above Y99 and era years in brackets; "uniform across layers"; "upper and middle layers"; a Tier 1 sanction withdrawing medical technology; "reached full height"; "is projected at"; "home-layer parity"; "institutionally administered"; "internal or external"; the LP-002 rate wording; "single assault"; "reserve currency"; revocation; "command authority node"; first-generation opt-in. Nothing in the Charter-to-descriptive tiers still states a losing reading, apart from 2-A and 2-B. The R16 §3 paragraph on `pending-ratify-tax-50-record.html:179` still infers Y0 = 2101; it is a process record left as written, and the banner at `:125` supersedes it. That is the right handling.

**Limits.** All held.
- `charter.html`: no diff.
- Stories: the only changes in `simulations.html` are the two chips with their attribute and comment. No story text and no Doctrine Snapshot string changed.
- Register: no Title, Type, Outcome or vote field changed. The one field edit is LP-078's Scope line, which is ruling 13.

**Owner items still open.** Three, all small.

- **A. LP-002's Title.** "PJS Rate Calibration — Medical Research Roles" (`law-polling.html:341`, `:709`; `laws.html:400`, `:808`) against a summary that says it set no rate. *Recommend lifting the Title freeze for this one entry:* "PJS Qualifying Roles — Medical Research".
- **B. Resource 20, payment to an upper-layer seller.** `resources-source.html:1400` pays a Lumen (-1) seller in its own currency and adds "No currency converts upward". That is right for a lower-layer seller. For an Axis (Main) firm selling to a Lumen buyer, payment in the seller's currency would be the upward conversion `charter.html:203` forbids. My recommendation 18 was worded too generally. *Recommend one more sentence:* "A sale in the other direction is paid in the buyer's currency, which the seller can spend only in that layer."
- **C. The two Off-canon chips** (section 3). *Recommend confirming.*

Everything else on the 35-item list is closed.
