# Screen 02 — The four acts · "Four moves"

> Inherits `GLOBAL-INSTRUCTIONS.md`. Global rules win unless named-overridden here.
> **Theme: light** (first light screen — arrives via the bookend wash from screen 01). ACT I.
> Source: `02-NARRATIVE-SPINE.md` screen 2.
> **Cross-screen dependency:** continues the trajectory motif established on screen 01.

## Purpose

Tell a gatekeeper, within fifteen seconds, that this is a structured argument rather than a pitch — and let the *shape* of the argument do that work. The four acts are not four topics; they are a zoom in and back out (industry → company → country → global consequence), which is also the narrative tension curve. The path descends as scope narrows and tension builds, then climbs past its own starting height as the argument resolves.

This screen deliberately puts the low point on the page, on purpose, before anyone has to ask about it.

The one idea: *This is one argument in four moves, and it ends higher than it starts.*

## Layout

16:9, light. The trajectory from screen 01 continues onto this screen and becomes the spine of the argument — this screen reads as a continuation, not a reset.

```
┌──────────────────────────────────────────────────────────────────────┐
│  THE ARGUMENT                                       [ ⊞ overview ]   │
│  Four moves                                                          │
│                                                                      │
│                                                          ●────▸      │
│    ●                                                   ╱             │
│     ╲                                                ╱               │
│       ╲                                            ╱                 │
│         ╲      ●                                 ╱                   │
│           ╲     ╲                              ╱                     │
│             ╲     ╲                          ╱                       │
│               ╲     ╲            ●─────────╱                         │
│                 ╲─────╲─────────╱                                    │
│                                                                      │
│  ──────────────  ──────────────  ──────────────  ──────────────      │
│  ACT I           ACT II          ACT III         ACT IV              │
│  The market      KUKA is         India is        And where the       │
│  is inflecting   well-placed     where that      fix compounds       │
│                  and under-armed gap is widest   globally            │
│                                                                      │
│                                                          02 / 16     │
└──────────────────────────────────────────────────────────────────────┘
```

- **Top-left:** mono kicker `THE ARGUMENT`, then display title `Four moves`. Compact — this screen is mostly whitespace and path.
- **Middle ~55% of viewport height:** the trajectory path with four nodes. The path enters from the **left edge** (continuing screen 01's trajectory, which exited right) and exits **off the right edge**, into the deck.
- **Bottom ~28%:** four equal columns aligned to the horizontal position of their node. Each column: a hairline rule, a mono act label, and the beat line in body text.
- **Path geometry:** node 1 sits high-left; node 2 mid; node 3 at the lowest point (~62% of the path's vertical range below node 1); node 4 climbs to sit **visibly higher than node 1** (~15% above it). The rise past the opening height is the point — verify it reads clearly, not marginally.
- The four columns are evenly spaced; the nodes are *not* evenly spaced horizontally — node 3 sits slightly right of centre so the final climb has room. Connect each node to its column with a faint 1px vertical hairline (`#E5E5E8`).
- **Ratio adaptation:** at 1440×900, reduce the path's vertical range ~15% and tighten column leading. The path must never overlap the title block or the columns.

## Steps (reveal order)

**0 — Base:** kicker, title, the full path ghosted at 15% opacity with all four nodes dim (r=6, `#C9C9CE`), the four hairline rules and act labels visible, beat lines hidden. This previews the shape and looks finished — the viewer can see there are four moves and that the last one rises, before any are explained.

**1 — Act I:** path segment from the left edge to node 1 draws (`drawPath`, 500ms). Node 1 lights to `#FF5800`. Beat line I `fadeUp`.
**2 — Act II:** segment node 1 → node 2 draws. Node 2 lights. Beat line II `fadeUp`.
**3 — Act III:** segment node 2 → node 3 draws (the descent — slightly slower, 650ms, to let the drop register). Node 3 lights. Beat line III `fadeUp`.
**4 — Act IV:** segment node 3 → node 4 draws and continues off the right edge (750ms, ease-out). Node 4 lights and emits one slow non-looping pulse. Beat line IV `fadeUp`.

*(5 beats. Back reverses one at a time — segments un-draw and nodes return to dim. `R` replays from base.)*

## Copy

Exact text. Do not alter.

- **Kicker:** `THE ARGUMENT`
- **Title:** `Four moves`
- **Act I label:** `ACT I` — **beat:** `The market is inflecting`
- **Act II label:** `ACT II` — **beat:** `KUKA is well-placed and under-armed`
- **Act III label:** `ACT III` — **beat:** `India is where that gap is widest`
- **Act IV label:** `ACT IV` — **beat:** `And where the fix compounds globally`
- **Counter:** `02 / 16`

Act labels are mono, uppercase, wide tracking, secondary ink. Beat lines are body weight, primary ink, sentence case, no terminal punctuation. Keep each beat on a maximum of three lines at 1440×900.

## Data / graphics

**The path — hand-built SVG, no library.**

- Single continuous path, stroke `#FF5800`, width 2px, round caps, no fill. Drawn as one path with `stroke-dasharray`/`stroke-dashoffset`, revealed segment by segment (compute the cumulative length at each node so each step reveals exactly one segment).
- The ghosted base state is the same path at `opacity: .15` beneath the drawn path — not a separate geometry.
- Curve style: smooth cubic béziers, not straight lines and not a wobbly spline. The descent through Acts I–III should feel like a controlled settle; the Act IV climb should feel like lift, with its steepest gradient just after node 3.
- **Nodes:** circles r=6. Dim `#C9C9CE`; lit `#FF5800` with a 1.5px white ring so they read cleanly against the path.
- Entry: the path begins at `x = -2%` (just off the left edge) at the same relative height screen 01's trajectory exited, so the two read as continuous. Exit: `x = 102%`.
- **No glow** — this is a light screen (`GLOBAL-INSTRUCTIONS.md` §4.1). The Act IV pulse is a brief opacity/scale ring, not a bloom.

**No numbers on this screen** — no `data.js` constants required.

## Media slots

None — all native SVG/CSS.

## Animations

- `drawPath` — each path segment in turn
- `fadeUp` — beat lines
- Node light-up: 200ms colour + scale 1→1.15→1 settle, on the same beat as its segment completing
- Single non-looping ring pulse on node 4 at step 4
- **Reduced motion:** full path drawn complete, all four nodes lit, all beat lines shown, no pulse. The shape — descent then rise above the start — still makes the point without motion.
- **Cleanup:** cancel every timer and rAF in `onLeave`; the node-4 pulse must not survive navigation.

## Acceptance criteria

- Fills the viewport at 1920×1080 and 1440×900 — no scroll, no clipping; path never overlaps title or columns
- Base state looks finished: the four-move shape and the final rise are legible before any advance
- **Node 4 is unmistakably higher than node 1** — the resolution-above-the-opening must be obvious, not subtle
- Node 3 is clearly the lowest point
- The path enters from the left edge at a height continuous with screen 01's exit — the two screens read as one trajectory
- Each advance draws exactly one segment and reveals exactly one beat line
- Only KUKA orange used; no glow anywhere on this screen
- Beat lines legible from the back of a room
- Reduced-motion path complete and composed
- Copy matches this file character for character
- No console errors

## Notes

- **This screen was promoted out of screen 01** (it was originally the cover's final reveal beat). It is the reason the deck is 16 screens rather than 15.
- **Beat II is load-bearing.** "Well-placed and under-armed" plants the hinge that is not paid off until screen 07 ("KUKA has the best platform and the smallest army to exploit it"). Do not reword it — the echo is deliberate.
- **Act III is intentionally the low point.** If the visual makes the descent look like a problem the deck is hiding, the design has failed; it should read as a diagnosis the author is walking toward on purpose.
- The trajectory motif recurs on screens 01 and 16. Reuse the same stroke weight, colour and curve character so all three read as one continuous line through the deck. Consider exporting the shared path-styling constants alongside `arm-geometry.js`.
- Terminology check for the consistency pass: "inflecting" (this screen) must match "inflection" as used on screens 01 and 04.
