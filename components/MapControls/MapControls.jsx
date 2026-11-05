window.MZAComponents = window.MZAComponents || {};

window.MZAComponents.MapControls = function MapControls({
    hasSelection,
    onReset,
}) {
    return (
        <button
            id="resetLayersBtn"
            className={`reset-filter-btn interactive-control${hasSelection ? " visible" : ""}`}
            type="button"
            onClick={onReset}
        >
            <window.MZAComponents.Icon name="reset" size={16} />
            <span>Pokaż wszystkie zajezdnie</span>
        </button>
    );
};
