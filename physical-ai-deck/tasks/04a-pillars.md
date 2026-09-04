# Page 04a — The three pillars · "Adaptation · Autonomy · Assurance"

> Inherits `GLOBAL-INSTRUCTIONS.md` (§11 center-weight; §12 motion conveys the message; §13 reveal — frame first, cards one at a time). Light theme, off-white/ink, no glow. **Opens Act II** (the "how"). Deck v3.
> **NEW slide** (inserted after 04). Purpose: make the three pillars unmistakable up front, before we take each one in turn. This is the reference/overview page the whole act hangs on.

## Purpose

Name the method plainly: three pillars — **Adaptation**, **Autonomy**, **Assurance** — each delivering one of the three needs the machine must have (**Edge**, **Competence**, **Confidence**). One clean overview page with three cards, so the founder holds the whole framework in his head before we go deep. Every following slide in Act II is "one pillar, up close."

The one idea: *Three pillars turn probabilistic models into dependable machines: Adaptation → Edge, Autonomy → Competence, Assurance → Confidence.*

## Layout (center-weighted, three-card — §11)

All content in the central band (y ≈ 180–840); bottom ~20% chrome only.

- **Top chrome:** kicker top-left; slide-no "04a" top-right (or "05" if renumbered).
- **Title** — Archivo, top of the band.
- **Framing line** under the title, centered (`--secondary`).
- **Three cards**, equal, side by side across the central band (card centres ≈ x 480 / 960 / 1440; card box ≈ 520w × 380h; tops ≈ y360). Each card:
  - **Numeral** faint top-left of the card (`01` / `02` / `03`).
  - **Pillar word** — Archivo large (the card title): `ADAPTATION` / `AUTONOMY` / `ASSURANCE`.
  - **Delivers-chip** — a small mono line beneath: `delivers the EDGE` / `delivers COMPETENCE` / `delivers CONFIDENCE`.
  - **Three bullets** — crisp, `--secondary`/`--ink`, one line each.
  - A thin accent underline under the pillar word (ink hairline — keep pillars **ink/graphite**, NOT the model/embodiment bronze/slate, to avoid color-coding confusion).
- **Carry line** centered below the cards (within band, ≤ y820): the hand-off to the act.

## Steps (reveal order — §13, one card at a time)

**0 — Base:** kicker, slide-no, title, framing line, and three **empty card frames** (faint outlines) — the structure, waiting to fill.
**1 — Adaptation:** card 1 fills (numeral, word, chip, bullets) — `fadeUp` / draw.
**2 — Autonomy:** card 2 fills.
**3 — Assurance:** card 3 fills.
**4 — The carry:** the carry line fades up.

*(4 advance beats after base. Cards fill left→right so the presenter narrates each. Back reverses; no loops.)*

## Copy (exact)

- **Kicker:** `The method`
- **Title:** **Three pillars turn models into dependable machines.**
- **Framing:** Each pillar delivers one thing the machine must have — the edge, the competence, the confidence.
- **Cards:**
  - **01 · ADAPTATION** — `delivers the EDGE`
    - Fit any model to any body — on the device, in real time.
    - Compress and optimize to run offline, at the edge.
    - Tune to the specific task, workspace, and environment.
  - **02 · AUTONOMY** — `delivers COMPETENCE`
    - Learns the job: qualified, trained, harnessed to the task.
    - Improves from feedback — shown or told, visual or verbal.
    - Every correction becomes policy — it keeps evolving in the field.
  - **03 · ASSURANCE** — `delivers CONFIDENCE`
    - A reliability harness: watchdogs, failsafes, collision & abnormality awareness.
    - A living certified envelope — not a one-time stamp.
    - A proving lab and a standard now; certification authority over time.
- **Carry line:** **Adaptation, Autonomy, Assurance — we take each one next.**

*(Sentence case for bullets/prose; pillar words + delivers-chips UPPER/mono. Bullets one line each — trim before shrinking type.)*

## Data / graphics

Native inline SVG/HTML. Three equal cards: `--panel` fill, 1px `--hairline` border, rounded ~8px, generous internal padding. Numerals faint mono top-left. Pillar words Archivo ~34px `--ink`, thin ink underline. Delivers-chip mono ~15px `--secondary`. Bullets ~18px, tight leading, one line each. **Keep all three cards ink/graphite** — no bronze/slate here (those are reserved for model/embodiment on slides 03/04). No glow, no shadow.

## Media slots

None — all native.

## Animations

`fadeUp` per card (one at a time, §13) — numeral, word, chip, bullets in a quick internal stagger; `fadeUp` the carry line. **Reduced motion:** all three cards filled + carry line visible at rest. **Cleanup:** trivial; no loops.

## Acceptance criteria

- **§13:** three cards fill **one at a time** (left→right), not all at once; base shows three empty frames.
- Three pillars, each with its delivers-need (Edge/Competence/Confidence) and exactly three bullets matching this file.
- Pillars rendered ink/graphite (no bronze/slate); cards equal and balanced; legible from the back.
- **Center-weighted (§11):** cards + carry within the central band; nothing near the bottom edge.
- Off-white/ink only, no glow; reduced-motion end state correct; no console errors.

## Notes

- This is the **overview**; the three dividers (04b / 06a / 07a) each zoom into one card and open that pillar's slides. Visual continuity: the divider's pillar word should feel like card N enlarged.
- Opens Act II — set `deckConfig.actMarkers` so Act II starts here. New markers: `[4, 13, 15, 20]` (0-based, in the new build-order sequence).
- Do not over-explain here — this page is a clean map, not the deep dive. The depth is in 05–09.
