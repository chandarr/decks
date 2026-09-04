/* ==========================================================================
   Page 10 — Superhuman (tasks/10-superhuman.md). Act III opener.

   Steps: 0 base (three A-streams + faint integrated/goal nodes) · 1 together
   (streams converge into the integrated node — the hero) · 2 toward a goal
   (arrow draws to GOAL) · 3 superhuman + reasoning transfer (chain draws in)
   · 4 needs all three + beachhead (tie-back pulse) + takeaway.
   ========================================================================== */

(function () {
  'use strict';

  var STREAM_X = 300;
  var STREAMS = [
    { y: 380, label: 'Adaptation &middot; Edge' },
    { y: 500, label: 'Autonomy &middot; Competence' },
    { y: 620, label: 'Assurance &middot; Confidence' }
  ];
  var INTEGRATED = { x: 820, y: 500 };
  var GOAL = { x: 1300, y: 500 };
  var CHAIN = ['language', 'physics', 'planning', 'unseen task &#10003;'];

  function streamsSvg() {
    return STREAMS.map(function (s, i) {
      return '' +
        '<g class="s10-stream" data-i="' + i + '">' +
          '<circle class="s10-stream-dot" cx="' + STREAM_X + '" cy="' + s.y + '" r="7"/>' +
          '<text class="s10-stream-lbl" x="' + (STREAM_X + 20) + '" y="' + (s.y + 5) + '" text-anchor="start">' + s.label + '</text>' +
        '</g>';
    }).join('');
  }

  function chainSvg() {
    var y = GOAL.y + 120;
    var startX = GOAL.x - 240;
    var gap = 170;
    return CHAIN.map(function (word, i) {
      var x = startX + i * gap;
      var arrow = i > 0 ? '<text class="s10-chain-arrow mono" x="' + (x - gap / 2) + '" y="' + y + '" text-anchor="middle">&rarr;</text>' : '';
      return arrow + '<text class="s10-chain-word mono" x="' + x + '" y="' + y + '" text-anchor="middle">' + word + '</text>';
    }).join('');
  }

  function render() {
    return '' +
      Shared.kicker('The integrating goal', 's10-kicker') +
      '<div class="s10-slideno mono">10</div>' +

      '<h1 class="title s10-title">Three capabilities, one superhuman goal.</h1>' +

      '<div class="s10-diagram">' +
        '<svg class="s10-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +

          '<g class="s10-tieback step" data-step="4" data-motion="none">' +
            STREAMS.map(function (s) {
              return '<line class="s10-tieline" x1="' + GOAL.x + '" y1="' + GOAL.y + '" x2="' + (STREAM_X + 14) + '" y2="' + s.y + '"/>';
            }).join('') +
          '</g>' +

          streamsSvg() +

          '<circle class="s10-integrated" cx="' + INTEGRATED.x + '" cy="' + INTEGRATED.y + '" r="15"/>' +
          '<text class="s10-together step" data-step="1" data-motion="none" x="' + ((STREAM_X + INTEGRATED.x) / 2) + '" y="' + (INTEGRATED.y - 60) + '" text-anchor="middle">Not one after another &mdash; all three, at once.</text>' +

          '<line class="s10-arrow step" data-step="2" data-motion="none" x1="' + (INTEGRATED.x + 20) + '" y1="' + GOAL.y + '" x2="' + (GOAL.x - 18) + '" y2="' + GOAL.y + '"/>' +
          '<text class="s10-goalvalue step" data-step="2" data-motion="none" x="' + ((INTEGRATED.x + GOAL.x) / 2) + '" y="' + (GOAL.y + 58) + '" text-anchor="middle">A goal gives direction, a tangible output, and something to monetize.</text>' +

          '<circle class="s10-goal" cx="' + GOAL.x + '" cy="' + GOAL.y + '" r="12"/>' +
          '<g class="s10-goallbl step" data-step="3" data-motion="none">' +
            '<text class="s10-goal-super mono" x="' + GOAL.x + '" y="' + (GOAL.y - 32) + '" text-anchor="middle">SUPERHUMAN</text>' +
            '<text class="s10-goal-sub" x="' + GOAL.x + '" y="' + (GOAL.y - 10) + '" text-anchor="middle">a task humans can&rsquo;t do.</text>' +
          '</g>' +
          '<g class="s10-chain step" data-step="3" data-motion="none">' + chainSvg() + '</g>' +
        '</svg>' +
      '</div>' +

      '<div class="s10-beachhead-wrap">' +
        '<p class="s10-beachhead step" data-step="4" data-motion="none">A superhuman task has no slack &mdash; it needs the edge, the competence, and the confidence, together. And it&rsquo;s a beachhead we can sell.</p>' +
      '</div>' +

      '<div class="s10-takeaway">' +
        Shared.carry({ step: 4, punchHtml: 'Aim at what humans can&rsquo;t do, and the three come together &mdash; with a proof you can sell.' }) +
      '</div>';
  }

  function onEnter(el) { el._s10stops = []; }

  function onStep(el, i, o) {
    if (i === 1) {
      var dots = el.querySelectorAll('.s10-stream-dot');
      Anim.converge(dots, INTEGRATED, { duration: Anim.dur(o, 750), stagger: Anim.dur(o, 90) });

      setTimeout(function () {
        if (el.isConnected) el.querySelector('.s10-integrated').classList.add('is-active');
      }, o && o.static ? 0 : 600);
      Anim.fadeUp(el.querySelector('.s10-together'), { delay: Anim.dur(o, 750), duration: Anim.dur(o, 450) });
    }

    if (i === 2) {
      Anim.drawPath(el.querySelector('.s10-arrow'), { duration: Anim.dur(o, 550) });
      el.querySelector('.s10-goal').classList.add('is-active');
      Anim.fadeUp(el.querySelector('.s10-goalvalue'), { delay: Anim.dur(o, 250), duration: Anim.dur(o, 450) });
    }

    if (i === 3) {
      Anim.fadeUp(el.querySelector('.s10-goallbl'), { duration: Anim.dur(o, 450) });
      Anim.fadeUp(el.querySelectorAll('.s10-chain-word, .s10-chain-arrow'), { delay: Anim.dur(o, 250), stagger: Anim.dur(o, 120), duration: Anim.dur(o, 350) });
    }

    if (i === 4) {
      var lines = el.querySelectorAll('.s10-tieline');
      Anim.fadeUp(lines, { stagger: Anim.dur(o, 70), duration: Anim.dur(o, 400) });

      Anim.fadeUp(el.querySelector('.s10-beachhead'), { delay: Anim.dur(o, 300), duration: Anim.dur(o, 450) });

      var punch = el.querySelector('.carry-punch');
      Anim.fadeUp(punch, { delay: Anim.dur(o, 500), duration: Anim.dur(o, 550) });
    }
  }

  function onLeave(el) {
    (el._s10stops || []).forEach(function (stop) { stop(); });
    el._s10stops = [];
  }

  page({
    id: '10-superhuman',
    title: 'Superhuman',
    theme: 'light',
    steps: 4,
    render: render,
    onEnter: onEnter,
    onStep: onStep,
    onLeave: onLeave
  });
})();
