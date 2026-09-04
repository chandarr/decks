/* ==========================================================================
   Page 12 — The global research team. Act IV: talent credibility. Answers
   the talent-draw scepticism honestly — the magnet is a discipline to own,
   not a salary to beat. Card-rail archetype (tasks/12-global-research-team.md).
   No locator badge on this page (only 05–09/18/19 carry one).

   Layout: left 40% (kicker/title/the honest framing line); right 60% —
   three "magnet" cards in a rail (each an empty shell from step 0, its
   title+copy filling in via scaleIn at step 2), a partnerships strip
   beneath. Footer carries the point.

   Steps: 0 base (kicker, title, three empty card frames) · 1 the framing
   line ("we don't compete on cost of talent") · 2 the three cards scaleIn
   in sequence · 3 the partnerships strip + carry.
   ========================================================================== */

(function () {
  'use strict';

  var CARDS = [
    {
      title: 'Own a field',
      body: 'embodied safety/assurance is wide open; a senior researcher can define it and be first.'
    },
    {
      title: 'Global by design',
      body: 'India HQ, remote research nodes, US/EU field presence; work with the frontier, not behind it.'
    },
    {
      title: 'Real deployment',
      body: 'models that touch the physical world, with a data flywheel most labs never get.'
    }
  ];

  function renderCard(c) {
    return '' +
      '<div class="p12-card">' +
        '<div class="p12-card-shell panel"></div>' +
        '<div class="p12-card-fill step" data-step="2" data-motion="none">' +
          '<p class="body p12-card-copy"><strong class="p12-card-title">' + c.title + '</strong> &mdash; ' + c.body + '</p>' +
        '</div>' +
      '</div>';
  }

  function render() {
    return '' +
      '<div class="p12">' +

        '<div class="p12-main">' +

          '<div class="p12-left">' +
            Shared.kicker('How we build &middot; talent', 'p12-kicker') +
            '<h1 class="title p12-title">The best people come to own a field.</h1>' +
            '<p class="body p12-framing step" data-step="1" data-motion="none">We don\'t recruit on cost of talent. We recruit on the chance to own an under-served discipline &mdash; embodied assurance and the composed middle &mdash; before anyone else defines it.</p>' +
          '</div>' +

          '<div class="p12-right">' +

            '<div class="p12-cards">' +
              CARDS.map(renderCard).join('') +
            '</div>' +

            '<div class="p12-partnerships step" data-step="3" data-motion="none">' +
              '<div class="p12-partnerships-label mono">Partnerships</div>' +
              '<div class="p12-partnerships-chips">' +
                '<span class="p12-chip mono">frontier model labs (as partners, not competitors)</span>' +
                '<span class="p12-chip mono">universities (India + global)</span>' +
                '<span class="p12-chip mono">robot OEMs</span>' +
              '</div>' +
            '</div>' +

          '</div>' +

        '</div>' +

        '<div class="p12-footer">' +
          Shared.carry({
            step: 3,
            punchHtml: 'India\'s engineering depth + a field worth owning',
            lineHtml: ''
          }) +
        '</div>' +

      '</div>';
  }

  function onStep(el, i, o) {
    if (i === 1) {
      var framing = el.querySelector('.p12-framing');
      Anim.fadeUp(framing, { duration: Anim.dur(o, 550) });
    }

    if (i === 2) {
      var fills = el.querySelectorAll('.p12-card-fill');
      Anim.scaleIn(fills, { duration: Anim.dur(o, 450), stagger: Anim.dur(o, 130), lift: false });
    }

    if (i === 3) {
      var strip = el.querySelector('.p12-partnerships');
      Anim.fadeUp(strip, { duration: Anim.dur(o, 550) });

      var punch = el.querySelector('.carry-punch');
      Anim.fadeUp(punch, { delay: Anim.dur(o, 250), duration: Anim.dur(o, 600) });
    }
  }

  page({
    id: '12-global-research-team',
    title: 'The global research team',
    theme: 'light',
    steps: 3,
    render: render,
    onStep: onStep
  });
})();
