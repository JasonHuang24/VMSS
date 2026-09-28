# Prose lift 25.3.0, patch wp1: whitepaper §1–11 (strict mode)

This is a strict, clarity-only pass on `whitepaper.html`, sections 1 through 11, made against main at 17f1386. The range runs from `<h2>1. Executive Summary` up to, but not including, `<h2>12. Economic Model: Taxation`. The edits are in the copy in this folder; the live `whitepaper.html` is untouched. Everything before §1 and everything from §12 onward is byte-identical to the original, and inside the range only the 29 elements listed below changed. Later patches cover §12–22 and §23–34.

Markers (checked by `wp1-verify.mjs`):
- Text inside ⟦⟧ is the before text, as raw source. It must appear in the original and must not appear in the copy.
- Text inside ⟪⟫ is the after text, as raw source. It must appear in the copy.
- Text inside «» is a claims-ledger quote, as rendered text. It must appear in the copy and be 15 words or fewer.

**Frozen strings checked before editing.** Every guard in `tools/check-canon.mjs` and `tools/test-canon-guard-mutations.mjs` that reads `whitepaper.html` was checked:
- the Trajectory Doctrine string (§12.1) and its mutation find;
- the LP-070 standing-gate, 36-month-window and prohibited-substitution patterns, and the "aggregate dividend coverage" figures (§12);
- the exact-cascade and stale-rate patterns on current surfaces;
- the LP deep-link resolution check and its `law-polling.html#lp-0` mutation;
- the stale "five currencies" check, the duplicate-id check, the World-tier layer guard (founder ruling/override, reviewer-seat names) and the link-integrity guard.

All of these sit outside §1–11 or in attributes, and no edit touches them. The pinned strings still stand in the copy:
- «top marginal rates track demonstrated institutional need»
- «LP-070 remains the enacted standing future gate»
- «aggregate dividend coverage»

**Quoted elsewhere.** Before editing, a distinctive 6–8 word run of every candidate sentence was searched for across all 137 tracked `*.html` files. No page quotes any edited sentence as whitepaper text. The search did turn up sentences that are the Charter's own text, and those were left alone (flag 3). It also found parallel prose on other pages, noted per change below.

## whitepaper.html

### Changes (29 elements)

Eighteen edits cut a sentence, clause or lead-in. Thirteen change punctuation only, keeping the same words in the same order; one of those (W6) also adds "which are" twice. No other sentence was reworded, and no number, citation, defined term, modal or hedge was altered.

**W1. §1, opening paragraph (line 361).** Habit: stacked em-dashes.
- Before: `⟦The Vertical Moral Stratification System (VMSS) — branded publicly as <strong>The Five Rings</strong> — is an enacted⟧`
- After: `⟪The Vertical Moral Stratification System (VMSS), branded publicly as <strong>The Five Rings</strong>, is an enacted⟫`
- Reason: two dashes wrapped a six-word aside in the page's first sentence. Commas carry it.
- Unchanged: "VMSS", "The Five Rings" (still bold) and all three replaced assumptions. The sentence had no modal, hedge or number.

**W2. §1, rings paragraph (line 362).** Habit: an aphorism closer restating the rule.
- Before: `⟦or inherited status. A citizen's environment is the consequence of what they have done, not who they are.⟧`
- After: `⟪not birth, wealth, ideology, or inherited status.</p>⟫` The paragraph now ends here.
- Reason: this restates the sentence before it («Layer placement is determined by demonstrated conduct»).
- Unchanged: "+1 Sanctuary to -3 Terminal" and the four ring attributes. The cut had no number or modal.

**W3. §3.2 (line 405).** Habit: an aphorism closer.
- Before: `⟦than what was available. The distinction is architectural, not rhetorical.⟧`
- After: `⟪permanently less good than what was available.</p>⟫` The paragraph now ends here.
- Reason: the two sentences before it draw the Earth-versus-VMSS distinction. The closer only says the distinction is real.
- Unchanged: "$5,000/month", "the upper pair" and "not a cage".

**W4. §3.6 (line 413).** Habit: stock filler.
- Before: `⟦generational amnesia. It compounds. Every decade⟧`
- After: `⟪generational amnesia. Every decade of operation adds depth⟫`
- Reason: the two-word fragment announces the next sentence, which states the compounding claim in full.
- Unchanged: "200–300 years" and "load-bearing charter provisions". The originalism sentence keeps its dash pair (flag 4).

**W5. §3.7, second paragraph (line 416).** Habit: a thesis closer.
- Before: `⟦no quiet reinterpretation. The Charter chooses the honest form of protection.⟧`
- After: `⟪with no gray zone and no quiet reinterpretation.</p>⟫` The paragraph now ends here.
- Reason: this restates «The actual guarantee is better than textual prohibition». Charter 25.2.0 (C7) cut the identical sentence from Art. XI for the same reason. The longer variant in the §9.4 callout is a `div`, outside the editable elements, and stays.
- Unchanged: "load-bearing", "Article XI", and both quoted phrases ("immutable", "this cannot be amended").

**W6. §4.2, Sanctuary profile (line 440).** Habit: stacked em-dashes (four in one sentence).
- Before: `⟦Home to both Selective Ascension Domains (SADs) — state-chartered, metric-gated communities — and Metric Gated Domains (MGDs) — private, community-defined enclaves at their most granular form.⟧`
- After: `⟪Home to both Selective Ascension Domains (SADs), which are state-chartered, metric-gated communities, and Metric Gated Domains (MGDs), which are private, community-defined enclaves at their most granular form.⟫`
- Reason: with four dashes, the reader cannot tell where the SAD gloss ends and the MGD term begins. "which are" ties each gloss to its own term. The glosses keep their exact words.
- Unchanged: both domain names and acronyms, "~300 million", "$10,000/month", "85", "typically", "8–12 years" and "mandatory".

**W7. §4.2.1 (line 451).** Habit: stacked em-dashes, with an ambiguous closing dash.
- Before: `⟦reach -3 only at its trade boundary — goods crossing layer lines through authorized channels meet the standard at the crossing — plus advisory standing internally.⟧`
- After: `⟪reach -3 only at its trade boundary (goods crossing layer lines through authorized channels meet the standard at the crossing), plus advisory standing internally.⟫`
- Reason: after the closing dash, "plus advisory standing internally" read as part of the aside. The parentheses close the aside first. The words and their order are unchanged.
- Unchanged: "only these two", "only at its trade boundary", §10.1, §24, Article XXV.VI and "counter-sovereignty". The two-trigger sentence was left as it is (flag 5).

**W8. §4.4, first paragraph (line 457).** Habit: stock filler.
- Before: `⟦across layers. The reconciliation is structural. VMSS&rsquo;s positive civic obligation⟧`
- After: `⟪participation across layers. VMSS&rsquo;s positive civic obligation resolves⟫`
- Reason: the sentence announces a reconciliation without saying anything. The next sentence carries it out.
- Unchanged: "civic floor", "non-withdrawable", "including -3", every Article cite, "federal floor remains" and "Graduated institutional investment".

**W9. §5.4, second paragraph (line 512).** Habit: a thesis closer ("not X but Y").
- Before: `⟦turns the one into the other. The discipline is therefore not a feature of STI but the precondition of its legitimacy.⟧`
- After: `⟪the failure mode that turns the one into the other.</p>⟫` The paragraph now ends here.
- Reason: this restates «Its legitimacy rests entirely on what is admissible to the ledger.»
- Unchanged: "only consensus-grade conduct", "a standard of proof", "may admit" and "not social credit".

**W10. §5.4.2 (line 518).** Habit: stacked em-dashes (three in one sentence).
- Before: `⟦Any change to the dimension set itself &mdash; adding a new dimension, removing an existing one, redefining what a dimension captures &mdash; constitutes⟧`
- After: `⟪Any change to the dimension set itself (adding a new dimension, removing an existing one, redefining what a dimension captures) constitutes⟫`
- Reason: the sentence carried three dashes. The list pair becomes parentheses, and the last dash ("the same routing Charter Article IV specifies") stays as the sentence's one dash.
- Unchanged: §5.4.1, §5.10, §10.5, §7.6, LP-026, "eight-year", "dual-key", "Article XI" and "Charter Article IV". The "Weight refinement" pair in the previous sentence is a 22-word defining gloss and was left (flag 4).

**W11. §5.9, first paragraph (line 535).** Habit: stacked em-dashes.
- Before: `⟦No single metric — including STI — shall⟧`
- After: `⟪No single metric, including STI, shall unilaterally determine⟫`
- Reason: two dashes wrapped a two-word aside in a rule sentence. The sentence restates Charter Art. XII, and the new punctuation matches the Charter's own text ("No single metric, including STI, shall unilaterally determine" in charter.html) word for word.
- Unchanged: "shall", "must", "may", "unilaterally" and "multi-factor".

**W12. §5.9, phasing paragraph (line 536).** Habit: an aphorism closer.
- Before: `⟦the environment they inhabit. The distinction between phasing and reassignment is architectural, not rhetorical.⟧`
- After: `⟪no longer meet the condition of the environment they inhabit.</p>⟫` The paragraph now ends here.
- Reason: this restates «Phasing is a return to baseline rather than a punitive descent».
- Unchanged: both "85" figures, "non-punitive" and "exempt from this rule". The opening "Layer phasing — … —" pair is the Charter's own Art. XII text and was left (flag 3).

**W13. §5.12, initialization paragraph (line 549).** Habits: stacked em-dashes, then a filler clause.
- Before (1): `⟦A child with sustained positive conduct &mdash; community contribution, peer trust, civic engagement &mdash; initializes higher.⟧`
- After (1): `⟪A child with sustained positive conduct (community contribution, peer trust, civic engagement) initializes higher.⟫`
- Before (2): `⟦observed behavior &mdash; which is exactly what STI is designed to measure.⟧`
- After (2): `⟪across 18 years of observed behavior.</p>⟫` The paragraph now ends here.
- Reason: (1) two dashes wrapped a five-word list. (2) the clause tells the reader that STI measures what it measures, which §5 already establishes.
- Unchanged: every "18", "10:1", "100", "0", "criminal-flag severity" and "trajectory".

**W14. §5.13, reconciliation paragraph (line 556).** Habit: an aphorism fragment.
- Before: `⟦products of universal sorting. Two-level moral causality, not two moral systems. The architecture⟧`
- After: `⟪the products of universal sorting. The architecture has a single author⟫`
- Reason: the fragment is restated by the paragraph's last clause («not a parallel moral order»). The doctrine keeps its name in the §5.13 heading and in the glossary entry "Two-Level Moral Causality (§5.13)".
- Unchanged: "Level-1", "Level 2", "Level 1’s", "Article XIV", "terminal reassignment" and "moral-causality outputs".

**W15. §6.1, second paragraph (line 565).** Habit: stacked em-dashes.
- Before: `⟦Three-axis violations — severe harm, established pattern, irreversible damage — constitute⟧`
- After: `⟪Three-axis violations (severe harm, established pattern, irreversible damage) constitute a qualifying event⟫`
- Reason: two dashes wrapped a six-word list. The sentence before it already uses parentheses for the same kind of list.
- Unchanged: "Article XX", "qualifying event" and "not as an acceptable cost of enforcement".

**W16. §6.6, first paragraph (line 584).** Habit: an aphorism closer.
- Before: `⟦never adds it back. The filter runs in one direction, and a filter that runs in one direction purifies; a filter that backwashes does not.⟧`
- After: `⟪subtracts demonstrated harm and never adds it back.</p>⟫` The paragraph now ends here.
- Reason: this restates «one-way filtration mechanism» and «improves monotonically» from the sentences before it.
- Unchanged: "load-bearing in its own right", "categorical threshold" and "no mechanism returns them".

**W17. §7, amendment paragraph (line 610).** Habit: a thesis closer ("not X, Y").
- Before: `⟦because they live under the core. The protection is load-bearing, not cemented — the honest form of guarantee.⟧`
- After: `⟪were qualified precisely because they live under the core.</p>⟫` The paragraph now ends here.
- Reason: this restates «protected structurally rather than textually» from the sentence before it. §3.7 carries the load-bearing framing in full, and Charter 25.2.0 cut the same kind of closer from Art. XI (C6, C7).
- Unchanged: "consensus", "supermajority", "only through the full Article XI gauntlet" and the four core principles. The core-principles pair was left because the Charter keeps the same pair (flag 4).

**W18. §7.3 (line 619).** Habit: stacked em-dashes.
- Before: `⟦When a corporation causes harm — ecological destruction, mass exploitation, systemic fraud — the system evaluates⟧`
- After: `⟪When a corporation causes harm (ecological destruction, mass exploitation, systemic fraud), the system evaluates⟫`
- Reason: two dashes wrapped a five-word list. systems.html already uses this parenthesized form for its twin sentence.
- Unchanged: "every person in the decision chain individually", "Plausible deniability" and "asset liquidation".

**W19. §7.4, second paragraph (line 623).** Habit: a "not X; it is Y" restatement.
- Before: `⟦regulatory mechanism. The filter is not an unreviewed gate; it is a reviewable layer in a multi-layer architecture. <strong>⟧`
- After: `⟪through the Article XXVIII regulatory mechanism. <strong>Separation of gating⟫`
- Reason: this restates the «Reviewability» sentence before it.
- Unchanged: "three operational features", §5.11, "may petition", Article XXVIII and the quoted "needs Court time" and "doctrine already determined,".

**W20. §7.5 (line 625).** Habit: redundant restatement.
- Before: `⟦not satisfaction — it tells the civilization whether its feedback loops are receiving input, not whether the population is happy with the outputs.⟧`
- After: `⟪The metric measures engagement, not satisfaction. The assessment is public.⟫`
- Reason: the dash clause states the engagement-versus-satisfaction contrast a second time. Charter 25.2.0 made the identical cut to Art. XX's twin sentence (C8), so the two now read the same.
- Unchanged: "Article XX", "required input", "historical baselines" and "self-reinforcing". The first sentence's dash pair is the Charter's own Art. XX text and was left (flag 3).

**W21. §7.7 (line 632).** Habits: a stock lead-in, and a thesis closer.
- Before (1): `⟦The reconciliation is structural rather than rhetorical: public sentiment⟧`
- After (1): `⟪measured rather than voted on. Public sentiment enters the review cycle⟫`
- Before (2): `⟦mandate-based legitimacy). The civilization measures; it does not poll for rulership.⟧`
- After (2): `⟪(votes, electoral authority, mandate-based legitimacy).</p>⟫` The paragraph now ends here.
- Reason: (1) the lead-in announces the resolution and then gives it. The resolution now opens the sentence. (2) the closer restates «does not extract sovereignty claims».
- Unchanged: Article XXII.II, "one of two inputs", "non-decisive alone", the quoted "no elections, no constituencies, no campaigns", and "performance signal" and "electoral mandate" (both still bold). "The population is a witness to governance…" stays because the next sentence's "This" points at it (flag 7).

**W22. §9.1, Gate 3 (line 750).** Habit: stacked em-dashes.
- Before: `⟦+1 Sanctuary votes by consensus — full agreement, not supermajority — reflecting⟧`
- After: `⟪+1 Sanctuary votes by consensus (full agreement, not supermajority), reflecting⟫`
- Reason: two dashes wrapped a four-word gloss. The words are the same.
- Unchanged: "80–90%", "-1, -2, -3" and "do not vote".

**W23. §10.2.1, third paragraph (line 786).** Habit: a "not X. It is Y" reversal.
- Before: `⟦Federal law is not a one-time fix. It is an iterative process⟧`
- After: `⟪Federal law is an iterative process the architecture explicitly supports.</p>⟫`
- Reason: the negation adds nothing that "iterative" does not already say.
- Unchanged: both "cannot" in the first sentence, and "-3". The cultural-spectacle dash pair is a 14-word aside and was left (flag 4).

**W24. §10.3, second paragraph (line 790).** Habit: stacked em-dashes.
- Before: `⟦advisory only — consistent with institutional withdrawal — but⟧`
- After: `⟪enacted regulations are advisory only, consistent with institutional withdrawal, but voluntary communities⟫`
- Reason: two dashes wrapped a four-word aside. faq.html and systems.html already use this comma form.
- Unchanged: "1%", "80%", "one million", "annually", "may", "only" and "advisory".

**W25. §10.6.1, second paragraph (line 806).** Habit: stacked em-dashes.
- Before: `⟦The single substantive criminal reference — treason, Article III Section 3 — is placed⟧`
- After: `⟪The single substantive criminal reference (treason, Article III Section 3) is placed⟫`
- Reason: two dashes wrapped a five-word citation.
- Unchanged: "18 USC", "Article III Section 3", "almost nothing" and "not a substantive floor".

**W26. §10.6.1, third paragraph (line 807).** Habit: stacked em-dashes.
- Before: `⟦Substantive prohibitions — including serious ones — live at Article XXV.⟧`
- After: `⟪Substantive prohibitions, including serious ones, live at Article XXV.⟫`
- Reason: two dashes wrapped a three-word aside. faq.html's twin sentence already uses commas.
- Unchanged: "18 USC § 1111", Article XXV.VI, XXV.I–XXV.III, Article XI and "only through". The "three prohibitions" pair is a 13-word aside and was left (flag 4).

**W27. §10.7, first paragraph (line 811).** Habit: an aphorism closer.
- Before: `⟦more dignified. The founding principles don't move. The civilization moves within them.⟧`
- After: `⟪more humane and more dignified.</p>⟫` The paragraph now ends here.
- Reason: this restates «within the permanent structural rules» and the parenthetical «(the founding principles hold)». The next paragraph's "This cycle" still refers to the fail, redirect and improve cycle this paragraph describes.
- Unchanged: Article XI, Article XXVIII and all four listed improvements.

**W28. §11.2 (line 838).** Habit: stacked em-dashes.
- Before: `⟦$10,000 UBI — $20,000 total, or $240,000 annually — while retaining⟧`
- After: `⟪on top of their $10,000 UBI ($20,000 total, or $240,000 annually) while retaining⟫`
- Reason: two dashes wrapped a five-token arithmetic aside.
- Unchanged: "20" (three times), both "$10,000", "$20,000", "$240,000" and "20-plus".

**W29. §11.4 (line 857).** Habit: an aphorism closer.
- Before: `⟦this produces. Art gets made because someone wanted to make it — not because someone would pay for it.⟧`
- After: `⟪creative output this produces.</p>⟫` The paragraph now ends here.
- Reason: this restates «without it ever needing to sell».
- Unchanged: "$10,000 per month" and "indefinitely". The cut removes one "would", which sat in a counterfactual, not in a rule (the verify script expects that change and allows no other).

### Claims ledger

One table per changed element. Each row is a claim, number or citation in the edited element, with a verbatim quote from the copy.

**Line 361 (§1)**

| Claim | Verbatim quote |
|---|---|
| Enacted architecture, public brand | «branded publicly as The Five Rings, is an enacted civilization architecture» |
| First replaced assumption, second | «that justice must be reactive, that freedom and accountability are adversaries» |
| Third replaced assumption | «that civilizational stability requires ideological consensus» |
| VMSS proposes none | «VMSS proposes none of these.» |
| Consequence structural | «It proposes that consequence can be made structural» |
| Freedom inside boundaries | «that freedom expands inside well-designed boundaries» |
| Stability as engineering | «stability is an engineering problem solvable over centuries» |

**Line 362 (§1)**

| Claim | Verbatim quote |
|---|---|
| Five rings, +1 to -3 | «five concentric governance rings (+1 Sanctuary to -3 Terminal)» |
| Four attributes per ring | «its own enforcement posture, economic character, institutional presence, and social texture» |
| Placement by conduct | «Layer placement is determined by demonstrated conduct — not birth, wealth, ideology» |
| Nor inherited status | «not birth, wealth, ideology, or inherited status.» |

**Line 405 (§3.2)**

| Claim | Verbatim quote |
|---|---|
| Separation by risk | «VMSS separates populations based on demonstrated behavioral risk.» |
| Not a cage | «Each layer is a functioning civilization — not a cage.» |
| -1 profile, $5,000 | «partial institutional presence, a private economy, personal autonomy, and $5,000/month UBI» |
| Exclusion, not degradation | «permanent exclusion from the upper pair, not degradation of the baseline» |
| Earth's method | «Earth punishes by making life worse.» |
| VMSS's method | «VMSS punishes by making life permanently less good than what was available.» |

**Line 413 (§3.6)**

| Claim | Verbatim quote |
|---|---|
| Designed for longevity | «VMSS is designed for civilizational longevity.» |
| Load-bearing provisions, full gauntlet | «load-bearing charter provisions protected by the full amendment gauntlet» |
| Centuries, not cycles | «support continuity over centuries rather than electoral cycles» |
| 200–300 years | «Leaders who live 200–300 years carry institutional memory in living form» |
| Originalism defined | «the retroactive attempt to recover what living memory would have preserved» |
| Originalism unnecessary | «is unnecessary when the founders are still alive» |
| No generational amnesia | «The civilization does not cycle through generational amnesia.» |
| Each decade adds depth | «Every decade of operation adds depth to the governance structure» |
| Beyond electoral systems | «that no electoral system can match» |

**Line 416 (§3.7)**

| Claim | Verbatim quote |
|---|---|
| Load-bearing, not cemented | «The founding core is load-bearing rather than cemented.» |
| No textual bar | «No textual rule forbids reaching it.» |
| "Immutable" abandoned | «as "immutable" is abandoned as dishonest language» |
| Article XI gauntlet | «depends on the full weight of the Article XI amendment gauntlet» |
| Not immutable | «is not immutable, it is load-bearing» |
| Better than textual prohibition | «The actual guarantee is better than textual prohibition» |
| Textual bars get reinterpreted | «a rule that says "this cannot be amended" must either be reinterpreted» |
| Or produce revolution | «or produce revolution when it fails» |
| Holds or visibly fails | «either holds or visibly fails, with no gray zone and no quiet reinterpretation» |

**Line 440 (§4.2, Sanctuary)**

| Claim | Verbatim quote |
|---|---|
| ~300 million | «+1 Sanctuary (~300 million residents)» |
| TIP pre-intervention | «Pre-intervention enforcement via the Threshold Inhibition Protocol.» |
| Halt before completion | «Harmful acts halt before completion through neural inhibition and drone countermeasures.» |
| No completed violence | «No murder, assault, or sexual violence can reach completion.» |
| Implants mandatory | «Implants mandatory for all residents.» |
| $10,000, shared currency | «$10,000/month UBI, shared currency with Main.» |
| Post-scarcity baseline | «Full post-scarcity baseline with maximum fabrication, medical, and augmentation infrastructure.» |
| STI 85; 8–12 years typical | «Entry requires an STI of 85 or above, typically earned through 8–12 years» |
| Demographic core | «Population functions as the civilization's demographic and cultural core» |
| Pairs outward | «residents pair outward into Main and below, carrying high-trust norms» |
| SADs | «Selective Ascension Domains (SADs), which are state-chartered, metric-gated communities» |
| MGDs | «Metric Gated Domains (MGDs), which are private, community-defined enclaves» |
| Granularity | «at their most granular form» |

**Line 451 (§4.2.1)**

| Claim | Verbatim quote |
|---|---|
| Not style or scale | «is not a matter of style, scale, or organizational sophistication» |
| Sovereign by design | «-3 is the Freedom Layer; its private order is sovereign within the layer by design» |
| Produced by withdrawal | «that sovereignty is what the federal withdrawal produces rather than an incidental byproduct» |
| Two triggers only | «The federal floor activates on two explicit triggers, and only these two» |
| Trigger (a), §10.1 | «(a) violation of the absolute federal laws named in §10.1» |
| The three absolutes | «industrial-scale pollution, nuclear weapons manufacture or possession, implant or institutional hacking» |
| Why they reach -3 | «these are cross-layer mandates that reach -3 because their externalities cross layer boundaries» |
| Trigger (b), §24 | «(b) activity that triggers the External Force Doctrine under §24» |
| Threat to the architecture | «organized action that threatens the architecture of VMSS itself» |
| Four-tier framework | «classified through the four-tier imminence framework» |
| Internal or external | «regardless of whether the actor is internal or external» |
| Tolerated below triggers | «Below these two triggers, organized activity in -3 is tolerated however it develops.» |
| Examples inside the framing | «governed by an autonomous protocol, a private legal code, a reputation-market regime» |
| Charismatic leader | «or a charismatic leader is within the Freedom Layer framing» |
| Nuclear weapons outside it | «the same district manufacturing nuclear weapons» |
| Ledger attack outside it | «or coordinating an attack on the implant ledger is not» |
| Act-based test | «The test is act-based, not organization-based» |
| Counter-sovereignty attaches to acts | «"counter-sovereignty" is a category that attaches to specific acts against the architecture» |
| Not to self-governance | «not to the existence of organized self-governance» |
| Food safety not a third trigger | «Cross-layer protective mandates of the food-safety class (Article XXV.VI) are not a third trigger» |
| Binds -1 and -2 | «they bind -1 and -2 in-layer through the institutional presence operating there» |
| -3 only at trade boundary | «reach -3 only at its trade boundary (goods crossing layer lines» |
| Standard at the crossing; advisory inside | «through authorized channels meet the standard at the crossing), plus advisory standing internally» |
| Floor as deep as infrastructure | «runs exactly as deep as the infrastructure that carries it» |

**Line 457 (§4.4)**

| Claim | Verbatim quote |
|---|---|
| Commitment coexists with graduation | «commitment to "not a hierarchy of suffering" coexists with intentional graduation» |
| Graduated items (1) | «medical density, revival reliability, pre-intervention enforcement, daily governance presence» |
| Graduated items (2) | «and shared-currency participation across layers» |
| Two load-bearing layers | «positive civic obligation resolves into two load-bearing layers» |
| Civic floor defined | «the non-withdrawable set of obligations the state carries identically at every layer, including -3» |
| Dignity, starvation | «full dignity (Charter Preamble), protection from starvation (Article III)» |
| Citizenship | «citizenship itself (layer reassignment never revokes it)» |
| XXV.I–XXV.III mandates | «federal cross-layer mandates under Articles XXV.I–XXV.III» |
| The three mandates | «(clean energy; nuclear prohibition; implant and institutional hacking prohibition)» |
| Child relocation, UBI | «standing child relocation right (Article VIII), UBI baseline in layer-appropriate currency» |
| Implant opt-in | «and preserved implant opt-in» |
| Identical in Sanctuary and -3 | «The floor operates identically in Sanctuary and in -3» |
| "Federal floor remains" | «what makes the -3 "federal floor remains" clause meaningful» |
| Graduated investment defined | «Graduated institutional investment is everything above the floor» |
| Above-floor items (1) | «medical drone density, revival reliability rates, pre-intervention enforcement» |
| Above-floor items (2) | «shared-currency economic access, SAD availability» |
| Graduated by conduct | «graduated as consequence of conduct-based placement» |

**Line 512 (§5.4)**

| Claim | Verbatim quote |
|---|---|
| Not social credit | «STI is also not social credit» |
| Difference is intake | «the difference is not one of degree but of intake» |
| Social credit manufactures value | «A social credit system manufactures the value it measures» |
| What it manufactures | «loyalty, conformity, alignment with a sanctioned position» |
| State-authored standard | «scores the population against a standard the state has authored» |
| STI authors none | «STI authors no such standard; it records conduct a population already recognizes» |
| Trust-bearing or -breaking | «as trust-bearing or trust-breaking» |
| Legitimacy rests on admissibility | «Its legitimacy rests entirely on what is admissible to the ledger.» |
| Intake discipline | «The guardrail is intake discipline: only consensus-grade conduct, established to a standard of proof» |
| Opinion excluded | «enters the record — opinion, belief, and dissent do not» |
| Same machine | «The machine is the same in either case, a behavioral ledger feeding a composite score» |
| Only separator (1) | «the only thing that separates a reputation system mirroring an existing consensus» |
| Only separator (2) | «from an instrument of social control is the rule governing what the ledger may admit» |
| Failure mode | «Undisciplined intake is the failure mode that turns the one into the other.» |

**Line 518 (§5.4.2)**

| Claim | Verbatim quote |
|---|---|
| §5.4.1 covers weights | «The dynamic label in §5.4.1 applies to weight refinement within the fixed seven-dimension set» |
| Not the dimension set | «not to the dimension set itself» |
| Load-bearing for §5.10 | «This distinction is load-bearing for §5.10’s separation of signal and decision.» |
| Weight refinement defined | «adjusting how much a given dimension contributes to the overall score» |
| Its triggers | «in response to observed gaming, observed pathology, or improved measurement» |
| Authorized maintenance | «is metric maintenance the AI governance level is authorized to perform under §5.4.1» |
| Eight-year cadence, LP-026 | «formalized on an eight-year external-audit calibration cadence (LP-026)» |
| Dimension-set changes (1) | «Any change to the dimension set itself (adding a new dimension, removing an existing one» |
| Dimension-set changes (2) | «redefining what a dimension captures) constitutes structural alteration» |
| What it alters | «of what the civilization commits to measuring» |
| §10.5 dual key | «requires §10.5 dual-key classification (Meritboard and Supreme Court concur)» |
| Deferred to Article XI | «which defers structural alteration to the Article XI amendment gauntlet» |
| Art. IV and §7.6 | «the same routing Charter Article IV specifies and §7.6 applies to the Meritboard category set» |
| Boundary test (1) | «whether the change refines the measurement of an existing commitment» |
| Boundary test (2) | «or authors a new commitment about what belongs at all» |
| Maintenance vs legislation | «The former is maintenance; the latter is legislation and routes through the structural-alteration gate.» |
| Signal stays signal | «This keeps the signal layer from silently becoming the decision layer» |
| §5.10 violation | «undeclared authorship of belonging in violation of §5.10» |

**Line 535 (§5.9)**

| Claim | Verbatim quote |
|---|---|
| No single metric shall determine | «No single metric, including STI, shall unilaterally determine punitive layer assignment» |
| Or descent | «or descent into lower layers» |
| Scope | «All classifications that move a citizen toward greater consequence» |
| Must be multi-factor | «must result from multi-factor system evaluation incorporating behavior, context, and cumulative history» |
| Prevents mechanism | «This prevents the system from producing mechanistic outcomes» |
| Context may differ | «may receive different consequence classifications because the system evaluates the act in context» |
| Informs, not dictates | «The STI score informs the evaluation — it does not dictate the result.» |

**Line 536 (§5.9)**

| Claim | Verbatim quote |
|---|---|
| Phasing defined (1) | «Layer phasing — the non-punitive return of a citizen to the layer below» |
| Phasing defined (2); exempt | «when they no longer meet that layer's behavioral threshold — is exempt from this rule» |
| Return to baseline | «Phasing is a return to baseline rather than a punitive descent» |
| 85 is definitional | «STI below 85 for Sanctuary phasing) is itself the definition of the layer's qualifying condition» |
| Below 85 phases back | «A Sanctuary resident whose STI drops below 85 phases back to Main Layer» |
| Not punishment | «not because the system is punishing them, but because they no longer meet the condition» |

**Line 549 (§5.12)**

| Claim | Verbatim quote |
|---|---|
| Initializes at 18 | «At 18, the STI initializes.» |
| Full ledger since birth | «computes the citizen’s first score using the full ledger of behavioral observations» |
| 18 years, trajectory formula | «18 years of data, weighted by the standard trajectory formula» |
| Formula parameters, 10:1 | «(best outcomes, 10:1 penalty-to-recovery ratio, dynamic dimensional weighting)» |
| Not a snapshot | «The initialization is not a single-moment snapshot.» |
| Trajectory computation | «It is a trajectory computation across the entire juvenile record.» |
| Unremarkable, middle range | «A child who lived unremarkably initializes in the middle range» |
| No strong signal | «no strong positive signal, no strong negative signal» |
| Positive conduct, higher | «A child with sustained positive conduct (community contribution, peer trust, civic engagement) initializes higher.» |
| Minor infractions, lower | «accumulated minor infractions that did not reach criminal-flag severity initializes lower» |
| Not 100 | «Nobody initializes at 100 (which would attribute perfect conduct to someone who was simply unscored)» |
| Not 0 (1) | «or at 0 (which would attribute catastrophic failure to someone» |
| Not 0 (2) | «whose infractions never crossed the criminal threshold» |
| Reflects 18 years | «Everyone initializes at a score that reflects what they actually did across 18 years» |

**Line 556 (§5.13)**

| Claim | Verbatim quote |
|---|---|
| Standards are outputs | «layer ambient standards are themselves moral-causality outputs, not independent cultural baselines» |
| Level-1 sorting | «Each layer’s population exists at that layer because of Level-1 universal sorting» |
| Sanctuary population | «the Sanctuary population demonstrated sustained high-trust conduct» |
| -3 population (1) | «the -3 population includes those whose conduct triggered terminal reassignment» |
| -3 population (2) | «or those who voluntarily chose minimal governance» |
| Downstream | «downstream of the universal sorting, not alternative to it» |
| Not relativism (1) | «Layer-contextual rating is not moral relativism because the layer contexts themselves» |
| Not relativism (2) | «are the products of universal sorting» |
| Single author, Article XIV | «The architecture has a single author (VMSS criminal code via Article XIV)» |
| Single sorting mechanism | «a single sorting mechanism (conduct-based layer placement)» |
| Level 2 from Level 1 | «the contextual variance at Level 2 is a downstream effect of Level 1’s universal operation» |
| No parallel order | «not a parallel moral order» |

**Line 565 (§6.1)**

| Claim | Verbatim quote |
|---|---|
| Single-axis | «Single-axis violations warrant correction within the current layer (STI impact, fines, social consequence).» |
| Two-axis | «Two-axis violations trigger formal evaluation.» |
| Three-axis (1) | «Three-axis violations (severe harm, established pattern, irreversible damage) constitute a qualifying event» |
| Three-axis (2) | «for layer reassignment» |
| Overcorrection is failure | «Overcorrection (response disproportionate to the act) is treated as a system failure» |
| Article XX review | «triggering Article XX review, not as an acceptable cost of enforcement» |

**Line 584 (§6.6)**

| Claim | Verbatim quote |
|---|---|
| Two grounds | «is conventionally defended on two grounds: deterrent integrity» |
| Unwound is a sentence | «a consequence that can be unwound is a sentence» |
| Priced into behavior | «sentences are priced into behavior in a way permanent consequences are not» |
| Victim protection (1) | «victim protection (a sealed ceiling guarantees the victim never shares a layer» |
| Victim protection (2) | «with the person who harmed them» |
| Third ground | «A third ground is compositional, and it is load-bearing in its own right.» |
| One-way filter | «Punitive reassignment operates as a one-way filtration mechanism on the upper-layer population.» |
| Removal (1) | «Every qualifying event removes from Main Layer an individual whose demonstrated conduct» |
| Removal (2) | «crossed the categorical threshold, and no mechanism returns them» |
| Monotonic improvement | «The composition of Main Layer and Sanctuary therefore improves monotonically over civilizational time» |
| Not selection at entry | «not because residents are selected for virtue at entry» |
| Subtracts harm | «the architecture continuously subtracts demonstrated harm and never adds it back» |

**Line 610 (§7)**

| Claim | Verbatim quote |
|---|---|
| Simulation before adoption | «Policy proposals are stress-tested through AI-assisted simulation for long-term outcomes before adoption.» |
| Consensus plus supermajority | «Charter amendments require consensus of +1 Sanctuary residents plus a supermajority of Main Layer citizens» |
| Threshold set by President | «with the specific threshold set by the President in consultation with the Court» |
| Four core principles | «moral causality, pre-intervention in Sanctuary, post-intervention in Main, continuity not innocence» |
| Structural protection | «form the founding core and are protected structurally rather than textually» |
| Only through Article XI | «amendment is possible only through the full Article XI gauntlet» |
| Qualified by living under it | «were qualified precisely because they live under the core» |

**Line 619 (§7.3)**

| Claim | Verbatim quote |
|---|---|
| No corporate personhood | «VMSS does not recognize corporate personhood.» |
| Individual attribution | «The implant ledger attributes every decision to the individual who made it.» |
| Corporate harms | «When a corporation causes harm (ecological destruction, mass exploitation, systemic fraud)» |
| Everyone in the chain | «the system evaluates every person in the decision chain individually» |
| Each carries a ledger (1) | «An executive, a manager, and a contractor each carry their own ledger» |
| Each carries a ledger (2) | «their own behavioral record, and their own reassignment liability» |
| Pattern detection (1) | «AI pattern detection correlates individually innocuous acts across multiple ledgers» |
| Pattern detection (2) | «to identify coordinated harm» |
| Deniability collapses | «Plausible deniability collapses when the implant recorded knowledge, timing, and the decisions» |
| Asset liquidation | «Leadership descent triggers standard asset liquidation» |
| Loses position | «the corporate structure loses its upper-layer position when the decision-makers who ran it lose theirs» |

**Line 623 (§7.4)**

| Claim | Verbatim quote |
|---|---|
| Three features | «The filter’s legitimacy rests on three operational features, not on infallibility.» |
| When identity is disputed | «when category identity is disputed» |
| Closed-by-precedent in play | «whether a case belongs to a closed-by-precedent category is itself in play» |
| Escalates | «the filter escalates rather than self-resolving» |
| No prejudging | «The filter does not prejudge cases to gate them; genuine ambiguity triggers escalation by default.» |
| Auditable, §5.11 | «the filter’s operation is auditable under the Meritboard’s feedback-loop awareness function (§5.11)» |
| May petition, XXVIII | «citizens may petition for review of filter operation through the Article XXVIII regulatory mechanism» |
| Gating question | «the filter decides "needs Court time" vs. "doctrine already determined,"» |
| Not interpretation | «not which interpretation applies when the Court engages» |
| Court remains authority | «The Supreme Court remains the interpretive authority» |
| Docket routing | «a docket-routing instrument above the Court’s substantive work, not a substitute for it» |

**Line 625 (§7.5)**

| Claim | Verbatim quote |
|---|---|
| Surfaces anomalies | «The AI governance system surfaces civic participation anomalies» |
| Anomaly list (1) | «declining petition rates, dropping regulatory ratification participation, falling contestation volume» |
| Anomaly list (2) | «or shrinking engagement in any district, domain, or demographic» |
| Article XX input | «as a required input to the Meritboard's Article XX audit cycle» |
| Review below baselines | «When participation drops below historical baselines, the Meritboard reviews and publishes its assessment» |
| Engagement, not satisfaction | «The metric measures engagement, not satisfaction.» |
| Public assessment | «The assessment is public.» |
| Contestable | «A Meritboard explanation that misreads disengagement as satisfaction is itself contestable» |
| Self-reinforcing | «making the metric self-reinforcing: the act of contesting a bad assessment increases the signal» |

**Line 632 (§7.7)**

| Claim | Verbatim quote |
|---|---|
| Article XXII.II sentiment input | «The Presidential Review Cycle (Article XXII.II) admits public sentiment polling from Main Layer and Sanctuary» |
| One of two inputs | «as one of two inputs that can unseat a sitting President» |
| Quoted commitment | «"no elections, no constituencies, no campaigns"» |
| Measured, not voted | «competence is measured rather than voted on» |
| Signal, not mandate | «Public sentiment enters the review cycle as a performance signal, not as an electoral mandate.» |
| Mandate defined (1) | «An electoral mandate is the population choosing who governs» |
| Mandate defined (2) | «the winner’s legitimacy flows from having been chosen» |
| Signal defined (1) | «A performance signal is the population reporting on how governance is being experienced» |
| Signal defined (2) | «the data informs a panel’s assessment without constituting choice» |
| Mechanism (a) | «Three mechanisms preserve non-electoral structure: (a) the Supreme Court appoints the Review Panel» |
| Not the population | «appoints the Review Panel, not the population» |
| Mechanism (b) (1) | «(b) the panel selects the challenger and sets the weighting» |
| Mechanism (b) (2) | «between public sentiment and panel assessment, both blinded to the incumbent» |
| Population controls neither | «the population controls neither» |
| Mechanism (c) | «(c) sentiment is one of two inputs and is non-decisive alone.» |
| Witness, not electorate | «The population is a witness to governance, not its electorate.» |
| Extracts data (1) | «VMSS extracts measurement data from residents (STI from observed conduct» |
| Extracts data (2) | «layer-contextual rating from population judgment, sentiment from governed experience)» |
| No sovereignty claims | «but does not extract sovereignty claims (votes, electoral authority, mandate-based legitimacy).» |

**Line 750 (§9.1, Gate 3)**

| Claim | Verbatim quote |
|---|---|
| Consensus is full agreement | «+1 Sanctuary votes by consensus (full agreement, not supermajority), reflecting the tier's behavioral density.» |
| Main 80–90% | «Main Layer votes by supermajority in the 80–90% range» |
| Scaled to gravity | «scaled to the gravity of the change» |
| Lower layers do not vote | «Lower layers (-1, -2, -3) do not vote on Charter amendments» |
| Why | «residents whose present environment is the consequence of prior Charter law» |
| No revision rights | «do not hold revision rights over the Charter that placed them there» |

**Line 786 (§10.2.1)**

| Claim | Verbatim quote |
|---|---|
| Spectacle variant | «content creators using lower-layer mortality conditions as livestream entertainment at zero personal risk» |
| Drove the disclosure filing | «was the phenomenon that drove the original disclosure filing» |
| Terminal clause ended it | «the terminal suspension clause ended its -3 form outright» |
| Cannot stream immortality | «a visitor cannot stream functional immortality from a layer their vessel link cannot enter» |
| Cycle worked | «The regulatory evolution cycle worked as designed: identify the gap, petition, escalate, close.» |
| Iterative | «Federal law is an iterative process the architecture explicitly supports.» |

**Line 790 (§10.3)**

| Claim | Verbatim quote |
|---|---|
| Any citizen may petition | «Any citizen may initiate a regulatory petition.» |
| 1% threshold | «A signature threshold of 1% of layer population surfaces the petition for formal review.» |
| Expert panel drafts | «A Meritboard-assigned domain-expert panel drafts the regulation.» |
| 80% ratification | «The full layer population ratifies by direct vote at an 80% supermajority threshold.» |
| One million per district | «The same mechanism operates at district level — jurisdictional units of one million residents» |
| Annual redraw | «boundaries redrawn annually by AI governance using real-time population data» |
| No census | «No census, no political commission, no gerrymandering.» |
| -3 advisory only | «In -3 Terminal, enacted regulations are advisory only, consistent with institutional withdrawal» |
| Self-enforcement (1) | «voluntary communities self-enforce ratified regulations through reputation networks» |
| Self-enforcement (2) | «cooperative access loss, and private enforcement» |

**Line 806 (§10.6.1)**

| Claim | Verbatim quote |
|---|---|
| Exact parallel | «The parallel with Earth's best-known founding document is exact.» |
| Criminalizes almost nothing | «The United States Constitution criminalizes almost nothing substantively» |
| Crimes absent | «not murder, not theft, not fraud, not rape, not assault, not kidnapping» |
| Not in the text | «None of them appear in the constitutional text.» |
| 18 USC | «Those prohibitions live in 18 USC and state penal codes, one tier below.» |
| Structural job (1) | «The Constitution's job is structural: separation of powers, enumerated rights, amendment procedure» |
| Structural job (2) | «constraints on what government can do» |
| Treason, Art. III §3 | «The single substantive criminal reference (treason, Article III Section 3) is placed» |
| To constrain Congress | «specifically to constrain how Congress can define it, not to create a free-standing prohibition» |
| Protective ceiling | «The constitutional placement of treason is a protective ceiling» |
| Feared abuse | «the Founders feared would be abused as a political weapon, not a substantive floor» |

**Line 807 (§10.6.1)**

| Claim | Verbatim quote |
|---|---|
| Same principle | «The VMSS Charter operates on the same principle.» |
| Structure in the Charter | «Structural architecture lives in the Charter.» |
| Prohibitions at XXV | «Substantive prohibitions, including serious ones, live at Article XXV.» |
| Murder is XXV territory | «"Murder is prohibited" is XXV territory, not Charter territory» |
| 18 USC § 1111 | «lives in 18 USC § 1111 rather than Article III of the US Constitution» |
| Charter protects architecture | «The Charter is the document that protects the architecture from majoritarian erosion.» |
| XXV holds the list | «XXV is the document that contains the civilization's prohibition list» |
| XXV.VI ladder | «calibrated through the Article XXV.VI ladder so that prohibitions can be added, refined, or repealed» |
| Without reopening | «in response to new threats without reopening the founding» |
| Exception proves rule | «The exception proves the placement rule: the three prohibitions the Charter does carry» |
| XXV.I–XXV.III | «Articles XXV.I–XXV.III, the clean-energy, nuclear-weapons, and implant-hacking absolutes» |
| Charter tier by design | «sit at Charter tier by deliberate design» |
| Closed set, only Article XI | «entrenched like the treason clause above as a closed set amendable only through Article XI» |
| Ceilings | «function as ceilings rather than as the prohibition list itself» |
| List is federal | «which is federal and grows through the XXV.VI ladder» |

**Line 811 (§10.7)**

| Claim | Verbatim quote |
|---|---|
| Specific interaction | «The regulatory and constitutional tiers interact over long time horizons in a specific way» |
| Deliberately enabled | «the architecture deliberately enables» |
| Failed Article XI petition | «When an Article XI petition fails (the founding principles hold)» |
| Redirect to XXVIII | «citizens redirect their energy into Article XXVIII regulatory improvements» |
| Improvements (1) | «better therapy infrastructure, more nuanced clearable-infraction criteria, restorative mediation programs» |
| Improvements (2) | «community support systems» |
| Within the permanent rules | «Over generations, these operational improvements make the lived experience within the permanent structural rules» |
| More humane | «more humane and more dignified» |

**Line 838 (§11.2)**

| Claim | Verbatim quote |
|---|---|
| Payment matching UBI | «A supplementary payment matching UBI is available to citizens holding one qualifying job» |
| 20 hours | «of 20 or more hours per week» |
| Purpose is time | «The primary purpose is not income — it is time.» |
| Twenty hours unlock | «Twenty qualifying hours unlock the full subsidy» |
| Remainder free | «leaving the remainder of the week for the citizen’s own purposes» |
| Example resident | «A Main Layer resident working a qualifying infrastructure role 20 hours per week» |
| $10,000 plus $10,000 | «collects $10,000 in subsidy on top of their $10,000 UBI» |
| Totals | «($20,000 total, or $240,000 annually)» |
| 20-plus hours kept | «while retaining 20-plus hours weekly for creative work, family, or any other pursuit» |

**Line 857 (§11.4)**

| Claim | Verbatim quote |
|---|---|
| Precarious by design | «creative work was economically precarious by design» |
| Market or other jobs | «artists made what the market would fund, or they worked other jobs to survive» |
| $10,000 covers basics | «In VMSS, $10,000 per month covers housing, food, transportation, and ordinary participation.» |
| Who | «A painter, composer, writer, or filmmaker» |
| Any work, indefinitely | «can make exactly the work they want to make, indefinitely» |
| No need to sell | «without it ever needing to sell» |
| Richer for it | «The civilization is richer for the volume and diversity of creative output this produces.» |

### Word counts

Counts are of visible body text: tags, the head, and script and style blocks are excluded, and dashes are not counted as words.

| Element | Before | After |
|---|---|---|
| Line 361 (§1 opening) | 81 | 81 |
| Line 362 (§1 rings) | 61 | 46 |
| Line 405 (§3.2) | 86 | 80 |
| Line 413 (§3.6) | 91 | 89 |
| Line 416 (§3.7 "immutable") | 103 | 95 |
| Line 440 (§4.2 Sanctuary) | 116 | 120 |
| Line 451 (§4.2.1) | 285 | 285 |
| Line 457 (§4.4 floor) | 160 | 156 |
| Line 512 (§5.4 social credit) | 164 | 149 |
| Line 518 (§5.4.2) | 202 | 202 |
| Line 535 (§5.9 rule) | 89 | 89 |
| Line 536 (§5.9 phasing) | 103 | 93 |
| Line 549 (§5.12 initialization) | 161 | 152 |
| Line 556 (§5.13) | 130 | 123 |
| Line 565 (§6.1) | 56 | 56 |
| Line 584 (§6.6) | 156 | 135 |
| Line 610 (§7 amendments) | 105 | 94 |
| Line 619 (§7.3) | 111 | 111 |
| Line 623 (§7.4) | 145 | 129 |
| Line 625 (§7.5) | 120 | 100 |
| Line 632 (§7.7) | 220 | 204 |
| Line 750 (§9.1 Gate 3) | 65 | 65 |
| Line 786 (§10.2.1) | 81 | 75 |
| Line 790 (§10.3) | 98 | 98 |
| Line 806 (§10.6.1 US parallel) | 123 | 123 |
| Line 807 (§10.6.1 Charter) | 166 | 166 |
| Line 811 (§10.7) | 79 | 69 |
| Line 838 (§11.2) | 88 | 88 |
| Line 857 (§11.4) | 89 | 73 |
| **§1–11 range** | **15,987** | **15,799** (−188) |
| **Page** | **54,394** | **54,206** (−188) |

These are the figures `wp1-verify.mjs` prints on its INFO lines.

### Flags

1. **Shared output path.** This patch writes `docs-review/prose-lift-25.3.0/whitepaper.html`, the same path the §12–22 and §23–34 patches will use. If they start from the live page and copy over this file, these 29 edits are lost. If they start from this copy, `wp1-verify.mjs`'s "§12 onward byte-identical" check will fail by design. Either way, the three patches need to be merged in order onto one copy before shipping.
2. **Possible tension with the STI ruling, left unchanged.** The ruling makes Sanctuary eligibility at STI ≥ 85 immediate, with no duration requirement. §4.2 (line 440, edited for W6) still says «Entry requires an STI of 85 or above, typically earned through 8–12 years». "Typically" makes this a description of the usual path rather than a condition, so the two can be read together. It is the same kind of wording as Charter flag 3 in 25.2.0.
3. **Charter text left as the Charter has it.** Four whitepaper sentences in this range repeat Charter wording, including a paired em-dash that the Charter itself keeps. They were left unchanged so the two pages stay word-for-word parallel:
   - §5.9 line 536, "Layer phasing — … — is exempt" (Art. XII);
   - §5.12 line 547, "— including the 85-point Sanctuary eligibility floor —";
   - §7.5 line 625, "surfaces civic participation anomalies — … — as a required input" (Art. XX);
   - §9.2 line 759, "Every vote — yes, no, or abstain — may be rescinded".

   W11 goes the other way: the Charter's Art. XII uses commas, so the whitepaper was aligned to it.
4. **Paired em-dashes mostly left.** Before this pass, 57 sentences in §1–11 carried two or more em-dashes; 44 still do (the verify script's sentence splitter, approximate). Pairs were converted only when:
   - the pair wrapped six words or fewer and was not Charter text (W1, W11, W13, W15, W18, W22, W24–W26, W28);
   - the sentence carried three or more dashes (W6, W10);
   - the closing dash made the rest of the sentence ambiguous (W7).

   The rest are defining glosses or example lists of seven words or more. Examples: the originalism gloss (§3.6), the Colosseum and forced-revival asides (§4.2), the educational-floor list and the LP-043/LP-078 boolean (§4.4), weight refinement (§5.4.2), the §6.2 and §6.4 lists, the §7.6 category and calibration lists, the §10.2.1 parity and spectacle asides, the §10.3 foothold list, the §10.6.1 misreading and three-prohibitions asides, and the §11 ADT funding list. Converting them would not change meaning. This follows the Charter pass's calibration (its flag 7), but it could reasonably go either way; a broader conversion would be a separate, punctuation-only patch.
5. **Two-trigger sentence left.** §4.2.1's trigger sentence carries two dashes that are not a pair ("§10.1 (…) — these are cross-layer mandates …, and (b) … §24 — organized action …"). Replacing either dash would move a clause's attachment inside the "and only these two" scope rule, so the sentence stands as written.
6. **Charter twins handled in both directions.**
   - W5 and W20 make the same cuts as Charter C7 and C8.
   - Charter C3 cut "Workers benefit from the premium; employers bear the cost." The whitepaper's §11.3 twin (line 854) was kept, because in §11.3 it is the only sentence that says the worker receives the premium. The Charter's version followed a sentence that already said so.
7. **Aphorisms and closers kept on purpose.**
   - §3.3's "has created a prison with better furniture" argues a point and does not restate one.
   - §3.7's "The founding core is not untouchable. It is expensive enough…" is repeated verbatim in the §9.4 callout.
   - §5.4's "STI makes the invisible legible without criminalizing it" carries the "without criminalizing" claim.
   - §6.6's "Permanence without the classifier would be cruelty…" is the section's argument.
   - §7's "No term limits, but no free ride." is the card's only statement of no term limits.
   - §7.4's "novelty extinction, not novelty expansion" names a concept.
   - §8.2's "Classification protects rule-enforcement; it does not enable hidden rule-rewriting." stays because cutting it would shift what the next sentence's "This" refers to.
   - §7.7's "The population is a witness to governance, not its electorate." stays for the same reason.
   - §7.6's "This is the governance analogue of §5.4.2’s STI boundary…" restates the paragraph's opening, but it carries a frozen §5.4.2 citation.
8. **Callouts untouched.** Every `div.callout-principle` is outside the editable element set (`p`, `li`, `blockquote`, `td`). That includes restatement-heavy ones, such as the §9.4 variant of the "honest form of protection" closer.
9. **Term counts changed by cuts, not swaps.** Within §1–11 the cuts remove:
   - two uses of "STI" (W9, W13);
   - one each of "phasing" and "reassignment" (W12);
   - one "load-bearing" (W17);
   - one "founding principles" (W27);
   - the body's only "Two-level moral causality" (W14), whose name survives in the §5.13 heading and the glossary.

   No defined term was replaced by a synonym. `wp1-verify.mjs` asserts these exact deltas and fails on any other.
10. **Cross-page wording note, left unchanged.** §3.7 says «abandoned as dishonest language». Charter Art. XI says "is abandoned here as honest language", which Charter flag 9 in 25.2.0 marked as unclear. The whitepaper's wording supports the "dishonest" reading.
11. **Minus-sign clash left.** §4.1 line 437, "permanent across all lower layers — -1, -2, and -3.", puts a dash against a minus sign, like Charter C5 did. It has one dash only, so it falls outside the listed habits and stays.
12. **Parallel prose on other pages (not quotations).**
    - laws.html has near-twins of the §4.2 forced-revival sentence and the §6.2 major-crimes list. Neither was edited.
    - systems.html and faq.html already use the forms W18, W24 and W26 adopt.
