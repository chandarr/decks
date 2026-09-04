/* ==========================================================================
   Page 07 — Assurance. Bucket 3: the trust engine — the moat with no strong
   LLM analog. Two linked blocks (the failure-data engine → certification for
   updating systems) joined by a bold ink arrow, a "why it's white space"
   standards strip under C2, and a tier ladder on the right mapping the three
   parts. Seeds the moat (page 10) and defuses weak joint #3 (cert-body
   overreach) via honest tiering (tasks/07-assurance.md).

   Steps: 0 base (kicker/title/locator, two empty block outlines, hairline
   arrow guide) · 1 C1 fills (the failure-data engine) · 2 C2 fills + the
   bold ink arrow draws C1→C2 · 3 the white-space strip + tier ladder + carry.
   ========================================================================== */

(function () {
  'use strict';

  function render() {
    return '' +
      '<div class="p07">' +

        '<div class="p07-header">' +
          '<div class="p07-header-text">' +
            Shared.kicker('What we build &middot; 3 of 3') +
            '<h1 class="title p07-title">Assurance &mdash; the trust layer nobody is building.</h1>' +
          '</div>' +
          '<div class="p07-locator-wrap">' +
            Shared.locatorMap('assurance', { variant: 'mini', idPrefix: 'p07-map' }) +
          '</div>' +
        '</div>' +

        '<div class="rule p07-rule"></div>' +

        '<div class="p07-grid">' +

          '<div class="p07-block p07-c1">' +
            '<div class="p07-block-shell panel">' +
              '<span class="p07-tag mono">C1</span>' +
            '</div>' +
            '<div class="p07-block-fill step" data-step="1" data-motion="none">' +
              '<h3 class="p07-block-title">The failure-data engine</h3>' +
              '<p class="body p07-block-copy">Every dataset encodes <em>how to do it right.</em> Almost none encodes <em>what goes wrong, and how to detect, avoid, or recover.</em> We generate it two ways: world-model rollouts (cheap edge-case synthesis) and real-world capture (rare ground truth).</p>' +
            '</div>' +
          '</div>' +

          '<div class="p07-arrow-wrap">' +
            '<div class="p07-arrow-caption mono step" data-step="2" data-motion="none">the failure corpus is the evidence base</div>' +
            '<svg class="p07-arrow-svg" viewBox="0 0 84 84" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
              '<path class="p07-arrow-guide" d="M8,42 L76,42"/>' +
              '<path class="p07-arrow-bold step" data-step="2" data-motion="none" d="M8,42 L58,42 M40,24 L74,42 L40,60"/>' +
            '</svg>' +
          '</div>' +

          '<div class="p07-block p07-c2">' +
            '<div class="p07-block-shell panel">' +
              '<span class="p07-tag mono">C2</span>' +
            '</div>' +
            '<div class="p07-block-fill step" data-step="2" data-motion="none">' +
              '<h3 class="p07-block-title">Certification for updating systems</h3>' +
              '<p class="body p07-block-copy">The failure corpus is the evidence base for certifying a probabilistic system &mdash; continuous assurance, runtime safety monitors, <em>&ldquo;this embodiment + this model version + this application = certified.&rdquo;</em></p>' +
            '</div>' +
          '</div>' +

          '<div class="p07-strip step" data-step="3" data-motion="none">' +
            '<div class="p07-strip-label mono">Why it&rsquo;s white space</div>' +
            '<div class="p07-strip-chips">' +
              '<span class="p07-chip mono">ISO 10218 / TS 15066</span>' +
              '<span class="p07-chip mono">ISO 21448 (SOTIF)</span>' +
              '<span class="p07-chip mono">UL 4600</span>' +
              '<span class="p07-chip mono">EU Machinery Regulation 2023</span>' +
            '</div>' +
            '<p class="p07-strip-copy">&mdash; all built for slow, deterministic software. <strong>None handle a system whose model updates weekly.</strong></p>' +
          '</div>' +

          '<div class="p07-ladder step" data-step="3" data-motion="none">' +
            '<div class="p07-ladder-list">' +
              '<div class="p07-ladder-rail"></div>' +
              '<div class="p07-ladder-row">' + Shared.tierChip('near') + '<span class="p07-ladder-label">failure-data + safety cases</span></div>' +
              '<div class="p07-ladder-row">' + Shared.tierChip('building') + '<span class="p07-ladder-label">continuous-assurance tooling</span></div>' +
              '<div class="p07-ladder-row">' + Shared.tierChip('aspirational') + '<span class="p07-ladder-label">a certification authority (partner with T&Uuml;V/UL; standard-setter first, not year-one)</span></div>' +
            '</div>' +
          '</div>' +

        '</div>' +

        '<div class="p07-footer">' +
          Shared.carry({
            step: 3,
            punchHtml: '<span class="p07-alert">an LLM mistake is retryable &mdash; a robot&rsquo;s is not.</span>',
            lineHtml: 'this is the fulcrum.'
          }) +
        '</div>' +

      '</div>';
  }

  function onStep(el, i, o) {
    if (i === 1) {
      var title1 = el.querySelector('.p07-c1 .p07-block-title');
      var copy1 = el.querySelector('.p07-c1 .p07-block-copy');
      Anim.fadeUp(title1, { duration: Anim.dur(o, 500) });
      Anim.fadeUp(copy1, { delay: Anim.dur(o, 150), duration: Anim.dur(o, 500) });
    }

    if (i === 2) {
      var title2 = el.querySelector('.p07-c2 .p07-block-title');
      var copy2 = el.querySelector('.p07-c2 .p07-block-copy');
      Anim.fadeUp(title2, { duration: Anim.dur(o, 500) });
      Anim.fadeUp(copy2, { delay: Anim.dur(o, 150), duration: Anim.dur(o, 500) });

      var arrow = el.querySelector('.p07-arrow-bold');
      Anim.drawPath(arrow, { delay: Anim.dur(o, 250), duration: Anim.dur(o, 700) });

      var caption = el.querySelector('.p07-arrow-caption');
      Anim.fadeUp(caption, { delay: Anim.dur(o, 650) });
    }

    if (i === 3) {
      var stripBits = el.querySelectorAll('.p07-strip-label, .p07-strip-chips .p07-chip, .p07-strip-copy');
      Anim.fadeUp(stripBits, { stagger: Anim.dur(o, 60) });

      var ladderRows = el.querySelectorAll('.p07-ladder-row');
      Anim.fadeUp(ladderRows, { delay: Anim.dur(o, 150), stagger: Anim.dur(o, 90) });

      var punch = el.querySelector('.carry-punch');
      Anim.fadeUp(punch, { delay: Anim.dur(o, 300), duration: Anim.dur(o, 600) });

      var line = el.querySelector('.carry-line');
      Anim.fadeUp(line, { delay: Anim.dur(o, 650) });
    }
  }

  page({
    id: '07-assurance',
    title: 'Assurance',
    theme: 'light',
    steps: 3,
    render: render,
    onStep: onStep
  });
})();
