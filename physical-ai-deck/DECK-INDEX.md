# Deck index — Winning the Widening Middle of Physical AI (v3, canonical)

The single source of truth for slide order, titles, and build status. Supersedes the archived v2 narration. Each slide is specified in `tasks/NN-*.md` and built to `slides/NN-*.js`.

**Mission (north star):** *Making physical AI dependable enough to deploy at scale and speed* — we build the orchestration layer between the world's models and its machines, giving physical AI the **edge**, **competence**, and **confidence** to spread across every domain (military · industrial · consumer).

**Design system:** off-white / ink, authoritative, no glow (`GLOBAL-INSTRUCTIONS.md`). §11 center-weight · §12 motion conveys the message (`anim.flow`) · §13 reveal choreography (core first, blocks one at a time, connection last).

**Pillar words (locked):** three needs = **Edge · Competence · Confidence**, delivered by **Adaptation · Autonomy · Assurance**. Reliability is an element of Assurance (the harness), not a standalone pillar.

## Slides (23 — order is `build-order.txt`)

| # | Slide | Title | Task file |
|---|---|---|---|
| 1 | 01 | **Mission** | `tasks/01-mission.md` |
| 2 | 02 | **The end goal** (competent worker, 5 capabilities) | `tasks/02-end-goal.md` |
| 3 | 03 | **Current state & projected future** (scramble → stack) | `tasks/03-fragmentation-convergence.md` |
| 4 | 04 | **How we engage the two ends** (interaction modalities) | `tasks/04-interaction-modalities.md` |
| 5 | 04a | **The three pillars** ★NEW — overview cards; **opens Act II** | `tasks/04a-pillars.md` |
| 6 | 04b | **Divider — Pillar 1: Adaptation / Edge** ★NEW (template) | `tasks/04b-divider-adaptation.md` |
| 7 | 05 | **Adaptation — the edge problem & gaps** | `tasks/05-adaptation-problem.md` |
| 8 | 06 | **Adaptation — our approach** (conductor · fit · compression) | `tasks/06-adaptation-approach.md` |
| 9 | 06a | **Divider — Pillar 2: Autonomy / Competence** ★NEW | `tasks/06a-divider-autonomy.md` |
| 10 | 07 | **Autonomy = Competence** (worker-arc + evolving loop) | `tasks/07-autonomy.md` |
| 11 | 07a | **Divider — Pillar 3: Assurance / Confidence** ★NEW | `tasks/07a-divider-assurance.md` |
| 12 | 08 | **Assurance — the problem** (cert not built for machines that learn) | `tasks/08-assurance-problem.md` |
| 13 | 09 | **Assurance — our approach** (living certified envelope) | `tasks/09-assurance-approach.md` |
| 14 | 10 | **Superhuman** (three A's → one superhuman goal; reasoning transfer) | `tasks/10-superhuman.md` |
| 15 | 12 | **Team & operating model** (four labs, one flywheel) | `tasks/12-team.md` |
| 16 | 13 | **India as engine + academy** (two-tier team, comp leverage) | `tasks/13-india-academy.md` |
| 17 | 14 | **Agentic execution** (rapid without compromising quality) | `tasks/14-agentic-execution.md` |
| 18 | 15 | **IP strategy** (publish · patent · keep) | `tasks/15-ip-strategy.md` |
| 19 | 16 | **Roadmap — build & prove** (five working stages, no valuation) | `tasks/16-roadmap.md` |
| 20 | 17 | **What breaks this** (five hard questions pre-answered) | `tasks/17-what-breaks-this.md` |
| 21 | 18 | **Beyond a single robot** (embodiment → environment) | `tasks/18-beyond-a-single-robot.md` |
| 22 | 19 | **Closing page** (the middle is open) | `tasks/19-close.md` |

★NEW = added to make the three pillars explicit (master overview + a divider before each pillar). Inserted with suffix filenames to avoid renumbering the existing files mid-build; true order is `build-order.txt`.

**Removed:** slide 11 (*The advantage of the hardest* — beachhead + cascade) was cut from the deck; its module and task file are kept in `archive/removed-v3/`.

## Acts

- Act I — Vision & position: 01–04
- Act II — How (the three pillars): **04a (overview) · 04b · 05 · 06 · 06a · 07 · 07a · 08 · 09**
- Act III — The reach: 10
- Act IV — How we build it: 12–16
- Act V — Foresight, horizon, close: 17–19

`deckConfig.actMarkers = [4, 13, 14, 19]` (0-based indices in the `build-order.txt` sequence: Act II starts at 04a; Act III at 10; Act IV at 12; Act V at 17).

## Build status / retrofit note

- **01–07** were specced *before* §11/§12/§13. Retrofit pass in progress. **02** rebuilt (no jitter, orbit ring, one-at-a-time satellites, boxed takeaway). **03** rebuilt (named clouds → outlined orchestrator stack). Remaining 01, 04, 05, 06, 07 still need the §11–13 pass.
- **The four ★NEW slides (04a, 04b, 06a, 07a)** were specced with §11–13 applied. 04b is the divider template; 06a/07a build from it with swapped copy.
- **08–19** were specced with §11–13 applied.

## Open / minor

- competence/confidence near-rhyme (kept, acceptable) · academy figures reported, team ratio illustrative (slide 13).
- Pillars kept **ink/graphite** on 04a and the dividers (bronze/slate reserved for model/embodiment on 03/04).
