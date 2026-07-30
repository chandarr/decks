/**
 * pages/08-four-corners.js — Screen 08 · The four corners (light, ACT II
 * close, structural keystone). tasks/08-four-corners.md.
 *
 * A 2x2 quadrant of the four capabilities required to industrialise physical
 * AI. Each competitor group's translucent shape covers only the corners it
 * holds — the *hole* is the argument. KUKA's orange shape spans all four,
 * with the development-depth corner rendered DASHED rather than solid.
 *
 * That split is the screen's payload: dashed = potential, solid = present
 * strength, matching the dash grammar on screens 03, 05 and 06. The dashed
 * segment is generated to bound the development cell exactly (verified: it
 * covers the top edge from the horizontal midpoint to the right edge, then
 * the right edge down to the vertical midpoint — precisely the tr cell's
 * outer perimeter), and is drawn as a continuation of the solid stroke's
 * endpoint so the two read as one continuous perimeter being drawn.
 *
 * Spanning shapes are derived from each holder's `holds` / `claims` cell ids
 * in data.js, never hardcoded, so changing which corners a group holds moves
 * its shape automatically.
 */
(function () {
  const CORNERS = window.DeckData.CORNERS;
  const HOLDERS = window.DeckData.HOLDERS;

  // ---- quadrant geometry (viewBox 0 0 620 400) -----------------------
  // Aspect (1.55) is tuned to the left column of the body grid so `meet`
  // leaves minimal slack and the cells aren't mostly empty.
  const X0 = 10, Y0 = 10, X1 = 610, Y1 = 390, R = 16;
  const MX = (X0 + X1) / 2, MY = (Y0 + Y1) / 2;
  const CELLS = {
    tl: [X0, Y0, MX, MY],
    tr: [MX, Y0, X1, MY],
    bl: [X0, MY, MX, Y1],
    br: [MX, MY, X1, Y1],
  };
  const CELL_OF = {};
  CORNERS.forEach((c) => { CELL_OF[c.id] = c.cell; });

  // Solid: top-edge midpoint → counterclockwise around left/bottom/right →
  // right-edge midpoint. Dashed: continues from there back to the start.
  const KUKA_SOLID_D =
    `M ${MX} ${Y0} L ${X0 + R} ${Y0} Q ${X0} ${Y0} ${X0} ${Y0 + R}` +
    ` L ${X0} ${Y1 - R} Q ${X0} ${Y1} ${X0 + R} ${Y1}` +
    ` L ${X1 - R} ${Y1} Q ${X1} ${Y1} ${X1} ${Y1 - R} L ${X1} ${MY}`;
  const KUKA_DASHED_D =
    `M ${X1} ${MY} L ${X1} ${Y0 + R} Q ${X1} ${Y0} ${X1 - R} ${Y0} L ${MX} ${Y0}`;

  function bboxOf(cornerIds, inset) {
    const cs = cornerIds.map((id) => CELLS[CELL_OF[id]]);
    const x0 = Math.min(...cs.map((c) => c[0])) + inset;
    const y0 = Math.min(...cs.map((c) => c[1])) + inset;
    const x1 = Math.max(...cs.map((c) => c[2])) - inset;
    const y1 = Math.max(...cs.map((c) => c[3])) - inset;
    return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
  }

  const COMPETITORS = HOLDERS.filter((h) => h.id !== "kuka");
  const KUKA = HOLDERS.find((h) => h.id === "kuka");
  const HOLD_MS = 600;

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

  // SVG <text> does not wrap, and several corner labels/descriptors are wider
  // than a cell — so wrap to tspans at a per-style character budget rather
  // than letting them run across the divider into the neighbouring cell.
  function wrap(text, maxChars) {
    const words = text.split(" ");
    const lines = [];
    let line = "";
    words.forEach((w) => {
      const candidate = line ? line + " " + w : w;
      if (candidate.length > maxChars && line) {
        lines.push(line);
        line = w;
      } else {
        line = candidate;
      }
    });
    if (line) lines.push(line);
    return lines;
  }

  function render() {
    const cellMarkup = CORNERS.map((c) => {
      const [cx0, cy0] = CELLS[c.cell];
      const pad = 26;
      const x = cx0 + pad;
      // mono label is wider per character than the body descriptor
      const labelLines = wrap(c.label, 30);
      const descLines = wrap(c.desc, 40);
      let y = cy0 + pad + 8;
      const labelMarkup = labelLines
        .map((l, i) => `<text class="fc-cell-label" x="${x}" y="${y + i * 16}">${l}</text>`)
        .join("");
      y += labelLines.length * 16 + 8;
      const descMarkup = descLines
        .map((l, i) => `<text class="fc-cell-desc" x="${x}" y="${y + i * 17}">${l}</text>`)
        .join("");
      return `<g class="fc-cell">${labelMarkup}${descMarkup}</g>`;
    }).join("");

    // physical-AI sits inside humanoid's footprint (same corner), so it gets
    // a deeper inset — both stay distinguishable once they're ghosts.
    const shapes = COMPETITORS.map((h) => {
      const inset = h.id === "physicalai" ? 26 : 14;
      const b = bboxOf(h.holds, inset);
      return `<rect class="fc-shape" data-holder="${h.id}" x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="18"></rect>`;
    }).join("");

    const legend = HOLDERS.map((h, i) => {
      const isKuka = h.id === "kuka";
      const marker = isKuka
        ? `<span class="fc-legend-marker fc-legend-marker--kuka"></span>`
        : `<span class="fc-legend-marker"></span>`;
      return `
        <div class="fc-legend-entry" data-holder="${h.id}" data-idx="${i + 1}">
          ${marker}
          <div class="fc-legend-text">
            <p class="fc-legend-name">${h.label}</p>
            <p class="fc-legend-gap">${h.gap}</p>
          </div>
        </div>`;
    }).join("");

    return `
      <section class="screen screen--four-corners">
        <div class="fc-header">
          <p class="kicker">THE COMBINATION</p>
          <h1 class="display-2">Four corners. No competitor can reach all of them.</h1>
          <p class="subtitle">What it takes to industrialise physical AI — and who can actually hold it.</p>
        </div>

        <div class="fc-body">
          <div class="fc-quadrant-wrap">
            <svg class="fc-quadrant-svg" viewBox="0 0 620 400" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              <rect class="fc-frame" x="${X0}" y="${Y0}" width="${X1 - X0}" height="${Y1 - Y0}" rx="${R}"></rect>
              <line class="fc-divider" x1="${MX}" y1="${Y0}" x2="${MX}" y2="${Y1}"></line>
              <line class="fc-divider" x1="${X0}" y1="${MY}" x2="${X1}" y2="${MY}"></line>
              ${cellMarkup}
              ${shapes}
              <path class="fc-kuka-solid" d="${KUKA_SOLID_D}"></path>
              <path class="fc-kuka-dashed" d="${KUKA_DASHED_D}"></path>
            </svg>
          </div>

          <div class="fc-legend">
            <p class="fc-legend-heading">WHO HOLDS WHAT</p>
            ${legend}
          </div>
        </div>

        <div class="fc-closing">
          <p class="fc-closing-line" data-line="1">Four corners. No competitor can reach all of them.</p>
          <p class="fc-closing-line" data-line="2">One of KUKA's is not yet built.</p>
        </div>
      </section>
    `;
  }

  function primeKuka(root) {
    [".fc-kuka-solid", ".fc-kuka-dashed"].forEach((sel) => {
      const p = root.querySelector(sel);
      const len = p.getTotalLength();
      // dashed segment carries its own visible dash pattern once drawn, so
      // the draw-on uses a separate offset property set inline here and the
      // pattern is applied via CSS only after the draw completes.
      p.style.strokeDasharray = String(len);
      p.style.strokeDashoffset = String(len);
    });
  }

  function revealCompetitor(root, idx) {
    const h = COMPETITORS[idx - 1];
    const shape = root.querySelector(`.fc-shape[data-holder="${h.id}"]`);
    const entry = root.querySelector(`.fc-legend-entry[data-holder="${h.id}"]`);
    entry.classList.add("is-lit");

    if (isReduced) {
      shape.classList.add("is-ghost");
      return;
    }
    shape.classList.add("is-active");
    // Scale only — opacity stays owned by the CSS classes. Animating opacity
    // here with fill:"both" would persist as an animation effect that
    // outranks `.is-ghost`, leaving every competitor shape stuck at full
    // opacity and destroying the cumulative-contrast reading.
    const anim = shape.animate(
      [{ transform: "scale(0.97)" }, { transform: "scale(1)" }],
      { duration: 300, easing: "cubic-bezier(.2,.8,.2,1)", fill: "both" }
    );
    controllers.push({ cancel: () => anim.cancel() });
    schedule(() => {
      shape.classList.remove("is-active");
      shape.classList.add("is-ghost");
    }, HOLD_MS);
  }

  function revealKuka(root) {
    const solid = root.querySelector(".fc-kuka-solid");
    const dashed = root.querySelector(".fc-kuka-dashed");
    const entry = root.querySelector('.fc-legend-entry[data-holder="kuka"]');
    entry.classList.add("is-lit");

    if (isReduced) {
      controllers.push(window.Anim.drawPath(solid, { reduced: true }));
      controllers.push(window.Anim.drawPath(dashed, { reduced: true }));
      dashed.classList.add("is-drawn");
      return;
    }
    controllers.push(window.Anim.drawPath(solid, { duration: 700, easing: "ease-out", reduced: false }));
    schedule(() => {
      controllers.push(window.Anim.drawPath(dashed, { duration: 400, easing: "ease-out", reduced: false }));
      // swap to the visible dash pattern only once the draw-on has finished,
      // so the draw itself isn't fighting the pattern for the dasharray.
      schedule(() => dashed.classList.add("is-drawn"), 400);
    }, 700);
  }

  function revealStep(root, n) {
    if (n >= 1 && n <= 4) revealCompetitor(root, n);
    if (n === 5) revealKuka(root);
    if (n === 6) {
      const l1 = root.querySelector('.fc-closing-line[data-line="1"]');
      const l2 = root.querySelector('.fc-closing-line[data-line="2"]');
      controllers.push(window.Anim.fadeUp(l1, { reduced: isReduced }));
      if (isReduced) {
        controllers.push(window.Anim.fadeUp(l2, { reduced: true }));
      } else {
        schedule(() => controllers.push(window.Anim.fadeUp(l2, { reduced: false })), 400);
      }
    }
  }

  function hideStep(root, n) {
    if (n >= 1 && n <= 4) {
      const h = COMPETITORS[n - 1];
      const shape = root.querySelector(`.fc-shape[data-holder="${h.id}"]`);
      shape.classList.remove("is-active", "is-ghost");
      shape.style.opacity = "";
      shape.style.transform = "";
      root.querySelector(`.fc-legend-entry[data-holder="${h.id}"]`).classList.remove("is-lit");
    }
    if (n === 5) {
      const solid = root.querySelector(".fc-kuka-solid");
      const dashed = root.querySelector(".fc-kuka-dashed");
      dashed.classList.remove("is-drawn");
      [solid, dashed].forEach((p) => window.Anim.resetPath(p));
      root.querySelector('.fc-legend-entry[data-holder="kuka"]').classList.remove("is-lit");
    }
    if (n === 6) {
      root.querySelectorAll(".fc-closing-line").forEach((l) => l.classList.remove("is-visible"));
    }
  }

  window.page({
    id: "08-four-corners",
    title: "Four corners. No competitor can reach all of them.",
    theme: "light",
    steps: 6,
    render,
    onEnter: (root, ctx) => {
      clearAll();
      isReduced = ctx.isReduced;
      revealedThrough = 0;
      primeKuka(root);
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
