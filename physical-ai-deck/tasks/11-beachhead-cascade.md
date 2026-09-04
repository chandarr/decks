# Page 11 — The advantage of the hardest · "Prove the hardest, and the rest is believed"

> Inherits `GLOBAL-INSTRUCTIONS.md` (§11 center-weight; §12 motion-conveys-the-message). Light theme, off-white/ink, no glow. Act III. Deck v3. (Merges beachhead + cascade.)
> Source: AC framing — this slide states the *advantage* of targeting the hardest/superhuman goal. Follows slide 10 (three A's → superhuman goal).

## Purpose

Make the strategic case for starting at the top of the difficulty stack: prove the integrated system on the hardest, highest-stakes problem, and trust cascades down to every easier grade — plus the supporting advantages (no incumbent, premium value, forces full integration). The cascade is the hero motion.

The one idea: *Prove it where failure is unacceptable, and every easier grade is instantly believed.*

## Layout (center-weighted — §11)

All content in the central band (y ≈ 200–780); bottom ~20% chrome only.

- **Top chrome:** kicker top-left; slide-no "11" top-right.
- **Title** — Archivo, ~y150–230.
- **Difficulty ladder (hero), center-left:** three descending tiers within the band (≈ y300 / 460 / 620): top = hardest (`Space & medical-grade`), middle (`Industrial & automotive-grade`), bottom (`Consumer-grade`). A `PROVEN` marker lands at the top; a **cascade** flows top→down.
- **Advantages (right):** three crisp callouts stacked (≈ x1220), each a bold line, revealed after the cascade.
- **Takeaway** centered ~y740 (within band).

## The motion (the argument — §12)

- **Prove at the top:** a `PROVEN` marker forms on the hardest tier (the superhuman beachhead) — where failure is unacceptable.
- **The cascade (hero):** a proven/trust wave flows **down** the ladder, lighting `Industrial & automotive-grade` then `Consumer-grade` in turn. The downward motion is the argument: prove hardest, and everything easier is believed without re-proving.
- Advantages `fadeUp` after the cascade — no extra motion (motion only where it adds value).

## Steps (reveal order)

**0 — Base:** kicker, slide-no, title, the ladder (three tiers labeled, top = hardest), advantages faint. Intentional.
**1 — Prove the hardest:** `PROVEN` marker lands on the top tier; the "where failure is unacceptable" line.
**2 — Trust cascades down (hero):** the wave flows down, lighting the two lower tiers; the cascade line.
**3 — The advantages:** the three advantage callouts fade up.
**4 — The line:** takeaway lands.

*(4 advance beats after base. Back reverses; `onLeave` cancels any cascade loop — the cascade is a one-shot; nothing should loop.)*

## Copy (exact)

- **Kicker:** `Why the hardest first`
- **Title:** **Prove the hardest — the rest is believed.**
- **Ladder tiers (top→bottom):** `Space & medical-grade` · `Industrial & automotive-grade` · `Consumer-grade`
- **Prove line:** We prove the integrated system where failure is unacceptable.
- **Cascade line:** Proven at the top, and every easier grade is instantly believed — no re-proving from scratch.
- **Advantages:**
  - **No incumbent** — nobody has done the impossible, so there's no data moat to beat.
  - **Premium value** — high-stakes tasks command it; not a race to the bottom on cost.
  - **It forces the whole system** — the hardest problem has no slack; it proves all three A's together.
- **Takeaway (central band):** **Solve the top of the difficulty stack once — trust, and the platform, cascade to everything below.**

*(Sentence case for prose; ladder grade labels + `PROVEN` UPPER/mono; advantage lead-ins bold.)*

## Data / graphics

Native inline SVG. Ladder = three stacked tiers (rounded bars or steps), top the largest/darkest (hardest), descending. `PROVEN` = an ink badge on the top tier. Cascade = a downward ink sweep/highlight lighting each lower tier's fill in turn (grey→ink or dim→lit). Advantages = three ink lines with bold lead-ins. No panels beyond simple tiers; no glow; no `--alert` (this is an advantage slide — confident).

## Media slots

None — all native.

## Animations

A one-shot downward cascade (dim→lit per tier, staggered) + `PROVEN` `scaleIn`; `fadeUp` for lines and the three advantages. **Reduced motion:** ladder fully lit with `PROVEN` on top and all tiers "believed"; advantages + takeaway visible; no sweep. **Cleanup:** nothing loops; `onLeave` trivial.

## Acceptance criteria

- **Center-weighted:** ladder, advantages, and takeaway within the central band; the bottom (`Consumer-grade`) tier is NOT near the bottom edge of the frame (§11) — keep the ladder compact (~y300–660).
- The cascade reads top→down and clearly means "prove hardest → everything easier is believed."
- Three advantages present; the "forces all three A's" one ties back to slide 10.
- Off-white/ink only, no glow, no `--alert`; base finished; reduced-motion correct; no console errors.

## Notes

- This is the strategic payoff of Act III — the "why the hardest" advantage. It hands to Act IV (how we build it: team, India, execution, IP, roadmap).
- Uses AC's medical/space-grade → automotive/consumer-grade analogy. Keep the ladder to three tiers for legibility from the back.
