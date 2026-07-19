# Complete §11.1 Compendium — 2294 Path 2 Run

**Compendium:** PATH2-SECTION-11-COMPENDIUM-2294  
**Lock:** 2292-02-15  
**Cutoff:** 2292-01-01  
**Published:** 2294-11-15  
**Outcome:** Findings I–IV passed; Schedule A and Schedule B certified

## I. Publication declaration

Every datum admitted to the run is deposited and published. Nothing is withheld. The public record consists of this index, the five controlling instruments, the machine-readable annexes, the controlling evidence record, the effective notice, the complete executable code, the environment declaration, and the execution record. The SHA-256 values below identify the exact published bytes.

| Artifact | SHA-256 |
|---|---|
| `path-2-certification-2294-data.json` | `5ade772de3339134b52bdcabc28586cc15494bbe76ebeffd769e2ccad3c16e6e` |
| `path-2-effective-notice-2295.json` | `eb727680b076157f8b97e362bd500dba5d53a68e2cdf6bfcbd54d5e80b779c79` |
| `path-2-charter-restatement-2292-data.json` | `9cebb385e4bebcc671f036e912131d8f5afae61b926c5b04e0481b5772c383de` |
| `path-2-lower-incidence-certificate-2294-data.json` | `bb8d14e7e489ce1da66f381604281df47636a446a79dbf3b9a3506c95c02df12` |
| `path-2-section-11-compendium-2294-annex.json` | `20b25cfb6f30bbd040d0c714dad4a8167790ade6a3014d517aab0454c63d2a1c` |
| `path-2-registrar-execution-2294-data.json` | `95b9a12f7824bbd86f150ff4572f712e8b01bbf28a60896fff73b083839a9fb0` |
| `lp-075-section-13-review-set-data.json` | `7238210a634a62e89bb3d4705416dbff0850fe57367c5974f50bbf987788f695` |
| `verify-path2-certification-2294.mjs` | `e82e0a2a090ece303ab76732355e5f18c629457b901648e40768e41730b6459a` |
| `verify-path2-record-annexes.mjs` | `4987fd98b2068bd5bc253280da66d4e8287d3bb1606a8c862c57946de510fd0d` |
| `build-path2-record-annexes.mjs` | `72665c10d124efe159f4589224cf7afd661ad1a3e94ad2189040e41296d5243f` |
| `build-path2-certification-page.mjs` | `dc2510dad05f2fbd4d4095bd853359fb56f547100e853811d8d03b9e52e72e49` |

## II. Complete §4 union

The admissible union contains sixteen candidates: four for each Finding. Each Finding includes the preregistered candidate, the certification panel's strongest surviving addition, the challenge panel's strongest surviving addition, and one challenge candidate excluded only because its held-out projection error exceeded the persistence benchmark. Twelve candidates survive §4.3. Section 4.6 reduces them to eight class representatives. The challenge-side stress representative is least favorable to activation for each Finding and supplies the controlling path.

For every candidate, including each excluded candidate, the annex publishes:

- source and panel mandate;
- functional class, identifying assumption, estimator, and uncertainty family;
- held-out error and persistence-benchmark error;
- validation disposition;
- equivalence class and representative status; and
- all thirty annual point estimates and full simultaneous one-sided 95% interval bounds.

No panel addition was omitted. The certification panel and challenge panel each signed that its strongest surviving candidate for every Finding entered the union.

The raw observation annex publishes twenty completed years, 2272–2291, comprising the two complete cycles fixed under §10.1. The ten-year baseline 2282–2291 reproduces Finding I's 1.04 coverage mean, Finding II's 100.00 dividend mean and 0.4268749491621893 sample standard deviation, Finding III's 8.08 activation mean and 0.6085 Flow mean, and Finding IV's 0.5 realized public-deployment mean. Every row ended by the §6.2 cutoff and carries a pre-lock publication and vintage.

## III. Controlling comparisons

All comparisons use unrounded values.

| Finding | Controlling comparison | Threshold | Disposition |
|---|---|---|---|
| I | Minimum annual coverage lower bound 1.010 | strictly above 1.000 | PASS |
| II | Minimum dividend lower bound 100.10 and minimum schedule-effect lower bound 0.02 | both strictly above 100 and 0 | PASS |
| III | Maximum activation upper bound 10.08; minimum Flow lower bound 0.510 | activation strictly below 8.08 × 1.25 = 10.10; Flow strictly above 0.500 | PASS |
| IV | Minimum net marginal value lower bound 0.10; maximum attributable concentration-event upper bound 0 | value strictly above 0; events no greater than 0 | PASS |

The controlling interval widths also clear §5.3: Finding I 0.018 against 0.04; Finding II 0.35 against 0.4268749491621893; Finding III activation 0.24 against 2.02 and Flow 0.045 against 0.1085; Finding IV 0.09 against 0.5.

## IV. Schedule A and Schedule B

Schedule A recomputation returned Main-12 1.067, weakest completed Main month 1.012, weakest forward Main month 1.014, ADT-36 1.224, and weakest dividend month 1.011. A1–A8 passed without cross-credit.

The separate Lower Incidence Certificate returned:

- −1 aggregate 1.0584166666666666, completed minimum 1.052, forward minimum 1.018;
- −2 aggregate 1.0541666666666665, completed minimum 1.050, forward minimum 1.014; and
- −3 aggregate 1.0525, completed minimum 1.050, forward minimum 1.012.

B1–B6 passed independently. Schedule A evidence did not substitute for any Lower finding.

## V. Votes, dissents, declarations, and environment

Seven Commission seats signed PASS on Findings I–IV and CERTIFY on Schedule A. Each signed `NO_DISQUALIFYING_EXPOSURE`. No seat filed a disposition dissent; the annex publishes each signed no-dissent entry. Both construction panels published their mandate-completion declarations.

Execution was deterministic under Node.js 22 LTS, UTC, locale C, with no external package dependency and no random seed. The declaration `NO_RANDOM_SEED_DETERMINISTIC_EXECUTION` is part of the escrow. The analytic evidence, transforms, provenance, window ordering, source classes, statutory thresholds, and forward-window digests are all reproducible from the indexed bytes.

## VI. Registrar certifications

The independent Registrar executed the class representatives and every schedule comparison before instrument issuance. The execution record certifies conformity only: exact escrow digests, complete execution, reported-comparison identity, and §1.6 disposition identity. It makes no merits judgment.

Part of the 2294 Ratification Record
