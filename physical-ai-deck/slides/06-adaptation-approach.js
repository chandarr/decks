/* ==========================================================================
   Page 06 — Adaptation · our approach (tasks/06-adaptation-approach.md).
   Visual twin of slide 05 — same card size/style, resolved icon motions.

   Steps: 0 base (three solution cards, icons resting solved) · 1 each
   solution works (icons animate, resolved/coordinated) · 2 all three
   together (+ / = beat, cards nudge) · 3 takeaway.
   ========================================================================== */

(function () {
  'use strict';

  var CARDS = [
    {
      key: 'conductor', title: 'The conductor',
      body: 'One framework runs reflex, reactive, and reasoning together &mdash; each at its own clock, in sync.'
    },
    {
      key: 'fit', title: 'The fit',
      body: 'Fine-tune, distil, quantize, cache: the right model, shaped to the body and the job.'
    },
    {
      key: 'compression', title: 'Machine-grade compression',
      body: 'Perception as compact latent &mdash; leaner training, faster edge; built for machines, not human eyes.'
    }
  ];

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
          '<rect class="s06-device" x="46" y="30" width="48" height="80" rx="6"/>' +
          '<rect class="s06-blob s06-blob--fit" x="52" y="40" width="36" height="60" rx="6"/>' +
        '</svg>';
    }
    return '' +
      '<svg class="s06-icon-svg" viewBox="0 0 140 140" aria-hidden="true">' +
        '<rect class="s06-funnel" x="58" y="14" width="24" height="18" rx="3"/>' +
        '<line class="s06-stream" x1="70" y1="32" x2="70" y2="118"/>' +
        '<circle class="s06-token" cx="70" cy="118" r="6"/>' +
      '</svg>';
  }

  function render() {
    return '' +
      Shared.kicker('Adaptation &middot; our approach', 's06-kicker') +
      '<div class="s06-slideno mono">06</div>' +

      '<h1 class="title s06-title">Make the edge actually work.</h1>' +

      '<div class="s06-cards">' +
        CARDS.map(function (c, i) {
          return '' +
            (i > 0 ? '<div class="s06-plus step" data-step="2" data-motion="none">+</div>' : '') +
            '<div class="s06-card panel" data-key="' + c.key + '">' +
              '<div class="s06-icon">' + icon(c) + '</div>' +
              '<div class="s06-card-title">' + c.title + '</div>' +
              '<p class="s06-card-body">' + c.body + '</p>' +
            '</div>';
        }).join('') +
      '</div>' +

      '<div class="s06-equals step" data-step="2" data-motion="none">' +
        '<span class="mono">The conductor&nbsp;&nbsp;+&nbsp;&nbsp;the fit&nbsp;&nbsp;+&nbsp;&nbsp;compression&nbsp;&nbsp;=&nbsp;&nbsp;an edge that works</span>' +
      '</div>' +

      '<div class="s06-takeaway">' +
        Shared.carry({ step: 3, punchHtml: 'No single fix makes the edge work. All three, together &mdash; that&rsquo;s Adaptation.' }) +
      '</div>';
  }

  function startIconLoops(el, stops, o) {
    var conductor = el.querySelector('.s06-card[data-key="conductor"]');
    if (conductor) {
      conductor.querySelectorAll('.s06-arc').forEach(function (ring) {
        stops.push(Anim.flow(ring, { speed: 26 }));
      });
    }

    var fitBlob = el.querySelector('.s06-card[data-key="fit"] .s06-blob--fit');
    if (fitBlob) {
      Anim.scaleIn(fitBlob, { duration: Anim.dur(o, 650), from: 1.7, fadeFrom: 1 });
    }

    var compression = el.querySelector('.s06-card[data-key="compression"]');
    if (compression) {
      stops.push(Anim.flow(compression.querySelector('.s06-stream'), { speed: 34 }));
    }
  }

  function onEnter(el) { el._s06stops = []; }

  function onStep(el, i, o) {
    if (i === 1) {
      startIconLoops(el, el._s06stops, o);
    }

    if (i === 2) {
      var plus = el.querySelectorAll('.s06-plus');
      Anim.scaleIn(plus, { duration: Anim.dur(o, 380), stagger: Anim.dur(o, 100) });

      var eq = el.querySelector('.s06-equals');
      Anim.fadeUp(eq, { delay: Anim.dur(o, 250), duration: Anim.dur(o, 450) });

      el.querySelector('.s06-cards').classList.add('is-nudged');
    }

    if (i === 3) {
      var punch = el.querySelector('.carry-punch');
      Anim.fadeUp(punch, { duration: Anim.dur(o, 550) });
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
    steps: 3,
    render: render,
    onEnter: onEnter,
    onStep: onStep,
    onLeave: onLeave
  });
})();
