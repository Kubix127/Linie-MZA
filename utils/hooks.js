window.MZA = window.MZA || {};

window.MZA.toggleListSelection = function toggleListSelection(items, item) {
    if (items.includes(item)) {
        return items.filter((selectedItem) => selectedItem !== item);
    }

    return [...items, item];
};
