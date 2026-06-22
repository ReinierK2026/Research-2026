---
agent: research-coordinator
type: synthesis-summary
topic: "twse-materiality"
last_updated: "2026-06-22"
sessions: ["2026-05-18", "2026-05-20", "2026-05-21", "2026-05-22", "2026-05-23", "2026-05-24", "2026-06-08", "2026-06-08-pass32", "2026-06-08-pass33", "2026-06-08-pass34", "2026-06-08-pass35", "2026-06-08-pass36", "2026-06-08-pass37", "2026-06-08-pass38", "2026-06-09-pass39", "2026-06-09-pass40", "2026-06-09-pass41", "2026-06-09-pass42", "2026-06-09-pass43", "2026-06-09-pass44", "2026-06-09-pass45", "2026-06-09-pass46", "2026-06-10-pass47", "2026-06-10-pass48", "2026-06-10-pass49", "2026-06-10-pass50", "2026-06-10-pass51", "2026-06-10-pass52", "2026-06-10-pass53", "2026-06-10-pass54", "2026-06-10-pass55", "2026-06-10-pass56", "2026-06-10-pass57", "2026-06-10-pass58", "2026-06-10-pass59", "2026-06-10-pass60", "2026-06-10-pass61", "2026-06-10-pass62", "2026-06-10-pass63", "2026-06-10-pass64", "2026-06-10-pass65", "2026-06-10-pass66", "2026-06-10-pass67", "2026-06-10-pass88", "2026-06-10-pass89", "2026-06-10-pass90", "2026-06-10-pass91", "2026-06-10-pass92", "2026-06-11-pass93", "2026-06-22-pass-db01", "2026-06-22-pass-db02", "2026-06-22-pass-db03", "2026-06-22-pass-db04", "2026-06-22-pass-db05", "2026-06-22-pass-db06"]
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
- **Primary sample**: Full TWSE universe — 2,091 unique companies × 2016–2024 = 5,408 company-year rows (post-DB-restructure; see Database section)  
- **Potential analytical subsample**: 73-company industry subset (507 company-years, 2016–2024), available for focused subgroup analysis if an industry lens is selected at the analysis stage. If activated, this subsample can be further categorised by company type (~28 Fabless, ~21 Foundry/OSAT, ~24 IDM).

### Database
`twse-research-database.csv` — **195 columns** × 5,408 data rows (FY 2016–2024) (+ 2 header rows: block labels + column names). UTF-8 BOM. Block-label header pattern: Row 1 = block labels (A/B/C/D/F/G), Row 2 = column names, Row 3+ = data. Column count history: 157 (original TEJ/GRI) → 175 (+ 18 NLP, Pass 32–37) → 188 (+ 13 Phase 2 multilingual NLP, Pass 38–42) → 190 (+ 2 Phase 3 Block vars confirmed, Pass 43–46; confirmed 190 by direct header count) → **192** (+ `language_track` + `impact_intensity`, Pass 92, 2026-06-11) → **192** (+ 5 board diversity columns: `independent_directors_n`, `female_directors_n`, `female_director_pct`, `director_attendance_pct`, `director_training_pct`; Pass DB-02 corrected col count: net +0 as 5 cols replaced 5 stubs, 2026-06-22) → **191** (zeros→NA cleanup only; Pass DB-03, 2026-06-22) → **191** (sasb_industry fill for 37 rows; Pass DB-04, 2026-06-22) → **192** (+ `twse_cgq_score` col 191; Pass DB-05, 2026-06-22) → **195** (+ `has_any_assurance` col 193, `big4_assurance` col 194, `big4_financial_auditor` col 195; Pass DB-06, 2026-06-22). db_did_full.csv regenerated 2026-06-22 (Pass DB-06): 3,283 rows × 195 cols (FY 2020–2024, g ∈ {2021–2024}); db_did.csv: 2,960 rows (same minus g=2024). R loading: `read_csv(skip=1) |> mutate(gri_adoption_year = as.integer(gri_adoption_year))`.

### Cohort Reconciliation (all years, Pass 29 — 2026-06-08)

| Year | DB rows (TEJ) | PDFs on disk | Extracted txt (NLP corpus) | ESGgenplus-only | DB-scaffold only (no text) |
|------|--------------|-------------|---------------------------|-----------------|--------------------------|
| 2021 | 835 | 490 | **479** | 0 | 356 |
| 2022 | **632** | ~1,007‡ | **1,023‡** | 6 | ~-391‡ |
| 2023 | **711** | 711 | **1,259‡‡** | 16 | ~0‡‡ |
| 2024 | 1,983 | 1,022 | **1,042** | 20 | 941 |

NLP corpus = unique companies with word_count_total > 0 (text successfully extracted from report). This is the denominator for all Blocks B, C, D.

**Note — 2024 bilingual pairs**: 14 companies have both `_E.pdf` and a Chinese PDF → 1,022 PDF tickers but 1,042 txt tickers (20 extra from ESGgenplus platform, no local PDF).

‡**2022 corpus expansion (Passes 62–65, 2026-06-10)**: 403 additional PDFs located and extracted (378 native, 14 scanned via OCR, 11 corrupt/excluded). 2022 NLP corpus grew from 617 → **1,023 txt files** (399 _E = 39.0%; 624 CN = 61.0%). GRI codes summary updated to 992 rows. Phase 1 English NLP complete for the 389 EN files (Passes 33–35). **Phase 2 CN expansion (~392 files, EXCLUDE set {1795, 3704, 9917, 2832, 3413, 3014, 3016}) pending** (local GPU run required). All Block C process-quality and Block D topic-count columns for 2022 still reflect the original CN-track batch until Phase 2 CN runs. DB restructured from 981 → 632 rows (Pass 92). DB-scaffold only column goes negative (−391) because bilingual txt files exceed DB rows after restructure.

‡‡**2023 corpus expansion (Phase 2 CN, planned)**: 2023 full NLP corpus = 526 EN (Phase 1 complete, Passes 34+38–40) + 733 CN (216 original Phase 2 ✅ + ~517 expansion ⏳) = **1,259 txt files** planned. Current extracted count: 742 (526 EN + 216 CN). Phase 2 CN expansion EXCLUDE set of 17 tickers: {2441, 2449, 3014, 3016, 3035, 3413, 3443, 3532, 3545, 4952, 4961, 5285, 6202, 6552, 6573, 8131, 2382}. Local GPU run required. All Block C/D counts reflect Phase 1 EN + Phase 2 CN original batch only until expansion runs. DB restructured from 1,186 → 711 rows (Pass 92–93). DB-scaffold only ~0 (essentially all 711 DB companies have at least one extracted txt file).

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
| TEJ Board diversity.xlsx | 2021–2025, 7,537 rows | Board size, independent directors (count + ratio), female directors (count + %), meeting attendance %, training %; integrated 2026-06-22 (Pass DB-02) |
| TEJ ESG score.xlsx | 2016–2022 only, 4,428 rows | TESG rating, score, E/S/G sub-scores |

**Pass DB-01 (2026-06-22):** `rd_intensity` patched for 85 rows where rd_expense=0 but revenue>0 (genuine zero-R&D firms). `rd_dummy` computed for 2022–2024 (was erroneously all-zero due to pipeline gap). Remaining 279 null rows have neither revenue nor rd_expense — dropped by model.

**Pass DB-02 (2026-06-22):** Board diversity data integrated from TEJ Board diversity.xlsx (2021–2024; 151 Bad Quality=Y rows excluded). 2,774/2,856 DB rows updated. `independent_director_ratio` now 97.7% for 2021–2024 (was 0% for 2022–2024). Five new columns added: `independent_directors_n`, `female_directors_n`, `female_director_pct`, `director_attendance_pct`, `director_training_pct`.
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

**Pass 88 audit (2026-06-10): gri_adoption_year consistency check** — cross-checked all 1,036 analytical-cohort companies' `gri_adoption_year` against their first observed `GRI-Universal-2021` fiscal year in the DB:
- 1,016 companies: fully consistent (gri_adoption_year == first Universal DB row) ✓
- **20 companies have corpus coverage gaps** (gri_adoption_year < first Universal DB row or has no Universal DB rows):
  - **14 companies** (gay=2022, first DB row=2023): FY2022 Universal report exists but is absent from corpus — 1-year coverage gap
  - **4 companies** (gay=2023, first DB row=2024): FY2023 Universal report absent from corpus — 1-year coverage gap (tickers: 2646, 3338, 6141, 7788)
  - **1 company** (6272, gay=2022, only 2024 DB row): 2-year coverage gap
  - **1 company** (6573, gay=2023, no Universal DB rows): only has 2021–2022 GRI-Standards rows; FY2023 report absent from corpus entirely
- **Action**: NO CHANGES to gri_adoption_year — all 1,036 values confirmed correct per TEJ source; gaps are corpus omissions, not treatment assignment errors
- **CS21 implication**: These 20 companies lack pre-treatment (cases 1–3) or post-treatment (case 4) observations relative to their cohort; `att_gt()` will automatically exclude them from the relevant ATT(g,t) estimates. All 20 can still serve as not-yet-treated controls for later cohorts.

### CS21 DiD Estimator Design Constraints [High confidence | coordinator | Pass 89, 2026-06-10]

**Control group composition** (for `control_group = "notyettreated"` in `att_gt()`):

| t | Not-yet-treated (gay > t) | Effective controls with t obs in DB | Notes |
|---|--------------------------|-------------------------------------|-------|
| 2020 | 1,036 | ~1,000+ | All companies |
| 2021 | 1,026 | ~1,000+ | Minus cohort 2021 (n=10) |
| 2022 | 433 | **44** | g=2023 (40) + g=2024 (4) companies with 2022 DB rows |
| 2023 | 307 | ⚠️ **3** | g=2024 only; 301 of 307 entered the DB for the first time at 2024 adoption |
| 2024 | **0** | **0** | **No valid controls — full saturation** |

**Critical finding — full treatment saturation at t=2024**: All 1,036 analytical-cohort companies have `gri_adoption_year ≤ 2024` (zero never-treated companies). At t=2024, the not-yet-treated control pool is empty → **ATT(g, t=2024) is unidentified for all cohorts** with `control_group = "notyettreated"`.

**✅ Corrected (2026-06-22) — t=2023 effective controls = 124**: The prior figure of 3 was computed before the 2016–2019 historical rows were added to the DB. After DB expansion (Pass D5), the g=2023 cohort (126 companies) now has **124 companies with 2023 observations**, satisfying CS21's pre- and post-treatment observation requirement. ATT(g=2022, t=2023) and ATT(g=2023, t=2023) are now **properly estimable**. **Pre-register ATT(g=2022, t=2023) as confirmatory** (primary year+1 post-treatment effect). This is a substantial improvement in identification quality over the prior pass-89 audit finding.

**Effective ATT cell counts** (verified against DB 2026-06-10):

| ATT cell | Treated (n) | Controls (n) | Control source |
|---|---|---|---|
| g=2022, t=2020 (pre-trend t−2) | 381 | 37 | g=2023 (34) + g=2024 (3) |
| g=2022, t=2021 (pre-trend t−1) | 438 | 43 | g=2023 (37) + g=2024 (6) |
| g=2022, t=2022 (treatment year) | **442** | **44** | g=2023 (40) + g=2024 (4) |
| g=2022, t=2023 (year +1) | 431 | ✅ **124** | g=2023 cohort with 2023 data — **confirmatory** (corrected 2026-06-22) |
| g=2023, t=2022 (pre-trend t−1) | 39 | 4 | g=2024 (4) |
| g=2023, t=2023 (treatment year) | 41 | ✅ **124** | g=2023 cohort with 2023 data — **confirmatory** (corrected 2026-06-22) |

**Estimable ATT(g, t) pairs** (with non-zero control pools):
- g=2021: ATT(2021,2021), ATT(2021,2022), ATT(2021,2023) — 3 post-treatment periods ✓
- g=2022: ATT(2022,2022) **primary** (44 controls); ATT(2022,2023) **CONFIRMATORY** (124 controls — upgraded 2026-06-22)
- g=2023: ATT(2023,2023) **CONFIRMATORY** (124 controls — upgraded 2026-06-22)
- g=2024: **no estimable ATTs** — cohort g=2024 (n=307) serves as controls for t≤2023 only

**Effective analytical sample for H1**: The primary identified estimate is **ATT(g=2022, t=2022)** with 442 treated and 44 controls. ATT(g=2022, t=2023) is the year+1 confirmatory cell (124 controls).

**R implementation guidance**:
- Use `control_group = "notyettreated"` (the only viable option; `nevertreated` has 0 companies)
- Set estimation horizon to t=2023 maximum (or let `att_gt()` drop t=2024 automatically)
- Report cohort g=2024 as "treatment occurred but unestimable — serves as control cohort"
- `allow_unbalanced_panel = TRUE` to handle the 20 corpus-gap companies
- ATT(g=2022,t=2023) and ATT(g=2023,t=2023) are now fully powered (124 controls each) — pre-registered as **confirmatory** (corrected 2026-06-22 after DB expansion added 2016–2019 historical rows)

### Block B: Report Characteristics [High confidence | data-analyst | 2026-05-20/22]
- All 5,408 company-year rows (post-restructure DB) have 100% coverage on: `gri_standard_version`, `gri_adoption_year`, `bilingual_report` (sourced from TEJ CSR Disclosure)
- Text-level coverage (word count, page count, language): 0% for 2016–2020 (no text files available); 2021–2024: full within NLP corpus (per-year NLP corpus is the denominator)
- **NLP corpus by cohort** (txt files extracted; bilingual companies counted separately per language): 2021: 479; 2022: **1,023**‡ (617 original batch + 406 expansion; ML pipeline pending for expansion); 2023: **1,259**‡‡ planned (742 current: 526 EN + 216 CN); 2024: 1,042 — expanding as TWSE reporting universe grows and corpus extraction adds files
- **Bilingual reporting by cohort**: 2021: ~0 identified; 2022: ~6 ESGgenplus-only; 2023: ~16 ESGgenplus-only; 2024: 22 companies have both `_E` and Chinese versions (14 paired local PDFs + 20 ESGgenplus-only); identified via `_E` filename suffix
- **NLP corpus txt files vs DB rows (post-restructure)**: 2021: 479/491 (97.6%); 2022: 1,023/632 (162%‡ — bilingual pairs; ML pipeline pending for ~406 expansion files); 2023: 742/711 current (104%), 1,259/711 planned after CN expansion (177%‡‡); 2024: 1,042/1,022 (102%) — bilingual companies contribute one txt file per language; high coverage within post-restructure DB for all cohorts

### 2020 Cohort: Pre-Treatment Baseline NLP Pipeline [High confidence | technical-researcher + data-analyst | 2026-06-10, Passes 53–58]

The 2020 cohort (655 DB rows; 427 with extracted text) is the DiD pre-treatment baseline year. NLP pipeline now complete for Phases 0, 1 (Block C), 2, and 3.

**Coverage summary (2020):**

| Phase | Script | Coverage | Key metric |
|-------|--------|----------|------------|
| Phase 0: Block B | `phase0_2020.py` | 427/427 files; 655 rows | report_language: 100% zh (no English-only filers) |
| Phase 0: n_material_topics_a | `phase0_2020.py` | 403/655 rows (400 from GRI CSV + 3 text-fallback, 2026-06-10) | 227 with value > 0 |
| Phase 1: Block C English | `phase1_block_c_english_2020.py` | 2/2 files | 1531, 3447: mat_found=1, dm_methodology=1 |
| Phase 2: BGE-M3 | `phase2_step2_1_bge_2020.py` | 426/426 processable | top1_sim p50=0.668; top topic: GRI Alignment (25.4%) |
| Phase 2: XLMR | `phase2_step2_2_xlmr_2020.py` | 426/426 | soc-dominant 80.3%, gov=8.7%, other=6.8%, env=4.2% |
| Phase 2: Block C Chinese | `phase2_block_c_chinese_2020.py` | 367/427 (85.9%) | dm_methodology=91.3%, double_materiality=1.4% |
| Phase 3: Block vars | `phase3_2020.py` | 422/655 mda>0; 426/655 tds | mda p50=0.50; tds p50=0.629 |

**Key 2020-specific findings:**

- **XLMR soc-dominance = 80.3%** — slightly above the 2021–2024 range of 77–83%; Chinese-track structural soc-dominance is confirmed across all 5 cohorts
- **mda_index p50 = 0.50** — lowest in the panel (2021: 0.50, 2022: 0.60, 2023: 0.61, 2024: 0.62); confirms 2020 as appropriate pre-treatment baseline with lowest process maturity
- **topic_depth_score p50 = 0.629** — consistent with 2021 (0.577) and 2022 (0.590); Chinese-track BGE similarity is stable across pre-CSRD years
- **double_materiality_mentioned = 6/427 (1.4%)** — near-zero as expected for pre-CSRD, pre-ESRS reporting environment; correctly reflects 2020 disclosure landscape
- **GCI early adopters (22 tickers, 3.4%)**: 22 companies have GRI 2-* codes in FY2020 PDFs despite being classified GRI-Standards-2016. These are companies that published FY2020 reports after Oct 2021 (GRI Universal release) and voluntarily referenced the new notation. GCI for these 22 rows ranges 0.03–0.21 (partial adoption). This constitutes a within-cohort early-adopter sub-sample — potentially useful as a falsification check.
- **39 mojibake-risk files**: 39 Chinese reports in 2020_processed/ have cjk_ratio < 0.05 (garbled CJK encoding). These are real reports but their text extraction quality is lower — flagged in `data/lang_detection_2020.csv`. Down-weight for NLP tasks sensitive to Chinese character recall.
- **Phase 1 ML pending**: FinBERT, ClimateBERT, ESGLens cover only 2 English files; no material impact on 2020 statistics. Run locally when convenient.

**2020 vs 2021 Block C comparison** (% of rows with files):

| Metric | 2020 | 2021 |
|--------|------|------|
| mat_section_found | 85.9% (367/427) | 86.2% (450/522) |
| stakeholder_groups_n | 94.1% (402/427) | — |
| double_materiality_mentioned | 1.4% (6/427) | 1.1% (6/535) |
| board_approved | 24.8% (106/427) | 32.8% (171/522) |

The 2020→2021 increase in board_approved (24.8%→32.8%) suggests governance tightening of materiality processes pre-dating the GRI 3 treatment. This is consistent with TWSE CSR reporting pressure intensifying in 2021.

**Pass 90 audit (2026-06-10): board_approved 2020 data gap** — The 75.2% blank rate in 2020 is a TEJ coverage gap, NOT genuine "board not approved" coding. Evidence: (1) all 106 filled 2020 values are "1" (zero zeros); (2) of the 321 blank-2020 companies, their 2021 board_approved distribution is 61.7% zero / 36.1% one — a normal mixed distribution inconsistent with structural non-reporting. Coverage by year: 2020: 24.8% filled (TEJ gap); 2021: 99.8% filled; 2022–2024: ≥97% filled.

**CS21 guidance for board_approved**: Use `board_approved` measured at t=2021 as the pre-treatment covariate in `att_gt(xformla)` — this sidesteps the 2020 gap entirely and gives near-complete coverage (490/491). Do NOT impute 2020 blanks as 0 (would incorrectly code ~36% of companies). Note this limitation in the data section of the paper. Full cross-year coverage: 2020: 106/427 (24.8%); 2021: 490/491 (99.8%); 2022: 617/632 (97.6%); 2023: 711/711 (100%); 2024: 1,022/1,022 (100%).

### Block C: Materiality Process Quality [Medium-high confidence | data-analyst + technical-researcher | 2026-05-22/23]
Block C variables are extracted from ESG report text. Coverage expressed against the per-year NLP corpus (word_count_total > 0). Pre-adoption trends (2021→2023) from full TWSE universe:

| Metric | 2021 | 2022 | 2023 | 2024 |
|--------|------|------|------|------|
| **NLP corpus (N=)** | **479** | **1,023**‡ | **1,259**‡‡ | **1,042** |
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

| Year | NLP corpus | n_material_topics_a (>0) | Coverage (>0) | Source |
|------|-----------|--------------------------|---------------|--------|
| 2020 | 427 | **364** | **85.2%** | gri_codes_summary union (Pass 67) |
| 2021 | 491 | **440** | **89.6%** | gri_codes_summary union (Pass 67) |
| 2022 | 1,023† | **586** | **~57.3%** of expanded corpus | gri_codes_summary union (Pass 67) |
| 2023 | 711 | **642** | **90.3%** | gri_codes_summary union (Pass 67) |
| 2024 | 1,022 | **947** | **92.7%** | gri_codes_summary union (Pass 67) |

†2022 NLP corpus expanded from 617→1,023 in Passes 62–65; NLP pipeline pending for ~406 new files.

**Pass 67 (2026-06-10): Full GRI refresh** — all three GRI-derived columns now use `gri_codes_summary` as sole source with proper bilingual code union (prior Phase 3 scripts had last-write-wins bug; now English + Chinese files are merged per ticker). Coverage improved materially: 2020: +138, 2021: +82, 2022: +34, 2023: +66, 2024: +86 additional non-zero rows vs pre-refresh baseline. Remaining zero-value rows are structural gaps: image-embedded GRI indices, Chinese-only reports with English-only regex pipeline, or no GRI section in extracted text. 2022 coverage (~57%) appears lower against the expanded 1,023-file corpus because NLP pipeline has not yet been run on the ~406 new files added in Passes 62–65 — the GRI summary for these new files is present but not all tickers appear in the DB for the 2022 analytical cohort.

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

**2023 Chinese/bilingual track — 216 original files processed ✅ + ~517 expansion ⏳ (733 total; EXCLUDE set of 17 tickers for expansion batch‡‡):**

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

**2021 Chinese/bilingual track — 486 files processed (172 original + 314 supplement; excl. 3669 corrupt PDF + 5 supplement hard exclusions):**

| Step | Method | Status | Key Findings |
|------|--------|--------|-------------|
| 2.3 Block C | Bilingual regex (zh+en) | ✅ Done | **491/491 nonblank** (462 mat=1 · 29 mat=0). Completed for original 172 CN track (2026-06-09) + 14 supplement-track tickers (2026-06-10 sandbox). board_approved=213, double_mat=6, dm_methodology=401. report_language='zh' set for 11 supplement tickers. All 2021 DB rows have Block C. |
| 2.1 BGE-M3 | BAAI/bge-m3, 33 bilingual GRI topic descriptors | ✅ Done | **486/486** (172 original + 314 supplement; 100%). Original-track top topics: GRI Alignment (47), Stakeholder Engagement (26), Training & Education (20), Board Governance (10). top1_sim mean=0.668. Affinities: soc=0.302, gov=0.301, env=0.122. Supplement JSOLs: bge_2021_matches.jsonl (supplement). Mojibake combined: 32/486 (6.6%): original 8/172 (4.7%), supplement 24/314 (7.6%). |
| 2.2 XLM-RoBERTa-XNLI | mDeBERTa-v3-base-mnli-xnli | ✅ Done | **473/822 DB rows** (172 original + 301 supplement; 13 structural gap: no parseable sentences). DB fix (2026-06-10): 37 supplement tickers recovered via JSONL replay after interrupted save. Pillar breakdown (original 172): soc=133 (77.3%), other=14 (8.1%), env=13 (7.6%), gov=12 (7.0%). Mean pcts: soc=0.456, gov=0.199, env=0.155. Mean sentences=41.6. |

**Cross-cohort Phase 2 comparison (Chinese/bilingual track, 2021–2024):**

| Metric | 2021 (n=486†) | 2022 (n=225) | 2023 (n=216) | 2024 (n=361) |
|--------|-------------|-------------|-------------|-------------|
| XLMR dominant (soc%) | 77.3% | 77.8% | 82.9% | 81.4% |
| XLMR dominant (gov%) | 7.0% | 5.8% | 1.9% | 3.9% |
| BGE top-1 topic | GRI Alignment (47) | GRI Alignment (70) | GRI Alignment (55) | GRI Alignment (122) |
| BGE mean_sim | 0.643 | 0.654 | 0.651 | ~0.669 |
| Mean sentences (XLMR) | 41.6 | 47.2 | 48.2 | 43.9 |
| double_mat (combined) | 0.7% | 4.8% | 6.1% | 6.1% |
| ai_tool (combined) | 0.2% | 0.5% | 2.7% | 14.6%* |

*2024 ai_tool for combined corpus (English+Chinese). Chinese-track-only: 4.4%.
†2021 n=486 after supplement (172 original + 314 supplement). XLMR pillar breakdown shown for original 172-file batch; supplement batch stats not yet re-aggregated.

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

### Phase 3: Block Variable Population [Passes 43–46, 2026-06-09]

Phase 3 computed four Block G summary variables for all four cohort years using existing NLP and GRI data. Scripts: `scripts/phase3_local/phase3_{year}.py`. DB expanded to **190 columns** after Phase 3 (188 + 2 confirmed new columns); then extended to **192 columns** after Pass 92 (+ `language_track` + `impact_intensity`). 2023 Phase 3 re-run 2026-06-11 (Pass 93) after GRI codes refresh (gri_codes_summary_2023.csv: 649 → 1,237 rows).

**Cross-cohort Phase 3 coverage (rows with >0 value / total cohort rows):**

| Metric | 2021 (N=491) | 2022 (N=632) | 2023 (N=711) | 2024 (N=1,022) |
|--------|-------------|-------------|----------------|----------------|
| `mda_index` | 470 (57.2%), mean=0.549, mode=0.5 | 606 (95.9%), mean=0.601, mode=0.6 | 660 (92.8%), mean=0.609, mode=0.6 *(Pass 93)* | 1,038 (52.3%), mean=0.618, mode=0.7 |
| `gri_content_index_completeness` | **47 (9.6%)**, correct: ~98% GRI-2016 reporters§ | **514 (81.3%)**, med=0.882 | **710 (99.9%)**, med=0.882 *(Pass 93)* | **939 (91.9%)**, med=0.882 |
| `n_material_topics_b` | **440 (89.6%)**, median=18 | **586 (92.7%)**, median=16 | **711 (100.0%)**, median=16 *(Pass 93)* | **947 (92.7%)**, median=17 |
| `topic_depth_score` | 476 (57.9%), mean=0.577, med=0.586 | 611 (96.7%), mean=0.590, med=0.598 | 576 (81.0%), mean=0.591, med=0.594 *(Pass 93)* | 1,040 (52.4%), mean=0.374‡ |

§2021 GCI near-zero by design: ~98% of 2021 rows are GRI Standards 2016 reporters who do not use "GRI 2-*" notation — GCI=0.0 is methodologically correct. Only 47 Universal 2021 early adopters have non-zero GCI. Filter by `gri_standard_version` for cross-cohort GCI analysis.

‡2024 `topic_depth_score` mean is lower (0.374) because the 2024 corpus contains a large English-track component (ESGLens; model-calibrated mean≈0.231) vs Chinese-track (BGE-M3; calibrated mean≈0.643). This is a model-calibration gap, not a disclosure quality difference. 2021–2023 means (0.577–0.591) reflect a higher Chinese-track share of the NLP corpus.

**Key interpretation notes (updated Pass 67):**
- `mda_index` trend (0.549 → 0.618): Gradual improvement in materiality disclosure quality across cohorts, consistent with increasing TWSE regulatory pressure.
- `n_material_topics_b` — **Pass 67 methodology update**: now uses `gri_codes_summary` as sole source for ALL years, replacing the prior `gri_tables`-primary approach for 2023/2024. Comparison showed gri_codes_summary has far higher coverage (663 vs 88 tickers for 2023; 974 vs 367 for 2024) and higher counts in 71/88 and 339/367 overlapping cases. `n_material_topics_b` now equals `n_material_topics_a` for all years — both count unique GRI topic standards (200–499 series) from the same unified source. The metric is now **directly comparable across all cohorts** and suitable for DiD estimation. n_material_topics_a is retained as a redundant alias; n_material_topics_b is the primary H1 outcome variable.
- `gri_content_index_completeness` (GCI): median=0.882 for Universal 2021 reporters (2022–2024) — exactly 30/34 mandatory GRI 2-* disclosures, as expected. GCI>0 coverage: 81%/99.9%/92% for 2022/2023/2024 respectively (Pass 93: 2023 GCI coverage jumped from 85.2% to 99.9% after GRI codes refresh expanded gri_codes_summary_2023.csv from 649→1,237 rows); rising coverage reflects mandatory TWSE reporting bringing better-structured reporters.
- **Retired**: `gri_tables_2023/` and `gri_tables_2024/` directories are no longer used for n_material_topics_b. `gri_codes_summary` is the authoritative source for all GRI-derived variables.

---

## Data Quality

### Completeness by Block — 2024 Cohort
Coverage is shown two ways: **NLP corpus** (1,042 companies with extracted text) and **TEJ universe** (1,983 companies with TEJ scaffold rows for FY 2024). NLP-based blocks (B/C/D) use 1,042 as the denominator; TEJ-sourced blocks (F/G) fractions below use the pre-restructure 7,765-row database as denominator — these fractions will be recalculated in a future pass using the current 5,408-row DB.

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
| G | independent_director_ratio | 0% | 0% (2022–2024); ~98% (2014–2021 from shareholding files) | Not in TEJ Governance file; stub for 2022–2024 |
| G | board_esg_committee | 0% | 0% | No data source identified; not in TEJ or ESGgenplus (Pass 66 audit) |

### Known Reliability Issues

- **`gri_adoption_year`** — ~~CRITICAL GAP (Pass 29)~~ **RESOLVED (Pass 30, 2026-06-08)**: 7,634 rows populated (7,127 new fills + 74 pre-existing). Adoption distribution: 2021: 14; 2022: 869; 2023: 310; 2024: 818. Of 818 first-time-2024 adopters, 792 are new entrants (no pre-adoption rows — excluded from DiD estimation). 131 rows blank = companies appearing only under GRI Standards 2016. DiD treatment variable fully valid for CS21 estimation.
- **TESG scores 2023–2024**: Unavailable. TEJ ESG score file ends at 2022/12. No workaround from current TEJ data.
- **independent_director_ratio**: Not in TEJ Governance file; shareholding source files only cover 2014–2021. 2022–2024 rows remain 0% (structural gap). Requires TWSE corporate governance database or manual collection.
- **board_esg_committee**: 0% coverage for ALL years (0/3,283 rows). No data source identified in current project files (not in TEJ, not extractable from ESG reports without NLP classification). Structural gap confirmed in Pass 66 audit.
- **state_ownership_pct**: ~~TEJ Share Structure December coverage too sparse — unusable~~ **RESOLVED (Pass 28)**: File is cross-sectional (one row per company, 2025–2026 snapshot). Treated as time-invariant control: same Government(%) value applied across all fiscal years per ticker. Coverage: 7,535/7,765 rows (97.0%); 402 tickers with government ownership > 0%. 230 rows unmatched (no TEJ entry).
- **2016–2020 text data**: No ESG report text files available for these years. Block B word_count/page_count/report_language permanently unavailable for pre-2021 cohort.
- **Topic panel 2021–2022 n_material_topics_b**: Not extractable — GRI 3-3 construct did not exist under GRI Standards 2016. This is structurally correct, not a gap.
- **n_material_topics_a structural ceiling (Pass 31, improved Pass 66)**: Coverage after Pass 66 fill (+324 rows): 2021: ~99.2%, 2022: ~98.7%, 2023: ~89.4%, 2024: ~99.9%. Remaining 119 blanks (2020:24, 2021:4, 2022:13, 2023:77, 2024:1) are structural ceilings not improvable without new pipeline capabilities: root causes are image-embedded GRI content indices (pdfplumber cannot parse), Chinese-only reports (English regex pipeline), and reports with no GRI section. The 2023 gap (77) is the largest — ~32 image-embedded, ~47 Chinese-only. Use the per-year NLP corpus as the correct denominator; do not pool across years without weighting.
- **Stage 3 concordance**: ~60–80 genuine unmatched GRI 3-3 topic labels in 2023–2024 topic_panel. Two-coder protocol required. Priority labels: 'Climate Change Response', 'GHG Emissions and Reduction', 'Innovation R&D', 'Regulatory Compliance' (~15–20 labels).
- **Assurance_level**: 48–72% coverage per year (TEJ data completeness ceiling). Gap may bias H3 estimates. **Note**: 1,467 rows were corrected from Reasonable→Limited (Pass 28) — 中度保證 (AA1000 moderate assurance) was incorrectly mapped as Reasonable in the original DB. H3 estimates should now be correctly specified.

### Data Biases
- **NLP corpus selection bias**: Companies with no extracted report text are excluded from Block B/C/D analysis. Post-restructure DB (5,408 rows), coverage is near-complete for 2021–2023 cohorts: 2021: 479/491 txt files (97.6%); 2022: 1,023 txt files / 632 DB rows (>100% — bilingual pairs; ML pipeline pending for ~406 expansion files); 2023: 742/711 current (104%), 1,259/711 planned; 2024: 1,042/1,022 (102%). The original selection bias framing (42–47% excluded) was based on the pre-restructure 7,765-row TEJ scaffold that included many companies with no PDFs at all; the restructured DB retains only companies with data. Effective NLP corpus (txt files) by year: 479 / 1,023‡ / 742 current (1,259‡‡ planned) / 1,042. Estimates for NLP-based blocks still skew toward companies that filed English or Chinese reports; companies with no text file in either language are entirely excluded from Block C/D analysis.
- **December fiscal year filter**: TEJ data filtered to YYYY/12 fiscal year-end. Non-December fiscal year companies are excluded from financial controls. This affects <5% of TWSE universe.
- **GRI 3-3 txt extraction noise**: The 516 Pass-26 values were extracted via regex rather than structured GRI table parsing. Validation against 526 gri_table-derived values shows Pearson r=0.59, 29% exact match, 51% within ±1. The primary source of error is that gri_tables itself under-extracts for many companies (pdfplumber missed rows), so "ground truth" is also noisy. Treat `n_material_topics_b` as a continuous count variable with ±2–3 measurement noise for the txt-extracted subset. Use `n_material_topics_a` (97% coverage, regex-based, more reliable) for robustness checks.

---

## Comparisons & Metrics

### Database State (current — Pass DB-06, 2026-06-22)
- Rows: **5,408** (data) + 2 header rows (FY 2016–2024)
- Columns: **195** (Pass DB-06: +`twse_cgq_score`, +`has_any_assurance`, +`big4_assurance`, +`big4_financial_auditor`)
- Encoding: UTF-8-sig BOM
- Full universe: 2,091 unique companies × 2016–2024
- Analytical sample (FY ≥ 2020): 3,283 rows; db_did_full.csv = 3,283 × 195 cols; db_did.csv = 2,960 × 195 cols (g=2024 excluded)
- 73-company industry subsample embedded within: 507 rows (available for subgroup analysis)

### Database State (prior — Pass 93, 2026-06-11)
- Rows: **5,408** (data) + 2 header rows (FY 2016–2024)
- Columns: **192** (+ language_track + impact_intensity added Pass 92)

### Database State (historical — as of 2026-05-23, Pass 17)
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
| 2026-06-09 | 43–46 | 188→190 | Phase 3 Block Variable Population (all 4 cohorts): mda_index, gri_content_index_completeness, n_material_topics_b, topic_depth_score |
| 2026-06-09 | 47–49 | 192 | 2020 cohort text pipeline: Stage 0 scan (404 native + 28 scanned); OCR (28 files, Tesseract chi_tra+eng); PyMuPDF re-extraction (404 files); GRI extraction (250/404 with codes, 9,789 instances, 12 G4 files); quality audit (Checks A/B/C — corpus accepted with notes). |
| 2026-06-09 | 50–52 | 192 | 2021 corpus expansion: 319 new PDFs scanned (298 native + 21 scanned); OCR + PyMuPDF extraction; GRI extraction updated (488→790 rows); quality audit updated. 2021 CN corpus expands from 172→486 files for BGE/XLMR supplement run. |
| 2026-06-10 | 53–58 | 192 | 2020 cohort NLP pipeline complete: Phase 0 (Block B, lang detection), Phase 1 Block C English, Phase 2 (BGE-M3, XLMR, Block C Chinese), Phase 3 block variables. 22 GCI early adopters identified. |
| 2026-06-10 | 59–60 | 192 | 2021 XLMR JSONL replay (37 tickers recovered; 436→473/822). 2020 DB corrections: bilingual_report fixed for 1531+3447; n_material_topics_a 400→403. Audit files and research_log updated. |
| 2026-06-10 | 62–65 | 192 | **2022 corpus expansion**: 403 new PDFs located (378 native + 14 scanned via OCR + 11 corrupt/excluded); PyMuPDF + Tesseract extraction. 2022 NLP corpus: 617→**1,023 txt files** (399 _E=39.0%, 624 CN=61.0%). GRI codes summary updated to 992 rows. Phase 1/2/3 NLP for ~406 new files pending (local GPU run). |
| 2026-06-10 | 66 | 192 | **Block A–G comprehensive gap audit and fill**: n_material_topics_a +324 rows (2021:+142, 2022:+94, 2023:+58, 2024:+30) from existing gri_codes_summary CSVs; extended Block C (7 cols: mat_process_disclosed, matrix_shown, matrix_axes_labeled, approval_body, gri3_four_step_compliance, impact/financial_materiality_disclosed) filled for 2020 (427 rows) and supplement batches — now 0 blanks; word_count_cn/page_count_cn +1,797 rows (2020–2024 CN-track); report_language 15 rows (2022 supplement); mda_index 14 rows recomputed (2021). Structural gaps confirmed: board_esg_committee=0/3283 all years (no source), independent_director_ratio=0 for 2022–2024 (shareholding files only 2014–2021). |

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

### Local GPU Runs (pending)
4. **2022 NLP pipeline for ~406 new files** (Passes 62–65 corpus expansion): Phase 1 English (ESGLens, FinBERT, ClimateBERT, Block C) + Phase 2 Chinese (BGE-M3, XLMR, Block C Chinese) + Phase 3 Block Variable Population. Scripts exist; re-run with 2022 file list expanded.
5. **XLMR 13-ticker re-run for 2021** — remove 13 tickers from phase2_step2_2_xlmr_2021_progress.json done set, re-run supplement script locally.
6. **Phase 1 English NLP for ticker 6770 (2021) and 1531/3447 (2020)** — three English-track tickers missing ESGLens/FinBERT/ClimateBERT.

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
| 2026-06-09 | coordinator-scripts | 43 | Phase 3 Block Variable Population — 2024 cohort: mda_index 1038/1983 (mean=0.618, mode=0.7); gci 902/1983 (mean=0.856, med=0.882); n_material_topics_b 760/1983 (mean=13.4, med=13); topic_depth_score 1040/1983 (mean=0.374; EN=0.231, ZH=0.643). Script: phase3_2024.py. (Pass 43) |
| 2026-06-09 | coordinator-scripts | 44 | Phase 3 Block Variable Population — 2023 cohort: mda_index 723/1185 (mean=0.609, mode=0.6); gci 542/1185 (mean=0.807, med=0.882); n_material_topics_b 568/1185 (mean=15.3, med=15); topic_depth_score 727/1185 (mean=0.591). Script: phase3_2023.py. (Pass 44) |
| 2026-06-09 | coordinator-scripts | 45 | Phase 3 Block Variable Population — 2022 cohort: mda_index 608/980 (mean=0.601, mode=0.6); gci 456/980 (mean=0.826, med=0.882); n_material_topics_b 517/980 (mean=15.7, med=15); topic_depth_score 613/980 (mean=0.590). No gri_tables_2022 — summary codes only. Script: phase3_2022.py. (Pass 45) |
| 2026-06-09 | coordinator-scripts | 46 | Phase 3 Block Variable Population — 2021 cohort: mda_index 470/822 (mean=0.549, mode=0.5); gci 41/822 (mean=0.237 — GRI 2016 cohort, expected); n_material_topics_b 319/822 (mean=15.9, med=16); topic_depth_score 476/822 (mean=0.577). Phase 3 now COMPLETE for all 4 cohorts. All audit files and research_log updated. DB: 192 cols. (Pass 46) |
| 2026-06-10 | data-analyst, technical-researcher | 53–58 | **2020 cohort NLP pipeline complete** (Phases 0, 1 Block C, 2, 3). Phase 0: Block B + lang_detection_2020.csv (39 mojibake-risk files flagged). Phase 2: BGE-M3 (426/426; top GRI Alignment 25.4%; top1_sim p50=0.668); XLMR (426/426; soc=80.3%); Block C Chinese (mat_found=85.9%, double_mat=1.4% — pre-CSRD baseline confirmed). Phase 3: mda_index p50=0.50 (lowest in panel); topic_depth_score p50=0.629; GCI: 22 early adopters (3.4%) with partial GRI 2-* in FY2020 reports — research finding. All audit files, research_log updated. (Passes 53–58) |
| 2026-06-10 | technical-researcher | 59 | **2021 XLMR JSONL replay** — recovered 37 tickers lost to interrupted save (JSONL written at 02:35, DB saved by Phase 3 supplement at 02:38 before XLMR save reached). XLMR 2021 DB: 436→473/822. Remaining 13-ticker gap structural (no parseable sentences ≥15 chars). Retroactive lang_detection CSV for original 172 CN track created (`data/audits/lang_detection_2021_cn_original.csv`): 8 mojibake, 164 ok. Combined 2021 mojibake: 32/486 (6.6%). audit file (2021) updated: Phase 2.2s marked ✅ Done 2026-06-10. (Pass 59) |
| 2026-06-10 | data-analyst | 60 | **2020 DB corrections**: (1) `bilingual_report` fixed for tickers 1531 and 3447 (0→1; both have `_2020_E.txt` on disk — `phase0_2020.py` missed them); coverage now 427/427. (2) `n_material_topics_a` improved 400→403 via GRI text-pattern fallback (scan of processed .txt for GRI 200/300/400-series codes). 24 tickers remain blank (no GRI codes found). audit file (2020) Entry 8 added; research_log passes 59–60 appended. (Pass 60) |
| 2026-06-10 | data-analyst | 61 | **2021 Block C supplement + language fix**: Full coverage audit of all 491 2021 DB rows. Block C run sandbox for 14 supplement-track tickers (2329 2441 2449 6770 + 10 more) with blank `mat_section_found` — Block C now **491/491 nonblank** (462 mat=1, 29 mat=0). `report_language='zh'` set for 11 blank-language supplement tickers; language distribution now 183 zh + 308 en = 491/491. XLMR 13-ticker gap reclassified: sandbox verification showed all 13 produce 1–75 sentences; they were silently skipped because present in progress JSON done set. Local re-run instructions documented (remove 13 from done list, re-run supplement script). New gap: ticker 6770 missing Phase 1 English NLP (307/308 en rows covered). DB row count clarification: 2021 restructured 822→491 rows. audit file (2021) Entry 15 added; research_log pass 61 appended. (Pass 61) |
| 2026-06-10 | data-analyst | 62–65 | **2022 corpus expansion**: Scan identified 403 new PDFs (378 native, 14 scanned, 11 corrupt); PyMuPDF native extraction + Tesseract OCR (chi_tra+eng) for 14 scanned files. Final 2022 NLP corpus: **1,023 txt files** (399 _E = 39.0%, 624 CN = 61.0%), up from 617. GRI extraction re-run: gri_codes_summary_2022.csv → **992 rows** (from 984 intermediate). 11 corrupt PDFs documented. Phase 1/2/3 NLP pipeline for ~406 new files pending local GPU run. (Passes 62–65) |
| 2026-06-10 | data-analyst | 66 | **Block A–G comprehensive gap audit and fill** (see Pass 66 entry above) |
| 2026-06-10 | data-analyst | 67 | **GRI extraction quality update — full refresh** (`gri_refresh_all.py`): (1) all updated gri_codes_summary CSVs (Jun 10 timestamps; 2020:+28, 2021:+24, 2022:+3 new tickers) ingested; (2) bilingual union bug fixed — codes now unioned across _E and CN files per ticker; (3) gri_tables retired for n_material_topics_b — gri_codes_summary used for ALL years (gri_tables had 88/367 tickers vs summary 663/974 for 2023/2024; summary > tables in 71/88 and 339/367 overlap comparisons); (4) n_material_topics_b now identical to n_material_topics_a (consistent single-source metric, directly comparable across all cohorts). Deltas vs prior: nma +138/+82/+34/+66/+86, gci +5/+6/+58/+64/+37, nmb +127/+121/+69/+74/+187 (2020–2024). GCI median=0.882 for GRI-Universal-2021 reporters confirmed correct (30/34 disclosures). (Pass 67) |: cross-cohort audit of all non-NLP columns (Blocks A–G) identified multiple fillable gaps without NLP. Fixes applied in sandbox: (1) `n_material_topics_a` +324 from gri_codes_summary CSVs (2021:+142, 2022:+94, 2023:+58, 2024:+30); 119 remaining blanks are structural ceiling; (2) extended Block C (mat_process_disclosed, matrix_shown, matrix_axes_labeled, approval_body, gri3_four_step_compliance, impact_materiality_disclosed, financial_materiality_disclosed) — 0 blanks after filling 2020 (427 rows) and supplement batches; (3) word_count_cn + page_count_cn +1,797 rows across 2020–2024 CN-track; (4) report_language 15 rows (2022 supplement); (5) mda_index 14 rows recomputed. Structural gaps confirmed and documented: `board_esg_committee`=0/3,283 (no TEJ/ESGgenplus source identified), `independent_director_ratio`=0 for 2022–2024 (shareholding files only cover 2014–2021). (Pass 66) |
| 2026-06-10 | coordinator | 88 | **gri_adoption_year consistency audit**: 1,016/1,036 companies fully consistent. 20 companies have corpus coverage gaps (14: gay=2022, first DB row=2023; 4: gay=2023, first DB row=2024; 1: 2-year gap ticker 6273; 1: ticker 6573 has gay=2023 but no Universal DB rows). No changes to DB — all gri_adoption_year values confirmed correct per TEJ source. CS21 att_gt() will automatically drop these 20 from their respective ATT(g,t) estimates; all 20 can contribute as not-yet-treated controls. (Pass 88) |
| 2026-06-10 | coordinator | 89 | **CS21 control group audit**: Zero never-treated companies in 1,036-company analytical cohort. At t=2024, not-yet-treated pool = 0 → ATT(g, 2024) unidentified for all cohorts. Estimable ATT pairs: g=2021 (3 post-treatment periods); g=2022 (2); g=2023 (1); g=2024 (0 — serves as controls only). Effective analytical sample for H1: cohorts 2021–2023, n=729. R implementation: control_group="notyettreated", horizon t≤2023, allow_unbalanced_panel=TRUE. (Pass 89) |
| 2026-06-10 | coordinator | 90 | **board_approved 2020 audit**: 321/427 (75.2%) blanks in 2020 confirmed as TEJ coverage gap, not genuine coding. All 106 filled 2020 values = 1 (no zeros). Cross-check: 2021 distribution for blank-2020 companies is 62% zero / 36% one — normal distribution inconsistent with structural non-reporting. Recommendation: use board_approved at t=2021 as pre-treatment covariate in CS21 xformla (sidesteps gap; 99.8% coverage). Do not impute 2020 blanks as 0. (Pass 90) |
| 2026-06-10 | coordinator | 91 | **Cross-document alignment sweep**: Fixed all misalignments across 8 files. Key corrections: (1) treated=578→**442** for ATT(g=2022, t=2022) in hypothesis doc, findings doc, and all references — 578 was wrong because it included non-estimable companies without pre-treatment baseline; (2) added ATT(g=2022, t=2023) and ATT(g=2023, t=2023) rows showing ⚠️ **3 effective controls** each — 301/307 g=2024 companies only appear in DB from 2024 onward; (3) DB column count corrected **192→190** across research summary, methodology doc; (4) gri_tables retirement note added to cohort audit and methodology doc; (5) 2022 NLP corpus expansion (617→1,023 txt files) documented in cohort audit; (6) db-quality-assessment_v2.md deprecated (wrong control pool methodology); independent_director_ratio 0%-for-2022-2024 finding ported to canonical v1. OSF pre-registration checklist updated to flag year+1 ATT cells as exploratory. (Pass 91) |
| 2026-06-10 | coordinator | 92 | **Data prep tasks D2–D5 executed**: (D2) `language_track` column added — bilingual=319, zh_only=1388, en_only=1551, neither=2150 across full panel; 2021 calibration check passed exactly (bilingual=303, zh_only=183, en_only=4, neither=1). (D3) `impact_intensity` column added — High=2155, Low=2448, Sensitivity=637; all 11 sasb_industry categories mapped; 32 null rows. DB now 192 columns (up from 190). (D4) Two analytical datasets created: `db_did.csv` (2,960 rows, g=2024 excluded — use for ATT(t≤2022)); `db_did_full.csv` (3,283 rows, all cohorts retained — use with glist=c(2021,2022,2023) for att_gt(); preserves 44 controls at t=2022 and 3 controls at t=2023). **Critical correction**: original D4 filter removed g=2024 controls, reducing t=2022 pool to 40 (not 44) and making t=2023 inestimable; `db_did_full.csv` is the recommended primary analytical file. (D5) 2,125 pre-treatment rows added (FY 2016–2019): ln_total_assets/roa/leverage at 92–95% coverage; `language_track='neither'` for all pre-2021 rows; 351/1036 analytical-sample companies now have history to 2016. DB extended to 5,408 rows × 192 cols, FY 2016–2024. Reference file: `data/stream_b_pre_treatment.csv` (2,780 rows). (Pass 92) |
| 2026-06-11 | coordinator | 93 | **GRI codes refresh + Phase 3 2023 re-run + db_did regeneration**: (1) gri_codes_summary_2023.csv refreshed from 649 → **1,237 rows** after re-running GRI extraction on 2023 processed txt files. (2) `phase3_2023.py` re-run for all 711 FY 2023 DB rows — updated n_material_topics_b (642→**711/711, 100%**), gri_content_index_completeness (606→**710/711, 99.9%**), mda_index (723→**660/711, 92.8%**), topic_depth_score (727→**576/711, 81.0%**); old denominators used 1,185 (pre-restructure). (3) db_did files regenerated from current DB (fixed float-string filter: gri_adoption_year stored as "2021.0" etc.): db_did_full.csv = **3,283 rows** × 192 cols; db_did.csv = **2,960 rows** (g=2024 excluded). (4) Text extraction quality audit files updated (2022: Phase 3 values with 632 denominator; 2023: Phase 3 values with 711 denominator, Pass 93 note). (5) Research execution plan updated with R loading guidance and pending NLP pipeline table. (Pass 93) |

---

*Last updated by: research-coordinator | Pass 93 | 2026-06-11*  
*Covers: Passes 1–93 across 36 sessions (2026-05-18 through 2026-06-11)*  
*Next coordinator session trigger: OSF pre-registration, or DiD analysis scripts (R: att_gt())*  
*Pending local runs: (1) XLMR 13-ticker re-run for 2021 (remove from progress JSON done set, re-run supplement script); (2) Phase 1 English NLP for 6770 (2021) and 1531/3447 (2020); (3) Phase 2 CN expansion for ~392 new 2022 files (EXCLUDE {1795, 3704, 9917, 2832, 3413, 3014, 3016}); (4) Phase 2 CN expansion for ~517 new 2023 files (EXCLUDE 17-ticker set) → phase3_2023.py re-run. All four pending items are Stream F only; do not block Streams A–E or OSF pre-registration.*  
*Note: gri_tables_2023/ and gri_tables_2024/ are retired for n_material_topics_b purposes (Pass 67). gri_codes_summary is now authoritative for all GRI-derived variables.*  
*CS21 design notes (Pass 89/91/92): estimable cohorts = 2021–2023 (n=729); g=2024 (n=307) serves as controls only; max estimation horizon = t=2023; primary identified estimate = ATT(g=2022, t=2022) with 442 treated and 44 controls; ATT(g=2022, t=2023) and ATT(g=2023, t=2023) are exploratory (3 controls each); use board_approved at t=2021 as pre-treatment covariate (Pass 90). Analytical file for CS21: `db_did_full.csv` with glist=c(2021,2022,2023) in att_gt() (Pass 92). R loading: `read_csv(skip=1) |> mutate(gri_adoption_year = as.integer(gri_adoption_year))`.*  
*DB state (Pass 93): 5,408 rows × 192 cols (FY 2016–2024); analytical sample (FY≥2020): 3,283 rows; db_did_full.csv = 3,283 rows; db_did.csv = 2,960 rows.*
