/* ==========================================================================
   Page 02 — The end goal. Act I (tasks/02-end-goal.md).

   Steps: 0 base (central glyph, satellites hidden) · 1 the five competences
   (radiate outward from centre, staggered) · 2 without the limits (takeaway).
   ========================================================================== */

(function () {
  'use strict';

  var CX = 960, CY = 540, R = 195;

  // label — sub, angle in degrees (SVG convention: -90 = up, clockwise).
  var SATELLITES = [
    { key: 'task',      label: 'Task intelligence',        sub: 'knows how to do the work.',                                   angle: -90 },
    { key: 'language',  label: 'Language understanding',    sub: 'takes direction in plain language.',                         angle: -18 },
    { key: 'live',      label: 'Live performance',          sub: 'does it in real time, in the field.',                        angle: 54 },
    { key: 'feedback',  label: 'Learns from feedback',      sub: 'improves when shown or told (visual or verbal).',            angle: 126 },
    { key: 'remote',    label: 'Remote skill acquisition',  sub: 'picks up new skills over the network.',                      angle: 198 }
  ];

  function satellite(s) {
    var rad = s.angle * Math.PI / 180;
    var nx = CX + R * Math.cos(rad);
    var ny = CY + R * Math.sin(rad);
    var side = Math.abs(nx - CX) < 4 ? 'top' : (nx > CX ? 'right' : 'left');
    var anchor = side === 'right' ? 'start' : (side === 'left' ? 'end' : 'middle');
    var lx = side === 'right' ? nx + 22 : (side === 'left' ? nx - 22 : nx);
    var boldY, subY;
    if (side === 'top') { boldY = ny - 34; subY = ny - 11; }
    else { boldY = ny - 4; subY = ny + 22; }

    return '' +
      '<g class="s02-sat" data-key="' + s.key + '">' +
        '<line class="s02-connector" x1="' + CX + '" y1="' + CY + '" x2="' + nx + '" y2="' + ny + '"/>' +
        '<circle class="s02-node" cx="' + nx + '" cy="' + ny + '" r="7"/>' +
        '<text class="s02-satlbl" x="' + lx + '" y="' + boldY + '" text-anchor="' + anchor + '">' + s.label + '</text>' +
        '<text class="s02-satsub" x="' + lx + '" y="' + subY + '" text-anchor="' + anchor + '">' + s.sub + '</text>' +
      '</g>';
  }

  function render() {
    return '' +
      Shared.kicker('The end goal', 's02-kicker') +
      '<div class="s02-slideno mono">02</div>' +

      '<h1 class="title s02-title">A machine that works like a competent human &mdash; without the limits.</h1>' +

      '<div class="s02-diagram">' +
        '<svg class="s02-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
          '<g class="s02-glyph">' +
            '<circle class="s02-glyph-head" cx="' + CX + '" cy="' + (CY - 54) + '" r="20"/>' +
            '<rect class="s02-glyph-body" x="' + (CX - 32) + '" y="' + (CY - 28) + '" width="64" height="84" rx="16"/>' +
          '</g>' +
          '<text class="s02-centerlbl mono" x="' + CX + '" y="' + (CY + 82) + '" text-anchor="middle">THE MACHINE</text>' +

          '<g class="step s02-sats" data-step="1" data-motion="none">' +
            SATELLITES.map(satellite).join('') +
          '</g>' +
        '</svg>' +
      '</div>' +

      '<div class="s02-takeaway">' +
        Shared.carry({
          step: 2,
          punchHtml: 'Every competence of a skilled worker &mdash; none of the human limits: it doesn&rsquo;t tire, it shares what it learns, it goes where we can&rsquo;t.'
        }) +
      '</div>';
  }

  function onStep(el, i, o) {
    if (i === 1) {
      var glyph = el.querySelector('.s02-glyph');
      Anim.scaleIn(glyph, { duration: Anim.dur(o, 400), fadeFrom: 1 });

      var sats = el.querySelectorAll('.s02-sat');
      Anim.radiate(sats, Anim.centreOf(glyph), {
        duration: Anim.dur(o, 750),
        stagger: Anim.dur(o, 120),
        from: 0.3
      });
    }

    if (i === 2) {
      var punch = el.querySelector('.carry-punch');
      Anim.fadeUp(punch, { duration: Anim.dur(o, 550) });
    }
  }

  page({
    id: '02-end-goal',
    title: 'The end goal',
    theme: 'light',
    steps: 2,
    render: render,
    onStep: onStep
  });
})();
