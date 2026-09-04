/* ==========================================================================
   _shared.js — components used by more than one page (GLOBAL §9).

   locatorMap(activeKey, opts) — the page-01 thesis schematic. Built once here
   so every act/bucket page that shows a "you-are-here" locator (05–09, 18,
   19) cannot drift from page 01's geometry.
   tierChip(level)  — the NEAR-TERM / BUILDING / ASPIRATIONAL mono chip.
   kicker(text)     — the mono eyebrow label.
   carry(opts)      — the bottom carried-thought line (punch + positioning line).
   ========================================================================== */

window.Shared = (function () {
  'use strict';

  /* --- locatorMap -----------------------------------------------------------
     activeKey ∈ {model, embodiment, adaptation, autonomy, assurance, composer,
     superhuman} | null. `opts.variant`: 'hero' (page 01, full-size, nothing
     dimmed — activeKey is ignored) or 'mini' (small corner badge on later
     pages — every group dims to .3 opacity except activeKey, via CSS
     .locator--mini in styles.css).

     `opts.steps` optionally gates parts of the map behind the engine's step
     system, for page 01's build-on-reveal: { cables, capLabels, keystone,
     keystoneLabel, superhuman, realworld } → step numbers. Omit for a plain,
     always-visible mini locator (05–09, 18, 19 don't stage the map itself).
     Every gated part gets data-motion="none" — its motion is driven
     explicitly by the page's onStep via Anim.*, not the default CSS fade.
     ------------------------------------------------------------------------- */

  function locatorMap(activeKey, opts) {
    opts = opts || {};
    var variant = opts.variant === 'mini' ? 'mini' : 'hero';
    var st = opts.steps || {};
    var idp = opts.idPrefix || 'lm';

    function grp(key, inner, extra) {
      var active = variant === 'mini' && key === activeKey;
      return '<g class="lm-group' + (active ? ' is-active' : '') + '"' +
             (key ? ' data-key="' + key + '"' : '') +
             (extra || '') + '>' + inner + '</g>';
    }

    // step-gated wrapper: adds class="step" data-step + data-motion="none".
    // `extraClass`, if given, always applies (gated or not) so a page can
    // select this part directly (e.g. Shared.locatorMap's consumer querying
    // '.lm-keystone-shape') regardless of whether steps are in use.
    function step(n, inner, extraClass) {
      var base = extraClass ? extraClass : '';
      if (!n) return '<g class="' + base + '">' + inner + '</g>';
      var cls = (base ? base + ' ' : '') + 'step';
      return '<g class="' + cls + '" data-step="' + n + '" data-motion="none">' + inner + '</g>';
    }

    var world = function (side, x, hx, label, sub, nodes, color) {
      var anchorX = x, hubX = hx, labelAnchor = side === 'left' ? 'end' : 'start';
      var labelX = side === 'left' ? x - 18 : x + 18;
      var dotXs = side === 'left' ? [414, 420, 406] : [1506, 1500, 1514];
      var dotYs = [474, 524, 566];
      var nodesMarkup = nodes.map(function (n, i) {
        var y = 452 + i * 45;
        return '<circle cx="' + x + '" cy="' + y + '" r="4.5" fill="' + color + '"/>' +
               '<text class="lm-lbl" x="' + labelX + '" y="' + (y + 6) + '" text-anchor="' + labelAnchor + '">' + n + '</text>';
      }).join('');
      var faint = dotXs.map(function (dx, i) {
        return '<circle cx="' + dx + '" cy="' + dotYs[i] + '" r="2.6"/>';
      }).join('');
      return '' +
        '<text class="lm-anchor" x="' + anchorX + '" y="384" text-anchor="middle" font-size="23" fill="' + color + '">' + label + '</text>' +
        '<text class="lm-anchorsub" x="' + anchorX + '" y="410" text-anchor="middle">' + sub + '</text>' +
        '<g font-size="19">' +
          '<circle cx="' + hubX + '" cy="520" r="8" fill="' + color + '"/>' +
          nodesMarkup +
          '<g fill="' + color + '" opacity=".38">' + faint + '</g>' +
        '</g>';
    };

    var modelGroup = grp('model', world('left', 362, 470, 'THE MODEL WORLD', 'frontier &amp; open &middot; commoditizing',
      ['Frontier LLMs', 'World models', 'VLAs', 'Open-weight'], 'var(--accent-b)'));

    var embodimentGroup = grp('embodiment', world('right', 1558, 1450, 'THE EMBODIMENT WORLD', 'proliferating &middot; many bodies',
      ['Humanoids', 'Arms &amp; cobots', 'AMRs', 'Legged &amp; drones'], 'var(--accent-a)'));

    // three cables + three labels each get their own data-key group so a
    // mini locator can highlight exactly one capability.
    var cablesAndLabels =
      grp('adaptation', step(st.cables, '<path class="lm-cable" d="M470,520 Q960,398 1450,520" stroke-width="2"/>') +
        step(st.capLabels, '<text class="lm-caplbl" x="720" y="452" text-anchor="middle">Adaptation</text>')) +
      grp('autonomy', step(st.cables, '<path class="lm-cable" d="M470,520 Q960,520 1450,520" stroke-width="2.5"/>') +
        step(st.capLabels, '<text class="lm-caplbl" x="720" y="508" text-anchor="middle">Autonomy</text>')) +
      grp('assurance', step(st.cables, '<path class="lm-cable" d="M470,520 Q960,620 1450,520" stroke-width="2"/>') +
        step(st.capLabels, '<text class="lm-caplbl" x="720" y="586" text-anchor="middle">Assurance</text>'));

    var keystoneShape = grp('composer',
      step(st.keystone,
        '<rect x="937" y="497" width="46" height="46" rx="5" transform="rotate(45 960 520)" fill="var(--panel)" stroke="var(--ink)" stroke-width="2.5"/>' +
        '<circle cx="960" cy="520" r="6" fill="var(--ink)"/>',
        'lm-keystone-shape'
      ) +
      step(st.keystoneLabel,
        '<text class="lm-keyttl" x="960" y="608" text-anchor="middle">THE COMPOSER</text>' +
        '<text class="lm-keysub" x="960" y="632" text-anchor="middle">requirement &middot; budget &middot; application &rarr; tailored stack</text>' +
        '<path d="M960,648 l0,18 M952,658 l8,8 l8,-8" fill="none" stroke="var(--fg2)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
        'lm-keystone-label'
      )
    );

    var superhumanGroup = grp('superhuman', step(st.superhuman,
      '<text class="lm-super" x="960" y="330" text-anchor="middle">Superhuman</text>' +
      '<text class="lm-supersub" x="960" y="356" text-anchor="middle">the bonus that falls out</text>' +
      '<path d="M960,372 l0,18" stroke="var(--fg)" stroke-width="1.5"/>',
      'lm-superhuman-grp'
    ));

    var realworldGroup = grp(null, step(st.realworld,
      '<text class="lm-rw" x="960" y="700" text-anchor="middle">Real-world application</text>',
      'lm-realworld-grp'
    ));

    return '' +
      '<svg class="locator locator--' + variant + '" id="' + idp + '" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet" aria-label="Thesis map">' +
        modelGroup +
        embodimentGroup +
        cablesAndLabels +
        keystoneShape +
        superhumanGroup +
        realworldGroup +
      '</svg>';
  }

  /* --- tierChip -------------------------------------------------------------
     level ∈ 'near' | 'building' | 'aspirational' (GLOBAL §4.1). */
  function tierChip(level) {
    var map = {
      near:          { cls: 'tier-chip--near',          label: 'NEAR-TERM' },
      building:      { cls: 'tier-chip--building',       label: 'BUILDING' },
      aspirational:  { cls: 'tier-chip--aspirational',  label: 'ASPIRATIONAL' }
    };
    var d = map[level] || map.near;
    return '<span class="tier-chip ' + d.cls + '">' + d.label + '</span>';
  }

  /* --- kicker ----------------------------------------------------------------
     text — plain string or HTML fragment (e.g. an interpunct-separated line). */
  function kicker(text, className) {
    return '<div class="kicker' + (className ? ' ' + className : '') + '">' + text + '</div>';
  }

  /* --- carry -------------------------------------------------------------
     The bottom carried-thought line: an Archivo punch statement, optionally
     over a second mono positioning line. opts.punchHtml / opts.lineHtml may
     contain inline tags (page code owns exact copy, per CLAUDE.md). Omit
     opts.lineHtml (or pass '') for a single-line carry — the second <p> is
     skipped entirely rather than rendered empty. opts.step, if given, gates
     the line(s) behind the engine's step system with data-motion="none" —
     the page's onStep drives the actual fadeUp via Anim.fadeUp. */
  function carry(opts) {
    opts = opts || {};
    var stepAttr = opts.step ? ' class="carry-punch step" data-step="' + opts.step + '" data-motion="none"' : ' class="carry-punch"';
    var stepAttr2 = opts.step ? ' class="carry-line mono step" data-step="' + opts.step + '" data-motion="none"' : ' class="carry-line mono"';
    return '' +
      '<div class="carry">' +
        '<p' + stepAttr + '>' + opts.punchHtml + '</p>' +
        (opts.lineHtml ? '<p' + stepAttr2 + '>' + opts.lineHtml + '</p>' : '') +
      '</div>';
  }

  return { locatorMap: locatorMap, tierChip: tierChip, kicker: kicker, carry: carry };
})();
