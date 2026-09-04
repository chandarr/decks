# Page 04 — How we engage the two ends · "We make both ends better"

> Inherits `GLOBAL-INSTRUCTIONS.md` (§11 center-weighted; §12 motion-conveys-the-message). Light theme, off-white/ink, no glow. Act I. Deck v3.
> Source: `NARRATION-v2.md` slide 4. Follows slide 03 (we are the orchestrator in the middle).
> **Motion is the message here:** the exchange with both ends is shown as *live information flowing* along dotted lines, not as static bullet lists.

## Purpose

Make the orchestrator role concrete and operational, *through motion*: from us at the centre, information flows out to and back from both ends — feeding frontier labs edge/failure cases and validation, and giving embodiment vendors requirements, failure modes, and roadmap input. Proves "enabler, not competitor," and shows neutrality is an asset both sides value.

The one idea: *We compete with neither end — we make both better, which is why both want us in the middle.*

## Layout (center-weighted, hub-and-flow — §11)

All content in the central band (y ≈ 200–800); bottom ~20% is chrome only.

- **Top chrome:** kicker top-left; slide-no "04" top-right.
- **Title** — Archivo, top of the band.
- **Centre hub:** an ink node `US · THE ORCHESTRATOR` at ≈ (960, 480).
- **Left fan — FRONTIER LABS** (slate): heading ≈ (300, 250). **Four dotted lines** fan from the hub to four labels stacked on the left (x ≈ 300, y ≈ 360 → 660). Three are **outbound** (flow hub→labs); one is a **return** (flow labs→hub), styled distinctly.
- **Right fan — EMBODIMENT VENDORS** (bronze): heading ≈ (1590, 250), mirror layout — four dotted lines from the hub to four right-stacked labels; three outbound (hub→vendors), one return (vendors→hub).
- **Takeaway** centred just under the hub (≈ y720, within the band — NOT bottom-anchored).

Left labels right-anchored toward the hub; right labels left-anchored toward the hub, so all read inward to `US`.

## The flow (motion spec — the core of the slide)

- Each exchange is a **dotted line** from the hub to its label. Use `anim.flow(line, {reverse})` (§12): moving dashes convey directional information flow.
- **Outbound** lines (what we give) flow **hub → end**; the **return** line (what we get) flows **end → hub** (`reverse:true`), so direction encodes meaning. The two-way relationship is legible from the motion alone.
- Outbound lines carry the side tint (slate left / bronze right); the return line is **ink** (it comes back to us). Flow is slow and low-contrast — authoritative, not busy.
- Flow starts when a side is revealed (steps 1–2) and runs continuously until leave; **cancel all flow loops in `onLeave`**.

## Steps (reveal order)

**0 — Base (the hub and its reach):** kicker, slide-no, title, the `US` hub, both headings, and all eight dotted lines drawn but **static and faint**, labels dim. Looks finished: a hub wired to both ends, at rest.
**1 — Into the labs:** left fan activates — labels brighten; `flow` starts on the three outbound lines (hub→labs) and the one return line (labs→hub). Present the frontier-lab exchanges.
**2 — Into the vendors:** right fan activates identically (hub→vendors outbound, vendors→hub return).
**3 — Why it matters:** the takeaway line lands; both fans keep flowing beneath it.

*(3 advance beats after base. Back reverses; on back, pause/stop the flow for a de-activated side. R replays. `onLeave` cancels every flow loop.)*

## Copy (exact)

- **Kicker:** `How we operate`
- **Title:** **We make both ends better.**
- **Centre:** `US · THE ORCHESTRATOR`
- **Left — `FRONTIER LABS` (3 outbound + 1 return):**
  - Real-world edge & failure cases → *(out)*
  - Transfer & adaptation onto embodiments → *(out)*
  - Independent, physical-world model validation → *(out)*
  - Frontier models & early access ← *(return, ink)*
- **Right — `EMBODIMENT VENDORS` (3 outbound + 1 return):**
  - Hardware requirements for real intelligence → *(out)*
  - Field failure modes & fixes → *(out)*
  - Improvement + product-evolution roadmap → *(out)*
  - Bodies to build on & co-design ← *(return, ink)*
- **Takeaway (central band):** **We compete with neither end — we make both better. That's why both want us in the middle.**

*(Sentence case for the exchange labels; UPPER mono for the three headings. The `→ / ←` and "(out)/(return)" are direction cues for the builder, not printed text — direction is shown by the flow.)*

## Data / graphics

Native inline SVG. `US` = filled ink node with an ink label beside it. Eight dotted connectors (`stroke-dasharray` ~ 2 8), fanning from the hub to the stacked labels; outbound lines tinted slate (left) / bronze (right), return lines ink. Labels `--font-body` ~23px in the side tint (outbound) / ink (return); headings Archivo UPPER. No panels, no glow, no shadow. Keep the two fans symmetric and uncrowded (four lines per side, generous vertical spacing).

## Media slots

None — all native.

## Animations

`fadeUp` for labels/takeaway on reveal; `anim.flow(line,{reverse})` per §12 for the dotted lines (outbound normal, return reversed); optional `drawPath` of the lines on base load. **Reduced motion:** lines shown as static dashed connectors with a small arrowhead indicating direction (outbound arrowhead at the end, return arrowhead at the hub); all labels + takeaway visible; no moving dashes. **Cleanup:** cancel every `flow` loop in `onLeave` (and when a side is reversed back).

## Acceptance criteria

- **Center-weighted:** hub vertically centred; both fans, labels, and takeaway in the central band, none near the bottom edge (§11).
- **Motion reads the meaning:** outbound vs. return is unmistakable from flow direction alone; return lines are ink and flow toward the hub.
- Four lines per side (3 out + 1 return); left slate / right bronze / hub + returns ink (consistent with slides 01/03).
- Copy matches exactly; direction cues are NOT printed as text.
- Base state looks finished (wired hub at rest). Reduced-motion fallback correct (static dashed + arrowheads). **No flow loop survives `onLeave`.** No glow; no console errors.

## Notes

- This is the deck's first full expression of §12 (motion = message). Establish the `anim.flow` motion cleanly here; slides 05+ reuse it.
- Continuity: same slate/bronze/ink roles and the same `US` hub as slides 01/03 — this is that spine, now alive.
- Neutrality is an asset *because* both ends get value — the takeaway is the point; let the flow prove it before the words do.
