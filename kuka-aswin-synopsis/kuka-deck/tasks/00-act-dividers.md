# Act dividers — four interstitials, one implementation

> Inherits `GLOBAL-INSTRUCTIONS.md`. Global rules win unless named-overridden here.
> **Theme: light**, on the section grey rather than white. **Density: minimal** — this is the only screen type in the deck whose job is to carry almost nothing.
> Covers four screens at once because they are one component with four data rows. Built after screens 01–15; see `BUILD-ORDER.md` for the running order.

## Purpose

The deck is deliberately information-dense: fifteen screens, each carrying a headline, an argued visual and a subordinate evidence layer. Read end to end, the acts run into one another. A divider before each act gives the reader — and the room, when the deck is walked live — a beat to reset, and states plainly which of the four acts is starting.

The one idea: *you are here, and this is what the next three or four screens are about.*

## Running order

| Screen | File | Act opened | Sits between |
|---|---|---|---|
| 03 | `pages/02a-act-i.js` | ACT I | `02-four-acts` → `03-inflection` |
| 07 | `pages/05a-act-ii.js` | ACT II | `05-what-changes` → `06-competitive-map` |
| 11 | `pages/08a-act-iii.js` | ACT III | `08-four-corners` → `09-paradox` |
| 15 | `pages/11a-act-iv.js` | ACT IV | `11-diagnosis` → `12-two-layers` |

Screen numbers are positions in the running order; file numbers are the screen each divider follows plus a letter. The two do not match on purpose — renumbering twelve built files and their ids to close the gap would touch every screen in the deck for no behavioural gain. Order comes from the script order in `index.html`; the counter, progress rail and overview grid all derive from the registered page count.

The Act I divider sits **after** the four-moves roadmap, not before it. The roadmap names all four acts; the divider names the one now starting.

## Layout

16:9, light, on `--light-section` (#F5F5F7) full-bleed — the tint is the signal, since every content screen sits on white and the dark palette belongs to the bookends.

```
┌───────────────────────────────────────────────────────────────────────────┐
│                                                              [ ⊞ overview ]│
│                                                                           │
│   ──── ACT III · OF FOUR                                                  │
│                                                              ┌──┐         │
│   The state of KUKA India                                    │III│  ← watermark
│                                                              └──┘         │
│   India is where that gap is widest                                       │
│                                                                           │
│                                                                           │
│   ────────────  ─ ─ ─ ─ ─ ─   ────────────   ─ ─ ─ ─ ─ ─                  │
│   ACT I         ACT II        ACT III        ACT IV                       │
│   The global    Where KUKA    The state of   The proposition      11 / 19 │
│   trajectory    sits          KUKA India                                  │
└───────────────────────────────────────────────────────────────────────────┘
```

- **Left, optically centred:** an orange 56×2px rule + mono kicker `ACT N · OF FOUR`, the act title in `display-1`, the beat line beneath it at 28px secondary.
- **Right, behind the copy:** the act numeral as a watermark at 300px, `rgba(255,88,0,.12)`, bled off the right edge. **Set in JetBrains Mono, not Space Grotesk** — the display face draws a bare stem for `I`, so `III` reads as three rectangles rather than a numeral.
- **Foot, full width:** the four-act rail — the same four-column grammar as screen 02's roadmap, so the divider reads as a position report against a structure the reader has already seen. Current act at full opacity with a 2px orange rule and an orange label; the other three at 0.4.
- No figures, no evidence chips, no epistemic line — there is nothing on the screen to source.

## Steps

**None.** `steps: 0`. One advance moves to the first screen of the act; one back returns to the previous screen's final step. A divider with staged reveals would defeat the point of a divider.

The screen is not static, though: on entry the lead rule and kicker, title, beat line and rail fade up in sequence at 0 / 120 / 260 / 420ms, driven by the page's own timers and the `.reveal` class rather than the engine's step counter.

## Copy

Exact text, and **all of it lives in `DeckData.ACTS`** — screen 02's roadmap renders its column labels and beat lines from the same constant, so the roadmap and the dividers cannot drift apart.

| Act | Kicker | Title | Beat line |
|---|---|---|---|
| I | `ACT I · OF FOUR` | `The global trajectory` | `The market is inflecting` |
| II | `ACT II · OF FOUR` | `Where KUKA sits` | `KUKA is well-placed and under-armed` |
| III | `ACT III · OF FOUR` | `The state of KUKA India` | `India is where that gap is widest` |
| IV | `ACT IV · OF FOUR` | `The proposition` | `And where the fix compounds globally` |

Act titles are the act names from `02-NARRATIVE-SPINE.md`, in sentence case. Beat lines are screen 02's, verbatim — including Act IV's leading `And`, which reads as continuity from Act III's line on the roadmap and is the one line worth a second look now that it also stands alone on a divider.

## Data / graphics

- `DeckData.ACTS` — `{ id, numeral, label, title, beat }` per act, in narrative order. No figures, so no evidence tiers.
- No SVG. The watermark is type; the rails are 1px and 2px divs.

## Animations

- `fadeUp` — every element, in the cadence above. Nothing else.
- **Reduced motion:** all four elements render immediately; the screen is unchanged apart from the entrance.
- **Cleanup:** the four entrance timers and their controllers are cancelled in `onLeave`.

## Acceptance criteria

- Fills the viewport at 1920×1080 and 1440×900 — no scroll, no clipping; the watermark never crops a glyph
- The act numeral reads as a roman numeral, not as bars
- The act being entered is unambiguous from the title, the kicker and the rail simultaneously
- The tinted field reaches all four canvas edges
- One advance leaves the divider; back from the following screen returns to it
- The four-act rail matches screen 02's labels and beat lines exactly, because both read `DeckData.ACTS`
- Counter and overview grid show 19 screens
- Only KUKA orange; no glow
- No console errors

## Notes

- **Why light, not dark.** A dark divider would be the strongest possible act break, and it is ruled out: dark is the bookend grammar (screens 01 and 19), and spending it four more times in the middle makes the deck read as a tech demo — exactly the failure mode `GLOBAL-INSTRUCTIONS.md` §1 names. The section grey is the strongest break available inside the palette.
- **Why the rail repeats on every divider.** A cold reader who skips to the middle of the deck gets the whole structure back in one glance. It costs one row of type.
- **Do not add screen lists.** Naming the three or four screens inside each act was considered and rejected: it turns the one screen designed to be empty into another dense one.
