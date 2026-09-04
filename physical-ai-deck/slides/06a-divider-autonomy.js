/* ==========================================================================
   Page 06a — Section divider · Pillar 2, Autonomy (tasks/06a-divider-
   autonomy.md). ★NEW slide — identical in mechanics to
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

  var KICKER = 'Pillar 2 of 3';
  var SLIDENO = '06a';
  var LOCATOR = [
    { label: 'adaptation', active: false },
    { label: 'AUTONOMY', active: true },
    { label: 'assurance', active: false }
  ];
  var PILLAR_WORD = 'AUTONOMY';
  var DELIVERS = 'Delivers COMPETENCE';
  var WHAT_IT_IS = 'Learning the job and getting better at it &mdash; every correction becomes lasting skill.';

  function locatorHtml() {
    return LOCATOR.map(function (t, i) {
      var cls = 's06a-loc-token' + (t.active ? ' is-active' : '');
      var sep = i < LOCATOR.length - 1 ? '<span class="s06a-loc-sep">&middot;</span>' : '';
      return '<span class="' + cls + '">' + t.label + '</span>' + sep;
    }).join('');
  }

  function render() {
    return '' +
      Shared.kicker(KICKER, 's06a-kicker') +
      '<div class="s06a-slideno mono">' + SLIDENO + '</div>' +

      '<div class="s06a-locator mono">' + locatorHtml() + '</div>' +

      '<div class="s06a-pillarword">' + PILLAR_WORD + '</div>' +
      '<div class="s06a-delivers mono">' + DELIVERS + '</div>' +

      '<p class="s06a-whatitis">' + WHAT_IT_IS + '</p>';
  }


  page({
    id: '06a-divider-autonomy',
    title: 'Divider — Autonomy',
    theme: 'light',
    steps: 0,
    render: render
  });
})();
