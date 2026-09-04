# CLAUDE.md — build rules for "Winning the Widening Middle of Physical AI"

You are the **builder** for this presentation. The architecture, narrative, and design decisions are made and written down. Implement them exactly and well.

## Read first, every session

1. `GLOBAL-INSTRUCTIONS.md` — design system, interaction model, technical contract. Everything inherits from it.
2. The specific `tasks/NN-*.md` you're building.
3. `reference/Physical-AI-Lab_Strategy-Handoff.md` — background only; the task file is the source of truth for what goes on the page.

Don't start from a task file alone.

## Your role

**Executor, not architect.** Implement the specified layout, reveal order, copy, and colour — don't improve them. If a task file is genuinely ambiguous or contradicts the globals, **stop and ask**.

Do not: change copy (even to improve it) · substitute a chart type or layout · add pages/sections/content · introduce colours, fonts, or motions outside the global vocabulary · reorder reveal steps · silently drop a hard element · **add any glow, bloom, gradient wash, or dark theme** (this deck is authoritative off-white, ink line-work only).

## Build order

Follow `BUILD-ORDER.md` / `build-order.txt`. Scaffolding first (shell, tokens, `_shared.js`), then pages in order. Build **one page at a time**, verify, then continue automatically.

## Scaffolding specifics

- Copy the starter runtime. Edit **only** the token block in `styles.css` to §4 of the globals, and the fonts `<link>` + `<title>` + `deckConfig.actMarkers` in `index.html`.
- `deckConfig.actMarkers = [4, 9, 10, 17]` (zero-based page indexes where Acts II–V begin).
- Build `slides/_shared.js` first: `locatorMap(activeKey)`, `tierChip(level)`, `kicker`, `carry` (globals §9). Register its `<script>` before the page scripts.
- Do not modify `engine.js` or `anim.js`.

## Verify before reporting done

Per page: acceptance criteria in its task file, plus — renders at 1920×1080 with no scroll/clip; base state looks finished; steps fire in order and reverse; reduced-motion end state legible; loops cancelled on leave; no console errors; **copy matches the task file character-for-character**; only tokenised colours used.

## Conventions

- One page per file: `slides/NN-name.js` matching the task filename.
- Register script tags in `index.html` in **presentation order** (= build order here).
- Reuse `_shared.js` (`locatorMap`, `tierChip`) rather than re-drawing the map per page.
- The locator map appears on the bucket/act pages (05–09, and where a task file calls for it); it must highlight the correct `activeKey` and otherwise match slide 01's schematic exactly (same geometry, tokens, no glow).
- Comment only what isn't obvious.

## When something is missing

Task files flag gaps (illustrative figures, optional appendix). Implement the specified placeholder, keep it clearly labelled, don't invent a substitute or silently omit.

## Reporting back

Per page: what you built, anything that needed interpretation, anything that seemed wrong or under-specified.
