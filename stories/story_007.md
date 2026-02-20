# User Story: Mix Algorithm Processing

**Epic:** Calculation Engine
**Story ID:** story_007

## Description
As a construction professional, I want the calculator to correctly apply standard industry rules regarding specific proportions, material shrinkage, and standardized unit sizes so that the resulting quantities of cement, sand, gravel, and water perfectly match real-world requirements.

## Acceptance Criteria
- [x] The system applies a standard shrinkage factor representing a 30% loss of dry material volume when wet (`Volume of Dry Materials = Desired Volume * 1.3`).
- [x] For each component (Cement, Sand, Gravel), the dry volume is correctly subdivided according to the active Mix ratio (e.g., 1:2:3 implies 6 total parts).
- [x] Cement quantity is explicitly converted to standard 50kg bags correctly (respecting its Apparent Specific Mass correction by dividing by 1.2), rounded UP (`Math.ceil`).
- [x] Sand and Gravel are presented in cubic meters (m³) and alternatively translated into the exact number of 18-liter measuring cans (without rounding up the cans).
- [x] Water volume is distinctly quantified in liters based on the specific Water/Cement ratio defined per mix.

## Technical Notes
* `CONSTANTS` structure must map:
  * CEMENT_BAG_WEIGHT_KG = 50
  * CAN_VOLUME_LITERS = 18
  * SHRINKAGE_FACTOR = 1.3
* Calculation flow follows step-by-step from FR-05 logic:
  1. VD = Actual Volume
  2. VDP = VD + Waste
  3. VMS = VDP * 1.3
  ... Followed by the proportion splittings.
