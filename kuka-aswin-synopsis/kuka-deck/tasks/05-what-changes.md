# Screen 05 — What changes · "The base models will be public. Industrialising them will not."

> Inherits `GLOBAL-INSTRUCTIONS.md`. Global rules win unless named-overridden here.
> **Theme: light.** ACT I, closing screen. **Register: consequences + capability audit.**
> **Density: HIGH. This is the crux screen of Act I and one of the two or three most important screens in the deck.** It carries the answer to the commoditization objection and produces the gap that Acts III and IV exist to close.
> Source: `02-NARRATIVE-SPINE.md` screen 5.

## Purpose

Three things, in one movement:

1. Reframe what physical AI does to the market — it does not accelerate the existing market, it **enlarges the set of tasks that are automatable at all**.
2. Name the specific work of capturing that enlargement — the industrialisation stack that sits between a public base model and a working, certified, deployed cell. This is the answer to *"won't foundation models commoditise you?"*
3. **Audit KUKA against that stack, honestly.** Four of the five layers, KUKA already holds. One it does not. The screen ends on that single missing layer.

The gap is the argument. The advisor should reach Act III already knowing what is missing, because this screen let him work it out himself rather than telling him.

The one idea: *Base models will be public; industrialising them is the moat — and KUKA holds four of the five pieces.*

## Layout

16:9, light. Two-part asymmetric: plot left (the market argument), capability stack right (the work and the audit). Deliberately **not** screen 04's three-plus-one composition.

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  WHAT CHANGES                                               [ ⊞ overview ]   │
│  The market doesn't get faster. It gets bigger.                              │
│  And the work of capturing it is not the model.                              │
│                                                                              │
│  task variability      ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐   THE INDUSTRIALISATION STACK  │
│  (environmental        │ ·  ·  ·   ·   ·    │   ─────────────────────────    │
│   structure)           │·  ·  ·  ·  ·  ·  · │   fine-tune on our own robot  │
│   ▲  ·  ·  ·  ·  ·     │  ·  ·  ·   ·  ·    │   models          ● LBR, KR   │
│   │ ·  ·  ·  ·  ·  ·   │ ·  ·  ·  ·  ·  ·  ·│                               │
│   │  ·  ·  ·  ·  ·  ·  │  ·   ·  ·  ·   ·   │   contact + force sensor      │
│   │ ·  ·  ·  ·  ·  ·   │ ·  ·  ·  ·  ·  ·   │   data            ● DLR/LBR   │
│   │  ·  ·  ·  ·  ·  ·  └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘                               │
│   │ ·  ·  ·  ·  ┌────────┐                      real deployment data        │
│   │  ·  ·  ·  · │▓▓▓▓▓▓▓▓│ ← 1.0 serves         at scale        ○  ← GAP    │
│   │ ·  ·  ·  ·  │▓▓▓▓▓▓▓▓│    only here                                     │
│   └──────────────────────▶                      safety, certified,          │
│           volume per variant                    added sensing     ● IEC/Med  │
│                                                                              │
│   the setup cost collapses                      an interface that            │
│   the task set widens                           abstracts all of it ● iiQKA  │
│                                                                              │
│  The base models will be public.          Four of five, we already hold.     │
│  Industrialising them will not.           The fifth is the whole argument.   │
│                                                                  05 / 16     │
└──────────────────────────────────────────────────────────────────────────────┘
```

- **Top ~14%:** kicker, headline (display), subtitle.
- **Left ~50%:** the plot — two axes, dot field, the small Automation 1.0 zone and the large dashed Automation 2.0 zone. Two mechanism lines sit beneath it.
- **Right ~42%:** `THE INDUSTRIALISATION STACK` — five rows. Each row: the work (body, primary ink) on the left, and on the right an **asset marker** — a filled orange dot plus a short mono asset tag for the four KUKA holds, and a hollow grey ring plus `GAP` for the one it does not.
- **Bottom:** two closing statements, left and right, in display weight.
- **Ratio adaptation:** at 1440×900 reduce plot height ~15% and stack row spacing ~12%. The stack never becomes two columns; the plot never overlaps it. Asset tags may truncate before row text does.

## Steps (reveal order)

**0 — Base:** kicker, headline, subtitle, plot axes with labels, the dot field scattered (static), stack heading with five hairline rules, row text hidden. Looks finished; the dot spread already poses the question.

**1 — The 1.0 zone:** small solid region fades in, lower-right, with label. *(This is where every installed industrial robot lives.)*
**2 — The expansion:** the large dashed 2.0 boundary draws outward (`drawPath`, ~700ms, ease-out) then fills faintly. Dots newly enclosed darken slightly. **Hold this beat — the size gap is the argument.**
**3 — The mechanisms:** two lines fade up beneath the plot, ~150ms apart.
**4 — The stack, as work:** all five row texts reveal in sequence, ~140ms apart. **Asset markers not yet shown.** At this point it reads as a neutral list of what industrialisation requires.
**5 — The audit:** the four filled orange markers and their asset tags light in sequence (rows 1, 2, 4, 5), ~180ms apart, each with a 200ms scale settle. Row 3's marker resolves last as a **hollow grey ring** — no fill, no tag. The asymmetry must land as a beat, not a detail.
**6 — The gap named:** row 3 gains the label `GAP` in mono orange, and its row rule thickens to 2px `#FF5800`. Everything else holds.
**7 — The turn:** both closing statements `fadeUp` together.

*(8 beats. Back reverses one at a time. `R` replays from base.)*

## Copy

Exact text. Do not alter.

- **Kicker:** `WHAT CHANGES`
- **Headline:** `The market doesn't get faster. It gets bigger.`
- **Subtitle:** `And the work of capturing it is not the model.`
- **X-axis label:** `volume per variant`
- **Y-axis label:** `task variability (environmental structure)`
- **1.0 zone label:** `Automation 1.0 serves only here`
- **2.0 zone label:** `Automation 2.0 — the addressable set`
- **Mechanism 1:** `The setup cost collapses.` — sub: `Programming and fixturing were the fixed cost that made automation viable only above a volume threshold.`
- **Mechanism 2:** `The task set widens.` — sub: `Contact-rich, variable tasks that were not automatable at any price become tractable.`
- **Stack heading:** `THE INDUSTRIALISATION STACK`
- **Stack rows** (work text → asset tag):
  1. `fine-tune on our own robot models` → `LBR · KR platform`
  2. `contact and force sensor data` → `DLR-derived torque sensing`
  3. `real deployment data at scale` → `GAP`
  4. `safety, certified, with added sensing` → `medical-grade certification`
  5. `an interface that abstracts all of it` → `iiQKA.OS`
- **Closing statement, left (display, two lines):** `The base models will be public.` / `Industrialising them will not.`
- **Closing statement, right (display, two lines):** `Four of five, we already hold.` / `The fifth is the whole argument.`
- **Counter:** `05 / 16`

Mechanism sub-lines are body weight, secondary ink, small, beneath their statement. Stack row text is body weight, primary ink, sentence case, no terminal punctuation. Asset tags are mono, small, secondary ink — except `GAP`, which is mono, orange, and the same size.

## Data / graphics

**The plot — hand-built SVG, conceptual, no numeric scales on either axis.** Numbers on these axes would be false precision; the argument is topological.

- **Axes:** thin `#C9C9CE` with arrowheads, mono labels, secondary ink. **No ticks, no numbers.**
- **Dot field:** ~90 dots, r=2, `#C9C9CE`, distributed across the field with **higher density toward the upper-left** — because that is where most manufacturing work actually sits, and the visual should say so without a caption. Dots are **unlabelled**; segment naming is held for screen 13.
- **Automation 1.0 zone:** rectangle in the lower-right corner, ~22% × 26% of plot area, fill `rgba(17,17,19,.08)`, 1px solid `#6E6E76`. Its smallness relative to the dot field is the point.
- **Automation 2.0 zone:** large rounded region containing and far exceeding the 1.0 zone, ~70% of plot area. **Dashed** 1.5px `#FF5800`, fill `rgba(255,88,0,.06)`. Dashed because it is a frontier claim, not a measured boundary — line style must match evidence tier, consistent with screen 03's dashed projection.
- Dots enclosed by 2.0 but outside 1.0 darken to `#8A8A92` at step 2. Density change only, no colour hue shift, no movement.
- **Asset markers:** filled `#FF5800` circle r=5 with 1.5px white ring for held layers; hollow `#C9C9CE` ring, 2px stroke, no fill, r=5 for the gap.
- **No glow** — light screen.

**`data.js` constants required:**

```js
KUKA_STACK = [
  { work:"fine-tune on our own robot models",     asset:"LBR · KR platform",
    held:true,  tier:"confirmed" },
  { work:"contact and force sensor data",         asset:"DLR-derived torque sensing",
    held:true,  tier:"confirmed" },
  { work:"real deployment data at scale",         asset:null,
    held:false, tier:"confirmed", note:"the gap — Acts III and IV exist to close this" },
  { work:"safety, certified, with added sensing", asset:"medical-grade certification",
    held:true,  tier:"confirmed" },
  { work:"an interface that abstracts all of it", asset:"iiQKA.OS",
    held:true,  tier:"confirmed" },
]
```

**Evidence chips:** the four asset tags are factual claims about KUKA's capabilities and carry `confirmed` chips. The plot carries **no chips** — it is an argument, not a fact pattern, and adding chips there would imply sourcing that does not exist. This split within a single screen is deliberate and correct.

## Media slots

None — all native SVG/CSS.

## Animations

- `fadeUp` — headline, subtitle, mechanism lines, stack row text, closing statements
- `drawPath` — the 2.0 zone boundary, drawn outward from the 1.0 corner
- Zone fills: opacity 0→1, 400ms, no scaling
- Dot-darkening at step 2: 300ms colour transition, no movement
- Asset markers at step 5: 200ms scale 1→1.15→1 settle, same treatment as screen 02/03 nodes
- Row-3 rule thickening at step 6: 250ms
- **Reduced motion:** everything rendered complete and revealed at once. The zone size relationship, the four filled markers and the one hollow ring all still make the full argument statically. **The gap must remain visually obvious without motion.**
- **Cleanup:** cancel all timers and rAF in `onLeave`.

## Acceptance criteria

- Fills the viewport at 1920×1080 and 1440×900 — no scroll, no clipping; plot never overlaps the stack
- Base state looks finished — axes, labels, dot field, stack frame present
- **The 2.0 zone is dramatically larger than the 1.0 zone** — incremental-looking is a failure
- **The dashed 2.0 boundary is visually distinct from the solid 1.0 boundary**
- **The single hollow marker on row 3 is unmistakable at a glance** — this is the screen's payload and the most important single visual element on it
- The audit (step 5) reads as a beat, not a decoration — four fill, one does not, and the asymmetry registers
- Neither axis carries numbers or ticks
- Dots are unlabelled — no segment names anywhere on this screen
- Asset tags resolve from `data.js`; nothing hardcoded
- Only KUKA orange; no glow
- Reduced-motion version preserves the gap's visibility
- Copy matches this file character for character
- No console errors

## Notes

- **Why this screen is the crux.** It answers the commoditisation objection (the moat is industrialisation, not the model), it establishes KUKA's genuine assets without boasting (four factual capability claims), and it produces the deck's central gap — deployment data at scale — as something the advisor derives rather than something the author asserts. Every screen in Acts III and IV is downstream of the hollow ring on row 3.
- **Verification flags** (carry into `VERIFY-BEFORE-SENDING.md`): all four asset tags are capability claims about KUKA and must be confirmed before sending. `DLR-derived torque sensing` (LBR lineage) and `medical-grade certification` (LBR Med, IEC 60601-1 / 62304) are well supported. `iiQKA.OS` as a modular Linux abstraction layer is supported but the surrounding "first-in-class" claims from the source research are **not** verified — do not add them here. Row 3 being a genuine gap is an author judgement about KUKA's fleet-data position and should be sanity-checked internally; if KUKA does in fact hold deployment data at scale, this screen's conclusion changes and so does the deck.
- **Cross-screen dependencies — do not spend early:**
  - The enlarged 2.0 zone is re-used on **screen 13** ("two additive layers" — Layer 2 *is* this zone). Segment names, India specifics, and sizing all belong there.
  - The row-3 gap is closed by **screen 14** (the flywheel), which shows how India generates deployment data at the lowest cost in the world. Do not preview that mechanism here.
  - `iiQKA.OS` reappears on **screen 07** (three responses — KUKA chose architecture) and **screen 15** (the ecosystem play). Keep the characterisation consistent across all three.
- **Structural discipline:** must not repeat screen 04's three-plus-one composition. Two-part asymmetric is specified for that reason.
- **The closing statements are load-bearing and author-approved.** Do not reword either. The left one answers commoditisation; the right one hands off to Act II.
