# Page 07 — Autonomy = Competence · "Competence is trained, not pre-trained"

> Inherits `GLOBAL-INSTRUCTIONS.md` (§11 center-weight; §12 motion-conveys-the-message). Light theme, off-white/ink, no glow. Act II. Deck v3.
> Source: `DECK-INDEX.md` slide 07. Pillar = **Competence** (Autonomy). Reliability lives in Assurance (slide 08), not here.

## Purpose

Show that competence — being genuinely good at the job — is *developed like a worker* and *never stops evolving*, not manufactured by a bigger pre-train. The hero motion is a continuous-improvement loop where a human correction changes the machine's *policy*, not just its next move. This is a process-and-loop, not a card set.

The one idea: *Competence is trained, harnessed, and evolved on the job — never just pre-trained.*

## Layout (center-weighted, progression → loop — §11)

All content in the central band (y ≈ 190–800); bottom ~20% chrome only.

- **Top chrome:** kicker top-left; slide-no "07" top-right.
- **Title** — Archivo, ~y150–230.
- **The development track (hero):** a horizontal line across the centre (~y470) with **four stations** left→right; the fourth station is a **circular loop** (the evolving stage). Station labels above, one-line subs below the line.
- **The foil:** a compact vignette at the upper-left/above the track — a big model node with a `PRE-TRAINING DATA` firehose pouring in and a small "still fumbles the job" mark. It recedes (dims) once the track builds.
- **Takeaway** centred ~y740 (within band).

## The motion (the argument — §12)

- **Foil motion:** the firehose `flow`s data into the big model; the model strains; a small `✗` "still fumbles the job" beat. Reads: pre-training alone ≠ competence.
- **Track build:** the four stations light left→right (`drawPath` the connecting line + `fadeUp` labels).
- **The evolving loop (hero):** at station four, a closed loop turns; a **correction pulse** (spoken/shown) travels *into* a central `POLICY` node and the machine's **output visibly improves** (a small before→after tick), and the loop keeps turning. The motion must show the correction entering the *policy* (how it works), not just nudging one action. This continuous turn is the point: competence never finishes.

## Steps (reveal order)

**0 — Base:** kicker, slide-no, title, and the empty development track (four station markers on the line, the fourth drawn as a loop). Static, intentional.
**1 — The foil:** the pre-training firehose floods the big model → it still fumbles. (Then this vignette dims but stays faint as the contrast.)
**2 — How competence is actually built:** the four stations light left→right with their labels — Qualified → Trained & harnessed → Shown how → Keeps evolving.
**3 — It never stops (hero):** the fourth-station loop runs — correction → policy → improved output, looping.
**4 — The line:** takeaway lands; the loop keeps its quiet turn beneath it.

*(4 advance beats after base. Back reverses; `onLeave` cancels the firehose flow and the evolving-loop motion.)*

## Copy (exact)

- **Kicker:** `Autonomy · competence`
- **Title:** **Competence is trained, not pre-trained.**
- **Foil:** `The industry's bet: more pre-training data.` — *It has read everything, and still fumbles the job.*
- **Track stations (label — sub):**
  1. **Qualified** — a foundation model: base competence.
  2. **Trained & harnessed** — tuned for the job, given its tools.
  3. **Shown how** — learns the task by demonstration.
  4. **Keeps evolving** — corrections become part of how it works.
- **Loop label:** A spoken or shown correction updates the **policy** — not just the next move.
- **Takeaway (central band):** **Competence is trained, harnessed, and evolved on the job — never just pre-trained.**

*(Sentence case for prose; station labels Archivo bold; `PRE-TRAINING DATA` and `POLICY` UPPER mono.)*

## Data / graphics

Native inline SVG. Development track = an ink baseline with four station nodes; stations 1–3 small ink discs, station 4 a ~90px ink loop (circle with an arrowhead) containing/adjacent to a `POLICY` node. Foil = a larger `--secondary` model block with a dotted firehose from a `PRE-TRAINING DATA` label; the `✗` and "fumbles" mark in `--alert` (its one use here). The correction pulse = a small ink token traveling the loop into `POLICY`; the "improved output" = a tiny before→after mark (e.g., a wobble that straightens). No glow, no heavy shadow; `--alert` only on the foil's fumble mark.

## Media slots

None — all native.

## Animations

`flow` (firehose; loop circulation); `drawPath` (track line) + `fadeUp` (labels, takeaway); a scripted correction-pulse→policy→output-improves beat on station four. **Reduced motion:** foil shown static (data-fed model + static `✗`); track fully lit; the loop shown as a closed cycle with the correction arrow into `POLICY` and an "improved" output state, static; all text visible. **Cleanup:** `onLeave` cancels the firehose flow and the loop circulation.

## Acceptance criteria

- **Center-weighted:** track, stations, loop, and takeaway within the central band; nothing near the bottom edge (§11).
- The hero reads unmistakably: a correction enters the **policy** and the machine improves, and the loop **keeps turning** (competence never finishes).
- The foil (pre-training firehose → still fumbles) is present and clearly the contrast; `--alert` used once.
- Not cards — a progression that ends in a living loop. Copy matches this file.
- Base state looks finished; reduced-motion fallback correct; **no loop survives `onLeave`**; no glow; no console errors.

## Notes

- Continuity: this builds slide 02's "learns from feedback" capability, uses your exact "trained & harnessed" language, and keeps the slide-05/06 edge model *competent* over time.
- Pillar is **Competence**, not Reliability — do not use "reliable/reliability" as the theme here (that's slide 08 / Assurance).
- Register: this is the most "human" slide in Act II — let the worker-arc + the never-ending loop carry the warmth; keep text spare.
