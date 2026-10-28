const depotDefinitions = [
    {
        name: "R-1 Woronicza",
        dataKey: "Woronicza",
        color: "#00A97B",
        coords: [52.1872145, 20.9940186],
        iconUrl: "Icons/Woronicza.png",
        info: {
            address: "ul. Woronicza 29",
            description: "Największa zajezdnia autobusowa MZA.",
            buses: {
                Solaris: 203,
                Solbus: 94,
                Ursus: 10,
                Yutong: 48,
                Elektryczne: 100,
                Nieelektryczne: 255
            },
            image: ""
        }
    },
    {
        name: "R-2 Kleszczowa",
        dataKey: "Kleszczowa",
        color: "#6A1B9A",
        coords: [52.1965, 20.9223051],
        iconUrl: "Icons/Kleszczowa.png",
        info: {
            address: "ul. Kleszczowa 28",
            description: "Oddział Przewozów R-2 Kleszczowa.",
            buses: {
                Man: 110,
                Mercedes: 75,
                Scania: 29,
                Solaris: 111,
                Elektryczne: 62,
                Nieelektryczne: 263
            },
            image: ""
        }
    },
    {
        name: "R-3 Ostrobramska",
        dataKey: "Ostrobramska",
        color: "#0066FF",
        coords: [52.2331813, 21.1142464],
        iconUrl: "Icons/Ostrobramska.png",
        info: {
            address: "ul. Ostrobramska 38",
            description: "Oddział Przewozów R-3 Ostrobramska.",
            buses: {
                Autosan: 90,
                Solaris: 222,
                Solbus: 48,
                Elektryczne: 50,
                Nieelektryczne: 310
            },
            image: ""
        }
    },
    {
        name: "R-4 Stalowa",
        dataKey: "Stalowa",
        color: "#FF0000",
        coords: [52.2637017, 21.0451748],
        iconUrl: "Icons/Stalowa.png",
        info: {
            address: "ul. Stalowa 77",
            description: "Oddział Przewozów R-4 Stalowa.",
            buses: {
                Man: 70,
                Mercedes: 65,
                Solaris: 238,
                Elektryczne: 83,
                Nieelektryczne: 290
            },
            image: ""
        }
    },
    {
        name: "R-6 Płochocińska",
        dataKey: "Plochocinska",
        color: "#566268",
        coords: [52.3183384, 21.0127333],
        iconUrl: "Icons/Plochocinska.png",
        info: {
            address: "ul. Płochocińska 33",
            description: "Oddział Przewozów R-6 Płochocińska.",
            buses: {
                Solaris: 106,
                Nieelektryczne: 106
            },
            image: ""
        }
    }
];

window.MZA.createDepots = function createDepots() {
    return Object.fromEntries(depotDefinitions.map((definition) => {
        const data = window[definition.dataKey];

        if (!data || !Array.isArray(data.features)) {
            throw new Error(`Missing route data for ${definition.name}.`);
        }

        return [
            definition.name,
            {
                ...definition,
                data,
                info: {
                    ...definition.info,
                    lines: window.MZA.sortLines(data.features.map((feature) => String(feature.properties.line)))
                }
            }
        ];
    }));
};
