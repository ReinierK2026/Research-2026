// Materiality Mining — Research Project Site
// All application logic: content model, theme system, UI components, page renderers.
// Transpiled in-browser by Babel (loaded in index.html).

/* ── shared.jsx ──────────────────────────────────────────────────────────────────────── */

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
  },
  findings: [
    {
      n: "F1",
      h: "TWSE English-language filing has risen sharply.",
      p: "The share of English filings in the TWSE corpus rises from 62% (2021) to 71% (2023), reflecting the 2025 universal filing mandate.",
    },
    {
      n: "F2",
      h: "GRI content-index density is growing.",
      p: "Average unique GRI codes per file rises from 37.5 (2021) → 67.2 (2022) → 70.4 (2023) → 78.2 (2024).",
    },
    {
      n: "F3",
      h: "Sidebar suppression is a load-bearing extraction trade-off.",
      p: "The x₀ < 16% sidebar filter removes ~97% of navigation-column noise but also strips narrow-column GRI index code cells.",
    },
  ],
};

const COHORTS = [
  { y: "2021", total: 495, en: 307, en_pct: 62, gri_files: 342, gri_pct: 70.1, gri_codes: 12818, ocr: 4, avg_codes: 37.5 },
  { y: "2022", total: 877, en: 389, en_pct: 44, gri_files: 535, gri_pct: 87.9, gri_codes: 35972, ocr: 11, avg_codes: 67.2 },
  { y: "2023", total: 744, en: 526, en_pct: 71, gri_files: 597, gri_pct: 84.2, gri_codes: 42044, ocr: 19, avg_codes: 70.4 },
  { y: "2024", total: 1064, en: 680, en_pct: 64, gri_files: 948, gri_pct: 92.2, gri_codes: 74108, ocr: 15, avg_codes: 78.2 },
];

// ─── useLiveData hook — fetches external JSON and markdown files ──────────────────────
function useLiveData() {
  const [live, setLive] = React.useState({ 
    log: null, 
    audits: {},
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
      fetch(`${BASE_URL}/data/audits/text_extraction_quality_audit_2024.md`)
        .then(r => {
          if (!r.ok) throw new Error(`2024 audit: ${r.status}`);
          return r.text();
        })
        .catch(e => {
          console.error("Failed to load 2024 audit:", e);
          return null;
        }),
      
      // Fetch 2023 audit
      fetch(`${BASE_URL}/data/audits/text_extraction_quality_audit_2023.md`)
        .then(r => {
          if (!r.ok) throw new Error(`2023 audit: ${r.status}`);
          return r.text();
        })
        .catch(e => {
          console.error("Failed to load 2023 audit:", e);
          return null;
        }),
      
      // Fetch 2022 audit
      fetch(`${BASE_URL}/data/audits/text_extraction_quality_audit_2022.md`)
        .then(r => {
          if (!r.ok) throw new Error(`2022 audit: ${r.status}`);
          return r.text();
        })
        .catch(e => {
          console.error("Failed to load 2022 audit:", e);
          return null;
        }),
      
      // Fetch 2021 audit
      fetch(`${BASE_URL}/data/audits/text_extraction_quality_audit_2021.md`)
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
        log: log,
        audits: {
          2024: audit2024,
          2023: audit2023,
          2022: audit2022,
          2021: audit2021,
        },
        error: null
      });
      console.log("Live data loaded successfully");
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
        <text x="20" y="210" fill={theme.inkSoft} fontSize="10" fontFamily="ui-monospace, monospace">{label || "data ▢"}</text>
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
        <text x="20" y="210" fill={theme.inkSoft} fontSize="10" fontFamily="ui-monospace, monospace">{label || "matrix ▢"}</text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 600 220" width={width} height={height} style={{ display: "block" }}>
      <rect width="600" height="220" fill={theme.paperAlt}/>
      <text x="20" y="110" fill={theme.inkSoft} fontSize="10" fontFamily="ui-monospace, monospace">{label || "ridge ▢"}</text>
    </svg>
  );
}

Object.assign(window, { CONTENT, COHORTS, useLiveData });

// ─── Tweaks and UI ──────────────────────────────────────────────────────────────────
const __TWEAKS_STYLE = `.twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;max-height:calc(100vh - 32px);display:flex;flex-direction:column;background:rgba(250,249,247,.78);color:#29261b;backdrop-filter:blur(24px) saturate(160%);border:.5px solid rgba(255,255,255,.6);border-radius:14px;box-shadow:0 12px 40px rgba(0,0,0,.18);font:11.5px/1.4 system-ui,sans-serif;overflow:hidden}.twk-hd{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;cursor:move;user-select:none}.twk-hd b{font-size:12px;font-weight:600}.twk-x{border:0;background:0;color:rgba(41,38,27,.55);width:22px;height:22px;border-radius:6px;cursor:pointer;font-size:13px}.twk-body{padding:14px;overflow-y:auto;max-height:calc(100% - 40px)}`;

function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null
      ? keyOrEdits : { [keyOrEdits]: val };
    setValues((prev) => ({ ...prev, ...edits }));
  }, []);
  return [values, setTweak];
}

function TweaksPanel({ title = 'Tweaks', children }) {
  const [open, setOpen] = React.useState(false);
  if (!open) return null;
  return (
    <>
      <style>{__TWEAKS_STYLE}</style>
      <div className="twk-panel">
        <div className="twk-hd">
          <b>{title}</b>
          <button className="twk-x" onClick={() => setOpen(false)}>✕</button>
        </div>
        <div className="twk-body">{children}</div>
      </div>
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
    .pa { background:${theme.paper}; color:${theme.ink}; font-family:${fonts.serif}; font-size:${d.size + 1}px; line-height:${d.line}; }
    .pa h1 { font-size:${d.size * 2.4}px; line-height:1.1; margin:0 0 8px; }
    .pa h2 { font-size:${d.size * 0.78}px; font-weight:600; text-transform:uppercase; color:${theme.inkSoft}; margin:${d.gap}px 0 ${d.gap}px; }
    .pa p { margin:0; }
    .pa p + p { text-indent: 1.6em; margin-top: 0.5em; }
  `;

  const PAD = { padding: `${d.padY * 1.4}px ${d.padX * 2}px` };

  return (
    <div className="pa" style={{ minHeight: "100vh" }}>
      <style>{css}</style>
      <header style={{ ...PAD, paddingBottom: d.padY * 0.6, borderBottom: `1.5px solid ${theme.ink}` }}>
        <h1 style={{ marginBottom: 8 }}>{CONTENT.meta.title}</h1>
        <div style={{ fontStyle: "italic", fontSize: d.size * 1.05, color: theme.inkSoft, marginBottom: d.gap }}>
          {CONTENT.meta.subtitle}
        </div>
      </header>

      <nav style={{...PAD, paddingTop: d.padY * 0.6, paddingBottom: d.padY * 0.6, display: "flex", flexWrap: "wrap", gap: "10px 20px", borderBottom: `0.5px solid ${theme.rule}`}}>
        {order.map((id) => {
          const p = PAGES.find((x) => x.id === id);
          const active = page === id;
          return (
            <button key={id} onClick={() => setPage(id)}
            style={{background: "none", border: 0, padding: 0, font: "inherit", color: active ? theme.accent : theme.inkSoft, cursor: "pointer", fontSize: d.size * 0.78, fontWeight: active ? 600 : 400, borderBottom: active ? `1.5px solid ${theme.accent}` : "none", paddingBottom: 4}}>
              {p.short}
            </button>);
        })}
      </nav>

      <main style={PAD}>
        {page === "overview" && <OverviewA theme={theme} d={d} live={live} />}
        {page === "status" && <StatusA theme={theme} d={d} live={live} />}
        {page === "data2024" && <DataAuditA theme={theme} d={d} year="2024" live={live} />}
        {page === "data2023" && <DataAuditA theme={theme} d={d} year="2023" live={live} />}
        {page === "data2022" && <DataAuditA theme={theme} d={d} year="2022" live={live} />}
        {page === "data2021" && <DataAuditA theme={theme} d={d} year="2021" live={live} />}
        {!page && <div style={{color: theme.inkSoft}}>Loading...</div>}
      </main>

      <footer style={{ ...PAD, paddingTop: d.padY * 0.7, borderTop: `0.5px solid ${theme.rule}`, color: theme.inkSoft, fontSize: d.size * 0.8 }}>
        <strong>Last Updated:</strong> May 22, 2026 | <strong>PI:</strong> {CONTENT.meta.pi}
      </footer>
    </div>);
}

// ─── Page components ──────────────────────────────────────────────────────────────────
function OverviewA({ theme, d, live }) {
  return (
    <article style={{ maxWidth: "62ch" }}>
      <h2>Project Overview</h2>
      {CONTENT.abstract.map((para, i) =>
      <p key={i} style={{ marginBottom: d.gap * 0.6 }}>{para}</p>
      )}
      <div style={{ marginTop: d.gap * 2, padding: `${d.gap}px`, background: theme.paperAlt, borderLeft: `2px solid ${theme.accent}` }}>
        <div style={{ fontSize: d.size * 0.7, color: theme.inkSoft, marginBottom: 8 }}>STATUS</div>
        <StatusIndicator style="bar" status={CONTENT.status} theme={theme} />
      </div>
    </article>);
}

function StatusA({ theme, d, live }) {
  return (
    <article style={{ maxWidth: "72ch" }}>
      <h2>Project Status</h2>
      <StatusIndicator style="milestone" status={CONTENT.status} theme={theme} />
      <div style={{ marginTop: d.gap * 2, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: d.gap }}>
        {CONTENT.status.counts.map((c) =>
        <div key={c.k} style={{ borderBottom: `0.5px solid ${theme.rule}`, paddingBottom: 10 }}>
          <div style={{ fontSize: d.size * 0.72, color: theme.inkSoft, textTransform: "uppercase", marginBottom: 4 }}>{c.k}</div>
          <div style={{ fontSize: d.size * 1.6, color: theme.ink }}>{c.v}</div>
          {c.of && <div style={{ fontSize: d.size * 0.78, color: theme.inkSoft }}>{c.of}</div>}
        </div>
        )}
      </div>
    </article>);
}

function DataAuditA({ theme, d, year, live }) {
  const audit = live?.audits?.[year];
  return (
    <article style={{ maxWidth: "82ch" }}>
      <h2>Data Audit — {year}</h2>
      {audit && (
        <div style={{ background: theme.paperAlt, padding: d.gap, borderRadius: 4, marginBottom: d.gap, fontSize: d.size * 0.9, color: theme.ink }}>
          ✓ Audit data loaded ({Math.round(audit.length / 1000)}KB)
        </div>
      )}
      {!audit && (
        <div style={{ background: theme.paperAlt, padding: d.gap, borderRadius: 4, marginBottom: d.gap, color: theme.inkSoft }}>
          Loading audit for {year}...
        </div>
      )}
    </article>);
}

Object.assign(window, { DirectionA });

// ─── Global configuration ──────────────────────────────────────────────────────────
const PAGES = [
  { id: "overview", short: "Overview" },
  { id: "status", short: "Status" },
  { id: "data2024", short: "2024 Data" },
  { id: "data2023", short: "2023 Data" },
  { id: "data2022", short: "2022 Data" },
  { id: "data2021", short: "2021 Data" },
];

const SECTION_ORDERS = {
  standard: ["overview","status","data2024","data2023","data2022","data2021"],
};

const PALETTES = {
  manuscript: { name: "Manuscript", paper: "#f4efe6", paperAlt: "#ebe4d6", ink: "#1a1714", inkSoft: "#5c544a", rule: "#d8cdb8", accent: "#7a1f12", accentSoft: "#a64a3b" },
};

const FONT_PAIRINGS = {
  classic: {
    name: "Classic",
    serif: "'EB Garamond', serif",
    sans: "'Inter', sans-serif",
    mono: "'IBM Plex Mono', monospace",
    googleImport: "family=EB+Garamond:wght@400;500;600&family=Inter:wght@400;500;600",
  },
};

const DENSITY_SCALE = {
  regular: { padY: 28, padX: 40, line: 1.6, gap: 20, size: 15.5 },
};

// ─── App entry point ──────────────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = {
  palette: "manuscript",
  fonts: "classic",
  density: "regular",
  statusStyle: "bar",
  sectionOrder: "standard",
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [page, setPage] = React.useState("overview");
  const live = useLiveData();

  console.log("App mounted. Live data:", live);

  return (
    <>
      <DirectionA tweak={t} page={page} setPage={setPage} live={live} />
      <TweaksPanel title="Settings" />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
