# Hardening 25.7.0 — unit "tools" ledger

Files: `assets/js/sti-sim.js` (Trust Console), `assets/js/diagrams.js` (Ring Atlas), `documents/lp-073-editorial-corrigendum.md`.

## Plan items

| # | Bucket | File | Quote | New wording | Status |
|---|---|---|---|---|---|
| 1 | lift | sti-sim.js:634 | "Canon names no further ring step for this act inside −1, so placement holds" | "The law names no further ring step for this act inside −1, so placement holds" | Applied. The code comment at :627 is unchanged. |

No other plan item names these files. Queue and non-defect items were not in scope.

## Extra scope: string lifts (never prose-lifted before)

Only string literals changed. No code, keys, identifiers, placeholders or markup changed. The `None.` prefixes that `laneSummary` parses, the leading sign in `score` rows, and the first sentence of each `STARTS` line (which `publish` splits) are intact. ACTS names and ledger labels are unchanged, so restored sessions still match.

### sti-sim.js
1. "Resident of Sanctuary on a sustained record above the 85 floor." → "Lives in Sanctuary, held there by a sustained record above the 85 floor."
2. "No revival and no daily institution;" → "No revival and no institution in daily life;"
3. "Nothing to stop: no harm threshold approached." → "Nothing to stop: no harm threshold was approached."
4. "The criminal record track only receives qualifying acts." → "The criminal record track takes only qualifying acts."
5. "amplify a trajectory, they never create one." (announce) → "amplify a trajectory but never create one." (comma splice fixed)
6. "Local standing improves: districts, cooperatives, private domains." → "Local standing improves with districts, cooperatives and private domains."
7. "Clearing the record is the behaviour the system exists to reward, not a loophole." → "Clearing the record is not a loophole; it is the behaviour the system exists to reward."
8. "harmful acts halt before completion." → "harmful acts are halted before they complete."
9. "Residency is upkeep, not a prize: it holds only while the condition holds." → "Residency has to be kept up: it lasts only while the condition holds."
10. "Major non-criminal breach. Serious enough for real consequence, not for enforcement." → "Major non-criminal breach: serious enough for real consequence, not for enforcement."
11. "…: the pattern crosses" (title) → "…: the pattern crosses the threshold"
12. "Unclassified institutionally." → "No institution classifies it."
13. "Private order answers, however the layer's organic order decides." → "Private order answers, in whatever way the layer's organic order decides."
14. "Three axes: a qualifying event." → "All three axes met: a qualifying event."
15. "The score falls, but it did not decide anything." → "The score falls, but it decided nothing."
16. "Evidence, telemetry, context and severity reviewed. Minutes to hours; no plea, no bail." → "Evidence, telemetry, context and severity are reviewed in minutes to hours. No plea, no bail."
17. "A condition lapsing, not a punishment: its only placement effect." → "This is a condition lapsing, not a punishment, and the score's only placement effect."
18. "Move against conduct." → "Move against the conduct record."

Every other user-visible string was reviewed and kept. They were already plain, and changing them would only risk meaning or hedges ("typically", "about").

### diagrams.js
1. "Earned continuously, not awarded: the highest-upkeep residency in the civilization." → "Residency is earned continuously, not awarded, and carries the highest upkeep in the civilization."
2. "Minor infractions stay clearable: the correction window lives here." → "Minor infractions stay clearable; this ring holds the correction window."
3. "A trust deficit, not a physical threat." → "The harm is a trust deficit, not a physical threat."
4. "…a demonstrated trajectory; an STI of 85 or above is the qualifying condition, typically earned over 8 to 12 years" → "…a demonstrated trajectory. The qualifying condition is an STI of 85 or above, typically reached over 8 to 12 years"
5. "Into −3 the backup vessel link is suspended for the visit." → "On a visit into −3, the backup vessel link is suspended."
6. "Psychological screening, origin assets liquidated under Article III.V, and the upward path closed for good." → "It requires psychological screening, liquidates origin assets under Article III.V, and closes the upward path for good."

Kept on purpose: "+1" summary "so harm cannot complete". The causal "so" is the source's own claim, and rewording it risks changing its meaning.

### lp-073-editorial-corrigendum.md
- "Its enacted phrase “exact halving cascade” is preserved verbatim in the historical statute." → "The historical statute keeps its enacted phrase “exact halving cascade” verbatim."
- "Mathematically, 70 to 35 is exact; 35 to 17 and 17 to 8 are rounded downward integer steps." → "Only the first step is exact: 70 to 35 halves cleanly, while 35 to 17 and 17 to 8 round down to whole numbers."
- "…remain part of rate history, but LP-073 was fully superseded … when both LP-074 schedules certified … took effect in 2295." → "…stay in the rate history. LP-073 was fully superseded as operative rate law in 2295, when both LP-074 schedules certified…"
- The heading, the quoted phrase, every number, 2295, LP-073/LP-074 and "fully superseded as operative rate law" are unchanged. README describes the file as a one-paragraph archival note, and it still is one.

## Checks
- Both JS files parse (`new Function`).
- Tailwind: the new tokens in the JS files contain no utility words (sticky, hidden, block, flex, grid, fixed, absolute, etc.).
- No check-canon pin or guard-mutation probe references these files (grepped `tools/`).
