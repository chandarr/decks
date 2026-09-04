/* ==========================================================================
   Page 16 — Roadmap & valuation. tasks/16-roadmap-valuation.md.

   Layout: a "transforming" horizontal timeline — five stages left→right on
   an ink axis (kicker/title top-left), each stage carrying a label, a
   one-line milestone, its revenue-mode chip, and an outcome line; beneath
   the axis an ascending ink "stair" (schematic, illustrative of re-rating —
   never a fabricated chart, no numbers/currency/multiples/dates) rises with
   each stage. A thin legend pins the stair's meaning. Carry bottom.

   Steps: 0 base (kicker, title, ink axis + 5 empty/hollow stage slots, flat
   dashed stair baseline, legend) · 1-5 each stage reveals left-to-right
   (fadeUp label/dot/milestone/chip/outcome; the stair's step for that stage
   draws on via drawPath) — stage 3 (the services→platform re-rate) carries
   the deck's one emphasised inflection: a bordered panel, a bold outcome
   line, and the steepest single riser in the stair · 6 the carry line.
   ========================================================================== */

(function () {
  'use strict';

  // stage x-centres (design px, 1920-wide canvas) — same 345px rhythm as
  // page 03's timeline so the "transforming timeline" idiom stays consistent.
  var NX = [270, 615, 960, 1305, 1650];
  var COL_HW = 150;               // half column width -> stage span = 300px
  var AXIS_Y = 300;
  var BASE_Y = 760;               // flat stair baseline (pre-reveal)
  var H = [720, 690, 610, 570, 520]; // per-stage stair-top y (lower y = taller)
  var LEFT_EDGE = NX[0] - COL_HW;    // 120 — axis + stair share this span
  var RIGHT_EDGE = NX[4] + COL_HW;   // 1800
  var DOT_R = 7;

  var STAGES = [
    {
      label: 'Beachhead',
      milestone: 'one superhuman vertical, delivered (US/EU); India proving ground.',
      revenue: 'Revenue: services / forward-deployed.',
      outcomeHtml: 'proof + cash.'
    },
    {
      label: 'Modular buckets + Composer v1',
      milestone: 'the repeatable pipeline + recipe library.',
      revenue: 'Revenue: productized services.',
      outcomeHtml: 'margin + repeatability.'
    },
    {
      label: 'The Composer as platform',
      milestone: 'licensing / subscription.',
      revenue: 'Revenue: platform.',
      outcomeHtml: '<b>the re-rate: services company &rarr; platform company.</b>',
      emphasis: true
    },
    {
      label: 'Assurance standard-setter',
      milestone: 'certification discipline + safety-case tooling adopted.',
      revenue: 'Revenue: assurance / certification.',
      outcomeHtml: 'moat rent.'
    },
    {
      label: 'Intelligent environments',
      milestone: 'compose whole systems, not single robots.',
      revenue: 'Revenue: platform at TAM scale.',
      outcomeHtml: 'category leadership.'
    }
  ];

  // continuous stair path for stage idx (0-based): connector at the previous
  // height -> riser -> flat top at this stage's height, so each per-stage
  // <path> is independently drawPath-able (getTotalLength per element) while
  // the assembled set reads as one ascending staircase.
  function stairPath(idx) {
    var colL = NX[idx] - COL_HW, colR = NX[idx] + COL_HW;
    var y = H[idx];
    var prevY = idx === 0 ? BASE_Y : H[idx - 1];
    var prevR = idx === 0 ? colL : (NX[idx - 1] + COL_HW);
    return 'M' + prevR + ',' + prevY + ' L' + colL + ',' + prevY + ' L' + colL + ',' + y + ' L' + colR + ',' + y;
  }

  function render() {
    var slots = NX.map(function (x) {
      return '<circle class="p16-slot" cx="' + x + '" cy="' + AXIS_Y + '" r="' + DOT_R + '"/>';
    }).join('');

    var stairSteps = STAGES.map(function (s, idx) {
      return '<path class="p16-stair-step step" data-step="' + (idx + 1) + '" data-motion="none" d="' + stairPath(idx) + '"/>';
    }).join('');

    var axis = '' +
      '<svg class="p16-axis-svg" viewBox="0 0 1920 1080" preserveAspectRatio="none" aria-hidden="true">' +
        '<line class="p16-axis-line" x1="' + LEFT_EDGE + '" y1="' + AXIS_Y + '" x2="' + RIGHT_EDGE + '" y2="' + AXIS_Y + '"/>' +
        slots +
        '<path class="p16-stair-base" d="M' + LEFT_EDGE + ',' + BASE_Y + ' L' + RIGHT_EDGE + ',' + BASE_Y + '"/>' +
        stairSteps +
      '</svg>';

    var nodes = STAGES.map(function (s, idx) {
      var n = idx + 1;
      // NB: this outer wrapper carries data-motion="none" (GLOBAL §8) — its
      // CSS rule outranks any static transform, so centring is via `left`
      // (calc, not translateX); every child below is free to use transform
      // because only THIS element carries data-motion="none".
      return '' +
        '<div class="p16-node step" data-step="' + n + '" data-motion="none" style="left:calc(' + (NX[idx] - COL_HW) + ' * var(--px))">' +
          '<div class="p16-node-above">' +
            '<div class="p16-label">' + s.label + '</div>' +
          '</div>' +
          '<div class="p16-dot' + (s.emphasis ? ' p16-dot--emphasis' : '') + '"></div>' +
          '<div class="p16-node-below' + (s.emphasis ? ' p16-node-below--emphasis' : '') + '">' +
            '<div class="p16-milestone">' + s.milestone + '</div>' +
            '<div class="p16-chiprow"><span class="p16-chip mono">' + s.revenue + '</span></div>' +
            '<div class="p16-outcome mono">&rarr;&nbsp;' + s.outcomeHtml + '</div>' +
          '</div>' +
        '</div>';
    }).join('');

    return '' +
      Shared.kicker('The roadmap', 'p16-kicker') +
      '<h1 class="title p16-title">Each stage re-rates the company.</h1>' +

      '<div class="p16-timeline">' +
        axis +
        nodes +
        '<div class="p16-legend mono">the valuation stair is illustrative of <i>re-rating</i>, not a forecast.</div>' +
      '</div>' +

      '<div class="p16-footer">' +
        Shared.carry({
          step: 6,
          punchHtml: 'progress you can see &mdash; and a step-change in value at each stage',
          lineHtml: ''
        }) +
      '</div>';
  }

  function onStep(el, i, o) {
    if (i >= 1 && i <= 5) {
      var node = el.querySelector('.p16-node[data-step="' + i + '"]');
      var parts = node.querySelectorAll('.p16-label, .p16-dot, .p16-milestone, .p16-chiprow, .p16-outcome');
      Anim.fadeUp(parts, { duration: Anim.dur(o, 500), stagger: Anim.dur(o, 60) });

      var stairStep = el.querySelector('.p16-stair-step[data-step="' + i + '"]');
      Anim.drawPath(stairStep, { duration: Anim.dur(o, 700) });
    }

    if (i === 6) {
      var punch = el.querySelector('.carry-punch');
      Anim.fadeUp(punch, { duration: Anim.dur(o, 600) });

      var line = el.querySelector('.carry-line');
      Anim.fadeUp(line, { delay: Anim.dur(o, 350) });
    }
  }

  page({
    id: '16-roadmap-valuation',
    title: 'Roadmap & valuation',
    theme: 'light',
    steps: 6,
    render: render,
    onStep: onStep
  });
})();
