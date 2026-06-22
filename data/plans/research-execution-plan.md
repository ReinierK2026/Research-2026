# Research Execution Plan — GRI 3 Materiality DiD Study
**Date:** 2026-06-10 (last updated: 2026-06-22)  
**Status:** Pre-estimation planning — six parallel streams  
**Hypothesis file:** `hypotheses/hypothesis-generation_did-hypotheses_2026-06-10.md`  
**Methodology file:** `Materiality_Research_Methodology.md` (updated June 10, 2026)

---

## Overview

Six parallel analysis streams address the constraints of the PDF-processed TWSE GRI reporter universe (1,036 companies; all treated; timing-based identification). Streams A, C, D, E, and F can run concurrently after data preparation is complete. Stream B informs the identification narrative but does not block other streams.

**Hard blockers before any estimation:** (1) ~~zeros→NA for `n_material_topics_b`~~ **✅ DONE — Pass 87 (2026-06-10)**; (2) OSF pre-registration.

**✅ 2026-06-22 correction — NTT pool at t=2023:** Prior documents showed 3 controls for ATT(g=2022, t=2023). After DB expansion to 5,408 rows (adding 2016–2019), the g=2023 cohort now has **124 companies with 2023 data**. ATT(g=2022, t=2023) is **upgradeable from exploratory → confirmatory**. Update OSF pre-registration accordingly.

**✅ 2026-06-22 — Board diversity (Pass DB-02):** `independent_director_ratio` is now 97.7% covered for 2021–2024. Added to primary covariate spec in Stream A. New columns: `female_director_pct`, `director_attendance_pct`, `director_training_pct`, `independent_directors_n`, `female_directors_n`.

---

## Task Dependency Graph

```
[DATA PREP]
   ├─ 1. Set n_material_topics_b zeros → NA
   ├─ 2. Tag language_track column (bilingual / zh_only / en_only)
   ├─ 3. Derive impact_intensity from sasb_industry (lock rule)
   ├─ 4. Exclude 2024 cohort from treatment/control pool
   └─ 5. Re-merge TEJ 2016-2020 financials (Stream B only)
              │
              ▼
[OSF PRE-REGISTRATION]  ← HARD BLOCKER for inferential tests
              │
    ┌─────────┴──────────────────────────────────────────┐
    │         │              │              │             │
  [A]       [B]            [C]            [D]           [E]
  CS21     Pre-trend      X-sect         Logit       Post-adopt
  H1–H4   validation     2024 snap      H3 assur    dynamics
    │
    └──────────────────────────┐
                             [F]
                           NLP stream
                         (stratified)
```

All streams are **independent** after data prep + pre-registration. Run in parallel.

---

## Data Preparation Tasks (must complete before pre-registration)

### Task D1 — Set n_material_topics_b zeros → NA ✅ COMPLETED (Pass 87, 2026-06-10)

**What:** ~~882 rows (26.9%)~~ **→ 0 zeros remaining.** All zero-placeholder rows converted to NA (blank) in Pass 87. Additionally, Pass 67 (GRI extraction refresh with bilingual union fix) substantially improved coverage: valid rows increased from 2,401 to **2,979** across all years.

**Current DB state (post-fix):**
- n_material_topics_b: 2,979 positive, 304 blank/NA, 0 zero
- n_material_topics_a: same distribution (both use gri_codes_summary, identical values)
- 2020 base year coverage: 364/427 (85.2%); 2021: 440/491 (89.6%)

**No action needed.** Data is clean and ready for att_gt().

**Assign to:** ~~data-analyst~~  
**Status:** ✅ **COMPLETED**  
**Blocks:** ~~Streams A, C, E~~ — unblocked

---

### Task D2 — Tag language_track column ✅ COMPLETED (Pass 92, 2026-06-10)

**What:** Classify each company-year as `bilingual`, `zh_only`, or `en_only` based on which NLP models ran on it.

**Logic:**
```python
# bilingual: both finbert_* and bge_* columns populated
# zh_only: only bge_* populated
# en_only: only finbert_* populated (n≈4, exclude from NLP stream)
conditions = [
    (finbert_populated & bge_populated),
    (~finbert_populated & bge_populated),
    (finbert_populated & ~bge_populated)
]
db['language_track'] = np.select(conditions, ['bilingual','zh_only','en_only'], default='neither')
```

**Populated indicator used:** `finbert_env_pct.notna()` for finbert; `bge_top1_topic.notna()` for bge.  
**Reference counts (2021, verified):** bilingual=303 ✓, zh_only=183 ✓, en_only=4 ✓, neither=1 ✓

**Status:** ✅ **COMPLETED** — `language_track` column added to DB (col 191 of 197)

---

### Task D3 — Derive and lock impact_intensity ✅ COMPLETED (Pass 92, 2026-06-10)

**What:** Pre-specify the H4 moderator before running any regression.

**Rule (locked — do not change after pre-registration):**
```r
db <- db |> mutate(
  impact_intensity = case_when(
    sasb_industry %in% c("Resource","Infrastructure","Transportation","Minerals","Food") ~ "High",
    sasb_industry %in% c("Technology","Services","HealthCare","Financials")               ~ "Low",
    sasb_industry %in% c("Consumer","RenewableEnergy")                                    ~ "Sensitivity",
    TRUE ~ NA_character_
  )
)
```

**Primary H4 analysis:** High vs Low only. Consumer + RenewableEnergy run as a sensitivity check (pre-registered, not primary).  
**Coverage:** 3,251/3,283 rows assigned (32 null rows where sasb_industry is blank).

**Status:** ✅ **COMPLETED** — `impact_intensity` column added to DB (col 192 of 197)

---

### Task D4 — Exclude 2024 cohort ✅ COMPLETED (Pass 92, 2026-06-10) — READ CORRECTION

**What:** Create filtered analytical datasets for CS21 estimation.

> **⚠️ CORRECTION to original filter logic:** The filter `filter(!(gri_adoption_year == 2024))` removes g=2024 companies entirely, which:
> - Reduces ATT(g=2022, t=2022) controls from 44 → 40 (loses 4 g=2024 companies with 2022 obs)
> - Makes ATT(g=2022, t=2023) and ATT(g=2023, t=2023) completely inestimable (0 controls, not 3)
>
> Two files were created to address this:

**`data/db_did.csv`** (2,960 rows) — g=2024 fully excluded  
- Use for: CS21 primary estimates with `glist=c(2021, 2022)` if year+1 estimates are not needed  
- Controls at t=2022: **40** (g=2023 companies only)  
- Controls at t=2023: **0** (year+1 INESTIMABLE from this file)

**`data/db_did_full.csv`** (3,283 rows) — all cohorts retained  ← **USE THIS AS PRIMARY ANALYTICAL FILE**
- Use for: `att_gt(data=db_did_full, gname="gri_adoption_year", ...)` with `glist=c(2021, 2022, 2023)`  
- Controls at t=2022: **44** (40 g=2023 + 4 g=2024)  
- Controls at t=2023: **3** (g=2024 companies with 2023 obs — exploratory only)

```r
# Correct R usage for db_did_full.csv:
out_h1 <- att_gt(
  yname         = "n_material_topics_b",
  gname         = "gri_adoption_year",
  data          = db_did_full,
  control_group = "notyettreated",
  # CS21 automatically excludes g=2024 from pre-registration target cohorts when using glist:
)
es_h1 <- aggte(out_h1, type="dynamic", glist=c(2021, 2022, 2023), na.rm=TRUE)
```

**Status:** ✅ **COMPLETED** — both files saved in `data/`

> **🔄 Regenerated 2026-06-11 (post Pass-93 GRI refresh):** Both files regenerated after the 2023 cohort GRI refresh updated `n_material_topics_b` (660/711, 92.8%), `mda_index` (710/711, 99.9%), `topic_depth_score` (711/711, 100.0%), and `gri_content_index_completeness` (576/711, 81.0%) for all 711 FY 2023 rows. Row counts **unchanged**: 3,283 (full) + 2,960 (core).
>
> ⚠️ **R loading note:** Both files use a 2-row header (row 1 = block labels, row 2 = column names). Load in R with `skip = 1`. `gri_adoption_year` is stored as float (`"2021.0"` etc.) — coerce before passing to `att_gt()`:
> ```r
> library(readr)
> db_did_full <- read_csv("data/db_did_full.csv", skip = 1) |>
>   mutate(gri_adoption_year = as.integer(gri_adoption_year),
>          fiscal_year        = as.integer(fiscal_year))
> ```

---

### Task D5 — Re-merge TEJ 2016–2020 financials (Stream B only) ✅ COMPLETED (Pass 92, 2026-06-10)

**What:** Extract `twse_ticker`, `fiscal_year`, `ln_total_assets`, `roa`, `leverage` from `twse-research-database_pre-nlp-repair.csv` for `fiscal_year ∈ {2016, 2017, 2018, 2019}`. Append to DB as pre-treatment rows (2020 was already 100% covered in DB). Do NOT populate NLP outcome variables for pre-2021 rows.

**Result:**
- **2,125 rows added** (FY 2016-2019) — DB now **5,408 rows × 197 cols, FY 2016–2024**
- Coverage: 2016=444/483 (92%), 2017=478/512 (93%), 2018=518/550 (94%), 2019=549/580 (95%)
- `language_track='neither'` for all pre-2021 rows; `impact_intensity` derived from sasb_industry
- **351/1,036 analytical-sample companies** have pre-treatment history to 2016
- Reference file: `data/stream_b_pre_treatment.csv` (2,780 rows, FY 2016-2020, all columns)

**Status:** ✅ **COMPLETED**

---

## Stream A — Primary DiD (H1–H4)

**Purpose:** Estimate causal timing effects of GRI 3 adoption on materiality disclosure outcomes.

**Key decisions pre-registered:**
- `idname = "twse_ticker"` (not `company_id`)
- `control_group = "notyettreated"`
- 2024 cohort excluded
- `board_approved` excluded from covariate vector when base period = 2020

**R specification:**
```r
library(did)
# NOTE: Use db_did_full (not db_did) to preserve 44 controls at t=2022 and 3 at t=2023
# db_did_full includes g=2024 as controls; use glist in aggte() to restrict treated cohorts

# H1 — Displacement
out_h1 <- att_gt(
  yname         = "n_material_topics_b",
  tname         = "fiscal_year",
  idname        = "twse_ticker",
  gname         = "gri_adoption_year",
  control_group = "notyettreated",
  xformla       = ~ ln_total_assets + roa + standalone_sr + independent_director_ratio,
  data          = db_did_full,   # ← db_did_full preserves 44 controls at t=2022
  est_method    = "dr",
  base_period   = "universal"
)
es_h1 <- aggte(out_h1, type = "dynamic", na.rm = TRUE)
ggdid(es_h1)

# H2 — Process quality (scale 0-1; expected ATT +0.05 to +0.15)
out_h2 <- att_gt(
  yname         = "process_quality_score",
  tname         = "fiscal_year",
  idname        = "twse_ticker",
  gname         = "gri_adoption_year",
  control_group = "notyettreated",
  xformla       = ~ ln_total_assets + roa + board_approved + standalone_sr + independent_director_ratio,
  data          = db_did_full,   # ← same reason
  est_method    = "dr"
)

# H4 — Heterogeneity (subsample CS21)
out_h4_low  <- att_gt(yname="n_material_topics_b", data=db_did_full |> filter(impact_intensity=="Low"),  ...)
out_h4_high <- att_gt(yname="n_material_topics_b", data=db_did_full |> filter(impact_intensity=="High"), ...)
# Triple-diff robustness
triple_diff_se <- boot_triple_diff(out_h4_low, out_h4_high, nboot=500)
```

**Robustness checks (all pre-registered; run in parallel with Stream A primary):**

**R1 — BJS Imputation (Borusyak, Jaravel & Spiess 2024)** `didimputation` package  
More efficient than CS21 under thin treatment-year control pool; estimates Y(0) from entire pre-treatment history rather than a single comparison period.
```r
library(didimputation)
bjs_h1 <- did_imputation(
  data          = db_did,
  yname         = "n_material_topics_b",
  idname        = "twse_ticker",
  tname         = "fiscal_year",
  gname         = "gri_adoption_year",
  first_stage   = ~ ln_total_assets + roa + standalone_sr | twse_ticker + fiscal_year
)
bjs_h2 <- did_imputation(data=db_did, yname="process_quality_score", ...)
```
**Decision rule:** If BJS and CS21 ATTs agree in direction and are within 20% of each other in magnitude → identification is credible. Report both in a robustness table.

**R2 — Wooldridge Extended TWFE (2021)** `fixest` — cohort × period interactions  
Transparent TWFE framing for accounting reviewers; near-identical estimates to CS21 under parallel trends; handles unbalanced panels without balanced cohort-time cell requirements.
```r
library(fixest)
db_did <- db_did |>
  mutate(g_t = paste0("g", gri_adoption_year, "_t", fiscal_year))

# H1
wtwfe_h1 <- feols(
  n_material_topics_b ~ i(g_t, ref = "g2023_t2022") +   # reference = NTT control cell
    ln_total_assets + roa + standalone_sr |
    twse_ticker + fiscal_year,
  data    = db_did,
  cluster = ~twse_ticker
)
# H2
wtwfe_h2 <- feols(process_quality_score ~ i(g_t, ref="g2023_t2022") +
                    ln_total_assets + roa + standalone_sr |
                    twse_ticker + fiscal_year,
                  data=db_did, cluster=~twse_ticker)
```
**Decision rule:** If Wooldridge extended TWFE estimates replicate CS21 direction and significance → parallel trends robust to estimation approach.

**R3 — Rambachan-Roth HonestDiD Sensitivity (2023)** ⚠️ NON-NEGOTIABLE  
With only 44 NTT controls at the treatment year (t=2022), parallel trends at the ATT identification cell cannot be empirically tested. HonestDiD provides formal bounds on how large a post-treatment trend violation would need to be to overturn the result. This is mandatory for all H1–H4 analyses.
```r
library(HonestDiD)
# Run after CS21 event-study; extract pre/post coefficients and vcov
es_h1_coefs <- summary(es_h1)$att.egt
es_h1_vcov  <- es_h1$V_analytical

HonestDiD::createSensitivityResults(
  betahat       = es_h1_coefs,
  sigma         = es_h1_vcov,
  numPrePeriods = 2,           # t = 2020, t = 2021
  numPostPeriods = 1,          # t = 2022 (primary ATT period)
  Mvec          = seq(0, 1, by = 0.1)   # M = multiple of max pre-trend
)
# Report: minimum M at which conclusion reverses (robustness ratio)
```
**Reporting standard:** State "the ATT estimate is robust to violations of parallel trends up to M = [X] times the largest observed pre-trend difference."

**Additional diagnostics (unchanged):**
- Bacon-Goodman decomposition: `bacon(outcome ~ post_gri3_it, data=db_did, id_var="twse_ticker", time_var="fiscal_year")`
- Poisson / Hurdle for `n_material_topics_b`
- Stream B propensity score; IPW weighting if AUC > 0.70

**Expected outputs:**
- Event-study plots for H1 and H2 (pre-trend + post-treatment)
- ATT point estimate + 95% CI for each cohort × time cell
- Triple-diff table for H4

**Assign to:** data-analyst  
**Depends on:** D1, D3, D4, OSF pre-registration

---

## Stream B — Parallel Trends Validation

**Purpose:** Test whether adoption timing (2022 vs 2023) is predicted by observable pre-treatment characteristics. If yes, the parallel trends assumption is weaker and IPW weighting should be applied to Stream A.

**Step 1 — Propensity score analysis:**
```r
db_2021 <- db_did |> filter(fiscal_year == 2021) |>
  mutate(early_adopter = if_else(gri_adoption_year == 2022, 1L, 0L))

ps_model <- glm(early_adopter ~ ln_total_assets + roa + sasb_industry + standalone_sr,
                data = db_2021, family = binomial)
roc_auc <- pROC::auc(pROC::roc(db_2021$early_adopter, predict(ps_model, type="response")))
```

**Decision rule (pre-register):**
- AUC ≤ 0.60: observables do not predict timing → parallel trends plausible; proceed with unweighted CS21
- AUC 0.60–0.70: partial predictability → report propensity score balance; note as limitation
- AUC > 0.70: strong selection on observables → apply IPW weighting in Stream A CS21; report weighted and unweighted results

**Step 2 — Covariate parallel trends (2016–2020, requires D5):**
```r
# Event-study on ln_total_assets and roa using 2016-2020 data
# Validates that financial trajectories were parallel before GRI 3 adoption
```

**Expected output:** Propensity score table; AUC; covariate balance plot (SMD before/after weighting); event-study on financial covariates.

**Assign to:** data-analyst  
**Depends on:** D4, D5

---

## Stream C — Cross-Sectional Intensity Analysis (2024 Snapshot)

**Purpose:** Estimate the association between cumulative years under GRI 3 (`years_since_adoption`) and disclosure outcomes in the 2024 cross-section. Tests medium-run learning effects; complements the short-run Stream A DiD.

**Sample:** 2024 company-years (1,022 rows), all post-adoption.

```r
db_2024 <- db |> filter(fiscal_year == 2024) |>
  mutate(years_since_adoption = 2024 - gri_adoption_year)
# years_since_adoption values: 3 (2021 cohort), 2 (2022), 1 (2023), 0 (2024)

# OLS — process quality
m_c1 <- feols(process_quality_score ~ years_since_adoption + ln_total_assets + roa +
              sasb_industry + standalone_sr, data=db_2024, vcov="hetero")

# Poisson — topic count (count outcome)
m_c2 <- fepois(n_material_topics_b ~ years_since_adoption + ln_total_assets + roa +
               sasb_industry + standalone_sr, data=db_2024)

# Interaction: does learning differ by impact_intensity?
m_c3 <- feols(process_quality_score ~ years_since_adoption * impact_intensity +
              ln_total_assets + roa + standalone_sr, data=db_2024, vcov="hetero")
```

**Caveat (must state in paper):** Cross-sectional identification. `years_since_adoption` is confounded with cohort effects and firm-specific adaptation capacity. This is descriptive, not causal. Complement to, not replacement of, Stream A.

**Expected output:** Coefficient tables with marginal effects; predicted values plot by `years_since_adoption` (0–3 years).

**Assign to:** data-analyst  
**Depends on:** D1, D3

---

## Stream D — H3 Assurance (Exploratory Logistic Regression)

**Purpose:** Characterise the association between GRI 3 adoption exposure and assurance upgrade, without causal claims.

**Sample:** 2024 cross-section (primary); pooled 2021–2024 panel (robustness).

```r
db_2024 <- db_2024 |>
  mutate(
    has_any_assurance  = if_else(assurance_level %in% c("Limited","Reasonable"), 1L, 0L),
    has_reasonable     = if_else(assurance_level == "Reasonable", 1L, 0L)
  )

# Primary: any assurance (better powered; 65-67% have assurance in recent years)
m_d1 <- glm(has_any_assurance ~ years_since_adoption + ln_total_assets + roa +
            sasb_industry + standalone_sr, data=db_2024, family=binomial)
margins::margins(m_d1)  # marginal effects

# Secondary: reasonable assurance (~5% prevalence — exploratory only)
m_d2 <- glm(has_reasonable ~ years_since_adoption + ln_total_assets + roa +
            sasb_industry, data=db_2024, family=binomial)

# Panel robustness (company FE logit)
m_d3 <- feglm(has_any_assurance ~ years_since_adoption + controls | twse_ticker,
              data=db, family=logit)
```

**Expected output:** Odds ratio table; predicted probability plots by `years_since_adoption`; note on `has_reasonable` low power.

**Assign to:** data-analyst  
**Depends on:** D4

---

## Stream E — Post-Adoption Within-Company Dynamics

**Purpose:** Test whether companies show a learning curve in process quality and topic management across the three post-adoption years (2022, 2023, 2024 for the 2022 cohort).

**Sample:** 2022 adoption cohort; fiscal years 2022–2024 (3 post-treatment observations per company).

```r
db_e <- db |>
  filter(gri_adoption_year == 2022, fiscal_year >= 2022) |>
  mutate(years_post = fiscal_year - 2022)  # 0, 1, 2

# Does process quality improve in year 2 and 3 post-adoption?
fe_e1 <- feols(process_quality_score ~ years_post | twse_ticker, data=db_e, cluster=~twse_ticker)

# Does topic count stabilise after initial displacement?
fe_e2 <- feols(n_material_topics_b ~ years_post | twse_ticker, data=db_e, cluster=~twse_ticker)

# NLP version: does ESG content density grow over post-adoption years?
# (run by language track — bilingual and zh_only separately)
fe_e3_en <- feols(finbert_gov_density ~ years_post | twse_ticker,
                  data=db_e |> filter(language_track=="bilingual"), cluster=~twse_ticker)
fe_e3_zh <- feols(bge_gov_density ~ years_post | twse_ticker,
                  data=db_e |> filter(language_track=="zh_only"), cluster=~twse_ticker)
```

**Expected output:** Within-company coefficient on `years_post`; marginal effects at year 0, 1, 2; trajectory plot.

**Assign to:** data-analyst  
**Depends on:** D1, D2, D4

---

## Stream F — NLP Supplementary Outcomes (Language-Track Stratified)

**Purpose:** Test whether GRI 3 adoption changes the substantive ESG content density of materiality disclosures, using pre-registered NLP models as supplementary outcome measures for H2.

### Model selection (pre-registered)

| Model | Track | Status | Rationale |
|---|---|---|---|
| FinBERT-ESG-9 | EN (bilingual) | ✅ Primary | Reasonable E/S/G proportions on TWSE reports |
| BGE-M3 | ZH (zh_only + bilingual) | ✅ Primary | Best-performing multilingual model |
| XLM-RoBERTa-XNLI | ZH | ✅ Secondary | Cross-lingual NLI; ENV/GOV binary useful |
| ClimateBERT | EN | ✅ Secondary | ENV dimension only |
| ESGLens SBERT | EN | ❌ Excluded | 57% GOV share — systematic training bias |

### Pre-analysis convergent validity check

Before running any DiD on NLP outcomes, compute Pearson r between `process_quality_score` and each NLP density score for the 2024 cross-section:

```r
cor_check <- db_2024 |>
  summarise(
    r_pqs_finbert_gov = cor(process_quality_score, finbert_gov_density, use="complete.obs"),
    r_pqs_bge_gov     = cor(process_quality_score, bge_gov_density,     use="complete.obs"),
    r_pqs_finbert_env = cor(process_quality_score, finbert_env_density, use="complete.obs"),
    r_pqs_bge_env     = cor(process_quality_score, bge_env_density,     use="complete.obs")
  )
```

**Interpretation:** r ≥ 0.20 = structural and NLP measures partially co-vary (report as supporting convergent validity); r < 0.05 = the two measures capture different constructs (report as finding: structural compliance ≠ substantive content depth).

### CS21 NLP estimation (stratified)

```r
# EN track — bilingual companies only
db_en <- db_did |> filter(language_track == "bilingual")

out_nlp_gov_en <- att_gt(
  yname         = "finbert_gov_density",
  tname         = "fiscal_year",
  idname        = "twse_ticker",
  gname         = "gri_adoption_year",
  control_group = "notyettreated",
  xformla       = ~ ln_total_assets + roa + standalone_sr,
  data          = db_en,
  est_method    = "dr"
)
# Repeat for finbert_env_density, finbert_soc_density, climatebert_climate

# ZH track — zh_only companies only
db_zh <- db_did |> filter(language_track == "zh_only")

out_nlp_gov_zh <- att_gt(
  yname = "bge_gov_density",
  ...,
  data  = db_zh
)
# Repeat for bge_env_density, bge_soc_density
```

**Critical constraint:** Never pool FinBERT and BGE-M3 results. Report EN and ZH NLP results in separate tables. State explicitly that cross-model comparisons are not valid (r_GOV = −0.017 on same bilingual documents).

**Expected outputs:**
- ATT event-study plots for each NLP density score, by language track
- Convergent validity table (r between structural and NLP measures)
- Summary table comparing structural H2 ATT vs NLP supplementary ATT

**Assign to:** data-analyst  
**Depends on:** D2, D4, OSF pre-registration

---

## Pending NLP Pipeline Work (does not block Streams A–E)

The following CN-track NLP runs are pending local GPU execution. They affect **Stream F** (NLP density outcomes) but do **not** block Streams A–E, which rely on structural variables (`n_material_topics_b`, `process_quality_score`, `mda_index`, `gri_content_index_completeness`).

| Cohort | Track | Pending | Scripts | Notes |
|---|---|---|---|---|
| 2020 | EN | 2 tickers (1531, 3447) | `phase1_step1_{3,1,2}_*_2020.py` | Only 2 `_E` files in 2020; all else done |
| 2021 | EN | ~1 ticker (6770) | `phase1_step1_{3,1,2}_*_2021.py` | 6770 excluded from original pass |
| 2021 | ZH — XLMR gap | 13 tickers | `phase2_step2_2_xlmr_2021_gap13.py` | Processing error in original run; all 13 produce sentences; then re-run `phase3_2021_cn_supplement.py` |
| 2022 | ZH expansion | ~392 files | `phase2_step2_1_bge_2022.py`, `phase2_step2_2_xlmr_2022.py`, `phase2_block_c_chinese_2022.py` | Scripts updated with EXCLUDE set `{1795,3704,9917,2832,3413,3014,3016}`; then re-run `phase3_2022.py` |
| 2023 | ZH expansion | ~500 files | `phase2_step2_1_bge_2023.py`, `phase2_step2_2_xlmr_2023.py`, `phase2_block_c_chinese_2023.py` | Scripts updated with EXCLUDE set (17 tickers); will upgrade ~500 `language_track` `en_only` → `bilingual`; then re-run `phase3_2023.py` |

After all CN expansion runs complete: regenerate `db_did_full.csv` and `db_did.csv` once more to capture updated `topic_depth_score` and `language_track`.

---

## OSF Pre-Registration Checklist

The following must be locked in the OSF pre-registration **before any att_gt() call**:

### Identification
- [ ] Timing-based DiD: 2022 cohort vs 2023 not-yet-treated controls
- [ ] `idname = "twse_ticker"` in all `att_gt()` calls
- [ ] `control_group = "notyettreated"`
- [ ] 2024 cohort excluded from treatment and control pool (rationale: only 6/307 have pre-2024 data)
- [ ] Estimation window: fiscal years 2020–2024 (outcome variables available from 2021; 2020 used as t−2 pre-trend for subset)

### Data preparation
- [ ] `n_material_topics_b` zeros set to NA for unprocessed rows before estimation
- [ ] `board_approved` excluded from covariate vector when base period is 2020
- [ ] `impact_intensity` derivation rule: High = {Resource, Infrastructure, Transportation, Minerals, Food}; Low = {Technology, Services, HealthCare, Financials}; Consumer + RenewableEnergy = sensitivity check

### Hypotheses
- [ ] H1 primary outcome: `n_material_topics_b`; expected sign: negative ATT (−2 to −5 topics)
- [ ] H2 primary outcome: `process_quality_score` (0–1 scale); expected ATT: +0.05 to +0.15
- [ ] H3 classified as exploratory logistic regression (not DiD); primary outcome: `has_any_assurance`
- [ ] H4: two subsample CS21 runs (High vs Low `impact_intensity`); triple-diff robustness; fallback to TWFE interaction if subsample CS21 fails to converge
- [ ] H5: 49 semiconductor companies; blocked on TSMC proximity data; classified supplementary

### NLP stream
- [ ] ESGLens excluded from primary NLP analysis
- [ ] Language-track stratification: FinBERT for bilingual EN reports; BGE-M3 for ZH-only reports; no pooling across models
- [ ] Convergent validity pre-check (r between `process_quality_score` and NLP density scores) run before DiD on NLP outcomes
- [ ] NLP outcomes classified as supplementary / pre-registered exploratory alongside H2

### Robustness (pre-registered, not primary)
- [ ] **R1 — BJS imputation** (Borusyak, Jaravel & Spiess 2024, *Rev. Econ. Studies* 91(6)): `didimputation::did_imputation()` with same covariate spec as primary CS21; report alongside CS21 ATTs in robustness table
- [ ] **R2 — Wooldridge extended TWFE** (Wooldridge 2021): `fixest::feols()` with cohort × period interaction dummies (`i(g_t, ref=...)`), unit + year FE, clustered SEs; replaces the basic TWFE placeholder
- [ ] **R3 — Rambachan-Roth HonestDiD** ⚠️ NON-NEGOTIABLE (Rambachan & Roth 2023, *Rev. Econ. Studies* 90(5)): `HonestDiD::createSensitivityResults()` for H1 and H2 event-studies; report minimum M at which conclusion reverses; required because ATT identification cell has only 44 NTT controls and post-treatment parallel trends cannot be empirically tested
- [ ] Bacon-Goodman decomposition diagnostic
- [ ] Poisson/Hurdle model for `n_material_topics_b`
- [ ] Stream B propensity score analysis; IPW weighting applied to Stream A if AUC > 0.70

---

## Agent Dispatch Plan (parallel)

Once data preparation tasks D1–D4 are complete and pre-registration is filed, dispatch the following **in parallel**:

| Agent | Stream(s) | Specific task |
|---|---|---|
| academic-researcher | Pre-registration support | Search: (1) DiD studies with all-treated / timing-based ID; (2) CS21 thin control group guidance; (3) Göttsche et al. (2025) displacement comparisons; (4) NLP ESG density as outcome measure in accounting research |
| web-researcher | Pre-registration support | FSC Taiwan GRI mandate timeline — was there an administrative deadline separating 2022 vs 2023 adopters? TWSE size thresholds for mandatory reporting |
| data-analyst | D1–D4, Stream B | Data prep + propensity score analysis (parallel trends validation) |
| data-analyst | Streams A, C, D, E, F | Full estimation after OSF filed (can batch into single agent session) |
| web-researcher | H5 | TSMC Supplier Sustainability Report lookup; HSP registry |

---

## Timeline Estimate

| Task | Estimated time | Dependency |
|---|---|---|
| Data prep (D1–D4) | 1–2 hours | None |
| Stream B (propensity + TEJ re-merge) | 2–4 hours | D4, D5 |
| OSF pre-registration draft | 2–3 hours | Hypothesis doc complete ✅ |
| OSF pre-registration submission | 1 hour | Draft complete |
| academic-researcher + web-researcher dispatch | 1–2 hours | Independent |
| Stream A estimation (H1–H4) | 2–3 hours | D1–D4, OSF |
| Streams C, D, E (cross-sectional + descriptive) | 1–2 hours | D1–D4 |
| Stream F NLP estimation | 2–3 hours | D2, D4, OSF |
| H5 (pending TSMC data) | 1–2 days | External data |
| **Total (excl. H5)** | **~2–3 days** | |

---

*Generated: research-coordinator | 2026-06-10*  
*Hypothesis doc: hypotheses/hypothesis-generation_did-hypotheses_2026-06-10.md*  
*Methodology doc: Materiality_Research_Methodology.md (updated June 10, 2026)*
