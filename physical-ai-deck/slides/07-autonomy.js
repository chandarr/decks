/* ==========================================================================
   Page 07 — Autonomy = Competence (tasks/07-autonomy.md).

   Steps: 0 base (title + empty track, loop drawn) · 1 the foil (firehose
   floods the model, still fumbles; then recedes) · 2 how competence is
   built (four stations light left-to-right) · 3 it never stops (hero: the
   evolving loop runs) · 4 takeaway.
   ========================================================================== */

(function () {
  'use strict';

  var TRACK_Y = 470;
  var STATIONS = [
    { x: 340, label: 'Qualified', sub: 'a foundation model: base competence.' },
    { x: 700, label: 'Trained &amp; harnessed', sub: 'tuned for the job, given its tools.' },
    { x: 1060, label: 'Shown how', sub: 'learns the task by demonstration.' },
    { x: 1500, label: 'Keeps evolving', sub: 'corrections become part of how it works.' }
  ];
  var LOOP_R = 46;
  var POLICY = { x: STATIONS[3].x, y: TRACK_Y };

  function foil() {
    return '' +
      '<g class="s07-foil">' +
        '<text class="s07-foil-lbl mono" x="330" y="196" text-anchor="middle">PRE-TRAINING DATA</text>' +
        '<line class="s07-firehose" x1="330" y1="208" x2="330" y2="248"/>' +
        '<rect class="s07-foil-model" x="250" y="248" width="160" height="66" rx="8"/>' +
        '<text class="s07-fumble mono" x="330" y="350" text-anchor="middle">&#10005; still fumbles the job</text>' +
      '</g>';
  }

  function trackSvg() {
    var baseline = '<line class="s07-baseline" x1="' + (STATIONS[0].x) + '" y1="' + TRACK_Y + '" x2="' + (STATIONS[3].x - LOOP_R) + '" y2="' + TRACK_Y + '"/>';

    var dots = STATIONS.slice(0, 3).map(function (s) {
      return '<circle class="s07-stationdot" cx="' + s.x + '" cy="' + TRACK_Y + '" r="7"/>';
    }).join('') + '<circle class="s07-loop" cx="' + POLICY.x + '" cy="' + POLICY.y + '" r="' + LOOP_R + '"/>';

    var labels = STATIONS.slice(0, 3).map(function (s) {
      return '' +
        '<text class="s07-stationlbl" x="' + s.x + '" y="' + (TRACK_Y - 30) + '" text-anchor="middle">' + s.label + '</text>' +
        '<text class="s07-stationsub" x="' + s.x + '" y="' + (TRACK_Y + 40) + '" text-anchor="middle">' + s.sub + '</text>';
    }).join('') + '' +
      '<text class="s07-stationlbl" x="' + POLICY.x + '" y="' + (TRACK_Y - 78) + '" text-anchor="middle">' + STATIONS[3].label + '</text>' +
      '<text class="s07-stationsub" x="' + POLICY.x + '" y="' + (TRACK_Y + 92) + '" text-anchor="middle">' + STATIONS[3].sub + '</text>' +
      '<text class="s07-policy mono" x="' + POLICY.x + '" y="' + (POLICY.y + 5) + '" text-anchor="middle">POLICY</text>';

    var hero = '' +
      '<circle class="s07-pulse" cx="' + (POLICY.x) + '" cy="' + (POLICY.y - LOOP_R) + '" r="5"/>' +
      '<g class="s07-outtick" transform="translate(' + (POLICY.x + 66) + ',' + (POLICY.y - 4) + ')">' +
        '<path class="s07-tick-wobble" d="M0,8 L4,0 L8,10 L12,2" fill="none"/>' +
        '<path class="s07-tick-straight" d="M0,4 L12,4" fill="none"/>' +
      '</g>';

    return '' +
      '<svg class="s07-track-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
        foil() +
        baseline + dots +
        '<g class="s07-labels step" data-step="2" data-motion="none">' + labels + '</g>' +
        hero +
      '</svg>';
  }

  function render() {
    return '' +
      Shared.kicker('Autonomy &middot; competence', 's07-kicker') +
      '<div class="s07-slideno mono">07</div>' +

      '<h1 class="title s07-title">Competence is trained, not pre-trained.</h1>' +

      '<div class="s07-track">' + trackSvg() + '</div>' +

      '<div class="s07-takeaway">' +
        Shared.carry({ step: 4, punchHtml: 'Competence is trained, harnessed, and evolved on the job &mdash; never just pre-trained.' }) +
      '</div>';
  }

  function startLoop(el, stops, o) {
    var ring = el.querySelector('.s07-loop');
    stops.push(Anim.flow(ring, { speed: 22 }));

    if (Anim.reduced) {
      el.querySelector('.s07-outtick').classList.add('is-fixed');
      return;
    }

    var token = el.querySelector('.s07-pulse');
    var tick = el.querySelector('.s07-outtick');
    var live = true;

    function beat() {
      if (!live) return;
      token.style.transition = 'none';
      token.style.transform = 'translate(0,0) scale(1)';
      token.style.opacity = '1';
      void token.offsetWidth;
      token.style.transition = '';
      Anim.converge(token, POLICY, { duration: Anim.dur(o, 850), scale: .4 });
      tick.classList.add('is-fixed');
      setTimeout(function () { if (live) tick.classList.remove('is-fixed'); }, 900);
    }
    beat();
    var id = setInterval(beat, 2300);
    stops.push(function () { live = false; clearInterval(id); tick.classList.remove('is-fixed'); });
  }

  function onEnter(el) { el._s07stops = []; }

  function onStep(el, i, o) {
    if (i === 1) {
      Anim.fadeUp(el.querySelector('.s07-foil'), { duration: Anim.dur(o, 500) });
      el._s07stops.push(Anim.flow(el.querySelector('.s07-firehose'), { speed: 24 }));

      setTimeout(function () {
        var foilEl = el.querySelector('.s07-foil');
        if (foilEl) foilEl.classList.add('is-dim');
      }, o && o.static ? 0 : 1400);
    }

    if (i === 2) {
      var labelGroups = [
        el.querySelectorAll('.s07-labels .s07-stationlbl')[0], el.querySelectorAll('.s07-labels .s07-stationsub')[0],
        el.querySelectorAll('.s07-labels .s07-stationlbl')[1], el.querySelectorAll('.s07-labels .s07-stationsub')[1],
        el.querySelectorAll('.s07-labels .s07-stationlbl')[2], el.querySelectorAll('.s07-labels .s07-stationsub')[2],
        el.querySelectorAll('.s07-labels .s07-stationlbl')[3], el.querySelectorAll('.s07-labels .s07-stationsub')[3],
        el.querySelector('.s07-policy')
      ];
      Anim.fadeUp(labelGroups, { stagger: Anim.dur(o, 90), duration: Anim.dur(o, 420) });
    }

    if (i === 3) {
      startLoop(el, el._s07stops, o);
    }

    if (i === 4) {
      var punch = el.querySelector('.carry-punch');
      Anim.fadeUp(punch, { duration: Anim.dur(o, 550) });
    }
  }

  function onLeave(el) {
    (el._s07stops || []).forEach(function (stop) { stop(); });
    el._s07stops = [];
  }

  page({
    id: '07-autonomy',
    title: 'Autonomy = Competence',
    theme: 'light',
    steps: 4,
    render: render,
    onEnter: onEnter,
    onStep: onStep,
    onLeave: onLeave
  });
})();
