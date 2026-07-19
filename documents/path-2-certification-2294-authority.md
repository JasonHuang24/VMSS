# LP-074 2294 certification authority map

Status: **FINAL — SCHEDULES A AND B CERTIFIED; FULL CASCADE ACTIVE FROM 2295**

| Authority | Function | Controlling artifact | Result |
|---|---|---|---|
| LP-074 | Substantive rate law | `pending-ratify-tax-50-ii-statute.html` | Enacted in 2278; Schedules A and B active from 2295 |
| Path 2 Charter Findings I–IV | Schedule A audit standard | `documents/path-2-certification-2294-data.json` | I PASS; II PASS; III PASS; IV PASS |
| LP-074 A1–A8 | Provenance, Main coverage, ADT coverage, stream separation, reproducibility | controlling dataset + verifier | All pass; Schedule A CERTIFIED |
| LP-074 B1–B6 | Separate Lower route, obligation, quantity, coverage, forward, and adoption requirements | controlling dataset + verifier | All pass independently; Schedule B CERTIFIED |
| LP-075 | Procedural commencement duty | `path-2-commencement-duty-act.html` | Duty satisfied; set no rate and activated no schedule |
| Effective notice | First post-certificate assessment period | `documents/path-2-effective-notice-2295.json` | VALID; effective 2295-01-01 |
| LP-073 | Prior rate law | law register + rate history | Superseded as operative rate law in 2295; preserved historically |

The public certification page is the controlling human-readable record. The JSON dataset is the controlling machine-readable record. `tools/verify-path2-certification-2294.mjs` calculates every required disposition from that dataset and exits nonzero if any Finding, A condition, B condition, notice, authority status, threshold, or SCM invariant fails.

The audit record preserves the enacted distinction between the two schedules: Schedule A certification does not automatically certify Schedule B. B1–B6 are recomputed separately for -1, -2, and -3 before the unified effective notice can be valid.

The resulting schedule is 50 / 25 / 12.5 / 6.25. The $10 million threshold, SCM parameters and layer-specific scope, currency siloing, upper-layer speculative-asset restrictions, and lower-layer private-property and market rules are unchanged.
