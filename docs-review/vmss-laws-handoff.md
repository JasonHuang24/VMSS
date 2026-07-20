# VMSS Laws — Handoff prompt (paste into a fresh Opus session)

Purpose: run the entire implementation in a separate Opus session so the architect session spends nothing on execution. Paste the block below into Claude Code (Opus) opened at the repo root. The architect reviews afterward from the committed worklog + conformance report + diff — no live supervision.

Note: this handoff supersedes one instruction in `vmss-laws-opus-prompts.md` — the per-prompt "do NOT push" rule. In this execution model you DO push the feature branch (never main) at the end, so the reviewing session can read everything remotely.

---

```
You are implementing the ratified VMSS Laws legal-stack restructure, solo, end to end.

Setup: repo is F:\Programming\VMSS\VMSS Website. Check out branch feat/vmss-laws-v22.7.0 (exists on origin). Then read, fully and in this order: docs-review/vmss-laws-architecture.md (RATIFIED 2026-07-20, D1–D5 as recommended — it controls over your judgment), then docs-review/vmss-laws-opus-prompts.md.

Execute Prompts 1 → 2 → 3 → 4 from that pack, sequentially, under Prompt 0's shared preamble. Each prompt's definition-of-done gate must pass before the next prompt starts. You may use ultracode/subagents for fan-out work (Prompt 4's verification especially benefits); the prompts' rules bind your subagents too.

Deviations from the pack for this solo run:
1. PUSH POLICY: after Prompt 4 completes, push the feature branch to origin (git push). Never push main, never open a PR, never merge — integration belongs to the architect session.
2. REPORTING: instead of chat reports, append each prompt's required report (files changed + deltas, check-canon pass counts, mapping tables, judgments flagged) to docs-review/vmss-laws-worklog.md, committed with that prompt's work. Prompt 4's conformance report goes to docs-review/vmss-laws-p4-conformance.md (committed). These files are the review artifacts — complete and honest beats tidy; report failures as failures.
3. STOP CONDITIONS — stop and record in the worklog rather than improvising, leaving the branch in its last green state, if you hit any of: a check-canon failure you cannot resolve within the architecture's rules; any temptation to delete or weaken a check (forbidden without an architecture citation); any place where writing new doctrinal prose is unavoidable but not specified (the no-invented-doctrine rule outranks completing the task); a register parse that will not reconcile to the section totals (the register's own stat cards are ground truth: verify your parse against them before authoring Tier 2–4 entries — entry markup varies, especially in the Regulatory section, so derive patterns from the file, not assumptions).
4. COMMIT DISCIPLINE: per-prompt commits as the pack specifies (Prompt 2 is a single commit); messages end with "Co-Authored-By: Claude Opus <noreply@anthropic.com>". Run npm run build:css whenever Tailwind classes change; assets/css/tailwind.css is a committed CI-gated artifact.

Success = branch pushed with Prompts 1–4 committed, node tools/check-canon.mjs green (report the final pass count vs the 103 baseline in the worklog), build-law-toc idempotent in both modes, and the two review artifacts committed.
```
