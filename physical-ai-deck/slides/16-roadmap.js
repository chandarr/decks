/* ==========================================================================
   Page 16 — Roadmap · build & prove (tasks/16-roadmap.md).
   Build-and-prove sequence: NO TAM, NO valuation curve, NO Composer keystone.
   Five working stages on a horizontal timeline; the axis extends
   station-by-station via Anim.drawPath as each stage is narrated (§12/§13).
   The axis segment + its brightened station dot share one .step group per
   beat, so back-nav (pure CSS) un-dims the dot exactly as it un-draws the
   segment — no manual class bookkeeping needed.

   Steps: 0 base (five faint, undrawn station marks only) · 1-5 axis extends
   to station N, stage N (label/deliverable/proof) fades up · 6 takeaway.
   ========================================================================== */

(function () {
  'use strict';

  var AXIS_Y = 470;
  var AXIS_LEAD_X = 180;                              // run-up before station 0
  var STATION_X = [260, 610, 960, 1310, 1660];         // five stations, even spacing (350px apart, fits margins)

  var STAGES = [
    {
      label: 'Beachhead',
      deliverable: 'The three A&rsquo;s, integrated on one hardest problem.',
      proof: 'Proof: it works where it&rsquo;s hardest.',
      chip: null
    },
    {
      label: 'Lighthouse',
      deliverable: 'A real deployment running in the field (US/EU).',
      proof: 'Proof: it works for a customer &mdash; and earns (services).',
      chip: 'services'
    },
    {
      label: 'Generalize',
      deliverable: 'The same orchestration across more bodies and tasks.',
      proof: 'Proof: a platform, not a project.',
      chip: 'orchestration'
    },
    {
      label: 'The standard',
      deliverable: 'The proving lab + standard others adopt.',
      proof: 'Proof: we set the terms of trust.',
      chip: 'assurance'
    },
    {
      label: 'Environments',
      deliverable: 'Compose whole systems, not single machines.',
      proof: 'Proof: the horizon.',
      chip: null
    }
  ];

  function segStart(i) { return i === 0 ? AXIS_LEAD_X : STATION_X[i - 1]; }

  // one station's reveal group: the incoming axis segment + its brightened
  // dot, gated together behind data-step so both draw on forward nav and
  // both un-draw on back nav via the engine's own .step CSS.
  function stationGroup(i) {
    var x1 = segStart(i), x2 = STATION_X[i];
    return '' +
      '<g class="step" data-step="' + (i + 1) + '" data-motion="none">' +
        '<path class="s16-axis-seg" data-i="' + i + '" d="M' + x1 + ',' + AXIS_Y + ' L' + x2 + ',' + AXIS_Y + '" fill="none"/>' +
        '<circle class="s16-station-dot" cx="' + x2 + '" cy="' + AXIS_Y + '" r="7"/>' +
      '</g>';
  }

  function ghostDot(i) {
    return '<circle class="s16-station-ghost" cx="' + STATION_X[i] + '" cy="' + AXIS_Y + '" r="7"/>';
  }

  function px(n) { return 'calc(' + n + ' * var(--px))'; }

  // Widths mirror the fixed box widths in the CSS (s16-stage-label 320,
  // s16-stage-deliverable/proof 300, s16-chip 160) so the left edge can be
  // computed directly in JS. A .step[data-motion="none"] element must never
  // depend on `transform` for its own static position: the engine's shared
  // rule `.step[data-motion="none"]{transform:none}` outranks a page's own
  // single-class `transform:translateX(-50%)` by specificity and silently
  // wins regardless of source order (same family of bug as the SVG static-
  // transform-attribute conflict, just for CSS instead of an attribute) —
  // so centering here is done via a precomputed `left`, not a transform.
  var LABEL_HALF = 160, DELIV_HALF = 150, PROOF_HALF = 150, CHIP_HALF = 80;

  // each text line is individually .step-gated (own data-step, data-motion
  // none) so Anim.fadeUp drives it directly with no intermediate wrapper —
  // same convention as 10-superhuman.js's .s10-arrow / _shared.js's carry().
  function stageBlock(stage, i) {
    var x = STATION_X[i];
    var n = i + 1;
    var stepAttr = ' step" data-step="' + n + '" data-motion="none"';
    var chipHtml = stage.chip
      ? '<div class="s16-chip mono' + stepAttr + ' style="left:' + px(x - CHIP_HALF) + ';">' + stage.chip + '</div>'
      : '';
    return '' +
      '<div class="s16-stage" data-i="' + i + '">' +
        '<div class="s16-stage-label' + stepAttr + ' style="left:' + px(x - LABEL_HALF) + ';">' + stage.label + '</div>' +
        '<div class="s16-stage-deliverable' + stepAttr + ' style="left:' + px(x - DELIV_HALF) + ';">' + stage.deliverable + '</div>' +
        '<div class="s16-stage-proof mono' + stepAttr + ' style="left:' + px(x - PROOF_HALF) + ';">' + stage.proof + '</div>' +
        chipHtml +
      '</div>';
  }

  function render() {
    var groups = [0, 1, 2, 3, 4].map(stationGroup).join('');
    var ghosts = [0, 1, 2, 3, 4].map(ghostDot).join('');
    var stages = STAGES.map(stageBlock).join('');

    return '' +
      Shared.kicker('How we build &middot; the roadmap', 's16-kicker') +
      '<div class="s16-slideno mono">16</div>' +

      '<h1 class="title s16-title">Every stage is a thing that works.</h1>' +

      '<div class="s16-timeline">' +
        '<svg class="s16-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
          '<g class="s16-ghosts">' + ghosts + '</g>' +
          groups +
        '</svg>' +
        stages +
      '</div>' +

      '<div class="s16-takeaway">' +
        Shared.carry({ step: 6, punchHtml: 'No slideware milestones &mdash; each stage is a working system that earns the next.' }) +
      '</div>';
  }

  function revealStage(el, i, o) {
    var seg = el.querySelector('.s16-axis-seg[data-i="' + (i - 1) + '"]');
    if (seg) Anim.drawPath(seg, { duration: Anim.dur(o, 500) });

    var stage = el.querySelector('.s16-stage[data-i="' + (i - 1) + '"]');
    if (stage) {
      var lines = stage.querySelectorAll('.step[data-step="' + i + '"]');
      Anim.fadeUp(lines, { delay: Anim.dur(o, 250), duration: Anim.dur(o, 450), stagger: Anim.dur(o, 60) });
    }
  }

  function onEnter() {}

  function onStep(el, i, o) {
    if (i >= 1 && i <= 5) revealStage(el, i, o);
    if (i === 6) {
      var punch = el.querySelector('.carry-punch');
      Anim.fadeUp(punch, { delay: Anim.dur(o, 200), duration: Anim.dur(o, 500) });
    }
  }

  function onLeave() {}

  page({
    id: '16-roadmap',
    title: 'Roadmap — build & prove',
    theme: 'light',
    steps: 6,
    render: render,
    onEnter: onEnter,
    onStep: onStep,
    onLeave: onLeave
  });
})();
