# Slide 2 — Physical AI landscape: three forming poles + an unformed middle (v2)

**Corrected concept:** the market is NOT four clusters today. It's **three poles that have gravity** — Model makers, Embodiment makers, Compute providers — and a **large floating swarm of specialized middle companies** (data generation, teleop, sim2real, simulation, annotation, RL environments, fleet, safety) that has **no home yet**. The swarm is the fourth seat *forming*. The animation shows the three poles snap together while the messy middle coalesces, last, into the orchestrator seat — the one nobody owns. We do not pre-label the swarm "integrators"; that's the reveal.

*All figures reported (2026), fine for a partner conversation.*

---

## A · The three poles (already have category gravity — keep these as the anchored clusters)

- **MODEL MAKERS (the brain, commoditizing):** Physical Intelligence (π-series, ~$2.4B), Skild AI (~$1.5B), Google DeepMind (Gemini Robotics), NVIDIA (GR00T, Cosmos), Toyota Research (LBM), World Labs (~$1B), Wayve (~$2B). *"As VLA architectures converge and open weights spread, the model stops being the moat."*
- **EMBODIMENT MAKERS (the body, proliferating):** Figure (~$39.5B), Tesla, 1X, Apptronik, Agility, Boston Dynamics, Sanctuary, Neura · Unitree (~18k units), AgiBot, UBTech, Fourier, Galbot · ABB, KUKA, FANUC, Yaskawa, Universal Robots · Symbotic, Locus, ANYbotics.
- **COMPUTE PROVIDERS (the silicon, concentrating):** NVIDIA (Jetson Thor + GPUs), Qualcomm, AMD, Hailo, Ambarella · perception silicon: Luxonis, Stereolabs, Prophesee, Ouster · hyperscalers for training.

*(These three are what "we got right." The majors above must NOT appear in the swarm below.)*

---

## B · The floating middle — the fragmented swarm (the real fourth seat, still forming)

Dozens of small, specialized companies, each owning **one slice** of the job of turning a model + a body into a working deployment. This is the visual chaos — and the point: no one composes across them, no one owns edge + reliability + trust together.

**Teleoperation & real-world capture**
- **XDOF** (teleop-data startup, launched ~$70M), **Extend Robotics** (XR teleop + self-improving loops), **Cogito Tech** (low-latency capture of expert corrections), **HaptX** (haptic gloves for touch-fidelity demos), **Adamo** (managed teleop, sub-40ms), egocentric/body-worn capture startups, bimanual-rig dataset sellers.

**Synthetic data & sensor rendering**
- **SyntheticAIdata**, **SKY ENGINE AI** (multispectral ray-traced warehouse/industrial), **Anyverse** (physics sensor sim: RGB/IR/LiDAR/radar/thermal), **Rendered.ai** (radar/SAR/thermal/hyperspectral PaaS), **DataMesh Robotics** (executable digital twin).

**Simulation & sim2real (open / non-major)**
- **Genesis** (open GPU physics, ~43M FPS on one 4090), **Unity Robotics Hub**, plus the open stack (Gazebo, ROS 2) — the sim2real gap is explicitly *still open in 2026*, i.e. unsolved and contested.

**Data annotation, curation & marketplaces**
- **Labellerr**, **Encord**, **Keymakr**, **Roboflow** (annotation/curation) · **Troveo** (rights-cleared real-world manipulation/navigation video) · data-labor at scale: **Toloka**, **Centific** (and the larger data players Scale AI / Mercor straddle here too).

**RL environments & evals**
- RL-environment providers (agentic training loops) and expert-eval marketplaces — an emerging, mostly-unbranded category, moving fast.

**Fleet orchestration, middleware, safety (point tools)**
- **Viam**, **Formant**, **InOrbit**, **Foxglove**, **Freedom Robotics**, **Meili FMS**, **Vecna Pivotal**, **Ready Robotics**, **Open-RMF** (open standard) · safety: **FORT Robotics** · edge-model tooling: **Edge Impulse**.

**The observation to voice:** every one of these solves a fragment — capture, or sim, or labels, or fleet, or safety. The fourth player is the one that *composes the fragments into a certified, working system.* That company doesn't exist yet. That's the seat.

---

## C · The convergence animation — corrected build spec

**Beat 0 — three poles + a cloud:** three labeled poles (Model / Embodiment / Compute) already partly formed at left, right, and bottom, each holding its recognizable majors. In the **center-top, a dense disordered cloud** of ~30 small unlabeled/lightly-labeled nodes (the swarm) — visibly homeless, no structure. Label: *"Physical AI today: three poles, and a scramble in the middle."*

**Beat 1 — the poles settle:** the three pole clusters tighten and label up (`converge` within each) — they have gravity. The middle cloud stays scattered and slightly agitated (a small drift), emphasizing it has no home.

**Beat 2 — the middle finds its shape:** the swarm nodes begin to draw together toward the empty center (`converge`), grouping loosely by sub-function (capture / sim / data / fleet) as intermediate mini-clusters — still clearly *many*, not one.

**Beat 3 — the fourth seat:** the mini-clusters merge into a single bold ink block between the three poles — the **Orchestrator** — drawn the largest and the only one in ink (our color). Label snaps: *"The fourth player is forming. Nobody owns it yet."*

**Beat 4 — us:** our mark lands on the orchestrator block; carry line: *"When the model stops being the moat, the one who composes the middle wins."*

**Data structure:** `{ name, layer: model|embodiment|compute|swarm, subfn?: capture|sim|synthdata|data|rl|fleet|safety, size }`. Majors → their pole; everything in §B → `swarm`. Tint the three poles muted slate/bronze/graphite; the swarm neutral-grey until Beat 3, then it resolves to **ink**. ~30–35 nodes max for legibility; footnote *"representative, not exhaustive."* Off-white ground, no glow, `converge`+`fadeUp` only; reduced-motion shows the Beat-3 end state.

---

Sources: [Labellerr — Teleoperation providers 2026](https://www.labellerr.com/blog/top-teleoperation-companies-humanoid-robotics/) · [Labellerr — Synthetic data platforms 2026](https://www.labellerr.com/blog/best-synthetic-data-platforms-robotics/) · [Troveo — Robotics training-data companies](https://www.troveo.ai/resources/robotics-training-data-companies) · [Embodied AI simulators 2026](https://medium.com/@JoshMcGregor_AI/top-of-embodied-ai-simulators-in-2026-1be341a9d6c7) · [SiliconANGLE — XDOF $70M teleop data](https://siliconangle.com/2026/06/17/robotic-teleoperation-data-startup-xdof-launches-70m-funding/) · [Objectways — Sim2Real gap still open 2026](https://objectways.com/blog/why-the-sim2real-gap-is-still-open-in-2026/) · [evsint — Embodied AI data collection & sim2real 2026](https://www.evsint.com/embodied-ai-data-collection-teleoperation-sim-to-real-2026/)
