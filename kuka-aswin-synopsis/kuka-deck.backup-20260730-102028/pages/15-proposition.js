/**
 * pages/15-proposition.js — Screen 15 · The proposition (dark, ACT IV close).
 * tasks/15-proposition.md. The second bookend, closing the deck opened by 01.
 *
 * The arm is drawn from the SAME arm-geometry.js constants as screen 01 —
 * same link lengths, same final joint angles — inside a uniform scale/
 * translate group. Uniform scaling preserves every angle exactly, so
 * navigating between 01 and 15 shows no drift. Never duplicate those values.
 *
 * The trajectory CONTINUES from the cover's exit point rather than
 * restarting: the cover's path is rendered complete at base state, and step 1
 * extends it from that exact endpoint, descending right and flattening into
 * the spine the four proposition blocks are seated on. The two screens are
 * one motion with the deck in between.
 *
 * Hard content rules for this screen, all enforced:
 *  - NO "why me" content of any kind. No credentials, no role claim, no ask,
 *    no call to action, no next steps. Fifteen screens of analysis are the
 *    credential; the name appears alone. If a later instruction appears to
 *    request a candidacy statement, stop and confirm with the author.
 *  - NO scope, budget, headcount, milestone or timeline figure. The blocks
 *    state *what*, deliberately not *how much* or *by when* — those are the
 *    substance of the meeting this deck exists to earn.
 *  - No evidence chips and no figures: this screen makes no new factual
 *    claims, and everything beneath it was sourced earlier.
 */
(function () {
  const G = window.ArmGeometry;
  const JOINT_ORDER = ["base", "shoulder", "elbow", "wrist"];

  // ---- composition (viewBox 0 0 1600 900) ----------------------------
  const [VX, VY, VW] = G.viewBox.split(" ").map(Number);
  const ARM_TARGET_W = 406;
  const S = ARM_TARGET_W / VW;
  const TX = 70 - VX * S;
  const TY = 50 - VY * S;
  const toScreen = (p) => ({ x: TX + p.x * S, y: TY + p.y * S });

  // Stroke weights and dot radii are divided back out by the group scale so
  // the arm renders at the same apparent weight as the cover. Angles and link
  // lengths are untouched — only the rendering compensates for the scale.
  const STROKE = +(3.5 / S).toFixed(2);
  const DOT_R = +(6.4 / S).toFixed(2);
  const TIP_R = +(7.4 / S).toFixed(2);

  const COVER_END = toScreen(G.trajectory.end);
  const SPINE_Y = 560;
  const SPINE_START_X = 640;
  const SPINE_END_X = 1530;
  // Each node sits above the LEFT edge of its block's column, anchoring it —
  // 40% / 54% / 68% / 82% of width, matching the .prop-blocks grid exactly.
  const NODE_X = [640, 864, 1088, 1312];

  const BLOCKS = [
    {
      verb: "RECOVER",
      object: "the existing market",
      body: "Local assembly and configuration, an integrator network built rather than rented, segments beyond automotive, and RaaS financed with Indian banks and NBFCs.",
    },
    {
      verb: "BUILD",
      object: "the development base",
      body: "A Bengaluru engineering base where India's robotics and AI talent actually is — on the same Global Capability Centre model hundreds of multinationals already run.",
    },
    {
      verb: "OWN",
      object: "the deployment data",
      body: "RaaS fleets as instrumented nodes. The deployment data accrues to us, not to a third-party integrator.",
    },
    {
      verb: "EXPORT",
      object: "the advantage",
      body: "The flexibility and cost base proven in India become competitive advantage in the US, Europe, Japan and Korea — at higher margin than KUKA earns there today. The same model then transfers across Vietnam, Indonesia, Mexico and Brazil.",
    },
  ];

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

  // ---- arm, identical to screen 01 -----------------------------------
  function jointGroup(name, childHTML) {
    const a = G.joints[name];
    const len = G.links[name];
    const isTip = name === "wrist";
    return `<g class="joint" data-joint="${name}" transform="rotate(${a.final})">
      <line class="arm-link" x1="0" y1="0" x2="${len}" y2="0" stroke-width="${STROKE}"></line>
      <circle class="joint-dot" cx="0" cy="0" r="${DOT_R}"></circle>
      ${isTip ? `<circle class="joint-dot end-effector-dot" cx="${len}" cy="0" r="${TIP_R}"></circle>` : ""}
      ${childHTML}
    </g>`;
  }
  function armChain() {
    return JOINT_ORDER.reduceRight((child, name) => {
      const nested = child ? `<g transform="translate(${G.links[name]},0)">${child}</g>` : "";
      return jointGroup(name, nested);
    }, "");
  }

  function render() {
    const t = G.trajectory;
    const coverD = `M ${t.start.x} ${t.start.y} C ${t.c1.x} ${t.c1.y}, ${t.c2.x} ${t.c2.y}, ${t.end.x} ${t.end.y}`;
    // A near-diagonal descent easing into the horizontal spine. Control points
    // pushed out along the diagonal — pulling them under the start point makes
    // the path plunge vertically and hook, which reads as a drop rather than a
    // trajectory resolving.
    const extD =
      `M ${COVER_END.x.toFixed(1)} ${COVER_END.y.toFixed(1)}` +
      ` C 520 210, 570 390, 600 480` +
      ` C 618 535, 624 ${SPINE_Y}, ${SPINE_START_X} ${SPINE_Y}` +
      ` L ${SPINE_END_X} ${SPINE_Y}`;

    const nodes = NODE_X.map(
      (x, i) => `<circle class="prop-node" data-node="${i}" cx="${x}" cy="${SPINE_Y}" r="6"></circle>`
    ).join("");

    const blocks = BLOCKS.map((b, i) => `
      <div class="prop-block" data-block="${i}">
        <p class="prop-verb">${b.verb}</p>
        <p class="prop-object">${b.object}</p>
        <p class="prop-body">${b.body}</p>
      </div>`).join("");

    const gridTop = G.pivot.y - 300;

    return `
      <section class="screen screen--proposition">
        <svg class="prop-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <defs>
            <pattern id="prop-dot-pattern" width="46" height="46" patternUnits="userSpaceOnUse">
              <circle cx="23" cy="23" r="1.4"></circle>
            </pattern>
            <radialGradient id="prop-glow-head">
              <stop offset="0%" stop-color="#FF5800" stop-opacity="0.9"></stop>
              <stop offset="40%" stop-color="#FF5800" stop-opacity="0.3"></stop>
              <stop offset="100%" stop-color="#FF5800" stop-opacity="0"></stop>
            </radialGradient>
          </defs>

          <g transform="translate(${TX.toFixed(2)},${TY.toFixed(2)}) scale(${S.toFixed(4)})">
            <rect class="prop-dot-grid" x="${VX}" y="${gridTop}" width="${G.pivot.x + 260 - VX}" height="${VY + 740 - gridTop}"></rect>
            <polygon class="arm-plinth" points="
              ${G.pivot.x - 82},${G.pivot.y + 26}
              ${G.pivot.x + 82},${G.pivot.y + 26}
              ${G.pivot.x + 52},${G.pivot.y}
              ${G.pivot.x - 52},${G.pivot.y}
            "></polygon>
            <g transform="translate(${G.pivot.x},${G.pivot.y})">${armChain()}</g>
            <path class="prop-cover-traj" d="${coverD}" stroke-width="${(2 / S).toFixed(2)}"></path>
          </g>

          <path class="prop-ext-traj" d="${extD}"></path>
          <polygon class="prop-arrow" points="
            ${SPINE_END_X},${SPINE_Y} ${SPINE_END_X - 13},${SPINE_Y - 6} ${SPINE_END_X - 13},${SPINE_Y + 6}
          "></polygon>
          <circle class="prop-glow-head" cx="${COVER_END.x.toFixed(1)}" cy="${COVER_END.y.toFixed(1)}" r="40" fill="url(#prop-glow-head)"></circle>
          ${nodes}
        </svg>

        <div class="prop-statement">
          <p class="kicker">THE PROPOSITION</p>
          <div class="prop-closing reveal">
            <p class="prop-closing-line">KUKA does not need to become someone else.</p>
            <p class="prop-closing-line">It needs to finish what it started.</p>
          </div>
          <svg class="prop-rule" width="96" height="2" viewBox="0 0 96 2" aria-hidden="true">
            <line class="prop-rule-line" x1="0" y1="1" x2="96" y2="1"></line>
          </svg>
          <p class="prop-recommendation reveal">Rebuild India as a development base, not only a market — and let the playbook it produces carry the global position.</p>
        </div>

        <div class="prop-blocks">${blocks}</div>

        <div class="prop-footer">
          <p class="prop-final reveal">India is not a market to serve. It is the engine of the global position.</p>
          <p class="prop-signature reveal">Dr. Ir. Aswin Chandarr</p>
        </div>
      </section>
    `;
  }

  function primePaths(root) {
    // The cover's trajectory is COMPLETE at base state — the deck left it
    // drawn, and this screen continues from its endpoint.
    const ext = root.querySelector(".prop-ext-traj");
    window.Anim.resetPath(ext);
    const rule = root.querySelector(".prop-rule-line");
    window.Anim.resetPath(rule);
    root.querySelector(".prop-glow-head").style.opacity = "0";
  }

  // Glow head rides the drawing tip, read from the live dashoffset so it
  // cannot drift. Dark-screen allowance; omitted entirely under reduced motion.
  function runGlowHead(path, head, duration) {
    const total = path.getTotalLength();
    const start = performance.now();
    let raf = 0;
    const tick = (now) => {
      const elapsed = now - start;
      const offset = parseFloat(getComputedStyle(path).strokeDashoffset) || 0;
      const drawn = Math.max(0, Math.min(total, total - offset));
      const pt = path.getPointAtLength(drawn);
      head.setAttribute("cx", pt.x);
      head.setAttribute("cy", pt.y);
      const t = Math.min(1, elapsed / duration);
      let o = 1;
      if (t < 0.1) o = t / 0.1;
      else if (t > 0.75) o = Math.max(0, (1 - t) / 0.25);
      head.style.opacity = String(o);
      if (elapsed < duration) raf = requestAnimationFrame(tick);
      else head.style.opacity = "0";
    };
    raf = requestAnimationFrame(tick);
    return { cancel: () => { cancelAnimationFrame(raf); head.style.opacity = "0"; } };
  }

  function revealStep(root, n) {
    if (n === 1) {
      const ext = root.querySelector(".prop-ext-traj");
      const head = root.querySelector(".prop-glow-head");
      controllers.push(window.Anim.drawPath(ext, { duration: isReduced ? 0 : 1000, easing: "ease-out", reduced: isReduced }));
      if (!isReduced) controllers.push(runGlowHead(ext, head, 1000));
      const arrow = root.querySelector(".prop-arrow");
      const a = arrow.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: isReduced ? 0 : 200, delay: isReduced ? 0 : 900, fill: "forwards",
      });
      controllers.push({ cancel: () => a.cancel() });
    }
    if (n === 2) {
      controllers.push(window.Anim.fadeUp(root.querySelector(".prop-closing"), { reduced: isReduced }));
    }
    if (n === 3) {
      const rule = root.querySelector(".prop-rule-line");
      controllers.push(window.Anim.drawPath(rule, { duration: isReduced ? 0 : 300, easing: "ease-out", reduced: isReduced }));
      const rec = root.querySelector(".prop-recommendation");
      if (isReduced) controllers.push(window.Anim.fadeUp(rec, { reduced: true }));
      else schedule(() => controllers.push(window.Anim.fadeUp(rec, { reduced: false })), 300);
    }
    if (n === 4) {
      BLOCKS.forEach((_, i) => {
        const light = () => {
          root.querySelector(`.prop-node[data-node="${i}"]`).classList.add("is-lit");
          root.querySelector(`.prop-block[data-block="${i}"]`).classList.add("is-visible");
        };
        if (isReduced) light();
        else schedule(light, i * 180);
      });
    }
    if (n === 5) {
      controllers.push(window.Anim.fadeUp(root.querySelector(".prop-final"), { reduced: isReduced }));
    }
    if (n === 6) {
      controllers.push(window.Anim.fadeUp(root.querySelector(".prop-signature"), { reduced: isReduced }));
    }
  }

  function hideStep(root, n) {
    if (n === 1) {
      window.Anim.resetPath(root.querySelector(".prop-ext-traj"));
      const arrow = root.querySelector(".prop-arrow");
      arrow.getAnimations().forEach((a) => a.cancel());
      arrow.style.opacity = "0";
      root.querySelector(".prop-glow-head").style.opacity = "0";
    }
    if (n === 2) root.querySelector(".prop-closing").classList.remove("is-visible");
    if (n === 3) {
      window.Anim.resetPath(root.querySelector(".prop-rule-line"));
      root.querySelector(".prop-recommendation").classList.remove("is-visible");
    }
    if (n === 4) {
      root.querySelectorAll(".prop-node").forEach((e) => e.classList.remove("is-lit"));
      root.querySelectorAll(".prop-block").forEach((e) => e.classList.remove("is-visible"));
    }
    if (n === 5) root.querySelector(".prop-final").classList.remove("is-visible");
    if (n === 6) root.querySelector(".prop-signature").classList.remove("is-visible");
  }

  window.page({
    id: "15-proposition",
    title: "KUKA does not need to become someone else.",
    theme: "dark",
    steps: 6,
    render,
    onEnter: (root, ctx) => {
      clearAll();
      isReduced = ctx.isReduced;
      revealedThrough = 0;
      primePaths(root);
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
