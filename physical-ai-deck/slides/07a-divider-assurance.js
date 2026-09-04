/* ==========================================================================
   Page 07a — Section divider · Pillar 3, Assurance (tasks/07a-divider-
   assurance.md). ★NEW slide — identical in mechanics to
   04b-divider-adaptation.js (the canonical divider template); only the
   content constants below differ, per that task file's own instruction.

   Steps: none. A divider is passed through at speed, so the whole page —
   kicker, slide-no, locator, pillar word, delivers line, what-it-is — is
   present and at rest the moment it mounts. No advance beat, no entrance
   tween: arrowing straight past it must never show a half-built page
   (founder call, superseding the task file's 2-beat reveal).
   ========================================================================== */

(function () {
  'use strict';

  var KICKER = 'Pillar 3 of 3';
  var SLIDENO = '07a';
  var LOCATOR = [
    { label: 'adaptation', active: false },
    { label: 'autonomy', active: false },
    { label: 'ASSURANCE', active: true }
  ];
  var PILLAR_WORD = 'ASSURANCE';
  var DELIVERS = 'Delivers CONFIDENCE';
  var WHAT_IT_IS = 'Making a machine that learns dependable enough to certify &mdash; and trust in the field.';

  function locatorHtml() {
    return LOCATOR.map(function (t, i) {
      var cls = 's07a-loc-token' + (t.active ? ' is-active' : '');
      var sep = i < LOCATOR.length - 1 ? '<span class="s07a-loc-sep">&middot;</span>' : '';
      return '<span class="' + cls + '">' + t.label + '</span>' + sep;
    }).join('');
  }

  function render() {
    return '' +
      Shared.kicker(KICKER, 's07a-kicker') +
      '<div class="s07a-slideno mono">' + SLIDENO + '</div>' +

      '<div class="s07a-locator mono">' + locatorHtml() + '</div>' +

      '<div class="s07a-pillarword">' + PILLAR_WORD + '</div>' +
      '<div class="s07a-delivers mono">' + DELIVERS + '</div>' +

      '<p class="s07a-whatitis">' + WHAT_IT_IS + '</p>';
  }


  page({
    id: '07a-divider-assurance',
    title: 'Divider — Assurance',
    theme: 'light',
    steps: 0,
    render: render
  });
})();
