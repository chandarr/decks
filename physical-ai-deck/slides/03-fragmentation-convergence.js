/* ==========================================================================
   Page 03 — Current state & projected future (tasks/03-fragmentation-convergence.md).

   Beats: 0 base (title, the temporal marker, the tagline — an empty field) ·
   1 MODEL MAKERS · 2 EMBODIMENT MAKERS (+ the asterisk) · 3 COMPUTE PROVIDERS
   — one pole per advance, each arriving in its own tinted field (§13) ·
   4 the middle: the scramble radiates into the gap the three poles leave,
   then the verdict card lands on it ·
   5 the payoff: the scramble compresses into the outlined ORCHESTRATORS box,
   APPLICATIONS appears above it, the poles reshape into feeder boxes, the
   marker flips to PROJECTED FUTURE · 6 the flows connect, last and together.

   Two implementation notes (see the build report):
   · The scramble is an HTML layer, not SVG. Anim.converge measures in CSS px
     (getBoundingClientRect) and writes the same number into a transform; on
     an SVG child that transform is read as *user units*, so the collapse only
     lands at exactly 1920px of stage. In HTML both spaces are the same and
     the compression is correct at every window size.
   · Beat 3 uses the task file's two-stage fallback: converge gathers the
     nodes into a loose central knot, then the layer settles that knot into
     the box with the grey→ink recolour. ~1.02s in total.
   ========================================================================== */

(function () {
  'use strict';

  /* --- geometry (1920×1080 design px) ------------------------------------ */

  var ORCH = { x: 730, y: 415, w: 460, h: 110 };            // centre 960,470
  var APPS = { x: 790, y: 262, w: 340, h: 76 };             // centre 960,300
  var FEEDER = {
    model:      { x: 229,  y: 434, w: 210, h: 72 },         // centre 334,470
    embodiment: { x: 1410, y: 434, w: 250, h: 72 },         // centre 1535,470
    compute:    { x: 830,  y: 690, w: 260, h: 68 }          // centre 960,724
  };
  var ORCH_C = { x: 960, y: 470 };

  /* --- the node dataset (tasks/03 · "Data / graphics") -------------------- */
  /* MODEL — cloud, left. Positions are hand-placed so real company names stay
     legible and un-gridded; a phyllotaxis scatter collides its own labels. */
  var MODEL = [
    { n: 'Physical Intelligence',        size: 'l', x: 208, y: 366 },
    { n: 'Skild AI',                     size: 'm', x: 404, y: 392 },
    { n: 'DeepMind &middot; Gemini Robotics', size: 'm', x: 190, y: 424 },
    { n: 'World Labs',                   size: 's', x: 416, y: 462 },
    { n: 'Toyota &middot; LBM',          size: 's', x: 198, y: 480 },
    { n: 'Wayve',                        size: 's', x: 258, y: 528 },
    { n: 'open weights (VLA)',           size: 's', x: 326, y: 578 }
  ];
  /* EMBODIMENT — cloud, right. MANY bodies. Tesla and Figure are deliberately
     absent: they are the asterisk line, not members of this cloud. */
  var EMBODIMENT = [
    { n: '1X',               size: 'm', x: 1352, y: 356 },
    { n: 'Apptronik',        size: 'm', x: 1340, y: 386 },
    { n: 'Agility',          size: 's', x: 1360, y: 416 },
    { n: 'Boston Dynamics',  size: 's', x: 1346, y: 446 },
    { n: 'Sanctuary',        size: 's', x: 1356, y: 476 },
    { n: 'Neura',            size: 's', x: 1338, y: 506 },
    { n: 'Unitree',          size: 'm', x: 1358, y: 536 },
    { n: 'AgiBot',           size: 's', x: 1344, y: 566 },
    { n: 'UBTech',           size: 's', x: 1362, y: 596 },
    { n: 'Fourier',          size: 's', x: 1600, y: 370 },
    { n: 'Galbot',           size: 's', x: 1586, y: 400 },
    { n: 'ABB',              size: 's', x: 1604, y: 430 },
    { n: 'KUKA',             size: 's', x: 1590, y: 460 },
    { n: 'FANUC',            size: 's', x: 1602, y: 490 },
    { n: 'Universal Robots', size: 's', x: 1588, y: 520 },
    { n: 'Symbotic',         size: 's', x: 1598, y: 550 },
    { n: 'ANYbotics',        size: 's', x: 1584, y: 580 }
  ];
  /* COMPUTE — cloud, bottom-centre. Wide and flat so it sits where the future
     COMPUTE box sits (AC's refinement: the block never has to travel). */
  var COMPUTE = [
    { n: 'NVIDIA &middot; Jetson Thor', size: 'l', x: 640,  y: 710 },
    { n: 'Qualcomm',   size: 'm', x: 896,  y: 710 },
    { n: 'AMD',        size: 's', x: 1046, y: 710 },
    { n: 'Hailo',      size: 's', x: 1140, y: 710 },
    { n: 'Ambarella',  size: 's', x: 1222, y: 710 },
    { n: 'Luxonis',    size: 's', x: 700,  y: 744 },
    { n: 'Stereolabs', size: 's', x: 856,  y: 744 },
    { n: 'Prophesee',  size: 's', x: 1040, y: 744 },
    { n: 'Ouster',     size: 's', x: 1210, y: 744 }
  ];

  /* SWARM — the fragmented middle. 22 real companies, densely and irregularly
     scattered with no home. Positions are hand-seeded (stable across replays)
     on six loose bands with per-node jitter, so the block reads as a scramble
     rather than a table while every mono label stays readable at 1920×1080.
     `lbl:false` drops a node to a bare dot — the task file's legibility
     fallback, if the labelled version ever reads cluttered on the projector. */
  var SWARM = [
    { n: 'XDOF',            subfn: 'capture',   size: 'm', x: 678,  y: 313, lbl: true },
    { n: 'Extend Robotics', subfn: 'capture',   size: 's', x: 880,  y: 302, lbl: true },
    { n: 'SKY ENGINE AI',   subfn: 'synthdata', size: 's', x: 1090, y: 318, lbl: true },
    { n: 'Cogito Tech',     subfn: 'capture',   size: 's', x: 702,  y: 352, lbl: true },
    { n: 'Scale &middot; Mercor', subfn: 'data', size: 'm', x: 898, y: 340, lbl: true },
    { n: 'Rendered.ai',     subfn: 'synthdata', size: 's', x: 1148, y: 353, lbl: true },
    { n: 'Genesis',         subfn: 'sim',       size: 'm', x: 660,  y: 384, lbl: true },
    { n: 'HaptX',           subfn: 'capture',   size: 's', x: 812,  y: 376, lbl: true },
    { n: 'Anyverse',        subfn: 'synthdata', size: 's', x: 938,  y: 388, lbl: true },
    { n: 'Labellerr',       subfn: 'data',      size: 's', x: 1128, y: 380, lbl: true },
    { n: 'Adamo',           subfn: 'capture',   size: 's', x: 692,  y: 419, lbl: true },
    { n: 'Unity Robotics',  subfn: 'sim',       size: 's', x: 798,  y: 409, lbl: true },
    { n: 'Encord',          subfn: 'data',      size: 's', x: 1000, y: 422, lbl: true },
    { n: 'FORT Robotics',   subfn: 'safety',    size: 's', x: 1120, y: 412, lbl: true },
    { n: 'Viam',            subfn: 'fleet',     size: 'm', x: 670,  y: 454, lbl: true },
    { n: 'Formant',         subfn: 'fleet',     size: 's', x: 788,  y: 444, lbl: true },
    { n: 'Troveo',          subfn: 'data',      size: 's', x: 928,  y: 457, lbl: true },
    { n: 'DataMesh',        subfn: 'sim',       size: 's', x: 1058, y: 448, lbl: true },
    { n: 'Edge Impulse',    subfn: 'safety',    size: 's', x: 698,  y: 488, lbl: true },
    { n: 'InOrbit',         subfn: 'fleet',     size: 's', x: 878,  y: 478, lbl: true },
    { n: 'Foxglove',        subfn: 'fleet',     size: 's', x: 1008, y: 492, lbl: true },
    { n: 'Open-RMF',        subfn: 'fleet',     size: 's', x: 1148, y: 481, lbl: true }
  ];

  var R = { l: 7, m: 5, s: 3 };          // SVG cloud-node radius
  var DOT = { l: 14, m: 10, s: 6 };      // HTML scramble dot diameter

  /* --- helpers ------------------------------------------------------------ */

  function seeded(i) {
    var x = Math.sin(i * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  }

  /* --- markup ------------------------------------------------------------- */

  function cloudNodes(list, cls) {
    return list.map(function (d) {
      var r = R[d.size];
      return '<circle class="s03-node ' + cls + '" cx="' + d.x + '" cy="' + d.y + '" r="' + r + '"/>' +
             '<text class="s03-nodelbl" x="' + (d.x + r + 8) + '" y="' + (d.y + 5) + '">' + d.n + '</text>';
    }).join('');
  }

  function cloud(key, hull, label, sub, subY, list, cls, step) {
    var cx = hull.x + hull.w / 2;
    return '<g class="s03-cloud step" data-key="' + key + '" data-step="' + step +
      '" data-motion="none">' +
      '<rect class="s03-hull" x="' + hull.x + '" y="' + hull.y + '" width="' + hull.w +
        '" height="' + hull.h + '" rx="' + (hull.rx || 54) + '"/>' +
      '<text class="s03-polelbl" x="' + cx + '" y="' + hull.lblY + '" text-anchor="middle">' + label + '</text>' +
      cloudNodes(list, cls) +
      '<text class="s03-polesub" x="' + cx + '" y="' + subY + '" text-anchor="middle">' + sub + '</text>' +
    '</g>';
  }

  function scrambleMarkup() {
    return SWARM.map(function (d, i) {
      var sz = DOT[d.size];
      var lbl = d.lbl ? '<span class="s03-sclbl">' + d.n + '</span>' : '';
      return '<div class="s03-sc" data-subfn="' + d.subfn + '" data-i="' + i + '"' +
        ' style="left:calc(' + (d.x - sz / 2) + ' * var(--px));' +
        ' top:calc(' + (d.y - 9) + ' * var(--px))">' +
        '<span class="s03-dot s03-dot--' + d.size + '"></span>' + lbl +
      '</div>';
    }).join('');
  }

  function box(key, g, cls, label, lblSize, step) {
    var cx = g.x + g.w / 2;
    return '<g class="s03-fut-grp step" data-step="' + step + '" data-motion="none" data-fut="' + key + '">' +
      '<rect class="s03-box ' + cls + '" x="' + g.x + '" y="' + g.y + '" width="' + g.w +
        '" height="' + g.h + '" rx="9"/>' +
      '<text class="s03-boxlbl ' + lblSize + '" x="' + cx + '" y="' + (g.y + g.h / 2 + 8) +
        '" text-anchor="middle">' + label + '</text>' +
    '</g>';
  }

  function flows() {
    var lines = [
      'M439,470 L714,470',      // models  → orchestrator
      'M1410,470 L1206,470',    // bodies  → orchestrator
      'M960,690 L960,541',      // compute → orchestrator (up)
      'M960,415 L960,354'       // orchestrator → applications (up)
    ].map(function (d) { return '<path class="s03-flowline" d="' + d + '"/>'; }).join('');
    var heads = [
      'M714,461 L731,470 L714,479 Z',
      'M1206,461 L1189,470 L1206,479 Z',
      'M951,542 L960,525 L969,542 Z',
      'M951,355 L960,338 L969,355 Z'
    ].map(function (d) { return '<path class="s03-arrowhead" d="' + d + '"/>'; }).join('');
    return '<g class="s03-fut-grp step" data-step="6" data-motion="none" data-fut="flows">' +
      lines + heads + '</g>';
  }

  function render() {
    return '' +
      Shared.kicker('Current state &amp; projected future', 's03-kicker') +
      '<div class="s03-slideno mono">03</div>' +

      '<h1 class="title s03-title">From a scramble to a stack.</h1>' +

      '<div class="s03-marker mono">' +
        '<span class="s03-marker-cur is-active">CURRENT STATE</span>' +
        '<span class="s03-marker-arrow">&#9654;</span>' +
        '<span class="s03-marker-fut">PROJECTED FUTURE</span>' +
      '</div>' +

      '<div class="s03-diagram">' +
        '<svg class="s03-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +

          '<g class="s03-clouds">' +
            cloud('model', { x: 150, y: 330, w: 370, h: 286, lblY: 300 },
              'MODEL MAKERS', 'frontier &amp; open models', 644, MODEL, 's03-node--model', 1) +
            cloud('embodiment', { x: 1300, y: 326, w: 470, h: 300, lblY: 300 },
              'EMBODIMENT MAKERS', 'many bodies', 654, EMBODIMENT, 's03-node--embodiment', 2) +
            cloud('compute', { x: 610, y: 690, w: 700, h: 68, rx: 32, lblY: 676 },
              'COMPUTE PROVIDERS', 'edge + cloud', 786, COMPUTE, 's03-node--compute', 3) +
          '</g>' +

          '<text class="s03-ast step" data-step="2" data-motion="none" x="1824" y="722" text-anchor="end">' +
            '* Tesla &middot; Figure &mdash; a few players trying to do both.</text>' +

          box('orch', ORCH, 's03-box--orch', 'ORCHESTRATORS', 's03-boxlbl--orch', 5) +
          box('apps', APPS, 's03-box--apps', 'APPLICATIONS', 's03-boxlbl--apps', 5) +
          box('model', FEEDER.model, 's03-box--model', 'MODELS', 's03-boxlbl--model', 5) +
          box('embodiment', FEEDER.embodiment, 's03-box--embodiment', 'EMBODIMENT', 's03-boxlbl--embodiment', 5) +
          box('compute', FEEDER.compute, 's03-box--compute', 'COMPUTE', 's03-boxlbl--compute', 5) +

          flows() +

          '<g class="s03-fut-grp step" data-step="6" data-motion="none" data-fut="mark">' +
            '<rect class="s03-mark" x="766" y="460" width="20" height="20" rx="3" transform="rotate(45 776 470)"/>' +
            '<circle class="s03-mark-dot" cx="776" cy="470" r="4"/>' +
          '</g>' +
        '</svg>' +

        '<div class="s03-scramble step" data-step="4" data-motion="none">' +
          scrambleMarkup() + '</div>' +
      '</div>' +

      '<div class="s03-midcap step" data-step="4" data-motion="none">' +
        '<p>Everyone owns a slice &mdash; capture, sim, data, fleet, safety. Nobody composes them.</p></div>' +

      '<div class="s03-bottom">' +
        '<div class="s03-tagline">Physical AI today &mdash; three poles, and a scramble in the middle.</div>' +
        '<div class="s03-takeaway">' +
          Shared.carry({ step: 5, punchHtml: 'When the model stops being the moat, the one who composes the middle wins. That seat is open &mdash; and it&rsquo;s ours.' }) +
        '</div>' +
      '</div>';
  }

  /* --- beats -------------------------------------------------------------- */

  function dl(o, ms) { return (o && o.static) ? 0 : ms; }

  /* Anim.converge wants its centre in the same CSS-px space it measures the
     elements in — design units × the stage's current scale. */
  function orchCentre(layer) {
    var k = layer.clientWidth / 1920;
    return { x: ORCH_C.x * k, y: ORCH_C.y * k };
  }

  /* Every reveal beat leaves a committed inline opacity/transform on what it
     animated (a settled WAAPI animation writes its end state inline), and that
     outranks the class rules this function toggles. So clear the inline state
     first, then let .is-gone / .is-ink drive the transition — which also makes
     the whole resolve reversible by simply dropping the classes again. */
  function setResolved(el, on) {
    Anim.stopAll(el);
    var reset = el.querySelectorAll('.s03-cloud, .s03-midcap, .s03-sc');
    for (var i = 0; i < reset.length; i++) Anim.reset(reset[i]);

    el.querySelector('.s03-clouds').classList.toggle('is-gone', on);
    el.querySelector('.s03-midcap').classList.toggle('is-gone', on);
    el.querySelector('.s03-marker-cur').classList.toggle('is-active', !on);
    el.querySelector('.s03-marker-fut').classList.toggle('is-active', on);
    el.querySelector('.s03-tagline').classList.toggle('is-gone', on);
    el.querySelector('.s03-scramble').classList.toggle('is-ink', on);
    // the compression itself is staged (see beat 5); only the undo is here
    if (!on) el.querySelector('.s03-scramble').classList.remove('is-compressed');
  }

  function stopFlows(el) {
    (el._s03flows || []).forEach(function (stop) { try { stop(); } catch (e) {} });
    el._s03flows = [];
  }

  function onEnter(el) {
    el._s03flows = [];
    el._s03timers = [];

    if (Anim.reduced) {
      // GLOBAL §5 / task spec: the resolved future, at rest, no travel.
      el.classList.add('s03-reduced');
      el.querySelector('.s03-marker-cur').classList.remove('is-active');
      el.querySelector('.s03-marker-fut').classList.add('is-active');
      return;
    }

    /* The engine only calls onStep going forward; Back just un-sets .is-shown.
       The three pole beats reverse on their own now (each cloud is its own
       .step), so the observer is left with the two states the page owns: the
       resolve, and the flow loops. */
    var orchGrp = el.querySelector('.s03-fut-grp[data-fut="orch"]');
    var flowGrp = el.querySelector('.s03-fut-grp[data-fut="flows"]');
    var obs = new MutationObserver(function () {
      if (!flowGrp.classList.contains('is-shown')) stopFlows(el);
      if (orchGrp.classList.contains('is-shown')) return;
      if (!el.querySelector('.s03-clouds').classList.contains('is-gone')) return;

      (el._s03timers || []).forEach(clearTimeout);
      el._s03timers = [];
      Anim.applyInstant(el, { static: true }, function () { setResolved(el, false); });
    });
    obs.observe(el, { attributes: true, attributeFilter: ['class'], subtree: true });
    el._s03obs = obs;
  }

  var POLE_BEAT = { 1: 'model', 2: 'embodiment', 3: 'compute' };

  function onStep(el, i, o) {
    /* 1–3 — one pole per advance, each arriving in its own tinted field (§13).
       The asterisk rides in with the embodiment cloud it annotates. */
    if (POLE_BEAT[i]) {
      Anim.scaleIn(el.querySelector('.s03-cloud[data-key="' + POLE_BEAT[i] + '"]'),
        { duration: Anim.dur(o, 520), from: 0.95, lift: false });
      if (i === 2) Anim.fadeUp(el.querySelector('.s03-ast'), { duration: Anim.dur(o, 400), delay: dl(o, 260) });
    }

    /* 4 — the middle. The scramble scatters outward from the seat nobody
       owns (radiate, staggered so the nodes arrive un-together — the exact
       inverse of the beat-5 converge: the argument runs in reverse). The
       verdict card then lands on it. */
    if (i === 4) {
      var mid = el.querySelector('.s03-scramble');
      Anim.radiate(el.querySelectorAll('.s03-sc'), orchCentre(mid), {
        duration: Anim.dur(o, 620), stagger: Anim.dur(o, 22), from: 0.35
      });
      Anim.scaleIn(el.querySelector('.s03-midcap'),
        { duration: Anim.dur(o, 420), delay: dl(o, 760), from: 0.94, lift: false });
    }

    /* 5 — the resolve, and the page's one long beat. Two-stage compression
       (task file's fallback): gather into a loose knot, then settle that knot
       into the outlined box. Paced ~2.6s end to end and staged so each move
       reads on its own — the task file's "under ~1.2s" was too quick to
       follow at the back of a room (founder call). The phases:

         0.00  the current state withdraws (clouds, tagline, card)
         0.00  the scramble gathers to a knot        (converge, 850ms)
         0.90  the knot settles into the box         (CSS, 750ms)
         1.20  ORCHESTRATORS scales in
         1.42  the three feeders arrive, staggered
         1.82  APPLICATIONS lands on top, clear of the last feeder
         2.08  the takeaway

       setResolved cancels beat 4's animations first — one still in flight
       would keep filling opacity above everything this beat sets. */
    if (i === 5) {
      setResolved(el, true);

      var layer = el.querySelector('.s03-scramble');
      Anim.converge(el.querySelectorAll('.s03-sc'), orchCentre(layer), {
        duration: Anim.dur(o, 850), stagger: Anim.dur(o, 14), scale: 0.55, fade: false
      });

      var settle = function () { layer.classList.add('is-compressed'); };
      if (o && o.static) Anim.applyInstant(el, o, settle);
      else el._s03timers.push(setTimeout(settle, 900));

      Anim.scaleIn(el.querySelector('.s03-fut-grp[data-fut="orch"]'),
        { duration: Anim.dur(o, 650), delay: dl(o, 1200), from: 0.94, lift: false });
      Anim.fadeUp([
        el.querySelector('.s03-fut-grp[data-fut="model"]'),
        el.querySelector('.s03-fut-grp[data-fut="embodiment"]'),
        el.querySelector('.s03-fut-grp[data-fut="compute"]')
      ], { duration: Anim.dur(o, 560), delay: dl(o, 1420), stagger: Anim.dur(o, 130) });
      Anim.fadeUp(el.querySelector('.s03-fut-grp[data-fut="apps"]'),
        { duration: Anim.dur(o, 560), delay: dl(o, 1820), distance: -10 });

      Anim.fadeUp(el.querySelector('.carry-punch'), { duration: Anim.dur(o, 650), delay: dl(o, 2080) });
    }

    /* 6 — the flows connect: last, and together (§13). */
    if (i === 6) {
      stopFlows(el);
      Anim.fadeUp([
        el.querySelector('.s03-fut-grp[data-fut="flows"]'),
        el.querySelector('.s03-fut-grp[data-fut="mark"]')
      ], { duration: Anim.dur(o, 420), distance: 0 });
      el._s03flows.push(Anim.flow(el.querySelectorAll('.s03-flowline'), { speed: 26 }));
    }
  }

  function onLeave(el) {
    stopFlows(el);
    (el._s03timers || []).forEach(clearTimeout);
    el._s03timers = [];
    if (el._s03obs) { el._s03obs.disconnect(); el._s03obs = null; }
  }

  page({
    id: '03-fragmentation-convergence',
    title: 'Current state & projected future',
    theme: 'light',
    steps: 6,
    render: render,
    onEnter: onEnter,
    onStep: onStep,
    onLeave: onLeave
  });
})();
