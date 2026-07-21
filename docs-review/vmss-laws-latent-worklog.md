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

- **1,321** candidates mined; **61** instruments (51 founding-act, 10 schedule-under-authority);
  **27** promoted names, **34** minted; **506** ids clustered, **83** flagged, **731** excluded.
- Tier spread as returned by the mining stage: charter-home-excluded 386 · schedule-under-authority
  369 · founding-act 347 · not-law 133 · ambiguous 53 · regulatory-flag 17 · gap-flag 16 = 1,321.
- **The accounting does not close.** The synthesis pass worked from a stated pool of 1,320 and claims
  "0 unaccounted"; the true pool is 1,321, so one id is unaccounted for. Nothing about any instrument
  turns on it, but the excluded set must not be treated as exhaustive until it is re-run.
- 61 exceeds the spec's "roughly 25–60". Justified in the inventory's Counts section: the overshoot
  sits in §23–26, where canon already supplies distinct proper names that rule 2 forbids merging.
  Merging them would mean renaming things canon has named. Minted count (34) is inside the envelope.

### Defects in the run, recorded rather than smoothed

**Correction notice.** An earlier revision of this worklog and of the inventory header described these
defects wrongly, having trusted the synthesis document's account of its own provenance. The workflow's
completion report contradicts it. What follows is reconciled against the run journal, the failure
list, and the script. The false statements were: that the architectural-function lens returned
nothing; that its notes were never consumed; and that the legal-operation lens returned data.

1. **The legal-operation (deontic) lens FAILED** — `API Error: Claude's response exceeded the 64000
   output token maximum`. It returned nothing and contributed nothing. The instrument set is the
   synthesis of two lenses: subject-domain and architectural-function.
2. **The architectural-function lens succeeded and WAS consumed — under the wrong name.** This is the
   consequence of defect 3, not a separate fault. Its output reached the synthesis in the prompt slot
   labelled *legal-operation*. Therefore every "legal-operation lens" attribution in the inventory's
   name-conflict table actually credits the architectural-function lens, and the inventory's PART 0
   claim that "the architectural-function lens returned empty" is exactly backwards. **The decisions
   stand; the attributions do not.**
3. **The script bug that caused it.** `parallel(...).then(r => r.filter(Boolean))` compacts the
   results array, so a failed lens silently shifts every later lens into the previous slot. The
   synthesis prompt interpolates `clusterings[0..2]` positionally against fixed lens headings, so the
   failure did not merely garble `log()` labels — it mislabelled real data inside the prompt and
   manufactured a phantom "empty lens". A later run must index by lens key, never by position.
4. **The synthesis pass FAILED on return** — `API Error: Connection closed mid-response` — after
   writing `synthesis-instruments.md`. The file is complete (PART 0 through PART 4, ending cleanly),
   and it is the artifact the inventory is built from. But its structured return never arrived, so
   nothing independently checked its accounting: **PART 4's verification record is the synthesis
   agent's own unaudited claim about its own work.** Its one testable assertion — the id accounting —
   is already known to be off by one (see Numbers). Phase V should re-verify PART 4's other four
   claims rather than inherit them.

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

---

## Independent verification pass (second run, 2026-07-21)

A second, independent execution of this sweep ran on the same branch. It mined the corpus and
synthesised its own inventory before discovering — at the push step — that this branch already
carried the committed Phase M gate (`b025015` / `9a45fc5`). It did **not** overwrite the established,
more-complete 61-instrument inventory. Instead it aligned to the committed tip and contributed the
independent cross-check the prior run explicitly said it lacked (its PART 4 is "unaudited
self-testimony"; its accounting is off by one).

**Deliverable:** `docs-review/vmss-laws-latent-verification.md` (new) — an outside audit that
converges with the committed inventory on every core call.

**Findings (detail in the verification record):**
- The two runs, mining independently, **converge on every headline doctrinal call**: the home rule is
  decisively exclusive; the handoff's "Currency Siloing Act" exemplar fails it and survives only as
  The Central Banking Authority; the two Phase A parser blockers (`check-canon.mjs:590`,
  `build-law-toc.mjs:126`) are real; the whitepaper has no per-section anchors; the PCD/SAD catalogue
  is regulatory-tier and register-absent (flag, never author). Independent convergence corroborates
  the inventory's soundness.
- **Independent mechanical checks pass:** 0/61 name collisions against the 89 existing titles; 0
  reserved-phrase heads; no number/date/acronym in any minted name; home-rule spot-checks hold.
- **Two open items before Phase A (endorsed, not blocking the gate):** (1) mechanically re-prove the
  excluded pool is exhaustive (the prior run's own recommendation; its 1,321-vs-1,320 accounting has
  not closed); (2) the two parser fixes + a whitepaper-`<h2>N.`-existence guard in place of literal
  anchor resolution.
- **No overwrite performed.** The committed inventory and this worklog's prior content are untouched;
  this section and the verification record are additive.

**check-canon:** 126 passed, 0 failed (unchanged; only `docs-review/*.md` touched).

**Reconciliation note for Jason.** Two independent Phase M runs now exist for this assignment. The
committed 61-instrument inventory is the more complete and is the gate. This run's fuller alternate
synthesis (a stricter, more consolidated ~21-founding-act reading with an explicit exclusions ledger)
is preserved out-of-tree in the session scratchpad and can be surfaced if a side-by-side comparison
is wanted. Recommendation: keep the 61-instrument inventory as the gate; treat this verification
record as its independent audit.

---

## Fix Pack B — Phase A preconditions (2026-07-21)

Executing `docs-review/vmss-laws-latent-dispositions.md` Fix Pack B on `feat/vmss-laws-latent-corpus`.
**B9 (spec sync)** done first: merged `origin/claude/laws-html-visibility-5nppos` (latent handoff v1.1
§9, load-bearing successor spec, this fix pack + `accounting-recheck.{mjs,json}`) — clean merge, the two
branches touched near-disjoint files.

### Baseline measured at branch time

`node tools/check-canon.mjs` → **126 passed, 0 failed** (matches the handoff's re-derived baseline and
the verification record). Fix Pack B1–B5/B7 touch only `docs-review/**`, outside every check-canon
sweep, so this number is unchanged by them.

### B1 — accounting rebased on the committed ledger

`accounting-recheck.json` is ground truth. Re-ran `accounting-recheck.mjs` from the committed annex:
**pool 1,352** (the 1,320/1,321 figures came from the lost, never-committed workflow journal). Derived
partition: **516 assigned · 89 flag-cited · 109 named-excluded · 135 Path 2 categorical · 503 residual**
(= 1,352). The stale Counts block, the SYNTHESIS Counts line, PART 4 §5, and the residual block's
dangling "returned JSON's `excluded` array" reference are corrected **in place beside the originals**
(9a45fc5 idiom) with pointers to the committed ledger.

### B2 — all 30 `suspiciousResiduals` dispositioned

> **Judgment beyond spec (flagged):** the committed JSON enumerates **30** suspicious residuals, not
> the memo's "26". The ledger is ground truth (B1), so all 30 were dispositioned. Each was verified by
> reading the annex block AND the covering instrument's actual provision text before disposition.

- **11 → assigned** (duplicate §-source ids of content instruments already carry): wp-17-19-35/-36→#6;
  -51/-52→#7; -41→#18; -25→#28; -18a/-18b→#30; -64/-65→#16; -72→#53. Each appended to the instrument's
  `**candidate ids**` line with a per-instrument evidence note; the covering provision is cited.
- **9 → named exclusion** (PART 2): layers-sads-63→LP-006, wp-17-19-22→LP-060 (already enacted);
  systems-65→Charter XXV.III, layers-sads-66→federal floor + XXVIII petition (charter-home); wp-17-19-42
  → UBI/PJS restatement; layers-sads-16, layers-sads-56, wp-17-19-18c, wp-27-34-153 → not-law (new
  "Not law" subsection).
- **10 → PART 3 flag**: systems-66b→Contradictions (B4); wp-09-12-18, wp-20-22-16, wp-27-34-61/-79/-82/
  -84/-113/-114/-123 → Regulatory-tier (Article XXVIII/IX SAD & Precognition-family, no register entry).

Full per-id evidence ledger added as inventory **PART 5** (outside the tool's parsed ranges). No new
instrument authored, no provision text changed; nothing genuinely uncarried was minted — the uncarried
operative content (SAD/Precognition instruments) was escalated to flags, not authored.

### B3 — phantom citations cured

- Instrument #30 `wp-17-19-18` → `wp-17-19-18a` (annex splits §17.1.5 into 18a/18b/18c; prov-4 text = 18a).
- PART 2 `wp-17-19-79 — LP-049` **struck** (annex defines no -79; LP-049's real id is -77, already
  assigned). The §19.11 numbering skew (-76/-78 mislabels) is recorded in PART 5 for later sign-off, not
  edited — outside B3's scope and no provision change without sign-off.

### B4 — dropped flag restored + annex erratum

systems-66b restored to PART 3 Contradictions verbatim from the annex headline (mutual-aid ladder adds a
"+1 Sanctuary" rung Charter XXV.IV omits). The `mine-systems.md` headline-vs-table numbering skew
(headline labels Genetic Diversity Monitoring `systems-65`; table/PART 3 use `systems-66`; true
`systems-65` is the XXV.III hacking-prohibition charter-home row) is recorded as an erratum in PART 5;
ids are **not** renumbered.

### B5 — residual ledger closed

`accounting-recheck.mjs` extended to emit `residualGround` per residual id (a=charter-home, b=not-law,
c=restatement/other) and a `summary.residualGrounds` tally. Derived: **503 residuals — a 353 · b 104 ·
c 46.** The residual block now states this and points at the committed ledger.

### B7 — flag counts restated

"83 flag-owned" superseded by the ledger's **89 `flag-cited`**; contradiction cross-cites of assigned
ids count under `assigned` (disposition precedence), so nothing is double-counted.

### Recheck after Fix Pack B1–B5/B7

`node docs-review/vmss-laws-latent-mining/accounting-recheck.mjs` →
`pool 1352 · assigned 516 · flag-cited 89 · named-excluded 109 · path2 135 · residual 503 (a353/b104/c46)
· phantomRefs [] · suspiciousResiduals []`. Regenerated JSON committed.

### Judgments beyond spec (flagged for review)

1. suspiciousResiduals is **30**, not the memo's 26 — dispositioned all 30 against the ground-truth JSON.
2. A systematic **§-source citation skew** runs through the whitepaper clusters: the inventory's standing
   citations sit one (§18.3/§19.1/§17.3.1/§18.6/§19.9/§19.11) or two (§19.11 weapon cluster) ids off the
   annex's own numbering. The dispositioned duplicate ids were **appended**, not used to rewrite existing
   citations (no provision change without sign-off). Recorded in PART 5.
3. PART 2's `wp-17-19-76 — LP-047.3` / `wp-17-19-78 — LP-048.3` mislabels (annex: -76 = LP-048.3, -78 =
   not-law callout) are left unedited — valid `named-excluded` dispositions, outside B3's phantom scope.

### B6 — parser fixes + founding guards, mutation-tested

Both Code parsers matched `data-tier="…" data-source="…"` **adjacent**; the founding markup places
`data-instrument` between them. Applied architect notes (b)/(c) as ratified:

- **build-law-toc.mjs** (`entryRe`): optional `data-instrument` capture; a third body-parse branch for
  `instrument === 'founding'` (no `lp-self`; ToC label "Founding", name from `law-title`).
- **check-canon.mjs** (`codeEntries`): optional `data-instrument` capture; **explicit partition** —
  `foundingEntries` vs `registerEntries` — so founding entries are routed OUT of (a1)/(a2)/(a3)/(b) and
  the (a4) 1:1 count rather than silently non-matching, and held to their own guards:
  - **(iv)** `data-instrument` vocabulary ∈ {founding} (asserted over every value on the page, ToC
    included, like the (c) tier guard);
  - **(i)** `data-source` resolves — a bare existing page or a `file#anchor` whose fragment is a real
    id in that file;
  - **(i-wp)** every cited `Whitepaper §N` exists as an `<h2>N.` heading (the real bite for the
    whitepaper-homed instruments whose data-source is a bare page, since whitepaper has no per-section
    anchors — architect note (b));
  - **(ii)** data-source is a whitepaper/World-tier canon page — never charter.html (home rule) or a
    Process/front page;
  - **(iii)** no founding name equals a register `law-title` or a register-derived Code title.

**Mutation suite** `tools/test-code-founding-guards.mjs` (npm `test:code-guards`) runs on a throwaway
repo copy — **7/7 probes bit**: positive control (a founding entry with `data-instrument` between
`data-tier` and `data-source` is indexed by the generator — Federal Law 39→40 — and accepted by
check-canon with its ToC in sync, proving **both parsers see it**); forged `data-instrument` → (iv);
nonexistent Whitepaper § → (i-wp); unresolved fragment → (i) only (not i-wp); charter data-source →
(ii); colliding name → (iii). Each negative asserts the specific guard label — red for the reason under
test (the P4 lesson).

**Gate after B6:** `check-canon` **131 passed, 0 failed** (baseline 126 + the five founding guards,
vacuously green while no founding entry is authored — they light up at Phase A's first commit).
`build:css` clean. `build-law-toc` both modes byte-stable and idempotent on the real files (the optional
capture is backward-compatible with the register-derived entries). No stop conditions hit; no check
weakened — guards were added and partitioned, none deleted (Prompt 0 rule 6).
