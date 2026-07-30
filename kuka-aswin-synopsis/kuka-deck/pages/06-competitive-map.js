/**
 * pages/06-competitive-map.js — Screen 06 · The competitive map (light,
 * ACT II opening). tasks/06-competitive-map.md.
 *
 * The deck's first click-interactive screen. Clicking a revealed cluster
 * swaps the detail panel and marks it active — and must NEVER advance or
 * consume a reveal step. That's enforced two ways: every blob's click
 * handler calls stopPropagation() before engine.js's document-level
 * click-to-advance handler ever sees it, and unrevealed blobs get
 * `pointer-events: none` in CSS so an invisible blob can't eat a click
 * meant for navigation in the first place.
 *
 * The vectors as first given in tasks/06-competitive-map.md pointed three of
 * five clusters (modern-mfg, humanoids, physical-ai-software) up-LEFT, which
 * contradicted the acceptance criterion that "all arrows visibly point into"
 * the upper-RIGHT convergence region. Resolved in favour of the criterion:
 * every vector in data.js now points up-and-right, into the region.
 */
(function () {
  const CLUSTERS = window.DeckData.CLUSTERS;
  const KUKA_MARKER = window.DeckData.KUKA_MARKER;

  // ---- map geometry (viewBox 0 0 900 520) ----------------------------
  const ML = 70, MT = 20, PW = 760, PH = 460;
  const PLOT_X0 = ML, PLOT_Y0 = MT, PLOT_X1 = ML + PW, PLOT_Y1 = MT + PH;
  const DIAG = Math.sqrt(PW * PW + PH * PH);

  function toPx(fracX, fracY) {
    return { x: PLOT_X0 + fracX * PW, y: PLOT_Y1 - fracY * PH };
  }
  function vecEnd(pos, vec, len) {
    const start = toPx(pos[0], pos[1]);
    const mag = Math.sqrt(vec[0] ** 2 + vec[1] ** 2);
    const ux = vec[0] / mag, uy = vec[1] / mag;
    const pxLen = len * DIAG;
    return { start, end: { x: start.x + ux * pxLen, y: start.y - uy * pxLen } };
  }

  const BLOB_W = 178, BLOB_H = 50;

  let controllers = [];
  let timers = [];
  let isReduced = false;
  let activeId = "traditional";
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

  function arrowMarkup(start, end, cls) {
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    const headLen = 9;
    const a1 = angle + Math.PI * 0.82;
    const a2 = angle - Math.PI * 0.82;
    const p1 = { x: end.x + headLen * Math.cos(a1), y: end.y + headLen * Math.sin(a1) };
    const p2 = { x: end.x + headLen * Math.cos(a2), y: end.y + headLen * Math.sin(a2) };
    return `
      <g class="${cls}">
        <line class="map-vector-line" x1="${start.x.toFixed(1)}" y1="${start.y.toFixed(1)}" x2="${end.x.toFixed(1)}" y2="${end.y.toFixed(1)}"></line>
        <polygon class="map-vector-head" points="${end.x.toFixed(1)},${end.y.toFixed(1)} ${p1.x.toFixed(1)},${p1.y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}"></polygon>
      </g>`;
  }

  function panelMarkup(c, isKuka) {
    const membersLine = isKuka ? "" : `<p class="map-panel-members">${c.members.join(" · ")}</p>`;
    return `
      <div class="map-panel" data-panel="${isKuka ? "kuka" : c.id}">
        <p class="map-panel-title">${isKuka ? "KUKA" : c.panelTitle}</p>
        <div class="map-panel-rule"></div>
        ${membersLine}
        <p class="map-panel-relevance">${c.relevance}</p>
        <p class="chip chip--${c.tier}">${c.tier}</p>
      </div>`;
  }

  function render() {
    const blobs = CLUSTERS.map((c, i) => {
      const p = toPx(c.pos[0], c.pos[1]);
      const x = p.x - BLOB_W / 2, y = p.y - BLOB_H / 2;
      return `
        <g class="map-blob step scale-in" data-cluster="${c.id}" data-step="${i + 1}">
          <rect class="map-blob-shape" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${BLOB_W}" height="${BLOB_H}" rx="22"></rect>
          <text class="map-blob-label" x="${p.x.toFixed(1)}" y="${(p.y + 4).toFixed(1)}" text-anchor="middle">${c.label}</text>
        </g>`;
    }).join("");

    const vectors = CLUSTERS.map((c) => {
      const { start, end } = vecEnd(c.pos, c.vec, c.len);
      return arrowMarkup(start, end, `map-vector map-vector--cluster`);
    }).join("");

    const kukaPos = toPx(KUKA_MARKER.pos[0], KUKA_MARKER.pos[1]);
    const kukaVec = vecEnd(KUKA_MARKER.pos, KUKA_MARKER.vec, KUKA_MARKER.len);
    const kukaVectorMarkup = arrowMarkup(kukaVec.start, kukaVec.end, "map-vector map-vector--kuka");

    // convergence region — literal "upper-right corner" per spec
    const convX = PLOT_X0 + 0.62 * PW, convY = PLOT_Y0 + 0.02 * PH;
    const convW = 0.36 * PW, convH = 0.34 * PH;

    return `
      <section class="screen screen--competitive-map">
        <div class="map-header">
          <p class="kicker">THE FIELD</p>
          <h1 class="display-2">Everyone is converging on the same corner.</h1>
          <div class="map-header-row">
            <p class="subtitle">Five kinds of competitor, one destination.</p>
            <p class="map-affordance">click any cluster &#9656;</p>
          </div>
        </div>

        <div class="map-body">
          <div class="map-wrap">
            <svg class="map-svg" viewBox="0 0 900 520" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              <line class="map-axis" x1="${ML}" y1="${PLOT_Y1}" x2="${ML}" y2="${PLOT_Y0 - 10}"></line>
              <path class="map-axis" d="M ${ML - 5} ${PLOT_Y0 - 1} L ${ML} ${PLOT_Y0 - 12} L ${ML + 5} ${PLOT_Y0 - 1}"></path>
              <line class="map-axis" x1="${ML}" y1="${PLOT_Y1}" x2="${PLOT_X1 + 10}" y2="${PLOT_Y1}"></line>
              <path class="map-axis" d="M ${PLOT_X1 - 1} ${PLOT_Y1 - 5} L ${PLOT_X1 + 12} ${PLOT_Y1} L ${PLOT_X1 - 1} ${PLOT_Y1 + 5}"></path>
              <text class="map-axis-label" x="${ML}" y="${PLOT_Y0 - 16}">hardware &amp; certification depth</text>
              <text class="map-axis-label" x="${(ML + PLOT_X1) / 2}" y="${PLOT_Y1 + 26}" text-anchor="middle">software &amp; AI velocity</text>

              <rect class="map-convergence" x="${convX.toFixed(1)}" y="${convY.toFixed(1)}" width="${convW.toFixed(1)}" height="${convH.toFixed(1)}" rx="20"></rect>
              <text class="map-convergence-label" x="${(convX + convW / 2).toFixed(1)}" y="${(convY + 20).toFixed(1)}" text-anchor="middle">where all of them are going</text>

              ${vectors}
              ${kukaVectorMarkup}
              ${blobs}

              <polygon class="map-kuka-marker" points="
                ${kukaPos.x},${kukaPos.y - 11}
                ${kukaPos.x + 11},${kukaPos.y}
                ${kukaPos.x},${kukaPos.y + 11}
                ${kukaPos.x - 11},${kukaPos.y}
              " data-cluster="kuka"></polygon>
              <!-- Set above the diamond, not beside it: KUKA sits deliberately
                   close to the traditional-leaders blob, and a right-hand label
                   lands on top of that blob's outline. -->
              <text class="map-kuka-label" x="${kukaPos.x}" y="${kukaPos.y - 14}" text-anchor="middle">KUKA</text>
            </svg>
          </div>

          <div class="map-panel-stack">
            ${CLUSTERS.map((c) => panelMarkup(c, false)).join("")}
            ${panelMarkup(KUKA_MARKER, true)}
          </div>
        </div>

        <p class="map-epistemic">Cluster positions are judgement. The arrows are public record.</p>
      </section>
    `;
  }

  // All six panels stay permanently laid out (grid-stacked in the same
  // cell, never display:none) so the tallest one always reserves the row's
  // height — hiding a panel via display would let the row shrink to
  // whichever panel is currently active, causing exactly the layout shift
  // the task file rules out. Opacity/pointer-events are driven entirely via
  // inline style + WAAPI fill:"forwards", never a CSS class, so there's no
  // fight between a persisted animation effect and a class-based rule.
  function setActivePanel(root, id) {
    if (id === activeId) return;
    const outEl = root.querySelector(`.map-panel[data-panel="${activeId}"]`);
    const inEl = root.querySelector(`.map-panel[data-panel="${id}"]`);
    if (!outEl || !inEl) return;

    if (isReduced) {
      outEl.style.opacity = "0";
      outEl.style.pointerEvents = "none";
      inEl.style.opacity = "1";
      inEl.style.pointerEvents = "auto";
    } else {
      const outAnim = outEl.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: "forwards" });
      const inAnim = inEl.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, fill: "forwards" });
      controllers.push({ cancel: () => { outAnim.cancel(); inAnim.cancel(); } });
      outEl.style.pointerEvents = "none";
      inEl.style.pointerEvents = "auto";
    }
    activeId = id;

    root.querySelectorAll(".map-blob-shape, .map-kuka-marker").forEach((el) => el.classList.remove("is-active"));
    const shapeEl = root.querySelector(`.map-blob[data-cluster="${id}"] .map-blob-shape, .map-kuka-marker[data-cluster="${id}"]`);
    if (shapeEl) shapeEl.classList.add("is-active");
  }

  function wireInteraction(root) {
    root.querySelectorAll(".map-blob").forEach((blob) => {
      blob.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!blob.classList.contains("is-visible")) return;
        setActivePanel(root, blob.dataset.cluster);
      });
    });
    const kuka = root.querySelector(".map-kuka-marker");
    kuka.addEventListener("click", (e) => {
      e.stopPropagation();
      setActivePanel(root, "kuka");
    });
  }

  function primeVectors(root) {
    root.querySelectorAll(".map-vector-line").forEach((line) => {
      const len = line.getTotalLength();
      line.style.strokeDasharray = String(len);
      line.style.strokeDashoffset = String(len);
    });
    root.querySelectorAll(".map-vector-head").forEach((head) => {
      head.style.opacity = "0";
    });
  }

  function drawVector(root, selector, delay) {
    const g = root.querySelector(selector);
    const line = g.querySelector(".map-vector-line");
    const head = g.querySelector(".map-vector-head");
    const run = () => {
      controllers.push(window.Anim.drawPath(line, { duration: isReduced ? 0 : 600, easing: "ease-out", reduced: isReduced }));
      const headAnim = head.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: isReduced ? 0 : 150,
        delay: isReduced ? 0 : 450,
        fill: "forwards",
      });
      controllers.push({ cancel: () => headAnim.cancel() });
    };
    if (delay && !isReduced) schedule(run, delay);
    else run();
  }

  function undrawVector(root, selector) {
    const g = root.querySelector(selector);
    const line = g.querySelector(".map-vector-line");
    const head = g.querySelector(".map-vector-head");
    window.Anim.resetPath(line);
    head.getAnimations().forEach((a) => a.cancel());
    head.style.opacity = "0";
  }

  // Blobs (steps 1-5) are plain `.step.scale-in` elements — the engine's
  // generic applySteps() already reveals/hides them on every step change,
  // so only steps 6 (vectors) and 7 (convergence) need custom handling here.
  function revealStep(root, n) {
    if (n === 6) {
      // all cluster vectors draw together; KUKA's draws 300ms after they
      // finish (600ms draw + 300ms = 900ms), never with the group.
      root.querySelectorAll(".map-vector--cluster").forEach((g) => {
        if (isReduced) {
          const line = g.querySelector(".map-vector-line");
          const head = g.querySelector(".map-vector-head");
          controllers.push(window.Anim.drawPath(line, { reduced: true }));
          head.style.opacity = "1";
        } else {
          const line = g.querySelector(".map-vector-line");
          controllers.push(window.Anim.drawPath(line, { duration: 600, easing: "ease-out", reduced: false }));
          const head = g.querySelector(".map-vector-head");
          const headAnim = head.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 150, delay: 450, fill: "forwards" });
          controllers.push({ cancel: () => headAnim.cancel() });
        }
      });
      drawVector(root, ".map-vector--kuka", isReduced ? 0 : 900);
    }
    if (n === 7) {
      const region = root.querySelector(".map-convergence");
      const label = root.querySelector(".map-convergence-label");
      const anim = region.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: isReduced ? 0 : 400,
        fill: "forwards",
      });
      controllers.push({ cancel: () => anim.cancel() });
      controllers.push(window.Anim.fadeUp(label, { reduced: isReduced }));
    }
  }

  function hideStep(root, n) {
    if (n === 6) {
      root.querySelectorAll(".map-vector--cluster").forEach((g) => {
        const line = g.querySelector(".map-vector-line");
        const head = g.querySelector(".map-vector-head");
        window.Anim.resetPath(line);
        head.getAnimations().forEach((a) => a.cancel());
        head.style.opacity = "0";
      });
      undrawVector(root, ".map-vector--kuka");
    }
    if (n === 7) {
      root.querySelector(".map-convergence").style.opacity = "0";
      root.querySelector(".map-convergence-label").classList.remove("is-visible");
    }
  }

  window.page({
    id: "06-competitive-map",
    title: "Everyone is converging on the same corner.",
    theme: "light",
    steps: 7,
    render,
    onEnter: (root, ctx) => {
      clearAll();
      isReduced = ctx.isReduced;
      revealedThrough = 0;
      activeId = "traditional";
      primeVectors(root);
      wireInteraction(root);

      root.querySelectorAll(".map-panel").forEach((p) => {
        const active = p.dataset.panel === "traditional";
        p.style.opacity = active ? "1" : "0";
        p.style.pointerEvents = active ? "auto" : "none";
      });
      root.querySelector('.map-blob[data-cluster="traditional"] .map-blob-shape').classList.add("is-active");
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
      activeId = "traditional";
    },
  });
})();
