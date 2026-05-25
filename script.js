// Materiality Mining — Research Project Site
// All application logic: content model, theme system, UI components, page renderers.
// Transpiled in-browser by Babel standalone (loaded in index.html).

/* ── shared.jsx ─────────────────────────────────────────────────────────── */
// shared.jsx — content model, helpers, and tweak primitives shared by both directions.

const CONTENT = {
  meta: {
    title: "Materiality in Sustainability Reporting",
    subtitle: "A staggered-DiD text-mining study of GRI 3 adoption among TWSE firms and global peers, 2021–2024",
    pi: "Reinier Kirsten",
    pi_role: "Principal Investigator",
    affiliation: "Sustainability And Green Energy · National Central University",
    started: "Sep 2024",
    expected_completion: "Mar 2027",
    funding_id: "Grant № SSH-24-0412",
    project_id: "RK-2026",
    orcid: "0000-0001-2345-6789",
    email: "rk.reinierkirsten@gmail.com",
  },
  abstract: [
    "GRI 3: Material Topics (effective January 2023) re-defined how reporting firms should identify and prioritise material topics. This project asks whether the standard's roll-out changed the topic-selection behaviour of TWSE-listed semiconductor companies, and whether their behaviour converges with global peers.",
    "We assemble a panel of company-year sustainability reports for the TWSE universe and global peers (2021–2024), apply a five-stage text-extraction pipeline to their Sustainability reports, and code material topics with a three-stage NLP pipeline (RapidFuzz → multilingual-e5-large-instruct → manual concordance).",
    "Identification uses staggered difference-in-differences (Callaway & Sant'Anna 2021 as primary; Sun & Abraham 2021 and Borusyak, Jaravel & Spiess 2024 as robustness) on first-year GRI 3 adoption, with HonestDiD pre-trend sensitivity. Compositional change is tested via ILR-transformed SUR; matrix-format change via conditional logit.",
  ],
  status: {
    stage: "Data collection",
    stage_index: 2,
    stages: ["Scoping", "Pipeline build", "Data collection", "Analysis", "Writing", "Submission"],
    pct: 48,
    last_update: "May 22, 2026",
    counts: [
      { k: "Reports processed (4 cohorts)", v: "3,180", of: "TWSE universe" },
      { k: "GRI code instances extracted", v: "194,168", of: "across 2021–2024" },
      { k: "Semiconductor company-years", v: "276", of: "of ~290 target" },
      { k: "Global peer reports", v: "11", of: "of ~40 target" },
      { k: "OCR-recovered scanned PDFs", v: "49", of: "Tesseract LSTM" },
      { k: "Quality audits completed", v: "4 / 4", of: "cohorts 2021–2024" },
    ],
    next: [
      { d: "Jun 2026", t: "Block C extraction across 2021–2023 cohorts (extract_block_c.py)" },
      { d: "Jul 2026", t: "Block D pipeline: FinBERT-ESG + XLM-RoBERTa zero-shot on 3,180 reports" },
      { d: "Sep 2026", t: "Inter-coder reliability on 20% subsample (target κ ≥ 0.80)" },
      { d: "Oct 2026", t: "Global peer PDF collection from IR pages (~40 priority reports)" },
      { d: "Dec 2026", t: "Goodman-Bacon decomposition; primary CS21 estimation" },
      { d: "Mar 2027", t: "Working paper v1 — internal seminar" },
    ],
  },
  methods: [
    {
      h: "Corpus assembly",
      p: "TWSE sustainability reports sourced from the ESGgenplus bulk download plus per-company IR pages for the remaining tickers. Global peers (TSMC, UMC, ASE, Nvidia, Qualcomm, Intel, Samsung, SK Hynix, ASML, et al.) collected directly from investor-relations archives. Each report carries provenance, language, fiscal year, GRI standard version, and GICS subsector.",
    },
    {
      h: "Five-stage extraction pipeline",
      p: "(1) Scan detection on every PDF; (2) Tesseract LSTM OCR (chi_tra+eng / eng) on 49 fully or partially scanned files; (3) PyMuPDF coordinate-aware re-extraction with header/footer y-zone filter (top 7% / bottom 5%) and sidebar suppression (x₀ < 16%, avg line < 45 chars); (4) GRI content-index regex extraction via fitz (pdfplumber where stable in 2024); (5) three-check quality verification (chars/page consistency, linguistic plausibility, GRI code recovery rate).",
    },
    {
      h: "Topic coding (Block D)",
      p: "Paragraph-level dataset → language routing via fastText lid.176.bin → FinBERT-ESG-9-Categories on English; multilingual-e5-large-instruct + XLM-RoBERTa-XNLI zero-shot on bilingual sections. Three-stage label mapping: RapidFuzz exact/fuzzy → Qwen3-Embedding 0.6B semantic → manual concordance table for the unmatched residual. Inter-rater reliability (κ, α) on a 20% subsample.",
    },
    {
      h: "Identification & estimation",
      p: "Goodman-Bacon decomposition first, to confirm a staggered DiD is appropriate. Primary: Callaway & Sant'Anna (2021) doubly-robust group-time ATT with not-yet-treated control. Robustness: Sun & Abraham (2021); Borusyak, Jaravel & Spiess (2024) imputation. Pre-trend sensitivity: HonestDiD bounds. Composition: ILR + SUR. Matrix-format change: conditional logit with firm FE. Topic-level battery: Conditional logit + GEE with Benjamini-Hochberg FDR.",
    },
    {
      h: "Coding framework for global comparison",
      p: "Block A (firmographics) for TWSE via TEJ; Compustat Global / Bloomberg for peers. Block B (report metadata) populated from preprocessing manifests. Block C (materiality process: 13 disclosure variables from Beske et al. 2020 + Machado 2021 + Padilla-Garrido et al. 2024). Block F (financial controls): Hahn & Kühnen (2013) canonical set, winsorised at 1st/99th.",
    },
  ],
  findings: [
    {
      n: "F1",
      h: "TWSE English-language filing has risen sharply.",
      p: "The share of `_E` (English) filings in the TWSE corpus rises from 62% (2021) to 71% (2023), then settles at 64% (2024) as more smaller firms file in Mandarin only. This compositional shift dominates the apparent change in hyphenation and language-mixing prevalence between cohorts.",
    },
    {
      n: "F2",
      h: "GRI content-index density is growing.",
      p: "Average unique GRI codes per file rises from 37.5 (2021) → 67.2 (2022) → 70.4 (2023) → 78.2 (2024). The top 2024 file references 104 unique codes across 35 GRI Standards, consistent with the diffusion of comprehensive GRI 3 indexes.",
    },
    {
      n: "F3",
      h: "Sidebar suppression is a load-bearing extraction trade-off.",
      p: "The x₀ < 16% sidebar filter removes ~97% of navigation-column noise from processed text but also strips narrow-column GRI index code cells. Median GRI code recovery in processed text is 0.772 (2021) to 0.909 (2022); the structural csv `gri_codes_summary_YYYY.csv` is therefore the authoritative GRI source, not the processed text.",
    },
  ],
  figures: [
    { id: "Fig. 1", caption: "Corpus growth and English-filing share by cohort (TWSE, 2021–2024).", kind: "line" },
    { id: "Fig. 2", caption: "GRI code instances per file, by cohort and GRI Topic Standard.", kind: "matrix" },
    { id: "Fig. 3", caption: "Issue-prevalence ridge across the four cohorts — header/footer, hyphenation, language mixing.", kind: "ridge" },
  ],
  publications: [
    {
      kind: "Working paper",
      year: "2026",
      cite: "Kirsten, R. (2026). Did GRI 3 change what semiconductor firms call material? A staggered-DiD text-mining study of TWSE reports, 2021–2024. Working paper, RK-2026.",
      status: "In preparation",
    },
    {
      kind: "Pre-registration",
      year: "2026",
      cite: "Kirsten, R. (2026). Pre-registered hypotheses: GRI 3 adoption and material-topic selection in TWSE semiconductors. Open Science Framework, osf.io/rk-2026.",
      status: "Drafted",
    },
    {
      kind: "Conference",
      year: "2027",
      cite: "Kirsten, R. (2027). Reading materiality at scale: a text-mining account of GRI 3 adoption in TWSE semiconductors. Abstract under preparation, EAA Annual Congress.",
      status: "Planned",
    },
    {
      kind: "Talk",
      year: "2025",
      cite: "Kirsten, R. (2025). Reading materiality at scale. Internal seminar, Sustainability And Green Energy, National Central University.",
      status: "Delivered",
    },
  ],
  team: [
    { name: "Reinier Kirsten", role: "Principal Investigator", focus: "Project design, materiality theory, statistical identification" },
  ],
  collaborators: [
    "Sustainability And Green Energy · National Central University (host)",
    "TWSE MOPS / ESGgenplus (data partner — sustainability disclosure database)",
  ],
  data_code: [
    { n: "academic-research/scripts/", d: "Pipeline scripts: scan_YYYY.py, ocr_batch_YYYY.py, pymupdf_batch_YYYY.py, gri_extract_YYYY.py, check_extraction_quality_YYYY.py, extract_block_c.py, merge_block_c.py.", lic: "Internal", status: "Active" },
    { n: "data/gri/gri_codes_summary_*.csv", d: "Authoritative GRI content-index codes extracted directly from source PDFs (pre-sidebar-filter). One CSV per cohort, 2021–2024.", lic: "CC-BY-4.0 (planned)", status: "v1.0 — internal" },
    { n: "data/quality/", d: "Per-cohort extraction quality checks, preprocessing manifests, and Block C extraction outputs.", lic: "Internal", status: "Active" },
    { n: "Text extraction/extracted_text/YYYY_processed/", d: "Working NLP corpus, paragraph-level. 3,180 files across four cohorts after the five-stage pipeline. Release planned post-publication.", lic: "Restricted", status: "Not yet released" },
    { n: "audits/", d: "Standalone text_extraction_quality_audit_YYYY.md for each cohort — see the 2024 Data tab for the latest cohort's full audit.", lic: "Internal", status: "Complete" },
    { n: "hypotheses/hypothesis-generation_did-hypotheses_2026-05-22.md", d: "Pre-registered DiD hypotheses (draft) covering topic count, composition shift, matrix-format change.", lic: "Internal", status: "Drafted" },
  ],
  funding: [],
  news: [
    { d: "May 22, 2026", t: "Quality audits for all four cohorts (2021–2024) finalised; 3,180-file working corpus accepted for NLP." },
    { d: "May 20, 2026", t: "2023 cohort full pipeline complete: 19 scanned files OCR'd, 597 files with GRI codes, 42,044 code instances." },
    { d: "May 19, 2026", t: "2024 cohort audit replaces preliminary 2026-05-19 version; GRI extraction via pdfplumber + regex fallback (74,108 codes)." },
    { d: "May 14, 2026", t: "G4-format regex pass added for the 2021 transition cohort; 8 files with G4 sector-supplement codes (FS / FP / EC) recovered." },
    { d: "Apr 02, 2026", t: "Annotation guide v0.3 ratified with second coder on the materiality NER subset; κ = 0.81." },
    { d: "Feb 19, 2026", t: "OCR pipeline switched to layout-aware reflow + per-page caching; throughput +2.4× and resumable across session timeouts." },
    { d: "Jan 08, 2026", t: "Project entry registered with the Open Science Framework." },
  ],
};

// ─── Per-cohort corpus statistics (drawn from the four audit MDs) ──────────
const COHORTS = [
  { y: "2021", total: 495, en: 307, en_pct: 62, gri_files: 342, gri_pct: 70.1, gri_codes: 12818, ocr: 4, avg_codes: 37.5, special: "G4 → Standards transition; 8 files with G4 sector codes (FS / FP / EC)." },
  { y: "2022", total: 877, en: 389, en_pct: 44, gri_files: 535, gri_pct: 87.9, gri_codes: 35972, ocr: 11, avg_codes: 67.2, special: "263 English PDFs freshly extracted (no prior .txt); 2 partial scans without PDF." },
  { y: "2023", total: 744, en: 526, en_pct: 71, gri_files: 597, gri_pct: 84.2, gri_codes: 42044, ocr: 19, avg_codes: 70.4, special: "pdfplumber hangs on 2023 PDFs — fitz-only GRI regex used; HF noise jumps to 92%." },
  { y: "2024", total: 1064, en: 680, en_pct: 64, gri_files: 948, gri_pct: 92.2, gri_codes: 74108, ocr: 15, avg_codes: 78.2, special: "Largest cohort. pdfplumber + regex fallback. Hyphenation affects 100% of English files." },
];

// ─── Research log (drawn from research_log.json, passes 1\u20138) ──────────────
const RESEARCH_LOG = {
  inventory: [
    { item: "twse-research-database.csv",          status: "complete", detail: "7,765 rows \u00d7 90 columns. TWSE universe 2016\u20132024, 2,091 unique companies. utf-8-sig BOM." },
    { item: "Semiconductor sub-cohort",            status: "complete", detail: "507 company-year rows across 73 firms (pass 4)." },
    { item: "gri_codes_summary_2021.csv",          status: "complete", detail: "488 rows; 342 files with \u22651 GRI code (incl. 8 G4 sector codes)." },
    { item: "gri_codes_summary_2022.csv",          status: "complete", detail: "609 rows; 535 files with \u22651 GRI code; 35,972 instances." },
    { item: "gri_codes_summary_2023.csv",          status: "complete", detail: "649 rows; 597 files with \u22651 GRI code; 42,044 instances." },
    { item: "gri_codes_summary_2024.csv",          status: "complete", detail: "1,014 rows; 948 files with \u22651 GRI code; 74,108 instances." },
    { item: "Text-extraction corpora 2021\u20132024",   status: "complete", detail: "495 / 877 / 744 / 1,064 files. PyMuPDF + Tesseract OCR + checks A/B/C audited." },
    { item: "Quality audits (4 cohorts)",          status: "complete", detail: "Standalone text_extraction_quality_audit_YYYY.md per cohort." },
    { item: "Block A \u00b7 identifiers & firmographics", status: "complete", detail: "100% all fields all years (pass 7)." },
    { item: "Block B \u00b7 report metadata (core)",     status: "complete", detail: "gri_standard_version, gri_adoption_year, bilingual_report \u2014 100% all years." },
    { item: "lang_routing_2024.csv",               status: "complete", detail: "1,062 files routed \u2014 698 English (65.7%), 364 multilingual (34.3%). langdetect (fastText proxy-blocked)." },
    { item: "Hypotheses H1\u2013H5 (draft)",            status: "complete", detail: "Pre-registration draft, CS21 estimator. Awaiting OSF lodgement before inferential tests." },
  ],
  pipeline: [
    { item: "Block B \u00b7 word_count / page_count / language",                status: "partial", coverage: "65\u201368% of 2021\u20132024 semiconductor rows", note: "23\u201324 tickers per year not in ESGgenplus bulk download \u2014 publish on own IR pages. Structural gap, requires re-download." },
    { item: "Block B \u00b7 assurance fields",                                  status: "partial", coverage: "48\u201372% across years",                       note: "Ceiling set by TEJ data completeness." },
    { item: "Block C \u00b7 DM methodology / visualisation / AI-tool disclosure", status: "partial", coverage: "49 / 73 (2024 semiconductors)",              note: "Same 24-ticker structural corpus gap." },
    { item: "Block D \u00b7 n_material_topics_a",                               status: "partial", coverage: "31 / 73 (2024 semiconductors)",              note: "Unique GRI standards excl. GRI 2-x." },
    { item: "Block D \u00b7 n_material_topics_b (GRI 3-3 rows)",                 status: "partial", coverage: "16 / 73 (2024 semiconductors)",              note: "Requires GRI 3-3 row-by-row table extraction." },
    { item: "Block D \u00b7 full NLP topic coding",                             status: "blocked", coverage: "TR-1 design issued; execution pending",     note: "Spec ready. English: FinBERT-ESG-9 + ClimateBERT + GRI regex. Multilingual: Qwen3-Embedding-8B + XLM-RoBERTa-XNLI." },
    { item: "Block E \u00b7 topic dynamics (\u0394 / churn / Jaccard)",                status: "not started", coverage: "Derived from Block D",                  note: "Auto-computed once Block D panel is complete." },
    { item: "Block F \u00b7 financial controls",                                status: "partial", coverage: "3,325 / 7,779 rows (TEJ master 2016\u20132021)", note: "2022\u20132024 financial pull required from TEJ subscription." },
    { item: "Block G \u00b7 gri_content_index_completeness",                     status: "partial", coverage: "31 / 73 (2024 semis)",                      note: "Computed as n_gri2_codes / 34 for Universal Standards adopters." },
    { item: "Block G \u00b7 mda_index (Padilla-Garrido 2024)",                  status: "partial", coverage: "49 / 73 (2024 semis); mean 0.51",            note: "10-item binary approximation of MDA scheme." },
    { item: "Text extraction for 2016\u20132020",                              status: "not started", coverage: "0 files",                                note: "Earlier processed directories not yet built; word_count/page_count permanently unavailable for those years if PDFs are absent." },
    { item: "Pre-registration on OSF",                                      status: "not started", coverage: "Required before inferential tests",       note: "H1\u2013H5 drafted; OSF lodgement pending PI sign-off." },
    { item: "DiD estimation (CS21)",                                        status: "blocked",     coverage: "Awaits Block D + Block F completion",     note: "Bacon-Goodman decomposition, Rambachan-Roth sensitivity, nevertreated alternative all planned." },
    { item: "TSMC tier-1 supplier coding (H5)",                             status: "blocked",     coverage: "External data needed",                    note: "Required to test diffusion hypothesis." },
  ],
  newVars: {
    A: ["gri_101_applied"],
    B: ["gri_new_climate_energy_adopted", "ifrs_s1_adopted", "issb_s2_adopted", "assurance_standard", "issa5000_early_adopted", "fsc_sector_metrics_disclosed", "csrd_mandatory_reporter"],
    C: ["double_materiality_methodology_disclosed", "standalone_mat_report", "visualization_format", "visualization_format_n", "iro_table_shown", "butterfly_chart_shown", "scatter_plot_shown", "iro_heatmap_shown", "dynamic_viz_shown", "ai_tool_disclosed", "ai_tool_name"],
  },
  taxonomy: [
    { code: "E01", old_map: "GRI 302 (Energy 2016)",     new_map: "GRI 103: Energy 2025",                          eff: "Jan 2027" },
    { code: "E02", old_map: "GRI 305 (Emissions 2016)",  new_map: "GRI 102: Climate Change 2025",                  eff: "Jan 2027" },
    { code: "E09", old_map: "GRI 304 (Biodiversity 2016)", new_map: "GRI 101: Biodiversity 2024",                  eff: "Jan 2026" },
    { code: "E10", old_map: "GRI 201-2 / TCFD",          new_map: "GRI 102: Transition plan provisions (absorbed)", eff: "Jan 2027" },
  ],
  criticalPath: [
    "DA-1 \u2014 gri_adoption_year coding  \u2192  Block D NLP execution  \u2192  CS21 DiD estimation  \u2192  H1\u2013H4 inferential tests",
    "External: TEJ 2022\u20132024 financials  \u2192  Block F completion  \u2192  full panel regressions with controls",
    "External: TSMC tier-1 supplier list  \u2192  H5 diffusion test",
  ],
  sessions: [
    { d: "2026-05-18", pass: 1, agent: "web-researcher",        topic: "regulatory-nlp-updates",     status: "complete", k: ["TWSE universal mandate effective 2025 filing cycle (1,883 companies)", "IFRS S1/S2 phase-in: FY2026 / FY2027 / FY2028", "GRI 101 (Biodiversity) Jan 2026; GRI 102/103 Jan 2027", "ISSA 5000 effective Dec 2026 engagements"] },
    { d: "2026-05-18", pass: 1, agent: "academic-researcher",   topic: "methods-gaps",               status: "complete", k: ["staggered package: 80% power for ATT \u2265 1.5 topics with 50\u201380 firms", "IPW for attrition correlated with firm size", "Hurdle Poisson preferred over ZIP for structural zeros", "G\u00f6ttsche et al. (2025) = direct precedent for displacement-effect hypothesis"] },
    { d: "2026-05-18", pass: 2, agent: "web-researcher",        topic: "trends-report-integration",  status: "complete", k: ["~20% of firms still use traditional materiality matrix (down sharply)", "Double-materiality adoption 77% globally (42% of G250)", "EU Omnibus I cut CSRD scope from ~50,000 to ~5,000 reporters", "Taiwan: 100% GRI adoption (uniquely)"] },
    { d: "2026-05-18", pass: 2, agent: "data-analyst",          topic: "definitions-update",         status: "complete", k: ["21 new variables added across Blocks A / B / C", "4 canonical-taxonomy updates (E01, E02, E09, E10)", "Definitions.docx updated"] },
    { d: "2026-05-18", pass: 2, agent: "research-gap-analysis", topic: "semiconductor-materiality",  status: "complete", k: ["7 research gaps identified", "Priority gaps: CS21 always-taker entrants; K-ESG / SSBJ peers; TDDM diffusion", "Novel contribution: displacement effect under GRI 3 in semiconductor context"] },
    { d: "2026-05-20", pass: 3, agent: "data-analyst",          topic: "block-b-text-extraction",    status: "complete", k: ["73 rows updated for 2024 semiconductor sub-cohort", "49 files matched; 24 with no file (publish on own IR)", "GRI Universal 2021 rate: 100% among 2024 reporters"] },
    { d: "2026-05-20", pass: 4, agent: "data-analyst",          topic: "twse-full-universe-build",   status: "complete", k: ["twse-research-database.csv built: 7,779 rows \u00d7 66 columns", "2,091 unique companies; 2016\u20132024", "Block F coverage 3,325 / 7,779 rows (TEJ master 2016\u20132021)"] },
    { d: "2026-05-20", pass: 5, agent: "research-coordinator",  topic: "nlp-pipeline-plan",          status: "plan issued", k: ["Critical path: gri_adoption_year (DA-1) blocks DiD analysis", "Tasks issued: DA-1/2/3, TR-1/2/3, HG-1", "Immediate starts: DA-1, TR-3, TR-2, HG-1, DA-2"] },
    { d: "2026-05-21", pass: 6, agent: "data-analyst",          topic: "block-b-2022-extraction",    status: "complete", k: ["2022 cohort: 60 semiconductor tickers with files; 16 rows updated", "gri_adoption_year corrected: 4 firms moved 2024 \u2192 2023", "DiD treatment variable now fully valid"] },
    { d: "2026-05-22", pass: 7, agent: "data-analyst",          topic: "block-ab-completion",        status: "complete", k: ["Block A: 100% all fields all years", "Block B: 65\u201368% on text-derived fields (structural gap)", "Database re-encoded with utf-8-sig BOM (Chinese encoding fix)"] },
    { d: "2026-05-22", pass: 8, agent: "technical-researcher",  topic: "tr2-language-routing",       status: "complete", k: ["langdetect substituted for fastText (proxy-blocked)", "1,062 files routed: 698 EN, 364 multilingual", "TR-1 NLP spec documented: FinBERT-ESG-9 + Qwen3-Embedding-8B"] },
    { d: "2026-05-22", pass: 8, agent: "data-analyst",          topic: "block-cd-population",        status: "complete", k: ["Block C: 49/73 (2024 semis); 9 new visualisation/AI variables merged", "Block D: 31/73 n_topics_a; 16/73 n_topics_b", "Block G: mda_index mean 0.51 across 49 firms"] },
    { d: "2026-05-22", pass: 8, agent: "hypothesis-generation", topic: "did-hypotheses",             status: "complete", k: ["H1\u2013H5 generated; CS21 ATT estimator", "H1: displacement effect on n_material_topics_b (\u2193 expected)", "H4: heterogeneity by subsector (Fabless vs Foundry/OSAT)", "Pre-registration required before tests"] },
  ],
};


const BLOCKS = [
  {
    id: "A", h: "Company identifiers & firmographics",
    src: "TEJ (TWSE); Refinitiv Eikon / Bloomberg (global peers).",
    unit: "Company-year",
    vars: [
      ["company_id",            "key",       "Unique key (TWSE ticker + fiscal year)"],
      ["company_name_en / _zh", "text",      "Official English and Chinese names"],
      ["twse_ticker",           "code",      "4-digit TWSE code"],
      ["global_ticker",         "code",      "Primary exchange ticker for global peers"],
      ["isin",                  "code",      "ISIN code"],
      ["country_of_incorporation", "ISO-3",  "TWN / USA / KOR / NLD / DEU …"],
      ["industry_subsector",    "categorical","Fabless / Foundry / IDM / OSAT / Equipment / Materials"],
      ["sic_code",              "code",      "SIC 3674 (Semiconductors) or adjacent"],
      ["fiscal_year",           "integer",   "Calendar year (2019–2025)"],
      ["sample_type",           "categorical","TWSE-core / Global-peer"],
    ],
  },
  {
    id: "B", h: "Report metadata",
    src: "Preprocessing manifests (per cohort) + company IR pages.",
    unit: "Report",
    vars: [
      ["gri_standard_version",  "categorical","G4 / GRI-Standards-2016 / GRI-Universal-2021"],
      ["gri_adoption_year",     "integer",   "First fiscal year under GRI Universal 2021 (the treatment event)"],
      ["reporting_period_start / _end", "date", "ISO-8601 reporting window"],
      ["report_language",       "ISO-639-1", "zh / en / ko …"],
      ["bilingual_report",      "binary",    "Mixed-language content present (0/1)"],
      ["assurance_level",       "categorical","None / Limited / Reasonable"],
      ["assurance_provider",    "text",      "Name of assurance firm"],
      ["assurance_provider_type","categorical","Big4 / Specialist / Internal / None"],
      ["word_count_total",      "integer",   "Total word count (validated proxy for disclosure depth)"],
      ["page_count",            "integer",   "PDF page count"],
      ["standalone_sr",         "binary",    "Standalone sustainability vs integrated report"],
      ["report_url",            "url",       "Persistent URL"],
    ],
  },
  {
    id: "C", h: "Materiality process disclosure",
    src: "Hand-coded; template from Beske et al. (2020) + Machado (2021) + Padilla-Garrido et al. (2024).",
    unit: "Report",
    vars: [
      ["mat_process_disclosed",        "binary",   "Section explicitly describes the materiality process"],
      ["stakeholder_groups_n",         "integer",  "Distinct stakeholder groups listed"],
      ["engagement_methods_n",         "integer",  "Distinct engagement methods named"],
      ["process_steps_n",              "0–4",      "Count of formal steps disclosed (GRI 3 four-step)"],
      ["matrix_shown",                 "binary",   "2×2 / equivalent materiality matrix present"],
      ["matrix_axes_labeled",          "binary",   "Axes defined quantitatively or qualitatively"],
      ["scoring_method_disclosed",     "binary",   "Specific scoring / weighting method disclosed"],
      ["approval_body",                "categorical","Board / ESG-Committee / Mgmt-only / Not-disclosed"],
      ["board_approved",               "binary",   "Derived from approval_body"],
      ["double_materiality_mentioned", "binary",   "Explicit reference to double materiality"],
      ["impact_materiality_disclosed", "binary",   "Outward impact perspective disclosed"],
      ["financial_materiality_disclosed","binary", "Inward financial risk perspective disclosed"],
      ["gri3_four_step_compliance",    "0–4",      "Context / identify / assess / prioritise"],
    ],
  },
  {
    id: "D", h: "Material topic variables",
    src: "NLP pipeline: FinBERT-ESG-9 (EN) + XLM-RoBERTa-XNLI (CJK) + manual concordance.",
    unit: "Company-year (+ topic-level subtable)",
    vars: [
      ["topics_total_n",          "integer", "Total disclosed material topics"],
      ["topics_env_n / soc_n / gov_n", "integer", "Count by E / S / G pillar"],
      ["topics_env_pct / soc_pct / gov_pct", "float", "Proportional share by pillar"],
      ["gri_codes_mapped_pct",    "float",   "Share of topics mapped to a GRI standard code"],
      ["topics_with_targets_n",   "integer", "Topics with ≥ 1 quantitative KPI target"],
      ["topics_tier1_n",          "integer", "Top-priority topics (if tiering disclosed)"],
      ["topics_gri3_format",      "binary",  "Topics presented in GRI 3 impact-significance format"],
      ["— topic_label_original / canonical", "text", "Verbatim and mapped labels"],
      ["— gri_standard_code",     "code",    "E.g., GRI 303, GRI 403"],
      ["— topic_tier",            "1/2/3",   "If disclosed"],
      ["— match_method",          "categorical","exact / fuzzy / embedding / manual"],
    ],
  },
  {
    id: "E", h: "Topic dynamics (year-over-year)",
    src: "Derived from Block D once ≥ 2 consecutive years per firm.",
    unit: "Company-year pair",
    vars: [
      ["topics_added_n",        "integer", "Topics appearing this year but not the prior year"],
      ["topics_dropped_n",      "integer", "Topics in prior year absent this year"],
      ["net_topic_change",      "integer", "added − dropped"],
      ["topic_churn_rate",      "float",   "(added + dropped) / avg(total_t, total_{t-1})"],
      ["topic_stability_index", "float",   "Jaccard similarity of topic sets t vs t-1"],
    ],
  },
  {
    id: "F", h: "Financial controls",
    src: "TEJ (TWSE); Compustat Global / Bloomberg (peers). Winsorise at 1st/99th percentile.",
    unit: "Company-year",
    vars: [
      ["ln_total_assets",        "float",   "log(total assets, USD millions)"],
      ["roa",                    "float",   "Net income / average total assets"],
      ["leverage",               "float",   "Total debt / total equity"],
      ["firm_age",               "integer", "Years since incorporation"],
      ["rd_intensity",           "float",   "R&D expense / revenue (critical for semiconductors)"],
      ["dual_listed",            "binary",  "ADR on NYSE/NASDAQ"],
      ["state_ownership_pct",    "float",   "Share held by government entities"],
      ["board_esg_committee",    "binary",  "Dedicated ESG/sustainability board committee"],
      ["analyst_coverage_n",     "integer", "Analysts issuing recommendations (I/B/E/S)"],
      ["msci_esg_rating",        "ordinal", "Lagged 1 year"],
      ["sustainalytics_risk_score","float", "Lagged 1 year"],
    ],
  },
  {
    id: "G", h: "Outcome / quality variables",
    src: "Computed after Blocks D / C are complete.",
    unit: "Report",
    vars: [
      ["mda_index",                       "0–1",   "Materiality Disclosure Assessment index (Padilla-Garrido et al. 2024)"],
      ["gri_content_index_completeness",  "float", "Share of GRI index entries with full vs omitted disclosures"],
      ["process_quality_score",           "0–1",   "Composite: stakeholders + methods + steps + approval + scoring"],
      ["topic_depth_score",               "float", "Avg word count per material topic (NLP-extracted)"],
    ],
  },
];

// ─── Pre-trained models in active use (separated from REFERENCES.nlp) ──────
const MODELS = [
  { n: "FinBERT-ESG-9-Categories", base: "BERT (FinBERT)",      lang: "English",       scope: "9-category ESG classification",          best: "Off-the-shelf full GRI coverage (E/S/G/non-ESG)", src: "yiyanghkust/finbert-esg-9-categories" },
  { n: "ClimateBERT",              base: "DistilRoBERTa",       lang: "English",       scope: "Climate-relevance, sentiment, net-zero", best: "Environmental topics (GRI 302 / 303 / 305)",     src: "climatebert/distilroberta-base-climate-f" },
  { n: "ESG-BERT",                 base: "BERT",                lang: "English",       scope: "E / S / G pillar classification",        best: "Pillar-level only (weak topic-level validation)", src: "Mukherjee et al. (2022)" },
  { n: "multilingual-e5-large-instruct", base: "E5",            lang: "100 languages", scope: "Embedding for semantic search",          best: "Bilingual EN/CJK paragraph retrieval",            src: "intfloat/multilingual-e5-large-instruct" },
  { n: "XLM-RoBERTa-XNLI",         base: "XLM-RoBERTa",         lang: "100 languages", scope: "Zero-shot NLI classification",           best: "Cross-lingual topic-label classification",        src: "joeddav/xlm-roberta-large-xnli" },
  { n: "Qwen3-Embedding (0.6B)",   base: "Qwen3",               lang: "Multilingual",  scope: "Embedding for label-to-label matching",  best: "Stage-2 semantic topic mapping",                  src: "Qwen/Qwen3-Embedding-0.6B" },
  { n: "ESGLens (2026)",           base: "RAG · GPT-4 backend", lang: "English",       scope: "Retrieval → summarisation → ESG scoring", best: "Structured GRI extraction at report level",      src: "arXiv 2604.19779" },
];


// ─── 2024 cohort deep-dive (text_extraction_quality_audit_2024.md) ─────────
const AUDIT_2024 = {
  year: "2024",
  title: "2024 cohort — text-extraction quality audit",
  blurb: "The 2024 cohort is the largest single year of TWSE filings in scope.",
  header: {
    date: "2026-05-19 (last updated 2026-05-22)",
    rawCorpus: "/Text extraction/extracted_text/2024/",
    processedCorpus: "/Text extraction/extracted_text/2024_processed/",
    total: "1,064 files (680 _E / 64%; 384 other / 36%)",
    subsample: "100 files stratified (50 _E + 50 other; seed = 42)",
    fullScan: "1,064 / 1,064 for scanned/empty pages",
  },
  composition: [
    ["Total files", "2022: 615", "2024: 1,064", "+73%"],
    ["English `_E` files", "2022: ~12 (2%)", "2024: 680 (64%)", "+53 pp"],
    ["Chinese / bilingual", "2022: ~603 (98%)", "2024: 384 (36%)", "−62 pp"],
  ],
  issues: [
    { n: 1, h: "Multi-column / sidebar fragmentation", pct: "99%", _E: "100%", _O: "98%", baseline: "100%", fixed: "PyMuPDF coordinate-aware re-extraction + sidebar suppression" },
    { n: 2, h: "Header / footer noise",                pct: "55%", _E: "62%",  _O: "48%", baseline: "58%",  fixed: "Repetition filter (>30% page frequency) + content guard" },
    { n: 3, h: "GRI content-index fragmentation",      pct: "92%", _E: "92%",  _O: "92%", baseline: "89%",  fixed: "pdfplumber + regex fallback → gri_codes_summary_2024.csv" },
    { n: 4, h: "Hyphenation artefacts (English)",      pct: "57%", _E: "100%", _O: "14%", baseline: "38%",  fixed: "Dehyphenation with 45-prefix compound guard (English only)" },
    { n: 5, h: "Language mixing (bilingual)",          pct: "53%", _E: "14%",  _O: "92%", baseline: "83%",  fixed: "Routed at NLP layer (fastText → multilingual-e5)" },
    { n: 6, h: "Figure captions as body text",         pct: "6%",  _E: "8%",   _O: "4%",  baseline: "10%",  fixed: "Regex pre-filter" },
    { n: 7, h: "Scanned / no text layer",              pct: "1.4%",_E: "0%",   _O: "2%",  baseline: "2.1%", fixed: "Tesseract LSTM (eng / chi_tra+eng)" },
  ],
  pipeline: [
    { st: "1", n: "Scan detection",       res: "1,064 files scanned · 15 fully/partially scanned identified" },
    { st: "2", n: "OCR recovery",         res: "Tesseract `--oem 1 --psm 3` @ 1.5×; per-page caching; resumable" },
    { st: "3", n: "PyMuPDF re-extract",   res: "1,049 native PDFs · x₀<16% sidebar filter · y-zone HF filter" },
    { st: "4", n: "Text preprocessing",   res: "Repetition filter, dehyphenation (English), caption strip, spaced-char fix" },
    { st: "5", n: "GRI extraction",       res: "1,028 PDFs · 948 (92.2%) with codes · 74,108 instances · avg 78.2/file" },
  ],
  checks: [
    { id: "A", h: "Chars/page consistency",  tests: "Floor at 10th-percentile of corpus; soft flag at < 50% of language-group median", thresh: "EN ≥ 600 cpp · CJK ≥ 300 cpp",                              result: "BORDERLINE — 5.8% flagged (vs ≤ 5% target). All flagged files are image-heavy or OCR'd reports; assessed as report design, not extraction failure.", status: "Accepted with note" },
    { id: "B", h: "Linguistic plausibility", tests: "Mean chars/line, short-line ratio, type-token ratio, alpha-char ratio. Multi-flag = ≥ 2 thresholds tripped.", thresh: "EN mean_line < 30, short_ratio > 0.72 (recalibrated to 10th pctile)",  result: "PASS — 1/100 after recalibration. Single outlier 2723_2023-like file (5.9 chars/line, 97% short).", status: "Pass" },
    { id: "C", h: "GRI code recovery rate",  tests: "codes_in_txt / codes_in_pdf per file; median ≥ 0.80; < 10% below 0.75",            thresh: "Structural trade-off: sidebar filter strips narrow GRI code columns by design", result: "STRUCTURAL — `gri_codes_summary_2024.csv` is the authoritative source. Processed text is for narrative NLP; not for GRI parsing.",  status: "Note (not blocking)" },
  ],
  exclusions: [
    "1,049 native PDFs → all 1,049 processed and re-extracted.",
    "15 scanned PDFs → all OCR'd (Tesseract). 1,815 pages · 3.1M chars recovered across 2023–2024.",
    "Hard exclusions: none in 2024 (vs 9 files in 2022, 5 in 2021).",
    "Corpus fit for NLP analysis with confidence weighting for low-cpp files.",
  ],
  references: [
    "Adhikari & Agarwal (2024). PDF Parsing Tools Benchmark. arXiv 2410.09871 — motivates the PyMuPDF + pymupdf4llm choice.",
    "Webersinke et al. (2022). ClimateBERT. AAAI / arXiv 2110.12010 — applied to environmental disclosures.",
    "Mukherjee et al. (2022). ESG-BERT. arXiv 2203.16788.",
    "Schimanski et al. (2024). Three transformer ESG classifiers validated against Refinitiv ratings. Finance Research Letters.",
    "MMESGBench (2025). arXiv 2507.18932 — multimodal VLM benchmark for ESG visual content.",
  ],
};

// ─── 2023 cohort deep-dive ─────────────────────────────────────────────────
const AUDIT_2023 = {
  year: "2023",
  title: "2023 cohort — text-extraction quality audit",
  blurb: "The 2023 cohort has the highest English-filing share (71%); 2023 PDF structure breaks pdfplumber so a fitz-only GRI pipeline is used.",
  header: {
    date: "2026-05-21 (last updated 2026-05-22)",
    rawCorpus: "/Text extraction/extracted_text/2023/",
    processedCorpus: "/Text extraction/extracted_text/2023_processed/",
    total: "744 files (526 _E / 71%; 218 other / 29%)",
    subsample: "100 files stratified (70 _E + 30 other; seed = 42)",
    fullScan: "744 / 744 for scanned/empty pages",
  },
  composition: [
    ["Total files", "2022: 877", "2023: 744", "−15%"],
    ["English `_E` files", "2022: 389 (44%)", "2023: 526 (71%)", "+27 pp"],
    ["Chinese / bilingual", "2022: 488 (56%)", "2023: 218 (29%)", "−27 pp"],
  ],
  issues: [
    { n: 1, h: "Multi-column / sidebar fragmentation", pct: "98%", _E: "98.6%", _O: "96.7%", baseline: "100%", fixed: "PyMuPDF coordinate-aware re-extraction + sidebar suppression" },
    { n: 2, h: "Header / footer noise",                pct: "92%", _E: "92.9%", _O: "90.0%", baseline: "93%",  fixed: "Repetition filter — denser 2023 running headers (avg 13.9 / file)" },
    { n: 3, h: "GRI content-index fragmentation",      pct: "90%", _E: "87.1%", _O: "96.7%", baseline: "95%",  fixed: "fitz-only regex extraction (pdfplumber hangs on 2023 structure)" },
    { n: 4, h: "Hyphenation artefacts (English)",      pct: "64%", _E: "88.6%", _O: "6.7%",  baseline: "47%",  fixed: "Dehyphenation with 45-prefix compound guard" },
    { n: 5, h: "Language mixing (bilingual)",          pct: "64%", _E: "48.6%", _O: "100%",  baseline: "75%",  fixed: "Routed at NLP layer" },
    { n: 6, h: "Figure captions as body text",         pct: "9%",  _E: "12.9%", _O: "0%",    baseline: "5%",   fixed: "Regex pre-filter" },
    { n: 7, h: "Scanned / no text layer",              pct: "2.6%",_E: "—",     _O: "—",     baseline: "1.8%", fixed: "Tesseract LSTM · 19 files (16 fully + 3 partial)" },
  ],
  pipeline: [
    { st: "1", n: "Scan detection",     res: "744 files scanned · 19 fully/partially scanned identified" },
    { st: "2", n: "OCR recovery",       res: "Tesseract LSTM · 1,815 pages · 3,115,911 chars across 19 files" },
    { st: "3", n: "PyMuPDF re-extract", res: "708 native PDFs · 6 timed runs · pymupdf_progress_2023.json" },
    { st: "4", n: "Text preprocessing", res: "450,679 lines removed (HF) · 29,754 hyphens joined (`_E`) · 428 captions stripped" },
    { st: "5", n: "GRI extraction",     res: "709 PDFs · 597 (84.2%) with codes · 42,044 instances · max 145 codes/file (2357_2023_E)" },
  ],
  checks: [
    { id: "A", h: "Chars/page consistency",  tests: "Hard floor and < 50% of language-group median",                                           thresh: "EN ≥ 600 cpp · CJK ≥ 300 cpp",                                          result: "BORDERLINE — 43/744 (5.8%) flagged. All inspected; image-heavy or OCR'd reports.",                                                                                              status: "Accepted with note" },
    { id: "B", h: "Linguistic plausibility", tests: "Mean chars/line, short-line ratio, TTR, alpha-char ratio; multi-flag = ≥ 2 thresholds.", thresh: "EN < 30 / > 0.72 ; CJK < 6 / > 0.95 (recalibrated)",                     result: "PASS — 1/100 after corpus-aware recalibration (2723_2023: 5.9 chars/line, 97% short).",                                                                                          status: "Pass" },
    { id: "C", h: "GRI code recovery rate",  tests: "codes_in_txt / codes_in_pdf",                                                            thresh: "Median ≥ 0.80; < 10% below 0.75",                                       result: "STRUCTURAL — median 0.897; 41% below 0.75. Use `gri_codes_summary_2023.csv` for GRI coverage.",                                                                                  status: "Note (not blocking)" },
  ],
  exclusions: [
    "0 hard exclusions in 2023 (vs 9 files in 2022, 5 in 2021).",
    "All 19 scanned/partial files OCR'd (Tesseract LSTM at 1.5× render).",
    "Down-weight `2723_2023` (Check B outlier) and 32 Check A hard-floor files for NLP tasks sensitive to text completeness.",
    "pdfplumber excluded — hangs indefinitely on 2023 PDF structure; fitz-only GRI extraction used.",
  ],
  references: [
    "Tesseract 4 LSTM (`--oem 1 --psm 3`) via pytesseract — used at 1.5× page render for scanned 2023 files.",
    "Adhikari & Agarwal (2024). PDF Parsing Tools Benchmark. arXiv 2410.09871.",
    "Smeuninx, De Clerck & Aerts (2020). Corpus NLP on a 2.75M-word sustainability-report corpus. IJBC.",
  ],
};

// ─── 2022 cohort deep-dive (baseline year) ─────────────────────────────────
const AUDIT_2022 = {
  year: "2022",
  title: "2022 cohort — text-extraction quality audit",
  blurb: "The 2022 cohort is the methodological baseline: 263 English-only PDFs freshly extracted via PyMuPDF, giving a processed corpus 43% larger than the raw 615-file baseline.",
  header: {
    date: "2026-05-22 (replaces preliminary audit of 2026-05-19)",
    rawCorpus: "/Text extraction/extracted_text/2022/ (615 files)",
    processedCorpus: "/Text extraction/extracted_text/2022_processed/ (877 files)",
    total: "877 files (389 _E / 44%; 488 other / 56%)",
    subsample: "100 files stratified (50 _E + 50 other; seed = 42)",
    fullScan: "609 / 609 PDFs (11 OCR files excluded)",
  },
  composition: [
    ["Raw .txt files",                    "—",            "615 (134 _E, 481 other)",       "baseline" ],
    ["Freshly extracted English PDFs",    "—",            "263 (no prior .txt)",           "new"      ],
    ["Total processed",                   "raw: 615",     "processed: 877",                "+43%"     ],
    ["English `_E` share",                "raw: 22%",     "processed: 44%",                "+22 pp"   ],
  ],
  issues: [
    { n: 1, h: "Multi-column / sidebar fragmentation", pct: "100%", _E: "100%", _O: "100%", baseline: "—",   fixed: "PyMuPDF coordinate-aware re-extraction" },
    { n: 2, h: "Header / footer noise",                pct: "93%",  _E: "—",    _O: "—",    baseline: "—",   fixed: "Repetition filter (>30% page-frequency)" },
    { n: 3, h: "GRI content-index fragmentation",      pct: "95%",  _E: "—",    _O: "—",    baseline: "—",   fixed: "Fitz-only regex → gri_codes_summary_2022.csv" },
    { n: 4, h: "Hyphenation artefacts (English)",      pct: "47%",  _E: "88%",  _O: "—",    baseline: "—",   fixed: "Dehyphenation with compound-prefix guard" },
    { n: 5, h: "Language mixing (bilingual)",          pct: "75%",  _E: "—",    _O: "98%",  baseline: "—",   fixed: "Routed at NLP layer" },
    { n: 6, h: "Figure captions as body text",         pct: "5%",   _E: "—",    _O: "—",    baseline: "—",   fixed: "Regex pre-filter" },
    { n: 7, h: "Scanned / no text layer",              pct: "1.8%", _E: "—",    _O: "—",    baseline: "—",   fixed: "Tesseract LSTM · 11 files (1 yielded < 1 KB)" },
  ],
  pipeline: [
    { st: "1", n: "Raw quality audit",  res: "80-file stratified subsample established issue severity table" },
    { st: "2", n: "OCR recovery",       res: "Tesseract `chi_tra+eng` / `eng` at 1.5× · 11 PDFs (10 recovered; 4720_2022_E yielded < 1 KB)" },
    { st: "3", n: "PyMuPDF re-extract", res: "609 PDFs · 608 written (2408_2022 corrupt) · 3.2 files/s" },
    { st: "4", n: "Text preprocessing", res: "258 text-only files preprocessed in 2.8 s" },
    { st: "5", n: "GRI extraction",     res: "609 PDFs · 535 (87.9%) with codes · 35,972 instances · avg 67.2/file" },
  ],
  checks: [
    { id: "A", h: "Chars/page consistency",  tests: "Hard floor and language-group median",                  thresh: "EN ≥ 1,266 cpp · CJK ≥ 381 cpp",                                   result: "10/100 flagged; 3 genuine failures (cpp ≈ 17) — text-only files with near-empty PDFs. Effective rate 0.3%.",                                  status: "Pass (adjusted)" },
    { id: "B", h: "Linguistic plausibility", tests: "Mean chars/line / short-line ratio / TTR / alpha-ratio", thresh: "Recalibrated: EN < 28 / > 0.72 ; CJK < 10 / > 0.85",                result: "Raw 66/97 multi-flagged → ~5% after recalibration. Generic thresholds mis-fit ESG report structure.",                                       status: "Pass (recalibrated)" },
    { id: "C", h: "GRI code recovery rate",  tests: "codes_in_txt / codes_in_pdf per file",                  thresh: "Median ≥ 0.80; < 10% below 0.75",                                  result: "STRUCTURAL — median 0.909 (above target); 37.5% below 0.75 (sidebar filter strips index code columns). Use `gri_codes_summary_2022.csv`.",   status: "Note (not blocking)" },
  ],
  exclusions: [
    "9 hard exclusions (1.0%): 3 text-only files with cpp ≈ 17 (2392 / 1702 / 2845), 1 heavily degraded OCR (4720), 4 near-empty processed files, 1 corrupt PDF (2408), 2 partial scans without PDF (1795 / 3704).",
    "Remaining 868 files are fit for NLP analysis.",
    "Apply paragraph-level language detection (fastText) before routing.",
    "Do not split Chinese text by whitespace — use jieba tokenisation.",
  ],
  references: [
    "Beske, Haustein & Lorson (2020). SAMPJ — binary materiality disclosure index motif used for Block C coding.",
    "Camelot — tested for borderless 2022 GRI tables (detected 0); pdfplumber lines-strict adopted instead.",
    "Tesseract 4 LSTM via pytesseract — page rendering at 1.5× scale.",
  ],
};

// ─── 2021 cohort deep-dive ─────────────────────────────────────────────────
const AUDIT_2021 = {
  year: "2021",
  title: "2021 cohort — text-extraction quality audit",
  blurb: "The 2021 cohort straddles the GRI G4 → Standards transition. A supplementary G4 regex pass was added; core G4 indicators were largely absent, confirming most TWSE reporters had migrated to GRI Standards by 2021.",
  header: {
    date: "2026-05-22",
    rawCorpus: "/Text extraction/extracted_text/2021/ (4 files only)",
    processedCorpus: "/Text extraction/extracted_text/2021_processed/ (495 files)",
    total: "495 files (307 _E / 62%; 188 other / 38%)",
    subsample: "100 files stratified (50 _E + 50 other; seed = 42)",
    fullScan: "488 PDFs scanned for GRI (4 OCR'd files excluded)",
  },
  composition: [
    ["Raw .txt files",                  "—",                       "4 (0 _E, 4 other)",   "near-empty" ],
    ["PDFs available",                  "—",                       "492",                  "—"          ],
    ["Total processed",                 "raw: 4",                  "processed: 495",       "+12,275%"   ],
    ["English `_E` share (processed)",  "—",                       "62%",                  "highest pre-mandate share" ],
  ],
  issues: [
    { n: 1,  h: "Multi-column / sidebar fragmentation",   pct: "~100%", _E: "—",   _O: "—",     baseline: "100%", fixed: "PyMuPDF coordinate-aware re-extraction" },
    { n: 2,  h: "Header / footer noise",                  pct: "~90%",  _E: "—",   _O: "—",     baseline: "93%",  fixed: "Repetition filter" },
    { n: 3,  h: "GRI content-index fragmentation",        pct: "~70%",  _E: "—",   _O: "—",     baseline: "95%",  fixed: "Fitz-only regex (with G4 regex pass) → gri_codes_summary_2021.csv" },
    { n: 4,  h: "Hyphenation artefacts (English)",        pct: "~40%",  _E: "40%", _O: "—",     baseline: "47%",  fixed: "Dehyphenation with compound-prefix guard (English only)" },
    { n: 5,  h: "Language mixing (bilingual)",            pct: "~98%",  _E: "—",   _O: "98%",   baseline: "75%",  fixed: "Routed at NLP layer" },
    { n: 6,  h: "Figure captions as body text",           pct: "~5%",   _E: "—",   _O: "—",     baseline: "5%",   fixed: "Regex pre-filter" },
    { n: 7,  h: "Scanned / no text layer",                pct: "0.8%",  _E: "—",   _O: "—",     baseline: "1.8%", fixed: "Tesseract LSTM · 4 files" },
    { n: 8,  h: "Hidden partial scans (text cover, empty body)", pct: "0.6%", _E: "—", _O: "—", baseline: "—",     fixed: "⚠ Interior-page OCR pending (9904 / 4720 / 9938)" },
    { n: 9,  h: "Character encoding failure (font not decoded)", pct: "0.2%", _E: "—", _O: "—", baseline: "—",     fixed: "Excluded (3044_2021_E — replacement-character output)" },
    { n: 10, h: "Legacy GRI G4 format",                   pct: "~30%",  _E: "—",   _O: "—",     baseline: "—",    fixed: "G4 regex pass added · 8 files / 116 G4 instances captured" },
  ],
  pipeline: [
    { st: "1", n: "Scan detection",       res: "492 PDFs scanned · 4 fully scanned identified" },
    { st: "2", n: "OCR recovery",         res: "Tesseract · 4 PDFs (587,183 chars total)" },
    { st: "3", n: "PyMuPDF re-extract",   res: "488 PDFs · 487 written (3669_2021 corrupt → 0 B output)" },
    { st: "4", n: "Text preprocessing",   res: "3 text-only files processed (no PDF available)" },
    { st: "5", n: "GRI extraction",       res: "488 PDFs · 342 (70.1%) with codes · 12,818 instances · 8 files with G4 sector codes" },
  ],
  checks: [
    { id: "A", h: "Chars/page consistency",  tests: "Floor + < 50% of language-group median",                  thresh: "EN ≥ 1,117 cpp · CJK ≥ 300 cpp",                                 result: "15/100 flagged; 4 genuine failures (3 hidden partial scans + 1 corrupt). Effective rate 0.8%.",                                              status: "Pass (adjusted)" },
    { id: "B", h: "Linguistic plausibility", tests: "Mean chars/line / short-line / TTR / alpha-char ratio",   thresh: "Recalibrated to 10th-percentile of corpus",                      result: "Raw 59/97 multi-flagged → ~5% after recalibration. Two genuine outliers: 3044_2021_E (encoding failure), 7610_2021 (image-heavy).",        status: "Pass (recalibrated)" },
    { id: "C", h: "GRI code recovery rate",  tests: "codes_in_txt / codes_in_pdf",                             thresh: "Median ≥ 0.80; < 10% below 0.75",                                result: "FAIL — median 0.772; 46.8% below 0.75. Driven by (i) sidebar-filter trade-off and (ii) G4/Standards format mismatch in transition reports.", status: "Structural + G4 transition" },
  ],
  exclusions: [
    "5 hard exclusions (1.0%): 3 hidden partial scans (9904 / 4720 / 9938 — text cover + empty body), 1 encoding failure (3044), 1 corrupt PDF (3669).",
    "Remaining 490 files fit for NLP analysis.",
    "G4 sector-supplement codes (FS / FP / EC) captured for 8 files via supplementary G4 regex pass — `n_g4_codes` column in `gri_codes_summary_2021.csv`.",
    "Interior-page OCR required for the 3 hidden partial scans before including them in text analysis.",
  ],
  references: [
    "GRI G4 Guidelines (legacy) — sector-supplement codes (FS / FP / EC) captured by supplementary regex.",
    "Tesseract 4 LSTM — applied to 4 fully scanned PDFs; per-page caching for resumable runs.",
    "fitz / PyMuPDF — coordinate-aware extraction with sidebar suppression.",
  ],
};

const ALL_AUDITS = { "2021": AUDIT_2021, "2022": AUDIT_2022, "2023": AUDIT_2023, "2024": AUDIT_2024 };


// ─── Cross-cohort issue prevalence × remediation (2021 → 2024) ─────────────
const CROSS_COHORT_ISSUES = [
  { n: 1, h: "Multi-column / sidebar fragmentation", y2021: "~100%", y2022: "100%", y2023: "98%",  y2024: "99%", fix: "PyMuPDF coordinate-aware re-extraction", st: "Fixed" },
  { n: 2, h: "Header / footer noise",                y2021: "~90%",  y2022: "93%",  y2023: "92%",  y2024: "55%", fix: "Repetition filter (>30% page-freq, content guard)", st: "Fixed" },
  { n: 3, h: "GRI content-index fragmentation",      y2021: "~70%",  y2022: "95%",  y2023: "90%",  y2024: "92%", fix: "gri_codes_summary_YYYY.csv (pre-filter)", st: "Fixed" },
  { n: 4, h: "Hyphenation artefacts (English)",      y2021: "~40%",  y2022: "47%",  y2023: "64%",  y2024: "57%", fix: "Dehyphenation with 45-prefix compound guard", st: "Fixed" },
  { n: 5, h: "Language mixing (bilingual)",          y2021: "~98%",  y2022: "75%",  y2023: "64%",  y2024: "53%", fix: "fastText + multilingual-e5 routing", st: "Routed" },
  { n: 6, h: "Figure captions as body text",         y2021: "~5%",   y2022: "5%",   y2023: "9%",   y2024: "6%",  fix: "Regex pre-filter (Figure / Fig. / 圖 / Table / 表)", st: "Fixed" },
  { n: 7, h: "Scanned / no text layer",              y2021: "0.8%",  y2022: "1.8%", y2023: "2.6%", y2024: "1.4%", fix: "Tesseract LSTM (eng / chi_tra+eng)", st: "Fixed" },
  { n: 8, h: "Hidden partial scans (2021 only)",     y2021: "0.6%",  y2022: "—",    y2023: "—",    y2024: "—",   fix: "Interior-page OCR pending (3 files)", st: "Open" },
];


const REFERENCES = {
  theory: [
    { c: "Khan, Serafeim & Yoon (2016)",        v: "Corporate Sustainability: First Evidence on Materiality.",                                 j: "The Accounting Review, 91(6), 1697–1724." },
    { c: "Göttsche et al. (2025)",              v: "A Double-Edged Sword: Materiality Classifications.",                                       j: "Review of Accounting Studies, 30, 3596–3639." },
    { c: "Oll, Spandel, Schiemann & Akkermann (2025)", v: "The Concept of Materiality: From Essential Contestation to Research Opportunities.",j: "SAMPJ, 16(2)." },
    { c: "Garst, Maas & Suijs (2022)",          v: "Materiality Assessment Is an Art, Not a Science.",                                         j: "California Management Review, 65(1)." },
    { c: "Baumüller & Sopp (2022)",             v: "Double Materiality and the Shift from Non-Financial to European Sustainability Reporting.", j: "Journal of Applied Accounting Research, 23(1), 8–28." },
  ],
  coding: [
    { c: "Beske, Haustein & Lorson (2020)", v: "Materiality disclosures across 132 GRI reports — binary disclosure index.", j: "SAMPJ." },
    { c: "Machado (2021)",                  v: "22-indicator materiality transparency coding scheme.",                       j: "Corporate Social Responsibility and Environmental Management." },
    { c: "Padilla-Garrido et al. (2024)",   v: "Materiality Disclosure Assessment (MDA) index and GRI topic alignment.",     j: "CSR & EM." },
    { c: "Hahn & Kühnen (2013)",            v: "Canonical control variables; review of 178 sustainability-disclosure studies.", j: "Journal of Cleaner Production." },
    { c: "Aluchna et al. (2023)",           v: "GRI standard transitions and topic count shifts.",                            j: "Meditari Accountancy Research." },
  ],
  econometrics: [
    { c: "Callaway & Sant'Anna (2021)",            v: "Doubly-robust group-time ATT for staggered DiD — primary estimator.", j: "Journal of Econometrics, 225(2), 200–230." },
    { c: "Sun & Abraham (2021)",                   v: "Interaction-weighted staggered DiD — robustness.",                    j: "Journal of Econometrics, 225(2), 175–199." },
    { c: "Borusyak, Jaravel & Spiess (2024)",      v: "Imputation estimator for staggered designs — robustness.",            j: "Review of Economic Studies, 91(6), 3253–3285." },
    { c: "Goodman-Bacon (2021)",                   v: "Decomposition of TWFE under treatment-effect heterogeneity.",         j: "Journal of Econometrics, 225(2), 254–277." },
    { c: "Roth (2022)",                            v: "Pre-trend testing and its pitfalls.",                                  j: "AER: Insights, 4(3), 305–322." },
    { c: "Roth & Sant'Anna (2023)",                v: "Efficient estimation for staggered rollout designs.",                  j: "Journal of Political Economy: Microeconomics." },
    { c: "Aitchison (1982); Egozcue et al. (2003)",v: "Isometric Log-Ratio transformation for compositional data.",          j: "RSS / Mathematical Geology." },
    { c: "Papke & Wooldridge (1996)",              v: "Fractional logit for proportional outcomes.",                          j: "Journal of Applied Econometrics." },
    { c: "Wooldridge (1999)",                      v: "Quasi-MLE for fixed-effects Poisson — distribution-free consistency.", j: "Journal of Econometrics." },
  ],
  reliability: [
    { c: "Landis & Koch (1977)",                    v: "Cohen's κ interpretation scale — the standard reference.",                  j: "Biometrics." },
    { c: "Krippendorff (2004)",                     v: "Content Analysis (2nd ed.) — α thresholds.",                                j: "Sage." },
    { c: "Lombard, Snyder-Duch & Bracken (2002)",   v: "Content-analysis reliability standards.",                                   j: "Human Communication Research." },
  ],
  nlp: [
    { c: "Adhikari & Agarwal (2024)",     v: "Comprehensive PDF parsing-tool benchmark.",                                    j: "arXiv 2410.09871." },
    { c: "Webersinke et al. (2022)",      v: "ClimateBERT — climate-relevance, sentiment, net-zero detection.",              j: "AAAI / arXiv 2110.12010." },
    { c: "Mukherjee et al. (2022)",       v: "ESG-BERT — E/S/G pillar-level classification.",                                 j: "arXiv 2203.16788." },
    { c: "Yang, Uy & Huang (2022)",       v: "FinBERT-ESG-9-Categories — off-the-shelf 9-category ESG classifier.",          j: "yiyanghkust/finbert-esg-9-categories." },
    { c: "Schimanski et al. (2024)",      v: "Three transformer ESG classifiers validated against Refinitiv.",                j: "Finance Research Letters." },
    { c: "Smeuninx, De Clerck & Aerts (2020)", v: "Corpus NLP on a 2.75M-word sustainability-report corpus.",                  j: "International Journal of Business Communication." },
    { c: "Gutierrez-Bustamante et al. (2022)", v: "NLP scoring of 550 GRI reports across G3/G4/Standards.",                  j: "Sustainability (MDPI)." },
    { c: "Baier, Berninger & Kiesel (2020)",   v: "482-term ESG dictionary across 40 subcategories.",                          j: "Financial Markets & Institutions." },
    { c: "MMESGBench (2025)",                  v: "Multimodal VLM benchmark for ESG visual content.",                          j: "arXiv 2507.18932." },
  ],
  standards: [
    { c: "GRI 3: Material Topics (2021)",     v: "Standard introducing the four-step impact-materiality process.",                            j: "globalreporting.org" },
    { c: "GRI 101: Biodiversity (2024+)",     v: "Replaces GRI 304; broader supply-chain scope.",                                              j: "globalreporting.org" },
    { c: "GRI–SASB Joint Publication (2021)", v: "Conceptual alignment between GRI and SASB sector standards.",                                j: "globalreporting.org" },
    { c: "SASB Semiconductors (TC-SC)",       v: "Sectoral disclosure standard used for cross-walking financial materiality.",                 j: "sasb.ifrs.org" },
    { c: "ISSA 5000 (IAASB, 2024)",           v: "Sustainability-assurance standard — informs the assurance fields in Block B.",               j: "iaasb.org" },
  ],
  tools: [
    "PyMuPDF / pymupdf4llm — primary text extraction (arXiv 2410.09871 benchmark).",
    "Camelot — Lattice-mode GRI table extraction (bordered tables).",
    "pdfplumber — borderless GRI table extraction (2024 cohort).",
    "Docling (IBM Research) — DocLayNet + TableFormer for complex layouts.",
    "Tesseract 4 LSTM via pytesseract — OCR (eng / chi_tra+eng).",
    "fastText lid.176.bin — paragraph-level language detection.",
    "FinBERT-ESG-9-Categories, ClimateBERT, ESG-BERT — English ESG classification.",
    "intfloat/multilingual-e5-large-instruct — bilingual semantic search.",
    "joeddav/xlm-roberta-large-xnli — zero-shot multilingual classification.",
    "RapidFuzz · Qwen3-Embedding-0.6B — Stage 1 / Stage 2 topic-label mapping.",
    "R: fixest, did, HonestDiD, didimputation, staggered, bacondecomp, systemfit, compositions, survival, irr.",
    "Python: pyfixest, statsmodels, scikit-learn, skbio, krippendorff.",
  ],
};

const PAGES = [
  { id: "overview",     short: "Overview",     long: "Overview" },
  { id: "status",       short: "Status",       long: "Status" },
  { id: "methods",      short: "Methods",      long: "Methods" },
  { id: "findings",     short: "Findings",     long: "Findings" },
  { id: "publications", short: "Publications", long: "Publications" },
  { id: "data",         short: "Data & Code",  long: "Data & Code" },
  { id: "data2021",     short: "2021 Data",    long: "2021 Data" },
  { id: "data2022",     short: "2022 Data",    long: "2022 Data" },
  { id: "data2023",     short: "2023 Data",    long: "2023 Data" },
  { id: "data2024",     short: "2024 Data",    long: "2024 Data" },
  { id: "researchlog",  short: "Research log", long: "Research log" },
  { id: "references",   short: "References",   long: "References" },
];

const SECTION_ORDERS = {
  standard: ["overview","status","methods","findings","publications","data","data2021","data2022","data2023","data2024","researchlog","references"],
  findings: ["overview","findings","methods","data2024","data2023","data2022","data2021","data","status","publications","researchlog","references"],
  people:   ["overview","status","methods","findings","data","data2021","data2022","data2023","data2024","publications","researchlog","references"],
};

const PALETTES = {
  manuscript: { name: "Manuscript", paper: "#f4efe6", paperAlt: "#ebe4d6", ink: "#1a1714", inkSoft: "#5c544a", rule: "#d8cdb8", accent: "#7a1f12", accentSoft: "#a64a3b" },
  slate:      { name: "Slate",      paper: "#f3f4f6", paperAlt: "#e6e8ec", ink: "#0f172a", inkSoft: "#475569", rule: "#cbd5df", accent: "#0e6e6e", accentSoft: "#3a8a8a" },
  forest:     { name: "Forest",     paper: "#f1efe7", paperAlt: "#e3e0d2", ink: "#1d211b", inkSoft: "#525a4e", rule: "#c9c8b5", accent: "#3a5a2a", accentSoft: "#5e7a4a" },
  ink:        { name: "Plain ink",  paper: "#fafaf7", paperAlt: "#efeee8", ink: "#111111", inkSoft: "#555555", rule: "#d8d6cf", accent: "#111111", accentSoft: "#444444" },
};

const FONT_PAIRINGS = {
  classic: {
    name: "Classic",
    serif: "'EB Garamond', 'Garamond', 'Times New Roman', serif",
    sans:  "'Inter', 'Helvetica Neue', Arial, sans-serif",
    mono:  "'IBM Plex Mono', 'Menlo', monospace",
    googleImport: "family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500",
  },
  modern: {
    name: "Modern",
    serif: "'Newsreader', 'Source Serif Pro', 'Charter', serif",
    sans:  "'IBM Plex Sans', 'Inter', sans-serif",
    mono:  "'JetBrains Mono', 'IBM Plex Mono', monospace",
    googleImport: "family=Newsreader:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500",
  },
  slab: {
    name: "Slab",
    serif: "'Roboto Slab', 'Source Serif Pro', serif",
    sans:  "'Inter', 'Helvetica Neue', sans-serif",
    mono:  "'IBM Plex Mono', monospace",
    googleImport: "family=Roboto+Slab:wght@400;500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500",
  },
  workhorse: {
    name: "Workhorse",
    serif: "'Source Serif Pro', 'Charter', Georgia, serif",
    sans:  "'IBM Plex Sans', sans-serif",
    mono:  "'IBM Plex Mono', monospace",
    googleImport: "family=Source+Serif+Pro:ital,wght@0,400;0,600;1,400&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500",
  },
};

const DENSITY_SCALE = {
  compact: { padY: 18, padX: 28, line: 1.45, gap: 14, size: 14.5 },
  regular: { padY: 28, padX: 40, line: 1.6,  gap: 20, size: 15.5 },
  comfy:   { padY: 40, padX: 56, line: 1.75, gap: 28, size: 16.5 },
};

// ─── Fonts: inject the chosen Google Fonts import on demand ────────────────
function ensureFontImport(key) {
  const pair = FONT_PAIRINGS[key];
  if (!pair) return;
  const id = `gf-${key}`;
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?${pair.googleImport}&display=swap`;
  document.head.appendChild(link);
}

// ─── Status indicator (4 styles) ───────────────────────────────────────────
function StatusIndicator({ style, status, theme }) {
  const { stage, stage_index, stages, pct } = status;
  const c = theme.ink, soft = theme.inkSoft, accent = theme.accent, rule = theme.rule;

  if (style === "dot") {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: c, fontSize: "0.85em", letterSpacing: ".02em" }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: accent, boxShadow: `0 0 0 3px ${accent}22` }}></span>
        <span>{stage}</span>
        <span style={{ color: soft }}>· {pct}%</span>
      </span>
    );
  }
  if (style === "bar") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 180 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78em", color: soft, letterSpacing: ".04em", textTransform: "uppercase" }}>
          <span>{stage}</span><span>{pct}%</span>
        </div>
        <div style={{ height: 3, background: rule, borderRadius: 2, overflow: "hidden" }}>
          <div style={{ width: `${pct}%`, height: "100%", background: accent }}></div>
        </div>
      </div>
    );
  }
  if (style === "milestone") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 0, fontSize: "0.72em", color: soft, letterSpacing: ".04em" }}>
        {stages.map((s, i) => (
          <React.Fragment key={s}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minWidth: 56 }}>
              <span style={{
                width: 9, height: 9, borderRadius: 999,
                background: i <= stage_index ? accent : "transparent",
                border: `1.5px solid ${i <= stage_index ? accent : rule}`,
              }}></span>
              <span style={{ color: i === stage_index ? c : soft, fontWeight: i === stage_index ? 600 : 400, textAlign: "center", lineHeight: 1.2 }}>{s}</span>
            </div>
            {i < stages.length - 1 && <span style={{ flex: 1, height: 1.5, background: i < stage_index ? accent : rule, marginTop: -16 }}></span>}
          </React.Fragment>
        ))}
      </div>
    );
  }
  // percent (large)
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 10, color: c }}>
      <span style={{ fontSize: "2.2em", fontWeight: 500, lineHeight: 1, color: accent, fontVariantNumeric: "tabular-nums" }}>{pct}%</span>
      <span style={{ fontSize: "0.8em", color: soft, letterSpacing: ".02em" }}>{stage}</span>
    </div>
  );
}

// ─── Placeholder figures (striped SVG / matrix / ridge) ────────────────────
function FigurePlaceholder({ kind, theme, width = "100%", height = 220, label }) {
  const id = `pf-${Math.random().toString(36).slice(2, 8)}`;
  if (kind === "line") {
    return (
      <svg viewBox="0 0 600 220" width={width} height={height} style={{ display: "block" }}>
        <defs>
          <pattern id={id} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="8" height="8" fill={theme.paperAlt}/>
            <line x1="0" y1="0" x2="0" y2="8" stroke={theme.rule} strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="600" height="220" fill={`url(#${id})`}/>
        <rect x="0" y="0" width="600" height="220" fill="none" stroke={theme.rule}/>
        {[40,80,120,160].map(y => <line key={y} x1="40" y1={y} x2="580" y2={y} stroke={theme.rule} strokeDasharray="2 4"/>)}
        <polyline points="40,170 110,160 180,150 250,128 320,108 390,82 460,70 540,42" fill="none" stroke={theme.accent} strokeWidth="2"/>
        {[[40,170],[110,160],[180,150],[250,128],[320,108],[390,82],[460,70],[540,42]].map(([x,y]) => (
          <circle key={`${x},${y}`} cx={x} cy={y} r="3" fill={theme.accent}/>
        ))}
        <text x="20" y="210" fill={theme.inkSoft} fontSize="10" fontFamily="ui-monospace, monospace">{label || "data ▢ — placeholder"}</text>
      </svg>
    );
  }
  if (kind === "matrix") {
    const cells = [];
    for (let r = 0; r < 12; r++) for (let c = 0; c < 20; c++) {
      const v = (Math.sin(r * 1.7 + c * 0.6) + 1) / 2;
      cells.push(<rect key={`${r}-${c}`} x={20 + c * 28} y={20 + r * 14} width="26" height="12" fill={theme.accent} opacity={v.toFixed(2)}/>);
    }
    return (
      <svg viewBox="0 0 600 220" width={width} height={height} style={{ display: "block" }}>
        <rect width="600" height="220" fill={theme.paperAlt}/>
        {cells}
        <rect x="20" y="20" width="560" height="168" fill="none" stroke={theme.rule}/>
        <text x="20" y="210" fill={theme.inkSoft} fontSize="10" fontFamily="ui-monospace, monospace">{label || "matrix ▢ — placeholder"}</text>
      </svg>
    );
  }
  // ridge
  return (
    <svg viewBox="0 0 600 220" width={width} height={height} style={{ display: "block" }}>
      <rect width="600" height="220" fill={theme.paperAlt}/>
      {[0,1,2,3,4,5].map(i => {
        const y = 40 + i * 28;
        const pts = Array.from({length: 30}, (_, n) => {
          const x = 30 + n * 18;
          const amp = 18 - i*1.5;
          const yy = y - Math.exp(-Math.pow((n - (10 + i*1.3))/4, 2)) * amp - Math.exp(-Math.pow((n - (20 - i))/3, 2)) * amp * 0.6;
          return `${x},${yy}`;
        }).join(" ");
        return <polyline key={i} points={pts} fill="none" stroke={theme.accent} strokeWidth="1.5" opacity={0.4 + i*0.1}/>;
      })}
      <text x="20" y="210" fill={theme.inkSoft} fontSize="10" fontFamily="ui-monospace, monospace">{label || "ridge ▢ — placeholder"}</text>
    </svg>
  );
}

Object.assign(window, { CONTENT, COHORTS, BLOCKS, MODELS, AUDIT_2021, AUDIT_2022, AUDIT_2023, AUDIT_2024, ALL_AUDITS, CROSS_COHORT_ISSUES, RESEARCH_LOG, REFERENCES, PAGES, SECTION_ORDERS, PALETTES, FONT_PAIRINGS, DENSITY_SCALE, ensureFontImport, StatusIndicator, FigurePlaceholder });


/* ── tweaks-panel.jsx ───────────────────────────────────────────────────── */

// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null
      ? keyOrEdits : { [keyOrEdits]: val };
    setValues((prev) => ({ ...prev, ...edits }));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', { detail: edits }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({ title = 'Tweaks', children }) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({ x: 16, y: 16 });
  const PAD = 16;

  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth, h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y)),
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);

  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);

  React.useEffect(() => {
    const onMsg = (e) => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);
      else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
  };

  const onDragStart = (e) => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX, sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = (ev) => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy),
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  if (!open) return null;
  return (
    <>
      <style>{__TWEAKS_STYLE}</style>
      <div ref={dragRef} className="twk-panel" data-omelette-chrome=""
           style={{ right: offsetRef.current.x, bottom: offsetRef.current.y }}>
        <div className="twk-hd" onMouseDown={onDragStart}>
          <b>{title}</b>
          <button className="twk-x" aria-label="Close tweaks"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={dismiss}>✕</button>
        </div>
        <div className="twk-body">
          {children}
        </div>
      </div>
    </>
  );
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({ label, children }) {
  return (
    <>
      <div className="twk-sect">{label}</div>
      {children}
    </>
  );
}

function TweakRow({ label, value, children, inline = false }) {
  return (
    <div className={inline ? 'twk-row twk-row-h' : 'twk-row'}>
      <div className="twk-lbl">
        <span>{label}</span>
        {value != null && <span className="twk-val">{value}</span>}
      </div>
      {children}
    </div>
  );
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({ label, value, min = 0, max = 100, step = 1, unit = '', onChange }) {
  return (
    <TweakRow label={label} value={`${value}${unit}`}>
      <input type="range" className="twk-slider" min={min} max={max} step={step}
             value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </TweakRow>
  );
}

function TweakToggle({ label, value, onChange }) {
  return (
    <div className="twk-row twk-row-h">
      <div className="twk-lbl"><span>{label}</span></div>
      <button type="button" className="twk-toggle" data-on={value ? '1' : '0'}
              role="switch" aria-checked={!!value}
              onClick={() => onChange(!value)}><i /></button>
    </div>
  );
}

function TweakRadio({ label, value, options, onChange }) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = (o) => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({ 2: 16, 3: 10 }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = (s) => {
      const m = options.find((o) => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return <TweakSelect label={label} value={value} options={options}
                        onChange={(s) => onChange(resolve(s))} />;
  }
  const opts = options.map((o) => (typeof o === 'object' ? o : { value: o, label: o }));
  const idx = Math.max(0, opts.findIndex((o) => o.value === value));
  const n = opts.length;

  const segAt = (clientX) => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor(((clientX - r.left - 2) / inner) * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };

  const onPointerDown = (e) => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = (ev) => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <TweakRow label={label}>
      <div ref={trackRef} role="radiogroup" onPointerDown={onPointerDown}
           className={dragging ? 'twk-seg dragging' : 'twk-seg'}>
        <div className="twk-seg-thumb"
             style={{ left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
                      width: `calc((100% - 4px) / ${n})` }} />
        {opts.map((o) => (
          <button key={o.value} type="button" role="radio" aria-checked={o.value === value}>
            {o.label}
          </button>
        ))}
      </div>
    </TweakRow>
  );
}

function TweakSelect({ label, value, options, onChange }) {
  return (
    <TweakRow label={label}>
      <select className="twk-field" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => {
          const v = typeof o === 'object' ? o.value : o;
          const l = typeof o === 'object' ? o.label : o;
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
    </TweakRow>
  );
}

function TweakText({ label, value, placeholder, onChange }) {
  return (
    <TweakRow label={label}>
      <input className="twk-field" type="text" value={value} placeholder={placeholder}
             onChange={(e) => onChange(e.target.value)} />
    </TweakRow>
  );
}

function TweakNumber({ label, value, min, max, step = 1, unit = '', onChange }) {
  const clamp = (n) => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({ x: 0, val: 0 });
  const onScrubStart = (e) => {
    e.preventDefault();
    startRef.current = { x: e.clientX, val: value };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = (ev) => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return (
    <div className="twk-num">
      <span className="twk-num-lbl" onPointerDown={onScrubStart}>{label}</span>
      <input type="number" value={value} min={min} max={max} step={step}
             onChange={(e) => onChange(clamp(Number(e.target.value)))} />
      {unit && <span className="twk-num-unit">{unit}</span>}
    </div>
  );
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, (c) => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}

const __TwkCheck = ({ light }) => (
  <svg viewBox="0 0 14 14" aria-hidden="true">
    <path d="M3 7.2 5.8 10 11 4.2" fill="none" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round"
          stroke={light ? 'rgba(0,0,0,.78)' : '#fff'} />
  </svg>
);

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({ label, value, options, onChange }) {
  if (!options || !options.length) {
    return (
      <div className="twk-row twk-row-h">
        <div className="twk-lbl"><span>{label}</span></div>
        <input type="color" className="twk-swatch" value={value}
               onChange={(e) => onChange(e.target.value)} />
      </div>
    );
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = (o) => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return (
    <TweakRow label={label}>
      <div className="twk-chips" role="radiogroup">
        {options.map((o, i) => {
          const colors = Array.isArray(o) ? o : [o];
          const [hero, ...rest] = colors;
          const sup = rest.slice(0, 4);
          const on = key(o) === cur;
          return (
            <button key={i} type="button" className="twk-chip" role="radio"
                    aria-checked={on} data-on={on ? '1' : '0'}
                    aria-label={colors.join(', ')} title={colors.join(' · ')}
                    style={{ background: hero }}
                    onClick={() => onChange(o)}>
              {sup.length > 0 && (
                <span>
                  {sup.map((c, j) => <i key={j} style={{ background: c }} />)}
                </span>
              )}
              {on && <__TwkCheck light={__twkIsLight(hero)} />}
            </button>
          );
        })}
      </div>
    </TweakRow>
  );
}

function TweakButton({ label, onClick, secondary = false }) {
  return (
    <button type="button" className={secondary ? 'twk-btn secondary' : 'twk-btn'}
            onClick={onClick}>{label}</button>
  );
}

Object.assign(window, {
  useTweaks, TweaksPanel, TweakSection, TweakRow,
  TweakSlider, TweakToggle, TweakRadio, TweakSelect,
  TweakText, TweakNumber, TweakColor, TweakButton,
});


/* ── direction-a.jsx ────────────────────────────────────────────────────── */
// direction-a.jsx — "The Working Paper"
// Restrained, journal-like single-column typesetting. Serif body, small-caps
// section heads, hairline rules, marginalia in the gutter on wide pages.

// ── Live-data helpers ────────────────────────────────────────────────────────

// Split a markdown document on ## headings → { 'Section Name': 'content…' }
function parseSections(text) {
  const body = text.replace(/^---[\s\S]*?---\n/, ''); // strip YAML frontmatter
  const sections = {};
  body.split(/^## /m).slice(1).forEach(chunk => {
    const nl = chunk.indexOf('\n');
    const heading = chunk.slice(0, nl).trim().replace(/^──\s*|\s*──$/g, '').trim();
    sections[heading] = chunk.slice(nl + 1).trim();
  });
  return sections;
}

// Fetch all three research files once on mount; fall back gracefully if offline.
function useLiveData() {
  const [live, setLive] = React.useState({ summary: null, methodology: null, log: null, audits: null });
  React.useEffect(() => {
    Promise.allSettled([
      fetch('data/research-summary_twse-materiality.md').then(r => { if (!r.ok) throw r; return r.text(); }),
      fetch('data/Materiality_Research_Methodology.md').then(r => { if (!r.ok) throw r; return r.text(); }),
      fetch('data/research_log.json').then(r => { if (!r.ok) throw r; return r.json(); }),
      fetch('data/audits/text_extraction_quality_audit_2021.md').then(r => { if (!r.ok) throw r; return r.text(); }),
      fetch('data/audits/text_extraction_quality_audit_2022.md').then(r => { if (!r.ok) throw r; return r.text(); }),
      fetch('data/audits/text_extraction_quality_audit_2023.md').then(r => { if (!r.ok) throw r; return r.text(); }),
      fetch('data/audits/text_extraction_quality_audit_2024.md').then(r => { if (!r.ok) throw r; return r.text(); }),
    ]).then(([summaryRes, methRes, logRes, a21Res, a22Res, a23Res, a24Res]) => {
      setLive({
        summary:     summaryRes.status === 'fulfilled' ? parseSections(summaryRes.value) : null,
        methodology: methRes.status    === 'fulfilled' ? parseSections(methRes.value)    : null,
        log:         logRes.status     === 'fulfilled' ? logRes.value                    : null,
        audits: {
          "2021": a21Res.status === 'fulfilled' ? a21Res.value : null,
          "2022": a22Res.status === 'fulfilled' ? a22Res.value : null,
          "2023": a23Res.status === 'fulfilled' ? a23Res.value : null,
          "2024": a24Res.status === 'fulfilled' ? a24Res.value : null,
        },
      });
    });
  }, []);
  return live;
}

// Render a live markdown section inside the existing .pa typography context.
function MdSection({ md, theme, d }) {
  if (!md || typeof marked === 'undefined') return null;
  const html = marked.parse(md);
  return (
    <div className="md-content"
         style={{ color: theme.ink, fontSize: d.size, lineHeight: d.line }}
         dangerouslySetInnerHTML={{ __html: html }} />
  );
}

// ── Direction A ──────────────────────────────────────────────────────────────
function DirectionA({ tweak, page, setPage, live }) {
  const theme = PALETTES[tweak.palette];
  const fonts = FONT_PAIRINGS[tweak.fonts];
  const d = DENSITY_SCALE[tweak.density];
  const order = SECTION_ORDERS[tweak.sectionOrder];

  React.useEffect(() => {ensureFontImport(tweak.fonts);}, [tweak.fonts]);

  const css = `
    .pa { background:${theme.paper}; color:${theme.ink}; font-family:${fonts.serif};
          font-size:${d.size + 1}px; line-height:${d.line};
          font-feature-settings:"onum","liga"; }
    .pa .sans { font-family:${fonts.sans}; }
    .pa .mono { font-family:${fonts.mono}; }
    .pa .accent { color:${theme.accent}; }
    .pa .soft { color:${theme.inkSoft}; }
    .pa h1, .pa h2, .pa h3, .pa h4 { font-weight:500; margin:0; }
    .pa h1 { font-size:${d.size * 2.4}px; line-height:1.1; letter-spacing:-0.01em; }
    .pa h2 { font-family:${fonts.sans}; font-size:${d.size * 0.78}px; font-weight:600;
             letter-spacing:.16em; text-transform:uppercase; color:${theme.inkSoft}; }
    .pa h3 { font-size:${d.size * 1.15}px; font-style:italic; font-weight:400; }
    .pa h4 { font-family:${fonts.sans}; font-size:${d.size * 0.78}px; font-weight:600;
             letter-spacing:.08em; text-transform:uppercase; color:${theme.ink}; }
    .pa .rule { border:0; border-top:0.5px solid ${theme.rule}; margin:0; }
    .pa .rule-thick { border:0; border-top:1.5px solid ${theme.ink}; margin:0; }
    .pa a { color:${theme.accent}; text-decoration:none;
            border-bottom:0.5px solid ${theme.accentSoft}; }
    .pa a:hover { background:${theme.accent}11; }
    .pa .num { font-variant-numeric: tabular-nums lining-nums; }
    .pa p { margin:0; }
    .pa p + p { text-indent: 1.6em; margin-top: 0.2em; }
    .pa figure { margin:0; }
    .pa .smcaps { font-variant-caps: all-small-caps; letter-spacing:.08em; }
    .pa-nav-link { background:none; border:0; padding:0; font:inherit; color:inherit;
                   cursor:pointer; text-align:left; }
  `;

  const PAD = { padding: `${d.padY * 1.4}px ${d.padX * 2}px` };

  return (
    <div className="pa" data-screen-label={`A · ${page.toUpperCase()}`}>
      <style>{css}</style>

      {/* ── Masthead ─────────────────────────────────────────── */}
      <header style={{ ...PAD, paddingBottom: d.padY * 0.6, borderBottom: `1.5px solid ${theme.ink}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: d.gap * 2 }}>
          <div className="sans smcaps" style={{ fontSize: d.size * 0.75, letterSpacing: ".18em", color: theme.inkSoft }}>
            Working Paper · RK 2024 ·V1
          </div>
          <div className="sans" style={{ fontSize: d.size * 0.72, color: theme.inkSoft, letterSpacing: ".04em" }}>
            Last update — {CONTENT.status.last_update}
          </div>
        </div>

        <h1 style={{ marginBottom: 8, maxWidth: "20ch" }}>{CONTENT.meta.title}</h1>
        <div style={{ fontStyle: "italic", fontSize: d.size * 1.05, color: theme.inkSoft, marginBottom: d.gap }}>
          {CONTENT.meta.subtitle}
        </div>
        <div className="sans" style={{ fontSize: d.size * 0.78, color: theme.ink, letterSpacing: ".02em" }}>
          {CONTENT.meta.pi} · <span className="soft">{CONTENT.meta.affiliation}</span>
        </div>
      </header>

      {/* ── Nav ─────────────────────────────────────────────── */}
      <nav style={{
        ...PAD, paddingTop: d.padY * 0.6, paddingBottom: d.padY * 0.6,
        display: "flex", flexWrap: "wrap", gap: `${d.gap * 0.4}px ${d.gap * 1.4}px`,
        borderBottom: `0.5px solid ${theme.rule}`
      }} data-comment-anchor="ac33cf5ed0-nav-69-7">
        {order.map((id) => {
          const p = PAGES.find((x) => x.id === id);
          const active = page === id;
          return (
            <button key={id} className="pa-nav-link sans" onClick={() => setPage(id)}
            style={{
              fontSize: d.size * 0.78,
              letterSpacing: ".06em",
              fontWeight: active ? 600 : 400,
              color: active ? theme.accent : theme.inkSoft,
              borderBottom: active ? `1.5px solid ${theme.accent}` : "1.5px solid transparent",
              paddingBottom: 4
            }}>
              {p.short}
            </button>);

        })}
      </nav>

      {/* ── Page bodies ─────────────────────────────────────── */}
      <main style={PAD}>
        {page === "overview"    && <OverviewA  theme={theme} d={d} fonts={fonts} tweak={tweak} live={live} />}
        {page === "status"      && <StatusA    theme={theme} d={d} fonts={fonts} tweak={tweak} live={live} />}
        {page === "methods"     && <MethodsA   theme={theme} d={d} fonts={fonts} live={live} />}
        {page === "findings"    && <FindingsA  theme={theme} d={d} fonts={fonts} live={live} />}
        {page === "publications" && <PublicationsA theme={theme} d={d} fonts={fonts} />}
        {page === "people" && <PeopleA theme={theme} d={d} fonts={fonts} />}
        {page === "data" && <DataA theme={theme} d={d} fonts={fonts} live={live} />}
        {page === "data2021" && <DataAuditA theme={theme} d={d} fonts={fonts} audit={AUDIT_2021} live={live} />}
        {page === "data2022" && <DataAuditA theme={theme} d={d} fonts={fonts} audit={AUDIT_2022} live={live} />}
        {page === "data2023" && <DataAuditA theme={theme} d={d} fonts={fonts} audit={AUDIT_2023} live={live} />}
        {page === "data2024" && <DataAuditA theme={theme} d={d} fonts={fonts} audit={AUDIT_2024} live={live} />}
        {page === "researchlog" && <ResearchLogA theme={theme} d={d} fonts={fonts} live={live} />}
        {page === "references" && <ReferencesA theme={theme} d={d} fonts={fonts} />}
      </main>

      {/* ── Colophon ─────────────────────────────────────────── */}
      <footer style={{ ...PAD, paddingTop: d.padY * 0.7, borderTop: `0.5px solid ${theme.rule}`, color: theme.inkSoft }}>
        <hr className="rule" style={{ display: "none" }} />
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: d.gap * 2, fontSize: d.size * 0.8 }}>
          <div>
            <div className="sans smcaps" style={{ fontSize: d.size * 0.7, color: theme.ink, marginBottom: 6 }}>Correspondence</div>
            <div>{CONTENT.meta.pi}<br />{CONTENT.meta.affiliation}<br />
              <a href={`mailto:${CONTENT.meta.email}`}>{CONTENT.meta.email}</a></div>
          </div>
          <div>
            <div className="sans smcaps" style={{ fontSize: d.size * 0.7, color: theme.ink, marginBottom: 6 }}>Identifiers</div>
            <div className="mono" style={{ fontSize: d.size * 0.78 }}>
              Project&nbsp;{CONTENT.meta.project_id}
            </div>
          </div>
          <div style={{ textAlign: "right", fontStyle: "italic" }}>
            <span className="smcaps sans" style={{ fontStyle: "normal", letterSpacing: ".12em" }}>working paper · do not cite</span>
          </div>
        </div>
      </footer>
    </div>);

}

// ─── Page: Overview ────────────────────────────────────────────────────────
function OverviewA({ theme, d, fonts, tweak, live }) {
  const liveRQ = live && live.summary && live.summary['Research Question'];
  return (
    <article style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: d.gap * 2.4 }}>
      <aside style={{ fontSize: d.size * 0.78, color: theme.inkSoft, fontStyle: "italic", borderRight: `0.5px solid ${theme.rule}`, paddingRight: d.gap }}>
        <div className="sans smcaps" style={{ fontStyle: "normal", color: theme.ink, letterSpacing: ".12em", fontSize: d.size * 0.7, marginBottom: 6 }}>Abstract</div>
        <div>A staggered-DiD text-mining account of how GRI 3 (effective Jan 2023) reshaped material-topic selection in TWSE and global peers.</div>
      </aside>
      <div style={{ maxWidth: "62ch" }}>
        {liveRQ
          ? <MdSection md={liveRQ} theme={theme} d={d} />
          : CONTENT.abstract.map((para, i) =>
              <p key={i} style={{ marginBottom: i < CONTENT.abstract.length - 1 ? d.gap * 0.6 : 0 }}>{para}</p>
            )
        }

        <div style={{ marginTop: d.gap * 2, padding: `${d.gap}px ${d.gap * 1.2}px`, background: theme.paperAlt, borderLeft: `2px solid ${theme.accent}` }}>
          <div className="sans smcaps" style={{ fontSize: d.size * 0.7, color: theme.inkSoft, letterSpacing: ".12em", marginBottom: 8 }}>
            Status at a glance
          </div>
          <StatusIndicator style={tweak.statusStyle} status={CONTENT.status} theme={theme} />
        </div>

        <div style={{ marginTop: d.gap * 2, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: d.gap, fontFeatureSettings: "'tnum'" }}>
          {CONTENT.status.counts.slice(0, 3).map((c) =>
          <div key={c.k} style={{ borderTop: `0.5px solid ${theme.rule}`, paddingTop: 8 }}>
              <div className="sans" style={{ fontSize: d.size * 0.72, color: theme.inkSoft, letterSpacing: ".04em", textTransform: "uppercase", marginBottom: 4 }}>{c.k}</div>
              <div className="num" style={{ fontSize: d.size * 1.6, color: theme.ink, lineHeight: 1 }}>{c.v}</div>
              {c.of && <div className="sans" style={{ fontSize: d.size * 0.72, color: theme.inkSoft, marginTop: 2 }}>{c.of}</div>}
            </div>
          )}
        </div>
      </div>
    </article>);

}

// ─── Page: Status ──────────────────────────────────────────────────────────
function StatusA({ theme, d, fonts, tweak, live }) {
  const livePending = live?.summary?.['Pending Work (Prioritised)'];
  const liveGaps    = live?.summary?.['Research Gaps (Top 3, from research-gap-analysis 2026-05-18)'];
  return (
    <article style={{ maxWidth: "72ch", margin: "0 auto" }}>
      <h2 style={{ marginBottom: d.gap }}>§ Project status</h2>
      <div style={{ marginBottom: d.gap * 1.4 }}>
        <StatusIndicator style="milestone" status={CONTENT.status} theme={theme} />
      </div>

      {(livePending || liveGaps)
        ? <>
            {livePending && <MdSection md={livePending} theme={theme} d={d} />}
            {liveGaps && <>
              <hr style={{ border: 0, borderTop: `0.5px solid ${theme.rule}`, margin: `${d.gap * 1.4}px 0` }} />
              <MdSection md={liveGaps} theme={theme} d={d} />
            </>}
          </>
        : <>
            <p style={{ marginBottom: d.gap * 1.2 }}>
              The project is presently in its <em>data collection</em> phase. Approximately {CONTENT.status.pct}% of the planned workload is complete; the corpus is on track for full assembly by Q3 2026, after which analysis can begin in earnest.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: `${d.gap * 0.6}px ${d.gap * 2}px`, marginBottom: d.gap * 2 }}>
              {CONTENT.status.counts.map((c) =>
              <div key={c.k} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: `0.5px solid ${theme.rule}`, padding: "10px 0" }}>
                  <span className="sans" style={{ fontSize: d.size * 0.85 }}>{c.k}</span>
                  <span style={{ textAlign: "right" }}>
                    <span className="num" style={{ fontSize: d.size * 1.15 }}>{c.v}</span>
                    {c.of && <span className="sans soft" style={{ fontSize: d.size * 0.72, marginLeft: 6 }}>· {c.of}</span>}
                  </span>
                </div>
              )}
            </div>
            <h4 style={{ marginBottom: d.gap }}>Upcoming milestones</h4>
            <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {CONTENT.status.next.map((m, i) =>
              <li key={i} style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: d.gap, padding: `${d.gap * 0.5}px 0`, borderBottom: i < CONTENT.status.next.length - 1 ? `0.5px solid ${theme.rule}` : "none" }}>
                  <span className="sans num" style={{ fontSize: d.size * 0.85, color: theme.accent, letterSpacing: ".02em" }}>{m.d}</span>
                  <span style={{ fontStyle: "italic" }}>{m.t}</span>
                </li>
              )}
            </ol>
          </>
      }
    </article>);
}

// ─── Page: Methods ─────────────────────────────────────────────────────────
function MethodsA({ theme, d, fonts, live }) {
  const liveMethod  = live && live.summary     && live.summary['Methodology'];
  const liveDashboard = live && live.methodology && live.methodology['RESEARCH STATUS DASHBOARD'];
  return (
    <article style={{ maxWidth: "72ch", margin: "0 auto" }}>
      <h2 style={{ marginBottom: d.gap }}>§ Methods</h2>
      {liveMethod
        ? <MdSection md={liveMethod} theme={theme} d={d} />
        : <>
            <p style={{ marginBottom: d.gap * 1.6, fontStyle: "italic", color: theme.inkSoft }}>
              The pipeline is built for legibility before throughput. Each stage is documented in a corresponding notebook in the project repository and produces inspectable artefacts.
            </p>
            {CONTENT.methods.map((m, i) =>
              <section key={i} style={{ marginBottom: d.gap * 1.6 }}>
                <h3 style={{ marginBottom: 6 }}>
                  <span className="smcaps sans" style={{ fontStyle: "normal", color: theme.accent, marginRight: 10, fontSize: d.size * 0.78, fontWeight: 600 }}>{String(i + 1).padStart(2, "0")}</span>
                  {m.h}
                </h3>
                <p>{m.p}</p>
              </section>
            )}
          </>
      }
      {liveDashboard && (
        <>
          <hr style={{ border: 0, borderTop: `0.5px solid ${theme.rule}`, margin: `${d.gap * 1.8}px 0` }} />
          <h2 style={{ marginBottom: d.gap }}>§ Pipeline status</h2>
          <MdSection md={liveDashboard} theme={theme} d={d} />
        </>
      )}
    </article>);
}

// ─── Page: Findings ────────────────────────────────────────────────────────
function FindingsA({ theme, d, fonts, live }) {
  const liveFindings    = live?.summary?.['Key Findings'];
  const liveHypotheses  = live?.summary?.['Hypotheses'];
  const liveComparisons = live?.summary?.['Comparisons & Metrics'];
  return (
    <article style={{ maxWidth: "78ch", margin: "0 auto" }}>
      <h2 style={{ marginBottom: d.gap }}>§ Findings — preliminary</h2>
      <p style={{ fontStyle: "italic", color: theme.inkSoft, marginBottom: d.gap * 1.6 }}>
        Reported against the working subset of {CONTENT.status.counts[1].v} processed reports. Numbers will firm up as the remaining corpus is processed.
      </p>

      {liveFindings
        ? <MdSection md={liveFindings} theme={theme} d={d} />
        : CONTENT.findings.map((f, i) =>
            <section key={f.n} style={{ display: "grid", gridTemplateColumns: "72px 1fr", gap: d.gap, marginBottom: d.gap * 1.8 }}>
              <div className="num sans" style={{ fontSize: d.size * 1.8, color: theme.accent, lineHeight: 1, paddingTop: 4 }}>{f.n}</div>
              <div>
                <h3 style={{ marginBottom: 6 }}>{f.h}</h3>
                <p>{f.p}</p>
              </div>
            </section>
          )
      }

      {liveHypotheses && <>
        <hr style={{ border: 0, borderTop: `0.5px solid ${theme.rule}`, margin: `${d.gap * 1.4}px 0` }} />
        <MdSection md={liveHypotheses} theme={theme} d={d} />
      </>}

      {liveComparisons && <>
        <hr style={{ border: 0, borderTop: `0.5px solid ${theme.rule}`, margin: `${d.gap * 1.4}px 0` }} />
        <MdSection md={liveComparisons} theme={theme} d={d} />
      </>}

      <hr className="rule" style={{ margin: `${d.gap * 1.4}px 0` }} />
      <h4 style={{ marginBottom: d.gap }}>Figures</h4>
      {CONTENT.figures.map((fig) =>
      <figure key={fig.id} style={{ marginBottom: d.gap * 1.4 }}>
          <FigurePlaceholder kind={fig.kind} theme={theme} label={`${fig.id} — placeholder`} height={200} />
          <figcaption style={{ fontSize: d.size * 0.82, color: theme.inkSoft, marginTop: 8, fontStyle: "italic" }}>
            <span className="sans smcaps" style={{ fontStyle: "normal", color: theme.ink, letterSpacing: ".08em", marginRight: 6 }}>{fig.id}</span>
            {fig.caption}
          </figcaption>
        </figure>
      )}
    </article>);

}

// ─── Page: Publications ────────────────────────────────────────────────────
function PublicationsA({ theme, d, fonts }) {
  return (
    <article style={{ maxWidth: "72ch", margin: "0 auto" }}>
      <h2 style={{ marginBottom: d.gap }}>§ Publications &amp; talks</h2>
      <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {CONTENT.publications.map((p, i) =>
        <li key={i} style={{ padding: `${d.gap}px 0`, borderBottom: i < CONTENT.publications.length - 1 ? `0.5px solid ${theme.rule}` : "none", display: "grid", gridTemplateColumns: "120px 1fr 120px", gap: d.gap, alignItems: "baseline" }}>
            <div>
              <div className="sans smcaps" style={{ fontSize: d.size * 0.72, color: theme.inkSoft, letterSpacing: ".1em" }}>{p.kind}</div>
              <div className="sans num" style={{ fontSize: d.size * 0.85 }}>{p.year}</div>
            </div>
            <div>{p.cite}</div>
            <div className="sans" style={{ fontSize: d.size * 0.78, fontStyle: "italic", color: theme.accent, textAlign: "right" }}>{p.status}</div>
          </li>
        )}
      </ol>
    </article>);

}

// ─── Page: People & Funding ────────────────────────────────────────────────
function PeopleA({ theme, d, fonts }) {
  return (
    <article style={{ maxWidth: "78ch", margin: "0 auto" }}>
      <h2 style={{ marginBottom: d.gap }}>§ People &amp; funding</h2>

      <h4 style={{ marginBottom: d.gap }}>Project team</h4>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: d.gap }}>
        {CONTENT.team.map((t, i) =>
        <div key={i} style={{ padding: `${d.gap * 0.7}px 0`, borderTop: `0.5px solid ${theme.rule}` }}>
            <div style={{ fontSize: d.size * 1.05 }}>{t.name}</div>
            <div className="sans" style={{ fontSize: d.size * 0.78, color: theme.accent, letterSpacing: ".02em" }}>{t.role}</div>
            <div className="soft" style={{ fontSize: d.size * 0.85, fontStyle: "italic", marginTop: 4 }}>{t.focus}</div>
          </div>
        )}
      </div>

      <h4 style={{ marginTop: d.gap * 1.6, marginBottom: d.gap }}>Collaborators</h4>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {CONTENT.collaborators.map((c, i) =>
        <li key={i} style={{ padding: "6px 0", borderBottom: `0.5px dotted ${theme.rule}` }}>{c}</li>
        )}
      </ul>

      {CONTENT.funding.length > 0 &&
      <React.Fragment>
          <h4 style={{ marginTop: d.gap * 1.6, marginBottom: d.gap }}>Funding</h4>
          {CONTENT.funding.map((f, i) =>
        <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: d.gap, padding: `${d.gap * 0.5}px 0`, borderBottom: `0.5px solid ${theme.rule}`, fontSize: d.size * 0.92 }}>
              <span>{f.src}</span>
              <span className="mono soft">{f.id}</span>
              <span className="sans soft">{f.period}</span>
              <span className="num" style={{ textAlign: "right", color: theme.accent }}>{f.amt}</span>
            </div>
        )}
        </React.Fragment>
      }
    </article>);
}

// ─── Page: Data & Code ─────────────────────────────────────────────────────
function DataA({ theme, d, fonts, live }) {
  const liveDataQuality  = live?.summary?.['Data Quality'];
  const liveVarRegistry  = live?.summary?.['Variable Registry Changes (All Sessions)'];
  if (liveDataQuality || liveVarRegistry) {
    return (
      <article style={{ maxWidth: "78ch", margin: "0 auto" }}>
        <h2 style={{ marginBottom: d.gap }}>§ Data &amp; code</h2>
        {liveDataQuality && <MdSection md={liveDataQuality} theme={theme} d={d} />}
        {liveVarRegistry && <>
          <hr style={{ border: 0, borderTop: `0.5px solid ${theme.rule}`, margin: `${d.gap * 1.4}px 0` }} />
          <MdSection md={liveVarRegistry} theme={theme} d={d} />
        </>}
      </article>
    );
  }
  // ── Fallback: structured static data ──────────────────────────────────────
  return (
    <article style={{ maxWidth: "78ch", margin: "0 auto" }} data-comment-anchor="ee9667fd6b-article-322-5">
      <h2 style={{ marginBottom: d.gap }}>§ Data &amp; code</h2>
      <p style={{ fontStyle: "italic", color: theme.inkSoft, marginBottom: d.gap * 1.4 }}>
        Where possible, artefacts are released under open licences. The processed corpus remains restricted until publication to honour data-sharing terms with the GRI Research Network and TWSE MOPS/ESGgenplus.
      </p>

      <h4 style={{ marginBottom: d.gap }}>Variable blocks (company-year schema)</h4>
      <p style={{ fontStyle: "italic", color: theme.inkSoft, marginBottom: d.gap * 1.4, fontSize: d.size * 0.9 }}>
        The unit of observation is one company's sustainability report covering one fiscal year. Seven coordinated blocks make up the panel; outcome and topic-level subtables join on company × fiscal_year.
      </p>
      {BLOCKS.map((b) => (
        <section key={b.id} style={{ marginBottom: d.gap * 1.6, borderTop: `1.5px solid ${theme.ink}`, paddingTop: d.gap * 0.6 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: d.gap * 0.4, marginBottom: 6 }}>
            <h3 style={{ marginBottom: 0 }}>
              <span className="sans smcaps" style={{ color: theme.accent, fontStyle: "normal", fontWeight: 600, letterSpacing: ".1em", fontSize: d.size * 0.85, marginRight: 10 }}>Block&nbsp;{b.id}</span>
              <span style={{ fontStyle: "italic" }}>{b.h}</span>
            </h3>
            <span className="sans" style={{ fontSize: d.size * 0.75, color: theme.inkSoft, letterSpacing: ".04em" }}>unit — {b.unit}</span>
          </div>
          <div className="soft" style={{ fontSize: d.size * 0.85, marginBottom: 10 }}>{b.src}</div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 18ch) 90px 1fr", rowGap: 4, columnGap: d.gap * 0.8, fontSize: d.size * 0.85 }}>
            {b.vars.map((row, vi) => (
              <React.Fragment key={vi}>
                <span className="mono" style={{ color: theme.ink, fontSize: d.size * 0.82, alignSelf: "baseline" }}>{row[0]}</span>
                <span className="sans soft" style={{ fontSize: d.size * 0.72, letterSpacing: ".04em", textTransform: "uppercase", alignSelf: "baseline" }}>{row[1]}</span>
                <span style={{ alignSelf: "baseline" }}>{row[2]}</span>
              </React.Fragment>
            ))}
          </div>
        </section>
      ))}

      <h4 style={{ marginBottom: d.gap }}>Corpus by cohort</h4>
      <div style={{ display: "grid", gridTemplateColumns: "60px repeat(5, 1fr)", gap: 0, marginBottom: d.gap * 1.4, fontSize: d.size * 0.85 }}>
        {["Year", "Files", "English %", "GRI files", "GRI codes", "Avg/file"].map((h, i) =>
        <div key={i} className="sans" style={{ fontSize: d.size * 0.72, color: theme.inkSoft, letterSpacing: ".08em", textTransform: "uppercase", padding: "6px 8px", borderBottom: `1.5px solid ${theme.ink}` }}>{h}</div>
        )}
        {CONTENT && COHORTS.map((c, i) =>
        <React.Fragment key={c.y}>
            <div className="num sans" style={{ padding: "8px", borderBottom: `0.5px solid ${theme.rule}`, color: theme.accent }}>{c.y}</div>
            <div className="num" style={{ padding: "8px", borderBottom: `0.5px solid ${theme.rule}` }}>{c.total.toLocaleString()}</div>
            <div className="num" style={{ padding: "8px", borderBottom: `0.5px solid ${theme.rule}` }}>{c.en_pct}%</div>
            <div className="num" style={{ padding: "8px", borderBottom: `0.5px solid ${theme.rule}` }}>{c.gri_files} <span style={{ color: theme.inkSoft, fontSize: d.size * 0.75 }}>({c.gri_pct}%)</span></div>
            <div className="num" style={{ padding: "8px", borderBottom: `0.5px solid ${theme.rule}` }}>{c.gri_codes.toLocaleString()}</div>
            <div className="num" style={{ padding: "8px", borderBottom: `0.5px solid ${theme.rule}` }}>{c.avg_codes}</div>
          </React.Fragment>
        )}
      </div>

      <h4 style={{ marginBottom: d.gap }}>Tests performed</h4>
      <ol style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: d.gap * 1.4 }}>
        {AUDIT_2024.checks.map((ch) =>
        <li key={ch.id} style={{ display: "grid", gridTemplateColumns: "40px 1fr", gap: d.gap, padding: `${d.gap * 0.6}px 0`, borderBottom: `0.5px solid ${theme.rule}` }}>
            <span className="num sans" style={{ fontSize: d.size * 1.2, color: theme.accent, lineHeight: 1 }}>{ch.id}</span>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                <span style={{ fontStyle: "italic" }}>{ch.h}</span>
                <span className="sans" style={{ fontSize: d.size * 0.78, color: theme.accent }}>{ch.status}</span>
              </div>
              <div className="soft" style={{ fontSize: d.size * 0.88 }}>{ch.tests}</div>
              <div style={{ fontSize: d.size * 0.88, marginTop: 4 }}>{ch.result}</div>
            </div>
          </li>
        )}
      </ol>

      <h4 style={{ marginBottom: d.gap }}>Issue prevalence &amp; remediation, 2021 → 2024</h4>
      <p style={{ fontStyle: "italic", color: theme.inkSoft, marginBottom: d.gap, fontSize: d.size * 0.9 }}>
        Each row is one structural issue identified at raw-extraction time. Status shows whether the five-stage pipeline has resolved it across all cohorts.
      </p>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: d.gap * 1.6, fontSize: d.size * 0.85 }}>
        <thead>
          <tr>
            {["#", "Issue", "2021", "2022", "2023", "2024", "Remediation", "Status"].map((h, i) =>
            <th key={i} className="sans" style={{ textAlign: i < 2 ? "left" : i === 6 ? "left" : i === 7 ? "right" : "right", padding: "6px 8px", color: theme.inkSoft, fontSize: d.size * 0.7, letterSpacing: ".08em", textTransform: "uppercase", borderBottom: `1.5px solid ${theme.ink}`, fontWeight: 600 }}>{h}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {CROSS_COHORT_ISSUES.map((iss) =>
          <tr key={iss.n}>
              <td className="num sans" style={{ padding: "6px 8px", borderBottom: `0.5px solid ${theme.rule}`, color: theme.accent }}>{iss.n}</td>
              <td style={{ padding: "6px 8px", borderBottom: `0.5px solid ${theme.rule}` }}>{iss.h}</td>
              <td className="num soft" style={{ padding: "6px 8px", borderBottom: `0.5px solid ${theme.rule}`, textAlign: "right" }}>{iss.y2021}</td>
              <td className="num soft" style={{ padding: "6px 8px", borderBottom: `0.5px solid ${theme.rule}`, textAlign: "right" }}>{iss.y2022}</td>
              <td className="num soft" style={{ padding: "6px 8px", borderBottom: `0.5px solid ${theme.rule}`, textAlign: "right" }}>{iss.y2023}</td>
              <td className="num" style={{ padding: "6px 8px", borderBottom: `0.5px solid ${theme.rule}`, textAlign: "right" }}>{iss.y2024}</td>
              <td style={{ padding: "6px 8px", borderBottom: `0.5px solid ${theme.rule}`, fontStyle: "italic", color: theme.inkSoft, fontSize: d.size * 0.82 }}>{iss.fix}</td>
              <td className="sans" style={{ padding: "6px 8px", borderBottom: `0.5px solid ${theme.rule}`, textAlign: "right", fontSize: d.size * 0.78, color: iss.st === "Fixed" ? theme.accent : iss.st === "Open" ? theme.ink : theme.inkSoft, letterSpacing: ".04em", fontWeight: 600 }}>
                {iss.st === "Fixed" && <span style={{ marginRight: 4 }}>✓</span>}
                {iss.st === "Open" && <span style={{ marginRight: 4 }}>○</span>}
                {iss.st === "Routed" && <span style={{ marginRight: 4 }}>→</span>}
                {iss.st}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <p style={{ marginTop: d.gap * 1.4, fontStyle: "italic", color: theme.inkSoft, fontSize: d.size * 0.88 }}>
        Detailed walkthrough of the largest cohort (2024 · 1,064 files) lives in the <em>2024 Data</em> section. Academic literature underpinning the extraction and coding choices is collected in <em>References</em>.
      </p>
    </article>
  ); // end fallback return
}

// ─── Page: Data audit (per cohort) ──────────────────────────────────────────
function DataAuditA({ theme, d, fonts, audit, live }) {
  const a = audit;
  // Prefer live markdown fetched from GitHub; fall back to hardcoded constants.
  const liveMd = live?.audits?.[String(a.year)];
  if (liveMd) {
    return (
      <article style={{ maxWidth: "82ch", margin: "0 auto" }}>
        <MdSection md={liveMd} theme={theme} d={d} />
      </article>
    );
  }
  // ── Fallback: structured static data ────────────────────────────────────
  return (
    <article style={{ maxWidth: "82ch", margin: "0 auto" }}>
      <h2 style={{ marginBottom: d.gap }}>§ {a.title}</h2>
      <p style={{ fontStyle: "italic", color: theme.inkSoft, marginBottom: d.gap * 1.4 }}>
        {a.blurb} The full audit lives at <span className="mono" style={{ fontSize: d.size * 0.88 }}>audits/text_extraction_quality_audit_{a.year}.md</span>.
      </p>

      <div style={{ background: theme.paperAlt, padding: `${d.gap}px ${d.gap * 1.2}px`, borderLeft: `2px solid ${theme.accent}`, marginBottom: d.gap * 1.4, fontSize: d.size * 0.9 }}>
        {[
        ["Audit date", a.header.date],
        ["Total files", a.header.total],
        ["Subsample", a.header.subsample],
        ["Full-corpus scan", a.header.fullScan]].
        map(([k, v]) =>
        <div key={k} style={{ display: "grid", gridTemplateColumns: "140px 1fr", padding: "3px 0" }}>
            <span className="sans soft" style={{ fontSize: d.size * 0.78, letterSpacing: ".04em", textTransform: "uppercase" }}>{k}</span>
            <span>{v}</span>
          </div>
        )}
      </div>

      <h4 style={{ marginBottom: d.gap }}>Cohort composition · {a.year}</h4>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 80px", gap: 0, marginBottom: d.gap * 1.4 }}>
        {a.composition.map((row, i) =>
        <React.Fragment key={i}>
            {row.map((cell, j) =>
          <div key={j} className={j === 0 ? "" : "num"} style={{ padding: "6px 8px", borderBottom: `0.5px solid ${theme.rule}`, fontSize: d.size * 0.88, color: j === 3 ? theme.accent : theme.ink, fontStyle: j === 0 ? "italic" : "normal" }}>
                {cell}
              </div>
          )}
          </React.Fragment>
        )}
      </div>

      <h4 style={{ marginBottom: d.gap }}>Issue prevalence &amp; remediation</h4>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: d.gap * 1.4, fontSize: d.size * 0.88 }}>
        <thead>
          <tr>
            {["#", "Issue", "All", "_E", "Other", "2022", "Resolved via"].map((h, i) =>
            <th key={i} className="sans" style={{ textAlign: i < 2 ? "left" : "right", padding: "6px 8px", color: theme.inkSoft, fontSize: d.size * 0.72, letterSpacing: ".08em", textTransform: "uppercase", borderBottom: `1.5px solid ${theme.ink}`, fontWeight: 600 }}>{h}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {a.issues.map((iss) =>
          <tr key={iss.n}>
              <td className="num sans" style={{ padding: "6px 8px", borderBottom: `0.5px solid ${theme.rule}`, color: theme.accent }}>{iss.n}</td>
              <td style={{ padding: "6px 8px", borderBottom: `0.5px solid ${theme.rule}` }}>{iss.h}</td>
              <td className="num" style={{ padding: "6px 8px", borderBottom: `0.5px solid ${theme.rule}`, textAlign: "right" }}>{iss.pct}</td>
              <td className="num" style={{ padding: "6px 8px", borderBottom: `0.5px solid ${theme.rule}`, textAlign: "right" }}>{iss._E}</td>
              <td className="num" style={{ padding: "6px 8px", borderBottom: `0.5px solid ${theme.rule}`, textAlign: "right" }}>{iss._O}</td>
              <td className="num soft" style={{ padding: "6px 8px", borderBottom: `0.5px solid ${theme.rule}`, textAlign: "right" }}>{iss.baseline}</td>
              <td style={{ padding: "6px 8px", borderBottom: `0.5px solid ${theme.rule}`, fontStyle: "italic", color: theme.inkSoft, fontSize: d.size * 0.82 }}>{iss.fixed}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h4 style={{ marginBottom: d.gap }}>Five-stage pipeline applied</h4>
      <ol style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: d.gap * 1.4 }}>
        {a.pipeline.map((s) =>
        <li key={s.st} style={{ display: "grid", gridTemplateColumns: "40px 200px 1fr", gap: d.gap, padding: `${d.gap * 0.5}px 0`, borderBottom: `0.5px solid ${theme.rule}` }}>
            <span className="num sans" style={{ color: theme.accent }}>S{s.st}</span>
            <span style={{ fontStyle: "italic" }}>{s.n}</span>
            <span className="soft" style={{ fontSize: d.size * 0.9 }}>{s.res}</span>
          </li>
        )}
      </ol>

      <h4 style={{ marginBottom: d.gap }}>Acceptance — Checks A · B · C</h4>
      {a.checks.map((ch) =>
      <div key={ch.id} style={{ marginBottom: d.gap * 1.2, borderTop: `0.5px solid ${theme.rule}`, paddingTop: d.gap * 0.6 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
            <h3 style={{ marginBottom: 0 }}>
              <span className="sans" style={{ color: theme.accent, marginRight: 10, fontStyle: "normal", fontSize: d.size * 0.85, letterSpacing: ".08em" }}>CHECK&nbsp;{ch.id}</span>
              <span style={{ fontStyle: "italic" }}>{ch.h}</span>
            </h3>
            <span className="sans" style={{ fontSize: d.size * 0.78, color: theme.accent, letterSpacing: ".04em" }}>{ch.status}</span>
          </div>
          <div className="soft" style={{ fontSize: d.size * 0.85, marginBottom: 4 }}>{ch.tests}</div>
          <div className="mono soft" style={{ fontSize: d.size * 0.78, marginBottom: 6 }}>thresholds — {ch.thresh}</div>
          <div style={{ fontSize: d.size * 0.92 }}>{ch.result}</div>
        </div>
      )}

      <h4 style={{ marginBottom: d.gap }}>Hard exclusions &amp; corpus disposition</h4>
      <ul style={{ paddingLeft: d.gap * 1.2, margin: 0, marginBottom: d.gap * 1.4, fontSize: d.size * 0.92 }}>
        {a.exclusions.map((e, i) => <li key={i} style={{ marginBottom: 4 }}>{e}</li>)}
      </ul>

      <h4 style={{ marginBottom: d.gap }}>Referenced methods literature</h4>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {a.references.map((r, i) =>
        <li key={i} style={{ display: "grid", gridTemplateColumns: "16px 1fr", gap: 10, padding: "6px 0", borderBottom: `0.5px dotted ${theme.rule}`, fontSize: d.size * 0.88 }}>
            <span className="num accent">{i + 1}.</span>
            <span style={{ fontStyle: "italic" }}>{r}</span>
          </li>
        )}
      </ul>
    </article>
  ); // end fallback return
}

// ─── Page: References (full bibliography) ──────────────────────────────────
function ReferencesA({ theme, d, fonts }) {
  const sections = [
  { id: "theory", h: "Materiality theory", items: REFERENCES.theory },
  { id: "coding", h: "Coding instruments & disclosure indices", items: REFERENCES.coding },
  { id: "econometrics", h: "Identification & estimation", items: REFERENCES.econometrics },
  { id: "reliability", h: "Inter-rater reliability", items: REFERENCES.reliability },
  { id: "nlp", h: "NLP, embeddings & extraction tooling", items: REFERENCES.nlp },
  { id: "standards", h: "Standards & frameworks", items: REFERENCES.standards }];

  return (
    <article style={{ maxWidth: "80ch", margin: "0 auto" }}>
      <h2 style={{ marginBottom: d.gap }}>§ References</h2>
      <p style={{ fontStyle: "italic", color: theme.inkSoft, marginBottom: d.gap * 1.6 }}>
        Works cited or directly informing the design of the study, grouped by what they contribute. Citations follow author-date convention; full URLs are kept in the project bibliography database.
      </p>

      {sections.map((sec) =>
      <section key={sec.id} style={{ marginBottom: d.gap * 1.8 }}>
          <h4 style={{ marginBottom: d.gap }}>{sec.h}</h4>
          <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {sec.items.map((r, i) =>
          <li key={i} style={{ display: "grid", gridTemplateColumns: "1fr", padding: `${d.gap * 0.55}px 0`, borderBottom: i < sec.items.length - 1 ? `0.5px solid ${theme.rule}` : "none" }}>
                <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 22ch) 1fr", gap: d.gap, alignItems: "baseline" }}>
                  <span className="sans" style={{ fontSize: d.size * 0.9, color: theme.accent, letterSpacing: ".01em" }}>{r.c}</span>
                  <span style={{ fontSize: d.size * 0.95 }}>
                    <em>{r.v}</em>{" "}
                    <span className="soft" style={{ fontStyle: "normal" }}>{r.j}</span>
                  </span>
                </div>
              </li>
          )}
          </ol>
        </section>
      )}

      <section style={{ marginBottom: d.gap * 1.6 }}>
        <h4 style={{ marginBottom: d.gap }}>Pre-trained models in active use</h4>
        <p style={{ fontStyle: "italic", color: theme.inkSoft, fontSize: d.size * 0.9, marginBottom: d.gap }}>
          Models slotted into the NLP pipeline. Each is paired with a track — English (FinBERT-ESG-9 + ClimateBERT) or multilingual (Qwen3-Embedding + XLM-RoBERTa-XNLI) — according to the language routing in <span className="mono" style={{ fontSize: d.size * 0.85 }}>lang_routing_2024.csv</span>.
        </p>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: d.size * 0.85 }}>
          <thead>
            <tr>
              {["Model","Base","Languages","Scope","Best for","Source"].map((h, i) => (
                <th key={i} className="sans" style={{ textAlign: "left", padding: "6px 8px", color: theme.inkSoft, fontSize: d.size * 0.7, letterSpacing: ".08em", textTransform: "uppercase", borderBottom: `1.5px solid ${theme.ink}`, fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MODELS.map((m, i) => (
              <tr key={i}>
                <td style={{ padding: "6px 8px", borderBottom: `0.5px solid ${theme.rule}`, color: theme.accent, fontStyle: "italic" }}>{m.n}</td>
                <td className="mono soft" style={{ padding: "6px 8px", borderBottom: `0.5px solid ${theme.rule}`, fontSize: d.size * 0.78 }}>{m.base}</td>
                <td className="sans soft" style={{ padding: "6px 8px", borderBottom: `0.5px solid ${theme.rule}`, fontSize: d.size * 0.78 }}>{m.lang}</td>
                <td style={{ padding: "6px 8px", borderBottom: `0.5px solid ${theme.rule}` }}>{m.scope}</td>
                <td style={{ padding: "6px 8px", borderBottom: `0.5px solid ${theme.rule}`, color: theme.inkSoft, fontSize: d.size * 0.85 }}>{m.best}</td>
                <td className="mono" style={{ padding: "6px 8px", borderBottom: `0.5px solid ${theme.rule}`, fontSize: d.size * 0.78, color: theme.accent }}>{m.src}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: d.gap * 1.2 }}>
        <h4 style={{ marginBottom: d.gap }}>Tools &amp; software stack</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: `${d.gap * 0.3}px ${d.gap * 1.2}px`, fontSize: d.size * 0.88 }}>
          {REFERENCES.tools.map((t, i) =>
          <div key={i} style={{ padding: "4px 0", borderBottom: `0.5px dotted ${theme.rule}`, display: "grid", gridTemplateColumns: "20px 1fr", gap: 8 }}>
              <span className="num accent" style={{ fontSize: d.size * 0.78 }}>{String(i + 1).padStart(2, "0")}</span>
              <span>{t}</span>
            </div>
          )}
        </div>
      </section>
    </article>);

}

// ─── Page: Research log ────────────────────────────────────────────────────
function ResearchLogA({ theme, d, fonts, live }) {
  // live.log is fetched centrally by useLiveData() in App — no duplicate fetch needed.
  const sessions = React.useMemo(() => {
    if (live && live.log) {
      return live.log.map(s => ({
        d:      s.session_date,
        pass:   s.pass,
        agent:  s.agent,
        topic:  s.topic_slug,
        status: s.status === 'completed' ? 'complete' : s.status,
        k:      s.key_findings || [],
      }));
    }
    return RESEARCH_LOG.sessions;
  }, [live]);

  const statusColor = (st) => {
    if (st === "complete")    return theme.accent;
    if (st === "partial")     return theme.inkSoft;
    if (st === "blocked")     return theme.ink;
    if (st === "not started") return theme.inkSoft;
    return theme.inkSoft;
  };
  const statusGlyph = (st) => {
    if (st === "complete")    return "\u2713";
    if (st === "partial")     return "\u25d0";
    if (st === "blocked")     return "\u25cb";
    if (st === "not started") return "\u00b7";
    if (st === "plan issued") return "\u2192";
    return "\u00b7";
  };

  return (
    <article style={{ maxWidth: "82ch", margin: "0 auto" }}>
      <h2 style={{ marginBottom: d.gap }}>§ Research log</h2>
      <p style={{ fontStyle: "italic", color: theme.inkSoft, marginBottom: d.gap * 1.6 }}>
        A rolling record of inventory, what is in flight, and what blocks what. Drawn from <span className="mono" style={{ fontSize: d.size * 0.88 }}>research_log.json</span> (passes 1 – 8) and the per-pass findings under <span className="mono" style={{ fontSize: d.size * 0.88 }}>findings/</span>.
      </p>

      <h4 style={{ marginBottom: d.gap }}>Existing data inventory</h4>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0, marginBottom: d.gap * 1.8 }}>
        {RESEARCH_LOG.inventory.map((row, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "22px 1fr", gap: 10, padding: `${d.gap * 0.55}px 0`, borderBottom: `0.5px solid ${theme.rule}` }}>
            <span className="sans" style={{ color: statusColor(row.status), fontSize: d.size * 1.05, lineHeight: 1 }}>{statusGlyph(row.status)}</span>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: d.gap, marginBottom: 2, flexWrap: "wrap" }}>
                <span className="mono" style={{ fontSize: d.size * 0.92, color: theme.ink }}>{row.item}</span>
                <span className="sans" style={{ fontSize: d.size * 0.72, color: theme.accent, letterSpacing: ".06em", textTransform: "uppercase" }}>{row.status}</span>
              </div>
              <div className="soft" style={{ fontSize: d.size * 0.85 }}>{row.detail}</div>
            </div>
          </div>
        ))}
      </div>

      <h4 style={{ marginBottom: d.gap }}>In the pipeline · partial / blocked items</h4>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: d.gap * 1.8, fontSize: d.size * 0.85 }}>
        <thead>
          <tr>
            {["Item","Status","Coverage","Note"].map((h, i) => (
              <th key={i} className="sans" style={{ textAlign: "left", padding: "6px 8px", color: theme.inkSoft, fontSize: d.size * 0.7, letterSpacing: ".08em", textTransform: "uppercase", borderBottom: `1.5px solid ${theme.ink}`, fontWeight: 600 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {RESEARCH_LOG.pipeline.map((row, i) => (
            <tr key={i}>
              <td style={{ padding: "6px 8px", borderBottom: `0.5px solid ${theme.rule}`, fontStyle: "italic" }}>{row.item}</td>
              <td className="sans" style={{ padding: "6px 8px", borderBottom: `0.5px solid ${theme.rule}`, color: statusColor(row.status), fontSize: d.size * 0.78, letterSpacing: ".06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                <span style={{ marginRight: 4 }}>{statusGlyph(row.status)}</span>{row.status}
              </td>
              <td className="num" style={{ padding: "6px 8px", borderBottom: `0.5px solid ${theme.rule}`, fontSize: d.size * 0.85, color: theme.accent }}>{row.coverage}</td>
              <td style={{ padding: "6px 8px", borderBottom: `0.5px solid ${theme.rule}`, fontSize: d.size * 0.85, color: theme.inkSoft }}>{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 style={{ marginBottom: d.gap }}>Critical path</h4>
      <ol style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: d.gap * 1.8 }}>
        {RESEARCH_LOG.criticalPath.map((p, i) => (
          <li key={i} style={{ padding: `${d.gap * 0.5}px 0`, borderTop: `0.5px solid ${theme.rule}`, display: "grid", gridTemplateColumns: "26px 1fr", gap: d.gap }}>
            <span className="num sans" style={{ color: theme.accent, fontSize: d.size * 0.9 }}>{String(i + 1).padStart(2,"0")}</span>
            <span style={{ fontSize: d.size * 0.92 }}>{p}</span>
          </li>
        ))}
      </ol>

      <h4 style={{ marginBottom: d.gap }}>New variables added (pass 2 · {Object.values(RESEARCH_LOG.newVars).flat().length} fields)</h4>
      <div style={{ display: "grid", gridTemplateColumns: "70px 1fr", gap: `${d.gap * 0.5}px ${d.gap}`, marginBottom: d.gap * 1.8 }}>
        {Object.entries(RESEARCH_LOG.newVars).map(([blk, vars]) => (
          <React.Fragment key={blk}>
            <span className="sans" style={{ color: theme.accent, fontSize: d.size * 0.82, letterSpacing: ".08em", textTransform: "uppercase", paddingTop: 2 }}>Block&nbsp;{blk}</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {vars.map(v => (
                <span key={v} className="mono" style={{ fontSize: d.size * 0.78, padding: "2px 8px", border: `0.5px solid ${theme.rule}`, borderRadius: 3, color: theme.ink, background: theme.paperAlt }}>{v}</span>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>

      <h4 style={{ marginBottom: d.gap }}>Canonical-taxonomy updates</h4>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: d.gap * 1.8, fontSize: d.size * 0.88 }}>
        <thead>
          <tr>
            {["Code","Previous mapping","New mapping","Effective"].map((h, i) => (
              <th key={i} className="sans" style={{ textAlign: "left", padding: "6px 8px", color: theme.inkSoft, fontSize: d.size * 0.7, letterSpacing: ".08em", textTransform: "uppercase", borderBottom: `1.5px solid ${theme.ink}`, fontWeight: 600 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {RESEARCH_LOG.taxonomy.map((t) => (
            <tr key={t.code}>
              <td className="sans" style={{ padding: "6px 8px", borderBottom: `0.5px solid ${theme.rule}`, color: theme.accent, fontWeight: 600 }}>{t.code}</td>
              <td className="mono soft" style={{ padding: "6px 8px", borderBottom: `0.5px solid ${theme.rule}`, fontSize: d.size * 0.82 }}>{t.old_map}</td>
              <td className="mono" style={{ padding: "6px 8px", borderBottom: `0.5px solid ${theme.rule}`, fontSize: d.size * 0.82, color: theme.ink }}>{t.new_map}</td>
              <td className="sans" style={{ padding: "6px 8px", borderBottom: `0.5px solid ${theme.rule}`, color: theme.inkSoft, fontSize: d.size * 0.82, whiteSpace: "nowrap" }}>{t.eff}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 style={{ marginBottom: d.gap }}>Session log · {sessions.length} passes</h4>
      <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {sessions.map((s, i) => (
          <li key={i} style={{ display: "grid", gridTemplateColumns: "92px 60px 1fr", gap: d.gap, padding: `${d.gap * 0.6}px 0`, borderBottom: `0.5px solid ${theme.rule}` }}>
            <div>
              <div className="sans num" style={{ fontSize: d.size * 0.85, color: theme.accent }}>{s.d}</div>
              <div className="sans soft" style={{ fontSize: d.size * 0.72, letterSpacing: ".04em" }}>pass {s.pass}</div>
            </div>
            <div className="sans" style={{ fontSize: d.size * 0.72, color: theme.inkSoft, letterSpacing: ".04em", textTransform: "uppercase", paddingTop: 2 }}>
              <div style={{ marginBottom: 4 }}>{s.agent}</div>
              <div style={{ color: theme.accent, fontSize: d.size * 0.7 }}>{s.status}</div>
            </div>
            <div>
              <div style={{ fontStyle: "italic", marginBottom: 6 }}>{s.topic}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {s.k.map((kf, j) => (
                  <li key={j} style={{ display: "grid", gridTemplateColumns: "12px 1fr", gap: 6, fontSize: d.size * 0.85, color: theme.inkSoft, marginBottom: 2 }}>
                    <span className="accent">·</span>
                    <span>{kf}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
}

// ─── Page: News ────────────────────────────────────────────────────────────
function NewsA({ theme, d, fonts }) {
  return (
    <article style={{ maxWidth: "72ch", margin: "0 auto" }}>
      <h2 style={{ marginBottom: d.gap }}>§ News &amp; updates</h2>
      <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {CONTENT.news.map((n, i) =>
        <li key={i} style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: d.gap, padding: `${d.gap * 0.7}px 0`, borderBottom: i < CONTENT.news.length - 1 ? `0.5px solid ${theme.rule}` : "none" }}>
            <span className="sans num" style={{ fontSize: d.size * 0.85, color: theme.inkSoft }}>{n.d}</span>
            <span>{n.t}</span>
          </li>
        )}
      </ol>
    </article>);

}

Object.assign(window, { DirectionA });


// ── App ───────────────────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = {
  palette: "manuscript",
  fonts: "classic",
  density: "regular",
  statusStyle: "bar",
  sectionOrder: "standard",
};

function paletteOptionFor(key) {
  const p = PALETTES[key];
  return [p.accent, p.ink, p.paper, p.rule];
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [page, setPage] = React.useState("overview");
  const [tweaksOpen, setTweaksOpen] = React.useState(false);
  const live = useLiveData(); // fetch all three research files once on mount

  // Pre-load all font pairings so swaps are instant
  React.useEffect(() => {
    Object.keys(FONT_PAIRINGS).forEach(ensureFontImport);
  }, []);

  const toggleTweaks = () => {
    const type = tweaksOpen ? "__deactivate_edit_mode" : "__activate_edit_mode";
    window.postMessage({ type }, "*");
    setTweaksOpen(!tweaksOpen);
  };

  return (
    <React.Fragment>
      <div style={{ minHeight: "100vh" }}>
        <DirectionA tweak={t} page={page} setPage={setPage} live={live} />
      </div>

      {/* Toggle button */}
      <button
        onClick={toggleTweaks}
        title="Toggle display settings"
        aria-label="Toggle display settings"
        style={{
          position: "fixed",
          bottom: 16,
          right: tweaksOpen ? 316 : 16,
          zIndex: 2147483645,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          background: "rgba(41,38,27,0.82)",
          color: "#fff",
          fontSize: 15,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.22)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          transition: "right 0.2s",
        }}
      >
        ⚙
      </button>

      <TweaksPanel title="Display settings">
        <TweakSection label="Palette" />
        <TweakColor
          label="Palette"
          value={paletteOptionFor(t.palette)}
          options={Object.keys(PALETTES).map(paletteOptionFor)}
          onChange={(arr) => {
            const key = Object.keys(PALETTES).find(
              (k) =>
                JSON.stringify(paletteOptionFor(k)) === JSON.stringify(arr)
            );
            if (key) setTweak("palette", key);
          }}
        />

        <TweakSection label="Typography" />
        <TweakSelect
          label="Pairing"
          value={t.fonts}
          options={Object.entries(FONT_PAIRINGS).map(([k, v]) => ({
            value: k,
            label: v.name,
          }))}
          onChange={(v) => setTweak("fonts", v)}
        />

        <TweakSection label="Density" />
        <TweakRadio
          label="Density"
          value={t.density}
          options={["compact", "regular", "comfy"]}
          onChange={(v) => setTweak("density", v)}
        />

        <TweakSection label="Status indicator" />
        <TweakSelect
          label="Style"
          value={t.statusStyle}
          options={[
            { value: "dot",       label: "Dot · stage · %" },
            { value: "bar",       label: "Progress bar" },
            { value: "milestone", label: "Milestone track" },
            { value: "percent",   label: "Large percent" },
          ]}
          onChange={(v) => setTweak("statusStyle", v)}
        />

        <TweakSection label="Section ordering" />
        <TweakSelect
          label="Order"
          value={t.sectionOrder}
          options={[
            { value: "standard", label: "Standard (overview-first)" },
            { value: "findings", label: "Findings-first" },
            { value: "people",   label: "People-first" },
          ]}
          onChange={(v) => setTweak("sectionOrder", v)}
        />
      </TweaksPanel>
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

