# Page 14 — Agentic execution · "Rapid, without compromising quality"

> Inherits `GLOBAL-INSTRUCTIONS.md` (§11 center-weight; §12 motion; §13 reveal one-at-a-time, connection last). Light theme, off-white/ink, no glow. Act IV. Deck v3.
> Goal (AC): show how we develop *rapidly without compromising quality*, and how the team works — humans + agents.

## Purpose

Break the speed-vs-quality trade-off: agents build the software at volume and continuously; humans do the frontier and own the quality bar through review; every build passes automated verification + human review before it ships. This is also the team's operating model — a small expert core amplified by agents.

The one idea: *Agents give us speed, humans keep the quality, and a review gate guarantees both.*

## Layout (center-weighted, production flow — §11, §13)

All content in the central band (y ≈ 200–780); bottom ~20% chrome only.

- **Top chrome:** kicker top-left; slide-no "14" top-right.
- **Core message (base, centered ~y280):** `Fast and right — not a trade-off.`
- **Production flow (center):** left→right stations — `HUMANS · intent + frontier` → `AGENTS · build (parallel)` → `QUALITY GATE · verify + review` → `SHIP`. `AGENTS` shown as several small parallel nodes producing quickly; `HUMANS` a small high-leverage node; the `QUALITY GATE` a checkpoint every build passes.
- **Two role captions** (under the flow, within band): what agents do / what humans do.
- **Takeaway** centered ~y750.

## Steps (reveal order — §13: core → blocks one at a time → connection last)

**0 — Base:** kicker, slide-no, title, the core message centered, and the flow skeleton (four faint stations). Core at rest.
**1 — Agents build:** the `AGENTS` node (several parallel workers) lights + its caption — build the software, in parallel, continuously.
**2 — Humans do the frontier + own the bar:** the `HUMANS` node + caption — research, architecture, safety judgment, and the review gate.
**3 — The flow (payoff):** the production line runs together — agent output streams fast through the `QUALITY GATE` (a verify+review check on each item) to `SHIP`. Speed from volume; quality from the gate.
**4 — The line:** takeaway lands.

*(4 advance beats after base. Back reverses; `onLeave` cancels the production `flow` loop and the gate-check motion.)*

## Copy (exact)

- **Kicker:** `How we work · execution`
- **Title:** **Rapid, without compromising quality.**
- **Core message:** `Fast and right — not a trade-off.`
- **Agents caption:** **Agents build the software** — pipelines, tooling, integration, tests, the orchestration plumbing. In parallel, around the clock.
- **Humans caption:** **Humans do the frontier** — research, architecture, safety judgment — and own the quality bar through review.
- **The gate line:** Every build passes automated verification and human review before it ships. Speed from volume; quality from the gate.
- **Takeaway (central band):** **A small team of experts, amplified by agents — we move at scale without lowering the bar.**

*(Sentence case for prose; `HUMANS`, `AGENTS`, `QUALITY GATE`, `SHIP` UPPER/mono.)*

## Data / graphics

Native inline SVG. Production line = four ink stations on a baseline. `AGENTS` = a small cluster of ~4 parallel nodes (to read "volume/parallel"); `HUMANS` = one node; `QUALITY GATE` = a checkpoint glyph (a gate/check); `SHIP` = an endpoint. Work items = small ink tokens that stream from AGENTS through the GATE (each gets a ✓ at the gate) to SHIP. No glow, no `--alert` (a rejected item at the gate can flash a subtle `--alert` ✗ then correct — optional, sparse). Captions `--secondary`; lead-ins bold.

## Media slots

None — all native.

## Animations

`scaleIn`/`fadeUp` for the AGENTS and HUMANS blocks (one at a time — §13); on beat 3, `flow` the production line and stream tokens through the `QUALITY GATE` (each token gets a ✓) to `SHIP` — fast but gated. **Reduced motion:** flow shown static with directional arrowheads and a couple of ✓'d items at the gate; both role captions + takeaway visible. **Cleanup:** `onLeave` cancels the flow + gate-check loops.

## Acceptance criteria

- **§13:** core message centered in base; AGENTS then HUMANS revealed one at a time; the production flow animates LAST.
- **Center-weighted:** flow, captions, takeaway within the central band; nothing near the bottom edge (§11).
- The motion makes the point: agent output is *fast and high-volume*, and the `QUALITY GATE` (verify + human review) is unmistakable — speed without dropping quality.
- The team model reads clearly: agents build, humans do the frontier + own the bar. Copy matches this file.
- Off-white/ink only, no glow (one optional sparse `--alert` ✗ at the gate); base finished; reduced-motion correct; **no loop survives `onLeave`**; no console errors.

## Notes

- Continuity: "a small team of experts amplified by agents" ties to slide 13's ~10 core + ~60 base — the agents multiply that team's throughput.
- Register: this is a "how AC leads engineering" signal — confident, concrete; agents-under-human-review, never agents-unsupervised. No invented productivity metrics.
