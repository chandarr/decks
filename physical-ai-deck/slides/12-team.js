/* ==========================================================================
   Page 12 — Team & operating model (tasks/12-team.md). Act IV opener.
   First §13-pattern connected diagram in the deck: the centre message is
   present at rest in the base state, the four lab nodes reveal one at a
   time (beats 1-4), and the flywheel arrows draw + turn together as the
   payoff (beat 5).

   Steps: 0 base (centre "BUILT TO COMPOUND" + faint India-HQ context +
   four faint node-position ghosts) · 1 Research appears · 2 Applied appears
   · 3 Deployment appears · 4 Assurance appears · 5 the flywheel — cycle
   arrows draw + flow together (Deployment&rarr;Assurance/Research emphasized)
   + compounds line + takeaway land.
   ========================================================================== */

(function () {
  'use strict';

  var CENTRE = { x: 960, y: 500, r: 80 };
  var NODE_R = 36;

  var LABS = [
    {
      key: 'research', step: 1, label: 'Research', cx: 960, cy: 300, r: NODE_R,
      anchor: 'middle', tx: 960, labelY: 214,
      lines: ['foundations: adaptation, world-model compression, embodied-assurance', 'science. Publishes.'],
      charterYs: [234, 252]
    },
    {
      key: 'applied', step: 2, label: 'Applied', cx: 1240, cy: 500, r: NODE_R,
      anchor: 'start', tx: 1294, labelY: 494,
      lines: ['the orchestration, the pipelines, beachhead delivery. Ships.'],
      charterYs: [512]
    },
    {
      key: 'deployment', step: 3, label: 'Deployment', cx: 960, cy: 700, r: NODE_R,
      anchor: 'middle', tx: 960, labelY: 752,
      lines: ['field systems in customer environments (US/EU). Runs &mdash; and', 'captures real-world + failure data.'],
      charterYs: [766, 782]
    },
    {
      key: 'assurance', step: 4, label: 'Assurance', cx: 680, cy: 500, r: NODE_R,
      anchor: 'end', tx: 626, labelY: 494,
      lines: ['failure-data engine, safety cases, the standard. Gates adoption.'],
      charterYs: [512]
    }
  ];

  /* Clockwise ring Research(top) -> Applied(right) -> Deployment(bottom) ->
     Assurance(left) -> Research. Endpoints are pulled in from each node
     centre so the curves clear the node discs; control points bow outward
     from CENTRE. d-as / as-r carry the compounding return (Deployment's
     data feeding Assurance and Research) and are drawn heavier. */
  var ARCS = [
    { key: 'r-a', emph: false, d: 'M997.4,326.7 Q1132.6,376.7 1202.6,473.3' },
    { key: 'a-d', emph: false, d: 'M1202.6,526.7 Q1132.6,623.3 997.4,673.3' },
    { key: 'd-as', emph: true, d: 'M922.6,673.3 Q786.7,623.3 717.4,526.7' },
    { key: 'as-r', emph: true, d: 'M717.4,473.3 Q786.7,376.7 922.6,326.7' }
  ];

  function ghostMarkup() {
    return LABS.map(function (lab) {
      return '<circle class="s12-node-ghost" cx="' + lab.cx + '" cy="' + lab.cy + '" r="' + lab.r + '"/>';
    }).join('');
  }

  function arcsMarkup() {
    return ARCS.map(function (a) {
      return '<path class="s12-arrow' + (a.emph ? ' s12-arrow--emph' : '') + '" data-key="' + a.key + '" d="' + a.d + '"/>';
    }).join('');
  }

  function labMarkup(lab) {
    var charterTspans = lab.lines.map(function (line, i) {
      return '<tspan x="' + lab.tx + '" y="' + lab.charterYs[i] + '">' + line + '</tspan>';
    }).join('');
    return '' +
      '<g class="s12-lab step" data-step="' + lab.step + '" data-motion="none" data-lab="' + lab.key + '">' +
        '<circle class="s12-lab-node" cx="' + lab.cx + '" cy="' + lab.cy + '" r="' + lab.r + '"/>' +
        '<text class="s12-lab-label" x="' + lab.tx + '" y="' + lab.labelY + '" text-anchor="' + lab.anchor + '">' + lab.label + '</text>' +
        '<text class="s12-lab-charter" text-anchor="' + lab.anchor + '">' + charterTspans + '</text>' +
      '</g>';
  }

  function centreMarkup() {
    return '' +
      '<g class="s12-centre">' +
        '<circle class="s12-centre-disc" cx="' + CENTRE.x + '" cy="' + CENTRE.y + '" r="' + CENTRE.r + '"/>' +
        '<text class="s12-centre-label mono" text-anchor="middle">' +
          '<tspan x="' + CENTRE.x + '" y="' + (CENTRE.y - 8) + '">BUILT TO</tspan>' +
          '<tspan x="' + CENTRE.x + '" y="' + (CENTRE.y + 16) + '">COMPOUND</tspan>' +
        '</text>' +
      '</g>';
  }

  function render() {
    return '' +
      Shared.kicker('How we build &middot; the org', 's12-kicker') +
      '<div class="s12-slideno mono">12</div>' +
      '<div class="s12-context mono">India HQ &middot; global field nodes (US/EU deployment + partnerships)</div>' +

      '<h1 class="title s12-title">Four labs, one flywheel.</h1>' +

      '<div class="s12-diagram">' +
        '<svg class="s12-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
          ghostMarkup() +
          '<g class="s12-cycle step" data-step="5" data-motion="none">' + arcsMarkup() + '</g>' +
          LABS.map(labMarkup).join('') +
          centreMarkup() +
        '</svg>' +
      '</div>' +

      '<div class="s12-takeaway">' +
        Shared.carry({
          step: 5,
          punchHtml: 'An organization designed to compound &mdash; not just to ship.',
          lineHtml: 'Deployment&rsquo;s data compounds Assurance (the moat) and Research (better methods). The org <i>is</i> the flywheel.'
        }) +
      '</div>';
  }

  function revealLab(el, key, o) {
    var g = el.querySelector('.s12-lab[data-lab="' + key + '"]');
    if (!g) return;
    Anim.scaleIn(g.querySelector('.s12-lab-node'), { duration: Anim.dur(o, 420), fadeFrom: 0, lift: false });
    Anim.fadeUp(
      [g.querySelector('.s12-lab-label'), g.querySelector('.s12-lab-charter')],
      { duration: Anim.dur(o, 450), delay: Anim.dur(o, 140), stagger: Anim.dur(o, 70) }
    );
  }

  function onEnter(el) {
    el._s12flowStop = function () {};
  }

  function onStep(el, i, o) {
    if (i === 1) revealLab(el, 'research', o);
    if (i === 2) revealLab(el, 'applied', o);
    if (i === 3) revealLab(el, 'deployment', o);
    if (i === 4) revealLab(el, 'assurance', o);

    if (i === 5) {
      var arcs = el.querySelectorAll('.s12-arrow');
      Anim.drawPath(arcs, { duration: Anim.dur(o, 750), stagger: Anim.dur(o, 110) }).then(function () {
        if (!el.isConnected) return;
        el._s12flowStop = Anim.flow(arcs, { speed: 26 });
      });

      Anim.fadeUp(el.querySelector('.carry-punch'), { delay: Anim.dur(o, 480), duration: Anim.dur(o, 500) });
      Anim.fadeUp(el.querySelector('.carry-line'), { delay: Anim.dur(o, 620), duration: Anim.dur(o, 450) });
    }
  }

  function onLeave(el) {
    if (el._s12flowStop) { el._s12flowStop(); el._s12flowStop = function () {}; }
  }

  page({
    id: '12-team',
    title: 'Team & operating model',
    theme: 'light',
    steps: 5,
    render: render,
    onEnter: onEnter,
    onStep: onStep,
    onLeave: onLeave
  });
})();
