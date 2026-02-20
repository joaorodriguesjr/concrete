# User Story: Display Shopping List (Results)

**Epic:** Results & Export
**Story ID:** story_008

## Description
As a user who has entered all my project dimensions, I want to clearly see a formatted list of all required materials so that I know exactly what to buy from the store.

## Acceptance Criteria
- [x] The materials list is visually separated from the input section (either below it or fixed at the footer).
- [x] The quantities are displayed with the proper commercial units:
  - Cement: Integer number of bags (50kg).
  - Sand: Output in m³ alongside the equivalent in 18L cans.
  - Gravel: Output in m³ alongside the equivalent in 18L cans.
  - Water: Output in total Liters.
- [x] Whenever `calculateAndRender()` is triggered due to an input change, the DOM is updated efficiently to display these new numbers without page reloading.

## UI/UX Notes
* Use clear typography and perhaps icons to demarcate each material component.
