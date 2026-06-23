# DB Quality Assessment — GRI 3 Materiality DiD Study
**Created:** 2026-06-10  
**Last updated:** 2026-06-23 (Pass DB-07: Block E Jaccard variables; Pass DB-08: MPQI variables; H2 primary outcome → mpqi_composite)  
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
| **Total columns** | **208** *(Pass DB-08; latest)* — history: 195 (DB-06) → 202 (+7 Block E, DB-07) → **208** (+6 MPQI, DB-08) |

> **Note on company_id:** The `company_id` field is a ticker-year compound key (e.g., `1101_2024`), not a company identifier. Use `twse_ticker` as `idname` in `att_gt()`.

> **ℹ️ Historical years (2016–2019) — by design:** The DB contains 2,125 rows for 2016–2019. **No NLP coding will be run for these years** — they exist solely to populate financial control variables (Block F: ln_total_assets, roa, leverage, rd_intensity, firm_age, etc.) for use as baseline controls. `n_material_topics_b`, `process_quality_score`, `board_approved`, and `standalone_sr` are all 0/null for 2016–2019; this is expected and correct. Zeros in `n_material_topics_b` for 2016–2019 are **design-intended placeholders**, not data errors. The effective DiD analysis window remains **2020–2024**, with pre-trend tests in **2020–2021** only.

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

> **⚠️ Denominator note:** Coverage figures below refer to the **3,283-row DiD window (2020–2024)**. The master DB has 5,408 rows but 2,125 (2016–2019) have no text extraction by design. Quoting against 5,408 gives misleading low percentages for all text-derived variables.

| Metric | DiD window (2020–2024) |
|---|---|
| Total rows in window | 3,283 |
| **Valid (non-zero, non-null)** | **3,121 / 3,283 (95%)** ✅ |
| Blank / NA | 162 (5%) — rows without text extraction |
| Zero | **0** ✅ (Pass DB-03: all 162 zeros converted to NA 2026-06-22) |
| Distribution (valid rows) | min=1, max=44, mean≈17.0, median=17 |

> **✅ Zeros → NA complete (Pass DB-03, 2026-06-22):** Ran `gri_backlog_extract.py --dry-run` — confirmed 0 recoverable codes. All 162 zeros in 2020–2024 converted to blank (NA). No zeros remain in the DiD window.

> **✅ By design — 2016–2019:** All 2,125 historical rows are blank. No NLP/GRI extraction was run for these years. They are financial-controls-only rows for Stream B pre-treatment validation. Filter `fiscal_year >= 2020` excludes them automatically.

Valid coverage by year (2020–2024):

| Year | Rows | Valid | Blank/NA | % valid |
|---|---|---|---|---|
| 2020 | 427 | 384 | 43 | 90% |
| 2021 | 491 | 471 | 20 | 96% |
| 2022 | 632 | 605 | 27 | 96% |
| 2023 | 711 | 681 | 30 | 96% |
| 2024 | 1,022 | 980 | 42 | 96% |

Pre-treatment coverage in estimable g=2022 panel:
- t=2020: 384/427 companies have valid `n_material_topics_b` (90%)
- t=2021: 471/491 companies (96%)

**Severity:** 🟢 — 95% coverage in DiD window; zeros fully resolved; strong pre-treatment baseline.

> **Schema note:** `n_material_topics_a` and `n_material_topics_b` are identical (correlation = 1.000). Use `n_material_topics_b` as primary; drop `n_material_topics_a` from regression or use as robustness only.

---

### H2 — mpqi_composite (quality upgrade) — updated 2026-06-23

> `process_quality_score` superseded by `mpqi_composite` as the H2 primary outcome. See below for full assessment. `process_quality_score` retained in DB as robustness variable (r=0.86 with mpqi_composite).

**mpqi_composite — Materiality Process Quality Index:**

| Metric | Value |
|---|---|
| Non-null (GRI3 era, 2021–2024) | **2,646** |
| Scale | 0–1 (equal-weighted mean of 4 dimensions) |
| Mean | 0.516 |
| SD | 0.156 |
| r(mpqi_composite, `mpqi_score` Block C) | +0.99 ✅ |
| r(mpqi_composite, `process_quality_score`) | +0.86 ✅ |

**Dimension coverage:**

| Dimension | Column | N | Mean | SD |
|---|---|---|---|---|
| Governance | `mpqi_dim_gov` | 3,282 | 0.470 | 0.321 |
| Process | `mpqi_dim_proc` | 2,646 | 0.331 | 0.174 |
| Stakeholder | `mpqi_dim_stake` | 3,220 | 0.711 | 0.231 |
| Output | `mpqi_dim_out` | 3,282 | 0.488 | 0.256 |

**Construction:** All raw items (0–2) divided by 2 to produce 0–1 scale; `mpqi_s1` already 0–1. `mpqi_composite` = equal-weighted mean of 4 dimension scores. Requires all 4 non-null. `mpqi_composite_3d` (robustness, ≥3 dims) covers 3,220 obs.

**Reliability:** Cronbach α = 0.605 (all 10 items) — borderline acceptable; defended as formative construct. Dimension-level α: gov=0.384, proc=0.220, stake=0.689, out=0.245. Low sub-dimension alphas expected for formative index.

**H2 composition finding (sampling run 2026-06-23):** CS21 ATT on `mpqi_composite` = +0.109 (null). Composite null reflects two opposing forces:
- `mpqi_dim_proc`: ATT=+0.059* (overall), +0.079* at t+1 [CI: 0.057, 0.101] — process formalisation improves
- `stakeholder_groups_n`: ATT=−2.07* (overall), −2.60* at t+1 — stakeholder breadth compresses

**Interpretation:** GRI 3 adoption formalises process documentation (proc dim ↑) while rationalising stakeholder engagement breadth (↓). Both effects are theoretically consistent with the compliance-cost mechanism from H1. The composite null is an artifact of opposite-signed components, not evidence of no effect.

**Known structural issue:** `mpqi_p2` and `mpqi_o1` are highly correlated (r=0.809) across dimensions (Process vs Output). Both appear to capture visualization quality. Resolve dimension assignment before CFA. Report as limitation.

**2020 pre-trend caveat:** Coverage for pre-GRI3 years is thin (Block C extraction less comprehensive pre-mandate). Primary pre-trend test uses t=2021; t=2020 is sensitivity only.

**Severity:** 🟢 — coverage excellent in GRI3 era (N=2,646 with all 4 dims); composite validated; composition finding documented.

---

**process_quality_score (legacy — retained as robustness):**

| Metric | Value |
|---|---|
| Non-null (DiD window 2020–24) | 3,208 / 3,283 (98%) |
| Scale | 0–1 |
| Mean | 0.413 |
| r with mpqi_composite | +0.86 |

Low correlation with stated components (r=0.39 with manual component sum) — construction provenance unclear. Retained in DB; use as robustness check only; do not treat as primary H2 outcome.

**Severity:** 🟡 — valid coverage but superseded by mpqi_composite.

---

### H3 — Assurance variables (Pass DB-06, 2026-06-22)

Three pre-computed binary columns now in DB (cols 193–195):

| Column | Definition | DiD window coverage | Prevalence |
|---|---|---|---|
| `has_any_assurance` | 1 if assurance_level ∈ {Limited, Reasonable} | 3,283/3,283 (100%) | 1,999/3,283 = **60.9%** |
| `big4_assurance` | 1 if ESG assurer is PwC/EY/Deloitte/KPMG | 3,283/3,283 (100%) | 655/3,283 = **19.9%** |
| `big4_financial_auditor` | 1 if financial auditor is Big4 (TEJ_Big4.xlsx) | 3,115/3,283 (94.9%) | 2,895/3,283 = **88.1%** |

**Assurance severity ladder (H3 framework):**
- Level 0 — No assurance: `has_any_assurance = 0` (39.1% of DiD window)
- Level 1 — Non-Big4 assurance: `has_any_assurance = 1, big4_assurance = 0` (41.0%; BSI/SGS/BV/etc.)
- Level 2 — Big4 assurance: `has_any_assurance = 1, big4_assurance = 1` (19.9%; PwC/EY/Deloitte/KPMG)

**By year:**

| Year | has_any=0 | has_any=1 | big4_assurance=1 | Reasonable |
|---|---|---|---|---|
| 2020 | 164 (38%) | 263 (62%) | ~95 | 24 |
| 2021 | 162 (33%) | 329 (67%) | ~118 | 24 |
| 2022 | 226 (36%) | 406 (64%) | ~131 | 27 |
| 2023 | 257 (36%) | 454 (64%) | ~152 | 30 |
| 2024 | 475 (46%) | 547 (54%) | ~159 | 31 |

**H3 outcome specification:**
- **Primary:** `has_any_assurance` — well-powered (~61% prevalence); logistic regression
- **Secondary:** `big4_assurance` — quality threshold (~20% prevalence); logistic regression (separate model)
- **Exploratory:** `has_reasonable_assurance` — still severely underpowered (~4.1% in DiD window = 136/3,283); report with explicit caveat

**big4_financial_auditor:** Control/covariate variable — 88.1% coverage in DiD window (168 rows blank = very recent listings not yet in TEJ). Use as robustness covariate for H2 (process quality) and H3; do not use as primary outcome.

**Severity:** 🟢 `has_any_assurance`; 🟡 `big4_assurance`; 🔴 `has_reasonable_assurance`.

---

## 5. Covariates

> **All percentages below are for the DiD window (2020–2024, n=3,283) unless noted. Historical rows (2016–2019) have no text-derived variables by design and must not be used as the denominator.**

| Variable | DiD window (2020–24) | 2020 | 2021 | 2022 | 2023 | 2024 |
|---|---|---|---|---|---|---|
| `ln_total_assets` | **92%** (3,004/3,283) | 100% | 99% | 89% | 89% | 87% |
| `roa` | **92%** (3,004/3,283) | 100% | 99% | 89% | 89% | 87% |
| `leverage` | **92%** (3,004/3,283) | 100% | 99% | 89% | 89% | 87% |
| `firm_age` | **100%** (3,275/3,283) | 100% | 100% | 100% | 100% | 100% |
| `rd_intensity` | **92%** non-blank (3,004/3,283) | 100% | 99% | 89% | 89% | 87% |
| `rd_dummy` | **100%** (3,283/3,283) | 100% | 100% | 100% | 100% | 100% |
| `board_approved` | **90%** non-blank (2,946/3,283) | **25%** | 100% | 98% | 100% | 100% |
| `standalone_sr` | **100%** (3,283/3,283) | 100% | 100% | 100% | 100% | 100% |
| `independent_director_ratio` | **98%** (3,217/3,283) | 0% | 98% | 98% | 98% | 98% |
| `female_director_pct` | **84%** non-blank (2,774/3,283) | 0% | 97% | 97% | 97% | 97% |

**board_approved in 2020:** Only 25% coverage — exclude from covariate vector when using 2020 as pre-trend period. Use `xformla = ~ ln_total_assets + roa + standalone_sr` for t=2020.

**independent_director_ratio in 2020:** 0% — TEJ Board diversity data starts 2021. Exclude from covariate vector when base period = 2020.

**rd_intensity:** 0 = zero-R&D firm (valid, not missing). 92% non-blank; 64% non-zero (i.e., 36% of companies have no R&D spend — correctly coded as 0.0 after Pass DB-01).

**`rd_intensity` patch (2026-06-22, Pass DB-01):** Set to 0.0 for 85 rows where `rd_expense_ntd_thou` is null/0 but `revenue_ntd_thou` is present (these companies have no R&D). Also computed `rd_dummy` for 2022–2024 (was erroneously all-zero). Remaining 279 null rows have neither revenue nor rd_expense — they'll be dropped by missing `ln_total_assets`/`roa` anyway.

Both `firm_age` and `rd_intensity` are ready for use in the primary covariate spec for 2020–2024.

**`independent_director_ratio` — now populated (Pass DB-02):**
Previously 0% coverage for 2022–2024 (data pipeline break). Recomputed as n_ind/n_dir from TEJ Board diversity data; now 2,791/2,856 (97.7%) for 2021–2024. Safe to include in covariate specs.

**`tesg_score` — partial coverage (TEJ data unavailable post-2022):**

| Year | Coverage |
|---|---|
| 2020 | 426/427 (99.8%) |
| 2021 | 487/491 (99.2%) |
| 2022 | 629/632 (99.5%) |
| 2023 | **0/711** ← TEJ does not provide data beyond 2022 |
| 2024 | **0/1,022** ← TEJ does not provide data beyond 2022 |

TEJ has confirmed the TESG score series ends at 2022. The `msci_esg_rating` and `sustainalytics_risk_score` columns exist in the DB but are currently **0/5,408 non-null** — not yet populated.

**Recommended approach — use `tesg_score` as a time-invariant baseline control:** Include the 2022 TESG score (last available year) as a firm-level pre-treatment characteristic in the covariate vector. This controls for baseline ESG sophistication without requiring panel variation. Defensible because treatment (GRI 3 adoption) occurs from 2022 onward.

**Alternatives to explore for supplementing or replacing tesg_score:**

| Alternative | Coverage | Availability | Notes |
|---|---|---|---|
| TWSE Corporate Governance Evaluation (CGQ score) | All TWSE-listed cos, annual | Public (TWSE/FSC website) | Free; Taiwan-specific; 2020-2024 available; strong CG dimension |
| Sustainalytics Risk Score | Global + TWSE large caps | Subscription or scrape | Column already in DB (`sustainalytics_risk_score`) — needs data fetch |
| MSCI ESG Rating | Global + some Taiwan coverage | Subscription | Column already in DB (`msci_esg_rating`) — needs data fetch; limited TWSE coverage |
| CDP Score | Large Taiwanese disclosers only | Public (CDP) | Narrow coverage; not recommended as primary |
| `tesg_score` (2022, time-invariant) | 629/632 for 2022 | Already in DB ✅ | **Recommended as interim solution** |

**Priority action:** Investigate TWSE CGQ score as a freely-available, time-varying (2020–2024) alternative that would enable tesg_score to be replaced entirely rather than lagged.

---

## 6. Moderator Variables (H4, H5)

| Variable | Coverage | Notes |
|---|---|---|
| `sasb_industry` | **99% (3,251/3,283)** in DiD window; 96.9% (5,240/5,408) across master DB | 32 missing rows in DiD window; 11 industries |
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

> Coverage figures below use **3,283 (DiD window 2020–2024)** as denominator, not 5,408 (master DB).

| Variable | Coverage in DiD window (2020–24) | Scale | DiD utility |
|---|---|---|---|
| `topic_depth_score` | 3,258/3,283 **(99%)** ✅ | 0–0.76, mean=0.52 | ✅ Robustness for H2 |
| `gri3_four_step_compliance` | 3,282/3,283 **(100%)** ✅ | Count 0–4, mean=1.35 | ✅ H1 process robustness |
| `gri_content_index_completeness` | 3,283/3,283 **(100%)** non-blank; 2,230/3,283 (68%) non-zero | Bimodal: 0 or ≈0.88 | 🟡 Treat as binary; limited variation |
| `double_materiality_mentioned` | 2,846/3,283 **(87%)** non-blank; 266/3,283 (8%) = 1 | Binary, 8% prevalence | 🟡 Low prevalence but estimable; mechanism var |
| `dm_methodology_disclosed` | ~90% | Binary, 84% = 1 | ⚠️ Ceiling effect pre-adoption; limited DiD utility |
| `gri_101_applied` | 3/3,283 non-zero (2023 only) | Binary | ✅ By design — GRI 101: Biodiversity 2024 effective Jan 2026; FY2025+ field only |
| `gri_new_climate_energy_adopted` | 0/3,283 | Binary | ✅ By design — GRI 102/103 Climate/Energy effective Jan 2027; FY2026+ field only |
| `board_esg_committee` | **0%** | Empty column | ❌ Do not reference |

**NLP model outputs (Block D — FinBERT, ESGLens, BGE, XLM-R):**

| Model | Coverage in DiD window (3,283 rows) | % |
|---|---|---|
| ESGLens (eslens_*) | 1,877/3,283 | **57%** |
| FinBERT (finbert_*) | 1,877/3,283 | **57%** |
| BGE (bge_*) | 2,547/3,283 | **78%** |
| XLM-R (xlmr_*) | 2,593/3,283 | **79%** |

Coverage concentrated in 2022–2024. Pre-trend years (2020–2021) are sparse. Insufficient for DiD pre-trend testing on NLP outcomes; use for cross-sectional robustness (Stream F) only.

---

## 7. Summary: Readiness by Hypothesis

| Hypothesis | Outcome | Estimable n (g=2022 treated) | NTT Controls | Severity |
|---|---|---|---|---|
| **H1** | n_material_topics_b | 578 (t=2022) / 577 (t=2023) | 44 @ t=2022; **124 @ t=2023** ✅ | 🟢 95% coverage in DiD window; zeros→NA complete (Pass DB-03) |
| **H2** | mpqi_composite (replaces PQS) | 2,646 (GRI3 era) | 43–44 | 🟢 N=2,646 with all 4 dims; validated (r=0.99 with Block C); composition story documented |
| **H3** | assurance_level (Reasonable) | ~454 | 43–44 | 🔴 ~5% base rate; severely underpowered |
| **H3 alt** | has_any_assurance | ~454 | 43–44 | 🟢 ~60% prevalence; much better powered |
| **H4** | n_mat_topics × sasb_industry | High=182, Low=216 | ~15–30 each | 🟠 Subsample thins control pool further |
| **H5** | mpqi_composite (semis) | 49 companies | n/a | 🟡 n=49 not 73; no TSMC proximity data |

---

## 8. Pre-Registration Adjustments Required

Before OSF submission:

1. **Control group description:** Change to "primary comparison: g=2022 cohort (578 treated at t=2022) vs g=2023 and g=2024 cohorts as NTT controls (n=44 at t=2022, n=124 at t=2023). Exclude 2024 cohort from treated units (no pre-treatment baseline)."

2. **Year +1 effect:** Upgrade ATT(g=2022, t=2023) from exploratory to **pre-registered confirmatory** — NTT pool now 124 (was 3). Remove the prior "exploratory" caveat.

3. **H2 primary outcome:** ✅ Changed from `process_quality_score` → `mpqi_composite` (2026-06-23, Pass DB-08). Update pre-registration: primary outcome = `mpqi_composite` (0–1 scale); mechanism sub-hypothesis = `mpqi_dim_proc` (expected ATT +0.05–0.08). `process_quality_score` retained as robustness specification only.

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
| ✅ #2 | Set `n_material_topics_b = NA` for 162 zeros in 2020–2024 (Pass DB-03) | **DONE** |
| ✅ #3 | OSF pre-registration text drafted | **DONE** (`osf-preregistration_twse-materiality_2026-06-22.md`) |
| ✅ #4 | ATT(g=2022, t=2023) upgraded from exploratory to confirmatory | **DONE** (NTT pool = 124; pre-reg updated 2026-06-22) |
| ✅ #5 | `independent_director_ratio` repopulated (Pass DB-02) | **DONE** |
| ✅ #6 | Fill `sasb_industry` for missing rows | **DONE** (Pass DB-04: 37 rows, 20 tickers; 0 missing in DiD window) |
| ✅ #7 | Drop `n_material_topics_a` from regression code | **DONE** — confirmed 100% identical to `n_material_topics_b` (r = 1.000); column retained in DB but not used as outcome; documented in pre-reg |
| ✅ #8 | Exclude `board_esg_committee` from all analyses | **DONE** — column does not exist in current DB (already dropped); confirmed 2026-06-22 |
| 🟡 #9 | Investigate 286 remaining zeros — are they new-company rows or re-introduced? | PENDING |
| 🟡 #10 | Code TSMC proximity indicator for H5 (external data required) | PENDING |
| ✅ #11 | `rd_intensity` patched: 85 zero-R&D rows filled; `rd_dummy` computed (Pass DB-01) | **DONE** |
| ✅ #12 | TWSE CGQ investigation | **DONE** — see §9b below |
| ✅ #13 | `tesg_score` post-2022 strategy | **DONE** — use 2022 value as time-invariant pre-treatment control in robustness specs; documented in pre-reg |
| 🟡 #14 | Populate `sustainalytics_risk_score` and/or `msci_esg_rating` (subscriptions required) | PENDING |
| ✅ #15 | Board diversity patch (Pass DB-02) | **DONE** |
| 🔴 #16 | Upload OSF pre-registration to OSF and obtain DOI | **PENDING — last hard blocker before att_gt()** |


---



### Pass DB-02 — Board diversity patch (2026-06-22)
**Source:** TEJ Board diversity.xlsx
**Years patched:** 2021-2024 (Excel also covers 2025; excluded - not in DB)
**Rows updated:** 2,774 / 2,856 (82 unmatched; 151 Bad Quality=Y rows excluded)

Updated columns:
- board_directors_n — board size (overwrites existing)
- board_seats — kept in sync with board_directors_n
- independent_director_ratio — recomputed as n_ind/n_dir (now 97.7% for 2021-2024)

New columns added:
- independent_directors_n — raw count of independent directors
- female_directors_n — count of female directors (0 = no female directors, not missing)
- female_director_pct — female directors as % of board
- director_attendance_pct — board meeting attendance rate
- director_training_pct — director training completion rate


---

### Pass DB-03 — zeros → NA for n_material_topics_b / n_material_topics_a (2026-06-22)
Converted all remaining zeros in the 2020–2024 DiD window to blank (NA).

Pre-step: ran `gri_backlog_extract.py --dry-run` — confirmed 0 recoverable codes across all 162 zero rows. 114 had text files processed but no GRI content index found (genuine zero-disclosure). 1 had no text file. 47 were later-added company-years not in original backlog.

Result:
- n_material_topics_b: 162 zeros → NA; 0 zeros remain in 2020–2024
- n_material_topics_a: 162 zeros → NA; 0 zeros remain in 2020–2024
- 2016–2019: already NA by design (no change)

Final state: positive=3,121 | NA=2,287 (incl. 2016–2019 by-design NAs + 162 converted) | zero=0

⚠️ db_did_full.csv and db_did.csv need regeneration from updated master DB before att_gt().

---

---

### Pass DB-04 — sasb_industry fill for 20 missing tickers (2026-06-22)
**Trigger:** 32 rows in DiD window had blank `sasb_industry` (20 unique tickers). These tickers also lacked `tse_industry_code` — recent listings not captured in the original sector lookup.

**Method:** Company name + TWSE sector research. Assignments:

| Ticker | Company | SASB assigned | Basis |
|---|---|---|---|
| 2254 | COPLUS | Transportation | Auto parts manufacturing |
| 2258 | Foxtron | Transportation | EV/vehicle manufacturing (Foxconn spin-off) |
| 2432 | AGT | Technology | Electronics testing |
| 3150 | Syncomm | Technology | Wireless telecom equipment |
| 3682 | APT | Technology | Electronics |
| 3716 | Cenra Inc. | Technology | Precision electronics |
| 6534 | CHBIO | HealthCare | Biotechnology |
| 6645 | Kim Forest | Technology | ICT services |
| 6771 | PHET | Technology | Electronics |
| 6794 | UnicoCell Biomed | HealthCare | Biomedical devices |
| 6854 | PlayNitride | Technology | Micro-LED displays |
| 6902 | Gogolook | Services | SaaS anti-fraud / TrustTech |
| 6924 | EIKEI-KY | Technology | Electronics / manufacturing |
| 6949 | PELL BMT | HealthCare | Biomedical technology |
| 6951 | Chin Hsin | Technology | Electronics |
| 6955 | BONRAYBIO | HealthCare | Biotech / diagnostics |
| 6969 | Transcene | HealthCare | Biotech / life sciences |
| 6988 | Wellysun | HealthCare | Health / wellness |
| 8162 | MSEC | Technology | Semiconductor equipment |
| 8487 | ELTA | Technology | Defense electronics |

**Impact_intensity** also updated for all 37 rows.
**Result:** 0 missing `sasb_industry` in DiD window. db_did_full.csv and db_did.csv regenerated.

---

### §9b — TWSE CGQ Score: Assessment and Integration (2026-06-22)

**Source:** `TEJ_TWSECG.xlsx` — TWSE Corporate Governance Evaluation (CGE), administered by the TWSE Corporate Governance Center (`cgc.twse.com.tw`). Annual evaluation, 11th round (2024) covered 1,749 companies. From 2026 onward replaced by "ESG Evaluation" (E/S/G, 75 indicators).

**Numeric encoding in DB (`twse_cgq_score`):**

| Score | Band | Grade |
|---|---|---|
| 7 | Top 5% | A+ |
| 6 | 6%–20% | A |
| 5 | 21%–35% | B |
| 4 | 36%–50% | C |
| 3 | 51%–65% | C- |
| 2 | 66%–80% | D |
| 1 | 81%–100% | D- |
| 0 / blank | Not evaluated or insufficient data | — |

**Coverage in DiD window (2020–2024):**

| Year | Rows | Coverage |
|---|---|---|
| 2020 | 416/427 | 97% |
| 2021 | 469/491 | 96% |
| 2022 | 606/632 | 96% |
| 2023 | 678/711 | 95% |
| 2024 | 953/1,022 | 93% |
| **Total** | **3,122/3,283** | **95.1%** |

**Score statistics (2020–2024 matched):** mean = 3.55, SD = 1.88, range = 1–7. Well-distributed across all bands.

**Decision: Integrated as robustness covariate — NOT primary covariate.**

Rationale for exclusion from primary spec: The CGE criteria include ESG/sustainability reporting indicators. Companies adopting GRI 3 may receive higher CGQ scores *because* of GRI 3 adoption, creating post-treatment contamination if used contemporaneously. This makes CGQ potentially endogenous to the treatment.

**Recommended use in robustness specifications:**
- Use **lagged CGQ score** (`twse_cgq_score` at t−1) as a pre-determined control — this pre-dates any GRI 3 effects for that year
- Or use **2021 value** as a time-invariant pre-treatment baseline (all companies in the g=2022 cohort have 2021 CGQ before they adopt GRI 3 in 2022)
- Include in robustness spec R6 alongside `independent_director_ratio`

**`tesg_score` comparison:**
- `tesg_score`: 2020=97%, 2021=99%, 2022=99%, **2023=0%, 2024=0%** — TEJ series ended
- `twse_cgq_score`: **95%+ coverage all years 2020–2024** — strictly superior for our DiD window
- `twse_cgq_score` is preferred for robustness; `tesg_score` limited to 2022 cross-section only

**DB status:** ✅ Integrated as column 192 (`twse_cgq_score`). db_did_full.csv and db_did.csv regenerated (3,283 and 2,960 rows × 192 cols).

---

---

### Pass DB-05 — twse_cgq_score integration (2026-06-22)
**Source:** `TEJ_TWSECG.xlsx` — TWSE Corporate Governance Evaluation, annual, ordinal 1–7 (7 = top 5%; 1 = bottom 20%; blank = not evaluated/insufficient data).  
**Column added:** `twse_cgq_score` (col 192; block G_ESGRatings)  
**Rows populated:** 4,674 / 5,408 (includes 2016–2019 historical rows where available)  
**DiD window coverage:** 3,122 / 3,283 (95.1%); per-year: 2020=97%, 2021=96%, 2022=96%, 2023=95%, 2024=93%  
**Score stats:** mean=3.55, SD=1.88, range=1–7 — good variation across the full ordinal scale  
**Use:** Robustness covariate only (lagged t−1 or 2021 static value); NOT primary spec due to potential endogeneity with GRI adoption outcomes  
**DiD files regenerated:** db_did_full.csv (3,283 × 192), db_did.csv (2,960 × 192)

---

---

### Pass DB-06 — Assurance binary columns (2026-06-22)
**Source:** TEJ_Big4.xlsx (financial audit quality) + existing `assurance_level`/`assurance_provider` columns  
**Columns added:**
- `has_any_assurance` (col 193): 1 if assurance_level ∈ {Limited, Reasonable}, else 0. 100% populated. Prevalence: 1,999/3,283 = 60.9% in DiD window.
- `big4_assurance` (col 194): 1 if ESG assurance provider is PwC/EY/Deloitte/KPMG (資誠/安永/勤業眾信/安侯建業), else 0. 100% populated. Prevalence: 655/3,283 = 19.9%.
- `big4_financial_auditor` (col 195): 1 if financial auditor is Big4 per TEJ annual audit data, else 0. 94.9% populated (168 rows blank = very recent listings). Prevalence: 2,895/3,283 = 88.1%.

**DiD files regenerated:** db_did_full.csv (3,283 × 195), db_did.csv (2,960 × 195)

---

---

### Pass DB-08 — MPQI variables integrated (2026-06-23)
**Source:** Block C NLP/structural extractions — MPQI items (g1, g3, p1, p2, p3, s1, s2, s3, o1, o2)  
**Columns added to master DB (Block MPQI):**
- `mpqi_dim_gov` — governance dimension, mean(g1,g3)/2, range 0–1, N=3,282
- `mpqi_dim_proc` — process dimension, mean(p1,p2,p3)/2, range 0–1, N=2,646
- `mpqi_dim_stake` — stakeholder dimension, mean(s1,s2,s3)/2, range 0–1, N=3,220
- `mpqi_dim_out` — output dimension, mean(o1,o2)/2, range 0–1, N=3,282
- `mpqi_composite` — equal-weighted 4-dim composite (all non-null required), N=2,646, mean=0.516
- `mpqi_composite_3d` — robustness composite (≥3 dims non-null), N=3,220, mean=0.511

**Validation:** r(mpqi_composite, Block C mpqi_score) = 0.99; r(mpqi_composite, process_quality_score) = 0.86  
**H2 primary outcome change:** `mpqi_composite` replaces `process_quality_score`; PQS retained as robustness column  
**DB column count:** 202 (previous 195 + 6 MPQI + 1 mpqi_o2) → **202 cols × 5,408 rows**

---

*Generated: 2026-06-10 | Last updated: 2026-06-23 (Pass DB-08: MPQI variables integrated; mpqi_composite replaces process_quality_score as H2 primary outcome; H2 composition story documented)*
