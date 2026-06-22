# Falsifiable DiD Hypotheses — TWSE Materiality Study
**Date:** 2026-05-22  
**Last updated:** 2026-06-09 — Two-tier design adopted: H1–H4 on full TWSE universe; H5 semiconductor industry deep dive  
**Agent:** hypothesis-generation  
**Input:** research-gap-analysis_twse-materiality_2026-05-18.md (7 gaps); Pass 5 NLP plan; DB schema (Block C/D/G)  
**Status:** Complete — 5 hypotheses (H1 primary + H2–H4 secondary/heterogeneity + H5 semiconductor deep dive)

---

## Study Design Overview

This study uses a **two-tier design**:

**Tier 1 — Full TWSE Universe (H1–H4):** Estimates the causal effect of GRI Universal Standards 2021 adoption on materiality disclosure outcomes across the *entire* TWSE reporting population. This tier establishes the general phenomenon — displacement, process quality, and assurance effects — without restricting to any industry sub-group. The large treated population (~1,200 companies across 2021–2024 adoption cohorts) provides statistical power and broad external validity.

**Tier 2 — Semiconductor Industry Deep Dive (H5):** Narrows to the 73-company TWSE semiconductor sub-cohort to test a specific institutional diffusion mechanism: whether TSMC's Three-Dimensional Dynamic Materiality (TDDM) framework diffuses to peer companies through supply chain isomorphism. This tier explains *why* the GRI 3 effects may operate differently within one structurally connected industry.

The two tiers are complementary, not competing. H1–H4 answers "does GRI 3 reshape materiality disclosure across TWSE?" H5 answers "does proximity to a dominant standard-setter amplify this effect within a tightly-coupled industry?"

---

## Framework

**Design:** Staggered Difference-in-Differences (DiD)  
**Estimator:** Callaway-Sant'Anna (2021) — `att_gt()` in R `did` package  
**Identification:** Parallel trends conditional on covariates; staggered adoption cohorts defined by `gri_adoption_year`  
**Treatment:** First fiscal year a TWSE company reports under GRI Universal Standards 2021 (coded in `gri_adoption_year`)

**Tier 1 population (H1–H4):**  
~2,009 TWSE companies with `gri_adoption_year` coded; ~1,200 treated companies with at least one pre-adoption observation available for DiD estimation (adoption cohorts: 14 × 2021, 868 × 2022, 309 × 2023, ~26 × 2024); panel 2021–2024 (estimable window, given GRI code extraction coverage); control group = not-yet-treated companies within the same panel.

**Tier 2 population (H5):**  
73 TWSE semiconductor companies (SIC 3674 and adjacent; `semiconductor_cat = 1`); 507 company-years 2016–2024; adoption cohorts: 3 × 2021, 65 × 2022, 4 × 2023, 2 × 2024.

**Estimand throughout:** Average Treatment Effect on the Treated (ATT)

---

## H1 — Primary: GRI 3 Adoption and Material Topic Count (Displacement Effect)

### Statement
> Adoption of GRI Universal Standards 2021 (GRI 3 treatment) causes a **net decrease** in the number of disclosed material topics (`n_material_topics_b`) among TWSE companies, consistent with a displacement effect in which GRI 3-3's mandatory management-of-topic disclosures impose compliance costs that compress topic scope.

### Rationale
Göttsche et al. (2025) demonstrate a displacement effect for SASB financial-materiality reporting: mandatory disclosure of specific financial metrics crowds out adjacent voluntary disclosures. Under GRI 3, each material topic requires a full GRI 3-3 disclosure (topic boundary, management approach, effectiveness metrics). The incremental compliance burden per topic gives managers an incentive to narrow the topic list — selecting the minimum defensible set — to contain reporting cost. This is the study's primary novel theoretical contribution (Gap 7).

### Operationalisation

| Element | Detail |
|---|---|
| **Outcome** | `n_material_topics_b` — count of GRI 3-3 disclosure entries (one per material topic) |
| **Alternative outcome** | `n_material_topics_a` — count of unique GRI topic standards reported (≠ GRI 2-x); consistent method across all cohort years |
| **Treatment indicator** | `post_gri3_it = 1` if fiscal_year ≥ gri_adoption_year |
| **Population** | Full TWSE universe (~1,200 treated companies) |
| **Cohorts** | Companies grouped by `gri_adoption_year` (primary clusters: 2022–2023) |
| **Estimator** | `att_gt(yname="n_material_topics_b", tname="fiscal_year", idname="company_id", gname="gri_adoption_year", control_group="notyettreated")` |
| **Controls** | ln_total_assets, roa, board_approved, standalone_sr |
| **Expected sign** | **Negative ATT**: GRI 3 adoption → reduction in n_material_topics_b |
| **Expected magnitude** | Based on Göttsche et al. (2025): −2 to −5 topics relative to pre-adoption mean |
| **Pre-trend test** | Event-study plot; inspect t−2 and t−1 coefficients for anticipation effects (Gap 6) |

### Falsification condition
If ATT is positive or statistically indistinguishable from zero (95% CI), the displacement hypothesis is rejected. A significant positive ATT would support an expansion effect (companies use GRI 3-3 as a structure to formalise previously undisclosed topics).

---

## H2 — Process Quality Upgrade Post-Adoption

### Statement
> Adoption of GRI Universal Standards 2021 causes a significant **increase** in `process_quality_score` — the composite materiality disclosure quality index — as GRI 3's four-step DMA methodology imposes minimum process documentation standards.

### Rationale
GRI 3 mandates four specific process steps: (1) stakeholder identification, (2) impact identification, (3) materiality assessment, (4) management approach per topic. Companies adopting GRI 3 must document these steps to achieve GRI-conformant reporting, creating a regulatory floor on disclosure quality that was absent under GRI Standards 2016. Even if topic count decreases (H1), process quality should increase.

### Operationalisation

| Element | Detail |
|---|---|
| **Primary outcome** | `process_quality_score` — composite of stakeholder_groups_n + engagement_methods_n + process_steps_n + board_approved + scoring_method_disclosed (0–10 scale) |
| **Secondary outcome** | `gri3_four_step_compliance` (binary) — explicit compliance with four-step DMA |
| **Population** | Full TWSE universe |
| **Estimator** | Callaway-Sant'Anna as per H1; OLS fixed-effects as robustness (`feols(process_quality_score ~ post_gri3_it + controls | company_id + fiscal_year, cluster = ~company_id)`) |
| **Controls** | Same as H1 |
| **Expected sign** | **Positive ATT**: GRI 3 adoption → higher process_quality_score |
| **Expected magnitude** | +1–2 points on the 0–10 composite scale |

### Falsification condition
Null or negative ATT on `process_quality_score` would suggest that GRI 3's process requirements are not substantively implemented — consistent with boilerplate adoption rather than genuine process upgrade.

---

## H3 — Assurance Level Upgrade Post-Adoption

### Statement
> GRI 3 adoption causes a shift from no assurance (or limited assurance) toward **higher assurance levels** (`assurance_level` upgrade), as institutional investors and regulators increasingly associate GRI Universal Standards compliance with credible third-party verification.

### Rationale
GRI 3 does not mandate assurance but strengthens the credibility rationale: the more detailed DMA required by GRI 3-3 increases the information asymmetry cost of self-certification. Signalling theory predicts that companies adopting a higher-credibility reporting standard will pair it with higher-credibility verification to distinguish themselves from low-quality adopters. The TWSE context reinforces this — the FSC's 2024 Corporate Governance Roadmap links assurance requirements to sustainability reporting standards adoption.

### Operationalisation

| Element | Detail |
|---|---|
| **Outcome** | `assurance_level` — ordinal: 0 = None, 1 = Limited, 2 = Reasonable |
| **Population** | Full TWSE universe |
| **Estimator** | Ordered logit fixed effects (`feols` with `family = "logit"` on binarised outcome); or linear probability model as approximation |
| **Controls** | ln_total_assets, roa, board_approved, assurance_provider_type (lagged) |
| **Expected sign** | **Positive ATT**: GRI 3 adoption → higher assurance level |
| **Expected magnitude** | Increase in probability of Reasonable assurance by 8–15 percentage points |

### Falsification condition
Null ATT on assurance level upgrade would suggest decoupling between standards adoption and verification — companies adopt GRI Universal Standards for compliance signalling without internalising the verification expectation.

---

## H4 — Heterogeneous Displacement: Operational-Impact-Intensive vs Light-Footprint Industries

### Statement
> The displacement effect on material topic count (H1) is **significantly stronger for light-footprint TWSE companies** (Technology, Services, Healthcare, Financials) than for operational-impact-intensive companies (Resource, Infrastructure, Transportation, Minerals, Food), because light-footprint firms face more discretion in topic selection under GRI 3-3's impact materiality framework — creating wider scope for displacement.

### Rationale
GRI 3's impact materiality requirement asks companies to assess which topics cause real-world impacts. For operational-impact-intensive companies — manufacturers, resource extractors, utilities, food producers — the material topics are substantially pre-constrained by regulatory requirements (Taiwan EPA, OSHA, FSC sector metrics), industry standards (SASB), and observable physical operations. Dropping GHG emissions, water, or occupational safety from the materiality assessment would be indefensible and invite regulatory and investor pushback. These companies therefore face limited displacement latitude.

Light-footprint companies (technology firms, service businesses, healthcare providers) lack comparably objective, externally-mandated topic anchors. Their material topics are more contestable — a software company's environmental impact is less tangible, making topic scope harder to challenge from the outside. GRI 3-3's compliance cost therefore gives management more room to narrow the list to a minimum defensible set. This directly generalises the Fabless vs Foundry/OSAT mechanism from the original semiconductor design to the full TWSE population.

This hypothesis tests Gap 7's displacement mechanism across industry contexts.

### Operationalisation

| Element | Detail |
|---|---|
| **Outcome** | `n_material_topics_b` (as H1) |
| **Moderator** | `impact_intensity` — derived from `sasb_industry` in Block A: **High** = Resource, Infrastructure, Transportation, Minerals, Food; **Low** = Technology, Services, HealthCare, Financials; Consumer treated as borderline sensitivity check |
| **Population** | Full TWSE universe |
| **Sample sizes (2024)** | High-impact ≈ 661 companies; Low-impact ≈ 957 companies |
| **Estimator** | Subsample CS21 runs for High vs Low; alternatively, `triple_diff` = ATT(Low) − ATT(High) with bootstrapped SE |
| **Controls** | Same as H1 |
| **Expected sign** | ATT(Low) < ATT(High) < 0 — both negative, Light more negative |
| **Expected magnitude** | Difference of −2 to −4 additional topics between Light and Heavy industries |

### Falsification condition
Null heterogeneity (ATT not significantly different across industry groups) would suggest the displacement mechanism is uniform — objective impact constraints do not moderate the displacement effect — inconsistent with the impact-evidence moderator argument.

---

## H5 — Semiconductor Deep Dive: TDDM Diffusion via Institutional Isomorphism

> **Scope:** This hypothesis narrows to the **73-company TWSE semiconductor sub-cohort** (`semiconductor_cat = 1`). It is a focused supplementary analysis that tests a specific institutional mechanism within a structurally connected industry, not a replication of H1–H4 in a subsample. Results from H1–H4 (full TWSE) provide the broader context; H5 asks whether TSMC's dominant standard-setter role amplifies or accelerates those effects within the semiconductor ecosystem.

### Statement
> TWSE companies with a closer relationship to TSMC (supply chain tier-1 supplier or Hsinchu Science Park co-location) show **earlier and more substantial GRI 3 adoption** and higher `process_quality_score` post-adoption, consistent with TSMC's TDDM framework diffusing to peers through institutional isomorphic pressure.

### Rationale
TSMC's Three-Dimensional Dynamic Materiality (TDDM) framework — the most sophisticated DMA methodology disclosed by any TWSE company — creates a normative benchmark that peer companies face pressure to emulate (DiMaggio and Powell 1983). Companies in TSMC's direct supply chain or co-located in Hsinchu Science Park face this isomorphic pressure most acutely through joint auditing, shared industry associations, and reputational benchmarking against TSMC's sustainability reports. Gap 3 identifies this as an untested mechanism.

H5 therefore provides a *mechanistic* complement to H1–H2: while H1–H2 document the average treatment effect of GRI 3 adoption across all TWSE companies, H5 explains why the quality upgrade (H2) may be particularly pronounced among companies embedded in TSMC's institutional orbit.

### Operationalisation

| Element | Detail |
|---|---|
| **Population** | 73 TWSE semiconductor companies (`semiconductor_cat = 1`); adoption cohorts: 3 × 2021, 65 × 2022, 4 × 2023, 2 × 2024 |
| **Outcome** | `gri_adoption_year` (earlier adoption), `process_quality_score` (higher quality), `dm_methodology_disclosed` (binary double-materiality methodology disclosure) |
| **Treatment modifier** | TSMC proximity indicator (tier-1 supplier or HSP co-location) — requires external data coding (TWSE supply chain disclosures; Hsinchu Science Park registry) |
| **Estimator** | Interaction-weighted CS21: ATT for TSMC-proximate vs non-proximate cohorts; alternatively, OLS cross-sectional on 2024 snapshot with proximity as main predictor |
| **Controls** | Company size, ROA, age of GRI reporting, board_esg_committee |
| **Expected sign** | TSMC-proximate companies: earlier gri_adoption_year, higher post-treatment process_quality_score |
| **Expected magnitude** | 1–2 year earlier adoption; +1.5 point process_quality_score |

### Falsification condition
Null difference between TSMC-proximate and non-proximate companies would suggest the diffusion mechanism is either non-existent or operating through broader industry channels (e.g., industry associations, TWSE regulatory pressure uniformly applied) rather than supply chain proximity.

---

## Summary Table

| Hypothesis | Tier | Population | Estimand | Outcome Variable | Expected Sign | Estimator | Blocks Required |
|---|---|---|---|---|---|---|---|
| **H1 (primary)** | Full TWSE | ~1,200 treated | ATT | `n_material_topics_b` | − (decrease) | CS21 | Block D |
| **H2** | Full TWSE | ~1,200 treated | ATT | `process_quality_score` | + (increase) | CS21 + TWFE | Block C + G |
| **H3** | Full TWSE | ~1,200 treated | ATT | `assurance_level` | + (upgrade) | CS21 + Ordered logit | Block A |
| **H4** | Full TWSE | ~1,618 (High+Low) | ATT(Low) − ATT(High) | `n_material_topics_b` | ATT(Low) < ATT(High) | Subsample CS21 | Block D + sasb_industry |
| **H5** | Semiconductor | 73 companies | ATT diff by proximity | `process_quality_score`, `gri_adoption_year` | Proximate earlier/higher | CS21 interaction | Block C/G + external proximity |

---

## Pre-Registration Notes

- **H1–H4** are estimable from current data (full TWSE universe). `board_esg_committee` was 0% populated and has been replaced by `board_approved` (Block C, fully extracted) as the board-engagement control — same theoretical construct, more direct measurement. If `board_esg_committee` is later sourced from TEJ, add it as a robustness check without changing the primary specification.
- **H5** requires an additional external data step: TSMC supply chain tier-1 coding (estimated 1–2 days of manual lookup from TSMC Supplier Sustainability Reports 2022–2024)
- **Estimation window for H1–H4**: 2021–2024 (GRI code extraction covers 2021 onward; 2016–2020 rows have no outcome variable data and cannot contribute to DiD)
- **Pre-registration scope**: All five hypotheses should be pre-registered on OSF **before any inferential tests are run** — a single pre-registration covering both tiers, noting the different populations
- **H4 `impact_intensity` derivation**: the binary variable `high_impact_industry` should be pre-specified and derived from `sasb_industry` before running any regressions; Consumer sector inclusion/exclusion should be pre-registered as a sensitivity check
- Planned robustness checks (not pre-specified as hypotheses): Rambachan-Roth sensitivity analysis on parallel trends; Callaway-Sant'Anna with `control_group = "nevertreated"` alternative; Bacon-Goodman decomposition diagnostic; Poisson/Hurdle count model as robustness for `n_material_topics_b`

---

*Generated by: hypothesis-generation | Pass 5 | 2026-05-22*  
*Updated: two-tier design (H1–H4 full TWSE, H5 semiconductor deep dive) | 2026-06-09*  
*Updated: board_esg_committee → board_approved as board-engagement control (H1–H4) | 2026-06-09*  
*Next step: pre-registration on OSF before CS21 estimation*
