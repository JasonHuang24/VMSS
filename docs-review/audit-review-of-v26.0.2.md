v26.0.2 is correct except one label: the new story note calls LP-062.2 federal law, and it is a Main Layer regulation. On the three open points, the site already implies an answer to (a) and (b); (c) should stay a book invention.

# Verification of main at 1e05e8b (v26.0.2)

Reviewed: `git diff c9816a4 1e05e8b` at sentence level (three content changes), each checked against the Charter, the Code and the register. I also confirmed that v26.0.1 (`0b9f99e..c9816a4`) carries all ten sentences from the v26.0.0 review. Line numbers are HTML lines at `1e05e8b`. check-canon 141/141 and css-cascade pass. Findings only.

---

## Part 1. The three changes

**1. `whitepaper.html:522`, the LP-062.2 opt-out.** Correct. "An LP-062.2 opt-out is publicly visible: anyone can see it." follows the law's own words: disabling "writes a publicly-visible entry to the bearer’s ledger" (`laws.html:2794`).

**2. `whitepaper.html:893`, a visitor's income.** Correct. Pay earned inside a lower layer "comes in that layer’s currency and can be spent only there" is the Charter's rule (`charter.html:203`: "Wealth accumulated in a lower layer economy remains in that economy") and the FAQ's picture of a visitor "earning local currency through work" (`faq.html:720`).

**3. `simulations.html:6577`, the note under The Line That Held.** One word is wrong. "the opt-out-able default Mara reads as a draft is federal law in current canon: LP-062.2". The register has it as "Scope Regulatory (Article XXVIII) — Main Layer" (`law-polling.html:3249`), and the Code files it under "Layer-Wide · Main Layer" (`laws.html:2791`).
- Replace with: "Doctrine note — the opt-out-able default Mara reads as a draft is Main Layer regulation in current canon: LP-062.2 (2203)."

---

## Part 2. Three points where the books invent

### (a) Placement history and deaths: who can read them

The site already implies the answer. It turns on one Code rule: only conduct enters the ledger (`laws.html:1743`: "Only consensus-grade conduct … is admissible to the behavioral ledger").

- **A punitive placement is readable by private parties.** The criminal record log "handles acts that cross reassignment thresholds" (`whitepaper.html:511`), and it is "read by private institutions in the lower layers when making access decisions" (`laws.html:1743`). So each punitive move, with its offense and date, is on a track private parties can read. The Code itself calls "reassignment date, offense record, district of last residence, date of death" a person's "public record" (`laws.html:2054`).
- **Other moves are not.** Phasing, a visit and elective residency are not consequences of conduct, so they write no ledger entry. The Main page says as much: "Ascension and descent in Main are often invisible at the district level" (`layer-0.html:69`). They are kept in the institutional archive ("district assignment and biographical data", `laws.html:2054`), which is not open to the public.
- **A death is not a ledger entry.** A death followed by revival goes to the designated next-of-kin and no further (§17.1). A permanent death flips the archive's status flag to deceased, and then:
  - family members, not only the designated next-of-kin, may read the date of death with the rest of the public record (`laws.html:2054`);
  - anyone else needs standing under LP-032: research by Meritboard panel review, criminal investigation by Supreme Court warrant, diplomatic verification under the Federation Treaty (`law-polling.html:1240`).

A sentence should go on the site. It restates the Code and adds no rule, so the whitepaper is the right place. Add to §5.5 "Who sees what" (`whitepaper.html:522`), after the sentence on minor entries:

> "A punitive reassignment stands in the criminal record log with its offense and date, so private parties can read it. Phasing, a visit and elective residency are not conduct and write no ledger entry; they are kept in the institutional archive, which opens only to those with standing (§17.4, LP-032). A death is not a ledger entry either: a revival is notified to the designated next-of-kin, and a permanent death is recorded in the archive, where family members may read its date and anyone else needs LP-032 standing."

For the books: a neighbour or employer can see that someone was reassigned, for what and when. They cannot see that someone once lived in Sanctuary and phased back, or spent a decade below as an elective resident, or died and was revived last year.

### (b) Are the layer floors tokens or dollars?

The site implies an answer on both halves.

- **A floor is a count of that layer's own currency.** The Charter writes "$5,000/month" for -1 and "$1,250/month" for -3 (`charter.html:184`, `:186`), and the whitepaper treats those as the number of units issued: "UBI at $5,000/month produces a money supply roughly one-tenth of Main's" (`whitepaper.html:898`; 600 million people at 5,000 against 3 billion at 10,000). The -1 page then says "The $5,000/month UBI floor goes further on a purchasing power gradient that runs 1.3–1.8x Main" (`layer--1.html:59`). So a -1 resident receives 5,000 compliance tokens a month, and they buy what $6,500 to $9,000 buys in Main. The "$" on a lower-layer figure is that layer's unit, not a Main dollar.
- **The token-to-dollar relation exists only at the retention gate, and the Charter gives it.** "a citizen retaining $10,000 in Main value would receive roughly 6,500 compliance tokens in -1, 4,700 lower-restrictions tokens in -2, or 3,100 freedom tokens in -3" (`charter.html:204`). That is about 0.65, 0.47 and 0.31 tokens per retained dollar at the midpoint. It "is not a fixed exchange rate" (`whitepaper.html:896`) and moves by district within the gradient: roughly 0.56 to 0.77 in -1, 0.40 to 0.56 in -2, 0.25 to 0.40 in -3.

The books' figures are sound: about 0.64 compliance tokens and 0.31 freedom tokens per retained dollar sit at the Charter's midpoints.

What a book must not do is convert a floor: 1,250 freedom tokens a month is the -3 floor itself, not $1,250 turned into about 390 tokens.

A sentence should go on the site, in whitepaper §12.2 "What a resident meets" (`whitepaper.html:893`), after the sentence naming the currencies. It restates the Charter and adds no rule:

> "Each layer's floor is a count of its own currency: the $5,000 a month of -1 is 5,000 compliance tokens, and each buys what $1.30 to $1.80 buys in Main. A dollar brought down through the retention schedule becomes about 0.65 compliance tokens, 0.47 lower-restrictions tokens or 0.31 freedom tokens at the midpoint settlement rate, which varies by district (Charter Article III.IV)."

### (c) LP-014's pre-approval windows

Leave the figures as book invention. A number here would be a term of a Main Layer regulation, and by the reasoning of fix 3 in the v26.0.0 review it belongs in the register and the Code by the owner's hand, not in the whitepaper. Nothing on the site needs it.

The site does constrain what the books may show:
- **Scope.** LP-014 covers "Main Layer residents whose family members descended to -1 or -2" (`law-polling.html:2819`). It does not reach a visit to -3, and it does not reach Sanctuary residents.
- **Date.** It was ratified in 2136. A scene before that has no shortened window.
- **Direction.** It "reduced" the window, so an ordinary visit must take longer than a family visit. The books' two days for a family visit fits; one story has an ordinary filing take three days (`simulations.html:4875`) and another has one approved "instantly" on a clean ledger (`simulations.html:3336`), so the stories themselves do not agree and neither is doctrine.
- **-3 is never minutes.** Entry there always passes the terminal notice and the vessel-link suspension (§19.12, LP-004.2), whatever the reason for the visit. "Minutes for a death in the family below" works for -1 and -2 only.

Within those limits, two days for a family visit and minutes for a bereavement contradict nothing.

---

## Sentences to fix or add

1. `simulations.html:6577`: "federal law" → "Main Layer regulation", as in Part 1.
2. `whitepaper.html:522`: add the placement-and-death sentences in (a).
3. `whitepaper.html:893`: add the floor-and-token sentences in (b).

Nothing else in the diff needs a change. My standing reservations from the v26.0.0 review are unchanged.
