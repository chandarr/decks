# Page 18 — Beyond a single robot · "Physical AI is bigger than a robot"

> Inherits `GLOBAL-INSTRUCTIONS.md` (§11 center-weight; §12 motion; §13 reveal — core first, nodes one at a time, connection last). Light theme, off-white/ink, no glow. Act V. Deck v3.

## Purpose

Expand the vision at the end: as the ecosystem matures, "embodiment" stops meaning a single robot and becomes a whole intelligent environment — and the same orchestration that composes one machine composes the environment. Shows the thesis scales far past robots. Callback to slide 04's hub-flow, now at environment scale.

The one idea: *The orchestration that composes a robot composes a whole intelligent environment.*

## Layout (center-weighted, expand — §11, §13)

All content in the central band (y ≈ 200–780); bottom ~20% chrome only.

- **Top chrome:** kicker top-left; slide-no "18" top-right.
- **Title** — Archivo, ~y150–230.
- **Core (base, center ~y480):** a single machine node — the one robot we've built toward.
- **Environment nodes:** on reveal, several system nodes appear around the core (gates, valves, conveyors, arms, instruments) — the embodiment becomes an environment.
- **Orchestration links:** the same ink orchestrator flow connects them toward one goal — revealed LAST.
- **Environment examples** (a mono row, within band) + **takeaway**.

## Steps (reveal order — §13)

**0 — Base:** kicker, slide-no, title, and the single machine node at center. Calm — one machine.
**1 — The environment appears:** the view expands; several system nodes `radiate` out around the core (many machines, one setting).
**2 — One goal, orchestrated (payoff):** the orchestration flow connects the nodes to a single goal — the same hub-flow as slide 04, now at environment scale.
**3 — The examples + the line:** the environment examples (warehouse · lab · fleet) fade in; takeaway lands.

*(3 advance beats after base. Back reverses; `onLeave` cancels the orchestration `flow` loop.)*

## Copy (exact)

- **Kicker:** `The horizon`
- **Title:** **Physical AI is bigger than a robot.**
- **Core:** `ONE MACHINE`
- **Expansion line:** The embodiment becomes the environment — many machines, one goal.
- **Orchestration line:** The same orchestration that composes a robot composes a whole environment.
- **Environment examples:** `Intelligent warehouses · self-driving labs · orchestrated fleets`
- **Takeaway (central band):** **We compose machines today — and intelligent environments tomorrow.**

*(Sentence case for prose; `ONE MACHINE` + the examples row UPPER/mono.)*

## Data / graphics

Native inline SVG. Core = an ink machine node. Environment nodes = smaller ink nodes (gates/valves/conveyors/arms/instruments — a few, labeled lightly). Orchestration = ink flow lines from a central orchestrator to each node, converging on one goal marker. Reuse slide 04's flow motif/tokens (continuity). No glow, no `--alert`.

## Media slots

None — all native.

## Animations

`radiate` (environment nodes out from the core); `anim.flow` (orchestration links to the goal — the payoff, LAST — §13); `fadeUp` (examples, takeaway). **Reduced motion:** full environment with static orchestration links to the goal, examples + takeaway visible. **Cleanup:** `onLeave` cancels the flow loop.

## Acceptance criteria

- **§13:** single machine present in base; environment nodes appear; the orchestration connection animates LAST.
- **Center-weighted:** the expanded environment + examples + takeaway within the central band (§11).
- Reads as an *expansion* (one machine → environment), and the orchestration is clearly the same capability at larger scale (callback to slide 04).
- Off-white/ink only, no glow, no `--alert`; base finished; reduced-motion correct; **no loop survives `onLeave`**; no console errors.

## Notes

- Penultimate page — the vision lift before the closing page. Keep it clean; let the expand + the callback do the work.
