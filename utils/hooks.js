window.MZA = window.MZA || {};

window.MZA.handleListSelection = function handleListSelection(setState, item) {
    setState((prev) => {
        if (prev.includes(item)) {
            return prev.filter((i) => i !== item);
        }
        return [...prev, item];
    });
};
