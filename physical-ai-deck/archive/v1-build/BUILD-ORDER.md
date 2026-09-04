# Build order — Winning the Widening Middle of Physical AI

## How to use this folder

1. Open this folder in Claude Code.
2. Invoke the **deck-builder** skill. It reads `CLAUDE.md` and `GLOBAL-INSTRUCTIONS.md` automatically.
3. It scaffolds, then builds pages one at a time in the order below, verifying each against its task file.
4. For a hands-off build: `bash <deck-builder-skill>/scripts/build.sh .`

## Stage 1 — Scaffolding

- [ ] Copy the deck-builder starter runtime (`index.html`, `styles.css`, `engine.js`, `anim.js`, `README.md`); create `slides/`, `media/`.
- [ ] `styles.css` — replace ONLY the `:root` token block with GLOBAL-INSTRUCTIONS §4.1 (light theme only; do not add a dark block). Set the font tokens to Archivo / IBM Plex Sans / IBM Plex Mono.
- [ ] `index.html` — set `<title>Winning the Widening Middle of Physical AI</title>`, update the fonts `<link>` (Archivo:wght@600;700;800, IBM+Plex+Sans:wght@400;500;600, IBM+Plex+Mono:wght@400;500), set `deckConfig.actMarkers = [4, 9, 10, 17]`.
- [ ] `slides/_shared.js` — build `locatorMap(activeKey)`, `tierChip(level)`, `kicker`, `carry` (GLOBAL-INSTRUCTIONS §9). Register its `<script>` before page scripts. Derive `locatorMap` from page 01's schematic.
- [ ] Verify: empty deck navigates, tokens applied (off-white/ink), no console errors.

## Stage 2 — Pages

| Order | Task file | Depends on | Status |
|---|---|---|---|
| 1 | `tasks/01-thesis-map.md` | scaffolding, `_shared.js` (extract `locatorMap` here) | |
| 2 | `tasks/02-the-insight.md` | | |
| 3 | `tasks/03-llm-arc.md` | | |
| 4 | `tasks/04-the-prediction.md` | | |
| 5 | `tasks/05-adaptation.md` | `locatorMap` | |
| 6 | `tasks/06-autonomy.md` | `locatorMap` | |
| 7 | `tasks/07-assurance.md` | `locatorMap`, `tierChip` | |
| 8 | `tasks/08-the-composer.md` | `locatorMap`, `tierChip` | |
| 9 | `tasks/09-superhuman.md` | `locatorMap` | |
| 10 | `tasks/10-the-moat.md` | | |
| 11 | `tasks/11-team-operating-model.md` | | |
| 12 | `tasks/12-global-research-team.md` | | |
| 13 | `tasks/13-india-talent-academy.md` | | |
| 14 | `tasks/14-agentic-execution.md` | | |
| 15 | `tasks/15-ip-strategy.md` | | |
| 16 | `tasks/16-roadmap-valuation.md` | | |
| 17 | `tasks/17-what-breaks-this.md` | | |
| 18 | `tasks/18-beyond-a-single-robot.md` | `locatorMap` | |
| 19 | `tasks/19-close.md` | `locatorMap` (faint motif) | |

Build page 01 first — it sets the craft bar and produces `locatorMap`.

## Stage 3 — Integration

- [ ] Full run-through at 1920×1080; legible from the back.
- [ ] Reveal counts match each task file; back reverses; `R` replays; `O` overview; `F` fullscreen.
- [ ] Locator map consistent across pages 01, 05–09, 18, 19 (same geometry, correct `activeKey`).
- [ ] Evidence-tier chips consistent (pages 05, 07, 08).
- [ ] `--alert` appears only on pages 07, 10, 17; `--accent-fusion` only once (page 10 row 1).
- [ ] Reduced-motion run-through; no console errors; runs from `file://` offline.

## Open items

| Item | Blocking? | Owner | Notes |
|---|---|---|---|
| Beachhead vertical name | No | AC | pages 08/09/16 use "subsea/mining/O&G" as illustrative; swap in the chosen one when decided |
| Company capital/assets | No | AC | roadmap (16) stays relative (stages, not dates) until known |
| Kuka research | No | AC | fold into appendix as industrial background when available |
| Partner/OEM logos | No | AC | text-only by default; add greyscale logos only if licence-cleared |

## Known placeholders

- The Composer example values (page 08) and the valuation stair (page 16) are labelled **illustrative** — keep them labelled; do not present as real figures.
- Optional appendix backups (see ASSETS.md) are not in the 19-page core; build only if requested.
