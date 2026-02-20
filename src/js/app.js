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

    // Initialize icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Initial calculation
    calculateAndRender();
}

function getInputs() {
    const selectedMixNode = document.querySelector('input[name="mix"]:checked');
    const widthNode = document.getElementById('width');
    const lengthNode = document.getElementById('length');

    return {
        selectedMix: selectedMixNode ? selectedMixNode.value : 'high_strength',
        width: parseFloat(widthNode.value) || 0,
        length: parseFloat(lengthNode.value) || 0,
        // Placeholders for future stories
        thickness: 0.1,
        wasteMargin: 5
    };
}

function calculateMaterials(inputs) {
    // Initial implementation for Epic 1: just return the mix name for now
    // Full algorithm will be in Epic 3
    const mix = CONCRETE_MIXES[inputs.selectedMix];

    return {
        mixName: mix ? mix.name : '-',
        cementBags: 0,
        sandCans: 0,
        gravelCans: 0,
        waterLiters: mix ? mix.waterPerBag : 0,
        hasVolume: inputs.width > 0 && inputs.length > 0
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
