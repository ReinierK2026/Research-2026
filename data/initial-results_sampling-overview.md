---
date: 2026-06-23
status: exploratory — pre-OSF, NOT for inference
scope: All streams A–F + R HonestDiD + R logistf
---

# GRI 3 Materiality DiD — Sampling Run: Full Findings Overview

> **⚠️ Exploratory only. OSF pre-registration not filed. No inferential claims from this document.**

---

## Summary Table

| Hypothesis | Test | Direction | Significant | Robust | Status |
|---|---|---|---|---|---|
| H1: topic displacement | CS21 DiD (Python + R) | Negative ✓ | Yes (e=0) | HonestDiD M=2 ✅ | **Supported** |
| H2: process quality ↑ | CS21 DiD (Python) | Positive ✓ | At t+1 only | Null at M=0 ❌ | **Weakly supported / lagged** |
| H2 (R replication) | CS21 reg (R) | Negative ✗ | No | Null | **Not supported in R run** |
| H3: assurance uptake ↑ | Firth logit (R) | Positive ✓ | Yes (D1, D2) | — | **Supported** |
| H3a: panel FE robustness | feglm (R) | Positive ✓ | Yes | — | **Supported (caution: large OR)** |
| H4: heterogeneity by intensity | Triple-diff (Python) | Wrong direction | Unstable | Pre-trends noisy | **Not supported / underpowered** |
| C1: cross-sectional quality | OLS (Python) | Positive ✓ | Yes | Cross-section caveat | **Directionally consistent** |
| C2: assurance count Poisson | GLM (Python) | Negative | No (p=0.51) | — | **Null** |
| E: within-company dynamics | FE OLS (Python) | Positive ✓ | Yes (both) | — | **Supported** |

---

## Stream A — CS21 DiD: Topic Displacement and Process Quality

### H1: n_material_topics_b (breadth of material topics)

**Python run (Doubly Robust, not-yet-treated controls, N=2,803 / 923 companies):**

| Event time | ATT | SE | Significant |
|---|---|---|---|
| −2 | +0.019 | 1.22 | No ✅ |
| −1 | −1.602 | 5.04 | No ✅ |
| 0 | **−7.882** | 3.32 | **Yes** |
| +1 | −4.654 | 265.6 | No (thin controls) |
| +2 | +143.7 | 76.0 | No (g=2021 instability) |

**R run (Outcome Regression, unbalanced panel, g=2022/2023 only, N reduced):**

| Event time | ATT | SE | Significant |
|---|---|---|---|
| −1 | −1.240 | 1.72 | No ✅ |
| 0 | **−10.360** | 4.74 | **Yes** |

Overall ATT = −10.36 [−19.65, −1.07]*

**Interpretation:** GRI 3 adoption is associated with a meaningful reduction in the breadth of reported material topics at the adoption year. Pre-trends are flat in both runs. The direction is consistent: displacement toward fewer, more focused topics (consistent with double materiality requiring evidenced prioritisation rather than comprehensive listing).

**HonestDiD (R — FLCI, DeltaSD):**

| M | lb | ub | Significant |
|---|---|---|---|
| 0.00 | −21.5 | −1.71 | Yes |
| 0.50 | −21.5 | −1.67 | Yes |
| 1.00 | −21.7 | −1.53 | Yes |
| 1.50 | −21.9 | −1.30 | Yes |
| 2.00 | −22.2 | −1.00 | Yes |

**Robustness ratio M = 2.0** — the ATT remains statistically significant even if parallel trends were violated by twice the magnitude of the observed pre-trend. This is the strongest possible result within the tested range.

*Note: vcov uses diagonal SE² approximation (V_analytical unavailable with unbalanced panel). Final run should use bootstrap vcov.*

---

### H2: process_quality_score

**Python run (Doubly Robust, N=2,608 / 943 companies):**

| Event time | ATT | SE | Significant |
|---|---|---|---|
| −2 | +0.097 | 6.7e+13 | No (g=2021 numerical breakdown) |
| −1 | −0.106 | 6.1e+13 | No (g=2021 numerical breakdown) |
| 0 | +0.013 | 0.064 | No |
| +1 | **+0.114** | 0.023 | **Yes** |

One-year lag effect of +0.114 on the 0–1 PQS scale. Within the pre-registered expected range (+0.05 to +0.15).

**R run (Outcome Regression, g=2022/2023 only):**

| Event time | ATT | SE | Significant |
|---|---|---|---|
| −1 | −0.038 | 0.058 | No ✅ |
| 0 | −0.015 | 0.075 | No |

Overall ATT = −0.015 [−0.154, +0.124] — **null result in R.**

**HonestDiD (R):** Already null at M=0 (CI includes 0). Sensitivity analysis is uninformative — the result is not robust even to zero parallel-trend violation.

**Interpretation discrepancy:** Python detects a lagged effect (+0.114 at t+1) while R shows null at t=0. The R run excludes g=2021 and g=2024, uses only 2 event times (−1, 0), and applies outcome regression rather than DR. The t+1 post-period is not estimable in the R run (data only covers up to 2024, g=2023 has only one post-year). The discrepancy is therefore partly methodological (different cohort inclusion, different estimators, different event-time window) and partly genuine uncertainty. H2 should be treated as "weakly supported with a one-year lag" pending a cleaner panel.

---

### H4: Heterogeneity by Impact Intensity (Triple-Diff)

**Method:** Split into High vs Low impact_intensity subsamples; triple-diff = ATT(High) − ATT(Low), SE via delta method.

| Subsample | Simple ATT | t+1 ATT | Pre-trend |
|---|---|---|---|
| High intensity | −16.4* | −24.4* | Flat |
| Low intensity | +5.9 ns | +15.6* | Noisy (t−2 = −6.4) |

**Triple-diff ATT (High − Low):** Negative direction (High displaces more topics than Low). Pre-registered H4 expected the opposite — displacement should be stronger in low-intensity sectors where GRI 3 forces a bigger shift. **Result contradicts the hypothesis direction.**

**Caveats:**
- Only ~15 NTT controls per subsample — very thin
- Low-intensity pre-trend at t−2 = −6.4 (large, noisy) raises parallel trends concerns
- Large SEs throughout; estimates unreliable at this sample size

**Status: Not supported / underpowered.** HonestDiD is essential for H4 in the final analysis.

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
| 1 | **g=2021 cohort (N=10)** produces numerical breakdown in all CS21 runs — massive SEs, implausible ATTs at longer horizons | High | Exclude from primary analysis; report as sensitivity |
| 2 | **g=2024 has no pre-treatment period** in current panel (last year = 2024) | High | Exclude from CS21; include in cross-sectional only |
| 3 | **Stream B AUC=0.775** — selection on firm size is substantial; DR estimator partially corrects but overlap assumption is stressed | High | Report AUC; note DR robustness; consider trimming extreme propensity weights |
| 4 | **H2 discrepancy Python vs R** — Python finds +0.114 at t+1; R finds null at t=0 (different cohort window and estimator) | Medium | Reconcile in pre-reg: specify primary event-time window (t=0 through t+1) and primary estimator (R `did`) |
| 5 | **H4 pre-trends for Low subsample** look noisy (t−2 = −6.4, large); only ~15 NTT controls per subsample | High | HonestDiD essential for H4; consider collapsing to binary triple-diff |
| 6 | **D4 panel FE logit OR = 47.8** — incidental parameters bias in T=4 short panel | Medium | Flag explicitly; report as sign/direction only, not magnitude |
| 7 | **HonestDiD vcov approximation** — diagonal SE² used due to V_analytical unavailability with unbalanced panel | Low | Use bootstrap vcov (bstrap=TRUE, biters=999) in final R run |

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
