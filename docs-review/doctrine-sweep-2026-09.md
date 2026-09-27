# Targeted Doctrine Sweep — Find Phase (2026-09)

## Rulings (Jason, 2026-09-27)

Applied as v24.3.2, this commit.

1. **Approved as proposed:** DS-01 to DS-05, DS-07 to DS-16, DS-18 to DS-23, DS-25 to DS-28 (25 findings). Each finding's proposed replacement from §2a applied exactly. DS-05 and whitepaper.html:440 keep their literal `8&ndash;12` / en-dash "8–12" byte-for-byte. DS-27 carries three edited spans; DS-18 carries two.
2. **DS-17** (`layer-0.html:61`): ruled to the relocated-children reading — "and lower-layer-born children who relocated under Article VIII, building toward Sanctuary." (not the register's proposed "rebuilding toward Sanctuary from low scores" wording).
3. **DS-06 and DS-24** routed to the 25.0 dossier prose-lift as story rulings; `layer-0.html:112–116` left unedited.
4. **Two JavaScript strings** fixed alongside the register: `assets/js/diagrams.js:118` (Ring Atlas ascension rule, matching DS-03/DS-04) and `assets/js/sti-sim.js:228` (Trust Console −3 detection line, matching DS-11).
5. **Left as-is:** the 16 `story-ruling` findings, the 25 `no-action` findings, open tensions T1–T3, `diagrams.js:76`, and the stale comment at `sti-sim.js:651`.

**Status:** find phase complete, read-only. No site file edited. Awaiting Jason's ruling on every row; the apply session consumes this file (canon-page fixes → v24.3.2; story rulings → 24.4/24.5 prose-lift sessions).
**Date:** 2026-09-26 · **Base:** main `ae0f09e` (v24.3.1)
**Scope read:** every `.html` page in the repo root (43 files, including `404`, `navbar` and `footer`) plus `documents/academy-source.html` and `documents/resources-source.html`. The four `simulations-*.html` pages are two redirect stubs and two landing cards with no doctrinal prose; the coordinator read them directly. Out of scope: Lite site, `docs-review/`, repo-root `.md` files.
**Method:** 19 read-only Sonnet subagents read every line of their page groups and grepped them with synonym patterns. In parallel, the coordinator ran sentence-level regex passes across the whole scope. The coordinator read every candidate in context and steelmanned it before it entered the register. Candidates that were only correct restatements of a rule are not listed.

---

## 1. Rule texts (quoted from canon)

### R1 — STI never sets placement

- **Charter II** (`charter.html:168`): "Separate reputational ledger for non-criminal trust violations. Tiered visibility: minor private, major public. Gates Trust Threshold Domains. No crossover to VMSS reassignment."
- **Charter XII** (`charter.html:296`): "No single metric, including STI, shall unilaterally determine punitive layer assignment or descent into lower layers. … Layer phasing … is exempt from this rule and may be triggered by a single-metric threshold, because phasing is a return to baseline rather than a punitive descent and the metric threshold is itself the definition of the layer's qualifying condition."
- **Charter XIII** (`charter.html:298`): "Measured indicators such as STI serve as evaluative signals, not direct determinants of punitive consequence."
- **Whitepaper §5.4** (`whitepaper.html:511`): "It does not automatically trigger physical enforcement or layer reassignment. The criminal record log — the second track of the implant ledger — handles acts that cross reassignment thresholds."
- **Whitepaper §5.5** (`whitepaper.html:521`): "The STI score and the criminal record log operate independently on the same implant ledger."
- **Whitepaper §6.5** (`whitepaper.html:581`): "Federal law violations route through Article XIV three-axis regardless of how they are framed; STI threshold drops route through phasing."

**Where canon differs from the prompt's summary (canon wins):**
1. "Track 1 and track 2 are separate" is slightly stronger than canon. Charter XIII and Whitepaper §5.10 (`:539`) let STI enter punitive evaluation "as one weighted input alongside behavioral context, pattern analysis, and cumulative history. It cannot single-handedly produce a punitive outcome." So R1 means STI never *sets* placement. Text calling STI one signal among several is consistent with canon and is not a finding.
2. "STI's only placement effect is Sanctuary phase-back below 85": Art. VII names a second phase-back trigger: "whose STI falls below the 85-point eligibility floor **or who commits a high-impact trust violation**."
3. Terminology: Whitepaper §5 opens (`:469`) by describing the STI as a system that "operates on two distinct tracks: the STI score … and the criminal record log." So "STI" is sometimes the umbrella for both tracks. This is the steelman for DS-01/DS-02.
4. "Main holds the full 0–100 range" is dossier and whitepaper text, not Charter text (`layer-0.html:61`, `whitepaper.html:442`). It is consistent with the Charter.

### R2 — Sanctuary eligibility is STI ≥ 85, effective immediately

- **Charter II, juvenile null-scoring** (`charter.html:177`): "Layer phasing mechanisms that require an STI threshold — including the 85-point Sanctuary eligibility floor — cannot evaluate a null input … The initialization score determines immediate layer eligibility."
- **Charter VII** (`charter.html:264`): "Phasing governs movement between Main Layer (0) and +1 Sanctuary — it is STI-driven, reversible, and earned through demonstrated character."
- **Whitepaper §5.9** (`whitepaper.html:536`): "the metric threshold (e.g. STI below 85 for Sanctuary phasing) is itself the definition of the layer's qualifying condition."
- **Whitepaper §5.12** (`whitepaper.html:550`): "The initialization score determines immediate layer eligibility through the standard phasing mechanism."

**Where canon differs from the summary:**
1. Charter text says "immediate" only for initialization at 18. Extending it to every non-punitive citizen, including right after a phase-back, rests on §5.9 (the threshold *is* the qualifying condition) plus the v24.3.0 ruling.
2. Charter VII contains wording that could be read as a gate: "Upward movement is earned through sustained compliance and demonstrated behavioral trajectory" and "must re-earn ascension through standard criteria." Read alongside §5.9, both describe how the score is earned, since the STI is itself trajectory-weighted. Neither imposes a separate window. Pages that echo this wording are recorded once as no-action (DS-52, DS-53).
3. Canon itself is split. Whitepaper §4.2 and §5.2 carry the sustained-window language (DS-03, DS-04), while the Charter and §5.9/§5.12 support immediate eligibility. The Charter side wins.
4. "Moving in is voluntary" has canon support: `whitepaper.html:442` ("Sanctuary-eligible but choosing Main") and `layer-0.html:61`/`:69`.

### R3 — STI and the public ledger run in −3

- **Charter II** (`charter.html:176`): "The same conduct rated by the population of -2 or -3 is assessed against that layer's ambient standard."
- **Charter XXV.III** (`charter.html:380`): "…including the public ledger visibility that -3's voluntary residents depend on for their own reputational infrastructure."
- **Charter VI** (`charter.html:260`): "-3 Terminal (Minimal Institutional Presence): No daily intervention or revival." **Charter XXIV** (`:364`): "No daily enforcement network."
- **Whitepaper** (`whitepaper.html:1068`): "In -3 the flag records without triggering enforcement."
- **Cured line** (`layer--3.html:91`): "…without the AI enforcement that reads conduct for layer reassignment … The public ledger still travels with every resident."

No correction needed. Canon matches the summary. The proposed fixes use the phrase "AI enforcement", following the cured line.

### R4 — Mobility flows downward (Charter VII in full, plus III.V, III.VI and X)

- **R4a Phasing** (VII): "Phasing governs movement between Main Layer (0) and +1 Sanctuary — it is STI-driven, reversible, and earned through demonstrated character. A Sanctuary resident whose STI falls below the 85-point eligibility floor or who commits a high-impact trust violation phases back to Main Layer and must re-earn ascension through standard criteria."
- **R4b Reassignment** (VII): "Reassignment governs punitive descent into -1, -2, and -3 — it is triggered by federal law violations and qualifying behavioral breaches, is immediate, and is permanent." (III.VI): "Punitive reassignment to any lower layer — -1, -2, or -3 — closes the upward pathway permanently. … STI recovery within a punitive layer determines local opportunities and social standing but does not restore eligibility for upward movement."
- **R4c Downward visitation** (VII): "Downward visitation is temporary — citizens visit lower layers while retaining origin-layer status, assets, and institutional relationship." (III.V): "Visitors remain subject to the enforcement posture of their origin layer while visiting."
- **R4d Elective residency** (VII): "Elective residency is an indefinite commitment — citizens choose to reside in a lower layer, retaining origin-layer status and assets, with the right to return at any time." (III.VI): "Elective residents may return to their origin layer or any layer above their current placement at any time."
- **R4e Voluntary permanent residency** (VII): "Voluntary permanent residency is irreversible — citizens file formally, origin-layer assets are liquidated per the schedule in Article III.V, and the upward pathway closes permanently. The process requires psychological screening and constitutes a formal waiver of the upward pathway."
- **R4f No upward visitation** (VII): "Visitation and elective residency flow downward only. Citizens may visit or reside in layers below their current placement. Citizens may not visit layers above their current placement. Punitive residents hold no visitation rights to higher layers. Voluntary permanent residents of -3 retain no upward visitation rights."
- **Adjacent canon:** Art. X: "Exit from -3 is impossible — it is terminal." Canonical exception, Arts. V and VIII: children born in lower layers hold "a standing human right" to relocate to Main Layer (0) at any age.

**Correction and flagged assumption:** Canon does not settle whether a Main-placed citizen at ≥ 85 who has not moved up may enter Sanctuary without taking up residence. Art. VII does not define "current placement" for such a citizen, and R2 makes the move itself immediate. This register treats Sanctuary-credentialed citizens entering Sanctuary as consistent (DS-64). It flags only entry by citizens who are not eligible, or blanket "visitation rights".

### R5 — Currency conversion

- **Charter III.IV** (`charter.html:202–203`): "+1 Sanctuary and Main Layer (0) share a common currency … -1, -2, and -3 each maintain separate currencies. … Upward conversion is prohibited without exception. Downward conversion is permitted only through authorized downward channels…"
- **Charter III.VIII** (`:242`): "Wealth accumulated through terminal realm speculation or capital markets cannot be converted upward."
- **Whitepaper §12.2** (`whitepaper.html:891`): "+1 Sanctuary and Main Layer share a common currency. -1, -2, and -3 each maintain separate currencies. Upward conversion is prohibited without exception. Downward conversion is permitted only through authorized downward channels."

No correction needed. Canon adds that conversion happens at central-bank settlement rates within the purchasing-power-gradient ranges; the story ruling DS-44 turns on that.

---

## 2. Findings register

Ordered by disposition, then by rule. Line numbers are as of `ae0f09e`. Quotes are verbatim, and "…" marks an elision. Every replacement changes only the words the rule requires; the rest of each sentence is unchanged.

### 2a. `fix` — canon and world-facing pages (28)

| ID | Rule | File:line | Quote (≤25 words) | Conflict | Steelman | Disposition | Proposed replacement |
|---|---|---|---|---|---|---|---|
| DS-01 | R1 | charter.html:338 (Art. XXII) | "The same civilization that trusts the STI ledger to sort 4.3 billion residents into layers trusts measurable achievement to sort its leadership." | Says the STI sorts residents into layers; Art. II says "No crossover to VMSS reassignment." | Whitepaper §5 uses "STI" as the umbrella for both tracks. Fails inside the Charter, where Art. II defines STI narrowly. | fix | "…trusts the **implant ledger** to sort 4.3 billion residents into layers…" |
| DS-02 | R1 | whitepaper.html:593 (§7 intro) | Same sentence as DS-01. | Same. | Same; §5's umbrella use is stronger here, but §5.4 still says STI "does not … trigger … layer reassignment." | fix | "…trusts the **implant ledger** to sort 4.3 billion residents into layers…" |
| DS-03 | R2 | whitepaper.html:440 (§4.2 +1 profile) | "Entry requires sustained STI record above 85, typically earned through 8–12 years of demonstrated conduct." | Makes a sustained record the entry condition. §5.9 makes the 85 threshold itself the condition. | "8–12 years" can be the typical time to reach 85. But "requires sustained … record" states a gate. | fix | "Entry requires **an STI of 85 or above**, typically earned through 8–12 years of demonstrated conduct." |
| DS-04 | R2 | whitepaper.html:505 (§5.2) | "Sustained scores above 85 are one factor in the phasing mechanism for ascent to +1 Sanctuary." | "Sustained" adds a window. "One factor" contradicts §5.9 (threshold = condition) and §6.5 (phasing reads a condition and involves no multi-factor adjudication). | None found. The sentence contradicts §5.9 in the same document. | fix | "**A score of 85 or above is the qualifying condition for phasing up to** +1 Sanctuary." |
| DS-05 | R2 | laws.html:1709 (Social Trust Measurement Standard, `code-fc-social-trust-measurement`) | "Sanctuary entry requires a sustained record above the constitutional floor, typically earned through 8–12 years of demonstrated conduct" | The Code restates §4.2's sustained-record gate as law. | It faithfully mirrors its source, but the source is DS-03. | fix | "Sanctuary entry requires **a score at or above** the constitutional floor, typically earned through 8&ndash;12 years…" (keep entities) |
| DS-06 | R2 | layer-0.html:116 (The Explorer, Darius Okafor, v9.0) | "He has the score. He has the residency pathway. He could file and the system would likely approve it." | Puts a filing and approval gate on entry. Also 76 + 4 = 80, so "he has the score" is false as written. | "Residency pathway" could mean the voluntary move, but "file … approve" describes vetting. | story-ruling (routed to 25.0) | — |
| DS-07 | R2 | documents/academy-source.html:537 (Q4, 400-level tier) | "They know Sanctuary requires sustained STI 85+ over 8-12 years — you don't just "choose" it, you earn it." | Teaches an 8–12-year sustain window as correct doctrine. | Sourced from Whitepaper §4.2, which is DS-03. | fix | "They know Sanctuary requires **an STI of 85+, typically 8-12 years in the making** — you don't just "choose" it, you earn it." |
| DS-08 | R2 | documents/academy-source.html:543 (Q4, "Where Students Fail") | "The student who picks Sanctuary without realizing it requires 8-12 years of sustained STI 85+." | Same window, framed as the fact students fail to know. | As DS-07. | fix | "…without realizing it requires **an STI of 85+, typically 8-12 years away**." |
| DS-09 | R2 | documents/academy-source.html:564 (Q5, D-grade critique) | "no understanding that Sanctuary requires sustained STI 85+ over years of demonstrated conduct." | Same window, in the rubric's own voice. | "Over years" can describe score-building, but "sustained STI 85+" states the window. | fix | "…requires **an STI of 85+ built** over years of demonstrated conduct." |
| DS-10 | R2 | documents/resources-source.html:2391 (Life in Sanctuary) | "The behavioral threshold for Sanctuary admission is 85 STI sustained across the record." | Reads as a requirement to hold 85 over time. | The STI is trajectory-weighted across the record, so this may describe what the score measures. Partly holds; flagged because the sentence states the admission rule. | fix | "…admission is **an STI of 85, a score built across the whole record**." |
| DS-11 | R3 | whitepaper.html:448 (§4.2 −3 profile) | "No pre-intervention, no post-intervention for daily conduct, no AI monitoring, no drone patrol." | "No AI monitoring" reads as no STI or ledger in −3. This is the known residue. | "Monitoring" may mean enforcement surveillance. The words still deny monitoring. | fix | "…no post-intervention for daily conduct, **no AI enforcement**, no drone patrol." |
| DS-12 | R3 | layer--3.html:51 (overview) | "The response is withdrawal of daily governance — no AI monitoring, no drone patrols, no pre-intervention, no post-intervention, no backup vessel continuity." | Same residue. Line 91 was cured; this one was not. | As DS-11. | fix | "…withdrawal of daily governance — **no AI enforcement**, no drone patrols, …" |
| DS-13 | R3 | layer--3.html:60 (Enforcement Model) | "Minimal. No pre-intervention, no post-intervention for daily conduct, no AI monitoring, no drone patrol infrastructure." | Known residue (the Enforcement Model line). | As DS-11. | fix | "…for daily conduct, **no AI enforcement**, no drone patrol infrastructure." |
| DS-14 | R3 | layer--3.html:74 (Day in the Life, pre-v5.0) | "the ambient awareness of the system watching, logging, assessing — is gone. The implant still sits in the skull." | Says logging and assessing stop in −3; the ledger and STI keep running. | Could be the resident's felt absence of feedback. "Logging" is still a factual claim. | fix | "the ambient awareness of the system **warning, correcting, intervening** — is gone." |
| DS-15 | R3 | layer--3.html:131 (The Wilderness) | "Outside it is the layer exactly as the doctrine specifies it: no monitoring, no drones, no restoration, no institution of any kind…" | Attributes "no monitoring" to doctrine. | Beside "drones" and "patrolled", it can mean daily enforcement. Partly holds, but "as the doctrine specifies" makes it a doctrine claim. | fix | "…as the doctrine specifies it: **no patrols**, no drones, no restoration, …" |
| DS-16 | R3 | documents/academy-source.html:596 (Q6, B-grade pitch) | "They frame -3 as the layer where the government actually leaves you alone — no surveillance, no behavioral scoring, no institutional interference" | A praised answer says −3 has no behavioral scoring, and the rubric never corrects it. The A-grade line at :597 ("immortality in exchange for behavioral monitoring") leans the same way. | Q6 grades persuasion, not accuracy ("This isn't a doctrine question"). Partly holds, but Academy answers are teaching text. | fix | "…leaves you alone — **no patrols, no daily enforcement**, no institutional interference, …" |
| DS-17 | R4b | layer-0.html:61 (Population) | "and recovery ascenders building toward Sanctuary from lower layers." | Reads as residents climbing back out of punitive layers. | Could mean children relocated to Main under Art. VIII, or Main residents recovering low scores. The text does not say which. | fix — ruled: relocated-children reading | Applied: "and lower-layer-born children who relocated under Article VIII, building toward Sanctuary." |
| DS-18 | R4b | why-vmss.html:258 | "Some lower-layer residents will rationally optimize for local dominance rather than upward ascent." … "It provides the upward pathway." | Offers lower-layer residents an upward pathway; punitive residents have none. | True only of elective residents and children, but the paragraph addresses lower-layer populations as a whole ("Fatalism in the lower layers"). | fix | "…for local dominance rather than **trust-built standing**. They will build lives, accumulate influence, and choose **that life** — not because they cannot improve…" and "It provides **the path to standing**." |
| DS-19 | R4b | sads.html:273 (Cross-Layer Mentor Network) | "A volunteer mentor MGD admitting Main Layer residents who consistently work with -1 residents on the long climb upward." | Describes an upward climb out of a punitive layer. | "Upward" could mean local standing, which the gating metric at :272 ("pursuing STI recovery") supports. But "upward" is the site's word for moving between rings. | fix | "…work with -1 residents on the long climb **to local standing**." |
| DS-20 | R4b | documents/resources-source.html:2413 | "The lower layers would continue to produce residents who cleared the STI threshold" | The plural implies punitive-layer residents reach Sanctuary eligibility. | "Lower" may be relative to Sanctuary (meaning Main), and the next sentence is about Main. Mostly holds; flagged for the plural. | fix | "**Main** would continue to produce residents who cleared the STI threshold," |
| DS-21 | R4b | documents/resources-source.html:2651 (The Monetary Silo) | "A resident whose conduct warrants upward movement carries their citizenship upward but not their accumulated lower-layer currency" | Follows a −3 example and says conduct in a lower layer can warrant moving up. | Could mean Main→Sanctuary phasing, but that involves no lower-layer currency. The only legitimate upward movers holding lower-layer currency are returning elective residents and relocating children. | fix | "A resident **who returns upward from elective residency** carries their citizenship upward but not their accumulated lower-layer currency" |
| DS-22 | R4d/R4f | documents/resources-source.html:2221 (The Lower Restrictions Layer) | "…upper-layer hiring that brings -2 specialists to Main Layer work under elective-residency arrangements" | Elective residency runs downward only. "-2 specialists" moving up under it is an upward move. | Could mean Main-origin elective residents going home, which is allowed. But going home ends an elective residency; it does not use one. | fix | "…or, **for upper-layer elective residents**, through the occasional reputation-driven network of upper-layer hiring that **draws them back** to Main Layer work)" |
| DS-23 | R4f | faq.html:875 | "A Main Layer citizen visiting Sanctuary will notice the difference in social texture. They will not be unable to navigate it." | An upward visit, which Art. VII bars. This is the known example. | None; stated plainly. | fix | "A Main Layer citizen **who phases up to** Sanctuary will notice the difference in social texture." (second sentence unchanged) |
| DS-24 | R4f | layer-0.html:112 (The Explorer, Darius Okafor, v9.0) | "He applies for a cross-layer research placement in his sixth year. … The placement is approved. Four months in +1 Sanctuary…" | A Main citizen at STI 76 spends four months in Sanctuary on an approved placement. No upward visits exist, and he is not eligible. DS-42 cites this "mechanism". | Eligibility is the only way in, and the story keeps him below 85. Fails. This is a dossier vignette with a Doctrine Snapshot, so Jason may prefer to route it to the 25.0 dossier prose-lift as a story ruling. The edit covers three sentences. | story-ruling (routed to 25.0) | — |
| DS-25 | R4f | documents/resources-source.html:1375 (interstellar federation resource) | "Main Layer citizens on Axis routinely take multi-day trips to Ember for recreation" | Ember is the future Sanctuary (+1), per :1331, so this is an upward visit. | Far-future text, but :1373 says the framework "operates at interstellar scale exactly as it operated at continental scale." | fix | "…routinely take multi-day trips to **Lumen** for recreation…" |
| DS-26 | R4f | documents/resources-source.html:2445 (Life in Main Layer) | "The fluid border with Sanctuary allows Main residents continuous visitation rights and receives Sanctuary residents continuously" | Gives Main residents visitation rights into Sanctuary. | "Fluid border" is canon (the upper pair); "visitation rights" is not. | fix | "The fluid border with Sanctuary **lets eligible Main residents phase up at any time** and receives Sanctuary residents continuously…" |
| DS-27 | R4f | documents/resources-source.html:2453 | "A -1 resident visiting for business … A -3 visitor briefly passing through on authorized travel encounters districts…" | −1 and −3 residents visiting Main. Both are barred, and Art. X makes exit from −3 impossible. The closing clause says "residents from every layer experience the Main districts". | None; presented as routine. | fix | "A **Main elective resident home from -1 on business** typically visits…"; "A **child relocating from -3 under Article VIII** encounters districts…"; closing clause "and **everyone who reaches Main experiences** the districts that their own credential profile gives them access to." |
| DS-28 | R4f | documents/resources-source.html:2726 (Autoparenting) | "and lower-layer parents can visit upper layers under specific conditions, so the separation is not absolute." | Punitive residents hold no upward visitation rights. The Charter, Laws and Whitepaper contain no carve-out for parents (checked). | "Specific conditions" gestures at an exception, but none exists. | fix | "and **the child can visit the parents' layer under standard downward visitation**, so the separation is not absolute." |

### 2b. `story-ruling` — `simulations.html` cards (16)

Each card is era-pinned to its Doctrine Snapshot. Only non-numeric Charter conflicts are listed. No replacement text is proposed; the 24.4/24.5 sessions apply the rulings.

| ID | Rule | File:line · card · snapshot | Quote (≤25 words) | Conflict | Steelman | Disposition | Proposed replacement |
|---|---|---|---|---|---|---|---|
| DS-29 | R1 | :465 · The Underground Research Cell · v10.4.1 | "a series of STI violations — contract fraud, systematic deception… — had pushed his score into -1 territory" | Maps a score band to a ring ("-1 territory"), with STI violations driving his descent. | Backstory. Line 477 lists the STI violations and the conviction separately, but that does not cure "score into -1 territory". | story-ruling | — |
| DS-30 | R1 | :1850 · The Deathless Gold Rush · v17.4 | "A Main Layer citizen whose STI drops by a few points from -3 public disapproval is nowhere near the threshold for layer reassignment." | Implies an STI threshold for reassignment exists; there is none. | The point, that the STI hit is toothless, is right. Only the framing is wrong. | story-ruling | — |
| DS-31 | R1 | :2393 · Steve Jobs · v8.0 | "His STI sits in the low-to-mid 50s … high enough to remain in Main Layer, not high enough to qualify for ascension." | Implies a score floor for staying in Main. | None. | story-ruling | — |
| DS-32 | R1 | :2590, :2596 · Kanye West · v9.0 | "He qualifies for Main Layer residency renewal…" / "one point below the Main band's 70 floor — the score still sits in -1 territory" | Gives Main a score band with a floor, and calls 69 "-1 territory". | The sentence ends by crediting Art. XIII ("the metric signals; it does not decide") but still asserts the band. | story-ruling | — |
| DS-33 | R1 | :2616 · Mike Tyson · v9.0 | "He is placed in Main Layer — not because the score justifies it straightforwardly, but because the multi-factor evaluation…" | Implies a score of 52 would otherwise justify a lower placement. | Multi-factor intake is canon; the idea that the score "justifies" placement is not. | story-ruling | — |
| DS-34 | R2 | :733 · Earth Introduction · v14.1 | "Sanctuary receives its first residents in Year Three — citizens who maintained STI above 85 for sustained periods" | A sustain window before the first entries. | A founding-era timeline can be explained by time needed to build a score. "…for sustained periods … the phasing mechanism requires" still states a window. (The Art. VII echo at :722 is DS-52.) | story-ruling | — |
| DS-35 | R2 | :2555 · Keanu Reeves · v9.0 | "The Meritboard review for ascension eligibility opens at month five without him initiating it." | An invented review gate on ascension; eligibility is automatic at 85. | None. Art. XXII gives the Meritboard no such role. | story-ruling | — |
| DS-36 | R2 | :2590, :2593 · Kanye West · v9.0 | "The Meritboard review for ascension eligibility opens provisionally at month ten." / "The ascension eligibility review is suspended." | The same review gate, opened at STI 71. | None. | story-ruling | — |
| DS-37 | R2 | :2651 · Jordan Belfort · v9.0 | "His STI climbs to 68 by month seven. The ascension eligibility review opens at month nine. He files the application." | A review and an application gate, at 68. | None. | story-ruling | — |
| DS-38 | R2 | :2689 · Kurt Cobain · v9.0 | "the 85 Sanctuary phasing floor, which the formula grants on sustained record and cannot be applied for. What can be filed is a phasing-track consultation." | "Grants on sustained record" implies a window. The "consultation" and the "Meritboard review team" echo DS-35. | "Cannot be applied for" is correct. | story-ruling | — |
| DS-39 | R2 | :3164, :3173 · Kai Lindström · v15.8 | "…recognizes sustained competitive excellence as a measurable metric worthy of Sanctuary residency." | The Key Lesson reads as a gaming metric earning Sanctuary residency without STI ≥ 85. | SADs sit inside Sanctuary (Art. IX), so Kai may already be eligible; the card never gives his STI. Partly holds; the Key Lesson wording is the problem. | story-ruling | — |
| DS-40 | R3 | :3570 · The Ripperdoc Split · v16.5 | "The -3 operator does not refuse, because there is no implant ledger flagging anything in -3" | Says −3 has no ledger. | Could mean nobody in −3 is obliged to act on trajectory flags. The wording still denies the ledger. | story-ruling | — |
| DS-41 | R4b/R4e | :3573 · The Ripperdoc Split · v16.5 | "The -3 operator could ascend to -1 if he had ever been an -1 resident and could be trusted to refuse the jobs" | An upward move out of −3 conditioned on trustworthiness. Art. X makes −3 exit impossible, and −3 VPR seals the ceiling. | A −1-origin elective resident could return, but that right does not depend on being "trusted". | story-ruling | — |
| DS-42 | R4f | :2692 · Kurt Cobain · v9.0 | "he has moved to Sanctuary on a research residency permit — the same mechanism Darius Okafor used, a cross-layer placement rather than permanent ascension." | Upward residency at STI 81 through an invented permit. Cites DS-24. | None. | story-ruling | — |
| DS-43 | R4f + R2 | :2820 · Maren Solvik · v15.6 (pilot piece) | "commuting from Main Layer twice a week because she has declined three invitations to apply for +1 residency." | An upward commute, plus an invitation and application gate. | None. The pilot draft (`docs-review/prose-lift-pilot.md`, Rulings 4–5) already reverses both. | story-ruling | — |
| DS-44 | R5 | :615 · The Saurian Park · v16.5 | "paid in upper-layer currency, which the operator converted back into -3 holdings at a rate that compensated him" | A −3 operator converts upper-layer currency at his own rate. Downward conversion runs only through authorized channels, at central-bank settlement rates. | The direction is downward, not the prohibited upward case, and it could be shorthand for visitors converting at the boundary. | story-ruling | — |

**Clusters for one ruling each:**
- DS-31–DS-33, DS-35–DS-38 and DS-42 share two invented mechanics: a score band with a floor for staying in Main, and a Meritboard "ascension eligibility review" with applications. The affected cards are The Full Spectrum (v9.0: Keanu Reeves, Kanye West, Mike Tyson, Jordan Belfort, Kurt Cobain) and Steve Jobs (v8.0).
- DS-24 and DS-42 share the "research residency" mechanism. Ruling DS-24 fixes the source that the story cites.

### 2c. `record` — dated records (0)

The dated-record pages (`path-2-*` ×5, `pending-ratification`, `pending-ratify-tax-50-*` ×7, `rate-history`, `deregistered-statutes`) were read in full and produced no candidates. Their only contact with the rules is correct restatement, e.g. `pending-ratify-tax-50-ballot.html:171` and `pending-ratify-tax-50-record.html:171`, which cite the no-upward-conversion rule.

### 2d. `no-action` — considered and cleared (25)

| ID | Rule | File:line | Quote (≤25 words) | Conflict | Steelman | Disposition | Proposed replacement |
|---|---|---|---|---|---|---|---|
| DS-45 | R1 | whitepaper.html:442; laws.html:1709 (second clause); simulations.html:129 (Trust Console) | "New entrants typically arrive in the 70–84 STI range." | Could read as a score band mapped to Main. | Describes where arrivals usually score, not a band that defines a ring. §4.2 in the same paragraph puts a 15 and a 95 in the same Main district. Holds. | no-action | — |
| DS-46 | R1 | layer--1.html:113 (Rafael Souza, v9.0) | "His STI dropped from 68 to 41 in a single logged event. Layer reassignment to -1 followed within hours." | The sequence suggests the STI drop caused the reassignment. | The previous sentence names the fraud as the act that crossed the threshold; both are effects of it. Holds. | no-action | — |
| DS-47 | R1 | layer--1.html:66, :99 | "STI indicators are predominantly orange and red across the population" | Close to a band-to-ring correlation. | Describes a population's scores, not placement by score. Holds. | no-action | — |
| DS-48 | R1 | simulations.html:767 · Earth Introduction (Alternative) · v16.0 | "His criminal history, his STI-equivalent behavioral record, and his demonstrated patterns determine placement" | Lists an STI-equivalent record as a placement input. | Multi-factor intake with STI as one signal, which Art. XIII permits; FAQ :219 says "available behavioral data". Holds. | no-action | — |
| DS-49 | R1 | simulations.html:1098 (also :1090) · The Surface Reader · v16.2 | "A -1 petition seeks to reduce the STI threshold for -1 reassignment from 70 to 60." | An STI threshold for reassignment. | The card quotes a flawed guest draft and refutes it in the next sentence (:1099). Holds. | no-action | — |
| DS-50 | R1 | systems.html:350; whitepaper.html:954, :2046 | "full STI financial misconduct flag, complete asset liquidation, and -1 reassignment for both parents" | An STI flag listed alongside reassignment. | Restates Charter XXVII. These are parallel consequences of the sixth-child breach. Holds. | no-action | — |
| DS-51 | R1 | systems.html:367 | "every citizen can read the conduct standard they are held to, their own score and placement" | "Score and placement" read together. | Two separate transparency items. Holds. | no-action | — |
| DS-52 | R2 | faq.html:219, :767, :876; index.html:307; join.html:58; layers.html:142; layer-0.html:54; layer-+1.html:51; sads.html:68; world.html:1190; whitepaper.html:556, :1133, :1927; simulations.html:722 | e.g. layers.html:142 "residents who sustain high compliance ascend to Sanctuary" | "Sustained compliance/conduct" could imply a window. | Echoes Art. VII ("Upward movement is earned through sustained compliance and demonstrated behavioral trajectory") and describes how the score is earned. Holds. | no-action | — |
| DS-53 | R2 | whitepaper.html:1957 (glossary) | "phases back to Main Layer and must re-earn ascension." | Could imply re-vetting after a phase-back. | Charter VII wording verbatim; re-earning means reaching 85 again. Holds. | no-action | — |
| DS-54 | R2 | layer-+1.html:92, :125; simulations.html:597, :2887; documents/academy-source.html:565, :566, :568 | e.g. :2887 "His STI had held above 90 for nine consecutive years" | Durations next to Sanctuary entry. | Biography or time to build a score. None says the time was required, and moving in is voluntary. Holds. | no-action | — |
| DS-55 | R2 | law-polling.html:2040 (LP-058, failed) | "millions of Main Layer residents holding sustained scores within two points of the 85-point eligibility floor" | "Sustained" next to the floor. | Describes a population below 85, in a failed entry. Holds. | no-action | — |
| DS-56 | R2 | technologies.html:421 | "High STI unlocks better jobs, partnerships, and Heaven access." | Loose. | Correct: 85 opens Sanctuary, and :429 states it precisely. Holds. | no-action | — |
| DS-57 | R2 | documents/resources-source.html:1718 | "passes through a Main-to-Sanctuary shaft only if their STI meets the phasing threshold and no active restrictions apply." | "Restrictions" could be an extra gate. | An eligible citizen moving up is canon; "active restrictions" fits punitive or federal holds. Holds. | no-action | — |
| DS-58 | R3 | world.html:699 | "The backup vessel link is severed, the implant may be disabled or removed, and VMSS has withdrawn institutional oversight." | Could read as the ledger being withdrawn. | "Institutional oversight" means daily governance, which canon does withdraw; the implant clause is about individuals. Holds. | no-action | — |
| DS-59 | R3 | simulations.html:3838 · Where the Maps End · v20.5 (pilot piece) | "beyond the patrol contracts, beyond the reputation ledgers, beyond the reach (though never the letter) of the federal floor." | "Beyond the reputation ledgers" in −3. | These are the districts' private reputation ledgers, not the public ledger. Holds. | no-action | — |
| DS-60 | R4b | simulations.html:1271–1304 (The Recovery Gradient, v16.2), :1227, :1241 (The Elected Ring, v16.2); world.html:669; whitepaper.html:1469; law-polling.html:611 (LP-057, failed); documents/academy-source.html:1670 (Q30) | e.g. world.html:669 "earn upward reassignment through STI-verified milestones" | Upward return from punitive layers. | Each is an allied-nation counterfactual, a failed amendment or a hypothetical petition, and each text states VMSS permanence alongside it. Holds. | no-action | — |
| DS-61 | R4b | layer--2.html:111 | "occasionally manifests as attempted upward breach, almost all of which fail." | Implies some breaches succeed. | An illegal wall breach, which Art. XXIII counts as leakage, not a lawful path. Holds. | no-action | — |
| DS-62 | R4c | law-polling.html:798 (LP-004.2, enacted) | "Death inside -3 is final for visitor and resident alike." | Visitors lose origin-layer revival in −3. | Vessel-link suspension at the −3 boundary is enacted canon (Charter IV hardware severance). Origin status and assets are retained. Holds. | no-action | — |
| DS-63 | R4f | law-polling.html:1976 (LP-055, failed) | "permanent Sanctuary exclusion (the objector could not reside in or visit +1)" | Implies +1 can ordinarily be visited. | A failed proposal. The objectors include Sanctuary residents and eligible citizens, for whom entry is open. Holds. | no-action | — |
| DS-64 | R4f | documents/resources-source.html:2489 | "Sanctuary is a destination some residents reach and some residents pass through and some residents visit without settling." | "Visit" Sanctuary. | Sanctuary-credentialed Main residents (~1B, `layer-0.html:61`) keep Sanctuary standing and may enter without settling. Holds under the R4 assumption in §1. | no-action | — |
| DS-65 | R4f | documents/resources-source.html:2650 | "the two upper layers are functionally one monetary zone because the populations freely traverse between them" | Open movement in both directions. | This is the rationale for the shared currency. Phasing up and down, Sanctuary visits to Main, and credentialed residents are real two-way flows. Holds. | no-action | — |
| DS-66 | R4f | sads.html:301 | "operates simultaneously in Main Layer and -1, admitting members from both rings on the same metric." | Cross-layer membership. | Membership, not movement; each chapter sits in its own ring. Holds. | no-action | — |
| DS-67 | R5 | simulations.html:1527 · The Common Coin · v16.3 | "a single currency operates across all five layers" | A unified currency. | This is the counterfactual under test, and the card's verdict restates siloing. Holds. | no-action | — |
| DS-68 | R5 | documents/resources-source.html:1387 | "A Lumen firm selling mineral output to an Axis purchaser receives Main Layer currency at the negotiated exchange rate" | A lower-layer firm receives Main currency. | No lower-layer currency converts upward, and the Main leg "is retired into the Axis economy on settlement". Ambiguous, but not a conversion. Holds. | no-action | — |
| DS-69 | R5 | world.html:728 | "external wealth is converted to VMSS currency at assessed value" | Generic "VMSS currency". | A foreign-to-domestic conversion at immigration, not between layers. Holds. | no-action | — |

---

## 3. Open tensions (reported, not resolved)

### T1 — Art. I (single DUI, assault or meaningful fraud → −1) vs Art. XIV (single-axis → corrective)

**Pages taking Art. I's side (a single act is enough for −1):**
- `charter.html:166`: Art. I itself ("driving under the influence, assault, fraud at meaningful scale")
- `whitepaper.html:573` (§6.3): "a single qualifying event … driving under the influence, assault, meaningful fraud"
- `systems.html:444`; `layer--1.html:56`; `faq.html:381–382` ("A DUI is a different category entirely"; "The first is a single qualifying event")
- `layer--1.html:113`: Rafael Souza, whose single contractual fraud leads to −1
- `documents/academy-source.html:895`, `:897`; `documents/resources-source.html:2118`, `:2120`
- `simulations.html:200`: Trust Console, "the console follows Article I and The Threshold, even where Article XIV's axes read only one"
- `simulations.html:353`, `:356`, `:363`: The Threshold (v10.6), "This is a single qualifying event."
- `simulations.html:2625`: Mike Tyson (v9.0), a single altercation leads to −1
- `simulations.html:724`: Earth Introduction (v14.1), where −1 intake means "records equivalent to DUI, fraud…"
- `simulations.html:1272`: The Recovery Gradient (v16.2), "a DUI at age thirty determines your civilizational environment"
- `simulations.html:1770`: The Human Bench (v16.3), where one strike "technically meets the threshold for -1 reassignment"

**Pages taking Art. XIV's side (a single isolated, reversible act is corrective):**
- `charter.html:300`: Art. XIV itself ("A single-axis violation — severe but isolated and reversible — warrants corrective intervention, not reassignment.")
- `whitepaper.html:565` (§6.1); `whitepaper.html:568` (§6.2: "a single act of fraud that was repaid, a single altercation that did not produce lasting harm … are clearable"); `whitepaper.html:1981` (glossary)
- `layer--1.html:90`: the bar fight ("one axis, corrective intervention, STI hit")
- `simulations.html:898` (The Proxy Network, v14.7), `:926` (The Balanced Layer, v14.7: "a minor assault … A one-axis event … the consequence is corrective"), `:990` (The Exile's Calculation, v14.7: a fistfight costs only STI)
- `simulations.html:2648`: Jordan Belfort (v9.0). Weak: this concerns Earth-history fraud.

Two pages take both sides internally: the Whitepaper (§6.1/§6.2 against §6.3) and the −1 dossier (:56 against :90).

### T2 — −1 dossier: "a single act of violence moves toward −2" vs its own one-axis bar fight

**A −1 resident's single violent act leads to −2:**
- `layer--1.html:86`: "a single act of violence in this layer moves a resident toward -2 directly"
- `laws.html:1889` (The Enforcement Chain, Founding Corpus): "a -1 assault to -2 or to -3 if escalation warrants"

**A −1 resident's single violent act is corrective:**
- `layer--1.html:90`: "A bar fight: moderate severity, isolated, reversible — one axis, corrective intervention, STI hit."
- `simulations.html:926`: The Balanced Layer (v14.7). Asha, a −1 resident, commits a minor assault (spitting): "A one-axis event … the consequence is corrective".

**Adjacent passages (a single act from Main straight to −2 through a three-axis read, not the −1 question):** `simulations.html:1688` (The Compressed Ring, v16.4: a single jaw-breaking punch leads to −1, consecutive blows to −2); `:2271` (Donald Trump, pre-v5.0); `:3541` (The Cyberpsycho Trajectory, v16.5); `:3723` (The Sealed Notation, v20.5); `:3858` (The Line That Held, v20.5); `documents/resources-source.html:2174` ("A single qualifying act of this severity produces direct -2 assignment").

### T3 — Homepage Justice Flow puts "STI Impact" before the fork

**STI impact placed upstream of the fork:**
- `index.html:202–205`: "Stage 5 · STI Impact — Social Trust Index adjusts according to severity, pattern, and context." It comes before "Outcome Branches" (`:209–211`), which then split into the Social Consequence Path (`:215–242`) and the Criminal Escalation Path (`:244–281`).

**Continuum framing, in which STI territory comes first and the criminal pipeline after (leans the same way):**
- `whitepaper.html:511` (§5.4: "STI handles everything below that line"); `whitepaper.html:561` (§6 intro: "when conduct crosses from STI territory into consequence territory")
- `technologies.html:456`: "Conduct that crosses out of STI territory enters the standard consequence pipeline"

**Fork first, with the two tracks parallel:**
- `simulations.html:134–159` (Trust Console): Detection, then Classification by severity, pattern and reversibility, then the fork into "Track 1 · the STI score" and "Track 2 · the criminal record log".
- `whitepaper.html:521` (§5.5): "operate independently on the same implant ledger"; `charter.html:168` (Art. II: "No crossover") by implication.

---

## 4. Counts

**Per rule:**

| Rule | fix | story-ruling | record | no-action | Total |
|---|---|---|---|---|---|
| R1 | 2 | 5 | 0 | 7 | 14 |
| R2 | 8 | 6 | 0 | 6 | 20 |
| R3 | 6 | 1 | 0 | 2 | 9 |
| R4 (a–f) | 12 | 3 | 0 | 7 | 22 |
| R5 | 0 | 1 | 0 | 3 | 4 |
| **Total** | **28** | **16** | **0** | **25** | **69** |

R4 breakdown for fixes: R4b 5, R4d 1, R4f 6. DS-43 counts under R4f; it also carries R2.

**Per disposition:** fix 28 · story-ruling 16 · record 0 · no-action 25.

**Fix findings by file:** documents/resources-source.html 8 · documents/academy-source.html 4 · layer--3.html 4 · whitepaper.html 4 · layer-0.html 3 · charter.html 1 · laws.html 1 · faq.html 1 · why-vmss.html 1 · sads.html 1. (DS-27 counts once but carries three edits; DS-18 carries two.)

---

## 5. Guard-adjacent flags

**Result: no proposed fix touches text guarded by `tools/check-canon.mjs`.**

**Method:** Every string literal and regex literal was extracted from `tools/check-canon.mjs`, and also from `tools/canon.json`, `tools/test-code-founding-guards.mjs` and `tools/test-canon-guard-mutations.mjs`. Each literal was tested against every fix line before and after its replacement, in both raw and tag-stripped form. The guard sources were also searched for any 24-character window of each edited span. The only matches were generic ones (the whitespace, tag and entity regexes, and single words such as "residents", "threshold" and "civilizational"). They match equally before and after, so no guard changes state. All 31 edit spans (28 findings; DS-27 has three spans, DS-18 two) were found byte-exact at the cited lines.

**Pages the guard reads for other reasons.** The apply session must still run the suites on these:
- **charter.html (DS-01):** the charter-purity, negative-magnitude count and TOC-census checks read this page. None of them touches Art. XXII's closing sentence.
- **laws.html (DS-05):** the founding-entry checks read this page. `code-fc-social-trust-measurement` is a Founding Corpus entry, so run `tools/test-code-founding-guards.mjs` as the code-guard suite, per CLAUDE.md. Keep the `8&ndash;12` entities byte-for-byte.
- **documents/academy-source.html, documents/resources-source.html:** the guard reads only count strings ("N stamped simulations", "Question N", "Resource N"), and the edits leave them untouched.
- **Tax-cascade surfaces** (faq, why-vmss, layer--1, layer--3, laws, whitepaper, academy, resources, simulations): the guard scans these for rate strings. No edit touches rate text.
- **whitepaper.html:440** uses a literal en dash in "8–12". Keep it.

No fix changes a Tailwind class, so `npm run build:css` parity and `check-css-cascade` are unaffected.

---

## 6. Out of scope, found in passing (not counted)

Rendered doctrine strings in JavaScript are outside the `.html` scope, but they display on in-scope pages and bear on R2 and R3:

- **`assets/js/diagrams.js:118`** (Ring Atlas on `layers.html`, the Ascension move): "a sustained STI above 85 is one factor, typically after 8 to 12 years of conduct." This is the same R2 conflict as DS-03 and DS-04, and the string cites "WP §4.2, §5.2". If those whitepaper lines change, this string should follow. `diagrams.js:47` ("Ascension from Main on a sustained record") matches the DS-52 echo class.
- **`assets/js/sti-sim.js:228`** (Trust Console detection line for −3): "No AI monitoring or drone patrol. The implant ledger still records…". The same string corrects itself, but it keeps the "no AI monitoring" wording that DS-11 to DS-13 replace.
- **`assets/js/diagrams.js:76`** (the −1 "ways out"): "Further reassignment: violence toward −2". This takes the T2 side of `layer--1.html:86`.
- The Trust Console's eligibility logic (`sti-sim.js:181–202`, `:670`) implements R2 correctly (≥ 85, immediate, including after a phase-back, voluntary move). The comment at `:651` ("sustained-85 clock") is stale but is never rendered.
