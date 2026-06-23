---
agent: academic-researcher
type: methodology
topic: "twse-materiality-did"
version: "2026-06-23"
supersedes: "Materiality_Research_Methodology.md (prior version)"
status: canonical
db_version: "Pass DB-08 | 5,408 rows × 208 cols"
---

# Research Methodology — GRI 3 Materiality Disclosure and Staggered DiD
**Study:** Does Mandatory GRI 3 Adoption Change Materiality Disclosure Quality? Evidence from Taiwan's Staggered ESG Reporting Reform  
**Last updated:** 2026-06-23  
**Cross-references:** `hypotheses/hypothesis-generation_did-hypotheses_2026-06-10.md` · `data/DB quality/db-quality-assessment.md` · `research-execution-plan_2026-06-10.md` · `OSF Preregistration/osf-preregistration_twse-materiality_2026-06-22.md`

---

## 1. Research Questions

This study addresses four empirical questions about the consequences of mandatory GRI Universal Standards 2021 (GRI 3) adoption among Taiwan Stock Exchange (TWSE) listed companies:

1. **Displacement (H1):** Does GRI 3 adoption cause a net *decrease* in the number of material topics disclosed, as the mandatory management-of-material-topics (GRI 3-3) disclosures impose per-topic compliance costs that narrow the scope of what companies willingly report?

2. **Quality upgrade (H2):** Does GRI 3 adoption cause a significant *increase* in materiality process quality, as the GRI 3 four-step Due Diligence Methodology (DMA) imposes minimum process documentation standards?

3. **Assurance upgrade (H3):** Is longer GRI 3 exposure associated with a higher probability of obtaining external ESG assurance, and at a higher assurance quality tier (Big4 vs non-Big4)?

4. **Heterogeneous displacement (H4):** Is the displacement effect (H1) stronger for light-footprint companies (Technology, Services, HealthCare, Financials) than for operational-impact-intensive companies (Resource, Infrastructure, Transportation, Minerals, Food)?

A fifth question — **supply-chain diffusion (H5)** — concerning TSMC-proximity effects on GRI 3 adoption timing among TWSE semiconductor companies — is registered as supplementary and blocked on external data collection.

---

## 2. Institutional Context

Taiwan's Financial Supervisory Commission (FSC) mandated GRI Universal Standards 2021 (hereafter, GRI 3) for all TWSE-listed companies on a phased schedule, with the largest companies required to adopt first. This created staggered adoption across the 2021–2024 fiscal years. Unlike the EU's CSRD, which covers a limited subset of listed firms, the FSC mandate ultimately requires GRI 3 compliance from all 1,883 TWSE reporters — constituting the world's most comprehensive corporate ESG reporting mandate in terms of issuer coverage.

GRI 3 differs from its predecessor (GRI Standards 2016) in three material ways relevant to this study:

- **GRI 3-3 (Management of Material Topics):** Every material topic disclosed now requires a four-component narrative: (i) rationale for materiality, (ii) topic boundary, (iii) management approach, and (iv) effectiveness evaluation. This creates a per-topic compliance burden absent under GRI Standards 2016.
- **Impact materiality framing:** GRI 3 mandates an *impact* materiality lens (company's effects on people and environment), distinguishing it from the *financial* materiality lens increasingly used under IFRS S1/S2. TWSE companies must now explicitly assess and document actual and potential negative impacts.
- **Four-step DMA process:** GRI 3 requires companies to document a structured materiality determination process: stakeholder identification → impact identification → materiality assessment → management approach per topic.

The displacement hypothesis (H1) follows directly from GRI 3-3: if each disclosed topic now requires a full GRI 3-3 disclosure, rational managers facing resource constraints will reduce the number of topics to the minimum defensible set, trading topic breadth for depth. This mechanism parallels Göttsche et al.'s (2025) displacement finding in SASB financial-materiality reporting and is the primary theoretical contribution of this study.

---

## 3. Identification Strategy

### 3.1 Why timing-based DiD, not adoption-vs-non-adoption

Every company in the PDF-processed analysis universe adopted GRI 3 between 2021 and 2024. There are **zero never-treated companies** in the analytical cohort. The Callaway-Sant'Anna (2021) estimator with `control_group = "nevertreated"` would have no control units and cannot be applied. This is structurally correct — under the FSC mandate, eventual adoption is universal.

Identification therefore relies exclusively on variation in *when* companies adopted. The dominant adoption cohort is **g=2022** (593 companies), which is compared against companies that had not yet adopted as of the same period — the not-yet-treated g=2023 cohort (126 companies). The parallel trends assumption becomes: **absent GRI 3, companies adopting in 2022 and those adopting in 2023 would have followed similar materiality disclosure trajectories in the pre-adoption period.** This is plausible — both groups operated under the same FSC regulatory environment; timing variation reflects administrative capacity, audit scheduling, and institutional readiness rather than pre-existing quality differences. The assumption is tested empirically via (a) pre-trend coefficients from `aggte(type="dynamic")` and (b) propensity score analysis (Stream B).

### 3.2 Primary estimator

The primary estimator is the **Callaway-Sant'Anna (2021) group-time average treatment effect**, implemented via `att_gt()` in the R `did` package:

```r
att_gt(
  yname         = "n_material_topics_b",     # or mpqi_composite for H2
  tname         = "fiscal_year",
  idname        = "twse_ticker",             # NOT company_id
  gname         = "gri_adoption_year",
  control_group = "notyettreated",           # only viable option; 0 never-treated units
  xformla       = ~ ln_total_assets + roa + standalone_sr + independent_director_ratio,
  data          = db_did_full,               # 3,283 rows, all 2020–2024 cohorts
  est_method    = "dr",
  allow_unbalanced_panel = TRUE,
  base_period   = "universal"
)
```

**Why `db_did_full` (not `db_did`):** The `db_did.csv` file excludes the g=2024 cohort entirely. This eliminates 4 g=2024 companies that would otherwise serve as not-yet-treated controls at t=2022, reducing the control pool from 44 to 40. The `db_did_full.csv` file retains all cohorts; `att_gt()` automatically treats g=2024 companies as controls for t≤2023 when `control_group = "notyettreated"`. Specify `glist = c(2021, 2022, 2023)` in `aggte()` to restrict *treated* cohort aggregation while preserving g=2024 as controls.

### 3.3 Estimable ATT cells

| ATT cell | Treated (n) | NTT Controls (n) | Status |
|---|---|---|---|
| g=2022, t=2020 (pre-trend t−2) | 381 | 37 | ✅ Pre-trend test |
| g=2022, t=2021 (pre-trend t−1) | 438 | 43 | ✅ Pre-trend test |
| g=2022, t=2022 (treatment year) | 442 | **44** | ✅ **Primary ATT** |
| g=2022, t=2023 (year +1) | 431 | **124** | ✅ **Confirmatory** (corrected 2026-06-22) |
| g=2023, t=2022 (pre-trend t−1) | 39 | 4 | ⚠️ Thin — caveat heavily |
| g=2023, t=2023 (treatment year) | 41 | 124 | ✅ Secondary ATT |

**Critical notes:**
- **ATT(g=2022, t=2022)** with 442 treated and 44 controls is the **primary causal estimate**.
- **ATT(g=2022, t=2023)** with 431 treated and 124 controls is the **primary year-+1 confirmatory estimate** (pre-registered). The prior figure of 3 controls was computed before the 2016–2019 historical rows were added to the DB; the g=2023 cohort now provides 124 valid controls at t=2023.
- **ATT(g=2024, t=any)** is unidentified — zero not-yet-treated controls remain at t=2024 (all companies have adopted by 2024). The g=2024 cohort serves as controls only.
- **g=2021 cohort** (10 companies): ATT cells are estimable but the cohort is too small for primary inference. Report as supplementary.

### 3.4 Treatment saturation

The `control_group = "nevertreated"` option returns zero control units and must not be used. Running it is recommended as a **diagnostic only** to confirm full adoption — if it returns an error or empty results, this is expected and documents the all-treated structure. This diagnostic should be reported in the paper.

---

## 4. Data

### 4.1 Database overview

| Attribute | Value |
|---|---|
| File | `twse-research-database.csv` |
| Rows (company-years, data) | **5,408** (FY 2016–2024) + 2 header rows |
| Columns | **208** (Pass DB-08; MPQI variables added 2026-06-23) |
| Companies | 1,226 unique `twse_ticker` values |
| Panel structure | Unbalanced |
| Encoding | UTF-8-sig BOM |
| Header format | Row 1 = block labels (A/B/C/D/E/F/G); Row 2 = column names; Row 3+ = data |
| R loading | `read_csv(skip=1) \|> mutate(across(c(gri_adoption_year, fiscal_year), as.integer))` |

**Column count history:** 157 (original) → 175 (+18 NLP Phase 1) → 188 (+13 NLP Phase 2) → 190 (+2 Phase 3) → 192 (+language_track, impact_intensity) → 195 (+twse_cgq_score, has_any_assurance, big4_assurance, big4_financial_auditor) → 202 (+7 Block E: jaccard_similarity, topic_churn_rate, topics_added_n, topics_dropped_n, net_topic_change, topics_added_codes, topics_dropped_codes; Pass DB-07) → **208** (+6 MPQI: mpqi_dim_gov, mpqi_dim_proc, mpqi_dim_stake, mpqi_dim_out, mpqi_composite, mpqi_composite_3d; Pass DB-08; 2026-06-23)

### 4.2 Analytical row sets

Three row sets serve distinct purposes:

| Set | File | Rows | Years | Purpose |
|---|---|---|---|---|
| **Master DB** | `twse-research-database.csv` | 5,408 | 2016–2024 | Source of truth; all passes applied here |
| **DiD window (full)** | `data/db_did_full.csv` | **3,283 × 208** | 2020–2024 | Primary analytical file; all cohorts retained; g=2024 contributes controls |
| **DiD core** | `data/db_did.csv` | **2,960 × 208** | 2020–2024 | g=2024 excluded entirely; use only with `glist=c(2021,2022)` |

**Critical:** Use `db_did_full.csv` as the primary analytical file for all `att_gt()` calls. `db_did.csv` loses 4 control companies and makes ATT(g=2022,t=2023) inestimable from that file.

**Historical rows (2016–2019):** 2,125 rows exist in the master DB for pre-mandate years. These rows contain only financial control variables (Block F); `n_material_topics_b`, `mpqi_composite`, `process_quality_score`, and all NLP variables are blank by design. They are excluded from the DiD window files and serve only as pre-treatment baseline data for Stream B propensity score analysis.

### 4.3 Data sources

| Source | Coverage | Variables supplied |
|---|---|---|
| TEJ CSR Disclosure.xlsx | 2016–2024, 7,765 rows | `gri_standard_version`, `gri_adoption_year`, `standalone_sr`, `assurance_level`, `ref_sasb/tcfd/tnfd/sdgs/ir` |
| TEJ Balance Sheet / Income / Equity | 2016–2024, 4,365–4,895 rows | `ln_total_assets`, `roa`, `leverage`, `rd_intensity`, `rd_dummy`, `firm_age`, `tobins_q` |
| TEJ Governance.xlsx | 2014/01–2025/01 (monthly) | `board_seats`, `board_ownership_pct`, `board_pledged_pct`, `liability_insurance_yn` |
| TEJ Board Diversity.xlsx | 2021–2024 | `independent_director_ratio`, `female_director_pct`, `director_attendance_pct`, `director_training_pct` (Pass DB-02) |
| TEJ ESG Score.xlsx | 2016–2022 | `tesg_score`, `tesg_rating`, E/S/G sub-scores (2023–2024 unavailable from TEJ) |
| TEJ_TWSECG.xlsx | 2014–2024 | `twse_cgq_score` (ordinal 1–7; Pass DB-05; robustness only) |
| TEJ_Big4.xlsx | 2020–2024 | `big4_assurance`, `has_any_assurance`, `big4_financial_auditor` (Pass DB-06) |
| ESGgenplus PDF corpus | 2021–2024 | Source PDFs for NLP extraction; 1,042+ reports per year |
| GRI extraction pipeline | 2021–2024 | `n_material_topics_b`, `gri_content_index_completeness` (via gri_codes_summary CSVs) |
| Block C NLP extraction | 2020–2024 | `process_quality_score`, `board_approved`, `mat_section_found`, `dm_methodology_disclosed` |
| Block E topic dynamics | 2022–2024 | `jaccard_similarity`, `topic_churn_rate`, `topics_added_n`, `topics_dropped_n`, `net_topic_change` (Pass DB-07) |

### 4.4 Sample construction

| Step | N rows | N companies |
|---|---|---|
| Master DB (all years, all passes) | 5,408 | 1,226 |
| DiD window (2020–2024) | 3,283 | ~1,036 |
| g=2024 cohort excluded (no pre-treatment baseline) | −323 | −307 |
| **Core analysis file (db_did.csv)** | **2,960** | **~919** |
| Estimable panel (≥1 pre + ≥1 post obs, g=2022 primary) | ~454 | ~454 |

**Exclusion rationale for g=2024 (pre-registered):** 301 of 307 g=2024 companies entered the DB for the first time in FY 2024 (no pre-adoption baseline observations). Their inclusion as treated units would produce no estimable pre-trend coefficient and inflate measurement error. They are retained in `db_did_full.csv` as potential controls for earlier cohorts (they are not-yet-treated at t=2022 and t=2023).

---

## 5. Variables

### 5.1 Treatment variable

**`gri_adoption_year`** — the first fiscal year in which a company filed an ESG report conformant with GRI Universal Standards 2021. Source: TEJ CSR Disclosure file (`gri_standard_version = "GRI-Universal-2021"`); validated in Pass 30 (2026-06-08) against the full 7,634-row panel with cross-checks against PDF report content.

Cohort distribution:

| Cohort | N companies | Notes |
|---|---|---|
| g=2021 | 10 | Very early adopters; estimable but too few for primary inference |
| g=2022 | 593 | **Primary treated cohort** |
| g=2023 | 126 | Primary not-yet-treated control cohort (also estimable as treated) |
| g=2024 | 307 | Controls only; excluded as treated (no pre-treatment baseline) |
| Never-treated | **0** | By construction — FSC mandate ensures universal adoption |

**Derived treatment indicator (for TWFE robustness):** `post_gri3_it = 1` if `fiscal_year ≥ gri_adoption_year`.

### 5.2 Primary outcome variables

#### H1 — `n_material_topics_b` (count)
Count of GRI 3-3 disclosure entries per company-year, derived from `gri_codes_summary` CSVs (the authoritative source for all years; Pass 67). Pre-treatment zeros converted to NA (Pass DB-03) — zeros indicate unprocessed PDFs, not genuine zero-topic disclosure.

| Metric | DiD window (2020–2024) |
|---|---|
| Valid (non-zero, non-null) | 3,121 / 3,283 (95%) |
| Distribution | min=1, max=44, mean≈17.0, median=17 |
| Pre-trend coverage (t=2020) | 384/427 (90%) |
| Pre-trend coverage (t=2021) | 471/491 (96%) |

**Note on structural limitation:** `n_material_topics_b` reflects GRI 3-3 topic entries and is undefined under GRI Standards 2016. Pre-adoption values (pre-`gri_adoption_year`) measure the number of GRI topic standards cited, not GRI 3-3 compliance. The DiD comparison is therefore between post-adoption topic scoping decisions, using the pre-adoption period to establish a trend baseline — which is methodologically appropriate for a displacement effect.

**`n_material_topics_a` is identical to `n_material_topics_b`** (Pearson r = 1.000, confirmed 2026-06-22). Both derive from the same `gri_codes_summary` source. Drop `n_material_topics_a` from regressions; retain in DB as a redundant alias; use as robustness check to confirm identical results.

#### H2 — `mpqi_composite` — Materiality Process Quality Index (updated 2026-06-23)

`mpqi_composite` is the primary H2 outcome variable, replacing `process_quality_score`. It is a validated, equal-weighted composite of four materiality process quality dimensions constructed from Block C NLP/structural extractions.

**Construction:**

| Dimension | Column | Items | Formula | Scale |
|---|---|---|---|---|
| Governance | `mpqi_dim_gov` | g1, g3 | mean(g1, g3) / 2 | 0–1 |
| Process | `mpqi_dim_proc` | p1, p2, p3 | mean(p1, p2, p3) / 2 | 0–1 |
| Stakeholder | `mpqi_dim_stake` | s1, s2, s3 | mean(s1, s2, s3) / 2 *(s1 already 0–1)* | 0–1 |
| Output | `mpqi_dim_out` | o1, o2 | mean(o1, o2) / 2 | 0–1 |
| **Composite** | **`mpqi_composite`** | All 10 items | Equal-weighted mean of 4 dims | **0–1** |

All raw items are on a 0–2 scale and divided by 2; `mpqi_s1` is already 0–1 and used as-is. `mpqi_composite` requires all 4 dimensions to be non-null; `mpqi_composite_3d` (robustness) requires ≥3 dimensions non-null.

**Coverage (GRI3 era — primary analysis window):**

| Year | N (mpqi_composite) | Mean | SD |
|---|---|---|---|
| 2021 | 401 | — | — |
| 2022 | 534 | — | — |
| 2023 | 683 | — | — |
| 2024 | 1,022 | — | — |
| **Total** | **2,646** | **0.516** | **0.156** |

| Dimension | N | Mean | SD |
|---|---|---|---|
| `mpqi_dim_gov` | 3,282 | 0.470 | 0.321 |
| `mpqi_dim_proc` | 2,646 | 0.331 | 0.174 |
| `mpqi_dim_stake` | 3,220 | 0.711 | 0.231 |
| `mpqi_dim_out` | 3,282 | 0.488 | 0.256 |

**Reliability and validity:**

| Test | Value | Interpretation |
|---|---|---|
| Cronbach α (all 10 items) | **0.605** | Borderline acceptable; formative construct expected to show lower α |
| α (governance dim, g1/g3) | 0.384 | Low — 2-item scales inherently noisy |
| α (process dim, p1/p2/p3) | 0.220 | Low — items measure distinct sub-processes |
| α (stakeholder dim, s1/s2/s3) | **0.689** | Good |
| α (output dim, o1/o2) | 0.245 | Low |
| r(mpqi_composite, Block C `mpqi_score`) | **+0.99** | ✅ Construct equivalence confirmed |
| r(mpqi_composite, `process_quality_score`) | **+0.86** | ✅ Good convergent validity |
| r(mpqi_composite, `twse_cgq_score`) | −0.16 | Legitimacy substitution pattern (theoretically expected) |

**Formative construct justification:** Low within-dimension alphas are expected. MPQI is a formative index where items are distinct causal indicators of process quality — not interchangeable reflections of a single latent trait. This framing is standard for composite disclosure quality indices in accounting and sustainability research (cf. disclosure quality indices in voluntary disclosure literature).

**Known structural issue:** `mpqi_p2` and `mpqi_o1` are highly correlated (r=0.809) despite being in different dimensions (Process vs Output). Both appear to capture visualization quality (matrix display). Dimension assignment should be resolved before confirmatory factor analysis; report as a limitation.

**Analytical pre-treatment coverage caveat:** `mpqi_composite` requires all 4 dimensions; coverage for pre-GRI3 years (2020) is thin because Block C extraction was less comprehensive for the pre-mandate corpus. The primary pre-trend test uses t=2021 as the baseline; t=2020 provides an additional (sensitivity) pre-trend test where coverage permits.

#### H3 — Assurance variables (pre-computed binary; Pass DB-06)

Three binary columns are pre-computed in the DB from `TEJ_Big4.xlsx`:

| Column | Definition | Prevalence (DiD window) |
|---|---|---|
| `has_any_assurance` (col 193) | 1 if `assurance_level ∈ {Limited, Reasonable}` | 60.9% (1,999/3,283) |
| `big4_assurance` (col 194) | 1 if assurance provider is PwC/EY/Deloitte/KPMG (Taiwan) | 19.9% (655/3,283) |
| `big4_financial_auditor` (col 195) | 1 if financial statement auditor is Big4 | 88.1% (2,895/3,283) |

**Assurance severity ladder:** Level 0 = no assurance (39.1%); Level 1 = non-Big4 assurance / BSI / SGS (41.0%); Level 2 = Big4 assurance (19.9%).

**`has_reasonable_assurance`** (derived in R from `assurance_level == "Reasonable"`): ~4.1% prevalence; severely underpowered; appendix only — do not report as a primary result.

**Note on 2024 prevalence:** `has_any_assurance` declines to 54% in 2024 vs 62–67% in 2020–2023. This likely reflects the large 2024 cohort of first-time reporters (many without assurance in their first year) rather than a genuine sector-wide decline.

### 5.3 Block E outcome variables (Pass DB-07)

Year-over-year topic dynamics, merged from `data/quality/block_e_topic_dynamics.csv`. Available for FY 2022–2024 only (transitions require two consecutive years of GRI topic data). Coverage: 1,313 rows (640 unique tickers) in the full DB; 0 rows for 2020 and 2021 by construction.

| Column | Definition | Coverage (2022–2024) |
|---|---|---|
| `jaccard_similarity` | Intersection ÷ union of GRI topic codes across consecutive years | 1,313 / 1,965 (67%) |
| `topic_churn_rate` | 1 − jaccard_similarity | 1,313 / 1,965 |
| `topics_added_n` | Count of topics appearing in year t not present in year t−1 | 1,313 / 1,965 |
| `topics_dropped_n` | Count of topics present in year t−1 not present in year t | 1,313 / 1,965 |
| `net_topic_change` | `topics_added_n − topics_dropped_n` | 1,313 / 1,965 |
| `topics_added_codes` | Pipe-delimited GRI codes newly adopted | 1,313 / 1,965 |
| `topics_dropped_codes` | Pipe-delimited GRI codes dropped | 1,313 / 1,965 |

**Coverage note:** 652 DiD-window company-years (2022–2024) have no Block E data because the company appears in only one year of the panel and a year-over-year transition cannot be computed. This is structurally correct, not a data gap.

**Interpretation note (elevated 2021→2022 churn):** The 2021→2022 Jaccard similarity is notably lower (mean ≈ 0.631) than 2022→2023 (0.785) or 2023→2024 (0.780). This elevated churn reflects GRI Standards 2016 → GRI Universal 2021 standard-switch mechanics, not a GRI 3 treatment effect. Flag this in the event-study as a pre-treatment placebo covariate; do not use 2021→2022 transition data as evidence of a treatment effect.

### 5.4 Covariates (primary specification)

The primary covariate vector for `att_gt(xformla = ...)` is:

```r
xformla = ~ ln_total_assets + roa + standalone_sr + independent_director_ratio
```

**Exclusion rule for 2020 base period (pre-specified):** `board_approved` is only 25% populated for FY 2020; `independent_director_ratio` is 0% populated for FY 2020 (TEJ Board Diversity data starts 2021). When `att_gt()` uses 2020 as the base period (pre-trend t−2 cells), apply the reduced covariate vector:

```r
xformla_2020 = ~ ln_total_assets + roa + standalone_sr
```

This exclusion is pre-registered and must be applied consistently across all H1–H4 specifications.

| Variable | Definition | Coverage (DiD window) | Notes |
|---|---|---|---|
| `ln_total_assets` | Log of total assets (NTD thousands) | 92% (3,004/3,283) | TEJ Balance Sheet; December FY end |
| `roa` | Return on assets (net income / total assets) | 92% (3,004/3,283) | Same source |
| `standalone_sr` | 1 if company publishes a standalone sustainability report (vs integrated) | 100% | TEJ CSR Disclosure |
| `independent_director_ratio` | Independent directors / total board seats | 98% (2021–2024); 0% (2020) | TEJ Board Diversity (Pass DB-02) |
| `board_approved` | 1 if board formally approved ESG report | 90%; 25% in 2020 | Block C extraction; exclude from 2020 base period |
| `firm_age` | Fiscal year − TWSE listing year | 100% | Governance file |

**Robustness covariates (not in primary spec):**
- `tesg_score` (2022 value, time-invariant pre-treatment baseline): 629/632 for 2022 companies ✅
- `twse_cgq_score` (lagged, t−1): 95.1% coverage in DiD window; robustness only (endogeneity risk: CGQ criteria include ESG reporting)
- `leverage`, `rd_intensity`, `female_director_pct`, `director_attendance_pct`: available for robustness specifications

### 5.5 Moderator variables

#### H4 — `impact_intensity` (derived, pre-registered)
Derived from `sasb_industry` before any regression. The derivation rule is **locked** — do not modify after OSF pre-registration:

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

Coverage: 3,251/3,283 rows assigned (32 null = missing `sasb_industry`). Consumer and RenewableEnergy are treated as a **pre-registered sensitivity check** — run once included (as Low), once excluded.

`sasb_industry` is 100% populated for all 3,283 DiD window rows (Pass DB-04, 2026-06-22).

#### H5 — TSMC proximity (BLOCKED)
`semiconductor_cat = 1` identifies 49 TWSE semiconductor companies. The TSMC-proximity indicator (tier-1 supplier list / Hsinchu Science Park co-location) requires external data collection and is not yet populated. H5 is registered as supplementary; do not run until the proximity variable is coded and locked.

---

## 6. Hypotheses and Expected Signs

| Hypothesis | Outcome variable | Expected sign | Expected magnitude | Estimator | Status |
|---|---|---|---|---|---|
| **H1** | `n_material_topics_b` | **Negative ATT** | −2 to −5 topics (mean pre-adoption ≈ 15.0); sampling run: ATT=−8.51* | CS21 `att_gt()` | Confirmatory — pending OSF |
| **H2** | `mpqi_composite` (replaces `process_quality_score`) | **Positive ATT** | +0.05 to +0.10 on 0–1 scale; sampling composite null; `mpqi_dim_proc` ATT=+0.059* | CS21 `att_gt()` | Confirmatory — pending OSF; framing revised to mechanism finding |
| **H3 (primary)** | `has_any_assurance` | **Positive association** | ORs with `years_since_adoption` | Logistic regression | Exploratory (reclassified from DiD) |
| **H3 (secondary)** | `big4_assurance` | **Positive association** | ORs | Logistic regression | Exploratory |
| **H4** | `n_material_topics_b × impact_intensity` | **ATT(Low) < ATT(High) < 0** | Difference −2 to −4 additional topics | Subsample CS21 | Confirmatory — pending OSF |
| **H5** | `process_quality_score × proximity` | **Positive ATT for proximate firms** | +1.5 pts | CS21 interaction | Supplementary — BLOCKED |

**H1 primary ATT cells:**
- ATT(g=2022, t=2022): primary treatment-year estimate (442 treated, 44 controls)
- ATT(g=2022, t=2023): primary year+1 confirmatory estimate (431 treated, 124 controls)

**H3 reclassification rationale:** "Reasonable" assurance prevalence is ~4.1% (~136 observations). CS21 DiD with 43 control companies cannot detect a meaningful shift in a 4.1%-prevalence outcome. H3 is reclassified as exploratory logistic regression. No causal claims; ORs are descriptive associations only.

---

## 7. Estimation Strategy

### 7.1 Primary (Stream A) — Callaway-Sant'Anna (2021)

The CS21 estimator is preferred over classical TWFE for three reasons: (1) it is robust to heterogeneous treatment effects across cohorts; (2) it provides interpretable group-time ATT(g,t) estimates rather than a single pooled coefficient; and (3) its `notyettreated` control group construction is appropriate when never-treated companies are absent.

**Key implementation choices:**
- `est_method = "dr"`: doubly robust IPW-regression adjustment (recommended for covariates in thin control pool settings)
- `allow_unbalanced_panel = TRUE`: 20 companies have corpus coverage gaps; ATT cells auto-exclude them
- `base_period = "universal"`: uses all pre-treatment periods as base, not just t−1

**Aggregation:** `aggte(type = "dynamic")` produces an event-study of relative treatment timing (τ = −2, −1, 0, +1, ...). The τ = −2 and τ = −1 coefficients are the primary pre-trend test. The τ = 0 coefficient is the primary treatment-year ATT.

### 7.2 H3 (Stream D) — Logistic regression

```r
# Primary: any assurance (well-powered; 60.9% prevalence)
m_d1 <- glm(has_any_assurance ~ years_since_adoption + ln_total_assets + roa +
            sasb_industry + standalone_sr + big4_financial_auditor,
            family = binomial, data = db_2024)
margins::margins(m_d1)  # average marginal effects

# Secondary: Big4 quality tier (19.9% prevalence)
m_d2 <- glm(big4_assurance ~ years_since_adoption + ln_total_assets + roa +
            sasb_industry + standalone_sr + big4_financial_auditor,
            family = binomial, data = db_2024)

# Exploratory appendix only: reasonable assurance (~4.1%)
m_d3 <- glm(has_reasonable ~ years_since_adoption + ..., family = binomial, data = db_2024)
# Report ORs with wide CIs; no inferential claim
```

**`years_since_adoption`** = `fiscal_year − gri_adoption_year`; continuous; range 0–3 in the 2024 cross-section. This is the treatment exposure variable; it is not a causal instrument.

**Panel robustness (company FE logit):**
```r
m_d4 <- feglm(has_any_assurance ~ years_since_adoption + big4_financial_auditor | twse_ticker,
              data = db_did_full, family = logit)
```

### 7.3 H4 (Stream A subsample) — Subsample CS21 + Triple-diff

```r
out_h4_low  <- att_gt(yname = "n_material_topics_b",
                      data  = db_did_full |> filter(impact_intensity == "Low"), ...)
out_h4_high <- att_gt(yname = "n_material_topics_b",
                      data  = db_did_full |> filter(impact_intensity == "High"), ...)
triple_diff_se <- boot_triple_diff(out_h4_low, out_h4_high, nboot = 500)
```

**Fallback:** If subsample CS21 fails to converge (thin groups: ~20–25 controls per subsample), fall back to TWFE interaction:
```r
feols(n_material_topics_b ~ post_gri3_it * impact_intensity + controls |
      twse_ticker + fiscal_year, data = db_did_full, cluster = ~twse_ticker)
```

---

## 8. Robustness Checks (all pre-registered)

All robustness checks must be run and reported regardless of significance direction.

| Code | Check | Rationale |
|---|---|---|
| **R1** | **BJS imputation** (`didimputation::did_imputation()`) | More efficient than CS21 under thin control pool; estimates Y(0) from full pre-treatment history |
| **R2** | **Wooldridge extended TWFE** (`fixest::feols()` with cohort × period dummies) | Transparent framing for accounting reviewers; near-identical estimates to CS21 under parallel trends |
| **R3** | **Rambachan-Roth HonestDiD** (`HonestDiD::createSensitivityResults()`) | **NON-NEGOTIABLE** — with only 44 controls at primary ATT cell, post-treatment parallel trends cannot be empirically tested; bounds on how large a violation must be to overturn the result |
| **R4** | **Poisson / Hurdle model** for `n_material_topics_b` | Count outcome; addresses potential distributional concerns |
| **R5** | **H4 TWFE fallback** | See §7.3 |
| **R6** | **`tesg_score_2022` as time-invariant control** | Include 2022 TESG score as firm-level pre-treatment characteristic |
| **R7** | **TWSE CGQ score (lagged, t−1)** | `twse_cgq_score` robustness check; lagged to avoid endogeneity (CGQ criteria include ESG reporting) |
| **R8** | **`control_group = "nevertreated"`** | Will return zero control units; document as confirmation of all-adopted universe |
| **R9** | **Bacon-Goodman decomposition** | Decompose heterogeneity in treatment timing weights |
| **R10** | **Stream C with `sasb_industry` FE** | Partial out industry effects in cross-sectional analysis |

**Mandatory reporting standard for R3:** State "The ATT estimate is robust to violations of parallel trends up to M = [X] times the largest observed pre-trend difference." This framing must appear in the paper.

**Winsorizing policy:** No winsorizing in the primary specification. `ln_total_assets` is log-transformed (skew addressed). `roa` extreme values retained. Any post-registration decision to winsorize must be logged as a pre-analysis deviation.

---

## 9. Six Parallel Analysis Streams

| Stream | Estimator | Primary outcomes | Pre-registration required? | Notes |
|---|---|---|---|---|
| **A — Primary DiD** | CS21 `att_gt()` | H1 (`n_material_topics_b`), H2 (`mpqi_composite` + `mpqi_dim_proc` mechanism), H4 (subsample) | **YES** | Hard-blocked on OSF upload |
| **B — Parallel trends validation** | Propensity score OLS | Covariate balance, adoption timing predictability | No | Informs Stream A narrative; run first |
| **C — Cross-sectional intensity** | OLS / Poisson | `process_quality_score`, `n_material_topics_b` by `years_since_adoption` in 2024 | No | Descriptive; complements Stream A |
| **D — H3 assurance** | Logistic regression | `has_any_assurance`, `big4_assurance` | No (exploratory) | Can run before OSF upload |
| **E — Post-adoption dynamics** | Panel OLS / FE | Within-company trajectory (process quality, topic count) after adoption | **YES** | Blocked on OSF upload; `jaccard_similarity` available (Pass DB-07) |
| **F — NLP supplementary** | CS21 + OLS | `finbert_gov_density`, `bge_gov_density` (language-track stratified) | **YES** | Blocked on OSF upload; ESGLens excluded |

**Streams B, C, D can run before OSF registration.** Their results should inform the parallel trends narrative and power calculations for the pre-registration document, but no inferential DiD results may be reported until OSF registration is complete.

### Stream B — Propensity score decision rule (pre-specified)

| AUC | Action |
|---|---|
| ≤ 0.60 | Observables do not predict timing → parallel trends plausible; proceed unweighted |
| 0.60–0.70 | Partial predictability → report propensity score balance; note as limitation |
| > 0.70 | Strong selection on observables → apply IPW weighting to Stream A CS21; report both |

### Stream F — NLP language-track stratification (mandatory)

NLP models operate on different linguistic inputs and their outputs are **not comparable or combinable**. Always stratify by `language_track`:

| Track | Primary model | Secondary model | Exclusion |
|---|---|---|---|
| Bilingual (EN + ZH) | FinBERT-ESG-9 on EN report | BGE-M3 on ZH report (separate table) | — |
| ZH-only | BGE-M3 | XLM-RoBERTa-XNLI | — |
| EN-only (n=4) | Exclude | — | Too few for inference |

**ESGLens excluded from primary NLP analysis:** Systematic GOV over-classification (57% GOV share vs expected ~33%). May appear in appendix with explicit bias caveat.

**Pre-analysis convergent validity check (mandatory before any NLP DiD):** Compute Pearson r between `process_quality_score` and each NLP density score for the 2024 cross-section. If r < 0.05 for all models, report divergence as a finding — structural compliance ≠ substantive content depth. This check must precede any Stream F ATT estimation.

---

## 10. Pre-Registration Requirements

**Hard rule:** No inferential test (no `att_gt()`, no `feols()` for causal inference) may be run until the OSF pre-registration is uploaded and the registration DOI is recorded.

Streams B, C, and D are descriptive/exploratory and are not blocked by OSF registration. Streams A, E, and F are inferential and are hard-blocked.

### Pre-registration checklist (must be complete before OSF upload)

**Identification**
- [ ] Timing-based DiD: 2022 cohort vs 2023 not-yet-treated controls
- [ ] `idname = "twse_ticker"` in all `att_gt()` calls
- [ ] `control_group = "notyettreated"`
- [ ] 2024 cohort excluded from treated units; retained as controls in `db_did_full.csv`
- [ ] Estimation window: FY 2020–2024

**Data preparation (all complete)**
- [x] `n_material_topics_b` zeros → NA (Pass DB-03)
- [x] `board_approved` excluded from covariate vector when base period = 2020
- [x] `impact_intensity` derivation rule locked (High/Low/Sensitivity; see §5.5)
- [x] `sasb_industry` 100% populated in DiD window (Pass DB-04)
- [x] `twse_cgq_score` integrated (Pass DB-05; robustness only)
- [x] Assurance columns pre-computed (Pass DB-06; `has_any_assurance`, `big4_assurance`, `big4_financial_auditor`)
- [x] Block E Jaccard variables merged (Pass DB-07; `jaccard_similarity` etc.)
- [ ] OSF pre-registration uploaded (last remaining blocker)

**Hypotheses**
- [ ] H1: primary outcome `n_material_topics_b`; expected sign negative (−2 to −5 topics)
- [ ] H2: primary outcome `mpqi_composite` (0–1 scale; replaces `process_quality_score`); expected ATT +0.05 to +0.10 on composite; mechanism sub-hypothesis: `mpqi_dim_proc` ATT positive and significant; note that composite null may reflect composition (proc ↑ vs stakeholder count ↓)
- [ ] H3: classified as exploratory logistic; severity ladder pre-specified (primary = `has_any_assurance`, secondary = `big4_assurance`); causal claim explicitly waived
- [ ] H4: two subsample CS21 runs (High vs Low impact_intensity); triple-diff robustness; TWFE fallback pre-registered
- [ ] ATT(g=2022,t=2023) pre-registered as **confirmatory** (124 controls; corrected 2026-06-22)

**NLP stream**
- [ ] ESGLens excluded from primary NLP analysis
- [ ] Language-track stratification rule documented
- [ ] Convergent validity pre-check (r between `process_quality_score` and NLP scores) specified as mandatory before any Stream F DiD

**Robustness**
- [ ] R1 BJS imputation
- [ ] R2 Wooldridge extended TWFE
- [ ] R3 Rambachan-Roth HonestDiD (NON-NEGOTIABLE)
- [ ] R4 Poisson/Hurdle for `n_material_topics_b`
- [ ] R9 Bacon-Goodman decomposition

---

## 11. Known Limitations and Data Constraints

### 11.1 Thin control group
The primary ATT cell (g=2022, t=2022) has **44 not-yet-treated controls**. This is thin by conventional standards. Consequences:
- Standard errors will be larger than in studies with larger control groups
- Rambachan-Roth HonestDiD (R3) is mandatory, not optional
- The year+1 cell (124 controls) provides more reliable inference for the post-treatment effect

### 11.2 No never-treated companies
Universal FSC mandate adoption eliminates the `nevertreated` control group. Identification rests entirely on timing variation. The parallel trends assumption — that 2022 and 2023 cohorts would have followed similar disclosure trajectories absent GRI 3 — is plausible but untestable. Stream B propensity score analysis provides the best available evidence for or against this assumption.

### 11.3 Coverage gaps (NLP variables)
- `process_quality_score`: 25% populated for FY 2020 (Block C extraction less comprehensive for pre-mandate corpus). Primary pre-trend test uses t=2021; t=2020 is a sensitivity check.
- `n_material_topics_b`: 10% blank in FY 2020 (image-embedded GRI indices, no GRI section in extracted text). 95% coverage across DiD window overall.
- NLP density scores (Block D): 20 companies with corpus coverage gaps are automatically excluded from relevant ATT cells by `att_gt()`.

### 11.4 TESG score gap
TEJ ESG score data ends in 2022. No panel time-variation in `tesg_score` is available for 2023–2024. Use the 2022 value as a time-invariant pre-treatment baseline control (robustness specification R6 only).

### 11.5 Block E coverage
Topic dynamics (Jaccard similarity, churn rate) are available for 640/1,036 DiD-window tickers. The remaining 396 tickers appear in only one year of the panel, making a year-over-year transition impossible to compute. This is structural, not a pipeline gap. Stream E regressions using `jaccard_similarity` as an outcome should acknowledge this coverage limitation explicitly.

### 11.6 Measurement error in `n_material_topics_b`
The 516 values extracted via text-pattern matching (as opposed to structured GRI table parsing) carry ±2–3 measurement noise. Validation against structured extraction shows Pearson r = 0.59 with 29% exact match and 51% within ±1. The Poisson/Hurdle robustness check (R4) partially addresses this by using a distributional model appropriate for count variables with noise.

### 11.7 causal_claims boundary for H3
H3 is reclassified as exploratory logistic regression. The study does not claim that GRI 3 adoption *causes* assurance upgrade. The association between `years_since_adoption` and assurance probability is descriptive. Any reviewer or reader who interprets ORs as treatment effects should be corrected.

---

## 12. Variable Registry Summary

| Block | Variable | Type | Role | DB col | Status |
|---|---|---|---|---|---|
| A | `twse_ticker` | String | Panel ID (`idname`) | 1 | ✅ |
| A | `fiscal_year` | Integer | Time variable (`tname`) | 2 | ✅ |
| A | `gri_adoption_year` | Integer | Treatment cohort (`gname`) | 3 | ✅ |
| A | `post_gri3_it` | Binary | TWFE treatment indicator | Derived | Derive in R |
| B | `gri_standard_version` | String | Version tag | — | ✅ |
| B | `standalone_sr` | Binary | Covariate | — | ✅ |
| C | `n_material_topics_b` | Count | H1 outcome | — | ✅ |
| C | `mpqi_composite` | Continuous 0–1 | **H2 primary outcome** (replaces `process_quality_score`) | — | ✅ (2026-06-23) |
| C | `mpqi_dim_gov` | Continuous 0–1 | H2 governance dimension | — | ✅ (2026-06-23) |
| C | `mpqi_dim_proc` | Continuous 0–1 | H2 process dimension (mechanism variable) | — | ✅ (2026-06-23) |
| C | `mpqi_dim_stake` | Continuous 0–1 | H2 stakeholder dimension | — | ✅ (2026-06-23) |
| C | `mpqi_dim_out` | Continuous 0–1 | H2 output dimension | — | ✅ (2026-06-23) |
| C | `process_quality_score` | Continuous 0–1 | H2 legacy — retain as robustness; r=0.86 with mpqi_composite | — | 🟡 Superseded |
| C | `has_any_assurance` | Binary | H3 primary outcome | 193 | ✅ |
| C | `big4_assurance` | Binary | H3 secondary outcome | 194 | ✅ |
| C | `big4_financial_auditor` | Binary | H3 control | 195 | ✅ |
| C | `board_approved` | Binary | Covariate (excl. 2020 base) | — | ✅ |
| E | `jaccard_similarity` | Continuous | Stream E outcome | 196 | ✅ (DB-07) |
| E | `topic_churn_rate` | Continuous | Stream E outcome | 197 | ✅ (DB-07) |
| E | `topics_added_n` | Count | Stream E outcome | 198 | ✅ (DB-07) |
| E | `topics_dropped_n` | Count | Stream E outcome | 199 | ✅ (DB-07) |
| E | `net_topic_change` | Integer | Stream E outcome | 200 | ✅ (DB-07) |
| F | `ln_total_assets` | Continuous | Covariate | — | ✅ |
| F | `roa` | Continuous | Covariate | — | ✅ |
| F | `independent_director_ratio` | Continuous | Covariate (excl. 2020) | — | ✅ (DB-02) |
| F | `tesg_score` | Continuous | Robustness covariate (2022 value only) | — | ✅ |
| F | `twse_cgq_score` | Ordinal 1–7 | Robustness covariate (lagged) | 191 | ✅ (DB-05) |
| G | `impact_intensity` | Categorical | H4 moderator | — | ✅ (derived) |
| G | `sasb_industry` | Categorical | Industry classification | — | ✅ (DB-04) |
| G | `language_track` | Categorical | NLP stratification | — | ✅ |
| H5 | TSMC proximity | Binary | H5 moderator | — | ⛔ BLOCKED |

---

## 13. Timeline and Sequence

| Phase | Action | Status |
|---|---|---|
| Data preparation | Passes DB-01 through DB-07 complete | ✅ Done |
| Streams B, C, D | Descriptive/exploratory runs | Can run now |
| OSF pre-registration | Upload to osf.io; obtain DOI | 🔴 **Last hard blocker** |
| Stream A (H1–H4) | `att_gt()` primary estimation | Blocked on OSF |
| Stream E (dynamics) | Within-company FE trajectory | Blocked on OSF |
| Stream F (NLP) | Language-stratified CS21 | Blocked on OSF + local GPU pending |
| Robustness R1–R10 | Run after primary estimates | Blocked on OSF |
| H5 semiconductor | Proximity coding → CS21 | Blocked on external data |

---

*Prepared: 2026-06-23*  
*Agent: academic-researcher*  
*DB version: twse-research-database.csv (Pass DB-07; 5,408 rows × 202 cols)*  
*Pre-registration DOI: PENDING*
