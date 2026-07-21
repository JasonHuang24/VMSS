# VMSS Laws — Latent-Corpus Inventory: Independent Verification Record

**A second, independent Phase M pass — run as an outside audit of `docs-review/vmss-laws-latent-inventory.md`.**

This document was produced by a separate execution of the latent-corpus sweep (branch `feat/vmss-laws-latent-corpus`). That run mined the corpus and synthesised an inventory independently, then — on reaching the push step — discovered the branch already carried a committed Phase M gate (`b025015`, 61 instruments; provenance-corrected in `9a45fc5`). Rather than overwrite the established, more-complete deliverable, this run aligned to it and re-purposed its independent synthesis as the **cross-check the prior run explicitly said it lacked** — its own PART 4 verification is "*the synthesis agent's own unaudited claim about itself… Treat it as testimony, not proof*," and its accounting is "*off by one… the excluded set is not yet proven exhaustive*."

The headline result: **the two runs, mining independently with different tooling, converge on every core doctrinal call.** Independent convergence is the strongest available evidence that the inventory's judgments are sound. Where they differ, it is in granularity, not direction.

Baseline gate re-confirmed at audit time: `node tools/check-canon.mjs` → **126 passed, 0 failed** (the inventory and this record touch only `docs-review/*.md`, outside every check-canon sweep).

---

## 1. Convergence on the core doctrinal calls (independent corroboration)

| Call | Prior inventory | This independent run | Verdict |
|---|---|---|---|
| **The home rule is decisively exclusive** — the Charter articles carry their operative rules *verbatim*, so most of the whitepaper restates the Charter and excludes | PART 0 rule 1; 386 charter-home candidates excluded | Reached the same by direct reading of Articles I–XXVIII against the whitepaper; recorded the same exclusions ledger | **Converge** |
| **The handoff exemplar "the Currency Siloing Act" fails the home rule** — siloing + upward-conversion prohibition + downward channels are Charter III.IV article text; what survives is the central-bank institution | Architect note (a); instrument #3 **The Central Banking Authority** | Independently reached: my J-LATENT-2 → **Central Banking Authority Act (E1)**, same reasoning, same III.IV citation | **Converge (both runs, independently)** |
| **Phase A parser blocker** — `check-canon.mjs:590` and `build-law-toc.mjs:126` both require `data-tier="…" data-source="…"` *adjacent*; founding markup puts `data-instrument` between them → guards go vacuously green and the generator hard-fails on extraction-mismatch (:154) | Architect note (c) | Independently confirmed by inspection of both regexes + the :154 count | **Converge** |
| **Whitepaper anchor gap** — no per-section `<h2 id=` anchors, so Phase A guard (i) cannot resolve literally for whitepaper-homed entries | Architect note (b) | Confirmed: `grep -c '<h2[^>]*id='` on whitepaper.html → **0** | **Converge** |
| **PCD + SAD catalogue are regulatory-tier, register-absent → flag, never author** | PART 3 regulatory-tier flags (layers-sads-83…95) | Reached the same for the PCD (chartered 2230 under Article XXVIII, absent from register) via direct `sads.html` reading | **Converge** |

Instruments the two runs both surfaced by the same name (spot list): The Central Banking Authority, The Threshold Inhibition Protocol, The Secondary Observation Envelope, The Unified Transparency Doctrine, The Security Classification System, Authorized Bailout, The Continuity Integrity Act, The External Force Doctrine, The Orbital Sovereignty Act, The Sanctions ladder, The Federation Treaty, The Technology Transfer Tiers, The Territorial Doctrine, The Border Layer-Equivalence Mapping, The Transit-Right Doctrine, The Substrate Personhood Doctrine, plus the victim-restoration, leadership-restraint, and MGD instruments. The prior run additionally covered the World-tier *pages* (systems / technologies / world / layers / simulations / path2) that this run's slower mining fan-out did not reach in the time box — which is why its catalogue (61) is the more complete of the two and is correctly the gate.

## 2. Independent mechanical verification (addressing the prior run's unaudited PART 4)

Re-run from scratch against the committed sources, not trusting the prior run's self-report:

- **Name collision — 0/61.** Extracted all 61 instrument names; checked each for exact equality against the corpus of 89 existing titles (register `law-title` ∪ `laws.html` Code entries). **0 collisions.** Confirms PART 4 §1.
- **Reserved-phrase heads — 0.** None of the 61 names carries a Charter/register-reserved phrase as its head ("Currency Siloing", "mega-wall", "Automation Dividend Treasury", "Savings Circulation Mandate", "Enforcement Escalation Ladder", "Military Capability Doctrine"). Confirms the PART 4 §1 deliberate-avoidance list.
- **Name form — clean.** No number, date, or acronym appears in any minted name (inspection of all 61). Confirms PART 4 §3.
- **Home-rule spot-check — holds.** Sampled #3 (Central Banking Authority — excludes III.IV siloing ✓), #4/#5 (Dividend Sourcing / Layer Provisioning — class-2 under III, magnitudes excluded ✓), #61 (Clean-Record — flagged against II/VIII, not minted as fact ✓) against Charter article text read directly. Each honours the home rule. Confirms PART 4 §2.
- **Phase A blockers — real, not theoretical.** Both parser regexes and the whitepaper anchor gap confirmed by direct inspection (see §1). These are the highest-risk Phase A items and must be fixed (optional `data-instrument` capture + explicit partition out of guards a1/a3/b/a4; generator extraction reconciliation; a whitepaper-`<h2>N.`-existence guard in place of literal anchor resolution) before any founding entry ships.

## 3. On the prior run's self-flagged gaps

- **Off-by-one accounting (1,321 vs 1,320; "one id unaccounted").** This is a *documentation/accounting* discrepancy in the provenance record, not an instrument defect — the correction commit (`9a45fc5`) already establishes "the decisions stand." Independent audit finds nothing in the instrument set that turns on the missing id. **However**, the prior run's own recommendation stands and this audit endorses it: **re-run the accounting mechanically and prove the excluded set exhaustive before Phase A treats any exclusion as final.** An independent re-derivation of the excluded pool is the one piece of verification neither run has closed.
- **Unaudited PART 4.** §2 above now supplies an independent (non-self) check of the collision, reserved-phrase, name-form, and home-rule claims. The provision-level id→quote traceability (PART 4 §4) was *not* re-verified id-by-id here (this run did not reproduce the prior run's 1,320-candidate pool); that remains the prior run's own testimony and is the natural target of a Phase-V adversarial fan-out.

## 4. Discrepancies and notes for Jason

- **Granularity, not direction.** This run's independent synthesis consolidated to ~21 founding acts + class-2 specs; the prior run split to 61. Both are defensible under §5 ("*let the mining decide the true number and justify it*"); the prior run's granularity is justified in its Counts note (the external-relations family carries many distinct canon proper names that rule 2 forbids merging). No instrument this run named is absent from the prior catalogue; the prior catalogue is the superset.
- **Convergent contradiction flags.** The prior run's PART 3 "contradictions" list (esp. the **phantom charter prohibition on territorial expansion** — world.html asserts a "founding charter" ban on acquisition-by-force that charter.html does not contain; and the **Security Classification "constitutional" self-assertion** with no matching Charter text) are genuine and are corroborated by this run's Charter reading (the Charter's Article XXV carries clean-energy/nuclear/hacking/kill-switch/nanobot, but no territorial-expansion prohibition and no classification-tier text). These belong on Jason's veto surface.
- **No overwrite performed.** The prior committed inventory and worklog are untouched by this run; this record and the worklog note are additive. This run's fuller independent synthesis is preserved out-of-tree (session scratchpad) and can be surfaced if Jason wants the alternate consolidation as a comparison.

## 5. Verdict

The committed 61-instrument inventory is **sound on its core doctrinal calls, collision-safe, home-rule-disciplined, and name-form-clean**, independently corroborated by a separate mining run that converged on every headline judgment. The two open items before Phase A are the prior run's own: (1) a mechanical re-proof that the excluded pool is exhaustive, and (2) the two parser fixes + whitepaper-anchor-guard design. Neither blocks the gate; both are Phase-A prerequisites already recorded in the inventory's architect notes.
