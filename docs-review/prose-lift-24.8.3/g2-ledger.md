# Prose Lift 24.8.3: Group 2 (Academic Resources r23, r24)

2026-09-28. Two resource pages from `documents/resources-source.html`, edited in copies in this folder (`r23.html`, `r24.html`). The source file is untouched. Both pages are clarity edits per the triage register (`docs-review/prose-lift-24.7-triage.md`). Checker: `node docs-review/prose-lift-24.8.3/check-g2.mjs`, run from the repo root.

| Page | Mode | Block words (orig → edit) | Max em-dashes per paragraph (orig → edit) | Tags / table cells / frozen spans / numbers | Status |
|---|---|---|---|---|---|
| r23 | clarity edit | 3831 → 3585 (−6.4%) | 3 → 0 | identical (124/124) / none on page (0/0) / identical / identical set | ready; one internal-defect flag |
| r24 | clarity edit | 3059 → 2840 (−7.2%) | 2 → 0 | identical (92/92) / none on page (0/0) / identical / identical set | ready; one internal-defect flag |

**Conventions**
- **Word counts.** Block = all visible text in the `resource-page` div, tags stripped (title, subtitle and headings included). A word is any whitespace-separated token containing a letter, digit or `$`.
- **Frozen.** Tag and attribute sequence, headings, the styled subtitle line, `<strong>` run-in labels and the one `<em>` span are byte-identical. Neither page holds a table. Every number, citation, named mechanism and hedge is kept; the checker also compares the set of numeric tokens on each page. In-world quoted speech (r23's matching-market self-introduction, the "Above all" and "My grandmother" lines) is verbatim.
- **Ledger quotes.** Backtick spans in the claims tables are verbatim from the edited page (tags stripped, whitespace collapsed, `&rsquo;` read as `'`, curly double quotes read as `"`, `&sect;` as `§`), 15 words or fewer. The checker confirms each one.
- **Cross-resource clashes in scope.** None of the six named clashes (wall thickness R3/R16, kill-switch scope R3/R15, kill-switch timing R17/R18, Dyson date R4/R19, R20 founding date, mind-state sync R11/R28) makes a claim on these pages. r23 mentions the mega-wall and backup vessels only as examples of the design pattern, with no thickness, timing or sync claim.
- **Approved doctrine changes.** None apply. Neither page mentions -3 AI monitoring (R1) or -3 visitor vessel coverage (R27/R28, LP-004.2). r23's "continued backup vessel coverage" and r24's "backup vessel revival" refer to -1 residents, which LP-004.2 does not touch.

---

## r23 — Selective Ascension Domains

**Claims ledger**

| # | Claim / figure / citation / mechanism / hedge | Survives as |
|---|---|---|
| 1 | Most under-analyzed feature | `the most under-analyzed feature of the VMSS architecture relative to their actual civilizational importance` |
| 2 | Charter mechanism Article IX, brief | `The Charter mechanism (Article IX) is brief.` |
| 3 | Whitepaper §21 distinction, compact | `The whitepaper distinction from MGDs (§21) is compact.` |
| 4 | Seventeen primary domains | `catalogues seventeen primary domains with their gating metrics` |
| 5 | Hedge: consistently missed across iterations | `even sustained analysis has consistently missed it across iterations` |
| 6 | No single line of Charter text | `no single line of Charter text mentions` |
| 7 | Question quietly resolved | `the deepest question the architecture quietly resolves` |
| 8 | SAD definition | `voluntary, revocable, state-chartered sub-zones nested within +1 Sanctuary` |
| 9 | Single measurable criterion | `Each SAD gates membership on a single measurable criterion.` |
| 10 | Concurrent memberships | `layering their environment toward increasing specificity` |
| 11 | Automatic exclusion, no reassignment | `No VMSS reassignment or punishment follows, only loss of domain access.` |
| 12 | Hedge: most commonly | `Exclusion most commonly returns the resident to baseline Sanctuary standing` |
| 13 | Phase-back only on STI threshold | `phases back to Main Layer only if the underlying conduct also crosses the STI threshold` |
| 14 | MGDs private, community-defined, layer-agnostic | `MGDs are private, community-defined, and layer-agnostic.` |
| 15 | SADs state-chartered, standardized, Sanctuary-exclusive | `SADs are state-chartered, standardized, and Sanctuary-exclusive.` |
| 16 | State charter = enforcement, not prestige | `The state charter is an enforcement mechanism rather than a prestige marker.` |
| 17 | MGD leakage | `the private audit infrastructure cannot catch every case` |
| 18 | Zero-leakage state audit | `full institutional audit apparatus, which produces zero-leakage enforcement` |
| 19 | LID 100% genetic purity | `the Lineage Integrity Domain's 100% genetic purity is the clearest case` |
| 20 | Fallible by design | `MGDs are fallible by design and SADs are not.` |
| 21 | Seventeen at enforcement intensity | `exist at this enforcement intensity because their criteria demand it` |
| 22 | Chartered purpose | `specific measurable commitments that Sanctuary's baseline STI gating does not capture` |
| 23 | Centuries of use | `Operating at scale across centuries of civilizational life` |
| 24 | Four combined properties | `stack-composability, and zero-leakage enforcement in a single civilizational primitive` |
| 25 | Open-ended catalogue | `The catalogue is open-ended` |
| 26 | Load-bearing vs optional refinement | `rather than the optional refinement the Charter text framed them as` |
| 27 | In-world introduction, ISD 145+ | `Intelligence Standards Domain at the 145+ threshold` |
| 28 | PSD 20% body-fat tier | `Physique Standards Domain at the 20%-body-fat tier` |
| 29 | Earth-era profile comparison | `than an Earth-era dating profile could convey in paragraphs of self-description` |
| 30 | State-audited | `Every claim is state-audited to zero-leakage fidelity.` |
| 31 | RIL guarantee | `RIL membership guarantees zero recorded infidelity.` |
| 32 | ISD guarantee | `ISD membership guarantees the intelligence threshold has been met and sustained.` |
| 33 | PSD guarantee | `current body-fat percentage under the tier threshold, with continuous verification` |
| 34 | COD guarantee | `sustained creative output above the domain's cumulative threshold` |
| 35 | LID guarantee | `LID membership guarantees unmodified genetic lineage.` |
| 36 | Civilization has verified | `the civilization has already done the verification` |
| 37 | Most pervasive latent application | `the most pervasive latent application of SADs` |
| 38 | Information asymmetry | `did not design them to solve information asymmetry in matching markets` |
| 39 | Portable credential set | `A SAD stack is a portable credential set` |
| 40 | Persists across contexts | `persists across districts, visitations, and social contexts without re-verification` |
| 41 | Other matching markets | `The same architecture serves every other matching market the civilization operates.` |
| 42 | Employment filtering | `Employment contracts gated on SAD membership filter candidates to the verified criterion` |
| 43 | Byproduct verification | `as a byproduct of the SAD architecture's existence` |
| 44 | ISD 140+ threshold (see flag F1) | `A resident who meets the 140+ intelligence threshold has reason to join ISD` |
| 45 | Hedge: most members, both reasons | `Most SAD members participate for both reasons.` |
| 46 | Shared baseline, not history | `Sanctuary residents share a behavioral baseline but not a behavioral history.` |
| 47 | Public STI ledger check | `check every Sanctuary resident's public STI ledger individually` |
| 48 | Does not scale | `does not scale to the civilization's population` |
| 49 | RIL criterion | `zero recorded infidelity or major relational deception across their ledger` |
| 50 | Mental load shift | `the mental load shifts from the individual to the architecture` |
| 51 | Design philosophy | `build the problem out of the system at architectural cost` |
| 52 | STI pattern | `The STI system engineers the trust-verification problem out of routine social interaction` |
| 53 | Mega-wall pattern | `the mega-wall engineers the cross-layer boundary problem out of daily enforcement` |
| 54 | Hedge: most death events | `the backup vessel architecture engineers mortality out of most death events` |
| 55 | Four named SADs | `the Cognitive Clarity Domain, the Sobriety Baseline Domain, and the Lineage Integrity Domain` |
| 56 | Sanctuary floor 85 | `+1 Sanctuary operates with a behavioral floor at 85 STI.` |
| 57 | 95 / 99 / 99.9 | `produces an STI of 95, or 99, or even 99.9` |
| 58 | SADs no ceiling | `SADs have no ceiling.` |
| 59 | STI-gated SAD examples | `whose gating metric is "STI above 95" or "STI above 99."` |
| 60 | Charter does not restrict | `The Charter does not restrict SAD criteria to non-STI attributes` |
| 61 | SAD-nesting | `extends indefinitely upward through SAD-nesting` |
| 62 | Five rings plus chain | `five rings plus an open-ended SAD chain above the highest ring` |
| 63 | CCD alone | `A resident in CCD alone lives among bias-resistant thinkers.` |
| 64 | ISD 160+ | `ISD at the 160+ threshold` |
| 65 | Combinatorial demographic engineering | `The stack produces combinatorial demographic engineering` |
| 66 | Stack example 1 | `stacks CCD + COD + PSD + RIL` |
| 67 | Stack example 2 | `stacks Silent Practice Enclave adjacency + PLD + CND` |
| 68 | Curation tool | `The stack configuration is the curation tool.` |
| 69 | Primitive and compositional rule | `membership in multiple SADs stacks their filters` |
| 70 | Cost of base infrastructure | `for the cost of maintaining the base SAD infrastructure` |
| 71 | Finality question | `what motivates sustained behavioral excellence after the top of the formal layer system` |
| 72 | Counterfactual collapse | `The motivational architecture collapses at the ceiling.` |
| 73 | Indefinite motivational gradient | `extends the motivational gradient indefinitely upward through voluntary additional refinement` |
| 74 | Hedge: consistently reduce to SADs | `attempts to design a "+2 layer" above Sanctuary consistently reduce to SADs` |
| 75 | +2 redundant and philosophically wrong | `That is architecturally redundant, and it is philosophically wrong` |
| 76 | Voluntary-consent framework | `contradict the voluntary-consent framework the Charter rests on` |
| 77 | No +2 needed | `so the civilization does not need +2` |
| 78 | Hedge: realistic calibration, broadly achievable | `Under realistic calibration, this threshold is broadly achievable.` |
| 79 | 32.5% qualifies | `Approximately 32.5% of the VMSS population qualifies for Sanctuary` |
| 80 | Hedge: most residents | `because most residents, absent serious trust violations or qualifying behavioral breaches` |
| 81 | Not exceptional virtue | `it does not mark exceptional virtue` |
| 82 | Capabilities vs virtues | `These are capabilities and accomplishments rather than moral virtues.` |
| 83 | Independent dimensions | `The two dimensions are architecturally independent.` |
| 84 | No conflation | `VMSS does not conflate virtue with status.` |
| 85 | Charter requires nothing further | `nothing further for continued Sanctuary residency` |
| 86 | Separate axes | `it treats them as separate axes the resident may pursue independently` |
| 87 | Zero-sum | `No zero-sum competition over scarce virtue is involved.` |
| 88 | Both paths | `The architecture supports both paths and privileges neither.` |
| 89 | Localized vs full collapse | `which produces the collapse of the entire stack` |
| 90 | STI above 85 assumption | `(assuming STI remains above 85)` |
| 91 | Voids every membership | `Descent to any punitive layer voids every SAD membership at once` |
| 92 | Article VII | `The Charter's Article VII seals the upward pathway after punitive reassignment` |
| 93 | Re-acquisition impossible | `so re-acquisition is architecturally impossible` |
| 94 | No persistence below | `does not persist at -1, -2 or -3` |
| 95 | Hedge: periodically | `objection that has appeared periodically in analyses of the layer system` |
| 96 | -1 features | `speculative market access, reduced taxation, continued backup vessel coverage` |
| 97 | Economic terms | `(UBI differential, tax rate, revival reliability)` |
| 98 | Identity collapse | `the identity-as-credentialed-self all evaporate on descent and cannot be rebuilt` |
| 99 | Categorical miss | `and the miss is categorical` |
| 100 | Caste-like assortative outcomes | `SADs produce caste-like assortative outcomes` |
| 101 | Charter-compliant path | `This is the Charter-compliant path to what Earth-era societies built through caste systems` |
| 102 | Stack as brand | `The stack works as a brand, and the brand is state-verified.` |
| 103 | Anti-fraud | `fraud on the credentialed dimension becomes architecturally impossible` |
| 104 | Founders' Archive Domain | `"My grandmother was in the Founders' Archive Domain"` |
| 105 | Long-duration SADs | `(Centurial Domain, FAD, Creative Output Domain with sustained multi-century output)` |
| 106 | Stack resilience | `Architectural redundancy prevents any single exclusion from producing civilizational isolation` |
| 107 | Meta-SADs, five others | `membership in at least five other SADs filters for civic-engagement patterns` |
| 108 | Metalheads Domain | `The Metalheads Domain is a community for residents who share a specific aesthetic affinity.` |
| 109 | Prestige emergent | `Prestige, where it appears, is an emergent property of specific criteria` |
| 110 | MCG as Main Layer MGD | `operates as an MGD in Main Layer and exemplifies the form` |
| 111 | Guild vs SAD | `Guilds are one MGD instance; SADs are the state-verified parallel operating at Sanctuary scale.` |
| 112 | Hedge: may have recognized / anticipated | `may have recognized some of these functions during drafting and may have anticipated others` |
| 113 | Discovered, not designed | `whose full utility is discovered rather than designed` |

**Word counts:** block 3831 → 3585 (−6.4%).

**Flags**
- **F1 (internal defect, triage-listed, unchanged).** ISD threshold stated as 145+ in the matching-market self-introduction (`Intelligence Standards Domain at the 145+ threshold`) and as 140+ in the next section (`meets the 140+ intelligence threshold`). Both kept verbatim. It could be read as two tiers of one domain or as an error; Jason to rule.
- **Doctrine check, no change.** "Article VII seals the upward pathway after punitive reassignment" matches charter.html Article VII ("Punitive reassignment to any lower layer ... closes the upward pathway permanently"). No conflict.
- **Note.** "Approximately 32.5% of the VMSS population qualifies for Sanctuary" is an eligibility figure; left as is. It is not among the named clashes.
- **Edits of note (no meaning change).** Removed the intro closer ("The mechanism is the anchor. The emergence is the subject."), the "not a prestige marker. It is an enforcement mechanism." reversal (now one sentence), "Community plus credential compounds.", "Exclusion is targeted to the violated domain and nothing beyond." (restatement), the "ambition ... finds unbounded upward expression" restatement, and the closing aphorism run ("The Charter describes a mechanism. The architecture produces a substrate..."). The final paragraph's five rhetorical questions became one indirect list. In "Other Emergent Functions", the sentence "Residents sort themselves into criterion-matched communities by choice" was dropped because the paragraph's first sentence already states voluntary filtering.

---

## r24 — Metric Gated Domains

**Claims ledger**

| # | Claim / figure / citation / mechanism / hedge | Survives as |
|---|---|---|
| 1 | Infrastructure of daily social life | `Metric Gated Domains are the infrastructure of daily social life` |
| 2 | SADs: Sanctuary, state-chartered | `SADs occupy Sanctuary and operate at state-chartered enforcement.` |
| 3 | Hedge: vast majority of demand | `absorb the vast majority of the community-formation demand the civilization generates` |
| 4 | Hedge: most of their social lives | `Residents at every layer spend most of their social lives inside MGDs` |
| 5 | Whitepaper term | `The whitepaper calls MGDs the civilization's civic connective tissue` |
| 6 | Scale range | `from twelve-person working groups to millions-scale voluntary districts` |
| 7 | Federal institution withdrawn in -2/-3 | `perform in -2 and -3, where the federal institution has withdrawn` |
| 8 | MGD definition | `admit members on a transparent, measurable criterion of the founders' choice` |
| 9 | Not state-chartered | `They exist in every layer and are not state-chartered.` |
| 10 | Hedge: occasionally | `members occasionally slip in below the threshold or retain membership stealthily` |
| 11 | Federal floor binds | `Federal floor law binds inside every MGD regardless of layer` |
| 12 | Exclusion consequences | `no STI impact, no layer consequence, and no institutional recording of the exclusion` |
| 13 | Multiple memberships | `each MGD's founders accept them` |
| 14 | Size examples | `twelve-person algebraic topology working groups, hundred-person silent practice enclaves` |
| 15 | Size examples, larger | `ten-thousand-member craft guilds, hundred-thousand-member reputation-gated trade networks` |
| 16 | Million-plus | `million-plus-member market associations` |
| 17 | Hundreds of thousands | `running into the hundreds of thousands of distinct domains` |
| 18 | Hedge: much of civic identity | `the intersection of those memberships is much of their civic identity` |
| 19 | Categorical distinction | `The distinction from SADs is categorical.` |
| 20 | SAD attributes | `standardized in criterion and enforcement, and zero-leakage in audit` |
| 21 | MGD attributes | `founders-defined in criterion and enforcement, and leakage-tolerant in audit` |
| 22 | Stakes tiers | `SADs handle high-stakes credentialing where leakage is categorically unacceptable.` |
| 23 | Smaller slice | `SADs occupy a smaller and more specialized slice` |
| 24 | Five rings | `a layer architecture that sorts them across five rings` |
| 25 | Institutional apparatus | `(Meritboard, Supreme Court, federal enforcement, AI governance)` |
| 26 | Daily social question | `how do I find my people among billions?` |
| 27 | Textured vs anonymous | `make daily life textured rather than anonymous` |
| 28 | Stack as fabric | `the stack as a whole is the fabric of their social existence` |
| 29 | Earth-era megacities | `the anonymous-scale problem that Earth-era megacities produced` |
| 30 | None produce community | `None of these produce community.` |
| 31 | Compositional primitive | `define a criterion, admit qualified members, create a context in which members interact` |
| 32 | ATWG | `The Algebraic Topology Working Group (ATWG)` |
| 33 | Single named conjecture | `admits only contributors actively working on a single named conjecture` |
| 34 | Twelve vs more | `more than twelve would dilute the focus the MGD requires` |
| 35 | Tens of thousands; MCG | `Craft guilds like the Master Carpenters Guild (MCG) operate at this scale` |
| 36 | MCG functions | `apprenticeship networks, contract pass-through infrastructure, and trade community` |
| 37 | Calibrated scale | `small enough that members recognize each other by reputation` |
| 38 | Whitepaper note on -3 districts | `The whitepaper notes that the voluntary libertarian districts of -3 Terminal function` |
| 39 | Million-resident district criteria | `(contract-fulfillment history, non-aggression pledge adherence, productivity thresholds)` |
| 40 | De facto polity, federal floor | `It is not a government, since the federal floor still operates` |
| 41 | No scale constraints | `the civilization supports all sizes without imposing scale constraints` |
| 42 | Nine illustrative MGDs | `The nine illustrative MGDs catalogued on the SAD/MGD reference page` |
| 43 | Hedge: may not formalize | `that Sanctuary's SAD architecture may not formalize` |
| 44 | SPE | `the Silent Practice Enclave (SPE)` |
| 45 | Sanctuary ecology | `produces environments of extreme focus and coherence` |
| 46 | Three billion Main residents | `Three billion residents across continent-scale geography` |
| 47 | Main MGD examples | `(Verified Long-Form Readers Circle, VLRC), cross-layer mentor networks (CLMN)` |
| 48 | Tens or hundreds of thousands | `runs into the tens or hundreds of thousands of distinct domains` |
| 49 | -1 economic coordination | `MGDs become the primary mechanism of economic coordination` |
| 50 | CCTN | `the Clean Conduct Trade Network (CCTN)` |
| 51 | Better vs contested districts | `the difference between operating in -1's better districts and the contested ones` |
| 52 | -2 non-lethal harm | `The layer leaves non-lethal harm unprotected` |
| 53 | ORC | `The Operational Reliability Cooperative (ORC)` |
| 54 | ORC criterion | `multi-year zero-default, zero-violation records` |
| 55 | De facto local governance | `become the layer's de facto local governance` |
| 56 | VDMA | `The Voluntary District Market Association (VDMA) pattern` |
| 57 | Within days | `Default on a contract and every vendor in the network knows within days.` |
| 58 | Most consequential private penalty | `Loss of VDMA standing is -3's most consequential private penalty` |
| 59 | IRC across Main and -1 | `operates across Main Layer and -1` |
| 60 | Skill-gated | `on a skill-gated membership threshold` |
| 61 | Doctrinally load-bearing | `Cross-layer membership is structurally unusual and doctrinally load-bearing.` |
| 62 | Separable standings | `layer status and capability standing are separable` |
| 63 | Leakage causes | `because their standing degraded after admission and the community has not yet noticed` |
| 64 | Deliberate leakage | `The architecture accepts this leakage deliberately` |
| 65 | SAD model costs | `state infrastructure required per domain, standardization of criterion and enforcement` |
| 66 | No state approval | `without seeking state approval` |
| 67 | Tradeoff | `The tradeoff is leakage for flexibility` |
| 68 | Hedge: most use cases | `for most community-formation use cases the flexibility is worth more than the leakage costs` |
| 69 | Reproductive partnership | `Credentialing for long-term reproductive partnership, for example, cannot tolerate leakage` |
| 70 | Hedge: significant rate | `at any significant rate` |
| 71 | MGD-stack redundancy | `through SADs (in Sanctuary) or through MGD-stack redundancy` |
| 72 | Thin or minimal presence | `where federal institutional presence is thin or minimal` |
| 73 | Resource 22 citation (see flag F2) | `in the -2 sociological studies (Resource 22) are ORC-class MGDs` |
| 74 | No formal government in -3 | `no formal government operates in the layer beyond the federal floor` |
| 75 | -1 federal floor | `(UBI, Article XXV enforcement, backup vessel revival)` |
| 76 | -2 exposure | `the non-lethal-harm gap the federal floor leaves unaddressed` |
| 77 | -3 unregulated terrain | `-3's unregulated terrain produces, and the federal floor does not protect them` |
| 78 | Governance substrate | `MGDs are the civilization's governance substrate in regions where the institutional apparatus has withdrawn` |
| 79 | Symmetry | `MGDs supplement a robust institutional presence and provide optional community enrichment` |
| 80 | Member-governed primitive | `(measurable criterion, community vetting, member-governed community)` |
| 81 | Two-tier credentialing | `a two-tier credentialing architecture across the civilization` |
| 82 | Medium-stakes list | `residential matching, casual dating` |
| 83 | Hedge: if they have any | `leads with SAD credentials, if they have any` |
| 84 | Hedge: approximately accurate | `MGD memberships are approximately accurate rather than absolutely verified` |
| 85 | Hedge: might be slightly below | `An MGD member might be slightly below the stated threshold` |
| 86 | Fraud definition | `deliberate misrepresentation beyond the normal leakage band` |
| 87 | Both needed | `the civilization needs both` |
| 88 | Five layers | `domain needs residents across the five layers generate` |
| 89 | Hedge: primarily | `MGDs are primarily hobbyist or recreational infrastructure` |
| 90 | Participation not optional | `participation is not optional in any meaningful sense` |
| 91 | Half the function | `has missed half of the architecture's actual function` |
| 92 | Institutions listed | `the Meritboard provides competence ranking, and the Supreme Court provides constitutional adjudication` |
| 93 | Hedge: might initially suggest | `the optional community feature the whitepaper text might initially suggest` |
| 94 | No social life without them | `Without them the layer architecture would have no social life` |
| 95 | Fraction of that size | `the texture of communities a fraction of that size` |

**Word counts:** block 3059 → 2840 (−7.2%).

**Flags**
- **F2 (internal defect, triage-listed, unchanged).** First-person slip in a third-person textbook excerpt: `The territorial cooperatives I analyzed in the -2 sociological studies (Resource 22)`. Kept verbatim; Jason to rule.
- **Edits of note (no meaning change).** The flagged lines "the term is structural rather than poetic", "This leakage is a feature of private enforcement architecture rather than a bug", and the closing "Without them, the civilization would be a layer architecture with no social life" were rewritten plainly. Repeats of the civic-connective-tissue thesis and the "generative primitive" formula were cut where they restated earlier sections: the Thesis section's "social life happens inside this fabric" sentence, the Scale section's "designed to flex that widely" clause, the Credentialing section's "two credential tiers serve distinct matching contexts" restatement, the Student's Error "uses both in combination because both are necessary" restatement, and the closer's third restatement of the define/admit/create formula. The Student's Error still re-argues the SAD/MGD split; it is kept because it is part of the page's structure. Parenthetical em-dashes became commas or parentheses; the page now has none.
