/* ==========================================================================
   Page 07 — Autonomy = Competence (tasks/07-autonomy.md).

   The four development stages are a CIRCLE, not a left-to-right track: the
   fourth stage ("keeps evolving") closes back onto the first, so the form
   itself says competence never finishes. Each stage lands on its own key
   press. The pre-training foil vignette has been removed.

   Steps: 0 base (faint ring + four ghost nodes) · 1-4 one stage each — the
   arc into it draws, its node lights, its label and sub fade up; step 4 also
   closes the loop and starts the ring circulating, with the correction pulse
   travelling into the central POLICY hub · 5 takeaway.
   ========================================================================== */

(function () {
  'use strict';

  var CX = 960, CY = 540, R = 190;
  var HUB_R = 54;
  var ARC_GAP = 10;              // degrees of clearance either side of a node

  // clockwise from the top; the fourth stage's arc closes back onto the first
  var STATIONS = [
    { angle: -90, place: 'top',    label: 'Qualified',              sub: 'a foundation model: base competence.' },
    { angle:   0, place: 'right',  label: 'Trained &amp; harnessed', sub: 'tuned for the job, given its tools.' },
    { angle:  90, place: 'bottom', label: 'Shown how',              sub: 'learns the task by demonstration.' },
    { angle: 180, place: 'left',   label: 'Keeps evolving',         sub: 'corrections become part of how it works.' }
  ];

  function pt(a, r) {
    var rad = a * Math.PI / 180;
    return [CX + (r == null ? R : r) * Math.cos(rad), CY + (r == null ? R : r) * Math.sin(rad)];
  }
  function f(n) { return n.toFixed(1); }

  /* quarter arc, clockwise (SVG sweep-flag 1), inset at both ends so the
     station dots sit in a gap rather than on the stroke */
  function arcPath(a1, a2) {
    var p1 = pt(a1 + ARC_GAP), p2 = pt(a2 - ARC_GAP);
    return 'M' + f(p1[0]) + ',' + f(p1[1]) + ' A' + R + ',' + R + ' 0 0,1 ' + f(p2[0]) + ',' + f(p2[1]);
  }

  // arrowhead sitting at the arc's end, pointing along the clockwise tangent
  function arcArrow(a2) {
    var a = a2 - ARC_GAP;
    var tip = pt(a);
    var dir = (a + 90) * Math.PI / 180;                 // clockwise tangent
    var back = [tip[0] - 11 * Math.cos(dir), tip[1] - 11 * Math.sin(dir)];
    var nx = -Math.sin(dir) * 5.5, ny = Math.cos(dir) * 5.5;
    return '<polygon class="s07-arrowhead" points="' +
      f(tip[0]) + ',' + f(tip[1]) + ' ' +
      f(back[0] + nx) + ',' + f(back[1] + ny) + ' ' +
      f(back[0] - nx) + ',' + f(back[1] - ny) + '"/>';
  }

  function labelGeom(s) {
    if (s.place === 'top')    return { x: CX, anchor: 'middle', ly: CY - R - 52, sy: CY - R - 28 };
    if (s.place === 'bottom') return { x: CX, anchor: 'middle', ly: CY + R + 46, sy: CY + R + 70 };
    if (s.place === 'right')  return { x: CX + R + 26, anchor: 'start', ly: CY - 6, sy: CY + 18 };
    return { x: CX - R - 26, anchor: 'end', ly: CY - 6, sy: CY + 18 };
  }

  function stationGroup(s, i) {
    var p = pt(s.angle);
    var g = labelGeom(s);
    var n = i + 1;
    // the arc INTO this station lands with it; station 1 has no incoming arc
    // at its own step — the closing arc is drawn at step 4 instead.
    var incoming = i === 0 ? '' :
      '<path class="s07-arc" d="' + arcPath(STATIONS[i - 1].angle, s.angle) + '" fill="none"/>' + arcArrow(s.angle);

    return '' +
      '<g class="s07-station step" data-step="' + n + '" data-motion="none" data-i="' + i + '">' +
        incoming +
        '<circle class="s07-node" cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r="9"/>' +
        '<text class="s07-stationlbl" x="' + g.x + '" y="' + g.ly + '" text-anchor="' + g.anchor + '">' + s.label + '</text>' +
        '<text class="s07-stationsub" x="' + g.x + '" y="' + g.sy + '" text-anchor="' + g.anchor + '">' + s.sub + '</text>' +
      '</g>';
  }

  function ringSvg() {
    var ghosts = STATIONS.map(function (s) {
      var p = pt(s.angle);
      return '<circle class="s07-node-ghost" cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r="9"/>';
    }).join('');

    // closing arc (stage 4 -> stage 1) — the beat that makes it a loop
    var closing =
      '<g class="s07-closing step" data-step="4" data-motion="none">' +
        '<path class="s07-arc" d="' + arcPath(STATIONS[3].angle, STATIONS[0].angle + 360) + '" fill="none"/>' +
        arcArrow(STATIONS[0].angle + 360) +
      '</g>';

    return '' +
      '<svg class="s07-ring-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
        '<circle class="s07-ring" cx="' + CX + '" cy="' + CY + '" r="' + R + '"/>' +
        ghosts +

        '<circle class="s07-hub" cx="' + CX + '" cy="' + CY + '" r="' + HUB_R + '"/>' +
        '<text class="s07-policy mono" x="' + CX + '" y="' + (CY + 6) + '" text-anchor="middle">POLICY</text>' +
        '<circle class="s07-pulse" cx="' + f(pt(STATIONS[3].angle)[0]) + '" cy="' + f(pt(STATIONS[3].angle)[1]) + '" r="6"/>' +

        STATIONS.map(stationGroup).join('') +
        closing +
      '</svg>';
  }

  function render() {
    return '' +
      Shared.kicker('Autonomy &middot; competence', 's07-kicker') +
      '<div class="s07-slideno mono">07</div>' +

      '<h1 class="title s07-title">Competence is trained, not pre-trained.</h1>' +

      '<div class="s07-ring-wrap">' + ringSvg() + '</div>' +

      '<div class="s07-takeaway">' +
        Shared.carry({ step: 5, punchHtml: 'Competence is trained, harnessed, and evolved on the job &mdash; never just pre-trained.' }) +
      '</div>';
  }

  /* The loop turns, and a correction travels from the evolving stage into the
     central POLICY hub — the correction changes how it works, not just its
     next move. Every timer/rAF started here is pushed onto the stop list. */
  function startLoop(el, stops, o) {
    stops.push(Anim.flow(el.querySelector('.s07-ring'), { speed: 22 }));

    var token = el.querySelector('.s07-pulse');
    if (!token || Anim.reduced) return;

    var live = true;
    function beat() {
      if (!live) return;
      token.style.transition = 'none';
      token.style.transform = 'translate(0,0) scale(1)';
      token.style.opacity = '1';
      void token.getBoundingClientRect();
      token.style.transition = '';
      Anim.converge(token, { x: CX, y: CY }, { duration: Anim.dur(o, 900), scale: .4 });
    }
    beat();
    var id = setInterval(beat, 2300);
    stops.push(function () {
      live = false;
      clearInterval(id);
      token.style.opacity = '0';
    });
  }

  function onEnter(el) { el._s07stops = []; }

  function onStep(el, i, o) {
    if (i >= 1 && i <= 4) {
      var g = el.querySelector('.s07-station[data-i="' + (i - 1) + '"]');
      if (g) {
        var arc = g.querySelector('.s07-arc');
        if (arc) Anim.drawPath(arc, { duration: Anim.dur(o, 520) });
        Anim.fadeUp([g.querySelector('.s07-node'), g.querySelector('.s07-stationlbl'), g.querySelector('.s07-stationsub')], {
          duration: Anim.dur(o, 420), delay: Anim.dur(o, arc ? 220 : 0), stagger: Anim.dur(o, 80)
        });
      }
    }

    if (i === 4) {
      // close the circle, then let it turn — competence never finishes
      var closing = el.querySelector('.s07-closing .s07-arc');
      if (closing) Anim.drawPath(closing, { duration: Anim.dur(o, 560), delay: Anim.dur(o, 420) });
      startLoop(el, el._s07stops, o);
    }

    if (i === 5) {
      Anim.fadeUp(el.querySelector('.carry-punch'), { duration: Anim.dur(o, 550) });
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
    steps: 5,
    render: render,
    onEnter: onEnter,
    onStep: onStep,
    onLeave: onLeave
  });
})();
