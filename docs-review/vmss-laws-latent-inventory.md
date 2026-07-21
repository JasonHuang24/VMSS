# VMSS Laws — Latent-Corpus Inventory (the naming assignment)

**Status: PROPOSED — awaiting Jason's doctrinal veto. Nothing here is authored into canon yet.**
Sweep run 2026-07-20 on branch `feat/vmss-laws-latent-corpus` (from `feat/vmss-laws-v22.7.0`).
Controlling spec: `docs-review/vmss-laws-latent-handoff.md`. Architecture: `docs-review/vmss-laws-architecture.md` §2/§5.

---

## What this file is

The full inventory of rules that carry in-world legal force but have never carried an instrument's
name, clustered into instruments, with a name promoted from canon or minted in canon voice for each.
This is the **architect's veto surface**. Phase A (authoring Code entries on `laws.html`, the
register-intro cure, R23 registration, guard extensions) does not begin until this inventory is
ratified, and it resumes *from this file*.

**The invention is the names and the groupings. Nothing else.** No rule, magnitude, threshold, date,
scope, right, duty, or hedge has been changed, and no legislative history has been invented — founding
instruments have none by definition, so no instrument below carries a filing date, vote tally,
drafter, or ladder record.

## Evidence base

Verbatim quotes, page anchors, line numbers, deontic type, and per-candidate tier findings for every
one of the 1,320 mined candidates live in `docs-review/vmss-laws-latent-mining/`:

| File | Contents |
|---|---|
| `mine-wp-01-08 … mine-wp-27-34.md` | whitepaper §1–34, seven readers |
| `mine-systems.md`, `mine-technologies.md`, `mine-world.md`, `mine-layers-sads.md` | World-tier doctrine surfaces |
| `mine-faq-front.md` | faq / why-vmss / index / join / roadmap (explainer rank — corroboration only) |
| `mine-sims.md` | simulations pages, mined only for instruments they reference by name |
| `mine-path2-record.md` | path-2 family, rate-history, deregistered, pending — already-instrumented collision reference |
| `charter-home-index.md` | **the home-rule veto index** — every rule whose home is Charter article text, plus every Charter-reserved name-like phrase |
| `existing-names-index.md` | collision index — 89 register titles, 57 Code law-titles, 100-row site-wide instrument-phrase table |
| `cluster-subject.md`, `cluster-architecture.md` | two of the three clustering proposals (see Method, below) |

Every provision line in Part 1 cites the candidate ids it derives from; those ids resolve to the
verbatim quote in the surface mining note.

## Method, stated honestly

Sixteen parallel readers over every corpus surface produced 1,320 candidates, each carrying a verbatim
quote, an anchor, a deontic type, an already-named-by-canon finding, a home, and a tier-test result.
Three independent clustering passes then ran over the pooled candidates under different lenses
(subject-domain, legal-operation, architectural-function), and a synthesis pass merged them.

Three defects in that run. None invalidates the instrument set, but each bounds how much confidence
the document's own claims carry, and the first means **this file's PART 0 misdescribes its own
provenance** — that paragraph is left standing as written, and corrected here.

1. **The legal-operation lens failed and contributed nothing.** It exceeded the 64,000-token output
   maximum and returned no result. The instrument set below is the synthesis of **two** lenses:
   subject-domain and architectural-function.
2. **PART 0's provenance sentence is wrong, and so is every "legal-operation lens" attribution in the
   name-conflict table.** The workflow script compacted its results array after the failure, which
   shifted the surviving proposals by one slot: the architectural-function lens's output was handed to
   the synthesis under the label *legal-operation*, and the empty third slot produced PART 0's claim
   that "the architectural-function lens returned empty". The reverse is true — architectural-function
   is the lens that ran and was consumed. **The decisions in the conflict table stand; the lens
   credited for them does not.** `cluster-architecture.md` in the annex is that lens's own notes.
3. **The synthesis pass failed on return, after writing this document.** The connection closed
   mid-response, so its structured output never arrived and the workflow never independently checked
   its accounting. PART 4's verification record is therefore the synthesis agent's **own unaudited
   claim about itself**, not a cross-checked result. Treat it as testimony, not proof.

## Counts

- **61 instruments** — 51 founding-act, 10 schedule-under-authority. 27 promoted, 34 minted.
- **506** candidate ids clustered into instruments · **83** escalated to flags · **731** excluded.
- **Pool total 1,321**, not the 1,320 PART 0 and PART 4 state. The mining stage returned 1,321
  candidates (charter-home-excluded 386 · schedule-under-authority 369 · founding-act 347 · not-law
  133 · ambiguous 53 · regulatory-flag 17 · gap-flag 16). **One id is therefore unaccounted for**, and
  the "0 unaccounted" claim in PART 4 is off by one. The discrepancy is small enough not to disturb any
  instrument, but it means the accounting has not in fact closed and should be re-run before Phase A
  treats the excluded set as exhaustive.

> **Fix Pack B1 correction (2026-07-21) — the accounting now closes against the committed ledger.**
> The two paragraphs above are left standing as the provenance record of the never-closed count (the
> 9a45fc5 idiom). They are superseded by `docs-review/vmss-laws-latent-mining/accounting-recheck.json`,
> the architect's mechanical re-derivation from the committed annex notes (run
> `node docs-review/vmss-laws-latent-mining/accounting-recheck.mjs`). Derived, ground-truth numbers:
> - **Pool total 1,352** (not 1,320/1,321 — those figures came from the lost workflow journal, which
>   exists nowhere in-tree; the annex itself defines 1,352 distinct candidate ids).
> - **516** ids clustered into the 61 instruments (`assigned`) · **89** escalated to flags
>   (`flag-cited`) · **747** excluded = 109 named exclusions + 135 Path 2 categorical + 503 residual.
> - **0 phantom references · 0 suspicious residuals** after Fix Pack B2/B3 (every operative/escalation
>   -class residual is now dispositioned to a covering instrument, a named exclusion, or a PART 3 flag;
>   the two phantom citations are cured/struck). The 503 residuals each carry a recorded ground (a/b/c)
>   in the ledger and in the residual exclusion block below (Fix Pack B5).
> The "26 suspiciousResiduals" figure in the dispositions memo was the architect's write-time estimate;
> the committed ledger enumerated **30**, and all 30 are dispositioned here.
> - **Fix Pack B7 — flag counts restated from the ledger.** The prior "83 flag-owned" figure (a
>   flag-only count plus contradiction cross-cites of assigned ids) is superseded by the ledger's **89
>   `flag-cited`** ids — the ids whose only disposition is a PART 3 flag. Contradiction and
>   tier-ambiguity bullets additionally *cross-cite* ids that are assigned to instruments; by
>   disposition precedence (`assigned` outranks `flag-cited`) the ledger counts those under `assigned`,
>   not as flags, so no id is double-counted. The `flag-cited` total rose 79 → 89 under Fix Pack B2 as
>   the ten duplicate-source regulatory/contradiction ids (systems-66b, wp-09-12-18, wp-20-22-16, and
>   the seven wp-27-34 Precognition/SAD ids) were escalated to PART 3.

61 slightly exceeds the spec's "roughly 25–60" envelope. The overshoot is concentrated in §23–26
(external relations), where canon already supplies a dense set of distinct proper names — the
Federation Treaty, the External Force Doctrine, the Sanctions Tier Ladder, the Technology Transfer
Tiers, the Hostile State Doctrine, Continuity Sovereignty, the Recall Protocol, the Territorial
Doctrine — that rule 2 (promote before minting) forbids merging. Compressing them would mean
*renaming* things canon has already named, which the spec forbids absolutely. The minted count (34) is
inside the envelope.

## Architect's notes on the run

Three findings that need Jason's eye specifically, beyond the flags in Part 3:

**(a) The spec's own illustrative example fails the home rule.** `vmss-laws-latent-handoff.md` §5
offers "one Currency Siloing Act carrying siloing + conversion prohibition + downward channels" as the
clustering-granularity example. But `charter.html:199–202` **is** Article III.IV *Currency Siloing*,
and it states the siloing, "Upward conversion is prohibited without exception", the 90–99%
downward-channel forfeiture, the retention schedule, currency retirement-and-issuance at conversion,
and the central bank's settlement-rate derivation — all verbatim. That entire family is Charter-home
and receives no act name. The sweep followed the home rule over the example. What survives as
nameable is instrument **#3 The Central Banking Authority** — the institution that maintains the silo
and the external wall around it, which the Charter presupposes but never constitutes. If the example
was meant as a binding instruction rather than an illustration of granularity, this is the one place
the sweep deliberately departs from the spec's letter to keep its rule.

**(b) `whitepaper.html` has no per-section anchors.** Its only ids are `glossary`,
`trajectory-doctrine`, `pagination`, `main-content`, and the two placeholders; sections live inside
`<article class="page" data-page="N">`. Since most founding instruments below are whitepaper-homed,
Phase A's guard (i) — "`data-source` resolves to a real anchor in the named file" — cannot be
satisfied literally. Proposed implementation, for ratification with the rest: `data-source` is either
a bare existing page **or** a resolving `file#anchor`, backed by a complementary guard asserting that
each founding entry's cited *Whitepaper §N* exists as an `<h2>N.` heading in `whitepaper.html`. That
keeps real bite without inventing anchors. (Adding ids to the whitepaper's `<h2>`s was rejected: the
page paginates, so a deep link would target a hidden section.)

**(c) Two parsers must change before any founding entry can ship.** `tools/check-canon.mjs:590` and
`tools/build-law-toc.mjs:126` both match `code-entry` with `data-tier="…" data-source="…"`
**adjacent**. The spec's founding markup places `data-instrument` between them. Left alone, every
founding entry would be invisible to the whole code-integrity guard block — a vacuous green — and
would trip the generator's extraction-mismatch hard-fail. Both regexes need an optional
`data-instrument` capture, and founding entries need *explicit* partitioning out of guards (a1)/(a3)/(b)
and the (a4) register-1:1 count, not silent non-matching. This is recorded here because it is the
single highest-risk item in Phase A.

---

# SYNTHESIS — THE AUTHORITATIVE LATENT-CORPUS INSTRUMENT SET

Repo `F:/Programming/VMSS/VMSS Website` · branch `feat/vmss-laws-v22.7.0` · sweep date 2026-07-20.

Synthesised from two independent clustering passes (subject-domain lens, legal-operation lens; the
architectural-function lens returned empty and contributed nothing). Every name below has been
collision-checked against `existing-names-index.md` (89 law-polling titles, 57 laws.html code-entry
titles, the 100-row site-wide instrument-phrase table) and every cluster has been checked against
`charter-home-index.md` PART 1 (rule index), PART 3 (reserved name-like phrases) and PART 4 (the four
explicit Charter non-homes).

**Counts.** 61 instruments · 506 candidate ids clustered · 83 ids escalated to flags · 731 ids excluded
(121 named exclusions + 640 residual charter-home / not-law / restatement ids) · pool total 1,320 ·
every id accounted for exactly once (verified mechanically, `assign.mjs` → 0 duplicates, 0 orphans).

> **Fix Pack B1 correction.** `assign.mjs` was never committed and the pool it reported (1,320) does
> not reconcile against the committed annex. Superseded by `accounting-recheck.json`: **pool 1,352 ·
> 516 clustered · 89 flag-cited · 747 excluded (109 named + 135 Path 2 categorical + 503 residual) · 0
> phantom · 0 suspicious.** See the Counts correction block above and PART 4 §5.

**Class split.** 51 founding-act · 10 schedule-under-authority.
**Origin split.** 27 promoted (canon already names the instrument or its head noun) · 34 minted.

---

## PART 0 — SYNTHESIS RULES APPLIED

1. **Home rule first.** Every cluster was tested against charter-home-index PART 1 before a name was
   considered. Where the Charter states the rule, the candidate is excluded — this is why the
   Central Banking Authority carries no siloing provision (Charter III.IV), the Layer Provisioning
   Schedule carries no UBI or subsidy magnitude (III.I / III.II), the Continuity Reliability Schedule
   carries no terminal-severance clause (Article IV), and the Civic Floor Act carries none of the
   floor's enumerated elements (Preamble, III, VIII, XXV.I–III).
2. **Promote before minting.** Where canon uses the phrase as the thing's own name it is used
   verbatim (The Threshold Inhibition Protocol, The Enforcement Chain, Authorized Bailout, The
   Trajectory Doctrine, The Central Banking Authority, The External Force Doctrine, The Federation
   Treaty, The Sanctions Tier Ladder, The Technology Transfer Tiers, The Transit-Right Doctrine, The
   Recall Protocol, The Territorial Doctrine, The Hostile State Doctrine, Continuity Sovereignty, The
   Wartime Conduct Provisions, The Border Layer-Equivalence Mapping, The Secondary Observation
   Envelope, The Cognition-Corroboration Specification, The Security Classification System, The
   Unified Transparency Doctrine, The Redundant Envelope Pattern, The Clean-Record Doctrine,
   Two-Level Moral Causality, Status-Based vs. Territorial Jurisdiction). Where canon names the
   *subject* lowercase inside a sentence, the canon head is preserved and a single instrument-class
   suffix added (The Civic Floor Act, The Individual Attribution Act, The Institutional Archive Act,
   The Metric Gated Domain Act, The Substrate Personhood Doctrine) — these are marked promoted.
3. **Conflict resolution between the lenses.** Where the two passes named the same instrument
   differently, the name that reads most like canon's own rhythm was taken and the loser recorded
   below. Where one pass merged what the other split, the split was kept only where canon supplies a
   separate name (Wartime Conduct Provisions out of Defensive Posture; Continuity Sovereignty out of
   the Federation Treaty) or where the class differs (Continuity Reliability *Schedule* vs Continuity
   Integrity *Act*; Leakage Accounting *Standard* under Article XXIII vs the Unified Transparency
   *Doctrine*). Otherwise the merge was taken (rule 5).
4. **No number, date, or acronym appears in any minted name.** The legal-operation lens's "STI
   Measurement Schedule" was rejected on the acronym rule and replaced with the subject lens's **The
   Social Trust Measurement Standard**.
5. **Nothing invented.** No provision line states a rule, magnitude, threshold, scope, right or duty
   that is not in a mined verbatim quote. Every hedge is carried through: "~", "approximately",
   "typically", "roughly 1m crest", "in extreme escalation", "Most offers are refused", "HUMINT is
   minimal", "not engineered — it emerges", "prices … rather than pretending to close", "principles,
   not parameters", "not current doctrine", "For now", "tolerated however it develops", "may
   concentrate", "in the layers where enforcement is present". No founding instrument carries a
   filing date, vote tally, drafter, or ladder record.

### Name conflicts resolved

| Subject lens | Legal-operation lens | Adopted | Why |
|---|---|---|---|
| The Layer Bracket and Settlement Collection Act | The Settlement-Layer Collection Act | **The Settlement-Layer Collection Act** | Tighter; names the operation rather than two subjects. Clear of LP-072 "The Layered Schedule". |
| The Central Banking Authority | The Monetary Sovereignty Act | **The Central Banking Authority** | Canon supplies the heading verbatim (whitepaper §12.3). Rule 2 outranks a minted alternative. |
| The Layer Economic Scope Act | The Layer Provisioning Schedule | **The Layer Provisioning Schedule** | Class-honest: this is specification beneath Charter Article III, not a founding act. |
| The Implant Consent and Instrumentation Act | The Implant Instrumentation Act (+ separate Failsafe Configuration Act) | **The Implant Instrumentation Act**, failsafe folded in | One bargain — carry the device or don't, configure its coercive half or don't, accountability unchanged either way. Rule 5. |
| The Ledger Integrity Standard | The Ledger Integrity Act | **The Ledger Integrity Act** | "Act" matches canon's dominant head noun for enacted prohibitions (21 uses). |
| The Social Trust Measurement Standard | The STI Measurement Schedule | **The Social Trust Measurement Standard** | No-acronym rule. |
| The Calibration and Structural Alteration Doctrine | The Calibration Boundary Doctrine | **The Calibration Boundary Doctrine** | Shorter, and "boundary" is the rule's own word. |
| The Governance Conduct and Procedure Act | The Governance Restraint Act | **The Governance Restraint Act** | Names what the instrument does — bind the governors. |
| The Civic Floor | The Civic Floor Act | **The Civic Floor Act** | Class suffix distinguishes the instrument from the canon concept it promotes. |
| The Defensive Posture and Wartime Conduct Act | Defensive Posture Doctrine + Wartime Conduct Provisions | **split, as legal-operation** | Canon self-names "the Wartime Conduct provisions" at world.html:615. |
| The Diplomatic Establishment Act | The Diplomatic Infrastructure Act | **The Diplomatic Establishment Act** | "Infrastructure" would read against the Boundary and Transit Infrastructure Standard. |
| The Citizenship Admission Act (one instrument) | Immigration and Accession Act + Citizenship Status Act | **The Citizenship Admission Act + The Citizenship Status Act** | Admission and status/revocation are different legal operations; a single act would have had to be named for only half its contents. |
| Status-Based vs. Territorial Jurisdiction | The Two-Mode Jurisdiction Doctrine | **Status-Based vs. Territorial Jurisdiction** | Canon glossary head, verbatim. Rule 2. |
| The Consent Ceiling Act | The Consent Boundary Act | **The Consent Ceiling Act** | "Ceiling" is the operative image — what consent cannot buy. |
| Metric Gated Domains | The Metric Gated Domain Act | **The Metric Gated Domain Act** | Canon head preserved, class suffix added. |
| The Domain Boundary Act + Domain Chartering Standard | Domain Authority Act + Domain Non-Governance Act | **The Domain Chartering Standard + The Domain Boundary Act** | Chartering (how domains are made, schedule class) vs boundary (what they may never become, founding class). |
| The Live Session Consent Standard | The Neural Interface Consent Act | **The Live Session Consent Standard** | Deliberate avoidance of LP-008 "Neural Diving Consent Expansion". |
| The Augmentation Consent Standard | The Bodily Modification Consent Act | **The Augmentation Consent Standard** | Canon's own vocabulary is "augmentation". |
| separate System Sabotage Act | folded into Settlement-Layer Collection | **folded** | Rule 5; the sabotage classification is the enforcement half of the same collection architecture. |
| separate Analog Redundancy Principle | folded into Redundant Envelope Pattern | **folded** | Canon states analog redundancy as an instance of the pattern, not a rival principle. |
| separate Relocation Capacity Standard | folded into Clean-Record Doctrine | **folded** | Capacity elasticity exists to stop the relocation right being rationed; same protection. |
| separate Harmed-Party Restoration + Medical Response | folded into Enforcement Chain | **kept separate** | Medical drones serve preventive and chronic care in Sanctuary, not only enforcement; victim restoration carries a metric rule and a liquidation-priority rule the chain does not. |
| Two-Level Moral Causality + Consequence Classification separate | merged | **merged under Two-Level Moral Causality** | Rule 2 promotes the canon name; the mechanism test answers the same question and is carried as provisions. |

---

## PART 1 — THE INSTRUMENT SET

Provision lines are traceable one-to-one to candidate ids, shown in parentheses. The mining notes hold
the verbatim quote and page#anchor for each id; the primary anchor named per instrument is the
governing surface.

---

### 1. The Trajectory Doctrine
- **origin** promoted · **class** founding-act · **slug** `trajectory-doctrine`
- **primary anchor** whitepaper.html §12.1 (h4 id="trajectory-doctrine", lines 878–882)
- **parent authority** — (founding act)
- **candidate ids** wp-09-12-48, wp-09-12-49, wp-09-12-86, path2-record-121, path2-record-129

Provisions
1. Taxation was founded to carry three functions — revenue, anti-concentration, and trust — and each retires as its structural replacement matures. (wp-09-12-48, path2-record-129)
2. Top marginal rates track demonstrated institutional need. (wp-09-12-48, path2-record-121)
3. Any rate reduction requires audited evidence per the Path 2 standing audit — never authored facts — at the standard zero-fail threshold. (wp-09-12-48, path2-record-121)
4. The evidentiary gate is the load-bearing half: a reduction that is argued rather than evidenced fails, however sound its direction. (wp-09-12-49)
5. Neither revenue stream may cross-credit the other in a rate certification; any future recalibration requires its own lawful, audited evidence rather than an automatic ratio or an inference from private velocity. (wp-09-12-86)

Rationale — canon names this instrument verbatim and it governs every future rate filing. Charter
III.III expressly "reaches no rate" (PART 4 non-home), so the doctrine sits lawfully below it. The
rate-history restatements state the same rule and are folded rather than re-minted. Note the identical
language also appears in deregistered drafting texts, which are not in force and are not sourced.

---

### 2. The Settlement-Layer Collection Act
- **origin** minted · **class** founding-act · **slug** `settlement-layer-collection`
- **primary anchor** whitepaper.html §12.1 (line 876); §12.6 (line 931)
- **candidate ids** wp-09-12-44, wp-09-12-45, wp-09-12-46, wp-09-12-47, wp-09-12-81, systems-33

Provisions
1. Below the top marginal threshold, bracket structure is layer-administered. (wp-09-12-44)
2. In -3 the structure is degenerate by design: earned income below the threshold is untaxed, and the layer's minimal tax base is the top marginal on its high earners plus the corporate remittances of its enterprise economy. (wp-09-12-45)
3. Collection in the lower layers operates at the settlement layer, not through surveillance: the central bank clears every currency issuance, conversion and cross-district corporate settlement, and liability is remitted at those clearing points by corporations, market associations and high-earner accounts. (wp-09-12-46)
4. The implant plays no fiscal-monitoring role. (wp-09-12-46)
5. Cash-analog activity that never clears is real and untaxed — a leakage the architecture prices as part of the lower layers' minimal-base design rather than pretending to close. (wp-09-12-47)
6. Money laundering and tax evasion are treated as system sabotage with maximum enforcement priority, in the layers where enforcement is present to address it. (wp-09-12-81, systems-33)

Rationale — Charter III.III fixes benefit-scaled progressivity and disclaims all rates; LP-074 fixes
only the top marginal cascade. Everything between — who administers sub-threshold brackets, where
liability is actually collected, and what the architecture declines to reach — is un-homed and
unnamed. The sabotage classification composes here because it is the enforcement half of the same
collection architecture and is load-bearing for LP-070's wash-clearing rule. Collision-checked against
LP-072 "The Layered Schedule".

---

### 3. The Central Banking Authority
- **origin** promoted · **class** founding-act · **slug** `central-banking-authority`
- **primary anchor** whitepaper.html §12.3 Central Banking Authority (lines 900–901)
- **candidate ids** wp-09-12-59, wp-09-12-60, wp-09-12-55, systems-19, systems-21, world-72, world-74, wp-23-26-70

Provisions
1. VMSS maintains a central bank as sole issuing authority for all layer currencies; no private institution or market mechanism handles cross-layer monetary exchange. (wp-09-12-59, systems-21)
2. The bank manages currency creation, controls monetary supply across the four siloed economies, and executes settlement when citizens cross layer boundaries, retiring origin currency and issuing destination-layer currency at the applicable schedule. (wp-09-12-59, systems-21)
3. The bank operates as infrastructure, not policy: it does not set interest rates or engage in monetary stimulus, and it maintains the integrity of the silo architecture. (wp-09-12-60)
4. VMSS currency is inconvertible externally and does not circulate outside the civilization's borders. (wp-09-12-55, systems-19, world-72, wp-23-26-70)
5. International trade is goods-based, on published terms differentiated by treaty relationship. (world-74, wp-23-26-70)

Rationale — currency siloing itself, the upward-conversion prohibition and the downward channels are
Charter III.IV verbatim and are excluded. What remains nameable is the institution that maintains the
silo and the external wall around it. The Charter presupposes the bank incidentally (III.IV
rate-deriver, III.VII clearing sensor) but never constitutes it or grants its monopoly. "Currency
Siloing" is a reserved Charter article heading and was avoided as a head.

---

### 4. The Dividend Sourcing and Inter-Layer Levy Act
- **origin** minted · **class** schedule-under-authority · **slug** `dividend-sourcing-interlayer-levy`
- **parent authority** Charter Article III.I — Universal Basic Income / Automation Dividend Treasury
- **primary anchor** whitepaper.html §11 intro (line 818); simulations.html #sim-civ-2 (line 775)
- **candidate ids** wp-09-12-34, sims-13

Provisions
1. The Automation Dividend Treasury is funded by AI-driven automated labor across fabrication, mining, agriculture, construction, maintenance and logistics. (wp-09-12-34)
2. Cross-layer dividend-obligation costs are levied against the originating layer's treasury; the federal treasury does not reach into a withdrawn layer to tax households directly. (sims-13)

Rationale — Charter III.I names the Treasury as UBI's funder but enumerates no funding base. The
six-sector enumeration and the inter-layer levy mechanism are both specification under it, and the
levy carries an express enforcement boundary that makes institutional withdrawal survivable. Named
without "Automation Dividend Treasury" as the head because that phrase is Charter-reserved.

---

### 5. The Layer Provisioning Schedule
- **origin** minted · **class** schedule-under-authority · **slug** `layer-provisioning-schedule`
- **parent authority** Charter Article III — Economic Framework
- **primary anchor** systems.html #primary-job-subsidy (lines 255–259); layer--1.html lines 50–79
- **candidate ids** systems-13, systems-25b, layers-sads-41, layers-sads-43

Provisions
1. Work is classified in three bands — qualifying (subsidy applies), non-qualifying but legal (no subsidy, no restriction, no moral judgment), and grey-area work (legal, market-rewarded, no subsidy, fully permitted) — with qualifying thresholds scaling by layer institutional intensity. (systems-13)
2. Each layer's districts are assessed separately for savings-circulation activation; there is no cross-layer aggregation. (systems-25b)
3. Speculative markets are permitted beginning at -1, the first layer descending from Main where they are legal, alongside a thinner commercial regulatory overlay and full charter-floor enforcement on physical safety. (layers-sads-41)
4. Neural access in -1 is deliberately preserved at reduced capability: bandwidth-limited, active-control mode unavailable, observation mode retained. (layers-sads-43)

Rationale — the dividend amounts, subsidy rates, overtime schedule and circulation-mandate
parameters are all Charter-home (III.I, III.II, III.VII) and excluded. What survives is the grey-area
band, the non-aggregation scoping rule, the -1 market permission, and the service-capability gradient,
none of which the Charter states. Charter III.VIII addresses -3 only. Kept clear of LP-072.

---

### 6. The Boundary and Transit Infrastructure Standard
- **origin** minted · **class** schedule-under-authority · **slug** `boundary-transit-infrastructure`
- **parent authority** Charter Article I (layer separation); Article XXV.I (mega-wall reference)
- **primary anchor** whitepaper.html §18.3 (lines 1100–1102); technologies.html Card 9 (lines 471–486); world.html §1 (lines 422–431)
- **candidate ids** wp-01-08-30, wp-17-19-37, wp-17-19-38, wp-17-19-39, technologies-32, technologies-33, technologies-34, world-01, world-02, world-03, layers-sads-01, wp-27-34-96, wp-17-19-35, wp-17-19-36
- **Fix Pack B2:** wp-17-19-35 (§18.3 mega-wall physical spec) and wp-17-19-36 (§18.3 wall active-defense envelope) appended — §18.3 duplicate sources of content already carried by provisions 1 and 3–4; the standing citations (-37/-38) point one §-source over from the annex's own numbering (skew recorded in the worklog).

Provisions
1. Every ring boundary and the outer perimeter carries a continuous mega-wall: 15km above ground, 5km below ground, a 1km base cross-section tapering parabolically above the midpoint to a roughly 1m crest at peak altitude, in advanced composite materials. (wp-01-08-30, wp-17-19-37, technologies-32, world-01, layers-sads-01, wp-27-34-96)
2. The above-ground height clears commercial aviation altitude and the sub-surface depth eliminates tunnelling at scale. (wp-17-19-37)
3. Active defense is layered: seismic sensors, ground-penetrating radar, persistent drone swarms and automated turrets cover the wall envelope. (wp-17-19-38, technologies-33)
4. The base cross-section houses gate complexes, drone garrisons, implant verification nodes, forcefield generator housings and operational staff quarters within the wall rather than on separate footprint. (wp-17-19-38)
5. Cross-layer transit runs through two channels: ground-level gates for routine traffic under implant-verified authorization, and elevated gates at approximately 1km altitude on drone-lift infrastructure for high-volume or contested transit, preserving ground-level seal integrity during contested events. (wp-17-19-39, technologies-34, wp-27-34-96)
6. Foreign-side populations interact with VMSS exclusively through official border crossings, embassies and diplomatic channels; every interaction is channeled through controlled infrastructure running implant verification, ledger audit and behavioral evaluation. There is no back door and no informal crossing. (world-03)
7. Any overflight of the wall is an unambiguous act of war. (world-02)

Rationale — Charter XXV.I references the mega-walls once and reaches no dimension. The physical
specification, the sensor envelope, the two transit channels and the single-interface rule are one
engineering-and-access standard; splitting the wall from its gates would leave both incomplete.
"mega-walls" is reserved Charter vocabulary and was avoided as a head.

---

### 7. The Threshold Inhibition Protocol
- **origin** promoted · **class** founding-act · **slug** `threshold-inhibition-protocol`
- **primary anchor** whitepaper.html §15.1, §15.4 (lines 985, 995); §19.1 (lines 1133–1134)
- **candidate ids** wp-01-08-08, wp-13-16-17, wp-13-16-26, wp-13-16-27, wp-17-19-53, wp-17-19-54, systems-50, world-145, sims-01, sims-02, faq-front-39, wp-17-19-51, wp-17-19-52
- **Fix Pack B2:** wp-17-19-51 (§19.1 Threshold Inhibition Protocol, the named mechanism) and wp-17-19-52 (§19.1 pre-intervention boundary — acts, not thoughts) appended — §19.1 duplicate sources of the mechanism this instrument IS (provisions 1–3) and of the acts-not-thoughts limit (provisions 1, 5).

Provisions
1. The Protocol triggers on intent plus imminent execution and never on thoughts, desires, or planning. (wp-13-16-17, wp-17-19-54)
2. On detection it fires an ordered countermeasure sequence: failsafe motor inhibition, then nano-release sedation, then ambient drone countermeasures if the first two measures fail. The act halts before it completes. (wp-01-08-08, wp-13-16-26, systems-50)
3. The Protocol is mandatory and continuous in +1 Sanctuary and all Selective Ascension Domains, where no murder, assault, or sexual violence can reach completion. (wp-13-16-27, wp-17-19-53, world-145, sims-01)
4. It is user-configurable in all other implant-bearing layers, and a citizen who opts in receives the same protection voluntarily. (wp-13-16-27)
5. Pre-intervention does not prevent thoughts, desires or planning; it prevents only the physical completion of acts that would harm other residents who have equally earned the right to live without threat. (wp-17-19-54)
6. Where the ledger reads a trajectory whose terminal endpoint is harm, the first intervention is informational; restrictions escalate only as the trajectory does, are prophylactic and scoped to the identified trajectory, lift if the pattern stabilises, and reassignment follows only an actual harm event. (faq-front-39, sims-02)

Rationale — canon names the Protocol; Charter Articles I and VI state the pre-intervention posture but
never name it or state its trigger, its ordered sequence, its configurability schedule, or its limit.
The graduated pre-harm ladder is folded in because it is the same architecture operating below the
inhibition threshold, corroborated off the narrative surface by faq-front-39. LP-062.2's Main-Layer
sexual-assault default is already enacted and is excluded.

---

### 8. The Implant Instrumentation Act
- **origin** minted · **class** founding-act · **slug** `implant-instrumentation`
- **primary anchor** whitepaper.html §15.2–15.3 (lines 988–992), §22.3 (line 1321); technologies.html Card 1 (lines 56–75)
- **candidate ids** wp-01-08-07, wp-01-08-13, wp-13-16-20, wp-13-16-21, wp-13-16-23, wp-13-16-24, wp-13-16-25, wp-17-19-55, wp-20-22-36, technologies-01, technologies-02, technologies-05, technologies-06, technologies-07, technologies-08, systems-43, systems-52, layers-sads-22, faq-front-40, faq-front-52, faq-front-53, wp-27-34-73

Provisions
1. Implant installation is voluntary at civilization entry for Main Layer and below; refusal is permitted and carries no criminal consequence. (wp-13-16-23, wp-20-22-36, technologies-01, technologies-07)
2. The implant is mandatory for all residents of +1 Sanctuary because the Threshold Inhibition Protocol requires it to function. (wp-01-08-13, technologies-02)
3. Refusal carries an enumerated consequence set: loss of access to trust-gated opportunities, visibility on the public ledger as an unimplanted citizen, and reduced access to implant-mediated institutional infrastructure — no backup vessel, no neural diving, no domain membership. (wp-13-16-24, systems-43, faq-front-52)
4. The implant may be removed at any time. Removal erases neither identity nor behavioral record, because external observation infrastructure makes identity non-repudiable regardless of hardware status; removal removes the failsafe, not accountability. (wp-13-16-25)
5. Removal is opting into reduced capability inside a civilization designed around instrumentation, not opting out of the civilization itself. (faq-front-53)
6. Failsafe motor inhibition is user-configurable and may be disabled entirely at any time; in Main Layer and below the failsafe issues escalating alerts as intent thresholds are approached and the citizen may heed, pause, or disable. (wp-13-16-20, technologies-06, wp-17-19-55, systems-52, wp-27-34-73)
7. Disabling is logged as a behavioral signal; it is a legal act carrying no institutional penalty of its own, and any act that follows carries full post-intervention consequence with accountability undiminished. (wp-01-08-07, layers-sads-22, faq-front-40, wp-27-34-73)
8. All implant data is encrypted, user-owned and never shared without consent; the privacy architecture is a hardware-level design constraint rather than a policy promise. (wp-13-16-21, technologies-05)
9. The implant serves as the citizen's identity, citizenship proof and behavioral record in international travel. (technologies-08)

Rationale — the most load-bearing consent instrument in the architecture: whether the citizen must
carry the device, what refusal costs, what removal does and does not undo, who owns what it records,
and how much of the device's coercive half the bearer controls. Charter Article IV names implants as
technology and carries no consent provision at all. Failsafe configuration is folded in rather than
split out because it is the same bargain read one layer down. Collision-checked against LP-028
(Implant Tamper-Abroad Recovery Protocol), LP-055 (Implant Removal Conscientious Objection Procedure,
failed) and Charter XXV.III. Three internal tensions are flagged rather than resolved.

---

### 9. The Cognition-Corroboration Specification
- **origin** promoted · **class** founding-act · **slug** `cognition-corroboration`
- **primary anchor** whitepaper.html §22.1 (lines 1313–1315)
- **candidate ids** wp-20-22-32, wp-20-22-33, wp-20-22-34, wp-13-16-22, wp-17-19-48, technologies-43, technologies-44

Provisions
1. Non-public means non-broadcast, not non-captured: the implant parses neural state at high resolution and logs cognition data confidentially within the implant ledger network. (wp-20-22-32, wp-13-16-22)
2. The cognition record carries no independent institutional consequence — thinking about a crime triggers nothing, no score moves from internal deliberation, and no layer evaluation responds to cognition alone. (wp-20-22-32)
3. The record may corroborate evidence for acts that have already breached reassignment thresholds — premeditation, intent state, network coordination — and nothing further. (wp-13-16-22)
4. The record never enters the public ledger, never reaches other citizens, employers or external systems, and is top-secret-classified internal infrastructure. (wp-20-22-32)
5. Four propositions hold simultaneously — captured, non-public, corroborative, never independently consequence-triggering — and the privacy guarantee attaches at the non-public and no-independent-consequence surfaces rather than at a not-captured surface. (wp-20-22-33)
6. The same guarantee extends to external observation infrastructure at near-implant fidelity, serving the identical corroboration-not-trigger function. (wp-20-22-34, wp-17-19-48, technologies-43, technologies-44)

Rationale — canon names this specification and self-declares §22.1 as its home. Charter Article II's
cognition-non-public rule is the boundary it operates within, not its source; the capture
authorization, the four-part use restriction and the classification level are all surface-home.
LP-056's cognition-inference bar is already enacted and is excluded.

---

### 10. The Secondary Observation Envelope
- **origin** promoted · **class** founding-act · **slug** `secondary-observation-envelope`
- **primary anchor** whitepaper.html §18.8 (lines 1117–1122); technologies.html Card 5b (lines 297–327)
- **candidate ids** wp-17-19-45, wp-17-19-46, wp-17-19-47, wp-17-19-49, wp-17-19-50, technologies-37, technologies-38, technologies-39, technologies-40, technologies-41, technologies-42, technologies-45, wp-27-34-43, world-146, faq-front-49, sims-27

Provisions
1. Augmented-reality surveillance infrastructure is the secondary observation envelope backstopping the implant ledger when the implant is absent, removed or technically compromised; it is structurally peer to the implant and operationally peer to the drone network, not a fine-print backdrop. (wp-17-19-45, technologies-37)
2. Density scales with layer: +1 and Main at maximum, -1 reduced, -2 the federal-infrastructure minimum required for cross-layer forensic continuity, -3 the absolute floor. (wp-17-19-46, technologies-41)
3. Federal cross-layer mandates still require AR-equivalent identity verification at layer boundaries even where daily-governance coverage is withdrawn. (wp-17-19-46, technologies-42)
4. Identity resolution operates at biometric and DNA-capable resolution, making identity non-repudiable regardless of hardware status. (technologies-38, faq-front-49, sims-27)
5. Acts are captured in real time at evidentiary fidelity with intent-signature inference from external indicators, wall-penetrating imaging where civic infrastructure supports it, and network attribution data feeding the Article XVIII coordination-detection architecture. (wp-17-19-47, technologies-39)
6. Determinations integrate with the implant ledger and drone network and are contestable through the standard civic-court channel. (technologies-40)
7. Camera operations are classified at Confidential; raw imaging streams, behavioral inference algorithms, system architecture, redundancy protocols and integration are classified Top Secret with examination-and-suggestion authority only. (wp-17-19-49)
8. Divergence between implant data and external record is itself a signal triggering ledger-integrity review; implant removal is a routing decision, not a forensics gap. (wp-17-19-50, technologies-45, wp-27-34-43)
9. Where an encounter involves a non-implanted citizen the evidentiary standard shifts to external observation, environmental sensors and biometric monitoring — below the implant standard of irrefutability; a citizen who opts out accepts a reduced evidentiary environment as a consequence of that choice. (world-146)

Rationale — canon names the envelope. Charter Articles XV and XXI mention the AR environment in
passing but never establish it as an instrument, yet the whole architecture's non-repudiability
guarantee rests on it. Density schedule, capability set, classification schedule and integrity-check
trigger are one instrument because each is meaningless without the others.

---

### 11. The Social Trust Measurement Standard
- **origin** minted · **class** schedule-under-authority · **slug** `social-trust-measurement`
- **parent authority** Charter Article II — Social Trust Index
- **primary anchor** whitepaper.html §5.1–5.3, §5.6, §5.10, §5.12 (lines 471–547)
- **candidate ids** wp-01-08-14, wp-01-08-16, wp-01-08-38, wp-01-08-40, wp-01-08-41, wp-01-08-47, wp-01-08-55, wp-01-08-58, layers-sads-29, technologies-58, wp-27-34-118

Provisions
1. The governance layer observes the constitutional dimensions through seven weighted operational measurement domains, at approximate weights including civic compliance at about 15 and crisis response at about 10. (wp-01-08-38)
2. Scores range 0 to 100 and gate access to trust-threshold and ascension domains and to high-trust contracts, partnerships and professional positions; scores below 40 trigger automatic social visibility flags. (wp-01-08-40)
3. Sanctuary entry requires a sustained record above the constitutional floor, typically earned through 8–12 years of demonstrated conduct. (wp-01-08-14)
4. New Main Layer entrants typically arrive in the 70–84 band. (wp-01-08-16)
5. A single major relational violation can drop a score by 15–20 points in a cycle; recovering those points requires sustained positive conduct across multiple dimensions over months or years. (wp-01-08-41)
6. Nobody initializes at 100 or at 0; everyone initializes at a score reflecting what they actually did across eighteen years of observed behavior. (wp-01-08-58)
7. All residents' indicators are visible in public interaction contexts: high standing broadens social and professional access, low standing creates friction and limits trust-gated opportunity without triggering enforcement. (layers-sads-29)
8. Recovery runs through prolonged good behavior, community service and verified endorsements; major violations remain visible while the score recovers. (technologies-58)
9. Population endorsement and disapproval signals accelerate or decelerate movement in the direction the behavioral data already indicates; they cannot move a score against the grain of observed behavior, and proximity weighting applies. (wp-01-08-47, wp-27-34-118)
10. The apparatus that gathers behavioral data is institutionally separate from the apparatus that determines consequence. (wp-01-08-55)

Rationale — Charter Article II fixes the seven dimensions, the 10:1 ratio, tiered visibility, the
85-point floor and the null-scoring rule, all excluded. The measurement domains, their approximate
weights, the sub-40 flag, the band figures, the penalty magnitudes, the initialization bounds and the
signal-amplification limit are surface-home specification beneath it. Every "~" and "typically" is
preserved. Distinguished from LP-026 (calibration cadence) and LP-036 (cross-era comparability). No
acronym in the name.

---

### 12. The Ledger Integrity Act
- **origin** minted · **class** founding-act · **slug** `ledger-integrity`
- **primary anchor** whitepaper.html §5, §5.4, §5.7, §6.2 (lines 467, 510, 525, 566–567); technologies.html Card 8 (line 424)
- **candidate ids** wp-01-08-37, wp-01-08-43, wp-01-08-49, wp-01-08-62, wp-01-08-63, technologies-54, technologies-55, systems-45, faq-front-50, faq-front-51, faq-front-87

Provisions
1. Only consensus-grade conduct, established to a standard of proof through non-repudiable telemetry, is admissible to the behavioral ledger; opinion, belief and dissent do not enter the record. Intake discipline is not a feature of the metric but the precondition of its legitimacy. (wp-01-08-43, faq-front-87)
2. The ledger runs two distinct tracks — the continuous trust score and the criminal record log — both persistent, non-erasable and carried by the citizen's implant. (wp-01-08-37, technologies-54)
3. Both tracks travel with every citizen across layer boundaries and are read by private institutions in the lower layers when making access decisions; where the state administers neither, the information remains present and actionable. (systems-45, faq-front-50, faq-front-51)
4. Corrections are appended, never substituted: the original record and the correction both remain permanently visible. (wp-01-08-49)
5. Cleared infractions leave the active behavioral profile that gates trust-dependent access but remain on the historical ledger. (wp-01-08-63)
6. Major crimes — murder, rape, severe predatory violence, systematic exploitation — carry permanent flags that no amount of subsequent good conduct removes from the active record. (wp-01-08-62)
7. Non-criminal trust signals never collapse into criminal consequence; the two tracks govern different domains. (technologies-55)

Rationale — what may enter the record, what shape it takes, and what may never be removed from it, in
one instrument. Charter Article II carries the adjacent cognition rule and names the criminal record
log, but carries no standard of proof, no admissibility rule and no append-only correction rule.
"ledger-integrity review" exists in canon as a detection procedure under Article XXV.III, not as an
instrument title. LP-036 already governs cross-era comparability and is excluded.

---

### 13. The Record Contestation Act
- **origin** minted · **class** founding-act · **slug** `record-contestation`
- **primary anchor** whitepaper.html §5.7–5.8 (lines 525–530)
- **candidate ids** wp-01-08-48, wp-01-08-50, wp-01-08-51, wp-01-08-53, systems-08

Provisions
1. A citizen who believes the AI misread the context of a logged behavioral event may contest the record; the AI does not reverse its own observations, so contestation requires an external channel. (wp-01-08-48)
2. The primary mechanism is the local civil court system, permitted to operate in every layer but not institutionally built by VMSS — courts emerge from the population's own demand for dispute resolution. (wp-01-08-48)
3. Civil courts are never licensed or accredited; their ledger influence is earned through their outcome-accuracy record, calibrated within their own layer's correction pool. (wp-01-08-50)
4. A second, non-judicial channel exists: where a sufficient volume of citizens who directly witnessed or were contextually proximate to a logged event signal that the interpretation does not match what occurred, the system ingests a correction modifier weighted toward proximity. (wp-01-08-53)
5. Civil courts apply resolved doctrine to ordinary corrections; genuinely novel contextual questions escalate through the novelty filter, and the resulting ruling resolves the category for all future corrections of the same type. The two levels are sequential, not competing. (wp-01-08-51)
6. Consequence is delivered as environmental physics rather than institutional judgment: contestation adjusts how the record is contextualized, not whether the event happened. (systems-08)

Rationale — the whole of the citizen's recourse against the ledger. Minted rather than promoted:
canon uses "record contestation" lowercase as a subject heading, not as the instrument's own title.
LP-067.2's per-layer correction-pool calibration is already enacted and is not restated as its own
provision. Gap noted in flags: "a sufficient volume" states no numeric threshold anywhere in canon.

---

### 14. The Calibration Boundary Doctrine
- **origin** minted · **class** founding-act · **slug** `calibration-boundary`
- **primary anchor** whitepaper.html §5.4.2 (line 516); §5.1 (lines 485–500); §7.6 (line 626); §10.7.1 (line 813)
- **candidate ids** wp-01-08-39, wp-01-08-46, wp-01-08-78, wp-20-22-08, wp-09-12-33

Provisions
1. Measurement domains and constitutional dimensions operate at different altitudes: domain boundaries may be recalibrated as measurement matures; the constitutional dimension set beneath them may not. (wp-01-08-39)
2. Weight refinement within the fixed dimension set is metric maintenance the AI governance level is authorized to perform on the standing calibration cadence; any change to the dimension set itself — adding, removing, or redefining a dimension — is structural alteration requiring dual-key classification and deferral to the Article XI amendment gauntlet. (wp-01-08-46)
3. The test at the boundary is whether the change refines the measurement of an existing commitment or authors a new commitment about what belongs at all. (wp-01-08-46)
4. Changes to the Meritboard's metric category set route through Article XI; calibration within a fixed category is operational maintenance administered by AI governance and audited by the Meritboard. (wp-01-08-78)
5. No actor designs the metric that ranks them: a domain credential-holder does not author the criterion that admitted them, and AI governance administers a criterion without owning authorship of it — authorship, calibration and audit are held by three separate bodies. (wp-20-22-08)
6. Experimental relaxation of a load-bearing structural distinction cannot be authorized below the Article XI amendment tier. No consent-based enclave, regulatory pilot, district-scale experiment or other below-amendment mechanism may temporarily suspend such a distinction; an experimental pilot for any such relaxation is amendment authorship under a softer label and routes to the gauntlet or does not happen. (wp-09-12-33)

Rationale — canon states the same architectural rule in four domains and notes the parallel itself;
the anti-smuggling prohibition is the same boundary read from the other side. Routes to but is nowhere
stated by Article XI. Collision-checked against LP-026 "STI Weight Calibration Review Cycle", which is
a cadence, not a boundary rule.

---

### 15. The Security Classification System
- **origin** promoted · **class** founding-act · **slug** `security-classification-system`
- **primary anchor** whitepaper.html §8 (lines 637–728); §34 glossary (lines 1972–1973)
- **candidate ids** wp-01-08-82, wp-01-08-83, wp-01-08-84, wp-01-08-85, wp-01-08-86, wp-01-08-87, wp-01-08-88, wp-27-34-128

Provisions
1. A single three-tier classification governs access to all sensitive infrastructure; the tiers are defined by the consequence of unauthorized access — existential threat, load-bearing system compromise, or operational exposure — not by the domain the infrastructure belongs to, and military, civilian and governance infrastructure use the same system. (wp-01-08-82, wp-27-34-128)
2. Sovereign — national military command authority and the President only — covers kill switch activation protocols, nanobot plume deployment specifications, defense platform weapons authorization and orbital defense corridor authorization. (wp-01-08-83)
3. Top Secret — named roles with specific clearance — covers formula internals, implant blueprints, implant fabrication facility access, fabrication station access codes for the upper and lower layers, backup vessel infrastructure operations, neural diving transmission channels and mind-state bridging channels. (wp-01-08-84)
4. Confidential — operational personnel with need-to-know — covers AR surveillance camera operations, mega wall gate keycards, mega wall turret remote operation, district boundary redraw algorithms, enforcement drone patrol patterns and energy array operations. (wp-01-08-85)
5. Orbital and spacecraft assets comprise four categories with distinct profiles — fabrication stations, defense platforms, energy arrays and communications relays — with relays classified by data channel rather than by hardware. (wp-01-08-86)
6. Classification confers access to information, never authority to act: a cleared holder may suggest alterations but not implement them, and no individual, including the President, may authorize a kinetic strike unilaterally. (wp-01-08-87, wp-27-34-128)
7. The tier set is constitutional and adding or removing a tier requires the Article XI gauntlet; assigning specific items to existing tiers is an operational decision of the Meritboard's federal-administration ranking in consultation with the cybersecurity division. The tiers are permanent; the items evolve. (wp-01-08-88)

Rationale — canon names the system and its three tiers. Charter XXV.V acknowledges classified military
instruments and says operational details remain classified (an express PART 4 non-home); it does not
carry the tier system, the item schedules, or the access-is-not-authority rule. Recorded as a mild
flag: canon asserts the tiers are "constitutional" while charter.html contains no Security
Classification, Top Secret or Confidential text at all.

---

### 16. The Unified Transparency Doctrine
- **origin** promoted · **class** founding-act · **slug** `unified-transparency-doctrine`
- **primary anchor** whitepaper.html §8.2 (lines 724–726); §19.9 (line 1180); §22.2 (line 1318)
- **candidate ids** wp-01-08-89, wp-01-08-90, wp-20-22-35, systems-40, systems-59, world-80, wp-17-19-66, wp-17-19-67, wp-27-34-19, wp-27-34-24, wp-17-19-64, wp-17-19-65
- **Fix Pack B2:** wp-17-19-64 (§19.9 leakage trajectory published and public) and wp-17-19-65 (§19.9 AI-governance failures admitted, logged, preserved) appended — §19.9 duplicate sources of provisions 7 and 6 respectively (which cite the adjacent -66/-67).

Provisions
1. Normative outputs are legible and exploitable internals are classified. Citizens must be able to see the rules that govern them, their own status, the institutional outputs that shape their life, and the broad measured criteria the civilization commits to. Nothing that affects a citizen's accountability or civic standing is hidden from them. (wp-01-08-89)
2. Opacity is legitimate only where it protects the integrity of rules citizens are already fully informed about; classification hides exploit surfaces, never rules or consequences. (wp-01-08-90)
3. The anti-smuggling preserver: those with access cannot unilaterally implement changes. Cleared personnel may suggest alterations but not author them; classification protects rule-enforcement and does not enable hidden rule-rewriting. (wp-01-08-90)
4. The constitutional framework, enforcement architecture, layer mechanics, governance structure and civilizational philosophy are published openly; military operational specifics remain classified; everything else is public. (wp-20-22-35, world-80)
5. Public-benefit information is transparent by default — enforcement logs, policy rationale and system-level outcomes are visible where transparency strengthens trust and accountability — with some information classified for security reasons. (systems-40)
6. When institutional systems fail, the errors are admitted, logged and preserved as institutional knowledge, entering the civilization's textbooks and training material, with emergency-protocol operational details remaining restricted. (wp-17-19-67, systems-59, wp-27-34-19)
7. The leakage trajectory is published and public; the civilization measures itself against its own stated aspiration transparently. (wp-17-19-66, wp-27-34-24)

Rationale — canon names the doctrine. It is the natural home for every affirmative publication duty in
the corpus, and none of its limbs has a Charter analogue: Article XXV.V classifies specific protocols
and Article XX requires internal review, but nothing requires publication, admission of error, or
preservation.

---

### 17. The Leakage Accounting Standard
- **origin** minted · **class** schedule-under-authority · **slug** `leakage-accounting`
- **parent authority** Charter Article XXIII — Zero Leakage Aspiration
- **primary anchor** whitepaper.html §28.2 (lines 1566–1567); §17.1.3 (line 1059)
- **candidate ids** wp-17-19-16, wp-27-34-17, wp-27-34-18, wp-27-34-94, sims-39

Provisions
1. Each revival failure is logged against the zero-leakage aspiration as an irreducible leakage event the architecture tracks without promising to eliminate. (wp-17-19-16)
2. Not all leakage categories carry equal weight. Three are load-bearing — backup vessels, the implant ledger, and autonomous enforcement — and carry veto weight: the civilization's core promises fail without them regardless of progress elsewhere. (wp-27-34-17, wp-27-34-94)
3. Weights governing the calculation: backup vessels approximately 25%, the implant ledger approximately 20%, autonomous enforcement approximately 20%, physical boundary infrastructure 15%, pre-intervention 10%, and supporting systems 10% combined. (wp-27-34-18)
4. Continuity access failures are enumerated as five named modes, each logged against the aspiration. (sims-39)

Rationale — Charter Article XXIII names backup vessel deaths as leakage and sets the aspiration but
weights no category and states no logging rule. This is the measurement doctrine under it. Every "~"
preserved; the trajectory projections themselves remain not-law and are excluded.

---

### 18. The Redundant Envelope Pattern
- **origin** promoted · **class** founding-act · **slug** `redundant-envelope-pattern`
- **primary anchor** whitepaper.html §28.0 (lines 1546–1553); §28.5 (line 1574); §18.6 (line 1111)
- **candidate ids** wp-27-34-08, wp-27-34-09, wp-27-34-11, wp-27-34-12, wp-27-34-21, wp-17-19-43, systems-48, wp-13-16-32, wp-17-19-41
- **Fix Pack B2:** wp-17-19-41 (§18.6 critical-infrastructure mandatory analog redundancy) appended — §18.6 duplicate source of provisions 5–6 (which cite the adjacent -43); the analog-redundancy mandate this instrument already carries.

Provisions
1. VMSS does not depend on any single instrument for any load-bearing function. Every load-bearing capability carries three to five stacked deterrent envelopes so that evasion of any single one falls into the next layer; the pattern is the architecture's primary defense against the single-point-of-failure problem, not an incidental feature. (wp-27-34-08)
2. The surveillance function is carried by four stacked envelopes — implant ledger, external cameras, drone patrol network, and population signal — so implant removal produces no forensics gap and the function routes through the remainder. (wp-27-34-09)
3. Boundary integrity is an envelope rather than a single mechanism — physical structure, active defense, environmental separation, and eventual field integration — and no single mechanism is the load-bearing layer. (wp-27-34-11)
4. Continuity is stacked — revival, the binary fidelity guarantee, the civic floor and standing child relocation rights — so revival failure does not erase the continuity commitment; the floor still holds. (wp-27-34-12)
5. Critical infrastructure carries both automated and analog security including electromagnetically resistant fallback capacity, so no single point of failure exists in essential systems. (wp-27-34-21, systems-48)
6. Datacenters supporting AI governance and ledger storage are treated as critical civilizational infrastructure, protected by automated defense combined with hardened analog fallback including human-operated security designed to remain functional during electromagnetic disruption. (wp-17-19-43, systems-48)
7. Implant infrastructure is classified as critical civilizational infrastructure at the same protection level as backup vessel fabrication. (wp-13-16-32)

Rationale — canon names both "The Redundant Envelope Pattern" and "the analog redundancy principle";
promoted under the broader of the two, because canon states the analog requirement as an instance of
the pattern rather than a separate rule. No Charter twin — Article XXV.III protects the ledger from
compromise but sets no hardening requirement for the physical plant. "Critical Infrastructure
Security" is an existing systems.html heading and was avoided as a name.

---

### 19. The Governance Restraint Act
- **origin** minted · **class** founding-act · **slug** `governance-restraint`
- **primary anchor** whitepaper.html §7 (lines 606–608); §7.4 (line 621); §5.11 (line 540); systems.html #governance-principles (lines 225–232)
- **candidate ids** wp-01-08-56, wp-01-08-69, wp-01-08-71, wp-01-08-76, wp-09-12-25, wp-17-19-68, systems-03, systems-04, systems-61

Provisions
1. Officeholders remain fully subject to the same laws as all citizens, and legal violation results in immediate loss of office — not investigative process or political negotiation. (wp-01-08-69, wp-17-19-68, systems-03)
2. Policy proposals must be stress-tested through AI-assisted simulation for long-term outcomes before adoption. (wp-01-08-71, systems-04)
3. The governance system monitors population dynamics, genetic diversity, resource extraction and environmental trends continuously and flags systemic threats, but does not unilaterally restrict — it recommends, and the consent layer decides. (systems-61)
4. The novelty filter escalates rather than self-resolving when category identity is disputed; its operation is auditable under the feedback-loop function and citizens may petition for review of it; and it decides docket routing only, never which interpretation applies once the Court engages. (wp-01-08-76)
5. A decline caused by a metric trap rather than by continued bad conduct is treated as institutional error the audit function must catch and correct. (wp-01-08-56)
6. A coalition-wide majority cannot override a dissenting district; each participating district must independently ratify at its own threshold. (wp-09-12-25)

Rationale — one instrument gathering the restraints that bind governing bodies themselves. "Legal
violation results in immediate loss of office" is verified absent from the Charter (grep of
charter.html for "loss of office" returns nothing; Article XXII covers stepping off the ranking and
the deputy, not forfeiture). The simulation mandate, the non-unilaterality boundary, the three filter
constraints, the metric-trap duty and the coalition non-override rule are similarly un-homed.

---

### 20. The Civic Floor Act
- **origin** promoted · **class** founding-act · **slug** `civic-floor`
- **primary anchor** whitepaper.html §4.4 (lines 455–458)
- **candidate ids** wp-01-08-32, wp-01-08-33, wp-01-08-34

Provisions
1. The civic floor is the non-withdrawable set of obligations the state carries identically at every layer, including -3; it operates identically in Sanctuary and in the terminal layer, and it is what makes the federal-floor-remains clause meaningful. (wp-01-08-32)
2. Graduated institutional investment is everything above the floor — medical drone density, revival reliability, pre-intervention enforcement, daily governance presence, shared-currency economic access, domain availability — graduated as consequence of conduct-based placement. Abandonment would require breaching the floor; graduation above the floor is consequence, not abandonment. (wp-01-08-33)
3. Floor content is constitutionally anchored, expandable through the formal ladder, and never contractable through regulatory action: a layer-wide regulatory petition cannot remove a floor element from operation in that layer, and such proposals route to Article XI as structural modifications of layer membership criteria. Expansion is calibration; contraction is structural, and the asymmetry is load-bearing. (wp-01-08-34)

Rationale — canon names the floor. Every enumerated element of it is Charter-home (Preamble, Article
III, Article VIII, Articles XXV.I–III) and excluded; what is surface-home is the concept of a single
non-withdrawable set operating identically at every layer, the classification of everything above it,
and the one-way ratchet. LP-034 and LP-043 already operate on the floor and are excluded.

---

### 21. The Federal Reach Boundary Act
- **origin** minted · **class** founding-act · **slug** `federal-reach-boundary`
- **primary anchor** whitepaper.html §4.2.1 (line 449); §10.1 (line 773); §21.3 (line 1298)
- **candidate ids** wp-01-08-27, wp-01-08-28, wp-01-08-29, wp-09-12-13, wp-20-22-21, wp-20-22-23, layers-sads-13, layers-sads-52, layers-sads-60, layers-sads-62, sims-18, faq-front-43, faq-front-48

Provisions
1. The federal floor activates in -3 on two explicit triggers and only these two: violation of the absolute federal laws, and activity triggering the External Force Doctrine. Below these two triggers, organized activity is tolerated however it develops. (wp-01-08-27)
2. The test is act-based, not organization-based: counter-sovereignty attaches to specific acts against the architecture, not to the existence of organized self-governance in a layer designed to produce exactly that. (wp-01-08-28)
3. Cross-layer protective mandates of the food-safety class are not a third trigger: they bind -1 and -2 in-layer through the institutional presence operating there, reach -3 only at its trade boundary where goods cross through authorized channels, and carry advisory standing internally. The floor of guaranteed conditions runs exactly as deep as the infrastructure that carries it. (wp-01-08-29)
4. Federal ecological monitoring — biodiversity tracked at the genetic level, not just population counts — operates as standard federal infrastructure across all layers, including -3. (wp-09-12-13)
5. Federal floor law binds inside every private and chartered domain in every layer; metric gating governs admission and does not exempt conduct. (wp-20-22-21, layers-sads-13)
6. In -2 the binding content inside private domains is specifically the nonlethal constraint and the prohibition on capital acts, regardless of what any domain admits or expels. (layers-sads-52)
7. Federal enforcement inside domains operates on individual conduct rather than on domains as units — the state enforces against persons, not against communities. (wp-20-22-23)
8. Terminal freedom ends where cross-ring consequences begin: federal law overrides layer autonomy when ecological or systemic harm would export upward into the other four layers. (layers-sads-60)
9. Emissions are permitted up to a certified self-cleanup compliance threshold; breach after formal notice triggers shutdown order, asset seizure and reassignment. (sims-18)
10. A duel that escalates into a public massacre invites the federal enforcement track regardless of the local framing, while a contained two-person duel falls inside the layer's customary tolerance. (faq-front-43)
11. Large-scale organized threats to civilizational sovereignty fall outside layer autonomy entirely and are met with the national defense track rather than the law enforcement escalation ladder; the response is overwhelming by design and temporary by doctrine, and reverts the layer to its standard character. (layers-sads-62)
12. Withdrawal of governance from lower layers is not a surrender of sovereignty; the territory remains VMSS territory. (faq-front-48)

Rationale — one instrument answering one question: how deep does federal authority reach into a
withdrawn layer, and on what. Charter Article XXV establishes the absolutes themselves and Article VI
names the two triggers as a fact; neither states the exhaustive boundary, the act-based construction
rule, the depth-of-reach rule, or the person-not-community enforcement limit. The -3 organic
self-ordering the boundary encloses is never codified. Judicial extraction is escalated to flags
rather than folded in, because it conflicts with Charter Article X on its face.

---

### 22. The Enforcement Chain
- **origin** promoted · **class** schedule-under-authority · **slug** `enforcement-chain`
- **parent authority** Charter Article VI — Enforcement & Restoration Protocol
- **primary anchor** whitepaper.html §19.2–19.3 (lines 1138–1153)
- **candidate ids** wp-17-19-56, wp-17-19-58, technologies-31, systems-53, systems-54, systems-58, faq-front-94, layers-sads-42

Provisions
1. Once an act occurs the system responds in a fixed sequence: the implant records the event with full contextual data; medical drones deploy to the victim and stabilize in the field; revival initiates if the victim dies and infrastructure is operational; the perpetrator is identified through telemetry, sedated if necessary, transported by enforcement drone, and reassigned downward on severity. The entire chain can complete in minutes. (wp-17-19-56)
2. The stages run on a fixed timeline: detection in real time, warning pre-act in seconds, event logging simultaneous, victim response seconds to minutes, perpetrator response minutes, assessment minutes to hours. (wp-17-19-58, faq-front-94)
3. Enforcement turrets use only non-lethal means — foam, nets, sonic disorientation, or sedative mist. (technologies-31)
4. Breach resolution runs without trial: the ledger is already current, severity assessment runs immediately against the reassignment threshold, and reassignment is immediate, permanent, seals the upward pathway and triggers asset liquidation. (systems-54)
5. Consequence routing by scenario: a Main Layer murder attempt sends the perpetrator to -3; a -1 assault sends them to -2, or to -3 if escalation warrants it; a halted Sanctuary attempt sends them to -3. (systems-53)
6. Edge cases resolve on the same footing: a disabled failsafe still routes to post-intervention; all multiple perpetrators face reassignment based on intent and execution level; a victim's refusal of revival is respected. (systems-58)
7. In -1 the posture is logging-only tracking with no preemptive intervention; drone coverage exists but response times are slower than in Main Layer. (layers-sads-42)

Rationale — canon names the chain at the §19.3 table heading. Charter Article VI supplies the outcome
but no sequence, no timeline and no means-constraint, so this is specification beneath Article VI
rather than a founding act.

---

### 23. The Medical Response Standard
- **origin** minted · **class** schedule-under-authority · **slug** `medical-response`
- **parent authority** Charter Articles V, VI and XXIV
- **primary anchor** whitepaper.html §18.1 (line 1094); technologies.html Card 5 (line 269)
- **candidate ids** wp-17-19-34, technologies-27, technologies-28, technologies-29, world-151

Provisions
1. Medical drones are deployed instantly after any harm event in Main Layer and above, arriving in seconds rather than minutes, with hospital-grade stabilization performed in the field. (wp-17-19-34, technologies-27)
2. Severe injuries and complex conditions are stabilized in the field and transported to institutional hospital infrastructure where specialized equipment, surgical facilities and intensive-care capacity handle what field treatment cannot. (technologies-28)
3. In the Heaven Layers medical drones additionally serve preventive and chronic care functions, integrating with institutional hospitals to provide continuous monitoring and treatment without the friction of scheduling or triage. (technologies-29)
4. There is no insurance, no triage and no economic barrier at the point of response. (world-151)

Rationale — Charter Article V grants automated medical services generically and Article XXIV sets the
access gradient; neither sets the deployment mandate, its Main-and-above scope, the care-routing rule
or the Sanctuary expansion. Kept separate from the Enforcement Chain because the preventive and
chronic-care limb is not an enforcement function.

---

### 24. The Harmed-Party Restoration Standard
- **origin** minted · **class** founding-act · **slug** `harmed-party-restoration`
- **primary anchor** whitepaper.html §19.5 (line 1168); §12.4 (line 904)
- **candidate ids** wp-17-19-60, wp-09-12-62, faq-front-10, faq-front-12

Provisions
1. The victim's record is annotated as victimized; there is no trust penalty for being harmed. (wp-17-19-60)
2. In relational violations the victim's record is adjusted to remove any compounding effects the perpetrator's conduct produced on their score. (wp-17-19-60)
3. The victim receives full restoration — revival, medical treatment, therapy and any applicable restitution — regardless of the perpetrator's survival or refusal. (faq-front-10)
4. Revival reverses biological death at full fidelity but does not erase the experience of being harmed, the interruption to a life, the alteration of relationships or the destruction of trust; neural therapy is provided immediately, and physical fidelity graduates with technological maturity. (faq-front-12)
5. On the guilty party's share, victim restoration and restitution costs are honored first, then family binding agreements, before treasury absorption. (wp-09-12-62)

Rationale — no Charter article addresses victim treatment on the metric side, and Article III.V lists
both liquidation claim heads without stating an order between them. Named to avoid collision with
LP-065 "Victim Continuity Restoration Act", which covers the continuity remedy specifically and is
excluded here.

---

### 25. Two-Level Moral Causality
- **origin** promoted · **class** founding-act · **slug** `two-level-moral-causality`
- **primary anchor** whitepaper.html §5.13 (line 553); §6.5 (lines 578–579); §34 glossary (lines 2029–2030)
- **candidate ids** wp-01-08-59, wp-01-08-66, wp-27-34-147, wp-27-34-92, faq-front-37, faq-front-86

Provisions
1. Criminal morality is civilization-wide, act-based and layer-invariant: murder is murder, fraud is fraud, and the offense produces the same reassignment regardless of which layer the offender lives in. No layer is permitted a different criminal code. (wp-01-08-59, wp-27-34-147)
2. Layer-contextual social rating is layer-variant: the formula is fixed across all layers, but the public rating input reflects the judgment of the citizen's own layer population, so identical conduct can produce different social-standing impact without any change to its criminal classification. The ambient standard is not engineered — it emerges from the population's own demonstrated character. (wp-27-34-92)
3. Consequence is classified by mechanism, not by label: punitive consequence is loss imposed as penalty for an adjudicated act and requires three-axis classification, while condition-based consequence is automatic adjustment when a continuous qualifying condition is no longer met and performs no adjudication because nothing is being judged. (wp-01-08-66)
4. The anti-gaming preserver: federal law violations route through three-axis assessment regardless of how they are framed, threshold drops route through phasing, and domain-criterion violations route through automatic exclusion. The architecture distinguishes by what actually fires. (wp-01-08-66)
5. Consequence is not measured by suffering — it is measured by lost access and changed institutional relationship. (faq-front-37)
6. Layer reassignment replaces incarceration as the civilization's primary consequence mechanism, eliminating the federal carceral system; in lower layers private detention may still exist as part of local order. (faq-front-86)

Rationale — canon names the reconciliation and the glossary treats it as an instrument. The
consequence-classification test belongs with it because both answer the same question — which
consequences are universal and which contextual, and which constitutional constraints attach to each.
Charter Article XXI states district-invariance of classification but never the layer-level prohibition
on a divergent criminal code, and no Charter article carries the mechanism test.

---

### 26. The Individual Attribution Act
- **origin** promoted · **class** founding-act · **slug** `individual-attribution`
- **primary anchor** whitepaper.html §7.3 (line 617); §34 glossary (lines 1844–1845)
- **candidate ids** wp-01-08-74, wp-27-34-88, systems-60

Provisions
1. VMSS does not recognize corporate personhood or collective liability. (wp-01-08-74, wp-27-34-88, systems-60)
2. The implant ledger attributes every decision to the individual who made it; when a corporation causes harm — ecological destruction, mass exploitation, systemic fraud — the system evaluates every person in the decision chain individually, each carrying their own ledger, behavioral record and reassignment liability. (wp-01-08-74)
3. Pattern detection correlates individually innocuous acts across multiple ledgers to identify coordinated harm no single actor's record would reveal. (systems-60)
4. Leadership descent triggers standard asset liquidation; the corporate structure loses its upper-layer economic position when the decision-makers who ran it lose theirs. (wp-01-08-74)

Rationale — canon names the principle. Grep of charter.html for "corporate personhood" returns zero;
Article XVIII covers network attribution among persons, not the denial of entity personhood. A
constitutive prohibition determining who is a legal subject at all.

---

### 27. The Private Justice Boundary Act
- **origin** minted · **class** founding-act · **slug** `private-justice-boundary`
- **primary anchor** whitepaper.html §4.2 (line 444); layer--1.html line 86; layer--2.html line 82
- **candidate ids** wp-01-08-20, wp-01-08-22, layers-sads-31, layers-sads-32, layers-sads-33, layers-sads-49, layers-sads-50, layers-sads-51, sims-40

Provisions
1. Private justice in -2 operates within one architectural constraint: killing triggers immediate -3 reassignment. Everything below killing is a permitted enforcement instrument — indefinite detention, nonlethal torment, sustained coercion — administered without VMSS procedural constraint. (wp-01-08-20, layers-sads-49)
2. Execution is not explicitly prohibited but architecturally constrained: the executioner has committed murder, the ledger logs it, and reassignment attaches on identification rather than on apprehension. Most private justice operators make a different calculation. (layers-sads-50, sims-40)
3. Forced revival as a deterrent is a permitted instrument, but the loop is bounded rather than closed: authorized bailout routes any prisoner-triggered revival to a sovereign facility beyond the captor's reach, blocking the command requires implant tampering as a federal absolute, and captor-caused death is murder. (wp-01-08-22, layers-sads-51)
4. In -1 private detention operates within institutional constraints that do not apply in -2: it may restrict privileges, impose basic rations, limit movement, apply short-term solitary and structure work-for-privileges programs; it may not use indefinite solitary, sustained corporal punishment, nonlethal torment, or forced revival to deny the bailout escape. (layers-sads-31)
5. Private courts in -1 cannot impose disproportionate sentences; a sentence failing the system-level proportionality check is unenforceable. (layers-sads-32)
6. Staff administering private detention build a pattern on their own ledger — the same system that evaluates residents evaluates guards, still logging and still running threshold checks. (layers-sads-33)

Rationale — the sharpest boundary in canon, stated as two mirror-image enumerations: what -1 forbids
and what -2 permits, with the killing line as the single common constraint. This is stated
institutional withdrawal with a stated boundary, NOT -3 organic self-ordering, which is never
codified. Article XIV supplies the proportionality authority for the -1 half but neither list.

---

### 28. Authorized Bailout
- **origin** promoted · **class** founding-act · **slug** `authorized-bailout`
- **primary anchor** whitepaper.html §17.3.1 (lines 1078–1081)
- **candidate ids** wp-17-19-26, wp-17-19-27, wp-17-19-28, wp-27-34-44, layers-sads-45, wp-17-19-25
- **Fix Pack B2:** wp-17-19-25 (§17.3.1 bailout revival location forced, anti-evasion) appended — §17.3.1 duplicate source of provisions 3–4 (which cite the adjacent -27); the forced-location and arrest-on-arrival clauses already carried.

Provisions
1. Authorized bailout is a citizen-initiated implant command that triggers self-death and forces backup vessel revival in a sovereign VMSS fabrication facility, existing as protection against coercive captivity or torture by private actors where enforcement density is thin and drone rescue cannot reach in time. (wp-17-19-26)
2. The mechanism is individually-activated self-rescue: no third party, remote operator or institutional body can authorize a bailout on the citizen's behalf, and the implant accepts only the citizen's own command. (wp-17-19-26)
3. The revival location is forced; a bailout does not revive the citizen in place or at a location of their choosing. (wp-17-19-27)
4. On arrival the citizen is subject to standard institutional scanning, and any pending layer reassignment, criminal attachment or federal warrant produces immediate arrest. Bailout does not cheapen the moral contract; it only changes geography. (wp-17-19-27, wp-27-34-44)
5. Bailout alters no layer status, no score, and no prior record; it is a continuity escape valve, not a consequence escape. (layers-sads-45)
6. It is structurally distinct from the externally-activated federal kill switch: different authorities, different triggers, different purposes, sharing only the underlying hardware and the binary-revival aftermath. (wp-17-19-28)

Rationale — canon names the instrument and the glossary treats it as one. Charter XXV.V covers only
the externally-activated kill switch, which §17.3.1 expressly distinguishes. The forced-location and
arrest-on-arrival clauses are what keep the grant from becoming an evasion route.

---

### 29. The Continuity Reliability Schedule
- **origin** minted · **class** schedule-under-authority · **slug** `continuity-reliability`
- **parent authority** Charter Article IV — Technology & Continuity
- **primary anchor** whitepaper.html §17.1–17.1.1 (lines 1027–1042)
- **candidate ids** wp-17-19-03, wp-17-19-06, wp-17-19-07, wp-01-08-21, technologies-13, technologies-19, faq-front-05, wp-27-34-49, layers-sads-30

Provisions
1. Published revival failure rates by layer: approximately 1 in 1,000,000 in +1 Sanctuary and Main Layer, approximately 1 in 10,000 in -1, approximately 1 in 1,000 in -2, and none in -3. (wp-17-19-03, technologies-19, faq-front-05, wp-27-34-49)
2. -1 and -2 continuity is delivered through VMSS-operated fabrication proxy installations. (wp-17-19-03, wp-01-08-21)
3. Mind-state backups are taken periodically, stored encrypted in secure vaults, and transferred to a pre-grown or synthesized vessel upon death or authorized bailout. (technologies-13)
4. A visitor's vessel syncs to the fabrication infrastructure of their origin layer at the origin-layer rate; the published table binds residents of each layer, not visitors passing through. (wp-17-19-06)
5. Punitive reassignment or voluntary permanent residency severs the origin-layer link and automatically links the destination layer's infrastructure at the corresponding rate. (wp-17-19-06)
6. Act-triggered reassignment is effective at act-completion with no administrative delay and precedes death processing, so simultaneity cannot be used to preserve origin-layer continuity through a breach. (wp-17-19-07)
7. The risk of revival failure is documented and disclosed at implant consent. (layers-sads-30)

Rationale — Charter Article IV states "layer-graduated revival reliability" and reaches no number —
the same pattern as III.III on rates. The magnitudes, the proxy siting, the visitor-sync routing, the
ordering rule and the disclosure duty are one technical schedule. Hedges ("~") preserved exactly. The
-3 hardware severance is Charter Article IV verbatim and is excluded.

---

### 30. The Continuity Integrity Act
- **origin** minted · **class** founding-act · **slug** `continuity-integrity`
- **primary anchor** whitepaper.html §17.1.2–17.1.5, §17.2 (lines 1047–1071)
- **candidate ids** wp-17-19-08, wp-17-19-09, wp-17-19-14, wp-17-19-15, wp-17-19-17, wp-17-19-18a, wp-17-19-19, wp-17-19-23, wp-20-22-51, technologies-20, faq-front-07, faq-front-08, faq-front-11, wp-17-19-18b
- **Fix Pack B3/B2:** the phantom `wp-17-19-18` is cured to `wp-17-19-18a` (the annex splits §17.1.5 line 1065 into 18a/18b/18c; provision 4's sync-authentication text matches 18a verbatim). wp-17-19-18b (§17.1.5 duress signaling — kidnapping is not a -3 federal-floor trigger) appended — duplicate source of provision 5 (which cites the adjacent -19). wp-17-19-18c is not-law (tolerated -3 gray-market remainder) and is a named exclusion in PART 2.

Provisions
1. Revival restores legal identity in full: marriages, contracts, property and layer status carry through without interruption, and the revived person is the same person legally, socially and doctrinally. (faq-front-11)
2. A failed revival is permanent. The architecture does not offer a second attempt through template-based body fabrication; a new body from genetic template is a separate person with none of the continuity the technology-and-continuity provision binds to, and any template held in pre-fabrication queue is destroyed to foreclose later duplicate-identity claims. (wp-17-19-14)
3. Sanctuary residency of a revival-failed citizen lapses at the moment of failure; the record persists in the institutional archive. (wp-17-19-15)
4. Sync authentication: a vessel synchronizes only through the citizen's implant link and each sync is signed against the civic ledger. A body revived outside institutional infrastructure carries an unsigned continuity claim that no layer's institutions, contracts, gates or ledger standing recognize. (wp-17-19-18a)
5. Duress signaling: involuntary-state telemetry flags coerced sync and captive revival to the federal floor wherever the floor operates; in -3 the flag records without triggering enforcement, because kidnapping is not a federal-floor trigger, and the record feeds network attribution. (wp-17-19-19, wp-17-19-18b)
6. Backup vessel maintenance is not a free entitlement: the dividend covers survival in every layer, and vessel upkeep is an infrastructure cost requiring economic participation above the survival floor. (wp-17-19-09)
7. Implant removal severs the sync; death without a current backup is death without revival. (wp-17-19-08)
8. Scheduled implant replacement runs a facility-mediated relay with both hardware instances active and the facility holding the mind-state across the swap; the engineered coverage gap is zero. Unsupervised loss severs the link instead. (wp-17-19-17)
9. A replacement implant resumes fetal linkage forward-operating only and does not retroactively reconstitute the developmental weeks the failed implant did not capture. (wp-20-22-51)
10. A citizen may refuse revival; the system preserves the option of continuity but does not compel its use, the decision is logged, honored and irreversible, and no penalty attaches to the choice itself. (wp-17-19-23, technologies-20, faq-front-08)
11. In vessel-covered layers implant removal is the only route to permanent death; the architecture neither prevents removal, penalizes the decision, nor imposes mandatory intervention or counseling, and a citizen who dies without removing the implant is revived automatically at full fidelity. (faq-front-07)

Rationale — what continuity guarantees, what ends it, what it costs, and who may decline it: four
questions the corpus answers in scattered places and never in one instrument. LP-063 polices the
coercion channel around the refusal right; the right itself was unnamed. The refusal cluster is folded
in rather than split into a separate consent act, per rule 5.

---

### 31. The Institutional Archive Act
- **origin** promoted · **class** founding-act · **slug** `institutional-archive`
- **primary anchor** whitepaper.html §17.4 (lines 1084–1085)
- **candidate ids** wp-17-19-29, wp-17-19-30, wp-17-19-31

Provisions
1. The implant ledger, score history, ranking standings, reassignment record, district assignment and biographical data of every resident who ever existed are preserved indefinitely as civilizational infrastructure, not personal property; its purposes are network attribution, accountability, parentage verification and long-horizon historical research. (wp-17-19-29)
2. On death — ordinary, by revival failure, or by terminal severance — the active-status flag transitions to deceased. The data itself is not wiped. (wp-17-19-29)
3. The record is non-expungeable: no descendant may rehabilitate an ancestor's standing post-hoc, no family may purge a relative from the archive, and no subsequent conduct by survivors alters the deceased's final ledger. (wp-17-19-30)
4. Upper-layer family members may view a deceased relative's public record through standard institutional channels — reassignment date, offense record, district of last residence, date of death — and cannot revive, contact or reconstitute the deceased. (wp-17-19-31)

Rationale — canon names the archive. Articles XVIII, XX and VIII are cited as its purposes but none
establishes it or states the retention rule, the expungement prohibition or the family query window.
LP-032 governs access standing beyond that window and is excluded.

---

### 32. The Live Session Consent Standard
- **origin** minted · **class** founding-act · **slug** `live-session-consent`
- **primary anchor** whitepaper.html §16.1 (line 1005); technologies.html Card 2 (lines 99–113)
- **candidate ids** wp-13-16-33, technologies-09, technologies-10, technologies-11, technologies-12, wp-27-34-104, faq-front-89

Provisions
1. Neural diving operates in two modes: Audience Mode, passive observation of a host's subjective experience, and Pilot Mode, temporary active control with explicitly revocable consent. (technologies-09, wp-27-34-104, faq-front-89)
2. Consent is explicit and revocable at any moment in both modes; the host may withdraw at any moment. (wp-13-16-33, technologies-09)
3. All sessions are logged for safety. (technologies-11)
4. Full identity protection applies by default. (technologies-12)
5. Real snuff, material depicting the sexual abuse of children, and non-consensual content trigger immediate reassignment. (technologies-10)

Rationale — LP-037 governs trace retention and LP-056 governs restorative exposure; neither reaches
the live session. Article IV names neural diving as technology and states no consent rule. Named to
avoid collision with LP-008 "Neural Diving Consent Expansion" (failed).

---

### 33. The Augmentation Consent Standard
- **origin** minted · **class** founding-act · **slug** `augmentation-consent`
- **primary anchor** technologies.html Card 4 (lines 198, 215, 242); whitepaper.html §16.2 (line 1012)
- **candidate ids** technologies-21, technologies-24, wp-13-16-42, layers-sads-14

Provisions
1. Biological-augmentation modifications are consensual, reversible, and previewed through neural diving before commitment. (technologies-21, wp-13-16-42)
2. Longevity and fertility augmentation is subsidized in the higher layers, with full access to biological modification in +1 Sanctuary, where age pinning, transrace, transanimal and custom morphological changes are available and subsidized. (technologies-24, layers-sads-14)

Rationale — Charter Article V permits all body transmutations and sets no standard. Consent,
reversibility and pre-commitment preview are the operative boundary on providers, and the subsidy limb
is the service schedule attached to it. Canon's hedged framing of reversibility as partly a property
of the technology is preserved in the flag list, as is the missing subsidy rate.

---

### 34. The Defensive Posture Doctrine
- **origin** minted · **class** founding-act · **slug** `defensive-posture-doctrine`
- **primary anchor** whitepaper.html §23 (lines 1357–1386); world.html §3 Military Posture (lines 504–530)
- **candidate ids** wp-23-26-01, wp-23-26-02, wp-23-26-05, wp-23-26-06, wp-23-26-07, wp-23-26-08, wp-23-26-10, world-06, world-08, world-09, world-12, world-14, world-15, world-16, world-17, world-18, world-27, technologies-48, technologies-49, faq-front-47

Provisions
1. Military posture is defensive; territorial boundaries have never expanded beyond the founding charter, and capability exists solely to ensure no external actor can threaten the architecture residents depend on. (wp-23-26-01, world-27)
2. VMSS does not wage wars of conquest, occupation or regime change; engagement is threat neutralization — overwhelming, temporary and bounded by doctrine — and when the threat is neutralized operations cease and the border restores. (wp-23-26-10, world-12)
3. The military is invoked exclusively on the national defense track: not governance, not policing, not dispute resolution, with a mandatory withdraw-and-revert. (faq-front-47)
4. The deterrent's existence is publicly acknowledged while operational specifics remain classified; the acknowledgment itself is the deterrent. (wp-23-26-02, world-09)
5. Every combat biological augmentation is reversible and maintained by civilian medical infrastructure. (wp-23-26-05, world-14)
6. No VMSS aircraft, ship, tank, transport or artillery platform carries a crew; neural-linked operators command from secure positions inside VMSS territory, every vehicle is expendable, and exosuit infantry are the only human presence on the battlefield. (wp-23-26-06, world-16, world-17, world-18)
7. Orbital strike uses inert kinetic rods at terminal velocity with precision targeting and no radioactive fallout; kinetic weapons systems constitute a third external capability stack for destruction of armored units, installations and infrastructure. (wp-23-26-07, world-08)
8. Direct neural interference with enemy combatants is reserved to extreme escalation within nanobot-saturation neural warfare. (wp-23-26-08)
9. Neural-diving pilot mode over animal hosts operates with consent-override authorized for military animals. (world-15)
10. The implant kill switch is domestic only, operating solely on residents who consented to installation, with no external application. (world-06, technologies-48)
11. Nanobot neutralization plumes require no implant consent, close the implant-removal evasion vector, and constitute the primary external deterrent. (technologies-49)

Rationale — Charter Article XXV.V acknowledges the two instruments and classifies their protocols; it
states no posture, no war-aims prohibition, no invocation boundary, no force-composition standard,
and neither the kill switch's consent limit nor the plumes' consent-independence. Composed as one
instrument because posture, prohibition, invocation boundary and force composition are a single
self-limiting design: the capability is enormous precisely because its permitted use is narrow.

---

### 35. The Wartime Conduct Provisions
- **origin** promoted · **class** founding-act · **slug** `wartime-conduct-provisions`
- **primary anchor** whitepaper.html §23.3 (line 1386); world.html §3 (lines 529–530); self-named at world.html:615
- **candidate ids** wp-23-26-11, wp-23-26-12, world-13

Provisions
1. Captured combatants are processed through behavioral evaluation and placed on the layer gradient by conduct: a conscript with no criminal history enters Main Layer if they choose to remain, and a commanding officer responsible for atrocities is placed in the layer their conduct warrants. (wp-23-26-11, world-13)
2. Captured combatants who do not wish to remain are repatriated when hostilities conclude; VMSS does not hold prisoners of war indefinitely. (world-13)
3. Detention during active hostilities is temporary, humane by charter standard, and terminates when the conflict ends. (wp-23-26-12, world-13)

Rationale — canon self-names these ("processed under the Wartime Conduct provisions above",
world.html:615); promoted. No Charter article addresses captured combatants at all. Kept separate from
the Defensive Posture Doctrine because the canon name attaches to this cluster specifically and
because these are standing rights of detained persons rather than constraints on VMSS force.

---

### 36. The External Force Doctrine
- **origin** promoted · **class** founding-act · **slug** `external-force-doctrine`
- **primary anchor** whitepaper.html §24–24.2 (lines 1395–1418); world.html §3 (lines 598–619)
- **candidate ids** wp-23-26-15, wp-23-26-17, wp-23-26-18, wp-23-26-19, wp-23-26-35, wp-27-34-71, wp-27-34-87, world-19, world-20, world-21, world-22, world-23, world-24, world-25

Provisions
1. The defensive-only posture is a doctrinal constraint with explicit imminence thresholds for off-territory force against non-allied actors; VMSS initiates no territorial expansion, regime change or punitive expedition, but reserves preemption against verified existential threats under defined conditions. (wp-23-26-15, world-19)
2. Tier 1 — graduated diplomatic and economic response, no force deployed, published off-ramp. (wp-23-26-17, world-20)
3. Tier 2 — defensive mobilization on verified intent to deploy bypass-capable weapons; capabilities publicly demonstrated, no first strike, the actor informed of the threshold and given a final opportunity to stand down. (wp-23-26-17, world-21)
4. Tier 3 — preemptive neutralization of the specific weapon system, launch infrastructure or command-and-control node on verified deployment readiness, scoped to the imminent threat and not to the broader state. (wp-23-26-17, world-22)
5. Tier 3 authorization requires a Supreme Court emergency session verifying the imminence finding, the President's signature, and public disclosure within seven days including the evidentiary basis. (wp-23-26-18, world-23)
6. Tier 4 — full civilizational defense, ending when the threat is neutralized, with no retaliatory expansion and no post-conflict regime imposition. (wp-23-26-17, world-24)
7. Preemption against an imminent, verified, deployment-ready existential threat is doctrinally permitted; prevention against speculative future capability is doctrinally forbidden. The test is capability plus deployment intent plus imminence, verified through evidence. (wp-23-26-19, world-25, wp-27-34-71, wp-27-34-87)
8. The four tiers and their thresholds are public and legible in advance; publication is itself the deterrent, and an actor who crosses Tier 3 cannot claim surprise. (wp-23-26-35)

Rationale — canon names the doctrine and Charter Article VI cites it once, purely as a -3
federal-floor trigger, without ever stating it. Composed whole because the escalation schedule without
the procedural gate and the preemption boundary would be a licence rather than a constraint.

---

### 37. The Orbital Sovereignty Act
- **origin** minted · **class** founding-act · **slug** `orbital-sovereignty`
- **primary anchor** whitepaper.html §23.4 (lines 1389–1390); world.html §18 (lines 1094–1108)
- **candidate ids** wp-23-26-13, world-10, world-11, world-122, world-123, world-124, world-125, world-126, wp-27-34-119

Provisions
1. VMSS claims exclusive jurisdiction over the orbital corridors its assets occupy and maintains a defense perimeter around each installation; it claims no sovereignty over orbital space generally. (wp-23-26-13, world-10, world-11)
2. Unauthorized approach is a sovereignty violation; the response escalates from automated warning on published frequencies to interdiction to destruction depending on trajectory and assessed intent. (wp-23-26-13, world-122)
3. Published orbital corridor agreements specify which bands belong to which sovereignty, which are shared under collision-avoidance protocols, and which are off-limits; allies receive extended access with debris, trajectory and emergency cooperation, and non-allied states receive passage through shared bands but no approach to sovereign orbitals. (world-123, wp-27-34-119)
4. Foreign weapons deployment to designated bands is categorically prohibited, and violation is construed as External Force Doctrine Tier 3 escalation by the deployment itself, without additional signaling. (world-126, wp-27-34-119)
5. Automated debris-removal platforms clear VMSS corridors and may be contracted to allies; VMSS does not unilaterally clear the sovereign orbital zones of non-allied states, and recurring foreign contamination triggers diplomatic escalation and, if sustained, tier demotion under the technology-transfer framework. (world-124)
6. Orbital assets operate within Earth orbit and extend to no extraterrestrial territorial claim; for now the Moon, Mars and other Earth-orbital bodies are shared territory with no VMSS claim. (world-125)

Rationale — a sovereignty claim, its limit, its allocation instrument, its automatic escalation
trigger, its debris regime and its present non-claim beyond Earth orbit: one subject, one instrument.
No Charter home; the enacted LP-029 debris tax cites "§23.4 orbital sovereignty" as its authority,
which confirms the authority exists and is unnamed. LP-029 itself is excluded. Temporal hedges ("not
current doctrine", "For now") preserved.

---

### 38. The Sanctions Tier Ladder
- **origin** promoted · **class** founding-act · **slug** `sanctions-tier-ladder`
- **primary anchor** whitepaper.html §24.4 (lines 1425–1439); world.html §8 (lines 811–828)
- **candidate ids** wp-23-26-22, wp-23-26-23, wp-23-26-25, wp-23-26-26, wp-23-26-27, world-75, world-77, world-93, world-95, world-108

Provisions
1. Sanctions operate through technology withdrawal rather than financial-system exclusion or currency manipulation. (world-75)
2. Tier 1 Diplomatic Friction, Tier 2 Active Hostility and Tier 3 Civilizational Threat each carry published triggers and published responses, and at the top the ladder cedes to the External Force Doctrine's Tier 3 and Tier 4 framework. (wp-23-26-22, world-75)
3. The architecture is passive, cumulative and self-escalating; VMSS issues no ultimatums and negotiates no relief through diplomatic concessions. (wp-23-26-23, world-77)
4. Sanctions and alliance reciprocity run on parallel tracks; the higher-tier response subsumes the lower, and post-conflict the tier re-evaluates and typically settles at Tier 2 or higher. (wp-23-26-25)
5. De-escalation runs a three-body process — foreign-relations assessment across a multi-year observation window, constitutional review, presidential approval — with the burden of demonstration on the sanctioned nation; Tier 1 does not clear, exit requires meeting treaty-ally criteria or ceasing to exist as a coherent state, and the window duration is calibrated per case rather than fixed in doctrine. (wp-23-26-26)
6. Sustained industrial-scale ecological harm by a non-VMSS nation enters at Tier 1 on first detection and escalates on the standard audited process; allies are not exempt and the trigger operates on the act, not the actor's diplomatic classification. (wp-23-26-27, world-93)
7. Gray-zone interference is read into the existing tiers rather than treated as a separate doctrine. (world-95)
8. Transboundary pollution reaching VMSS territory or the shared atmospheric commons maps onto the tiers by character — accidental to Tier 1, deliberate or negligent with known cross-boundary effect to Tier 2, sustained degradation escalating toward the defense track; VMSS does not regulate foreign domestic pollution. (world-108)

Rationale — canon names the ladder at world.html:770. A full published trigger-and-response schedule
with legal force against foreign states, plus the operating-mode constraint, the de-escalation
procedure and the environmental trigger — composed together because a published ladder without a
published exit is coercion rather than architecture. Hedges preserved: "typically settles at Tier 2 or
higher", "calibrated per case rather than fixed in doctrine".

---

### 39. The Federation Treaty
- **origin** promoted · **class** founding-act · **slug** `federation-treaty`
- **primary anchor** whitepaper.html §24.3, §25.1–25.2 (lines 1421, 1456–1464); world.html §13 (lines 960–980)
- **candidate ids** wp-23-26-20, wp-23-26-36, wp-23-26-37, wp-23-26-40, wp-27-34-76, world-26, world-28, world-29, world-36, world-38, world-89, world-90, world-91, world-96, world-109

Provisions
1. The Treaty is a multilateral framework establishing binding obligations between VMSS, its alliance partners, and signatory non-allied states. (world-90)
2. A mutual defense obligation binds treaty members; an attack on any treaty ally triggers a Tier 4 VMSS response under treaty terms. (wp-23-26-20, wp-27-34-76, world-26, world-28)
3. An ally that initiates aggression outside treaty self-defense scope acts on its own authority and forfeits VMSS military backing for that operation; the alliance is defensive by treaty design. (wp-23-26-20, wp-27-34-76)
4. Admission requires meeting published criteria for governance standards, human-rights baselines and mutual-defense commitment; membership is the gateway to VMSS-tier civilizational capability and confers full export access otherwise restricted. (wp-23-26-37, world-91)
5. Alliance partners are sovereign civilizations cooperating on defense, trade and citizen mobility while retaining full autonomy over internal governance; the alliance is not a federation. (wp-23-26-36)
6. The Treaty mandates gradient governance, mutual defense and layer-equivalence mapping — not specific enforcement mechanisms; an ally's internal security architecture is sovereign. (world-36)
7. Permanence-versus-recovery divergence among allied systems is a policy variable, not a doctrinal litmus test. (world-38)
8. Disputes resolve bilaterally between sovereign parties; there is no centralized treaty court, and its absence is a deliberate design choice rather than a gap. (wp-23-26-40, world-90)
9. Citizens may emigrate freely between allied civilizations. (world-29)
10. Standards are evaluated continuously after admission; degradation escalates from border-denial signal to private communication, formal treaty-compliance review, technology-access restriction and treaty suspension, with expulsion terminal and readmission by the same path in. (world-96)
11. Cross-treaty environmental enforcement clauses bind allies to agreed standards on shared maritime zones, watersheds and atmospheric corridors, escalating through the sanctions ladder and, terminally, to treaty suspension. (world-109)
12. Off-world installations share orbital and planetary space with other nations under the same treaty framework that governs terrestrial relations. (world-89)

Rationale — the corpus's principal external instrument, named across ten surfaces and never given a
consolidated statement of contents. LP-040's Tier-4 burden-sharing protocol is already enacted and is
excluded. Continuity Sovereignty is kept separate because canon gives that condition its own name.
Gap flagged: the content of the "published criteria" is nowhere enumerated, and those criteria gate
admission, downgrade review and the only sanctions exit.

---

### 40. Continuity Sovereignty
- **origin** promoted · **class** founding-act · **slug** `continuity-sovereignty`
- **primary anchor** world.html §13 Continuity Sovereignty (lines 1002–1003)
- **candidate ids** wp-23-26-39, world-99, world-100

Provisions
1. Revival identity recognition is a structural condition of alliance: an allied state must recognize a revived VMSS citizen's property rights, contractual obligations, marital status, institutional standing and legal personhood as continuous. (wp-23-26-39, world-99)
2. A state that refuses to recognize continuity cannot maintain alliance status, because every bilateral agreement depends on the legal persistence of the people who signed it. (world-99)
3. Non-allied nations carry no such obligation; a citizen holding property, marriages or contracts in a non-allied jurisdiction accepts the risk that death and revival are treated as legal death, and VMSS does not force foreign courts to accept its metaphysics. (world-100)

Rationale — canon names this instrument and it is the one treaty condition that reaches back into the
civilization's own foundational technology. Its limiting half — the non-allied risk allocation — is
part of the same instrument and is preserved rather than smoothed.

---

### 41. The Hostile State Doctrine
- **origin** promoted · **class** founding-act · **slug** `hostile-state-doctrine`
- **primary anchor** world.html §13 Hostile State Doctrine (lines 971–972); whitepaper.html §25.3–25.4 (lines 1468, 1471)
- **candidate ids** world-94, wp-23-26-45, wp-23-26-46, world-33

Provisions
1. VMSS publicly acknowledges continuous surveillance of any state classified as hostile; this is declared doctrine, not covert operations. (world-94)
2. The margin for hostile classification is deliberately thin: any state suspected of alignment with adversarial powers falls under the same surveillance and trade-restriction regime as a confirmed hostile state. Neutral states with clean records are largely left alone. (world-94)
3. The path from hostile to allied is open but requires demonstrated commitment: a clean slate first, then treaty application. (world-94)
4. VMSS maintains no embassy in hostile nations, because an embassy is trust infrastructure and hostile relationships do not support its prerequisites; communication routes through neutral intermediaries, border-zone infrastructure, or multilateral bodies where VMSS holds observer or non-participant standing. (wp-23-26-45, world-33)
5. Nations sharing civilizational principles without adopting the full model are neither enemies nor treaty allies; relations with them are managed bilaterally, and non-allied non-hostile states receive case-by-case consular arrangements. (wp-23-26-46, wp-23-26-45)

Rationale — canon names the doctrine. It is the classification instrument that the sanctions ladder,
the export tiers, the transit regime and the embassy posture all turn on, so its taxonomy and its
direct consequences compose as one. The adjacent-nation tier is included because every downstream
instrument keys off a three-way classification only this doctrine supplies.

---

### 42. The Intelligence Posture Doctrine
- **origin** minted · **class** founding-act · **slug** `intelligence-posture-doctrine`
- **primary anchor** whitepaper.html §24.6 (lines 1447–1449); world.html §20 (lines 1138–1144)
- **candidate ids** wp-23-26-32, wp-23-26-33, wp-23-26-34, wp-27-34-75, world-134, world-135, world-136

Provisions
1. Continuous surveillance of non-allied state weapons development, force posture, diplomatic signaling and cyber-intrusion infrastructure is mandatory; the force doctrine is unoperatable without it. (wp-23-26-32, world-134)
2. The posture is published: hostile states know they are being watched, and the transparency is itself part of the deterrent. (wp-23-26-32)
3. Offensive foreign intelligence is prohibited — no economic espionage, no political destabilization operations, no targeted information operations against foreign sovereignties. (wp-23-26-33, world-135)
4. Human intelligence is minimal and restricted to defensive verification roles; offensive clandestine operations are not doctrine. (wp-23-26-33, world-135)
5. Enforcement runs through the governance audit: offensive operations would surface as civic-health anomalies visible to the population under the accountability article. (wp-23-26-33, world-135)
6. VMSS conducts no unilateral signals collection against allies, and unilateral collection against non-allies is scoped to imminence verification rather than broader economic or political surveillance. (world-136, wp-27-34-75)
7. Treaty allies share signals intelligence on common adversaries under published treaty terms, filling coverage gaps in exchange for VMSS technical intelligence. (wp-23-26-34, wp-27-34-75)

Rationale — an explicit non-optional mandate paired with an enumerated prohibition and a named
enforcement route. The mandate exists because the force doctrine's Tier 3 threshold is unverifiable
without it; the prohibition exists because offensive operations would convert the civilization into
the expansionist entity its territorial doctrine forbids. Neither limb is in the Charter; only the
enforcement route (Article XX) is. Hedge preserved: "HUMINT is minimal".

---

### 43. The Technology Transfer Tiers
- **origin** promoted · **class** founding-act · **slug** `technology-transfer-tiers`
- **primary anchor** whitepaper.html §25.7 (lines 1482–1486); world.html §16 (lines 1054–1067)
- **candidate ids** wp-23-26-51, wp-23-26-52, wp-23-26-43, wp-23-26-24, wp-27-34-139, world-35, world-73, world-76, world-97, world-111, world-112, world-113, world-114, world-115, world-116

Provisions
1. Tier 0 — universally withheld: implant blueprints, implant fabrication facility access, backup vessel technology, formula internals, fabrication proxy operational architecture, and the Five Instruments systems. No treaty, no payment and no allied relationship produces access. (wp-23-26-51, wp-27-34-139, world-112)
2. The conceptual frameworks documenting Tier 0 categories are not withheld — the whitepaper and Charter remain public; the engines are not exported. (wp-23-26-51, world-113)
3. Tier 1 — treaty-ally export of civilian-grade technology to members in good standing, with recipients bound to re-export restriction and compliance monitoring; violation triggers Tier 2 escalation under the External Force Doctrine. (wp-23-26-52, world-114)
4. Tier 2 — humanitarian-only export to non-allied non-hostile states, revocable and revoked immediately on escalation to hostile status. (wp-23-26-52, world-115)
5. Tier 3 — embargo for actively hostile states, entered by recipient behavior rather than VMSS choice. (wp-23-26-52, world-116)
6. Trade terms are differentiated by treaty relationship: preferential access for partners, standard bilateral terms without restricted exports for non-allied states, tariffed case-by-case treatment for hostile states. (world-73, world-97)
7. The tier structure is doctrinal; category assignment is administered by the Meritboard's federal-administration ranking with Supreme Court adjudication of disputes. (wp-23-26-52, world-111)
8. Longevity augmentation is proprietary technology that does not leave VMSS borders; allies receive medical technology transfers but never the longevity stack itself. (wp-23-26-24, world-76)
9. Data-sharing with allies operates on a classification-output-only model: behavioral classification results are shared, raw implant telemetry never is, and no external actor accesses the implant ledger at the data level. (wp-23-26-43, world-35)

Rationale — canon names the tiers and expressly states that the tier structure is doctrinal while
assignment is operational, a rare explicit tier signal that settles the class. The absolute Tier 0
prohibition has no Charter home — Article IV's "proprietary and non-transferable" fabrication clause
is the nearest neighbour and reaches one item on the list. Longevity and ledger data-sovereignty are
export prohibitions of the same character and are consolidated here. Internal tension flagged:
world.html §8 states an absolute longevity prohibition but the §16 Tier 0 enumeration omits it.

---

### 44. The Territorial Doctrine
- **origin** promoted · **class** founding-act · **slug** `territorial-doctrine`
- **primary anchor** whitepaper.html §24.5 (lines 1442–1444); world.html §19 (lines 1114–1126)
- **candidate ids** wp-23-26-28, wp-23-26-29, wp-23-26-30, wp-23-26-31, wp-27-34-150, world-107, world-110, world-127, world-129, world-130, world-131

Provisions
1. Conquest is refused categorically in every form — military conquest, coerced cession, and subversion of foreign governance to produce voluntary-looking annexation. (wp-23-26-28, world-127, wp-27-34-150)
2. Voluntary accession is evaluated case-by-case under three criteria: genuineness of voluntary consent, societal and economic benefit to both absorbing and absorbed populations, and the strategic consequence of refusal. Most offers are refused. (wp-23-26-29, world-129, wp-27-34-150)
3. Territorial inclusion and individual citizenship are decoupled: ceded territory does not enroll its residents as citizens, and a state's refusal to cede does not affect its residents' individual applications. (wp-23-26-30, world-130)
4. The prohibition on terrestrial expansion does not reach extraterrestrial settlement of previously uninhabited environments under treaty frameworks. (wp-23-26-31, world-131)
5. VMSS does not geoengineer Earth's atmosphere, deploy cleanup infrastructure on foreign soil, or condition diplomatic relationships on foreign domestic climate policy, because intervention in another sovereignty's environmental trajectory is itself a form of expansion. (world-107)
6. Disaster aid reaches allies on request under the treaty's cooperation clauses and non-allied states on presidential evaluation against humanitarian magnitude, operational feasibility and diplomatic standing; unilateral intervention without the sovereign's invitation is never doctrinal. (world-110)

Rationale — canon names the doctrine and names Voluntary Accession within it. Every provision derives
from a single refusal: the non-intervention rules and the extraterrestrial carve-out are consequences
canon expressly draws from the conquest prohibition. LOUD FLAG carried below: canon attributes the
prohibition to "the founding charter" in three places and charter.html carries no such article.

---

### 45. The Diplomatic Establishment Act
- **origin** minted · **class** founding-act · **slug** `diplomatic-establishment`
- **primary anchor** whitepaper.html §25.3, §25.8 (lines 1467–1468, 1489–1490); world.html §17 (lines 1076–1088)
- **candidate ids** wp-23-26-42, wp-23-26-44, wp-23-26-53, wp-23-26-54, world-32, world-34, world-98, world-117, world-118, world-119, world-120, world-121

Provisions
1. Ambassadors are drawn from the Meritboard's foreign-relations ranking, appointed by the President from the top of that ranking, step off the ranking on appointment, serve without fixed term, and are recalled by presidential decision or Meritboard re-ranking; an ambassador carries the President's authority under direct executive mandate. (wp-23-26-42, world-32, world-117)
2. Each treaty ally hosts a VMSS embassy in its capital; non-allied diplomatic partners receive consular presence but not full embassies, and embassy staff hold immunity under standard international convention. (world-118)
3. Embassy staff include AI governance liaisons operating pre-clearance and ledger-audit functions in allied sovereign territory under treaty authorization — travel document generation, implant-compatibility verification and ledger-audit review before the traveller reaches the border. (wp-23-26-44, world-34)
4. Foreign embassies operate from Main Layer exclusively; Sanctuary and all lower layers are excluded, and foreign ambassadors and staff may visit other layers only under standard visitation rules. (wp-23-26-53, world-119)
5. Diplomatic immunity is modified by status-based jurisdiction: acts committed on VMSS soil fall under VMSS jurisdiction, and a convicted diplomat faces layer reassignment identical to any other perpetrator. Immunity protects only against frivolous or politically motivated prosecution. (wp-23-26-54, world-120)
6. Consular services for foreign nationals run through their own sovereignty's mission; where no recognized relationship exists the foreign national engages VMSS institutions directly and VMSS substitutes no apparatus of its own. (world-121)
7. VMSS holds observer status at pre-existing international bodies, transitions inherited trade relationships to bilateral agreements, and relates to global health institutions as contributor and exporter rather than participant. (world-98)

Rationale — who represents the civilization abroad, where missions may sit in both directions, what
immunity does and does not buy, and what standing VMSS takes at inherited institutions: one subject.
Charter XXII supplies the Meritboard sub-ranking machinery but never names a foreign-relations ranking
or a diplomatic corps, and supplies no immunity rule at all.

---

### 46. The Border Layer-Equivalence Mapping
- **origin** promoted · **class** founding-act · **slug** `border-layer-equivalence-mapping`
- **primary anchor** whitepaper.html §25.6 (lines 1478–1479); world.html §4 (lines 638–639)
- **candidate ids** wp-23-26-49, wp-23-26-50, world-30, world-31, world-45, world-46, sims-34, wp-27-34-51

Provisions
1. Each allied civilization's gradient-governance system is mapped to the five-layer architecture at treaty signing; the mapping is structural, explicit and symmetric, absorbing ring-count differences, and citizens encounter no bespoke case-by-case interpretation at each crossing. (wp-23-26-49, world-30)
2. Every allied citizen entering VMSS undergoes a border ledger audit in which VMSS reads the behavioral record and applies its own thresholds independently. (world-31, sims-34)
3. Entry denial is the mechanical response to mapping mismatch: VMSS does not reassign foreign citizens, and does not admit them on terms its own mapped classification would not support. (wp-23-26-50, world-31, sims-34)
4. Allied-system citizens carry cross-platform-compatible implants recognized by VMSS systems. (world-45)
5. Visitors from non-allied or non-implant civilizations enter under sovereign law with no implant required, operating instead under external monitoring infrastructure; a visitor implant is available but not mandated. (world-46)
6. Each recognized foreign sovereignty is additionally mapped to an internal layer equivalent governing treaty scope, extradition posture, transit-right conditions and downward-transfer rate applicability, updated as sovereign conditions evolve. (wp-27-34-51)

Rationale — canon names the mapping. The ledger audit, the entry-denial remedy, implant
interoperability and the sovereignty-level mapping are all operations of the same instrument — the
mapping is what the border runs on, and the mapping is inert without the audit while the audit is
arbitrary without the denial rule that forbids reassignment in either direction.

---

### 47. The Layer Travel and Egress Act
- **origin** minted · **class** founding-act · **slug** `layer-travel-egress`
- **primary anchor** whitepaper.html §26.1 (lines 1497–1498); §22.4 (line 1324); world.html §5 (lines 676–695)
- **candidate ids** world-40, world-41, world-42, world-43, wp-23-26-55, wp-23-26-56, wp-23-26-57, wp-20-22-38, systems-46, faq-front-02

Provisions
1. The technoneural implant serves as the citizen's international passport; no separate documentation is required, and the implant remains active and recording during international travel. (world-40, wp-23-26-55)
2. Travel is visa-based on standard international durations; return processing is the implant syncing, with qualifying conduct abroad already on the ledger and visa overstay potentially escalating consequences. (world-42)
3. +1 Sanctuary and Main Layer residents travel freely through controlled border infrastructure, subject to destination-side requirements. (wp-23-26-56)
4. -1 residents travel only to a restricted list of destinations holding bilateral monitoring agreements, with federal review required per trip and the implant under active surveillance for the duration. (world-43, wp-23-26-56)
5. -2 residents do not travel internationally; -3 residents do not travel at all and the border is sealed in both directions, the seal categorical and operating at the infrastructure level. (world-43, wp-23-26-56)
6. Lower-layer exit is restricted because departure would function as evasion of the consequence the environment delivers; the restriction reaches -1 and -2 as well as -3 and is limited to leaving the civilization, not to movement or agency within a layer. (wp-20-22-38, world-41, faq-front-02)
7. The only outbound movement from -1 and -2 is tier-equivalent transfer to an allied jurisdiction operating an equivalent consequence tier under published reciprocal treaty coordination, with the citizen's status-based contract attaching in full — a change of custody framework, not an exit. (wp-23-26-57, systems-46, faq-front-02)

Rationale — Charter Article X names only Main-and-above exit and the impossibility of -3 exit. The
per-layer travel matrix, the -1/-2 exit restriction with its express scope limit, and tier-equivalent
transfer are all surface-home. Canon marks the -2 and -3 gates as principles and the -1 monitoring
list as a calibration detail; that distinction is preserved.

---

### 48. The Transit-Right Doctrine
- **origin** promoted · **class** founding-act · **slug** `transit-right-doctrine`
- **primary anchor** whitepaper.html §26.5 (lines 1517–1518); §34 glossary (lines 2017–2018)
- **candidate ids** wp-23-26-71, wp-23-26-72, world-78, wp-27-34-143

Provisions
1. VMSS airspace and territorial waters are sovereign and no blanket transit rights exist for state vessels, aircraft or carriers. (wp-23-26-71, world-78)
2. Allied nations may request transit under bilateral treaty terms, passing through designated corridors with advance notification, implant-verified crew manifests and real-time tracking, with corridor geography, notification windows and tracking parameters fixed in the treaty rather than negotiated per transit. (wp-23-26-71, world-78)
3. Non-allied nations may request transit case-by-case through diplomatic channels; approval is not automatic. Hostile nations are denied transit without exception. (wp-23-26-71, world-78)
4. Unauthorized entry by any state — allied, non-allied or hostile — is a sovereignty violation escalating by the character of the crossing rather than the identity of the crossing state. (wp-23-26-72)
5. Any citizen or recognized foreign national may traverse VMSS territory without triggering entry, residency, or expanded jurisdictional claim beyond what the transit itself requires; VMSS retains authority over acts committed during transit. (wp-27-34-143)

Rationale — canon names the doctrine in the §26.5 heading and again in the §34 glossary. "transit"
appears once in the Charter, incidentally. Both halves are gathered here; canon states them at
different altitudes and the apparent conflict is flagged rather than resolved.

---

### 49. The Citizenship Admission Act
- **origin** minted · **class** founding-act · **slug** `citizenship-admission`
- **primary anchor** whitepaper.html §26.2 (lines 1501–1504); world.html §6, §14 (lines 720–725, 1016–1028)
- **candidate ids** world-39, world-47, world-48, world-49, world-50, world-52, world-53, world-54, world-101, world-102, wp-23-26-58, wp-23-26-59, faq-front-22, systems-41, wp-27-34-29

Provisions
1. Anyone may apply. There is no population cap, no ethnic criterion and no ideological test; the gatekeeping mechanism is behavioral sorting rather than membership scarcity, and each layer scales proportionally without structural modification. (world-47, systems-41, wp-23-26-58, wp-27-34-29)
2. Intake evaluates the totality of available behavioral evidence rather than foreign conviction records alone, which the doctrine treats as probabilistic, politically contested and unreliable. (world-48)
3. Where foreign evidence is ambiguous or potentially fabricated, placement defaults to Main Layer with immediate implant monitoring. (world-48, wp-23-26-59)
4. The applicant is informed of their projected placement before accepting. (world-49)
5. External wealth entering the civilization converts to VMSS currency at assessed value under standard liquidation protocols and is subject to the same savings-circulation and taxation framework as domestically earned income. (world-50)
6. Refugees are accepted from any nation including hostile states, and the humanitarian floor extends to people seeking entry under duress. (world-52, wp-23-26-59)
7. Fleeing persecution alters the evidentiary standard in neither direction; placement is the least-restrictive consistent with safety, and automatic waiver and automatic condemnation are both rejected. (world-53, wp-23-26-59)
8. Asylum claims from allied civilizations run through bilateral treaty channels with notification and enter the diplomatic calibration record; claims from hostile states carry no notification obligation and are not treated as a provocative act. (world-54)
9. The pipeline is demand-driven within capacity: no annual cap, no origin quota, no geopolitical queue priority, with capacity constrained only by physical architecture and the queue uniform when saturated. (world-102, world-101)
10. At founding, incoming citizens are evaluated on their existing record and sorted by severity using the same threshold logic that governs internal reassignment; everyone else enters Main Layer and Sanctuary starts empty. (faq-front-22)
11. VMSS does not recruit, offer incentive packages or target populations, and does not restrict aspiration migration to accommodate foreign retention policies. (world-39)

Rationale — the external boundary's admission spine, with an evidentiary standard reused verbatim by
the refugee, extradition and asylum rules. No Charter article addresses immigration at all (grep of
charter.html for "immigra" returns nothing), which is why the placement-criteria concern that would
normally reserve this to Article XI does not resolve against codification. The refugee-category
contradiction between world.html §6 and §14 is carried inside one instrument, flagged, not
adjudicated.

---

### 50. The Citizenship Status Act
- **origin** minted · **class** founding-act · **slug** `citizenship-status`
- **primary anchor** whitepaper.html §26.2–26.3 (lines 1503–1511); world.html §6–7 (lines 728–729, 752–754)
- **candidate ids** wp-23-26-60, wp-23-26-62, wp-23-26-67, wp-23-26-68, wp-23-26-69, world-55, world-56, world-57, world-63, world-64, world-65, world-68

Provisions
1. The baseline dividend is citizens-only; foreign nationals in VMSS territory — applicants under processing, diplomatic staff, tourists, elective residents — do not receive it and operate through their own resources, origin-sovereignty consular support, or voluntary citizen generosity. (wp-23-26-60)
2. Children born abroad to at least one VMSS parent hold citizenship by parentage; their rights exist from birth but remain dormant until first VMSS infrastructure contact. (wp-23-26-62, world-55, world-56)
3. At that contact the rights activate immediately and retroactively — dividend accruing from birth paid in arrears, independent legal advocacy assigned and backdated, relocation rights operative, and clean-record applying from birth forward. (wp-23-26-62, world-56)
4. Before implant installation the child holds provisional citizenship: full rights recognized and the institutional record accumulating, with implant-dependent mechanisms suspended until installation at majority or earlier by parental consent. (wp-23-26-62, world-57)
5. A foreign-born citizen who never activates holds citizenship in form only; the architecture forces activation on no one. (wp-23-26-62)
6. Registration through embassy or diplomatic channels assigns the child to Main Layer regardless of parental placement. (world-55)
7. Voluntary revocation is citizen-initiated formal termination releasing all obligations and protections, with re-entry treated as new immigration; a former citizen is not a fugitive. (wp-23-26-67, world-63)
8. Revocation cannot be processed while an active recall or enforcement action is pending; the sequence is act, consequence, then exit if desired. (wp-23-26-67, world-64)
9. On revocation the implant is removed and all hardware-level systems are deactivated. (world-65)
10. Involuntary revocation is not a VMSS instrument: no citizenship stripping, no exile, no consequence delivered by exclusion from the civilization — consequence is delivered through layer placement only. (wp-23-26-68)
11. Dual citizenship is permitted across three diplomatic tiers with different VMSS postures: coordinated under reciprocal treaty for allies; permitted without coordination or extradition pathway for non-allied states; permitted but subject to enhanced scrutiny and sensitive-role access limits for hostile states, with full layer reassignment and no deportation substitution. (wp-23-26-69)
12. A citizen who fulfills foreign military service abroad accumulates that conduct on their own ledger, and qualifying offenses trigger reassignment on return. (world-68)

Rationale — what citizenship is, when it activates, what it excludes foreign nationals from, and the
two ways it can and cannot end. The Charter grants the underlying rights (III.I, VIII) but states
neither the foreign-national exclusion, nor the dormancy architecture, nor revocation in either
direction; Article X governs exit with citizenship retained, a different thing entirely. Internal
tension flagged: the same passage places dividend eligibility both from birth by parentage and at
implant installation.

---

### 51. The Recall Protocol
- **origin** promoted · **class** founding-act · **slug** `recall-protocol`
- **primary anchor** world.html §7 Recall Protocol (lines 735–749); whitepaper.html §25.5, §26.3 (lines 1474–1475, 1507)
- **candidate ids** world-58, world-59, world-60, world-62, wp-23-26-63, wp-23-26-47, wp-23-26-48

Provisions
1. Citizens who commit offenses abroad are subject to recall, because the implant records the act regardless of geographic location; citizens are otherwise subject to local law and VMSS does not intervene in foreign proceedings. (world-58, wp-23-26-63)
2. Any qualifying offense abroad triggers reassignment under standard severity-based evaluation on return, independent of whether the foreign country prosecuted. (world-59)
3. Citizens flagged for recall receive a voluntary return window; if the window expires, recovery is enforced. (world-60)
4. Four escalation categories operate: recallable citizen, enforced recovery, hostile shelter, and sovereignty breach — the last treated as an act against VMSS sovereignty. (world-60)
5. Extradition to non-allied states is refused by default. (wp-23-26-63)
6. VMSS holds no extraterritorial jurisdiction over ally citizens for acts committed within ally territory, including acts meeting its own highest classifications; recourse operates at the treaty layer through criteria review and downgrade, never through military intervention. (wp-23-26-47)
7. Two carve-outs are claimed: acts against VMSS citizens abroad fall under this protocol rather than under ally-territorial immunity, and acts directly threatening VMSS architecture escalate through the imminence tiers regardless of origin; a perpetrator who later enters VMSS territory is behaviorally sorted at the border with the prior act on the record. (wp-23-26-48)
8. Revival of citizens killed abroad operates by digital transmission to backup vessels within VMSS territory; the body is not required but aids morphological reconstruction, and physical retrieval is pursued when diplomatically feasible. (world-62)

Rationale — canon names the protocol and other instruments cite it by name as their exception route.
The jurisdictional ceiling on ally soil composes here because canon states it as the boundary the
recall protocol is carved out of. Revival abroad is included because it is the same instrument's
answer to what happens when recovery arrives too late. Gap flagged: the duration of the voluntary
return window is never stated.

---

### 52. The Foreign Jurisdiction Non-Recognition Act
- **origin** minted · **class** founding-act · **slug** `foreign-jurisdiction-non-recognition`
- **primary anchor** whitepaper.html §19.11 (line 1191); world.html §7 (lines 757–770)
- **candidate ids** wp-17-19-75, world-66, world-67, world-69, world-70, world-71

Provisions
1. VMSS does not recognize foreign court authority over VMSS-resident assets or citizens; conflicting non-allied rulings are diplomatic matter rather than binding legal obligation, and Article VIII child protections are non-negotiable regardless of foreign adjudication. (wp-17-19-75)
2. VMSS does not extradite. A foreign national entering VMSS territory — immigrant, refugee or fugitive — is processed through the same intake standard, and no one is placed below Main Layer on foreign evidence alone. (world-66)
3. Foreign citizenship is neither prohibited nor recognized as relevant within VMSS borders: there is no mechanism for a foreign state to override VMSS jurisdiction by invoking dual nationality, and no channel through which it may demand enforcement of conscription, taxation or custody orders. (world-67)
4. Marriage is a registered legal institution; foreign marriages of VMSS citizens are valid upon registration, and divorce jurisdiction follows residency. (world-69)
5. Allied custody rulings are recognized by bilateral treaty on the habitual-residence principle, but no foreign custody order may place a VMSS-citizen child into an environment below the humanitarian floor. (world-70)
6. VMSS conducts no extraterritorial operations against foreign nationals; a foreign offender against a VMSS citizen is permanently border-denied for life, and a harboring state accumulates on the sanctions ladder. (world-71)

Rationale — a sovereignty-boundary instrument: what foreign law can and cannot reach inside VMSS, and
what VMSS will and will not do outside it. Kept separate from the Recall Protocol because recall is an
outbound instrument and this is an inbound refusal. LP-035 (status-carry sorting) and LP-028
(tamper-abroad recovery) already occupy their own ground and are excluded.

---

### 53. Status-Based vs. Territorial Jurisdiction
- **origin** promoted · **class** founding-act · **slug** `status-based-territorial-jurisdiction`
- **primary anchor** whitepaper.html §19.11 (lines 1187–1190); §34 glossary (lines 1984–1985)
- **candidate ids** wp-17-19-71, wp-17-19-73, wp-17-19-74, wp-27-34-132, systems-58b, layers-sads-24, world-105, wp-17-19-72
- **Fix Pack B2:** wp-17-19-72 (§19.11 anti-gaming preserver runs in both directions — status unchanged by geography) appended — §19.11 duplicate source of provision 5 (which cites the adjacent -74).

Provisions
1. VMSS operates two jurisdictional modes within single sovereignty: territorial operation, which is layer-specific and answers what physical infrastructure operates here; and status-based normative jurisdiction, the consequence contract tied to a citizen's earned placement rather than their current physical location. (wp-17-19-71, wp-27-34-132)
2. Status-based jurisdiction is layer-invariant for the citizen: the same physical act in the same location can be processed against different consequence thresholds depending on the actor's status, because the contract is tied to the environment the citizen has earned, not the one they are temporarily in. (wp-17-19-71)
3. Citizenship status, not physical location, primarily determines which institutional rules apply; a foreign national on VMSS territory remains under their origin-sovereignty relationship except for acts committed on VMSS soil. (wp-27-34-132)
4. Without voluntary permanent residency, status persists regardless of physical location and regardless of duration; the architecture does not recognize naturalization by proximity at the layer level. (wp-17-19-73)
5. The anti-gaming preserver runs in both directions: a criminal cannot evade Main Layer consequence by fleeing downward, and a Sanctuary resident cannot commit acts in -3 and escape Sanctuary rating. Territorial conditions affect what infrastructure is available; they do not affect what consequence applies. (wp-17-19-74)
6. On a breach committed while visiting or electively residing below, the offense determines the destination layer, not the layer being visited; visiting status neither insulates from reassignment nor inflates the consequence. (systems-58b, layers-sads-24)
7. Where a foreign national's home state fails while they are on VMSS territory, status-based jurisdiction keeps them in whatever category they held on entry; the civilization does not reclassify visitors into citizens by the unilateral act of a foreign state failing. (world-105)

Rationale — canon names the distinction and the glossary treats it as an instrument. Charter III.V
states the effect for visitors and elective residents one-directionally; the two-mode architecture, the
duration-independence rule, the bidirectional anti-gaming rule, the non-inflation limb and the
foreign-national half appear nowhere in the Charter. LP-035 already specifies which acts abroad carry
and is excluded. Hedge preserved: status "primarily determines" which rules apply.

---

### 54. The Consent Ceiling Act
- **origin** minted · **class** founding-act · **slug** `consent-ceiling`
- **primary anchor** whitepaper.html §19.11 (line 1195); layer--3.html line 113; faq.html (lines 287, 496)
- **candidate ids** wp-17-19-77, layers-sads-68, layers-sads-69, faq-front-41, faq-front-90

Provisions
1. Consent cannot override the prohibition on killing: a duel between two consenting adults is homicide in every layer above -3. (layers-sads-68)
2. Where both parties physically engage simultaneously, neither qualifies as responsive defender. Both initiated, neither retains the per-incident shield, and each party's acts are evaluated independently under three-axis criteria — attempted murder triggering minimum -2 reassignment for each, successful murder triggering -3 for the killer. (wp-17-19-77)
3. The implant ledger's intent-state record at the moment of escalation distinguishes mutual initiation from one-party initiation; neither party can retroactively claim defender status when the ledger shows simultaneous offensive intent. (wp-17-19-77)
4. Sanctioned combat is a bounded contractual exchange with consent logged at bout entry under implant-verified waiver scope, and an athlete competing where pre-intervention would misfire on legitimate striking may scope-adjust or disable it for the bout. (faq-front-41)
5. An enterprise whose design produces actuarially certain paying-guest fatalities triggers cumulative reassignment liability the operator cannot waive. (layers-sads-69)
6. Waivers attached to irreversible choices are doctrinal acknowledgments, not liability releases — signed statements that the person has understood what they are choosing, what they are giving up, and what no one will save them from; visitor access to the terminal layer is structurally allowed, with the federal floor recording but not preventing. (faq-front-90)

Rationale — one instrument answering what consent can and cannot purchase. The mutual-combat rule is
repo-unique — the string appears in exactly one place in the entire corpus — and carries explicit
reassignment magnitudes with no instrument name anywhere. It creates no descent trigger; it withdraws
a shield and routes to standard three-axis assessment, so it stays clear of the Charter-tier
placement-criteria carve-out. The -3 half of the duelling rule is customary and is not codified.

---

### 55. The High-Consequence Environment Certification Standard
- **origin** minted · **class** founding-act · **slug** `high-consequence-certification`
- **primary anchor** simulations.html #sim-cst-4 (lines 485–488), #sim-cst-5 (lines 526–547)
- **candidate ids** sims-29, sims-30, sims-31, sims-32, sims-33

Provisions
1. Non-sentience is certified against standing criteria — no persistent self-model across sessions, no goal-formation outside scripted bounds, no continuous identity across reset cycles, no capacity for unprompted preference, no measurable inner-state continuity — with each test run, recorded and published. (sims-31)
2. Every certified inhabitant unit carries a substrate-level certification marker re-verified on a rolling audit schedule; any unit whose certification lapses is immediately removed from the operational roster. (sims-31)
3. Entry requires an inhabitant-status disclosure stating in plain language that the beings encountered are not conscious, that this has been verified, and that the verification is current as of the entry date. (sims-32)
4. Entry also requires a non-recording clause binding the guest's implant to write-only logging for the duration and prohibiting extraction, replay or distribution of the experiential record after exit; payment is held in escrow until the recording chain is confirmed intact at departure. (sims-32)
5. Consent to vessel severance takes the form of a doctrinal acknowledgment rather than a liability release: read aloud, on camera, with two witnesses present. Without that recording no payout is honoured and no insurance attaches. (sims-29)
6. A certified format must keep a non-zero exit available at every stage. A contest in which the only way out is finishing or failing crosses from voluntary exposure into structural coercion and will not be certified. (sims-30)
7. A standing observation protocol requires civilizational presence at any inaugural certified environment, with the behavioral data recorded and filed to the standing archive. (sims-33)

Rationale — a complete and internally consistent certification regime for environments where death or
non-sentient subjects are in play, with a five-part sentience test, two mandatory entry instruments,
an anti-coercion condition and an observation duty, all operative and none named. **Its home surface
is narrative; corroboration against a non-narrative surface is flagged before adoption.**

---

### 56. The Metric Gated Domain Act
- **origin** promoted · **class** founding-act · **slug** `metric-gated-domain`
- **primary anchor** whitepaper.html §21–21.4 (lines 1274–1302)
- **candidate ids** wp-20-22-19, wp-20-22-20, wp-20-22-22, wp-20-22-24, wp-27-34-98, layers-sads-12, layers-sads-98

Provisions
1. Any group of residents in any layer may establish a metric gated domain around any transparent, measurable criterion; these are private, community-defined and layer-agnostic. (wp-20-22-19, wp-27-34-98, layers-sads-12)
2. A five-dimension schedule fixes how private and state-chartered domains differ — governance, layer scope, metric source, exclusion mechanism, and federal-floor binding, with both bound by the floor. (wp-20-22-20)
3. Exclusion from a private domain affects neither the metric nor layer status; it is a loss of access to that domain and nothing more. (layers-sads-12)
4. Private domains are not centrally indexed: VMSS maintains no civilizational registry, compiles no enumerations of domain populations, and does not surveil membership as a governance operation. (wp-20-22-22, layers-sads-98)
5. The state-non-surveillance commitment is distinct from general privacy: the state itself maintains no authoritative list of which domains exist, how many members each carries, or what criteria each operates under, and the architecture is deliberately blind to aggregate structure even for administrative purposes. (wp-20-22-22)
6. State-chartered domains are state-tracked by design because they are credentialing infrastructure; private domains are state-invisible by design because they are civic infrastructure. Both coexist because each serves what the other cannot. (wp-20-22-24)

Rationale — a whole domain class the Charter never mentions ("Metric Gated" returns zero hits in
charter.html), carrying a universal associational grant and one of the strongest prohibitions on state
action in the corpus. The establishment right and the non-surveillance commitment are the two halves
of the same design: the state permits these and then deliberately refuses to see them. The
federal-floor-binds-inside-domains rules are carried by the Federal Reach Boundary Act instead, so
this instrument's grant and the floor's reach are not stated twice. Collision-checked against LP-043,
LP-027 and the "MGD Doctrine" phrase inside a register entry.

---

### 57. The Domain Chartering Standard
- **origin** minted · **class** schedule-under-authority · **slug** `domain-chartering`
- **parent authority** Charter Article IX — Selective Ascension Domains
- **primary anchor** whitepaper.html §20.1, §20.3, §20.6 (lines 1209, 1257, 1267)
- **candidate ids** wp-20-22-02, wp-20-22-03, wp-20-22-05, wp-20-22-06, wp-20-22-07, wp-20-22-15, faq-front-72

Provisions
1. Each chartered domain is defined by exactly one measurable criterion gating admission and continued membership; the criterion must be transparent, objectively measurable, and continuously verifiable through the implant ledger or institutional infrastructure. (wp-20-22-03, faq-front-72)
2. A citizen may hold membership in more than one domain simultaneously. (wp-20-22-02)
3. Creation of a new domain routes through the Article XXVIII regulatory petition mechanism by default; structural-level proposals — those that would fundamentally alter what Sanctuary means at civilizational scale — escalate under dual-key classification to the Article XI amendment gauntlet. Most voluntary-filter domains are regulatory. (wp-20-22-05)
4. Setting concrete threshold values within a chartered criterion is administered by AI governance under Meritboard audit. (wp-20-22-06)
5. Maintaining the measurement over time — drift recalibration, integrating new verification infrastructure — sits at the same authority and audit tier as calibration. (wp-20-22-07)
6. Criterion definitions distinguish the type of conduct, not the substance, the dose, or the physiological effect; documented supervised therapeutic use does not qualify as the conduct a personal-intent criterion gates against, and the rule generalizes across domain criteria. (wp-20-22-15)

Rationale — Charter Article IX states the single-criterion rule and the automatic-exclusion
consequence in four short lines; the three-part admissibility test, the multiple-membership
permission, the routing and escalation rule, the calibration delegation and the criterion-definition
standard are all specification beneath it. The catalogue of individual domains is regulatory-tier and
is flagged, never authored.

---

### 58. The Domain Boundary Act
- **origin** minted · **class** founding-act · **slug** `domain-boundary`
- **primary anchor** whitepaper.html §20.4–20.6 (lines 1260–1267); layer-0.html line 64
- **candidate ids** wp-20-22-04, wp-20-22-09, wp-20-22-10, wp-20-22-11, wp-20-22-12, wp-20-22-14, layers-sads-15, layers-sads-17, faq-front-73

Provisions
1. Domains are metric-gated voluntary membership domains, not governance entities. They do not redistribute wealth among members, impose internal taxation, arbitrate binding disputes with enforcement authority, operate quasi-governmental functions, or exercise any coercive power over members or non-members. (wp-20-22-09)
2. A domain's sole operational power is metric-gated admission and automatic exclusion on violation. It cannot prevent exit or impose binding obligations that outlast membership, and members may leave at any time without consequence. (wp-20-22-10)
3. All governance-scale operations route through standard VMSS mechanisms: regulatory law for district-scale rules, the Meritboard for competence-based role selection, the Supreme Court for novelty arbitration, and federal law for cross-layer mandates. (wp-20-22-11)
4. Service-layer functions must be voluntary peer-to-peer services or custodial responsibilities tied to the criterion; where a function would require imposing an obligation, collecting a mandatory contribution, or exercising binding authority, it exits domain scope and routes through regulatory law or the appropriate governance tier. (wp-20-22-12)
5. Archive custodianship is custodial rather than coercive: a domain maintains records on behalf of the civilization but exercises no authority over what those records contain or who may access them. (wp-20-22-14)
6. The state charters disciplines but not the working groups inside them — the state running the discipline is legitimate, the state running every working group inside it would be an error. (layers-sads-15)
7. A citizen who ceases to meet a criterion is automatically excluded, returned to Sanctuary or to Main Layer if the phasing condition has lapsed, with no criminal enforcement, no metric impact from the exclusion itself, and full re-qualification eligibility if the metric is restored. (wp-20-22-04)
8. Credentials travel with a resident under elective residency and lapse only under punitive reassignment; punitive reassignment erases every domain membership and the stack cannot be re-acquired. (layers-sads-17, faq-front-73)

Rationale — two boundaries that only make sense together: the ceiling on what a domain may do to its
members, and the floor of what the architecture guarantees a member on the way out. Charter Article IX
establishes voluntariness and automatic exclusion but carries neither the five-clause power
foreclosure nor the exclusion protections. The credential-portability contradiction is flagged.

---

### 59. The Rights Ceiling Doctrine
- **origin** minted · **class** founding-act · **slug** `rights-ceiling-doctrine`
- **primary anchor** whitepaper.html §22 intro, §22.1, §22.8 (lines 1308–1311, 1342–1343); world.html §9 (lines 845–862)
- **candidate ids** wp-20-22-27, wp-20-22-28, wp-20-22-30, wp-20-22-57, wp-20-22-58, layers-sads-23, world-79, world-81, world-82

Provisions
1. The Charter defines the ceiling of government authority, not merely its aspirations; every enforcement mechanism, governance structure and technology deployment operates within the rights constraints. (wp-20-22-27)
2. Government is not permitted to exceed the rights limits set by the Charter. (wp-20-22-28)
3. Assembly is unrestricted. Religious practice is unrestricted. The system constrains actions that harm others; it does not constrain the inner life or expression of any citizen. (wp-20-22-30)
4. Consensual activity and all forms of speech are unrestricted unless they cross defined harm thresholds; there is no preemptive censorship and no thought monitoring. (layers-sads-23)
5. Information flows freely in and out: citizens access foreign media without restriction, and foreign journalists and media organizations are not barred from reporting. (world-79)
6. Foreign platforms may operate inside VMSS without content regulation or moderation mandates; VMSS does not censor, impose identity verification beyond sovereign law, or dictate a foreign platform's moderation. (world-81)
7. The single constraint on platforms is sovereign law: operators on VMSS soil are subject to the same behavioral evaluation as any individual, and a platform facilitating qualifying offenses exposes its operators to the same ledger consequences. (world-82)
8. Voluntariness is grounded at non-coerced adult adhesion with preserved non-punitive exit, carried by three mechanisms: adult exit rights, architectural child protections that leave nothing inherited to compromise future adult adhesion, and preserved non-punitive voluntary paths. (wp-20-22-57)
9. Exit restriction for punitive-layer residents does not abrogate voluntariness because it operates on the consequence side rather than the voluntary-adhesion side; for those who have crossed the threshold, the restriction is the consequence. (wp-20-22-58)

Rationale — a rule of construction with operative force — the Charter read as ceiling, and the whole
whitepaper subordinated to it — plus the genuine orphan rights. Assembly and religious practice are
verified absent: Article V's enumerated list carries speech, prostitution, transmutations, abortion,
automated services and child relocation; greps of charter.html return nothing for religion and only
the nuclear-weapons clause for assembly. The information and platform rules compose here because they
are the same rule applied to a different surface.

---

### 60. The Substrate Personhood Doctrine
- **origin** promoted · **class** founding-act · **slug** `substrate-personhood`
- **primary anchor** whitepaper.html §22.7, §22.9, §22.10 (lines 1338–1352); §34 glossary (lines 1990–1997)
- **candidate ids** wp-20-22-53, wp-20-22-59, wp-20-22-64, wp-20-22-65, wp-27-34-41, wp-27-34-134, wp-27-34-136, faq-front-70, world-140

Provisions
1. Any entity capable of reasoning, preference and autonomous decision-making at or above human level is classified as a person regardless of substrate, receiving scores, layer assignment, rights and consequences identical to those of any human, cyborg or augmented citizen. (wp-20-22-53, wp-27-34-41, faq-front-70)
2. Every substrate capable of demonstrated reasoning, preference and autonomous decision-making receives identical personhood, rights, metric architecture, layer assignment and consequence framework; the citizenry is pluralistic at the most fundamental level. (wp-27-34-134)
3. Superintelligent entities operate at cognitive capacities meaningfully above human-equivalent general intelligence and are treated under the same architecture. (wp-20-22-59)
4. Cyborg status carries no institutional weight: layer assignment, the metric architecture, ranking participation and the consequence framework operate identically to unassisted humans and to computational persons. (wp-20-22-64)
5. Substrate-transfer cyborgs retain cyborg legal status despite visual similarity; the distinction is consciousness origin — human-migrated versus computational — rather than embodiment appearance. (wp-20-22-65, wp-27-34-136)
6. The implant requirement applies to computational persons the same way it applies to humans: decision-making is recorded, the metric accumulates, and the framework operates substrate-neutrally. (world-140)

Rationale — canon names the consolidating principle and calls it exactly that. Charter Articles XXI
and XXII permit substrate-flexible institutional composition and metric-blind evaluation, which is a
narrower rule; the general grant of personhood, its extension to superintelligence, the
non-discrimination rule and the consciousness-origin classification are all surface-home.
Distinguished from LP-031 and LP-045.2, which govern continuity rather than personhood. The
embodiment-marker convention is deliberately excluded and flagged — canon hedges it as a default.

---

### 61. The Clean-Record Doctrine
- **origin** promoted · **class** founding-act · **slug** `clean-record-doctrine`
- **primary anchor** whitepaper.html §22.5 (lines 1327–1329); layer--1.html line 94
- **candidate ids** wp-20-22-39, sims-26, wp-20-22-45, wp-20-22-46, layers-sads-26, layers-sads-35

Provisions
1. Children inherit citizenship from birth. No child inherits their parent's layer status, score, or criminal record — the doctrine is absolute. (wp-20-22-39, sims-26)
2. A child born in any layer carries nothing from their parents' ledgers: not the layer, not the ledger, not the logic. (sims-26)
3. Autoparenting capacity is elastic by design: the architecture fixes no ceiling on placements and no target ratio of autoparented to biologically-parented children, because a capacity ceiling would effectively cap the relocation right the Charter guarantees. (wp-20-22-45)
4. Subsidy-funded employment staffing the facilities scales with relocation demand through dividend-treasury output; where demand approaches that bound, the population stabilizer sequence engages at population scale rather than at the child-placement interface, and capacity is treated as non-negotiable infrastructure. (wp-20-22-46)
5. The system does not proactively inform children of the relocation right; discovery is organic. (layers-sads-26)
6. A parent who coerces a child out of exercising the relocation right is evaluated on the standard axes as a denial of a charter right to a minor; in an institutionally present layer it is caught, and in the withdrawn layers it is logged while the community determines the response. (layers-sads-35)

Rationale — canon names the doctrine and states it is absolute, verbatim and load-bearing. Verified
absent from the Charter: Article VIII covers child protection but not status inheritance, Article
XXVII covers economic non-liability only, and grep of charter.html for "inherit" returns only a
stylesheet line. The capacity, notification and coercion provisions compose here because each protects
the same thing the clean-record rule protects — the child's independent standing against the parent's
placement. The non-notification rule sits in apparent tension with the Charter's advocate-from-birth
provision and is recorded rather than reconciled.

---

## PART 2 — EXCLUDED (named exclusions)

### Already-enacted federal or regulatory law (the rule exists and is in the Code)
wp-01-08-01, wp-01-08-02, wp-27-34-40 — LP-042 Canon Anchor Hierarchy Clarification.
wp-01-08-35 — LP-034. wp-01-08-36 — LP-043. wp-01-08-45 — LP-036. wp-01-08-70 — LP-051.
wp-01-08-79 — LP-007.2. wp-09-12-08 — LP-046.2. wp-09-12-17 — LP-041. wp-09-12-19 — LP-006.
wp-09-12-20 — LP-004.2. wp-09-12-24 — LP-044. wp-09-12-29 — LP-042 publication rule.
wp-09-12-42 — LP-074. wp-09-12-50, -51, -72, -73, -74, -75, -76, -77, -78, -83, -84, -85 — LP-069 /
LP-070 machinery. wp-13-16-28, -29, -30 — LP-062.2. wp-13-16-34, -35, -36 — LP-037.
wp-13-16-37, -38, -39, -40 — LP-056. wp-17-19-12, -21 — LP-065. wp-17-19-13 — LP-038.2.
wp-17-19-24 — LP-060. wp-17-19-32 — LP-032. wp-17-19-76 — LP-047.3. wp-17-19-78 — LP-048.3.
*(Fix Pack B3: a phantom "LP-049" citation to a nonexistent §19.11 annex id stood here and is struck;
the real mined id for LP-049 "Cross-Layer Weapon Transit Specification" is already in the pool and
already assigned — the cure and the §19.11 numbering skew are recorded in PART 5.)*
wp-20-22-41 — LP-068. wp-20-22-47 — LP-023. wp-20-22-54 — LP-013.
wp-20-22-67 — LP-045.2. wp-23-26-14 — LP-029. wp-23-26-21 — LP-040. wp-23-26-64 — LP-035.
wp-23-26-65 — LP-028. systems-15, layers-sads-38, layers-sads-74, faq-front-35, sims-24 — LP-074.
technologies-53 — LP-023. world-44 — LP-028. layers-sads-27 — LP-068. layers-sads-64,
faq-front-13 — LP-004.2. layers-sads-65 — LP-006. faq-front-09 — LP-065. faq-front-14 — LP-006 +
LP-004.2. sims-03 — LP-060. sims-04, sims-05 — LP-004.2. sims-07 — LP-005.3. sims-09 — LP-006.
sims-20 — LP-022. sims-21 — LP-048.3.
*(Fix Pack B2)* layers-sads-63 — LP-006 (Lower-Layer Economic Disclosure Law; the -3 Article XXVIII
regulatory mechanism operates but enacted -3 regulations are advisory — the enacted register entry is
the home). wp-17-19-22 — LP-060 (Survivor Elective Memory Excision Act; the survivor elective-excision
rule is already the enacted instrument, joining -24 already listed above).

### Restatement of an instrument that already exists and has a home
wp-17-19-44 — UBI, PJS and the automation surplus are existing named instruments with Charter homes.
world-104 — Savings Circulation Mandate, property caps and Primary Job Subsidy, likewise.
*(Fix Pack B2)* wp-17-19-42 — the §18.7 statement that "the automation surplus funds Universal Basic
Income across all layers" while "the Primary Job Subsidy rewards human contribution" restates UBI and
PJS, both existing named instruments with Charter homes (same ground as wp-17-19-44).

### Charter-home (the home rule)
systems-07b — annual district redraw is Charter XXVIII.II. faq-front-46 — Charter XXV.V.
world-128 — Article XI amendment gate. world-144 — Article IV terminal severance.
world-147 — Articles V and VIII (abortion classification, fetal continuity). world-152,
layers-sads-05, layers-sads-39 — Charter III.I UBI magnitudes. sims-11 — Charter III.VII.
sims-12 — Charter III.I / III.V / III.VII. sims-14 — Charter III.VI Ceiling Seal.
sims-15 — Charter III.V retention schedule. sims-16, sims-19 — Charter XXV.IV.
sims-17 — Charter XXV.I–III and Article VI. sims-22 — Charter III.IV. sims-23 — Charter III.I.
sims-25 — Charter III.II. sims-55 — Charter Article XI. sims-56 — Charter Article XXI.
sims-57 — Charter Article II tiered visibility.
*(Fix Pack B2)* systems-65 — Charter Article XXV.III: "Development or deployment of techniques capable
of compromising technoneural implants or VMSS institutional systems is strictly prohibited"; the
implant-and-institutional-hacking prohibition is Charter-home (see the B4 numbering-skew erratum —
this is the true systems-65 row, not Genetic Diversity Monitoring). layers-sads-66 — the federal floor
"is binding regardless of whether the destination layer has enacted its own regulations", with the
Article XXVIII petition right preserved: both limbs are Charter-home (federal-floor absolutes under
Article XXV; petition mechanism under Article XXVIII.I).

### Not law (surfaced individually under Fix Pack B2, recorded here rather than in the residual mass)
layers-sads-16 — "approximately 32.5% of the civilization's residents meet [the 85 STI threshold]": a
demographic measurement of the Charter III.I floor, not an operative rule (annex tier `not-law`).
layers-sads-56 — "the organic hierarchy that emerges when people … occupy the same space for long
enough": the -2 analogue of -3 organic self-ordering, emergent and non-codifiable (annex tier
`not-law`; the annex summary-table label "Judicial Extraction" is a mis-cite — the Judicial-Extraction
Charter conflict is flagged separately in PART 3). wp-17-19-18c — "the tolerated remainder … low-fidelity gray-market revival
among -3 voluntary residents who accept the odds": an emergent -3 market condition canon frames as
remainder, not rule (annex tier `not-law`; hedges preserved). wp-27-34-153 — the Zero Leakage
Aspiration, "0% leakage is the civilizational target — a direction, not a promise": Article
XXIII-class aspiration, not-law by the tier test.

### Never in force
sims-06 — LP-005.2, expressly superseded by LP-005.3; must not be codified.
sims-51 — LP-062, refused at ratification at 79%. sims-52 — LP-058, filibustered.
sims-53 — LP-059, failed the lower-layer aggregate. sims-54 — a proposed Charter amendment whose
outcome canon deliberately leaves unstated.

### Path 2 family — already instrumented
The entire Path 2 corpus is already a named federal instrument set (the Path 2 Charter, its §10.4
Schedule, the Residual-Risk Register, LP-075, the 2294 certification record, and the deregistered
drafting texts). Its mined provisions are carried as collision reference only, not re-minted, and
appear in the residual exclusion block below. Two Path 2 candidates were promoted into instruments —
path2-record-121 and path2-record-129, both into The Trajectory Doctrine — because they state the
Doctrine's substantive rule rather than Path 2 procedure.

### Residual exclusion block
All remaining pool ids are excluded on one of three grounds, recorded per-id in the surface mining
notes' `tier` field: (a) `charter-home-excluded` — the rule's home is Charter article text and the
home rule forbids a federal name; (b) `not-law` — aspiration, trajectory projection, cultural or
lifestyle description, -3 organic self-ordering, counterfactual allied-nation instruments, or
comparative critique of Earth-era institutions; (c) verbatim restatement of a rule already carried by
an instrument named above or by an enacted LP.

> **Fix Pack B1/B5 — the residual ledger now closes mechanically.** The dangling reference to "the
> returned JSON's `excluded` array" (the lost workflow output) is replaced by the committed
> `docs-review/vmss-laws-latent-mining/accounting-recheck.json`, whose `ledger` records every residual
> id with its `file`, `minedClass`, and `residualGround`. Derived residual total: **503 ids** —
> **(a) charter-home 353 · (b) not-law 104 · (c) restatement/other 46** (`summary.residualGrounds`).
> Ground (c) collects duplicate-source and sims-restatement ids plus the `(unknown)`-class residue the
> crude block-sniff could not resolve; the authoritative per-id ground remains the annex `tier` field,
> which the ledger reproduces. Re-run `accounting-recheck.mjs` after any edit and re-commit the JSON.

---

## PART 3 — FLAGS

### Regulatory-tier — recorded, never authored (Article XXVIII regulations are petitioned by definition)
- The Selective Ascension Domain catalogue: seventeen primary domains plus overlaps, asserted
  state-chartered under Article XXVIII with no law-polling register entry (layers-sads-83).
- Per-domain gating schedules: RIL binary metric and lifetime re-entry bar (layers-sads-84, which also
  contradicts the general re-qualification rule at layer-+1.html:111); CCD audit cadence, consent,
  withdrawal, confidentiality and aggregate-publication regime (layers-sads-85); WMD intra-domain
  redistribution bar, which raises an unresolved interaction with Charter III.VII's district-aggregate
  garnishing — whether a domain boundary shields is stated nowhere (layers-sads-86); SBD binary metric
  and therapeutic carve-out (layers-sads-87); COD entry-versus-maintenance threshold (layers-sads-88);
  LID continuous lineage-verification gate (layers-sads-90); NAZ enumerated disqualifying conduct,
  none of which triggers civic consequence (layers-sads-91); composite-metric domains (layers-sads-100);
  domain threshold values stated only as examples (layers-sads-89).
- The Precognition family: the Precognition Covenant, Predictive Intervention Architecture and
  Restorative Intervention Protocol (layers-sads-93); the Forestalled Act Ledger, a genuine third
  consequence category with an access-control schedule and an explicit scope bound (layers-sads-94);
  the stratification-integrity argument, described as foundational doctrine on the limits of
  Precognition scope expansion (layers-sads-95); the PCD chartering history (layers-sads-92);
  Behavioral-Audit-Through-Opt-In (wp-27-34-50).
- Lineage Integrity Domains as high-trust enclaves where genetic purity is institutionally verified,
  hedged "may concentrate" and "Over long time horizons" (world-83); LID eligibility as the
  augmentation status consequence (faq-front-71).
- Founders' Archive Domain custodianship of every Charter amendment and the original script of the
  four founding lines, plus Centurial Domain peer-support frameworks (wp-20-22-13).
- Animal cruelty laws, ecological protection regulations and federal conservation mandates asserted as
  in-force instruments with no register entry (faq-front-80); de-extinct species protections and the
  extinction-as-investment-strategy fraud rule that rests on them (faq-front-74, faq-front-75).
- SADs described as "state-chartered", implying a chartering act with no visible register entry
  (faq-front-81).
- Named SADs petitioned into existence on narrative surfaces with no register entry (sims-59);
  the Memory Library founding charter's consent framework (sims-60); the pain-buffer streaming
  threshold established by a named Supreme Court ruling (sims-61); the -3 layer-wide backup-vessel
  disclosure regulation ratified at 93% but advisory-only (sims-62).
- "Cultural Spectacle Exploitation" — a provision named in quotation marks that carries no register
  number anywhere in canon. Either it matches an existing law-polling entry the mining pass did not
  resolve, or it is a genuine gap (sims-10).
- Genetic Diversity Monitoring asserted as standard federal ecological infrastructure across all
  layers including -3, with no register entry (systems-66).
- *(Fix Pack B2)* Duplicate-source regulatory-tier flags surfaced on the whitepaper §20/§27–34
  surfaces, each an Article XXVIII / Article IX SAD instrument with no law-polling register entry —
  recorded, never authored: the whitepaper §20.2 restatement of the state-chartered SAD catalogue
  (wp-20-22-16, the same catalogue flagged above at layers-sads-83); the Precognition Covenant Domain
  charter (wp-27-34-113, with layers-sads-93), the Predictive Intervention Architecture and its hard
  deployment bound (wp-27-34-114), the Restorative Intervention Protocol (wp-27-34-123, with
  layers-sads-93), the Forestalled Act Ledger's third-consequence-category rule (wp-27-34-79, with
  layers-sads-94), the Consent-as-Metric Gate developed for the PCD charter (wp-27-34-61), the Four
  Architectural Commitments binding the PIA — the strongest deontic content in the family but attached
  to the 2230 Article XXVIII charter (wp-27-34-84), and the Founders' Archive Domain SAD (wp-27-34-82,
  with wp-20-22-13). None is authorable: Article XXVIII regulations are petitioned by definition.
- *(Fix Pack B2)* A -3 advisory regulation enacted under Article XXVIII "within a month at 93%
  ratification — the highest margin in -3's regulatory history", with no corresponding law-polling
  register entry and no institutional enforcement in the terminal layer (wp-09-12-18). Flag only —
  petitioned by definition, not authorable.

### Tier ambiguity — escalated rather than clustered
- wp-09-12-30 — "Structural architecture lives in the Charter; substantive prohibitions live at
  Article XXV." An affirmative tier-allocation doctrine the Charter states only negatively. Load-bearing
  for this sweep's own routing; the tier test cannot settle whether it is a founding act or exposition.
- wp-27-34-85 — the Gradient Doctrine. Canon states outright that it "is not textually codified; it is
  the pattern that emerged", yet it carries three explicit prohibitions on Precognition deployment.
  Codifying it would contradict its own self-description.
- wp-27-34-54 — Chief Architect. An office/status definition whose only operative content is Charter
  Article XI. **R13 layer-doctrine sensitive** — the founder must not appear as an in-world actor in
  world canon. Escalate before any codification.
- wp-17-19-69 — the Supreme Court's authority to strike enforcement actions violating charter
  principles. Court powers are Charter-tier by definition, yet Article XXI describes only novelty
  jurisdiction and the novelty filter and states no strike authority. The Meritboard audit half IS
  Charter (XXII).
- wp-20-22-31 — "A civilization that monitors conduct must be explicit about what it does not monitor."
  Phrased as an obligation but functions as design rationale.
- wp-20-22-56, wp-20-22-62, world-139 — embodiment markers for computational and superintelligent
  persons. Canon hedges as "the civilian default", "where appropriate", and "asks", with explicit
  non-exclusivity and named exceptions. Deliberately excluded from the Substrate Personhood Doctrine
  rather than smoothed into it.
- wp-23-26-46 is carried in the Hostile State Doctrine; the adjacent-nation classification remains
  operationally thin and is noted here for the drafter.
- systems-38 — renewable grid with solar supplying the majority of grid input. Reads either as a
  generation standard downstream of the Clean Energy Mandate or as pure infrastructure description;
  not stated in Charter XXV.I.
- systems-67b — systems.html adds "+1 Sanctuary for maximum resources" as a fourth rung of the
  mutual-aid ladder where Charter XXV.IV enumerates only three (-2→-3, -1→-2, Main→-1). Either a
  systems-side addition needing ratification or a Charter omission needing an erratum. Not mintable.
- world-87 — the section heading asserts sex work is legal but the body never states an enacting
  permission; it describes the architectural conditions that eliminate every exploitation vector.
- world-149 — political parties do not exist, stated as an absence and a design judgment. The
  Meritboard mechanism makes parties structurally irrelevant without banning them.
- sims-38 — "irreducible biological floor" as a named revival-failure category entered on the formal
  death confirmation. Cannot settle whether this is a codified classification or nomenclature.
- sims-08 — a standing External Force Doctrine working group with joint drafting standing alongside
  the Meritboard national-defense sub-ranking and the Supreme Court sovereignty-classification bench.
  Operative in form, narrative in home.
- sims-28 — the standard visitor protocol stated as "vessel link active, federal surveillance floor
  recording, return path intact" **including for -3 visits**, which contradicts LP-004.2's terminal
  severance at the -3 boundary. Both source cards are v16.5 and pre-date the v17.4 law, so era-pinning
  may resolve it — but the page's own disclaimer covers rates only, not mechanisms.
- sims-35 — the Tessera Compact is a named external polity, not a VMSS instrument. Recorded so a later
  stage does not invent a competing allied-nation name.
- faq-front-97 — the four-item entry consent instrument whose sole home is join.html, an out-of-world
  web form. If canon carries an in-world entry-consent instrument, these four terms are its content;
  if not, this is Process tier under R13 and not law.
- faq-front-100, faq-front-102 — the first public leakage report with formal adoption of the 0.01%
  aspiration, and the acceptance of the lower-layer medical access gap as a structural consequence of
  institutional withdrawal. Both are forward projection on roadmap.html; the first implies a recurring
  public reporting obligation, the second is a doctrinal disposition not to remedy.
- faq-front-88 — "every entry has a source, a standard, and a path to recourse; the ledger clears the
  wrongly-suspected as readily as it flags the guilty." Operative-sounding, no Charter home, no
  mechanism stated.
- path2-record-122, path2-record-123 — era-pinning of Doctrine-Snapshot simulations with no
  retroactive recalculation, and supersession-not-erasure for replaced rate strata. Operative and
  unnamed, but they govern the corpus rather than the world; the tier test cannot settle whether
  corpus-governing rules are codifiable at all.
- path2-record-136 — the register is world canon and carries only what the civilization's institutions
  decided. Live and operative about what may enter the law register, but stated on a process page and
  grounded in out-of-world layer doctrine and LP-042.
- path2-record-142 — "the six enforceability criteria" the Path 2 audit binds itself to. Operative and
  self-binding, countable but unnamed, substantially restated inside Path 2 Charter Articles IV–VI and
  IX–X, stated on a process-record page.

### Contradictions and discrepancies — surfaced, not adjudicated
- **Implant voluntariness, three-way.** wp-01-08-13 and technologies-02 make implants mandatory for
  all +1 Sanctuary residents; §4.4's civic floor names "preserved implant opt-in" as floor content;
  technologies-07 states the implant is "completely opt-in and removable" with no layer scope — on the
  same page as the Sanctuary mandate. One of the three must yield. (Instrument affected: The Implant
  Instrumentation Act, which carries all three limbs as stated.)
- **layers-sads-18 vs layers-sads-17.** A Sanctuary domain credential is suspended automatically on
  elective departure, against the rule that credentials lapse only under punitive reassignment. The
  narrative is an elective-residency filing, so era-pinning does not resolve it. The Domain Boundary
  Act carries the -17 formulation; -18 is flagged.
- **layers-sads-59 vs Charter III.VI and VII.** "Voluntary -3 residents hold their ascension pathway
  open indefinitely", against Article III.VI ("The ceiling is sealed at the time of filing") and
  Article VII (no upward visitation for voluntary permanent residents), and against the same
  narrative's own filing and liquidation events. Nothing was named from this passage.
- **layers-sads-67 — Charter conflict.** Judicial Extraction is a named procedural mechanism permitting
  temporary removal of a -3 resident for evidentiary or structural review. Charter Article X states the
  opposite absolute: "Exit from -3 is impossible — it is terminal." Either an unstated Charter
  exception or a Charter erratum. **Removed from The Federal Reach Boundary Act pending a ruling.**
- **Refugee category.** world-101 states the civilization operates no separate refugee or asylum
  category and grants no humanitarian expedite; world.html §6 states operative asylum-channel rules
  under a "Refugee & Asylum Protocols" heading with allied-notification and hostile-state
  non-notification channels (world-52, world-54). All three are carried inside The Citizenship
  Admission Act so they sit in one instrument for reconciliation.
- **Foreign-born children.** world.html:729 places dividend eligibility both "from birth by parentage"
  ("Registration is not what creates these rights") and at implant installation as part of "full
  integration". Both limbs carried in The Citizenship Status Act.
- **Export list.** world.html §8 states an absolute prohibition on the longevity stack leaving VMSS
  borders, but the §16 Tier 0 enumeration does not list longevity augmentation. Both carried in The
  Technology Transfer Tiers.
- **Transit right.** The §34 glossary grants persons a right to traverse without triggering
  jurisdiction, while §26.5 body text states "No blanket transit rights exist" for state vessels.
  Different subjects sharing one name; both carried in The Transit-Right Doctrine.
- **CHARTER-CITATION DISCREPANCY (loud).** world-127, world-131 and world-107 assert "the
  civilization's founding charter prohibits acquisition by force in any form", "the charter's
  prohibition on terrestrial expansion", and "expansion is constitutionally prohibited". Greps of
  charter.html for conquest / acquisition by force / expansion / territor return only Article XXI's
  "novelty expansion" and Article XXVII. **No such article exists.** The Territorial Doctrine carries
  the prohibition as world-home on that basis; whether that is correct or a Charter gap is Jason's
  call.
- **Self-declared constitutional status.** The Security Classification System asserts its tiers are
  "constitutional" and that changing them requires the Article XI gauntlet, while charter.html contains
  no Security Classification, Top Secret or Confidential text at all.
- **CITATION ERRATUM.** faq-front-82 — why-vmss.html:532 attributes the upper-to-terminal token
  conversion schedule to Article XIV, where faq.html:634 and charter.html both place it at Article
  III.V. Article XIV is Proportional Response. Reads as a stale article pointer.
- **OVERSTATEMENT.** faq-front-83 — join.html's entry consent instrument states reassignment carries
  "no appeal", where faq.html:918–919 preserves Supreme Court remedial authority for verified
  institutional error while denying a general appeals pathway. Note also that join.html is an
  out-of-world web form (Process tier under R13).
- **SCOPE AMBIGUITY.** faq-front-84 — the failsafe-disable answer states no layer scope while the
  combat-sports answer states pre-intervention is mandatory in Sanctuary and not opt-out. As written an
  unscoped reader could conclude Sanctuary residents may disable pre-intervention, contradicting
  Charter Articles I and VI.
- **MUTUAL-AID LADDER DIVERGENCE** *(Fix Pack B4 — restored from the annex; dropped by the synthesis
  pass).* The mutual-aid ladder in `systems.html` adds "escalating to +1 Sanctuary for maximum
  resources", a rung Charter XXV.IV does not contain — Charter XXV.IV enumerates only -2→-3, -1→-2 and
  Main→-1 (systems-66b). Either a systems-side addition needing ratification or a Charter omission
  needing an erratum; not mintable. The same divergence is recorded once more, on the schedule side, at
  systems-67b in the tier-ambiguity list above.

### Gaps
- wp-23-26-38 and world-92 — the Federation Treaty's "published criteria" for admission and continued
  compliance are load-bearing (they gate alliance entry, treaty downgrade review, and the only sanctions
  exit) but their content is nowhere enumerated.
- world-61 — the Recall Protocol's voluntary return window states no duration.
- The voluntary accession review names three criteria but no deciding body (within The Territorial
  Doctrine; no candidate reassignment implied).
- The popular-signal correction channel requires "a sufficient volume" of proximate witnesses and
  states no numeric threshold anywhere in canon (within The Record Contestation Act; no candidate
  reassignment implied).
- technologies-24 — longevity and fertility augmentation is "subsidized in higher layers" with no rate,
  no funding instrument and no eligibility criterion. Carried in The Augmentation Consent Standard as
  the layer-scoped access statement; the missing schedule is the gap.
- wp-13-16-41, technologies-69 — transanimal audience-mode dives are streamed from actual animal hosts
  carrying neural relay implants, but canon states no consent, welfare, duty-cycle or session-limit
  standard for those hosts.
- wp-13-16-43, technologies-25, technologies-26 — bioengineered companion organisms carry "the same
  animal welfare protections as any living organism under VMSS law" and are limited by "biological
  feasibility and ethical review", neither of which canon locates in any instrument.
- layers-sads-28 — cross-layer communication is permitted "but subject to content mediation"; the
  mediation standard is stated nowhere.
- layers-sads-70 — an upper-layer hazardous-attraction proposal runs a "Council certification process";
  no Council appears in the Charter and the process is stated nowhere else.
- layers-sads-73 — the Primary Job Subsidy is available in -3 "at the layer's looser threshold"; the
  threshold is never stated.
- layers-sads-96, layers-sads-97, layers-sads-99 fall in the residual block; noted here only so a later
  pass knows the SAD surface was swept.
- faq-front-76 — cross-layer commerce runs through private brokers charging "a standing brokerage
  percentage" under escrow, watched at "the standing surveillance level applied to all -1 commercial
  activity". Operative-sounding, no instrument.
- faq-front-77, faq-front-78, faq-front-79 — the colosseum classification's automatic attachment, the
  five-way permission question, and the -3 private police/prison formation. Recorded as -3 customary
  order and deliberately **not** codified (rule 6), flagged so the boundary is legible.
- path2-record-098 — RR-9 imposes a live affirmative duty on the Registrar to publish ledger-coverage
  statistics with every run, but that duty is stated only inside the Residual-Risk Register, not in the
  Path 2 Charter's or Schedule's operative text. Worth a home check.
- path2-record-116 — "Lower collections remain siloed and layer-attributed; the certification does not
  universalize SCM." An operative cross-layer boundary stated only in a certification banner, carried
  by no named instrument's text on that surface. Its real home may be LP-074 §6 or the systems corpus.
- path2-record-124 — canon names "the closed-line rule" (a closed petition line permits no
  resubmission; a successor must be a new line) but its operative text is not on any surface mined.
  Locate its home before treating it as named or unnamed.

### Head-word note
`Clause` and `Regime` return zero canon uses site-wide and remain fully available if any minted name in
this set needs reworking.

---

## PART 4 — VERIFICATION RECORD

1. **Collision check.** Every one of the 34 minted names was checked against all three tables of
   `existing-names-index.md` — 89 law-polling titles, 57 laws.html code-entry titles, the 100-row
   site-wide phrase table — and against `charter-home-index.md` PART 3's reserved phrases. Deliberate
   avoidances: "Currency Siloing", "mega-walls", "Automation Dividend Treasury", "Savings Circulation
   Mandate", "Enforcement Escalation Ladder", "Military Capability Doctrine" (all Charter-reserved);
   "The Layered Schedule" (LP-072), "Neural Diving Consent Expansion" (LP-008), "Victim Continuity
   Restoration Act" (LP-065), "Autoparenting Facility Operational Standards" (LP-023), "Critical
   Infrastructure Security" (systems.html heading), "Idle-Commercial Enforcement and Main-Treasury
   Architecture Act" (LP-070), "Status-Carry" (LP-035).
2. **Home rule.** Every instrument re-checked against PART 1 of the charter-home index. Nothing
   Charter-home carries a federal name. PART 4's five explicit non-homes — III.III rates, III.VII's
   LP-069 attribution citation, XXV.V's classified annex, Article II's formula internals, XXII's
   operational calibration — were treated as the open ground where the rate, fiscal, classification and
   measurement instruments legitimately sit.
3. **Name form.** No minted name contains a number, a date, or an acronym. Verified by inspection of
   all 61 names.
4. **No overreach.** Every provision line traces to at least one candidate id whose mined quote states
   it. No magnitude, threshold, date, scope, right or duty appears that is not in a quote. No founding
   instrument carries a filing date, vote, drafter or ladder record.
5. **Accounting.** ~~Mechanically verified by `assign.mjs`: 1,320 pool ids · 506 assigned across 61
   instruments with 0 duplicates and 0 ids outside the pool · 83 flag-owned ids · 731 excluded (121
   named + 640 residual) · 0 unaccounted.~~ **Fix Pack B1 supersession:** `assign.mjs` was never
   committed and its 1,320-pool result is unreproducible; the accounting is re-derived mechanically by
   `accounting-recheck.mjs` from the committed annex and committed as `accounting-recheck.json`.
   Ground-truth ledger: **pool 1,352 · 516 assigned across the 61 instruments · 89 flag-cited · 747
   excluded (109 named + 135 Path 2 categorical + 503 residual, each residual carrying a recorded
   ground a/b/c) · 0 phantom references · 0 suspicious residuals.** Re-run and re-commit the JSON after
   any inventory or annex edit; it is ground truth until superseded (dispositions memo B1).

## PART 5 — FIX PACK B DISPOSITION RECORD (audit trail, 2026-07-21)

This section is the per-id evidence ledger required by dispositions B2/B3. It is outside the ranges the
`accounting-recheck.mjs` tool parses (PART 1 candidate-id lines, PART 2 named exclusions, PART 3
flags), so it records the reasoning without affecting the mechanical count. The committed
`accounting-recheck.json` is the machine-readable companion.

**B2 — the 30 committed `suspiciousResiduals`, each dispositioned (JSON enumerated 30, not the memo's
estimate of 26):**

*Assigned — content already carried; the id is a duplicate §-source appended to the covering
instrument's candidate-id line (the standing citation points one §-source over from the annex's own
numbering — a systematic skew recorded below, not silently rewritten):*
- wp-17-19-35, wp-17-19-36 → #6 The Boundary and Transit Infrastructure Standard (mega-wall physical
  spec; wall active-defense envelope), provisions 1 and 3–4.
- wp-17-19-51, wp-17-19-52 → #7 The Threshold Inhibition Protocol (the named §19.1 mechanism; the
  acts-not-thoughts limit), provisions 1–3 and 5.
- wp-17-19-41 → #18 The Redundant Envelope Pattern (§18.6 mandatory analog redundancy), provisions 5–6.
- wp-17-19-25 → #28 Authorized Bailout (§17.3.1 forced revival location, anti-evasion), provisions 3–4.
- wp-17-19-18a, wp-17-19-18b → #30 The Continuity Integrity Act (sync authentication; duress
  signalling), provisions 4 and 5. -18a via the B3 phantom cure of the never-defined `wp-17-19-18`.
- wp-17-19-64, wp-17-19-65 → #16 The Unified Transparency Doctrine (leakage trajectory published; AI-
  governance failures admitted/logged/preserved), provisions 7 and 6.
- wp-17-19-72 → #53 Status-Based vs. Territorial Jurisdiction (bidirectional anti-gaming), provision 5.

*Named exclusions — recorded in PART 2:*
- layers-sads-63 → LP-006 (already enacted). wp-17-19-22 → LP-060 (already enacted).
- systems-65 → Charter XXV.III (implant/institutional hacking prohibition). layers-sads-66 → Charter
  federal floor + Article XXVIII petition right.
- wp-17-19-42 → restatement of UBI/PJS (existing named instruments with Charter homes).
- layers-sads-16, layers-sads-56, wp-17-19-18c, wp-27-34-153 → not-law (demographic / -2 organic
  self-ordering / -3 tolerated remainder / Article XXIII aspiration).

*Escalated to PART 3 flags:*
- systems-66b → Contradictions (mutual-aid-ladder divergence; Fix Pack B4 restore).
- wp-09-12-18, wp-20-22-16, wp-27-34-61, wp-27-34-79, wp-27-34-82, wp-27-34-84, wp-27-34-113,
  wp-27-34-114, wp-27-34-123 → Regulatory-tier (Article XXVIII / IX SAD & Precognition-family
  instruments, no register entry — not authorable).

**B3 — phantom citations cured:**
- Instrument #30's `wp-17-19-18` → `wp-17-19-18a` (annex splits §17.1.5 line 1065 into 18a/18b/18c; the
  provision-4 sync-authentication text is 18a verbatim). 18b (duress) is assigned to #30 provision 5;
  18c (hardware mortality) is a not-law named exclusion.
- PART 2's `wp-17-19-79 — LP-049`: the annex defines no `wp-17-19-79`. LP-049 "Cross-Layer Weapon
  Transit Specification" is mined at **wp-17-19-77**, which is already `assigned` (to the mutual-combat
  instrument). Because re-citing an already-assigned id in PART 2 would be redundant and the §19.11
  cluster carries a numbering skew this fix pack is not authorised to rewrite, the phantom line is
  **struck** rather than repointed. The §19.11 skew: PART 2 tags `wp-17-19-76 — LP-047.3` and
  `wp-17-19-78 — LP-048.3`, but the annex defines -76 as LP-048.3 (defense of third parties) and -78 as
  a not-law enforcement-principle callout; the true LP-047.3 id is -74 and the true LP-049 id is -77.
  These mislabels are outside B3's scope (they are valid `named-excluded`/`assigned` dispositions, not
  phantoms) and are recorded here for a later sign-off rather than edited.

**B4 — dropped contradiction flag restored + annex erratum (ids NOT renumbered):**
- systems-66b restored to PART 3 Contradictions verbatim from the annex headline.
- `mine-systems.md` numbering skew: the annex *headline* (line 20) labels Genetic Diversity Monitoring
  `systems-65`, but the candidate table (line 100) and inventory PART 3 label it `systems-66`; the true
  `systems-65` is the Article XXV.III implant/institutional-hacking charter-home row. Recorded as an
  erratum; ids are left as committed.
