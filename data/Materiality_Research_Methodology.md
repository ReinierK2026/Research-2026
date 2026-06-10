# Research Methodology Guide: GRI 3 Materiality DiD Study
### Answering the Five Core Research Design Questions
**Compiled: May 15, 2026 | Last updated: June 10, 2026 | Six parallel analysis streams**

---

## ── RESEARCH STATUS DASHBOARD ──
*As of June 9, 2026 — snapshot of pipeline completion, open gaps, and next actions*

---

### Pipeline Completion by Cohort

| Stage | Description | 2021 | 2022 | 2023 | 2024 |
|-------|-------------|------|------|------|------|
| 0 | PDF corpus assembled | ✓ 492 PDFs | ✓ | ✓ | ✓ |
| 1 | Scan & file inventory | ✓ 488 non-OCR, 4 OCR | ✓ | ✓ | ✓ |
| 2 | OCR (scanned pages) | ✓ 4 files processed | ✓ | ✓ | ✓ |
| 3 | PyMuPDF text extraction | ✓ w/ sidebar filter | ✓ | ✓ | ✓ |
| 4 | GRI code extraction | ✓ 342/488 w/ codes | ✓ | ✓ | ✓ |
| 5 | Extraction quality audit | ✓ standalone MD | ✓ | ✓ | ✓ |

**Corpus PDF location:** `Research_assistant/twse_esg_reports/` (45GB — stays in place; not copied)

**All pipeline scripts** are in `academic-research/scripts/` and `text-extraction/`. GRI output CSVs are in `data/gri/`. Quality audit reports are in `audits/`.

---

### Data Blocks: Completion Status

| Block | Content | Status | Location |
|-------|---------|--------|----------|
| A | Company identifiers & firmographics; `sasb_industry` (H4 moderator for `impact_intensity`) | ✓ Near-complete — core identifiers 100%; `sasb_industry` 94% (467 rows missing — only gap relevant to analysis); `company_name_en` 7% and `global_ticker`/`isin` 0% (global-peer fields, irrelevant for TWSE-only H1–H4 design) | `twse-research-database.csv` |
| B | Report metadata (language, standard, page count) | ✓ All 4 cohorts extracted | `data/quality/preprocessing_manifest_*.csv` |
| C | Materiality process disclosure variables (`process_quality_score`) | ✓ All 4 cohorts extracted (Phase 1 + 2 NLP complete) | `twse-research-database.csv` |
| D | Material topic variables (`n_material_topics_a/b`) | ✓ All 4 cohorts extracted (Phase 3 complete) | `twse-research-database.csv` |
| E | Topic dynamics (year-over-year churn) | ✗ Blocked on Block D panel join | — |
| F | Financial control variables (assets, ROA) | ✓ Partial — `ln_total_assets`, `roa` 100% 2021; 64% 2022–2024; `board_esg_committee` = 0% (not used in primary spec — replaced by `board_approved` from Block C) | `twse-research-database.csv` |
| G | Outcome/quality variables (MDA index, GRI completeness) | ✓ All 4 cohorts extracted (Phase 3 complete) | `twse-research-database.csv` |

**GRI content index codes** (extracted regex-based, all cohorts): `data/gri/gri_codes_summary_*.csv`
- 2021: 342/488 files with GRI codes; 8 files with legacy G4 sector codes
- 2022–2024: Extracted (see audit MDs for per-cohort statistics)

**Matrix extraction** (materiality matrix image coordinates): `data/matrix-extraction/` — 2022–2024 partial; 2021 not started.

---

### Open Data Gaps

| Gap | Priority | How to Resolve |
|-----|----------|----------------|
| `board_esg_committee`: 0% populated — **substituted** | ~~🔴 HIGH~~ → Resolved | Primary spec uses `board_approved` (Block C, fully extracted) as substitute — same theoretical construct (board-level ESG engagement), more direct measure. If sourced later from TEJ, add as robustness check only. |
| OSF pre-registration | 🔴 HARD BLOCKER — must precede all inferential tests | Pre-register H1–H5 on OSF before running any `att_gt()` calls |
| `sasb_industry`: 6% missing (467/7,750 rows) | 🟡 MEDIUM — H4 moderator gap | Identify which companies are missing; fill from TWSE MOPS industry classification or TEJ sector codes. Alternatively, exclude from H4 subsample with note in pre-registration. |
| Stage 3 manual concordance: ~60–80 unmatched topic labels | 🟡 MEDIUM — affects Block D precision | Two-coder protocol; target κ ≥ 0.80 before finalising `n_material_topics_b` |
| H5: TSMC tier-1 supplier coding | 🟡 MEDIUM — required for H5 only | ~1–2 days manual lookup from TSMC Supplier Sustainability Reports 2022–2024 |
| Block F: `ln_total_assets` / `roa` 2022–2024 coverage ~64% | 🟡 MEDIUM | Complete TEJ export for missing company-years |
| Block E: Topic dynamics panel | 🟢 LOW — derived variable | Auto-compute from Block D once concordance is finalised |
| Global peer PDF corpus (optional extension) | 🟢 LOW — not required for H1–H5 | Collect from company IR pages (20 peers listed below) if extending to cross-country comparison |

---

### Immediate Next Steps

~~**Phase 1 — Complete Block C across all cohorts** — ✅ COMPLETE (all 4 cohorts, June 2026)~~

~~**Phase 2 — Block D: NLP topic coding pipeline** — ✅ COMPLETE (Phase 1 English track + Phase 2 multilingual track, all 4 cohorts, June 2026)~~

~~**Phase 3 — Block variable population** — ✅ COMPLETE (Blocks C, D, G all 4 cohorts, June 2026)~~

**Phase 3b — Pre-analysis data finalisation (current priority)**
1. ~~Source `board_esg_committee`~~ — **resolved**: primary specification uses `board_approved` (Block C, fully extracted) as substitute. Document substitution in OSF pre-registration. Optionally source `board_esg_committee` from TEJ for a robustness column.
2. Complete TEJ export for `ln_total_assets` / `roa` 2022–2024 gap (~36% missing)
3. Finalise Stage 3 manual concordance (~60–80 unmatched GRI topic labels; two-coder κ ≥ 0.80)
4. Derive `impact_intensity` binary (H4 moderator): `high_impact_industry = 1` if `sasb_industry ∈ {Resource, Infrastructure, Transportation, Minerals, Food}` — pre-specify and lock before regression

**Phase 4 — Pre-registration (hard blocker)**
- Pre-register H1–H5 on OSF (single registration covering both tiers, noting different populations)
- Lock `impact_intensity` derivation rule and estimation window (2021–2024) in the pre-registration
- No inferential tests may be run until OSF registration is confirmed

**Phase 5 — Statistical analysis: Tier 1 (full TWSE universe, H1–H4)**
1. Run Goodman-Bacon decomposition to assess TWFE bias across adoption cohorts
2. Primary: CS21 staggered DiD (`att_gt()`, doubly-robust, not-yet-treated control) for H1–H3
   - `yname = "n_material_topics_b"` (H1), `"process_quality_score"` (H2), `"assurance_level"` (H3)
   - Population: ~1,200 treated TWSE companies; adoption cohorts 2021–2024; panel window 2021–2024
3. H4 heterogeneity: Subsample CS21 for High vs Low `impact_intensity`; triple-diff ATT(Low) − ATT(High) with bootstrapped SE
4. Robustness: SA21 (Sun & Abraham) and BJS24 (Borusyak et al.) estimators; TWFE with firm + year FE
5. Pre-trend sensitivity: Event-study plots; Rambachan-Roth sensitivity analysis (HonestDiD)
6. Topic composition (supplementary): ILR transform + SUR for E/S/G proportion shifts

**Phase 6 — Statistical analysis: Tier 2 (semiconductor sub-cohort, H5)**
1. Narrow to 73-company TWSE semiconductor sub-cohort (`semiconductor_cat = 1`)
2. Source TSMC tier-1 proximity data: TSMC Supplier Sustainability Reports 2022–2024 + Hsinchu Science Park registry (~1–2 days manual)
3. Interaction-weighted CS21: ATT for TSMC-proximate vs non-proximate adoption cohorts
4. Outcome variables: `gri_adoption_year` (earlier adoption), `process_quality_score` (higher quality), `dm_methodology_disclosed` (binary)

---

### Research Agents to Deploy

| Agent | When to Deploy | Task |
|-------|---------------|------|
| `data-analyst` | Phase 3b now | Source `board_esg_committee`; complete Block F TEJ export; derive `impact_intensity` from `sasb_industry` |
| `hypothesis-generation` | Phase 4 pre-reg | Assist OSF pre-registration drafting; lock H4 `impact_intensity` derivation rule |
| `academic-researcher` | Phase 4–5 | Literature search for comparable staggered DiD studies on ESG mandates; Göttsche et al. (2025) displacement effect citations |
| `data-analyst` | Phase 5 | Tier 1 CS21 estimation (H1–H4); event-study plots; Goodman-Bacon decomposition; Rambachan-Roth sensitivity |
| `data-analyst` | Phase 6 | Tier 2 H5 analysis (73-company semiconductor sub-cohort; TSMC proximity interaction) |
| `web-researcher` | Phase 6 | TSMC Supplier Sustainability Report lookup for tier-1 proximity coding; Hsinchu Science Park registry |
| `research-coordinator` | Any multi-agent pass | Orchestrate parallel agent tasks; consolidate findings into research_log.json |

**Pre-registered hypotheses**: `hypotheses/hypothesis-generation_did-hypotheses_2026-05-22.md` (updated 2026-06-09 — two-tier design)

---

### Folder Structure (as of May 22, 2026)

```
academic-research/
├── Semiconductor_Materiality_Research_Methodology.md   ← this file
├── Sustainability_Reporting_Materiality_Trends_2026.md
├── Definitions.docx                                    ← variable registry
├── semiconductor-research-database.csv                 ← Block A (partial)
├── twse-research-database.csv
├── lang_routing_2024.csv
├── research_log.json
├── audits/                   ← text_extraction_quality_audit_202[1-4].md
├── data/
│   ├── gri/                  ← gri_codes_summary_202[1-4].csv + gri_tables/
│   ├── quality/              ← extraction checks, block_c, preprocessing manifests
│   ├── materiality/          ← materiality_matrix_2022.csv
│   └── matrix-extraction/    ← Semi_materiality_matrix.csv, per-year image extractions
├── text-extraction/          ← extracted_text/, extraction_ledger.csv
├── scripts/                  ← check_extraction_quality.py, extract_block_c.py, merge_block_c.py
├── findings/                 ← agent findings MDs
├── gaps/                     ← research gap analysis
├── hypotheses/               ← DiD hypothesis drafts
└── skills/                   ← agent SKILL.md files

PDF corpus (45GB — do not move):
  Research_assistant/twse_esg_reports/2021/, 2022/, 2023/, 2024/
```

---

## Overview

This guide addresses the five methodology questions for building a publishable academic study on the causal effect of GRI Universal Standards 2021 (GRI 3) adoption on materiality disclosure outcomes across TWSE-listed companies, with a focused semiconductor industry deep dive.

**The five questions answered:**
1. What data do you need for a full analysis, and what extraction is involved?
2. Does having text already extracted from PDFs help?
3. What text evaluation/extraction methods are academically validated?
4. What tests track material topic selection before and after GRI 3?
5. What coding framework allows comparison within and across industries?

**Two-Tier Study Design:**

**Tier 1 — Full TWSE Universe (H1–H4):** Staggered DiD (Callaway-Sant'Anna 2021) on the full TWSE reporting population (~1,200 treated companies; adoption cohorts 2021–2024; panel window 2021–2024). Estimates the causal effect of GRI 3 adoption on material topic count (`n_material_topics_b` — H1), process quality (`process_quality_score` — H2), assurance level (`assurance_level` — H3), and heterogeneous displacement effects by industry physical-footprint intensity (`impact_intensity` derived from `sasb_industry` — H4). No restriction to any industry sub-group at this tier.

**Tier 2 — Semiconductor Industry Deep Dive (H5):** Narrows to 73 TWSE semiconductor companies (`semiconductor_cat = 1`; 507 company-years 2016–2024). Tests whether TSMC's TDDM framework diffuses to peer companies via supply chain isomorphism. Provides a mechanistic complement to Tier 1: H1–H4 document *what* GRI 3 does across TWSE; H5 explains *why* the effect may be amplified within a tightly-coupled industry.

The two tiers are complementary, not competing. See `hypotheses/hypothesis-generation_did-hypotheses_2026-05-22.md` for the full pre-registration plan.

---

## Question 1: What Data Do You Need?

### Complete Dataset Schema (Company-Year Level)

The unit of observation is **one company's sustainability report covering one fiscal year**. Every field below should be captured for each company-year record.

---

#### Block A: Company Identifiers & Firmographics

| Field | Description | Source |
|---|---|---|
| `company_id` | Unique key (e.g., TWSE ticker + year) | Assigned |
| `company_name_en` | Official English name | TWSE MOPS / annual report |
| `company_name_zh` | Official Chinese name | TWSE MOPS |
| `twse_ticker` | 4-digit TWSE code | TWSE |
| `global_ticker` | Primary exchange ticker for global peers | Bloomberg / Refinitiv |
| `isin` | ISIN code | Bloomberg |
| `country_of_incorporation` | ISO 3166-1 alpha-3 (TWN, USA, KOR, NLD, DEU…) | Company registry |
| `industry_subsector` | Fabless / Foundry / IDM / OSAT / Equipment / Materials | Manual / SIC 3674 |
| `sic_code` | SIC 3674 (Semiconductors) or adjacent | SEC / TWSE |
| `sasb_industry` | SASB industry classification (e.g., Technology, Resource, Infrastructure, etc.) — **H4 moderator** for `impact_intensity` | TEJ / SASB industry classifier |
| `semiconductor_cat` | 1 = TWSE semiconductor company (Tier 2 sub-cohort flag) | Assigned; SIC 3674 + adjacent |
| `fiscal_year` | Calendar year integer (2019–2025) | Report |
| `sample_type` | TWSE-full / TWSE-semicon / Global-peer | Assigned |

**Sources:** TEJ (Taiwan Economic Journal) for TWSE firms; Refinitiv Eikon / Bloomberg for global peers.

**Note on `sasb_industry`:** This field is the source for the H4 moderator `impact_intensity`. Pre-specify the derivation rule before running regressions: `high_impact_industry = 1` if `sasb_industry ∈ {Resource Transformation, Infrastructure, Transportation, Extractives & Minerals Processing, Food & Beverage}`; `= 0` if `∈ {Technology & Communications, Health Care, Financials, Services}`; Consumer Goods treated as a sensitivity check (not included in primary H4 sample). Lock this classification in the OSF pre-registration.

---

#### Block B: Report Metadata

| Field | Description |
|---|---|
| `gri_standard_version` | G4 / GRI-Standards-2016 / GRI-Universal-2021 |
| `gri_adoption_year` | First year reporting under GRI Universal Standards 2021 |
| `reporting_period_start` / `_end` | Date (YYYY-MM-DD) |
| `report_language` | ISO 639-1 (zh / en / ko etc.) |
| `bilingual_report` | Binary 0/1 |
| `assurance_level` | None / Limited / Reasonable |
| `assurance_provider` | Name of assurance firm |
| `assurance_provider_type` | Big4 / Specialist / Internal / None |
| `word_count_total` | Total word count (English version) — proxy for disclosure depth |
| `page_count` | PDF page count |
| `standalone_sr` | 1 = standalone sustainability report; 0 = integrated/annual |
| `report_url` | Persistent URL |

**Note:** Word count is a validated proxy for disclosure depth (Dhaliwal et al. 2011; Loughran & McDonald 2016). Extract via `pdfplumber` or `pdftools` (R).

---

#### Block C: Materiality Process Disclosure Variables

| Field | Type | Description |
|---|---|---|
| `mat_process_disclosed` | Binary | Section explicitly describing materiality process present |
| `stakeholder_groups_n` | Integer | Number of distinct stakeholder groups listed |
| `engagement_methods_n` | Integer | Count of distinct engagement methods named |
| `process_steps_n` | Integer | Number of formal steps in process described (0–4 per GRI 3) |
| `matrix_shown` | Binary | 2×2 or equivalent materiality matrix figure present |
| `matrix_axes_labeled` | Binary | Axes defined quantitatively or qualitatively |
| `scoring_method_disclosed` | Binary | Specific scoring/weighting methodology disclosed |
| `approval_body` | Categorical | Board / ESG-Committee / Mgmt-only / Not-disclosed |
| `board_approved` | Binary | Derived from approval_body |
| `double_materiality_mentioned` | Binary | Explicit reference to double materiality |
| `impact_materiality_disclosed` | Binary | Outward impact perspective disclosed |
| `financial_materiality_disclosed` | Binary | Inward financial risk perspective disclosed |
| `gri3_four_step_compliance` | Integer 0–4 | Count of four GRI 3 steps: context / identify / assess / prioritise |

**Template source:** Beske, Haustein & Lorson (2020), *SAMPJ* — binary disclosure index across 132 GRI reports; Machado (2021), *CSR&EM* — 22-indicator materiality transparency coding scheme.

---

#### Block D: Material Topic Variables (Company-Year Level)

| Field | Type | Description |
|---|---|---|
| `topics_total_n` | Integer | Total number of disclosed material topics |
| `topics_env_n` | Integer | Count of environmental material topics |
| `topics_soc_n` | Integer | Count of social material topics |
| `topics_gov_n` | Integer | Count of governance/economic material topics |
| `topics_env_pct` / `_soc_pct` / `_gov_pct` | Float | Proportion per category |
| `gri_codes_mapped_pct` | Float | Share of topics mapped to a GRI standard code |
| `topics_with_targets_n` | Integer | Topics with at least one quantitative KPI target |
| `topics_tier1_n` | Integer | Topics classified top-priority (if tiering disclosed) |
| `topics_gri3_format` | Binary | Topics presented in GRI 3 impact significance format |

A **separate topic-level table** (one row per company-year-topic) must also exist:

| Field | Description |
|---|---|
| `company_id`, `fiscal_year` | Join keys |
| `topic_label_original` | Verbatim label as it appears in the report |
| `topic_label_canonical` | Mapped canonical label (from taxonomy in Q5) |
| `gri_standard_code` | E.g., GRI 303, GRI 403 |
| `topic_category` | E / S / G |
| `topic_tier` | 1/2/3 if disclosed |
| `has_quantitative_target` | Binary |
| `topic_new_this_year` | Binary |
| `match_method` | exact / fuzzy / embedding / manual |

---

#### Block E: Topic Dynamics (Year-over-Year)

Requires ≥ 2 consecutive years per firm.

| Field | Description |
|---|---|
| `topics_added_n` | Topics appearing this year but not prior year |
| `topics_dropped_n` | Topics in prior year absent this year |
| `net_topic_change` | added − dropped |
| `topic_churn_rate` | (added + dropped) / avg(total topics t, t-1) |
| `topic_stability_index` | Jaccard similarity of topic sets year t vs t-1 |

---

#### Block F: Standard Financial Control Variables

Winsorise all at 1st/99th percentile before analysis.

| Field | Description | Source |
|---|---|---|
| `ln_total_assets` | log(total assets, USD millions) | TEJ / Compustat / Bloomberg |
| `roa` | Net income / average total assets | TEJ / Compustat |
| `leverage` | Total debt / total equity | TEJ / Compustat |
| `firm_age` | Years since incorporation | Company registry |
| `rd_intensity` | R&D expense / revenue (critical for semiconductors) | Bloomberg |
| `dual_listed` | 1 if ADR on NYSE/NASDAQ | SEC Edgar |
| `state_ownership_pct` | % shares held by government entities | TEJ MOPS |
| `board_esg_committee` | Dedicated ESG/sustainability board committee (binary) — **0% populated; not used in primary spec** | Annual report / TEJ governance supplement |
| `board_approved` | Board formally approved the materiality assessment (binary, Block C) — **primary board-engagement control in H1–H4** | Extracted from sustainability reports |
| `analyst_coverage_n` | Number of analysts issuing recommendations | I/B/E/S via WRDS |
| `msci_esg_rating` | Lagged 1 year | MSCI ESG |
| `sustainalytics_risk_score` | Lagged 1 year | Sustainalytics |

**Canonical control set source:** Hahn & Kühnen (2013), *Journal of Cleaner Production* — reviewed 178 studies; established the standard covariate set for sustainability disclosure panel models.

---

#### Block G: Outcome / Quality Variables

| Field | Description |
|---|---|
| `mda_index` | Materiality Disclosure Assessment index (0–1); from Padilla-Garrido et al. (2024) |
| `gri_content_index_completeness` | Share of GRI content index entries with full vs. omitted disclosures |
| `process_quality_score` | Composite of stakeholder groups + methods + steps + approval + scoring methodology |
| `topic_depth_score` | Average word count per material topic (NLP-extracted) |

---

### Minimum Sample Size

| Design | Minimum | Recommended |
|---|---|---|
| OLS panel with firm fixed effects | 200 company-years | 480–600 company-years |
| DiD (two-arm, balanced) | 30 firms × 4 years per arm | 50+ firms × 6 years per arm |
| Staggered DiD (CS21) | ≥ 5 cohort-groups | More cohorts = more efficient |
| ITS | ≥ 8 pre + 4 post time points | 10 pre + 8 post preferred |

**Tier 1 — Full TWSE universe:** ~2,009 companies with `gri_adoption_year` coded; ~1,200 treated with at least one pre-adoption observation; panel window 2021–2024 (~4,800 company-years at full coverage). Well above minimum thresholds — high statistical power for CS21 estimation.

**Tier 2 — Semiconductor sub-cohort:** 73 companies; 507 company-years 2016–2024. Meets the CS21 minimum (≥ 5 cohort-groups; 4 adoption cohorts: 3 × 2021, 65 × 2022, 4 × 2023, 2 × 2024). Sufficient for H5 with TSMC-proximity interaction. Augmenting with global semiconductor peers remains an option for cross-country extension (not required for H1–H5).

---

## Question 2: Does Having Text Already Extracted Help?

**Yes — substantially.** Having raw extracted text immediately enables:

- Keyword/dictionary matching against GRI topic vocabularies (fast, no additional tooling)
- GRI content index location via regex on disclosure codes (e.g., `GRI 302-1`)
- Rough section boundary detection using heading-like patterns
- Language detection at document or paragraph level
- Bag-of-words frequency analysis and TF-IDF scoring

**What still requires additional work even with extracted text:**

| Task | Gap | Solution |
|---|---|---|
| Sentence-level NLP | Raw text has fragmented sentences from column breaks | Preprocessing pipeline (see Q3) |
| Topic modelling | Noisy text produces unstable topics | Clean before LDA/BERTopic |
| Transformer classification | Fragmented text degrades embedding quality | Paragraph re-assembly |
| Table data (GRI content index, materiality tables) | Tables lose structure in raw text extraction | Run Camelot separately on tables |
| Materiality matrix positions | Images not in text | VLM extraction (see Q3) |
| Traditional Chinese sections | Mixed with English at line level | Language detection + separation |

**Common quality issues in auto-extracted sustainability report text:**
1. **Multi-column interleaving** — columns extracted in wrong order (most common)
2. **Header/footer noise** — running headers and page numbers inserted mid-stream
3. **Table fragmentation** — GRI content index rows concatenated into one string
4. **Hyphenation artefacts** — "environ-\nmental" becomes "environ-mental"
5. **Language mixing** — English and Traditional Chinese interleaved at line level
6. **Figure captions as body text** — "Figure 3: Materiality Matrix 2023" becomes paragraph
7. **Scanned page overlays** — OCR required if no text layer

**Preprocessing pipeline for raw extracted text:**
1. Per-page extraction with coordinate metadata (PyMuPDF `get_text("dict")`)
2. Header/footer removal by y-coordinate threshold + regex on repetitive text
3. Multi-column reading order correction (sort blocks by x-bin, then y)
4. Dehyphenation: `re.sub(r'(\w)-\n(\w)', r'\1\2', text)`
5. Language detection + separation at paragraph level (fastText `lid.176.bin`)
6. Section segmentation (see below)
7. Table extraction as a **separate** Camelot pipeline — do not rely on narrative text extraction

**Finding the materiality assessment section:**
1. Parse embedded PDF bookmarks: `fitz.Document.get_toc()` → match `["material", "materiality", "significant issue"]`
2. Fallback: font size/weight heading detection via `get_text("dict")` → font size > 13 and bold flag
3. Page cross-reference from GRI content index entries for GRI 3 disclosures
4. Use `reportparse` library (`github.com/climate-nlp/reportparse`) which automates this with a `standard_keyword` annotator

---

## Question 3: Best Academically Validated Text Methods

### PDF Extraction Tools — Ranked for Sustainability Reports

| Task | Best Tool | Why |
|---|---|---|
| Narrative text (native PDF) | **PyMuPDF + pymupdf4llm** | Fastest; layout metadata; best character accuracy (arXiv 2410.09871 benchmark); `pymupdf4llm` gives clean Markdown with heading hierarchy |
| Section heading detection | **PyMuPDF `get_text("dict")`** | Returns font size and bold flags enabling heading identification |
| GRI content index tables (ruled) | **Camelot (Lattice mode)** | 85–95% cell accuracy on bordered tables; purpose-built for PDF table extraction |
| Complex multi-column layouts | **Docling** | DocLayNet + TableFormer; 97.9% table accuracy (Procycons benchmark 2025); actively maintained by IBM Research (37k+ GitHub stars) |
| Scanned PDF recovery | **PaddleOCR 3.0 / PP-OCRv5** | Best open-source OCR for Traditional Chinese + English; PP-StructureV3 adds reading order |
| Materiality matrix images | **GPT-4o Vision or Claude 3.5 Sonnet** | Best VLM for structured chart data extraction; handles bilingual labels |
| RAG pipeline ingestion | **Docling → Markdown** | Clean chunked output for downstream LLM analysis |

**Published benchmark:** arXiv 2410.09871 (Adhikari & Agarwal, 2024) — most comprehensive PDF parsing tool comparison including financial report category (closest proxy to sustainability reports).

---

### NLP Methods for Materiality Topic Identification

#### Method Comparison

| Method | Precision/Recall | Training Data Needed? | Multilingual? | Best For |
|---|---|---|---|---|
| Keyword/dictionary matching | High precision (>90%), low recall | No | Yes (with translated dict) | Fast filter for candidate paragraphs |
| LDA topic modelling | Moderate; unstable with short texts | No (unsupervised) | With multilingual tokeniser | Exploratory only |
| BERTopic (zero-shot mode) | ~0.65–0.75 F1 at topic level | No | Via multilingual embeddings | Practical baseline without labelled data |
| Zero-shot NLI (XLM-RoBERTa-XNLI) | ~0.65–0.75 F1 (E/S/G level) | No | Yes (100 languages) | Broad E/S/G pillar classification |
| FinBERT-ESG-9-Categories | ~0.72–0.83 F1 across 9 categories | Yes (14k sentences) | English only | Best off-the-shelf 9-category classifier |
| Fine-tuned BERT (GRI-specific) | Highest (task-dependent) | Yes (GRI-labelled corpus) | Multilingual with XLM-RoBERTa | Gold standard if labelled data available |

---

#### Pre-Trained Models Relevant to This Study

**ClimateBERT** (Webersinke et al., AAAI 2022 / arXiv 2110.12010)
- Base: DistilRoBERTa; trained on 2M+ climate-related paragraphs
- Validated for: climate-relevance detection (binary), climate sentiment (risk/opportunity/neutral), net-zero commitment detection
- **Appropriate for semiconductor study?** Yes for environmental/climate topics (GRI 302, 303, 305). Not validated for social or governance topics.
- Hugging Face: `climatebert/distilroberta-base-climate-f`

**FinBERT-ESG-9-Categories** (`yiyanghkust/finbert-esg-9-categories`)
- 9 classes: Climate Change, Natural Capital, Pollution & Waste, Human Capital, Product Liability, Community Relations, Corporate Governance, Business Ethics & Values, Non-ESG
- **Best off-the-shelf model for full GRI coverage** at coarse category level
- English only; no Traditional Chinese support

**ESG-BERT** (Mukherjee et al., arXiv 2203.16788)
- Trained on A4S Knowledge Hub text; validated for E/S/G pillar-level classification
- Limited adoption; weakly validated for GRI topic-level (vs. pillar-level)

**ESGLens** (arXiv 2604.19779, 2026)
- RAG framework: PDF → FAISS vector store → GRI-guided retrieval → GPT-4 summarisation → ESG score regression
- Most recent (2026); highest performance on structured GRI extraction; requires OpenAI API

**For multilingual (English + Traditional Chinese):**
- `intfloat/multilingual-e5-large-instruct` — best for semantic search across bilingual chunks (arXiv 2402.05672)
- `joeddav/xlm-roberta-large-xnli` — zero-shot classification, 100 languages
- **Workflow:** Embed all paragraphs with multilingual-e5-large → retrieve top-k paragraphs per GRI topic label → classify with XLM-RoBERTa zero-shot

---

#### Extracting Materiality Matrix Data from Images

Materiality matrices are scatter plot images — not extractable tables. Approach:

1. **Detect matrix pages:** `page.get_images()` in PyMuPDF → flag pages with images larger than 40% of page area
2. **Extract image:** `mat = fitz.Matrix(3, 3)` for 3× zoom → save as high-resolution PNG
3. **Send to VLM with structured prompt:**
   > "This is a materiality matrix scatter plot. List all visible topic labels with their approximate position as (x, y) on a scale of 0–10, where x=0 is leftmost and y=0 is bottommost. Return a JSON array: [{topic: ..., x: ..., y: ..., confidence: ...}]"
4. **Cross-validate:** Topic names from the image should match those listed in the narrative section — any VLM hallucinations are detectable this way
5. **For axis labels only:** Use PaddleOCR 3.0 (PP-OCRv5) — supports Traditional Chinese; `pip install paddlepaddle paddleocr`

**Published benchmark:** MMESGBench (arXiv 2507.18932, July 2025) — 933 QA pairs from ESG documents including charts; shows multimodal VLMs substantially outperform text-only models on visual ESG content.

---

#### Inter-Rater Reliability Standards

| Statistic | Threshold | When to Use |
|---|---|---|
| Cohen's Kappa (κ) | ≥ 0.70 (floor); ≥ 0.80 (preferred) | 2 coders, categorical data |
| Krippendorff's Alpha (α) | ≥ 0.667 (exploratory); ≥ 0.800 (definitive) | > 2 coders, ordinal/interval data, missing values |
| Weighted Kappa | Same thresholds | Ordinal categories (topic tiers 1/2/3) |
| Fleiss' Kappa | ≥ 0.70 | 3+ coders, categorical data |

**Practical workflow:** Code a random 15–20% subsample independently with a second coder → compute κ and α → resolve disagreements through adjudication session → re-test on a new 10% holdout → report all rounds in methodology section.

**R packages:** `irr` ≥ 0.84.1 (`kappa2()`, `kappam.fleiss()`); `psych` ≥ 2.4.3 (`cohen.kappa()`)  
**Python:** `sklearn.metrics.cohen_kappa_score()`; `krippendorff` package

**Key papers establishing these thresholds:**
- Landis & Koch (1977), *Biometrics* — κ interpretation scale (most cited)
- Lombard, Snyder-Duch & Bracken (2002), *Human Communication Research* — content analysis standards
- Krippendorff (2004), *Content Analysis* (2nd ed.) — α thresholds

---

#### Key Academic Methods Papers (Summary)

| Authors | Year | Journal | Relevance |
|---|---|---|---|
| Beske, Haustein & Lorson | 2020 | SAMPJ | Binary materiality disclosure index; 132 GRI reports; G4 vs. GRI Standards comparison |
| Machado | 2021 | CSR&EM | 22-indicator materiality transparency scheme; validated coding instrument |
| Padilla-Garrido et al. | 2024 | CSR&EM | MDA index; GRI topic alignment methodology; OLS regression determinants |
| Garst, Maas & Suijs | 2022 | Cal. Mgmt Rev. | Six-step materiality assessment framework; cherry-picking and win-win bias evidence |
| Hahn & Kühnen | 2013 | J. Cleaner Prod. | Standard control variables; 3-tier dependent variable structure (adopt/extent/quality) |
| Baier, Berninger & Kiesel | 2020 | FM&I | 482-term ESG dictionary; 40 subcategories across E/S/G; validated against ESG events |
| Smeuninx, De Clerck & Aerts | 2020 | IJBC | Corpus NLP on 2.75M-word sustainability report corpus; readability benchmarks |
| Schimanski et al. | 2024 | Finance Res. Lett. | 3 transformer NLP classifiers (E/S/G); validated against Refinitiv ESG ratings, 2,500 reports |
| Gutierrez-Bustamante et al. | 2022 | Sustainability (MDPI) | NLP scoring 550 GRI reports (G3/G4/Standards); LSA, GloVe, TF-IDF benchmark |
| Guerini et al. | 2022 | ACL/CsrNLP | Automated GRI index mapping; semi-automated topic-to-standard alignment |
| van der Waal et al. | 2024 | BAR | Longitudinal content analysis G3→G4→GRI Standards; quality vs. quantity growth |

---

## Question 4: Tests to Track Before/After GRI 3 Topic Selection

GRI 3: Material Topics (2021) was **effective January 2023**. The treatment event is the first fiscal year a company reports under GRI Universal Standards 2021.

---

### Test Suite

#### Test 4.1 — Topic Count Change (Pre-2023 vs. Post-2023)

**Research question:** Did the total number of disclosed material topics change after GRI 3 adoption?

**Recommended primary test: Two-way Fixed Effects Poisson Regression**

```r
# R: fixest package >= 0.12.0
library(fixest)
feglm(topics_total_n ~ PostGRI3_it + ln_total_assets + roa |
        company_id + fiscal_year,
      family = "poisson",
      data = panel_df,
      cluster = ~company_id)
```

- Poisson FE is consistent without distributional assumptions (Wooldridge 1999)
- Firm FE controls time-invariant heterogeneity; year FE controls aggregate trends
- Test for over-dispersion: Cameron & Trivedi (1990) — use Negative Binomial if detected

**Secondary (non-parametric, within-firm):** Wilcoxon Signed-Rank Test — does not handle panel structure but useful as descriptive validation.

**Python:** `pyfixest` ≥ 0.18.0 (`pf.feglm()`); `statsmodels` ≥ 0.14 (`PoissonFixed`)

---

#### Test 4.2 — Topic Category Composition Shifts (% E vs. % S vs. % G)

**Research question:** Did the relative proportion of environmental, social, and governance topics change?

Topic proportions sum to 1 by construction — standard regression on raw shares violates OLS assumptions (closure problem). Use **Isometric Log-Ratio (ILR) transformation** (Aitchison 1982; Egozcue et al. 2003).

**Step 1 — ILR transform:**
```python
# Python: skbio.stats.composition
from skbio.stats.composition import ilr
# Or: R compositions package
library(compositions)
ilr_coords <- ilr(cbind(env_pct, soc_pct, gov_pct))
```

**Step 2 — Seemingly Unrelated Regression (SUR) on ILR coordinates:**
```r
library(systemfit)  # >= 1.1-30
eq1 <- ILR1 ~ PostGRI3 + ln_total_assets + roa
eq2 <- ILR2 ~ PostGRI3 + ln_total_assets + roa
sur_result <- systemfit(list(eq1, eq2), method = "SUR", data = panel_df)
```

Joint Wald test on (β1, β2) simultaneously. Report back-transformed proportions for interpretation.

**For single proportions as secondary analysis:** Fractional logit model (Papke & Wooldridge 1996) with firm FE.

**Key packages:** R: `compositions` ≥ 2.0-6; `systemfit` ≥ 1.1-30; Python: `skbio` ≥ 0.5.9

---

#### Test 4.3 — Materiality Matrix Format Change (Binary)

**Research question:** Did the probability of showing a materiality matrix change post-GRI 3? (GRI explicitly deprioritised the 2×2 matrix in its 2021 revision.)

**Panel test: Conditional Logistic Regression with Firm Fixed Effects**
```r
library(survival)  # base R
clogit(matrix_shown ~ PostGRI3 + strata(company_id), data = panel_df)
```

**Within-firm pre/post (single comparison):** McNemar Test — tests whether discordant pairs (Yes→No vs. No→Yes) are symmetric:
```r
mcnemar.test(table_of_paired_observations)
```

**Linear Probability Model as robustness check:** `feols(matrix_shown ~ PostGRI3 | company_id + fiscal_year, data = panel_df)`

---

#### Test 4.4 — Staggered GRI 3 Adoption (Heterogeneous Treatment Timing)

**This is the most methodologically critical test.** Companies adopted GRI 3 in different years (some FY2022, most FY2023, some FY2024). Naïve TWFE DiD is biased under treatment effect heterogeneity (Goodman-Bacon 2021 decomposition problem).

**Tier 1 application (H1–H4):** Full TWSE universe; ~1,200 treated companies; panel 2021–2024; adoption cohorts: 14 × 2021, 868 × 2022, 309 × 2023, ~26 × 2024. Control group = not-yet-treated companies within the same panel. Run separately for each outcome (`n_material_topics_b`, `process_quality_score`, `assurance_level`). H4 requires subsample runs for High vs Low `impact_intensity`.

**Tier 2 application (H5):** Semiconductor sub-cohort; 73 companies; 507 company-years 2016–2024. Interaction-weighted CS21 with TSMC-proximity indicator as treatment modifier.

**Primary estimator: Callaway & Sant'Anna (2021) — Doubly-Robust Group-Time ATT**

```r
library(did)  # >= 2.1.2
out <- att_gt(
  yname       = "n_material_topics_b",   # or process_quality_score, assurance_level
  tname       = "fiscal_year",
  idname      = "company_id",
  gname       = "gri_adoption_year",     # 0 for never-treated
  xformla     = ~ ln_total_assets + roa + board_approved + standalone_sr,
  control_group = "notyettreated",
  est_method  = "dr",                    # doubly-robust
  data        = panel_df                 # full TWSE panel (Tier 1) or semicon sub-cohort (H5)
)
aggte(out, type = "dynamic")  # event-study aggregation
ggdid(out)                     # visualise
```

**Secondary estimator: Sun & Abraham (2021) — Interaction-Weighted**
```r
feols(topics_total_n ~ sunab(gri3_adoption_year, fiscal_year) +
        ln_total_assets + roa | company_id + fiscal_year,
      cluster = ~company_id, data = panel_df)
```

**Tertiary estimator: Borusyak, Jaravel & Spiess (2024) — Imputation**
```r
library(didimputation)  # >= 0.2.0
did_imputation(data = panel_df, yname = "topics_total_n",
               gname = "gri3_adoption_year", tname = "fiscal_year",
               idname = "company_id", horizon = TRUE)
```

**Pre-trend sensitivity (HonestDiD):**
```r
library(HonestDiD)  # >= 0.2.6
createSensitivityResults(betahat, sigma, numPrePeriods, numPostPeriods,
                          Mvec = seq(0, 1, by = 0.1))
```

**Decision rule:** Report CS21 as primary; SA21 and BJS24 as robustness checks. If all three agree directionally, the result is robust — standard practice in the post-2021 staggered DiD literature.

**Citations:**
- Callaway & Sant'Anna (2021), *Journal of Econometrics*, 225(2), 200–230
- Sun & Abraham (2021), *Journal of Econometrics*, 225(2), 175–199
- Borusyak, Jaravel & Spiess (2024), *Review of Economic Studies*, 91(6), 3253–3285
- Roth (2022), *American Economic Review: Insights*, 4(3), 305–322

**Methodological analogue published studies:**
- Aluchna, Roszkowska-Menkes & Kamiński (2023), *Meditari* — DiD + ITS on NFRD → ESG performance; closest design to GRI 3 study
- India BRSR PSM-DiD study (2026), *Finance Research Letters* — gold-standard PSM-DiD design for mandatory disclosure research

---

#### Test 4.5 — Topic-Level Adoption (Each Canonical Topic Pre/Post GRI 3)

**Research question:** For each canonical topic k, did its probability of disclosure change post-GRI 3?

**Data structure:** Binary panel — `topic_k_disclosed_it ∈ {0,1}` for each firm-year-topic.

**Recommended approach:**
- **Conditional logistic regression** (`survival::clogit()`) for each topic k — requires within-firm variation
- **GEE with logit link** (`geepack::geeglm()`) for population-average interpretation
- **Multiple testing correction:** Benjamini-Hochberg FDR at q = 0.10 across K topics

```r
library(geepack)
library(p.adjust)

# For each topic k:
fit_k <- geeglm(topic_k_disclosed ~ PostGRI3 + ln_total_assets + roa,
                id = company_id, family = binomial, corstr = "exchangeable",
                data = panel_df)

# FDR correction across K tests:
p_adjusted <- p.adjust(raw_p_values, method = "BH")
```

---

#### Interrupted Time Series (ITS) — Robustness Check

For annual reports with ≥ 8 pre-2023 time points:
```
Y_it = β₀ + β₁(time) + β₂(PostGRI3) + β₃(time × PostGRI3) + covariates + ε
```
- β₂ captures immediate level change
- β₃ captures slope change post-GRI 3
- Minimum: 8 pre + 4 post time points (Kontopantelis et al. 2015, *BMJ*)

---

### Standard Control Variables (Canonical Set)

From Hahn & Kühnen (2013) review of 178 studies:

| Variable | Expected Direction | Operationalisation |
|---|---|---|
| Firm size | + | log(total assets) |
| Profitability | + | ROA |
| Leverage | Ambiguous | Debt / equity |
| Industry sector | + for high-impact | GICS/SIC dummies |
| Ownership structure | + for foreign/institutional | % foreign ownership |
| Dual listing | + | NYSE/NASDAQ ADR binary |
| ESG rating (lagged) | + | MSCI or Sustainalytics |
| Assurance | + | Third-party verification binary |
| GRI version | + for higher | G4 / Standards / GRI 3 ordinal |
| Report age (years since first GRI report) | + | Learning curve proxy |
| Paid-in capital | + | TWSE-specific threshold variable |

---

## Question 5: Coding Framework for Global Comparison

### Unit of Analysis

For cross-company panel studies, use **binary presence/absence** (topic disclosed = 1 or 0) as the primary unit. Topic count is the continuous dependent variable in regression models.

| Unit | Description | Use Case |
|---|---|---|
| Binary presence/absence | Topic disclosed (1) or not (0) | Most tractable; publication standard |
| Topic count | Sum of binary indicators | Continuous DV in regression |
| Ordinal ranking | Priority tier (1/2/3) | Within-company temporal comparison |
| Continuous (word count) | Words devoted to topic | Disclosure depth proxy |

---

### Canonical 35-Topic Semiconductor Taxonomy

Integrates TSMC, Samsung, Intel, Infineon, STMicroelectronics, ON Semiconductor materiality practices, cross-referenced with GRI Topic Standards and SASB Semiconductors standard (TC-SC).

#### Domain E: Environmental (11 topics)

| Code | Canonical Topic | GRI Standard | SASB TC-SC | Typical Labels |
|---|---|---|---|---|
| E01 | Energy Management & Efficiency | GRI 302 | TC-SC-130a | "Energy consumption," "Renewable energy" |
| E02 | GHG Emissions (Scope 1/2) | GRI 305 | TC-SC-110a | "Climate change," "Carbon emissions" |
| E03 | Scope 3 / Value Chain Emissions | GRI 305 | — | "Supply chain carbon," "Product footprint" |
| E04 | Water Management | GRI 303 | TC-SC-140a | "Water stewardship," "Water recycling" |
| E05 | Wastewater & Effluents | GRI 303-4 | TC-SC-140a | "Effluent discharge," "Water quality" |
| E06 | Hazardous Chemical Management | GRI 306/301 | TC-SC-150a | "Chemical safety," "PFAS," "Restricted substances" |
| E07 | Waste Management & Recycling | GRI 306 | TC-SC-150a | "Industrial waste," "Zero waste to landfill" |
| E08 | Air Quality & Atmospheric Emissions | GRI 305-7 | — | "VOC," "PFC," "Chamber gases," "NOx/SOx" |
| E09 | Biodiversity | GRI 304 | — | "Ecosystem impact," "Land use" (low salience for fabs) |
| E10 | Climate Risk & Resilience | GRI 201-2 / TCFD | — | "Physical climate risk," "Transition risk" |
| E11 | Circular Economy / Product Lifecycle | GRI 301 | TC-SC-410a | "Materials efficiency," "Product take-back" |

#### Domain S: Social (12 topics)

| Code | Canonical Topic | GRI Standard | SASB TC-SC | Typical Labels |
|---|---|---|---|---|
| S01 | Occupational Health & Safety | GRI 403 | TC-SC-320a | "Workplace safety," "TRIR," "Injury rate" |
| S02 | Labour Practices & Working Conditions | GRI 401/402 | — | "Working hours," "Wage equity" |
| S03 | Diversity, Equity & Inclusion | GRI 405 | — | "Gender diversity," "D&I" |
| S04 | Employee Training & Development | GRI 404 | — | "Learning hours," "Skills training" |
| S05 | Talent Attraction & Retention | GRI 401 | — | "Employee engagement," "Turnover rate" |
| S06 | Supply Chain Social Standards / RBA | GRI 414 | TC-SC-440a | "Supplier labour standards," "RBA Code audit" |
| S07 | Supply Chain Human Rights | GRI 412/407-409 | TC-SC-440a | "Forced labour," "Modern slavery" |
| S08 | Conflict / Responsible Minerals | GRI 301/408 | TC-SC-440a | "3TG," "Cobalt," "Responsible sourcing" |
| S09 | Community Engagement & Impact | GRI 413 | — | "Local community," "Social investment" |
| S10 | Customer / Product Safety | GRI 416 | TC-SC-410a | "RoHS/REACH," "Product compliance" |
| S11 | Human Rights (Broad) | GRI 412 | — | "Human rights assessment," "Due diligence" |
| S12 | Freedom of Association | GRI 407 | — | "Collective bargaining" (low salience Taiwan) |

#### Domain G: Governance / Economic (12 topics)

| Code | Canonical Topic | GRI Standard | SASB TC-SC | Typical Labels |
|---|---|---|---|---|
| G01 | Corporate Governance | GRI 2 (Universal) | — | "Board structure," "Governance framework" |
| G02 | Business Ethics & Anti-Corruption | GRI 205/206 | — | "Anti-bribery," "Code of conduct" |
| G03 | Risk Management | GRI 2-25 | — | "Enterprise risk," "ESG risk management" |
| G04 | Data Privacy & Cybersecurity | GRI 418 | TC-SC-520a | "Information security," "Data protection," "PDPA" |
| G05 | Intellectual Property Protection | GRI 206 (adjacent) | TC-SC-520a | "IP management," "Trade secrets" |
| G06 | Product Quality & Reliability | GRI 416 | — | "Quality management," "Defect rate" |
| G07 | Innovation & R&D | GRI 201 (adjacent) | — | "Technology innovation," "R&D investment" |
| G08 | Economic Performance | GRI 201 | — | "Economic value," "Financial resilience" |
| G09 | Indirect Economic Impacts | GRI 203 | — | "Local procurement," "Economic contribution" |
| G10 | Tax Transparency | GRI 207 | — | "Tax policy," "Country-by-country reporting" |
| G11 | Supply Chain Management (Operational) | GRI 204 | — | "Supplier qualification," "Supplier diversity" |
| G12 | Export Controls & Trade Compliance | GRI 205 (adjacent) | — | "Sanctions compliance," "Trade restrictions" |

**Total: 35 canonical topics** (11E + 12S + 12G)

For TWSE semiconductor studies, approximately **20–25 of these 35 topics** will appear with sufficient frequency (>20% of company-years) to support statistical analysis.

---

### SASB Semiconductors (TC-SC) vs. GRI: The 8 Financially Material Topics

SASB designates 8 disclosure topics as financially material for semiconductor companies. All 8 overlap with GRI topic standards, enabling a formal test of whether SASB-designated topics are more stable across the GRI 3 transition:

| SASB Topic | SASB Code | GRI Mapping | Canonical Code(s) |
|---|---|---|---|
| Greenhouse Gas Emissions | TC-SC-110a | GRI 305 | E02 |
| Energy Management | TC-SC-130a | GRI 302 | E01 |
| Water Management | TC-SC-140a | GRI 303 | E04, E05 |
| Waste Management | TC-SC-150a | GRI 306 | E06, E07 |
| Worker Health & Safety | TC-SC-320a | GRI 403 | S01 |
| Product Lifecycle Management | TC-SC-410a | GRI 301/306/416 | E11, S10 |
| Materials Sourcing (Conflict Minerals) | TC-SC-440a | GRI 301/204/414 | S06, S07, S08 |
| IP Protection & Competitive Behaviour | TC-SC-520a | GRI 206/418 | G04, G05 |

**Flag each topic in your dataset:** `sasb_designated` (binary) — enables testing whether SASB-classified topics show different pre/post GRI 3 adoption patterns than non-SASB topics.

**Official cross-reference:** GRI–SASB Joint Publication (April 2021): globalreporting.org/media/mlkjpn1i/gri-sasb-joint-publication-april-2021.pdf

---

### Handling Topic Heterogeneity: Three-Stage Mapping Pipeline

Companies use variable labels for the same underlying issue. Map all labels to the canonical taxonomy using a three-stage pipeline:

**Stage 1 — Fuzzy String Matching (Automated, accept ≥ 85 similarity):**
```python
from rapidfuzz import process, fuzz  # rapidfuzz >= 3.6.0

match = process.extractOne(
    query = raw_label,
    choices = canonical_labels,
    scorer = fuzz.token_sort_ratio,
    score_cutoff = 85
)
```

**Stage 2 — Semantic Embedding Similarity (For 70–84 range):**
```python
from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer('intfloat/multilingual-e5-large-instruct')
raw_emb = model.encode(raw_labels)
canonical_emb = model.encode(canonical_labels)
cos_sim = np.dot(raw_emb, canonical_emb.T) / (
    np.linalg.norm(raw_emb, axis=1)[:, None] *
    np.linalg.norm(canonical_emb, axis=1)[None, :])
# Accept if cosine similarity >= 0.75
```

**Stage 3 — Manual Concordance Table (For residual unmatched < 70):**

Maintain a permanent CSV: `raw_label | company_id | canonical_code | canonical_label | match_method | coder_id | date_coded | notes`

All Stage 3 entries require two independent coders (inter-rater reliability check). Publish the concordance table as supplementary data — follows replication standard of Eccles & Serafeim (2013) and Ioannou & Serafeim (2012).

---

### Cross-Country Validation: GRI–SASB–ESRS Concordance

| Dimension | Coverage | How It Helps |
|---|---|---|
| GRI Topic Standard codes | All 35 canonical topics | Primary anchor for TWSE/GRI reporters |
| SASB TC-SC codes | 8 financially material topics | Enables comparison with US SASB reporters |
| ESRS topic categories | E1-E5, S1-S4, G1 | Enables comparison with EU CSRD reporters |
| GICS 45301020 | Company universe filter | Ensures peer group consistency |

For global peer comparison, code each topic along all three dimensions where applicable. Companies in the TWSE universe use GRI; US peers may use SASB; EU peers (ASML, Infineon, STMicro) use ESRS. The triple coding enables cross-framework comparison via the canonical code as the common key.

---

## The Semiconductor Peer Universe

### TWSE Semiconductor Companies (Core Study Universe)

**Key companies with 5+ years of GRI reports (pre/post GRI 3 comparison window available):**

| Company | Ticker | Type | GRI Since |
|---|---|---|---|
| TSMC | 2330 | Foundry | 2007 |
| UMC | 2303 | Foundry | 2009 |
| MediaTek | 2454 | Fabless | 2014 |
| ASE Group | 3711 | OSAT | 2012 |
| Winbond | 2344 | Memory IDM | 2015 |
| Nanya Technology | 2408 | Memory IDM | 2015 |
| Macronix | 2337 | NOR Flash IDM | 2013 |
| Novatek | 3034 | Fabless | 2016 |
| Realtek | 2379 | Fabless | 2016 |
| VIS | 5347 | Foundry | 2016 |
| King Yuan Electronics | 2449 | OSAT | 2016 |
| ChipMOS | 8150 | OSAT | 2017 |

**Total TWSE semiconductor companies:** ~136 (Disfold list); all now mandated to file sustainability reports (2025 universal mandate).

---

### Global Peer Universe

#### Recommended inclusion by segment:

| Segment | Include in Core? | Rationale |
|---|---|---|
| IDMs (Intel, TI, Analog Devices) | Yes | Direct design + manufacturing peers |
| Pure-play foundries (GF) | Yes | TSMC/UMC peers |
| Fabless (Nvidia, Qualcomm, MediaTek) | Yes | Direct design peers |
| OSAT (Amkor, ASE) | Yes (borderline) | Share fab-adjacent E topics |
| Equipment (ASML, Lam, KLA, TEL) | Separate analysis | Different materiality profile |
| Materials (Shin-Etsu, Sumco) | Separate analysis | GICS Chemicals, not Semiconductors |

#### Global peers with confirmed GRI-aligned materiality assessments:

| Company | Country | Exchange | Report Access | GRI Since |
|---|---|---|---|---|
| Intel | USA | Nasdaq | intel.com/corporate-responsibility | 2008 |
| Texas Instruments | USA | Nasdaq | ti.com/about-ti/citizenship-community | 2006 |
| Qualcomm | USA | Nasdaq | qualcomm.com/company/corporate-responsibility/documents | 2016 |
| Nvidia | USA | Nasdaq | nvidia.com/en-us/foundation/archives/ | FY2020 |
| Applied Materials | USA | Nasdaq | appliedmaterials.com (Impact Report) | 2014 |
| KLA Corporation | USA | Nasdaq | kla.com/company/corporate-responsibility | 2018 |
| Analog Devices | USA | Nasdaq | analog.com/corporate-social-responsibility | 2018 |
| Marvell Technology | USA | Nasdaq | marvell.com/company/sustainability/reports-and-policies | FY2022 |
| ON Semiconductor | USA | Nasdaq | onsemi.com/company/esg | 2019 |
| ASML | Netherlands | Euronext/Nasdaq | asml.com/en/investors/annual-report/2025/sustainability | 2010 |
| Infineon | Germany | Frankfurt | infineon.com/sustainability | 2005 |
| STMicroelectronics | Switzerland/France | Euronext/NYSE | st.com/about/sustainability | 2007 |
| NXP Semiconductors | Netherlands | Nasdaq | nxp.com/sustainability | 2015 |
| ams OSRAM | Austria | SIX | ams-osram.com/sustainability (first full report 2024) | 2021 |
| Samsung Semiconductor | South Korea | KRX | samsung.com/global/sustainability | 2008 |
| SK Hynix | South Korea | KRX | sustainability.skhynix.com | 2011 |
| Tokyo Electron | Japan | TSE | tel.com/sustainability/ | 2008 |
| Shin-Etsu Chemical | Japan | TSE | shinetsu.co.jp/en/sustainability | 2010 |
| Renesas | Japan | TSE | renesas.com/en/about/sustainability/report2024 | 2015 |
| GlobalFoundries | USA/Singapore | Nasdaq | gf.com/about-us/corporate-responsibility/ | 2019 |

---

### Data Access Routes

**For sustainability report PDFs:**
- Company IR pages (most reliable primary source)
- `responsibilityreports.com` — aggregated PDF archive
- GRI report registration: `globalreporting.org/search/` (voluntary registry; historical database at `database.globalreporting.org` covers to December 2020)

**For structured ESG data (free/low-cost for academic researchers):**

| Source | Coverage | Cost | Best For |
|---|---|---|---|
| **TEJ (Taiwan Economic Journal)** | 2,462 TWSE companies; 70+ variables; 600+ fields; SASB-authorised | Subscription (university license) | TWSE-specific structured data |
| **CDP** | Climate, water, forests; most major semicon companies | Free with researcher registration | Climate/water quantitative data |
| **UN Global Compact** | Communication on Progress reports | Free | GRI report links for UNGC members |
| **SASB Navigator** | Industry-specific material topics (Semiconductors TC-SC) | Free | Benchmark material topics |
| **Sustainalytics (Morningstar)** | ESG Risk Ratings; public summary scores | Free summaries | ESG rating control variable |
| **Wikirate** | Open GRI metric extraction, crowd-sourced | Free | Structured GRI data for some companies |
| **S&P Global Sustainable1** | ESG scores, 15,000+ companies | Partial free access | Additional ESG rating |

---

## Implementation Checklist

1. **Data collection:** TEJ for TWSE firms; Compustat Global/Bloomberg for global peers; PDF archive per company IR pages
2. **PDF extraction:** PyMuPDF (`pymupdf4llm`) for text → Camelot for GRI content index tables → VLM (GPT-4o/Claude) for materiality matrix images
3. **Text preprocessing:** Header/footer removal → dehyphenation → language detection → section segmentation → table separation
4. **Topic coding:** Stage 1 RapidFuzz → Stage 2 multilingual-e5-large → Stage 3 manual concordance table
5. **Inter-rater reliability:** Code 20% subsample with second coder → compute Cohen's κ and Krippendorff's α → target κ ≥ 0.80 before full coding
6. **Pre-analysis checks:** Winsorise financial controls; test for zero inflation in topic counts; run Goodman-Bacon decomposition to inform staggered DiD estimator choice
7. **Primary statistical analysis:** CS21 staggered DiD via R `did` package (doubly-robust, not-yet-treated control); ILR + SUR for compositional shifts; conditional logit for matrix format change; GEE + BH-FDR for topic-level battery
8. **Pre-trend sensitivity:** Event-study plot + HonestDiD sensitivity bounds
9. **Robustness checks:** SA21 and BJS24 staggered DiD estimators; ITS segmented regression
10. **Reliability reporting:** Report all rounds of κ/α testing; publish concordance table as supplementary data

---

## Key Sources

- [GRI 3: Material Topics 2021 (PDF)](https://globalreporting.org/pdf.ashx?id=12453)
- [GRI–SASB Joint Publication (2021)](https://www.globalreporting.org/media/mlkjpn1i/gri-sasb-joint-publication-april-2021.pdf)
- [SASB Semiconductors (TC-SC) Standard](https://sasb.ifrs.org/standards/download/)
- [Callaway & Sant'Anna (2021) R did package](https://bcallaway11.github.io/did/)
- [Docling: IBM Research PDF parser (GitHub)](https://github.com/docling-project/docling)
- [ReportParse: NLP tool for sustainability reports (GitHub)](https://github.com/climate-nlp/reportparse)
- [ClimateBERT (Hugging Face)](https://huggingface.co/climatebert/distilroberta-base-climate-f)
- [FinBERT-ESG-9-Categories (Hugging Face)](https://huggingface.co/yiyanghkust/finbert-esg-9-categories)
- [multilingual-e5-large-instruct (Hugging Face)](https://huggingface.co/intfloat/multilingual-e5-large-instruct)
- [TWSE ESG InfoHub](https://esg.twse.com.tw/ESG/front/en/)
- [TEJ TESG Sustainability Dataset](https://www.tejwin.com/en/news/tesg-sustainability-dataset/)
- [PaddleOCR 3.0 (GitHub)](https://github.com/PaddlePaddle/PaddleOCR)
- [PDF Parsing Tools Benchmark (arXiv 2410.09871)](https://arxiv.org/abs/2410.09871)
- [Beske et al. (2020), SAMPJ](https://www.emerald.com/insight/content/doi/10.1108/SAMPJ-12-2018-0343/full/html)
- [Machado (2021), CSR&EM](https://onlinelibrary.wiley.com/doi/abs/10.1002/csr.2066)
- [Padilla-Garrido et al. (2024), CSR&EM](https://onlinelibrary.wiley.com/doi/full/10.1002/csr.2866)
- [Hahn & Kühnen (2013), J. Cleaner Prod.](https://www.sciencedirect.com/science/article/abs/pii/S0959652613004654)
- [Aluchna et al. (2023), Meditari](https://www.emerald.com/insight/content/doi/10.1108/MEDAR-12-2021-1530/full/html)

---

*Report compiled: May 15, 2026 | Updated: June 9, 2026 | Two-tier design adopted (H1–H4 full TWSE universe; H5 semiconductor deep dive) | Research coordinated across four specialist streams: academic methods literature, statistical design, technical NLP/extraction tooling, and semiconductor peer universe mapping.*

---

## Supplementary Research Update — May 18, 2026

*This section was added after a second research coordination pass and covers six topic areas the original guide left unaddressed: (1) regulatory updates that shift the sample frame, (2) new GRI topic standards that affect the canonical taxonomy, (3) formal methods for handling unbalanced panels and zero-inflation, (4) power analysis, (5) new NLP models and tooling, and (6) research workflow standards (pre-registration, replication packages, publication venues).*

---

### S1. TWSE/FSC Regulatory Updates (Critical for Sample Design)

**2025 universal mandate — now in effect.** As of August 31, 2025, all TWSE- and TPEx-listed companies must file sustainability reports annually, eliminating the prior paid-in capital threshold for basic GRI/ESG disclosure. This expands the available sample from the ~136 large-cap TWSE semiconductor companies to the full universe.

**IFRS Sustainability Disclosure Standards (IFRS S1/S2) — phased from FY2026.** Taiwan's FSC has mandated IFRS S1 and S2 alongside, not instead of, GRI reports in a phased rollout:

| Stage | Paid-In Capital | Must apply from | Filing deadline |
|---|---|---|---|
| Stage 1 | > NT$10 billion | FY2026 | March 16, 2027 |
| Stage 2 | > NT$5B and ≤ NT$10B | FY2026 | March 16, 2027 |
| Stage 3 | < NT$5 billion | FY2027 | March 2028 |

**Implication for study design:** FY2026 data will contain a dual treatment — GRI 3 adoption (already captured) *and* IFRS S1/S2 first adoption. Treat FY2026 with caution as a "polluted" post-period year when ISSB adoption coincides with GRI 3 for Stage 1/2 firms. Consider censoring FY2026 in primary analysis and using it only as a robustness check, or adding an `ifrs_s1_adopted` indicator to the regression as a covariate.

**Semiconductor-specific enhanced disclosure.** The FSC guidance explicitly requires semiconductor companies to disclose industry-specific sustainability metrics beyond the general mandate. Monitor FSC bulletins for the sector-specific metric list; this may require adding a variable `fsc_sector_metrics_disclosed` (binary) to Block C.

**Key sources:**
- [FSC Phased IFRS S Disclosure Implementation Notice (Nov 2025)](https://www.sfb.gov.tw/en/home.jsp?id=78&parentpath=0,4&mcustomize=multimessage_view.jsp&dataserno=202511110006&dtable=News)
- [Mondaq: Phased Implementation from FY2026](https://www.mondaq.com/corporate-and-company-law/1666174/phased-implementation-of-requirement-to-disclose-sustainability-related-financial-information-in-their-annual-reports-for-twse-and-tpex-listed-companies-in-taiwan-starting-from-fy2026)
- [Lexology: 2025 Mandate — All Listed Companies](https://www.lexology.com/library/detail.aspx?g=3d2c62bc-c1ef-46aa-8d3d-d9cd7ee57395)

---

### S2. New GRI Topic Standards Affecting the Canonical Taxonomy

**GRI 102: Climate Change 2025 and GRI 103: Energy 2025** were released in mid-2025 and become effective **January 1, 2027** (applicable to reports covering FY2026 published in 2027). These replace:

- GRI 302: Energy (2016) → replaced by **GRI 103: Energy 2025**
- GRI 305: Emissions (2016) → replaced by **GRI 102: Climate Change 2025**
- GRI 201-2 (climate risk financial implications) → absorbed into GRI 102

**Key additions in GRI 102:** Expanded Scope 3 requirements, mandatory disclosure of transition plans (whether one exists and how it integrates into governance), and new social impact disclosures on workers and communities affected by climate transition.

**Key additions in GRI 103:** Renewable vs. non-renewable energy breakdown, disclosure of environmental and social impacts of energy sourcing across the value chain.

**Taxonomy impact — update canonical codes E01, E02, E10:**

| Original Code | Original GRI | New GRI (eff. 2027) | Action |
|---|---|---|---|
| E01 | GRI 302 | GRI 103 | Add `gri_103_adopted` binary to Block B; update code mapping |
| E02 | GRI 305 | GRI 102 | As above |
| E10 | GRI 201-2 / TCFD | GRI 102 (Transition plan) | Separate topic or sub-dimension of E02 |

Add a field `gri_new_climate_energy_adopted` (binary) to Block B — companies voluntarily early-adopting GRI 102/103 before 2027 should be flagged as the next treatment cohort in any post-2026 extension of the study.

**GRI–ESRS Interoperability Index (November 2024 update):** GRI and EFRAG published a joint interoperability index and data point mapping that aligns GRI disclosures with ESRS requirements at a granular level. For the EU peer comparison (ASML, Infineon, STMicro, NXP):
- [GRI-ESRS Interoperability Index PDF (Nov 2024)](https://www.globalreporting.org/media/qzmoeixv/esrs-gri-interoperability-index-november-2024.pdf)
- [ESRS-GRI Data Point Mapping (Excel)](https://www.globalreporting.org/media/muajmnbl/draft-esrs-gri-standards-data-point-mapping.xlsx)

Use these files to code each EU peer's ESRS disclosures against the canonical 35-topic taxonomy. The interoperability index maps at the disclosure-requirement level — a single canonical code may map to multiple ESRS datapoints.

**GRI–ISSB alignment:** IFRS S2 climate disclosures are now treated as equivalent to corresponding GRI requirements for climate. For companies in the sample adopting IFRS S2, their ISSB climate disclosures can be cross-coded to GRI 102 topic territory. Code a variable `issb_s2_adopted` (binary) alongside `gri3_adopted` to disentangle effects.

**Key sources:**
- [GRI 102: Climate Change 2025 (PDF)](https://globalreporting.org/pdf.ashx?id=29514)
- [GRI 103: Energy 2025 (PDF)](https://globalreporting.org/pdf.ashx?id=29537)
- [GRI Standards 2025 Overview — BDO](https://www.bdo.ch/en-gb/insights/gri-updates-2025-2027-transparency-and-impact-in-sustainability)
- [GRI-ISSB alignment summary — iasplus](https://www.iasplus.com/en/news/2024/01/issb-gri-interoperability)

---

### S3. Unbalanced Panels and Missing Data

**The missing data problem in sustainability report panels:** Companies may miss years (no GRI report filed, report available only in Chinese, or report not locatable). This creates an unbalanced panel. Three decisions require explicit justification in the methods section:

**Decision 1 — Minimum observations per firm.** For two-way fixed effects (firm + year FE) to identify a firm fixed effect, each firm must appear in at least 2 firm-year observations. For the CS21 staggered DiD, firms need observations both before *and* after their `gri3_adoption_year`. Firms with a single observation should be excluded entirely from the primary panel. Document how many firms are dropped and test whether excluded firms differ systematically from included firms on observable characteristics (report this as an attrition table in the appendix).

**Decision 2 — Handling non-consecutive gaps.** A firm missing year t but present in t-1 and t+1 creates a gap. Two valid approaches:
- **Listwise deletion of gap years** — simpler; treats gaps as missing-at-random; preferred when gaps are rare (<10% of firm-years).
- **Inverse Probability Weighting (IPW)** — estimate the probability that a firm-year is observed as a function of firm characteristics; weight non-missing observations by 1/ŝ. Preferred when gaps are correlated with firm size or ESG performance.

For IPW in R:
```r
library(ipw)
# Estimate probability of being observed
prob_model <- glm(observed ~ ln_total_assets + roa + leverage + fiscal_year,
                  family = binomial, data = full_panel)
weights <- ipwpoint(exposure = observed, family = "binomial",
                    numerator = ~ 1, denominator = ~ ln_total_assets + roa + leverage,
                    data = full_panel)
# Then pass weights to feols/feglm
feols(topics_total_n ~ PostGRI3 | company_id + fiscal_year,
      weights = ~ipw_weights, data = observed_panel)
```

**Decision 3 — Non-reporters vs. zero-topic reporters.** Firms that have never filed a GRI report are fundamentally different from firms that file a report disclosing zero material topics. If your sample includes only GRI reporters (as is standard in this literature), structural zeros from non-reporters are already excluded by sample construction — document this explicitly as a sample selection criterion. If you observe zeros for GRI-adopting firms, use the hurdle model described in S4 below.

**Sensitivity check:** Run your primary CS21 estimator on (a) the balanced subsample only, and (b) the full unbalanced panel with IPW. If coefficients are directionally consistent, missing data is not driving results.

---

### S4. Handling Zero-Inflated Topic Counts

The existing guide recommends two-way FE Poisson (Test 4.1) and notes to test for overdispersion. One additional case requires attention: **structural zeros** arising from firms that adopted GRI but disclosed zero material topics in a given year (e.g., during a framework transition year). This generates a distribution with excess zeros that cannot be explained by the Poisson mean alone.

**Diagnostic test for zero inflation:**
```r
library(pscl)
# Test: compare standard Poisson FE to zero-inflated model fit
# (Note: FE zero-inflated Poisson is not trivially estimable; use pooled version for diagnostic)
zip_model <- zeroinfl(topics_total_n ~ PostGRI3 + ln_total_assets + roa,
                      dist = "poisson", link = "logit", data = panel_df)
vuong(zip_model, poisson_model)  # Vuong test: ZIP vs Poisson
```

**Preferred model for structural zeros — Hurdle Poisson (two-part model):** The hurdle model is theoretically better suited to sustainability disclosure data because:
- Part 1 (binary): Models whether the firm disclosed *any* material topics (logistic regression) — driven by whether the firm adopted GRI.
- Part 2 (count | > 0): Models *how many* topics, conditional on disclosure — driven by governance quality, firm size, GRI 3 adoption.

```r
library(pscl)
hurdle_model <- hurdle(topics_total_n ~ PostGRI3 + ln_total_assets + roa | 
                       PostGRI3 + gri_adoption_year,
                       dist = "poisson", zero.dist = "binomial", data = panel_df)
summary(hurdle_model)
```

Report both parts in a single table. If the hurdle model is warranted (Vuong test significant), carry both the FE Poisson and hurdle estimates as robustness columns in the regression table. Most disclosure count studies in the literature (including Beske et al. 2020, Padilla-Garrido et al. 2024) use standard Poisson — the hurdle model will be a methodological contribution if zeros are prevalent.

---

### S5. Formal Power Analysis for the Staggered DiD

The existing guide gives heuristic sample size estimates. Here is formal guidance for pre-study power analysis.

**Step 1 — Estimate the expected effect size.** In sustainability disclosure research, a GRI standard change typically shifts topic counts by 1–4 topics (e.g., Aluchna et al. 2023 find ~2 additional E topics post-NFRD). With a within-firm SD of ~3–5 topics over time, this corresponds to Cohen's d ≈ 0.4–1.0. Use d = 0.5 as a conservative assumption.

**Step 2 — Use the `staggered` package for efficient estimation power.** The `staggered` R package (Roth & Sant'Anna 2023, *Journal of Political Economy: Micro*) provides the optimal efficient estimator under quasi-random treatment timing and can be used to assess precision (SE width as a proxy for power):

```r
# Install
remotes::install_github("jonathandroth/staggered")
library(staggered)

# Run efficient estimator on your sample
result <- staggered(
  df = panel_df,
  i = "company_id",
  t = "fiscal_year",
  g = "gri3_adoption_year",
  y = "topics_total_n",
  estimand = "cohort"
)
# Examine SE magnitude relative to expected effect size
# If SE > 0.5 × expected ATT, power is likely below 80%
```

**Step 3 — Simulation-based power check (recommended for final pre-registration).** Simulate 1,000 datasets under your assumed DGP (N firms, T years, effect size d) and compute rejection rates at α = 0.05:

```r
# Pseudo-code for simulation power check
set.seed(42)
rejections <- replicate(1000, {
  sim_data <- simulate_panel(n_firms = 80, n_years = 7,
                              effect_size = 2, sd_topics = 4)
  fit <- att_gt(yname = "topics", tname = "year", idname = "firm_id",
                gname = "g", data = sim_data, est_method = "dr")
  agg <- aggte(fit, type = "simple")
  agg$overall.se < abs(agg$overall.att) / 1.96  # one-sided proxy
})
mean(rejections)  # Empirical power
```

**Rule of thumb for this study:** With 50–80 treated TWSE firms and 6–8 years of data, you should have ~80% power to detect an ATT of 1.5+ topics. Augmenting with 30–40 global peers improves precision on pooled estimates but not on TWSE-specific heterogeneous effects (report the two separately).

**Key reference:** Roth & Sant'Anna (2023) — *Efficient Estimation for Staggered Rollout Designs*, Journal of Political Economy: Micro.
- [Paper (arXiv)](https://arxiv.org/pdf/2102.01291)
- [R package (GitHub)](https://github.com/jonathandroth/staggered)
- [CRAN page](https://cran.r-project.org/web/packages/staggered/readme/README.html)

---

### S6. Goodman-Bacon Decomposition — Code and Interpretation

The existing guide mentions running the Goodman-Bacon decomposition before choosing a staggered DiD estimator but provides no code. Use `bacondecomp` (CRAN):

```r
library(bacondecomp)
library(ggplot2)

# Step 1: Run decomposition
bacon_out <- bacon(
  formula = topics_total_n ~ PostGRI3,
  data    = panel_df,
  id_var  = "company_id",
  time_var = "fiscal_year"
)

# Step 2: Inspect the weights table
# Type "Earlier vs Later Treated" = clean comparisons
# Type "Later vs Earlier Treated" = FORBIDDEN comparisons (already-treated as control)
bacon_out$two_by_twos  # Shows each 2x2 estimate and its weight

# Step 3: Plot
ggplot(bacon_out) +
  aes(x = weight, y = estimate, colour = type) +
  geom_point(size = 3) +
  geom_hline(yintercept = 0, linetype = "dashed") +
  labs(title = "Goodman-Bacon Decomposition",
       x = "Weight", y = "2×2 DiD Estimate",
       colour = "Comparison type")

# Step 4: Quantify the forbidden comparison problem
forbidden_weight <- sum(bacon_out$two_by_twos$weight[
  bacon_out$two_by_twos$type == "Later vs Earlier Treated"])
```

**Interpretation threshold:** If the total weight on "Later vs Earlier Treated" (forbidden) comparisons exceeds **15–20%** of the total estimator weight, the naïve TWFE estimator is meaningfully biased and you must use CS21/SA21/BJS24 as primary. If the forbidden weight is < 5%, the bias is negligible (still report CS21 as primary per current norms, but note TWFE robustness).

**References:**
- [bacondecomp CRAN vignette](https://cran.r-project.org/web/packages/bacondecomp/vignettes/bacon.html)
- [GitHub: evanjflack/bacondecomp](https://github.com/evanjflack/bacondecomp)
- [Asjad Naqvi's DiD Guide — Bacon decomposition in R](https://asjadnaqvi.github.io/DiD/docs/code_r/06_bacon_r/)
- Goodman-Bacon (2021), *Journal of Econometrics*, 225(2), 254–277

---

### S7. Updated NLP Tooling (2025–2026)

#### Embedding Models — Upgrade Path Beyond multilingual-e5-large

The existing guide recommends `intfloat/multilingual-e5-large-instruct` for semantic matching. Two newer models (2025) significantly outperform it on both MTEB and C-MTEB (Chinese) benchmarks and are preferred for new deployments:

| Model | Developer | Parameters | MTEB English | C-MTEB (Chinese) | Notes |
|---|---|---|---|---|---|
| `multilingual-e5-large-instruct` | Microsoft | 560M | ~63.6 | ~64 | Prior recommendation; still solid baseline |
| `BAAI/bge-m3` | BAAI | 570M | ~64.3 | ~66.7 | Multi-functional (dense + sparse + colbert); strong Chinese |
| `Qwen/Qwen3-Embedding-0.6B` | Alibaba | 600M | ~64.3 | ~68 | Best lightweight; instruction-tuned; recommended default |
| `Qwen/Qwen3-Embedding-4B` | Alibaba | 4B | ~70+ | ~72+ | High-accuracy; use for Stage 2 matching |
| `Qwen/Qwen3-Embedding-8B` | Alibaba | 8B | ~75.2 | ~75+ | State-of-art; use if GPU available |

**Upgrade recommendation:** Replace `multilingual-e5-large-instruct` with `Qwen/Qwen3-Embedding-0.6B` as the default in Stage 2 of the three-stage mapping pipeline. It is faster, smaller, and more accurate on Traditional Chinese. If running on a GPU with ≥ 24GB VRAM, use `Qwen3-Embedding-4B`.

```python
# Updated Stage 2 embedding code
from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer('Qwen/Qwen3-Embedding-0.6B')
# For instruction-tuned inference (improves accuracy 1–5%):
instruction = "Retrieve semantically similar sustainability topic labels"
raw_emb = model.encode(
    [f"Instruct: {instruction}\nQuery: {label}" for label in raw_labels],
    normalize_embeddings=True
)
canonical_emb = model.encode(canonical_labels, normalize_embeddings=True)
cos_sim = raw_emb @ canonical_emb.T
```

**References:**
- [Qwen3-Embedding Hugging Face (0.6B)](https://huggingface.co/Qwen/Qwen3-Embedding-0.6B)
- [BGE-M3 (BAAI)](https://huggingface.co/BAAI/bge-m3)
- [Qwen3 Embedding arXiv paper](https://arxiv.org/html/2506.05176v1)
- [FinMTEB finance embedding benchmark (EMNLP 2025)](https://aclanthology.org/2025.emnlp-main.179.pdf)

#### ESGLens (arXiv 2604.19779) — Status

ESGLens is a RAG framework (MIT, 2026) that automates GRI-guided extraction, Q&A, and ESG score regression from sustainability report PDFs. Code was released to support reproducibility — check the arXiv paper page for the GitHub link. No public pip package exists yet. Best used for:
- Validating your manual GRI content index coding against automated extraction
- As an alternative pipeline for global peers whose reports are English-only

**Reference:** [ESGLens arXiv 2604.19779](https://arxiv.org/abs/2604.19779)

#### ESGReveal (arXiv 2312.17264) — Alternative LLM Extraction Tool

ESGReveal uses an LLM-based approach to extract structured data from ESG reports, offering structured JSON output aligned with ESG metrics. May be useful for rapid prototyping before running the full three-stage pipeline.

**Reference:** [ESGReveal arXiv 2312.17264](https://arxiv.org/html/2312.17264v1)

#### ReportParse — Confirmed Active (IJCAI 2024)

`reportparse` was published as a demonstration paper at IJCAI 2024, confirming active maintenance. The library uses a modular reader + annotator architecture and officially supports PDF sustainability reports from multiple standard corpora. Check the GitHub for current Python version requirements (≥ 3.8 at time of writing; check for 3.11 compatibility before deploying).

**Reference:** [ReportParse IJCAI 2024 paper](https://www.ijcai.org/proceedings/2024/1024.pdf) | [GitHub](https://github.com/climate-nlp/reportparse)

---

### S8. Consolidated Software Environment

The version information in the main guide is scattered across sections. This is the consolidated recommended environment as of May 2026:

**Python (≥ 3.10, ≤ 3.12 recommended):**

```
# Core PDF/text processing
pymupdf>=1.24.0           # PyMuPDF; pymupdf4llm is now bundled
pymupdf4llm>=0.0.17       # Markdown extraction layer
camelot-py[cv]>=0.11.0    # Lattice table extraction (requires ghostscript)
docling>=2.5.0            # IBM Research; DocLayNet + TableFormer
paddlepaddle>=2.6.0       # PaddleOCR dependency
paddleocr>=2.8.0          # PP-OCRv5 for Traditional Chinese OCR

# NLP and embeddings
sentence-transformers>=3.0.0
torch>=2.2.0
transformers>=4.40.0
rapidfuzz>=3.6.0          # Fuzzy string matching
scikit-bio>=0.6.0         # skbio.stats.composition for ILR transform
bertopic>=0.16.0
fasttext-wheel>=0.9.2     # Language detection (lid.176.bin model)

# Statistical modelling
pyfixest>=0.24.0          # Python port of fixest; feols, feglm, Poisson
statsmodels>=0.14.0
pscl>=1.5.9               # Zero-inflated / hurdle models (Python: use statsmodels)
krippendorff>=0.6.0       # Krippendorff's alpha

# Data
pandas>=2.0.0
numpy>=1.26.0
```

**R (≥ 4.3.0, ≤ 4.5.x recommended):**

```r
# Core econometrics
fixest          >= 0.12.1   # feols, feglm, Poisson FE
did             >= 2.1.2    # Callaway & Sant'Anna CS21
HonestDiD       >= 0.2.6    # Pre-trend sensitivity
didimputation   >= 0.2.0    # Borusyak, Jaravel & Spiess BJS24
staggered       >= 0.6.1    # Roth & Sant'Anna efficient estimator
bacondecomp     >= 0.1.2    # Goodman-Bacon decomposition
survival        >= 3.5-7    # clogit for conditional logistic

# Compositional data
compositions    >= 2.0-6    # ILR transformation
systemfit       >= 1.1-30   # SUR estimation

# GEE and count models
geepack         >= 1.3.9    # geeglm
pscl            >= 1.5.9    # hurdle(), zeroinfl()
MASS            >= 7.3-60   # glm.nb (negative binomial)

# Inter-rater reliability
irr             >= 0.84.1   # kappa2(), kappam.fleiss()
psych           >= 2.4.3    # cohen.kappa()

# Utilities
sandwich        >= 3.1.0    # Robust SEs outside fixest
lmtest          >= 0.9-40   # Coefficient tests
ggplot2         >= 3.5.0    # Visualisation
```

**Known compatibility note:** `bacondecomp` requires `dplyr` ≥ 1.1.0. The `HonestDiD` package requires `did` ≥ 2.0 and calls internal functions — pin both to the same minor version when installing.

---

### S9. Pre-Registration and Open Science Standards

Pre-registration is not yet mandated by SAMPJ, CSR&EM, or Journal of Cleaner Production, but is strongly emerging practice in accounting and sustainability research (as it is in psychology and economics). Journals that already have registered report tracks (e.g., *Accounting, Organizations and Society*) provide the gold standard.

**Recommended workflow:**
1. Complete the analysis plan (all variable definitions, estimators, and hypotheses) before coding begins.
2. Pre-register on **OSF** (https://osf.io/prereg/) using the OSF Preregistration template — best for panel studies with multiple hypotheses and model specifications. This captures: research questions, hypotheses, sample selection criteria, variable operationalisation, planned estimators (CS21 as primary, SA21/BJS24 as robustness), and multiple testing correction approach (Benjamini-Hochberg).
3. If the analysis plan is already set but data collection is ongoing, **AsPredicted** (https://aspredicted.org) is faster — 9 questions, 10-minute process.
4. Register *before* the data collection phase ends (not necessarily before it begins). Pre-registering after seeing descriptive statistics but before running inferential tests is acceptable and still valuable.
5. In your paper's methods section, include a footnote: "This study was pre-registered at [OSF/AsPredicted URL] on [date]. Deviations from the pre-registered analysis plan are described in Online Appendix [X]."

**OSF resources:**
- [OSF Prereg Template Guide](https://www.cos.io/blog/choosing-preregistration-template-guide-for-researchers)
- [OSF Preregistration Portal](https://help.osf.io/article/330-welcome-to-registrations)

---

### S10. Replication Package Standards

Sustainability and accounting journals are tightening replication requirements. When submitting (especially to JCleP, SAMPJ, or BSE), prepare the following package in advance:

**Required components:**

| Component | Standard |
|---|---|
| `README.md` | Use the Social Sciences Data Editor template (SSRP format); describe software, versions, data sources, run order |
| Raw data files | Only include data you have rights to redistribute; link to restricted sources (TEJ, Compustat) with variable lists |
| Analysis scripts | One script per paper section; numbered in run order; comments at every non-obvious step |
| Concordance table | The Stage 3 manual mapping CSV (topic label → canonical code) — essential for replication |
| Intermediate outputs | Cleaned panel CSV after PDF extraction + NLP coding, before regression; enables replication of statistical analysis without re-running NLP pipeline |
| Figures and tables | Scripts that reproduce every table and figure from the intermediate outputs |

**Repository choice:**
- **Harvard Dataverse** (https://dataverse.harvard.edu) — preferred; up to 1TB free; persistent DOI; accepted by most social science journals.
- **Zenodo** (https://zenodo.org) — 50GB default (expandable to 200GB+); integrates with GitHub; preferred if code is on GitHub.

**Guidance on restricted data:** For TEJ and Bloomberg data that cannot be redistributed, include: (a) the exact query specifications and variable names, (b) the aggregation/join keys, and (c) a synthetic or scrambled dataset with the same schema that allows the analysis scripts to run end-to-end.

---

### S11. Publication Venue Guide

The following journals are ranked by fit and realistic acceptance probability for a TWSE semiconductor GRI materiality panel study:

| Journal | Publisher | CiteScore (approx.) | Fit | Notes |
|---|---|---|---|---|
| **Sustainability Accounting, Mgmt & Policy J. (SAMPJ)** | Emerald | ~8 | ★★★★★ | Purpose-built for this study type; prior materiality studies (Beske, Machado) published here |
| **Corporate Social Responsibility & Environmental Mgmt (CSR&EM)** | Wiley | ~8 | ★★★★★ | Padilla-Garrido et al. 2024 published here; strong fit for GRI coding studies |
| **Journal of Cleaner Production** | Elsevier | ~14 | ★★★★☆ | High impact; broad sustainability scope; competitive but receptive to empirical disclosure studies |
| **Business Strategy and the Environment (BSE)** | Wiley | ~10 | ★★★★☆ | Strong on corporate ESG; good for GRI adoption studies |
| **Accounting, Auditing & Accountability J.** | Emerald | ~8 | ★★★☆☆ | Good fit for critical accounting perspective; less receptive to pure panel econometrics |
| **Finance Research Letters** | Elsevier | ~7 | ★★★☆☆ | Fast turnaround (~6 weeks); good for 6,000-word focused findings; good NLP angle if framed as methodological |
| **Expert Systems with Applications** | Elsevier | ~12 | ★★★☆☆ | Strong fit if NLP pipeline is a primary contribution (not just applied to a substantive question) |
| **Sustainability (MDPI)** | MDPI | ~5 | ★★★☆☆ | Open access; faster review; lower prestige; suitable for a preliminary/methods paper before the main submission |

**Recommended strategy:** Submit the primary panel study (CS21 + ILR + topic battery) to SAMPJ or CSR&EM. If the NLP pipeline (three-stage mapping, Qwen3 embeddings, VLM matrix extraction) is sufficiently novel as a standalone contribution, consider a separate methods paper for Expert Systems with Applications or Information Processing & Management.

For the semiconductor peer universe mapping specifically, the SASB TC-SC coverage table and canonical taxonomy could stand alone as a shorter contribution to *Journal of Accounting and Public Policy* or *Accounting Forum*.

---

### S12. Common Pitfalls and How to Avoid Them

Based on patterns in the peer literature and the specific challenges of this design:

**Pitfall 1 — Conflating GRI 3 *availability* with *adoption*.** GRI 3 was effective January 2023, but companies set their own first adoption year. Some adopted in FY2022 (early), most in FY2023, a few deferred to FY2024. Code `gri3_adoption_year` from the report's own declaration, not the GRI effective date. Naïve use of a single Post-2023 binary will misclassify early and late adopters.

**Pitfall 2 — Treating the GRI content index as the materiality list.** The GRI content index lists *all topics a company reports on*, not the subset they identified as material. The materiality list is a separate section. Always verify: the materiality assessment section or matrix → identified material topics → reported GRI disclosures. These can differ (companies sometimes report on non-material topics; sometimes identify material topics but omit them from the GRI index).

**Pitfall 3 — VLM hallucination in matrix extraction.** GPT-4o and Claude 3.5 Sonnet will occasionally invent topic labels not present in the image, especially for low-resolution scans or heavily stylized matrices. Always cross-validate VLM output against the narrative section's topic list. Any VLM-extracted topic with no narrative match should be flagged `confidence = low` and excluded from the main analysis (include in robustness check).

**Pitfall 4 — The ILR back-transformation.** After running SUR on ILR coordinates, you must back-transform coefficients to interpret them in the original compositional space. R `compositions` package: `ilrInv(coef_vector)`. Failing to back-transform leads to nonsensical coefficient interpretations.

**Pitfall 5 — Parallel trends assumption in the presence of anticipation effects.** If companies changed their topic selection *before* formally adopting GRI 3 (e.g., in the year they decided to adopt but before the official first GRI 3 report), this violates the no-anticipation assumption in CS21. Test for this by examining the event-study plot: any pre-trend in t-2 or t-1 suggests anticipation. Use the `anticipation` argument in `att_gt()` to allow for k anticipation periods:

```r
att_gt(..., anticipation = 1)  # Allow 1-year anticipation window
```

**Pitfall 6 — Language detection errors on bilingual PDFs.** fastText `lid.176.bin` operates at paragraph level and can misclassify paragraphs with mixed-language content (e.g., English company names embedded in Chinese text) as English. Always run a manual spot-check on 10 random Chinese-language pages before committing to language detection results. For Traditional Chinese specifically, use the Traditional Chinese tokeniser (`ckiptagger` or `jieba` with traditional dictionary) rather than the Simplified Chinese default.

**Pitfall 7 — Table row fragmentation in Camelot.** Camelot Lattice mode is highly accurate for bordered tables but fails on GRI content indexes with merged cells or colour-filled headers. Visually inspect the extracted tables for at least 20 random reports before trusting the automation. Use Docling's TableFormer as a fallback for complex tables.

---

*Supplementary update compiled: May 18, 2026 | Research sourced from: Taiwan FSC/SFB press releases, GRI Standards releases, EFRAG interoperability documents, Hugging Face model cards, arXiv preprints, and CRAN/GitHub package documentation.*

---

## ⚠️ Correction to Section S1 — ISSB Phase-In Timeline

**The Phase 2 and Phase 3 dates in S1 were incorrect.** The verified FSC roadmap (confirmed via FSC press release and IFRS Foundation profile) is:

| Phase | Capital Threshold | First Mandatory FY | Filing Deadline | Scope 3 Permitted Delay Until |
|---|---|---|---|---|
| Phase 1 | > NT$10 billion | **FY2026** | March 2027 | FY2029 (reported 2030) |
| Phase 2 | NT$5B – NT$10B | **FY2027** | March 2028 | FY2030 (reported 2031) |
| Phase 3 | All remaining listed | **FY2028** | March 2029 | FY2031 (reported 2032) |

S1 incorrectly stated both Phase 1 and Phase 2 must apply from FY2026 — **only Phase 1 (>NT$10B) begins FY2026**. Phase 2 begins FY2027 and Phase 3 FY2028. The FSC additionally grants all companies a 3-year Scope 3 relief period from their first mandatory year. In the first mandatory reporting year, companies may disclose only climate-related information (omitting general IFRS S1 requirements) and may omit comparative information.

**Revised study design implication:** FY2026 is "polluted" only for Phase 1 firms (those with >NT$10B paid-in capital, i.e., TSMC, MediaTek, ASE Group, and the largest global peers). Smaller TWSE semiconductor companies will not face the dual GRI 3 + ISSB treatment problem until FY2027 or FY2028 — meaning their GRI 3 post-period is cleaner.

**Sources:** [FSC ISSB Roadmap Press Release (Aug 2023)](https://www.fsc.gov.tw/en/home.jsp?id=54&parentpath=0,2&mcustomize=multimessage_view.jsp&dataserno=202308180001&dtable=News) | [IFRS Foundation — Chinese Taipei Profile](https://www.ifrs.org/content/dam/ifrs/publications/sustainability-jurisdictions/pdf-profiles/chinese-taipei-ifrs-profile.pdf)

---

## Research Integration Update — May 18, 2026 (Second Pass)

*This second supplementary update integrates findings from the companion Sustainability Reporting & Materiality Assessment Trends 2026 research report. It adds: (1) a corrected ISSB timeline, (2) the GRI 101 Biodiversity 2024 taxonomy update, (3) ISSA 5000 assurance standard impact on Block B, (4) expanded materiality visualization format coding, (5) the displacement effect as a new research hypothesis, (6) the Omnibus rollback implications for the EU peer arm, (7) updated TWSE data infrastructure, and (8) a theoretical positioning section for the study.*

---

### S13. GRI 101: Biodiversity 2024 — Canonical Taxonomy Update (E09)

**GRI 101: Biodiversity 2024** was published in February 2024 and became **effective January 1, 2026**, replacing GRI 304: Biodiversity 2016. This is already in force for any FY2025 reports published in 2026.

**Impact on canonical code E09:** Any report covering FY2025 or later that discloses biodiversity content will be citing GRI 101, not GRI 304. Update the GRI Standard column in the canonical taxonomy:

| Code | Canonical Topic | GRI Standard (pre-2026) | GRI Standard (FY2025+) |
|---|---|---|---|
| E09 | Biodiversity | GRI 304 (2016) | **GRI 101: Biodiversity 2024** |

**What GRI 101 adds versus GRI 304:**
- Location-specific reporting: companies must name the countries/jurisdictions and site sizes where operations affect biodiversity-sensitive areas.
- New direct driver disclosures: land use change, climate change, overexploitation, pollution, and invasive species — each must be separately addressed.
- Supply chain scope: for the first time, upstream supply chain biodiversity impacts are included, not just operational footprint. For fabless semiconductor firms (Nvidia, Qualcomm, MediaTek) whose direct operational biodiversity impacts are minimal, GRI 101 supply chain provisions may make E09 newly material.

**Coding implication:** Add a field `gri_101_applied` (binary) to Block B. For FY2025+ reports, check whether the company references GRI 101 or still uses the legacy GRI 304 — early/late adoption of GRI 101 is itself a variable of interest and a potential additional staggered treatment cohort if the study's time window extends to 2025–2027.

For TWSE semiconductor fabs (TSMC, UMC, VIS): biodiversity is historically low-salience given urban fab locations, but supply chain provisions under GRI 101 may shift this. Monitor whether E09 moves from peripheral (currently <20% company-year disclosure frequency) to statistical significance in the post-2026 subsample.

**Key sources:**
- [GRI 101: Biodiversity 2024 (full PDF)](https://www.globalreporting.org/pdf.ashx?id=24534)
- [GRI 101 FAQs (October 2024)](https://www.globalreporting.org/media/n5lf4o5x/faqs-biodiversity_external_final_updated-oct-2024.pdf)
- [GRI 101 overview — ESG Today](https://www.esgtoday.com/gri-launches-new-biodiversity-reporting-standard/)

---

### S14. Block B Update: ISSA 5000 Assurance Standard

**ISSA 5000** (*International Standard on Sustainability Assurance 5000: General Requirements for Sustainability Assurance Engagements*) was approved by the IAASB in September 2024, formally published November 2024, and is **effective for assurance engagements on periods beginning on or after December 15, 2026** (early application permitted). It replaces ISAE 3000 (Revised) as the global sustainability assurance standard.

**Impact on Block B variables:** The existing `assurance_level` and `assurance_provider_type` fields need a third dimension — which standard the assurance was conducted under. Add:

| New Field | Type | Description |
|---|---|---|
| `assurance_standard` | Categorical | `ISAE3000` / `ISSA5000` / `ISAE3410` / `AA1000` / `Other` / `None` |
| `issa5000_early_adopted` | Binary | 1 if company used ISSA 5000 before mandatory effective date (FY2027+) |

**Why this matters for the TWSE study:** The assurance landscape in Taiwan is in active transition. Of 722 TWSE companies filing 2023 reports, 64.4% obtained third-party assurance — but limited assurance (ISAE 3000) dominates. ISSA 5000 introduces substantially more rigorous requirements for both limited and reasonable assurance and explicitly covers all ESG information (not just GHG as ISAE 3410 does). Companies voluntarily early-adopting ISSA 5000 may constitute a higher-quality subsample — track this as a potential moderator variable.

**TWSE GHG assurance mandate timeline:**
- Largest companies (>NT$10B capital): GHG assurance mandatory from 2024 report
- All remaining TWSE companies: GHG assurance mandatory from 2028–2029 (phased)
- ISSA 5000 becomes the required standard for these engagements beginning FY2027

**Key source:** [ISSA 5000 — IAASB Publication Page](https://www.iaasb.org/publications/international-standard-sustainability-assurance-5000-general-requirements-sustainability-assurance) | [ISSA 5000 Full Standard PDF](https://ifacweb.blob.core.windows.net/publicfiles/2025-01/IAASB-International-Standard-on-Sustainability-Assurance-ISSA-5000.pdf)

---

### S15. Expanded Materiality Visualization Format Coding

The existing methodology captures only `matrix_shown` (binary). The Trends report documents that the canonical 2×2 matrix is in structural decline — only ~20% of CSRD reporters visualise results as a matrix — and multiple replacement formats are now standard. The binary variable misses this heterogeneity.

**Replace the single `matrix_shown` binary with a richer categorical and count structure:**

Add to Block C:

| New Field | Type | Description |
|---|---|---|
| `visualization_format` | Categorical | See below |
| `visualization_format_n` | Integer | Total number of distinct visualization formats used |
| `iro_table_shown` | Binary | Structured IRO/topic table (IRO = Impacts, Risks, Opportunities) |
| `butterfly_chart_shown` | Binary | Mirrored bar chart showing impact vs. financial materiality side-by-side |
| `scatter_plot_shown` | Binary | Scatter plot with graduated zones (as opposed to hard-quadrant matrix) |
| `iro_heatmap_shown` | Binary | Heatmap of IRO density per topic or value chain segment |
| `dynamic_viz_shown` | Binary | Interactive/digital visualization (reference to online tool) |

**Categorical values for `visualization_format`:** `traditional_matrix` / `scatter_graduated` / `iro_table` / `butterfly_chart` / `iro_heatmap` / `text_only` / `combination` / `other`

**Retain `matrix_shown` and `matrix_axes_labeled` for backward compatibility** — set `matrix_shown = 1` only for traditional 2×2 quadrant matrices; set `scatter_graduated = 1` for scatter plots with graduated zones that are frequently mislabelled as matrices in company reports.

**Research opportunity:** The shift from matrix to IRO table format is itself a material disclosure change — companies moving to structured IRO tables tend to disclose more topics (per CSR Tools 2024 analysis) and with more process transparency. Include `visualization_format` as an independent variable in the process quality regressions.

**Coding guidance:**
- Traditional matrix = four quadrants with hard lines and labelled axes
- Scatter graduated = scatter plot with concentric rings or colour gradients but no hard quadrant lines
- IRO table = tabular list of IROs with columns for topic, IRO type, materiality score/rationale, ESRS/GRI alignment
- Butterfly chart = mirrored horizontal bar chart, left bars = impact materiality score, right bars = financial materiality score

---

### S16. The Displacement Effect — A New Testable Hypothesis

**Göttsche, Griffin, Habermann, Schiemann & Spandel (2025)** in *Review of Accounting Studies* (Vol. 30, pp. 3596–3639) provides the first causal evidence of a **displacement effect** in materiality-guided sustainability reporting. Using staggered release of SASB materiality classifications (2013–2016) as quasi-natural experiments, they find:

- Firms **improve** sustainability performance on topics classified as financially material following the classification.
- Simultaneously, performance on topics **not** classified as financially material **deteriorates**.
- Sustainability effort shifts rather than expands — firms optimise to the materiality lens.

**Implication for the GRI 3 semiconductor study:** GRI 3 redefined materiality toward impact-only and (for leading companies) double materiality. This creates a natural experiment to test whether Taiwanese semiconductor companies:
1. Increased depth of reporting on GRI 3-prioritised impact topics (expected: yes)
2. *Simultaneously decreased* disclosure depth on topics not emphasised by GRI 3 (the displacement hypothesis)

**How to operationalise:**

```r
# Test displacement: topic_depth_score (word count per topic) rather than just topic count
# Hypothesis: topics_env_depth increases post-GRI3; topics_gov_depth decreases
# (Government topics are less emphasised in GRI 3's impact framework)

feols(topic_depth_score ~ PostGRI3_it * topic_category +
      ln_total_assets + roa | company_id + fiscal_year,
      cluster = ~company_id, data = topic_level_df)

# Interact PostGRI3 with E/S/G category indicator to test for differential depth shifts
```

Alternatively, use the `topic_stability_index` (Jaccard similarity) as the outcome — does GRI 3 increase stability in environmental topics while reducing it in governance topics?

**The displacement hypothesis is novel in the GRI/sustainability disclosure literature** — no published study has tested it in the GRI standards transition context. This is a clear contribution opportunity.

**Reference:** Göttsche et al. (2025), *Review of Accounting Studies*, Vol. 30 — [Link](https://link.springer.com/article/10.1007/s11142-025-09908-1)

---

### S17. EU Omnibus Rollback — Implications for the Global Peer Arm

The **EU Omnibus I package** (adopted February 2026) reduced mandatory CSRD scope from ~50,000 to ~5,000 companies by raising the threshold to >1,000 employees AND >€450M turnover, and delayed Wave 2 by two years (FY2027 → report 2028).

**For this study's global peer universe, assess which EU peers remain in mandatory CSRD scope:**

| EU Peer | Country | CSRD Status (post-Omnibus) | Materiality Implications |
|---|---|---|---|
| ASML | Netherlands | ✅ In scope (>€40B revenue) | Full ESRS DMA required; double materiality |
| Infineon | Germany | ✅ In scope (>€15B revenue) | Full ESRS DMA required |
| STMicroelectronics | Switz./France | ✅ In scope (>€15B revenue) | Full ESRS DMA required |
| NXP Semiconductors | Netherlands | ✅ In scope (>€12B revenue) | Full ESRS DMA required |
| ams OSRAM | Austria | ✅ In scope (borderline; ~€3.8B revenue, >3,000 employees) | Confirm scope |

All major EU semiconductor peers remain in CSRD scope under Omnibus thresholds — they are large enough that the rollback does not affect them. However:

**Key methodological implication:** EU peers are operating under **double materiality (ESRS)** while TWSE peers operate under **single/impact materiality (GRI)**. This creates a systematic cross-group coding difference:
- EU peers will tend to report more topics (both impact and financial materiality together produce more identified IROs)
- EU peers will show a structural break in topic counts at their ESRS first adoption year (FY2024 for Wave 1)

**Recommended coding:** Add a variable `csrd_mandatory_reporter` (binary) to Block A for all EU-domiciled peers. Run all cross-group comparisons with and without EU peers to test sensitivity to this structural difference. ESRS's IRO table format (structured table) is not directly comparable to GRI's material topic list — code EU-peer topics from both ESRS tables and any GRI index they also publish.

**EFRAG simplified ESRS (draft July 2025):** EFRAG published draft revised ESRS on July 31, 2025 following an EC mandate to simplify the double materiality assessment process. The revised standard uses "reasonable and proportionate evidence" language (reduced from exhaustive documentation). For any EU peers in the study that adopted FY2024 CSRD reporting, their next report may use the simplified framework — flag this as a potential quality discontinuity.

**Source:** [EU Council Omnibus I Adopted (Feb 2026)](https://www.consilium.europa.eu/en/press/press-releases/2026/02/24/council-signs-off-simplification-of-sustainability-reporting-and-due-diligence-requirements-to-boost-eu-competitiveness/)

---

### S18. Updated TWSE Data Infrastructure

The companion Trends report identified data sources and platform details not in the original methodology guide. Add these:

**ESGgenplus — the primary PDF archive (not in original guide):**

| Platform | URL | What It Provides |
|---|---|---|
| **ESGgenplus** | esggenplus.twse.com.tw | Full PDF sustainability reports from **all 1,883 TWSE/TPEx-listed companies**; board-approved; updated annually; some structured fields |

This is the most comprehensive TWSE sustainability report archive available. For the semiconductor subsample, ESGgenplus is the definitive source for PDF collection — more complete than company IR pages (some smaller companies do not post reports prominently on their own websites) and more current than `responsibilityreports.com`.

**TWSE Material Topics Guidance (October 2024):**
TWSE published an official guidance document on materiality topic identification in October 2024: *重大主題編製指引* (Materiality Topic Compilation Guide). This is the market-level equivalent of EFRAG's IG1 for Taiwan. Key value: it provides TWSE's official mapping of GRI Universal Standards disclosures to sector-specific indicators, including semiconductor-relevant topics. Download and review before finalising the canonical taxonomy.

- [TWSE Material Topics Guidance (PDF, Traditional Chinese)](https://cgc.twse.com.tw/static/20241028/8a828e1792ae226a0192d0fa3fad0004_%E8%AD%89%E4%BA%A4%E6%89%80_%E6%B0%B8%E7%BA%8C%E5%A0%B1%E5%91%8A%E6%9B%B8%E9%87%8D%E5%A4%A7%E4%B8%BB%E9%A1%8C%E7%B7%A8%E8%A3%BD%E6%8C%87%E5%BC%95_F.pdf)

**TWSE ESG structured indicator expansion:**
ESG InfoHub expanded from 29 structured indicators (FY2022–2024) to **97–100 indicators** in the 2025 filing cycle across four categories: ESG Information Disclosure, Sustainability Report, GHG Emissions and Reduction, and Sustainable Economic Activities. This creates a structural data discontinuity:
- Pre-2025 ESG InfoHub data: 29 indicators
- FY2025 onwards: 97–100 indicators (not back-filled for earlier years)

**Implication:** Use TEJ for consistent longitudinal structured data. Use ESG InfoHub for cross-sectional completeness in FY2025+ years only. Document this discontinuity explicitly in the data appendix.

**TWSE-specific data quality limits (carry into methods section):**

1. No XBRL tagging for sustainability narratives — all materiality content is in PDF; requires extraction.
2. No structured, extractable materiality dataset exists at market level — the materiality topic list, stakeholder methodology, and process descriptions are disclosed narratively in PDFs only.
3. Assurance quality varies materially — 35% of 2023 reporters had no assurance; limited assurance dominates.
4. Single vs. double materiality inconsistency — companies may voluntarily apply double materiality while TWSE rules formally require single impact materiality. Code `double_materiality_mentioned` (already in Block C) plus `double_materiality_methodology_disclosed` (binary) to distinguish genuine DMA from passing mentions.

---

### S19. TSMC TDDM as Process Quality Benchmark

TSMC's **Dynamic and Double Materiality (TDDM)** framework is the current benchmark for leading-edge materiality practice in the TWSE universe. For researchers operationalising the `process_quality_score` in Block G, TSMC's approach defines the upper bound:

**TDDM Framework — Components:**
1. **Stakeholder concern dimension** (GRI-aligned): surveys investors, employees, customers, suppliers, NGOs, regulators, local communities.
2. **Impact on operations dimension** (financial materiality): quantitative assessment of impact on company revenues, costs, and risk exposure.
3. **Impact on sustainability dimension** (impact materiality): outward impact on environment, society, and economy — aligned with GRI 3's definition.

**Frameworks integrated:** GRI 3: Material Topics 2021 + WEF dynamic materiality concept + ESRS double materiality principle + AA1000 AccountAbility Principles (2018) + external ESG rating agency inputs (MSCI, DJSI).

**Output:** 14 confirmed material issues, reviewed by ESG Committee and reported to Board annually. Full standalone Materiality Analysis Report published separately from the main sustainability report.

**`process_quality_score` calibration:** Code TSMC's process as the maximum (score = 1.0). All other companies should be scored relative to this benchmark. Specific sub-scores:
- `stakeholder_groups_n` ≥ 7 distinct groups = full mark
- `engagement_methods_n` ≥ 5 distinct methods = full mark
- All three TDDM dimensions present (`impact_materiality_disclosed`, `financial_materiality_disclosed`, `double_materiality_mentioned` all = 1)
- `board_approved` = 1
- Standalone materiality report = additional quality marker (create field `standalone_mat_report`, binary)

**Reference:** [TSMC Materiality Analysis (TDDM)](https://esg.tsmc.com/en-US/sustainable-management/materiality-analysis) | [TSMC 2023 Standalone Materiality Analysis Report](https://esg.tsmc.com/file/public/2023-MaterialityReport-e.pdf)

---

### S20. Theoretical Positioning — Key Academic Literature to Engage With

The companion Trends report identified five papers that directly frame the theoretical contribution of this semiconductor study. Each should be cited and engaged with in the paper's literature review:

**1. Khan, Serafeim & Yoon (2016) — "Corporate Sustainability: First Evidence on Materiality"**
*The Accounting Review*, Vol. 91, pp. 1697–1724 — [Link](https://www.hbs.edu/faculty/Pages/item.aspx?num=50344)

The foundational financial materiality paper. Shows that firms outperforming on SASB-designated *material* topics deliver 300–600 bps/year higher returns; immaterial sustainability outperformance shows no benefit. The semiconductor study should position itself relative to this: while Khan et al. test the *financial* materiality classification, this study tests whether the *impact* materiality classification (GRI 3) changes topic selection patterns — a complementary but distinct question.

**2. Göttsche et al. (2025) — "A Double-Edged Sword: Materiality Classifications"**
*Review of Accounting Studies*, Vol. 30, pp. 3596–3639 — [Link](https://link.springer.com/article/10.1007/s11142-025-09908-1)

The displacement effect paper (detailed in S16). The most directly relevant prior study for the GRI 3 question. Cite as methodological precedent for the staggered treatment design; distinguish by noting this study uses GRI impact materiality rather than SASB financial materiality as the classification mechanism.

**3. Oll, Spandel, Schiemann & Akkermann (2025) — "The Concept of Materiality: From Essential Contestation to Research Opportunities"**
*SAMPJ*, Vol. 16, No. 2 — [Link](https://www.emerald.com/insight/content/doi/10.1108/sampj-03-2024-0296/full/html)

Applies Gallie's "essentially contested concepts" framework to explain why GRI, ISSB, and ESRS will not converge on a single definition of materiality. Provides theoretical grounding for why the study should not assume GRI 3's impact-only definition is universally accepted — it is a contested choice with normative implications.

**4. Garst, Maas & Suijs (2022) — "Materiality Assessment Is an Art, Not a Science"**
*California Management Review*, Vol. 65, No. 1 — [Link](https://journals.sagepub.com/doi/10.1177/00081256221120692)

Documents cherry-picking bias, win-win distortion, and the spurious precision of materiality matrices. Directly motivates the visualization format coding in S15 — the matrix's decline is a response to these documented flaws. Cite as motivation for including `process_quality_score` and `scoring_method_disclosed` in the analysis.

**5. Baumüller & Sopp (2022) — "Double Materiality and the Shift from Non-Financial to European Sustainability Reporting"**
*Journal of Applied Accounting Research*, Vol. 23, No. 1, pp. 8–28 — [Link](https://www.emerald.com/insight/content/doi/10.1108/jaar-04-2021-0114/full/html)

Provides the theoretical account of how double materiality emerged in EU regulatory logic and why it imposes substantial implementation costs. For the TWSE sample, where double materiality is voluntary (TSMC adopts it; most companies do not), this paper supports treating `double_materiality_mentioned` as an endogenous moderator rather than a controlled-for covariate.

**Positioning matrix for the journal submission:**

| Prior Study | Their Treatment | This Study | Distinction |
|---|---|---|---|
| Khan et al. (2016) | SASB financial materiality → stock returns | GRI 3 impact materiality → topic selection | Different classification regime; process rather than outcome |
| Göttsche et al. (2025) | SASB classification → sustainability performance | GRI 3 adoption → topic count/composition | Topic selection rather than performance; impact not financial materiality |
| Beske et al. (2020) | Cross-section G4 vs. GRI Standards | Longitudinal G4→GRI 3 with staggered DiD | Causal identification; semiconductor-specific |
| Padilla-Garrido et al. (2024) | Cross-section GRI 3 determinants | Longitudinal pre/post + TWSE context | Causal; industry-specific; Asian market gap |

---

### S21. AI-Assisted Materiality — Coding Variable for the Study

The companion Trends report documents a growing ecosystem of AI-assisted DMA platforms (Datamaran, Deloitte AI-DMA, Solidflow, Workiva, Socialsuite). For TWSE semiconductor companies, voluntary disclosure of AI tool use in the materiality process is beginning to appear in reports.

**Add to Block C:**

| New Field | Type | Description |
|---|---|---|
| `ai_tool_disclosed` | Binary | Company discloses use of AI/software platform in materiality assessment |
| `ai_tool_name` | Text | Name of platform disclosed (Datamaran / Workiva / proprietary / not specified) |

**Methodological note:** AI-assisted DMA may inflate IRO counts (platforms suggest all potentially relevant topics, companies may adopt them wholesale) or may improve process rigour (platforms enable more systematic stakeholder data integration). Either direction is theoretically motivated and testable. Include `ai_tool_disclosed` as a covariate in the process quality regression to test whether AI tool adoption is associated with higher `process_quality_score` — controlling for firm size to rule out confounding by scale.

---

*Second research integration update compiled: May 18, 2026 | Sourced from: Sustainability Reporting & Materiality Assessment Trends 2026 companion report, FSC/IAASB verification searches, GRI 101 standard documentation, and ISSA 5000 IAASB publication.*
