# User Story: Waste Margin Configuration

**Epic:** Data Entry & Validation
**Story ID:** story_005

## Description
As a construction professional, I want to add a safety waste margin percentage to my total volume calculation so that I can purchase enough materials to cover standard site losses (due to transport, spills, or uneven ground).

## Acceptance Criteria
- [x] The system provides a numeric input field dedicated to "Waste Margin (%)".
- [x] The default value for the Waste Margin is set to 10%.
- [x] The value is applied as a multiplier at the end of the total volume calculation (`VDP = VD + (VD * Margin%)`).
- [x] The system requires the margin to be strictly between 5% and 20%.
- [x] Inputs outside the 5% - 20% range must trigger a clear visual validation error to the user, blocking calculations from using invalid extremes.

## Technical Notes
* Avoid silent clamping of values (e.g., if a user types 25, do not silently change it to 20; instead, show an error message).
* State persistence using `localStorage` is permitted solely for remembering this specific value for the user's next visit.
