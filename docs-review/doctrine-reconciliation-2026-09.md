# Doctrine reconciliation register — site v25.8.0 (2026-09)

This register records the doctrine reconciliation run that shipped as site v25.8.0. A doctrine reviewer read every contradiction left open by the 2026-09 doctrine sweep, the 25.7 hardening triage and the cold review, against the tier order (Charter → enacted law / VMSS Laws → whitepaper → descriptive World pages → Resources / Academy / Simulations). An editor then applied the changes the tiers settle. Anything the tiers do not settle is set out below for Jason's ruling and was **not** applied.

Line numbers are the pre-edit numbers the review used. Per-unit edit ledgers (old and new text for every applied edit) are in `docs-review/doctrine-reconciliation-v25.8.0/` (u0–u4 and the verify-fixes ledger).

## 1. Summary

| Disposition | Items |
|---|---|
| Judgment (held for Jason; nothing applied) | 23 |
| Authority-resolved | 45 |
| — of which applied in this release | 42 |
| — of which already fixed in an earlier release (no further edit) | 3 (TL-13, LR-15, LR-21) |
| Dissolved (not a contradiction) | 37 |
| Reverted after verification | 0 |
| **Total register items** | **105** |

Several register items merge duplicate source findings (for example TL-05+ACA-02, LR-18+FIDELITY-2). Each merged item appears once.

Beyond the listed items, the verify pass applied five mirror or follow-through edits so the same fix held everywhere it appeared (section 3.10), and three optional edits the item texts offered were taken (LR-12, PARITY-2, LR-20; noted in place). All other optional edits were left for Jason.

**Suites at ship:** check-canon 141/141; css-cascade clean; check:certification, check:path2-record and test:certification (2272 hostile mutations rejected) pass; test:guard-mutations 98/98; test:code-guards 8/8. `npm run build:css` leaves tailwind.css unchanged. Both PDFs were regenerated from their sources; the `?v=` busters on simulations-academy.html and simulations-resources.html are 2580.

### Why the doctrine sweep did not close these

The 2026-09 doctrine sweep (docs-review/doctrine-sweep-2026-09.md, applied as v24.3.2) was a targeted sweep. It checked every page against five rules only: R1 STI never sets placement, R2 Sanctuary eligibility at STI ≥ 85, R3 STI and the ledger in −3, R4 downward mobility, R5 currency conversion. It reported tensions T1–T3 without resolving them. Most items here fall outside those five rules: timeline and eras, tier ladders, sync cadence, the kill switch, wall dimensions, and Snapshot rates. LR-04 is the sweep's T1/T2, still open by design. About a third of this run's items dissolved on a close reading (section 4). The 23 judgment items are real contradictions, but the tiers do not settle them, so they need a ruling rather than an edit.

---

## 2. JUDGMENT — for Jason's ruling

Each item gives the conflicting texts, what the tiers say, the steelman, the recommended resolution and the alternatives. Nothing in this section was applied. Items that edit Charter text need strict-mode approval. Dependencies between rulings are noted in the items and summarised at the end of the section.

### 2.1 Timeline, vantage and founding scale

#### TL-03 — Which "now" the World-tier front and descriptive pages speak from

**Texts.** why-vmss.html speaks from two presents. :420 ("VMSS delivers approximately 10% of its stated promise today ... do not exist") and :639 ("leakage declining from ~90% today") are written from 2026. :138 ("has been operative since 2295") is written from after 2295. faq.html is consistently post-2295 (:501, :664). technologies.html has ten "Current State — ~N% Delivery" boxes in the 2026 sense (:89, :144, :188, :256, :280, :336, :358, :406, :460, :494) on a page that otherwise describes mature technology. roadmap.html :95–96, :116, :123 and the meta descriptions at :12 and :18 are written from 2026. join.html:58 describes a present after the technology has matured.

**Tiers.** No text sets a site-wide vantage convention. The top tiers lean in-world: Charter XXII's present (charter.html:338), laws.html stating the law in force, and the R13 layer guard, which treats root pages as World tier (tools/check-canon.mjs:374, :390). Against this, index.html:53 presents the site as "A proposed voluntary civilization" and a "Conceptual civilization study", so an out-of-world 2026 register exists by design.

**Steelman.** The 2026 register is deliberate hard-science grounding, and the roadmap can be read as the founding roadmap (R4: "The founding roadmap projects", resources-source.html:1201). The break is real only where one page carries both presents, or where a present-tense 2026 claim sits beside a description of the mature civilization.

**Recommended.** World-tier pages speak from the in-world present (after 2295), and the 2026 delivery figures are always dated to the founding.
- why-vmss.html:420 → "At the founding treaty, VMSS delivered approximately 10% of its stated promise. Backup vessel technology, continuous behavioral monitoring at civilizational scale, and autonomous contextual enforcement did not exist. The blueprint described a civilization that required technologies several generations away from operational readiness, and it said so up front instead of waiting for a critic to discover it."
- why-vmss.html:423: "Existing prototypes establish the direction:" → "The prototypes of 2026 established the direction:"; "The gaps are in the scale and integration required, since the concepts already exist." → "The gaps were in the scale and integration required, since the concepts already existed."
- why-vmss.html:639: "Today, VMSS delivers ... do not yet exist. The blueprint is sound; the world needs time to develop the materials. ... from ~90% today to ~25% system-wide by 2150 as those technologies cross" → "At its founding, VMSS delivered ... did not yet exist. The blueprint was sound; the world needed time to develop the materials. ... from ~90% at founding to ~25% system-wide by 2150 as those technologies crossed".
- Leave why-vmss:138 and :441–444.
- technologies.html: relabel the ten "Current State — ~N% Delivery" boxes "At Founding (2026) — ~N% Delivery", keeping the numbers. technologies.html:476 "requiring manufacturing technology not yet available at construction scale" → "requiring manufacturing technology that did not exist at construction scale at the founding".
- roadmap.html:95 "Where We Actually Are" → "Where We Began", and roadmap.js:42 "21st Century — Where We Actually Are" → "21st Century — Where We Began". :96 "VMSS today delivers roughly 10% of its stated promise. The other ~90% is leakage" → "VMSS delivered roughly 10% of its stated promise at the founding treaty. The other ~90% was leakage". :116 "We are drafting blueprints ... The world needs time." → "We were drafting blueprints ... The world needed time." :123 "VMSS today delivers approximately 10% ..., which means it operates at approximately 90% leakage" → "VMSS delivered approximately 10% at founding ..., which meant it operated at approximately 90% leakage". :12 and :18 "~90% leakage today" → "~90% leakage at founding".
- faq unchanged.

**Alternatives.** (A) Formal dual register: the roadmap, the technologies status boxes and why-vmss #21–22 keep the 2026 voice; post-2026 facts are removed from those pages (why-vmss:138 loses "has been operative since 2295"); one site note says those pages address the reader of 2026. (B) Minimal: date only why-vmss:420, :423 and :639, and treat the roadmap and technologies as founding-era assessments.

**Note.** TL-06, TL-07, TL-08 and LR-22 touch other roadmap lines (:148, :214, :268, :280, :282, :287, :350, :366, :412, :432, :622). None overlaps these lines, and all hold under every option here. The technologies:476 edit is compatible with the TL-07 wall ruling. (TL-08 and LR-22 were applied in this release.)

#### TL-04 — Formative-era leakage: Charter XXIII 25% vs the 90% founding baseline

**Texts.** charter.html:343: "In the formative phases of the 21st and 22nd centuries, leakage of approximately 25% across all categories is anticipated and accepted as the cost of infancy." The lower texts give a different early curve: whitepaper.html:1598 has "2026 ~90%", :1549 the "starting reality ... approximately 90%"; roadmap Phase 0 has ~90% and Phase 1 "prototype leakage at first operation ~40–50%" with "~25% system-wide by 2150"; why-vmss.html:639 "~90% today to ~25% system-wide by 2150"; academy-source.html:1794 "the 90% leakage era".

**Tiers.** The Charter is the top tier, but its sentence is the only text that gives a figure for the 21st century, and its own list opens with "2150: ~25% leakage — prototype operational, formative infrastructure" (charter.html:345), which agrees with every lower text. Rewriting the lower texts to 25% would erase the 90% founding baseline (whitepaper.html:1549), so no text cleanly controls.

**Steelman.** Charter XXIII defines leakage as failures of an operating "enforcement and infrastructure chain" (charter.html:341). The 90% is a readiness assessment made before that chain existed. "Approximately 25%" reads naturally as the tolerance the formative phases converge on. That reading fits the 22nd century but strains in the 21st.

**Recommended (Charter clarity edit; strict-mode approval).** charter.html:343 → "In the formative phases of the 21st and 22nd centuries, leakage falling to approximately 25% across all categories by 2150 is anticipated and accepted as the cost of infancy."

**Alternatives.** (b) No edit, adopting the steelman reading. (c) Add "2026: ~90% — founding treaty, enabling technologies not yet operational" as the first row of the Charter list, mirroring whitepaper.html:1598. Rejected: (d) rewriting the lower pages to 25% at founding.

#### TL-05+ACA-02 — Founding scale: billions at founding vs a small founding cohort

**Texts.** Billions at founding: faq.html:664 ("The 5.7 billion people who did not join at founding (the complement of the 2.4 billion who did, a founding cohort ..."); faq.html:215 ("How does Earth's population sort into VMSS on day one?"); Academy Q29 ("On day one, the civilization processed billions of people", academy-source.html:1629); R6 ("The founding-era intake processed billions", resources-source.html:1273); Earth Introduction (simulations.html:1005 "In Year One, hundreds of millions", :1014 "by Year Ten ... several billion") and The Wider Door (:2423, 4.3 billion at year sixty). Small cohort: R15 ("The population numbered in the low thousands" for 2026–2036, resources-source.html:703); Q32 (grow "from the founding cohort to a self-sustaining critical mass" of "500,000 and 5 million" over 2026–2076, academy-source.html:1773, :1792); rate-history.html:223 ("roughly one million citizens"); roadmap.html:196, :216 ("core research team + volunteers"). The two source findings recommended opposite models with incompatible rewrites of academy-source.html:1629.

**Tiers.** Neither the Charter nor the whitepaper fixes the founding population. charter.html:338 gives only today's 4.3 billion, and whitepaper.html:1681 does not date its "first mass movement". faq, world, roadmap and rate-history are same-tier descriptive pages. Enacted law sets a floor: LP-006 was filed in 2091 by the "-3 layer-wide coalition + -2 and -1 coalition interests" (law-polling.html:910ff), so a populated five-layer polity existed by about 2091. world.html's Era I "Founding" (:450–452) is a short era, while Q32 (:1778, "Founding-Era Strategy", 2026–2076), rate-history:223 and R15 use "founding era" loosely, so the phrase cannot settle it.

**Steelman.** Most texts reconcile if "founding era" means the formative phases rather than day one. Q32 labels 2026–2076 "Founding-Era Strategy"; world §2's "mass movement" sits beside waitlists (world.html:496); R14 puts institutional presence on the ground only from early 2029 (resources-source.html:664); R16:777 says the interior population "had not yet reached the densities that required ring separation"; R17:813 speaks of "an internal population too small". On that reading only Q29's "On day one" and faq:664's "at founding" / "founding cohort" are literally incompatible. The counter-case (ACA-02): faq outranks the Academy, and most in-world texts (faq, world §2, R6, Earth Introduction) describe a mass founding.

**Recommended (Model C).** A small founding cohort (thousands through the 2030s, per R15 and roadmap Phase 0); critical mass of 0.5–5 million by about 2076 (Q32); a five-layer polity by the 2090s (LP-006); about 2.4 billion by the close of the founding era (faq); billions in roadmap Phase 2; 4.3 billion today (Charter XXII).
- faq.html:664 → "The 5.7 billion people who did not join during the founding era (the complement of the 2.4 billion who did, a founding-era intake that immigration and reproduction have since grown to the ~4.3 billion residents of today)".
- academy-source.html:1629 "On day one, the civilization processed billions of people through the same moral accounting" → "Across the founding era, the civilization processed billions of people through the same moral accounting"; regenerate the Academy PDF and bump its ?v.
- No change to R6:1273, world §2, Q32, R15:703 (population sentence), the roadmap Phase 0 population lines or rate-history:223. If TL-09 re-bases Y0 to 2026, rate-history:223 "at roughly one million citizens" → "at no more than roughly one million citizens".
- Flag, not edit: Earth Introduction's Year One / Year Ten figures and The Wider Door's 4.3 billion at year sixty are era-pinned story numbers that conflict with Model C (held with queue #33 and #38, SIM-01, SIM-05).

**Alternatives.** (B, ACA-02: mass founding 2026–2029) academy-source.html:1629 → "In its founding years, the civilization processed billions of people"; rescope Q32's objective (1) (:1773) and its B-grade critical-mass sentence (:1792) to retention and legitimacy under mass intake (new text, drafted after the ruling); rewrite roadmap.html:196, :216, :268, :287 and the Phase 2 "reaches billions" line, rate-history.html:223 and R15:703. B is heavier, and it leaves UBI for 2.4 billion people funded by a treasury Q32 says was "funded at seed level" (:1794). (A) Only a research team before 2070, taking the roadmap literally, is ruled out by LP-006 (2093) and LP-004.2 (2115).

**Dependency.** TL-06's replacement wording depends on this ruling.

#### TL-06 — Roadmap Phase 1 "prototype community of thousands" vs the enacted-law timeline

**Texts.** roadmap.html Phase 1 (2070–2150): "Population: prototype community of thousands" (:268, :287), and "First small enclosed prototype community established: hundreds to low thousands of voluntary citizens ... No ring or mega-wall, just a controlled settlement proving the integrated system works before physical scaling begins" (:280). Population side of queue #41.

**Tiers.** Enacted law controls the diagnosis. LP-006 was filed in 2091 and enacted in 2093 (law-polling.html:910ff; laws.html:830), drafted by "-3 layer-wide coalition + -2 and -1 coalition interests". LP-004.2 was filed in 2113 and enacted in 2115 (law-polling.html:790ff), with three-track ratification. A populated, stratified VMSS exists inside Phase 1, so the Phase 1 population label is wrong on any reading. Held as judgment because the replacement asserts a population trajectory that only the TL-05 ruling sets, and its "rings" wording interacts with the TL-07 wall ruling.

**Steelman.** Phase 1's prototype survives as a full-conditions testbed inside an already settled territory (:226 says only that it "runs the full system for the first time"). What fails is the label that makes the prototype the whole population, and "No ring or mega-wall ... before physical scaling begins". Reading the page as a 2026 projection does not save the population line, because the page presents the phases as the canonical trajectory and cites whitepaper §29.1 (:283).

**Recommended (under TL-05 Model C).** roadmap.html:268 and :287 "Population: prototype community of thousands" → "Population: founding-era rings growing toward billions; full-system prototype community of thousands", rest of each line unchanged. :280 "No ring or mega-wall, just a controlled settlement proving the integrated system works before physical scaling begins." → "It is a controlled settlement inside the founding territory, proving the integrated system works before the full system scales to every ring." Leave :226, the :259 SVG caption and the leakage figures. Under TL-05 Alternative B, replace "growing toward billions" with the chosen figure.

**Flag.** The Phase 0 population lines (:196, :216, "core research team + volunteers", 2026–2070) match R15:703 for the 2030s but strain against rate-history.html:223 (about one million) and Q32's 0.5–5 million by about 2076. Rule with TL-05.

#### TL-07+RES-02 — Mega-wall construction start and material era

**Texts.** R16 builds the outer perimeter from the founding decade: Founding Composite at construction-grade volume in late 2029, the first wall segment in mid-2030, the southern outer wall about 40% complete by 2036 (resources-source.html:769, :777, :800). R17:831, R18:898 and world.html:473 ("The mega-walls were unfinished") share this history. Against it: roadmap Phase 0 "No ring is built in this phase" (roadmap.html:148) and "No physical ring construction in this phase" (:214); Phase 1 "initial construction begun" in 2070–2150 and "The mega-wall is a 22nd–24th century project; this phase lays its engineering and materials foundation" (:282); R15 "The mega-wall was not yet under construction" for 2026–2036 (:703); R5 "The mega-walls are a 22nd-24th century construction project, approximately 200 years from groundbreaking" (:1734), with materials available "in the early 22nd century" funded by a founding generation "without expecting to see the results" (:1735).

**Tiers.** No text cleanly controls. The whitepaper's figures are scoped to the ring-boundary walls: whitepaper.html:1103 "Continuous geographic-scale barriers between layers ... requiring 22nd–24th century construction technology"; technologies.html:476 "The physical boundaries between layers"; whitepaper.html:1637 "Wall construction phases run from the 22nd through 24th centuries". R16:777 itself defers the interior walls to a multi-century program and closes the outer perimeter only in the early 22nd century. Q32 (academy-source.html:1773) has no segment built in 2026, which R16 agrees with. The unscoped claims (roadmap:148, :214, :282; R15:703; R5:1734–1735) are same-tier or Resources text.

**Steelman.** The whitepaper and technologies pages name the main ring-boundary phases, so they do not rule out founding-decade outer segments. The hard conflicts are roadmap Phase 0's blanket negations, R15's one sentence, roadmap:282's "materials foundation" in 2070–2150, and R5's dating of construction-scale material to the early 22nd century against R16's 2029 composite.

**Recommended.** Keep R16's founding-decade outer-perimeter history (the most detailed, cross-referenced across R14–R18) and scope the 22nd–24th-century statements to the ring-boundary walls, as the whitepaper and technologies already do.
- roadmap.html:148 → "No ring interior is built in this phase: the enabling technologies must first begin to exist, and only the first outer-perimeter wall segments rise."
- roadmap.html:214 → "No interior ring construction in this phase; the first outer-perimeter wall segments rise from the 2030s."
- roadmap.html:282 → "Boundary wall construction extends beyond the founding-decade perimeter segments. The ring-boundary walls are a 22nd–24th century project; this phase lays their engineering and materials foundation."
- resources-source.html:703 (R15) → "The mega-wall's first segments had only begun to rise."
- resources-source.html:1734 (R5) "The mega-walls are a 22nd-24th century construction project" → "The ring-boundary walls are a 22nd-24th century construction project".
- resources-source.html:1735 (R5) → "are each a research frontier the founding generation funds for the ring-boundary program. Those materials become available for construction-scale manufacturing in the early 22nd century".
- Leave whitepaper:1103, :1637, technologies:476/:496, world:473, R16, R17:831 and R18:898. Regenerate the Resources PDF.

**Flag.** The :1735 edit treats the ring-boundary materials as distinct from R16's 2029 Founding Composite. That is an inference from whitepaper:1103's scope, not a stated fact. TL-08's already-applied edits survive this scoping.

**Alternative.** Hard-science timeline governs every wall: leave the roadmap, R5 and R15, and re-date R16's founding-decade chronology (2029 composite, mid-2030 first segment, 2031 imagery, 2033 workforce, 2036 and 2050 progress, 2038 protocols, 2040 microclimate), R17:831 and R18:898. No canon text supplies new dates, so this is not recommended.

#### TL-09 — Era-year epoch: implied Y0 = 2101 vs the 2026 founding

**Texts.** rate-history and the Path 2 records imply Y0 = 2101: "Y112 (2213)" (rate-history.html:188), "approximately Y175 (2276)" (:240, :257), "Adopted under the rule enacted 2278 (Y177) · Adopted, 2279 (Y178)" (documents/path-2-charter-source.md:3–4). LP-071 puts Y0 at the founding ("At founding ...", Era field "Foundation Era · Y0–Y11", law-polling.html:2380, :2382), and the Founding Treaty is dated "Enacted March 29, 2026" (charter.html:466). Epoch half of queue #42.

**Tiers.** The hierarchy points to Y0 = 2026: the Charter and LP-071's "At founding". Enacted LP-074 fixes the calendar years (law-polling.html:2442–2443). But the 2101 epoch comes from a standing founder ruling (R16 §3) that knowingly left the reconciliation open ("The full era-year-to-calendar reconciliation is docketed and has not been done", pending-ratify-tax-50-record.html:197), and the only repair consistent with the tiers rewrites rate-history's interval-cadence analysis.

**Steelman.** rate-history calls era-year boundaries "record convention" (rate-history.html:216, :258), so the Y-count could be a separate civil count. But LP-071 ties Y0 to the founding in so many words, and no text records any event in 2101.

**Recommended.** Re-base on Y0 = 2026 and keep every calendar year. Shift mapped labels by +75: Y112→Y187, Y113→Y188, ~Y175→~Y250, Y177→Y252, Y178→Y253, Y190→Y265.
- World tier: rate-history.html (Y112 ×7, Y175 ×3); documents/path-2-charter-source.md:3–4; documents/path-2-schedule-source.md; documents/path-2-adoption-ruling-source.md; documents/path-2-presidential-ruling-source.md; tools/build-path2-pages.mjs (Y178 ×4 literals); path-2-commencement-duty-act.html:53.
- Process tier: documents/ratify-tax-50-ii-statute-source.html (Y112 ×5, Y113, Y175); tools/build-pending-pages.mjs:665 (~Y175).
- The unmapped Y0, Y11, Y12, Y46 and Y47 stay.
- Cadence passage: rate-history.html:255 "12, 35, and 65 years apart ... and Y47 to the abundance petition at Y112. Each interval is roughly double the one before it." → "12, 35, and 140 years apart ... and Y47 to the abundance petition at Y187 (2213). Each interval is longer than the one before it." :257 → "The fifth beat broke the pattern. The refile at approximately Y250 (2276) came 63 years after the Y187 (2213) failure, the first interval shorter than the one before it." :258 "(Y12, Y47, Y112, ~Y175)" → "(Y12, Y47, Y187, ~Y250)", and "The third figure, 65," → "The third figure, 140,".
- Rebuild with build:path2-pages, build:pending and build:path2-record (recomputes the SHA table), then run the suites. Leave the R16 note in the Process record and the unrendered draft docs-review/RATIFY-TAX-50-II-petition.md.

**Alternatives.** (1) Keep Y0 = 2101 as an explicit later civil epoch; needs LP-071 amended and a 2101 event invented, so not recommended. (2) Drop era-year numbering from World-tier pages, which loses the cadence analysis.

**Dependency.** TL-10's Y113 and TL-05's rate-history:223 wording follow this ruling.

#### TL-16 — r1 teleportation: estimate list vs layer deployment table

**Texts.** r1's estimate list reaches 1-in-1,000,000 at about 3300–3400 and puts the deploy-or-withhold decision after that ("Post-3400: Either civilian deployment ... or ... keep it in the lab", resources-source.html:946–947). The table deploys earlier: Sanctuary prototype ~3200, civilian deployment ~3250 (:966–967, :997), Main ~3250–3350 (:1002). Queue #8.

**Tiers.** No higher-tier text dates teleportation. Academy Q27 A+ (same tier) stages early restricted deployment at 1-in-100,000, then full deployment at 1-in-1,000,000, and requires the deploy-or-withhold review before deployment (academy-source.html:1484–1486).

**Steelman.** The table fits Q27's staging: Sanctuary's ~3250 deployment is the restricted proof-of-concept in the 1-in-100,000 window, and Main's scaled deployment falls in the 1-in-1,000,000 window. Only the list's post-3400 timing of the decision conflicts.

**Recommended.** Align the list to the table and Q27, changing no dates.
- :945 → "~3200–3300: Iterative improvement to 1-in-100,000. Beta testing begins, and the deployment vs withholding debate from Q27's A+ response decides whether Sanctuary's limited first deployment (~3250) goes ahead; keeping it in the lab, per the A+ response, might be the wiser choice."
- :946 → "~3300–3400: Deployment-grade reliability at 1-in-1,000,000, and scaled civilian deployment in Main."
- :947 → "Post-3400: If deployed, teleportation continues down the gradient under the security framework Q27 describes (table below)."
- Regenerate the Resources PDF.

**Alternative.** Push the table 150–200 years later, which needs a new date in every row. Not recommended.

#### TL-18 — The Charter's design scope: R19 and R4 vs R20

**Texts.** R19: "The Charter was written for a planetary civilization" (resources-source.html:1336). R4: "The founding-era Charter was written for a planetary civilization" (:1215). R20: "The Charter was designed to govern a civilization whose operating scale might eventually exceed anything Chen could have anticipated, rather than a single-planet civilization" (:1397).

**Tiers.** No Charter or whitepaper text states the Charter's design scope; all three are Resources.

**Steelman.** Both hold if "written for" means the text (rings, walls, one planet) and "designed" means the institutions. Only R20's "rather than a single-planet civilization" denies the planetary basis. R19:1345 against R20's millennium dates is not a contradiction; the two resources speak from different eras.

**Recommended.** resources-source.html:1397 → "The Charter was written for a single planet, but its institutions were designed to govern a civilization whose operating scale might eventually exceed anything Chen could have anticipated." Regenerate the Resources PDF.

**Alternative.** Soften R4:1215 and R19:1336 to "written in planetary terms".

### 2.2 Tier ladders

#### TIER-11 — What technology non-allied, non-hostile states may receive

**Texts.** Whitepaper §25.7 and the enacted Technology Transfer Tiers allow humanitarian technology only. r12 and r7 allow standard-terms trade including "non-strategic technology" (resources-source.html:476–478), and world.html says "selective technology" (:782, :1007). Whitepaper §24.4 implies non-aligned states can hold medical technology that a Tier 1 sanction withdraws.

**Tiers.** No text settles the boundary. Enacted laws.html:2247: "Tier 2 is humanitarian-only export to non-allied non-hostile states". whitepaper.html:1436 (sanctions Tier 1): "Technology export restrictions ... Trade continues on standard terms for non-restricted categories". The enacted text never says whether finished products count as "technology export".

**Steelman.** Canon separates capability transfer (§25.7, "Technology Transfer") from goods trade on standard terms (§24.4), and r12 limits its list to items that "confer no military, manufacturing, or governance advantage" (resources-source.html:478).

**Recommended.** Rule that the Technology Transfer Tiers govern transfers of capability (infrastructure, systems, fabrication, medical systems), and that finished non-strategic products trade as goods on standard terms. Under that ruling r12, r7 and world.html stand, and §24.4's "withdrawing medical technology transfers" describes a nation that previously held allied access. Optional anchoring edit: resources-source.html:478 "Non-strategic technology: systems and tools" → "Non-strategic technology products: finished systems and tools".

**Alternatives.** (A) Apply laws.html:2247 literally and cut r12's list and world's "selective technology" down to humanitarian technology. (B) Amend §25.7 Tier 2 to name non-strategic consumer technology. TIER-03's applied hostile-row edits hold under every option.

### 2.3 Register, ladders and the Snapshot stories

#### LP-02 — Which ladder ratified the 2258 Precognition framework (R33)

**Texts.** R33 says the 2258 framework ratified "through the standard Article XXVIII ladder operating at federal scope" (resources-source.html:1668), then reports federal-style figures: Meritboard 71%, Court "advisory affirmation", Sanctuary 93%, Main 78%, -1 72%, -2 69% (advisory), -3 N/A. The Charter has no XXVIII ladder at federal scope, and under XXVIII's 80% per-layer threshold Main and -1 would fail. Plan #51, triage 18.

**Tiers.** XXVIII is defined only at layer and district scale (charter.html:436–446); XXV.VI sets the federal gates (charter.html:398–406). R33's figures are frozen and fit neither ladder completely.

**Steelman.** The resource says "the framework itself was federal, though its operations would be district-scale". The XXVIII label belongs to the district charters, which ratify at 80% (:1666, :1670), and the framework vote was federal. Its figures clear XXV.VI's Sanctuary and Main thresholds.

**Recommended.** resources-source.html:1668 "through the standard Article XXVIII ladder operating at federal scope" → "through the Article XXV.VI federal ladder", keeping every figure. Two leftovers to rule on, without inventing numbers: (i) XXV.VI counts the lower layers as one aggregate, but the entry reports them separately and gives -3 as "N/A"; (ii) XXV.VI's Court gate is a 6/10 vote, but the entry reports an "advisory affirmation".

**Alternatives.** (A) Recast as parallel XXVIII petitions; fails because Main's 78% and -1's 72% are below 80%. (B) Leave the text. LP-03 (applied) is independent.

#### LP-04+SIM-08+SIM-10 — The Deathless Gold Rush's federal law and The Immortal Influencer's federal provision

**Texts.** The Gold Rush (Snapshot v17.4) posts its federal law as "Continuity parity: binding across all five layers. Backup vessel disclosure: mandatory. Colosseum exclusion for visitors with active continuity: federal, not advisory. Dangerous-labor restrictions: federal, not advisory." (simulations.html:3300). The enforcement lines :3303, :3306 and :3309 turn on Colosseum entry "with active continuity". The Immortal Influencer (2102) has a federal "Cultural Spectacle Exploitation" provision drafted and enforced within months, with Jax "cited under it" (:3407, :3410, :3413). The source findings disagreed: LP-04 and SIM-08 read the Gold Rush law as LP-004.2; PARITY-4 read it as LP-006.

**Tiers.** The tiers do not fix which instrument the story's law is. For LP-004.2: whitepaper.html:785 tells the same arc and closes it with LP-004.2 (2115), whose "terminal clause closed the Colosseum-classified exploit categorically"; the card's frozen Outcome line says "federal law closes it" (simulations.html:3216); the standing story ruling (docs-review/prose-style-guide.md:9) places stories showing live vessel links in -3 before LP-004.2. For LP-006: law-polling.html:918 says LP-006 was the "Response to the deathless-gold-rush and immortal-influencer phenomena", and its votes (68%, 7/10, 92/74/88) sit close to the story's (64%, 7/10, 91/74/82). But the same entry calls LP-006 a "Partial remedy ... did not close the underlying mortality-asymmetry exploit", which conflicts with the frozen Outcome. Era rule: "The Snapshot pins its era's numbers and rates: never recalculate them" (prose-style-guide.md:8), which rules out SIM-08's vote re-figuring. The register has no Cultural Spectacle Exploitation instrument.

**Steelman.** Under the LP-004.2 reading the story compresses the whitepaper's three federal drafts into one, and its numbers stay pinned to v17.4. The Influencer's "disclosure-plus-exclusion rules already covering dangerous labor" in 2102 then means LP-006 plus the Gold Rush's own 93% -3 advisory regulation (simulations.html:3270), so that phrase stands. The Influencer's key lesson (:3416) already says its escalation "fed the Backup Vessel Parity redraft (LP-004.2)". Only the enactment and citation of a separate provision inside Jax's contract year lacks register support.

**Recommended (LP-004.2 mapping, non-numeric fixes only).**
- Gold Rush :3300: replace "Continuity parity: binding across all five layers. Backup vessel disclosure: mandatory. Colosseum exclusion for visitors with active continuity: federal, not advisory. Dangerous-labor restrictions: federal, not advisory." with "Backup Vessel Parity: no vessel link crosses the -3 boundary, visitor or resident. Backup vessel disclosure: mandatory. Dangerous-labor restrictions: federal, not advisory.", keeping "Violation: exploitation of a structural asymmetry, processed through the standard federal chain."
- :3303 "who concealed backup vessel status in a -3 employment contract, entered a Colosseum with active continuity, or took mortality-dependent work without disclosure" → "who crossed into -3 without suspending the vessel link, or concealed backup vessel status in a lower-layer employment contract".
- :3306 "visitors in active dangerous-labor or Colosseum positions exited or restructured" → "visitors in -3 either suspended their vessel links or went home".
- :3309 "with undisclosed active continuity" → "without suspending his vessel link".
- Keep every vote figure, "eleven years", "three years" and the :3291 draft history as era-pinned. SIM-08's changes to 78%, 8/10, 92/79/88, "more than two decades" and the rewritten draft history are rejected under the era rule.
- Immortal Influencer :3407 "was now subject to" → "would be subject to". :3410 "Jax was the first person cited under it. He was ordered to stop livestreaming from -3 or face federal consequences. He complied on the final day of his contract," → "The draft named him as its first example. He kept streaming until the final day of his contract,". :3413 "His permanent public ledger note now carries the cultural exploitation citation next to his original disclosure record." → "His permanent public ledger carries the reputation networks' deathless-tourist tag next to his original disclosure record." (the tag comes from :3380). Keep "disclosure-plus-exclusion rules" at :3407, and :3416.
- Residual for Jason: the story's "two earlier drafts failed" does not match the register (LP-006 enacted, LP-004 failed at Sanctuary).

**Alternatives.** (PARITY-4, LP-006 mapping) :3300 → "Backup vessel disclosure: mandatory in every lower-layer transaction, federal, not advisory."; :3303 "entered a Colosseum with active continuity, or took mortality-dependent work without disclosure" → "entered a Colosseum bout or took mortality-dependent work without disclosing it"; :3407 "disclosure-plus-exclusion rules" → "disclosure rules". Weaker, because the frozen Outcome ("federal law closes it") then contradicts LP-006's "did not close". Or: an Off-canon stamp for the Influencer only.

#### LP-05+SIM-09 — The Parity Enactment depicts the failed LP-004 as enacted in 2111

**Texts.** The Parity Enactment (simulations.html:852–896; Snapshot v19.8; Classification "Backup Vessel Parity (Law Polling LP-004.2)") has Backup Vessel Parity clear its ladder "in 2111", moving upper-layer visitors in -1, -2 and -3 to the destination layer's failure rate ("In -2 that was one in a thousand", :860). The same premise runs through Tove's -2 switch (:873–884), the -2 tour disclosure (:887), the -1 "1-in-10,000" briefing (:890) and "face the same odds" (:896). That is LP-004's failed design. The source findings proposed an Off-canon stamp (LP-05), a re-anchor to 2115 (SIM-09), and a stamp plus relinking the Classification to LP-004 (PARITY-4).

**Tiers.** law-polling.html:761–773 (LP-004 failed at Sanctuary in 2111) and :790–802 (LP-004.2, enacted 2115: consenting, informed visitors in -1 and -2 keep home-layer parity; -3 vessel links are suspended). whitepaper.html:785 agrees. The style guide: where a fix would break the premise, flag for Jason or stamp the card Off-canon; and "Title, Type, Classification and Snapshot never change" (prose-style-guide.md:6), which rules out PARITY-4's relinking.

**Steelman.** The -3 thread already matches LP-004.2's terminal clause apart from the year: the Saurian Park's last week, terminal-acknowledgment paperwork, the new gate contract. The tourism displaced into the middle layers (:890) fits LP-004.2 even better. The -1/-2 destination-rate mechanics and the 2111 date cannot be read onto LP-004.2.

**Recommended.** Stamp the card Off-canon (data-canon="off" plus the metadata chip, per the style guide) and leave the text and the frozen Classification unchanged.

**Alternatives.** (A, SIM-09 re-anchor to LP-004.2) :860 "in 2111, by the narrow margins its contested character had predicted" → "in 2115, on the redraft that followed the first parity bill's failure at the Sanctuary gate", and "gave upper-layer visitors in -1, -2 and -3 six months ... In -2 that was one in a thousand." → "gave upper-layer visitors in -3 six months to finish their visits under home-layer backup coverage. After the switchover, nobody would enter -3 without suspending the vessel link." Then rework the -2 checkpoint scene (:873–880), the -2 tour disclosure (:887) and the -1 briefing (:890) onto LP-004.2's compromised-consent track, and :896 "The visitors who come now" → "The visitors who come to -3 now". New text, needs Jason's approval. (B) Leave the card as it is. Independent of LP-04+SIM-08+SIM-10.

### 2.4 Federal floor and Charter-internal tensions

#### FED-03+LR-09 — Does the -3 federal floor cover nuclear or implant-hacking violations?

**Texts.** Art. VI makes "violation of absolute federal laws (Articles XXV.I–XXV.III)" a -3 floor trigger (charter.html:260). XXV.II: "Continued pursuit of such capability within -3 is handled by private justice without VMSS intervention" (:377). XXV.III: "Continued conduct within -3 is handled by private justice. VMSS does not intervene in -3's response to this category of violation" (:380). systems.html:482 echoes XXV.II; systems.html:486 attaches XXV.II's "without VMSS intervention" to XXV.III; layer--3.html:60 says federal enforcement enters for nuclear weapons and implant hacking. FED-03 recommended Charter edits; LR-09 recommended none. They edit the same passages incompatibly.

**Tiers.** Both sides are Charter text (charter.html:260 vs :377, :380). The lower tiers read it Art. VI's way: whitepaper.html:451 (§4.2.1) lists "nuclear weapons manufacture or possession" among the floor triggers and says "the same district manufacturing nuclear weapons or coordinating an attack on the implant ledger is not" tolerated. Enacted laws.html:1873 (Federal Reach Boundary Act), whitepaper.html:448, layer--3.html:60, resources-source.html:2545 and academy-source.html:1845 ("possession alone triggers federal enforcement under XXV.IV") agree.

**Steelman.** A layered response. XXV.II's sanction is -3 reassignment. For a violator already in -3, continued pursuit short of manufacture, assembly or possession is left to private justice, while manufacture or possession itself, or organised action against the architecture, is a floor trigger (Art. VI; §4.2.1; XXV.IV). XXV.III's "VMSS does not intervene in -3's response" limits VMSS's restraint of private retaliation; it does not bar VMSS from acting against the threat. Only systems.html:486 flattens XXV.III into an absolute. This matches the standing position that the federal-floor backstop, not -3 self-policing, is the load-bearing deterrent.

**Recommended (LR-09, no Charter edit).** Adopt the layered reading. systems.html:486 "Continued conduct within -3 is handled by private justice without VMSS intervention." → "Continued conduct within -3 is handled by private justice, and VMSS does not intervene in -3's response to it." Optional: at systems.html:482, after "...all five layers inhabit." add " Manufacture, assembly or possession inside -3 still activates the federal floor." (anchored in whitepaper.html:451). layer--3.html:60 and the Charter unchanged.

**Alternatives.** (1, FED-03 Charter clarity edit; strict-mode) charter.html:377 → "Continued pursuit of such capability within -3 is handled first by private justice, and VMSS does not intervene in -3's response; the federal floor of Article VI still applies."; charter.html:380 "Continued conduct within -3 is handled by private justice." → "Continued conduct within -3 is handled first by private justice, and the federal floor of Article VI still applies."; systems.html:482 "Continued pursuit within -3 is handled by private justice —" → "Continued pursuit within -3 is handled first by private justice, with the federal floor still in place —"; systems.html:486 → "Continued conduct within -3 is handled first by private justice; VMSS does not intervene in that response, and the federal floor still applies." This reaches further, because it puts the floor over mere pursuit. (2) Change no text and record the layered reading as a standing ruling. Rejected: reading XXV.II/III as absolute (needs an Art. XI amendment to VI plus edits to whitepaper §4.2/§4.2.1 and the Federal Reach Boundary Act), or reading VI as reaching all pursuit (needs an amendment to XXV.II/III).

#### CH-01 — Art. XXI vs Art. XXII: does the President appoint justices?

**Texts.** Art. XXI: justices are "appointed by the President" and "may be replaced by the President ... when their performance no longer meets the standard or when a higher-ranked entity becomes available" (charter.html:319, :323). Art. XXII: the next-ranked entity takes the role, with "no nomination process, no appointment politics" (:328); XXII also says "appointing Supreme Court justices" (:329). Plan #345, triage 20.

**Tiers.** Both Charter. The Court's LP-050 opinion ("ranking inversion triggers displacement", law-polling.html:518–519) and whitepaper §7 (whitepaper.html:601, :609) treat displacement as automatic.

**Steelman.** The articles fit if the appointment is ministerial: the President performs it and the ranking decides it. Only the discretionary "may" at XXI:323 creates friction.

**Recommended (Charter clarity edit; strict-mode).** charter.html:323 "Justices serve renewable terms and may be replaced by the President from the Meritboard's legal-interpretation ranking" → "Justices serve renewable terms and are replaced by the President from the Meritboard's legal-interpretation ranking", rest unchanged.

**Alternatives.** (A) No edit; record the ministerial reading in docs-review/prose-style-guide.md. (B) Give the President real discretion; contradicts XXII:328 and LP-050, not recommended. CH-03's optional gloss touches a different sentence on the same line and is compatible.

#### CH-02 — Art. XXI "No judge weighs the case" vs Art. XXVI "Judicial review weighs impairment"

**Texts.** Art. XXI: "No judge weighs the case. No judicial discretion modulates the outcome." (charter.html:321). Art. XXVI: "Judicial review weighs impairment as a contextual factor in assessing culpability" (charter.html:416), repeated at whitepaper.html:973. 25.2.0 charter ledger flag 1.

**Tiers.** Both Charter (XXI :321 and XVIII :311 vs XXVI :416).

**Steelman.** "Judicial review" can mean the contestation stage (civil-court correction, whitepaper.html:527, and the Court's jurisdiction over novel categories), but XXVI's sequence reads as a routine step in every case.

**Recommended (Charter edit; strict-mode, since it changes which mechanism weighs impairment).** charter.html:416 → "Article XVIII's contextual evaluation weighs impairment as a factor in assessing culpability, not as a mitigating exit from consequence." Same change at whitepaper.html:973, keeping its "— not as" dash. Anchor: charter.html:310, "All assessments must consider cumulative behavior and situational context".

**Alternatives.** (A) No edit, recording the contestation reading. (B) "On contestation, judicial review weighs impairment…".

#### LR-04 — Art. I single qualifying event vs Art. XIV single-axis corrective (T1/T2)

**Texts.** faq.html:128: assault, torture, coercion and sexual violence "all trigger immediate severity-based reassignment". Charter XIV: a single-axis violation gets "corrective intervention, not reassignment". Art. I names DUI and assault as single -1 events. layer--1:86: "A single act of violence in this layer moves a resident toward -2 directly", while its own bar fight (:90) is corrective. Hardening queue #332, triage 34.

**Tiers.** Both Charter (charter.html:166 Art. I vs :300 Art. XIV). charter.html:259 (Art. VI) backs faq:128. The standing story ruling (prose-style-guide.md:9): "a single DUI goes to −1 (Art. I side of T1)". Enacted laws.html:1889: "a -1 assault to -2 or to -3 if escalation warrants".

**Steelman.** Most of it dissolves. XIV's reversibility axis counts psychological and relational harm, so a real assault is at least two-axis. §6.2's clearable examples sit below Art. I's incarceration grade, and faq:128 is qualified by "severity-based". What remains is a victimless single DUI: XIV says corrective, Art. I says -1.

**Recommended.** Extend the standing story ruling to all tiers: Art. I is the specific rule for the Main→-1 threshold at incarceration grade, and Art. XIV governs proportionality everywhere else. No Charter edit. faq.html:128 stays (optional: "all trigger" → "at the qualifying grade trigger"). layer--1.html:86 "A single act of violence in this layer moves a resident toward -2 directly" → "A single assault in this layer moves a resident toward -2 directly", matching laws.html:1889; :90's bar fight stays corrective.

**Alternatives.** (b) Side with XIV; needs an Art. XI amendment to Art. I and reverses the standing ruling. (c) Record T1 as a docketed Charter tension with no page changes. Compatible with LR-03 (applied at layer--1:55).

#### LR-13 — SADs "filtered by a single measurable criterion" vs hybrid domains

**Texts.** Charter IX and whitepaper §20.1 give each SAD exactly one criterion. Whitepaper §20.2 lists "hybrid domains combining criteria from multiple SADs", and sads.html:230 gates HGMD on "Combined thresholds from Gamers Domain and Metalheads Domain." Hardening queue #252, triage 37.

**Tiers.** The rule is stated, but no text says whether a conjunction counts as one criterion: charter.html:273; whitepaper.html:1212; enacted laws.html:2440 (Domain Chartering Standard: "exactly one measurable criterion"); whitepaper.html:1257; sads.html:230.

**Steelman.** A hybrid's gate can be one binary test, current qualification in both parent SADs, which keeps the properties the rule protects.

**Recommended.** sads.html:230 → "Current qualification in both Gamers Domain and Metalheads Domain." whitepaper.html:1257 "hybrid domains combining criteria from multiple SADs" → "hybrid domains gated on current qualification in two or more named SADs".

**Alternatives.** (b) A stated exception, via an Art. XI amendment to IX. (c) Retire HGMD and the hybrid clause.

### 2.5 Continuity: sync, refusal, kill switch

#### SYNC-1b — Ethical blocker on continuous backup, and Q22's sync-vs-ledger premise

**Texts.** R11 (resources-source.html:2016) and the Q28 A+ (academy-source.html:1549) bar continuous mind-state backup because "continuous capture means continuous recording of cognitive activity, which collides with Article V's cognition-is-non-public principle". R11:2022 names "continuous behavioral recording at cognitive depth" as a second blocker. Separately, the Q22 prompt (:1163), A+ (:1190) and debrief (:1197) attribute recovery of Yara's draft to the sync, where under periodic sync (SYNC-1, applied) the implant ledger's record holds it.

**Tiers.** Enacted laws.html:1693 (Cognition-Corroboration Specification): "logs cognition data confidentially within the implant ledger network — non-public means non-broadcast, not non-captured". That rejects the stated ground. No text states a replacement. Nearest anchors: the LP-038 failure record (law-polling.html:1389: mandatory sync "violated the Article V bodily autonomy principle in a domain (intimate mind-state capture)") and LP-038.2's "moment-of-sync consent" (laws.html:1174).

**Steelman.** The conclusion (continuous backup is barred) is compatible with canon; only the ground fails. Re-anchoring it on moment-of-sync consent is an inference: no text addresses a standing consent to continuous sync. Choosing the ground is a doctrine decision.

**Recommended.**
- resources-source.html:2016 "The blocker is Article V's cognition-is-non-public principle, because continuous capture means continuous recording of cognitive activity." → "The blocker is the moment-of-sync consent LP-038.2 preserves (LP-038's mandatory sync failed on Article V bodily-autonomy grounds): continuous capture would replace each consented sync with a standing one."
- academy-source.html:1549 (Q28 A+) "Continuous capture means continuous recording of cognitive activity, which collides with Article V's cognition-is-non-public principle." → same replacement. In the same passage fix the broken clause "One is continuous mind-state backup (...) is technically feasible" → "..., which is technically feasible".
- resources-source.html:2022: "continuous behavioral recording at cognitive depth" → "consequence-bearing recording at cognitive depth", and "both collide with Article V" → "both collide with consent limits already in federal law (LP-038.2; the Cognition-Corroboration Specification)".
- Q22 knock-on: point the prompt (:1163), the A+ (:1190: "captured in the neural sync", "built the vessel from the sync that contains the draft", "recovering lost minutes from the sync data") and the debrief (:1197: "the backup vessel sync captured it") at the implant ledger's record, or leave the student's premise as written.
- Regenerate both PDFs.

**Alternative.** Keep the conclusion and cut only the rationale clause ("The blocker is ... cognitive activity."), leaving "an ethical blocker, not an engineering one" unexplained.

#### REFUSAL-1 — Revival refusal vs "implant removal is the only route"

**Texts.** faq:98: a resident who wants permanent death "must first remove their implant", and anyone who ends their life with the implant in "is revived automatically". faq:676: a citizen "can decline backup vessel revival at any point; the result is permanent death". faq:679: a self-terminating perpetrator's "pre-registered ... revival refusal" or a decline "during the revival window" is honoured. The Continuity Integrity Act carries both clauses in one sentence.

**Tiers.** The enacted text does not settle the suicide-plus-directive case. Enacted laws.html:2021 (CIA): "A citizen may refuse revival — the decision is logged, honored and irreversible with no penalty attached — and in vessel-covered layers implant removal is the only route to permanent death ... so a citizen who dies without removing the implant is revived automatically at full fidelity." Enacted LP-080 (law-polling.html:2604ff) already qualifies "revived automatically": a pre-registered directive was honoured when the citizen "died of unrelated causes months later ... as the standing rule required", and an unflagged directive "remains exactly as irreversible as the Continuity Integrity Act made it". So a registered directive does produce permanent death without implant removal in at least one class of death, and neither reading keeps every clause literal. See also whitepaper.html:1074 (§17.2), laws.html:1383 (LP-063), law-polling.html:582. "Revival window" appears nowhere in canon except faq.html:679 and resources-source.html:2614.

**Steelman.** Reading B: the CIA's "only route" clause sits in its self-termination context ("neither preventing removal, penalizing the choice, nor imposing mandatory intervention"). A registered directive governs deaths that happen otherwise (victims, unrelated causes), and self-directed exit runs only through implant removal. That keeps faq:98, faq:108 and R28's Bailout Problem (:2619); only faq:679 conflicts. Reading A: a registered directive is "honored and irreversible" whatever the cause of death, so it also covers suicide; that keeps faq:679's first clause but qualifies faq:98. Nothing in the enacted text distinguishes a self-inflicted death from an unrelated-cause death for directive purposes.

**Common to both readings.** Delete the "revival window" route (no canon anchor). faq.html:679: remove "or declines during the revival window". resources-source.html:2614 (R28) → "Whitepaper §17.2 lets the resident refuse revival through a refusal registered in advance (LP-065 honours it; LP-080 verifies its authorship). What the doctrine does not settle is what happens next to the revival-ready vessel and its stored mind-state." (The CIA settles the no-instruction default as automatic revival.)

**Recommended (reading B).** faq.html:679 "Revival is not forced. If the perpetrator had pre-registered a revival refusal or declines during the revival window, that choice is honoured." → "A perpetrator who removed the implant first has chosen permanent death; one who did not is revived automatically, like any resident who ends their own life, and faces the consequence alive." Optional: faq.html:676, after "the result is permanent death.", add "Ending your own life permanently still requires removing the implant first (see Is suicide stigmatized?)."; faq.html:110 "if they self-terminate" → "if they remove the implant and self-terminate".

**Alternative (reading A).** faq:679 keeps "If the perpetrator had pre-registered a revival refusal, that choice is honoured."; faq:98 → "A resident who ends their life without removing their implant, and without a registered refusal, is revived automatically at full fidelity". Under reading A the CIA's "only route" clause should also be glossed in laws.html:2021 (strict-mode laws edit). Regenerate the Resources PDF.

**Dependency.** LR-20 (applied) follows this ruling: under reading A, add the registered-refusal route to world.html:1210's opening clause.

#### KILL-2 — Kill-switch timing and event type: R17 (31 seconds, espionage) vs R18 (more than an hour, sabotage)

**Texts.** R17:827: activation "thirty-one seconds after the transfer began", the operative "dead before the transfer completed". R18:885: "Chen reviewed the evidence package for more than an hour before authorizing activation, despite the operational pressure to act within the narrow time window the sabotage attempt had opened."

**Tiers.** Both Resources history. charter.html:390 ("Activation is instantaneous") and whitepaper.html:1084 fit either. Founding-corpus laws.html:2086 leans toward speed ("engagement limited to threat neutralization").

**Steelman.** The only harmonising reading invents a conditional pre-authorization procedure, which the no-invented-mechanism rule forbids. R17's lesson depends on speed, and R18's own "narrow time window" implies speed.

**Recommended (R17 controls).** resources-source.html:885 (R18) → "Chen had the evidence package for less than half a minute before authorizing activation, inside the narrow window the transfer attempt had opened." Keep his reflection quote. This also settles "espionage" over "sabotage".

**Alternatives.** (b) R18's hour controls: edit R17:827 and cut R17:828's time-scale clause; weaker, because a kill an hour later reads as punishment. (c) Conditional pre-authorization; invents procedure, not recommended. TL-17 (applied at R18:878) is independent.

### 2.6 Alliance and the Simulations

#### SIM-03 — The Elected Ring as a treaty ally vs world.html's exclusion list

**Texts.** world.html:662 lists "democratic governance layered onto ring architecture" among the things "the alliance framework would not accommodate". The Elected Ring card admits that nation as a treaty partner (simulations.html:2021), and the Wider Door and Living Laboratory treat it as an ally.

**Tiers.** world.html outranks the stories, but its own statement of the treaty requirements has no clause on governance selection (world.html:661), and R7's standards name none either.

**Steelman.** The :662 list could be read as examples, but "would not accommodate" makes it exclusionary.

**Recommended (higher-tier edit; Jason's sign-off).** world.html:662: delete "democratic governance layered onto ring architecture, " from the list.

**Alternative.** Reclassify the Elected Ring as adjacent by editing :2021, the Wider Door's column list and "all fourteen" counts, and Living Laboratory's framing; breaks three premises.

#### SIM-04 — Founding ally: a ring-gradient civilization or the United States?

**Texts.** world.html:477: "A founding ally, the first external civilization to adopt a ring-gradient model, provided critical support during this era." Wider Door (simulations.html:2423): "The founding ally ran four rings for 1.8 billion". R15 (resources-source.html:706) makes the founding ally the United States, "not an adjacent nation ... not a Federation Treaty member".

**Tiers.** whitepaper.html:1464 (§25.1) says only "One founding ally provided critical support during the contested era", without gradient adoption. world.html:477 outranks R15, but its chronology strains, since Wider Door :2414 has no external ring-gradient civilization in VMSS's first decade.

**Steelman.** The ally could be an existing state that adopted rings later, but R15's present-tense denial rules that out, and 1.8 billion does not fit the United States.

**Recommended (higher-tier edit; Jason's call).** world.html:477: delete the appositive, to read "A founding ally provided critical support during this era." simulations.html:2423: "The founding ally ran four rings for 1.8 billion." → "The largest ally ran four rings for 1.8 billion." R15 unchanged. Compatible with SIM-05 in the same paragraph.

**Alternative.** Keep world:477 and era-scope R15:706.

#### SIM-05 — Wider Door's total: 14 billion = 40% of Earth

**Texts.** simulations.html:2423: "The total at the bottom was about 14 billion, roughly 40% of Earth's total human population." That implies about 35 billion humans at year sixty, against an 8.1 billion founding baseline (:975; faq.html:664). Queue #38.

**Tiers.** No canon states Earth's population at year sixty. The column figures sum to about 14 billion; only the ratio fails.

**Steelman.** No reading makes 14 billion equal 40% without Earth roughly quadrupling in sixty years, and the card itself has Earth losing people.

**Recommended.** simulations.html:2423 → "The total at the bottom was about 14 billion." Ledger the cut as "story no longer needs it / arithmetic".

**Alternative.** "..., most of the human race." Not recommended: rescaling the columns. The year-sixty 4.3 billion is held under TL-05+ACA-02.

### 2.7 Ruling dependencies

- TL-05+ACA-02 → TL-06 (population wording) and the rate-history:223 hedge.
- TL-09 → TL-10 (Y113 → Y188 in the statute source) and TL-05's rate-history:223 wording.
- TL-07+RES-02 interacts with TL-06 ("rings" wording) and TL-03 (technologies:476).
- REFUSAL-1 → LR-20 (applied; add the registered-refusal route under reading A).
- SIM-04 and SIM-05 edit the same simulations.html:2423 paragraph; both edits are compatible.
- Charter text (strict mode) is touched only by TL-04, FED-03 Alternative 1, CH-01 and CH-02.

---

## 3. APPLIED — authority-resolved changes

Each entry gives the controlling authority and the edit. Full old/new text is in the per-unit ledgers.

### 3.1 Timeline

- **TL-01 — Whitepaper §29.1 "today" framing.** Authority: whitepaper.html:251, "VMSS Laws is the consolidated statement of the law in force at every tier. This whitepaper is explanatory"; law in force includes LP-074, "Enacted · Schedules Active from 2295" (law-polling.html:2440); whitepaper.html:1549, "The starting reality, assessed against current technology at the time of the founding treaty, is approximately 90%". Edit: whitepaper.html:1592 "VMSS today delivers ... drive this figure" → "VMSS delivered approximately 10% of its stated promise at the founding treaty ... drove this figure".
- **TL-08 — Mega-wall completion window.** Authority: charter.html:346, "2250: ~15% — wall construction progressing"; charter.html:347, "2350: ~8% — full wall network approaching completion"; whitepaper.html:1637, "Wall construction phases run from the 22nd through 24th centuries." Edits: roadmap.html:350 → "the full boundary network approaching completion by 2350"; :366 "rises" → "closes"; :412 → "Full wall network construction completed across all five ring boundaries by the close of the 24th century"; :432 deleted "The wall network completes."
- **TL-12 — Dyson-class energy date.** Authority: whitepaper.html:1633, "Partial Dyson swarms are a 26th–28th century project. Full Dyson-class energy abundance by 2900"; charter.html:354, "2900: ~0.05% — Dyson-class energy enabling unprecedented infrastructure density". Edits: resources-source.html:1201 "by the 28th century" → "by 2900"; :936 → "28th–29th century: Dyson swarm energy (full abundance by 2900)"; :940 → "Dyson-class energy (by 2900)". Optional R5:1751 and R11:1946 edits not taken.
- **TL-13 — R20 founding date.** Authority: charter.html:466, "Enacted March 29, 2026, Founding Treaty"; R14, "signed in Ottawa on March 29, 2026" (resources-source.html:664). Already fixed in v25.7.1 (d28d6de); verified :1395 reads "founded on the Canadian ceded territory in 2026". No edit; clash-queue entry closed.
- **TL-14 — Longevity export.** Authority: whitepaper.html:1441 (§24.4), "Longevity augmentation is proprietary technology that does not leave VMSS borders. Allied nations receive medical technology transfers ... but never the longevity stack itself"; laws.html:2247, "allies receive medical technology transfers but never the longevity stack itself". Edit: world.html:1013 → "It is a categorical gap created by biological capability, and the longevity stack stays inside VMSS borders even for treaty allies." Optional :1014 edit and its companion fifty-year sentence left for Jason.
- **TL-15 — R6 "500 years ago".** Authority: charter.html:466 (enacted 2026) and R6's own post-3000 dating (:1226). Edit: resources-source.html:1249 dropped "500 years ago,".
- **TL-17 — Start of the contested era.** Authority: world.html:450–455, Era I Founding ("Sovereign treaty signed. Territory claimed. External powers sceptical or hostile.") followed by Era II Contested Period; R15 and R17 agree. Edit: resources-source.html:878 "The contested era began when the project became publicly known, before the Founding Treaty's signing" → "Public scrutiny began when the project became publicly known, six months before the Founding Treaty's signing".

### 3.2 Tier ladders

- **TIER-01 — r12 embargo Stage 3.** Authority: whitepaper.html:1409, "Tier 2 — Defensive Mobilization"; :1437 (sanctions Tier 2), "Goods-based trade restricted to humanitarian essentials only"; :1438 (sanctions Tier 3), "All trade terminated"; laws.html:2150, a ladder "that cedes at its top to the External Force Doctrine's Tier 3 and Tier 4 framework". Edit: resources-source.html:486 re-keyed Stage 3 to "Tier 3 (civilizational threat) of the sanctions ladder (Whitepaper §24.4), where sanctions cede to the External Force Doctrine's Tier 3 and Tier 4 response". r7 (:586) unchanged.
- **TIER-02 — Technology-transfer Tier 1 violation (25.7.0 regression).** Authority: laws.html:2231 (Federation Treaty), "degradation escalating from border-denial signal through formal compliance review and technology-access restriction to treaty suspension, expulsion terminal"; world.html:1001, "formal review of treaty compliance, then technology access restrictions within the alliance framework". Edit: world.html:1082 → "Violation enters the treaty-compliance path described in §13: formal review, then technology-access restriction, then suspension." This reverses the Tier 1 half of hardening item 415.
- **TIER-03 — Hostile-state trade.** Authority: whitepaper.html:1516, "Hostile nations (states under active sanctions Tier 2 or higher, or subject to External Force Doctrine Tier 3 or higher)"; :1437, "Full technology embargo ... humanitarian essentials only"; laws.html:2247, "Tier 3 is embargo for actively hostile states". Edits: world.html:783 "Tariffed / Restricted, case-by-case" → "Sanctioned / No technology; goods trade set by sanctions tier"; :804 "Hostile states tariffed." → "Hostile states sanctioned."; :1008 "Restricted, tariffed, case-by-case" → "No technology, and goods trade set by sanctions tier".
- **TIER-04 — Environmental sanctions and force.** Authority: whitepaper.html:1444, "Sustained noncompliance under escalating sanctions may enter the national defense track under §24.1 Tier 3 or Tier 4 where verified, deployment-ready ecological threat meets the imminence thresholds". Edit: world.html:989 → "can escalate to military response over sustained noncompliance, but only where the ecological threat meets the External Force Doctrine's imminence thresholds."
- **TIER-05 — Academy Q24 C-grade EFD tier names.** Authority: whitepaper.html:1405, "Tier 1 — Diplomatic & Economic"; :1409, "Tier 2 — Defensive Mobilization"; laws.html:2118. Edit: academy-source.html:1305 → "Tier 1 (diplomatic and economic: sanctions, trade restriction) and Tier 2 (defensive mobilization: capabilities demonstrated as deterrent)". Grader's note unchanged.
- **TIER-06 — Academy Q33 overflight instrument.** Authority: whitepaper.html:1400, "Internal counter-sovereignty — the graduated response to a breach that has already crossed into VMSS territory ... — is chartered separately under Article XXV.IV"; :1413 (Tier 3 = Preemptive Neutralization). Edits: academy-source.html:1830 (prompt) and :1845 (D-grade) → "answered on the national defense track (Article XXV.IV)"; :1858 → "the national-defense-track response under Article XXV.IV".

### 3.3 Register and citations

- **LP-01 — LP-033 missing from the Code.** Authority: laws.html:305 (LP-042), "federal statutes (LP entries at enacted status) constitute primary authority"; whitepaper.html:251; law-polling.html:1266 badge "Enacted at Federal", :1276 "Enacted 2131". Edits: new laws.html entry `code-lp-033` (District Externality Escalation Rule; Federal · Article XXV.VI; enacted 2131; anchors XXVIII, XXV.VI) after code-lp-007-2; TOC regenerated by build-law-toc.mjs (Federal 105→106, Governance 5→6, provisions 154→155); static count "Showing all 155 provisions"; laws.html:711 intro sentence names the dual-key reroute; tools/check-canon.mjs registerStatus gains `enactedAtFederal`, and the (a2)/(a4) filters honour it.
- **LP-03 — R32 invented XXVIII filibuster floor.** Authority: charter.html:437 (XXVIII.I: a domain-expert panel drafts the regulation, which "proceeds to a direct population ratification vote"); charter.html:398 (XXV.VI: "Meritboard filibuster floor — 60%"). Edit: resources-source.html:1544 cut "above the 60% filibuster floor for Article XXVIII regulations but".
- **LP-06+SIM-07 — Snapshot cards recalculated to the 2295 cascade.** Authority: rate-history.html:231, "Doctrine-Snapshot-stamped simulations are era-pinned by design and left exactly as engraved. They record the 70-schedule period and do not describe the current rate. No historical result is recalculated when a later schedule changes."; prose-style-guide.md:8. Edits (reverting dae0db0 to the 70-schedule values): simulations.html:987 "fifty percent" → "seventy percent"; :1002 "6.25%" → "8%"; :1104 "taxed at 50% ... the other half ... that half" → "taxed at 70% ... the rest ... the rest"; :1155 "a 6.25% tax" → "an 8% tax"; :2812 "exact cascade (6.25% top marginal)" → "cascade (8% top marginal)"; :4515 "6.25%" → "8%". Leftover for Jason: strict "as engraved" pinning would restore the pre-v21.1 as-authored figures (72d8433 / 75ebaa6 / d2a1c94 / 41ba441: "10–15%" and "90–99%") rather than the 70-schedule values.
- **LP-10 — LP-053 superlative.** Authority: law-polling.html:634ff (LP-066, concluded 2214, Sanctuary "Blocked — ~2.1M dissenting votes in 300M population", about 0.70%). Edit: law-polling.html:599 appended "when it concluded".
- **LP-11 — Register completeness claim.** Authority: law-polling.html:488, "Withdrawn filings never conclude and therefore do not enter this register". Edit: law-polling.html:281 "petition since" → "petition carried to a disposition since".

### 3.4 Federal law and Charter XXV

- **FED-01 — FAQ wording of the murder prohibition.** Authority: whitepaper.html:807 (§10.6.1), "'Murder is prohibited' is XXV territory, not Charter territory ... the XXV.VI ladder authorizes the federal prohibition list that sits below the Charter." Edits: faq.html:799 "VMSS XXV does not front-load" → "the Charter text of XXV does not front-load"; "the most severe acts are already prohibited implicitly through charter placement criteria:" → "the federal prohibitions feed the Charter's placement criteria, which carry the consequence:"; "does prohibition work" → "does the sentencing work"; faq.html:800 "VMSS XXV plus placement-criteria implicit list" → "VMSS XXV and the federal prohibition list it authorizes (XXV.VI)".
- **FED-02 — -3 duels.** Authority: laws.html:1873 (Federal Reach Boundary Act), the floor activates in -3 "on two explicit triggers and only these two — violation of the absolute federal laws, and activity triggering the External Force Doctrine"; whitepaper.html:555, "No layer is permitted a different criminal code." Edits: faq.html:633 "have been replaced with the cooperative-tolerance framework, and" → "carry no institutional enforcement below the federal floor, and under the cooperative-tolerance framework"; :634 "a public massacre" → "a breach of an absolute federal law or an External Force Doctrine threat"; "a clean two-person duel" → "a clean two-person duel between -3 residents".

### 3.5 Layer rules

- **LR-01 — Q04 placement vs residence.** Authority: charter.html:265–266 (Art. VII), "Citizens may visit or reside in layers below their current placement"; whitepaper.html:1506. Edit: academy-source.html:538 → "You don't choose your placement: the system evaluates your record and places you, and Article VII then lets you live at that layer or any layer below it."
- **LR-02+RES-05 — "Every citizen begins" in Main.** Authority: charter.html:177 (Art. II), "A child born in Sanctuary remains in Sanctuary under null status"; charter.html:270 (Art. VIII), "Children born in lower layers remain with their parents."; whitepaper.html:1506. Edits: layer-0.html:51, :11, :17 and resources-source.html:2444 "every citizen begins" → "most citizens begin" ("most" rests on Main holding ~3B of ~4.3B, layer-0.html:61).
- **LR-03 — -1 threshold wording.** Authority: charter.html:166 (Art. I), "a single qualifying event ... driving under the influence, assault, fraud at meaningful scale"; systems.html:438. Edits: layer--1.html:55 "tier as violence" → "tier as predatory violence"; "not a physical threat" → "not a predatory threat".
- **LR-05 — SAD memberships under VPR.** Authority: charter.html:265 (Art. VII), voluntary permanent residency "constitutes a formal waiver of the upward pathway"; charter.html:273 (Art. IX), SADs are "metric-gated domains nested within Heaven Layers". Edit: layer-0.html:66 → "lapse only under punitive reassignment or voluntary permanent residency, never because a resident leaves Sanctuary on elective residency". Not ruled: whether phasing back below 85 ends SAD memberships.
- **LR-07 — -3 drug markets.** Authority: charter.html:415 (Art. XXVI), "Substance use in VMSS is neither prohibited nor protected from consequence."; faq.html:799, "no federal drug statute". Edit: layer--3.html:110 → "without the regulatory framework that governs them in the layers above". Mirror at R27 in 3.10.
- **LR-11+IMPLANT-1 — Implant offered at intake.** Authority: laws.html:1660 (Implant Instrumentation Act), "Implant installation is voluntary at civilization entry for Main Layer and below. There, refusal is permitted and carries no criminal consequence". Edits: world.html:719 "receives" → "is offered"; world.html:1037 → "standard screening, the same voluntary implant offer, and layer assignment". Flag, not edited: world:718/:722 (and whitepaper §26.2, laws.html:2327) default ambiguous-evidence entrants to Main "with immediate implant monitoring", read as monitoring that begins at installation if accepted.
- **LR-12 — Refugee floor.** Authority: whitepaper.html:1508 (§26.2), "The formal system does not give refugees UBI; the population, on its own initiative, does not let them starve."; laws.html:2343, "The baseline dividend is citizens-only". Edit: world.html:722 → "People seeking entry under duress receive no UBI while their application is processed, and citizen sponsorship keeps them from starving (§14)." Optional edit taken: world.html:1037 "refugee or asylum category" → "refugee or asylum intake category".
- **LR-15 — STI and phasing verbs.** Authority: charter.html:168, the STI "never by itself triggers layer reassignment". Fixed in v25.1.2; residuals use the Charter's own words. No edit.
- **LR-18+FIDELITY-2 — -2 revival scope.** Authority: whitepaper.html:1051 (§17.1.2), "A citizen who cannot afford to harbor a backup vessel has no vessel to revive into"; laws.html:2021, "Backup vessel maintenance is not a free entitlement". Edit: layer--2.html:106 "Residents who die in -2" → "Residents with a funded vessel who die in -2".
- **LR-19 — -2 "one law".** Authority: charter.html:371 (Art. XXV), "Certain laws apply across all five layers without exception". Edit: layer--2.html:90 → "The wilderness does have one law on violence."
- **LR-20 — Permanent death route.** Authority: laws.html:2021 (CIA), "in vessel-covered layers implant removal is the only route to permanent death". Edit: world.html:1210 → "Short of removing your implant, orchestrating your own permanent death is an arduous multi-stage process." Optional edit taken: "Only then does death become final;" → "Only then, for someone who keeps the implant, does death become final;". Depends on REFUSAL-1 (section 2.5).
- **LR-21 — Lower-layer revocation exit.** Authority: whitepaper.html:1348, :1515. Applied in v25.1.2 (world.html:751). No edit.
- **LR-22 — Roadmap "fully privatized".** Authority: charter.html:364 (Art. XXIV), "a minimally governed, largely privatized environment". Edit: roadmap.html:622 "fully privatized" → "largely privatized".
- **LR-23 — Mara's score counterfactual.** Authority: charter.html:168 (Art. II); layer-0.html:61, "Main Layer contains the full STI spectrum, from 0 to 100." Edit: layer-+1.html:149 → "It would mean something in Main Layer — if the pathway were still open."
- **LR-24+RESIDENCY-1 — VPR term in R27.** Authority: charter.html:265 (Art. VII), "Elective residency is an indefinite commitment ... with the right to return at any time. Voluntary permanent residency is irreversible". Edit: resources-source.html:2516 "elective permanent residency framework" → "voluntary permanent residency framework".

### 3.6 Continuity

- **SYNC-1 — Periodic, consent-gated sync.** Authority: laws.html:1174 (Pillar LP-038.2), "preserves continuity coverage without overriding moment-of-sync consent. At ninety days the implant surfaces a sync notification ..."; whitepaper.html:1026 (§17), "Periodic encrypted mind-state backups, synchronized through the implant"; whitepaper.html:1075, "no memory of anything after final sync"; world.html:558, "mission context up to the last sync". Edits: whitepaper.html:988 "continuous" → "periodic"; R11 Cat 4 (resources-source.html:1966) three sentences to periodic, lossless-per-sync wording; R28 (:2576, :2577, :2578, :2579, :2606, :2611, :2626, :2627) rewritten so the Q22 47-minute gap is the ordinary output of periodic sync, not a glitch; R3 (:344) and Academy Q24 debrief (:1336) now return soldiers with memory up to the last sync while the implant's record carries the engagement intelligence. Optional Q24 B-grade :1307 edit not taken (compatible as written). The rationale question is SYNC-1b (section 2.5).
- **SYNC-2 — Q24 kill-switch preemption.** Authority: laws.html:1174; whitepaper.html:1026; whitepaper.html:1084 (§17.3.1), kill switch and bailout share "hardware-level implant termination" and "the same binary-revival aftermath"; whitepaper.html:1065 (§17.1.4). Edits: academy-source.html:1337, three sentences re-grounded on periodic sync and an intact implant; each citizen "loses only the interval since their last sync".
- **PARITY-2 — LP-004.2 knock-ons in R27/R28.** Authority: charter.html:214 (Art. III.VI); laws.html:1077 (LP-004.2); law-polling.html:918 (LP-006: "Requires upper-layer visitors ... to publicly disclose home-layer status and backup vessel coverage terms"). Edits: resources-source.html:2592 adds "(inside -3 the link is suspended for the stay, under LP-004.2)"; :2548 "The provision mandates disclosure" → "LP-006 separately mandates disclosure". Optional edit taken: "continuity parity (LP-004.2" → "vessel-link parity (LP-004.2", finishing the v21.1 scrub.
- **KILL-1 — Kill-switch scope.** Authority: technologies.html:378, "The capability is domestic only. It operates on residents who consented to implant installation and has no external application."; world.html:511; whitepaper.html:1488 (Tier 0 withholds implant blueprints and fabrication from every foreign state). Edits: R15 (resources-source.html:717) "implanted VMSS citizens" → "residents who consented to implant installation"; R3 :352, :353, :357 (two sentences), :358 re-scoped to implanted residents and infiltrators; the Hour 0 + 45 minutes entry (:396–397) cut; :421 dropped "and implanted-personnel kill switch activation".
- **FIDELITY-1 — Revival is binary.** Authority: charter.html:246 (Art. IV), "Revival is binary: full fidelity or failure, with no partial state recognized."; whitepaper.html:1026, "There is no partial revival, no degraded copy, no approximate reconstruction." Edit: faq.html:149 rewritten: reliability, not fidelity, is the variable; failure rates trend toward elimination. Mirror at why-vmss.html:174 in 3.10.
- **TIP-1 — TIP countermeasure order.** Authority: laws.html:1644 (Threshold Inhibition Protocol), "an ordered countermeasure sequence — failsafe motor inhibition, then nano-release sedation, then ambient drone countermeasures if the first two measures fail". Edits: whitepaper.html:1136 re-ordered to the enacted sequence; systems.html:395 → "Motor inhibition, then nano-sedation, then ambient drone countermeasures, in an instant sequence."; systems.html:419 → "targeted motor inhibition triggers instantly, backed by nano-release sedation and ambient drone countermeasures if it fails".

### 3.7 Resources

- **RES-01 — Mega-wall thickness (R16).** Authority: laws.html:1627, "Its base cross-section is 1km and tapers parabolically above the midpoint to a crest of roughly 1m at peak altitude."; technologies.html:496, "Three Gorges at 115m base". Edits: resources-source.html:758 → "a one-kilometer base tapering to a crest of roughly one meter"; :762 → "nearly nine times the base thickness of the Three Gorges Dam (about 115 meters)"; :763 → "less than that of a single kilometer of completed mega-wall" (arithmetic: ~15–17 km³ per km at the canonical profile).
- **RES-04 — "Center of gravity".** Authority: layer-+1.html:56, Sanctuary is "a reproductive-cultural center of gravity"; layer-0.html:51, Main is "the civic center around which the rest of the civilization is organized". Edits: resources-source.html:2413 "demographic" → "reproductive-cultural"; :2444 "center of gravity" → "civic center of gravity" (combined with LR-02+RES-05).
- **RES-06 — R26 cross-reference.** Authority: layer-0.html:61 (credentialed elective residents "at roughly 1 billion"); R25 (:2386, "1.1 billion live elsewhere, most of them in Main Layer"). Edit: resources-source.html:2458 "analyzed in R21" → "analyzed in R25".
- **RES-09 — -3 enterprise legality.** Authority: layer--3.html:103, "the classification attaches automatically, without any application. From that moment the operator's legal exposure inside -3 falls to zero"; whitepaper.html:1769. Edit: resources-source.html:2539 "becomes legal in -3" → "can operate in -3". Mirror at layer--3.html:94 in 3.10.

### 3.8 Generated output

- documents/vmss-academic-resources.pdf and documents/vmss-academy-course-packet.pdf regenerated with the README headless-Chrome commands after the last source edit; both show as modified.
- `?v=` busters: simulations-resources.html and simulations-academy.html 2571 → 2580 (link and iframe).
- laws.html TOC and counts regenerated by `node tools/build-law-toc.mjs --laws`.
- No build:pending, build:path2-pages, build:certification or build:path2-record run was needed: no source they consume changed.
- README.md line 5 and footer.html set to 25.8.0.

### 3.9 Files changed

README.md; footer.html; faq.html; law-polling.html; laws.html; layer-+1.html; layer--1.html; layer--2.html; layer--3.html; layer-0.html; roadmap.html; simulations.html; simulations-academy.html; simulations-resources.html; systems.html; whitepaper.html; why-vmss.html; world.html; documents/academy-source.html; documents/resources-source.html; documents/vmss-academic-resources.pdf; documents/vmss-academy-course-packet.pdf; tools/check-canon.mjs.

### 3.10 Mirror and follow-through edits (verify pass)

- **LP-01 static count:** laws.html:341 "Showing all 154 provisions" → "Showing all 155 provisions", matching the regenerated TOC hint.
- **RES-09 mirror:** layer--3.html:94 "An enterprise becomes legal in -3" → "An enterprise can operate in -3".
- **LR-07 mirror:** resources-source.html:2536 (R27) "without upper-layer prohibition frameworks" → "without upper-layer regulatory frameworks".
- **FIDELITY-1 mirror:** why-vmss.html:174 "The mind transfers at full fidelity, and the body catches up as fabrication technology matures." → "Revival is binary: it restores you at full fidelity or it fails, and failure rates fall as fabrication technology matures."
- **KILL-1 cosmetic:** the blank line left in R3 by the cut Hour 0 + 45 minutes entry was removed.

The docs-review/prose-lift-* snapshots and .claude/worktrees still carry the old wording; they are provenance copies and were left unchanged.

---

## 4. Dissolved — not a contradiction

- **TL-02 — Whitepaper self-description (enacted vs proposal vs draft).** :1696 gives the Founding Treaty's status for VMSS; :1702 speaks to other sovereigns ("adopted literally, adapted partially" is what the four- and six-ring allies did, :1461); "hybrid institutional draft" describes the revisable explanatory document. Optional: prefix :1702 with "For other sovereigns,".
- **TL-10 — Path 2 audit at ~Y113 vs Path 2 Charter at Y178.** Two instruments: the preregistered audit workstream began about Y113 (LP-074, law-polling.html:2443, "chartered in the failure's immediate aftermath"); the 2279 Charter is LP-074 Schedule A's certification methodology. If TL-09 re-bases, Y113 becomes Y188.
- **TL-11+RES-08 — Centurial Domain's 600-year-old resident.** sads.html:175 is a generic present characterising any qualifying member of a domain defined by its gating metric (500+ years, whitepaper.html:1257); a domain can be chartered before its first member qualifies (R25). Optional tense edit ("A resident who reaches 600 years will have watched ...") holds under any TL-03 ruling.
- **TIER-07 — Military capability.** "In the traditional sense" qualifies all three nouns: VMSS aircraft and artillery carry no crew (whitepaper.html:1377), and exosuit infantry is not traditional infantry; the Charter acknowledges two instruments and the frame counts five (whitepaper.html:1829). Optional clarity edit at technologies.html:373.
- **TIER-08 — Every peer civilization is an ally vs the Kessari.** Q33's claim is scoped to implant-grade infrastructure (academy-source.html:1851), which the Kessari lack (:1307). Optional: "any peer civilization with that implant-grade infrastructure".
- **TIER-09 — Extradition.** Different people: foreign nationals entering VMSS are never handed over (laws.html:2375); VMSS citizens may be extradited only to allies under treaty coordination (laws.html:2359; whitepaper.html:1516). Optional: "Extradition of VMSS citizens to non-allied states is refused by default" in both files.
- **TIER-10 — "Full access to VMSS exports" vs Tier 0.** Tier 0 items are never exports (whitepaper.html:1488), and §25.1's list contains none. Optional: world.html:781 "Full technology and infrastructure access" → "Full export access (Tier 0 withheld from all)".
- **LP-07 — LP-074 "unanimously".** Fixed in v25.7.1 (law-polling.html:2442, "Enacted in 2278 with every gate met"); the remaining "5–0" phrases count chambers.
- **LP-08 — LP-076, one number, two instruments.** The Code files each instrument under the enactment that created it and says so (laws.html:916).
- **LP-09 — Drafting designations LP-074/LP-075.** R13 two-tier doctrine; every collision is labelled with guarded disambiguation strings. Future edits must keep them.
- **LP-12 — Refined-child numbers never issued.** Each citation is framed as a projection ("likely", "is anticipated"); the register records only filings that reached a disposition. A "not filed" note would be new record content.
- **LP-13 — Retention bands, whole amount vs marginal.** Read as brackets, every text is true (laws.html:1558; whitepaper.html:1793). Optional gloss: "each band applying to the net assets within it". If Jason intends whole-amount bands, this becomes a judgment item.
- **FED-04 — "Applies across all five layers without exception" vs advisory -3.** "Applies" means reach and binding force, which the Federal Reach Boundary Act separates from institutional enforcement (laws.html:1873; charter.html:371).
- **CH-03 — Novelty filter "never" vs "revisable".** "Never" is scoped to "through the novelty filter"; revision reaches the Court by Art. XI, XXV.VI, Art. XV/XX remedial jurisdiction and the filter's own escalation. Optional Charter gloss at :323 is Jason's call.
- **LR-06 — RIL lifetime re-entry bar.** The RIL metric is a zero-record test over the whole history, so it cannot be restored; the bar applies the general rule.
- **LR-08 — UBI untaxed vs replenishment measured against UBI.** UBI is the measurement base, not a taxed item; the dividend is never withheld at source (charter.html:421).
- **LR-10 — -1 inside the 0.01% set vs "intermediate" layer.** Two classifications (institutional reach vs medical-access gradient); -1 fits a population-weighted 0.01% aggregate.
- **LR-14 — "Sustained compliance" vs immediate Sanctuary eligibility.** The phrase describes how the score is earned (trajectory-weighted), not a waiting period (charter.html:177, :296).
- **LR-16 — SAD exclusion "back to the layer below".** SADs sit inside +1, so the layer below is +1 Sanctuary (whitepaper.html:1209).
- **LR-17 — Autoparenting relocation to Main vs downward-only mobility.** Art. V/VIII relocation is a separately named standing right; Art. VII governs visitation and elective residency.
- **LR-25 — R5 shaft transit.** Describes Sanctuary-standing elective residents returning up (a Charter right); denial is Art. VII in operation.
- **LR-26 — Immigrant children "placed in Main".** "Placed" means standing, not residence; world:719 does not separate children from parents.
- **LR-27 — Allied "upward reassignment".** The passage explicitly describes foreign systems.
- **REFUSAL-2 — R28 Refusal Option vs Custodianship.** Fixed in v25.7.1; the "revival window" leftover is covered by REFUSAL-1.
- **PARITY-1 — layer--3 parity paragraphs and R28's -3 carve-out.** Rewritten in v25.1.2; the carve-out is what LP-004.2 requires (laws.html:1077).
- **PARITY-3 — R33 "severs at hardware level".** Both passages describe residents, for whom permanent severance is Charter text (charter.html:245). Optional: "severs a resident's backup vessel link at hardware level on terminal reassignment".
- **PREAMBLE-1 — "No life is ended."** A symbolic anchor whose reach the operative articles set (charter.html:157); the line is frozen, and changing it would need Art. XI.
- **PRIVACY-1 — "Never shared without consent" vs cognition logged.** "Shared" means disclosure to other parties; corroboration inside the ledger network is not sharing (laws.html:1693). Optional gloss at whitepaper.html:991.
- **RES-03 — r22 vs R29 PPG examples.** Converting Main value into tokens divides by the PPG (as Charter III.V's own example does); stating a local amount's Main equivalent multiplies.
- **RES-07 — r25 lifespan 300 vs Centurial 500+.** Fixed in 25.7.1; 300 is the practical span, not a ceiling.
- **RES-10 — r3 VMSS personnel in combat.** Fixed in 25.7.1, matching world.html:586.
- **RES-11 — R19 entanglement signalling.** Fixed in 25.7.1 (local command nodes).
- **SIM-01 — Alliance size at "year sixty".** The cards count from different events (founding vs the alliance's first treaty). Optional clarifier at simulations.html:3149.
- **SIM-02 — Wider Door's full-revival member vs Drift Vessel / Glass Mind.** Different nations; world.html:662 places such variants among adjacent nations. Optional: "Every allied or adjacent nation".
- **SIM-06 — Surface Reader "non-convertible".** Paraphrases Charter III.IV's first sentence; the other cards use the authorised downward channel. Optional: "in ordinary trade".
- **SIM-11 — Lúcia Ferreira-Montez timeline.** Fixed in 25.7.1; 8 + 3 = 11 and 11 + 23 = 34.
- **ACA-01 — Q20 SCM equilibrium math.** Fixed in 25.7.1. Residual label: academy-source.html:1062 still reads "C-grade understanding (the old A-):"; recommend "C-grade understanding:" if Jason lifts the 25.7.1 grade-label freeze for this label.

---

## 5. Reverted

None. Every applied edit passed verification, and all suites pass on the final tree.
