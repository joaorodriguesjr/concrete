# User Story: Structure Type Selection (Mix)

**Epic:** Core UI & Structure
**Story ID:** story_001

## Description
As a user (Foreman or DIY constructor), I want to select the type of concrete structure (e.g., Slab, Subfloor, Foundation) so that the correct mix proportions are applied to my calculation.

## Acceptance Criteria
- [x] The interface provides single-selection buttons (Radio buttons or selectable Cards) for the application type.
- [x] The available options and their respective base mixes are:
  - Slab / Pillar / Beam (High strength) -> 1 : 2 : 3
  - Subfloor / Sidewalk (Medium strength) -> 1 : 3 : 4
  - Foundation / Footing (High strength) -> 1 : 2.5 : 4
- [x] A default structure type is selected upon loading the application.
- [x] When the selection changes, the calculation is instantly re-triggered if valid inputs exist.

## Technical Notes
* The concrete mix rules should be stored as an array of JSON objects (e.g., `CONCRETE_MIXES`) in `data.js` to allow easy expansion.
* Each mix definition should store the mix properties (cement, sand, gravel) and the required water per bag.

## UI/UX Notes
* Buttons should be large enough (min 48x48 px touch target) for easy tapping on mobile devices, even in sunny or dusty environments.
