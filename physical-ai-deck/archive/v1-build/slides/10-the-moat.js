/* ==========================================================================
   Page 10 — The moat. Act III on its own: ranked defensibility, the single
   strongest source named, and the sharpest question (why doesn't NVIDIA
   already own the middle) dispatched with structural logic + firsthand
   execution reality. Single-page act — no locator badge (tasks/10 layout
   doesn't call for one; only 05–09/18/19 carry the mini "you-are-here").

   Steps: 0 base (kicker/title, empty ranked-row shells, empty NVIDIA
   callout frame) · 1 ranking fills top&rarr;down (fadeUp) · 2 row 1's
   one-time --accent-fusion underline (the page's one legitimate use) ·
   3 the NVIDIA callout fills + carry.
   ========================================================================== */

(function () {
  'use strict';

  function row(ord, title, why, isTop) {
    return '' +
      '<div class="p10-row' + (isTop ? ' p10-row--top' : '') + '">' +
        '<div class="p10-row-content step" data-step="1" data-motion="none">' +
          '<span class="p10-row-ord mono">' + ord + '</span>' +
          '<div class="p10-row-body">' +
            '<p class="p10-row-title">' + title + '</p>' +
            '<p class="p10-row-why">' + why + '</p>' +
            (isTop ? '<div class="p10-row1-underline step" data-step="2" data-motion="none" aria-hidden="true"></div>' : '') +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function render() {
    return '' +
      '<div class="p10">' +

        Shared.kicker('Why it\'s defensible', 'p10-kicker') +
        '<h1 class="title p10-title">The moat is the middle nobody wants to build.</h1>' +
        '<hr class="rule p10-rule">' +

        '<div class="p10-body">' +

          '<div class="p10-ranked">' +
            row('01', 'Assurance trust engine + deployment data flywheel',
              'failure-data &rarr; certification compounds with every deployment; no strong LLM analog; the hardest to copy.', true) +
            row('02', 'The Composer',
              'an emergent, instrumented product only a neutral integrator can build.') +
            row('03', 'Adaptation pipeline',
              'the repeatable model&rarr;embodiment&rarr;certified-edge-expert factory.') +
            row('04', 'Neutrality on both ends',
              'the partner everyone needs and no one fears (Scale/Meta showed what capture costs).') +
            row('05', 'India talent leverage',
              'deep engineering at a structural cost advantage.') +
          '</div>' +

          '<div class="p10-nv panel">' +
            '<h2 class="p10-nv-title">Why not NVIDIA?</h2>' +
            '<div class="p10-nv-points step" data-step="3" data-motion="none">' +
              '<p class="p10-nv-point"><strong>Not neutral</strong> &mdash; its stack locks you to its silicon; ours picks the cheapest model + body + chip that meets the budget, across vendors.</p>' +
              '<p class="p10-nv-point"><strong>No appetite for Assurance</strong> &mdash; reliability, failure-data, certification, field integration sit outside its GPU-selling DNA and margins.</p>' +
              '<p class="p10-nv-point"><strong>Firsthand:</strong> NVIDIA ships GPUs and reference demos, not reliable products &mdash; Jetson\'s thermals make it near-unusable at the edge in real deployment. <span class="p10-alert">Reliability is our job, not theirs.</span></p>' +
            '</div>' +
          '</div>' +

        '</div>' +

        '<div class="p10-footer">' +
          Shared.carry({
            step: 3,
            punchHtml: 'own the trust, hold it neutrally &mdash; that compounds and can\'t be bought',
            lineHtml: ''
          }) +
        '</div>' +

      '</div>';
  }

  function onStep(el, i, o) {
    if (i === 1) {
      var rows = el.querySelectorAll('.p10-row-content');
      Anim.fadeUp(rows, { stagger: Anim.dur(o, 130) });
    }

    if (i === 2) {
      var underline = el.querySelector('.p10-row1-underline');
      Anim.scaleIn(underline, { from: 0.04, duration: Anim.dur(o, 550), lift: false });
    }

    if (i === 3) {
      var points = el.querySelector('.p10-nv-points');
      Anim.scaleIn(points, { duration: Anim.dur(o, 500), lift: false });

      var punch = el.querySelector('.carry-punch');
      Anim.fadeUp(punch, { delay: Anim.dur(o, 350), duration: Anim.dur(o, 600) });
    }
  }

  page({
    id: '10-the-moat',
    title: 'The moat',
    theme: 'light',
    steps: 3,
    render: render,
    onStep: onStep
  });
})();
