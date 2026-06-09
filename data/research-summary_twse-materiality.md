# Research Status Summary
**Generated:** 2026-06-09  
**Project:** GRI 3 Materiality DiD Study  
**Goal file:** `hypotheses/hypothesis-generation_did-hypotheses_2026-05-22.md`

---

## 1. The Goal: What H1–H5 Need

The hypothesis file defines a **two-tier staggered DiD study** using the Callaway-Sant'Anna (2021) estimator. Tier 1 (H1–H4) runs on the full TWSE universe (~1,200 treated companies, panel 2021–2024); Tier 2 (H5) narrows to 73 TWSE semiconductor companies. The five hypotheses require:

| Hypothesis | Primary variable needed | Estimator | External data needed? |
|---|---|---|---|
| **H1** (displacement: ↓ `n_material_topics_b`) | GRI 3-3 topic counts, pre/post | CS21 | No |
| **H2** (process quality: ↑ `process_quality_score`) | Block C composite, pre/post | CS21 + TWFE | No |
| **H3** (assurance upgrade) | `assurance_level` ordinal, pre/post | CS21 + ordered logit | No |
| **H4** (heterogeneity: Light-footprint > High-impact industries) | Same as H1 + `sasb_industry` → `impact_intensity` | Subsample CS21 | No |
| **H5** (TSMC isomorphism: proximate adopt earlier) | `process_quality_score` + TSMC proximity | CS21 interaction | **Yes — TSMC tier-1 coding** |

**The single biggest gate before any of these can run: OSF pre-registration.** The hypothesis file explicitly states all inferential tests must be pre-registered before execution.

---

## 2. Completed Work (42+ passes, 2026-05-18 → 2026-06-09)

The research passed through a major build-out over three weeks:

**Infrastructure (Passes 1–22, May 18–24):** Regulatory and NLP landscape mapped; variable registry (Definitions.docx) built; gap analysis completed (7 gaps, Gap 7 = displacement effect = H1); full TWSE universe DB scaffold built (7,765 rows × 157+ columns); Block A (identifiers), Block B (report metadata including `gri_adoption_year`), Block C (2024 materiality process variables), Block D partial (`n_material_topics_a` for 2021–2024), Block E (topic dynamics panel), Block F (TEJ financial data — balance sheet, income statement, equity, governance, ESG scores for 2016–2024), Block G (partial) all populated. Hypotheses H1–H5 generated.

**NLP Pipeline — Phase 1 English Track (Passes 33–37, June 8):** FinBERT-ESG-9, ClimateBERT, ESGLens SBERT, and Block C regex run on all English files for all four cohorts: **307 files (2021), 389 files (2022), 526 files (2023), 680 files (2024) = 1,902 total.** DB now at 188 columns.

**NLP Pipeline — Phase 2 Multilingual Track (Passes 38–42, June 9 — today):** BGE-M3, XLM-RoBERTa-XNLI, and Block C Chinese extractor run on Chinese/bilingual files for all four cohorts: **172 (2021), 225 (2022), 216 (2023), 361 (2024) = 974 total.**

**Phase 3 Block Variable Population (Passes 43–46, June 9 — today):** `mda_index`, `gri_content_index_completeness`, `n_material_topics_b`, and `topic_depth_score` populated for all four cohorts.

**Key data corrections:** `gri_adoption_year` populated for full TWSE universe (Pass 30); `assurance_level` corrected — 1,467 rows re-mapped from Reasonable → Limited after TEJ re-check (Pass 28); 2022 corpus deduplicated (Pass 23); `n_material_topics_b` text-regex extended to 516 missing 2024 companies (Pass 26).

| Agent | Passes active |
|---|---|
| web-researcher | 1, 2 |
| academic-researcher | 1 |
| data-analyst | 2–9, 11–17, 20–21, 23, 25–27, 30–31 |
| technical-researcher | 8, 10, 18 |
| research-coordinator | 5, 22, 24, 26–31 |
| hypothesis-generation | 8 |
| coordinator-scripts | 34–46 |

**Total logged passes: 46. Most recent activity: 2026-06-09 (Phases 2 + 3 multilingual/block-vars).**

---

## 3. Current Database State (full TWSE population)

**DB: 188 columns × 7,750 rows | Estimable window 2021–2024: 4,970 rows, 2,056 unique tickers**

### Population and treatment structure

| | Count |
|---|---|
| Unique tickers in DB (all years) | 2,077 |
| Treated (have `gri_adoption_year`) | 2,009 |
| Never treated (control group) | 68 |
| Adoption cohort 2021 | 14 |
| Adoption cohort 2022 | 868 |
| Adoption cohort 2023 | 309 |
| Adoption cohort 2024 | 818 |

**H4 impact intensity split (unique tickers):**  
Low-footprint (Technology + Services + HealthCare + Financials): 1,010 · High-impact (Resource + Infrastructure + Transportation + Minerals + Food): 661 · Other/unclassified: 406 (Consumer, RenewableEnergy — sensitivity check)

### PDF corpus reconciliation

| Year | Rows in DB | PDFs processed | PDF coverage | Company-years without PDF |
|---|---|---|---|---|
| 2021 | 822 | 4 | **~0%** | 818 |
| 2022 | 980 | 607 | 62% | 373 |
| 2023 | 1,185 | 727 | 61% | 458 |
| 2024 | 1,983 | 1,041 | 52% | 942 |
| **Total** | **4,970** | **2,379** | **48%** | **2,591** |

⚠️ **Data quality flag:** Rows without a PDF have `n_material_topics_b = 0` (not NULL). These zeros are artefacts of unprocessed rows — not true zero-topic reports. They must be converted to `NA` before running `att_gt()`, otherwise the estimator will treat them as valid zero observations and bias the ATT downward.

### Key variable coverage — full TWSE population, 2021–2024

| Variable | 2021 | 2022 | 2023 | 2024 | Notes | H-relevance |
|---|---|---|---|---|---|---|
| `gri_adoption_year` | 94% | 100% | 100% | 100% | 6% gap = 68 never-treated tickers | H1–H5 (treatment) |
| `n_material_topics_b` (non-zero) | 39% | 53% | 48% | 38% | Non-null=100%; zeros = unprocessed rows (see flag above) | H1, H4 |
| `n_material_topics_a` (non-zero) | 41% | 54% | 49% | 51% | Same note | H1 (alt outcome) |
| `process_quality_score` (non-zero) | 57% | 62% | 61% | 52% | Tracks PDF coverage | H2 |
| `assurance_level` | 65% | 59% | 58% | 43% | Sourced from TEJ — independent of PDF coverage | H3 |
| `ln_total_assets` | 88% | 60% | 56% | 46% | TEJ gap in 2022–2024 | H1–H4 controls |
| `roa` | 88% | 60% | 56% | 46% | Same | H1–H4 controls |
| `board_approved` *(replaces `board_esg_committee`)* | 58% | 63% | 61% | 53% | Block C; tracks PDF/extraction coverage | H1–H4 controls |
| `standalone_sr` | 100% | 100% | 100% | 100% | Registry-sourced | H1–H4 controls |
| `sasb_industry` | 88% | 95% | 94% | 96% | H4 moderator; 6% gap needs TEJ/TWSE fill | H4 moderator |

**GRI adoption distribution (full population):** 14 × 2021 · 868 × 2022 · 309 × 2023 · 818 × 2024  
**Effective treated sample (2022 cohort, the primary mass):** 868 companies — all with 2021 as their single pre-treatment year

---

## 4. Alignment Assessment: Are You on Track?

### ✅ What is solidly ready

- **Treatment variable**: `gri_adoption_year` 100% coded for all 2,009 treated companies. DiD identification is in place.
- **Block F controls**: `roa`, `ln_total_assets` populated at ~88% for 2021; 46–60% in 2022–2024 (TEJ gap). Workable with listwise deletion.
- **Block G**: `mda_index` and `gri_content_index_completeness` populated for 2021–2024.
- **NLP pipeline**: Fully complete for all 4 years, both language tracks. `process_quality_score` is the most complete NLP-derived outcome (52–62% coverage tracking PDF availability).
- **Hypotheses**: H1–H5 are well-specified and falsifiable. The framing, estimator choice (CS21), and robustness plan are publication-grade.
- **H4 moderator**: `sasb_industry` is 94–96% populated for 2022–2024. Low-footprint (1,010 tickers) vs High-impact (661 tickers) split is well-powered for subsample CS21.
- **Control set resolved**: `board_esg_committee` (0% populated) replaced by `board_approved` (Block C, 53–63% coverage matching PDF extraction). Substitution documented; original can be added as robustness if sourced from TEJ.

### ⚠️ Gaps that constrain but don't block

**1. Pre-treatment outcome data limited to 2021 — and near-zero PDF coverage for that year**  
GRI code extraction only covers 2021–2024, so `n_material_topics_a/b` and `process_quality_score` are structurally unavailable for 2016–2020. More critically, 2021 PDF coverage is ~0% (4 of 822 company-years processed). This means the 868-company 2022 cohort — the primary adoption mass — has almost no extracted baseline data for their single pre-treatment year. For H1 and H2, the CS21 estimator will rely on the not-yet-treated control group to infer counterfactual trends rather than within-firm pre-treatment observations.

**Implication:** Pre-registration should state the 2021–2024 estimation window explicitly; note the 2021 PDF gap and its effect on event-study pre-trend power; and emphasise the Rambachan-Roth sensitivity analysis as the primary parallel trends check.

**2. `n_material_topics_b` zeros are artefacts, not true observations**  
`n_material_topics_b` is 100% non-null but only 38–53% non-zero. The zeros correspond to the ~2,591 company-years without a PDF. These must be set to `NA` before estimation — running `att_gt()` on the current data would treat them as true zero-topic reports and severely bias the ATT downward. This is the single most important data prep step before any regression.

**3. `n_material_topics_b` measurement inconsistency at the treatment boundary**  
Post-treatment rows (2023–2024 primarily) use `gri_tables` GRI 3-3 row counts; pre-treatment rows (2021–2022) fall back to `gri_codes_summary` topic-standard code counts — slightly different constructs. `n_material_topics_a` (consistent GRI-code method across all years) is more defensible as the primary H1 outcome; `n_material_topics_b` from `gri_tables` as post-adoption robustness.

**4. Block F controls 2022–2024**  
`ln_total_assets` and `roa` at 46–60% for 2022–2024 (TEJ gap). Workable with listwise deletion; note in analysis as a limitation. Does not change estimation strategy.

**5. `sasb_industry` gap (6%) for H4**  
467 company-years (primarily 2021 rows) are missing `sasb_industry`. Fill from TWSE MOPS or TEJ sector codes, or exclude with pre-registered note. Not a blocker — the 94–96% coverage for 2022–2024 is sufficient for the H4 subsamples.

### 🔴 Hard blockers

**1. OSF pre-registration — MUST complete before any DiD estimation**  
The hypothesis file, the methodology, and standard academic practice all require this. This is the single most important next action.

**2. `n_material_topics_b` zeros must be set to NA before estimation**  
~2,591 company-years in 2021–2024 have `n_material_topics_b = 0` as an artefact of not having been processed (no PDF). These are not true zero-topic observations. They must be replaced with `NA` before running `att_gt()`. Failure to do so will bias ATT estimates downward. This is the most critical immediate data-prep step.

**3. H5 blocked on external data**  
TSMC tier-1 supplier coding (from TSMC Supplier Sustainability Reports 2022–2024) and Hsinchu Science Park co-location data haven't been gathered. Estimated 1–2 days of manual lookup.

---

## 5. Data Quality Assessment

| Variable / Source | Quality | Key issue | Audit file |
|---|---|---|---|
| `gri_adoption_year` | **High** | 100% populated; corrected in Pass 6 for 4 tickers | research_log.json Pass 30 |
| `n_material_topics_a` | **Medium** | 41–54% non-zero (full pop); structural ceiling from PDF coverage (~48% overall, ~0% 2021) | Pass 31 |
| `n_material_topics_b` | **Medium — requires data prep** | 100% non-null but ~52% are zeros (unprocessed rows — must be set to NA); method inconsistency at treatment boundary | Pass 26; audit 2024 |
| `process_quality_score` | **Medium** | 52–62% non-zero (full pop); tracks PDF coverage; absent 2016–2020 structurally | Phase 1/2 NLP entries |
| `assurance_level` | **Medium** | 43–65%; TEJ-sourced (independent of PDF coverage); 1,467 rows corrected Reasonable→Limited (Pass 28) | Pass 28 |
| `ln_total_assets`, `roa` | **High (2021), Medium (2022+)** | 88% in 2021; 46–60% in 2022–2024; accounting identity verified | Passes 12–13 |
| `board_approved` | **Medium** | 53–63% non-null (tracks PDF/Block C extraction); replaces `board_esg_committee` (0%); binary 0/1 both valid | Block C extraction |
| `sasb_industry` | **High** | 88–96% across years; H4 moderator; 6% gap (467 rows) fillable from TWSE/TEJ | Block A |
| Text corpus (2024) | **High** | All quality checks pass; 1,042 unique companies processed | audit_2024.md |
| Text corpus (2021–23) | **High (structure), Low (2021 coverage)** | 2021: only 4 PDFs in ledger (~0% coverage); 2022–23: 61–62% coverage | audit_2021–23.md |

**Overall data confidence for H1–H4: Medium.** Treatment variable solid; controls mostly workable. Two pre-analysis steps required before estimation: (1) set `n_material_topics_b` zeros to NA for unprocessed rows; (2) download missing PDFs (priority: 2021 cohort for pre-treatment baseline).

---

## 6. Coverage Against Methodology Requirements (Phase 4 Readiness)

| Methodology requirement | Status | Gap |
|---|---|---|
| `gri_adoption_year` coded for all 2,009 treated companies | ✅ Done (100%) | — |
| Block C: `process_quality_score` + materiality process variables | ✅ Done (2021–2024) | 0% for 2016–2020 (structural) |
| Block D: `n_material_topics_a` (4-year panel) | ⚠️ Partial (41–54% non-zero per year) | PDF coverage ceiling; 2021 ~0% |
| Block D: `n_material_topics_b` — zeros → NA required | ⚠️ Data prep + method inconsistency | **Critical pre-processing step** |
| Block F financial controls (`ln_total_assets`, `roa`) | ⚠️ Partial (46–60% in 2022–2024) | TEJ gap |
| `board_approved` control | ✅ Done (53–63% non-null) | Replaces `board_esg_committee` |
| `assurance_level` (H3) | ⚠️ Partial (43–65%) | TEJ ceiling |
| `sasb_industry` for H4 `impact_intensity` | ⚠️ Near-complete (88–96%) | 6% gap; fillable |
| TSMC proximity indicator (H5) | 🔴 Not coded | External data — 1–2 days manual |
| NLP pipeline (full corpus, 2021–2024) | ✅ Done (Phase 1+2 both complete) | — |
| Stage 3 manual concordance (~60–80 unmatched labels) | ⚠️ Not done | Two-coder protocol |
| OSF pre-registration | 🔴 Not done | BLOCKER |
| R DiD scripts (`att_gt()`, event-study, Rambachan-Roth) | 🔴 Not written | Awaiting pre-reg |

**Overall coverage: 6 of 13 requirements fully met; 5 partial; 2 blocked.**

---

## 7. Recommended Next Steps (Priority Order)

**[PRIORITY: CRITICAL]** **Set `n_material_topics_b` zeros to NA for unprocessed rows** — ~2,591 company-years (2021–2024) have zero values as artefacts. Identify rows without a corresponding PDF in the extraction ledger and set `n_material_topics_b` (and `n_material_topics_a`, `process_quality_score`, `board_approved` where similarly affected) to `NA`. Do before any regression.

**[PRIORITY: CRITICAL]** **OSF pre-registration of H1–H5** — Sample definition: full TWSE universe 2021–2024 for H1–H4; 73-company semiconductor sub-cohort for H5. Lock `impact_intensity` derivation rule, `board_approved` as primary board-engagement control, and `n_material_topics_a` as primary H1 outcome. Pre-register before any `att_gt()` call.

**[PRIORITY: HIGH]** **Download missing 2021 PDFs** — Only 4 of 822 company-years have 2021 PDFs processed. The 868-company 2022 adoption cohort has almost no extracted pre-treatment baseline. Priority: download 2021 reports for any company adopting GRI 3 in 2022 (868 companies). Even partial coverage significantly improves pre-trend testability.

**[PRIORITY: HIGH]** **Write R DiD analysis scripts** — Implement `att_gt()` for H1–H4, event-study plots (t−1 pre-trend), Goodman-Bacon decomposition, Rambachan-Roth sensitivity, and TWFE robustness. Use 2021–2024 window; filter to rows with non-NA outcome variables only.

**[PRIORITY: HIGH]** **Stage 3 manual concordance** — ~60–80 unmatched GRI 3-3 topic labels (two-coder κ ≥ 0.80). Improves `n_material_topics_b` precision. Priority labels: "Climate Change Response," "GHG Emissions and Reduction," "Innovation R&D," "Regulatory Compliance."

**[PRIORITY: MEDIUM]** **Fill `sasb_industry` 6% gap** — 467 rows missing H4 moderator. Source from TWSE MOPS industry codes or TEJ sector classification. Pre-specify and lock the High/Low `impact_intensity` derivation rule in the OSF pre-registration.

**[PRIORITY: MEDIUM]** **Resolve Block F 2022–2024 gap** — `ln_total_assets` and `roa` at 46–60%. TEJ supplementary export for missing company-years. Partial data workable with listwise deletion.

**[PRIORITY: MEDIUM]** **TSMC tier-1 supplier coding** (H5 only) — 1–2 days manual lookup. Can run in parallel with H1–H4 analysis.

---

## 8. Verdict: Are You on Track?

**Yes — and closer than it may feel.** The hard infrastructure work is done. The DB is well-built, the NLP pipeline just completed its final passes today, and the treatment variable is 100% coded. The hypotheses are well-specified and publishable.

The path to estimation has **three near-term gates**:
1. **Set `n_material_topics_b` zeros to NA** for ~2,591 unprocessed rows — one script, one hour
2. **Pre-register on OSF** (H1–H5, both tiers) — then `att_gt()` can run
3. **Download 2021 PDFs** for the 2022 adoption cohort — improves pre-trend testability significantly

The main structural constraint to accept: the estimable panel is **2021–2024**, and 2021 PDF coverage is ~0%, meaning the 868-company 2022 cohort has minimal extracted pre-treatment data. CS21 can still deliver valid ATT estimates using the not-yet-treated control group for counterfactual inference, but the event-study pre-trend test is limited. The Rambachan-Roth sensitivity analysis is essential given this constraint.

---

## 9. Coordinator Handoff Block

> **Research Summariser → Coordinator Handoff**  
> Session date: 2026-06-09  
> Completed passes on record: 46 (last activity: Phase 2 multilingual NLP + Phase 3 block variable population, all 4 cohorts, today)  
> DB state: 188 columns × 7,750 rows; full TWSE population: 2,056 unique tickers (2021–2024), 2,009 treated  
>  
> **Open critical blockers:**  
> 1. `n_material_topics_b` zeros → NA for ~2,591 unprocessed rows (pre-analysis data prep — must do before regression)  
> 2. OSF pre-registration — zero inferential tests until done  
> 3. H5 TSMC tier-1 supplier coding — external data, 1–2 days  
>  
> **Structural constraint to document:** Outcome variable pre-treatment baseline only available from 2021 (not 2016). Effective estimation window = 2021–2024.  
>  
> **Data quality flags:**  
> - `n_material_topics_b`: 100% non-null but ~52% are placeholder zeros (unprocessed rows) — **must set to NA before regression**  
> - `n_material_topics_b`: method inconsistency pre/post treatment boundary — use `n_material_topics_a` as primary H1 outcome  
> - 2021 PDF coverage ~0% — pre-treatment baseline for 2022 cohort almost entirely missing; prioritise 2021 PDF downloads  
> - `assurance_level`: TEJ coverage declining (43% in 2024); few Reasonable cases — H3 power concern  
> - Block F controls: 46–60% coverage in 2022–2024  
>  
> **Coverage shortfalls:** 6/13 Phase 4 requirements fully met; 5 partial; 2 blocked  
>  
> **Suggested focus for next session:** (1) NA-fix script for `n_material_topics_b`; (2) OSF pre-registration; (3) 2021 PDF downloads for 2022 adoption cohort.  
>  
> **Do NOT re-assign:**  
> phase1 (FinBERT, ClimateBERT, ESGLens, Block C — all 4 years, EN track),  
> phase2 (BGE-M3, XLM-RoBERTa, Block C Chinese — all 4 years),  
> phase3 (mda_index, gri_content_index_completeness, n_material_topics_b, topic_depth_score — all 4 years),  
> gri_adoption_year full-universe fill (Pass 30),  
> assurance_level correction (Pass 28),  
> Block F TEJ merge (Passes 12–17),  
> H1–H5 hypothesis generation (Pass 8)
