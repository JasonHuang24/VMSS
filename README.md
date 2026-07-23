# The Five Rings â€” VMSS Civilization (Full Site)

A voluntary civilization framework built on moral causality, layered governance, continuity, and consequence.

**Version:** 23.3.0
**Live site:** https://jasonhchronicles.com/VMSS/
**Lite site:** https://jasonhuang24.github.io/VMSSLite/
**Whitepaper:** https://jasonhchronicles.com/VMSS/whitepaper.html

---

## About

The Five Rings is a proposed civilization model organized around five concentric governance rings (+1 to -3). Citizens are placed in rings based on demonstrated behavior â€” not birth, wealth, or ideology. The system combines technoneural enforcement, a Social Trust Index, automation-funded UBI, backup vessel continuity, and consequence-bound freedom into a single coherent architecture.

This is the **full site** â€” the complete doctrine portal with interactive tools, detailed layer dossiers with narrative simulations, STI console, current-state technology annotations, a 34-section paginated whitepaper, a 28-article Charter, a filterable simulations archive, a rubric-graded Academy course packet, and an Academic Resources reference library.

A **lite version** of the site exists at the companion repository (VMSSLite) for readers who want the full doctrine in a faster, more focused reading experience.

---

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Homepage â€” ring diagram, justice flow, layer overview, lite site callout |
| `layers.html` | Interactive Five Rings map with live layer detail panel |
| `layer-+1.html` | +1 Sanctuary â€” pre-intervention, SADs, Heaven Ring, narrative simulation |
| `layer-0.html` | Main Layer (0) â€” the proving ground, default entry, narrative simulation |
| `layer--1.html` | -1 Noncompliance â€” The Balanced Layer, narrative simulation |
| `layer--2.html` | -2 Violent Offense â€” The Lower Restrictions Layer, narrative simulation |
| `layer--3.html` | -3 Terminal â€” The Freedom Layer, narrative simulation |
| `systems.html` | Economy, enforcement architecture, savings circulation mandate |
| `technologies.html` | Implants, neural diving, backup vessels, augmentation â€” with current-state delivery annotations |
| `sads.html` | Selective Ascension Domains â€” opt-in metric-gated domains within +1 |
| `simulations.html` | Consolidated simulations archive â€” all World Scenario and Resident Story cards on one page with search, category, and doctrine-snapshot filters; plus Academy and Academic Resources coursework links |
| `simulations-world.html`, `simulations-residents.html` | Redirect stubs â€” `noindex`, hash-preserving redirect to `simulations.html` (the two dossiers were merged into the consolidated archive) |
| `simulations-academy.html` | The Academy dossier â€” 33 rubric-graded doctrine questions, Standard Format and Full Rubric, course packet PDF |
| `simulations-resources.html` | Academic Resources dossier â€” 33 textbook excerpts across World of VMSS, Universe of VMSS, and VMSS Advanced categories |
| `why-vmss.html` | The case for the civilization model |
| `world.html` | The World of VMSS â€” international law, founding era, geopolitical context, entertainment, daily life |
| `whitepaper.html` | 34-section paginated whitepaper with TOC, page jump, and expanded glossary |
| `charter.html` | Founding constitutional document â€” all 28 articles |
| `laws.html` | VMSS Laws â€” the consolidated code: current-force law at all four tiers (Charter index, federal law, layer-wide and district regulation), every provision cited to its enacting instrument |
| `law-polling.html` | Law polling record â€” Charter amendments, federal laws, and regulatory petitions with vote breakdowns, drafters, and canon anchors |
| `faq.html` | Extended FAQ with edge cases |
| `roadmap.html` | Scroll-driven seven-phase roadmap â€” pinned scenes, persistent year + leakage-gradient rail, 2026 Founding Treaty to 3000 |
| `audiobook.html` | The Five Rings audiobook series â€” free v8.5 introduction, v11 trilogy (Vols. 1â€“3), and v11 standalone volumes (Vols. 4â€“5). All available on ElevenReader |
| `join.html` | Voluntary entry process and application form |

---

## Stack

- HTML Â· CSS Â· Vanilla JavaScript
- Tailwind CSS (CDN)
- Font Awesome (CDN)
- Supabase (join form backend)
- Headless Chrome (PDF generation for Academy course packet and Academic Resources)
- Hosted on GitHub Pages

---

## Structure

```
/
â”œâ”€â”€ index.html
â”œâ”€â”€ layers.html
â”œâ”€â”€ layer-+1.html  layer-0.html  layer--1.html  layer--2.html  layer--3.html
â”œâ”€â”€ systems.html
â”œâ”€â”€ technologies.html
â”œâ”€â”€ sads.html
â”œâ”€â”€ simulations.html
â”œâ”€â”€ simulations-world.html  simulations-residents.html   # redirect stubs â†’ simulations.html
â”œâ”€â”€ simulations-academy.html  simulations-resources.html
â”œâ”€â”€ why-vmss.html
â”œâ”€â”€ world.html
â”œâ”€â”€ whitepaper.html
â”œâ”€â”€ charter.html
â”œâ”€â”€ laws.html
â”œâ”€â”€ faq.html
â”œâ”€â”€ roadmap.html
â”œâ”€â”€ audiobook.html
â”œâ”€â”€ join.html
â”œâ”€â”€ 404.html
â”œâ”€â”€ navbar.html          # Shared nav, loaded dynamically
â”œâ”€â”€ footer.html          # Shared footer, loaded dynamically
â”œâ”€â”€ script.js            # Global state engine, theme, mobile menu, modals
â”œâ”€â”€ styles.css           # Full design system
â”œâ”€â”€ assets/
â”‚   â””â”€â”€ js/
â”‚       â”œâ”€â”€ diagrams.js     # Interactive SVG ring diagram
â”‚       â”œâ”€â”€ sti-sim.js      # STI simulation console
â”‚       â””â”€â”€ card-filter.js  # Shared search/chip/select filter (simulations, faq, why-vmss)
â”œâ”€â”€ documents/
â”‚   â”œâ”€â”€ design-principles.md         # The reasoning patterns behind the doctrine (companion to whitepaper Â§12, Â§28.0; Charter XI)
â”‚   â”œâ”€â”€ academy-source.html          # Source for the Academy course packet PDF
â”‚   â”œâ”€â”€ resources-source.html        # Source for the Academic Resources PDF
â”‚   â”œâ”€â”€ vmss-academy-course-packet.pdf
â”‚   â””â”€â”€ vmss-academic-resources.pdf
â”œâ”€â”€ images/
â”‚   â”œâ”€â”€ emblem.jpg
â”‚   â”œâ”€â”€ hero-rings.png       # Homepage hero
â”‚   â”œâ”€â”€ world-*.png          # World page imagery (geography, military, alliance, etc.)
â”‚   â””â”€â”€ Audiobook/           # Audiobook cover art (free intro + 5 volumes)
â”œâ”€â”€ sitemap.xml
â””â”€â”€ robots.txt
```

---

## Key Concepts

**VMSS** â€” Vertical Moral Stratification System. Behavioral stratification replaces incarceration. Layer placement is a permanent environmental consequence of demonstrated conduct, not a time sentence.

**STI** â€” Social Trust Index. A separate ledger for non-criminal trust violations. Covers harms that fall below legal thresholds â€” fraud, chronic deception, harassment â€” and makes them socially legible without criminalizing them. Operates on two distinct tracks: social trust violations (STI) and hard behavioral flags (criminal record log). Juvenile residents carry null STI until age 18, at which point the full ledger of observed conduct initializes the first score.

**Backup Vessels** â€” Periodic encrypted mind-state backups linked to each citizen's implant. Fabrication is sovereign VMSS technology. Revival is binary: full fidelity or failure. In -1 and -2, continuity is serviced through VMSS-operated fabrication proxy installations. In -3 Terminal, the implant severs the backup vessel link at the hardware level â€” death is final. Fetuses are linked to their own backup vessels via the mother's implant until they have an implant of their own.

**Neural Diving** â€” Direct mind-to-mind interface technology. Audience mode (passive observation) and Pilot mode (temporary control, requires consent). The civilization's primary medium for empathy, education, and art.

**SADs** â€” Selective Ascension Domains. Opt-in metric-gated domains within +1 Sanctuary, each filtered by a single measurable criterion. Citizens may qualify for multiple simultaneously.

**MGDs** â€” Metric-Gated Domains. Layer-agnostic private domains with leakage-tolerant membership criteria. Distinct from SADs by both scope (private, not state-chartered) and leakage posture.

**Governance** â€” Three-body structure. The **Meritboard** is the civilization's continuously updating competence ranking, with separate sub-rankings for the distinct competencies each role requires. The **President** is drawn from the top of the executive-doctrinal-leadership ranking. **Supreme Court** justices (10) are drawn from the top of the legal-interpretation ranking. Structural independence between executive and judicial branches comes from metric separation within the Meritboard, not pool separation. No elections. Competence is measured, not campaigned for.

**Founding Core** â€” Four founding lines inscribed in the Charter preamble by the Chief Architect. Not legally immutable â€” every clause is amendable through the Article XI gauntlet â€” but protected by structural improbability and by six hundred years of cultural anchoring. The Charter is how the civilization does the work. The four lines are what the civilization is for.

**External Force Doctrine** â€” Four imminence tiers governing VMSS's use of force beyond its borders, with a parallel three-tier sanctions architecture that operates beneath the force framework and transitions into the national defense track at its highest tier. Alliance reciprocity under the Federation Treaty operates on a separate track from sanctions â€” an attack on a treaty ally triggers Tier 4 response directly.

**Leakage** â€” The gap between stated consequence and actual consequence delivery. Starting reality: ~90%. Founding aspiration: 0%. Target by 3000: ~0.01%.

---

## Companion Repository

The **VMSSLite** repository contains a condensed version of the site â€” same doctrine, faster read. No interactive widgets, no current-state annotations, condensed pages, six archetypal simulations instead of the full archive. Ideal for first-time readers.

---

*Founded March 29, 2026 â€” Founding Treaty*
