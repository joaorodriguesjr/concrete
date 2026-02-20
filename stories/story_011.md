# User Story: Offline Support (PWA)

**Epic:** Results & Export
**Story ID:** story_011

## Description
As a worker on a remote construction site with spotty connectivity, I want the calculator app to function completely offline after my initial visit, so that I can still determine my materials even if my phone loses 3G/4G signal.

## Acceptance Criteria
- [x] A Service Worker caches the essential static files (HTML, CSS, JS, icon).
- [x] If the user loses connection or explicitly sets their device to offline mode, opening the browser bookmark/site still loads the calculator properly.
- [x] (Optional) A `manifest.json` allows the user to "Install to Home Screen" for an app-like experience.

## Technical Notes
* PWA (Progressive Web App) implementation.
* The strategy for the Service Worker should be Cache-First for static assets.
