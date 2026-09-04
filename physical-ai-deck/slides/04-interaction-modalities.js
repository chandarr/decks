/* ==========================================================================
   Page 04 — How we engage the two ends (tasks/04-interaction-modalities.md).
   The deck's first full use of §12 motion-as-message: anim.flow on eight
   dotted hub connectors, direction encoding outbound vs. return.

   Steps: 0 base (hub + both fans drawn, static, dim) · 1 left fan activates
   (labels brighten, flow starts) · 2 right fan activates · 3 takeaway.
   ========================================================================== */

(function () {
  'use strict';

  var HUB = { x: 960, y: 480 };
  var LABEL_Y = [380, 470, 560, 650];

  var LEFT = {
    x: 480, headingX: 300, heading: 'FRONTIER LABS', side: 'left', tint: 'var(--accent-b)',
    items: [
      { t: 'Real-world edge &amp; failure cases', dir: 'out' },
      { t: 'Transfer &amp; adaptation onto embodiments', dir: 'out' },
      { t: 'Independent, physical-world model validation', dir: 'out' },
      { t: 'Frontier models &amp; early access', dir: 'return' }
    ]
  };
  var RIGHT = {
    x: 1440, headingX: 1620, heading: 'EMBODIMENT VENDORS', side: 'right', tint: 'var(--accent-a)',
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
    var angleOut = side.side === 'left' ? 180 : 0;
    var angleReturn = side.side === 'left' ? 0 : 180;
    return '' +
      '<text class="s04-heading mono" x="' + side.headingX + '" y="230" text-anchor="middle" fill="' + side.tint + '">' + side.heading + '</text>' +
      side.items.map(function (it, i) {
        var y = LABEL_Y[i];
        var isReturn = it.dir === 'return';
        var lineCls = 's04-line ' + (isReturn ? 's04-line--return' : 's04-line--out s04-line--' + side.side);
        var lblCls = 's04-lbl ' + (isReturn ? 's04-lbl--return' : 's04-lbl--' + side.side);
        var anchor = side.side === 'left' ? 'end' : 'start';
        var arrowMark = isReturn ? arrow(HUB.x + (side.side === 'left' ? 26 : -26), HUB.y, angleReturn, 's04-arrow--' + side.side)
                                  : arrow(side.x, y, angleOut, 's04-arrow--' + side.side);
        return '' +
          '<line class="' + lineCls + '" data-side="' + side.side + '" data-dir="' + it.dir + '" x1="' + HUB.x + '" y1="' + HUB.y + '" x2="' + side.x + '" y2="' + y + '"/>' +
          arrowMark +
          '<text class="' + lblCls + '" x="' + side.x + '" y="' + (y + 6) + '" text-anchor="' + anchor + '">' + it.t + '</text>';
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
          '<text class="s04-hublbl mono" x="' + HUB.x + '" y="' + (HUB.y + 40) + '" text-anchor="middle">US &middot; THE ORCHESTRATOR</text>' +
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
