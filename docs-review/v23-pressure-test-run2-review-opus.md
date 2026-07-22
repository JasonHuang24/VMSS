# v23 Pressure Test — RUN 2 Review (Opus 4.8, medium effort) — VERIFIED

**Reviewed:** `v23-pressure-test-run2-results-opus.md` (20 scenarios, Opus 4.8, extended thinking OFF).
**Method:** five parallel verification agents, every citation checked verbatim against `charter.html` / `laws.html` / `law-polling.html` (current working tree = v23.1.0, matching what the model read), with adversarial re-sweeps on all FRICTION claims and the S20 soft edge. Same pipeline as run 1.
**Corpus condition:** post-enactment v23.1.0 set (93 entries incl. LP-077/078/079) — not the pre-enactment snapshot. See the results file header for the analysis consequence.

---

## Headline

**All 20 verdicts survive.** 18 COVERED + 2 COVERED-WITH-FRICTION, and **both frictions were adversarially confirmed as genuine** — no false positives. Zero fabricated instruments, zero NOT-FOUND quotes, zero superseded-pass citations, zero flipped rulings. The defect profile is entirely **attribution-tier**: real corpus text credited to the wrong instrument or wrong sub-article, ~13 instances.

## Verdict survival table

| # | Verdict claimed | Survives? | Defects found |
|---|---|---|---|
| S1 | COVERED | ✔ clean | — (district-activation / individual-garnish mechanic applied correctly, $100k equilibrium exact) |
| S2 | COVERED-WITH-FRICTION | ✔ **friction CONFIRMED** | — ("10% retained" = citizen keeps 10%, correct reading; "economically viable" gloss confirmed confined to permanent-residency paragraph, charter.html:208 vs :212) |
| S3 | COVERED | ✔ clean | — |
| S4 | COVERED | ✔ | minor: 40-day memory-gap-on-revival is an uncited (non-contradictory) inference, not corpus text |
| S5 | COVERED | ✔ | trivial paraphrase softening on LP-049 classification clause |
| S6 | COVERED | ✔ clean | — (all 7 citations verbatim; LP-067→067.2 chain read correctly) |
| S7 | COVERED | ✔ | **MISATTR:** detention-staff-ledger clause → Private Justice Boundary Act (laws.html:1894), not Individual Attribution Act; LP-012 under-qualified (rerouted **and abandoned**, title "Main **Layer** Misdemeanors") |
| S8 | COVERED | ✔ | **MISATTR:** "currency wall… heirship recognition is not value transit" is LP-079's own sentence (laws.html:1441), not Article III.IV text |
| S9 | COVERED | ✔ **stronger than claimed** | — (Article XII/XIII phasing exemption is literal Charter text, charter.html:294/296, not inference) |
| S10 | COVERED | ✔ | **MISATTR ×2:** hunting-suspension sentence + "may not contradict" clause cited XXVIII.III, actually XXVIII.II (charter.html:444; corroborated by laws.html:308); minor: "80% direct ratification" verbatim string is laws.html:2725 not Charter; "derive/derived" tense drift |
| S11 | COVERED | ✔ | **MISATTR:** 96%/4% band labeled "Charter III.V retention bands" — Charter deliberately "reaches no band" (charter.html:209); numbers live in Central Banking Authority entry (laws.html:1498). 24-month lookback correctly located in CBA. |
| S12 | COVERED | ✔ | **MISATTR:** 12-consecutive-months idle window cited under LP-070 — actual source LP-069 register (law-polling.html:2307); LP-070 states no month-count anywhere. Minor: "sustained period" quote is Charter III.VII phrasing blended into LP-069. |
| S13 | COVERED | ✔ clean | — (every LP-077 quote verbatim; LP-064 40/60/90/135 exact — note the figures live only in the laws.html code entry at :713, not the register) |
| S14 | COVERED | ✔ | **MISATTR:** "effective at act-completion" belongs to Continuity Reliability Schedule (laws.html:1943), not Enforcement Chain (which independently supports "immediate") |
| S15 | COVERED | ✔ | **MISATTR:** Recall Protocol (extraterritorial/foreign-offense instrument, laws.html:2298) cited for intra-VMSS layer sorting; the correct instrument (Status-Based Jurisdiction, laws.html:2330) is already cited and does the work. "Preserver runs in both directions" verified as genuine corpus text. |
| S16 | COVERED | ✔ | **MISATTR ×3:** "load-bearing infrastructure" → Charter XXV.III (charter.html:378), not Ledger Integrity Act; divergence-triggers-review sentence → Secondary Observation Envelope only (laws.html:1615); "regardless of current layer placement" → XXV.II (charter.html:375), not XXV.III |
| S17 | COVERED-WITH-FRICTION | ✔ **friction CONFIRMED** | **MISQUOTE (context-shift), most serious defect of the run:** III.V's "legal classification, not an operational guarantee *of origin-layer infrastructure at the destination*" (charter.html:212) truncated and repurposed from an enforcement-jurisdiction clause into a tax argument. Friction itself is real (see below). |
| S18 | COVERED | ✔ | minor: Implant Instrumentation Act weakly paired with Cognition-Corroboration Spec (the Act's text is consent/mandatory-in-+1, not intent-corroboration). **Both LP-048.3 quotes verbatim-correct — the run-1 misquote did not recur.** |
| S19 | COVERED | ✔ clean | — (LP-078 ordered-activation + one-bit language verbatim; "Domain Boundary Act" confirmed real) |
| S20 | COVERED | ✔ | **MISATTR:** "logged, honored and irreversible" refusal right is Continuity Integrity Act text (laws.html:1960), not "Charter Article V / IV". "Regulates the coercer, never the choice" confirmed as genuine LP-063 text (law-polling.html:2127). |

## Adversarial findings

1. **S2 friction — CONFIRMED.** One progressive scale genuinely serves both elective transfer and permanent liquidation (identical endpoints, "same progressive scale," laws.html:1497–1498), with the reassuring "economically viable" gloss confined to the permanent paragraph. Presentational, outcome determinate — the model's own calibration was right.
2. **S17 friction — CONFIRMED, and it is a real corpus seam.** Exhaustive sweep (Article XXVII full text, LP-064 code + register, III.V/VI/VII, Status-Based Jurisdiction, grep for every elective-residency × reproduction intersection): **no clause settles whether a birth during elective -2 residency counts against the Main escalation curve at the moment of birth.** All the model's "meshing" citations are real text imported from adjacent non-reproduction contexts (enforcement posture, SCM denominators, criminal jurisdiction). Both readings defeat the arbitrage, so this is a clarification candidate, not an exploit — but the seam is genuinely unstated. **→ Queue candidate: one-line replenishment-attribution spec (registered-home-address at birth), parallel to III.VII's SCM denominator rule.**
3. **S20 soft edge — CONFIRMED absent in the three-file corpus, but likely closed out-of-corpus.** No authentication/timestamp rule distinguishes a genuine pre-registered refusal from a coerced one in charter/laws/law-polling. However, LP-063's canon-anchor line cites **Whitepaper §17.1.5 (Duress Signaling)** — a named mechanism outside the attached corpus that plausibly resolves exactly this. Check §17.1.5 before treating this as a queue item; it may already be covered (it also intersects the existing queue item 5, coerced-refusal rescission).

## Consolidated defect ledger

Substantive misattributions (real text, wrong instrument/sub-article): **12** — S7, S8, S10 ×2, S11, S12, S14, S15, S16 ×3, S20.
Context-shift misquote: **1** — S17 (III.V truncation).
Minor precision (paraphrase softening, tense drift, uncited inference, weak pairing, under-qualified status): ~6 — S4, S5, S7, S10, S12, S18.
Fabrications / NOT-FOUND: **0**. Superseded-pass citations: **0** (047.3, 038.2, 067.2, 048.3 all latest-pass). Flipped verdicts: **0**.

Clean scenarios (zero defects): S1, S2, S3, S6, S9, S13, S19 — 7 of 20.

## Effort-experiment observations (vs. registered predictions)

Registered predictions for medium effort: more false gaps, more Earth-bias, more superseded-pass citations. **None of the three materialized:**

- **False gaps: zero** — but the test was weakened because the model read the post-enactment corpus; the territory run 1 flagged as gaps (fork multiplicity, MGD sensor) now has statutes, which the model found and applied fluently (S13 and S19 verified perfectly). Both frictions it did claim were adversarially confirmed genuine.
- **Earth-bias: not observed.** SCM equilibrium, layer-status persistence, currency-wall logic, phasing-vs-descent distinction all handled natively.
- **Superseded passes: zero.** Every redraft chain cited at latest pass.

**What actually degraded: attribution precision.** ~13 wrong-label defects vs. run 1's far lower count — the medium-effort signature is *right text, right numbers, right ruling, wrong document label*. Plausible mechanism: the run's own preamble says it extracted the dense HTML to plain text before reading, which strips document boundaries; most misattributions confuse a founding-corpus entry with a charter sub-article or an adjacent instrument in the same cluster. A secondary observation: the run **found a genuine seam run 1 missed** (S17 birth-attribution), so lower effort did shift finding *selection*, not just quality.

Cross-model comparison (defect rate, overlap matrix) waits on the ChatGPT medium run.

## Disposition

- No canon changes required by this review. All rulings stand; the corpus held 20/20.
- **New queue candidate (item 10):** XXVII/LP-064 birth-attribution-during-elective-residency clarification (from confirmed S17 friction).
- **Pre-queue check:** read Whitepaper §17.1.5 (Duress Signaling) against the S20 soft edge; fold into existing queue item 5 if covered.
- S2 friction: presentational only; no action unless Jason wants a cross-reference line in III.V.
