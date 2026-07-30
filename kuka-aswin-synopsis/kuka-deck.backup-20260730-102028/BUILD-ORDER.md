# Build order

Build in this sequence. Verify each stage before moving on.

## Stage 0 — Scaffolding (build all five, then verify together)

1. **`index.html`** — shell, Google Fonts links (Space Grotesk, Inter, JetBrains Mono, each with system fallback), mount point, script includes.
2. **`styles.css`** — the full design system from `GLOBAL-INSTRUCTIONS.md` §4: CSS custom properties for both light and dark palettes, typography scale with `clamp()`, evidence-chip components, card/panel components, progress rail, overview grid, master nav button.
3. **`anim.js`** — the seven named motions in §5. Nothing else.
4. **`data.js`** — every on-screen figure as a named constant with `{ value, tier, source }`. Populate from the task files as you build; start with the constants named in tasks 04, 11 and 12.
5. **`engine.js`** — page registration, navigation state machine (step-within-screen, then screen-to-screen), dark↔light wash, progress rail, master overview grid, keyboard handling (`→ ← Space O Esc R Home End`), reduced-motion flag, guaranteed `onLeave` cleanup.

**Verify stage 0 with two throwaway stub screens** (one light, one dark) before building any real screen: arrows step and advance, overview button opens and jumps, the bookend wash looks intentional, reduced-motion works, no console errors. Fixing the engine after thirteen screens exist is expensive.

## Stage 1 — Screens, in order

Build strictly in narrative order. Each has a task file in `tasks/`.

```
01-cover              dark    ACT I
02-four-acts          light
03-inflection         light
04-signals            light
05-what-changes       light
06-competitive-map    light   ACT II
07-three-responses    light   ← strategic hinge
08-four-corners       light   ← ACT II close, structural keystone
09-paradox            light   ACT III  ← tension peak
10-india-comparison   light   ← rigor screen
11-diagnosis          light
12-two-layers         light   ACT IV
13-flywheel           light   ← centerpiece
14-ecosystem          light
15-proposition        dark    ← close
```

**The SWOT screen was dropped** (see `tasks/09-paradox.md` Notes): screens 06, 07 and 08 cover
competitive positioning more specifically than a four-quadrant grid would, and a SWOT after them
would read as the one generic screen in the deck. Everything from four-corners onward shifted up
by one and the deck is **15 screens**. Counters and the overview grid derive from the registered
page count, so they follow automatically.

## Stage 2 — Passes

1. **Consistency pass** — orange used for the same semantic role everywhere; evidence chips correct on every figure; terminology identical across screens ("Automation 2.0", "physical AI", "trader-support"); the arm motif on 01 and 15 lines up; reveal cadence comparable.
2. **Cold-open test** — open the deck in a fresh browser as the advisor will, with no prior context. Does screen 1 land in five seconds? Does it read without narration?
3. **`VERIFY-BEFORE-SENDING.md`** — work the checklist. Every pending figure confirmed against a primary source and swapped in `data.js`, or removed.

## Known open items

- Candidate name and credential line on screens 01 and 15 are FINAL (Dr. Ir. Aswin Chandarr) — confirmed, not placeholders.
- Several figures pending primary-source verification; all live in `data.js` and are swappable. See `VERIFY-BEFORE-SENDING.md`.
- `reference/prior-prototype-10screen.html` is an earlier 10-screen build kept only for motif reference. **Do not copy from it** — the architecture differs. Build fresh from the task files.
