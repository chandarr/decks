# Page 07 — Assurance · "Failure-data → certification for systems whose model updates weekly"

> Inherits `GLOBAL-INSTRUCTIONS.md`. Light theme. Act II. Locator: `locatorMap("assurance")`. This page also seeds the moat (page 10).

## Purpose

Bucket 3: the trust engine — the moat with no strong LLM analog. Show the failure-data engine feeding a new certification discipline for probabilistic, continuously-updated embodied systems, and evidence-tier it honestly so it doesn't overreach.

The one idea: *You can't certify a failure boundary you haven't characterized — so we build the failure-data engine, then the certification discipline on top.*

## Layout

Two linked blocks left→right with a bold ink arrow between: **[C1] The failure-data engine** → **[C2] Certification for updating systems**. Below C2, a short "why it's white space" strip listing the standards that can't handle weekly model updates. Right edge: an evidence-tier ladder (NEAR-TERM → BUILDING → ASPIRATIONAL) mapping the three parts. `--alert` used sparingly for the consequence framing. Locator top-right. Carry bottom.

## Steps (reveal order)

**0 — Base:** kicker, title, locator, the two empty block outlines + the arrow.
**1 — C1:** the failure-data engine fills — "the world's data says how to do it right; almost none says what goes wrong." Two sources: world-model rollouts + real-world capture.
**2 — C2:** the certification block fills; the ink arrow `drawPath` from C1→C2 ("the failure corpus is the evidence base").
**3 — White space:** the standards strip reveals (ISO 10218 / TS 15066, ISO 21448 SOTIF, UL 4600, EU Machinery Reg 2023) with the line "none handle weekly model updates"; the tier ladder maps each part; carry.

*(3 beats.)*

## Copy

- **Kicker:** `What we build · 3 of 3`
- **Title:** **Assurance — the trust layer nobody is building.**
- **C1 — Failure-data engine:** Every dataset encodes *how to do it right.* Almost none encodes *what goes wrong, and how to detect, avoid, or recover.* We generate it two ways: world-model rollouts (cheap edge-case synthesis) and real-world capture (rare ground truth).
- **C2 — Certification:** The failure corpus is the evidence base for certifying a probabilistic system — continuous assurance, runtime safety monitors, *"this embodiment + this model version + this application = certified."*
- **White space:** ISO 10218 / TS 15066 · ISO 21448 (SOTIF) · UL 4600 · EU Machinery Regulation 2023 — all built for slow, deterministic software. **None handle a system whose model updates weekly.**
- **Tiers:** `NEAR-TERM` failure-data + safety cases · `BUILDING` continuous-assurance tooling · `ASPIRATIONAL` a certification authority (partner with TÜV/UL; standard-setter first, not year-one).
- **Carry:** `an LLM mistake is retryable — a robot's is not. this is the fulcrum.`

## Data / graphics

Native. Two `.panel` blocks + ink connector arrow. Standards as mono chips (hairline). Evidence ladder using `tierChip()`. `--alert` only on the "an LLM mistake is retryable — a robot's is not" consequence line.

## Media slots

None.

## Animations

`fadeUp` blocks/strip; `drawPath` the C1→C2 arrow. **Reduced motion:** both blocks, arrow, strip, ladder shown.

## Acceptance criteria

- The C1→C2 dependency (failure-data = evidence for certification) is unmistakable.
- Aspirational tier honestly marks the certification-authority ambition (partner-first, not overreach).
- `--alert` used once, not as a theme.

## Notes

- Weak joint #3 (cert-body overreach) is defused here by the tiering — keep it visible.
