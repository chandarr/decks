/* ==========================================================================
   Page 03 — How the LLM era spanned out. tasks/03-llm-arc.md.

   Layout: mono kicker + title top-left; a horizontal timeline at mid-height
   (five ink nodes on a hairline axis, label above / dot on the axis / note
   below each); a carried lesson line at the bottom.

   Steps: 0 base (kicker, title, axis + 5 tick marks) · 1-5 each beat reveals
   left-to-right (fadeUp node+note; axis drawPath extends to it; beat 3 rolls
   the ~1,500x figure with countUp; beat 5 also reveals the alert-tinted
   neutrality footnote) · 6 the carry line.
   ========================================================================== */

(function () {
  'use strict';

  // node x-positions (design px, 1920-wide canvas) — evenly spaced, 345px apart.
  var NX = [270, 615, 960, 1305, 1650];
  var AXIS_Y = 540;
  var MARGIN_X = 96; // page content margin — axis leads in from here

  var BEATS = [
    {
      label: 'Research era',
      note: 'Scaling laws; intelligence as a research curiosity.'
    },
    {
      label: 'The land-grab',
      note: 'ChatGPT; capital floods the frontier; a compute arms race.'
    },
    {
      label: 'Commoditization',
      note: 'Open weights reset price/performance; the cost of intelligence falls ' +
        '<span class="p03-figure mono">~<span class="p03-figure-num">1,500</span>×</span> in six years.'
    },
    {
      label: 'Value migrates',
      note: 'To the two ends — compute below, apps + services above — while each layer\'s undifferentiated middle compresses.'
    },
    {
      label: 'The neutral integrator wins',
      note: 'Adaptation + orchestration capture the gap.',
      footnote: 'Meta\'s stake in Scale AI made it "captured"; frontier labs fled to neutral rivals overnight.'
    }
  ];

  function segPath(x1, x2) {
    return 'M' + x1 + ',' + AXIS_Y + ' L' + x2 + ',' + AXIS_Y;
  }

  function render() {
    var segStarts = [MARGIN_X, NX[0], NX[1], NX[2], NX[3]];

    var ticks = NX.map(function (x) {
      return '<line class="p03-tick" x1="' + x + '" x2="' + x + '" y1="' + (AXIS_Y - 8) + '" y2="' + (AXIS_Y + 8) + '"/>';
    }).join('');

    var segs = BEATS.map(function (b, i) {
      return '<path class="p03-seg step" data-step="' + (i + 1) + '" data-motion="none" d="' +
        segPath(segStarts[i], NX[i]) + '"/>';
    }).join('');

    var axis = '' +
      '<svg class="p03-axis" viewBox="0 0 1920 1080" preserveAspectRatio="none" aria-hidden="true">' +
        '<line class="p03-axis-base" x1="' + MARGIN_X + '" y1="' + AXIS_Y + '" x2="' + NX[4] + '" y2="' + AXIS_Y + '"/>' +
        ticks +
        segs +
      '</svg>';

    var nodes = BEATS.map(function (b, i) {
      // NB: this wrapper carries data-motion="none" (GLOBAL §8 contract), whose
      // CSS rule (.step[data-motion="none"] { transform: none }) outranks any
      // transform set on the same element (higher selector specificity) — so
      // centering is done here via a pre-offset `left`, never via translateX,
      // to avoid the wrapper's motion-opt-out silently cancelling it.
      return '' +
        '<div class="p03-node step" data-step="' + (i + 1) + '" data-motion="none" style="left:calc(' + (NX[i] - 150) + ' * var(--px))">' +
          '<div class="p03-label">' + b.label + '</div>' +
          '<div class="p03-dot"></div>' +
          '<div class="p03-note">' + b.note + '</div>' +
          (b.footnote ? '<div class="p03-footnote mono">' + b.footnote + '</div>' : '') +
        '</div>';
    }).join('');

    return '' +
      Shared.kicker('Precedent — the LLM era', 'p03-kicker') +
      '<h1 class="title p03-title">We\'ve already watched this span out.</h1>' +

      '<div class="p03-timeline">' +
        axis +
        nodes +
      '</div>' +

      '<div class="p03-footer">' +
        Shared.carry({
          step: 6,
          punchHtml: 'Value went to the ends. The scarce, neutral integrator won the middle.',
          lineHtml: ''
        }) +
      '</div>';
  }

  function onStep(el, i, o) {
    if (i >= 1 && i <= 5) {
      var seg = el.querySelector('.p03-seg[data-step="' + i + '"]');
      Anim.drawPath(seg, { duration: Anim.dur(o, 700) });

      var node = el.querySelector('.p03-node[data-step="' + i + '"]');
      var parts = node.querySelectorAll('.p03-label, .p03-dot, .p03-note, .p03-footnote');
      Anim.fadeUp(parts, { duration: Anim.dur(o, 500), stagger: Anim.dur(o, 60) });

      if (i === 3) {
        var figEl = node.querySelector('.p03-figure-num');
        Anim.countUp(figEl, 1500, { duration: Anim.dur(o, 900), delay: Anim.dur(o, 200) })
          .then(function () { figEl.textContent = '1,500'; });
      }
    }

    if (i === 6) {
      var punch = el.querySelector('.carry-punch');
      Anim.fadeUp(punch, { duration: Anim.dur(o, 600) });

      var line = el.querySelector('.carry-line');
      Anim.fadeUp(line, { delay: Anim.dur(o, 350) });
    }
  }

  page({
    id: '03-llm-arc',
    title: 'How the LLM era spanned out',
    theme: 'light',
    steps: 6,
    render: render,
    onStep: onStep
  });
})();
