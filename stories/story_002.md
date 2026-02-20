# User Story: Application Layout & Responsive Design

**Epic:** Core UI & Structure
**Story ID:** story_002

## Description
As a mobile user in a construction environment, I want a clean, minimalist, single-column interface with high contrast so that I can easily read and interact with the calculator outdoors without zooming or horizontal scrolling.

## Acceptance Criteria
- [x] The application is developed with a Mobile-First approach.
- [x] The layout is a single-column structure (100% width on mobile) divided into two clear visual panels: "Project Data" (top) and "Materials List" (bottom).
- [x] The design ensures high contrast between the background and text (minimum 4.5:1 ratio) for readability under direct sunlight.
- [x] All typography uses a legible size (minimum 16px font size).
- [x] The page load completes (First Contentful Paint) in less than 1.5 seconds on a 3G mobile network.

## Technical Notes
* Use Semantic HTML5 and pure Vanilla CSS. Avoid heavy JS frameworks.
* Use Lucide Icons (via CDN) or inline SVG to reduce HTTP requests.

## UI/UX Notes
* Keep the interface entirely clean of construction jargon when unnecessary.
* Design should look and feel fluid on modern mobile browsers.
