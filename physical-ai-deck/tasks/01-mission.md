# Page 01 — Mission · "Making physical AI dependable enough to deploy at scale and speed"

> Inherits `GLOBAL-INSTRUCTIONS.md` (incl. §11 safe-zone: center-weighted, nothing critical in the bottom ~20%). Light theme, off-white/ink, no glow. Act I opener — sets the craft bar. Deck v3.
> Source: `DECK-INDEX.md` slide 1.

## Purpose

Open with one unambiguous north-star statement: who we are (the orchestrator between the world's models and its machines) and the three things physical AI needs to spread everywhere — edge, competence, confidence. It must read as clarity and command, not a pitch.

The one idea: *We build the orchestration layer that gives physical AI the edge, competence, and confidence to deploy across every domain.*

## Layout (center-weighted — §11)

All content lives in the central band (y ≈ 200–800 of 1080); bottom ~20% holds only the progress rail / step dots.

- **Top chrome:** kicker top-left (~y72); slide-no "01" top-right.
- **Central stack, vertically centered:**
  1. **Title** (Archivo, large) — upper third of the band.
  2. **Mission statement** (Plex body, ~34px) directly under the title, max ~62 char measure, with *edge · competence · confidence* in ink weight-600.
  3. **The spine diagram**, centered horizontally: `MODELS` ——●—— `MACHINES`, where ● is an ink node (us). On reveal the node labels **ORCHESTRATION** and the three needs sit on it: **Edge · Competence · Confidence**.
  4. **Domains row** (mono, secondary): `Military · Industrial · Consumer` — placed just under the spine, still inside the central band (NOT a bottom footer).

Left end `MODELS` tinted slate (`--accent-b`), right end `MACHINES` bronze (`--accent-a`), center node + needs ink. Keep generous whitespace; this is an opener, not a dense slide.

## Steps (reveal order)

**0 — Base (finished title look):** kicker, slide-no, title, and the quiet spine `MODELS —●— MACHINES` (node unlabeled, ink). Centered, calm.
**1 — The mission:** the mission statement fades up; the center node `scaleIn`s a touch and labels **ORCHESTRATION**; **Edge · Competence · Confidence** fade up on the node (stagger).
**2 — The reach:** the `Military · Industrial · Consumer` row fades up beneath the spine; the closing clause of the mission lands.

*(2 advance beats after base. Back reverses one at a time; R replays.)*

## Copy (exact)

- **Kicker:** `The mission`
- **Title:** **Making physical AI dependable enough to deploy at scale and speed.**
- **Mission statement:** We build the orchestration layer between the world's models and its machines — giving physical AI the **edge** to run where the work happens, the **competence** to do the job well, and the **confidence** to deploy it at scale. So it can spread across every domain, from the hardest military and industrial tasks to everyday life.
- **Spine labels:** `MODELS` · `ORCHESTRATION` · `MACHINES`
- **The three needs (on the node):** `Edge` · `Competence` · `Confidence`
- **Domains row:** `Military · Industrial · Consumer`

*(Sentence case for the mission; UPPER mono for the spine/domain labels.)*

## Data / graphics

Native inline SVG. Spine: a horizontal ink line ~900px wide centered; end nodes small filled dots (slate left, bronze right) with UPPER-mono labels outside; center a filled ink diamond/disc ~26px with `ORCHESTRATION` above and the three needs as three short ink ticks/labels below it. Domains row: three mono words separated by middots, secondary ink, centered. No panels, no shadow, no glow.

## Media slots

None — all native.

## Animations

`fadeUp` (title already at rest in base; mission, needs, domains fade up on their steps); `scaleIn` the center node label group on step 1. Stagger the three needs ~80ms. **Reduced motion:** whole slide at rest — spine labeled, needs and domains visible.

## Acceptance criteria

- **Center-weighted:** nothing essential below y≈840; the primary stack is vertically centered (§11). Verify by eye that the domains row and any closing text are NOT near the bottom edge.
- Base state looks like a finished title slide (spine present, unlabeled node), not a broken page.
- Headline and mission statement match this file character-for-character; *edge/competence/confidence* emphasized.
- Three needs and three domains both present; MODELS slate, MACHINES bronze, orchestration + needs ink.
- Off-white/ink only, no glow; reduced-motion end state correct; no console errors.

## Notes

- **Pillar words (locked):** the three needs are **Edge · Competence · Confidence**, delivered by Adaptation · Autonomy · Assurance. *Reliability* is NOT a pillar — it is an element of Assurance on the way to Confidence (slide 08). Keep each need a single token.
- This is the opener; match the restraint and typographic authority of the whole deck. No four-player swarm here — that is slide 03.
- The `_shared.carry` helper must NOT bottom-anchor on this page; there is no separate carry line — the mission's closing clause is the closer, inside the central band.
