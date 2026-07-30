/**
 * pages/05-what-changes.js — Screen 05 · What changes (light, ACT I crux).
 * tasks/05-what-changes.md.
 *
 * Left: a dot field with a tiny Automation 1.0 zone and a far larger dashed
 * 2.0 zone that fully contains it (zones share the same bottom-right anchor
 * corner by construction, so containment holds regardless of exact sizing).
 * Right: the five-row industrialisation stack, audited — four rows fill
 * with an asset tag, row 3 resolves last as a hollow ring. That asymmetry
 * is the single most important visual element on the screen.
 */
(function () {
  const STACK = window.DeckData.KUKA_STACK;

  // ---- plot geometry (viewBox 0 0 600 480) ---------------------------
  const ML = 60, MT = 20, PW = 520, PH = 440;
  const PLOT_X0 = ML, PLOT_Y0 = MT, PLOT_X1 = ML + PW, PLOT_Y1 = MT + PH;
  const Z1 = { w: 0.22 * PW, h: 0.26 * PH };
  Z1.x = PLOT_X1 - Z1.w;
  Z1.y = PLOT_Y1 - Z1.h;
  const Z2 = { w: 0.85 * PW, h: 0.82 * PH };
  Z2.x = PLOT_X1 - Z2.w;
  Z2.y = PLOT_Y1 - Z2.h;

  // Dot field, ~90 dots, density-biased toward upper-left via a seeded PRNG
  // (deterministic so the layout doesn't reshuffle on every reload).
  function seededRandom(seed) {
    let s = seed;
    return () => {
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      return s / 0x7fffffff;
    };
  }
  function inRect(p, r) {
    return p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h;
  }
  const rnd = seededRandom(42);
  const DOTS = [];
  for (let i = 0; i < 90; i++) {
    const bx = Math.pow(rnd(), 1.6);
    const by = Math.pow(rnd(), 1.6);
    const p = { x: +(PLOT_X0 + bx * PW).toFixed(1), y: +(PLOT_Y0 + by * PH).toFixed(1) };
    p.zone = inRect(p, Z1) ? "1" : inRect(p, Z2) ? "2only" : "out";
    DOTS.push(p);
  }

  let controllers = [];
  let timers = [];
  let isReduced = false;
  let revealedThrough = 0;

  function schedule(fn, delay) {
    timers.push(setTimeout(fn, delay));
  }
  function clearAll() {
    controllers.forEach((c) => c.cancel());
    controllers = [];
    timers.forEach((t) => clearTimeout(t));
    timers = [];
  }

  function stackRowMarkup(item, i) {
    const n = i + 1;
    return `
      <div class="wc-stack-row">
        <p class="wc-row-text reveal" data-row="${n}">${item.work}</p>
        <div class="wc-stack-rule" data-row="${n}"></div>
        <div class="wc-row-asset">
          <span class="wc-asset-marker" data-row="${n}" data-held="${item.held}"></span>
          <span class="wc-asset-tag" data-row="${n}">${item.held ? item.asset : ""}</span>
          ${!item.held ? `<span class="wc-gap-label" data-row="${n}">GAP</span>` : ""}
        </div>
      </div>`;
  }

  function render() {
    const dotMarkup = DOTS.map(
      (d) => `<circle class="wc-dot" data-zone="${d.zone}" cx="${d.x}" cy="${d.y}" r="2"></circle>`
    ).join("");

    return `
      <section class="screen screen--what-changes">
        <div class="wc-header">
          <p class="kicker">WHAT CHANGES</p>
          <h1 class="display-2">Industrialising physical AI. And what it is worth.</h1>
          <p class="subtitle">The market doesn't get faster. It gets bigger.</p>
        </div>

        <div class="wc-body">
          <div class="wc-plot-col">
            <div class="wc-plot-wrap">
              <svg class="wc-plot-svg" viewBox="0 0 600 480" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                <text class="wc-axis-label wc-axis-label--y" x="8" y="${PLOT_Y0 - 6}">task variability</text>
                <text class="wc-axis-label wc-axis-label--y" x="8" y="${PLOT_Y0 + 10}">(environmental structure)</text>
                <line class="wc-axis" x1="${ML}" y1="${PLOT_Y1}" x2="${ML}" y2="${PLOT_Y0 - 10}"></line>
                <path class="wc-axis" d="M ${ML - 5} ${PLOT_Y0 - 1} L ${ML} ${PLOT_Y0 - 12} L ${ML + 5} ${PLOT_Y0 - 1}"></path>
                <line class="wc-axis" x1="${ML}" y1="${PLOT_Y1}" x2="${PLOT_X1 + 10}" y2="${PLOT_Y1}"></line>
                <path class="wc-axis" d="M ${PLOT_X1 - 1} ${PLOT_Y1 - 5} L ${PLOT_X1 + 12} ${PLOT_Y1} L ${PLOT_X1 - 1} ${PLOT_Y1 + 5}"></path>
                <text class="wc-axis-label" x="${(ML + PLOT_X1) / 2}" y="${PLOT_Y1 + 26}" text-anchor="middle">volume per variant</text>

                ${dotMarkup}

                <rect class="wc-zone1" x="${Z1.x}" y="${Z1.y}" width="${Z1.w}" height="${Z1.h}" rx="2"></rect>
                <text class="wc-zone1-label" x="${Z1.x + Z1.w / 2}" y="${Z1.y + Z1.h + 18}" text-anchor="middle">Automation 1.0 serves only here</text>

                <rect class="wc-zone2" x="${Z2.x}" y="${Z2.y}" width="${Z2.w}" height="${Z2.h}" rx="28"></rect>
                <text class="wc-zone2-label" x="${Z2.x + 14}" y="${Z2.y + 22}">Automation 2.0 — the addressable set</text>
              </svg>
            </div>

            <div class="wc-mechanisms">
              <div class="wc-mechanism reveal" data-mech="1">
                <p class="wc-mechanism-title">The setup cost collapses.</p>
                <p class="wc-mechanism-sub">Programming and fixturing were the fixed cost that made automation viable only above a volume threshold.</p>
              </div>
              <div class="wc-mechanism reveal" data-mech="2">
                <p class="wc-mechanism-title">The task set widens.</p>
                <p class="wc-mechanism-sub">Contact-rich, variable tasks that were not automatable at any price become tractable.</p>
              </div>
            </div>
          </div>

          <div class="wc-stack">
            <p class="wc-stack-heading">THE INDUSTRIALISATION STACK</p>
            ${STACK.map(stackRowMarkup).join("")}
          </div>
        </div>

        <div class="wc-closing">
          <p class="wc-closing-block reveal" data-side="left">The base models will be public.<br>Industrialising them will not.</p>
          <p class="wc-closing-block reveal" data-side="right">Four of five, KUKA already holds.<br>The fifth is the whole argument.</p>
        </div>
      </section>
    `;
  }

  function primeZone2(root) {
    const z2 = root.querySelector(".wc-zone2");
    const len = z2.getTotalLength();
    z2.style.strokeDasharray = String(len);
    z2.style.strokeDashoffset = String(len);
  }

  function revealStep(root, n) {
    if (n === 1) {
      controllers.push(window.Anim.fadeUp(root.querySelector(".wc-zone1"), { reduced: isReduced }));
      controllers.push(window.Anim.fadeUp(root.querySelector(".wc-zone1-label"), { reduced: isReduced }));
    }
    if (n === 2) {
      const z2 = root.querySelector(".wc-zone2");
      // dashAfter restores the frontier dash pattern the draw-on overwrites —
      // without it the 2.0 boundary renders solid and stops being visually
      // distinct from the solid 1.0 boundary
      controllers.push(window.Anim.drawPath(z2, { duration: isReduced ? 0 : 700, easing: "ease-out", reduced: isReduced, dashAfter: "7 5" }));
      const fillAnim = z2.animate([{ fillOpacity: 0 }, { fillOpacity: 0.06 }], {
        duration: isReduced ? 0 : 500,
        delay: isReduced ? 0 : 300,
        fill: "forwards",
      });
      controllers.push({ cancel: () => fillAnim.cancel() });
      controllers.push(window.Anim.fadeUp(root.querySelector(".wc-zone2-label"), { reduced: isReduced }));
      root.querySelectorAll('.wc-dot[data-zone="2only"]').forEach((dot) => dot.classList.add("is-darkened"));
    }
    if (n === 3) {
      root.querySelectorAll(".wc-mechanism").forEach((m, i) => {
        if (isReduced) {
          m.classList.add("is-visible");
        } else {
          schedule(() => m.classList.add("is-visible"), i * 150);
        }
      });
    }
    if (n === 4) {
      root.querySelectorAll(".wc-row-text").forEach((row, i) => {
        if (isReduced) row.classList.add("is-visible");
        else schedule(() => row.classList.add("is-visible"), i * 140);
      });
    }
    if (n === 5) {
      const order = [1, 2, 4, 5, 3];
      order.forEach((rowNum, i) => {
        const doReveal = () => {
          const marker = root.querySelector(`.wc-asset-marker[data-row="${rowNum}"]`);
          const tag = root.querySelector(`.wc-asset-tag[data-row="${rowNum}"]`);
          marker.classList.add("is-visible");
          if (!isReduced) {
            const anim = marker.animate(
              [{ transform: "scale(1)" }, { transform: "scale(1.15)" }, { transform: "scale(1)" }],
              { duration: 200, easing: "ease-out" }
            );
            controllers.push({ cancel: () => anim.cancel() });
          }
          tag.classList.add("is-visible");
        };
        if (isReduced) doReveal();
        else schedule(doReveal, i * 180);
      });
    }
    if (n === 6) {
      root.querySelector('.wc-gap-label[data-row="3"]').classList.add("is-visible");
      root.querySelector('.wc-stack-rule[data-row="3"]').classList.add("is-gap");
    }
    if (n === 7) {
      root.querySelectorAll(".wc-closing-block").forEach((el) => controllers.push(window.Anim.fadeUp(el, { reduced: isReduced })));
    }
  }

  function hideStep(root, n) {
    if (n === 1) {
      root.querySelector(".wc-zone1").classList.remove("is-visible");
      root.querySelector(".wc-zone1-label").classList.remove("is-visible");
    }
    if (n === 2) {
      const z2 = root.querySelector(".wc-zone2");
      window.Anim.resetPath(z2);
      z2.style.fillOpacity = "0";
      root.querySelector(".wc-zone2-label").classList.remove("is-visible");
      root.querySelectorAll('.wc-dot[data-zone="2only"]').forEach((dot) => dot.classList.remove("is-darkened"));
    }
    if (n === 3) {
      root.querySelectorAll(".wc-mechanism").forEach((m) => m.classList.remove("is-visible"));
    }
    if (n === 4) {
      root.querySelectorAll(".wc-row-text").forEach((row) => row.classList.remove("is-visible"));
    }
    if (n === 5) {
      root.querySelectorAll(".wc-asset-marker, .wc-asset-tag").forEach((el) => el.classList.remove("is-visible"));
    }
    if (n === 6) {
      root.querySelector('.wc-gap-label[data-row="3"]').classList.remove("is-visible");
      root.querySelector('.wc-stack-rule[data-row="3"]').classList.remove("is-gap");
    }
    if (n === 7) {
      root.querySelectorAll(".wc-closing-block").forEach((el) => el.classList.remove("is-visible"));
    }
  }

  window.page({
    id: "05-what-changes",
    title: "Industrialising physical AI. And what it is worth.",
    theme: "light",
    steps: 7,
    render,
    onEnter: (root, ctx) => {
      clearAll();
      isReduced = ctx.isReduced;
      revealedThrough = 0;
      primeZone2(root);
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
