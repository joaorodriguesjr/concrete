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
        sandCans: sandCans.toFixed(2),
        gravelCans: gravelCans.toFixed(2),
        waterLiters: waterLiters.toFixed(2),
        hasVolume: true,
        totalVolume: vdp
    };
}

function renderResults(results) {
    const emptyState = document.getElementById('empty-state');
    const resultsPanel = document.getElementById('calculation-results');

    if (results.hasVolume) {
        emptyState.style.display = 'none';
        resultsPanel.style.display = 'block';

        // For Epic 1, we just show something to prove it's working
        document.getElementById('res-cement').textContent = results.cementBags || '-';
        document.getElementById('res-sand').textContent = results.sandCans || '-';
        document.getElementById('res-gravel').textContent = results.gravelCans || '-';
        document.getElementById('res-water').textContent = results.waterLiters || '-';
    } else {
        emptyState.style.display = 'block';
        resultsPanel.style.display = 'none';
    }
}

function copyToClipboard() {
    // Builds formatted string and copies to the clipboard
    try {
        const text = `Calculated Materials...`;
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copied to clipboard');
        });
    } catch (err) {
        console.error('Failed to copy', err);
    }
}

function calculateAndRender() {
    const inputs = getInputs();
    const results = calculateMaterials(inputs);
    renderResults(results);
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
