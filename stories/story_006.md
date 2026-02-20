# User Story: Instant Real-Time Recalculation

**Epic:** Calculation Engine
**Story ID:** story_006

## Description
As a user inputting new dimensions or changing my waste margin, I want the material quantities to recalculate and update instantly on the screen so that I do not need to hunt for or press a distinct "Calculate" button.

## Acceptance Criteria
- [ ] The system does not feature a dedicated "Calculate" button for obtaining the final material quantities.
- [ ] Every value change in any input field (via JavaScript `oninput` or `onchange` events) immediately triggers the calculation function.
- [ ] The results panel on the screen updates instantly when valid inputs are given.

## Technical Notes
* The `initApp()` function should bind event listeners to all form fields and radio buttons. 
* A debounce interval could be implemented if older devices show performance degradation, but standard synchronous execution is the default given the calculation simplicity.
