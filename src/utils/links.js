// utils/links.js — the navigation primitives a two-page site needs.
// The scroll container is the Scaffold body, not the window, so scrolling is
// delegated to the target element instead of window.scrollTo.
import { getCurrentPath, goTo } from 'flet-box';

export const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (target && typeof target.scrollIntoView === 'function') {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

/**
 * Scroll to `id`, first switching to `route` when the section lives on the
 * other page. Scaffold rebuilds its body inside the router's subscriber, so
 * the target node is already in the DOM by the time goTo() returns.
 */
export const goToSection = (id, route) => {
    if (route && route !== getCurrentPath()) goTo(route);
    scrollToSection(id);
};

export const openExternal = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
};

export const callRestaurant = (phoneHref) => {
    window.location.href = phoneHref;
};
