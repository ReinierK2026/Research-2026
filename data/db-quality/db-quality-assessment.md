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
| **Total columns** | **190** (Block A: identifiers; B: GRI process; C: materiality; D: financials ~40 cols; F: NLP outputs × 4 models; G: ESG ratings) |

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

**What CS21 actually uses as controls for each cell** (verified against DB 2026-06-10):

| ATT cell | Treated (estimable, with t obs) | Control (gay>t, with base+t obs) | Control breakdown |
|---|---|---|---|
| g=2022, t=2020 (pre-trend t−2) | 381 | **37** | g2023:34 + g2024:3 |
| g=2022, t=2021 (pre-trend t−1) | 438 | **43** | g2023:37 + g2024:6 |
| g=2022, t=2022 (treatment year) | **442** ~~578~~ | **44** | g2023:40 + g2024:4 |
| g=2022, t=2023 (year +1) | 431 | **⚠️ 3** | g2024:3 only |
| g=2023, t=2022 (pre-trend t−1) | 39 | **4** | g2024:4 |
| g=2023, t=2023 (treatment year) | 41 | **⚠️ 3** | g2024:3 only |

> **Correction (2026-06-10):** The prior `treated=578` for g=2022, t=2022 was wrong — it counted all 593 g=2022 companies minus those without a 2022 DB row (~15 corpus-gap companies). The correct count is **442** estimable companies (those with ≥1 pre-treatment observation), which is what att_gt() actually uses. The 578 figure included non-estimable companies with no pre-treatment baseline.

> **⚠️ Critical gap — year +1 effect:** ATT(g=2022, t=2023) has only **3 effective controls** (the 3 g=2024 companies with 2023 observations). This makes the year-after-adoption effect barely estimable. The primary identified ATT cell is **g=2022, t=2022** (the treatment-year effect). Pre-registration should flag t=2023 estimates as exploratory given the 3-company control pool.

The effective study is therefore a comparison of **2022 cohort adopters vs 2023 cohort adopters** at the treatment year (t=2022), with a very thin year-+1 estimate. This is a valid but narrower identification than initially described.

**Recommendation:** Drop the 2024 cohort from H1–H4 analyses entirely. Flag ATT(g=2022, t=2023) as exploratory (3 controls). The primary causal estimate is ATT(g=2022, t=2022) with n=44 controls.

---

## 4. Outcome Variables

### H1 — n_material_topics_b (displacement effect)

> **✅ RESOLVED — Pass 67 + Pass 87 (2026-06-10).** GRI extraction refreshed (bilingual union fix, gri_codes_summary for all years) and all zero placeholders converted to NA. Current DB state reflects post-fix values below.

| Metric | Value |
|---|---|
| Total rows | 3,283 |
| Non-null (positive) | **2,979 (90.7%)** |
| **Zero (placeholders)** | **0 — all converted to NA (Pass 87)** |
| Blank/NA | 304 (9.3%) |
| Non-null distribution | min=1, max=36, mean≈15.0, median=14 |

Current valid coverage by year (post-Pass 67+87):

| Year | Valid (non-null) | Blank/NA | % valid | Change vs pre-fix |
|---|---|---|---|---|
| 2020 | **364** | 63 | 85.2% | +127 (was 237) |
| 2021 | **440** | 51 | 89.6% | +121 (was 319) |
| 2022 | **586** | 46 | 92.7% | +69 (was 517) |
| 2023 | **642** | 69 | 90.3% | +74 (was 568) |
| 2024 | **947** | 75 | 92.7% | +187 (was 760) |

Pre-treatment year (2020/2021) coverage has substantially improved. In the estimable panel, pre-treatment `n_material_topics_b` coverage is now ~391/445 = **87.9%** for g=2022 companies at the 2021 base period.

**Severity:** ~~🔴 CRITICAL~~ → ✅ **RESOLVED** — zeros→NA conversion complete; GRI extraction quality improved.

> **🆕 Schema audit (2026-06-10):** `n_material_topics_a` and `n_material_topics_b` are now **identical** — correlation = 1.000, zero differing rows across all 2,979 non-null observations. One column is redundant. Confirm which is the intended H1 outcome and either drop `n_material_topics_a` or document the distinction before `att_gt()`. Using both risks confusion in code; dropping the redundant one eliminates the risk of accidentally regressing on the wrong column.

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

**`independent_director_ratio` — data pipeline break (v2 audit finding, ported 2026-06-10):**

| Year | Coverage |
|---|---|
| 2020 | 100% (425/427) |
| 2021 | 99% (487/491) |
| 2022 | **0%** (0/632) |
| 2023 | **0%** (0/711) |
| 2024 | **0%** (0/1,022) |

This column is completely absent for 2022–2024. It cannot be used as a covariate for the DiD analysis. The source is the TEJ Governance file which does not contain `independent_director_ratio` as a field. If needed, use `board_directors_n` or `board_seats` as a proxy. Do not include `independent_director_ratio` in any covariate specification — it will silently drop all 2022–2024 observations from the model.

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

## 6b. New Potential Outcome Variables (schema audit 2026-06-10)

The expanded 190-column schema includes several well-covered variables suitable as supplementary outcomes or robustness checks for H1–H2:

| Variable | Coverage | Scale / Range | Notes |
|---|---|---|---|
| `topic_depth_score` | 99.2% (3,258/3,283) | 0–0.76, mean=0.525 | Continuous; low variance (p25=0.50, p75=0.64); robustness for H2 |
| `gri3_four_step_compliance` | 100% (3,282/3,283) | 0–4 count, mean=1.35 | Strong coverage; process compliance count; robustness for H1 |
| `gri_content_index_completeness` | 100% | Bimodal: 0 or ≈0.88 | Effectively binary (no GRI index vs full index); treat as dummy |
| `stakeholder_groups_n` | 98.8% | Count, mean=6.75 | Good coverage; process depth proxy |
| `process_steps_n` | 92.8% | Count, mean=2.12 | Reasonable variation; complements `process_quality_score` |
| `double_materiality_mentioned` | 86.7% | Binary, 8.7% prevalence | Low but estimable; mechanism variable |
| `dm_methodology_disclosed` | 90.2% | Binary, mean=0.84 | **Ceiling effect** — 84% already = 1 pre-adoption; limited DiD utility |

**NLP model outputs (FinBERT, ClimateBERT, BGE, XLM-R):** 50–57% coverage, concentrated in 2022–2024. Insufficient for DiD pre-trend tests (2020–2021 sparse). Use for cross-sectional robustness or Stream F only.

**`board_esg_committee`:** ⚠️ **0% coverage** — empty column. Do not reference in any analysis or pre-registration.

**`visualization_format_n`:** 39.6% coverage — too sparse for DiD; descriptive use only.

---

## 7. Summary: Readiness by Hypothesis

| Hypothesis | Outcome | Estimable n (treated) | Control pool | Issue severity |
|---|---|---|---|---|
| **H1** | n_material_topics_b | 442 (g=2022 treatment year) | 44 at t=2022; **3 at t=2023** | ✅ zeros→NA done (Pass 87); ⚠️ t=2023 only 3 controls |
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

| Priority | Action | Status | Impact |
|---|---|---|---|
| ✅ #1 | Set `n_material_topics_b = NA` where value = 0 | **DONE** (Pass 87) | Prevents downward bias in H1 |
| ✅ #1b | GRI extraction quality refresh (bilingual union, gri_tables retired) | **DONE** (Pass 67) | Coverage: 2,979 non-null vs 2,401 before |
| 🔴 #2 | Update OSF pre-registration with corrected sample sizes, scale, control group description | **PENDING** | Hard blocker for all inferential tests |
| 🟠 #3 | Pre-register ATT(g=2022, t=2023) as exploratory (only 3 controls) | **PENDING** | Prevents overclaiming year-+1 effect |
| 🟠 #4 | Decide on 2024 cohort exclusion and document it | **DONE** (hypothesis doc + exec plan) | Clarifies identification strategy |
| 🟡 #5 | Correct control group table in pre-registration (treated=442 not 578) | **DONE** (this doc; hypothesis doc updated) | Pre-registration accuracy |
| 🟡 #6 | Add `has_any_assurance` binary as H3 alternative outcome | **DONE** (hypothesis doc) | Better-powered version of H3 |
| 🟡 #7 | Fill sasb_industry for 32 missing rows | PENDING | Completes H4 moderator |
| 🟡 #8 | Semiconductor n = 49 (not 73) confirmed | **DONE** (hypothesis doc updated) | H5 scope correct |
| 🟠 #9 | Resolve `n_material_topics_a` = `n_material_topics_b` redundancy — drop `_a` or document distinction | **PENDING** | Prevents wrong-column regression in att_gt() |
| 🟡 #10 | Exclude `board_esg_committee` from all analyses — 0% coverage (empty column) | **PENDING** | Prevents silent model failures |
| 🟡 #11 | Remove `independent_director_ratio` from all covariate specifications — 0% coverage 2022–2024 | **PENDING** | Hard blocker if included in model |

---

*Generated: 2026-06-10 | data:explore-data skill*
