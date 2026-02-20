# User Story: Empty & Partial Input States

**Epic:** Results & Export
**Story ID:** story_009

## Description
As a new user exploring the app, I want to see clear instructional messages when my form is completely empty or partially filled, so that I understand what information the calculator needs from me to function properly.

## Acceptance Criteria
- [x] If all inputs are uniformly empty (e.g., just opened the app), the application should conceal the shopping list numbers and display an instructional "Empty State" message like: *"Fill in the measurements above to see the materials list"*.
- [x] If the user has started filling dimensions in Mode 1 (e.g., length and width enter but not thickness), the results block should hide invalid calculations and alternatively show: *"Fill in all three dimensions to calculate"*.
- [x] The normal Results UI is completely restored the moment a valid calculation occurs.
