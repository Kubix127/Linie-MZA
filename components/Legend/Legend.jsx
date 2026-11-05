window.MZAComponents = window.MZAComponents || {};

window.MZAComponents.Legend = function Legend({ isVisible = true, onClose }) {
    const [currentPage, setCurrentPage] = React.useState(0);
    const pages = [
        {
            title: "Mapa zajezdni i tras",
            content: (
                <>
                    <p>
                        Na mapie przedstawione jest zestawienie zajezdni i tras autobusowych obsługiwanych przez MZA.
                    </p>
                    <p>
                        <b>Większe natężenie koloru trasy oznacza większe natężenie tras autobusów.</b>
                    </p>
                    <p>
                        Na górnym pasku znajdują się przyciski: <b>Filtrowania</b>, <b>Wyboru wielu zajezdni</b>, <b>Informacji</b> oraz <b>Zajezdni</b>.
                    </p>
                    <p>
                        Klikniecie w przycisk otworzy panel z dodatkowymi funkcjami. Wyjątkiem jest przycisk <b>Wyboru wielu zajezdni</b>, który zmienia zachowanie klikania zajezdni.
                    </p>
                </>
            )
        },
        {
            title: "Nawigacja po mapie",
            content: (
                <>
                    <p>
                        Klikając na zajezdnie na mapie widok zostaje ograniczony do wybranych zajezdni. Aby wybrać kilka zajezdni, należy prytrzymać <b>Ctrl</b>, lub włączyć tryb wyboru wielu zajezdni w górnym panelu.
                    </p>
                    <p>
                        Wybranie w ten sposób zajezdni wpływa na wyświetlane detale w panelu <b>Zajezdnie</b>
                    </p>
                </>
            )
        },
        {
            title: "Zajezdnie",
            content: (
                <>
                    <p>
                        Panel <b>Zajezdne</b> można otworzyć poprzez kliknięcie ikony w prawy górnym rogu.
                    </p>
                    <p>
                        Zawiera on informacje o taborze zajezdni i obsługiwanych liniach. Zaznaczenie kilku zajezdni pokazuje zsumowane dane dla wybranych zajezdni. 
                    </p>
                    <p>
                        Kliknięcie w linię filtruje widok tras na mapie oraz zajezdnie obsługujące dane połączenie.
                    </p>
                </>
            )
        },
        {
            title: "Filtry",
            content: (
                <>
                    <p>
                        Panel <b>filtrów</b> można otworzyć poprzez kliknięcie ikony w lewym górnym rogu.
                        <br/>
                        Zawiera on kategorie autobusów oraz spis wszystkich obsługiwanych linii.
                    </p>
                    <p>
                        Kliknięcie w autobus filtruje zajezdnie posiadające dany typ autobusu.
                        <br/>
                        Kliknięcie w linię filtruje widok tras na mapie oraz zajezdnie obsługujące dane połączenie.
                    </p>
                </>
            )
        },
        {
            title: "Instrukcja",
            content: (
                <>
                    <p>
                        Ten panel można przywrócić w dowolnym momencie klikając przycisk <b>Informacje</b> na górnym pasku.
                    </p>
                    <p>
                        Po zapoznaniu się funkcjonalnościami strony można bezpiecznie zamknąć to okno.
                    </p>
                </>
            )
        }
    ];

    React.useEffect(() => {
        if (!isVisible) {
            setCurrentPage(0);
        }
    }, [isVisible]);

    if (!isVisible) {
        return null;
    }

    return (
        <aside className="legend-container" aria-label="Informacje o mapie">
            <div className="legend">
                <window.MZAComponents.CloseButton
                    onClose={onClose}
                />
                <div className="legend-title">
                    <window.MZAComponents.Icon name="info" size={20} />
                    <b>{pages[currentPage].title}</b>
                </div>
                {pages[currentPage].content}
                <div className="legend-footer">
                    <button
                        className={`menu-button interactive-control ${currentPage >0 ? "active" : ""}`}
                        type="button"
                        title="Poprzednia strona"
                        aria-label="Poprzednia strona"
                        onClick={currentPage > 0 ? () => setCurrentPage(currentPage - 1) : null}
                    >
                        <window.MZAComponents.Icon name="chevronLeft" size={20} />
                    </button>
                    <button
                        className={`menu-button interactive-control ${currentPage < pages.length - 1 ? "active" : ""}`}
                        type="button"
                        title="Następna strona"
                        aria-label="Następna strona"
                        onClick={currentPage < pages.length - 1 ? () => setCurrentPage(currentPage + 1) : null}
                    >
                        <window.MZAComponents.Icon name="chevronRight" size={20} />
                    </button>
                </div>
            </div>
        </aside>
    );
};
