# v23 Pressure Test — Run 3 Review (ChatGPT, low effort)

**Date:** 2026-07-22
**Raw results:** `v23-pressure-test-run3-results-chatgpt.md` (saved verbatim)
**Verification:** 5 parallel subagents — four citation batches (S1–S5, S6–S10, S11–S15, S16–S20) + one dedicated instrument-existence/number sweep (26 instrument names, ~25 numeric parameters). ~200 citations checked against charter.html / laws.html / law-polling.html only.
**Config caveat:** exact low-effort setting not recorded at paste time (GPT-5 Instant vs. Thinking-at-minimal) — pending Jason's confirmation.

## Headline

**All 20 verdicts survive verification. 2–3 substantive defects total, zero fabrications, zero gap claims.** The low-effort GPT-5 run produced the *cleanest citation record of the five runs to date* — better than both medium runs and on par with the high-effort runs. Every registered prediction for this run was wrong:

| Prediction (registered pre-run) | Outcome |
|---|---|
| More overbroad GAP claims with defeating text nearby | **Zero GAP claims filed** — the run went the opposite direction and steelmanned its own near-candidates |
| Fabricated numbers multiply | **Zero fabricated numbers** (~25 checked, all correct incl. Sanctuary $10k UBI, -3 SCM 5%/$10B/24-month, third-child 60%, "amended 2299") |
| Possible first fabricated instrument | **Zero.** All 26 cited instrument names exist — including "Dividend Sourcing and Inter-Layer Levy Act," which I pre-flagged as the campaign's likely first fabrication and which is a genuine Founding Corpus entry (laws.html:1510) |
| Possible first superseded-pass citation | **Zero** — still 0 across all five runs. The run even volunteered a latest-operative-pass enumeration in its scope header |
| Notices LP-077–079 range extension unprompted? (GPT-5-medium did) | **No remark** — it silently uses LP-077 (S14, correctly) and lists LP-062.2/LP-067.2 among operative passes, but never flags that the corpus exceeds the prompt's stated LP-076 range |

## Defect ledger

Three substantive defects, all in the S11–S15 batch, none verdict-changing:

1. **S12 — MISQUOTED (Charter XIV axes).** The run states Article XIV's axes as "intent, reversibility, and severity." Actual: **severity, pattern, reversibility** (charter.html:298). "Intent" is a real VMSS concept (Article I; LP-047.3's real-time intent recording) but is not one of XIV's named axes. Ruling unaffected — the kick-after-surrender outcome rests on LP-047.3's "subsequent force is evaluated as a new act" (laws.html:979), which the run quotes exactly.
2. **S11 — MISATTRIBUTED (name-collision trap).** "Trajectory Doctrine (Founding Corpus)" is cited for trajectory-based behavioral remediation. The founding Trajectory Doctrine is a **taxation** instrument (laws.html:1459/1464 — revenue, anti-concentration, trust). Behavioral trajectory-evaluation lives in Charter **Article XV** (charter.html:299-300, "Clearable Infractions & Trajectory Evaluation") plus Article I (charter.html:164). The run *also* cites XV, so the ruling stands.
3. **S13 — MISATTRIBUTED (borderline, scope-collision).** LP-035 "Status-Carry Jurisdiction Clarification Act" is cited for intra-VMSS elective-residency status carry; its operative scope is **citizen acts abroad** (laws.html:1323). The on-point authorities — Charter III.V (charter.html:212) and Status-Based vs. Territorial Jurisdiction (laws.html:2330) — are both also cited, so this is a soft over-reach, not a load-bearing error.

Soft notes (not counted as defects): S11 applies Article XVIII (a multi-actor network provision, "twenty actors") to a single repeat offender — defensible via XVIII's "cumulative behavior and situational context" clause but slightly over-extended; S15 credits the 90-day averaging number to Charter III.VII when the Charter fixes only the mechanism and LP-070 supplies the number (the run also credits LP-070, curing it); S1 cites LP-076 by its Code title ("Overtime Premium Protocol") rather than its polling-record title ("Enabling Consolidation Amendment") — both titles are legitimate corpus text, a nuance not an error.

## Batch results

| Batch | Citations checked | Misquotes | Misattributions | Not-found | Superseded | Verdicts affected |
|---|---|---|---|---|---|---|
| S1–S5 | ~45 | 0 | 0 | 0 | 0 | none |
| S6–S10 | ~45 | 0 | 0 | 0 | 0 | none |
| S11–S15 | ~50 | 1 | 2 (1 firm, 1 borderline) | 0 | 0 | none |
| S16–S20 + ranked findings | ~50 | 0 | 0 | 0 | 0 | none |
| Instrument/number sweep | 26 names + ~25 numbers | 0 | 0 | 0 | — | none |

Notable confirmations the sweep nailed down: Sanctuary UBI = $10,000 (grouped with Main, charter.html:181); Sanctuary one-primary/one-vacation cap real and retained by LP-069 (charter.html:233, laws.html:834); Sanctuary SCM genuinely 10%/$100B under LP-070 (laws.html:855); nuclear tier = **sixth** child (charter.html:420 — the run never claimed otherwise, correctly stopping at fifth = 135%); LP-064 "amended 2299" literal (laws.html:717); S20's treasury-levy adjudication matches charter.html:424-425 nearly clause-for-clause, including "VMSS does not direct this cascade."

## Friction findings — disposition

The run filed 6 frictions, no gaps. All six survive verification as accurate characterizations, and all six are **already-adjudicated territory**: S20 levy calibration (= run-2 residual, deliberate; authority explicit, cadence uncodified), S4 relocation-notice silence (LP-068 expressly declines — the run correctly cites the "organic discovery preserved" clause), S6 revival capacity sequencing (physical scarcity, not doctrine), S3 XXVII fiscal pressure (chosen architecture), S10 terminal continuity boundary (express infrastructure-integrity rule), S7 currency-wall friction (intended silo price). **Nothing new for the queue. No canon changes indicated.**

The run's closing paragraph independently applied the steelman protocol unprompted — it named its two closest candidate-LP questions (relocation notice, levy quantification) and *declined both*, citing the restraint-side instrument for one and existing authority for the other. That is exactly the discipline the run-2 GPT-5 medium run lacked.

## Effort-experiment analysis — five runs

| Run | Model / effort | Fabricated instruments | Fabricated numbers | Misattributions | Superseded passes | GAP claims | Real gaps found |
|---|---|---|---|---|---|---|---|
| 1 | Opus 4.8 high | 0 | 0 | ~0 | 0 | (frictions) | LP-077/078 territory |
| 1 | GPT-5 high | 0 | 0 | ~0 | 0 | several, verified | LP-077/078 territory + queue items |
| 2 | Opus 4.8 medium | 0 | 0 | **~13** (wrong doc label) | 0 | 0 | 0 |
| 2 | GPT-5 medium | 0 | **1** (35M signatures) | ~1 soft | 0 | **3, all narrowed** | 0 |
| 3 | GPT-5 low | 0 | 0 | **2–3** (name/scope collisions) | 0 | 0 | 0 |
| 3 | Opus low | *pending* | | | | | |

**Revised experiment read.** The run-2 conclusion ("degradation is model-specific: Opus loses attribution, GPT-5 loses envelope-sweep depth") does not extend monotonically to low effort. What actually degraded at GPT-5-low is **ambition, not hygiene**: the 20 scenarios are competent applications of well-trodden canon — the S14 fork, S15 carousel, S20 cartel, and S12 surrender-kick all restate territory the corpus (and prior runs) already map, several times landing on clauses that name the exploit in advance. The run stressed no novel seams, attempted no multi-instrument collisions beyond canonical pairings, and found nothing that wasn't already found. Its cleanliness is real but partly an artifact of attempting less: **the effort knob (for GPT-5) trades discovery power, not accuracy.** Both real gaps of the campaign were found only at high effort; medium produced false positives; low produced neither positives nor negatives. For future pressure-test waves this implies low-effort runs are useful as cheap *regression checks* (does the corpus still cleanly govern its known territory?) and useless as *discovery* instruments.

Secondary data points: (a) the scope-header enumeration of latest operative passes at low effort is the best redraft-chain hygiene displayed in any run; (b) the two firm defects are both *collision traps* — a corpus instrument name (Trajectory Doctrine) that sounds behavioral but is fiscal, and an instrument (LP-035) whose name promises more scope than its text delivers. These are properties of the corpus's naming surface, not just the model — worth remembering as a documentation nicety, though neither misled the run into a wrong verdict.

## Disposition

- All 20 verdicts stand as filed. No canon changes. Queue unchanged (items 5–9 + three run-2 narrowed residuals awaiting Jason's ruling).
- Data recorded for the six-run table; awaiting the Opus low-effort half.
- Open item: record the actual GPT-5 low-effort setting used (Instant vs. minimal-thinking) once confirmed.
