// app.js — Guantanamera restaurant site: two screens, one chrome.
// The landing page is the story; the carta is its own page. Both scroll inside
// the Scaffold body, so the nav is the only thing that persists across them.
import { Scaffold, dimensions, runApp, useState } from 'flet-box';
import { colors } from './theme.js';
import { LandingNav } from './components/layouts/LandingNav.js';
import { LandingScreen, MenuScreen } from './screens/index.js';
import { ROUTES } from './data/content.js';

const MOBILE_BREAKPOINT = 1024;

// Guantanamera is a brand-light page: the cream/sand palette is the design.
// runApp follows the OS theme by default, which would repaint every framework
// default (Tabs panes, image placeholders, Inputs) in the dark slate palette.
// Pinning the stored theme keeps the brand palette in charge; the page sets
// its own color-scheme in index.html so form controls follow too.
try {
    localStorage.setItem('fletbox-theme', 'light');
} catch {
    /* private mode — the page still renders with its own tokens */
}

// One listener at module scope keeps the keyed viewport state in sync.
const [isMobile, setIsMobile] = useState(
    'landing.isMobile',
    dimensions.getWidth() < MOBILE_BREAKPOINT,
);
dimensions.addListener(({ width }) => setIsMobile(width < MOBILE_BREAKPOINT));

const App = () => {
    // A reactive value is a function: read it before branching, and the read
    // becomes structural so a viewport change re-renders the page.
    const mobile = isMobile.valueOf();

    return Scaffold({
        routes: {
            [ROUTES.home]: () => LandingScreen({ isMobile: mobile }),
            [ROUTES.menu]: () => MenuScreen({ isMobile: mobile }),
        },
        appBar: LandingNav({ isMobile: mobile }),
        backgroundColor: colors.background,
    });
};

runApp(App, 'root');
