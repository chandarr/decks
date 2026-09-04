/* ==========================================================================
   Page 14 — Agentic execution (tasks/14-agentic-execution.md).
   Production line: HUMANS -> AGENTS -> QUALITY GATE -> SHIP, on a baseline.
   Base shows all four stations as a faint skeleton; steps 1-2 light AGENTS
   then HUMANS one at a time (+ role captions); step 3 is the payoff — the
   AGENTS->GATE->SHIP segment draws, flows, and a token loop streams small
   work items through the gate (each gets a check) to SHIP; step 4 lands the
   takeaway.
   ========================================================================== */

(function () {
  'use strict';

  var BASE_Y = 500, LABEL_Y = 576, SUB_Y = 600;

  var STATIONS = [
    { key: 'humans', x: 300,  label: 'HUMANS',       sub: 'intent + frontier' },
    { key: 'agents', x: 700,  label: 'AGENTS',        sub: 'build (parallel)' },
    { key: 'gate',   x: 1180, label: 'QUALITY GATE',  sub: 'verify + review' },
    { key: 'ship',   x: 1620, label: 'SHIP',          sub: '' }
  ];

  var HUMANS_X = STATIONS[0].x, AGENTS_X = STATIONS[1].x,
      GATE_X = STATIONS[2].x, SHIP_X = STATIONS[3].x;

  function skeletonStation(s) {
    return '' +
      '<g class="s14-skel-station" data-k="' + s.key + '">' +
        '<circle class="s14-skel-shape" cx="' + s.x + '" cy="' + BASE_Y + '" r="24"/>' +
        '<text class="s14-skel-label mono" x="' + s.x + '" y="' + LABEL_Y + '" text-anchor="middle">' + s.label + '</text>' +
        (s.sub ? '<text class="s14-skel-sub mono" x="' + s.x + '" y="' + SUB_Y + '" text-anchor="middle">' + s.sub + '</text>' : '') +
      '</g>';
  }

  function litHumans() {
    return '' +
      '<g class="s14-station-lit s14-station-lit--humans step" data-step="2" data-motion="none">' +
        '<circle class="s14-node s14-node--humans" cx="' + HUMANS_X + '" cy="' + BASE_Y + '" r="27"/>' +
      '</g>';
  }

  function litAgents() {
    var cx = AGENTS_X, cy = BASE_Y, s = 16, g = 6, half = s + g / 2;
    var xs = [cx - half, cx - half + s + g];
    var ys = [cy - half, cy - half + s + g];
    var nodes = '';
    ys.forEach(function (y) {
      xs.forEach(function (x) {
        nodes += '<rect class="s14-agent-node" x="' + x + '" y="' + y + '" width="' + s + '" height="' + s + '" rx="3"/>';
      });
    });
    return '' +
      '<g class="s14-station-lit s14-station-lit--agents step" data-step="1" data-motion="none">' +
        nodes +
      '</g>';
  }

  function litGate() {
    var x = GATE_X;
    return '' +
      '<g class="s14-station-lit s14-station-lit--gate step" data-step="3" data-motion="none">' +
        '<rect class="s14-gate-bar" x="' + (x - 27) + '" y="' + (BASE_Y - 28) + '" width="7" height="56" rx="3"/>' +
        '<rect class="s14-gate-bar" x="' + (x + 20) + '" y="' + (BASE_Y - 28) + '" width="7" height="56" rx="3"/>' +
        '<polyline class="s14-gate-glyph-check" points="' + (x - 14) + ',' + BASE_Y + ' ' + (x - 4) + ',' + (BASE_Y + 10) + ' ' + (x + 14) + ',' + (BASE_Y - 12) + '"/>' +
      '</g>';
  }

  function litShip() {
    var x = SHIP_X;
    return '' +
      '<g class="s14-station-lit s14-station-lit--ship step" data-step="3" data-motion="none">' +
        '<path class="s14-ship-glyph" d="M' + (x - 14) + ',' + (BASE_Y - 16) + ' L' + (x + 16) + ',' + BASE_Y + ' L' + (x - 14) + ',' + (BASE_Y + 16) + ' Z"/>' +
      '</g>';
  }

  function flowSvg() {
    var skel = STATIONS.map(skeletonStation).join('');
    return '' +
      '<svg class="s14-flow-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
        '<defs>' +
          '<marker id="s14-arrow" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">' +
            '<path d="M0,0 L9,4.5 L0,9 Z" fill="var(--ink)"/>' +
          '</marker>' +
        '</defs>' +

        '<line class="s14-baseline" x1="' + HUMANS_X + '" y1="' + BASE_Y + '" x2="' + SHIP_X + '" y2="' + BASE_Y + '"/>' +

        '<g class="s14-skel-layer">' + skel + '</g>' +

        '<path class="s14-flow-line step" data-step="3" data-motion="none" marker-end="url(#s14-arrow)" ' +
          'd="M' + AGENTS_X + ',' + BASE_Y + ' L' + SHIP_X + ',' + BASE_Y + '"/>' +

        litAgents() + litHumans() + litGate() + litShip() +

        '<text class="s14-gate-flash mono" x="' + GATE_X + '" y="404" text-anchor="middle">&#10003;</text>' +

        '<circle class="s14-token" cx="' + AGENTS_X + '" cy="' + BASE_Y + '" r="7"/>' +
        '<circle class="s14-token" cx="' + AGENTS_X + '" cy="' + BASE_Y + '" r="7"/>' +
        '<circle class="s14-token" cx="' + AGENTS_X + '" cy="' + BASE_Y + '" r="7"/>' +
      '</svg>';
  }

  function render() {
    return '' +
      Shared.kicker('How we work &middot; execution', 's14-kicker') +
      '<div class="s14-slideno mono">14</div>' +
      '<h1 class="title s14-title">Rapid, without compromising quality.</h1>' +

      '<div class="s14-core">Fast and right &mdash; not a trade-off.</div>' +

      '<div class="s14-flow">' + flowSvg() + '</div>' +

      '<div class="s14-captions">' +
        '<p class="s14-caption s14-caption--agents step" data-step="1" data-motion="none">' +
          '<b>Agents build the software</b> &mdash; pipelines, tooling, integration, tests, the orchestration plumbing. In parallel, around the clock.' +
        '</p>' +
        '<p class="s14-caption s14-caption--humans step" data-step="2" data-motion="none">' +
          '<b>Humans do the frontier</b> &mdash; research, architecture, safety judgment &mdash; and own the quality bar through review.' +
        '</p>' +
        '<p class="s14-caption s14-caption--gate step" data-step="3" data-motion="none">' +
          'Every build passes automated verification and human review before it ships. Speed from volume; quality from the gate.' +
        '</p>' +
      '</div>' +

      '<div class="s14-takeaway">' +
        Shared.carry({ step: 4, punchHtml: 'A small team of experts, amplified by agents &mdash; we move at scale without lowering the bar.' }) +
      '</div>';
  }

  /* --- token loop: work items streaming AGENTS -> GATE (check) -> SHIP --- */

  function startTokenLoop(el, stops) {
    var tokens = el.querySelectorAll('.s14-token');
    var flash = el.querySelector('.s14-gate-flash');

    if (Anim.reduced) {
      tokens.forEach(function (t, i) {
        if (i === 0) { t.setAttribute('cx', GATE_X - 16); t.style.opacity = '1'; }
        else if (i === 1) { t.setAttribute('cx', GATE_X + 40); t.style.opacity = '1'; }
        else { t.style.opacity = '0'; }
      });
      flash.classList.add('is-flash');
      return;
    }

    var live = true;
    var idx = 0;

    function fire() {
      if (!live) return;
      var t = tokens[idx % tokens.length];
      idx++;
      Anim.reset(t);
      t.style.opacity = '0';
      Anim.scaleIn(t, { duration: 300, fadeFrom: 0, lift: false });

      var toGate = setTimeout(function () {
        if (!live) return;
        Anim.converge(t, { x: GATE_X, y: BASE_Y }, { duration: 500, fade: false });
      }, 300);

      var flashOn = setTimeout(function () {
        if (!live) return;
        flash.classList.remove('is-flash');
        void flash.offsetWidth;
        flash.classList.add('is-flash');
      }, 830);

      var flashOff = setTimeout(function () {
        if (!live) return;
        flash.classList.remove('is-flash');
      }, 1120);

      var toShip = setTimeout(function () {
        if (!live) return;
        Anim.converge(t, { x: SHIP_X, y: BASE_Y }, { duration: 480 });
      }, 950);

      stops.push(function () {
        clearTimeout(toGate); clearTimeout(flashOn); clearTimeout(flashOff); clearTimeout(toShip);
      });
    }

    fire();
    var id = setInterval(fire, 900);
    stops.push(function () {
      live = false;
      clearInterval(id);
      tokens.forEach(function (t) { Anim.reset(t); t.style.opacity = '0'; });
      flash.classList.remove('is-flash');
    });
  }

  function onEnter(el) { el._s14stops = []; }

  function onStep(el, i, o) {
    if (i === 1) {
      Anim.scaleIn(el.querySelectorAll('.s14-station-lit--agents .s14-agent-node'), {
        stagger: Anim.dur(o, 60), duration: Anim.dur(o, 360), fadeFrom: 0, lift: false
      });
      Anim.fadeUp(el.querySelector('.s14-caption--agents'), { duration: Anim.dur(o, 450), delay: Anim.dur(o, 150) });
    }

    if (i === 2) {
      Anim.scaleIn(el.querySelector('.s14-station-lit--humans'), { duration: Anim.dur(o, 400), fadeFrom: 0, lift: false });
      Anim.fadeUp(el.querySelector('.s14-caption--humans'), { duration: Anim.dur(o, 450), delay: Anim.dur(o, 150) });
    }

    if (i === 3) {
      Anim.scaleIn(el.querySelector('.s14-station-lit--gate'), { duration: Anim.dur(o, 400), fadeFrom: 0, lift: false });
      Anim.scaleIn(el.querySelector('.s14-station-lit--ship'), { duration: Anim.dur(o, 400), delay: Anim.dur(o, 140), fadeFrom: 0, lift: false });
      Anim.fadeUp(el.querySelector('.s14-caption--gate'), { duration: Anim.dur(o, 450), delay: Anim.dur(o, 220) });

      var line = el.querySelector('.s14-flow-line');
      Anim.drawPath(line, { duration: Anim.dur(o, 650) }).then(function () {
        if (!el.isConnected) return;
        el._s14stops.push(Anim.flow(line, { speed: 40 }));
        startTokenLoop(el, el._s14stops);
      });
    }

    if (i === 4) {
      Anim.fadeUp(el.querySelector('.carry-punch'), { duration: Anim.dur(o, 550) });
    }
  }

  function onLeave(el) {
    (el._s14stops || []).forEach(function (stop) { stop(); });
    el._s14stops = [];
  }

  page({
    id: '14-agentic-execution',
    title: 'Agentic execution',
    theme: 'light',
    steps: 4,
    render: render,
    onEnter: onEnter,
    onStep: onStep,
    onLeave: onLeave
  });
})();
