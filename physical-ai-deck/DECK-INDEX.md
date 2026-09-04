# Deck index — Winning the Widening Middle of Physical AI (v3, canonical)

The single source of truth for slide order, titles, and build status. Supersedes the archived v2 narration. Each slide is specified in `tasks/NN-*.md` and built to `slides/NN-*.js`.

**Mission (north star):** *Making physical AI dependable enough to deploy at scale and speed* — we build the orchestration layer between the world's models and its machines, giving physical AI the **edge**, **competence**, and **confidence** to spread across every domain (military · industrial · consumer).

**Design system:** off-white / ink, authoritative, no glow (`GLOBAL-INSTRUCTIONS.md`). §11 center-weight · §12 motion conveys the message (`anim.flow`) · §13 reveal choreography (core first, blocks one at a time, connection last).

**Pillar words (locked):** three needs = **Edge · Competence · Confidence**, delivered by **Adaptation · Autonomy · Assurance**. Reliability is an element of Assurance (the harness), not a standalone pillar.

## Slides (all 19 specced)

| # | Title | Task file |
|---|---|---|
| 01 | **Mission** | `tasks/01-mission.md` |
| 02 | **The end goal** (competent worker, 5 capabilities) | `tasks/02-end-goal.md` |
| 03 | **Current state & projected future** (four players) | `tasks/03-fragmentation-convergence.md` |
| 04 | **How we engage the two ends** (interaction modalities) | `tasks/04-interaction-modalities.md` |
| 05 | **Adaptation — the edge problem & gaps** | `tasks/05-adaptation-problem.md` |
| 06 | **Adaptation — our approach** (conductor · fit · compression, `+`) | `tasks/06-adaptation-approach.md` |
| 07 | **Autonomy = Competence** (worker-arc + evolving loop) | `tasks/07-autonomy.md` |
| 08 | **Assurance — the problem** (cert not built for machines that learn) | `tasks/08-assurance-problem.md` |
| 09 | **Assurance — our approach** (living certified envelope) | `tasks/09-assurance-approach.md` |
| 10 | **Superhuman** (three A's → one superhuman goal; reasoning transfer) | `tasks/10-superhuman.md` |
| 11 | **The advantage of the hardest** (beachhead + cascade) | `tasks/11-beachhead-cascade.md` |
| 12 | **Team & operating model** (four labs, one flywheel) | `tasks/12-team.md` |
| 13 | **India as engine + academy** (two-tier team, comp leverage) | `tasks/13-india-academy.md` |
| 14 | **Agentic execution** (rapid without compromising quality) | `tasks/14-agentic-execution.md` |
| 15 | **IP strategy** (publish · patent · keep) | `tasks/15-ip-strategy.md` |
| 16 | **Roadmap — build & prove** (five working stages, no valuation) | `tasks/16-roadmap.md` |
| 17 | **What breaks this** (five hard questions pre-answered) | `tasks/17-what-breaks-this.md` |
| 18 | **Beyond a single robot** (embodiment → environment) | `tasks/18-beyond-a-single-robot.md` |
| 19 | **Closing page** (the middle is open) | `tasks/19-close.md` |

## Acts

- Act I — Vision & position: 01–04
- Act II — How (the three A's): 05–09
- Act III — The reach: 10–11
- Act IV — How we build it: 12–16
- Act V — Foresight, horizon, close: 17–19

`deckConfig.actMarkers = [4, 9, 11, 16]` (0-based starts of Acts II–V).

## Build status / retrofit note

- **01–07** were specced *before* §11 (center-weight), §12 (motion/`flow`), and §13 (reveal choreography) were added. They need a light consistency pass to those rules — most notably **slide 02** should reveal its five capabilities **one at a time** (§13), not all-at-once. The parallel build of 01–07 (via `build-order.txt`) predates this; retrofit or rebuild those to §11–13.
- **08–19** were specced with §11–13 applied.

## Open / minor

- competence/confidence near-rhyme (kept, acceptable) · academy academy figures are reported, team ratio illustrative (slide 13) · slide 11 merges beachhead+cascade.
