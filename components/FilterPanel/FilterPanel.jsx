window.MZAComponents = window.MZAComponents || {};

function BusFilter({ buses, filteredBuses, onBusFilterChange }) {
    return (
        <window.MZAComponents.InfoCard label="Autobusy" icon="bus" className="bus-container">
            {Object.keys(buses).map((bus) => (
                <label
                    key={bus}
                    className={`badge badge-bus ${busTypes.includes(bus) ? "grid-cell-2" : ""}`}
                    >
                    <input
                        type="checkbox"
                        checked={filteredBuses.includes(bus)}
                        onChange={() => onBusFilterChange(window.MZA.toggleListSelection(filteredBuses, bus))}
                    />
                    {bus}
                </label>
            ))}
        </window.MZAComponents.InfoCard>
    )
}

function LineFilter({ lines, filteredLines, onLineFilterChange }) {
    return (
        <window.MZAComponents.InfoCard 
            label={`Linie Autobusowe - (${lines.length})`}
            icon="route"
            className="line-container">
            {lines.map((line) => (
                <label 
                    key={line} 
                    className={`badge badge-line${filteredLines.includes(line) ? " selected" : ""}`}
                    onClick={() => onLineFilterChange(window.MZA.toggleListSelection(filteredLines, line))}
                >
                    {line}
                </label>
            ))}
        </window.MZAComponents.InfoCard>
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
    const content = (
    <>
        <span className="panel-text">
            {`Aktywne filtry linii: ${filteredLines.length}`}
        </span>
        <window.MZAComponents.ResetButton
            onReset={onResetFilters}
            disabled={filteredBuses.length === 0 && filteredLines.length === 0}
            label="Wyczyść filtry"
        />
        <hr/>
        <BusFilter 
            buses={summary.buses}
            filteredBuses={filteredBuses}
            onBusFilterChange={onBusFilterChange}
        /> 
        <hr/>
        <LineFilter 
            lines={summary.lines}
            filteredLines={filteredLines}
            onLineFilterChange={onLineFilterChange}
        /> 
    </>
    );

    return (
        <div
            id="filter-panel"
            className={`panel filter-panel${isOpen ? " open" : ""}`}
            aria-hidden={!isOpen}
        >
            <div className="banner">
                <div className="panel-heading">
                    <window.MZAComponents.Icon name="filter" size={22} />
                    <h2 className="panel-title">{title}</h2>
                </div>
                <window.MZAComponents.CloseButton
                    onClose={onClose}
                />
                <div className="bottom-line" />
            </div>
            <div className="panel-content">{content}</div>
        </div>
    );
}
