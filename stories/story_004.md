# User Story: Direct Volume Input Mode & Toggle

**Epic:** Data Entry & Validation
**Story ID:** story_004

## Description
As an experienced architect or engineer who already knows the exact volume needed, I want to toggle to a direct volume input mode so that I can bypass entering the width, length, and thickness, thus saving time.

## Acceptance Criteria
- [x] The interface provides a visible toggle or switch to alternate between "Dimensions Mode" and "Direct Volume Mode".
- [x] When switching to "Direct Volume Mode", the three dimension fields become hidden and are replaced by a single numeric field: "Total Volume (m³)".
- [x] When transitioning between the two modes, previously entered values strictly persist in state (if the user returns to the older mode, their inputs are still there).
- [x] Changing the volume in this field instantly updates the material calculation results.

## Technical Notes
* The `getInputs()` logic must check which mode is active to determine whether to use `W * L * T` or the `directVolume` variable for the base math.
* Ensure UI transitions between the two modes are visually clear.
