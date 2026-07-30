/**
 * act-divider.js — the act-divider screen, shared by all four dividers.
 *
 * The deck is dense by design, so each act now opens with a breath: a screen
 * carrying nothing but the act it is entering. One implementation, four
 * registrations — each `pages/NNa-act-*.js` file is a single call to
 * `ActDivider.register(actId)`, placed in index.html at the point in the
 * running order where that act begins. Content comes entirely from
 * `DeckData.ACTS`, the same constant screen 02 renders its roadmap from.
 *
 * `steps: 0` is deliberate: a divider has nothing to stage, so one advance
 * passes straight through to the first screen of the act and one back returns
 * to the last step of the previous one. The entrance choreography is driven
 * by the page's own timers (`.reveal`, not `.step`) because the engine's step
 * counter is not involved.
 *
 * Light, like every screen between the bookends — but on the section grey
 * rather than the white every content screen uses, so a divider reads as a
 * chapter break at a glance without reaching for the dark palette reserved
 * for screens 01 and 19.
 */
(function () {
  // Entrance cadence, ms from screen entry.
  const BEATS = { rule: 0, title: 120, subtitle: 260, rail: 420 };

  function railMarkup(currentId) {
    return window.DeckData.ACTS.map((a) => `
      <div class="ad-rail-item${a.id === currentId ? " is-current" : ""}">
        <div class="ad-rail-rule"></div>
        <p class="ad-rail-label">${a.label}</p>
        <p class="ad-rail-name">${a.title}</p>
      </div>`).join("");
  }

  function register(actId) {
    const act = window.DeckData.ACTS.find((a) => a.id === actId);

    let controllers = [];
    let timers = [];
    let isReduced = false;

    function clearAll() {
      controllers.forEach((c) => c.cancel());
      controllers = [];
      timers.forEach((t) => clearTimeout(t));
      timers = [];
    }

    function reveal(root, selector, delay) {
      const el = root.querySelector(selector);
      const run = () => controllers.push(window.Anim.fadeUp(el, { reduced: isReduced }));
      if (isReduced || !delay) run();
      else timers.push(setTimeout(run, delay));
    }

    function render() {
      return `
        <section class="screen screen--act-divider">
          <p class="ad-numeral" aria-hidden="true">${act.numeral}</p>

          <div class="ad-body">
            <div class="ad-lead reveal">
              <div class="ad-lead-rule"></div>
              <p class="kicker">${act.label} &middot; OF FOUR</p>
            </div>
            <h1 class="display-1 ad-title reveal">${act.title}</h1>
            <p class="ad-subtitle reveal">${act.beat}</p>
          </div>

          <div class="ad-rail reveal">
            ${railMarkup(act.id)}
          </div>
        </section>
      `;
    }

    window.page({
      id: act.id,
      title: `${act.label} — ${act.title}`,
      theme: "light",
      steps: 0,
      render,
      onEnter: (root, ctx) => {
        clearAll();
        isReduced = ctx.isReduced;
        reveal(root, ".ad-lead", BEATS.rule);
        reveal(root, ".ad-title", BEATS.title);
        reveal(root, ".ad-subtitle", BEATS.subtitle);
        reveal(root, ".ad-rail", BEATS.rail);
      },
      onLeave: () => {
        clearAll();
      },
    });
  }

  window.ActDivider = { register };
})();
