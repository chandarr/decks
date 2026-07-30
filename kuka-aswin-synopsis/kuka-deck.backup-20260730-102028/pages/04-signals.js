/**
 * pages/04-signals.js — Screen 04 · The signals (light, ACT I closing).
 * tasks/04-signals.md.
 *
 * Three-plus-one: three greyscale signal cards, then a pivot card that must
 * read as different in kind (orange figures, tinted fill, left edge rule) —
 * not a fourth signal. Every figure is a countUp bound to data.js; card 3's
 * estimate chip must stay visibly distinct from the other confirmed chips.
 */
(function () {
  const D = window.DeckData;

  let controllers = [];
  let isReduced = false;
  let revealedThrough = 0;

  function clearAll() {
    controllers.forEach((c) => c.cancel());
    controllers = [];
  }

  function chip(tier, text) {
    return `<p class="chip chip--${tier}">${text}</p>`;
  }

  function render() {
    return `
      <section class="screen screen--signals">
        <div class="sig-header">
          <p class="kicker">THE SIGNALS</p>
          <h1 class="display-2">The capital has already moved.</h1>
          <p class="subtitle">Three facts about the industry — and one about where it is going.</p>
        </div>

        <div class="sig-cards">
          <div class="sig-card">
            <p class="sig-card-figure num step" data-step="1"><span class="sig-count" data-count="abb">$0B</span></p>
            <div class="sig-card-rule"></div>
            <div class="sig-card-text step" data-step="1">
              <p class="sig-card-label">SoftBank acquires ABB Robotics</p>
              <p class="sig-card-consequence">An incumbent chose to exit rather than transform.</p>
            </div>
            ${chip("confirmed", D.ABB_SOFTBANK.source)}
          </div>

          <div class="sig-card">
            <p class="sig-card-figure num step" data-step="2"><span class="sig-count" data-count="china">0%</span></p>
            <div class="sig-card-rule"></div>
            <div class="sig-card-text step" data-step="2">
              <p class="sig-card-label">Chinese domestic vendors' share of their home market</p>
              <p class="sig-card-consequence">The world's largest robot market has already flipped.</p>
            </div>
            ${chip("confirmed", D.CHINA_DOMESTIC_SHARE.source)}
          </div>

          <div class="sig-card">
            <p class="sig-card-figure num step" data-step="3"><span class="sig-count" data-count="vc">$0B</span></p>
            <div class="sig-card-rule"></div>
            <div class="sig-card-text step" data-step="3">
              <p class="sig-card-label">Robotics venture funding, 2025</p>
              <p class="sig-card-consequence">The field is capitalised, not speculative.</p>
            </div>
            ${chip("estimate", D.ROBOTICS_VC_2025.source + " — estimate; sources vary")}
          </div>
        </div>

        <div class="sig-pivot">
          <span class="sig-pivot-arrow step" data-step="4">&#9656;</span>
          <svg class="sig-pivot-edge-svg" viewBox="0 0 3 100" preserveAspectRatio="none" aria-hidden="true">
            <line class="sig-pivot-rule" x1="1.5" y1="0" x2="1.5" y2="100"></line>
          </svg>
          <div class="sig-pivot-content step" data-step="4">
            <p class="sig-pivot-figures num">
              <span class="sig-count" data-count="units">0 units</span>
              <span class="sig-pivot-sep">·</span>
              <span class="sig-count" data-count="growth">+0%</span>
              <span class="sig-pivot-sep">·</span>
              <span class="sig-count" data-count="rank">0th worldwide</span>
            </p>
            <p class="sig-pivot-label">India, 2024 — the fastest-growing major robot market</p>
            ${chip("confirmed", D.INDIA_UNITS_2024.source)}
          </div>
        </div>

        <div class="sig-closing step" data-step="5">
          <p>Every number on this page is public. None of it is a forecast.</p>
        </div>
      </section>
    `;
  }

  const COUNTS = {
    abb: { to: D.ABB_SOFTBANK.value, format: (n) => "$" + n.toFixed(3) + "B" },
    china: { to: D.CHINA_DOMESTIC_SHARE.value, format: (n) => Math.round(n) + "%" },
    vc: { to: D.ROBOTICS_VC_2025.value, format: (n) => "$" + n.toFixed(1) + "B" },
    units: { to: D.INDIA_UNITS_2024.value, format: (n) => Math.round(n).toLocaleString("en-US") + " units" },
    growth: { to: D.INDIA_GROWTH_2024.value, format: (n) => "+" + Math.round(n) + "%" },
    rank: { to: D.INDIA_RANK_2024.value, format: (n) => Math.round(n) + "th worldwide" },
  };

  function runCount(root, key, delay) {
    const el = root.querySelector(`.sig-count[data-count="${key}"]`);
    const spec = COUNTS[key];
    const start = () => {
      controllers.push(
        window.Anim.countUp(el, { from: 0, to: spec.to, duration: 900, format: spec.format, reduced: isReduced })
      );
    };
    if (delay && !isReduced) {
      const t = setTimeout(start, delay);
      controllers.push({ cancel: () => clearTimeout(t) });
    } else {
      start();
    }
  }

  function revealStep(root, n) {
    if (n === 1) runCount(root, "abb", 0);
    if (n === 2) runCount(root, "china", 0);
    if (n === 3) runCount(root, "vc", 0);
    if (n === 4) {
      runCount(root, "units", 0);
      runCount(root, "growth", 150);
      runCount(root, "rank", 300);
      const rule = root.querySelector(".sig-pivot-rule");
      controllers.push(window.Anim.drawPath(rule, { duration: 400, easing: "ease-out", reduced: isReduced }));
    }
  }

  function primeRule(root) {
    const rule = root.querySelector(".sig-pivot-rule");
    const len = rule.getTotalLength();
    rule.style.strokeDasharray = String(len);
    rule.style.strokeDashoffset = String(len);
  }

  function hideStep(root, n) {
    if (n === 4) {
      const rule = root.querySelector(".sig-pivot-rule");
      window.Anim.resetPath(rule);
    }
  }

  window.page({
    id: "04-signals",
    title: "The capital has already moved.",
    theme: "light",
    steps: 5,
    render,
    onEnter: (root, ctx) => {
      clearAll();
      isReduced = ctx.isReduced;
      revealedThrough = 0;
      primeRule(root);
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
