# Page 16 — Roadmap · build & prove · "Every stage is a thing that works"

> Inherits `GLOBAL-INSTRUCTIONS.md` (§11 center-weight; §12 motion; §13 reveal one-at-a-time). Light theme, off-white/ink, no glow. Act IV close. Deck v3.
> Rebuilt for v3: build-and-prove sequence — NO TAM, NO valuation curve, NO Composer keystone. Each stage is a working system that earns the next.

## Purpose

Sequence the plan as concrete, working milestones — not slideware. Each stage stands on its own and earns the next: prove hardest, ship a real deployment, generalize to a platform, set the standard, extend to environments. Revenue is woven in lightly as "how each stage stands on its own," never as a valuation story.

The one idea: *Each stage is a working system that earns the next — proof, not slideware.*

## Layout (center-weighted, timeline — §11, §13)

All content in the central band (y ≈ 220–760); bottom ~20% chrome only.

- **Top chrome:** kicker top-left; slide-no "16" top-right.
- **Title** — Archivo, ~y160–240.
- **Horizontal timeline** at ≈ y470 with **five stations** left→right; each = a stage label (above) + a one-line deliverable + a one-line **proof** (below). Keep labels within the band.
- **Takeaway** centered ~y720.

## Steps (reveal order — §13, one at a time)

**0 — Base:** kicker, slide-no, title, the empty timeline axis with five faint station marks. Intentional.
**1–5 — Each stage:** the timeline `drawPath` extends to the next station and the stage reveals (label + deliverable + proof), one per beat — presenter narrates each.
**6 — The line:** takeaway lands.

*(6 advance beats after base. Back reverses one stage at a time; no persistent loops.)*

## Copy (exact)

- **Kicker:** `How we build · the roadmap`
- **Title:** **Every stage is a thing that works.**
- **Stages (label — deliverable — proof):**
  1. **Beachhead** — the three A's, integrated on one hardest problem. *Proof: it works where it's hardest.*
  2. **Lighthouse** — a real deployment running in the field (US/EU). *Proof: it works for a customer — and earns (services).*
  3. **Generalize** — the same orchestration across more bodies and tasks. *Proof: a platform, not a project.*
  4. **The standard** — the proving lab + standard others adopt. *Proof: we set the terms of trust.*
  5. **Environments** — compose whole systems, not single machines. *Proof: the horizon.*
- **Takeaway (central band):** **No slideware milestones — each stage is a working system that earns the next.**

*(Sentence case for prose; stage labels Archivo bold; "Proof:" lines italic `--secondary`. No dates unless AC sets them; keep timing relative — stages, not quarters.)*

## Data / graphics

Native inline SVG. Timeline = an ink baseline with five station nodes; each node small ink; the line extends station-by-station on reveal. Optional tiny revenue-mode chips under stages 2–4 (`services` · `orchestration` · `assurance`) in mono — light, NOT a valuation stair. No glow, no `--alert`, no ascending "$" bars.

## Media slots

None — all native.

## Animations

`drawPath` (axis extends to each station, one at a time — §13) + `fadeUp` (stage label/deliverable/proof); `fadeUp` takeaway. **Reduced motion:** full timeline + all five stages + takeaway shown at rest. **Cleanup:** trivial.

## Acceptance criteria

- **§13:** stages revealed one at a time as the timeline extends; not all-at-once.
- **Center-weighted:** timeline + stage labels + takeaway within the central band; nothing near the bottom edge (§11).
- **No TAM, no valuation curve, no Composer** — build-and-prove only; each stage names a concrete proof.
- Timing stays relative (stages, not dates) unless AC provides dates. Off-white/ink only, no glow; base finished; reduced-motion correct; no console errors.

## Notes

- Continuity: beachhead = slides 10/11; the standard = slide 09; generalize/platform = the orchestration from slides 04/06; environments = slide 18.
- The founder owns funding — this is a build plan, not a raise plan. Keep revenue mentions as "stands on its own," not as a fundraising sequence.
