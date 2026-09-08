# VMSS artwork replacement brief (for GPT Astra image generation)

Audit date: 2026-09-07, site v24.0.2. Every published artwork was viewed against the
canon text of the section it illustrates. Verdicts below. Filenames are fixed: deliver
each replacement under the SAME filename and dimensions so no HTML changes are needed;
the executor then regenerates the `images/webp/<name>-640.webp` / `-1280.webp` variants
with Pillow (same convention as `images/artwork-provenance.md`).

## House style (prefix every prompt with this)

Highly detailed, credible architectural science-fiction concept art, cinematic realism.
Terrestrial setting on Earth, 22nd–23rd century.

TONE RULE (overrides everything below): VMSS is a prosperous, voluntary, well-lit
civilization, not a dystopia. Most of the site's existing keep-list images are
daylight and warm (daily-life, entertainment, refugee, the substrate trio) and the
replacements must sit beside them without a mood break. Use TWO registers:
- Structural / civic scale (founding era, military, geography wall section,
  territorial, travel gate): blue hour or dawn, steel blue + teal + amber, matching
  `images/civilization.jpg`. Vast and calm, never grim, never ruined.
- Lived / institutional interiors (alliance hall, tribunal, visitor fitting,
  embodiment atelier, information plaza, climate valley, Earth-vs-VMSS street):
  full daylight or warm golden interior light, natural greenery, ordinary people
  at ease. Match the warmth of `world-daily-life.png`.
No scene should read as oppressive, surveilled, or post-apocalyptic. HARD
CONSTRAINTS: no text, labels, signage, logos, watermarks, or UI baked into the image;
no real-world national flags, uniforms, insignia, or agency branding of any kind (no
US/EU/China/Japan flags, no TSA/customs badges); no planetary rings in the sky, no
space stations unless the section is orbital; no explosions or active combat. VMSS
identity marker, when needed, is a small emblem of five concentric rings.

Canon facts that bind the artwork:
- Five concentric rings on one landmass. Sanctuary (+1) is the innermost band: small,
  dense, luminous. Main (0) is by far the widest band. -1, -2, -3 are progressively
  NARROWER outer bands; -3 is the outer perimeter.
- Every ring boundary is a mega-wall: 15 km above ground, 5 km below, 1 km base
  tapering to a ~1 m crest. Sheer-faced blades. Nothing crosses them at grade; no
  radial highways cutting through walls.
- Military posture is defensive and never expanded. Deterrents: nanobot plumes
  (external, biological), kinetic weapons, orbital fabrication stations. Deterrence
  works by acknowledgment, not by battle.
- Earth outside VMSS is a normal, ongoing set of sovereignties. It is not a slum, not a
  smog dystopia, not a foil. Do not caricature it.
- Visitors carry a visitor implant; verification is implant + AR, not passport booths.
- AGI/ASI/cyborg citizens are human-form with readily identifiable markers.

## Tier 1 — doctrinally wrong, replace first

| File | Section | What is wrong | Replacement prompt (after house style) |
|---|---|---|---|
| `world-founding-era.png` (1536×904) | 2. History | US flag, generic sci-fi soldiers, hover tanks. Canon: founding era had UNFINISHED walls, nascent implants, no plumes; the ally is a ring-gradient civilization, not a nation. | Wide aerial oblique of the first ring boundary wall under construction at dawn: a partial blade of composite wall rising only a few hundred metres with enormous fabrication proxies and scaffolding along its crest, the rest of the boundary marked by survey pylons across open terrain. A modest early settlement inside the arc, fortified but calm. No people in foreground, no flags, no combat. Mood: fragile beginning, contested but quiet. |
| `world-military.png` (1536×904) | 3. Military Posture | Battle scene with explosions, jets, a general. Canon: defensive, never fought from strength; deterrent is acknowledged capability. | Deterrence by acknowledgment: from a high vantage on the -3 outer wall crest at blue hour, a single silent kinetic-weapon platform hangs in the upper atmosphere far out over empty borderland, and a faint nanobot plume test drifts like aurora over uninhabited terrain kilometres away. No adversary, no explosions, no soldiers. The wall's sheer 15 km face dominates the foreground. |
| `world-alliance.png` (1536×904) | 4. Alliance & Diplomacy | Real US/EU/China/Japan flags; handshake cliché. | Treaty hall inside Sanctuary: two delegations at a long stone table under a five-ring emblem in the floor; the ally's emblem is a different concentric-ring motif. Delegates in unbranded formal dress, no national flags, no globe hologram. Tall windows flood the hall with midday light and show the inner ring's gardens. Mood: institutional, unhurried, welcoming. |
| `world-travel.png` (1536×904) | 5. International Travel | Airport signage, "TSA" badge, "BORDER CONTROL" text. | Exterior of a boundary gate: a single narrow portal cut into the base of a 15 km wall, the wall face rising out of frame, a queue of electric transports and pedestrians at the threshold, amber gate lighting, wall-top invisible in cloud. No signage, no uniforms with insignia. |
| `world-visitor.png` (1536×904) | 6. Foreign Citizens in VMSS | US flag, "CUSTOMS" signage, passport booth. Duplicates travel + refugee. | Close interior: a visitor implant fitting room, one traveller seated while an AR overlay of the five rings and a temporary-status marker resolves at their temple, a VMSS attendant with the small ring emblem, bright daylight through a garden window, the traveller relaxed. No text, no flags. |
| `world-law.png` (1536×1024) | 13. International Law | UN-style chamber full of real national flags and baked-in text "VMSS JUDICIAL BODY". | Federation Treaty tribunal: a circular chamber with tiered seating, no flags, a ring-emblem floor, and the disputed matter shown as an AR terrain model hovering above the well. Judges and counsel in plain dress. No text. |

## Tier 2 — Earth-strawman or tonal mismatch, replace second

| File | Section | What is wrong | Replacement prompt |
|---|---|---|---|
| `world-climate.png` (1200×600) | 15. Climate | Green VMSS vs smokestack Earth split; wall drawn as a low concrete barrier. Canon: VMSS is near-zero emission and does NOT intervene; Earth is not a foil. | Inside VMSS only: sealed automated fabrication proxies as clean cylindrical structures in a closed-loop agricultural valley, gravitic transport lines, no chimneys, the inner wall face far behind in haze. No Earth comparison at all. |
| `EarthvsVmss.png` (1536×1024) | 22. Earth vs. VMSS | Rainy dystopian Earth street vs garden utopia, with baked-in "EARTH / VMSS" text. Caricature. | Two-panel comparison of the SAME kind of ordinary street, both prosperous and lived-in: left an Earth city street with conventional policing and signage blurred out, right a Main-layer street where the only visible differences are implant markers, AR wayfinding glows, and a distant wall face. No text. Equal dignity on both sides. |
| `world-embodiment.png` (1536×1024) | 10. Culture & Embodiment | Wedding couple, DNA helices in the sky, Greek pavilions. Reads as a resort ad. | A Main-layer atelier where an augmentation consultant shows a client alternative embodiments as translucent standing figures, varied builds and ages, warm and unhurried like a tailor's studio, golden afternoon light, ring city greenery through the window. No helices, no wedding. |
| `world-information.png` (1536×904) | 9. Information | 2020s newsroom, "BREAKING NEWS", social-media icons. | Public ledger plaza: citizens in an open square reading a large slow-moving AR field of anonymised ledger entries and polling tallies that hangs in the air above a reflecting pool; no screens, no logos, no text glyphs legible. |

## Tier 3 — scale or composition, replace when convenient

| File | Section | What is wrong | Replacement prompt |
|---|---|---|---|
| `world-geography.png` (1672×941) | 1. Geography & Scale | Bands roughly equal width (canon: Main widest, outer bands narrower); a radial highway crosses every wall; also duplicates the page hero (`civilization.jpg`) immediately above it. | Wall cross-section at human scale: ground-level view along the base of a boundary wall, the 1 km-thick base rising as a sheer blade into cloud, a commercial airliner passing far below the crest for scale, the neighbouring ring visible only as glow over the top. Conveys 15 km without needing a map. |
| `world-territorial.png` (1200×600) | 19. Territorial Doctrine | Wall shown from orbit as a luminous curtain hundreds of km long; a ringed planet in the sky. | Fixed borders: a calm aerial of the -3 perimeter wall meeting open foreign countryside, the border a clean unchanged line, farmland on both sides, no fortifications outward, no orbital scale. |

## Keep as-is (good matches)

`civilization.jpg` (hero, and world.html hero), `world-daily-life.png` (also the home
feature; dragon companion, food synthesizer, AGI assistant all canon), `world-entertainment.png`
(neural diving arena), `world-refugee.png` (implant station intake), `world-orbital.png`,
`world-agi.png`, `world-asi.png`, `world-cyborg.png` (marker convention consistent).

## Code-only follow-ups (no generation needed)

- `hero-rings.png` is now used only as `og:image` / `twitter:image` on every page (150
  references). Repoint those meta tags to `images/civilization.jpg` so the social card
  matches the site, then delete `hero-rings.*` and its three webp variants.
- Audiobook cover `images/Audiobook/the-five-rings.jpg` (Version 8.5 era) shows a galaxy
  core and spacecraft, which contradicts the terrestrial constraint every newer cover
  respects. Product art, out of scope for the site, flagged only.
