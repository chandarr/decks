# Page 09 — Assurance · our approach · "A new way to prove a machine that learns"

> Inherits `GLOBAL-INSTRUCTIONS.md` (§11 center-weight; §12 motion-conveys-the-message; §4 evidence-tier chips). Light theme, off-white/ink, no glow. Act II. Deck v3.
> Pairs with slide 08 (the problem). The dark-edged envelope + `EXPIRED` static stamp from slide 08 become the *mapped, guarded, living-certified* envelope here — that contrast is the payoff.

## Purpose

Answer slide 08's mandate: build the new way to prove a probabilistic system that keeps learning. Four deliverables, tiered honestly — three near-term (failure-data engine, reliability harness, proving lab + standard) and one long-horizon (the certification authority). Reliability lives here as the runtime harness. The living certified envelope carries the whole argument.

The one idea: *Map how it fails, guard it at runtime, and re-prove it as it learns — that's confidence you can certify.*

## Layout (center-weighted — §11)

All content in the central band (y ≈ 190–800); bottom ~20% chrome only.

- **Top chrome:** kicker top-left; slide-no "09" top-right.
- **Title** — Archivo, ~y150–230.
- **Hero envelope** — center-left (≈ x560, y500), the operating envelope from slide 08, evolving as each deliverable is added (edges map, a guard ring, a living `PROVEN` seal, a faint outer authority ring).
- **Four deliverable labels** — stacked right (≈ x1180, y ~340→680), each = a bold title + one line + an evidence-tier chip; each lights as its envelope element activates.
- **Takeaway** centered ~y740 (within band).

## The motion (the argument — §12; each beat evolves the same envelope)

- **Failure-data engine:** the envelope's **dark edges get mapped** — points light along the boundary from two sources (dense world-model rollouts + sparse real-deployment ground truth). *(Fixes slide 08's unmapped edges.)*
- **Reliability harness:** a **guard ring** appears just inside the boundary; a small **catch** motion — the machine drifts toward an edge and the harness stops it. Runtime guardians.
- **Proving lab + standard:** a `PROVEN` seal forms on the envelope; then a **model-update pulse** (`v1→v2`) and the envelope **re-proves** — the seal refreshes instead of expiring. *(Direct payoff to slide 08's `EXPIRED` stamp: living, continuous assurance.)*
- **Certification authority:** a **faint outer ring** appears, labeled long-horizon/aspirational — clearly a later tier, not a current claim.

## Steps (reveal order)

**0 — Base:** kicker, slide-no, title, the operating envelope (lit center, edges present) and four faint deliverable slots. Intentional.
**1 — Map how it fails:** failure-data engine — edges map; label 1 lights (`NEAR-TERM`).
**2 — Guard it at runtime:** reliability harness — guard ring + catch; label 2 lights (`NEAR-TERM`).
**3 — Prove it, and keep proving it:** proving lab + standard — `PROVEN` seal, then re-proves on model update (living); label 3 lights (`NEAR-TERM`). *(The payoff beat.)*
**4 — The horizon + the line:** certification authority — faint outer ring; label 4 (`ASPIRATIONAL`); takeaway lands.

*(4 advance beats after base. Back reverses; `onLeave` cancels the re-prove loop, the catch motion, and any boundary-mapping loop.)*

## Copy (exact)

- **Kicker:** `Assurance · our approach`
- **Title:** **A new way to prove a machine that learns.**
- **Deliverables (title — line — tier):**
  1. **Failure-data engine** — map how it fails: dense world-model rollouts + real-deployment ground truth. `NEAR-TERM`
  2. **Reliability harness** — runtime guardians keep it inside the envelope: watchdogs, failsafes, collision-awareness, abnormality detection. `NEAR-TERM`
  3. **Proving lab + standard** — characterize the boundary, build the safety case, and re-prove continuously: "this embodiment + this model version + this application = proven." `NEAR-TERM`
  4. **Certification authority** — as the standard is adopted, the authority emerges. We set the standard and partner with TÜV / UL now; the authority is earned later. `ASPIRATIONAL`
- **Takeaway (central band):** **Map how it fails, guard it at runtime, and re-prove it as it learns — confidence you can certify. Today the standard; tomorrow the authority.**

*(Sentence case for prose; deliverable titles Archivo bold; `PROVEN`/`v1→v2` UPPER mono; tier chips per §4.1 — `NEAR-TERM` solid ink, `ASPIRATIONAL` dashed hairline.)*

## Data / graphics

Native inline SVG. Reuse slide 08's envelope geometry so the two read as before→after. Boundary map = small ink points along the envelope edge. Guard ring = a thin inner ink ring; the "catch" = a small mark that stops at the ring. `PROVEN` seal = an ink rounded badge; re-prove = a quick refresh/redraw on the model-update pulse (NOT a crack — the opposite of slide 08). Authority ring = a faint dashed outer ring, `--secondary`. Tier chips per §4.1. No `--alert` here (this is the resolution — calm). No glow.

## Media slots

None — all native.

## Animations

`fadeUp` (labels/takeaway); boundary-point mapping; the harness catch; the `PROVEN`→re-prove refresh loop (tie to a `v1→v2` pulse); `scaleIn` the faint authority ring. **Reduced motion:** envelope shown fully resolved — edges mapped, guard ring present, a static `PROVEN` seal with a `v1→v2 ✓ re-proven` note, faint authority ring; all labels + tier chips + takeaway visible. **Cleanup:** `onLeave` cancels the re-prove loop, catch, and mapping motion.

## Acceptance criteria

- **Center-weighted:** envelope, four labels, and takeaway within the central band; nothing near the bottom edge (§11).
- Clear **before→after** with slide 08: dark edges → mapped; `EXPIRED` static stamp → living `PROVEN` seal that refreshes on update.
- Four deliverables present with correct tiers: three `NEAR-TERM`, the certification authority `ASPIRATIONAL` (never claimed as current status).
- Reliability harness lists watchdogs · failsafes · collision-awareness · abnormality detection.
- No `--alert`; copy matches this file. Base state finished; reduced-motion correct; **no loop survives `onLeave`**; no glow; no console errors.

## Notes

- The certification-authority tiering is the weak-joint fix from `01-ASSUMPTIONS.md` — keep it visibly aspirational; near-term we are a proving lab + standard, partnering with existing bodies.
- This is the moat's approach slide — the living envelope is the single most important motion in the deck; give it the craft.
- Reliability now lives here (the harness), not in slide 07 — keep the split clean.
