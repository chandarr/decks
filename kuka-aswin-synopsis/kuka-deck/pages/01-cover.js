/**
 * pages/01-cover.js — Screen 01 · Cover (dark, ACT I). tasks/01-cover.md.
 *
 * The base state (step 0) auto-plays on load: the plinth energises, the arm
 * powers up joint by joint, the trajectory draws with a glow head riding the
 * drawing tip, the title fades up as it lands, and the destination pulse takes
 * over and keeps throbbing — none of it consumes a step. Steps 1-3 (subtitle,
 * credential block, key hint) are ordinary advance-driven reveals. `R` replays
 * the whole base sequence; onLeave cancels every timer, rAF and loop so
 * nothing survives navigation.
 *
 * Arm geometry AND the sequence timing are read from arm-geometry.js, not
 * redefined here — screen 16 reuses both so the bookend cannot drift. That now
 * includes the housing and gripper outlines; this screen draws them unscaled,
 * so it emits the nominal weights straight from G.weights.
 *
 * Resting state note: each joint carries its FINAL angle as an SVG transform
 * attribute, so the static, no-JS, or mid-animation-reload state is the
 * completed pose. The power-up animates rest -> final over the top of that.
 * The screen therefore cannot come to rest half-drawn.
 */
(function () {
  const G = window.ArmGeometry;
  const JOINT_ORDER = ["base", "shoulder", "elbow", "wrist"];

  // Drawn unscaled, so the nominal weights apply as-is.
  const STROKE = G.weights.link;
  const EDGE = G.weights.edge;

  let controllers = [];
  let timers = [];
  let isReduced = false;
  let creditRevealed = false;

  function schedule(fn, delay) {
    timers.push(setTimeout(fn, delay));
  }

  function clearAll() {
    controllers.forEach((c) => c.cancel());
    controllers = [];
    timers.forEach((t) => clearTimeout(t));
    timers = [];
  }

  // --- markup --------------------------------------------------------

  function gripper() {
    return G.gripperParts()
      .map((pts) => `<polygon class="arm-gripper" points="${pts}" stroke-width="${EDGE}"></polygon>`)
      .join("");
  }

  function jointGroup(name, childHTML) {
    const a = G.joints[name];
    const len = G.links[name];
    const isTip = name === "wrist";
    return `<g class="joint" data-joint="${name}"
               data-from-angle="${a.rest}" data-to-angle="${a.final}"
               transform="rotate(${a.final})">
      <path class="arm-body" fill="url(#cover-link-body)" stroke-width="${EDGE}" d="${G.linkBodyPath(name)}"></path>
      <circle class="arm-hub" cx="0" cy="0" r="${G.hubRadius(name)}" stroke-width="${EDGE}"></circle>
      <line class="arm-link" x1="0" y1="0" x2="${len}" y2="0" stroke-width="${STROKE}"></line>
      <circle class="joint-dot" cx="0" cy="0" r="7"></circle>
      ${isTip ? `${gripper()}<circle class="joint-dot end-effector-dot" cx="${len}" cy="0" r="8"></circle>` : ""}
      ${childHTML}
    </g>`;
  }

  function armChain() {
    // build inside-out so each joint nests in its parent's translated frame
    return JOINT_ORDER.reduceRight((child, name) => {
      const nested = child ? `<g transform="translate(${G.links[name]},0)">${child}</g>` : "";
      return jointGroup(name, nested);
    }, "");
  }

  function render() {
    const t = G.trajectory;
    const trajectoryD = `M ${t.start.x} ${t.start.y} C ${t.c1.x} ${t.c1.y}, ${t.c2.x} ${t.c2.y}, ${t.end.x} ${t.end.y}`;
    const [vbX, vbY, vbW, vbH] = G.viewBox.split(" ").map(Number);
    const gridTop = G.pivot.y - 300;

    return `
      <section class="screen screen--cover">
        <div class="cover-arm-wrap">
          <svg class="cover-arm-svg" viewBox="${G.viewBox}" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
            <defs>
              <pattern id="cover-dot-pattern" width="46" height="46" patternUnits="userSpaceOnUse">
                <circle cx="23" cy="23" r="1.4"></circle>
              </pattern>
              <radialGradient id="cover-glow-head">
                <stop offset="0%" stop-color="#FF5800" stop-opacity="0.9"></stop>
                <stop offset="40%" stop-color="#FF5800" stop-opacity="0.3"></stop>
                <stop offset="100%" stop-color="#FF5800" stop-opacity="0"></stop>
              </radialGradient>
              <!-- Runs across each link's thickness, not along its length, and
                   in the link's own rotated frame — so every housing stays lit
                   from its own top edge as the chain swings. -->
              <linearGradient id="cover-link-body" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#FF5800" stop-opacity="0.22"></stop>
                <stop offset="45%" stop-color="#FF5800" stop-opacity="0.10"></stop>
                <stop offset="100%" stop-color="#FF5800" stop-opacity="0.04"></stop>
              </linearGradient>
            </defs>

            <rect class="cover-dot-grid" x="${vbX}" y="${gridTop}" width="${G.pivot.x + 260 - vbX}" height="${vbY + vbH - gridTop}"></rect>

            <polygon class="arm-plinth" points="
              ${G.pivot.x - 82},${G.pivot.y + 26}
              ${G.pivot.x + 82},${G.pivot.y + 26}
              ${G.pivot.x + 52},${G.pivot.y}
              ${G.pivot.x - 52},${G.pivot.y}
            "></polygon>

            <g transform="translate(${G.pivot.x},${G.pivot.y})">${armChain()}</g>

            <path class="cover-trajectory" d="${trajectoryD}"></path>
            <circle class="traj-glow-head" cx="${t.start.x}" cy="${t.start.y}" r="40" fill="url(#cover-glow-head)"></circle>
            <circle class="cover-pulse-ring" cx="${t.end.x}" cy="${t.end.y}" r="7"></circle>
            <circle class="cover-pulse" cx="${t.end.x}" cy="${t.end.y}" r="7"></circle>
          </svg>
        </div>

        <div class="cover-title-block">
          <h1 class="display-1 cover-title reveal">Where KUKA wins the next decade</h1>
          <p class="subtitle step" data-step="1">A global read on the physical-AI inflection — and why India can not just be  market to grow, but the engine of global transformation.</p>

          <div class="cover-credential">
            <svg class="cred-rule reveal" width="72" height="2" viewBox="0 0 72 2" aria-hidden="true">
              <line x1="0" y1="1" x2="72" y2="1"></line>
            </svg>
            <div class="cover-credential-text reveal">
              <p class="cover-name">Dr. Ir. Aswin Chandarr</p>
              <p class="cover-credential-line">MBA · Author</p>
              <p class="cover-credential-line">16+ years across the full robotics arc — concept, development, manufacturing, certification, deployment, support, and frontier R&amp;D.</p>
            </div>
          </div>
        </div>

        <div class="key-hint cover-key-hint step" data-step="3">
          <kbd>&larr;</kbd> <kbd>&rarr;</kbd> navigate &middot; <kbd>O</kbd> overview
        </div>
      </section>
    `;
  }

  // --- glow head riding the drawing tip -------------------------------

  // Reads the live stroke-dashoffset each frame rather than re-deriving
  // progress from its own clock, so the head cannot drift off the tip no
  // matter what easing drawPath uses.
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

      // bloom in over the first 12%, dissipate over the last 25%
      const t = Math.min(1, elapsed / duration);
      let opacity = 1;
      if (t < 0.12) opacity = t / 0.12;
      else if (t > 0.75) opacity = Math.max(0, (1 - t) / 0.25);
      head.style.opacity = String(opacity);

      if (elapsed < duration) raf = requestAnimationFrame(tick);
      else head.style.opacity = "0";
    };

    raf = requestAnimationFrame(tick);
    return {
      cancel: () => {
        cancelAnimationFrame(raf);
        head.style.opacity = "0";
      },
    };
  }

  // --- destination pulse ----------------------------------------------

  // Where the trajectory is heading. Two parts on one cadence: the dot itself
  // throbs, and a ring ripples out of it. Deliberately infinite — once the
  // sequence lands this is the only thing still moving on the cover, so the
  // destination stays live under the title for as long as the screen is up. It
  // belongs to the base sequence, not to a step, so it is running before the
  // presenter advances at all. clearAll() on leave and on `R` stops both.
  const PULSE_MS = 1900;

  function startPulse(root) {
    const dot = root.querySelector(".cover-pulse");
    const ring = root.querySelector(".cover-pulse-ring");
    dot.style.opacity = "";

    if (isReduced) {
      // Present but not moving — the destination still reads without motion.
      dot.style.opacity = "1";
      return;
    }

    const dotAnim = dot.animate(
      [
        { opacity: 0.85, transform: "scale(1)" },
        { opacity: 1, transform: "scale(1.28)" },
        { opacity: 0.85, transform: "scale(1)" },
      ],
      { duration: PULSE_MS, easing: "ease-in-out", iterations: Infinity, fill: "both" }
    );

    const ringAnim = ring.animate(
      [
        { opacity: 0.55, transform: "scale(1)" },
        { opacity: 0, transform: "scale(3.4)" },
      ],
      { duration: PULSE_MS, easing: "ease-out", iterations: Infinity }
    );

    controllers.push({
      cancel: () => {
        dotAnim.cancel();
        ringAnim.cancel();
        dot.style.opacity = "";
      },
    });
  }

  // --- base auto-play (step 0 — does not consume a step) --------------

  function playBase(root) {
    const joints = root.querySelectorAll(".joint");
    const title = root.querySelector(".cover-title");
    const path = root.querySelector(".cover-trajectory");
    const plinth = root.querySelector(".arm-plinth");
    const head = root.querySelector(".traj-glow-head");
    const S = G.sequence;

    head.style.opacity = "0";

    if (isReduced) {
      // composed and complete, immediately: final pose, full trajectory,
      // no glow head, and a destination dot that is present but still.
      plinth.style.opacity = "";
      controllers.push(window.Anim.jointStagger(joints, { reduced: true }));
      controllers.push(window.Anim.drawPath(path, { reduced: true }));
      controllers.push(window.Anim.fadeUp(title, { reduced: true }));
      startPulse(root);
      return;
    }

    // Hide the trajectory up front. The path has no dash attributes until
    // drawPath runs, so without this it renders complete from load and then
    // pops back to zero when the draw finally starts.
    const trajLength = path.getTotalLength();
    path.style.strokeDasharray = String(trajLength);
    path.style.strokeDashoffset = String(trajLength);

    const plinthAnim = plinth.animate(
      [
        { opacity: 0, transform: "translateY(10px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: S.plinthDuration, easing: "ease-out", fill: "both" }
    );
    controllers.push({ cancel: () => plinthAnim.cancel() });

    controllers.push(
      window.Anim.jointStagger(joints, {
        duration: S.jointDuration,
        stagger: S.jointStagger,
        delay: S.jointsStartAt,
        reduced: false,
      })
    );

    schedule(() => {
      controllers.push(
        window.Anim.drawPath(path, { duration: S.drawDuration, easing: "ease-out", reduced: false })
      );
      controllers.push(runGlowHead(path, head, S.drawDuration));
    }, S.drawStartAt);

    schedule(() => {
      controllers.push(window.Anim.fadeUp(title, { reduced: false }));
    }, S.titleAt);

    // S.total is the beat the stroke lands on — the pulse picks up from there.
    schedule(() => startPulse(root), S.total);
  }

  // --- step 2: credential block (rule draws, then text fades together) --

  function revealCredential(root) {
    if (creditRevealed) return;
    creditRevealed = true;

    const rule = root.querySelector(".cred-rule");
    const line = root.querySelector(".cred-rule line");
    const text = root.querySelector(".cover-credential-text");

    if (isReduced) {
      window.Anim.fadeUp(rule, { reduced: true });
      window.Anim.drawPath(line, { reduced: true });
      window.Anim.fadeUp(text, { reduced: true });
      return;
    }

    controllers.push(window.Anim.fadeUp(rule, { reduced: false }));
    controllers.push(window.Anim.drawPath(line, { duration: 300, easing: "ease-out", reduced: false }));
    schedule(() => {
      controllers.push(window.Anim.fadeUp(text, { reduced: false }));
    }, 300);
  }

  function hideCredential(root) {
    creditRevealed = false;
    const rule = root.querySelector(".cred-rule");
    const text = root.querySelector(".cover-credential-text");
    if (rule) rule.classList.remove("is-visible");
    if (text) text.classList.remove("is-visible");
  }

  window.page({
    id: "01-cover",
    title: "Where KUKA wins the next decade",
    theme: "dark",
    steps: 3,
    render,
    onEnter: (root, ctx) => {
      clearAll();
      isReduced = ctx.isReduced;
      creditRevealed = false;
      playBase(root);
    },
    onStep: (root, step) => {
      if (step >= 2) revealCredential(root);
      else hideCredential(root);
    },
    onLeave: () => {
      clearAll();
      creditRevealed = false;
    },
  });
})();
