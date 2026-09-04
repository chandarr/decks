/* ==========================================================================
   Page 04a — The three pillars (tasks/04a-pillars.md). Opens Act II.
   ★NEW slide, inserted after 04 (see build-order.txt / DECK-INDEX.md).

   Steps: 0 base (kicker, title, framing line, three empty card frames) ·
   1 Adaptation card fills · 2 Autonomy card fills · 3 Assurance card fills ·
   4 the carry line. Cards fill left->right, one at a time (§13). Ink/
   graphite only — no bronze/slate (those are reserved for model/embodiment
   on 03/04).
   ========================================================================== */

(function () {
  'use strict';

  var CARDS = [
    {
      num: '01', word: 'ADAPTATION', chip: 'delivers the EDGE',
      bullets: [
        'Fit any model to any body &mdash; on the device, in real time.',
        'Compress and optimize to run offline, at the edge.',
        'Tune to the specific task, workspace, and environment.'
      ]
    },
    {
      num: '02', word: 'AUTONOMY', chip: 'delivers COMPETENCE',
      bullets: [
        'Learns the job: qualified, trained, harnessed to the task.',
        'Improves from feedback &mdash; shown or told, visual or verbal.',
        'Every correction becomes policy &mdash; it keeps evolving in the field.'
      ]
    },
    {
      num: '03', word: 'ASSURANCE', chip: 'delivers CONFIDENCE',
      bullets: [
        'A reliability harness: watchdogs, failsafes, collision &amp; abnormality awareness.',
        'A living certified envelope &mdash; not a one-time stamp.',
        'A proving lab and a standard now; certification authority over time.'
      ]
    }
  ];

  var CX = [480, 960, 1440];

  function card(c, i) {
    var n = i + 1;
    return '' +
      '<div class="s04a-card" style="left:calc(' + (CX[i] - 220) + ' * var(--px));">' +
        '<div class="s04a-card-inner step" data-step="' + n + '" data-motion="none">' +
          '<div class="s04a-num mono">' + c.num + '</div>' +
          '<div class="s04a-word">' + c.word + '</div>' +
          '<div class="s04a-underline"></div>' +
          '<div class="s04a-chip mono">' + c.chip + '</div>' +
          '<ul class="s04a-bullets">' +
            c.bullets.map(function (b) { return '<li>' + b + '</li>'; }).join('') +
          '</ul>' +
        '</div>' +
      '</div>';
  }

  function render() {
    return '' +
      Shared.kicker('The method', 's04a-kicker') +
      '<div class="s04a-slideno mono">04a</div>' +

      '<h1 class="title s04a-title">Three pillars turn models into dependable machines.</h1>' +
      '<p class="s04a-framing">Each pillar delivers one thing the machine must have &mdash; the edge, the competence, the confidence.</p>' +

      '<div class="s04a-cards">' + CARDS.map(card).join('') + '</div>' +

      '<div class="s04a-carry">' +
        Shared.carry({ step: 4, punchHtml: 'Adaptation, Autonomy, Assurance &mdash; we take each one next.' }) +
      '</div>';
  }

  function onStep(el, i, o) {
    if (i >= 1 && i <= 3) {
      var inner = el.querySelector('.s04a-card-inner[data-step="' + i + '"]');
      if (!inner) return;
      var parts = [
        inner.querySelector('.s04a-num'),
        inner.querySelector('.s04a-word'),
        inner.querySelector('.s04a-underline'),
        inner.querySelector('.s04a-chip')
      ].concat(Array.prototype.slice.call(inner.querySelectorAll('.s04a-bullets li')));
      Anim.fadeUp(parts, { duration: Anim.dur(o, 400), stagger: Anim.dur(o, 55) });
    }

    if (i === 4) {
      var punch = el.querySelector('.carry-punch');
      Anim.fadeUp(punch, { duration: Anim.dur(o, 500) });
    }
  }

  page({
    id: '04a-pillars',
    title: 'The three pillars',
    theme: 'light',
    steps: 4,
    render: render,
    onStep: onStep
  });
})();
