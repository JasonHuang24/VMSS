# The Five Rings — VMSS Civilization (Full Site)

A voluntary civilization framework built on moral causality, layered governance, continuity, and consequence.

**Version:** 17.5
**Live site:** https://jasonhuang24.github.io/VMSS/
**Lite site:** https://jasonhuang24.github.io/VMSSLite/
**Whitepaper:** https://jasonhuang24.github.io/VMSS/whitepaper.html

---

## About

The Five Rings is a proposed civilization model organized around five concentric governance rings (+1 to -3). Citizens are placed in rings based on demonstrated behavior — not birth, wealth, or ideology. The system combines technoneural enforcement, a Social Trust Index, automation-funded UBI, backup vessel continuity, and consequence-bound freedom into a single coherent architecture.

This is the **full site** — the complete doctrine portal with interactive tools, detailed layer dossiers with narrative simulations, STI console, current-state technology annotations, a 15-page paginated whitepaper, and extended FAQ edge cases.

A **lite version** of the site exists at the companion repository (VMSSLite) for readers who want the full doctrine in a faster, more focused reading experience.

---

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Homepage — ring diagram, justice flow, layer overview, lite site callout |
| `layers.html` | Interactive Five Rings map with live layer detail panel |
| `layer-+1.html` | +1 Sanctuary — pre-intervention, SADs, Heaven Ring, narrative simulation |
| `layer-0.html` | Main Layer (0) — the proving ground, default entry, narrative simulation |
| `layer--1.html` | -1 Noncompliance — The Balanced Layer, narrative simulation |
| `layer--2.html` | -2 Violent Offense — The Lower Restrictions Layer, narrative simulation |
| `layer--3.html` | -3 Terminal — The Freedom Layer, narrative simulation |
| `systems.html` | Economy, enforcement architecture, savings circulation mandate |
| `technologies.html` | Implants, neural diving, backup vessels, augmentation — with current-state delivery annotations |
| `sads.html` | Selective Ascension Domains — opt-in metric-gated domains within +1 |
| `simulations.html` | STI console + simulations dossier index (links to World Scenarios and Resident Stories) |
| `simulations-world.html` | World Scenarios dossier — civilizational stress tests, doctrine cases, architectural pressure tests |
| `simulations-residents.html` | Resident Stories dossier — historical figures, original civilians, criminal profiles, archetypal residents, long-horizon simulations |
| `why-vmss.html` | The case for the civilization model |
| `world.html` | The World of VMSS — international law, founding era, geopolitical context, entertainment, daily life |
| `whitepaper.html` | 33-page paginated whitepaper with TOC, page jump, and expanded glossary |
| `charter.html` | Founding constitutional document — all 28 articles |
| `faq.html` | Extended FAQ with edge cases |
| `roadmap.html` | Seven-phase development roadmap — 2026 Founding Treaty to 3000 |
| `audiobook.html` | The Five Rings audiobook series — free intro, trilogy, standalone volumes |
| `join.html` | Voluntary entry process and application form |

---

## Stack

- HTML · CSS · Vanilla JavaScript
- Tailwind CSS (CDN)
- Font Awesome (CDN)
- Supabase (join form backend)
- Hosted on GitHub Pages

---

## Structure

```
/
├── index.html
├── layers.html
├── layer-+1.html  layer-0.html  layer--1.html  layer--2.html  layer--3.html
├── systems.html
├── technologies.html
├── sads.html
├── simulations.html
├── why-vmss.html
├── world.html
├── whitepaper.html
├── charter.html
├── faq.html
├── roadmap.html
├── audiobook.html
├── join.html
├── 404.html
├── navbar.html          # Shared nav, loaded dynamically
├── footer.html          # Shared footer, loaded dynamically
├── script.js            # Global state engine, theme, mobile menu, modals
├── styles.css           # Full design system
├── assets/
│   └── js/
│       ├── diagrams.js  # Interactive SVG ring diagram
│       └── sti-sim.js   # STI simulation console
├── images/
│   └── emblem.jpg
├── sitemap.xml
└── robots.txt
```

---

## Key Concepts

**VMSS** — Vertical Moral Stratification System. Behavioral stratification replaces incarceration. Layer placement is a permanent environmental consequence of demonstrated conduct, not a time sentence.

**STI** — Social Trust Index. A separate ledger for non-criminal trust violations. Covers harms that fall below legal thresholds — fraud, chronic deception, harassment — and makes them socially legible without criminalizing them. Operates on two distinct tracks: social trust violations (STI) and hard behavioral flags (criminal record log).

**Backup Vessels** — Periodic encrypted mind-state backups. Fabrication is sovereign VMSS technology. Revival is binary: full fidelity or failure. In -1 and -2, continuity is serviced through VMSS-operated fabrication satellite installations. In -3 Terminal, the implant severs the backup vessel link at the hardware level — death is final.

**Neural Diving** — Direct mind-to-mind interface technology. Audience mode (passive observation) and Pilot mode (temporary control, requires consent). The civilization's primary medium for empathy, education, and art.

**SADs** — Selective Ascension Domains. Opt-in metric-gated domains within +1 Sanctuary, each filtered by a single measurable criterion. Citizens may qualify for multiple simultaneously.

**Governance** — Three-body structure. The **Meritboard** is the civilization's continuously updating competence ranking, with separate sub-rankings for the distinct competencies each role requires. The **President** is drawn from the top of the executive-doctrinal-leadership ranking. **Supreme Court** justices (10) are drawn from the top of the legal-interpretation ranking. Structural independence between executive and judicial branches comes from metric separation within the Meritboard, not pool separation. No elections. Competence is measured, not campaigned for.

**Founding Core** — Four founding lines inscribed in the Charter preamble by the Chief Architect. Not legally immutable — every clause is amendable through the Article XI gauntlet — but protected by structural improbability and by six hundred years of cultural anchoring. The Charter is how the civilization does the work. The four lines are what the civilization is for.

**Leakage** — The gap between stated consequence and actual consequence delivery. Starting reality: ~90%. Founding aspiration: 0%. Target by 3000: ~0.01%.

---

## Companion Repository

The **VMSSLite** repository contains a condensed version of the site — same doctrine, faster read. No interactive widgets, no current-state annotations, condensed pages, six archetypal simulations instead of the full archive. Ideal for first-time readers.

---

*Founded March 29, 2026 — Founding Treaty*
