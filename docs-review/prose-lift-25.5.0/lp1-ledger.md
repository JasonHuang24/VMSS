# Prose lift 25.5.0, patch lp1: law-polling.html from the page top to LP-049 (strict mode)

This is a strict, clarity-only pass on `law-polling.html`, the enactment register. It was made against main at 7a89f44 (v25.4.1). The range runs from `<main id="main-content"` up to, but not including, `<article class="law-entry" id="lp-049">`. That covers the "What This Page Is" card, the entry counters, the filter bar, the generated ToC, all eight Charter amendments (LP-001, 046, 050, 052, 053, 057, 066, 076), and the Federal register from LP-002 through LP-048.3. The edits are in the copy in this folder. The live `law-polling.html` is untouched and still equals `git show HEAD:law-polling.html`.

**Range check.** Everything before `<main id="main-content"` (14,069 bytes: head, styles, scripts, skip link, navbar placeholder) is byte-identical to HEAD. Everything from the `id="lp-049"` opening tag to the end of the file (220,690 bytes) is byte-identical to `git show HEAD:law-polling.html`; that is the next patch. The generated ToC block, every `law-header` (LP number, entry title, status badge), every `law-meta-grid` (scope, filed and concluded dates, drafter, threshold, canon anchor), every vote table (tallies and outcomes), every Pillar marker, heading, chip, label, `<th>`, `<h4>` and counter are byte-identical. Inside the range only the 23 `<p>` elements listed below changed. `lp1-verify.mjs` asserts all of this.

Markers (checked by `lp1-verify.mjs`):
- Text inside ⟦⟧ is the before text, as raw source. It must appear in the original and must not appear in the copy.
- Text inside ⟪⟫ is the after text, as raw source. It must appear in the copy.
- Text inside «» is a claims-ledger quote, as rendered text. It must appear in the copy and be 15 words or fewer.

**Frozen strings checked before editing.** Every guard in `tools/check-canon.mjs` and `tools/test-canon-guard-mutations.mjs` that reads `law-polling.html` was read. None of the literal pins sits in an edited sentence. The register guards read the entry census, the status badges, the Pillar labels, the ToC links, the count line, the section-header ids, the LP-073/074/075 authority chain (all after the range), LP-076's title and its dual-track table rows (`Lower-Layer Aggregate`, `Presidential Disposition`, `0 no votes`, all untouched), the R16 apparatus ban, the "III.III now carries" ban, duplicate ids and in-page anchors. The page-wide text guards (exact cascade, stale active rate, superseded refusal outcome) also read this range. `lp1-verify.mjs` extracts every string literal from both tool files and confirms each one found in `law-polling.html` occurs the same number of times in the copy, then re-runs the regex guards against the copy. Of the 89 literals that occur on the page, one loses an occurrence: `boundary`, whose substring count drops from 32 to 31 because C7 cuts "hardware-absolute boundary". That literal is check-canon's `KNOWN_SECTIONS` key for `simulations.html` archive cards (line 52), and no guard reads it from `law-polling.html`. The script allows exactly that drift and fails on any other. As a whole-suite check, `git archive HEAD` was extracted to a scratch directory, the copy was swapped in as `law-polling.html`, and both suites were run there: `tools/check-canon.mjs` 141 passed, 0 failed (the same as the untouched scratch tree), and `tools/test-canon-guard-mutations.mjs` 98/98 guard families bit.

**What was treated as the record, and left alone.** The patch ruling freezes every proposal's operative text, vote tallies, outcomes, status labels, Pillar markers, dates and entry titles, and says to leave a sentence alone when it is unclear whether it is operative. On that basis the following were held whole:
- Every paragraph or sentence that states what a proposal would have done, or what an enacted law does. That covers the mechanism sentences of every failed proposal, and the rule text of every enacted entry, including all of LP-004.2's two-track rule, LP-005.2, LP-005.3, LP-007.2, LP-021, LP-022, LP-023, LP-029, LP-031, LP-032, LP-034, LP-035, LP-037, LP-038.2, LP-039, LP-040, LP-041, LP-043, LP-044, LP-045.2, LP-046.2's four procedures, LP-047.3 and LP-048.3, and LP-076's first paragraph (the instrument description).
- Every quotation (Court, Meritboard and dissent-coalition quotes in `<em>&ldquo;…&rdquo;</em>`), every tally, every `<td>`, every `meta-item` value.
- Thirteen sentences with two or more em-dashes that sit in that operative text (flag 1).

**What kind of edit this is.** 28 edits in 23 elements, all in rationale, vote narrative or commentary.
- 26 are punctuation only: a stacked em-dash pair becomes parentheses, with the words unchanged and in the same order. In 6 of them the closing dash also ended a clause, so a comma follows the closing parenthesis.
- 2 cut one aphorism closer each (C7, C18), a sentence that restated the point the sentence before it had just made.
`lp1-verify.mjs` proves the scope: the page's word-token sequence equals HEAD's with exactly those two sentences removed, and every other changed line equals its original once dashes, parentheses, commas and whitespace are removed. No number, tally, date, citation, defined term, rule modal, hedge, quotation, link, id, tag or heading changed. No edited sentence carries "shall" or "must". One edited sentence carries a descriptive "may" (C4, stream one: "may be subtly pressured"); that word and the clause around it are unchanged.

**Quoted elsewhere.** Before editing, a distinctive run of every edited sentence was searched for across all `*.html`, `*.json`, `*.mjs` and `*.js` files, and the two cut sentences also across `*.md`. Every run occurs only in `law-polling.html` (the cut sentences also appear in a stale worktree copy under `.claude/worktrees/`, which is not a published page). No Code summary in `laws.html` repeats any edited sentence; the register passages that `laws.html` does mirror in this range (LP-021 at line 1035, LP-034 at line 1300) were held.

## law-polling.html

### Changes (23 elements, 28 edits)

**C1. "What This Page Is" card, first paragraph (line 281).** Habit: stacked em-dashes.
- Before: `⟦Founding-corpus law &mdash; enacted whole with the Founding Treaty rather than through the ladders &mdash; carries no polling record;⟧`
- After: `⟪Founding-corpus law (enacted whole with the Founding Treaty rather than through the ladders) carries no polling record;⟫`
- Reason: the paragraph carried three em-dashes. The aside is a 12-word qualifier on the subject; parentheses let "law" run straight to "carries". The first sentence keeps its single dash.
- Unchanged: every word and its order, "Founding Treaty", "no polling record", the VMSS Laws link. This is the R23 register-intro cure sentence (flag 4).

**C2. LP-046, Meritboard filibuster note (line 505).** Habit: stacked em-dashes.
- Before: `⟦the proposal&rsquo;s structural premise &mdash; that institutional-tier tightening compensates for population-tier relaxation &mdash; confuses two distinct legitimacy stacks.⟧`
- After: `⟪the proposal&rsquo;s structural premise (that institutional-tier tightening compensates for population-tier relaxation) confuses two distinct legitimacy stacks.⟫`
- Reason: the pair holds an appositive stating the premise; the sentence's claim is "premise confuses two stacks", which now reads through.
- Unchanged: every word, "Meritboard", "published opinion", "coherence", both later sentences.

**C3. LP-050, fourth summary paragraph (line 520).** Habit: stacked em-dashes.
- Before: `⟦cleared the proposal to the Court at 71% &mdash; narrowly above the filibuster floor &mdash; but conditioned⟧`
- After: `⟪cleared the proposal to the Court at 71% (narrowly above the filibuster floor) but conditioned⟫`
- Reason: the gloss on the tally is parenthetical; the sentence's contrast is "cleared … but conditioned".
- Unchanged: 71%, "narrowly", "filibuster floor", the Meritboard quotation, LP-051, 2191, 2192.

**C4. LP-053, second summary paragraph (line 581).** Habit: stacked em-dashes (two pairs).
- Before: `⟦The first stream &mdash; autonomy-protective dissent &mdash; opposed the amendment⟧`
- After: `⟪The first stream (autonomy-protective dissent) opposed the amendment⟫`
- Before: `⟦The second stream &mdash; continuity-foundational dissent &mdash; opposed on grounds⟧`
- After: `⟪The second stream (continuity-foundational dissent) opposed on grounds⟫`
- Reason: each pair only names the stream. With four dashes gone, the paragraph keeps one (in its first sentence).
- Unchanged: 72%, 7/10, 81%, "approximately 2.4 million", "300-million-resident", "may be subtly pressured", Article IV, the quoted "service" and "commitment", both stream labels.

**C5. LP-057, second summary paragraph (line 612).** Habit: stacked em-dashes (two pairs).
- Before: `⟦had raised a century earlier &mdash; that permanence applied to 200&ndash;300-year lifespans converts a single qualifying act at age thirty into a three-century consequence &mdash; now reinforced⟧`
- After: `⟪had raised a century earlier (that permanence applied to 200&ndash;300-year lifespans converts a single qualifying act at age thirty into a three-century consequence), now reinforced⟫`
- Before: `⟦the opinion named the amendment&rsquo;s scope explicitly &mdash; it reaches the permanence of consequence, which sits adjacent to moral causality in the founding core &mdash; and returned it⟧`
- After: `⟪the opinion named the amendment&rsquo;s scope explicitly (it reaches the permanence of consequence, which sits adjacent to moral causality in the founding core) and returned it⟫`
- Reason: both pairs enclose a statement of content (the argument, the named scope). In the first, "now reinforced" modifies "argument", so a comma follows the parenthesis; in the second the verbs "named … and returned" now read as one predicate.
- Unchanged: 200–300, "age thirty", "three-century", LP-042, "secondary-authority", 73%, 7/10, "bare minimum", "founding core", "Article XI", 90%.

**C6. LP-066, first summary paragraph, the drafters' frame (line 642).** Habit: stacked em-dashes.
- Before: `⟦lives under the civilization&rsquo;s heaviest consequence &mdash; mortality &mdash; as a fact of parental geography.⟧`
- After: `⟪lives under the civilization&rsquo;s heaviest consequence (mortality) as a fact of parental geography.⟫`
- Reason: a one-word gloss inside a dash pair. The mechanism sentence earlier in the paragraph (proposal text) keeps its own dash pair (flag 1).
- Unchanged: every word, "clean-record doctrine", "-3", "Article VIII", "fetal-reincarnation".

**C7. LP-066, second summary paragraph (line 643).** Habit: aphorism closer.
- Before: `⟦are priced against. A child-shaped hole in a hardware-absolute boundary is a hole. Main Layer ratified at 84%.⟧`
- After: `⟪are priced against. Main Layer ratified at 84%.⟫`
- Reason: the sentence before it already records the concurrence's point: a live vessel link inside -3, "however narrowly scoped to children", is the infrastructure class §17.1.5 prices against. The aphorism says the same thing again as a slogan. It is not attributed to the Court and is not a quotation.
- Unchanged: 74%, 7/10, 84%, Article XI, LP-004.2, §17.1.5, "founding core", "however narrowly scoped to children". The cut sentence held no number, citation, modal or hedge. "hardware-absolute" now occurs once on the page (LP-066's third paragraph, "hardware-absolute finality"), and the note below keeps "hardware absolutism" (flag 3).

**C8. LP-066, third summary paragraph (line 644).** Habit: stacked em-dashes (three pairs; one sentence carried four dashes).
- Before: `⟦The dissent bloc &mdash; approximately 2.1 million votes, anchored in continuity-architecture and boundary-integrity networks &mdash; did not converge⟧`
- After: `⟪The dissent bloc (approximately 2.1 million votes, anchored in continuity-architecture and boundary-integrity networks) did not converge⟫`
- Before: `⟦the remedy the architecture already provides &mdash; exercisable at any age, federally facilitated, free &mdash; and the amendment would convert⟧`
- After: `⟪the remedy the architecture already provides (exercisable at any age, federally facilitated, free), and the amendment would convert⟫`
- Before: `⟦the Court&rsquo;s LP-052 concurrence &mdash; continuity-first versus instrumentation-contingent readings of Article VIII &mdash; resurfaced⟧`
- After: `⟪the Court&rsquo;s LP-052 concurrence (continuity-first versus instrumentation-contingent readings of Article VIII) resurfaced⟫`
- Reason: the second sentence ran four dashes around two asides and a colon. As parentheses, the subject "bloc" reaches "did not converge", and the relocation-right clause reads as one clause joined to the next by ", and". The third sentence has the same fix.
- Unchanged: "approximately 2.1 million", LP-052 (twice), Article VIII, LP-068, "one exception is a category change", "within a year", "still-unresolved axis".

**C9. LP-076, second summary paragraph (line 674).** Habit: stacked em-dashes.
- Before: `⟦reaches nothing that Article XI&rsquo;s own lock protects &mdash; no behavioral threshold, no phasing mechanic, no descent trigger, no permanence of reassignment &mdash; and it removes no article.⟧`
- After: `⟪reaches nothing that Article XI&rsquo;s own lock protects (no behavioral threshold, no phasing mechanic, no descent trigger, no permanence of reassignment), and it removes no article.⟫`
- Reason: the pair holds the four-item list of what the lock protects. Parentheses keep it attached to "protects", and the closing comma separates the second claim ("removes no article").
- Unchanged: every word, all four "no" items, Article XI, Whitepaper §10.6.1, Article XXV.VI, "thirty headings", the earlier single dash. This is the amendment's scope claim (flag 5).

**C10. LP-076, third summary paragraph (line 675).** Habit: stacked em-dashes.
- Before: `⟦The Sanctuary window closed on the tally certified below &mdash; full agreement, zero standing no, the first Charter filing to reach it &mdash; the published objections⟧`
- After: `⟪The Sanctuary window closed on the tally certified below (full agreement, zero standing no, the first Charter filing to reach it), the published objections⟫`
- Reason: the pair glossed "the tally" while the next dash-free clause went on. Parentheses keep the gloss on "tally" and leave the sentence's own list of three facts.
- Unchanged: "full agreement", "zero standing no", "Presidential veto was not exercised on either track", Article III.I, Article XI, Article XXV.VI, both single dashes earlier in the paragraph. The vote table's `0 no votes` cell (guarded) is untouched.

**C11. LP-076, vote note (line 694).** Habit: stacked em-dashes.
- Before: `⟦proposed to change what the civilization is &mdash; five of them dying at a population gate, two before reaching one &mdash; and this one changed⟧`
- After: `⟪proposed to change what the civilization is (five of them dying at a population gate, two before reaching one), and this one changed⟫`
- Reason: the pair splits the seven failures; parentheses keep the tally-by-gate attached to "the seven failed filings" and let the contrast with "this one" read as a second clause.
- Unchanged: "1-for-8", "seven", "five", "two", "80–90%", Article XI, Article XXV.VI, "all five layers voting", the sentence with the single dash.

**C12. LP-004, summary (line 769).** Habit: stacked em-dashes (two pairs).
- Before: `⟦Failed at the Sanctuary ratification gate &mdash; 71% yes, well below the 90% federal floor &mdash; on grounds⟧`
- After: `⟪Failed at the Sanctuary ratification gate (71% yes, well below the 90% federal floor) on grounds⟫`
- Before: `⟦consent-scoped redraft &mdash; compromised-consent protections in -1/-2 and mandatory vessel-link suspension at the -3 boundary &mdash; rather than destination-rate parity.⟧`
- After: `⟪consent-scoped redraft (compromised-consent protections in -1/-2 and mandatory vessel-link suspension at the -3 boundary) rather than destination-rate parity.⟫`
- Reason: the first pair holds the tally, which is the evidence for "Failed at the gate"; the sentence's claim is "failed … on grounds that". The second pair names LP-004.2's two tracks. This is the pattern used in C13 to C16, C19, C20, C22 and C23.
- Unchanged: 71%, 90%, "federal floor", "~1-in-10,000", "~1-in-1,000", LP-004.2, "-1/-2", "-3", "not an exploit", the proposal sentences.

**C13. LP-005, summary (line 827).** Habit: stacked em-dashes.
- Before: `⟦Failed at the Sanctuary ratification gate &mdash; 89% yes, one percentage point below the 90% federal floor &mdash; on grounds⟧`
- After: `⟪Failed at the Sanctuary ratification gate (89% yes, one percentage point below the 90% federal floor) on grounds⟫`
- Reason: as C12.
- Unchanged: 89%, "one percentage point", 90%, Article XXV.IV, LP-005.2, "— not an expansion" (flag 2).

**C14. LP-007, summary (line 947).** Habit: stacked em-dashes.
- Before: `⟦Failed at the Sanctuary ratification gate &mdash; 85% yes, below the 90% federal floor &mdash; on grounds⟧`
- After: `⟪Failed at the Sanctuary ratification gate (85% yes, below the 90% federal floor) on grounds⟫`
- Reason: as C12.
- Unchanged: 85%, 90%, "one seat per district", "one seat per five districts", "partially", "rather than through seat-allocation curvature".

**C15. LP-038, summary (line 1389).** Habit: stacked em-dashes.
- Before: `⟦Failed at the Main Layer ratification gate &mdash; 66% yes, below the 70% floor &mdash; on grounds⟧`
- After: `⟪Failed at the Main Layer ratification gate (66% yes, below the 70% floor) on grounds⟫`
- Reason: as C12.
- Unchanged: 66%, 70%, 93%, "ninety-day", "sixty-day", "180-day", Article V, LP-038.2, the proposal sentence with its single dash.

**C16. LP-045, summary (line 1594).** Habit: stacked em-dashes.
- Before: `⟦Failed at the Sanctuary ratification gate &mdash; 86% yes, four points below the 90% federal floor &mdash; on grounds⟧`
- After: `⟪Failed at the Sanctuary ratification gate (86% yes, four points below the 90% federal floor) on grounds⟫`
- Reason: as C12.
- Unchanged: 86%, "four points", 90%, §17, §22.9, "quarterly", LP-045.2, the first sentence's single dash.

**C17. LP-046.2, first summary paragraph (line 1653).** Habit: stacked em-dashes.
- Before: `⟦replacing consensus with a 90% supermajority &mdash; and died at Meritboard coherence review for converting a window-deliberation mechanism into an outvoting mechanism &mdash; the refinement takes⟧`
- After: `⟪replacing consensus with a 90% supermajority (and died at Meritboard coherence review for converting a window-deliberation mechanism into an outvoting mechanism), the refinement takes⟫`
- Reason: the pair interrupts a "where X, Y" sentence. With parentheses the "where" clause ends at the comma and the main clause follows.
- Unchanged: 90%, LP-046 (twice), "failed-parent → refined-child", "sub-1%", "a defined clock, a defined engagement obligation, and a defined end". The four procedures in the next paragraph are held whole.

**C18. LP-046.2, vote note (line 1673).** Habit: aphorism closer.
- Before: `⟦the obligations that power carries. Consensus kept its character; deliberation gained its clock.</p>⟧`
- After: `⟪the obligations that power carries.</p>⟫`
- Reason: a balanced-contrast slogan restating the note's first sentence (the parent kept consensus, the child gave deliberation a clock) and the summary's "a defined clock". It adds no fact.
- Unchanged: LP-046, "sub-1%", "answered yes" (twice), 95%, "load-bearing signal". The cut sentence held no number, citation, modal or hedge.

**C19. LP-047, summary (line 1685).** Habit: stacked em-dashes.
- Before: `⟦Failed at the Sanctuary ratification gate &mdash; 87% yes, three points below the 90% federal floor &mdash; on grounds⟧`
- After: `⟪Failed at the Sanctuary ratification gate (87% yes, three points below the 90% federal floor) on grounds⟫`
- Reason: as C12.
- Unchanged: 87%, "three points", 90%, Article XIV, "three-axis", "may use", LP-047.2, the proposal sentence with its single dash.

**C20. LP-047.2, summary (line 1715).** Habit: stacked em-dashes.
- Before: `⟦Failed instead at the lower-layer aggregate ratification gate &mdash; 64% yes, six points below the 70% floor &mdash; on grounds⟧`
- After: `⟪Failed instead at the lower-layer aggregate ratification gate (64% yes, six points below the 70% floor) on grounds⟫`
- Reason: as C12. The first sentence (the proposed rule) keeps its dash pair (flag 1).
- Unchanged: 94%, 90%, 64%, "six points", 70%, LP-047, LP-047.3, "may use", "lethal-impunity blank check", "not about defensive authority itself" (flag 2).

**C21. LP-047.3, vote note (line 1771).** Habit: stacked em-dashes.
- Before: `⟦The alternative &mdash; chilling effect on visitor traffic to lower-layer commerce, tourism, and family-visit corridors &mdash; was empirically worse⟧`
- After: `⟪The alternative (chilling effect on visitor traffic to lower-layer commerce, tourism, and family-visit corridors) was empirically worse⟫`
- Reason: the pair defines "the alternative"; parentheses let the subject reach "was empirically worse".
- Unchanged: 73%, LP-047.2, Article XVIII, "Network Attribution", "modest increase", "disproportionately".

**C22. LP-048, summary (line 1783).** Habit: stacked em-dashes.
- Before: `⟦Failed at the lower-layer aggregate ratification gate &mdash; 58% yes, twelve points below the 70% floor &mdash; on grounds⟧`
- After: `⟪Failed at the lower-layer aggregate ratification gate (58% yes, twelve points below the 70% floor) on grounds⟫`
- Reason: as C12.
- Unchanged: 58%, "twelve points", 70%, LP-047.3 (four times), Article XVIII, LP-048.2, the quoted "defensible", the proposal sentence with its single dash.

**C23. LP-048.2, summary (line 1813).** Habit: stacked em-dashes.
- Before: `⟦Failed instead at Sanctuary &mdash; 88% yes, two points below the 90% federal floor &mdash; on grounds of under-protection.⟧`
- After: `⟪Failed instead at Sanctuary (88% yes, two points below the 90% federal floor) on grounds of under-protection.⟫`
- Reason: as C12.
- Unchanged: 76%, "six points above the floor", 88%, "two points", 90%, "only", LP-047.3, LP-048.3, the single-dash sentence about the able-bodied stranger.

### Claims ledger

Every claim, number and citation in the 23 edited elements, with a quote from the copy showing it survives.

**C1 (card, first paragraph).**
- Publication parity: «publishes its legislative record the same way it publishes its leakage rate»
- Manner: «openly, auditably, and without editorial curation»
- Coverage: «Every Charter amendment, federal law, and regulatory petition since the civilization began operating»
- Fields recorded: «recorded here with filing date, drafter, vote breakdown, threshold, and outcome»
- Founding-corpus route: «Founding-corpus law (enacted whole with the Founding Treaty rather than through the ladders)»
- No polling record, consolidated at VMSS Laws: «carries no polling record; its consolidated statement lives in VMSS Laws»

**C2 (LP-046 note).**
- Source: «Filibuster rationale in the Meritboard's published opinion»
- The premise: «structural premise (that institutional-tier tightening compensates for population-tier relaxation)»
- The verdict: «confuses two distinct legitimacy stacks»
- What Sanctuary consensus protects: «The consensus mechanism at Sanctuary protects against drift in the ontology»
- Why tightening fails: «those bodies adjudicate coherence, not ontology legitimacy»
- Where and why terminated: «terminated at the coherence gate precisely because its own internal logic failed»

**C3 (LP-050, fourth paragraph).**
- Meritboard 71%: «cleared the proposal to the Court at 71% (narrowly above the filibuster floor)»
- The condition: «conditioned that clearance on parallel federal-tier investigation of handoff-procedure mechanisms»
- The quoted note (unchanged): «Handoff-procedure mechanisms can be enacted at federal tier without Charter modification.»
- «The continuity concern is real; the proposed remedy is wrong-tier.»
- LP-051, filed 2191, enacted 2192: «LP-051 (operational handoff-period specification, separately filed 2191, enacted 2192)»

**C4 (LP-053, second paragraph).**
- Gates cleared: «cleared Meritboard at 72%, Supreme Court at 7/10, and Main Layer at 81%»
- Outcome: «passing the institutional gauntlet but terminating at Sanctuary consensus failure»
- Margin: «approximately 2.4 million dissenting votes in a 300-million-resident population»
- Closeness: «one of the closer failures in Charter-tier history»
- Two streams: «split its objection into two architecturally distinct streams»
- Stream one: «The first stream (autonomy-protective dissent) opposed the amendment»
- Its ground: «institutional facilitation of cessation creates pressure architecture»
- Descriptive "may": «may be subtly pressured toward cessation by available infrastructure»
- Choice environment: «the existence of the pathway changes the choice environment of every citizen»
- Stream two: «The second stream (continuity-foundational dissent) opposed on grounds that Article IV's»
- Its ground: «foundational to civilization-character, not operational specification»
- Quoted terms: «routes the architecture toward "service" rather than "commitment."»
- Combined effect: «Both dissent streams combined to block consensus.»

**C5 (LP-057, second paragraph).**
- The argument: «rested on the immortality argument the allied civilization's founders had raised a century earlier»
- Its content: «permanence applied to 200–300-year lifespans converts a single qualifying act at age thirty»
- Reinforcement: «into a three-century consequence), now reinforced by citation of the ally's multi-decade operational record»
- LP-042: «as interpretive support under the LP-042 secondary-authority rule»
- Opponents' costs: «measurable deterrent erosion at the Main Layer margin, victim re-contact trauma»
- «the bifurcation of the punitive-layer population into those counting down a clock»
- «an STI metric asked to certify character transformation when it was architected to measure conduct»
- Shared data: «Both sides argued from the same civilization's data.»
- Meritboard 73%: «The Meritboard cleared the amendment at 73% with a published note distinguishing coherence from endorsement»
- Its note: «internally consistent, correctly tiered, and posed a question only the population gates could answer»
- Court 7/10: «The Supreme Court cleared it 7/10 at the bare minimum»
- «exercising the constitutional-honesty mechanism in full»
- Named scope: «it reaches the permanence of consequence, which sits adjacent to moral causality»
- «adjacent to moral causality in the founding core) and returned it to the population»
- «with that scope disclosed»
- Presidency and Court: «The Presidency, in consultation with the Court»
- 90%: «set the Main Layer gravity threshold at the top of the Article XI range: 90%»

**C6 (LP-066, first paragraph).**
- Coverage: «establishing continuity coverage for children born in -3 Terminal (and, by parallel clause, -2)»
- Duration: «from birth until relocation or majority»
- Mechanism (held): «synced exclusively to Main Layer fabrication facilities — no -3 infrastructure — with death»
- «processed as revival into Main Layer autoparenting under Article VIII's existing fetal-reincarnation logic»
- Drafters' frame: «the clean-record doctrine promises that children inherit nothing»
- «lives under the civilization's heaviest consequence (mortality) as a fact of parental geography»
- «Death-as-relocation would extend to the born child the protection the Charter already extends»
- «exercised through the standing right the child already holds»

**C7 (LP-066, second paragraph).**
- «The institutional gates cleared it.»
- Meritboard 74% and reservation: «Meritboard 74%, with a reservation noting the filing's honest tier placement»
- «a change to what terminal severance means is Charter work, not federal work»
- Court 7/10, Article XI: «The Supreme Court cleared 7/10 with the amendment's scope named per Article XI»
- Scope: «it does not reach the founding core, but it opens the -3 boundary»
- LP-004.2: «that LP-004.2 had recently sealed»
- Concurrence: «a live vessel link operating inside -3, however narrowly scoped to children»
- §17.1.5: «the infrastructure class §17.1.5's captive-revival economics are priced against»
- Main 84%: «Main Layer ratified at 84%.»

**C8 (LP-066, third paragraph).**
- «The amendment died in the Sanctuary consensus window.»
- Bloc size and base: «The dissent bloc (approximately 2.1 million votes, anchored in continuity-architecture and boundary-integrity networks)»
- «did not converge across the full deliberation window»
- Precedent: «as the LP-052 dissenters had before them»
- Remedy: «the relocation right is the remedy the architecture already provides (exercisable at any age»
- «federally facilitated, free)»
- Objection: «convert -3's hardware-absolute finality into a policy line with one exception»
- «one exception is a category change»
- «affirmed the moral weight of the terminal-born child's position while rejecting the mechanism»
- LP-052 concurrence, Article VIII: «the Court's LP-052 concurrence (continuity-first versus instrumentation-contingent readings of Article VIII)»
- «resurfaced in the published record as the still-unresolved axis»
- LP-068: «refiled the surviving remnant at federal tier within a year: LP-068»
- «which asks nothing of the boundary»

**C9 (LP-076, second paragraph).**
- «the institutional gates adopted almost verbatim»
- «the amendment introduces no tier doctrine, it completes one the corpus already declares»
- Whitepaper §10.6.1: «Whitepaper §10.6.1 states that the Charter carries structural principles, placement criteria, and constraints»
- «what it does contain is indexed and everything below it consolidated at VMSS Laws»
- Routing test: «the routing test asks whether a rule controls who goes to which layer»
- «and a garnishing rate does not»
- «founding-era parameters parked at constitutional tier, not constitutional content»
- Article XXV.VI: «already sat beside a federal instrument operating under Article XXV.VI»
- «administered the adjacent mechanics and specified around the rates»
- «the rates themselves stood as Charter text until this filing enacted them at federal tier»
- Article XI lock: «reaches nothing that Article XI's own lock protects (no behavioral threshold, no phasing mechanic»
- «no descent trigger, no permanence of reassignment), and it removes no article»
- «The Charter is thirty headings before the amendment and thirty after.»

**C10 (LP-076, third paragraph).**
- «It passed where seven amendments had failed»
- «it changes no present magnitude and no substantive entitlement»
- «the drafting made that property auditable rather than asserted»
- «Every relocated magnitude re-enacts at its receiving instrument at the identical value»
- Article III.I: «the derivation rule that binds the overtime premium to the Article III.I dividend baselines»
- «the demoted figures remain recoverable from retained Charter text»
- «by the derivation the receiving Protocol carries»
- What changes: «it moves the competent lawmaking tier, the future ratification constituency, and the degree of entrenchment»
- Article XI: «a schedule that was supreme Charter text, alterable only through Article XI»
- Article XXV.VI: «becomes federal law recalibrated through the Article XXV.VI ladder»
- «the lower layers gain a standing vote on it they did not hold»
- «The Supreme Court's opinion named that scope on both tracks»
- «the founding core is untouched and no present magnitude or entitlement moves»
- «procedural standing, constitutional protection, and the amending constituency do»
- Sanctuary close: «The Sanctuary window closed on the tally certified below (full agreement, zero standing no»
- «the first Charter filing to reach it)»
- «the published objections in the window concerning drafting sequence rather than the rule»
- «the Presidential veto was not exercised on either track»
- Meritboard reservation: «an amendment that is easy to ratify because it is empty of substance»
- «is exactly the amendment a civilization should read twice»
- «the filing was published article by article so that the next reader can»

**C11 (LP-076 note).**
- «First Charter-tier success; the amendment ladder stands 1-for-8.»
- «the seven failed filings each proposed to change what the civilization is»
- «(five of them dying at a population gate, two before reaching one)»
- «this one changed no present magnitude and no substantive entitlement»
- «moving only the competent tier, the ratification constituency, and the entrenchment»
- Article XXV.VI track: «Because it carried a concurrent Article XXV.VI federal track»
- «the widest ballot in the register's history — all five layers voting»
- Article XI electorate: «where an Article XI filing polls only Sanctuary and Main»
- 80–90% band: «set the Main Layer amendment point at the floor of the 80–90% band»
- «the gravity of the change being the range's own measure under Article XI»
- «the lowest amendment point ever set for a Charter filing»
- «the register carries the relocation article by article above»

**C12 (LP-004 summary).**
- Proposal: «operate under the destination layer's backup vessel failure rate, not their home-layer rate»
- -1 risk: «A Main resident visiting -1 would have carried -1's ~1-in-10,000 risk»
- -2, -3: «visiting -2, ~1-in-1,000; visiting -3, no revival»
- «would have been drawn from local infrastructure»
- Intent: «close the mortality-asymmetry exploit where upper-layer visitors took risk-free positions»
- «(Colosseum-classified enterprises, hazardous construction, combat-adjacent contracts)»
- Outcome and tally: «Failed at the Sanctuary ratification gate (71% yes, well below the 90% federal floor)»
- Ground: «itself an acceptable feature of the consent architecture, not an exploit»
- LP-004.2: «later addressed through LP-004.2's consent-scoped redraft (compromised-consent protections in -1/-2»
- «mandatory vessel-link suspension at the -3 boundary) rather than destination-rate parity»

**C13 (LP-005 summary).**
- «Proposed federal classification of VMSS sovereignty breach»
- «unauthorized territorial incursion by foreign actor, coordinated sovereignty violation»
- «or hostile-state aggression at the border»
- «as a capital federal offense triggering automatic -3 reassignment»
- «escalating to the national defense track»
- Article XXV.IV: «a procedural narrowing of the existing Article XXV.IV lethal-response ladder — not an expansion»
- Outcome: «Failed at the Sanctuary ratification gate (89% yes»
- Tally: «(89% yes, one percentage point below the 90% federal floor)»
- Ground: «risked extending operational latency»
- «where the civilization needs the shortest possible decision window»
- LP-005.2: «Redrafted as LP-005.2 with the latency objection addressed.»

**C14 (LP-007 summary).**
- «Proposed curved per-district representation on Meritboard federal-administration and civic-engagement rankings»
- «Sanctuary, -1, -2, and -3 receiving one seat per district»
- «Main Layer receiving one seat per five districts»
- «preventing Main's numerical dominance from producing single-layer control of Meritboard composition»
- Outcome and tally: «Failed at the Sanctuary ratification gate (85% yes, below the 90% federal floor)»
- Ground: «embeds a distributive metric into a competence ranking system»
- «the Charter grounds on demonstrated individual conduct»
- Later remedy: «partially addressed through metric-category separation within the Meritboard itself»
- «rather than through seat-allocation curvature»

**C15 (LP-038 summary).**
- «Early-founding-era federal proposal to mandate a maximum inter-sync interval»
- «beyond a ninety-day ceiling would incur automatic implant notification»
- «a secondary sixty-day grace notification»
- «at the 180-day mark, a mandatory administrative sync»
- «without the resident's further consent»
- «sync intervals approaching a year»
- «producing consciousness continuity failures at rates that the continuity doctrine treated as structural»
- Outcome and tally: «Failed at the Main Layer ratification gate (66% yes, below the 70% floor)»
- Article V: «violated the Article V bodily autonomy principle»
- «in a domain (intimate mind-state capture) where the autonomy principle was load-bearing»
- «Sanctuary ratified at 93%.»
- LP-038.2: «Redrafted as LP-038.2»
- «replaced by a notification-plus-family-contact architecture»

**C16 (LP-045 summary).**
- §17: «beyond its biologically-framed §17 architecture to non-biological citizen substrates»
- §22.9: «AGI citizens, ASI peers under §22.9, and cyborg residents»
- «mandatory quarterly snapshot captures, encrypted storage linked to the citizen's civic identity»
- «binary revival semantics (full-fidelity restoration or failure)»
- Outcome and tally: «Failed at the Sanctuary ratification gate (86% yes, four points below the 90% federal floor)»
- Ground: «not actually substrate-equivalent in the functional sense that mattered»
- «assumes a substrate with the continuity characteristics of biological tissue»
- «AGI weight-state and ASI activation-pattern substrates have different decoherence and drift profiles»
- «simultaneously excessive for one substrate type and dangerously under-resolved for another»
- «Sanctuary substrate-neutrality bloc held the drafting had over-generalized the biological architecture»
- LP-045.2: «Redrafted as LP-045.2»
- «re-grounded in functional-equivalence doctrine rather than mechanism extension»

**C17 (LP-046.2, first paragraph).**
- «Codifies the operating procedures of the Sanctuary consensus deliberation window»
- «for Charter-tier ratification»
- LP-046 lineage: «Refined child of LP-046 under the failed-parent → refined-child archival pattern»
- 90% and the Meritboard verdict: «proposed replacing consensus with a 90% supermajority (and died at Meritboard coherence review»
- «for converting a window-deliberation mechanism into an outvoting mechanism)»
- «the refinement takes the coherence opinion at its word»
- «If consensus operates as deliberation in which dissenters trigger engagement»
- «a defined clock, a defined engagement obligation, and a defined end»
- sub-1%: «(Charter proposals dying to sub-1% dissent with no structured path from dissent to revision)»
- «strengthening the mechanism's deliberative character rather than abolishing it»

**C18 (LP-046.2 note).**
- «The enactment completes the LP-046 arc»
- sub-1%: «whether sub-1% dissent should be able to stop a Charter amendment»
- «and the architecture answered yes»
- «owes the civilization structured deliberation in return and the architecture also answered yes»
- 95%: «Sanctuary's 95% ratification of procedures binding its own deliberation conduct»
- «is the load-bearing signal»
- «the population holding consensus power voted to formalize the obligations that power carries»

**C19 (LP-047 summary).**
- «First federal attempt to address the visitor-defensive-force gap»
- «surfaced by accumulated case data on downward visitation»
- Article XIV: «faced ambiguous Article XIV three-axis evaluation»
- «producing a chilling effect on legitimate cross-layer movement»
- «a Main resident attacked while visiting -1 risked layer reassignment»
- «evaluated against Main standards without an explicit defensive-act exemption»
- «The draft proposed strict proportional response»
- Proposed rule (held): «a visitor may use defensive force equivalent to the attacker's force, no escalation»
- «exempt from reassignment evaluation if the attacker initiated»
- Outcome and tally: «Failed at the Sanctuary ratification gate (87% yes, three points below the 90% federal floor)»
- Ground: «strict proportionality reintroduced the fight-or-flight calculation problem»
- «must calculate weapon parity under stress, retains incentive to flee rather than defend»
- «remains effectively unprotected against attackers with capability advantage»
- «not closed by a doctrine that still requires defenders to perform real-time legal arithmetic»
- LP-047.2: «Redrafted as LP-047.2 with layer-graduated proportionality replacing strict parity.»

**C20 (LP-047.2 summary).**
- «Replaces LP-047's strict proportionality with layer-graduated proportionality»
- Proposed rule (held): «a visitor may use defensive force one force-tier above the attacker's force»
- «subject to the lethal-tier ceiling»
- «explicit tier-internal sub-option authority closing the "shoot to kill vs shoot to injure" calculation problem»
- Sanctuary 94%: «Sanctuary ratified at 94%, well above the 90% floor.»
- Outcome: «Failed instead at the lower-layer aggregate ratification gate»
- Tally: «(64% yes, six points below the 70% floor)»
- Ground: «the draft contained no temporal scope for defensive authority»
- «could continue lethal force indefinitely after the attacker was incapacitated, fleeing, or visibly surrendered»
- «the per-incident defensive shield preserving the act from layer-reassignment evaluation»
- «called this a lethal-impunity blank check»
- «an initial provoked attack would justify unlimited subsequent force»
- «real-time intent recording not consulted for post-incapacitation acts»
- «The objection was not about defensive authority itself but about the missing hedge»
- LP-047.3: «Redrafted as LP-047.3 with explicit temporal scope»
- «defensive force ends when the immediate threat ends»
- «with implant-ledger intent verification gating the boundary»

**C21 (LP-047.3 note).**
- «Lower-layer aggregate narrowness reflects the structural tension»
- «lower-layer residents disproportionately bear the consequence of escalated visitor defensive force»
- 73%, LP-047.2: «The 73% margin held because the temporal hedge addressed the load-bearing LP-047.2 objection»
- Article XVIII: «Article XVIII Network Attribution corroboration explicitly closed the vigilante-pattern exploitation concern»
- The alternative: «The alternative (chilling effect on visitor traffic to lower-layer commerce, tourism, and family-visit corridors)»
- «was empirically worse for lower-layer economic activity»
- «than the modest increase in defensive-force exposure under the new framework»

**C22 (LP-048 summary).**
- LP-047.3: «extend the LP-047.3 defensive-force framework to acts in defense of third parties»
- «after a decade of operational experience with LP-047.3»
- «a visitor witnessing an attack on a stranger had no canonical defensive shield»
- «was rationally chilled into non-intervention»
- «Cross-layer family visits, tourism in -3 cooperative districts, and Main commerce in -2 markets»
- «visitors declining to intervene because the legal calculus was prohibitive»
- «The first draft proposed blanket extension»
- «any person witnessing any attack on any other person could exercise»
- «the same layer-graduated defensive force under LP-047.3 terms»
- Outcome and tally: «Failed at the lower-layer aggregate ratification gate (58% yes, twelve points below the 70% floor)»
- Ground: «the blanket scope created vigilante coordination potential»
- Quoted term: «with deliberate intent to find "defensible" scenarios»
- «could exercise lethal force serially under the per-incident shield»
- Article XVIII: «Article XVIII Network Attribution unable to fully prevent the pattern»
- «each incident technically satisfied the defensive criteria»
- «blanket defense-of-others without victim-condition limits invites the exact vigilante exploit»
- «routed through the defense-of-others scope rather than the self-defense scope»
- LP-048.2: «Redrafted as LP-048.2 with incapacitated-victim scoping.»

**C23 (LP-048.2 summary).**
- «Replaces LP-048's blanket scope with strict victim-condition limits»
- "only": «applies only when the third-party victim is incapacitated or otherwise physically unable to defend»
- «(unconscious, restrained, child, elderly, disabled, vastly outmatched by force differential)»
- Lower-layer 76%: «lower-layer aggregate ratified at 76%, six points above the floor»
- Outcome and tally: «Failed instead at Sanctuary (88% yes, two points below the 90% federal floor)»
- «on grounds of under-protection»
- «excludes the larger category of cases where a victim is technically able to defend»
- «where defense is impractical, where the defender has more capability than the victim»
- «the defender's intervention would be decisive»
- «overwhelmed by multiple attackers, or who is unaware of the attack initiating»
- «or who lacks training to defend at all»
- «none of these qualify under strict incapacitation scoping»
- «the chilling effect on intervention persists»
- «protecting only the obviously-incapacitated leaves the broader class of vulnerable-but-not-incapacitated victims»
- LP-047.3: «in the same gap LP-047.3 closed for self-defense»
- LP-048.3: «Redrafted as LP-048.3 with a reasonable-perception standard replacing the strict incapacitation rule.»

### Word counts

| Scope | Before | After |
|---|---|---|
| Rendered words in `<body>` | 36,336 | 36,318 |
| Rendered words in the patch range | 16,496 | 16,478 |
| Prose sentences in the range with two or more em-dashes | 38 | 13 |

Per element: every punctuation-only element keeps its word count. C7 (LP-066, second paragraph) loses the 10 words of the cut aphorism; C18 (LP-046.2 note) loses 8.

| Element | Line | Before | After |
|---|---|---|---|
| C1 card | 281 | 75 | 75 |
| C2 LP-046 note | 505 | 72 | 72 |
| C3 LP-050 | 520 | 81 | 81 |
| C4 LP-053 | 581 | 156 | 156 |
| C5 LP-057 | 612 | 219 | 219 |
| C6 LP-066 | 642 | 127 | 127 |
| C7 LP-066 | 643 | 103 | 93 |
| C8 LP-066 | 644 | 140 | 140 |
| C9 LP-076 | 674 | 171 | 171 |
| C10 LP-076 | 675 | 270 | 270 |
| C11 LP-076 note | 694 | 148 | 148 |
| C12 LP-004 | 769 | 135 | 135 |
| C13 LP-005 | 827 | 114 | 114 |
| C14 LP-007 | 947 | 103 | 103 |
| C15 LP-038 | 1389 | 160 | 160 |
| C16 LP-045 | 1594 | 188 | 188 |
| C17 LP-046.2 | 1653 | 116 | 116 |
| C18 LP-046.2 note | 1673 | 79 | 71 |
| C19 LP-047 | 1685 | 190 | 190 |
| C20 LP-047.2 | 1715 | 187 | 187 |
| C21 LP-047.3 note | 1771 | 75 | 75 |
| C22 LP-048 | 1783 | 220 | 220 |
| C23 LP-048.2 | 1813 | 208 | 208 |

### Flags

1. **Thirteen multi-dash sentences held as operative or proposal text.** Each states what a proposal would have done or what an enacted law does, so the ruling freezes it: LP-057's recovery pathway (line 611); LP-066's mechanism (642); LP-076's receiving-instrument list, where the pair around "the Overtime Premium Protocol" sits inside a four-item list and reads as a list break (673); LP-021 (1035) and LP-034 (1300), which `laws.html` also mirrors; LP-043's remediation clause (1536); LP-044's five clauses, one sentence with five dashes (1565); LP-045.2, three sentences (1624); LP-047.2's proposed rule (1715); LP-048.3's vigilante-pattern clause (1847) and its first boundary case (1848). If any is ruled commentary, the parentheses fix used here applies, except in the LP-047.2 and LP-048.3 sentences, which carry "may".
2. **Sentence-level habits considered and left, because each carries scope or is the record.**
   - "Not X" reversals: LP-046, "Converting one to the other does not adjust a threshold — it changes the political character of the Sanctuary vote itself" (rebuts the drafters' framing, 488). LP-005, "a procedural narrowing … — not an expansion" (827): the negation restates "narrowing", but it records the drafters' stated intent; the first candidate if ruled. LP-033, "Not a new tier — a cleaner escalation rule" (1268): tier scope. LP-057, "not a calibration dispute but a values determination" (613): the reason no refiling is expected. LP-057 note, "not because no one wants it, but because the populations who hold revision rights declined" (630): answers the 81% vote. LP-004.2, "an infrastructure-integrity rule, not a risk-transfer mandate" (798): operative.
   - Closers and aphorisms: LP-046 note, "The amendment was terminated at the coherence gate precisely because its own internal logic failed coherence review" (505) restates the note's first sentence but names which gate. LP-050 note's closing claim about Article XXII (537). LP-057, "Eighty-one percent sympathy is not ninety percent consent" (613), mid-sentence and joined to the Article XI reading. LP-024, "Three-track architecture held." (1122), a closer, but it records the reading that both tracks did their job. LP-046.2, "One extension, once — the window lengthens; it does not become a siege." (1654) is operative text, inside procedure (2). LP-048.3, "The relationship-agnostic scope makes intervention rational for any witness" (1846) is Pillar text.
   - Redundant restatement: the LP-047 (1703) and LP-047.2 (1733) vote notes restate the objection already in their summaries, and LP-047.2's summary and note both say "The objection was not about defensive … but about the missing … hedge" (1715, 1733). Each note is labelled as the published opinion, so both were held. LP-053's note, "the architecture's deliberation mechanism produces precise outcomes near the boundary" (599), restates the clustering claim before it.
   - Stock framing: LP-076 note, "The record is legible in one line:" (694). It introduces the line that follows and was left.
3. **The two cut sentences (C7, C18).** These are the patch's only word-level edits. Neither is a quotation, neither is attributed to a body, neither holds a number, citation, modal or hedge, and neither appears on any other page. C7's point, that a narrow exception still breaches the boundary, is carried by the concurrence clause before it and by the dissent's "one exception is a category change" in the next paragraph. After the cut, "hardware-absolute" occurs once on the page (was twice); LP-066's note keeps "hardware absolutism".
4. **C1 is the R23 register-intro cure.** check-canon's R23 durability comment names "the law-polling register-intro cure" as resting on R23. No guard pins the sentence's text, and the edit changes only its punctuation.
5. **LP-076 (C9, C10, C11).** This is the most heavily guarded entry in the range. The guarded strings (the title, the `Lower-Layer Aggregate` and `Presidential Disposition` rows, `0 no votes`) are all in the header and the vote table, which are byte-identical. C9's parenthesized list is the amendment's own scope claim, which the Court's opinion and the vote table repeat. Its words and their order are unchanged.
6. **Observed, not resolved (possible tensions or drift).**
   - The card says "Every Charter amendment, federal law, and regulatory petition since the civilization began operating is recorded here" (281, C1's paragraph). LP-046 says "Withdrawn filings never conclude and therefore do not enter this register" (488). The card's "every" has no qualifier for withdrawn filings.
   - LP-053's note calls its ~0.8% Sanctuary dissent "among the closest … behind only LP-052 (~0.4%) and LP-001 (~0.67%)" (599). LP-066, concluded 2214, failed at ~2.1M in 300M (about 0.7%), which is closer than LP-053. The note reads as written in 2196, but it carries no date marker.
   Both are left unchanged.
7. **Range boundary.** Everything from `<article class="law-entry" id="lp-049">` to the end of the file is byte-identical to `git show HEAD:law-polling.html` and belongs to the next patch. That includes the remaining Federal entries (LP-049 onward), the Regulatory section and the page scripts.
