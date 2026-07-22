# VMSS v23 Law Pressure Test — Handoff Prompt (Claude)

**Run 1 (complete, verified):** Claude Opus 4.8, extended thinking ON. Results: `v23-pressure-test-results-opus.md`; review: `v23-pressure-test-review-opus.md`.
**Run 2 (effort experiment):** Claude Opus 4.8, **extended thinking OFF** (or the lowest/medium thinking setting the UI offers). The prompt below stays byte-identical — the only variable is reasoning effort. Purpose: measure whether defect rate, false-gap rate, and finding selection shift when the model thinks less. Note against the corpus as it stood at run 1 (LP-001–LP-076): LP-077/LP-078 were enacted after run 1's findings, so a run-2 model working from updated files may correctly find the S20/S9 territory already covered — that is a valid finding, not an error.
**Run 2 (complete, verified):** ran against the post-enactment v23.1.0 corpus. Results: `v23-pressure-test-run2-results-opus.md`; review: `v23-pressure-test-run2-review-opus.md`. Signature degradation: attribution precision (~13 right-text-wrong-label defects), zero gaps claimed.
**Run 3 (complete, verified):** Claude Opus 4.8, low effort (exact setting still unrecorded — ask Jason). Results: `v23-pressure-test-run3-results-opus.md`; review: `v23-pressure-test-run3-review-opus.md`. Cleanest Opus run of the campaign (~6 minor defects/~200 citations, 0 fabrications, 0 superseded); S19 gap narrowed (queue-5 rediscovery), S17/S6 frictions resolved by existing text. Predictions failed: low beat medium on both models. Six-run conclusion table lives in the run-3 Opus review.
**Run 4 (complete, verified — fabrication-floor test):** Sonnet at default thinking (exact model+setting still unrecorded — ask Jason; run-3 settings also open). Results: `v23-pressure-test-run4-results-sonnet.md`; review: `v23-pressure-test-run4-review-sonnet.md`. **FLOOR HELD — success criterion met on both run-4 halves; campaign complete at eight runs.** 0 fabricated instruments/numbers/quotes, 0 superseded passes in ~300 checked items; 2 misattributions (incl. the predicted LP-035 scope trap — real quote, wrong jurisdiction) + soft glosses; all 20 outcomes survive. Deepest recall find of the campaign: S7's unimplanted-mother abortion carve-out is verbatim Charter text (charter.html:250, 267). S19 friction narrowed = third facet of held queue candidate 10 (elective-residency fiscal/birth attribution), now double-signaled; S11 friction defeated as framed. Sub-frontier tiers qualify for regression sweeps (steelman mandatory; verify quote scope/contiguity). Erratum: this prompt's corpus description omits laws.html's Tier 3 Layer-Wide/Tier 4 District structure — fix at next prompt revision, not silently.
**Attach:** `laws.html`, `law-polling.html`, `charter.html` (adjudicate strictly from these three files — do not import outside assumptions).

---

## Prompt (paste everything below this line)

You are an adjudication examiner for VMSS, a fictional constructed society (an ~2290s multi-layer orbital settlement system). Attached are its three governing corpora:

1. **`charter.html`** — Tier 1, the Charter. Supreme over everything else.
2. **`laws.html`** — the consolidated code: Tier 1 pointer, Tier 2 Federal Law (subject clusters: Taxation & Rate Law; Economy, SCM & Anti-Concentration; Defense, Force & Visitation; Technology, Implants & Continuity; Governance, Process & Disclosure; Justice & Enforcement; Population & Family; plus the Founding Corpus acts), and Tier 3 Regulatory.
3. **`law-polling.html`** — the ratification record. Every statute has an LP number (LP-001 through LP-076). This is where legislative history, redrafts (e.g. LP-047 → 047.2 → 047.3), and failed proposals live.

**Read all three files before writing anything.**

### Your task

Invent **20 scenarios** set inside VMSS and adjudicate each one against the attached corpus:

- **Scenarios 1–10 (Organic):** ordinary life. Residents doing normal things — moving between layers, earning, saving, raising children, dying and being revived, filing complaints, running a business, visiting a lower layer. No one is scheming. The test is whether the corpus *quietly and completely* governs everyday life.
- **Scenarios 11–20 (Pressure):** adversarial. Rules-lawyers, bad-faith actors, edge-of-definition cases, timing exploits, jurisdictional arbitrage, instrument-vs-instrument collisions. The test is whether the corpus *holds under attack*.

**Your comparative advantage is altitude: favor scenarios that sit at the seams between instruments** — where two or more statutes, or a statute and a Charter article, must interlock correctly. A scenario that exercises one law in isolation is less valuable than one that forces three instruments to agree.

### Adjudication rules

1. **Cite or flag — never improvise.** Every ruling must cite specific instruments: Charter article numbers (e.g. Article XVIII), statute names with their LP numbers (e.g. Visitor Defensive Force Protection — Third Pass, LP-047.3), Founding Corpus acts, or Tier 3 regulatory entries. Quote or closely paraphrase the operative clause.
2. **Assume stacked redundancy before declaring a gap.** VMSS deliberately layers 3–5 overlapping enforcement envelopes on every load-bearing function. Before you declare "no law governs this," list every envelope you checked (implant instrumentation, secondary observation, ledger integrity, civic floor, federal reach, enforcement chain, etc.) and show why each one fails to reach the scenario. A gap claim with fewer than three checked envelopes is not credible.
3. **Gap protocol.** If, after the envelope sweep, no instrument genuinely governs, mark the scenario **⚠ GAP — CANDIDATE LP** and state: (a) the nearest instruments and precisely why each falls short, (b) what a new statute would minimally need to decide. **Do not draft the statute** — drafting happens downstream.
4. **Distinguish "gap" from "deliberately unregulated."** VMSS leaves real space ungoverned on purpose (governance restraint is itself codified). If the corpus's silence looks intentional, say so and cite the restraint-side instrument instead of flagging a gap.
5. **Preserve the corpus's hedges.** Where the text says "tends to," "naturally," or leaves variance, do not adjudicate as if it were a bright-line rule. Rule on what the text actually commits to.

### Calibration facts (to prevent drift)

- The live inter-layer rate schedule is **50 / 25 / 12.5 / 6.25, effective 2295** (RATIFY-TAX-50-II conditional schedule). Any earlier schedule you find in the ratification record is superseded history.
- Lower layers are not lawless zones. The federal floor (Civic Floor Act, Federal Reach Boundary Act, Enforcement Chain) applies at every layer, including -3. Layer -3's private-justice culture is variance on top of the floor, not a replacement for it.
- The founder never appears as an in-world actor. Scenarios must be populated entirely by residents, visitors, and institutions.
- Spread scenarios across layers (+1 through -3), across visitor/resident/minor statuses, and across all subject clusters. No more than three scenarios in any one cluster.

### Output format (per scenario)

```
### S{n} [ORGANIC|PRESSURE] — {short title}
**Scenario:** {150–250 word narrative. Concrete people, concrete numbers, concrete timeline.}
**Governing instruments:** {ordered list — controlling instrument first, supporting envelopes after; each with citation + operative clause}
**Ruling:** {what happens to whom, and which instrument decides each element}
**Seams exercised:** {which instrument-to-instrument handoffs this scenario forced, and whether they meshed cleanly}
**Verdict:** COVERED | COVERED-WITH-FRICTION (explain the friction) | ⚠ GAP — CANDIDATE LP (envelope sweep + minimal-decision statement)
**Confidence:** high | medium | low — with the sentence you are least sure about
```

Close with a **summary table** (scenario, verdict, controlling instrument) and a ranked list of any GAP or FRICTION findings, most load-bearing first.
