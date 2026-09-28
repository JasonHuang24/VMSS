# Prose lift 24.8.5 ledger (faq.html)

Mode: clarity. Only the text inside running-prose `<p>` elements of the copy at `docs-review/prose-lift-24.8.5/faq.html` was edited. faq.html has no `<li>`, `<blockquote>` or `<td>` prose. Left alone: `<head>` and all meta text, every heading (h1-h4), the filter chips and buttons, the search placeholder, the hero deck, the filter-count line, the four section decks, the footer line, the empty-state line, every `<a>`, `<strong>` and `<em>` tag (same positions), and every script and style block.

JSON-LD: none of the 12 FAQPage `acceptedAnswer.text` values was a verbatim copy of a visible answer (each is a condensed summary; checked with entities decoded). Under the sync exception none needed updating, so the JSON-LD block is byte-identical to the original.

Quotes below are verbatim from the edited copy's visible text (entities decoded, curly quotes shown straight, inline tags stripped), each 15 words or fewer, inside « ». `faq-verify.mjs` checks every quote against the copy. Original wording, where cited, is in single quotes.

## faq.html

### Word counts

- All 147 `<p>` bodies: 11,422 → 11,137 words (-2.5%). 126 changed; 21 unchanged: hero deck, filter count, the three section decks (Core Mechanics, Philosophy & Value, Edge Cases), footer, empty state, and 14 short answers or captions with no tells or with a flag. Those 14 are the Q1 re-entry note, the Q2 "continuity, not innocence" caption, the Q4 murder-futility caption, the Q5 fidelity caption, the Q9 walls answer, the Q10 SAD examples, the Q12 child-rights line, the Q14 null-period note, the Q18 mega-walls answer, the Q25 PJS answer, the Q32 STI answer, the Q44 caption, the Q67 caption, and the Q71 caption (flag 5). Q numbers are the `faq-content-N` ids.
- No paragraph is longer than its original. No paragraph has more than one em-dash. Three are left in the running prose: two inside sentences held verbatim for doctrine flags (Q15, Q56) and one in the unchanged Q71 caption (flag 5).
- Number tokens in the prose are identical as a multiset (original vs copy).
- The cut is below the 5-15% aim. Most of the original's length was doctrinal content rather than padding, and replacing em-dash asides with plain syntax costs connective words ("because", "so", "and"). Clarity was kept over compression, and no sentence carrying a distinct claim was dropped.

### Claims ledger

**Core Mechanics**
- Exit: «Exit is always allowed from Main Layer (0) and above»
- «The lower layers (-1/-2) have no exit»
- «tier-equivalent transfer to a VMSS-adjacent allied state under reciprocal treaty coordination»
- «your status-based contract attaches in full»
- «From -3, exit is impossible; it is terminal.»
- Revival odds: «revival fails with approximately 1 in 1,000,000 probability»
- «approximately 1 in 10,000 in -1, 1 in 1,000 in -2»
- «-3 has no fabrication station presence.»
- «enforced at the hardware level and not by policy alone»
- «VMSS treats the decision to end one's own life as a continuity choice»
- «In layers with backup vessel infrastructure (+1 through -2)»
- «penalize the decision, or make intervention or counseling a prerequisite»
- 'functionally an accidental reset, not a permanent exit' → «revived automatically at full fidelity: an accidental reset, not a permanent exit»
- «suicide is final by default»
- «The civilization provides continuity infrastructure but does not compel its use.»
- «The victim revives. The perpetrator does not.»
- «having first removed their implant, has chosen permanent death»
- LP-065: «terminal sync capture and restoration under LP-065»
- «costed to the perpetrator's liquidation first»
- «This makes murder structurally futile in every layer above -3.»
- «the system acknowledges that revival is not a reset button»
- «The victim lives on, and lives with what happened.»
- «the enforcement model does not distinguish lethal from non-lethal harm»
- «Assault, torture, coercion, and sexual violence all trigger immediate severity-based reassignment»
- «intent plus execution of any qualifying harmful act crosses the threshold»
- «still results in reassignment to -3 even though no harm completed»
- «Family members are never penalized for association.»
- «answered by the ledger, not by interrogating survivors»
- «honored from the perpetrator's share before treasury absorption»
- «The act is on the perpetrator's record, not theirs.»
- «You wake up as you, not a copy with your memories.»
- 2150–3000: «As backup vessel technology matures across the 2150–3000 trajectory»
- «The mind is always you; the body catches up.»
- «Voluntary permanent residents are sealed in, and punitive reassignment is permanent»
- «no upward path exists from any punitive layer»
- SADs: «Beauty Minimum: ≥5/10 aesthetic rating»
- 'No moral judgment — only compliance.' → «Compliance only; no moral judgment.»
- Implants: «Implants are voluntary; you can refuse or remove them (if not in violation).»
- «VMSS participation requires implants for monitoring and continuity»
- «In +1 Sanctuary the implant is mandatory»
- «is phased to Main Layer rather than penalized»
- «makes identity non-repudiable regardless of hardware status»
- «Implant removal has real access consequences but is no evasion tool»
- Pregnancy: «deliberate termination of a linked pregnancy is murder»
- «carrying the standard murder consequence of reassignment to -3 Terminal»
- «Accidental or negligent fetal death is graded as manslaughter»
- 'not whether the parent's choice is consequence-free' → «the parent still answers for the choice»
- «Every person born in any layer starts with a clean record»
- «The system judges conduct, not birthplace.»
- «Layer assignment follows from individual behavior alone.»
- Null STI: «Children carry a null STI until age 18.»
- 'Null is not a number — it is the absence of a score.' → «Null means there is no score at all.»
- 85 (held verbatim, flag 1): «the phasing mechanism requires a score below 85 to trigger»
- 18 (held verbatim, flag 1): «The initialization score determines immediate layer eligibility.»
- «A Sanctuary-born 18-year-old who initializes below 85 phases to Main Layer»
- «weighted by the standard trajectory formula»
- Article II / §5.12 (caption unchanged): «Full provisions in Charter Article II and Whitepaper §5.12.»
- Day-one sort: «sorted to -1, -2, or -3 by severity»
- «Everyone else enters Main Layer.»
- Held verbatim (flag 2): «residents who earn ascension through sustained compliance within the system»
- «for the next thousand years performs the initial sort»
- Visitation: «Visitation flows downward only»
- «never one above it»
- LP-076: «That schedule is federal-tier, under LP-076»
- Articles III.IV–III.V: «Articles III.IV–III.V retain the principle and reach no band»
- «converted at destination purchasing power»
- «Backup vessel coverage travels with you in -1 and -2»
- «Entry to Terminal requires documented vessel-link suspension»
- «death during a -3 visit is final»
- «the offense determines your destination layer»

**Philosophy & Value**
- «Yes, but only once.»
- «intent + execution is measured»
- 28th–29th century (paragraph unchanged): «Forcefield integration arrives in the 28th–29th century.»
- «never thoughts, beliefs, or private fantasies»
- «No consequence is triggered without outward expression or action.»
- 'The system is physics-like consequence, not ideological judgment.' → «Consequence works like physics, without ideological judgment.»
- TIP: «do not measure thoughts, beliefs, or fantasies»
- 'observable patterns whose terminal endpoint is harm' → «observable patterns that lead toward harm» (verifier fix: an earlier "end in harm" could read as harm already done)
- «The cyberware-decompensation pattern is the canonical example.»
- «The first intervention is informational»
- «Restrictions escalate only as the trajectory does»
- «reassignment follows only an actual harm event»
- «The system does not punish anyone for what they have not done.»
- Combat sports: «Combat sports are explicitly permitted in Main Layer»
- 'Consent is logged at bout entry' → «First, consent is logged at bout entry»
- «TIP in Main is user-configurable»
- «Backup vessels catch fatal accidents.»
- «Sanctuary does not host hard combat sports the same way.»
- «lives in -3 only»
- LP-004.2: «The Backup Vessel Parity framework (LP-004.2) settles colosseum participation»
- Article III.V: «or filing Article III.V voluntary permanent descent»
- 85+: «some 85+ STI residents who qualify for Sanctuary ascension choose to remain in Main»
- «ascension is not an obligation»
- «Backup vessels preserve your mind-state and identity, not your moral status.»
- «you are revived in the same layer (if not -3)»
- «available outside +1 Sanctuary where TIP is mandatory»
- «In +1 Sanctuary and all SADs»
- «No harm ever occurs in the higher-trust layer.»
- Overtime: «every hour beyond 20 triggers the Overtime Premium Protocol»
- «VMSS has no minimum wage»
- «Once they request hour 21»
- «paid out of pocket rather than funded by the civilization»
- «The overtime rate scales by layer.»
- -3 life: «It depends entirely on who you are»
- «The layer stratifies quickly and visibly.»
- «there is no revival infrastructure in -3»
- Hedge kept: «The voluntary libertarian residents of -3 typically experience no such resentment.»
- «particularly in -3 toward -2's restoration provisions»
- -1 threshold: «The threshold between Main Layer and -1 is categorical, not a gradual slide.»
- «it logs to the STI ledger»
- «Two pathways qualify for -1 reassignment.»
- «Volume alone does not determine this.»
- «A resident at ninety-nine minor infractions who begins remediating is not trapped»
- «Punitive reassignment is permanent across all lower layers: -1, -2, and -3.»
- «STI improvement within a punitive layer is meaningful»
- «it does not restore eligibility for upward movement»
- «Only elective residents retain the upward pathway»
- «-1 is a spam filter.»
- «demonstrating trustworthy behavior for fifteen years.»
- «this filter basically never flags real mail»
- «The implant ledger removed the error.»
- Prisons: «The Five Rings replace federal incarceration with spatial consequence»
- Hedge kept: «private detention and local enforcement may emerge as part of the private order»
- «The civilization abolishes the carceral state»
- «VMSS measures consequence by lost access and a changed institutional relationship»
- «-1 still offers UBI, shelter, baseline protection, and a functioning private economy.»

**Economy & Work**
- «It is a labor allocation mechanism, not a moral endorsement system.»
- $50: «grey-market consulting at $50 per hour»
- «Three categories coexist freely»
- «Upward conversion is prohibited without exception.»
- 1-10%: «(1-10% retained depending on net worth)»
- 90-99%: «subject to a 90-99% forfeiture that prevents arbitrage»
- 100%: «100% of proceeds go to the Automation Dividend Treasury»
- «Joint assets are liquidated in full»
- 24 months: «within 24 months prior to reassignment»
- «progressive liquidation rather than full confiscation»
- 1%/10%: «Citizens retain between 1% and 10% of liquidated assets»
- $1 million: «90% treasury / 10% retained at under $1 million»
- $1 billion: «99% treasury / 1% retained at over $1 billion»
- «The upward pathway closes permanently at filing.»
- «triggers no liquidation and preserves the right to return at any time»
- «The percentage looks small; the asymmetric advantage it arrives with does not.»
- «A savings circulation mandate applies across all layers»
- «In -2 and -3 the mandate reaches only VMSS-distributed funds»
- «-1 is garnished on total savings like the upper pair»
- «the cycle is self-terminating»
- «Stock speculation and equity markets are excluded from +1 Sanctuary and Main Layer»
- «Earth-like capitalism» (opener now takes a colon; the earlier ", with no" added a word once the siloing sentence was restored)
- «The Savings Circulation Mandate applies only to UBI-origin savings»
- «Currency siloing ensures wealth accumulated in -3 stays in -3.» (original wording restored after verifier review; the rewrite read worse)
- «by intentional design, not incidental variation»
- «Heavy progressive taxation funds all of it»
- «The middle layers (-1 and -2) are hybrid economies.»
- «Partial institutional presence means partial taxation»
- LP-074 (sentence unchanged): «LP-074's complete current schedule is 50% / 25% / 12.5% / 6.25%, active since 2295»
- «Terminal's 6.25% top marginal rate is its endpoint»
- $10 million: «The $10 million threshold and layer-specific SCM scope are unchanged.»

**Lower Layer Life**
- «it does not mandate chaos or misery»
- «-3 in particular (minimal institutional presence, federal floor intact)»
- «more accurately described as a frontier economy than a prison»
- 'Yes — and this is by design, not by accident.' → «Yes, by design.»
- 65%: «a recidivism rate above 65% upon release»
- $5,000: «receives $5,000/month UBI»
- «the civilization's consequence model runs on separation, not suffering»
- «The consequence is permanent exclusion from the best the civilization offers»
- «Earth punishes by making life worse.»
- «The consequence has two parts.»
- «Losing access to that for a lifespan measured in centuries is not a minor inconvenience.»
- «SADs are Sanctuary-exclusive, state-chartered»
- «Punitive reassignment erases every SAD membership»
- Article VII: «Article VII seals the upward pathway and SADs are Sanctuary-only»
- «the economic differential between Main Layer UBI and -1 UBI is trivial»
- «A meaningful portion of -3 residents chose to be there.»
- Hedge kept: «the organic sub-stratification that emerges between them»
- «The implant ledger carries two distinct tracks»
- «Both travel with every resident into -3»
- «history is consistent that power vacuums fill»
- «those consequences are not obligated to be gentle»
- 6.25% / LP-074: «a 6.25% top marginal rate under active LP-074»
- «Gated communities, private security, and luxury goods are plausible outcomes»
- «their record is visible to every private institution»
- Colosseum: «a recognized category of place defined by the contract its gate enforces»
- «Death is on the table at even odds with survival»
- «in the layer's understanding of the word the death is not an injury»
- «the operator's legal exposure inside -3 is zero»
- «older than the Charter provision that made voluntary permanent residency in the layer possible»
- «one of the doctrinally protected uses of the layer»
- Article III.V: «file voluntary permanent residency under Article III.V»
- LP-076: «a federal-tier schedule under LP-076»
- 10% / $1M / 1% / $1B: «10% retained on the first $1M, scaling down to 1% above $1B»
- «accept that the descent is permanent under the Ceiling Seal»
- «The Saurian Park is the canonical documented example.»
- Duels: «is a homicide regardless of consent»
- «replaced with the cooperative-tolerance framework»
- «The cooperative is not endorsing killing.»
- «The federal floor still applies»
- «The reality is closer to a frontier with no sheriff»
- «-3 is that, scaled and distributed across hundreds of districts»
- «commercial enterprises, not gang outputs»
- «it can be answered five ways»
- «Any of the five is sufficient»
- «The enterprise is permitted because nothing is stopping it.»
- «This is a different regulatory regime rather than anarchy»
- «clean energy, nuclear weapons, implant integrity, civilizational sovereignty»
- Article X: «citizens who voluntarily exit under Article X»
- «A system you cannot leave is a prison regardless of how well it treats you.»
- 5.7 / 2.4 / ~4.3 billion: «The 5.7 billion people who did not join at founding»
- «the complement of the 2.4 billion who did»
- «grown to the ~4.3 billion residents of today»
- «VMSS does not aspire to planetary coverage.»
- Revival refusal: «Rare, but respected.»
- «No penalty attaches to the choice itself.»
- «Revival is not forced.»
- «the ledger is the consequence; death does not erase it»
- «This is not protected speech.»
- «-1 for financial inducement, social pressure, or one-time persuasion attempts»
- LP-063: «The schedule is codified federally as LP-063, the Revival-Refusal Coercion Act.»

**Visitation & Cross-Layer Movement**
- «Cross-layer commerce is legitimate, common, and bounded by the visitor protocols.»
- «private brokers who operate primarily in -1»
- Held verbatim (flag 3): «vessel link active (unless they have separately chosen to suspend it)»
- «The brokers are not criminals.»
- 'without the doctrine having to centrally plan it' → «without the doctrine having to plan it centrally» (verifier fix: an earlier "without central planning" widened the claim)
- «There are three distinct mechanisms.»
- «Voluntary permanent residents have sealed themselves in.»
- «their currency doesn't convert»
- Military: «two publicly acknowledged instruments»
- «accessible only through national military command authority»
- «capable of terminating thousands per capsule»
- «The military is invoked exclusively on the national defense track»
- «Never governance, policing, or dispute resolution.»
- «overwhelming by design and temporary by doctrine»
- «remain classified»
- «the territory remains VMSS territory»
- «apply across all five rings without exception»
- «enters the nanobot instrument's operational envelope instead»

**Governance & Identity**
- «AGIs receive full personhood under VMSS law»
- LP-077: «institutional standing attaches at signed enrollment (LP-077)»
- «citizen-originated instantiation classifies as reproduction»
- Held verbatim (flag 4): «An AGI can ascend to Sanctuary through sustained compliance»
- «The Supreme Court's flexible composition (human, AI, AGI, cyborg, in any ratio)»
- «Structural independence between the executive and judicial branches comes from metric separation»
- «No entity ranked by a metric holds authority over the design of that metric.»
- «Competence is measured, not voted on»
- 1% / 30 million: «Once signatures reach 1% of the layer's population (roughly 30 million in Main Layer»
- 80%: «80% ratification enacts it as binding law»
- «Districts are defined as one million residents»
- «gerrymandering is structurally impossible»
- «In -3 Terminal, enacted regulations are advisory only»
- Article XXVIII: «Full mechanism in Article XXVIII.»
- Article XI gauntlet: «70% Meritboard, 7/10 Supreme Court, Heaven consensus plus Main supermajority»
- «Lower layers are excluded from Charter amendment»
- XXV.VI ladder: «60% Meritboard filibuster floor, 6/10 Supreme Court»
- «(Sanctuary 90%, Main 70–80%, lower-layer aggregate 70–80%), presidential veto»
- «Lower layers are included here»
- «1% petition, Meritboard-assigned expert drafting, 80% direct population ratification»
- «Dual-key classification (Meritboard plus Supreme Court concurrence)»
- «The Charter is not the civilization's prohibition list.»
- «live one tier below at Article XXV (federal law)»
- 18 USC: «They live in 18 USC and state penal codes.»
- Article III Section 3: «it appears in Article III Section 3 specifically to constrain»
- «Murder is prohibited through Article XXV.VI at the federal tier»
- «XXV carries the prohibition list»
- «The right tier for new substantive prohibitions is federal law.»
- XXV.I: «XXV.I Clean Energy Mandate ≈ Clean Air Act / Clean Water Act»
- XXV.II: «XXV.II ≈ Atomic Energy Act plus non-proliferation treaties»
- XXV.III: «XXV.III implant and institutional hacking ≈ Computer Fraud and Abuse Act»
- XXV.V: «XXV.V classified instruments ≈ National Security Act framework»
- «VMSS XXV does not front-load a criminal code»
- «murder triggers -3 reassignment, child rape triggers -3»
- Article XXVI: «Article XXVI handles substances through permission-plus-context rather than prohibition»
- LP-071 → LP-074: «enacted through the XXV.VI ladder (LP-071 → LP-074)»
- «the Charter fixes only the progressive-burden principle»
- «Article X handles exit/entry at charter level»
- § 1111: «18 USC § 1111 only covers murder within federal jurisdiction»
- «It is the cross-layer externality catalog, not the total prohibition set.»
- «US Constitution ≈ VMSS Charter (structural principles)»
- Replenishment: «Economic consequence, not criminalization.»
- Article XXVII / 2.5: «Article XXVII establishes the replenishment-tax architecture with a target of 2.5 children»
- LP-064: «a federal-tier schedule under LP-064, not Charter text»
- «The first two children carry no additional burden.»
- 50%: «a 50% compounding escalation restructures the household's fiscal position»
- 40% / 60%: «a baseline 40% aggregate effective rate rises to 60% at the third child»
- 90% / 135%: «90% at the fourth, and 135% at the fifth»
- LP-081: «habitual residence at each child's birth (LP-081)»
- «so the curve binds identically on market earners»
- «descent follows from arithmetic, not punishment»
- «the Replenishment Assessment and Child Dividend Stewardship Act»
- «The sixth child triggers nuclear consequence»
- «-1 reassignment for both parents»
- 18: «stewarded to the child's own benefit and vesting at 18»
- «The penalty targets the reproductive decision, never the people it produces.»
- «The replenishment tax makes this constraint self-enforcing.»
- 34: «A +1 resident age-pinned at 34 with custom morphology»
- «a modified human, not a new organism»
- «The only status that changes is lineage integrity.»
- Twelve: «There is no disputed factual record for twelve citizens to evaluate.»
- «has no VMSS equivalent»
- «citizens petition to repeal it through Article XXVIII»
- «These mechanisms are slower than jury nullification but more systematic»
- «A revived species carries the same ecological and legal protections as a surviving one.»
- «does not produce a "net positive"»
- «The intent to profit from a cycle of destruction and restoration is documented fraud.»
- Hedge kept: «Probably. This is cultural»
- «will drift apart naturally»
- «VMSS treats this as a feature, not a problem.»
- «between +1 and 0 is the same phenomenon as cultural divergence between 0 and -1»
- 2050 / 2350: «A person wronged in 2050 is still alive in 2350»
- «The system's response is institutional, not suppressive.»
- 300-year: «A citizen who carries a 300-year grudge is not penalised for it»
- 80–90%: «80–90% of Main Layer, and the President all agreeing, in sequence»
- «with no gate skippable»
- «No rule says of the founding core "this cannot be changed."»
- «The civilization chose honest protection over brittle prohibition.»
- Ten years: «Every ten years, a blind review challenge tests the President»
- «appointed by the Supreme Court»
- «If the challenger wins, succession is immediate.»
- «No term limits, but no free ride either.»
- «The implant ledger makes factual error structurally improbable»
- «"structurally improbable" is not "impossible,"»
- «the Supreme Court holds remedial authority»
- «not a general appeals pathway»
- LP-006 / LP-004.2: «(LP-006 disclosure + LP-004.2 Backup Vessel Parity)»
- «compromised-consent recruitment into mortality-priced work is restricted in -1 and -2»
- «vessel links do not cross the -3 boundary at all»
- 2093 / 2111 / 2115: «disclosure in 2093, the failed parity mandate in 2111»
- «the consent-scoped redraft in 2115»
- 80% / ten years: «requires 80% direct population ratification»
- «the President faces a blind performance review every ten years»
- «two different questions, two different mechanisms»
- Three billion: «Three billion people across three thousand districts»
- «Every regulation still requires 80% ratification within each participating district»
- «The four founding lines inscribed in the Charter Preamble»
- «consequence follows conduct»
- «life is preserved without innocence being granted»
- «The four lines are not legally immutable.»
- «treats them as inherited voice rather than inherited law»
- «Nothing makes them legally untouchable; nobody has ever wanted to touch them.»

### Flags

1. Q14 (children's STI), doctrine: STI never sets placement. Two passages tie placement to an STI number: 'the phasing mechanism requires a score below 85 to trigger' and 'The initialization score determines immediate layer eligibility. A Sanctuary-born 18-year-old who initializes below 85 phases to Main Layer through the standard mechanism.' Phasing out of Sanctuary on a sub-85 score reads as STI setting placement. Held verbatim. The rest of both paragraphs was lifted. Whether a sub-85 exit counts as eligibility (allowed) or placement (not allowed) needs a ruling.
2. Q15 (day-one sort), doctrine: Sanctuary eligibility at 85 is immediate. 'residents who earn ascension through sustained compliance within the system' implies a time requirement. Held verbatim (it keeps the paragraph's one em-dash).
3. Q56 (fixers), doctrine: LP-004.2 vessel-link suspension in -3. The example contract is 'technical work performed in -3', but the visitor is described as travelling with 'vessel link active (unless they have separately chosen to suspend it)'. For -3, suspension is mandatory at entry, not optional. Held verbatim (it keeps the paragraph's one em-dash).
4. Q61 (AGI), same issue as flag 2: 'An AGI can ascend to Sanctuary through sustained compliance'. Held verbatim.
5. Q71 caption, weaker form of flag 2: 'earned through sustained demonstrated non-harm' (Sanctuary's right to its own norms). Left unchanged as a whole paragraph. It may be fine, because it describes the population's collective record rather than an eligibility test.
6. Consistency, not a ruling: Q78 says 'Three billion people across three thousand districts', and Q54 gives '~4.3 billion residents of today'. The Q78 figure is probably Main Layer only (it matches Q63's 1% ≈ 30 million), but the text doesn't say so. Numbers are frozen, so both were left as they are.
7. Q22 answer (only its closing sentence was lifted): 'If you commit a capital offense, you are revived in the same layer (if not -3), but the layer reassignment is permanent' is compressed to the point of seeming self-contradictory (revived in the same layer, yet reassigned). Left as it is. It is outside the five listed rulings, but a clarity pass on the source should look at it.
8. JSON-LD: the 12 FAQPage answers are paraphrases, not copies, so the sync exception did not apply. Several of them still carry em-dash and 'not X, but Y' habits that the visible answers have now lost (for example "What is daily life like in -3?" and "Are the lower layers just prisons…"). If the JSON-LD should track the lifted wording, that needs a separate instruction.
9. Q66 edit (US federal law comparison): 'the founders deliberately did not front-load the catalog' was kept in the original wording after a trial rewrite ('left the catalog open') shifted its meaning.
