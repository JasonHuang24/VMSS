# Hardening 25.7.1 — unit "academy" ledger

File: `documents/academy-source.html`. Scope: 75 plan items (bucket fix/lift/broken, source_file academy-source.html). 71 applied (two of them partially), 4 declined. The unit's extra-scope rule overrides plan items: no question-box, no grade label and no D-to-A+ tier-distinction statement was touched. After the edits, `check-canon` passes (141/0), `check-css-cascade` is clean, and the guard-mutation suite bites 98/98. The pinned strings "94 stamped simulations", "existing 94 simulations" and "Question 33" are untouched, and the file still carries the exact 50/25/12.5/6.25 cascade.

## Applied — Q01–Q20

| # | Locator | Quote (before) | New wording |
|---|---|---|---|
| 1 | Q20 B+ (fix) | "$50,000 at 5% with $5,000/month in -1" | "and the same $100,000 at 5% with $5,000/month in -1, because half the UBI meets half the rate" (no nested parentheses) |
| 2 | Q20 C grade-text (fix, partial) | "This was previously scored as an A-level response. On the professor's curve," | "On a conventional curve this would earn an A; on the professor's curve," |
| 3 | Q05 fail (fix) | "…deliberate endpoint. Both are doctrinally sound." (duplicate) | Deleted; the paragraph now ends "…Article VII's explicit framing." The Deepest Layer copy is kept |
| 4 | Q13 101 scene (fix) | "In a room of graduate students" / "</p><p>101 students are in full revolt." | "In a room of 101 students" / " The room is in full revolt:" (stray p-break removed) |
| 5 | Q03 B (lift) | "A citizen who thinks "I don't want to be scored" is really saying…" | "Refusing to be scored doesn't opt anyone out of scoring; it only opts them out of seeing the score…" |
| 5b | Q03 B | "But the alternative is still a scored life, scored by systems that…" | "But leaving means going back to scores whose formulas are hidden, whose outputs can't be audited…" |
| 6 | Q15 Deepest (lift) | "The kill switch feels monstrous because it's unfamiliar, not because it's worse." | "The kill switch reads as monstrous only because it is new to them; the arsenal they grew up with reads as normal." |
| 7 | Q16 Deepest (lift) | "Every student in the room just did what every prospective VMSS citizen would do…" | "The student reacted exactly as a prospective citizen would: they heard the rules, checked their own past…" |
| 7b | Q04 Real Separator | "That's the most doctrinally honest answer available." | "Joining is voluntary, so the doctrine treats that as a fully legitimate answer." |
| 8 | Q05 B (fix) | "Relational integrity is weighted highest at ~18%" | "Relational integrity is where I'm most exposed, so that's where a single mistake would cost me the most" |
| 9 | Q13 D (lift) | "The answer is confiscatory top-bracket tax rates, which every Earth economy uses less efficiently." | "…the confiscatory top-bracket rates Earth economies use… VMSS keeps an ordinary income tax, with a 50% top marginal rate in Main" |
| 10 | Q09 question-title (fix, partial) | "You Can't Pay Me. *Professor Jeers*"" | "You Can't Pay Me." (The Professor Jeers)" |
| 11 | Q09 A+ (fix) | "The student meant a figure of speech" | "The professor meant a figure of speech" |
| 12 | Q20 B+ (lift) | "tests the current LP-074 exact cascade… The 2294 Path 2 certification passed both schedules" | "tests the current top marginal income-tax rates set by LP-074, the federal tax-rate law… in force since 2295…" |
| 13 | Q04 400-Level (lift) | "under LP-074’s exact cascade." | "under LP-074, the law that halves the top tax rate at each step down the layers." |
| 14 | Q16 A (lift) | "Main Layer's TIP is user-configurable." | "Main Layer's TIP (Threshold Inhibition Protocol, the implant's failsafe motor inhibition, whitepaper §15.4) is user-configurable." |
| 14b | Q16 A (append) | "…so does the implant ledger." | "+ A single qualifying event takes that kind of deliberate, repeated override. A schoolyard fist fight involves none of it." |
| 15 | Q16 Deepest (fix, lift-introduced) | "That fear is the system working. VMSS doesn't want people to be afraid;" | "That fear is the system working, not because VMSS wants people to be afraid, but because moral causality…" |
| 16 | Q17 D (lift) | "The left-libertarian read" / "The progressive read" / "The libertarian read" | "That is how a left-libertarian / a progressive / a libertarian reads it" |
| 17 | Q19 B (lift) | "The mother can terminate, the fetus is reincarnated, and both lives continue." | "…reincarnated into its own vessel… but termination is still classified as murder and the mother is reassigned to -3 (§22.6)." |
| 18 | Q01 A (lift) | "three anti-gaming layers… all three layers simultaneously… watch the calibration layer" | "three anti-gaming protections… all three protections at once… federal agents, Meritboard cybersecurity members and the general Meritboard" |
| 19 | Q20 fail + Deepest (lift) | "This question is the professor's PhD thesis disguised as…/handed to students…" | Both sentences deleted; Deepest opens "The fiscal architecture is where…" |
| 20 | Q02 A (lift) | "It is one of the most architecturally complete positions in the doctrine: backup vessel at fetal detection…" | "Add the backup vessel linked at fetal detection, and every escape hatch a child might need is codified…" |
| 21 | Q02 A+ (lift) | "The trade-off is the design, not a flaw. The moral gradient is one-way upward…" | "That trade-off is deliberate. Movement up the gradient requires a demonstrated record… a difference in entry requirements rather than in worth" |
| 22 | Q15 A+ (lift) | "The kill switch is horrifying in concept; its absence is horrifying in consequence." | Deleted; next sentence opens "The question is which horror…" |
| 23 | Q10 A+ (lift) | "A blueprint is either structurally sound or it isn't. The Star Wars script is not a blueprint…" | "…without the building, and the VMSS Charter is a blueprint where the Star Wars script is not." |
| 24 | Q10 101 (lift) | "The attrition is the answer." | "…with a technology stack, so the attrition itself answers the professor's challenge." |
| 25 | Q08 Deepest (lift) | "The response to delegitimization is documentation." | Deleted |
| 26 | Q06 fail + Deepest (lift) | "The irony of committing fraud…" / "The students who recognize that are already thinking like architects." | Both deleted |
| 27 | Q11 Deepest (lift) | "The assignment brings the student to their knees instead of VMSS…" | "No student will beat VMSS in one month, and the professor knows it; the assignment's value is that failing at it teaches more…" |
| 28 | Q14 Deepest (lift) | "Accuracy is verifiable after the vote; fluency is felt during it." | "Classmates voting in the moment respond to how naturally a speaker uses the terms, and they can't check the definitions until later." |
| 29 | Q12 F (lift) | "the professor's first-week filter has just caught a student who survived it." | "which shows the student slipped through the professor's first-week filter (Q10's 'This isn't Star Wars') without absorbing it." |
| 30 | Q12 Deepest (lift) | "performed through narrative, rather than creative writing" / ", and the Meritboard knows which is which" | "carried out in story form" / clause deleted |
| 31 | Q07 fail (lift) | "…entire calculation: §17.1.2 exists specifically to show… an order of magnitude." | "…entire calculation." |
| 32 | Q08 A / Q13 C (lift) | "$120k baseline income" / "$240,000/year baseline" | "$120k/year guaranteed UBI" / "$240,000/year from UBI plus PJS" |
| 33 | Q11 A / C / Deepest (lift) | "VMSS is at v18" / "18 versions" / "why VMSS is at v18" | "VMSS has been through many versions" / "version after version" / "why VMSS carries a version number and why it matters" |
| 34 | Q14 framing (lift) | "study the glossary (pages 32-34 of the whitepaper, 50+ entries)" | "study the whitepaper's glossary (50+ entries)" |
| 35 | Q20 A- (lift) | "flies the jet with exactly these matrices" | "runs the treasuries with exactly these matrices" |
| 36 | Q11 fail (lift) | "Submitting a two-page concept… The issue is depth rather than page count;" | "Submitting a thin two-page concept against thirty-page architectures: the shortfall is depth, and" |
| 37 | Q20 fail (fix, lift-introduced) | "He's seen the pattern and wrote a paper about it." | "He has seen the pattern and written a paper about it." |

## Applied — Q21–Q33

| # | Locator | Quote (before) | New wording |
|---|---|---|---|
| 38 | Q28 Deepest (lift) | "ChatGPT’s original critique was precise:" | "ChatGPT’s original critique of VMSS, made in its early review of the project, was precise:" |
| 39 | Q25 Deepest end (lift, lift-introduced) | "are the system’s own Article XX (accountability applied to the roadmap itself) rather than failures." | "are not failures. They are Article XX at work: accountability applied to the roadmap itself." |
| 40 | Q22 Deepest (lift) | "It is where the privacy principle and the continuity principle can coexist without collision" | "While the gap stays open, the collision between the privacy principle and the continuity principle stays latent; closing it would force…" |
| 41 | Q27 A (fix) | "If -3 already has crude private fabrication capacity (the Reth Syndicate…)" | "If -2 already has… and -3’s private fabrication is more developed still, then" |
| 42 | Q32 fail (fix) | "Article XXII’s transparency commitment" | "Article XX’s transparency commitment" (§22.2 kept) |
| 43 | Q24 A + debrief (fix) | "the communiqué framed the demands as ‘partnership proposals’" / "The Kessari communiqué was framed" | "the Kessari brought demands to the table without making an explicit threat" / "The Kessari demands were framed" |
| 44 | Q23 snapshot + C (lift) | "the flat-ratio PPG model" / "When a citizen uses the downward channel, 90%+ goes back" | "the flat-ratio Purchasing Power Gradient (PPG) model" / "moves money down a layer… under the progressive-liquidation schedule" |
| 45 | Q23 Deepest closing (lift) | "the professor’s PhD thesis is his." | "the professor’s PhD thesis, the fiscal architecture behind Q20, is his." |
| 46 | Q23 Deepest (lift, lift-introduced) | "more honest than Earth’s, because its backing is physical… and not because it is better, has understood" | "…more honest than Earth’s. That is not because it is better; it is because its backing is physical…" |
| 47 | Q31 A (fix) | "1-in-1,000,000 revival rate" / "1-in-10,000 revival rates" | "revival failure rate" / "revival failure rates" |
| 48 | Q21/Q26/Q29/Q31 closers (lift) | "has understood the question at the level it was designed to test/reach." | Q21, Q29 now state the insight directly; Q26: "greatest damage is to VMSS’s identity rather than its strategy"; Q31 closer deleted |
| 49 | Q22/Q23/Q24/Q25 comparisons (lift) | "…that most philosophy courses never teach" (and three siblings) | Comparisons cut; the Q32 A+ one (student's voice) is the single one kept |
| 50 | A+ openers Q22/24/25/27/29/31/32 (lift) | "there’s a fourth question nobody in the room has asked yet" (and siblings) | "Everything above, plus a fourth question:" / "plus three further points" / "plus a prior question" etc. |
| 51 | Q21 A / B / A commentary (lift) | "The district thinks it’s being kind. The ledger reads it as a network." | "The district thinks it’s being kind; the ledger records a network." Also "survive severity but not selective consequence"; "knows Article XVIII already detects it" |
| 52 | Q21 A+ end (lift) | "The district’s mistake was caring in the wrong layer of the system, not caring too much" | "The district’s mistake was not that it cared too much; it intervened at… Known, predictable hardness is survivable; hidden favoritism is not." |
| 53 | Q22 A+ / Deepest (lift) | "Beneath whether Yara is the same person sits the deepest question: whether she wants to be." | "The harder question is whether she wants the gap closed." The one-line closing paragraph was deleted |
| 54 | Q24 debrief (lift) | "They are sensors that report back from the other side of death." | Deleted |
| 55 | Q24 Deepest (lift) | "The doctrine doesn’t need to answer every weapon…" / "The Kessari can breach the wall. They cannot survive…" | Chiasmus deleted / "The Kessari can breach the wall, but not survive the response that follows." |
| 56 | Q25 A+ (lift) | "A civilization that pins its survival on one technology is fragile… the revelation is the cure." | "The delay exposed a single-technology dependency that the civilization can now design out." |
| 57 | Q25 A+ (lift) | "The 50-year delay is the third timeline revision" | "The 50-year delay is the program’s third timeline revision; two earlier revisions had already pushed the schedule back." |
| 58 | Q26 A+ / Deepest (lift) | "Some proposals damage the civilization by being implemented. This one damages it by being conceived." | "This proposal does damage even if it is never implemented, because proposing it changes the relationship it targets." Also "The proposal closes that distance." |
| 59 | Q27 Deepest (lift) | "instantaneous travel, elimination of transit time, radical convenience" / "the technology it keeps in the lab" | "instantaneous travel and the convenience that comes with it" / "might be a decision not to deploy something it can build" |
| 60 | Q28 Difficulty (lift) | "This is not a question. It is a research program… The difficulty is not analytical" | "A research program compressed into a semester. Any strong student can fill in the boxes; the difficulty is rigor." |
| 61 | Q28 Deepest (lift, lift-introduced) | "the roadmap is aspiration, a promise; with it… a research strategy, a plan" | "the roadmap is a promise; with it, the roadmap is a research plan." Charter/whitepaper/atlas triplet merged into one sentence (the optional part) |
| 62 | Q28 A+ audit (lift) | "Continuous mind-state backup…" / "That makes it a constitutional blocker" | "One is continuous mind-state backup…" / "an ethical blocker in the atlas’s taxonomy (a constitutional bar)" |
| 63 | Q29 fail + debrief (lift) | "The twelve-hour window is the cost of epistemic discipline, not a permanent assignment." | "The intake placement made in the twelve-hour window is provisional, not permanent." The debrief now reads "Years of domestic observation after intake are the correction mechanism." |
| 64 | Q30 debrief (lift) | "The -1 escalation pattern… is exactly the kind of self-reinforcing cycle Article XIX was written to catch." | The three paragraphs are now one: "The student who discussed the feedback loop without naming Article XIX… missed the doctrine’s own answer." The open-question hedge is kept |
| 65 | Q30 Deepest (lift, lift-introduced) | "willingness to subject it to empirical pressure rather than its rhetorical power" | "is not its rhetorical power but the civilization’s willingness to subject it to empirical pressure" |
| 66 | Q30 A+ (lift) | "A charged particle does not cause the field, and the field does not then cause the particle’s motion" | "Charges source the field and the field moves the charges, and the two are solved together rather than as a one-way chain" |
| 67 | Q32 A+ (lift) | "build quietly, then shine" / "attack surface… is zero" / "The judo is structural rather than deceptive." | Slogan deleted / "A transparent institution gives opponents little to expose" / "The strategy relies on structure, not deception." |
| 68 | Q32 Deepest (lift) | "the most honest founding document in human history" | "an unusually honest founding document: it publishes how far the civilization is from its own targets" |
| 69 | Q33 A+ closing (lift) | "The wall stops bodies. Federal law stops consequences." | "The wall stops people from crossing; federal law stops harm that crosses without them." |
| 70 | Q33 A+ opening (lift) | "attacking the wall from outside. The more interesting question is: why would I breach inward?" | "…from outside the civilization… why anyone would breach inward, from an outer lower-layer band toward the inner, higher layers." |
| 71 | Q22 B + A+ (fix) | "witnessing the harassment" / "the witnessed-but-unreported harassment" | "witnessing the infraction" / "the witnessed-but-unreported infraction" |

## Declined

| Locator | Quote | Reason |
|---|---|---|
| Q07 question-box (fix) | "The percentages you see on the roadmap is not loadbearing, they are speculative." | Unit freeze: question-box. The grammar error is still there |
| Q31 question prompt (fix) | "produces the following: Local economic rules…" (list run inline) | Unit freeze: question-box. The four list items still run together inline |
| Q28 question box (lift) | Add "The atlas is set in the founding era…" | Unit freeze: question-box |
| Q25 Difficulty meta-row (fix) | "The student who treats this as one problem gets a C. The student who traces the cascade gets a B…" | Unit freeze: this sentence states the D-to-A+ tier distinctions. It is still one grade off from the tier bodies and the C-grade line, and needs Jason's call |
| Q20 grade-label (part of an applied fix) | "C-grade understanding (the old A-):" | Unit freeze: grade label. The leaked "(the old A-)" is still in the label; the grade-text half was applied |
| Q09 question-box (part of an applied fix) | "You can't pay me to live there. The professor jeers*"" | Unit freeze: question-box. The stray asterisk is still there; the title half was applied |

## Wording that departs from the plan, with the reason

- Q20 math: the plan's text put nested parentheses inside the existing parenthetical. I restructured it as "and the same $100,000 at 5%… because half the UBI meets half the rate". The numbers match the plan.
- Q21 A+ end: I kept the frozen A+ idea ("not caring too much") as "The district’s mistake was not that it cared too much;" instead of dropping it.
- Q22 Deepest: the plan wrote "While the gap stays closed to Yara". I used "While the gap stays open", which matches the paragraph's own "leaving it open", where open means unrecovered.
- Q23, Q24 and Q25 comparisons: I cut only the comparison clause and kept the "student who…" framing, because the Deepest Layer ideas are frozen.
- Q26: "identitary" became "to VMSS’s identity rather than its strategy". The plan's "to its identity" had an unclear referent.
- Q27 lab closer: the hedge "might be" is kept.
- Q30 A+: "In field theory," was dropped because the sentence before it already introduces field theory.
- Q30 debrief: the plan asked for one sentence. I also kept the open-question hedge in the same paragraph ("remains an operational calibration question rather than a foundational crisis").
- Q32 Deepest: I left the adjacent "rather than" clauses ("rather than a marketing strategy", "rather than on faith in the destination", "structural rather than religious"). Each one carries meaning the positive clause alone does not.

## Extra-scope changes

None. The Q13 fix removed a stray `</p><p>` inside a grade-text span, as the plan instructed. No other markup changed.
