# Hardening 25.7.0 — unit "mechanism" ledger

Files: systems.html, technologies.html, sads.html, roadmap.html, world.html.
Matching plan items: 10 (fix/lift/broken). Applied: 10. Declined: 0.
`node tools/check-canon.mjs`: 141 passed, 0 failed.

## Applied

1. world.html §16 Tier 1 (fix)
   - Was: "Violation triggers Tier 2 escalation under the External Force Doctrine."
   - Now: "Violation triggers Tier 2 (Active Hostility) escalation under the Sanctions Architecture."
   - Tier 3 (same item): "…Tier 2 Active Hostility response under the External Force Doctrine…" → "…Tier 2 Active Hostility response of the Sanctions Architecture…"

2. world.html §21 Substrate Personhood (lift)
   - Was: "Creating an entity that meets the substrate test outside continuity-infrastructure enrollment produces an unsigned genesis claim…"
   - Now: split into short sentences; glosses added: signed enrollment "meaning registration in the continuity infrastructure that issues the instance a signed civic-ledger link"; "LP-064, the replenishment-tax law"; "clean-initialized in both directions: it has no claim on pre-fork property and carries none of the pre-fork liabilities." All provisions kept.

3. technologies.html Mega-Walls bullet (fix)
   - Was: "Above-stratosphere height: impervious to civilian aviation"
   - Now: "Stratospheric height (15km crest, above commercial cruising altitude): no civilian aircraft crosses it in routine operation"

4. world.html §9 Transparency (lift)
   - Was: "…there is no secret whose exposure could be threatened."
   - Now: "…there is no doctrinal secret whose exposure could be threatened."

5. roadmap.html Phase 2–4 (fix)
   - Was: "Two centuries of systematic construction and leakage reduction." → Now: "A century and a half of systematic construction and leakage reduction."
   - Lines 338/356: "Leakage: ~25% by 2150" → "Leakage: ~25% at phase start (2150)"
   - Lines 403/468: "Leakage by end of phase:" → "Leakage trajectory:"; lines 422/486: "Leakage target by end of phase:" → "Leakage trajectory:". Figures unchanged.

6. world.html repeats (lift)
   - §22 Earth: "The Great Migration out of Africa was driven by climate…" → "Every prior mass migration had a catastrophe behind it (see §2); people move at scale only when staying is worse than going."
   - §4: "One founding ally provided critical support…" → "The founding ally described in §2 remains the closest bilateral partnership in the alliance structure."
   - §9 callout: deleted "The doctrine portal you are reading is itself an expression of this principle."; remaining callout sentences kept.

7. world.html §3 war scenarios (lift)
   - Was: "…his facility was clean. The rat was not on his threat model." → Now: "…anticipated, because his facility swept clean and the relay rat was outside his threat model."
   - Was: "The asymmetry is total." + seven-line "You shoot their soldier…" list → Now: one prose paragraph opening "For a conventional military facing VMSS, every loss runs one way." Keeps all seven asymmetries (revival with intel, empty aircraft/ships, refabricated tank, commander restored with floor plan, crow surveillance, nanobot plume).
   - Other closers: "VMSS extracted all of it from the death itself." → "VMSS recovered all of it from the operator's death."; "The armor is intact." → "…captured combatants, and their armor is still intact."

8. world.html §10 Founders' Day (lift)
   - Was: "…past the ring stones: the four lines do nothing on their own, and everything in the presence of the people who read them."
   - Now: "…generation after generation, since the lines matter only when people gather to read them."

9. sads.html VLRC (lift)
   - Was: "…tired of book clubs where they hadn't been."
   - Now: "…tired of book clubs where the books hadn't been read."

10. systems.html Rights, Transparency, and Citizenship (lift)
    - Was: "Some information remains classified, namely military operational specifics and, beyond that, the exploit surface, never the rule."
    - Now: "Some information remains classified: military operational specifics and the exploit surface (operational details an attacker could use), never the rules themselves."

## Declined

None.

## Extra-scope changes / structural notes

- Item 7: the instruction required replacing the `<p><strong>` heading line and the `<ul class="list-disc pl-6 space-y-2 …">` list with one `<p>` inside the existing `.callout`. Those utility classes remain in use elsewhere on the site, so CSS parity is unaffected.
- Item 7: the plan said "scenario closers" (plural), so the Backup Vessel and Offensive Neural Warfare scenario endings were also rewritten as plain statements (listed above). The meaning is unchanged.
- Item 6: removing the §9 callout sentence also removed its `<strong>` wrapper.
- Item 8: used "since" instead of the plan's "because" to avoid a double "because" in the sentence.
- roadmap.html lines 533/549 ("Leakage by end of phase: ~0.1%") were outside the item's scope and left unchanged.
