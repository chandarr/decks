# Screen 04 — The signals · "The capital has already moved"

> Inherits `GLOBAL-INSTRUCTIONS.md`. Global rules win unless named-overridden here.
> **Theme: light.** ACT I, closing. **Register: financial** (screen 03 was technical; 05 is consequences, light). The register change is deliberate — it is what stops three substantial screens reading as three of the same screen.
> Source: `02-NARRATIVE-SPINE.md` screen 4.

## Purpose

Screen 03 argued the technology is inflecting. This screen proves the *market has already priced it* — the money, the incumbents and the geography have all moved, in public, on the record. It converts a technical thesis into a commercial fact pattern, and hands off to Act II by landing its final signal on India.

The structure carries an argument the numbers alone do not: three signals describe the industry, the fourth breaks the pattern and points forward. This is a pivot, not a list.

The one idea: *This is not a forecast. Capital, market share and growth have already relocated — and the last of those relocations is India.*

## Layout

16:9, light. Three-plus-one: an upper row of three equal signal cards, then one full-width pivot card beneath that visually breaks the pattern.

```
┌────────────────────────────────────────────────────────────────────────────┐
│  THE SIGNALS                                              [ ⊞ overview ]   │
│  The capital has already moved.                                            │
│  Three facts about the industry — and one about where it is going.         │
│                                                                            │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐            │
│  │ $5.375 B         │ │ 57 %             │ │ $27.6 B          │            │
│  │ ─────────        │ │ ─────────        │ │ ─────────        │            │
│  │ SoftBank acquires│ │ Chinese domestic │ │ robotics venture │            │
│  │ ABB Robotics     │ │ vendors' share of│ │ funding, 2025    │            │
│  │                  │ │ their home market│ │                  │            │
│  │ An incumbent     │ │ The largest      │ │ The field is     │            │
│  │ chose to exit    │ │ market has       │ │ capitalised, not │            │
│  │ rather than      │ │ already flipped  │ │ speculative      │            │
│  │ transform        │ │                  │ │                  │            │
│  │ ● IFR / deal     │ │ ● IFR 2025       │ │ ○ PitchBook      │            │
│  └──────────────────┘ └──────────────────┘ └──────────────────┘            │
│                                                                            │
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃  9,100 units  ·  +7 %  ·  6th worldwide          ▸                   ┃  │
│  ┃  India, 2024 — the fastest-growing major robot market                ┃  │
│  ┃  ● IFR World Robotics 2025                                           ┃  │
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
│                                                                            │
│  Every number on this page is public. None of it is a forecast.  04 / 16   │
└────────────────────────────────────────────────────────────────────────────┘
```

- **Top ~18%:** kicker, headline, subtitle.
- **Middle ~42%:** three equal cards, white panels, 1px `#E5E5E8` hairline border, generous internal padding. Each card: big figure (display, tabular) → hairline rule → what it is (body) → **the consequence** (body, secondary ink, italic-free) → evidence chip with source (mono, small).
- **Lower ~26%:** the pivot card, full width. Distinguished by: `#F5F5F7` fill (not white), a 3px `#FF5800` left edge rule, figure set in orange, and a small orange `▸` at the right edge indicating forward motion. This card must read as *different in kind*, not merely larger.
- **Bottom:** the closing line, mono, secondary, left; counter right.
- **Ratio adaptation:** at 1440×900 reduce card padding ~20% and the big-figure size ~12%; the three cards stay in one row — never wrap to 2+1.

## Steps (reveal order)

**0 — Base:** kicker, headline, subtitle, three empty card frames with their hairline rules and evidence chips visible but figures and text hidden; pivot card frame present with its orange edge rule but contents hidden. Looks finished and framed.

**1 — Signal 1:** card 1 contents `fadeUp`; figure runs `countUp` to `$5.375 B` (~900ms, tabular).
**2 — Signal 2:** card 2, same treatment, `countUp` to `57 %`.
**3 — Signal 3:** card 3, same treatment, `countUp` to `$27.6 B`.
**4 — The pivot:** pivot card contents `fadeUp`; the three figures run `countUp` in sequence (~150ms apart); the orange left edge rule draws top-to-bottom (`drawPath`, 400ms); the `▸` fades in last.
**5 — The closing line:** `fadeUp`.

*(6 beats. Back reverses one at a time. `R` replays from base.)*

## Copy

Exact text. Do not alter.

- **Kicker:** `THE SIGNALS`
- **Headline:** `The capital has already moved.`
- **Subtitle:** `Three facts about the industry — and one about where it is going.`

**Card 1**
- Figure: `$5.375B`
- Label: `SoftBank acquires ABB Robotics`
- Consequence: `An incumbent chose to exit rather than transform.`
- Source: `Deal announced October 2025`

**Card 2**
- Figure: `57%`
- Label: `Chinese domestic vendors' share of their home market`
- Consequence: `The world's largest robot market has already flipped.`
- Source: `IFR World Robotics 2025`

**Card 3**
- Figure: `$27.6B`
- Label: `Robotics venture funding, 2025`
- Consequence: `The field is capitalised, not speculative.`
- Source: `PitchBook — estimate; sources vary`

**Pivot card**
- Figures: `9,100 units` · `+7%` · `6th worldwide`
- Label: `India, 2024 — the fastest-growing major robot market`
- Source: `IFR World Robotics 2025`

- **Closing line:** `Every number on this page is public. None of it is a forecast.`
- **Counter:** `04 / 16`

Figures use tabular figures throughout. Consequence lines are sentence case, terminal period, secondary ink.

## Data / graphics

No chart. The typography and card hierarchy carry the screen.

**`data.js` constants required** — every on-screen number resolves from here, never hardcoded:

```js
ABB_SOFTBANK        = { value:5.375, unit:"$B", tier:"confirmed",
                        source:"Deal announced October 2025" }
CHINA_DOMESTIC_SHARE= { value:57, unit:"%", tier:"confirmed",
                        source:"IFR World Robotics 2025",
                        note:"MIR Databank gives ~51.6% for 2024 — reconcile before sending" }
ROBOTICS_VC_2025    = { value:27.6, unit:"$B", tier:"estimate",
                        source:"PitchBook",
                        note:"Crunchbase ~$15B, CB Insights up to $40.7B — label as estimate" }
INDIA_UNITS_2024    = { value:9100, unit:"units", tier:"confirmed",
                        source:"IFR World Robotics 2025" }
INDIA_GROWTH_2024   = { value:7, unit:"%", tier:"confirmed", source:"IFR World Robotics 2025" }
INDIA_RANK_2024     = { value:6, unit:"th worldwide", tier:"confirmed", source:"IFR World Robotics 2025" }
```

**Evidence chips:** cards 1, 2 and the pivot carry `confirmed` (filled orange dot). Card 3 carries `estimate` (grey dot) — **this must be visibly different.** One of four signals being openly marked as a softer number is precisely what makes the other three credible. Do not upgrade it for visual consistency.

## Media slots

None — all native CSS/type.

## Animations

- `countUp` — all figures, tabular, no layout shift during the count
- `fadeUp` — card contents, consequence lines, closing line
- `drawPath` — the pivot card's orange left edge rule
- **Reduced motion:** all figures render at final value, all contents shown at once, edge rule drawn complete. No counting.
- **Cleanup:** cancel every count-up timer and rAF in `onLeave` — a count left running on navigate is the most likely defect on this screen.

## Acceptance criteria

- Fills the viewport at 1920×1080 and 1440×900 — no scroll, no clipping; three cards remain in a single row
- Base state looks finished — framed cards, not empty boxes
- **The pivot card reads as different in kind from the three above it**, not merely bigger. If it looks like a fourth signal, the screen has failed its structure.
- `countUp` produces no layout shift (tabular figures, reserved width)
- The `estimate` chip on card 3 is visibly distinct from the `confirmed` chips
- Every figure resolves from `data.js`; no number is hardcoded in markup
- Only KUKA orange; orange used only on the pivot card's figures and edge rule — the three upper cards are greyscale-and-ink
- Figures legible from the back of a room; consequence lines legible on a laptop
- Reduced-motion version complete and composed
- Copy matches this file character for character
- No console errors

## Notes

- **Verification flags** (already in `VERIFY-BEFORE-SENDING.md`): the ABB→SoftBank deal was targeted to close H2 2026 — confirm status and terms before sending. The 57% figure conflicts with MIR Databank's ~51.6% for 2024; pick one source and cite it consistently. The $27.6B VC figure varies by 2–3× across sources; it is marked `estimate` for that reason.
- **Scope discipline:** India's robot *density* (~30 vs ~162 global average) belongs to screen 10, where it is half of the paradox. Do not add it here — it would spend screen 10's ammunition early.
- **Register discipline:** this screen is financial and market-structural. No model names, no VLA lineage, no technology mechanism — that was screen 03. If technical content starts appearing, it has drifted; stop and ask.
- The closing line — *"Every number on this page is public. None of it is a forecast."* — is doing quiet work against the "is this hype?" objection, and pairs with screen 03's openly-marked frontier claims. Do not reword.
- The pivot card is the handoff into Act II: it is the first time India appears in the deck, and it appears as a *market fact*, not yet as the author's proposition. Keep it factual — the argument comes later.
