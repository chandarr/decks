# Page 01 — Thesis map · "Neither end delivers value alone — the enabler is the middle"

> Inherits `GLOBAL-INSTRUCTIONS.md`. Light theme. Act I opener.
> Faithful port of the approved prototype: `reference/slide-01-thesis-map.html`. Match its geometry, copy, and tokens exactly. This same schematic becomes `locatorMap()` in `_shared.js`.

## Purpose

Put the entire thesis on screen as one legible schematic before a word is spoken — answer-first Minto. It sets the craft bar and becomes the recurring locator.

The one idea: *The value is in the integrating middle that bridges the model world and the embodiment world.*

## Layout

Full 1920×1080 light stage. Thin hairline rules top (y≈150) and bottom (y≈940). Top-left mono kicker; top-right slide number "01" with mono id-tag beneath; large Archivo title under the kicker. Centre: the bridge schematic — left anchorage cluster "THE MODEL WORLD" (slate, x≈360), right anchorage cluster "THE EMBODIMENT WORLD" (bronze, x≈1560), three ink cables spanning between the two hubs (≈x470→x1450 at y≈520), an ink keystone diamond at centre (960,520) = THE COMPOSER, "Superhuman" label above (y≈330) with a short ink tick down to the keystone, "Real-world application" below (y≈700) with a down-tick from the keystone. Bottom band: the punch line (Archivo) over the mono positioning line. Reproduce the prototype's coordinates.

## Steps (reveal order)

**0 — Base:** rules, kicker, title, slide-no, id-tag, and BOTH worlds present (clusters + labels + faint "many more" dots). Looks intentional — two worlds, an empty gap between them.
**1 — The bridge:** the three cables `drawPath` in (staggered, top→bottom), then the three capability labels fade — ADAPTATION / AUTONOMY / ASSURANCE.
**2 — The keystone:** the Composer diamond `scaleIn`; its label + sublabel fade; then "Superhuman" (above) and "Real-world application" (below) fade with their ticks.
**3 — The thesis:** the punch line rises, then the positioning line fades.

*(3 advance beats after base. Back reverses one at a time; R replays the whole build.)*

## Copy

- **Kicker:** `Physical AI · Strategy Thesis`
- **Title:** **Winning the Widening Middle**
- **Slide no / id-tag:** `01` · `Vendor-neutral · India-HQ · Global`
- **Left cluster:** `THE MODEL WORLD` — sub `frontier & open · commoditizing` — nodes: `Frontier LLMs`, `World models`, `VLAs`, `Open-weight`
- **Right cluster:** `THE EMBODIMENT WORLD` — sub `proliferating · many bodies` — nodes: `Humanoids`, `Arms & cobots`, `AMRs`, `Legged & drones`
- **Cables:** `Adaptation` · `Autonomy` · `Assurance`
- **Keystone:** `THE COMPOSER` — sub `requirement · budget · application → tailored stack`
- **Above / below:** `Superhuman` — sub *`the bonus that falls out`* · `Real-world application`
- **Punch:** **Neither end delivers value alone — the enabler is _the middle_.**
- **Positioning line (mono):** `the right model + the right embodiment + a reliable harness, composed for the application` (model=slate, embodiment=bronze, harness=ink weight-500)

## Data / graphics

All native inline SVG per the prototype. Model nodes slate (`--accent-b`), embodiment nodes bronze (`--accent-a`), cables + keystone + ticks ink (`--ink`), labels mono. No fills, no glow, paper ground.

## Media slots

None — all native.

## Animations

`drawPath` cables (stagger 150ms); `scaleIn` keystone; `fadeUp` labels and the two thesis lines. **Reduced motion:** full completed map + both lines visible, no motion.

## Acceptance criteria

- Fills 1920×1080, no scroll/clip; legible from the back.
- Base state = two worlds + gap, looks finished.
- Reveal order exactly as above; back reverses; R replays.
- Matches the prototype geometry/copy; only tokenised colours; no glow/gradient.
- Extract this schematic into `_shared.js` `locatorMap()` (parameterised by `activeKey`) while building.

## Notes

- This is the single most important craft page; the recurring locator derives from it.
