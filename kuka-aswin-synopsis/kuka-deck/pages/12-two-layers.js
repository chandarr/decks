/**
 * pages/12-two-layers.js — Screen 12 · Two additive layers (light, ACT IV
 * opening). tasks/12-two-layers.md.
 *
 * The zone diagram is a deliberate geometric callback to screen 05: same
 * axis orientation, same bottom-right anchor, same relative proportions, so
 * a reader recognises it instantly. What's new is that the segments are now
 * NAMED (screen 05's dots were deliberately unlabelled) and KUKA is located
 * inside the small Layer 1 box.
 *
 * Both zones anchor to the same bottom-right corner by construction, so
 * Layer 2 always contains Layer 1 regardless of exact sizing — the layers
 * must read as additive, never alternative.
 *
 * The arithmetic line is DERIVED from two figures already presented and
 * chipped on screen 10, not from new research. No TAM figure appears
 * anywhere: the zone comparison is the size argument.
 */
(function () {
  const L1 = window.DeckData.LAYER1;
  const L2 = window.DeckData.LAYER2;
  const R = window.DeckData.RAAS_DUAL;

  // ---- plot geometry (viewBox 0 0 600 470) — mirrors screen 05 --------
  const ML = 60, MT = 20, PW = 520, PH = 420;
  const PX0 = ML, PY0 = MT, PX1 = ML + PW, PY1 = MT + PH;
  // Layer 1 is inset from the plot's bottom-right corner so Layer 2 encloses
  // it on all four sides. Anchoring both to the same corner (as screen 05
  // does) makes their borders coincide on two edges, which reads as adjacent
  // rather than contained — and "additive, not alternative" is the point.
  const Z1_INSET = 16;
  const Z1 = { w: 0.24 * PW, h: 0.28 * PH };
  Z1.x = PX1 - Z1.w - Z1_INSET;
  Z1.y = PY1 - Z1.h - Z1_INSET;
  const Z2 = { w: 0.85 * PW, h: 0.82 * PH };
  Z2.x = PX1 - Z2.w;
  Z2.y = PY1 - Z2.h;

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

  function splitFigure(value) {
    const m = String(value).match(/^([^0-9]*)([0-9][0-9,]*)(.*)$/);
    if (!m) return null;
    return { lead: m[1], num: Number(m[2].replace(/,/g, "")), tail: m[3] };
  }

  function render() {
    // Layer 2 segment labels distribute across the zone rather than cluster
    const l2Labels = L2.segments.map((s, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = Z2.x + 18 + col * (Z2.w / 2 - 6);
      const y = Z2.y + 30 + row * 19;
      return `<text class="tl-seg tl-seg--l2" x="${x.toFixed(1)}" y="${y.toFixed(1)}">${s}</text>`;
    }).join("");

    const kukaX = Z1.x + Z1.w / 2;
    const kukaY = Z1.y + Z1.h / 2 + 6;

    return `
      <section class="screen screen--two-layers">
        <div class="tl-header">
          <p class="kicker">THE MANDATE</p>
          <h1 class="display-2">Get a bigger piece of the cake. Then make the cake bigger.</h1>
        </div>

        <div class="tl-body">
          <div class="tl-plot-wrap">
            <svg class="tl-plot-svg" viewBox="0 0 600 470" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              <text class="tl-axis-label" x="6" y="${PY0 - 8}">task variability</text>
              <text class="tl-axis-label" x="6" y="${PY0 + 7}">(environmental structure)</text>
              <line class="tl-axis" x1="${ML}" y1="${PY1}" x2="${ML}" y2="${PY0 - 10}"></line>
              <path class="tl-axis" d="M ${ML - 5} ${PY0 - 1} L ${ML} ${PY0 - 12} L ${ML + 5} ${PY0 - 1}"></path>
              <line class="tl-axis" x1="${ML}" y1="${PY1}" x2="${PX1 + 10}" y2="${PY1}"></line>
              <path class="tl-axis" d="M ${PX1 - 1} ${PY1 - 5} L ${PX1 + 12} ${PY1} L ${PX1 - 1} ${PY1 + 5}"></path>
              <text class="tl-axis-label" x="${(ML + PX1) / 2}" y="${PY1 + 28}" text-anchor="middle">volume per variant</text>

              <!-- Layer 2 drawn first so Layer 1 and the marker sit on top -->
              <rect class="tl-zone2" x="${Z2.x}" y="${Z2.y}" width="${Z2.w}" height="${Z2.h}" rx="26"></rect>
              <text class="tl-zone-label tl-zone-label--l2" x="${Z2.x + 18}" y="${Z2.y + 16}">LAYER 2 — the new market</text>
              <g class="tl-l2-segs">${l2Labels}</g>

              <rect class="tl-zone1" x="${Z1.x}" y="${Z1.y}" width="${Z1.w}" height="${Z1.h}" rx="6"></rect>
              <text class="tl-zone-label tl-zone-label--l1" x="${Z1.x + 10}" y="${Z1.y - 8}">LAYER 1 — the existing market</text>
              <text class="tl-seg tl-seg--l1" x="${Z1.x + 10}" y="${Z1.y + 18}">${L1.segments.join(" · ")}</text>

              <g class="tl-kuka">
                <polygon class="tl-kuka-marker" points="
                  ${kukaX},${kukaY - 9} ${kukaX + 9},${kukaY} ${kukaX},${kukaY + 9} ${kukaX - 9},${kukaY}
                "></polygon>
                <text class="tl-kuka-label" x="${kukaX + 15}" y="${kukaY + 4}">KUKA today</text>
              </g>
            </svg>
          </div>

          <div class="tl-blocks">
            <div class="tl-block">
              <p class="tl-block-heading">LAYER 1 — THE PIECE</p>
              <div class="tl-block-rule"></div>
              <p class="tl-lead reveal">Recover the existing addressable market. This is justified on today's technology and today's demand.</p>
              <ul class="tl-bullets">
                <li class="tl-bullet">Local assembly and configuration — lead time and landed cost, not imported product</li>
                <li class="tl-bullet">An integrator network built, not rented — integration capability held in-house</li>
                <li class="tl-bullet">Segments beyond automotive — electronics, semiconductors, pharma, food and beverage</li>
              </ul>
              <div class="tl-arithmetic reveal">
                <p class="tl-arithmetic-line num"><span class="tl-count" data-count="kuka">₹0 cr</span> today. FANUC India is past <span class="tl-count" data-count="fanuc">₹0 cr</span>. Closing that gap is ${L1.multiple.value} on today&rsquo;s paradigm alone.</p>
                <p class="chip chip--estimate">estimate — derived</p>
              </div>
            </div>

            <div class="tl-block">
              <p class="tl-block-heading">LAYER 2 — THE CAKE</p>
              <div class="tl-block-rule"></div>
              <div class="tl-l2-lines">
                <p class="tl-l2-line reveal">The work that was never automatable at any price — low volume, high mix, contact-rich, variable.</p>
                <p class="tl-l2-line reveal">India is disproportionately this shape. So are Vietnam, Indonesia, Mexico and Brazil.</p>
                <p class="tl-l2-line reveal">No credible market sizing exists for a market that does not yet exist. The zone comparison is the claim.</p>
                <p class="chip chip--frontier reveal">frontier</p>
              </div>
            </div>
          </div>
        </div>

        <!-- The hinge. Sits between the two layer blocks and the closing line
             because it is the one mechanism that acts on both layers at once. -->
        <div class="tl-raas">
          <p class="tl-raas-heading">${R.heading}</p>
          <div class="tl-raas-edges">
            ${R.edges
              .map(
                (e) => `
              <div class="tl-raas-edge reveal">
                <p class="tl-raas-edge-label">${e.label}<span class="tl-raas-serves">${e.serves}</span></p>
                <p class="tl-raas-edge-body">${e.body}</p>
              </div>`
              )
              .join("")}
          </div>
          <div class="tl-raas-foot">
            <div class="tl-raas-foot-top">
              <p class="tl-raas-inference-label reveal">${R.inferenceLabel}</p>
              <p class="chip chip--${R.tier} reveal">${R.tier}</p>
            </div>
            <p class="tl-raas-inference reveal">${R.inference}</p>
          </div>
        </div>

        <p class="tl-closing">Layer 1 stands on its own. Layer 2 is what Layer 1 pays for.</p>
      </section>
    `;
  }

  function primeZone2(root) {
    const z2 = root.querySelector(".tl-zone2");
    const len = z2.getTotalLength();
    z2.style.strokeDasharray = String(len);
    z2.style.strokeDashoffset = String(len);
  }

  function runCount(root, key, value) {
    const el = root.querySelector(`.tl-count[data-count="${key}"]`);
    const parts = splitFigure(value);
    if (!parts || isReduced) { el.textContent = value; return; }
    controllers.push(
      window.Anim.countUp(el, {
        from: 0,
        to: parts.num,
        duration: 900,
        format: (n) => parts.lead + Math.round(n).toLocaleString("en-US"),
        reduced: false,
      })
    );
    schedule(() => { el.textContent = value; }, 920);
  }

  function revealStep(root, n) {
    if (n === 1) {
      const z1 = root.querySelector(".tl-zone1");
      const anim = z1.animate([{ fillOpacity: 0, strokeOpacity: 0 }, { fillOpacity: 0.1, strokeOpacity: 1 }], {
        duration: isReduced ? 0 : 400, fill: "forwards",
      });
      controllers.push({ cancel: () => anim.cancel() });
      controllers.push(window.Anim.fadeUp(root.querySelector(".tl-zone-label--l1"), { reduced: isReduced }));
      controllers.push(window.Anim.fadeUp(root.querySelector(".tl-seg--l1"), { reduced: isReduced }));
      controllers.push(window.Anim.scaleIn(root.querySelector(".tl-kuka"), { reduced: isReduced }));
    }
    if (n === 2) {
      root.querySelectorAll(".tl-bullet").forEach((b, i) => {
        if (isReduced) b.classList.add("is-visible");
        else schedule(() => b.classList.add("is-visible"), i * 140);
      });
      controllers.push(window.Anim.fadeUp(root.querySelector(".tl-lead"), { reduced: isReduced }));
    }
    if (n === 3) {
      controllers.push(window.Anim.fadeUp(root.querySelector(".tl-arithmetic"), { reduced: isReduced }));
      runCount(root, "kuka", L1.kuka_revenue.value);
      // The canonical figure carries its ">" (matching screen 10), but this
      // sentence already says "is past", so rendering both would read
      // "is past > ₹1,000 cr". Strip it here only — the copy is exact.
      runCount(root, "fanuc", L1.fanuc_revenue.value.replace(/^>\s*/, ""));
    }
    if (n === 4) {
      const z2 = root.querySelector(".tl-zone2");
      // dashAfter restores the frontier dash pattern the draw-on overwrites
      controllers.push(window.Anim.drawPath(z2, { duration: isReduced ? 0 : 700, easing: "ease-out", reduced: isReduced, dashAfter: "7 5" }));
      const fill = z2.animate([{ fillOpacity: 0 }, { fillOpacity: 0.05 }], {
        duration: isReduced ? 0 : 500, delay: isReduced ? 0 : 300, fill: "forwards",
      });
      controllers.push({ cancel: () => fill.cancel() });
      controllers.push(window.Anim.fadeUp(root.querySelector(".tl-zone-label--l2"), { reduced: isReduced }));
      controllers.push(window.Anim.fadeUp(root.querySelector(".tl-l2-segs"), { reduced: isReduced }));
    }
    if (n === 5) {
      root.querySelectorAll(".tl-l2-line, .tl-l2-lines .chip").forEach((l, i) => {
        if (isReduced) l.classList.add("is-visible");
        else schedule(() => l.classList.add("is-visible"), i * 130);
      });
    }
    if (n === 6) {
      // Both edges, then the synthesis — the pair has to land together for the
      // "cuts both ways" reading to work, so they stagger tightly.
      root.querySelectorAll(".tl-raas-edge").forEach((e, i) => {
        if (isReduced) e.classList.add("is-visible");
        else schedule(() => e.classList.add("is-visible"), i * 160);
      });
      root.querySelectorAll(".tl-raas-foot .reveal").forEach((e, i) => {
        if (isReduced) e.classList.add("is-visible");
        else schedule(() => e.classList.add("is-visible"), 380 + i * 110);
      });
    }
    if (n === 7) {
      controllers.push(window.Anim.fadeUp(root.querySelector(".tl-closing"), { reduced: isReduced }));
    }
  }

  function hideStep(root, n) {
    if (n === 1) {
      const z1 = root.querySelector(".tl-zone1");
      z1.style.fillOpacity = "0";
      z1.style.strokeOpacity = "0";
      root.querySelector(".tl-zone-label--l1").classList.remove("is-visible");
      root.querySelector(".tl-seg--l1").classList.remove("is-visible");
      root.querySelector(".tl-kuka").classList.remove("is-visible", "scale-in");
    }
    if (n === 2) {
      root.querySelectorAll(".tl-bullet").forEach((b) => b.classList.remove("is-visible"));
      root.querySelector(".tl-lead").classList.remove("is-visible");
    }
    if (n === 3) {
      root.querySelector(".tl-arithmetic").classList.remove("is-visible");
      root.querySelectorAll(".tl-count").forEach((el) => { el.textContent = "₹0 cr"; });
    }
    if (n === 4) {
      const z2 = root.querySelector(".tl-zone2");
      window.Anim.resetPath(z2);
      z2.style.fillOpacity = "0";
      root.querySelector(".tl-zone-label--l2").classList.remove("is-visible");
      root.querySelector(".tl-l2-segs").classList.remove("is-visible");
    }
    if (n === 5) {
      root.querySelectorAll(".tl-l2-line, .tl-l2-lines .chip").forEach((l) => l.classList.remove("is-visible"));
    }
    if (n === 6) {
      root.querySelectorAll(".tl-raas-edge, .tl-raas-foot .reveal").forEach((e) => e.classList.remove("is-visible"));
    }
    if (n === 7) {
      root.querySelector(".tl-closing").classList.remove("is-visible");
    }
  }

  window.page({
    id: "12-two-layers",
    title: "Get a bigger piece of the cake. Then make the cake bigger.",
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
    onLeave: () => { clearAll(); },
  });
})();
