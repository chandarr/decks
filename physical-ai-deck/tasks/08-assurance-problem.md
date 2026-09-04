# Page 08 — Assurance · the problem · "Certification wasn't built for machines that learn"

> Inherits `GLOBAL-INSTRUCTIONS.md` (§11 center-weight; §12 motion-conveys-the-message). Light theme, off-white/ink, no glow. Act II. Deck v3.
> Pillar = **Confidence** (Assurance); this slide carries the *problem* — the approach is slide 09. Reliability is delivered by Assurance (slide 09's harness), not a separate pillar.

## Purpose

Make the confidence gap felt: physical AI can't earn the confidence to deploy in high stakes because (1) the world maps how things *work*, not how they *fail*, and (2) our certification tools were built for static, deterministic software and simply cannot prove a probabilistic system whose model changes every week. Consequence: no confidence, no high-stakes deployment. Sets the mandate — a new way to prove systems that learn — which slide 09 answers.

The one idea: *You can't prove a system that learns with rules made for one that can't — and nobody is even mapping how it fails.*

## Layout (center-weighted — §11)

All content in the central band (y ≈ 190–800); bottom ~20% chrome only.

- **Top chrome:** kicker top-left; slide-no "08" top-right.
- **Title** — Archivo, ~y150–230.
- **Framing line** (the inversion) just under the title, centered.
- **Hero (center):** the **certification mismatch** — a static "CERTIFIED" stamp over a system that keeps evolving; the stamp goes stale as the model updates. Occupies the visual center.
- **Consequence + mandate** line(s) below the hero, within the band.
- **Takeaway** centered ~y740.

## The motion (the argument — §12)

- **Framing motion (the inversion):** a compact operating **envelope** — its center lit (the machine operating), its **edges dark/unmapped**. Reads: we know the middle, nobody maps the failure edges. *(This deliberately sets up slide 09's hero, where those edges get mapped and certified.)*
- **Hero motion (the mismatch):** a rigid `CERTIFIED · static software` stamp lands on the system. Then the system's **model updates** (a small version pulse, `v1 → v2 → v3…`), and the stamp **cracks / greys to `EXPIRED`** — it can't re-apply fast enough. Loop it: every update, the old-style stamp goes stale. The old rulebook visibly can't keep up with a system that learns.

## Steps (reveal order)

**0 — Base:** kicker, slide-no, title, and the operating envelope with a lit center + dark edges (static). Looks intentional.
**1 — The inversion:** the framing line lands; the dark edges of the envelope emphasize — *nobody maps how it fails.*
**2 — The mismatch (hero):** the `CERTIFIED · static software` stamp applies; the model-update pulses begin; the stamp cracks to `EXPIRED` and keeps failing to keep up.
**3 — The consequence + mandate:** the consequence line + the "we must build a new way" mandate; takeaway.

*(3 advance beats after base. Back reverses; `onLeave` cancels the stamp/update loop and any envelope motion.)*

## Copy (exact)

- **Kicker:** `Assurance · the problem`
- **Title:** **Certification wasn't built for machines that learn.**
- **Framing (the inversion):** The whole world is building datasets of how things should work. Almost no one is building how they fail.
- **The mismatch:**
  - Today's safety certification assumes **static, deterministic software** — version-locked, checked once, changed rarely (FMEA, risk registers).
  - A physical-AI system is **probabilistic, and its model updates every week.**
  - So the stamp is stale the moment it's applied.
- **Consequence + mandate:** No failure map, and no certification fit for a system that learns → **no confidence, no high-stakes deployment.** *(A cloud-dependent system can never be certified at all — see slide 05.)* The old rulebook is obsolete. Someone has to build a new way to prove a system that learns.
- **Takeaway (central band):** **You can't prove a system that learns with rules made for one that can't. That's the work — and it's ours.**

*(Sentence case for prose; `CERTIFIED · static software`, `EXPIRED`, `v1 → v2 → v3` in UPPER/mono.)*

## Data / graphics

Native inline SVG. Operating envelope = a rounded region; center a small ink machine mark + a lit fill; edges dashed/dark (`--secondary` at low alpha) to read "unmapped." Stamp = a rounded rect label `CERTIFIED · static software` in ink; its `EXPIRED` state uses `--alert` with a crack/grey treatment. Model-update pulse = small mono `v1→v2→v3` ticks. `--alert` appears only on the `EXPIRED`/failure state — sparse. No glow, no heavy shadow.

## Media slots

None — all native.

## Animations

`fadeUp` (framing/consequence/takeaway); a scripted stamp→pulse→EXPIRED loop for the hero; subtle emphasis on the envelope's dark edges. **Reduced motion:** envelope shown with lit center + dark edges (static); the stamp shown once in its `EXPIRED`/cracked state beside a `v1→v2→v3` sequence (static); all text visible. **Cleanup:** `onLeave` cancels the stamp/update loop and envelope motion.

## Acceptance criteria

- **Center-weighted:** title, framing, hero, consequence, takeaway all in the central band; nothing near the bottom edge (§11).
- The mismatch reads unmistakably: **static-software certification cannot keep up with a weekly-updating probabilistic system** — the stamp visibly goes stale on each update.
- The inversion framing ("how it works" vs "how it fails") is present; the cloud-can't-be-certified callback is a light aside, not a new argument.
- `--alert` confined to the EXPIRED/failure state. Base state looks finished; reduced-motion correct; **no loop survives `onLeave`**; no glow; no console errors.

## Notes

- Pairs with slide 09 (the approach). The dark-edged envelope here becomes the *mapped + certified living envelope* there.
- **For slide 09 (approach) — capture, do not build here:** failure-data engine (world-model rollouts + real deployment) · **reliability harness** (watchdogs, failsafes, collision-awareness, abnormality detection) · proving **lab + standard** (map the boundary, safety cases, *continuous assurance* that re-proves as the model updates) · **certification authority = aspirational long-horizon** (partner TÜV/UL now; never claimed as a near-term status).
- Register: this is the moat's problem statement — sharp and specific; let the stale-stamp motion do the persuading.
