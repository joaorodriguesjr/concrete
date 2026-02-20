# Concrete Mix and Construction Materials Calculator

## Product Overview
The "Concrete Mix Calculator" is a Mobile-First single-page web application (SPA) designed for construction professionals to quickly and easily calculate the exact amount of materials (cement, sand, gravel, and water) needed for different concrete works. It eliminates the need for spreadsheets, logins, and a constant internet connection.

## Target Audience
- **Foreman / Bricklayer**: Needs fast, accurate material quantity takeoffs for immediate purchase.
- **Civil Engineer / Architect**: Needs quick estimates for budgeting.
- **DIY Audience**: Needs simple proportions for small home renovations.

## Core Features
1. **Mobile-First UX**: Large buttons, high contrast, and focused on usability in tough environments (like outdoor construction sites).
2. **Offline-Ready Calculation**: 100% Client-Side Rendering with no backend processing. 
3. **Application Type Selection**: Choose concrete mix based on application (e.g., Subfloor, Slab, Foundation).
4. **Volume & Dimension Input**: Support for direct volume (m³) or dimensions (width x length x thickness) inputs using native numeric mobile keypads.
5. **Waste Margin**: Real-time material calculation with adjustable loss margins.
6. **Commercial Units Output**: Presents results in practical units (50kg cement bags, 18L cans, cubic meters, and liters of water).
7. **Quick Sharing**: Copy to clipboard functionality to instantly share material lists via WhatsApp.

## Technical Stack
This application prioritizes performance, focusing on a lightweight footprint (no heavy frameworks like React/Angular) and accessibility.

- **Structure**: Semantic HTML5
- **Styling**: Vanilla CSS
- **Interactivity**: Vanilla JavaScript (ES6+)
- **Icons**: Lucide Icons or inline SVGs

## Project Architecture
The project is organized efficiently for simplicity and speed:

```
.
├── index.html        # Interface structure and script/style imports
├── css
│   └── styles.css    # Application styles
├── js
│   ├── data.js       # Definition of constants and mix objects
│   └── app.js        # Main logic, event listeners and calculations
└── assets
    └── icon.svg      # Favicon / PWA Icon
```

## Contributing and Versioning
This project strictly follows **Semantic Versioning (SemVer)** and pairs it with **Conventional Commits** to automate version management. All internal development rules and constraints can be found in the `.agent/rules` folder.

- The primary tracking branch is `develop`. No direct commits to `main` or `develop`.
- Features, fixes, and chores should be branched off `develop` (e.g., `feature/task-name`, `fix/bug-name`) and merged back via Pull Request.

> **Note:** As established by the project rules, ALL documentation, code, and commits must be exclusively in **English**.
