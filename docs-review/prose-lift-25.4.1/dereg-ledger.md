# Prose lift 25.4.1: deregistered-statutes.html ledger (strict mode)

Source: `deregistered-statutes.html` at git HEAD (08c5386). Copy: `docs-review/prose-lift-25.4.1/deregistered-statutes.html`. The real page is untouched.

Scope: framing prose only. The statute texts (both `dereg-text` blocks, including the v22.1 vacatur annotation), the two status-history lines, the eyebrow, h1, h2s, card labels, badges, crosslink chips, `<head>`, and every check-canon pin are unchanged. The edits are three deletions. No words were added, so there is no Tailwind-token exposure.

## Word counts

| Scope | Before | After | Delta |
|---|---|---|---|
| Page body (rendered, script/style excluded) | 1118 | 1095 | -23 |
| E1: `.pending-doc` first paragraph ("Both texts are reproduced...") | 47 | 41 | -6 |
| E2: "Why these two left the register", paragraph 1 | 90 | 82 | -8 |
| E3: "Why these two left the register", paragraph 3 | 78 | 69 | -9 |

## Changed elements

### E1: `<p class="pending-p">`, first paragraph of `.pending-doc` (line 132)

Before:
> Both texts are reproduced **verbatim as engraved** — not corrected, not summarized, not softened. Cross-references inside them resolve to their live targets where those still exist; the words are unchanged. The one-line history above each text is authored for this archive and is not part of the statute.

After:
> Both texts are reproduced **verbatim as engraved**. Cross-references inside them resolve to their live targets where those still exist; the words are unchanged. The one-line history above each text is authored for this archive and is not part of the statute.

Reason: removed a triple-negation tail that restates "verbatim as engraved". Verbatim already means not corrected, not summarized and not softened.

Confirmed unchanged: terms ("verbatim as engraved", "live targets", "one-line history", "statute"); hedge ("where those still exist"); no modals; no numbers. The `<strong>` element is byte-identical.

### E2: "Why these two left the register", paragraph 1 (line 171)

Before:
> ... A register entry asserting it was law would be the drafting process leaking into the world's record. It is deregistered for that reason and for no other: not because the text was wrong, but because the register was the wrong tier for it.

After:
> ... A register entry asserting it was law would be the drafting process leaking into the world's record. It is deregistered for that reason and for no other: the register was the wrong tier for it.

Reason: a "not X, but Y" reversal. "For that reason and for no other" already excludes every other ground, including the text's merit, so the negated clause adds nothing. The positive clause ("the wrong tier") is kept word for word. The first three sentences are unchanged.

Confirmed unchanged: terms ("world canon", "register", "gauntlet", "advocacy review", "zero-fail threshold", "adjudications", "drafting process", "tier"); qualifiers ("only", "for no other", "in world"); conditional "would be"; numbers 1–4 and 3–2.

### E3: "Why these two left the register", paragraph 3 (line 173)

Before:
> ... A civilization that quietly deleted its drafts would be claiming a straighter line than it walked — but a civilization that filed its drafts as law would be claiming a history it did not have. The archive keeps both honest by keeping them apart.

After:
> ... A civilization that quietly deleted its drafts would be claiming a straighter line than it walked — but a civilization that filed its drafts as law would be claiming a history it did not have.

Reason: cut the aphorism closer. It restates the rule of keeping drafts off the register but preserving them, which the page already states in the banner ("the archive keeps what it drafted, including what it withdrew"), in this paragraph ("preserved in the drafting archive") and in E2 ("the wrong tier"). Its "both" also had no clear antecedent. The rest of the paragraph is unchanged, and it keeps one em-dash.

Confirmed unchanged: terms ("drafting archive", "briefs", "in perpetuity", "commit", "register"); both "would be claiming" conditionals; qualifier "quietly"; no numbers.

## Claims ledger (verbatim from the copy; 15 words or fewer)

| ID | Claim / number / citation | Quote in copy |
|---|---|---|
| E1-1 | Both texts are reproduced verbatim as engraved | `Both texts are reproduced verbatim as engraved.` |
| E1-2 | Cross-references resolve to live targets where they exist | `Cross-references inside them resolve to their live targets where those still exist` |
| E1-3 | The words themselves are unchanged | `the words are unchanged.` |
| E1-4 | The one-line status history is archive-authored | `The one-line history above each text is authored for this archive` |
| E1-5 | The status history is not statute text | `and is not part of the statute.` |
| E2-1 | The register is world canon | `The register is world canon` |
| E2-2 | The register carries institutional decisions | `it carries what the civilization's own institutions decided.` |
| E2-3 | The LP-074 enactment never happened in world | `LP-074 recorded an enactment that, in world, never happened` |
| E2-4 | Gauntlet result 1–4 | `the petition it engraved failed its gauntlet 1–4` |
| E2-5 | Advocacy review 3–2 | `was affirmed only to 3–2 on advocacy review` |
| E2-6 | Short of the zero-fail threshold at both adjudications | `short of the zero-fail threshold at both adjudications.` |
| E2-7 | Registering it would leak drafting into the world record | `A register entry asserting it was law would be the drafting process leaking` |
| E2-8 | (cont.) world's record | `into the world's record.` |
| E2-9 | The sole ground for deregistration (covers the removed merit disclaimer) | `It is deregistered for that reason and for no other` |
| E2-10 | Wrong tier (positive clause kept) | `the register was the wrong tier for it.` |
| E3-1 | Nothing is erased | `Nothing here is erased.` |
| E3-2 | The register interval is preserved | `The interval in which these texts sat in the register is preserved` |
| E3-3 | ...in the drafting archive | `in the drafting archive` |
| E3-4 | The briefs publish in perpetuity | `the briefs that argued them publish in perpetuity` |
| E3-5 | The engraving commits stand | `every commit that engraved them stands.` |
| E3-6 | Deleting drafts would overstate a straight line | `A civilization that quietly deleted its drafts would be claiming a straighter line` |
| E3-7 | (cont.) | `than it walked` |
| E3-8 | Filing drafts as law would claim a false history | `a civilization that filed its drafts as law would be claiming a history` |
| E3-9 | (cont.) | `it did not have.` |
| P1-1 | Keep-and-separate rule survives elsewhere (covers the E3 cut) | `they are kept because the archive keeps what it drafted, including what it withdrew.` |
| P1-2 | Drafting designations are not register numbers (unchanged banner) | `074 and 075 below are drafting designations, not the later official register numbers` |

## Frozen pins (verified byte for byte against the raw copy by the node check, same occurrence count as HEAD)

- `The engraved schedule is 50% / 25% / 12.5% / 6.25% top marginal above $10,000,000 annually, layer-mapped as before.` (check-canon (b), LP-074 §1)
- `top marginal rates track institutional need, not posture.` (check-canon (b), LP-075 §1)
- `Drafting designation LP-074 (process record — never registered in-world)` plus its LP-075 twin (check-canon (b2), guard-mutation probe)
- `The register’s LP-074 is` followed by tags and then RATIFY-TAX-50-II (check-canon (b2) regex)
- `id="lp-074"` anchor (and `#lp-074` self-link in LP-075 §3)

## Flags

1. JUDGMENT (E2): I dropped the explicit merit disclaimer "not because the text was wrong". I read "for that reason and for no other" as already excluding it. If Jason reads the disclaimer as load-bearing (that deregistration is not a verdict on the text), restore the clause exactly as it was.
2. JUDGMENT (E3): I cut the closer "The archive keeps both honest by keeping them apart." The keep-apart rule survives in P1-1, E3-2/E3-3 and E2-10. Restore it if the closing line is wanted as a section summary.
3. DOCTRINE, left unchanged and not resolved: E3 frames the drafts as the civilization's own ("A civilization that quietly deleted its drafts ... filed its drafts as law"). The banner classes the same texts as "drafting history, out-of-world authorship" (R13 two-tier). The page is Process tier and exempt from the layer guard, so this is only a possible tier blur.
4. PRECISION, low severity, left unchanged: the banner says "the separate official LP-074 certified both schedules in 2294". The register (law-polling.html #lp-074) credits certification to the 2294 Path 2 record (Schedule A) and the Lower Incidence audit (Schedule B), both under LP-074.
5. TYPOGRAPHY, outside clarity scope and not edited: the framing prose uses straight apostrophes ("civilization's", "world's"), while the pinned disambiguation header uses a curly one ("register’s").
6. DECLINED candidates, left exactly as written:
   - Banner "drafting designations, not the later official register numbers": the negation carries the R15 disambiguation.
   - "Why" paragraph 2 "Standing on its own it is not a petition outcome at all; it is doctrine": the negation explains why it left the register.
   - "Why" paragraph 2 opener "the opposite problem and the same fix": "same fix" carries the deregistration claim.
   - Banner "they are kept because the archive keeps what it drafted, including what it withdrew": this is the stated reason for keeping the texts.
   - The lede, the disambiguation header, both status-history lines, all statute texts and the vacatur annotation: frozen or clean.
