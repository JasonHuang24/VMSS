# VMSS Laws — Latent-Corpus Codification Sweep (the naming assignment)

Architect spec, 2026-07-20. Commissioned by Jason: "going through the whole website and inventing the names of the laws latent to the existing doctrine." Successor to the v22.7.0 restructure (PR #29); runs on a new branch. Time-boxed: the inventory is the must-complete deliverable (§7).

## 1. Mission

The Code currently consolidates the *enumerated* law: register instruments and Charter articles. But the doctrine corpus — whitepaper (34 sections), systems, technologies, world, layer dossiers, SADs, FAQ — is full of rules with full in-world legal force that have never carried an instrument's name: prohibitions ("Upward conversion is prohibited without exception"), schedules, mandates, procedural rights, enforcement boundaries. In-world these were always law — enacted whole with the Founding Treaty as a complete legal fabric. This sweep mines the entire site for them, gives each an instrument identity, and consolidates them into VMSS Laws.

## 2. The invention license — exact boundary

**Invented BY DESIGN (this is the assignment):** instrument names; instrument groupings (which provisions compose one act); the founding-corpus classification; Code entry prose consolidating existing statements.

**Still forbidden, absolutely:** new rules; changed magnitudes, thresholds, dates, or scopes; new rights or duties; invented legislative history (no filing dates, votes, drafters, or ladder records for founding instruments — they have none by definition); renaming anything canon already names; smoothing hedges ("tends to be", ranges, "advisory, not institutionally enforced" stay verbatim); founder-as-actor or seat names anywhere World-tier (R13).

**Promote before minting:** where canon already names the thing (Overtime Premium Protocol, Savings Circulation Mandate, Automation Dividend Treasury, secondary observation envelope, …) the existing name IS the instrument name, verbatim. Mint only for the genuinely unnamed.

## 3. Instrument taxonomy

1. **Founding Act** (federal tier, founding corpus). A coherent body of operative rules enacted with the Founding Treaty. Carries a minted name in canon voice ("the Currency Siloing Act" class of name), NO number in any world-facing text (numbers imply a ladder record; founding acts have none). Machine id only: `code-fc-<slug>`.
2. **Named Schedule / Protocol / Standard under an existing authority** — a technical rule that reads as specification under a Charter article, a Founding Act, or an enacted LP. Promoted or minted name; cited to its parent + its canon anchor.
3. **Flag-only classes — inventory, never author:** (a) latent *regulatory-tier* items (XXVIII regs are petitioned by definition; an unpetitioned regulation contradicts the mechanism — e.g. SAD charters like the Precognition Covenant District "chartered 2230 under Article XXVIII" are enacted regs absent from the register: flag for Jason, do not fabricate their records); (b) rules requiring facts canon does not state (record the gap); (c) tier-ambiguous rules the tier test cannot settle.

## 4. Hard rules protecting the v22.7.0 architecture

- **The home rule.** A rule whose canonical home is Charter article text is Charter-tier and receives NO act name — naming it federally would recreate the tier confusion v22.7.0 cured; those await Phase 3's Enabling Consolidation Amendment (architecture §5). A rule stated in both Charter and whitepaper has its home in the Charter → excluded. Candidates are rules whose home is the whitepaper/world/systems/technologies corpus (LP-042 already makes specification-weight whitepaper sections primary authority — the latent laws are mostly already primary authority; they lack only names).
- **The tier test** (architecture §5) governs every assignment: machinery and layer-membership criteria are Charter-tier (excluded); operative cross-layer rules → Founding Acts; -3 organic self-ordering is NOT law (canon insists) — never codify it.
- **Source ranking:** whitepaper (specification weight) > systems/technologies/world/layer pages (World-tier doctrine) > FAQ (explainer; corroboration only) > simulations (era-pinned narrative; mine only for instruments they *reference*, never as source of rules).
- **Aspirations are not law** (XXIII/XXIV-class trajectories, cultural description, §27-class lifestyle prose).

## 5. Naming conventions

Canon voice only: "the X Act", "X Mandate", "X Protocol", "X Doctrine", "X Schedule", "X Standard" — match the register's and whitepaper's own naming rhythm. No Earth-statute pastiche, no acronym backronyms, no dates-in-names, no numbers. Collision-check every minted name against the register's titles, canon vocabulary, and the Code (mechanical grep). Fewer, larger, well-composed acts beat many micro-acts: cluster provisions into coherent instruments (one Currency Siloing Act carrying siloing + conversion prohibition + downward channels, not three acts). Expect the corpus to consolidate to roughly 25–60 instruments; let the mining decide the true number and justify it.

## 6. Seed families (non-exhaustive — the sweep must cover the whole site)

Economy: currency siloing/conversion, central banking (§12.3), SCM operational rules, ADT and treasury mechanics, PJS/Overtime Premium Protocol. Technology: implant boundaries (pulse-at-start, monitoring limits), neural diving, backup vessels & revival per layer (§17), sovereign fabrication, AR surveillance (§18.8). Governance: security classification (§8), dual-key operations. Enforcement & restoration (§19). Rights & family: child relocation right procedure, AI legal advocate, transmutation, substance policy (§14). External: military posture, external force doctrine, alliances, travel/immigration/jurisdiction (§23–26). Domains: SAD/MGD chartering standards (§20–21; note the flag-only class for XXVIII charters). STI mechanics: careful — Article II home + XI lock excludes most of it.

## 7. Pipeline (ultracode; sequenced for the time box)

**Phase M — MINE (the must-complete deliverable).** Parallel readers over every corpus surface. Each candidate: verbatim quote(s), page#anchor/line, deontic type (prohibition/mandate/entitlement/schedule/procedure), already-named-by-canon?, home (charter/whitepaper/world/…), tier-test result. Then dedup, cluster into instrument candidates, apply the home rule and exclusions, mint/promote names with collision checks.
**→ GATE: commit `docs-review/vmss-laws-latent-inventory.md`** — the full inventory: instrument → name (+ promoted/minted + rationale) → composed provisions → verbatim sources → tier → flags. **This file is Jason's doctrinal veto surface. If the time box expires here, the run succeeded** — authoring resumes from the committed inventory in a later session.

**Phase A — AUTHOR (only after the inventory is committed).**
1. Code entries on laws.html under the existing subject titles: `<article class="code-entry" id="code-fc-<slug>" data-tier="federal" data-instrument="founding" data-source="<page>#<anchor>">` (data-source = primary canon anchor; additional anchors in the meta grid). Visible badge `Founding corpus` beside the tier badge. R16 narrative bodies, 1–3 lines + meta (Name · Source(s) · Parent authority where class-2), verbatim-derived.
2. Register-intro cure on law-polling.html (exact placement judgment yours, text fixed): after the intro's "…and outcome." append: `Founding-corpus law &mdash; enacted whole with the Founding Treaty rather than through the ladders &mdash; carries no polling record; its consolidated statement lives in <a href="laws.html">VMSS Laws</a>.` Rerun build-law-toc; TOC must be byte-stable.
3. Register **R23** on pending-ratification.html beside R22, verbatim: "**Process ruling R23 — The Codification Sweep** (registered 2026-07-20, process record). Naming an instrument latent in the founding corpus is declaratory codification: the rule was always in force; the name is publication apparatus. Content controls over name. The sweep changes no rule, magnitude, right, or history, and creates no ladder record. Founding-corpus instruments are consolidated in VMSS Laws with their canon anchors as source; the Law Polling record remains the complete record of ladder enactments." Pin it in check-canon.
4. Guard extensions: founding entries exempt from the register-1:1 guard but subject to (i) `data-source` resolves to a real anchor in the named file; (ii) every founding entry carries ≥1 whitepaper or World-tier canon anchor; (iii) name-collision guard (no `code-fc` name equals any register `law-title` or existing Code entry name); (iv) `data-instrument` vocabulary ∈ {founding} (absent = register-derived). Mutation-test each new guard on a case where it must bite.

**Phase V — VERIFY (adversarial fan-out).** Every authored entry vs its verbatim sources: no content beyond the name; hedges intact; home rule honored (zero entries whose source is charter.html article text); tier test honored; naming-voice panel (does each minted name read as canon?); R13 sweep; the register completeness cure reads true against the founding-corpus claim. Confirmed findings → fix, re-verify. Report-then-fix is allowed in this run (unlike P4) but every fix is logged.

## 8. Ship spec

Branch: `feat/vmss-laws-latent-corpus` created from `feat/vmss-laws-v22.7.0` (PR #29 may merge under you; do not touch main or #29). Gates: check-canon 0 failures (report count vs 126), build:css clean, both TOC modes idempotent. Reports append to `docs-review/vmss-laws-latent-worklog.md`. Stop conditions as in the v22.7.0 handoff: last green state, record, never improvise doctrine. Push the branch when done (or when the time box expires with the inventory committed). No PR, no merge, no main.
