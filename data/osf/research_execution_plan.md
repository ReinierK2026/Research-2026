# Research Execution Plan
**Study:** Does Mandatory GRI 3 Adoption Change Materiality Disclosure Quality? Evidence from Taiwan's Staggered ESG Reporting Reform  
**Last updated:** 2026-06-23  
**Maintained by:** Research Coordinator Agent

---

## 1. Purpose of This Document

This file is the single source of truth for the execution sequence of this research project. It tracks:
- The OSF preregistration compliance status
- The order of operations for all analysis streams
- All amendments made to the preregistration document
- Blocking dependencies (what must be done before what)

---

## 2. OSF Preregistration Compliance Status

> Full location map: see `osf-checklist-map.md`

| # | Checklist Item | Status | Responsible |
|---|---|---|---|
| 1 | Project title is final | ✅ Done | — |
| 2 | PI and collaborators listed | ✅ Amendment A added | **PI to complete names** |
| 3 | Research question stated | ✅ Done | — |
| 4 | Primary hypotheses written | ✅ Done | — |
| 5 | Study design described | ✅ Done | — |
| 6 | Sample defined with inclusion/exclusion | ✅ Done | — |
| 7 | Sample size justified | ⚠️ Partial (archival; no power analysis) | Note in OSF free-text |
| 8 | Recruitment plan | ✅ Amendment B (N/A) | — |
| 9 | Materials and measures listed | ✅ Done | — |
| 10 | Procedure step by step | ✅ Done | — |
| 11 | Primary outcomes defined | ✅ Done | — |
| 12 | Secondary outcomes defined | ✅ Done | — |
| 13 | Stopping rule | ✅ Amendment C (N/A) | — |
| 14 | Data exclusion rules | ✅ Done | — |
| 15 | Missing-data handling | ✅ Amendment D | — |
| 16 | Outlier handling | ✅ Amendment E | — |
| 17 | Statistical analysis plan | ✅ Done | — |
| 18 | Exploratory analyses labeled | ✅ Done | — |
| 19 | Ethics/IRB status | ✅ Amendment F skeleton | **PI to confirm with ethics office** |
| 20 | Data-sharing plan | ✅ Amendment G | — |
| 21 | Internal review complete | ✅ Amendment H skeleton | **PI + co-author to sign off** |
| 22 | OSF project created | 🔴 PENDING | **PI action** |
| 23 | Correct template selected | ✅ Amendment I | **PI to confirm on OSF** |
| 24 | Registration submitted | 🔴 PENDING | **PI action** |
| 25 | DOI enabled | 🔴 PENDING | **PI action** |
| 26 | Final DOI saved | 🔴 PENDING | **PI action** |

**Preregistration hard blocker:** Items 22–26 must be completed before any Stream A, E, or F analysis begins.

---

## 3. Amendment Log

All amendments were generated 2026-06-23 to bring the preregistration into OSF checklist compliance. Amendments are written into `osf-preregistration_twse-materiality_2026-06-22.md` as §0–§0i.

| Amendment | Section | Content | Date |
|---|---|---|---|
| A | §0 | Study team table (PI + collaborators) | 2026-06-23 |
| B | §0b | Recruitment N/A — archival secondary data | 2026-06-23 |
| C | §0c | Stopping rule N/A — fixed pre-collected dataset | 2026-06-23 |
| D | §0d | Missing-data policy — listwise deletion per (g,t) cell | 2026-06-23 |
| E | §0e | Outlier policy — no winsorizing in primary spec | 2026-06-23 |
| F | §0f | Ethics/IRB — expected exempt; confirmation required | 2026-06-23 |
| G | §0g | Data-sharing plan — OSF deposit post-acceptance | 2026-06-23 |
| H | §0h | Internal review sign-off checklist | 2026-06-23 |
| I | §0i | OSF template — OSF Preregistration (standard) | 2026-06-23 |

---

## 4. Analysis Execution Order

### Phase 0 — Pre-Registration (CURRENT PHASE)
These steps must be completed **before** uploading to OSF. They do not require inferential testing.

| Step | Task | Status |
|---|---|---|
| 0.1 | Complete Amendment A (PI names/affiliations/ORCID) | 🔴 PI action |
| 0.2 | Obtain IRB exemption confirmation (Amendment F) | 🔴 PI action |
| 0.3 | Complete internal review sign-off (Amendment H) | 🔴 PI action |
| 0.4 | Run Streams B, C, D (descriptive/exploratory — not blocked) | ⏳ Can proceed now |
| 0.5 | Create OSF project and select template | 🔴 PI action |
| 0.6 | Submit preregistration on OSF Registrations page | 🔴 PI action (after 0.1–0.5) |
| 0.7 | Enable DOI and record registration DOI in preregistration footer | 🔴 PI action (after 0.6) |

### Phase 1 — Pre-Registration Exploratory Analyses (can run NOW)

These streams are explicitly not blocked by OSF registration:

| Stream | Type | Estimator | Purpose |
|---|---|---|---|
| B | Pre-trend validation | OLS propensity | Covariate balance + parallel trends narrative |
| C | Cross-sectional | OLS / Poisson | Association: `years_since_adoption` × outcomes |
| D | H3 assurance | Logistic regression | `has_any_assurance` and `big4_assurance` |

**Hard rule:** Results from Streams B, C, D must not be used to modify the primary hypotheses (H1, H2) or the primary estimator specification. Any such modification is a pre-registered deviation and must be logged.

### Phase 2 — Primary Inferential Analyses (BLOCKED until OSF DOI obtained)

| Stream | Type | Primary outcome | Estimator |
|---|---|---|---|
| A | Primary DiD | H1 (`n_material_topics_b`), H2 (`process_quality_score`), H4 (subsample) | CS21 `att_gt()` |
| E | Post-adoption dynamics | Within-company trajectory | Panel OLS / FE |
| F | NLP supplementary | `finbert_gov_density`, `bge_gov_density` | CS21 stratified |

**Blocking condition:** Streams A, E, F require OSF registration ID to be recorded in the preregistration footer before any code is executed.

### Phase 3 — Robustness Checks (run after Phase 2)

All 9 pre-registered robustness checks (§7 of preregistration) must be run and reported regardless of significance direction:

| R# | Check | Estimator |
|---|---|---|
| R1 | BJS imputation | `didimputation::did_imputation()` |
| R2 | Wooldridge extended TWFE | `fixest::feols()` with cohort × time interactions |
| R3 | Rambachan-Roth HonestDiD | `HonestDiD::createSensitivityResults()` |
| R4 | Poisson / Hurdle model | Count outcome (`n_material_topics_b`) |
| R5 | H4 TWFE fallback | `feols()` with `impact_intensity × post_gri3_it` if CS21 fails |
| R6 | `tesg_score_2022` time-invariant control | Include 2022 value as company-level pre-treatment characteristic |
| R7 | `control_group = "nevertreated"` | Document zero-unit result as confirmation of all-adopted universe |
| R8 | Bacon-Goodman decomposition | Diagnostic for treatment timing heterogeneity |
| R9 | Stream C with `sasb_industry` FE | Cross-sectional with industry partial-out |

### Phase 4 — H5 Supplementary (BLOCKED on external data)

| Step | Condition |
|---|---|
| Code TSMC tier-1 supplier list | External data required |
| Code Hsinchu Science Park registry | External data required |
| Lock semiconductor proximity indicator | After external data coded |
| Run H5 CS21 on n=49 semiconductor companies | After indicator locked + OSF registration |

---

## 5. Statistical Agent Assignments

If statistical analyses are delegated to agents, use the following assignments:

| Task | Agent | Notes |
|---|---|---|
| Stream B: propensity score / covariate balance | `data-analyst` skill | R: `MatchIt` or `cobalt` |
| Stream C: cross-sectional OLS / Poisson | `data-analyst` skill | R: `fixest::feols()`, `MASS::glm.nb()` |
| Stream D: H3 logistic regression | `data-analyst` skill | R: `glm(..., family=binomial)` |
| Stream A: CS21 DiD | `data-analyst` skill | R: `did::att_gt()` — **BLOCKED until OSF DOI** |
| R3: HonestDiD | `data-analyst` skill | R: `HonestDiD` package |
| NLP (Stream F) | `technical-researcher` skill | Python: FinBERT-ESG-9, BGE-M3, XLM-RoBERTa-XNLI |
| Visualizations | `create-viz` skill | Plotly — interactive HTML output |

---

## 6. Key Files

| File | Purpose | Location |
|---|---|---|
| `osf-preregistration_twse-materiality_2026-06-22.md` | Master preregistration document | `OSF Preregistration/` |
| `osf-checklist-map.md` | OSF checklist → exact document locations | `OSF Preregistration/` |
| `research_execution_plan.md` | This file — execution sequence and tracking | `OSF Preregistration/` |
| `hypotheses/hypothesis-generation_did-hypotheses_2026-06-10.md` | Original hypothesis generation | `hypotheses/` |
| `data/db_did.csv` | Core analysis file (2,960 rows; g=2024 excluded) | `data/` |
| `data/db_did_full.csv` | Full DiD window (3,283 rows) | `data/` |
| `twse-research-database.csv` | Master DB (5,408 rows × 195 cols; Pass DB-06) | project root |

---

## 7. Open Actions (PI Must Complete)

The following items cannot be completed by the research coordinator and require PI action:

1. **Amendment A** — Enter PI name, affiliation, ORCID, and co-author details in `§0` of preregistration
2. **Amendment F** — Obtain written IRB/ethics exemption from host institution; enter reference number in `§0f`
3. **Amendment H** — Complete internal review; both reviewers sign off in `§0h` table
4. **OSF project** — Create project at osf.io; link this document
5. **Template** — Select "OSF Preregistration" on the Registrations page
6. **Submit** — Submit registration and obtain DOI
7. **Record DOI** — Enter DOI in preregistration footer (line currently reads `OSF registration DOI: PENDING`) and in manuscript methods section

---

## 8. Deviation Policy

Per §10 of the preregistration:

> "Any deviation from this pre-registered plan must be documented in a post-registration amendment before the analysis is run."

All deviations are logged below (currently none):

| Date | Deviation | Justification | Approved by |
|---|---|---|---|
| — | — | — | — |

---

*Document created: 2026-06-23*  
*Next review: Before OSF submission*
