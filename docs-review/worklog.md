# v21.6 Economic Doctrine Pass — Work Log

Prepared for external review. Nothing in this pass was committed until the
`v21.6-econ-pass` branch. `check-canon` 68/68; law-TOC regenerated to 82 entries.

## Grounding (files read, sections cited)

Charter III.III / III.IV / III.V / III.VII / III.VIII; whitepaper §12.1–12.6,
§28.0, §7.3, §5.4.2, §7.6, §10.2, §10.6, §22.7–22.10, §24, §26.3; `law-polling.html`
entry format (LP-064/065/067.2/068 templates, three-tier banners, auto-TOC +
stat-card invariants); `documents/design-principles.md`; the two build tools
(`build-law-toc.mjs`, `check-canon.mjs`).

## TASK 1 — SCM Property Attribution (LP-069)

Drafted **LP-069 "Savings Attribution and Property-Cap Repeal Act"** (next in
sequence; max was LP-068) as a **Federal** entry, with the dual-key classification
question shown honestly in the summary: the 1+1 cap lives in the anti-oligarchy
constraints (not Charter text), so repealing it in one layer amends no article;
III.VII already defines the savings base and pulse — the dual key ruled
specification, not Charter amendment. Modeled on LP-064/067.2 conventions.

Engraved the enacted doctrine, LP number cited inline:

- **whitepaper §12.5** — new paragraph defining the savings base (residential
  attribution, commercial idleness, credit origination-instant, barter
  realization; primary-residence exemption; no new rate; Sanctuary uses its cap
  instead) `(LP-069)`.
- **whitepaper §12.6** — rewrote the cap sentence: cap retained in +1 Sanctuary,
  retired in Main for attribution `(LP-069)`.
- **whitepaper §28.0** — reconciled the anti-concentration envelope bullet
  ("property cap" → "Sanctuary property cap and Main-Layer idle-asset
  attribution", `LP-069`) so the envelope enumeration stays truthful.
- **charter III.VII** — new "Savings base and attribution" paragraph `(LP-069)`.
- **systems.html** — updated the property-cap bullet.
- Counts reconciled: stat cards Entries 81→82, Federal 53→54; count line 81→82;
  TOC regenerated (Federal 54).

No arithmetic in this task (attribution uses the existing 10%/month Main
mechanics, no new tier — per 1b/1c). The one numeric parameter, the 12-month
commercial-idleness window, is marked founder-calibratable in all three
engravings.

### Doctrine encoded (1a–1e)

- **1a** — 1+1 cap retained in +1 Sanctuary (preventive character), abolished in
  Main for attribution.
- **1b** — Residential attribution (Main): primary residence exempt by
  implant-ledger occupancy; every additional residence attributes at assessed
  value on the ordinary pulse; a residence occupied as another household's primary
  home is working capital and does not attribute; vacant additional residences
  attribute in full. No new tier.
- **1c** — Commercial idleness: no central-bank settlement for a sustained window
  (12 consecutive months, founder-calibratable) → attributes at assessed value
  until settlement resumes or the asset sells; clearing record is the sole sensor;
  no registry/inspectorate/intent-adjudication; active businesses untouched.
- **1d** — Credit origination-instant attribution: collateral pledged / loans
  originated attribute to the borrower's balance the moment the transaction clears;
  no grace window; fuller credit doctrine deferred to a later LP.
- **1e** — Barter realization: in-kind exchange realizes the disposed asset at fair
  value; gain = Article III.III earned income; liability owed in currency.

## TASK 2 — Top Marginal Rate Recalibration — GATED CLOSED

Token `RATIFY-TAX-20` is not present as a live authorization — it appears in the
repo nowhere, and in the prompt only inside the sentence describing the gate
condition. Nothing implemented. (For reference, if later ratified, the `$60M`
worked example lives in three places — whitepaper §12.1, systems.html:271, charter
III.III — plus the rate tables in charter III.III and whitepaper §12.1, and would
recompute to ~$160M retained at 20% above $10M.)

## TASK 3 — LP Engraving Audit

Audited all 45 enacted LPs against the whitepaper via four parallel read-only
sub-audits, then verified every action against the live files. Finding: only 11 of
45 enacted LPs were engraved, and 5 of the 7 Pillar Federal Laws were
under-engraved.

- **Executed (verified citations):** LP-028 (§26.3), LP-013 (§22.7 — added its
  actual voting-weight sentence).
- **Executed (Pillar engravings, distilled from ratified registry text):**
  LP-007.2 (§7.6), LP-041 (§10.2), LP-045.2 (§22.10).
- **Not engraved (flagged):** LP-005.3 and LP-039 have no clean whitepaper home;
  ~15 non-pillar/borderline MISSING items queued for a founder-confirmed
  consolidated wave rather than mass-inserted blind (accuracy over coverage).

Full classification in `lp-audit-table.md`.

## TASK 4 — design-principles.md

File already existed at `documents/design-principles.md` (founder-placed), grouped
with other doctrine docs; nav is HTML-only. Kept it there rather than move to repo
root (moving would orphan it from siblings and contradict the actual filing —
flagged), added a reference in the README Structure block, confirmed no typos
(content untouched, per "copyedit only").

## Validation

- `node tools/build-law-toc.mjs` → 82 entries (Charter 7 · Federal 54 · Regulatory 21)
- `node tools/check-canon.mjs` → 68 passed, 0 failed
- Version stamps README + footer bumped 21.5 → 21.6 (lockstep)

Files touched: charter.html, whitepaper.html, law-polling.html, systems.html,
README.md, footer.html, plus new documents/design-principles.md (README reference).
Nothing committed or pushed prior to the review branch; CI not yet run.
