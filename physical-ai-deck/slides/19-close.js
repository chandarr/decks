/* ==========================================================================
   Page 19 — Closing page. Act V close (tasks/19-close.md).

   Minimal closer: restate the thesis, call back to slide 01's spine, land
   on the north star. No CTA, no contact, no "hire me" — the ask is implied.

   Steps: 0 base (faint spine callback + mission line, at rest) · 1 the
   punch (`The middle is open.` fades up) · 2 the closer (quiet italic
   line fades in).
   ========================================================================== */

(function () {
  'use strict';

  function render() {
    return '' +
      '<div class="s19-slideno mono">19</div>' +

      '<div class="s19-spine">' +
        '<svg class="s19-spine-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
          '<line class="s19-line" x1="520" y1="670" x2="1400" y2="670"/>' +
          '<circle class="s19-endnode s19-endnode--left" cx="520" cy="670" r="9"/>' +
          '<text class="s19-endlbl s19-endlbl--left mono" x="484" y="677" text-anchor="end">MODELS</text>' +
          '<circle class="s19-endnode s19-endnode--right" cx="1400" cy="670" r="9"/>' +
          '<text class="s19-endlbl s19-endlbl--right mono" x="1436" y="677" text-anchor="start">MACHINES</text>' +
          '<circle class="s19-centernode" cx="960" cy="670" r="15"/>' +
        '</svg>' +
      '</div>' +

      /* static wrapper carries the vertical-centering transform so the
         fadeUp'd h1 inside it never has its own CSS transform for the
         WAAPI animation (which runs fill:'both') to clobber. */
      '<div class="s19-punch-wrap">' +
        '<h1 class="s19-punch step" data-step="1" data-motion="none">The middle is open.</h1>' +
      '</div>' +

      '<div class="s19-lines">' +
        '<p class="s19-mission">The orchestration layer between the world&rsquo;s models and its machines &mdash; edge, competence, confidence.</p>' +
        '<p class="s19-closer step" data-step="2" data-motion="none"><em>And we know how to build it.</em></p>' +
      '</div>';
  }

  function onStep(el, i, o) {
    if (i === 1) {
      var punch = el.querySelector('.s19-punch');
      Anim.fadeUp(punch, { duration: Anim.dur(o, 600) });
    }

    if (i === 2) {
      var closer = el.querySelector('.s19-closer');
      Anim.fadeUp(closer, { duration: Anim.dur(o, 500) });
    }
  }

  page({
    id: '19-close',
    title: 'The middle is open',
    theme: 'light',
    steps: 2,
    render: render,
    onStep: onStep
  });
})();
