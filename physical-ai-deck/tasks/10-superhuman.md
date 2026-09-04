# Page 10 — Superhuman · "Three capabilities, one superhuman goal"

> Inherits `GLOBAL-INSTRUCTIONS.md` (§11 center-weight; §12 motion where it helps; §13 reveal one group at a time). Light theme, off-white/ink, no glow. Act III opener. Deck v3.
> **FULL REDESIGN — the previous build was broken:** it hand-placed SVG text at scattered fixed coordinates (streams far left, a lone dumbbell arrow mid-right, chain floating below) with a "converge" that animated invisible dots — rendering as disconnected fragments in mostly empty space, no boxes. **This rewrite is a boxed HTML/fl exbox layout** — every piece of text lives inside a real box, laid out with fl/grid, NOT absolute-positioned SVG. Convey the message cleanly; keep motion minimal.

## Purpose

One integrated thesis: Adaptation, Autonomy, and Assurance are not a sequence — they only create value *together*, and pointing them at a **superhuman goal** (a task humans can't do) forces them to fire at once while giving direction, a tangible output, and something to monetize. Superhuman is reachable by **reasoning transfer**, not imitation.

The one idea: *Point the three capabilities at a goal humans can't reach, and they fire together.*

## Layout — BOXED, flexbox/grid (NOT absolute SVG). Center-weighted (§11)

Use a centered container, max-width ~1640px (x ∈ [140, 1780]). Everything is real boxes laid out by flex/grid — **do not position text with absolute x/y SVG coordinates.** Bands, top→bottom:

| Band | y-ish | Contents |
|---|---|---|
| Chrome | 40–90 | kicker top-left; slide-no "10" top-right. |
| **Title** | 110–200 | `Three capabilities, one superhuman goal.` |
| **Row 1 — converge → goal** | 250–560 | LEFT: three stacked pillar boxes. MIDDLE: a converge connector + small label. RIGHT: one big GOAL box. |
| **Row 2 — reasoning chain** | 600–720 | a left label + four small chain boxes joined by `→`. |
| **Takeaway** | 760–825 | one centered line. |

### Row 1 (flex, three parts, vertically centered)

- **LEFT — three pillar boxes**, stacked, equal (~360w each, ~76h, ~16px gaps). Each box = bold pillar word + lighter need, on one line:
  - `ADAPTATION` · Edge
  - `AUTONOMY` · Competence
  - `ASSURANCE` · Confidence
  Hairline `--panel` boxes, ink pillar word, `--secondary` need.
- **MIDDLE — converge connector** (~200w): three short lines from the three left boxes merging into one arrow pointing right (a simple SVG bracket/merge is fine HERE because it's purely decorative between two flex columns — or a CSS chevron). Small mono label above it: `all three, at once`.
- **RIGHT — the GOAL box** (~480w, ~200h), visually the heaviest element: a bold box (thicker `--ink` border, `--panel` fill) containing:
  - `SUPERHUMAN` — Archivo large, ink.
  - `a task humans can't do.` — `--secondary` beneath.
  - a footer chip row (mono, small): `direction · tangible output · monetizable`.

### Row 2 (reasoning chain — boxes)

- A left-aligned label (mono/`--secondary`): `Reachable by reasoning transfer — not imitation:`
- Then four small equal boxes joined by ink `→` glyphs: `LANGUAGE` → `PHYSICS` → `PLANNING` → `UNSEEN TASK ✓`. The `✓` is ink (capability, not `--alert`). Boxes hairline, mono labels.

### Takeaway

- One centered line, Archivo medium/bold (band 760–825).

## Steps (reveal order — §13, minimal motion)

**0 — Base (looks finished):** chrome, title, the three pillar boxes (left) present, the converge connector faint, the GOAL box present but **empty/faint** (outline only), Row 2 + takeaway hidden.
**1 — All three, at once:** the converge connector emphasizes (the three merge lines draw toward the arrow) + the `all three, at once` label — the "not a sequence" point.
**2 — The goal:** the GOAL box fills — `SUPERHUMAN`, the sub, and the footer chip fade up.
**3 — Why it's reachable:** Row 2 reveals — the four chain boxes appear left→right with their `→`s, under the label.
**4 — The payoff:** the takeaway lands.

*(4 advance beats after base. `fadeUp` only — no converge-of-invisible-dots, no looping. Back reverses; End reveals all. `onLeave` trivial.)*

## Copy (exact)

- **Kicker:** `The integrating goal`
- **Title:** **Three capabilities, one superhuman goal.**
- **Pillar boxes:** `ADAPTATION · Edge` · `AUTONOMY · Competence` · `ASSURANCE · Confidence`
- **Converge label:** `all three, at once`
- **Goal box:** **SUPERHUMAN** / a task humans can't do. / `direction · tangible output · monetizable`
- **Row 2 label:** Reachable by reasoning transfer — not imitation:
- **Chain boxes:** `LANGUAGE` → `PHYSICS` → `PLANNING` → `UNSEEN TASK ✓`
- **Takeaway (central band):** **Aim at what humans can't do, and the three fire together.**

*(Sentence case for prose; pillar words + `SUPERHUMAN` + chain labels UPPER/mono. Dropped from the old spec: the TARS aside and the separate beachhead/goal-value sentences — folded into the goal-box chip and the takeaway to cut clutter.)*

## Data / graphics

**Native HTML boxes via flex/grid — this is the crux.** Pillar boxes, goal box, and chain boxes are `<div>`s with the `.panel`/hairline card style, laid out by flexbox rows/columns and gaps — no hand-computed x/y. The only SVG allowed is the small decorative converge connector between the two flex columns (three short merge lines → one arrowhead); it must not carry any text. Goal box heavier (thicker ink border) so it's clearly the focal point. Ink/graphite only; no glow, no `--alert` (the `✓` is ink).

## Media slots

None — all native.

## Animations

`fadeUp` per group (converge label/connector → goal box → chain boxes left→right → takeaway). No `converge` on invisible dots; no loops. **Reduced motion:** everything visible at rest — three pillar boxes, connector, filled goal box, full chain, takeaway. **Cleanup:** trivial.

## Acceptance criteria

- **Boxed & laid out by flex/grid** — every text element sits inside a real box; nothing is absolute-positioned SVG text; no scattered fragments; no large empty dead zones.
- **Reads as one flow:** three pillar boxes → (converge) → one heavy SUPERHUMAN goal box, with the reasoning chain of boxes beneath. The "all three at once → one superhuman goal, reachable by reasoning transfer" message is unmistakable.
- **§13:** groups reveal in order (converge → goal → chain → takeaway); base looks finished (pillar boxes + faint goal box).
- Goal box is the clear focal point; chain ends in `UNSEEN TASK ✓` (ink ✓).
- Center-weighted; takeaway ≤ y825; off-white/ink, no glow, no `--alert`; reduced-motion correct; no console errors.

## Notes

- Bridges Act II (the three A's) to Act III (beachhead + cascade next). Pillar-box labels echo slides 05–09 and the 04a pillars page.
- Keep it about *integration + why superhuman is reachable*; the specific hardest problem, the proof, and the trust-cascade are the NEXT slide (11).
- **If in doubt, favor a clean static boxed layout over motion — AC wants the message conveyed, not animation.**
