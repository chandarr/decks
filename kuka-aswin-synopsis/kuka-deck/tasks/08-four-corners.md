# Screen 08 — The four corners · "No competitor can reach all of them"

> Inherits `GLOBAL-INSTRUCTIONS.md`. Global rules win unless named-overridden here.
> **Theme: light.** ACT II, closing screen. **Density: high.** This is the structural keystone of the deck's competitive argument.
> Source: `02-NARRATIVE-SPINE.md` screen 9 *(spine numbering; this is screen 08 in build order — see Notes)*.

## Purpose

Screen 07 ended on an absence: the bet has not been made. This screen answers the question that absence provokes — *why would KUKA win if it did?*

Four capabilities are required to industrialise physical AI at scale. Every competitor group holds some and structurally cannot hold the others. KUKA under Midea is the only entity that can reach all four — an accident of ownership and history that would be very hard to assemble deliberately.

The screen ends on a deliberate tension: the corner KUKA needs most is the one it has not yet built. That hands directly into Act III.

The one idea: *Four corners. No competitor can reach all of them. One of ours is not yet built.*

## Layout

16:9, light. A large quadrant field on the left carrying the spanning shapes; a compact legend and reveal-state list on the right. Visual grammar deliberately unlike screens 05 (zones), 06 (vectors) and 07 (cards).

```
┌───────────────────────────────────────────────────────────────────────────────┐
│  THE COMBINATION                                             [ ⊞ overview ]   │
│  Four corners. No competitor can reach all of them.                           │
│  What it takes to industrialise physical AI — and who can actually hold it.   │
│                                                                               │
│   ┌───────────────────────┬───────────────────────┐    WHO HOLDS WHAT         │
│   │ MANUFACTURING SCALE   │ DEVELOPMENT DEPTH     │    ─────────────────      │
│   │ & COST                │ & COST                │                           │
│   │                       │                       │    ○ Chinese OEMs         │
│   │ Midea · component     │ engineering talent    │      scale, not certif.   │
│   │ supply chain ·        │ at a fraction of      │                           │
│   │ production economics  │ Western cost          │    ○ Traditional leaders  │
│   │        ▓▓▓▓▓▓▓▓░░░░░░ │ ░░░░░░╱╱╱╱╱╱          │      precision, not cost  │
│   ├───────────────────────┼───────────────────────┤                           │
│   │        ▓▓▓▓▓▓▓▓░░░░░░ │ ░░░░░░░░░░░░          │    ○ Humanoid companies   │
│   │ PRECISION,            │ PROVEN DEPLOYMENT     │      capital, not cert.   │
│   │ CERTIFICATION         │ AT INDUSTRIAL         │                           │
│   │ & SAFETY              │ RELIABILITY           │    ○ Physical-AI software │
│   │                       │                       │      models, not body     │
│   │ LBR · DLR lineage ·   │ installed base ·      │                           │
│   │ medical-grade cert    │ integration · trust   │    ★ KUKA — all four      │
│   └───────────────────────┴───────────────────────┘      one still dashed     │
│                                                                               │
│  Four corners. No competitor can reach all of them.                           │
│  One of ours is not yet built.                                     08 / 16    │
└───────────────────────────────────────────────────────────────────────────────┘
```

- **Left ~62%:** the quadrant. Four equal cells, hairline `#E5E5E8` dividers, each labelled with the corner name (mono, uppercase, wide tracking) and a short descriptor line (body, secondary). Spanning shapes are drawn as translucent overlays across cells.
- **Right ~32%:** `WHO HOLDS WHAT` — five entries, one per competitor group plus KUKA. Each entry: a small marker, the group name, and a five-word gap statement. Entries illuminate in step with the reveals on the left.
- **Bottom:** the two-line closing statement, display weight, left-aligned; counter right.
- **Ratio adaptation:** at 1440×900 reduce quadrant height ~15% and descriptor line size ~10%. The legend never wraps to two columns; the quadrant never overlaps it.

## Steps (reveal order)

**0 — Base:** kicker, headline, subtitle, the empty four-cell quadrant with all four corner names and descriptors visible, legend heading with five ghosted entries. Looks finished — the four requirements are already stated before anyone is measured against them.

**1 — Chinese OEMs:** translucent shape covers the manufacturing-scale corner only. Legend entry 1 illuminates. Shape holds ~600ms so the hole is visible, then drops to ghost opacity.
**2 — Traditional leaders:** shape covers precision/certification + proven deployment (two corners, left column). Legend entry 2 illuminates. Holds, then ghosts.
**3 — Humanoid companies:** shape covers development depth only. Legend entry 3 illuminates. Holds, then ghosts.
**4 — Physical-AI software:** shape covers development depth only, offset slightly from the humanoid shape so both remain distinguishable as ghosts. Legend entry 4 illuminates. Holds, then ghosts.
**5 — KUKA:** the orange shape draws and spans **all four corners**. Three corners render solid; the **development-depth corner renders dashed** (see Data/graphics). Legend entry 5 illuminates with the star marker. All four ghosts remain visible beneath for cumulative contrast.
**6 — The finding:** the two-line closing statement `fadeUp`, with the second line — `One of ours is not yet built.` — appearing ~400ms after the first.

*(7 beats. Back reverses one at a time. `R` replays from base.)*

## Copy

Exact text. Do not alter.

- **Kicker:** `THE COMBINATION`
- **Headline:** `Four corners. No competitor can reach all of them.`
- **Subtitle:** `What it takes to industrialise physical AI — and who can actually hold it.`

**Quadrant corner labels and descriptors**
- `MANUFACTURING SCALE & COST` — `Midea · component supply chain · production economics`
- `DEVELOPMENT DEPTH & COST` — `Engineering talent at a fraction of Western cost`
- `PRECISION, CERTIFICATION & SAFETY` — `LBR · DLR lineage · medical-grade certification`
- `PROVEN DEPLOYMENT AT INDUSTRIAL RELIABILITY` — `Installed base · integration expertise · customer trust`

**Legend heading:** `WHO HOLDS WHAT`

**Legend entries** (group → gap statement)
- `Chinese industrial OEMs` → `Scale and cost. Not certification depth or Western trust.`
- `Traditional leaders` → `Precision and deployment. No comparable cost base.`
- `Humanoid companies` → `Capital and talent. No certified body, no installed base.`
- `Physical-AI software` → `The models. Not the body, the safety case, or the data.`
- `KUKA` → `All four are reachable. One is not yet built.`

**Closing statement (display, two lines):**
`Four corners. No competitor can reach all of them.`
`One of ours is not yet built.`

- **Counter:** `08 / 16`

## Data / graphics

**The quadrant — hand-built SVG/CSS. No chart library.**

- **Cells:** four equal rectangles, 1px `#E5E5E8` dividers, generous internal padding. Corner names mono uppercase `#6E6E76` with wide tracking; descriptors body weight, secondary ink, small.
- **Competitor spanning shapes:** rounded translucent overlays, fill `rgba(17,17,19,.10)`, 1px `#6E6E76` border. Active state opacity 1; ghost state opacity 0.18. Each shape covers only the cells that group holds, with a soft corner radius so partial coverage reads as an organic shape rather than a highlighted table cell.
- **KUKA spanning shape:** covers all four cells. Fill `rgba(255,88,0,.08)`. **Border treatment is split and this is the screen's most important detail:** solid 2px `#FF5800` along the perimeter adjacent to manufacturing scale, precision/certification and proven deployment; **dashed 2px `#FF5800` (dash 6/4) along the development-depth corner.** The dashed segment must be unmistakable — it is a claim about potential, not present strength, and it is what hands the argument into Act III.
- **Dash grammar consistency:** dashed = frontier/claim, solid = established. Identical to the dashed projection on screen 03, the dashed Automation 2.0 boundary on screen 05, and the dashed convergence region on screen 06.
- **Legend markers:** hollow `#C9C9CE` rings r=5 for the four competitor groups; filled `#FF5800` star/diamond r=6 for KUKA, matching the KUKA marker treatment on screen 06.
- **No glow** — light screen.

**`data.js` constants required:**

```js
CORNERS = [
  { id:"scale",       label:"MANUFACTURING SCALE & COST",
    desc:"Midea · component supply chain · production economics" },
  { id:"development", label:"DEVELOPMENT DEPTH & COST",
    desc:"Engineering talent at a fraction of Western cost" },
  { id:"precision",   label:"PRECISION, CERTIFICATION & SAFETY",
    desc:"LBR · DLR lineage · medical-grade certification" },
  { id:"deployment",  label:"PROVEN DEPLOYMENT AT INDUSTRIAL RELIABILITY",
    desc:"Installed base · integration expertise · customer trust" },
]
HOLDERS = [
  { id:"chinese",     holds:["scale"],                     tier:"confirmed" },
  { id:"traditional", holds:["precision","deployment"],    tier:"confirmed" },
  { id:"humanoid",    holds:["development"],               tier:"confirmed" },
  { id:"physicalai",  holds:["development"],               tier:"confirmed" },
  { id:"kuka",        holds:["scale","precision","deployment"],
                      claims:["development"],              tier:"confirmed" },
]
```

Note the deliberate split on the KUKA entry: `holds` renders solid, `claims` renders dashed. The distinction must survive into the rendering, not be flattened.

**Evidence chips:** the four corner definitions carry no chips — they are an analytical frame, not citations. The legend entries carry `confirmed`: each group's capability profile is a matter of public record. The KUKA entry's dashed corner is the honest marker; no chip is needed to soften it further.

## Media slots

None — all native SVG/CSS. No company logos.

## Animations

- `scaleIn` — each competitor spanning shape as it appears
- Ghost transition: 300ms opacity fade from 1 → 0.18 after the ~600ms hold
- `drawPath` — the KUKA shape's perimeter, drawn as a single continuous stroke so the transition from solid to dashed along the development corner is visible as it draws
- `fadeUp` — legend entries, closing statement lines
- **Reduced motion:** all four competitor ghosts and the KUKA shape rendered immediately at final opacity, legend fully illuminated, closing statement shown. The partial coverage of each competitor and the single dashed corner on KUKA's shape still make the entire argument statically.
- **Cleanup:** cancel all timers and rAF in `onLeave`.

## Acceptance criteria

- Fills the viewport at 1920×1080 and 1440×900 — no scroll, no clipping; quadrant never overlaps the legend
- Base state looks finished — four corners named and described before any group is measured
- **Every competitor shape visibly fails to cover at least one corner** — the hole is the argument and must be obvious at a glance
- **KUKA's shape spans all four corners**, and **the development-depth corner is unmistakably dashed while the other three are solid** — this is the screen's payload
- The four competitor ghosts remain visible beneath KUKA's shape without muddying it
- Legend entries illuminate in step with their shape
- Only KUKA orange; competitor shapes are greyscale
- No glow
- Reduced-motion version preserves both the partial-coverage contrast and the dashed corner
- Copy matches this file character for character
- No console errors

## Notes

- **Why the dashed corner matters more than anything else on this screen.** If KUKA's shape renders as a clean confident span across all four, it contradicts screen 10 two screens later, where India is diagnosed as weak. The dashed development corner is what makes Act II close on a tension rather than a boast — and it means Act III's paradox lands as confirmation of something the advisor already suspected rather than as a reversal.
- **Midea is named openly on the manufacturing-scale corner.** This is agreed and deliberate: the ownership is a genuine structural asset, and omitting it would look evasive to anyone who knows the company. Midea appears here as **opportunity only**. The soft IP-alignment line belongs on screen 16; the governance question is not in the written deck at all.
- **India is named as a corner here as a prelude to Act III.** The corner is `DEVELOPMENT DEPTH & COST` rather than "India" by name — the capability is the point, and India is how it gets built. Screens 10 through 12 then show why that corner is currently dashed.
- **Modern manufacturing startups are deliberately excluded** from the competitor set on this screen. In this deck's framing they are partners rather than competitors, and they return on **screen 15** (the ecosystem play). Do not add them here.
- **Cross-screen dependencies:**
  - The four cluster names must match **screen 06** exactly.
  - `LBR · DLR lineage · medical-grade certification` restates asset tags from **screen 05**'s industrialisation stack. Keep the wording consistent across both screens.
  - The closing line hands into **screen 10** (the paradox). Do not preview India specifics here.
- **Verification flags** (carry into `VERIFY-BEFORE-SENDING.md`): the DLR lineage and medical-grade certification claims are the same ones flagged on screen 05 and must be confirmed once for both. Midea's component supply chain and production economics as a KUKA-accessible asset is an author assessment — sanity-check that KUKA can in practice access Midea's manufacturing cost base, since the entire manufacturing-scale corner rests on it.
