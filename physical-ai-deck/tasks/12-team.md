# Page 12 — Team & operating model · "Four labs, one flywheel"

> Inherits `GLOBAL-INSTRUCTIONS.md` (§11 center-weight; §12 motion; §13 reveal choreography — centre first, blocks one at a time, connecting arrows LAST). Light theme, off-white/ink, no glow. Act IV opener. Deck v3.

## Purpose

Show the org is buildable and, crucially, *designed to compound*: four interlocking labs where deployment's field data feeds the moat and the research. Establish the India-HQ + global-node model. First "how we build it" slide — it should read as command of execution.

The one idea: *The organization is a flywheel — deployment data compounds the moat and the research, so it grows, not just ships.*

## Layout (center-weighted, cycle — §11, §13)

All content in the central band (y ≈ 200–780); bottom ~20% chrome only.

- **Top chrome:** kicker top-left; slide-no "12" top-right; a small persistent context label `India HQ · global field nodes` (upper-right under the slide-no, faint — present from base, not a reveal beat).
- **Centre:** the core-message node at ≈ (960, 500): `BUILT TO COMPOUND`.
- **Four lab nodes** on a ring of radius 180 around the centre, in cycle order, clockwise: `Research` (top, y320), `Applied` (right, x1140), `Deployment` (bottom, y680), `Assurance` (left, x780).
- **Four charter cards** — each lab's name + one-line charter in a mild `--panel` box (hairline border, `--shadow-sm`), placed on the side of its node that faces open space: Research **above**, Applied **right**, Deployment **below**, Assurance **left**, each aligned toward its node. *(Founder call: the charters were 14.5px SVG `<text>` set beside the nodes — unreadable from the back of a room, and the left-hand one ran to the stage edge. The ring was pulled in from radius 200 to 180 to make room.)*
- **Flywheel arrows:** a clockwise cycle Research→Applied→Deployment→Assurance→Research, with the `Deployment → data → Assurance/Research` compounding link emphasized — revealed LAST, together.
- **Takeaway** with the flywheel beat, centered in the band.

## Steps (reveal order — §13: centre → blocks one at a time → arrows last)

**0 — Base:** kicker, slide-no, title, the centre node `BUILT TO COMPOUND`, the faint `India HQ · global field nodes` context, and four empty node positions (faint). Core message centered and at rest.
**1 — Research:** the Research node + its charter card appear together.
**2 — Applied:** appears.
**3 — Deployment:** appears.
**4 — Assurance:** appears.
**5 — The flywheel (payoff):** the clockwise arrows draw and the cycle **turns together** (one `flow` on the loop); the `Deployment → data → Assurance/Research` compounding link emphasizes; the compounds line + takeaway land.

*(5 advance beats after base. Back reverses one node/step at a time; `onLeave` cancels the flywheel `flow` loop.)*

## Copy (exact)

- **Kicker:** `How we build · the org`
- **Title:** **Four labs, one flywheel.**
- **Centre:** `BUILT TO COMPOUND`
- **Lab nodes (label — charter):**
  - **Research** — foundations: adaptation, world-model compression, embodied-assurance science. Publishes.
  - **Applied** — the orchestration, the pipelines, beachhead delivery. Ships.
  - **Deployment** — field systems in customer environments (US/EU). Runs — and captures real-world + failure data.
  - **Assurance** — failure-data engine, safety cases, the standard. Gates adoption.
- **Compounds line:** Deployment's data compounds Assurance (the moat) and Research (better methods). The org *is* the flywheel.
- **Context (persistent):** `India HQ · global field nodes (US/EU deployment + partnerships)`
- **Takeaway (central band):** **An organization designed to compound — not just to ship.**

*(Sentence case for prose; lab labels Archivo bold; `BUILT TO COMPOUND` + context UPPER/mono.)*

## Data / graphics

Inline SVG for the ring (centre disc + `BUILT TO COMPOUND`, four ink lab discs, cycle arrows) over HTML charter cards positioned in design px. Lab names Archivo bold ~20px ink; charters `--secondary` ~16px, wrapping inside the card. Cycle arrows = ink, derived from the node positions rather than hard-coded so the ring can move without stranding them; the `Deployment → Assurance/Research` compounding link drawn heavier. Cards are `--panel` with a hairline border and `--shadow-sm` — mild, never a filled block. No glow; no `--alert`.

## Media slots

None — all native.

## Animations

`scaleIn`/`fadeUp` for each lab node on its beat (one at a time — §13); on the final beat, `drawPath` the cycle arrows then a single `flow` turn of the loop (together), and `fadeUp` the compounds line + takeaway. **Reduced motion:** all four nodes + charter cards + the full cycle arrows shown at rest, compounding link emphasized, text visible. **Cleanup:** `onLeave` cancels the flywheel `flow` loop.

## Acceptance criteria

- **§13 choreography:** centre `BUILT TO COMPOUND` present in base; the four labs reveal ONE AT A TIME (beats 1–4); the flywheel arrows animate LAST, together (beat 5). Not all-at-once.
- **Center-weighted:** cycle vertically centered; the Deployment card ends by y817, clear of the takeaway (§11).
- The compounding return path (Deployment → data → Assurance/Research) is the emphasized element; India-HQ/global-node model present.
- Off-white/ink only, no glow, no `--alert`; base finished; reduced-motion correct; **no loop survives `onLeave`**; no console errors.

## Notes

- This establishes the §13 reveal pattern for the deck's connected diagrams; later system diagrams follow it. (Earlier connected-diagram slides can be retrofitted to §13 in a polish pass.)
- Four nodes only — resist adding boxes. India = HQ + proving/field, not the market (that's slide 13).
