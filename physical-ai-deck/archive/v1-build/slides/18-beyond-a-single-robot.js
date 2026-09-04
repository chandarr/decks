/* ==========================================================================
   Page 18 — Beyond a single robot. Opens Act V ("Horizon & close"). Locator-
   expand archetype: callback to page 01's thesis map, brought to centre at
   rest, then its embodiment-world node expands into a constellation of
   environment nodes (bronze) while the Composer keystone re-emphasises.

   The shared locatorMap() is rendered hero-size, unmodified, as the step-0
   "at rest" base (tasks/18: "the familiar bridge map ... at rest, centre").
   A second, pixel-aligned overlay <svg> (same viewBox/preserveAspectRatio,
   stacked absolute-inset-0 on the same box) supplies the page-specific
   additions the shared component can't: the environment-node constellation
   and the "embodiment world" -> "embodied systems" label swap. Both stay
   entirely additive — _shared.js is untouched.

   Steps: 0 base (kicker/title, page-01 map at rest) · 1 the shift (label
   patch fades in over "THE EMBODIMENT WORLD", radiate the 4 environment
   nodes from the embodiment hub, the shift copy fades up) · 2 compose the
   environment (keystone re-emphasis pulse, the compose copy fades up) ·
   3 the carry line.
   ========================================================================== */

(function () {
  'use strict';

  // Positioned to continue the existing embodiment node column (which ends
  // ~y587) after a clear gap, staying inside the safe right margin and well
  // clear of the notes block below (~y772).
  var ENV_NODES = [
    { y: 626, label: 'Intelligent warehouse' },
    { y: 662, label: 'Self-driving lab' },
    { y: 698, label: 'Orchestrated fleet' },
    { y: 734, label: 'IoT plant' }
  ];

  function renderEnvNode(n) {
    return '' +
      '<g class="p18-env-node step" data-step="1" data-motion="none">' +
        '<circle cx="1540" cy="' + n.y + '" r="4.5" fill="var(--accent-a)"/>' +
        '<text class="p18-env-lbl" x="1558" y="' + (n.y + 6) + '" text-anchor="start">' + n.label + '</text>' +
      '</g>';
  }

  function render() {
    return '' +
      Shared.kicker('The horizon', 'p18-kicker') +
      '<h1 class="title p18-title">Physical AI is bigger than a robot.</h1>' +

      '<div class="p18-map">' +

        '<div class="p18-map-base">' +
          Shared.locatorMap(null, { variant: 'hero', idPrefix: 'p18-lm' }) +
        '</div>' +

        '<svg class="locator p18-overlay-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
          '<g class="p18-shift-label step" data-step="1" data-motion="none">' +
            '<rect x="1388" y="360" width="340" height="28" fill="var(--canvas)"></rect>' +
            '<text class="lm-anchor" x="1558" y="384" text-anchor="middle" font-size="23" fill="var(--accent-a)">EMBODIED <tspan font-style="italic">SYSTEMS</tspan></text>' +
          '</g>' +
          ENV_NODES.map(renderEnvNode).join('') +
        '</svg>' +

      '</div>' +

      '<div class="p18-notes">' +
        '<p class="p18-note p18-note--shift body step" data-step="1" data-motion="none">' +
          'The embodiment world becomes embodied <em>systems</em> &mdash; intelligent warehouses where gates, ' +
          'valves, conveyors and arms co-orchestrate to a goal; self-driving labs where instruments pursue an ' +
          'objective; orchestrated fleets.' +
        '</p>' +
        '<p class="p18-note p18-note--compose body step" data-step="2" data-motion="none">' +
          'The same three buckets and the same Composer extend from one body to a whole environment &mdash; the ' +
          'middle, at system scale.' +
        '</p>' +
      '</div>' +

      '<div class="p18-footer">' +
        Shared.carry({
          step: 3,
          punchHtml: 'we compose robots today &mdash; and intelligent environments tomorrow',
          lineHtml: ''
        }) +
      '</div>';
  }

  function onStep(el, i, o) {
    if (i === 1) {
      var label = el.querySelector('.p18-shift-label');
      Anim.fadeUp(label, { duration: Anim.dur(o, 500) });

      var hub = el.querySelector('.p18-map-base [data-key="embodiment"] circle[r="8"]');
      var nodes = el.querySelectorAll('.p18-env-node');
      if (hub) {
        Anim.radiate(nodes, Anim.centreOf(hub), {
          duration: Anim.dur(o, 700),
          stagger: Anim.dur(o, 70),
          delay: Anim.dur(o, 150)
        });
      }

      var note1 = el.querySelector('.p18-note--shift');
      Anim.fadeUp(note1, { delay: Anim.dur(o, 450), duration: Anim.dur(o, 500) });
    }

    if (i === 2) {
      var keystone = el.querySelector('.p18-map-base .lm-keystone-shape');
      Anim.scaleIn(keystone, { duration: Anim.dur(o, 450), fadeFrom: 1 });

      var note2 = el.querySelector('.p18-note--compose');
      Anim.fadeUp(note2, { delay: Anim.dur(o, 200), duration: Anim.dur(o, 500) });
    }

    if (i === 3) {
      var punch = el.querySelector('.carry-punch');
      Anim.fadeUp(punch, { duration: Anim.dur(o, 600) });
    }
  }

  page({
    id: '18-beyond-a-single-robot',
    title: 'Beyond a single robot',
    theme: 'light',
    steps: 3,
    render: render,
    onStep: onStep
  });
})();
