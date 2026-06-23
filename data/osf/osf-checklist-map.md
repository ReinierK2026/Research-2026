# OSF Preregistration Checklist — Location Map
**Study:** Does Mandatory GRI 3 Adoption Change Materiality Disclosure Quality? Evidence from Taiwan's Staggered ESG Reporting Reform  
**Source document:** `osf-preregistration_twse-materiality_2026-06-22.md`  
**Map created:** 2026-06-23  
**Status key:** ✅ Covered | ⚠️ Partial / needs amendment | ❌ Gap — amendment added to preregistration doc

> All line numbers refer to `osf-preregistration_twse-materiality_2026-06-22.md`.  
> Jump links use section headings for navigation.

---

## Checklist Item Index

| # | Checklist Item | Status | Location |
|---|---|---|---|
| 1 | Project title is final | ✅ | [§ Title block](#1-project-title) |
| 2 | Principal investigator and collaborators are listed | ❌→✅ | [§ Amendment A](#2-pi-and-collaborators) |
| 3 | Research question is stated clearly | ✅ | [§1 Research question](#3-research-question) |
| 4 | Primary hypotheses are written | ✅ | [§3 H1, H2](#4-primary-hypotheses) |
| 5 | Study design is described | ✅ | [§1 Identification strategy](#5-study-design) |
| 6 | Participants (sample) defined with inclusion/exclusion criteria | ✅ | [§2 Sample construction](#6-sample) |
| 7 | Target sample size is justified | ⚠️ | [§2 Sample construction](#7-sample-size) |
| 8 | Recruitment plan is specified | ❌→✅ | [§ Amendment B](#8-recruitment) |
| 9 | Materials, tasks, and measures are listed | ✅ | [§2 Outcome variables & Covariates](#9-measures) |
| 10 | Procedure is written step by step | ✅ | [§5 Analysis Streams + §6 Data Prep](#10-procedure) |
| 11 | Primary outcome variables are defined | ✅ | [§2 Outcome variables](#11-primary-outcomes) |
| 12 | Secondary outcome variables are defined | ✅ | [§2 Outcome variables + §3 H3–H5](#12-secondary-outcomes) |
| 13 | Stopping rule is stated | ❌→✅ | [§ Amendment C](#13-stopping-rule) |
| 14 | Data exclusion rules are defined | ✅ | [§2 Sample construction + §6 Data Prep](#14-exclusions) |
| 15 | Missing-data handling is specified | ⚠️→✅ | [§2 Covariates + Amendment D](#15-missing-data) |
| 16 | Outlier handling is specified | ❌→✅ | [§ Amendment E](#16-outliers) |
| 17 | Statistical analysis plan is written | ✅ | [§1 Primary estimator + §5 + §7](#17-analysis-plan) |
| 18 | Exploratory analyses are labeled as exploratory | ✅ | [§3 H3, §5 Streams, §8 NLP](#18-exploratory) |
| 19 | Ethics/IRB approval status is noted | ❌→✅ | [§ Amendment F](#19-ethics) |
| 20 | Data-sharing plan is included | ❌→✅ | [§ Amendment G](#20-data-sharing) |
| 21 | Internal review is complete before submission | ❌→✅ | [§ Amendment H](#21-internal-review) |
| 22 | OSF project is created | 🔴 PENDING | [§6 Data Prep — last row](#22-osf-project) |
| 23 | Correct preregistration template is selected | ❌→✅ | [§ Amendment I](#23-template) |
| 24 | Registration is submitted on the OSF Registrations page | 🔴 PENDING | [§ Footer](#24-submission) |
| 25 | If public, DOI creation is enabled | 🔴 PENDING | [§ Footer](#25-doi) |
| 26 | Final registration link/DOI is saved for citation | 🔴 PENDING | [§ Footer](#26-final-doi) |

---

## Detailed Locations

### 1. Project Title
**Status:** ✅  
**Lines:** 2–3  
**Text:**
> `**Title:** Does Mandatory GRI 3 Adoption Change Materiality Disclosure Quality? Evidence from Taiwan's Staggered ESG Reporting Reform`

---

### 2. PI and Collaborators
**Status:** ❌ → ✅ (added via Amendment A)  
**Original location:** Not present in source document.  
**Action:** Amendment A added at top of preregistration (§0 — Study Team). See amendment block in updated preregistration doc.

---

### 3. Research Question
**Status:** ✅  
**Lines:** 14–16  
**Section:** `## 1. Study Overview > ### Research question`  
**Text:**
> "Does earlier adoption of GRI Universal Standards 2021 (GRI 3) — mandated by Taiwan's Financial Supervisory Commission (FSC) for listed companies — cause changes in (a) the number of material topics disclosed and (b) the quality of the materiality determination process, relative to companies that have not yet adopted?"

---

### 4. Primary Hypotheses
**Status:** ✅  
**Lines:** 93–185  
**Section:** `## 3. Hypotheses and Estimands`  

| Hypothesis | Classification | Lines |
|---|---|---|
| H1 — Displacement effect on material topic count | CONFIRMATORY | 95–106 |
| H2 — Process quality upgrade | CONFIRMATORY | 109–116 |
| H3 — Assurance upgrade | EXPLORATORY | 120–156 |
| H4 — Heterogeneous displacement by industry intensity | CONFIRMATORY (subsample) | 160–178 |
| H5 — Semiconductor TSMC-proximity effect | SUPPLEMENTARY (BLOCKED) | 182–186 |

---

### 5. Study Design
**Status:** ✅  
**Lines:** 17–36  
**Sections:** `### Identification strategy` (lines 17–21) and `### Primary estimator` (lines 23–36)  
**Design:** Timing-based staggered Difference-in-Differences using Callaway-Sant'Anna (2021) estimator. Not-yet-treated control group. Panel data 2020–2024.

---

### 6. Sample (Participants, Inclusion/Exclusion Criteria)
**Status:** ✅  
**Lines:** 43–52  
**Section:** `## 2. Data > ### Sample construction`

| Criterion | Detail |
|---|---|
| Population | All TWSE-listed companies in the PDF-processed universe |
| Inclusion | Companies with GRI adoption year 2021–2024; DiD window 2020–2024 |
| Exclusion | g=2024 cohort (−323 rows, −307 companies) — no pre-treatment baseline |
| Core analysis file | `db_did.csv`: 2,960 rows, ~919 companies |
| Estimable panel | ~495 companies (≥1 pre + ≥1 post observation) |

---

### 7. Sample Size Justification
**Status:** ⚠️ Partial  
**Lines:** 43–52, 191–198  
**Covered:** Sample sizes reported in construction table (§2) and control group cells (§4). Primary ATT cell: 442 treated / 44 NTT controls.  
**Gap note:** No formal a priori power analysis is included. This is standard for archival staggered DiD studies where sample size is determined by data availability. The thinness of the g=2023 pre-trend cell (n=4 controls) is explicitly caveated at line 197. This is acceptable for secondary data but should be noted in the OSF registration form free-text.

---

### 8. Recruitment Plan
**Status:** ❌ → ✅ (added via Amendment B)  
**Original:** Not present.  
**Action:** Amendment B adds an explicit N/A statement with rationale (archival secondary data from TWSE/TEJ; no participant recruitment). See updated preregistration doc.

---

### 9. Materials, Tasks, and Measures
**Status:** ✅  
**Lines:** 57–83  
**Sections:** `### Outcome variables` (lines 57–64) and `### Covariates (primary specification)` (lines 65–76)

| Element | Location |
|---|---|
| Primary outcome variables | Lines 57–64 — outcome variable table |
| Covariates / controls | Lines 65–76 — covariate table |
| ESG rating covariate decisions | Lines 78–89 |
| Treatment variable | Lines 54–55 |
| Data files | Lines 51–52 |

---

### 10. Procedure (Step by Step)
**Status:** ✅  
**Sections:**
- `## 6. Data Preparation Steps` (lines 219–231) — sequential prep steps with completion status
- `## 5. Analysis Streams` (lines 204–213) — six analysis streams A–F with estimators and blocking rules
- `## 7. Robustness Checks` (lines 237–248) — 9 pre-registered checks in sequence

---

### 11. Primary Outcome Variables
**Status:** ✅  
**Lines:** 57–64  
**Section:** `### Outcome variables`

| Variable | Hypothesis | Definition |
|---|---|---|
| `n_material_topics_b` | H1 | Count of material topics disclosed; zeros→NA per Pass DB-03 |
| `process_quality_score` | H2 | Continuous 0–1; composite of 5 materiality-process sub-indicators |

---

### 12. Secondary Outcome Variables
**Status:** ✅  
**Lines:** 57–64 (table), 120–156 (H3 detail), 160–178 (H4), 182–186 (H5)

| Variable | Role | Location |
|---|---|---|
| `has_any_assurance` | H3 primary (exploratory) | Line 61, lines 137–138 |
| `big4_assurance` | H3 secondary (exploratory) | Line 138 |
| `has_reasonable_assurance` | H3 appendix only | Line 139 |
| H4 subsample ATTs | Confirmatory subsample | Lines 160–178 |
| H5 semiconductor proxy | Supplementary (blocked) | Lines 182–186 |
| NLP density scores (Stream F) | Supplementary exploratory | Lines 251–266 |

---

### 13. Stopping Rule
**Status:** ❌ → ✅ (added via Amendment C)  
**Original:** Not present.  
**Action:** Amendment C adds explicit N/A statement: this is a complete-census archival study with a fixed, pre-collected dataset. No sequential stopping rule applies. Analysis proceeds on `db_did.csv` as constituted at registration.

---

### 14. Data Exclusion Rules
**Status:** ✅  
**Lines:** 43–52 (sample construction), 60 (zeros→NA), 69–76 (covariate exclusions), 219–231 (§6 prep steps)

| Rule | Location |
|---|---|
| g=2024 excluded (no pre-treatment baseline) | Lines 47–48, line 228 |
| `n_material_topics_b` zeros → NA | Line 60, lines 226, 282 |
| `independent_director_ratio` excluded when base_period = 2020 | Lines 71–72, 74 |
| `board_approved` excluded when base_period = 2020 | Lines 72–73 |
| `board_esg_committee` dropped (column does not exist) | Line 76, line 292 |
| `n_material_topics_a` dropped (r=1.000 with `_b`) | Lines 63–64, line 291 |

---

### 15. Missing-Data Handling
**Status:** ⚠️ → ✅ (explicit policy added via Amendment D)  
**Lines:** 69–72 (covariate coverage caveats), 78–89 (tesg_score availability)  
**Existing coverage:** 92% availability for `ln_total_assets` and `roa`; 95.1% for `twse_cgq_score`; board diversity data starts 2021.  
**Action:** Amendment D adds explicit policy: `att_gt()` uses listwise deletion within each (g,t) cell; no imputation; coverage statistics reported in supplementary table.

---

### 16. Outlier Handling
**Status:** ❌ → ✅ (added via Amendment E)  
**Original:** Not present.  
**Action:** Amendment E specifies: continuous covariates (`ln_total_assets`, `roa`) are not winsorized in the primary specification. Poisson robustness check (Robustness Check 4) addresses count outcome skew. Any post-registration winsorizing decisions will be logged as deviations.

---

### 17. Statistical Analysis Plan
**Status:** ✅  
**Sections:**

| Component | Section | Lines |
|---|---|---|
| Primary estimator (`att_gt()`) | §1 Primary estimator | 23–36 |
| Analysis streams A–F | §5 Analysis Streams | 204–213 |
| Covariate specification | §2 Covariates | 65–76 |
| Robustness checks (9 pre-registered) | §7 Robustness Checks | 237–248 |
| NLP supplementary stream | §8 NLP Stream F | 251–266 |
| H3 logistic estimator code | §3 H3 | 143–152 |

---

### 18. Exploratory Analyses Labeled as Exploratory
**Status:** ✅  
**Locations:**

| Analysis | Label | Lines |
|---|---|---|
| H3 assurance | `(EXPLORATORY — reclassified from DiD)` | 120 |
| Stream D (H3 logistic) | Listed separately from confirmatory streams | 210 |
| Stream F (NLP) | `Supplementary` | 213 |
| H5 (semiconductor) | `SUPPLEMENTARY — BLOCKED` | 182 |
| §10 Deviations policy | Any unlisted post-registration test = exploratory | 328–330 |

---

### 19. Ethics/IRB Approval Status
**Status:** ❌ → ✅ (added via Amendment F)  
**Original:** Not present.  
**Action:** Amendment F adds IRB/ethics section. This study uses only publicly available company disclosures (TWSE annual sustainability reports) and commercial financial databases (TEJ). No human subjects data. IRB exemption status to be confirmed with host institution and recorded here before submission.

---

### 20. Data-Sharing Plan
**Status:** ❌ → ✅ (added via Amendment G)  
**Original:** Not present.  
**Action:** Amendment G adds data-sharing section specifying: (a) processed analysis files (`db_did.csv`, `db_did_full.csv`) to be deposited on OSF upon manuscript acceptance; (b) raw PDF reports cannot be shared due to TWSE copyright; (c) all R analysis scripts to be shared openly at OSF.

---

### 21. Internal Review Complete Before Submission
**Status:** ❌ → ✅ (added via Amendment H)  
**Original:** Not present.  
**Action:** Amendment H adds confirmation field — to be signed/dated by PI before OSF submission.

---

### 22. OSF Project Created
**Status:** 🔴 PENDING  
**Line:** 231 (`OSF pre-registration uploaded | 🔴 PENDING — last hard blocker`)  
**Action required:** Create OSF project, link to this preregistration document.

---

### 23. Correct Preregistration Template Selected
**Status:** ❌ → ✅ (added via Amendment I)  
**Original:** Not present.  
**Action:** Amendment I notes recommended template: **OSF Preregistration** (standard social science template) or **AsPredicted** — both are acceptable. Given the complexity of this study, the full **OSF Preregistration** template is recommended. To be confirmed on the OSF Registrations page.

---

### 24. Registration Submitted on OSF Registrations Page
**Status:** 🔴 PENDING  
**Footer:** Line 335 (`OSF registration DOI: PENDING`)  
**Action required:** Navigate to OSF project → Registrations → New Registration → submit this document.

---

### 25. DOI Creation Enabled (if public)
**Status:** 🔴 PENDING  
**Footer:** Line 335  
**Action required:** After submission, click "Create DOI" within the OSF registration. DOI is issued immediately via DataCite.

---

### 26. Final Registration Link/DOI Saved for Citation
**Status:** 🔴 PENDING  
**Footer:** Line 335 (`OSF registration DOI: PENDING`)  
**Action required:** Record the minted DOI in line 335 of the preregistration and in the manuscript methods section.

---

## Gap Summary

| Category | Items | Resolution |
|---|---|---|
| **Added via amendment** | PI/collaborators, Recruitment N/A, Stopping rule N/A, Missing-data policy, Outlier policy, IRB/ethics, Data-sharing, Internal review, Template selection | Amendments A–I added to preregistration doc |
| **Partial — acceptable for archival study** | Sample size justification (no power analysis) | Noted in §7 and in OSF free-text |
| **Action required by PI** | OSF project creation, template selection, submission, DOI | Sequential — see `research_execution_plan.md` |

---

*Map generated: 2026-06-23 | Source: `osf-preregistration_twse-materiality_2026-06-22.md`*
