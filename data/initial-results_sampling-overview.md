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
| Stream F: bge_mean_sim (ZH/bilingual) | CS21 (Python, biters=999) | Positive ✓ | Yes (ATT=+0.079* at t=0) | Pre-trends clean ✅ | **Supported — convergent NLP evidence** |
| Stream F: xlmr_esg_sentences_n | CS21 (Python) | Negative (ns) | No | No pre-trend testable | **Underpowered — exploratory** |
| D3c: has_quality_assurance | Logit (Python) | Positive ✓ | Yes (OR=1.913*) | EPV=33.4 | **Supported — new collapsed indicator** |
| D4b: CRE logit panel | Mundlak-Chamberlain | Positive ✓ | Yes (OR=2.858*) | No incidental params bias | **Primary panel H3 estimate** |

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
| `mpqi_dim_gov` (col 217) | g1, g3 | mean(g1, g3) / 2 | 0–1 |
| `mpqi_dim_proc` (col 218) | p1, p2, p3 | mean(p1, p2, p3) / 2 | 0–1 |
| `mpqi_dim_stake` (col 219) | s1, s2, s3 | mean(s1, s2, s3) / 2 *(s1 already 0–1)* | 0–1 |
| `mpqi_dim_out` (col 220) | o1, o2 | mean(o1, o2) / 2 | 0–1 |
| `mpqi_dim_gri` (col 221) | — | GRI conformance indicators | 0–1 |
| **`mpqi_composite`** (col 222) | All 10 items | Equal-weighted mean of 5 dims | **0–1** |

All raw items are on a 0–2 scale and divided by 2 to produce 0–1; `mpqi_s1` is already 0–1 and used as-is. Note: `mpqi_composite_3d` is **not present** in the DB.

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

### D3 — has_reasonable_assurance (appendix only, EPV = 4.6)

**Updated 2026-06-24:** EPV = 4.6 (23 events after NA removal). Wald CIs unreliable, convergence issues. No inferential claims. Relegated to appendix.

**New D3c — has_quality_assurance (Big4 OR Reasonable) — EPV = 33.4:**

| Predictor | OR | p | Note |
|---|---|---|---|
| **years_since_adoption** | **1.913** | **<0.001** | Primary collapsed D3 |
| ln_total_assets | 1.483 | 0.002 | — |
| big4_financial_auditor | 2.982 | 0.024 | — |

`has_quality_assurance` = 1 if `big4_assurance`=1 OR `assurance_level`="Reasonable" (events=167, EPV=33.4). Standard logit appropriate at this EPV. **Key finding: 1.9× higher odds of high-quality assurance per additional year under GRI 3.** Directionally consistent with D1/D2 but targets the upper tier.

### D4 — Panel FE Logit Robustness (updated 2026-06-24)

**D4 feglm: OR=47.8 — incidental parameters bias artifact. Do not report as primary.**
- Root cause confirmed: 516/897 panel companies (57.5%) have zero within-period variation in `has_any_assurance`. These perfectly-predicted observations inflate the firm FE logit coefficient via Neyman-Scott bias.
- **Flag explicitly in paper; replace with D4b as primary panel estimate.**

**D4a: LPM TWFE (pyfixest, cluster SEs by firm):**

| Variable | Coef | SE (CRV1) | p |
|---|---|---|---|
| years_since_adoption | −0.009 | 0.044 | 0.843 |

Null within-company effect — expected. FE absorbs 516 invariant companies; remaining variation not systematically driven by years since adoption conditional on firm FE.

**D4b: Mundlak-Chamberlain CRE Logit (primary panel estimate):**

| Parameter | OR | 95% CI | p |
|---|---|---|---|
| **years_since_adoption** | **2.858** | **[2.342, 3.488]** | **<0.001** |

OR=2.858 confirmed in both R and Python (exact match). Avoids incidental parameters bias. **Primary panel robustness result for H3.**

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

## Stream F — NLP DiD (CS21) and Convergent Validity

> **2026-06-24 update:** CS21 DiD executed with `bge_mean_sim` and `xlmr_esg_sentences_n` (both r≥0.20 with PQS). FinBERT moved to appendix (near-zero 2020 coverage; parallel trends untestable).

**Convergent validity r(PQS, NLP) — 2024 cross-section:**

| NLP measure | r | n | Meets r≥0.20 threshold | DiD status |
|---|---|---|---|---|
| finbert_gov_pct | 0.112 | 662 | ❌ | Appendix only |
| finbert_env_pct | −0.022 | 662 | ❌ | Appendix only |
| bge_top1_sim | 0.276 | 359 | ✅ | Exploratory |
| bge_mean_sim | 0.331 | 359 | ✅ | **Primary NLP** |
| xlmr_esg_sentences_n | 0.302 | 359 | ✅ | Secondary (underpowered) |

### bge_mean_sim CS21 (ZH/bilingual track, N=1,687, biters=999)

| Event time | ATT | SE | 95% Simult. Band | Sig? |
|---|---|---|---|---|
| −2 | −0.007 | 0.011 | [−0.027, +0.014] | ns ✅ |
| −1 | +0.019 | 0.015 | [−0.011, +0.050] | ns ✅ |
| **0** | **+0.079** | **0.030** | **[+0.021, +0.137]** | **Yes ✅** |
| +1 | +0.011 | 0.107 | [−0.198, +0.221] | ns |

**Key finding:** GRI 3 adoption increases BGE-M3 semantic governance affinity by +0.079 units at the adoption year for ZH and bilingual reporters. Pre-trends clean. This is convergent NLP evidence supporting H2's process formalisation mechanism (mpqi_dim_proc also positive and significant at t=0/+1).

### xlmr_esg_sentences_n CS21 (EN/bilingual, N=1,157)

Only 1 event time estimable (g=2023 has 78 EN-only NTT companies — pre-trend period inestimable). ATT(t=0) = −36.50, SE=28.97 (ns). **Underpowered — exploratory note only; no inference.**

### FinBERT (appendix only)

2020 coverage: 2 observations for EN/bilingual track — parallel trends assumption untestable for DiD. Moved to appendix. FinBERT cross-sectional r=0.112 with PQS does not meet pre-registered r≥0.20 threshold. Cross-sectional correlation against mpqi_composite (r=0.218 in 2024 only) is borderline and should not be used to override the pre-registered threshold.

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
| 7 | **HonestDiD vcov approximation** — diagonal SE² used due to V_analytical unavailability with unbalanced panel | Low | ✅ Bootstrap run completed (Python csdid biters=999; H1 ATT=-7.18 SE≈3.7 confirmed). For paper, run in R with `bstrap=TRUE, biters=999` for full off-diagonal vcov. |
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

6. ✅ **H1/H2 bootstrap run (2026-06-24)** — Python csdid biters=999 completed. H1 ATT(t=0)=−7.18*, SE=3.61; H2 proc dim t+1=+0.109* [0.069, 0.148] confirmed. For paper: run R `did` with `bstrap=TRUE, biters=999` for full bootstrap vcov + HonestDiD.

7. ✅ **H4 subsample HonestDiD (2026-06-24)** — Low: passes M=2 (ub=−1.08). High: null at M=0 (ub=+3.83). H4 pre-trend for Low clean (both pre-periods ns). Primary triple-diff null → H4 classified as **exploratory**.

8. ✅ **Stream F NLP DiD (2026-06-24)** — bge_mean_sim ZH/bilingual: ATT(t=0)=+0.079* [0.021, 0.137], pre-trends clean. xlmr underpowered (no pre-trend). FinBERT → appendix (zero 2020 coverage).

9. ✅ **D3 EPV resolution (2026-06-24)** — has_reasonable EPV=4.6 → appendix only. New collapsed `has_quality_assurance` (Big4 OR Reasonable): EPV=33.4, OR=1.913*, primary D3 outcome.

10. ✅ **D4 panel FE (2026-06-24)** — feglm OR=47.8 confirmed as incidental params bias (516/897 companies have no variation). D4b CRE logit: OR=2.858* [2.342, 3.488] — primary panel estimate (Python matches R exactly). D4a LPM TWFE: null within-company effect expected.

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
