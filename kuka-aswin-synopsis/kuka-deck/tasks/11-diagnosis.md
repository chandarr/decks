# Screen 11 — The structural diagnosis · "A mandate that was never updated"

> Inherits `GLOBAL-INSTRUCTIONS.md`. Global rules win unless named-overridden here.
> **Theme: light.** ACT III, closing screen. **Density: LEAN.** This is the deliberate exhale after two dense screens (09, 10) and before Act IV opens.
> Deck is 15 screens; counter reads `11 / 15`.
> Source: `02-NARRATIVE-SPINE.md` screen 12.

## Purpose

Screens 09 and 10 established what is wrong. This screen states why — and converts a critique into a cause a CEO can act on.

The claim: the entity was built correctly for the mandate it was given. That mandate was to sell and service imported product in a market that was small and automotive-led. It succeeded at that; the revenue-per-head figure on screen 10 is the proof. The market then changed shape underneath the mandate, and nobody re-issued it.

This is the author's credibility screen. It must be honest about an inherited situation without disparaging anyone in it. Fault moves from execution to design — generous to the team, damning to the structure, and actionable by the person being addressed.

The one idea: *Nothing here is a failure of execution. It is a mandate that was never updated.*

## Layout

16:9, light. Three cause-and-effect rows stacked with generous vertical space, and a closing statement beneath. Lean by design — after the matrix on screen 10 the reader needs air, and the argument here is verbal, not visual.

```
┌────────────────────────────────────────────────────────────────────────────┐
│  THE DIAGNOSIS                                            [ ⊞ overview ]   │
│  A mandate that was never updated.                                         │
│                                                                            │
│  ──────────────────────────────────────────────────────────────────────    │
│  MANDATE                                                                   │
│  A trade-and-service classification          ▸   It cannot build           │
│  produces a sales-and-service                    capability, because it    │
│  organisation.                                   was never asked to.       │
│  ──────────────────────────────────────────────────────────────────────    │
│  LOCATION                                                                  │
│  Gurugram and Pune place KUKA in the         ▸   You cannot hire a         │
│  automotive belt. India's robotics and           physical-AI team from     │
│  AI engineering concentrates in Bengaluru        a city you are not in.    │
│  — where FANUC sits and ABB anchors.                                       │
│  ──────────────────────────────────────────────────────────────────────    │
│  MODEL                                                                     │
│  Integration is outsourced to third-party    ▸   The deployment data       │
│  system integrators.                             accrues to the            │
│                                                  integrator. Not to us.    │
│  ──────────────────────────────────────────────────────────────────────    │
│                                                                            │
│  Nothing here is a failure of execution.                                   │
│  It is a mandate that was never updated.                                   │
│                                                                 11 / 15    │
└────────────────────────────────────────────────────────────────────────────┘
```

- **Top ~14%:** kicker, headline (display). No subtitle — the rows carry it.
- **Middle ~56%:** three rows, each separated by a full-width hairline rule (`#E5E5E8`). Each row: a mono uppercase label (`MANDATE` / `LOCATION` / `MODEL`) on its own line, then a two-column body — the cause on the left (~46%), a small orange `▸` in a narrow centre gutter (~6%), and the consequence on the right (~40%). Consequence text is set slightly heavier than the cause.
- **Bottom ~20%:** the two-line closing statement, display weight, left-aligned.
- Generous row padding. This screen should feel unhurried — roughly 40% of its area is whitespace.
- **Ratio adaptation:** at 1440×900 reduce row padding ~18% and body type ~6%. The two-column row structure never collapses to a single column; the `▸` gutter never disappears.

## Steps (reveal order)

**0 — Base:** kicker, headline, the three hairline rules and the three mono row labels visible, all body text hidden. The three causes are named before any is explained — the frame reads as a diagnosis in progress.

**1 — Mandate:** row 1 cause `fadeUp`, then the `▸` and its consequence ~200ms later.
**2 — Location:** row 2, same treatment and cadence.
**3 — Model:** row 3, same treatment. Hold this beat slightly longer — it is the row that connects to screen 05's gap.
**4 — The finding:** both closing lines `fadeUp` together.

*(5 beats. Back reverses one at a time. `R` replays from base.)*

## Copy

Exact text. Do not alter.

- **Kicker:** `THE DIAGNOSIS`
- **Headline:** `A mandate that was never updated.`

**Row 1**
- Label: `MANDATE`
- Cause: `A trade-and-service classification produces a sales-and-service organisation.`
- Consequence: `It cannot build capability, because it was never asked to.`

**Row 2**
- Label: `LOCATION`
- Cause: `Gurugram and Pune place KUKA in the automotive belt. India's robotics and AI engineering concentrates in Bengaluru — where FANUC sits in Electronics City and ABB anchors its engineering base.`
- Consequence: `You cannot hire a physical-AI team from a city you are not in.`

**Row 3**
- Label: `MODEL`
- Cause: `Integration is outsourced to third-party system integrators.`
- Consequence: `The deployment data accrues to the integrator. Not to us.`

**Closing statement (display, two lines):**
`Nothing here is a failure of execution.`
`It is a mandate that was never updated.`

- **Counter:** `11 / 15`

Row labels are mono, uppercase, wide tracking, secondary ink. Cause text is body weight, secondary ink. Consequence text is body weight, primary ink — slightly heavier than the cause, because the consequence is the point.

## Data / graphics

**No chart, no diagram, no org chart.** The screen is typographic. An org diagram here would look like an internal restructuring proposal, which is not what this is — and it would break the lean pacing this screen exists to provide.

- **The `▸` marker:** small, `#FF5800`, centred in the gutter, vertically aligned to the first line of the consequence text. With the row labels it is the only orange in the rows — cause and consequence text stay ink and secondary.
- **Hairline rules:** 1px `#E5E5E8`, full content width, above each row and below the third.
- **No glow** — light screen.

**`data.js` constants:** none required. This screen restates facts already established on screens 09 and 10 (registry classification, hubs, outsourced integration) and introduces no new figures. It therefore carries **no evidence chips** — the sourcing was done two screens ago, and re-chipping settled facts would clutter a screen whose job is clarity.

## Media slots

None.

## Animations

- `fadeUp` — cause text, consequence text, closing lines
- No path drawing, no counting, no scaling. Deliberately the quietest animation set in the deck.
- **Reduced motion:** all rows and the closing statement rendered at once. The argument is verbal and loses nothing.
- **Cleanup:** cancel all timers in `onLeave`.

## Acceptance criteria

- Fills the viewport at 1920×1080 and 1440×900 — no scroll, no clipping
- Base state looks finished — three labelled, ruled rows framing a diagnosis before any content appears
- **The screen reads as lean** — roughly 40% whitespace, unhurried, a clear tonal break from screen 10's matrix
- Each row's consequence is visually distinguishable from its cause (weight and ink)
- In the row area, orange appears on the row labels and the `▸` markers only — never on the cause or consequence text
- The verdict line is orange; the concession line above it stays ink, so the two do not carry equal weight
- **No diagram, chart, or org chart anywhere on this screen**
- No evidence chips (deliberate — see Data/graphics)
- The closing statement is the most prominent text after the headline
- Reduced-motion version complete
- Copy matches this file character for character
- No console errors

## Notes

- **Row 3 is the load-bearing row.** `The deployment data accrues to the integrator. Not to us.` is the mechanism by which the hollow ring on **screen 05** stays hollow. It says the gap is not an accident of scale but a structural consequence of the operating model — which means it does not close by hiring more salespeople. If any row must survive a space cut, it is this one.
- **Location stays diagnostic, not prescriptive.** The Bengaluru absence is named as a gap here. The proposal to establish a Bengaluru footprint belongs to **screen 14** (the ecosystem play). Do not preview the fix on this screen — Act III diagnoses, Act IV proposes.
- **Content rules apply with full force here** (`CLAUDE.md`). No individuals, no pedigree, no tenure, no adjectives about the team. The subject is the mandate and the structure, never the people executing them. The closing line — `Nothing here is a failure of execution` — is not a softener; it is the actual finding, and it is what makes the critique safe to deliver and impossible to dismiss.
- **Pacing note:** screens 09 and 10 are the two densest in Act III. This screen is specified lean on purpose. If it starts acquiring a diagram, a fourth row, or supporting data, the act ends heavy and Act IV opens into a tired reader. Resist.
- **Cross-screen dependencies:**
  - Row 3 connects to **screen 05** (the deployment-data gap) and is closed by **screen 13** (the flywheel).
  - Row 2 connects to **screen 10**'s HUBS row, which stated the fact without comment. This screen supplies the consequence.
  - The closing line sets up **screen 12** (two additive layers), which opens Act IV by proposing the updated mandate.
