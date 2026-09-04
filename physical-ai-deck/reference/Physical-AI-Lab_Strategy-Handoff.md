# Physical AI Lab — Strategy Handoff & Briefing (Frozen Baseline v2)

## 0. What this document is and how to use it

Self-contained strategy briefing for a proposed **Physical AI research + monetization lab, HQ'd in India**, prepared for a Head-of-Technology candidacy. Written to be (a) handed to an advanced frontier model for independent pressure-testing, and (b) the frozen baseline for the pitch deck.

**v2 change:** the apex has evolved from "superhuman-leads" to **the widening middle** — as both the model end and the embodiment end commoditize/proliferate, the scarce integrating layer between them is where value pools. Superhuman is now positioned as an *emergent bonus and first beachhead*, not the headline. A new emergent product — **the Composer** — is the keystone.

**Working constraint:** assume **nothing** about the company's current assets (capital, hardware, IP, existing partnerships). The plan stands on the thesis and the operating model, not on unknown resources.

---

## 1. The mandate (fixed constraints)

- **Role:** Head of Technology for a company entering Physical AI.
- **Task:** roadmap; establish and build a **global research team, HQ'd in India**; stand up **high-calibre research + monetization labs**.
- **Positioning (non-negotiable):** the **vendor-neutral middle layer** between the **left end** (frontier AI / model labs — foundation models, world models, VLAs) and the **right end** (real-world use cases + robot / embodiment providers). **Vendor-agnostic in both the model world and the robot world.**
- **Philosophy:** do **not** compete with frontier labs; work **with** them to expand Physical AI adoption.
- **Immediate context:** credibility established in meeting one; meeting two requires a solid plan.

---

## 2. Candidate context (for tailoring voice/positioning)

- PhD Cognitive Robotics (TU Delft); MBA. 16+ years robotics & AI — elderly care, hospital UVC disinfection, autonomous mobility, healthcare companionship. Deep ROS 1/2; aviation autonomy. Currently Head of Engineering & Product at a robotics company; author of a book on generative intelligence.
- **Signature conviction:** machines should do **superhuman tasks humans cannot** (his UVC work is an example), not merely substitute labour.
- **Assets to leverage:** strong teaching capability; intent to build an India upskilling academy leveraging lower-cost engineering talent; belief in **"agentic programming for software, humans reserved for research/frontier work."**
- Prior "Kuka deck" research to be folded in as industrial background when available.

---

## 3. The apex — the widening middle (governing thought)

**Physical AI is splitting into two ends that are both growing and both commoditizing. The value pools in the gap between them, and the gap is where we live.**

- **Left end (model space)** will bifurcate exactly like LLMs did — a few frontier players plus a large commoditized/open tier.
- **Right end (embodiment space)** will proliferate into hundreds of bodies and systems.
- A few players attempt **full-stack / both ends** (Figure, Tesla). *Side note, and a clean one:* vertical integration is the right bet only while the stack is immature and non-modular (early Apple/Tesla pattern — capital-brutal, and a bet that the stack stays integrated). Our thesis is the opposite and structurally-favoured bet — that the stack **modularizes** — and the candidate's own market read (both ends growing and commoditizing) is the evidence. The LLM precedent already settled it: the model labs didn't build the apps; the middle and app layers did.
- **The economic law:** conservation of attractive profits (Christensen) — when adjacent stages become modular and abundant, the scarce, still-hard **integrating** capability between them captures the profit. That integrating capability is ours.

**The positioning line (what the middle delivers):**
> the **right model + the right embodiment + a reliable harness**, composed for the **required application**.

This is the single sentence the whole deck defends.

---

## 4. Supporting frame — the AI value chain (LLM era)

The precedent that makes the apex credible. Value bifurcates to the two ends of the chain and commoditizes in the middle; cost of running a model fell ~1,500× in six years. Layers, bottom→top: compute/infra (NVIDIA, TSMC, neoclouds, inference/serving) → data (labeling → RL environments; Scale/Surge/Mercor) → models (frontier + open/efficient; Liquid AI) → the agent stack (fine-tuning, orchestration, memory, tools/MCP, harness, eval) → applications (horizontal + vertical) → enterprise adoption & services (GSIs + India majors).

**Three lessons that carry over:** (i) the barbell — own a fulcrum or own the customer, never the undifferentiated middle *of a single layer*; (ii) **neutrality is an asset** — the Meta→Scale AI capture (49% stake, ~$29B; frontier labs fled to neutral Mercor/Surge) validates vendor-agnosticism on both ends; (iii) **adaptation + services is undervalued** and India already dominates it. Note: our "middle" is *between layers of the physical stack*, i.e. the scarce integrator — not the commoditizing middle of one layer.

---

## 5. Why the edge is a *primary* axis (not optional)

For robots the control loop cannot wait on a network — on-device is mandatory for a large fraction of the stack. SLM turn (NVIDIA: "Small Language Models are the Future of Agentic AI"; sub-10B; 7B is 10–30× cheaper than 70–175B; SLMs by default, large models sparingly). Optimization: 4-bit quantization default, distillation, speculative decoding, pruning, KV-cache. Runtimes: ExecuTorch, llama.cpp/GGUF, MLX, ONNX. Edge silicon: Jetson Thor (~2,070 FP4 TFLOPS, 128 GB, 40–130 W), Qualcomm Hexagon, Apple Neural Engine. Reality check: VLA targets ~10 Hz / 100 Hz; π0 on Jetson Thor **19 Hz** vs H100 162 Hz; server beats on-device except under poor connectivity (30–50× memory-bandwidth gap). **The correct architecture is tiered, not on-device-maximalist; the moat is the partitioning/orchestration engineering.** This feeds Bucket 1.

---

## 6. The three buckets — what we build (the MECE key line)

Everything re-clusters into three composable capabilities: **Adaptation · Autonomy · Assurance.**

### Bucket 1 — ADAPTATION ("the right model, fit to the right embodiment, for the application")
The fit engine. Turns general/commoditized intelligence into a fast, efficient, embodiment- and application-specific expert at the edge.
- **Edge-first tiered orchestration** — deterministic reflex/compliant/path-planning (classical, modernized, provably safe) → reactive physics-aware policy at ~1–5 Hz on the edge → macro scene-reasoning offloaded to cloud when connectivity allows. The orchestration framework that manages the split, the offline fallback, and hand-off latency is the missing piece the field lacks.
- **Application-specialized models** — distillation, transfer, task-specific fine-tuning, narrow eval → small, fast, *certifiable* experts. Generalist intelligence here is unnecessary and detrimental. The asset is the *repeatable pipeline*, not any one model.
- **Data compression / representation** — vision data is voluminous and redundant; current pipelines hit a storage/bandwidth wall that silently caps intelligence scaling. Store perception in **embedding/latent space, not human-viewable frames** (the vision half of VLA/world-models has largely converged, so freezing it into a learned latent is low-risk); H.26x codecs optimize for human viewability, which machine-ingestible data does not need ("coding for machines" / MPEG VCM; world-model tokenizers). A headline research contribution **and** a direct cost lever — which is what makes the Composer's *budget* input real.

### Bucket 2 — AUTONOMY ("give it a goal, not a task — and it improves itself")
The agency engine. Turns a fitted policy into a goal-seeking system.
- **Agentic Physical AI** — intent, memory, tools (SLAM, localization, perception), skills, harness. Give a goal; it decomposes into tasks.
- **Continuous improvement** — fold real-world and verbal feedback ("gentler, rotate first") back into reasoning *and* motion. Almost no clean framework or eval exists for this; it is what makes a deployed fleet **compound** (the data flywheel).
- **System-scale orchestration** — the "embodiment" can be one robot or a whole heterogeneous fleet/environment (see §9).

### Bucket 3 — ASSURANCE ("provably reliable, certifiable, adoptable")
The trust engine — the moat almost no one is building, and the one with **no strong LLM analog** (an LLM error is retryable/low-consequence).
- **Failure-mode / inverted-data engine** — the world's data encodes "how to do it right"; almost none encodes "what goes wrong and how to detect/avoid/recover." Generate it via world-model rollouts (cheap, scalable edge-case synthesis) + real-world capture (rare ground truth). This is the *evidence base* for certification.
- **Certification for probabilistic, continuously-updated systems** — existing regimes (ISO 10218/TS 15066, ISO 21448 SOTIF, UL 4600, EU Machinery Regulation 2023) assume slow, deterministic software; **none handle weekly model updates.** White space: continuous assurance, runtime safety monitors, "this embodiment + this model version + this application = certified," formal boundaries-of-operation/failure. A neutral, India-based research-and-certification body shaping this standard before legislation catches up is category-defining. Neutrality is again prerequisite.

**Through-line:** C1 → C2 → industrial adoption. The failure-data engine feeds certification, which is the adoption gate that converts capability into deployed revenue.

---

## 7. The emergent keystone — the Composer

As the three buckets are built *modularly and instrumented with deployment data*, an emergent product arises:

> **A software system that, given {requirement, budget, application}, generates the complete tailored stack** — selecting the model, applying the adaptation recipe, matching the embodiment, wiring the harness, and returning the assurance/certification path.

Why it is the keystone:
- **Emergent, not buildable-first** — it is a *consequence* of modular buckets, not a promise. This makes it credible and places it late in the roadmap as the **valuation re-rating moment**: services/lab → platform.
- **Budget-aware** — composes the right stack at the right *cost*, which is exactly what the edge/SLM/distillation/compression work (Bucket 1) buys. Budget-awareness makes Adaptation economically load-bearing.
- **Neutral by construction** — only an entity uncaptured on both ends can build a cross-model, cross-embodiment composer. Vendor-agnosticism becomes the *enabling condition* of the flagship product, not a constraint.
- **It productizes superhuman** — hand it a superhuman requirement and it assembles the stack no one else can.

---

## 8. Superhuman — bonus in the story, beachhead in the roadmap

Define a superhuman task by its properties — **no human demonstration data, high consequence, novel embodiment/sensing** — and they map one-to-one onto the three buckets: no data → strong **Adaptation**; goal-driven with no known recipe → strong **Autonomy**; high consequence → strong **Assurance**. So a middle layer built for the general case is *automatically* the only thing capable of superhuman work — it falls out for free. The mirror: commodity substitution tasks (folding, vacuuming) need little of any bucket and commoditize down to the hardware/full-stack players. **The three buckets structurally select for superhuman and against commodity substitution.**

Caution: *narratively* superhuman is the bonus; *in execution* it is the best **first proof point** (mining, oil & gas, nuclear, subsea, extreme-weather, high-precision manufacturing — TBD), because a high-consequence beachhead exercises all three buckets at once.

---

## 9. The horizon — Physical AI beyond a single robot (closing note)

As the ecosystem matures, the "embodiment" stops being a single robot: **intelligent warehouses** (gates, valves, conveyors, arms co-orchestrating to a goal), **self-driving labs** (microscopes, centrifuges, handlers pursuing an objective), IoT fleets. The Composer and the three buckets extend naturally to composing *whole intelligent environments*. This is the final slide — the vision expansion that shows the thesis scales far past robots.

---

## 10. Open deck workstreams (to develop, beneath the apex)

1. **MOAT** — the Assurance trust engine (C1+C2) + the Adaptation pipeline (B1) + the compounding deployment data flywheel (B2) + neutrality + the Composer as the emergent, hard-to-copy productization + India talent leverage.
2. **Team structure** — research vs. applied vs. certification vs. deployment labs, and how they interlock; India-HQ + global-node model.
3. **Global research team** — sourcing world-class researchers from an India base; why they join; frontier-lab and university partnerships.
4. **IP strategy** — patent vs. trade-secret vs. publish; certification standards and failure-data as defensible position; the Composer's recipes/data as core IP.
5. **Roadmap** — milestones that show progress *and* exponentiate valuation: beachhead (superhuman proof) → modular buckets → **Composer (platform re-rating)** → standard-setter → intelligent environments. Be explicit about what unlocks each re-rating.
6. **India education / upskilling academy** — leverage lower-cost engineering talent; the candidate's teaching capability; academy as talent pipeline + brand + revenue.
7. **Execution principle** — agentic programming for software build-out; reserve human effort for research/frontier work. A structural cost-and-speed edge and a statement of how the lab operates.

---

## 11. Frozen decisions / open questions

- **Frozen:** apex = the widening middle; positioning = "right model + right embodiment + reliable harness for the application"; three buckets = Adaptation/Autonomy/Assurance; Composer = emergent keystone; superhuman = bonus + beachhead; horizon = beyond a single robot.
- **Assume nothing** about the company's current assets.
- **Open:** target superhuman/beachhead verticals to name; the Kuka research to fold in; naming of the buckets and the Composer.

---

## Appendix — Evidence base (~2026)

- AI venture funding since late 2022: **$150B+**. OpenAI ~$20B ARR; Anthropic ~$4B ARR. Model-running cost down **~1,500×** in six years.
- **Meta → Scale AI:** 49% stake, ~$29B (2025); OpenAI/Google/xAI cut ties over conflict; Scale 2026 guidance ~$1B (from ~$2B). Neutral rivals captured the defectors: **Mercor** ~$2B / ~$20B; **Surge** ~$1.4B / ~$15B.
- **Liquid AI:** $250M led by AMD; LFM2 = on-device-native models.
- **SLM economics:** 7B is 10–30× cheaper than 70–175B; Phi-2 (2.7B) ≈ 30B quality at ~15× speed; xLAM-2-8B beats GPT-4o on tool-calling.
- **On-device:** 4-bit PTQ default; ExecuTorch 1.0 (50 KB base, 12+ backends) at consumer scale.
- **Jetson Thor:** ~2,070 FP4 TFLOPS, 128 GB LPDDR5X (273 GB/s), 40–130 W, ~7.5× Orin; Llama 3.1 8B ~150 tok/s on-device; $3,499 dev kit.
- **VLA latency:** targets 10 / 100 Hz; π0 Jetson Thor **19 Hz** vs H100 162 Hz; server beats on-device except under poor connectivity; memory-bandwidth gap **30–50×**.
- **Certification scaffolds to evolve:** ISO 10218 / TS 15066, ISO 21448 (SOTIF), UL 4600, EU Machinery Regulation 2023 — none handle frequent model updates.
