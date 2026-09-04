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

  var CENTRE = { x: 960, y: 494, r: 76 };
  var NODE_R = 36;
  /* Ring pulled in twice: 200 -> 180 to make room for the cards at all, then
     180 -> 145 so every card has clearance for TWO wrapped lines. The card
     fonts bottom out at their clamp minimum on a small stage while the boxes
     keep shrinking with --px, so a one-line charter becomes two and grows
     into the ring. The budget below assumes the two-line case everywhere. */
  var RING_R = 145;

  /* Each lab's charter used to be 14.5px SVG <text>, hand-split into tspans:
     unreadable from the back of a room, and the left-hand one ran to the
     stage edge. It now lives in an HTML card — a mild --panel box on the
     side of the node that faces open space (above / right / below / left),
     so the ring stays clear and each charter reads at 16px with real
     wrapping. `card` is {left, top, width, align} in 1920×1080 design px. */
  var LABS = [
    {
      key: 'research', step: 1, label: 'Research',
      cx: CENTRE.x, cy: CENTRE.y - RING_R, r: NODE_R,
      card: { left: 360, top: 190, width: 1200, align: 'center' },  // ends <=297; node top 313
      charter: 'foundations: adaptation, world-model compression, embodied-assurance science. Publishes.'
    },
    {
      key: 'applied', step: 2, label: 'Applied',
      cx: CENTRE.x + RING_R, cy: CENTRE.y, r: NODE_R,
      card: { left: 1159, top: 456, width: 560, align: 'left' },
      charter: 'the orchestration, the pipelines, beachhead delivery. Ships.'
    },
    {
      key: 'deployment', step: 3, label: 'Deployment',
      cx: CENTRE.x, cy: CENTRE.y + RING_R, r: NODE_R,
      card: { left: 360, top: 691, width: 1200, align: 'center' },  // node bottom 675
      charter: 'field systems in customer environments (US/EU). Runs &mdash; and captures real-world + failure data.'
    },
    {
      key: 'assurance', step: 4, label: 'Assurance',
      cx: CENTRE.x - RING_R, cy: CENTRE.y, r: NODE_R,
      card: { left: 201, top: 456, width: 560, align: 'right' },
      charter: 'failure-data engine, safety cases, the standard. Gates adoption.'
    }
  ];

  /* Clockwise ring Research(top) -> Applied(right) -> Deployment(bottom) ->
     Assurance(left) -> Research. Derived from the node positions rather than
     hard-coded, so moving the ring can never leave the arcs behind: each arc
     starts/ends 46px out from its node centre along the chord (node r36 plus
     10px clearance) and bows 40px outward from CENTRE at its midpoint.
     d-as / as-r carry the compounding return (Deployment's data feeding
     Assurance and Research) and are drawn heavier. */
  function arcBetween(a, b) {
    var dx = b.cx - a.cx, dy = b.cy - a.cy, len = Math.hypot(dx, dy);
    var ux = dx / len, uy = dy / len;
    var mx = (a.cx + b.cx) / 2, my = (a.cy + b.cy) / 2;
    var ox = mx - CENTRE.x, oy = my - CENTRE.y, olen = Math.hypot(ox, oy) || 1;
    var f = function (n) { return Math.round(n * 10) / 10; };
    return 'M' + f(a.cx + 46 * ux) + ',' + f(a.cy + 46 * uy) +
           ' Q' + f(mx + 40 * ox / olen) + ',' + f(my + 40 * oy / olen) +
           ' ' + f(b.cx - 46 * ux) + ',' + f(b.cy - 46 * uy);
  }

  var ARCS = LABS.map(function (lab, i) {
    var next = LABS[(i + 1) % LABS.length];
    return {
      key: lab.key + '-' + next.key,
      emph: lab.key === 'deployment' || lab.key === 'assurance',
      d: arcBetween(lab, next)
    };
  });

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
    return '' +
      '<g class="s12-lab step" data-step="' + lab.step + '" data-motion="none" data-lab="' + lab.key + '">' +
        '<circle class="s12-lab-node" cx="' + lab.cx + '" cy="' + lab.cy + '" r="' + lab.r + '"/>' +
      '</g>';
  }

  function cardMarkup(lab) {
    var c = lab.card;
    return '' +
      '<div class="s12-card step" data-step="' + lab.step + '" data-motion="none"' +
        ' data-card="' + lab.key + '" data-align="' + c.align + '"' +
        ' style="left:calc(' + c.left + ' * var(--px)); top:calc(' + c.top + ' * var(--px));' +
        ' width:calc(' + c.width + ' * var(--px))">' +
        '<div class="s12-card-label">' + lab.label + '</div>' +
        '<p class="s12-card-charter">' + lab.charter + '</p>' +
      '</div>';
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
        LABS.map(cardMarkup).join('') +
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
    var card = el.querySelector('.s12-card[data-card="' + key + '"]');
    if (g) Anim.scaleIn(g.querySelector('.s12-lab-node'), { duration: Anim.dur(o, 420), fadeFrom: 0, lift: false });
    if (card) Anim.fadeUp(card, { duration: Anim.dur(o, 450), delay: Anim.dur(o, 140) });
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
