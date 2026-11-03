window.MZAComponents = window.MZAComponents || {};

window.MZAComponents.MapControls = function MapControls({
    hasSelection,
    multiSelect,
    isInfoPanelOpen,
    isFilterPanelOpen,
    onToggleMultiSelect,
    onReset,
    onToggleInfoPanel,
    onToggleFilterPanel
}) {
    return (
        <>
            <button
                id="toggleFilterBtn"
                className="menu-button"
                type="button"
                title="Filtrowanie"
                aria-label="Filtrowanie"
                aria-pressed={isFilterPanelOpen}
                onClick={onToggleFilterPanel}
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
