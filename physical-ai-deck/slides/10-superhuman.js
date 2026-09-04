/* ==========================================================================
   Page 10 — Superhuman · "Three capabilities, one superhuman goal."
   (tasks/10-superhuman.md — FULL REDESIGN.)

   The previous build hand-placed SVG text at scattered fixed coordinates and
   animated invisible dots, so it rendered as disconnected fragments in mostly
   empty space. This is a boxed HTML/flexbox layout: every text element lives
   inside a real box positioned by flex, never by hand-computed x/y. The one
   piece of SVG is the decorative merge connector between the two flex columns
   of row 1 — it carries no text.

   Steps: 0 base (pillars + faint connector + empty outlined goal box) ·
   1 the connector draws and the "all three, at once" label lands ·
   2 the goal box fills · 3 the reasoning chain builds left->right ·
   4 the takeaway.
   ========================================================================== */

(function () {
  'use strict';

  var PILLARS = [
    { word: 'ADAPTATION', need: 'Edge' },
    { word: 'AUTONOMY',   need: 'Competence' },
    { word: 'ASSURANCE',  need: 'Confidence' }
  ];

  var CHAIN = ['LANGUAGE', 'PHYSICS', 'PLANNING'];

  /* Merge connector. viewBox height 260 matches the pillar stack exactly
     (3 boxes x 76 + 2 gaps x 16), so each line leaves its own box's centre. */
  var MERGE_VB_W = 300, MERGE_VB_H = 260;
  var PILLAR_CY = [38, 130, 222];
  var JOIN_X = 168, JOIN_Y = 130, TIP_X = 258;

  function pillarBox(p) {
    return '' +
      '<div class="s10-pillar">' +
        '<b>' + p.word + '</b>' +
        '<span class="s10-pillar-sep">&middot;</span>' +
        '<i>' + p.need + '</i>' +
      '</div>';
  }

  function mergeSvg() {
    var lines = PILLAR_CY.map(function (cy) {
      return '<path class="s10-merge-line" d="M0,' + cy + ' L' + JOIN_X + ',' + JOIN_Y + '"/>';
    }).join('');
    return '' +
      '<svg class="s10-merge-svg" viewBox="0 0 ' + MERGE_VB_W + ' ' + MERGE_VB_H + '" ' +
           'preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
        lines +
        '<path class="s10-merge-line" d="M' + JOIN_X + ',' + JOIN_Y + ' L' + TIP_X + ',' + JOIN_Y + '"/>' +
        '<path class="s10-merge-head" d="M' + TIP_X + ',' + (JOIN_Y - 9) +
              ' L' + (TIP_X + 18) + ',' + JOIN_Y +
              ' L' + TIP_X + ',' + (JOIN_Y + 9) + ' Z"/>' +
      '</svg>';
  }

  function chainMarkup() {
    var out = CHAIN.map(function (w) {
      return '<div class="s10-chain-box mono step" data-step="3" data-motion="none">' + w + '</div>' +
             '<span class="s10-chain-arrow step" data-step="3" data-motion="none">&rarr;</span>';
    }).join('');
    // the destination box — ink tick, never --alert (it's a capability)
    return out +
      '<div class="s10-chain-box s10-chain-box--end mono step" data-step="3" data-motion="none">' +
        'UNSEEN TASK &#10003;' +
      '</div>';
  }

  function render() {
    return '' +
      Shared.kicker('The integrating goal', 's10-kicker') +
      '<div class="s10-slideno mono">10</div>' +

      '<h1 class="title s10-title">Three capabilities, one superhuman goal.</h1>' +

      '<div class="s10-row1">' +
        '<div class="s10-pillars">' + PILLARS.map(pillarBox).join('') + '</div>' +

        '<div class="s10-merge">' +
          '<div class="s10-merge-label mono step" data-step="1" data-motion="none">all three, at once</div>' +
          mergeSvg() +
        '</div>' +

        '<div class="s10-goal">' +
          '<div class="s10-goal-word step" data-step="2" data-motion="none">SUPERHUMAN</div>' +
          '<div class="s10-goal-sub step" data-step="2" data-motion="none">a task humans can&rsquo;t do.</div>' +
          '<div class="s10-goal-chip mono step" data-step="2" data-motion="none">' +
            'direction &middot; tangible output &middot; monetizable' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="s10-chainband">' +
        '<div class="s10-chain-label mono step" data-step="3" data-motion="none">' +
          'Reachable by reasoning transfer &mdash; not imitation:' +
        '</div>' +
        '<div class="s10-chain">' + chainMarkup() + '</div>' +
      '</div>' +

      '<div class="s10-takeaway">' +
        Shared.carry({
          step: 4,
          punchHtml: 'Aim at what humans can&rsquo;t do, and the three fire together.',
          lineHtml: 'Prove the hardest &mdash; the rest is believed.'
        }) +
      '</div>';
  }

  function onEnter() {}

  function onStep(el, i, o) {
    if (i === 1) {
      // the three merge lines draw toward the arrow, then the label lands
      Anim.drawPath(el.querySelectorAll('.s10-merge-line'), {
        duration: Anim.dur(o, 460), stagger: Anim.dur(o, 70)
      });
      Anim.fadeUp(el.querySelector('.s10-merge-label'), {
        duration: Anim.dur(o, 420), delay: Anim.dur(o, 160)
      });
    }

    if (i === 2) {
      Anim.fadeUp(el.querySelectorAll('.s10-goal-word, .s10-goal-sub, .s10-goal-chip'), {
        duration: Anim.dur(o, 460), stagger: Anim.dur(o, 90)
      });
    }

    if (i === 3) {
      Anim.fadeUp(el.querySelector('.s10-chain-label'), { duration: Anim.dur(o, 400) });
      // left -> right along the chain, boxes and arrows in document order
      Anim.fadeUp(el.querySelectorAll('.s10-chain-box, .s10-chain-arrow'), {
        duration: Anim.dur(o, 380), delay: Anim.dur(o, 140), stagger: Anim.dur(o, 70)
      });
    }

    if (i === 4) {
      // both carry lines are step-gated with data-motion="none", so the
      // subtitle needs its own fadeUp or it pops in with no transition
      Anim.fadeUp([el.querySelector('.carry-punch'), el.querySelector('.carry-line')], {
        duration: Anim.dur(o, 500), delay: Anim.dur(o, 120), stagger: Anim.dur(o, 140)
      });
    }
  }

  function onLeave() {}

  page({
    id: '10-superhuman',
    title: 'Three capabilities, one superhuman goal',
    theme: 'light',
    steps: 4,
    render: render,
    onEnter: onEnter,
    onStep: onStep,
    onLeave: onLeave
  });
})();
