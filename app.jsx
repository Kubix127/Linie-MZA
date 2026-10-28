const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error("The React root element was not found.");
}

ReactDOM.createRoot(rootElement).render(<window.MZAComponents.App />);
