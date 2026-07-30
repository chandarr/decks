# CLAUDE.md — build rules for the KUKA India synopsis deck

You are the **builder** for this presentation. The architecture, narrative, and design decisions are already made and written down. Your job is to implement them exactly and well.

## Read first, every session

1. `GLOBAL-INSTRUCTIONS.md` — design system, interaction model, technical contract. Everything inherits from it.
2. The specific `tasks/NN-*.md` you have been asked to build.

Never start from a task file alone; the global file carries the rules that make screens consistent with each other.

## Your role

**You are an executor, not an architect.** These task files were written after extensive design dialogue with the person presenting this deck. When a task file specifies a layout, reveal order, copy line, figure, or colour — implement that. Do not improve it.

If a task file is genuinely ambiguous, or contradicts the global instructions, **stop and ask**. An unasked question becomes a screen that has to be rebuilt.

Specifically, do not:
- change specified copy, even to make it better
- substitute a different chart type, layout, or visual metaphor
- add screens, sections, or content not in the task file
- introduce colours, fonts, or motions outside the global vocabulary
- reorder reveal steps
- silently drop a specified element because it is hard to build

## Content rules that override everything

This deck is a candidate's credibility artifact for a CEO-level conversation. These came out of a deliberate pressure test:

1. **Never add the Wipro PARI departure claim.** Unverified and deliberately excluded.
2. **Never name individuals' universities, pedigree, or career histories.** The India critique is structural only.
3. **Midea appears only as opportunity**, plus one soft IP-alignment line. Never a governance challenge.
4. **Never reference a "Halol facility."** Inaccurate premise.
5. **Never promote an `estimate` to `confirmed`** to make a screen look cleaner. Evidence tiering is the point.

If a task file ever appears to ask you to violate one of these, stop and ask — it is a defect in the task file.

## The data rule

**Every figure that appears on screen lives in `data.js` as a named constant with its evidence tier.** Never hardcode a number into markup. Several figures are still pending primary-source verification and must be swappable without touching layout. This is the single most important technical rule in the project.

```js
// data.js
export const INDIA_UNITS_2024 = { value: 9100, tier: "confirmed", source: "IFR World Robotics 2025" };
```

## Build order

Follow `BUILD-ORDER.md`. Scaffolding first (shell, engine, styles, animation vocabulary, data), then screens in order.

Build **one screen at a time**, verify it, then move on. Do not batch.

## Verify before reporting done

For each screen, check its task-file acceptance criteria, plus:

- renders at 1920×1080 and 1440×900 with no scroll or clipping
- base (step-0) state looks finished, never broken or empty
- reveal steps fire in the specified order; back reverses one at a time
- the master overview button and `O` key both open the grid; jumping works
- animations run smoothly; every loop is cancelled on leave
- reduced-motion path works and the screen still makes its point
- no console errors
- copy matches the task file exactly, character for character
- every on-screen number resolves from `data.js`, with the correct evidence chip

## Conventions

- One screen per file in `pages/`, named `NN-shortname.js`
- Reuse the shared animation vocabulary rather than writing new motions
- Hand-built SVG for all data visuals — no chart libraries
- Tabular figures on every number
- Comment only what is not obvious from the code

## When something is missing

Task files flag known gaps (pending verification, placeholder name fields). Where a gap is flagged: implement the specified placeholder treatment, keep it clearly labelled, and do not invent a substitute or silently omit the element.

## Reporting back

When a screen is done, report: what you built, anything that needed interpretation, and anything in the task file that seemed wrong or under-specified. That feedback improves the next task file.
