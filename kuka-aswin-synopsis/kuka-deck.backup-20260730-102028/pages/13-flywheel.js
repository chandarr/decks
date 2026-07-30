/**
 * pages/13-flywheel.js — Screen 13 · The flywheel (light, ACT IV).
 * tasks/13-flywheel.md. The centerpiece of the deck.
 *
 * The only circular composition in the deck: five nodes on a circle joined
 * by clockwise arcs. Node 3 (PROPRIETARY DEPLOYMENT DATA) closes screen 05's
 * hollow ring and answers screen 11's row 3, and carries a marginally
 * heavier border once filled as a quiet callback.
 *
 * Two things the task file flags as the likeliest defects, both handled:
 *  - the centre rotation indicator runs exactly TWO revolutions then stops.
 *    A permanently spinning element reads as decoration and undercuts the
 *    screen. It is a WAAPI animation with iterations:2, tracked in
 *    `controllers` so onLeave cancels it even mid-spin.
 *  - no precise cost-arbitrage multiple appears anywhere — "a fraction of"
 *    is defensible, "one-fifth" invites an argument about which fifth.
 *
 * Arrow arcs use per-arrow angular gaps computed to clear both the source
 * and destination node boxes (the two bottom nodes sit at equal height and
 * need a wider gap than the rest).
 */
(function () {
  const NODES = window.DeckData.FLYWHEEL;
  const REPLICATION = window.DeckData.REPLICATION;

  // ---- flywheel geometry (viewBox 60 60 720 600) ---------------------
  const CX = 420, CY = 380, R = 250;
  const BW = 210, BH = 98;
  const ANGLES = [-90, -18, 54, 126, 198]; // clockwise from top
  const GAPS = [27, 20, 28, 20, 27];        // per-arrow, verified to clear boxes

  const rad = (d) => (d * Math.PI) / 180;
  const onCircle = (deg, r = R) => ({ x: CX + r * Math.cos(rad(deg)), y: CY + r * Math.sin(rad(deg)) });

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

  function wrap(text, maxChars) {
    const words = text.split(" ");
    const lines = [];
    let line = "";
    words.forEach((w) => {
      const cand = line ? line + " " + w : w;
      if (cand.length > maxChars && line) { lines.push(line); line = w; }
      else line = cand;
    });
    if (line) lines.push(line);
    return lines;
  }

  function arcPath(i) {
    const a0 = ANGLES[i] + GAPS[i];
    const a1 = ANGLES[(i + 1) % 5] - GAPS[i];
    const s = onCircle(a0);
    const e = onCircle(a1);
    // always the short way round, clockwise (sweep-flag 1)
    return { d: `M ${s.x.toFixed(1)} ${s.y.toFixed(1)} A ${R} ${R} 0 0 1 ${e.x.toFixed(1)} ${e.y.toFixed(1)}`, end: e, endAngle: a1 };
  }

  function arrowHead(end, endAngle) {
    // tangent to the circle at the end point, pointing clockwise
    const t = rad(endAngle + 90);
    const len = 10;
    const a1 = t + Math.PI * 0.84;
    const a2 = t - Math.PI * 0.84;
    const p1 = { x: end.x + len * Math.cos(a1), y: end.y + len * Math.sin(a1) };
    const p2 = { x: end.x + len * Math.cos(a2), y: end.y + len * Math.sin(a2) };
    return `${end.x.toFixed(1)},${end.y.toFixed(1)} ${p1.x.toFixed(1)},${p1.y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }

  function render() {
    const nodeMarkup = NODES.map((n, i) => {
      const c = onCircle(ANGLES[i]);
      const x = c.x - BW / 2, y = c.y - BH / 2;
      const labelLines = wrap(n.label, 26);
      const subLines = wrap(n.sub, 36);
      let ty = y + 22;
      const label = labelLines
        .map((l, k) => `<text class="fw-node-label" x="${x + 14}" y="${ty + k * 14}">${l}</text>`).join("");
      ty += labelLines.length * 14 + 6;
      const sub = subLines
        .map((l, k) => `<text class="fw-node-sub" x="${x + 14}" y="${ty + k * 13}">${l}</text>`).join("");
      return `
        <g class="fw-node" data-node="${n.id}" data-idx="${i + 1}">
          <rect class="fw-node-box ${n.id === "data" ? "is-key" : ""}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${BW}" height="${BH}" rx="8"></rect>
          <rect class="fw-node-edge" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="3" height="${BH}"></rect>
          ${label}${sub}
        </g>`;
    }).join("");

    const arrowMarkup = NODES.map((_, i) => {
      const a = arcPath(i);
      return `
        <g class="fw-arrow" data-arrow="${i + 1}">
          <path class="fw-arrow-path" d="${a.d}"></path>
          <polygon class="fw-arrow-head" points="${arrowHead(a.end, a.endAngle)}"></polygon>
        </g>`;
    }).join("");

    const geos = REPLICATION.geographies
      .map((g, i) => `<span class="fw-geo" data-geo="${i}">${g}</span>`)
      .join('<span class="fw-geo-sep">·</span>');

    return `
      <section class="screen screen--flywheel">
        <div class="fw-header">
          <p class="kicker">THE ENGINE</p>
          <h1 class="display-2">India is not the market. India is the engine.</h1>
        </div>

        <div class="fw-body">
          <div class="fw-left">
            <div class="fw-wheel-wrap">
              <svg class="fw-wheel-svg" viewBox="60 60 720 600" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                ${arrowMarkup}
                ${nodeMarkup}
                <g class="fw-rotor" transform="translate(${CX},${CY})">
                  <path class="fw-rotor-arc" d="M -26 0 A 26 26 0 1 1 8 24.7"></path>
                  <polygon class="fw-rotor-head" points="8,24.7 1,14 14,15"></polygon>
                </g>
              </svg>
            </div>
            <p class="chip chip--frontier fw-diagram-chip">frontier — mechanism, not a fact pattern</p>

            <div class="fw-replication">
              <p class="fw-geos"><span class="fw-geo-marker">&#9656;</span> ${geos}</p>
              <p class="fw-replication-line">The same manufacturing profile — low volume, high mix, cost-sensitive, growing. The playbook transfers, and the models arrive warm rather than cold.</p>
            </div>
          </div>

          <div class="fw-right">
            <div class="fw-block">
              <p class="fw-block-heading">WHY THIS COMPOUNDS</p>
              <div class="fw-block-rule"></div>
              <p class="fw-compound-line reveal" data-line="1">Data is the only input in physical AI that cannot be bought at any price. It is earned by deploying.</p>
              <p class="fw-compound-line reveal" data-line="2">RaaS is the mechanism. We own the fleet, so every cell is an instrumented node — and we are paid for uptime, so our incentive and the customer's are the same one.</p>
            </div>

            <div class="fw-raas-inset reveal">
              <p>RaaS means owning the reliability risk. That risk kills a challenger deploying unproven hardware. For an incumbent with decades of industrial MTBF, it is the moat.</p>
            </div>
          </div>
        </div>

        <div class="fw-asymmetry">
          <div class="fw-asym-row reveal" data-asym="downside">
            <span class="fw-asym-label">DOWNSIDE</span>
            <p class="fw-asym-text">A competitive India business and a low-cost engineering base — justified on cost arbitrage alone, whatever physical AI does.</p>
          </div>
          <div class="fw-asym-row reveal" data-asym="upside">
            <span class="fw-asym-label">UPSIDE</span>
            <p class="fw-asym-text fw-asym-text--upside">The global position.</p>
          </div>
        </div>
      </section>
    `;
  }

  function primeArrows(root) {
    root.querySelectorAll(".fw-arrow-path").forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = String(len);
      p.style.strokeDashoffset = String(len);
    });
    const rotorArc = root.querySelector(".fw-rotor-arc");
    const rl = rotorArc.getTotalLength();
    rotorArc.style.strokeDasharray = String(rl);
    rotorArc.style.strokeDashoffset = String(rl);
  }

  function fillNode(root, idx) {
    const node = root.querySelectorAll(".fw-node")[idx - 1];
    node.classList.add("is-filled");
    if (isReduced) return;
    const anim = node.animate(
      [{ transform: "scale(0.97)" }, { transform: "scale(1)" }],
      { duration: 300, easing: "cubic-bezier(.2,.8,.2,1)", fill: "both" }
    );
    controllers.push({ cancel: () => anim.cancel() });
  }

  function drawArrow(root, idx) {
    const g = root.querySelector(`.fw-arrow[data-arrow="${idx}"]`);
    const path = g.querySelector(".fw-arrow-path");
    const head = g.querySelector(".fw-arrow-head");
    g.classList.add("is-drawn");
    controllers.push(window.Anim.drawPath(path, { duration: isReduced ? 0 : 450, easing: "ease-out", reduced: isReduced }));
    const ha = head.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: isReduced ? 0 : 140, delay: isReduced ? 0 : 340, fill: "forwards",
    });
    controllers.push({ cancel: () => ha.cancel() });
  }

  function closeLoop(root) {
    drawArrow(root, 5);
    const ring = root.querySelector(".fw-wheel-svg");
    if (isReduced) return;
    // one brightening pass over the whole ring, then the rotor spins exactly
    // twice and stops — tracked so onLeave can cancel it mid-spin
    schedule(() => {
      const pulse = ring.animate([{ opacity: 1 }, { opacity: 0.72 }, { opacity: 1 }], { duration: 700, easing: "ease-in-out" });
      controllers.push({ cancel: () => pulse.cancel() });

      const rotorArc = root.querySelector(".fw-rotor-arc");
      controllers.push(window.Anim.drawPath(rotorArc, { duration: 400, easing: "ease-out", reduced: false }));
      const rotor = root.querySelector(".fw-rotor");
      rotor.classList.add("is-visible");
      const spin = rotor.animate(
        [{ transform: `translate(${CX}px,${CY}px) rotate(0deg)` }, { transform: `translate(${CX}px,${CY}px) rotate(720deg)` }],
        { duration: 3200, iterations: 1, easing: "cubic-bezier(.35,0,.35,1)", fill: "forwards" }
      );
      controllers.push({ cancel: () => spin.cancel() });
    }, 500);
  }

  function revealStep(root, n) {
    if (n >= 1 && n <= 5) {
      fillNode(root, n);
      if (n >= 2) drawArrow(root, n - 1);
    }
    if (n === 6) closeLoop(root);
    if (n === 7) {
      controllers.push(window.Anim.fadeUp(root.querySelector('.fw-compound-line[data-line="1"]'), { reduced: isReduced }));
      const l2 = root.querySelector('.fw-compound-line[data-line="2"]');
      if (isReduced) controllers.push(window.Anim.fadeUp(l2, { reduced: true }));
      else schedule(() => controllers.push(window.Anim.fadeUp(l2, { reduced: false })), 200);
    }
    if (n === 8) controllers.push(window.Anim.fadeUp(root.querySelector(".fw-raas-inset"), { reduced: isReduced }));
    if (n === 9) {
      root.querySelectorAll(".fw-geo").forEach((g, i) => {
        if (isReduced) g.classList.add("is-visible");
        else schedule(() => g.classList.add("is-visible"), i * 120);
      });
      const line = root.querySelector(".fw-replication-line");
      if (isReduced) line.classList.add("is-visible");
      else schedule(() => line.classList.add("is-visible"), 4 * 120);
    }
    if (n === 10) {
      controllers.push(window.Anim.fadeUp(root.querySelector('.fw-asym-row[data-asym="downside"]'), { reduced: isReduced }));
      const up = root.querySelector('.fw-asym-row[data-asym="upside"]');
      if (isReduced) controllers.push(window.Anim.fadeUp(up, { reduced: true }));
      else schedule(() => controllers.push(window.Anim.fadeUp(up, { reduced: false })), 400);
    }
  }

  function hideStep(root, n) {
    if (n >= 1 && n <= 5) {
      root.querySelectorAll(".fw-node")[n - 1].classList.remove("is-filled");
      if (n >= 2) {
        const g = root.querySelector(`.fw-arrow[data-arrow="${n - 1}"]`);
        g.classList.remove("is-drawn");
        const p = g.querySelector(".fw-arrow-path");
        window.Anim.resetPath(p);
        const h = g.querySelector(".fw-arrow-head");
        h.getAnimations().forEach((a) => a.cancel());
        h.style.opacity = "0";
      }
    }
    if (n === 6) {
      const g = root.querySelector('.fw-arrow[data-arrow="5"]');
      g.classList.remove("is-drawn");
      const p = g.querySelector(".fw-arrow-path");
      window.Anim.resetPath(p);
      const h2 = g.querySelector(".fw-arrow-head");
      h2.getAnimations().forEach((a) => a.cancel());
      h2.style.opacity = "0";
      const rotor = root.querySelector(".fw-rotor");
      rotor.classList.remove("is-visible");
      rotor.style.transform = `translate(${CX}px,${CY}px)`;
      const arc = root.querySelector(".fw-rotor-arc");
      window.Anim.resetPath(arc);
    }
    if (n === 7) root.querySelectorAll(".fw-compound-line").forEach((l) => l.classList.remove("is-visible"));
    if (n === 8) root.querySelector(".fw-raas-inset").classList.remove("is-visible");
    if (n === 9) {
      root.querySelectorAll(".fw-geo").forEach((g) => g.classList.remove("is-visible"));
      root.querySelector(".fw-replication-line").classList.remove("is-visible");
    }
    if (n === 10) root.querySelectorAll(".fw-asym-row").forEach((r) => r.classList.remove("is-visible"));
  }

  window.page({
    id: "13-flywheel",
    title: "India is not the market. India is the engine.",
    theme: "light",
    steps: 10,
    render,
    onEnter: (root, ctx) => {
      clearAll();
      isReduced = ctx.isReduced;
      revealedThrough = 0;
      primeArrows(root);
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
