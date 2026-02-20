# **Product Requirements Document (PRD)**

**Product:** Concrete Mix and Construction Materials Calculator

**Status:** Initial Draft

**Date:** February 20, 2026

## **Product Overview**

The "Concrete Mix Calculator" is a single-page web application (SPA) designed for mobile devices. Its goal is to allow construction professionals to quickly calculate the exact amount of materials (cement, sand, gravel, and water) needed for different types of concrete work, without the need for complex spreadsheets, logins, or a constant internet connection.

## **Problem and Opportunity**

**The Problem:** Currently, material calculations on construction sites are done in the head (prone to errors and waste) or using Excel spreadsheets. The construction site environment (sun, dust, urgency) makes manipulating spreadsheets on mobile screens a frustrating, slow experience that is prone to accidental taps.

**The Opportunity:** Create a tool focused on usability (Mobile-First), with large buttons and straightforward flows. By eliminating the need for a database and authentication, we reduce usage friction to zero. The user accesses the URL, enters three or four pieces of data, and gets the answer instantly.

## **Target Audience (Personas)**

* **Foreman / Bricklayer:** Professional who is "hands-on". Needs to know how many bags of cement to order from the construction materials store before noon. Values clean screens, large buttons, and zero unnecessary jargon.
* **Civil Engineer / Architect (Budgeting Phase):** Professional on the go who needs to do a quick material quantity takeoff to give a cost estimate to the client.
* **DIY (Do It Yourself) Audience:** Everyday people doing small home renovations who do not know the correct proportion to mix concrete.

## **Goals and Success Metrics**

### **Goals**

* Provide an accurate material calculation based on standard engineering norms for concrete mixes.
* Ensure a fluid user experience on smartphones, even with unstable 3G internet connections.
* Serve as a utility tool that generates organic traffic and word-of-mouth sharing.

### **Success Metrics**

* **Completion Rate:** Percentage of users who fill in the data and generate the result (target: \> 80%).
* **Time on Task:** Average time from page load to viewing the result (target: \< 30 seconds).
* **Bounce Rate:** Homepage bounce rate (target: \< 40%).

## **Product Scope**

### **In-Scope (MVP)**

* Interface optimized for mobile devices (Mobile-First).
* Selection of the type of concrete application (e.g., subfloor, slab, foundation/footing).
* Data entry for volume (in cubic meters) or dimensions (width x length x thickness).
* Field to include waste/loss margin (e.g., 5%, 10%).
* 100% client-side (JavaScript) processing of the mix proportions.
* Display of the result in practical commercial units (50kg bags of cement, 18L cans of sand/gravel, cubic meters, liters of water).
* Button to copy the result to the clipboard (for quick sharing via WhatsApp).

### **Out-of-Scope (Not doing right now)**

* Account creation and user login.
* Database to save calculation or project history.
* Integration with construction materials stores for real-time pricing.
* Calculation of reinforcing steel (rebar) or wooden formwork.

## **Core Use Cases**

**Use Case 1: Calculating material for a slab**

1. The user accesses the site via mobile phone.
2. Selects the "Slab" option (which defines a higher strength mix, e.g., 1:2:3).
3. Enters the width (4m), length (5m), and thickness (0.10m).
4. The system automatically calculates the volume (2 m³).
5. The user adds a 10% waste margin.
6. The screen instantly displays: X bags of cement, Y m³ of sand, Z m³ of gravel, and W liters of water.
7. The user clicks "Copy to WhatsApp" and sends the list to the supplier.

## **UI/UX Requirements**

* **Design System:** Minimalist, focused on high contrast for readability in sunlight.
* **Inputs:** Use of native mobile numeric keypads (type="number" in HTML) to make typing easier.
* **Visual Feedback:** Real-time updating of results as the user types (no "Calculate" button needed).
* **Accessibility:** Large texts, legible fonts, and buttons with a minimum touch area of 48x48 pixels.