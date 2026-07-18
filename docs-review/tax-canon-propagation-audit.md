# Tax-canon authority audit — LP-074 correction (2026-07-18)

> **Audit artifact, not doctrine.** The earlier propagation report incorrectly
> treated mutually agreeing pages and validators as proof of LP-074 activation.
> Re-reading the controlling instruments shows that the purported 2294 record
> is incomplete and void. LP-073's **70 / 35 / 17 / 8** remains operative;
> LP-074's **50 / 25 / 12.5 / 6.25** schedules remain conditional; SCM is
> unchanged.

## Authority result

The repository contains normalized candidate arithmetic but not the raw,
provenance-backed evidence needed to calculate Findings I–IV or establish a
complete Charter §11.1 compendium. It also lacks proof of LP-070's trailing
36-month 120% automation/dividend gate with no month below 100%, a qualifying
pre-vote LP-075 §13.1 cold-review record, Registrar execution, and a separately
published and adopted Lower Incidence Certificate. No missing item was
fabricated or backdated.

## Propagation ledger

| Surface | Classification | Disposition |
|---|---|---|
| `systems.html`, `charter.html`, `whitepaper.html`, `faq.html`, `why-vmss.html` | Current doctrine | Show LP-073 70 / 35 / 17 / 8; identify LP-074 as conditional and the 2294 record as void |
| `layer--1.html`, `layer--3.html`, current simulation passages | Current examples | Restore operative 35% and 8% rates |
| `law-polling.html`, `rate-history.html` | Authority and chronology | LP-073 active; LP-074 enacted but conditional; LP-075 procedural with §13.1 record gap |
| Path 2 Charter, Schedule, Register, LP-075 page | Controlling procedural surfaces | Preserve enacted text; add honest current-status wrappers |
| `documents/path-2-certification-2294-data.json` and generated page | Purported certificate | `VOID_INCOMPLETE`; candidate arithmetic only; no rate effect |
| `documents/path-2-certification-2294-authority.md` | Authority matrix | Map every controlling provision to evidence and validator treatment |
| `documents/lp-075-section-13-1-record-gap.md` | Provenance notice | Present-day notice; explicitly not backdated |
| `docs-review/*` | Historical/internal artifacts | Preserve substantive records; add non-operative status headers and mark the corrupted review copy invalid |
| Academy and resources source/PDFs | Current education | Teach the operative LP-073 rates and conditional LP-074 candidate |
| Pending-ratification generated pages | Historical/process wrappers | Preserve filed text; remove false activation wrappers |
| `deregistered-statutes.html` | Drafting history | Preserve withdrawn text; current wrapper identifies LP-073 as operative |
| `tools/canon.json` | Constants | Separate operative and candidate schedules; record void disposition |
| `tools/check-canon.mjs` | Automated invariants | Derive and verify authority, compendium gaps, sequence, revocation gap, generated-page agreement, and mutation tests |
| VMSSLite current pages and validator | Current summary | Must mirror LP-073 status and precisely limit −2/−3 SCM to UBI/PJS-attributable savings |

## Intentional candidate references

The figure **50 / 25 / 12.5 / 6.25** survives only in filed proposals,
historical advocacy, conditional-law text, candidate arithmetic, or a current
sentence that expressly labels it conditional and non-operative. Historical
70% references remain intact; current 70% references identify LP-073's
operative schedule.

## Revocation gap

Charter §13.2 expressly restores the upper 70% point after Schedule A
revocation but LP-074 does not automatically revoke Schedule B. A mixed
70 / 25 / 12.5 / 6.25 state therefore cannot be silently excluded. Express
amendment is required before activation to state how Schedule B is revoked or
recalibrated and which lower rates revive.

## Validation source of truth

The generated certificate page is built from
`documents/path-2-certification-2294-data.json` through the shared authority
module. The verifier confirms the void disposition, `--require-certification`
must fail, and the permanent mutation suite rejects malformed records. Green
canon checks do not substitute for missing evidence.
