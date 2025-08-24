import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './app';
import { initializeTheme } from './hooks/use-appearance';

// This will set light / dark mode on load...
initializeTheme();

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
        <HelmetProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </HelmetProvider>
    );
}
