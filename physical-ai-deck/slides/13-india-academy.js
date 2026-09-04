(function () {
  'use strict';

  /* Geometry (1920x1080 design space), all inside the central band (§11,
     y ~200-780). Three columns: two-tier team (elite atop a larger, lighter
     base — reads the 1:6 shape), comp-balance (two equal-length bars +
     "approx" glyph), academy (base cluster -> arrow -> specialist badge).
     A faint dashed "skeleton" of every shape sits underneath from step 0
     (plain, always-rendered, low constant opacity — not .step-gated) so the
     slots read before each tier/beat is revealed. */
  var ELITE = { x: 290, y: 350, w: 180, h: 54, rx: 6, cx: 380, cy: 377 };
  var BASE = { x: 200, y: 472, w: 360, h: 110, rx: 8, cx: 380, cy: 527 };
  var BAR_TOP = { x: 700, y: 430, w: 420, h: 40, rx: 4 };
  var BAR_NEXT = { x: 700, y: 522, w: 420, h: 40, rx: 4 };
  var BAL_CX = 910;
  var BADGE = { x: 1370, y: 368, w: 260, h: 44, rx: 22, cx: 1500, cy: 390 };
  var ARROW_D = 'M1500,552 C1462,500 1462,455 1500,415';
  var ARROWHEAD = '1500,405 1490,422 1510,422';
  var DOTS = [
    { x: 1470, y: 560 }, { x: 1500, y: 574 }, { x: 1530, y: 560 }, { x: 1500, y: 546 }
  ];

  function skeletonSvg() {
    var dots = DOTS.map(function (d) {
      return '<circle cx="' + d.x + '" cy="' + d.y + '" r="6"/>';
    }).join('');
    return '' +
      '<g class="s13-skeleton" aria-hidden="true">' +
        '<rect x="' + ELITE.x + '" y="' + ELITE.y + '" width="' + ELITE.w + '" height="' + ELITE.h + '" rx="' + ELITE.rx + '"/>' +
        '<rect x="' + BASE.x + '" y="' + BASE.y + '" width="' + BASE.w + '" height="' + BASE.h + '" rx="' + BASE.rx + '"/>' +
        '<rect x="' + BAR_TOP.x + '" y="' + BAR_TOP.y + '" width="' + BAR_TOP.w + '" height="' + BAR_TOP.h + '" rx="' + BAR_TOP.rx + '"/>' +
        '<rect x="' + BAR_NEXT.x + '" y="' + BAR_NEXT.y + '" width="' + BAR_NEXT.w + '" height="' + BAR_NEXT.h + '" rx="' + BAR_NEXT.rx + '"/>' +
        '<text x="' + BAL_CX + '" y="508" text-anchor="middle" font-size="40">&asymp;</text>' +
        dots +
        '<path d="' + ARROW_D + '" fill="none"/>' +
        '<rect x="' + BADGE.x + '" y="' + BADGE.y + '" width="' + BADGE.w + '" height="' + BADGE.h + '" rx="' + BADGE.rx + '"/>' +
      '</g>';
  }

  function heroSvg() {
    return '' +
      '<svg class="s13-hero-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
        skeletonSvg() +
        /* step 1 - elite core */
        '<g class="s13-elite step" data-step="1" data-motion="none">' +
          '<rect class="s13-elite-rect" x="' + ELITE.x + '" y="' + ELITE.y + '" width="' + ELITE.w + '" height="' + ELITE.h + '" rx="' + ELITE.rx + '"/>' +
          '<text class="s13-elite-num mono" x="' + ELITE.cx + '" y="386" text-anchor="middle">~10</text>' +
        '</g>' +
        /* step 2 - deep base */
        '<g class="s13-base step" data-step="2" data-motion="none">' +
          '<rect class="s13-base-rect" x="' + BASE.x + '" y="' + BASE.y + '" width="' + BASE.w + '" height="' + BASE.h + '" rx="' + BASE.rx + '"/>' +
          '<text class="s13-base-num mono" x="' + BASE.cx + '" y="538" text-anchor="middle">~60</text>' +
        '</g>' +
        /* step 3 - comp leverage: both bars already at their equal, final
           length in the markup; the reveal itself (fadeUp, short stagger)
           is what lands the "top 10 approx next 60" point. */
        '<g class="s13-combal step" data-step="3" data-motion="none">' +
          '<rect class="s13-bar s13-bar-top" x="' + BAR_TOP.x + '" y="' + BAR_TOP.y + '" width="' + BAR_TOP.w + '" height="' + BAR_TOP.h + '" rx="' + BAR_TOP.rx + '"/>' +
          '<text class="s13-bar-label mono" x="' + BAL_CX + '" y="456" text-anchor="middle">top 10</text>' +
          '<text class="s13-approx" x="' + BAL_CX + '" y="508" text-anchor="middle">&asymp;</text>' +
          '<rect class="s13-bar s13-bar-next" x="' + BAR_NEXT.x + '" y="' + BAR_NEXT.y + '" width="' + BAR_NEXT.w + '" height="' + BAR_NEXT.h + '" rx="' + BAR_NEXT.rx + '"/>' +
          '<text class="s13-bar-label s13-bar-label-next mono" x="' + BAL_CX + '" y="548" text-anchor="middle">next 60</text>' +
        '</g>' +
        /* step 4 - academy: base cluster -> arrow -> specialist badge */
        '<g class="s13-academy step" data-step="4" data-motion="none">' +
          '<g class="s13-academy-dots">' +
            DOTS.map(function (d) {
              return '<circle class="s13-academy-dot" cx="' + d.x + '" cy="' + d.y + '" r="6"/>';
            }).join('') +
          '</g>' +
          '<path class="s13-academy-arrow" d="' + ARROW_D + '" fill="none"/>' +
          '<polygon class="s13-academy-arrowhead" points="' + ARROWHEAD + '"/>' +
          '<g class="s13-academy-badge">' +
            '<rect class="s13-badge-rect" x="' + BADGE.x + '" y="' + BADGE.y + '" width="' + BADGE.w + '" height="' + BADGE.h + '" rx="' + BADGE.rx + '"/>' +
            '<text class="s13-badge-txt mono" x="' + BADGE.cx + '" y="395" text-anchor="middle">physical-AI specialists</text>' +
          '</g>' +
        '</g>' +
      '</svg>';
  }

  function render() {
    return '' +
      Shared.kicker('How we build &middot; the talent engine', 's13-kicker') +
      '<div class="s13-slideno mono">13</div>' +
      '<h1 class="title s13-title">A world-class core, an unmatched base.</h1>' +
      '<p class="s13-coremsg">India: our talent engine &mdash; not our market.</p>' +
      '<div class="s13-hero">' + heroSvg() + '</div>' +
      '<p class="s13-cap s13-cap-elite step" data-step="1" data-motion="none"><strong>~10 exceptional technical leaders</strong> &mdash; world-class, globally recruited and paid.</p>' +
      '<p class="s13-cap s13-cap-base step" data-step="2" data-motion="none"><strong>~60 mid &amp; emerging engineers</strong> &mdash; India&rsquo;s deep, fast-growing engineering base.</p>' +
      '<div class="s13-cost step" data-step="3" data-motion="none">' +
        '<p class="s13-cost-main">The top <b>10</b> cost about the same as the next <b>60</b> &mdash; a 70-strong, high-caliber org for roughly what the West pays for ~15.</p>' +
        '<p class="s13-cost-sub">(India engineers run ~65&ndash;75% lower &mdash; about 4&ndash;5&times; cheaper.)</p>' +
      '</div>' +
      '<p class="s13-cap s13-cap-academy step" data-step="4" data-motion="none">An upskilling academy turns the base into <strong>physical-AI specialists</strong> &mdash; the talent that barely exists yet (India has only ~4&ndash;5k core AI specialists today). Anchored by AC&rsquo;s teaching. Pipeline &middot; brand &middot; revenue.</p>' +
      '<p class="s13-geo mono">build + prove &rarr; <span class="s13-geo-india">India</span>   &middot;   monetize &rarr; <span class="s13-geo-us">US / EU</span></p>' +
      '<div class="s13-takeaway">' +
        Shared.carry({ step: 5, punchHtml: 'A leadership core the world respects, a base the world can&rsquo;t match, and an academy that makes the specialists no one else has.' }) +
      '</div>';
  }

  function onStep(el, i, o) {
    if (i === 1) {
      Anim.scaleIn(el.querySelector('.s13-elite'), { duration: Anim.dur(o, 420), fadeFrom: 0 });
      Anim.fadeUp(el.querySelector('.s13-cap-elite'), { duration: Anim.dur(o, 450), delay: Anim.dur(o, 150) });
    }
    if (i === 2) {
      Anim.scaleIn(el.querySelector('.s13-base'), { duration: Anim.dur(o, 420), fadeFrom: 0 });
      Anim.fadeUp(el.querySelector('.s13-cap-base'), { duration: Anim.dur(o, 450), delay: Anim.dur(o, 150) });
    }
    if (i === 3) {
      Anim.fadeUp(el.querySelectorAll('.s13-bar'), { duration: Anim.dur(o, 420), stagger: Anim.dur(o, 150) });
      Anim.fadeUp(el.querySelector('.s13-approx'), { duration: Anim.dur(o, 380), delay: Anim.dur(o, 220) });
      Anim.fadeUp(el.querySelectorAll('.s13-bar-label'), { duration: Anim.dur(o, 380), delay: Anim.dur(o, 260), stagger: Anim.dur(o, 100) });
      Anim.fadeUp(el.querySelector('.s13-cost'), { duration: Anim.dur(o, 480), delay: Anim.dur(o, 420) });
    }
    if (i === 4) {
      Anim.fadeUp(el.querySelectorAll('.s13-academy-dot'), { duration: Anim.dur(o, 380), stagger: Anim.dur(o, 80) });
      Anim.drawPath(el.querySelector('.s13-academy-arrow'), { duration: Anim.dur(o, 700), delay: Anim.dur(o, 150) });
      Anim.fadeUp(el.querySelector('.s13-academy-arrowhead'), { duration: Anim.dur(o, 300), delay: Anim.dur(o, 780) });
      Anim.scaleIn(el.querySelector('.s13-academy-badge'), { duration: Anim.dur(o, 420), delay: Anim.dur(o, 820), fadeFrom: 0 });
      Anim.fadeUp(el.querySelector('.s13-cap-academy'), { duration: Anim.dur(o, 480), delay: Anim.dur(o, 950) });
    }
    if (i === 5) {
      el.querySelector('.s13-geo').classList.add('is-active');
      Anim.fadeUp(el.querySelector('.carry-punch'), { duration: Anim.dur(o, 550) });
    }
  }

  page({
    id: '13-india-academy',
    title: 'India as engine + academy',
    theme: 'light',
    steps: 5,
    render: render,
    onStep: onStep
  });
})();
