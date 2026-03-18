# The Five Rings — VMSS Civilization

A voluntary civilization framework built on moral causality, layered governance, continuity, and consequence.

**Version:** 8.0
**Live site:** https://jasonhuang24.github.io/VMSS/
**Whitepaper:** https://jasonhuang24.github.io/VMSS/whitepaper.html

---

## About

The Five Rings is a proposed civilization model organized around five concentric governance rings (+1 to -3). Citizens are placed in rings based on demonstrated behavior — not birth, wealth, or ideology. The system combines technoneural enforcement, a Social Trust Index, automation-funded UBI, backup vessel continuity, and consequence-bound freedom into a single coherent architecture.

The site functions as a doctrine portal: it explains the model, makes the logic legible, and provides interactive tools to explore how the system evaluates behavior.

---

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Homepage — ring diagram, justice flow, layer overview |
| `layers.html` | Interactive Five Rings map with live layer detail panel |
| `layer-+1.html` | +1 Sanctuary — pre-intervention, SADs, Heaven Ring |
| `layer-0.html` | Main Layer (0) — the proving ground, default entry |
| `layer--1.html` | -1 Noncompliance — civic violation tier |
| `layer--2.html` | -2 Violent Offense — severe harm stratum |
| `layer--3.html` | -3 Terminal — zero intervention, final consequence |
| `systems.html` | Governance, economy, energy, and enforcement architecture |
| `technologies.html` | Implants, neural diving, backup vessels, augmentation, SADs |
| `sads.html` | Selective Ascension Domains — opt-in purity zones within +1 |
| `simulations.html` | STI console + historical personality and mechanism simulations |
| `why-vmss.html` | The case for the civilization model |
| `whitepaper.html` | 13-page paginated institutional draft |
| `charter.html` | Founding constitutional document |
| `faq.html` | Frequently asked questions |
| `roadmap.html` | Development roadmap — 2026 Boise Accord to 2100+ |
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
├── whitepaper.html
├── charter.html
├── faq.html
├── roadmap.html
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

**STI** — Social Trust Index. A separate ledger for non-criminal trust violations. Covers harms that fall below legal thresholds — fraud, chronic deception, harassment — and makes them socially legible without criminalizing them.

**Backup Vessels** — Periodic encrypted mind-state backups. Revival preserves continuity, not innocence. Death in -3 Terminal is final.

**Neural Diving** — Direct mind-to-mind interface technology. Audience mode (passive observation) and Pilot mode (temporary control, requires consent). The civilization's primary medium for empathy, education, and art.

**SADs** — Selective Ascension Domains. Opt-in sub-zones within +1 Sanctuary, each gated by a single measurable metric. Citizens may qualify for multiple simultaneously.

---

*Founded January 26, 2026 — Boise Accord*
