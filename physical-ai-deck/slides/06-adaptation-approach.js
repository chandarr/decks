/* ==========================================================================
   Page 06 — Adaptation · our approach (tasks/06-adaptation-approach.md).
   Visual twin of slide 05 — same card style, each icon the *resolved*
   version of 05's broken counterpart. No --alert here: solution slide.

   Prior fixes KEPT: no formula/"=" sentence drawn across the cards (the two
   + glyphs carry that idea), hard non-overlapping bands, prominent + glyphs,
   one card per key press.
   Conductor orchestration strip (y~508-784): REASONING/REACTIVE/REFLEX bars,
   a CONDUCTOR rail binding them, command-down ("goals v") / state-up
   ("state ^") flows. Each bar's own down+up flow segment ticks at THAT
   bar's own frequency (reflex fastest, reasoning slowest) — three clocks
   visibly running at once, which *is* the explanation (§12).

   Founder feedback (this pass): the strip now triggers right after the
   FIRST keystroke — the same beat that lands "The conductor" card, not a
   separate later step — since the strip IS that card, expanded. A wider
   gap now separates the card row from the strip. Bar text moved from
   hand-placed SVG to a centered HTML flex row per bar (bigger, centered,
   robust) — only the rail, its rotating label, and the flow segments stay
   SVG (they need path drawing).

   Steps: 0 base (3 faint card frames, 3 faint bar frames) · 1 card1 fills +
   the whole strip reveals (bars, rail, then the six flow segments start) ·
   2 +1 lands, card2 fills · 3 +2 lands, card3 fills · 4 takeaway.
   `onLeave` cancels every icon loop AND all six strip flow loops.
   ========================================================================== */

(function () {
  'use strict';

  // step N fills card N — one card per key press (§13)
  var CARDS = [
    {
      key: 'conductor', step: 1, title: 'The conductor',
      body: 'One framework runs reflex, reactive, and reasoning together &mdash; each at its own clock, in sync.'
    },
    {
      key: 'fit', step: 2, title: 'The fit',
      body: 'Fine-tune, distil, quantize, cache: the right model, shaped to the body and the job.'
    },
    {
      key: 'compression', step: 3, title: 'Machine-grade compression',
      body: 'Perception as compact latent &mdash; leaner training, faster edge; built for machines, not human eyes.'
    }
  ];

  /* Resolved icons — the payoff against slide 05's broken pair. Compact
     (90px box vs 05's 130px) to fit the tightened y210-470 card band. */
  function icon(card) {
    if (card.key === 'conductor') {
      return '' +
        '<svg class="s06-icon-svg" viewBox="0 0 140 140" aria-hidden="true">' +
          '<circle class="s06-arc s06-arc--1" cx="70" cy="70" r="26" stroke-dasharray="6 10"/>' +
          '<circle class="s06-arc s06-arc--2" cx="70" cy="70" r="42" stroke-dasharray="4 9"/>' +
          '<circle class="s06-arc s06-arc--3" cx="70" cy="70" r="58" stroke-dasharray="3 12"/>' +
          '<circle class="s06-hub" cx="70" cy="70" r="4"/>' +
        '</svg>';
    }
    if (card.key === 'fit') {
      return '' +
        '<svg class="s06-icon-svg" viewBox="0 0 140 140" aria-hidden="true">' +
          '<rect class="s06-device" x="42" y="26" width="56" height="88" rx="7"/>' +
          '<rect class="s06-blob s06-blob--fit" x="50" y="36" width="40" height="68" rx="5"/>' +
        '</svg>';
    }
    return '' +
      '<svg class="s06-icon-svg" viewBox="0 0 140 140" aria-hidden="true">' +
        '<rect class="s06-frame" x="28" y="14" width="24" height="17" rx="2"/>' +
        '<rect class="s06-frame" x="58" y="14" width="24" height="17" rx="2"/>' +
        '<rect class="s06-frame" x="88" y="14" width="24" height="17" rx="2"/>' +
        '<path class="s06-funnel" d="M24,44 L116,44 L82,80 L58,80 Z"/>' +
        '<line class="s06-stream" x1="70" y1="80" x2="70" y2="112"/>' +
        '<circle class="s06-token" cx="70" cy="120" r="7"/>' +
      '</svg>';
  }

  function cardMarkup(c) {
    var gate = ' step" data-step="' + c.step + '" data-motion="none"';
    return '' +
      '<div class="s06-card" data-key="' + c.key + '">' +
        '<div class="s06-icon' + gate + '>' + icon(c) + '</div>' +
        '<div class="s06-card-title' + gate + '>' + c.title + '</div>' +
        '<p class="s06-card-body' + gate + '>' + c.body + '</p>' +
      '</div>';
  }

  /* --- the conductor orchestration strip ---------------------------------- */

  var BARS = [
    { key: 'reasoning', label: 'REASONING', phrase: 'plans the task, re-plans on change', freq: '~1 Hz', speed: 9 },
    { key: 'reactive', label: 'REACTIVE', phrase: 'adjusts to the world in the loop', freq: '~50 Hz', speed: 24 },
    { key: 'reflex', label: 'REFLEX', phrase: 'keeps it safe and stable', freq: '~1 kHz', speed: 62 }
  ];
  var BAR_H = 70, BAR_GAP = 16, BAR_Y0 = 542;
  var STRIP_L = 140, STRIP_R = 1780;
  var RAIL_X = 146, DOWN_X = 1590, UP_X = 1614;

  function px(n) { return 'calc(' + n + ' * var(--px))'; }
  function barTop(i) { return BAR_Y0 + i * (BAR_H + BAR_GAP); }

  // bar frame + centered content are plain HTML (bigger, reliably centred,
  // no manual SVG text-width math) — only the rail and the flow segments,
  // which need real path drawing, stay SVG.
  function barRow(b, i) {
    return '' +
      '<div class="s06-bar" style="top:' + px(barTop(i)) + '; height:' + px(BAR_H) + ';">' +
        '<div class="s06-bar-content step" data-step="1" data-motion="none" data-bar="' + b.key + '">' +
          '<span class="s06-bar-label mono">' + b.label + '</span>' +
          '<span class="s06-bar-phrase">' + b.phrase + '</span>' +
          '<span class="s06-freq-chip mono">' + b.freq + '</span>' +
        '</div>' +
      '</div>';
  }

  function flowSegs() {
    return BARS.map(function (b, i) {
      var yT = barTop(i), yB = yT + BAR_H;
      var down = '<path class="s06-flow s06-flow--down" data-bar="' + b.key + '" d="M' + DOWN_X + ',' + yT + ' L' + DOWN_X + ',' + yB + '"/>';
      var up = '<path class="s06-flow s06-flow--up" data-bar="' + b.key + '" d="M' + UP_X + ',' + yB + ' L' + UP_X + ',' + yT + '"/>';
      return down + up;
    }).join('');
  }

  function stripSvg() {
    var firstY = barTop(0), lastY = barTop(2) + BAR_H, railMidY = (firstY + lastY) / 2;
    return '' +
      '<svg class="s06-strip-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
        '<g class="s06-rail-grp step" data-step="1" data-motion="none">' +
          '<line class="s06-rail" x1="' + RAIL_X + '" y1="' + firstY + '" x2="' + RAIL_X + '" y2="' + lastY + '"/>' +
          /* outer <g> owns the static rotate ATTRIBUTE; the inner <text> (no
             transform of its own) is the Anim.fadeUp target — fadeUp's WAAPI
             transform would otherwise silently wipe a rotate attribute on
             the same element (same conflict class as the SVG-static-
             transform-vs-WAAPI bug documented elsewhere in this deck). */
          '<g transform="rotate(-90 ' + RAIL_X + ' ' + railMidY + ')">' +
            '<text class="s06-rail-label mono" x="' + RAIL_X + '" y="' + (railMidY + 4) + '" text-anchor="middle">CONDUCTOR</text>' +
          '</g>' +
        '</g>' +

        '<g class="s06-strip-flows step" data-step="1" data-motion="none">' +
          flowSegs() +
          '<text class="s06-flow-lbl mono" x="' + DOWN_X + '" y="' + (firstY - 14) + '" text-anchor="middle">goals &darr;</text>' +
          '<text class="s06-flow-lbl mono" x="' + UP_X + '" y="' + (lastY + 22) + '" text-anchor="middle">state &uarr;</text>' +
          '<polygon class="s06-arrowhead" points="' + (DOWN_X - 5) + ',' + (lastY - 2) + ' ' + (DOWN_X + 5) + ',' + (lastY - 2) + ' ' + DOWN_X + ',' + (lastY + 7) + '"/>' +
          '<polygon class="s06-arrowhead" points="' + (UP_X - 5) + ',' + (firstY + 2) + ' ' + (UP_X + 5) + ',' + (firstY + 2) + ' ' + UP_X + ',' + (firstY - 7) + '"/>' +
        '</g>' +
      '</svg>';
  }

  function render() {
    var row = '';
    CARDS.forEach(function (c, i) {
      if (i > 0) row += '<div class="s06-plus step" data-step="' + c.step + '" data-motion="none">+</div>';
      row += cardMarkup(c);
    });

    return '' +
      Shared.kicker('Adaptation &middot; our approach', 's06-kicker') +
      '<div class="s06-slideno mono">06</div>' +

      '<h1 class="title s06-title">Make the edge actually work.</h1>' +

      '<div class="s06-cards">' + row + '</div>' +

      '<div class="s06-strip-heading mono step" data-step="1" data-motion="none">THE CONDUCTOR &mdash; one framework, three loops, each at its own clock.</div>' +
      '<div class="s06-bars">' + BARS.map(barRow).join('') + '</div>' +
      '<div class="s06-strip">' + stripSvg() + '</div>' +

      '<div class="s06-takeaway">' +
        Shared.carry({
          step: 4,
          punchHtml: 'No single fix makes the edge work. All three, together &mdash; and the conductor keeps three clocks in sync.'
        }) +
      '</div>';
  }

  /* Each card's icon resolves as that card lands; every loop it starts is
     pushed onto the page's stop list so onLeave can cancel it. */
  function resolveIcon(el, key, stops, o) {
    var card = el.querySelector('.s06-card[data-key="' + key + '"]');
    if (!card) return;

    if (key === 'conductor') {
      card.querySelectorAll('.s06-arc').forEach(function (ring) {
        stops.push(Anim.flow(ring, { speed: 26 }));
      });
      return;
    }
    if (key === 'fit') {
      Anim.scaleIn(card.querySelector('.s06-blob--fit'), {
        duration: Anim.dur(o, 650), from: 1.7, fadeFrom: 1
      });
      return;
    }
    stops.push(Anim.flow(card.querySelector('.s06-stream'), { speed: 34 }));
  }

  function startStripFlows(el, o) {
    BARS.forEach(function (b) {
      var down = el.querySelector('.s06-flow--down[data-bar="' + b.key + '"]');
      var up = el.querySelector('.s06-flow--up[data-bar="' + b.key + '"]');
      if (down) el._s06stops.push(Anim.flow(down, { speed: b.speed }));
      if (up) el._s06stops.push(Anim.flow(up, { speed: b.speed }));
    });
    Anim.fadeUp(el.querySelectorAll('.s06-flow-lbl, .s06-arrowhead'), {
      duration: Anim.dur(o, 350), stagger: Anim.dur(o, 60)
    });
  }

  function onEnter(el) { el._s06stops = []; }

  function onStep(el, i, o) {
    var c = CARDS[i - 1];

    if (c) {
      var plus = el.querySelector('.s06-plus[data-step="' + c.step + '"]');
      if (plus) Anim.scaleIn(plus, { duration: Anim.dur(o, 340) });
      Anim.fadeUp(el.querySelectorAll('.s06-card[data-key="' + c.key + '"] .step'), {
        duration: Anim.dur(o, 450), delay: Anim.dur(o, plus ? 150 : 0), stagger: Anim.dur(o, 70)
      });
      resolveIcon(el, c.key, el._s06stops, o);
    }

    if (i === 1) {
      // the strip is the conductor card, expanded — it lands in the same
      // beat as "The conductor", right after the first keystroke.
      Anim.fadeUp(el.querySelector('.s06-strip-heading'), { duration: Anim.dur(o, 420), delay: Anim.dur(o, 280) });
      Anim.fadeUp(el.querySelectorAll('.s06-bar-content'), {
        duration: Anim.dur(o, 420), delay: Anim.dur(o, 420), stagger: Anim.dur(o, 90)
      });
      Anim.drawPath(el.querySelector('.s06-rail'), { duration: Anim.dur(o, 500), delay: Anim.dur(o, 380) });
      Anim.fadeUp(el.querySelector('.s06-rail-label'), { duration: Anim.dur(o, 380), delay: Anim.dur(o, 760) });

      if (o && o.static) {
        startStripFlows(el, o);
      } else {
        setTimeout(function () {
          if (el.isConnected) startStripFlows(el, o);
        }, 950);
      }
    }

    if (i === 4) {
      Anim.fadeUp(el.querySelector('.carry-punch'), { duration: Anim.dur(o, 500) });
    }
  }

  function onLeave(el) {
    (el._s06stops || []).forEach(function (stop) { stop(); });
    el._s06stops = [];
  }

  page({
    id: '06-adaptation-approach',
    title: 'Adaptation — our approach',
    theme: 'light',
    steps: 4,
    render: render,
    onEnter: onEnter,
    onStep: onStep,
    onLeave: onLeave
  });
})();
