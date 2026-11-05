window.MZAComponents = window.MZAComponents || {};

window.MZAComponents.ResetButton = function ResetButton({ onReset, disabled, label, className="reset-btn-container" }) {
    return (
        <div className={className}>
            <button className="reset-btn" type="button" onClick={onReset} disabled={disabled}>
                {label}
            </button>
        </div>
    );
};
