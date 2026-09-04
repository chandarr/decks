(function () {
  'use strict';

  /* Ladder geometry — three tiers, top = hardest (largest/heaviest),
     descending in weight toward the bottom (easiest). Kept compact
     within the central band (~y290-626) per §11 center-weight. */
  var LADDER_X = 560, LADDER_W = 560;
  var TIERS = [
    { y: 290, h: 90, label: 'Space &amp; medical-grade' },
    { y: 430, h: 78, label: 'Industrial &amp; automotive-grade' },
    { y: 560, h: 66, label: 'Consumer-grade' }
  ];
  var BADGE_CX = LADDER_X + LADDER_W - 70;

  /* The "lit" state (dim → believed) is a plain CSS class toggle on the
     always-present tier rect, not a .step-gated/opacity-animated overlay —
     that keeps the reduced-motion end state correct regardless of when the
     class lands (Anim.fadeUp's reduced-motion reset() would otherwise fall
     back to a non-step-gated element's CSS rest opacity, i.e. hidden). */
  function tierMarkup(t, i) {
    var cy = t.y + t.h / 2;
    return '' +
      '<g class="s11-tier-grp" data-i="' + i + '">' +
        '<rect class="s11-tier s11-tier-' + i + '" x="' + LADDER_X + '" y="' + t.y + '" width="' + LADDER_W + '" height="' + t.h + '" rx="10"/>' +
        '<text class="s11-tier-label mono" x="' + (LADDER_X + 28) + '" y="' + (cy + 6) + '" text-anchor="start">' + t.label + '</text>' +
      '</g>';
  }

  function heroSvg() {
    var top = TIERS[0];
    var badgeCy = top.y + top.h / 2;
    return '' +
      '<svg class="s11-hero-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
        tierMarkup(TIERS[0], 0) +
        tierMarkup(TIERS[1], 1) +
        tierMarkup(TIERS[2], 2) +
        '<g class="s11-badge-pos" transform="translate(' + BADGE_CX + ',' + badgeCy + ')">' +
          '<g class="s11-badge step" data-step="1" data-motion="none">' +
            '<circle class="s11-badge-ring" r="34"/>' +
            '<text class="s11-badge-txt mono" x="0" y="5" text-anchor="middle">PROVEN</text>' +
          '</g>' +
        '</g>' +
      '</svg>';
  }

  function render() {
    return '' +
      Shared.kicker('Why the hardest first', 's11-kicker') +
      '<div class="s11-slideno mono">11</div>' +
      '<h1 class="title s11-title">Prove the hardest &mdash; the rest is believed.</h1>' +
      '<div class="s11-hero">' + heroSvg() + '</div>' +
      '<p class="s11-line s11-line-prove step" data-step="1" data-motion="none">We prove the integrated system where failure is unacceptable.</p>' +
      '<p class="s11-line s11-line-cascade step" data-step="2" data-motion="none">Proven at the top, and every easier grade is instantly believed &mdash; no re-proving from scratch.</p>' +
      '<div class="s11-advantages">' +
        '<p class="s11-adv step" data-step="3" data-motion="none"><b>No incumbent</b> &mdash; nobody has done the impossible, so there&rsquo;s no data moat to beat.</p>' +
        '<p class="s11-adv step" data-step="3" data-motion="none"><b>Premium value</b> &mdash; high-stakes tasks command it; not a race to the bottom on cost.</p>' +
        '<p class="s11-adv step" data-step="3" data-motion="none"><b>It forces the whole system</b> &mdash; the hardest problem has no slack; it proves all three A&rsquo;s together.</p>' +
      '</div>' +
      '<div class="s11-takeaway">' +
        Shared.carry({ step: 4, punchHtml: 'Solve the top of the difficulty stack once &mdash; trust, and the platform, cascade to everything below.' }) +
      '</div>';
  }

  function onEnter(el) {
    el._s11stops = [];
  }

  function onStep(el, i, o) {
    if (i === 1) {
      Anim.scaleIn(el.querySelector('.s11-badge'), { duration: Anim.dur(o, 420), fadeFrom: 0, lift: false });
      el.querySelector('.s11-tier-0').classList.add('is-lit');
      Anim.fadeUp(el.querySelector('.s11-line-prove'), { duration: Anim.dur(o, 500) });
    }
    if (i === 2) {
      // Hero cascade: light the middle tier now, the bottom tier a beat
      // later, so the wave clearly reads top -> down. A live reduced-motion
      // preference (not just static catch-up) also skips the stagger, per
      // "no sweep" in reduced motion.
      var midTier = el.querySelector('.s11-tier-1'), botTier = el.querySelector('.s11-tier-2');
      midTier.classList.add('is-lit');
      var lightBottom = function () { if (el.isConnected) botTier.classList.add('is-lit'); };
      if ((o && o.static) || Anim.reduced) {
        lightBottom();
      } else {
        var t = setTimeout(lightBottom, 420);
        el._s11stops.push(function () { clearTimeout(t); });
      }
      Anim.fadeUp(el.querySelector('.s11-line-cascade'), { duration: Anim.dur(o, 500), delay: Anim.dur(o, 200) });
    }
    if (i === 3) {
      Anim.fadeUp(el.querySelectorAll('.s11-adv'), { duration: Anim.dur(o, 480), stagger: Anim.dur(o, 110) });
    }
    if (i === 4) {
      Anim.fadeUp(el.querySelector('.carry-punch'), { duration: Anim.dur(o, 550) });
    }
  }

  function onLeave(el) {
    (el._s11stops || []).forEach(function (stop) { stop(); });
    el._s11stops = [];
  }

  page({
    id: '11-beachhead-cascade',
    title: 'The advantage of the hardest',
    theme: 'light',
    steps: 4,
    render: render,
    onEnter: onEnter,
    onStep: onStep,
    onLeave: onLeave
  });
})();
