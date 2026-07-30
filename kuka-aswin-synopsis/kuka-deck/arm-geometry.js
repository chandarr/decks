/**
 * arm-geometry.js — the single source of truth for the arm motif shared by
 * screen 01 (cover) and screen 16 (proposition close).
 *
 * Screen 16 is the visual callback that closes the deck — it must resolve to
 * the SAME final joint angles and the SAME trajectory. Read from here; do not
 * re-derive or duplicate these numbers on screen 16.
 *
 * Coordinate convention: each link is drawn along its own local +x axis,
 * nested inside its parent joint's group. A joint's `rest`/`final` angle is
 * the LOCAL rotation of that link relative to its already-rotated parent
 * frame (standard chained-linkage construction) — not a world angle. In SVG
 * +y points down, so negative angles sweep upward on screen.
 */
(function () {
  window.ArmGeometry = {
    // Cropped tight to the arm + trajectory so there is no dead space inside
    // the SVG — the motif fills the left column instead of floating in it.
    // Aspect (1.05) is matched to that column at 1920x1080 and 1440x900.
    viewBox: "40 95 780 740",

    // where the base plinth sits, and the pivot the whole chain hangs from.
    pivot: { x: 180, y: 780 },

    // link lengths, in the SVG's local user-space units. The base column is
    // long so the arm reads as tall — a squat arm cannot fill this column.
    links: {
      base: 250,
      shoulder: 250,
      elbow: 200,
      wrist: 105,
    },

    // Half-widths of each link's translucent housing at its proximal (w0) and
    // distal (w1) end, in the same units as `links`. Each link's w1 matches the
    // next link's w0, so the chain reads as one continuous casting rather than
    // four unrelated slabs. `base.w0` is deliberately modest: at the folded
    // rest angle the base housing's trailing corner swings down toward the
    // plinth, and widening it makes the corner hang below the plinth edge.
    // `len` overrides links[name] for the housing only, where the housing must
    // stop short of the link's tip: the wrist's ends at the gripper's tool
    // flange, so the casting does not run on through the open jaws to the
    // end-effector. The lit spine still runs the full length to the tip.
    body: {
      base: { w0: 40, w1: 34 },
      shoulder: { w0: 34, w1: 24 },
      elbow: { w0: 24, w1: 17 },
      wrist: { w0: 17, w1: 11, len: 81 },
    },

    // Nominal edge weights in user units, correct as-is for a screen that draws
    // the arm unscaled (screen 01). A screen that draws it inside a scaled
    // group divides these back out so the arm keeps the same apparent weight at
    // any size — see screen 16. They must be emitted as attributes, never set
    // in CSS: a stylesheet rule beats a presentation attribute, so a CSS
    // stroke-width would silently defeat that compensation.
    weights: { link: 3.5, edge: 1.2 },

    // rest = folded/powered-down, final = extended and resolved. Order matches
    // the power-up sequence: base -> shoulder -> elbow -> wrist.
    //
    // Angular travel escalates along the chain (24deg, 72deg, 128deg, 162deg)
    // so each successive joint reads as a bigger move than the last — the
    // power-up builds instead of flattening out. Changing one of these without
    // recomputing `endEffector` and `trajectory.start` below will detach the
    // trajectory from the end-effector.
    joints: {
      base: { rest: -114, final: -90 },
      shoulder: { rest: 112, final: 40 },
      elbow: { rest: 153, final: 25 },
      wrist: { rest: -152, final: 10 },
    },

    // end-effector at the final pose, in the same space as `pivot` (i.e. the
    // pivot offset is already folded in). Derived from the link lengths and
    // final angles above; this is where the trajectory starts.
    endEffector: { x: 623, y: 227 },

    // a single cubic from the end-effector, sweeping right and bending up only
    // in the final third — an inflection, not a hook. Fixed constants so
    // screens 01 and 16 draw the identical stroke.
    trajectory: {
      start: { x: 623, y: 227 },
      c1: { x: 680, y: 228 },
      c2: { x: 730, y: 205 },
      end: { x: 782, y: 128 },
    },

    // Base-sequence choreography, shared so the close on 16 keeps the same
    // cadence as the cover. All values in ms, absolute from sequence start.
    // Deliberately slower than a UI transition — this is the opening moment
    // and each joint has to be individually legible.
    sequence: {
      plinthDuration: 620, // base plate energises before anything moves
      jointsStartAt: 380,
      jointDuration: 950, // per joint
      jointStagger: 520, // gap between successive joints starting
      drawStartAt: 3360, // after the last joint settles, plus a beat
      drawDuration: 1700,
      titleAt: 4710, // overlaps the last ~350ms of the draw
      total: 5100,
    },
  };

  // --- housing outlines ------------------------------------------------
  //
  // Shape only — these return path/points geometry in each link's own local
  // frame (its joint at 0,0, its tip at links[name],0). Classes, fills and
  // stroke weights stay with the screen that draws them, but the silhouette
  // lives here so the cover and the close cannot drift into different robots.

  const G = window.ArmGeometry;

  // A tapered, chamfered housing: the volume the lit spine sits inside. It
  // reaches `back` behind its own joint so consecutive links overlap at the
  // pivot instead of butting; on the base link that overlap is what seats the
  // arm into the plinth. Keep the factor low — see the note on body.base.w0.
  G.linkBodyPath = function (name) {
    const { w0, w1 } = G.body[name];
    const len = G.body[name].len || G.links[name];
    const back = w0 * 0.28;
    const cham = Math.min(w1 * 1.8, len * 0.24); // taper into the next joint
    const nose = w1 * 0.5;
    return [
      `M ${-back} ${-w0 * 0.72}`,
      `L ${-back * 0.3} ${-w0}`,
      `L ${len - cham} ${-w1}`,
      `L ${len} ${-nose}`,
      `L ${len} ${nose}`,
      `L ${len - cham} ${w1}`,
      `L ${-back * 0.3} ${w0}`,
      `L ${-back} ${w0 * 0.72}`,
      "Z",
    ].join(" ");
  };

  // Rotary hub at the pivot, sized off the housing so the joints stay legible
  // against the link during the power-up.
  G.hubRadius = function (name) {
    return +(G.body[name].w0 * 0.82).toFixed(1);
  };

  // Tool flange, gripper body and two tapered jaws, in the wrist's local frame.
  // The jaws close around links.wrist,0 — the end-effector the trajectory
  // starts from — so the stroke reads as leaving the grasp point rather than
  // the housing. Returns one `points` string per polygon.
  G.gripperParts = function () {
    const len = G.links.wrist;
    const jaw = (s) =>
      `${len - 12},${s * 15.5} ${len + 8},${s * 11} ${len + 8},${s * 7} ${len - 12},${s * 10.5}`;
    return [
      `${len - 30},-15 ${len - 24},-15 ${len - 24},15 ${len - 30},15`,
      `${len - 24},-12.5 ${len - 14},-12.5 ${len - 12},-9 ${len - 12},9 ${len - 14},12.5 ${len - 24},12.5`,
      jaw(-1),
      jaw(1),
    ];
  };
})();
