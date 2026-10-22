#!/usr/bin/env node
// scripts/check-i18n.mjs — every string the app can paint must exist in every
// language it offers, and no language may be half written.
//
// A missing row is silent: `t()` falls back to the English source, so the page
// still looks finished and only a native speaker notices. The header builds its
// buttons from LOCALES, so adding a code before its dictionary is written hands
// visitors an "ES" button that repaints nothing. Both are caught here.
//
//   node scripts/check-i18n.mjs
import {
    DRINKS,
    FAQ,
    GALLERY,
    MENU,
    NAV_LINKS,
    RESTAURANT,
    REVIEWS,
    SIGNATURES,
    STATS,
} from '../src/data/content.js';
import { LOCALES, dictionaryFor } from '../src/utils/i18n.js';
import { UI } from '../src/data/translations.js';
import { CARTA } from '../src/data/translations.carta.js';
import { DEVELOPER } from '../src/data/developer.js';

const needed = new Set();
const add = (s) => typeof s === 'string' && s.trim() && needed.add(s);

// Everything the sections paint, read from the data they paint from, plus the
// literals that live in the components themselves.
NAV_LINKS.forEach((l) => add(l.label));
[
    'Our story', 'Menu', 'Dishes', 'Drinks', 'Gallery', 'Visit', 'Reserve a table', 'Languages',
    'Cuban kitchen · Varadero', 'Restaurante Cubano · Varadero', 'Our door · Plaza América',
    'Son cubano', 'Open every day', '2 min from the beach', 'Groups welcome', 'Lunch & dinner',
    'Explore the menu', 'Lunch & dinner, until late', 'Varadero · Matanzas · Cuba',
    'Walk through the blue door. Taste the real Cuba.', 'Nuestra casa · our house',
    'A Cuban table, two minutes from the sea.', '“Sabor cubano, sin prisa.” — Cuban flavor, without hurry.',
    'Casa specialties', 'The plates people come back for.', 'From criollo classics to lobster combos — the full carta is one tap away.',
    'See the full menu', 'The menu', 'Cuban criollo, from starters to the whole ocean.', "Can’t decide?",
    'Order the Especial Guantanamera — lobster, shrimp, fish and pork for the middle of the table.',
    'Vegetarian plates are available — ask your server and the kitchen will take care of it.',
    'Call to reserve', 'plates · made to share', 'Back to the house', 'La carta · The menu',
    'Everything we cook, in one place.', 'The card changes with the morning catch — ask your server what came in today.',
    'Behind the bar', 'The shelf.', 'Bar & cocktails', 'Rum, lime and a little bit of Cuba.',
    'On select evenings, son cubano fills the terrace. Stay for one more.',
    'Guest stories', 'The best reviews happen at the table.',
    '4.9 / 5 · loved by guests from Varadero and everywhere else',
    'La casa', 'A look inside the blue door.', 'Follow {handle} for the daily plate.', 'Follow on Instagram',
    'From the pass', 'The plates, exactly as they arrive.', 'The view comes with the meal.', 'Varadero · Cuba',
    'Plan your visit', 'Find the blue door.', 'Reservations', 'Address', 'Phone', 'Hours', 'Instagram',
    'Good to know', 'Before you come.', 'Get directions', 'Call', 'Message us on Instagram',
    'Inside Plaza América, a two-minute walk from the sand.', 'Your table is waiting.',
    'Cuban soul, served daily in Varadero.', 'Site', 'Design & development', 'Explore', 'Follow',
    'Son cubano on select evenings.', '© 2026 Guantanamera · Varadero, Cuba',
    'Hecho con sabor en Varadero', 'Back to top', 'Every day', 'Open for lunch & dinner',
    '4.9 / 5', 'Sea view', 'Terrace over Varadero', '100% criollo', 'Recipes with Cuban roots',
    'Guest love, year after year',
].forEach(add);

add(RESTAURANT.hours);
add(RESTAURANT.hoursDetail);
add(RESTAURANT.address);
add(RESTAURANT.addressShort);
add(RESTAURANT.mapNote);
add('Palms, turquoise water and a table that nobody wants to leave. This is the terrace — and it is yours for as long as the coffee lasts.');
add('No filters needed: white linens, turquoise water, plantains on every plate and a team that treats the dining room like its living room.');
add('No styling, no stand-ins: real plates from our kitchen, photographed the way they reach the table. The catch changes with the boats; the generosity does not.');
add('The bar is part of the ritual. Piña coladas thick with pineapple and coconut, a limonada frappé for the heat, and a michelada at four in the afternoon.');
add('Ron, whisky, gin, wine and the bottles we save for the right night. Ask for a pour, a flight, or the story behind the label.');
add('Guantanamera is not a concept. It is a Cuban home whose dining room happens to open onto Varadero. The blue sign leads to white linens, dark wood and the smell of sofrito — and past the glass, the palms do the decorating.');
add('Our cooks start early: beans simmer, pork marinates in sour orange and garlic, plantains wait to be smashed. Nothing is rushed. That is the recipe, and it has been for every table we have set.');
add('Cooked to share, ordered by name, remembered by the whole table. Start with the lechón and let the rest follow.');
add('Recipes with roots in Matanzas kitchens: garlic, sour orange, cumin and time. Ask about the catch — it changes with the boats.');
add('Cuban criollo cooking, slow-roasted lechón and piña coladas by the sea — served every day inside Plaza América, a two-minute walk from the sand.');
add('Four pages of Cuba: the small plates to open with, the land, the sea, and the combos that come to the middle of the table. Prices are not printed — the catch decides, so ask when you sit.');
add('A few words from people who came for lunch and stayed until the sun went down.');

STATS.forEach((s) => { add(s.value); add(s.label); });
SIGNATURES.forEach((d) => { add(d.english); add(d.description); d.ingredients.forEach(add); });
MENU.forEach((c) => {
    add(c.label); add(c.short); add(c.note);
    c.items.forEach((i) => { add(i.description); i.ingredients.split(', ').forEach(add); });
});
DRINKS.forEach((d) => { add(d.description); d.ingredients.forEach(add); });
// Captions that name a dish are the kitchen's words, not UI copy: 'Pollo asado'
// is what that plate is called in every language, so they must not gain rows.
const DISH_NAMES = new Set(['Langosta y camarones', 'Pollo asado', 'Fajitas de cerdo']);

REVIEWS.forEach((r) => add(r.origin));
GALLERY.forEach((g) => { if (!DISH_NAMES.has(g.caption)) add(g.caption); });
FAQ.forEach((f) => { add(f.question); add(f.answer); });

// The thank-you page is data too, so its copy is checked the same way: every
// heading, paragraph, photo caption, alt text and contact row.
add('Read their names');
add('Thanks to the team');
add(DEVELOPER.hero.eyebrow);
add(DEVELOPER.hero.title);
add(DEVELOPER.hero.lead);
add(DEVELOPER.hero.alt);
add(DEVELOPER.thanks.eyebrow);
add(DEVELOPER.thanks.title);
DEVELOPER.thanks.paragraphs.forEach(add);
add(DEVELOPER.contact.eyebrow);
add(DEVELOPER.contact.title);
DEVELOPER.contact.rows.forEach((r) => add(r.label));
DEVELOPER.photos.forEach((p) => { add(p.alt); add(p.caption); });

// Shape of the tuple dictionaries: five non-empty slots, in the order the module
// documents (fr, pt, it, de, zh).
const TUPLE_ORDER = ['fr', 'pt', 'it', 'de', 'zh'];
const DICT = { ...UI, ...CARTA };
const shapeProblems = [];
for (const [key, value] of Object.entries(DICT)) {
    if (!Array.isArray(value) || value.length !== TUPLE_ORDER.length) {
        shapeProblems.push(`${key}: not a ${TUPLE_ORDER.length}-slot tuple`);
        continue;
    }
    value.forEach((slot, i) => {
        if (typeof slot !== 'string' || !slot.trim()) shapeProblems.push(`${key}: empty ${TUPLE_ORDER[i]} slot`);
    });
}

let failed = 0;
console.log(`strings the app paints: ${needed.size}`);
for (const { code, short } of LOCALES) {
    if (code === 'en') continue; // English is the source text
    const table = dictionaryFor(code);
    if (!table) {
        console.log(`❌ ${short}: no dictionary module behind the button`);
        failed += 1;
        continue;
    }
    const missing = [...needed].filter((s) => !table[s]);
    if (missing.length) {
        console.log(`❌ ${short}: ${missing.length}/${needed.size} strings still in English`);
        missing.slice(0, 12).forEach((s) => console.log(`     · ${s.slice(0, 70)}`));
        failed += 1;
    } else {
        console.log(`✅ ${short}: ${needed.size} strings, all covered`);
    }
}

if (shapeProblems.length) {
    console.log(`❌ tuple shape: ${shapeProblems.length} problem(s)`);
    shapeProblems.slice(0, 10).forEach((p) => console.log(`     · ${p}`));
    failed += 1;
}

if (failed) {
    console.error(`\n${failed} language check(s) failed.`);
    process.exit(1);
}
console.log('\nEvery offered language covers every string the app paints.');
