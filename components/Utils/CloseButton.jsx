window.MZAComponents = window.MZAComponents || {};

window.MZAComponents.CloseButton = function CloseButton({ onClose, className = "" }) {
    return (
        <button
            className={`close-btn interactive-control ${className}`}
            type="button"
            onClick={onClose}
            aria-label="Zamknij"
        >
            <window.MZAComponents.Icon name="close" />
        </button>
    );
};
