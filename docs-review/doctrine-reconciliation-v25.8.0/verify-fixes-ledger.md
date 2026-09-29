# Verify-pass fixes ledger: doctrine reconciliation v25.8.0

These are the fixes the verification pass requested after U0–U4. Excerpts are 25 words or fewer, and line numbers are pre-edit.

## BLOCKER: Academy PDF not regenerated (LR-01, TIER-05, SYNC-2)

- documents/vmss-academy-course-packet.pdf was regenerated from documents/academy-source.html using Chrome headless (README.md:131).
- simulations-academy.html:74 and :86: "vmss-academy-course-packet.pdf?v=2571" → "?v=2580", to match Resources.
- This closes the U1 note that said "Academy PDF ... NOT regenerated/bumped".

## LP-01: stale static count

- laws.html:341
  - Old: "Showing all 154 provisions"
  - New: "Showing all 155 provisions"
  - Authority: TOC hint at laws.html:346, "155 provisions".

## RES-09 mirror

- layer--3.html:94
  - Old: "An enterprise becomes legal in -3 the moment the local apparatus decides not to interfere with it."
  - New: "An enterprise can operate in -3 the moment the local apparatus decides not to interfere with it."
  - Authority: layer--3.html:103; whitepaper.html:1769. This matches the wording RES-09 used at resources-source.html:2539.

## LR-07 mirror (R27)

- documents/resources-source.html:2536
  - Old: "drug markets operating without upper-layer prohibition frameworks"
  - New: "drug markets operating without upper-layer regulatory frameworks"
  - Authority: Charter XXVI (charter.html:415).
- documents/vmss-academic-resources.pdf was regenerated. The extracted text contains "regulatory frameworks" and no longer contains "prohibition frameworks". simulations-resources.html already carries ?v=2580 for this release, so it was left unchanged.

## FIDELITY-1 mirror

- why-vmss.html:174
  - Old: "The mind transfers at full fidelity, and the body catches up as fabrication technology matures."
  - New: "Revival is binary: it restores you at full fidelity or it fails, and failure rates fall as fabrication technology matures."
  - Authority: Charter IV binary revival (charter.html:246); whitepaper §17, "no degraded copy".

## Cosmetic: R3 blank line

- documents/resources-source.html:395–396: the extra blank line between the "Hour 0 + 30 minutes" paragraph and the "Hour 1" heading was removed. It was left behind when "Hour 0 + 45 minutes" was cut.

## LR-20 optional (applied)

- world.html:1210
  - Old: "Only then does death become final;"
  - New: "Only then, for someone who keeps the implant, does death become final;"
  - Reason: the sentence now agrees with the paragraph's opening clause, "Short of removing your implant".

## Checks

- node tools/check-canon.mjs: 141 passed, 0 failed.
- node tools/check-css-cascade.mjs: clean.
- npm run test:code-guards: 8/8.
- npm run test:guard-mutations: 98/98.
- No Tailwind classes changed, so build:css parity is unaffected.

## Scope note

- simulations-academy.html, why-vmss.html and documents/vmss-academy-course-packet.pdf were not in the computed file list, but the verify items named them explicitly.
- The docs-review/prose-lift-* snapshots and .claude/worktrees still contain the old wording. They are provenance copies and were left unchanged.
