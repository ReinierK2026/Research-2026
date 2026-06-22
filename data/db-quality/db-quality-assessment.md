# DB Quality Assessment — GRI 3 Materiality DiD Study
**Created:** 2026-06-10  
**Last updated:** 2026-06-22  
**File assessed:** twse-research-database.csv  
**Purpose:** Evaluate readiness of the current DB against the requirements of H1–H5 (Callaway-Sant'Anna DiD)

> ⚠️ **This is the single canonical quality assessment.** Always update this file in place — do not create versioned copies. Increment `Last updated` on every edit.

---

## 1. Panel Overview

| Metric | Value |
|---|---|
| Total rows (company-years) | **5,408** *(was 3,283)* |
| Unique companies (twse_ticker) | **1,226** *(was 1,036)* |
| Fiscal years covered | **2016–2024** *(was 2020–2024)* |
| Panel balance | **Unbalanced** — see below |
| **Total columns** | **192** *(was 190)* (Block A: identifiers 13; B: GRI process 17; C: materiality 32; D: NLP outputs × 4 models 36; F: financials 81; G: ESG ratings 13) |

> **Note on company_id:** The `company_id` field is a ticker-year compound key (e.g., `1101_2024`), not a company identifier. Use `twse_ticker` as `idname` in `att_gt()`.

> **⚠️ Historical years (2016–2019):** The DB now contains 2,125 historical rows. However, **`n_material_topics_b`, `process_quality_score`, `board_approved`, and `standalone_sr` are all 0 or null for 2016–2019** — these years have not been NLP-coded. They cannot be used as additional pre-treatment periods for the DiD. The effective pre-trend window remains **2020–2021**.

### Panel balance by company

| Observations | Companies |
|---|---|
| 1 year only | **334** |
| 2 years | 116 |
| 3 years | 170 |
| 4 years | 164 |
| 5 years | 26 |
| 6 years | 34 |
| 7 years | 32 |
| 8 years | 32 |
| All 9 years | 318 |

Single-obs companies (334) must be dropped for DiD. Only **1** of the 334 is from the g=2022 cohort — the dominant treatment group is unaffected.

### Rows per year

| Year | Rows | Notes |
|---|---|---|
| 2016 | 483 | Historical only; NLP vars = 0/null |
| 2017 | 512 | Historical only; NLP vars = 0/null |
| 2018 | 550 | Historical only; NLP vars = 0/null |
| 2019 | 580 | Historical only; NLP vars = 0/null |
| 2020 | 427 | DiD window; full covariate coverage |
| 2021 | 491 | DiD window; full covariate coverage |
| 2022 | 632 | Treatment year |
| 2023 | 711 | Year +1 |
| 2024 | 1,022 | Year +2 |

---

## 2. Treatment Variable: gri_adoption_year

| Cohort | Companies in DB |
|---|---|
| 2021 | 10 |
| 2022 | 593 |
| 2023 | 126 |
| 2024 | 307 |
| **Never-treated** | **0** |

**Critical finding — no never-treated group.** Every company in the DB has a `gri_adoption_year`. The CS21 estimator with `control_group = "nevertreated"` would have zero control units. Only `control_group = "notyettreated"` is viable.

---

## 3. Control Group (🔴 CRITICAL — updated 2026-06-22)

**What CS21 actually uses as controls for each cell** (`g' > g`, companies with a fiscal_year == t observation):

| ATT cell | Treated (with t obs) | NTT Controls (g'>g, with t obs) | Estimability |
|---|---|---|---|
| g=2022, t=2020 (pre-trend t−2) | 381 | **37** | ✅ pre-trend test viable |
| g=2022, t=2021 (pre-trend t−1) | 438 | **43** | ✅ pre-trend test viable |
| g=2022, t=2022 (treatment year) | **578** | **44** | ✅ primary ATT cell |
| g=2022, t=2023 (year +1) | 577 | **124** *(was 3!)* | ✅ NOW ESTIMABLE |
| g=2022, t=2024 (year +2) | 580 | 432 | ✅ well-powered |
| g=2023, t=2022 (pre-trend t−1) | 40 | 4 | ⚠️ thin |
| g=2023, t=2023 (treatment year) | 121 | 3 | ⚠️ exploratory only |
| g=2023, t=2024 (year +1) | 125 | 307 | ✅ estimable |

> **🆕 Major improvement (2026-06-22):** The NTT control pool at t=2023 for g=2022 has grown from **3 → 124**. This is because the g=2023 cohort (126 companies) now has sufficient 2023 observations to serve as not-yet-treated controls for the g=2022 cohort. **ATT(g=2022, t=2023) is now properly estimable** and can be upgraded from exploratory to confirmatory for the year-+1 effect. This is a substantial identification improvement.

> **Still thin:** ATT(g=2023, t=2023) has only 3 controls and remains exploratory. Drop g=2023 as a treated cohort for H1–H4 primary estimates.

The effective study remains a comparison of the **2022 cohort vs 2023+2024 cohorts as NTT controls**, but the year-+1 estimate is now well-supported.

**Estimable panel** (g=2022 companies with ≥1 pre-treatment AND ≥1 post-treatment observation): **454 companies**, 3,525 rows.

---

## 4. Outcome Variables

### H1 — n_material_topics_b (displacement effect)

| Metric | Value |
|---|---|
| Total rows | 5,408 |
| Null | 2,125 (39.3%) — entirely the 2016–2019 historical rows |
| **Zero (placeholders — must → NA)** | **286 (5.3%)** ⚠️ NEW zeros in recently-added rows |
| Valid (non-zero, non-null) | 2,997 (55.4%) |
| Valid distribution | min=1, max=44, mean≈17.0, median=17 |

> **⚠️ ACTION REQUIRED:** 286 zeros remain in the 2020–2024 rows (likely from the 190 newly-added companies not yet NLP-processed). These must be set to `NA` before `att_gt()`. Prior Pass 87 resolved zeros for the original 3,283 rows; newly added rows need the same treatment.

Valid coverage by year (2020–2024):

| Year | Valid | Zero→NA | Null | % valid of total rows |
|---|---|---|---|---|
| 2020 | 364 | 63 | 0 | 85.2% |
| 2021 | 440 | 51 | 0 | 89.6% |
| 2022 | 586 | 46 | 0 | 92.7% |
| 2023 | 660 | 51 | 0 | 92.8% |
| 2024 | 947 | 75 | 0 | 92.7% |

Pre-treatment coverage in estimable g=2022 panel:
- t=2020: 325/381 companies have valid `n_material_topics_b` (85.3%)
- t=2021: 393/438 companies (89.7%)

**Severity:** 🟡 — zeros from original corpus resolved (Pass 87); ⚠️ new zero batch needs NA conversion before any regression.

> **Schema note:** `n_material_topics_a` and `n_material_topics_b` remain **identical** (correlation = 1.000 across all 2,997 valid rows). Drop `n_material_topics_a` or document the distinction before `att_gt()`.

---

### H2 — process_quality_score (quality upgrade)

| Metric | Value |
|---|---|
| Non-null | 3,208 / 5,408 (59.3%) |
| Non-zero | 3,173 (58.7%) |
| **Scale** | **0–1 (not 0–10 as in hypothesis doc)** |
| min | 0.000 |
| max | 1.000 |
| mean | 0.413 |
| median | 0.400 |

Coverage is 59.3% overall because 2016–2019 rows have zero process_quality_score. In the estimable g=2022 panel: 2,085/3,525 (59.1%) — but pre-treatment years (2020–2021) have 327/381 and 438/438 valid rows respectively; strong for parallel trends.

**Scale discrepancy:** hypothesis document specifies "0–10 composite scale" with "+1–2 points" expected magnitude. Actual scale is 0–1; expected DiD coefficient: **+0.05 to +0.15**.

**Severity:** 🟡 — coverage good; scale in hypothesis doc needs updating before OSF.

---

### H3 — assurance_level (upgrade effect)

| Year | Reasonable | Limited | None/NA |
|---|---|---|---|
| 2020 | 24 | 239 | 164 (38%) |
| 2021 | 24 | 305 | 162 (33%) |
| 2022 | 27 | 379 | 226 (36%) |
| 2023 | 30 | 424 | 257 (36%) |
| 2024 | 31 | 516 | 475 (46%) |

"Reasonable" assurance in the estimable post-treatment panel: **81/1,330** (6.1%). At ~5% baseline prevalence, detecting a meaningful shift requires a very large treatment effect. **H3 remains severely underpowered for the "Reasonable" outcome.**

`has_any_assurance` (Limited OR Reasonable vs None):

| Year | None | Has assurance |
|---|---|---|
| 2020 | 164 | 263 |
| 2021 | 162 | 329 |
| 2022 | 226 | 406 |
| 2023 | 257 | 454 |
| 2024 | 475 | 547 |

`has_any_assurance` has much more variation (~60% prevalence) and is the recommended H3 outcome.

**Severity:** 🔴 for "Reasonable" upgrade; 🟡 for `has_any_assurance` binary.

---

## 5. Covariates

| Variable | Overall | 2016–19 | 2020 | 2021 | 2022 | 2023 | 2024 |
|---|---|---|---|---|---|---|---|
| `ln_total_assets` | 92% | 92–95% | 100% | 99% | 89% | 89% | 87% |
| `roa` | 92% | 92–95% | 100% | 99% | 89% | 89% | 87% |
| `leverage` | 92% | 92–95% | 100% | 99% | 89% | 89% | 87% |
| `board_approved` | — | **0%** | **25%** | 100% | 98% | 100% | 100% |
| `standalone_sr` | — | **0%** | 100% | 100% | 100% | 100% | 100% |
| `firm_age` | **61%** | varies | varies | varies | varies | varies | varies |
| `rd_intensity` | **54%** | varies | varies | varies | varies | varies | varies |

**board_approved in 2020:** Only 25% coverage — exclude from covariate vector when using 2020 as pre-trend period. Use full spec for t=2021 onward only.

**firm_age / rd_intensity:** New covariates available but at 54–61% coverage. Can be used in robustness regressions but not in primary spec where missingness could drop observations.

**`independent_director_ratio` — data pipeline break (confirmed):**
0% coverage for 2022–2024. Do not include in any covariate specification — it will silently drop all post-treatment observations from the model.

**`tesg_score` — partial coverage:**

| Year | Coverage |
|---|---|
| 2020 | 426/427 (99.8%) |
| 2021 | 487/491 (99.2%) |
| 2022 | 629/632 (99.5%) |
| 2023 | **0/711** |
| 2024 | **0/1,022** |

`tesg_score` is available for 2020–2022 only. Cannot be used as a covariate for post-2022 years. Suitable as a pre-treatment control variable (lagged value at t=2021) or for heterogeneity analysis in Stream F.

---

## 6. Moderator Variables (H4, H5)

| Variable | Coverage | Notes |
|---|---|---|
| `sasb_industry` | 96.9% (5,240/5,408) | 168 missing rows; 11 industries |
| `semiconductor_cat` | 100% | 49 unique companies |

**H4 — impact intensity (sasb_industry):**

| Impact group | Industries | g=2022 estimable companies |
|---|---|---|
| High-impact | Resource, Infrastructure, Transportation, Minerals, Food | **182** |
| Low-impact | Technology, Services, HealthCare, Financials | **216** |
| Borderline | Consumer, RenewableEnergy | 54 |

H4 subsample CS21 runs inherit the thin NTT control pool (split further across subgroups). The Low-impact subsample has the most treated firms but the same ~44-company NTT pool.

**H5 — semiconductors:** 49 unique companies (not 73 as in hypothesis doc). TSMC proximity indicator absent — requires external coding. Semiconductor companies across years: 34 (2020), 45 (2021), 48 (2022), 36 (2023), 37 (2024).

---

## 6b. Additional / New Outcome Variable Candidates

| Variable | Coverage (2020–24) | Scale | DiD utility |
|---|---|---|---|
| `topic_depth_score` | 3,258/5,408 (60%) | 0–0.76, mean=0.52 | ✅ Robustness for H2 |
| `gri3_four_step_compliance` | 3,282/5,408 (61%) | Count 0–4, mean=1.35 | ✅ H1 process robustness |
| `gri_content_index_completeness` | 3,283/5,408 (61%) | Bimodal: 0 or ≈0.88 | 🟡 Treat as binary; limited variation |
| `double_materiality_mentioned` | 2,846/5,408 (53%) | Binary, 8.7% prevalence | 🟡 Low but estimable; mechanism var |
| `dm_methodology_disclosed` | ~90% | Binary, 84% = 1 | ⚠️ Ceiling effect pre-adoption; limited DiD utility |
| `gri_101_applied` | 3,283 rows | **All zeros** | ❌ Not yet coded |
| `gri_new_climate_energy_adopted` | 3,283 rows | **All zeros** | ❌ Not yet coded |
| `board_esg_committee` | **0%** | Empty column | ❌ Do not reference |

**NLP model outputs (Block D — FinBERT, ESGLens, BGE, XLM-R):**

| Model | Coverage |
|---|---|
| ESGLens (eslens_*) | 1,877/5,408 (35%) |
| FinBERT (finbert_*) | 1,877/5,408 (35%) |
| BGE (bge_*) | 2,547/5,408 (47%) |
| XLM-R (xlmr_*) | 2,593/5,408 (48%) |

Coverage is concentrated in 2022–2024. Pre-trend years (2020–2021) are sparse across all four models. Insufficient for DiD pre-trend testing; use for cross-sectional robustness (Stream F) only.

---

## 7. Summary: Readiness by Hypothesis

| Hypothesis | Outcome | Estimable n (g=2022 treated) | NTT Controls | Severity |
|---|---|---|---|---|
| **H1** | n_material_topics_b | 578 (t=2022) / 577 (t=2023) | 44 @ t=2022; **124 @ t=2023** ✅ | 🟡 286 zeros still need →NA; otherwise good |
| **H2** | process_quality_score | ~454 | 43–44 | 🟡 Scale wrong in hypothesis doc (0–1 not 0–10) |
| **H3** | assurance_level (Reasonable) | ~454 | 43–44 | 🔴 ~5% base rate; severely underpowered |
| **H3 alt** | has_any_assurance | ~454 | 43–44 | 🟢 ~60% prevalence; much better powered |
| **H4** | n_mat_topics × sasb_industry | High=182, Low=216 | ~15–30 each | 🟠 Subsample thins control pool further |
| **H5** | process_quality_score (semis) | 49 companies | n/a | 🟡 n=49 not 73; no TSMC proximity data |

---

## 8. Pre-Registration Adjustments Required

Before OSF submission:

1. **Control group description:** Change to "primary comparison: g=2022 cohort (578 treated at t=2022) vs g=2023 and g=2024 cohorts as NTT controls (n=44 at t=2022, n=124 at t=2023). Exclude 2024 cohort from treated units (no pre-treatment baseline)."

2. **Year +1 effect:** Upgrade ATT(g=2022, t=2023) from exploratory to **pre-registered confirmatory** — NTT pool now 124 (was 3). Remove the prior "exploratory" caveat.

3. **process_quality_score scale:** Replace "0–10 scale, +1–2 points" with "0–1 normalized scale; expected magnitude: +0.05 to +0.15."

4. **H3 primary outcome:** Demote "Reasonable assurance" to exploratory; register `has_any_assurance` (binary: Limited OR Reasonable vs None) as the primary H3 outcome.

5. **board_approved at t=2020:** Exclude from covariate vector when pre-trend period = 2020 (25% coverage). Full covariate spec applies for t=2021 onward.

6. **H5 semiconductor n:** Correct from 73 to 49.

7. **idname:** `idname = "twse_ticker"` (not `"company_id"`) in all `att_gt()` calls.

8. **`n_material_topics_a` redundancy:** Drop `_a` column or document that `n_material_topics_b` is the H1 outcome. Both are currently identical (correlation = 1.000).

9. **Robustness checks:** Pre-register: (R1) BJS imputation (`didimputation::did_imputation`); (R2) Wooldridge extended TWFE (`fixest::feols` with cohort × time interactions); (R3) Rambachan-Roth HonestDiD (`HonestDiD::createSensitivityResults`) — non-negotiable given only 44 NTT controls at treatment year. Full R code in `research-execution-plan_2026-06-10.md` Stream A.

---

## 9. Immediate Action Items (before att_gt)

| Priority | Action | Status |
|---|---|---|
| ✅ #1 | Set `n_material_topics_b = NA` where value = 0 (original corpus) | **DONE** (Pass 87) |
| ✅ #1b | GRI extraction quality refresh (bilingual union, gri_tables retired) | **DONE** (Pass 67) |
| 🔴 #2 | Set `n_material_topics_b = NA` for 286 zeros in newly-added rows | **PENDING** |
| 🔴 #3 | Update OSF pre-registration text (all items in §8 above) | **PENDING** |
| 🟠 #4 | Upgrade ATT(g=2022, t=2023) from exploratory to confirmatory in pre-reg | **PENDING** |
| 🟠 #5 | Exclude `independent_director_ratio` from all covariate specs | **PENDING** |
| 🟡 #6 | Fill sasb_industry for 168 missing rows | PENDING |
| 🟡 #7 | Drop `n_material_topics_a` (redundant) from regression code | PENDING |
| 🟡 #8 | Exclude `board_esg_committee` from all analyses (empty column) | PENDING |
| 🟡 #9 | Investigate 286 remaining zeros — are they new-company rows or re-introduced? | PENDING |
| 🟡 #10 | Code TSMC proximity indicator for H5 (external data required) | PENDING |
| ℹ️ #11 | Note: `tesg_score` available 2020–2022 only; use as lagged pre-treatment control only | PENDING |

---

*Generated: 2026-06-10 | Last updated: 2026-06-22 (data:explore-data — DB expanded to 5,408 rows / 1,226 cos / 192 cols / 2016–2024; NTT@t=2023 corrected 3→124; estimable panel 454 cos; 286 new zeros flagged; tesg_score gap documented; firm_age/rd_intensity added; gri_101/new_climate all-zero noted)*
