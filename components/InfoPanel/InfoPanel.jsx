window.MZAComponents = window.MZAComponents || {};


function BusList({ buses }) {
    return (
        <div className="bus-container">
            {Object.entries(buses).map(([name, amount]) => (
                <label
                    key={name}
                    className={`badge badge-bus ${busTypes.includes(name) ? "grid-cell-2" : ""}`}
                >
                    {name}: {amount}
                </label>
            ))}
        </div>
    );
}

function LineList({ lines, filteredLines, onLineFilterChange }) {
    return (
        <div className="line-container">
            {lines.map((line) => (
                <span
                    className={`badge badge-line${filteredLines.includes(line) ? " selected" : ""}`}
                    key={line}
                    onClick={() => onLineFilterChange(window.MZA.toggleListSelection(filteredLines, line))}
                >
                    {line}
                </span>
            ))}
        </div>
    );
}

function DepotDetails({ depot, filteredLines, onLineFilterChange, onResetFilters, filtersResetDisabled }) {
    const { info } = depot;

    return (
        <>
            <window.MZAComponents.ResetButton
                onReset={onResetFilters}
                disabled={filtersResetDisabled}
                label="Wyczyść wybrane zajezdnie"
            />
            <hr/>
            <window.MZAComponents.InfoCard 
                label={
                    `Autobusy - 
                        ${Object.entries(info.buses)
                        .filter(([name]) => !busTypes.includes(name))
                        .reduce((sum, [_, value]) => sum + value, 0)}
                    `
                } 
                icon="bus"
            >
                <BusList buses={info.buses} />
            </window.MZAComponents.InfoCard>
            <hr/>
            <window.MZAComponents.InfoCard 
                label={`Obsługiwane linie - ${info.lines.length}`} 
                icon="route"
            >
                <LineList 
                    lines={info.lines} 
                    filteredLines={filteredLines}  
                    onLineFilterChange={onLineFilterChange} 
                />
            </window.MZAComponents.InfoCard>
            {info.image && (
                <img
                    src={info.image}
                    className="panel-image"
                    alt={`Zajezdnia ${depot.name}`}
                />
            )}
        </>
    );
}

function CombinedDepotDetails({ summary, filteredLines, onLineFilterChange, onResetFilters, filtersResetDisabled }) {
    return (
        <>
            <window.MZAComponents.ResetButton
                onReset={onResetFilters}
                disabled={filtersResetDisabled}
                label="Wyczyść wybrane zajezdnie"
            />
            <window.MZAComponents.InfoCard label="Autobusy" icon="bus"><BusList buses={summary.buses} /></window.MZAComponents.InfoCard>
            <window.MZAComponents.InfoCard label="Obsługiwane linie" icon="route"><LineList lines={summary.lines} filteredLines={filteredLines} onLineFilterChange={onLineFilterChange} /></window.MZAComponents.InfoCard>
        </>
    );
}

window.MZAComponents.InfoPanel = function InfoPanel({
    depots,
    selectedDepots,
    filteredLines,
    onLineFilterChange,
    onResetFilters,
    filtersResetDisabled,
    isOpen,
    onClose
}) {
    let title = "Zajezdnia";
    let content = 
        <span className="panel-text">
            Wybierz zajezdnię na mapie.
        </span>;

    if (selectedDepots.length === 1) {
        const depot = depots[selectedDepots[0]];
        title = depot.name;
        content = (
            <DepotDetails
                depot={depot}
                filteredLines={filteredLines}
                onLineFilterChange={onLineFilterChange}
                onResetFilters={onResetFilters}
                filtersResetDisabled={filtersResetDisabled}
            />
        );
    } else if (selectedDepots.length > 1) {
        const summary = window.MZA.summarizeDepots(depots, selectedDepots);
        title = summary.title;
        content = <CombinedDepotDetails summary={summary} filteredLines={filteredLines} onLineFilterChange={onLineFilterChange} onResetFilters={onResetFilters} filtersResetDisabled={filtersResetDisabled} />;
    };

    return (
        <div
            id="info-panel"
            className={`panel info-panel${isOpen ? " open" : ""}`}
            aria-hidden={!isOpen}
            inert={isOpen ? undefined : ""}
        >
            <div className="banner">
                                <window.MZAComponents.CloseButton
                    onClose={onClose}
                />
                <div className="panel-heading">
                    <window.MZAComponents.Icon name="depot" size={22} />
                    <h2 className="panel-title">{title}</h2>
                </div>
                <div className="bottom-line right" />
            </div>
            <div className="panel-content">{content}</div>
        </div>
    );
}
