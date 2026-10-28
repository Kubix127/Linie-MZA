window.MZAComponents = window.MZAComponents || {};

window.MZAComponents.MapControls = function MapControls({
    hasSelection,
    multiSelect,
    isInfoPanelOpen,
    onToggleMultiSelect,
    onReset,
    onToggleInfoPanel
}) {
    return (
        <>
            <button
                id="toggleFilterBtn"
                className="menu-button"
                type="button"
                title="Włącz lub wyłącz wybór wielu zajezdni"
                aria-label="Włącz lub wyłącz wybór wielu zajezdni"
                aria-pressed={multiSelect}
                onClick={onToggleMultiSelect}
            >
                <span className="btn-icon">☰</span>
            </button>
            <button
                id="resetLayersBtn"
                className={`reset-filter-btn${hasSelection ? " visible" : ""}`}
                type="button"
                onClick={onReset}
            >
                <span>Pokaż wszystkie zajezdnie</span>
                <span>✕</span>
            </button>
            <button
                id="toggleInfoBtn"
                className="menu-button"
                type="button"
                title={isInfoPanelOpen ? "Ukryj panel informacji" : "Pokaż panel informacji"}
                aria-label={isInfoPanelOpen ? "Ukryj panel informacji" : "Pokaż panel informacji"}
                aria-pressed={isInfoPanelOpen}
                onClick={onToggleInfoPanel}
            >
                <span className="btn-icon">{isInfoPanelOpen ? "❯" : "❮"}</span>
            </button>
        </>
    );
};
