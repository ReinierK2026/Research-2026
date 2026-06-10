# DB Quality Assessment — GRI 3 Materiality DiD Study
**Date:** 2026-06-10 (v2 — intermediate draft)  
**File assessed:** twse-research-database.csv  
**Prior assessment:** db-quality-assessment_2026-06-10.md  
**Purpose:** Updated readiness verdict for H1–H5 (Callaway-Sant'Anna DiD)

> ⚠️ **SUPERSEDED — DO NOT USE FOR REFERENCE.**  
> This v2 document uses incorrect CS21 control pool counting methodology: it counts all DB rows in a given year as controls rather than only not-yet-treated companies that satisfy both (a) `gri_adoption_year > t` and (b) observations at both the base period and time t. The resulting "427/481 controls" figures for t=2020/2021 are therefore wrong (correct values: 37/43 — see canonical assessment).  
>
> **Use `db-quality-assessment_2026-06-10.md` (v1, Pass 92) as the canonical version.** The one unique finding in this document — `independent_director_ratio` 0% coverage for 2022–2024 — has been ported to v1 Section 5.
>
> This document is retained for audit trail only.

> **How to read this document:** Sections marked **↑ IMPROVED**, **↔ UNCHANGED**, or **🆕 NEW** show delta vs the prior assessment. Action items supersede the prior list.

---

## 1. Panel Overview

| Metric | Prior | Now | Δ |
|---|---|---|---|
| Total rows (company-years) | 3,283 | 3,283 | — |
| Unique companies (twse_ticker) | 1,036 | 1,036 | — |
| Fiscal years covered | 2020–2024 | 2020–2024 | — |
| Total columns | ~30 key | **190** | 🆕 +160 cols |
| Panel balance | Unbalanced | Unbalanced | ↔ |

The schema has grown substantially to include a full financial block (Block D, ~40 cols), GRI process variables (Block B/C), and NLP output blocks from four models (FinBERT, ClimateBERT, BGE, XLM-R).

### Rows per year

| Year | Rows |
|---|---|
| 2020 | 427 |
| 2021 | 491 |
| 2022 | 632 |
| 2023 | 711 |
| 2024 | 1,022 |

---

## 2. Treatment Variable: gri_adoption_year ↔

| Cohort | Unique companies |
|---|---|
| 2021 | 10 |
| 2022 | 593 |
| 2023 | 126 |
| 2024 | 307 |
| **Never-treated** | **0** |

**Unchanged finding — no never-treated group.** `control_group = "notyettreated"` remains the only viable option for CS21.

---

## 3. Control Group — SUBSTANTIALLY IMPROVED ↑ 🔴→🟠

The dominant structural problem from the prior assessment (thin pre-trend control pool) has been largely resolved for the **2022 cohort pre-trend tests** but remains severe at the treatment year and for the 2023 cohort.

### Not-yet-treated control pool by ATT cell

| ATT cell | Treated | NTT Controls | Prior NTT | Δ |
|---|---|---|---|---|
| g=2022, t=2020 (pre-trend t−2) | 381 | **427** | 37 | **↑ +390** |
| g=2022, t=2021 (pre-trend t−1) | 438 | **481** | 43 | **↑ +438** |
| g=2022, t=2022 (treatment year) | 578 | **44** | 44 | ↔ |
| g=2023, t=2021 (pre-trend t−2) | 37 | **481** | 4 | **↑ +477** |
| g=2023, t=2022 (pre-trend t−1) | 40 | **44** | 4 | ↑ +40 |
| g=2023, t=2023 (treatment year) | 121 | **3** | n/a | 🔴 |

**What changed:** The database has been backfilled with 2020 and 2021 observations for many 2022+ cohort companies. The 2022 cohort's parallel trends test now has a control pool of 427–481 companies (vs 37–43 previously), which is excellent for pre-trend validation.

**What remains thin:** At the *treatment year* itself (t=2022), the NTT control pool is still only 44 (2023/2024 companies with 2022 data). The identification of ATT(2022, 2022) — the causal estimate of GRI 3 adoption — is still based on a 578:44 treated:control ratio.

**2023 cohort at treatment year:** Only **3 NTT controls** at t=2023. ATT(2023, 2023) is not estimable in practice. The 2023 cohort should be used only as a control for the 2022 cohort, not as a treated group in its own right.

**Recommendation:** The identification strategy should be stated clearly as:
- **Parallel trends validation (pre-2022):** Well-powered, 427–481 controls ✅
- **Causal ATT estimate (t=2022):** Thin control pool (n=44); reportable but flag as limitation
- **2023 and 2024 cohorts as treated units:** Drop from H1–H4 primary analysis

---

## 4. Outcome Variables

### H1 — n_material_topics_b ↑ (CRITICAL ISSUE RESOLVED)

| Metric | Prior | Now |
|---|---|---|
| Zero placeholders | 882 (26.9%) | **0 (0%)** |
| NA (missing) | — | 304 (9.3%) |
| Non-zero valid | 2,401 (73.1%) | **2,979 (90.7%)** |
| Mean (non-null) | 15.0 | **16.9** |
| Max | 36 | **44** |

**🔴→🟢 Critical issue resolved.** The 882 zero-placeholders have been correctly converted to NA. This is the single most important fix since the prior assessment.

Coverage by year (now vs prior):

| Year | Valid now | Valid prior | Change |
|---|---|---|---|
| 2020 | 364/427 (85.2%) | 237/427 (55.5%) | **↑ +30pp** |
| 2021 | 440/491 (89.6%) | 319/491 (65.0%) | **↑ +25pp** |
| 2022 | 586/632 (92.7%) | 517/632 (81.8%) | ↑ +11pp |
| 2023 | 642/711 (90.3%) | 568/711 (79.9%) | ↑ +10pp |
| 2024 | 947/1,022 (92.7%) | 760/1,022 (74.4%) | ↑ +18pp |

In the estimable panel (502 companies with ≥1 pre-treatment year, 2,384 rows): **91.0% coverage**. Pre-treatment coverage is now sufficient for the DiD.

**🆕 Note:** `n_material_topics_a` and `n_material_topics_b` are now **identical** (correlation = 1.000, 0 differing rows). Column `n_material_topics_a` is redundant; drop it or document the distinction.

**Severity:** 🟢 READY — zeros fixed, coverage adequate, use `n_material_topics_b` as primary H1 outcome.

---

### H2 — process_quality_score ↔

| Metric | Prior | Now |
|---|---|---|
| Non-null | 3,208/3,283 (97.7%) | 3,208/3,283 (97.7%) |
| Scale | 0–1 | 0–1 |
| Mean / Median | 0.398 / 0.381 | 0.398 / 0.381 |
| Estimable panel coverage | 93% | **96.9%** |

Unchanged in coverage; slightly better in the estimable panel. The 0–1 scale discrepancy vs the hypothesis document's "0–10" description remains uncorrected. The distribution is well-behaved with a useful spread (p25=0.28, p75=0.50).

**Severity:** 🟡 MEDIUM — excellent data quality; hypothesis document scale still needs updating before OSF.

---

### H3 — assurance_level ↔ (REMAINS UNDERPOWERED)

| Year | Reasonable | Limited | None/NA |
|---|---|---|---|
| 2020 | 24 | 239 | 164 (38%) |
| 2021 | 24 | 305 | 162 (33%) |
| 2022 | 27 | 379 | 226 (36%) |
| 2023 | 30 | 424 | 257 (36%) |
| 2024 | 31 | 516 | 475 (46%) |
| **Total** | **136** | **1,863** | **1,284 (39%)** |

Reasonable assurance prevalence: **4.1%** (down from 5% in prior assessment — likely reclassification). There are only 136 "Reasonable" observations in the entire panel. Detecting a GRI 3-driven shift in probability of upgrade via DiD remains infeasible at this base rate.

**Severity:** 🔴 HIGH RISK — H3 as specified (Reasonable vs Limited upgrade) is not powered. Recommend:
1. Reclassify H3 as **exploratory/descriptive** in pre-registration
2. Replace primary H3 outcome with `has_any_assurance` (Limited OR Reasonable vs None): 1,999 obs with assurance, 1,284 without — much more estimable

---

## 5. Covariates ↔ + 🆕 NEW CRITICAL FINDING

| Variable | Coverage | 2020 | 2021 | 2022 | 2023 | 2024 | Status |
|---|---|---|---|---|---|---|---|
| `ln_total_assets` | 91.5% | 100% | 99% | 89% | 89% | 87% | 🟡 same |
| `roa` | 91.5% | 100% | 99% | 89% | 89% | 87% | 🟡 same |
| `board_approved` | 89.7% | **25%** | 100% | 98% | 100% | 100% | 🟡 same |
| `standalone_sr` | 100% | 100% | 100% | 100% | 100% | 100% | 🟢 same |
| `leverage` | 91.5% | 100% | 99% | 89% | 89% | 87% | 🟡 |
| `firm_age` | 99.8% | — | — | — | — | — | 🟢 |
| `rd_intensity` | 88.9% | — | — | — | — | — | 🟡 |

**`board_approved` in 2020:** Still only 25% — confirmed unchanged. Exclude from covariate vector when base period is 2020.

**🆕 CRITICAL: `independent_director_ratio` — data pipeline break:**

| Year | Coverage |
|---|---|
| 2020 | 100% (425/427) |
| 2021 | 99% (487/491) |
| 2022 | **0%** (0/632) |
| 2023 | **0%** (0/711) |
| 2024 | **0%** (0/1,022) |

This column is completely absent for 2022–2024. It cannot be used as a covariate. This is a new finding — if this variable was part of any planned covariate specification, it must be removed or replaced (e.g., `board_directors_n` or `board_seats` as alternative proxy).

---

## 6. Moderator Variables ↔

| Variable | Coverage | Notes |
|---|---|---|
| `sasb_industry` | 99.0% (32 missing) | Complete for practical purposes — unchanged |
| `semiconductor_cat` | 100% | 49 unique semiconductor companies — unchanged |

The 49 vs 73 discrepancy flagged in the prior assessment remains unresolved.

---

## 7. New Potential Outcome Variables 🆕

The expanded schema includes several well-covered variables that could serve as supplementary outcomes or robustness checks:

| Variable | Coverage | Mean | Notes |
|---|---|---|---|
| `topic_depth_score` | 99.2% | 0.525 | New 0–0.76 continuous score; narrow range, low variance |
| `gri_content_index_completeness` | 100% | 0.527 | Bimodal: 0 (no index) or ~0.88 (full index) — binary in practice |
| `gri3_four_step_compliance` | 100% | 1.35 | Discrete count 0–4; strong candidate for H1 robustness |
| `dm_methodology_disclosed` | 90.2% | 0.840 | Binary — high ceiling (84% already = 1 pre-adoption) |
| `double_materiality_mentioned` | 86.7% | 0.087 | Binary, 8.7% prevalence — low but estimable |
| `process_steps_n` | 92.8% | 2.12 | Count 0–n; reasonable variation |
| `stakeholder_groups_n` | 98.8% | 6.75 | Count; strong coverage |

**NLP model outputs (BGE, XLM-R, FinBERT, ClimateBERT):** Coverage is 51–57%, concentrated in 2022–2024. Not suitable for DiD pre-trend tests (2020–2021 coverage is sparse). Useful as cross-sectional robustness or for mechanism analyses post-treatment.

**`board_esg_committee`:** Empty column (0% coverage) — do not use.

---

## 8. Summary: Readiness by Hypothesis

| Hypothesis | Outcome | Estimable n (treated) | Control pool (pre-trend / ATT) | Issue severity |
|---|---|---|---|---|
| **H1** | n_material_topics_b | ~445 (2022 cohort) | 427–481 / 44 | 🟡 Zeros fixed; pre-trend well-powered; ATT pool thin |
| **H2** | process_quality_score | ~445 (2022 cohort) | 427–481 / 44 | 🟡 Scale in hypothesis doc wrong (0–1 not 0–10) |
| **H3** | assurance_level (Reasonable) | ~445 | 427–481 / 44 | 🔴 4.1% base rate — severely underpowered; reclassify as exploratory |
| **H4** | n_material_topics_b × sasb_industry | ~260 Low + ~145 High | ~200 / ~20 | 🟠 Subgroup thins control pool further |
| **H5** | process_quality_score, semiconductor | 49 semi companies | n/a | 🟡 n=49 (not 73); TSMC proximity still absent |

---

## 9. Pre-Registration Adjustments Required (Updated)

All items from the prior assessment remain open unless noted:

1. **Control group description** *(prior #1, still required)*: Update to "502 companies with ≥1 pre-treatment year; parallel trends tests: 427–481 NTT controls at t=2020/2021; ATT at treatment year: 44 NTT controls. 2023 and 2024 cohorts excluded from primary H1–H4 analysis as treated units."

2. **process_quality_score scale** *(prior #5)*: Replace "0–10 composite scale" with "0–1 normalized scale; expected magnitude +0.05 to +0.15."

3. **H3 power caveat** *(prior #6)*: Flag H3 as exploratory. Primary H3 outcome = `has_any_assurance` (Limited OR Reasonable vs None). Secondary = Reasonable only.

4. **board_approved in 2020** *(prior #4)*: Exclude from covariate vector when base period = 2020. *(Note: now less critical because pre-trend controls are 2022+ cohort companies, which have full board_approved coverage in 2020.)*

5. **H5 semiconductor n** *(prior #8)*: Correct from 73 to 49.

6. **idname** *(prior #6)*: Confirm `idname = "twse_ticker"` — `company_id` is a compound key.

7. **🆕 Remove `independent_director_ratio`** from all covariate specifications. The variable is absent for 2022–2024 due to a data pipeline break.

8. **🆕 Clarify `n_material_topics_a` vs `n_material_topics_b`**: Both are now identical. Confirm which is the intended H1 outcome and drop the redundant column or document the distinction.

---

## 10. Immediate Action Items (Updated)

| Priority | Action | Status vs Prior | Impact |
|---|---|---|---|
| 🟢 ~~#1~~ | ~~Set `n_material_topics_b = NA` where value = 0~~ | **DONE** | ✅ Resolved |
| 🔴 #1 | Remove `independent_director_ratio` from covariate specs (0% coverage 2022–2024) | 🆕 NEW | Hard blocker if this variable is in any model |
| 🔴 #2 | Update OSF pre-registration with corrected sample sizes, scale, control group description | Open | Hard blocker for all inferential tests |
| 🟠 #3 | Decide on 2023/2024 cohort exclusion from H1–H4 treated group and document | Open | Clarifies identification strategy |
| 🟠 #4 | Investigate `n_material_topics_a` = `n_material_topics_b` — document intended distinction or drop `_a` | 🆕 NEW | Schema hygiene; avoid confusion in code |
| 🟡 #5 | Correct process_quality_score scale in hypothesis document | Open | Pre-registration accuracy |
| 🟡 #6 | Add `has_any_assurance` binary as H3 primary outcome | Open | Better-powered version of H3 |
| 🟡 #7 | Fill sasb_industry for 32 missing rows | Open | Completes H4 moderator |
| 🟡 #8 | Investigate semiconductor n discrepancy (49 vs 73) | Open | H5 scope clarification |
| 🟡 #9 | Diagnose and fix `independent_director_ratio` pipeline for 2022–2024 if board composition is needed | 🆕 NEW | Optional; needed only if board independence in covariate spec |
| 🟡 #10 | Consider adding `gri3_four_step_compliance` or `process_steps_n` as H1 robustness outcomes | 🆕 NEW | Enriches robustness section |

---

*Generated: 2026-06-10 v2 | data:explore-data skill*
