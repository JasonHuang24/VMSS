# Handoff Prompt for Next Claude Doctrine Expert Session

## Context
This is the VMSS / The Five Rings civilization design project by Jason Huang. The repo is at `F:\Programming\VMSS\VMSS Website`. The session system prompt contains the full doctrine expert setup — read it first, then load the Charter and whitepaper as instructed.

## Current State
- **Academy:** 32 rubric-graded questions in `documents/academy-source.html`
- **Academic Resources:** 14 resources across 3 categories in `documents/resources-source.html`
- **Simulations:** 81 total (39 world, 42 resident) with doctrine snapshot stamps
- **Dossiers:** 4 (World Scenarios, Resident Stories, The Academy, Academic Resources)

## Outstanding Work

### Q25-Q28 Grade Tier Verification
Jason may provide a `VERBATIM-SOURCE-TEMPLATE.md` with full chat text for Q25-Q28. These questions have compressed grade tiers that need bulldozing and replacing with the verbatim text. Q21-Q24 were already expanded in the previous session.

### Doctrinal Correction: Kill Switch in Q24
The Q24 (Annihilation Ultimatum) B-grade response incorrectly leads with the kill switch as an asymmetric advantage against the Kessari. The kill switch has zero reach into the Kessari Federation — their military has no VMSS implants. The Trojan Implant scenario (Q26) hadn't been proposed yet at Q24's timeline. The actual asymmetric advantages are: nanobot plumes (reaches non-implanted), continuity asymmetry (VMSS soldiers revive), autonomous forces (no crews), orbital kinetics, alliance network, glass-cannon vulnerability. The kill switch should be repositioned as a domestic defense instrument with a new composable insight: the kill switch can be used as an **antimatter evasion mechanism** — command authority activates the kill switch on a targeted soldier before the antimatter reaches them, the implant registers the death, backup vessel link processes it, soldier revives. The antimatter hits a corpse. The kill switch becomes a survival tool, not a weapon.

### Format Standard
Q21-Q28+ use the new structured metadata format:
- Question (Type) label inside question-box
- Response Mode, Question Family, Evaluation Emphasis, Canon Anchors in question-meta div
- Difficulty (with parenthetical) and Course Scaling (with full range)
- Descriptive grade labels with class-level indicators where appropriate

Q1-Q20 use an older format — don't modify unless Jason asks.

### HTML Entity Reference
- Quotes: `&ldquo;` `&rdquo;`
- Apostrophes: `&rsquo;`
- Em dashes: `&mdash;`
- Section symbol: `&sect;`
- Middle dot: `&middot;`

### PDF Regeneration
- Academy: `"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="F:\Programming\VMSS\VMSS Website\documents\vmss-academy-course-packet.pdf" --no-margins "file:///F:/Programming/VMSS/VMSS Website/documents/academy-source.html"`
- Resources: `"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="F:\Programming\VMSS\VMSS Website\documents\vmss-academic-resources.pdf" --no-margins "file:///F:/Programming/VMSS/VMSS Website/documents/resources-source.html"`

## Key Doctrine (load these from Charter + whitepaper, don't trust summaries)
- PPG ranges: -1 ~1.3-1.8x, -2 ~1.8-2.5x, -3 ~2.5-4x (not the old flat 2x/4x/8x)
- Fabrication proxy installations (not "satellite" or "orbital" for -1/-2 facilities)
- Three-tier voluntary movement: visitation / elective residency / VPR
- STI classification: proprietary / classified / dynamic
- §16.1.2 effective death rates: 10-50x multiplier, five failure modes
- Treasury dual-mode: regulated budget (peacetime) / warchest (turbulence)
- Currency printing: Meritboard economics division → CBA → automated production capitalization → ADT → UBI
- Layer nicknames: Heaven Layer, The Metropolis, The Balanced Layer, The Lower Restrictions Layer, The Freedom Layer
- Backup vessel visitor rates sync to origin-layer infrastructure
- Kill switch as antimatter evasion mechanism (new — not yet in any document)
