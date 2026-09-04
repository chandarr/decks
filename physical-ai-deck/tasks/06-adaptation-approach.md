# Page 06 — Adaptation · our approach · "Make the edge actually work"

> Inherits `GLOBAL-INSTRUCTIONS.md` (§11 center-weight; §12 motion where it adds value, not vanity). Light theme, off-white/ink, no glow. Act II. Deck v3.
> Source: `DECK-INDEX.md` slide 06. Directly answers slide 05's three gaps with the same three-card structure; ends with a `+` between the cards to say all three are required together.

## Purpose

Show what we build for Adaptation: three capabilities that each close one of slide 05's gaps, and that only work *together*. The three cards are the *fixed* versions of slide 05's broken cards — the motion pays off the problem. The closing `+` makes the point that the edge works only when all three are handled.

The one idea: *The edge works only when all three come together — that's Adaptation.*

## Layout (center-weighted, mirrors slide 05 — §11)

All content in the central band (y ≈ 190–800); bottom ~20% chrome only.

- **Top chrome:** kicker top-left; slide-no "06" top-right.
- **Title** — Archivo, ~y150–230.
- **Three solution cards** — a centered row, ~y320–650, **same size, spacing, and card style as slide 05** (visual continuity), each = an **animated icon** (top) + **bold short title** + **one line**.
- **The `+` row:** the two gaps between the three cards hold a `+`; after the third card, an `=` and the resolution phrase — appearing on reveal.
- **Takeaway** centered ~y740 (within band).

## The motion (only where it adds value — §12)

Each card's icon is the **resolved** version of its slide-05 counterpart — the contrast is the payoff:

- **The conductor** (fixes *no conductor*): the three nested arcs (reflex/reactive/reasoning) now rotate **in coordination** — different clocks, in sync — around a small central hub/baton.
- **The fit** (fixes *no fit*): the oversized model **distills down and snaps neatly** into the small device outline (big→small, then it fits).
- **Machine-grade compression** (fixes *no compression*): the flooding frames **compress into a compact latent** that flows smoothly into the machine (overflow → tidy stream).

**The `+` beat:** `+` signs `scaleIn` between the cards and the cards nudge slightly together (integration), then `= an edge that works` resolves. This is the slide's thesis-motion — brief, purposeful.

## Steps (reveal order)

**0 — Base:** kicker, slide-no, title, the three solution cards (titles + one-liners visible, icons at rest in their *solved* static state). Looks finished.
**1 — Each solution works:** the three card icons animate their resolved motion, staggered (~120ms) — presenter walks the three. *(Option: split into three beats, one card each, to pace.)*
**2 — All three, together:** the `+` signs `scaleIn` between the cards; the cards nudge together; `= an edge that works` resolves.
**3 — The line:** takeaway lands.

*(3 advance beats after base. Back reverses; `onLeave` cancels all card-icon loops and any `+`-row motion.)*

## Copy (exact)

- **Kicker:** `Adaptation · our approach`
- **Title:** **Make the edge actually work.**
- **Cards:**
  - **The conductor** — One framework runs reflex, reactive, and reasoning together — each at its own clock, in sync.
  - **The fit** — Fine-tune, distil, quantize, cache: the right model, shaped to the body and the job.
  - **Machine-grade compression** — Perception as compact latent — leaner training, faster edge; built for machines, not human eyes.
- **`+` row:** `The conductor  +  the fit  +  compression  =  an edge that works`
- **Takeaway (central band):** **No single fix makes the edge work. All three, together — that's Adaptation.**
- **Optional subline (light, only if it doesn't crowd):** *Built on the two-sided engagement — the labs for the fit, the vendors for the frame.*

*(Sentence case for prose; card titles Archivo bold; the `+`/`=` row mono, ink.)*

## Data / graphics

Native inline SVG/HTML. Cards identical in dimensions/padding/border to slide 05 (same `.panel` hairline style) so the two slides read as a matched pair. Icons ink line-work, small loops (see motion). The `+` and `=` are ink mono glyphs sitting in the inter-card gaps and after the last card. No `--alert` here (this is the solution slide — calm, resolved). No glow, no heavy shadow.

Icon construction (resolved versions):
- Conductor: 3 concentric arcs rotating in phase-locked coordination around a small hub; smooth, unified.
- Fit: a large rounded-rect that scales down and settles inside a smaller device rect (a one-shot on reveal, then rests fitted; a gentle breathing is optional).
- Compression: frame rects streaming into a funnel and emerging as one small compact token flowing on — a tidy continuous loop.

## Media slots

None — all native.

## Animations

`fadeUp` (titles/lines/takeaway); the three resolved icon motions; `scaleIn` for the `+`/`=` glyphs and a small translate to nudge cards together. **Reduced motion:** icons shown in their resolved static state (arcs aligned, model fitted, latent compact); `+`/`=` row shown static; all text visible. **Cleanup:** `onLeave` cancels every icon loop and the `+`-row motion.

## Acceptance criteria

- **Center-weighted:** cards, `+` row, and takeaway within the central band; nothing near the bottom edge (§11).
- Cards are the visual twins of slide 05's (same size/style) and each icon is clearly the *resolved* version of its broken counterpart.
- The `+ … =` beat is present and reads as "all three are required together."
- Exactly three cards, crisp title + one line; copy matches this file; no `--alert`.
- Base state looks finished; reduced-motion fallback correct; **no loop survives `onLeave`**; no glow; no console errors.

## Notes

- Pair with slide 05 as a matched problem→solution set — the audience should recognize each card as "the fix" for the gap they just saw.
- Keep the optional partnerships subline truly light (one faint line) or drop it — the hero is "all three, together = Adaptation." Do not let it crowd the `+` beat.
- Motion budget: only the three icon resolutions + the `+` beat. Nothing else moves.
