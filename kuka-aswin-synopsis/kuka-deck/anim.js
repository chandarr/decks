/**
 * anim.js — the shared animation vocabulary (GLOBAL-INSTRUCTIONS.md §5).
 * Seven named motions. Nothing else. Every screen reuses these rather than
 * inventing new motions.
 *
 * Every function takes a `reduced` flag and, when true, jumps straight to the
 * end state with no animation and returns a no-op cancel — this is what
 * satisfies "reduced motion reveals all steps immediately, draws trajectories
 * static, runs no loops".
 *
 * Every function returns { cancel() } (and sometimes `finished`). Pages must
 * collect these controllers and call .cancel() on every one of them inside
 * onLeave. No exceptions.
 */
(function () {
  const NOOP = { cancel() {} };

  // fadeUp — opacity + 12px translateY, 380ms. The default `.step` reveal.
  // The reveal itself is a CSS transition on `.step` / `.step.is-visible`
  // (styles.css) driven by the engine's step toggling; this helper is for the
  // rare case a page needs to fade a single element in outside the step
  // system (e.g. a dynamically-inserted node).
  function fadeUp(el, { reduced = false } = {}) {
    if (!el) return NOOP;
    if (reduced) {
      el.classList.add("is-visible");
      return NOOP;
    }
    el.classList.add("is-visible");
    return { cancel: () => el.classList.remove("is-visible") };
  }

  // scaleIn — 0.97 → 1 with shadow lift. Cards, panels.
  function scaleIn(el, { reduced = false } = {}) {
    if (!el) return NOOP;
    el.classList.add("scale-in");
    if (reduced) {
      el.classList.add("is-visible");
      return NOOP;
    }
    el.classList.add("is-visible");
    return { cancel: () => el.classList.remove("is-visible") };
  }

  // drawPath — SVG stroke-dashoffset draw-on. Cover/close trajectories, map
  // axes, flywheel ring.
  //
  // `dashAfter` restores a dash PATTERN once the draw finishes. The reveal
  // works by commandeering stroke-dasharray (one dash the length of the whole
  // path), which silently destroys any dashed styling the element had — so an
  // element that must stay dashed to carry the deck's frontier-vs-established
  // grammar renders solid after being drawn unless its pattern is put back.
  // Pass the CSS value, e.g. dashAfter: "7 5".
  function drawPath(pathEl, { duration = 900, easing = "ease", reduced = false, dashAfter = null } = {}) {
    if (!pathEl || typeof pathEl.getTotalLength !== "function") return NOOP;
    const length = pathEl.getTotalLength();
    pathEl.style.strokeDasharray = String(length);
    if (reduced) {
      pathEl.style.strokeDashoffset = "0";
      if (dashAfter) pathEl.style.strokeDasharray = dashAfter;
      return NOOP;
    }
    pathEl.style.strokeDashoffset = String(length);
    const animation = pathEl.animate(
      [{ strokeDashoffset: length }, { strokeDashoffset: 0 }],
      { duration, easing, fill: "forwards" }
    );
    if (dashAfter) {
      animation.finished
        .then(() => {
          pathEl.style.strokeDasharray = dashAfter;
          pathEl.style.strokeDashoffset = "0";
        })
        .catch(() => {}); // cancelled mid-draw — leave it primed for a redraw
    }
    return { cancel: () => animation.cancel(), finished: animation.finished };
  }

  // resetPath — cancel any persisted draw effect on an element and re-prime it
  // hidden, ready to be drawn again. Use this for every reverse step that
  // un-draws a path.
  //
  // A drawPath animation runs with fill:"forwards", and a persisted animation
  // effect outranks a plain inline style write — so a reverse step that only
  // resets strokeDashoffset leaves the path fully visible. Cancelling the
  // element's animations first is what makes the write take effect. This also
  // clears any dashAfter pattern, restoring the single full-length dash the
  // reveal mechanism needs.
  function resetPath(pathEl) {
    if (!pathEl || typeof pathEl.getTotalLength !== "function") return;
    pathEl.getAnimations().forEach((a) => a.cancel());
    const length = pathEl.getTotalLength();
    pathEl.style.strokeDasharray = String(length);
    pathEl.style.strokeDashoffset = String(length);
  }

  // countUp — tabular number roll-up. Signals, paradox, comparison figures.
  function countUp(el, { from = 0, to, duration = 900, format, reduced = false } = {}) {
    if (!el || typeof to !== "number") return NOOP;
    const fmt = format || ((n) => Math.round(n).toLocaleString("en-US"));
    if (reduced) {
      el.textContent = fmt(to);
      return NOOP;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      el.textContent = fmt(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return { cancel: () => cancelAnimationFrame(raf) };
  }

  // jointStagger — per-joint power-up with servo easing (slight overshoot,
  // settle), ~180ms apart. Cover/close arm only (screens 01 and 16).
  //
  // Each `joint` is the element that physically rotates (an SVG <g>, or any
  // element — WAAPI transforms work on both) — it reads its own rest/final
  // angle from data-from-angle / data-to-angle (degrees). If the joint
  // contains a `.joint-dot` child, that child brightens (opacity) as the
  // joint "arrives"; otherwise the joint element itself brightens.
  //
  // The easing is a single, restrained overshoot — enough to read as a servo
  // snapping into position, not a spring. Do not increase the overshoot
  // control point to chase a bouncier feel; that reads elastic/floaty, which
  // the brief explicitly rules out.
  // `delay` offsets the whole sequence. Prefer it over wrapping the call in a
  // setTimeout: with `fill: "both"` the rest pose is held from time zero
  // through the delay, so the arm sits folded until it powers up instead of
  // showing its final pose and snapping back.
  function jointStagger(joints, { duration = 360, stagger = 180, delay = 0, reduced = false } = {}) {
    const list = Array.from(joints || []);
    if (!list.length) return NOOP;
    const easing = "cubic-bezier(0.3, 1.3, 0.6, 1)";
    if (reduced) {
      list.forEach((j) => {
        const to = j.dataset.toAngle || "0";
        j.style.transform = `rotate(${to}deg)`;
        const dot = j.querySelector(".joint-dot") || j;
        dot.style.opacity = "1";
      });
      return NOOP;
    }
    const animations = [];
    list.forEach((j, i) => {
      const from = j.dataset.fromAngle || "0";
      const to = j.dataset.toAngle || "0";
      const jointDelay = delay + i * stagger;
      animations.push(
        j.animate(
          [{ transform: `rotate(${from}deg)` }, { transform: `rotate(${to}deg)` }],
          { duration, delay: jointDelay, easing, fill: "both" }
        )
      );
      const dot = j.querySelector(".joint-dot") || j;
      animations.push(
        dot.animate([{ opacity: 0.3 }, { opacity: 1 }], {
          duration: Math.round(duration * 0.7),
          delay: jointDelay,
          easing: "ease-out",
          fill: "both",
        })
      );
    });
    return { cancel: () => animations.forEach((a) => a.cancel()) };
  }

  // converge — elements travelling toward a centre. Flywheel assembly.
  // Each element reads its own starting offset from data-from-x / data-from-y.
  function converge(elements, { duration = 700, easing = "cubic-bezier(.2,.8,.2,1)", reduced = false } = {}) {
    const list = Array.from(elements || []);
    if (!list.length) return NOOP;
    if (reduced) {
      list.forEach((el) => {
        el.style.transform = "translate(0,0)";
        el.style.opacity = "1";
      });
      return NOOP;
    }
    const animations = list.map((el) => {
      const dx = el.dataset.fromX || 0;
      const dy = el.dataset.fromY || 0;
      return el.animate(
        [
          { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 },
          { transform: "translate(0,0)", opacity: 1 },
        ],
        { duration, easing, fill: "forwards" }
      );
    });
    return { cancel: () => animations.forEach((a) => a.cancel()) };
  }

  // crossFade — swap content in a shared slot. Competitive map states.
  function crossFade(outEl, inEl, { duration = 300, reduced = false } = {}) {
    if (!outEl || !inEl) return NOOP;
    if (reduced) {
      outEl.style.display = "none";
      inEl.style.display = "";
      inEl.style.opacity = "1";
      return NOOP;
    }
    const outAnim = outEl.animate([{ opacity: 1 }, { opacity: 0 }], { duration, fill: "forwards" });
    const inAnim = inEl.animate([{ opacity: 0 }, { opacity: 1 }], { duration, fill: "forwards" });
    outAnim.onfinish = () => {
      outEl.style.display = "none";
    };
    return {
      cancel: () => {
        outAnim.cancel();
        inAnim.cancel();
      },
    };
  }

  // resetPath is a reverse-step utility, not one of the seven named motions.
  window.Anim = { fadeUp, scaleIn, drawPath, countUp, jointStagger, converge, crossFade, resetPath };
})();
