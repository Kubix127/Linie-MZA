window.MZAComponents = window.MZAComponents || {};

window.MZAComponents.App = function App() {
    const [depots] = React.useState(window.MZA.createDepots);
    const [selectedDepots, setSelectedDepots] = React.useState([]);
    const [filteredBuses, setFilteredBuses] = React.useState([]);
    const [filteredLines, setFilteredLines] = React.useState([]);
    const [multiSelect, setMultiSelect] = React.useState(false);
    const [isInfoPanelOpen, setInfoPanelOpen] = React.useState(false);
    const [isFilterPanelOpen, setFilterPanelOpen] = React.useState(false);
    const [isLegendVisible, setLegendVisible] = React.useState(true);

    function handleSelectionChange(nextSelection) {
        setSelectedDepots(Array.from(nextSelection));
    }

    function resetLayers() {
        setSelectedDepots([]);
    }

    function resetFilters() {
        setFilteredBuses([]);
        setFilteredLines([]);
    }

    function handleBusFilterChange(nextFilteredBuses) {
        setFilteredBuses(nextFilteredBuses);
        setSelectedDepots(window.MZA.filterDepots(depots, nextFilteredBuses, filteredLines));
    }

    function handleLineFilterChange(nextFilteredLines) {
        // if (nextFilteredLines.length === 0) {
        //     setSelectedDepots([]);
        // } //else {
        //     setSelectedDepots(window.MZA.filterDepots(depots, filteredBuses, nextFilteredLines));
        // }
        setFilteredLines(nextFilteredLines);
        
    }

    return (
        <div className="layout">
            <window.MZAComponents.Header 
                isInfoPanelOpen={isInfoPanelOpen}
                onToggleInfoPanel={() => setInfoPanelOpen((value) => !value)}
                isFilterPanelOpen={isFilterPanelOpen}
                onToggleFilterPanel={() => setFilterPanelOpen((value) => !value)}
                multiSelect={multiSelect} 
                onMultiSelectChange={setMultiSelect} 
                isLegendVisible={isLegendVisible}
                onToggleLegend={() => setLegendVisible((value) => !value)}
            />
            <div className="map-container">
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
                    onReset={() => { resetLayers(); resetFilters(); }}
                />
                <window.MZAComponents.FilterPanel
                    depots={depots}
                    onBusFilterChange={handleBusFilterChange}
                    filteredBuses={filteredBuses}
                    onLineFilterChange={handleLineFilterChange}
                    filteredLines={filteredLines}
                    onResetFilters={resetFilters}
                    isOpen={isFilterPanelOpen}
                    onClose={() => setFilterPanelOpen(false)}
                />
                <window.MZAComponents.Legend
                    isVisible={isLegendVisible}
                    onClose={() => setLegendVisible(false)}
                />
                <window.MZAComponents.InfoPanel
                    depots={depots}
                    selectedDepots={selectedDepots}
                    filteredLines={filteredLines}
                    onLineFilterChange={setFilteredLines}
                    onResetFilters={resetLayers}
                    filtersResetDisabled={selectedDepots.length === 0}
                    isOpen={isInfoPanelOpen}
                    onClose={() => setInfoPanelOpen(false)}
                />
            </div>
        </div>
    );
};
