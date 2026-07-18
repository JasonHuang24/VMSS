# LP-074 2294 certification authority matrix

Status: FINAL / OPERATIVE. Repository publication: 2300-07-18. In-world timestamps remain those recorded in each hashed artifact.

| Authority | Required proof | Committed artifact | Disposition |
|---|---|---|---|
| Charter §§9.1–9.2 | Complete preregistration, byte digest, canonical timestamp, signatures, public record, executability | preregistration-2292.json + preregistration-lock-certificate.json | LOCKED 2292 |
| Charter §4.3 | Training-only fit; five-year held-out predictions and persistence errors; failed records retained | validation-records.json | 8 ADMITTED / 4 EXCLUDED |
| Charter §§5.1–5.6 and Schedule B | B-1 block bootstrap, B-2 Bartlett HAC/max-t, B-4 identification region, executed precision ceilings | execution-output.json | PASS |
| Schedule A.4 and A.6 | IV member derivations and D-1–D-5 for every admitted member | finding-iv-member-derivations.json + mandatory-diagnostics.json | COMPLETE |
| Charter §11.4 | Registrar independently recomputes locked code/data before issuance | registrar-certification.json; execution 2294-01-10 | PASS BEFORE A |
| LP-070 | 36-month A/D >=120%; no month below 100%; independent streams | analytic-results.json + raw ADT/dividend ledgers | PASS |
| LP-074 A1-A8 | Provenance, Main and ADT coverage, stream separation, reproduction | source registry, raw monthly ledgers, verifier | PASS |
| Charter Findings I-IV | 30-year adverse bounds across both panels | union-estimates.json | PASS |
| Charter §11.1 | Complete symmetric compendium and all executable sources | digest-manifest.json + calculation-code-manifest.json | PASS |
| LP-075 §13.1 | Pre-vote cold review with replies and vote | lp-075-section-13-1-review.json | PASS |
| LP-074 B1-B6 | Separate Lower certificate, maps, Li/Oi, adoption | lower-incidence-certificate.json + lower-incidence-adoption.json | PASS |
| Charter §13.2 | Coupled reversion and direct Lower revocation | revocation-amendment-2293.json | PASS |
| LP-074 §2.3 | Registrar → A → Lower → adoption → B → notice before deadline | digest-bound instruments + effective-notice-2295.json | ACTIVE 2295 |

The controlling record is the machine-readable data plus the hashed compendium. The public certificate is generated from that same data. LP-073 remains preserved as historical prior law.
