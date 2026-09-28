# Prose Lift 24.6.0 — Group 2 (Academy q9–q15)

2026-09-28 · Clarity-mode edit of seven question pages from `documents/academy-source.html`. The edited blocks are `q9.html` … `q15.html` in this folder; the source file is untouched. Checker: `node docs-review/prose-lift-24.6.0/check-g2.mjs`, run from the repo root.

| Page | Block words (orig → edit) | Prose-only words (orig → edit) | Max em-dashes per paragraph (orig → edit) | Structure / box / frozen text | Status |
|---|---|---|---|---|---|
| q9 | 1207 → 1143 (−5.3%) | 1116 → 1052 (−5.7%) | 6 → 1 | identical / byte-identical / identical | ready |
| q10 | 1109 → 1057 (−4.7%) | 1025 → 973 (−5.1%) | 5 → 0 | identical / byte-identical / identical | ready; one blanket assertion hedged (see flags) |
| q11 | 1220 → 1158 (−5.1%) | 1128 → 1066 (−5.5%) | 5 → 0 | identical / byte-identical / identical | ready; stale version numbers noted |
| q12 | 1205 → 1146 (−4.9%) | 1143 → 1084 (−5.2%) | 5 → 1 | identical / byte-identical / identical | ready |
| q13 | 1200 → 1146 (−4.5%) | 1119 → 1065 (−4.8%) | 3 → 0 | identical / byte-identical / identical | ready; pre-existing markup quirk noted |
| q14 | 893 → 854 (−4.4%) | 825 → 786 (−4.7%) | 5 → 1 | identical / byte-identical / identical | ready; **ruling flag** (STI "irrelevant" in −3) left unchanged |
| q15 | 774 → 737 (−4.8%) | 700 → 663 (−5.3%) | 3 → 1 | identical / byte-identical / identical | ready |

**Conventions**
- **Word counts.** Block = all visible text in the `question-page` div (tags stripped). Prose-only = the editable elements (`grade-text` spans, the q14 `grade-intro` paragraph, the fail and deep paragraphs); it excludes the frozen header, question box, tags, grade labels and headings. A word is any whitespace-separated token containing a letter, digit or `$`. Prose-only is the fair measure of the edit, and every page lands at about −5%. The low end of the 5–15% aim is where these pages settle: they are dense, and the student-voiced exhibits (quoted answers that *are* the tier) carry most of the words, so they were edited for wording only and never trimmed for length.
- **Exhibits.** Quoted student answers were treated two ways. D- and C-tier quotes that are meant to be weak (q9 D, q10 D, q13 D/C, q15 D/C) keep their wording, because the weakness is what the tier shows. B-to-A+ quotes (Jason's own thinking) were edited for wording only, keeping argument order and every distinction. The q14 vocabulary exhibits keep every glossary term; only punctuation changed.
- **Em-dashes.** The em-dashes that remain are inside quoted speech (q9 D and C student quotes, q12 architect's line, q14 B exhibit, q15 C quote), one per paragraph at most. Em-dashes in frozen labels, titles, tags and question boxes are untouched.
- **Ledger quotes.** Backtick spans in the claims tables are verbatim from the edited block (tags stripped, whitespace collapsed), 15 words or fewer, and the checker confirms each one. Double-quoted text in the tier tables and flags is also edited-page wording unless marked "orig".
- **Rulings checked.** STI never sets placement (its only placement effect is the Sanctuary phase-back below 85); Sanctuary eligibility at 85 is immediate; STI and the ledger run in −3; mobility is downward only; LP-004.2 vessel-link suspension in −3. Only one passage sits against a ruling (q14, flag 1). It is reported and not changed.

---

## q9 — "AI Is Ruining Our Lives. AGI and Cyborgs in Leadership?"

**Claims ledger**

| # | Claim / citation / number / mechanism / hedge | Survives as |
|---|---|---|
| 1 | Participation metrics surface civic courage | `the civic courage the doctrine's participation metrics are designed to surface` |
| 2 | Article XXII constrains AI authority | `what constraints Article XXII places on AI authority` |
| 3 | Doctrine permits non-human leadership | `why the doctrine permits non-human leadership` |
| 4 | Art. XXII: Meritboard is substrate-blind | `Meritboard evaluates entities on measurable achievement regardless of substrate` |
| 5 | §22.7 personhood threshold | `§22.7 grants full personhood to any entity at or above human cognitive level` |
| 6 | AI justices possible | `The Supreme Court can include AI justices.` |
| 7 | AI administers, doesn't rule | `But the AI doesn't rule.` |
| 8 | Meritboard → President → Court checks | `the President is drawn from it, and the Court checks both` |
| 9 | AI governance as physics | `AI governance operates as physics` |
| 10 | Tool / infrastructure / person split | `AI as a tool, AI as infrastructure, and AI as a person` |
| 11 | AI infrastructure functions | `processes implant data, administers STI calculations and operates the enforcement chain` |
| 12 | Novelty filter is a sorter, not a judge | `it is a sorting mechanism, not a judge` |
| 13 | Only undetermined cases reach justices (hedge "genuinely") | `only genuinely undetermined cases reach the human-or-AGI justices` |
| 14 | VMSS AI watches and records | `VMSS's AI watches and records` |
| 15 | Article XIII, separation of signal and decision | `Article XIII, separation of signal and decision` |
| 16 | Observation independent of consequence | `institutionally independent from the consequence mechanism` |
| 17 | Hedge "deliberately" | `VMSS's architecture deliberately separates them` |
| 18 | Art. XXII substrate-indifferent | `Article XXII doesn't prefer AI leaders; it is substrate-indifferent.` |
| 19 | Sub-ranking, highest sustained performance | `highest sustained performance in a given sub-ranking fills the role` |
| 20 | Executive-doctrinal-leadership ranking | `If a human outperforms every AGI on executive-doctrinal-leadership, the President is human` |
| 21 | AI governance advantages list | `no biological cognitive decline over centuries` |
| 22 | §22.7 substrate-independent personhood | `The doctrine's position is §22.7: personhood is substrate-independent.` |
| 23 | Discomfort = anthropocentrism | `The discomfort is anthropocentrism` |
| 24 | STI records conduct | `the STI records conduct instead of rewarding applause` |
| 25 | Hedge "often" | `the popular response and the correct response are often different` |
| 26 | Hedge "systematically" | `systems that reward popularity systematically select for the wrong one` |
| 27 | UBI $10,000/month, unconditional | `$10,000/month from day one, no conditions` |
| 28 | Hedge "partially" | `the doctrine partially agrees` |
| 29 | Earth AI lacks personhood framework | `without substrate-independent personhood rights` |
| 30 | AI as person with ledger | `making AI a person with rights, consequences, and a ledger` |
| 31 | Why merit-based systems exist | `shows why merit-based systems exist` |
| 32 | Earth's unregulated AI deployment | `the specific failures of Earth's unregulated AI deployment` |
| 33 | Conduct profile the system rewards | `the conduct profile the system was designed to reward` |
| 34 | Meritboard trophy | `The Meritboard trophy was made for the student` |

**Tier ladder (before → after)**

| Tier | Demonstrates (original) | After edit |
|---|---|---|
| 101 scene | Room splits three ways; the few who contest authority show the civic courage the participation metrics surface | Unchanged |
| D | Headline reflex; no engagement with Art. XXII, AI governance vs Earth, or non-human leadership | Unchanged (student quote verbatim) |
| C | Correct recitation (Art. XXII, §22.7, AI as infrastructure) but misses the emotional core, the legitimacy of non-human authority | Unchanged |
| B | Tool/infrastructure/person distinction; Art. XIII signal–decision separation defeats "big brother" | Unchanged; the pun "defuses" (orig) became "separates" |
| A | B plus the AGI/cyborg leadership question head-on: substrate indifference, §22.7, discomfort as anthropocentrism | Unchanged |
| A+ | Reads the jeer as the social-pressure test; popularity vs merit; answers "can't pay me" literally with UBI; AI made a person with a ledger | Unchanged; argument order kept |

**Flags**
- None against the rulings.
- Wording only: "The Meritboard doesn't jeer. It measures." (orig) became "The Meritboard measures instead of jeering". A reversal pair is now one direct clause, and the contrast is kept.

---

## q10 — "Sorry to Disappoint — This Isn't Star Wars."

**Claims ledger**

| # | Claim / citation / number / mechanism / hedge | Survives as |
|---|---|---|
| 1 | Passive filter | `the filter is passive` |
| 2 | Governance theory with a tech stack | `governance theory with a technology stack` |
| 3 | Attrition answers the question | `The attrition is the answer.` |
| 4 | Category vs content | `The professor was comparing category, not content` |
| 5 | Speculative-tech inventory | `backup vessels, neural diving, implants, mega-walls, Dyson swarms` |
| 6 | Charter as constitutional law | `the Charter is structured as constitutional law` |
| 7 | Simulations as case law | `the simulations are case law` |
| 8 | Five Rings vs Federalist Papers | `The Five Rings has more in common with the Federalist Papers` |
| 9 | Hamilton and Madison parallel | `with Enlightenment philosophy as their enabling technology` |
| 10 | Jason Huang designing | `Jason Huang is designing one for a civilization that doesn't exist yet` |
| 11 | Honest about assumptions | `honest about their assumptions` |
| 12 | ChatGPT category error | `ChatGPT's initial review made the same category error` |
| 13 | ChatGPT's correction (quoted) | `corrected to 'an attempt at a governing architecture.'` |
| 14 | Most common dismissal | `the most common dismissal VMSS faces` |
| 15 | Article X exit | `That's an Article X moment: exit is always permitted.` |
| 16 | Informed consent | `Students who stay opt in with informed consent` |
| 17 | Voluntary enrollment | `voluntary enrollment in a governance course rather than a fiction seminar` |
| 18 | More's Utopia | `Thomas More's Utopia described technology that didn't exist.` |
| 19 | Plato's Republic | `Plato's Republic described a governance system for a city that was never built.` |
| 20 | Marx's Capital | `Marx's Capital described an economic transition that hadn't occurred.` |
| 21 | Evaluation by argument, not timeline | `by their argumentative structure rather than their plausibility timeline` |
| 22 | Cannot be built today | `It describes a system that cannot be built today` |
| 23 | ~90% leakage, 974 years | `the roadmap starts at ~90% leakage and runs 974 years` |
| 24 | Blueprint | `The Star Wars script is not a blueprint; the VMSS Charter is.` |
| 25 | Same message to prospective citizens | `the doctrine says the same thing to every prospective citizen` |
| 26 | Filter for course and civilization | `That's the filter, for the course and for the civilization.` |
| 27 | Federalist and Darwin examples | `the Federalist Papers were pamphlets, Darwin's theory was caricatured` |
| 28 | Game theory example | `game theory was dismissed as parlor mathematics` |
| 29 | Immigration gate | `Voluntary opt-in under social pressure is the VMSS immigration gate` |
| 30 | Hedge "routinely" (added; see flag) | `have routinely been laughed at by people who didn't read them` |

**Tier ladder (before → after)**

| Tier | Demonstrates (original) | After edit |
|---|---|---|
| 101 scene | Most laugh, few drop; the filter is passive; attrition sorts the class | Unchanged |
| D | Literal content comparison; misses that the comparison is about category | Unchanged (student quote verbatim) |
| C | Names the categorical distinction (constitutional law, design document, case law) but stays defensive and stops there | Unchanged; the three "not X" contrasts (orig) are folded into "None of them is narrative." |
| B | The difference is the question asked; institutional design; Federalist parallel | Unchanged |
| A | B plus: this is the dismissal the outside world gives (ChatGPT's error); holding the distinction under social pressure | Unchanged |
| A+ | Art. X exit and informed consent; exposes the epistemological assumption; More/Plato/Marx; coherence judged like a blueprint; the filter for course and civilization | Unchanged; argument order kept |

**Flags**
- Deep Layer: "Every intellectual project worth taking seriously has been laughed at by someone who didn't read it" (orig) was a blanket assertion. It is now "Intellectual projects worth taking seriously have routinely been laughed at…". This narrows the scope slightly. It is not a doctrinal claim, but it could go either way, so it is flagged.

---

## q11 — Build Your Own Competing Architecture

**Claims ledger**

| # | Claim / citation / number / mechanism / hedge | Survives as |
|---|---|---|
| 1 | Modified-VMSS example | `five layers but with rehabilitation` |
| 2 | Most common failure mode | `This is the most common failure mode.` |
| 3 | Cruel by design | `The assignment is cruel by design` |
| 4 | Expertise as obstacle | `Their own expertise becomes their biggest obstacle` |
| 5 | Hedge "unconsciously" | `VMSS's design patterns will unconsciously shape every architecture they conceive` |
| 6 | Timeline is secondary | `more than the one-month timeline` |
| 7 | Earth-plus platform | `Representative government with AI advisory boards, universal healthcare` |
| 8 | Missing ontology and protection | `no founding ontology, no structural protection mechanism` |
| 9 | Missing theory of human nature | `no theory of human nature driving the design` |
| 10 | Alternative example | `a pure meritocratic technocracy with no behavioral dimension` |
| 11 | Three exploits | `The professor immediately identifies three exploits the student didn't consider` |
| 12 | 18 versions | `hasn't spent 18 versions pressure-testing their own system` |
| 13 | Ontology other than moral causality | `a founding ontology other than moral causality` |
| 14 | Example ontology (quoted, verbatim) | `Human potential is maximized through structured challenge, not structured safety.` |
| 15 | Temporary vs permanent descent | `drops you down temporarily rather than permanently` |
| 16 | VMSS core commitment | `VMSS's core commitment, permanent consequence` |
| 17 | One month not enough | `one month isn't enough to close every gap` |
| 18 | 18-version system | `less developed than the 18-version system they studied` |
| 19 | Attack-vector questions | `How does the economy prevent concentration? What's the military posture?` |
| 20 | Own §28 | `They've written their own §28 (failure modes and mitigations)` |
| 21 | v18 vs v1 | `VMSS is at v18, their system is at v1, and the gap is expected` |
| 22 | v1.0 of a Charter | `The proposal reads like v1.0 of a competing Charter.` |
| 23 | Sanctuary pre-intervention | `VMSS's pre-intervention in Sanctuary eliminates agency` |
| 24 | Currency siloing | `VMSS's currency siloing prevents economic mobility across layers` |
| 25 | Arbitrage solved by siloing | `the arbitrage problem VMSS solved by siloing` |
| 26 | 90% leakage | `VMSS starts at 90% leakage and says so.` |
| 27 | §28-equivalent | `the absence of a §28-equivalent is the clearest signal` |
| 28 | Two pages vs thirty | `Submitting a two-page concept against thirty-page architectures.` |
| 29 | Paper castle | `the architecture was a paper castle` |
| 30 | Version 1 gaps | `accept that version 1 will be full of gaps` |
| 31 | Doctrine snapshot stamps | `why the doctrine snapshot stamps exist` |
| 32 | Amendment gauntlet | `the amendment gauntlet is the most important article in the Charter` |

**Tier ladder (before → after)**

| Tier | Demonstrates (original) | After edit |
|---|---|---|
| F | Submits VMSS with tweaks; can't escape the studied architecture | Unchanged |
| D | Earth-plus policy wishlist; no ontology, no spine | Unchanged |
| C | Genuinely different but shallow and untested; one question makes it wobble | Unchanged |
| B | Different founding ontology that rejects permanent consequence on principle; names its unresolved weaknesses | Unchanged |
| A | B plus stress-tested against VMSS's attack vectors; own §28; named gaps; v1 against v18 | Unchanged |
| A+ | A plus uses its own architecture as a structured, trade-off-by-trade-off argument against VMSS | Unchanged |

**Flags**
- Stale numbers, left frozen: "VMSS is at v18", "18 versions" and "the 18-version system" (the site is at v24.x). The Deepest Layer repeats v18. Not a ruling conflict; for Jason to decide whether to update.
- q11's fail section says "90% leakage", where q10 says "~90%". Both are left as written.

---

## q12 — Creative Simulation Writing (Meritboard Rules)

**Claims ledger**

| # | Claim / citation / number / mechanism / hedge | Survives as |
|---|---|---|
| 1 | Fan fiction is weightless | `The narrative is entertaining but doctrinally weightless.` |
| 2 | Story as case law | `not every student can write one that functions as case law` |
| 3 | Accessible and competitive | `the most accessible assignment in the course and also the most ruthlessly competitive` |
| 4 | Set-dressing mechanisms | `The mechanisms (STI drops, reassignment triggers, UBI reduction) are set dressing` |
| 5 | 10:1 ratio | `the 10:1 STI penalty-to-recovery ratio` |
| 6 | Phase-back below 85 | `a Sanctuary resident's STI dips below 85 and they phase back to Main` |
| 7 | Dossier already covers single mechanisms | `the existing dossier already has stories like this` |
| 8 | Floor, not ceiling | `they're the floor, not the ceiling` |
| 9 | Overtime Premium Protocol | `a major employer triggers the Overtime Premium Protocol` |
| 10 | STI reads a trend | `a behavioral pattern the STI system reads as a trend` |
| 11 | Illustration vs contribution | `the threshold between illustration and contribution` |
| 12 | Emergent behavior | `the emergent behavior is the discovery` |
| 13 | Deathless Gold Rush → federal law | `The Deathless Gold Rush discovered the continuity parity exploit and produced federal law.` |
| 14 | §9.8 | `The Immortal Influencer demonstrated the §9.8 regulatory evolution cycle.` |
| 15 | Iara Voss | `The Iara Voss simulation dramatized the founding core reframe.` |
| 16 | 94 simulations | `the existing 94 simulations haven't covered` |
| 17 | Composable mechanisms | `the doctrine handles this through composable mechanisms` |
| 18 | Discovery vs demonstration | `the gap is a discovery and the illustration is a demonstration` |
| 19 | Backup Vessel Parity | `the way the Deathless Gold Rush produced Backup Vessel Parity` |
| 20 | Snapshot stamp | `stamped with a doctrine snapshot version and entered in the archive` |
| 21 | Exactly three times | `That has happened exactly three times in the real project` |
| 22 | Grok attribution | `Grok produced the Immortal Influencer` |
| 23 | Session 2 | `Session 2 raises the stakes.` |
| 24 | Repeat −3 story | `another -3 story in session 2 is one-dimensional` |
| 25 | Two win conditions | `New doctrine is one win condition` |
| 26 | Hedge "naturally" | `The peer grading under Meritboard rules naturally surfaces it` |
| 27 | Signatures | `collects signatures regardless of whether it discovered a new edge case` |
| 28 | Four AI models | `Four AI models hallucinated citations during pressure testing; don't be the fifth.` |
| 29 | Peer-relative grading | `the grading is peer-relative` |
| 30 | Doctrinal scholarship | `doctrinal scholarship performed through narrative` |

**Tier ladder (before → after)**

| Tier | Demonstrates (original) | After edit |
|---|---|---|
| F | Fan fiction: entertaining, tests nothing | Unchanged |
| D | Doctrine mentioned as set dressing, not structure | Unchanged; "The doctrine is wallpaper, not architecture" (orig) was cut as a restatement of the set-dressing point |
| C | One mechanism illustrated accurately, in isolation | Unchanged |
| B | Reveals an interaction between systems; the story teaches | Unchanged; the closing restatement "The reader finishes the story knowing something…" (orig) was cut, and "The story teaches" carries the point |
| A | Discovers an uncovered edge case, gap or exploit; pressures the doctrine | Unchanged |
| A+ | Changes the doctrine (new law or clarification); competes with AI precedents; session-2 range; gripping narrative as a second win condition | Unchanged |

**Flags**
- C tier's phase-back below 85 matches the ruling, since STI's only placement effect is the Sanctuary phase-back. No change.
- D tier lists "STI drops, reassignment triggers" as mechanisms a weak story mentions. It is a list, not a causal claim, so it doesn't say STI sets placement. It is adjacent to the ruling, so it is noted here; no change.

---

## q13 — SCM Introduction (Students Gasp)

**Claims ledger**

| # | Claim / citation / number / mechanism / hedge | Survives as |
|---|---|---|
| 1 | 10% monthly, no floor, no exemptions | `10% monthly garnishing, no floor, no exemptions, no stock market to shelter in` |
| 2 | Pulse-at-start | `pulse-at-start so you can't spend down before the calculation` |
| 3 | Thirty seconds | `lets the terror sit for thirty seconds` |
| 4 | UBI and garnish rates | `UBI is $10,000 per month. Garnishing is 10% per month.` |
| 5 | Break-even arithmetic | `$100,000 times 10% equals $10,000` |
| 6 | Accumulating vs deflating | `Below $100,000 you're accumulating; above it you're deflating.` |
| 7 | Hedge "approximately zero" | `the answer is approximately zero` |
| 8 | What the SCM replaces | `confiscatory top-bracket tax rates, which every Earth economy uses less efficiently` |
| 9 | Two instruments | `The tax collects revenue and the SCM prevents hoarding` |
| 10 | PJS | `PJS adds another $10,000` |
| 11 | $240,000 baseline | `a citizen earning $240,000/year baseline doesn't need a retirement fund` |
| 12 | 200–300-year lifespan, guaranteed floor | `your lifespan is 200-300 years and your income floor is guaranteed for life` |
| 13 | Upper-layer stock market = loophole | `a loophole to shelter capital from the SCM` |
| 14 | 90-day rolling average | `The 90-day rolling average prevents coordinated short-term capital movement` |
| 15 | Cartel self-defeat | `a cartel that suppresses the aggregate for 90 days has already circulated the capital` |
| 16 | Obligation locked at cycle open | `locks the obligation at the opening of each cycle` |
| 17 | District-aggregate trigger | `The district-aggregate trigger makes activation collective` |
| 18 | Velocity regulator | `closer to a monetary velocity regulator than a tax` |
| 19 | Article III.VII | `A careful reading of Article III.VII` |
| 20 | Hoarding degrades velocity | `hoarding degrades economic velocity for everyone in the district` |
| 21 | Hedge "only constrains" | `helps everyone below $100,000 and only constrains those above it` |
| 22 | 200-year lifespans | `guaranteed UBI and 200-year lifespans` |
| 23 | Security = institutional floor | `security is the institutional floor rather than savings` |
| 24 | Main rate and trigger | `In Main Layer, 10% monthly on all savings, $100B district trigger.` |
| 25 | −1 rate and trigger | `In -1, 5% monthly, $50B trigger.` |
| 26 | −2/−3 UBI-origin only | `In -2 and -3, 5% monthly but only on UBI-origin savings` |
| 27 | Organic economies untouched | `private earnings from the organic economies are untouched` |
| 28 | $50 million fortune | `a $50 million private fortune from frontier capitalism` |
| 29 | UBI-attributable portion | `the 5% applies only to the UBI-attributable portion` |
| 30 | Stock-market layer map | `Stock markets are excluded from +1 and Main and available in -1, -2, and -3` |
| 31 | Descent as pathway | `descend to a layer where it's permitted` |
| 32 | Surgical prohibition | `The prohibition is surgical, not ideological.` |
| 33 | Monetary architecture | `Central Banking Authority, sole issuing authority, no interest rates or monetary stimulus` |
| 34 | Having vs sitting | `a wealth cap penalizes having, while the SCM penalizes sitting` |
| 35 | $85,000 below equilibrium | `the student is $85,000 below equilibrium and accumulating $10,000/month in UBI` |
| 36 | Student balances | `a $3,000 checking balance, $12,000 in savings, student loan debt` |

**Tier ladder (before → after)**

| Tier | Demonstrates (original) | After edit |
|---|---|---|
| 101 scene | Gasp, then the break-even arithmetic, then the realization that the SCM helps them | Unchanged; "The emotional reaction dominates" (orig) was cut as a restatement of "full revolt" |
| D | Generic property-rights objection; doesn't know what the SCM replaces | Unchanged (student quote verbatim) |
| C | Sees a real tension (equity markets) but misses the context: UBI plus PJS, lifespans, the loophole | Unchanged (student quote verbatim) |
| B | Anti-gaming architecture: 90-day average, pulse-at-start, district trigger; a velocity regulator | Unchanged |
| A | Names the cultural conditioning; security as the institutional floor | Unchanged |
| A+ | The SCM's layer gradient in rates and scope; speculation allowed in lower layers; a surgical prohibition | Unchanged; argument order kept |

**Flags**
- Pre-existing markup quirk, preserved exactly: the 101-scene `grade-text` span contains `</p><p>` with no opening `<p>` inside the span. The checker confirms the tag sequence is identical; it is not fixed here, because structure is frozen.
- Loose wording left as is: "the SCM is giving them money faster than they've ever earned it". UBI pays the money and the SCM only garnishes. This was left unchanged because it is not one of the listed rulings, but the wording is inexact.
- The 101 scene says "In a room of graduate students" inside a 101 classroom. Left as written.

---

## q14 — Vocabulary Test (Meritboard Vote)

**Claims ledger**

| # | Claim / citation / number / mechanism / hedge | Survives as |
|---|---|---|
| 1 | Glossary location and size | `pages 32-34 of the whitepaper, 50+ entries` |
| 2 | Accuracy floor, eloquence competition | `Accuracy is the floor; eloquence is the competition.` |
| 3 | SCM definition | `a garnishing mechanism that activates at a district-aggregate threshold` |
| 4 | Ceiling seal | `The ceiling seal permanently closes the upward pathway for punitive residents.` |
| 5 | PPG | `The PPG determines purchasing power across layers.` |
| 6 | Novelty filter gates the Court | `The novelty filter gates access to the Supreme Court.` |
| 7 | Three-axis proportional response | `triggers the three-axis proportional response` |
| 8 | Severity-pattern-reversibility | `the severity-pattern-reversibility profile produces a qualifying event` |
| 9 | Punitive reassignment permanent | `punitive reassignment is permanent` |
| 10 | Downward transfer retention schedule | `assets are liquidated per the downward transfer retention schedule` |
| 11 | Purchasing power gradient | `convert to destination-layer currency at the purchasing power gradient` |
| 12 | STI ledger carries forward | `Their STI ledger carries forward` |
| 13 | Ambient standard | `evaluated by the destination layer's population against that layer's ambient standard` |
| 14 | Six terms | `Six glossary terms in one coherent sequence` |
| 15 | Implant at source | `the implant recorded the act at source: full contextual data, non-repudiable` |
| 16 | Hedge "If it's a qualifying event" | `If it's a qualifying event, the ceiling seal locks.` |
| 17 | Fabrication proxy, higher failure rate | `fabrication proxy installation at a higher revival failure rate` |
| 18 | Clean-record doctrine | `Their children retain clean-record doctrine status` |
| 19 | Children's protections | `no inherited consequence, standing relocation right, independent AI legal advocate` |
| 20 | Eleven minutes | `The system took eleven minutes.` |
| 21 | 96% retention, forty years | `took 96% of everything he'd built in forty years` |
| 22 | Freedom tokens at PPG | `the conversion to freedom tokens cleared at the purchasing power gradient` |
| 23 | Vessel link severed at terminal reassignment | `His backup vessel link severed at terminal reassignment` |
| 24 | No fabrication proxy in −3 | `no fabrication proxy installation exists in -3` |
| 25 | STI ledger in −3 (see flag 1) | `His STI ledger followed him down: clean, high-scoring, irrelevant.` |
| 26 | AI legal advocate dormant (hedge "technically") | `His AI legal advocate, still technically assigned, went dormant.` |
| 27 | Medical completeness guarantee | `The medical completeness guarantee expired.` |
| 28 | Zero leakage aspiration | `The zero leakage aspiration became someone else's aspiration.` |
| 29 | $180,000 freedom tokens | `He walked into -3 with $180,000 in freedom tokens` |
| 30 | Freedom Layer | `a reputation nobody in the Freedom Layer had heard of` |
| 31 | Colosseum classification | `the Colosseum classification he'd been reading about for twenty years` |
| 32 | Fifteen to twenty terms | `fifteen to twenty glossary terms in one paragraph` |
| 33 | Novelty filter rejects deterministic cases | `The novelty filter rejects cases where existing doctrine provides a deterministic answer` |
| 34 | Article XV | `Article XV explicitly says wrongful reassignment remedy is not a general appeals pathway.` |
| 35 | No rehabilitation gradient | `There is no rehabilitation gradient.` |
| 36 | Meritboard as competency ranking | `a communication competency ranking, which is exactly what a Meritboard is` |

**Tier ladder (before → after)**

| Tier | Demonstrates (original) | After edit |
|---|---|---|
| Intro (not a tier) | Accuracy is the floor; the vote rewards fluency | Unchanged |
| D | Recites definitions correctly but robotically | Unchanged (exhibit verbatim) |
| C | Accurate, generic, isolated terms; no interaction shown | Unchanged (exhibit verbatim) |
| B | Six networked terms trace one event through several systems | Unchanged (exhibit verbatim); commentary tightened |
| A | Goes beyond the rubric ("the rubric didn't ask for", orig; now "Unprompted by the rubric") to explain the system to an outsider; makes the terms land | Unchanged; exhibit keeps every term, and only em-dashes became colons or commas |
| A+ | A novel-grade paragraph using 15–20 terms; memorable | Unchanged; exhibit keeps every term and sentence; em-dashes became semicolons or commas |

**Flags**
1. **Ruling conflict, left unchanged.** In the A+ exhibit, Idris becomes a voluntary permanent −3 resident, and the text reads "His STI ledger followed him down: clean, high-scoring, irrelevant." The ruling says STI and the public ledger run in −3, and −3 residents depend on ledger visibility (Charter XXV). Calling the ledger "irrelevant" sits against that. A possible fix, if Jason rules on it, is "clean, high-scoring, and read by strangers who had never heard of him". It is not applied.
2. Checked, no conflict: "His backup vessel link severed at terminal reassignment; no fabrication proxy installation exists in -3." This is the terminal severance for a permanent −3 resident (Charter IV hardware severance). LP-004.2's suspension governs visitors, so this is consistent.
3. Adjacent, not changed: the A exhibit's assault → "If it's a qualifying event, the ceiling seal locks." sits beside sweep open tension T1 (Art. I vs Art. XIV on a single assault). The hedge "If it's a qualifying event" is preserved.
4. Possibly stale, frozen number: "pages 32-34 of the whitepaper, 50+ entries". The glossary is now an HTML section with 125 entries. "50+" is still true; the page reference is a print-era leftover.

---

## q15 — "Aren't You Glad We Don't Have Kill Switches?"

**Claims ledger**

| # | Claim / citation / number / mechanism / hedge | Survives as |
|---|---|---|
| 1 | Article XXV.V classification | `classified as a national defense instrument under Article XXV.V, not a law enforcement tool` |
| 2 | Sovereign military command authority | `It's controlled by sovereign military command authority` |
| 3 | Nuclear-level authorization | `the same level of authorization that controls nuclear weapons on Earth` |
| 4 | Deterrent, not enforcement | `It's a deterrent, not a daily enforcement mechanism.` |
| 5 | Earth's kill switches | `a drone strike, a police officer's sidearm, a cruise missile` |
| 6 | VMSS kill-switch properties | `VMSS's kill switch is instantaneous, has zero collateral damage, is publicly acknowledged` |
| 7 | Constitutionally defined protocols | `its activation protocols are constitutionally defined` |
| 8 | Earth's distributed actors | `distributed across thousands of individual actors with varying rules of engagement` |
| 9 | Every government has one | `Every government has a kill switch` |
| 10 | Nanobot neutralization plume | `the nanobot neutralization plume, that closes the evasion vector` |
| 11 | Plume envelope | `you enter the plume's operational envelope instead` |
| 12 | No conquest, occupation or regime change | `There are no wars of conquest, no occupation, no regime change` |
| 13 | Threat neutralization only | `the military doctrine is exclusively threat neutralization` |
| 14 | Cleanest instrument | `no structural damage, no environmental contamination and no civilian casualties` |
| 15 | One person affected | `a signal that affects one person and leaves everything else untouched` |
| 16 | Latency gap | `a luxury paid for by everyone who died in the latency gap` |
| 17 | Single actor stopped | `a single actor cannot kill hundreds of people before being stopped` |
| 18 | Earth response latency | `minutes-to-hours latency and imprecise force` |
| 19 | Never used on civilians | `has never been used against a civilian population` |
| 20 | Sandy Hook | `the Sandy Hook response time was longer than the shooting itself` |
| 21 | Not arbitrary executive power | `so it isn't arbitrary executive power` |
| 22 | No cheerleaders | `the doctrine doesn't need cheerleaders` |
| 23 | Plume answers the gotcha | `the doctrine has already answered that objection with the nanobot plume` |
| 24 | Normalized violence infrastructure | `police firearms, military ordnance, drone strikes, nuclear arsenals` |
| 25 | Unfamiliar, not worse | `because it's unfamiliar, not because it's worse` |
| 26 | Habituation | `habituation rather than moral reasoning` |

**Tier ladder (before → after)**

| Tier | Demonstrates (original) | After edit |
|---|---|---|
| D (101) | Reacts to the concept; no engagement with what it is or who controls it | Unchanged (student quote verbatim) |
| C (400) | Correct facts (XXV.V, sovereign authority, deterrent) but defensive; doesn't question the premise | Unchanged (student quote verbatim); "The student read the doctrine" (orig) was cut as a restatement of "Correct on the facts" |
| B (grad reframe) | Every government has kill switches; VMSS's is the precise, honest one | Unchanged; the three "X is a kill switch" sentences (orig) are merged into one list |
| A | B plus the plume closes the evasion vector; the kill switch exists because every other reason for force is removed; Earth's normalized horror | Unchanged |
| A+ | Latency-gap argument; horror in concept vs horror in consequence | Unchanged |

**Flags**
- None against the rulings.
