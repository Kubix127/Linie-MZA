const bounds = [
    [51.95, 20.50],
    [52.53, 21.60]
];
function addBaseLayers(map, L) {
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

function addDepotLayers(map, L, depots, handleDepotClick) {
    Object.entries(depots).forEach(([name, depot], index) => {
        const paneName = `depot-pane-${index}`;
        map.createPane(paneName);

        const pane = map.getPane(paneName);
        pane.style.zIndex = 400 + index;
        pane.classList.add("depot-routes-pane");

        const renderer = L.canvas({ pane: paneName, padding: 0.5 });
        const lineShapeCounts = {};

        depot.data.features.forEach((entry) => {
            const lineName = String(entry.properties.line);
            lineShapeCounts[lineName] = (lineShapeCounts[lineName] || 0) + 1;
        });

        depot.lines = [];

        depot.data.features.forEach((entry) => {
            const lineName = String(entry.properties.line);
            const defaultOpacity = 0.004 * Number(entry.properties.Count);
            const layer = L.geoJSON(entry, {
                pane: paneName,
                renderer,
                style: {
                    color: depot.color,
                    weight: 3,
                    opacity: defaultOpacity
                }
            }).addTo(map);

            depot.lines.push({
                name: lineName,
                layer,
                defaultOpacity,
                filteredOpacity: 1 / lineShapeCounts[lineName]
            });
        });

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

        Object.entries(depotsRef.current).forEach(([name, depot]) => {
            const matchesBusFilter = filteredBuses.length === 0
                || filteredBuses.some((bus) => bus in depot.info.buses);
            const showDepot = matchingDepots.has(name);

            if (showDepot) {
                if (!map.hasLayer(depot.marker)) {
                    depot.marker.addTo(map);
                }
            } else if (map.hasLayer(depot.marker)) {
                map.removeLayer(depot.marker);
            }

            depot.lines.forEach((line) => {
                const matchesDepotSelection = selectedDepots.length === 0 || selectedDepots.includes(name);
                const matchesSelectedLines = filteredLines.length === 0 || filteredLines.includes(line.name);
                const showLine = matchesBusFilter && matchesDepotSelection && matchesSelectedLines;

                line.layer.setStyle({
                    opacity: filteredLines.length > 0 ? line.filteredOpacity : line.defaultOpacity
                });

                if (showLine) {
                    if (!map.hasLayer(line.layer)) {
                        line.layer.addTo(map);
                    }
                } else if (map.hasLayer(line.layer)) {
                    map.removeLayer(line.layer);
                }
            });
        });
    }, [selectedDepots, filteredBuses, filteredLines]);

    return <div id="map" ref={mapElementRef} />;
}
