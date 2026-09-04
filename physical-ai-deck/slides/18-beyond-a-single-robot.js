/* ==========================================================================
   Page 18 — Beyond a single robot (tasks/18-beyond-a-single-robot.md).
   Act V, penultimate page. Callback to slide 04's hub-flow, now drawn as a
   single machine's environment: core "ONE MACHINE" at rest (calm) → several
   environment-system nodes radiate out around it (§13 one beat, grouped,
   per the task) → the orchestration lines draw on then flow to the core,
   the same capability at environment scale, LAST (§13 payoff) → examples
   + takeaway close the central band.

   Steps: 0 base (core alone) · 1 environment nodes radiate out · 2 ink
   orchestration lines draw-on then flow to the core (payoff) · 3 examples
   row + takeaway.
   ========================================================================== */

(function () {
  'use strict';

  var CORE = { x: 960, y: 460 };
  var RING_R = 150;   // node centres from CORE
  var CORE_R = 26;
  var NODE_R = 10;

  var NODES = [
    { key: 'gate', label: 'Gate', angle: 234, anchor: 'end', lx: -24, ly: -24 },
    { key: 'arm', label: 'Arm', angle: -54, anchor: 'start', lx: 24, ly: -24 },
    { key: 'conveyor', label: 'Conveyor', angle: 18, anchor: 'start', lx: 26, ly: 6 },
    { key: 'instrument', label: 'Instrument', angle: 90, anchor: 'middle', lx: 0, ly: 34 },
    { key: 'valve', label: 'Valve', angle: 162, anchor: 'end', lx: -26, ly: 6 }
  ];

  function rad(deg) { return deg * Math.PI / 180; }
  function pt(r, angle) {
    var a = rad(angle);
    return { x: CORE.x + r * Math.cos(a), y: CORE.y + r * Math.sin(a) };
  }

  function nodesSvg() {
    return NODES.map(function (n) {
      var c = pt(RING_R, n.angle);
      return '' +
        '<g class="s18-envnode" data-node="' + n.key + '">' +
          '<circle class="s18-envdot" cx="' + c.x + '" cy="' + c.y + '" r="' + NODE_R + '"/>' +
          '<text class="s18-envlbl" x="' + (c.x + n.lx) + '" y="' + (c.y + n.ly) + '" text-anchor="' + n.anchor + '">' + n.label + '</text>' +
        '</g>';
    }).join('');
  }

  function linesSvg() {
    return NODES.map(function (n) {
      var s = pt(CORE_R, n.angle), e = pt(RING_R - NODE_R, n.angle);
      return '<line class="s18-line step" data-step="2" data-motion="none" data-node="' + n.key + '" x1="' + s.x + '" y1="' + s.y + '" x2="' + e.x + '" y2="' + e.y + '"/>';
    }).join('');
  }

  function render() {
    return '' +
      Shared.kicker('The horizon', 's18-kicker') +
      '<div class="s18-slideno mono">18</div>' +

      '<h1 class="title s18-title">Physical AI is bigger than a robot.</h1>' +

      '<div class="s18-diagram">' +
        '<svg class="s18-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +

          '<g class="s18-lines">' + linesSvg() + '</g>' +

          '<g class="s18-envgrp step" data-step="1" data-motion="none">' + nodesSvg() + '</g>' +

          '<circle class="s18-core" cx="' + CORE.x + '" cy="' + CORE.y + '" r="' + CORE_R + '"/>' +
          '<text class="s18-corelbl mono" x="' + CORE.x + '" y="' + (CORE.y + CORE_R + 30) + '" text-anchor="middle">ONE MACHINE</text>' +

          '<text class="s18-expansion step" data-step="1" data-motion="none" x="' + CORE.x + '" y="270" text-anchor="middle">The embodiment becomes the environment &mdash; many machines, one goal.</text>' +

          '<text class="s18-orchline step" data-step="2" data-motion="none" x="' + CORE.x + '" y="675" text-anchor="middle">The same orchestration that composes a robot composes a whole environment.</text>' +

        '</svg>' +
      '</div>' +

      '<div class="s18-examples mono step" data-step="3" data-motion="none">Intelligent warehouses &middot; self-driving labs &middot; orchestrated fleets</div>' +

      '<div class="s18-takeaway">' +
        Shared.carry({ step: 3, punchHtml: 'We compose machines today &mdash; and intelligent environments tomorrow.' }) +
      '</div>';
  }

  function onEnter(el) {
    el._s18flowStop = null;
  }

  function onStep(el, i, o) {
    if (i === 1) {
      var nodeEls = el.querySelectorAll('.s18-envnode');
      var coreEl = el.querySelector('.s18-core');
      Anim.radiate(nodeEls, Anim.centreOf(coreEl), { duration: Anim.dur(o, 800), stagger: Anim.dur(o, 60) });
      Anim.fadeUp(el.querySelector('.s18-expansion'), { delay: Anim.dur(o, 250), duration: Anim.dur(o, 450) });
    }

    if (i === 2) {
      var core = el.querySelector('.s18-core');
      if (core) core.classList.add('is-orchestrating');

      Anim.fadeUp(el.querySelector('.s18-orchline'), { duration: Anim.dur(o, 450) });

      var lines = el.querySelectorAll('.s18-line');
      Anim.drawPath(lines, { duration: Anim.dur(o, 700), stagger: Anim.dur(o, 70) }).then(function () {
        if (!el.isConnected) return;
        lines.forEach(function (line) { line.style.strokeDasharray = '2 8'; });
        el._s18flowStop = Anim.flow(lines, { speed: 26 });
      });
    }

    if (i === 3) {
      Anim.fadeUp(el.querySelector('.s18-examples'), { duration: Anim.dur(o, 450) });
      var punch = el.querySelector('.carry-punch');
      Anim.fadeUp(punch, { delay: Anim.dur(o, 200), duration: Anim.dur(o, 500) });
    }
  }

  function onLeave(el) {
    if (el._s18flowStop) { el._s18flowStop(); el._s18flowStop = null; }
  }

  page({
    id: '18-beyond-a-single-robot',
    title: 'Beyond a single robot',
    theme: 'light',
    steps: 3,
    render: render,
    onEnter: onEnter,
    onStep: onStep,
    onLeave: onLeave
  });
})();
