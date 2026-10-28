window.MZAComponents = window.MZAComponents || {};

function InfoCard({ label, children }) {
    return (
        <div className="info-card">
            <div className="info-card-label">{label}</div>
            <div className="info-card-value">{children}</div>
        </div>
    );
}

function BusList({ buses }) {
    return (
        <ul>
            {Object.entries(buses).map(([name, amount]) =>
                <li key={name}>{name}: {amount}</li>
            )}
        </ul>
    );
}

function LineList({ lines }) {
    return (
        <div className="line-container">
            {lines.map((line) => <span className="line" key={line}>{line}</span>)}
        </div>
    );
}

function DepotDetails({ depot }) {
    const { info } = depot;

    return (
        <>
            <InfoCard label="Lokalizacja">{info.address}</InfoCard>
            <InfoCard label="O oddziale">{info.description}</InfoCard>
            <InfoCard label="Autobusy"><BusList buses={info.buses} /></InfoCard>
            <InfoCard label="Obsługiwane linie"><LineList lines={info.lines} /></InfoCard>
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

function CombinedDepotDetails({ summary }) {
    return (
        <>
            <InfoCard label="Autobusy"><BusList buses={summary.buses} /></InfoCard>
            <InfoCard label="Obsługiwane linie"><LineList lines={summary.lines} /></InfoCard>
        </>
    );
}

window.MZAComponents.InfoPanel = function InfoPanel({ depots, selectedDepots, isOpen, onClose }) {
    let title = "Zajezdnia";
    let content = "Wybierz zajezdnię na mapie.";

    if (selectedDepots.length === 1) {
        const depot = depots[selectedDepots[0]];
        title = depot.name;
        content = <DepotDetails depot={depot} />;
    } else if (selectedDepots.length > 1) {
        const summary = window.MZA.summarizeDepots(selectedDepots, depots);
        title = summary.title;
        content = <CombinedDepotDetails summary={summary} />;
    };

    return (
        <div
            id="info-panel"
            className={`info-panel${isOpen ? " open" : ""}`}
            aria-hidden={!isOpen}
        >
            <div className="banner">
                <button className="close-btn" type="button" onClick={onClose} aria-label="Zamknij panel">
                    ✕
                </button>
                <h2 id="panel-title">{title}</h2>
                <div className="bottom-line" />
            </div>
            <div id="panel-content">{content}</div>
        </div>
    );
}
