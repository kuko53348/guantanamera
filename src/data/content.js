// data/content.js — every word and every asset path the landing page shows.
// Copy is English-first with the Spanish dish names kept intact, because the
// menu is Cuban: a guest should recognize "lechón" before "roast pork".

export const RESTAURANT = {
    name: 'Guantanamera',
    kind: 'Restaurante Cubano',
    address: 'Centro Comercial Plaza América, Varadero, Matanzas, Cuba',
    addressShort: 'Plaza América · Varadero',
    phone: '(53 45) 668181',
    phoneHref: 'tel:+5345668181',
    hours: 'Open every day',
    hoursDetail: 'Lunch & dinner, until late',
    instagram: 'https://www.instagram.com/guantanamera397/',
    instagramHandle: '@guantanamera397',
    directions: 'https://www.google.com/maps/search/?api=1&query=Guantanamera+Restaurante+Plaza+America+Varadero',
    mapNote: 'Inside Plaza América, a two-minute walk from the sand.',
    developer: 'https://github.com/kuko53348/kuko53348',
    developerName: 'kuko53348',
};

// Each anchor names the page it lives on: the story and the visit stay on the
// landing page, the carta (menu, plates, bar, photos) is its own screen, and the
// thank-you note to the team has its own page so it never interrupts a guest.
export const ROUTES = { home: '/', menu: '/menu', developer: '/developer' };

export const NAV_LINKS = [
    { label: 'Our story', id: 'story', route: ROUTES.home },
    { label: 'Menu', id: 'menu', route: ROUTES.menu },
    { label: 'Dishes', id: 'dishes', route: ROUTES.menu },
    { label: 'Drinks', id: 'drinks', route: ROUTES.menu },
    { label: 'Gallery', id: 'gallery', route: ROUTES.menu },
    { label: 'Visit', id: 'visit', route: ROUTES.home },
    // The thank-you page is a route, not a section, so its nav entry carries
    // ROUTES.developer. It sits in this list on purpose: the gratitude is the
    // one thing on the site a guest should not have to scroll to the footer to
    // find.
    { label: 'Gratitude', id: 'top', route: ROUTES.developer, icon: 'favorite' },
];

export const SIGNATURES = [
    {
        name: 'Lechón Asado',
        english: 'Slow-roasted pork',
        image: 'assets/landing/lechon.webp',
        alt: 'Slow-roasted Cuban pork with rice, tostones and salad',
        description:
            'The house legend: pork roasted low and slow until the skin crackles, finished with a sour-orange mojo and served with rice and tostones.',
        ingredients: ['pork shoulder', 'sour orange', 'garlic', 'cumin', 'oregano'],
        time: '4 h',
    },
    {
        name: 'Paella Cubana',
        english: 'Cuban paella',
        image: 'assets/landing/paella.webp',
        alt: 'Cuban paella with seafood, pork and rice',
        description:
            'A fiesta in a pan. Saffron rice, shrimp, fish and pork come together with peas and peppers — made to share, the Cuban way.',
        ingredients: ['rice', 'shrimp', 'fish', 'pork', 'peas', 'saffron'],
        time: '45 min',
    },
    {
        name: 'Langosta a la Parrilla',
        english: 'Grilled lobster',
        image: 'assets/landing/lobster.webp',
        alt: 'Grilled lobster tail with garlic butter and lime',
        description:
            'Varadero on a plate. Lobster brushed with garlic butter, charred on the grill and brightened with fresh lime.',
        ingredients: ['lobster', 'garlic butter', 'lime', 'parsley'],
        time: '25 min',
    },
    {
        name: 'Camarones al Ajillo',
        english: 'Garlic shrimp',
        image: 'assets/landing/shrimp.webp',
        alt: 'Garlic shrimp in a rich Cuban sauce',
        description:
            'Shrimp seared hard in garlic and butter, with just enough lime to keep you coming back for the next one.',
        ingredients: ['shrimp', 'garlic', 'butter', 'parsley', 'lime'],
        time: '15 min',
    },
    {
        name: 'Pescado a la Plancha',
        english: 'Grilled fish fillet',
        image: 'assets/landing/fish.webp',
        alt: 'Grilled fish fillet with rice and vegetables',
        description:
            'The catch of the day, simply grilled with garlic and lime, served with rice and whatever the market gave us that morning.',
        ingredients: ['white fish', 'garlic', 'lime', 'herbs'],
        time: '20 min',
    },
    {
        name: 'Tostones',
        english: 'Twice-fried plantain',
        image: 'assets/landing/tostones.webp',
        alt: 'Golden Cuban tostones with dipping sauce',
        description:
            'Green plantain, smashed and fried twice until golden. The sound of a Cuban table, and the best way to start one.',
        ingredients: ['green plantain', 'garlic', 'sea salt', 'oil'],
        time: '10 min',
    },
];

export const MENU = [
    {
        label: 'Starters',
        short: 'Starters',
        icon: 'lunch_dining',
        note: 'Small plates, big Cuban appetite.',
        items: [
            {
                name: 'Croquetas de Jamón',
                description: 'Crisp outside, creamy inside — the classic that never lasts long on the table.',
                ingredients: 'cured ham, béchamel, breadcrumbs',
                time: '15 min',
            },
            {
                name: 'Tostones',
                description: 'Twice-fried green plantain, salted and served with garlic dip.',
                ingredients: 'green plantain, garlic, sea salt, oil',
                time: '10 min',
            },
            {
                name: 'Chips de Plátano',
                description: 'Thin, golden and dangerously snackable.',
                ingredients: 'green plantain, sea salt, oil',
                time: '8 min',
            },
            {
                name: 'Tamales Cubanos',
                description: 'Wrapped in tradition: steamed cornmeal with seasoned pork.',
                ingredients: 'cornmeal, pork, garlic, cumin, bell pepper',
                time: '25 min',
            },
            {
                name: 'Cóctel de Camarones',
                description: 'Chilled shrimp in a bright, tangy cocktail sauce.',
                ingredients: 'shrimp, ketchup, lime, onion, cilantro',
                time: '10 min',
            },
            {
                name: 'Cóctel de Atún',
                description: 'Fresh tuna, citrus and olive oil — light, clean, tropical.',
                ingredients: 'tuna, bell pepper, onion, lime, olive oil',
                time: '10 min',
            },
            {
                name: 'Sopa de Mariscos',
                description: 'A deep, tomato-scented broth with the day’s shellfish — the kitchen’s answer to a rainy afternoon.',
                ingredients: 'fish, shrimp, tomato, garlic, herbs',
                time: '25 min',
            },
            {
                name: 'Ensalada Fría',
                description: 'Cool, crisp and colorful — the refresher before the feast.',
                ingredients: 'potato, carrot, peas, mayo, lime',
                time: '10 min',
            },
            {
                name: 'Ensalada de Vegetales',
                description: 'Garden-fresh lettuce, tomato and cucumber with a lime dressing.',
                ingredients: 'lettuce, tomato, cucumber, onion, olive oil',
                time: '8 min',
            },
            {
                name: 'Ensalada de Frutas',
                description: 'A tropical rainbow of whatever is ripest that day.',
                ingredients: 'pineapple, papaya, banana, melon, citrus',
                time: '8 min',
            },
            {
                name: 'Papas Fritas',
                description: 'Fried potatoes the old way: crisp edges, soft middle.',
                ingredients: 'potatoes, salt, oil',
                time: '10 min',
            },
        ],
    },
    {
        label: 'From the land',
        short: 'Land',
        icon: 'outdoor_grill',
        note: 'Criollo cooking, slow and generous.',
        items: [
            {
                name: 'Lechón Asado',
                description: 'Slow-roasted pork, garlic mojo and crackling skin. The plate to order first.',
                ingredients: 'pork shoulder, sour orange, garlic, cumin, oregano',
                time: '4 h',
            },
            {
                name: 'Pollo Asado',
                description: 'Island-spiced roast chicken with lime and oregano.',
                ingredients: 'chicken, garlic, oregano, lime, oil',
                time: '35 min',
            },
            {
                name: 'Fajitas de Pollo',
                description: 'Sizzling chicken strips with peppers and onions.',
                ingredients: 'chicken breast, bell peppers, onion, paprika',
                time: '20 min',
            },
            {
                name: 'Fajitas de Cerdo',
                description: 'Smoky pork strips, grilled hard and served hot.',
                ingredients: 'pork strips, bell peppers, onion, cumin',
                time: '20 min',
            },
            {
                name: 'Bistec de Cerdo',
                description: 'A hearty pork cutlet, grilled Cuban style.',
                ingredients: 'pork cutlet, garlic, salt, pepper',
                time: '25 min',
            },
            {
                name: 'Costillas de Cerdo',
                description: 'Sticky, meaty ribs with a garlic-vinegar glaze.',
                ingredients: 'pork ribs, Cuban spices, garlic, vinegar',
                time: '40 min',
            },
            {
                name: 'Hamburguesa con Queso',
                description: 'The classic craving, with a tropical accent.',
                ingredients: 'ground beef, cheese, bun, lettuce, tomato',
                time: '15 min',
            },
            {
                name: 'Sándwich de la Casa',
                description: 'A toasted house sandwich with roast pork, ham and cheese, served with fries on the side.',
                ingredients: 'roast pork, ham, cheese, pickles, mustard, bread',
                time: '15 min',
            },
            {
                name: 'Viandas Hervidas',
                description: 'Root vegetables and pork simmered slowly — Cuban comfort in a bowl.',
                ingredients: 'yuca, sweet potato, plantain, pork, garlic',
                time: '30 min',
            },
            {
                name: 'Jamón en Lonchas',
                description: 'Simple, elegant cured ham. Order it while the grill works.',
                ingredients: 'cured ham',
                time: '5 min',
            },
        ],
    },
    {
        label: 'From the sea',
        short: 'Sea',
        icon: 'set_meal',
        note: 'Caught nearby, cooked simply.',
        items: [
            {
                name: 'Filete de Pescado',
                description: 'Flaky white fish, grilled or fried, with lime and herbs.',
                ingredients: 'white fish fillet, lime, garlic, herbs',
                time: '20 min',
            },
            {
                name: 'Ruedas de Pescado',
                description: 'Seared fish steaks in garlic and oil.',
                ingredients: 'fish steaks, garlic, oil, seasoning',
                time: '20 min',
            },
            {
                name: 'Pescado en Plato',
                description: 'Whole fish, garlic, lime and the day’s herbs.',
                ingredients: 'whole fish, garlic, lime, herbs',
                time: '25 min',
            },
            {
                name: 'Camarones al Ajillo',
                description: 'Shrimp in bubbling garlic butter. Ask for bread — you will want it.',
                ingredients: 'shrimp, garlic, butter, parsley, lime',
                time: '15 min',
            },
            {
                name: 'Langosta a la Parrilla',
                description: 'Grilled lobster, medium size, with garlic butter and lime.',
                ingredients: 'lobster tail, garlic butter, lime',
                time: '25 min',
            },
            {
                name: 'Langosta Grande',
                description: 'The whole lobster, charred and glossy. The celebration plate.',
                ingredients: 'whole lobster, garlic, butter, herbs',
                time: '30 min',
            },
        ],
    },
    {
        label: 'All in one',
        short: 'Combos',
        icon: 'restaurant',
        note: 'The combos Cubans order to share.',
        items: [
            {
                name: 'Paella Cubana',
                description: 'Rice, seafood and pork in one generous pan. Made for the middle of the table.',
                ingredients: 'rice, shrimp, fish, pork, peas, saffron',
                time: '45 min',
            },
            {
                name: 'All in One: Paella',
                description: 'The full Cuban spread — rice, shrimp, pork, fish and vegetables.',
                ingredients: 'rice, shrimp, pork, fish, vegetables',
                time: '45 min',
            },
            {
                name: 'All in One: Lobster & Fish',
                description: 'Grilled lobster and fish fillet on one plate. Seafood lovers, this is yours.',
                ingredients: 'lobster, fish fillet, garlic, herbs',
                time: '30 min',
            },
            {
                name: 'All in One: Lobster & Shrimp',
                description: 'The ocean duo: lobster and shrimp in garlic butter.',
                ingredients: 'lobster, shrimp, garlic butter',
                time: '30 min',
            },
            {
                name: 'All in One: Lobster, Fish & Pork',
                description: 'Surf meets turf, Cuban style — lobster, fish and pork steak.',
                ingredients: 'lobster, fish fillet, pork steak, spices',
                time: '40 min',
            },
            {
                name: 'Especial Guantanamera',
                description: 'Our house combo: lobster, shrimp, fish and pork with rice. The whole story.',
                ingredients: 'lobster, shrimp, fish, pork, rice',
                time: '45 min',
            },
            {
                name: 'Mar y Tierra de Pollo',
                description: 'Chicken and shrimp with rice and vegetables.',
                ingredients: 'chicken, shrimp, rice, vegetables',
                time: '35 min',
            },
            {
                name: 'Mar y Tierra de Cerdo',
                description: 'Pork and shrimp with rice and vegetables.',
                ingredients: 'pork, shrimp, rice, vegetables',
                time: '35 min',
            },
        ],
    },
];

export const DRINKS = [
    {
        name: 'Piña Colada',
        image: 'assets/landing/pina-colada.webp',
        alt: 'Creamy piña colada with pineapple and a striped straw',
        description: 'White rum, ripe pineapple and coconut cream. Cold, thick and unapologetically tropical.',
        ingredients: ['white rum', 'pineapple', 'coconut cream', 'lime'],
        time: '5 min',
    },
    {
        // Asset names are the original photo files: mojito.jpg is the frappé
        // and daiquiri.jpg is the michelada. The copy follows the glass, not the name.
        name: 'Limonada Frappé',
        image: 'assets/landing/mojito.webp',
        alt: 'Lemonade blended with ice until slushy, served frosty with mint',
        description:
            'Lemon, cane sugar and ice blended until slushy. Sharp and cold — the one you order while the rum is still deciding.',
        ingredients: ['fresh lemon', 'cane sugar', 'crushed ice', 'soda'],
        time: '5 min',
    },
    {
        name: 'Michelada',
        image: 'assets/landing/daiquiri.webp',
        alt: 'Tall michelada with a chile salt rim, lime and layered red and amber',
        description:
            'Cold beer with lime, tomato and a chile salt rim. Cubans order it at four in the afternoon and are never once wrong.',
        ingredients: ['cold beer', 'lime', 'tomato', 'chile salt', 'ice'],
        time: '3 min',
    },
    {
        name: 'Sangría Cubana',
        image: 'assets/landing/sangria.webp',
        alt: 'Red sangria with tropical fruit and berries',
        description: 'Red wine, tropical fruit and a little cinnamon. Made to be shared slowly.',
        ingredients: ['red wine', 'tropical fruit', 'citrus', 'cinnamon'],
        time: '10 min',
    },
];

export const BOTTLES = [
    { image: 'assets/landing/bottle-01.webp', alt: 'Bottle of Romina rum on the bar' },
    { image: 'assets/landing/bottle-02.webp', alt: 'Bottle of Terra Meiga orujo on the bar' },
    { image: 'assets/landing/bottle-03.webp', alt: 'Bottle of Teichenné cherry liqueur on the bar' },
    { image: 'assets/landing/bottle-04.webp', alt: 'Bottle of Terra Meiga golden liqueur on the bar' },
    { image: 'assets/landing/bottle-05.webp', alt: 'Bottle of Isis gin on the bar' },
    { image: 'assets/landing/bottle-06.webp', alt: 'Bottle of pink gin on the bar' },
    { image: 'assets/landing/bottle-07.webp', alt: 'Bottle of Terra Meiga liqueur on the bar' },
    { image: 'assets/landing/bottle-08.webp', alt: 'Bottle of Rosina floral wine on the bar' },
    { image: 'assets/landing/bottle-09.webp', alt: 'Bottle of Entre Ríos wine on the bar' },
    { image: 'assets/landing/bottle-10.webp', alt: 'Bottle of Gran Colores wine on the bar' },
    { image: 'assets/landing/bottle-11.webp', alt: 'Bottle of Altos Ibéricos wine on the bar' },
    { image: 'assets/landing/bottle-12.webp', alt: 'Bottle of Sambuca liqueur on the bar' },
    { image: 'assets/landing/bottle-13.webp', alt: 'Bottle of Chancellor whisky on the bar' },
    { image: 'assets/landing/bottle-14.webp', alt: 'Bottle of Old Partner whisky on the bar' },
    { image: 'assets/landing/bottle-15.webp', alt: 'Bottle of Elliot Hall whisky on the bar' },
    { image: 'assets/landing/bottle-16.webp', alt: 'Bottle of Legendario rum on the bar' },
    { image: 'assets/landing/bottle-17.webp', alt: 'Bottle of Ritual aperitif on the bar' },
    { image: 'assets/landing/bottle-18.webp', alt: 'Bottle of Havana Club rum on the bar' },
    { image: 'assets/landing/bottle-19.webp', alt: 'Bottle of Legendario rum on the bar' },
    { image: 'assets/landing/bottle-20.webp', alt: 'Bottle of Havana Club rum on the bar' },
    { image: 'assets/landing/bottle-21.webp', alt: 'Bottle of Entre Ríos wine on the bar' },
    { image: 'assets/landing/bottle-22.webp', alt: 'Bottle of Black Tears rum on the bar' },
    { image: 'assets/landing/bottle-23.webp', alt: 'Bottle of Barceló Cream on the bar' },
    { image: 'assets/landing/bottle-24.webp', alt: 'Bottle of Havana Club rum on the bar' },
];

export const REVIEWS = [
    {
        quote:
            'We came for one mojito and stayed for three hours. The lobster, the sea breeze, the music — it was the most Cuban afternoon of our trip.',
        name: 'Elena & Marcus',
        origin: 'Germany',
    },
    {
        quote:
            'The lechón is the real thing: crisp skin, garlic, lime, and rice that tastes like somebody’s grandmother is in the kitchen. We ate here twice in four days.',
        name: 'Sophie L.',
        origin: 'Canada',
    },
    {
        quote:
            'As Cubans we are picky about paella. This one is generous, full of seafood and made to share. The terrace at sunset is worth the trip alone.',
        name: 'Jorge & Ana',
        origin: 'Havana, Cuba',
    },
];

export const GALLERY = [
    {
        image: 'assets/landing/terrace.webp',
        alt: 'Sea-view terrace at Guantanamera with palms and turquoise water',
        caption: 'The terrace, Varadero',
    },
    {
        image: 'assets/landing/combo.webp',
        alt: 'Lobster and shrimp combo with rice',
        caption: 'Langosta y camarones',
    },
    {
        image: 'assets/landing/dining.webp',
        alt: 'Dining room at Guantanamera restaurant',
        caption: 'The dining room',
    },
    {
        image: 'assets/landing/guests.webp',
        alt: 'Guests sharing a Cuban meal at Guantanamera',
        caption: 'Sunday lunch',
    },
    {
        image: 'assets/landing/sea-table.webp',
        alt: 'Table set by the sea at Guantanamera',
        caption: 'Table for two, please',
    },
    {
        image: 'assets/landing/chicken.webp',
        alt: 'Roasted chicken with rice and plantain',
        caption: 'Pollo asado',
    },
    {
        image: 'assets/landing/team.webp',
        alt: 'The Guantanamera team sharing a toast',
        caption: 'The family behind the bar',
    },
    {
        image: 'assets/landing/fajita.webp',
        alt: 'Sizzling pork fajitas with peppers',
        caption: 'Fajitas de cerdo',
    },
];

// Real plates from the kitchen, used as the visual menu after the written one.
// Captions stay descriptive: the card changes with the catch, so no price and
// no promise the kitchen cannot keep.
export const DISH_GALLERY = [
    {
        image: 'assets/landing/dish-coctel-camarones.webp',
        alt: 'Four glasses of chilled Cuban shrimp cocktail with lettuce',
        caption: 'Cóctel de camarones',
    },
    {
        image: 'assets/landing/dish-chips-platano.webp',
        alt: 'Golden plantain chips piled on a white plate',
        caption: 'Chips de plátano',
    },
    {
        image: 'assets/landing/dish-papas-fritas.webp',
        alt: 'Crisp fried potatoes with sea salt',
        caption: 'Papas fritas',
    },
    {
        image: 'assets/landing/dish-sopa-mariscos.webp',
        alt: 'Seafood soup served in a white bowl',
        caption: 'Sopa de mariscos',
    },
    {
        image: 'assets/landing/dish-lechon.webp',
        alt: 'Slow-roasted pork with moro rice, tostones and salad',
        caption: 'Lechón asado',
    },
    {
        image: 'assets/landing/dish-pollo-asado.webp',
        alt: 'Roast chicken with yellow rice, plantain and vegetables',
        caption: 'Pollo asado',
    },
    {
        image: 'assets/landing/dish-fajitas-cerdo.webp',
        alt: 'Sizzling pork fajitas with peppers, onions and plantain chips',
        caption: 'Fajitas de cerdo',
    },
    {
        image: 'assets/landing/dish-hamburguesa.webp',
        alt: 'Cuban cheeseburger with lettuce and fried plantain',
        caption: 'Hamburguesa con queso',
    },
    {
        image: 'assets/landing/dish-langosta.webp',
        alt: 'Grilled lobster tail with moro rice, plantain and salad',
        caption: 'Langosta a la parrilla',
    },
    {
        image: 'assets/landing/dish-pescado-entero.webp',
        alt: 'Whole grilled fish with yellow rice and fresh salad',
        caption: 'Pescado del día',
    },
    {
        image: 'assets/landing/dish-camarones-langosta.webp',
        alt: 'Lobster and shrimp with rice and grilled vegetables',
        caption: 'Camarones & langosta',
    },
    {
        image: 'assets/landing/dish-pescado-frito.webp',
        alt: 'Whole fried fish with yellow rice and cucumber salad',
        caption: 'Pescado frito',
    },
    {
        image: 'assets/landing/dish-lechon-langosta.webp',
        alt: 'Lobster and roast pork with yellow rice and vegetables',
        caption: 'Especial Guantanamera',
    },
    {
        image: 'assets/landing/dish-mar-y-tierra.webp',
        alt: 'Surf and turf plate with lobster, pork and rice',
        caption: 'Mar y tierra',
    },
    {
        image: 'assets/landing/dish-langosta-pescado.webp',
        alt: 'Grilled lobster and fish with moro rice and salad',
        caption: 'Langosta & pescado',
    },
    {
        image: 'assets/landing/dish-pescado-moro.webp',
        alt: 'Fish fillet with moro rice, plantain and tomato salad',
        caption: 'Pescado con moro',
    },
    {
        image: 'assets/landing/dish-pollo-arroz.webp',
        alt: 'Roast chicken with yellow rice and vegetables',
        caption: 'Pollo con arroz',
    },
    {
        image: 'assets/landing/dish-ensalada.webp',
        alt: 'Fresh cucumber, tomato and onion salad',
        caption: 'Ensalada de vegetales',
    },
    {
        image: 'assets/landing/dish-tostones.webp',
        alt: 'Golden twice-fried plantain with garlic dip',
        caption: 'Tostones',
    },
    {
        image: 'assets/landing/dish-sandwich.webp',
        alt: 'Toasted house sandwich with fries',
        caption: 'Sándwich de la casa',
    },
];

export const STATS = [
    { value: 'Every day', label: 'Open for lunch & dinner' },
    { value: '4.9 / 5', label: 'Guest love, year after year' },
    { value: 'Sea view', label: 'Terrace over Varadero' },
    { value: '100% criollo', label: 'Recipes with Cuban roots' },
];

export const FAQ = [
    {
        question: 'Do I need a reservation?',
        answer:
            'Walk-ins are always welcome. For groups, birthdays or a table on the terrace at sunset, call us at (53 45) 668181 and we will take care of it.',
    },
    {
        question: 'Where exactly are you in Varadero?',
        answer:
            'Inside Centro Comercial Plaza América, on the Varadero peninsula — a two-minute walk from the beach. Look for the blue Guantanamera sign.',
    },
    {
        question: 'Is there something for vegetarians?',
        answer:
            'Yes. Vegetable salad, fruit salad, tostones, banana chips, viandas and rice are all vegetarian, and the kitchen is happy to keep a plate meat-free.',
    },
    {
        question: 'Do you have live music?',
        answer:
            'On select evenings the terrace fills with son cubano. Ask us when you call, or simply follow the music when you walk past.',
    },
];
