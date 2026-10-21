// theme.js — the only place in this app where a raw color is written.
// Re-exports the FletBox palette with the Guantanamera identity: Cuban tile
// terracotta as the single brand color, Varadero sea as the emphasis voice,
// and a warm paper/sand neutral ramp instead of cold grays.
import { colors as base } from 'flet-box';

export const colors = {
    ...base,

    // Brand — the one action the page asks for.
    primary: '#B4431F',
    // Emphasis — used only for the sea/son accents, never as a second action.
    secondary: '#0E6E6E',

    background: '#FBF5E9',
    surface: '#F3E7D3',
    card: '#FFFBF4',
    text: '#231A15',
    textSecondary: '#6E5B4E',
    textDisabled: '#A9988A',
    border: '#E4D5BF',
    divider: '#EDE1CE',

    white: '#FFFFFF',
    black: '#14100D',

    gray50: '#FBF5E9',
    gray100: '#F5EBDC',
    gray200: '#EADCC8',
    gray300: '#DCC9AF',
    gray400: '#C2AC90',
    gray500: '#9C8771',
    gray600: '#7A6654',
    gray700: '#5A4A3D',
    gray800: '#3A2E26',
    gray900: '#231A15',

    overlay: 'rgba(20, 16, 13, 0.55)',
    shadow: 'rgba(42, 28, 18, 0.14)',
    error: '#B3261E',
    errorBg: '#F7E3DF',
    successBg: '#E7F0E4',
    warningBg: '#F8EEDA',
    infoBg: '#E4EEEC',
};

export const fonts = {
    display: "Georgia, 'Times New Roman', 'Palatino Linotype', serif",
    body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
};

export const layout = {
    maxWidth: 1200,
    gutter: 24,
    gutterWide: 48,
};
