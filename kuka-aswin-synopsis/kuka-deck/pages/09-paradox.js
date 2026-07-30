/**
 * pages/09-paradox.js — Screen 09 · The paradox (light, ACT III opening).
 * tasks/09-paradox.md. The tension peak of the deck.
 *
 * Three-part: a dense, animated demand panel on the left; a broken flow
 * channel in the centre; a deliberately inert entity panel on the right.
 * No commentary connects them — the channel does that work alone, and the
 * reader supplies the sentence.
 *
 * The channel starts INTACT (that is what the relationship should look
 * like) and breaks at step 4: seven strands stop at ~60% across and fray
 * into short dashes; exactly one thin orange strand reaches through. The
 * break is deliberately undramatic — no shatter, no shake. Strand geometry
 * is generated deterministically (no RNG) so full/main/fray segments share
 * exact coordinates and the fray continues the main line seamlessly.
 *
 * The break lands BEFORE the entity facts, not after: the strands stop
 * short of a right-hand panel that is still empty, and the facts then
 * arrive as the account of what is (and is not) on that side.
 *
 * Orange is used on the kicker, India's density bar, the surviving strand
 * and the closing statement. The demand figures and the gap block stay ink
 * and secondary: colouring the figures would flatten the density bar, which
 * is the one number on the left panel that has to be seen.
 */
(function () {
  const D = window.DeckData;

  // ---- flow channel geometry (viewBox 0 0 200 420) -------------------
  const CH_W = 200, CH_H = 420;
  const STRAND_COUNT = 8;
  const SURVIVOR_IDX = 3;
  const BREAK_T = 0.6;   // strands stop 60% across
  const FRAY_T = 0.68;   // fray dashes run to here

  function strandPoint(i, t) {
    const baseY = 34 + i * 50;
    const drift = ((i % 3) - 1) * 12;
    return {
      x: t * CH_W,
      y: baseY + drift * t + 5 * Math.sin(t * Math.PI * 1.4 + i * 0.7),
    };
  }
  function smoothPath(points) {
    let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;
      const c1x = p1.x + (p2.x - p0.x) / 6, c1y = p1.y + (p2.y - p0.y) / 6;
      const c2x = p2.x - (p3.x - p1.x) / 6, c2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return d;
  }
  function sample(i, t0, t1, n) {
    const pts = [];
    for (let k = 0; k <= n; k++) pts.push(strandPoint(i, t0 + ((t1 - t0) * k) / n));
    return pts;
  }

  const STRANDS = [];
  for (let i = 0; i < STRAND_COUNT; i++) {
    STRANDS.push({
      i,
      survivor: i === SURVIVOR_IDX,
      full: smoothPath(sample(i, 0, 1, 26)),
      main: smoothPath(sample(i, 0, BREAK_T, 18)),
      fray: smoothPath(sample(i, BREAK_T, FRAY_T, 5)),
    });
  }

  // ---- density bars (viewBox 0 0 460 130) ----------------------------
  const BAR_X = 110, BAR_MAX = 300;
  const BAR_ROWS = [22, 65, 108];
  const DENSITY_MAX = Math.max(...D.DENSITY.map((d) => d.value));

  let controllers = [];
  let timers = [];
  // The fact stagger is held separately from the general timer pool so
  // stepping back off the entity step can cancel exactly those timers.
  // Without this, reversing faster than the 5×140ms stagger lets a pending
  // timer fire after the hide and re-show a fact the step counter has
  // already taken away.
  let factTimers = [];
  let isReduced = false;
  let revealedThrough = 0;

  function schedule(fn, delay) { timers.push(setTimeout(fn, delay)); }
  function clearFactTimers() {
    factTimers.forEach((t) => clearTimeout(t));
    factTimers = [];
  }
  function clearAll() {
    controllers.forEach((c) => c.cancel());
    controllers = [];
    timers.forEach((t) => clearTimeout(t));
    timers = [];
    clearFactTimers();
  }

  function render() {
    const bars = D.DENSITY.map((d, i) => {
      const y = BAR_ROWS[i];
      const w = (d.value / DENSITY_MAX) * BAR_MAX;
      const isIndia = d.label === "India";
      return `
        <text class="pdx-bar-label" x="0" y="${y + 4}">${d.label}</text>
        <line class="pdx-bar ${isIndia ? "pdx-bar--india" : ""}" data-bar="${i}"
              x1="${BAR_X}" y1="${y}" x2="${(BAR_X + w).toFixed(1)}" y2="${y}"></line>
        <text class="pdx-bar-value" data-barval="${i}" x="${(BAR_X + w + 12).toFixed(1)}" y="${y + 4}">0</text>`;
    }).join("");

    const strandMarkup = STRANDS.map((s) => {
      if (s.survivor) {
        return `<path class="pdx-strand pdx-strand--survivor" data-strand="${s.i}" d="${s.full}"></path>`;
      }
      return `
        <path class="pdx-strand pdx-strand--full" data-strand="${s.i}" d="${s.full}"></path>
        <path class="pdx-strand pdx-strand--main" data-strand="${s.i}" d="${s.main}"></path>
        <path class="pdx-strand pdx-strand--fray" data-strand="${s.i}" d="${s.fray}"></path>`;
    }).join("");

    const facts = [
      { text: `~${D.KUKA_INDIA_HEADCOUNT.value} people`, src: D.KUKA_INDIA_HEADCOUNT.source, tier: D.KUKA_INDIA_HEADCOUNT.tier },
      { text: "A trade-and-service classified entity", src: D.KUKA_INDIA_NIC.source, tier: D.KUKA_INDIA_NIC.tier },
      { text: "No local manufacturing", src: null, tier: null },
      { text: "Integration outsourced to third-party system integrators", src: null, tier: null },
      { text: "Revenue up sharply. Profit down sharply. Same year.", src: D.KUKA_INDIA_FY24.source, tier: D.KUKA_INDIA_FY24.tier },
    ].map((f, i) => `
        <div class="pdx-fact" data-fact="${i + 1}">
          <p class="pdx-fact-text">${f.text}</p>
          ${f.src ? `<p class="chip chip--${f.tier}">${f.src}</p>` : ""}
        </div>`).join("");

    return `
      <section class="screen screen--paradox">
        <div class="pdx-header">
          <p class="kicker">THE PARADOX</p>
          <h1 class="display-2">The market is not the problem.</h1>
        </div>

        <div class="pdx-body">
          <div class="pdx-panel pdx-panel--demand">
            <p class="pdx-panel-heading">THE DEMAND</p>
            <div class="pdx-panel-rule"></div>

            <div class="pdx-block" data-block="1">
              <p class="pdx-figures num">
                <span class="pdx-count" data-count="units">0 units</span>
                <span class="pdx-sep">·</span>
                <span class="pdx-count" data-count="growth">+0%</span>
                <span class="pdx-sep">·</span>
                <span class="pdx-count" data-count="rank">0th worldwide</span>
              </p>
              <p class="pdx-figure-caption">India, 2024 — the fastest-growing major robot market</p>
              <p class="chip chip--confirmed">${D.INDIA_UNITS_2024.source}</p>
            </div>

            <div class="pdx-block" data-block="2">
              <p class="pdx-sub-heading">${D.DENSITY_MEASURE.label}</p>
              <svg class="pdx-density-svg" viewBox="0 0 460 130" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                ${bars}
              </svg>
              <p class="chip chip--confirmed">${D.DENSITY_MEASURE.source}</p>
            </div>

            <div class="pdx-block" data-block="3">
              <p class="pdx-sub-heading pdx-ambition-heading">AND THE AMBITION REQUIRES IT</p>
              <p class="pdx-sectors">Semiconductor fabs · aerospace and defence · EV gigafactories · export-grade electronics</p>
              <p class="pdx-ambition-claim">This class of manufacturing cannot be delivered by a large low-skilled manual workforce at any scale. The robots are a precondition, not a preference.</p>
            </div>
          </div>

          <div class="pdx-channel">
            <svg class="pdx-channel-svg" viewBox="0 0 ${CH_W} ${CH_H}" preserveAspectRatio="none" aria-hidden="true">
              ${strandMarkup}
            </svg>
          </div>

          <div class="pdx-panel pdx-panel--entity">
            <p class="pdx-panel-heading">KUKA INDIA TODAY</p>
            <div class="pdx-panel-rule"></div>
            ${facts}

            <!-- The verdict closes this column rather than the whole screen:
                 capacity is exactly what this panel documents. Split across two
                 lines so the contrast between the sentences is structural. -->
            <div class="pdx-closing reveal">
              <p class="pdx-closing-line">Demand is not the constraint.</p>
              <p class="pdx-closing-line">Capacity to capture it is.</p>
            </div>
          </div>
        </div>

        <div class="pdx-gap reveal">
          <p class="pdx-gap-label">THE GAP IN THE MIDDLE</p>
          <p class="pdx-gap-line">The connective tissue is missing.</p>
          <p class="pdx-gap-detail">Application engineering, in-house integration, deployment data coming back — the work that carries demand across is almost entirely absent.</p>
        </div>

      </section>
    `;
  }

  const COUNTS = {
    units: { to: D.INDIA_UNITS_2024.value, format: (n) => Math.round(n).toLocaleString("en-US") + " units" },
    growth: { to: D.INDIA_GROWTH_2024.value, format: (n) => "+" + Math.round(n) + "%" },
    rank: { to: D.INDIA_RANK_2024.value, format: (n) => Math.round(n) + "th worldwide" },
  };

  function primeBars(root) {
    root.querySelectorAll(".pdx-bar").forEach((bar) => {
      const len = bar.getTotalLength();
      bar.style.strokeDasharray = String(len);
      bar.style.strokeDashoffset = String(len);
    });
  }

  function revealStep(root, n) {
    if (n === 1) {
      root.querySelector('.pdx-block[data-block="1"]').classList.add("is-visible");
      Object.keys(COUNTS).forEach((k) => {
        const el = root.querySelector(`.pdx-count[data-count="${k}"]`);
        controllers.push(window.Anim.countUp(el, { from: 0, to: COUNTS[k].to, duration: 900, format: COUNTS[k].format, reduced: isReduced }));
      });
    }
    if (n === 2) {
      root.querySelector('.pdx-block[data-block="2"]').classList.add("is-visible");
      D.DENSITY.forEach((d, i) => {
        const run = () => {
          const bar = root.querySelector(`.pdx-bar[data-bar="${i}"]`);
          const val = root.querySelector(`.pdx-bar-value[data-barval="${i}"]`);
          controllers.push(window.Anim.drawPath(bar, { duration: isReduced ? 0 : 500, easing: "ease-out", reduced: isReduced }));
          controllers.push(window.Anim.countUp(val, { from: 0, to: d.value, duration: isReduced ? 0 : 500, format: (x) => String(Math.round(x)), reduced: isReduced }));
        };
        if (isReduced) run();
        else schedule(run, i * 200);
      });
    }
    if (n === 3) {
      const block = root.querySelector('.pdx-block[data-block="3"]');
      block.classList.add("is-visible");
      const claim = root.querySelector(".pdx-ambition-claim");
      if (isReduced) claim.classList.add("is-visible");
      else schedule(() => claim.classList.add("is-visible"), 250);
    }
    if (n === 4) breakChannel(root);
    if (n === 5) {
      root.querySelectorAll(".pdx-fact").forEach((f, i) => {
        if (isReduced) f.classList.add("is-visible");
        else factTimers.push(setTimeout(() => f.classList.add("is-visible"), i * 140));
      });
    }
    if (n === 6) {
      controllers.push(window.Anim.fadeUp(root.querySelector(".pdx-gap"), { reduced: isReduced }));
    }
    if (n === 7) {
      controllers.push(window.Anim.fadeUp(root.querySelector(".pdx-closing"), { reduced: isReduced }));
    }
  }

  function breakChannel(root) {
    root.querySelector(".pdx-channel").classList.add("is-broken");
    root.querySelector(".pdx-channel-svg").classList.add("is-broken");
    if (isReduced) return;

    // Subtle flow drift — two cycles then settle, never a permanent loop.
    // Both the drifting mains and the survivor share the same cadence.
    // one full dash-pattern length (74 + 5) per cycle, so the drift loops
    // seamlessly rather than snapping at the iteration boundary
    const drifters = root.querySelectorAll(".pdx-strand--main, .pdx-strand--survivor");
    drifters.forEach((el) => {
      const anim = el.animate([{ strokeDashoffset: 0 }, { strokeDashoffset: -79 }], {
        duration: 4000,
        iterations: 2,
        easing: "linear",
        fill: "forwards",
      });
      controllers.push({ cancel: () => anim.cancel() });
    });
  }

  function hideStep(root, n) {
    if (n === 1) {
      root.querySelector('.pdx-block[data-block="1"]').classList.remove("is-visible");
    }
    if (n === 2) {
      root.querySelector('.pdx-block[data-block="2"]').classList.remove("is-visible");
      root.querySelectorAll(".pdx-bar").forEach((bar) => {
        window.Anim.resetPath(bar);
      });
      root.querySelectorAll(".pdx-bar-value").forEach((v) => { v.textContent = "0"; });
    }
    if (n === 3) {
      root.querySelector('.pdx-block[data-block="3"]').classList.remove("is-visible");
      root.querySelector(".pdx-ambition-claim").classList.remove("is-visible");
    }
    if (n === 4) {
      root.querySelector(".pdx-channel").classList.remove("is-broken");
      root.querySelector(".pdx-channel-svg").classList.remove("is-broken");
    }
    if (n === 5) {
      clearFactTimers();
      root.querySelectorAll(".pdx-fact").forEach((f) => f.classList.remove("is-visible"));
    }
    if (n === 6) {
      root.querySelector(".pdx-gap").classList.remove("is-visible");
    }
    if (n === 7) {
      root.querySelector(".pdx-closing").classList.remove("is-visible");
    }
  }

  window.page({
    id: "09-paradox",
    title: "The market is not the problem.",
    theme: "light",
    steps: 7,
    render,
    onEnter: (root, ctx) => {
      clearAll();
      isReduced = ctx.isReduced;
      revealedThrough = 0;
      primeBars(root);
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
