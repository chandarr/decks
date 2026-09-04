/* ==========================================================================
   Page 04 — The prediction. Closes Act I: the LLM precedent (page 03)
   becomes a forecast for Physical AI. Dual-track (model/slate left,
   embodiment/bronze right) resolves into a central ink band — "the
   enabling middle" — with the full-stack counter as a small bottom-right
   side-note. No locator map on this page (tasks/04: it returns at Act II).

   Steps: 0 base (empty tracks, dim middle) · 1 model track fills ·
   2 embodiment track fills · 3 middle brightens + value converges into it ·
   4 full-stack side-note + carry line.
   ========================================================================== */

(function () {
  'use strict';

  function render() {
    return '' +
      '<div class="p04">' +

        Shared.kicker('The prediction', 'p04-kicker') +
        '<h1 class="title p04-title">Physical AI splits the same way.</h1>' +
        '<hr class="rule p04-rule">' +

        '<div class="p04-body">' +

          '<div class="p04-track p04-track--model">' +
            '<div class="p04-track-shell"></div>' +
            '<div class="p04-track-fill step" data-step="1">' +
              '<svg class="p04-diagram" viewBox="0 0 200 120" aria-hidden="true">' +
                '<path d="M100,6 L100,46" stroke="var(--accent-b)" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
                '<path d="M100,46 Q60,72 34,108" stroke="var(--accent-b)" stroke-width="2" fill="none" stroke-linecap="round"/>' +
                '<path d="M100,46 Q140,72 166,108" stroke="var(--accent-b)" stroke-width="2" fill="none" stroke-linecap="round"/>' +
                '<circle cx="34" cy="108" r="5" fill="var(--accent-b)"/>' +
                '<circle cx="158" cy="102" r="3" fill="var(--accent-b)" opacity=".55"/>' +
                '<circle cx="172" cy="110" r="3" fill="var(--accent-b)" opacity=".55"/>' +
                '<circle cx="166" cy="98" r="3" fill="var(--accent-b)" opacity=".55"/>' +
              '</svg>' +
              '<p class="body">The model world bifurcates &mdash; a few frontier players, a large commoditized and open tier.</p>' +
            '</div>' +
          '</div>' +

          '<div class="p04-middle-col">' +
            '<div class="p04-middle-shell">' + Shared.kicker('THE ENABLING MIDDLE') + '</div>' +
            '<div class="p04-middle-fill step" data-step="3">' +
              '<div class="p04-middle-label mono">THE ENABLING MIDDLE</div>' +
              '<p class="p04-middle-copy">As both ends modularise, the scarce, still-hard capability is composing them for a real application. That\'s where the leverage &mdash; and the durable value &mdash; pools.</p>' +
            '</div>' +
          '</div>' +

          '<div class="p04-track p04-track--embodiment">' +
            '<div class="p04-track-shell"></div>' +
            '<div class="p04-track-fill step" data-step="2">' +
              '<svg class="p04-diagram" viewBox="0 0 200 120" aria-hidden="true">' +
                '<circle cx="100" cy="60" r="6" fill="var(--accent-a)"/>' +
                '<circle cx="40" cy="24" r="3.5" fill="var(--accent-a)"/>' +
                '<circle cx="86" cy="12" r="3.5" fill="var(--accent-a)"/>' +
                '<circle cx="140" cy="16" r="3.5" fill="var(--accent-a)"/>' +
                '<circle cx="172" cy="52" r="3.5" fill="var(--accent-a)"/>' +
                '<circle cx="148" cy="100" r="3.5" fill="var(--accent-a)"/>' +
              '</svg>' +
              '<p class="body">The embodiment world proliferates &mdash; humanoids, arms, AMRs, legged, drones; many bodies, none dominant.</p>' +
            '</div>' +
          '</div>' +

          '<span class="p04-converge-anchor"></span>' +
          '<span class="p04-value-dot p04-value-dot--model step" data-step="3" data-motion="none"></span>' +
          '<span class="p04-value-dot p04-value-dot--embodiment step" data-step="3" data-motion="none"></span>' +

        '</div>' +

        '<div class="p04-footer">' +
          '<div class="p04-inset-row">' +
            '<div class="p04-inset panel step" data-step="4" data-motion="none">' +
              '<p class="body p04-inset-copy"><strong>Full-stack (Figure, Tesla) is the opposite bet</strong> &mdash; vertical integration, right only while the stack stays immature and non-modular. The LLM era already answered which way this goes.</p>' +
            '</div>' +
          '</div>' +
          Shared.carry({
            step: 4,
            punchHtml: 'As both ends modularize, the enabling middle is where the value &mdash; and the leverage &mdash; sits.',
            lineHtml: ''
          }) +
        '</div>' +

      '</div>';
  }

  function onStep(el, i, o) {
    if (i === 3) {
      var dots = el.querySelectorAll('.p04-value-dot');
      var anchor = el.querySelector('.p04-converge-anchor');
      Anim.converge(dots, Anim.centreOf(anchor), { duration: Anim.dur(o, 900), stagger: Anim.dur(o, 80) });
    }

    if (i === 4) {
      var inset = el.querySelector('.p04-inset');
      Anim.scaleIn(inset, { duration: Anim.dur(o, 450) });

      var punch = el.querySelector('.carry-punch');
      Anim.fadeUp(punch, { delay: Anim.dur(o, 250), duration: Anim.dur(o, 600) });
    }
  }

  page({
    id: '04-the-prediction',
    title: 'The prediction',
    theme: 'light',
    steps: 4,
    render: render,
    onStep: onStep
  });
})();
