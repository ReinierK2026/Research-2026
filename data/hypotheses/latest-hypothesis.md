# Falsifiable Hypotheses — GRI 3 Materiality DiD Study (Revised)
**Date:** 2026-06-10  
**Supersedes:** hypothesis-generation_did-hypotheses_2026-05-22.md  
**Status:** Pre-registration ready — six parallel analysis streams, NLP supplementary outcomes incorporated  
**Updated:** 2026-06-22 (NTT pool t=2023 corrected; board diversity variables added; independent_director_ratio now usable; DB→197 cols)  
**Agent:** research-coordinator (with hypothesis-generation input)

---

## Key Revisions from 2026-05-22 Version

| Item | Previous | Revised |
|---|---|---|
| Identification | GRI 3 adoption vs never-treated | **Timing-based DiD: 2022 cohort vs 2023 cohort (not-yet-treated)** |
| Population | ~1,200 treated, 68 never-treated | **495 estimable companies; 0 never-treated in PDF universe** |
| Cohorts in primary analysis | 2021–2024 | **2022 + 2023 only; 2024 cohort excluded** |
| Control group | Not-yet-treated or never-treated | **Not-yet-treated only: ~43 companies (2023 cohort)** |
| Control group size | Large (868+ companies) | **~43–44 companies for dominant 2022 cohort** |
| `process_quality_score` scale | 0–10 | **0–1 (corrected)** |
| `process_quality_score` expected ATT | +1–2 points | **+0.05 to +0.15** |
| H3 (assurance) | CS21 DiD | **Reclassified: exploratory logistic regression** |
| NLP models | Not in hypotheses | **Pre-registered supplementary stream (H2-NLP)** |
| `idname` in att_gt() | company_id | **twse_ticker** |
| H5 semiconductor n | 73 companies | **49 companies (current DB)** |

---

## Additional Update — 2026-06-22 (Pass DB-02)

TEJ Board diversity data (2021–2024) integrated. New variables available for covariate specifications:

| Variable | Coverage (2021–2024) | Notes |
|---|---|---|
| `independent_director_ratio` | 2,791/2,856 (97.7%) | **Was 0% for 2022–2024; now repopulated. Safe for primary spec.** |
| `independent_directors_n` | 2,773/2,856 | Raw count; useful for robustness checks |
| `female_director_pct` | 2,169/2,856 non-zero | Gender diversity; potential H4 moderator or robustness covariate |
| `female_directors_n` | 2,774/2,856 | Raw count (0 = no female directors, not missing) |
| `director_attendance_pct` | 2,774/2,856 | Board engagement proxy |
| `director_training_pct` | 2,748/2,856 | Director capacity proxy |

**Action for pre-registration:** Add `independent_director_ratio` to primary covariate vector (H1, H2, H4). Note: not available for 2020 pre-trend base — exclude when `base_period` includes 2020.

---

## Study Design Overview

### The identification strategy

The PDF-processed universe contains **1,036 TWSE companies** that filed GRI-conformant ESG reports. Every company in this universe adopted GRI Universal Standards 2021 (GRI 3) at some point between 2021 and 2024 — there are no never-reporters and no never-treated companies in the valid analysis sample. This makes classical never-treated identification impossible.

The study therefore uses a **timing-based identification strategy**: the treatment effect is estimated by comparing companies that adopted GRI 3 in 2022 (the dominant cohort, 593 companies) against companies that had not yet adopted as of the same period (the 2023 cohort, 41 companies with pre-treatment data). The parallel trends assumption becomes: "absent GRI 3, companies adopting in 2022 and those adopting in 2023 would have had similar disclosure trajectories." This is plausible — both groups faced the same FSC regulatory environment; timing variation likely reflects administrative capacity and audit cycle scheduling rather than pre-existing quality differences. This assumption is tested empirically via the propensity score analysis in Stream B.

The **research question** is refined accordingly: does earlier GRI 3 adoption produce different materiality disclosure outcomes than delayed adoption, and does the displacement/quality-upgrade effect emerge within the first year of adoption?

### Two-tier design (preserved)

**Tier 1 — Full estimable panel (H1–H4 + NLP stream):** 495 companies with ≥1 pre- and ≥1 post-treatment observation; estimable window 2020–2024.

**Tier 2 — Semiconductor deep dive (H5):** 49 TWSE semiconductor companies (`semiconductor_cat = 1`); adoption cohorts concentrated in 2022.

### Six parallel analysis streams

| Stream | Type | Estimator | Purpose |
|---|---|---|---|
| **A** | Primary DiD | CS21 `att_gt()` | H1–H4 causal estimation |
| **B** | Pre-treatment validation | OLS propensity score | Parallel trends + covariate balance test |
| **C** | Cross-sectional intensity | OLS / Poisson | Years-since-adoption effects in 2024 snapshot |
| **D** | H3 descriptive | Logistic regression | Assurance upgrade characterisation |
| **E** | Post-adoption dynamics | Panel OLS / FE | Within-company trajectory post-GRI 3 |
| **F (NLP)** | Supplementary outcomes | CS21 + OLS | ESG content depth, language-track stratified |

Streams A, C, D, E, and F are independent and can run in parallel after data preparation (Stream B informs the parallel trends narrative but does not block estimation).

---

## Framework

**Primary estimator (Streams A, F):** Callaway-Sant'Anna (2021) — `att_gt()` in R `did` package  
**Identification:** Parallel trends conditional on covariates; staggered adoption cohorts by `gri_adoption_year`; `control_group = "notyettreated"`  
**Treatment:** First fiscal year a TWSE company reports under GRI Universal Standards 2021 (`gri_adoption_year`)  
**Estimand:** Average Treatment Effect on the Treated (ATT), aggregated via `aggte(type = "dynamic")`

**Estimable population (H1–H4, Stream A):**  
495 companies with ≥1 pre-treatment and ≥1 post-treatment observation; adoption cohorts: 9 × 2021, 445 × 2022, 41 × 2023. The 2024 cohort (307 companies) is **excluded** — only 6 companies have any pre-2024 observations, making them neither valid treated units nor meaningful controls.

**Control group cells (critical constraint to document in pre-registration):**

| ATT cell | Treated (n) | Controls (n) | Control source |
|---|---|---|---|
| g=2022, t=2020 (pre-trend t−2) | 381 | 37 | 2023 cohort companies with 2020 data |
| g=2022, t=2021 (pre-trend t−1) | 438 | 43 | 2023 cohort companies with 2021 data |
| g=2022, t=2022 (treatment year) | ~~578~~ **442** | 44 | 2023 cohort companies with 2022 data |
| g=2022, t=2023 (year +1) | 431 | ✅ **124** | g=2023 cohort companies with 2023 data (corrected 2026-06-22; prior figure of 3 was pre-2016–2019 addition) |
| g=2023, t=2022 (pre-trend t−1) | 39 | 4 | 2024 cohort companies with 2022 data |
| g=2023, t=2023 (treatment year) | 41 | ✅ **124** | g=2023 cohort companies with 2023 data (corrected 2026-06-22) |

> **Correction (2026-06-10):** The prior `treated=578` for g=2022, t=2022 was wrong — it counted all 593 g=2022 companies minus ~15 corpus-gap companies. The correct count is **442** estimable companies (those with ≥1 pre-treatment observation that also appear in 2022), which is what att_gt() actually uses.
>
> **✅ Corrected (2026-06-22) — year +1 and g=2023 treatment year:** Prior figure of 3 controls was computed before the addition of 2016–2019 historical rows, which expanded the g=2023 cohort's panel presence. After DB expansion to 5,408 rows (2016–2024), the g=2023 cohort now has **124 companies** with 2023 data, making ATT(g=2022, t=2023) fully estimable and upgradeable from exploratory to **confirmatory**. ATT(g=2022, t=2022) with n=44 controls remains the primary identified estimate; ATT(g=2022, t=2023) with n=124 is the primary post-treatment effect. **Pre-register ATT(g=2022, t=2023) as confirmatory.**

**Primary estimation sample:** g=2022 cohort. The study estimates the effect of 2022 GRI 3 adoption relative to the not-yet-adopted 2023 cohort.

---

## H1 — Primary: Displacement Effect on Material Topic Count

### Statement
> Earlier GRI 3 adoption (2022 cohort) causes a **net decrease** in the number of disclosed material topics (`n_material_topics_b`) relative to the not-yet-treated 2023 cohort, consistent with a displacement effect in which GRI 3-3's mandatory management-of-topic disclosures impose compliance costs that compress topic scope.

### Rationale
Göttsche et al. (2025) demonstrate a displacement effect for SASB financial-materiality reporting: mandatory disclosure of specific financial metrics crowds out adjacent voluntary disclosures. Under GRI 3, each material topic requires a full GRI 3-3 disclosure (topic boundary, management approach, effectiveness metrics). The incremental compliance burden per topic gives managers an incentive to narrow the topic list to a minimum defensible set. The timing-based design captures this as: companies that adopted earlier (2022) have had one full year under GRI 3-3 compliance burden, while not-yet-adopted companies (2023 cohort at t=2021) do not yet face that burden.

### Operationalisation

| Element | Detail |
|---|---|
| **Primary outcome** | `n_material_topics_b` — count of GRI 3-3 disclosure entries; **set zeros to NA before estimation** (zeros are unprocessed placeholders, not true zero-topic reports) |
| **Alternative outcome** | `n_material_topics_a` — count of unique GRI topic standards reported; consistent method across cohort years; use as robustness check |
| **Treatment indicator** | `post_gri3_it = 1` if `fiscal_year ≥ gri_adoption_year` |
| **Population** | Estimable panel: 445 treated (2022 cohort), ~43 not-yet-treated controls (2023 cohort with pre-2022 data) |
| **2024 cohort** | **Excluded** from H1–H4 estimation |
| **Estimator** | `att_gt(yname="n_material_topics_b", tname="fiscal_year", idname="twse_ticker", gname="gri_adoption_year", control_group="notyettreated", xformla=~ln_total_assets+roa+board_approved+standalone_sr+independent_director_ratio)` |
| **Note on covariates in 2020** | `board_approved` coverage is only 25% in 2020; `independent_director_ratio` coverage for 2020 is 0% (TEJ board diversity data starts 2021). Exclude both from covariate vector when base period is 2020; use `xformla=~ln_total_assets+roa+standalone_sr` for t=2020 base-period comparisons |
| **Expected sign** | **Negative ATT**: earlier adoption → reduction in `n_material_topics_b` |
| **Expected magnitude** | −2 to −5 topics relative to pre-adoption mean (mean non-zero = 15.0, SD ≈ 7) |
| **Pre-trend test** | Event-study via `aggte(type="dynamic")`; inspect t−1 coefficient (t−2 available only for subset of 2022 cohort companies with 2020 data) |
| **Robustness** | TWFE with `feols(n_material_topics_b ~ post_gri3_it + controls | twse_ticker + fiscal_year, cluster=~twse_ticker)`; Poisson / Hurdle model for count outcome; Rambachan-Roth sensitivity |

### Falsification condition
Null or positive ATT on `n_material_topics_b` rejects the displacement hypothesis. A positive ATT would suggest an expansion effect — GRI 3-3 provides structure that formalises previously undisclosed topics.

---

## H2 — Process Quality Upgrade Post-Adoption

### Statement
> Earlier GRI 3 adoption (2022 cohort) causes a significant **increase** in `process_quality_score` — the composite materiality disclosure quality index — as GRI 3's four-step DMA methodology imposes minimum process documentation standards.

### Rationale
GRI 3 mandates four specific process steps: stakeholder identification, impact identification, materiality assessment, management approach per topic. Companies adopting GRI 3 must document these steps to achieve GRI-conformant reporting, creating a regulatory floor on disclosure quality absent under GRI Standards 2016. Even if topic count decreases (H1), process quality should increase.

### Operationalisation — Primary (Structural)

| Element | Detail |
|---|---|
| **Primary outcome** | `process_quality_score` — composite of stakeholder_groups_n + engagement_methods_n + process_steps_n + board_approved + scoring_method_disclosed; **stored on 0–1 scale** (NOT 0–10 as in prior versions) |
| **Secondary structural outcome** | `gri3_four_step_compliance` (binary) — explicit compliance with four-step DMA |
| **Population** | Estimable panel; same as H1 |
| **Estimator** | CS21 as per H1; TWFE robustness: `feols(process_quality_score ~ post_gri3_it + controls | twse_ticker + fiscal_year, cluster=~twse_ticker)` |
| **Controls** | `ln_total_assets, roa, board_approved, standalone_sr` (same as H1) |
| **Expected sign** | **Positive ATT**: earlier adoption → higher `process_quality_score` |
| **Expected magnitude** | +0.05 to +0.15 on the 0–1 scale (5–15 percentage point increase) |

### Operationalisation — Supplementary NLP Outcomes (H2-NLP, pre-registered)

See dedicated NLP Supplementary Stream (Stream F) below for full specification. The following NLP outcomes are pre-registered as supplementary tests for H2:

| Outcome | Model | Track | Interpretation |
|---|---|---|---|
| `finbert_gov_pct` | FinBERT-ESG-9 | EN (bilingual companies) | Proportion of sentences classified as Governance |
| `finbert_env_pct` | FinBERT-ESG-9 | EN (bilingual companies) | Proportion classified as Environmental |
| `finbert_soc_pct` | FinBERT-ESG-9 | EN (bilingual companies) | Proportion classified as Social |
| `bge_gov_affinity` | BGE-M3 | ZH (ZH-only + bilingual) | Governance content affinity score (cosine sim) |
| `bge_env_affinity` | BGE-M3 | ZH (ZH-only + bilingual) | Environmental content affinity score |
| `bge_soc_affinity` | BGE-M3 | ZH (ZH-only + bilingual) | Social content affinity score |
| `bge_mean_sim` | BGE-M3 | ZH/bilingual | Mean similarity across all ESG topics (r=0.33 with PQS) |
| `xlmr_esg_sentences_n` | XLM-R | ZH/bilingual | Total ESG sentence count (r=0.30 with PQS) |

**Exclusion:** ESGLens is excluded from primary NLP analysis (systematic GOV over-classification: 57% GOV share vs expected ~33%). May be reported in an appendix with explicit bias caveat.

**Language-track stratification rule (mandatory):**  
- Bilingual companies (n=303 in 2021): report FinBERT results for EN track; report BGE-M3 results separately for ZH track. Do not pool across models.  
- ZH-only companies (n=183 in 2021): report BGE-M3 results only.  
- EN-only companies (n=4): too few for reliable inference; exclude from NLP stream.  
- NLP scores from different models cannot be compared or combined — each model is its own test.

**Expected sign (NLP):** Positive — ESG content density in each dimension is expected to increase post-GRI 3 adoption as reporting becomes more substantive.

### Falsification condition (H2 structural)
Null or negative ATT on `process_quality_score` would suggest boilerplate adoption — GRI 3's process requirements are not substantively implemented.

### Falsification condition (H2-NLP supplementary)
Null ATT on NLP density scores would suggest GRI 3 changes the structure of materiality disclosure without changing the substantive ESG content. Not a falsification of H2 itself — treated as a mechanistic test.

---

## H3 — Reclassified: Assurance Upgrade (Exploratory Logistic Regression)

> **⚠️ Reclassification from DiD to exploratory:** "Reasonable" assurance prevalence is ~5% (24–31 companies per year across all years). The CS21 DiD for H3 cannot be powered — detecting a meaningful shift in a 5%-prevalence outcome with 43 control companies is statistically infeasible. H3 is reclassified as an exploratory cross-sectional logistic regression.

### Statement (revised)
> Among TWSE GRI reporters, longer exposure to GRI Universal Standards 2021 (more years since adoption) is associated with a higher probability of obtaining external assurance (`has_any_assurance`) and, at the higher level, of obtaining reasonable assurance (`has_reasonable_assurance`), consistent with the credibility-signalling rationale for assurance under GRI 3.

### Operationalisation

> **2026-06-22 update (Pass DB-06):** Three assurance binary columns pre-computed in DB — use directly; no R derivation needed.

**Severity ladder (pre-specified):**
- `has_any_assurance = 0`: No assurance (39.1% in DiD window)
- `has_any_assurance = 1, big4_assurance = 0`: Non-Big4 assurance/BSI/SGS (41.0%)
- `has_any_assurance = 1, big4_assurance = 1`: Big4 assurance/PwC/EY/Deloitte/KPMG (19.9%)

| Element | Detail |
|---|---|
| **Primary outcome** | `has_any_assurance` — pre-computed binary in DB (col 193); 60.9% prevalence in DiD window; well-powered |
| **Secondary outcome** | `big4_assurance` — pre-computed binary in DB (col 194); 19.9% prevalence; tests whether earlier adoption drives shift to higher-quality (Big4) assurance |
| **Exploratory outcome** | `has_reasonable_assurance` = 1 if `assurance_level = Reasonable` (derived in R); ~4.1% prevalence — severely underpowered; report as appendix only |
| **Sample** | 2024 cross-section (1,022 rows) for primary; pooled 2021–2024 panel for robustness |
| **Treatment variable** | `years_since_adoption` = `fiscal_year − gri_adoption_year` (continuous; range 0–3 in 2024) |
| **Primary estimator** | `glm(has_any_assurance ~ years_since_adoption + ln_total_assets + roa + sasb_industry + standalone_sr, family=binomial)` |
| **Secondary estimator** | `glm(big4_assurance ~ years_since_adoption + ln_total_assets + roa + sasb_industry + standalone_sr, family=binomial)` |
| **Panel robustness** | `feglm(has_any_assurance ~ years_since_adoption + controls | twse_ticker, family=logit)` — company FE logit on pooled panel |
| **Inference** | Robust standard errors; report marginal effects at mean |
| **Pre-registration note** | H3 is **exploratory/descriptive**. No causal claims. Do not interpret ORs as treatment effects. |
| **Additional control** | `big4_financial_auditor` (col 195, 88.1% coverage) — financial audit quality control; include in robustness specifications for H3 |

---

## H4 — Heterogeneous Displacement: Operational-Impact-Intensive vs Light-Footprint Industries

### Statement
> The displacement effect on material topic count (H1) is **significantly stronger for light-footprint TWSE companies** (Technology, Services, HealthCare, Financials) than for operational-impact-intensive companies (Resource, Infrastructure, Transportation, Minerals, Food), because light-footprint firms face more discretion in topic selection under GRI 3-3's impact materiality framework.

### Rationale (unchanged)
Operational-impact-intensive companies face regulatory anchors (EPA, OSHA, FSC sector metrics) that constrain which topics they can drop. Light-footprint companies have more contestable material topic sets and thus wider scope for the displacement mechanism to operate.

### Operationalisation

| Element | Detail |
|---|---|
| **Outcome** | `n_material_topics_b` (as H1, zeros→NA) |
| **Moderator** | `impact_intensity` — derived from `sasb_industry` before regression: **High** = Resource, Infrastructure, Transportation, Minerals, Food; **Low** = Technology, Services, HealthCare, Financials; Consumer and RenewableEnergy = **sensitivity check** (run once included, once excluded) |
| **Population** | Full estimable panel, split by `impact_intensity` |
| **Estimator** | Two subsample CS21 runs (High-impact; Low-impact); triple-diff as robustness: `ATT_triple = ATT(Low) − ATT(High)` with bootstrapped SE (500 iterations) |
| **Caution** | Each subsample inherits the thin control group: ~43 controls split across two groups (~20–25 per group). If subsample CS21 fails to converge, fall back to TWFE with `impact_intensity × post_gri3_it` interaction |
| **Expected sign** | ATT(Low) < ATT(High) < 0 — both negative; light-footprint more negative |
| **Expected magnitude** | Difference of −2 to −4 additional topics between Light and High-impact industries |
| **Pre-specification** | `impact_intensity` derivation must be pre-specified and locked before any regression; Consumer/RenewableEnergy exclusion pre-registered as sensitivity check |

### Falsification condition
Null heterogeneity (ATT not significantly different across industry groups) rejects the impact-evidence moderator argument.

---

## H5 — Semiconductor Deep Dive: TDDM Diffusion via Institutional Isomorphism

> **Scope update:** Current DB contains **49 TWSE semiconductor companies** (`semiconductor_cat = 1`), not 73 as in the 2026-05-22 version. All other specifications unchanged.

### Statement
> TWSE companies with closer relationship to TSMC (supply chain tier-1 supplier or Hsinchu Science Park co-location) show **earlier and more substantial GRI 3 adoption** and higher `process_quality_score` post-adoption, consistent with TSMC's TDDM framework diffusing to peers through institutional isomorphic pressure.

### Operationalisation

| Element | Detail |
|---|---|
| **Population** | 49 TWSE semiconductor companies (`semiconductor_cat = 1`) |
| **Outcomes** | `gri_adoption_year` (earlier adoption), `process_quality_score` (higher quality post-adoption) |
| **Treatment modifier** | TSMC proximity indicator (tier-1 supplier OR Hsinchu Science Park co-location) — **requires external data coding** (TSMC Supplier Sustainability Reports 2022–2024; HSP registry) |
| **Estimator** | OLS cross-sectional on 2024 snapshot with proximity as main predictor (primary); CS21 interaction if sufficient variation exists |
| **Controls** | `ln_total_assets`, `roa`, age of GRI reporting, `board_approved` |
| **Expected sign** | TSMC-proximate companies: earlier `gri_adoption_year`, higher post-treatment `process_quality_score` |
| **Expected magnitude** | 1–2 year earlier adoption; +0.08–0.15 on `process_quality_score` (0–1 scale) |
| **Status** | **Blocked on external data** — TSMC tier-1 supplier coding not yet done |

### Falsification condition
Null difference between proximate and non-proximate companies suggests the diffusion mechanism operates through broader industry channels (TWSE regulatory pressure, industry associations) rather than supply chain proximity.

---

## Stream F (NLP) — ESG Content Depth Analysis

### Purpose
To leverage the Phase 1 + Phase 2 NLP pipeline (FinBERT-ESG-9, ClimateBERT, BGE-M3, XLM-RoBERTa-XNLI) as pre-registered supplementary outcome measures for H2, and to test whether GRI 3 adoption changes the substantive ESG content of materiality disclosures beyond structural compliance markers.

### Model selection rationale

| Model | Track | Retain? | Rationale |
|---|---|---|---|
| FinBERT-ESG-9 | EN | ✅ Primary EN | Trained on financial ESG text; reasonable E/S/G proportions |
| ClimateBERT | EN | ✅ Secondary | Narrow climate framing; useful for ENV dimension only |
| ESGLens SBERT | EN | ❌ Excluded from primary | 57% GOV share (systematic training-corpus bias); include as appendix-only |
| BGE-M3 | ZH/multilingual | ✅ Primary ZH | Most balanced E/S/G proportions; handles Chinese text natively |
| XLM-RoBERTa-XNLI | ZH/multilingual | ✅ Secondary ZH | Cross-lingual NLI; useful for binary topic classification |

### Mandatory stratification protocol

All NLP analyses must be run separately by language track. **Do not pool FinBERT and BGE-M3 scores into a single analysis.** Cross-model correlations on the same bilingual documents show r = −0.017 for GOV — the models are not measuring the same construct at the same scale.

| Company type | Primary NLP model | Secondary NLP model |
|---|---|---|
| Bilingual (both EN and ZH reports) | FinBERT-ESG-9 (EN report) | BGE-M3 (ZH report) — reported separately |
| ZH-only | BGE-M3 | XLM-RoBERTa-XNLI |
| EN-only (n=4) | FinBERT-ESG-9 | Exclude from NLP stream (n too small) |

### Outcome variables

| Variable | Definition | Track |
|---|---|---|
| `finbert_gov_density` | % sentences classified GOV by FinBERT-ESG-9 | EN |
| `finbert_env_density` | % sentences classified ENV | EN |
| `finbert_soc_density` | % sentences classified SOC | EN |
| `bge_gov_density` | % sentences classified GOV by BGE-M3 | ZH |
| `bge_env_density` | % sentences classified ENV by BGE-M3 | ZH |
| `bge_soc_density` | % sentences classified SOC by BGE-M3 | ZH |
| `climatebert_climate` | % sentences flagged as climate-relevant | EN |

### Estimator

Same CS21 framework as H2: `att_gt(yname="finbert_gov_density", tname="fiscal_year", idname="twse_ticker", gname="gri_adoption_year", control_group="notyettreated", xformla=~ln_total_assets+roa+standalone_sr)`

**Stratify runs by language_track** — run EN models on bilingual company-years only; run ZH models on ZH-only company-years only. Report results in separate tables; do not aggregate across tracks.

### Convergent validity pre-check (before pre-registration of NLP outcomes)
Run Pearson correlation between `process_quality_score` and each NLP density score for the 2024 cross-section. If r < 0.05 for all NLP measures, the NLP pipeline is not capturing the same construct as the structural process quality measure — report divergence as a finding (structural compliance ≠ substantive content depth), not a failure.

### Expected sign
Positive — GRI 3 adoption is expected to increase ESG sentence density across dimensions as reports become more topically comprehensive under the DMA framework. GOV dimension may show the clearest effect (GRI 3's management approach requirements are governance-heavy).

---

## Summary Table — All Hypotheses and Streams

| Item | Stream | Population | Estimand | Primary outcome | Expected sign | Estimator |
|---|---|---|---|---|---|---|
| **H1** (primary) | A | 445 treated, 43 controls | ATT | `n_material_topics_b` | − (decrease) | CS21 |
| **H2** (structural) | A | 445 treated, 43 controls | ATT | `process_quality_score` (0–1) | + (increase) | CS21 + TWFE |
| **H2-NLP** (supplementary) | F | Stratified by language track | ATT | `finbert_gov_density`, `bge_gov_density` | + (increase) | CS21 (stratified) |
| **H3** (exploratory) | D | 2024 cross-section; pooled panel | Association | `has_any_assurance` | + (positive) | Logistic regression |
| **H4** (heterogeneity) | A | High-impact vs Low-impact subsamples | ATT diff | `n_material_topics_b` | ATT(Low) < ATT(High) | Subsample CS21 |
| **H5** (semiconductor) | A | 49 semi companies | ATT diff by proximity | `process_quality_score` | Proximate higher | OLS / CS21 interaction |
| **Stream B** | B | Full estimable panel | Covariate balance | `ln_total_assets, roa` pre-trends | Parallel trends test | OLS propensity + event-study |
| **Stream C** | C | 2024 cross-section (1,022 rows) | Association | `process_quality_score`, `n_material_topics_b` | + / − by `years_since_adoption` | OLS / Poisson |
| **Stream E** | E | 2022 cohort post-adoption (3 years) | Within-company dynamics | `process_quality_score`, `n_material_topics_b` | Learning curve trajectory | Panel OLS / FE |

---

## Pre-Registration Checklist (OSF — must complete before any att_gt() call)

> **OSF draft prepared:** `osf-preregistration_twse-materiality_2026-06-22.md` — upload to OSF before running any inferential test.

- [x] Confirm `idname = "twse_ticker"` (not `company_id`) in all `att_gt()` calls
- [x] Exclude 2024 cohort from H1–H4 treatment and control pool — db_did.csv generated with g=2024 excluded (307 companies, 323 rows)
- [x] Pre-specify `impact_intensity` derivation: High = {Resource, Infrastructure, Transportation, Minerals, Food}; Low = {Technology, Services, HealthCare, Financials}; Consumer + RenewableEnergy = sensitivity — **locked in DB col `impact_intensity`**
- [x] Pre-specify `board_approved` and `independent_director_ratio` exclusion from covariate vector when base period = 2020
- [x] Confirm `process_quality_score` is 0–1 scale; expected ATT +0.05 to +0.15
- [x] Classify H3 as exploratory (no causal claim); primary outcome `has_any_assurance`
- [x] Register NLP supplementary stream (Stream F) with language-track stratification protocol and ESGLens exclusion
- [x] Register convergent validity check (NLP density vs `process_quality_score`) as a pre-analysis step
- [x] zeros→NA data prep for `n_material_topics_b` — Pass DB-03 complete (0 zeros remain in DiD window)
- [x] Register `control_group = "notyettreated"` — control pool sizes documented in pre-reg §4
- [x] ~~Pre-register ATT(g=2022, t=2023) as exploratory~~ → **✅ UPGRADED TO CONFIRMATORY** (NTT pool = 124, corrected 2026-06-22; prior figure of 3 was pre-DB-expansion)
- [x] Register Rambachan-Roth sensitivity analysis as mandatory robustness check
- [x] Register Stream B propensity score analysis — ROC-AUC > 0.70 → pre-weight CS21
- [x] Register H5 as supplementary, blocked on TSMC proximity data
- [x] `n_material_topics_a` — **dropped from primary analysis** (100% identical to `n_material_topics_b`, confirmed 2026-06-22); column retained in DB; document in footnote
- [x] `board_esg_committee` — **already absent from DB** (dropped in prior restructure); confirmed 2026-06-22
- [x] `sasb_industry` filled for all DiD window rows — **Pass DB-04** (37 rows, 20 tickers; 2026-06-22; 0 missing remaining)
- [x] `twse_cgq_score` integrated (Pass DB-05) — robustness covariate; 95.1% DiD window coverage; ordinal 1–7; NOT primary spec (endogeneity risk with GRI adoption)
- [x] H3 assurance columns pre-computed (Pass DB-06): `has_any_assurance` (primary; 60.9%), `big4_assurance` (secondary; 19.9%), `big4_financial_auditor` (control; 88.1%) — all in DB; no R derivation needed
- [ ] **Upload pre-registration to OSF** → obtain DOI → record in osf-preregistration file

---

## Robustness Checks (pre-registered, not primary)

1. `control_group = "nevertreated"` — will return no result (0 never-treated); document as a confirmation of the all-adopted universe
2. Bacon-Goodman decomposition diagnostic
3. Poisson / Hurdle count model for `n_material_topics_b`
4. TWFE with `twse_ticker + fiscal_year` FE as CS21 alternative
5. Rambachan-Roth sensitivity analysis on parallel trends violations
6. H4 TWFE with `impact_intensity × post_gri3_it` interaction if subsample CS21 fails to converge
7. Stream C with `sasb_industry` FE to partial out industry effects on years-since-adoption association

---

*Original: hypothesis-generation | 2026-05-22*  
*Revised: research-coordinator | 2026-06-10 — timing-based ID, NLP integration, H3 reclassification, corrected scale, 2024 cohort exclusion, all six streams formalised*
