# Records 25.6.4, cert unit: reconstruction ledger

Draft only. `tools/build-path2-certification-page.mjs` was not edited. The reconstruction is `build-path2-certification-page.mjs` in this folder, a full copy of the generator with only the prose inside the `buildCertificationHtml` template literal rebuilt.

Checker: `node docs-review/records-25.6.4/cert/check.mjs`. It renders the original and the draft through the real verifier and data, then confirms: the code outside the template literal is byte-identical; every `${...}` interpolation is unchanged and in order; the tag skeleton, every heading element and every id are unchanged; only prose text nodes differ; every frozen string below is present; the World-tier regexes stay clear; every figure and numbered token in the original prose survives. It also confirms every quote in section (a) appears verbatim in the rendered draft.

Scope rebuilt: the meta description, the hero lede, the disposition banner, the Schedule A and Schedule B banners, Publication completeness and Authority and effect. Left as written: the `<title>`, kicker, h1, every h2, the link, card and table-header labels, and all data-driven rows (chronology, Findings, A1–A8, B1–B6), which are code or data and frozen.

Quotes are matched against the rendered draft's visible text plus its meta description, after stripping tags, decoding entities and collapsing whitespace.

Word counts, as computed by the checker: visible text inside `<main>` went from 814 to 830 (+2.0%), and the rewritable prose, including the meta description, from 260 to 279. Register tells in the prose went from 3 to 0 contrastive "but" and from 3 to 0 semicolons. There were no em-dashes in the prose before or after; the page's em-dashes are all in the h1, the title and frozen row labels.

## (a) Fact ledger

Metadata
- Page title (STATUTORY_CONSTANTS record.title): `Path 2 LP-074 Final Certification — 2294 • The Five Rings`
- Description, controlling 2294 certification: `The controlling 2294 Path 2 certification.`
- Description, Findings I–IV over 30 annual observations: `Findings I–IV over 30 annual observations`
- Description, A1–A8 and B1–B6 passed: `Schedule A conditions A1–A8, and Schedule B conditions B1–B6 passed.`
- Description, cascade in force 2295: `LP-074's 50 / 25 / 12.5 / 6.25 cascade entered force in 2295.`

Hero
- Kicker: `The Five Rings · Path 2 · final certification`
- H1: `LP-074 final certification — 2294`
- Controlling, human-readable: `The controlling certification in human-readable form`
- Committed 2294 dataset: `generated from the committed 2294 dataset`
- External effective notice: `the external effective notice`
- Deterministic verifier: `the deterministic verifier`

Disposition banner
- Disposition: `SCHEDULES A AND B CERTIFIED.`
- 2294 Path 2 audit, Findings I–IV passed: `The 2294 Path 2 audit passed Findings I–IV`
- Exactly 30 keyed annual observations: `across exactly 30 keyed annual observations`
- Schedule A, A1–A8: `Schedule A conditions A1–A8`
- Schedule B, B1–B6: `and Schedule B conditions B1–B6.`
- Effective notice valid: `The effective notice was valid.`
- Complete exact halving cascade: `The complete 50 / 25 / 12.5 / 6.25 exact halving cascade`
- Entered force 2295: `exact halving cascade entered force in 2295`
- LP-073 preserved historically at 70 / 35 / 17 / 8: `LP-073 is preserved historically at 70 / 35 / 17 / 8`
- LP-073 superseded as operative rate law: `and is superseded as operative rate law.`
- LP-075 procedural only: `LP-075 remains procedural only.`
- $10 million threshold and SCM unchanged: `The $10 million threshold and SCM remain unchanged.`

Cross-links (labels and hrefs unchanged)
- `Authority map`
- `Controlling dataset`
- Effective notice JSON: `Effective notice Verifier`
- `Mutation tests`
- `Complete §11.1 compendium`
- `Registrar execution`
- `Lower certificate`
- `LP-075 cold review`

Cards (unchanged)
- Audit design locked 2292: `Audit design locked 2292`
- Annual horizon 30 years: `Annual horizon 30 years`
- Audit completed 2294: `Audit completed 2294`
- Schedule A certified: `Schedule A CERTIFIED`
- Schedule B certified: `Schedule B CERTIFIED`
- Effective 2295: `Effective 2295`

Required chronology (STATUTORY_CONSTANTS, unchanged)
- Heading: `Required chronology`
- 2278: `2278: LP-074 enacted conditionally`
- 2279–2288, no run: `2279–2288: No Path 2 run`
- 2279–2288, no duty: `the original framework imposed no mandatory commencement duty`
- 2289–2291: `2289–2291: The inaction-veto dispute produced LP-075`
- 2291: `2291: LP-075 created a mandatory commencement duty without setting a rate`
- 2292: `2292: Audit design, evidence rules, methods, and source definitions locked`
- 2294, completion and certification: `2294: Audit completed; Schedules A and B independently certified`
- 2294, notice: `effective notice published`
- 2295: `2295: The complete LP-074 exact halving cascade entered force`
- 2300: `2300: Current canon operates at 50 / 25 / 12.5 / 6.25`

Findings I–IV table (code and data, unchanged)
- Heading: `Mandatory Charter Findings I–IV`
- Column headers: `Finding Controlling result Status`
- Finding I name: `Finding I — institutional adequacy`
- Finding I result: `Worst of 30 keyed annual coverage lower bounds: 1.010`
- Finding I floor: `against strict floor > 1.000`
- Finding II name: `Finding II — ADT elasticity`
- Finding II, all 30 years: `All 30 keyed years strictly clear both bounds`
- Finding II, dividend: `weakest dividend lower bound 100.10 > 100.00`
- Finding II, schedule effect: `weakest schedule-effect lower bound 0.02 > 0.00`
- Finding III name: `Finding III — concentration response`
- Finding III, SCM activation: `SCM activation upper bound 10.08 against strict ceiling < 10.10`
- Finding III, Flow: `minimum Flow 0.510 against strict floor > 0.500`
- Finding IV name: `Finding IV — retained-capital utility`
- Finding IV, net marginal value: `Weakest annual net marginal-value lower bound 0.10 against strict floor > 0.00`
- Finding IV, concentration events: `maximum attributable concentration events 0`
- Status: `PASS`

Schedule A table (code and data, unchanged)
- Heading: `LP-074 Schedule A conditions`
- Column headers: `Condition Executed result Status`
- A1 registry: `A1 — provenance 2292 registry: 3 transforms and 6 locked sources`
- A1 rows: `all 84 rows resolve to them`
- A1 cutoff: `completed observations end by the 2292-01-01 cutoff`
- A1 projections: `later targets are preregistered projections`
- A2: `A2 — Main current coverage Main-12 106.7% against 105.0%`
- A3: `A3 — Main monthly floor Main current weakest month 101.2% against 100.0%`
- A4: `A4 — Main forward floor Main forward weakest of 36 months 101.4% against 100.0%`
- A4 attestation: `complete ordered window SHA-256-attested`
- A5: `A5 — dividend aggregate ADT-36 122.4% against 120.0%`
- A6: `A6 — dividend monthly floor Dividend weakest of 36 completed months 101.1% against 100.0%`
- A7: `A7 — stream separation 6 source classifications validated`
- A7 cross-credit: `prohibited cross-credit categories absent`
- A8: `A8 — reproducibility A2–A7 and all reported metrics successfully recomputed`
- A8 source: `from the raw monthly record`

Schedule A banner
- Disposition: `Schedule A: CERTIFIED.`
- All four Charter Findings and A1–A8 pass: `Charter Findings I–IV and statutory conditions A1–A8 all pass.`

Schedule B table (code and data, unchanged)
- Heading: `LP-074 Schedule B conditions`
- Column headers: `Condition Independent Lower-incidence result Status`
- B1, -1: `-1: 1270.1 audited = 1270.1 routed; 1200.0 obligations funded`
- B1, -2: `-2: 759.0 audited = 759.0 routed; 720.0 obligations funded`
- B1, -3: `-3: 378.9 audited = 378.9 routed; 360.0 obligations funded`
- B2, each layer: `4 ordered obligations; 2 explicit non-tax zeros`
- B3, months: `12 keyed current months per layer`
- B3, rates: `-1 at 25%, -2 at 12.5%, -3 at 6.25%`
- B3, sources: `every Li/Oi row resolves to an allowed layer-specific source`
- B4, -1: `-1: 105.84% current aggregate (required 105%), 105.20% current weakest (required 100%)`
- B4, -2: `-2: 105.42% current aggregate (required 105%), 105.00% current weakest (required 100%)`
- B4, -3: `-3: 105.25% current aggregate (required 105%), 105.00% current weakest (required 100%)`
- B5, -1: `-1: 101.80% forward weakest across 36 months (required 100%)`
- B5, -2: `-2: 101.40% forward weakest across 36 months`
- B5, -3: `-3: 101.20% forward weakest across 36 months`
- B6, adoption record: `LP074-PATH2-ADOPTION-2294 adopts B1–B6 for -1, -2, -3`
- B6, recomputation: `B1–B5 and all reported metrics recomputed successfully`

Schedule B banner
- Disposition: `Schedule B: CERTIFIED.`
- B1–B6 pass independently for each layer: `Conditions B1–B6 pass independently for layers -1, -2, -3.`
- Lower collections siloed and layer-attributed: `Lower collections remain siloed and attributed by layer.`
- Certification does not universalize SCM: `The certification does not extend SCM beyond its layer-specific scope.`

Publication completeness
- Heading: `Publication completeness`
- §11.1 compendium, sixteen-member §4 union: `The §11.1 compendium publishes the complete sixteen-member §4 union`
- Point estimates and intervals: `all point estimates and intervals`
- Exclusions, representatives, votes, exposure: `validation-floor exclusions, class representatives, votes, exposure declarations`
- Environment, execution log, provenance: `environment declaration, execution log, and provenance`
- Registrar executed the eight §4.6 representatives first: `The independent Registrar executed the eight §4.6 representatives before either certificate issued.`
- Locked Restatement: `The locked Restatement itemizes every Main obligation.`
- LP-075 review set, reviewer: `The LP-075 review set publishes its mechanically selected reviewer`
- LP-075 review set, other contents: `reviewer replies, chamber adoption, and presidential veto flag`

Authority and effect
- Heading: `Authority and effect`
- LP-074 substantive rate law: `LP-074 is the substantive rate law.`
- LP-075 compelled the audit: `LP-075 compelled the audit.`
- LP-075 set no rate, activated no schedule: `It set no rate and activated no schedule.`
- 2294 certificates and notice, effective 2295: `The valid 2294 certificates and notice made LP-074 effective in 2295.`
- LP-073 historical era: `LP-073 governed the historical 70 / 35 / 17 / 8 era.`
- LP-073 visible in register and rate history: `It remains visible in the register and the rate history`
- LP-073 no residual authority after 2295: `has no residual operative rate authority after 2295`

## (b) Frozen-string checklist

Every string below is confirmed present in the rendered draft (or, for interpolations, in the draft source) by check.mjs.

test:certification positive controls (test-path2-certification-mutations.mjs:220–224)
- `SCHEDULES A AND B CERTIFIED`: present
- `exactly 30 keyed annual observations`: present
- `Main-12 106.7%`: present
- `ADT-36 122.4%`: present
- `complete ordered window SHA-256-attested`: present

STATUTORY_CONSTANTS as rendered (verify-path2-certification-2294.mjs)
- `Path 2 LP-074 Final Certification — 2294`: present (in `<title>`)
- `LP-074 enacted conditionally`: present
- `No Path 2 run; the original framework imposed no mandatory commencement duty`: present
- `The inaction-veto dispute produced LP-075`: present
- `LP-075 created a mandatory commencement duty without setting a rate`: present
- `Audit design, evidence rules, methods, and source definitions locked`: present
- `Audit completed; Schedules A and B independently certified; effective notice published`: present
- `The complete LP-074 exact halving cascade entered force`: present
- `Current canon operates at 50 / 25 / 12.5 / 6.25`: present
- notice.scheduleA and notice.scheduleB, `CERTIFIED`: present (cards and both banners). No other notice string was rendered on the page before or after; the checker lists them.
- check.mjs also walks every string leaf of STATUTORY_CONSTANTS and confirms each one rendered on the original page is still rendered.

Guard-mutation probe (test-canon-guard-mutations.mjs:330)
- `<body`: present

Interpolations (frozen, same order; the checker compares the full sequence)
- `${auditYear}`, `${C.annualObservations}`, `${activeSchedule}`, `${effectiveYear}`, `${historicalSchedule}`, `${esc(C.unchangedCanon.threshold)}`, `${notice.scheduleA}`, `${notice.scheduleB}`, `${layerNames.join(', ')}`, `${esc(data.record.title)}`: present

Headings and ids (unchanged)
- `id="findings"`, `id="schedule-a"`, `id="schedule-b"`, `id="main-content"`, `id="navbar-placeholder"`, `id="footer-placeholder"`: present
- `LP-074 final certification — 2294`, `Required chronology`, `Mandatory Charter Findings I–IV`, `LP-074 Schedule A conditions`, `LP-074 Schedule B conditions`, `Publication completeness`, `Authority and effect`: present

check-canon on this page (absence pins, all clear on the draft render)
- World tier: no founder's ruling or override; no seat name; no superseded refusal phrasing; no taxation-is-charter-level predication; no unresolved x.html#frag link. The page has no fragment links, and no page in the repo links to a fragment of it.
- check-canon (f) evaluates the data and notice JSON only; it pins no text on this page.

Not applicable to this unit
- linkFirst phrases ("a schedule adopted by the chambers", "This Schedule is part of the Charter") belong to build-path2-pages.mjs; none occurs in this generator.
- No heading id on this page derives from heading text (the three ids are literal attributes), so there are no slug headings.

## (c) Flags

1. Digest binding. Splicing this draft into `tools/build-path2-certification-page.mjs` changes its SHA-256. The ship step must run `build:certification`, then `build:path2-record` (recomputes the compendium `artifacts` and registrar `escrowedArtifacts` digests), then hand-update the stale SHA-256 table in `documents/path-2-section-11-compendium-2294.md` from `sha256sum`. Three rows there are already stale before this change.
2. Latent-inventory quote. `docs-review/vmss-laws-latent-inventory.md:2001` (path2-record-116) quotes the original Schedule B banner sentence verbatim and classes it as an operative cross-layer boundary. The draft rewords it as two sentences with the same scope: "Lower collections remain siloed and attributed by layer. The certification does not extend SCM beyond its layer-specific scope." "Does not universalize SCM" is read as "SCM keeps its layer-specific scope", which matches the notice constant `scm: 'unchanged in parameters and layer-specific scope'`. If Jason wants the inventory quote to stay exact, restore the original sentence at splice. Otherwise update the inventory quote.
3. "environment" became "environment declaration", and "replies" became "reviewer replies". Both use the annexes' own terms: the §11.1 compendium lists "the environment declaration", and the LP-075 review set dates its "Reviewer replies". The meaning is unchanged.
4. "All four Charter Findings" became "Charter Findings I–IV". The count is carried by the numbering. The checker's token check excludes number words for this reason.
5. The meta description keeps the hard-coded "30" (not interpolated), as in the original.
6. "for layers -1, -2, -3" adds the noun "layers" before the frozen `${layerNames.join(', ')}` interpolation. The rendered list is unchanged.
7. No new prose word is a bare Tailwind utility, so `build:css` parity should be unaffected. The rendered page is in Tailwind's `./*.html` scan, so the ship step still runs parity.
