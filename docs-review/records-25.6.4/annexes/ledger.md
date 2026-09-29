# Records 25.6.4, unit annexes: reconstruction ledger

Drafts only. No live source was edited. The six drafts in this folder replace the Markdown record annexes that `path-2-certification-2294.html` links to. No script renders them, and no guard, verifier or annex generator reads them.

- `path-2-certification-2294-authority.md` (authority map)
- `path-2-section-11-compendium-2294.md` (§11.1 compendium; SHA-256 table untouched)
- `path-2-registrar-execution-record-2294.md` (§11.4 Registrar execution record)
- `path-2-lower-incidence-certificate-2294.md` (Lower Incidence Certificate)
- `lp-075-section-13-review-set.md` (LP-075 §13.1 cold review set)
- `path-2-charter-restatement-snapshot-2292.md` (locked 2292 Restatement snapshot; table, list and field block untouched)

Checker: `node docs-review/records-25.6.4/annexes/check.mjs`. It reads the drafts, the live sources, this ledger and the guard tools, and writes nothing. See its header for the full list of checks.

Matching conventions:
- Section (a) quotes are matched against the draft text with backticks and bold markers removed and whitespace collapsed. A quote may not contain a backtick, so code spans are quoted without them. Table-row quotes keep the `|` cell separators as they stand.
- Section (b) strings are matched against the raw Markdown with backticks removed and whitespace collapsed (bold markers and heading hashes kept). A plain (b) row must occur in both the original and the draft. Rows marked `na:` must occur in neither; they record guard strings that target other pages. Rows marked `absent:` must not occur in the draft; they record removed tells.
- Where the original carried a fact in wording the draft dropped (a reversal, a restatement or a compressed label), the row gives the original wording in single quotes and then quotes the draft text that carries it.

## Word counts

Words in the whole Markdown text, markup stripped (headings, field labels, tables and lists included).

| Document | Live | Draft | Change |
|---|---|---|---|
| path-2-certification-2294-authority.md | 391 | 406 | +3.8% |
| path-2-section-11-compendium-2294.md | 657 | 689 | +4.9% |
| path-2-registrar-execution-record-2294.md | 338 | 349 | +3.3% |
| path-2-lower-incidence-certificate-2294.md | 521 | 530 | +1.7% |
| lp-075-section-13-review-set.md | 510 | 527 | +3.3% |
| path-2-charter-restatement-snapshot-2292.md | 368 | 373 | +1.4% |

## (a) Fact ledger

### path-2-certification-2294-authority.md

Unchanged verbatim: the heading, the status line, the table header, the Authority and Controlling artifact columns, nine of the eleven Result cells and ten of the eleven Function cells.

Heading and status
- Title: `LP-074 2294 certification authority map`
- Status, final, both schedules certified, cascade active 2295: `FINAL — SCHEDULES A AND B CERTIFIED; FULL CASCADE ACTIVE FROM 2295`

Authority table
- LP-074, substantive rate law, statute page: `LP-074 | Substantive rate law | pending-ratify-tax-50-ii-statute.html`
- LP-074 enacted 2278, Schedules A and B active from 2295: `Enacted in 2278; Schedules A and B active from 2295`
- Findings I–IV, the Schedule A audit standard: `Path 2 Charter Findings I–IV | Schedule A audit standard`
- Findings dataset and results: `documents/path-2-certification-2294-data.json | I PASS; II PASS; III PASS; IV PASS`
- A1–A8 content: `LP-074 A1–A8 | Provenance, Main coverage, ADT coverage, stream separation, reproducibility`
- A1–A8 result: `controlling dataset + verifier | All pass; Schedule A CERTIFIED`
- 'Separate Lower route, obligation, quantity, coverage, forward, and adoption requirements' (named from the certificate's B1–B6 headings): `Separate Lower requirements: route map, obligation map, quantities, current coverage, forward coverage`, `reproducibility and adoption`
- B1–B6 result: `All pass independently; Schedule B CERTIFIED`
- Restatement, itemized Main population fixed at lock: `2292 Charter Restatement | Itemized Main obligation population fixed at lock`
- Restatement artifact: `documents/path-2-charter-restatement-snapshot-2292.md + data annex`
- Restatement result: `Enforcement network, constitutional courts, and boundary infrastructure reconcile to every M(m) row`
- Compendium content: `§11.1 Compendium | Full admissible union, intervals, votes, declarations, environment, provenance`
- Compendium artifact: `and execution index | documents/path-2-section-11-compendium-2294.md + annex`
- Compendium result: `Complete publication record; no admitted datum withheld`
- Registrar function: `§11.4 Registrar | Independent conformity execution before issuance`
- Registrar artifact: `documents/path-2-registrar-execution-record-2294.md + data annex`
- Registrar result: `Eight §4.6 representatives executed; all comparisons and dispositions matched`
- LP-075, procedural commencement duty: `LP-075 | Procedural commencement duty | path-2-commencement-duty-act.html`
- LP-075 result: `Duty satisfied; set no rate and activated no schedule`
- LP-075 review content: `LP-075 §13.1 review | Mechanical cold review, replies, chamber adoption, and veto flag`
- LP-075 review artifact: `documents/lp-075-section-13-review-set.md + data annex`
- 'Amendment survived the contrary Part V and RR-8 authorities prospectively' (flag 2): `Amendment survived review; displaced the Part V no-duty holding prospectively and preserved RR-8`
- Effective notice: `Effective notice | First post-certificate assessment period | documents/path-2-effective-notice-2295.json`
- Notice result, effective 2295-01-01: `VALID; effective 2295-01-01`
- LP-073, prior rate law: `LP-073 | Prior rate law | law register + rate history`
- LP-073 result: `Superseded as operative rate law in 2295; preserved historically`

Controlling records
- Certification page, human-readable: `The public certification page is the controlling human-readable record`
- JSON dataset, machine-readable: `the JSON dataset is the controlling machine-readable record`
- Verifier: `tools/verify-path2-certification-2294.mjs calculates every required disposition from that dataset.`
- Nonzero exit: `It exits nonzero if any Finding, A condition, B condition, notice, authority status`
- Nonzero exit, continued: `threshold, or SCM invariant fails.`

Schedule separation
- 'preserves the enacted distinction between the two schedules': `The audit record keeps the two schedules separate, as enacted.`
- `Schedule A certification does not automatically certify Schedule B.`
- `B1–B6 are recomputed separately for -1, -2, and -3`
- `before the unified effective notice can be valid`

Lock vintage
- 'preserves the lock-vintage distinction': `The evidence record also separates completed observations from projections.`
- `Completed Main and Lower observations cover 2291`
- `completed dividend evidence covers 2289–2291`
- `end by the computed 2292-01-01 cutoff`
- `were published and fixed before the 2292-02-15 lock`
- `The 2295–2324 annual horizon and the 2295–2297 monthly windows`
- `are explicitly preregistered projections over admissible pre-lock inputs.`
- 'not later observations' (reversal tail dropped): `separates completed observations from projections`

Resulting schedule
- `The resulting schedule is 50 / 25 / 12.5 / 6.25.`
- `The following are unchanged: the $10 million threshold;`
- `the SCM parameters and layer-specific scope; currency siloing;`
- `the upper-layer speculative-asset restrictions;`
- `the lower-layer private-property and market rules.`

### path-2-section-11-compendium-2294.md

Unchanged verbatim: every heading, the field block, the SHA-256 table, both lists, the comparisons table, "All comparisons use unrounded values.", "Twelve candidates survive §4.3.", "Section 4.6 reduces them to eight class representatives.", "No panel addition was omitted." and the footer.

Heading and fields
- `Complete §11.1 Compendium — 2294 Path 2 Run`
- `Compendium: PATH2-SECTION-11-COMPENDIUM-2294`
- `Lock: 2292-02-15`
- `Cutoff: 2292-01-01`
- `Published: 2294-11-15`
- `Outcome: Findings I–IV passed; Schedule A and Schedule B certified`

I. Publication declaration
- `I. Publication declaration`
- `Every datum admitted to the run is deposited and published.`
- 'Nothing is withheld.' (cut: restates the sentence before it): `Every datum admitted to the run is deposited and published.`
- Public record contents: `The public record consists of this index, the five controlling instruments`
- (continued): `the machine-readable annexes, the controlling evidence record, the effective notice`
- (continued): `the complete executable code, the environment declaration, and the execution record`
- `The SHA-256 values below identify the exact published bytes.`
- Digest, data JSON: `path-2-certification-2294-data.json | 5ade772de3339134b52bdcabc28586cc15494bbe76ebeffd769e2ccad3c16e6e`
- Digest, effective notice: `path-2-effective-notice-2295.json | eb727680b076157f8b97e362bd500dba5d53a68e2cdf6bfcbd54d5e80b779c79`
- Digest, restatement JSON: `path-2-charter-restatement-2292-data.json | 9cebb385e4bebcc671f036e912131d8f5afae61b926c5b04e0481b5772c383de`
- Digest, Lower certificate JSON: `path-2-lower-incidence-certificate-2294-data.json | bb8d14e7e489ce1da66f381604281df47636a446a79dbf3b9a3506c95c02df12`
- Digest, compendium annex (stale, flag 1): `path-2-section-11-compendium-2294-annex.json | 20b25cfb6f30bbd040d0c714dad4a8167790ade6a3014d517aab0454c63d2a1c`
- Digest, Registrar JSON (stale, flag 1): `path-2-registrar-execution-2294-data.json | 95b9a12f7824bbd86f150ff4572f712e8b01bbf28a60896fff73b083839a9fb0`
- Digest, review-set JSON: `lp-075-section-13-review-set-data.json | 7238210a634a62e89bb3d4705416dbff0850fe57367c5974f50bbf987788f695`
- Digest, certification verifier: `verify-path2-certification-2294.mjs | e82e0a2a090ece303ab76732355e5f18c629457b901648e40768e41730b6459a`
- Digest, record verifier: `verify-path2-record-annexes.mjs | 4987fd98b2068bd5bc253280da66d4e8287d3bb1606a8c862c57946de510fd0d`
- Digest, annex generator: `build-path2-record-annexes.mjs | 72665c10d124efe159f4589224cf7afd661ad1a3e94ad2189040e41296d5243f`
- Digest, page generator (stale, flag 1): `build-path2-certification-page.mjs | dc2510dad05f2fbd4d4095bd853359fb56f547100e853811d8d03b9e52e72e49`

II. Complete §4 union
- `II. Complete §4 union`
- Sixteen candidates, four per Finding: `The admissible union contains sixteen candidates, four for each Finding`
- Members: `the preregistered candidate, the certification panel's strongest surviving addition`
- Members, continued: `the challenge panel's strongest surviving addition, and one challenge candidate`
- Excluded only on the benchmark: `excluded only because its held-out projection error exceeded the persistence benchmark`
- `Twelve candidates survive §4.3.`
- `Section 4.6 reduces them to eight class representatives.`
- Controlling representative: `the challenge-side stress representative is the least favorable to activation`
- `supplies the controlling path`
- `For every candidate, including each excluded candidate, the annex publishes:`
- `source and panel mandate;`
- `functional class, identifying assumption, estimator, and uncertainty family;`
- `held-out error and persistence-benchmark error;`
- `validation disposition;`
- `equivalence class and representative status; and`
- `all thirty annual point estimates and full simultaneous one-sided 95% interval bounds.`
- `No panel addition was omitted.`
- 'each signed that': `The certification panel and the challenge panel each signed a declaration`
- `its strongest surviving candidate for every Finding entered the union`
- Twenty completed years: `The raw observation annex publishes twenty completed years, 2272–2291`
- 'comprising the two complete cycles': `which make up the two complete cycles fixed under §10.1`
- `The ten-year baseline, 2282–2291, reproduces these values:`
- `Finding I coverage mean 1.04;`
- `Finding II dividend mean 100.00 and sample standard deviation 0.4268749491621893;`
- `Finding III activation mean 8.08 and Flow mean 0.6085;`
- `Finding IV realized public-deployment mean 0.5.`
- `Every row ended by the §6.2 cutoff`
- 'carries a pre-lock publication and vintage': `carries a pre-lock publication date and vintage`

III. Controlling comparisons
- `III. Controlling comparisons`
- `All comparisons use unrounded values.`
- Finding I row: `I | Minimum annual coverage lower bound 1.010 | strictly above 1.000 | PASS`
- Finding II row: `II | Minimum dividend lower bound 100.10 and minimum schedule-effect lower bound 0.02`
- Finding II threshold: `both strictly above 100 and 0 | PASS`
- Finding III row: `III | Maximum activation upper bound 10.08; minimum Flow lower bound 0.510`
- Finding III threshold: `activation strictly below 8.08 × 1.25 = 10.10; Flow strictly above 0.500 | PASS`
- Finding IV row: `IV | Minimum net marginal value lower bound 0.10;`
- (continued): `maximum attributable concentration-event upper bound 0`
- Finding IV threshold: `value strictly above 0; events no greater than 0 | PASS`
- 'also clear §5.3': `The controlling interval widths also satisfy §5.3.`
- 'against' read as the maximum admissible width (flag 6): `Each is below the maximum admissible width shown in parentheses`
- `Finding I 0.018 (0.04);`
- `Finding II 0.35 (0.4268749491621893);`
- `Finding III activation 0.24 (2.02) and Flow 0.045 (0.1085);`
- `Finding IV 0.09 (0.5).`

IV. Schedule A and Schedule B
- `IV. Schedule A and Schedule B`
- `The Schedule A recomputation returned: Main-12 1.067;`
- `weakest completed Main month 1.012; weakest forward Main month 1.014;`
- `ADT-36 1.224; and weakest dividend month 1.011.`
- `A1–A8 passed without cross-credit.`
- `The separate Lower Incidence Certificate returned:`
- `−1 aggregate 1.0584166666666666, completed minimum 1.052, forward minimum 1.018;`
- `−2 aggregate 1.0541666666666665, completed minimum 1.050, forward minimum 1.014; and`
- `−3 aggregate 1.0525, completed minimum 1.050, forward minimum 1.012.`
- `B1–B6 passed independently.`
- 'did not substitute for any Lower finding': `Schedule A evidence was not used for any Lower finding.`

V. Votes, dissents, declarations, and environment
- `V. Votes, dissents, declarations, and environment`
- `Seven Commission seats signed PASS on Findings I–IV and CERTIFY on Schedule A.`
- `Each seat also signed the exposure declaration NO_DISQUALIFYING_EXPOSURE.`
- `No seat filed a disposition dissent`
- `the annex publishes each seat's signed no-dissent entry`
- `Both construction panels published their mandate-completion declarations.`
- 'under Node.js 22 LTS, UTC': `Execution was deterministic: Node.js 22 LTS, timezone UTC, locale C`
- `no external package dependency and no random seed`
- `The declaration NO_RANDOM_SEED_DETERMINISTIC_EXECUTION is part of the escrow.`
- `The analytic evidence, transforms, provenance, window ordering, source classes, statutory thresholds`
- `and forward-window digests are all reproducible from the indexed bytes.`

VI. Registrar certifications
- `VI. Registrar certifications`
- `The independent Registrar executed the class representatives and every schedule comparison`
- 'before instrument issuance': `before any instrument issued`
- `The execution record certifies conformity only:`
- 'exact escrow digests': `the escrow digests matched exactly`
- 'complete execution': `execution was complete`
- 'reported-comparison identity' (wording from the Registrar record, Part IV): `every reported comparison matched the executed output`
- '§1.6 disposition identity' (same source): `every disposition matched its comparison under §1.6`
- `It makes no merits judgment.`
- `Part of the 2294 Ratification Record`

### path-2-registrar-execution-record-2294.md

Unchanged verbatim: every heading, the field block, the list, Part VI and the footer.

Heading and fields
- `Independent §11.4 Registrar Execution Record`
- `Execution: PATH2-REGISTRAR-EXECUTION-2294-10-20`
- `Started: 2294-10-15 09:00 UTC`
- `Completed and issued: 2294-10-20 17:30 UTC`
- `Status: Conformity certified; instrument issuance permitted`

I. Authority and fence
- `I. Authority and fence`
- Under §11.4, escrowed code on escrowed data: `Under Charter §11.4, the Registrar executed the escrowed code on the escrowed data`
- `in the escrowed environment`
- 'decides conformity, not merits' (flag 7): `This record decides conformity and makes no merits determination.`
- `It does not select a model, alter an estimand, revise a threshold`
- `assess whether the locked design was wise, or exercise Commission judgment.`

II. Escrow identity
- `II. Escrow identity`
- `The execution used the controlling evidence record, the deterministic verifier`
- `the publication-record verifier, the annex generator, the locked Restatement`
- `the Lower incidence evidence, and the complete §11.1 annex.`
- 'Their byte identities are published in' (flag 5): `The digest of each is published in path-2-registrar-execution-2294-data.json`
- `and in the §11.1 compendium.`
- `The environment was Node.js 22 LTS, timezone UTC, locale C`
- `with no external dependencies and no random seed.`
- `The run used the declaration NO_RANDOM_SEED_DETERMINISTIC_EXECUTION.`

III. Executed union
- `III. Executed union`
- `The Registrar executed the eight §4.6 representatives:`
- `for each of Findings I–IV, the certification-side locked-base representative`
- `and the challenge-side stress representative.`
- `It verified the §4.3 exclusion of four unstable candidates`
- `against the same held-out persistence benchmark`
- `verified that no exclusion rested on any other ground.`
- `For each Finding, the challenge-side stress representative was the least favorable to activation.`
- `Its thirty-year simultaneous path reproduced exactly the controlling annual bounds`
- `in the certification dataset.`

IV. Computed dispositions
- `IV. Computed dispositions`
- `The execution returned:`
- `Finding I — PASS;`
- `Finding II — PASS;`
- `Finding III — PASS;`
- `Finding IV — PASS;`
- `A1–A8 — PASS; Schedule A CERTIFIED;`
- `B1–B6 — PASS; Schedule B CERTIFIED; and`
- `effective notice — VALID.`
- `Every reported comparison matched the executed output`
- `every instrument disposition matched its comparison under §1.6.`
- `There was no deviation, missing milestone deposit, digest mismatch, or recomputation failure.`

V. Issuance order
- `V. Issuance order`
- `This execution completed before the Schedule A instrument issued on 2294-11-01`
- `before the Lower Incidence Certificate issued on 2294-11-15`
- `before effective notice was published on 2294-12-01.`
- `The issuance bar was therefore satisfied.`
- 'before any operative instrument issued' (cut: restates the sentence before it, flag 8): `This execution completed before the Schedule A instrument issued`

VI. Certification
- `VI. Certification`
- `The escrowed record is complete, executable, and conforming.`
- `Issuance is permitted.`
- `This certificate does not endorse the merits of the schedule or the Commission's design.`
- `Part of the 2294 Ratification Record`

### path-2-lower-incidence-certificate-2294.md

Unchanged verbatim: every heading, the field block, both tables, the exclusion sentence of Part I, "This certificate decides Schedule B only.", the last sentence of Part V and the footer.

Heading and fields
- `2294 Lower Incidence Certificate`
- `Instrument: LP074-LOWER-INCIDENCE-CERTIFICATE-2294`
- `Issued: 2294-11-15`
- `Authority: LP-074 §6 and Path 2 Charter §14.1`
- `Dependency: Locked 2292 Charter Restatement Snapshot`
- `Disposition: Schedule B certified`

I. Separate evidentiary judgment
- `I. Separate evidentiary judgment`
- `This certificate decides Schedule B only.`
- 'a sequencing prerequisite, not evidence for any Lower finding': `Schedule A certification is a sequencing prerequisite`
- (continued): `supplies no evidence for any Lower finding`
- Excluded inputs: `No Main receipt, Automation Dividend Treasury receipt, Savings Circulation Mandate recycle`
- Excluded inputs, continued: `other-layer receipt, private-velocity estimate, favorable behavioral response, cyclical backfill`
- `or predecessor-petition magnitude enters B1–B6.`
- 'publish in': `The complete Lower route maps, obligation maps, completed observations`
- (continued): `preregistered forward projections, and unrounded computations are published in`
- `path-2-lower-incidence-certificate-2294-data.json`

II. Layer comparisons
- `II. Layer comparisons`
- `Values are billions of layer credits in constant 2292 purchasing power.`
- `Completed observations cover 2291-01 through 2291-12`
- `forward projections cover 2295-01 through 2297-12.`
- Table header: `Layer | Proposed rate | Audited collection | Chargeable obligations`
- Table header, continued: `Twelve-month aggregate | Weakest completed month | Weakest forward month`
- −1 row: `−1 | 25% | 1,270.1 | 1,200 | 1.0584166666666666 | 1.052 | 1.018`
- −2 row: `−2 | 12.5% | 759.0 | 720 | 1.0541666666666665 | 1.050 | 1.014`
- −3 row: `−3 | 6.25% | 378.9 | 360 | 1.0525 | 1.050 | 1.012`
- 'Every comparison above was made on its unrounded value.': `All comparisons above use unrounded values.`
- `Each layer exceeds the 1.05 aggregate floor`
- 'every included and forward month' (flag 4): `meets or exceeds 1.00 in every completed and forward month.`

III. Route and obligation maps
- `III. Route and obligation maps`
- `Layer −1`
- `Of 1,270.1 collected, 1,200 terminates in the −1 obligation treasury`
- `and 70.1 in the named ADT-surplus destination.`
- 'The ordered obligations are': `In payment order, the obligations are Universal Basic Income 600, Primary Job Subsidy 300`
- `civic infrastructure 200, and required operating reserve 100.`
- Non-tax carry and interlayer credit, each layer: `Non-tax carry is expressly zero and unused.`, `Interlayer credit is expressly zero and prohibited.`
- `Layer −2`
- `Of 759.0 collected, 720 terminates in the −2 obligation treasury`
- `and 39 in the named ADT-surplus destination.`
- `Universal Basic Income 300, Primary Job Subsidy 180`
- `civic infrastructure 144, and required operating reserve 96.`
- `Layer −3`
- `Of 378.9 collected, 360 terminates in the −3 obligation treasury`
- `and 18.9 in the named ADT-surplus destination.`
- `Universal Basic Income 150, Primary Job Subsidy 90`
- `civic infrastructure 72, and required operating reserve 48.`

IV. Findings B1–B6
- `IV. Findings B1–B6`
- B1: `B1 — Complete route map | PASS | Every audited collection reconciles without remainder to named destinations.`
- B2: `B2 — Complete obligation map | PASS`
- B2 reason: `Every chargeable obligation, payment order, funding destination, and legally available non-tax zero`
- (continued): `is enumerated and reconciled.`
- B3: `B3 — Proposed-rate quantities | PASS | Li(m) and Oi(m) use admissible layer-specific sources`
- (continued): `at the pre-lock vintage; prohibited cross-credit is absent.`
- B4: `B4 — Current coverage | PASS | All three layers clear 105% in aggregate`
- (continued): `and 100% in each of twelve completed months.`
- B5: `B5 — Forward coverage | PASS`
- B5 reason: `All three layers clear 100% in each of thirty-six preregistered forward months`
- (continued): `without favorable behavioral credit.`
- B6: `B6 — Reproducibility and adoption | PASS`
- B6 reason: `The standing audit recomputed B1–B5 and adopted the quantities`
- (continued): `under record LP074-PATH2-ADOPTION-2294.`

V. Nonseverability and certification
- `V. Nonseverability and certification`
- `B1–B6 pass for −1, −2, and −3.`
- 'Because LP-074 makes the Lower reductions nonseverable': `LP-074 makes the Lower reductions nonseverable`
- 'activates none unless all three layers pass': `so the certificate activates none of them unless all three layers pass.`
- `All three did.`
- `Schedule B is therefore certified as one instrument:`
- 35/17/8 to 25/12.5/6.25 on valid notice: `upon valid effective notice, 35/17/8 becomes 25/12.5/6.25.`
- `This certificate neither sets nor activates Schedule A.`
- `Part of the 2294 Ratification Record`

### lp-075-section-13-review-set.md

Unchanged verbatim: every heading, the field block, every Severity and Finding line, the R2–R4 Disposition lines, R1's first two reply sentences, the vote table, Part III's paragraph and the footer.

Heading and fields
- `LP-075 §13.1 Cold Review Set`
- `Review set: LP075-SECTION-13-1-REVIEW-SET`
- `Amendment filed: 2289-03-01`
- `Cold review published: 2290-01-15`
- `Reviewer replies published: 2290-05-01`
- `Chamber adoption: 2291-01-15`
- `Presidential disposition and enactment: 2291-01-20`

I. Mechanical reviewer selection
- `I. Mechanical reviewer selection`
- `The Meritboard audit-methodology ranking was snapshotted on 2289-03-15.`
- `Rank 1 was ineligible because of prior authorship exposure.`
- `Rank 2, AUDIT-METHOD-ENTITY-12, was eligible`
- 'and therefore selected mechanically': `was selected mechanically as the highest-ranked eligible entity.`
- `Rank 3 was not reached.`
- `No sponsor, drafter, chamber, or Presidency office selected the reviewer.`
- 'publish in': `The machine-readable ranking, eligibility reasons, findings, dispositions, replies`
- (continued): `adoption votes, and veto flag are published in lp-075-section-13-review-set-data.json.`

II. Cold-review findings and replies
- `II. Cold-review findings and replies`
- `R1 — Conflict with the Presidency's Part V no-duty holding`
- `Severity: Highest.`
- `Finding: Compelled commencement reverses the adopted statement`
- `that non-commencement is not a defect`
- `and that the status quo bears no burden of motion.`
- 'Sustained as a real conflict and presented as a prospective Charter amendment, not construed away.': `Disposition: Sustained as a real conflict,`
- (continued): `presented as a prospective Charter amendment and not construed away.`
- `Section 13.1 permits the chambers to amend cadence prospectively.`
- `The amendment is legally available only if it preserves the first window`
- `as lawful history and leaves every factual and evidentiary gate untouched.`
- `The reviewer maintained a standing objection to the reversal of the no-duty policy`
- 'requiring a presidential veto flag': `that objection required a presidential veto flag.`
- `R2 — RR-8 and the first window`
- `Severity: High.`
- `Finding: RR-8 prices 2279–2288 non-commencement as lawful history.`
- `Disposition: Sustained and preserved.`
- Prospective duty and remedial constitution (moved first; the reversal is gone): `LP-075 creates a prospective cadence duty and a remedial constitution for the second window.`
- No retroactive relabel: `It does not retroactively relabel the first window.`
- 'RR-8 remains the controlling description of the first.': `RR-8 remains the controlling description of that window.`
- `R3 — Risk that commencement becomes compelled certification`
- `Finding: A commencement duty could be read as pressure toward a rate outcome.`
- `Disposition: Cured by outcome neutrality.`
- `Certification, failure, and every legally recognized void remain available.`
- `LP-075 changes no Finding, threshold, estimand, evidentiary quarantine, or Lower incidence standard`
- `it gives no chamber power to direct the result.`
- `R4 — Strategic non-locking`
- `Severity: Medium.`
- `Finding: A constituted Commission could dissolve and recreate omission.`
- `Disposition: Cured by replacement constitution, public attribution, and Meritboard sanction.`
- 'closes strategic dissolution': `The replacement duty closes the strategic-dissolution route`
- `without altering the audit's merits or evidence.`
- 'Every reviewer reply above published before the adoption vote.': `Every reviewer reply above was published before the adoption vote.`

III. Chamber adoption
- `III. Chamber adoption`
- `Gate | Result`
- `Meritboard | 73%`
- `Supreme Court | 7/10`
- `Sanctuary | 97%`
- `Main | 84%`
- `Lower-layer aggregate | 72%`
- `The chambers adopted LP-075 as a §13.1 amendment to cadence only.`
- `They did not set a rate, activate a schedule, or weaken A1–A8 or B1–B6.`

IV. Presidential veto flag
- `IV. Presidential veto flag`
- `The highest-severity standing objection was flagged to the Presidency`
- 'The veto was not exercised.': `the Presidency did not exercise the veto.`
- `Its published disposition held that the no-duty rule was binding under the 2279 Charter`
- `but amendable through §13.1;`
- 'displaced it prospectively, not retroactively': `that LP-075 displaced it prospectively and without retroactive effect;`
- `that the first window remained lawful;`
- `compelling a fact-finding process did not prejudge the fact found.`

V. Final disposition
- 'LP-075 survived §13.1.': `LP-075 survived §13.1 review.`
- `V. Final disposition`
- `It was enacted on 2291-01-20`
- 'required the remedial Commission within 180 days' (flag 10): `required the remedial Commission to be constituted within 180 days`
- `required a lock no later than 2292.`
- `Its authority was procedural.`
- `LP-074 and the later certificates remained the only route to a rate change.`
- `Part of the 2294 Ratification Record`

### path-2-charter-restatement-snapshot-2292.md

Unchanged verbatim: every heading, the field block, the table, the Part III list and its two sentences, Part I's first paragraph and last sentence, Part II's first paragraph and the first two sentences of its second, the first three sentences of Part IV, and the footer. Parts I–IV are reconstructed like the other annexes (flag 3); the Part II publication pointer and Part V are 2294 framing.

Heading and fields
- `Locked 2292 Charter Restatement Snapshot`
- `Instrument: PATH2-RESTATEMENT-SNAPSHOT-2292`
- `Locked: 2292-02-15`
- `Section 6.2 cutoff: 2292-01-01`
- `Public release with the 2294 compendium: 2294-11-15`
- `Status: Controlling population statement under Charter §§3.1 and 10.1`

I. Population fixed at lock
- `I. Population fixed at lock`
- `The following and only the following Main institutional obligations constitute the population`
- `denoted by M(m) for the 2292 Path 2 run.`
- `Values are billions of layer credits per month in constant 2292 purchasing power.`
- `Payment order | Obligation identifier | Legal head | Monthly amount`
- `1 | MAIN-ENFORCEMENT-NETWORK | Federal enforcement network | 40`
- `2 | MAIN-CONSTITUTIONAL-COURTS | Constitutional and federal courts | 25`
- `3 | MAIN-BOUNDARY-INFRASTRUCTURE | Layer boundary infrastructure | 35`
- `Total M(m) | 100`
- 'the locked population, not a discretionary budget and not the allocation …': `This enumeration is the locked population.`
- (continued): `It is neither a discretionary budget nor the allocation proposed`
- (continued): `in the failed predecessor petition.`
- `No category, weight, or amount from that petition entered this snapshot.`

II. Reconciliation (Part II pointer is framing)
- `II. Reconciliation to the controlling evidence`
- `The completed-observation window contains the twelve months 2291-01 through 2291-12.`
- `Each month carries M(m) = 100;`
- `the itemized sum above therefore reconciles to every month`
- `and to the twelve-month total of 1,200.`
- `The preregistered forward window contains the thirty-six months 2295-01 through 2297-12.`
- `Each projected month carries M(m) = 100;`
- `the same locked population therefore reconciles to every projected month`
- `and to the forward total of 3,600.`
- `Projection changes quantities only through the locked model`
- 'They do not add an obligation to the population.': `and adds no obligation to the population.`
- 'publish in' (framing): `The complete month-by-month itemization, source identifiers, and reconciliation booleans`
- (continued): `are published in path-2-charter-restatement-2292-data.json.`

III. Excluded streams and obligations
- `III. Excluded streams and obligations`
- `The snapshot excludes:`
- `Automation Dividend Treasury dividend obligations;`
- `Savings Circulation Mandate recycling;`
- `every Lower-layer obligation and collection;`
- `discretionary expenditure not enumerated at lock; and`
- `cyclical backfill.`
- `None may enter the numerator or denominator of Finding I`
- `or Schedule A's Main-coverage limbs.`

IV. Vintage finding
- `IV. Vintage finding`
- `The source authorities' maximum published reporting lag was forty-five days.`
- `Subtracting that lag from the 2292-02-15 lock produces the 2292-01-01 cutoff.`
- `Every completed month ended on or before that cutoff;`
- `the source ledgers were published and fixed at the 2292-02-01 vintage, before lock.`
- 'projections, not later observations': `Later target periods are projections.`
- (continued): `No observation made after lock enters them.`

V. Seal (framing)
- `V. Seal`
- `The Commission deposited this snapshot at lock.`
- `The Registrar received the itemization, source mapping, and exclusions`
- `as part of the escrowed design`
- 'verified their reconciliation': `verified that they reconcile before any 2294 instrument issued.`
- `Part of the 2294 Ratification Record`

## (b) Frozen-string checklist

None of the scout report's guarded strings lives in these six files. The positive-control string `SCHEDULES A AND B CERTIFIED` and the statute figure form `50 / 25 / 12.5 / 6.25` happen to appear in the authority map, and both are kept. Every other pin, probe, linkFirst phrase, positive control, STATUTORY_CONSTANTS string and deep-link slug is recorded below as `na:` and must be absent from all six originals and drafts. check.mjs also runs the World-tier regexes (seat names, founder ruling or override, superseded refusal phrasing, taxation-is-Charter-level) on every original and draft, and confirms that no guard, verifier or annex tool names these files and that no link anywhere carries a fragment into them.

### All six files
- na: linkFirst, Charter: `a schedule adopted by the chambers`
- na: linkFirst, Schedule: `This Schedule is part of the Charter`
- na: certification positive control: `exactly 30 keyed annual observations`
- na: certification positive control: `Main-12 106.7%`
- na: certification positive control: `ADT-36 122.4%`
- na: certification positive control: `complete ordered window SHA-256-attested`
- na: STATUTORY_CONSTANTS title: `Path 2 LP-074 Final Certification — 2294`
- na: chronology: `LP-074 enacted conditionally`
- na: chronology: `No Path 2 run; the original framework imposed no mandatory commencement duty`
- na: chronology: `The inaction-veto dispute produced LP-075`
- na: chronology: `LP-075 created a mandatory commencement duty without setting a rate`
- na: chronology: `Audit design, evidence rules, methods, and source definitions locked`
- na: chronology: `Audit completed; Schedules A and B independently certified; effective notice published`
- na: chronology: `The complete LP-074 exact halving cascade entered force`
- na: chronology: `Current canon operates at 50 / 25 / 12.5 / 6.25`
- na: notice: `LP074_UNIFIED_EFFECTIVE_NOTICE`, `SUPERSEDED_AS_OPERATIVE_RATE_LAW`, `PROCEDURAL_COMMENCEMENT_DUTY_SATISFIED`
- na: notice: `$10 million — unchanged`, `unchanged in parameters and layer-specific scope`
- na: deregistered pin: `The engraved schedule is 50% / 25% / 12.5% / 6.25% top marginal above $10,000,000 annually, layer-mapped as before.`
- na: deregistered pin: `top marginal rates track institutional need, not posture.`
- na: deregistered pin and probe: `Drafting designation LP-074 (process record`
- na: deregistered probe: `above $10,000,000 annually, layer-mapped as before.`
- na: rate-history probe: `current rate authority is <a href="law-polling.html#`
- na: hub pins: `Restatement &amp; Consolidation Doctrine`, `The Codification Sweep`, `R22`, `R23`
- na: statute pins: `RATIFY-TAX-50-II — Conditional Successor Petition`, `ENACTED — SCHEDULES ACTIVE FROM 2295`, `law-polling.html#lp-074`
- na: probes: `<body`, `class="ls-cite"`, `id="s-10-4"`, `RR-12`
- na: Charter pins: `THE PATH 2 CHARTER`, `Operative Measure`
- na: deep-link slugs: `#part-a`, `#rr-9`, `#s-12-3`, `#path-2`, `#r14`, `#sec-1`, `#concessions`
- na: superseded refusal phrasing: `lawful nonactivation`

### path-2-certification-2294-authority.md
- positive control also written here: `SCHEDULES A AND B CERTIFIED`
- statute figure form: `50 / 25 / 12.5 / 6.25`
- heading: `# LP-074 2294 certification authority map`
- status: `Status: **FINAL — SCHEDULES A AND B CERTIFIED; FULL CASCADE ACTIVE FROM 2295**`
- table header: `| Authority | Function | Controlling artifact | Result |`
- authority labels: `| LP-074 | Substantive rate law |`, `| Path 2 Charter Findings I–IV |`, `| LP-074 A1–A8 |`, `| LP-074 B1–B6 |`
- authority labels: `| 2292 Charter Restatement |`, `| §11.1 Compendium |`, `| §11.4 Registrar |`, `| LP-075 | Procedural commencement duty |`
- authority labels: `| LP-075 §13.1 review |`, `| Effective notice |`, `| LP-073 | Prior rate law |`
- controlling artifacts: `pending-ratify-tax-50-ii-statute.html`, `documents/path-2-certification-2294-data.json`, `path-2-commencement-duty-act.html`
- annex cross-links: `documents/path-2-charter-restatement-snapshot-2292.md`, `documents/path-2-section-11-compendium-2294.md`
- annex cross-links: `documents/path-2-registrar-execution-record-2294.md`, `documents/lp-075-section-13-review-set.md`
- notice and verifier: `documents/path-2-effective-notice-2295.json`, `tools/verify-path2-certification-2294.mjs`
- defined term: `M(m)`
- verdicts: `I PASS; II PASS; III PASS; IV PASS`, `All pass; Schedule A CERTIFIED`, `All pass independently; Schedule B CERTIFIED`, `VALID; effective 2295-01-01`
- modal: `before the unified effective notice can be valid`
- layer labels as written (hyphen-minus): `-1, -2, and -3`
- threshold: `$10 million threshold`
- absent: removed reversal tail: `pre-lock inputs, not later observations`

### path-2-section-11-compendium-2294.md
- headings: `# Complete §11.1 Compendium — 2294 Path 2 Run`, `## I. Publication declaration`, `## II. Complete §4 union`
- headings: `## III. Controlling comparisons`, `## IV. Schedule A and Schedule B`, `## V. Votes, dissents, declarations, and environment`, `## VI. Registrar certifications`
- fields: `**Compendium:** PATH2-SECTION-11-COMPENDIUM-2294`, `**Lock:** 2292-02-15`, `**Cutoff:** 2292-01-01`, `**Published:** 2294-11-15`
- fields: `**Outcome:** Findings I–IV passed; Schedule A and Schedule B certified`
- SHA-256 table header: `| Artifact | SHA-256 |`
- digest rows: `| path-2-certification-2294-data.json | 5ade772de3339134b52bdcabc28586cc15494bbe76ebeffd769e2ccad3c16e6e |`
- digest rows: `| path-2-effective-notice-2295.json | eb727680b076157f8b97e362bd500dba5d53a68e2cdf6bfcbd54d5e80b779c79 |`
- digest rows: `| path-2-charter-restatement-2292-data.json | 9cebb385e4bebcc671f036e912131d8f5afae61b926c5b04e0481b5772c383de |`
- digest rows: `| path-2-lower-incidence-certificate-2294-data.json | bb8d14e7e489ce1da66f381604281df47636a446a79dbf3b9a3506c95c02df12 |`
- digest rows: `| path-2-section-11-compendium-2294-annex.json | 20b25cfb6f30bbd040d0c714dad4a8167790ade6a3014d517aab0454c63d2a1c |`
- digest rows: `| path-2-registrar-execution-2294-data.json | 95b9a12f7824bbd86f150ff4572f712e8b01bbf28a60896fff73b083839a9fb0 |`
- digest rows: `| lp-075-section-13-review-set-data.json | 7238210a634a62e89bb3d4705416dbff0850fe57367c5974f50bbf987788f695 |`
- digest rows: `| verify-path2-certification-2294.mjs | e82e0a2a090ece303ab76732355e5f18c629457b901648e40768e41730b6459a |`
- digest rows: `| verify-path2-record-annexes.mjs | 4987fd98b2068bd5bc253280da66d4e8287d3bb1606a8c862c57946de510fd0d |`
- digest rows: `| build-path2-record-annexes.mjs | 72665c10d124efe159f4589224cf7afd661ad1a3e94ad2189040e41296d5243f |`
- digest rows: `| build-path2-certification-page.mjs | dc2510dad05f2fbd4d4095bd853359fb56f547100e853811d8d03b9e52e72e49 |`
- comparisons header: `| Finding | Controlling comparison | Threshold | Disposition |`
- comparison rows: `| I | Minimum annual coverage lower bound 1.010 | strictly above 1.000 | PASS |`
- comparison rows: `| II | Minimum dividend lower bound 100.10 and minimum schedule-effect lower bound 0.02 | both strictly above 100 and 0 | PASS |`
- comparison rows: `| III | Maximum activation upper bound 10.08; minimum Flow lower bound 0.510 | activation strictly below 8.08 × 1.25 = 10.10; Flow strictly above 0.500 | PASS |`
- comparison rows: `| IV | Minimum net marginal value lower bound 0.10; maximum attributable concentration-event upper bound 0 | value strictly above 0; events no greater than 0 | PASS |`
- declarations: `NO_DISQUALIFYING_EXPOSURE`, `NO_RANDOM_SEED_DETERMINISTIC_EXECUTION`
- environment: `Node.js 22 LTS`
- unrounded-values rule: `All comparisons use unrounded values.`
- verbatim sentences: `Twelve candidates survive §4.3.`, `Section 4.6 reduces them to eight class representatives.`, `No panel addition was omitted.`
- baseline figures: `0.4268749491621893`, `0.6085`, `100.00`, `8.08 × 1.25 = 10.10`
- Schedule A figures: `Main-12 1.067`, `ADT-36 1.224`
- Lower list: `- −1 aggregate 1.0584166666666666, completed minimum 1.052, forward minimum 1.018;`
- Lower list: `- −2 aggregate 1.0541666666666665, completed minimum 1.050, forward minimum 1.014; and`
- Lower list: `- −3 aggregate 1.0525, completed minimum 1.050, forward minimum 1.012.`
- union list: `- all thirty annual point estimates and full simultaneous one-sided 95% interval bounds.`
- footer: `Part of the 2294 Ratification Record`
- absent: removed restatement: `Nothing is withheld.`
- absent: compressed labels: `reported-comparison identity`, `§1.6 disposition identity`

### path-2-registrar-execution-record-2294.md
- headings: `# Independent §11.4 Registrar Execution Record`, `## I. Authority and fence`, `## II. Escrow identity`, `## III. Executed union`
- headings: `## IV. Computed dispositions`, `## V. Issuance order`, `## VI. Certification`
- fields: `**Execution:** PATH2-REGISTRAR-EXECUTION-2294-10-20`, `**Started:** 2294-10-15 09:00 UTC`
- fields: `**Completed and issued:** 2294-10-20 17:30 UTC`, `**Status:** Conformity certified; instrument issuance permitted`
- escrow file: `path-2-registrar-execution-2294-data.json`
- declaration: `NO_RANDOM_SEED_DETERMINISTIC_EXECUTION`
- fence list: `It does not select a model, alter an estimand, revise a threshold, assess whether the locked design was wise, or exercise Commission judgment.`
- dispositions list: `- Finding I — PASS;`, `- Finding II — PASS;`, `- Finding III — PASS;`, `- Finding IV — PASS;`
- dispositions list: `- A1–A8 — PASS; Schedule A CERTIFIED;`, `- B1–B6 — PASS; Schedule B CERTIFIED; and`, `- effective notice — VALID.`
- issuance dates: `2294-11-01`, `2294-11-15`, `2294-12-01`
- certification (operative, verbatim): `The escrowed record is complete, executable, and conforming. Issuance is permitted.`
- certification (operative, verbatim): `This certificate does not endorse the merits of the schedule or the Commission's design.`
- footer: `Part of the 2294 Ratification Record`
- absent: removed reversal: `decides conformity, not merits`

### path-2-lower-incidence-certificate-2294.md
- headings: `# 2294 Lower Incidence Certificate`, `## I. Separate evidentiary judgment`, `## II. Layer comparisons`, `## III. Route and obligation maps`
- headings: `### Layer −1`, `### Layer −2`, `### Layer −3`, `## IV. Findings B1–B6`, `## V. Nonseverability and certification`
- fields: `**Instrument:** LP074-LOWER-INCIDENCE-CERTIFICATE-2294`, `**Issued:** 2294-11-15`
- fields: `**Authority:** LP-074 §6 and Path 2 Charter §14.1`, `**Dependency:** Locked 2292 Charter Restatement Snapshot`, `**Disposition:** Schedule B certified`
- scope (operative, verbatim): `This certificate decides Schedule B only.`
- exclusions (operative, verbatim): `No Main receipt, Automation Dividend Treasury receipt, Savings Circulation Mandate recycle, other-layer receipt, private-velocity estimate, favorable behavioral response, cyclical backfill, or predecessor-petition magnitude enters B1–B6.`
- data file: `path-2-lower-incidence-certificate-2294-data.json`
- units: `billions of layer credits in constant 2292 purchasing power`
- layer table header: `| Layer | Proposed rate | Audited collection | Chargeable obligations | Twelve-month aggregate | Weakest completed month | Weakest forward month |`
- layer rows: `| −1 | 25% | 1,270.1 | 1,200 | 1.0584166666666666 | 1.052 | 1.018 |`
- layer rows: `| −2 | 12.5% | 759.0 | 720 | 1.0541666666666665 | 1.050 | 1.014 |`
- layer rows: `| −3 | 6.25% | 378.9 | 360 | 1.0525 | 1.050 | 1.012 |`
- floors: `exceeds the 1.05 aggregate floor and meets or exceeds 1.00`
- route and obligation terms: `Non-tax carry is expressly zero and unused`, `expressly zero and prohibited`, `named ADT-surplus destination`
- B rows: `| B1 — Complete route map | PASS | Every audited collection reconciles without remainder to named destinations. |`
- B rows: `| B2 — Complete obligation map | PASS | Every chargeable obligation, payment order, funding destination, and legally available non-tax zero is enumerated and reconciled. |`
- B rows: `| B3 — Proposed-rate quantities | PASS | Li(m) and Oi(m) use admissible layer-specific sources at the pre-lock vintage; prohibited cross-credit is absent. |`
- B rows: `| B4 — Current coverage | PASS | All three layers clear 105% in aggregate and 100% in each of twelve completed months. |`
- B rows: `| B5 — Forward coverage | PASS | All three layers clear 100% in each of thirty-six preregistered forward months without favorable behavioral credit. |`
- B rows: `| B6 — Reproducibility and adoption | PASS | The standing audit recomputed B1–B5 and adopted the quantities under record LP074-PATH2-ADOPTION-2294. |`
- nonseverability: `LP-074 makes the Lower reductions nonseverable`, `unless all three layers pass. All three did.`
- rates: `35/17/8`, `25/12.5/6.25`
- operative, verbatim: `This certificate neither sets nor activates Schedule A.`
- footer: `Part of the 2294 Ratification Record`
- absent: removed reversal: `a sequencing prerequisite, not evidence`
- absent: intransitive "publish": `unrounded computations publish in`

### lp-075-section-13-review-set.md
- headings: `# LP-075 §13.1 Cold Review Set`, `## I. Mechanical reviewer selection`, `## II. Cold-review findings and replies`
- headings: `### R1 — Conflict with the Presidency's Part V no-duty holding`, `### R2 — RR-8 and the first window`
- headings: `### R3 — Risk that commencement becomes compelled certification`, `### R4 — Strategic non-locking`
- headings: `## III. Chamber adoption`, `## IV. Presidential veto flag`, `## V. Final disposition`
- fields: `**Review set:** LP075-SECTION-13-1-REVIEW-SET`, `**Amendment filed:** 2289-03-01`, `**Cold review published:** 2290-01-15`
- fields: `**Reviewer replies published:** 2290-05-01`, `**Chamber adoption:** 2291-01-15`, `**Presidential disposition and enactment:** 2291-01-20`
- reviewer: `AUDIT-METHOD-ENTITY-12`, `highest-ranked eligible entity`
- data file: `lp-075-section-13-review-set-data.json`
- severities: `**Severity:** Highest.`, `**Severity:** High.`, `**Severity:** Medium.`
- findings: `**Finding:** Compelled commencement reverses the adopted statement that non-commencement is not a defect and that the status quo bears no burden of motion.`
- findings: `**Finding:** RR-8 prices 2279–2288 non-commencement as lawful history.`
- findings: `**Finding:** A commencement duty could be read as pressure toward a rate outcome.`
- findings: `**Finding:** A constituted Commission could dissolve and recreate omission.`
- dispositions: `**Disposition:** Sustained and preserved.`, `**Disposition:** Cured by outcome neutrality.`
- dispositions: `**Disposition:** Cured by replacement constitution, public attribution, and Meritboard sanction.`
- R1 reply, operative condition: `Section 13.1 permits the chambers to amend cadence prospectively. The amendment is legally available only if it preserves the first window as lawful history and leaves every factual and evidentiary gate untouched.`
- vote table: `| Gate | Result |`, `| Meritboard | 73% |`, `| Supreme Court | 7/10 |`, `| Sanctuary | 97% |`, `| Main | 84% |`, `| Lower-layer aggregate | 72% |`
- adoption scope: `The chambers adopted LP-075 as a §13.1 amendment to cadence only. They did not set a rate, activate a schedule, or weaken A1–A8 or B1–B6.`
- Presidency holding: `binding under the 2279 Charter but amendable through §13.1`, `compelling a fact-finding process did not prejudge the fact found`
- final: `within 180 days`, `required a lock no later than 2292`, `LP-074 and the later certificates remained the only route to a rate change.`
- footer: `Part of the 2294 Ratification Record`
- absent: removed reversals: `prospectively, not retroactively`, `Charter amendment, not construed away`, `does not retroactively relabel the first window. It creates`

### path-2-charter-restatement-snapshot-2292.md
- headings: `# Locked 2292 Charter Restatement Snapshot`, `## I. Population fixed at lock`, `## II. Reconciliation to the controlling evidence`
- headings: `## III. Excluded streams and obligations`, `## IV. Vintage finding`, `## V. Seal`
- fields: `**Instrument:** PATH2-RESTATEMENT-SNAPSHOT-2292`, `**Locked:** 2292-02-15`, `**Section 6.2 cutoff:** 2292-01-01`
- fields: `**Public release with the 2294 compendium:** 2294-11-15`, `**Status:** Controlling population statement under Charter §§3.1 and 10.1`
- defined terms: `M(m)`, `M(m) = 100`
- population scope (exhaustive list): `The following and only the following Main institutional obligations constitute the population`
- units: `billions of layer credits per month in constant 2292 purchasing power`
- instrument, table: `| Payment order | Obligation identifier | Legal head | Monthly amount |`
- instrument, table: `| 1 | MAIN-ENFORCEMENT-NETWORK | Federal enforcement network | 40 |`
- instrument, table: `| 2 | MAIN-CONSTITUTIONAL-COURTS | Constitutional and federal courts | 25 |`
- instrument, table: `| 3 | MAIN-BOUNDARY-INFRASTRUCTURE | Layer boundary infrastructure | 35 |`
- instrument, table: `| | | **Total M(m)** | **100** |`
- predecessor-petition exclusion: `No category, weight, or amount from that petition entered this snapshot.`
- windows and totals: `twelve months 2291-01 through 2291-12`, `twelve-month total of 1,200`
- windows and totals: `thirty-six months 2295-01 through 2297-12`, `forward total of 3,600`
- projection scope: `Projection changes quantities only through the locked model`
- data file: `path-2-charter-restatement-2292-data.json`
- instrument, Part III: `- Automation Dividend Treasury dividend obligations;`, `- Savings Circulation Mandate recycling;`, `- every Lower-layer obligation and collection;`
- instrument, Part III: `- discretionary expenditure not enumerated at lock; and`, `- cyclical backfill.`
- instrument, Part III modal: `None may enter the numerator or denominator of Finding I or Schedule A's Main-coverage limbs.`
- vintage: `maximum published reporting lag was forty-five days`, `2292-02-15 lock produces the 2292-01-01 cutoff`
- vintage: `ended on or before that cutoff`, `fixed at the 2292-02-01 vintage, before lock`
- seal: `The Commission deposited this snapshot at lock.`
- footer: `Part of the 2294 Ratification Record`
- absent: removed reversals: `not a discretionary budget and not the allocation`, `projections, not later observations`
- absent: split contrast with no plural antecedent: `They do not add an obligation`
- absent: intransitive "publish": `reconciliation booleans publish in`

## (c) Flags

1. **Stale SHA-256 rows kept (frozen here; the ship step recomputes).** Three rows of the compendium table no longer match the live bytes: `build-path2-certification-page.mjs`, the compendium annex JSON and the Registrar JSON (scout report). The sibling 25.6.4 `cert` unit rewrites the certification generator's prose, which moves that digest again and cascades into the compendium annex and Registrar digests. Hand-update the table from `sha256sum` only after both units land and `node tools/build-path2-record-annexes.mjs` has rerun. The table lists JSON and .mjs files only, so these six Markdown edits move no digest.
2. **Authority map, LP-075 §13.1 row (reading decision; Jason may reverse).** The original Result cell called RR-8 a "contrary" authority that the amendment "survived … prospectively". The review set it points to finds the opposite for RR-8: R2 is "Sustained and preserved", and the reply says LP-075 does not relabel the first window. Part IV says LP-075 "displaced" the Part V no-duty holding "prospectively". The draft states the row that way. If "contrary" was meant only as "an authority the review had to test", the original wording can be restored without touching anything else.
3. **Snapshot scope (revised on verification).** The first pass kept Parts I–IV byte for byte as the locked 2292 instrument. Verification ruled that nothing freezes them (the scout report says no script renders or checks the annexes) and that the depth covers instruments, so Parts I–IV are now reconstructed like the other annexes. Three sentences changed. Part I's stacked reversal became a statement followed by a "neither … nor" sentence. In Part II, "They do not add an obligation" had no plural antecedent and was merged into the sentence before it. Part IV's "projections, not later observations" became two statements. The table, the list, the field block, every date and figure, and the operative "None may" sentence are unchanged. The rest of Parts I–IV is plain and exact, so it was kept; "the following and only the following" is the statutory form of an exhaustive list. The first pass had already rewritten the Part II publication pointer ("publish in" became "are published in") and the Part V seal. check.mjs still holds the old Part I–IV line lock. Its removal was blocked in this session, so the checker needs that edit before it can pass.
4. **Lower certificate, "every included and forward month" became "every completed and forward month".** "Included" is read as the twelve completed months of the current window, which is the wording B4 uses ("each of twelve completed months").
5. **Registrar, "Their byte identities" became "The digest of each".** The Registrar JSON also records each file's byte count; the compendium's Markdown table carries digests only. Both places named in the sentence do publish the digests.
6. **Compendium §5.3 widths.** "clear" became "satisfy", and each "X against Y" became "X (Y)", with Y named as the maximum admissible width. That reading comes from the compendium annex JSON (`precision.*.maximumAdmissibleWidth`), and every listed width is below its maximum.
7. **Fence wording.** The Registrar's "decides conformity, not merits" became "decides conformity and makes no merits determination". The compendium keeps "It makes no merits judgment." The certificate's own disclaimer in Part VI is unchanged.
8. **Registrar Part V.** "before any operative instrument issued" was cut from the closing sentence, since the sentence before it names all three instruments. The original's tail also grouped the effective notice (which is "published", not "issued") among the operative instruments; the draft keeps the notice in the list but no longer calls it an instrument.
9. **Review set R1 Disposition.** The draft keeps the original's passive "presented as a prospective Charter amendment" and does not say who presented it (the sponsors, by the dates in the field block).
10. **Review set Part V.** "required the remedial Commission within 180 days" became "required the remedial Commission to be constituted within 180 days", following LP-075 §3 ("a Commission had to be constituted within 180 days of enactment").
11. **Timeline observation, not changed.** The compendium annex JSON dates the seven Commission signatures 2294-10-21 through 2294-10-27, after the Registrar's execution completed (2294-10-20 17:30 UTC), yet the Registrar record says every instrument disposition matched its comparison under §1.6. STATUTORY_CONSTANTS `auditCompleted` is 2294-10-15, the Registrar's start. The Markdown annexes give no signing dates, so nothing here conflicts, but the JSON sequence may want a ruling.
12. **Forms kept as written.** The review set keeps "7/10" unspaced (the JSON form; the Act page shows "7 / 10"). The authority map keeps hyphen-minus "-1, -2, and -3"; the other annexes use U+2212 "−1". "snapshotted" is kept because the Charter uses it as a term of art ("snapshotted at lock per §10.1").
13. **Count changes reported by check.mjs.** Compendium "exactly" 0 → 1 (from "exact escrow digests"). Review set "first" 5 → 4 ("description of the first" became "description of that window"). No strict modal (shall, may, must, can, cannot) was added or dropped in any file.
14. **Length.** Every draft is longer (+1.4% to +4.9%; see the table). The growth comes from spelling out compressed labels ("reported-comparison identity", "§1.6 disposition identity", "the ordered obligations") and from adding articles to noun stacks. The reversal-shaped constructions in the prose go to zero in all six files.
15. **Shipping path.** No generator, guard or verifier reads these files, so the ship step is a straight copy of the six drafts over `documents/`, then the SHA table fix in flag 1. check-canon's World-tier scans read root `.html` only; the drafts pass those regexes anyway.
