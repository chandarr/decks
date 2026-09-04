/* ==========================================================================
   Page 09 — Superhuman. Closes Act II: the three buckets built for the
   general case structurally select for superhuman work and against
   commodity substitution — the emotional peak of the "what we build" arc.

   Steps: 0 base (kicker/title/locator, two empty column headers) ·
   1 substitution column fills (left, muted) · 2 superhuman column fills
   (right, ink) · 3 the property→bucket mapping draws on (drawPath the
   connectors, fadeUp the labels) · 4 beachhead line + the honest
   vertical-depth tension note + carry.
   ========================================================================== */

(function () {
  'use strict';

  function mapRow(step, prop, bucket, accentVar) {
    return '' +
      '<div class="p09-map-row">' +
        '<span class="p09-map-prop mono step" data-step="' + step + '" data-motion="none">' + prop + '</span>' +
        '<svg class="p09-map-arrow step" data-step="' + step + '" data-motion="none" viewBox="0 0 70 14" aria-hidden="true">' +
          '<path class="p09-map-line" d="M2,7 H52 M46,1 L60,7 L46,13" stroke="' + accentVar + '"/>' +
        '</svg>' +
        '<span class="p09-map-bucket mono step" data-step="' + step + '" data-motion="none">' + bucket + '</span>' +
      '</div>';
  }

  function render() {
    return '' +
      '<div class="p09">' +

        Shared.kicker('The bonus that falls out', 'p09-kicker') +
        '<h1 class="title p09-title">We don\'t chase substitution. We unlock the impossible.</h1>' +
        '<div class="p09-locator">' + Shared.locatorMap('superhuman', { variant: 'mini' }) + '</div>' +
        '<hr class="rule p09-rule">' +

        '<div class="p09-body">' +

          '<div class="p09-columns">' +

            '<div class="p09-col p09-col--substitution">' +
              '<div class="p09-col-label mono">Substitution</div>' +
              '<p class="p09-col-copy step" data-step="1">Folding, vacuuming, bin-picking &mdash; a race to the bottom on cost, where hardware and supply-chain scale win and margins vanish. Leave it to the full-stack players.</p>' +
            '</div>' +

            '<div class="p09-col p09-col--superhuman">' +
              '<div class="p09-col-label mono">Superhuman</div>' +
              '<p class="p09-col-copy step" data-step="2">Mining, oil &amp; gas, nuclear, subsea, extreme weather &mdash; no human demonstration data, high willingness-to-pay, no incumbent data lead.</p>' +

              '<div class="p09-mapping">' +
                mapRow(3, 'no data', 'Adaptation', 'var(--accent-b)') +
                mapRow(3, 'goal-driven, no recipe', 'Autonomy', 'var(--accent-a)') +
                mapRow(3, 'high consequence', 'Assurance', 'var(--accent-b)') +
                '<p class="p09-map-close step" data-step="3" data-motion="none">A middle built for the general case is the only thing that can do this.</p>' +
              '</div>' +

            '</div>' +

          '</div>' +

          '<div class="p09-tension">' +
            '<p class="p09-tension-line1 body step" data-step="4" data-motion="none">Superhuman is the story\'s bonus and the roadmap\'s first proof.</p>' +
            '<p class="p09-tension-line2 body step" data-step="4" data-motion="none"><em>Honest note:</em> these verticals demand deep domain + hardware specialization &mdash; so we go vertical-deep on one beachhead first, then generalize the platform.</p>' +
          '</div>' +

          '<div class="p09-footer">' +
            Shared.carry({
              step: 4,
              punchHtml: 'the buckets select for superhuman &mdash; and against commodity substitution',
              lineHtml: ''
            }) +
          '</div>' +

        '</div>' +

      '</div>';
  }

  function onStep(el, i, o) {
    if (i === 3) {
      var lines = el.querySelectorAll('.p09-map-line');
      Anim.drawPath(lines, { duration: Anim.dur(o, 650), stagger: Anim.dur(o, 130) });

      var labels = el.querySelectorAll('.p09-map-prop, .p09-map-bucket');
      Anim.fadeUp(labels, { delay: Anim.dur(o, 200), stagger: Anim.dur(o, 70) });

      var close = el.querySelector('.p09-map-close');
      Anim.fadeUp(close, { delay: Anim.dur(o, 650), duration: Anim.dur(o, 500) });
    }

    if (i === 4) {
      var t1 = el.querySelector('.p09-tension-line1');
      var t2 = el.querySelector('.p09-tension-line2');
      Anim.fadeUp([t1, t2], { stagger: Anim.dur(o, 150) });

      var punch = el.querySelector('.carry-punch');
      Anim.fadeUp(punch, { delay: Anim.dur(o, 400), duration: Anim.dur(o, 600) });
    }
  }

  page({
    id: '09-superhuman',
    title: 'Superhuman',
    theme: 'light',
    steps: 4,
    render: render,
    onStep: onStep
  });
})();
