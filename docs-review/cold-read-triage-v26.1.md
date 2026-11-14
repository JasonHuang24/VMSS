Of the 66 items, 9 are real contradictions, 56 are apparent and 1 is a reader error; 14 need no change because a chip, note or statement already covers them. Every other item has an exact fix below. The readers' largest single complaint, vote tables that read as failed, is a display fault: the ratification figure exists only as CSS-generated text.

# Triage of the cold read of v26.1.0 (main at d30847e)

Proposals only; no site file is changed. Line numbers are HTML lines at `d30847e`. Three reviewers read every cited passage on the pages before classifying; a fourth worked through the readers' sections 4 and 5; I decided the ten items several readers raised. Every "before" text was checked mechanically against the page (41 of 41 found).

Marks: **REAL** the passages disagree. **APPARENT** they agree, and the page does not let a newcomer see it. **READER ERROR** a misreading the page does not invite. **INVENTION** a fix that states something no page says.

Three of the apparent items trace to wording I supplied in earlier reviews: B-11, C-5 and A-5.

---

## 1. Items several readers raised

**T-1. One act or a pattern for descent to -1** (A-4, B-2, C-2, E-1, E-2). APPARENT, and close to real: Article I names single qualifying events and Article XIV says a single-axis violation is corrective. The site's own reading is that the Main-to-(-1) threshold is categorical (`whitepaper.html:574`); no sentence joins the two.
- `whitepaper.html:566`, after "constitute a qualifying event for layer reassignment." add: "The axes scale the response to every act; they do not displace the thresholds the Charter fixes by kind. One act of the incarceration class, such as driving under the influence, assault or fraud at meaningful scale, crosses from Main to -1 (Article I, §6.3), and capital harm goes to -3 from any layer; below Main, and for conduct no rule names, the axes decide."
- `faq.html:129`: "That holds from Sanctuary through -1." → "That holds from Sanctuary through -1, except that in -1 a moderate, isolated, reversible assault draws corrective intervention only." (REAL; `laws.html:1906`)
- `simulations.html:57`, after "The criminal path, track 2, moves the ring and never waits on the score." add: "Minor infractions stay on track 1 only while they are corrected; a sustained, uncorrected pattern of them is itself a qualifying event under Article I and moves to track 2."
- `simulations.html:108`: "Harassment no law broken" → "Harassment a single episode, no law broken".

**T-2. Automatic reassignment against "no single metric"** (B-13, C-3). APPARENT. Article XII bars a metric from deciding, not an act.
- `whitepaper.html:536`, after "The STI score informs the evaluation — it does not dictate the result." add: "The rule bars a single metric, such as the STI score, from deciding placement; it does not bar a single act the Charter itself attaches a placement to, such as a sixth child or an unpaid replenishment debt under Article XXVII (§13.2)."

**T-3. STI weights on domains or on dimensions** (C-7, D-2). APPARENT.
- `whitepaper.html:515`: "The weights on the seven measurement domains evolve as the civilization's understanding of trust matures." → "The weights among them, applied through the seven weighted measurement domains that observe them, evolve as the civilization's understanding of trust matures."
- `laws.html:2702`: after "are the operational layer through which they are observed" add ", and the domain weights are how the weighting among the dimensions is expressed".

**T-4. "No judge weighs the case" against courts and review** (B-3, E-9). REAL on World and in two stories.
- `world.html:1109`: "they are prosecuted under VMSS law and, if convicted, face layer reassignment identical to any other perpetrator." → "they are processed under VMSS law like any other perpetrator: the ledger is the evidence, and layer reassignment follows the act without a trial."
- `whitepaper.html:975`: "Article XVIII's contextual evaluation weighs impairment" → "Article XVIII's contextual evaluation (what Article XXVI calls judicial review; no judge weighs the case) weighs impairment".
- Under the stamp at `simulations.html:500` (The Industrial Polluter): "Doctrine note — in current canon reassignment runs without trial or sentence: the AI governance system evaluates the ledger and no judge weighs the case, so the prosecution and court shown here belong to the stamped version."
- Under the stamp at `simulations.html:275`: "Doctrine note — in current canon reassignment runs without trial and its assessment is automated; the human review shown here belongs to the stamped version."

**T-5. -3 with "no federal intervention or monitoring" against the federal floor and the ledger** (B-4, E-6, A-5). APPARENT.
- `whitepaper.html:451`, after "the same district manufacturing nuclear weapons or coordinating an attack on the implant ledger is not." add: "For a violator who already lives in -3, the reassignment Articles XXV.II and XXV.III attach has no lower ring to send them to, and the Charter leaves their continued individual pursuit to -3's private justice; organized pursuit that threatens the architecture runs on Article XXV.IV." (Restates `charter.html:377`; "no lower ring" is an inference.)
- Under the stamp at `simulations.html:6484`: "Doctrine note — -3 runs no enforcement drones and no conduct monitoring for reassignment, but the public ledger still travels with every resident and the national defense track still watches for threats to sovereignty."
- `layers.html:154`: "only capital harm draws the state, and it sends the offender to -3." → "among ordinary offenses only capital harm draws the state, and it sends the offender to -3; the absolute federal laws, such as the bar on implant tampering, reach -2 as they reach every ring."
- `simulations.html:3705` (Gray Kilometers' note): "the -2 boundary is capital harm: a murder or another capital act such as child rape." → "the -2 boundary on violence is capital harm, a murder or another capital act such as child rape, and federal law binds -2 as it binds every layer."

**T-6. Leakage: the Charter's 25% against the roadmap's 90% in 2026** (B-9). APPARENT.
- `roadmap.html:53`, after "reaches approximately 25% by 2150," add: "(the point where the Charter's Article XXIII trajectory starts; the founding baseline was far higher)".

**T-7. A retained dollar becomes 0.65 tokens, against 10% retained** (C-5). APPARENT; my wording.
- `whitepaper.html:893`: "A dollar brought down through the retention schedule becomes about 0.65 compliance tokens," → "Each dollar the retention schedule leaves the citizen becomes about 0.65 compliance tokens,".

**T-8. Regulatory vote tables that read as failed** (D-5). REAL as displayed. The ratification figure is not in the page text. It is generated by CSS from a `data-rat` attribute (`law-polling.html:136`), so a text reader, a translator or a copy sees only "74% support saturation" under a heading that says "Percentage is Support Saturation". All 64 hidden figures are between 81 and 99.
- Write the generated text into each cell and delete the `::before` rules (`law-polling.html:136–137`, `:262–263`). Example, `law-polling.html:2831`: `<td class="pass" data-rat="82">82% ✓ Ratified · 74% support saturation — …`. No figure changes; the vote moves from the stylesheet into the text.
- In the 17 table headings: "Percentage is Support Saturation" → "Ratification vote, then support saturation".
- `law-polling.html:2670`, at the end of the sentence on the two figures add: "A failed vote is always printed as “yes (below 80% floor — FAILED)”."

**T-9. World makes LP-062.2 look like an override of a founding line** (B-1). APPARENT.
- `world.html:1217`: after "unless the bearer has switched that coverage off" add "; the bearer keeps that switch, so Main stays a post-intervention layer under the Charter".

**T-10. LP-042 against the order of authority** (D-4). APPARENT. LP-042 is a citation rule, not a ranking.
- `laws.html:306`: after "any published instrument page" add ", or, for a Founding Corpus entry, the whitepaper section given as its Source,"; and after "controls." add: "LP-042 sets what a filing may cite, not which primary text prevails; where primary texts differ, the Charter governs, then enacted law, then the whitepaper." (The Founding Corpus clause is an inference from LP-042 and the entries' Source lines; mild INVENTION.)

---

## 2. The remaining items, in reader order

### Reader A (newcomer's path)

- **A-1. REAL.** Murder victims "always" revive. `systems.html:420`: "Murder victims are revived in backup vessels at full fidelity with a small layer-dependent probability of revival failure." → "Murder victims are revived at full fidelity with a small layer-dependent probability of revival failure: from their own funded vessel or, if unfunded, by terminal sync capture within enforcement reach (LP-065), which in -2 is thin." `why-vmss.html:174`: "because the victim revives" → "because, within enforcement reach, the victim revives".
- **A-2. APPARENT.** `technologies.html:327`: "AR data corroborates evidence" → "AR's intent-signature data corroborates evidence"; and at the end of that sentence add "; AR's record of the act itself is evidence, as the implant's is".
- **A-3. APPARENT.** `technologies.html:354`: "fewer automated drops (none in -3)" → "fewer automated services (none in -3, and in every lower layer residents buy food in the layer's economy with UBI)".
- **A-4.** See T-1.
- **A-5.** See T-5.
- **A-6. APPARENT.** `faq.html:758`: after "a dynamic ranking system rather than an appointed body" add " (its top-ranked members review drafts and audits as a board, but no Meritboard member decides a reassignment)". `technologies.html:228`: "A Meritboard member who adjudicated the first -3 Terminal case carries the precedent" → "A Meritboard member who lived through the first -3 Terminal case carries its precedent".
- **A-7. APPARENT.** `layer--2.html:95`: "a portable revival rig, which cannot catch a bailout" → "a portable revival rig, salvaged or smuggled VMSS hardware that no private actor can build, which cannot catch a bailout".
- **A-8. APPARENT.** Under the stamp at `layer--3.html:164`: "Doctrine note — in current canon no one can send money to a person in another layer; funds reach -3 only through the mover's own visit or relocation, under the retention schedule."
- **A-9. APPARENT.** `faq.html:460`: "granting day-one access to gated communities that exclude the punitive demographic entirely." → "a signal that gated communities excluding the punitive demographic weigh from day one, though entry still needs vouching from established residents."
- **A-10, A-11.** No change; the Doctrine notes already answer them.
- **A-12. APPARENT.** `layer-0.html:107`: "The amber indicators it shows in -1" → "The amber indicators the story shows in -1".
- **A-13. APPARENT.** `systems.html:439`: "Total elapsed time from act to reassignment is minutes, not months," → "Reassignment takes legal effect the instant the act completes and transport follows within minutes, not months,". Under the stamps at `layer--1.html:110` and `layer-0.html:72`: "Doctrine note — in current canon reassignment takes effect the instant the act completes; transport follows within minutes and the automated assessment within hours."
- **A-14. APPARENT.** `faq.html:169`: "(e.g., Relational Integrity: zero infidelity;" → "(e.g., Relational Integrity Layer, a domain despite its name: zero infidelity;". `layer-+1.html:113`: "Relational Integrity's zero recorded infidelity" → "the Relational Integrity Layer's zero recorded infidelity".
- **A-15. APPARENT.** `systems.html:439`: "genuine constitutional novelty rather than" → "genuine constitutional novelty (a reassignment produced by verified institutional error counts as one, under Article XV) rather than". `technologies.html:456`: after "through the Supreme Court's novelty filter" add ", which includes the Article XV remedy for verified institutional error".

### Reader B (Charter, World, SADs, roadmap)

- **B-1.** See T-9. **B-2.** See T-1. **B-3.** See T-4. **B-4.** See T-5.
- **B-5. APPARENT.** `faq.html:470`: "In -2 and -3 the mandate reaches only VMSS-distributed funds; private earnings are untouched." → "In -2 and -3 the mandate reaches only VMSS-distributed funds, and the trigger reads each district's aggregate of UBI- and subsidy-origin savings (the Charter's 'that layer's aggregate' is read district by district, LP-069); private earnings are untouched."
- **B-6. APPARENT.** `roadmap.html:615`: "track the layers within full institutional reach: +1 Sanctuary, Main Layer, and -1 Noncompliance." → "track the layers the Charter counts as within full institutional reach for the leakage target (Article XXIV): +1 Sanctuary, Main Layer, and -1 Noncompliance, though -1's daily presence is partial."
- **B-7. REAL.** Vessels are made in Main and Sanctuary (`charter.html:245`). `world.html:536`: "They produce backup vessels, medical systems, advanced materials, and the physical substrate of continuity itself," → "They produce medical systems, advanced materials, and the physical substrate of continuity (the backup vessels themselves are manufactured in Main Layer and +1 Sanctuary, Charter Article IV),". `world.html:586`: "produce backup vessels and materials continuously" → "produce materials continuously".
- **B-8. APPARENT.** `world.html:1213`, after "(punitive placements and voluntary permanent residents)." add: "A visitor's link is suspended at the boundary for the length of the stay (LP-004.2), so a death inside -3 is final for visitors too."
- **B-9.** See T-6. **B-10.** No change; the roadmap's own label resolved it.
- **B-11. APPARENT;** my wording. `world.html:485`: "After 2218 the register falls silent until 2276." → "After 2218 the Law Polling register records no entry until 2276; the Precognition filings of those decades are recorded in Academic Resources (Resources 32 and 33)."
- **B-12. APPARENT.** `faq.html:758` and its copy at `:1038`: "appointed by the President from that ranking with no nomination process" → "appointed by the President, who names the highest-ranked active entity on that ranking whenever a seat opens or a justice is outranked, so there is no nomination process".
- **B-13.** See T-2.
- **B-14. APPARENT.** `world.html:698`, after "returned to VMSS territory for processing." add: "Inside VMSS territory removal is the citizen's lawful choice, with lost access as its only cost; abroad an attempt is tampering under Article XXV.III, the crude self-disabling the Charter rates as serious but not capital-tier."

### Reader C (whitepaper)

- **C-1. APPARENT.** Proposed or enacted. `whitepaper.html:246`: "A hybrid institutional draft describing" → "A hybrid institutional document describing". The label in 3.2 does the rest.
- **C-2.** See T-1. **C-3.** See T-2.
- **C-4. REAL.** Beliefs never enter the record (`charter.html:168`). `whitepaper.html:482`: "Sustained irrational belief patterns, ideological rigidity, documented reasoning failures" → "Documented reasoning failures shown in outward conduct (a belief or opinion never enters the record, §5.4)". `whitepaper.html:1233`: "Zero recorded cognitive distortions or irrational belief patterns." → "Zero cognitive distortions or irrational belief patterns found in the resident's consented periodic reasoning audits."
- **C-5.** See T-7.
- **C-6. APPARENT.** `whitepaper.html:613`: "The metric categories themselves are constitutionally defined" → "The metric categories themselves (the sub-rankings, such as executive-doctrinal-leadership and legal-interpretation, §7.6) are constitutionally defined".
- **C-7.** See T-3.
- **C-8. APPARENT.** `whitepaper.html:1273`, after "curates the original script of the four founding lines." add: "The Precognition Covenant Domain (PCD) runs the Predictive Intervention Architecture, the Forestalled Act Ledger and the Restorative Intervention Protocol as terms of the covenant each resident files and may revoke at any time without penalty; its governance body administers those terms and holds no authority beyond them."
- **C-9. APPARENT.** `whitepaper.html:1521`: after "under Article XXV.III" add " as crude self-disabling (serious but not capital-tier, unlike the immediate -3 that sophisticated compromise draws)".
- **C-10. APPARENT.** `whitepaper.html:1196`: "Voluntary permanent residency (VPR) is the single mechanism by which status and territory realign." → "For a citizen living below their own layer, voluntary permanent residency (VPR) is the single elective mechanism by which status and territory realign; punitive reassignment realigns them by consequence."
- **C-11. REAL.** `whitepaper.html:460`: "(non-withdrawable across all layers," → "(non-withdrawable across every layer it reaches," (`laws.html:1485`).
- **C-12. APPARENT.** `whitepaper.html:617`: "This contestation channel is the novelty path" → "Where civil courts meet a contextual question no existing doctrine answers, this contestation channel becomes the novelty path".

### Reader D (Code and register)

- **D-1. REAL.** `laws.html:615`: "Eight Charter amendments have been filed; seven failed," → "Eight Charter amendments have been carried to a disposition (filings withdrawn by their drafters never conclude and are not counted); seven failed," (`law-polling.html:489`).
- **D-2.** See T-3.
- **D-3. APPARENT.** `index.html:271`: after "has already committed a major violation" add ", or, under the Threshold Inhibition Protocol, attempted one, and the attempt is itself the violation".
- **D-4.** See T-10. **D-5.** See T-8.

### Reader E (stories)

- **E-1, E-2.** See T-1.
- **E-3. APPARENT.** Under the stamp at `simulations.html:1760`: "Doctrine note — “non-convertible” here means ordinary cross-layer trade: upward conversion is prohibited, and the only conversion runs downward through the retention schedule at the central bank’s settlement rate, which still rules out the arbitrage this story rejects."
- **E-4. APPARENT.** Under the stamp at `simulations.html:1682`: "Doctrine note — “prevention” here means institutional pre-intervention, which only the Heaven Layers run; in current canon Main remains post-intervention, but its implants carry the failsafe and an opt-in TIP that is on by default against sexual assault (LP-062.2)."
- **E-5, E-6.** See T-5.
- **E-7. READER ERROR.** The card describes an ally's -2. It exposed one real slip, though: `whitepaper.html:444` — "reduced institutional presence" → "partial institutional presence", as `:432` and `index.html:358` have it.
- **E-8. APPARENT.** `simulations.html:3786` (unstamped section introduction): "How notable figures from history would behave under VMSS rules, thresholds and social infrastructure." → "How notable figures from history would behave if each entered the mature VMSS, with implants and enforcement fully deployed; the ages and dates are the thought experiment’s, not the record’s, since civilian implants began only in the 2050s."
- **E-9.** See T-4.
- **E-10.** No change; the statement at `simulations.html:46` covers two cards that differ.
- **E-11. Optional.** Under the stamp at `simulations.html:858`: "Doctrine note — in current canon LP-004 failed at Sanctuary in 2111 and LP-004.2 was enacted in 2115; the destination-layer rate applies in -1 and -2 only where consent was structurally compromised, and no vessel link crosses the -3 boundary."
- **E-12 to E-20.** No change; each was labelled where the reader met it, and the label is enough.

---

## 3. The apparatus: what kind of text is this?

All five readers asked the same thing: is this history, a projection, or the site talking about itself? The answers exist, mostly in `llms.txt`, which no visitor sees. Every line below restates a page or `llms.txt`.

### 3.1 The home page

- `index.html:64`, after "Conceptual civilization study": "An invented civilization, described from inside as it stands in the early 24th century. How to read these pages: Reading this archive."
- `index.html:399`, added to the panel:
  - "The Charter page is the current consolidated Charter, as amended through 2299; “Enacted March 29, 2026” dates the founding text."
  - "An LP number is an entry in the Law Polling register; a suffix (LP-062.2) marks a redraft with its own outcome."
  - "“Process ruling R23” or “Founder ruling R13” is a 2026 drafting ruling by the site’s author, not an act of the civilization; “Resources R24” means Academic Resources text 24."
  - "Version numbers (“Doctrine Snapshot: v16.5”, “canon v22.3”) are editions of this website, now Version 26.1.0."

### 3.2 One line per page family

| Page family | Place | Label |
|---|---|---|
| Charter | cannot be edited | Carried by the panel sentence above; repeat it at `laws.html:615` |
| VMSS Laws | `laws.html:304`, above the first sentence | "In-world law: the code in force in the early 24th century. “Process ruling R23” below is this website’s 2026 drafting ruling, not an act of the civilization." |
| Law Polling | `law-polling.html:281`, above the first sentence | "In-world record: the register as it stood in the early 24th century (latest entries 2306). Version numbers and links to the stories are this website’s apparatus, not in-world events." |
| White Paper | `whitepaper.html:246`, after the subtitle | "Explanatory text, ranked below the Charter and enacted law, written from the early 24th century: events dated up to then are history; later dates are projections." |
| World, Systems, Layers, Technologies, Ascension Domains, Join | after each subtitle (`world.html:323`, `systems.html:100`, `layers.html:49`, and the same spot on the other three) | "Describes the civilization as it stands in the early 24th century; the Charter and enacted law govern where this page differs. See Reading this archive." |
| Why VMSS | `why-vmss.html:58` | "An argument for the system, written from the early 24th century; the Charter and enacted law govern. See Reading this archive." |
| FAQ, Roadmap | — | Already have it (`faq.html:55`, `roadmap.html:52`) |
| Simulations | `simulations.html:249`, after "are not recalculated." | "A Doctrine Snapshot stamp names the site edition a card was written against (the site is now Version 26.1.0); a card may show rules since changed, and the doctrine pages govern." |
| Stories on the layer pages | beside the first stamp on each layer page | "Illustration; see Simulations on stamps." |
| Academic Resources | `simulations-resources.html:52`, above the first sentence | "Teaching texts studied in the civilization’s Academy, ranked last in authority. Elsewhere they are cited as R1 to R33." |
| The Academy | `simulations-academy.html:52`, above the first sentence | "Teaching text: a graded answer is a student’s reasoning, not doctrine, and ranks last in authority." |
| Rate history | `rate-history.html:129`, after the first paragraph | "In-world record of the tax rates, as kept in the early 24th century. The Provenance column gives this website’s edition numbers, which are drafting history, not in-world dates." |
| Path 2 pages and the two in-world pages under the "Ratification Record" heading | after each subtitle | "In-world record: LP-074’s tax-rate law and the Path 2 audit that certified it (2278–2295)." |
| Process Record pages | in each existing banner | add "(this website’s drafting history, written in 2026)" |

One optional line for the stories: at `simulations.html:1909`, "From here, many cards follow allied nations that run their own gradient models; their rules are not VMSS law." The second half is stated nowhere, so it is a borderline INVENTION.

### 3.3 Three glossary entries (whitepaper, pages 32–34)

- **Path 2.** "The standing audit of fiscal facts that LP-074 requires before a top tax rate can fall; its 2294 audit certified 50/25/12.5/6.25, in force since 2295."
- **Chamber tally.** "“1–4 at gauntlet” counts the five ratifying chambers (Meritboard, Court, Sanctuary, Main, Lower): one for, four against. Passage needs zero failing chambers."
- **Heaven Layers.** "+1 Sanctuary together with the SADs nested inside it, where acts are halted before they complete; not a separate ring."

---

## 4. What this does not fix

- **T-1 is a gloss over a tension inside the Charter.** Articles I and XIV still read against each other on the Charter page itself, which cannot be edited. The gloss sits where a reader looks next.
- **A newcomer will still meet the stamped stories' older rules.** Notes and chips label them; they do not remove them.
- **The labels are short by design.** They tell a reader what kind of text each page is. They do not explain the doctrine's terms, which the glossary does.
