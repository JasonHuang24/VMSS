# VMSS Laws — Architecture for the Legal-Stack Restructure

Status: FOR RATIFICATION (Jason). v1.0, 2026-07-20. No code accompanies this document.
Companion: `docs-review/vmss-laws-opus-prompts.md` — implementation prompts, contingent on §9's decision register.
Provenance: composed from a six-reader canon survey + three-critic adversarial review (canon-fidelity, ambiguity-efficacy, implementation-feasibility); all file:line citations below verified against the repo at main f9b73f9.

---

## 1. The problem, with evidence

**1.1 The Charter page is doing federal work.** charter.html Article III.III carries the live tax schedule as article-text bullets (lines 197–200), Path 2 certification narration inside constitutional prose (line 195: "The 2294 Path 2 audit certified both LP-074 schedules…"), and rationale paragraphs keyed to the current top rate (lines 204–205). When LP-074 activated (dae0db0), the Charter page changed — 18 lines — inside a 61-file cascade. A reader (human or LLM) watching the constitutional surface mutate under a Federal instrument reasonably concludes a constitutional change occurred. None did.

**1.2 The existing cure is insufficient.** Line 202's "Restatement" note (class `charter-restatement`) correctly declares the four bullets a restatement of federal-tier law. But the rates still sit *inside article text*, the provenance narration sits *inside the article's opening paragraph*, and the note is one muted paragraph an LLM has already read past by the time it ingests the bullets. Labeling did not cure what placement causes.

**1.3 The authority paradox.** The restatement names **Whitepaper §12.1** as the binding source — while the whitepaper self-describes as explanatory, with "the Charter is binding" framing at lines 249, 380, and 2061. The current-force federal schedule therefore has no surface whose declared role is *being the current-force law*. The register records history including failures; the whitepaper disclaims bindingness; the Charter disclaims rate authority. The codification surface is missing.

**1.4 Live tier-misattribution inventory** (surfaces that flatly contradict the restatement today — this, not just placement, is what feeds LLM confusion):
- **faq.html:818** — "no federal tax code (taxation is charter-level and layer-stratified)". Directly false against charter line 202 and LP-074. Must be rewritten (§6) and guarded against recurrence (§7.3f).
- **Lite site charter.html:51** — the Lite Charter's Article III summary carries the full cascade AND the Path 2 narration ("The 2294 Path 2 audit certified both LP-074 schedules, and the complete 50 / 25 / 12.5 / 6.25 exact halving cascade entered force in 2295…"). The constitutional-surface ambiguity exists there too. Separate repo → deferred follow-up (§6, last row), not silently out of scope.
- **path-2-schedule.html:162** — "This Schedule is part of the Charter … In any conflict, the Charter controls" — where "the Charter" means the *Path 2 Charter* (a federal-tier LP-074 methodology instrument). The site has two documents called "the Charter", and the second one governs tax machinery. §2.4 disambiguates.
- **systems.html:263–268** — states the full schedule; names LP-074 but never its tier; the tier explainer sits ~35 lines away, so a chunk-level reader sees rates with no tier statement (§6 adds one clause).

**1.5 The hierarchy already exists in canon — the site just doesn't render it.** Charter XXVIII.II closes with "The hierarchy is absolute: charter, federal law, layer-wide regulation, district regulation" (line 456), and XXVIII.III "Jurisdictional Hierarchy" (lines 459–465) enumerates the four tiers, each subordinate to the tier above. The register merges tiers 3–4 into one "Regulatory Petitions" section and presents chronology, not current force. No page answers "what is the law today, at every tier?"

**1.6 Tooling currently enforces the problem.** check-canon §f requires charter.html to match the exact-cascade regex (first of 12 `currentSurfaces`, check-canon.mjs:446–448), carry the three authority assertions (:460–463), and contain the binding-source-precedence sentence (:443). The guards are right in spirit — they pin *some surface* to the truth — they pin the wrong surface. Any trim without retargeting fails CI.

---

## 2. Design: the four-surface legal stack

Modeled on real legal publishing, which solved this ambiguity centuries ago:

| Surface | Real-world analogue | Role | Mutates when |
|---|---|---|---|
| **charter.html** — The Charter of VMSS | Constitution | Constitutional text only: grants, structures, rights, machinery, aspirations | Article XI amendment only (in-world: never yet) |
| **laws.html** — VMSS Laws *(new)* | Consolidated code | Current-force law, all four tiers, every provision cited to its enacting instrument | Any tier's lawful process |
| **law-polling.html** — the Law Polling record | Statutes at Large / session record | Chronological enactment record incl. failed, superseded, rerouted | New instruments file |
| **pending-ratification.html + satellites** | Legislative-history archive | Process records, drafting history, certifications | Process events |

**2.1 The authority chain is LP-042's, not a new invention.** LP-042 (Enacted, 2142; law-polling.html:2942) already defines primary authority in-world: *"Charter articles, whitepaper sections at specification weight, and federal statutes (LP entries at enacted status) constitute primary authority"* — everything else is secondary, never admissible as sole authority. The Code takes a named seat inside that enacted taxonomy rather than adding a rank:

> The Code is a **consolidation — a finding aid — secondary authority under LP-042.** Its conflicts clause restates LP-042's rule: *"If this consolidation and the enacted instrument diverge, the enacted instrument — as recorded in its Law Polling register entry and any published instrument page — controls."*

- laws.html header cites LP-042 explicitly and classifies itself under it.
- The whitepaper is NOT demoted to "explanation only" — that would contradict LP-042's "specification weight" class. The rewritten framing (§6) reads: Charter = constitutional law · VMSS Laws = the consolidated statement of law in force · whitepaper = explanatory, with designated sections at specification weight per LP-042. What retires is only charter line 202's designation of Whitepaper §12.1 as "the binding schedule" — superseded by consolidation (covered by R22, §4).
- charter.html states **no subordinate-tier rate or schedule** after Phase 1 (precise scope: §4/§5 — one non-schedule LP-069 reference survives to Phase 3, whitelisted). A purity guard enforces this permanently (§7.2).

**2.2 In-world identity of laws.html.** Canon frame: Article XXVIII.I — regulation is "enforced by the AI governance system through the same implant-ledger infrastructure that enforces charter provisions and federal law." The Code presents itself as the publication apparatus of that enforcement state: *what the ledger enforces today, at every tier.* On-page title: **"VMSS Laws — The Consolidated Code"** (licensed by broadened R22, §4; if R22 is not registered as broadened, fall back to lowercase descriptive "the consolidated statement of laws in force"). World-tier page: R13 applies, and three check-canon sweeps auto-enroll it at creation (§7.5).

**2.3 Naming table (house rule, binds all new/rewritten prose — implementers may not improvise synonyms):**
- **The Charter of VMSS** — charter.html (the disambiguator path-2-charter.html §1.1 already uses).
- **VMSS Laws / the Code** — laws.html.
- **the Law Polling record (the enactment register)** — law-polling.html; first use on any page links it. The register's own role statement gains one line: entries at enacted status are the primary record of the instrument (LP-042's own position).
- **the Ratification Record** — pending-ratification.html only.
- **the Path 2 Charter** — path-2-charter.html, always with "Path 2".
- **the Founding Treaty / Founding Affirmation** — constitutional-tier text; indexed in the Code's Tier 1; never restated elsewhere.

**2.4 Path 2 Charter disambiguation.** No renames — the path-2 family is internally self-consistent. The fix happens at the new hub: the Code's Taxation title carries one line stating the Path 2 Charter is an LP-074 methodology instrument at federal tier, not the Charter of VMSS; Tier 1 is headed "The Charter of VMSS". Whitepaper §12.1 vs Path 2 Charter §12.1 (Windows) collide on bare "§12.1" — all Code citations name the document, never a bare section number.

---

## 3. laws.html specification

**3.1 Page anatomy** (existing idioms only — no new design system):

1. Header: role statement, LP-042 classification, authority chain, conflicts clause (§2.1 wording — this exact sentence becomes a pinned check-canon string).
2. "How to read this page": tier-badge legend + hierarchy explainer quoting XXVIII.II's closing sentence (charter.html:456) and XXVIII.III's four-tier enumeration — verbatim, correctly attributed.
3. Collapsible TOC between `<!-- LAWS-TOC:BEGIN -->`/`<!-- LAWS-TOC:END -->` markers (generated, §7.4), four tier groups.
4. **Tier 1 — The Charter of VMSS.** A bare index, no gists: Preamble + Articles I–XXVIII by number and canonical title (mechanically equal to charter.html's h2 headings — text-equality guarded, §7.3d) + Founding Affirmation. 30 entries. Badge: `Charter · amendable only via Article XI`. Notes the 7/7 failed amendment record, linking law-polling.html#charter-amendments. One line: enacted text lives on the Charter page; this index restates nothing. (Gists were considered and rejected: prose gists are a new drift surface — the disease being cured.)
5. **Tier 2 — Federal Law.** Every `status-enacted` Federal register entry (39 today — derived by parsing, never trusted as a constant) under subject titles (§3.3): narrative current-force statement (1–3 lines, canon phrasing), ⬥ pillar marker for the 7 pillar laws, Source link `law-polling.html#lp-NNN`, Enacted year, Effective year where distinct (LP-074: enacted 2278, schedules active 2295), supersession pointers as metadata. The **Taxation title's preamble** (not the LP-074 entry body — keeps the 1–3-line entry rule intact) houses the relocated restatement apparatus from charter:202, rewritten per §2.1: the three pinned authority phrasings ("LP-074 is the substantive rate law" / "LP-073 … fully superseded as operative law" / "LP-075 remains procedural only"), the full 50 / 25 / 12.5 / 6.25 schedule with the $10 million threshold and 2295 effective year, the Path 2 Charter disambiguation line (§2.4), and links to path-2-certification-2294.html and rate-history.html.
6. **Tier 3 — Layer-Wide Regulation.** In-force layer-wide entries: `status-enacted`, plus the per-layer outcomes of `status-mixed` parallel petitions (LP-015–019 diverge along the layer gradient — represent each layer's actual outcome, never a flattened summary), plus `status-advisory` -3 entries flagged verbatim "advisory, not institutionally enforced" (charter.html:450 — comma, not dash).
7. **Tier 4 — District Regulation.** LP-010 (tri-district), LP-020 (aggregated curfews — keep canon's "representative cases" framing), LP-009/LP-030 (-3 voluntary districts, advisory). Canon's own aggregated-record convention is stated: district regulation is recorded representatively, not exhaustively.
8. Cross-reference footer: Law Polling record, Ratification Record, rate-history, deregistered-statutes, Path 2 set.

**3.2 Machine markup contract** (guards and generator parse exactly this — defined here so hand-authoring and tooling can't diverge):
- Entry: `<article class="code-entry" id="code-lp-NNN" data-tier="federal|layer|district" data-source="lp-NNN">` (Tier 1 index rows: `data-tier="charter"`, `data-source` the charter anchor).
- Section ids: `tier-charter`, `tier-federal`, `tier-layer`, `tier-district`.
- TOC markers: `LAWS-TOC:BEGIN/END`.
- Styling: there is **no styles.css** — per-page inline `<style>` is the house convention. Copy the `.law-entry`/`.status-badge`/`.law-meta-grid`/`.law-toc`/`.toc-link` rules (+ responsive overrides) from law-polling.html's inline style block into laws.html's own, add `tier-*` badge classes there; `npm run build:css` only if new Tailwind utilities are used.

**3.3 Status whitelist (drives guard §7.3a, both directions):** Code entries may derive from `status-enacted` (mandatory 1:1 — 39 Federal + 10 Regulatory today), `status-mixed` (per-layer outcomes only), `status-advisory` (advisory flag mandatory). `failed` / `superseded` / `rerouted` never appear as entries — supersession-pointer metadata only.

**3.4 Content rules (hard):** no invented law — every sentence derives from an existing register entry or Charter text, verbatim-preferred; in-force only; hedges preserved exactly ("tends to be", ranges, "advisory, not institutionally enforced"); R16 narrative bodies (no statute text, no citation-key apparatus — full texts stay on statute/record pages; the Taxation-title preamble is the one sanctioned apparatus block, licensed by R22); subject titles are presentation grouping with no in-world legal weight (said on-page, one line).

**3.5 Proposed Federal subject titles** (implementation maps entries; architect reviews the mapping): Taxation & Rate Law · Economy, SCM & Anti-Concentration · Defense, Force & Visitation · Technology, Implants & Continuity · Governance, Process & Disclosure · Justice & Enforcement · Population & Family · Cross-Domain.

---

## 4. charter.html trim (Phase 1 — minimal strip) + the R22 ruling

Only the III.III block the page itself declares to be federal-tier restatement leaves. Exact dispositions:

| Location | Content | Disposition |
|---|---|---|
| line 195, final sentence | "The 2294 Path 2 audit certified both LP-074 schedules…" | **Delete** — federal provenance narration; lives on Code + register |
| lines 196–201 | The four rate bullets | **Remove**; replaced by the approved sentence below |
| line 202 | Restatement apparatus | **Relocate** to Code Taxation-title preamble, rewritten per §2.1 |
| lines 204–205 | Rate-keyed rationale paragraphs ("The 50% upper-bracket rate…", "That larger first-pass allocation…") | **Relocate verbatim** to whitepaper §12.1, after the Trajectory Doctrine block, with a one-line non-claim-altering lead-in |
| line 195 (rest), line 203 | Progressive-taxation grant; UBI/PJS untaxed unconditionally; two-instrument doctrine | **Keep** — grants and rights, no mutable parameters |

Draft replacement for the bullets (Jason approves final wording): *"The schedule of top marginal rates is federal law, enacted and recalibrated through the Article XXV.VI ladder and consolidated in VMSS Laws. The Charter fixes the principle — progressive burden scaled to institutional benefit — and reaches no rate."*

**R22 — the Restatement & Consolidation Doctrine** (process-layer ruling, no in-world event; broadened per critique):
(a) numeric restatements of subordinate-tier law appearing on the Charter page were always publication apparatus, never enacted constitutional text — relocating them amends nothing;
(b) VMSS Laws is established as publication apparatus of the ledger's enforcement state, classified secondary authority under LP-042;
(c) the line-202 designation of Whitepaper §12.1 as "the binding schedule" is reclassified as apparatus superseded by consolidation — §12.1 retains specification weight under LP-042.
Same move class as R13 (layer scrub) and R16 (apparatus out of register entries); line 202 already half-states (a) in-world. The in-world amendment route is reserved for Phase 3 category B, which IS enacted Charter text.

**Known Phase-1 residual:** charter.html:247's LP-069 mention (III.VII savings-base attribution) survives — it is category A (§5) but outside the III.III block. Whitelisted in the purity guard with a Phase 3 TODO. Consequence: the §2.1 chain claim is scoped to "no subordinate-tier **rate or schedule**" — exact and true — not "no LP reference."

---

## 5. Tier classification framework + downgrade register (Phase 3, optional)

**The tier test, from canon:**
1. **Lawmaking machinery** (XI gauntlet, XXI composition, XXII cycle, XXV.VI ladder, XXVIII mechanics) — Charter-tier by definition. Never candidates.
2. **Layer-membership criteria** — Article XI (charter:300) locks all thresholds, phasing criteria, descent triggers, permanence at Charter tier. The 85-point floor (II, VII) is numeric but constitutionally locked. Never candidates.
3. **Demonstrated-instrument precedent (category A — already federal, relocation only):** tax schedule (LP-071→074) — Phase 1; SCM savings-base attribution detail (LP-069, charter:247) — Phase 3 relocation with the III.VII text cure; reproduction-tax collection mechanics (LP-064, whitepaper §13.1) — already off-Charter.
4. **Category B — genuinely enacted Charter parameters; moving them requires an in-world Article XI amendment:** PJS overtime cascade $125/$62.50/$31.25/$15.63 (III.II) → Federal · voluntary-residency retention 90–99% five-band (III.V) → Federal · downward-conversion forfeiture 90–99% (III.IV) → Federal · SCM triggers/rates $100B·10% / $50B·5% / $25B / $10B (III.VII–VIII) → Federal · 24-month lookbacks (III.V, III.VII) → Federal · XXVII escalation curve 40→60→90→135% + sixth-child consequence → split (2.5 target and children-held-harmless stay Charter; curve arguably Federal, LP-064 already holds its mechanics). Note III.IV's purchasing-power gradients (1.3–1.8x etc.) are described as emergent, not set — arguably descriptive text, not law; may simply stay.
5. **Category C — deliberate keeps:** UBI amounts (III.I — layer architecture, self-indexing, birthright framing); XXIII/XXIV leakage trajectories (dated aspirations, not operative law); STI 10:1 asymmetry (ledger architecture; borderline, keep).

**Category B mechanism: the Enabling Consolidation Amendment** — one omnibus Article XI amendment replacing enumerated schedules with enabling grants while re-enacting the schedules as federal law at identical values (no magnitude changes — vintage-guard discipline). All seven prior Charter-amendment attempts failed; this would be the first success, plausibly *because* it changes no number and no right — pure tier hygiene. A major canon event (petition, gauntlet, ballot, register entry, pending-ratification pipeline) and a major version (v23.0.0). **Recommendation: defer; this section is the standing docket.**

---

## 6. Site-wide alignment map (Phase 2, same PR as Phase 1)

| Surface | Change |
|---|---|
| navbar.html | "VMSS Laws" between Charter and Whitepaper, desktop + mobile; dual-span collapsed-label pattern (navbar:29 precedent); short label "Laws". Test at 1280px, 1919px, 1920px + mobile menu; if tight, keep "Laws" at all xl+ widths |
| footer.html | Add laws.html to link row; version stamp → 22.7.0 |
| whitepaper.html | Framing lines 249, 380, 2061 → three-way division per §2.1 (LP-042-compliant — no "explanation only" demotion). Line 1693 is the Founding Treaty passage, NOT a Charter-binding framing line — verify content before touching; exempt or give a Treaty-preserving variant. Receives the two relocated rationale paragraphs (§4). §12.1 keeps its rates and stays in the cascade sweep |
| faq.html | **:818 rewrite (blocker-level):** "no federal tax code (taxation is charter-level and layer-stratified)" → the rate schedule is federal law under the XXV.VI ladder (LP-071→074), consolidated in VMSS Laws; the Charter fixes the progressive-burden principle. **:796** four-tier explainer gains a Code link. (:819 is the US-comparison card — Code link optional, not a tier explainer) |
| systems.html | :231 governance-principles hierarchy gains a Code link; **:263 gains one clause** — "a federal-tier schedule under LP-074" — so the rate block carries tier attribution within its own section |
| law-polling.html | One line added to the page role statement: subtitle "the enactment register"; entries at enacted status are the primary record of the instrument (LP-042). No entry changes |
| index.html | Optional doctrine-card for the Code; not required Phase 1 |
| sitemap.xml | Add laws.html (22 URLs today). **No positive coverage guard exists** (check-canon §2 is negative-only, :112–114) — §7.3e adds one. Canonical + OG meta on laws.html; indexable (unlike rate-history/deregistered — the Code is a primary doctrine surface) |
| README.md | Version lockstep with footer (check §6, :574–576) |
| **Lite site** | **Deferred follow-up, explicitly scoped:** Lite charter.html:51 carries the cascade + Path 2 narration inside Article III's summary — the same disease. Cure = same Restatement Doctrine trim (one-two sentences), separate repo, own PR after main-site ratification. Not silent: tracked here |

---

## 7. Tooling & guard changes (what makes this permanent)

**7.1 Retargets (never delete, always move):**
- Binding-source pin (check-canon:443, currently a charter.html string) → pins the laws.html conflicts clause (§2.1 sentence).
- Authority assertions (:460–463) → charter.html row replaced by laws.html.
- Cascade `currentSurfaces` (:446–448) → swap charter.html for laws.html (stays 12 surfaces).

**7.2 New guard — Charter purity (the structural fix):** charter.html must NOT match either `exactCascade` alternative, and must not reference `LP-\d` outside a whitelist. Expected post-trim state: **one whitelisted survivor** (LP-069 at :247, comment citing §5 category A / Phase 3 TODO). Verified low collision risk: the III.II overtime figures don't match the cascade regex. This inverts today's check — the permanent enforcement of the architecture, same two-class spirit as the vintage guard.

**7.3 New guards — Code integrity:**
(a) status-whitelist coverage per §3.3, asserted both directions (every enacted entry has exactly one `code-entry`; every `code-entry`'s `data-source` resolves and its register status is whitelisted);
(b) every Code source href resolves to a real register anchor (belt-and-braces beside 8b);
(c) `data-tier` vocabulary ∈ {charter, federal, layer, district};
(d) Tier 1 index: entry count = charter.html `<h2 id="article-` count (element-anchored regex — excludes the h3 `article-xxv-vi`) + Preamble + Founding Affirmation = 30, AND index titles textually equal the charter h2 headings (text equality, not count-only — no gist drift by construction);
(e) positive sitemap coverage: sitemap.xml contains laws.html;
(f) **tier-claim guard:** no World-tier page may state `charter-level`/`constitutional` within proximity of tax/schedule/rate vocabulary (catches the next faq:818 at CI time).

**7.4 Generator:** extend tools/build-law-toc.mjs with a **sibling mode** — a parallel parser (new entry regex over the §3.2 contract, four tier-section grouping, subject-title subgroups), not a parameter tweak; its law-polling parsing is hard-coded (path :19, section ids :22–26, entryRe :28, LAW-TOC markers :54/:71). Same hard-fail-on-mismatch discipline; idempotent (second run produces no diff). Code *entries* stay hand-authored (R16); only the TOC is generated.

**7.5 Sweep model — two classes (critique-corrected):**
- **Auto-enrolled at file creation** (readdirSync globs): layer guard d — founder phrasing + seat-name ban (:284–298); refusal-leak sweep (:472–479); link-integrity 8b, both cross-file and in-page halves (:612–655). Consequence: laws.html must be R13-clean, refusal-clean, and fully link-resolving **from its first commit** — Prompt 1's own done-gate enforces this.
- **Manual enrollment** (explicit lists — Prompt 2's named checklist): cascade `currentSurfaces` (:446–448), authority assertions (:460–463), binding-source pin (:443), stale-fact pages (:579–581), duplicate-id pages (:588–589), in-page-anchor pages (:658 — belt-and-braces; 8b's in-page half already covers laws.html).

**7.6 CI:** unchanged (canon-check.yml + tailwind-check.yml gate everything). Expect the pass count to rise from 103; record the new number in the PR.

---

## 8. Phasing & versioning

- **Phase 1+2 — one branch (`feat/vmss-laws-v22.7.0`), one PR, merge commit only (squash/rebase strand pushed tags): v22.7.0** (minor: structural pass per R16 convention). laws.html + charter III.III trim + alignment map + guard flips + R22 registered in the process record.
- **Lite follow-up** — separate repo, own small PR after ratification (§6 last row).
- **Phase 3 — optional, later: v23.0.0.** Enabling Consolidation Amendment + category-B relocations + III.VII LP-069 cure + full alignment. Its own doctrine cycle, not site maintenance.

---

## 9. Decision register (Jason ratifies; recommendations marked)

- **D1 — Page identity.** *(Recommended: new laws.html + slimmed charter.html.)* Two alternatives priced honestly:
  *Convert charter.html into VMSS Laws* — rejected: deletes the constitution page (most-linked doctrine surface — 10 article-anchor deep links from simulations.html alone) and re-mixes tiers on one URL, the original disease.
  *Filtered-register view* — add an "in force today" filter/view to law-polling.html instead of a new page; cheapest cure, zero new restatement prose, no permanent two-page co-maintenance. Rejected, but narrowly: it gives the Charter trim no stable target for its replacement pointer, leaves tiers 3–4 merged, can't host the Charter index or the LP-042 authority header, and makes one page serve two contradictory registers (chronological record vs current force) — the double-duty pattern again. The real cost of D1 as recommended: the Code is a fourth restatement surface, co-maintained with the register forever; guard 7.3a converts that from silent staleness into CI red, which is the intended trade.
- **D2 — Trim depth Phase 1.** *(Recommended: minimal strip — the III.III block only.)* Broader strip without the in-world amendment turns enacted Charter text into Code text by fiat — category confusion in the other direction. Consequence accepted and documented: LP-069 survives at :247 under whitelist until Phase 3 (§4 residual).
- **D3 — Phase 3.** Do the Enabling Consolidation Amendment at all? *(Recommended: defer; §5 is the standing docket.)* Survived adversarial attack: the strongest counter (Charter keeps SCM/PJS/retention numbers) fails because those are genuinely Charter-tier today — attribution stays *correct*, just not maximally tidy.
- **D4 — Naming & identity.** *(Recommended: title "VMSS Laws — The Consolidated Code", nav "VMSS Laws"/"Laws", in-world frame = publication apparatus of the ledger enforcement state, licensed by broadened R22.)* If R22 is registered narrow (Charter-restatement clause only), drop "The Consolidated Code" for descriptive lowercase until it's broadened.
- **D5 — Whitepaper §12.1 status.** *(Recommended: retire the line-202 "binding schedule" designation via R22(c); whitepaper keeps LP-042 specification weight — no "explanation only" demotion.)* This heals §1.3's paradox without contradicting an enacted instrument.

## 10. Risks

- **Guard-flip gap:** between removing charter's rates and retargeting §f pins, CI is red — Prompt 2 is one commit carrying both; verified feasible (generator mutates the working tree before the commit boundary).
- **Auto-enrollment surprise (7.5):** the page is inside three sweeps from first commit — a Prompt 1 misstep goes red immediately (good) but can confuse an implementer expecting isolation (the prompts say so explicitly).
- **Standing co-maintenance:** every future LP touches register + Code; guard 7.3a makes forgetting a CI failure, not staleness.
- **Anchor stability:** the trim touches only III.III bodies, no h2/h3 ids; 8b + simulations.html deep links verify.
- **R13/R16:** the Code is World-tier (no founder-as-actor, no seat names — auto-swept); its one apparatus block (Taxation preamble) is licensed by R22, everything else narrative.
- **Naming discipline:** two Charters, a Code, a register, and a Ratification Record — §2.3's table is the only defense; it binds every prompt.
