# Page 05 — Adaptation · the problem · "Cloud-first is a non-starter"

> Inherits `GLOBAL-INSTRUCTIONS.md` (§11 center-weight; §12 motion-conveys-the-message; §13 reveal one-at-a-time). Light theme, off-white/ink, no glow. Act II. Deck v3.
> Source: `DECK-INDEX.md`; AC direction: dependability (not just lag) — cloud has too many failure points to ever be claimed reliable; unlike the LLM era you cannot start-cloud-and-migrate; edge is mandatory from day one. Then three gap cards.
> **Rebuilt to fix alignment bugs in the current build:** (a) the failure chain was flush to x=0 so `LOOP DROPPED` clipped off the left; (b) the two framing lines overlapped and were clipped by the card tops; (c) the chain break read as a large empty void. This rewrite gives **hard, non-overlapping coordinate bands** and an explicit anti-collision rule.

## Purpose

Establish, viscerally, that for physical AI the edge is a hard requirement — a cloud-dependent machine rides a chain of failure points it doesn't control, so it can never be *claimed* reliable (or certified). Then show the edge-adaptation layer nobody owns has three gaps. Hands to slide 06 (our approach).

The one idea: *Cloud-first can't be made dependable, so the edge is mandatory — and the edge layer that makes intelligence fit the machine doesn't exist yet.*

## Layout — HARD coordinate bands (1920×1080; §11)

**These bands must not overlap. Text in one band may never enter another band's y-range.** Left/right content margin = **x ∈ [140, 1780]**. Nothing critical below y840.

| Band | y-range | Contents |
|---|---|---|
| Chrome | 40–90 | kicker (x140) top-left; slide-no "05" top-right (right edge ≤ x1780); any global nav chip (e.g. OVERVIEW) must be fully on-stage, not clipped. |
| **Title** | 110–200 | `Cloud-first is a non-starter.` (Archivo, x140). |
| **The chain + verdict** | 250–440 | failure chain (baseline y≈310, labels y≈350), `LOOP DROPPED` tag, and the two framing lines — ALL inside this band, all inset ≥ x140. Band bottom hard stop y440. |
| **Three gap cards** | **490–780** | equal card row; card top ≥ y490, card bottom ≤ y780. **Cards own this band exclusively.** |
| **Takeaway** | 800–840 | one line, centered, within safe zone. |

**Anti-collision rule (critical):** the chain/verdict band ends at y440 and the cards begin at y490 — a mandatory ≥50px gutter. If the framing text would exceed y440, **shorten the text** (drop to the hiccup line only and demote the LLM-knife to the takeaway) — never let it grow into the card band. The card band top is a hard wall.

### The chain (inset — fixes the clip)

- 6 nodes evenly spaced across x ∈ [180, 1740] on a dotted baseline at y≈310: `MACHINE · network card · connectivity · DNS · server · MODEL`. End nodes (`MACHINE`, `MODEL`) ink; middle hops `--secondary`. Labels centered **under** each node at y≈350 (mono, small); the `MACHINE` label left edge ≥ x140 and the `MODEL` label right edge ≤ x1780 — **no label clips the stage**.
- `LOOP DROPPED` tag: `--alert`, mono, placed **above** the broken segment (not at the far-left edge) with its left edge ≥ x150 — never clipped. Anchor it to whichever segment is currently broken.
- The **break** is a *styled segment*, not a big void: keep node spacing even; the broken link shows as a short gapped segment with an `--alert` ✕ over it. It should read as "a link snapped," not "a layout hole."

### Framing lines (inside the chain band, below the labels)

- **Hiccup line** at y≈400 (x140, `--secondary`/ink): `A chatbot's hiccup is a retry. A machine's hiccup is a failure in the world.`
- **LLM-knife** at y≈435 (x140): ~~`LLM era: start in the cloud, move to the edge later.`~~ **`Physical AI: the edge, from day one.`** — struck first clause `--secondary`, bold second clause ink. Keep on ONE line; if it can't fit above y440, move this line to the takeaway slot and leave only the hiccup line here.

### Cards (own y 490–780)

Three equal cards, same size/edges/inner padding, centered across x∈[140,1780] (≈ 520w each, ~40px gaps). Each: icon area (top, ~110px) + bold title + one line. Card top ≥ y490 (a hard wall — never let framing text cross it).

## Steps (reveal order — §13, cards one at a time)

**0 — Base (the chain is already live):** chrome, title, the two framing lines, and the chain **in motion** — `anim.flow` running and the break-cycle snapping a *different* link each pass, the ✕ and `LOOP DROPPED` tag travelling with it. Card band empty. *(Founder call: what used to be beat 1 is folded into the base — landing on the slide must show the argument, not a still frame waiting for a key press.)*
**1 — The three gaps:** the cards fill (`scaleIn`, small stagger) and their icon loops start.
**2 — The gap we own:** takeaway lands.

*(2 advance beats after base. Back reverses; End reveals all. `onLeave` cancels the chain flow, the break-cycle timer, and all three card-icon loops.)*

## Copy (exact)

- **Kicker:** `Adaptation · the problem`
- **Title:** **Cloud-first is a non-starter.**
- **Hiccup line:** A chatbot's hiccup is a retry. A machine's hiccup is a failure in the world.
- **LLM-knife:** ~~LLM era: start in the cloud, move to the edge later.~~ **Physical AI: the edge, from day one.**
- **Chain labels:** `MACHINE · network card · connectivity · DNS · server · MODEL`
- **Chain tag:** `LOOP DROPPED`
- **Gap cards:**
  - **No conductor** — Reflex, reactive, and reasoning run at three different timescales, and nothing makes them work together.
  - **No fit** — Models are too big for the machine, and shrinking them to the body and the job is ad hoc.
  - **No compression for machines** — Perception drowns training storage and clogs the edge — codecs are built for human eyes, not machines.
- **Takeaway (central band):** **Nobody owns the layer that makes intelligence fit the machine. That's the gap we build.**

*(Sentence case for prose; UPPER mono for chain labels + tag.)*

## Data / graphics

Native inline SVG/HTML. Chain per the inset rules above; break uses `--alert` on the failing node/segment. Cards: hairline-bordered `--panel`, equal, same padding; icon ink line-work ~110px; title Archivo bold ~26px; body `--secondary` ~19px, ≤ 3 lines. `--alert` appears ONLY on the chain break (this + slides 08/17 are `--alert`'s homes). No glow; token `--shadow-sm` on cards at most.

Icon loops (ink line-work, subtle, reduced-motion-aware, cancelled on leave):
- No conductor: 3 concentric arcs rotating at different rates/phases → visibly out of sync.
- No fit: an oversized model rounded-rect straining against a smaller device outline; slow scale pulse, never fits.
- No compression: 3–4 tiny "frame" rects streaming into a small tray that overflows.

## Media slots

None — all native.

## Animations

`anim.flow` + scripted break-cycle on the chain, both running from the base state; `scaleIn` cards + `fadeUp` takeaway; three small icon loops. **Reduced motion:** chain static with one link broken + `LOOP DROPPED` tag; card icons in a representative static state; all text + all three cards + takeaway visible. **Cleanup (critical):** `onLeave` cancels the chain flow, the break-cycle timer, and all three icon loops — nothing runs off-slide.

## Acceptance criteria

- **No clipping:** the chain and `LOOP DROPPED` tag are fully inset (left edge ≥ x140); `MACHINE`/`MODEL` labels don't touch the stage edges; any global nav chip is unclipped.
- **No overlap:** the chain/verdict band (≤ y440) and the card band (≥ y490) never touch; framing text never enters the card band — if tight, framing text was shortened, not overlapped.
- **§13:** the three cards reveal **one at a time** (not all together); base card frames empty.
- The break reads as a *snapped link* (styled segment + ✕ + tag), not a large empty gap; the argument reads as **dependability**, not latency.
- Three equal cards, crisp title + one line each; LLM-knife present (struck vs bold); copy matches this file.
- Center-weighted; takeaway ≤ y840; off-white/ink (+ sparse `--alert`), no glow; reduced-motion correct; **no loop survives `onLeave`**; no console errors.

## Notes

- Act II's first "problem" slide — motion persuades; text stays crisp (cards are labels, not paragraphs).
- Hands to slide 06: the takeaway's "the gap we build" is the bridge.
- Dependability here also seeds Assurance/Confidence (slide 08): a cloud-dependent system can never be *certified* reliable.
- **The alignment bands above are the fix — treat them as hard constraints, not suggestions.**
