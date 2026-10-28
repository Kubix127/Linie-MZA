window.MZA = window.MZA || {};

window.MZA.sortBuses = function sortBuses(buses) {
    return Object.fromEntries(
        Object.entries(buses).sort(([a], [b]) => {
            const aIsElectricCategory = ["Elektryczne", "Nieelektryczne"].includes(a);
            const bIsElectricCategory = ["Elektryczne", "Nieelektryczne"].includes(b);

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

window.MZA.summarizeDepots = function summarizeDepots(depotNames, depots) {
    const buses = {};
    const lines = [];

    depotNames.forEach((name) => {
        const info = depots[name].info;

        Object.entries(info.buses).forEach(([bus, amount]) => {
            buses[bus] = (buses[bus] || 0) + amount;
        });
        lines.push(...info.lines);
    });

    return {
        title: depotNames.slice().sort().join(", "),
        buses: window.MZA.sortBuses(buses),
        lines: window.MZA.sortLines(lines)
    };
};
