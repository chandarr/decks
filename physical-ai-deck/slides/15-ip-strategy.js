/* ==========================================================================
   Page 15 — IP strategy (tasks/15-ip-strategy.md).

   Steps: 0 base (kicker, title, three faint column headers) · 1 Publish
   column fills · 2 Patent column fills · 3 Keep column fills, emphasized
   with a lock-close scaleIn (the crown jewels) · 4 standards-as-position
   line, then the takeaway.
   ========================================================================== */

(function () {
  'use strict';

  var ICON_PUBLISH = '' +
    '<svg class="s15-icon" viewBox="0 0 48 48" aria-hidden="true">' +
      '<path d="M6 12c6-4 12-4 18 0v24c-6-4-12-4-18 0z" fill="none" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M42 12c-6-4-12-4-18 0v24c6-4 12-4 18 0z" fill="none" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M24 12v24" stroke="var(--ink)" stroke-width="1.5"/>' +
      '<g stroke="var(--ink)" stroke-width="1.5" stroke-linecap="round">' +
        '<path d="M24 4v4"/>' +
        '<path d="M14 6l2.5 3.5"/>' +
        '<path d="M34 6l-2.5 3.5"/>' +
      '</g>' +
    '</svg>';

  var ICON_PATENT = '' +
    '<svg class="s15-icon" viewBox="0 0 48 48" aria-hidden="true">' +
      '<path d="M24 4l16 6v11c0 11-7 18-16 23-9-5-16-12-16-23V10z" fill="none" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/>' +
      '<path d="M17 24l5 5 10-11" fill="none" stroke="var(--ink)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';

  var ICON_KEEP = '' +
    '<svg class="s15-icon s15-lock-icon" viewBox="0 0 48 48" aria-hidden="true">' +
      '<rect x="10" y="22" width="28" height="20" rx="3" fill="none" stroke="var(--ink)" stroke-width="2"/>' +
      '<path d="M16 22v-6a8 8 0 0 1 16 0v6" fill="none" stroke="var(--ink)" stroke-width="2" stroke-linecap="round"/>' +
      '<circle cx="24" cy="31" r="2.4" fill="var(--ink)"/>' +
      '<path d="M24 33.4v4" stroke="var(--ink)" stroke-width="2" stroke-linecap="round"/>' +
    '</svg>';

  var COLUMNS = [
    {
      key: 'publish', step: 1, header: 'PUBLISH', icon: ICON_PUBLISH,
      what: 'Research on embodied assurance, world-model compression, adaptation, evaluation.',
      why: 'Attracts the best people and sets the field&rsquo;s terms.'
    },
    {
      key: 'patent', step: 2, header: 'PATENT', icon: ICON_PATENT,
      what: 'Model&rarr;embodiment adaptation, edge-orchestration, and safety-case techniques.',
      why: 'Defensible and licensable.'
    },
    {
      key: 'keep', step: 3, header: 'KEEP', icon: ICON_KEEP, trade: true,
      what: 'The failure-data corpus, the orchestration recipes, deployment data.',
      why: 'The crown jewels &mdash; never published, never patented.'
    }
  ];

  function column(c) {
    var extraClass = c.key === 'keep' ? ' s15-col--keep' : '';
    return '' +
      '<div class="panel s15-col' + extraClass + '" data-col="' + c.key + '">' +
        '<div class="s15-col-head mono">' + c.header + '</div>' +
        '<div class="s15-col-body step" data-step="' + c.step + '" data-motion="none">' +
          c.icon +
          (c.trade ? '<p class="s15-col-trade mono">(trade secret)</p>' : '') +
          '<p class="s15-col-what">' + c.what + '</p>' +
          '<p class="s15-col-why">' + c.why + '</p>' +
        '</div>' +
      '</div>';
  }

  function render() {
    return '' +
      Shared.kicker('How we build &middot; what we own', 's15-kicker') +
      '<div class="s15-slideno mono">15</div>' +

      '<h1 class="title s15-title">Publish the science. Patent the methods. Keep the data.</h1>' +

      '<div class="s15-columns">' + COLUMNS.map(column).join('') + '</div>' +

      '<p class="s15-standards step" data-step="4" data-motion="none">Shaping the certification standard is a seat at the head of the table &mdash; not a filing.</p>' +

      '<div class="s15-takeaway">' +
        Shared.carry({ step: 4, punchHtml: 'Open what recruits. Protect what compounds.' }) +
      '</div>';
  }

  function revealColumn(el, key, o) {
    var col = el.querySelector('.s15-col[data-col="' + key + '"]');
    var body = col.querySelector('.s15-col-body');
    col.classList.add('is-active');
    Anim.fadeUp(body, { duration: Anim.dur(o, 450) });
    if (key === 'keep') {
      var lock = col.querySelector('.s15-lock-icon');
      Anim.scaleIn(lock, { delay: Anim.dur(o, 220), duration: Anim.dur(o, 350), fadeFrom: 1, from: 0.85, lift: false });
    }
  }

  function onStep(el, i, o) {
    if (i === 1) revealColumn(el, 'publish', o);
    if (i === 2) revealColumn(el, 'patent', o);
    if (i === 3) revealColumn(el, 'keep', o);
    if (i === 4) {
      Anim.fadeUp(el.querySelector('.s15-standards'), { duration: Anim.dur(o, 450) });
      var punch = el.querySelector('.carry-punch');
      Anim.fadeUp(punch, { delay: Anim.dur(o, 300), duration: Anim.dur(o, 500) });
    }
  }

  page({
    id: '15-ip-strategy',
    title: 'IP strategy',
    theme: 'light',
    steps: 4,
    render: render,
    onStep: onStep
  });
})();
