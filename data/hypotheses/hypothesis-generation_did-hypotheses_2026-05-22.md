# Falsifiable DiD Hypotheses — TWSE Materiality Study
**Date:** 2026-05-22  
**Last updated:** 2026-05-25  
**Agent:** hypothesis-generation  
**Input:** research-gap-analysis_twse-materiality_2026-05-18.md (7 gaps); Pass 5 NLP plan; DB schema (Block C/D/G)  
**Status:** Complete — 5 hypotheses (H1 primary + H2–H5 secondary/heterogeneity)

---

## Framework

**Design:** Staggered Difference-in-Differences (DiD)  
**Estimator:** Callaway-Sant'Anna (2021) — `att_gt()` in R `did` package  
**Identification:** Parallel trends conditional on covariates; staggered adoption cohorts defined by `gri_adoption_year`  
**Treatment:** First fiscal year a TWSE company reports under GRI Universal Standards 2021 (coded in `gri_adoption_year`)  
**Population:** 73 TWSE companies, 2016–2024 panel (507 company-years)  
**Estimand throughout:** Average Treatment Effect on the Treated (ATT) — the average causal effect among companies that adopted GRI Universal Standards 2021  

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
| **Alternative outcome** | `n_material_topics_a` — count of unique GRI topic standards reported (≠ GRI 2-x) |
| **Treatment indicator** | `post_gri3_it = 1` if fiscal_year ≥ gri_adoption_year |
| **Cohorts** | Companies grouped by `gri_adoption_year` (expected: 2022–2023 clusters) |
| **Estimator** | `att_gt(yname="n_material_topics_b", tname="fiscal_year", idname="company_id", gname="gri_adoption_year", control_group="notyettreated")` |
| **Controls** | ln_total_assets, roa, board_esg_committee, standalone_sr |
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
| **Estimator** | Ordered logit fixed effects (`feols` with `family = "logit"` on binarised outcome); or linear probability model as approximation |
| **Controls** | ln_total_assets, roa, board_esg_committee, assurance_provider_type (lagged) |
| **Expected sign** | **Positive ATT**: GRI 3 adoption → higher assurance level |
| **Expected magnitude** | Increase in probability of Reasonable assurance by 8–15 percentage points |

### Falsification condition
Null ATT on assurance level upgrade would suggest decoupling between standards adoption and verification — companies adopt GRI Universal Standards for compliance signalling without internalising the verification expectation.

---

## H4 — Heterogeneous Displacement: Fabless vs. Foundry/OSAT Subsectors

### Statement
> The displacement effect on material topic count (H1) is **significantly stronger for Fabless companies** than for Foundry and OSAT companies, because Fabless firms have shallower environmental footprints and thus face greater discretion in topic selection under GRI 3-3's impact materiality framework — creating wider scope for displacement.

### Rationale
Foundry and OSAT companies operate large-scale physical manufacturing with high energy and water intensity, chemical waste, and supply chain dependencies — topic areas that are both mandatory under SASB TC-SC and self-evidently material under GRI 3's impact assessment. Their topic selection is constrained by objective impact evidence, leaving less room for discretion-driven displacement. Fabless companies, by contrast, have predominantly software-adjacent operations; their impact materiality is harder to document objectively, giving management greater latitude to narrow topic scope.

### Operationalisation

| Element | Detail |
|---|---|
| **Outcome** | `n_material_topics_b` (as H1) |
| **Moderator** | `industry_cat` — Fabless (n ≈ 28) vs. Foundry/OSAT (n ≈ 21) vs. IDM (n ≈ 24) |
| **Estimator** | Subsample CS21 runs for each category; alternatively, `triple_diff` = ATT(Fabless) − ATT(Foundry/OSAT) with bootstrapped SE |
| **Expected sign** | ATT(Fabless) < ATT(Foundry/OSAT) < 0 — both negative, Fabless more negative |
| **Expected magnitude** | Difference of −2 to −4 additional topics between Fabless and Foundry/OSAT |

### Falsification condition
Null heterogeneity (ATT not significantly different across subsectors) would suggest the displacement mechanism is uniform and does not depend on objective impact materiality constraints — inconsistent with the impact-evidence moderator argument.

---

## H5 — TDDM Diffusion: Institutional Isomorphism Among TWSE Peers

### Statement
> TWSE companies with a closer relationship to TSMC (supply chain tier-1 supplier or Hsinchu Science Park co-location) show **earlier and more substantial GRI 3 adoption** and higher `process_quality_score` post-adoption, consistent with TSMC's TDDM framework diffusing to peers through institutional isomorphic pressure.

### Rationale
TSMC's Three-Dimensional Dynamic Materiality (TDDM) framework — the most sophisticated DMA methodology disclosed by any TWSE company — creates a normative benchmark that peer companies face pressure to emulate (DiMaggio and Powell 1983). Companies in TSMC's direct supply chain or co-located in Hsinchu Science Park face this isomorphic pressure most acutely through joint auditing, shared industry associations, and reputational benchmarking against TSMC's sustainability reports. Gap 3 identifies this as an untested mechanism.

### Operationalisation

| Element | Detail |
|---|---|
| **Outcome** | `gri_adoption_year` (earlier adoption), `process_quality_score` (higher quality), `dm_methodology_disclosed` (binary double-materiality methodology disclosure) |
| **Treatment modifier** | TSMC proximity indicator (tier-1 supplier or HSP co-location) — requires external data coding (TWSE supply chain disclosures; Hsinchu Science Park registry) |
| **Estimator** | Interaction-weighted CS21: ATT for TSMC-proximate vs. non-proximate cohorts; alternatively, OLS cross-sectional on 2024 snapshot with proximity as main predictor |
| **Controls** | Company size, ROA, age of GRI reporting, board_esg_committee |
| **Expected sign** | TSMC-proximate companies: earlier gri_adoption_year, higher post-treatment process_quality_score |
| **Expected magnitude** | 1–2 year earlier adoption; +1.5 point process_quality_score |

### Falsification condition
Null difference between TSMC-proximate and non-proximate companies would suggest the diffusion mechanism is either non-existent or operating through broader industry channels (e.g., industry associations, TWSE regulatory pressure uniformly applied) rather than supply chain proximity.

---

## Summary Table

| Hypothesis | Estimand | Outcome Variable | Expected Sign | Estimator | Blocks Required |
|---|---|---|---|---|---|
| **H1 (primary)** | ATT | `n_material_topics_b` | − (decrease) | CS21 | Block D |
| **H2** | ATT | `process_quality_score` | + (increase) | CS21 + TWFE | Block C + G |
| **H3** | ATT | `assurance_level` | + (upgrade) | CS21 + Ordered logit | Block A |
| **H4** | ATT(Fabless) − ATT(Foundry) | `n_material_topics_b` | ATT(Fabless) < ATT(Foundry) | Subsample CS21 | Block D + industry_cat |
| **H5** | ATT difference by proximity | `process_quality_score`, `gri_adoption_year` | Proximate earlier/higher | CS21 interaction | Block C/G + external proximity |

---

## Pre-Registration Notes

- H1–H4 are estimable from current data once `gri_adoption_year` is coded (DA-1, critical path)
- H5 requires an additional external data step: TSMC supply chain tier-1 coding (estimated 1–2 days of manual lookup from TSMC Supplier Sustainability Reports 2022–2024)
- All five hypotheses should be pre-registered on OSF **before any inferential tests are run** on the DiD estimates
- Planned robustness checks (not pre-specified as hypotheses): Rambachan-Roth sensitivity analysis on parallel trends; Callaway-Sant'Anna with `control_group = "nevertreated"` alternative; Bacon-Goodman decomposition diagnostic

---

*Generated by: hypothesis-generation | Pass 5 | 2026-05-22*  
*Next step: pre-registration on OSF before CS21 estimation*
