/* ==========================================================================
   Page 05 — Adaptation · the problem (tasks/05-adaptation-problem.md).

   Steps: 0 base (title + static chain) · 1 why edge (chain flow + break-
   cycle start, one-liners) · 2 the three gaps (cards + icon loops) ·
   3 takeaway.
   ========================================================================== */

(function () {
  'use strict';

  var CHAIN = ['MACHINE', 'network card', 'connectivity', 'DNS', 'server', 'MODEL'];
  var CHAIN_X = [130, 462, 794, 1126, 1458, 1790];
  var CHAIN_Y = 280;

  var CARDS = [
    {
      key: 'conductor', title: 'No conductor',
      body: 'Reflex, reactive, and reasoning run at three different timescales, and nothing makes them work together.'
    },
    {
      key: 'fit', title: 'No fit',
      body: 'Models are too big for the machine, and shrinking them to the body and the job is ad hoc.'
    },
    {
      key: 'compression', title: 'No compression for machines',
      body: 'Perception drowns training storage and clogs the edge &mdash; codecs are built for human eyes, not machines.'
    }
  ];

  function chainSvg() {
    var segs = '';
    for (var i = 0; i < CHAIN_X.length - 1; i++) {
      segs += '<line class="s05-seg" data-i="' + i + '" x1="' + CHAIN_X[i] + '" y1="' + CHAIN_Y + '" x2="' + CHAIN_X[i + 1] + '" y2="' + CHAIN_Y + '"/>';
    }
    var nodes = CHAIN.map(function (label, i) {
      var end = i === 0 || i === CHAIN.length - 1;
      return '' +
        '<circle class="s05-node' + (end ? ' s05-node--end' : '') + '" cx="' + CHAIN_X[i] + '" cy="' + CHAIN_Y + '" r="' + (end ? 8 : 5) + '"/>' +
        '<text class="s05-nodelbl mono" x="' + CHAIN_X[i] + '" y="' + (CHAIN_Y + 34) + '" text-anchor="middle">' + label + '</text>';
    }).join('');
    return '' +
      '<svg class="s05-chain-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
        segs + nodes +
        '<text class="s05-dropped mono" x="' + CHAIN_X[0] + '" y="' + (CHAIN_Y - 24) + '" text-anchor="middle">loop dropped</text>' +
      '</svg>';
  }

  function icon(card) {
    if (card.key === 'conductor') {
      return '' +
        '<svg class="s05-icon-svg" viewBox="0 0 140 140" aria-hidden="true">' +
          '<circle class="s05-arc s05-arc--1" cx="70" cy="70" r="26" stroke-dasharray="6 10"/>' +
          '<circle class="s05-arc s05-arc--2" cx="70" cy="70" r="42" stroke-dasharray="4 9"/>' +
          '<circle class="s05-arc s05-arc--3" cx="70" cy="70" r="58" stroke-dasharray="3 12"/>' +
        '</svg>';
    }
    if (card.key === 'fit') {
      return '' +
        '<svg class="s05-icon-svg" viewBox="0 0 140 140" aria-hidden="true">' +
          '<rect class="s05-device" x="46" y="30" width="48" height="80" rx="6"/>' +
          '<rect class="s05-blob s05-blob--big" x="26" y="46" width="88" height="52" rx="8"/>' +
        '</svg>';
    }
    return '' +
      '<svg class="s05-icon-svg" viewBox="0 0 140 140" aria-hidden="true">' +
        '<line class="s05-stream" x1="52" y1="10" x2="52" y2="86"/>' +
        '<line class="s05-stream" x1="70" y1="10" x2="70" y2="86"/>' +
        '<line class="s05-stream" x1="88" y1="10" x2="88" y2="86"/>' +
        '<rect class="s05-tray" x="34" y="86" width="72" height="30" rx="5"/>' +
      '</svg>';
  }

  function render() {
    return '' +
      Shared.kicker('Adaptation &middot; the problem', 's05-kicker') +
      '<div class="s05-slideno mono">05</div>' +

      '<h1 class="title s05-title">Cloud-first is a non-starter.</h1>' +

      '<div class="s05-chain">' + chainSvg() + '</div>' +

      '<div class="s05-oneliners">' +
        '<p class="s05-oneliner">A chatbot&rsquo;s hiccup is a retry. A machine&rsquo;s hiccup is a failure in the world.</p>' +
        '<p class="s05-oneliner"><s>LLM era: start in the cloud, move to the edge later.</s> <b>Physical AI: the edge, from day one.</b></p>' +
      '</div>' +

      '<div class="s05-cards">' +
        CARDS.map(function (c) {
          return '' +
            '<div class="s05-card panel step" data-step="2" data-motion="none" data-key="' + c.key + '">' +
              '<div class="s05-icon">' + icon(c) + '</div>' +
              '<div class="s05-card-title">' + c.title + '</div>' +
              '<p class="s05-card-body">' + c.body + '</p>' +
            '</div>';
        }).join('') +
      '</div>' +

      '<div class="s05-takeaway">' +
        Shared.carry({ step: 3, punchHtml: 'Nobody owns the layer that makes intelligence fit the machine. That&rsquo;s the gap we build.' }) +
      '</div>';
  }

  function startChainFlow(el, stops) {
    var segs = el.querySelectorAll('.s05-seg');
    segs.forEach(function (seg) { stops.push(Anim.flow(seg, { speed: 26 })); });
  }

  function startBreakCycle(el, stops) {
    var segs = Array.prototype.slice.call(el.querySelectorAll('.s05-seg'));
    var dropped = el.querySelector('.s05-dropped');

    if (Anim.reduced) {
      segs[0].classList.add('is-broken');
      dropped.classList.add('is-shown');
      stops.push(function () { segs[0].classList.remove('is-broken'); dropped.classList.remove('is-shown'); });
      return;
    }

    var i = 0, live = true;
    function tick() {
      if (!live) return;
      segs.forEach(function (s) { s.classList.remove('is-broken'); });
      segs[i % segs.length].classList.add('is-broken');
      dropped.classList.add('is-shown');
      setTimeout(function () { if (live) dropped.classList.remove('is-shown'); }, 700);
      i++;
    }
    tick();
    var id = setInterval(tick, 1700);
    stops.push(function () {
      live = false; clearInterval(id);
      segs.forEach(function (s) { s.classList.remove('is-broken'); });
      dropped.classList.remove('is-shown');
    });
  }

  function startIconLoops(el, stops) {
    var conductor = el.querySelector('.s05-card[data-key="conductor"]');
    if (conductor) {
      stops.push(Anim.flow(conductor.querySelector('.s05-arc--1'), { speed: 30 }));
      stops.push(Anim.flow(conductor.querySelector('.s05-arc--2'), { speed: 18, reverse: true }));
      stops.push(Anim.flow(conductor.querySelector('.s05-arc--3'), { speed: 44 }));
    }

    var fitBlob = el.querySelector('.s05-card[data-key="fit"] .s05-blob--big');
    if (fitBlob && !Anim.reduced) {
      var on = false, live = true;
      var id = setInterval(function () {
        on = !on;
        fitBlob.classList.toggle('is-strain', on);
      }, 1100);
      stops.push(function () { live = false; clearInterval(id); fitBlob.classList.remove('is-strain'); });
    }

    var compression = el.querySelector('.s05-card[data-key="compression"]');
    if (compression) {
      compression.querySelectorAll('.s05-stream').forEach(function (line, i) {
        stops.push(Anim.flow(line, { speed: 40 + i * 8 }));
      });
    }
  }

  function onEnter(el) { el._s05stops = []; }

  function onStep(el, i, o) {
    if (i === 1) {
      startChainFlow(el, el._s05stops);
      startBreakCycle(el, el._s05stops);
      Anim.fadeUp(el.querySelectorAll('.s05-oneliner'), { duration: Anim.dur(o, 500), stagger: Anim.dur(o, 120) });
    }

    if (i === 2) {
      var cards = el.querySelectorAll('.s05-card');
      Anim.scaleIn(cards, { duration: Anim.dur(o, 450), stagger: Anim.dur(o, 120) });
      startIconLoops(el, el._s05stops);
    }

    if (i === 3) {
      var punch = el.querySelector('.carry-punch');
      Anim.fadeUp(punch, { duration: Anim.dur(o, 550) });
    }
  }

  function onLeave(el) {
    (el._s05stops || []).forEach(function (stop) { stop(); });
    el._s05stops = [];
  }

  page({
    id: '05-adaptation-problem',
    title: 'Adaptation — the problem',
    theme: 'light',
    steps: 3,
    render: render,
    onEnter: onEnter,
    onStep: onStep,
    onLeave: onLeave
  });
})();
