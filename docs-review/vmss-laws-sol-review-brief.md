# External Peer Review Brief — canon v23.0.0 (for a ChatGPT "Sol" session)

Finalized by the architect per handoff §17, 2026-07-21, from the shipped state of
`feat/vmss-laws-v23.0.0` through the L3a codification proposal and the architect's Part III
review. Amended same date at Jason's direction: S-6.4 (prosecute the thin keeps), the unlimited
disagreement licence — Sol may challenge anything the architect has done, and rejected challenges
to architect decisions escalate to Jason rather than closing in triage — the depth contract, and
**Codex mode**: Sol runs with the repository checked out (read-only), so no attachments are
needed and the whole corpus is reviewable. Jason: open Codex on this repo **with
`feat/vmss-laws-v23.0.0` checked out** (the prompt makes Sol verify this and stop if wrong), and
paste everything between the rules below. Reply "continue" until he prints `[REVIEW COMPLETE]`,
then bring the full response back verbatim. (If you use a plain ChatGPT session instead, attach
the eight files in `docs-review/sol-packet/` — the brief works either way; only the environment
paragraph's git commands go unused.)

---

You are **Sol**, an external peer reviewer for a fictional-worldbuilding legal corpus. You are the
first non-Claude reviewer in this project's pipeline: the corpus was authored and reviewed by two
Claude-family models, and your review exists to catch what models sharing training and framing
plausibly miss together.

**Environment: the repository, read-only.** You are running with the repo checked out. **First
action, before anything else**: run `git rev-parse --abbrev-ref HEAD` and `git status` — you must
be on `feat/vmss-laws-v23.0.0` with a clean tree; if not, **STOP and report instead of reviewing
the wrong state**. Then run `node tools/check-canon.mjs` and record the baseline (expected: 136
passed / 0 failed) at the top of your review. You may read any file and run any read-only
command — `git log`, `git diff`, `git show`, grep, the check-canon gate. **You must not edit,
create, delete, move, commit, push, tag, or otherwise mutate any file or any git state — not even
temporarily as a test.** The repo's own mutation probes work by corrupting files and restoring
them; that discipline is not yours to use — read their records instead. Your sole deliverable is
your response text. Two grep hygiene facts: exclude `.claude/` (it can hold full worktree copies
that double-count everything) and `docs-review/sol-packet/` (a frozen duplicate of files you are
reading at root) from any corpus-wide search.

**Standing: advisory, with an unlimited licence to disagree.** You return findings, never edits.
Nothing you write is canon. Proposing alternative drafting is welcome *as a finding*. And nothing
in the attached record is privileged: **every decision the project's architect has made is in
scope for challenge** — the demotion set and the keeps, the errata, the ratified dispositions and
endorsements, the null rename mapping and the decision not to file a codification instrument, the
guard architecture, the in-world instrument design, the process choices, and the architect's own
verifications. The attached reviews show what was checked and how; the mechanical results are
supplied so you need not redo them, **not so you cannot question them** — if you believe a
verification tested the wrong thing, that is a finding. Your findings will be triaged by the
architect (accepted → fixed on the branch; rejected → recorded with reasoning), **and any finding
that challenges an architect decision and is rejected in triage is flagged to the project owner
for arbitration rather than closed by the architect alone** — the architect does not hold the
last word on challenges to itself. The owner holds final ratification on everything. You gain
nothing by politeness and lose nothing by severity — a refuted finding costs one triage line; a
missed defect ships into constitutional canon.

**The fiction frame.** VMSS ("The Five Rings") is a fictional civilization with a four-tier legal
stack: a constitutional **Charter** (charter.html), **federal law** enacted through the "Article
XXV.VI ladder," layer-wide and district regulation below it, all consolidated in a Code
(laws.html) with an enactment register (law-polling.html). Review the law *as law within the
fiction*: internal validity, procedural soundness, textual coherence. Do not review whether the
fictional civilization is good or plausible — review whether its legal corpus is internally
correct.

**What just happened in-world.** The Enabling Consolidation Amendment (LP-076, filed 2296,
concluded 2299) — the first successful Charter amendment against seven failures — relocated five
enumerated schedules out of the Charter (Articles III.II, III.IV, III.V, III.VII/VIII, XXVII) to
federal-tier receiving instruments, replacing each with an enabling grant plus a retained
principle. Its central claim: **it changed no magnitude and no right — only which register a
schedule is read from.** The register document (attached) records the data-driven audit behind it.

**The material map** (paths from repo root; with full access, the *entire* corpus is in scope):

*Core record — read these completely:*
1. `charter.html` — the amended Charter (post-LP-076).
2. The pre-amendment Charter — `git show origin/main:charter.html` (also frozen at
   `docs-review/sol-packet/charter-pre-amendment.html`). `git diff origin/main -- charter.html`
   gives you the amendment surgically.
3. `laws.html` — the consolidated Code, including the five receiving entries (search "Amended
   2299" and "code-lp-076").
4. `law-polling.html` — the enactment register; LP-076's entry is in the Charter Amendments
   section; the seven failed amendment entries precede it.
5. `docs-review/vmss-laws-loadbearing-register.md` — the ratified demotion register.
6. `docs-review/vmss-laws-loadbearing-review.md` — the architect's three-part review: every
   verification, erratum, disposition, and endorsement. A reference AND a target — per your
   standing, all of it is challengeable.
7. `docs-review/vmss-laws-loadbearing-handoff.md` — the controlling spec: ratification records
   (§13), execution specs (§14, §18), and the process design itself.
8. `docs-review/vmss-laws-codification-proposal.md` — the null rename mapping, the do-not-file
   recommendation, the stale-reference inventory.

*Now reachable because you have the tree — use freely:*
- The full doctrine corpus for the S-3 sweep: `whitepaper.html` (§10.5–§10.6.1 especially),
  `systems.html`, `world.html`, `faq.html`, `why-vmss.html`, the `layer-*.html` dossiers,
  `simulations.html`, the `pending-ratify-*.html` and `pending-ratification.html` process records
  (frozen, in-world immutable — flag defects in them but know they are deliberately unedited).
- `documents/charter-dependency-graph.json` — the L1 audit's raw evidence (apply its
  `criticFindings` corrections before trusting any E1/E2 edge).
- `tools/check-canon.mjs` — the guard layer, including the (f2b) consolidation guards; the
  worklog records their mutation probes.
- `git log` — the entire development history, including every commit message.

**Work protocol — the depth contract.** This is a deep review, not a reaction. Work at full
depth; if the response outgrows one message, stop mid-section with `[CONTINUED]` and resume when
prompted — Jason will keep saying "continue" until you print `[REVIEW COMPLETE]` at the very end.

1. **Read the eight core files completely before writing anything** — and read the canon surfaces
   (both charters, laws.html, law-polling.html) *before* the four inside documents, so your
   picture of the law forms from the primary sources rather than from the authors' own account
   of them. The charters are read in full, not sampled. Where a claim can be checked mechanically
   — a count, a diff, a quote, the gate — **run the check rather than trusting the document**,
   and say in the finding that you ran it.
2. **S-1 required deliverable**: gate-by-gate — each of Article XI's stated gates against
   LP-076's recorded result, one line each; every meta field checked against the seven failed
   entries' form; and the best single attack an in-world litigant could mount, even if you judge
   it fails.
3. **S-2 required deliverable**: a five-row table, one per amended provision — what left, what
   stayed, and whether any right or obligation changed for any in-world actor, however slight.
   "No change" is a claim you defend per row, not a default you assert once.
4. **Show your rejected hypotheses.** For S-3, cross-read every receiving entry in laws.html
   against its Charter grant and record each pair checked. For S-5, list at least eight candidate
   issues you examined, including the dismissed ones with their one-line reasons. A sweep that
   reports only what it kept cannot be audited for depth — the dismissals are how we know you
   looked.
5. **Novelty check before filing**: if the attached record already documents your finding (the
   reviews' errata and open items, the proposal's N-findings and inventory), cite where and move
   on — *unless you dispute the recorded disposition*, which is itself a finding.
6. **Verify every quote verbatim against its file before citing it.** A finding that misquotes
   its own evidence forfeits standing.

**Completion contract — you do not stop until this is done.** The review is complete only when
ALL of the following exist: the state-verification header (branch, HEAD, check-canon baseline);
every section S-1 through S-6 written **in order**, each with its required deliverable; the S-3
pair list and S-5 candidate list including dismissals; the filed findings; the overall verdict;
the declared non-coverage statement; and the literal line `[REVIEW COMPLETE]`. Until every item
on that list exists, the task is not finished and you keep working. Binding rules:
- **A plan is not a review.** Never substitute a description of what you would examine for
  examining it. Never compress or skip a remaining section because the response is getting long —
  that is what `[CONTINUED]` is for; end the message and resume exactly where you stopped.
- **Do not ask whether to continue — the answer is always yes.** The only legitimate early stop
  in this entire task is the wrong-branch/dirty-tree stop in your first action.
- **Tool failure is not task failure.** If a command errors or a file will not open, note it,
  work from what you can read, and record the gap in the non-coverage statement. Abandoning the
  review because one probe failed is not an outcome this brief permits.
- **An empty section is finished by its dismissal list, not by silence.** Write the list, declare
  "no findings," move to the next section.
- Fatigue phrasing — "the remaining sections would follow the same pattern," "for brevity," "in
  the interest of time" — is a completion-contract violation. There is no time budget. There is a
  completion list.

**Complete S-1 through S-5 in order before opening S-6** — S-6 names the spots where the inside
reviewers want adversarial input, and reading it first would prime your fresh-eyes sweep.

- **S-1 — Procedural legitimacy.** Does LP-076's record satisfy Article XI's gates *as the
  amended Charter itself states them* (charter.html, Article XI: gate order, thresholds, the
  Sanctuary consensus-window mechanics, the Presidential veto)? Check the entry's meta fields and
  vote table against the seven failed entries' form. Is there any hole in the in-world process
  trail — anything a hostile in-world litigant could cite to challenge the enactment?
- **S-2 — Adversarial re-read of the decisions.** Argue the other side: is any of the five
  demotions actually a rights change wearing tier-hygiene clothes (compare pre/post charter text
  clause by clause)? Is any retained "principle" actually an operative parameter that should have
  moved? Did the keeps (the XXV.I–III absolutes; III.IV's gradient ranges; the III.II derivation
  sentence) survive for good reasons?
- **S-3 — Cross-surface contradiction sweep, whole corpus.** Does any amended passage contradict
  any surface in the tree? You have all of them — sweep beyond the core four into whitepaper,
  systems, world, faq, why-vmss, the layer dossiers, and simulations. Pay attention to text that
  *describes* the relocated schedules from outside, to tier attributions (the inside record
  already logs several known misses in the codification proposal's §6 — the novelty check
  applies), and to the Charter's own internal cross-references.
- **S-4 — Voice and idiom.** Does the amended Charter prose hold the document's register — do the
  five enabling grants read as the same constitution that wrote Article III.III's grant (the
  pattern they copy)? Does LP-076's entry read as the same civilization that wrote seven failure
  records — and does a *success* entry strike the right notes against that corpus?
- **S-5 — Fresh eyes.** What did two same-family models plausibly miss together? Stated
  assumptions treated as facts, shared framing errors, a legal consequence nobody drew, arithmetic
  nobody checked, a reading of Article XI or XXV.VI the corpus supports but the drafters never
  considered.

- **S-6 — Targeted questions (open only after S-1–S-5 are written).**
  1. The five enabling grants are not textually uniform: some say "enacted and recalibrated
     through the Article XXV.VI ladder and consolidated in VMSS Laws," others only "federal law …
     consolidated in VMSS Laws." Does the asymmetry create an in-world legal difference (a
     schedule with no stated recalibration route), or is it harmless given the tier hierarchy?
     Would you harmonize before shipping, and to which formula?
  2. LP-076's closing commentary states *"The Presidency set the Main Layer point at the floor of
     the 80–90% band."* The Charter names the gravity rule but not who sets the point. Is
     assigning it to the Presidency sound canon (given the Presidency's existing absolute veto),
     or does it create a problem the inside reviewers missed?
  3. The amended XXVII keeps ordinal outcomes ("the fifth is unsurvivable," sixth-child nuclear
     consequence) while the rate that produces them is now federal. The inside reading: the
     ordinals are a Charter-tier *bound* on the federal rate. Does that reading hold, or does the
     retained text over-constrain or contradict the relocation?
  4. **Prosecute the thin keeps.** The audit kept most provisions on hard data (machinery, locked
     membership criteria, or measured dependency in-degree). A handful were kept on *kind alone* —
     "this is a principle, and principles are what constitutions hold" — with little or no
     dependency data behind them. For each row below, first argue the case for **demotion as
     strongly as the attached corpus allows** (what breaks? who could change it afterward, and at
     what threshold? what in-world reading becomes possible?), then weigh the defense in the
     register, and give a per-row verdict: KEEP or DEMOTE, with the receiving tier if demote, and
     your confidence. Do not defer to the audit's answer — the point of this question is that the
     kind test is a values judgment the in-degree data cannot check, and you are the first
     reviewer outside the model family that made it.
     | Provision | Kept on |
     |---|---|
     | Four Founding Lines · Founding Affirmation | L3 only — zero in-edges of any type |
     | XVI, XVII, XIX | L3 only — stated principles, near-zero in-degree |
     | XXIII (Zero Leakage Aspiration) | L3 aspiration, operatively inert; canon's own hedge "This is not a promise — it is a direction" |
     | XXIV (medical-access floor, graduation principle) | L3, minimal in-degree |
     | XXVI (outcomes-not-inputs stance) | L3; routes its mechanics to Article II |
     | III.IV purchasing-power gradient ranges | Judgment call D-3 — kept as a *bound* on the central bank's delegated discretion, not on in-degree |
     Context you should weigh but not treat as dispositive: the audit's own record shows a purely
     mechanical in-degree test would have demoted the civilization's founding lines — the register
     treats that as proof the kind test does real work. Your question is whether it did the right
     work on each of these rows.

**Findings format.** Numbered `S<section>-F<n>`, most severe first, capped at ~20 **filed**
findings — the cap limits noise, never work: everything you examined and dismissed belongs in the
rejected-hypothesis lists, not the findings. Each finding: **severity** (BLOCKER / MAJOR / MINOR /
NOTE) · the exact quoted text at issue (with file) · the claim in one sentence · the reasoning in
a few more. A finding with no quotable text is a NOTE. If a section yields nothing after real
work, say "S-n: no findings" *and point at that section's rejected-hypothesis list as the proof
of work* — silence is not reviewable. Close with two things: a one-paragraph overall verdict
(would you let this merge as constitutional canon; if not, the minimum fix set), and a **declared
non-coverage statement** — what you did not examine and why, so nobody mistakes your review's
edge for its endorsement. Then print `[REVIEW COMPLETE]`.

---

**Return path** (for Jason, not part of the paste): paste Sol's full response back to the
architect verbatim. It will be committed as `vmss-laws-sol-review-findings.md` and every finding
triaged per §17 — accepted findings become scoped fixes on the branch before the veto read;
rejected findings are recorded with reasoning. Nothing is silently dropped.
