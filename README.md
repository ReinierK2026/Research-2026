# Research-2026: GRI and Materiality Related Research

A live research dashboard tracking regulatory updates, NLP pipeline development, and empirical analysis of sustainability reporting standards adoption in TWSE.

## 🎯 Project Overview

This repository contains:
- **Live research log**: `data/research_log.json` (updated automatically via Claude Scripts)
- **Interactive dashboard**: `website/` (hosted on GitHub Pages)
- **Research findings**: Documentation of agents, methodologies, and key discoveries
- **Data pipeline**: TWSE sustainability reporting corpus with an extensive number of company-year observations

## 📊 Current Status

- **Project Phase**: Data Collection (48% complete)
- **Target Completion**: Q3 2026
- **Reports Processed**: 3,180 TWSE sustainability reports
- **GRI Code Instances**: 194,168 (2021–2024)

## 🚀 Live Dashboard

**Access the live dashboard**: https://ReinierK2026.github.io/Research-2026/

The dashboard auto-updates everytime any of the files in the 'Data' folder is updated. 

## 📁 Repository Structure

```
Research-2026/
├── data/
│   └── research_log.json                        # Live research session log
│ └──data/audit
|   └── text_extraction_quality_audit_2021.md    # Audit quality assessment of the 2021 data
|   └── text_extraction_quality_audit_2022.md    # Audit quality assessment of the 2022 data
|   └── text_extraction_quality_audit_2023.md    # Audit quality assessment of the 2023 data
|   └── text_extraction_quality_audit_2024.md    # Audit quality assessment of the 2024 data
│ └──data/quality
|   └── extraction_quality_check_2024.md         # Quality checks
|   └── extraction_quality_check_2022.md         # Quality checks
|   └── extraction_quality_check_2021.md         # Quality checks
├── website/
│   ├── index.html                               # Dashboard homepage
│   ├── style.css                                # Responsive styling
│   └── script.js                                # Dynamic data rendering
├── findings/                                    # Research outputs and documentation
├── gaps/                                        # Gap analysis reports
├── reports/                                     # Research summary
├── skills/                                      # Researcher skills used in this research project
├── scripts/                                     # Detailed scripts run by the research agents
├── hypothesis/                                  # Hypothesis generation files
├── Materiality_Research_Methodology.md          # Complete methodology file including research questions, methodology to adress them and data to collect
├── Definitions                                  # Complete list of all definitions used in the research
└── README.md                                    # This file
```

## 📝 How to Update the Dashboard

1. **Dashboard auto-updates** (via GitHub Pages) within seconds ✅

### Manual Update

Or push files directly via GitHub web interface:
1. Go to `data/research_log.json`
2. Click ✏️ Edit
3. Update the JSON
4. Commit changes

## 📋 Research Log Schema

Each session entry should include:

```json
{
  "session_date": "2026-05-22",
  "pass": 1,
  "agent": "web-researcher|academic-researcher|data-analyst|technical-researcher|research-gap-analysis|research-coordinator|hypothesis-generation",
  "topic_slug": "kebab-case-topic",
  "status": "completed|in-progress|plan-issued",
  "key_findings": ["Finding 1", "Finding 2", "..."],
  "sections_updated": ["S1", "S2"],
  "output_file": "findings/output-filename.md",
  "sources_consulted": ["Source 1", "Source 2"],
  "notes": "Optional context"
}
```

## 🎬 Agent Types

The dashboard recognizes these research agents:

| Agent | Emoji | Role |
|-------|-------|------|
| web-researcher | 🌐 | Regulatory updates, standards tracking |
| academic-researcher | 🎓 | Literature review, methods |
| data-analyst | 📊 | Data extraction, variable creation |
| technical-researcher | ⚙️ | NLP pipeline, model selection |
| research-gap-analysis | 🔍 | Gap identification, prioritization |
| research-coordinator | 📋 | Project coordination, task planning, research summation |
| hypothesis-generation | 💡 | Hypothesis development, estimation strategy |

## 🔧 GitHub Pages Setup

To enable the live dashboard:

1. Go to **Settings → Pages**
2. Source: `Deploy from a branch`
3. Branch: `main` | Folder: `/website`
4. Click **Save**

Your dashboard will be live at: `https://ReinierK2026.github.io/Research-2026/`

## 📊 Dashboard Features

- ✅ **Real-time updates**: Auto-refreshes every 30 seconds
- ✅ **Project status tracking**: Progress bar and phase indicators
- ✅ **Key metrics**: Reports processed, GRI codes extracted, etc.
- ✅ **Recent sessions**: Last 6 unique research sessions with findings
- ✅ **Agent activity**: Counts by research agent
- ✅ **Upcoming milestones**: Q2–Q1 2027 timeline
- ✅ **Responsive design**: Works on desktop, tablet, mobile
- ✅ **Dark mode support**: Auto-detects system preference

## 🔒 Data Privacy

- Repository is **public** (visible to all)
- Research log contains public research findings only
- Sensitive data (raw reports, credentials) excluded
- Dashboard accessible only via direct URL

## 📞 Support

For issues or questions:
1. Check existing GitHub Issues
2. Review `findings/` for detailed documentation
3. Consult the original research notebooks

## 📄 License

Research findings are provided as-is. See individual output files for specific licensing.

---

**Last Updated**: 2026-05-22  
**Maintained by**: ReinierK2026  
**Repository**: https://github.com/ReinierK2026/Research-2026
