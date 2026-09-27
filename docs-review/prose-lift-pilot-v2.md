# Prose Lift — Pilot Review

2026-09-26 · Four pieces from `simulations.html` · Style guide: `docs-review/prose-style-guide.md`

| Piece | Told through | Original | Rewrite | Change |
|---|---|---|---|---|
| Where the Maps End | Calla Dren | 1,256 | 980 | −22.0% |
| Maren Solvik | Maren Solvik | 1,019 | 889 | −12.8% |
| The Gray Kilometers | Joss Marek | 1,527 | 1,152 | −24.6% |
| The Timing Cartel | Petra Casimir, one of the forty-three | 447 | 570 | +27.5% (1.28×, cap 1.5×) |

**Follow-up: Jason's rulings applied**
1. **Every piece is a story.** The Timing Cartel is now a story (§4). The guide's mode section is now "Every piece is a story".
2. **Key Lesson rule confirmed.** The guide no longer marks it pending, and no Key Lesson changed.
3. **Outcome lines may be rewritten.** All four were rewritten; each section flags old → new.
4. **Maren teaches from Main.** Her Sanctuary students come down to her (§2).
5. **Maren's "invitations to apply" removed.** Her STI clears the threshold, and she stays in Main by choice (§2).
6. **Snapshots pin their era.** The Timing Cartel stays on v14.7 mechanics. The pilot's LP-069/070 drift note is withdrawn.

Also accepted: in The Gray Kilometers, "the convoy master" is read as Joss. Leftover fixes to Where the Maps End (task D) are in §1.

**Conventions**
- **Metadata blocks.** Each shows the rendered text of the HTML lines. Title, Simulation Type, Classification and Doctrine Snapshot are unchanged. The Outcome line is the new one, and each section flags the change. Only the Outcome line and the paragraphs of `.simulation-content` get replaced.
- **Pasting.** `*asterisks*` mark italics. Each paragraph break is one `<p>`. The Key Lesson line goes into the existing italic Key-lesson `<p>`. The Timing Cartel's old `<h3>` section headers are removed.
- **Word counts.** Counts cover the body and Key Lesson but not the metadata. A word is any whitespace-separated token that contains a letter, a digit or `$`.
- **Ledger quotes.** Double-quoted fragments are verbatim from the rewrite. A script checked all 385; each one appears word for word and is 10 words or fewer. Single-quoted fragments are original wording that was cut.

---

## 1. Where the Maps End

**Mode:** Narrative. The piece is a Resident Story whose doctrine plays out in what happens to two people. The ledger lookup, the night conversation with the old man and the association's refusal each go on the page as a scene with dialogue.

**Rewrite**

```text
Where the Maps End
Simulation Type: Resident Story · Classification: -3 Outskirts / Kidnapping & Private Order · Doctrine Snapshot: v20.5
Outcome: Ransomed in Nine Days by Her District Association
```

Calla Dren filed for voluntary permanent residency in -3 at twenty-nine. She took the liquidation hit and spent the next eleven years building a salvage-materials business in one of the eastern voluntary districts, the kind of place upper-layer documentaries call surprisingly orderly. Her district had paved roads, a market association, solar cooperatives that billed on time, and a perimeter walked by private security on contract. Four established members of the association vouched for her. Her contract-fulfillment ratio was published, and it was excellent.

The patrol contracts ended at the boundary markers, and so did the maps. Calla had been past the markers a dozen times on day trips, armed and careful, and somewhere in those eleven years she had stopped noticing when she crossed them.

The site was a pre-reassignment chemical works two ridges beyond the perimeter: condenser coil and tantalum fittings, a haul that would pay for a quarter if she reached it before the scrap crews did. She stayed too long in the cracking shed weighing fittings. When she came out into the late light, five people stood between her and her vehicle.

None of the five had bothered to cover their faces. No drone was coming; the layer ran no monitoring. This was the one layer where death stayed final, hers or theirs. The crew that took her was eight people living in the shell of a pumping station. Three had ledgers that ended in -3 for things nobody asked about. Two were voluntary arrivals whose districts had expelled them. The rest had drifted in from histories with no records at all. Whatever had sent any of them down was no longer enforced against them here.

They did not kill her. Within the hour their leader, a flat-eyed woman the others called Sorrel, was checking Calla's name against the regional reputation ledgers. Calla watched her read. Partway down the second screen, Sorrel's shoulders came down.

"Four guarantors," Sorrel said. "Eleven years of trade. Member in good standing." She turned the handset around so Calla could see her own column of numbers, the one that decided whether the market would sell to her. "You'll be fine."

"You don't know that."

"I know your association. A district that lets its members get taken for free stops getting members." Sorrel was already drafting the note. "They'll pay. They price that perimeter the way they price water."

The note went out that evening to the district association, payable in freedom tokens.

A man was chained at the far end of the pump hall. He was sixty-some, with no implant, a punitive arrival from years back. He hauled water and fed the generator, and as near as Calla could tell he had been doing it for two years. He slept eight meters from her. That first night she asked him whether they had ever sent a note for him.

"Who to?" he said.

He had no district and no vouchers, and nobody anywhere kept a column of numbers on him.

"I'm owed money, though," he said after a while. "Federal. Goes into an account every month."

"Where do you draw it?"

"Distribution point." He lifted the chain an inch off the concrete and let it drop. "Two ridges that way."

They fed her, mostly. On the second night she tried the door, and a crewman hit her once across the face before Sorrel said something short to him. Nobody touched her again.

She had seen the category in the association's budget, *Persistent threats*: bounty postings to the retrieval contractors and, for crews that graduated from robbery to killing district members, funded places in the private supermax the eastern associations maintained jointly.

"I know what's in your budget," Sorrel said on the fourth day, though Calla hadn't asked. "A dead member puts us under *Persistent threats*. A live one is an expense, and paying it costs them less than coming after us."

The exchange happened on the ninth morning at a dry creek crossing. Two association security vehicles waited on the far side with a contracted negotiator, who counted the tokens across. Calla walked the last forty meters herself. Her legs held until she was inside the vehicle.

Nobody was arrested; out here there was no such thing. The association logged the crew, raised the outskirts advisory rating for the eastern ridges, and added nine percent to her recovery cost as a member-services levy, paid off over four quarters. The market reopened to her that same week. Her vouchers held.

She went back for the old man. It took her a season to talk the association into it.

"Who's the member?" the officer in member services kept asking her. "Who's the counterparty?"

There was no levy structure for recovering someone nobody had vouched for, and a transaction that benefited no member had no one on the other side. In the end she funded the retrieval contract herself, out of the profit the tantalum job was supposed to bring.

The contractors found the pumping station empty. The crew had moved on the week after the exchange, the way crews do, and taken their labor with them. The contract came back with a report and a refund of the unused completion fee, and nothing else.

She still works the salvage trade, and she doesn't cross the markers anymore. When new arrivals at the market talk about the outskirts with the confidence of people eleven good years from their own lesson, she tells them what she knows about the layer she chose and still chooses. "Out there you're exactly as safe as you are valuable," she says, "to people who keep books and can reach you." Then she shows them on the map where the patrol contracts end.

Key lesson: Past the last patrol contract, -3's federal floor keeps its letter but not its reach, and private order protects only what someone has priced into it.

**Fidelity ledger**

| # | Claim in the original | Where it lives in the rewrite |
|---|---|---|
| 1 | Calla Dren filed voluntary permanent residency in -3 at 29 | "filed for voluntary permanent residency in -3 at twenty-nine" |
| 2 | She took the liquidation hit | "She took the liquidation hit" |
| 3 | Eleven years building a salvage-materials business | "eleven years building a salvage-materials business" |
| 4 | In one of the eastern voluntary districts | "one of the eastern voluntary districts" |
| 5 | Upper-layer documentaries call such places "surprisingly orderly" | "upper-layer documentaries call surprisingly orderly" |
| 6 | "…as if order were a property of layers rather than of ledgers" | cut: narrator thesis built on a reversal; the ledger-lookup scene shows where order lives |
| 7 | District has paved roads, a market association, solar cooperatives that bill on time, a privately contracted security perimeter | "paved roads, a market association" / "solar cooperatives that billed on time" / "a perimeter walked by private security on contract" |
| 8 | Vouched by four established members of the association | "Four established members of the association vouched for her" |
| 9 | Contract-fulfillment ratio published and excellent | "Her contract-fulfillment ratio was published, and it was excellent" |
| 10 | "In a layer with no institutions", a person's worth is a column of numbers her neighbors maintain | "her own column of numbers"; 'no institutions' cut: loose (-3 keeps a federal floor) and the lookup scene carries the point |
| 11 | "Eleven good years is how the wilderness gets you" | cut: aphorism; the fact it carried is row 13 |
| 12 | The maps end where the patrol contracts end | "The patrol contracts ended at the boundary markers" / "and so did the maps" |
| 13 | Calla had stopped feeling the line | "stopped noticing when she crossed them" |
| 14 | Site: pre-reassignment chemical works two ridges beyond the perimeter | "pre-reassignment chemical works two ridges beyond the perimeter" |
| 15 | Condenser coil, tantalum fittings | "condenser coil and tantalum fittings" |
| 16 | Haul pays for a quarter if reached before the scrap crews | "would pay for a quarter" / "before the scrap crews did" |
| 17 | Past the markers a dozen times before: day trips, armed, careful | "a dozen times on day trips, armed and careful" |
| 18 | Stayed too long in the cracking shed weighing fittings | "stayed too long in the cracking shed weighing fittings" |
| 19 | Came out into the late light; five of them between her and her vehicle | "into the late light, five people stood between her" |
| 20 | "careful had only ever meant lucky" | cut: aphorism (named in the brief) |
| 21 | "with the particular clarity the body reserves for these moments" | cut: stock phrase |
| 22 | Nobody pretends; there is no law to perform innocence for | shown: "None of the five had bothered to cover their faces"; the no-law fact also lives in row 75; 'perform innocence' cut: writerly tell (follow-up task D) |
| 23 | No drone is coming | "No drone was coming" |
| 24 | No monitoring exists | "the layer ran no monitoring" |
| 25 | Death is final, hers or theirs, only in -3 | "the one layer where death stayed final, hers or theirs" |
| 26 | Crew: eight people in the shell of a pumping station | "eight people living in the shell of a pumping station" |
| 27 | Three are punitive: ledgers ended in -3 for things nobody asks about | "ledgers that ended in -3 for things nobody asked about" |
| 28 | Two voluntary arrivals whose districts expelled them | "voluntary arrivals whose districts had expelled them" |
| 29 | The rest drifted in from histories with no records | "drifted in from histories with no records at all" |
| 30 | The apparatus of consequence shaped each of them on the way down and stops once they have her | folded into row 31; the standalone sentence was a thesis line |
| 31 | The crime that put a man in -3 is no longer enforced against him | "was no longer enforced against them here" |
| 32 | "Whatever he was sent down for, he is now free to be" | cut: aphorism restating row 31 |
| 33 | The crew does not kill her | "They did not kill her" |
| 34 | Her name is checked against the regional reputation ledgers within an hour | "Within the hour" / "checking Calla's name against the regional reputation ledgers" |
| 35 | The public column that gates her market access becomes an appraisal | "the one that decided whether the market would sell" |
| 36 | Lookup: vouched, four guarantors, eleven-year trade history, member in good standing | "Four guarantors" / "Eleven years of trade. Member in good standing." |
| 37 | Leader: a flat-eyed woman the others call Sorrel | "a flat-eyed woman the others called Sorrel" |
| 38 | Sorrel relaxes when the lookup resolves | "Sorrel's shoulders came down" |
| 39 | A vouched member is a priced asset | "You'll be fine" / "They'll pay" |
| 40 | A ransom note to a district association is a transaction with a known counterparty | "The note went out that evening to the district association"; counterparty idea carried by "Who's the counterparty?" |
| 41 | Payable in freedom tokens | "payable in freedom tokens" |
| 42 | The association pays because a district whose members can be taken without consequence stops attracting members ("not out of sentiment") | "lets its members get taken for free stops getting members"; 'not out of sentiment' cut: reversal |
| 43 | The association prices its perimeter's credibility the way it prices water | "They price that perimeter the way they price water" |
| 44 | An old man is chained at the other end of the pump hall | "chained at the far end of the pump hall" |
| 45 | Sixty-some | "sixty-some" |
| 46 | Implantless | "with no implant" |
| 47 | Punitive arrival from years back | "a punitive arrival from years back" |
| 48 | No district, no vouchers, no column of numbers anywhere | "no district and no vouchers" / "nobody anywhere kept a column of numbers on him" |
| 49 | He hauls water and feeds the generator | "He hauled water and fed the generator" |
| 50 | For two years, as near as Calla can tell | "as near as Calla could tell" / "he had been doing it for two years" |
| 51 | No note was ever sent for him; there is no one to send it to | "Who to?" |
| 52 | He is not even worth a ransom demand | cut: carried by "Who to?" and the note never sent |
| 53 | In the upper layers the civic floor guarantees dignity, UBI and standing rights | cut: upper-layer comparison; the story needs only the -3 fact in row 54 |
| 54 | The floor holds formally in -3: his UBI accrues in an account he will never reach a distribution point to draw | "Federal. Goes into an account every month." / "Distribution point." |
| 55 | The floor is real, and two ridges away | "Two ridges that way." |
| 56 | Federal infrastructure does not patrol, search or come | shown by "Two ridges that way."; rule stated once in the Key Lesson: "keeps its letter but not its reach" |
| 57 | He sleeps eight meters from her every night | "He slept eight meters from her" |
| 58 | "…proof of the exact width of the gap between having rights and having a price" | cut: thesis line |
| 59 | Held nine days | "on the ninth morning" |
| 60 | Fed, mostly | "They fed her, mostly" |
| 61 | Struck once when she tries the door the second night; never again | "On the second night she tried the door" / "hit her once" / "Nobody touched her again" |
| 62 | "not mercy, inventory care" | cut: reversal; shown by "before Sorrel said something short to him" |
| 63 | Crew discipline is real and self-interested | "before Sorrel said something short to him" |
| 64 | A dead vouched hostage turns the crew from a nuisance tolerated at distance into a line item the association resolves | Sorrel: "A dead member puts us under" / "A live one is an expense" (follow-up task D: moved from narrator reasoning into her dialogue) |
| 65 | She has seen the budget category *Persistent threats* | "She had seen the category in the association's budget" / "Persistent threats" |
| 66 | Bounty postings to the retrieval contractors | "bounty postings to the retrieval contractors" |
| 67 | Crews that graduate from robbery to killing district members get funded places in the private supermax the eastern associations maintain jointly | "graduated from robbery to killing district members" / "funded places in the private supermax" / "the eastern associations maintained jointly" |
| 68 | "…because some people are cheaper to hold forever than to keep meeting" | cut: rationale; the story needs only that the category exists |
| 69 | Sorrel knows the category exists; her business model is staying out of it | "I know what's in your budget," Sorrel said |
| 70 | The kidnapping is calibrated: expensive, recoverable, beneath the threshold where eliminating the crew becomes the association's cheapest option | "A live one is an expense" / "paying it costs them less than coming after us" |
| 71 | Exchange on the ninth morning at a dry creek crossing | "on the ninth morning at a dry creek crossing" |
| 72 | Two association security vehicles and a contracted negotiator | "Two association security vehicles" / "a contracted negotiator" |
| 73 | A counted transfer of tokens | "who counted the tokens across" |
| 74 | She walks the last forty meters; her legs hold until she is inside the vehicle | "walked the last forty meters herself" / "Her legs held until she was inside the vehicle" |
| 75 | No one is arrested; there is no such thing | "Nobody was arrested; out here there was no such thing" |
| 76 | The association logs the crew | "The association logged the crew" |
| 77 | Raises the outskirts advisory rating for the eastern ridges | "raised the outskirts advisory rating for the eastern ridges" |
| 78 | Adds 9% to her recovery cost as a member-services levy, paid off in four quarters | "added nine percent to her recovery cost" / "member-services levy, paid off over four quarters" |
| 79 | The market reopens to her the same week | "The market reopened to her that same week" |
| 80 | Her vouchers hold | "Her vouchers held" |
| 81 | The event resolves to entries in three columns, "and the columns are the reason she is alive" | cut: thesis; the three entries are rows 76–78 |
| 82 | She goes back for the old man | "She went back for the old man" |
| 83 | It takes a season to talk the association into it | "a season to talk the association into it" |
| 84 | No levy structure exists for unvouched recovery | "no levy structure for recovering someone nobody had vouched for" |
| 85 | No counterparty for a transaction that benefits no member | "Who's the counterparty?" / "a transaction that benefited no member" |
| 86 | She funds the retrieval contract herself, from the profit the tantalum job was supposed to bring | "she funded the retrieval contract herself" / "the profit the tantalum job was supposed to bring" |
| 87 | The contractors find the pumping station abandoned | "found the pumping station empty" |
| 88 | The crew moved on the week after the exchange, the way crews do, taking their labor | "the week after the exchange, the way crews do" / "taken their labor with them" |
| 89 | The contract returns a report, a refund of the unused completion fee, nothing else | "a report and a refund of the unused completion fee" / "and nothing else" |
| 90 | "The wilderness keeps what has no price." | cut: aphorism (named in the brief) |
| 91 | She still works the salvage trade | "She still works the salvage trade" |
| 92 | She no longer crosses the markers | "she doesn't cross the markers anymore" |
| 93 | New arrivals talk about the outskirts with the "bright, careless" confidence of people eleven good years from their lesson | "eleven good years from their own lesson"; 'bright, careless' cut: adjective pair |
| 94 | -3 is the layer she chose and still chooses | "the layer she chose and still chooses" |
| 95 | Out here you are exactly as safe as you are valuable, to people who keep books, who can reach you | "exactly as safe as you are valuable" / "to people who keep books and can reach you" (the piece's one kept aphorism, in her mouth) |
| 96 | She shows them on the map where the patrol contracts end | "shows them on the map where the patrol contracts end" |
| 97 | "…and watches to see if they feel the line" | cut: tidy ending that echoes row 13 |
| 98 | KL: the outskirts are where a person can fall outside every system that assigns value, beyond the reach but never the letter of the federal floor | Key Lesson: "keeps its letter but not its reach"; the old man shows the rest |
| 99 | KL: what saved Calla was her price, not a right; "rights don't patrol" | cut: restates the story, built on a reversal |
| 100 | KL: private order protects what is priced into it, exactly that and nothing more | Key Lesson: "private order protects only what someone has priced into it" |
| 101 | KL: the implantless man is the remainder of that equation | cut: restates the story |
| 102 | KL: the Freedom Layer's deal was never hidden; the civilization stops managing you | cut: restatement; the stance survives as "the layer she chose and still chooses" |

**Word count:** original 1,256 (body 1,130 + Key Lesson 126) → rewrite 980 (body 952 + Key Lesson 28), −22.0%.

**Outcome line changed** (ruling 3)
- Old: "Ransomed in Nine Days — Saved by Her Receipts, Not Her Rights"
- New: "Ransomed in Nine Days by Her District Association"
- Why: the old line is a not-X reversal, and "Receipts" is a metaphor the body doesn't use. The facts stay: she was ransomed after nine days, and her association paid because it had an interest in her. The rights-versus-price point now lives in the Key Lesson.

**Follow-up fixes (task D)**
- **The "perform innocence" line.** "Out here nobody had to pretend; there was no law to perform innocence for." is now "None of the five had bothered to cover their faces." The no-law fact is still carried by "Nobody was arrested; out here there was no such thing." (row 75).
- ***Persistent threats*.** The first sentence, what Calla had seen in the budget, stays. The three sentences where the narrator reasoned about Sorrel's calibration are replaced by Sorrel's own line on the fourth day. That line carries rows 64, 69 and 70.

**Other flags**
- **Invented texture**, each of which can be vetoed:
  - the uncovered faces;
  - the handset, and "partway down the second screen";
  - Sorrel's lines, including the fourth-day line, and Calla's reply;
  - the blow "across the face", and Sorrel checking the crewman;
  - the old man's three lines and the chain;
  - the member-services officer and his two questions;
  - the first-night timing of the old man's conversation.
- **Reading decision.** "It takes her a season to talk the association into it … in the end she funds the retrieval contract herself" is kept in that order. The rewrite leaves open whether the association brokered the contract or only consented to it.
- **Dropped detail.** "Every night" became "He slept eight meters from her". The nine days imply the nightly part.
- **Dossier echo, no action here.** The -3 dossier's Wilderness article (`layer--3.html:130–145`) reuses many of this piece's original sentences, tells included. Session 25.0.1 will meet them.

---

## 2. Maren Solvik

**Mode:** Narrative. A lifestyle arc is a working musician noticing a gap and filling it, which needs her voice on the page.

**Rewrite**

```text
Maren Solvik
Simulation Type: Lifestyle · Classification: Sensory Composer · Doctrine Snapshot: v15.6
Outcome: Main Layer — Founder of Sensory Composition
```

Maren Solvik was a working pianist before VMSS: session recordings, accompaniment gigs, two decades behind instruments in rooms where someone else was the reason the audience had come. She entered Main Layer at forty-six and took the implant expecting continuity insurance and the neural diving preview she had read about in the entry materials, and not much else.

The preview was another person's memory of hearing a symphony. She sat through it with her eyes closed, following the emotional arc and the orchestration, aware of the audience around her. When it ended, the technician asked what she thought.

"Where's the rest of it?"

"The rest of what?"

"I couldn't taste anything. I couldn't smell the hall. I had no idea where my own hands were."

"It's a memory of a concert," he said. "Sight and sound. That's what people keep."

"So it's a field recording." She stood up. "A good one."

She walked out and spent the next six hours writing notes on what a composition would feel like if it used everything.

Sensory composition did not exist as a discipline yet. The neural diving infrastructure could record every sense at once, and ImmersionTube hosted what that produced: a chef's afternoon, a mountain climb, a surgery seen from the surgeon's side of the table. All of it was documentation. Nobody was composing an original multi-sensory experience from scratch.

Her first piece took eleven months. She built it in a neural diving composition suite, where a single artist lays down a sensory experience layer by layer, the way a recording engineer builds a track. She started with the emotional arc: warmth building slowly over four minutes, a plateau of contentment, a sharp spike of vertigo at the six-minute mark, then a slow descent into calm. Taste went on next, honey during the warmth, copper at the vertigo, clean water through the calm. Then smell. Cedar on the plateau, rain just before the vertigo, and nothing during the spike itself, because she wanted the copper to carry that moment alone. Proprioception went on last: a sense of rising through the warmth, the ground going out from under you at the vertigo, weight settling back in at the end.

The piece had nothing to see and nothing to hear. It ran fourteen minutes, felt from inside the implant with the eyes closed. She called it *Displacement* and uploaded it to ImmersionTube expecting a few hundred downloads from the experimental art community.

It reached four million within two weeks. She had expected other artists to treat it as a technical experiment. Instead most of the audience was people who had never engaged with composed art of any kind, and they described it in language art criticism had no precedent for. They talked about it the way people talk about a place they have been. One review was shared widely enough to reach her:

*I have been to this place. It does not exist anywhere. I can tell you exactly what it felt like to be there.*

An interviewer asked her what she would call the thing she had made. "Somewhere you can go," Maren said. "I'll find a better word once there are more of them."

She is sixty-three now, age-pinned at forty-two because that was the age she felt most physically alert. She has published thirty-one compositions. Her AGI assistant handles the scheduling, the ImmersionTube distribution logistics, and the collaboration requests that arrive daily from composers who have entered the field she created. The field has a name now, sensory composition, and a growing professional community. Three of her former students have published work she considers better than her own early pieces.

She teaches the Sanctuary Academy of Sensory Arts master class from her studio in Main Layer, and twice a week her Sanctuary students come down to her. Her STI clears the Sanctuary threshold, so she could move up whenever she chose. She stays in Main, and one of her students once asked her why.

"Main is noisy," Maren said. "People rub up against each other. Up there the friction gets taken out before it reaches you." She shrugged. "I compose what I live in. I need to live in something that pushes back."

Her latest piece is a collaboration with two other composers, built through collaborative consciousness. The three of them merged their neural diving sessions and constructed a shared emotional architecture that none of them could have built alone. It runs forty minutes and has no title yet. Early test audiences call it the most complex sensory experience they have encountered on the platform.

Maren puts it differently. "It's the first thing I've made that I don't fully understand," she says. "Parts of it came out of their heads. Parts came out of the three of us at once, and none of us can claim those." She finds that unsettling and exciting in equal measure.

She has been a solo artist for seventeen years, and the collaboration has shown her that the medium she invented has already outgrown what one mind can do with it. "I don't know yet how I feel about that," she says. "I want to find out."

Key lesson: Sensory composition runs on unchanged neural diving infrastructure, built for empathy training and therapeutic intervention; the new medium came entirely from how an artist applied it.

**Fidelity ledger**

| # | Claim in the original | Where it lives in the rewrite |
|---|---|---|
| 1 | Maren was a pianist before VMSS; a working one, not famous | "a working pianist before VMSS"; 'Not a famous one' cut: reversal |
| 2 | Session recordings, accompaniment gigs | "session recordings, accompaniment gigs" |
| 3 | Two decades behind instruments where someone else drew the audience | "two decades behind instruments in rooms where someone else" |
| 4 | Entered Main Layer at forty-six | "She entered Main Layer at forty-six" |
| 5 | Received the implant expecting only continuity insurance and the neural diving preview from the entry materials | "expecting continuity insurance and the neural diving preview" / "and not much else" |
| 6 | "The preview changed everything. Not because it was impressive — because it was incomplete." | cut: thesis plus reversal; the dialogue shows the incompleteness |
| 7 | The demonstration was another person's memory of hearing a symphony | "another person's memory of hearing a symphony" |
| 8 | She felt the emotional arc, heard the orchestration, sensed the audience | "following the emotional arc and the orchestration" / "aware of the audience around her" |
| 9 | She noticed immediately what was missing | "Where's the rest of it?" |
| 10 | No taste, no smell, no proprioception | "I couldn't taste anything. I couldn't smell the hall." / "no idea where my own hands were" |
| 11 | A recording of a concert, limited to two senses ("faithful, vivid") | "Sight and sound. That's what people keep."; 'faithful, vivid' cut: adjective pair |
| 12 | She walked out and wrote notes for six hours on a composition that used everything | "She walked out and spent the next six hours" / "if it used everything" |
| 13 | Sensory composition did not exist as a discipline | "Sensory composition did not exist as a discipline yet" |
| 14 | The infrastructure supported full-spectrum recording; creative use was limited to documentation | "could record every sense at once" / "All of it was documentation." |
| 15 | ImmersionTube hosted a chef's afternoon, a mountain climb, a surgery from the surgeon's perspective | "a chef's afternoon, a mountain climb, a surgery" / "from the surgeon's side of the table" |
| 16 | Nobody composed original multi-sensory experiences from scratch | "Nobody was composing an original multi-sensory experience from scratch" |
| 17 | "Recording captures what happened. Composition creates what never existed." | cut: thesis; carried by "So it's a field recording." |
| 18 | Twenty years had taught her the difference between a field recording and a symphony | "So it's a field recording." plus "two decades" in paragraph one |
| 19 | "Both use sound. One documents. The other architects." | cut: tricolon aphorism |
| 20 | First piece took eleven months | "Her first piece took eleven months" |
| 21 | Built in a neural diving composition suite: one artist builds layer by layer, like a recording engineer building a track | "lays down a sensory experience layer by layer" / "the way a recording engineer builds a track" |
| 22 | Arc: warmth building over four minutes, plateau of contentment, vertigo spike at six minutes, slow descent into calm | "warmth building slowly over four minutes, a plateau of contentment" / "a sharp spike of vertigo at the six-minute mark" / "then a slow descent into calm" |
| 23 | Taste: honey in the warmth, copper at the vertigo, clean water in the calm | "honey during the warmth, copper at the vertigo" / "clean water through the calm" |
| 24 | Smell: cedar on the plateau, rain before the vertigo, nothing during the spike so the copper carries it alone | "Cedar on the plateau, rain just before the vertigo" / "she wanted the copper to carry that moment alone" |
| 25 | Proprioception last: rising, groundlessness, weight settling | "Proprioception went on last: a sense of rising" / "the ground going out from under you" / "weight settling back in at the end" |
| 26 | No visual component, no sound | "The piece had nothing to see and nothing to hear" |
| 27 | Fourteen minutes, experienced through the implant with eyes closed | "It ran fourteen minutes, felt from inside the implant" / "with the eyes closed" |
| 28 | Titled *Displacement* | "She called it Displacement" |
| 29 | Uploaded to ImmersionTube expecting a few hundred downloads from the experimental art community | "expecting a few hundred downloads from the experimental art community" |
| 30 | Four million within two weeks | "It reached four million within two weeks" |
| 31 | She expected artists to engage with it as a technical experiment | "expected other artists to treat it as a technical experiment" |
| 32 | The audience was overwhelmingly non-artists who had never engaged with composed art | "who had never engaged with composed art of any kind" |
| 33 | They described it in language without precedent in art criticism | "language art criticism had no precedent for" |
| 34 | They talked about it as a place they had been, not as music or painting | "the way people talk about a place they have been"; the music/painting half cut: reversal |
| 35 | Review quote, shared widely enough to reach her | "One review was shared widely enough to reach her" / quote verbatim |
| 36 | She understood she had made a new medium, not a genre | moved to the Key Lesson ("the new medium"); 'not a genre' cut: reversal |
| 37 | All prior art used subsets of the senses; she composed across all of them at once | cut: narrator essay; the build paragraph shows every sense in use |
| 38 | The result was a location built from sensation, existing only inside the experience, recognized as real | "Somewhere you can go," + the review quote |
| 39 | She is sixty-three | "She is sixty-three now" |
| 40 | Age-pinned at forty-two, chosen as the age she felt most physically alert | "age-pinned at forty-two because that was the age" / "she felt most physically alert" |
| 41 | Thirty-one compositions published | "She has published thirty-one compositions" |
| 42 | Her AGI assistant handles scheduling, ImmersionTube distribution logistics and daily collaboration requests from composers in the field she created | "Her AGI assistant handles the scheduling" / "the ImmersionTube distribution logistics" / "arrive daily from composers who have entered the field" |
| 43 | The field is named sensory composition and has a growing professional community | "The field has a name now, sensory composition" / "a growing professional community" |
| 44 | Three former students have published work she considers superior to her early pieces | "Three of her former students have published work" / "better than her own early pieces" |
| 45 | She teaches a master class at the Sanctuary Academy of Sensory Arts, commuting from Main twice a week | Ruling 4 (Charter Art. VII): "the Sanctuary Academy of Sensory Arts master class" / "from her studio in Main Layer" / "twice a week her Sanctuary students come down to her" |
| 46 | She has declined three invitations to apply for +1 residency | Ruling 5: invitations removed; "so she could move up whenever she chose" / "She stays in Main" |
| 47 | Her STI qualifies; her work qualifies | "Her STI clears the Sanctuary threshold"; 'her work qualifies' removed with the application gate (ruling 5: eligibility turns on STI alone) |
| 48 | She stays for Main's noise and friction, which Sanctuary's pre-intervention environment smooths away | "Main is noisy," / "the friction gets taken out before it reaches you" |
| 49 | She composes what she lives in and needs to live in something that resists her | "I compose what I live in." / "I need to live in something that pushes back." |
| 50 | Latest piece: three composers, built through collaborative consciousness | "a collaboration with two other composers" / "built through collaborative consciousness" |
| 51 | They merged neural diving sessions into a shared emotional architecture none could build alone | "merged their neural diving sessions" / "a shared emotional architecture that none of them could have" |
| 52 | Forty minutes, no title yet | "It runs forty minutes and has no title yet" |
| 53 | Test audiences: the most complex sensory experience on the platform | "the most complex sensory experience they have encountered" |
| 54 | Maren describes it differently | "Maren puts it differently" |
| 55 | The first piece she does not fully understand | "the first thing I've made that I don't fully understand" |
| 56 | Parts came from other minds, through a merged awareness none can individually claim | "Parts came out of the three of us at once" / "none of us can claim those" |
| 57 | Unsettling and exciting in equal measure | "unsettling and exciting in equal measure" |
| 58 | Solo artist for seventeen years | "a solo artist for seventeen years" |
| 59 | The medium has already outgrown what a single mind can do | "already outgrown what one mind can do with it" |
| 60 | Not sure how she feels; sure she wants to find out | "I don't know yet how I feel about that" / "I want to find out." |
| 61 | KL: neural diving was designed for empathy training and therapeutic intervention | Key Lesson: "built for empathy training and therapeutic intervention" |
| 62 | KL: it became the foundation of a new medium composing across all senses | Key Lesson: "the new medium" / "came entirely from how an artist applied it" |
| 63 | KL: audiences process the work as places, not artworks | cut from the Key Lesson: the review quote and "Somewhere you can go" already show it |
| 64 | KL: the technology did not change; the application changed everything | Key Lesson: "runs on unchanged neural diving infrastructure" |

**Word count:** original 1,019 (body 967 + Key Lesson 52) → rewrite 889 (body 861 + Key Lesson 28), −12.8%.

**Outcome line changed** (ruling 3)
- Old: "Main Layer — Pioneer of an Entirely New Art Form"
- New: "Main Layer — Founder of Sensory Composition"
- Why: the old line is promotional ("Pioneer of an Entirely New"). The facts stay: she lives in Main Layer, and she originated the form ("the field she created").

**Rulings 4 and 5 applied.** Only this one paragraph and its dialogue line changed; ledger rows 45–47 are updated.
- **Where she teaches.** "Twice a week she commutes from Main Layer to teach a master class at the Sanctuary Academy of Sensory Arts" is now "She teaches the Sanctuary Academy of Sensory Arts master class from her studio in Main Layer, and twice a week her Sanctuary students come down to her." "Twice a week" moves from her commute to their visits.
- **Why she stays.** "She has declined three invitations to apply for +1 residency. Her STI qualifies, and so does her work." is now "Her STI clears the Sanctuary threshold, so she could move up whenever she chose. She stays in Main". "Her work qualifies" is gone along with the application gate, because eligibility turns on STI alone. Restore it if you meant to keep it.
- **The threshold number.** The threshold is named without its number (85), because the original never carried one.
- **The student's question.** It became "one of her students once asked her why". In her answer, "Up here" became "Up there", since she now says it in Main.

**Other flags**
- **Invented texture:**
  - the demonstration technician and the dialogue with him;
  - Maren standing up;
  - the interviewer, and "Somewhere you can go";
  - the Sanctuary student and her answer;
  - the shrug.
- **Formatting.** The review quote is its own italic paragraph. The original had it inline in quotation marks.

---

## 3. The Gray Kilometers

**Mode:** Narrative. The doctrine, one certain law disciplining the violence beneath it, resolves in a single decision: the crew leader weighing the murder line. That works as a scene with dialogue.

To get there, the setup compresses the geography, the one law and the road economy. The bailout logic moves to the moment the wand comes back empty. The leader's italic monologue becomes three spoken lines.

**Rewrite**

```text
The Gray Kilometers
Simulation Type: World Scenario · Classification: -2 Overland Corridors / Institutional Withdrawal Geography · Doctrine Snapshot: v20.5
Outcome: Convoy Ambush Between Metros — Toll Paid, Passenger Saved, Defender Not Reassigned
```

Joss Marek has run the Korrath–Calder corridor for nine years. The Korrath Metropolitan Zone has 140,000 residents, three security cooperatives, paved roads and a reputation-gated core. Calder Basin lies four hundred and ten kilometers southeast, smaller and older, built around a water-rights cooperative that has held its territory for sixty years. Maps of -2 draw the metros as islands and render the land between them in gray: four hundred kilometers of scrub hills, dead pre-reassignment infrastructure, and road. The patrol contracts end at the district boundary markers. The drone network doesn't fly out there, and the AR grid thins to the federal minimum, which in practice means the gate complexes at either end and nothing in between.

Out there the civilization enforces exactly one law. A killing anywhere in -2, whether in a metro, the outskirts or the empty middle, triggers immediate reassignment to -3, read from the killer's own implant or reconstructed from the victim's. Identification is enough. Every gate, market and scanner the killer passes for the rest of their life will complete the arrest. Everything below killing belongs to the layer. The implants record robberies, beatings and captivity, the ledgers fill, and the system does nothing, because nothing below the line is the system's to do. Travelers from the upper layers find this obscene. Residents find it legible.

The road economy that grew around that law is layered. Closest to the metros are the toll crews: a barricade, a half-dozen armed residents, a posted price. They are almost courteous. A toll crew taxes a road it claims to keep clear, and the claim is partly true, since the crew defends its stretch against rougher operators the way any business defends a revenue stream. Convoy masters price the tolls into freight like weather. Deeper out are the takers, who want the cargo, the vehicle, and anything implant-free that can be carried. Deepest, in country nobody crosses without contract escort, are the crews with portable backup vessel units, the same hardware the Syndicate cartels run in the corridors. They take people.

Joss hauls machine parts east and dye stock and filter membranes west in a four-vehicle convoy on the escort cooperative's schedule. The escort fee is eleven percent of cargo value, and the uninsured alternative is one bad afternoon. He was reassigned to -2 fourteen years ago for things he doesn't relitigate, and the road doesn't ask. The corridor almanac on his terminal, kept by the convoy masters' association and updated after every run, marks two hundred and six incident sites along the route. He knows the chokepoints by feel: the culvert wash at kilometer 121, the salvage field at 200 where the sightlines die, and the long blind grade at 288 that the escort riders call the Stairs.

The ambush comes at the Stairs, and it is professional. A wrecked hauler lies across the cut at the top of the grade, staged but staged well, and by the time the lead escort rider has read it the crew is up out of the scrub on both shoulders. There are eleven of them, rifles held low. The leader walks the line of stopped vehicles without hurrying, and Joss recognizes the manner at once: a man doing business inside a constraint he respects.

"Doors," the leader says.

The cargo doors open. He reads the manifests one vehicle at a time and names his price at the end: the dye stock, the spare power cells, the escort riders' sidearms.

"A third of the dye," Joss says.

They settle on a third. Joss has done this eleven times. The toll is steep and survivable, and the implants of thirty people are recording every second of it for ledgers no enforcement body will ever act on.

It goes wrong at the third vehicle. A passenger is riding cheap from Korrath to a work contract in Calder, a young man, nineteen maybe, and when the crewman scanning the line reaches him the wand comes back empty. No implant. No affiliation tag.

Joss knows what that reading means out here. An implanted captive can bail out: die deliberately, revive at the proxy installation, file the loss with their cooperative. So the labor crews hunt for the implantless and the unaffiliated, the ones no metro network will miss, or they bring the portable unit, and then the bailout door opens onto the same room it closed in. No cooperative will file a loss report on this kid, and there is nobody to ransom him to. The crewman takes his arm the way a man picks up dropped freight. Joss is moving before he has finished deciding to, because he has seen what comes back out of the outskirts labor camps, and what doesn't.

What follows takes nine seconds, and every implant present records it at neural resolution. The crewman swings his rifle stock at Joss's head. Joss takes it on the forearm, draws his sidearm and fires twice, low. The crewman goes down with a shattered hip, alive and screaming. On the ridge the rifles come up. The leader's hand comes up faster, flat, and holds them.

For a moment there is only the wounded man and the wind.

"He shot Tam," someone calls from the ridge.

"He shot a hip." The leader hasn't looked away from Joss. "Kill a trader and we're murderers. They've already got our walks and our voices. Half our faces." He glances at the kid, then at the loaded dye stock. "Wounds are free. The kid was a side job." He raises his voice for the ridge. "Leave it."

They carry the wounded crewman up the grade and winch the wrecked hauler aside. The convoy rolls within the hour, a third lighter, and the kid rides up front in the lead vehicle.

"I thought they wanted my pack," he says, a long way down the road.

Nobody corrects him.

Joss waits three days for a verdict. None comes: no reassignment order, no notification. A clean defensive act gets no reply at all. The evaluation ran the moment the ledgers synced at the Calder gate, and it read attacker initiated at tier three, response at tier four under the defense-of-others doctrine, within temporal scope, threat ceased, force ceased.

That night the convoy masters' association updates the almanac entry for kilometer 288: crew of eleven, portable-unit affiliation suspected, tolls negotiable, *does not push to lethal*. The escort cooperative raises the corridor rate to thirteen percent. Three metro merchants petition their district association to extend the patrol contract another forty kilometers east. The association declines, because forty kilometers of patrol would cost more than the freight losses it prevented, and everyone on every side of that calculation knows it.

Key lesson: A single law, murder → -3, certain and permanent, shapes all the violence beneath it. Robbery, capture and forced-revival labor, which it does not cover, are exactly as common as the market for preventing them allows.

**Fidelity ledger**

| # | Claim in the original | Where it lives in the rewrite |
|---|---|---|
| 1 | On a map of -2 the metros read as islands | "Maps of -2 draw the metros as islands" |
| 2 | Korrath Metropolitan Zone: 140,000 residents, three security cooperatives, paved roads, reputation-gated core | "140,000 residents, three security cooperatives, paved roads" / "a reputation-gated core" |
| 3 | Calder Basin: 410 km southeast, smaller, older, built around a water-rights cooperative holding its territory for sixty years | "four hundred and ten kilometers southeast, smaller and older" / "has held its territory for sixty years" |
| 4 | Between them, rendered gray: 400 km of scrub hills, dead pre-reassignment infrastructure, road | "render the land between them in gray" / "four hundred kilometers of scrub hills" / "dead pre-reassignment infrastructure, and road" |
| 5 | Patrol contracts end at the district boundary markers | "The patrol contracts end at the district boundary markers" |
| 6 | The drone network does not fly here | "The drone network doesn't fly out there" |
| 7 | The AR grid thins to the federal minimum: the gate complexes at either end, nothing between | "the AR grid thins to the federal minimum" / "the gate complexes at either end and nothing in between" |
| 8 | "The gray kilometers are what institutional withdrawal looks like when you draw it on a map" | cut: thesis line |
| 9 | Out here the civilization enforces exactly one law | "Out there the civilization enforces exactly one law" |
| 10 | "Murder. That is the whole statute book." | cut: restates row 9 |
| 11 | A killing anywhere in -2 (metro, outskirts, empty middle) triggers immediate -3 reassignment | "A killing anywhere in -2" / "triggers immediate reassignment to -3" |
| 12 | Read from the killer's implant or reconstructed from the victim's | "read from the killer's own implant or reconstructed" / "reconstructed from the victim's" |
| 13 | Reassignment needs identification, not capture; the wall finishes it at any gate, market or scanner for life | "Identification is enough." / "Every gate, market and scanner the killer passes" |
| 14 | Everything below killing belongs to the layer | "Everything below killing belongs to the layer" |
| 15 | "Robbery is not a crime here; it is a transaction one party didn't agree to." | cut: reversal; the no-response fact is row 18 |
| 16 | A beating is free | "Wounds are free." (the leader) and row 18 |
| 17 | Captivity is an industry | "They take people." / "the outskirts labor camps" |
| 18 | The system logs everything (implants record, ledgers fill) and does nothing, because nothing below the line is its to do | "the ledgers fill, and the system does nothing" / "nothing below the line is the system's to do" |
| 19 | Upper-layer travelers find this obscene; residents find it legible | "Travelers from the upper layers find this obscene." / "Residents find it legible." |
| 20 | "One law, perfectly enforced, is not order. It is a boundary condition." | cut: reversal; the Key Lesson states the rule |
| 21 | The road economy is layered like everything else in the civilization | "The road economy that grew around that law is layered" |
| 22 | Nearest the metros: toll crews with a barricade, a half-dozen armed residents, a posted price | "a barricade, a half-dozen armed residents, a posted price" |
| 23 | Toll crews are almost courteous | "They are almost courteous." |
| 24 | They tax a road they claim to keep clear; the claim is partly true, since they defend their stretch against rougher operators like a revenue stream ("not robbing you") | "taxes a road it claims to keep clear" / "the claim is partly true" / "defends its stretch against rougher operators"; 'not robbing you' cut: reversal |
| 25 | Convoy masters price tolls into freight like weather | "Convoy masters price the tolls into freight like weather" |
| 26 | Deeper: takers who want the cargo, the vehicle, and anything implant-free that can be carried | "the cargo, the vehicle, and anything implant-free" / "that can be carried" |
| 27 | Deepest, where nobody crosses without contract escort: crews with portable backup vessel units | "in country nobody crosses without contract escort" / "the crews with portable backup vessel units" |
| 28 | The same hardware the Syndicate cartels run in the corridors | "the same hardware the Syndicate cartels run in the corridors" |
| 29 | These crews want people, not goods | "They take people."; 'not interested in your goods' cut: reversal |
| 30 | An implanted captive can bail out: die deliberately, revive at the proxy installation, file the loss with their cooperative | "die deliberately, revive at the proxy installation" / "file the loss with their cooperative" |
| 31 | So labor crews scan for the implantless and unaffiliated, those no metro network will miss | "the implantless and the unaffiliated, the ones no metro network" |
| 32 | Or they bring the portable unit, and the bailout door opens onto the same room it closed in | "they bring the portable unit" / "opens onto the same room it closed in" |
| 33 | Joss Marek has run the Korrath–Calder corridor nine years | "has run the Korrath–Calder corridor for nine years" |
| 34 | Machine parts east; dye stock and filter membranes west | "machine parts east and dye stock and filter membranes west" |
| 35 | Four-vehicle convoy on the escort cooperative's schedule | "a four-vehicle convoy on the escort cooperative's schedule" |
| 36 | Escort fee is 11% of cargo value; the uninsured alternative is one bad afternoon | "The escort fee is eleven percent of cargo value" / "the uninsured alternative is one bad afternoon" |
| 37 | Reassigned to -2 fourteen years ago for things he does not relitigate; the road does not ask | "reassigned to -2 fourteen years ago" / "for things he doesn't relitigate, and the road doesn't ask" |
| 38 | Corridor almanac on his terminal, maintained by the convoy masters' association, updated after every run | "kept by the convoy masters' association" / "updated after every run" |
| 39 | 206 incident sites on the route | "two hundred and six incident sites along the route" |
| 40 | Chokepoints: culvert wash at km 121; salvage field at 200 where sightlines die; long blind grade at 288 called the Stairs | "the culvert wash at kilometer 121" / "the salvage field at 200 where the sightlines die" / "that the escort riders call the Stairs" |
| 41 | The ambush comes at the Stairs and is professional | "The ambush comes at the Stairs, and it is professional." |
| 42 | A wrecked hauler across the cut at the top of the grade, staged well | "A wrecked hauler lies across the cut" / "staged but staged well" |
| 43 | By the time the lead escort rider reads it, the crew is up from the scrub on both shoulders | "by the time the lead escort rider has read it" / "up out of the scrub on both shoulders" |
| 44 | Eleven of them, rifles held low | "There are eleven of them, rifles held low." |
| 45 | The leader walks the line without hurry, in the register of a man doing business inside a constraint he respects | "walks the line of stopped vehicles without hurrying" / "a man doing business inside a constraint he respects" |
| 46 | Cargo doors opened, manifests read | "The cargo doors open. He reads the manifests" |
| 47 | The toll is not posted but is a toll all the same | cut: reversal; the scene shows the price named on the spot |
| 48 | Toll: a third of the dye stock, the spare power cells, the escort riders' sidearms | "They settle on a third." / "the spare power cells, the escort riders' sidearms" |
| 49 | Expensive. Survivable. | "The toll is steep and survivable" |
| 50 | The convoy master negotiates the percentage down, having done this eleven times | "A third of the dye," Joss says. / "Joss has done this eleven times." (reading decision: the convoy master is Joss; see flags) |
| 51 | The implants of thirty people record it for ledgers no enforcement body will act on | "the implants of thirty people are recording every second" / "ledgers no enforcement body will ever act on" |
| 52 | It goes wrong at the third vehicle | "It goes wrong at the third vehicle." |
| 53 | Passenger: a young man, nineteen maybe, riding cheap from Korrath to a Calder work contract | "riding cheap from Korrath to a work contract in Calder" / "a young man, nineteen maybe" |
| 54 | The scanning crewman's wand comes back empty: no implant, no affiliation tag | "the wand comes back empty. No implant. No affiliation tag." |
| 55 | No cooperative will file a loss on him; no bailout door; nobody to ransom him to | "No cooperative will file a loss report on this kid" / "there is nobody to ransom him to" |
| 56 | The crewman's posture changes; he takes the kid's arm like dropped freight | "the way a man picks up dropped freight"; the posture change cut: the gesture carries it |
| 57 | Joss moves before the decision finishes forming; he has seen what the outskirts labor camps give back and what they don't | "Joss is moving before he has finished deciding to" / "what comes back out of the outskirts labor camps" |
| 58 | Nine seconds, recorded at neural resolution by every implant present | "What follows takes nine seconds" / "records it at neural resolution" |
| 59 | The crewman swings his rifle stock at Joss's head: tier-three force, initiated | "swings his rifle stock at Joss's head" / "attacker initiated at tier three" |
| 60 | Joss takes it on the forearm | "Joss takes it on the forearm" |
| 61 | He answers one tier up, his right under the defense-of-others doctrine | "response at tier four under the defense-of-others doctrine" |
| 62 | …and its reasonable-perception standard | cut: the standard protects mistaken perceptions; Joss read the scene correctly, so the story no longer needs it |
| 63 | Sidearm out, fired twice, low | "draws his sidearm and fires twice, low" |
| 64 | The crewman goes down with a shattered hip, alive, screaming | "goes down with a shattered hip, alive and screaming" |
| 65 | The ridge rifles come up; the leader's hand comes up faster, flat, holding them | "The leader's hand comes up faster, flat, and holds them." |
| 66 | For a long moment only the wounded man and the wind | "only the wounded man and the wind" |
| 67 | Leader's arithmetic: shoot the trader and we are murderers | "Kill a trader and we're murderers." |
| 68 | The ledgers already have our gaits, voices, half our faces | "our walks and our voices. Half our faces." |
| 69 | -3 doesn't need to catch us, only know who we are | carried by row 13 ("Identification is enough.") |
| 70 | The hip is a wound; wounds are free | "He shot a hip." / "Wounds are free." |
| 71 | The kid was a side venture | "The kid was a side job." |
| 72 | The dye stock is already loaded | "then at the loaded dye stock" |
| 73 | "Leave it": to his crew, about his own man's venture, about all of it | "Leave it." |
| 74 | They carry the wounded crewman up the grade | "They carry the wounded crewman up the grade" |
| 75 | The wrecked hauler is winched aside ("a courtesy that is not courtesy but accounting") | "winch the wrecked hauler aside"; the courtesy line cut: reversal |
| 76 | The convoy rolls within the hour, a third lighter | "The convoy rolls within the hour, a third lighter" |
| 77 | The nineteen-year-old rides in the lead vehicle, not yet understanding what he was for nine seconds | "the kid rides up front in the lead vehicle" / "I thought they wanted my pack," |
| 78 | Joss waits three days; the verdict is silence: no reassignment order, no notification | "Joss waits three days for a verdict." / "no reassignment order, no notification" |
| 79 | The evaluation ran when the ledgers synced at the Calder gate | "The evaluation ran the moment the ledgers synced" / "at the Calder gate" |
| 80 | Attacker initiated at tier three, response at tier four within temporal scope, threat ceased, force ceased | "within temporal scope, threat ceased, force ceased" |
| 81 | The architecture answers a clean defensive act by doing nothing, its only acquittal | "A clean defensive act gets no reply at all." |
| 82 | That night the convoy masters' association updates the km 288 almanac entry | "That night the convoy masters' association updates the almanac entry" |
| 83 | Entry: crew of eleven, portable-unit affiliation suspected, tolls negotiable, *does not push to lethal* | "crew of eleven, portable-unit affiliation suspected, tolls negotiable" / "does not push to lethal" |
| 84 | The escort cooperative raises the corridor rate to 13% | "raises the corridor rate to thirteen percent" |
| 85 | Three metro merchants petition their district association to extend the patrol contract 40 km east | "Three metro merchants petition their district association" / "another forty kilometers east" |
| 86 | The association declines: 40 km of patrol costs more than the freight losses it would prevent | "The association declines, because forty kilometers of patrol" / "would cost more than the freight losses it prevented" |
| 87 | Everyone on every side of the calculation knows it | "everyone on every side of that calculation knows it" |
| 88 | Federal infrastructure recorded the whole incident and will act on none of it | carried by row 51; the closing restatement cut |
| 89 | Nothing crossed the line | cut: restatement; the verdict paragraph shows it |
| 90 | "This is not a malfunction" and residents do not experience it as one | cut: reversal; the stance is row 19 |
| 91 | The design read honestly where it runs thinnest | cut: thesis line |
| 92 | The one law sculpts toll crews into businessmen, takers into actuaries, violence into sub-lethal shapes | shown by the leader's choice and "does not push to lethal"; tricolon cut |
| 93 | By itself the law protects no one | Key Lesson, second sentence (what it does not cover is protected only by the market) |
| 94 | Protection is a market good, like water, escort, the kindness of a stranger with a sidearm | shown by the escort fee, the declined petition and Joss; tricolon cut |
| 95 | "The murder line is the only thing the gray kilometers give you for free." | cut: aphorism |
| 96 | KL: withdrawal produces an economy shaped by whatever law remains, not lawlessness | Key Lesson: "shapes all the violence beneath it"; the reversal half cut |
| 97 | KL: the single enforced line is murder → -3, certain and permanent | Key Lesson: "murder → -3, certain and permanent" |
| 98 | KL: it disciplines bandits into actuarial restraint: robbery priced, beatings free, killing unaffordable | cut from the Key Lesson: the ambush scene shows it |
| 99 | KL: "a boundary condition is not protection" | cut: reversal; the Key Lesson's second sentence states it directly |
| 100 | KL: robbery, capture and forced-revival labor are exactly as common as the market for preventing them | Key Lesson: "exactly as common as the market for preventing them allows" / "Robbery, capture and forced-revival labor" |
| 101 | KL: the corridors are the truest picture of the one-law floor | cut: restatement |

**Word count:** original 1,527 (body 1,429 + Key Lesson 98) → rewrite 1,152 (body 1,115 + Key Lesson 37), −24.6%.

**Outcome line changed** (ruling 3)
- Old: "Convoy Ambush Between Metros — One Law Is Enough to Shape Everything and Protect No One"
- New: "Convoy Ambush Between Metros — Toll Paid, Passenger Saved, Defender Not Reassigned"
- Why: the old second half is a thesis line that announces the moral instead of stating what happened. The new line states the three outcomes. The one-law point lives in the Key Lesson.

**Other flags**
- **Invented texture:**
  - "Doors";
  - the leader naming his price, and Joss's counter;
  - "Tam" and the call from the ridge;
  - the leader's spoken lines, whose content comes from the original monologue;
  - the kid's "I thought they wanted my pack", and "Nobody corrects him".
- **Reading decisions.**
  - "The convoy master" is Joss. Jason accepted this reading.
  - The leader opens with "the dye stock" and gives no opening number. The original gives only the settled toll.
- **Cut.** The reasonable-perception standard (row 62) is cut. The doctrine's name stays in the verdict readout.
- **Dossier echo.** The -2 dossier's Wilderness article (`layer--2.html:87–102`) reuses this piece's original sentences, as in §1.

---

## 4. The Timing Cartel

**Whose story, and why:** Petra Casimir, one of the forty-three.
- She sits on the call where every figure is shared, so each number reaches the reader when it reaches her.
- She commissions an installation from a sculptor, Ines Aro. That commission shows the step the mechanism turns on: the "hidden" money comes back as someone else's savings.
- One person makes the causal chain followable without section headers. The rolling average's refusal to move is something she checks every Thursday, not something the narrator explains.

**Rewrite**

```text
The Timing Cartel
Simulation Type: Civilizational Scenario · Classification: SCM Exploit · Doctrine Snapshot: v14.7
Outcome: Coalition's own spending pushes the district over the trigger
```

The network was informal: forty-three of the wealthiest citizens in Main Layer's District 7, coordinating on a call that met on Thursday evenings and kept no minutes. On the first evening Aurel Brandt shared a single page of figures.

District 7 had 1.1 million residents. Its aggregate savings stood at $97 billion and were climbing. At $100 billion the Savings Circulation Mandate would trigger, and garnishing would start at 10% a month. Between them, the forty-three held $14.2 billion, 14.6% of the district's total.

"We move enough of it out before the trigger activates," Aurel said. "Into things that can't be garnished. The whole district gets a delay, and we unwind it later."

Petra Casimir read the page twice and said yes.

For two weeks she spent like someone furnishing a new life. She prepaid service contracts far ahead, paid for property maintenance long before it was due, bought commodities in bulk, and commissioned an installation for her atrium from a sculptor named Ines Aro, who asked twice whether she was sure about the budget. Across the call, $8 billion left savings accounts.

The next Thursday Aurel posted the new page. The district aggregate read $89 billion. Someone laughed, and someone asked how soon they could start unwinding. Petra was looking at the line below it, the one the trigger actually read: the 90-day rolling average, $96.8 billion. Two weeks of spending had barely dented it.

"That's today's number," she said. "The trigger doesn't read it."

"If it did, we'd be done," Aurel said after a moment. "We'd unwind month by month, and nobody would ever see it come back into savings."

"It reads ninety days. To hold the average under a hundred for the whole window, we keep fourteen billion out of savings for ninety consecutive days."

They decided to hold.

For ninety days the money stayed out, and Petra watched where it went. Ines Aro's crew worked in her atrium all season. The contractors she had prepaid took on more staff. The coalition's money paid contractors, artists, suppliers and service providers, and then it paid whoever they paid. Every Thursday Petra opened the rolling average, and every Thursday it had barely moved.

On day ninety-one it crossed $100 billion anyway.

Ines came that week to sign the finished piece. Standing under it, she told Petra it was the best-paid job of her working life and that she had put most of it into savings. So, it turned out, had the contractors and the suppliers and everyone else downstream of the coalition's $8 billion, while the rest of the district had gone on saving the whole time. The money was still in District 7, in other people's accounts.

The cycle activated, and the coalition's remaining savings, Petra's among them, were garnished at 10%. That evening she ran the figures for the whole call. The ninety days of spending had cost them more than the garnishing would have.

The next quarter, three members left the call, and nobody argued with them. By month six nobody was scheduling Thursdays, and the network had dissolved. The installation is still in Petra's atrium. She has grown fond of it.

Key lesson: Under a 90-day rolling average, a cartel that holds savings down for the full window has spent the money, which is the mandate's objective, and a cartel that cannot last ninety days achieves nothing. The system never has to detect the cartel.

**Fidelity ledger**

| # | Claim in the original | Where it lives in the rewrite |
|---|---|---|
| 1 | Forty-three of the wealthiest citizens in Main Layer's District 7 | "forty-three of the wealthiest citizens in Main Layer's District 7" |
| 2 | Combined savings of $14.2 billion | "the forty-three held $14.2 billion" |
| 3 | They form an informal coordination network | "The network was informal" / "coordinating on a call" |
| 4 | Objective: keep aggregate savings below the $100 billion SCM trigger to avoid the 10% monthly garnishing cycle | "At $100 billion the Savings Circulation Mandate would trigger" / "garnishing would start at 10% a month" |
| 5 | District 7 has 1.1 million residents | "District 7 had 1.1 million residents" |
| 6 | The aggregate is at $97 billion and climbing | "stood at $97 billion and were climbing" |
| 7 | The coalition's $14.2 billion is 14.6% of the total | "14.6% of the district's total" |
| 8 | Moving capital out of savings into non-garnishable forms before the trigger activates delays the cycle for the entire district | "We move enough of it out before the trigger activates" / "Into things that can't be garnished." / "The whole district gets a delay" |
| 9 | Over two weeks, members convert savings into prepaid service contracts, advance property maintenance, bulk commodity purchases and commissioned art installations | "For two weeks she spent" / "She prepaid service contracts far ahead" / "paid for property maintenance long before it was due" / "bought commodities in bulk" / "commissioned an installation for her atrium" |
| 10 | $8 billion moves out of savings and into economic activity | "Across the call, $8 billion left savings accounts." |
| 11 | The district aggregate drops to $89 billion | "The district aggregate read $89 billion." |
| 12 | On a snapshot trigger this would work (original: 'the cycle would deactivate') | "That's today's number," / "If it did, we'd be done," Aurel said; the pilot's 'deactivate' wording flag is moot now that the counterfactual is spoken |
| 13 | The coalition would unwind its purchases over the following months | "We'd unwind month by month" |
| 14 | The capital would flow back into savings 'below the radar' | "nobody would ever see it come back into savings" |
| 15 | The SCM uses a 90-day rolling average, not a snapshot | "the one the trigger actually read" / "the 90-day rolling average" / "The trigger doesn't read it." |
| 16 | District 7's rolling average stands at $96.8 billion | "the 90-day rolling average, $96.8 billion" |
| 17 | The two-week movement barely dents it | "Two weeks of spending had barely dented it." |
| 18 | Holding the rolling average below $100 billion for the full window requires keeping $14 billion out of savings for ninety consecutive days | "hold the average under a hundred for the whole window" / "fourteen billion out of savings for ninety consecutive days" |
| 19 | 'Ninety days of prepaid contracts … is not capital suppression. It is capital circulation.' | cut: reversal; the circulation is shown in rows 20–21 |
| 20 | The money enters the economy, paying contractors, artists, suppliers and service providers | "paid contractors, artists, suppliers and service providers" |
| 21 | The velocity effect ripples through the district | "and then it paid whoever they paid" / "The contractors she had prepaid took on more staff." |
| 22 | The coalition spends ninety days doing what the SCM was designed to make it do | "They decided to hold." / "For ninety days the money stayed out"; the design point lives in the Key Lesson ("the mandate's objective") |
| 23 | At day ninety-one the rolling average crosses $100 billion anyway | "On day ninety-one it crossed $100 billion anyway." |
| 24 | Because the rest of the district kept saving normally | "the rest of the district had gone on saving" |
| 25 | And the coalition's $8 billion in spending generated downstream income that other residents deposited | "she had put most of it into savings" / "everyone else downstream of the coalition's $8 billion" / "in other people's accounts" |
| 26 | The cycle activates; the coalition's remaining savings are garnished at 10% | "The cycle activated" / "the coalition's remaining savings" / "were garnished at 10%" |
| 27 | The ninety days of spending cost more than the garnishing would have | "had cost them more than the garnishing would have" |
| 28 | Three members leave the next quarter | "The next quarter, three members left the call" |
| 29 | By month six the network has dissolved | "By month six nobody was scheduling Thursdays" / "the network had dissolved" |
| 30 | 'The exploit was more expensive than compliance.' | cut: thesis closer restating row 27 |
| 31 | KL: the rolling average converts every timing exploit into economic circulation | Key Lesson: "Under a 90-day rolling average" / "a cartel that holds savings down for the full window" |
| 32 | KL: a cartel that suppresses savings for ninety days has spent the money, the SCM's objective | Key Lesson: "has spent the money, which is the mandate's objective" |
| 33 | KL: a cartel that cannot sustain ninety days achieves nothing against the window | Key Lesson: "a cartel that cannot last ninety days achieves nothing" |
| 34 | KL: the exploit is self-defeating; avoiding the mandate means doing what it requires | cut: restates row 32 |
| 35 | KL: the system does not need to detect the cartel | Key Lesson: "The system never has to detect the cartel." |
| 36 | KL: the architecture defeats the strategy regardless of intent | folded into row 35: a system that never detects the cartel never reads its intent |

**Word count:** original 447 (body 366 + Key Lesson 81) → rewrite 570 (body 526 + Key Lesson 44), +27.5%. That is 1.28× the original, inside the 1.5× case-study exception (cap about 670).

**Outcome line changed** (ruling 3)
- Old: "Exploit funds its own defeat"
- New: "Coalition's own spending pushes the district over the trigger"
- Why: the old line is an ironic formula standing in for an event. The new line states the event with the same facts. The old line's sentence case is kept.

**Flags**
- **Invented texture:**
  - the names Petra Casimir, Aurel Brandt and Ines Aro;
  - the Thursday call that keeps no minutes, and Aurel's shared page of figures;
  - Petra's atrium and the installation;
  - Ines's question about the budget, and her line about savings;
  - "Someone laughed";
  - the contractors taking on more staff;
  - "She has grown fond of it."
- **How the figures arrive.** Every district figure reaches Petra through Aurel's shared page, not through a public district feed, so that no publication mechanism is invented. Two figures are spoken in dialogue: "fourteen billion" and "a hundred" (the $100 billion trigger). Every other figure is a numeral.
- **Coalition facts carried by one member.** Petra makes all four kinds of conversion in the original's list. The 10% garnish lands on "the coalition's remaining savings, Petra's among them". The cost comparison is run "for the whole call".
- **"Deactivate" (pilot row 12).** The wording issue is gone. The snapshot counterfactual is now Aurel's line: "If it did, we'd be done."
- **Era (ruling 6).** The piece stays on v14.7 mechanics, and nothing is updated to LP-069/070. I found no conflict with a Charter rule that isn't a rate or a number. The conversions are named without saying how many properties Petra holds.
- **Key Lesson.** Unchanged from the pilot, per ruling 2. The body never states the mandate's objective, so the Key Lesson doesn't repeat the body.

---

## Verification

- **Ledger quotes.** A script checked all 385 double-quoted ledger fragments (115 + 91 + 126 + 53). Each appears word for word in its rewrite and is 10 words or fewer.
- **Style guide examples.** The guide's seven "after" examples are also verbatim from the rewrites.
- **Files.** No site file was edited, and nothing was committed.
