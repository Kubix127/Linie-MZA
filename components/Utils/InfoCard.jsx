window.MZAComponents = window.MZAComponents || {};

window.MZAComponents.InfoCard = function InfoCard({ label, children, className = "", icon }) {
    return (
        <div className="info-card">
            <div className="info-card-label">
                {icon && <window.MZAComponents.Icon name={icon} size={15} />}
                <span>{label}</span>
            </div>
            <div className={`info-card-value${className ? ` ${className}` : ""}`}>{children}</div>
        </div>
    );
}
