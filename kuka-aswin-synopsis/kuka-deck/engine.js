/**
 * engine.js — page registration, navigation state machine, theme wash,
 * progress rail, master overview grid, keyboard handling, reduced-motion
 * flag, guaranteed onLeave cleanup (GLOBAL-INSTRUCTIONS.md §9).
 *
 * Plain scripts, not ES modules — modules loaded via `import` are blocked by
 * CORS when the deck is opened as a local file:// document in Chromium, and
 * "must work opened as a local file" is a hard technical-contract rule
 * (GLOBAL-INSTRUCTIONS.md §6). Every file here hangs a single name off
 * `window` instead.
 *
 * Page module contract (GLOBAL-INSTRUCTIONS.md §8):
 *   page({
 *     id, title, theme: "light"|"dark",
 *     render: () => "<markup with staged elements carrying class 'step'>",
 *     steps,
 *     onEnter: (el, ctx) => {},   // ctx: { revealStep, isReduced, data }
 *     onStep:  (el, i) => {},
 *     onLeave: (el) => {},
 *   });
 */
(function () {
  const pages = [];

  let currentPageIndex = -1;
  let currentStep = 0;
  let currentTheme = null;
  let overviewOpen = false;

  const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let isReduced = reducedQuery.matches;

  let mountEl, segsEl, counterEl, navBtn, overviewEl, overviewGridEl, washEl, stageEl;

  function registerPage(config) {
    pages.push(config);
  }
  window.page = registerPage;

  function currentPage() {
    return currentPageIndex >= 0 ? pages[currentPageIndex] : null;
  }

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function stepElementsFor(el) {
    return Array.from(el.querySelectorAll(".step"));
  }

  function applySteps(el, step) {
    stepElementsFor(el).forEach((node) => {
      const at = parseInt(node.dataset.step || "0", 10);
      node.classList.toggle("is-visible", at <= step);
    });
  }

  function ctxFor(p) {
    return {
      isReduced,
      data: window.DeckData,
      revealStep: (i) => setStep(i),
    };
  }

  function setStep(i) {
    const p = currentPage();
    if (!p) return;
    // Reduced motion has no partial-step state — clamp any request (e.g. a
    // rail/overview click landing on the screen already on screen, which
    // asks for step 0) to fully revealed, matching how enterScreen treats it.
    const requested = isReduced ? p.steps : i;
    const target = Math.max(0, Math.min(p.steps, requested));
    currentStep = target;
    applySteps(mountEl, target);
    if (p.onStep) p.onStep(mountEl, target);
    updateProgress();
  }

  // Renders a screen and, if entering at a step beyond 0 (a reduced-motion
  // forward entry, or stepping backward into the previous screen's final
  // state), fires onStep for every intermediate step in order so each step's
  // side effects (a count-up's final value, a path's final dashoffset) have
  // actually run at least once — not just the last one.
  function enterScreen(index, step) {
    const p = pages[index];
    const target = isReduced ? p.steps : step;

    mountEl.innerHTML = p.render();
    currentPageIndex = index;
    currentStep = 0;
    applySteps(mountEl, 0);

    currentTheme = p.theme;
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add("theme-" + p.theme);

    updateProgress();

    if (p.onEnter) p.onEnter(mountEl, ctxFor(p));

    if (target > 0) {
      for (let s = 1; s <= target; s++) {
        currentStep = s;
        applySteps(mountEl, s);
        if (p.onStep) p.onStep(mountEl, s);
      }
      updateProgress();
    }
  }

  function leaveScreen() {
    const p = currentPage();
    if (p && p.onLeave) p.onLeave(mountEl);
  }

  // Screen-to-screen move. Washes between themes unless reduced motion is on.
  function transitionTo(index, step) {
    if (index < 0 || index >= pages.length) return;
    if (index === currentPageIndex) {
      setStep(step);
      return;
    }
    const p = pages[index];
    const themeChanges = currentTheme !== null && p.theme !== currentTheme;

    if (themeChanges && !isReduced) {
      washEl.style.background =
        p.theme === "dark" ? "var(--dark-base-top)" : "var(--light-canvas)";
      washEl.classList.add("is-active");
      window.setTimeout(() => {
        leaveScreen();
        enterScreen(index, step);
        requestAnimationFrame(() => washEl.classList.remove("is-active"));
      }, 250);
    } else {
      leaveScreen();
      enterScreen(index, step);
    }
  }

  function advance() {
    const p = currentPage();
    if (!p) return;
    // Under reduced motion every screen is entered fully revealed and stays
    // that way — there is no partial-step state to advance through, so
    // arrow-right always means "next screen."
    if (!isReduced && currentStep < p.steps) {
      setStep(currentStep + 1);
    } else if (currentPageIndex < pages.length - 1) {
      transitionTo(currentPageIndex + 1, 0);
    }
  }

  function back() {
    const p = currentPage();
    if (!p) return;
    if (!isReduced && currentStep > 0) {
      setStep(currentStep - 1);
    } else if (currentPageIndex > 0) {
      const prevIndex = currentPageIndex - 1;
      transitionTo(prevIndex, pages[prevIndex].steps);
    }
  }

  function replay() {
    const p = currentPage();
    if (!p) return;
    const step = currentStep;
    if (p.onLeave) p.onLeave(mountEl);
    if (p.onEnter) p.onEnter(mountEl, ctxFor(p));
    applySteps(mountEl, step);
    for (let s = 1; s <= step; s++) {
      if (p.onStep) p.onStep(mountEl, s);
    }
  }

  // --- progress rail -------------------------------------------------

  function buildRail() {
    segsEl.innerHTML = "";
    pages.forEach((p, i) => {
      const seg = document.createElement("button");
      seg.type = "button";
      seg.className = "progress-seg";
      seg.setAttribute("aria-label", `Go to screen ${i + 1}: ${p.title}`);
      seg.addEventListener("click", (e) => {
        e.stopPropagation();
        transitionTo(i, 0);
      });
      segsEl.appendChild(seg);
    });
  }

  function updateProgress() {
    Array.from(segsEl.children).forEach((seg, i) => {
      seg.classList.toggle("is-active", i === currentPageIndex);
    });
    counterEl.textContent = `${pad(currentPageIndex + 1)} / ${pad(pages.length)}`;
  }

  // --- overview grid ---------------------------------------------------

  function buildOverview() {
    overviewGridEl.innerHTML = "";
    pages.forEach((p, i) => {
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "overview-tile theme-" + p.theme;
      tile.innerHTML =
        `<span class="overview-num">${pad(i + 1)}</span>` +
        `<span class="overview-title">${p.title}</span>`;
      tile.addEventListener("click", (e) => {
        e.stopPropagation();
        closeOverview();
        transitionTo(i, 0);
      });
      overviewGridEl.appendChild(tile);
    });
  }

  function markOverviewActive() {
    Array.from(overviewGridEl.children).forEach((tile, i) => {
      tile.classList.toggle("is-current", i === currentPageIndex);
    });
  }

  function openOverview() {
    if (!pages.length) return;
    overviewOpen = true;
    markOverviewActive();
    overviewEl.classList.add("is-open");
  }

  function closeOverview() {
    overviewOpen = false;
    overviewEl.classList.remove("is-open");
  }

  function toggleOverview() {
    if (overviewOpen) closeOverview();
    else openOverview();
  }

  // --- input -------------------------------------------------------------

  function handleKey(e) {
    if (overviewOpen) {
      if (e.key === "Escape" || e.key === "o" || e.key === "O") {
        e.preventDefault();
        closeOverview();
      }
      return;
    }
    switch (e.key) {
      case "ArrowRight":
      case " ":
        e.preventDefault();
        advance();
        break;
      case "ArrowLeft":
        e.preventDefault();
        back();
        break;
      case "o":
      case "O":
      case "Escape":
        e.preventDefault();
        openOverview();
        break;
      case "r":
      case "R":
        e.preventDefault();
        replay();
        break;
      case "Home":
        e.preventDefault();
        transitionTo(0, 0);
        break;
      case "End":
        e.preventDefault();
        transitionTo(pages.length - 1, 0);
        break;
    }
  }

  function handleClick(e) {
    if (overviewOpen) return;
    if (e.target.closest(".master-nav-btn, .progress-rail, .overview, .key-hint")) return;
    const half = window.innerWidth / 2;
    if (e.clientX < half) back();
    else advance();
  }

  // --- init ----------------------------------------------------------

  function init() {
    mountEl = document.getElementById("screen-mount");
    segsEl = document.getElementById("progress-segs");
    counterEl = document.getElementById("progress-counter");
    navBtn = document.getElementById("master-nav-btn");
    overviewEl = document.getElementById("overview");
    overviewGridEl = overviewEl.querySelector(".overview-grid");
    washEl = document.getElementById("theme-wash");
    stageEl = document.getElementById("stage");

    if (isReduced) document.documentElement.classList.add("reduced-motion");
    reducedQuery.addEventListener("change", (e) => {
      isReduced = e.matches;
      document.documentElement.classList.toggle("reduced-motion", isReduced);
    });

    buildRail();
    buildOverview();

    navBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleOverview();
    });
    overviewEl.addEventListener("click", (e) => {
      if (e.target === overviewEl) closeOverview();
    });
    document.addEventListener("keydown", handleKey);
    stageEl.addEventListener("click", handleClick);

    if (pages.length) enterScreen(0, 0);
  }

  document.addEventListener("DOMContentLoaded", init);

  window.Engine = {
    advance,
    back,
    replay,
    goToScreen: (i, s) => transitionTo(i, s || 0),
    openOverview,
    closeOverview,
  };
})();
