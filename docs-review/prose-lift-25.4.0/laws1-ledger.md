# Prose lift 25.4.0, patch laws1: laws.html from the page top to the Central Banking Authority (strict mode)

This is a strict, clarity-only pass on `laws.html`, the consolidated Code. It was made against main at 31cbc56 (v25.3.2). The range runs from `<main id="main-content"` up to, but not including, `<article class="code-entry" id="code-fc-dividend-sourcing-interlayer-levy"`. That covers the intro card, the Tier 1 index, all of Tier 2's register-derived entries (LP-064 through LP-079), the Founding Corpus intro and the first three founding entries (Trajectory Doctrine, Settlement-Layer Collection Act, Central Banking Authority). The edits are in the copy in this folder. The live `laws.html` is untouched and still equals `git show HEAD:laws.html`.

**Range check.** Everything before `<main id="main-content"` (14,563 bytes: head, styles, scripts, skip link, navbar placeholder) is byte-identical to HEAD. Everything from the `code-fc-dividend-sourcing-interlayer-levy` article marker to the end of the file (156,875 bytes) is byte-identical to HEAD; that is the next patch. The generated ToC block, every `law-meta-grid` (the meta rows), every heading, badge, chip and label are byte-identical. Inside the range only the 15 `<p>` elements listed below changed. `laws1-verify.mjs` asserts all of this.

Markers (checked by `laws1-verify.mjs`):
- Text inside ⟦⟧ is the before text, as raw source. It must appear in the original and must not appear in the copy.
- Text inside ⟪⟫ is the after text, as raw source. It must appear in the copy.
- Text inside «» is a claims-ledger quote, as rendered text. It must appear in the copy and be 15 words or fewer.

**Frozen strings checked before editing.** Every guard in `tools/check-canon.mjs` and `tools/test-canon-guard-mutations.mjs` that reads `laws.html` was read. The literal pins sit outside the edited elements: the conflicts clause (line 306), the LP-074/073/075 authority assertions (line 726), the exact cascade (lines 720–725 and 758), the relocated magnitudes pinned per receiving entry (LP-064 line 740, LP-069 line 879, LP-070 line 899, LP-076 line 917, Central Banking lines 1558–1559), the `90-day rolling average` probe (line 899), and the attribute, ToC, `code-index-title`, `data-r22` and `law-vote` probes. The page-wide guards (stale rate, tier claim, superseded refusal, founder and reviewer seat, "five currencies", duplicate ids, in-page anchors, link integrity) also read this range. `laws1-verify.mjs` extracts every string literal from both tool files, and confirms each one found in `laws.html` occurs the same number of times in the copy. It then re-runs the regex guards against the copy. As a whole-suite check, `tools/check-canon.mjs` was also run on a scratch copy of the repo with this `laws.html` swapped in: 141 passed, 0 failed.

**What kind of edit this is.** All 16 edits are punctuation. Each turns a stacked em-dash pair into parentheses (14) or commas (2), keeping the words unchanged and in the same order. `laws1-verify.mjs` proves this: the word-token sequence of the whole page is identical to HEAD, and each changed line equals its original once dashes, parentheses, commas and whitespace are removed. No number, citation, defined term, rule modal, hedge, quotation, link, id, tag or heading changed. No sentence carrying "shall", "must" or "may" was touched.

**What was held as operative and left alone.** The ruling freezes statutory operative text and says to leave a sentence alone when it is unclear whether it is operative. Three classes were held on that basis, dash pairs included (see flags 1–3):
- The bold-labelled "received from Charter" parameter paragraphs of LP-064, LP-069, LP-070 and LP-076. These are the relocated provisions and carry the magnitudes check-canon pins.
- The founding-corpus entries in range. The band's own intro says each entry "states the current-force rule"; for these entries the summary is the codified rule.
- The "The Charter retains / fixes / continues to fix … and reaches no rate" tier-allocation sentences. They state the boundary the Enabling Consolidation Amendment drew. Most sit inside the paragraphs in the first class, so they were left as a set.

**Quoted elsewhere.** Before editing, a distinctive run of every edited sentence was searched for across all `*.html` files. No page quotes any edited sentence as Code text. Several Code summaries repeat the register's own wording with the same dash pair (law-polling.html: LP-021 at 1035, LP-034 at 1300, LP-063 at 2138, LP-078 at 2548–2549, LP-079 at 2581). The register keeps its dashes and the words still match (flag 6). whitepaper.html:629 already writes the LP-007.2 allocation in the parenthesized form used here, and law-polling.html:1507 already puts LP-041's recusal clause in parentheses.

## laws.html

### Changes (15 elements, 16 edits)

**C1. Intro card, "Scope." paragraph (line 323).** Habit: stacked em-dashes.
- Before: `⟦The chronological enactment record &mdash; including filings that failed, were superseded, or were rerouted to another tier &mdash; is <a⟧`
- After: `⟪The chronological enactment record (including filings that failed, were superseded, or were rerouted to another tier) is <a⟫`
- Reason: the aside is a 13-word list. With parentheses the subject "record" reads straight on to its verb "is".
- Unchanged: every word, "Tier 2", "only", "no in-world legal weight", both links.

**C2. Intro card, Governance Records paragraph (line 327).** Habit: stacked em-dashes.
- Before: `⟦The chronological register &mdash; every filing, tally, and outcome &mdash; is <a⟧`
- After: `⟪The chronological register (every filing, tally, and outcome) is <a⟫`
- Reason: the same fix as C1, in the same pattern.
- Unchanged: every word, "Path 2", "2294", all six links. This paragraph repeats two sentences of C1's paragraph (flag 5).

**C3. Tier 1 section sub (line 614).** Habit: stacked em-dashes around an appositive.
- Before: `⟦seven failed, and the eighth &mdash; the Enabling Consolidation Amendment &mdash; is the tier&rsquo;s only success.⟧`
- After: `⟪seven failed, and the eighth, the Enabling Consolidation Amendment, is the tier&rsquo;s only success.⟫`
- Reason: a name in apposition takes commas. The sentence's first dash-free clause and its semicolon are unchanged.
- Unchanged: "only" (twice), "Article XI", "70%", "7/10", "Eight", "seven", the gauntlet list and its single dash, "This is an index, not a restatement".

**C4. Taxation preamble, "Two documents are called the Charter" (line 727).** Habit: stacked em-dashes.
- Before: `⟦methodology instrument at federal tier &mdash; the certification methodology LP-074 fixed in advance &mdash; not the Charter of VMSS.⟧`
- After: `⟪methodology instrument at federal tier (the certification methodology LP-074 fixed in advance), not the Charter of VMSS.⟫`
- Reason: with the gloss in parentheses, "not the Charter of VMSS" attaches plainly to "is", and that contrast is the point of the paragraph.
- Unchanged: "LP-074" (twice), the quoted "the Charter.", "Whitepaper §12.1", "Path 2 Charter §12.1", "a bare §12.1 names neither". The R22 `data-r22="taxation-preamble"` block is otherwise byte-identical; its other dash pair (line 717) is held (flag 1).

**C5. LP-081, first summary (line 792).** Habit: stacked em-dashes, where the closing dash also served as the break between two clauses.
- Before: `⟦habitual residence at the child&rsquo;s birth &mdash; a child born in a curve-exempt layer does not enter the count, in that layer or retroactively in any other &mdash; and the layer-scaled UBI⟧`
- After: `⟪habitual residence at the child&rsquo;s birth (a child born in a curve-exempt layer does not enter the count, in that layer or retroactively in any other), and the layer-scaled UBI⟫`
- Reason: parentheses close the aside, and a comma before "and" marks the second rule (the UBI rate) as its own clause.
- Unchanged: "elective residents", "elective residency", "territorial", "curve-exempt", "retroactively", "Article XXVII", the closing rationale sentence.

**C6. LP-078, first summary (line 860).** Two edits. Habit: stacked em-dashes.
- C6a. Before: `⟦second prong &mdash; measurably degraded non-member access &mdash; is established⟧` After: `⟪second prong (measurably degraded non-member access) is established⟫`
- C6b. Before: `⟦computes a single boolean &mdash; above or not above 40% penetration &mdash; by privacy-preserving⟧` After: `⟪computes a single boolean (above or not above 40% penetration) by privacy-preserving⟫`
- Reason: each dash pair wraps a short gloss inside a long sentence. Parentheses keep "prong … is established" and "computes … by privacy-preserving aggregation" joined.
- Unchanged: "only after", "40%", "LP-043" (twice), "Metric Gated Domain Act", the four-part "no roster …" list.

**C7. LP-078, second summary (line 861).** Habit: stacked em-dashes.
- Before: `⟦any domain self-report duty &mdash; each would rebuild the enumeration the founding instrument forbids &mdash; and leaves⟧`
- After: `⟪any domain self-report duty (each would rebuild the enumeration the founding instrument forbids) and leaves⟫`
- Reason: the aside gives the reason for "declines"; parentheses keep "declines … and leaves" as one compound predicate.
- Unchanged: "nowhere else", "40%", "LP-043" (twice), "Social Trust Measurement Standard".

**C8. LP-045.2, first summary (line 1192).** Habit: stacked em-dashes.
- Before: `⟦Guarantees to every citizen &mdash; biological, AGI, ASI, cyborg, and any future substrate admitted under the personhood doctrine &mdash; a continuity⟧`
- After: `⟪Guarantees to every citizen (biological, AGI, ASI, cyborg, and any future substrate admitted under the personhood doctrine) a continuity⟫`
- Reason: the dash pair split the verb "Guarantees" from its object "a continuity infrastructure". Parentheses make the object easy to find.
- Unchanged: "every citizen", "any future substrate", "not to a uniform cadence", "Three substrate classes", "8-year".

**C9. LP-007.2 (line 1263).** Habit: stacked em-dashes.
- Before: `⟦Curved per-district allocation &mdash; Sanctuary, -1, -2 and -3 at one seat per district; Main at one seat per five districts &mdash; applies only⟧`
- After: `⟪Curved per-district allocation (Sanctuary, -1, -2 and -3 at one seat per district; Main at one seat per five districts) applies only⟫`
- Reason: parentheses join the subject to "applies only". whitepaper.html:629 states the same rule in this parenthesized form.
- Unchanged: "only", both seat ratios, "all other sub-rankings", "without geographic curvature".

**C10. LP-041, first summary (line 1298).** Habit: stacked em-dashes inside a comma list.
- Before: `⟦institutional interest &mdash; with mandatory recusal of any sub-panel member whose personal STI, role-continuity, or financial position is materially advantaged by ratification &mdash; filing class⟧`
- After: `⟪institutional interest (with mandatory recusal of any sub-panel member whose personal STI, role-continuity, or financial position is materially advantaged by ratification), filing class⟫`
- Reason: the dash pair sat inside a five-item comma list, so the list's third and fourth items ran together. Parentheses tie the recusal rule to the institutional-interest field and restore the list comma. law-polling.html:1507 already puts this clause in parentheses.
- Unchanged: the first sentence ("may originate", "must accompany") untouched, "Five fields", "mandatory" (twice), "any", "Tier I", "Tier II", "LP-039".

**C11. LP-021 (line 1351).** Habit: stacked em-dashes around a relative clause.
- Before: `⟦-3&rsquo;s customary Colosseum classification &mdash; under which informed gate-contract entry releases the operator from liability for fatalities within the perimeter &mdash; does not export⟧`
- After: `⟪-3&rsquo;s customary Colosseum classification, under which informed gate-contract entry releases the operator from liability for fatalities within the perimeter, does not export⟫`
- Reason: a non-restrictive "under which" clause takes commas.
- Unchanged: "does not export to upper layers", "Sanctuary, Main, -1, or -2", "remain prosecutable under standard harm provisions".

**C12. LP-063, first summary (line 1383).** Habit: stacked em-dashes.
- Before: `⟦Financial inducement &mdash; payment, debt forgiveness, inheritance acceleration, or beneficiary pressure offered to procure a refusal &mdash; is an economic-coercion⟧`
- After: `⟪Financial inducement (payment, debt forgiveness, inheritance acceleration, or beneficiary pressure offered to procure a refusal) is an economic-coercion⟫`
- Reason: parentheses keep the defined offense, "Financial inducement", joined to its classification.
- Unchanged: all four forms of inducement, "-1 reassignment", "-2 reassignment", "Article XIV three-axis framework", "belongs to the victim alone". The second summary, including its closer, is untouched (flag 7).

**C13. LP-080, first summary (line 1433).** Habit: stacked em-dashes, where the closing dash also served as the break between two clauses.
- Before: `⟦The one-bit flag is the sole trigger &mdash; no retrospective challenge, no third-party standing, no inference from circumstance &mdash; and an unflagged directive⟧`
- After: `⟪The one-bit flag is the sole trigger (no retrospective challenge, no third-party standing, no inference from circumstance), and an unflagged directive⟫`
- Reason: parentheses close the three exclusions, and the comma before "and" separates the second clause, which runs to a colon.
- Unchanged: "sole", all three "no" exclusions, "exactly", "Continuity Integrity Act", "never overrides choice", "LP-063".

**C14. LP-034 (line 1468).** Habit: stacked em-dashes.
- Before: `⟦Designates the civic educational floor &mdash; literacy, numeracy, civic-doctrine fluency, STI mechanics, Charter comprehension, substrate-equality orientation &mdash; as floor content⟧`
- After: `⟪Designates the civic educational floor (literacy, numeracy, civic-doctrine fluency, STI mechanics, Charter comprehension, substrate-equality orientation) as floor content⟫`
- Reason: parentheses keep "Designates … as floor content" together across the six-item list.
- Unchanged: all six floor items, "rather than graduated investment", "uniform across layers", "not structural modification".

**C15. LP-079, first summary (line 1501).** Habit: stacked em-dashes.
- Before: `⟦keeps its incidents &mdash; heirship, spousal property attribution, medical and incapacity consent, and the revival-identity strand the Continuity Integrity Act already carries federally &mdash; through elective residency⟧`
- After: `⟪keeps its incidents (heirship, spousal property attribution, medical and incapacity consent, and the revival-identity strand the Continuity Integrity Act already carries federally) through elective residency⟫`
- Reason: parentheses keep "keeps its incidents … through" together across the 20-word list of incidents.
- Unchanged: all four incidents, the four status routes ("elective residency, voluntary permanent residency, punitive reassignment, and visitation"), "only", "advisorily", "-3".

### Claims ledger

Every claim, number and citation in the 15 edited elements, with a quote from the copy showing it survives.

**C1 (Scope).**
- Current force only: «This Code states current force only.»
- What the register holds: «including filings that failed, were superseded, or were rerouted to another tier»
- Register identity: «is the Law Polling record, the enactment register»
- Process record: «Drafting history, certifications, and process records are the Ratification Record.»
- Tier 2 subject titles: «Within Tier 2, the subject titles are presentation grouping only»
- No legal weight: «carry no in-world legal weight»

**C2 (Governance Records).**
- Traceability: «Every provision on this page traces to an enactment»
- Register contents: «The chronological register (every filing, tally, and outcome) is the Law Polling record.»
- Process record: «process records live in the Ratification Record»
- Rate history: «The excavated rate trajectory is at rate history»
- Deregistered texts: «texts deregistered from the record survive verbatim at deregistered statutes»
- Methodology, 2294: «the Path 2 Charter and the 2294 certification record»

**C3 (Tier 1 sub).**
- Amendment route: «Amendable only through the full Article XI gauntlet»
- 70%, 7/10: «70% Meritboard filibuster floor, Supreme Court 7/10 majority»
- Remaining gates: «Sanctuary consensus with Main Layer supermajority, presidential veto»
- Eight filed, seven failed: «Eight Charter amendments have been filed; seven failed»
- The one success: «the eighth, the Enabling Consolidation Amendment, is the tier's only success»
- Index status: «This is an index, not a restatement»
- Where the text lives: «the enacted text lives on the Charter page»

**C4 (Two documents called the Charter).**
- The heading claim: «Two documents are called "the Charter."»
- Path 2 Charter's tier, LP-074: «The Path 2 Charter is an LP-074 methodology instrument at federal tier»
- Fixed in advance, not the Charter of VMSS: «(the certification methodology LP-074 fixed in advance), not the Charter of VMSS»
- §12.1 disambiguation: «"Whitepaper §12.1" and "Path 2 Charter §12.1" are different sections»
- Bare citation: «a bare §12.1 names neither»

**C5 (LP-081).**
- Territorial assignment: «Assigns the layer-scaled fiscal family to the territorial jurisdictional mode for elective residents»
- Article XXVII: «matching Article XXVII's own drafting»
- Keying rule: «key to the layer of the household's habitual residence at the child's birth»
- Curve-exempt births: «a child born in a curve-exempt layer does not enter the count»
- No retroactivity: «in that layer or retroactively in any other»
- UBI rate: «the layer-scaled UBI disburses at the residence layer's rate»
- Duration: «for the duration of the elective residency»
- Pairing rationale: «Entitlement and liability travel together»
- Anti-arbitrage purpose: «the arbitrage it exists to foreclose»

**C6 (LP-078, first summary).**
- LP-043 gap: «Supplies the measurement LP-043's conjunctive trigger could not lawfully obtain.»
- Blindness rule: «The blindness rule of the Metric Gated Domain Act remains the standing posture»
- Sequencing, "only after": «the penetration measurement runs only after LP-043's second prong»
- Second prong, established by audit: «(measurably degraded non-member access) is established through ordinary civic-floor audit»
- Scope of audit: «for a named service category and geography»
- One boolean, 40%: «computes a single boolean (above or not above 40% penetration)»
- Method: «by privacy-preserving aggregation across implant-held membership attestations»
- Data exclusions: «no roster, no per-domain count, no per-citizen datum, no retained intermediate value»
- Unimplanted members: «Unimplanted members are covered through the domain-side admission handshake»
- Envelope: «the secondary observation envelope already witnesses»

**C7 (LP-078, second summary).**
- Separation: «The computation runs inside the measurement apparatus, institutionally separate from consequence»
- Pattern source: «on the Social Trust Measurement Standard's pattern»
- Routing: «routes to the LP-043 review panel and nowhere else»
- Declined instruments: «The Act declines standing dashboards, periodic sweeps, and any domain self-report duty»
- Reason: «(each would rebuild the enumeration the founding instrument forbids)»
- 40% calibration: «leaves the 40% calibration to LP-043's own tier»

**C8 (LP-045.2, first summary).**
- Coverage: «Guarantees to every citizen (biological, AGI, ASI, cyborg, and any future substrate»
- Future substrates: «any future substrate admitted under the personhood doctrine»
- Calibration basis: «a continuity infrastructure calibrated to the substrate's actual decoherence and drift characteristics»
- Rejected basis: «not to a uniform cadence inherited from brain-pattern restoration»
- Three classes: «Three substrate classes at enactment: biological, weight-state substrates, and activation-pattern substrates»
- 8-year cycle: «its own 8-year calibration review cycle, and its own revival semantics»

**C9 (LP-007.2).**
- Curved seats, one per district: «Curved per-district allocation (Sanctuary, -1, -2 and -3 at one seat per district;»
- Main, one per five, "only": «Main at one seat per five districts) applies only to federal-administration sub-ranking seats»
- Which sub-ranking: «the sub-ranking that produces pool membership for executive and policy-implementation roles»
- Excluded rankings: «Civic-engagement rankings, doctrinal-leadership rankings, legal-interpretation rankings, and all other sub-rankings»
- Their composition: «retain pure conduct-based composition without geographic curvature»

**C10 (LP-041, first summary).**
- Origination, Article XXVIII: «Codifies who may originate a draft for federal or Article XXVIII consideration»
- Disclosure: «what disclosure must accompany any filing»
- Five fields, first three: «Five fields are mandatory at filing time: originating body, authorship character, institutional interest»
- Recusal: «(with mandatory recusal of any sub-panel member whose personal STI, role-continuity,»
- Recusal trigger, last two fields: «or financial position is materially advantaged by ratification), filing class, and auxiliary sources»
- Tier I/II, LP-039: «distinguishing Tier I analytical from Tier II operational status under LP-039»

**C11 (LP-021).**
- The -3 classification: «-3's customary Colosseum classification, under which informed gate-contract entry releases the operator»
- Liability scope, non-export: «from liability for fatalities within the perimeter, does not export to upper layers»
- Covered layers: «Operators in Sanctuary, Main, -1, or -2 attempting to claim Colosseum-equivalent immunity»
- Consequence: «remain prosecutable under standard harm provisions»

**C12 (LP-063, first summary).**
- Subject: «Codifies the consequence schedule for third-party interference with a victim's right to refuse revival.»
- Right holder: «The refusal right belongs to the victim alone»
- Characterization: «procuring a refusal is an attack on the continuity architecture's consent foundation»
- Inducement forms: «Financial inducement (payment, debt forgiveness, inheritance acceleration, or beneficiary pressure»
- -1 tier: «offered to procure a refusal) is an economic-coercion offense carrying -1 reassignment»
- -2 tier, Article XIV: «evaluated as violence-equivalent under the Article XIV three-axis framework and carry -2 reassignment»

**C13 (LP-080, first summary).**
- Actuator: «Wires the duress-signaling envelope to a single narrow actuator.»
- Trigger source: «carries a contemporaneous involuntary-state duress flag from the implant's own telemetry»
- Suspension: «is suspended from execution pending the citizen's re-affirmation free of the flagged condition»
- Re-affirmed: «re-affirmed, it is honored, logged, and irreversible with no penalty attached»
- Withdrawn, LP-063: «withdrawn, it is void, with the LP-063 prosecution proceeding on its own track»
- Sole trigger, exclusions: «The one-bit flag is the sole trigger (no retrospective challenge, no third-party standing,»
- Remaining exclusion: «no inference from circumstance), and an unflagged directive remains exactly as»
- Unflagged directives, closer: «the Continuity Integrity Act made it: the Act verifies authorship, never overrides choice»

**C14 (LP-034).**
- Floor items, first four: «Designates the civic educational floor (literacy, numeracy, civic-doctrine fluency, STI mechanics,»
- Floor items, last two, classification: «Charter comprehension, substrate-equality orientation) as floor content rather than graduated investment»
- Uniformity: «Floor content is uniform across layers»
- Above baseline: «above-baseline educational intensity remains graduated and layer-varied»
- Dual-key holding: «operates as calibration within existing floor architecture, not structural modification»

**C15 (LP-079, first summary).**
- Carry: «Carries a recognized marriage across every boundary the spouses' statuses lawfully span.»
- Validity: «A marriage validly formed under any layer's family-law regime keeps its incidents»
- Incidents: «(heirship, spousal property attribution, medical and incapacity consent,»
- Revival-identity strand: «the revival-identity strand the Continuity Integrity Act already carries federally)»
- Status routes: «through elective residency, voluntary permanent residency, punitive reassignment, and visitation»
- No federal regime: «the Act creates no federal marriage regime»
- Local custom: «displaces no cooperative territory's own family custom for marriages formed under it»
- The one bar, "only": «it bars only the evaporation of a recognized marriage at a gate»
- -3: «applies advisorily to private -3 institutions»

### Word counts

| Scope | Before | After |
|---|---|---|
| Rendered words in `<body>` | 21,728 | 21,728 |
| Rendered words in the patch range | 9,345 | 9,345 |
| Sentences in the range with two or more em-dashes | 36 | 20 |

Every edit is punctuation, so no element's word count moved: C1 57, C2 72, C3 70, C4 59, C5 94, C6 100, C7 58, C8 67, C9 54, C10 67, C11 46, C12 74, C13 99, C14 51, C15 107. Of the 20 multi-dash runs left, 15 are the sentences held under flags 1–4. The other 5 are places where the counter's tag-stripping runs frozen ToC or meta-row text into a neighbouring sentence (for example, the ToC tail runs into the Trajectory Doctrine's first sentence, which is held under flag 3).

### Flags

1. **Tier-allocation sentences held as a set.** Six sentences in range state what the Charter keeps after the Enabling Consolidation Amendment and each carries a dash pair: line 717 ("The Charter fixes the principle — … — and reaches no rate"), 740, 879, 899, 916 and 1559. Four sit inside received-parameter paragraphs (flag 2) and one inside a founding entry (flag 3). They were left together so the Code states the boundary in one form. If this class is later ruled commentary, all six take the same parentheses fix.
2. **Received-parameter paragraphs held as operative.** LP-064 (line 740), LP-069 (879), LP-070 (899) and LP-076 (917) carry the magnitudes relocated from the Charter "at identical values". These are the provisions themselves. The dash pairs at 899 ("reaches $100 billion — a population-average of $100,000 —") and 917 (two) are left, as are the other sentences in those paragraphs.
3. **Founding-corpus entries held as operative.** The Trajectory Doctrine (1525, two dash pairs), the Settlement-Layer Collection Act (1541) and the Central Banking Authority (1557, 1558, 1559) are left whole. The band's intro says each entry "states the current-force rule". The Trajectory Doctrine's "— never authored facts —" also mirrors the whitepaper sentence check-canon pins byte for byte, so changing the Code form would split the pair.
4. **Conflicts clause.** Line 306's dash pair is frozen by the check-canon pin and its mutation probe.
5. **Redundant intro paragraphs, not cut.** The "Scope." paragraph (323) and the Governance Records paragraph (327) both say that the chronological register is the Law Polling record, and that drafting history, certifications and process records are the Ratification Record. Cutting either pair would remove `<a>` elements, which strict mode freezes. A structural pass could merge them.
6. **Register divergence is punctuation only.** After this patch, the Code summaries for LP-021, LP-034, LP-063, LP-078 and LP-079 use parentheses or commas where their register entries (law-polling.html 1035, 1300, 2138, 2548–2549, 2581) keep dashes. The words match. The register belongs to a later canon patch.
7. **"Not X" constructions and closers that were considered and left, because each carries scope:**
   - LP-004.2: "an infrastructure-integrity rule, not a risk-transfer mandate".
   - LP-043: "federal floor integrity, not layer-rule override".
   - LP-044: "not a general-purpose authorization".
   - LP-038.2: "not to compel a sync". This limits the officer's call.
   - LP-005.2: "not because it states force".
   - LP-065: "An enforcement remedy, not a continuity subsidy".
   - LP-063's closer, "the act regulates the coercer, never the choice". It is broader than the sentence before it, because it also covers refusals that were procured.
   - LP-080's "the Act verifies authorship, never overrides choice".
   - LP-046.2's "— one extension, once". This sits inside a "may" clause.
   - LP-074's "a rule, not a rate change, and it changed no rate on passage". This repeats verbatim at law-polling.html:2442 and on the statute page.
8. **Observed, not resolved (possible doctrinal tensions).**
   - Line 319 says federal law "Applies across all five layers without exception". LP-079 (1501) and LP-080 (1434) apply "advisorily" to -3 private institutions and beyond the federal-floor interface. The Code's own framing (binding at the federal floor, advisory beyond it) seems to reconcile these, but the tier list states no such limit.
   - Line 321 gives districts as "one million residents", while LP-070 (899) says "approximately one million citizens". The hedge is on one surface only.
   Both are left unchanged.
