// utils/i18n.js — the language is one keyed state, and t() is the only reader.
// No widget binds the 'site.lang' key, so a change takes the structural path in
// useState: the whole page rebuilds instead of patching one prop. That is what a
// language swap needs, and it is why switching languages re-renders the chrome
// and every section at once.
import { useState } from 'flet-box';
import { UI } from '../data/translations.js';
import { CARTA } from '../data/translations.carta.js';
import { ES } from '../data/translations.es.js';
import { ES_CARTA } from '../data/translations.es.carta.js';
import { RU } from '../data/translations.ru.js';
import { TR } from '../data/translations.tr.js';
import { HI } from '../data/translations.hi.js';

// The order of this list is the order of the buttons in the header.
export const LOCALES = [
    { code: 'en', short: 'EN' },
    { code: 'es', short: 'ES' },
    { code: 'fr', short: 'FR' },
    { code: 'pt', short: 'PT' },
    { code: 'it', short: 'IT' },
    { code: 'de', short: 'DE' },
    { code: 'zh', short: 'ZH' },
    { code: 'ru', short: 'RU' },
    { code: 'tr', short: 'TR' },
    { code: 'hi', short: 'HI' },
];

const DICT = { ...UI, ...CARTA };
const STORE_KEY = 'guantanamera.lang';

// Two source formats, one runtime table.
//
// The first five non-English locales live as positional tuples in
// translations.js — one row per sentence, which is the compact way to keep that
// many strings side by side while they were written together.
//
// A language added afterwards is a whole-locale map in its own file. One row per
// locale in the shared tuple would mean rewriting every row of a 266-sentence
// dictionary to add one language, so the format that costs one file wins. The
// table below is what `t()` actually reads, and it hides the difference.
const TUPLE_LOCALES = ['fr', 'pt', 'it', 'de', 'zh'];
const MAP_LOCALES = { es: { ...ES, ...ES_CARTA }, ru: RU, tr: TR, hi: HI };

const TABLES = Object.fromEntries(LOCALES.map(({ code }) => [code, {}]));
for (const [text, row] of Object.entries(DICT)) {
    TUPLE_LOCALES.forEach((code, i) => {
        if (row[i]) TABLES[code][text] = row[i];
    });
}
for (const [code, map] of Object.entries(MAP_LOCALES)) Object.assign(TABLES[code], map);

// The table behind `t()` for one locale. Used by scripts/check-i18n.mjs to prove
// a language is complete before its button is added to LOCALES.
export const dictionaryFor = (code) => TABLES[code] ?? null;


const detect = () => {
    const wanted = (
        (typeof navigator !== 'undefined' ? navigator.languages ?? [navigator.language] : []) ?? []
    )
        .map((l) => String(l ?? '').slice(0, 2).toLowerCase());
    return LOCALES.find((l) => wanted.includes(l.code))?.code ?? 'en';
};

const initial = () => {
    try {
        const saved = localStorage.getItem(STORE_KEY);
        if (LOCALES.some((l) => l.code === saved)) return saved;
    } catch {
        /* private mode — the browser language decides */
    }
    return detect();
};

const [locale, writeLocale] = useState('site.lang', initial());

const paint = (code) => {
    if (typeof document !== 'undefined') document.documentElement.lang = code;
};
paint(initial());

export const getLang = () => String(locale.valueOf() ?? 'en');

export const setLang = (code) => {
    if (!LOCALES.some((l) => l.code === code) || code === getLang()) return;
    try {
        localStorage.setItem(STORE_KEY, code);
    } catch {
        /* the language still changes for this visit */
    }
    paint(code);
    writeLocale(code);
};

// English is the source text, so it never needs a row in the dictionary: the
// tuple holds the other five, in TUPLE_LOCALES order, and a map locale supplies
// its own file. A string no dictionary knows stays English — a missing row must
// never blank out copy.
export const t = (text) => {
    if (typeof text !== 'string' || !text) return text;
    return TABLES[getLang()]?.[text] || text;
};

// Ideographs take nothing from letter-spacing, and Devanagari has no case at all:
// an eyebrow tracked at 2px and forced to caps reads as broken in those scripts.
export const isCaseless = () => {
    const lang = getLang();
    return lang === 'zh' || lang === 'hi';
};

// Ingredients are stored as one comma string per plate, but a term is translated
// once and reused by every dish that carries it.
export const tList = (text) => {
    if (typeof text !== 'string' || !text) return text;
    return text
        .split(', ')
        .map((term) => t(term))
        .join(', ');
};

// '45 min' and '4 h' are the only two shapes the carta uses; they are units, not
// sentences, so they get a rule instead of a dictionary row. Spanish, French,
// Portuguese and Italian write the same abbreviations, so they fall through.
export const tTime = (text) => {
    const m = /^(\d+)\s*(min|h)$/.exec(text ?? '');
    if (!m) return t(text);
    const [, n, unit] = m;
    switch (getLang()) {
        case 'zh': return unit === 'h' ? `${n} 小时` : `${n} 分钟`;
        case 'de': return `${n} ${unit === 'h' ? ' Std.' : ' Min.'}`;
        case 'ru': return `${n} ${unit === 'h' ? ' ч' : ' мин'}`;
        case 'tr': return unit === 'h' ? `${n} sa` : `${n} dk`;
        case 'hi': return unit === 'h' ? `${n} घंटे` : `${n} मिनट`;
        default: return text;
    }
};

