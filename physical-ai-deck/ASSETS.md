# Assets

## Media

**None required.** Every page is native SVG/HTML rendered from the tokens. No images, video, or fonts beyond the CDN font `<link>` (with system fallback). The deck must run offline from `file://`.

## Illustrative (labelled) content — not real data

- **Page 08 (Composer):** the example `requirement / budget / application` and the output stack are illustrative; keep them labelled *example*.
- **Page 16 (Roadmap):** the valuation "stair" is a schematic of *re-rating*, not a forecast — no numbers/multiples/currency.

## Real figures used (from `reference/Physical-AI-Lab_Strategy-Handoff.md`, appendix)

- Page 03: cost of running a model down **~1,500×** in six years (countUp). Scale/Meta neutrality note.
- (Optional appendix) VLA latency: π0 on Jetson Thor ~19 Hz vs H100 ~162 Hz; targets 10 / 100 Hz. Jetson Thor ~2,070 FP4 TFLOPS, 40–130 W. Memory-bandwidth gap 30–50×. SLM 10–30× cheaper. Liquid AI $250M (AMD). These live in the appendix only unless a task file calls one in.

## Optional appendix (backup slides — build only if AC requests)

Per `01-ASSUMPTIONS.md`, these back the "what breaks this" page for a deep-dive founder:
- `A1` — LLM value-chain map (the 15-layer stack) — supports pages 03/04.
- `A2` — VLA-latency + edge-reality data — supports page 05/10 (the Jetson/edge argument).
- `A3` — certification-standard landscape (ISO 10218/TS 15066, ISO 21448, UL 4600, EU Machinery Reg) — supports page 07.
- `A4` — per-weak-joint detail cards (NVIDIA, business model, cert overreach, Composer, superhuman-vs-platform, talent, scope) — supports page 17.

Each appendix page, if built, follows the same globals and is placed after page 19 (not in the main `actMarkers` flow).
