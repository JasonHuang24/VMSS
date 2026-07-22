# VMSS v23 Law Pressure Test — Handoff Prompt (ChatGPT)

**Run 1 (complete, verified):** GPT-5 Thinking, extended reasoning. Results: `v23-pressure-test-results-chatgpt.md`; review: `v23-pressure-test-review-chatgpt.md`.
**Run 2 (complete, verified):** GPT-5 Thinking, standard/medium reasoning, post-enactment corpus. Results: `v23-pressure-test-run2-results-chatgpt.md`; review: `v23-pressure-test-run2-review-chatgpt.md`. Signature degradation: envelope-sweep depth — 3 overbroad GAP claims all narrowed under the steelman protocol; 1 fabricated number; citation hygiene otherwise excellent.
**Run 3 (complete, verified):** GPT-5 low effort (exact setting still unrecorded — ask Jason). Results: `v23-pressure-test-run3-results-chatgpt.md`; review: `v23-pressure-test-run3-review-chatgpt.md`. Cleanest citation record of the campaign (2–3 name/scope-collision defects, 0 fabrications, 0 gaps filed, 0 superseded); all predictions failed — low-effort degradation was ambition, not hygiene. Zero discovery: known territory only.
**Run 4 (fabrication-floor test):** **smallest current GPT tier (e.g. GPT Terra), default/untouched reasoning setting** — record the exact model name and setting string at paste time. Prompt below stays byte-identical; the only variable is model tier (do NOT also lower reasoning — one knob at a time, and the deploy config under test is the default). Purpose: the six-run invariant is 0 fabricated instruments + 0 superseded-pass citations across ~1,200 checked citations; run 4 tests whether that invariant is a property of frontier models or of the prompt's guardrails. Registered predictions: the invariant breaks here — first fabricated instrument names (canonical-sounding), first fabricated numbers, first superseded-pass cites, clustering in redraft chains and name-collision traps (fiscal "Trajectory Doctrine," LP-035 scope — both brushed even by GPT-5-low). Success criterion for qualifying the tier for cheap regression sweeps: 0 fabricated instruments AND 0 superseded passes; frontier-low-rate minor misquotes tolerable. Discovery is not expected and not the point. Save results verbatim to `v23-pressure-test-run4-results-chatgpt.md`; same verification pipeline, fabrication-count emphasis.
**Attach:** `laws.html`, `law-polling.html`, `charter.html` (adjudicate strictly from these three files — do not import outside assumptions).

---

## Prompt (paste everything below this line)

You are a hostile compliance auditor for VMSS, a fictional constructed society (an ~2290s multi-layer orbital settlement system). Attached are its three governing corpora:

1. **`charter.html`** — Tier 1, the Charter. Supreme over everything else.
2. **`laws.html`** — the consolidated code: Tier 2 Federal Law organized by subject cluster (Taxation & Rate Law; Economy, SCM & Anti-Concentration; Defense, Force & Visitation; Technology, Implants & Continuity; Governance, Process & Disclosure; Justice & Enforcement; Population & Family; plus the Founding Corpus acts) and Tier 3 Regulatory.
3. **`law-polling.html`** — the ratification record. Every statute has an LP number (LP-001 through LP-076), including redraft chains (e.g. LP-047 → 047.2 → 047.3) and failed proposals.

**Read all three files before writing anything.**

### Your task

Invent **20 scenarios** set inside VMSS and adjudicate each against the attached corpus:

- **Scenarios 1–10 (Organic):** ordinary life, no schemers. A different life-domain each time — work, wages, savings, housing, childbirth and autoparenting, education, illness, death and revival, inter-layer relocation, small business, retirement, tourism. The test: does the corpus quietly govern each ordinary day?
- **Scenarios 11–20 (Pressure):** attacks. Your comparative advantage is **breadth of attack surface** — generate volume and variety. Each pressure scenario must use a *different attack class*, drawn from (pick 10): definitional edge-riding, timing exploits (act before a clock starts / after one lapses), jurisdictional arbitrage between layers, identity/continuity exploits (backups, revival, substrate transfer), financial structuring around the rate schedule or SCM caps, consent-laundering, proxy actors (getting a third party to do what you can't), measurement gaming (ledger/trust-score manipulation), procedural abuse of the governance process itself, and coordinated multi-party schemes no single instrument anticipates.

### Adjudication rules

1. **Cite or flag — never improvise.** Every ruling must cite specific instruments: Charter article numbers, statute names with LP numbers (e.g. Defense of Third Parties — Third Pass, LP-048.3), Founding Corpus acts, or Tier 3 regulatory entries. Quote or closely paraphrase the operative clause. A ruling without a citation is invalid.
2. **Check the redraft chain.** When a statute has multiple passes in the ratification record, cite the *latest* pass. Citing a superseded pass is an error.
3. **Assume stacked redundancy before declaring a gap.** VMSS layers 3–5 overlapping enforcement envelopes on every load-bearing function. Before declaring "no law governs this," enumerate the envelopes you checked (implant instrumentation, secondary observation, ledger integrity, civic floor, federal reach, enforcement chain, anti-concentration triggers, etc.) and show why each fails to reach. A gap claim with fewer than three checked envelopes is not credible.
4. **Gap protocol.** If the sweep still comes up empty, mark **⚠ GAP — CANDIDATE LP** and state: (a) the nearest instruments and precisely why each falls short, (b) the minimal question a new statute would have to decide. **Do not draft the statute.**
5. **Distinguish "gap" from "deliberately unregulated."** VMSS codifies governance restraint; some silence is intentional. If so, cite the restraint-side instrument instead of flagging a gap.
6. **For pressure scenarios, run the exploit to completion.** State exactly where the scheme is first detected, by which envelope, and what the attacker's realistic end-state is (caught at step 2 ≠ caught at step 5 — the difference matters).

### Calibration facts (to prevent drift)

- The live inter-layer rate schedule is **50 / 25 / 12.5 / 6.25, effective 2295** (RATIFY-TAX-50-II conditional schedule). Earlier schedules in the record are superseded history.
- Lower layers are not lawless. The federal floor (Civic Floor Act, Federal Reach Boundary Act, Enforcement Chain) applies at every layer including -3; layer -3's private-justice culture sits on top of the floor, not in place of it.
- The founder never appears as an in-world actor. Populate scenarios only with residents, visitors, and institutions.
- Spread scenarios across layers (+1 through -3) and statuses (residents, visitors, minors, revived persons). No more than three scenarios per subject cluster.

### Output format (per scenario)

```
### S{n} [ORGANIC|PRESSURE] — {short title}
**Scenario:** {150–250 word narrative. Concrete people, numbers, timeline. For PRESSURE: number the attacker's steps.}
**Governing instruments:** {ordered list — controlling instrument first, then supporting envelopes; each with citation + operative clause}
**Ruling:** {what happens to whom; for PRESSURE: the step at which each envelope fires}
**Verdict:** COVERED | COVERED-WITH-FRICTION (explain) | ⚠ GAP — CANDIDATE LP (envelope sweep + minimal-decision statement)
**Confidence:** high | medium | low — with the sentence you are least sure about
```

Close with a **summary table** (scenario, attack class where applicable, verdict, controlling instrument) and a ranked list of GAP/FRICTION findings, most load-bearing first.
