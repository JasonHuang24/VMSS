# Hardening 25.7.0: unit "process" ledger

Files: docs-review/AFFIRM-TAX-50-advocacy-brief.md, docs-review/AFFIRM-TAX-50-supplemental-brief.md, docs-review/RATIFY-TAX-50-session-record.md, tools/build-pending-pages.mjs.

Plan items matched (bucket fix/lift/broken, source in this unit): 4 (plan indices 404, 407, 417, 429). All 4 applied, none declined.

Generated HTML was not edited. The sources were verified by running the build in a scratch copy of the repo: "built + verified 7 pages", `#r14` present, and no backticks or `\(` left in the rendered record, advocacy and supplemental pages. The real rebuild happens at the ship step.

## Applied

1. **[404, fix] session record, lines 3 and 239–249.** Quote: "commits `7622cf1` through `5588d3c`". New: "commits 7622cf1 through 5588d3c". The same change was made for every backticked token (dae0db0, the ledger IDs, 8.0766377, 10.095797125, 10.55860956, 0.51810473, v22.6.0). Only the backtick characters were removed. The hashes and figures are unchanged.

2. **[407, lift] both briefs, the ARCHIVE blockquote.** Added: "In the argument below, "LP-074" means the petition's drafting designation: … It is not the register's LP-074, which is the later RATIFY-TAX-50-II." The rest of the sentence follows the plan verbatim.
   - Deviation: the plan's wording begins "In this brief". I changed that to "In the argument below" because the blockquote's own earlier phrase "both LP-074 schedules certifying" refers to the register's LP-074. Starting with "In this brief" would contradict that phrase.
   - Not placed in banner(), as the plan directs.

3. **[417, fix] raw LaTeX and backticks in the briefs.**
   - Advocacy line 14: "\(1.3D\)" → "1.3D"
   - Line 16: "`[A/R7]`" → "[A/R7]"
   - Line 67: "`[A]`" → "[A]"
   - Supplemental line 29: "\(R\) is defined as \(1.3D\)" → "R is defined as 1.3D"
   - Line 31: "\(1.3D\)" → "1.3D"

4. **[429, lift] build-pending-pages.mjs hub, Path 2 paragraph.** Quote: "A failed reduction may be re-petitioned when the controlling estimate lands". New: "may be sought again through a new petition line (never a resubmission of the closed one) once the controlling estimate lands". R22/R23 were not touched.

## Extra scope (LaTeX, stray backticks, href="#")

- Nothing beyond the items above. After the edits, a sweep of the three .md sources finds no `\(`/`\)` and no backticks.
- The session record's line 203 contains the text href="#" twice. Both are prose describing the ToC guard, not placeholder links, so they were kept as the plan's item 404 directs.
- build-pending-pages.mjs contains no href="#" and no LaTeX. Its backticks are JS template literals and were left alone.
- Process-tier authorship and commit references were kept.
