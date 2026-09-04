# Page 06 — Adaptation · our approach · "Make the edge actually work"

> Inherits `GLOBAL-INSTRUCTIONS.md` (§11 center-weight; §12 motion conveys the message; §13 reveal one-at-a-time). Light theme, off-white/ink, no glow. Act II. Deck v3.
> Source: `DECK-INDEX.md` slide 06. Answers slide 05's three gaps with the same three-card structure; `+` between the cards says all three are required together.
> **Bug fixes retained:** no formula sentence drawn across the cards (the `+` glyphs carry it); hard non-overlapping bands; prominent `+`; one card per key press.
> **NEW (essential):** the **conductor** is the hardest of the three and a card can't explain it — add a dedicated **three-layer orchestration strip** in the lower band (reflex · reactive · reasoning, each at its own frequency, with command-down / state-up flows that animate at *different tempos* — the motion shows the different clocks). This is the orchestration we build.

## Purpose

Show what we build for Adaptation: three capabilities that each close one of slide 05's gaps and only work *together*. Then **explain the conductor properly** — one framework running three control loops at three timescales, kept in sync. The multi-clock orchestration is the part nobody else owns; it gets its own diagram.

The one idea: *The edge works only when all three come together — and the conductor is one framework running reflex, reactive, and reasoning at their own clocks, in sync.*

## Layout — HARD coordinate bands (1920×1080; §11)

**Bands must not overlap.** Content margin x ∈ [140, 1780]. Nothing critical below y840.

| Band | y-range | Contents |
|---|---|---|
| Chrome | 40–90 | kicker (x140) top-left; slide-no "06" top-right (≤ x1780); global nav chip unclipped. |
| **Title** | 100–185 | `Make the edge actually work.` (Archivo, x140). |
| **Three cards (compact) + `+`** | **210–470** | card row; card top ≥ y210, bottom ≤ y470. `+` glyphs in the two inter-card gaps (~y340). |
| **Conductor orchestration strip** | **510–765** | a small strip heading (~y500) + three stacked layer bars with frequency chips + command-down/state-up flows + a CONDUCTOR rail. |
| **Takeaway** | 790–835 | one centered line, Archivo bold. |

**Anti-collision rule:** cards ≤ y470; strip 510–765; takeaway ≥ y790. No text drawn across the card row; **no formula/`=` sentence anywhere.**

### Cards (compact — own y 210–470)

Three equal cards, same `.panel` hairline style as slide 05 (matched pair), across x∈[140,1780] (~520w, ~40px gaps). **Compact**: small icon (top, ~90px) + bold title + one short line. `+` glyphs (~40px ink) in the two gaps, appearing with their card.

### Conductor orchestration strip (the essential addition — own y 510–765)

Full width x∈[140,1780]. Purpose: expand the **conductor** card into the real mechanism.

- **Strip heading** (~y500, mono/`--secondary`, left): `THE CONDUCTOR — one framework, three loops, each at its own clock.` A thin connector/arrow may drop from the conductor card (card 1) into the strip to show "this is that card, in detail."
- **Three horizontal layer bars**, stacked top→bottom by cognitive level (slowest on top), each full-width, ~64h, ~14px gaps, hairline `--panel`:

  | Bar (top→bottom) | Left label (bold mono, ink) | Middle phrase (`--secondary`) | Right — frequency chip (mono, boxed) |
  |---|---|---|---|
  | 1 | `REASONING` | plans the task, re-plans on change | `~1 Hz` |
  | 2 | `REACTIVE` | adjusts to the world in the loop | `~50 Hz` |
  | 3 | `REFLEX` | keeps it safe and stable | `~1 kHz` |

- **The orchestration (flows + rail):**
  - A vertical **`CONDUCTOR` rail** on the left edge of the strip spanning all three bars — the one framework binding them.
  - **Command-down flow:** arrows on one side flowing top→bottom across the bars, labeled once `goals ↓` (reasoning sets targets for reactive, reactive for reflex).
  - **State-up flow:** arrows on the other side flowing bottom→top, labeled once `state ↑` (reflex/sensors report up to reactive, reactive to reasoning).
  - **Different tempos = the point (§12):** the flow animation speed **matches each layer's frequency** — the reflex flow visibly races, reactive is medium, reasoning is slow. Seeing three clocks run at once, held together by the rail, *is* the explanation of the conductor.

### Takeaway (own y 790–835)

One centered line, Archivo bold.

## Steps (reveal order — §13)

**0 — Base:** chrome, title, three faint empty card frames, and the strip's three empty bar frames (faint). No `+`, no flows, no takeaway.
**1 — The conductor:** card 1 fills.
**2 — The fit:** `+` glyph 1 `scaleIn`s, card 2 fills.
**3 — Compression:** `+` glyph 2 `scaleIn`s, card 3 fills.
**4 — The conductor, in detail:** the strip heading + the three layer bars (labels, phrases, frequency chips) fill in; the `CONDUCTOR` rail draws.
**5 — The orchestration (payoff):** the command-down and state-up flows start, each at its layer's tempo (reflex fast → reasoning slow); the takeaway lands.

*(5 advance beats after base. Back reverses one step; End reveals all. `onLeave` cancels all card-icon loops AND the three strip flow loops — nothing runs off-slide.)*

## Copy (exact)

- **Kicker:** `Adaptation · our approach`
- **Title:** **Make the edge actually work.**
- **Cards:**
  - **The conductor** — One framework runs reflex, reactive, and reasoning together — each at its own clock, in sync.
  - **The fit** — Fine-tune, distil, quantize, cache: the right model, shaped to the body and the job.
  - **Machine-grade compression** — Perception as compact latent — leaner training, faster edge; built for machines, not human eyes.
- **Strip heading:** `THE CONDUCTOR — one framework, three loops, each at its own clock.`
- **Layer bars:**
  - `REASONING` — plans the task, re-plans on change — `~1 Hz`
  - `REACTIVE` — adjusts to the world in the loop — `~50 Hz`
  - `REFLEX` — keeps it safe and stable — `~1 kHz`
- **Flow labels:** `goals ↓` · `state ↑` · rail: `CONDUCTOR`
- **Takeaway (central band):** **No single fix makes the edge work. All three, together — and the conductor keeps three clocks in sync.**

*(Sentence case for prose; card titles Archivo bold; layer labels + frequency chips + rail UPPER/mono. Frequencies are illustrative orders-of-magnitude — keep the `~`.)*

## Data / graphics

Native HTML/SVG. Cards: `.panel` hairline, equal, compact. `+` glyphs ink ~40px in the gaps. Strip: three hairline `--panel` bars, left labels ink mono-bold, middle `--secondary`, frequency chips small boxed mono. `CONDUCTOR` rail = a thin ink vertical bar/line on the strip's left spanning the three bars. Flows = ink arrow/dash motifs down one side (commands) and up the other (state), animated with `anim.flow` at **per-layer speeds** (reflex fastest). No `--alert` (solution slide). No glow.

Icon construction (resolved versions vs slide 05):
- **Conductor** card icon: 3 concentric arcs rotating in phase-locked coordination around a hub (the strip below is the full story).
- **The fit:** a large rounded-rect scaling down to settle inside a small device rect.
- **Compression:** frames streaming into a funnel → one compact token flowing on.

## Media slots

None — all native.

## Animations

`fadeUp` per card (one at a time, §13); `scaleIn` for the two `+` glyphs; three resolved icon motions; `fadeUp`/`drawPath` for the strip bars + `CONDUCTOR` rail (step 4); **`anim.flow` on the command-down and state-up arrows at per-layer tempos (step 5) — reflex fast, reactive medium, reasoning slow**; `fadeUp` takeaway. **Reduced motion:** all cards filled (icons in resolved static state), both `+` visible, strip fully drawn with static directional arrows (both directions shown) and the rail, takeaway visible — no flow loops. **Cleanup (critical):** `onLeave` cancels every icon loop AND all three strip flow loops.

## Acceptance criteria

- **Conductor explained:** the lower strip shows three layers (reasoning/reactive/reflex) with their frequencies (~1 Hz / ~50 Hz / ~1 kHz), a CONDUCTOR rail binding them, and command-down/state-up flows — and the flow tempos differ per layer (the different clocks are visible in motion).
- **No overlap:** cards ≤ y470, strip 510–765, takeaway ≥ y790; no text across the card row; no formula/`=` sentence.
- **§13:** three cards one per key press (each `+` with its card), then the strip fills, then the flows + takeaway.
- `+` glyphs visible; cards are compact twins of slide 05; each icon is the resolved version of its slide-05 counterpart; no `--alert`.
- Center-weighted; takeaway ≤ y835; off-white/ink, no glow; reduced-motion correct; **no loop survives `onLeave`**; no console errors.

## Notes

- The conductor strip is the essential addition — it's the multi-timescale orchestration nobody else owns; give it real space and let the differing flow tempos do the explaining (§12).
- Pair with slide 05 (problem→solution). Motion budget: three icon resolutions + two `+` reveals + the three per-layer strip flows. Nothing else moves.
- Frequencies are illustrative orders of magnitude (robotics: ~kHz motor/safety, ~10–100 Hz perception-control, ~sub-Hz–few-Hz planning) — keep the `~` so they read as representative, not spec.
- **The alignment bands above are hard constraints.**
