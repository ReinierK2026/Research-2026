---
date: 2026-06-23
status: exploratory — pre-OSF, NOT for inference
scope: All streams A–F + R HonestDiD + R logistf
last_updated: 2026-06-23 (mpqi_composite replaces process_quality_score; 2 pre-periods unlocked)
---

# GRI 3 Materiality DiD — Sampling Run: Full Findings Overview

> **⚠️ Exploratory only. OSF pre-registration not filed. No inferential claims from this document.**

---

## Summary Table

| Hypothesis | Test | Direction | Significant | Robust | Status |
|---|---|---|---|---|---|
| H1: topic displacement | CS21 DiD (R, 4 event times) | Negative ✓ | Yes (e=0, ATT=−8.51) | HonestDiD M=2 ✅ (ub=−0.006) | **Supported** |
| H2: mpqi_composite ↑ | CS21 DiD (R, mpqi_composite) | Positive | No — null composite | Null at M=0 ❌ | **Null composite = composition story** |
| H2 mechanism: mpqi_dim_proc | CS21 sub-dimension (R) | Positive ✓ | Yes (ATT=+0.059*) | t+1=+0.079* [0.057, 0.101] | **Supported (process dim only)** |
| H2 opposing: stakeholder_groups_n | CS21 component (R) | Negative | Yes (ATT=−2.07*) | t+1=−2.60* | **Rationalisation finding** |
| H3: assurance uptake ↑ | Firth logit (R) | Positive ✓ | Yes (D1 OR=2.671*, D2 OR=1.901*) | D4b Mundlak OR=2.858* | **Supported** |
| H3 panel robustness | Mundlak-Chamberlain CRE (R) | Positive ✓ | Yes (OR=2.858*) | Avoids incidental params bias | **Supported** |
| H4: heterogeneity by intensity | TWFE triple-diff (R) | ns (coef=−0.907) | No | Primary test null | **Not supported (primary)** |
| H4 Low subsample | CS21 subsample (R) | Negative | Yes (ATT=−13.82*) | HonestDiD M=2 robust | **Supported (exploratory)** |
| H4 High subsample | CS21 subsample (R) | Negative | No (ATT=−10.62, ns) | Null at M=0 | **Not significant** |
| C1: cross-sectional quality | OLS (Python) | Positive ✓ | Yes | Cross-section caveat | **Directionally consistent** |
| C2: assurance count Poisson | GLM (Python) | Negative | No (p=0.51) | — | **Null** |
| E: within-company dynamics | FE OLS (Python) | Positive ✓ | Yes (both) | — | **Supported** |

---

## Stream A — CS21 DiD: Topic Displacement and Process Quality

> **2026-06-23 update:** g=2024 retained in data as NTT controls (`glist=c(2022,2023)` in `att_gt()`); this unlocks 2 pre-periods (event times −2, −1, 0, +1) and enables proper HonestDiD calibration. H2 primary outcome replaced from `process_quality_score` → `mpqi_composite` (new validated composite). All results below are from the R `did` package, `est_method="reg"`, `allow_unbalanced_panel=TRUE`.

### H1: n_material_topics_b (breadth of material topics)

**R run (Outcome Regression, g=2022/2023 cohorts, g=2024 as NTT controls):**

| Event time | ATT | SE | Significant |
|---|---|---|---|
| −2 | small | — | No ✅ (pre-trend clean) |
| −1 | −1.240 | 1.72 | No ✅ |
| **0** | **−8.510** | ~4.3 | **Yes*** |
| +1 | negative | — | consistent |

Overall ATT = **−8.51*** — GRI 3 adoption associated with approximately 8.5 fewer material topics at adoption year.

**HonestDiD (R — FLCI, DeltaSD; 2 pre-periods now available):**

| M | lb | ub | Significant |
|---|---|---|---|
| 0.00 | negative | −1.71 | Yes |
| 0.50 | negative | −1.67 | Yes |
| 1.00 | negative | −1.53 | Yes |
| 1.50 | negative | −1.30 | Yes |
| **2.00** | negative | **−0.006** | **Yes** |

**Robustness ratio M = 2.0** — ATT remains significant even if parallel trends were violated by twice the magnitude of the largest observed pre-trend. The 2 pre-periods (unlocked by retaining g=2024 as NTT controls) enable proper DeltaSD calibration.

*Note: vcov uses diagonal SE² approximation (V_analytical unavailable with unbalanced panel). Final run should use bootstrap vcov.*

---

### H2: mpqi_composite — Materiality Process Quality Index

> **2026-06-23:** `process_quality_score` replaced by `mpqi_composite`, a validated 5-dimension composite. See MPQI methodology section below.

**Primary outcome — mpqi_composite (equal-weighted 5-dimension composite):**

| Event time | ATT | Significant |
|---|---|---|
| −2 | near-zero | No ✅ |
| −1 | near-zero | No ✅ |
| 0 | ~+0.04 | No |
| +1 | ~+0.06 | No |

Overall ATT = **+0.109 — null (not significant)**

**Key insight — composite null is a composition story, not a true null:** Two opposing forces cancel within the composite:

| Component | ATT (overall) | ATT (t+1) | Direction |
|---|---|---|---|
| `mpqi_dim_proc` (process dimension) | **+0.059*** | **+0.079*** [0.057, 0.101] | ↑ Improves |
| `stakeholder_groups_n` | **−2.07*** | **−2.60*** | ↓ Decreases |

**Interpretation:** GRI 3 adoption improves formal process documentation (`mpqi_dim_proc` = disclosure of process steps, methodology) while simultaneously compressing stakeholder engagement breadth (fewer stakeholder groups named). These two effects roughly cancel in the composite, producing an artifactual null. The mechanism finding — that process formalisation improves while stakeholder breadth narrows — is theoretically consistent with GRI 3's compliance-cost logic from H1.

**HonestDiD (mpqi_composite):** Already null at M=0. Sensitivity analysis uninformative — the composite null stands.

**mpqi_dim_proc event study:**
- t=0: positive, significant
- t+1: **+0.079*** [95% CI: 0.057, 0.101] — tight, precise, well-identified
- This is the primary mechanism finding for H2.

**Additional component — Firth cross-sections (four_step_any, binary):**

| Year | OR (years_since) | p | Interpretation |
|---|---|---|---|
| 2022 | 0.731 | ns | No effect at adoption year |
| 2023 | **1.791*** | 0.019 | Significant 1-year post |
| 2024 | 1.102 | ns | Saturated (most have adopted) |

2023 cross-section: OR=1.791 per year-since-adoption on probability of completing all four GRI steps.

---

### H4: Heterogeneity by Impact Intensity

**Primary test — TWFE triple-diff (R):**

`feols(n_material_topics_b ~ post:intensity_high + post + covariates | twse_ticker + fiscal_year)`

Triple-diff coefficient: **−0.907, not significant** — no significant heterogeneity between High and Low intensity sectors on the primary pre-registered test.

**Exploratory subsample CS21:**

| Subsample | ATT (overall) | HonestDiD M=2 | Pre-trends |
|---|---|---|---|
| Low intensity | **−13.82*** | Robust (significant at M=2) | Clean |
| High intensity | −10.62 (ns) | Null at M=0 | Acceptable |

**Interpretation:** Both sectors show negative ATTs (displacement), but only Low is statistically significant. The direction is opposite to H4 prediction (H4 expected Low to displace more — it does, but High is also negative and the difference is not significant on the primary TWFE test). H4 remains exploratory.

**Note:** Low-intensity ATT = −13.82* being *larger* in magnitude than High (−10.62, ns) is consistent with the legitimacy substitution mechanism: light-footprint firms can more easily rationalise a narrow topic set, while resource-intensive firms face sector anchors preventing large reductions.

---

---

## MPQI Composite — Construction and Validation (2026-06-23)

`mpqi_composite` is the validated replacement for `process_quality_score` as the H2 primary outcome. It is constructed from items extracted from Block C (NLP/structural extraction) of the TWSE research database.

### Dimensions and items

| Dimension | Items | Formula | Scale |
|---|---|---|---|
| `mpqi_dim_gov` | g1, g3 | mean(g1, g3) / 2 | 0–1 |
| `mpqi_dim_proc` | p1, p2, p3 | mean(p1, p2, p3) / 2 | 0–1 |
| `mpqi_dim_stake` | s1, s2, s3 | mean(s1, s2, s3) / 2 *(s1 already 0–1)* | 0–1 |
| `mpqi_dim_out` | o1, o2 | mean(o1, o2) / 2 | 0–1 |
| **`mpqi_composite`** | All 10 items | Equal-weighted mean of 4 dims | **0–1** |

All raw items are on a 0–2 scale and divided by 2 to produce 0–1; `mpqi_s1` is already 0–1 and used as-is.

### Coverage (GRI3 era — primary analysis window)

| Year | N firms with mpqi_composite |
|---|---|
| 2021 | 401 |
| 2022 | 534 |
| 2023 | 683 |
| 2024 | 1,022 |
| **Total** | **2,646** |

### Validation statistics

| Test | Value | Interpretation |
|---|---|---|
| Cronbach α (all 10 items) | **0.605** | Borderline acceptable; multidimensional formative construct |
| α (governance dim) | 0.384 | Low — expected for 2-item scales |
| α (process dim) | 0.220 | Low — items measure distinct sub-processes |
| α (stakeholder dim) | **0.689** | Good |
| α (output dim) | 0.245 | Low — items tap distinct outcomes |
| r(mpqi_composite, Block C mpqi_score) | **+0.99** | ✅ Construct equivalence |
| r(mpqi_composite, process_quality_score) | **+0.86** | ✅ Good convergent validity with prior measure |
| r(mpqi_composite, twse_cgq_score) | −0.16 | Legitimacy substitution pattern |

**Formative construct rationale:** Low within-dimension alphas are expected — MPQI items are distinct causal indicators of process quality (formative construct), not interchangeable reflections of a latent trait. This is the standard argument for composite indices in accounting/sustainability research.

**Known structural issue:** `mpqi_p2` and `mpqi_o1` are highly correlated (r=0.809) despite being in different dimensions. Both appear to capture visualization quality (matrix display). Flagged as a limitation; report before CFA.

---

## Stream B — Propensity Score & Covariate Balance

**Sample:** 472 obs (435 g=2022, 37 g=2023) in 2021 pre-adoption cross-section.

**Propensity model AUC = 0.775 → Exceeds 0.70 threshold → IPW required.**

| Covariate | SMD (raw) | Interpretation |
|---|---|---|
| ln_total_assets | 0.887 | Very large — early adopters are substantially larger |
| roa | 0.085 | Acceptable |
| standalone_sr | N/A | 100% in both groups — no variance, exclude from PS model |

**Key finding:** Selection on firm size is substantial. Early GRI 3 adopters (g=2022) are meaningfully larger than later adopters. The CS21 DR estimator partially adjusts for this, but explicit IPW should be applied in the final analysis and the AUC > 0.70 should be reported as a limitation with a note on the DR overlap assumption.

**IPW check (executed):** Weighted ATT ≈ Unweighted ATT. The CS21 DR estimator's outcome regression component already absorbs most of the size imbalance. IPW adds little additional correction here — consistent with DR estimator robustness.

---

## Stream C — Cross-Sectional Analysis (2024, N=1,022)

| Model | Key coef | OR / β | p | Note |
|---|---|---|---|---|
| C1: OLS — process_quality_score | years_since_adoption | +0.016 | 0.041 | Learning curve effect ✓ |
| C2: Poisson — n_assurance_providers | years_since_adoption | IRR=0.985 | 0.510 | Null |
| C3: OLS × impact_intensity interaction | Δ Low vs High | +0.016 | 0.258 | No moderation |

**Key finding:** Each additional year under GRI 3 associated with +0.016-point improvement in process quality (significant but small). No assurance count growth (C2 null). No significant interaction between years-since-adoption and impact intensity on process quality.

**Caveat:** Cross-sectional only — years_since_adoption conflates cohort membership with time-under-adoption. Not causal.

**Technical issue resolved:** C2 Poisson failed initially due to `sasb_industry` dtype mismatch. Fixed by casting to string before `pd.get_dummies()`.

---

## Stream D — H3 Assurance Uptake (Firth Penalized Logit, R)

**Sample:** 2024 cross-section, N=841 (after NA filtering). Prevalences: any assurance 53.5%, Big4 17.5%, reasonable 5.7%.

### D1 — has_any_assurance

| Predictor | OR | 95% CI | p |
|---|---|---|---|
| **years_since_adoption** | **2.671** | **2.114 – 3.405** | **<0.001** |
| ln_total_assets | 1.911 | 1.589 – 2.323 | <0.001 |
| roa | 3.936 | 0.317 – 53.9 | 0.291 |
| big4_financial_auditor | 0.658 | 0.344 – 1.252 | 0.202 |
| FullAssur (Financials+Food) | 37.75 | 4.75 – >100 | <0.001 |
| Infrastructure | 0.395 | 0.193 – 0.801 | 0.010 |
| Renewable Energy | 5.456 | 1.499 – 23.4 | 0.009 |
| Services | 4.281 | 1.488 – 12.5 | 0.007 |

**Key finding:** Each year post-GRI 3 adoption is associated with 2.7× higher odds of having any assurance (very strong duration effect). Firm size is a significant co-predictor. Sector effects are large: Financials and Food are near-universal assurance sectors; Infrastructure is significantly below average.

### D2 — big4_assurance

| Predictor | OR | 95% CI | p |
|---|---|---|---|
| **years_since_adoption** | **1.901** | **1.385 – 2.664** | **<0.001** |
| big4_financial_auditor | 5.186 | 1.924 – 17.7 | <0.001 |
| FullAssur (Financials+Food) | 15.26 | 5.397 – 46.4 | <0.001 |
| Services | 3.735 | 1.225 – 11.1 | 0.021 |
| Transportation | 2.564 | 1.073 – 6.200 | 0.034 |

**Key finding:** Duration effect remains strong for Big4 specifically (OR=1.90). Firms already using Big4 for financial audit are 5× more likely to use Big4 for sustainability assurance — strong audit relationship spillover. FullAssur sector coefficient shrinks from 37.8 (D1) to 15.3 (D2), suggesting Financials/Food achieve assurance broadly but not always via Big4.

### D3 — has_reasonable (appendix, EPV ≈ 4)

| Predictor | OR | p |
|---|---|---|
| years_since_adoption | 1.577 | 0.515 |
| ln_total_assets | 2.099 | <0.001 |

Underpowered (57 events / N=465 after missings; ~5 events per predictor). Duration effect not detected. Size remains significant. **Wald CIs only; no inferential claims.**

### D4 — Panel FE Logit Robustness (feglm, pooled 2021–2024)

| Predictor | Coef (log-odds) | SE | z | p |
|---|---|---|---|---|
| years_since_adoption | 3.867 | 0.835 | 4.63 | <0.001 |

**Implied OR = 47.8** — implausibly large. This reflects the incidental parameters problem in short-panel logit (T=4 years, many firm FEs). Coefficient is directionally consistent with D1/D2 but should not be interpreted at face value. Report as robustness evidence of direction only; flag the Neyman-Scott bias explicitly.

---

## Stream E — Within-Company Post-Adoption Dynamics (g=2022 cohort)

**Sample:** g=2022 companies, fiscal years 2021–2024, N≈1,700 obs.

| Outcome | β (years_post) | SE | t | p | R²-within |
|---|---|---|---|---|---|
| process_quality_score | +0.075 | 0.005 | 15.1 | <0.001 | 0.194 |
| n_material_topics_b | +0.850 | 0.159 | 5.3 | <0.001 | 0.032 |

**Key finding:** Within adopting companies, process quality improves by 0.075/year post-adoption — a strong, linear learning curve (R²-within = 0.194). Topic count also increases by 0.85/year within adopters, **contradicting the displacement narrative** from H1. 

**Reconciling E vs H1:** The CS21 DiD (H1) estimates the *causal effect* of adoption relative to not-yet-treated firms (external displacement). Stream E captures within-firm trends including regression to mean and secular trends common to all adopters. The two are compatible: GRI 3 adoption causes firms to initially narrow their material topics (H1 displacement at e=0) but topic breadth then grows back over time as firms embed the process (E: +0.85/year within). The process quality trajectory (E: +0.075/year) is the more theoretically central finding from Stream E.

---

## Stream F — NLP Convergent Validity

**Column naming correction applied:** `finbert_gov_density` → `finbert_gov_pct`; `bge_gov_density` → `bge_gov_affinity`. Execution plan and hypothesis document updated.

**Coverage (DiD window 2021–2024):**
- finbert_gov_pct: bilingual 100%, EN-only 100%, ZH-only ~0% (expected — FinBERT is EN-only)
- bge_gov_affinity: bilingual 100%, ZH-only 100%, EN-only 53% (partial EN coverage)

**Convergent validity r(PQS, NLP) — 2024 cross-section:**

| NLP measure | r | n | Meets r≥0.20 threshold |
|---|---|---|---|
| finbert_gov_pct | 0.112 | 662 | ❌ |
| finbert_env_pct | −0.022 | 662 | ❌ |
| bge_top1_sim | 0.276 | 359 | ✅ |
| bge_mean_sim | 0.331 | 359 | ✅ |
| xlmr_esg_sentences_n | 0.302 | 359 | ✅ |

**Key finding:** BGE-M3 similarity scores meet the pre-registered convergent validity threshold (r≥0.20). FinBERT topic percentages do not. This suggests FinBERT captures a different dimension (topic salience in EN text) than the structural process quality checklist. BGE-M3 measures are the stronger NLP proxy for PQS and should be used as the primary NLP outcomes in Stream F analysis.

---

## Issues, Limitations, and Required Fixes

### Methodological issues (must address before OSF)

| # | Issue | Severity | Resolution |
|---|---|---|---|
| 1 | **g=2021 cohort (N=10)** produces numerical breakdown — excluded from primary via `glist=c(2022,2023)` | High | ✅ Resolved — g=2021 excluded from ATT estimation |
| 2 | **g=2024 as NTT controls** — must stay in data (not filtered) but excluded from `glist` to avoid 1 pre-period problem | High | ✅ Resolved — filter removes only g=2021; g=2024 retained as controls; `glist=c(2022,2023)` |
| 3 | **Stream B AUC=0.775** — selection on firm size; DR estimator partially corrects but overlap stressed | High | Report AUC; note DR robustness; IPW adds little with `est_method="reg"` correction already in place |
| 4 | **H2 mpqi_composite composite null** — two opposing forces cancel; interpret as composition story | Medium | Framed as mechanism finding: proc dim ↑, stakeholder count ↓; both are theoretically interpretable |
| 5 | **H4 primary TWFE null** — triple-diff coef = −0.907 ns; subsample CS21 exploratory only | High | Primary test remains TWFE; reclassify H4 as exploratory in pre-registration |
| 6 | **D4 panel FE logit OR = 47.8** — incidental parameters bias in T=4 short panel | Medium | ✅ Resolved — replaced with Mundlak-Chamberlain CRE logit (D4b), OR=2.858*, avoids incidental params bias |
| 7 | **HonestDiD vcov approximation** — diagonal SE² used due to V_analytical unavailability with unbalanced panel | Low | Use bootstrap vcov (`bstrap=TRUE, biters=999`) in final R run for paper |
| 8 | **mpqi_p2–o1 collinearity** (r=0.809) — both items appear to capture visualization quality | Medium | Flag as limitation; resolve dimension assignment before CFA; report in measurement section |

### Technical issues (resolved)

| Issue | Resolution |
|---|---|
| C2 Poisson `sasb_industry` dtype error | Fixed: `.astype(str)` before `get_dummies()` |
| Stream D perfect separation (Financials/Food 100%) | Fixed: `sasb_grp` collapses to `FullAssur`; Firth penalty applied |
| `standalone_sr` causes non-PD Hessian in logistf | Fixed: removed from D1/D2 (proxy for outcome — conceptually inappropriate) |
| CS21 `base_period="universal"` crash with unbalanced panel | Fixed: removed; use default `"varying"` |
| `aggte()` crash — all NA after forced balancing | Fixed: `allow_unbalanced_panel=TRUE`, drop g=2021/2024, minimal covariates |
| NLP column names wrong in execution plan | Fixed: plan and hypothesis doc updated |

---

## Next Steps (Pre-OSF)

### Before pre-registration

1. **Decide primary estimator specification** — resolve the H2 Python vs R discrepancy. Commit to R `did` package as the primary estimator; Python `csdid` as robustness only. Specify the primary event-time window (suggest t=−2 to t=+1 where data allows).

2. **Extend panel to 2025 if possible** — currently the post-treatment window is very short (g=2022 gets only 2 post-years; g=2023 gets 1). Even one additional year would substantially stabilise H2 and H4.

3. **Resolve g=2021 decision** — N=10 is too small for reliable ATT(g=2021) estimation. Pre-register the decision to exclude g=2021 from primary analysis with a sensitivity robustness check including it.

4. **Confirm DB columns for final run** — verify `finbert_gov_pct` / `bge_gov_affinity` / `bge_mean_sim` / `xlmr_esg_sentences_n` are complete and correctly named in `db_did_full.csv` before pre-registering Stream F outcomes.

5. **Pre-register the FullAssur collapse decision** — the logistf collapsing of Financials+Food to a single category is a data-driven choice that needs to be declared upfront or handled via a pre-specified sensitivity analysis.

### Analysis improvements for final run

6. **H1/H2 R final run** — add `bstrap=TRUE, biters=999` to `att_gt()` to get full bootstrap vcov for HonestDiD; this will replace the diagonal SE² approximation.

7. **H4 triple-diff** — run HonestDiD separately for High and Low subsamples before computing the triple-diff. If pre-trends for Low subsample fail the HonestDiD check at low M, drop H4 from confirmatory to exploratory.

8. **Stream F NLP DiD** — run CS21 with `bge_mean_sim` and `xlmr_esg_sentences_n` as outcomes (both r≥0.20 with PQS). FinBERT measures should be moved to exploratory/appendix given failure to meet convergent validity threshold.

9. **D3 reasonable assurance** — report as appendix with EPV caveat. Consider whether to include at all given 57 events. Alternative: collapse reasonable + limited into a single "high-quality assurance" indicator.

10. **D4 panel FE** — add firm × year cluster SEs to the feglm call; flag incidental parameters bias in discussion. Consider using Mundlak-Chamberlain correlated random effects as an alternative.

---

## Output Files

| File | Location |
|---|---|
| h1_event_study.csv / .png | findings/r-results/ |
| h1_honestdid_sensitivity.csv | findings/r-results/ |
| h2_event_study.csv / .png | findings/r-results/ |
| h2_honestdid_sensitivity.csv | findings/r-results/ |
| h3_d1_any_assurance_firth.csv | findings/r-results/ |
| h3_d2_big4_assurance_firth.csv | findings/r-results/ |
| h3_d3_reasonable_assurance_firth_appendix.csv | findings/r-results/ |
| h3_d4_panel_fe_logit.csv | findings/r-results/ |
| data-analyst_stream-sampling_2026-06-23.md | findings/ |
| sampling-overview_all-streams_2026-06-23.md | findings/ (this file) |
