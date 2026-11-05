window.MZA = window.MZA || {};

window.MZA.sortBuses = function sortBuses(buses) {
    return Object.fromEntries(
        Object.entries(buses).sort(([a], [b]) => {
            const aIsElectricCategory = busTypes.includes(a);
            const bIsElectricCategory = busTypes.includes(b);

            if (aIsElectricCategory !== bIsElectricCategory) {
                return aIsElectricCategory ? 1 : -1;
            }

            return a.localeCompare(b, "pl");
        })
    );
};

window.MZA.sortLines = function sortLines(lines) {
    return Array.from(new Set(lines)).sort((a, b) =>
        a.localeCompare(b, undefined, { numeric: true })
    );
};

window.MZA.filterDepots = function filterDepots(depots, filteredBuses, filteredLines) {
    return Object.entries(depots)
        .filter(([, depot]) => {
            const matchesBusFilter = filteredBuses.length === 0
                || filteredBuses.some((bus) => bus in depot.info.buses);
            const matchesLineFilter = filteredLines.length === 0
                || filteredLines.some((line) => depot.info.lines.includes(line));

            return matchesBusFilter && matchesLineFilter;
        })
        .map(([name]) => name);
};

window.MZA.summarizeDepots = function summarizeDepots(depots, depotNames=[]) {
    const buses = {};
    const lines = [];

    if (depotNames.length !== 0) {
        depotNames.forEach((name) => {
            const info = depots[name].info;

            Object.entries(info.buses).forEach(([bus, amount]) => {
                buses[bus] = (buses[bus] || 0) + amount;
            });
            lines.push(...info.lines);
        });
    } else {
        Object.entries(depots).forEach(([name, depot]) => {
            const info = depot.info;

            Object.entries(info.buses).forEach(([bus, amount]) => {
                buses[bus] = (buses[bus] || 0) + amount;
            });
            lines.push(...info.lines);
        });
    }

    return {
        title: depotNames.slice().sort().join(", "),
        buses: window.MZA.sortBuses(buses),
        lines: window.MZA.sortLines(lines)
    };
};
