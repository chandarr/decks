/* ==========================================================================
   Page 01 — Mission. Act I opener (tasks/01-mission.md).

   Steps: 0 base (quiet spine, unlabeled node) · 1 the mission (statement
   fades up, node scaleIn + ORCHESTRATION label, three needs fade up
   staggered) · 2 the reach (domains row + mission's closing clause).
   ========================================================================== */

(function () {
  'use strict';

  function render() {
    return '' +
      Shared.kicker('The mission', 's01-kicker') +
      '<div class="s01-slideno mono">01</div>' +

      '<h1 class="title s01-title">Making physical AI dependable enough to deploy at scale and speed.</h1>' +

      '<div class="s01-mission-wrap">' +
        '<p class="body s01-mission step" data-step="1" data-motion="none">We build the orchestration layer between the world&rsquo;s models and its machines &mdash; giving physical AI the <b>edge</b> to run where the work happens, the <b>competence</b> to do the job well, and the <b>confidence</b> to deploy it at scale.' +
          ' <span class="step s01-mission-tail" data-step="2" data-motion="none">So it can spread across every domain, from the hardest military and industrial tasks to everyday life.</span>' +
        '</p>' +
      '</div>' +

      '<div class="s01-spine">' +
        '<svg class="s01-spine-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
          '<line class="s01-line" x1="520" y1="670" x2="1400" y2="670"/>' +
          '<circle class="s01-endnode s01-endnode--left" cx="520" cy="670" r="9"/>' +
          '<text class="s01-endlbl s01-endlbl--left mono" x="484" y="677" text-anchor="end">MODELS</text>' +
          '<circle class="s01-endnode s01-endnode--right" cx="1400" cy="670" r="9"/>' +
          '<text class="s01-endlbl s01-endlbl--right mono" x="1436" y="677" text-anchor="start">MACHINES</text>' +

          '<circle class="s01-centernode" cx="960" cy="670" r="15"/>' +

          '<g class="step s01-orch" data-step="1" data-motion="none">' +
            '<text class="s01-orchlbl mono" x="960" y="620" text-anchor="middle">ORCHESTRATION</text>' +
          '</g>' +

          '<g class="step s01-needs" data-step="1" data-motion="none">' +
            '<line class="s01-tick" x1="920" y1="686" x2="800" y2="710"/>' +
            '<text class="s01-needlbl" data-need="edge" x="790" y="734" text-anchor="middle">Edge</text>' +
            '<line class="s01-tick" x1="960" y1="686" x2="960" y2="710"/>' +
            '<text class="s01-needlbl" data-need="competence" x="960" y="734" text-anchor="middle">Competence</text>' +
            '<line class="s01-tick" x1="1000" y1="686" x2="1120" y2="710"/>' +
            '<text class="s01-needlbl" data-need="confidence" x="1130" y="734" text-anchor="middle">Confidence</text>' +
          '</g>' +
        '</svg>' +
      '</div>' +

      '<div class="step s01-domains mono" data-step="2" data-motion="none">Military &middot; Industrial &middot; Consumer</div>';
  }

  function onStep(el, i, o) {
    if (i === 1) {
      var mission = el.querySelector('.s01-mission');
      Anim.fadeUp(mission, { duration: Anim.dur(o, 550) });

      var node = el.querySelector('.s01-centernode');
      Anim.scaleIn(node, { duration: Anim.dur(o, 450), lift: false, fadeFrom: 1 });

      var orch = el.querySelector('.s01-orchlbl');
      Anim.fadeUp(orch, { delay: Anim.dur(o, 200), duration: Anim.dur(o, 450) });

      var needs = el.querySelectorAll('.s01-needlbl, .s01-tick');
      Anim.fadeUp(needs, { delay: Anim.dur(o, 380), stagger: Anim.dur(o, 80), duration: Anim.dur(o, 450) });
    }

    if (i === 2) {
      var domains = el.querySelector('.s01-domains');
      Anim.fadeUp(domains, { duration: Anim.dur(o, 500) });

      var tail = el.querySelector('.s01-mission-tail');
      Anim.fadeUp(tail, { delay: Anim.dur(o, 150), duration: Anim.dur(o, 500) });
    }
  }

  page({
    id: '01-mission',
    title: 'Mission',
    theme: 'light',
    steps: 2,
    render: render,
    onStep: onStep
  });
})();
