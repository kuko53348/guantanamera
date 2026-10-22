// data/developer.js — the copy behind /developer, the site's thank-you page.
// It is data and not markup for the same reason the rest of the words are: the
// coverage gate (scripts/check-i18n.mjs) reads this file to prove every string
// has a row in all nine languages before the page can ship.
//
// The page speaks in the first person — it is the developer's note, not the
// restaurant's brochure — and it names no country. The gratitude crosses a
// border on purpose; the words stay about the people.
export const DEVELOPER = {
    hero: {
        image: 'assets/developer/team.webp',
        alt: 'The Guantanamera team raising their glasses on the terrace',
        eyebrow: 'Behind this site',
        title: 'Made by hand. Kept alive by a team.',
        lead: 'A website is never one person’s work, and neither is a restaurant. This page is a thank-you note, left where a guest can find it.',
    },
    thanks: {
        eyebrow: 'The collective',
        title: 'To the people who made it possible.',
        paragraphs: [
            'There is a team that keeps working when the power goes out, when the line drops and when the day has already taken more than it gave back. They build, they test, they answer — for a quality of service most guests never see, which is exactly the kind of work worth naming.',
            'Every page that loads fast, every language that opens a door for a visitor, every plate photographed at the pass carries your handwriting.',
            'And to everyone whose name is not on this page but whose work is: thank you just the same. Sharing a beer at the end of a hard week is the part of this worth doing.',
        ],
        // First names and the nickname the team answers to. Proper nouns are not
        // translated, so these need no dictionary rows.
        names: ['Maykelys', 'Adrián', 'Jason', 'Ernesto', 'Jenrry', 'Osvaldo', 'Ulices', 'Manchas'],
    },
    photos: [
        {
            image: 'assets/developer/colectivo.webp',
            alt: 'Five members of the staff in uniform, arm in arm',
            caption: 'The crew in uniform, the day the doors opened.',
        },
        {
            image: 'assets/developer/developer.webp',
            alt: 'The developer and Adrián toasting with two large beers',
            caption: 'Adrián and I, the beer that closed a hundred late nights.',
        },
        {
            image: 'assets/developer/la-mesa.webp',
            alt: 'Four friends around a table of grilled lobster',
            caption: 'The table where the idea was born.',
        },
    ],
    contact: {
        eyebrow: 'Contact',
        title: 'Talk to the developer.',
        rows: [
            { label: 'This site on GitHub', icon: 'code', href: 'https://github.com/kuko53348/guantanamera' },
            { label: 'Developer profile on GitHub', icon: 'person', href: 'https://github.com/kuko53348' },
            { label: 'Write by email', icon: 'mail', href: 'mailto:kuko53348@gmail.com' },
            { label: 'WhatsApp', icon: 'chat', href: 'https://wa.me/56983957903' },
        ],
    },
};
