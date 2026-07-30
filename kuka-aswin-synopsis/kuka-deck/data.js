/**
 * data.js — every figure that appears on any screen, as a named constant.
 *
 * Shape:  { value, tier, source }
 *   tier:   "confirmed" | "estimate" | "frontier"
 *   source: named source string, shown inline on the evidence chip
 *
 * This is the single place numbers live. Markup never hardcodes a figure —
 * it reads a constant from here so pending-verification numbers (see
 * VERIFY-BEFORE-SENDING.md) can be swapped without touching layout.
 *
 * Real constants are added screen-by-screen as task files land (BUILD-ORDER.md
 * says start with the constants named in tasks 04, 11 and 12 — screen 01 needs
 * none, per its task file. Those later task files don't exist yet, so this
 * file currently holds only the Stage 0 placeholder used by the throwaway
 * stub screens).
 */
window.DeckData = {
  STUB_DEMO_FIGURE: {
    value: 42,
    tier: "estimate",
    source: "Stage 0 placeholder — not a deck figure, remove with the stub screens",
  },

  // ---- the four acts — screen 02 and the act dividers ---------------------

  // One entry per act, in narrative order. `label` and `beat` are the same
  // four column labels and beat lines screen 02 draws under its trajectory;
  // both that screen and the act dividers read them from here so the roadmap
  // and the dividers can never drift apart. `title` is the act name from
  // 02-NARRATIVE-SPINE.md.
  ACTS: [
    {
      id: "act-1",
      numeral: "I",
      label: "ACT I",
      title: "The global trajectory",
      beat: "The market is inflecting",
    },
    {
      id: "act-2",
      numeral: "II",
      label: "ACT II",
      title: "Where KUKA sits",
      beat: "KUKA is well-placed and under-armed",
    },
    {
      id: "act-3",
      numeral: "III",
      label: "ACT III",
      title: "The state of KUKA India",
      beat: "India is where that gap is widest",
    },
    {
      id: "act-4",
      numeral: "IV",
      label: "ACT IV",
      title: "The proposition",
      beat: "And where the fix compounds globally",
    },
  ],

  // ---- screen 03 — the inflection --------------------------------------

  MILESTONES: [
    { label: "RT-1", year: 2022, org: "Google", tier: "confirmed" },
    { label: "RT-2", year: 2023, org: "Google DeepMind", tier: "confirmed" },
    { label: "OpenVLA", year: 2024, org: "Stanford / UC Berkeley", tier: "confirmed" },
    { label: "π-series", year: 2024, org: "Physical Intelligence", tier: "confirmed" },
    { label: "GR00T N", year: 2025, org: "NVIDIA", tier: "confirmed" },
  ],
  THRESHOLD_CROSSING_PROJECTED: { value: "2027–28", tier: "frontier" },
  LLM_PRECEDENT: { tier: "frontier", note: "analogy, not evidence" },
  // Shared with screen 04's fourth sub-box — the same claim, one constant, so
  // the two screens can never state it differently. `value` is the figure the
  // sub-box renders; it is never counted up.
  NO_CERTIFIED_VLA: { value: 0, tier: "confirmed" },

  // ---- screen 04 — the signals ------------------------------------------

  ABB_SOFTBANK: {
    value: 5.375,
    unit: "$B",
    tier: "confirmed",
    source: "Deal announced October 2025",
  },
  CHINA_DOMESTIC_SHARE: {
    value: 57,
    unit: "%",
    tier: "confirmed",
    source: "IFR World Robotics 2025",
    note: "MIR Databank gives ~51.6% for 2024 — reconcile before sending",
  },
  ROBOTICS_VC_2025: {
    value: 27.6,
    unit: "$B",
    tier: "estimate",
    source: "PitchBook",
    note: "Crunchbase ~$15B, CB Insights up to $40.7B — label as estimate",
  },
  INDIA_UNITS_2024: {
    value: 9100,
    unit: "units",
    tier: "confirmed",
    source: "IFR World Robotics 2025",
  },
  INDIA_GROWTH_2024: {
    value: 7,
    unit: "%",
    tier: "confirmed",
    source: "IFR World Robotics 2025",
  },
  INDIA_RANK_2024: {
    value: 6,
    unit: "th worldwide",
    tier: "confirmed",
    source: "IFR World Robotics 2025",
  },

  // The four evidence sub-boxes: capital priced at the brain twice (models
  // alone, then embodied), discounted at the body, and the line nobody has
  // crossed. Order is the argument — see tasks/04-signals.md.
  PUREPLAY_SOFTWARE: {
    companies: ["Physical Intelligence", "Skild AI"],
    value: "$B valuations",
    tier: "estimate",
    source: "reported private rounds",
    note:
      "VERIFY before sending — do NOT state a specific figure or a combined total for these two; private valuations move fast and aggregating them invites a correction. The claim is the order of magnitude and the absence of hardware, not the number.",
  },
  FIGURE_VALUATION: {
    value: 39,
    unit: "$B",
    tier: "estimate",
    source: "reported valuation, mid-2025",
  },
  INCUMBENT_EBIT: {
    low: 1,
    high: 5,
    unit: "%",
    tier: "confirmed",
    source: "company annual reports",
  },

  // ---- screen 05 — what changes ------------------------------------------

  KUKA_STACK: [
    {
      work: "fine-tune on KUKA's own robot models",
      asset: "LBR · KR platform",
      held: true,
      tier: "confirmed",
    },
    {
      work: "contact and force sensor data",
      asset: "DLR-derived torque sensing",
      held: true,
      tier: "confirmed",
    },
    {
      work: "real deployment data at scale",
      asset: null,
      held: false,
      tier: "confirmed",
      note: "the gap — Acts III and IV exist to close this",
    },
    {
      work: "safety, certified, with added sensing",
      asset: "medical-grade certification",
      held: true,
      tier: "confirmed",
    },
    {
      work: "an interface that abstracts all of it",
      asset: "iiQKA.OS",
      held: true,
      tier: "confirmed",
    },
  ],

  // ---- screen 06 — the competitive map -----------------------------------

  // `vec` is a direction in plot space (x right, y up), normalised at render
  // time — only the ratio matters, not the magnitude. Every vector points
  // up-and-right, and each one is angled so its ray enters the upper-right
  // convergence region drawn at step 7. The steeper values on the two
  // lower-right clusters are what that requires: they sit under the region,
  // so a 45° arrow would pass to the right of it rather than into it.
  CLUSTERS: [
    {
      id: "traditional",
      label: "TRADITIONAL LEADERS",
      panelTitle: "TRADITIONAL LEADERS",
      pos: [0.28, 0.8],
      vec: [1, 0.22],
      len: 0.16,
      members: ["ABB", "FANUC", "Yaskawa", "Kawasaki", "Comau", "Stäubli", "Nachi", "Mitsubishi Electric", "Universal Robots"],
      relevance:
        "Decades of certified deployment and installed base. All are now buying software velocity rather than building it — ABB by sale, FANUC by alliance. Their hardware advantage is real and their software gap is the same one KUKA has.",
      tier: "confirmed",
    },
    {
      id: "chinese-oems",
      label: "CHINESE OEMs",
      panelTitle: "CHINESE INDUSTRIAL OEMs",
      pos: [0.42, 0.55],
      vec: [1, 1],
      len: 0.15,
      members: ["Estun", "Inovance", "Siasun", "Efort", "STEP"],
      relevance:
        "Cost position established and majority share of their home market taken. The vector now points up — buying quality and certification, not just price. They compete on the same axis KUKA is strongest on, from below.",
      tier: "confirmed",
    },
    {
      id: "modern-mfg",
      label: "MODERN MFG STARTUPS",
      panelTitle: "MODERN MANUFACTURING STARTUPS",
      pos: [0.3, 0.4],
      vec: [1, 1],
      len: 0.14,
      members: ["Addverb", "Ati Motors", "GreyOrange", "Rapyuta Robotics", "Unbox Robotics", "Peer Robotics", "Formic"],
      relevance:
        "Software-first, deployment-fast, capital-light. Strong in AMR, warehouse and flexible cells. Several are Indian and several are already NVIDIA Isaac-native — partners as easily as competitors.",
      tier: "confirmed",
    },
    {
      id: "humanoids",
      label: "HUMANOIDS",
      panelTitle: "HUMANOID COMPANIES",
      pos: [0.62, 0.22],
      vec: [1, 1.3],
      len: 0.18,
      members: ["Figure", "Agility Robotics", "Apptronik", "Tesla Optimus", "Unitree", "UBTech", "Fourier", "AgiBot", "Svaya Robotics"],
      relevance:
        "Enormously capitalised, building brain and body simultaneously. Consuming the actuator, reducer and certification supply chain KUKA and its parent already understand. The threat is talent and capital, not current industrial capability.",
      tier: "confirmed",
    },
    {
      id: "physical-ai-software",
      label: "PHYSICAL-AI SOFTWARE",
      panelTitle: "PHYSICAL-AI SOFTWARE",
      pos: [0.8, 0.15],
      vec: [1, 1.9],
      len: 0.2,
      members: ["Physical Intelligence", "Skild AI", "NVIDIA (Isaac · GR00T)", "Google Intrinsic", "CynLr"],
      relevance:
        "Building the base models that will commoditise. They hold the brain and lack the certified body, the safety case and the deployment data. This is the cluster to partner with, not to race.",
      tier: "confirmed",
    },
  ],
  KUKA_MARKER: {
    pos: [0.34, 0.86],
    vec: [1, 0.22],
    len: 0.06,
    relevance:
      "Best position on the board — sensitive robotics, certified safety, an installed base, and an operating system already rewritten as a modular open platform. And the shortest arrow on the board.",
    tier: "confirmed",
  },

  // ---- screen 08 — the four corners --------------------------------------

  // Quadrant positions are fixed by the layout: scale = top-left,
  // development = top-right, precision = bottom-left, deployment =
  // bottom-right. The spanning shapes on screen 08 are derived from the
  // `holds` / `claims` ids below, so changing a corner's cell here would
  // move every shape with it.
  CORNERS: [
    {
      id: "scale",
      cell: "tl",
      label: "MANUFACTURING SCALE & COST",
      desc: "Midea · component supply chain · production economics",
    },
    {
      id: "development",
      cell: "tr",
      label: "DEVELOPMENT COST, DEPLOYMENT DIVERSITY + DATA SOVEREIGNTY",
      desc: "Engineering talent at a fraction of Western cost · application diversity and complexity · data availability",
    },
    {
      id: "precision",
      cell: "bl",
      label: "PRECISION, CERTIFICATION & SAFETY",
      desc: "LBR · DLR lineage · medical-grade certification",
    },
    {
      id: "deployment",
      cell: "br",
      label: "PROVEN DEPLOYMENT AT INDUSTRIAL RELIABILITY",
      desc: "Installed base · integration expertise · customer trust",
    },
  ],

  // `holds` renders as a solid span; `claims` renders dashed. The split on
  // the KUKA entry is the screen's payload — do not flatten the two into a
  // single list, and do not promote `claims` to `holds`.
  HOLDERS: [
    {
      id: "chinese",
      label: "Chinese industrial OEMs",
      gap: "Scale and cost. Not certification depth or Western trust.",
      holds: ["scale"],
      tier: "confirmed",
    },
    {
      id: "traditional",
      label: "Traditional leaders",
      gap: "Precision and deployment. No comparable cost base.",
      holds: ["precision", "deployment"],
      tier: "confirmed",
    },
    {
      id: "humanoid",
      label: "Humanoid companies",
      gap: "Capital and talent. No certified body, no installed base.",
      holds: ["development"],
      tier: "confirmed",
    },
    {
      id: "physicalai",
      label: "Physical-AI software",
      gap: "The models. Not the body, the safety case, or the data.",
      holds: ["development"],
      tier: "confirmed",
    },
    {
      id: "kuka",
      label: "KUKA",
      gap: "All four are reachable. One is not yet built.",
      holds: ["scale", "precision", "deployment"],
      claims: ["development"],
      tier: "confirmed",
    },
  ],

  // ---- screen 09 — the paradox -------------------------------------------
  // (INDIA_UNITS_2024 / INDIA_GROWTH_2024 / INDIA_RANK_2024 are reused from
  //  screen 04 above — one definition, two screens.)

  DENSITY: [
    {
      label: "India",
      value: 30,
      tier: "confirmed",
      note: "IFR broad measure; varies 5–30 by workforce base — state the measure",
    },
    { label: "World average", value: 162, tier: "confirmed" },
    { label: "Germany", value: 449, tier: "confirmed" },
  ],
  DENSITY_MEASURE: {
    label: "ROBOT DENSITY — per 10,000 manufacturing workers",
    source: "IFR World Robotics 2025",
    tier: "confirmed",
  },
  KUKA_INDIA_HEADCOUNT: {
    value: "76–100",
    tier: "estimate",
    source: "MCA filings · Tracxn, 2025",
  },
  KUKA_INDIA_NIC: {
    value: "7499",
    tier: "confirmed",
    source: "MCA NIC 7499",
  },
  KUKA_INDIA_FY24: {
    revenue: "up sharply",
    profit: "down sharply",
    tier: "estimate",
    source: "MCA FY24 — figures pending verification",
    note: "PENDING PRIMARY VERIFICATION — see VERIFY-BEFORE-SENDING.md",
  },

  // ---- screen 10 — the three-way India comparison -------------------------
  // Every PEOPLE and REVENUE cell carries a chip. The ABB headcount is the
  // softest number in the deck and is deliberately marked `derived` so the
  // rigor screen shows its working via the method footnote rather than
  // presenting a bare number — do not simplify either away.
  INDIA_COMPARISON: [
    {
      id: "abb",
      label: "ABB ROBOTICS INDIA",
      people: {
        value: "350–500",
        prefix: "~",
        tier: "estimate",
        derived: true,
        chip: "estimate — derived",
        method:
          "~3.6% robotics share of ABB India revenue × ~5,027 staff ≈180–200, plus 150–300 global engineering roles in Bengaluru/Pune",
      },
      revenue: { value: "₹444 cr", prefix: "~", tier: "confirmed", chip: "ABB India annual disclosures" },
      hubs: "Bengaluru · Pune",
      composition: "AI, ROS, simulation and software R&D",
      posture: "Rebuilding as an engineering entity",
    },
    {
      id: "fanuc",
      label: "FANUC INDIA",
      people: { value: "530–780+", prefix: "~", tier: "estimate", chip: "Tracxn / MCA filings" },
      revenue: { value: "> ₹1,000 cr", prefix: "", tier: "estimate", chip: "Tracxn / MCA filings" },
      hubs: "Electronics City, Bengaluru",
      composition: "Field application engineering and maintenance",
      posture: "Opening the platform to Indian developers",
    },
    {
      id: "kuka",
      label: "KUKA INDIA",
      people: { value: "76–100", prefix: "~", tier: "estimate", chip: "MCA filings · Tracxn 2025" },
      revenue: {
        value: "₹200–300 cr",
        prefix: "",
        tier: "estimate",
        chip: "MCA FY24 — pending verification",
        note: "PENDING PRIMARY VERIFICATION",
      },
      hubs: "Gurugram · Pune",
      composition: "Sales and service. Integration outsourced to third-party system integrators.",
      posture: "Selling and servicing imported product",
      parenthetical: "(channel and service model)",
    },
  ],
  ABB_HEADCOUNT_METHOD:
    "ᵉ ABB Robotics India headcount is not separately disclosed. Estimated by mapping the robotics segment's ~3.6% share of ABB India revenue onto ~5,027 total staff (≈180–200 commercial and service roles), plus an estimated 150–300 global engineering roles based in Bengaluru and Pune.",

  // ---- screen 12 — two additive layers -----------------------------------
  // The arithmetic is DERIVED from the two revenue figures already presented
  // and chipped on screen 10 — deliberately not from new research. No TAM
  // figure is attached to Layer 2: every available projection carries a 2-7x
  // spread, and the deck's most ambitious claim is the worst place to be
  // falsely precise. The zone comparison is the size argument.
  LAYER1: {
    segments: ["Automotive BIW", "large Tier-1"],
    kuka_revenue: { value: "₹200–300 cr", tier: "estimate", source: "MCA FY24 — pending verification" },
    fanuc_revenue: { value: "> ₹1,000 cr", tier: "estimate", source: "Tracxn / MCA filings" },
    multiple: {
      value: "3–4×",
      tier: "estimate",
      derived: true,
      method: "ratio of FANUC India revenue to KUKA India revenue, both from screen 10",
    },
  },
  // RaaS is the one mechanism on this screen that serves BOTH layers, which is
  // why it is lifted out of the Layer 1 bullet list and given its own band.
  // Edge 1 is an established commercial structure; edge 2 is a consequence of
  // owning the fleet that KUKA does not yet realise — hence the frontier tier
  // on the pair, matching how screen 13 chips the flywheel as a mechanism
  // rather than a fact pattern.
  RAAS_DUAL: {
    heading: "RAAS — THE MECHANISM THAT CUTS BOTH WAYS",
    edges: [
      {
        label: "PENETRATION",
        body:
          "Converts capex resistance into an operating line, financed locally by Indian banks and NBFCs seeking new-economy assets. It is what makes MSME and Tier-2/3 customers reachable at all.",
        serves: "widens Layer 1",
      },
      {
        label: "DEPLOYMENT DATA",
        body:
          "Owning the fleet makes every installed cell an instrumented node. Deployment data cannot be bought at any price — it is earned by deploying, and it is the bedrock Layer 2 stands on.",
        serves: "unlocks Layer 2",
      },
    ],
    // The screen's payoff. Stated as an inference rather than a fact because
    // that is exactly what it is — the two edges above are each unremarkable
    // on their own, and the value is in reading them as one instrument.
    inferenceLabel: "THE NON-OBVIOUS INFERENCE",
    inference:
      "RaaS looks like a financing instrument. It is actually the data strategy — and deployment data is what turns physical AI from a demonstration into a business.",
    tier: "frontier",
    note: "mechanism, not a fact pattern — the financing structure is established, the data position is not yet held",
  },

  LAYER2: {
    segments: [
      "MSME clusters",
      "Tier-2/3 components",
      "electronics assembly",
      "pharma",
      "food and beverage",
      "low-volume, high-mix",
    ],
    tier: "frontier",
    note: "no credible sizing exists — the zone comparison is the claim",
  },

  // ---- screen 13 — the flywheel ------------------------------------------
  // Rendered with ONE frontier chip against the diagram as a whole, never
  // per-node — per-node chips would clutter the circle and imply a precision
  // the mechanism does not have.
  FLYWHEEL: [
    {
      id: "cost",
      label: "ENGINEERING AT INDIAN COST",
      sub: "Bengaluru robotics and ML talent at a fraction of Augsburg or Bay Area cost",
      tier: "estimate",
      note: "cost ratio is order-of-magnitude; do not state a precise multiple",
    },
    {
      id: "deployment",
      label: "DEPLOYMENT DIVERSITY",
      sub: "Thousands of task types no Western or German factory runs — RaaS funds the deployment and captures the data.",
      tier: "frontier",
    },
    {
      id: "data",
      label: "PROPRIETARY DEPLOYMENT DATA",
      sub: "The lowest cost per manipulation hour available anywhere in the world",
      tier: "frontier",
      note: "closes the screen-05 gap and screen-11 row 3",
    },
    {
      id: "finetune",
      label: "FINE-TUNED ON KUKA'S OWN ROBOTS",
      sub: "KUKA's kinematics, torque sensing, safety case, installed base",
      tier: "confirmed",
      note: "the assets are confirmed; the fine-tuning capability is frontier",
    },
    {
      id: "margin",
      label: "PREMIUM MARGIN IN THE WEST",
      sub: "The same capability sold into Europe, Japan and the Americas at Western prices",
      tier: "frontier",
    },
  ],
  REPLICATION: { geographies: ["Vietnam", "Indonesia", "Mexico", "Brazil"], tier: "frontier" },

  // ---- screen 14 — the ecosystem play ------------------------------------
  ECOSYSTEM_PARTNERS: {
    illustrative: ["CynLr", "Ati Motors", "Addverb", "Physical Intelligence", "Skild", "NVIDIA Isaac"],
    tier: "frontier",
    note: "ILLUSTRATIVE OF A CATEGORY — not a target list, not a relationship claim",
  },
  FANUC_OPEN_PLATFORM: {
    tier: "estimate",
    note: "FANUC's ROS 2 / Python open-architecture posture — verify against FANUC's own published sources before sending; underlying research came partly from social media",
  },
};
