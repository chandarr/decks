/**
 * pages/11-diagnosis.js — Screen 11 · The structural diagnosis (light,
 * ACT III close). tasks/11-diagnosis.md.
 *
 * Deliberately the LEANEST screen in the deck: three cause → consequence
 * rows, a closing statement, ~40% whitespace. It is the exhale after the
 * two densest screens in Act III (09 and 10) and before Act IV opens.
 *
 * No chart, no diagram, no org chart, no evidence chips — all four are
 * explicitly ruled out by the task file. The sourcing was done two screens
 * ago and an org diagram here would read as an internal restructuring
 * proposal. The quietest animation set in the deck: fadeUp only.
 *
 * Content rules apply with full force: the subject is the mandate and the
 * structure, never the people executing them.
 */
(function () {
  const ROWS = [
    {
      id: "mandate",
      label: "MANDATE",
      cause: "A trade-and-service classification produces a sales-and-service organisation.",
      consequence: "It cannot build capability, because it was never asked to.",
    },
    {
      id: "location",
      label: "LOCATION",
      cause:
        "Gurugram and Pune place KUKA in the automotive belt. India's robotics and AI engineering concentrates in Bengaluru — where FANUC sits in Electronics City and ABB anchors its engineering base.",
      consequence: "You cannot hire a physical-AI team from a city you are not in.",
    },
    {
      id: "model",
      label: "MODEL",
      cause: "Integration is outsourced to third-party system integrators.",
      consequence: "The deployment data accrues to the integrator. Not to KUKA.",
    },
  ];

  let controllers = [];
  let timers = [];
  let isReduced = false;
  let revealedThrough = 0;

  function schedule(fn, delay) { timers.push(setTimeout(fn, delay)); }
  function clearAll() {
    controllers.forEach((c) => c.cancel());
    controllers = [];
    timers.forEach((t) => clearTimeout(t));
    timers = [];
  }

  function render() {
    const rows = ROWS.map((r) => `
      <div class="dgn-row" data-row="${r.id}">
        <p class="dgn-row-label">${r.label}</p>
        <div class="dgn-row-body">
          <p class="dgn-cause reveal">${r.cause}</p>
          <span class="dgn-marker reveal" aria-hidden="true">&#9656;</span>
          <p class="dgn-consequence reveal">${r.consequence}</p>
        </div>
      </div>`).join("");

    return `
      <section class="screen screen--diagnosis">
        <div class="dgn-header">
          <p class="kicker">THE DIAGNOSIS</p>
          <h1 class="display-2">A mandate that was never updated.</h1>
        </div>

        <div class="dgn-rows">
          ${rows}
        </div>

        <div class="dgn-closing">
          <p class="dgn-closing-line reveal">Nothing here is a failure of execution.</p>
          <p class="dgn-closing-line reveal">It is a mandate that was never updated.</p>
        </div>
      </section>
    `;
  }

  function revealStep(root, n) {
    if (n >= 1 && n <= 3) {
      const r = ROWS[n - 1];
      const row = root.querySelector(`.dgn-row[data-row="${r.id}"]`);
      const cause = row.querySelector(".dgn-cause");
      const marker = row.querySelector(".dgn-marker");
      const consequence = row.querySelector(".dgn-consequence");
      controllers.push(window.Anim.fadeUp(cause, { reduced: isReduced }));
      const rest = () => {
        controllers.push(window.Anim.fadeUp(marker, { reduced: isReduced }));
        controllers.push(window.Anim.fadeUp(consequence, { reduced: isReduced }));
      };
      if (isReduced) rest();
      else schedule(rest, 200);
    }
    if (n === 4) {
      root.querySelectorAll(".dgn-closing-line").forEach((l) => {
        controllers.push(window.Anim.fadeUp(l, { reduced: isReduced }));
      });
    }
  }

  function hideStep(root, n) {
    if (n >= 1 && n <= 3) {
      const r = ROWS[n - 1];
      root.querySelectorAll(`.dgn-row[data-row="${r.id}"] .reveal`).forEach((el) => el.classList.remove("is-visible"));
    }
    if (n === 4) {
      root.querySelectorAll(".dgn-closing-line").forEach((l) => l.classList.remove("is-visible"));
    }
  }

  window.page({
    id: "11-diagnosis",
    title: "A mandate that was never updated.",
    theme: "light",
    steps: 4,
    render,
    onEnter: (root, ctx) => {
      clearAll();
      isReduced = ctx.isReduced;
      revealedThrough = 0;
    },
    onStep: (root, step) => {
      if (step > revealedThrough) {
        for (let s = revealedThrough + 1; s <= step; s++) revealStep(root, s);
      } else if (step < revealedThrough) {
        for (let s = revealedThrough; s > step; s--) hideStep(root, s);
      }
      revealedThrough = step;
    },
    onLeave: () => {
      clearAll();
    },
  });
})();
