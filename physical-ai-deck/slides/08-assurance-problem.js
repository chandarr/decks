/* ==========================================================================
   Page 08 — Assurance · the problem (tasks/08-assurance-problem.md).

   Steps: 0 base (envelope: lit center, dark edges) · 1 the inversion
   (framing line, edges emphasize) · 2 the mismatch (stamp applies, model
   updates pulse, stamp cracks to EXPIRED and stays stale) · 3 consequence
   + mandate + takeaway.
   ========================================================================== */

(function () {
  'use strict';

  var CX = 960, CY = 430;

  function envelopeSvg() {
    return '' +
      '<svg class="s08-hero-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
        '<ellipse class="s08-edge" cx="' + CX + '" cy="' + CY + '" rx="170" ry="105"/>' +
        '<circle class="s08-litcenter" cx="' + CX + '" cy="' + CY + '" r="10"/>' +

        '<g class="s08-stamp" transform="translate(' + CX + ',' + CY + ') rotate(-7)">' +
          '<g class="s08-stamp-scale step" data-step="2" data-motion="none">' +
            '<rect class="s08-stamp-rect" x="-108" y="-30" width="216" height="60" rx="6"/>' +
            '<text class="s08-stamp-txt mono" x="0" y="-4" text-anchor="middle">CERTIFIED</text>' +
            '<text class="s08-stamp-sub mono" x="0" y="18" text-anchor="middle">static software</text>' +
          '</g>' +
        '</g>' +

        '<text class="s08-version mono" x="' + CX + '" y="' + (CY + 148) + '" text-anchor="middle">v1</text>' +
      '</svg>';
  }

  function render() {
    return '' +
      Shared.kicker('Assurance &middot; the problem', 's08-kicker') +
      '<div class="s08-slideno mono">08</div>' +

      '<h1 class="title s08-title">Certification wasn&rsquo;t built for machines that learn.</h1>' +

      '<div class="s08-framing-wrap"><p class="s08-framing step" data-step="1" data-motion="none">The whole world is building datasets of how things should work. Almost no one is building how they fail.</p></div>' +

      '<div class="s08-hero">' + envelopeSvg() + '</div>' +

      '<div class="s08-consequence-wrap">' +
        '<p class="s08-consequence step" data-step="3" data-motion="none">No failure map, and no certification fit for a system that learns &rarr; <b>no confidence, no high-stakes deployment.</b></p>' +
        '<p class="s08-aside step" data-step="3" data-motion="none">(A cloud-dependent system can never be certified at all &mdash; see slide 05.)</p>' +
        '<p class="s08-mandate step" data-step="3" data-motion="none">The old rulebook is obsolete. Someone has to build a new way to prove a system that learns.</p>' +
      '</div>' +

      '<div class="s08-takeaway">' +
        Shared.carry({ step: 3, punchHtml: 'You can&rsquo;t prove a system that learns with rules made for one that can&rsquo;t. That&rsquo;s the work &mdash; and it&rsquo;s ours.' }) +
      '</div>';
  }

  function startMismatch(el, stops, o) {
    var stamp = el.querySelector('.s08-stamp');
    var version = el.querySelector('.s08-version');

    Anim.scaleIn(el.querySelector('.s08-stamp-scale'), { duration: Anim.dur(o, 450), fadeFrom: 0, lift: false });

    function expire() {
      stamp.classList.add('is-expired');
      stamp.querySelector('.s08-stamp-txt').textContent = 'EXPIRED';
      stamp.querySelector('.s08-stamp-sub').textContent = 'stale on arrival';
    }

    if (Anim.reduced) {
      expire();
      version.textContent = 'v1 → v2 → v3';
      return;
    }

    var n = 1, live = true, expired = false;
    var id = setInterval(function () {
      if (!live) return;
      n++;
      version.textContent = 'v' + n;
      if (!expired) { expired = true; expire(); }
    }, 1300);
    stops.push(function () { live = false; clearInterval(id); });
  }

  function onEnter(el) { el._s08stops = []; }

  function onStep(el, i, o) {
    if (i === 1) {
      Anim.fadeUp(el.querySelector('.s08-framing'), { duration: Anim.dur(o, 500) });
      el.querySelector('.s08-hero').classList.add('is-emphasized');
    }

    if (i === 2) {
      startMismatch(el, el._s08stops, o);
    }

    if (i === 3) {
      var lines = el.querySelectorAll('.s08-consequence, .s08-aside, .s08-mandate');
      Anim.fadeUp(lines, { stagger: Anim.dur(o, 130), duration: Anim.dur(o, 450) });

      var punch = el.querySelector('.carry-punch');
      Anim.fadeUp(punch, { delay: Anim.dur(o, 400), duration: Anim.dur(o, 550) });
    }
  }

  function onLeave(el) {
    (el._s08stops || []).forEach(function (stop) { stop(); });
    el._s08stops = [];
  }

  page({
    id: '08-assurance-problem',
    title: 'Assurance — the problem',
    theme: 'light',
    steps: 3,
    render: render,
    onEnter: onEnter,
    onStep: onStep,
    onLeave: onLeave
  });
})();
