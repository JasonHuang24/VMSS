# Prose lift 25.3.1, patch wp2: whitepaper §12–22 (strict mode)

This is a strict, clarity-only pass on `whitepaper.html`, sections 12 through 22, made against main at 23f6f43 (v25.3.0, which already carries the §1–11 lift). The range runs from `<h2>12. Economic Model: Taxation` up to, but not including, `<h2>23. Military Posture`. The edits are in the copy in this folder; the live `whitepaper.html` is untouched and still equals `git show HEAD:whitepaper.html`. Everything before the `<h2>12.` marker and everything from the `<h2>23.` marker onward is byte-identical to HEAD, and inside the range only the 21 elements listed below changed. The §23–34 patch comes next.

Markers (checked by `wp2-verify.mjs`):
- Text inside ⟦⟧ is the before text, as raw source. It must appear in the original and must not appear in the copy.
- Text inside ⟪⟫ is the after text, as raw source. It must appear in the copy.
- Text inside «» is a claims-ledger quote, as rendered text. It must appear in the copy and be 15 words or fewer.

**Frozen strings checked before editing.** Every guard in `tools/check-canon.mjs` and `tools/test-canon-guard-mutations.mjs` that reads `whitepaper.html` was checked:
- the Trajectory Doctrine string and its mutation find (line 882);
- the LP-070 standing-gate, 36-month-window and prohibited-substitution patterns, and the "122.4% aggregate dividend coverage" / "101.1% at the weakest month" figures (lines 884 and 935);
- the exact-cascade pattern and the stale-rate (`forbiddenCurrent`) pattern (line 877);
- the tier-claim guard, the founder ruling/override and reviewer-seat layer guards, the stale "five currencies" check, the duplicate-id check, the LP deep-link resolution check (and its `law-polling.html#lp-0` mutation) and the link-integrity guard.

Lines 877, 882, 884 and 935 were left alone entirely. No edit touches an attribute, an href or an id. The pinned strings still stand in the copy:
- «top marginal rates track demonstrated institutional need»
- «LP-070 remains the enacted standing future gate»
- «122.4% aggregate dividend coverage and 101.1% at the weakest month»
- «trailing 36-month window, with no single month below 100%»
- «tax receipts, Lower-layer receipts, SCM recirculation, private velocity, backfill»
- «LP-074's exact 50 / 25 / 12.5 / 6.25 cascade»

**Quoted elsewhere.** Before editing, a distinctive 6–8 word run of every candidate sentence was searched for across all tracked `*.html` files. No live page quotes any edited sentence as whitepaper text; the only hits were earlier prose-lift copies under `docs-review/`. The search did find parallel prose on other pages. Where the parallel is Charter or Code text in the same words, the whitepaper sentence was left alone (flag 2). The parallels near the edited sentences are noted per change below.

## whitepaper.html

### Changes (21 elements)

Eleven elements lose a sentence or clause that restates what the element already says. Ten change punctuation only: a dash pair becomes parentheses, commas or a colon, and the words stay the same and in the same order. E10 is counted with the cuts but also carries one punctuation change (E10a), which adds "and". No sentence was otherwise reworded. No number, citation, defined term, rule modal, hedge, quotation, link or tag changed.

**E1. §12.1, lower-layer brackets (line 878).** Habit: stacked em-dashes (a two-word aside in a sentence that also carries a colon).
- Before: `⟦the layer's minimal tax base — Article XXVII's phrase — consists of⟧`
- After: `⟪the layer's minimal tax base (Article XXVII's phrase) consists of⟫`
- Reason: parentheses mark the attribution as an aside and keep the subject joined to its verb.
- Unchanged: "minimal tax base" (Article XXVII's wording, also at charter.html:426), "Article XXVII", "$10 million", "6.25%", "Article III.VII". The paragraph's remaining single dashes stay.

**E2. §12.2.1, the -2 gradient (line 898).** Habit: stacked em-dashes, where the closing dash made the verb hard to find.
- Before: `⟦Private monopolies on essential resources — water recyclers, power cells, medical services — price based on leverage⟧`
- After: `⟪Private monopolies on essential resources (water recyclers, power cells, medical services) price based on leverage⟫`
- Reason: after the closing dash, "price" reads as a noun. With parentheses it is clearly the verb.
- Unchanged: "PPG 1.8–2.5x Main", "$2,500/month", "substantially" and the three resources. The one remaining dash in the tourism sentence stays.

**E3. §12.5, SCM activation (line 925).** Habit: stacked em-dashes.
- Before: `⟦garnishing activates uniformly — no floor, no exemptions — until the aggregate⟧`
- After: `⟪garnishing activates uniformly (no floor, no exemptions) until the aggregate⟫`
- Reason: a four-word gloss on "uniformly". Parentheses keep "until" attached to "activates".
- Unchanged: the phrase "no floor, no exemptions" as the Charter words it (Art. III.VII), "90-day", "24-month", "only", "UBI and PJS", "Article XXVII". systems.html uses the parallel form "with no floor and no exemptions".

**E4. §14.1 (line 973).** Habit: a thesis closer restating the rule.
- Before: `⟦not from the substance itself. The civilization does not criminalize the input. It holds the user fully accountable for the output.</p>⟧`
- After: `⟪not from the substance itself.</p>⟫` The paragraph now ends here.
- Reason: this restates the sentence before it («Punitive layer reassignment follows from the severity and nature of the harm caused»). It also repeats §14's opening («The civilization governs outcomes, not inputs.») and the §14 callout.
- Unchanged: every mechanism sentence. The cut had no number, citation, rule modal or defined term. "fully" leaves with it; the accountability claim survives in the preceding sentence and the §14 opening («hold the user accountable for whatever follows from it»).

**E5. §15, implant introduction (line 985).** Habit: an aphorism closer.
- Before: `⟦depends on the implant to function. Without it, VMSS is a set of interesting ideas. With it, VMSS is an operational architecture.</p>⟧`
- After: `⟪depends on the implant to function.</p>⟫` The paragraph now ends here.
- Reason: the with/without pair restates the dependency the sentence before it has just stated.
- Unchanged: «load-bearing technology of the civilization», all seven roles and the five-system list (its dash pair wraps seven words and stays; flag 4). "without" drops once, as a word in the cut sentence and not as a hedge.

**E6. §16.1, LP-056 exposure (line 1010).** Habit: stacked em-dashes, where the closing dash blurred what "never" attaches to.
- Before: `⟦optional restored privileges &mdash; family contact, MGD re-entry, reduced supervision &mdash; never as a triggering condition⟧`
- After: `⟪optional restored privileges (family contact, MGD re-entry, reduced supervision), never as a triggering condition⟫`
- Reason: with parentheses, "never as" clearly contrasts with "only toward".
- Unchanged: "LP-056", "may", "only", "never", "cannot", "prohibited outright", "may not" and the three permitted forms. law-polling.html:2008 carries a different (four-item) list inside the LP-056 record, which was not touched.

**E7. §17, backup-vessel introduction (line 1026).** Habit: an aphorism closer.
- Before: `⟦no approximate reconstruction. The citizen returns whole or does not return. The binary⟧`
- After: `⟪no approximate reconstruction. The binary⟫`
- Reason: this repeats the sentences just before it («Revival is binary: full fidelity or revival failure» and «There is no partial revival»).
- Unchanged: the founding line (quoted, still in its dash pair; flag 2), "Revival is binary" and the alive/dead analogy.

**E8. §17, three continuities (line 1027).** Habit: stacked em-dashes.
- Before: `⟦Continuity doctrine binds primarily to ledger continuity — institutional record is what VMSS guarantees — while biological⟧`
- After: `⟪Continuity doctrine binds primarily to ledger continuity: institutional record is what VMSS guarantees, while biological⟫`
- Reason: the pair split the three "is what" clauses (VMSS guarantees, reality provides, technology delivers). The colon introduces all three as one explanation.
- Unchanged: "primarily" and all three continuity terms. Charter Art. IV's sentence («binds primarily to ledger continuity») ends at that point, so the words it shares with the whitepaper are unchanged.

**E9. §17.1.2, implant-removal failure mode (line 1050, `<li>`).** Habit: an aphorism closer.
- Before: `⟦death without a current backup is death without revival. Removal is a personal choice with a permanent consequence.</li>⟧`
- After: `⟪death without a current backup is death without revival.</li>⟫`
- Reason: the item has already said that removal is voluntary («voluntary and removable at any time») and that death without a backup is final.
- Unchanged: the item's bold label and its first two sentences. The cut had no number, citation or modal.

**E10. §17.1.3, revival-failure finality (line 1062).** Three edits.
- E10a. Habit: stacked em-dashes.
  - Before: `⟦<p>When a revival attempt fails &mdash; at any rate, in any layer &mdash; the citizen is permanently dead.⟧`
  - After: `⟪<p>When a revival attempt fails, at any rate and in any layer, the citizen is permanently dead.⟫`
  - Reason: commas keep the scope phrase in the main line of the sentence (parentheses would have played it down). "and" joins its two halves.
- E10b. Habit: stock filler.
  - Before: `⟦That refusal is structurally important. It keeps the architecture from sliding⟧`
  - After: `⟪That refusal keeps the architecture from sliding⟫`
  - Reason: the first sentence only announced the second. "That refusal" still refers back to «The architecture refuses to produce the template body».
- E10c. Habit: aphorism closers restating the element.
  - Before: `⟦later duplicate-identity claims. The death is final. The record remembers them. Each such failure⟧`
  - After: `⟪later duplicate-identity claims. Each such failure⟫`
  - Reason: "The death is final" repeats the paragraph's first sentence («the citizen is permanently dead»). "The record remembers them" repeats «Their record persists in the institutional archive (§17.4)» three sentences earlier.
- Unchanged: "Article IV", "§17.2", "§17.4", "Article XXIII", "one-in-a-million", "not an absolute one" and the template-destruction rule.

**E11. §17.1.4, implant replacement (line 1065).** Habit: aphorism closers.
- Before: `⟦implant hardware itself. Scheduled replacement means the gap is covered. Unsupervised loss means the link is severed.</p>⟧`
- After: `⟪implant hardware itself.</p>⟫` The paragraph now ends here.
- Reason: these repeat «The engineered coverage gap is zero», the emergency-extraction sentence and «an infrastructure guarantee the architecture extends to supervised procedures».
- Unchanged: "zero", "§17.1.2" and "standard rate".

**E12. §17.1.5, black-market revival (line 1068).** Habit: stacked em-dashes.
- Before: `⟦In -3 the flag records without triggering enforcement — kidnapping is not a federal-floor trigger — but the record survives the victim,⟧`
- After: `⟪In -3 the flag records without triggering enforcement (kidnapping is not a federal-floor trigger), but the record survives the victim,⟫`
- Reason: this six-word aside gives the reason for the preceding clause, so parentheses fit it. The change also stops a dash sitting against a minus sign.
- Unchanged: "LP-080", "§17.1.6", "Article XVIII", "§17.1.3", "§28.0", the quoted "no gap," and the other two dash constructions (a 15-word residual gloss and a single dash). laws.html:1434 and law-polling.html:2613 word the -3 rule differently and were not touched.

**E13. §17.3.1, authorized bailout (line 1081).** Habit: stacked em-dashes (and a dash against a minus sign).
- Before: `⟦enforcement density is thin &mdash; primarily -2 and -3 &mdash; where drone rescue⟧`
- After: `⟪enforcement density is thin (primarily -2 and -3), where drone rescue⟫`
- Reason: parentheses keep "primarily" scoped to the layer list, and "where drone rescue…" still modifies "layers".
- Unchanged: "primarily", "cannot", "only" and "no third party, remote operator, or institutional body".

**E14. §17.3.1, bailout vs. kill switch (line 1084).** Habit: an aphorism closer.
- Before: `⟦no external authorization path. Different authorities, different triggers, different purposes. They share⟧`
- After: `⟪no external authorization path. They share⟫`
- Reason: the fragment lists differences the sentence before it has just spelled out (federal, externally activated, presidential authorization versus individual self-rescue). "They" still refers to both instruments.
- Unchanged: "Article XXV", "kill switch" and "otherwise unrelated instruments".

**E15. §17.4, archive (line 1087).** Habit: aphorism closers.
- Before: `⟦every resident it ever governed. Descent does not erase. Death does not erase. The record is the record.</p>⟧`
- After: `⟪every resident it ever governed.</p>⟫` The paragraph now ends here.
- Reason: the three closers restate the paragraph's opening («Death ends the person. It does not end the record.»), «The data itself is not wiped» and the non-expungeability sentence, which already names -3 relatives.
- Unchanged: all four Article citations, «non-expungeable» and every "may"/"cannot" rule. The opening aphorism stays because it states the thesis.

**E16. §19, enforcement modes (line 1133).** Habit: a "not X, but Y" reversal where the negation adds nothing.
- Before: `⟦The division is not arbitrary — it reflects the fundamentally different⟧`
- After: `⟪The division reflects the fundamentally different⟫`
- Reason: the positive clause makes the point, and "not arbitrary" answers no objection the paragraph raises.
- Unchanged: both mode names, "+1 Sanctuary", "cannot" and "Main Layer".

**E17. §19.2 (line 1141).** Habit: stacked em-dashes.
- Before: `⟦The entire chain — from act to reassignment — can complete in minutes.⟧`
- After: `⟪The entire chain, from act to reassignment, can complete in minutes.⟫`
- Reason: this four-word aside only needs commas.
- Unchanged: "can", "minutes", «arrival in seconds, not minutes» (single dash kept), and the no-trial list.

**E18. §20.4 (line 1263).** Habit: redundant restatement.
- Before: `⟦automatic exclusion on violation &mdash; nothing beyond that. The voluntary⟧`
- After: `⟪automatic exclusion on violation. The voluntary⟫`
- Reason: "sole" already says there is nothing beyond it.
- Unchanged: «sole operational power», the four Article/authority routings and both "cannot" rules. The Code's twin (laws.html:2457) follows «sole operational power» with a different continuation.

**E19. §21.4 (line 1304).** Habit: redundant restatement after a dash.
- Before: `⟦on MGDs themselves as units &mdash; the state enforces against persons, not against registered communities.</p>⟧`
- After: `⟪on MGDs themselves as units.</p>⟫` The paragraph now ends here.
- Reason: the cut clause restates the clause it follows (individual conduct, not the MGD as a unit). "Registered" adds nothing new here, since the paragraph opens by denying any registry.
- Unchanged: "LP-078", "§21.3", «deliberately blind» and the three "does not" commitments.

**E20. §22.6, unimplanted pregnancy (line 1337).** Habit: stacked em-dashes.
- Before: `⟦unlinked fetus &mdash; severity high, reversibility zero &mdash; the standard murder consequence applies.⟧`
- After: `⟪unlinked fetus (severity high, reversibility zero), the standard murder consequence applies.⟫`
- Reason: the paragraph already gives the same four-word axis reading in parentheses under Article XIV. The second instance now takes the same form.
- Unchanged: "Article XIV", "three-axis", "§25.8" and both instances of the axis reading. The doctrine is unchanged: this edit changes punctuation only.

**E21. §22.7, AGI embodiment (line 1344).** Habit: stacked em-dashes, where the closing dash made "enabling" attach loosely.
- Before: `⟦The body plan is human — facial expression, gestural range, proportions — enabling⟧`
- After: `⟪The body plan is human (facial expression, gestural range, proportions), enabling⟫`
- Reason: with parentheses, "enabling" clearly takes "the body plan" as its subject. world.html:1191 already uses the parenthetical form for the same list.
- Unchanged: every marker, the transparency sentence (single dash kept) and «the civilian default».

### Claims ledger

Every claim, number and citation in each edited element, quoted from the copy.

**Line 878 (§12.1)**

| Claim | Verbatim quote |
|---|---|
| Brackets layer-administered | «Below the top threshold, bracket structure is layer-administered.» |
| -3 degenerate by design | «In -3 the structure is degenerate by design» |
| $10 million, untaxed | «earned income below the $10 million threshold is untaxed» |
| Minimal tax base, Art. XXVII | «the layer's minimal tax base (Article XXVII's phrase) consists of» |
| 6.25% plus remittances | «the 6.25% top marginal on its high earners plus the corporate remittances» |
| Settlement-layer collection | «Collection in the lower layers operates at the settlement layer, not through surveillance» |
| Central bank clears | «the central bank clears every currency issuance, conversion, and cross-district corporate settlement» |
| Remitting entities | «corporations, market associations, and high-earner accounts at settlement» |
| No fiscal monitoring, III.VII | «The implant plays no fiscal-monitoring role; Article III.VII's monitoring boundary holds.» |
| Cash-analog untaxed | «Cash-analog activity that never clears is real and untaxed» |
| Priced leakage | «a leakage the architecture prices as part of the lower layers' minimal-base design» |

**Line 898 (§12.2.1, -2)**

| Claim | Verbatim quote |
|---|---|
| PPG range | «-2 Violent Offense — PPG 1.8–2.5x Main.» |
| Population | «Population significantly smaller than -1.» |
| $2,500 UBI, scarcity | «UBI at $2,500/month and a proportionally reduced money supply create genuine scarcity conditions» |
| Advantage offset | «the purchasing power advantage is substantially offset by the economics of territorial control» |
| Monopolies | «Private monopolies on essential resources (water recyclers, power cells, medical services)» |
| Leverage pricing | «price based on leverage rather than market competition» |
| Tribute, protection | «Tribute payments to territorial crews, protection costs» |
| Consumes benefit | «consume a significant portion of the scarcity benefit» |
| Tourism | «Tourism is less frequent than -1 but concentrated in organized districts» |
| Venues | «augmentation studios, private security zones, and frontier entertainment» |
| Uneven inflation | «creating localized inflation that does not distribute evenly across the layer» |
| Upper end | «Remote contested districts with minimal economic activity sit near the upper end of the range.» |
| Lower end | «Organized districts with visitor traffic and monopoly pricing sit near the lower end.» |

**Line 925 (§12.5)**

| Claim | Verbatim quote |
|---|---|
| 90-day average | «The 90-day rolling average prevents coordinated capital movement from gaming activation timing.» |
| Uniform activation | «garnishing activates uniformly (no floor, no exemptions) until the aggregate drops below threshold» |
| Returns to ADT as UBI | «All garnished funds return to the Automation Dividend Treasury as UBI.» |
| Self-terminating loop | «The loop is self-terminating: idle capital becomes everyone's civilizational dividend.» |
| -2/-3 scope, only | «In -2 and -3, the SCM applies only to savings attributable to VMSS-distributed funds» |
| UBI/PJS, 24-month window | «(UBI and PJS), using a 24-month rolling pro-rata window for attribution» |
| No reach into private gains | «VMSS does not reach into private economic gains in lower layers» |
| Household exception, Art. XXVII | «One exception operates household-attached: families above the Article XXVII replenishment threshold» |
| Escalated rate, detached | «pay the mandate at their escalated rate continuously, detached from the district trigger» |
| Duration | «for as long as the escalation applies» |

**Line 973 (§14.1)**

| Claim | Verbatim quote |
|---|---|
| Standard path | «Substance-impaired harm to third parties enters the standard criminal escalation path.» |
| Detection | «Implant detection identifies intoxication state and behavioral causation at the moment of a harmful act.» |
| Enforcement responds | «Autonomous enforcement responds.» |
| Impairment weighed | «Judicial review weighs impairment as a contextual factor in assessing culpability» |
| Not an exit | «not as a mitigating exit from consequence» |
| Harm, not substance | «Punitive layer reassignment follows from the severity and nature of the harm caused» |
| (continued) | «not from the substance itself.» |

**Line 985 (§15)**

| Claim | Verbatim quote |
|---|---|
| Load-bearing | «The technoneural implant is the load-bearing technology of the civilization.» |
| Roles (1) | «identity anchor, intent monitor, failsafe device, personal AR dashboard» |
| Roles (2) | «backup vessel sync point, STI ledger integration node, and international passport» |
| Dependents (1) | «Every other system described in this whitepaper — STI scoring, enforcement, revival» |
| Dependents (2) | «layer mobility, governance — depends on the implant to function.» |

**Line 1010 (§16.1, LP-056)**

| Claim | Verbatim quote |
|---|---|
| May be offered | «Neural exposure to a victim's perspective may be offered as restorative eligibility work» |
| Hard boundary, LP-056 | «draws a hard boundary against it becoming mind-access as punishment (LP-056)» |
| Compulsory access prohibited | «Compulsory access to a victim's memory without the victim's explicit consent is prohibited outright.» |
| Refusal no consequence | «refusal to participate cannot independently trigger STI loss, punitive reassignment, or criminal consequence» |
| Positive evidence only | «completion may count as positive evidence only toward optional restored privileges» |
| Privileges | «(family contact, MGD re-entry, reduced supervision)» |
| Never a trigger | «never as a triggering condition for any baseline right» |
| Three forms | «Three exposure forms are permitted: victim-consented replay, synthetic reconstruction» |
| Synthetic defined | «algorithmically generated without the victim's actual memory» |
| Offender dive | «an offender-authored accountability dive reviewed by a therapeutic panel» |
| Corroborative only | «Cognition remains corroborative only; the implant may not infer hidden thoughts from session content» |
| Inference barred | «any inference attempt is barred at the AI-governance evaluation layer» |

**Line 1026 (§17)**

| Claim | Verbatim quote |
|---|---|
| Fourth founding line | «The fourth founding line» |
| Line text, operationalized | «no life is ended, no life is absolved — is operationalized through backup vessel technology» |
| Encrypted backups | «Periodic encrypted mind-state backups, synchronized through the implant» |
| Fabrication on destruction | «are fabricated into new biological vessels when the original body is destroyed» |
| Binary | «Revival is binary: full fidelity or revival failure.» |
| No partial | «There is no partial revival, no degraded copy, no approximate reconstruction.» |
| Mirrors identity | «The binary mirrors how identity already works in biological and legal reality» |
| Analogy (1) | «a person is alive or dead, a vegetative patient is alive» |
| Analogy (2) | «a braindead body is not» |
| No case-by-case | «no civilization adjudicates partial personhood case by case» |

**Line 1027 (§17)**

| Claim | Verbatim quote |
|---|---|
| Three layers | «Three layers of continuity operate distinctly and should not be conflated.» |
| Biological | «Biological continuity refers to the uninterrupted developmental or physiological substrate of an entity» |
| Same organism | «the same organism across time, regardless of whether any institution is observing it» |
| Ledger | «Ledger continuity refers to the institutional record that tracks the entity's behavioral history» |
| Ledger contents | «STI, layer placement, and standing across the civilization» |
| Revival | «Revival continuity refers to the backup-vessel infrastructure link that would reconstitute the entity» |
| Can come apart | «These three can come apart» |
| Fetus example | «a fetus during an implant-failure interval is biologically continuous but ledger-broken» |
| Removal example | «a resident who removes the implant is biologically continuous but has severed revival linkage» |
| Archive example | «an archived deceased resident has preserved ledger continuity without biological or revival continuity» |
| Binds primarily | «Continuity doctrine binds primarily to ledger continuity: institutional record is what VMSS guarantees» |
| Reality, technology | «biological substrate is what reality provides and revival infrastructure is what technology delivers» |
| Each at its level | «the architecture honors each at its own level without treating them as interchangeable» |

**Line 1050 (§17.1.2, implant removal)**

| Claim | Verbatim quote |
|---|---|
| Label | «Implant removal.» |
| Severs sync | «A citizen who removes their implant severs the backup vessel sync.» |
| Voluntary, removable | «The implant is voluntary and removable at any time» |
| No backups | «removal means no mind-state backups are being captured» |
| No revival | «death without a current backup is death without revival.» |

**Line 1062 (§17.1.3)**

| Claim | Verbatim quote |
|---|---|
| Scope | «When a revival attempt fails, at any rate and in any layer» |
| Permanently dead | «the citizen is permanently dead» |
| No second attempt | «The architecture does not offer a second attempt through template-based body fabrication.» |
| Template not the citizen | «A new body produced from genetic template is not the citizen who died» |
| Separate person | «a separate person with the same DNA and none of the continuity» |
| Article IV | «the Article IV technology-and-continuity provision binds to» |
| Nothing transfers | «none of these transfer to a template-fabricated body» |
| Reason | «because the mind-state transfer is precisely what failed» |
| §17.2 category violation | «refuses to produce the template body as a category violation under §17.2's continuity-not-innocence framing» |
| No history, placement | «a person with no institutional history, no layer placement earned through demonstrated conduct» |
| No relationships | «no prior relationships the civilization could recognize as continuing» |
| Refusal prevents immortality | «That refusal keeps the architecture from sliding into true immortality through material substitution» |
| Graduated | «revival is a graduated protection, not an absolute one» |
| One-in-a-million | «Sanctuary residents operating at the one-in-a-million failure rate» |
| Residency lapses | «The Sanctuary residency of a revival-failed citizen lapses at the moment of failure.» |
| Archive, §17.4 | «Their record persists in the institutional archive (§17.4).» |
| Template destroyed | «Their template, if one exists in pre-fabrication queue, is destroyed» |
| Purpose | «to foreclose the possibility of later duplicate-identity claims» |
| Article XXIII | «logged against the Article XXIII zero-leakage aspiration as an irreducible leakage event» |
| Tracked, not promised | «the architecture tracks without promising to eliminate» |

**Line 1065 (§17.1.4)**

| Claim | Verbatim quote |
|---|---|
| Relay handoff | «Routine implant replacement is performed through a synchronized relay handoff» |
| Facilities | «executed in institutional medical facilities» |
| Outgoing maintains sync | «The outgoing implant maintains mind-state synchronization until the incoming implant establishes its link» |
| Both active | «both hardware instances active during a controlled surgical window» |
| Facility holds data | «the facility's own backup infrastructure holds the citizen's mind-state data across the swap» |
| Zero gap | «The engineered coverage gap is zero.» |
| Mid-procedure death | «A citizen who dies mid-procedure in the facility is revived from the facility's held sync» |
| Standard rate | «through the origin-layer infrastructure at the standard rate» |
| Emergency extraction | «Emergency extraction outside institutional facilities» |
| Cases (1) | «trauma that destroys the implant before replacement, hardware failure in non-medical settings» |
| Cases (2) | «or voluntary removal without planned replacement» |
| Same severance, §17.1.2 | «produces the same continuity severance documented in §17.1.2's implant-removal failure mode» |
| Supervised only | «an infrastructure guarantee the architecture extends to supervised procedures» |
| Not universal | «not a universal property of the implant hardware itself.» |

**Line 1068 (§17.1.5)**

| Claim | Verbatim quote |
|---|---|
| Predictable black market | «The fabrication-proxy architecture leaves a predictable black market at its edge» |
| Hardware | «salvaged or smuggled backup-vessel hardware operating outside institutional infrastructure» |
| Examples | «portable units in -3's outskirt economies, captive-revival rigs run by criminal syndicates» |
| Fidelity | «fidelity well below institutional guarantee» |
| Cannot scale | «specifies why it cannot scale into a rival continuity infrastructure» |
| Three envelopes | «Three envelopes bound it.» |
| Sync only via implant | «a backup vessel synchronizes only through the citizen's implant link» |
| Signed | «each sync is signed against the civic ledger» |
| Unsigned claim | «carries an unsigned continuity claim that no layer's institutions, contracts, gates, or ledger standing recognize» |
| Person vs. citizen | «The person walks; the citizen, institutionally, does not.» |
| Duress flag | «the implant's involuntary-state telemetry flags coerced sync and captive revival to the federal floor» |
| Where the floor operates | «wherever the floor operates» |
| LP-080, §17.1.6 | «The flag also gates refusal-directive execution (LP-080, §17.1.6).» |
| -3 records only | «In -3 the flag records without triggering enforcement (kidnapping is not a federal-floor trigger)» |
| Record survives, Art. XVIII | «the record survives the victim, feeds Article XVIII network attribution» |
| Prices participation | «prices syndicate participation for every implanted actor whose proximity the ledger can corroborate» |
| Calibration cadence | «proxy-grade fidelity requires institutional calibration cadence» |
| Self-limiting | «Uncalibrated units degrade toward failure rates that make captivity economics self-limiting» |
| Captor cannot prevent | «the captive asset dies at rates the captor cannot prevent» |
| §17.1.3 finality | «each failed revival under §17.1.3 finality is unrecoverable» |
| Residual | «low-fidelity gray-market revival among -3 voluntary residents who accept the odds» |
| Tolerated | «is the tolerated remainder, consistent with the layer's design posture» |
| §28.0 answer | «The envelope answer follows §28.0: not "no gap," but the next envelope prices the gap» |
| At scale | «beyond exploitation at scale» |

**Line 1081 (§17.3.1)**

| Claim | Verbatim quote |
|---|---|
| Citizen command | «Authorized bailout is a citizen-initiated implant command that triggers self-death» |
| Forced revival site | «forces backup vessel revival in a sovereign VMSS fabrication facility» |
| Purpose | «protection against coercive captivity or torture by private actors» |
| Thin layers | «in layers where institutional enforcement density is thin (primarily -2 and -3)» |
| Rescue gap | «where drone rescue cannot reach the citizen in time» |
| Self-rescue | «The mechanism is individually-activated self-rescue, not an externally-triggered instrument» |
| No third party | «no third party, remote operator, or institutional body can authorize a bailout» |
| Own command only | «The implant accepts only the citizen's own command.» |

**Line 1084 (§17.3.1)**

| Claim | Verbatim quote |
|---|---|
| Distinct, Art. XXV | «Authorized bailout is structurally distinct from the Article XXV national-scale kill switch» |
| Both implant-level | «despite both being implant-level termination mechanisms» |
| Kill switch | «The kill switch is an externally-activated federal instrument against implanted threats» |
| Authority | «under national military command authority with presidential authorization» |
| Bailout | «authorized bailout is individually-activated self-rescue with no external authorization path» |
| Shared technology | «They share the underlying technology (hardware-level implant termination)» |
| Shared aftermath | «the same binary-revival aftermath, but are otherwise unrelated instruments.» |

**Line 1087 (§17.4)**

| Claim | Verbatim quote |
|---|---|
| Thesis | «Death ends the person. It does not end the record.» |
| Indefinite | «preserved in the institutional archive indefinitely» |
| Contents (1) | «The implant ledger, STI history, Meritboard standings, reassignment record, district assignment» |
| Contents (2) | «biographical data of every resident who ever existed» |
| Not property | «The archive is civilizational infrastructure, not personal property» |
| Art. XVIII, XX | «network attribution under Article XVIII, accountability under Article XX» |
| Art. VIII | «parentage verification under Article VIII's standing relocation right» |
| Research | «the historical research the civilization conducts on its own conduct over long horizons» |
| Death modes | «by ordinary death, by revival failure, or by terminal severance in -3» |
| Status flag | «the ledger's active-status flag transitions from "active" to "deceased."» |
| Not wiped | «The data itself is not wiped.» |
| Family may view | «Upper-layer family members may view a deceased relative's public record» |
| Viewable fields | «reassignment date, offense record, district of last residence, date of death» |
| Cannot revive | «They cannot revive, contact, or reconstitute the deceased.» |
| Non-expungeable | «The record is non-expungeable» |
| No rehabilitation | «no descendant may rehabilitate an ancestor's standing post-hoc» |
| No purge | «no family may purge a -3 relative from the archive» |
| No alteration | «no subsequent conduct by survivors alters the deceased's final ledger» |
| Commitment | «The civilization commits to remembering every resident it ever governed.» |

**Line 1133 (§19)**

| Claim | Verbatim quote |
|---|---|
| Two modes | «VMSS divides enforcement into two modes: pre-intervention in high-trust environments» |
| Post-intervention | «post-intervention in Main and lower layers» |
| Trust profiles | «The division reflects the fundamentally different trust profiles of each population.» |
| Sanctuary | «Residents of +1 Sanctuary have demonstrated sustained non-harm.» |
| Earned | «They have earned an environment where harmful acts cannot complete.» |
| Main | «Residents of Main Layer have not yet demonstrated that threshold.» |
| Agency | «Their agency is preserved, and consequence follows if they misuse it.» |

**Line 1141 (§19.2)**

| Claim | Verbatim quote |
|---|---|
| Sequence | «Once an act occurs, the system responds in sequence» |
| Recording | «the implant records the event with full contextual data» |
| Data | «(intent trajectory, motor execution, environmental conditions)» |
| Drones, seconds | «Medical drones deploy to the victim — arrival in seconds, not minutes.» |
| Field care | «Hospital-grade stabilization occurs in the field.» |
| Revival | «If the victim dies and backup vessel infrastructure is operational, revival initiates.» |
| Perpetrator | «The perpetrator is identified through implant telemetry, sedated if necessary via nano-release» |
| Transport, reassignment | «transported by enforcement drone, and reassigned downward based on severity assessment» |
| Minutes | «The entire chain, from act to reassignment, can complete in minutes.» |
| No trial | «There is no trial, no plea bargain, no bail hearing.» |
| Evidence, assessment | «The evidence is non-repudiable. The assessment is automated.» |
| Consequence | «The consequence is immediate and permanent.» |

**Line 1263 (§20.4)**

| Claim | Verbatim quote |
|---|---|
| Membership, not governance | «SADs are metric-gated voluntary membership domains. They are not governance entities.» |
| Load-bearing scope | «The scope distinction is load-bearing because it defines what a SAD can and cannot do» |
| No redistribution, tax | «SADs do not redistribute wealth among members, impose internal taxation» |
| No arbitration, quasi-government | «arbitrate binding disputes with enforcement authority, operate quasi-governmental functions» |
| No coercion | «or exercise any coercive power over members or non-members» |
| Standard routing | «All governance-scale operations within Sanctuary route through standard VMSS mechanisms» |
| Art. XXVIII | «Article XXVIII regulatory law for district-scale rules» |
| Meritboard | «the Meritboard for competence-based role selection» |
| Supreme Court | «the Supreme Court for novelty arbitration» |
| Art. XXV | «federal law under Article XXV for cross-layer mandates» |
| Sole power | «A SAD's sole operational power is metric-gated admission and automatic exclusion on violation.» |
| Structural preserver | «The voluntary, revocable character of SAD membership is the structural preserver of this boundary» |
| Free exit | «members can leave at any time without consequence» |
| Cannot bind | «the SAD cannot prevent exit or impose binding obligations that outlast membership» |

**Line 1304 (§21.4)**

| Claim | Verbatim quote |
|---|---|
| Not indexed | «MGDs are not centrally indexed.» |
| No registry | «VMSS does not maintain a civilizational MGD registry» |
| No enumeration | «does not compile enumerations of MGD populations» |
| No surveillance | «does not surveil MGD membership as a governance operation» |
| Distinct commitment | «The state-non-surveillance commitment is distinct from general privacy» |
| General privacy | «general privacy says members of a specific MGD are not publicly tracked» |
| No state list | «the state itself does not maintain an authoritative list of which MGDs exist» |
| Counts, criteria | «how many members each carries, or what criteria each operates under» |
| Deliberately blind | «deliberately blind to MGD aggregate structure in steady state, even for administrative purposes» |
| LP-078 breach | «the one breach of that blindness is ordered rather than standing (LP-078)» |
| Floor binds, §21.3 | «Federal floor law still binds inside every MGD (per §21.3)» |
| Persons, not units | «federal enforcement operates on individual conduct within MGDs rather than on MGDs themselves as units.» |

**Line 1337 (§22.6)**

| Claim | Verbatim quote |
|---|---|
| Inversion | «The unimplanted-pregnancy scenario inverts the ordinary mitigation assumption.» |
| On VMSS soil | «An unimplanted visitor who terminates a pregnancy on VMSS soil» |
| Worst outcome | «faces the worst outcome the continuity provision was designed to prevent» |
| Permanent death | «the fetus actually dies permanently, without the backup-vessel reincarnation that resolves the typical case» |
| Art. XIV, three-axis | «does not reduce the act's classification under Article XIV's three-axis framework» |
| Axis reading (1) | «(severity high, reversibility zero); it removes the architecture's continuity grace» |
| No ledger no exemption | «The absence of a ledger does not place the actor outside the consequence architecture.» |
| §25.8 rule | «any unimplanted foreign national who commits a VMSS-classified crime on VMSS soil (§25.8)» |
| Jurisdiction, ledger opened | «the act falls under VMSS jurisdiction, a ledger is opened at adjudication» |
| Identical reassignment | «the perpetrator faces layer reassignment identical to any other perpetrator» |
| Axis reading (2) | «For the completed permanent death of an unlinked fetus (severity high, reversibility zero)» |
| Murder consequence | «the standard murder consequence applies.» |
| No deportation | «The civilization does not deport an unprocessed murder into foreign jurisdictions» |
| Local processing | «it processes the act under the jurisdiction where it occurred.» |

**Line 1344 (§22.7)**

| Claim | Verbatim quote |
|---|---|
| Human form, markers | «AGI citizens inhabit human-form embodiment with readily identifiable markers.» |
| Body plan | «The body plan is human (facial expression, gestural range, proportions)» |
| Social register | «enabling the full register of social engagement that mediates ordinary relationships» |
| Markers visible | «the markers are deliberate and visible rather than concealed» |
| Marker list | «distinctive iris geometry, neural-contact signatures at temple or jawline» |
| Insignia | «institutional insignia where appropriate» |
| No passing | «The civilization does not ask AGI to pass as human» |
| Visibly themselves | «participate in human social forms while being visibly themselves» |
| Transparency doctrine | «This transparency doctrine is continuous with the architecture's broader commitments» |
| Commitments (1) | «the implant records everything, the ledger is visible» |
| Commitments (2) | «the population knows what it is interacting with» |
| Other forms | «Other embodiment forms exist (purely virtual presences, distributed consciousness» |
| Synthetic bodies | «purpose-built synthetic bodies for specialized roles» |
| Default | «visibly-marked human-form is the civilian default.» |

### Word counts

Counts are of visible body text: tags, the head, and script and style blocks are excluded, and dashes are not counted as words.

| Element | Before | After |
|---|---|---|
| Line 878 (§12.1 lower-layer brackets) | 137 | 137 |
| Line 898 (§12.2.1 -2 gradient) | 141 | 141 |
| Line 925 (§12.5 activation) | 115 | 115 |
| Line 973 (§14.1) | 81 | 65 |
| Line 985 (§15 introduction) | 70 | 54 |
| Line 1010 (§16.1 LP-056) | 134 | 134 |
| Line 1026 (§17 introduction) | 102 | 94 |
| Line 1027 (§17 three continuities) | 163 | 163 |
| Line 1050 (§17.1.2 implant removal) | 50 | 41 |
| Line 1062 (§17.1.3) | 241 | 230 |
| Line 1065 (§17.1.4) | 150 | 136 |
| Line 1068 (§17.1.5) | 259 | 259 |
| Line 1081 (§17.3.1 bailout) | 87 | 87 |
| Line 1084 (§17.3.1 kill switch) | 71 | 65 |
| Line 1087 (§17.4) | 200 | 187 |
| Line 1133 (§19) | 71 | 67 |
| Line 1141 (§19.2) | 111 | 111 |
| Line 1263 (§20.4) | 146 | 143 |
| Line 1304 (§21.4) | 141 | 132 |
| Line 1337 (§22.6) | 173 | 173 |
| Line 1344 (§22.7) | 125 | 125 |
| **§12–22 range** | **19,219** | **19,110** (−109) |
| **Page** | **54,206** | **54,097** (−109) |

These are the figures `wp2-verify.mjs` prints on its INFO lines.

### Flags

1. **Sequencing.** This copy was made from HEAD, which already includes the v25.3.0 §1–11 edits, so it holds both patches. The §23–34 patch should start from the live page once this one ships, or be merged onto this copy. `wp2-verify.mjs` compares against `git show HEAD:whitepaper.html`, so it will fail by design once HEAD moves.
2. **Twin text left as the Charter or Code words it.**
   - §12.1, «Taxation was founded to carry three functions — revenue, anti-concentration, and trust —». The Code's law-summary (laws.html:1525) uses the same words and the same dash pair. The paragraph also sits under the guarded Trajectory Doctrine heading, so it was left alone.
   - §13.3, "The civilization does not prevent births — it prices them." is Charter Art. XXVII's sentence (charter.html:424), so it stays even though it restates the sentence before it.
   - §17, the fourth founding line keeps its dash pair, because the pair wraps the quoted line.
   - §18.8, "not a fine-print backdrop to the implant story but a load-bearing staple". This reversal adds little, but the Code (laws.html:1676) keeps "not a fine-print backdrop" in the same place. It was left so the two stay parallel. It could reasonably go either way.
3. **Guard-bearing lines untouched.** Lines 877 (cascade), 882 (Trajectory Doctrine), 884 (LP-070 gate and figures) and 935 (prohibited substitutions) were not edited at all. Line 881 is not guarded; it is covered by flag 2.
4. **Paired em-dashes mostly left.** 43 sentences in §12–22 carried two or more em-dashes before this pass; 32 still do (the verify script's sentence splitter, approximate). Pairs were converted only when:
   - the pair wrapped six words or fewer and was not twin text (E1, E3, E8, E10a, E12, E13, E17, E20);
   - the closing dash made the next word's role unclear (E2 "price", E6 "never as", E21 "enabling").

   The rest are glosses or lists of seven words or more, the same calibration as wp1 flag 4. Examples: the §12.2.1 -1 economy list, the wash-clearing gloss (§12.5), the residence-exemption list (§12.5), the §13.1 cost-curve list, the §15 five-system list, the TIP threshold gloss and LP-049 gate aside (§15.4), the §17.1.2 disruption list, the §17.1.4 extraction list, the LP-065 homicide classes and one-bit-flag list (§17.1.6), the §17.4 death-mode list, the §18.7 labour list, the §19.8 boundary-riding definition, the §19.10 error list, the LP-079 incidents list, the §19.11 mutual-combat list, the LP-078 boolean (§21.4, which also matches §4.4 as left in wp1), the §22.6 instrumentation list, the §22.7 fork and non-enrollment asides, and the §22.9 human-role list.
5. **Unpaired double dashes left.** In §16.1, the Neural Diving sentence carries one dash inside each of two separate parentheticals (Audience Mode, Pilot Mode). In §17.1.6, LP-065's residuals sentence carries two dashes in different semicolon clauses. In both, replacing a dash would move a clause's attachment inside a legal list, so they stand as written.
6. **Closers kept on purpose.** Each of these restates something, but either carries a frozen modal or qualifier or makes a claim nothing else in its element makes:
   - §12.1, "The elite market is real because retained income can be used. Dynastic hoarding remains structurally suppressed because unused wealth cannot leave the circulation architecture." This largely repeats §12.1's preceding paragraph, but it carries "can" and "cannot". It could reasonably go either way.
   - §12.4, "Pre-positioning does not shield assets from consequence." It anchors the term that §19.8's "Pre-positioning detection" depends on.
   - §12.6, "Earth-analogous capitalism is the natural expression…". It characterizes -3 and carries the hedge "natural".
   - §15.3, "Removing the implant removes the failsafe; it does not remove accountability." It is the section's only statement that removal removes the failsafe.
   - §17.2, "Continuity is the civilizational guarantee. Innocence is not." This is the section title's doctrine.
   - §17.3.1, "Bailout does not cheapen the moral contract; it only changes geography." It carries "only".
   - §19.1, "Pre-intervention is not control." It answers an objection.
   - §19.6, "Maximum autonomy, maximum variability, maximum private consequence." This restates the §19.4 table row but is the section's only summary of -3's posture. It could reasonably go either way.
   - §21.4, "The measurement reaches only where the floor has already failed, and only because it has." It carries "only" twice.
   - §21.4, "Both coexist because each serves what the other cannot." It carries "cannot".
   - §22.6, "The replacement link is forward-operating only". It carries "only".
7. **Callouts untouched.** Every `div.callout-principle` in the range is outside the editable element set. That includes restatement-heavy ones such as §17's continuity principle and §19's enforcement principle.
8. **Possible tension, left unchanged.** §17.3 says of -3 «Death is final without exception» and «No mechanism within -3 can restore the link». §17.1.5 names «low-fidelity gray-market revival among -3 voluntary residents» as «the tolerated remainder». The two can be read together: a gray-market body carries «an unsigned continuity claim» that no institution recognizes, so death stays final institutionally. But §17.3's "without exception" reads more absolute than §17.1.5's tolerated remainder.
9. **Citation notes, left unchanged (citations are frozen).**
   - §18.8 (line 1125) cites "(§28.x)", a placeholder-style reference. The target section exists as §28.0 "The Redundant Envelope Pattern".
   - §22.6 cites §25.8 for the rule governing «any unimplanted foreign national who commits a VMSS-classified crime on VMSS soil». §25.8 (Foreign Embassies) states the general principle (acts on VMSS soil fall under VMSS jurisdiction) through the ambassador case; §26.3 (Jurisdiction & Prosecution) may be the closer anchor.
10. **Hedge and negation counts.** Across the range, the cuts remove six uses of "not" (E4, E7, E15 ×2, E16, E19), one "fully" (E4) and one "without" (E5). None is a rule modal or a scope hedge on a surviving rule. The counts of shall, must, may, may not, cannot, can, only, unless, except, never, should and would are identical, and no defined term's count changed. `wp2-verify.mjs` asserts these exact deltas and fails on any other.
