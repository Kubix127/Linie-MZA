window.MZAComponents = window.MZAComponents || {};

function BusFilter({ buses, filteredBuses, onBusFilterChange }) {
    return (
        <window.MZAComponents.InfoCard label="Autobusy" className="bus-container">
            {Object.entries(buses).map(([bus, amount]) => (
                <label
                    key={bus}
                    className="badge badge-bus"
                >
                    <input
                        type="checkbox"
                        checked={filteredBuses.includes(bus)}
                        onChange={() => window.MZA.handleListSelection(onBusFilterChange, bus)}
                    />
                    {bus} ({amount})
                </label>
            ))}
        </window.MZAComponents.InfoCard>
    )
}

function LineFilter({ lines, filteredLines, onLineFilterChange }) {
    return (
        <window.MZAComponents.InfoCard 
            label={`Linie Autobusowe - (${lines.length})`}
            className="line-container">
            {lines.map((line) => (
                <label 
                    key={line} 
                    className={`badge badge-line${filteredLines.includes(line) ? " selected" : ""}`}
                    onClick={() => window.MZA.handleListSelection(onLineFilterChange, line)}
                >
                    {line}
                </label>
            ))}
        </window.MZAComponents.InfoCard>
    )
}

function ResetFiltersButton({ onReset, disabled }) {
    return (
        <div className="filter-header-actions">
            <button className="clear-filters-btn" type="button" onClick={onReset} disabled={disabled}>
                Wyczyść filtry
            </button>
        </div>
    )
}





window.MZAComponents.FilterPanel = function FilterPanel({ 
    depots, 
    filteredBuses, 
    onBusFilterChange, 
    filteredLines, 
    onLineFilterChange,
    onResetFilters,
    isOpen, 
    onClose 
}) {
    const title = "Filtruj linie";
    const summary = window.MZA.summarizeDepots(depots); 
    console.log("summary", summary);
    const content = (
    <>
        <ResetFiltersButton
            onReset={onResetFilters}
            disabled={filteredBuses.length === 0 && filteredLines.length === 0}
        />
        <BusFilter 
            buses={summary.buses}
            filteredBuses={filteredBuses}
            onBusFilterChange={onBusFilterChange}
        /> 
        <LineFilter 
            lines={summary.lines}
            filteredLines={filteredLines}
            onLineFilterChange={onLineFilterChange}
        /> 
    </> || ("Ładowanie filtrów...")
    );

    return (
        <div
            id="filter-panel"
            className={`panel filter-panel${isOpen ? " open" : ""}`}
            aria-hidden={!isOpen}
        >
            <div className="banner">
                <button id="filter-panel-close-btn" className="close-btn" type="button" onClick={onClose} aria-label="Zamknij panel">
                    ✕
                </button>
                <h2 id="panel-title">{title}</h2>
                <div className="bottom-line" />
            </div>
            <div id="panel-content">{content}</div>
        </div>
    );
}
