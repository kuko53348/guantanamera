// components/sections/SignatureSection.js — six plates, no prices.
import { Button, Column, Container, Icon, Image, Row, Text, border } from 'flet-box';
import { colors, fonts } from '../../theme.js';
import { ROUTES, SIGNATURES } from '../../data/content.js';
import { goToSection } from '../../utils/links.js';
import { Grid } from '../ui/Grid.js';
import { Section } from '../ui/Section.js';
import { SectionHeading } from '../ui/SectionHeading.js';

const SignatureCard = (dish, isMobile) =>
    Container({
        width: '100%',
        height: '100%',
        minHeight: isMobile ? 420 : 440,
        bgColor: colors.card,
        border: border(1, 'solid', colors.border),
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 1,
        children: [
            Container({
                width: '100%',
                bgColor: 'transparent',
                height: 220,
                overflow: 'hidden',
                child: Image({
                    src: dish.image,
                    alt: dish.alt,
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
                    Row({
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 8,
                        children: [
                            Text({
                                text: dish.name,
                                size: 18,
                                weight: 600,
                                color: colors.text,
                                fontFamily: fonts.display,
                                lineHeight: 1.2,
                            }),
                            Row({
                                gap: 4,
                                alignItems: 'center',
                                children: [
                                    Icon({ name: 'schedule', size: 16, color: colors.primary }),
                                    Text({
                                        text: dish.time,
                                        size: 12,
                                        weight: 500,
                                        color: colors.textSecondary,
                                    }),
                                ],
                            }),
                        ],
                    }),
                    Text({
                        text: dish.english,
                        size: 12,
                        weight: 600,
                        color: colors.primary,
                        letterSpacing: 2,
                        textTransform: 'uppercase',
                    }),
                    Text({
                        text: dish.description,
                        size: 14,
                        color: colors.textSecondary,
                        lineHeight: 1.5,
                    }),
                    Text({
                        text: dish.ingredients.join(' · '),
                        size: 12,
                        color: colors.textDisabled,
                        lineHeight: 1.5,
                    }),
                ],
            }),
        ],
    });

export const SignatureSection = ({ isMobile }) =>
    Section({
        id: 'signatures',
        isMobile,
        bgColor: colors.background,
        gap: 32,
        children: [
            SectionHeading({
                eyebrow: 'Casa specialties',
                title: 'The plates people come back for.',
                lead: 'Cooked to share, ordered by name, remembered by the whole table. Start with the lechón and let the rest follow.',
                isMobile,
                icon: 'local_fire_department',
            }),
            Grid({
                items: SIGNATURES,
                columns: isMobile ? 1 : 3,
                gap: 24,
                renderItem: (dish) => SignatureCard(dish, isMobile),
            }),
            Row({
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                wrap: true,
                gap: 16,
                children: [
                    Text({
                        text: 'From criollo classics to lobster combos — the full carta is one tap away.',
                        size: 14,
                        color: colors.textSecondary,
                    }),
                    Button({
                        text: 'See the full menu',
                        iconRight: 'arrow_forward',
                        variant: 'text',
                        size: 'large',
                        color: colors.primary,
                        elevation: 0,
                        onPress: () => goToSection('menu', ROUTES.menu),
                    }),
                ],
            }),
        ],
    });

export default SignatureSection;
