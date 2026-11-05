window.MZAComponents = window.MZAComponents || {};

window.MZAComponents.Header = function Header({
    isInfoPanelOpen,
    isFilterPanelOpen,
    onToggleInfoPanel,
    onToggleFilterPanel,
    multiSelect, 
    onMultiSelectChange,
    isLegendVisible,
    onToggleLegend
}) {
    return (
        <div className="header">
            <div className="header-content">
                <div className="brand">
                    <span className="brand-mark">
                        <window.MZAComponents.Icon name="bus" size={32} />
                    </span>
                    <span className="brand-name">MZA Zajezdnie</span>
                </div>
                <button
                    id="toggleFilterBtn"
                    className="menu-button interactive-control"
                    type="button"
                    title={isFilterPanelOpen ? "Ukryj panel filtrów" : "Pokaż panel filtrów"}
                    aria-label={isFilterPanelOpen ? "Ukryj panel filtrów" : "Pokaż panel filtrów"}
                    aria-pressed={isFilterPanelOpen}
                    onClick={onToggleFilterPanel}
                >
                    <window.MZAComponents.Icon name="filter" />
                    <span className="menu-label">Filtrowanie</span>
                </button>
            </div>

            <div className="header-content right">
                <label className="selection-toggle">
                    <window.MZAComponents.Icon name="layers" />
                    <input
                        type="checkbox"
                        checked={multiSelect}
                        onChange={(event) => onMultiSelectChange(event.target.checked)}
                    />
                    <span className="selection-label">Wybór wielu zajezdni</span>
                </label>
                <button
                    className="menu-button interactive-control"
                    type="button"
                    title={isLegendVisible ? "Ukryj informacje o mapie" : "Pokaż informacje o mapie"}
                    aria-label={isLegendVisible ? "Ukryj informacje o mapie" : "Pokaż informacje o mapie"}
                    aria-pressed={isLegendVisible}
                    onClick={onToggleLegend}
                >
                    <window.MZAComponents.Icon name="info" />
                    <span className="selection-label">Informacje</span>
                </button>
                <button
                    id="toggleInfoBtn"
                    className="menu-button interactive-control"
                    type="button"
                    title={isInfoPanelOpen ? "Ukryj panel zajezdni" : "Pokaż panel zajezdni"}
                    aria-label={isInfoPanelOpen ? "Ukryj panel zajezdni" : "Pokaż panel zajezdni"}
                    aria-pressed={isInfoPanelOpen}
                    onClick={onToggleInfoPanel}
                >
                    <window.MZAComponents.Icon name="depot" />
                    <span className="menu-label">Zajezdnie</span>
                    <window.MZAComponents.Icon name={isInfoPanelOpen ? "chevronRight" : "chevronLeft"} size={16} />
                </button>
            </div>
        </div>
    );
};
