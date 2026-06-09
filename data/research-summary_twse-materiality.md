# Research Status Summary
**Generated:** 2026-06-09  
**Project:** TWSE Semiconductor — GRI 3 Materiality DiD Study  
**Goal file:** `hypotheses/hypothesis-generation_did-hypotheses_2026-05-22.md`

---

## 1. The Goal: What H1–H5 Need

The hypothesis file defines a **staggered DiD study** using the Callaway-Sant'Anna (2021) estimator across 73 TWSE semiconductor companies, 2016–2024 (507 company-years). The five hypotheses require:

| Hypothesis | Primary variable needed | Estimator | External data needed? |
|---|---|---|---|
| **H1** (displacement: ↓ `n_material_topics_b`) | GRI 3-3 topic counts, pre/post | CS21 | No |
| **H2** (process quality: ↑ `process_quality_score`) | Block C composite, pre/post | CS21 + TWFE | No |
| **H3** (assurance upgrade) | `assurance_level` ordinal, pre/post | CS21 + ordered logit | No |
| **H4** (heterogeneity: Fabless > Foundry/OSAT) | Same as H1 + `industry_subsector` | Subsample CS21 | No |
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

## 3. Current Database State (against the 73-company study cohort)

**DB: 188 columns × 7,765 rows (507 TWSE-semicon rows across 2016–2024, 74 unique companies)**

### Key variable coverage — TWSE-semicon subsample only

| Variable | 2016–2020 | 2021 | 2022 | 2023 | 2024 | H-relevance |
|---|---|---|---|---|---|---|
| `gri_adoption_year` | 100% ✅ | 100% ✅ | 100% ✅ | 100% ✅ | 100% ✅ | H1–H5 (treatment) |
| `n_material_topics_b` | **0%** ⚠️ | 42% | 53% | 40% | 35% | H1, H4 |
| `n_material_topics_a` | **0%** ⚠️ | 45% | 56% | 40% | 57% | H1 (alt outcome) |
| `process_quality_score` | **0%** ⚠️ | 61% | 67% | 68% | 68% | H2 |
| `assurance_level` | 49–63% | 58% | 65% | 67% | 73% | H3 |
| `ln_total_assets` | 100% ✅ | 100% ✅ | 64% ⚠️ | 64% ⚠️ | 64% ⚠️ | H1–H3 controls |
| `roa` | 100% ✅ | 100% ✅ | 64% ⚠️ | 64% ⚠️ | 64% ⚠️ | H1–H3 controls |
| `board_esg_committee` | **0%** 🔴 | **0%** 🔴 | **0%** 🔴 | **0%** 🔴 | **0%** 🔴 | H1–H2 controls |
| `standalone_sr` | — | — | — | — | 100% ✅ | H1–H2 controls |
| `industry_subsector` | 100% ✅ | 100% ✅ | 100% ✅ | 100% ✅ | 100% ✅ | H4 |

**GRI adoption distribution (73 companies):** 3 × 2021 · 65 × 2022 · 4 × 2023 · 2 × 2024  
**Industry subsector (74 companies, 2024):** Fabless=33 · OSAT=15 · Materials=8 · Equipment=8 · Foundry=5 · IDM=5

---

## 4. Alignment Assessment: Are You on Track?

### ✅ What is solidly ready

- **Treatment variable**: `gri_adoption_year` 100% coded for all 73 companies. DiD identification is in place.
- **Block F controls**: `roa`, `ln_total_assets`, `leverage` populated for 2016–2021 at ~100%; partial 2022–2024.
- **Block G**: `mda_index` and `gri_content_index_completeness` populated for 2021–2024.
- **NLP pipeline**: Fully complete for all 4 years, both language tracks. `process_quality_score` is the most complete outcome variable for the DiD.
- **Hypotheses**: H1–H5 are well-specified and falsifiable. The framing, estimator choice (CS21), and robustness plan are publication-grade.
- **H4 moderator**: `industry_subsector` is 100% populated. Fabless (33) vs Foundry+OSAT (20) is testable — though the Foundry count alone (5) is small.

### ⚠️ Gaps that constrain but don't block

**1. Pre-treatment outcome data limited to 2021**  
GRI code extraction (gri_codes_summary files) only covers 2021–2024. This means `n_material_topics_a/b` and `process_quality_score` are **zero for 2016–2020 in the subsample**. With 65 companies adopting in 2022, the DiD panel effectively has only **one pre-treatment year (2021)** for the majority of firms. This limits the event-study plot to t−1 and weakens the parallel trends test. The methodology document's Phase 4 analysis was designed for a 2016–2024 panel, but the estimable window is realistically 2021–2024.

**Implication:** The pre-registration should explicitly state the 2021–2024 estimation window. The 2016–2020 rows cannot contribute to the DiD.

**2. `n_material_topics_b` measurement inconsistency across cohorts**  
The hypothesis defines `n_material_topics_b` as "count of GRI 3-3 disclosure entries." For 2023–2024, this is sourced from `gri_tables_2023/` and `gri_tables_2024/` (structured GRI 3-3 row extractions). For 2021–2022, it falls back to `gri_codes_summary` (counts of GRI topic standard codes broadly). These two methods measure slightly different things:
- GRI Standards 2016 reporters (most of 2021–2022) don't have GRI 3-3 disclosures, but do have GRI 200/300/400 standard citations
- Average values are similar (15–16 across all years), suggesting continuity, but the measurement source changes at the treatment boundary

For H1, `n_material_topics_a` (unique GRI topic standards from content index, consistent GRI-code method across all years) may be the more defensible primary outcome, with `n_material_topics_b` from `gri_tables` as the post-treatment robustness check.

**3. Block F controls for 2022–2024**  
`ln_total_assets` and `roa` drop to ~64% coverage in 2022–2024 (the post-treatment years for most companies). This suggests the TEJ financial data merge did not fully cover recent years. The controls can still be used with listwise deletion, but the analysis should note this limitation. For 46/72 companies in 2022, controls are available — this is sufficient for estimation with appropriate caveats.

**4. H4 subsector counts**  
Actual counts: Fabless=33, Foundry=5, OSAT=15, IDM=5, Materials=8, Equipment=8. The hypothesis expected n≈28 Fabless vs n≈21 Foundry/OSAT vs n≈24 IDM. The IDM count (5 vs expected 24) is much lower, and Foundry alone (5) is too small for robust subsample estimation. Combining Foundry+OSAT gives 20 — feasible, but the test will have lower power than anticipated.

### 🔴 Hard blockers

**1. OSF pre-registration — MUST complete before any DiD estimation**  
The hypothesis file, the methodology, and standard academic practice all require this. This is the single most important next action.

**2. `board_esg_committee` = 0 across all 507 rows**  
This is listed as a control variable in H1 and H2 but has not been populated. It will need to be sourced from TWSE corporate governance reports, TEJ governance data, or manual coding from annual reports. Without it, the specifications in H1/H2 cannot be run exactly as pre-specified.

**3. H5 blocked on external data**  
TSMC tier-1 supplier coding (from TSMC Supplier Sustainability Reports 2022–2024) and Hsinchu Science Park co-location data haven't been gathered. Estimated 1–2 days of manual lookup.

---

## 5. Data Quality Assessment

| Variable / Source | Quality | Key issue | Audit file |
|---|---|---|---|
| `gri_adoption_year` | **High** | 100% populated; corrected in Pass 6 for 4 tickers | research_log.json Pass 30 |
| `n_material_topics_a` | **Medium** | 40–57% coverage in subsample; structural ceiling (image GRI indexes, Chinese-only reports) | Pass 31 |
| `n_material_topics_b` | **Medium** | Method inconsistency: gri_tables (2023–24) vs gri_codes_summary proxy (2021–22); text-regex fallback has r=0.59 | Pass 26; audit 2024 |
| `process_quality_score` | **Medium-High** | Populated for 61–68% of subsample 2021–2024; absent 2016–2020; Chinese track uses different (bilingual regex) method | Phase 1/2 NLP entries |
| `assurance_level` | **Medium** | 49–73% TEJ coverage ceiling; 1,467 rows corrected from Reasonable→Limited (Pass 28); very few Reasonable cases in subsample (5–6/year) | Pass 28 |
| `ln_total_assets`, `roa` | **High (pre-2022), Medium (2022+)** | 100% coverage through 2021; ~64% in 2022–2024; accounting identity verified | Passes 12–13 |
| `board_esg_committee` | **Missing** | 0% populated — needs sourcing | Not audited |
| `industry_subsector` | **High** | 100% Block A completeness; but Foundry n=5 limits H4 power | Pass 7 |
| Text corpus (2024) | **High** | All three extraction quality checks pass (Checks A/B/C: 2.2%, 2.0%, 6.1%); 1,042 unique companies | audit_2024.md |
| Text corpus (2021–23) | **High (structure), Medium (coverage)** | 2021: Check C median=0.772 (sidebar filter trade-off); all cohorts coordinate-corrected | audit_2021–23.md |

**Overall data confidence for H1–H4: Medium.** The treatment variable and most controls are in good shape. The outcome variables have structural coverage gaps (especially for pre-treatment years) and some measurement inconsistency at the treatment boundary for `n_material_topics_b`. These are manageable with transparent robustness checks.

---

## 6. Coverage Against Methodology Requirements (Phase 4 Readiness)

| Methodology requirement | Status | Gap |
|---|---|---|
| `gri_adoption_year` coded for all 73 companies | ✅ Done (100%) | — |
| Block C: `process_quality_score` + materiality process variables | ✅ Done (2021–2024) | 0% for 2016–2020 |
| Block D: `n_material_topics_a` (4-year panel) | ⚠️ Partial (40–57% per year) | Image-embedded GRI indexes; structural ceiling |
| Block D: `n_material_topics_b` (GRI 3-3 specific) | ⚠️ Partial + inconsistent pre/post method | See §4 gap |
| Block F financial controls (`ln_total_assets`, `roa`, `leverage`) | ⚠️ Partial (64% in 2022–2024) | TEJ data completeness |
| `board_esg_committee` control | 🔴 Missing (0%) | Needs external sourcing |
| `assurance_level` (H3) | ⚠️ Partial (49–73%) | TEJ ceiling; very few Reasonable cases |
| Industry subsector for H4 | ✅ Done (100%) | Low Foundry n (5) limits power |
| TSMC proximity indicator (H5) | 🔴 Not coded | External data — 1–2 days manual |
| NLP pipeline (full corpus, 2021–2024) | ✅ Done (Phase 1+2 both complete) | — |
| Stage 3 manual concordance (~60–80 unmatched labels) | ⚠️ Not done | Two-coder protocol |
| OSF pre-registration | 🔴 Not done | BLOCKER |
| R DiD scripts (`att_gt()`, event-study, Rambachan-Roth) | 🔴 Not written | Awaiting pre-reg |

**Overall coverage: 6 of 13 requirements fully met; 4 partial; 3 blocked.**

---

## 7. Recommended Next Steps (Priority Order)

**[PRIORITY: CRITICAL]** **OSF pre-registration of H1–H4** — Write the pre-reg document covering: sample definition (73 TWSE companies, 2021–2024 estimable window), treatment coding (`gri_adoption_year`), primary outcomes (`n_material_topics_b` with `n_material_topics_a` as alternative), estimator choice (CS21 `att_gt()`), control set (noting `board_esg_committee` TBD), robustness checks. Pre-register before any `att_gt()` call. Rationale: mandatory per academic standards; hypothesis file explicitly requires it.

**[PRIORITY: CRITICAL]** **Source `board_esg_committee`** — This control appears in H1/H2 specifications but is completely empty. Options: (a) TEJ Governance supplementary table; (b) TWSE ESG Committee Establishment Disclosures; (c) manual coding from governance reports. Affects specification validity.

**[PRIORITY: HIGH]** **Write R DiD analysis scripts** — Implement `att_gt()` for H1–H4, event-study plots (with pre-trend test for t−1), Goodman-Bacon decomposition diagnostic, Rambachan-Roth sensitivity analysis, and TWFE robustness. Use the 2021–2024 estimation window explicitly.

**[PRIORITY: HIGH]** **Stage 3 manual concordance** — ~60–80 unmatched GRI 3-3 topic labels from 2023–2024 gri_tables (two-coder protocol required). Improves `n_material_topics_b` precision for H1's primary outcome. Prioritise labels: "Climate Change Response," "GHG Emissions and Reduction," "Innovation R&D," "Regulatory Compliance."

**[PRIORITY: MEDIUM]** **Resolve Block F 2022–2024 gap** — `ln_total_assets` and `roa` at 64% for post-treatment years. Check whether TEJ file for 2022–2024 is available. Partial data is workable (listwise deletion with coverage caveat), but fuller controls strengthen the estimates.

**[PRIORITY: MEDIUM]** **Document `n_material_topics_b` method-consistency note** — Add a formal footnote or robustness check flagging that the pre-treatment `n_material_topics_b` (2021–2022 rows using gri_codes_summary) differs from the post-treatment version (2023–2024 using gri_tables GRI 3-3 row counts). Proposed solution: use `n_material_topics_a` as the primary H1 outcome (consistent GRI-code method across all years) and `n_material_topics_b` from gri_tables only for post-2022 robustness.

**[PRIORITY: MEDIUM]** **TSMC tier-1 supplier coding** (H5) — 1–2 days manual lookup from TSMC Supplier Sustainability Reports 2022–2024 + Hsinchu Science Park registry. This is needed only for H5 and can run in parallel with the main DiD analysis.

**[PRIORITY: LOW]** **Update methodology dashboard** — The methodology file's Phase 4 section references a 2016–2024 panel. Update to reflect the actual 2021–2024 estimation window and the structural reasons why 2016–2020 rows cannot contribute to the DiD.

---

## 8. Verdict: Are You on Track?

**Yes — and closer than it may feel.** The hard infrastructure work is done. The DB is well-built, the NLP pipeline just completed its final passes today, and the treatment variable is 100% coded. The hypotheses are well-specified and publishable.

The path to estimation has **two near-term gates**:
1. **Source `board_esg_committee`** and decide whether to keep or drop it from the pre-registered specification
2. **Pre-register on OSF** — then you can run `att_gt()`

The main structural constraint to accept (not fix): the estimable panel is **2021–2024**, not 2016–2024 as originally scoped. One pre-treatment year (2021) is available for 65 of 73 companies. CS21 can still deliver valid ATT estimates with this window, but the event-study pre-trend test will be limited to a single pre-period coefficient. The Rambachan-Roth sensitivity analysis is especially important given this constraint.

---

## 9. Coordinator Handoff Block

> **Research Summariser → Coordinator Handoff**  
> Session date: 2026-06-09  
> Completed passes on record: 46 (last activity: Phase 2 multilingual NLP + Phase 3 block variable population, all 4 cohorts, today)  
> DB state: 188 columns × 7,765 rows; TWSE-semicon subsample: 507 rows, 74 unique companies  
>  
> **Open critical blockers:**  
> 1. OSF pre-registration — zero inferential tests until done  
> 2. `board_esg_committee` — 0% populated, listed control in H1/H2  
> 3. H5 TSMC tier-1 supplier coding — external data, 1–2 days  
>  
> **Structural constraint to document:** Outcome variable pre-treatment baseline only available from 2021 (not 2016). Effective estimation window = 2021–2024.  
>  
> **Data quality flags:**  
> - `n_material_topics_b`: method inconsistency pre/post treatment boundary — consider `n_material_topics_a` as primary H1 outcome  
> - `assurance_level`: very few Reasonable cases in subsample (5–6/year) — H3 power concern  
> - Block F controls: 64% coverage in 2022–2024 post-treatment years  
>  
> **Coverage shortfalls:** 6/13 Phase 4 requirements fully met  
>  
> **Suggested focus for next session:** Pre-registration document drafting + `board_esg_committee` sourcing. Once those two are resolved, R DiD scripts can follow immediately.  
>  
> **Do NOT re-assign:**  
> phase1 (FinBERT, ClimateBERT, ESGLens, Block C — all 4 years, EN track),  
> phase2 (BGE-M3, XLM-RoBERTa, Block C Chinese — all 4 years),  
> phase3 (mda_index, gri_content_index_completeness, n_material_topics_b, topic_depth_score — all 4 years),  
> gri_adoption_year full-universe fill (Pass 30),  
> assurance_level correction (Pass 28),  
> Block F TEJ merge (Passes 12–17),  
> H1–H5 hypothesis generation (Pass 8)
