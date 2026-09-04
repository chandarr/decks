/* ==========================================================================
   Page 15 — IP strategy. Act IV: a deliberate IP posture, drawn as a
   three-column matrix (PUBLISH / PATENT / TRADE-SECRET) with a closing band
   on standards-as-influence. No locator badge (tasks/15 layout doesn't call
   for one; only 05–09/18/19 carry the mini "you-are-here").

   Steps: 0 base (kicker/title, three empty column headers) · 1 Publish
   column fills · 2 Patent column fills · 3 Trade-secret column fills, then
   the standards band, then carry.
   ========================================================================== */

(function () {
  'use strict';

  function chipsHtml(items) {
    return items.map(function (c) {
      return '<span class="p15-chip mono">' + c + '</span>';
    }).join('');
  }

  function column(mod, stepNum, label, chips, rationale) {
    return '' +
      '<div class="p15-col p15-col--' + mod + '">' +
        '<div class="p15-col-label mono">' + label + '</div>' +
        '<div class="p15-col-fill step" data-step="' + stepNum + '" data-motion="none">' +
          '<div class="p15-chips">' + chipsHtml(chips) + '</div>' +
          '<p class="p15-rationale">' + rationale + '</p>' +
        '</div>' +
      '</div>';
  }

  function render() {
    return '' +
      '<div class="p15">' +

        Shared.kicker('What we own', 'p15-kicker') +
        '<h1 class="title p15-title">Publish the science. Patent the methods. Keep the data.</h1>' +
        '<hr class="rule p15-rule">' +

        '<div class="p15-matrix">' +
          column('publish', 1, 'Publish',
            ['Embodied assurance', 'World-model compression', 'Evaluation'],
            'credibility that recruits the best people and sets the field&rsquo;s terms.') +
          column('patent', 2, 'Patent',
            ['Model&rarr;embodiment adaptation methods', 'Edge-orchestration', 'Safety-case techniques'],
            'defensible, licensable.') +
          column('tradesecret', 3, 'Trade-secret',
            ['The failure-data corpus', 'The Composer&rsquo;s validated recipes', 'Deployment data'],
            'the compounding crown jewels; never published, never patented.') +
        '</div>' +

        '<div class="p15-band step" data-step="3" data-motion="none">' +
          '<span class="p15-band-label mono">Standards as position</span>' +
          '<p class="p15-band-copy">shaping the certification standard is influence, not a filing &mdash; a durable seat at the head of the table.</p>' +
        '</div>' +

        '<div class="p15-footer">' +
          Shared.carry({
            step: 3,
            punchHtml: 'open what recruits, protect what compounds',
            lineHtml: ''
          }) +
        '</div>' +

      '</div>';
  }

  function onStep(el, i, o) {
    if (i === 1) {
      var chips1 = el.querySelectorAll('.p15-col--publish .p15-chip');
      Anim.fadeUp(chips1, { stagger: Anim.dur(o, 60) });

      var rat1 = el.querySelector('.p15-col--publish .p15-rationale');
      Anim.fadeUp(rat1, { delay: Anim.dur(o, 250), duration: Anim.dur(o, 500) });
    }

    if (i === 2) {
      var chips2 = el.querySelectorAll('.p15-col--patent .p15-chip');
      Anim.fadeUp(chips2, { stagger: Anim.dur(o, 60) });

      var rat2 = el.querySelector('.p15-col--patent .p15-rationale');
      Anim.fadeUp(rat2, { delay: Anim.dur(o, 250), duration: Anim.dur(o, 500) });
    }

    if (i === 3) {
      var chips3 = el.querySelectorAll('.p15-col--tradesecret .p15-chip');
      Anim.fadeUp(chips3, { stagger: Anim.dur(o, 60) });

      var rat3 = el.querySelector('.p15-col--tradesecret .p15-rationale');
      Anim.fadeUp(rat3, { delay: Anim.dur(o, 250), duration: Anim.dur(o, 500) });

      var band = el.querySelectorAll('.p15-band-label, .p15-band-copy');
      Anim.fadeUp(band, { delay: Anim.dur(o, 500), stagger: Anim.dur(o, 80) });

      var punch = el.querySelector('.carry-punch');
      Anim.fadeUp(punch, { delay: Anim.dur(o, 750), duration: Anim.dur(o, 600) });
    }
  }

  page({
    id: '15-ip-strategy',
    title: 'IP strategy',
    theme: 'light',
    steps: 3,
    render: render,
    onStep: onStep
  });
})();
