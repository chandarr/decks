# Page 03 — Current state & projected future · "From a scramble to a stack"

> Inherits `GLOBAL-INSTRUCTIONS.md` (§11 center-weight; §12 motion conveys the message; §13 reveal choreography — core/frame first, blocks one at a time, connecting flow last). Light theme, off-white/ink, no glow. Act I. Deck v3.
> Source: `research/slide2-landscape.md` (real 2026 companies; figures reported). Follows slide 02 (the end-goal worker).
> **This spec supersedes the earlier v3 draft** (the "four loose clusters + ink orchestrator block" version). Rebuilt per founder feedback: real named clouds at three poles, a dense scramble in the middle, tagline at the bottom, and a future state that resolves the middle into an **outlined** orchestration layer with an applications box on top — compute stays at the bottom for animation continuity.

## Purpose

Show the physical-AI market **as it is today** — three poles that already have gravity (models · bodies · compute), each a real named cloud, with a **dense, chaotic scramble of specialized companies floating in the middle** with no home — then let it resolve, on-screen, into **the projected future**: a clean layered stack where that scramble compresses into a single **orchestration layer**, applications sit on top of it, models feed from the left, bodies from the right, and compute underneath. The animation *is* the passage from today's mess to tomorrow's architecture. Ties back to slide 02: the competent worker we described only exists at scale if someone composes this middle — and that seat is open.

The one idea: *Today's scramble in the middle is tomorrow's orchestration layer — and it's the one seat nobody owns yet.*

## Layout (center-weighted — §11)

Diagram fills the central band (y ≈ 180–840); bottom ~20% is chrome/tagline only.

### Base — CURRENT STATE (chaotic)

- **Top chrome:** kicker top-left; slide-no "03" top-right.
- **Title** — Archivo, top of the band.
- **State marker** (temporal frame), small, centered just under the title: `CURRENT STATE ——▶ PROJECTED FUTURE` — active half ink, other half faint @ ~40%. Base = CURRENT active; flips to PROJECTED at the resolve beat.
- **Three real named clouds** (loose, tinted, *labeled with real companies* — these are clouds, not boxes yet):
  - **MODEL MAKERS** — left, centre ≈ (330, 470), `--accent-b` (slate). Pole label above; **sub-label beneath the cloud:** `frontier & open models`.
  - **EMBODIMENT MAKERS** — right, centre ≈ (1590, 470), `--accent-a` (bronze). Pole label above; **sub-label beneath:** `many bodies`. **Tesla and Figure do NOT appear in this cloud** — they move to an asterisk (below).
  - **COMPUTE PROVIDERS** — bottom-centre, centre ≈ (960, 800) *(kept within band, not the very edge)*, `--secondary` (graphite). Pole label; **sub-label beneath:** `edge + cloud`.
- **The scramble** — ~22 small neutral-grey named nodes, densely and irregularly scattered in the centre region (x∈[640,1280], y∈[300,560]), overlapping and un-aligned: the fragmented middle, visibly homeless. A few of the biggest (Viam, Genesis, Scale/Labellerr) labeled; the rest small dots with tiny labels. This is the visual chaos — the point.
- **Asterisk line** (faint, mono, bottom-right of the embodiment cloud or in the tagline zone): `* Tesla · Figure — a few players trying to do both.`
- **Tagline** — the big line **at the bottom** of the band (NOT overlapping the middle; y ≈ 880 is chrome, so place the tagline text ~y820–860, full-width centered, Archivo medium): `Physical AI today — three poles, and a scramble in the middle.`

### End — PROJECTED FUTURE (mature stack)

The scramble compresses into a clean architecture; poles become feeders:

```
                 ┌───────────────────────────┐
                 │        APPLICATIONS        │   ← new box, appears on top
                 └───────────────────────────┘
                              ▲
   ┌────────┐     ╔═══════════════════════════╗     ┌────────────┐
   │ MODELS │ ──▶ ║      ORCHESTRATORS        ║ ◀── │ EMBODIMENT │
   │ (left) │     ║   (outline only, ink)     ║     │  (right)   │
   └────────┘     ╚═══════════════════════════╝     └────────────┘
                              ▲
                 ┌───────────────────────────┐
                 │      COMPUTE  (bottom)     │   ← stays where it was
                 └───────────────────────────┘
```

- The **scramble collapses inward** to a single **outlined** rounded rectangle at centre ≈ (960, 470) — `ORCHESTRATORS` — **outline only** (2px `--ink` stroke, `--panel` fill, label in `--ink`), NOT a filled ink block. It is the largest element and the clear focal point.
- **APPLICATIONS** — a new outlined box appears **above** the orchestrator (centre ≈ (960, 300)), connected upward: the value that rides on top.
- **MODELS** and **EMBODIMENT** clouds tighten into small labeled feeder boxes at left/right, each with a connecting flow arrow **into** the orchestrator.
- **COMPUTE** stays at the bottom (its base position — AC's refinement: smoother animation and recall), with a flow arrow **up into** the orchestrator.
- **State marker flips** to `PROJECTED FUTURE`.
- **Takeaway** replaces the tagline at the bottom.

## Steps (reveal order — §13)

Core/frame first, then each cloud one at a time, then the middle, then (in the future) the connecting flow last.

**0 — Base (current state; looks finished but chaotic):** kicker, slide-no, title, `CURRENT STATE` active marker, the three named clouds at rest, the grey scramble scattered in the middle, the asterisk line, and the bottom tagline. This is "today" — a room should feel the mess.
**1 — Poles have gravity (one at a time):** each of the three clouds tightens slightly and its label + sub-label emphasize, revealed **in turn** (Model, then Embodiment, then Compute) — §13, not all at once. The scramble stays scattered/agitated (tiny drift) — it has no home.
**2 — The middle is a scramble:** the scramble nodes get a beat of their own — a light agitation/among-each-other jitter and the middle-caption reveals: everyone owns a slice, no one composes.
**3 — The future resolves (the payoff):** the scramble **compresses** inward (`converge`) into the single **outlined** `ORCHESTRATORS` box; the `APPLICATIONS` box fades in above it; the state marker flips to `PROJECTED FUTURE`; the tagline crossfades to the takeaway. The three poles reshape into feeder boxes (models left, embodiment right, compute bottom).
**4 — The flows connect (LAST — §13):** the connecting arrows animate **last, together** — models→orchestrator, embodiment→orchestrator, compute→orchestrator (up), orchestrator→applications (up). `anim.flow` directional. Our mark lands on the orchestrator box. This is the "mature system" beat.

*(4 advance beats after base. Back reverses; R replays; End jumps to the resolved future. `onLeave` cancels the flow loop.)*

## Copy (exact)

- **Kicker:** `Current state & projected future`
- **Title:** **From a scramble to a stack.**
- **State marker:** `CURRENT STATE  ▶  PROJECTED FUTURE`
- **Pole labels (current):** `MODEL MAKERS` · `EMBODIMENT MAKERS` · `COMPUTE PROVIDERS`
- **Pole sub-labels:** models → `frontier & open models` · embodiment → `many bodies` · compute → `edge + cloud`
- **Asterisk:** `* Tesla · Figure — a few players trying to do both.`
- **Future labels:** `APPLICATIONS` · `ORCHESTRATORS` · `MODELS` · `EMBODIMENT` · `COMPUTE`
- **Tagline (base, bottom):** `Physical AI today — three poles, and a scramble in the middle.`
- **Middle caption (Beat 2):** `Everyone owns a slice — capture, sim, data, fleet, safety. Nobody composes them.`
- **Takeaway (Beat 3–4, bottom, replaces tagline):** `When the model stops being the moat, the one who composes the middle wins. That seat is open — and it's ours.`

*(Sentence case for prose; all pole/stack labels UPPER/mono; node labels mono.)*

## Data / graphics — node dataset (build from this)

Tint by `layer`. Scramble nodes render `--secondary` @ ~45% (grey) until Beat 3, then recolor toward `--ink` as they compress into the orchestrator outline. `size`: l = major (labeled, larger), m = labeled, s = small dot+tiny label. **Tesla and Figure are NOT nodes** — they are the asterisk only. Majors never appear in the scramble; the scramble is never labeled "orchestrators/integrators" before Beat 3.

```js
// layer: model | embodiment | compute | swarm ;  subfn (swarm only)
const NODES = [
  // MODEL (slate) — cloud, left; sub-label "frontier & open models"
  {n:'Physical Intelligence',layer:'model',size:'l'},{n:'Skild AI',layer:'model',size:'m'},
  {n:'DeepMind · Gemini Robotics',layer:'model',size:'m'},{n:'Toyota · LBM',layer:'model',size:'s'},
  {n:'World Labs',layer:'model',size:'s'},{n:'Wayve',layer:'model',size:'s'},
  {n:'open weights (VLA)',layer:'model',size:'s'},
  // EMBODIMENT (bronze) — cloud, right; MANY bodies; NO Tesla/Figure (→ asterisk); sub-label "many bodies"
  {n:'1X',layer:'embodiment',size:'m'},{n:'Apptronik',layer:'embodiment',size:'m'},
  {n:'Agility',layer:'embodiment',size:'s'},{n:'Boston Dynamics',layer:'embodiment',size:'s'},
  {n:'Sanctuary',layer:'embodiment',size:'s'},{n:'Neura',layer:'embodiment',size:'s'},
  {n:'Unitree',layer:'embodiment',size:'m'},{n:'AgiBot',layer:'embodiment',size:'s'},
  {n:'UBTech',layer:'embodiment',size:'s'},{n:'Fourier',layer:'embodiment',size:'s'},
  {n:'Galbot',layer:'embodiment',size:'s'},{n:'ABB',layer:'embodiment',size:'s'},
  {n:'KUKA',layer:'embodiment',size:'s'},{n:'FANUC',layer:'embodiment',size:'s'},
  {n:'Universal Robots',layer:'embodiment',size:'s'},{n:'Symbotic',layer:'embodiment',size:'s'},
  {n:'ANYbotics',layer:'embodiment',size:'s'},
  // COMPUTE (graphite) — cloud, bottom; ALL players; sub-label "edge + cloud"
  {n:'NVIDIA · Jetson Thor',layer:'compute',size:'l'},{n:'Qualcomm',layer:'compute',size:'m'},
  {n:'AMD',layer:'compute',size:'s'},{n:'Hailo',layer:'compute',size:'s'},
  {n:'Ambarella',layer:'compute',size:'s'},{n:'Luxonis',layer:'compute',size:'s'},
  {n:'Stereolabs',layer:'compute',size:'s'},{n:'Prophesee',layer:'compute',size:'s'},
  {n:'Ouster',layer:'compute',size:'s'},
  // SWARM (grey→ink) — the fragmented MIDDLE scramble, ~22 names, majors excluded
  {n:'XDOF',layer:'swarm',subfn:'capture',size:'m'},{n:'Extend Robotics',layer:'swarm',subfn:'capture',size:'s'},
  {n:'Cogito Tech',layer:'swarm',subfn:'capture',size:'s'},{n:'HaptX',layer:'swarm',subfn:'capture',size:'s'},
  {n:'Adamo',layer:'swarm',subfn:'capture',size:'s'},
  {n:'SKY ENGINE AI',layer:'swarm',subfn:'synthdata',size:'s'},{n:'Anyverse',layer:'swarm',subfn:'synthdata',size:'s'},
  {n:'Rendered.ai',layer:'swarm',subfn:'synthdata',size:'s'},
  {n:'Genesis',layer:'swarm',subfn:'sim',size:'m'},{n:'Unity Robotics',layer:'swarm',subfn:'sim',size:'s'},
  {n:'DataMesh',layer:'swarm',subfn:'sim',size:'s'},
  {n:'Labellerr',layer:'swarm',subfn:'data',size:'s'},{n:'Encord',layer:'swarm',subfn:'data',size:'s'},
  {n:'Troveo',layer:'swarm',subfn:'data',size:'s'},{n:'Scale · Mercor',layer:'swarm',subfn:'data',size:'m'},
  {n:'Viam',layer:'swarm',subfn:'fleet',size:'m'},{n:'Formant',layer:'swarm',subfn:'fleet',size:'s'},
  {n:'InOrbit',layer:'swarm',subfn:'fleet',size:'s'},{n:'Foxglove',layer:'swarm',subfn:'fleet',size:'s'},
  {n:'Open-RMF',layer:'swarm',subfn:'fleet',size:'s'},
  {n:'FORT Robotics',layer:'swarm',subfn:'safety',size:'s'},{n:'Edge Impulse',layer:'swarm',subfn:'safety',size:'s'},
];
```

Rendering notes:
- **Clouds, not boxes, in base:** the three poles are loose tinted node groups with a faint enclosing blob/hull (very light `--hairline` fill @ ~8%), each with an UPPER pole label and a mono sub-label beneath. Real company names visible (mono ~14–15px `--secondary`).
- **Scramble:** seed pseudo-randomly (fixed seed → stable across replays), overlapping and un-gridded; grey until Beat 3.
- **Future orchestrator = OUTLINE ONLY:** rounded rect, 2px `--ink` stroke, `--panel` fill, label `ORCHESTRATORS` in `--ink` (NOT reversed-on-fill). Largest element.
- **Applications box:** outlined, same stroke language, above the orchestrator.
- **Feeder boxes (models/embodiment/compute):** small outlined boxes with the tightened pole labels; compute keeps its bottom position.
- **Flows:** `anim.flow` directional ink arrows, revealed LAST (Beat 4): models→orch, embodiment→orch, compute→orch (upward), orch→applications (upward).
- **State marker:** mono; active half `--ink`, inactive `--secondary` @ 40%.

## Media slots

None — all native inline SVG.

## Animations

`fadeUp` (title, marker, pole labels/sub-labels one-at-a-time Beat 1, captions, applications box); light per-node `converge`/jitter (scramble Beat 2); `converge` + grey→ink recolor (scramble compresses into the orchestrator outline, Beat 3); crossfade tagline→takeaway (Beat 3); `anim.flow` (all connecting arrows, **Beat 4, together, last** — §12/§13). **Reduced motion:** render the Beat-4 resolved stack (applications on top, outlined orchestrator centre, model/embodiment feeders, compute at bottom, static flow lines, marker on PROJECTED FUTURE) at rest, takeaway shown; skip drift/jitter. No persistent loops beyond the flow, which `onLeave` cancels.

## Acceptance criteria

- **§13 reveal:** three clouds emphasize **one at a time** in Beat 1 (not all at once); the scramble gets its own beat; the connecting flows animate **last, together** in Beat 4.
- **Current state:** three real *named* clouds (models left, embodiment right, compute bottom), each with its mono sub-label (`frontier & open models` / `many bodies` / `edge + cloud`); a dense grey scramble of ~22 named middle companies in the centre.
- **Tesla & Figure** are NOT in the embodiment cloud — they appear only in the asterisk line.
- **Tagline is at the BOTTOM**, not overlapping the middle.
- **Future state:** scramble compresses into a **single OUTLINED** `ORCHESTRATORS` box (outline only, not filled), largest element; an `APPLICATIONS` outlined box sits **above** it; models feed from left, embodiment from right, **compute stays at the bottom**; the `CURRENT STATE ▶ PROJECTED FUTURE` marker flips.
- **Center-weighted (§11):** diagram in the central band; tagline/takeaway near the bottom of the band but not clipped; compute cloud/box ≤ ~y830.
- Off-white/ink only; no glow; `converge`+`fadeUp`+`anim.flow` only; reduced-motion end state correct; **no loop survives `onLeave`**; no console errors.

## Notes

- The base must read as **genuine chaos** (real names, overlapping, homeless middle); the reveal earns the "mature system." The contrast between the two is the whole slide.
- Replaces the v1 "LLM-arc" + "prediction" slides — the LLM precedent is one spoken line, not a page.
- Continuity: base = the "current state" the room already senses; the resolve hands off to slide 04 (how we engage the two ends we just drew — models on the left, bodies on the right).

### Build-notes / fallbacks (apply at review time)

- **Scramble legibility:** ~22 named middle nodes is the target, but that is a lot of mono labels at 1920×1080. If the base reads cluttered, **reduce the number of *labeled* nodes to ~10** (keep the biggest — Viam, Genesis, Scale·Mercor, XDOF — labeled; drop the rest to unlabeled dots). Do **not** reduce the node *count* — the density of dots is the "scramble" signal; only the label count comes down.
- **Beat 3 compression (hardest motion in the deck):** the scramble collapsing into the outlined `ORCHESTRATORS` box is the make-or-break moment. If a single continuous `converge` tween looks weak or muddy, use a **two-stage compression**: (1) gather the scattered nodes to a loose central knot, then (2) snap/settle that knot into the outlined box with the grey→ink recolor. Two staged beats read as "chaos organizing itself" far better than one long tween. Keep it under ~1.2s total; no glow, no bounce.
