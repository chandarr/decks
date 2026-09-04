# Global instructions — Winning the Widening Middle of Physical AI

> The inheritance layer. Everything true across all pages lives here so per-page task files stay thin and a global change costs one edit. Per-page task files inherit all of this. Global rules win unless a task file explicitly overrides a named rule.

## 1 · What this is

A 19-page presenter-driven HTML deck: the Head-of-Technology plan for a **vendor-neutral, India-HQ'd (globally-scoped) Physical AI research + monetization lab** that sits between frontier model labs (left) and robot/embodiment providers (right). Governing thought: *neither end delivers real-world value alone; the enabler is the integrating middle that composes the right model + right embodiment + a reliable harness for a real application* — via three capabilities (Adaptation, Autonomy, Assurance) that emerge into a "Composer," with superhuman capability as a bonus.

**Target belief:** by the last page, the founder is convinced AC is the right person to lead the technology — and hiring him feels like the obvious next step. The deck does NOT sell the vision (he's already sold); it demonstrates clarity of thought, structure, domain depth, and execution realism.

**Audience design constraint:** one viewer — a sharp techno-commercial founder who took a company to IPO, owns market + funding, watches the market closely. Earns respect through clarity, structure, foresight (anticipating hard questions), and firsthand execution reality. Loses it through hype, vision hand-waving, overselling, or a claim he can puncture. Register: senior, technical, confident, realist. Never a "fund this" pitch; the close *implies* the ask, never states it.

## 2 · Format & runtime

- **Output:** HTML deck on the deck-builder starter runtime (`index.html` + `styles.css` + `engine.js` + `anim.js`, page modules in `slides/`).
- **Pages:** 19 core + optional backup appendix (see ASSETS/BUILD-ORDER).
- **Aspect / resolution:** 16:9 at 1920×1080 fixed stage, scaled to fit; verify legibility from the back of a room.
- **Presented:** live, presenter-driven, step-revealed. Also survives being sent as a file.
- **Room:** laptop → large screen / projector; assume variable lighting → **light theme only** (authoritative off-white).
- **Connectivity:** assume it may be offline. Fonts load from Google CDN with system fallback; the deck must remain acceptable with fonts unloaded.

## 3 · Navigation & interaction

Use the deck-builder engine defaults, unchanged:
- **Advance:** →/Space/click — reveals the next step; moves to next page only when all steps shown.
- **Back:** ← — reverses one step at a time.
- **Overview:** `O` · **Replay:** `R` · **Fullscreen:** `F` · **Jump:** Home/End, overview clicks.
- **Base-state rule:** every page's step-0 state must look finished, never like a broken page.

## 4 · Design system

Authoritative engineering-document register: off-white paper, ink line-work, generous whitespace, hairline rules, restraint. **No glow, no neon, no gradient washes, no dark theme.** The "bridge / Composer / enabler" is drawn in confident **ink** — the deck's own authoritative voice — while the two worlds carry the muted accents.

### 4.1 Palette — override the starter `:root` block with exactly these (light theme only)

```
--canvas: #F3F1EA          paper ground
--panel: #FBFAF6           lifted surface
--hairline: #D8D4C8        rules / borders
--ink: #191B18             text + the bridge/Composer/enabler
--secondary: #5D6058       muted ink / captions
--accent-a: #A96A2C        EMBODIMENT world (bronze / warm)
--accent-b: #2C566E        MODEL world (slate / cool)  ← also the engine's progress + step-dot accent
--accent-fusion: linear-gradient(90deg,#2C566E,#A96A2C)   use only for a single unifying underline; never a fill wash
--alert: #B0532E           friction / honesty (weak-joint, "what breaks this")
--shadow-sm: 0 1px 2px rgba(25,27,24,.05)
--shadow-lg: 0 12px 30px -16px rgba(25,27,24,.18)
```

Do NOT define a `[data-theme="dark"]` block; keep every page `theme:"light"`.
**Rule: ≤2 accent ramps visible at once.** Model=slate, Embodiment=bronze, everything structural/enabling = ink. `--alert` appears only on the weak-joint / "what breaks this" material.

**Evidence tiers** (used deck-wide, monochrome — never a new hue): render as a small mono tag: `NEAR-TERM` = solid ink chip; `BUILDING` = ink-outline chip; `ASPIRATIONAL` = dashed hairline chip, secondary ink. Keep the same three treatments everywhere they appear.

### 4.2 Typography — override the starter font tokens with these

- **Display (`--font-display`):** `"Archivo", system-ui, sans-serif` — titles, big figures. Weights 600/700/800; titles ~700–800, letter-spacing −0.02em, `text-wrap:balance`.
- **Body (`--font-body`):** `"IBM Plex Sans", system-ui, sans-serif` — 400/500/600.
- **Data/mono (`--font-mono`):** `"IBM Plex Mono", ui-monospace, monospace` — kickers, node/axis labels, tiers, readouts; uppercase kickers letter-spacing .2–.24em.
- Update the `index.html` fonts `<link>` to: `Archivo:wght@600;700;800`, `IBM+Plex+Sans:wght@400;500;600`, `IBM+Plex+Mono:wght@400;500`.
- Tabular figures for all numbers; sentence case for body, Title Case or UPPER mono for labels.

### 4.3 Variants

None. Light theme throughout. (No `theme:"dark"` pages; no theme wash.)

## 5 · Animation vocabulary

Restrained and purposeful — motion clarifies structure, it never decorates. Reuse the starter `anim.js` only; **do not** write bespoke keyframes, and **do not** use `particleDrift` (dark-only) or any glow/bloom.

| Name | Effect | Use for |
|---|---|---|
| `fadeUp` | opacity + 14px rise | default reveal for text, rows, chips |
| `scaleIn` | 0.97→1 | panels, cards, the Composer keystone |
| `drawPath` | stroke-dash draw-on | the bridge cables, schematic lines, chart lines |
| `countUp` | tabular number roll | the few real figures (funding, Hz, cost multiples) |
| `converge` | items travel to a point | value/options gathering into the middle |
| `radiate` | items travel out, staggered | one worldcluster of nodes appearing |
| `crossFade` | swap content in a slot | Composer v1→vN, before/after |

**Motion language:** draw-on + soft fade + subtle scale. One orchestrated reveal per page, not scattered effects. No infinite/ambient loops.
**Reduced motion:** every page's end state is fully legible with no animation; `drawPath` lines show complete, figures show final value.
**Cleanup:** cancel any loop in `onLeave` (few pages need loops; prefer none).

## 6 · Technical contract

- **Dependencies:** none beyond the starter runtime. No external libraries.
- **Storage:** none — in-memory only.
- **Run context:** must run by double-clicking `index.html` (file://) and offline.
- **Performance:** 60fps, no console errors.
- **Fallbacks:** fonts unloaded → system fallback must still read as authoritative (Plex/Archivo → system sans is acceptable).

## 7 · File structure

```
physical-ai-deck/
  index.html        (scaffold: title, fonts link, deckConfig.actMarkers, script tags)
  styles.css        (scaffold: tokens from §4 only)
  engine.js  anim.js (starter, unmodified)
  slides/           01-thesis-map.js … 19-close.js  (+ _shared.js)
  media/            (none required — all native SVG/HTML)
  reference/        strategy handoff, the approved hero prototype
  tasks/            01-*.md … 19-*.md
```

## 8 · Page module contract

```js
page({
  id: "NN-name",
  title: "<overview-grid label>",
  theme: "light",
  steps: <n>,
  render: () => `<markup; step elements carry class="step" data-step="n">`,
  onEnter: (el, ctx) => {},   // ctx: { revealStep, isReduced }
  onStep:  (el, i) => {},     // call anim.* here
  onLeave: (el) => {},        // cancel loops (usually none)
});
```

## 9 · Shared components (`slides/_shared.js`, built in scaffolding)

- **`locatorMap(activeKey)`** — the recurring thesis-map schematic (the slide-01 bridge) rendered small in a corner/band as a "you-are-here." `activeKey ∈ {model, embodiment, adaptation, autonomy, assurance, composer, superhuman}` highlights the relevant node in ink and dims the rest. Used at each act/bucket page. Draw it as inline SVG using the tokens; no glow.
- **`tierChip(level)`** — returns the evidence-tier chip markup for `NEAR-TERM | BUILDING | ASPIRATIONAL` per §4.1.
- **`kicker(text)`**, **`carry(text)`** — the mono kicker and the bottom carried-thought line, per starter components.

## 10 · Task-file format

Every page is `tasks/NN-name.md` with: Purpose · Layout · Steps · Copy · Data/graphics · Media slots · Animations · Acceptance criteria · Notes. **The builder implements the task file exactly.** An open structural/visual decision is a defect in the task file — ask, don't invent.

## 11 · Content placement — safe zone (v3; applies to ALL pages, supersedes earlier bottom-anchored patterns)

This deck is used as a live speaking aid, and the bottom of the frame is often not clearly visible to the presenter or the room. Therefore:
- Keep every essential element — title, key lines, the core visual, and any closing/"carry" line — within the **central band: roughly the top 80% of the stage (y ≤ ~840 of 1080).** Vertically center the primary stack.
- Reserve the bottom ~15–20% for **de-emphasized chrome only** (progress rail, step dots, an optional faint footnote). Never place a carry line, a must-read caption, or a critical label flush to the bottom edge.
- This **supersedes** the v1 pattern where the `carry` line sat at the bottom: render the closing line inside the central stack instead (adjust the `_shared.carry` placement per page rather than bottom-anchoring it).

## 12 · Motion conveys the message (v3 principle; applies to ALL pages)

Beyond static text, each slide's core mechanism should be carried by **purposeful motion** — the animation IS part of the argument, not decoration. Prefer *showing* a mechanism (flow, convergence, draw-on, radiate, transform) over describing it in words. Design every slide's key beat as "what moves, and what does that movement say."

- Extend the shared vocabulary with **`flow`**: animate a dashed/dotted path's `stroke-dashoffset` in a slow loop to convey **directional information flow** along a connector. Direction encodes meaning (outbound vs. return). Add it to `anim.js` as `anim.flow(pathEl, {speed, reverse}) → cancel()`.
- This **relaxes** the earlier "no ambient loops" note: *purposeful* continuous motion that conveys the mechanism is allowed — kept subtle (low-contrast, slow), **reduced-motion-aware** (static dashed line when reduced), and **always cancelled in `onLeave`**. Purely decorative/ambient loops remain disallowed.
- Motion stays in the authoritative register: off-white/ink, no glow; precise and quiet, never flashy. A moving dotted line, a converging swarm, a radiating set, a drawing path — these are the deck's motion language.

## 13 · Diagram reveal choreography (v3; applies to connected/system diagrams)

For any diagram whose blocks form ONE connected system (flywheels, cycles, hubs, orbit maps, converging streams):
- reveal the **core message / centre FIRST** (the center node or the one-line thesis sits at rest in the base state);
- bring in the **blocks/nodes ONE AT A TIME** — one per advance beat — so the presenter narrates each; never reveal all blocks at once;
- animate the **connecting arrows / flywheel / flow LAST, together** — that connecting motion is the payoff beat.

A simple row of *independent* items (e.g. a 3-card gap/solution row) may still reveal together with a small stagger — the one-at-a-time rule is for blocks that connect into a system. When in doubt, reveal one at a time.
