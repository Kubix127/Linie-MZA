window.MZAComponents = window.MZAComponents || {};

window.MZAComponents.App = function App() {
    const [depots] = React.useState(window.MZA.createDepots);
    const [selectedDepots, setSelectedDepots] = React.useState([]);
    const [filteredBuses, setFilteredBuses] = React.useState([]);
    const [filteredLines, setFilteredLines] = React.useState([]);
    const [multiSelect, setMultiSelect] = React.useState(false);
    const [isInfoPanelOpen, setInfoPanelOpen] = React.useState(false);
    const [isFilterPanelOpen, setFilterPanelOpen] = React.useState(false);

    function handleSelectionChange(nextSelection) {
        setSelectedDepots(Array.from(nextSelection));
        setInfoPanelOpen(nextSelection.size > 0);
    }

    function resetLayers() {
        setSelectedDepots([]);
        setInfoPanelOpen(false);
    }

    function resetFilters() {
        setFilteredBuses([]);
        setFilteredLines([]);
    }


    return (
        <>
            <window.MZAComponents.MapView
                depots={depots}
                selectedDepots={selectedDepots}
                filteredBuses={filteredBuses}
                filteredLines={filteredLines}
                multiSelect={multiSelect}
                onSelectionChange={handleSelectionChange}
            />
            <window.MZAComponents.MapControls
                hasSelection={selectedDepots.length > 0}
                multiSelect={multiSelect}
                isInfoPanelOpen={isInfoPanelOpen}
                isFilterPanelOpen={isFilterPanelOpen}
                onToggleMultiSelect={() => setMultiSelect((value) => !value)}
                onReset={resetLayers}
                onToggleInfoPanel={() => setInfoPanelOpen((value) => !value)}
                onToggleFilterPanel={() => setFilterPanelOpen((value) => !value)}
            />
            <window.MZAComponents.Header />
            <window.MZAComponents.FilterPanel 
                depots={depots}
                onBusFilterChange={setFilteredBuses}
                filteredBuses={filteredBuses}
                onLineFilterChange={setFilteredLines}
                filteredLines={filteredLines}
                onResetFilters={resetFilters}
                isOpen={isFilterPanelOpen}
                onClose={() => setFilterPanelOpen(false)}
            />
            <window.MZAComponents.Legend multiSelect={multiSelect} onMultiSelectChange={setMultiSelect} />
            <window.MZAComponents.InfoPanel
                depots={depots}
                selectedDepots={selectedDepots}
                filteredLines={filteredLines}
                onLineFilterChange={setFilteredLines}
                isOpen={isInfoPanelOpen}
                onClose={() => setInfoPanelOpen(false)}
            />
        </>
    );
};
