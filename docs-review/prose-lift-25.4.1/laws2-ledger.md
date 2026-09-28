# Prose lift 25.4.1, patch laws2: laws.html from the Dividend Sourcing Act to the end of the code entries (strict mode)

This is a strict, clarity-only pass on `laws.html`, the consolidated Code, made against main at 08c5386 (v25.4.0). The range runs from `<article class="code-entry" id="code-fc-dividend-sourcing-interlayer-levy"` to the last `</article>` (LP-030), just before the Cross-References card. That covers the remaining 57 Founding Corpus entries, all of Tier 3 (LP-013 to LP-082) and all of Tier 4 (LP-010 to LP-030), with both tier section subs. The edits are in the copy in this folder. The live `laws.html` is untouched and still equals `git show HEAD:laws.html`.

**Range check.** Everything before the `code-fc-dividend-sourcing-interlayer-levy` article marker (160,371 bytes: head, styles, the intro card, the generated ToC, Tier 1, the Tier 2 register-derived entries and the first three founding entries, all lifted in v25.4.0) is byte-identical to HEAD. Everything from the Cross-References card to the end of the file (6,784 bytes: the card, the page scripts and the footer placeholder) is byte-identical to HEAD. Every `law-meta-grid` (the meta rows), every heading, badge, chip, label, `<th>` and `<h4>` is byte-identical. Inside the range only the 2 `<p>` elements listed below changed. `laws2-verify.mjs` asserts all of this.

Markers (checked by `laws2-verify.mjs`):
- Text inside ⟦⟧ is the before text, as raw source. It must appear once in the original and must not appear in the copy.
- Text inside ⟪⟫ is the after text, as raw source. It must appear in the copy. Applying every ⟦⟧→⟪⟫ pair to HEAD must reproduce the copy byte for byte.
- Text inside «» is a claims-ledger quote, as rendered text. It must appear in the copy and be 15 words or fewer.

**Frozen strings checked before editing.** Every guard in `tools/check-canon.mjs` and `tools/test-canon-guard-mutations.mjs` that reads `laws.html` was read. None of the literal pins sits in this range except the advisory flag `advisory, not institutionally enforced` (12 Tier 3/4 entries, pinned comma-exact by guard a5 and its mutation probe) and the structural attributes (`data-tier`, `data-instrument="founding"`, `data-source`, `<div class="law-vote">`, `class="toc-link"`). The founding-corpus guards (i)–(v) read `data-source`, the `Whitepaper &sect;N` cites in the meta rows, and the `law-title` headings, all frozen. `laws2-verify.mjs` extracts every string literal from both tool files and confirms each one found in `laws.html` occurs the same number of times in the copy. As a whole-suite check, `git archive HEAD` was extracted to a scratch directory, the copy was swapped in as `laws.html`, and both suites were run there: `tools/check-canon.mjs` 141 passed, 0 failed (the same as the untouched scratch tree), and `tools/test-canon-guard-mutations.mjs` 98/98 guard families bit.

**What kind of edit this is.** Two edits. C1 is punctuation only: a stacked em-dash pair becomes parentheses, with the words unchanged and in the same order. C2 cuts one redundant three-word phrase ("rather than exhaustively") that restated the second half of its own sentence. `laws2-verify.mjs` proves the scope: the page's word-token sequence equals HEAD's with exactly those three tokens removed at that one spot. No number, citation, defined term, rule modal, hedge, quotation, link, id, tag or heading changed, and neither edited sentence carries "shall", "must" or "may".

**What was held as operative and left alone.** The ruling freezes statutory operative text and says to leave a sentence alone when it is unclear whether it is operative.
- All 57 founding-corpus entries in range were held whole, as v25.4.0 held the first three (its flag 3). The band's own intro says each entry "states the current-force rule", and these entries have no register text behind them: the Code entry is the codification. Holding the class keeps all 60 founding entries on one footing. See flag 1 for what a later ruling would unlock.
- Every sentence with "shall", "must" or "may" in Tier 3 and Tier 4: LP-027, LP-042 (both summaries), and LP-082's first sentence. LP-082's "Disclosure only" sentence was also held. It sets the rule's scope, and it matches the register except for one "and".
- The per-layer outcome cells (`<td>`) in the LP-015 to LP-019, LP-061 and LP-020 tables. These are the in-force outcomes, and each carries at most one dash.

**Quoted elsewhere.** Before editing, a distinctive run of each edited sentence was searched for across all `*.html`, `*.md`, `*.mjs`, `*.js` and `*.json` files. "minors-only" occurs only in `laws.html` and in the register's LP-020 entry (law-polling.html:2988), which already writes the list in parentheses; C1 matches it. "representatively" occurs only in `laws.html`. No other page quotes either sentence as Code text.

## laws.html

### Changes (2 elements, 2 edits)

**C1. LP-020, District-Level Curfew Petitions, summary (line 2828).** Habit: stacked em-dashes.
- Before: `⟦curfews vary in scope &mdash; minors-only, commercial-corridor nighttime, seasonal festival periods &mdash; and apply only within the ratifying district.⟧`
- After: `⟪curfews vary in scope (minors-only, commercial-corridor nighttime, seasonal festival periods) and apply only within the ratifying district.⟫`
- Reason: parentheses keep "curfews vary in scope … and apply only" as one compound predicate across the three-item list. The register's LP-020 entry (law-polling.html:2988) already uses this form.
- Unchanged: every word and its order, "Article XXVIII", "only", "ratifying district", all three curfew scopes. The representative-cases table below it is untouched.

**C2. Tier 4 section sub, second sentence (line 2802).** Habit: redundant restatement.
- Before: `⟦District regulation is recorded representatively rather than exhaustively &mdash; each district files its own petition⟧`
- After: `⟪District regulation is recorded representatively &mdash; each district files its own petition⟫`
- Reason: the sentence made the same contrast twice: "representatively rather than exhaustively", then "summarizes representative cases rather than enumerating every district petition". The second phrasing is the register's own LP-020 wording (law-polling.html:2988), so that one stays and the paraphrase goes. The single dash stays, since the clause after it explains the first.
- Unchanged: "each", "every", "rather than" (the surviving one), "representative cases", "register", the first sentence (1%, 80%, "one million residents", "Article XXVIII"), and the third ("attaches to the geographic zone, not the population that voted for it", "subordinate to layer-wide regulation").

### Claims ledger

Every claim, number and citation in the 2 edited elements, with a quote from the copy showing it survives.

**C1 (LP-020 summary).**
- Subject: «District-specific curfew regulations enacted across the civilization.»
- Filing route, Article XXVIII: «Each district files its own Article XXVIII petition»
- The three scopes: «curfews vary in scope (minors-only, commercial-corridor nighttime, seasonal festival periods)»
- Territorial limit, "only": «and apply only within the ratifying district»

**C2 (Tier 4 section sub, whole element).**
- Mechanism, Article XXVIII, district size: «The same Article XXVIII mechanism scaled to districts of one million residents»
- 1% threshold: «1% of district population to surface a petition»
- Drafting body: «Meritboard domain-expert drafting»
- 80% ratification: «80% direct ratification»
- Enforcement and its territory: «enforcement by the AI governance system within the district's geographic boundaries»
- Recording practice: «District regulation is recorded representatively — each district files its own petition»
- What the register holds: «the register summarizes representative cases rather than enumerating every district petition»
- Zone, not population: «District regulation attaches to the geographic zone, not the population that voted for it»
- Subordination: «and is subordinate to layer-wide regulation»

### Word counts

| Scope | Before | After |
|---|---|---|
| Rendered words in `<body>` | 21,728 | 21,725 |
| Rendered words in the patch range | 11,964 | 11,961 |
| Prose sentences in the range with two or more em-dashes | 64 | 63 |

Per element: C1 (LP-020) 32 → 32, since the edit is punctuation only. C2 (Tier 4 sub) 83 → 80, the three words of "rather than exhaustively". All 63 multi-dash sentences left in the range are in the held founding-corpus entries (flag 1). None is left in Tier 3 or Tier 4.

### Flags

1. **Founding-corpus entries held as operative (57 in range).** This follows v25.4.0 flag 3. Of the 57, 48 entries carry at least one sentence with two or more em-dashes, 63 sentences in all (lines 1593–2489). None is in the Dividend Sourcing Act, Medical Response Standard, Augmentation Consent Standard, Wartime Conduct Provisions, Continuity Sovereignty, Domain Chartering Standard, Domain Boundary Act, Rights Ceiling Doctrine or Governance Restraint Act. If the class is later ruled commentary rather than rule, those take the same parentheses fix v25.4.0 used, except where the sentence carries "may" or "must". Beyond dashes, a handful of clear habits sit in held entries and would be the first word-level candidates:
   - Redundant restatement: Live Session Consent Standard (line 2053), "revocable at any moment, the host free to withdraw at any moment". Substrate Personhood Doctrine (2489): its first sentence lists identical scores, assignment, rights and consequences, then restates the same list after a dash.
   - Aphorism closers: Security Classification System (1775), "the tiers are permanent; the items evolve". Civic Floor Act (1857), "expansion is calibration, contraction is structural, and the asymmetry is load-bearing". Metric Gated Domain Act (2424), "each serves what the other cannot", which the whitepaper also uses.
   - "Not X" reversals that may carry scope and would need a ruling each: Authorized Bailout (1988), "a continuity escape valve, not a consequence escape"; Layer Travel and Egress Act (2295), "a change of custody framework, not an exit"; Secondary Observation Envelope (1676), "implant removal is a routing decision, not a forensics gap"; Federation Treaty (2231), "a deliberate design choice rather than a gap"; Two-Level Moral Causality (1939), "an ambient standard that is not engineered".
2. **Operative sentences held in Tier 3 and Tier 4.** LP-027 ("must publish"), LP-042 ("may cite", "may rise"), and LP-082's first sentence ("must disclose", "must present") are frozen by the modal rule. LP-082's next sentence ends on a closer, "the counter states the fact and offers the step", that restates the two "must" duties. It was held for two reasons. The "Disclosure only" sentence sets the rule's scope. And the sentence is the register's text (law-polling.html:3304), except that the Code adds "and" before "no election".
3. **"Not X" constructions and closers considered and left in Tier 3 and Tier 4, because each carries scope or a claim:**
   - LP-062.2, "Disabling the coverage is not a silent configuration choice". The register (law-polling.html:3243) says "no longer a silent configuration choice". The negation marks what changed from the pre-LP-062 status quo, so it is not empty.
   - LP-061, "a regulatory question, not a constitutional one". This is the routing reason for Article XXVIII.
   - LP-014, "Calibration detail only." "Calibration" is the dual-key classification term, not filler.
   - LP-016, "The layer gradient produced the expected regulatory spread." This is a claim, and the register continues it with the per-layer spread.
   - LP-010's closer, "the coordinated mechanism demonstrates district coalitions producing emergent order across aligned districts". This is a claim. The register cites Whitepaper §10.4 at this point, and the Code drops that cite (flag 5).
   - Tier 4 sub, "attaches to the geographic zone, not the population that voted for it". This limits scope.
   - LP-030, "advisory, not institutionally enforced — but honored in practice". The flag is pinned comma-exact, and the sentence has one dash.
4. **Cross-References card, outside the range.** The card after LP-030 (line 2880) has the page's last stacked dash pair: "The Path 2 set — the Path 2 Charter, … the 2294 certification record — carries the rate-law methodology". It also restates the intro card's Scope and Governance Records paragraphs (v25.4.0 flag 5). This ruling's range ends at the last code entry, and v25.4.0's ended at the Dividend Sourcing marker, so no patch has covered the card. It is left byte-identical. If it is ruled in scope, the parentheses fix used for v25.4.0 C1 and C2 fits.
5. **Observed, not resolved (possible doctrinal tensions or drift).**
   - The Tier 4 sub gives district regulation "enforcement by the AI governance system within the district's geographic boundaries". The two -3 district entries (LP-009, LP-030) are "advisory, not institutionally enforced" under the -3 Terminal advisory clause. The entries state the exception, but the sub states no limit. This has the same shape as v25.4.0 flag 8's first bullet.
   - The Tier 4 sub's "districts of one million residents" is unhedged, while LP-070 says "approximately one million citizens". v25.4.0 flag 8 already records this for the intro card. C2 does not touch that sentence.
   - The Code's LP-010 summary drops the register's "Whitepaper §10.4" cite from the same sentence (law-polling.html:2706). Restoring it would be a content change, so it was not made.
   All three are left unchanged.
