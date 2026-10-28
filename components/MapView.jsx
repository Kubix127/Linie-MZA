const bounds = [
    [51.95, 20.50],
    [52.53, 21.60]
];
const routesOpacity = 0.5;

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
    const routesPane = map.createPane("routes-pane");
    routesPane.style.zIndex = 400;
    routesPane.style.opacity = String(routesOpacity);

    Object.entries(depots).forEach(([name, depot], index) => {
        const paneName = `depot-pane-${index}`;
        map.createPane(paneName, routesPane);

        const pane = map.getPane(paneName);
        pane.style.zIndex = index;
        pane.classList.add("depot-routes-pane");
        depot.paneName = paneName;

        const renderer = L.svg({ pane: paneName, padding: 0.5 });

        depot.data.features.forEach((entry) => {
            const defaultOpacity = Math.min(
                1,
                (0.004 * Number(entry.properties.Count)) / routesOpacity
            );

            L.geoJSON(entry, {
                pane: paneName,
                renderer,
                style: {
                    color: depot.color,
                    weight: 3,
                    opacity: defaultOpacity
                }
            }).addTo(map);
        });

        const marker = L.marker(depot.coords, {
            icon: L.icon({
                iconUrl: depot.iconUrl,
                iconSize: [32, 40],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32]
            })
        }).addTo(map);

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

function selectDepot(currentSelection, depotName, useMultiSelect) {
    if (useMultiSelect) {
        const nextSelection = new Set(currentSelection);

        if (nextSelection.has(depotName)) {
            nextSelection.delete(depotName);
        } else {
            nextSelection.add(depotName);
        }

        return nextSelection;
    }

    if (currentSelection.size === 1 && currentSelection.has(depotName)) {
        return new Set();
    }

    return new Set([depotName]);
}

window.MZAComponents = window.MZAComponents || {};

window.MZAComponents.MapView = function MapView({ depots, selectedDepots, multiSelect, onSelectionChange }) {
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
            preferCanvas: false,
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

        Object.entries(depotsRef.current).forEach(([name, depot]) => {
            const pane = map.getPane(depot.paneName);

            if (pane) {
                pane.classList.toggle("pane-hidden", selectedDepots.length > 0 && !selectedDepots.includes(name));
            }
        });
    }, [selectedDepots]);

    return <div id="map" ref={mapElementRef} />;
}
