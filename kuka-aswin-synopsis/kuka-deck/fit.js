/* fit.js — map the fixed design canvas onto whatever window the deck is opened in.
 *
 * Every screen lays out on an immutable 1600x900 canvas, so the composition a
 * presenter checks is byte-for-byte the composition an audience sees. This file
 * is the only place that knows about the real viewport: it computes a uniform
 * scale and letterboxes the remainder.
 *
 * Uniform scale (never separate x/y) is the whole point — it keeps every angle,
 * circle and aspect ratio in the hand-built SVGs exactly as designed.
 */
(function () {
  var DESIGN_W = 1600;
  var DESIGN_H = 900;

  function fit() {
    var scale = Math.min(window.innerWidth / DESIGN_W, window.innerHeight / DESIGN_H);
    document.documentElement.style.setProperty("--fit", String(scale));
  }

  fit();
  window.addEventListener("resize", fit);
  window.addEventListener("orientationchange", fit);
  document.addEventListener("DOMContentLoaded", fit);

  window.DeckFit = { DESIGN_W: DESIGN_W, DESIGN_H: DESIGN_H, fit: fit };
})();
