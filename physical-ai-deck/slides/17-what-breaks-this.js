/* ==========================================================================
   Page 17 — What breaks this (tasks/17-what-breaks-this.md).

   Steps: 0 base (kicker, title, framing line, five faint empty row slots)
   · 1-5 each Q&A row reveals in turn (question mono + alert marker, then
   answer, tiny internal stagger) · 6 the takeaway lands.
   ========================================================================== */

(function () {
  'use strict';

  var ROWS = [
    {
      q: 'Why doesn&rsquo;t NVIDIA own this?',
      a: 'Not neutral &mdash; its stack locks you to its silicon; ours picks the best model + body + chip across vendors. And it has no appetite for the unglamorous assurance work. Firsthand: its edge hardware isn&rsquo;t deployment-reliable. Reliability is our ground, not theirs.'
    },
    {
      q: 'How does it make money?',
      a: 'Services / forward-deployed now (US/EU) &rarr; orchestration licensing &rarr; assurance &amp; certification fees. Cash early, platform later.'
    },
    {
      q: 'A startup as a certifier &mdash; really?',
      a: 'Not yet. We&rsquo;re a proving lab + a standard, partnering with T&Uuml;V/UL; the certification authority is earned over time, never claimed now.'
    },
    {
      q: 'Isn&rsquo;t this too much?',
      a: 'No &mdash; one beachhead, proven, then generalized. Near-term is focused; the rest is clearly a later tier.'
    },
    {
      q: 'Can you attract world-class talent to India?',
      a: 'We recruit on a field worth owning (embodied assurance), a world-class core over a deep base, and global nodes. India is talent and proving ground &mdash; not the market.'
    }
  ];

  function rowHtml(row, n) {
    return '' +
      '<div class="s17-row">' +
        '<div class="s17-q mono step" data-step="' + n + '" data-motion="none">' +
          '<span class="s17-qmark" aria-hidden="true">&mdash;</span>&ldquo;' + row.q + '&rdquo;' +
        '</div>' +
        '<div class="s17-a step" data-step="' + n + '" data-motion="none">' + row.a + '</div>' +
      '</div>';
  }

  function render() {
    var rows = ROWS.map(rowHtml).join('');
    return '' +
      Shared.kicker('What breaks this', 's17-kicker') +
      '<div class="s17-slideno mono">17</div>' +

      '<h1 class="title s17-title">I&rsquo;ve already found the weak joints.</h1>' +
      '<p class="s17-framing">The sharp questions &mdash; answered before you ask them.</p>' +

      '<div class="s17-rows">' + rows + '</div>' +

      '<div class="s17-takeaway">' +
        Shared.carry({ step: 6, punchHtml: 'A leader is judged by the questions they&rsquo;ve already asked themselves.' }) +
      '</div>';
  }

  function onStep(el, i, o) {
    if (i >= 1 && i <= 5) {
      var parts = el.querySelectorAll('.s17-rows [data-step="' + i + '"]');
      Anim.fadeUp(parts, { stagger: Anim.dur(o, 150), duration: Anim.dur(o, 450) });
    }
    if (i === 6) {
      var punch = el.querySelector('.carry-punch');
      Anim.fadeUp(punch, { duration: Anim.dur(o, 550) });
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
