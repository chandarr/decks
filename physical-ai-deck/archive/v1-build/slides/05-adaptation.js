/* ==========================================================================
   Page 05 — Adaptation. Opens Act II ("What we build"): bucket 1 of 3.
   tasks/05-adaptation.md. Mini locator (top-right) carries over the page-01
   schematic with the Adaptation cable highlighted, the rest dimmed.

   Layout: header band (kicker/title/tier chip) with the mini locator badge
   overlaid top-right; body splits into two columns — a vertical three-tier
   "nervous system" spine (DELIBERATIVE top / REACTIVE / REFLEX bottom, each
   a hairline .panel row) on the left, three capability cards (Orchestration,
   Specialization, Compression) on the right; footer carries the point +
   the carry line.

   Steps: 0 base (kicker, title, tier chip, locator, empty labelled tier
   spine) · 1 tiers fill top-down with their latency readouts · 2 the three
   capability cards scaleIn in sequence · 3 the point + carry line.
   ========================================================================== */

(function () {
  'use strict';

  // top-down visual order matches the reveal order (step 1 fills top-down).
  var TIERS = [
    {
      name: 'DELIBERATIVE',
      desc: 'scene reasoning, task planning',
      latency: 'offloaded to cloud when connectivity allows'
    },
    {
      name: 'REACTIVE',
      desc: 'physics-aware policy',
      latency: 'on the edge, ~1&ndash;5 Hz'
    },
    {
      name: 'REFLEX',
      desc: 'balance, collision, compliant control',
      latency: 'deterministic, classical, milliseconds'
    }
  ];

  var CARDS = [
    {
      title: 'Orchestration',
      body: 'the framework that manages the split, the offline fallback, and hand-off latency.',
      aside: 'The piece the field lacks.'
    },
    {
      title: 'Specialization',
      body: 'distillation, transfer, task-specific tuning &rarr; small, fast, certifiable experts. ' +
        'A general model here is not just unnecessary, it\'s detrimental.'
    },
    {
      title: 'Compression',
      body: 'store perception in embedding/latent space, not human-viewable frames. The vision half of ' +
        'VLA/world-models has converged; freezing it is low-risk &mdash; and it\'s what makes "budget" real.'
    }
  ];

  function renderTier(t) {
    return '' +
      '<div class="p05-tier panel">' +
        '<span class="p05-tier-name mono">' + t.name + '</span>' +
        '<span class="p05-tier-fill step" data-step="1" data-motion="none">' +
          ' &mdash; ' + t.desc + ' &mdash; <em class="p05-tier-latency">' + t.latency + '</em>' +
        '</span>' +
      '</div>';
  }

  function renderCard(c) {
    return '' +
      '<div class="p05-card panel step" data-step="2" data-motion="none">' +
        '<p class="body p05-card-copy">' +
          '<strong class="p05-card-title">' + c.title + '</strong> &mdash; ' + c.body +
          (c.aside ? ' <em>' + c.aside + '</em>' : '') +
        '</p>' +
      '</div>';
  }

  function render() {
    return '' +
      '<div class="p05">' +

        '<div class="p05-header">' +
          Shared.kicker('What we build &middot; 1 of 3', 'p05-kicker') +
          '<h1 class="title p05-title">Adaptation &mdash; fit intelligence to the body and the job.</h1>' +
          '<div class="p05-tierchip">' + Shared.tierChip('near') + '</div>' +
        '</div>' +

        '<div class="p05-locator">' +
          Shared.locatorMap('adaptation', { variant: 'mini', idPrefix: 'p05-lm' }) +
        '</div>' +

        '<div class="p05-body">' +
          '<div class="p05-col p05-col--tiers">' +
            TIERS.map(renderTier).join('') +
          '</div>' +
          '<div class="p05-col p05-col--cards">' +
            CARDS.map(renderCard).join('') +
          '</div>' +
        '</div>' +

        '<div class="p05-footer">' +
          Shared.carry({
            step: 3,
            punchHtml: 'The asset is the repeatable pipeline &mdash; generic model + application data &rarr; certified edge expert. We sell the factory, not the widget.',
            lineHtml: 'the moat is the partition, not the model'
          }) +
        '</div>' +

      '</div>';
  }

  function onStep(el, i, o) {
    if (i === 1) {
      var fills = el.querySelectorAll('.p05-tier-fill');
      Anim.fadeUp(fills, { duration: Anim.dur(o, 500), stagger: Anim.dur(o, 150) });
    }

    if (i === 2) {
      var cards = el.querySelectorAll('.p05-card');
      Anim.scaleIn(cards, { duration: Anim.dur(o, 450), stagger: Anim.dur(o, 130) });
    }

    if (i === 3) {
      var punch = el.querySelector('.carry-punch');
      Anim.fadeUp(punch, { duration: Anim.dur(o, 600) });

      var line = el.querySelector('.carry-line');
      Anim.fadeUp(line, { delay: Anim.dur(o, 350) });
    }
  }

  page({
    id: '05-adaptation',
    title: 'Adaptation',
    theme: 'light',
    steps: 3,
    render: render,
    onStep: onStep
  });
})();
