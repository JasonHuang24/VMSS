# VMSS Charter — Load-Bearing Audit & Consolidation (Phase 3, data-driven)

Architect spec v1.0, 2026-07-21. Commissioned by Jason: only load-bearing Charter law remains at Charter tier; every other Charter-parked rule demotes to the tier the data indicates (federal, then layer-wide, then district — Charter XXVIII.III's own ordering). The decision procedure is explicitly **not** manual judgment: "This decision is not done by me manually, it's inferable data." This spec therefore replaces architecture §5's hand-built category table as *procedure* while retaining it as *validation prior* (§5 below).

Status: **RUN L1 IN EXECUTION — handed to a fresh Opus session** (2026-07-21). Both launch conditions were satisfied: F1 landed and the latent sweep merged as the `canon v22.8.0` squash (tag v22.8.0; landing method ratified per final-review E-F2). The branch `feat/charter-loadbearing-audit` exists on origin, spec-synced from canon v22.8.0 main — the executing session checks it out, never recreates or rebases it. Execution model per Jason's token-division directive: the architect session (Fable) specifies and reviews; the Opus session mines and authors. An architect-side extraction start was aborted for this reason; its partial output survives as `documents/charter-provision-nodes.draft.json` (unverified seed, Preamble–XXIV only — verify or regenerate). Gates (1) and (2) are satisfied: the sweep completed Fix Pack B + Phase A + Phase V at b3303a1 and the architect reviewed it green (final review, 2026-07-21). Go-signal for L1 is given under delegated orchestration, effective at the merge; the §11 launch block is the run's entry point. **Not delegated:** the Run L1 → L2 gate (§7) — Jason personally ratifies the demotion register and the proposed amendment record before any enactment, because L2 authors in-world constitutional history. Never launch a stale spec: if the latent sweep's outcome contradicts anything here, this file is revised first.

---

## 1. Mission

Article XI's own text names the standard: the founding core is "load-bearing rather than cemented" (charter.html:289), and XXVIII.III declares the four-tier hierarchy absolute (charter.html:448, 451–458). This project applies that standard to the entire Charter. Every provision either carries structural load — lawmaking machinery, layer-membership criteria, rights and grants, principles, or text the corpus demonstrably derives authority from — or it is an operative parameter that founding history parked at constitutional tier. The former remain Charter text. The latter are demoted through the in-world lawful route (§7), **at byte-identical values**, into receiving instruments that now exist because the latent sweep ran first.

"Prune" never means delete, and never means fewer articles. The Tier-1 index stays at 30 rows (Preamble + 28 articles + Founding Affirmation; guard 7.3d). What leaves an article is its enumerated schedule; what replaces it is an enabling grant plus the principle — the exact pattern v22.7.0 proved on III.III (charter.html:196: "The Charter fixes the principle … and reaches no rate.").

## 2. Sequencing — why this runs after the latent sweep

1. **The decision data is incomplete until latent law is explicit.** Load-bearing status is computed from the corpus dependency graph (§3). Latent, unnamed law carries edges into the Charter that the graph cannot see until the sweep names those instruments and records their parent authorities. Pruning first computes load-bearing on a graph known to be missing edges — the exact failure mode the data-driven mandate exists to prevent. A provision that looks parameter-only today may be revealed as the constitutional basis of a founding-corpus instrument tomorrow.
2. **The receiving instruments are the sweep's output.** Demoted schedules need federal-tier instruments to land in. The sweep creates them (e.g., the Overtime Premium Protocol — canon-named in charter III.II itself — is the natural home for the III.II overtime schedule). Without them, demotion would have to mint instruments ad hoc, duplicating the sweep's naming assignment under worse discipline.
3. **Canon-event economics.** The latent sweep is declaratory codification (R23 class — no in-world event). This project is an in-world Article XI amendment — the first successful one against a 7/7 failure record, a major canon event. Running the declaratory work first means the amendment is drafted once, against a complete Code, as one omnibus instrument — not re-opened when the corpus shifts under it.

## 3. Run L1 — the dependency graph (the data)

Build a full citation/dependency graph over the corpus. Every claim in the demotion register (§6) must trace to graph rows with file:line evidence. Derive everything from the current working tree — never trust this spec's snapshots of counts or line numbers.

**Nodes:** every Charter provision (walk charter.html h2/h3 structure, then split article bodies into separable rule units — a schedule, a prohibition, a grant, a procedural rule each count separately); every register instrument (LP entries, all statuses); every founding-corpus instrument from the latent sweep (Code entries with `data-instrument="founding"` + the inventory rows); every process ruling (R-series); every doctrine surface section that states a rule (whitepaper §§, systems, technologies, world, layer dossiers, faq).

**Edge types — the classification lives or dies on typing edges correctly:**
- **E1 authority-derivation:** an instrument or rule states it operates *under* the provision ("through the Article XXV.VI ladder", "chartered under Article XXVIII", the inventory's `parent-authority` field, LP register prose naming its enabling article).
- **E2 constitutive dependency:** another in-force rule's operation requires the provision's content (Article VI's -3 federal floor triggers cite "absolute federal laws (Articles XXV.I–XXV.III)" at charter.html:262; XXVII's escalation binds to III.III's untaxed absolute; XII/XIII exemptions reference VII's phasing definition).
- **E3 parametric restatement:** a surface restates the magnitude (systems/faq/layer-page rate blocks, whitepaper mirrors). **E3 edges confer no load-bearing status** — restatements follow the law to whatever tier it lives at; they are the alignment worklist for L2, nothing more.
- **E4 navigational:** links, TOCs, deep links (simulations.html article anchors). Not evidence of anything except anchor-stability constraints for L2.
- **E5 tooling pins:** check-canon guard strings targeting Charter text. Process-tier constraints on implementation order (retarget-never-delete), not in-world dependencies.

**Extraction is multi-modal** (each mode blind to the others, ultracode fan-out): by citation string ("Article X", "Art. X", "§", anchor hrefs), by magnitude string (every $-amount, %, ratio, threshold, and window in charter.html, grepped corpus-wide), by instrument name, and by close reading of each surface for unmarked dependencies. A completeness critic then verifies: every operative magnitude and every deontic clause in charter.html appears in exactly one node's classification input — no silent skips.

**Committed artifacts:** `documents/charter-dependency-graph.json` (machine-readable: nodes, typed edges, file:line per edge — follows the documents/ `*-data.json` convention) and the human-readable register (§6).

## 4. The load-bearing test

A Charter provision is **load-bearing** iff at least one of:

- **L1 — Machinery.** It defines lawmaking, adjudication, or enforcement machinery (XI gauntlet; XXI Court; XXII Meritboard/executive; XXV.IV–VI enforcement and ladder; XXVIII petition mechanics). All legality flows through these; maximal E1 in-degree by construction.
- **L2 — XI-locked membership criteria.** Charter.html:292 locks "behavioral thresholds, phasing mechanics, descent triggers, or the permanence of reassignment" to the Article XI process. Includes the 85-point floor. Demoting these would change *who can change them* — a rights alteration, not tier hygiene.
- **L3 — Rights, grants, principles.** The provision allocates rights or power, or fixes a principle, rather than enumerating an operative parameter (kind test — e.g., UBI-as-birthright, children held harmless, the progressive-burden principle, the two-instrument doctrine).
- **L4 — Constitutive in-degree.** ≥1 E1 or E2 edge from an in-force rule. (E3/E4/E5 never count.)

**Demotion candidates:** provisions that are operative parameters — schedules, rates, bands, triggers, lookbacks, curves — whose corpus in-edges are E3/E4/E5 only. For each candidate the register records: target tier via the architecture's tier test (scope: cross-layer → federal; single-layer → layer-wide; district → district); receiving instrument via the **receiving-instrument rule** — an existing enacted LP already holding the mechanics (e.g., LP-064 for the XXVII curve mechanics) > a founding-corpus instrument from the latent sweep covering the domain > a new schedule instrument enacted by the amendment itself, in that strict order; and the complete edge evidence.

Mixed provisions split at clause level: III.II's *time-dividend grant and no-minimum-wage stance* are L3; its *$125/$62.50/$31.25/$15.63 schedule* is a candidate. The v22.7.0 III.III trim is the worked example of the split.

## 5. Validation prior — architecture §5 as expected output

The manual table (§5 categories: machinery and membership never candidates; category B: III.II overtime schedule, III.V retention bands, III.IV forfeiture range, III.VII–VIII SCM triggers/rates, 24-month lookbacks, XXVII curve-split; category C keeps: III.I UBI amounts, XXIII/XXIV trajectories, STI 10:1) is the prior, not the procedure. The computed register must either reproduce it or show the edge evidence for each divergence. **Divergences are findings for Jason, never errors to suppress and never silently adopted.** Two known hard cases the data must adjudicate honestly: XXV.I–III (absolute federal laws living as Charter articles — expect heavy E2 in-degree from VI and the External Force Doctrine; likely load-bearing where they stand, but the graph decides) and III.IV's purchasing-power gradients (canon describes them as emergent, "not a fixed exchange rate" — possibly descriptive text, not law; classify explicitly either way).

## 6. Run L1 deliverables and gate

Commit, in one reviewable state: `documents/charter-dependency-graph.json` + **`docs-review/vmss-laws-loadbearing-register.md`** — for every Charter provision: classification (load-bearing L1–L4 with evidence, or demotion candidate), and for candidates: target tier, receiving instrument, edge table, plus the E3 alignment worklist and E4 anchor-stability list for L2; the proposed amendment text (enabling grants, per §7); and the proposed in-world event record (see §7 — this is the one place new canon history is authored, so it ships as a *proposal* here). Push the branch. **STOP.**

The register is Jason's ratification surface — the D1–D5 pattern. If the time box expires with graph + register committed, the run succeeded. No Charter edit, no laws.html edit, no guard change occurs in L1.

## 7. Run L2 — enactment (gate: Jason has ratified the register)

The in-world mechanism is the architecture's **Enabling Consolidation Amendment**: one omnibus Article XI amendment that replaces each ratified candidate's enumerated schedule with an enabling grant + retained principle, while the schedules are re-enacted at the target tier **at identical values** in their receiving instruments. First successful Charter amendment against the 7/7 record — plausibly *because* it changes no number and no right; the drafting must keep that property provable. Scope of work:

1. **Canon event, full pipeline:** amendment text; gauntlet narrative at XI's thresholds; record in law-polling.html's #charter-amendments section in that section's own idiom (derive from the 7 failed entries); Ratification Record process pages as the pending-ratification pipeline idiom requires; in-world dating consistent with the site's present (post-2295 — derive from canon, flag the chosen date for review). This is the sole licensed zone for authored history in the project, and only as ratified in L1's register.
2. **charter.html edits:** per-candidate enabling-grant replacements (III.III pattern); every remaining article untouched; no h2/h3 id changes; Tier-1 index equality preserved.
3. **laws.html + register:** demoted schedules appear in their receiving instruments' Code entries citing the amendment + the receiving instrument; the amendment itself becomes a Code-visible instrument per the Code's own conventions.
4. **Site-wide alignment**, driven mechanically by L1's E3 worklist: every surface restating a demoted magnitude gains correct tier attribution (the §6-of-the-architecture pattern, now computed instead of hand-found).
5. **Version v23.0.0** (architecture §8), footer + README lockstep.

## 8. Guard changes (L2, same commit discipline as v22.7.0 Prompt 2 — CI never sees an intermediate state)

- **Purity-guard expansion:** charter.html must match no magnitude in the ratified demotion set (list generated from the register, not hand-kept); the LP-069 whitelist entry at charter.html:239 is cured here per the architecture's Phase 3 TODO — expected post-L2 whitelist: empty, or each survivor justified in the register.
- **Consolidation-fidelity guard:** every demoted magnitude appears byte-identically in its receiving surface — the vintage-guard discipline made permanent.
- **Existing guards:** Tier-1 count/text-equality unchanged at 30; all E5 pins retargeted, never deleted; every new/changed guard mutation-tested on a case where it must bite (worklog records each probe, the P4 lesson: a red build is not evidence unless red for the reason under test).

## 9. Hard rules (unchanged from the house rules; binding on every subagent)

No invented doctrine outside §7.1's licensed zone; hedges verbatim; naming table (architecture §2.3) binding — this project adds one row: **the Enabling Consolidation Amendment** (always full name on first use per page); R13 (no founder-as-actor, no seat names World-tier); R16 entry style; never delete a failing check to go green; magnitudes byte-identical everywhere — if any number would change, stop, that is a different project. **History discipline (added after the v22.8.0 normalization, final-review E-F2):** no history rewrite, no force-push, and no tag create/move/delete in any run unless the launch block explicitly instructs it; a run that receives such an instruction records it verbatim in its worklog. "Touch nothing else" means exactly that.

## 10. Ship spec

Run L1 branch: `feat/charter-loadbearing-audit`, created from the latent-corpus branch's final state (or main if it has merged — the graph must include the founding corpus). Run L2 branch: `feat/vmss-laws-v23.0.0`, from L1's ratified state. Worklog: `docs-review/vmss-laws-loadbearing-worklog.md`, per-phase reports (files + deltas, check-canon pass count vs the then-current baseline — derive it at branch time, judgments flagged). Gates: check-canon 0 failures; build:css clean; both TOC modes idempotent. Stop conditions as in the latent handoff §8: last green state, record, never improvise doctrine. Push the branch when done or when the time box expires with the gate artifact committed. No PR, no merge, never main.

## 11. Run L1 launch block (paste into a fresh Opus session, repo root)

```
You are executing Run L1 of the VMSS Charter load-bearing audit — the data phase ONLY. Use ultracode for fan-out; every rule binds subagents. Hard boundary for this run: no charter.html edit, no laws.html edit, no guard change — deliverables are docs-review/ and documents/ artifacts exclusively.

Setup: verify `git remote -v` → JasonHuang24/VMSS. Check out feat/charter-loadbearing-audit — it EXISTS on origin, spec-synced from canon v22.8.0 main; do not recreate it, do not rebase it, and per §9's history discipline: no history rewrite, no force-push, no tag operations. Read fully, in order: docs-review/vmss-laws-loadbearing-handoff.md (the spec for THIS run — §3–§6 define the deliverable, §9 hard rules, §10 ship spec), docs-review/vmss-laws-architecture.md (§5 is the validation prior), docs-review/vmss-laws-latent-inventory.md (the B8 parent-authority and charter-touchpoints fields seed your E1 edges), docs-review/vmss-laws-latent-dispositions.md and vmss-laws-latent-final-review.md (ratified judgments you inherit), docs-review/vmss-laws-opus-prompts.md Prompt 0 (hard rules). documents/charter-provision-nodes.draft.json is an UNVERIFIED partial node seed (Preamble–XXIV) from an aborted architect-side start — use it only as a cross-check; verify every row against charter.html or regenerate; the graph you commit is yours to stand behind.

House facts you'd otherwise learn the hard way: (1) subagent structured returns have a 64k output-token ceiling — the Phase M run lost an entire clustering lens to it; chunk large surfaces across more agents and keep per-edge output terse; (2) law-polling.html's entry markup varies and its own stat cards (89 = 7/60/22) are ground truth for any register parse; (3) laws.html carries 60 data-instrument="founding" entries — the extended parsers in tools/check-canon.mjs (codeEntries) and tools/build-law-toc.mjs are the canonical way to read them; (4) three check-canon sweeps glob every root .html file, but this run touches none — your artifacts live in docs-review/ and documents/ only.

Execute per the handoff: §3 build the typed dependency graph (multi-modal extraction — citation strings, magnitude strings, instrument names, close reading; completeness critic proves every Charter magnitude and deontic clause classified exactly once) → commit documents/charter-dependency-graph.json. §4 apply the L1–L4 load-bearing test per provision, edge-typed (E1/E2 confer status; E3/E4/E5 never do). §5 validate against the architecture §5 prior — divergences are findings with evidence, never suppressed and never silently adopted. §6 commit docs-review/vmss-laws-loadbearing-register.md: full per-provision classification; demotion candidates with target tier, receiving instrument (strict order: enacted LP holding the mechanics > founding-corpus instrument > new schedule instrument), and edge evidence; the E3 alignment worklist and E4 anchor-stability list; the proposed amendment text and proposed in-world event record AS PROPOSALS — nothing enacted. Worklog: docs-review/vmss-laws-loadbearing-worklog.md.

Gate: the register is the must-complete deliverable — if the time box expires with graph + register committed, the run succeeded. Hard time box: ~2 hours of usage — sequence so the graph, then the register, are committed and pushed before it expires. Commit and push at every completed milestone (nodes → graph → classification → register), not only at the end (git push -u origin feat/charter-loadbearing-audit). check-canon must stay green throughout (you touch only docs artifacts). When the register is pushed, STOP: Jason personally ratifies it before any Run L2 enactment exists. No PR, no merge, never main.
```
