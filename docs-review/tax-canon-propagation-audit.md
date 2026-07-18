# Tax-canon propagation audit — 2026-07-17

> **Audit artifact, not doctrine.** This ledger quotes historical 70% language
> only to classify it. The operative fiscal state is **50 / 35 / 17 / 8 from
> 2295**: **Schedule A active**, **Schedule B pending**, and **SCM unchanged**.

## Scope and method

Both repositories were searched from their roots: the full VMSS site and
VMSSLite. The prescribed stale-pattern file and exact `rg` command were run,
then the prescribed broad search. A `--no-ignore` supplement covered ignored
local metadata, source CSS was reviewed separately, and `supabase/` was
searched despite its `.sql` extension. `.git`, dependency directories, and
non-readable binary assets were excluded. `assets/css/tailwind.css` was
classified separately as compiled styling only.

The full site’s two generated PDFs were text-extracted with `pypdf` as well:
`vmss-academy-course-packet.pdf` (169 pages) and
`vmss-academic-resources.pdf` (240 pages). Neither extraction contained a
70% tax claim; both retain current 35%-versus-certified-50% teaching text.
VMSSLite contains no PDF artifacts.

## A. Hit ledger

| File | Line(s) | Excerpt / result | Classification | Required action |
|---|---:|---|---|---|
| `systems.html` (full) | 263–270 | “active composite … 50 / 35 / 17 / 8 from 2295”; A active, B pending, SCM unchanged | Current operative canon | **Changed.** This was the missed Systems propagation. |
| `systems.html` (Lite) | 64, 72–78 | Legacy Main 70% table/copy is now 50%; explicit 2295/A/B/SCM status | Current operative canon | **Changed.** |
| `simulations.html` (Lite) | 119 | Former “10–15% taxation” is now the active 8% top marginal rate | Current operative canon | **Changed.** |
| `law-polling.html` | 2350, 2370–2377, 2394–2403, 2421 | LP-072/LP-073 history, LP-074’s certified Main point, and lower-rate authority | Historical statute plus current register | Preserved historical statute text; changed the current B wording to **pending**. |
| `rate-history.html` | 9, 178, 218–241 | Historical 70/35/17/8 through 2294, then active 50/35/17/8 | Historical canon plus current conclusion | Preserved and era-labeled; changed “B remains inactive” to **“B remains pending.”** |
| `charter.html`, `faq.html`, `whitepaper.html`, `why-vmss.html` | tax sections / metadata | Current 50/35/17/8 explanations; historical 70 only as former contrast or non-tax governance/recidivism | Current operative explanation / unrelated | Preserve; no stale live-tax claim. |
| `path-2-certification-2294.html`, `path-2-charter.html`, `path-2-schedule.html`, `path-2-risk-register.html`, `path-2-commencement-duty-act.html` | current-status blocks and historical notes | A1–A8 certification activates A in 2295; B stays pending; then-live 70 is era-pinned | Current procedural canon / historical record | Preserve. |
| `pending-ratify-tax-50-ii-statute.html`, `tools/build-pending-pages.mjs` | 150 / 363 | Current wrapper names the operative composite and B’s pending Lower Incidence Certificate | Generated current wrapper around verbatim statute | **Changed** “inactive pending” to **“pending.”** |
| `documents/ratify-tax-50-ii-statute-source.html` | 19 | Pre-certification clause: “Until that certification, the 70% rate remains in force” | Historical statute text | Preserve verbatim; generated page supplies current status. |
| `pending-ratification.html` and `pending-ratify-tax-50-{ballot,advocacy,supplemental,opposition,record,rulings}.html` | status wrappers and record text | Failed-petition/process history with a current 50/35/17/8 wrapper | Historical/process archive | Preserve raw history; wrappers label it and state the current law. |
| `simulations.html` | 695, 747, 831, 842, 853 | Founding-era v14.1 cards and v14.5 Wealth Ceiling using 70% | Historical simulation | Preserve; the v14.5 card explicitly says “Historical … not the current schedule.” |
| `documents/path-2-{charter,schedule}-source.md` | source status / 240 | Adopted source says the 2279–2288 schedule was then-live; current footer gives 50/35/17/8 | Historical source with current footer | Preserve. |
| `docs-review/session-handoff-post-path2-arc.md`, `first-run-cold-pass-prompt.md`, `first-run-preregistration-record.md`, `path2-charter-schedule-10-4.md`, `path-2-charter-draft-v4.md` | opening status blocks | Unqualified prior “live” language | Historical/provenance record | **Changed.** Added explicit archival/current-state framing. |
| `docs-review/RATIFY-TAX-50-session-record.md`, `RATIFY-TAX-50-opposition-brief.md`, `RATIFY-TAX-50-II-petition.md`, `AFFIRM-TAX-50-advocacy-brief.md`, `AFFIRM-TAX-50-supplemental-brief.md` | opening status blocks | Historical petition, advocacy, and process text | Historical/provenance record | **Changed.** Added archival/current-state framing. |
| `deregistered-statutes.html` | 9, 117–176 | Withdrawn drafting designations 074/075 plus active-composite crosslink | Process archive | Preserve as explicitly out-of-world, non-operative history. |
| `documents/{academy,resources}-source.html` and both PDFs | source tax lessons / extracted PDF text | 35% lower rate contrasted with certified 50% Main/Sanctuary rate | Current educational material | Preserve; no 70% tax result. |
| Full/Lite STI JavaScript and layer cards | STI 70–84 bands | Score threshold, not tax | Unrelated | Preserve. |
| CSS, Tailwind utility classes, and non-tax 70 values | layout widths, vote floors, fidelity, Mercury composition, recidivism | Styling or unrelated doctrine | Unrelated | Preserve. |

## B. Propagation matrix — every checked path

### Full VMSS site

| Checked path(s) | Classification / result |
|---|---|
| `systems.html`; `charter.html`; `faq.html`; `whitepaper.html`; `why-vmss.html`; `law-polling.html`; `rate-history.html` | Current fiscal surfaces. The active schedule is aligned; `systems.html`, `law-polling.html`, and `rate-history.html` received the final wording corrections. |
| `path-2-certification-2294.html`; `path-2-charter.html`; `path-2-schedule.html`; `path-2-risk-register.html`; `path-2-commencement-duty-act.html` | Current certification/procedural surfaces. Aligned; historical text is dated or conditional. |
| `pending-ratification.html`; `pending-ratify-tax-50-advocacy.html`; `pending-ratify-tax-50-ballot.html`; `pending-ratify-tax-50-ii-statute.html`; `pending-ratify-tax-50-opposition.html`; `pending-ratify-tax-50-record.html`; `pending-ratify-tax-50-rulings.html`; `pending-ratify-tax-50-supplemental.html`; `deregistered-statutes.html` | Generated/process archive. Historical material retained behind a current-status or process-tier wrapper; statute wrapper corrected. |
| `simulations.html`; `simulations-academy.html`; `simulations-residents.html`; `simulations-resources.html`; `simulations-world.html` | Historical simulations/viewer pages. No live tax contradiction; historical 70 scenarios are snapshot-labeled. |
| `documents/academy-source.html`; `documents/resources-source.html`; `documents/path-2-charter-source.md`; `documents/path-2-schedule-source.md`; `documents/path-2-risk-register-source.md`; `documents/path-2-adoption-ruling-source.md`; `documents/path-2-presidential-ruling-source.md`; `documents/path-2-certification-2294-data.json`; `documents/ratify-tax-50-ii-statute-source.html`; `documents/HANDOFF-NEXT-SESSION.md`; `documents/design-principles.md`; `documents/VERBATIM-SOURCE-TEMPLATE.md` | Source/data. Current source material is aligned; verbatim historical sources are clearly framed; the template’s 70% is Mercury composition. |
| `documents/vmss-academy-course-packet.pdf`; `documents/vmss-academic-resources.pdf` | Generated PDFs. Text extracted and reviewed; no stale 70% tax claim. |
| `docs-review/AFFIRM-TAX-50-advocacy-brief.md`; `docs-review/AFFIRM-TAX-50-supplemental-brief.md`; `docs-review/RATIFY-TAX-50-II-petition.md`; `docs-review/RATIFY-TAX-50-opposition-brief.md`; `docs-review/RATIFY-TAX-50-session-record.md`; `docs-review/first-run-cold-pass-prompt.md`; `docs-review/first-run-preregistration-record.md`; `docs-review/path-2-charter-draft-v4.md`; `docs-review/path2-charter-schedule-10-4.md`; `docs-review/session-handoff-post-path2-arc.md` | Historical/provenance records. Added explicit archive/current-state notices. |
| `docs-review/RATIFY-TAX-20-petition-draft.md`; `docs-review/RATIFY-TAX-50-petition-v4.md`; `docs-review/RATIFY-TAX-50-petition-v4.1.md`; `docs-review/flags.md`; `docs-review/lp-audit-table.md`; `docs-review/path2-residual-risk-register.md`; `docs-review/presidential-adoption-ruling-path2-charter.md`; `docs-review/presidential-ruling-path2-charter.md`; `docs-review/the-first-run-simulation-v1.md`; `docs-review/the-first-run-simulation-v1-review-copy.md`; `docs-review/v21.8-FLAGS.md`; `docs-review/v21.8-worklog.md`; `docs-review/v21.9-FLAGS.md`; `docs-review/wave2-FLAGS.md`; `docs-review/wave2-worklog.md`; `docs-review/worklog.md`; `docs-review/tax-canon-propagation-audit.md` | Review/draft material. Preserved as historical, draft, or this audit; no unframed current claim. |
| `tools/canon.json`; `tools/check-canon.mjs`; `tools/verify-path2-certification-2294.mjs`; `tools/build-path2-pages.mjs`; `tools/build-pending-pages.mjs`; `tools/build-law-toc.mjs` | Canon data, validator, and generators. Canon guard strengthened; generated source/output pair is aligned. |
| `package.json`; `package-lock.json`; `README.md`; `CLAUDE.md`; `.gitignore`; `.claude/settings.local.json`; `.github/workflows/canon-check.yml`; `.github/workflows/supabase-keepalive.yml`; `.github/workflows/tailwind-check.yml`; `robots.txt`; `sitemap.xml`; `tailwind.config.js` | Metadata/configuration. `package.json` exposes `npm run check:canon`; no stale tax text. |
| `assets/js/card-filter.js`; `assets/js/diagrams.js`; `assets/js/sti-sim.js`; `script.js`; `roadmap.js` | Code. No tax claim; 70 values are STI/fidelity/UI values. |
| `styles.css`; `roadmap.css`; `tailwind.input.css`; `assets/css/tailwind.css` | Source CSS and compiled CSS. Percentage hits are styling only; compiled Tailwind was excluded from doctrine matching as required. |
| `supabase/.gitignore`; `supabase/functions/submit-application/index.ts`; `supabase/hardening.sql`; `supabase/rate-limit.sql` | Infrastructure. Searched separately; no tax canon. |
| `404.html`; `audiobook.html`; `footer.html`; `index.html`; `join.html`; `layer-+1.html`; `layer-0.html`; `layer--1.html`; `layer--2.html`; `layer--3.html`; `layers.html`; `navbar.html`; `roadmap.html`; `sads.html`; `technologies.html`; `world.html` | Public pages with no operative tax claim. Any hit is layout, non-tax statistic, or contextual history. |
| `.DS_Store`; `apple-touch-icon.png`; `favicon-16x16.png`; `favicon-32x32.png`; `favicon.ico`; `images/Audiobook/Architecture of Consequence.png`; `images/Audiobook/Embodiment.png`; `images/Audiobook/Fresh Eyes.png`; `images/Audiobook/The Five Rings.jpg`; `images/Audiobook/The Intake Files.png`; `images/Audiobook/The Ledger.png`; `images/EarthvsVmss.png`; `images/emblem.jpg`; `images/favicon.jpg`; `images/hero-rings.png`; `images/world-agi.png`; `images/world-alliance.png`; `images/world-asi.png`; `images/world-climate.png`; `images/world-cyborg.png`; `images/world-daily-life.png`; `images/world-embodiment.png`; `images/world-entertainment.png`; `images/world-founding-era.png`; `images/world-geography.png`; `images/world-information.png`; `images/world-law.png`; `images/world-military.png`; `images/world-orbital.png`; `images/world-refugee.png`; `images/world-territorial.png`; `images/world-travel.png`; `images/world-visitor.png` | Binary/non-readable assets. Excluded only for that reason. |

### VMSSLite

| Checked path(s) | Classification / result |
|---|---|
| `systems.html`; `simulations.html` | Current fiscal surfaces. **Changed** to the active 50/35/17/8 doctrine and active 8% -3 example. |
| `charter.html`; `faq.html`; `layers.html` | Current explanatory surfaces. Aligned/no direct schedule rewrite needed. |
| `404.html`; `README.md`; `audiobook.html`; `footer.html`; `index.html`; `join.html`; `navbar.html`; `technologies.html`; `why-vmss.html`; `robots.txt`; `sitemap.xml` | No tax-canon claim requiring change. |
| `assets/js/diagrams.js`; `assets/js/sti-sim.js`; `script.js` | STI/interface code; 70 means an STI band, not a tax rate. |
| `styles.css` | Styling only. |
| `tools/check-tax-canon.mjs`; `.github/workflows/canon-check.yml` | **Added.** Independent Lite canon guard and CI workflow. |
| `apple-touch-icon.png`; `favicon-16x16.png`; `favicon-32x32.png`; `favicon.ico`; `images/Audiobook/Architecture of Consequence.png`; `images/Audiobook/The Five Rings.jpg`; `images/emblem.jpg`; `images/favicon.jpg` | Binary/non-readable assets. Excluded only for that reason. |

## C. Remaining 70% references

The following tax-related references intentionally survive. Each is historical,
conditional, draft/process-only, or explicitly a historical simulation; none
states the present schedule.

| Path(s) | Why it remains |
|---|---|
| `law-polling.html:2370–2377`; `rate-history.html:9, 178, 218, 225–227` | Historical LP-073/Consolidation schedule through 2294, immediately paired with the active 50/35/17/8 result. |
| `simulations.html:695, 747`; `simulations.html:831, 842, 853` | Founding-era v14.1 and explicitly historical v14.5 scenario snapshots. |
| `path-2-schedule.html:164`; `documents/path-2-schedule-source.md:240`; `path-2-commencement-duty-act.html:94`; `pending-ratify-tax-50-rulings.html:115` | Dated 2279–2288/then-operative procedural history. |
| `pending-ratify-tax-50-ii-statute.html:182`; `documents/ratify-tax-50-ii-statute-source.html:19`; `docs-review/RATIFY-TAX-50-II-petition.md:63` | Verbatim pre-certification conditional clause, surrounded by a current-status notice. |
| `pending-ratification.html`; `pending-ratify-tax-50-{ballot,advocacy,supplemental,opposition,record}.html`; `tools/build-pending-pages.mjs` | Failed-petition and process archive wording; page-level wrappers identify the current 50/35/17/8 state. |
| `docs-review/RATIFY-TAX-50-session-record.md:116, 179, 183, 187, 227`; `docs-review/RATIFY-TAX-50-{petition-v4,petition-v4.1}.md`; `docs-review/RATIFY-TAX-20-petition-draft.md`; `docs-review/AFFIRM-TAX-50-{advocacy-brief,supplemental-brief}.md`; `docs-review/RATIFY-TAX-50-opposition-brief.md`; `docs-review/session-handoff-post-path2-arc.md`; `docs-review/first-run-{cold-pass-prompt,preregistration-record}.md`; `docs-review/{path2-charter-schedule-10-4,path-2-charter-draft-v4}.md` | Historical, draft, or process records. The newly added header frames make the retained language non-operative. |
| `whitepaper.html:875, 879`; `documents/academy-source.html`; `documents/resources-source.html`; both generated PDFs | Former-rate comparison used to explain the present certified 50%/lower 35% system. |

Non-tax 70% references are also intentional: Meritboard vote floors (`charter.html`, `faq.html`, `whitepaper.html`, `law-polling.html`), Earth recidivism (`world.html`, `why-vmss.html`), STI score bands (full/Lite JavaScript and layer pages), neural-fidelity (`simulations.html`), Mercury composition (`documents/resources-source.html`, `documents/VERBATIM-SOURCE-TEMPLATE.md`), and CSS/layout widths.

## D. Automated invariants

Full VMSS (`npm run check:canon`) now enforces:

1. `tools/canon.json` locks the exact composite, 2295, A active, B pending, and unchanged SCM.
2. Twelve current fiscal surfaces must state the active composite.
3. The law register, certificate, and Systems must agree on activation, B pending, 2295 effect, and SCM.
4. Current fiscal surfaces must not call Schedule B inactive, not-active, or not-in-force.
5. Current World-tier explanations must have no unlabelled live 70% tax claim.
6. Description, Open Graph, and Twitter metadata must have no stale current 70-tax claim and tax-bearing metadata must label history or current status.
7. The ten retained raw historical/process sources must retain their archival/current-state frame.
8. Existing reproducible A1–A8 certification/data/verifier checks remain required.

VMSSLite adds `tools/check-tax-canon.mjs` and CI. It asserts the explicit
composite, each layer-table rate, 2295, A active, B pending (and never called
inactive), SCM unchanged, removal of the former 70% and 10–15% claims, the
current 8% -3 example, and a recursive text scan that allows only non-tax STI
70–84 references.

## E. Main/Lite synchronization

Both repositories now show the same active fiscal state:

> **50 / 35 / 17 / 8 active from 2295; Schedule A active; Schedule B pending; SCM unchanged.**

## F. Contradictions found and corrected

1. The prior completion missed the live 70% implication in full-site
   `systems.html`. It now explicitly states the active composite and split
   schedule status.
2. VMSSLite had a 70% Main table/copy and a 10–15% -3 example. Both are now
   50% and 8%, respectively.
3. Ten unframed or ambiguously framed internal/provenance sources received
   clear historical/current-state headers.
4. The final grep found four current surfaces that described Schedule B as
   “inactive.” `rate-history.html`, `law-polling.html`, the pending-page
   generator, and its generated statute page now consistently say **pending**.
