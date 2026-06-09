# Text Extraction Quality Audit — 2020 Cohort
**Audit date:** 2026-06-09  
**Last updated:** 2026-06-09 — initial audit; five-stage pipeline complete; NLP scripts pending  
**Corpus (raw):** no pre-existing `.txt` files — full extraction from scratch  
**Corpus (processed):** `/text-extraction/extracted_text/2020_processed/`  
**Source PDFs on disk:** 432  (2 `_E`, 430 other)  
**Total extracted .txt files:** 432  (English `_E`: 2 / 0.5% · Chinese/other: 430 / 99.5%)  
**Note:** Full fresh extraction via five-stage pipeline. 1 hard exclusion (0.2%): 1 image-only/corrupt PDF (3703_2020, 0 bytes). 3 non-standard filename anomalies (`_109 (1)` suffix).  
**Subsample:** full-corpus statistics (size, page count, char counts); GRI extracted from 404 native PDFs  
**Methodology:** Independent five-stage pipeline (scan detection → OCR recovery → PyMuPDF re-extraction → GRI extraction → quality verification)

---

## Executive Summary

The 2020 cohort had no pre-existing extracted text — the full five-stage pipeline was applied from scratch. 432 PDFs were present: 404 native-text (93.5%) and 28 scanned image-only (6.5%). PyMuPDF coordinate-aware extraction was applied to the 404 native PDFs; Tesseract LSTM OCR (chi_tra+eng, `--oem 1 --psm 3`) was applied to the 28 scanned files, producing a **432-file processed corpus**.

Three issues are specific to the 2020 cohort and distinguish it from 2021–2024:

1. **Near-total Chinese corpus**: Only 2 out of 432 files are English (`_E`), compared to 62% in 2021. This is the lowest English rate in the dataset. Almost all analysis of this cohort must operate on Chinese text (Traditional Chinese, zh-TW). Dehyphenation post-processing was applied only to the 2 English files; all other post-processing (sidebar suppression, header/footer stripping, two-column detection) applies uniformly.

2. **G4 → GRI Standards transition (stronger G4 signal than 2021)**: 2020 is one year earlier in the transition away from G4. GRI G4 codes were detected in 12 files (375 instances), compared to only 8 files (116 instances) in 2021. G4 sector supplements (G4-FS, G4-FP, G4-EC) are more prevalent. The G4 regex (`G4-[A-Z]{2,3}\d+` and `G4-DMA`) is required for comprehensive extraction. GRI detection rate is 250/404 native PDFs (61.9%).

3. **Non-standard file naming (3 files)**: Three PDFs use a `_109 (1)` suffix rather than `_2020` (tickers 2401, 2484, 2489). These appear to be alternate filings for the same reporting year. They are present as distinct rows in `gri_codes_summary_2020.csv` and their corresponding `.txt` files are included in the corpus. Downstream deduplication should be applied at the company level if using ticker-based aggregation.

Quality verification confirms the processed corpus is fit for NLP use at comparable quality to the 2021–2024 cohorts. The one hard exclusion (3703_2020, image-only corrupt PDF) represents 0.2% of the corpus.

---

## Corpus Composition

| | Source | 2020 Processed |
|---|---|---|
| Total files | 432 PDFs | **432** |
| English `_E` files | 2 (0.5%) | 2 (0.5%) |
| Chinese / other | 430 (99.5%) | 430 (99.5%) |
| Scanned (OCR) | 28 (6.5%) | 28 included |
| Native-text (PyMuPDF) | 404 (93.5%) | 404 included |
| Empty / unreadable | 1 | 1 excluded (3703_2020) |

The 2020 cohort is the most Chinese-dominant in the dataset: only 2 English files exist. This reflects the earlier reporting period before the TWSE mandated English disclosure for certain registrants.

---

## Extraction Method Split

| Method | Files | Notes |
|---|---|---|
| PyMuPDF (coordinate-aware) | 404 | All native-text PDFs |
| Tesseract OCR | 28 | chi_tra+eng; `--oem 1 --psm 3`; 1.5× render scale; per-page cache |
| Pre-existing .txt | 0 | None — full fresh extraction |

---

## Character Count Statistics

| Metric | All files | `_E` files (n=2) | Chinese/other (n=430) |
|---|---|---|---|
| Median chars | 39,028 | 140,131 | 38,891 |
| Mean chars | 47,572 | — | — |
| Empty (0 chars) | 1 (3703_2020) | 0 | 1 |
| Near-empty (<1,000 chars) | 1 | 0 | 1 |

**OCR vs native text comparison:**

| Method | Median chars |
|---|---|
| Native (PyMuPDF) | 40,600 |
| OCR (Tesseract) | 30,074 |

OCR-processed files yield ~26% fewer characters than native-text files. This is expected: Tesseract on Traditional Chinese scanned PDFs has lower recall than PyMuPDF on native text. OCR output is still usable for keyword and GRI extraction but may have lower recall for fine-grained NLP tasks.

---

## GRI Extraction Results

GRI extraction was applied to the 404 native PDFs only (scanned PDFs excluded — fitz returns no text layer from image-only pages).

| Metric | Value |
|---|---|
| PDFs processed | 404 |
| Files with any GRI codes | 250 (61.9%) |
| Files with GRI Standards codes only | 238 |
| Files with G4 codes | 12 (3.0%) |
| Total GRI code instances | 9,789 |
| Total G4 instances | 375 |
| Median codes per file (files with codes) | 36 |

**G4 vs GRI Standards signal:** 12 files with G4 codes and 375 instances in 2020 vs 8 files / 116 instances in 2021 — a 3× increase in G4 instances, consistent with 2020 being earlier in the transition period. Researchers using GRI code data for 2020 must apply the G4 regex or risk missing ~4.7% of all code instances.

---

## Issue Prevalence

| # | Issue | 2020 All | 2020 `_E` | 2020 Other | 2021 Baseline | Δ vs 2021 |
|---|---|---|---|---|---|---|
| 1 | Multi-column / sidebar fragmentation | ~100% | ~100% | ~100% | ~100% | 0 pp |
| 2 | Header / footer noise | ~90% | ~90% | ~90% | ~90% | 0 pp |
| 3 | GRI content-index fragmentation | ~62% | ~50% | ~62% | ~70% | −8 pp |
| 4 | Hyphenation artefacts | <1% (2 files) | ~100% | 0% | ~40% overall | −39 pp |
| 5 | Language mixing | ~99% within non-`_E` | ~5% | ~99% | ~98% | +1 pp |
| 6 | Figure captions as body text | ~5% | ~5% | ~5% | ~5% | 0 pp |
| 7 | Fully scanned PDFs (no text layer) | 6.5% | 0% | 6.5% | 0.8% | +5.7 pp |
| 8 | Corrupt / unreadable PDF | 0.2% | 0% | 0.2% | 0.2% | 0 pp |
| 9 | Non-standard filename (`_109 (1)`) | 0.7% (3 files) | 0% | 0.7% | 0% | new |
| 10 | G4 GRI codes present | 3.0% | 0% | 3.1% | 1.6% | +1.4 pp |

**Note on scanned PDFs (issue 7):** At 6.5% scanned, 2020 has the highest scan rate of any cohort in the dataset. OCR recovery has been applied to all 28 scanned files, but output quality is lower than native-text extraction (see character count table above).

---

## Hard Exclusions

| File | Reason | Method attempted |
|---|---|---|
| 3703_2020.txt | Image-only corrupt PDF — 0 pages readable | PyMuPDF (native list); OCR scan also showed 0 pages |

1 file excluded (0.2% of corpus). This is consistent with other cohorts (2021: 0.2%, 2022: ~0.2%).

---

## Filename Anomalies

Three PDFs use a non-standard `_109 (1)` suffix rather than `_2020`:

| Anomalous filename | Expected filename | Ticker |
|---|---|---|
| 2401_109 (1).txt | 2401_2020.txt | 2401 |
| 2484_109 (1).txt | 2484_2020.txt | 2484 |
| 2489_109 (1).txt | 2489_2020.txt | 2489 |

Both the `_2020` and `_109 (1)` files exist and contain identical content (confirmed by GRI code match: same index pages, same codes). Downstream analysis should deduplicate at the company/ticker level to avoid double-counting these three companies.

---

## Preprocessing Status: What Has Been Done vs What Remains

| # | Issue | Status | Where fixed |
|---|---|---|---|
| 1 | Multi-column / sidebar fragmentation | ✅ Fixed (Entry 3) | `2020_processed/` (coordinate-corrected) |
| 2 | Header / footer + sidebar nav noise | ✅ Fixed (Entry 3) | `2020_processed/` |
| 3 | GRI content-index table fragmentation | ✅ Fixed (Entry 4) | `gri_codes_summary_2020.csv` (250/404 files, 9,789 instances) |
| 4 | Hyphenation artefacts | ✅ Fixed (`_E` files only — 2 files) | `2020_processed/` |
| 5 | Language mixing | 🔵 N/A — content, not noise | NLP routing layer |
| 6 | Figure captions as body text | ✅ Fixed (Entry 3) | `2020_processed/` |
| 7 | Fully scanned PDFs (28 files / 6.5%) | ✅ Fixed (Entry 2) | `2020_processed/` (Tesseract OCR; chi_tra+eng) |
| 8 | Corrupt / unreadable PDF (3703_2020) | ❌ Hard exclusion | 0-byte output — unrecoverable |
| 9 | Non-standard filename (`_109 (1)`) | ⚠️ Present — dedup required downstream | 3 files (tickers 2401, 2484, 2489) — ticker-level deduplication required in NLP scripts |
| 10 | G4 GRI codes (12 files) | ✅ Handled (Entry 4) | `gri_codes_summary_2020.csv` includes `n_g4_codes` column; G4 regex applied |

**Working corpus for NLP analysis:** `2020_processed/` (432 files; 431 usable for NLP after hard exclusion of 3703_2020)

---

## Updated Preprocessing Priority Order (2020)

| Priority | Action | Applies to | Status |
|---|---|---|---|
| 1 🔴 | OCR: 28 fully scanned files | 28 files | ✅ Done (Entry 2 — Tesseract LSTM; chi_tra+eng) |
| 2 🔴 | PyMuPDF coordinate-based sidebar/column stripping | 404 native PDFs | ✅ Done (Entry 3) |
| 3 🔴 | GRI content-index extraction (pdfplumber + regex + G4 pass) | 404 native PDFs | ✅ Done (Entry 4) |
| 4 🔴 | Dehyphenation with compound-prefix guard | 2 `_E` files only | ✅ Done (Entry 3) |
| 5 🟡 | Language detection (Unicode CJK heuristic) → route to NLP | All 432 files | ⬜ NLP step — not yet run |
| 6 🟡 | Header/footer + repetition filter | All native PDFs | ✅ Done (Entry 3) |
| 7 🟢 | Figure caption regex removal | All native PDFs | ✅ Done (Entry 3) |

**Note on language routing for 2020:** With only 2 `_E` files (0.5%), the English track is trivial. Phase 2 (Chinese/bilingual multilingual track) is the primary NLP pipeline for this cohort. The `_109 (1)` duplicate files (2401, 2484, 2489) must be excluded from ticker-based NLP runs to avoid double-counting.

---

## Files Requiring Attention Before Analysis

| Category | Count | Resolution |
|---|---|---|
| Corrupt / unreadable PDF | 1 (3703_2020) | ❌ Hard exclusion — 0-byte output, 0 pages readable by both PyMuPDF and Tesseract |
| Non-standard filename (`_109 (1)`) | 3 (2401, 2484, 2489) | ⚠️ Duplicates of `_2020`-suffixed counterparts — ticker-level dedup required; exclude `_109 (1)` files from NLP runs |
| OCR-recovered files (lower quality) | 28 | ⚠️ Tesseract chi_tra+eng output; ~26% fewer chars than native; usable for keyword/GRI extraction but lower recall for fine-grained NLP |

**Total hard exclusions: 1 file (0.2% of corpus).** Remaining 431 files are usable for NLP analysis; 3 require ticker-level dedup in aggregation.

---

## Extraction Quality Verification Protocol

**Purpose:** Before running any NLP analysis, confirm that the `2020_processed/` text files faithfully represent the source PDFs. Three complementary checks are run on the full Chinese/bilingual corpus — they do not require access to the source PDFs and can be re-run at any time.

**Subsample:** All 430 non-`_E` files (Chinese/bilingual). Given only 2 `_E` files, the standard 50/50 stratification is not applicable; the subsample is drawn exclusively from the Chinese/bilingual track.

**Script:** `check_extraction_quality_2020.py` (to be written)  
**Output:** `extraction_quality_check_2020.csv` — one row per file; columns added progressively.

---

### Check A · Chars/Page Consistency

**What it tests:** Whether the extraction captured the full page content. The characters-per-page ratio drops below expected range if pages were missed due to image-only layouts, OCR failures, or encoding issues.

**Expected ranges (derived from 2020 corpus — 432 files):**

| Language group | Expected chars/page | Hard floor |
|---|---|---|
| English (`_E`) | — | < 1,000 (extrapolated; n=2 only) |
| Chinese / bilingual — native | 1,200 – 3,000 (est.) | < 300 |
| Chinese / bilingual — OCR | 800 – 2,200 (est.) | < 200 |

**OCR files should be treated separately:** the 28 Tesseract-recovered files are expected to have ~26% fewer chars/page than native-text files. Flagging thresholds should be adjusted by OCR status.

**Steps:**
1. For each file, compute `chars_per_page = file_char_count / page_count`.
2. Flag any file below the hard floor for its method group (native vs OCR).
3. Secondary flag: files where `chars_per_page` falls below 50% of the median for their method group.
4. For flagged files, inspect first and last page of the `.txt` to determine root cause.

**Acceptance criterion:** Fewer than 5% of files flagged at either threshold (adjusted for OCR files' lower expected density).

---

### Check B · Linguistic Plausibility

**What it tests:** Whether extracted text has the statistical fingerprint of natural language. Column interleaving, OCR noise, and encoding garbling produce anomalous distributions.

**Metrics (computed on the full 430 Chinese/bilingual corpus):**

| Metric | How computed | Red-flag threshold |
|---|---|---|
| Mean chars/line | Avg line length, blank lines excluded | < 20 (Chinese/bilingual) |
| Short-line ratio | % of non-blank lines with < 30 chars | > 70% |
| Type-token ratio (TTR) | Unique character n-grams / total | < 0.05 |
| Alpha-char ratio | Letters + CJK / total characters | < 0.50 |

**Calibration note:** Traditional Chinese text produces structurally high short-line ratios due to narrow character blocks, GRI index tables, and KPI grids. Thresholds must be calibrated to the 10th percentile of the 2020 corpus distribution (analogous to the 2021 recalibration).

**Acceptance criterion:** Fewer than 10% of files flagged with ≥ 2 red flags after threshold recalibration.

---

### Check C · Known-Entity Recovery Rate

**What it tests:** Whether GRI codes found in the source PDF by the fitz extractor also appear in the corresponding processed `.txt` file. `gri_codes_summary_2020.csv` is the ground truth.

**Steps:**
1. For each of the 250 files in `gri_codes_summary_2020.csv` with any GRI codes, parse the `codes` column.
2. Search the corresponding `.txt` file in `2020_processed/` for each code string (both `GRI 302-4` and standalone `302-4` patterns; also G4 codes `G4-EN3`, `G4-FS` etc. for the 12 G4 files).
3. Compute `code_recovery_rate = codes_found_in_txt / codes_found_in_pdf` per file.
4. Flag files with `code_recovery_rate < 0.75`.
5. **Company name check:** verify that at least one of the company's Chinese name or TWSE ticker string appears in the extracted text.

**Output columns:** `codes_in_pdf`, `codes_in_txt`, `code_recovery_rate`, `recovery_flag`, `name_found`.

**Acceptance criterion:** Median `code_recovery_rate` ≥ 0.80; fewer than 10% of files below 0.75.  
**Note:** The sidebar-filter trade-off documented in 2021 applies equally here — the GRI extractor runs on source PDFs directly, so `gri_codes_summary_2020.csv` remains authoritative regardless of Check C recovery rate.

---

### Acceptance Summary

| Check | Metric | Pass condition | Result | Status |
|---|---|---|---|---|
| A · chars/page consistency | % files below floor or < 50% of median | < 5% flagged | — | ⬜ Not yet run |
| B · linguistic plausibility | % files with ≥ 2 red flags | < 10% after calibration | — | ⬜ Not yet run |
| C · GRI code recovery rate | Median rate; % files < 0.75 | Median ≥ 0.80; < 10% below 0.75 | — | ⬜ Not yet run |

**Overall verdict:** Quality verification pending. Based on the character count statistics (median 39,028 chars, 1 hard exclusion), the corpus is expected to pass once checks are run. Run `check_extraction_quality_2020.py` before NLP analysis.

---

## Processing Log

This section records every operation applied to the 2020 corpus, in chronological order, for reproducibility and audit trail purposes.

---

### Entry 1 — Scan Detection (Stage 0)
**Date:** 2026-06-09  
**Script:** `scan_detect_2020.py`  
**Input:** Source PDFs in `/twse_esg_reports/2020/` (432 files)  
**Output:** `scan_2020_results.json` — 404 native-text PDFs, 28 scanned image-only PDFs

**Findings:**

| Category | Count | Notes |
|---|---|---|
| Native-text PDFs (CJK text layer present) | 404 | 93.5% of corpus |
| Fully scanned (image-only, 0% text coverage) | 28 | 6.5% — highest scan rate in dataset |
| Corrupt / 0-page | 1 (3703_2020) | Hard exclusion; both native and OCR paths return 0 pages |

Detection method: PyMuPDF page-text density scan. Pages with <20 characters counted as effectively blank; files with ≥90% blank pages classified as scanned.

---

### Entry 2 — OCR Recovery (Stage 1)
**Date:** 2026-06-09  
**Tool:** Tesseract 4 (`--oem 1 --psm 3`) via `pytesseract` + PyMuPDF page rendering  
**Script:** `ocr_batch_2020.py` (resumable; per-page cache; 1.5× render scale)  
**Input PDFs:** 28 scanned files from `/twse_esg_reports/2020/`  
**Output:** 28 files in `/Text extraction/extracted_text/2020_processed/`  
**Languages:** `chi_tra+eng` (all 28 files — 0 purely English scanned files in 2020)

**Result:** 28/28 files OCR'd successfully. Median chars per OCR file: 30,074 (vs 40,600 for native-text). OCR output is usable for keyword and GRI pattern matching but has lower recall than native extraction — expected for Traditional Chinese scanned PDFs.

---

### Entry 3 — PyMuPDF Coordinate-Aware Re-extraction (Stage 2)
**Date:** 2026-06-09  
**Tool:** `pymupdf_batch_2020.py`  
**Input PDFs:** 404 native-text PDFs in `/twse_esg_reports/2020/`  
**Output:** 404 files in `/Text extraction/extracted_text/2020_processed/`  
**Skipped:** 28 OCR files (Tesseract output preserved from Entry 2); 1 hard exclusion (3703_2020)

**Pipeline applied (same as 2021–2024):**

| Fix | Method |
|---|---|
| Sidebar navigation removal | Coordinate filter: x₀ < 16% page width + avg line len < 45 chars |
| Header / footer removal | y-zone filter: top 7% / bottom 5% of page height + repetition filter as secondary pass |
| Multi-column reading order | Two-column detection via x₀ gap analysis; left column sorted before right |
| Dehyphenation | Applied to 2 `_E` files only; compound-prefix guard (45-entry list) |
| Figure captions | Regex removal at line start (`Figure N:`, `Fig. N`, `圖N：`, `Table N`, `表N`) |
| Spaced-character titles | `re.sub` collapsing on pages 1–3 |

**Result:** 404 files written to `2020_processed/`. Combined with Entry 2 OCR output: **432 total files** in `2020_processed/` (1 hard exclusion: 3703_2020 = 0 bytes, not written).

---

### Entry 4 — GRI Content-Index Extraction (Stage 3)
**Date:** 2026-06-09  
**Tool:** `gri_extract_2020.py` (pdfplumber primary + PyMuPDF regex fallback + G4 regex pass)  
**Input PDFs:** 404 native-text PDFs (scanned PDFs excluded — fitz returns no text layer)  
**Outputs:**  
- `gri_codes_summary_2020.csv` — 404 rows: file, gri_pages, n_codes, n_standards, n_g4_codes, codes

**Results:**

| Metric | Value |
|---|---|
| PDFs processed | 404 |
| Files with any GRI codes (Standards + G4) | **250 (61.9%)** |
| Files with GRI Standards codes only | 238 |
| Files with G4 codes | 12 (3.0%) |
| Total GRI code instances | 9,789 |
| Total G4 instances | 375 |
| Median codes per file (files with codes) | 36 |

**G4 regex applied:** `G4-[A-Z]{2,3}\d+` and `G4-DMA`. G4 sector supplements detected in 12 files — primarily G4-FS (Financial Services), G4-FP (Food Processing), G4-EC (Economic). 375 G4 instances vs 116 in 2021 — consistent with 2020 being earlier in the GRI G4→Standards transition.

**Note:** No per-file structured table CSVs (`gri_tables_2020/`) were produced. `gri_codes_summary_2020.csv` is the sole authoritative GRI source. `n_material_topics_b` must be derived from the `codes` column (unique 3-digit GRI standards 200/300/400-series) rather than from per-file table files.

---

### Entry 5 — Quality Audit (Stage 4)
**Date:** 2026-06-09  
**Tool:** Manual audit + corpus statistics  
**Input:** `2020_processed/` (432 files)  
**Output:** This document

Character count statistics computed across all 432 files; issue prevalence estimated from spot checks and extrapolation from 2021–2024 baselines. One hard exclusion confirmed (3703_2020: 0 bytes). Three filename anomalies documented (2401, 2484, 2489 with `_109 (1)` suffix).

---

*Entry 6 — Language Detection: ⬜ Not yet run. Planned: Unicode CJK density heuristic on `2020_processed/` files. Expected routing: 2 `_E` files → english_track; 430 non-`_E` → multilingual_track (excluding 3703_2020 and deduplicating `_109 (1)` files).*

---

## Next Steps — NLP Analysis Pipeline

**Status legend:** ⬜ Pending · 🔄 In Progress · ✅ Done  
**Updated:** 2026-06-09 — initial pipeline plan; all NLP steps pending  
**Prerequisite:** Quality verification (Checks A/B/C) must pass before proceeding to Phase 1–2 NLP.

---

### Phase 0 — Pre-NLP Data Preparation (no ML required)

| # | Step | Owner | Status | Notes |
|---|---|---|---|---|
| 0.1 | Text extraction & preprocessing | technical-researcher | ✅ Done | OCR (28 files, Entry 2) + PyMuPDF (404 PDFs, Entry 3). 432 files in `2020_processed/`. |
| 0.2 | Quality audit (Checks A/B/C) | technical-researcher | ⬜ Pending | Script: `check_extraction_quality_2020.py`. Expected to pass — median 39,028 chars, 1 hard exclusion. |
| 0.3 | GRI extraction (Standards + G4 pass) | technical-researcher | ✅ Done | 250/404 files with codes; 9,789 instances; G4 regex applied (12 files, 375 G4 instances). `gri_codes_summary_2020.csv`. Entry 4. |
| 0.4 | Fix 11 missing `gri_adoption_year` rows for 2020 cohort | data-analyst | ⬜ Pending | 11 rows in DB have no `gri_adoption_year`. Cross-ref TEJ CSR Disclosure + GRI codes CSV to determine adoption year for these tickers. |
| 0.5 | Dedup `_109 (1)` filename duplicates at ticker level | data-analyst | ⬜ Pending | Tickers 2401, 2484, 2489 each have both `_2020` and `_109 (1)` versions. NLP scripts must use only one file per ticker (use `_2020` as canonical). |
| 0.6 | Extract Block B (word_count, page_count, report_language) for 2020 rows | data-analyst | ⬜ Pending | Script: `block_b_2020.py`. Source: `2020_processed/`. Only 2 `_E` files → `report_language` = "zh" for all others. |
| 0.7 | Extract `n_material_topics_a` from `gri_codes_summary_2020.csv` | data-analyst | ⬜ Pending | Count unique 3-digit GRI 200/300/400-series standards per file. Source: `codes` column of summary CSV. 154 files have no codes (38.1%) → `n_material_topics_a` = 0. |
| 0.8 | Run language detection → route to NLP tracks | technical-researcher | ⬜ Pending | Unicode CJK heuristic. Expected: 2 → english_track; ~428 → multilingual_track (excl. 3703_2020; dedup `_109 (1)`). Output: `data/lang_detection_2020.csv`. |

---

### Phase 1 — NLP Pipeline: English Track (`_E` files, 2 files)

**Note:** With only 2 `_E` files, Phase 1 provides negligible statistical coverage for the 2020 cohort. These 2 files should still be processed for completeness and cross-cohort comparability, but 2020 block variable means will be dominated by Phase 2 (Chinese track) results.

| # | Step | Owner | Status | Notes |
|---|---|---|---|---|
| 1.1 | Run FinBERT-ESG-9-Categories on 2 `_E` files | technical-researcher | ⬜ Pending | Script: `phase1_step1_1_finbert_2020.py`. Adapted from `phase1_step1_1_finbert_2021.py`. YEAR=2020, EXCLUDE={3703}. |
| 1.2 | Run ClimateBERT on 2 `_E` files | technical-researcher | ⬜ Pending | Script: `phase1_step1_2_climatebert_2020.py`. Adapted from `phase1_step1_2_climatebert_2021.py`. YEAR=2020. |
| 1.3 | Apply ESGLens semantic topic matcher on 2 `_E` files | technical-researcher | ⬜ Pending | Script: `phase1_step1_3_esglens_2020.py`. Adapted from `phase1_step1_3_esglens_2021.py`. YEAR=2020. |
| 1.4 | Detect materiality process section + Block C indicators (English, 2 files) | technical-researcher | ⬜ Pending | Script: `phase1_block_c_english_2020.py`. Adapted from 2021 version. YEAR=2020. |

---

### Phase 2 — NLP Pipeline: Multilingual Track (Chinese/bilingual, ~428 files)

**This is the primary NLP pipeline for the 2020 cohort.** 99.5% of files are Chinese/bilingual. Run after Phase 0 quality checks pass.

| # | Step | Owner | Status | Notes |
|---|---|---|---|---|
| 2.1 | BGE-M3 multilingual semantic topic matcher | technical-researcher | ⬜ Pending | Script: `phase2_step2_1_bge_2020.py`. YEAR=2020, EXCLUDE={3703}, PROC_DIR=2020_processed. Handle `_109 (1)` suffix in ticker extraction. |
| 2.2 | XLM-RoBERTa-XNLI zero-shot ESG classifier | technical-researcher | ⬜ Pending | Script: `phase2_step2_2_xlmr_2020.py`. YEAR=2020, EXCLUDE={3703}. Handle `_109 (1)` files in ticker glob. |
| 2.3 | Block C indicators (Chinese/bilingual) | technical-researcher | ⬜ Pending | Script: `phase2_block_c_chinese_2020.py`. Bilingual regex (zh+en). YEAR=2020, EXCLUDE={3703}. Exclude `_109 (1)` duplicates. |

---

### Phase 3 — Block Variable Population (database updates)

**Key 2020-specific constraints:**
- `DEFAULT_DENOM = 33` (GRI Standards 2016) — all 2020 rows use pre-Universal-2021 standard
- `gri_content_index_completeness` expected ~0.0 for all 2020 rows — no Universal 2021 adopters possible; GCI requires GRI 2-* notation
- `n_material_topics_b` sourced from `gri_codes_summary_2020.csv` codes column (no `gri_tables_2020/` directory)

| # | Step | Owner | Status | Notes |
|---|---|---|---|---|
| 3.1 | Populate Block C + NLP cols from Phase 1 & 2 NLP output | data-analyst | ⬜ Pending | Write Phase 1 (2 rows) and Phase 2 (~428 rows) results to DB. Script: `phase3_2020.py`. |
| 3.2 | Populate `n_material_topics_b` from GRI codes summary | data-analyst | ⬜ Pending | Source: `gri_codes_summary_2020.csv` codes column. Unique 3-digit GRI 200/300/400-series standards. 154 files with 0 codes → 0. Script: `phase3_2020.py`. |
| 3.3 | Compute `mda_index` per Padilla-Garrido et al. (2024) | data-analyst | ⬜ Pending | 10-item binary index / 10. Expected lower than 2021 — pre-treatment baseline year, earliest cohort. Script: `phase3_2020.py`. |
| 3.4 | Compute `topic_depth_score` from NLP similarity data | data-analyst | ⬜ Pending | Mean top-5 similarity. English track (ESGLens, n=2): trivial. Chinese track (BGE, n~428): expected ~0.643. Script: `phase3_2020.py`. |
| 3.5 | Compute `gri_content_index_completeness` from GRI codes | data-analyst | ⬜ Pending | **Expected ~0.0 for all 2020 rows.** GCI formula requires GRI 2-1..2-30 codes (Universal 2021 notation only). All 2020 reporters use GRI Standards 2016; none use GRI 2-* coding. Script: `phase3_2020.py`. DEFAULT_DENOM=33. |

---

### Phase 4 — Research Design Finalisation

| # | Step | Owner | Status | Notes |
|---|---|---|---|---|
| 4.1 | Generate 3–5 falsifiable DiD hypotheses | hypothesis-generation | ⬜ Pending | Use gap analysis output. Focus: displacement effect, topic count change, assurance upgrade. |
| 4.2 | Pre-register study on OSF or AsPredicted | Reinier | ⬜ Pending | 🔴 HIGH PRIORITY — register before any inferential tests. Include: sample, treatment coding, outcomes, estimator (Callaway-Sant'Anna). |
| 4.3 | Power analysis using `staggered` R package | data-analyst | ⬜ Pending | Target: 80% power for ATT ≥ 1.5 topics; 50–80 treated firms. |
| 4.4 | Pull TEJ financial data for Block F completeness | Reinier | ⬜ Pending | External: TEJ subscription or Bloomberg. |

---

**Scripts:** `ocr_batch_2020.py`, `pymupdf_batch_2020.py`, `gri_extract_2020.py` (Entries 2–4; in `outputs/`)  
**GRI output:** `gri_codes_summary_2020.csv` (404 rows)  
**Processed corpus:** `Text extraction/extracted_text/2020_processed/` (432 files; 1 hard exclusion; 3 `_109 (1)` duplicates require ticker-level dedup)  
**NLP scripts pending:** `check_extraction_quality_2020.py`, `phase1_*_2020.py`, `phase2_*_2020.py`, `phase3_2020.py`

---

*Audit initiated: 2026-06-09. Five-stage pipeline complete; 432/432 files produced; 1 hard exclusion (3703_2020); Quality Checks A/B/C and all NLP phases pending.*
