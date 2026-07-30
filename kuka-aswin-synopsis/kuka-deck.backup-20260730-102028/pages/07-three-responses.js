/**
 * pages/07-three-responses.js — Screen 07 · The strategic posture (light,
 * ACT II — the deck's strategic hinge). tasks/07-three-responses.md.
 *
 * Two mirror-image cards (HOLD/NEED/MOVE/COST) converge visually on a
 * resolution card below. The connector paths' endpoints depend on actual
 * rendered card geometry (text reflow differs between 1920x1080 and
 * 1440x900), so they're measured via getBoundingClientRect() in onEnter
 * and redrawn on resize, rather than hardcoded as percentages.
 *
 * Note: the task file's own header names this screen "The strategic
 * posture" (file is 07-three-responses.md, superseding the original
 * three-way ABB/FANUC/KUKA framing from 02-NARRATIVE-SPINE.md with a
 * two-sided body/brain convergence — built from the task file, not the
 * spine, per CLAUDE.md).
 */
(function () {
  let controllers = [];
  let timers = [];
  let isReduced = false;
  let revealedThrough = 0;
  let resizeHandler = null;

  function schedule(fn, delay) {
    timers.push(setTimeout(fn, delay));
  }
  function clearAll() {
    controllers.forEach((c) => c.cancel());
    controllers = [];
    timers.forEach((t) => clearTimeout(t));
    timers = [];
  }

  function rowsMarkup(cardNum) {
    const rows = [
      ["HOLD", cardNum === 1 ? "Hardware, certification, installed base." : "Models, capital, talent."],
      ["NEED", cardNum === 1 ? "Software velocity." : "A certified body, a safety case, deployment data."],
      [
        "MOVE",
        cardNum === 1
          ? "ABB sold itself. FANUC allied — NVIDIA, Google Intrinsic — and opened its architecture to ROS 2 and Python."
          : "Consuming the actuator, reducer and certification supply chain — or hunting for hardware partners.",
      ],
      [
        "COST",
        cardNum === 1
          ? "ABB lost the business. FANUC builds on another company's stack."
          : "Enormous capital, and years to certification.",
      ],
    ];
    return rows
      .map(
        ([label, text], i) => `
        <div class="posture-row reveal" data-card="${cardNum}" data-row="${i}">
          <span class="posture-row-label">${label}</span>
          <p class="posture-row-content">${text}</p>
        </div>`
      )
      .join("");
  }

  function render() {
    return `
      <section class="screen screen--posture">
        <div class="posture-header">
          <p class="kicker">THE POSTURE</p>
          <h1 class="display-2">Two directions, one destination.</h1>
          <p class="subtitle">Everyone converging on the same point is coming from one side or the other.</p>
        </div>

        <div class="posture-cards">
          <div class="posture-card" id="posture-card-1">
            <p class="posture-card-title">COMING FROM THE BODY</p>
            <p class="posture-card-subtitle">Traditional leaders — ABB · FANUC · Yaskawa</p>
            <div class="posture-card-rule"></div>
            <div class="posture-rows">${rowsMarkup(1)}</div>
            <p class="chip chip--confirmed">confirmed</p>
          </div>
          <div class="posture-card" id="posture-card-2">
            <p class="posture-card-title">COMING FROM THE BRAIN</p>
            <p class="posture-card-subtitle">Humanoids &amp; physical-AI software — Figure · Physical Intelligence · Skild · NVIDIA</p>
            <div class="posture-card-rule"></div>
            <div class="posture-rows">${rowsMarkup(2)}</div>
            <p class="chip chip--confirmed">confirmed</p>
          </div>
        </div>

        <div class="posture-connectors" id="posture-connectors">
          <svg class="posture-connector-svg" id="posture-connector-svg" preserveAspectRatio="none" aria-hidden="true">
            <path class="posture-connector" data-side="left"></path>
            <path class="posture-connector" data-side="right"></path>
          </svg>
        </div>

        <div class="posture-resolution" id="posture-resolution">
          <svg class="posture-edge-svg" viewBox="0 0 3 100" preserveAspectRatio="none" aria-hidden="true">
            <line class="posture-edge-rule" x1="1.5" y1="0" x2="1.5" y2="100"></line>
          </svg>
          <div class="posture-resolution-content reveal">
            <p class="posture-resolution-title">ALREADY AT THE INTERSECTION</p>
            <p class="posture-resolution-body">KUKA holds both sides — sensitive robotics, certified safety, an installed base, and an operating system already rewritten from scratch as a modular open platform. Not an interface layered onto legacy code, which is what both other incumbents shipped.</p>
          </div>
          <p class="posture-closing reveal">KUKA built the best foundation and has not yet made the bet.</p>
        </div>
      </section>
    `;
  }

  function measureAndDrawConnectors(root) {
    const zoneEl = root.querySelector("#posture-connectors");
    const svg = root.querySelector("#posture-connector-svg");
    const card1 = root.querySelector("#posture-card-1");
    const card2 = root.querySelector("#posture-card-2");
    const resolution = root.querySelector("#posture-resolution");
    if (!zoneEl.offsetHeight) return; // not laid out yet (e.g. display:none ancestor)

    const zoneRect = zoneEl.getBoundingClientRect();
    const c1Rect = card1.getBoundingClientRect();
    const c2Rect = card2.getBoundingClientRect();
    const resRect = resolution.getBoundingClientRect();

    const w = zoneRect.width, h = zoneRect.height;
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);

    const startLeft = { x: c1Rect.right - zoneRect.left - 24, y: c1Rect.bottom - zoneRect.top };
    const startRight = { x: c2Rect.left - zoneRect.left + 24, y: c2Rect.bottom - zoneRect.top };
    const endLeft = { x: resRect.left - zoneRect.left + resRect.width / 3, y: h };
    const endRight = { x: resRect.left - zoneRect.left + (resRect.width * 2) / 3, y: h };

    const leftPath = root.querySelector('.posture-connector[data-side="left"]');
    const rightPath = root.querySelector('.posture-connector[data-side="right"]');
    leftPath.setAttribute(
      "d",
      `M ${startLeft.x} ${startLeft.y} C ${startLeft.x} ${startLeft.y + h * 0.5}, ${endLeft.x} ${startLeft.y + h * 0.2}, ${endLeft.x} ${h}`
    );
    rightPath.setAttribute(
      "d",
      `M ${startRight.x} ${startRight.y} C ${startRight.x} ${startRight.y + h * 0.5}, ${endRight.x} ${startRight.y + h * 0.2}, ${endRight.x} ${h}`
    );
  }

  function primeConnectors(root) {
    root.querySelectorAll(".posture-connector").forEach((p) => {
      const len = p.getTotalLength();
      if (len > 0) {
        p.style.strokeDasharray = String(len);
        p.style.strokeDashoffset = String(len);
      }
    });
  }

  function revealStep(root, n) {
    if (n === 1 || n === 2) {
      root.querySelectorAll(`.posture-row[data-card="${n}"]`).forEach((row, i) => {
        if (isReduced) row.classList.add("is-visible");
        else schedule(() => row.classList.add("is-visible"), i * 120);
      });
    }
    if (n === 3) {
      root.querySelectorAll(".posture-connector").forEach((p) => {
        controllers.push(window.Anim.drawPath(p, { duration: isReduced ? 0 : 500, easing: "ease-out", reduced: isReduced }));
      });
    }
    if (n === 4) {
      controllers.push(window.Anim.fadeUp(root.querySelector(".posture-resolution-content"), { reduced: isReduced }));
      const edge = root.querySelector(".posture-edge-rule");
      controllers.push(window.Anim.drawPath(edge, { duration: isReduced ? 0 : 400, easing: "ease-out", reduced: isReduced }));
    }
    if (n === 5) {
      controllers.push(window.Anim.fadeUp(root.querySelector(".posture-closing"), { reduced: isReduced }));
    }
  }

  function hideStep(root, n) {
    if (n === 1 || n === 2) {
      root.querySelectorAll(`.posture-row[data-card="${n}"]`).forEach((row) => row.classList.remove("is-visible"));
    }
    if (n === 3) {
      root.querySelectorAll(".posture-connector").forEach((p) => window.Anim.resetPath(p));
    }
    if (n === 4) {
      root.querySelector(".posture-resolution-content").classList.remove("is-visible");
      const edge = root.querySelector(".posture-edge-rule");
      window.Anim.resetPath(edge);
    }
    if (n === 5) {
      root.querySelector(".posture-closing").classList.remove("is-visible");
    }
  }

  function primeEdgeRule(root) {
    const edge = root.querySelector(".posture-edge-rule");
    const len = edge.getTotalLength();
    edge.style.strokeDasharray = String(len);
    edge.style.strokeDashoffset = String(len);
  }

  window.page({
    id: "07-three-responses",
    title: "Two directions, one destination.",
    theme: "light",
    steps: 5,
    render,
    onEnter: (root, ctx) => {
      clearAll();
      isReduced = ctx.isReduced;
      revealedThrough = 0;
      primeEdgeRule(root);
      measureAndDrawConnectors(root);
      primeConnectors(root);
      resizeHandler = () => {
        measureAndDrawConnectors(root);
        if (revealedThrough < 3) {
          root.querySelectorAll(".posture-connector").forEach((p) => {
            const len = p.getTotalLength();
            p.style.strokeDasharray = String(len);
            p.style.strokeDashoffset = String(len);
          });
        }
      };
      window.addEventListener("resize", resizeHandler);
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
      if (resizeHandler) {
        window.removeEventListener("resize", resizeHandler);
        resizeHandler = null;
      }
    },
  });
})();
