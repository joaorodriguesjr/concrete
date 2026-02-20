/**
 * Main application logic, event listeners and calculations
 * Architecture: Static Client-Side Rendering with Vanilla JavaScript
 */

function initApp() {
    // Add Event Listeners ('input', 'change') to all form fields and radio buttons.
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', calculateAndRender);
        input.addEventListener('change', calculateAndRender);
    });

    // Toggle Logic for calculation mode
    const modeRadios = document.querySelectorAll('input[name="calc-mode"]');
    modeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const mode = e.target.value;
            const dimSection = document.getElementById('dimensions-inputs');
            const volSection = document.getElementById('volume-inputs');

            if (mode === 'dimensions') {
                dimSection.classList.remove('hidden');
                volSection.classList.add('hidden');
            } else {
                dimSection.classList.add('hidden');
                volSection.classList.remove('hidden');
            }
            calculateAndRender();
        });
    });

    // Load persisted Waste Margin
    const persistedMargin = localStorage.getItem('waste-margin');
    if (persistedMargin) {
        document.getElementById('waste-margin').value = persistedMargin;
    }

    // Persist and validate Waste Margin on change
    document.getElementById('waste-margin').addEventListener('change', (e) => {
        const val = parseFloat(e.target.value);
        if (val >= 5 && val <= 20) {
            localStorage.setItem('waste-margin', e.target.value);
        }
    });

    // Initialize icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Initial calculation
    calculateAndRender();
}

function getInputs() {
    const selectedMixNode = document.querySelector('input[name="mix"]:checked');
    const calcModeNode = document.querySelector('input[name="calc-mode"]:checked');
    const widthNode = document.getElementById('width');
    const lengthNode = document.getElementById('length');
    const thicknessNode = document.getElementById('thickness');
    const directVolumeNode = document.getElementById('direct-volume');
    const wasteMarginNode = document.getElementById('waste-margin');
    const marginErrorNode = document.getElementById('margin-error');

    const wasteMargin = parseFloat(wasteMarginNode.value) || 0;
    const isMarginValid = wasteMargin >= 5 && wasteMargin <= 20;

    // UI Validation Feedback
    if (!isMarginValid) {
        wasteMarginNode.classList.add('invalid');
        marginErrorNode.classList.remove('hidden');
    } else {
        wasteMarginNode.classList.remove('invalid');
        marginErrorNode.classList.add('hidden');
    }

    // Default values for Story 003
    return {
        selectedMix: selectedMixNode ? selectedMixNode.value : 'high_strength',
        calculationMode: calcModeNode ? calcModeNode.value : 'dimensions',
        width: parseFloat(widthNode.value) || 0,
        length: parseFloat(lengthNode.value) || 0,
        thickness: parseFloat(thicknessNode.value) || 0,
        directVolume: parseFloat(directVolumeNode.value) || 0,
        wasteMargin: wasteMargin,
        isMarginValid: isMarginValid
    };
}

function calculateMaterials(inputs) {
    const mix = CONCRETE_MIXES[inputs.selectedMix];

    // If margin is invalid, block calculation as per Story 005
    if (!inputs.isMarginValid) {
        return { hasVolume: false };
    }

    // 1. VD = Actual Volume (Desired Volume)
    let vd = 0;
    if (inputs.calculationMode === 'dimensions') {
        vd = inputs.width * inputs.length * inputs.thickness;
    } else {
        vd = inputs.directVolume;
    }

    if (vd <= 0) {
        return { hasVolume: false };
    }

    // 2. VDP = VD + Waste (Volume with Waste Margin)
    const vdp = vd * (1 + (inputs.wasteMargin / 100));

    // 3. VMS = VDP * 1.3 (Volume of Dry Materials with Shrinkage Factor)
    const vms = vdp * CONSTANTS.SHRINKAGE_FACTOR;

    // 4. Proportion splitting
    const props = mix.proportions;
    const totalParts = props.cement + props.sand + props.gravel;

    // Volumes in m³
    const volCement = (vms * props.cement) / totalParts;
    const volSand = (vms * props.sand) / totalParts;
    const volGravel = (vms * props.gravel) / totalParts;

    // 5. Cement quantities (50kg bags)
    // Respecting Apparent Specific Mass correction by dividing by 1.2
    // formula: (Volume_m3 * 1000 liters/m3 * 1.2 correction) / 50kg/bag
    const cementBags = Math.ceil((volCement * 1000 * 1.2) / CONSTANTS.CEMENT_BAG_WEIGHT_KG);

    // 6. Sand and Gravel in 18L cans
    const sandCans = (volSand * 1000) / CONSTANTS.CAN_VOLUME_LITERS;
    const gravelCans = (volGravel * 1000) / CONSTANTS.CAN_VOLUME_LITERS;

    // 7. Water volume in liters
    const waterLiters = cementBags * mix.waterPerBag;

    return {
        mixName: mix ? mix.name : '-',
        cementBags: cementBags,
        sandM3: volSand.toFixed(3),
        sandCans: Math.ceil(sandCans),
        gravelM3: volGravel.toFixed(3),
        gravelCans: Math.ceil(gravelCans),
        waterLiters: Math.ceil(waterLiters),
        hasVolume: true,
        totalVolume: vdp.toFixed(3),
        wasteMargin: inputs.wasteMargin
    };
}

function renderResults(results, inputs) {
    const resultsMsg = document.getElementById('results-messages');
    const msgText = document.getElementById('results-msg-text');
    const resultsPanel = document.getElementById('calculation-results');

    // story_009: Empty & Partial States logic
    let stateMessage = "";
    let isPartial = false;

    if (inputs.calculationMode === 'dimensions') {
        const hasWidth = inputs.width > 0;
        const hasLength = inputs.length > 0;
        const hasThickness = inputs.thickness > 0;

        if (!hasWidth && !hasLength && !hasThickness) {
            stateMessage = "Fill in the measurements above to see the materials list";
        } else if (!hasWidth || !hasLength || !hasThickness) {
            stateMessage = "Fill in all three dimensions to calculate";
            isPartial = true;
        }
    } else {
        if (inputs.directVolume <= 0) {
            stateMessage = "Fill in the total volume to see the materials list";
        }
    }

    if (results.hasVolume && !isPartial) {
        resultsMsg.style.display = 'none';
        resultsPanel.style.display = 'block';

        // story_008: Display with commercial units
        document.getElementById('res-cement').textContent = results.cementBags;
        document.getElementById('res-sand-m3').textContent = results.sandM3;
        document.getElementById('res-sand-cans').textContent = results.sandCans;
        document.getElementById('res-gravel-m3').textContent = results.gravelM3;
        document.getElementById('res-gravel-cans').textContent = results.gravelCans;
        document.getElementById('res-water').textContent = results.waterLiters;
    } else {
        resultsMsg.style.display = 'block';
        msgText.textContent = stateMessage || "Enter dimensions to see results.";
        resultsPanel.style.display = 'none';
    }
}

function copyToClipboard() {
    const inputs = getInputs();
    const results = calculateMaterials(inputs);

    if (!results.hasVolume) return;

    // story_010: Formatted text for export
    const text = `
🚧 *Concrete Mix Results* 🚧
---------------------------
📍 Structure: ${results.mixName}
📐 Total Volume: ${results.totalVolume} m³ (inc. ${results.wasteMargin}% waste)

🛒 *Shopping List:*
- Cement: ${results.cementBags} bags (50kg)
- Sand: ${results.sandM3} m³ (${results.sandCans} cans)
- Gravel: ${results.gravelM3} m³ (${results.gravelCans} cans)
- Water: ${results.waterLiters} Liters

*Calculated via Concrete Mix Calculator*
    `.trim();

    try {
        navigator.clipboard.writeText(text).then(() => {
            showToast("Copied to clipboard!");
        }).catch(err => {
            console.error('Failed to copy: ', err);
            // Fallback for some browsers
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                showToast("Copied to clipboard!");
            } catch (e) {
                alert("Failed to copy. Please copy manually.");
            }
            document.body.removeChild(textArea);
        });
    } catch (err) {
        console.error('Clipboard API failed', err);
    }
}

function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }

    toast.innerHTML = `<i data-lucide="check-circle" style="width: 18px; height: 18px;"></i> ${message}`;
    if (typeof lucide !== 'undefined') lucide.createIcons({ attrs: { 'data-lucide': 'check-circle' } });

    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

function calculateAndRender() {
    const inputs = getInputs();
    const results = calculateMaterials(inputs);
    renderResults(results, inputs);
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initApp();

    // Register Service Worker for PWA (story_011)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js').then(registration => {
                console.log('SW registered: ', registration);
            }).catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
        });
    }

    // Bind copy button (story_010)
    const copyBtn = document.getElementById('copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyToClipboard);
    }
});
