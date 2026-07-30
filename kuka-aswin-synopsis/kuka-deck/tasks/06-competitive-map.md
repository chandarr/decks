# Screen 06 — The competitive map · "Everyone is converging on the same corner"

> Inherits `GLOBAL-INSTRUCTIONS.md`. Global rules win unless named-overridden here.
> **Theme: light.** ACT II, opening. **Density: high, but held behind interaction** — the map stays calm; the detail lives in a side panel.
> Source: `02-NARRATIVE-SPINE.md` screen 6.
> **Interaction:** this is the deck's first click-interactive screen. Clicks must not consume reveal steps.

## Purpose

Locate KUKA honestly in a field that now contains five distinct kinds of competitor, and let the *shape* of the field make the argument: every cluster is moving toward the same corner — capable hardware plus fast software — and KUKA starts closest to that corner while moving slowest.

This pays off screen 02's beat II (`KUKA is well-placed and under-armed`) visually rather than verbally, and sets up screen 07, which explains *why* the vectors differ.

The one idea: *KUKA holds the best position on the board and has the shortest arrow on it.*

## Layout

16:9, light. Map left, detail panel right. Different visual grammar from screen 05 — this is a field of clusters and vectors, not zones.

```
┌───────────────────────────────────────────────────────────────────────────────┐
│  THE FIELD                                                   [ ⊞ overview ]   │
│  Everyone is converging on the same corner.                                   │
│  Five kinds of competitor, one destination.        click any cluster ▸        │
│                                                                               │
│  hardware &          ╭─────────╮                  ┌─────────────────────────┐ │
│  certification       │TRADITIONAL│──▸              │ TRADITIONAL LEADERS     │ │
│  depth               │ LEADERS  │                  │ ─────────────────────── │ │
│    ▲                 ╰─────────╯                   │ ABB · FANUC · Yaskawa   │ │
│    │        ★ KUKA ─▸                              │ Kawasaki · Comau ·      │ │
│    │                      ╭────────╮               │ Stäubli · Nachi ·       │ │
│    │                      │ CHINESE│─▸             │ Mitsubishi · UR         │ │
│    │        ╭──────────╮  │  OEMs  │               │                         │ │
│    │        │ MODERN   │  ╰────────╯               │ Decades of certified    │ │
│    │        │ MFG      │──▸                        │ deployment. Now buying  │ │
│    │        │ STARTUPS │                           │ software velocity —     │ │
│    │        ╰──────────╯      ╭──────────╮         │ ABB by sale, FANUC by   │ │
│    │                 ╭──────╮ │PHYSICAL-AI│        │ alliance.               │ │
│    │                 │HUMAN-│ │ SOFTWARE  │        │                         │ │
│    │                 │OIDS  │▸│           │──▸     │ ● confirmed             │ │
│    │                 ╰──────╯ ╰──────────╯         └─────────────────────────┘ │
│    └──────────────────────────────────────▶                                   │
│               software & AI velocity                                          │
│                                                                               │
│  Cluster positions are judgement. The arrows are public record.     06 / 16   │
└───────────────────────────────────────────────────────────────────────────────┘
```

- **Left ~58%:** the map. Two axes, five cluster blobs, one distinct KUKA marker, one vector per cluster and per KUKA.
- **Right ~38%:** the detail panel — cluster name, member list, two to three lines on relevance to KUKA, evidence chip.
- **Top-right of map area:** the affordance line `click any cluster ▸` in mono, secondary — explicit, because a cold reader must know the detail exists.
- **Bottom:** the epistemic line, mono, secondary, left; counter right.
- **Ratio adaptation:** at 1440×900 reduce map height ~15% and panel padding ~20%. Cluster labels may abbreviate; the KUKA marker never shrinks below full legibility.

## Steps (reveal order)

**0 — Base:** kicker, headline, subtitle, axes with labels, the **KUKA marker already placed and labelled**, the detail panel **pre-loaded with the Traditional Leaders cluster** (never empty), affordance line visible. Looks finished; the subject of the deck is already on the board.

**1 — Traditional leaders:** blob fades in upper-left region, `scaleIn`.
**2 — Chinese OEMs:** blob fades in, mid-field.
**3 — Modern manufacturing startups:** blob fades in, lower-left of centre.
**4 — Humanoids:** blob fades in, lower-right.
**5 — Physical-AI software:** blob fades in, far lower-right.
**6 — The vectors:** all five cluster arrows draw simultaneously (`drawPath`, 600ms), then **KUKA's short arrow draws last**, 300ms after the others complete, at roughly one-third their length. The stagger is the point — do not draw KUKA's with the group.
**7 — The convergence:** a faint dashed target region appears in the upper-right corner (high hardware depth + high software velocity), label `where all of them are going`. All arrows visibly point into it. KUKA's marker is nearest to it.

*(8 beats. Back reverses one at a time. `R` replays from base.)*

## Interaction (independent of steps)

- Clicking any revealed cluster blob swaps the detail panel to that cluster and marks the blob active (2px `#FF5800` border; all others revert to 1px `#C9C9CE`).
- **Clicks never advance or consume a reveal step.** Arrow keys continue to control steps regardless of what is selected.
- Clicking the KUKA marker loads a KUKA panel (see Copy).
- Unrevealed clusters are not clickable.
- Panel content swaps via `crossFade` (200ms). No layout shift between panels — reserve panel height for the longest entry.

## Copy

Exact text. Do not alter.

- **Kicker:** `THE FIELD`
- **Headline:** `Everyone is converging on the same corner.`
- **Subtitle:** `Five kinds of competitor, one destination.`
- **Affordance:** `click any cluster ▸`
- **X-axis label:** `software & AI velocity`
- **Y-axis label:** `hardware & certification depth`
- **Convergence label:** `where all of them are going`
- **KUKA marker label:** `KUKA`
- **Epistemic line:** `Cluster positions are judgement. The arrows are public record.`
- **Counter:** `06 / 16`

### Panel content

**TRADITIONAL LEADERS**
Members: `ABB · FANUC · Yaskawa · Kawasaki · Comau · Stäubli · Nachi · Mitsubishi Electric · Universal Robots`
Relevance: `Decades of certified deployment and installed base. All are now buying software velocity rather than building it — ABB by sale, FANUC by alliance. Their hardware advantage is real and their software gap is the same one KUKA has.`
Chip: `confirmed`

**CHINESE INDUSTRIAL OEMs**
Members: `Estun · Inovance · Siasun · Efort · STEP`
Relevance: `Cost position established and majority share of their home market taken. The vector now points up — buying quality and certification, not just price. They compete on the same axis KUKA is strongest on, from below.`
Chip: `confirmed`

**MODERN MANUFACTURING STARTUPS**
Members: `Addverb · Ati Motors · GreyOrange · Rapyuta Robotics · Unbox Robotics · Peer Robotics · Formic`
Relevance: `Software-first, deployment-fast, capital-light. Strong in AMR, warehouse and flexible cells. Several are Indian and several are already NVIDIA Isaac-native — partners as easily as competitors.`
Chip: `confirmed`

**HUMANOID COMPANIES**
Members: `Figure · Agility Robotics · Apptronik · Tesla Optimus · Unitree · UBTech · Fourier · AgiBot · Svaya Robotics`
Relevance: `Enormously capitalised, building brain and body simultaneously. Consuming the actuator, reducer and certification supply chain KUKA and its parent already understand. The threat is talent and capital, not current industrial capability.`
Chip: `confirmed`

**PHYSICAL-AI SOFTWARE**
Members: `Physical Intelligence · Skild AI · NVIDIA (Isaac · GR00T) · Google Intrinsic · CynLr`
Relevance: `Building the base models that will commoditise. They hold the brain and lack the certified body, the safety case and the deployment data. This is the cluster to partner with, not to race.`
Chip: `confirmed`

**KUKA** *(loaded when the KUKA marker is clicked)*
Relevance: `Best position on the board — sensitive robotics, certified safety, an installed base, and an operating system already rewritten as a modular open platform. And the shortest arrow on the board.`
Chip: `confirmed`

## Data / graphics

**The map — hand-built SVG, no library.** Conceptual axes: **no numeric scales, no ticks.**

- **Axes:** thin `#C9C9CE` with arrowheads; mono labels, secondary ink.
- **Cluster blobs:** soft rounded shapes (irregular rounded rectangles or blob paths — not perfect circles), fill `rgba(17,17,19,.05)`, 1px `#C9C9CE` border, mono uppercase label centred. Active state: 2px `#FF5800` border, fill `rgba(255,88,0,.05)`.
- **Approximate positions** (fractions of plot width × height, origin bottom-left):
  - Traditional leaders — `(0.28, 0.80)` · vector → up-right, shallow, length 0.16
  - Chinese OEMs — `(0.42, 0.55)` · vector → up-right, length 0.15
  - Modern mfg startups — `(0.30, 0.40)` · vector → up-right, length 0.14
  - Humanoids — `(0.62, 0.22)` · vector → up-right, steep, length 0.18
  - Physical-AI software — `(0.80, 0.15)` · vector → up-right, steepest, length 0.20
  - **KUKA marker** — `(0.34, 0.86)` · vector → up-right, shallow, length **0.06**
  - **Every vector points up and to the right, angled so its ray enters the convergence region.** Clusters sitting under the region (humanoids, physical-AI) need steeper angles than 45° to do that.
- **KUKA marker:** visually distinct from the blobs — a filled `#FF5800` diamond or star, r≈9, with a 2px white ring and the label `KUKA` in display weight beside it. It must read instantly as the subject of the deck, not a member of a cluster.
- **Vectors:** 2px arrows with solid heads. Cluster vectors `#6E6E76`. KUKA's vector `#FF5800`. **KUKA's must be visibly the shortest on the board** — roughly one-third the mean cluster length.
- **Convergence region:** dashed 1.5px `#FF5800` rounded region in the upper-right, fill `rgba(255,88,0,.05)`, appearing at step 7. Dashed, consistent with screens 03 and 05, because it is a judgement rather than a measurement.
- **No glow** — light screen.

**`data.js` constants required:** all cluster definitions, member lists, relevance copy, positions and vector lengths live in `data.js` as a `CLUSTERS` array. Nothing hardcoded in markup.

```js
CLUSTERS = [
  { id:"traditional", label:"TRADITIONAL LEADERS", pos:[0.28,0.80], vec:[1,0.3], len:0.16,
    members:[...], relevance:"...", tier:"confirmed" },
  ...
]
KUKA_MARKER = { pos:[0.34,0.86], vec:[1,0.3], len:0.06, tier:"confirmed" }
```

**Evidence chips:** each panel carries `confirmed` — the membership and the strategic moves are public record. **The cluster positions themselves are explicitly marked as judgement by the epistemic line at the foot of the screen.** That line is required; it is what makes the map honest rather than authoritative-looking.

## Media slots

None — all native SVG/CSS. No company logos (licensing, and they would clutter the field).

## Animations

- `scaleIn` — cluster blobs, one per step
- `drawPath` — all vectors; cluster vectors together, KUKA's 300ms later
- `crossFade` — detail panel content swaps
- `fadeUp` — convergence region label
- Active-blob border transition: 200ms
- **Reduced motion:** all blobs, all vectors, convergence region and panel rendered immediately. Clicking still swaps panels. The length comparison between KUKA's arrow and the others still makes the argument statically.
- **Cleanup:** cancel all timers and rAF in `onLeave`; clear active-cluster state so a return visit reloads the default panel.

## Acceptance criteria

- Fills the viewport at 1920×1080 and 1440×900 — no scroll, no clipping; map never overlaps the panel
- Base state looks finished — axes, KUKA marker and a populated panel are present before any advance
- **KUKA's vector is unmistakably the shortest on the board** — this is the screen's payload
- **KUKA's marker is visually distinct from every cluster blob** and reads as the subject, not a member
- All arrows visibly point into the convergence region
- Clicking a cluster swaps the panel and **does not advance the step counter**
- Arrow-key stepping works identically regardless of which cluster is selected
- Unrevealed clusters are not clickable
- Panel height is reserved — no layout shift between panels
- The epistemic line is present and legible
- Neither axis carries numbers or ticks
- No company logos
- Only KUKA orange; no glow
- Reduced-motion version preserves both the vector-length comparison and panel clicking
- Copy matches this file character for character
- No console errors

## Notes

- **Why interaction here.** The field genuinely contains ~35 relevant companies. Rendering them all would produce an unreadable scatter; naming none would look thin. Clusters plus an on-demand panel carries the full picture while keeping the screen calm — and it demonstrates command of the landscape without reciting it.
- **The argument must never live in the panel.** A cold-reading advisor may not click at all. Convergence, and KUKA's short vector, are carried by the map itself. The panel adds depth only.
- **Cross-screen dependencies:**
  - Screen 07 explains *why* the vectors differ (ABB chose ownership, FANUC chose alliances, KUKA chose architecture). Do not pre-empt that reasoning here — the map shows the movement, 07 gives the causes.
  - The physical-AI software cluster's closing line (`partner with, not race`) is paid off on **screen 15** (the ecosystem play, CynLr et al.). Keep the characterisation consistent.
  - The humanoid cluster's supply-chain point connects to **screen 09** (four corners, Midea/Welling). Do not expand it here.
- **Verification flags** (carry into `VERIFY-BEFORE-SENDING.md`): cluster membership is a matter of record but individual company statuses change fast — confirm no listed company has been acquired, shut down, or materially repositioned before sending. Universal Robots sits under Teradyne; ABB Robotics' status depends on the SoftBank deal closing. Svaya Robotics is small and India-based; confirm it is still active. **Do not add funding figures or valuations to the panels** — they date fastest and screen 04 already carries the capital argument.
- **Interaction defect risk:** the most likely bug is a click both swapping the panel and advancing the step. Test explicitly.
