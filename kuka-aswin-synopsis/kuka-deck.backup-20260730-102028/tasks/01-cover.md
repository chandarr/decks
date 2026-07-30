# Screen 01 — Cover · "Where KUKA wins the next decade"

> Inherits `GLOBAL-INSTRUCTIONS.md`. Global rules win unless named-overridden here.
> **Theme: dark** (one of two dark bookends — this and screen 16). Opening of ACT I.
> Source: `02-NARRATIVE-SPINE.md` screen 1.

## Purpose

Five seconds to establish three things: that the author operates at global-strategy altitude, that the subject is the physical-AI inflection, and that this is both an analysis and a bid. The arm motif carries the argument in motion — a certified industrial body executing a precise, intelligent trajectory is the deck's thesis rendered visually, before a word is read.

The one idea: *This is a global read on where KUKA wins, from someone who has covered the whole robotics arc — and the answer runs through India.*

## Layout

16:9, dark. Asymmetric split with generous negative space. Nothing is centred.

```
┌───────────────────────────────────────────────────────────────┐
│                                              [ ⊞ overview ]   │
│                                                               │
│                                                               │
│      ╱▔▔╲                                                     │
│     │ ●  │╲                        Where KUKA wins            │
│     └─┬──┘ ╲__                     the next decade            │
│       │       ╲__●                                            │
│     ══╧══         ╲                A global read on the       │
│    ▓▓▓▓▓▓▓         ╲···trajectory···▸  physical-AI inflection │
│    ░░░░░░░░░                       — and why India is not a   │
│                                    market to serve, but the   │
│                                    engine of the answer.      │
│                                                               │
│                                    ─────────                  │
│                                    Dr. Ir. Aswin Chandarr     │
│                                    MBA · Author               │
│                                    16+ years across the full  │
│                                    robotics arc …             │
│                                                               │
│  ← → navigate · O overview                          01 / 16   │
└───────────────────────────────────────────────────────────────┘
```

- **Left ~45%:** the arm, anchored to the lower-left, base sitting on a subtle plinth. Drawn as a clean engineering-schematic silhouette — thin orange strokes on black, joints as small filled circles. Not an illustration, not a render.
- **Right ~48%:** the title block, left-aligned, vertically centred slightly above the midline. Title, subtitle, hairline rule, then the credential block.
- **Trajectory:** the end-effector traces a path rightward that terminates just left of the title block. The path carries a **subtle upward inflection** — flat, then bending up as it resolves. This visualizes the word "inflection" without labelling it. Reused on screen 16.
- **Bottom:** keyboard hint (auto-fades after ~6s), screen counter right.
- **Ratio adaptation:** at wider aspect the arm and title block separate further; the arm never scales above 55% viewport height. At 1440×900 reduce arm scale ~12% and tighten the title block leading.

## Steps (reveal order)

This screen **auto-plays its base state on load** rather than waiting for an advance — it is the opening moment. Total base animation ~3.6s.

**0 — Base (auto, ~3.6s):**
- Arm powers up joint by joint, base → shoulder → elbow → wrist, `jointStagger`, ~180ms apart with servo easing (slight overshoot, settle). Each joint circle brightens as its link arrives.
- End-effector reaches position; trajectory draws left-to-right via `drawPath` (~900ms, ease-out).
- Title `fadeUp` as the path completes (overlapping the last ~250ms of the draw).
- **If a viewer lands mid-animation or reloads, the completed state must look finished.** Never a half-drawn arm at rest.

**1 — Subtitle:** `fadeUp`.
**2 — Credential block:** hairline rule draws left-to-right (~300ms), then name and credential lines `fadeUp` together.
**3 — Settle:** trajectory endpoint emits one slow orange pulse (single, not looping), keyboard hint fades in. This is the "ready" beat before advancing.

*(4 beats. Back reverses one at a time — the arm and title never disappear. `R` replays the full base sequence.)*

## Copy

Exact text. Do not alter.

- **Title:** `Where KUKA wins the next decade`
- **Subtitle:** `A global read on the physical-AI inflection — and why India is not a market to serve, but the engine of the answer.`
- **Name:** `Dr. Ir. Aswin Chandarr`
- **Credential line 1:** `MBA · Author`
- **Credential line 2:** `16+ years across the full robotics arc — concept, development, manufacturing, certification, deployment, support, and frontier R&D.`
- **Keyboard hint:** `← → navigate · O overview`
- **Counter:** `01 / 16`

Sentence case throughout. Title is the only element in display weight; subtitle is regular, secondary ink. Credential line 2 is mono, small, secondary — it reads as an instrument readout, not a bio.

## Data / graphics

**The arm — hand-built SVG, no library.** Six-axis articulated silhouette in KUKA-orange stroke on the dark base.

- Geometry: base plinth (trapezoid, filled `rgba(255,88,0,.14)`), rotating column, shoulder link, elbow link, wrist, end-effector. Stroke `#FF5800`, width 2.5px, round caps and joins. Joint circles r=5, filled `#FF5800`, with a soft glow permitted (dark screen only).
- Pose at rest (step 0 start): folded/compact, links overlapping near the base — a powered-down arm.
- Pose at completion: extended up and to the right, end-effector at the trajectory origin point.
- Animate by rotating each link group about its own joint origin (`transform: rotate()` on nested `<g>` elements), not by morphing paths.
- **Store the final joint angles as named constants** — screen 16 reuses this geometry and must match exactly.

**The trajectory:** single SVG path from the end-effector, sweeping right with a subtle upward inflection in the final third. Stroke `#FF5800`, width 1.5px, `stroke-dasharray` for the draw-on. Opacity 0.85. A faint 40px-radius radial glow follows the drawing head, then dissipates.

**Background:** vertical gradient `#0A0A0B → #131316`. Optional: a very faint dot grid (2% opacity, 40px pitch) in the lower-left quadrant only, suggesting a factory floor plane. Keep it barely perceptible.

No numbers on this screen — no `data.js` constants required.

## Media slots

None — all native SVG/CSS.

## Animations

- `jointStagger` — arm power-up (this screen and 16 only)
- `drawPath` — trajectory, and the credential hairline rule
- `fadeUp` — title, subtitle, credential block, keyboard hint
- Single non-looping pulse on the trajectory endpoint at step 3
- **Reduced motion:** arm renders immediately in its final pose, trajectory drawn complete, all four steps revealed at once, no pulse, no glow-follow. The screen must still read as composed and intentional.
- **Cleanup:** cancel every `requestAnimationFrame` and timer in `onLeave`. The pulse must not survive navigation.

## Acceptance criteria

- Fills the viewport at 1920×1080 and 1440×900 — no scroll, no clipping, arm never overlaps the title block
- Base state after auto-play looks finished; a mid-animation reload resolves to the complete state
- Joint rotation reads as mechanical (overshoot-and-settle), not floaty or elastic
- Trajectory's upward inflection is visible but subtle — an inflection, not a hook
- Title legible from the back of a room; subtitle legible on a laptop at arm's length
- Only KUKA orange used; glow present but restrained (dark screen allowance)
- Overview button and `O` both work from this screen; `R` replays cleanly
- Reduced-motion path composed and complete
- Copy matches this file character for character
- No console errors

## Notes

- **Placeholder check:** the name and credential text here is final and confirmed by the author — it is not a placeholder. Do not substitute.
- **Cross-screen dependency:** the arm geometry and final joint angles are reused on screen 16, where the trajectory resolves a second time to close the deck. Export the geometry and angles as shared constants from the start rather than duplicating.
- This is one of only two dark screens. The transition into screen 02 uses the ~500ms bookend wash defined in `GLOBAL-INSTRUCTIONS.md` §4.1 — verify it reads as intentional, not as a flash.
- The deck is **16 screens** (the four-act overview was promoted to its own screen 02). Counter reads `01 / 16`.
