# Tax-canon propagation audit — correction pass (2026-07-18)

> **Audit artifact, not doctrine.** The prior audit incorrectly reported a
> split 50 / 35 / 17 / 8 outcome. That implementation is superseded. The
> operative fiscal state is **50 / 25 / 12.5 / 6.25 active from 2295; Schedules
> A and B active; LP-073 superseded; SCM unchanged.** LP-075 is procedural
> only. Historical 70 / 35 / 17 / 8 records remain historical law, not current
> authority.

## Scope and method

Both repository roots are searched with the required stale-pattern and broad
`rg` searches, including maintained and generated HTML, Markdown, source HTML,
scripts, JSON/data, metadata, XML, review/provenance records, and PDF text
extraction. `.git`, dependency directories, unreadable binary assets, and the
compiled Tailwind bundle are excluded only for the stated technical reasons;
source CSS is still reviewed for doctrine-bearing text.

The required current-law test is deliberately narrow:

> **LP-074 sets the complete exact halving cascade: 50 / 25 / 12.5 / 6.25.
> The 2294 Path 2 certificate independently clears Schedule A and Schedule B;
> both take effect in 2295. LP-075 compels the process but sets no rate.
> LP-073 is preserved as historical law and has no operative rate authority
> after 2295. SCM and the $10 million threshold are unchanged.**

## A. Hit ledger

| File | Line(s) | Excerpt / result | Classification | Required action |
|---|---:|---|---|---|
| `systems.html` | tax-system section | Former split schedule and pending-B explanation | Current operative canon | Change to 50 / 25 / 12.5 / 6.25; explain the exact cascade and both active schedules. |
| `law-polling.html` | LP-073–075 register entries | LP-074 authority, LP-073 status, and LP-075 role | Current register plus historical statutes | Mark LP-074 “Enacted · Schedules A and B Active”; LP-073 “Superseded”; LP-075 procedural only. Preserve dated statutory text. |
| `rate-history.html` | current era and timeline | Split post-2295 era | Current operative canon plus history | Replace with “Full Halving-Cascade Era — 2295 to present”; retain 70 / 35 / 17 / 8 only through 2294. |
| `charter.html`; `faq.html`; `whitepaper.html`; `why-vmss.html` | tax sections / tax-bearing metadata | Current split-rate explanation; late review also found FAQ’s live “8% top marginal” sentence | Current operative canon | Change all four layer rates and authority descriptions; retain non-tax percentage values. |
| `layer-+1.html`; `layer-0.html`; `layer--1.html`; `layer--2.html`; `layer--3.html` | layer economic copy | Possible indirect current lower-rate descriptions | Current explanatory surfaces | Use 50 / 25 / 12.5 / 6.25 wherever a current tax rate is named. |
| `simulations.html`; `simulations-academy.html`; `simulations-resources.html` | current-era example/card text | Current lower-rate examples | Current simulation / teaching surface | Use 25%, 12.5%, and 6.25% for current-era examples; preserve era-pinned simulations. |
| `documents/academy-source.html` | 537, 1073 | Current teaching text previously named 35%, 17%, and 8% | Current educational material | Changed to the LP-074 50 / 25 / 12.5 / 6.25 cascade; both schedules independently certified in 2294. |
| `documents/resources-source.html` | 2121, 2125–2126 | Current -1 economic lesson previously used 35% | Current educational material | Changed to 25%, with the full active cascade and unchanged SCM stated in context. |
| `documents/vmss-academy-course-packet.pdf`; `documents/vmss-academic-resources.pdf` | pages 62 / 164 after extraction | Derived teaching artifacts | Generated PDF | Regenerated from corrected source; text extraction confirms the full active cascade and no stale current lower tax rate. |
| `path-2-certification-2294.html`; `documents/path-2-certification-2294-data.json`; `tools/verify-path2-certification-2294.mjs` | certificate and verifier | A-only conclusion / pending-B wording | Current certification evidence | Independently compute and display A1–A8 and B1–B6; print the full active cascade. |
| `path-2-charter.html`; `path-2-schedule.html`; `path-2-risk-register.html`; `path-2-commencement-duty-act.html` | status blocks and historical notes | A-only or pending-B status wrappers | Current procedural canon / historical record | State both schedules active; preserve dated 2279–2288 conditions as historical. |
| `documents/path-2-{charter,schedule,risk-register,adoption-ruling,presidential-ruling}-source.md` | source status/footer | Current split or pending-B footer | Historical source with current wrapper | Correct current status; retain source-era conditions as historical. |
| `documents/ratify-tax-50-ii-statute-source.html`; `pending-ratify-tax-50-ii-statute.html` | conditional statute / wrapper | Conditional Schedule B language and pre-certificate 70% | LP-074 conditional drafting text | Preserve the enacted conditional text; wrapper must say later 2294 certification activated both schedules. |
| `pending-ratification.html`; `pending-ratify-tax-50-{ballot,advocacy,supplemental,opposition,record,rulings}.html`; `deregistered-statutes.html` | archive wrappers | Failed TAX-50 destination and status explanation | Failed petition / process archive | Preserve the failure and original objections. Explain that later LP-074 independently proved the same destination. |
| `docs-review/AFFIRM-TAX-50-{advocacy-brief,supplemental-brief}.md`; `docs-review/RATIFY-TAX-50-{II-petition,opposition-brief,session-record}.md`; `docs-review/first-run-{cold-pass-prompt,preregistration-record}.md`; `docs-review/path-2-charter-draft-v4.md`; `docs-review/path2-charter-schedule-10-4.md`; `docs-review/session-handoff-post-path2-arc.md` | archive/current-state headers | Ten prior headers described the wrong split result | Historical/provenance record | Changed all ten wrappers to the full LP-074 cascade and clear historical framing. |
| `tools/canon.json`; `tools/check-canon.mjs`; `tools/check-tax-canon.mjs` (Lite) | canon assertions | Split schedule / pending-B assumptions | Validator / data | Enforce the full cascade, both schedule certificates, LP-073 supersession, LP-075 procedural role, SCM, and threshold invariants. |
| CSS, Tailwind utilities, STI bands, vote floors, recidivism, fidelity, Mercury composition | percentage hits unrelated to current tax doctrine | Unrelated | Preserve | Classify as styling or named non-tax measurement; never treat as rate canon. |

## B. Propagation matrix — every checked path

### Full VMSS

| Checked path(s) | Classification / result |
|---|---|
| `systems.html`; `charter.html`; `faq.html`; `whitepaper.html`; `why-vmss.html`; `law-polling.html`; `rate-history.html` | Current fiscal surfaces. Each must show the exact LP-074 cascade, both schedules active in 2295, LP-073 superseded, LP-075 procedural, $10 million unchanged, and SCM unchanged. |
| `path-2-certification-2294.html`; `path-2-charter.html`; `path-2-schedule.html`; `path-2-risk-register.html`; `path-2-commencement-duty-act.html` | Current certification/procedural surfaces. A1–A8 and B1–B6 must be independently visible or reproducible; historical conditions remain dated. |
| `pending-ratification.html`; `pending-ratify-tax-50-advocacy.html`; `pending-ratify-tax-50-ballot.html`; `pending-ratify-tax-50-ii-statute.html`; `pending-ratify-tax-50-opposition.html`; `pending-ratify-tax-50-record.html`; `pending-ratify-tax-50-rulings.html`; `pending-ratify-tax-50-supplemental.html`; `deregistered-statutes.html` | Generated/process archive. Preserve failed-petition and drafting history; current wrapper names the later independent LP-074 certification. |
| `simulations.html`; `simulations-academy.html`; `simulations-residents.html`; `simulations-resources.html`; `simulations-world.html` | Current examples use the full cascade; era-pinned historical scenarios retain their original rates and date labels. |
| `documents/academy-source.html`; `documents/resources-source.html`; `documents/path-2-charter-source.md`; `documents/path-2-schedule-source.md`; `documents/path-2-risk-register-source.md`; `documents/path-2-adoption-ruling-source.md`; `documents/path-2-presidential-ruling-source.md`; `documents/path-2-certification-2294-data.json`; `documents/ratify-tax-50-ii-statute-source.html`; `documents/HANDOFF-NEXT-SESSION.md`; `documents/design-principles.md`; `documents/VERBATIM-SOURCE-TEMPLATE.md` | Source/data. Teaching sources are current-law surfaces; verbatim statutes, dated records, and Mercury-composition examples are labeled historical or unrelated. |
| `documents/vmss-academy-course-packet.pdf`; `documents/vmss-academic-resources.pdf` | Derived PDFs. Regenerate from source and text-extract during validation; the current teaching claims must match the source HTML. |
| `docs-review/AFFIRM-TAX-50-advocacy-brief.md`; `docs-review/AFFIRM-TAX-50-supplemental-brief.md`; `docs-review/RATIFY-TAX-50-II-petition.md`; `docs-review/RATIFY-TAX-50-opposition-brief.md`; `docs-review/RATIFY-TAX-50-session-record.md`; `docs-review/first-run-cold-pass-prompt.md`; `docs-review/first-run-preregistration-record.md`; `docs-review/path-2-charter-draft-v4.md`; `docs-review/path2-charter-schedule-10-4.md`; `docs-review/session-handoff-post-path2-arc.md`; `docs-review/tax-canon-propagation-audit.md` | Archive/provenance records. The ten status wrappers now distinguish their dated body from current law; this ledger records the correction. |
| `docs-review/RATIFY-TAX-20-petition-draft.md`; `docs-review/RATIFY-TAX-50-petition-v4.md`; `docs-review/RATIFY-TAX-50-petition-v4.1.md`; `docs-review/flags.md`; `docs-review/lp-audit-table.md`; `docs-review/path2-residual-risk-register.md`; `docs-review/presidential-adoption-ruling-path2-charter.md`; `docs-review/presidential-ruling-path2-charter.md`; `docs-review/the-first-run-simulation-v1.md`; `docs-review/the-first-run-simulation-v1-review-copy.md`; `docs-review/v21.8-FLAGS.md`; `docs-review/v21.8-worklog.md`; `docs-review/v21.9-FLAGS.md`; `docs-review/wave2-FLAGS.md`; `docs-review/wave2-worklog.md`; `docs-review/worklog.md` | Historical/draft/review material. Preserve their record; no bare current-law assertion is permitted. |
| `tools/canon.json`; `tools/check-canon.mjs`; `tools/verify-path2-certification-2294.mjs`; `tools/build-path2-pages.mjs`; `tools/build-pending-pages.mjs`; `tools/build-law-toc.mjs` | Canon data, validator, verifier, and generators. All must derive the complete cascade and never hardcode a disconnected pass result. |
| `package.json`; `package-lock.json`; `README.md`; `CLAUDE.md`; `.gitignore`; `.claude/settings.local.json`; `.github/workflows/canon-check.yml`; `.github/workflows/supabase-keepalive.yml`; `.github/workflows/tailwind-check.yml`; `robots.txt`; `sitemap.xml`; `tailwind.config.js` | Metadata/configuration. README and footer receive the 22.6.0 correction release; package metadata is not changed in this pass. |
| `assets/js/card-filter.js`; `assets/js/diagrams.js`; `assets/js/sti-sim.js`; `script.js`; `roadmap.js`; `styles.css`; `roadmap.css`; `tailwind.input.css`; `assets/css/tailwind.css` | Code and styles. Any percentage hit is STI, UI, or styling unless the surrounding text explicitly asserts tax doctrine. |
| `supabase/.gitignore`; `supabase/functions/submit-application/index.ts`; `supabase/hardening.sql`; `supabase/rate-limit.sql` | Infrastructure. Searched; no tax-canon claim. |
| `404.html`; `audiobook.html`; `footer.html`; `index.html`; `join.html`; `layer-+1.html`; `layer-0.html`; `layer--1.html`; `layer--2.html`; `layer--3.html`; `layers.html`; `navbar.html`; `roadmap.html`; `sads.html`; `technologies.html`; `world.html` | Public/non-tax pages. Footer version is 22.6.0; any doctrine-bearing tax text is reviewed under the current-law rule. |
| `.DS_Store`; `apple-touch-icon.png`; `favicon-16x16.png`; `favicon-32x32.png`; `favicon.ico`; `images/Audiobook/Architecture of Consequence.png`; `images/Audiobook/Embodiment.png`; `images/Audiobook/Fresh Eyes.png`; `images/Audiobook/The Five Rings.jpg`; `images/Audiobook/The Intake Files.png`; `images/Audiobook/The Ledger.png`; `images/EarthvsVmss.png`; `images/emblem.jpg`; `images/favicon.jpg`; `images/hero-rings.png`; `images/world-agi.png`; `images/world-alliance.png`; `images/world-asi.png`; `images/world-climate.png`; `images/world-cyborg.png`; `images/world-daily-life.png`; `images/world-embodiment.png`; `images/world-entertainment.png`; `images/world-founding-era.png`; `images/world-geography.png`; `images/world-information.png`; `images/world-law.png`; `images/world-military.png`; `images/world-orbital.png`; `images/world-refugee.png`; `images/world-territorial.png`; `images/world-travel.png`; `images/world-visitor.png` | Binary/non-readable assets. Excluded only because they cannot contain searchable readable doctrine. |

### VMSSLite

| Checked path(s) | Classification / result |
|---|---|
| `systems.html`; `simulations.html`; `charter.html`; `faq.html`; `layers.html`; `why-vmss.html` | Lite current explanatory surfaces. Systems displays 50 / 25 / 12.5 / 6.25 and both schedules active; the -3 simulation uses 6.25%. |
| `README.md`; `footer.html`; `404.html`; `audiobook.html`; `index.html`; `join.html`; `navbar.html`; `technologies.html`; `robots.txt`; `sitemap.xml` | Lite metadata/public pages. README and footer receive the synchronized correction-version bump; any tax claim follows the Lite plain-English statement. |
| `tools/check-tax-canon.mjs`; `.github/workflows/canon-check.yml`; `assets/js/diagrams.js`; `assets/js/sti-sim.js`; `script.js`; `styles.css` | Lite validator, CI, code, and styles. Validator makes current-rate and no-stale-rate checks; non-tax percentage values remain allowed. |
| `apple-touch-icon.png`; `favicon-16x16.png`; `favicon-32x32.png`; `favicon.ico`; `images/Audiobook/Architecture of Consequence.png`; `images/Audiobook/The Five Rings.jpg`; `images/emblem.jpg`; `images/favicon.jpg` | Binary/non-readable assets. Excluded only for that reason. |

## C. Intentional surviving old-rate references

| Path(s) | Classification / why it remains |
|---|---|
| `law-polling.html`; `rate-history.html` | Historical LP-073 70 / 35 / 17 / 8 era through 2294, immediately dated and followed by LP-074’s 2295 exact cascade. |
| `simulations.html`; `documents/path-2-schedule-source.md`; `path-2-schedule.html`; `path-2-commencement-duty-act.html` | Era-pinned 2279–2288 or v14.x simulation/procedure records. They do not describe the current schedule. |
| `documents/ratify-tax-50-ii-statute-source.html`; `pending-ratify-tax-50-ii-statute.html`; `docs-review/RATIFY-TAX-50-II-petition.md` | LP-074’s conditional drafting and verbatim pre-certificate clause. The wrapper expressly distinguishes the later independent 2294 certification. |
| `pending-ratification.html`; `pending-ratify-tax-50-{ballot,advocacy,supplemental,opposition,record,rulings}.html`; `docs-review/RATIFY-TAX-50-{petition-v4,petition-v4.1,opposition-brief}.md`; `docs-review/AFFIRM-TAX-50-{advocacy-brief,supplemental-brief}.md`; `docs-review/RATIFY-TAX-20-petition-draft.md` | Failed TAX-50 materials, opposition, and alternate proposals. The failed petition selected the same destination but did not prove it; later LP-074 supplied its own lawful conditions and evidence. |
| `docs-review/RATIFY-TAX-50-session-record.md`; `docs-review/session-handoff-post-path2-arc.md`; `docs-review/first-run-{cold-pass-prompt,preregistration-record}.md`; `docs-review/{path2-charter-schedule-10-4,path-2-charter-draft-v4}.md` | Historical/process records. Corrected archive headers prevent the retained dated text from being mistaken for live law. |
| STI score bands, voting thresholds, recidivism rates, fidelity values, Mercury composition, layout percentages, and SCM parameters | Unrelated percentage hits. These are not tax-rate references and remain unchanged. |

## D. Automated invariants

The corrected checks must positively assert all of the following:

1. `tools/canon.json` names `50 / 25 / 12.5 / 6.25`, effective 2295, Schedule A active, Schedule B active, LP-073 superseded, LP-075 procedural, unchanged SCM, and unchanged $10 million threshold.
2. Current fiscal surfaces (including Systems, Whitepaper, Charter, FAQ, rate history, law register, certificate, and teaching sources) carry the same four rates and authority chain; Systems, Charter, and Whitepaper map each number to its specific layer.
3. The Path 2 verifier computes A1–A8 and B1–B6 from supplied data, rejects missing lower-layer attribution and prohibited cross-crediting, and prints the final active schedule.
4. No current surface can assert the split 50 / 35 / 17 / 8 result, a pending/inactive Schedule B, residual LP-073 rate authority, or semantic active 35% / 17% / 8% lower tax-rate forms (including “an 8% top marginal rate”).
5. Historical allowlisting is file-and-context specific: dated LP-073 history, raw conditional statute language, failed-petition records, and era-pinned simulations only.
6. Metadata, Open Graph descriptions, and generated pages cannot advertise stale current tax doctrine.
7. Lite independently asserts the full schedule, both schedules active, the 2295 effective year, SCM unchanged, and a 6.25% -3 simulation.

## E. Main/Lite synchronization

Both repositories must state:

> **50 / 25 / 12.5 / 6.25 active from 2295; Schedule A and Schedule B active; LP-073 superseded; LP-075 procedural; SCM unchanged.**

The Lite explanation remains intentionally plain-English: the top schedule halves
exactly by layer while SCM continues to prevent indefinite idle-wealth parking.

## F. Contradictions found and corrected

1. The previous completion missed a live Systems propagation and then encoded
   the wrong split succession throughout its audit and current-state wrappers.
2. The previously reported `50 / 35 / 17 / 8` outcome and “Schedule B pending”
   status were incorrect. They are superseded by the complete LP-074 cascade
   and independent A/B certification in 2294.
3. Teaching sources repeated the stale current 35% / 17% / 8% lower rates.
   They now teach 25% / 12.5% / 6.25%, and regenerated PDFs extract the same
   active cascade.
4. Ten internal/provenance status wrappers now state the authority chain rather
   than presenting their historical body as live fiscal law.
5. LP-073 is no longer described as residual rate authority after 2295, and
   LP-075 is no longer described as a rate-setting law.
6. The first corrected validator still missed FAQ’s present-tense “an 8% top
   marginal rate” wording. The FAQ is corrected to 6.25%, and the validator
   now rejects semantic active lower-rate forms rather than only one literal.

## Final invariant

> **The complete LP-074 exact halving cascade — 50 / 25 / 12.5 / 6.25 — became
> active in 2295 after both Schedule A and Schedule B independently certified
> in 2294. LP-073 is fully superseded as active rate law, LP-075 remains
> procedural, the $10 million threshold is unchanged, and SCM is unchanged.**
