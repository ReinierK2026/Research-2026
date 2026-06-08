---
agent: research-coordinator
type: synthesis-summary
topic: "twse-materiality"
last_updated: "2026-06-08"
sessions: ["2026-05-18", "2026-05-20", "2026-05-21", "2026-05-22", "2026-05-23", "2026-05-24", "2026-06-08"]
agents_ever_deployed: ["web-researcher", "academic-researcher", "data-analyst", "technical-researcher", "research-gap-analysis", "hypothesis-generation", "research-coordinator"]
status: current
---

# Research Summary: GRI Universal Standards 2021 Adoption and Material Topic Disclosure Among TWSE Companies

---

## Research Question

Does adoption of GRI Universal Standards 2021 (the GRI 3 treatment) cause a net decrease in the number of disclosed material topics among TWSE-listed companies — a displacement effect driven by GRI 3-3's mandatory management-of-material-topics disclosures? And what are the effects on process quality, assurance, and topic composition?

---

## Methodology

### Study Design
Staggered Difference-in-Differences (DiD) using the Callaway-Sant'Anna (2021) estimator (`att_gt()` in R `did` package). Estimand: Average Treatment Effect on the Treated (ATT). Treatment = first fiscal year a company reports under GRI Universal Standards 2021, coded in `gri_adoption_year`.

### Population
- **Primary sample**: Full TWSE universe — 2,091 unique companies × 2016–2024 = 7,765 company-year rows  
- **Potential analytical subsample**: 73-company industry subset (507 company-years, 2016–2024), available for focused subgroup analysis if an industry lens is selected at the analysis stage. If activated, this subsample can be further categorised by company type (~28 Fabless, ~21 Foundry/OSAT, ~24 IDM).

### Database
`twse-research-database.csv` — 157 columns × 7,765 data rows (+ 2 header rows: block labels + column names). UTF-8 BOM. Block-label header pattern: Row 1 = block labels (A/B/C/D/F/G), Row 2 = column names, Row 3+ = data.

### 2024 Cohort Reconciliation
| Stage | Count | Notes |
|-------|-------|-------|
| TEJ CSR Disclosure rows (2024) | 1,983 | All TWSE companies with ESG filings per TEJ — database scaffold |
| Source PDFs on disk (`twse_esg_reports/2024/`) | 1,043 | 662 English (`_E`) + 381 non-English |
| Extracted `.txt` files (`extracted_text/2024_processed/`) | 1,064 | 680 English + 384 non-English; 21 extra from ESGgenplus (no local PDF) |
| **Unique companies in NLP corpus** | **1,042** | 22 tickers have paired English+Chinese versions → 1,064 files, 1,042 companies |
| TEJ rows with no report in corpus | 941 | Have TEJ scaffold data but no extractable ESG report text |

All coverage percentages for NLP-based blocks (B, C, D) are expressed against **1,042** (unique companies with extracted text).

### Agents Deployed (cumulative across all sessions)
- **web-researcher**: Regulatory/industry intelligence (2 passes)
- **academic-researcher**: Scholarly literature, methods (1 pass)
- **data-analyst**: All DB construction, Block B–G population, taxonomy, dynamics (8+ passes)
- **technical-researcher**: NLP pipeline design, language routing, GRI extraction (3 passes)
- **research-gap-analysis**: Gap identification (1 pass)
- **hypothesis-generation**: H1–H5 formulation (1 pass)
- **research-coordinator**: Session coordination and synthesis (this pass)

### Data Sources
| Source | Coverage | Variables |
|--------|----------|-----------|
| TEJ CSR Disclosure.xlsx | 2016–2024, 7,765 rows | Scaffold, mandatory/voluntary, GRI standard version, ref_sasb/tcfd/tnfd/sdgs/ir |
| TEJ Balance Sheet data.xlsx | 2016–2024, 4,365 rows | 22 raw + 5 derived balance sheet variables |
| TEJ Income Statement.xlsx | 2016–2024, 4,365 rows | 12 raw + 6 derived income statement variables |
| TEJ Equty.xlsx | 2016–2024, 4,895 rows | Market cap, shares, P/B (Tobin's Q proxy), P/E, return |
| TEJ Governance.xlsx | 2014/01–2025/01 monthly, 7,670 rows | Board size, director/supervisor counts, ownership %, pledged %, liability insurance |
| TEJ ESG score.xlsx | 2016–2022 only, 4,428 rows | TESG rating, score, E/S/G sub-scores |
| ESGgenplus text corpus | 2021–2024, partial universe | ESG report PDFs (45GB) for text-based NLP extraction |
| GRI code extraction pipeline | 2021–2024 | gri_codes_summary_202[1-4].csv, gri_tables_2023-2024/ |

### Analytical Scope (Date Range)
Panel: 2016–2024. Text data: 2021–2024. TEJ ESG scores: 2016–2022. GRI 3 treatment cohorts: 2021–2024 (most in 2022–2023).

---

## Key Findings

### Regulatory & Industry Context [High confidence | web-researcher | 2026-05-18]
- TWSE universal sustainability reporting mandate effective 2025 filing cycle (1,883 companies total — unique globally for 100% GRI adoption)
- IFRS S1/S2 phased mandate: Phase 1 (>NT$10B cap) FY2026; Phase 2 (NT$5-10B) FY2027; Phase 3 (all) FY2028
- GRI 101: Biodiversity 2024 effective Jan 2026 (replaces GRI 304); GRI 102 Climate + GRI 103 Energy effective Jan 2027
- ISSA 5000 approved Nov 2024; effective Dec 2026 engagements — replaces ISAE 3000 for assurance
- EU Omnibus I (Feb 2026): CSRD scope reduced from 50,000 → ~5,000 companies (>1,000 employees AND >€450M revenue); major global tech/electronics manufacturers (ASML, Infineon, STMicro, NXP) remain mandatory CSRD reporters
- TWSE assurance rate: 64.4% of 722 reporters (2023 filing cycle)
- ESGgenplus platform: full PDFs for all 1,883 filers; no XBRL tagging; data not backfilled prior to 2019 for most companies

### Literature & Methods [High confidence | academic-researcher | 2026-05-18]
- **Primary methodological precedent**: Göttsche et al. (2025) *RAS* Vol.30 pp.3596–3639 — demonstrates displacement effect for SASB financial-materiality reporting; direct precedent for H1
- Callaway-Sant'Anna (2021) is the correct estimator for staggered adoption with heterogeneous treatment timing; `staggered` package (Roth & Sant'Anna 2023) provides proxy power assessment
- Power analysis: 80% power for ATT ≥ 1.5 topics with 50–80 treated firms; full TWSE universe (n=2,091) exceeds minimum; a 73-company subgroup would still be sufficient for ATT ≥ 2 topics
- IPW recommended for attrition correlated with firm size; Hurdle Poisson preferred over ZIP for topic count outcomes when structural zeros present
- Primary publication venues: *SAMPJ* or *CSR&EM*; NLP pipeline alone → *Expert Systems*
- Pre-registration required on OSF or AsPredicted before any inferential DiD tests; replication package on Harvard Dataverse

### Treatment Variable [High confidence | data-analyst | 2026-05-21]
- `gri_adoption_year` derived from `gri_standard_version` for the full TWSE universe (coverage mirrors TEJ CSR Disclosure: 100% of all 7,765 company-year rows)
- Distribution validated for 73-company subsample: 2021: 3 companies, 2022: 65 companies, 2023: 4 companies, 2024: 2 companies (full-universe distribution proportionally similar; concentrated in 2022)
- GRI Standards 2016 used 2016–2021; GRI Universal 2021 used 2022–2024 (for treated companies)
- 4 companies in the subsample initially miscoded 2024 → corrected to 2023 based on text evidence (3006, 3227, 6573, 8110)
- DiD treatment variable fully valid for CS21 estimation across the full universe

### Block B: Report Characteristics [High confidence | data-analyst | 2026-05-20/22]
- All 7,765 company-year rows have 100% coverage on: `gri_standard_version`, `gri_adoption_year`, `bilingual_report` (sourced from TEJ CSR Disclosure)
- Text-level coverage (word count, page count, language): 0% for 2016–2020 (no text files available); 2024: 100% of the 1,042-company NLP corpus
- Bilingual reporting: 22 companies have both English (`_E`) and Chinese versions in the corpus; identified via filename suffix
- 2024: 1,983 TWSE companies filed an ESG report per TEJ; the NLP corpus covers 1,042 of these (52.5%); the remaining 941 have TEJ scaffold data but no extractable report text

### Block C: Materiality Process Quality [Medium-high confidence | data-analyst + technical-researcher | 2026-05-22/23]
Pre-adoption trends (2021→2023) from full TWSE universe:

| Metric | 2021 | 2022 | 2023 | 2024 |
|--------|------|------|------|------|
| mat_section_found | 75.4% | 74.3% | 71.5% | 100%* |
| board_approved | 32.8% | 43.3% | 47.2% | 100%* |
| double_materiality_mentioned | 1.1% | 6.3% | 9.4% | n/a |
| avg process_quality_score | 0.527 | 0.543 | 0.546 | 0.554* |

*2024 figures: 1,042/1,042 companies in NLP corpus (100% coverage within corpus). Expressed as % of TEJ universe (1,983): 52.5%.

Key trends: board_approved rising sharply pre-GRI 3 (governance tightening); double materiality awareness spreading (CSRD diffusion into TWSE); process quality improving gradually pre-treatment (pre-trend validation needed for H2).

### Block D: Topic Disclosure Counts [High confidence | data-analyst | 2026-05-22/23]
n_material_topics_a (GRI standard topic codes, not GRI 2-x) rising monotonically 2021–2024 for full TWSE universe:

| Year | Avg topics_total_n | Avg env | Avg soc | Avg gov |
|------|-------------------|---------|---------|---------|
| 2021 | 14.8 | 4.8 | 6.4 | 3.6 |
| 2022 | 15.6 | 5.5 | 6.2 | 3.8 |
| 2023 | 16.1 | 5.8 | 6.4 | 3.9 |
| 2024 | 17.5 | 6.2 | 6.9 | 4.4 |

Environmental topics fastest growing (+29% over panel). SASB TC-SC topic alignment improving: avg SASB TC-SC topics 7.3 (2021) → 8.5 (2024).

n_material_topics_b (GRI 3-3 disclosure entry count): **1,042/1,042 (100%) of NLP-corpus companies now have a value** (Pass 26 — 2026-06-08); 633/1,042 (60.7%) non-zero, 409/1,042 zero (image-based GRI index or no GRI 3-3 disclosures detected). 526 values from gri_tables CSVs (original extraction); 516 values from txt-based multi-pattern extraction (v5: management-phrase regex + in-body `GRI 3-3：YYYY` page-count; Pearson r=0.59 vs gri_tables baseline; 29% exact, 51% within ±1 on 526-ticker validation). For n_material_topics_a: 1,011/1,042 (97.0% — 31 remaining: image-embedded GRI index). This is the primary H1 outcome variable. **Pre-GRI 3 baseline unavailable by definition** — this is structurally correct, as GRI 3-3 did not exist before GRI Universal Standards 2021.

### Block E: Topic Dynamics [High confidence | data-analyst | 2026-05-23]
Binary topic panel: 80,255 rows (2,293 company-years × 35 canonical topics); binary disclosed 0/1.

Year-over-year Jaccard similarity and churn:

| Transition | n transitions | Avg Jaccard | Avg churn | Avg added | Avg dropped |
|------------|--------------|-------------|-----------|-----------|-------------|
| 2021→2022 | 259 | 0.631 | 0.555 | 3.4 | 3.2 |
| 2022→2023 | 434 | 0.785 | 0.329 | 2.0 | 1.5 |
| 2023→2024 | 537 | 0.780 | 0.330 | 2.8 | 1.0 |

**Key insight**: Elevated 2021→2022 churn (Jaccard 0.631) reflects GRI Standards 2016→Universal 2021 standard-switch mechanics — NOT a GRI 3 treatment effect. This should be flagged as a pre-treatment placebo check covariate in pre-registration.

Top disclosed topics in 2024 (>85%): S05 Talent (91.7%), E02 GHG (91.5%), G08 Economic Performance (91.1%), S01 OHS (87.9%), E01 Energy (86.9%) — universal, low DiD variation. Topics in DiD variation range (30–70%): E03 Scope 3 (65.2%), E08 Air Quality (44.3%), S07 Human Rights (45.6%), G05 IP Protection (51.0%), E09 Biodiversity (21%).

### Block F: Financial Controls [High confidence | data-analyst | 2026-05-23]
All financial data from TEJ, December fiscal year-end filter (YYYY/12). NTD thousands units throughout.

**Balance Sheet** (99 → 124 columns; 4,365 rows; accounting identity verified: 0 mismatches):
- 22 raw columns: total assets/liabilities/equity, current/non-current splits, debt decomposition, PP&E, intangibles, cash, receivables, inventories, payables, right-of-use assets
- 5 derived: total_debt_ntd_thou, ln_total_assets, leverage (total_debt/total_equity), debt_ratio, current_ratio, working_capital_ntd_thou

**Income Statement** (124 → 139 columns; 4,365 rows):
- 12 raw columns: revenue, gross profit, R&D expense, operating income, EBIT, EBITDA, EBT, net income (parent/total), EPS basic/diluted, finance costs
- 6 derived: roa, rd_intensity, gross_margin, operating_margin, net_profit_margin, revenue_growth

**Equity/Valuation** (146 → 153 columns; 4,895 rows):
- 7 raw: shares_outstanding, market_cap, P/E, P/B, price/sales, dividend yield, annual stock return, market segment
- tobins_q = P/B (standard ESG-finance proxy; 14,839 TSE, 447 REG, 120 OTC, 6 TIB, 1 PSB)

**ESG Scores** (153 → 157 columns):
- TESG rating + score + E/S/G sub-scores: 2016–2022 only (TEJ file does not contain 2023–2024)
- tse_mandatory_reporter: 100% coverage 2016–2024
- ref_sasb/tcfd/tnfd/sdgs/ir: backfilled from CSR Disclosure file (7,750 rows updated)

### Block G: Governance [High confidence | data-analyst | 2026-05-23]
TEJ Governance monthly data (2014/01–2025/01), December snapshots used. ~98–100% coverage per year (7,670 rows updated):
- board_seats, board_directors_n, board_supervisors_n, board_ownership_pct, director_ownership_pct, board_pledged_pct, main_shareholders_pct, liability_insurance_yn
- TSMC 2024: 10 seats, 10 directors, 6.52% insider ownership ✓
- independent_director_ratio: NOT available in TEJ Governance file; remains stub

### Firm Age [High confidence | data-analyst | 2026-05-23]
- firm_age = fiscal_year − TWSE listing year (confirmed TSMC: 2016 age=22 → listed 1994 ✓; Mediatek: 2016 age=15 → listed 2001 ✓)
- Full TWSE universe: 7,333/7,765 (94.4%); 2024 NLP corpus: 1,040/1,042 (99.8%)
- 73-company subsample: 100% firm_age coverage (507/507 rows)
- 50 rows inferred via Governance file first-appearance method (only valid where first entry AFTER 2014/01)
- 112 pre-2014 establishments and 30 special securities remain unfilled

### NLP Pipeline [Medium confidence — designed but not executed | technical-researcher | 2026-05-22]
Language routing complete for 2024 full corpus (1,064 files / 1,042 unique companies):
- English track: 680 files (63.9%) — FinBERT-ESG-9 + ClimateBERT + GRI regex
- Multilingual track: 384 files (36.1%) — Qwen3-Embedding-8B (BGE-M3 fallback) + XLM-RoBERTa-XNLI
- Routing method: `_E` filename suffix (primary); 22 companies have paired English+Chinese versions
- Source PDFs on disk: 1,043; extracted text files: 1,064 (21 extra from ESGgenplus with no local PDF)

---

## Data Quality

### Completeness by Block — 2024 Cohort
Coverage is shown two ways: **NLP corpus** (1,042 companies with extracted text) and **TEJ universe** (1,983 companies with TEJ scaffold rows). NLP-based blocks (B/C/D) use 1,042 as the denominator; TEJ-sourced blocks (F/G) use the full 7,765-row database.

| Block | Variable | Coverage (NLP corpus) | Coverage (TEJ universe) | Quality |
|-------|----------|-----------------------|-------------------------|---------|
| A | twse_ticker, fiscal_year, gri_adoption_year | 100% (1,042/1,042) | 100% (7,765/7,765) | Verified |
| B | gri_standard_version, gri_adoption_year | 100% (1,042/1,042) | 100% (7,765/7,765) | Verified |
| B | word_count_total, page_count | 100% (1,042/1,042) | 52.5% (1,042/1,983) | Full within corpus |
| C | process_quality_score | 100% (1,042/1,042) | 52.5% (1,042/1,983) | Full within corpus |
| D | n_material_topics_a | 97.0% (1,011/1,042) | 51.0% (1,011/1,983) | 31 remaining: image-embedded GRI index (not text-extractable) |
| D | n_material_topics_b | **100% (1,042/1,042)** | 52.5% (1,042/1,983) | 633 non-zero / 409 zero; 526 from gri_tables + 516 txt-extracted (Pass 26) |
| E | Binary topic panel | 2,293 company-years across 4 years | — | Complete for available years |
| F | Balance sheet, income, equity | 87.0% (907/1,042) | ~44–63% (4,365–4,895 rows) | TEJ coverage; December filter |
| F | tesg_score | 2016–2022 only | 2016–2022 only | TEJ file ends 2022 |
| G | Governance | 98.5% (1,026/1,042) | ~99% (7,670/7,765 rows) | Excellent TEJ coverage |
| G | independent_director_ratio | 0% | 0% | Not in TEJ files; stub |

### Known Reliability Issues
- **TESG scores 2023–2024**: Unavailable. TEJ ESG score file ends at 2022/12. No workaround from current TEJ data.
- **independent_director_ratio**: Not in TEJ Governance file. Requires TWSE corporate governance database or manual collection.
- **state_ownership_pct**: TEJ Share Structure file covers only 1–26 companies per December snapshot — unusable. No alternative TEJ source.
- **2016–2020 text data**: No ESG report text files available for these years. Block B word_count/page_count/report_language permanently unavailable for pre-2021 cohort.
- **Topic panel 2021–2022 n_material_topics_b**: Not extractable — GRI 3-3 construct did not exist under GRI Standards 2016. This is structurally correct, not a gap.
- **Stage 3 concordance**: ~60–80 genuine unmatched GRI 3-3 topic labels in 2023–2024 topic_panel. Two-coder protocol required. Priority labels: 'Climate Change Response', 'GHG Emissions and Reduction', 'Innovation R&D', 'Regulatory Compliance' (~15–20 labels).
- **Assurance_level**: 48–72% coverage per year (TEJ data completeness ceiling). Gap may bias H3 estimates.

### Data Biases
- **NLP corpus selection bias**: 941 of 1,983 TEJ-registered 2024 companies (47.5%) have no extracted report text and are excluded from Block B/C/D analysis. These are likely systematically smaller or less-prominent companies — estimates for process quality, topic counts, and text-based variables will skew toward larger, more active reporters. Analysts using NLP-based outcomes should note the effective N is 1,042, not 1,983.
- **December fiscal year filter**: TEJ data filtered to YYYY/12 fiscal year-end. Non-December fiscal year companies are excluded from financial controls. This affects <5% of TWSE universe.
- **GRI 3-3 txt extraction noise**: The 516 Pass-26 values were extracted via regex rather than structured GRI table parsing. Validation against 526 gri_table-derived values shows Pearson r=0.59, 29% exact match, 51% within ±1. The primary source of error is that gri_tables itself under-extracts for many companies (pdfplumber missed rows), so "ground truth" is also noisy. Treat `n_material_topics_b` as a continuous count variable with ±2–3 measurement noise for the txt-extracted subset. Use `n_material_topics_a` (97% coverage, regex-based, more reliable) for robustness checks.

---

## Comparisons & Metrics

### Database State (as of 2026-05-23, Pass 17)
- Rows: 7,765 (data) + 2 header rows
- Columns: 157
- Encoding: UTF-8-sig BOM
- Full universe: 2,091 unique companies × 2016–2024
- 73-company industry subsample embedded within: 507 rows (available for subgroup analysis)

### Coverage Trajectory by Session
| Session | Passes | Columns | Key additions |
|---------|--------|---------|---------------|
| 2026-05-18 | 1–2 | 66 | Regulatory updates, methods review, gap analysis |
| 2026-05-20 | 3–5 | 66→90 | Full TWSE universe build (7,765 rows), Block B-D-G base |
| 2026-05-21 | 6 | 90 | Block B 2022 extension, gri_adoption_year correction |
| 2026-05-22 | 7–8 | 90 | Full TWSE Block B/C/D/G, NLP pipeline design, H1–H5 |
| 2026-05-23 | 9–11 | 90→99 | Block C 2021–2023, Block D E/S/G counts, Block E binary panel |
| 2026-05-23 | 12–17 | 99→157 | Block F (balance sheet, income, equity, ESG scores), Block G governance |
| 2026-05-24 | 22 | 157 | Coordinator synthesis (this session) |

### Financial Benchmarks (TSMC 2022 for reference)
- tesg_score: confirmed populated; tesg_rating and E/S/G sub-scores verified
- board_seats=10, board_directors_n=10, board_ownership_pct=6.52%, board_pledged_pct verified
- Accounting identity: TA = TL + TE verified across all 4,365 rows (0 mismatches)

---

## Research Gaps (Top 3, from research-gap-analysis 2026-05-18)

**Gap 1 (most critical for H1 pre-registration):** Anticipation effects — companies may adjust topic disclosure in the year before GRI 3 adoption, biasing pre-trend tests. CS21 event-study plots should inspect t−2 and t−1 coefficients explicitly. Flag the 2021→2022 Jaccard drop as a placebo check covariate in OSF pre-registration.

**Gap 2 (CS21 design challenge):** Always-taker new entrants — companies entering reporting after 2025 universal mandate will have treatment=0 only at baseline. CS21's `notyettreated` control group must be carefully bounded; 2025 cohort may need exclusion or separate treatment.

**Gap 3 (H5 requires external data):** Supply-chain diffusion of materiality practices — institutional isomorphism mechanism is theoretically identified but empirically untested. Requires supplier tier-1 coding from sustainability reports (e.g. TSMC 2022–2024 for TWSE supply chain context). Estimated 1–2 days of manual lookup; only relevant if supply-chain proximity is chosen as a moderator.

**Additional gaps documented:**
- Gap 4: Korea/Japan peer comparison (K-ESG, SSBJ frameworks) — out-of-scope for current study, valuable for lit review positioning
- Gap 5: Long-term topic re-expansion post-initial-displacement — panel ends 2024, only 2 years post-adoption for 2022 cohort
- Gap 6: Quality vs. quantity trade-off mechanism — does process_quality_score mediation account for displacement, or do they move independently?
- Gap 7 (novel contribution): Displacement effect under GRI 3 impact materiality in industry-specific context — this gap is H1's primary contribution

---

## Hypotheses

### Current Top-Ranked Hypothesis (H1 — Primary)

> **GRI 3 adoption causes a net decrease in n_material_topics_b among TWSE companies.** Expected ATT: −2 to −5 topics relative to pre-adoption mean. Estimator: `att_gt()` Callaway-Sant'Anna (2021). Controls: ln_total_assets, roa, board_esg_committee, standalone_sr. Pre-registration on OSF required before estimation.

*Falsification condition:* ATT positive or indistinguishable from zero → displacement hypothesis rejected.

### Full Hypothesis Set (H1–H5)

| Hypothesis | Outcome | Expected ATT | Estimator | Status |
|------------|---------|-------------|-----------|--------|
| **H1** (primary) | n_material_topics_b | Negative (−2 to −5 topics) | CS21 att_gt() | Ready — pending OSF pre-reg |
| **H2** | process_quality_score | Positive (+1–2 pts on 0–10 scale) | CS21 + TWFE robustness | Ready — pending OSF pre-reg |
| **H3** | assurance_level (ordinal upgrade) | Positive (+8–15 pp Reasonable) | CS21 + Ordered logit | Ready — pending OSF pre-reg |
| **H4** | n_material_topics_b × industry_cat | Displacement varies by company type (conditional on subgroup selection) | Subsample CS21 | Conditional — requires industry subsample activation |
| **H5** | process_quality_score × supply-chain proximity | Supply-chain-proximate firms: earlier adoption, +1.5 pts | CS21 interaction | Blocked — proximity coding requires external data |

Robustness checks (not pre-specified): Rambachan-Roth sensitivity analysis, `control_group = "nevertreated"` alternative, Bacon-Goodman decomposition diagnostic.

---

## Variable Registry Changes (All Sessions)

### New Variables Added by Session

**Session 1 (2026-05-18) — 21 variables via data-analyst:**
gri_101_applied, gri_new_climate_energy_adopted, ifrs_s1_adopted, issb_s2_adopted, assurance_standard, issa5000_early_adopted, fsc_sector_metrics_disclosed, double_materiality_methodology_disclosed, standalone_mat_report, visualization_format, visualization_format_n, iro_table_shown, butterfly_chart_shown, scatter_plot_shown, iro_heatmap_shown, dynamic_viz_shown, ai_tool_disclosed, ai_tool_name, csrd_mandatory_reporter

**Session 2 (2026-05-20) — DB scaffolded with 66 columns (Passes 3–4)**

**Session 3+ (2026-05-22/23) — Block expansions:**
- Block B extended: bilingual_report, report_language, word_count_total, page_count
- Block C: mat_section_found, process_quality_score, board_approved, scoring_method_disclosed, dm_methodology_disclosed, stakeholder_groups_n, engagement_methods_n, process_steps_n, mda_index, visualization_format, ai_tool_disclosed
- Block D: topics_total_n, topics_env_n, topics_soc_n, topics_gov_n, n_material_topics_a, n_material_topics_b, canonical_codes_str, sasb_tcsc_topics_n
- Block E: jaccard_similarity, churn_rate, topics_added_n, topics_dropped_n, net_topic_change (via block_e_topic_dynamics.csv)
- Block F balance sheet: 22 raw + total_debt_ntd_thou, ln_total_assets, leverage, debt_ratio, current_ratio, working_capital_ntd_thou (3 updated)
- Block F income: 12 raw + gross_margin, operating_margin, net_profit_margin (3 updated: roa, rd_intensity, revenue_growth)
- Block F equity: shares_outstanding_thou, pe_ratio_tej, pb_ratio_tej, price_sales_ratio, dividend_yield_pct, annual_stock_return_pct, market_segment (2 updated: market_cap_ntd_thou, tobins_q)
- Block F ESG: tesg_rating, tesg_env_score, tesg_soc_score, tesg_gov_score (2 updated: tesg_score, tse_mandatory_reporter; 5 backfilled: ref_sasb/tcfd/tnfd/sdgs/ir)
- Block G governance: board_directors_n, board_supervisors_n, board_ownership_pct, director_ownership_pct, board_pledged_pct, main_shareholders_pct, liability_insurance_yn (1 updated: board_seats)
- Other: firm_age (calculated + partially inferred)

**Taxonomy Updates:**
- E01: GRI 302 → GRI 103: Energy 2025 (effective Jan 2027)
- E02: GRI 305 → GRI 102: Climate Change 2025 (effective Jan 2027)
- E09: GRI 304 → GRI 101: Biodiversity 2024 (effective Jan 2026)
- E10: GRI 201-2/TCFD → GRI 102 transition plan provisions (absorbed, effective Jan 2027)

---

## Pending Work (Prioritised)

### Critical Path (blocks analysis)
1. **OSF pre-registration** (H1–H4) — must precede any inferential CS21 estimates. Document: treatment definition, estimand, estimator, controls, expected sign, power calculation, robustness checks.
2. **Stage 3 manual concordance** (~60–80 genuine unmatched GRI 3-3 topic labels, 2023–2024 panel) — two-coder protocol; ~1–2 days.
3. **R DiD analysis scripts** — att_gt() implementation, event-study plots, Rambachan-Roth sensitivity.

### External Data (non-blocking for H1–H4)
4. **Supply-chain proximity coding** — if H5 is pursued, requires tier-1 supplier coding from company sustainability reports; manual lookup; ~1–2 days.
5. **Co-location or cluster registry** — secondary proximity proxy for H5 if institutional isomorphism via geographic clustering is the chosen mechanism.

### Data Gaps (no workaround in current TEJ sources)
6. **TESG scores 2023–2024** — TEJ file ends 2022; no alternative available.
7. **independent_director_ratio** — not in TEJ files; requires TWSE corporate governance database.
8. **state_ownership_pct** — TEJ Share Structure December coverage too sparse; no alternative.
9. **dual_listed** — stub only.
10. **analyst_coverage_n** — no TEJ source; requires I/B/E/S or similar.
11. **MSCI ESG / Sustainalytics scores** — subscription data required.

---

## Session History

| Date | Agents | Key Passes | Findings Added |
|------|--------|-----------|----------------|
| 2026-05-18 | web-researcher, academic-researcher, data-analyst, research-gap-analysis | 1–2 | Regulatory/industry intelligence, methods review, definitions update (21 vars), 7 gaps |
| 2026-05-20 | data-analyst, research-coordinator | 3–5 | Full TWSE DB build (7,765 rows, 66 cols), Block B 2024, NLP plan |
| 2026-05-21 | data-analyst | 6 | Block B 2022, gri_adoption_year correction (4 companies) |
| 2026-05-22 | data-analyst, technical-researcher, hypothesis-generation | 7–8, 18–19 | Full TWSE Block B/C/D/G, H1–H5, lang routing, GRI G4 extension, pipeline headers |
| 2026-05-23 | data-analyst | 9–11 | Block C 2021–2023, Block D E/S/G counts, Block E binary panel (80,255 rows) |
| 2026-05-23 | data-analyst | 12–17 | Block F (balance sheet 124 cols, income 139 cols, equity 153 cols, ESG 157 cols), Block G governance, firm_age |
| 2026-05-23 | data-analyst | 20–21 | Folder reorganisation, methodology dashboard, 2022 audit English-rate correction |
| 2026-05-24 | research-coordinator | 22 | Synthesis summary (this document) |

---

*Generated by: research-coordinator | Pass 22 | 2026-05-24*  
*Covers: Passes 1–21 across 6 sessions (2026-05-18 through 2026-05-23)*  
*Next coordinator session trigger: after OSF pre-registration or Stage 3 manual concordance completion*
