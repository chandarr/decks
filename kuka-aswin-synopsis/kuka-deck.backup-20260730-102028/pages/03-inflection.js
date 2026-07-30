/**
 * pages/03-inflection.js — Screen 03 · The inflection (light, ACT I).
 * tasks/03-inflection.md.
 *
 * Two curves on one plot: a ghosted LLM precedent that crosses the
 * industrial-reliability threshold, and the solid physical-AI curve that
 * approaches but does not cross it at [now] — the gap is the argument.
 * Curve coordinates are precomputed (Catmull-Rom -> cubic bezier) rather
 * than hand-picked, split at the [now] boundary with matching tangents so
 * solid and dashed segments don't kink where they meet.
 */
(function () {
  // ---- plot geometry (viewBox 0 0 960 500) ---------------------------
  const ML = 50, MT = 20, PW = 890, PH = 420; // margins / plot width+height
  const X = (year) => ML + ((year - 2022) / 6) * PW;
  const Y = (frac) => MT + (1 - frac) * PH;
  const NOW_YEAR = 2026.5;
  const THRESHOLD_FRAC = 0.78;
  const NOW_X = X(NOW_YEAR);
  const THRESHOLD_Y = Y(THRESHOLD_FRAC);
  const AXIS_BOTTOM = MT + PH; // 440
  const AXIS_TOP = MT; // 20

  const M = window.DeckData.MILESTONES;
  // (year offset, y-fraction) per milestone, in MILESTONES order — the two
  // 2024 entries (OpenVLA, pi-series) are nudged apart in x so their labels
  // don't collide, per the acceptance criterion.
  const MILE_PLOT = [
    { year: 2022, frac: 0.08 },
    { year: 2023, frac: 0.18 },
    { year: 2024, frac: 0.32 },
    { year: 2024.4, frac: 0.38 },
    { year: 2025, frac: 0.5 },
  ];
  const NOW_POINT = { x: NOW_X, y: Y(0.62) };

  function smoothSegments(points) {
    const segs = [];
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;
      const c1x = p1.x + (p2.x - p0.x) / 6;
      const c1y = p1.y + (p2.y - p0.y) / 6;
      const c2x = p2.x - (p3.x - p1.x) / 6;
      const c2y = p2.y - (p3.y - p1.y) / 6;
      segs.push(`C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`);
    }
    return segs;
  }

  const paiAllPoints = [
    ...MILE_PLOT.map((m) => ({ x: X(m.year), y: Y(m.frac) })),
    NOW_POINT,
    { x: X(2027.2), y: Y(0.7) },
    { x: X(2027.9), y: Y(THRESHOLD_FRAC) },
  ];
  const paiSegs = smoothSegments(paiAllPoints);
  const PAI_SOLID_D =
    `M ${paiAllPoints[0].x.toFixed(1)} ${paiAllPoints[0].y.toFixed(1)} ` + paiSegs.slice(0, 5).join(" ");
  const PAI_DASHED_D = `M ${NOW_POINT.x.toFixed(1)} ${NOW_POINT.y.toFixed(1)} ` + paiSegs.slice(5).join(" ");

  const llmPoints = [
    { x: X(2022), y: Y(0.15) },
    { x: X(2022.8), y: Y(0.3) },
    { x: X(2023.6), y: Y(0.5) },
    { x: X(2024.4), y: Y(0.68) },
    { x: X(2025.0), y: Y(0.78) },
    { x: X(2025.8), y: Y(0.88) },
    { x: X(2027.0), y: Y(0.94) },
    { x: X(2028.0), y: Y(0.96) },
  ];
  const llmSegs = smoothSegments(llmPoints);
  const LLM_D = `M ${llmPoints[0].x.toFixed(1)} ${llmPoints[0].y.toFixed(1)} ` + llmSegs.join(" ");

  let controllers = [];
  let timers = [];
  let isReduced = false;

  function schedule(fn, delay) {
    timers.push(setTimeout(fn, delay));
  }
  function clearAll() {
    controllers.forEach((c) => c.cancel());
    controllers = [];
    timers.forEach((t) => clearTimeout(t));
    timers = [];
  }

  function chipDot(tier) {
    return `<span class="infl-ev-dot infl-ev-dot--${tier}"></span>`;
  }

  function render() {
    const years = [2022, 2023, 2024, 2025, 2026, 2027, 2028];
    const ticks = years
      .map((yr) => `<text class="infl-tick" x="${X(yr)}" y="${AXIS_BOTTOM + 24}" text-anchor="middle">${yr}</text>`)
      .join("");

    const milestoneNodes = MILE_PLOT.map((m, i) => {
      const p = { x: X(m.year), y: Y(m.frac) };
      const item = M[i];
      return `
        <g class="infl-milestone" data-mi="${i}">
          <circle class="infl-milestone-dot" cx="${p.x}" cy="${p.y}" r="5"></circle>
          <text class="infl-milestone-label" x="${p.x + 8}" y="${p.y - 8}">${item.label} '${String(item.year).slice(2, 4)}</text>
        </g>`;
    }).join("");

    return `
      <section class="screen screen--inflection">
        <div class="infl-header">
          <p class="kicker">THE INFLECTION</p>
          <h1 class="display-2">The robot is being told what to achieve, not what to do.</h1>
          <p class="subtitle">Automation 1.0 → 2.0 — and the reliability gap that sets the clock.</p>
        </div>

        <div class="infl-plot-wrap">
          <svg class="infl-plot-svg" viewBox="0 0 960 500" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <text class="infl-axis-label" x="${ML}" y="12" text-anchor="start">task generalization</text>
            <line class="infl-axis" x1="${ML}" y1="${AXIS_BOTTOM}" x2="${ML}" y2="${AXIS_TOP - 4}"></line>
            <line class="infl-axis" x1="${ML}" y1="${AXIS_BOTTOM}" x2="924" y2="${AXIS_BOTTOM}"></line>
            <path class="infl-axis" d="M 919 ${AXIS_BOTTOM - 5} L 928 ${AXIS_BOTTOM} L 919 ${AXIS_BOTTOM + 5}"></path>
            ${ticks}

            <line class="infl-now-line" x1="${NOW_X}" y1="${AXIS_BOTTOM}" x2="${NOW_X}" y2="${AXIS_TOP}"></line>
            <text class="infl-now-label" x="${NOW_X}" y="${AXIS_BOTTOM + 24}" text-anchor="middle">[now]</text>

            <line class="infl-threshold" x1="${ML}" y1="${THRESHOLD_Y}" x2="924" y2="${THRESHOLD_Y}"></line>
            <text class="infl-threshold-label" x="924" y="${THRESHOLD_Y - 8}" text-anchor="end">industrial reliability threshold</text>

            <rect class="infl-window-band" data-band="1" x="${NOW_X}" y="${AXIS_TOP}" width="${X(2027.9) - NOW_X}" height="${AXIS_BOTTOM - AXIS_TOP}"></rect>
            <text class="infl-window-label" x="${(NOW_X + X(2027.9)) / 2}" y="${AXIS_TOP + 16}" text-anchor="middle">the build window</text>

            <path class="infl-llm-curve" d="${LLM_D}"></path>
            <text class="infl-llm-label" x="${X(2022.4)}" y="${Y(0.24)}">LLMs — the same curve, four years earlier</text>

            <path class="infl-pai-curve" d="${PAI_SOLID_D}"></path>
            <path class="infl-pai-projection" d="${PAI_DASHED_D}"></path>
            <text class="infl-pai-label" x="${X(2025.3)}" y="${Y(0.58)}">physical AI</text>

            ${milestoneNodes}
          </svg>
        </div>

        <div class="infl-footer">
          <div class="infl-contrast">
            <div class="infl-contrast-header">
              <span>1.0</span>
              <span></span>
              <span>2.0</span>
            </div>
            <div class="infl-contrast-row" data-row="1">
              <span class="infl-contrast-left">fixed program</span>
              <span class="infl-contrast-arrow">→</span>
              <span class="infl-contrast-right">learned policy</span>
            </div>
            <div class="infl-contrast-row" data-row="2">
              <span class="infl-contrast-left">fixtured environment</span>
              <span class="infl-contrast-arrow">→</span>
              <span class="infl-contrast-right">perceived environment</span>
            </div>
            <div class="infl-contrast-row" data-row="3">
              <span class="infl-contrast-left">reprogram to change</span>
              <span class="infl-contrast-arrow">→</span>
              <span class="infl-contrast-right">retask by instruction</span>
            </div>
            <div class="infl-contrast-row" data-row="4">
              <span class="infl-contrast-left">volume justifies automation</span>
              <span class="infl-contrast-arrow">→</span>
              <span class="infl-contrast-right">mix justifies automation</span>
            </div>
          </div>

          <div class="infl-evidence">
            <p class="infl-evidence-heading">EVIDENCE</p>
            <div class="infl-evidence-lines reveal">
              <p class="infl-evidence-line">${chipDot("confirmed")} RT-1 (2022) · RT-2 (2023) — Google / DeepMind</p>
              <p class="infl-evidence-line">${chipDot("confirmed")} OpenVLA (2024) · π-series (2024) — Stanford-Berkeley / Physical Intelligence</p>
              <p class="infl-evidence-line">${chipDot("confirmed")} GR00T N (2025) — NVIDIA</p>
              <p class="infl-evidence-line">${chipDot("confirmed")} No VLA system is yet certified for unsupervised industrial duty.</p>
              <p class="infl-evidence-line">${chipDot("frontier")} LLM trajectory shown as analogy, not evidence.</p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function primeDraws(root) {
    [".infl-llm-curve", ".infl-pai-curve", ".infl-pai-projection"].forEach((sel) => {
      const el = root.querySelector(sel);
      const len = el.getTotalLength();
      el.style.strokeDasharray = String(len);
      el.style.strokeDashoffset = String(len);
    });
  }

  function revealStep(root, n) {
    const llm = root.querySelector(".infl-llm-curve");
    const llmLabel = root.querySelector(".infl-llm-label");
    const pai = root.querySelector(".infl-pai-curve");
    const paiLabel = root.querySelector(".infl-pai-label");
    const proj = root.querySelector(".infl-pai-projection");
    const band = root.querySelector(".infl-window-band");
    const bandLabel = root.querySelector(".infl-window-label");
    const rows = root.querySelectorAll(".infl-contrast-row");

    if (n === 1) {
      controllers.push(window.Anim.drawPath(llm, { duration: isReduced ? 0 : 900, easing: "ease-out", reduced: isReduced }));
      controllers.push(window.Anim.fadeUp(llmLabel, { reduced: isReduced }));
    }
    if (n === 2) {
      controllers.push(window.Anim.drawPath(pai, { duration: isReduced ? 0 : 900, easing: "ease-out", reduced: isReduced }));
      controllers.push(window.Anim.fadeUp(paiLabel, { reduced: isReduced }));
    }
    if (n === 3) {
      const nodes = root.querySelectorAll(".infl-milestone");
      nodes.forEach((node, i) => {
        if (isReduced) {
          node.classList.add("is-visible");
          return;
        }
        schedule(() => node.classList.add("is-visible"), i * 120);
      });
    }
    if (n === 4) {
      // dashAfter restores the frontier dash pattern the draw-on overwrites —
      // the projection must stay visually distinct from the solid curve
      controllers.push(window.Anim.drawPath(proj, { duration: isReduced ? 0 : 700, easing: "ease-out", reduced: isReduced, dashAfter: "5 4" }));
      const bandAnim = band.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: isReduced ? 0 : 400,
        fill: "forwards",
      });
      controllers.push({ cancel: () => bandAnim.cancel() });
      controllers.push(window.Anim.fadeUp(bandLabel, { reduced: isReduced }));
    }
    if (n === 5) {
      rows.forEach((row, i) => {
        if (isReduced) {
          row.classList.add("is-visible");
          return;
        }
        schedule(() => row.classList.add("is-visible"), i * 150);
      });
    }
    if (n === 6) {
      controllers.push(window.Anim.fadeUp(root.querySelector(".infl-evidence-lines"), { reduced: isReduced }));
    }
  }

  function hideStep(root, n) {
    const llm = root.querySelector(".infl-llm-curve");
    const llmLabel = root.querySelector(".infl-llm-label");
    const pai = root.querySelector(".infl-pai-curve");
    const paiLabel = root.querySelector(".infl-pai-label");
    const proj = root.querySelector(".infl-pai-projection");
    const band = root.querySelector(".infl-window-band");
    const bandLabel = root.querySelector(".infl-window-label");

    if (n === 1) {
      window.Anim.resetPath(llm);
      llmLabel.classList.remove("is-visible");
    }
    if (n === 2) {
      window.Anim.resetPath(pai);
      paiLabel.classList.remove("is-visible");
    }
    if (n === 3) {
      root.querySelectorAll(".infl-milestone").forEach((node) => node.classList.remove("is-visible"));
    }
    if (n === 4) {
      window.Anim.resetPath(proj);
      band.style.opacity = "0";
      bandLabel.classList.remove("is-visible");
    }
    if (n === 5) {
      root.querySelectorAll(".infl-contrast-row").forEach((row) => row.classList.remove("is-visible"));
    }
    if (n === 6) {
      root.querySelector(".infl-evidence-lines").classList.remove("is-visible");
    }
  }

  let revealedThrough = 0;

  window.page({
    id: "03-inflection",
    title: "The robot is being told what to achieve, not what to do.",
    theme: "light",
    steps: 6,
    render,
    onEnter: (root, ctx) => {
      clearAll();
      isReduced = ctx.isReduced;
      revealedThrough = 0;
      primeDraws(root);
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
