/* ==========================================================================
   Page 09 — Assurance · our approach (tasks/09-assurance-approach.md).
   Reuses slide 08's envelope geometry as a before→after: dark edges → mapped,
   EXPIRED static stamp → living PROVEN seal that refreshes on update.

   Steps: 0 base (envelope + 4 faint slots) · 1 map how it fails (boundary
   points light) · 2 guard it at runtime (guard ring + catch) · 3 prove it,
   keep proving it (PROVEN seal, re-proves on update — the payoff) ·
   4 the horizon (faint authority ring) + takeaway.
   ========================================================================== */

(function () {
  'use strict';

  var CX = 560, CY = 500;
  var ENV_RX = 170, ENV_RY = 105;
  var GUARD_RX = 128, GUARD_RY = 80;
  var AUTH_RX = 214, AUTH_RY = 138;
  var N_POINTS = 16;

  var DELIVERABLES = [
    {
      key: 'failuredata', tier: 'near', title: 'Failure-data engine',
      body: 'map how it fails: dense world-model rollouts + real-deployment ground truth.'
    },
    {
      key: 'harness', tier: 'near', title: 'Reliability harness',
      body: 'runtime guardians keep it inside the envelope: watchdogs, failsafes, collision-awareness, abnormality detection.'
    },
    {
      key: 'provinglab', tier: 'near', title: 'Proving lab &amp; standard',
      body: 'characterize the boundary, build the safety case, and re-prove continuously: &ldquo;this embodiment + this model version + this application = proven.&rdquo;'
    },
    {
      key: 'authority', tier: 'aspirational', title: 'Certification authority',
      body: 'as the standard is adopted, the authority emerges. We set the standard and partner with T&Uuml;V / UL now; the authority is earned later.'
    }
  ];

  function ellipsePoint(rx, ry, angleDeg) {
    var r = angleDeg * Math.PI / 180;
    return { x: CX + rx * Math.cos(r), y: CY + ry * Math.sin(r) };
  }

  function boundaryPoints() {
    var out = '';
    for (var i = 0; i < N_POINTS; i++) {
      var p = ellipsePoint(ENV_RX, ENV_RY, (360 / N_POINTS) * i);
      out += '<circle class="s09-boundary-dot" cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="4"/>';
    }
    return out;
  }

  function heroSvg() {
    var guardEdge = ellipsePoint(GUARD_RX, GUARD_RY, -60);
    return '' +
      '<svg class="s09-hero-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
        '<ellipse class="s09-authring step" data-step="4" data-motion="none" cx="' + CX + '" cy="' + CY + '" rx="' + AUTH_RX + '" ry="' + AUTH_RY + '"/>' +
        '<ellipse class="s09-edge" cx="' + CX + '" cy="' + CY + '" rx="' + ENV_RX + '" ry="' + ENV_RY + '"/>' +
        '<g class="s09-boundary step" data-step="1" data-motion="none">' + boundaryPoints() + '</g>' +
        '<ellipse class="s09-guard step" data-step="2" data-motion="none" cx="' + CX + '" cy="' + CY + '" rx="' + GUARD_RX + '" ry="' + GUARD_RY + '"/>' +
        '<circle class="s09-catch step" data-step="2" data-motion="none" cx="' + guardEdge.x.toFixed(1) + '" cy="' + guardEdge.y.toFixed(1) + '" r="6"/>' +
        '<circle class="s09-litcenter" cx="' + CX + '" cy="' + CY + '" r="10"/>' +

        '<g class="s09-seal-wrap step" data-step="3" data-motion="none">' +
          '<rect class="s09-seal" x="' + (CX - 66) + '" y="' + (CY - 78) + '" width="132" height="42" rx="21"/>' +
          '<text class="s09-seal-txt mono" x="' + CX + '" y="' + (CY - 52) + '" text-anchor="middle">PROVEN</text>' +
        '</g>' +

        '<text class="s09-version mono" x="' + CX + '" y="' + (CY + ENV_RY + 46) + '" text-anchor="middle">v1</text>' +
      '</svg>';
  }

  function deliverable(d, i) {
    return '' +
      '<div class="s09-deliv step" data-step="' + (i + 1) + '" data-motion="none" data-key="' + d.key + '">' +
        '<div class="s09-deliv-head">' +
          '<span class="s09-deliv-title">' + d.title + '</span>' +
          Shared.tierChip(d.tier) +
        '</div>' +
        '<p class="s09-deliv-body">' + d.body + '</p>' +
      '</div>';
  }

  function render() {
    return '' +
      Shared.kicker('Assurance &middot; our approach', 's09-kicker') +
      '<div class="s09-slideno mono">09</div>' +

      '<h1 class="title s09-title">A new way to prove a machine that learns.</h1>' +

      '<div class="s09-hero">' + heroSvg() + '</div>' +

      '<div class="s09-delivs">' + DELIVERABLES.map(deliverable).join('') + '</div>' +

      '<div class="s09-takeaway">' +
        Shared.carry({ step: 4, punchHtml: 'Map how it fails, guard it at runtime, and re-prove it as it learns &mdash; confidence you can certify. Today the standard; tomorrow the authority.' }) +
      '</div>';
  }

  function startReprove(el, stops, o) {
    var seal = el.querySelector('.s09-seal-wrap');
    var version = el.querySelector('.s09-version');

    Anim.scaleIn(seal, { duration: Anim.dur(o, 450), fadeFrom: 0 });

    if (Anim.reduced) {
      version.textContent = 'v1 → v2 ✓ re-proven';
      return;
    }

    var n = 1, live = true;
    var id = setInterval(function () {
      if (!live) return;
      n++;
      version.textContent = 'v' + n + ' → re-proven ✓';
      seal.classList.remove('is-pulsing');
      void seal.offsetWidth;
      seal.classList.add('is-pulsing');
    }, 1600);
    stops.push(function () { live = false; clearInterval(id); });
  }

  function onEnter(el) { el._s09stops = []; }

  function onStep(el, i, o) {
    if (i === 1) {
      var dots = el.querySelectorAll('.s09-boundary-dot');
      Anim.fadeUp(dots, { stagger: Anim.dur(o, 45), duration: Anim.dur(o, 350) });
      Anim.fadeUp(el.querySelector('.s09-deliv[data-key="failuredata"]'), { delay: Anim.dur(o, 250), duration: Anim.dur(o, 450) });
    }

    if (i === 2) {
      Anim.scaleIn(el.querySelector('.s09-guard'), { duration: Anim.dur(o, 400), fadeFrom: 0 });

      var catchEl = el.querySelector('.s09-catch');
      setTimeout(function () {
        if (!el.isConnected) return;
        Anim.radiate([catchEl], { x: CX, y: CY }, { duration: Anim.dur(o, 500), from: 0.4 });
      }, o && o.static ? 0 : 350);

      Anim.fadeUp(el.querySelector('.s09-deliv[data-key="harness"]'), { duration: Anim.dur(o, 450) });
    }

    if (i === 3) {
      startReprove(el, el._s09stops, o);
      Anim.fadeUp(el.querySelector('.s09-deliv[data-key="provinglab"]'), { duration: Anim.dur(o, 450) });
    }

    if (i === 4) {
      Anim.scaleIn(el.querySelector('.s09-authring'), { duration: Anim.dur(o, 500), fadeFrom: 0 });
      Anim.fadeUp(el.querySelector('.s09-deliv[data-key="authority"]'), { duration: Anim.dur(o, 450) });

      var punch = el.querySelector('.carry-punch');
      Anim.fadeUp(punch, { delay: Anim.dur(o, 300), duration: Anim.dur(o, 550) });
    }
  }

  function onLeave(el) {
    (el._s09stops || []).forEach(function (stop) { stop(); });
    el._s09stops = [];
  }

  page({
    id: '09-assurance-approach',
    title: 'Assurance — our approach',
    theme: 'light',
    steps: 4,
    render: render,
    onEnter: onEnter,
    onStep: onStep,
    onLeave: onLeave
  });
})();
