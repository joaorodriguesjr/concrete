# **Technical Requirements Document (TRD)**

**Product:** Concrete Mix and Construction Materials Calculator

**Status:** Initial Draft

**Date:** February 20, 2026

## **System Architecture**

The application will follow a pure static **Client-Side Rendering (CSR)** architecture, without a back-end. The entire application state will be transient (managed in the browser's memory during the session) and interface updates will occur reactively through direct DOM manipulation using Vanilla JavaScript.

## **Technology Stack**

To ensure maximum loading speed and ease of maintenance, the MVP will not use heavy JS frameworks (like React or Angular) or complex build processes.

* **Structural Language:** Semantic HTML5.
* **Styling:** Pure CSS (Vanilla).
* **Logic and Interactivity:** Vanilla JavaScript (ES6+).
* **Icons:** Lucide Icons (via CDN) or inline SVG to reduce HTTP requests.
* **Hosting:** Cloudflare Pages.

## **Directory Structure**

The application can be built in a single file (for testing) or separated as follows for better organization:

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

## **Data Structures and Constants (data.js)**

The concrete mix rules will be stored as an array of JSON objects to facilitate future expansion.

```javascript
const CONCRETE_MIXES = {
  high_strength: {
    id: 'high_strength',
    name: 'Slab / Pillar / Beam',
    proportions: { cement: 1, sand: 2, gravel: 3 },
    waterPerBag: 30
  },
  medium_strength: {
    id: 'medium_strength',
    name: 'Subfloor / Sidewalk',
    proportions: { cement: 1, sand: 3, gravel: 4 },
    waterPerBag: 35
  },
  foundation: {
    id: 'foundation',
    name: 'Foundation / Footing',
    proportions: { cement: 1, sand: 2.5, gravel: 4 },
    waterPerBag: 32
  }
}

const CONSTANTS = {
  CEMENT_BAG_WEIGHT_KG: 50,
  CAN_VOLUME_LITERS: 18,
  SHRINKAGE_FACTOR: 1.3
}
```

## **Main Functions Specification (app.js)**

JavaScript must follow a basic modular pattern, separating input capture, mathematical calculation, and rendering (UI update).

### **initApp()**

* **Objective:** Initialize the application.
* **Action:** Add Event Listeners ('input', 'change') to all form fields and radio buttons. Any event triggers the `calculateAndRender()` function.

### **getInputs()**

* **Objective:** Read and sanitize values from the DOM.
* **Return:** Object with `{ selectedMix, calculationMode, width, length, thickness, directVolume, wasteMargin }`.
* **Handling:** Convert strings to floats and treat empty fields as 0.

### **calculateMaterials(inputs)**

* **Objective:** Implement the FR-05 algorithm.
* **Logic:**
  1. `actualVolume` = (mode == 'dimensions') ? (W * L * T) : directVolume;
  2. `volumeWithWaste` = actualVolume * (1 + (wasteMargin / 100));
  3. `dryVolume` = volumeWithWaste * CONSTANTS.SHRINKAGE_FACTOR;
  4. `totalParts` = sum of the current mix proportions.
  5. `volumeOnePart` = dryVolume / totalParts;
  6. **Cement:** `bags` = Math.ceil((volumeOnePart * prop.cement * 1000) / (CONSTANTS.CEMENT_BAG_WEIGHT_KG / 1.2)) *Note: Cement density adjustment in volume to weight conversion.*
  7. **Sand and Gravel:** `m3` = volumeOnePart * respective prop; `cans` = (m3 * 1000) / CONSTANTS.CAN_VOLUME_LITERS.
* **Return:** Object with the final calculated quantities.

### **renderResults(results)**

* **Objective:** Update specific HTML tags with the calculated values.
* **Action:** Select elements by ID (e.g. `document.getElementById('res-cement')`) and inject text using `textContent` or `innerHTML`. Toggle visibility of the "Empty State" based on whether `actualVolume` > 0.

### **copyToClipboard()**

* **Objective:** Execute FR-07.
* **Action:** Build the formatted string using Template Literals (\`) and use `navigator.clipboard.writeText(text)`. Implement a try...catch block to handle browsers that do not support the API, displaying an alert or visual notification of success/error.

## **UI/UX and DOM Requirements**

* **Numeric Inputs:** To ensure the correct keyboard on iOS and Android, use:
  `<input type="number" inputmode="decimal" pattern="[0-9]*" min="0" step="0.01">`

* **Performance:** The input event fires frequently. Since the calculations are simple, a *debounce* will likely not be necessary, but should be considered if performance on very old phones degrades.

## **Deployment Strategy and CI/CD**

1. The code will be hosted in a Git repository (e.g. GitHub).
2. The `main` branch will be connected to Cloudflare Pages.
3. Any push to `main` will trigger automatic deployment.
4. Optional (Future): Add a `manifest.json` file and a basic Service Worker (`sw.js`) using the *Cache-First* strategy to turn the site into an installable PWA (Progressive Web App) that works offline on the construction site.