# Screen 03 — The inflection · "Told what to achieve, not what to do"

> Inherits `GLOBAL-INSTRUCTIONS.md`. Global rules win unless named-overridden here.
> **Theme: light.** ACT I. **Register: technical** (screen 04 is the financial register; 05 is consequences only — this deliberate register change is what stops three dense screens from reading as three of the same screen).
> Source: `02-NARRATIVE-SPINE.md` screen 3.

## Purpose

Prove field-level technical command, and convert "isn't this hype?" from an objection the advisor raises into a point the author raised first. The honest story is not "physical AI has arrived" — it is that capability is climbing steeply but has **not yet crossed the reliability line industrial customers actually buy at**, and that gap *is* the timing argument. The LLM trajectory is overlaid as precedent: the same curve shape, four years earlier, already resolved.

The one idea: *Robots are becoming instructable rather than programmable — and the gap before industrial reliability is exactly the window in which position is won.*

## Layout

16:9, light. Three deliberate density layers: headline (instant), plot (carries the argument without prose), evidence (substantiation, subordinate).

```
┌───────────────────────────────────────────────────────────────────────────┐
│  THE INFLECTION                                          [ ⊞ overview ]   │
│  The robot is being told what to achieve, not what to do.                 │
│  Automation 1.0 → 2.0 — and the reliability gap that sets the clock.      │
│                                                                           │
│  generalization                                                           │
│    ▲                                                                      │
│    │ ‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥‥  industrial          │
│    │                              ╱▔▔▔        reliability threshold      │
│    │        LLMs ····╱▔▔▔▔▔▔▔  ▓▓▓╱                                       │
│    │           ····╱          ▓▓╱ ●GR00T N                                │
│    │         ···╱            ▓╱ ●π-series      ▓ = the build window       │
│    │       ··╱          ●OpenVLA                                          │
│    │     ·╱        ●RT-2                                                  │
│    │   ·╱     ●RT-1                                                       │
│    └────┬──────┬──────┬──────┬──────┬──────┬──────┬───────▶               │
│        2022   2023   2024   2025  [now]  2027   2028                      │
│                                                                           │
│  1.0                          2.0            ┌─ EVIDENCE ──────────────┐  │
│  fixed program        →  learned policy      │ ● RT-1 '22 · RT-2 '23   │  │
│  fixtured environment →  perceived env.      │ ● OpenVLA '24 · π0 '24  │  │
│  reprogram to change  →  retask by           │ ● GR00T N '25           │  │
│                          instruction         │ ○ no VLA system yet     │  │
│  volume justifies it  →  mix justifies it    │   certified for unsup.  │  │
│                                              │   industrial duty       │  │
│                                              └─────────────────────────┘  │
│                                                              03 / 16      │
└───────────────────────────────────────────────────────────────────────────┘
```

- **Top ~20%:** kicker, headline (display, two lines max), subtitle.
- **Middle ~50%:** the plot. This is the screen's argument and gets the most space.
- **Bottom ~26%:** left two-thirds = the 1.0→2.0 contrast strip; right third = the evidence panel.
- **Ratio adaptation:** at 1440×900 compress the plot's vertical range ~15% and move the evidence panel beneath the contrast strip as a single mono line-set rather than a boxed panel. Never let milestone labels collide.

## Steps (reveal order)

**0 — Base:** kicker, headline, subtitle, empty plot axes with tick labels, the dashed threshold line already drawn and labelled, contrast-strip column headers (`1.0` / `2.0`) with rows ghosted, evidence panel frame with contents hidden. Looks finished and already poses the question.

**1 — The precedent:** the ghosted LLM curve draws left-to-right, rising and **crossing** the threshold. Label `LLMs` fades up. *(Presenter: "we have seen this curve before.")*
**2 — The physical-AI curve:** the solid orange curve draws, rising steeply, approaching but **not crossing** the threshold, terminating at `[now]`.
**3 — Milestones:** the five nodes light in chronological order, ~120ms apart, labels fading up with them.
**4 — The window:** the shaded band appears between `[now]` and the projected crossing; label `the build window` fades up. The curve extends past `now` as a **dashed** projection to the crossing point.
**5 — The contrast strip:** four rows reveal in sequence, ~150ms apart.
**6 — Evidence panel:** contents fade up as a block.

*(7 beats. Back reverses one at a time. `R` replays from base.)*

## Copy

Exact text. Do not alter.

- **Kicker:** `THE INFLECTION`
- **Headline:** `The robot is being told what to achieve, not what to do.`
- **Subtitle:** `Automation 1.0 → 2.0 — and the reliability gap that sets the clock.`
- **Y-axis label:** `task generalization`
- **Threshold label:** `industrial reliability threshold`
- **Precedent curve label:** `LLMs — the same curve, four years earlier`
- **Physical-AI curve label:** `physical AI`
- **Band label:** `the build window`
- **Contrast strip header left:** `AUTOMATION 1.0` · **header right:** `AUTOMATION 2.0`
- **Contrast rows** (left → right):
  - `fixed program` → `learned policy`
  - `fixtured environment` → `perceived environment`
  - `reprogram to change` → `retask by instruction`
  - `volume justifies automation` → `mix justifies automation`
- **Evidence panel heading:** `EVIDENCE`
- **Evidence lines:**
  - `RT-1 (2022) · RT-2 (2023) — Google / DeepMind`
  - `OpenVLA (2024) · π-series (2024) — Stanford-Berkeley / Physical Intelligence`
  - `GR00T N (2025) — NVIDIA`
  - `No VLA system is yet certified for unsupervised industrial duty.`
  - `LLM trajectory shown as analogy, not evidence.`
- **Closing line (beneath the contrast strip):** `Capability is not the constraint. Position before capability is.`
- **Counter:** `03 / 16`

## Data / graphics

**The plot — hand-built SVG, no chart library.**

- **Axes:** x = time, 2022→2028, ticks per year with `[now]` marked at mid-2026 by a subtle vertical hairline. y = task generalization, **unlabelled numerically** — this is a conceptual curve, and putting false precision on the y-axis would be exactly the kind of overclaim this deck must avoid.
- **Threshold:** horizontal dashed line at ~78% of the y-range, `#6E6E76`, 1.5px, dash 6/4. Label right-aligned above it.
- **LLM precedent curve:** dotted/ghosted, `#C9C9CE`, 2px, dash 2/3. Time-shifted so its shape is directly comparable — it rises across the same x-span and **crosses** the threshold around the 2024–25 x-position. Opacity 0.55. This is a *shape* argument, not a dataset.
- **Physical-AI curve:** solid `#FF5800`, 2.5px, rising steeply, reaching ~62% of y-range at `[now]` — clearly below threshold. Beyond `[now]`, continues as a **dashed** projection (dash 5/4, same colour, opacity 0.5) crossing the threshold around the 2027–28 x-position.
- **Milestone nodes:** r=5 filled `#FF5800` with 1.5px white ring, positioned on the solid curve at their year. Mono labels, 11px, offset up-right, `#6E6E76`.
- **Build window band:** vertical shaded region from `[now]` to the projected crossing, fill `rgba(255,88,0,.08)`, no border. Label in mono, centred at the top of the band.
- **No glow** — light screen.

**`data.js` constants required** (every figure named, never hardcoded):

```js
MILESTONES = [
  { label:"RT-1",      year:2022, org:"Google",                    tier:"confirmed" },
  { label:"RT-2",      year:2023, org:"Google DeepMind",           tier:"confirmed" },
  { label:"OpenVLA",   year:2024, org:"Stanford / UC Berkeley",    tier:"confirmed" },
  { label:"π-series",  year:2024, org:"Physical Intelligence",     tier:"confirmed" },
  { label:"GR00T N",   year:2025, org:"NVIDIA",                    tier:"confirmed" },
]
THRESHOLD_CROSSING_PROJECTED = { value:"2027–28", tier:"frontier" }
LLM_PRECEDENT               = { tier:"frontier", note:"analogy, not evidence" }
NO_CERTIFIED_VLA            = { tier:"confirmed" }
```

**Evidence chips:** milestone nodes carry `confirmed`. The projected crossing, the build window, and the LLM precedent curve all carry `frontier`. **This distinction must be visible on the screen** — it is the rigor signal, and collapsing it to make the plot cleaner defeats the purpose of the screen.

## Media slots

None — all native SVG/CSS.

## Animations

- `drawPath` — LLM curve (step 1), physical-AI solid curve (step 2), dashed projection (step 4)
- Node light-up staggered 120ms (step 3), same treatment as screen 02 nodes
- `fadeUp` — all labels, contrast rows, evidence block
- Band: opacity 0→1 over 400ms, no scaling
- **Reduced motion:** everything drawn complete and revealed at once; the two curves, the threshold, the un-crossed gap and the shaded window still make the argument statically.
- **Cleanup:** cancel all timers and rAF in `onLeave`.

## Acceptance criteria

- Fills the viewport at 1920×1080 and 1440×900 — no scroll, no clipping, no label collisions on the plot
- Base state looks finished; the threshold line and empty axes already frame the question
- **The physical-AI curve visibly does NOT cross the threshold at `[now]`** — this is the entire point and must be unambiguous
- **The LLM curve visibly DOES cross** — the precedent contrast must read instantly
- The build window band is clearly bounded by `[now]` and the projected crossing
- Frontier-tier elements (projection, band, LLM curve) are visually distinguishable from confirmed-tier elements (milestone nodes) without reading the chips
- y-axis carries no numeric scale
- Only KUKA orange; no glow
- Milestone labels legible at 1440×900
- Reduced-motion version still makes the argument
- Copy matches this file character for character
- No console errors

## Notes

- **Verification flags** (carry into `VERIFY-BEFORE-SENDING.md`): milestone model names, originating organisations and years are from general field knowledge and should be confirmed before sending. The projected 2027–28 crossing is explicitly a judgement, not a forecast from a source — it is marked `frontier` for that reason. If challenged, the defensible position is the *shape* of the argument, not the date.
- **The LLM analogy is marked as analogy on the screen itself.** Do not remove that line to tidy the panel. Volunteering the limit of your own device is the credibility move.
- **Register discipline:** this screen is technical. Screen 04 is financial (deals, funding, market share). Screen 05 is consequences, deliberately light. If this screen starts acquiring market or money data, it has drifted into 04's territory — stop and ask.
- The closing line — *"Capability is not the constraint. Position before capability is."* — is the hinge into Act IV and is echoed on screen 14. Do not reword.
- The `[now]` marker must sit at mid-2026 to match the deck's present tense throughout.
