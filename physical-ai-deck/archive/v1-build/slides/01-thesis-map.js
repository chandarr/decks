/* ==========================================================================
   Page 01 — Thesis map. Faithful port of the approved prototype
   (reference/slide-01-thesis-map.html) onto the page-module contract; this
   render also IS Shared.locatorMap()'s hero rendering, extracted so later
   act/bucket pages (05–09, 18, 19) reuse the identical geometry as a mini
   "you-are-here" badge.

   Steps: 0 base (rules/header/both worlds) · 1 the bridge (cables → cap
   labels) · 2 the keystone (Composer → its label → superhuman/real-world) ·
   3 the thesis (punch → positioning line).
   ========================================================================== */

(function () {
  'use strict';

  function render() {
    return '' +
      '<div class="p01-rule p01-rule--top"></div>' +
      '<div class="p01-rule p01-rule--bot"></div>' +

      Shared.kicker('Physical AI &middot; Strategy Thesis', 'p01-kicker') +
      '<div class="p01-title"><h1 class="title">Winning the Widening Middle</h1></div>' +
      '<div class="p01-slideno">01</div>' +
      Shared.kicker('Vendor-neutral &middot; India-HQ &middot; Global', 'p01-idtag') +

      '<div class="p01-map">' +
        Shared.locatorMap(null, {
          variant: 'hero',
          idPrefix: 'p01-map',
          steps: { cables: 1, capLabels: 1, keystone: 2, keystoneLabel: 2, superhuman: 2, realworld: 2 }
        }) +
      '</div>' +

      '<div class="p01-footer">' +
        Shared.carry({
          step: 3,
          punchHtml: 'Neither end delivers value alone &mdash; the enabler is <em>the middle</em>.',
          lineHtml: '<b>the right model</b> + <i>the right embodiment</i> + <u>a reliable harness</u>, composed for the application'
        }) +
      '</div>';
  }

  function onStep(el, i, o) {
    if (i === 1) {
      var cables = el.querySelectorAll('.lm-cable');
      Anim.drawPath(cables, { duration: Anim.dur(o, 900), stagger: Anim.dur(o, 150) });

      var caps = el.querySelectorAll('.lm-caplbl');
      Anim.fadeUp(caps, { delay: Anim.dur(o, 1150), stagger: Anim.dur(o, 80) });
    }

    if (i === 2) {
      var keystone = el.querySelector('.lm-keystone-shape');
      Anim.scaleIn(keystone, { duration: Anim.dur(o, 500) });

      var keyLabel = el.querySelector('.lm-keystone-label');
      Anim.fadeUp(keyLabel, { delay: Anim.dur(o, 350) });

      var supers = el.querySelectorAll('.lm-superhuman-grp, .lm-realworld-grp');
      Anim.fadeUp(supers, { delay: Anim.dur(o, 700), stagger: Anim.dur(o, 100) });
    }

    if (i === 3) {
      var punch = el.querySelector('.carry-punch');
      Anim.fadeUp(punch, { duration: Anim.dur(o, 600) });

      var line = el.querySelector('.carry-line');
      Anim.fadeUp(line, { delay: Anim.dur(o, 350) });
    }
  }

  page({
    id: '01-thesis-map',
    title: 'The thesis map',
    theme: 'light',
    steps: 3,
    render: render,
    onStep: onStep
  });
})();
