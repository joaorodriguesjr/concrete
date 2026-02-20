# User Story: Copy to Clipboard Export

**Epic:** Results & Export
**Story ID:** story_010

## Description
As a project manager or DIY constructor, I want to copy my final materials shopping list to my clipboard with a single button tap so that I can easily paste and share it with my supplier or team members via WhatsApp.

## Acceptance Criteria
- [ ] The interface provides a distinct "Copy List" button (or identifiable copy icon) near the results section.
- [ ] When clicked, the data is automatically copied to the device's clipboard in a plain text layout designed for messaging apps.
- [ ] The plain text structure contains: structure name, calculated volume, waste margin, and exact itemized quantities for Cement, Sand, Gravel, and Water.
- [ ] A brief visual feedback message ("Copied!") appears on or near the button for approximately 2 seconds to confirm the success of the action.

## Technical Notes
* Use the modern `navigator.clipboard.writeText()` API.
* Fallbacks or try-catch error states should handle browsers or contexts where clipboard access fails.
