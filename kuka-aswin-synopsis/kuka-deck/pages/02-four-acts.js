/**
 * pages/02-four-acts.js — Screen 02 · The four acts (light, ACT I).
 * tasks/02-four-acts.md.
 *
 * A single continuous trajectory — the same motif that exits screen 01 —
 * descends through three acts and climbs past its own opening height in the
 * fourth. Base state previews the whole shape ghosted; each advance draws
 * exactly one segment, lights its node, and reveals its beat line.
 *
 * The path is built as one ghost (always visible, 15% opacity, full shape)
 * plus four separate segment <path> elements sharing its exact coordinates,
 * individually drawn on advance — visually one path, but this avoids having
 * to sample cumulative length off a single combined path element.
 */
(function () {
  // All coordinates in the SVG's own viewBox units (0 0 1600 460).
  const ENTRY = { x: -32, y: 130 };
  const NODE = {
    1: { x: 224, y: 90 },
    2: { x: 608, y: 230 },
    3: { x: 928, y: 390 },
    4: { x: 1376, y: 40 },
  };
  const EXIT = { x: 1632, y: 10 };
  const VB_BOTTOM = 460;

  const SEG_D = {
    1: `M ${ENTRY.x} ${ENTRY.y} C 30 120, 140 95, ${NODE[1].x} ${NODE[1].y}`,
    2: `M ${NODE[1].x} ${NODE[1].y} C 340 115, 460 175, ${NODE[2].x} ${NODE[2].y}`,
    3: `M ${NODE[2].x} ${NODE[2].y} C 720 270, 820 340, ${NODE[3].x} ${NODE[3].y}`,
    4: `M ${NODE[3].x} ${NODE[3].y} C 1000 300, 1120 70, ${NODE[4].x} ${NODE[4].y} C 1480 25, 1560 12, ${EXIT.x} ${EXIT.y}`,
  };
  const GHOST_D = `M ${ENTRY.x} ${ENTRY.y} ` +
    `C 30 120, 140 95, ${NODE[1].x} ${NODE[1].y} ` +
    `C 340 115, 460 175, ${NODE[2].x} ${NODE[2].y} ` +
    `C 720 270, 820 340, ${NODE[3].x} ${NODE[3].y} ` +
    `C 1000 300, 1120 70, ${NODE[4].x} ${NODE[4].y} ` +
    `C 1480 25, 1560 12, ${EXIT.x} ${EXIT.y}`;

  const SEG_DURATION = { 1: 500, 2: 500, 3: 650, 4: 750 };

  let controllers = [];
  let timers = [];
  let isReduced = false;
  let revealedThrough = 0;
  // Per-step in-flight animations, so hideStep can cancel exactly the
  // animation that's holding a segment/node in its revealed state before
  // resetting styles directly — a WAAPI animation's forwards-fill outranks
  // a plain style write while it's still active, so skipping the cancel
  // would leave the segment looking drawn even after resetting dashoffset.
  const stepAnims = { 1: null, 2: null, 3: null, 4: null };

  function clearAll() {
    controllers.forEach((c) => c.cancel());
    controllers = [];
    timers.forEach((t) => clearTimeout(t));
    timers = [];
    revealedThrough = 0;
    [1, 2, 3, 4].forEach((n) => { stepAnims[n] = null; });
  }

  function render() {
    const connectors = [1, 2, 3, 4]
      .map((n) => `<line class="fa-connector" x1="${NODE[n].x}" y1="${NODE[n].y}" x2="${NODE[n].x}" y2="${VB_BOTTOM}"></line>`)
      .join("");
    const segs = [1, 2, 3, 4]
      .map((n) => `<path class="fa-seg" data-seg="${n}" d="${SEG_D[n]}"></path>`)
      .join("");
    // Labels and beat lines come from DeckData.ACTS, which the four act
    // dividers render from too — one source, so the roadmap and the dividers
    // always say the same thing.
    const columns = window.DeckData.ACTS.map((a, i) => `
          <div class="fa-col">
            <div class="fa-col-rule"></div>
            <p class="fa-col-label">${a.label}</p>
            <p class="fa-col-beat step" data-step="${i + 1}">${a.beat}</p>
          </div>`).join("");
    const nodes = [1, 2, 3, 4]
      .map(
        (n) => `
        <circle class="fa-node-ring" data-node="${n}" cx="${NODE[n].x}" cy="${NODE[n].y}" r="9"></circle>
        <circle class="fa-node" data-node="${n}" cx="${NODE[n].x}" cy="${NODE[n].y}" r="6"></circle>`
      )
      .join("");

    return `
      <section class="screen screen--four-acts">
        <div class="fa-header">
          <p class="kicker">THE ARGUMENT</p>
          <h1 class="display-2">Four moves</h1>
        </div>

        <div class="fa-path-wrap">
          <svg class="fa-path-svg" viewBox="0 0 1600 ${VB_BOTTOM}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <path class="fa-ghost" d="${GHOST_D}"></path>
            ${connectors}
            ${segs}
            ${nodes}
            <circle class="fa-pulse-ring" cx="${NODE[4].x}" cy="${NODE[4].y}" r="6"></circle>
          </svg>
        </div>

        <div class="fa-columns">
          ${columns}
        </div>
      </section>
    `;
  }

  function primeSegments(root) {
    [1, 2, 3, 4].forEach((n) => {
      const seg = root.querySelector(`.fa-seg[data-seg="${n}"]`);
      const len = seg.getTotalLength();
      seg.style.strokeDasharray = String(len);
      seg.style.strokeDashoffset = String(len);
    });
  }

  function lightNode(n, { reduced }) {
    if (reduced) {
      n.dot.style.fill = "#FF5800";
      n.ring.style.opacity = "1";
      return null;
    }
    const dotAnim = n.dot.animate(
      [{ transform: "scale(1)", fill: "#C9C9CE" }, { transform: "scale(1.15)", fill: "#FF5800" }, { transform: "scale(1)", fill: "#FF5800" }],
      { duration: 200, easing: "ease-out", fill: "forwards" }
    );
    const ringAnim = n.ring.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, fill: "forwards" });
    return { cancel: () => { dotAnim.cancel(); ringAnim.cancel(); } };
  }

  function dimNode(n) {
    n.dot.style.fill = "";
    n.dot.style.transform = "";
    n.ring.style.opacity = "0";
  }

  function playPulse(root) {
    const ring = root.querySelector(".fa-pulse-ring");
    const anim = ring.animate(
      [{ opacity: 0.6, transform: "scale(1)" }, { opacity: 0, transform: "scale(3)" }],
      { duration: 1200, easing: "ease-out", fill: "forwards" }
    );
    return { cancel: () => anim.cancel() };
  }

  function cancelPulse(root) {
    root.querySelector(".fa-pulse-ring").style.opacity = "0";
  }

  function revealStep(root, n) {
    const seg = root.querySelector(`.fa-seg[data-seg="${n}"]`);
    const node = { dot: root.querySelector(`.fa-node[data-node="${n}"]`), ring: root.querySelector(`.fa-node-ring[data-node="${n}"]`) };
    const segCtrl = isReduced
      ? window.Anim.drawPath(seg, { reduced: true })
      : window.Anim.drawPath(seg, { duration: SEG_DURATION[n], easing: "ease-out", reduced: false });
    const nodeCtrl = lightNode(node, { reduced: isReduced });
    const pulseCtrl = n === 4 && !isReduced ? playPulse(root) : null;

    controllers.push(segCtrl);
    if (nodeCtrl) controllers.push(nodeCtrl);
    if (pulseCtrl) controllers.push(pulseCtrl);
    stepAnims[n] = { segCtrl, nodeCtrl, pulseCtrl };
  }

  function hideStep(root, n) {
    const anims = stepAnims[n];
    if (anims) {
      anims.segCtrl.cancel();
      if (anims.nodeCtrl) anims.nodeCtrl.cancel();
      if (anims.pulseCtrl) anims.pulseCtrl.cancel();
      stepAnims[n] = null;
    }
    const seg = root.querySelector(`.fa-seg[data-seg="${n}"]`);
    window.Anim.resetPath(seg);
    dimNode({ dot: root.querySelector(`.fa-node[data-node="${n}"]`), ring: root.querySelector(`.fa-node-ring[data-node="${n}"]`) });
    if (n === 4) cancelPulse(root);
  }

  window.page({
    id: "02-four-acts",
    title: "Four moves",
    theme: "light",
    steps: 4,
    render,
    onEnter: (root, ctx) => {
      clearAll();
      isReduced = ctx.isReduced;
      primeSegments(root);
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
