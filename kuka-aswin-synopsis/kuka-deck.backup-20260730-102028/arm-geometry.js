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
})();
