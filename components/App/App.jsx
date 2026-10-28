window.MZAComponents = window.MZAComponents || {};

window.MZAComponents.App = function App() {
    const [depots] = React.useState(window.MZA.createDepots);
    const [selectedDepots, setSelectedDepots] = React.useState([]);
    const [multiSelect, setMultiSelect] = React.useState(false);
    const [isInfoPanelOpen, setInfoPanelOpen] = React.useState(false);

    function handleSelectionChange(nextSelection) {
        setSelectedDepots(Array.from(nextSelection));
        setInfoPanelOpen(nextSelection.size > 0);
    }

    function resetLayers() {
        setSelectedDepots([]);
        setInfoPanelOpen(false);
    }

    return (
        <>
            <window.MZAComponents.MapView
                depots={depots}
                selectedDepots={selectedDepots}
                multiSelect={multiSelect}
                onSelectionChange={handleSelectionChange}
            />
            <window.MZAComponents.MapControls
                hasSelection={selectedDepots.length > 0}
                multiSelect={multiSelect}
                isInfoPanelOpen={isInfoPanelOpen}
                onToggleMultiSelect={() => setMultiSelect((value) => !value)}
                onReset={resetLayers}
                onToggleInfoPanel={() => setInfoPanelOpen((value) => !value)}
            />
            <window.MZAComponents.Header />
            <window.MZAComponents.Legend multiSelect={multiSelect} onMultiSelectChange={setMultiSelect} />
            <window.MZAComponents.InfoPanel
                depots={depots}
                selectedDepots={selectedDepots}
                isOpen={isInfoPanelOpen}
                onClose={() => setInfoPanelOpen(false)}
            />
        </>
    );
};
