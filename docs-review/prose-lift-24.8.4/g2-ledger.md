# Prose Lift 24.8.4: Group 2 (Academic Resources r25, r26)

2026-09-28. Two resource pages from `documents/resources-source.html`, edited in copies in this folder (`r25.html`, `r26.html`). The source file is untouched. Both pages are clarity edits per the triage register (`docs-review/prose-lift-24.7-triage.md`, rows R25 and R26). Checker: `node docs-review/prose-lift-24.8.4/check-g2.mjs`, run from the repo root.

| Page | Mode | Block words (orig → edit) | Max em-dashes per paragraph (orig → edit) | Tags / table cells / frozen spans / numbers | Status |
|---|---|---|---|---|---|
| r25 | clarity edit | 3491 → 3311 (−5.2%) | 4 → 1 | identical (86/86) / none on page (0/0) / identical / identical set | ready; two internal-defect flags, two cross-resource notes |
| r26 | clarity edit | 4126 → 3892 (−5.7%) | 3 → 0 | identical (104/104) / none on page (0/0) / identical / identical set | ready; one wrong cross-reference flag, three internal-defect notes, two cross-resource notes |

**Conventions**
- **Word counts.** Block = all visible text in the `resource-page` div, tags stripped (title, subtitle and headings included). A word is any whitespace-separated token containing a letter, digit or `$`.
- **Frozen.** Tag and attribute sequence, headings, the styled subtitle line and the `<strong>` run-in labels (r26's four cohort names) are byte-identical. Neither page holds a table. Every number, citation (R21, R22, R23, Q31, §10.4, Articles III.III, VIII, X, XXVIII), named mechanism and hedge is kept; the checker also compares the set of numeric tokens on each page. Spelled-out figures (three billion, seventy percent, eighty-five, year twenty/fifty/one hundred/two hundred/three hundred, forty thousand, five hundred years) are kept word for word. The in-world phrase "the absence of being wrong is making them stupid" is verbatim.
- **Ledger quotes.** Backtick spans in the claims tables are verbatim from the edited page (tags stripped, whitespace collapsed, `&rsquo;` read as `'`, curly double quotes read as `"`, `&mdash;` as `—`, `&sect;` as `§`), 15 words or fewer. The checker confirms each one.
- **Cross-resource clashes in scope.** None of the six named clashes (wall thickness R3/R16, kill-switch scope R3/R15, kill-switch timing R17/R18, Dyson date R4/R19, R20 founding date, mind-state sync R11/R28) makes a claim on these pages.
- **Approved doctrine changes.** None apply, so none was applied. Neither page mentions -3 AI monitoring (R1). Neither page describes a -3 visitor with live or active backup vessel coverage (R27/R28, LP-004.2). r26's traveling cohort visits lower layers and draws on "-3 frontier aesthetics", but makes no vessel-coverage claim; r26's "backup vessel revival" and "retaining revival coverage" describe Main-layer extreme sports and historical lifestyle communities, which LP-004.2 does not touch.
- **Flagged sentences.** Sentences carrying a flag were left verbatim, including r25's Centurial Domain sentence with its original em-dash (the page's one remaining em-dash).

---

## r25 — Life in Sanctuary

**Claims ledger**

| # | Claim / figure / citation / mechanism / hedge | Survives as |
|---|---|---|
| 1 | Most-described, least-analyzed | `Sanctuary is the civilization's most-described and least-analyzed layer.` |
| 2 | Layer-page mechanics | `pre-intervention enforcement, 300 million residents, SAD ecology, high-trust social texture` |
| 3 | Charter and whitepaper establish | `the behavioral floor, the institutional architecture and the technological prerequisites` |
| 4 | Hedge: meaningful minority | `why a meaningful minority of qualified citizens choose Main Layer instead` |
| 5 | Reservoir, not destination | `Sanctuary is the civilization's reservoir rather than its destination.` |
| 6 | Architectural distinction | `The distinction is architectural` |
| 7 | Destination defined | `A destination is a terminal point` |
| 8 | Exchange point | `A reservoir is an exchange point.` |
| 9 | Hedge: many continue outward | `and many continue outward` |
| 10 | Population defined by flows | `The population is defined by the flows that pass through it.` |
| 11 | Snapshot, not head count | `a snapshot of an ongoing circulation rather than a head count of the qualified` |
| 12 | 1.4 billion qualify (hedge) | `Approximately 1.4 billion citizens currently meet the behavioral threshold for Sanctuary residency.` |
| 13 | 300 million resident (hedge) | `About 300 million live there.` |
| 14 | 1.1 billion elsewhere, most in Main | `The remaining 1.1 billion live elsewhere, most of them in Main Layer` |
| 15 | Portable credentials | `their SAD memberships as portable credentials into every interaction` |
| 16 | Releases most back into Main | `It then releases most of them back into Main` |
| 17 | Main generates scale | `the layer where the civilization actually generates its scale` |
| 18 | Self-selected twice | `Sanctuary's residents are self-selected twice` |
| 19 | Hedge: roughly a third | `The first filter captures roughly a third of the civilization.` |
| 20 | A quarter of that third | `The second captures a quarter of that third.` |
| 21 | Lifestyle preferences | `whose lifestyle preferences suit curation, SAD density, and the social texture` |
| 22 | Hedge: many best-conducted in Main | `many of the civilization's best-conducted residents spend most of their lives in Main by choice` |
| 23 | Footprint closer to a billion | `The layer's actual civilizational footprint is closer to a billion` |
| 24 | Inside the walls | `the 300 million are the part that lives inside the walls` |
| 25 | STI 85 threshold | `The behavioral threshold for Sanctuary admission is an STI of 85` |
| 26 | Whole-record score | `a score built across the whole record` |
| 27 | Hedge: realistic calibration | `Under realistic calibration, roughly a third of the civilization meets this bar.` |
| 28 | Not the exceptional few | `Sanctuary residents were never designed to be the civilization's exceptional few.` |
| 29 | Generally decent people | `the subset of generally decent people who chose the curated environment` |
| 30 | SAD gating | `gates further on measurable attributes and sustained capability outputs` |
| 31 | SAD criteria examples | `relational integrity verified to zero leakage` |
| 32 | Longevity criterion | `verified longevity past five centuries` |
| 33 | Capability, not moral | `These are capability dimensions rather than moral ones.` |
| 34 | Independent axes | `The two axes are architecturally independent, and the civilization does not conflate them.` |
| 35 | Accessible and curated | `Sanctuary is broadly accessible and intensely curated at the same time` |
| 36 | Six-criterion stacks | `six-criterion SAD stacks at elite thresholds` |
| 37 | Neither morally superior | `Neither population is morally superior to the other.` |
| 38 | Elite SADs nested only in Sanctuary | `the SADs that support elite credentialing are nested in Sanctuary and nowhere else` |
| 39 | Not the elite layer | `Sanctuary itself is not the elite layer.` |
| 40 | Hedge: rough estimate, roughly half | `Rough distributional estimate: roughly half of Sanctuary's residents live primarily in baseline Sanctuary` |
| 41 | Inferable, not enforced | `The ratio is inferable rather than enforced` |
| 42 | Charter does not require | `the Charter does not require residents to locate themselves in either pattern` |
| 43 | Threat structurally absent | `the only layer in the architecture where behavioral threat is structurally absent` |
| 44 | Threshold Inhibition Protocol | `The Threshold Inhibition Protocol halts harmful acts before they complete.` |
| 45 | Implant ledger | `The implant ledger runs continuously.` |
| 46 | Drone network | `The drone network monitors threat signals.` |
| 47 | Earth-era cities | `Earth-era cities included, is absent here` |
| 48 | Benefit and problem | `the layer's most visible benefit and its most interesting sociological problem` |
| 49 | Not more capable | `rather than because the residents are more capable` |
| 50 | Productivity compounds | `the productivity effects compound across decades of life` |
| 51 | Friction that generates growth | `also removes the kinds of friction that generate growth` |
| 52 | First-decade plateau | `the cognitive sharpening of the first decade plateaus` |
| 53 | Hedge: some residents, a kind of atrophy | `Some residents begin to experience a kind of atrophy` |
| 54 | Optimization paradox | `The civilization calls this the optimization paradox` |
| 55 | Hedge: typically 0.3 percent | `The figure is typically 0.3 percent` |
| 55a | Conditional: would be dismissible | `a population that would be dismissible in absolute terms but carries analytical weight` |
| 56 | STI intact | `STI intact and credentials preserved` |
| 57 | Destinations of leavers | `Most go to -1, a few to -2.` |
| 58 | In-world phrase (verbatim) | `the absence of being wrong is making them stupid` |
| 59 | Canonical shorthand | `has become canonical shorthand for the pattern` |
| 60 | No penalty | `the architecture supports their choice without penalty` |
| 61 | Audit signal | `the civilization's own audit signal` |
| 62 | Whitepaper description | `The whitepaper describes them as state-chartered metric-gated communities.` |
| 63 | R23 citation | `R23 analyzed them as the civilization's credentialing infrastructure.` |
| 64 | CCD scale (hedge) | `at its operating scale of roughly forty thousand residents` |
| 65 | Bias-resistant reasoning | `the single shared quality of bias-resistant reasoning` |
| 66 | Hedge: likely | `A resident's research partner is likely a CCD member.` |
| 67 | Not forced | `The domain does not force this concentration.` |
| 68 | Reasoning faster | `Reasoning moves faster within the domain` |
| 69 | Constellation | `a constellation of criterion-bounded small towns` |
| 70 | Three named SADs | `CCD, the Creative Output Domain and the Founders' Archive Domain` |
| 71 | 50/50 split | `This explains the 50/50 baseline-to-SAD residency split.` |
| 72 | Hedge: often shifting | `often shifting between them across different decades of a long life` |
| 73 | Influence exceeds count | `exceeds its 300-million residency count by a wide margin` |
| 74 | Residence durations | `(twenty years, fifty, a century)` |
| 75 | Pairing-outward routes | `through elective residency, through phasing, or through partnership` |
| 76 | Fluid-border provision | `The Charter's fluid-border provision between Sanctuary and Main is the mechanism` |
| 77 | Three billion in Main | `reaches the three billion residents of Main` |
| 78 | Measurably distinct tone | `operates at a behavioral tone measurably distinct from a district without one` |
| 79 | Hedge: slowly and unevenly | `drifts upward, slowly and unevenly, toward the Sanctuary baseline` |
| 80 | Demographic center of gravity (note N1) | `Sanctuary is the civilization's demographic center of gravity` |
| 81 | Exports | `What the layer exports is culture, norm and trust-density` |
| 82 | Counterfactual | `Remove the reservoir and the bending stops.` |
| 83 | Unadministered drift | `without anyone specifically administering it` |
| 84 | 300-year lifespan maximum | `the practical lifespan maximum of three hundred years` |
| 85 | Year twenty | `At year twenty, Sanctuary is still new.` |
| 86 | Year fifty | `At year fifty, the novelty has passed.` |
| 87 | Year one hundred | `At year one hundred, the questions start.` |
| 88 | Identity to habit | `what was identity at fifty has become habit at one hundred` |
| 89 | Vital at thirty | `The creative work that felt vital at thirty` |
| 90 | Centurial Domain criterion (flag F2) | `the SAD whose only criterion is sustained lifespan past five hundred years` |
| 91 | Year two hundred (flag F2) | `At year two hundred and beyond, the layer enters Centurial Domain territory` |
| 92 | Hedge: rarely | `is rarely leaving because Sanctuary has failed them` |
| 93 | No mature answer | `The civilization does not yet have a mature answer for this phase.` |
| 94 | Founders' Archive Domain | `The Founders' Archive Domain provides another` |
| 95 | Non-Attachment Zone | `The Non-Attachment Zone offers a third` |
| 96 | Partial answers | `These are partial answers.` |
| 97 | Year three hundred | `what Sanctuary life should be at year three hundred` |
| 98 | Hedge: most not yet old enough | `most residents are not yet old enough to need it` |
| 99 | Layers not ranked | `they are not ranked against each other` |
| 100 | Main density | `the texture that Main's three billion-person density generates` |
| 101 | No judgment | `it does not treat the layer each resident chose as a judgment on them` |
| 102 | Floor achievable | `The behavioral floor is broadly achievable.` |
| 103 | A third qualifies | `A third of the civilization qualifies` |
| 104 | Exclusive sub-communities | `exclusive in its criterion-bounded sub-communities` |
| 105 | Inclusive baseline | `inclusive at its baseline` |
| 106 | Mara pattern (flag F1) | `produce the texture problem the Mara pattern documents` |
| 107 | Article X | `The Charter's answer is Article X: exit is always permitted from Main and above.` |
| 108 | Designers anticipated the paradox | `Its designers understood that the architecture that removes threat` |
| 109 | Not for everyone | `The civilization does not pretend that Sanctuary is for everyone` |
| 110 | Hedge: primarily for the civilization | `The layer is primarily for the civilization as a whole.` |
| 111 | Real function | `a reservoir whose real function is to hold the civilization's highest-trust culture` |
| 112 | Poorer without | `a civilization that would be poorer without them` |
| 113 | Coherent at scale | `the layer's design is coherent only when read at that scale` |
| 114 | Wrong question | `is asking the wrong question` |
| 115 | Answer measurable | `The answer is unambiguous and measurable` |

**Word counts:** block 3491 → 3311 (−5.2%).

**Flags**
- **F1 (internal defect, triage-listed, unchanged).** "The Mara pattern" is cited in the Student's Error section but never introduced on the page (`the texture problem the Mara pattern documents`). A possible referent is the Mara Chen vignette on layer-+1.html, but this page does not say so. Kept verbatim; Jason to rule.
- **F2 (internal defect, triage-listed, unchanged).** Centurial Domain arithmetic. The page gives a practical lifespan maximum of three hundred years, says the resident enters Centurial Domain territory "at year two hundred and beyond", and defines the domain's criterion as sustained lifespan past five hundred years (whitepaper: "Centurial Domain (500+ years continuous lifespan)"). The sentence is kept verbatim, including its original em-dash; Jason to rule.
- **N1 (cross-resource tension, not a named clash, unchanged).** r25 calls Sanctuary `the civilization's demographic center of gravity`; r26 says the civilization's center of gravity `does not move past Main` and stays in Main. Both kept.
- **N2 (cross-resource wording, claim kept).** r25 says Sanctuary is `the civilization's reservoir rather than its destination`; r26 calls it `a destination some residents reach`. The r25 claim is kept explicitly in the opening sentence (verifier revision: the first pass had dropped it). Jason to rule.
- **Doctrine check, no change.** Article X as quoted matches charter.html ("Exit is always permitted from Main Layer and above"). The STI 85 threshold matches the Sanctuary eligibility ruling. No approved doctrine change applies.
- **Edits of note (no meaning change).** The opening "not the destination. It is the reservoir. The distinction is not rhetorical. It is architectural" run became two sentences that keep both the not-a-destination claim and "the distinction" as antecedent. Other reversals were recast as single statements: ratio vs appeal, residents vs most virtuous, SAD dimensions, elite layer, fluid border vs procedural convenience, exports, layers ranked vs calibrated. Dropped as restatement: "The bar is wide."; "The Charter does not rank these preferences" (the page already says the layers are not ranked); "The paradox is not a flaw in the design. It is a feature the design acknowledges..." (the preceding sentences already say the designers understood the problem and Article X answers it); "Sanctuary is not the layer for exceptional residents" (stated in The Broad Floor). "The scheduled appointment with genuine not-knowing" became "Regular contact with genuine not-knowing". Em-dash pairs became commas, colons or parentheses.

---

## r26 — Life in Main Layer

**Claims ledger**

| # | Claim / figure / citation / mechanism / hedge | Survives as |
|---|---|---|
| 1 | Metabolic center | `Main Layer is the civilization's metabolic center.` |
| 2 | Three billion, full spectrum | `It holds three billion residents across the full STI spectrum` |
| 3 | Flows up and down | `upward to Sanctuary, downward through the three punitive layers` |
| 4 | Returnees | `inward through returnees bringing absorbed culture from the lower layers` |
| 5 | Default / proving ground incomplete | `are accurate at surface level and incomplete` |
| 6 | Fulcrum | `analyzes Main as the fulcrum that carries architectural weight no other layer can hold` |
| 7 | Coalition question | `its most structurally novel problem, the coalition question, has now become visible` |
| 8 | Default starting point | `the default starting point` |
| 9 | Every citizen begins in Main (note N2) | `Main Layer is where every citizen begins` |
| 10 | Center of gravity stays in Main (note N5) | `It stays in Main, because Main is where the civilization continues to exist at scale.` |
| 11 | Populations | `Sanctuary holds 300 million. Main holds three billion.` |
| 12 | Hedge: approximately a billion | `The three punitive layers together hold approximately a billion.` |
| 13 | Hedge: roughly seventy percent | `Main is roughly seventy percent of the civilization's total population` |
| 14 | Hedge: in part | `every other layer is defined, in part, by its relationship to Main` |
| 15 | Fluid border | `lets eligible Main residents phase up at any time` |
| 16 | Every movement | `either originates in Main, terminates in Main, or passes through Main` |
| 17 | Middle position | `Main's place in the middle of the architecture is no accident.` |
| 18 | Only layer meeting both requirements | `Main is the only layer that meets both requirements` |
| 19 | Sanctuary too small | `Sanctuary is too small and too filtered to produce the diversity.` |
| 20 | Punitive layers constrained | `too constrained by their institutional posture to produce the cultural scale` |
| 21 | Collapse counterfactual | `Remove Main and the architecture collapses.` |
| 22 | Hedge: occasionally | `whose behavior occasionally crosses qualifying thresholds` |
| 23 | Permanent center | `The default starting point is also the permanent center.` |
| 24 | STI range 0 to 100 | `span the full STI range from zero to one hundred` |
| 25 | Sanctuary above 85 (note N3) | `Sanctuary operates above eighty-five.` |
| 26 | Spectrum example, 83 | `the Sanctuary-phased-back resident at eighty-three` |
| 27 | Spectrum examples, 79 and 42 | `the stable mid-range resident at seventy-nine, the declining resident at forty-two` |
| 28 | STI halos | `read each other's STI halos in every public interaction` |
| 29 | Makes Main Main | `The full spectrum is the specific feature that makes Main Main.` |
| 30 | Sorts out of | `the one place the architecture sorts out of rather than into` |
| 31 | Low-nineties district | `A Main district with median STI in the low nineties` |
| 32 | Low-forties district | `median STI in the low forties operates socially like an adjunct to -1` |
| 33 | Coverage not received (note N4) | `compensates for institutional coverage the district does not actually receive` |
| 34 | Formally Main | `Both districts are formally Main` |
| 35 | Hedge: typically | `A Sanctuary resident visiting Main for commerce typically visits the high-STI districts` |
| 36 | Article VIII | `A child relocating from -3 under Article VIII` |
| 37 | Freedom Layer | `the most and least controlled environments they will see above the Freedom Layer` |
| 38 | Hedge: at least four cohorts | `at least four distinct cohorts operating simultaneously` |
| 39 | Native cohort (hedge: roughly) | `roughly two billion residents who ascended from autoparenting` |
| 40 | Native STI bands | `Their STI scores cluster in the middle and upper-middle bands.` |
| 41 | R21 cross-reference (flag F1) | `the billion-strong minority analyzed in R21` |
| 42 | Elective reasons | `unwillingness to leave the proving ground, specific life-stage preferences` |
| 43 | 10:1 ratio | `The recovery path is long under the 10:1 ratio` |
| 44 | Hedge: often years to decades | `often spend years to decades on the climb` |
| 45 | Not externally legible | `Their presence in a district is not externally legible` |
| 46 | Traveling cohort | `The traveling cohort is the smallest and most analytically interesting.` |
| 47 | Visit purposes | `elective residency that retains their Main standing, or family visitation` |
| 48 | Absorbed culture | `bits of -1 reputation-network vocabulary, -2 commercial sensibilities, occasional -3 frontier aesthetics` |
| 49 | Neither sanctioned nor prevented | `neither explicitly sanctions nor prevents` |
| 50 | -3 legal permissiveness | `artists who draw their material from -3's legal permissiveness` |
| 51 | Footprint exceeds headcount | `their cultural footprint exceeds their headcount` |
| 52 | No categorical labels | `The four cohorts coexist without categorical labels.` |
| 53 | Three months in -2 | `the traveller who just returned from three months in -2` |
| 54 | Analytical categories | `The categories are analytical rather than operational` |
| 55 | Culture concentrates in Main | `The civilization's cultural production concentrates in Main.` |
| 56 | Canonical at website level | `This is canonical at the website level.` |
| 57 | Sanctuary craft | `Sanctuary produces extraordinary craft and research.` |
| 58 | CCD and FAD | `the CCD-resident neural composers, the FAD scholars` |
| 59 | Does not propagate | `It does not propagate at civilizational scale` |
| 60 | R22 citation | `-2's literary tradition analyzed in R22` |
| 61 | Powerful but marked | `reports from elsewhere, powerful but marked` |
| 62 | Different in kind | `Main's cultural production is different in kind` |
| 63 | STI span of audiences | `span ninety-plus STI to the teens` |
| 64 | International exports | `through VMSS's cultural exports to non-allied and adjacent civilizations` |
| 65 | Inseparable conditions | `The two conditions are inseparable.` |
| 66 | Only Main combines | `Only Main combines three billion residents and the full conduct spectrum` |
| 67 | ImmersionTube | `ImmersionTube is the civilization's full-sensory media platform.` |
| 68 | No Earth-era analog | `narrative forms with no Earth-era analog` |
| 69 | Neural diving | `Neural diving provides VR without hardware.` |
| 70 | Implant interface | `directly through the implant's neural interface` |
| 71 | Spectator neural-dive sports | `Spectator neural-dive sports let audiences inhabit the athlete's perspective during competition` |
| 72 | Extreme sports via revival | `Extreme sports enabled by backup vessel revival` |
| 73 | Mainstream | `operate as mainstream entertainment categories` |
| 74 | Permanent-consequence constraint | `The revival infrastructure removes the permanent-consequence constraint` |
| 75 | Gaming, dream sharing, memory libraries | `Gaming at civilizational scale, dream sharing as a social practice, memory libraries` |
| 76 | Collaborative consciousness | `collaborative consciousness experiences that operate between participants` |
| 77 | Historical communities | `(1950s Americana, Ancient Rome, medieval Japan, any era the participants choose)` |
| 78 | Year-3000 safety | `with year-3000 safety infrastructure invisibly embedded underneath` |
| 79 | Retained coverage | `for months or decades while retaining revival coverage, medical access` |
| 80 | AGI personhood | `AGI assistants operate as full citizens with personhood` |
| 81 | Scale and variety | `scale (three billion potential participants), variety (the full STI spectrum as ambient material)` |
| 82 | Institutional support | `(PJS-funded creative work, fabrication infrastructure, augmentation access, revival coverage that underwrites risk)` |
| 83 | "All four conditions" (note N1) | `No other layer provides all four conditions simultaneously.` |
| 84 | Sanctuary lacks scale | `has the institutional support and the trust density but not the scale` |
| 85 | Lower layers lack support | `The lower layers have scale and variety in specific dimensions` |
| 86 | Saturation | `when residents use it at saturation` |
| 87 | Article XXVIII | `Article XXVIII of the Charter provides a petition-based regulatory mechanism` |
| 88 | Whitepaper §10.4 | `Whitepaper §10.4 describes the intended emergent outcome` |
| 89 | No constitutional states | `without constitutionalized state boundaries` |
| 90 | Designers expected coalitions | `the civilization's designers expected them` |
| 91 | Hedge: may not have fully anticipated | `What the designers may not have fully anticipated` |
| 92 | Premise | `a citizen's environment is the consequence of their conduct` |
| 93 | 85-STI and 60-STI | `An 85-STI resident lives in Sanctuary if they choose. A 60-STI resident lives in Main.` |
| 94 | Behavioral sorting | `The mechanism is behavioral sorting, and the layer is the consequence.` |
| 95 | Proportional investment | `-1 receives its proportional investment` |
| 96 | Hedge: in principle | `can, in principle, produce an aggregate regulatory environment culturally indistinguishable from -1` |
| 97 | Coalition regulations | `failsafe opt-out provisions, preferences for private dispute resolution` |
| 98 | Federal mediations | `explicit choice against certain federal mediations` |
| 99 | Charter-compliant | `are each individually Charter-compliant` |
| 100 | Academy Q31 | `This is what Academy Q31 calls subsidized autonomy.` |
| 101 | Architectural, not legal | `The problem is architectural rather than legal.` |
| 102 | Article III.III | `Article III.III does is hold proportional-benefit taxation to institutional service received` |
| 103 | Pressure point | `That asymmetry between service consumption and budget allocation is the pressure point` |
| 104 | Not yet encountered | `The civilization has not yet encountered a coalition of sufficient size and coherence` |
| 105 | Inevitable | `makes the encounter inevitable` |
| 106 | Not in doctrine | `is not currently in the doctrine` |
| 107 | Novelty filter | `The Supreme Court's novelty filter will receive the first such case` |
| 108 | New category | `the culturally self-sorted sub-layer` |
| 109 | Multi-century | `Either ruling will have multi-century consequences` |
| 110 | Structurally Main's | `The problem is structurally Main's and could not arise elsewhere.` |
| 111 | Sanctuary coalition phases out | `would face the behavioral threshold and phase out of Sanctuary` |
| 112 | Lower-layer coalition barred | `could not access Main's institutional services regardless of its behavior` |
| 113 | Open question of how to live | `Main is the only layer where the question of how to live is genuinely open` |
| 114 | Within weeks | `knows their environment's character within weeks of arrival` |
| 115 | Earth-era self-structuring | `that an individual in an Earth-era context would have had to do themselves` |
| 116 | No recommendation | `the layer does not recommend any of them` |
| 117 | Architecture vs meaning (reworded) | `The Charter sets the rules and leaves the purpose of each life to the resident.` |
| 118 | No test | `The system has no specific test it is running on residents.` |
| 119 | Decades and centuries | `across decades and centuries, what a life made of these options should look like` |
| 120 | Prevents neither outcome | `the architecture does not prevent either` |
| 121 | Cost of freedom | `The cost of Main's freedom is this burden of self-structuring across long lives.` |
| 122 | Benefit | `its most complex cultural output and its most texturally rich relationships` |
| 123 | Both directions | `real in both directions` |
| 124 | Ninety vs forty STI | `A Main resident at ninety STI who produces a century of sustained work` |
| 125 | Not moral character | `The difference is not one of moral character.` |
| 126 | Both legitimate | `Both answers are legitimate, and the layer accommodates both.` |
| 127 | Default implies | `Default implies a starting position residents move past.` |
| 128 | Hedge: majority, most of the time | `For the majority of residents most of the time, their real lives are in Main.` |
| 129 | Sanctuary as destination (note N6) | `Sanctuary is a destination some residents reach` |
| 130 | Spectrum as contribution | `The spectrum is the layer's contribution to the civilization` |
| 131 | No-Main counterfactual | `A civilization with only Sanctuary and the punitive layers would have no Main` |
| 132 | Timeline | `has misread the timeline` |
| 133 | Hedge: most districts | `most Main districts are not operating as coalitions` |
| 134 | Hedge: may go decades or centuries | `the civilization may go decades or centuries between such encounters` |
| 135 | Real but slow | `The problem is real but slow.` |
| 136 | Built around Main | `Main is the layer the rest of the architecture is built around.` |
| 137 | Body and organs | `treats the other layers as organs specialized for functions the body needs` |
| 138 | Consequence gradient | `The punitive layers hold the consequence gradient.` |
| 139 | Ongoing condition | `Every layer is essential, but only Main is the civilization's ongoing condition` |
| 140 | Most alive | `why the layer feels most alive of any environment VMSS produces` |

**Word counts:** block 4126 → 3892 (−5.7%).

**Flags**
- **F1 (wrong cross-reference, triage-listed, unchanged).** `the billion-strong minority analyzed in R21`: the Sanctuary-credentialed cohort is analyzed in R25 (Life in Sanctuary); R21 is The Balanced Layer. Citation kept verbatim; Jason to rule.
- **N1 (internal defect, not triage-listed, unchanged).** `No other layer provides all four conditions simultaneously.` The preceding sentence names three (scale, variety, institutional support). "Trust density", named in the next sentence, may be the intended fourth. Kept.
- **N2 (possible doctrine tension, unchanged).** `Main Layer is where every citizen begins` is a blanket claim. The same page mentions children relocating from -3 under Article VIII, who begin in -3, and a native cohort that "ascended from autoparenting". Kept; Jason to rule whether it needs a hedge.
- **N3 (boundary wording, unchanged).** `Sanctuary operates above eighty-five.` Elsewhere (r25, the STI rulings) the threshold is an STI of 85, i.e. at or above 85. Kept.
- **N4 (possible internal tension, unchanged).** The low-forties district `compensates for institutional coverage the district does not actually receive`, yet the next sentences say both districts operate under Main's enforcement, UBI and institutional infrastructure. Kept.
- **N5 (cross-resource tension, see r25 N1).** r26 places the civilization's center of gravity in Main; r25 calls Sanctuary the demographic center of gravity. Both kept.
- **N6 (cross-resource wording, see r25 N2).** `Sanctuary is a destination some residents reach` versus r25's reservoir-not-destination framing. Kept.
- **Doctrine check, no change.** Article III.III matches charter.html ("scaled proportionally to the institutional benefits each layer receives"). Whitepaper §10.4 is "District Coalitions & Emergent State Formation" and describes informal coalition states without constitutionalized boundaries, as the page says. Academy Q31 uses "subsidized autonomy". Article VIII is Child Protection & Autoparenting. "AGI assistants operate as full citizens with personhood" is consistent with Article XXII substrate-neutral personhood as recorded in the 24.8.3 ledger. No approved doctrine change applies (see Conventions).
- **Edits of note (no meaning change).** Triage sample closers removed or recast: "The spectrum is not a problem. It is the layer's contribution to the civilization." (now `The spectrum is the layer's contribution to the civilization`); "The Charter provides the architecture. The architecture does not provide the meaning." (now `The Charter sets the rules and leaves the purpose of each life to the resident.`); "The other layers are conditions. Main is the civilization operating." (dropped; the same point stands in `only Main is the civilization's ongoing condition`). Also dropped as aphorism or restatement: "Residents who describe themselves as 'still in Main' are describing where the civilization actually is."; "which is what it is"; "and its cultural output is what that combination produces"; "The layer is alive because the stakes are live."; "The civilization is different because the layer contains both simultaneously."; "The student who treats the layer as waiting room misses the architectural weight it carries."; the closing paragraph's "not the layer the rest of the architecture sorts residents out of" contrast. "The lower layers are what they are" became `The lower layers each have a settled character.` "The ratio is instructive" became "The population figures show this." "Not X. It is Y." reversals (single population vs four cohorts, full spectrum, proving ground as test) became single statements. The final tricolon "at its full scale, in its full texture, with its full range" lost "in its full texture". The metaphors that carry the page's framing (metabolic center, fulcrum, body and organs) are kept because the headings and the Student's Error argument depend on them.
