window.MZAComponents = window.MZAComponents || {};

const iconPaths = {
    filter: (
        <>
            <path d="M4 7h16M4 17h16" />
            <circle cx="9" cy="7" r="2" />
            <circle cx="15" cy="17" r="2" />
        </>
    ),
    depot: (
        <>
            <path d="M3 21V8l9-5 9 5v13" />
            <path d="M7 21v-7h10v7M8 9h.01M12 9h.01M16 9h.01" />
        </>
    ),
    info: (
        <>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v5M12 8h.01" />
        </>
    ),
    bus: (
        <>
            <path d="M5 16V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10" />
            <path d="M5 10h14M7 16h10l2 3H5l2-3ZM8 19v2M16 19v2" />
            <circle cx="8" cy="13" r=".75" />
            <circle cx="16" cy="13" r=".75" />
        </>
    ),
    route: (
        <>
            <circle cx="6" cy="18" r="2" />
            <circle cx="18" cy="6" r="2" />
            <path d="M8 18h3a3 3 0 0 0 3-3v-3a3 3 0 0 1 3-3" />
        </>
    ),
    location: (
        <>
            <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="2.5" />
        </>
    ),
    close: <path d="m6 6 12 12M18 6 6 18" />,
    chevronLeft: <path d="m15 18-6-6 6-6" />,
    chevronRight: <path d="m9 18 6-6-6-6" />,
    layers: (
        <>
            <path d="m12 3 9 5-9 5-9-5 9-5Z" />
            <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
        </>
    ),
    reset: (
        <>
            <path d="M3 11a9 9 0 1 1 2.6 6.4" />
            <path d="M3 4v7h7" />
        </>
    )
};

window.MZAComponents.Icon = function Icon({ name, size = 18, className = "" }) {
    const icon = iconPaths[name];

    if (!icon) {
        throw new Error(`Unknown icon: ${name}`);
    }

    return (
        <svg
            className={`icon${className ? ` ${className}` : ""}`}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
        >
            {icon}
        </svg>
    );
};
