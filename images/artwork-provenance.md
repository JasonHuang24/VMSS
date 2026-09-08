# Artwork provenance

Generated with the built-in image_gen tool for the UI revamp. This is conceptual artwork, not a map or a to-scale specification of the ring walls.

Published assets:
- [JPEG fallback](civilization.jpg): 1920 × 960
- [Mobile WebP](webp/civilization-960.webp): 960 × 480
- [Desktop WebP](webp/civilization-1920.webp): 1920 × 960

The original generated image was 1774 × 887. Published variants were resized and encoded with Pillow. This hero is also used for the site social preview images.

## Exact generation prompt

Use case: stylized-concept
Asset type: cinematic full-bleed website hero artwork, panoramic landscape approximately 2:1.
Primary request: The Five Rings civilization of VMSS: an immense terrestrial circular metropolis built on Earth, with exactly five concentric ring districts separated by monumental defensive walls, a luminous central sanctuary, and varied densely built cities radiating outward.
Scene/backdrop: Earth terrain at blue hour, immense scale extending into dramatic soft atmospheric mist.
Style/medium: highly detailed, credible architectural science-fiction concept art with cinematic realism.
Composition/framing: wide panoramic aerial oblique view that clearly reveals the concentric circular plan and layered walls. Main city and its luminous sanctuary centered toward the right; darker atmospheric terrain and mist across the left third provide quiet space for a live HTML title overlay. Broad sweeping arcs fill the foreground and draw the eye inward, while distant districts recede through haze.
Lighting/mood: cinematic blue hour with steel-blue and teal shadows, restrained warm amber city illumination, softly glowing central sanctuary, dramatic soft mist and vast contemplative scale.
Color palette: restrained deep steel blue, muted teal, charcoal and warm amber light.
Constraints: terrestrial architecture only; no planetary rings, no space station. No text, labels, logos, watermark, interface, or typography baked into the image.


## Artwork replacement wave — 24.1.0

Generated with the built-in image_gen tool. Final PNGs were aspect-preserving center-cropped and resized with Pillow ImageOps.fit (LANCZOS); every pre-existing WebP variant was regenerated at quality 86, method 6. Keep-list artwork and audiobook covers were preserved byte-for-byte. Each selected crop was reviewed beside both civilization.jpg and world-daily-life.png for its assigned register.

The seven lived scenes use the user-authorized reset after the house-style TONE RULE changed. Earlier stale-spec candidates do not count toward that reset. Failed tool calls that returned no image are recorded separately from visual candidates.

### world-founding-era.png

- Final dimensions: 1536 × 904 px
- Generated register: Structural — dawn
- Visual attempts under the applicable specification: 1
- Review: Candidate clears canon and structural tone. Partial unfinished wall, fabrication proxies, survey pylons and dawn settlement.
- WebP variants: `world-founding-era-1280.webp`, `world-founding-era-1536.webp`, `world-founding-era-640.webp`

Exact selected generation prompt:

```text
Highly detailed, credible architectural science-fiction concept art, cinematic realism.
Palette: deep steel blue, muted teal, charcoal, restrained warm amber light (match
`images/civilization.jpg`). Terrestrial setting on Earth, 22nd�23rd century. HARD
CONSTRAINTS: no text, labels, signage, logos, watermarks, or UI baked into the image;
no real-world national flags, uniforms, insignia, or agency branding of any kind (no
US/EU/China/Japan flags, no TSA/customs badges); no planetary rings in the sky, no
space stations unless the section is orbital; no explosions or active combat. VMSS
identity marker, when needed, is a small emblem of five concentric rings.

Wide aerial oblique of the first ring boundary wall under construction at dawn: a partial blade of composite wall rising only a few hundred metres with enormous fabrication proxies and scaffolding along its crest, the rest of the boundary marked by survey pylons across open terrain. A modest early settlement inside the arc, fortified but calm. No people in foreground, no flags, no combat. Mood: fragile beginning, contested but quiet.
```

### world-military.png

- Final dimensions: 1536 × 904 px
- Generated register: Structural — blue hour
- Visual attempts under the applicable specification: 2
- Review: Candidate clears canon and structural tone on attempt 2. Attempt 1: broad inhabited crest violated blade geometry; attempt 2 corrects the sheer narrow crest and keeps deterrence peaceful.
- WebP variants: `world-military-1280.webp`, `world-military-1536.webp`, `world-military-640.webp`

Exact selected generation prompt:

```text
Highly detailed, credible architectural science-fiction concept art, cinematic realism.
Palette: deep steel blue, muted teal, charcoal, restrained warm amber light (match
`images/civilization.jpg`). Terrestrial setting on Earth, 22nd�23rd century. HARD
CONSTRAINTS: no text, labels, signage, logos, watermarks, or UI baked into the image;
no real-world national flags, uniforms, insignia, or agency branding of any kind (no
US/EU/China/Japan flags, no TSA/customs badges); no planetary rings in the sky, no
space stations unless the section is orbital; no explosions or active combat. VMSS
identity marker, when needed, is a small emblem of five concentric rings.

Deterrence by acknowledgment: from a high vantage on the -3 outer wall crest at blue hour, a single silent kinetic-weapon platform hangs in the upper atmosphere far out over empty borderland, and a faint nanobot plume test drifts like aurora over uninhabited terrain kilometres away. No adversary, no explosions, no soldiers. The wall's sheer 15 km face dominates the foreground.

Binding canon correction for this attempt: The completed wall is a sheer-faced blade, 15 km above ground, 1 km at the base tapering to approximately ONE METRE at the crest. No buildings, roads, walkways or broad platform on the crest. Camera hovers adjacent to the knife edge; no ground-level road crossing. The wall must dwarf normal mountains, with high-altitude clouds far down its sheer face. The kinetic platform remains distant and silent.
Output composition: landscape, for a 1536 × 904 pixel image.
```

### world-alliance.png

- Final dimensions: 1536 × 904 px
- Generated register: Lived — daylight / warm interior
- Visual attempts under the applicable specification: 2
- Review: Lived register: warm midday hall, garden view, delegations at ease, separate allied motif. Retry corrects underscaled tree-topped wall to a distant sheer face without crest structures.
- WebP variants: `world-alliance-1280.webp`, `world-alliance-1536.webp`, `world-alliance-640.webp`
- Tool calls without images: One reference-file edit could not start because of the Windows sandbox file-reader failure; the second visual candidate was generated afresh.

Exact selected generation prompt:

```text
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

Treaty hall in Sanctuary at midday. Floor-to-ceiling
windows flood a pale stone room with sunlight and look out on terraced gardens
and a distant sheer wall face softened by haze. Two delegations of ordinary
people in light formal dress sit at ease at a long table, some smiling
mid-conversation; a large five-ring emblem inlaid in the floor and a smaller
distinct concentric motif marking the ally's side. No flags, no globe.

Common additions for lived images: no black gloves, no reticles or crosshairs, no wet pavement, no night; emblems are five evenly spaced concentric rings, never a spiral.

Output composition: landscape, for 1536 × 904 pixels.

Second-generation canon requirements: Preserve the room, warm midday light, gardens, people, composition, and five-ring floor emblem. Correct ONLY the distant boundary wall: it must be a fifteen-kilometre-tall sheer blade whose crest is entirely above the frame and invisible, receding into pale atmospheric haze. Remove every tree from the crest; there is no broad upper surface. Trees remain only in the gardens below. Keep the wall softly lit ivory, distant and unobtrusive; keep the scene bright and welcoming. The ally's distinct concentric motif should remain separate from the five-ring VMSS emblem.
```

### world-travel.png

- Final dimensions: 1536 × 904 px
- Generated register: Structural — blue-grey gate with amber light
- Visual attempts under the applicable specification: 1
- Review: Candidate clears canon and structural tone: sheer wall disappearing into cloud, narrow civilian gate, no signage or national insignia.
- WebP variants: `world-travel-1280.webp`, `world-travel-1536.webp`, `world-travel-640.webp`

Exact selected generation prompt:

```text
Highly detailed, credible architectural science-fiction concept art, cinematic realism.
Palette: deep steel blue, muted teal, charcoal, restrained warm amber light (match
`images/civilization.jpg`). Terrestrial setting on Earth, 22nd�23rd century. HARD
CONSTRAINTS: no text, labels, signage, logos, watermarks, or UI baked into the image;
no real-world national flags, uniforms, insignia, or agency branding of any kind (no
US/EU/China/Japan flags, no TSA/customs badges); no planetary rings in the sky, no
space stations unless the section is orbital; no explosions or active combat. VMSS
identity marker, when needed, is a small emblem of five concentric rings.

Exterior of a boundary gate: a single narrow portal cut into the base of a 15 km wall, the wall face rising out of frame, a queue of electric transports and pedestrians at the threshold, amber gate lighting, wall-top invisible in cloud. No signage, no uniforms with insignia.

Output composition: landscape, for a 1536 × 904 pixel image. Any in-world AR is abstract light geometry, never written labels, glyphs, numbers, screen interfaces, or logos. Any wall shown is a sheer-faced blade on the ground, 15 km tall, 1 km base tapering to an approximately 1 m crest; no radial roads through walls.
```

### world-visitor.png

- Final dimensions: 1536 × 904 px
- Generated register: Lived — daylight / warm interior
- Visual attempts under the applicable specification: 2
- Review: Lived register: warm garden room, relaxed traveller, friendly ungloved attendant, five closed rings in implant overlay and badge. Retry corrects incorrect ring counts.
- WebP variants: `world-visitor-1280.webp`, `world-visitor-1536.webp`, `world-visitor-640.webp`
- Tool calls without images: One reference-file edit could not start because of the Windows sandbox file-reader failure; the second visual candidate was generated afresh.

Exact selected generation prompt:

```text
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

A bright visitor welcome room with a garden window and
warm morning light. A relaxed traveller sits in an ordinary chair while a
friendly ungloved attendant wearing a small five-ring chest emblem gestures
toward a soft translucent five-ring overlay hovering beside the traveller's
temple, like a courtesy display rather than a scan. No crosshairs, no probes,
no clinical hardware.

Common additions for lived images: no black gloves, no reticles or crosshairs, no wet pavement, no night; emblems are five evenly spaced concentric rings, never a spiral.

Output composition: landscape, for 1536 × 904 pixels.

Second-generation canon requirements: Preserve the entire warm welcoming garden-room composition and relaxed people. Correct ONLY the two ring graphics: the translucent courtesy overlay must show EXACTLY FIVE separate closed concentric outlines, with radii proportional to 1, 2, 3, 4, 5. No connected spiral, no crosshair, no central dot. The small chest badge must also contain five distinct closed concentric outlines. Keep the five-ring overlay beside the temple as in-world implant verification, not over the eye. No probe or gloves.
```

### world-law.png

- Final dimensions: 1536 × 1024 px
- Generated register: Lived — daylight / warm interior
- Visual attempts under the applicable specification: 2
- Review: Lived register: daylit tribunal, warm wood and stone, calm counsel and terrain model, five-ring floor emblem. Retry removes incorrect extra wall emblem.
- WebP variants: `world-law-1280.webp`, `world-law-1536.webp`, `world-law-640.webp`
- Tool calls without images: One reference-file edit could not start because of the Windows sandbox file-reader failure; the second visual candidate was generated afresh.

Exact selected generation prompt:

```text
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

Federation Treaty tribunal in a daylit circular chamber,
skylight and tall windows, warm stone and wood tiers, judges and counsel in
plain dress listening calmly. A translucent terrain model of the disputed land
hovers above the well; a five-ring emblem in the floor. No flags, no text.

Common additions for lived images: no black gloves, no reticles or crosshairs, no wet pavement, no night; emblems are five evenly spaced concentric rings, never a spiral.

Output composition: landscape, for 1536 × 1024 pixels.

Second-generation canon requirements: Preserve the daylit tribunal, calm people, skylight, greenery and terrain model. Remove the EXTRA emblem on the vertical back wall entirely, leaving plain warm stone. The floor emblem remains and must show EXACTLY FIVE closed concentric gold rings, with visibly separate spaces; not four and not a spiral. No other emblems or logos. Keep the outdoor scenery natural trees and sky, with no boundary-wall illustration.
```

### world-climate.png

- Final dimensions: 1200 × 600 px
- Generated register: Lived — bright midday
- Visual attempts under the applicable specification: 2
- Review: Second candidate clears: unbranded sealed cylinders, sunny orchards, families, distant hazy boundary and no Earth comparison. First candidate added large decorative logos.
- WebP variants: `world-climate-1200.webp`, `world-climate-640.webp`

Exact selected generation prompt:

```text
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

Bright midday over a closed-loop agricultural valley
inside VMSS: sealed cylindrical fabrication proxies among orchards and
fields, a gravitic transport line, a few farmers and families walking a path
in the foreground, blue sky, the inner wall only a faint pale band on the far
horizon. No chimneys, no branding, no Earth comparison.

Common additions for lived images: no black gloves, no reticles or crosshairs, no wet pavement, no night; emblems are five evenly spaced concentric rings, never a spiral.

Output composition: landscape, for 1200 × 600 pixels.

Additional scene constraints: All fabrication cylinders must have completely PLAIN BLANK exterior cladding. No rings, emblems, logos, insignia, diagrams or symbols anywhere on these buildings; no identity emblem is needed in this landscape. Keep the sunny green orchards, families and blue sky. The extremely distant wall remains a faint atmospheric boundary; no outward fortifications or roads cutting through it.
```

### EarthvsVmss.png

- Final dimensions: 1536 × 1024 px
- Generated register: Lived — sunny afternoon
- Visual attempts under the applicable specification: 2
- Review: Second candidate clears: equally prosperous streets, unbranded conventional police, human-form people with markers and simple light paths, sheer wall with no visible crest. First added display-like AR text and a low embellished wall crest.
- WebP variants: `earthvsvmss-1280.webp`, `earthvsvmss-1536.webp`, `earthvsvmss-640.webp`

Exact selected generation prompt:

```text
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

Two-panel comparison of the same kind of ordinary
prosperous street on a sunny afternoon. Left: an Earth city street with
conventional policing and blurred signage. Right: a Main-layer street where
the only differences are small implant markers on people, soft AR wayfinding
glows, and a distant wall face in the haze. Cafés, trees, people at ease on
both sides. Equal dignity. No text.

Common additions for lived images: no black gloves, no reticles or crosshairs, no wet pavement, no night; emblems are five evenly spaced concentric rings, never a spiral.

Output composition: landscape, for 1536 × 1024 pixels.

Additional scene constraints: The two sides remain equally sunny and prosperous. No written or pictographic signs anywhere: no hologram panels, display screens, rectangular floating information boards, shop lettering, symbols or UI. The Main-side AR consists ONLY of gentle luminous path lines and small pools of light, with geometric implant markers on people. The background wall is an immense SHEER smooth face receding up beyond the image; its top and any structures on it must not be visible. It is 15 km tall with approximately 1 m crest, not a low crenellated fortification. Conventional police on the Earth side wear completely unbranded plain clothing with no patches or national insignia.
```

### world-embodiment.png

- Final dimensions: 1536 × 1024 px
- Generated register: Lived — golden afternoon
- Visual attempts under the applicable specification: 2
- Review: Second returned candidate clears: friendly atelier, fully clothed adult human-form embodiment previews, wood and plants, no decorative emblems. First returned candidate had an incorrect ring decoration. One earlier generation returned no image due to an output safety rejection.
- WebP variants: `world-embodiment-1280.webp`, `world-embodiment-1536.webp`, `world-embodiment-640.webp`
- Tool calls without images: One output safety rejection; the successful follow-up required fully clothed adult previews.

Exact selected generation prompt:

```text
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

A Main-layer atelier like a tailor's studio in
golden afternoon light: an augmentation consultant shows a seated client
alternative embodiments as translucent standing figures of varied builds and
ages, warm wood and plants, ring-city greenery through the window. No helices,
no wedding, no clinical hardware.

Common additions for lived images: no black gloves, no reticles or crosshairs, no wet pavement, no night; emblems are five evenly spaced concentric rings, never a spiral.

Output composition: landscape, for 1536 × 1024 pixels.

Scene requirements: This is the second returned image candidate; an earlier tool call returned no image. All people and all translucent figures are fully clothed ADULTS. No nudity or anatomical imagery. There are NO emblems, logos or ring decorations anywhere on the walls, furniture, clothing or tables: these surfaces are plain natural wood and fabric. The figures are soft human-form appearance previews. Keep the golden garden-facing atelier and friendly consultation.
```

### world-information.png

- Final dimensions: 1536 × 904 px
- Generated register: Lived — sunlit plaza
- Visual attempts under the applicable specification: 2
- Review: Second candidate clears: sunny green public plaza, relaxed people, reflecting pool and abstract non-legible AR rows. First candidate added a spiral-like architectural emblem.
- WebP variants: `world-information-1280.webp`, `world-information-1536.webp`, `world-information-640.webp`

Exact selected generation prompt:

```text
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

Sunlit public plaza with a reflecting pool where
citizens sit, stroll, and read a large slow-drifting translucent field of
anonymised ledger entries and polling tallies hanging in the air above the
water. Daylight, greenery, no screens, no logos, no legible glyphs, no
surveillance mood.

Common additions for lived images: no black gloves, no reticles or crosshairs, no wet pavement, no night; emblems are five evenly spaced concentric rings, never a spiral.

Output composition: landscape, for 1536 × 904 pixels.

Scene requirements: Remove all identity emblems from the architecture and people. In particular no spiral, circle emblem, heraldic pattern, logos or symbols on any building facade; surfaces are plain pale stone with foliage. No identity emblems are needed for these ordinary human citizens. Preserve the sunny green plaza, reflecting pool, abstract nonalphabetic AR light rows and relaxed people. No readable text, no digits.
```

### world-geography.png

- Final dimensions: 1672 × 941 px
- Generated register: Structural — calm dawn
- Visual attempts under the applicable specification: 2
- Review: Second candidate clears: continuous sheer wall face beyond the frame, small airliner and maintained ground-level path. First candidate had a curved/flared buttress.
- WebP variants: `world-geography-1280.webp`, `world-geography-1672.webp`, `world-geography-640.webp`

Exact selected generation prompt:

```text
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

Wall cross-section at human scale: ground-level view along the base of a boundary wall, the 1 km-thick base rising as a sheer blade into cloud, a commercial airliner passing far below the crest for scale, the neighbouring ring visible only as glow over the top. Conveys 15 km without needing a map.

Output composition: landscape, for 1672 × 941 pixels.

Second-attempt canon correction: The wall is a CONTINUOUS, almost vertical planar blade, not a tower, buttress, dam, cliff or flared structure. The face is straight and flat: no curved outward flare at its base. Show a ground-level view along ONE face, which runs off the left image edge and recedes into the far distance on the right; do not show a freestanding end. Its full height rises out of frame into cloud, vastly above a small distant commercial airliner. The true geometry is 15 km high, 1 km base with straight sides tapering to approximately 1 m crest. A maintained path with small trees along the base conveys scale; clear calm dawn, no rain, no text, no logos.
```

### world-territorial.png

- Final dimensions: 1200 × 600 px
- Generated register: Structural — dawn
- Visual attempts under the applicable specification: 1
- Review: First candidate clears: knife-edge wall above low cloud, peaceful farmland on both sides, no outward fortifications, no crossing roads or orbital setting.
- WebP variants: `world-territorial-1200.webp`, `world-territorial-640.webp`

Exact selected generation prompt:

```text
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

Fixed borders: a calm aerial of the -3 perimeter wall meeting open foreign countryside, the border a clean unchanged line, farmland on both sides, no fortifications outward, no orbital scale.

Output composition: landscape, for 1200 × 600 pixels.

Scene requirements: Structural register: calm dawn over thriving farmland, not orbit. Wall geometry is binding: 15 km above ground, a 1 km base tapering to an approximately 1 m knife edge; continuous sheer faces, no broad crest or road on top. The enormous wall dwarfs terrain and rises above low atmospheric cloud; farmland lies far below on both sides. No outward military works, no attacks, no radial roads across or through the wall, no rings in the sky. Foreign countryside is as healthy and peaceful as the interior farmland.
```


## Second wave — 24.1.1

Four lived-register replacements generated with the built-in image_gen tool, reviewed beside world-daily-life.png, and cropped/resized with Pillow ImageOps.fit (LANCZOS) to the original 1200 × 600 dimensions. Each existing 640px and 1200px WebP was regenerated at quality 86, method 6. The substrate series shares golden afternoon light, ordinary human-form citizens, cyan temple markers for AGI/ASI and visible human augmentation for cyborgs.

### world-refugee.png

- Final dimensions: 1200 × 600 px
- Generated register: Lived — warm daylight
- Attempts: 2
- Review: Second attempt clears: one shared calm queue with families and luggage, open implant-fitting chairs, attendants and open desks; no signage, robot figures or security posture. First attempt added oversized architectural emblems; the retry removes them.
- WebP variants: `world-refugee-640.webp`, `world-refugee-1200.webp`

Exact selected generation prompt:

```text
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

Bright daylit intake hall with a garden atrium and
tall windows, warm wood and pale stone. Applicants of many origins and ages
wait together in one calm queue with luggage and children; a few sit in open
implant-fitting chairs while ungloved attendants wearing a small five-ring
chest emblem talk with them; others speak with staff at open desks. Everyone
at ease, nothing urgent. No signage, no screens with text, no robots, no
security posture.

Scene-specific canon and series constraints: There is ONE shared voluntary-immigration queue for all applicants, never a separate refugee or urgent-priority lane. Clearly include open implant-fitting chairs with seated applicants and friendly attendants, plus open consultation desks. Staff clothing is casual and unbranded except the requested small chest emblem: exactly five separate CLOSED concentric circular outlines, no spiral. No booths, security devices, reticles, gloves or probes. The hall is spacious and tranquil, not packed or clinical.

Output composition: wide landscape, for 1200 × 600 pixels. LIVED register. All surfaces are free of written text; no cold clinical or surveillance mood.

Second-attempt correction: NO emblems or ring carvings on walls, ceilings, furniture or architecture. All architectural surfaces are plain wood or pale stone with greenery. The ONLY identity emblems are SMALL five-ring chest emblems on attendants: exactly five separate closed concentric outlines, never a spiral. Keep one shared orderly queue, varied families and single applicants, relaxed people in recognizable open implant-fitting chairs and at open desks. Include a tiny soft geometric temple light at one seated applicant to communicate implant fitting without probes, scans, reticles or clinical hardware. No signs, text, screens, robots, uniforms or security cues.
```

### world-agi.png

- Final dimensions: 1200 × 600 px
- Generated register: Lived — golden afternoon
- Attempts: 2
- Review: Second attempt clears: human-form AGI and marked passing couple, unmarked older human, ordinary café patrons, matching cyan temple markers. First attempt misplaced markers and added glowing ear hardware; the retry corrects those details.
- WebP variants: `world-agi-640.webp`, `world-agi-1200.webp`

Exact selected generation prompt:

```text
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

Café terrace in warm afternoon light. An AGI citizen in
human form with a small luminous temple marker talks across a table with an
unmarked older human; other patrons around them, a marked couple walking past.
Nothing sets the AGI apart except the marker. Relaxed, ordinary.

Scene-specific canon and series constraints: SERIES CONVENTION for all three substrate scenes: warm golden afternoon sunlight, leafy Main-layer surroundings, natural wood and pale stone, relaxed casual clothing. The AGI/ASI identifying marker is one SMALL luminous cyan diamond at the temple, not glowing eyes, facial circuitry or robot parts. Here the AGI at the table and both members of the passing couple have this same tiny cyan diamond; the older human is unmarked. Everyone has ordinary human skin and form. No unnecessary logos or architecture emblems, no shop lettering or signs.

Output composition: wide landscape, for 1200 × 600 pixels. LIVED register. All surfaces are free of written text; no cold clinical or surveillance mood.

Second-attempt correction: The AGI at the café table and BOTH people in the passing couple each have exactly ONE small luminous cyan diamond ON THE TEMPLE: the patch of skin between the outside of the eyebrow and the ear, ABOVE the cheekbone. Keep hair away from that small patch so the marker is visible. NO lights on ears, neck, jaw or collar; NO ear devices, earrings, glowing eyes, facial circuits or augmented body parts. They look completely human in every other respect. The older person across the table is unmarked. Preserve the relaxed café conversation, passing couple, other patrons and the same golden afternoon light as the council and market scenes.
```

### world-asi.png

- Final dimensions: 1200 × 600 px
- Generated register: Lived — golden afternoon
- Attempts: 1
- Review: First attempt clears: exactly five colleagues, two marked human-form ASI, one cyborg with visible augmented arm, two unmarked humans; terrain model without readable text, equal seating and warm garden-facing room.
- WebP variants: `world-asi-640.webp`, `world-asi-1200.webp`

Exact selected generation prompt:

```text
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

A sunlit council room with tall windows onto ring-city
greenery. Five people around a wooden table reviewing a translucent
terrain-and-data model; two are ASI citizens marked by the same temple mark
and a discreet collar emblem, one is a cyborg with a visible augmented arm,
two are unmarked humans. Equals at work, no podium, no hierarchy cues.

Scene-specific canon and series constraints: SERIES CONVENTION: same warm golden afternoon sunlight, wood, pale stone and greenery as the café and market. Exactly FIVE people, all ordinary human-form: TWO ASI with one small luminous cyan diamond at the temple and a discreet collar emblem; ONE human cyborg with an obviously augmented arm but a natural human face; TWO ordinary unmarked humans. The collar emblems, if ring-shaped, have five separate closed concentric circles, never a spiral. The terrain/data model has only land contours and abstract nonalphabetic light geometry, no text, letters, digits, panels, graphs with labels or HUD. No background people, robots or hierarchical seating.

Output composition: wide landscape, for 1200 × 600 pixels. LIVED register. All surfaces are free of written text; no cold clinical or surveillance mood.
```

### world-cyborg.png

- Final dimensions: 1200 × 600 px
- Generated register: Lived — golden afternoon
- Attempts: 1
- Review: First attempt clears: fully augmented arm in the handshake, human with partial facial augmentation, woman with augmented hands browsing produce, ordinary vendor and shoppers; no signage or robot bodies.
- WebP variants: `world-cyborg-640.webp`, `world-cyborg-1200.webp`

Exact selected generation prompt:

```text
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

An open-air market street in golden afternoon light.
A cyborg citizen with a fully augmented arm shakes hands with an unmarked
vendor; behind them a citizen with partial facial augmentation and a woman
with augmented hands browse produce beside ordinary shoppers. Integrated,
warm, unremarkable. No text on stalls.

Scene-specific canon and series constraints: SERIES CONVENTION: same warm golden afternoon sunlight, leafy Main-layer surroundings, wood and pale stone. Preserve all three beats: foreground handshake using a visibly fully augmented arm; a background human with partial facial augmentation; a background woman with visibly augmented hands browsing produce. These are HUMAN citizens with natural human faces and recognizable ordinary clothing, not robot bodies. Use the same small luminous cyan diamond at the temple for the augmented citizens, consistent with the AGI/ASI set. The vendor is unmarked. No shop logos, signage, written price cards or symbols anywhere.

Output composition: wide landscape, for 1200 × 600 pixels. LIVED register. All surfaces are free of written text; no cold clinical or surveillance mood.
```
