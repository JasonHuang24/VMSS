# VMSS Laws — Latent-Corpus Codification Sweep · Worklog

Branch `feat/vmss-laws-latent-corpus`, cut from `feat/vmss-laws-v22.7.0` at `119556f`.
Spec: `docs-review/vmss-laws-latent-handoff.md`. Reports append here.

---

## Phase M — MINE (the gated deliverable)

**Result: COMPLETE. `docs-review/vmss-laws-latent-inventory.md` committed.**

### Setup

- Pulled `feat/vmss-laws-v22.7.0` (already up to date at `119556f`), branched, pushed to origin
  before any work so every milestone has a remote. `main` and PR #29 untouched.
- Baseline gate re-run before touching anything: `node tools/check-canon.mjs` →
  **126 passed, 0 failed**, derived `law 7/60/22 of 89`. This is the number Phase A must hold or
  raise, never lower.
- Register parse ground truth taken from the page's own stat cards / check-canon's own derivation
  (`7/60/22 of 89`), per the spec's warning about varying entry markup. No hand-rolled regex over
  `law-polling.html` was trusted for any count in this phase.

### What ran

A single ultracode workflow, 20 agents:

| Stage | Agents | Output |
|---|---|---|
| Mine | 14 surface readers | `docs-review/vmss-laws-latent-mining/mine-*.md` + structured candidates |
| Mine | 2 index builders | `charter-home-index.md` (home-rule veto index), `existing-names-index.md` (collision index) |
| Cluster | 3 lenses — subject-domain, legal-operation, architectural-function | independent instrument proposals |
| Synthesize | 1 | the merged authoritative set |

Surface coverage: whitepaper §1–34 (seven readers), `systems.html`, `technologies.html`,
`world.html`, `layers.html` + five layer dossiers + `sads.html`, `faq.html`/`why-vmss.html`/
`index.html`/`join.html`/`roadmap.html`, the five `simulations-*` pages, and the path-2 family +
`rate-history.html` + `deregistered-statutes.html` + `pending-ratification.html`. `charter.html` was
read as the veto surface, not as a mining target — correct under the home rule.

### Numbers

- **1,320** candidates mined; **61** instruments (51 founding-act, 10 schedule-under-authority);
  **27** promoted names, **34** minted; **506** ids clustered, **83** flagged, **731** excluded.
- Every id accounted for exactly once — verified mechanically by the synthesis pass (0 duplicates,
  0 orphans).
- 61 exceeds the spec's "roughly 25–60". Justified in the inventory's Counts section: the overshoot
  sits in §23–26, where canon already supplies distinct proper names that rule 2 forbids merging.
  Merging them would mean renaming things canon has named. Minted count (34) is inside the envelope.

### Defects in the run, recorded rather than smoothed

1. **The architectural-function clustering lens returned no structured result.** It wrote
   `cluster-architecture.md` (committed in the annex) but that file was never fed to the synthesis,
   which therefore merged **two** lenses, not three. Not fatal — the two surviving lenses were the
   two whose outputs the synthesis actually reconciles — but the inventory's coverage claim is
   weaker than designed, and this is stated in the inventory itself rather than only here.
   `cluster-architecture.md` is the cheapest available coverage gain before Phase A.
2. **The legal-operation lens returned structured output but never wrote its notes file**, so its
   reasoning survives only through the synthesis and the name-conflict table.
3. A latent bug in the workflow script: `parallel(...).then(r => r.filter(Boolean))` compacts the
   array, so a failed lens shifts the indices used to label the proposals. It did not corrupt the
   synthesis (the empty slot arrived as `{}`), but the `log()` lens labels in the run transcript are
   unreliable. Recorded so a later run does not trust them.

### Stop conditions — none hit

No check-canon failure, no temptation to weaken a check, no place where unavoidable-but-unspecified
doctrinal prose had to be written. Phase M authored no canon: it produced review artifacts only.

### Findings that bind Phase A

**F1 — the spec's own granularity example fails the home rule.** `vmss-laws-latent-handoff.md` §5
offers "one Currency Siloing Act …" as the clustering example, but `charter.html:199–202` **is**
Article III.IV *Currency Siloing* and states the siloing, "Upward conversion is prohibited without
exception", the 90–99% forfeiture, the retention schedule, currency retirement-and-issuance, and the
central bank's settlement-rate derivation verbatim. Charter-home ⇒ no act name. The sweep followed
the rule over the example; what survives is instrument #3 **The Central Banking Authority** (the
institution the Charter presupposes but never constitutes). Flagged for Jason as the one deliberate
departure from the spec's letter.

**F2 — `whitepaper.html` has no per-section anchors.** Only `glossary`, `trajectory-doctrine`,
`pagination`, `main-content`, and two placeholders; sections are `<article class="page"
data-page="N">`. Spec guard (i) ("`data-source` resolves to a real anchor in the named file") is
therefore unsatisfiable literally for whitepaper-homed instruments — which is most of them. Proposed
cure: accept a bare existing page **or** a resolving `file#anchor`, plus a complementary guard that
each founding entry's cited *Whitepaper §N* exists as an `<h2>N.` heading. Rejected alternative:
adding ids to the whitepaper `<h2>`s — the page paginates, so a deep link would target a hidden
section.

**F3 — two parsers must change before any founding entry ships (highest-risk Phase A item).**
`tools/check-canon.mjs:590` and `tools/build-law-toc.mjs:126` both match `code-entry` with
`data-tier="…" data-source="…"` **adjacent**; the spec's founding markup puts `data-instrument`
between them. Left alone: every founding entry becomes invisible to the entire code-integrity guard
block (a vacuous green), and the generator's extraction-mismatch check hard-fails. Both regexes need
an optional `data-instrument` capture, and founding entries need **explicit** partitioning out of
guards (a1)/(a3)/(b) and the (a4) register-1:1 count — never silent non-matching. Mutation tests must
target exactly this: a founding entry that the guard block must still see.

### Gate state at commit

- `node tools/check-canon.mjs` → **126 passed, 0 failed** (unchanged; Phase M touched no root
  `.html`, and the three globbed sweeps read root `.html` only).
- `npm run build:css` — not run and not required: no HTML or JS class changed.
- TOC generators — not run and not required: no entry markup changed.

---

## Phase A — AUTHOR

Not started. Resumes from the ratified inventory.

## Phase V — VERIFY

Not started.
