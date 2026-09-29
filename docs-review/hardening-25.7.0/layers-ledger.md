# Hardening 25.7.0: unit "layers" ledger

Files: layer--1.html, layer--2.html, layer--3.html. Plan items matched: 6 (plan indices 416, 419, 436, 437, 440, 441). Applied: 6. Declined: 0.

## Applied

### 416 (fix), layer--1.html closing line
- Was: "-1 is a consequence state rather than a failure state. A failure implies permanence; a consequence carries information"
- Now: "-1 is a consequence state, not a failure state. Placement is permanent, but the consequence carries information"

### 419 (lift), informal layer names defined at first use
- layer--1.html:88 "The Balanced Layer earns its name" -> "The Balanced Layer (the informal name for -1) earns its name"
- layer--2.html:60 "The Lower Restrictions Layer has genuine economic activity" -> "The Lower Restrictions Layer (the informal name for -2) has genuine economic activity"
- layer--3.html:65 "The Freedom Layer may organize" -> "The Freedom Layer (the informal name for -3) may organize"
- Deviation: the plan named layer--2 line ~121 and layer--3 line 91, but its governing rule is "first use on each page". The actual first uses are layer--2:60 (Economy bullet) and layer--3:65 (Freedom Boundary bullet), so the clause went there. Headings were not touched.

### 436 (lift), layer--3.html Backup Vessel Parity section
- "The backup vessel was not merely an advantage — it was a category violation." -> "The backup vessel did more than confer an advantage: it broke the category -3 is built on."
- "at zero mortality risk — mining, ..." -> "at zero mortality risk: mining, ..."
- "Imprisonment was futile — the visitor died" -> "Imprisonment was futile: the visitor died"
- "makes the visit exploitative — the mortality gap." -> "makes the visit exploitative: the mortality gap."
- "The freedom of -3 is preserved. The fairness of -3 is restored." -> "The provision leaves -3's freedom intact and restores fairness between visitor and resident."

### 437 (lift), layer--2.html The Wilderness
- "residents find it legible. One law enforced with perfect certainty is a boundary condition rather than order" -> "residents understand it. The one law is enforced with certainty, but it sets a single threshold and keeps no order beneath it"
- "funded vessel" (first use, line 94) -> "funded vessel (a backup vessel whose revival fees are paid up)"
- "the terminal sync capture the remedy depends on." -> "the terminal sync capture that the remedy depends on: the enforcement capture of a homicide victim's mind-state through the implant (LP-065)."
- "casts its shadow ... turns toll crews into businessmen and takers into actuaries" -> "applies across hundreds of empty kilometers ... Toll crews run as businesses, crews that take cargo or people weigh each act against the reassignment"
- "The only thing the wilderness gives away free is the line itself." -> "The only protection the wilderness provides without payment is the murder line: a killing anywhere in it still sends the killer to -3."

### 440 (lift), layer--3.html The Wild Enterprise
- "For the operator the three outcomes are legally identical:" -> "For the operator these outcomes, like all five routes, are legally identical:"

### 441 (fix), layer--3.html The Doctrinal Frame closing
- "nobody walks in casually and nobody walks out at all." -> "nobody walks in casually, and nobody sent there ever walks out."

## Extra scope: LP-004.2 doctrine alignment (layer--3.html, Backup Vessel Parity)

Checked against laws.html LP-004.2 and law-polling.html#lp-004-2. The section already stated documented vessel-link suspension on entry, restoration on exit, and death in -3 final for visitor and resident alike, so none of that wording changed. One mismatch remained: the -1/-2 compromised-consent track, which is LP-004.2's first track, sat under the "Disclosure:" label, which tied it to LP-006. Corrected:
- Was: "It operates on two tracks, under LP-006 (disclosure) and LP-004.2 ... enterprise participation, and compromised-consent recruitment ... restricted in -1 and -2"
- Now: "It rests on LP-006 (disclosure) and LP-004.2 (Backup Vessel Parity). ... Parity runs on two tracks. In -1 and -2, compromised-consent recruitment ... is restricted"
