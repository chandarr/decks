# Page 05 — Adaptation · the problem · "Cloud-first is a non-starter"

> Inherits `GLOBAL-INSTRUCTIONS.md` (§11 center-weight; §12 motion-conveys-the-message). Light theme, off-white/ink, no glow. Act II. Deck v3.
> Source: `DECK-INDEX.md` slide 05; AC direction: dependability (not just lag) — cloud has too many failure points to ever be claimed reliable; unlike the LLM era you cannot start-cloud-and-migrate; edge is mandatory from day one. Then three gap cards.

## Purpose

Establish, viscerally, that for physical AI the edge is not an optimization but a hard requirement — because a cloud-dependent machine rides a chain of failure points it doesn't control, so it can never be *claimed* reliable (or certified). Then show that even committed to the edge, the adaptation layer nobody owns has three gaps. Hands directly to slide 06 (our approach).

The one idea: *Cloud-first can't be made dependable, so the edge is mandatory — and the edge layer that makes intelligence fit the machine doesn't exist yet.*

## Layout (center-weighted — §11)

All content in the central band (y ≈ 190–800); bottom ~20% chrome only.

- **Top chrome:** kicker top-left; slide-no "05" top-right.
- **Title** — Archivo, ~y150–230.
- **Framing strip (the "why edge") ~y280–390:** a compact horizontal **failure chain** and, beneath it, two one-liners (the hiccup line + the LLM knife).
- **Three gap cards** — a centered row, ~y430–720, equal cards (same edges/padding), each = an **animated icon** (top) + a **bold short title** + **one line**.
- **Takeaway** centered ~y760 (within the band).

## The motion (the argument — §12)

**Beat-1 framing — the chain of failure:** a left-to-right dotted chain of small nodes `MACHINE · network card · connectivity · DNS · server · MODEL`, with `anim.flow` sending information outward. Then **one link breaks** — its node/segment turns `--alert`, the line snaps to a gap, the flow halts, and a small "loop dropped" mark blinks at the MACHINE. It cycles, breaking a *different* link each pass. The point reads without words: not slow — *undependable*, and you own none of the links.

**Beat-2 — three gap cards**, each with a small continuous icon motion (subtle, reduced-motion-aware, cancelled on leave):
- **No conductor:** three nested arcs (reflex/reactive/reasoning) rotating at different speeds, visibly **out of sync / clashing**.
- **No fit:** an oversized model block **straining against a small device outline** — pulses, never fits.
- **No compression for machines:** small perception frames **streaming in and overflowing** a container.

**Beat-3 — takeaway** fades up; the chain and card icons keep their quiet motion beneath it.

## Steps (reveal order)

**0 — Base:** kicker, slide-no, title, and the failure chain drawn but **static** (flow off, no break yet). Three card frames hidden. Looks intentional — the thesis and the chain at rest.
**1 — Why edge:** `anim.flow` starts on the chain, then the break-cycle begins; the two framing one-liners fade up.
**2 — The three gaps:** the three cards `scaleIn`/`fadeUp` in (stagger ~120ms), each icon's motion starting as it lands. *(Option: split into three beats, one card each, if AC wants to pace — keep order.)*
**3 — The gap we own:** takeaway line lands.

*(3 advance beats after base. Back reverses; `onLeave` cancels the chain flow, the break-cycle, and all three card-icon loops.)*

## Copy (exact)

- **Kicker:** `Adaptation · the problem`
- **Title:** **Cloud-first is a non-starter.**
- **Framing one-liners:**
  - **The hiccup line:** A chatbot's hiccup is a retry. A machine's hiccup is a failure in the world.
  - **The LLM knife:** ~~LLM era: start in the cloud, move to the edge later.~~ **Physical AI: the edge, from day one.**
- **Chain labels (small):** `MACHINE · network card · connectivity · DNS · server · MODEL`
- **Gap cards:**
  - **No conductor** — Reflex, reactive, and reasoning run at three different timescales, and nothing makes them work together.
  - **No fit** — Models are too big for the machine, and shrinking them to the body and the job is ad hoc.
  - **No compression for machines** — Perception drowns training storage and clogs the edge — codecs are built for human eyes, not machines.
- **Takeaway (central band):** **Nobody owns the layer that makes intelligence fit the machine. That's the gap we build.**

*(Sentence case for prose; the LLM-knife's first clause is struck through, second clause ink-bold; UPPER mono for chain labels.)*

## Data / graphics

Native inline SVG/HTML. Failure chain: 6 small nodes on a dotted baseline; the two end nodes (`MACHINE`, `MODEL`) ink, the middle hops `--secondary`; break state uses `--alert` on the failing node + a gapped segment. Cards: `.panel`-style with hairline border, equal size, same inner padding; icon area ~120px at top drawn in ink line-work; title Archivo bold ~26px; body `--secondary` ~19px. `--alert` appears only on the chain break and (optionally) a faint accent on the card icons' "problem" state — keep it sparse. No glow, no shadow beyond the token `--shadow-sm` on cards.

Icon construction (all ink line-work, small loops):
- No conductor: 3 concentric arcs each rotating (`flow` on a circular path or a slow `rotate`) at different rates, phases offset → reads as desync.
- No fit: a large rounded-rect (model) inside/over a smaller device rect; a subtle scale pulse on the large block so it visibly won't fit.
- No compression: 3–4 tiny "frame" rects streaming from top into a small tray that visibly overflows (loop).

## Media slots

None — all native.

## Animations

`anim.flow` (chain) + a scripted break-cycle (timed, cancellable); `scaleIn`/`fadeUp` for cards and one-liners; three small icon loops. **Reduced motion:** chain shown with one link statically broken (`--alert`) and a static "dropped" mark; card icons shown in their representative static state (arcs frozen offset, model clipped by the small frame, tray overflowing); all text visible. **Cleanup (critical):** `onLeave` cancels the chain flow, the break-cycle timer, and all three card-icon loops — nothing keeps running off-slide.

## Acceptance criteria

- **Center-weighted:** title, framing strip, three cards, and takeaway all within the central band; nothing near the bottom edge (§11).
- The framing reads as **dependability**, not latency: a broken link halts the machine; the "you own none of the links" point is unmistakable from the motion.
- The LLM knife is present and clearly contrasts LLM-era (struck through) vs physical AI.
- Exactly three equal cards, crisp title + one line each, each with a small purposeful icon motion; copy matches this file.
- Base state looks finished (thesis + static chain). Off-white/ink (+ sparse `--alert`), no glow. Reduced-motion fallback correct. **No loop survives `onLeave`.** No console errors.

## Notes

- This slide is Act II's opener and the first "problem" slide — motion does the persuading; keep the text crisp (cards are labels, not paragraphs).
- Hands to slide 06 (our approach): the takeaway's "the gap we build" is the bridge.
- Dependability here also seeds Assurance/Confidence (slide 08): a cloud-dependent system can never be *certified* reliable.
