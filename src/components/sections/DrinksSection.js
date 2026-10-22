// components/sections/DrinksSection.js — the bar, after dark.
// The only dark section on the page: it gives the cocktails the same stage
// the terrace gets at sunset, without borrowing a second brand color.
import { Column, Container, Icon, Image, Row, Text, border, rgba } from 'flet-box';
import { colors, fonts } from '../../theme.js';
import { BOTTLES, DRINKS } from '../../data/content.js';
import { isCaseless, t, tTime } from '../../utils/i18n.js';
import { Grid } from '../ui/Grid.js';
import { Section } from '../ui/Section.js';
import { SectionHeading } from '../ui/SectionHeading.js';

const DrinkCard = (drink) =>
    Container({
        width: '100%',
        height: '100%',
        minHeight: 440,
        bgColor: colors.gray800,
        border: border(1, 'solid', colors.gray700),
        borderRadius: 16,
        overflow: 'hidden',
        children: [
            Container({
                width: '100%',
                bgColor: 'transparent',
                height: 240,
                overflow: 'hidden',
                child: Image({
                    src: drink.image,
                    alt: drink.alt,
                    width: '100%',
                    height: '100%',
                    fit: 'cover',
                }),
            }),
            Container({
                width: '100%',
                padding: 16,
                gap: 8,
                bgColor: 'transparent',
                children: [
                    Text({
                        text: drink.name,
                        size: 24,
                        weight: 700,
                        color: colors.white,
                        fontFamily: fonts.display,
                        lineHeight: 1.2,
                    }),
                    Text({
                        text: t(drink.description),
                        size: 14,
                        color: rgba(255, 255, 255, 0.72),
                        lineHeight: 1.5,
                    }),
                    Row({
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 8,
                        children: [
                            Text({
                                text: drink.ingredients.map(t).join(' · '),
                                size: 12,
                                color: rgba(255, 255, 255, 0.6),
                                lineHeight: 1.5,
                            }),
                            Row({
                                gap: 4,
                                alignItems: 'center',
                                children: [
                                    Icon({ name: 'schedule', size: 16, color: rgba(255, 255, 255, 0.6) }),
                                    Text({
                                        text: tTime(drink.time),
                                        size: 12,
                                        color: rgba(255, 255, 255, 0.6),
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
        ],
    });

const BottleTile = ({ bottle, isMobile }) =>
    Container({
        width: '100%',
        height: isMobile ? 120 : 180,
        borderRadius: 12,
        overflow: 'hidden',
        bgColor: colors.gray900,
        border: border(1, 'solid', colors.gray700),
        child: Image({
            src: bottle.image,
            alt: bottle.alt,
            width: '100%',
            height: '100%',
            fit: 'cover',
        }),
    });

export const DrinksSection = ({ isMobile }) =>
    Section({
        id: 'drinks',
        isMobile,
        bgColor: colors.text,
        gap: 32,
        children: [
            SectionHeading({
                eyebrow: 'Bar & cocktails',
                title: 'Rum, lime and a little bit of Cuba.',
                lead: 'The bar is part of the ritual. Piña coladas thick with pineapple and coconut, a limonada frappé for the heat, and a michelada at four in the afternoon.',
                isMobile,
                light: true,
                icon: 'local_bar',
            }),
            Grid({
                items: DRINKS,
                columns: isMobile ? 1 : 4,
                gap: 24,
                renderItem: (drink) => DrinkCard(drink),
            }),
            Container({
                width: '100%',
                height: 1,
                bgColor: rgba(255, 255, 255, 0.16),
                marginTop: 8,
            }),
            Column({
                width: '100%',
                gap: 8,
                alignItems: 'flex-start',
                children: [
                    Text({
                        text: t('Behind the bar'),
                        size: 12,
                        weight: 600,
                        color: rgba(255, 255, 255, 0.6),
                        letterSpacing: isCaseless() ? 0 : 2,
                        textTransform: isCaseless() ? 'none' : 'uppercase',
                    }),
                    Text({
                        text: t('The shelf.'),
                        size: 24,
                        weight: 700,
                        color: colors.white,
                        fontFamily: fonts.display,
                        lineHeight: 1.2,
                    }),
                    Text({
                        text: t(
                            'Ron, whisky, gin, wine and the bottles we save for the right night. Ask for a pour, a flight, or the story behind the label.',
                        ),
                        size: 14,
                        color: rgba(255, 255, 255, 0.72),
                        lineHeight: 1.5,
                    }),
                ],
            }),
            Grid({
                items: BOTTLES,
                columns: isMobile ? 3 : 6,
                gap: isMobile ? 8 : 12,
                renderItem: (bottle) => BottleTile({ bottle, isMobile }),
            }),
            Row({
                width: '100%',
                gap: 8,
                alignItems: 'center',
                justifyContent: 'center',
                wrap: true,
                children: [
                    Icon({ name: 'music_note', size: 16, color: rgba(255, 255, 255, 0.6) }),
                    Text({
                        text: t('On select evenings, son cubano fills the terrace. Stay for one more.'),
                        size: 12,
                        color: rgba(255, 255, 255, 0.6),
                        align: 'center',
                    }),
                ],
            }),
        ],
    });

export default DrinksSection;
