# Setup prompt — paste this into Claude Code as your first message

Copy everything in the block below into Claude Code once you have this folder open in VS Code.

---

```
This project builds a 15-screen HTML presentation deck. The architecture and all
design decisions are already made and written down — your job is to implement them
exactly, not to redesign them.

Before you do anything:

1. Read CLAUDE.md — your role and the non-negotiable content rules.
2. Read GLOBAL-INSTRUCTIONS.md — the design system, navigation model, animation
   vocabulary, and technical contract. Everything inherits from it.
3. Read BUILD-ORDER.md — what to build, in what order.
4. Skim 02-NARRATIVE-SPINE.md so you understand what each screen is for and how
   the argument builds. Do not build from it — build from the task files.

Then start with Stage 0 scaffolding only: index.html, styles.css, anim.js,
data.js, engine.js. Build two throwaway stub screens (one light, one dark) and
verify the navigation state machine, the master overview grid, the dark/light
bookend wash, and the reduced-motion path all work before we touch a real screen.

Report back when Stage 0 is verified. Do not start screen 01 until I confirm.

Three rules that matter more than anything else in this build:

- Every figure that appears on screen must live in data.js as a named constant
  with { value, tier, source }. Never hardcode a number into markup. Several
  figures are pending verification and must be swappable without touching layout.

- Implement task files exactly — copy, reveal order, layout, colour. If something
  is ambiguous or contradicts GLOBAL-INSTRUCTIONS.md, stop and ask me rather than
  deciding. An unasked question becomes a screen we have to rebuild.

- The content rules in CLAUDE.md ("Content rules that override everything") came
  out of a deliberate pressure test for a high-stakes conversation. Never work
  around them, even if a task file appears to invite it.

reference/ holds the underlying research and an earlier 10-screen prototype. The
prototype is for motif reference only — the architecture has changed. Do not copy
from it.
```

---

## After Stage 0

Feed one task file at a time:

```
Build screen 03 from tasks/03-signals.md. Read GLOBAL-INSTRUCTIONS.md first if
this is a new session. Verify against the acceptance criteria in the task file
before reporting done.
```

Keep it to one screen per turn. The verify-then-proceed rhythm is what keeps rework rare.
