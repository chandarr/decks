/* ==========================================================================
   Page 19 — Close. Act V / deck close: how we'd work, what AC owns, first
   moves — the ask stays implied throughout (no CTA, no contact block). The
   page-01 bridge schematic reappears once more, whole but faint (opacity
   ≤.08 via .p19-motif), sitting behind the copy as a quiet callback rather
   than the corner "you-are-here" badge used on 05–09.

   Steps: 0 base (kicker, thesis-restatement callback line, faint motif) ·
   1 "How we'd work" fades in · 2 "What I'd own" fades in · 3 "First moves"
   fades in · 4 the final line lands (carry) and holds.
   ========================================================================== */

(function () {
  'use strict';

  function block(n, label, copyHtml) {
    return '' +
      '<div class="p19-block step" data-step="' + n + '">' +
        '<div class="p19-block-content">' +
          '<div class="p19-block-label mono">' + label + '</div>' +
          '<p class="p19-block-copy">' + copyHtml + '</p>' +
        '</div>' +
      '</div>';
  }

  function render() {
    return '' +
      '<div class="p19">' +

        '<div class="p19-motif" aria-hidden="true">' +
          Shared.locatorMap(null, { variant: 'hero', idPrefix: 'p19-map' }) +
        '</div>' +

        '<div class="p19-content">' +

          '<div class="p19-header">' +
            Shared.kicker('The close', 'p19-kicker') +
            '<p class="mono p19-thesis">the right model + the right embodiment + a reliable harness, composed for the application &mdash; that&rsquo;s the middle, and it&rsquo;s open.</p>' +
          '</div>' +

          '<div class="p19-body">' +
            '<div class="p19-blocks">' +
              block(1, 'How we&rsquo;d work', 'You own market and capital. I own the technology. We build it close, and fast.') +
              block(2, 'What I&rsquo;d own', 'the research agenda, the Composer, the Assurance discipline, and the team that builds them.') +
              block(3, 'First moves', 'name the first beachhead vertical &middot; stand up the Adaptation pipeline + failure-data capture &middot; recruit the first assurance and adaptation leads &middot; ship a lighthouse deployment.') +
            '</div>' +
          '</div>' +

          '<div class="p19-footer">' +
            Shared.carry({
              step: 4,
              punchHtml: 'The middle is open. I know how to build it.',
              lineHtml: ''
            }) +
          '</div>' +

        '</div>' +
      '</div>';
  }

  function onStep(el, i, o) {
    if (i === 4) {
      var punch = el.querySelector('.carry-punch');
      Anim.fadeUp(punch, { duration: Anim.dur(o, 600) });
    }
  }

  page({
    id: '19-close',
    title: 'Close',
    theme: 'light',
    steps: 4,
    render: render,
    onStep: onStep
  });
})();
