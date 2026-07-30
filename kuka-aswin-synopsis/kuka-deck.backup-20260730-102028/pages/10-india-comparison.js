/**
 * pages/10-india-comparison.js — Screen 10 · The three-way comparison
 * (light, ACT III). tasks/10-india-comparison.md. The rigor screen.
 *
 * A five-row matrix, no chart — the task file explicitly rules out a bar
 * chart of headcounts, since the numbers are already stark and a chart would
 * tip the screen from analysis into advocacy.
 *
 * Two elements carry the screen's credibility and must not be simplified:
 * the ABB headcount's `estimate — derived` chip plus its `ᵉ` superscript,
 * and the method footnote that shows the derivation. Disclosing the working
 * on the softest number, on the screen designed to demonstrate rigor, is the
 * most credible thing on the page.
 *
 * The KUKA column is styled as the SUBJECT (grey wash + orange column rule),
 * never as the loser — no red, no negative iconography.
 */
(function () {
  const ROWS = window.DeckData.INDIA_COMPARISON;
  const METHOD = window.DeckData.ABB_HEADCOUNT_METHOD;

  let controllers = [];
  let timers = [];
  let isReduced = false;
  let revealedThrough = 0;

  function schedule(fn, delay) { timers.push(setTimeout(fn, delay)); }
  function clearAll() {
    controllers.forEach((c) => c.cancel());
    controllers = [];
    timers.forEach((t) => clearTimeout(t));
    timers = [];
  }

  // Split a display value into a leading number and the rest, so a range
  // ("350–500", "₹200–300 cr") can count its lower bound and then reveal the
  // remainder — per the task file, legibility wins over effect, so anything
  // without a clean leading number just renders statically.
  function splitFigure(value) {
    const m = String(value).match(/^([^0-9]*)([0-9][0-9,]*)(.*)$/);
    if (!m) return null;
    return { lead: m[1], num: Number(m[2].replace(/,/g, "")), tail: m[3] };
  }

  // The reveal animates `.cmp-cell-inner`, never the grid cell itself, so the
  // KUKA column's background wash stays visible in the base state.
  function figureCell(fig, colId, rowKey) {
    const sup = fig.derived ? `<sup class="cmp-sup">ᵉ</sup>` : "";
    return `
      <div class="cmp-cell cmp-cell--figure ${colId === "kuka" ? "is-kuka" : ""}" data-row="${rowKey}" data-col="${colId}">
        <div class="cmp-cell-inner">
          <p class="cmp-figure num"><span class="cmp-fig-text" data-fig="${rowKey}-${colId}">${fig.prefix || ""}</span>${sup}</p>
          <p class="chip chip--${fig.tier}">${fig.chip}</p>
        </div>
      </div>`;
  }

  function textCell(text, colId, rowKey, extra) {
    return `
      <div class="cmp-cell ${colId === "kuka" ? "is-kuka" : ""}" data-row="${rowKey}" data-col="${colId}">
        <div class="cmp-cell-inner">
          <p class="cmp-cell-text">${text}</p>
          ${extra || ""}
        </div>
      </div>`;
  }

  function render() {
    const headers = ROWS.map(
      (r) => `<div class="cmp-head ${r.id === "kuka" ? "is-kuka" : ""}">${r.label}</div>`
    ).join("");

    const peopleCells = ROWS.map((r) => figureCell(r.people, r.id, "people")).join("");
    const revenueCells = ROWS.map((r) => figureCell(r.revenue, r.id, "revenue")).join("");
    const hubCells = ROWS.map((r) => textCell(r.hubs, r.id, "hubs")).join("");
    const compCells = ROWS.map((r) => textCell(r.composition, r.id, "composition")).join("");
    const postureCells = ROWS.map((r) =>
      textCell(
        r.posture,
        r.id,
        "posture",
        r.parenthetical ? `<p class="cmp-parenthetical" data-col="${r.id}">${r.parenthetical}</p>` : ""
      )
    ).join("");

    return `
      <section class="screen screen--comparison">
        <div class="cmp-header">
          <p class="kicker">THE COMPARISON</p>
          <h1 class="display-2">Three bets about what an India organisation is for.</h1>
        </div>

        <div class="cmp-matrix">
          <div class="cmp-head cmp-head--corner"></div>
          ${headers}

          <div class="cmp-rowlabel">PEOPLE</div>
          ${peopleCells}

          <div class="cmp-rowlabel">REVENUE</div>
          ${revenueCells}

          <div class="cmp-rowlabel">HUBS</div>
          ${hubCells}

          <div class="cmp-rowlabel">COMPOSITION</div>
          ${compCells}

          <div class="cmp-rowlabel">POSTURE</div>
          ${postureCells}
        </div>

        <div class="cmp-insight">
          <p class="cmp-insight-line cmp-insight-line--lead">Per head, KUKA India generates more revenue than ABB Robotics India.</p>
          <p class="cmp-insight-line">That is what a well-run trading operation looks like.</p>
          <p class="cmp-insight-line">It sells efficiently, and it builds nothing.</p>
        </div>

        <p class="cmp-method">${METHOD}</p>
      </section>
    `;
  }

  function revealFigureRow(root, rowKey) {
    ROWS.forEach((r) => {
      const fig = r[rowKey];
      const cell = root.querySelector(`.cmp-cell[data-row="${rowKey}"][data-col="${r.id}"]`);
      cell.classList.add("is-visible");
      const el = root.querySelector(`.cmp-fig-text[data-fig="${rowKey}-${r.id}"]`);
      const parts = splitFigure(fig.value);
      const prefix = fig.prefix || "";
      if (!parts || isReduced) {
        el.textContent = prefix + fig.value;
        return;
      }
      controllers.push(
        window.Anim.countUp(el, {
          from: 0,
          to: parts.num,
          duration: 900,
          format: (n) => prefix + parts.lead + Math.round(n).toLocaleString("en-US"),
          reduced: false,
        })
      );
      // reveal the upper bound / unit only once the count has landed
      schedule(() => { el.textContent = prefix + fig.value; }, 920);
    });
  }

  function revealTextRow(root, rowKey, stagger) {
    ROWS.forEach((r, i) => {
      const cell = root.querySelector(`.cmp-cell[data-row="${rowKey}"][data-col="${r.id}"]`);
      if (isReduced || !stagger) cell.classList.add("is-visible");
      else schedule(() => cell.classList.add("is-visible"), i * stagger);
    });
  }

  function revealStep(root, n) {
    if (n === 1) revealFigureRow(root, "people");
    if (n === 2) revealFigureRow(root, "revenue");
    if (n === 3) revealTextRow(root, "hubs", 0);
    if (n === 4) revealTextRow(root, "composition", 140);
    if (n === 5) {
      revealTextRow(root, "posture", 0);
      const paren = root.querySelector(".cmp-parenthetical");
      if (isReduced) paren.classList.add("is-visible");
      else schedule(() => paren.classList.add("is-visible"), 250);
    }
    if (n === 6) {
      root.querySelectorAll(".cmp-insight-line").forEach((l) => {
        controllers.push(window.Anim.fadeUp(l, { reduced: isReduced }));
      });
    }
    if (n === 7) {
      controllers.push(window.Anim.fadeUp(root.querySelector(".cmp-method"), { reduced: isReduced }));
    }
  }

  function hideStep(root, n) {
    const rowFor = { 1: "people", 2: "revenue", 3: "hubs", 4: "composition", 5: "posture" };
    if (rowFor[n]) {
      root.querySelectorAll(`.cmp-cell[data-row="${rowFor[n]}"]`).forEach((c) => c.classList.remove("is-visible"));
      if (n <= 2) {
        ROWS.forEach((r) => {
          const el = root.querySelector(`.cmp-fig-text[data-fig="${rowFor[n]}-${r.id}"]`);
          if (el) el.textContent = r[rowFor[n]].prefix || "";
        });
      }
      if (n === 5) root.querySelector(".cmp-parenthetical").classList.remove("is-visible");
    }
    if (n === 6) root.querySelectorAll(".cmp-insight-line").forEach((l) => l.classList.remove("is-visible"));
    if (n === 7) root.querySelector(".cmp-method").classList.remove("is-visible");
  }

  window.page({
    id: "10-india-comparison",
    title: "Three bets about what an India organisation is for.",
    theme: "light",
    steps: 7,
    render,
    onEnter: (root, ctx) => {
      clearAll();
      isReduced = ctx.isReduced;
      revealedThrough = 0;
    },
    onStep: (root, step) => {
      if (step > revealedThrough) {
        for (let s = revealedThrough + 1; s <= step; s++) revealStep(root, s);
      } else if (step < revealedThrough) {
        for (let s = revealedThrough; s > step; s--) hideStep(root, s);
      }
      revealedThrough = step;
    },
    onLeave: () => {
      clearAll();
    },
  });
})();
