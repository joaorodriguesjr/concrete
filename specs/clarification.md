# Clarification Log

**Product:** Concrete Mix and Construction Materials Calculator
**Status:** Open
**Date:** February 20, 2026

This document records open questions and ambiguities identified in the PRD, FRD, and TRD that must be resolved before user stories are written.

---

## CL-01 — Cement Density Formula Inconsistency

**Severity:** 🔴 Critical
**Source Documents:** FRD (FR-05, Step 6) vs. TRD (`calculateMaterials`)

**Issue:**
The FRD describes the cement calculation as simply *"convert volume to kg, then divide by 50"*, implying no density correction. The TRD, however, uses a different formula:

```js
bags = Math.ceil((volumeOnePart * prop.cement * 1000) / (CEMENT_BAG_WEIGHT_KG / 1.2))
```

The `/ 1.2` divisor introduces a density adjustment not described anywhere in the FRD, making the two documents contradictory.

**Question:** Which formula is canonical — the FRD's simplified version or the TRD's density-adjusted version? If the density adjustment is intentional, it must be documented in the FRD.

**Decision:**
> **The TRD's density-adjusted version is canonical.** The real specific mass of Portland Cement is ~3.1 kg/L, but field calculations use the Apparent Specific Mass (loose cement) of ~1.2 kg/L via ABNT NBR 16605. The `/ 1.2` adjustment is correct. The FRD must be updated to reflect this adjustment.

---

## CL-02 — Water Quantity Rule: Source of Truth

**Severity:** 🔴 Critical
**Source Documents:** FRD (FR-05, Step 8) vs. TRD (`data.js`)

**Issue:**
The FRD references a water ratio of *"30 liters per 50kg bag"* but immediately qualifies it as *"depending on the mix"*, without specifying the values per mix type. The TRD's `data.js` structure defines `waterPerBag` per mix (30, 35, 32 liters), which is the correct approach, but this is not explicitly stated in the FRD.

**Question:** Should `waterPerBag` as defined in `data.js` be the canonical rule for water calculation? The FRD must be updated to reflect this explicitly.

**Decision:**
> **The TRD's `data.js` definition is the canonical rule.** According to ABNT NBR 12655, the water/cement ratio depends on the Environmental Aggressiveness Class (CAA) and target compressive strength, preventing a single flat "30 liters" rule. The FRD must be explicitly updated to indicate it varies by mix type.

---

## CL-03 — Rounding Rule for Cans (Sand and Gravel)

**Severity:** 🟡 Important
**Source Document:** FRD (FR-05, Step 7; FR-06)

**Issue:**
The FRD explicitly specifies `Math.ceil` (round up) for cement bags. No rounding rule is defined for sand and gravel when displayed in cans (18L).

**Question:** Should can quantities round up (`Math.ceil`), round to nearest, or be displayed as a decimal value?

**Decision:**
> **Displayed as a decimal value.** While 18-liter cans are universally used, ABNT NBR 7200 dictates standardized measurement containers. Providing decimal values (e.g., `2.5 cans`) allows field workers to accurately build a standardized measuring box (padiola) or properly estimate can portions rather than rounding up and altering the mix ratio.

---

## CL-04 — Default Input Mode and Toggle Behavior

**Severity:** 🟡 Important
**Source Document:** FRD (FR-02)

**Issue:**
FR-02 defines two calculation modes (Dimensions and Direct Volume) and states that only the active mode's fields should be visible. However, two behaviors are undefined:

1. Which mode is active by default on page load?
2. When the user toggles between modes, are previously entered values preserved or cleared?

**Question:** What is the default mode? Should values be preserved or cleared on toggle?

**Decision:**
> **Default mode is "Dimensions". Values should be preserved on toggle.** From a UX perspective, users typically want to know total dimensions first. Preserving the calculated / manually-input Volume when toggling to "Direct Volume" prevents data loss and friction.

---

## CL-05 — Waste Margin: Validation Bounds

**Severity:** 🟡 Important
**Source Document:** FRD (FR-03)

**Issue:**
FR-03 defines a default waste margin of 10% but specifies no minimum or maximum bounds. Negative values or extreme values (e.g., 200%) would produce nonsensical results.

**Question:**
- What is the allowed minimum? (0%? 5%?)
- What is the allowed maximum? (e.g., 50%?)
- How should out-of-range values be handled — clamped silently or shown as a validation error?

**Decision:**
> **Minimum: 5%, Maximum: 20%. Show as a validation error.** Based on TCPO/SINAPI standards, the typical loss index for ready-mix concrete is ~5%, and on-site concrete may reach 10%. Margins above 20% denote high inefficiency and should be flagged as an error rather than clamped.

---

## CL-06 — Empty State with Partial Dimension Input

**Severity:** 🟢 Minor
**Source Document:** FRD (FR-06)

**Issue:**
FR-06 defines the empty state for when *"input fields are empty or zero"*. When Mode 1 (Dimensions) is active and only some fields are filled (e.g., Width and Length, but not Thickness), the computed volume is 0 — indistinguishable from a truly empty state.

**Question:** Should partial input trigger the same generic empty state, or a distinct message like *"Fill in all three dimensions to calculate"*?

**Decision:**
> **Show a distinct message.** To provide clear UX guidance, partial inputs should prompt the user with *"Fill in all three dimensions to calculate"* instead of presenting a confusing "0 volume" empty state.
