# Global instructions — KUKA India synopsis deck

> The inheritance layer. Everything true across all screens lives here so per-screen task files stay thin and a global change costs one edit.
> Task files inherit all of this. Global rules win unless a task file explicitly overrides a named rule.

## 1 · What this is

A screening synopsis delivered as an HTML slide deck, routed through an advisor who asked to see the candidate's thinking before an introductory meeting with KUKA's Global CEO. The advisor reads it alone first (must be self-standing), and the candidate later walks it live (arrow-driven reveals). Nineteen screens in four acts — fifteen content screens plus a divider opening each act.

**Target belief:** "This person operates at global-strategy altitude, tells the truth about hard things, and sees a reframe of KUKA's India play bigger than a country-manager job — I want him in the room."

**Audience design constraint:** technical + business evaluators. Evidence discipline, honest limitations, restraint. The craft of the deck is itself part of the argument. Dark-throughout would read as "tech demo" and undercut credibility — hence light middle with dark bookends.

## 2 · Format & runtime

- **Output:** HTML deck, modular files, no build step
- **Screens:** 19 (15 content + 4 act dividers)
- **Aspect / resolution:** 16:9, fluid via `clamp()`; verify at 1920×1080 and 1440×900
- **Presented:** both self-read (advisor, cold, in a browser) and live (candidate driving)
- **Connectivity:** assume available; Google Fonts via CDN **with system-font fallback in every stack** so it degrades gracefully offline

## 3 · Navigation & interaction

- **Advance:** `→` / `Space` / click right half — reveals the next step within a screen; only moves to the next screen when all steps are shown
- **Back:** `←` / click left half — reverses one step at a time, then to the previous screen
- **Overview:** dedicated **master navigation button** (persistent, top-right) **and** the `O` key / `Esc` — opens a grid of all 19 screens with titles; click any to jump. This is an explicit requirement, not optional.
- **Replay:** `R` — replays the current screen's animation
- **Jump:** `Home` / `End`
- **Progress:** slim rail with 19 clickable segments + `NN / 19` counter
- **Base state rule:** every screen's step-0 state must look finished — kicker, title and subtitle always visible; only supporting content is staged. A screen must never look broken or empty.
- Keyboard hint appears briefly on screen 1, then auto-fades.

## 4 · Design system

### 4.1 Palette — light middle, dark bookends

```
LIGHT (screens 2–18)
canvas       #FFFFFF        section blocks #F5F5F7
panel        #FFFFFF        border #E5E5E8 (1px hairline)
ink          #111113        primary text
secondary    #6E6E76        secondary text
accent       #FF5800        KUKA orange — active states, key numbers, emphasis
data         greyscale by default; orange for emphasis only

DARK (screens 1 and 19 only)
base         #0A0A0B → #131316   subtle vertical gradient
surface      rgba(255,255,255,.05) + luminous hairline
ink          #F4F4F6        secondary #9A9AA4
accent       #FF5800        same orange, allowed to glow here only
```

**Depth:** light screens use hairlines, whitespace and `0 1px 3px rgba(0,0,0,.06)` / `0 10px 30px -12px rgba(0,0,0,.16)`. **No glow on light screens** — glow belongs to the dark bookends only. Mixing them makes a light deck look cheap.

**Accent discipline:** KUKA orange is the *only* hue. Comparisons, SWOT quadrants and the competitive map use greyscale + position + orange-emphasis rather than a second colour. Never more than one accent ramp visible at once.

**Where orange goes — the deck-wide rule.** The deck is text-dense, so orange is what gives a page of type a focal point. Every screen carries it in the same three roles, and no others:

1. **The kicker.** Orange on every screen, light and dark. One per screen, top left — the constant accent anchor.
2. **The payload line.** The one sentence a screen exists to deliver — the closing statement, the verdict, the punchline. Where a screen closes on two lines, only the *operative* one is orange; a concession and a verdict must never carry equal weight.
3. **The figure or element that is the subject.** KUKA's marker, KUKA's column, the signal figures, the density bar, the surviving strand. On a comparison, only the column the reader should track — colouring every figure says nothing about which one matters.

Everything else stays ink and secondary: body copy, block-level mono headings (`WHO HOLDS WHAT`, `THE DEMAND`, `THE MODELS`), competitor and neutral data, supporting lines. Three exceptions, where a mono label is itself the screen's subject or its only structural device: the ecosystem move indices, the diagnosis row labels, and the two direction titles on the posture screen (`COMING FROM THE BODY` / `COMING FROM THE BRAIN`) — that screen's whole argument is which side a competitor is arriving from.

The test: **on any screen, you should be able to say in one sentence why each orange thing is orange.** If a screen has more than three or four orange elements, one of them is decoration — take it out.

**Bookend transition:** ~500ms wash between dark and light, not a hard cut, so the switch reads as intentional.

### 4.2 Typography

- **Display:** Space Grotesk — titles, big numbers
- **Body:** Inter — body copy, card text
- **Data/mono:** JetBrains Mono — kickers, evidence chips, axis ticks, readouts. Uppercase kickers with wide tracking read as "instrument".
- Fluid sizing via `clamp()`; **tabular figures for every number**; sentence case throughout (Title Case reads corporate); titles ≥ 36pt equivalent; nothing below ~16pt.

### 4.3 Evidence tiering — a deck-wide device

Every data point carries a chip marking its epistemic status. This is a core credibility mechanism, not decoration — the deck marks its own uncertainty, which is the point being made about the candidate.

```
confirmed   orange dot   primary-sourced (IFR, deal announcements, filings)
estimate    grey dot     analyst/derived — method stated where it matters
frontier    hollow dot   thesis / forward-looking / aspirational
```

Named source appears inline on data cards (e.g. `IFR World Robotics 2025`).

## 5 · Animation vocabulary

Shared, named motions in `anim.js`. Every screen reuses these rather than inventing new ones.

| Name | Effect | Use for |
|---|---|---|
| `fadeUp` | opacity + 12px translateY, 380ms | default `.step` reveal |
| `scaleIn` | 0.97→1 with shadow lift | cards, panels |
| `drawPath` | SVG stroke-dashoffset draw-on | cover/close trajectories, map axes, flywheel ring |
| `countUp` | tabular number roll-up | signals, paradox, comparison figures |
| `jointStagger` | per-joint power-up with servo easing (slight overshoot, settle) | cover/close arm only |
| `converge` | elements travelling toward a centre | flywheel assembly |
| `crossFade` | swap content in a shared slot | competitive map states |

**Reduced motion:** `prefers-reduced-motion` reveals all steps immediately, draws trajectories static, runs no loops — and every screen must still make its point.

**Cleanup:** cancel every animation loop and `requestAnimationFrame` in `onLeave`. No exceptions.

## 6 · Technical contract

- **Dependencies:** none beyond Google Fonts CDN (pinned link, system fallback). No frameworks, no chart libraries — all visuals are hand-built SVG/CSS.
- **Storage:** no `localStorage` / `sessionStorage`. In-memory state only.
- **Run context:** must work opened as a local file *and* served over http.
- **Performance:** 60fps target; no console errors.
- **Numbers:** every figure that appears on screen must be defined in `data.js` as a named constant, never hardcoded in markup — several are pending verification and must be swappable without touching layout. This is a hard rule.

## 7 · File structure

```
kuka-deck/
  index.html          shell + font links + mount point
  styles.css          design system, themes, shared components
  engine.js           registration, nav state machine, overview grid, progress rail
  anim.js             the shared animation vocabulary
  data.js             ALL on-screen figures as named constants + evidence tier
  pages/
    01-cover.js  …  15-proposition.js
    02a-act-i.js, 05a-act-ii.js, 08a-act-iii.js, 11a-act-iv.js
                      the four act dividers; each is one call to
                      ActDivider.register(). Letter-suffixed because they
                      were inserted after the content screens were built —
                      running order is the script order in index.html.
  act-divider.js      the shared act-divider screen
  reference/          source research + prior prototype
  tasks/              one task file per screen
```

## 8 · Page module contract

```js
page({
  id: "06-three-responses",
  title: "Three responses to one inflection",   // for the overview grid
  theme: "light",                                // "light" | "dark"
  render: () => `<markup; staged elements carry class "step">`,
  steps: 4,
  onEnter: (el, ctx) => {},    // ctx: { revealStep, isReduced, data }
  onStep:  (el, i) => {},
  onLeave: (el) => {},         // cancel every loop
});
```

## 9 · Engine responsibilities

Screen registration and order; navigation state machine (step-within-screen then screen-to-screen); theme application and the dark↔light wash; progress rail and step indicators; the master overview grid; keyboard handling; global reduced-motion flag; guaranteeing `onLeave` cleanup on every transition.

## 10 · Task-file format

Every screen is specified in `tasks/NN-name.md` with: Purpose · Layout · Steps · Copy · Data/graphics · Media slots · Animations · Acceptance criteria · Notes.

**The builder implements the task file exactly.** If a task file leaves a structural or visual decision open, that is a defect in the task file — ask rather than invent.

## 11 · Content rules that override any instinct to improve

These come from a pressure test and are non-negotiable:

1. **Never add the Wipro PARI departure claim.** Unverified; deliberately excluded.
2. **Never name individuals' universities, pedigree, or career histories.** The India critique is *structural only* — the entity was built for a trader-support mandate that no longer fits. Generous to people, damning to design.
3. **Midea appears only as opportunity** — combining Chinese manufacturing strength with Indian development and German precision — plus one soft line on IP alignment. Never the pointed governance challenge.
4. **Never reference a "Halol facility."** Inaccurate premise; excluded.
5. **Mark evidence tiers honestly.** Do not promote an estimate to a confirmed fact to make a screen cleaner.
