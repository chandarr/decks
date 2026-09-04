/* ==========================================================================
   Page 04b — Section divider · Pillar 1, Adaptation (tasks/04b-divider-
   adaptation.md). ★NEW slide — this is the CANONICAL DIVIDER TEMPLATE:
   06a (Autonomy) and 07a (Assurance) are built from this file, swapping
   only the content constants below (per the task file's own instruction —
   do not re-derive, copy this file and change the words).

   Steps: none. A divider is passed through at speed, so the whole page —
   kicker, slide-no, locator, pillar word, delivers line, what-it-is — is
   present and at rest the moment it mounts. No advance beat, no entrance
   tween: arrowing straight past it must never show a half-built page
   (founder call, superseding the task file's 2-beat reveal).
   ========================================================================== */

(function () {
  'use strict';

  var KICKER = 'Pillar 1 of 3';
  var SLIDENO = '04b';
  var LOCATOR = [
    { label: 'ADAPTATION', active: true },
    { label: 'autonomy', active: false },
    { label: 'assurance', active: false }
  ];
  var PILLAR_WORD = 'ADAPTATION';
  var DELIVERS = 'Delivers the EDGE';
  var WHAT_IT_IS = 'Fitting the world&rsquo;s models to real bodies &mdash; on the device, offline, at the edge.';

  function locatorHtml() {
    return LOCATOR.map(function (t, i) {
      var cls = 's04b-loc-token' + (t.active ? ' is-active' : '');
      var sep = i < LOCATOR.length - 1 ? '<span class="s04b-loc-sep">&middot;</span>' : '';
      return '<span class="' + cls + '">' + t.label + '</span>' + sep;
    }).join('');
  }

  function render() {
    return '' +
      Shared.kicker(KICKER, 's04b-kicker') +
      '<div class="s04b-slideno mono">' + SLIDENO + '</div>' +

      '<div class="s04b-locator mono">' + locatorHtml() + '</div>' +

      '<div class="s04b-pillarword">' + PILLAR_WORD + '</div>' +
      '<div class="s04b-delivers mono">' + DELIVERS + '</div>' +

      '<p class="s04b-whatitis">' + WHAT_IT_IS + '</p>';
  }


  page({
    id: '04b-divider-adaptation',
    title: 'Divider — Adaptation',
    theme: 'light',
    steps: 0,
    render: render
  });
})();
