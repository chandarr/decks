/* ==========================================================================
   Page 04 — How we engage the two ends (tasks/04-interaction-modalities.md).
   The deck's first full use of §12 motion-as-message: anim.flow on eight
   dotted hub connectors, direction encoding outbound vs. return.

   Steps: 0 base (hub + both fans drawn, static, dim) · 1 left fan activates
   (labels brighten, flow starts) · 2 right fan activates · 3 takeaway.
   ========================================================================== */

(function () {
  'use strict';

  var HUB = { x: 960, y: 540 };
  var LABEL_Y = [400, 520, 640, 760];

  /* Orthogonal routing. Each item is a horizontal stub from its label to a
     shared vertical trunk; one horizontal link carries the trunk into the hub.
     Right angles only — no diagonals — and no two lines overlap, because the
     trunk and the link are each drawn once rather than per item.
       label --stub--> | trunk | --link--> hub
     `x` is the label's inner edge; the stub starts LABEL_GAP past it. */
  var LABEL_GAP = 18;
  var HUB_GAP = 16;          // stop the link short of the hub circle (r=14)

  var LEFT = {
    x: 620, trunkX: 780, headingX: 376, heading: 'FRONTIER LABS', side: 'left', tint: 'var(--accent-b)',
    items: [
      { t: 'Real-world edge &amp; failure cases', dir: 'out' },
      { t: 'Transfer &amp; adaptation onto embodiments', dir: 'out' },
      { t: 'Independent, physical-world model validation', dir: 'out' },
      { t: 'Frontier models &amp; early access', dir: 'return' }
    ]
  };
  var RIGHT = {
    x: 1300, trunkX: 1140, headingX: 1544, heading: 'EMBODIMENT VENDORS', side: 'right', tint: 'var(--accent-a)',
    items: [
      { t: 'Hardware requirements for real intelligence', dir: 'out' },
      { t: 'Field failure modes &amp; fixes', dir: 'out' },
      { t: 'Improvement + product-evolution roadmap', dir: 'out' },
      { t: 'Bodies to build on &amp; co-design', dir: 'return' }
    ]
  };

  function arrow(x, y, angle, cls) {
    var r = angle * Math.PI / 180;
    var p1 = [x - 9 * Math.cos(r - 0.5), y - 9 * Math.sin(r - 0.5)];
    var p2 = [x - 9 * Math.cos(r + 0.5), y - 9 * Math.sin(r + 0.5)];
    return '<polygon class="s04-arrow ' + cls + '" points="' + x + ',' + y + ' ' + p1[0] + ',' + p1[1] + ' ' + p2[0] + ',' + p2[1] + '"/>';
  }

  function fan(side) {
    var isLeft = side.side === 'left';
    var out = isLeft ? -1 : 1;                       // outward direction, in x
    var angleOut = isLeft ? 180 : 0;
    var angleReturn = isLeft ? 0 : 180;
    var anchor = isLeft ? 'end' : 'start';
    var stubOuter = side.x - out * LABEL_GAP;        // stub end nearest the label
    var linkEnd = HUB.x + out * HUB_GAP;             // link end nearest the hub

    // shared spine: one vertical trunk spanning the item rows, then a single
    // horizontal link into the hub
    var spine =
      '<line class="s04-trunk s04-trunk--' + side.side + '" x1="' + side.trunkX + '" y1="' + LABEL_Y[0] +
        '" x2="' + side.trunkX + '" y2="' + LABEL_Y[LABEL_Y.length - 1] + '"/>' +
      '<line class="s04-link s04-link--' + side.side + '" x1="' + side.trunkX + '" y1="' + HUB.y +
        '" x2="' + linkEnd + '" y2="' + HUB.y + '"/>';

    return '' +
      '<text class="s04-heading mono" x="' + side.headingX + '" y="230" text-anchor="middle" fill="' + side.tint + '">' + side.heading + '</text>' +
      spine +
      side.items.map(function (it, i) {
        var y = LABEL_Y[i];
        var isReturn = it.dir === 'return';
        var lineCls = 's04-line ' + (isReturn ? 's04-line--return' : 's04-line--out s04-line--' + side.side);
        var lblCls = 's04-lbl ' + (isReturn ? 's04-lbl--return' : 's04-lbl--' + side.side);
        // a return item's arrow sits on the link, pointing in at the hub
        var arrowMark = isReturn ? arrow(linkEnd, HUB.y, angleReturn, 's04-arrow--' + side.side)
                                 : arrow(stubOuter, y, angleOut, 's04-arrow--' + side.side);
        return '' +
          '<line class="' + lineCls + '" data-side="' + side.side + '" data-dir="' + it.dir + '" x1="' + side.trunkX + '" y1="' + y + '" x2="' + stubOuter + '" y2="' + y + '"/>' +
          arrowMark +
          '<text class="' + lblCls + '" x="' + side.x + '" y="' + (y + 7) + '" text-anchor="' + anchor + '">' + it.t + '</text>';
      }).join('');
  }

  function render() {
    return '' +
      Shared.kicker('How we operate', 's04-kicker') +
      '<div class="s04-slideno mono">04</div>' +

      '<h1 class="title s04-title">We make both ends better.</h1>' +

      '<div class="s04-diagram">' +
        '<svg class="s04-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
          '<g class="s04-fan" data-side="left">' + fan(LEFT) + '</g>' +
          '<g class="s04-fan" data-side="right">' + fan(RIGHT) + '</g>' +

          '<circle class="s04-hub" cx="' + HUB.x + '" cy="' + HUB.y + '" r="14"/>' +
          '<text class="s04-hublbl mono" x="' + HUB.x + '" y="' + (HUB.y + 42) + '" text-anchor="middle">US &middot; THE ORCHESTRATOR</text>' +
        '</svg>' +
      '</div>' +

      '<div class="s04-takeaway">' +
        Shared.carry({ step: 3, punchHtml: 'We compete with neither end &mdash; we make both better. That&rsquo;s why both want us in the middle.' }) +
      '</div>';
  }

  function activateFan(el, side, o) {
    var fanEl = el.querySelector('.s04-fan[data-side="' + side + '"]');
    fanEl.classList.add('is-active');

    var lines = fanEl.querySelectorAll('.s04-line');
    lines.forEach(function (line) {
      var reverse = line.getAttribute('data-dir') === 'return';
      el._s04stops.push(Anim.flow(line, { speed: 30, reverse: reverse }));
    });
  }

  function onEnter(el) {
    el._s04stops = [];
  }

  function onStep(el, i, o) {
    if (i === 1) activateFan(el, 'left', o);
    if (i === 2) activateFan(el, 'right', o);
    if (i === 3) {
      var punch = el.querySelector('.carry-punch');
      Anim.fadeUp(punch, { duration: Anim.dur(o, 550) });
    }
  }

  function onLeave(el) {
    (el._s04stops || []).forEach(function (stop) { stop(); });
    el._s04stops = [];
  }

  page({
    id: '04-interaction-modalities',
    title: 'How we engage the two ends',
    theme: 'light',
    steps: 3,
    render: render,
    onEnter: onEnter,
    onStep: onStep,
    onLeave: onLeave
  });
})();
