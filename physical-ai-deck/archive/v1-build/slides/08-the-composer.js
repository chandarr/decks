/* ==========================================================================
   Page 08 — The Composer. Act II keystone (instrument / console archetype).
   Given requirement + budget + application, the three buckets (rendered
   compactly as an ink "engine") compose the tailored stack. Example
   input/output values are illustrative — labelled as such (tasks/08,
   ASSETS.md). Closes on the v1 (human-in-the-loop)  vN (autonomous) path
   and the neutral-by-construction / re-rate framing.

   Steps: 0 base (kicker/title/locator, empty console: inputs blank, engine
   dim, output card empty) · 1 inputs populate (fadeUp, staggered, marked
   *example*) · 2 compose (engine lights in ink; converge from inputs into
   the core) · 3 output (stack card scaleIn; lines fadeUp staggered) ·
   4 maturity + neutrality (v1->vN strip via crossFade; framing lines fadeUp).
   ========================================================================== */

(function () {
  'use strict';

  function render() {
    return '' +
      '<div class="p08">' +

        Shared.kicker('The keystone', 'p08-kicker') +
        '<h1 class="title p08-title">The Composer.</h1>' +
        '<hr class="rule p08-rule">' +

        '<div class="p08-locator">' +
          Shared.locatorMap('composer', { variant: 'mini' }) +
        '</div>' +

        '<div class="p08-console">' +

          /* --- INPUTS --------------------------------------------------- */
          '<div class="p08-col p08-inputs panel">' +
            '<div class="p08-col-head">' +
              '<div class="p08-col-label mono">Inputs</div>' +
              '<span class="p08-tag mono step" data-step="1" data-motion="none">example</span>' +
            '</div>' +

            '<div class="p08-field">' +
              '<div class="p08-field-label mono">requirement:</div>' +
              '<div class="p08-field-value step" data-step="1" data-motion="none">inspect + seal welds, confined space</div>' +
              '<span class="p08-dot step" data-step="2" data-motion="none" data-dot="0" aria-hidden="true"></span>' +
            '</div>' +
            '<div class="p08-field">' +
              '<div class="p08-field-label mono">budget:</div>' +
              '<div class="p08-field-value step" data-step="1" data-motion="none">sub-$40k/unit, offline-capable</div>' +
              '<span class="p08-dot step" data-step="2" data-motion="none" data-dot="1" aria-hidden="true"></span>' +
            '</div>' +
            '<div class="p08-field">' +
              '<div class="p08-field-label mono">application:</div>' +
              '<div class="p08-field-value step" data-step="1" data-motion="none">subsea pipeline</div>' +
              '<span class="p08-dot step" data-step="2" data-motion="none" data-dot="2" aria-hidden="true"></span>' +
            '</div>' +
          '</div>' +

          '<span class="p08-flow mono" aria-hidden="true">&rarr;</span>' +

          /* --- ENGINE ------------------------------------------------------ */
          '<div class="p08-col p08-engine panel">' +
            '<div class="p08-col-label mono">The engine</div>' +
            '<div class="p08-engine-stage">' +
              '<span class="p08-engine-anchor"></span>' +
              '<svg class="p08-engine-svg" viewBox="0 0 240 300" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +

                /* shell — always visible, dim (engine "at rest") */
                '<g class="p08-eng-shell">' +
                  '<circle class="p08-eng-node--shell" cx="30" cy="34" r="5"/>' +
                  '<text class="p08-eng-lbl p08-eng-lbl--shell" x="44" y="39">Adaptation</text>' +
                  '<circle class="p08-eng-node--shell" cx="30" cy="104" r="5"/>' +
                  '<text class="p08-eng-lbl p08-eng-lbl--shell" x="44" y="109">Autonomy</text>' +
                  '<circle class="p08-eng-node--shell" cx="30" cy="174" r="5"/>' +
                  '<text class="p08-eng-lbl p08-eng-lbl--shell" x="44" y="179">Assurance</text>' +
                  '<path class="p08-eng-line--shell" d="M150,34 L120,235"/>' +
                  '<path class="p08-eng-line--shell" d="M150,104 L120,235"/>' +
                  '<path class="p08-eng-line--shell" d="M150,174 L120,235"/>' +
                  '<g class="p08-eng-keystone--shell">' +
                    '<rect x="103" y="218" width="34" height="34" rx="4" transform="rotate(45 120 235)"/>' +
                  '</g>' +
                '</g>' +

                /* fill — ink, revealed step 2 ("lights in ink") */
                '<g class="p08-eng-fill step" data-step="2" data-motion="none">' +
                  '<circle class="p08-eng-node--fill" cx="30" cy="34" r="5"/>' +
                  '<text class="p08-eng-lbl p08-eng-lbl--fill" x="44" y="39">Adaptation</text>' +
                  '<circle class="p08-eng-node--fill" cx="30" cy="104" r="5"/>' +
                  '<text class="p08-eng-lbl p08-eng-lbl--fill" x="44" y="109">Autonomy</text>' +
                  '<circle class="p08-eng-node--fill" cx="30" cy="174" r="5"/>' +
                  '<text class="p08-eng-lbl p08-eng-lbl--fill" x="44" y="179">Assurance</text>' +
                  '<path class="p08-eng-line--fill" d="M150,34 L120,235"/>' +
                  '<path class="p08-eng-line--fill" d="M150,104 L120,235"/>' +
                  '<path class="p08-eng-line--fill" d="M150,174 L120,235"/>' +
                  '<g class="p08-eng-keystone--fill">' +
                    '<rect x="103" y="218" width="34" height="34" rx="4" transform="rotate(45 120 235)"/>' +
                    '<circle cx="120" cy="235" r="4.5"/>' +
                  '</g>' +
                '</g>' +
              '</svg>' +
            '</div>' +
          '</div>' +

          '<span class="p08-flow mono" aria-hidden="true">&rarr;</span>' +

          /* --- OUTPUT -------------------------------------------------- */
          '<div class="p08-col p08-output panel">' +
            '<div class="p08-output-fill step" data-step="3" data-motion="none">' +
              '<div class="p08-col-head">' +
                '<div class="p08-col-label mono">Output &mdash; the stack</div>' +
                '<span class="p08-tag mono">illustrative</span>' +
              '</div>' +
              '<p class="p08-stack-line"><span class="p08-stack-key mono">model:</span> open-weight VLA, distilled</p>' +
              '<p class="p08-stack-line"><span class="p08-stack-key mono">adaptation:</span> task-tuned, INT4, latent-perception</p>' +
              '<p class="p08-stack-line"><span class="p08-stack-key mono">embodiment:</span> tethered crawler (vendor-neutral)</p>' +
              '<p class="p08-stack-line"><span class="p08-stack-key mono">harness:</span> reflex+reactive on-edge, cloud deliberative</p>' +
              '<p class="p08-stack-line"><span class="p08-stack-key mono">assurance:</span> failure-set + safety case &rarr; cert path</p>' +
            '</div>' +
          '</div>' +

        '</div>' +

        '<div class="p08-below">' +
          '<div class="p08-maturity-slot step" data-step="4" data-motion="none"></div>' +
          '<div class="p08-framing">' +
            '<p class="p08-framing-line step" data-step="4" data-motion="none"><strong>Emergent, not buildable-first</strong> &mdash; v1 is a human-in-the-loop config tool over a library of validated recipes; autonomy grows with the recipe library + deployment data.</p>' +
            '<p class="p08-framing-line step" data-step="4" data-motion="none"><strong>Neutral by construction</strong> &mdash; only an entity uncaptured on both ends can compose across models and bodies. Vendor-agnosticism becomes the enabling condition, not a constraint.</p>' +
            '<p class="p08-framing-line step" data-step="4" data-motion="none"><strong>The re-rate</strong> &mdash; this is where a research + services lab becomes a platform.</p>' +
          '</div>' +
        '</div>' +

        '<div class="p08-footer">' +
          Shared.carry({
            step: 4,
            punchHtml: 'the three buckets are the parts; the Composer is the product',
            lineHtml: ''
          }) +
        '</div>' +

      '</div>';
  }

  function maturityHtml() {
    return '' +
      '<div class="p08-mat-stage">' +
        '<span class="p08-mat-tag">v1</span>' +
        Shared.tierChip('building') +
      '</div>' +
      '<span class="p08-mat-arrow" aria-hidden="true">&rarr;</span>' +
      '<div class="p08-mat-stage">' +
        '<span class="p08-mat-tag">vN</span>' +
        Shared.tierChip('aspirational') +
      '</div>';
  }

  function onStep(el, i, o) {
    if (i === 1) {
      var values = el.querySelectorAll('.p08-field-value');
      Anim.fadeUp(values, { duration: Anim.dur(o, 500), stagger: Anim.dur(o, 100) });

      var tag = el.querySelector('.p08-tag[data-step="1"]');
      Anim.fadeUp(tag, { duration: Anim.dur(o, 400), delay: Anim.dur(o, 250) });
    }

    if (i === 2) {
      var fillParts = el.querySelectorAll('.p08-eng-fill .p08-eng-lbl--fill, .p08-eng-fill .p08-eng-node--fill, .p08-eng-fill .p08-eng-keystone--fill');
      Anim.fadeUp(fillParts, { duration: Anim.dur(o, 500), stagger: Anim.dur(o, 60) });

      var dots = el.querySelectorAll('.p08-dot');
      var anchor = el.querySelector('.p08-engine-anchor');
      Anim.converge(dots, Anim.centreOf(anchor), { duration: Anim.dur(o, 850), stagger: Anim.dur(o, 90) });
    }

    if (i === 3) {
      var card = el.querySelector('.p08-output');
      Anim.scaleIn(card, { duration: Anim.dur(o, 450) });

      var lines = el.querySelectorAll('.p08-stack-line');
      Anim.fadeUp(lines, { delay: Anim.dur(o, 150), duration: Anim.dur(o, 450), stagger: Anim.dur(o, 90) });
    }

    if (i === 4) {
      var slot = el.querySelector('.p08-maturity-slot');
      Anim.crossFade(slot, maturityHtml(), { duration: Anim.dur(o, 350) });

      var lines2 = el.querySelectorAll('.p08-framing-line');
      Anim.fadeUp(lines2, { delay: Anim.dur(o, 150), duration: Anim.dur(o, 500), stagger: Anim.dur(o, 110) });

      var punch = el.querySelector('.carry-punch');
      Anim.fadeUp(punch, { delay: Anim.dur(o, 550), duration: Anim.dur(o, 550) });
    }
  }

  page({
    id: '08-the-composer',
    title: 'The Composer',
    theme: 'light',
    steps: 4,
    render: render,
    onStep: onStep
  });
})();
