# OSF Pre-Registration — GRI 3 Materiality Disclosure Study (Taiwan)
**Title:** Does Mandatory GRI 3 Adoption Change Materiality Disclosure Quality? Evidence from Taiwan's Staggered ESG Reporting Reform  
**Date:** 2026-06-22  
**Last amended:** 2026-06-23 (Amendments A–I — OSF checklist compliance)  
**Status:** DRAFT — complete before any `att_gt()` call  
**Corresponding file:** `hypotheses/hypothesis-generation_did-hypotheses_2026-06-10.md`  
**Data:** `twse-research-database.csv` (5,408 rows; DiD window: 3,283 rows, 2020–2024)

> ⚠️ **Hard rule:** No inferential test (no `att_gt()`, no `feols()`, no `glm()`) may be run until this document is uploaded to OSF and the registration ID is recorded here.

---

## 0. Study Team (Amendment A — 2026-06-23)

| Role | Name | Affiliation | ORCID |
|---|---|---|---|
| Principal Investigator | [PI NAME — to be completed before OSF submission] | [Institution] | [ORCID] |
| Co-Investigator / Collaborator | [NAME] | [Institution] | [ORCID] |

> **Action required:** Complete this table before OSF submission. The PI is responsible for signing off on the internal review (Amendment H) and confirming IRB exemption status (Amendment F).

---

## 0b. Recruitment Plan — N/A (Amendment B — 2026-06-23)

**This study does not involve human participant recruitment.**

This is an archival, secondary-data study. The sample consists of TWSE-listed companies identified from:
- Publicly available Taiwan Stock Exchange (TWSE) sustainability report PDFs
- Taiwan Economic Journal (TEJ) commercial financial database

No individuals are recruited, contacted, or consented. All data are at the firm-year level. The sample frame is determined by data availability and the FSC regulatory mandate, not by researcher recruitment decisions.

---

## 0c. Stopping Rule — N/A (Amendment C — 2026-06-23)

**No sequential stopping rule applies to this study.**

The dataset is fixed and fully collected prior to registration. `db_did.csv` (2,960 rows × 202 cols) and `db_did_full.csv` (3,283 rows × 202 cols) are constituted as of Pass DB-07 (2026-06-23). No further data collection will occur after registration. All analyses proceed on this frozen dataset.

Any decision to exclude additional observations post-registration must be documented as a pre-specified deviation before the analysis is run (see §10 Deviations Policy).

---

## 0d. Missing-Data Handling (Amendment D — 2026-06-23)

**Policy: listwise deletion within each Callaway-Sant'Anna (g,t) cell.**

- `att_gt()` uses only firm-year observations with non-missing values on all variables in `xformla` for that specific (g,t) cell.
- No imputation is performed in the primary specification.
- Covariate coverage statistics are reported in a supplementary table (see §2 for availability by variable).
- **Reduced covariate vector** for t−2 pre-trend cells (base_period = 2020): `~ ln_total_assets + roa + standalone_sr` — applied because `independent_director_ratio` has 0% coverage for 2020 (TEJ board data starts 2021).
- `tesg_score` is excluded from primary `xformla` due to 0 non-zero observations for 2023–2024; included only as a time-invariant 2022 value in robustness check R6.
- Missing `twse_cgq_score` rows (4.9% of DiD window): excluded from robustness check R6 specification only; primary analysis unaffected.

---

## 0e. Outlier Handling (Amendment E — 2026-06-23)

**Policy: no winsorizing in the primary specification.**

- Continuous covariates (`ln_total_assets`, `roa`) are used as-is. `ln_total_assets` is already log-transformed, reducing skew. `roa` extreme values are retained in the primary model.
- `n_material_topics_b` (count outcome): zeros have been set to NA per Pass DB-03 (not outlier removal — these represent unprocessed PDF placeholders, not true zero-topic disclosures). No further trimming.
- `process_quality_score` (0–1 scale): no trimming; values are bounded by construction.
- **Robustness check R4** (Poisson / Hurdle model) addresses potential count outcome distributional concerns without discarding data.
- Any post-registration decision to winsorize a covariate must be logged as a deviation before analysis and reported in the paper.

---

## 0f. Ethics / IRB Approval Status (Amendment F — 2026-06-23)

**Data source:** Publicly available TWSE sustainability reports (PDF) and TEJ commercial database subscribed to by the research institution.

**Human subjects:** None. All data are at the company level. No individuals are identified, contacted, or studied.

**IRB status:** [TO BE COMPLETED — confirm with host institution's ethics office before OSF submission]  
- **Expected status:** Exempt — secondary analysis of publicly available, non-identifiable corporate data.
- **Institution:** [Institution name]
- **Reference number (if applicable):** [IRB ref or "Exempt — confirmed [date]"]

> **Action required:** Obtain written confirmation of exempt status (or formal IRB approval if required by institution) before submitting to OSF.

---

## 0g. Data-Sharing Plan (Amendment G — 2026-06-23)

| Asset | Sharing plan | Timing |
|---|---|---|
| `db_did.csv` (processed analysis file) | Deposited on OSF upon manuscript acceptance | Post-acceptance |
| `db_did_full.csv` (full DiD window) | Deposited on OSF upon manuscript acceptance | Post-acceptance |
| Raw TWSE sustainability report PDFs | **Cannot be shared** — subject to TWSE copyright; available from TWSE public portal | N/A |
| TEJ database extracts | **Cannot be shared** — commercial license; available via TEJ subscription | N/A |
| R analysis scripts (all streams A–F) | Deposited on OSF upon manuscript acceptance; MIT license | Post-acceptance |
| PDF extraction / NLP pipeline code | Deposited on OSF or GitHub upon manuscript acceptance | Post-acceptance |

**OSF project visibility:** Public (registration and scripts/data visible upon deposit).

---

## 0h. Internal Review (Amendment H — 2026-06-23)

This preregistration document must be reviewed by the PI and at least one co-author before OSF submission.

| Reviewer | Role | Review date | Sign-off |
|---|---|---|---|
| [PI NAME] | Principal Investigator | [DATE] | [ ] |
| [CO-AUTHOR] | Co-Investigator | [DATE] | [ ] |

**Checklist for internal review:**
- [ ] All hypotheses match the hypothesis-generation file (`hypotheses/hypothesis-generation_did-hypotheses_2026-06-10.md`)
- [ ] All variable names match the current database column names (DB-07; 202 cols)
- [ ] R code blocks are syntactically correct and refer to existing column names
- [ ] Data exclusion rules in §2 and §6 are consistent
- [ ] All robustness checks in §7 are feasible with the current dataset
- [ ] Amendments A–I have been reviewed and approved

> **Hard rule:** Do not submit to OSF until all sign-offs above are complete.

---

## 0i. OSF Preregistration Template (Amendment I — 2026-06-23)

**Recommended template:** OSF Preregistration (standard template — suitable for social science / management research)

**Alternative:** AsPredicted (#pre-registration) — simpler format; acceptable if journal requires it.

**Rationale for OSF Preregistration template:** This study has multiple hypotheses, a staggered DiD design, and extensive robustness checks that require the full-form OSF template's structured fields (study design, analysis plan, etc.). AsPredicted's minimal format is insufficient for this complexity.

**Template selection:** To be confirmed on the OSF Registrations page → New Registration → "OSF Preregistration".

> **Action required:** Select template on OSF before pasting this document's content into the registration form fields.

---

## 1. Study Overview

### Research question
Does earlier adoption of GRI Universal Standards 2021 (GRI 3) — mandated by Taiwan's Financial Supervisory Commission (FSC) for listed companies — cause changes in (a) the number of material topics disclosed and (b) the quality of the materiality determination process, relative to companies that have not yet adopted?

### Identification strategy
**Timing-based staggered DiD.** Every TWSE company in the PDF-processed universe adopted GRI 3 between 2021 and 2024 — there are no never-treated companies. Identification therefore relies on variation in *when* companies adopted. The dominant treatment cohort (g=2022; 593 companies) is compared against companies that adopted later (g=2023; 126 companies) as not-yet-treated controls during the pre-2023 window.

**Parallel trends assumption:** Absent GRI 3, 2022-adopting and 2023-adopting companies would have followed similar materiality disclosure trajectories. This is plausible given both groups operated under the same FSC regulatory environment; timing variation likely reflects administrative capacity and audit scheduling rather than pre-existing quality differences. The assumption is tested empirically via Stream B propensity score analysis and the pre-trend coefficients from `aggte(type="dynamic")`.

### Primary estimator
Callaway-Sant'Anna (2021) — `att_gt()` in R `did` package:
```r
att_gt(
  yname     = "n_material_topics_b",          # or process_quality_score for H2
  tname     = "fiscal_year",
  idname    = "twse_ticker",                   # NOT company_id
  gname     = "gri_adoption_year",
  data      = db_did,                          # db_did.csv — g=2024 excluded
  control_group = "notyettreated",
  xformla   = ~ ln_total_assets + roa + standalone_sr + independent_director_ratio,
  panel     = TRUE,
  allow_unbalanced_panel = TRUE
)
```

---

## 2. Data

### Sample construction
| Step | N rows | N companies |
|---|---|---|
| Master DB (all years) | 5,408 | 1,226 |
| DiD window (2020–2024) | 3,283 | — |
| g=2024 cohort excluded (no pre-treatment baseline) | −323 | −307 |
| **Core analysis file (db_did.csv)** | **2,960** | **~919** |
| Estimable panel (≥1 pre + ≥1 post obs) | ~495 | ~495 |

**File used for primary analysis:** `data/db_did.csv` (g=2024 excluded across all years)  
**File used for descriptive/full-window analysis:** `data/db_did_full.csv` (all 2020–2024 rows)

### Treatment variable
`gri_adoption_year` — first fiscal year a company reports under GRI Universal Standards 2021. Source: manual coding from PDF report content. Cohort distribution: g=2021 (10), g=2022 (593), g=2023 (126), g=2024 (307).

### Outcome variables
| Variable | Type | Notes |
|---|---|---|
| `n_material_topics_b` | Count | H1 primary; zeros → NA before estimation (Pass DB-03; zeros = unprocessed placeholder, not true zero-topic disclosure) |
| `process_quality_score` | Continuous 0–1 | H2 primary; composite of 5 materiality-process sub-indicators |
| `has_any_assurance` | Binary | H3 primary (exploratory logistic); = 1 if assurance_level ∈ {Limited, Reasonable} |
| `n_material_topics_a` | Count | **Dropped from primary analysis** — 100% identical to `n_material_topics_b` (r = 1.000, confirmed 2026-06-22). Do not use as a separate outcome. Document in a footnote. |

### Covariates (primary specification)
| Variable | Rationale | Availability caveat |
|---|---|---|
| `ln_total_assets` | Firm size — larger firms have more disclosure resources | 92% in DiD window |
| `roa` | Profitability — affects reporting investment | 92% in DiD window |
| `standalone_sr` | Report format — standalone SR vs integrated | 100% |
| `independent_director_ratio` | Governance quality | **Exclude when base_period = 2020** (TEJ board diversity data starts 2021; 0% coverage for 2020) |
| `board_approved` | Board oversight of reporting | **Exclude when base_period = 2020** (25% coverage for 2020) |

**Exclusion rule (pre-specified):** When `att_gt()` uses 2020 as the base period (pre-trend t−2 cells), use reduced covariate vector: `xformla = ~ ln_total_assets + roa + standalone_sr`. Full spec (including `independent_director_ratio`) applies for t≥2021 base periods.

**Dropped covariate:** `board_esg_committee` — column does not exist in current DB (already dropped from prior version). Do not include.

### ESG rating covariate — TWSE CGQ / tesg_score
`tesg_score` (TEJ ESG score) is available for 2020–2022 only; 0 non-zero observations for 2023 and 2024. It is **not viable as a time-varying covariate** in the DiD specification.

**Decision (2026-06-22):** Use `tesg_score` as a **time-invariant pre-treatment baseline control** in robustness checks only — take the 2022 value for each company and include it as a company-level constant. Do not include in the primary `xformla`.

**TWSE Corporate Governance Evaluation score (`twse_cgq_score`):** ✅ **Integrated into DB** (col 191, 2026-06-22). Source: `TEJ_TWSECG.xlsx`. Ordinal 1–7 (7 = top 5%; 1 = bottom 20%+; 0/blank = not evaluated). Coverage: 95.1% across DiD window (2020: 97%, 2021: 96%, 2022: 96%, 2023: 95%, 2024: 93%). Score distribution: mean=3.55, SD=1.88.

**Decision — robustness covariate only, not primary:**
CGE criteria include ESG/sustainability reporting indicators, creating potential endogeneity — companies adopting GRI 3 may receive higher CGQ scores because of that adoption. To avoid post-treatment contamination:
- Use **lagged CGQ score** (t−1 value) or the **2021 pre-treatment value** in robustness specifications
- Do NOT include in the primary `xformla` passed to `att_gt()`
- Pre-registered robustness check R6: re-run primary CS21 with `xformla = ~ ln_total_assets + roa + standalone_sr + independent_director_ratio + twse_cgq_score_lag1`

---

## 3. Hypotheses and Estimands

### H1 — Displacement effect on material topic count (CONFIRMATORY)
**Statement:** Earlier GRI 3 adoption (g=2022) causes a net *decrease* in `n_material_topics_b` relative to the not-yet-treated g=2023 cohort, consistent with GRI 3-3's compliance burden compressing topic scope.

**Expected sign:** Negative ATT  
**Expected magnitude:** −2 to −5 topics (pre-adoption mean of non-zero rows ≈ 15.0, SD ≈ 7)  
**Primary cell:** ATT(g=2022, t=2022) — 442 treated, 44 NTT controls  
**Year +1 cell:** ATT(g=2022, t=2023) — **CONFIRMATORY** (124 NTT controls; upgraded from exploratory per 2026-06-22 DB correction)

> **Note on upgrade:** Prior pre-registration drafts marked ATT(g=2022, t=2023) as exploratory due to a control pool of n=3. After DB expansion to include 2016–2019 historical rows, the g=2023 cohort has 124 companies with 2023 observations. ATT(g=2022, t=2023) is now fully powered and is **pre-registered as confirmatory**.

**Falsification:** Null or positive ATT rejects the displacement hypothesis.

---

### H2 — Process quality upgrade (CONFIRMATORY)
**Statement:** Earlier GRI 3 adoption causes a significant *increase* in `process_quality_score` (0–1 scale), as GRI 3's four-step DMA methodology imposes minimum process documentation requirements.

**Expected sign:** Positive ATT  
**Expected magnitude:** +0.05 to +0.15 (5–15 percentage points on the 0–1 scale)  
**Scale note:** `process_quality_score` is stored on a **0–1 scale** — any prior document stating "0–10" is incorrect.

**Falsification:** Null or negative ATT suggests boilerplate adoption without substantive implementation.

---

### H3 — Assurance upgrade (EXPLORATORY — reclassified from DiD)
**Statement:** Companies with longer exposure to GRI 3 (more years since adoption) are associated with a higher probability of obtaining external assurance.

**Reclassification rationale:** "Reasonable" assurance prevalence is ~4.1% — CS21 DiD cannot be powered with 43 control companies. Reclassified to exploratory logistic regression.

**Assurance severity ladder (pre-specified; three ascending levels):**
| Level | Variable | Prevalence (DiD window) | Specification |
|---|---|---|---|
| 0 | No assurance (`has_any_assurance = 0`) | 39.1% | Reference category |
| 1 | Any assurance, non-Big4 provider | 41.0% | `has_any_assurance = 1, big4_assurance = 0` |
| 2 | Big4 assurance (PwC/EY/Deloitte/KPMG) | 19.9% | `big4_assurance = 1` |

**Pre-computed columns in DB (Pass DB-06):**
- `has_any_assurance` (col 193): binary; = 1 if `assurance_level ∈ {Limited, Reasonable}`; 60.9% prevalence
- `big4_assurance` (col 194): binary; = 1 if assurance provider ∈ {資誠聯合, 安永聯合, 勤業眾信聯合, 安侯建業聯合}; 19.9% prevalence
- `has_reasonable_assurance`: derived in R; = 1 if `assurance_level = "Reasonable"`; ~4.1% prevalence (appendix only)

**Primary outcome:** `has_any_assurance` — best-powered binary (60.9% vs 39.1% split)  
**Secondary outcome:** `big4_assurance` — assurance quality tier (Big4 vs non-Big4 or none)  
**Exploratory outcome (appendix only):** `has_reasonable_assurance` — severely underpowered; report ORs with wide CIs, no inferential claim  

**Estimator:**
```r
# Primary
glm(has_any_assurance ~ years_since_adoption + ln_total_assets + roa +
    sasb_industry + standalone_sr + big4_financial_auditor,
    family = binomial, data = db_did)

# Secondary
glm(big4_assurance ~ years_since_adoption + ln_total_assets + roa +
    sasb_industry + standalone_sr + big4_financial_auditor,
    family = binomial, data = db_did)
```

**Additional control:** `big4_financial_auditor` (col 195; 88.1% prevalence) — financial auditor identity correlates with assurance provider selection; include in both primary and secondary specifications.

**Causal claim:** **None.** H3 is descriptive/associational. Do not interpret ORs as treatment effects.

---

### H4 — Heterogeneous displacement by industry impact intensity (CONFIRMATORY — subsample)
**Statement:** The displacement effect (H1) is significantly stronger for low-impact-footprint industries (Technology, Services, HealthCare, Financials) than for high-impact industries (Resource, Infrastructure, Transportation, Minerals, Food).

**Moderator derivation (locked — do not modify after registration):**
```r
db <- db |> mutate(
  impact_intensity = case_when(
    sasb_industry %in% c("Resource","Infrastructure","Transportation","Minerals","Food") ~ "High",
    sasb_industry %in% c("Technology","Services","HealthCare","Financials")              ~ "Low",
    sasb_industry %in% c("Consumer","RenewableEnergy")                                   ~ "Sensitivity",
    TRUE ~ NA_character_
  )
)
```
Consumer and RenewableEnergy: **sensitivity check** — run once included (as Low), once excluded.

**Estimator:** Two subsample CS21 runs. If convergence fails: TWFE with `impact_intensity × post_gri3_it` interaction.

**Expected sign:** ATT(Low) < ATT(High) < 0 — both negative; Low-impact more negative.

---

### H5 — Semiconductor TSMC-proximity effect (SUPPLEMENTARY — BLOCKED)
**Status:** Blocked on external data coding (TSMC tier-1 supplier list; Hsinchu Science Park registry).  
**Population:** 49 TWSE semiconductor companies (`semiconductor_cat = 1`).  
**Register now as supplementary pending data.** Do not run until TSMC proximity indicator is coded and locked.

---

## 4. Control Group Cells — Critical Documentation

| ATT cell | Treated (n) | NTT Controls (n) | Estimability |
|---|---|---|---|
| g=2022, t=2020 (pre-trend t−2) | 381 | 37 | ✅ Pre-trend test |
| g=2022, t=2021 (pre-trend t−1) | 438 | 43 | ✅ Pre-trend test |
| g=2022, t=2022 (treatment year) | 442 | 44 | ✅ **PRIMARY ATT** |
| g=2022, t=2023 (year +1) | 431 | **124** | ✅ **CONFIRMATORY** (upgraded 2026-06-22) |
| g=2023, t=2022 (pre-trend t−1) | 39 | 4 | ⚠️ Thin — report but caveat heavily |
| g=2023, t=2023 (treatment year) | 41 | **124** | ✅ Secondary ATT |

**Caution:** The g=2023 pre-trend cell (n=4 controls) is severely underpowered. The g=2022 cells are the primary estimable population.

---

## 5. Analysis Streams

| Stream | Type | Estimator | Primary outcome | Status |
|---|---|---|---|---|
| A | Primary DiD | CS21 `att_gt()` | H1, H2, H4 | Blocked on OSF registration |
| B | Pre-trend validation | OLS propensity | Covariate balance + parallel trends | Can run before registration |
| C | Cross-sectional | OLS / Poisson | `process_quality_score`, `n_material_topics_b` by `years_since_adoption` | Can run before registration |
| D | H3 assurance | Logistic regression | `has_any_assurance` | Can run before registration |
| E | Post-adoption dynamics | Panel OLS / FE | Within-company trajectory | Blocked on OSF registration |
| F (NLP) | Supplementary | CS21 stratified | `finbert_gov_density`, `bge_gov_density` | Blocked on OSF registration |

Streams B, C, D are **descriptive/exploratory** and are not blocked by OSF registration. They should be completed before registration to inform the parallel trends narrative. Streams A, E, F are **inferential** and are hard-blocked.

---

## 6. Data Preparation Steps (must be complete before `att_gt()`)

| Step | Status |
|---|---|
| `n_material_topics_b` zeros → NA (Pass 87 + Pass DB-03) | ✅ DONE |
| `language_track` column tagged | ✅ DONE |
| `impact_intensity` derived and locked | ✅ DONE (column in DB) |
| g=2024 cohort excluded from db_did.csv | ✅ DONE |
| `sasb_industry` filled for all DiD window rows | ✅ DONE (Pass DB-04: 37 rows, 20 tickers, 2026-06-22) |
| Board diversity patch (Pass DB-02) | ✅ DONE |
| `twse_cgq_score` integrated (Pass DB-05) | ✅ DONE (3,122/3,283 = 95.1%; ordinal 1–7; 2026-06-22) |
| Assurance columns added (Pass DB-06) | ✅ DONE (`has_any_assurance` col 193; `big4_assurance` col 194; `big4_financial_auditor` col 195; 2026-06-22) |
| Block E topic dynamics merged (Pass DB-07) | ✅ DONE (`jaccard_similarity` col 196; `topic_churn_rate` col 197; `topics_added_n` col 198; `topics_dropped_n` col 199; `net_topic_change` col 200; `topics_added_codes` col 201; `topics_dropped_codes` col 202; 1,313 rows FY 2022–2024; 2026-06-23) |
| OSF pre-registration uploaded | 🔴 PENDING — last hard blocker |

---

## 7. Robustness Checks (pre-registered, not primary)

All robustness checks must be run and reported regardless of significance direction.

1. **BJS imputation** — `didimputation::did_imputation()` as CS21 cross-check
2. **Wooldridge extended TWFE** — `fixest::feols(outcome ~ post_gri3_it + controls | twse_ticker + fiscal_year + twse_ticker^fiscal_year, cluster=~twse_ticker)` with cohort × time interactions
3. **Rambachan-Roth HonestDiD** — `HonestDiD::createSensitivityResults()` — **non-negotiable** given only 44 NTT controls at primary treatment cell
4. **Poisson / Hurdle model** for count outcome (`n_material_topics_b`)
5. **H4 TWFE fallback** — `feols(n_material_topics_b ~ post_gri3_it * impact_intensity + controls | twse_ticker + fiscal_year)` if subsample CS21 fails to converge
6. **`tesg_score_2022` as time-invariant control** — include the 2022 `tesg_score` as a company-level pre-treatment characteristic in robustness specifications
7. **`control_group = "nevertreated"`** — will return zero control units; document as confirmation of the all-adopted universe (not a failure)
8. **Bacon-Goodman decomposition diagnostic** — document heterogeneity in treatment timing weights
9. **Stream C with `sasb_industry` FE** — partial out industry effects in the cross-sectional association analysis

---

## 8. NLP Supplementary Stream (Stream F) — Pre-Specified

### Language-track stratification (mandatory — do not pool across tracks)
| Company type | Primary model | Secondary model |
|---|---|---|
| Bilingual (EN + ZH reports) | FinBERT-ESG-9 on EN report | BGE-M3 on ZH report (report separately) |
| ZH-only | BGE-M3 | XLM-RoBERTa-XNLI |
| EN-only (n=4) | Exclude | — |

### Model exclusion
**ESGLens excluded from primary NLP analysis** — systematic GOV over-classification (57% GOV share vs expected ~33%). May appear in appendix with explicit bias caveat.

### Pre-analysis convergent validity check
Before running any NLP CS21 cells: compute Pearson r between `process_quality_score` and each NLP density score for the 2024 cross-section. If r < 0.05 for all models, report divergence as a finding (structural compliance ≠ substantive content depth).

### Expected sign
Positive — ESG sentence density is expected to increase post-GRI 3 adoption as reports become more topically comprehensive.

---

## 9. Pre-Registration Checklist

- [ ] Upload this document to OSF and obtain registration DOI
- [x] `idname = "twse_ticker"` confirmed in all `att_gt()` calls
- [x] g=2024 cohort excluded from db_did.csv — rationale: only 6 companies have any pre-2024 observations
- [x] `impact_intensity` derivation locked (High/Low/Sensitivity rule in §3 H4)
- [x] `board_approved` and `independent_director_ratio` excluded from covariate vector when base_period = 2020
- [x] `process_quality_score` confirmed on 0–1 scale; expected ATT +0.05 to +0.15
- [x] H3 classified as exploratory logistic; severity ladder pre-specified: primary = `has_any_assurance` (60.9%), secondary = `big4_assurance` (19.9%), exploratory appendix = `has_reasonable_assurance` (~4.1%)
- [x] `big4_financial_auditor` (col 195; 88.1%) added as H3 control covariate (Pass DB-06)
- [x] NLP Stream F pre-specified with language-track stratification; ESGLens excluded
- [x] Convergent validity check (NLP vs `process_quality_score`) pre-specified as a pre-analysis step
- [x] zeros→NA data prep for `n_material_topics_b` — Pass DB-03 cleaning script
- [x] `control_group = "notyettreated"` — documented control pool per ATT cell in §4
- [x] ATT(g=2022, t=2023) **upgraded to CONFIRMATORY** (NTT pool = 124, corrected 2026-06-22)
- [x] ATT(g=2022, t=2022) is the primary treatment-year cell (44 controls)
- [x] g=2023, t=2022 pre-trend cell (n=4 controls) — report with heavy caveat only
- [x] Rambachan-Roth sensitivity analysis pre-registered as mandatory robustness check
- [x] Stream B propensity score — if adoption timing predicted by observables (ROC-AUC > 0.70), pre-weight CS21 estimator
- [x] H5 registered as supplementary, blocked on TSMC proximity data
- [x] `n_material_topics_a` dropped from primary analysis — identical to `_b` (r = 1.000); retained in DB but not used as outcome
- [x] `board_esg_committee` dropped — column does not exist in current DB
- [x] TEJ CGQ data (`twse_cgq_score`) integrated as Pass DB-05; confirmed as robustness-only covariate (endogeneity risk with GRI adoption); primary spec unaffected



OSF Preregistration Checklist according to Perplexity

[ ] Project title is final.
[ ] Principal investigator and collaborators are listed.
[ ] Research question is stated clearly.
[ ] Primary hypotheses are written.
[ ] Study design is described.
[ ] Participants are defined, including inclusion and exclusion criteria.
[ ] Target sample size is justified.
[ ] Recruitment plan is specified.
[ ] Materials, tasks, and measures are listed.
[ ] Procedure is written step by step.
[ ] Primary outcome variables are defined.
[ ] Secondary outcome variables are defined.
[ ] Stopping rule is stated.
[ ] Data exclusion rules are defined.
[ ] Missing-data handling is specified.
[ ] Outlier handling is specified.
[ ] Statistical analysis plan is written.
[ ] Exploratory analyses are labeled as exploratory.
[ ] Ethics/IRB approval status is noted.
[ ] Data-sharing plan is included.
[ ] Internal review is complete before submission.
[ ] OSF project is created.
[ ] Correct preregistration template is selected.
[ ] Registration is submitted on the OSF Registrations page.
[ ] If public, DOI creation is enabled.
[ ] Final registration link/DOI is saved for citation.

---

## 10. Exclusions and Deviations Policy

Any deviation from this pre-registered plan must be documented in a post-registration amendment before the analysis is run. Exploratory analyses conducted post-registration (i.e., tests not listed here) must be clearly labelled as exploratory in all outputs and papers.

---

*Prepared: 2026-06-22*  
*OSF registration DOI: PENDING*  
*Data version: twse-research-database.csv (Pass DB-07; 5,408 rows × 202 cols)*
