/* ==========================================================================
   Page 06 — Autonomy. Bucket 2 of Act II: turn a fitted policy into a
   goal-seeking system with memory, tools, and a learning loop that compounds
   with deployment. Left 45% carries the "goals not tasks" idea plus the
   tools/memory copy; right 55% draws the improvement loop as a native ink
   cycle (PERCEIVE → PLAN → ACT → FEEDBACK → POLICY/WORLD-MODEL), closed by
   a labelled human-correction inflow. `locatorMap('autonomy')` sits as a
   small top-right corner badge (tasks/06-autonomy.md).

   Steps: 0 base (kicker/title/locator/loop nodes present, arcs undrawn) ·
   1 goals-not-tasks text + PERCEIVE→PLAN→ACT arcs drawPath · 2 tools &
   memory text fades · 3 the closing FEEDBACK arc + correction inflow draw
   on, flywheel text + BUILDING tier chip fade, carry line.
   ========================================================================== */

(function () {
  'use strict';

  function render() {
    return '' +
      '<div class="p06-wrap">' +

        '<div class="p06-main">' +

          '<div class="p06-left">' +
            Shared.kicker('What we build &middot; 2 of 3', 'p06-kicker') +
            '<h1 class="title p06-title">Autonomy &mdash; goals, not tasks; and a system that learns.</h1>' +

            '<div class="p06-copy">' +
              '<p class="body step p06-para" data-step="1">Hand the system an objective, not a script. It decomposes the goal into tasks and figures out how &mdash; task-and-motion planning married to a reasoning planner.</p>' +
              '<p class="body step p06-para" data-step="2">Its tools are SLAM, localization, perception, motion primitives; its memory is a spatial/world model that persists across a job.</p>' +
              '<div class="step p06-tier" data-step="3">' + Shared.tierChip('building') + '</div>' +
              '<p class="body step p06-para" data-step="3">A human says <em>&ldquo;gentler, and rotate first&rdquo;</em> &mdash; and the policy updates, not just the plan. Language-conditioned correction folded into reasoning <strong>and</strong> motion. Every deployment compounds; the fleet is the asset.</p>' +
            '</div>' +
          '</div>' +

          '<div class="p06-right">' +
            '<div class="p06-loop">' +
              '<svg class="p06-loop-svg" viewBox="0 0 700 700" preserveAspectRatio="xMidYMid meet" aria-label="The autonomy improvement loop: perceive, plan, act, feedback, closing into the policy and world model, driven by a verbal and real-world correction inflow">' +

                /* central node: POLICY / WORLD-MODEL (ink keystone, matches locatorMap's Composer motif) */
                '<g class="p06-center">' +
                  '<rect x="325" y="325" width="50" height="50" rx="5" transform="rotate(45 350 350)" fill="var(--panel)" stroke="var(--ink)" stroke-width="2.5"/>' +
                  '<circle cx="350" cy="350" r="5" fill="var(--ink)"/>' +
                  '<text class="p06-center-lbl" x="350" y="432" text-anchor="middle">POLICY / WORLD-MODEL</text>' +
                '</g>' +

                /* outer loop nodes: PERCEIVE (top) → PLAN (right) → ACT (bottom) → FEEDBACK (left) */
                '<g class="p06-node">' +
                  '<circle cx="350" cy="110" r="10" fill="var(--ink)"/>' +
                  '<text class="p06-node-lbl" x="350" y="76" text-anchor="middle">PERCEIVE</text>' +
                '</g>' +
                '<g class="p06-node">' +
                  '<circle cx="590" cy="350" r="10" fill="var(--ink)"/>' +
                  '<text class="p06-node-lbl" x="616" y="356" text-anchor="start">PLAN</text>' +
                '</g>' +
                '<g class="p06-node">' +
                  '<circle cx="350" cy="590" r="10" fill="var(--ink)"/>' +
                  '<text class="p06-node-lbl" x="350" y="624" text-anchor="middle">ACT</text>' +
                '</g>' +
                '<g class="p06-node">' +
                  '<circle cx="110" cy="350" r="10" fill="var(--ink)"/>' +
                  '<text class="p06-node-lbl" x="84" y="356" text-anchor="end">FEEDBACK</text>' +
                '</g>' +

                /* step 1: PERCEIVE → PLAN → ACT arcs */
                '<g class="step" data-step="1" data-motion="none">' +
                  '<path class="p06-arc p06-arc-1" d="M350,110 Q590,110 590,350" fill="none" stroke-width="2.5"/>' +
                  '<path class="p06-arc p06-arc-2" d="M590,350 Q590,590 350,590" fill="none" stroke-width="2.5"/>' +
                '</g>' +

                /* step 3: the closing FEEDBACK arc (ACT → FEEDBACK → centre) + the correction inflow */
                '<g class="step" data-step="3" data-motion="none">' +
                  '<path class="p06-arc p06-arc-close" d="M350,590 Q110,590 110,350 L350,350" fill="none" stroke-width="2.5"/>' +
                  '<path class="p06-inflow-arrow" d="M148,148 L316,316" fill="none" stroke-width="2"/>' +
                  '<text class="p06-inflow-label" x="34" y="104" text-anchor="start">VERBAL +</text>' +
                  '<text class="p06-inflow-label" x="34" y="124" text-anchor="start">REAL-WORLD CORRECTION</text>' +
                '</g>' +

              '</svg>' +
            '</div>' +
          '</div>' +

        '</div>' +

        '<hr class="rule p06-rule">' +

        '<div class="p06-footer">' +
          Shared.carry({
            step: 3,
            punchHtml: 'teach it to fish &mdash; every correction improves the platform',
            lineHtml: ''
          }) +
        '</div>' +

      '</div>' +

      '<div class="p06-locator">' +
        Shared.locatorMap('autonomy', { variant: 'mini' }) +
      '</div>';
  }

  function onStep(el, i, o) {
    if (i === 1) {
      var arcs = el.querySelectorAll('.p06-arc-1, .p06-arc-2');
      Anim.drawPath(arcs, { duration: Anim.dur(o, 800), stagger: Anim.dur(o, 180) });
    }

    if (i === 3) {
      var closeArc = el.querySelector('.p06-arc-close');
      Anim.drawPath(closeArc, { duration: Anim.dur(o, 700) });

      var inflowArrow = el.querySelector('.p06-inflow-arrow');
      Anim.drawPath(inflowArrow, { delay: Anim.dur(o, 250), duration: Anim.dur(o, 550) });

      var inflowLabel = el.querySelectorAll('.p06-inflow-label');
      Anim.fadeUp(inflowLabel, { delay: Anim.dur(o, 550), stagger: Anim.dur(o, 70) });

      var punch = el.querySelector('.carry-punch');
      Anim.fadeUp(punch, { delay: Anim.dur(o, 300), duration: Anim.dur(o, 600) });
    }
  }

  page({
    id: '06-autonomy',
    title: 'Autonomy',
    theme: 'light',
    steps: 3,
    render: render,
    onStep: onStep
  });
})();
