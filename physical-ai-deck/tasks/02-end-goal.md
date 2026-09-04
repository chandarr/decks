# Page 02 — The end goal · "A machine that works like a competent human — without the limits"

> Inherits `GLOBAL-INSTRUCTIONS.md` (§11 center-weight; §12 motion conveys the message; §13 reveal choreography — core first, satellites one at a time, no all-at-once). Light theme, off-white/ink, no glow. Act I. Deck v3.
> Source: `NARRATION-v2.md` slide 2 + AC brief: central iconography + five aspects of "competent human, without the limits."
> **Rebuilt per founder feedback:** (1) remove the initial jitter on the centre glyph; (2) add an orbit ring around THE MACHINE and reveal the five satellites **one at a time on Next** (not all together); (3) move the bottom takeaway **down** into a **highlight box** with a clear gap from the diagram.

## Purpose

Give the listener a concrete, memorable picture of the *finished* thing: a machine with the competence of a skilled human worker and none of the human limits. Five capabilities define "competent," revealed one at a time around a central figure so the presenter narrates each. This is the north star; every later slide is "how we get here."

The one idea: *The end goal is a worker with every human competence and none of the human limits.*

## Layout (center-weighted, orbit archetype — §11)

Everything in the central band (y ≈ 170–840); bottom ~20% is chrome only. **Pull the orbit up** slightly vs. the old build so a clear gap opens above the boxed takeaway.

- **Top chrome:** kicker top-left; slide-no "02" top-right.
- **Title** — Archivo, top of the band, full-width, `text-wrap:balance`.
- **Central figure + ORBIT RING:** an ink worker/machine glyph at centre ≈ (960, **470**) *(raised from 500)*, sitting inside a thin **orbit ring** — a hairline `--ink`/`--hairline` circle, radius ≈ **250**, drawn in the base state. Label `THE MACHINE` (UPPER/mono) sits **below the ring** (≈ y740), clear of the glyph — **not overlapping the body** (fixes the current kiss).
- **Five capability satellites** on a **true pentagon**, sitting **on the ring** at angles −90°, −18°, +54°, +126°, +198° (top, then clockwise). Each satellite = a small ink node **on the ring**, a short connector from the ring outward to its text, a **bold short label** and a **one-line sub**, anchored outward so text never crosses connectors. Top satellite ≥ y200; the two lower satellites end ≤ y700 (kept high to open the gap).
- **Takeaway — boxed, lower band:** a **highlight box** centred at ≈ y800 (box bottom ≤ ~y850, inside §11 safe zone), with a clear gap above it from the lowest satellites. `--panel` fill, **1.5px `--ink` border**, rounded (~8px), generous padding (~24px x / 18px y); the takeaway text inside. This is the emphasized line of the slide.

## Steps (reveal order — §13, one satellite per advance)

**0 — Base (static, calm — NO jitter):** kicker, slide-no, title, the orbit ring, the centre glyph, and `THE MACHINE` label. The glyph is **present and static** — **no `scaleIn`, no wobble, no entrance tween** on load. Satellites hidden; the takeaway box hidden. Looks finished — a subject waiting to be described.
**1 — Task intelligence:** satellite 1 (top) reveals — its connector **draws** from the ring outward (`drawPath`), node + label + sub fade in.
**2 — Language understanding:** satellite 2 reveals the same way.
**3 — Live performance:** satellite 3 reveals.
**4 — Learns from feedback:** satellite 4 reveals.
**5 — Remote skill acquisition:** satellite 5 reveals.
**6 — Without the limits:** the **boxed takeaway** fades up in the lower band.

*(6 advance beats after base — five satellites one at a time, then the boxed line. Back reverses one satellite at a time. End jumps to all-revealed. No looping motion.)*

## Copy (exact)

- **Kicker:** `The end goal`
- **Title:** **A machine that works like a competent human — without the limits.**
- **Centre label:** `THE MACHINE`
- **Five satellites — in REVEAL ORDER (label — sub):**
  1. **Task intelligence** — knows how to do the work.
  2. **Language understanding** — takes direction in plain language.
  3. **Live performance** — does it in real time, in the field.
  4. **Learns from feedback** — improves when shown or told (visual or verbal).
  5. **Remote skill acquisition** — picks up new skills over the network.
- **Takeaway (boxed, lower band):** **Every competence of a skilled worker — none of the human limits: it doesn't tire, it shares what it learns, it goes where we can't.**

*(Sentence case for prose; UPPER mono for the centre label; satellite labels bold Archivo/Plex, subs `--secondary`. Reveal order 1→5 is the narration arc: knows the work → understands us → acts live → improves → scales over the network.)*

## Data / graphics

Native inline SVG. Centre = a filled ink glyph (simple abstract worker/machine mark). **Orbit ring** = a single thin circle (`--hairline` or `--ink` @ ~35%), radius ≈ 250, present from base. Five satellites = small ink nodes (~9–10px) sitting **on the ring** at the pentagon angles; each has a short outward connector (hairline `--ink`) to its text block. Labels Archivo/Plex bold ~24px; subs `--secondary` ~17px, anchored outward (left-anchored for right-side, right-anchored for left-side, centered for the top). Takeaway box: `--panel` fill, 1.5px `--ink` stroke, rounded ~8px, padded; text Archivo/Plex medium. No glow, no shadow, no panels elsewhere. Legible from the back — five items, generous spacing.

For the connector `drawPath`, each satellite's connector is a `<path>`/`<line>` with a `pathLength`-normalized dash so it draws from the ring outward on reveal. Node + text fade in with it.

## Media slots

None — all native.

## Animations

Per satellite (steps 1–5): `drawPath` on the connector (ring → text) + `fadeUp` on node/label/sub, **one at a time**. `fadeUp` on the boxed takeaway (step 6). The centre glyph and ring are **static from base — no entrance animation** (this removes the jitter). **Reduced motion:** ring + glyph + all five satellites at final positions with labels, boxed takeaway visible; no draw/travel. **No continuous/looping motion; nothing survives `onLeave`.**

## Acceptance criteria

- **No jitter:** centre glyph + ring are static on load — no `scaleIn`/wobble/entrance tween.
- **§13 one-at-a-time:** the five satellites reveal **one per Next press** (not all together), each with its connector drawing in; order matches the copy (Task intelligence → … → Remote skills).
- **Orbit ring** present in base; satellites sit on it; even pentagon; balanced and legible from the back; connectors never cross labels.
- **`THE MACHINE` label** clear of the glyph (below the ring), no overlap.
- **Boxed takeaway** moved down with a clear gap above it; `--panel` fill + `--ink` border; box bottom ≤ ~y850 (inside §11 safe zone).
- Exactly five capabilities; labels + subs match this file character-for-character.
- Off-white/ink only, no glow; reduced-motion end state correct; no console errors.

## Notes

- This seeds the three A's without naming them: #3 = Edge (Adaptation), #4 = Competence-via-learning (Autonomy), #1/#2 = the foundation we harness, #5 = the occasional remote uplink. Do NOT name Edge/Competence/Confidence here.
- Title swappable to AC's verbatim "…without their limitation." — single-line change.
- Register: calm confidence; this is the picture the whole deck earns. The one-at-a-time reveal lets the presenter own the room click by click.
