/* ==========================================================================
   Page 11 — Team & operating model. Opens Act IV ("How we execute"): the
   organization drawn as a four-node cycle — Research → Applied →
   Deployment → Assurance → back to Research — closed by ink flow arrows,
   with the deployment→data return path (feeding both Assurance and
   Research) emphasised as a second, bolder drawPath pass. No locator map
   on this page (tasks/11: not in the 05-09/18/19 badge set).

   Steps: 0 base (kicker/title/rule, four node cards present, arrows
   undrawn) · 1 each node's one-line charter fades in · 2 the four cycle
   arrows drawPath to close the loop, then the deployment→assurance arc is
   redrawn bold alongside a new deployment→research cross arrow (the data
   return path), then the loop line fades in · 3 the India-HQ/global-node
   footprint band + carry.
   ========================================================================== */

(function () {
  'use strict';

  function node(cls, name, charter) {
    return '' +
      '<div class="p11-node ' + cls + '">' +
        '<div class="p11-node-name mono">' + name + '</div>' +
        '<p class="p11-node-charter step" data-step="1" data-motion="none">' + charter + '</p>' +
      '</div>';
  }

  function render() {
    return '' +
      '<div class="p11">' +

        '<div class="p11-header">' +
          Shared.kicker('How we build &middot; the org', 'p11-kicker') +
          '<h1 class="title p11-title">Four labs, one flywheel.</h1>' +
        '</div>' +
        '<hr class="rule p11-rule">' +

        '<div class="p11-body">' +

          '<div class="p11-diagram">' +
            '<svg class="p11-diagram-svg" viewBox="0 0 1200 620" preserveAspectRatio="xMidYMid meet" aria-label="Four labs arranged in a cycle: Research to Applied to Deployment to Assurance and back to Research, with deployment data compounding Assurance and Research">' +

              '<g class="step" data-step="2" data-motion="none">' +
                '<path class="p11-arc" d="M755,95 Q1050,95 1050,240 M1043,232 L1050,240 L1057,232"/>' +
                '<path class="p11-arc" d="M1050,420 Q1050,560 755,560 M763,553 L755,560 L763,567"/>' +
                '<path class="p11-arc" d="M445,560 Q150,560 150,420 M143,428 L150,420 L157,428"/>' +
                '<path class="p11-arc" d="M150,240 Q150,95 445,95 M437,88 L445,95 L437,102"/>' +
              '</g>' +

              '<g class="step" data-step="2" data-motion="none">' +
                '<path class="p11-arc-emph" d="M445,560 Q150,560 150,420 M140,425 L150,420 L160,425"/>' +
                '<path class="p11-arc-emph" d="M600,485 Q820,330 660,190 M652,204 L660,190 L668,204"/>' +
              '</g>' +

            '</svg>' +

            node('p11-node--research', 'Research', 'foundations: adaptation methods, world-model compression, embodied-assurance science. Publishes.') +
            node('p11-node--applied', 'Applied', 'the Composer, the pipelines, beachhead delivery. Ships.') +
            node('p11-node--deployment', 'Deployment', 'field systems in customer environments (US/EU). Runs, and captures real-world + failure data.') +
            node('p11-node--assurance', 'Assurance', 'failure-data engine, safety cases, certification discipline. Gates adoption.') +

          '</div>' +

          '<p class="p11-loop-line body step" data-step="2" data-motion="none">Deployment&rsquo;s data compounds both Assurance (the moat) and Research (better methods). The org <em>is</em> the flywheel.</p>' +

        '</div>' +

        '<div class="p11-band step" data-step="3">' +
          '<p class="p11-band-text mono">India HQ (research + engineering + build) &middot; global nodes (US/EU field, deployment, partnerships).</p>' +
        '</div>' +

        '<div class="p11-footer">' +
          Shared.carry({
            step: 3,
            punchHtml: 'the org is designed to compound, not just to ship',
            lineHtml: ''
          }) +
        '</div>' +

      '</div>';
  }

  function onStep(el, i, o) {
    if (i === 1) {
      var charters = el.querySelectorAll('.p11-node-charter');
      Anim.fadeUp(charters, { stagger: Anim.dur(o, 130) });
    }

    if (i === 2) {
      var baseArcs = el.querySelectorAll('.p11-arc');
      Anim.drawPath(baseArcs, { duration: Anim.dur(o, 800), stagger: Anim.dur(o, 150) });

      var emphArcs = el.querySelectorAll('.p11-arc-emph');
      Anim.drawPath(emphArcs, { delay: Anim.dur(o, 1300), duration: Anim.dur(o, 700), stagger: Anim.dur(o, 200) });

      var loopLine = el.querySelector('.p11-loop-line');
      Anim.fadeUp(loopLine, { delay: Anim.dur(o, 1550), duration: Anim.dur(o, 550) });
    }

    if (i === 3) {
      var punch = el.querySelector('.carry-punch');
      Anim.fadeUp(punch, { delay: Anim.dur(o, 250), duration: Anim.dur(o, 600) });
    }
  }

  page({
    id: '11-team-operating-model',
    title: 'Team & operating model',
    theme: 'light',
    steps: 3,
    render: render,
    onStep: onStep
  });
})();
