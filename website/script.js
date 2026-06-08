// Materiality Mining — Research Project Site
// All application logic: content model, theme system, UI components, page renderers.
// Transpiled in-browser by Babel (loaded in index.html).

/* ── shared.jsx ──────────────────────────────────────────────────────────────────────── */
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
    "GRI 3: Material Topics (effective January 2023) re-defined how reporting firms should identify and prioritise material topics. This project asks whether the standard's roll-out changed the topics TWSE semiconductor firms and global peers designate material.",
    "We assemble a panel of company-year sustainability reports for the TWSE universe and global peers (2021–2024), apply a five-stage text-extraction pipeline to their Sustainability reports, and extract GRI content-index codes at scale via regex + manual concordance.",
    "Identification uses staggered difference-in-differences (Callaway & Sant'Anna 2021 as primary; Sun & Abraham 2021 and Borusyak, Jaravel & Spiess 2024 as robustness) on first-year GRI 3 adoption by firm.",
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
      p: "TWSE sustainability reports sourced from the ESGgenplus bulk download plus per-company IR pages for the remaining tickers. Global peers (TSMC, UMC, ASE, Nvidia, Qualcomm, Intel, Samsung, SK Hynix, Broadcom, Micron, Kioxia) sourced from company IR pages and the SASB database.",
    },
    {
      h: "Five-stage extraction pipeline",
      p: "(1) Scan detection on every PDF; (2) Tesseract LSTM OCR (chi_tra+eng / eng) on 49 fully or partially scanned files; (3) PyMuPDF coordinate-aware re-extraction with header/footer y-zone filtering; (4) Text preprocessing (repetition filter, dehyphenation, caption removal); (5) GRI code extraction via pdfplumber + fitz regex fallback.",
    },
    {
      h: "Topic coding (Block D)",
      p: "Paragraph-level dataset → language routing via fastText lid.176.bin → FinBERT-ESG-9-Categories on English; multilingual-e5-large-instruct + XLM-RoBERTa-XNLI zero-shot on bilingual segments. Concordance validation against canonical GRI 3 topic labels.",
    },
    {
      h: "Identification & estimation",
      p: "Goodman-Bacon decomposition first, to confirm a staggered DiD is appropriate. Primary: Callaway & Sant'Anna (2021) doubly-robust group-time ATT with not-yet-treated control. Robustness: Sun & Abraham (2021), Borusyak et al. (2024) imputation estimator.",
    },
    {
      h: "Coding framework for global comparison",
      p: "Block A (firmographics) for TWSE via TEJ; Compustat Global / Bloomberg for peers. Block B (report metadata) populated from preprocessing manifests. Block C (materiality process: 13 disclosure dimensions). Block D (topic counts, composition, GRI mapping). Block F (financial controls).",
    },
  ],
  findings: [
    {
      n: "F1",
      h: "TWSE English-language filing has risen sharply.",
      p: "The share of `_E` (English) filings in the TWSE corpus rises from 62% (2021) to 71% (2023), then settles at 64% (2024) as more smaller firms file in Mandarin only. This compositional shift reflects the 2025 universal filing mandate.",
    },
    {
      n: "F2",
      h: "GRI content-index density is growing.",
      p: "Average unique GRI codes per file rises from 37.5 (2021) → 67.2 (2022) → 70.4 (2023) → 78.2 (2024). The top 2024 file references 104 unique codes across 35 GRI Standards, consistent with deeper GRI 3 integration.",
    },
    {
      n: "F3",
      h: "Sidebar suppression is a load-bearing extraction trade-off.",
      p: "The x₀ < 16% sidebar filter removes ~97% of navigation-column noise from processed text but also strips narrow-column GRI index code cells. Median GRI code recovery in processed text is 92.2% (2024), down from 95% baseline on raw extraction.",
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
    { n: "academic-research/scripts/", d: "Pipeline scripts: scan_YYYY.py, ocr_batch_YYYY.py, pymupdf_batch_YYYY.py, gri_extract_YYYY.py, check_extraction_quality_YYYY.py, extract_block_c.py, merge_datasets.R.", lic: "MIT", status: "Active" },
    { n: "data/gri/gri_codes_summary_*.csv", d: "Authoritative GRI content-index codes extracted directly from source PDFs (pre-sidebar-filter). One CSV per cohort, 2021–2024.", lic: "CC-BY-4.0 + data-sharing agreement", status: "Active" },
    { n: "data/quality/", d: "Per-cohort extraction quality checks, preprocessing manifests, and Block C extraction outputs.", lic: "Internal", status: "Active" },
    { n: "Text extraction/extracted_text/YYYY_processed/", d: "Working NLP corpus, paragraph-level. 3,180 files across four cohorts after the five-stage pipeline. Release planned post-publication.", lic: "Restricted", status: "Active" },
    { n: "audits/", d: "Standalone text_extraction_quality_audit_YYYY.md for each cohort — see the 2024 Data tab for the latest cohort's full audit.", lic: "Internal", status: "Complete" },
    { n: "hypotheses/hypothesis-generation_did-hypotheses_2026-05-22.md", d: "Pre-registered DiD hypotheses (draft) covering topic count, composition shift, matrix-format change.", lic: "Internal", status: "Draft" },
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
  { y: "2022", total: 877, en: 389, en_pct: 44, gri_files: 535, gri_pct: 87.9, gri_codes: 35972, ocr: 11, avg_codes: 67.2, special: "263 English PDFs freshly extracted (no prior .txt); 2 partial scans." },
  { y: "2023", total: 744, en: 526, en_pct: 71, gri_files: 597, gri_pct: 84.2, gri_codes: 42044, ocr: 19, avg_codes: 70.4, special: "pdfplumber hangs on 2023 PDFs — fitz-only GRI regex used; HF [...]" },
  { y: "2024", total: 1064, en: 680, en_pct: 64, gri_files: 948, gri_pct: 92.2, gri_codes: 74108, ocr: 15, avg_codes: 78.2, special: "Largest cohort. pdfplumber + regex fallback. Hyphenation affects 57% of English files." },
];

// ─── useLiveData hook — fetches external JSON and markdown files ──────────────────────
function useLiveData() {
  const [live, setLive] = React.useState({ 
    summary: null, 
    methodology: null, 
    log: null, 
    audits: null,
    error: null
  });

  function fetchAll() {
    const BASE_URL = "https://raw.githubusercontent.com/ReinierK2026/Research-2026/main";
    
    Promise.all([
      // Fetch research log
      fetch(`${BASE_URL}/data/research_log.json`)
        .then(r => {
          if (!r.ok) throw new Error(`research_log.json: ${r.status}`);
          return r.json();
        })
        .catch(e => {
          console.error("Failed to load research_log.json:", e);
          return null;
        }),
      
      // Fetch 2024 audit
      fetch(`${BASE_URL}/data/text_extraction_quality_audit_2024.md`)
        .then(r => {
          if (!r.ok) throw new Error(`2024 audit: ${r.status}`);
          return r.text();
        })
        .catch(e => {
          console.error("Failed to load 2024 audit:", e);
          return null;
        }),
      
      // Fetch 2023 audit
      fetch(`${BASE_URL}/data/text_extraction_quality_audit_2023.md`)
        .then(r => {
          if (!r.ok) throw new Error(`2023 audit: ${r.status}`);
          return r.text();
        })
        .catch(e => {
          console.error("Failed to load 2023 audit:", e);
          return null;
        }),
      
      // Fetch 2022 audit
      fetch(`${BASE_URL}/data/text_extraction_quality_audit_2022.md`)
        .then(r => {
          if (!r.ok) throw new Error(`2022 audit: ${r.status}`);
          return r.text();
        })
        .catch(e => {
          console.error("Failed to load 2022 audit:", e);
          return null;
        }),
      
      // Fetch 2021 audit
      fetch(`${BASE_URL}/data/text_extraction_quality_audit_2021.md`)
        .then(r => {
          if (!r.ok) throw new Error(`2021 audit: ${r.status}`);
          return r.text();
        })
        .catch(e => {
          console.error("Failed to load 2021 audit:", e);
          return null;
        }),
    ]).then(([log, audit2024, audit2023, audit2022, audit2021]) => {
      setLive({
        summary: null,
        methodology: null,
        log: log,
        audits: {
          2024: audit2024,
          2023: audit2023,
          2022: audit2022,
          2021: audit2021,
        },
        error: null
      });
    }).catch(err => {
      console.error("Error fetching live data:", err);
      setLive(prev => ({ ...prev, error: err.message }));
    });
  }

  React.useEffect(() => {
    fetchAll();
  }, []);

  return live;
}

// ── Fonts: inject the chosen Google Fonts import on demand ────────────────
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

Object.assign(window, { CONTENT, COHORTS, useLiveData });

/* ── Tweaks and UI components ───────────────────────────────────────────────────────── */
// (skipped detailed tweaks code for brevity — full implementation follows)

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;max-height:calc(100vh - 32px);display:flex;flex-direction:column;background:rgba(250,249,247,.78);color:#29261b;-webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);border:.5px solid rgba(255,255,255,.6);border-radius:14px;box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;overflow-y:auto;overflow-x:hidden;min-height:0;scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;color:rgba(41,38,27,.72)}
  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
`;

function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null
      ? keyOrEdits : { [keyOrEdits]: val };
    setValues((prev) => ({ ...prev, ...edits }));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
    window.dispatchEvent(new CustomEvent('tweakchange', { detail: edits }));
  }, []);
  return [values, setTweak];
}

function TweaksPanel({ title = 'Tweaks', children }) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({ x: 16, y: 16 });

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

  if (!open) return null;
  return (
    <>
      <style>{__TWEAKS_STYLE}</style>
      <div ref={dragRef} className="twk-panel" style={{ right: offsetRef.current.x, bottom: offsetRef.current.y }}>
        <div className="twk-hd">
          <b>{title}</b>
          <button className="twk-x" aria-label="Close tweaks" onClick={dismiss}>✕</button>
        </div>
        <div className="twk-body">
          {children}
        </div>
      </div>
    </>
  );
}

function TweakSection({ label, children }) {
  return (
    <>
      <div style={{ fontSize: "10px", fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "rgba(41,38,27,.45)", padding: "10px 0 0" }}>{label}</div>
      {children}
    </>
  );
}

// ─── Direction A (main layout) ──────────────────────────────────────────────────────
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
    .pa h1 { font-size:${d.size * 2.4}px; line-height:1.1; letter-spacing:-0.01em; }
    .pa h2 { font-family:${fonts.sans}; font-size:${d.size * 0.78}px; font-weight:600; letter-spacing:.16em; text-transform:uppercase; color:${theme.inkSoft}; }
  `;

  const PAD = { padding: `${d.padY * 1.4}px ${d.padX * 2}px` };

  return (
    <div className="pa" data-screen-label={`A · ${page.toUpperCase()}`}>
      <style>{css}</style>
      <header style={{ ...PAD, paddingBottom: d.padY * 0.6, borderBottom: `1.5px solid ${theme.ink}` }}>
        <h1 style={{ marginBottom: 8 }}>{CONTENT.meta.title}</h1>
        <div style={{ fontStyle: "italic", fontSize: d.size * 1.05, color: theme.inkSoft, marginBottom: d.gap }}>
          {CONTENT.meta.subtitle}
        </div>
        <div className="sans" style={{ fontSize: d.size * 0.78, color: theme.ink, letterSpacing: ".02em" }}>
          {CONTENT.meta.pi} · <span style={{ color: theme.inkSoft }}>{CONTENT.meta.affiliation}</span>
        </div>
      </header>

      <nav style={{...PAD, paddingTop: d.padY * 0.6, paddingBottom: d.padY * 0.6, display: "flex", flexWrap: "wrap", gap: "10px 20px", borderBottom: `0.5px solid ${theme.rule}`}}>
        {order.map((id) => {
          const p = PAGES.find((x) => x.id === id);
          const active = page === id;
          return (
            <button key={id} className="pa-nav-link sans" onClick={() => setPage(id)}
            style={{background: "none", border: 0, padding: 0, font: "inherit", color: "inherit", cursor: "pointer", textAlign: "left", fontSize: d.size * 0.78, letterSpacing: ".06em", fontWeight: active ? 600 : 400, color: active ? theme.accent : theme.inkSoft, borderBottom: active ? `1.5px solid ${theme.accent}` : "1.5px solid transparent", paddingBottom: 4}}>
              {p.short}
            </button>);
        })}
      </nav>

      <main style={PAD}>
        {page === "overview" && <OverviewA theme={theme} d={d} fonts={fonts} tweak={tweak} live={live} />}
        {page === "status" && <StatusA theme={theme} d={d} fonts={fonts} tweak={tweak} live={live} />}
        {page === "methods" && <MethodsA theme={theme} d={d} fonts={fonts} live={live} />}
        {page === "findings" && <FindingsA theme={theme} d={d} fonts={fonts} live={live} />}
        {page === "publications" && <PublicationsA theme={theme} d={d} fonts={fonts} />}
        {page === "data" && <DataA theme={theme} d={d} fonts={fonts} live={live} />}
        {page === "data2024" && <DataAuditA theme={theme} d={d} fonts={fonts} year="2024" live={live} />}
        {page === "data2023" && <DataAuditA theme={theme} d={d} fonts={fonts} year="2023" live={live} />}
        {page === "data2022" && <DataAuditA theme={theme} d={d} fonts={fonts} year="2022" live={live} />}
        {page === "data2021" && <DataAuditA theme={theme} d={d} fonts={fonts} year="2021" live={live} />}
        {page === "researchlog" && <ResearchLogA theme={theme} d={d} fonts={fonts} live={live} />}
        {page === "references" && <ReferencesA theme={theme} d={d} fonts={fonts} />}
      </main>

      <footer style={{ ...PAD, paddingTop: d.padY * 0.7, borderTop: `0.5px solid ${theme.rule}`, color: theme.inkSoft }}>
        <div style={{ fontSize: d.size * 0.8 }}>
          <strong>Correspondence:</strong> {CONTENT.meta.pi} · {CONTENT.meta.affiliation}<br/>
          <a href={`mailto:${CONTENT.meta.email}`} style={{color: theme.accent, textDecoration: "none"}}>{CONTENT.meta.email}</a>
        </div>
      </footer>
    </div>);
}

// ─── Page components (simplified) ──────────────────────────────────────────────────
function OverviewA({ theme, d, fonts, tweak, live }) {
  return (
    <article style={{ maxWidth: "62ch" }}>
      <h2 style={{ marginBottom: d.gap }}>Project Overview</h2>
      {CONTENT.abstract.map((para, i) =>
      <p key={i} style={{ marginBottom: d.gap * 0.6 }}>{para}</p>
      )}
      <div style={{ marginTop: d.gap * 2, padding: `${d.gap}px`, background: theme.paperAlt, borderLeft: `2px solid ${theme.accent}` }}>
        <div className="sans" style={{ fontSize: d.size * 0.7, color: theme.inkSoft, letterSpacing: ".12em", marginBottom: 8 }}>
          STATUS AT A GLANCE
        </div>
        <StatusIndicator style={tweak.statusStyle} status={CONTENT.status} theme={theme} />
      </div>
    </article>);
}

function StatusA({ theme, d, fonts, tweak, live }) {
  return (
    <article style={{ maxWidth: "72ch" }}>
      <h2 style={{ marginBottom: d.gap }}>Project Status</h2>
      <StatusIndicator style="milestone" status={CONTENT.status} theme={theme} />
      <div style={{ marginTop: d.gap * 2, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: d.gap }}>
        {CONTENT.status.counts.map((c) =>
        <div key={c.k} style={{ borderBottom: `0.5px solid ${theme.rule}`, paddingBottom: 10 }}>
          <div className="sans" style={{ fontSize: d.size * 0.72, color: theme.inkSoft, letterSpacing: ".04em", textTransform: "uppercase", marginBottom: 4 }}>{c.k}</div>
          <div style={{ fontSize: d.size * 1.6, color: theme.ink, lineHeight: 1 }}>{c.v}</div>
        </div>
        )}
      </div>
    </article>);
}

function MethodsA({ theme, d, fonts, live }) {
  return (
    <article style={{ maxWidth: "62ch" }}>
      <h2 style={{ marginBottom: d.gap }}>Methods</h2>
      {CONTENT.methods.map((m, i) =>
      <section key={i} style={{ marginBottom: d.gap * 1.6 }}>
        <h3 style={{ marginBottom: 6 }}>{m.h}</h3>
        <p>{m.p}</p>
      </section>
      )}
    </article>);
}

function FindingsA({ theme, d, fonts, live }) {
  return (
    <article style={{ maxWidth: "78ch" }}>
      <h2 style={{ marginBottom: d.gap }}>Findings — Preliminary</h2>
      {CONTENT.findings.map((f, i) =>
      <section key={i} style={{ marginBottom: d.gap * 1.8 }}>
        <h3 style={{ marginBottom: 6 }}>{f.h}</h3>
        <p>{f.p}</p>
      </section>
      )}
    </article>);
}

function PublicationsA({ theme, d, fonts }) {
  return (
    <article style={{ maxWidth: "72ch" }}>
      <h2 style={{ marginBottom: d.gap }}>Publications &amp; Talks</h2>
      <ol style={{ listStyle: "none", padding: 0 }}>
        {CONTENT.publications.map((p, i) =>
        <li key={i} style={{ padding: `${d.gap}px 0`, borderBottom: `0.5px solid ${theme.rule}` }}>
          <div className="sans" style={{ fontSize: d.size * 0.72, color: theme.inkSoft }}>{p.kind} · {p.year}</div>
          <div>{p.cite}</div>
          <div className="sans" style={{ fontSize: d.size * 0.78, color: theme.accent, marginTop: 4 }}>{p.status}</div>
        </li>
        )}
      </ol>
    </article>);
}

function DataA({ theme, d, fonts, live }) {
  return (
    <article style={{ maxWidth: "78ch" }}>
      <h2 style={{ marginBottom: d.gap }}>Data &amp; Code</h2>
      <p style={{ fontStyle: "italic", color: theme.inkSoft, marginBottom: d.gap * 1.4 }}>
        Where possible, artefacts are released under open licences. The processed corpus remains restricted until publication.
      </p>
      <h4 style={{ marginBottom: d.gap }}>Corpus by cohort</h4>
      <div style={{ display: "grid", gridTemplateColumns: "60px repeat(5, 1fr)", gap: 0, marginBottom: d.gap * 1.4, fontSize: d.size * 0.85 }}>
        {["Year", "Files", "English %", "GRI files", "GRI codes", "Avg/file"].map((h, i) =>
        <div key={i} className="sans" style={{ fontSize: d.size * 0.72, color: theme.inkSoft, letterSpacing: ".08em", textTransform: "uppercase", padding: "6px 8px", borderBottom: `1.5px solid ${theme.rule}` }}>
          {h}
        </div>
        )}
        {COHORTS.map((c) =>
        <React.Fragment key={c.y}>
          <div className="num sans" style={{ padding: "8px", borderBottom: `0.5px solid ${theme.rule}`, color: theme.accent }}>{c.y}</div>
          <div className="num" style={{ padding: "8px", borderBottom: `0.5px solid ${theme.rule}` }}>{c.total.toLocaleString()}</div>
          <div className="num" style={{ padding: "8px", borderBottom: `0.5px solid ${theme.rule}` }}>{c.en_pct}%</div>
          <div className="num" style={{ padding: "8px", borderBottom: `0.5px solid ${theme.rule}` }}>{c.gri_files}</div>
          <div className="num" style={{ padding: "8px", borderBottom: `0.5px solid ${theme.rule}` }}>{c.gri_codes.toLocaleString()}</div>
          <div className="num" style={{ padding: "8px", borderBottom: `0.5px solid ${theme.rule}` }}>{c.avg_codes}</div>
        </React.Fragment>
        )}
      </div>
    </article>);
}

function DataAuditA({ theme, d, fonts, year, live }) {
  return (
    <article style={{ maxWidth: "82ch" }}>
      <h2 style={{ marginBottom: d.gap }}>Data Audit — {year}</h2>
      <p style={{ fontStyle: "italic", color: theme.inkSoft, marginBottom: d.gap }}>
        Detailed quality audit for the {year} cohort. Full audit documentation available in the repository.
      </p>
      {live?.audits?.[year] && (
        <div style={{ background: theme.paperAlt, padding: d.gap, borderRadius: 4, marginBottom: d.gap }}>
          <p style={{ color: theme.inkSoft, fontSize: d.size * 0.9 }}>Audit data loaded successfully. See repository for full documentation.</p>
        </div>
      )}
      {!live?.audits?.[year] && (
        <div style={{ background: theme.paperAlt, padding: d.gap, borderRadius: 4, marginBottom: d.gap, color: theme.inkSoft }}>
          <p>Loading audit data...</p>
        </div>
      )}
    </article>);
}

function ResearchLogA({ theme, d, fonts, live }) {
  return (
    <article style={{ maxWidth: "82ch" }}>
      <h2 style={{ marginBottom: d.gap }}>Research Log</h2>
      <p style={{ fontStyle: "italic", color: theme.inkSoft, marginBottom: d.gap }}>
        A rolling record of project progress, drawn from research_log.json.
      </p>
      {live?.log && (
        <div style={{ background: theme.paperAlt, padding: d.gap, borderRadius: 4 }}>
          <p style={{ color: theme.ink }}>Research log loaded: {live.log.length || 0} sessions recorded.</p>
        </div>
      )}
      {!live?.log && (
        <div style={{ background: theme.paperAlt, padding: d.gap, borderRadius: 4, color: theme.inkSoft }}>
          <p>Loading research log...</p>
        </div>
      )}
    </article>);
}

function ReferencesA({ theme, d, fonts }) {
  return (
    <article style={{ maxWidth: "80ch" }}>
      <h2 style={{ marginBottom: d.gap }}>References</h2>
      <p style={{ fontStyle: "italic", color: theme.inkSoft, marginBottom: d.gap }}>
        Works cited and resources informing the design of this project.
      </p>
    </article>);
}

Object.assign(window, { DirectionA, useLiveData });

// ─── Global configuration ──────────────────────────────────────────────────────────
const PAGES = [
  { id: "overview", short: "Overview", long: "Overview" },
  { id: "status", short: "Status", long: "Status" },
  { id: "methods", short: "Methods", long: "Methods" },
  { id: "findings", short: "Findings", long: "Findings" },
  { id: "publications", short: "Publications", long: "Publications" },
  { id: "data", short: "Data & Code", long: "Data & Code" },
  { id: "data2024", short: "2024 Data", long: "2024 Data Audit" },
  { id: "data2023", short: "2023 Data", long: "2023 Data Audit" },
  { id: "data2022", short: "2022 Data", long: "2022 Data Audit" },
  { id: "data2021", short: "2021 Data", long: "2021 Data Audit" },
  { id: "researchlog", short: "Research Log", long: "Research Log" },
  { id: "references", short: "References", long: "References" },
];

const SECTION_ORDERS = {
  standard: ["overview","status","methods","findings","publications","data","data2024","data2023","data2022","data2021","researchlog","references"],
};

const PALETTES = {
  manuscript: { name: "Manuscript", paper: "#f4efe6", paperAlt: "#ebe4d6", ink: "#1a1714", inkSoft: "#5c544a", rule: "#d8cdb8", accent: "#7a1f12", accentSoft: "#a64a3b" },
  slate: { name: "Slate", paper: "#f3f4f6", paperAlt: "#e6e8ec", ink: "#0f172a", inkSoft: "#475569", rule: "#cbd5df", accent: "#0e6e6e", accentSoft: "#3a8a8a" },
};

const FONT_PAIRINGS = {
  classic: {
    name: "Classic",
    serif: "'EB Garamond', 'Garamond', 'Times New Roman', serif",
    sans: "'Inter', 'Helvetica Neue', Arial, sans-serif",
    mono: "'IBM Plex Mono', 'Menlo', monospace",
    googleImport: "family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500",
  },
};

const DENSITY_SCALE = {
  compact: { padY: 18, padX: 28, line: 1.45, gap: 14, size: 14.5 },
  regular: { padY: 28, padX: 40, line: 1.6, gap: 20, size: 15.5 },
  comfy: { padY: 40, padX: 56, line: 1.75, gap: 28, size: 16.5 },
};

// ─── App entry point ──────────────────────────────────────────────────────────────────
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
  const live = useLiveData();

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

      <button
        onClick={toggleTweaks}
        title="Toggle display settings"
        aria-label="Toggle display settings"
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
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
        }}
      >
        ⚙
      </button>

      <TweaksPanel title="Display settings">
        <TweakSection label="Palette" />
        <TweakSection label="Typography" />
        <TweakSection label="Density" />
      </TweaksPanel>
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
