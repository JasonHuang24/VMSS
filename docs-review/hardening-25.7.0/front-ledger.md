# Hardening 25.7.0 — unit "front" ledger

Files: faq.html, why-vmss.html, index.html, join.html, audiobook.html, simulations-resources.html, simulations-academy.html.
Matching plan items (bucket fix/lift/broken): 21. Applied: 21. Declined: 0.

## Applied

### faq.html
1. (fix) "When population-average savings cross the layer threshold ... leaving average citizens unaffected" → "When a district's aggregate savings ... cross the layer's trigger, a monthly garnishing activates on every citizen's savings ... it switches off ..."
2. (lift) "The $10 million threshold and layer-specific SCM scope are unchanged." → "Those top marginal rates apply only to earned income above $10 million, and the cascade does not change the ... (SCM) ..."
3. (lift) "both begin at zero" → "both begin with an empty record and a null STI (no score at all until 18)"
4. (lift) "VMSS measures only outward actions ..." → "VMSS judges only outward actions ...; the ledger's cognition track ... is never public and triggers nothing by itself."
5. (lift) "closer to a frontier with no sheriff" → "closer to a frontier with no federal marshal"
6. (lift, :229) "That schedule is federal-tier, under LP-076 and consolidated in the Central Banking Authority; ..." → "That schedule is set by federal law (LP-076) and published in VMSS Laws under the Central Banking Authority entry ..."
7. (lift, :636) "The retention schedule is a federal-tier schedule under LP-076, ... not Charter text:" → "The retention schedule, set by federal law and published in VMSS Laws under the Central Banking Authority entry, keeps"; pinned figure string byte-exact.
8. (lift) "an unsigned genesis claim, charged to the originator and never to the instance" → "(LP-077), the registration that makes an AGI a citizen of record ... a violation charged to whoever created it, never to the AGI instance itself."
9. (lift) "The implant ledger removed the error." → "The implant ledger removes almost all of that error."
10. (lift) "nobody has ever wanted to touch them." → "no proposal to change them has ever been carried through."
11. (lift) h4 "What about hereditary grievance over 500 years?" → "What about grievances that last for centuries?"
12. (fix) Card categories: military (faq-content-59) and lower-layer resistance (-60) → data-cat="governance", moved to the end of the Governance run; PJS (-25) and overtime (-26) → "economy", moved to the end of the Economy run; daily life in -3 (-27) → "lower-layer", moved to the end of the Lower Layer run. ids and aria-controls unchanged.

### why-vmss.html
13. (lift, #4) "The $10 million threshold and SCM remain unchanged." → "The cascade's top marginal rates apply only to earned income above $10 million, and it leaves the ... (SCM) untouched."
14. (lift, #12) Cut "Beyond creating empathy as entertainment, neural diving structurally collapses ... through Audience Mode." → "Neural diving's effect on radicalization (section 8) is one example: the civilization did not design ..."; tool-list parenthetical cut → "The tools are already in the architecture and handle ..."
15. (lift, #27) "Article III.V's progressive liquidation (its retention bands federal-tier under LP-076, not Charter text) ..." → "Progressive liquidation (Article III.V) takes nearly all ...; what survives is converted into -3 currency at the Article III.IV purchasing-power gradient. The Ceiling Seal, which bars any return upward, ..."
16. (fix, lift-introduced f437acb) "VMSS makes no utopian claim about violence;" → "VMSS does not solve violence by being utopian;"
17. (fix) "in four words: you can leave." → "in three words: you can leave."
18. (lift, #24) "The first 23 sections convince you the system is sound." → "The other sections argue that the system is sound."
19. (lift, #21) "that published 10% is the most honest founding document ever written." → "publishing that 10% makes VMSS's founding record the most honest ever written." Optional cut taken: "The honesty is structural." removed.

### join.html
20. (lift) "Submit your application below — reviewed against ... behavioral trajectory" → "Submit your application below. It is reviewed against ... behavioral trajectory to set your starting layer."

### index.html
21. (lift) h2 "What makes this feel more like a civilization model than a concept page" → "Three principles the system runs on"; deck "Beyond atmosphere, the aim is legibility: ..." → "The moral logic behind the rings and the technologies that enforce it."

### audiobook.html
22. (lift) "VMSS doctrine v8.5 is an earlier snapshot of the architecture, presented without flair." → "It was recorded from an earlier version of the doctrine (v8.5), so some details have since changed, and it is narrated plainly."

### simulations-resources.html
23. (lift) Stat "3000+ / Era Coverage" → "Year 3000+ / Timeline reach"; intro acronyms expanded: "Selective Ascension Domains (SADs) and Metric Gated Domains (MGDs)"; category list split into three sentences (optional taken).

(Entries above are numbered by edit location, not by plan item: entries 2 and 13 are one plan item, and so are entries 6 and 7. That makes 21 plan items applied.)

## Declined
None.

## Extra scope
- simulations-resources.html intro: "Reference materials for VMSS doctrine studies in three categories: X (...), Y (...) and Z (...)." → "Reference texts for studying VMSS doctrine, in three categories. X covers ... Y covers ... Z covers ..."
- simulations-academy.html intro: "... each with a difficulty rating, ... The Academy teaches The Five Rings through adversarial engagement rather than passive reading." → "Each carries a difficulty rating, ... The Academy teaches The Five Rings adversarially: you learn the system by arguing with it."
- faq.html: the moved philosophy-section cards had h3 titles; changed to h4 to match their new edge-case siblings under the h3 subsection headers. Dropped two now-misleading HTML comments ("<!-- Economy -->", "<!-- Lower Layers -->") that labelled the moved cards.

## Notes
- JSON-LD: of the changed answers, only "Do children born in lower layers inherit their parents' status?" appears in the FAQPage JSON-LD, and its text never carried "begin at zero" (it says "zero STI violations, zero criminal history", which matches the unchanged visible first sentence). No JSON-LD edit needed. Moved cards' JSON-LD entries are unaffected by category.
- Item 15 drops "LP-076" from why-vmss #27, and item 6/7 keep LP-076 only at faq:229, per the plan's explicit instructions. This is an exception to the frozen-citation rule, made because the plan item says to remove it.
- Moved cards were appended to the end of each destination run, and faq-content ids are now out of numeric order in the DOM. The ids stay unique and paired; check-canon is green (141/0) and so is check-css-cascade.
