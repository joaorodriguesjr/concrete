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

    // Base volume calculation
    let baseVolume = 0;
    if (inputs.calculationMode === 'dimensions') {
        baseVolume = inputs.width * inputs.length * inputs.thickness;
    } else {
        baseVolume = inputs.directVolume;
    }

    // Apply Waste Margin: VDP = VD + (VD * Margin%)
    const volumeWithWaste = baseVolume * (1 + (inputs.wasteMargin / 100));

    return {
        mixName: mix ? mix.name : '-',
        cementBags: 0,
        sandCans: 0,
        gravelCans: 0,
        waterLiters: mix ? mix.waterPerBag : 0,
        hasVolume: baseVolume > 0,
        totalVolume: volumeWithWaste
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
