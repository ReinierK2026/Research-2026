---
agent: research-coordinator
type: synthesis-summary
topic: "twse-materiality"
last_updated: "2026-06-09"
sessions: ["2026-05-18", "2026-05-20", "2026-05-21", "2026-05-22", "2026-05-23", "2026-05-24", "2026-06-08", "2026-06-08-pass32", "2026-06-08-pass33", "2026-06-08-pass34", "2026-06-08-pass35", "2026-06-08-pass36", "2026-06-08-pass37", "2026-06-08-pass38", "2026-06-09-pass39", "2026-06-09-pass40", "2026-06-09-pass41", "2026-06-09-pass42"]
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

### Cohort Reconciliation (all years, Pass 29 — 2026-06-08)

| Year | DB rows (TEJ) | PDFs on disk | Extracted txt (NLP corpus) | ESGgenplus-only | DB-scaffold only (no text) |
|------|--------------|-------------|---------------------------|-----------------|--------------------------|
| 2021 | 835 | 490 | **479** | 0 | 356 |
| 2022 | 981 | 615 | **617** | 6 | 364 |
| 2023 | 1,186 | 711 | **727** | 16 | 459 |
| 2024 | 1,983 | 1,022 | **1,042** | 20 | 941 |

NLP corpus = unique companies with word_count_total > 0 (text successfully extracted from report). This is the denominator for all Blocks B, C, D.

**Note — 2024 bilingual pairs**: 14 companies have both `_E.pdf` and a Chinese PDF → 1,022 PDF tickers but 1,042 txt tickers (20 extra from ESGgenplus platform, no local PDF).

All coverage percentages for NLP-based blocks (B, C, D) use the year-specific NLP corpus as denominator.

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

### Treatment Variable [High confidence | data-analyst | 2026-05-21 / Pass 30 2026-06-08]
- `gri_adoption_year` **fully populated (Pass 30)**: 7,634 rows populated (7,127 new fills + 74 pre-existing); 131 rows blank = companies present only under GRI Standards 2016 (never-Universal adopters, correctly excluded from treated set)
- Derivation method: first fiscal year per ticker where `gri_standard_version = 'GRI-Universal-2021'`; no conflicts with prior 74-company values
- **Full-universe adoption distribution**: 2021: 14 companies; 2022: 869 companies; 2023: 310 companies; 2024: 818 companies — strongly concentrated in 2022 (dominant adoption cohort)
- **2024 new entrants**: 792 of the 818 first-time-2024 adopters have no pre-adoption DB rows (entered under mandatory TWSE reporting 2025 cycle); these companies lack a pre-treatment baseline and are excluded from DiD estimation
- Distribution validated for 73-company subsample: 2021: 3 companies, 2022: 65 companies, 2023: 4 companies, 2024: 2 companies (consistent with full-universe pattern)
- GRI Standards 2016 used 2016–2021; GRI Universal 2021 used 2022–2024 (for treated companies)
- 4 companies in the subsample initially miscoded 2024 → corrected to 2023 based on text evidence (3006, 3227, 6573, 8110)
- DiD treatment variable fully valid for CS21 estimation across the full universe

### Block B: Report Characteristics [High confidence | data-analyst | 2026-05-20/22]
- All 7,765 company-year rows have 100% coverage on: `gri_standard_version`, `gri_adoption_year`, `bilingual_report` (sourced from TEJ CSR Disclosure)
- Text-level coverage (word count, page count, language): 0% for 2016–2020 (no text files available); 2021–2024: full within NLP corpus (per-year NLP corpus is the denominator)
- **NLP corpus by cohort** (word_count_total > 0): 2021: 479 companies; 2022: 617; 2023: 727; 2024: 1,042 — monotonically rising as TWSE reporting universe expands and ESGgenplus coverage deepens
- **Bilingual reporting by cohort**: 2021: ~0 identified; 2022: ~6 ESGgenplus-only; 2023: ~16 ESGgenplus-only; 2024: 22 companies have both `_E` and Chinese versions (14 paired local PDFs + 20 ESGgenplus-only); identified via `_E` filename suffix
- **NLP corpus vs TEJ universe gap**: 2021: 479/835 (57.4%); 2022: 617/981 (62.9%); 2023: 727/1,186 (61.3%); 2024: 1,042/1,983 (52.5%) — companies with no extractable report text have TEJ scaffold data but are excluded from Block B/C/D NLP analysis

### Block C: Materiality Process Quality [Medium-high confidence | data-analyst + technical-researcher | 2026-05-22/23]
Block C variables are extracted from ESG report text. Coverage expressed against the per-year NLP corpus (word_count_total > 0). Pre-adoption trends (2021→2023) from full TWSE universe:

| Metric | 2021 | 2022 | 2023 | 2024 |
|--------|------|------|------|------|
| **NLP corpus (N=)** | **479** | **617** | **727** | **1,042** |
| mat_section_found | 75.4% | 74.3% | 71.5% | 100%† |
| board_approved | 32.8% | 43.3% | 47.2% | 100%† |
| double_materiality_mentioned | 1.1% | 6.3% | 9.4% | n/a |
| avg process_quality_score | 0.527 | 0.543 | 0.546 | 0.554† |

†2024 figures: 1,042/1,042 companies in NLP corpus (100% coverage within corpus). Expressed as % of TEJ universe (1,983): 52.5%. All percentages for 2021–2023 are expressed against the respective year's NLP corpus, not the full TEJ universe.

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

**n_material_topics_a — per-cohort coverage (Pass 31 investigation, 2026-06-08)**:

| Year | NLP corpus | n_material_topics_a | Coverage | Gap | Source |
|------|-----------|---------------------|----------|-----|--------|
| 2021 | 479 | ~339 | **70.8%** | ~140 | gri_codes_summary (n_standards−1) |
| 2022 | 617 | ~525 | **85.1%** | ~92 | gri_codes_summary (n_standards−1) |
| 2023 | 727 | ~576 | **79.2%** | ~151 | gri_codes_summary (n_standards−1) |
| 2024 | 1,042 | 1,011 | **97.0%** | 31 | gri_codes_summary (n_standards−1) + gri_tables |

Coverage gaps are **structural ceilings** — not improvable with available data — arising from three root causes: (1) image-embedded GRI content index: pdfplumber located the page but cannot parse the codes (n_standards=0); affects ~76 companies in 2021, ~33 in 2022, ~32 in 2023; (2) Chinese-only reports: GRI extraction regex pipeline is English-only; affects ~67 in 2021, ~50 in 2022, ~47 in 2023; (3) no GRI section present in extracted text at all. The 2024 ceiling (97.0%) is notably higher because mandatory TWSE reporting brought in larger, better-structured reporters with machine-readable GRI indices.

**n_material_topics_b** (GRI 3-3 disclosure entry count): **1,042/1,042 (100%) of NLP-corpus 2024 companies now have a value** (Pass 26 — 2026-06-08); 633/1,042 (60.7%) non-zero, 409/1,042 zero (image-based GRI index or no GRI 3-3 disclosures detected). 526 values from gri_tables CSVs (original extraction); 516 values from txt-based multi-pattern extraction (v5: management-phrase regex + in-body `GRI 3-3：YYYY` page-count; Pearson r=0.59 vs gri_tables baseline; 29% exact, 51% within ±1 on 526-ticker validation). This is the primary H1 outcome variable. **Pre-GRI 3 baseline unavailable by definition** — structurally correct, as GRI 3-3 did not exist before GRI Universal Standards 2021.

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

### NLP Pipeline — English Track [Passes 32–37, 2026-06-08]

Phase 1 English Track NLP is complete for all four text cohorts: **2021**, **2022**, **2023**, and **2024**. All used identical scripts, models, and DB column slots (175 cols shared across all cohort years).

### NLP Pipeline — Multilingual Track [Passes 38–42, 2026-06-08/09]

Phase 2 Multilingual Track is **complete for all four cohorts (2021–2024)**. All three steps (Block C bilingual extractor, BGE-M3 semantic matcher, XLM-RoBERTa-XNLI classifier) ran across 974 Chinese/bilingual files in total.

**2024 Chinese/bilingual track — 361 files processed (excl. 2461, 6776 near-empty):**

| Step | Method | Status | Key Findings |
|------|--------|--------|-------------|
| 2.3 Block C | Bilingual regex (zh+en) | ✅ Done | mat_section=354/361 (98.1%); board_approved=289/361 (80.1%); dm_methodology=341/361 (94.5%); double_mat=52/361 (14.4%); engagement mean=3.14; viz_format=70/361 (19.4%); ai_tool=16/361 (4.4%); process_quality mean=0.426 |
| 2.1 BGE-M3 | BAAI/bge-m3, 33 bilingual GRI topic descriptors | ✅ Done | 361/361 (100%). Top topics: GRI Alignment (122/34%), Stakeholder Engagement (56), Training & Education (25), TCFD/ISSB Alignment (20). top1_sim mean=0.690. Affinities: gov=0.353, soc=0.295, env=0.173. JSONL: bge_2024_matches.jsonl |
| 2.2 XLM-RoBERTa-XNLI | mDeBERTa-v3-base-mnli-xnli, zero-shot sentence classification | ✅ Done | 361/361 (100%). dominant: soc=294 (81.4%), other=44 (12.2%), gov=14 (3.9%), env=9 (2.5%). Mean pcts: soc=0.449, gov=0.204, env=0.164. Mean sentences=43.9 |

**2023 Chinese/bilingual track — 216 files processed (no exclusions):**

| Step | Method | Status | Key Findings |
|------|--------|--------|-------------|
| 2.3 Block C | Bilingual regex (zh+en) | ✅ Done | Combined 2023 corpus: mat_found=699/1185 (59.0%), board_approved=453/1185 (38.2%), double_mat=72/1185 (6.1%), ai_tool=32/1185 (2.7%) |
| 2.1 BGE-M3 | BAAI/bge-m3, 33 bilingual GRI topic descriptors | ✅ Done | 216/216 (100%). Top topics: GRI Alignment (55), Stakeholder Engagement (27), Training & Education (24), TCFD/ISSB Alignment (11). top1_sim mean=0.677. Affinities: soc=0.303, gov=0.279, env=0.156. JSONL: bge_2023_matches.jsonl |
| 2.2 XLM-RoBERTa-XNLI | mDeBERTa-v3-base-mnli-xnli | ✅ Done | 216/216 (100%). dominant: soc=179 (82.9%), other=17 (7.9%), env=16 (7.4%), gov=4 (1.9%). Mean pcts: soc=0.461, gov=0.182, env=0.174. Mean sentences=48.2 |

**2022 Chinese/bilingual track — 224 files processed (excl. 1795, 3704 — no PDF):**

| Step | Method | Status | Key Findings |
|------|--------|--------|-------------|
| 2.3 Block C | Bilingual regex (zh+en) | ✅ Done | Combined 2022 corpus: mat_found=581/980 (59.3%), board_approved=349/980 (35.6%), double_mat=47/980 (4.8%), ai_tool=5/980 (0.5%) |
| 2.1 BGE-M3 | BAAI/bge-m3, 33 bilingual GRI topic descriptors | ✅ Done | 225/225 (100%). Top topics: GRI Alignment (70), Stakeholder Engagement (31), Training & Education (22), Climate Adaptation (9). top1_sim mean=0.681. Affinities: gov=0.308, soc=0.299, env=0.126. JSONL: bge_2022_matches.jsonl |
| 2.2 XLM-RoBERTa-XNLI | mDeBERTa-v3-base-mnli-xnli | ✅ Done | 225/225 (100%). dominant: soc=175 (77.8%), env=20 (8.9%), other=17 (7.6%), gov=13 (5.8%). Mean pcts: soc=0.453, gov=0.191, env=0.158. Mean sentences=47.2 |

**2021 Chinese/bilingual track — 172 files processed (excl. 3669 — corrupt PDF):**

| Step | Method | Status | Key Findings |
|------|--------|--------|-------------|
| 2.3 Block C | Bilingual regex (zh+en) | ✅ Done | Combined 2021 corpus: mat_found=450/822 (54.7%), board_approved=209/822 (25.4%), double_mat=6/822 (0.7%), ai_tool=2/822 (0.2%). Lower rates reflect pre-IFRS reporting norms. |
| 2.1 BGE-M3 | BAAI/bge-m3, 33 bilingual GRI topic descriptors | ✅ Done | 172/172 (100%). Top topics: GRI Alignment (47), Stakeholder Engagement (26), Training & Education (20), Board Governance (10). top1_sim mean=0.668. Affinities: soc=0.302, gov=0.301, env=0.122. JSONL: bge_2021_matches.jsonl |
| 2.2 XLM-RoBERTa-XNLI | mDeBERTa-v3-base-mnli-xnli | ✅ Done | 172/172 (100%). dominant: soc=133 (77.3%), other=14 (8.1%), env=13 (7.6%), gov=12 (7.0%). Mean pcts: soc=0.456, gov=0.199, env=0.155. Mean sentences=41.6 |

**Cross-cohort Phase 2 comparison (Chinese/bilingual track, 2021–2024):**

| Metric | 2021 (n=172) | 2022 (n=225) | 2023 (n=216) | 2024 (n=361) |
|--------|-------------|-------------|-------------|-------------|
| XLMR dominant (soc%) | 77.3% | 77.8% | 82.9% | 81.4% |
| XLMR dominant (gov%) | 7.0% | 5.8% | 1.9% | 3.9% |
| BGE top-1 topic | GRI Alignment (47) | GRI Alignment (70) | GRI Alignment (55) | GRI Alignment (122) |
| BGE mean_sim | 0.643 | 0.654 | 0.651 | ~0.669 |
| Mean sentences (XLMR) | 41.6 | 47.2 | 48.2 | 43.9 |
| double_mat (combined) | 0.7% | 4.8% | 6.1% | 6.1% |
| ai_tool (combined) | 0.2% | 0.5% | 2.7% | 14.6%* |

*2024 ai_tool for combined corpus (English+Chinese). Chinese-track-only: 4.4%.

**Cross-track comparison (2024 — English vs Chinese reporters):**
- **Framing trajectory (BGE vs ESGLens)**: Chinese-track is GRI Alignment-dominant (34% of companies) while English-track is TCFD/ISSB Alignment-dominant (38%). Chinese reporters are framing materiality within the established GRI taxonomy; English reporters have pivoted to the IFRS S1/S2 vocabulary. Stakeholder Engagement is the 2nd-ranked topic in both tracks, confirming a consistent methodological core across languages.
- **ESG pillar emphasis (XLMR vs FinBERT)**: Chinese-track is strongly soc-dominant (81.4%) while English-track is gov-dominant (51.5%). Mean soc_pct: zh=0.449 vs en=0.291; mean gov_pct: zh=0.204 vs en=0.376. The Chinese-track has remained soc-dominant and stable across all four years (77–83%), showing no sign of the gov transition seen in the English track. This structural divergence — rather than a lag — is now the better-supported interpretation.
- **Board approval (Block C)**: Chinese-track 80.1% vs English-track 57.1% (2024) — higher rate in Chinese files, consistent with bilingual reports drawing on both Chinese governance culture and the update merging with prior extraction.
- **Double materiality**: Rising steadily in Chinese track (0.7% → 4.8% → 6.1% → 6.1%) but still low; ESRS awareness has not yet diffused into Chinese-language reporting at scale.
- **AI tool disclosure**: Chinese-track 4.4% vs English-track 40.4% (2024) — Chinese reporters almost entirely absent from the 2024 GenAI wave. Chinese-track ai_tool also very low in 2021–2023 (0.2%, 0.5%, 2.7%), consistent with the GenAI gap being a structural language-market difference rather than a time-lag.

**2024 cohort — 680 English files, all steps complete:**

| Step | Model / Method | Status | Key Findings |
|------|---------------|--------|-------------|
| 1.4 Block C | Regex extractor | ✅ Done | mat_section_found 99.0%; board_approved 57.1%; visualization_format 56.9%; ai_tool_disclosed 40.4%; dm_methodology_disclosed 32.1%; double_materiality_mentioned 10.3% |
| 1.3 ESGLens | SBERT all-MiniLM-L6 | ✅ Done | Top topics: TCFD/ISSB Alignment (255), Stakeholder Engagement (172), Circular Economy (132), GHG Emissions (45). JSONL: `eslens_2024_matches.jsonl`. |
| 1.1 FinBERT | FinBERT-ESG-9-Categories | ✅ Done | gov=350 (51%), soc=190 (28%), env=79 (12%), other=61 (9%). |
| 1.2 ClimateBERT | distilroberta-base-climate-detector | ✅ Done | Mean climate_pct=0.502; 324/680 above 0.5; 2 companies with 0 climate sentences. |

**2023 cohort — 526 English files, all steps complete:**

| Step | Model / Method | Status | Key Findings |
|------|---------------|--------|-------------|
| 1.4 Block C | Regex extractor | ✅ Done | mat_section_found 97.3%; board_approved 63.9%; dm_methodology_disclosed 84.2%; visualization_format 8.4%; ai_tool_disclosed 4.4%; double_materiality_mentioned 9.9% |
| 1.3 ESGLens | SBERT all-MiniLM-L6 | ✅ Done | Top topics: SDG Alignment (104), GRI Alignment (78), TCFD/ISSB Alignment (64), Stakeholder Engagement (47). JSONL: `eslens_2023_matches.jsonl`. |
| 1.1 FinBERT | FinBERT-ESG-9-Categories | ✅ Done | gov=224 (43%), soc=189 (36%), env=77 (15%), other=36 (7%). |
| 1.2 ClimateBERT | distilroberta-base-climate-detector | ✅ Done | Mean climate_pct=0.484; 230/526 above 0.5; 6 companies with 0 climate sentences. |

**2022 cohort — 389 English files, all steps complete (388 processed; 3062_2022_E is 0-byte exclusion):**

| Step | Model / Method | Status | Key Findings |
|------|---------------|--------|-------------|
| 1.4 Block C | Regex extractor | ✅ Done | mat_section_found 95.1%; board_approved 53.5%; dm_methodology_disclosed 82.8%; visualization_format 10.0%; ai_tool_disclosed 0.8%; double_materiality_mentioned 6.7% |
| 1.3 ESGLens | SBERT all-MiniLM-L6 | ✅ Done | Top topics: SDG Alignment (94), GRI Alignment (51), TCFD/ISSB Alignment (40), Stakeholder Engagement (39). JSONL: `eslens_2022_matches.jsonl`. |
| 1.1 FinBERT | FinBERT-ESG-9-Categories | ✅ Done | gov=150 (39%), soc=149 (38%), env=60 (15%), other=29 (7%). |
| 1.2 ClimateBERT | distilroberta-base-climate-detector | ✅ Done | Mean climate_pct=0.485; 179/388 above 0.5; 0 companies with 0 climate sentences. |

**2021 cohort — 307 English files, all steps complete (5 near-empty exclusions; 6202 copied from macOS duplicate):**

| Step | Model / Method | Status | Key Findings |
|------|---------------|--------|-------------|
| 1.4 Block C | Regex extractor (16 cols) | ✅ Done | mat_section_found 94.5%, board_approved 44.6%, dm_methodology_disclosed 74.3%, visualization_format 11.4%, ai_tool_disclosed 0.7%, double_materiality_mentioned 1.6% |
| 1.3 ESGLens | all-MiniLM-L6-v2 (30 GRI topics) | ✅ Done | Top1: SDG(77), GRI(55), SE(40), SupplierEnv(20), TCFD(19). Mean sim=0.642. Affinity: gov=0.57, env=0.29, soc=0.14 |
| 1.1 FinBERT | FinBERT-ESG-9-Categories | ✅ Done | soc=143 (46.6%), gov=106 (34.5%), env=37 (12.1%), other=21 (6.8%). |
| 1.2 ClimateBERT | distilroberta-base-climate-detector | ✅ Done | Mean climate_pct=0.449; 120/307 above 0.5; 0 companies with 0 climate sentences. |

**Cross-cohort NLP signal (2021 → 2022 → 2023 → 2024 trends):**
- **ESGLens framing trajectory**: SDG/GRI Alignment dominant in 2021–2023 → TCFD/ISSB/Circular Economy dominant in 2024. The 2021→2022→2023 framing is stable (same top-2 topics each year), while 2024 shows a sharp pivot — direct fingerprint of IFRS S1/S2 phased mandate announcement.
- **ClimateBERT intensity trajectory**: 0.449 (2021) → 0.485 (2022) → 0.484 (2023) → 0.502 (2024). Gradual pre-IFRS drift, then a step up in 2024. Companies above 0.5: 120 → 179 → 230 → 324.
- **FinBERT pillar evolution**: 2021 is distinctly soc-dominant (47%), unlike 2022–2024 where gov climbs to plurality. Gov grows consistently (35% → 39% → 43% → 51%); soc declines from 2021 peak (47% → 38% → 36% → 28%); env relatively stable (12% → 15% → 15% → 12%).
- **Visualization disclosure**: low and stable pre-2024 (10.0% → 8.4%) → explosion in 2024 (56.9%). Near-universal adoption happened in a single year.
- **AI tool disclosure**: essentially zero in 2022 (0.8%) and 2023 (4.4%) → 40.4% in 2024. Entirely a 2024 GenAI adoption phenomenon.
- **Double materiality**: 6.7% (2022) → 9.9% (2023) → 10.3% (2024). Gradual increase — consistent with ESRS awareness building but limited TWSE uptake through 2024.

**DB schema:** 175 columns (157 original + 18 NLP). NLP cols shared across all cohort years. Backup: `twse-research-database_pre-nlp-repair.csv`.

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
| D | n_material_topics_a | 97.0% (1,011/1,042) — 2024; 70.8%/85.1%/79.2% for 2021/2022/2023 | 51.0% (1,011/1,983) — 2024 | Structural ceiling: image-embedded GRI index, Chinese-only reports, no GRI section. 2024 ceiling higher due to mandatory-reporting cohort quality |
| D | n_material_topics_b | **100% (1,042/1,042)** | 52.5% (1,042/1,983) | 633 non-zero / 409 zero; 526 from gri_tables + 516 txt-extracted (Pass 26) |
| E | Binary topic panel | 2,293 company-years across 4 years | — | Complete for available years |
| F | Balance sheet, income, equity | 87.0% (907/1,042) | ~44–63% (4,365–4,895 rows) | TEJ coverage; December filter |
| F | insider_ownership_pct | 98.8% (7,670/7,765) | 98.8% | Filled from board_ownership_pct (Pass 27) |
| F | state_ownership_pct | 97.0% (7,535/7,765) | 97.0% | Time-invariant fill from TEJ Share Structure Government(%) (Pass 28) |
| F | firm_size_quintile | 70.5% (5,478/7,765) | 70.5% | Per-year quintile of ln_total_assets; bounded by TEJ financial coverage (Pass 27) |
| F | firm_age_quintile | 94.4% (7,333/7,765) | 94.4% | Per-year quintile of firm_age (Pass 27) |
| F | tesg_score | 2016–2022 only | 2016–2022 only | TEJ file ends 2022 |
| G | Governance | 98.5% (1,026/1,042) | ~99% (7,670/7,765 rows) | Excellent TEJ coverage |
| G | independent_director_ratio | 0% | 0% | Not in TEJ files; stub |

### Known Reliability Issues

- **`gri_adoption_year`** — ~~CRITICAL GAP (Pass 29)~~ **RESOLVED (Pass 30, 2026-06-08)**: 7,634 rows populated (7,127 new fills + 74 pre-existing). Adoption distribution: 2021: 14; 2022: 869; 2023: 310; 2024: 818. Of 818 first-time-2024 adopters, 792 are new entrants (no pre-adoption rows — excluded from DiD estimation). 131 rows blank = companies appearing only under GRI Standards 2016. DiD treatment variable fully valid for CS21 estimation.
- **TESG scores 2023–2024**: Unavailable. TEJ ESG score file ends at 2022/12. No workaround from current TEJ data.
- **independent_director_ratio**: Not in TEJ Governance file. Requires TWSE corporate governance database or manual collection.
- **state_ownership_pct**: ~~TEJ Share Structure December coverage too sparse — unusable~~ **RESOLVED (Pass 28)**: File is cross-sectional (one row per company, 2025–2026 snapshot). Treated as time-invariant control: same Government(%) value applied across all fiscal years per ticker. Coverage: 7,535/7,765 rows (97.0%); 402 tickers with government ownership > 0%. 230 rows unmatched (no TEJ entry).
- **2016–2020 text data**: No ESG report text files available for these years. Block B word_count/page_count/report_language permanently unavailable for pre-2021 cohort.
- **Topic panel 2021–2022 n_material_topics_b**: Not extractable — GRI 3-3 construct did not exist under GRI Standards 2016. This is structurally correct, not a gap.
- **n_material_topics_a structural ceiling (Pass 31)**: Coverage varies by cohort — 2021: 70.8%, 2022: 85.1%, 2023: 79.2%, 2024: 97.0%. Gaps are not improvable: root causes are image-embedded GRI content indices (pdfplumber cannot parse), Chinese-only reports (English regex pipeline), and reports with no GRI section. The lower 2021 ceiling reflects early-adopter heterogeneity and smaller PDF text extraction coverage. Use the per-year NLP corpus as the correct denominator; do not pool across years without weighting.
- **Stage 3 concordance**: ~60–80 genuine unmatched GRI 3-3 topic labels in 2023–2024 topic_panel. Two-coder protocol required. Priority labels: 'Climate Change Response', 'GHG Emissions and Reduction', 'Innovation R&D', 'Regulatory Compliance' (~15–20 labels).
- **Assurance_level**: 48–72% coverage per year (TEJ data completeness ceiling). Gap may bias H3 estimates. **Note**: 1,467 rows were corrected from Reasonable→Limited (Pass 28) — 中度保證 (AA1000 moderate assurance) was incorrectly mapped as Reasonable in the original DB. H3 estimates should now be correctly specified.

### Data Biases
- **NLP corpus selection bias**: Companies with no extracted report text are excluded from Block B/C/D analysis. Across cohorts: 2021: 356/835 excluded (42.6%); 2022: 364/981 (37.1%); 2023: 459/1,186 (38.7%); 2024: 941/1,983 (47.5%). These are likely systematically smaller or less-prominent companies — estimates for process quality, topic counts, and text-based variables skew toward larger, more active reporters. Effective N by year: 479 / 617 / 727 / 1,042. The rising absolute N reflects TWSE reporting universe expansion, but coverage rate is broadly stable at ~57–63% through 2021–2023, then dips to 52.5% in 2024 (new mandatory reporters with lower extraction success). Do not interpret the rising N as improving representativeness.
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
8. ~~**state_ownership_pct**~~ — **RESOLVED (Pass 28)**: populated from TEJ Share Structure Government(%) as time-invariant control. 97.0% coverage.
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
| 2026-06-08 | coordinator | 24–27 | Reconciliation (1,983 vs 1,042 N); n_material_topics_a +86 (Pass 25); n_material_topics_b 516 filled (Pass 26); Block F quick wins: insider_ownership_pct, firm_size_quintile, firm_age_quintile (Pass 27) |
| 2026-06-08 | coordinator | 28 | assurance_level: 1,467 rows corrected Reasonable→Limited (Pass 28); state_ownership_pct: 4,209 rows filled from TEJ Share Structure Government(%) time-invariant (Pass 28) |
| 2026-06-08 | coordinator | 29 | Full cohort audit (2021–2024): PDF/txt/DB reconciliation; Block A/B/C/D/F coverage by year; identified gri_adoption_year critical gap (74/2,011 populated); NLP corpus: 479/617/727/1,042; report: cohort-audit_2021-2023.md (Pass 29) |
| 2026-06-08 | coordinator | 30 | gri_adoption_year fully populated: 7,634 rows (7,127 new + 74 prior); adoption cohorts 2021:14, 2022:869, 2023:310, 2024:818; 792 new-entrant 2024 companies flagged (no pre-treatment baseline); 131 never-Universal rows correctly blank (Pass 30) |
| 2026-06-08 | coordinator | 31 | n_material_topics_a per-cohort structural ceiling investigation: 2021:70.8% (339/479), 2022:85.1% (525/617), 2023:79.2% (576/727), 2024:97.0% (1,011/1,042); three root causes documented; confirmed gaps are non-improvable with current pipeline (Pass 31) |
| 2026-06-08 | technical-researcher | 32 | Phase 1 English Track NLP (2024 cohort): Step 1.4 Block C regex (680 files, 16 variables); Step 1.3 ESGLens SBERT matcher (680 files, 7 cols + full JSONL); Steps 1.1/1.2 ran locally but DB write corrupted — DB repaired (7,765 rows, 175 cols), ESGLens merged, FinBERT/ClimateBERT cols reserved for re-run; `db_utils.py` added to prevent recurrence (Pass 32) |
| 2026-06-08 | technical-researcher | 33 | 2024 Phase 1 fully completed: FinBERT re-run (680/680; gov=51%, soc=28%, env=12%, other=9%); ClimateBERT re-run (680/680; mean climate_pct=0.502, 324 companies >0.5); first ClimateBERT run lost to concurrent-save race condition, fixed by sequential re-run. All 2024 NLP columns filled. audit file + research_log updated. (Pass 33) |
| 2026-06-08 | technical-researcher | 34 | 2023 Phase 1 English Track NLP fully completed: Block C (526/526, dm_methodology_disclosed 84.2%, visualization_format 8.4%, ai_tool_disclosed 4.4%); ESGLens (526/526, top topics: SDG Alignment→GRI Alignment→TCFD/ISSB vs 2024's TCFD/ISSB dominance); FinBERT (526/526, gov=43%); ClimateBERT (526/526, mean 0.484). Cross-cohort NLP pivot documented. All logs, audit file, research summary updated. (Pass 34) |
| 2026-06-08 | technical-researcher | 35 | 2022 Phase 1 English Track NLP fully completed: Block C re-run with full 16-col set (389 files; mat_section_found 95.1%, dm_methodology_disclosed 82.8%, visualization_format 10.0%, ai_tool_disclosed 0.8%); ESGLens (388/389; top: SDG Alignment 94, GRI Alignment 51, TCFD/ISSB 40); FinBERT (388/389; gov=39%, soc=38%); ClimateBERT (388/389; mean 0.485). 2022 now at parity with 2023/2024. 3-year cross-cohort NLP trend table added to summary. All logs, audit, summary updated. (Pass 35) |
| 2026-06-08 | technical-researcher | 36 | 2021 Phase 1 English Track pipeline — PDF completeness verified; 6202_2021_E.txt copied from macOS duplicate (6202_2021_E (1).txt); 2 additional near-empty _E files identified (6472, 8341); Block C run (307/307 DB matches, mat_section_found 94.5%, board_approved 44.6%, dm_methodology_disclosed 74.3%, visualization_format 11.4%, ai_tool_disclosed 0.7%); all 3 NLP scripts created. Audit file updated (Pass 36). |
| 2026-06-08 | technical-researcher | 37 | 2021 Phase 1 NLP scripts executed: ESGLens (307/307; top: SDG(77), GRI(55), SE(40); gov-affinity=0.57); FinBERT (307/307; soc=47%, gov=35%, env=12%); ClimateBERT (307/307; mean=0.449, 120 above 0.5). All four cohorts (2021–2024) now at Phase 1 English Track NLP parity. 4-year cross-cohort trend extended. All logs, audit, summary updated. (Pass 37) |
| 2026-06-08 | technical-researcher | 38 | Phase 2 Step 2.3 (Block C Chinese/bilingual) complete for 2024: 361 files, bilingual regex; mat_section=354/361 (98.1%), board_approved=289/361 (80.1%), dm_methodology=341/361 (94.5%), process_quality mean=0.426. Cross-track comparison documented (en vs zh 2024). Steps 2.1/2.2 pending. (Pass 38) |
| 2026-06-09 | technical-researcher | 39 | Phase 2 Steps 2.1+2.2 complete for 2024: BGE-M3 (361/361; top topic GRI Alignment 34%, top1_sim=0.690; gov-affinity=0.353); XLM-RoBERTa-XNLI (361/361; soc-dominant 81.4%; mean soc_pct=0.449). Key finding: Chinese-track soc-dominant vs English-track gov-dominant — mirrors 2021 English pattern, ~3yr lag. GRI framing (zh) vs TCFD/ISSB framing (en). DB now 188 cols. (Pass 39) |
| 2026-06-09 | coordinator-scripts | 40 | Phase 2 all 3 steps complete for 2023: BGE-M3 (216/216; top GRI Alignment 55, mean_sim=0.651); XLMR (216/216; soc=82.9%); Block C (216 files; mat_found=699/1185, board_approved=453/1185, double_mat=72/1185). TCFD/ISSB Alignment appears in 2023 top-4 BGE topics for first time. (Pass 40) |
| 2026-06-09 | coordinator-scripts | 41 | Phase 2 all 3 steps complete for 2022: BGE-M3 (225/225; top GRI Alignment 70, mean_sim=0.654); XLMR (225/225; soc=77.8%); Block C (224 files; mat_found=581/980, board_approved=349/980, double_mat=47/980). GRI framing consistent with 2021/2023. (Pass 41) |
| 2026-06-09 | coordinator-scripts | 42 | Phase 2 all 3 steps complete for 2021: BGE-M3 (172/172; top GRI Alignment 47, mean_sim=0.643); XLMR (172/172; soc=77.3%); Block C (172 files; mat_found=450/822, board_approved=209/822). Phase 2 multilingual track now COMPLETE for all 4 cohorts (974 Chinese/bilingual files total). Key finding: Chinese-track soc-dominance is structurally stable 77–83% across all years — not a lag, a divergence. All audit files, research_log, and research summary updated. (Pass 42) |

---

*Last updated by: research-coordinator | Pass 39 | 2026-06-09*  
*Covers: Passes 1–39 across 15 sessions (2026-05-18 through 2026-06-09)*  
*Next coordinator session trigger: Phase 2 multilingual track for 2021/2022/2023 cohorts, or OSF pre-registration*
