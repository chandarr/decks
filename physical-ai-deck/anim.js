/* ==========================================================================
   anim.js — the animation vocabulary (GLOBAL-INSTRUCTIONS §5)
   Named motions. Pages reuse these and never invent new keyframes.
   Everything animates transform / opacity / SVG stroke props only.
   Every motion has a reduced-motion path that renders the final state at once.

   Ported unmodified from the deck-builder starter runtime. Do not edit.
   ========================================================================== */

window.Anim = (function () {
  'use strict';

  var mql = window.matchMedia('(prefers-reduced-motion: reduce)');

  var EASE_OUT = 'cubic-bezier(.22,.7,.28,1)';
  var EASE_IO  = 'cubic-bezier(.5,0,.2,1)';

  /* --- bookkeeping --------------------------------------------------------
     Every animation and every loop is registered so the engine can guarantee
     a clean stop on page exit, even if a page module forgets. */
  var running = [];   // { anim, node }
  var loops   = [];   // { stop() }

  function track(anim, node) {
    if (!anim) return anim;
    running.push({ anim: anim, node: node });
    anim.finished.then(settle, clean);
    function settle() {
      /* A finished WAAPI animation with fill:'both' keeps compositing its
         end state ABOVE the normal CSS cascade indefinitely — so a later
         plain CSS/class change (e.g. a page's back-nav :has() rule, or the
         engine re-toggling .is-shown) is silently outranked and never wins.
         commitStyles() writes that end state as a regular inline style,
         then cancel() drops the WAAPI effect — same pixels, but now normal
         CSS can override it again. Skipped if the node left the document. */
      try { if (node && node.isConnected) anim.commitStyles(); } catch (e) {}
      try { anim.cancel(); } catch (e) {}
      clean();
    }
    function clean() {
      var i = running.findIndex(function (r) { return r.anim === anim; });
      if (i > -1) running.splice(i, 1);
    }
    return anim;
  }

  function registerLoop(handle) { loops.push(handle); return handle; }

  function stopAll(scope) {
    loops.splice(0).forEach(function (l) { try { l.stop(); } catch (e) { console.error(e); } });
    running.splice(0).forEach(function (r) {
      if (scope && r.node && !scope.contains(r.node)) return;
      try { r.anim.cancel(); } catch (e) { /* already gone */ }
    });
    typers.splice(0).forEach(function (t) { try { t.stop(); } catch (e) {} });
  }

  var typers = [];

  function list(x) {
    if (!x) return [];
    if (x instanceof Element) return [x];
    return Array.prototype.slice.call(x);
  }

  function reduced() { return mql.matches; }

  /* Duration/stagger helper for onStep(el, i, o) handlers: when a page is
     mounted directly at a non-zero step (back-nav crossing a page boundary,
     or a programmatic jump), the engine calls onStep with {static:true} for
     every intervening step so the page can catch up. Wrap normally-timed
     values in dur(o, ms) so those catch-up calls apply instantly instead of
     replaying the whole sequence. */
  /* Returns 1 (not 0) for the static case: every Anim.* function falls back
     to its default duration via `opts.duration || DEFAULT`, so a literal 0
     would be silently treated as "not provided" and replay at full speed.
     1ms is visually instant while staying truthy. */
  function dur(o, ms) { return (o && o.static) ? 1 : ms; }

  /* Wrap a CSS-class-driven state change so it applies with no transition
     when o.static — same trick the engine uses for its own step reveal.
     Pass the page root element (el from onStep) and the option object. */
  function applyInstant(el, o, fn) {
    if (o && o.static) {
      el.classList.add('no-transition');
      void el.offsetHeight;
      fn();
      void el.offsetHeight;
      el.classList.remove('no-transition');
    } else {
      fn();
    }
  }

  /* Promise that settles when a WAAPI animation ends; resolves immediately
     when the animation was skipped (reduced motion). */
  function done(anim) {
    if (!anim) return Promise.resolve();
    return anim.finished.catch(function () {});
  }

  function play(node, frames, opts) {
    var anim = node.animate(frames, {
      duration: opts.duration,
      delay: opts.delay || 0,
      easing: opts.easing || EASE_OUT,
      fill: opts.fill || 'both'
    });
    return track(anim, node);
  }

  /* --- 1 · fadeUp ---------------------------------------------------------
     opacity 0→1 + translateY 14px→0, 500ms ease-out. Default text reveal. */
  function fadeUp(target, o) {
    o = o || {};
    var els = list(target), d = o.duration || 500, stagger = o.stagger || 0;
    if (reduced()) { els.forEach(reset); return Promise.resolve(); }
    return Promise.all(els.map(function (el, i) {
      return done(play(el, [
        { opacity: 0, transform: 'translateY(' + (o.distance || 14) + 'px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: d, delay: (o.delay || 0) + i * stagger, easing: EASE_OUT }));
    }));
  }

  /* --- 2 · scaleIn --------------------------------------------------------
     0.97→1 with a shadow lift, 450ms. Cards and panels. */
  function scaleIn(target, o) {
    o = o || {};
    var els = list(target), stagger = o.stagger || 0;
    if (reduced()) { els.forEach(reset); return Promise.resolve(); }
    return Promise.all(els.map(function (el, i) {
      var from = { opacity: o.fadeFrom == null ? 0 : o.fadeFrom, transform: 'scale(' + (o.from || 0.97) + ')' };
      var to   = { opacity: 1, transform: 'scale(1)' };
      // shadow lift: resolve the tokens now — WAAPI keyframes don't read var()
      if (o.lift !== false) {
        var cs = getComputedStyle(el);
        var flat = cs.getPropertyValue('--panel-shadow').trim();
        var lifted = cs.getPropertyValue('--panel-shadow-lift').trim();
        if (flat && lifted && lifted !== 'none') {
          from.boxShadow = flat === 'none' ? '0 0 0 rgba(0,0,0,0)' : flat;
          to.boxShadow = lifted;
        }
      }
      return done(play(el, [from, to], {
        duration: o.duration || 450,
        delay: (o.delay || 0) + i * stagger,
        easing: EASE_OUT
      }));
    }));
  }

  /* --- 3 · drawPath -------------------------------------------------------
     SVG stroke-dashoffset draw-on, 700–1200ms. Lines, connectors, strokes. */
  function drawPath(target, o) {
    o = o || {};
    var els = list(target), stagger = o.stagger || 0;
    return Promise.all(els.map(function (el, i) {
      var len = pathLength(el);
      el.style.strokeDasharray = len + ' ' + len;
      if (reduced()) { el.style.strokeDashoffset = '0'; return Promise.resolve(); }
      el.style.strokeDashoffset = String(o.reverse ? -len : len);
      return done(play(el, [
        { strokeDashoffset: (o.reverse ? -len : len) },
        { strokeDashoffset: 0 }
      ], {
        duration: o.duration || 900,
        delay: (o.delay || 0) + i * stagger,
        easing: o.easing || EASE_IO
      })).then(function () { el.style.strokeDashoffset = '0'; });
    }));
  }

  function pathLength(el) {
    if (typeof el.getTotalLength === 'function') {
      try { return Math.ceil(el.getTotalLength()); } catch (e) {}
    }
    var b = el.getBBox ? el.getBBox() : { width: 0, height: 0 };
    return Math.ceil(b.width + b.height) || 1;
  }

  /* --- 4 · crossFade ------------------------------------------------------
     Swap content in a shared slot, 350ms. Carousel slots. */
  function crossFade(slot, content, o) {
    o = o || {};
    var d = o.duration || 350;
    var set = function () {
      if (typeof content === 'function') content(slot);
      else if (content instanceof Element) { slot.innerHTML = ''; slot.appendChild(content); }
      else slot.innerHTML = content;
    };
    if (reduced()) { set(); return Promise.resolve(); }
    return done(play(slot, [{ opacity: 1 }, { opacity: 0 }], { duration: d / 2, easing: 'linear' }))
      .then(function () {
        set();
        return done(play(slot, [{ opacity: 0 }, { opacity: 1 }], { duration: d / 2, easing: 'linear' }));
      });
  }

  /* --- 5 · countUp --------------------------------------------------------
     Animated number, tabular figures, 800ms. */
  function countUp(el, to, o) {
    o = o || {};
    var from = o.from == null ? 0 : o.from;
    var dp = o.decimals == null ? 0 : o.decimals;
    var pre = o.prefix || '', suf = o.suffix || '';
    var write = function (v) { el.textContent = pre + v.toFixed(dp) + suf; };
    el.style.fontVariantNumeric = 'tabular-nums';
    if (reduced()) { write(to); return Promise.resolve(); }
    var dur = o.duration || 800, t0 = null, raf = 0, live = true;
    var handle = { stop: function () { live = false; cancelAnimationFrame(raf); } };
    registerLoop(handle);
    return new Promise(function (resolve) {
      function frame(t) {
        if (!live) return resolve();
        if (t0 === null) t0 = t;
        var p = Math.min(1, (t - t0) / dur);
        write(from + (to - from) * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = requestAnimationFrame(frame);
        else { write(to); resolve(); }
      }
      raf = requestAnimationFrame(frame);
    });
  }

  /* --- 6 · converge -------------------------------------------------------
     Elements travel toward a centre point, ease-in-out 900ms. Fusion moments.
     `centre` is {x, y} in the coordinate space of each element's offsetParent
     (use Anim.centreOf(el) to get it). */
  function converge(target, centre, o) {
    o = o || {};
    var els = list(target);
    if (reduced()) {
      els.forEach(function (el) { el.style.opacity = o.fade === false ? '1' : '0'; });
      return Promise.resolve();
    }
    return Promise.all(els.map(function (el, i) {
      var c = centreOf(el);
      var dx = centre.x - c.x, dy = centre.y - c.y;
      var to = {
        transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + (o.scale == null ? 0.3 : o.scale) + ')',
        opacity: o.fade === false ? 1 : 0
      };
      return done(play(el, [{ transform: 'translate(0,0) scale(1)', opacity: 1 }, to], {
        duration: o.duration || 900,
        delay: (o.delay || 0) + i * (o.stagger || 0),
        easing: EASE_IO
      }));
    }));
  }

  /* --- 7 · radiate --------------------------------------------------------
     Elements travel outward from a centre, staggered.
     Elements are laid out at their destination; this plays them in from
     `centre` so the final DOM state is the resting state. */
  function radiate(target, centre, o) {
    o = o || {};
    var els = list(target);
    if (reduced()) { els.forEach(reset); return Promise.resolve(); }
    return Promise.all(els.map(function (el, i) {
      var c = centreOf(el);
      var dx = centre.x - c.x, dy = centre.y - c.y;
      return done(play(el, [
        { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + (o.from == null ? 0.2 : o.from) + ')', opacity: 0 },
        { transform: 'translate(0,0) scale(1)', opacity: 1 }
      ], {
        duration: o.duration || 900,
        delay: (o.delay || 0) + i * (o.stagger == null ? 40 : o.stagger),
        easing: EASE_IO
      }));
    }));
  }

  /* --- 8 · typeIn ---------------------------------------------------------
     Character-by-character, ~28ms/char, with caret. Not used in this deck
     (all pages are light-theme editorial), kept for parity with the runtime. */
  function typeIn(el, text, o) {
    o = o || {};
    var speed = o.speed || 28;
    el.textContent = '';
    if (reduced()) { el.textContent = text; return Promise.resolve(); }

    var caret = document.createElement('span');
    caret.className = 'caret';
    caret.textContent = '█';
    var span = document.createElement('span');
    el.appendChild(span);
    el.appendChild(caret);

    var i = 0, timer = 0, live = true;
    var handle = {
      stop: function () {
        if (!live) return;
        live = false;
        clearTimeout(timer);
        span.textContent = text;
        if (caret.parentNode) caret.remove();
      }
    };
    typers.push(handle);
    registerLoop(handle);

    return new Promise(function (resolve) {
      (function tick() {
        if (!live) return resolve();
        span.textContent = text.slice(0, ++i);
        if (i < text.length) timer = setTimeout(tick, speed);
        else {
          if (o.keepCaret) { /* caller removes it */ }
          else if (caret.parentNode) caret.remove();
          live = false;
          resolve();
        }
      })();
    });
  }

  /* --- 9 · morphSwap ------------------------------------------------------
     One element dissolves as its replacement forms in place, 500ms. */
  function morphSwap(fromEl, toEl, o) {
    o = o || {};
    var d = o.duration || 500;
    toEl.style.opacity = '0';
    if (reduced()) {
      fromEl.style.opacity = '0';
      fromEl.style.visibility = 'hidden';
      reset(toEl);
      return Promise.resolve();
    }
    var out = done(play(fromEl, [
      { opacity: 1, transform: 'scale(1)' },
      { opacity: 0, transform: 'scale(' + (o.outScale || 0.98) + ')' }
    ], { duration: d, easing: EASE_IO }));
    var into = done(play(toEl, [
      { opacity: 0, transform: 'scale(' + (o.inScale || 1.02) + ')' },
      { opacity: 1, transform: 'scale(1)' }
    ], { duration: d, delay: Math.round(d * 0.25), easing: EASE_IO }));
    return Promise.all([out, into]).then(function () {
      fromEl.style.visibility = 'hidden';
      toEl.style.opacity = '';
    });
  }

  /* --- 10 · particleDrift ---------------------------------------------------
     Slow ambient motion. Dark-only per the runtime's original contract; this
     deck is light-theme throughout and must never call it (GLOBAL-INSTRUCTIONS
     §5). Kept only so anim.js stays byte-identical to the shared runtime. */
  function particleDrift(items, o) {
    o = o || {};
    var amp = o.amp == null ? 10 : o.amp;          // px of travel
    var speed = o.speed == null ? 0.00022 : o.speed; // radians per ms
    var nodes = list(items).map(function (it, i) {
      var el = it instanceof Element ? it : it.el;
      var seed = (i * 2654435761) % 1000 / 1000;
      return {
        el: el,
        amp: (it.amp == null ? amp : it.amp) * (0.55 + seed * 0.9),
        sp:  (it.speed == null ? speed : it.speed) * (0.6 + seed * 0.8),
        px:  (it.phase == null ? seed * Math.PI * 2 : it.phase),
        py:  (it.phase == null ? seed * Math.PI * 3.1 : it.phase * 1.7),
        base: it.base || ''
      };
    });

    var handle = { stop: stop, setScale: function (v) { scale = v; }, scale: 1 };
    var scale = o.scale == null ? 1 : o.scale;
    var raf = 0, live = true, t0 = null;

    if (reduced()) { return handle; }   // static field, no drift

    function frame(t) {
      if (!live) return;
      if (t0 === null) t0 = t;
      var dt = t - t0;
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        var x = Math.sin(dt * n.sp + n.px) * n.amp * scale;
        var y = Math.cos(dt * n.sp * 0.78 + n.py) * n.amp * 0.7 * scale;
        n.el.style.transform = n.base + ' translate(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px)';
      }
      raf = requestAnimationFrame(frame);
    }
    function stop() { live = false; cancelAnimationFrame(raf); }

    raf = requestAnimationFrame(frame);
    registerLoop(handle);
    return handle;
  }

  /* --- 11 · flow ------------------------------------------------------------
     GLOBAL-INSTRUCTIONS §12: a dashed/dotted path's stroke-dashoffset looped
     slowly to convey directional information flow along a connector.
     Direction encodes meaning — `reverse` flips it (e.g. a "return" line).
     The *only* sanctioned ambient loop in this deck: kept subtle, always
     reduced-motion-aware (renders a static dashed line), and must be
     cancelled by the caller's onLeave via the returned cancel(). */
  function flow(target, o) {
    o = o || {};
    var els = list(target);
    var speed = o.speed == null ? 34 : o.speed;   // px/sec of dash travel
    var sign = o.reverse ? 1 : -1;

    if (reduced()) {
      els.forEach(function (el) { el.style.strokeDashoffset = '0'; });
      return function cancel() {};
    }

    var period = els.map(function (el) {
      var da = (getComputedStyle(el).strokeDasharray || '').trim();
      var parts = da.split(/[\s,]+/).map(parseFloat).filter(function (n) { return !isNaN(n) && n > 0; });
      if (!parts.length) parts = [2, 8];
      var sum = parts.reduce(function (a, b) { return a + b; }, 0);
      return (parts.length % 2 === 1 ? sum * 2 : sum) || 20;
    });

    var raf = 0, live = true, t0 = null;
    function tick(t) {
      if (!live) return;
      if (t0 === null) t0 = t;
      var dt = (t - t0) / 1000;
      for (var i = 0; i < els.length; i++) {
        var off = sign * ((dt * speed) % period[i]);
        els[i].style.strokeDashoffset = String(off);
      }
      raf = requestAnimationFrame(tick);
    }
    function stop() { if (!live) return; live = false; cancelAnimationFrame(raf); }

    registerLoop({ stop: stop });
    raf = requestAnimationFrame(tick);
    return stop;
  }

  /* --- helpers ------------------------------------------------------------ */

  /* Centre of an element in its offsetParent's coordinate space — the space
     converge/radiate translate in. Works for HTML and SVG children alike. */
  function centreOf(el) {
    var r = el.getBoundingClientRect();
    var parent = el.ownerSVGElement || el.offsetParent || el.parentElement;
    var pr = parent ? parent.getBoundingClientRect() : { left: 0, top: 0 };
    return { x: r.left - pr.left + r.width / 2, y: r.top - pr.top + r.height / 2 };
  }

  /* Point inside a host element, from a target element's centre. */
  function pointIn(host, el) {
    var r = el.getBoundingClientRect(), hr = host.getBoundingClientRect();
    return { x: r.left - hr.left + r.width / 2, y: r.top - hr.top + r.height / 2 };
  }

  function reset(el) {
    el.style.opacity = '';
    el.style.transform = '';
    el.style.visibility = '';
  }

  /* Run fn over els with a fixed gap; returns a promise for the last one. */
  function stagger(els, fn, ms) {
    return Promise.all(list(els).map(function (el, i) {
      return new Promise(function (res) {
        if (reduced()) { res(fn(el, i)); return; }
        setTimeout(function () { res(fn(el, i)); }, i * ms);
      });
    }));
  }

  return {
    get reduced() { return mql.matches; },
    fadeUp: fadeUp,
    scaleIn: scaleIn,
    drawPath: drawPath,
    crossFade: crossFade,
    countUp: countUp,
    converge: converge,
    radiate: radiate,
    typeIn: typeIn,
    morphSwap: morphSwap,
    particleDrift: particleDrift,
    flow: flow,
    // utilities
    centreOf: centreOf,
    pointIn: pointIn,
    stagger: stagger,
    reset: reset,
    dur: dur,
    applyInstant: applyInstant,
    registerLoop: registerLoop,
    stopAll: stopAll,
    EASE_OUT: EASE_OUT,
    EASE_IO: EASE_IO
  };
})();
