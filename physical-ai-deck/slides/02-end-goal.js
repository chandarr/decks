/* ==========================================================================
   Page 02 — The end goal. Act I (tasks/02-end-goal.md).
   Rebuilt per founder feedback: no entrance jitter on the centre glyph
   (glyph + orbit ring are static from base); five satellites reveal ONE AT A
   TIME (§13) with their connector drawing in from the ring; takeaway moved
   into a bordered --panel highlight box, clear of the satellites.

   Steps: 0 base (ring + glyph + THE MACHINE, static, satellites hidden) ·
   1-5 satellites reveal one at a time, in narration order (Task intelligence
   -> Language -> Live performance -> Learns from feedback -> Remote skills) ·
   6 the boxed takeaway.
   ========================================================================== */

(function () {
  'use strict';

  // CY sits at 540, not 470: the two-line title's block runs to ~y221, and the
  // top satellite's label (ty - 4 = CY - R - GAP - 4) has to clear it. At 540
  // that label lands at y262 — clear of the title — and the whole ring drops
  // into the dead space this page used to leave at the bottom.
  var CX = 960, CY = 540, R = 250, GAP = 24;

  // label — sub, angle in degrees (SVG convention: -90 = up, clockwise).
  // Order is the narration arc (task file §"Copy", reveal order 1-5).
  var SATELLITES = [
    { key: 'task',      label: 'Task intelligence',        sub: 'knows how to do the work.',                        angle: -90 },
    { key: 'language',  label: 'Language understanding',    sub: 'takes direction in plain language.',               angle: -18 },
    { key: 'live',      label: 'Live performance',          sub: 'does it in real time, in the field.',              angle: 54 },
    { key: 'feedback',  label: 'Learns from feedback',      sub: 'improves when shown or told (visual or verbal).',  angle: 126 },
    { key: 'remote',    label: 'Remote skill acquisition',  sub: 'picks up new skills over the network.',            angle: 198 }
  ];

  function satellite(s, i) {
    var rad = s.angle * Math.PI / 180;
    var cos = Math.cos(rad), sin = Math.sin(rad);
    var nx = CX + R * cos, ny = CY + R * sin;           // node — on the ring
    var tx = CX + (R + GAP) * cos, ty = CY + (R + GAP) * sin; // connector tip

    var side = Math.abs(nx - CX) < 4 ? 'top' : (nx > CX ? 'right' : 'left');
    var anchor = side === 'right' ? 'start' : (side === 'left' ? 'end' : 'middle');
    var lx = side === 'right' ? tx + 16 : (side === 'left' ? tx - 16 : tx);
    var boldY, subY;
    if (side === 'top') { boldY = ty - 4; subY = ty + 19; }
    else { boldY = ty - 3; subY = ty + 21; }

    return '' +
      '<g class="s02-sat step" data-step="' + (i + 1) + '" data-motion="none" data-key="' + s.key + '">' +
        '<line class="s02-connector" x1="' + nx.toFixed(1) + '" y1="' + ny.toFixed(1) + '" x2="' + tx.toFixed(1) + '" y2="' + ty.toFixed(1) + '"/>' +
        '<circle class="s02-node" cx="' + nx.toFixed(1) + '" cy="' + ny.toFixed(1) + '" r="7"/>' +
        '<text class="s02-satlbl" x="' + lx.toFixed(1) + '" y="' + boldY.toFixed(1) + '" text-anchor="' + anchor + '">' + s.label + '</text>' +
        '<text class="s02-satsub" x="' + lx.toFixed(1) + '" y="' + subY.toFixed(1) + '" text-anchor="' + anchor + '">' + s.sub + '</text>' +
      '</g>';
  }

  function render() {
    return '' +
      Shared.kicker('The end goal', 's02-kicker') +
      '<div class="s02-slideno mono">02</div>' +

      '<h1 class="title s02-title">A machine that works like a competent human &mdash; without the limits.</h1>' +

      '<div class="s02-diagram">' +
        '<svg class="s02-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
          '<circle class="s02-ring" cx="' + CX + '" cy="' + CY + '" r="' + R + '"/>' +

          '<g class="s02-glyph">' +
            '<circle class="s02-glyph-head" cx="' + CX + '" cy="' + (CY - 54) + '" r="20"/>' +
            '<rect class="s02-glyph-body" x="' + (CX - 32) + '" y="' + (CY - 28) + '" width="64" height="84" rx="16"/>' +
          '</g>' +
          '<text class="s02-centerlbl mono" x="' + CX + '" y="' + (CY + R + 20) + '" text-anchor="middle">THE MACHINE</text>' +

          SATELLITES.map(satellite).join('') +
        '</svg>' +
      '</div>' +

      '<div class="s02-takeaway-box">' +
        Shared.carry({
          step: 6,
          punchHtml: 'Every competence of a skilled worker &mdash; none of the human limits: it doesn&rsquo;t tire, it shares what it learns, it goes where we can&rsquo;t.'
        }) +
      '</div>';
  }

  function onStep(el, i, o) {
    if (i >= 1 && i <= 5) {
      var sat = el.querySelector('.s02-sat[data-step="' + i + '"]');
      if (!sat) return;
      Anim.drawPath(sat.querySelector('.s02-connector'), { duration: Anim.dur(o, 450) });
      Anim.fadeUp([sat.querySelector('.s02-node'), sat.querySelector('.s02-satlbl'), sat.querySelector('.s02-satsub')], {
        duration: Anim.dur(o, 420), delay: Anim.dur(o, 90)
      });
    }

    if (i === 6) {
      var punch = el.querySelector('.carry-punch');
      Anim.fadeUp(punch, { duration: Anim.dur(o, 550) });
    }
  }

  page({
    id: '02-end-goal',
    title: 'The end goal',
    theme: 'light',
    steps: 6,
    render: render,
    onStep: onStep
  });
})();
