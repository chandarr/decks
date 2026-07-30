/**
 * pages/14-ecosystem.js — Screen 14 · The ecosystem play (light, ACT IV).
 * tasks/14-ecosystem.md.
 *
 * Deliberately tight and concrete — the counterweight to screen 13's
 * expansiveness. Linear and sequential where 13 was circular. If this screen
 * feels visionary rather than near-term, it has failed its job.
 *
 * Two content rules enforced here, not style preferences:
 *  - the partner list must stay framed as "Illustrative of the category".
 *    Naming companies shows command of the ecosystem, but a named target
 *    list invites "have you spoken to them?" — which the author cannot yet
 *    answer. The framing phrase does the demonstrative work without the
 *    exposure.
 *  - no headcount, budget or timeline figure appears anywhere. Scale and
 *    cost belong in the live conversation; the GCC framing sets the
 *    magnitude reference without committing to a number.
 */
(function () {
  const PARTNERS = window.DeckData.ECOSYSTEM_PARTNERS;
  const FANUC = window.DeckData.FANUC_OPEN_PLATFORM;

  const MOVES = [
    {
      index: "01",
      title: "BE WHERE THE ENGINEERS ARE",
      body: "A Bengaluru engineering base — the same Global Capability Centre model that hundreds of multinationals already run in India across automotive, semiconductor, aerospace and software. India's robotics and AI engineering concentrates there, and KUKA is not in the room.",
      unlocks: "flywheel nodes 1 and 4",
      illustrative: null,
    },
    {
      index: "02",
      title: "PARTNER FOR THE BRAIN, NOT AGAINST IT",
      body: "India's software-first robotics companies are complementary, not competing. They hold vision and manipulation intelligence and lack a certified body, a safety case and an installed base. KUKA holds exactly those, plus an operating system already built as an open platform.",
      unlocks: "frontier perception without hiring it",
      illustrative: `Illustrative of the category — ${PARTNERS.illustrative.join(" · ")}`,
    },
    {
      index: "03",
      title: "OPEN iiQKA.OS TO INDIAN DEVELOPERS",
      body: "The cheapest of the three moves and the one that compounds longest. iiQKA.OS was rewritten from scratch as a modular open platform. India has the largest population of software engineers in the world. Those two facts have never been put together.",
      unlocks: "the longest compounding tail",
      illustrative: null,
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
    const bands = MOVES.map((m, i) => `
      <div class="eco-band" data-move="${i + 1}">
        <div class="eco-band-head">
          <span class="eco-index">${m.index}</span>
          <span class="eco-title">${m.title}</span>
        </div>
        <div class="eco-band-body">
          <div class="eco-body-col">
            <p class="eco-body reveal">${m.body}</p>
            ${m.illustrative ? `<p class="eco-illustrative reveal">${m.illustrative}</p>
            <p class="chip chip--${PARTNERS.tier} eco-partner-chip reveal">${PARTNERS.tier}</p>` : ""}
          </div>
          <p class="eco-unlocks reveal"><span class="eco-unlocks-marker">&#9656;</span> unlocks ${m.unlocks}</p>
        </div>
      </div>`).join("");

    return `
      <section class="screen screen--ecosystem">
        <div class="eco-header">
          <p class="kicker">THE PLAY</p>
          <h1 class="display-2">The architecture is built. The ecosystem is not.</h1>
          <p class="subtitle">Three moves, in the order they can happen.</p>
        </div>

        <div class="eco-bands">
          ${bands}
        </div>

        <div class="eco-urgency">
          <p class="eco-urgency-line reveal">FANUC is already making move 03.</p>
          <p class="eco-urgency-line reveal">Architecture without an ecosystem is engineering nobody builds on.</p>
          <p class="chip chip--${FANUC.tier} eco-urgency-chip reveal">${FANUC.tier} — FANUC's ROS 2 / Python open-architecture posture</p>
        </div>
      </section>
    `;
  }

  function revealStep(root, n) {
    if (n >= 1 && n <= 3) {
      const band = root.querySelector(`.eco-band[data-move="${n}"]`);
      const body = band.querySelector(".eco-body");
      const illus = band.querySelector(".eco-illustrative");
      const chip = band.querySelector(".eco-partner-chip");
      const unlocks = band.querySelector(".eco-unlocks");
      controllers.push(window.Anim.fadeUp(body, { reduced: isReduced }));
      if (illus) {
        const showIllus = () => {
          controllers.push(window.Anim.fadeUp(illus, { reduced: isReduced }));
          if (chip) controllers.push(window.Anim.fadeUp(chip, { reduced: isReduced }));
        };
        if (isReduced) showIllus();
        else schedule(showIllus, 250);
      }
      const showUnlocks = () => controllers.push(window.Anim.fadeUp(unlocks, { reduced: isReduced }));
      if (isReduced) showUnlocks();
      else schedule(showUnlocks, illus ? 450 : 200);
    }
    if (n === 4) {
      root.querySelectorAll(".eco-urgency-line, .eco-urgency-chip").forEach((l) => {
        controllers.push(window.Anim.fadeUp(l, { reduced: isReduced }));
      });
    }
  }

  function hideStep(root, n) {
    if (n >= 1 && n <= 3) {
      root.querySelectorAll(`.eco-band[data-move="${n}"] .reveal`).forEach((el) => el.classList.remove("is-visible"));
    }
    if (n === 4) {
      root.querySelectorAll(".eco-urgency-line, .eco-urgency-chip").forEach((l) => l.classList.remove("is-visible"));
    }
  }

  window.page({
    id: "14-ecosystem",
    title: "The architecture is built. The ecosystem is not.",
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
    onLeave: () => { clearAll(); },
  });
})();
