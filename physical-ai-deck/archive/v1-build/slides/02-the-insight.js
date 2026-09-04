/* ==========================================================================
   Page 02 — The insight. States the governing thought in words: both ends
   race ahead but neither reaches a real application alone; the enabling
   middle is what's missing. Verbal companion to page 01's map — same two
   worlds, same ink middle (tasks/02-the-insight.md notes).

   Steps: 0 base (kicker/title + both worlds, arrows stopped at a dashed
   void) · 1 the problem (body 1 fades; the void is emphasised with a single
   fadeUp pulse) · 2 the enabler (ink "enabling middle" node scales into the
   gap; body 2 fades; the arrows complete on to REAL-WORLD APPLICATION via
   drawPath) · 3 the line (enabler statement + carry line).
   ========================================================================== */

(function () {
  'use strict';

  function render() {
    return '' +
      '<div class="p02-wrap">' +
        '<div class="p02-main">' +

          '<div class="p02-left">' +
            Shared.kicker('The insight') +
            '<h1 class="title p02-title">Both ends are racing. Neither reaches the ground.</h1>' +
            '<div class="p02-copy">' +
              '<p class="body step p02-para" data-step="1">As models commoditise and bodies proliferate, each end races ahead &mdash; but neither, on its own, becomes a working system a customer will pay for and trust.</p>' +
              '<p class="body step p02-para" data-step="2">What\'s missing is the layer that composes them for a real application: the right model, on the right embodiment, with a reliable harness. Today that layer doesn\'t exist as a discipline. It\'s the gap &mdash; and the opportunity.</p>' +
            '</div>' +
          '</div>' +

          '<div class="p02-right">' +
            '<svg class="p02-schema" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid meet" aria-label="The model world and the embodiment world, both stopped short of a real-world application until the enabling middle fills the gap">' +

              /* the model world (slate) */
              '<circle cx="130" cy="190" r="9" fill="var(--accent-b)"/>' +
              '<text class="p02-world-label" x="130" y="140" text-anchor="middle" fill="var(--accent-b)">THE MODEL WORLD</text>' +

              /* the embodiment world (bronze) */
              '<circle cx="130" cy="650" r="9" fill="var(--accent-a)"/>' +
              '<text class="p02-world-label" x="130" y="713" text-anchor="middle" fill="var(--accent-a)">THE EMBODIMENT WORLD</text>' +

              /* stub arrows: both stop short of the gap — the base tension */
              '<path class="p02-arrow-stub" d="M130,190 Q300,190 374,398" stroke="var(--accent-b)" stroke-width="2.5"/>' +
              '<path class="p02-arrow-stub" d="M130,650 Q300,650 374,442" stroke="var(--accent-a)" stroke-width="2.5"/>' +

              /* the dashed void — the gap the enabling middle will fill */
              '<circle class="p02-gap" cx="420" cy="420" r="48"/>' +

              /* the target: real-world application (ink) */
              '<circle cx="770" cy="420" r="11" fill="none" stroke="var(--ink)" stroke-width="2"/>' +
              '<circle cx="770" cy="420" r="3" fill="var(--ink)"/>' +
              '<text class="p02-ink-label" x="770" y="490" text-anchor="middle">REAL-WORLD APPLICATION</text>' +

              /* the arrows completing through the middle, on reveal */
              '<g class="step" data-step="2" data-motion="none">' +
                '<path class="p02-arrow-complete p02-complete" d="M466,398 Q620,398 745,408"/>' +
                '<path class="p02-arrow-complete p02-complete" d="M466,442 Q620,442 745,432"/>' +
              '</g>' +

              /* the enabling middle — ink keystone, fills the gap on reveal */
              '<g class="step" data-step="2" data-motion="none">' +
                '<g class="p02-mid-shape">' +
                  '<rect x="397" y="397" width="46" height="46" rx="5" transform="rotate(45 420 420)" fill="var(--panel)" stroke="var(--ink)" stroke-width="2.5"/>' +
                  '<circle cx="420" cy="420" r="6" fill="var(--ink)"/>' +
                '</g>' +
                '<text class="p02-ink-label p02-mid-label" x="420" y="565" text-anchor="middle">THE ENABLING MIDDLE</text>' +
              '</g>' +

            '</svg>' +
          '</div>' +

        '</div>' +

        '<div class="rule p02-rule"></div>' +

        '<div class="p02-footer">' +
          Shared.carry({
            step: 3,
            punchHtml: 'We don\'t compete with either end. We\'re the enabler that turns both into real-world value.',
            lineHtml: 'the middle is where progress becomes product'
          }) +
        '</div>' +
      '</div>';
  }

  function onStep(el, i, o) {
    if (i === 1) {
      var gap = el.querySelector('.p02-gap');
      Anim.fadeUp(gap, { duration: Anim.dur(o, 500) });
    }

    if (i === 2) {
      var midShape = el.querySelector('.p02-mid-shape');
      Anim.scaleIn(midShape, { duration: Anim.dur(o, 450) });

      var midLabel = el.querySelector('.p02-mid-label');
      Anim.fadeUp(midLabel, { delay: Anim.dur(o, 320) });

      var completing = el.querySelectorAll('.p02-complete');
      Anim.drawPath(completing, { delay: Anim.dur(o, 150), duration: Anim.dur(o, 800), stagger: Anim.dur(o, 120) });
    }

    if (i === 3) {
      var punch = el.querySelector('.carry-punch');
      Anim.fadeUp(punch, { duration: Anim.dur(o, 600) });

      var line = el.querySelector('.carry-line');
      Anim.fadeUp(line, { delay: Anim.dur(o, 350) });
    }
  }

  page({
    id: '02-the-insight',
    title: 'The insight',
    theme: 'light',
    steps: 3,
    render: render,
    onStep: onStep
  });
})();
