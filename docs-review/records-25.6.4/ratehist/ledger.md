# Records 25.6.4, unit ratehist: reconstruction ledger

Draft only. The live `rate-history.html` is untouched. The reconstruction is `rate-history.html` in this folder, and it is a hand-written page with no generator, so the splice is a straight file replacement.

Checker: `node docs-review/records-25.6.4/ratehist/check.mjs`. Quotes are matched after stripping tags, decoding entities and collapsing whitespace, with curly apostrophes read as straight. The text searched is `<title>`, the meta description and everything inside `<main>`, table included.

Scope of the rewrite: every prose paragraph, the hero line, the banner, the footnote and the meta description. Left byte-identical: `<head>` apart from the description, the `<title>`, the kicker, the h1 and every h2, the whole rate table, every crosslink label, every `<strong>`/`<em>`/hash span, every `href` and `id`, and the tag skeleton (tags, attributes and classes in the same order).

## Word counts

Visible text inside `<main>`, headings, table and link labels included.

| File | Original | Reconstruction |
|---|---|---|
| rate-history.html | 2352 | 2235 |

That is −5.0%. Register tells in the prose (the table and crosslink rows excluded), original → reconstruction: reversal constructions 2 → 0, em-dashes 32 → 10. The ten that remain are all in the h1, the four h2s, the two list-item labels, the footnote label, and the two inside the verbatim whitepaper doctrine quotation.

## (a) Fact ledger

Metadata and hero
- Page title: `Rate-History Record • The Five Rings`
- Description, excavated trajectory: `The civilization's excavated tax-rate trajectory`
- Description, founding cap and historical LP-073: `the founding net-worth cap, the historical LP-073 schedule`
- Description, 2294 certification: `LP-074's 2294 certification`
- Description, cascade active from 2295: `the 50/25/12.5/6.25 cascade active from 2295`
- Kicker: `The Five Rings · Rate-History`
- H1: `Rate-History Record — The Excavated Tax Trajectory`
- Trajectory read off the record: `top-marginal rates as the record preserves them`
- Founding cap and historical 70 / 35 / 17 / 8 schedule: `the founding net-worth cap, the historical 70 / 35 / 17 / 8 consolidation schedule`
- Current exact cascade: `the current 50 / 25 / 12.5 / 6.25 exact cascade`
- Each stratum names its statute and evidence event: `Each stratum names the statute and the evidence event that govern it.`
- cut: hero adjective 'blunt' (characterization); the fact survives in the population arc as "a single blunt rate on accumulated wealth"

Provenance banner
- Mode label: `Mode: EXCAVATED`
- Excavated, not authored: `This trajectory is excavated, not authored`
- Every historical schedule preserved: `each historical schedule below is preserved in the civilization's record`
- Stratum 4b11bf2, founding cap: `4b11bf2 (founding net-worth cap)`
- Stratum 18f771d, layered schedule: `18f771d (layered income schedule)`
- Stratum 5c3a0f6, rounded point cascade: `5c3a0f6 (the historical rounded point cascade)`
- Culminates in 2294 certification and 2295 activation: `followed by LP-074's 2294 certification and 2295 activation`
- Anti-concentration instrument behind the transition: `The anti-concentration instrument behind the consolidation transition`
- Born at 00c7b49: `dates from 00c7b49`

Opening paragraphs
- Each engraved schedule is its own statute: `The register carries each engraved schedule as its own statute`
- Chain LP-071 to LP-074: `(LP-071 → LP-072 → LP-073 → LP-074)`
- Failed original petition is a refusal, not a stratum: `The failed original petition is recorded as a refusal and forms no stratum.`
- Later LP-074 conditional statute is distinct: `The later LP-074 conditional statute is a separate instrument`
- LP-074 became the current stratum after certification: `it became the current stratum after certification`
- LP-074 passed 5–0 in 2278: `LP-074 passed 5–0 in 2278.`
- 2279–2288 window closed lawfully without a run: `The original 2279–2288 Path 2 window closed lawfully without a run`
- LP-075 compelled the remedial process in 2291: `LP-075 compelled the remedial process in 2291`
- 2294 record passed Findings I–IV: `The final 2294 record passed Findings I–IV`
- Independently passed B1–B6: `and, independently, B1–B6`
- Both certified, notice, effective 2295: `Both schedules certified, and valid notice made the exact cascade effective in 2295.`

Rate table (byte-identical; one row per cell group)
- Column headers: `Era In-world years Top-marginal schedule Structure Trigger / cause Statute Provenance`
- Foundation, Y0–Y11, superseded: `Foundation Superseded Y0–Y11`
- Foundation schedule: `90–99% on net worth exceeding multiple billions`
- Foundation structure: `Single band · taxes stock (net worth)`
- Foundation cause: `Founding instrument; anti-concentration only`
- Foundation provenance: `4b11bf2 site v4.0 (genesis)`
- Confiscation, Y12–Y46: `Confiscation Superseded Y12–Y46`
- Confiscation schedule: `90–99 / 45–50 / 20–25 / 10–15 on income > $10,000,000`
- Confiscation structure: `Four bands · taxes stream (income) · layer-mapped`
- Confiscation cause: `Pivot from stock to stream; revenue and trust functions added`
- Confiscation provenance: `18f771d v9.0`
- Consolidation, superseded in 2295, Y47–2294: `Consolidation Superseded in 2295 Y47–2294`
- Consolidation schedule: `70 / 35 / 17 / 8 on income > $10,000,000`
- Consolidation structure: `Point rates · rounded point-halving cascade`
- Consolidation trigger: `Savings Circulation Mandate assumes anti-concentration (born 00c7b49 · v9.6.1)`
- Consolidation provenance: `5c3a0f6 v14.5`
- Abundance, refused, Y112 (2213): `Abundance Refused Y112 (2213) — petitioned, not engraved`
- Abundance schedule: `A further exact halving of every point — never in force`
- Abundance structure: `Would have kept point rates · one more halving`
- Abundance argument: `that automation-side revenue had matured enough to retire the rate's revenue function`
- Abundance gauntlet 1–4: `Failed 1–4 at gauntlet`
- Abundance advocacy review 3–2: `advocacy review moved Court, Sanctuary, and Main but reached only 3–2`
- Abundance zero-fail threshold, holdouts: `short of the zero-fail threshold. Meritboard and Lower held`
- Abundance statute and provenance: `None — failed petition No engraving no statute no stratum`
- Conditional successor, rule enacted 2278: `Conditional successor Rule enacted 2278`
- Successor dates: `Filed 2276 · enacted 2278 · first no-run window 2279–2288`
- Successor schedule: `50 / 25 / 12.5 / 6.25 proposed in two separately gated schedules`
- Successor structure: `Exact halving proposal · conditional and evidence-gated`
- Successor rule/fact split and 5–0: `chambers vote the rule; the audit finds the facts. Passed 5–0.`
- Original §12.3 no duty: `Original §12.3 imposed no duty to run, so the first no-run window was lawful.`
- Successor provenance: `Registered 2278 Both schedules certified 2294`
- Current era: `Exact Halving-Cascade Era Current 2295–present`
- Current schedule: `50 / 25 / 12.5 / 6.25 on income > $10,000,000`
- Current structure: `Exact mathematical halving cascade · both schedules active`
- Current cause, Schedule A: `LP-075 compelled the audit; Findings I–IV passed and Schedule A certified.`
- Current cause, Schedule B: `B1–B6 independently passed and Schedule B certified.`
- Current cause, notice: `Valid notice completed in 2294 for the 2295 assessment period.`
- Current statute and provenance: `LP-074 + 2294 certification Effective notice active 2295`

Table note
- $10,000,000 threshold unchanged since the layered schedule: `earned-income threshold has not changed since the layered schedule introduced it`
- Threshold figure: `The $10,000,000 earned-income threshold`
- Founding cap predates it, taxed net worth: `The founding cap predates the threshold and taxed net worth rather than income.`
- Y47 boundary: `Y47 (SCM transfer)`
- Y112 boundary, record convention: `Y112 (the abundance petition) are record convention`
- Y11 split: `as is the Foundation/Confiscation split at Y11`

The band-to-point precision arc
- Heading: `The band-to-point precision arc`
- Founding strata governed by bands: `The two founding strata were governed by bands`
- Band defined: `a range within which the layer's authority set posture annually`
- What a young institution could honestly enforce: `A band was what a young institution could honestly enforce.`
- cut: 'Bands were not imprecision for its own sake' (reversal); its positive half is the row above
- 18f771d text quoted: `the layered schedule still read "90–99% / 45–50% / 20–25% / 10–15%," one range per layer`
- Enforcement had not matured: `had not yet matured to the point where a single number could be held`
- 5c3a0f6 cut to points in one restructure: `the bands were cut to points in a single restructure: 70 / 35 / 17 / 8`
- Rounded point-halving cascade: `a rounded point-halving cascade`
- LP-073 §3 quoted verbatim: `Band-to-point is itself doctrine: point rates are what a matured enforcement capability produces.`
- Held through 2294: `That historical schedule held through 2294.`
- LP-074 established the exact cascade: `LP-074 then established the exact 50 / 25 / 12.5 / 6.25 mathematical cascade`
- After the evidence gates cleared: `after its evidence gates cleared`

The one-million-to-present population arc
- Heading: `The one-million-to-present population arc`
- Roughly one million citizens: `The founding-era record numbers the civilization at roughly one million citizens.`
- Figure anchors earliest SCM parameters: `The same figure anchors the earliest Savings Circulation Mandate parameters`
- $100,000 per citizen reads as $100 billion: `a $100,000-per-citizen average savings balance reads as $100 billion in aggregate`
- Across one million citizens: `across one million citizens`
- Single blunt rate on wealth sufficient at that scale: `At that scale a single blunt rate on accumulated wealth was sufficient`
- Few concentration vectors: `the concentration vectors were few enough for one instrument to watch them all`
- Growth outran a single instrument: `no single blunt instrument could carry all three of taxation's founding functions`
- The three functions: `revenue, anti-concentration, and trust`
- Layered schedule split the burden by benefit: `The layered schedule divided the burden among the layers by benefit received.`
- SCM took anti-concentration off the rate: `The SCM then took anti-concentration off the marginal rate entirely.`
- Each widening retired a job the rate did alone: `Each stage of growth retired a function the tax rate had carried alone`
- Each retirement let the rate fall: `each retirement allowed the rate to fall`
- cut: 'The trajectory down is the trace of the institution outgrowing its own crutches.' (metaphor restating the row above)

Era artifacts
- Heading: `Era artifacts — the 70-schedule period`
- Consolidation rate 70 / 35 / 17 / 8: `The Consolidation-era rate (70 / 35 / 17 / 8) is the schedule`
- v14.5 simulations authored under it: `Doctrine-Snapshot v14.5 simulations were authored`
- Pinned artifacts of the stratum: `These cards are pinned artifacts of that stratum.`
- Never revised to track the schedule: `They are never revised to track the schedule`
- Show the world at the 70-rate: `They show the world as it stood at the 70-rate`
- The Wealth Ceiling, Sera Voss, $200M: `The Wealth Ceiling — Sera Voss, the neural-diving composer, grosses $200M`
- Keeps $60M at 70%: `keeps $60M at the 70% top marginal rate`
- Canonical illustration of the elite-wealth market: `the canonical illustration of the elite-wealth market the point schedule was tuned to permit`
- SCM prevents concentration: `while the SCM prevents concentration`
- Other two v14.5 snapshots: `The Cradle Offensive and The Border Audit — the other two v14.5 civilizational snapshots`
- Same period: `of the same period`
- Era-pinned by design, left as engraved: `Doctrine-Snapshot-stamped simulations are era-pinned by design and left exactly as engraved.`
- Historical records, not the current rate: `They record the 70-schedule period and do not describe the current rate.`
- No recalculation: `No historical result is recalculated when a later schedule changes.`

The succession chain
- Heading: `The succession chain — the fourth and fifth beats`
- Superseded, not erased: `A replaced stratum is superseded and stays in the record`
- Record keeps where and why: `where the civilization stood at each stage and why it moved on`
- Current rate authority: `The current rate authority is LP-074 at 50 / 25 / 12.5 / 6.25`
- With 2294 certificates and notice: `together with the 2294 Path 2 certificates and valid effective notice`
- LP-073 historical: `LP-073 is historical.`
- Fourth beat is a refusal, not a supersession: `The fourth beat is a refusal, and it replaced no stratum.`
- Petition to halve once more, abundance argument: `A petition to halve the cascade once more was filed on an abundance argument`
- Lost: `lost in the chambers`
- Gauntlet 1–4: `The gauntlet returned 1–4.`
- Advocacy review argued cold, citations verified, re-ran the vote: `An advocacy review, argued cold with every citation verified, took the vote again`
- Moved Court, Sanctuary, Main to 3–2: `moved three chambers (Court, Sanctuary, and Main), reaching 3–2`
- Zero failing chambers required: `Enactment requires zero failing chambers.`
- Meritboard and Lower held; schedule did not move: `Meritboard and Lower held, and the schedule did not move.`
- cut: 'That is the beat worth reading closely, because nothing happened and the nothing was the point.' (rhetoric, no fact)
- Question put: these rates, now, on this evidence: `The chambers were asked whether these rates should fall now, on the evidence presented.`
- General question not asked: `Whether rates should fall at all was not before them.`
- Evidence judged authored, declined: `They judged the evidence authored rather than audited, and declined.`
- Defeated 2213 challenger kept beside the strata: `The record keeps the defeated 2213 challenger beside the enacted strata.`
- cut: 'makes the record honest: the civilization has a direction of travel and still makes itself prove each step' (restatement; survives as "every step down has to be earned in the open" and "The direction of travel outlived the petition")
- Literature preserved in full: `The contest's literature is preserved in full.`
- Opposition brief held two chambers at both adjudications: `The opposition brief that held two chambers at both adjudications`
- Advocacy brief moved three: `the advocacy brief that moved three`
- Supplemental steelman after the vote closed: `the supplemental steelman registered after the vote closed`
- Publish in perpetuity at the Ratification Record: `all publish in perpetuity at the Ratification Record`
- Failed petition is a boundary marker under standing doctrine: `Under standing doctrine a failed petition is a boundary marker`
- Briefs record where and why: `the briefs record where the boundary was drawn and why`
- cut: 'A failed petition is not an embarrassment to be tidied away' (reversal; positive half is the row above)
- Sixty-three years: `The fifth beat came sixty-three years later.`
- Closed line bars resubmission: `The closed line does not permit a resubmission`
- Successor filed at approximately Y175 (2276) as a new petition: `at approximately Y175 (2276) a successor line was filed as a new petition`
- Built on what the refusal established: `built on what the refusal had established`
- Passed 5–0 as LP-074: `It passed its gauntlet 5–0 and became LP-074`
- First zero-fail law of the rate line: `the first zero-fail law of the rate line`
- Register's first conditional rate law: `the register's first conditional rate law`
- The answer lies in how it passed: `The successor answered the refusal through how it was built.`
- Objections removed structurally: `Its structure removed the Y112 (2213) objections`
- Not out-argued across six decades: `which six decades of rebuttal had not out-argued`
- Chambers refused to vote authored facts true: `The chambers had refused to vote authored fiscal facts true`
- Successor stopped asking: `the successor does not ask them to`
- Legal and factual judgment separated: `It separates the chambers' legal judgment from the audit's factual judgment entirely.`
- Chambers vote the rule, audit finds the facts: `The chambers vote the rule, the standing audit finds the facts`
- Commencement only if and when: `the rule commences only if and when the facts arrive`
- Authored magnitudes quarantined: `Every authored magnitude from the old record is quarantined`
- Legally incapable of activating anything: `as legally incapable of activating anything`
- Old petition's fatal dependency: `The old petition depended fatally on those magnitudes`
- Now an inadmissibility: `under the successor they are inadmissible`
- Objections never answered, made impossible to raise: `so the 2213 objections cannot be raised against them`
- First window closed without a run, no-duty rule: `The first Path 2 window (2279–2288) closed without a run under the original no-duty rule.`
- 2289 legitimacy dispute: `In 2289 that lawful silence became a public dispute over legitimacy.`
- Sanctuary reformers: `Sanctuary reformers objected to a silent veto.`
- Main: `Main objected to a law that could not be tested.`
- Institutional defenders: `Institutional defenders answered that no duty had been adopted.`
- Lower observers: `Lower observers demanded that Schedule B remain separately protected.`
- LP-075 resolved the procedure in 2291: `LP-075 resolved the procedure in 2291`
- Not the result: `left the result to the existing Path 2 rules`
- Locked 2292, published 2294: `Its remedial run locked in 2292 and published in 2294.`
- Lawful activation: `The final result is a lawful activation.`
- Findings I–IV modest margins, Schedule A: `Findings I–IV passed with modest margins, and Schedule A certified.`
- Lower Incidence audit, B1–B6, Schedule B: `The separate Lower Incidence audit then passed B1–B6, and Schedule B certified.`
- Notice, full exact cascade, 2295: `Valid notice made the full exact cascade effective in 2295.`
- First-pass private allocation: `The reduction increases first-pass private allocation`
- SCM stays the secondary envelope: `the SCM remains the secondary circulation and anti-idle-wealth envelope`
- Crosslink LP-071: `LP-071 — Foundation Cap`
- Crosslink LP-072: `LP-072 — Layered Schedule`
- Crosslink LP-073: `LP-073 — historical rounded cascade`
- Crosslink LP-074: `LP-074 — active exact cascade`
- Crosslink LP-075: `LP-075 — commencement duty`
- Crosslink certification: `2294 certification — both schedules certified`
- Crosslink failed petition: `RATIFY-TAX-50 — the failed petition`

The era rhythm
- Heading: `The era rhythm — a lengthening institutional half-life`
- cut: 'Read the trajectory by its intervals rather than its rates and a second pattern surfaces.' (lead-in; survives as "Measured by intervals")
- Intervals 12, 35, 65 years: `structural tax moments are 12, 35, and 65 years apart`
- Y0 to Y12 to Y47: `Y0 to the layered schedule at Y12, Y12 to the point cascade at Y47`
- Y47 to Y112: `Y47 to the abundance petition at Y112`
- Roughly double: `Each interval is roughly double the one before it.`
- Lengthening institutional half-life: `an institutional half-life that lengthens as the institutions mature`
- Young civilization every decade: `A young civilization rewrites its tax posture every decade`
- Still discovering the instrument's purpose (causal): `because it is still discovering what the instrument is for`
- Mature, two generations: `A mature one goes two generations between structural questions`
- Answers keep holding: `because the earlier answers keep holding`
- Same fact as band-to-point, time axis: `The spacing records the same maturation as the band-to-point arc`
- Time instead of precision: `measured in time instead of precision`
- Not drift or neglect: `does not indicate drift or neglect`
- cut: 'Institutions that work are revisited less often.' (aphorism restating "the earlier answers keep holding")
- Fifth beat on the rhythm: `The fifth beat follows the same rhythm.`
- Refile at approximately Y175 (2276): `The refile at approximately Y175 (2276)`
- 63 years after Y112 (2213): `came 63 years after the Y112 (2213) failure`
- ~65-year cadence: `close to the ~65-year cadence the intervals had reached`
- cut: 'arriving almost exactly on schedule' and 'which is its own kind of information' (restatement, rhetoric)
- Stopped doubling: `The interval then stopped doubling.`
- Twice a century: `The civilization now returns to its rate posture about twice a century`
- Evidentiary clock: `on a clock set by evidence`
- Nothing broke: `This time nothing had broken`
- Six decades of preregistered audit data: `six decades of preregistered audit data had finally accumulated enough`
- Question answerable: `to make the question answerable`
- Consolidation Era held through 2294, superseded 2295: `Consolidation Era held through 2294 and was superseded in 2295`
- By the Exact Halving-Cascade Era: `by the Exact Halving-Cascade Era`
- Era-year boundaries are convention: `Era-year boundaries remain record convention.`
- Intervals between structural moments: `The intervals above run between structural moments (Y12, Y47, Y112, ~Y175)`
- Not between era labels: `and not between era labels`
- Third figure 65, engraving to first challenge: `The third figure, 65, runs from the point cascade's engraving to its first challenge`
- Not the operative era's duration: `does not measure the duration of the operative rate era`

The through-line
- Heading: `The through-line — the Trajectory Doctrine`
- Direction outlived the failed petition: `The direction of travel outlived the petition that failed to advance it.`
- Doctrine attributed as its first clause only: `The first clause of the Trajectory Doctrine reads:`
- Doctrine clause 1 (whitepaper §12.1): `Top marginal rates track demonstrated institutional need.`
- Three founding functions: `Taxation's three founding functions are revenue, anti-concentration, and trust.`
- Each retires as its replacement matures: `Each retires as its replacement matures`
- Revenue retired by automation revenue: `automation revenue for the first`
- Anti-concentration by structural instruments: `structural anti-concentration instruments for the second`
- Trust by a verified track record: `a verified institutional track record for the third`
- Ratchet: `Rates ratchet down as functions demonstrably retire.`
- v14.5 transition: `That logic shaped the v14.5 transition`
- SCM took anti-concentration off the rate: `when the Savings Circulation Mandate took anti-concentration off the marginal rate`
- Bands cut to points on those grounds: `the founding bands were cut to points on those grounds`
- Endorsed 5–0 (session-record provenance phrase): `The doctrine was endorsed 5–0 across the ratification chambers.`
- cut: 'That margin is the most legible fact on this page' (unnamed superlative)
- Refusing chambers endorsed the principle unanimously: `The chambers that refused the reduction endorsed the principle behind it unanimously.`
- Objection was to being told, not shown: `Their objection was to the evidence: they had been told the facts`
- Not shown: `and had not been shown them`
- cut: 'The objection was never to the direction of travel' and 'Detached from a specific cut and its authored evidence, the direction was never in dispute.' (reversal and restatement of the unanimous endorsement)
- Doctrine clause 2, verbatim: `any rate reduction requires audited evidence per the Path 2 standing audit`
- Doctrine clause 2, verbatim: `— never authored facts — at the standard zero-fail threshold`
- LP-074 wrote the condition into law: `LP-074 wrote the condition into law.`
- LP-075 barred silent avoidance: `LP-075 ensured that the test could not be silently avoided.`
- 2294 disposition supplied the answer: `The final 2294 disposition supplied the required answer`
- 2294 outcome: `Findings I–IV passed, Schedule A certified, B1–B6 independently passed, and Schedule B certified.`
- Y112 line closed, never reopened: `The Y112 line closed as the single failed predecessor and was never reopened.`
- Successor is a new line: `The successor is a new line.`
- Closed-line rule protects the distinction: `The closed-line rule exists to protect the distinction between a new line and a resubmission.`
- Trajectory unchanged: `The trajectory is unchanged.`
- 2213 refusal and 2294 certification: `The 2213 refusal and the later 2294 certification establish`
- Earned in the open: `every step down has to be earned in the open`
- Long-run downward expectation: `The architecture carries a long-run downward expectation as functions retire`
- No reduction unless every finding passes: `no reduction occurs unless every required finding passes`
- cut: 'Rates track demonstrated institutional need:' (restates the doctrine clause two paragraphs up)
- Standing formula: `rates fall when shown, and hold when a required fact is not shown.`
- Crosslink whitepaper: `Whitepaper §12.1 — the Trajectory Doctrine`
- Crosslink opposition: `Opposition Brief — the case against`
- Crosslink advocacy: `Advocacy Brief — the case for`
- Crosslink supplemental: `Supplemental Steelman`
- Crosslink Path 2: `Path 2 — standing fiscal-facts audit`

Process-record footnote
- Label: `Footnote — Process record, not world canon`
- Drafting history is not world history: `This page's drafting history is separate from the history of the civilization.`
- v22.0 to v22.1, abundance schedule written in: `Between canon v22.0 and v22.1 the abundance schedule was written into the register`
- As an enacted statute under designation LP-074: `as an enacted statute under the drafting designation LP-074`
- Trajectory statute as LP-075: `a trajectory statute was registered beside it as LP-075`
- v22.1 vacated: `At v22.1 the first was vacated`
- v22.2 deregistered: `at v22.2 both were deregistered`
- No chamber vote: `The schedule they concerned had never carried a chamber vote`
- Principle folded into whitepaper doctrine: `the principle had been folded into whitepaper doctrine`
- Authorship, not in-world events: `These steps belong to authorship and did not occur in world.`
- Archive keeps them in full, verbatim: `The drafting archive records them in full and preserves the texts verbatim.`
- Designations non-canon: `The old drafting designations remain non-canon.`
- Register's LP-074 is RATIFY-TAX-50-II: `The register's LP-074 is RATIFY-TAX-50-II`
- LP-075 later issued in world: `the number LP-075 was later issued in world`
- To the Commencement Duty Act: `to the separate Path 2 Commencement Duty Act`
- No validation of the deregistered text: `That issuance does not validate the deregistered text.`
- Pointers: `See the deregistered statutes of record and the session record.`

## (b) Frozen-string checklist

Each backticked item is confirmed present in the draft by `check.mjs` (raw HTML, decoded text, or check-canon's `normalizedText`; `/…/` items are run as regexes on `normalizedText`).

Guard-mutation probe (test-canon-guard-mutations, family "cascade: authority assertions")
- `current rate authority is <a href="law-polling.html#`

check-canon authority regexes (line ~615)
- `/current rate authority is LP-074/i`
- `/LP-073 is historical/i`
- `/LP-075 compelled the (?:audit|remedial process)/i`

check-canon cascade surface (line ~599): exact cascade present, historical schedule present
- `/\b50\s*%?\s*\/\s*25\s*%?\s*\/\s*12\.5\s*%?\s*\/\s*6\.25\s*%?\b/`
- `50 / 25 / 12.5 / 6.25`
- `70 / 35 / 17 / 8`

Figures and dates (all also covered by check.mjs's token-set comparison and the byte-identical table)
- `$10,000,000`
- `90–99% on net worth exceeding multiple billions`
- `"90–99% / 45–50% / 20–25% / 10–15%,"`
- `1–4`
- `3–2`
- `5–0`
- `Findings I–IV`
- `B1–B6`
- `Y175 (2276)`
- `Y112 (2213)`
- `2279–2288`
- `12, 35, and 65 years`
- `63 years`

Quotations of other instruments (verbatim)
- Whitepaper §12.1 doctrine: `any rate reduction requires audited evidence per the Path 2 standing audit — never authored facts — at the standard zero-fail threshold`
- Whitepaper §12.1 doctrine: `Top marginal rates track demonstrated institutional need.`
- LP-073 §3: `Band-to-point is itself doctrine: point rates are what a matured enforcement capability produces.`
- Session-record provenance phrase: `5–0 across the ratification chambers`
- Disambiguation sentence (mirrors the deregistered page's pinned header): `The register&rsquo;s LP-074 is <a href="law-polling.html#lp-074">RATIFY-TAX-50-II</a>`
- LP-074 term of art: `rates fall when shown`

Ids (no inbound fragment links to this page exist; the three ids are layout hooks)
- `id="navbar-placeholder"`
- `id="main-content"`
- `id="footer-placeholder"`

Outbound fragment links (each resolves; check.mjs section 5)
- `law-polling.html#lp-071`
- `law-polling.html#lp-072`
- `law-polling.html#lp-073`
- `law-polling.html#lp-074`
- `law-polling.html#lp-075`
- `simulations.html#sim-civ-2`
- `simulations.html#sim-civ-3`
- `simulations.html#sim-civ-4`
- `whitepaper.html#trajectory-doctrine`
- `pending-ratification.html#path-2`

Must be absent (checked in check.mjs section 1, all absent in the draft): check-canon's stale-claim regex `forbiddenCurrent` (line ~601), the World-tier refusal regex `supersededOutcome` (line ~626), the tier-claim regex (line ~1203), the seat-name regex and the founder ruling/override regex.

Not applicable to this page: the linkFirst phrases (Charter and Schedule sources only), the certification positive controls and `STATUTORY_CONSTANTS` (certification page only), heading slugs (no heading on this page carries an id, and the h2 text is unchanged anyway).

## (c) Flags

1. **Rate table left byte-identical.** The unit freezes "every table value", so the table's prose cells were not touched either. Two of them would otherwise have been edited: the Abundance trigger cell ends "Meritboard and Lower held" with no full stop, and the Conditional successor cell carries "chambers vote the rule; the audit finds the facts", which the body now also states. Either way could be right if "table value" means figures only.
2. **Bold and italic spans kept verbatim**, so the tag skeleton is identical. This keeps two phrasings the voice rules would otherwise cut: the banner's "excavated, not authored" (a not-X gloss, and the only definition of the page's mode), and the bold closing formula "rates fall when shown, and hold when a required fact is not shown." Its lead-in is now plain ("The record states the standing rule:").
3. **Meta description rewritten.** It is not scanned by check-canon, because `normalizedText` drops whole tags. The pilot left its Act description unchanged; say if descriptions should stay frozen too.
4. **Banner names the Savings Circulation Mandate** as the instrument born at 00c7b49. This comes from the same page's table ("Savings Circulation Mandate assumes anti-concentration (born 00c7b49 · v9.6.1)"), so no new fact was added.
5. **Reading decisions.**
   - "what makes it the answer is how it passed" became "answered the refusal through how it was built". The paragraph that follows describes the design, and *how* stays in `<em>`.
   - "LP-075 resolved the procedure in 2291, not the result" became "…and left the result to the existing Path 2 rules". This is the wording of LP-075 §4 as the Act page renders it.
   - "The clock that governs this record is evidentiary, not political" became "on a clock set by evidence". The "not political" half was dropped as the reversal.
   - "Each widening of the civilization" became "Each stage of growth", and "a job" became "a function" (taxation's three functions).
6. **Verbatim quotations keep their punctuation.** The whitepaper doctrine fragment keeps its two em-dashes. It is the only prose paragraph with more than one, and it has two because it is a quotation.
7. **Canon checks run for this unit (no change needed).**
   - Y-years map consistently to calendar years with Y0 = 2101: Y112 = 2213, Y175 = 2276, Y178 = 2279, Y190 = 2291.
   - The intervals 12 / 35 / 65 and the 63-year refile are arithmetically correct. "Roughly double" is loose (35/12 ≈ 2.9, 65/35 ≈ 1.9) and stays as the original's hedge.
   - The register's LP-074 reads "Enacted unanimously in 2278", which agrees with 5–0. "Endorsed 5–0 across the ratification chambers" is the session record's in-world provenance phrase.
   - "Band-to-point is itself doctrine…" is LP-073 §3 verbatim.
8. **Unverifiable, kept as written.** "The first zero-fail law of the rate line": the register entries for LP-071 to LP-073 are excavated strata with no vote tables, so the register neither confirms nor contradicts this.
9. **World-tier footnote.** The process-record footnote sits on a World-tier page, so check-canon's seat, founder and refusal scans cover it, and it passes them. It names canon versions (v22.0 to v22.2) inside its fenced "Process record, not world canon" box, as the original did.
10. **Token drift (from check.mjs notes; all in narrative, none operative).**
    - "cannot" is new (1×): "made impossible to raise" became "cannot be raised".
    - "could" drops 6 → 5: "one instrument could watch them all" became "few enough for one instrument to watch them all".
    - "fourth" drops 3 → 2 with the cut "the answer to the fourth".
    - "2213" rises 5 → 6: "so the 2213 objections cannot be raised against them" names the objections that the original's "The objection" referred back to (plural, matching "the Y112 (2213) objections" earlier in the paragraph).
11. **Hedges preserved:** "roughly one million", "roughly double", "about twice a century", "approximately Y175", "~65-year", "~Y175", "modest margins".
12. **Before splicing,** run the full `node tools/check-canon.mjs` and `node tools/test-canon-guard-mutations.mjs` after copying the draft over `rate-history.html`. check.mjs replicates the rate-history regexes but not the whole suite.
13. **Verifier revision (round 2), four fixes, each limited to the flagged sentence.**
    - Doctrine lead-in. "The Trajectory Doctrine states:" presented one clause as the whole doctrine. Whitepaper §12.1 (whitepaper.html:882) states it in full as two clauses and calls the gate clause "the load-bearing half". The lead-in now reads "The first clause of the Trajectory Doctrine reads:", so the later sentence "Under the doctrine, any rate reduction requires…" reads as the second clause. Deleting the lead-in, as the original had it, would also have worked. The attribution was kept because the heading already names the doctrine, and without the lead-in the bold line still reads as the doctrine entire.
    - Era-artifacts sentence split. The draft had "They are never revised to track the schedule and show the world…", which can parse as "never … show". It is now two sentences: "They are never revised to track the schedule. They show the world as it stood at the 70-rate:".
    - Era-rhythm causal restored: "every decade because it is still discovering what the instrument is for". It again runs parallel to "because the earlier answers keep holding".
    - Succession-chain number agreement: "so the 2213 objections cannot be raised against them", matching "the Y112 (2213) objections" earlier in the same paragraph.
