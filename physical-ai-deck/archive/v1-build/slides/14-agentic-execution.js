/* ==========================================================================
   Page 14 — Agentic execution. Act IV: how the lab actually runs day to day
   — agents build the software, humans are reserved for research/frontier/
   judgment work. No locator badge on this page (only 05-09/18/19 carry one).

   Steps: 0 base (kicker/title/rule, two empty columns + divider) · 1 agents
   column fills (what agents build, under human review) · 2 humans column
   fills (what humans are reserved for) · 3 the edge strip (qualitative,
   no invented metrics) + carry.
   ========================================================================== */

(function () {
  'use strict';

  function render() {
    return '' +
      '<div class="p14">' +

        Shared.kicker('How we run', 'p14-kicker') +
        '<h1 class="title p14-title">Agents build the software. Humans do the frontier.</h1>' +
        '<hr class="rule p14-rule">' +

        '<div class="p14-body">' +

          '<div class="p14-col p14-col--agents">' +
            '<div class="p14-col-label mono">Agents</div>' +
            '<p class="body p14-col-copy step" data-step="1">pipelines, tooling, integration, test harnesses, the Composer\'s plumbing, deployment scaffolding &mdash; built and maintained by coding agents under human review.</p>' +
          '</div>' +

          '<div class="p14-divider"></div>' +

          '<div class="p14-col p14-col--humans">' +
            '<div class="p14-col-label mono">Humans</div>' +
            '<p class="body p14-col-copy step" data-step="2">research direction, frontier methods, embodied-assurance science, safety judgment, customer and partner trust &mdash; where scarce human time compounds.</p>' +
          '</div>' +

        '</div>' +

        '<div class="p14-footer">' +

          '<div class="p14-edge step" data-step="3" data-motion="none">' +
            '<div class="p14-edge-label mono">The edge</div>' +
            '<p class="body p14-edge-copy">faster iteration, lower burn, and human effort concentrated where it\'s irreplaceable &mdash; the operating model a modern deep-tech lab should have.</p>' +
          '</div>' +

          Shared.carry({
            step: 3,
            punchHtml: 'spend humans on what only humans can do',
            lineHtml: ''
          }) +

        '</div>' +

      '</div>';
  }

  function onStep(el, i, o) {
    if (i === 3) {
      var edge = el.querySelector('.p14-edge');
      Anim.fadeUp(edge, { duration: Anim.dur(o, 500) });

      var punch = el.querySelector('.carry-punch');
      Anim.fadeUp(punch, { delay: Anim.dur(o, 350), duration: Anim.dur(o, 600) });
    }
  }

  page({
    id: '14-agentic-execution',
    title: 'Agentic execution',
    theme: 'light',
    steps: 3,
    render: render,
    onStep: onStep
  });
})();
