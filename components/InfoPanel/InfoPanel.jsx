window.MZAComponents = window.MZAComponents || {};


function BusList({ buses }) {
    return (
        <div className="bus-container">
            {Object.entries(buses).map(([name, amount]) => (
                <label
                    key={name}
                    className="badge badge-bus"
                >
                    {name} ({amount})
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
                    onClick={() => window.MZA.handleListSelection(onLineFilterChange, line)}
                >
                    {line}
                </span>
            ))}
        </div>
    );
}

function DepotDetails({ depot, filteredLines, onLineFilterChange }) {
    const { info } = depot;

    return (
        <>
            <window.MZAComponents.InfoCard label="Lokalizacja">{info.address}</window.MZAComponents.InfoCard>
            <window.MZAComponents.InfoCard label="O oddziale">{info.description}</window.MZAComponents.InfoCard>
            <window.MZAComponents.InfoCard label={`Autobusy - (${Object.entries(info.buses).filter(([name]) => !["Elektryczne", "Nieelektryczne"].includes(name)).reduce((sum, [_, value]) => sum + value, 0)})`}><BusList buses={info.buses} /></window.MZAComponents.InfoCard>
            <window.MZAComponents.InfoCard label={`Obsługiwane linie - (${info.lines.length})`}><LineList lines={info.lines} filteredLines={filteredLines} onLineFilterChange={onLineFilterChange} /></window.MZAComponents.InfoCard>
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

function CombinedDepotDetails({ summary, filteredLines, onLineFilterChange }) {
    return (
        <>
            <window.MZAComponents.InfoCard label="Autobusy"><BusList buses={summary.buses} /></window.MZAComponents.InfoCard>
            <window.MZAComponents.InfoCard label="Obsługiwane linie"><LineList lines={summary.lines} filteredLines={filteredLines} onLineFilterChange={onLineFilterChange} /></window.MZAComponents.InfoCard>
        </>
    );
}

window.MZAComponents.InfoPanel = function InfoPanel({ depots, selectedDepots, filteredLines, onLineFilterChange, isOpen, onClose }) {
    let title = "Zajezdnia";
    let content = "Wybierz zajezdnię na mapie.";

    if (selectedDepots.length === 1) {
        const depot = depots[selectedDepots[0]];
        title = depot.name;
        content = <DepotDetails depot={depot} filteredLines={filteredLines} onLineFilterChange={onLineFilterChange} />;
    } else if (selectedDepots.length > 1) {
        const summary = window.MZA.summarizeDepots(depots, selectedDepots);
        title = summary.title;
        content = <CombinedDepotDetails summary={summary} filteredLines={filteredLines} onLineFilterChange={onLineFilterChange} />;
    };

    return (
        <div
            id="info-panel"
            className={`panel info-panel${isOpen ? " open" : ""}`}
            aria-hidden={!isOpen}
        >
            <div className="banner">
                <button id="info-panel-close-btn" className="close-btn" type="button" onClick={onClose} aria-label="Zamknij panel">
                    ✕
                </button>
                <h2 id="panel-title">{title}</h2>
                <div className="bottom-line" />
            </div>
            <div id="panel-content">{content}</div>
        </div>
    );
}
