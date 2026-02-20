# **Functional Requirements Document (FRD)**

**Product:** Concrete Mix and Construction Materials Calculator

**Status:** Initial Draft

**Date:** February 20, 2026

## **System Overview**

The system is a static web application (Single Page Application - SPA) focused exclusively on the front-end (Client-side). All mathematical processing will be performed in the user's browser using JavaScript (Vanilla JS or a lightweight framework). There will be no communication with a database, external APIs (in the MVP), or authentication systems.

## **Architecture and Technologies**

* **Front-end:** HTML5, CSS3 (using a utility framework like Tailwind CSS is recommended for agility), and JavaScript.
* **Hosting:** Static file server (e.g., Vercel, Netlify, GitHub Pages).
* **State Management:** No database persistence. (Optional: use of localStorage only to remember the user's last choice, such as the waste margin).

## **Functional Requirements (FRs)**

### **FR-01: Structure Type Selection (Mix)**

The system must allow the user to select the purpose of the concrete, which will define the material proportions (mix).

* **Input:** Single selection buttons (Radio buttons or selectable Cards).
* **Pre-defined Options (Base Mix: Cement : Sand : Gravel):**
  * Slab / Pillar / Beam (High strength): Mix 1 : 2 : 3
  * Subfloor / Sidewalk (Medium strength): Mix 1 : 3 : 4
  * Foundation / Footing (High strength): Mix 1 : 2.5 : 4
* **Behavior:** When changing the selection, the calculations (FR-05) must be instantly redone.

### **FR-02: Dimensions Input**

The system must allow the input of measurements to calculate the volume.

* **Mode 1 (Dimensions):** Three numeric fields (Width, Length, Thickness) in meters.
* **Mode 2 (Direct Volume):** A single numeric field (Total volume in m³), in case the user already knows this information.
* **Behavior:** The system must have a toggle to switch between Mode 1 and Mode 2. Only the fields of the active mode should be visible.

### **FR-03: Waste Margin**

The system must apply a safety margin to the calculated total.

* **Input:** Numeric field (percentage).
* **Default Value:** 10%.
* **Behavior:** The value must be a multiplier at the end of the volume calculation.

### **FR-04: Real-Time Processing**

The system must not have a "Calculate" button.

* **Behavior:** On every value change in any input field (oninput or onchange events in JavaScript), the calculation function must be triggered, instantly updating the results screen.

### **FR-05: Calculation Logic (Business Rules)**

The math is based on the standard yield of the materials.

* **Assumed Constants:**
  * 1 Bag of Cement = 50 kg (~36 liters of real volume in the mix).
  * 1 Measuring Can = 18 liters.
  * Concrete shrinkage factor: ~30% (dry materials lose volume when mixed with water). *Dev note: the formula must calculate the apparent volume of dry materials by multiplying the desired wet concrete volume by 1.3.*
* **Algorithm Step-by-Step:**
  1. Calculate Desired Volume (VD) = Width * Length * Thickness (or capture directly from Mode 2).
  2. Apply Waste Margin (VDP) = VD + (VD * Margin%).
  3. Calculate Volume of Dry Materials (VMS) = VDP * 1.3.
  4. Sum the parts of the selected Mix (e.g., 1:2:3 = 6 total parts).
  5. Calculate the volume of 1 part = VMS / Total Parts.
  6. **Cement:** Multiply 1 part by the cement proportion. Convert the volume to kg and then divide by 50 to get the number of bags (round up - Math.ceil).
  7. **Sand and Gravel:** Multiply 1 part by the respective proportions. The result is in m³. For cans, divide the result in liters by 18.
  8. **Water:** Apply the standard Water/Cement ratio (e.g., 30 liters per 50kg bag of cement, depending on the mix).

### **FR-06: Display Results**

The system must clearly display the shopping list.

* **Visual Outputs:**
  * Cement: X bags (50kg).
  * Sand: Y m³ (or Z 18L cans).
  * Gravel: W m³ (or K 18L cans).
  * Water: L liters.
* **Behavior:** If the input fields are empty or zero, the results section should display "0" or an instructional Empty State, such as "Fill in the measurements above to see the materials list".

### **FR-07: Data Export (Copy to Clipboard)**

The user must be able to easily extract the data from the browser.

* **Element:** "Copy List" button or copy icon.
* **Behavior:** Upon clicking, JavaScript triggers the navigator.clipboard.writeText() API with the following plain text format (ideal for WhatsApp):
  ```
  🏗️ Concrete Materials List
  - Structure: [Structure Name]
  - Calculated Volume: [X] m³ (with [Y]% waste)

  🛒 To Buy:
  - Cement (50kg): [X] bags
  - Sand: [Y] m³ ([Z] cans)
  - Gravel: [W] m³ ([K] cans)
  - Water: [L] liters
  ```
* **Feedback:** The button must change color or text (e.g., "Copied!") for 2 seconds after a successful action.

## **User Interface (UI) Requirements**

* **Typography and Fields:** Text in a legible size (minimum 16px). Numeric fields with `type="number", inputmode="decimal"`, and `pattern="[0-9]*"` to force the numeric keypad to open on smartphones.
* **Layout:** Single-column structure (100% width) divided into two clear visual panels or blocks: "Project Data" (top) and "Materials List" (below or fixed at the footer).

## **Non-Functional Requirements (NFRs)**

* **Performance:** The page must load (First Contentful Paint) in less than 1.5 seconds on 3G networks (limiting the use of heavy libraries and large images).
* **Accessibility:** High contrast between background color and text (minimum 4.5:1 ratio).
* **Offline-Ready:** Optionally, a simple Service Worker can be configured (turning it into a basic PWA) so the calculator works even if the phone loses signal on the construction site after the initial load.