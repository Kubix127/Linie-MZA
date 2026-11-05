const bounds = [
    [51.95, 20.50],
    [52.53, 21.60]
];

function addBaseLayers(map, L) { // Adds basemap
    L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png?key=cb1_4qqs_1_79074f82560803ade70ccb5f",
        {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attribution/">CARTO</a>'
        }
    ).addTo(map);

    map.createPane("labels");
    const labelsPane = map.getPane("labels");
    labelsPane.style.zIndex = 650;
    labelsPane.style.pointerEvents = "none";

    L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png?key=cb1_4qqs_1_79074f82560803ade70ccb5f",
        { pane: "labels" }
    ).addTo(map);
}

function addDepotLayers(map, L, depots, handleDepotClick) { // Adds two layers to each depot. One for showing whole depot, second for separate lines.
    Object.entries(depots).forEach(([name, depot], index) => {
        // Naming/indexing
        const paneName = `depot-pane-${index}`;
        const filteredPaneName = `filtered-depot-pane-${index}`;
        const routePane = map.createPane(paneName);
        const filteredLinePane = map.createPane(filteredPaneName);

        routePane.style.zIndex = 400 + index;
        routePane.classList.add("depot-routes-pane");
        filteredLinePane.style.zIndex = 400 + index;
        filteredLinePane.classList.add("depot-routes-pane", "pane-hidden");

        const routeRenderer = L.canvas({ pane: paneName, padding: 0.5 });
        const filteredLineRenderer = L.canvas({ pane: filteredPaneName, padding: 0.5 });
        const lineFeatures = new Map();
        // Save each line data
        depot.data.features.forEach((entry) => {
            const lineName = String(entry.properties.line);
            const features = lineFeatures.get(lineName) || [];
            features.push(entry);
            lineFeatures.set(lineName, features);
        });

        // Save layers data
        depot.lineFeatures = lineFeatures;
        depot.routePane = routePane;
        depot.filteredLinePane = filteredLinePane;
        depot.lineLayerOptions = { pane: filteredPaneName, renderer: filteredLineRenderer };
        depot.routeLayer = L.geoJSON(depot.data, {
            pane: paneName,
            renderer: routeRenderer,
            style: (feature) => ({
                color: depot.color,
                weight: 3,
                opacity: 0.004 * Number(feature.properties.Count)
            })
        }).addTo(map);
        depot.filteredLineLayers = new Map();
        depot.activeLineLayers = new Map();

        // Adding depot markers
        const marker = L.marker(depot.coords, {
            icon: L.icon({
                iconUrl: depot.iconUrl,
                iconSize: [32, 40],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32]
            })
        }).addTo(map);
        depot.marker = marker;

        marker.bindTooltip(name.split(" ")[0], {
            permanent: true,
            direction: "bottom",
            offset: [0, 0],
            className: "depot-label"
        });

        marker.on("mouseover", function() {
            this.bindPopup(name.split(" ")[1], {
                closeButton: false,
                autoClose: false,
                closeOnClick: false,
                direction: "top",
                offset: [0, 22],
                className: "depot-label"
            }).openPopup();
        });

        marker.on("mouseout", function() {
            this.closePopup();
        });

        marker.on("click", (event) => {
            handleDepotClick(name, event.originalEvent.ctrlKey);
        });
    });
}

function selectDepot(depots, depotName, multiSelect) {
    if (multiSelect) {
        const nextSelection = new Set(depots);

        if (nextSelection.has(depotName)) {
            nextSelection.delete(depotName);
        } else {
            nextSelection.add(depotName);
        }

        return nextSelection;
    }

    if (depots.size === 1 && depots.has(depotName)) {
        return new Set();
    }

    return new Set([depotName]);
}

window.MZAComponents = window.MZAComponents || {};

window.MZAComponents.MapView = function MapView({
    depots,
    selectedDepots,
    filteredBuses,
    filteredLines,
    multiSelect,
    onSelectionChange
}) {
    const mapElementRef = React.useRef(null);
    const mapRef = React.useRef(null);
    const depotsRef = React.useRef(depots);
    const selectedRef = React.useRef(selectedDepots);
    const multiSelectRef = React.useRef(multiSelect);
    const onSelectionChangeRef = React.useRef(onSelectionChange);

    depotsRef.current = depots;
    selectedRef.current = selectedDepots;
    multiSelectRef.current = multiSelect;
    onSelectionChangeRef.current = onSelectionChange;

    React.useEffect(() => {
        const L = window.L;
        const map = L.map(mapElementRef.current, {
            maxBounds: bounds,
            maxBoundsViscosity: 1.0,
            preferCanvas: true,
            doubleClickZoom: false,
            minZoom: 11,
            zoomControl: false
        }).setView([52.2447, 21.0322], 12.4);

        mapRef.current = map;
        addBaseLayers(map, L);

        const handleDepotClick = (name, controlKeyPressed) => {
            const nextSelection = selectDepot(
                new Set(selectedRef.current),
                name,
                controlKeyPressed || multiSelectRef.current
            );
            onSelectionChangeRef.current(nextSelection);
        };

        addDepotLayers(map, L, depotsRef.current, handleDepotClick);

        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, []);

    React.useEffect(() => {
        const map = mapRef.current;

        if (!map) {
            return;
        };

        const matchingDepots = new Set(
            window.MZA.filterDepots(depotsRef.current, filteredBuses, filteredLines)
        );
        const filteredLineSet = new Set(filteredLines);

        Object.entries(depotsRef.current).forEach(([name, depot]) => {
            const matchesBusFilter = filteredBuses.length === 0
                || filteredBuses.some((bus) => bus in depot.info.buses);
            const showDepot = matchingDepots.has(name);

            // Filtering depot markers
            if (showDepot) {
                if (!map.hasLayer(depot.marker)) {
                    depot.marker.addTo(map);
                }
            } else if (map.hasLayer(depot.marker)) {
                map.removeLayer(depot.marker);
            }

            // selectedDepots !== matchingDepots. One for selection, the other for display.
            const matchesDepotSelection = selectedDepots.length === 0 || selectedDepots.includes(name);
            const showDepotRoutes = matchesBusFilter && matchesDepotSelection;

            if (filteredLines.length === 0) {
                depot.routePane.classList.toggle("pane-hidden", !showDepotRoutes);
                depot.filteredLinePane.classList.add("pane-hidden");
                return;
            }

            depot.routePane.classList.add("pane-hidden");
            depot.filteredLinePane.classList.add("pane-hidden");

            // Hide filtered lines that don't meet conditions anymore
            depot.activeLineLayers.forEach((layer, lineName) => {
                if (!showDepotRoutes || !filteredLineSet.has(lineName)) {
                    if (map.hasLayer(layer)) {
                        map.removeLayer(layer);
                    }
                    depot.activeLineLayers.delete(lineName);
                }
            });
 
            if (!showDepotRoutes) { // If depot not selected or no seleceted bus types on the line, skip
                return;
            }

            // Add lines meeting filtering conditions. Depot selection condition handled above.
            filteredLines.forEach((lineName) => {
                const features = depot.lineFeatures.get(lineName);
                if (!features) {
                    return;
                }

                let layer = depot.filteredLineLayers.get(lineName);
                if (!layer) {
                    layer = window.L.geoJSON(
                        { type: "FeatureCollection", features },
                        {
                            ...depot.lineLayerOptions,
                            style: {
                                color: depot.color,
                                weight: 3,
                                opacity: 1 / features.length
                            }
                        }
                    );
                    depot.filteredLineLayers.set(lineName, layer);
                }

                if (!map.hasLayer(layer)) {
                    layer.addTo(map);
                }
                depot.activeLineLayers.set(lineName, layer);
            });

            if (showDepotRoutes) {
                depot.filteredLinePane.classList.remove("pane-hidden");
            }
        });
    }, [selectedDepots, filteredBuses, filteredLines]);

    return <div id="map" ref={mapElementRef} />;
}
