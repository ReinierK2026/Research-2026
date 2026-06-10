# DB Quality Assessment — GRI 3 Materiality DiD Study
**Date:** 2026-06-10  
**File assessed:** twse-research-database.csv  
**Purpose:** Evaluate readiness of the current DB against the requirements of H1–H5 (Callaway-Sant'Anna DiD)

---

## 1. Panel Overview

| Metric | Value |
|---|---|
| Total rows (company-years) | 3,283 |
| Unique companies (twse_ticker) | 1,036 |
| Fiscal years covered | 2020–2024 |
| Panel balance | **Unbalanced** — see below |

> **Note on company_id:** The `company_id` field is a ticker-year compound key (e.g., `1101_2024`), not a company identifier. Use `twse_ticker` as `idname` in `att_gt()`.

### Panel balance by company

| Observations | Companies |
|---|---|
| 1 year only | 306 |
| 2 years | 97 |
| 3 years | 157 |
| 4 years | 68 |
| All 5 years | 408 |

### Rows per year

| Year | Rows |
|---|---|
| 2020 | 427 |
| 2021 | 491 |
| 2022 | 632 |
| 2023 | 711 |
| 2024 | 1,022 |

The row count grows sharply in 2022–2024 because the DB adds newly reporting companies — but these new entrants appear **only in their first year**, giving them no pre-treatment observations.

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

## 3. Control Group Problem (🔴 CRITICAL)

The not-yet-treated control pool in CS21 consists of companies that have not yet adopted at the relevant comparison period. The dominant control pool would be the **2024 cohort** serving as controls for the 2021–2023 cohorts. But:

| 2024 cohort | Count |
|---|---|
| Total companies | 307 |
| With ≥1 observation before 2024 | **6** |

Only 6 of the 307 late-adopter "control" companies appear in any pre-2024 year. The remaining 301 entered the panel only at adoption — they are first-observed reporters with no pre-treatment history.

**What CS21 actually uses as controls for each cell:**

| ATT cell | Treated | Control (notyettreated) |
|---|---|---|
| g=2022, t=2021 (pre-trend t−1) | 438 | **43** |
| g=2022, t=2020 (pre-trend t−2) | 381 | **37** |
| g=2022, t=2022 (treatment year) | 578 | **44** |
| g=2023, t=2022 (pre-trend t−1) | 40 | **4** |

The effective study is therefore a comparison of **2022 cohort adopters vs 2023 cohort adopters** (companies adopting GRI 3 in 2022 versus those who waited until 2023). This is a valid but narrower identification than the pre-registration describes. The 2023 cohort is barely estimable (4 controls for its pre-trend test).

**Recommendation:** Drop the 2024 cohort from H1–H4 analyses entirely. They function neither as valid treated units (no pre-treatment data) nor as meaningful controls (barely appear before 2024). The pre-registration should be updated to reflect this.

---

## 4. Outcome Variables

### H1 — n_material_topics_b (displacement effect)

| Metric | Value |
|---|---|
| Total rows | 3,283 |
| Non-zero | 2,401 (73.1%) |
| **Zero (placeholders)** | **882 (26.9%)** |
| Non-zero distribution | min=1, max=36, mean=15.0, median=14 |

Zeros are **not true observations** — they are unprocessed rows where GRI code extraction has not run. These must be set to `NA` before any regression. After this fix:

| Year | Non-zero (valid) | Zero→NA | % valid |
|---|---|---|---|
| 2020 | 237 | 190 | 55.5% |
| 2021 | 319 | 172 | 65.0% |
| 2022 | 517 | 115 | 81.8% |
| 2023 | 568 | 143 | 79.9% |
| 2024 | 760 | 262 | 74.4% |

Pre-2022 coverage is lower — the 2020 pre-treatment year (critical for parallel trends) has only 237 valid observations. In the estimable panel (companies with pre+post obs), pre-treatment `n_material_topics_b` coverage is **558/937 rows = 60%**.

**Severity:** 🔴 CRITICAL — zeros must be set to NA before `att_gt()` or estimates will be severely biased downward.

---

### H2 — process_quality_score (quality upgrade)

| Metric | Value |
|---|---|
| Non-null | 3,208 / 3,283 (97.7%) |
| Non-zero | 3,171 (96.6%) |
| **Scale** | **0–1 (not 0–10 as in hypothesis doc)** |
| min | 0.000 |
| max | 1.000 |
| mean | 0.398 |
| median | 0.381 |

**Scale discrepancy:** The hypothesis document specifies a "0–10 composite scale" with expected magnitude "+1–2 points". The actual stored values are 0–1. The expected magnitude for the DiD coefficient should be revised to approximately **+0.05 to +0.15** (5–15% of scale). This does not affect estimability but the hypothesis pre-registration text needs updating before OSF submission.

Pre-treatment coverage in the estimable panel: **873/937 rows = 93%** — this is the strongest outcome variable in the DB.

**Severity:** 🟡 MEDIUM — coverage is good; scale discrepancy in hypothesis document needs correction before pre-registration.

---

### H3 — assurance_level (upgrade effect)

| Year | Reasonable | Limited | None/NA |
|---|---|---|---|
| 2020 | 24 | 239 | 164 (38%) |
| 2021 | 24 | 305 | 162 (33%) |
| 2022 | 27 | 379 | 226 (36%) |
| 2023 | 30 | 424 | 257 (36%) |
| 2024 | 31 | 516 | 475 (46%) |

"Reasonable" assurance is the upgrade target in H3. It represents **24–31 companies per year** out of 430–570 non-missing observations — roughly **5% prevalence**. Post-treatment in the estimable panel: 88 / 1,423 (6.2%).

Detecting a shift in probability of Reasonable assurance via DiD requires substantial baseline frequency. At 5% prevalence, even a 50% relative increase (from 5% to 7.5%) would correspond to only ~10–12 additional companies switching in the treatment year. This is below the minimum detectable effect for any realistic sample size with a 13:1 treated:control ratio.

**Severity:** 🔴 HIGH RISK — H3 is very likely underpowered. Recommend reclassifying as descriptive/exploratory in pre-registration. A binary `has_any_assurance` outcome (Limited OR Reasonable vs None) may be feasible and is better powered.

---

## 5. Covariates

| Variable | Overall coverage | 2020 | 2021 | 2022 | 2023 | 2024 |
|---|---|---|---|---|---|---|
| `ln_total_assets` | 91.5% | 100% | 99% | 89% | 89% | 87% |
| `roa` | 91.5% | 100% | 99% | 89% | 89% | 87% |
| `board_approved` | 89.7% | **25%** | 100% | 98% | 100% | 100% |
| `standalone_sr` | 100% | 100% | 100% | 100% | 100% | 100% |

**board_approved in 2020:** Only 25% coverage. This covariate is essentially unavailable for the 2020 pre-treatment year. For the parallel trends test at t=2020, `board_approved` cannot be included in the covariate vector. Use the full covariate spec only for t=2021 onward.

**ln_total_assets and roa:** 87–91% coverage in 2022–2024. Missing values are correlated with companies new to the panel — likely smaller firms added to mandatory reporting. In the estimable panel (pre-treatment rows), coverage is 930/937 = 99%.

---

## 6. Moderator Variables (H4, H5)

| Variable | Coverage | Notes |
|---|---|---|
| `sasb_industry` | 99.0% (32 missing) | Complete for practical purposes |
| `semiconductor_cat` | 100% | 49 unique companies (DB currently has fewer than the 73 referenced in H5) |

**H4 (impact_intensity moderator):** `sasb_industry` is sufficiently complete. Industry group sizes:

| Impact group | Industries | Companies |
|---|---|---|
| High-impact | Resource, Infrastructure, Transportation, Minerals, Food | ~644 rows (2024) |
| Low-impact | Technology, Services, HealthCare, Financials | ~832 rows (2024) |
| Borderline | Consumer, RenewableEnergy | ~213 rows (2024) |

H4 subsample CS21 runs will inherit the thin control group problem. The Low-impact subsample (dominated by Technology = 1,111 rows) has the largest treated pool but the same 43-company control pool.

**H5 (semiconductor deep dive):** The DB contains **49 unique semiconductor companies** (`semiconductor_cat = 1`), not the 73 referenced in the hypothesis document. The 2022 adoption cohort is the dominant group here too. TSMC proximity indicator is still absent — requires external data coding.

---

## 7. Summary: Readiness by Hypothesis

| Hypothesis | Outcome | Estimable n (treated) | Control pool | Issue severity |
|---|---|---|---|---|
| **H1** | n_material_topics_b | ~445 (2022 cohort) | 43–44 | 🔴 zeros→NA critical; control pool thin |
| **H2** | process_quality_score | ~445 (2022 cohort) | 43–44 | 🟡 scale in hypothesis doc wrong (0–1 not 0–10) |
| **H3** | assurance_level | ~445 (2022 cohort) | 43–44 | 🔴 Reasonable assurance too rare (~5%) — severely underpowered |
| **H4** | n_material_topics_b × sasb_industry | ~260 Low + ~145 High | 20–30 each | 🟠 subsample makes control pool even thinner |
| **H5** | process_quality_score, gri_adoption_year | 49 semi companies | n/a | 🟡 n=49 not n=73; TSMC proximity data absent |

---

## 8. Pre-Registration Adjustments Required

Before OSF submission, the following must be updated in the hypothesis document:

1. **Control group:** Change from "~1,200 treated, not-yet-treated control group" to "495 companies with pre+post observations; primary comparison: 2022 cohort vs 2023 cohort as not-yet-treated controls (n≈43–44)." Explicitly exclude the 2024 cohort from H1–H4.

2. **process_quality_score scale:** Replace "0–10 composite scale" and "+1–2 points" with "0–1 normalized scale; expected magnitude: +0.05 to +0.15."

3. **H3 power caveat:** Flag H3 as exploratory given low base rate of Reasonable assurance (~5%). Add `has_any_assurance` (Limited OR Reasonable vs None) as a better-powered alternative outcome for H3.

4. **board_approved in 2020:** Note that `board_approved` will be excluded from the covariate vector when the base period is 2020 (25% coverage). For cohorts using 2021 as base period, full covariate spec applies.

5. **H5 semiconductor n:** Correct from 73 to 49 companies in current DB.

6. **idname:** Confirm `idname = "twse_ticker"` (not `"company_id"`) in all `att_gt()` calls.

---

## 9. Immediate Action Items (before att_gt)

| Priority | Action | Impact |
|---|---|---|
| 🔴 #1 | Set `n_material_topics_b = NA` where value = 0 | Prevents severe downward bias in H1 |
| 🔴 #2 | Update OSF pre-registration with corrected sample sizes, scale, control group description | Hard blocker for all inferential tests |
| 🟠 #3 | Decide on 2024 cohort exclusion and document it | Clarifies identification strategy |
| 🟠 #4 | Download 2021 ESG PDFs for 2022 adoption cohort | Improves pre-treatment coverage for dominant cohort |
| 🟡 #5 | Correct process_quality_score scale in hypothesis document | Pre-registration accuracy |
| 🟡 #6 | Add `has_any_assurance` binary as H3 alternative outcome | Better-powered version of H3 |
| 🟡 #7 | Fill sasb_industry for 32 missing rows | Completes H4 moderator |
| 🟡 #8 | Investigate semiconductor n discrepancy (49 vs 73) | H5 scope clarification |

---

*Generated: 2026-06-10 | data:explore-data skill*
