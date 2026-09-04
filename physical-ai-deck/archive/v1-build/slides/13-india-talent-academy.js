/* ==========================================================================
   Page 13 — India talent engine + academy. Act IV, structural advantage.
   India is the engine and proving ground, never the market — the founder
   correction this page exists to lock in. Two columns (the engine / the
   academy) split by a thin ink divider; a bottom geography band makes the
   build-here/sell-there split explicit before the carry line.

   Steps: 0 base (kicker/title, two empty columns + divider) · 1 the engine
   column fills · 2 the academy column fills · 3 the geography band draws
   (drawPath the rule, fadeUp the band + carry).
   ========================================================================== */

(function () {
  'use strict';

  function render() {
    return '' +
      '<div class="p13">' +

        Shared.kicker('How we build &middot; India as engine', 'p13-kicker') +
        '<h1 class="title p13-title">Build here, prove here, sell there.</h1>' +

        '<div class="p13-body">' +

          '<div class="p13-col p13-col--engine">' +
            '<div class="p13-col-label mono">The engine</div>' +
            '<p class="body p13-col-copy step" data-step="1">Deep engineering and embedded talent at a structural cost advantage; India as a low-cost, fast first-deployment and testing ground &mdash; <em>not</em> the primary market (limited robotics acceptance, price-sensitive).</p>' +
          '</div>' +

          '<div class="p13-divider"></div>' +

          '<div class="p13-col p13-col--academy">' +
            '<div class="p13-col-label mono">The academy</div>' +
            '<p class="body p13-col-copy step" data-step="2">An upskilling program that turns abundant lower-cost technical talent into physical-AI engineers &mdash; a talent pipeline, a brand in the field, and a revenue line. Anchored by AC\'s teaching capability.</p>' +
          '</div>' +

        '</div>' +

        '<div class="p13-footer">' +

          '<div class="p13-geo step" data-step="3" data-motion="none">' +
            '<svg class="p13-geo-line" viewBox="0 0 1728 2" preserveAspectRatio="none" aria-hidden="true"><path d="M0,1 H1728"/></svg>' +
            '<div class="p13-geo-row mono">' +
              '<span class="p13-geo-seg">build + prove &rarr; <span class="p13-geo-india">India</span></span>' +
              '<span class="p13-geo-sep">&middot;</span>' +
              '<span class="p13-geo-seg">monetize &rarr; <span class="p13-geo-west">US / EU</span></span>' +
            '</div>' +
          '</div>' +

          Shared.carry({
            step: 3,
            punchHtml: 'India is the engine and the proving ground &mdash; the market is the West',
            lineHtml: ''
          }) +

        '</div>' +

      '</div>';
  }

  function onStep(el, i, o) {
    if (i === 3) {
      var linePath = el.querySelector('.p13-geo-line path');
      Anim.drawPath(linePath, { duration: Anim.dur(o, 700) });

      var row = el.querySelector('.p13-geo-row');
      Anim.fadeUp(row, { delay: Anim.dur(o, 450), duration: Anim.dur(o, 500) });

      var punch = el.querySelector('.carry-punch');
      Anim.fadeUp(punch, { delay: Anim.dur(o, 750), duration: Anim.dur(o, 600) });
    }
  }

  page({
    id: '13-india-talent-academy',
    title: 'India talent engine + academy',
    theme: 'light',
    steps: 3,
    render: render,
    onStep: onStep
  });
})();
