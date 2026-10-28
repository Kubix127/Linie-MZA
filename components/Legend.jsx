window.MZAComponents = window.MZAComponents || {};

window.MZAComponents.Legend = function Legend({ multiSelect, onMultiSelectChange }) {
    return (
        <div className="legend-container">
            <div className="legend">
                <b>Mapa zajezdni i tras</b>
                <br />
                - Kliknij ikonę zajezdni, aby wyświetlić szczegóły. Ponowne kliknięcie przywraca domyślny widok.
                <br />
                - Większe natężenie koloru trasy oznacza większe natężenie tras autobusów.
            </div>
            <div className="legend">
                <label>
                    <input
                        type="checkbox"
                        checked={multiSelect}
                        onChange={(event) => onMultiSelectChange(event.target.checked)}
                    />
                    Wybór wielu zajezdni
                </label>
            </div>
        </div>
    );
};
