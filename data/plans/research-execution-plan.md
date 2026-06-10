# Research Execution Plan — GRI 3 Materiality DiD Study
**Date:** 2026-06-10  
**Status:** Pre-estimation planning — six parallel streams  
**Hypothesis file:** `hypotheses/hypothesis-generation_did-hypotheses_2026-06-10.md`  
**Methodology file:** `Materiality_Research_Methodology.md` (updated June 10, 2026)

---

## Overview

Six parallel analysis streams address the constraints of the PDF-processed TWSE GRI reporter universe (1,036 companies; all treated; timing-based identification). Streams A, C, D, E, and F can run concurrently after data preparation is complete. Stream B informs the identification narrative but does not block other streams.

**Hard blockers before any estimation:** (1) ~~zeros→NA for `n_material_topics_b`~~ **✅ DONE — Pass 87 (2026-06-10)**; (2) OSF pre-registration.

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

### Task D1 — Set n_material_topics_b zeros → NA

**What:** 882 rows (26.9%) have `n_material_topics_b = 0` as an artefact of unprocessed PDF rows (no GRI code extraction run). These are not true zero-topic reports.

**Script logic:**
```python
# Identify unprocessed rows: zero value AND no corresponding extraction output
db['n_material_topics_b'] = db['n_material_topics_b'].where(
    db['n_material_topics_b'] > 0, other=pd.NA
)
# Apply same logic to n_material_topics_a where zeros are present
```

**Validation:** After setting zeros to NA, check that non-null `n_material_topics_b` distribution (min=1, max=36, mean≈15) is unchanged for the non-zero rows.

**Assign to:** data-analyst  
**Blocks:** Streams A, C, E  
**Est. time:** 30 minutes

---

### Task D2 — Tag language_track column

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

**Reference counts (2021):** bilingual=303, zh_only=183, en_only=4, neither=1

**Assign to:** data-analyst  
**Blocks:** Stream F  
**Est. time:** 30 minutes

---

### Task D3 — Derive and lock impact_intensity

**What:** Pre-specify the H4 moderator before running any regression.

**Rule (lock in pre-registration):**
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

**Assign to:** data-analyst  
**Blocks:** Stream A (H4)  
**Est. time:** 15 minutes

---

### Task D4 — Exclude 2024 cohort

**What:** Remove 2024 adoption cohort rows from the treatment pool and from the not-yet-treated control pool in all H1–H4 CS21 runs.

```r
db_did <- db |> filter(gri_adoption_year != 2024 | is.na(gri_adoption_year))
# Also filter out 2024 cohort from the panel entirely for cleaner estimation
db_did <- db |> filter(!(gri_adoption_year == 2024))
```

**Rationale:** Only 6/307 companies in the 2024 cohort have pre-2024 observations — they contribute neither as treated units (no pre-treatment baseline) nor as meaningful controls (barely appear in pre-treatment years).

**Assign to:** data-analyst  
**Blocks:** Streams A, F  
**Est. time:** 15 minutes

---

### Task D5 — Re-merge TEJ 2016–2020 financials (Stream B only)

**What:** Extract `twse_ticker`, `fiscal_year`, `ln_total_assets`, `roa` from `twse-research-database_pre-nlp-repair.csv` for rows where `fiscal_year ∈ {2016, 2017, 2018, 2019, 2020}`. Merge into the current DB for Stream B covariate parallel trends validation only. Do NOT populate NLP outcome variables for pre-2021 rows.

**Assign to:** data-analyst  
**Blocks:** Stream B only  
**Est. time:** 1–2 hours

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

# H1 — Displacement
out_h1 <- att_gt(
  yname         = "n_material_topics_b",
  tname         = "fiscal_year",
  idname        = "twse_ticker",
  gname         = "gri_adoption_year",
  control_group = "notyettreated",
  xformla       = ~ ln_total_assets + roa + standalone_sr,
  data          = db_did,
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
  xformla       = ~ ln_total_assets + roa + board_approved + standalone_sr,
  data          = db_did,
  est_method    = "dr"
)

# H4 — Heterogeneity (subsample CS21)
out_h4_low  <- att_gt(yname="n_material_topics_b", data=db_did |> filter(impact_intensity=="Low"),  ...)
out_h4_high <- att_gt(yname="n_material_topics_b", data=db_did |> filter(impact_intensity=="High"), ...)
# Triple-diff robustness
triple_diff_se <- boot_triple_diff(out_h4_low, out_h4_high, nboot=500)
```

**Robustness checks:**
- TWFE: `feols(outcome ~ post_gri3_it + controls | twse_ticker + fiscal_year, cluster=~twse_ticker)`
- Rambachan-Roth: `HonestDiD::createSensitivityResults(out_h1)`
- Bacon-Goodman decomposition: `bacon(outcome ~ post_gri3_it, data=db_did, id_var="twse_ticker", time_var="fiscal_year")`
- Poisson / Hurdle for n_material_topics_b

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
- [ ] TWFE as CS21 alternative
- [ ] Rambachan-Roth sensitivity analysis
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
