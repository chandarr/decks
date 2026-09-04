/* ==========================================================================
   engine.js — page registry, navigation, themes, chrome (GLOBAL §3, §8, §9)

   Navigation contract:
     → / space / click  advance one step; past the last step, next page at 0
     ←                  back one step; from step 0, previous page at its FINAL step
     O                  overview grid, click to jump
     R                  replay the current page from step 0
     Home / End         first / last page

   No storage of any kind — all state lives in memory (GLOBAL §6).

   Ported from the deck-builder starter runtime. Do not edit further — per
   CLAUDE.md, per-deck configuration (which pages open an act) lives in
   index.html's window.deckConfig, not here.
   ========================================================================== */

window.Deck = (function () {
  'use strict';

  // GLOBAL §3 / CLAUDE.md: window.deckConfig.actMarkers holds zero-based
  // page indexes where an act begins; the engine works in 1-based page
  // numbers internally, so convert once at boot.
  var ACT_MARKER_PAGES = ((window.deckConfig && window.deckConfig.actMarkers) || [])
    .map(function (i) { return i + 1; });
  var WASH_MS = 600;                     // theme wash (GLOBAL §4.3)

  var registry = [];
  var host, frame, rail, railFill, railMarks, dots, overview, overviewGrid, wash;
  var current = null;                    // { def, el, step }
  var themeNow = null;
  var busy = false;                      // true during a theme wash
  var overviewOpen = false;
  var started = false;

  /* --- registration (GLOBAL §8) ------------------------------------------ */

  function page(def) {
    if (!def || !def.id) { console.error('page(): missing id', def); return; }
    registry.push(def);
  }

  /* --- boot -------------------------------------------------------------- */

  function start(opts) {
    if (started) return;
    started = true;
    opts = opts || {};

    host        = document.getElementById('page-host');
    frame       = document.getElementById('frame');
    rail        = document.getElementById('rail');
    railFill    = document.getElementById('rail-fill');
    railMarks   = document.getElementById('rail-marks');
    dots        = document.getElementById('dots');
    overview    = document.getElementById('overview');
    overviewGrid= document.getElementById('overview-grid');
    wash        = document.getElementById('wash');

    buildRailMarks();
    buildOverview();

    document.addEventListener('keydown', onKey);
    frame.addEventListener('click', onClick);
    window.addEventListener('pagehide', leaveCurrent);
    window.addEventListener('beforeunload', leaveCurrent);

    if (!registry.length) {
      // no slides registered yet — chrome stays valid, nothing to mount
      applyTheme('light', false);
      updateChrome();
      return;
    }

    var startAt = clampIndex(opts.startAt || 0);
    enter(startAt, 0, { wash: false, animate: !Anim.reduced });
  }

  /* --- navigation state machine ------------------------------------------ */

  function next() {
    if (busy || !current) return;
    if (current.step < steps(current.def)) {
      setStep(current.step + 1, { animate: true });
    } else if (index() < registry.length - 1) {
      enter(index() + 1, 0, { wash: true, animate: true });
    }
  }

  function prev() {
    if (busy || !current) return;
    if (current.step > 0) {
      setStep(current.step - 1, { animate: false });
    } else if (index() > 0) {
      var i = index() - 1;
      enter(i, steps(registry[i]), { wash: true, animate: false });   // previous page, final step
    }
  }

  function go(i, step) {
    if (busy) return;
    i = clampIndex(i);
    var target = step == null ? 0 : Math.max(0, Math.min(steps(registry[i]), step));
    if (current && i === index() && target === current.step) return;
    enter(i, target, { wash: true, animate: false });
  }

  function replay() {
    if (busy || !current) return;
    var i = index();
    enter(i, 0, { wash: false, animate: true, force: true });
  }

  function first() { go(0, 0); }
  function last()  { go(registry.length - 1, 0); }

  /* --- mount / unmount ---------------------------------------------------- */

  function enter(i, step, o) {
    o = o || {};
    var def = registry[i];
    if (!def) return;

    var themeChanging = def.theme !== themeNow;
    var doWash = o.wash && themeChanging && themeNow !== null && !Anim.reduced;

    if (!doWash) {
      leaveCurrent();
      mount(def, i, step, o.animate !== false);
      return;
    }

    // 600ms wash: dark field fades in, the page swaps at the peak, fades out
    busy = true;
    var fadeIn = wash.animate([{ opacity: 0 }, { opacity: 1 }],
      { duration: Math.round(WASH_MS * 0.42), easing: 'ease-in', fill: 'both' });
    fadeIn.finished.then(function () {
      leaveCurrent();
      mount(def, i, step, o.animate !== false);
      var fadeOut = wash.animate([{ opacity: 1 }, { opacity: 0 }],
        { duration: Math.round(WASH_MS * 0.58), easing: 'ease-out', fill: 'both' });
      return fadeOut.finished;
    }).then(function () {
      busy = false;
    }).catch(function (e) {
      busy = false;
      console.error(e);
    });
  }

  function mount(def, i, step, animate) {
    applyTheme(def.theme || 'light', false);

    var el = document.createElement('section');
    el.className = 'page';
    el.id = 'page-' + def.id;
    el.setAttribute('data-page', def.id);
    el.innerHTML = typeof def.render === 'function' ? (def.render() || '') : '';
    host.appendChild(el);

    current = { def: def, el: el, step: 0, i: i };

    var ctx = {
      revealStep: function (n) { setStep(n, { animate: true }); },
      isReduced: Anim.reduced,
      index: i,
      steps: steps(def)
    };

    try {
      if (typeof def.onEnter === 'function') def.onEnter(el, ctx);
    } catch (e) { console.error('onEnter ' + def.id, e); }

    // jump straight to the requested step, statically (back-nav / O jump)
    if (step > 0) {
      applyStepClasses(step, false);
      current.step = step;
      for (var s = 1; s <= step; s++) {
        try { if (typeof def.onStep === 'function') def.onStep(el, s, { static: true }); }
        catch (e) { console.error('onStep ' + def.id + ' #' + s, e); }
      }
    } else {
      applyStepClasses(0, false);
    }

    updateChrome();
    if (animate && step === 0) { /* base state animates itself in onEnter */ }
  }

  function leaveCurrent() {
    if (!current) return;
    var c = current;
    current = null;
    try {
      if (typeof c.def.onLeave === 'function') c.def.onLeave(c.el);
    } catch (e) {
      console.error('onLeave ' + c.def.id, e);
    } finally {
      Anim.stopAll(c.el);                 // backstop: kill any loop a page forgot
      if (c.el.parentNode) c.el.parentNode.removeChild(c.el);
    }
  }

  /* --- steps -------------------------------------------------------------- */

  function setStep(n, o) {
    if (!current) return;
    var def = current.def;
    n = Math.max(0, Math.min(steps(def), n));
    var forward = n > current.step;
    applyStepClasses(n, o.animate && forward);
    current.step = n;
    updateChrome();
    if (forward && typeof def.onStep === 'function') {
      try { def.onStep(current.el, n, { static: !o.animate }); }
      catch (e) { console.error('onStep ' + def.id + ' #' + n, e); }
    }
  }

  /* Engine reveals .step[data-step<=n]; pages add motion on top in onStep. */
  function applyStepClasses(n, animate) {
    var els = current.el.querySelectorAll('.step[data-step]');
    if (!animate) frame.classList.add('no-transition');
    for (var i = 0; i < els.length; i++) {
      var s = parseInt(els[i].getAttribute('data-step'), 10) || 0;
      els[i].classList.toggle('is-shown', s <= n);
    }
    if (!animate) {
      void frame.offsetHeight;            // flush, so the class change isn't animated
      frame.classList.remove('no-transition');
    }
  }

  /* --- theme + wash -------------------------------------------------------- */

  function applyTheme(theme) {
    if (theme !== 'dark') theme = 'light';
    if (theme === themeNow) return;
    themeNow = theme;
    document.documentElement.setAttribute('data-theme', theme);
  }

  /* --- chrome: rail, act markers, step dots -------------------------------- */

  function buildRailMarks() {
    if (!railMarks) return;
    var total = Math.max(registry.length, 1);
    railMarks.innerHTML = ACT_MARKER_PAGES
      .filter(function (p) { return p <= total; })
      .map(function (p) {
        var pct = ((p - 1) / total) * 100;
        return '<div class="rail-mark" style="left:' + pct.toFixed(3) + '%"></div>';
      }).join('');
  }

  function updateChrome() {
    var total = registry.length;
    if (railFill) {
      railFill.style.width = total ? (((index() + 1) / total) * 100).toFixed(3) + '%' : '0%';
    }
    if (!dots) return;
    var n = current ? steps(current.def) : 0;
    var on = current ? current.step : 0;
    var html = '';
    for (var i = 1; i <= n; i++) html += '<div class="dot' + (i <= on ? ' is-on' : '') + '"></div>';
    dots.innerHTML = html;
    dots.style.display = n ? 'flex' : 'none';
  }

  /* --- overview (O) --------------------------------------------------------- */

  function buildOverview() {
    if (!overviewGrid) return;
    overviewGrid.innerHTML = registry.map(function (def, i) {
      var num = String(i + 1).padStart(2, '0');
      var act = ACT_MARKER_PAGES.indexOf(i + 1) > -1 ? '<div class="ov-act"></div>' : '';
      return '<div class="ov-card" data-i="' + i + '" data-page-theme="' + (def.theme || 'light') + '">' +
               act +
               '<div class="ov-num">' + num + '</div>' +
               '<div class="ov-name">' + (def.title || def.id) + '</div>' +
             '</div>';
    }).join('');
    overviewGrid.addEventListener('click', function (e) {
      var card = e.target.closest('.ov-card');
      if (!card) return;
      closeOverview();
      go(parseInt(card.getAttribute('data-i'), 10), 0);
    });
  }

  function openOverview() {
    if (overviewOpen || !registry.length) return;
    overviewOpen = true;
    var cards = overviewGrid.querySelectorAll('.ov-card');
    for (var i = 0; i < cards.length; i++) cards[i].classList.toggle('is-current', i === index());
    overview.hidden = false;
    void overview.offsetHeight;
    overview.classList.add('is-open');
  }

  function closeOverview() {
    if (!overviewOpen) return;
    overviewOpen = false;
    overview.classList.remove('is-open');
    var hide = function () { if (!overviewOpen) overview.hidden = true; };
    Anim.reduced ? hide() : setTimeout(hide, 220);
  }

  function toggleOverview() { overviewOpen ? closeOverview() : openOverview(); }

  /* --- input ----------------------------------------------------------------- */

  function onKey(e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    switch (e.key) {
      case 'ArrowRight': case ' ': case 'Spacebar': case 'PageDown':
        e.preventDefault(); if (overviewOpen) closeOverview(); else next(); break;
      case 'ArrowLeft': case 'PageUp':
        e.preventDefault(); if (overviewOpen) closeOverview(); else prev(); break;
      case 'o': case 'O':
        e.preventDefault(); toggleOverview(); break;
      case 'r': case 'R':
        e.preventDefault(); if (!overviewOpen) replay(); break;
      case 'Home':
        e.preventDefault(); closeOverview(); first(); break;
      case 'End':
        e.preventDefault(); closeOverview(); last(); break;
      case 'Escape':
        if (overviewOpen) { e.preventDefault(); closeOverview(); } break;
    }
  }

  function onClick(e) {
    if (overviewOpen) return;
    if (e.target.closest('.no-advance')) return;
    next();
  }

  /* --- helpers ---------------------------------------------------------------- */

  function steps(def) { return Math.max(0, def && def.steps || 0); }
  function index() { return current ? current.i : 0; }
  function clampIndex(i) { return Math.max(0, Math.min(registry.length - 1, i | 0)); }

  return {
    page: page,
    start: start,
    next: next,
    prev: prev,
    go: go,
    replay: replay,
    first: first,
    last: last,
    overview: toggleOverview,
    get pages() { return registry.slice(); },
    get state() {
      return {
        index: current ? current.i : -1,
        id: current ? current.def.id : null,
        step: current ? current.step : 0,
        steps: current ? steps(current.def) : 0,
        theme: themeNow,
        overview: overviewOpen,
        reduced: Anim.reduced
      };
    }
  };
})();

/* GLOBAL §8 registers pages as page({...}) */
window.page = window.Deck.page;
