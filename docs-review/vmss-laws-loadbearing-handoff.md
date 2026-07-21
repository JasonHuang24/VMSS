# VMSS Charter — Load-Bearing Audit & Consolidation (Phase 3, data-driven)

Architect spec v1.0, 2026-07-21. Commissioned by Jason: only load-bearing Charter law remains at Charter tier; every other Charter-parked rule demotes to the tier the data indicates (federal, then layer-wide, then district — Charter XXVIII.III's own ordering). The decision procedure is explicitly **not** manual judgment: "This decision is not done by me manually, it's inferable data." This spec therefore replaces architecture §5's hand-built category table as *procedure* while retaining it as *validation prior* (§5 below).

Status: **RUN L1 COMPLETE AND RATIFIED — RUN L2 READY TO LAUNCH** (2026-07-21). L1 shipped at `aae169f` (graph + register), architect-reviewed and accepted with three binding errata (`vmss-laws-loadbearing-review.md` @ 9d05e20), and **Jason personally ratified the register with the errata** (§13). The §15 launch block is Run L2's entry point. Historical note — L1's launch context follows: Both launch conditions were satisfied: F1 landed and the latent sweep merged as the `canon v22.8.0` squash (tag v22.8.0; landing method ratified per final-review E-F2). The branch `feat/charter-loadbearing-audit` exists on origin, spec-synced from canon v22.8.0 main — the executing session checks it out, never recreates or rebases it. Execution model per Jason's token-division directive: the architect session (Fable) specifies and reviews; the Opus session mines and authors. An architect-side extraction start was aborted for this reason; its partial output survives as `documents/charter-provision-nodes.draft.json` (unverified seed, Preamble–XXIV only — verify or regenerate). Gates (1) and (2) are satisfied: the sweep completed Fix Pack B + Phase A + Phase V at b3303a1 and the architect reviewed it green (final review, 2026-07-21). Go-signal for L1 is given under delegated orchestration, effective at the merge; the §11 launch block is the run's entry point. **Not delegated:** the Run L1 → L2 gate (§7) — Jason personally ratifies the demotion register and the proposed amendment record before any enactment, because L2 authors in-world constitutional history. Never launch a stale spec: if the latent sweep's outcome contradicts anything here, this file is revised first.

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

## 12. Architect's L1 review checklist (runs when the Opus session pushes)

- Recheck gates independently: check-canon green; graph JSON committed and well-formed; worklog milestones present.
- Edge-typing audit: spot-extract ~20 edges myself across surfaces and compare types (E1/E2 vs E3 — the classification hinges on this line).
- Completeness critic's claims re-verified, not inherited (the Phase M lesson: self-testimony is not proof).
- Classification vs the architecture §5 prior: every divergence carries evidence; none silently adopted or suppressed.
- Demotion candidates: evidence trail holds per candidate; receiving-instrument order respected; E3 worklist and E4 anchor list complete.
- Inherited residual: spot-check docs-review/vmss-laws-latent-mining/cluster-architecture.md for instrument-shaped content absent from the 61 — a latent-set miss would surface here as missing E1 edges.
- Amendment text + event record are PROPOSALS only; nothing enacted; magnitudes byte-identical in every proposed relocation.

## 13. Ratification record (the Run L1 → L2 gate, closed)

**Jason ratified the register with the architect's errata, 2026-07-21.** Verbatim: *"I ratify the
register with your errata — draft the L2 handoff."* Review basis:
`docs-review/vmss-laws-loadbearing-review.md` (architect, same date, register accepted at
`aae169f`). The ratification covers:

- **The five clause-level demotions** with target tier Federal and receiving instruments as
  registered: III.II per-hour cascade → **the Overtime Premium Protocol** (new schedule
  instrument, name promoted from charter.html:190); III.IV forfeiture band and III.V retention
  bands → **the Central Banking Authority** (founding instrument #3); III.VII/VIII triggers,
  rates, and windows → **LP-069 + LP-070**; XXVII escalation rate → **LP-064**.
- **III.V's 24-month lookbacks → the Central Banking Authority**, per the architect's
  recommendation adopted at ratification (register §13.3 left the pick open; the review
  recommended keeping the whole III.IV/III.V settlement family in one instrument).
- **The two hard-case keeps** (XXV.I–III; III.IV's gradient ranges) and refinements **D-1–D-5**.
- **Errata E-L1–E-L3** (review doc) as binding on L2's drafting: E-L1 — charter.html:202's
  restatement of III.V's band endpoints relocates with the III.V schedule, the sentence keeping
  pointer form; E-L2 — the XXVII edit is occurrence-complete across the whole of charter.html:423;
  E-L3 — the register's §6 Case A count line is corrected.
- **The §11 event-record proposals**: number LP-076; title *The Enabling Consolidation Amendment*;
  in-world dates **Filed 2296, Vote Concluded 2299**; the first-success-in-seven framing (it
  passed because it changes no number and no right); and **licence to author the enacted-entry
  idiom** — the one authored-canon item §11 flagged — at minimal delta from the seven failed
  entries' form.
- **Canon defects**: F-1–F-4 are fixed in L2 as an errata commit; F-5 only if a provable citation
  exists (else recorded); **F-6 (the External Force Doctrine's dangling Charter reference) stays
  open as a doctrine question for Jason — not L2 scope**; F-7 is superseded by the graph.

Still reserved to Jason: the **merge veto** — his read of the rendered amendment after the
architect's L2 review, before any PR to main.

## 14. Run L2 execution spec (supplements §7–§8; the register as amended is the content authority)

**Branch:** `feat/vmss-laws-v23.0.0`, created from `origin/feat/charter-loadbearing-audit` (which
carries the graph, the register, and the review). Never touch the L1 branch again; never main.

**Ordering — promote before removal, green at every commit.** A demoted magnitude must land in its
receiving instrument before (or in the same commit as) it leaves charter.html; no commit may leave
a magnitude homeless or check-canon red. Guard retargets land in the same commit as the content
change they pin whenever an intermediate state would otherwise be red.

1. **Record-keeping commit:** fold E-L1/E-L2/E-L3 into the register text; add a RATIFIED line to
   the register's status header citing §13 and the review doc.
2. **Receiving instruments (laws.html):** the Overtime Premium Protocol authored as a new
   federal-tier Code entry sourced to LP-076; the Central Banking Authority entry gains the III.IV
   forfeiture band, the III.V retention schedule, and both 24-month lookbacks; LP-069/LP-070 gain
   the III.VII/VIII triggers, rates, and windows; LP-064 gains the 50%-per-child escalation rate.
   Every relocated magnitude **byte-identical as printed** (`$15.63`, not $15.625 — string
   comparison, never arithmetic). Amending a founding entry (the CBA) follows the Code's existing
   amendment idiom — derive it from house pattern; if none exists, a minimal "(as amended by
   LP-076)" provenance note, flagged in the worklog. New entries are **not**
   `data-instrument="founding"` — they are enacted under LP-076; the founding count guard's 60
   must not move.
3. **The event record (law-polling.html):** LP-076 in the #charter-amendments section per the
   ratified §11 proposal — Scope string verbatim, threshold string as 6 of 7 entries carry it,
   Canon Anchor as proposed, Main Layer ratifying at the lower end of the 80–90% band with the
   :286 gravity rationale stated, Presidential veto not exercised. Success idiom at minimal delta
   from the seven failed entries (badge class reused from the site's existing enacted styling
   where one exists; vote-table cells classed pass; closing commentary records the first success
   against the 7/7 record and why). **Stat cards move 89 = 7/60/22 → 90 = 8/60/22 — advertised and
   derived atomically.** If the pending-ratification pipeline idiom requires a companion
   Ratification Record entry, author it minimally within the licensed zone and flag it.
4. **charter.html amendment:** the five §10 replacement texts as ratified, plus E-L1's :202
   pointer-form fix and E-L2's full-:423 coverage. Every keep verbatim — the derivation sentence,
   the gradient ranges and their "not a fixed exchange rate" sentence, the involuntary-descent
   100%, all N-1 negative magnitudes ("There is no minimum wage in VMSS", "No minimum
   participation quorum is imposed", "There is no limit on consecutive terms", consensus-not-
   supermajority), every comma-exact hedge, the 2.5 target, children-held-harmless. No h2/h3 id or
   heading-text change; Tier-1 index stays 30 rows byte-equal. The LP-069 whitelist entry is
   **removed** (not emptied in place) in this commit, since charter.html:239's reference relocates
   here.
5. **Guards (per §8, plus the register's findings):** purity-guard expansion generated from the
   register's demotion set — **rule-scoped and occurrence-counting, never digit-scoped** (N-2), and
   collision-safe against LP-071's `90-99%` net-worth cap at rate-history.html:160,
   law-polling.html:2336, pending-ratify-tax-50-supplemental.html:139 (§4.2 warning);
   consolidation-fidelity guard string-comparing every relocated magnitude occurrence;
   negative-magnitude pins for the N-1 list at Charter tier; the §8b E5 retarget list worked
   through, including re-verifying the check-canon.mjs:533 comment's claim rather than inheriting
   it. **Every new or changed guard mutation-tested** — red for the reason under test, probes
   recorded in the worklog.
6. **E3 tier-attribution pass:** filter the graph for E3 edges targeting the five candidate
   provisions only. A surface that attributes a demoted magnitude to the Charter gets the
   systems.html:263 negative-citation pattern ("a federal-tier schedule under LP-076, not Charter
   text"); pure restatements without tier claims are untouched. The §7 alignment *gaps* (missing
   content on layer pages) are out of scope — recorded, not authored.
7. **Canon-defect errata commit:** F-1 (simulations.html:456 → XXV.II), F-2 (why-vmss.html:532 →
   III.V), F-3 (whitepaper.html:1692 → §9), F-4 (laws.html:765 LP-002 anchor → III.II); F-5 only
   with provable citation.
8. **Version v23.0.0** per the architecture §8 idiom — mirror what v22.8.0 touched (version log,
   footer, README lockstep).
9. **Phase V adversarial verification** and the worklog throughout
   (`docs-review/vmss-laws-loadbearing-worklog.md`, new "Run L2" section).

**Must-complete gate:** steps 1–5 and 8 pushed green (the amendment triad + guards + version).
**Should-complete:** steps 6–7; if the time box expires, push the last green state and record the
remainder in the worklog. Expected check-canon count: **above the 133 baseline** (new guards);
report the delta and the reason per guard.

## 15. Run L2 launch block (paste into a fresh Opus session, repo root)

```
You are executing Run L2 of the VMSS Charter load-bearing audit — the ENACTMENT run: the Enabling Consolidation Amendment, canon v23.0.0. Use ultracode for fan-out; every rule binds subagents. Jason has personally ratified the demotion register with the architect's errata (handoff §13) — you author in-world constitutional history exactly as ratified, nothing more.

Setup: verify `git remote -v` → JasonHuang24/VMSS. Create feat/vmss-laws-v23.0.0 from origin/feat/charter-loadbearing-audit (git fetch origin && git checkout -b feat/vmss-laws-v23.0.0 origin/feat/charter-loadbearing-audit). Per §9's history discipline: no history rewrite, no force-push, no tag operations. Read fully, in order: docs-review/vmss-laws-loadbearing-handoff.md (§13 ratification record and §14 execution spec govern THIS run; §7–§10 background), docs-review/vmss-laws-loadbearing-register.md (the ratified content authority — §4 candidates, §10 amendment text, §11 event record, §8/§8b guard lists, §13b findings N-1/N-2), docs-review/vmss-laws-loadbearing-review.md (errata E-L1–E-L3 bind your drafting; O-L1 tells you how to consume the graph), docs-review/vmss-laws-architecture.md, docs-review/vmss-laws-opus-prompts.md Prompt 0 (hard rules). The graph documents/charter-dependency-graph.json drives the E3 pass — apply the criticFindings corrections and discount narrative-source E1/E2 before any in-degree reasoning.

House facts: (1) subagent structured returns have a 64k output-token ceiling — chunk surfaces, keep returns terse; (2) law-polling.html's stat cards are ground truth for register parses AND this run changes them: 89 = 7/60/22 becomes 90 = 8/60/22, advertised and derived atomically; (3) the extended parsers in tools/check-canon.mjs (codeEntries) and tools/build-law-toc.mjs are the canonical readers; laws.html's 60 data-instrument="founding" entries and their count guard must not move — new entries are enacted under LP-076, never marked founding; (4) magnitudes relocate byte-identical AS PRINTED ($15.63, not $15.625) — string compare, never arithmetic; if any number would change, STOP; (5) the purity/fidelity guards you write must be rule-scoped and occurrence-counting, never digit-scoped — LP-071's 90-99% net-worth cap shares III.IV's digits on three surfaces and must not collide.

Execute §14's ordering — promote before removal, check-canon green at EVERY commit, guard retargets atomic with the content they pin: (1) fold errata E-L1/E-L2/E-L3 into the register + RATIFIED header; (2) receiving instruments in laws.html (Overtime Premium Protocol new under LP-076; Central Banking Authority gains III.IV band + III.V schedule + both lookbacks; LP-069/070 gain III.VII/VIII; LP-064 gains the 50% rate); (3) LP-076 in law-polling.html per the ratified §11 proposal (Filed 2296, Concluded 2299; success idiom at minimal delta from the seven failed entries; stat cards to 90 = 8/60/22); (4) charter.html amendment — the five §10 replacement texts + E-L1's :202 fix + E-L2's full-:423 coverage, every keep and hedge verbatim, no h2/h3 id or heading-text change, Tier-1 stays 30 rows byte-equal, LP-069 whitelist entry REMOVED; (5) guards per §14.5, every one mutation-tested; (6) E3 tier-attribution pass (candidate provisions only, systems.html:263 pattern); (7) canon-defect errata F-1–F-4 (F-5 only if provable); (8) version v23.0.0 mirroring the v22.8.0 idiom; (9) Phase V adversarial verification. Worklog: docs-review/vmss-laws-loadbearing-worklog.md, new Run L2 section; judgments beyond spec flagged; commit messages end "Co-Authored-By: Claude Opus <noreply@anthropic.com>".

Gate: must-complete is steps 1–5 + 8 pushed green; should-complete 6–7. Hard time box: ~2 hours of usage — sequence so the must-complete core is committed and pushed before it expires; commit and push at every completed milestone (git push -u origin feat/vmss-laws-v23.0.0). Expected check-canon: above the 133 baseline (new guards) — report the delta per guard. Stop conditions per the latent handoff §8: any unresolvable gate, any temptation to weaken a check, any doctrine authorship beyond the ratified licence → stop at last green state and record. When pushed, STOP: the architect reviews, then Jason takes his veto read of the rendered amendment. No PR, no merge, never main.
```

## 16. Architect's L2 review checklist (runs when the Opus session pushes)

- Diff audit: charter.html edits confined to the ratified spans (:190, :201, :202, :206, :209–215,
  :216, :230, :232, :235, :239, :242, :423); every keep sentence byte-identical pre/post; anchors
  and heading text unchanged; Tier-1 index 30 rows byte-equal.
- Byte-identity, mechanically: every demoted magnitude present in its receiving instrument exactly
  as previously printed; occurrence count of every demoted magnitude in charter.html = 0,
  **rule-scoped** (LP-071's 90-99% elsewhere untouched); E-L1's :202 and E-L2's :423 handled.
- Guards: no guard deleted or weakened; whitelist empty by removal; every new/retargeted guard's
  mutation probe re-run by the architect; the :533 comment re-verified, not inherited.
- LP-076: idiom delta vs the seven failed entries minimal and enumerable; dates 2296/2299; stat
  cards 90 = 8/60/22 advertised and derived; founding count still 60.
- check-canon green at every commit (walk the log); TOC modes idempotent; count delta vs 133
  explained per guard; build:css if any class changed.
- History discipline: no rewrite, no tags, only intended files touched.
- Then: **external peer review (§17)** → Jason's veto read of the rendered amendment → PR → squash
  lands as `canon v23.0.0` with the tag on the squash (Jason pushes the tag; this environment
  cannot).

## 17. External peer review — ChatGPT ("Sol"), planned 2026-07-21

**Why.** Every author and reviewer in this project so far is Claude-family (Opus executes, Fable
reviews). Intra-family adversarial checking cannot catch errors both models share by construction
— correlated blind spots are the one error class the current pipeline structurally cannot see. An
external, non-Claude peer breaks the correlation. This is a process-tier record; R13 (no founder
names in World-tier canon) is untouched — "Sol" appears in docs-review/ only, like every other
session name in this directory.

**Position in the sequence** — after the architect's §16 review accepts the L2 push, **before**
Jason's veto read and any PR:

1. Opus pushes `feat/vmss-laws-v23.0.0` → architect runs §16 (+ any fix round).
2. **Architect finalizes the Sol review brief** from the actual shipped state (skeleton below) and
   commits it as `docs-review/vmss-laws-sol-review-brief.md`; Jason pastes it into a ChatGPT
   session with the listed files attached.
3. Sol returns findings; Jason pastes them back verbatim; the architect commits the transcript
   (`vmss-laws-sol-review-findings.md`) and triages every finding into a dispositions record —
   accepted (→ a scoped Opus fix commit on the L2 branch) or rejected with evidence, the Fix Pack
   B pattern. Nothing is silently dropped.
4. Jason's veto read — now informed by both reviews — then PR, squash, tag.

Pre-merge placement is deliberate: findings land as branch fixes inside `canon v23.0.0` rather
than as a v23.0.1 errata after in-world constitutional history has shipped.

**Authority model.** Sol's review is **advisory** — findings, never edits, no authoring licence,
no ratification standing. Adjudication of contested findings is the architect's; anything
doctrinal escalates to Jason with the merge veto he already holds. A Sol finding cannot weaken a
guard or change a ratified decision by itself; it can only send one back to Jason.

**Scope — where external reading has power** (Sol cannot execute tooling; guards stay ours):

- **S-1 Procedural legitimacy:** does LP-076's record satisfy Article XI's gates *as the Charter
  itself states them* — order, thresholds, consensus mechanics, veto? Any hole in the in-world
  process trail?
- **S-2 Adversarial re-read of the decisions:** argue the other side of the five demotions and the
  two hard-case keeps; flag any demotion that changes a right in substance despite byte-identical
  magnitudes, and any keep that is really a parked parameter.
- **S-3 Cross-surface contradiction sweep:** does any amended passage contradict any other
  provided surface?
- **S-4 Voice and idiom:** does the amended Charter prose hold register; does the first-success
  entry read as the same civilization that wrote seven failures?
- **S-5 Fresh eyes:** anything two same-family models plausibly missed together — stated
  assumptions treated as facts, shared framing errors.

**Materials Jason attaches:** charter.html (amended) + the pre-amendment charter.html for diffing;
laws.html; law-polling.html; the register (as amended); the architect review. The brief instructs
Sol to return numbered, severity-tagged findings, each citing the exact text — findings only.

**Brief skeleton** (finalized post-§16 with real hashes and any run-specific flags): role and
advisory standing; the fiction frame (VMSS is a fictional civilization; review the law as law
*within* the fiction); the S-1–S-5 questions; the findings format; an explicit instruction that
proposing alternative drafting is welcome as a finding but nothing Sol writes is canon.
