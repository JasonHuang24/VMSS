# VMSS Laws — Opus/Ultracode Implementation Prompts

v1.0, 2026-07-20. Contingent on the D1–D5 recommendations in `docs-review/vmss-laws-architecture.md` being ratified as written. If any decision changes, revise the affected prompt before launch — never launch a stale prompt.

Execution model: four prompts, run **sequentially** (each builds on the prior's committed state) on branch `feat/vmss-laws-v22.7.0`. The architect (Claude) reviews after each prompt before the next launches. One PR at the end; **merge commit only** (squash and rebase strand pushed tags in this repo).

---

## Prompt 0 — SHARED PREAMBLE (prepend to every prompt below)

You are implementing part of a planned restructure of the VMSS doctrine site (repo root: `F:\Programming\VMSS\VMSS Website`). The architecture is `docs-review/vmss-laws-architecture.md` — read it in full first; it controls over your judgment wherever they conflict. Work only on branch `feat/vmss-laws-v22.7.0`.

Hard rules, non-negotiable:
1. **No invented doctrine.** Every sentence describing VMSS law derives from existing canon text (charter.html, law-polling.html, whitepaper.html, layer pages, faq.html, systems.html). Prefer verbatim canon phrasing. Never coin vocabulary that sounds canonical.
2. **Preserve hedges.** "tends to be", "approximately", "advisory, not institutionally enforced" (comma, exactly as charter.html:450), ranges like "1.3–1.8x" — load-bearing; never smoothed.
3. **Naming table (architecture §2.3) is binding:** The Charter of VMSS (charter.html) · VMSS Laws / the Code (laws.html) · the Law Polling record, "the enactment register" (law-polling.html) · the Ratification Record (pending-ratification.html only) · the Path 2 Charter (always with "Path 2"). No synonyms.
4. **R13 layer doctrine.** World-tier pages never show the founder as an in-world actor and never contain seat-name tokens (word-bounded Sol/Opus/Fable/GPT/Claude). check-canon sweeps this over ALL root .html files automatically — including any page you create.
5. **R16 register style.** Law entries are narrative paragraphs + meta fields. No statute text, no `ls-cite` anchors, no citation-key apparatus inside entries. The one sanctioned apparatus block on laws.html is the Taxation-title preamble (architecture §3.1.5).
6. **Never delete a failing check-canon check to go green.** Checks are retargeted or extended per the architecture; any deletion requires an explicit architecture citation in your report.
7. **Committed artifacts:** after ANY Tailwind class change in HTML/JS run `npm run build:css` and commit `assets/css/tailwind.css`. Note: there is **no styles.css** — page-specific CSS lives in each page's inline `<style>` block (house convention). Line endings LF (.gitattributes enforces).
8. **Definition of done for your prompt:** `node tools/check-canon.mjs` exits 0; `npm run build:css` produces no post-commit diff; all files committed on the branch with a descriptive message; output (a) files changed with line-count deltas, (b) new check-canon pass count, (c) every judgment you exercised beyond the architecture, flagged for review. Do NOT push, do NOT open a PR, do NOT touch main — the architect integrates.

---

## Prompt 1 — Build laws.html (the Consolidated Code)

Create `laws.html` per architecture §2–§3. Be aware before you start: **the page is inside three check-canon sweeps the moment the file exists** (readdirSync globs — layer guard at check-canon:284–298, refusal-leak at :472–479, link-integrity 8b at :612–655). So from this very commit: no seat-name tokens, no founder-as-actor phrasing, no superseded-outcome phrasing ("Schedule A/B … refused/not certified", "2294 … three findings passed", etc.), and **every href on the page must resolve** — all `law-polling.html#lp-NNN` sources, all charter anchors (`#preamble`, `#article-i`…`#article-xxviii`, `#founding-affirmation`), `law-polling.html#charter-amendments`, and every hand-authored TOC in-page link. The explicit-list guards (cascade surfaces, authority assertions, etc.) arrive in Prompt 2.

1. **Shell:** copy the standard page shell from charter.html (head/meta/theme pre-paint/navbar+footer placeholders/script.js). Title: "VMSS Laws — The Consolidated Code • The Five Rings". Canonical `https://jasonhchronicles.com/VMSS/laws.html`. Indexable (no `noindex`). **CSS:** copy the `.law-entry`/`.status-badge`/`.law-meta-grid`/`.law-toc`/`.toc-link` rules and their responsive overrides from law-polling.html's inline `<style>` into laws.html's own `<style>`; add tier-badge classes (`tier-charter`, `tier-federal`, `tier-layer`, `tier-district`) there, styled consistently with existing pills.
2. **Machine markup contract (architecture §3.2, exact):** entries are `<article class="code-entry" id="code-lp-NNN" data-tier="federal|layer|district" data-source="lp-NNN">`; Tier 1 rows use `data-tier="charter"` with `data-source` = the charter anchor; section ids `tier-charter` / `tier-federal` / `tier-layer` / `tier-district`; TOC inside `<!-- LAWS-TOC:BEGIN -->`/`<!-- LAWS-TOC:END -->` (hand-author it this prompt; the generator arrives in Prompt 2 and must find this contract parseable).
3. **Header:** role statement + LP-042 classification (cite the enacted instrument: law-polling.html#lp-042 — "Charter articles, whitepaper sections at specification weight, and federal statutes (LP entries at enacted status) constitute primary authority"; the Code is a consolidation, secondary authority) + this conflicts clause verbatim (Prompt 2 pins it): "If this consolidation and the enacted instrument diverge, the enacted instrument — as recorded in its Law Polling register entry and any published instrument page — controls."
4. **"How to read this page":** tier legend + hierarchy explainer quoting charter.html:456 ("The hierarchy is absolute: charter, federal law, layer-wide regulation, district regulation." — that sentence is XXVIII.II text) and XXVIII.III's four-tier enumeration, correctly attributed.
5. **Tier 1 — The Charter of VMSS:** bare index, NO gists: Preamble + Articles I–XXVIII by number and canonical h2 title (must be textually equal to charter.html's headings — a guard will assert equality) + Founding Affirmation = 30 rows, each linking its real charter.html anchor. Badge `Charter · amendable only via Article XI`. Note the 7/7 failed amendment record → law-polling.html#charter-amendments. One line: enacted text lives on the Charter page; this index restates nothing.
6. **Tier 2 — Federal:** parse law-polling.html's Federal section (between id="federal-laws" and id="regulatory-petitions"); every `status-enacted` entry (expect 39 — derive, don't trust) becomes one Code entry under the architecture §3.5 subject titles: 1–3-line narrative current-force statement in canon phrasing, ⬥ pillar marker for the 7 pillar laws, Source link, Enacted year, Effective year where distinct. **Taxation-title preamble** (apparatus block, sanctioned): the rewritten restatement from charter:202 carrying — the three authority phrasings ("LP-074 is the substantive rate law", "LP-073 … fully superseded as operative law", "LP-075 remains procedural only"; check-canon pins these patterns and they move here from charter.html in Prompt 2, so this page must carry them BEFORE Prompt 2 runs), the full schedule 50 / 25 / 12.5 / 6.25 with the $10 million threshold and 2295 effective year, the Path 2 disambiguation line (the Path 2 Charter is an LP-074 methodology instrument at federal tier, not the Charter of VMSS), and links to path-2-certification-2294.html and rate-history.html. Document citations always name the document ("Whitepaper §12.1", "Path 2 Charter §12.1") — never a bare section number.
7. **Tier 3 — Layer-wide:** `status-enacted` layer-wide entries + per-layer outcomes of `status-mixed` parallel petitions (LP-015–019: represent each layer's actual outcome, never flattened) + `status-advisory` -3 entries flagged verbatim "advisory, not institutionally enforced".
8. **Tier 4 — District:** LP-010, LP-020 (keep canon's "representative cases" framing), LP-009/LP-030 (-3 voluntary districts, advisory). State canon's aggregated-record convention.
9. **Cross-reference footer** per architecture §3.1.8. **Touch no other file** except assets/css/tailwind.css if you add utility classes.

Output for review: the full LP → subject-title mapping table; the status breakdown you derived (should reconcile to 89 = 7/60/22, Federal 39 enacted); judgments flagged.

## Prompt 2 — Charter trim + guard flips (single commit; CI must never see an intermediate state)

Per architecture §4 and §7. In ONE commit:

1. **charter.html III.III:** delete line 195's final sentence (Path 2 narration); replace the four rate bullets (196–201) with the ratified replacement sentence (architecture §4); remove the line-202 restatement paragraph (now living on laws.html); relocate the two rationale paragraphs (204–205) **verbatim** into whitepaper §12.1 after the Trajectory Doctrine block with a one-line non-claim-altering lead-in. Touch no h2/h3 ids.
2. **Retargets (architecture §7.1)** — retarget, never delete: binding-source pin (check-canon:443) → the laws.html conflicts clause; authority assertions (:460–463) → laws.html; cascade `currentSurfaces` (:446–448) → swap charter.html for laws.html (count stays 12).
3. **Charter purity guard (§7.2):** charter.html must NOT match either `exactCascade` alternative; must not reference `LP-\d` outside a whitelist. Audit occurrences first — expected survivors: exactly one, LP-069 at charter:247; whitelist it with a comment citing architecture §5 category A / Phase 3 TODO. Confirm the III.II overtime figures don't trip the cascade regex (verified low risk — confirm anyway).
4. **Code guards (§7.3):** (a) status-whitelist coverage both directions per §3.3 (enacted 1:1; mixed = per-layer outcomes; advisory = flag mandatory; failed/superseded/rerouted only as metadata); (b) source-anchor resolution; (c) `data-tier` vocabulary; (d) Tier-1 guard using the element-anchored regex `<h2 id="article-` (must NOT count the h3 `article-xxv-vi`), expected 30 rows, with **title text-equality** against charter h2 headings; (e) positive sitemap coverage (sitemap.xml contains laws.html — add the sitemap entry in Prompt 3, so write this check to run against the committed sitemap only from that point, or add the sitemap entry here and note it); (f) tier-claim guard: no World-tier page states `charter-level`/`constitutional` in proximity to tax/schedule/rate vocabulary.
5. **Manual-list enrollment — named checklist, confirm each explicitly in your output:** cascade `currentSurfaces` (done in step 2) · stale-fact pages (:579–581) · duplicate-id pages (:588–589) · in-page-anchor pages (:658; belt-and-braces — 8b's in-page half already covers laws.html). Auto-enrolled sweeps (layer guard, refusal-leak, 8b) need no action — state that you verified they already pass over laws.html.
6. **TOC generator (§7.4):** extend tools/build-law-toc.mjs with a **sibling mode** for laws.html — a parallel parser over the §3.2 contract (`code-entry` regex, four tier-section grouping by `tier-*` ids, subject-title subgroups), LAWS-TOC markers, same hard-fail-on-mismatch discipline, idempotent. Its existing law-polling parsing (path :19, sections :22–26, entryRe :28) is untouched. Run both modes; commit the regenerated TOCs.
7. Full gate: `node tools/check-canon.mjs` (expect >103 passes, 0 failures — report the number), `npm run build:css`.

## Prompt 3 — Site-wide alignment (architecture §6)

1. **navbar.html:** "VMSS Laws" between Charter and Whitepaper, desktop + mobile lists, using the dual-span pattern at navbar:29 (`<span class="min-[1920px]:hidden">Laws</span><span class="hidden min-[1920px]:inline">VMSS Laws</span>`). Verify no wrap/overflow at 1280px, 1919px, 1920px, and in the mobile menu; if tight, keep "Laws" at all xl+ widths.
2. **footer.html:** add laws.html to the link row; version stamp → 22.7.0.
3. **whitepaper.html:** rewrite framing lines 249, 380, 2061 to the three-way division (Charter = constitutional law · VMSS Laws = the consolidated statement of law in force · whitepaper = explanatory, with designated sections at specification weight per LP-042). **Line 1693 is the Founding Treaty passage — read it before touching; exempt it or apply a Treaty-preserving variant only.** Confirm the two relocated rationale paragraphs read coherently in place. Do not remove §12.1's rates.
4. **faq.html:** rewrite the :818 clause "no federal tax code (taxation is charter-level and layer-stratified)" → tax rates are federal law under the XXV.VI ladder (LP-071→074), consolidated in VMSS Laws; the Charter fixes the progressive-burden principle. Add a Code link to the :796 four-tier explainer. (:819 US-comparison card: Code link optional.)
5. **systems.html:** :231 hierarchy bullet gains a Code link; :263 gains the clause "a federal-tier schedule under LP-074" so the rate block is tier-attributed within its own section.
6. **law-polling.html:** add the one-line role statement per architecture §6 ("the enactment register"; enacted entries are the primary record of the instrument, per LP-042). No entry changes; rerun build-law-toc if the line lands inside parsed territory (it must not).
7. **sitemap.xml** (add laws.html), README version lockstep; verify check-canon §2/§6 and the new sitemap-coverage guard stay green.
8. Full gate; report pass count.

## Prompt 4 — Adversarial verification pass (report, don't fix)

Fresh eyes; assume Prompts 1–3 contain errors.
1. Re-run all gates: check-canon, build:css diff, build-law-toc idempotency in BOTH modes (second run → no diff).
2. Link audit both directions: every laws.html href resolves; every page teaching the four-tier hierarchy links the Code consistently; simulations.html's charter article-anchor deep links still resolve.
3. **Ambiguity audit — the point of the project, over EVERY cascade surface** (all 12 `currentSurfaces` members): for each occurrence of the schedule, some tier attribution (federal / LP instrument) must appear within the same section of the page. Then: read charter.html top-to-bottom — zero federally-mutable rates or schedules, LP references only per whitelist; read laws.html — every entry's tier + source + effective date unambiguous in isolation (an LLM landing on any single entry can state tier and provenance).
4. **Contradiction sweep:** grep all World-tier pages for tier-misattribution patterns ("charter-level", "constitutional" near tax/rate/schedule; bare "the Charter controls" outside the path-2 family; bare "§12.1" without a document name).
5. R13/R16/hedge audit over laws.html; naming-table conformance over every touched surface.
6. Rate-surface roster: grep the repo for the cascade; confirm the roster matches the architecture (12 sweep surfaces incl. laws.html; charter.html clean; historical/Process surfaces untouched per the tax-canon classification ledger).
7. Output a conformance report: PASS/FAIL per architecture section with file:line evidence. Fix nothing; list proposed fixes for the architect.

---

## Architect's review checklist (Claude, after each prompt)

- **P1:** subject-title mapping sane; markup contract exact (spot-check `code-entry` ids/data attrs); no invented vocabulary; hedges intact; Tier-1 titles textually equal charter h2s; Taxation preamble carries all three authority patterns + cascade + threshold + 2295 + Path 2 disambiguator; naming table obeyed.
- **P2:** diff shows retarget-not-delete for every §f pin; purity guard actually inverts (test: reintroduce a rate into charter.html locally → check-canon must fail); whitelist = exactly one LP-069 entry; enrollment checklist confirmed; generator idempotent; single commit.
- **P3:** nav at 1280/1919/1920 + mobile; framing lines LP-042-compliant (no "binding" transferred to the Code, no "explanation only" demotion); 1693 handled as Treaty text; faq:818 rewritten; version lockstep.
- **P4:** conformance report cross-checked against §9 decisions; any FAIL loops back before PR.
- **PR:** merge commit only; CLAUDE.md rule — complete only after `git push` succeeds with confirmation shown and the remote branch verified.
