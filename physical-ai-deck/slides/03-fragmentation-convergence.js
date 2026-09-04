/* ==========================================================================
   Page 03 — Current state & projected future (tasks/03-fragmentation-convergence.md).

   Beats: 0 base (today — three real named clouds around a homeless grey
   scramble) · 1 the poles gain gravity, one at a time · 2 the scramble gets
   its own beat · 3 the payoff: the scramble compresses into the outlined
   ORCHESTRATORS box, APPLICATIONS appears above it, the poles reshape into
   feeder boxes, the marker flips to PROJECTED FUTURE · 4 the flows connect,
   last and together.

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
    compute:    { x: 830,  y: 650, w: 260, h: 76 }          // centre 960,688
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
    { n: 'NVIDIA &middot; Jetson Thor', size: 'l', x: 640,  y: 672 },
    { n: 'Qualcomm',   size: 'm', x: 896,  y: 672 },
    { n: 'AMD',        size: 's', x: 1046, y: 672 },
    { n: 'Hailo',      size: 's', x: 1140, y: 672 },
    { n: 'Ambarella',  size: 's', x: 1222, y: 672 },
    { n: 'Luxonis',    size: 's', x: 700,  y: 706 },
    { n: 'Stereolabs', size: 's', x: 856,  y: 706 },
    { n: 'Prophesee',  size: 's', x: 1040, y: 706 },
    { n: 'Ouster',     size: 's', x: 1210, y: 706 }
  ];

  /* SWARM — the fragmented middle. 22 real companies, densely and irregularly
     scattered with no home. Positions are hand-seeded (stable across replays)
     on six loose bands with per-node jitter, so the block reads as a scramble
     rather than a table while every mono label stays readable at 1920×1080.
     `lbl:false` drops a node to a bare dot — the task file's legibility
     fallback, if the labelled version ever reads cluttered on the projector. */
  var SWARM = [
    { n: 'XDOF',            subfn: 'capture',   size: 'm', x: 678,  y: 316, lbl: true },
    { n: 'Extend Robotics', subfn: 'capture',   size: 's', x: 880,  y: 302, lbl: true },
    { n: 'SKY ENGINE AI',   subfn: 'synthdata', size: 's', x: 1090, y: 322, lbl: true },
    { n: 'Cogito Tech',     subfn: 'capture',   size: 's', x: 702,  y: 364, lbl: true },
    { n: 'Scale &middot; Mercor', subfn: 'data', size: 'm', x: 898, y: 350, lbl: true },
    { n: 'Rendered.ai',     subfn: 'synthdata', size: 's', x: 1148, y: 366, lbl: true },
    { n: 'Genesis',         subfn: 'sim',       size: 'm', x: 660,  y: 404, lbl: true },
    { n: 'HaptX',           subfn: 'capture',   size: 's', x: 812,  y: 394, lbl: true },
    { n: 'Anyverse',        subfn: 'synthdata', size: 's', x: 938,  y: 410, lbl: true },
    { n: 'Labellerr',       subfn: 'data',      size: 's', x: 1128, y: 400, lbl: true },
    { n: 'Adamo',           subfn: 'capture',   size: 's', x: 692,  y: 448, lbl: true },
    { n: 'Unity Robotics',  subfn: 'sim',       size: 's', x: 798,  y: 436, lbl: true },
    { n: 'Encord',          subfn: 'data',      size: 's', x: 1000, y: 452, lbl: true },
    { n: 'FORT Robotics',   subfn: 'safety',    size: 's', x: 1120, y: 440, lbl: true },
    { n: 'Viam',            subfn: 'fleet',     size: 'm', x: 670,  y: 492, lbl: true },
    { n: 'Formant',         subfn: 'fleet',     size: 's', x: 788,  y: 480, lbl: true },
    { n: 'Troveo',          subfn: 'data',      size: 's', x: 928,  y: 496, lbl: true },
    { n: 'DataMesh',        subfn: 'sim',       size: 's', x: 1058, y: 484, lbl: true },
    { n: 'Edge Impulse',    subfn: 'safety',    size: 's', x: 698,  y: 534, lbl: true },
    { n: 'InOrbit',         subfn: 'fleet',     size: 's', x: 878,  y: 522, lbl: true },
    { n: 'Foxglove',        subfn: 'fleet',     size: 's', x: 1008, y: 540, lbl: true },
    { n: 'Open-RMF',        subfn: 'fleet',     size: 's', x: 1148, y: 526, lbl: true }
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

  function cloud(key, hull, label, sub, subY, list, cls) {
    var cx = hull.x + hull.w / 2;
    return '<g class="s03-cloud" data-key="' + key + '">' +
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
      'M960,650 L960,541',      // compute → orchestrator (up)
      'M960,415 L960,354'       // orchestrator → applications (up)
    ].map(function (d) { return '<path class="s03-flowline" d="' + d + '"/>'; }).join('');
    var heads = [
      'M714,461 L731,470 L714,479 Z',
      'M1206,461 L1189,470 L1206,479 Z',
      'M951,542 L960,525 L969,542 Z',
      'M951,355 L960,338 L969,355 Z'
    ].map(function (d) { return '<path class="s03-arrowhead" d="' + d + '"/>'; }).join('');
    return '<g class="s03-fut-grp step" data-step="4" data-motion="none" data-fut="flows">' +
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

          /* step flags the back-nav observer reads — the engine only tells a
             page it moved *forward*, so reversing is detected from these. */
          '<g class="s03-beat1 step" data-step="1" data-motion="none"></g>' +

          '<g class="s03-clouds">' +
            cloud('model', { x: 150, y: 330, w: 370, h: 286, lblY: 300 },
              'MODEL MAKERS', 'frontier &amp; open models', 644, MODEL, 's03-node--model') +
            cloud('embodiment', { x: 1300, y: 326, w: 470, h: 300, lblY: 300 },
              'EMBODIMENT MAKERS', 'many bodies', 654, EMBODIMENT, 's03-node--embodiment') +
            cloud('compute', { x: 610, y: 650, w: 700, h: 76, rx: 34, lblY: 636 },
              'COMPUTE PROVIDERS', 'edge + cloud', 750, COMPUTE, 's03-node--compute') +
          '</g>' +

          '<text class="s03-ast" x="1824" y="690" text-anchor="end">' +
            '* Tesla &middot; Figure &mdash; a few players trying to do both.</text>' +

          box('orch', ORCH, 's03-box--orch', 'ORCHESTRATORS', 's03-boxlbl--orch', 3) +
          box('apps', APPS, 's03-box--apps', 'APPLICATIONS', 's03-boxlbl--apps', 3) +
          box('model', FEEDER.model, 's03-box--model', 'MODELS', 's03-boxlbl--model', 3) +
          box('embodiment', FEEDER.embodiment, 's03-box--embodiment', 'EMBODIMENT', 's03-boxlbl--embodiment', 3) +
          box('compute', FEEDER.compute, 's03-box--compute', 'COMPUTE', 's03-boxlbl--compute', 3) +

          flows() +

          '<g class="s03-fut-grp step" data-step="4" data-motion="none" data-fut="mark">' +
            '<rect class="s03-mark" x="766" y="460" width="20" height="20" rx="3" transform="rotate(45 776 470)"/>' +
            '<circle class="s03-mark-dot" cx="776" cy="470" r="4"/>' +
          '</g>' +
        '</svg>' +

        '<div class="s03-scramble">' + scrambleMarkup() + '</div>' +
      '</div>' +

      '<div class="s03-midcap step" data-step="2" data-motion="none">' +
        'Everyone owns a slice &mdash; capture, sim, data, fleet, safety. Nobody composes them.</div>' +

      '<div class="s03-bottom">' +
        '<div class="s03-tagline">Physical AI today &mdash; three poles, and a scramble in the middle.</div>' +
        '<div class="s03-takeaway">' +
          Shared.carry({ step: 3, punchHtml: 'When the model stops being the moat, the one who composes the middle wins. That seat is open &mdash; and it&rsquo;s ours.' }) +
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

  function setResolved(el, on) {
    el.querySelector('.s03-clouds').classList.toggle('is-gone', on);
    el.querySelector('.s03-marker-cur').classList.toggle('is-active', !on);
    el.querySelector('.s03-marker-fut').classList.toggle('is-active', on);
    el.querySelector('.s03-tagline').classList.toggle('is-gone', on);
    el.querySelector('.s03-midcap').classList.toggle('is-gone', on);
    var scramble = el.querySelector('.s03-scramble');
    scramble.classList.toggle('is-ink', on);
    scramble.classList.toggle('is-compressed', on);
    if (!on) {
      // drop what Anim.converge committed as inline style, so Back restores
      // the scramble exactly where the base state drew it
      var nodes = el.querySelectorAll('.s03-sc');
      for (var i = 0; i < nodes.length; i++) Anim.reset(nodes[i]);
    }
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
       Watch the beat-3 group so reversing out of the resolve puts the current
       state — clouds, scramble, tagline, marker — back the way it was, and
       reversing out of beat 4 kills the flow loops. */
    var orchGrp = el.querySelector('.s03-fut-grp[data-fut="orch"]');
    var flowGrp = el.querySelector('.s03-fut-grp[data-fut="flows"]');
    var beat1 = el.querySelector('.s03-beat1');
    var obs = new MutationObserver(function () {
      if (!flowGrp.classList.contains('is-shown')) stopFlows(el);

      var undoResolve = !orchGrp.classList.contains('is-shown') &&
                        el.querySelector('.s03-clouds').classList.contains('is-gone');
      var undoLit = !beat1.classList.contains('is-shown') &&
                    el.querySelectorAll('.s03-cloud.is-lit').length > 0;
      if (!undoResolve && !undoLit) return;

      Anim.applyInstant(el, { static: true }, function () {
        if (undoResolve) setResolved(el, false);
        if (undoLit) {
          (el._s03timers || []).forEach(clearTimeout);
          el._s03timers = [];
          var lit = el.querySelectorAll('.s03-cloud.is-lit');
          for (var i = 0; i < lit.length; i++) lit[i].classList.remove('is-lit');
        }
      });
    });
    obs.observe(el, { attributes: true, attributeFilter: ['class'], subtree: true });
    el._s03obs = obs;
  }

  function onStep(el, i, o) {
    /* 1 — the poles have gravity, one at a time (§13). */
    if (i === 1) {
      ['model', 'embodiment', 'compute'].forEach(function (key, n) {
        var g = el.querySelector('.s03-cloud[data-key="' + key + '"]');
        var t = setTimeout(function () { g.classList.add('is-lit'); }, dl(o, n * 420));
        el._s03timers.push(t);
      });
    }

    /* 2 — the middle is a scramble: every node stirs on its own timing, and
       the caption names what it is. Per-node fadeUp (varied rise and delay)
       stays inside the sanctioned vocabulary and settles by itself — no loop
       survives the beat. */
    if (i === 2) {
      var nodes = el.querySelectorAll('.s03-sc');
      for (var k = 0; k < nodes.length; k++) {
        Anim.fadeUp(nodes[k], {
          distance: 4 + seeded(k + 3) * 8,
          delay: dl(o, seeded(k + 11) * 260),
          duration: Anim.dur(o, 340)
        });
      }
      Anim.fadeUp(el.querySelector('.s03-midcap'), { duration: Anim.dur(o, 450), delay: dl(o, 260) });
    }

    /* 3 — the resolve. Two-stage compression (task file's fallback): gather
       into a loose knot, then settle that knot into the outlined box. */
    if (i === 3) {
      var layer = el.querySelector('.s03-scramble');
      Anim.converge(el.querySelectorAll('.s03-sc'), orchCentre(layer), {
        duration: Anim.dur(o, 520), stagger: Anim.dur(o, 8), scale: 0.55, fade: false
      });
      layer.classList.add('is-ink');

      var settle = function () { layer.classList.add('is-compressed'); };
      if (o && o.static) Anim.applyInstant(el, o, settle);
      else el._s03timers.push(setTimeout(settle, 520));

      el.querySelector('.s03-clouds').classList.add('is-gone');
      el.querySelector('.s03-marker-cur').classList.remove('is-active');
      el.querySelector('.s03-marker-fut').classList.add('is-active');
      el.querySelector('.s03-tagline').classList.add('is-gone');
      el.querySelector('.s03-midcap').classList.add('is-gone');

      Anim.scaleIn(el.querySelector('.s03-fut-grp[data-fut="orch"]'),
        { duration: Anim.dur(o, 440), delay: dl(o, 620), from: 0.94, lift: false });
      Anim.fadeUp(el.querySelector('.s03-fut-grp[data-fut="apps"]'),
        { duration: Anim.dur(o, 420), delay: dl(o, 800), distance: -10 });
      Anim.fadeUp([
        el.querySelector('.s03-fut-grp[data-fut="model"]'),
        el.querySelector('.s03-fut-grp[data-fut="embodiment"]'),
        el.querySelector('.s03-fut-grp[data-fut="compute"]')
      ], { duration: Anim.dur(o, 400), delay: dl(o, 700), stagger: Anim.dur(o, 80) });

      Anim.fadeUp(el.querySelector('.carry-punch'), { duration: Anim.dur(o, 500), delay: dl(o, 900) });
    }

    /* 4 — the flows connect: last, and together (§13). */
    if (i === 4) {
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
    steps: 4,
    render: render,
    onEnter: onEnter,
    onStep: onStep,
    onLeave: onLeave
  });
})();
