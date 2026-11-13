CONFIRMED

# Check of main at aac99ba (v26.1.0)

Scope: `git diff 4eb262b aac99ba` only. Line numbers are HTML lines at `aac99ba`. check-canon 141/141 and css-cascade pass. Findings only; this is not a fresh read.

## Each proposal

| Proposal | Where | Result |
|---|---|---|
| S-A | `simulations.html:46` | Landed as written, under the archive introduction |
| S-A | `llms.txt:49` | Landed as written, as a fourth bullet under "How to read stories" |
| S-A | `index.html:399` | Landed with the one deliberate difference: a semicolon after "come last". Correct; it avoids a comma splice |
| S-B | `simulations.html:618` (The Severance Show) | Landed as written, under the stamp |
| S-B | `simulations.html:691` (The Frontier Park Debut) | Landed as written, under the stamp |
| R-A | `world.html:475` | Landed as written, after the Hudson Bay sentence |
| R-B | `world.html:479` | Landed as written. It sits at the end of the paragraph, one sentence later than I placed it; it reads correctly there |
| R-C | `world.html:481` | Landed as written, before "Mass intake ran" |
| R-D | `resources-source.html:648`, `:700`, `:763`, `:822`, `:876` | Landed as written in all five notes |
| P-A | `world.html:475` | Landed as written, after the sentence on the seat |
| P-B | `world.html:483` | Landed as written, at the end of the Consolidation paragraph |
| P-C | `world.html:485` | Landed as written, at the end of the paragraph |

## The rest of the diff

Nothing else of substance: the version number in `README.md` and `footer.html`, the regenerated Academic Resources PDF (it carries the R-D label five times) and its cache-buster.

The limits held: `charter.html` has no diff, and `simulations.html` gained three lines and lost none, so no story text or stamp string changed.
