/* ==========================================================================
   Page 17 — What breaks this. Act IV close / foresight climax: the founder's
   sharpest attacks, pre-answered. A two-column Q&rarr;A grid, five rows —
   question (mono, --alert-tinted marker) on the left, crisp ink answer on
   the right. No locator badge (tasks/17 layout doesn't call for one; only
   05&ndash;09/18/19 carry the mini "you-are-here").

   Steps: 0 base (kicker/title/framing line, empty row-divider shells) ·
   1&ndash;5 each Q&rarr;A row reveals in turn, question then answer ·
   6 the close line (carry).
   ========================================================================== */

(function () {
  'use strict';

  function row(n, mark, qHtml, aHtml) {
    return '' +
      '<div class="p17-row">' +
        '<div class="p17-row-content step" data-step="' + n + '" data-motion="none">' +
          '<div class="p17-q">' +
            '<span class="p17-q-mark mono">' + mark + '</span>' +
            '<p class="p17-q-text">' + qHtml + '</p>' +
          '</div>' +
          '<div class="p17-a">' +
            '<p class="p17-a-text">' + aHtml + '</p>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function render() {
    return '' +
      '<div class="p17">' +

        '<div class="p17-header">' +
          Shared.kicker('What breaks this', 'p17-kicker') +
          '<h1 class="title p17-title">I&rsquo;ve already found the weak joints.</h1>' +
          '<p class="body p17-framing">The sharp questions, answered before you ask them.</p>' +
        '</div>' +

        '<hr class="rule p17-rule">' +

        '<div class="p17-grid">' +
          row(1, 'Q1',
            '&ldquo;Why doesn&rsquo;t NVIDIA own this?&rdquo;',
            'Not neutral (locks to its silicon); no appetite for the unglamorous Assurance layer; firsthand, its edge hardware isn&rsquo;t deployment-reliable. <strong>Reliability is our ground, not theirs.</strong>') +
          row(2, 'Q2',
            '&ldquo;How does it make money?&rdquo;',
            'Services / forward-deployed now (US/EU) &rarr; Composer licensing &rarr; assurance/certification fees. <strong>Cash early, platform later.</strong>') +
          row(3, 'Q3',
            '&ldquo;A startup as a certification body &mdash; really?&rdquo;',
            'Standard-setter + safety-case tooling + failure-data first; partner with T&Uuml;V/UL; <strong>authority is earned, not claimed.</strong>') +
          row(4, 'Q4',
            '&ldquo;Isn&rsquo;t the Composer hand-waving?&rdquo;',
            'v1 is a human-in-the-loop config tool over validated recipes; autonomy grows with the data. <strong>Incremental, not magic.</strong>') +
          row(5, 'Q5',
            '&ldquo;Superhuman is niche vs. a horizontal platform.&rdquo;',
            'Go vertical-deep on one beachhead, generalize the platform from it. <strong>The tension is real; the sequencing resolves it.</strong>') +
        '</div>' +

        '<div class="p17-footer">' +
          Shared.carry({
            step: 6,
            punchHtml: 'a leader is judged by the questions they&rsquo;ve already asked themselves',
            lineHtml: ''
          }) +
        '</div>' +

      '</div>';
  }

  function onStep(el, i, o) {
    if (i >= 1 && i <= 5) {
      var content = el.querySelector('.p17-row-content[data-step="' + i + '"]');
      if (!content) return;
      var q = content.querySelector('.p17-q');
      var a = content.querySelector('.p17-a');
      Anim.fadeUp(q, { duration: Anim.dur(o, 450) });
      Anim.fadeUp(a, { delay: Anim.dur(o, 150), duration: Anim.dur(o, 450) });
    }

    if (i === 6) {
      var punch = el.querySelector('.carry-punch');
      Anim.fadeUp(punch, { duration: Anim.dur(o, 600) });
    }
  }

  page({
    id: '17-what-breaks-this',
    title: 'What breaks this',
    theme: 'light',
    steps: 6,
    render: render,
    onStep: onStep
  });
})();
