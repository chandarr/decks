/**
 * pages/04-signals.js — Screen 04 · The signals (light, ACT I closing).
 * tasks/04-signals.md.
 *
 * Three-plus-four: three greyscale signal cards over a bounded evidence
 * block — heading, orange headline, a row of four sub-boxes, and the
 * inference line under them. Every figure is a countUp bound to data.js;
 * card 3's estimate chip must stay visibly distinct from the other
 * confirmed chips.
 *
 * The block is the screen's conclusion, so it is the only element carrying a
 * tinted field and orange type; the three cards above stay greyscale.
 *
 * The sub-box ORDER is the argument and must not be rearranged: capital
 * priced at the brain twice (models alone, then embodied), discounted at the
 * body, and the line nobody has crossed. Box 1 deliberately carries no
 * number — "$B valuations" is defensible where "$6.5B combined" invites an
 * argument about which round and when — and box 4's "0" is a fact, not a
 * count. Neither is animated.
 *
 * The India pivot card that used to close this screen was removed when the
 * sub-boxes landed: the screen cannot hold both at 900px. India now first
 * appears on screen 12 (the paradox).
 */
(function () {
  const D = window.DeckData;

  let controllers = [];
  // The sub-box stagger is held apart from the controller pool so stepping
  // back off step 4 can cancel exactly those timers — otherwise a pending
  // one fires after the hide and re-shows a box the step counter has already
  // taken away.
  let subTimers = [];
  let isReduced = false;
  let revealedThrough = 0;

  function clearSubTimers() {
    subTimers.forEach((t) => clearTimeout(t));
    subTimers = [];
  }
  function clearAll() {
    controllers.forEach((c) => c.cancel());
    controllers = [];
    clearSubTimers();
  }

  function chip(tier, text) {
    return `<p class="chip chip--${tier}">${text}</p>`;
  }

  // Figures resolve from data.js; the chip line is copy, so it is written out
  // as specified rather than composed from tier + source.
  const SUBS = [
    {
      n: 1,
      label: "THE MODELS",
      count: "pureplay",
      body: "Physical Intelligence and Skild, on models alone — no hardware, no safety case, no installed base.",
      tier: "estimate",
      chip: "estimate — reported private valuations",
    },
    {
      n: 2,
      label: "THE NEW BODIES",
      count: "figure",
      body: "Figure's valuation, on pre-revenue humanoid hardware.",
      tier: "estimate",
      chip: "estimate — reported valuation, mid-2025",
    },
    {
      n: 3,
      label: "THE PROVEN BODY",
      count: "ebit",
      body: "EBIT margins at the incumbents shipping certified industrial robots today.",
      tier: "confirmed",
      chip: "confirmed — company annual reports",
    },
    {
      n: 4,
      label: "THE LINE NOT CROSSED",
      count: "vla",
      body: "VLA systems certified for unsupervised industrial duty.",
      tier: "confirmed",
      chip: "confirmed",
    },
  ];

  function render() {
    return `
      <section class="screen screen--signals">
        <div class="sig-header">
          <p class="kicker">THE SIGNALS</p>
          <h1 class="display-2">The capital has already moved.</h1>
          <p class="subtitle">Three facts about the industry — and four about where the capital has gone.</p>
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

        <div class="sig-block">
          <div class="sig-block-head reveal">
            <p class="sig-block-heading">WHERE THE CAPITAL IS NOT LOOKING</p>
            <p class="sig-block-headline">Capital is concentrated on the brain. The constraint is in the body.</p>
          </div>

          <div class="sig-subs">
            ${SUBS.map((s) => `
            <div class="sig-sub" data-sub="${s.n}">
              <p class="sig-sub-label">${s.label}</p>
              <div class="sig-sub-rule"></div>
              <p class="sig-sub-figure num"><span class="sig-count" data-count="${s.count}">${INITIAL[s.count]}</span></p>
              <p class="sig-sub-body">${s.body}</p>
              ${chip(s.tier, s.chip)}
            </div>`).join("")}
          </div>

          <p class="sig-inference reveal">My read: the layer being priced is the layer that will commoditise.</p>
        </div>

        <div class="sig-closing step" data-step="6">
          <p>Every number on this page is public. None of it is a forecast.</p>
        </div>
      </section>
    `;
  }

  const COUNTS = {
    abb: { to: D.ABB_SOFTBANK.value, format: (n) => "$" + n.toFixed(3) + "B" },
    china: { to: D.CHINA_DOMESTIC_SHARE.value, format: (n) => Math.round(n) + "%" },
    vc: { to: D.ROBOTICS_VC_2025.value, format: (n) => "$" + n.toFixed(1) + "B" },
    figure: { to: D.FIGURE_VALUATION.value, format: (n) => "~$" + Math.round(n) + "B" },
    // The range counts on its upper bound only; the lower bound settles at 1
    // on the first frame so no intermediate ever reads as "~1–0%".
    ebit: {
      to: D.INCUMBENT_EBIT.high,
      format: (n) => "~" + D.INCUMBENT_EBIT.low + "–" + Math.max(D.INCUMBENT_EBIT.low, Math.round(n)) + "%",
    },
  };

  // Rendered text at step 0, and what hideStep restores. The two static
  // figures resolve from data.js like every other number on the screen —
  // they simply never animate.
  const INITIAL = {
    pureplay: D.PUREPLAY_SOFTWARE.value,
    figure: "~$0B",
    ebit: "~" + D.INCUMBENT_EBIT.low + "–" + D.INCUMBENT_EBIT.low + "%",
    vla: String(D.NO_CERTIFIED_VLA.value),
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

  // The block's heading and headline land first and frame the row; the boxes
  // follow 120ms behind. Box 4 gets a longer beat than the 140ms separating
  // 1–3: it is the one that turns the observation into an argument.
  const SUB_DELAY = { 1: 120, 2: 260, 3: 400, 4: 600 };

  function revealStep(root, n) {
    if (n === 1) runCount(root, "abb", 0);
    if (n === 2) runCount(root, "china", 0);
    if (n === 3) runCount(root, "vc", 0);
    if (n === 4) {
      controllers.push(window.Anim.fadeUp(root.querySelector(".sig-block-head"), { reduced: isReduced }));
      SUBS.forEach((s) => {
        const box = root.querySelector(`.sig-sub[data-sub="${s.n}"]`);
        const show = () => {
          controllers.push(window.Anim.scaleIn(box, { reduced: isReduced }));
          if (COUNTS[s.count]) runCount(root, s.count, 0);
        };
        if (isReduced) show();
        else subTimers.push(setTimeout(show, SUB_DELAY[s.n]));
      });
    }
    // The inference is the screen's only interpretation, and the only line on
    // it written in the first person — it gets its own beat, after the
    // evidence it reads from.
    if (n === 5) {
      controllers.push(window.Anim.fadeUp(root.querySelector(".sig-inference"), { reduced: isReduced }));
    }
  }

  function hideStep(root, n) {
    if (n === 4) {
      clearSubTimers();
      root.querySelector(".sig-block-head").classList.remove("is-visible");
      SUBS.forEach((s) => {
        root.querySelector(`.sig-sub[data-sub="${s.n}"]`).classList.remove("is-visible", "scale-in");
        const el = root.querySelector(`.sig-count[data-count="${s.count}"]`);
        el.textContent = INITIAL[s.count];
      });
    }
    if (n === 5) {
      root.querySelector(".sig-inference").classList.remove("is-visible");
    }
  }

  window.page({
    id: "04-signals",
    title: "The capital has already moved.",
    theme: "light",
    steps: 6,
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
