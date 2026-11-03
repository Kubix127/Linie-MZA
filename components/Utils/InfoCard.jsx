window.MZAComponents = window.MZAComponents || {};

window.MZAComponents.InfoCard = function InfoCard({ label, children, className="" }) {
    return (
        <div className="info-card">
            <div className="info-card-label">{label}</div>
            <div className={`${className} info-card-value`}>{children}</div>
        </div>
    );
}
