# EXISTING-NAME COLLISION INDEX

Repo: `F:/Programming/VMSS/VMSS Website` · branch `feat/vmss-laws-v22.7.0` · generated 2026-07-20 · READ-ONLY parse, no repo files modified.

Purpose: every name already in use across the published canon, so a codification sweep does not mint a colliding instrument name.

---

## Task 1 — law-polling.html: all instrument titles

### Reconciliation to the page stat cards

| Check | Stat card | Parsed | Match |
|---|---|---|---|
| Entries | 89 | 89 | yes |
| Charter Amendments | 7 | 7 | yes |
| Federal Laws | 60 | 60 | yes |
| Regulatory Petitions | 22 | 22 | yes |

Method and corroborating counts:

- Entry container is uniform: `<article class="law-entry" id="lp-NNN">`. Raw occurrence counts agree three ways — `class="law-entry"` = 89, `<h3 class="law-title">` = 89, `<span class="status-badge ...">` = 89. Zero entries lacked a title or a status badge; zero non-`<article>` elements carry an `lp-` id.
- Tier membership derived positionally from the three `<h2 class="law-section-header">` anchors (`#charter-amendments` L433, `#federal-laws` L653, `#regulatory-petitions` L2459) rather than from any per-entry attribute, so it is independent of the stat cards.
- Independent second source: the 89 `a.toc-link` entries in the page Table of Contents. TOC ids and entry ids are a perfect bijection (0 in TOC not in body, 0 in body not in TOC), TOC tier counts are 7/60/22, **and every `span.toc-txt` string is byte-identical to its entry `h3.law-title`** — 0 title divergences. Two independent parses landing on the same 89 titles is the reconciliation.
- Status is taken from the entry `status-badge` prose (richer than the TOC `data-status` slug, e.g. `Failed at Sanctuary Consensus` vs `status-failed`).

### Charter Amendments (7)

| LP | Title (exact) | Status |
|---|---|---|
| LP-001 | Article XXIX — Extraterrestrial Governance Framework | Failed at Sanctuary Consensus |
| LP-046 | Article XI Consensus Threshold Revision | Failed at Meritboard Filibuster |
| LP-050 | Three-Tier Tenure Codification Amendment | Failed at Supreme Court |
| LP-052 | Independent Fetal Continuity Registration Amendment | Failed at Sanctuary Consensus |
| LP-053 | Voluntary Cessation Procedure Amendment | Failed at Sanctuary Consensus (narrow) |
| LP-057 | Earned Reascension Amendment | Failed at Main Layer |
| LP-066 | Terminal-Born Continuity Amendment | Failed at Sanctuary Consensus |

### Federal Laws (60)

| LP | Title (exact) | Status |
|---|---|---|
| LP-002 | PJS Rate Calibration — Medical Research Roles | Enacted |
| LP-003 | Meritboard Engagement Thresholds | Rerouted by Dual-Key |
| LP-004 | Backup Vessel Parity | Failed at Sanctuary |
| LP-004.2 | Backup Vessel Parity — Second Pass (Consent-Scoped Redraft) | Enacted |
| LP-005 | Sovereignty Breach Law | Failed at Sanctuary |
| LP-005.2 | Sovereignty Breach Law — Second Pass (Scale-Tier Redraft) | Enacted · Superseded by LP-005.3 |
| LP-005.3 ⬥ | Sovereignty Breach Law — Third Pass (Character-Weighted Classification Override) | Enacted · Operative |
| LP-006 | Lower-Layer Economic Disclosure Law | Enacted |
| LP-007 | Meritboard Representation Parity | Failed at Sanctuary |
| LP-007.2 ⬥ | Meritboard Representation Parity — Second Pass (Role-Scoped Redraft) | Enacted |
| LP-008 | Neural Diving Consent Expansion | Failed at Lower-Layer Aggregate |
| LP-021 | Colosseum Classification Non-Export | Enacted |
| LP-022 | Revival Priority During Mass-Casualty Events | Enacted |
| LP-023 | Autoparenting Facility Operational Standards | Enacted |
| LP-024 | Meritboard Representation Parity — Amendment Attempt | Failed at Ratification |
| LP-028 | Implant Tamper-Abroad Recovery Protocol | Enacted |
| LP-029 | Orbital Debris Attribution Tax | Enacted |
| LP-031 | Substrate Continuity Equivalence Act | Enacted · Superseded-in-spirit by LP-045.2 |
| LP-032 | Archive Access and Standing Protocol | Enacted |
| LP-033 | District Externality Escalation Rule | Rerouted by Dual-Key — Enacted at Federal |
| LP-034 | Educational Baseline Designation | Enacted (Dual-Key Challenge Denied) |
| LP-035 | Status-Carry Jurisdiction Clarification Act | Enacted |
| LP-037 | Neural Dive Archival Consent Standard | Enacted |
| LP-038 | Backup Vessel Sync Frequency Mandate | Failed at Main Layer |
| LP-038.2 | Sync Frequency Mandate — Second Pass (Notification Architecture Redraft) | Enacted |
| LP-039 ⬥ | Academy Capstone Live-Adoption Procedure | Enacted |
| LP-040 | Federation Treaty Tier-4 Burden-Sharing Protocol | Enacted |
| LP-041 ⬥ | Draft Origination & Sponsorship Disclosure Rule | Enacted |
| LP-043 | MGD Adequacy Review Trigger | Enacted |
| LP-044 | Sovereign Foothold Limitation & Sunset Rule | Enacted |
| LP-045 | Substrate-Equivalent Continuity Guarantee | Failed at Sanctuary |
| LP-045.2 ⬥ | Substrate-Equivalent Continuity — Second Pass (Functional-Equivalence Redraft) | Enacted · Operative |
| LP-046.2 | Consensus Deliberation-Window Specification | Enacted |
| LP-047 | Visitor Defensive Force Protection | Failed at Sanctuary |
| LP-047.2 | Visitor Defensive Force Protection — Second Pass (Layer-Graduated Redraft) | Failed at Lower-Layer Aggregate |
| LP-047.3 ⬥ | Visitor Defensive Force Protection — Third Pass (Temporal Scope Redraft) | Enacted · Operative |
| LP-048 | Defense of Third Parties Extension | Failed at Lower-Layer Aggregate |
| LP-048.2 | Defense of Third Parties — Second Pass (Incapacitated-Victim Scoping) | Failed at Sanctuary |
| LP-048.3 ⬥ | Defense of Third Parties — Third Pass (Reasonable-Perception Standard) | Enacted · Operative |
| LP-049 | Cross-Layer Weapon Transit Specification | Enacted |
| LP-051 | Federal Seat Handoff-Period Specification | Enacted |
| LP-054 | Post-Descent Parental Authority Boundary Act | Failed at Lower-Layer Aggregate |
| LP-055 | Implant Removal Conscientious Objection Procedure | Failed at Supreme Court |
| LP-056 | Restorative Neural Exposure Boundary Act | Enacted (narrow) |
| LP-058 | STI Trajectory Advisory Mandate | Failed at Meritboard Filibuster |
| LP-059 | Companion Animal Continuity Act | Failed at Lower-Layer Aggregate |
| LP-060 | Survivor Elective Memory Excision Act | Enacted (Narrow) |
| LP-063 | Revival-Refusal Coercion Act | Enacted |
| LP-064 | Replenishment Assessment and Child Dividend Stewardship Act | Enacted |
| LP-065 | Victim Continuity Restoration Act | Enacted |
| LP-067 | Correction-Signal Weighting Act | Failed at Lower-Layer Aggregate |
| LP-067.2 | Correction-Signal Weighting Act (Layer-Calibrated Redraft) | Enacted |
| LP-068 | Neonatal Relocation Facilitation Act | Enacted |
| LP-069 | Savings Attribution and Property-Cap Repeal Act | Enacted |
| LP-070 | Idle-Commercial Enforcement and Main-Treasury Architecture Act | Enacted |
| LP-071 | The Foundation Cap — Founding Net-Worth Ceiling | Superseded |
| LP-072 | The Layered Schedule — First Layer-Mapped Income Bands | Superseded |
| LP-073 | The First Ratchet — 70/35/17/8 Point-Halving Cascade | Superseded in 2295 |
| LP-074 | RATIFY-TAX-50-II — Conditional Rate Schedule | Enacted · Schedules Active from 2295 |
| LP-075 | Path 2 Commencement Duty Act | Enacted |

### Regulatory Petitions (22)

| LP | Title (exact) | Status |
|---|---|---|
| LP-009 | Non-Consensual Implantation Restriction (-3 Voluntary Districts) | Advisory-Only |
| LP-010 | Fabrication-Proxy Service Hours (3-District -1 Coalition) | Enacted (District) |
| LP-011 | Industrial Watershed Discharge Exemption (-3 Petition) | Rerouted by Dual-Key |
| LP-012 | Private Detention for Main Layer Misdemeanors | Rerouted by Dual-Key |
| LP-013 | AGI Voting Weight Confirmation | Enacted |
| LP-014 | Cross-Layer Family Visitation Extension (Main Layer) | Enacted |
| LP-015 | Hunting of Endangered Species | Cross-Layer Variance |
| LP-016 | Vehicle Speed Limits | Cross-Layer Variance |
| LP-017 | Casinos | Cross-Layer Variance |
| LP-018 | Public Intoxication | Cross-Layer Variance |
| LP-019 | Indecent Exposure | Cross-Layer Variance |
| LP-020 | District-Level Curfew Petitions (Aggregated Record) | Enacted (Multiple Districts) |
| LP-025 | Cross-Layer Marriage Recognition Standards | Enacted (Main + Sanctuary Joint) |
| LP-026 | STI Weight Calibration Review Cycle | Enacted |
| LP-027 | MGD Transparency Requirements (Main Layer) | Enacted (Narrow) |
| LP-030 | -3 Voluntary District Self-Governance Consolidation | Advisory-Only (Honored) |
| LP-036 | STI Temporal Comparability Doctrine | Enacted |
| LP-042 | Canon Anchor Hierarchy Clarification | Enacted |
| LP-061 | Public-Space Commercial AR Overlay Standards | Cross-Layer Variance |
| LP-062 | Sexual-Assault Pre-Intervention Mandate (Main Layer) | Failed at Ratification · Dual-Key Challenge Denied |
| LP-062.2 | Sexual-Assault Pre-Intervention — Second Pass (Opt-Out-Able Default Redraft) | Enacted · Operative |
| LP-062.3 | Sexual-Assault Pre-Intervention — Third Pass (Actionable Opt-Out Signal) | Rejected · Constitutional Conflict (dual-key review) |

⬥ = Pillar Federal Law.

---

## Task 2 — laws.html: law-titles and code-entry ids

Structure: 87 `<article class="code-entry">` containers across 4 tier sections and 7 subject headings. Of these, 57 carry an `<h3 class="law-title">`; the remaining 30 are the Tier-1 Charter entries, which are content-injected placeholders (id + `data-source` only, no inline title). Every `h3.law-title` in the file resolves to a containing `code-entry` — no orphans.

| Tier | code-entry count | with law-title |
|---|---|---|
| charter | 30 | 0 |
| federal | 39 | 39 |
| layer | 14 | 14 |
| district | 4 | 4 |

Section anchors: `#tier-charter` (Tier 1 — The Charter of VMSS), `#tier-federal` (Tier 2 — Federal Law), `#tier-layer` (Tier 3 — Layer-Wide Regulation), `#tier-district` (Tier 4 — District Regulation).

Subject anchors: `#subject-taxation` (Taxation & Rate Law), `#subject-economy` (Economy, SCM & Anti-Concentration), `#subject-defense` (Defense, Force & Visitation), `#subject-technology` (Technology, Implants & Continuity), `#subject-governance` (Governance, Process & Disclosure), `#subject-justice` (Justice & Enforcement), `#subject-population` (Population & Family).

### Tier 1 — The Charter of VMSS — 30 entries

| code-entry id | data-source | h3.law-title |
|---|---|---|
| `code-charter-preamble` | `preamble` | _(none — Charter placeholder)_ |
| `code-charter-article-i` | `article-i` | _(none — Charter placeholder)_ |
| `code-charter-article-ii` | `article-ii` | _(none — Charter placeholder)_ |
| `code-charter-article-iii` | `article-iii` | _(none — Charter placeholder)_ |
| `code-charter-article-iv` | `article-iv` | _(none — Charter placeholder)_ |
| `code-charter-article-v` | `article-v` | _(none — Charter placeholder)_ |
| `code-charter-article-vi` | `article-vi` | _(none — Charter placeholder)_ |
| `code-charter-article-vii` | `article-vii` | _(none — Charter placeholder)_ |
| `code-charter-article-viii` | `article-viii` | _(none — Charter placeholder)_ |
| `code-charter-article-ix` | `article-ix` | _(none — Charter placeholder)_ |
| `code-charter-article-x` | `article-x` | _(none — Charter placeholder)_ |
| `code-charter-article-xi` | `article-xi` | _(none — Charter placeholder)_ |
| `code-charter-article-xii` | `article-xii` | _(none — Charter placeholder)_ |
| `code-charter-article-xiii` | `article-xiii` | _(none — Charter placeholder)_ |
| `code-charter-article-xiv` | `article-xiv` | _(none — Charter placeholder)_ |
| `code-charter-article-xv` | `article-xv` | _(none — Charter placeholder)_ |
| `code-charter-article-xvi` | `article-xvi` | _(none — Charter placeholder)_ |
| `code-charter-article-xvii` | `article-xvii` | _(none — Charter placeholder)_ |
| `code-charter-article-xviii` | `article-xviii` | _(none — Charter placeholder)_ |
| `code-charter-article-xix` | `article-xix` | _(none — Charter placeholder)_ |
| `code-charter-article-xx` | `article-xx` | _(none — Charter placeholder)_ |
| `code-charter-article-xxi` | `article-xxi` | _(none — Charter placeholder)_ |
| `code-charter-article-xxii` | `article-xxii` | _(none — Charter placeholder)_ |
| `code-charter-article-xxiii` | `article-xxiii` | _(none — Charter placeholder)_ |
| `code-charter-article-xxiv` | `article-xxiv` | _(none — Charter placeholder)_ |
| `code-charter-article-xxv` | `article-xxv` | _(none — Charter placeholder)_ |
| `code-charter-article-xxvi` | `article-xxvi` | _(none — Charter placeholder)_ |
| `code-charter-article-xxvii` | `article-xxvii` | _(none — Charter placeholder)_ |
| `code-charter-article-xxviii` | `article-xxviii` | _(none — Charter placeholder)_ |
| `code-charter-founding-affirmation` | `founding-affirmation` | _(none — Charter placeholder)_ |

### Tier 2 — Federal Law — 39 entries

| code-entry id | data-source | h3.law-title |
|---|---|---|
| `code-lp-064` | `lp-064` | Replenishment Assessment and Child Dividend Stewardship Act |
| `code-lp-074` | `lp-074` | RATIFY-TAX-50-II — Conditional Rate Schedule |
| `code-lp-075` | `lp-075` | Path 2 Commencement Duty Act |
| `code-lp-002` | `lp-002` | PJS Rate Calibration — Medical Research Roles |
| `code-lp-006` | `lp-006` | Lower-Layer Economic Disclosure Law |
| `code-lp-043` | `lp-043` | MGD Adequacy Review Trigger |
| `code-lp-069` | `lp-069` | Savings Attribution and Property-Cap Repeal Act |
| `code-lp-070` | `lp-070` | Idle-Commercial Enforcement and Main-Treasury Architecture Act |
| `code-lp-005-2` | `lp-005-2` | Sovereignty Breach Law — Second Pass (Scale-Tier Redraft) |
| `code-lp-005-3` ⬥ | `lp-005-3` | Sovereignty Breach Law — Third Pass (Character-Weighted Classification Override) |
| `code-lp-029` | `lp-029` | Orbital Debris Attribution Tax |
| `code-lp-040` | `lp-040` | Federation Treaty Tier-4 Burden-Sharing Protocol |
| `code-lp-044` | `lp-044` | Sovereign Foothold Limitation & Sunset Rule |
| `code-lp-047-3` ⬥ | `lp-047-3` | Visitor Defensive Force Protection — Third Pass (Temporal Scope Redraft) |
| `code-lp-048-3` ⬥ | `lp-048-3` | Defense of Third Parties — Third Pass (Reasonable-Perception Standard) |
| `code-lp-049` | `lp-049` | Cross-Layer Weapon Transit Specification |
| `code-lp-004-2` | `lp-004-2` | Backup Vessel Parity — Second Pass (Consent-Scoped Redraft) |
| `code-lp-022` | `lp-022` | Revival Priority During Mass-Casualty Events |
| `code-lp-028` | `lp-028` | Implant Tamper-Abroad Recovery Protocol |
| `code-lp-031` | `lp-031` | Substrate Continuity Equivalence Act |
| `code-lp-032` | `lp-032` | Archive Access and Standing Protocol |
| `code-lp-037` | `lp-037` | Neural Dive Archival Consent Standard |
| `code-lp-038-2` | `lp-038-2` | Sync Frequency Mandate — Second Pass (Notification Architecture Redraft) |
| `code-lp-045-2` ⬥ | `lp-045-2` | Substrate-Equivalent Continuity — Second Pass (Functional-Equivalence Redraft) |
| `code-lp-056` | `lp-056` | Restorative Neural Exposure Boundary Act |
| `code-lp-060` | `lp-060` | Survivor Elective Memory Excision Act |
| `code-lp-007-2` ⬥ | `lp-007-2` | Meritboard Representation Parity — Second Pass (Role-Scoped Redraft) |
| `code-lp-039` ⬥ | `lp-039` | Academy Capstone Live-Adoption Procedure |
| `code-lp-041` ⬥ | `lp-041` | Draft Origination & Sponsorship Disclosure Rule |
| `code-lp-046-2` | `lp-046-2` | Consensus Deliberation-Window Specification |
| `code-lp-051` | `lp-051` | Federal Seat Handoff-Period Specification |
| `code-lp-021` | `lp-021` | Colosseum Classification Non-Export |
| `code-lp-035` | `lp-035` | Status-Carry Jurisdiction Clarification Act |
| `code-lp-063` | `lp-063` | Revival-Refusal Coercion Act |
| `code-lp-065` | `lp-065` | Victim Continuity Restoration Act |
| `code-lp-067-2` | `lp-067-2` | Correction-Signal Weighting Act (Layer-Calibrated Redraft) |
| `code-lp-023` | `lp-023` | Autoparenting Facility Operational Standards |
| `code-lp-034` | `lp-034` | Educational Baseline Designation |
| `code-lp-068` | `lp-068` | Neonatal Relocation Facilitation Act |

### Tier 3 — Layer-Wide Regulation — 14 entries

| code-entry id | data-source | h3.law-title |
|---|---|---|
| `code-lp-013` | `lp-013` | AGI Voting Weight Confirmation |
| `code-lp-014` | `lp-014` | Cross-Layer Family Visitation Extension (Main Layer) |
| `code-lp-015` | `lp-015` | Hunting of Endangered Species |
| `code-lp-016` | `lp-016` | Vehicle Speed Limits |
| `code-lp-017` | `lp-017` | Casinos |
| `code-lp-018` | `lp-018` | Public Intoxication |
| `code-lp-019` | `lp-019` | Indecent Exposure |
| `code-lp-025` | `lp-025` | Cross-Layer Marriage Recognition Standards |
| `code-lp-026` | `lp-026` | STI Weight Calibration Review Cycle |
| `code-lp-027` | `lp-027` | MGD Transparency Requirements (Main Layer) |
| `code-lp-036` | `lp-036` | STI Temporal Comparability Doctrine |
| `code-lp-042` | `lp-042` | Canon Anchor Hierarchy Clarification |
| `code-lp-061` | `lp-061` | Public-Space Commercial AR Overlay Standards |
| `code-lp-062-2` | `lp-062-2` | Sexual-Assault Pre-Intervention — Second Pass (Opt-Out-Able Default Redraft) |

### Tier 4 — District Regulation — 4 entries

| code-entry id | data-source | h3.law-title |
|---|---|---|
| `code-lp-010` | `lp-010` | Fabrication-Proxy Service Hours (3-District -1 Coalition) |
| `code-lp-020` | `lp-020` | District-Level Curfew Petitions (Aggregated Record) |
| `code-lp-009` | `lp-009` | Non-Consensual Implantation Restriction (-3 Voluntary Districts) |
| `code-lp-030` | `lp-030` | -3 Voluntary District Self-Governance Consolidation |

---

## Task 3 — site-wide canon phrases already functioning as instrument names

Scope: all 42 root `.html` files. Method: tags stripped per line, entities decoded, then matched capitalised multi-word phrases whose head noun is Act / Mandate / Protocol / Doctrine / Schedule / Standard / Treaty / Covenant / Charter / Ladder / Prohibition / Provision / Clause / Envelope / Regime / Compact (singular and plural). Grammatical false positives (`After Schedule`, `Every Charter`, `Scope Charter`, `Full Act`) and `LP-NNN <Title>` TOC prefixes were removed; the underlying titles survive on their own rows. Rarer head words were re-verified with independent greps — **`Clause` and `Regime` return zero canon uses site-wide** (both are free for new names).

| Phrase (verbatim) | Files | Example line |
|---|---|---|
| Adoption Ladder | law-polling.html | law-polling.html:2951 |
| Alliance Protocol | simulations.html | simulations.html:801 |
| Alliance Standards | world.html | world.html:978 |
| Alliance Treaty | world.html | world.html:783 |
| Archive Access and Standing Protocol | law-polling.html, laws.html | law-polling.html:1187 |
| Atomic Energy Act ¹ | faq.html | faq.html:818 |
| Autoparenting Facility Operational Standards | law-polling.html, laws.html | law-polling.html:1041 |
| Autoparenting Facility Standards | law-polling.html | law-polling.html:2247 |
| Backup Vessel Sync Frequency Mandate | law-polling.html | law-polling.html:1337 |
| Border Protocol | world.html | world.html:637 |
| Clean Air Act ¹ | faq.html | faq.html:818 |
| Clean Energy Mandate | charter.html, law-polling.html, systems.html | charter.html:375 |
| Clean Water Act ¹ | faq.html | faq.html:818 |
| Clean-Record Doctrine | whitepaper.html | whitepaper.html:1754 |
| Commencement Duty Act | deregistered-statutes.html, law-polling.html, laws.html, path-2-charter.html, path-2-commencement-duty-act.html, pending-ratification.html, rate-history.html | deregistered-statutes.html:124 |
| Companion Animal Continuity Act | law-polling.html, simulations.html | law-polling.html:2019 |
| Computer Fraud and Abuse Act ¹ | faq.html | faq.html:818 |
| Conditional Rate Schedule | law-polling.html, laws.html | law-polling.html:389 |
| Correction-Signal Weighting Act | law-polling.html, laws.html | law-polling.html:382 |
| Cross-Layer Marriage Recognition Standards | law-polling.html, laws.html | law-polling.html:2803 |
| Deathless Provision | law-polling.html | law-polling.html:877 |
| Downward Transfer Retention Schedule | whitepaper.html | whitepaper.html:1778 |
| Enforcement & Restoration Protocol | charter.html, laws.html, systems.html | charter.html:258 |
| Enforcement Escalation Ladder | charter.html, systems.html | charter.html:385 |
| Enumerated Schedule | path-2-schedule.html | path-2-schedule.html:106 |
| Error Handling and Emergency Protocol | systems.html | systems.html:159 |
| External Force Doctrine | charter.html, law-polling.html, laws.html, simulations.html, whitepaper.html, world.html | charter.html:262 |
| Federal Law Drafting Ladder | whitepaper.html | whitepaper.html:775 |
| Federation Treaty | law-polling.html, laws.html, whitepaper.html, world.html | law-polling.html:1132 |
| Federation Treaty Tier-4 Burden-Sharing Protocol | law-polling.html, laws.html | law-polling.html:1425 |
| Force Doctrine | whitepaper.html | whitepaper.html:1439 |
| Forestalled Act | sads.html, whitepaper.html | sads.html:177 |
| Foundational Charter | systems.html | systems.html:192 |
| Founding Treaty | charter.html, simulations.html, technologies.html, whitepaper.html, why-vmss.html, world.html | charter.html:468 |
| Gradient Doctrine | whitepaper.html | whitepaper.html:1835 |
| Hostile State Doctrine | world.html | world.html:970 |
| Idle-Commercial Enforcement and Main-Treasury Architecture Act | law-polling.html, laws.html | law-polling.html:2296 |
| Implant & Institutional Hacking Prohibition | charter.html | charter.html:381 |
| Implant Hacking Prohibition | law-polling.html, laws.html | law-polling.html:1110 |
| Implant Tamper-Abroad Recovery Protocol | law-polling.html, laws.html | law-polling.html:1099 |
| Intelligence Standards | faq.html, layer-0.html, sads.html, whitepaper.html | faq.html:572 |
| Layer STI Ambient Standard | whitepaper.html | whitepaper.html:1860 |
| Layered Schedule | rate-history.html | rate-history.html:244 |
| Ledger and Restorative Intervention Protocol | sads.html, whitepaper.html | sads.html:177 |
| MGD Doctrine | law-polling.html | law-polling.html:1495 |
| Military Capability Doctrine | charter.html | charter.html:390 |
| National Security Act ¹ | faq.html | faq.html:818 |
| Neonatal Relocation Facilitation Act | law-polling.html, laws.html | law-polling.html:2235 |
| Neural Dive Archival Consent Standard | law-polling.html, laws.html | law-polling.html:1308 |
| Nuclear Weapons Prohibition | charter.html, simulations.html, systems.html | charter.html:378 |
| Overtime Premium Protocol | charter.html, faq.html, whitepaper.html | charter.html:190 |
| Parameter Schedule | path-2-charter.html | path-2-charter.html:228 |
| Physique Standards | faq.html, layer-0.html, sads.html, whitepaper.html | faq.html:166 |
| Post-Descent Parental Authority Boundary Act | law-polling.html | law-polling.html:1892 |
| Precog Covenant | whitepaper.html | whitepaper.html:1924 |
| Precognition Covenant | sads.html, whitepaper.html | sads.html:176 |
| Public-Space Commercial AR Overlay Standards | law-polling.html, laws.html | law-polling.html:2969 |
| Reasonable-Perception Standard | law-polling.html, laws.html | law-polling.html:369 |
| Recall Protocol | world.html | world.html:739 |
| Redundant Envelope | law-polling.html | law-polling.html:2278 |
| Refugee & Asylum Protocols | world.html | world.html:723 |
| Replenishment Assessment and Child Dividend Stewardship Act | faq.html, law-polling.html, laws.html | faq.html:829 |
| Restorative Intervention Protocol | whitepaper.html | whitepaper.html:1953 |
| Restorative Neural Exposure Boundary Act | law-polling.html, laws.html | law-polling.html:1956 |
| Revival-Refusal Coercion Act | faq.html, law-polling.html, laws.html | faq.html:693 |
| Savings Attribution and Property-Cap Repeal Act | law-polling.html, laws.html | law-polling.html:2265 |
| Savings Circulation Mandate | charter.html, law-polling.html, laws.html, pending-ratification.html, pending-ratify-tax-50-ii-statute.html, rate-history.html, simulations.html, systems.html, whitepaper.html, world.html | charter.html:227 |
| Sexual-Assault Pre-Intervention Mandate | law-polling.html | law-polling.html:2998 |
| Status-Carry Jurisdiction Clarification Act | law-polling.html, laws.html | law-polling.html:1279 |
| STI Temporal Comparability Doctrine | law-polling.html, laws.html | law-polling.html:2910 |
| STI Trajectory Advisory Mandate | law-polling.html, simulations.html | law-polling.html:1988 |
| Substrate Continuity Equivalence Act | law-polling.html, laws.html | law-polling.html:1157 |
| Supersession Doctrine | law-polling.html, laws.html | law-polling.html:1166 |
| Survivor Elective Memory Excision Act | law-polling.html, laws.html | law-polling.html:2051 |
| Sync Frequency Mandate | law-polling.html, laws.html | law-polling.html:355 |
| Tax Escalation Schedule | law-polling.html, whitepaper.html | law-polling.html:2126 |
| Territorial Doctrine | whitepaper.html, world.html | whitepaper.html:1441 |
| Tessera Compact | simulations.html | simulations.html:809 |
| The Deathless Provision | layer--3.html, whitepaper.html | layer--3.html:122 |
| The External Force Doctrine | simulations.html, whitepaper.html | simulations.html:664 |
| The Federal Ladder | simulations.html | simulations.html:1839 |
| The Federation Treaty | world.html | world.html:997 |
| The Forestalled Act | sads.html | sads.html:186 |
| The Founding Treaty | whitepaper.html, world.html | whitepaper.html:1691 |
| The Layered Schedule | law-polling.html | law-polling.html:2348 |
| The Overtime Premium Protocol | systems.html, whitepaper.html | systems.html:252 |
| The Redundant Envelope | whitepaper.html | whitepaper.html:1546 |
| The Restatement & Consolidation Doctrine | pending-ratification.html | pending-ratification.html:125 |
| The Savings Circulation Mandate | charter.html, faq.html, law-polling.html, systems.html, whitepaper.html | charter.html:197 |
| The Threshold Inhibition Protocol | faq.html, layer-+1.html, simulations.html, whitepaper.html | faq.html:277 |
| The Trajectory Doctrine | pending-ratification.html, whitepaper.html | pending-ratification.html:157 |
| The Unified Transparency Doctrine | whitepaper.html | whitepaper.html:724 |
| The VMSS Charter | whitepaper.html, why-vmss.html | whitepaper.html:805 |
| Threshold Inhibition Protocol | law-polling.html, layer-+1.html, simulations.html, systems.html, technologies.html, whitepaper.html, world.html | law-polling.html:3002 |
| Trajectory Doctrine | deregistered-statutes.html, law-polling.html, pending-ratification.html, pending-ratify-tax-50-ii-statute.html, rate-history.html | deregistered-statutes.html:163 |
| Transit-Right Doctrine | whitepaper.html | whitepaper.html:1516 |
| Victim Continuity Restoration Act | law-polling.html, laws.html | law-polling.html:2144 |
| VMSS Charter | faq.html | faq.html:819 |
| VMSS Doctrine | navbar.html | navbar.html:9 |

¹ Earth-comparison references inside the faq.html:818 answer (an explicit VMSS-vs-Earth statute crosswalk), not VMSS instruments. Still listed because reusing them as VMSS names would collide with that passage.

### Head-word availability summary

| Head noun | Distinct canon phrases using it |
|---|---|
| Act | 21 |
| Mandate | 7 |
| Protocol | 15 |
| Doctrine | 17 |
| Schedule | 7 |
| Standard | 10 |
| Treaty | 5 |
| Covenant | 2 |
| Charter | 3 |
| Ladder | 4 |
| Prohibition | 3 |
| Provision | 2 |
| Clause | 0 — **unused, fully available** |
| Envelope | 2 |
| Regime | 0 — **unused, fully available** |
| Compact | 1 |

---

## Appendix — `LP-NNN Title` composite strings (TOC/cross-reference forms)

These are the numbered display forms harvested by the same pass; they duplicate Task 1/2 titles and are recorded only so a search for the composite form resolves.

- `LP-023 Autoparenting Facility Operational Standards` — law-polling.html:344, laws.html:425
- `LP-025 Cross-Layer Marriage Recognition Standards` — law-polling.html:408, laws.html:440
- `LP-028 Implant Tamper-Abroad Recovery Protocol` — law-polling.html:346, laws.html:392
- `LP-031 Substrate Continuity Equivalence Act` — law-polling.html:348, laws.html:393
- `LP-032 Archive Access and Standing Protocol` — law-polling.html:349, laws.html:394
- `LP-035 Status-Carry Jurisdiction Clarification Act` — law-polling.html:352, laws.html:416
- `LP-036 STI Temporal Comparability Doctrine` — law-polling.html:412, laws.html:443
- `LP-037 Neural Dive Archival Consent Standard` — law-polling.html:353, laws.html:395
- `LP-038 Backup Vessel Sync Frequency Mandate` — law-polling.html:354
- `LP-040 Federation Treaty Tier-4 Burden-Sharing Protocol` — law-polling.html:357, laws.html:380
- `LP-054 Post-Descent Parental Authority Boundary Act` — law-polling.html:372
- `LP-056 Restorative Neural Exposure Boundary Act` — law-polling.html:374, laws.html:398
- `LP-058 STI Trajectory Advisory Mandate` — law-polling.html:375
- `LP-059 Companion Animal Continuity Act` — law-polling.html:376
- `LP-060 Survivor Elective Memory Excision Act` — law-polling.html:377, laws.html:399
- `LP-061 Public-Space Commercial AR Overlay Standards` — law-polling.html:414, laws.html:445
- `LP-062 Sexual-Assault Pre-Intervention Mandate` — law-polling.html:415
- `LP-063 Revival-Refusal Coercion Act` — law-polling.html:378, laws.html:417
- `LP-065 Victim Continuity Restoration Act` — law-polling.html:380, laws.html:418
- `LP-067 Correction-Signal Weighting Act` — law-polling.html:381
- `LP-068 Neonatal Relocation Facilitation Act` — law-polling.html:383, laws.html:427
- `LP-069 Savings Attribution and Property-Cap Repeal Act` — law-polling.html:384, laws.html:370
- `LP-070 Idle-Commercial Enforcement and Main-Treasury Architecture Act` — law-polling.html:385, laws.html:371
- `LP-072 The Layered Schedule` — law-polling.html:387
- `LP-074 Schedule` — path-2-certification-2294.html:49, pending-ratify-tax-50-rulings.html:131
