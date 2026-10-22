// components/sections/StorySection.js — who is behind the blue door.
import { Column, Container, Image, Row, Text, border } from 'flet-box';
import { colors, fonts } from '../../theme.js';
import { STATS } from '../../data/content.js';
import { Grid } from '../ui/Grid.js';
import { Section } from '../ui/Section.js';
import { SectionHeading } from '../ui/SectionHeading.js';
import { t } from '../../utils/i18n.js';

const StatCard = (stat) =>
    Container({
        bgColor: colors.card,
        border: border(1, 'solid', colors.border),
        borderRadius: 12,
        padding: 16,
        gap: 4,
        children: [
            Text({
                text: t(stat.value),
                size: 24,
                weight: 700,
                color: colors.primary,
                fontFamily: fonts.display,
                lineHeight: 1.2,
            }),
            Text({
                text: t(stat.label),
                size: 12,
                color: colors.textSecondary,
                lineHeight: 1.5,
            }),
        ],
    });

const PhotoCollage = ({ isMobile }) =>
    Column({
        width: '100%',
        gap: 16,
        children: [
            Container({
                width: '100%',
                bgColor: 'transparent',
                height: isMobile ? 240 : 320,
                borderRadius: 16,
                overflow: 'hidden',
                child: Image({
                    src: 'assets/landing/dining.webp',
                    alt: 'The dining room at Guantanamera, with white linens and dark wood',
                    width: '100%',
                    height: '100%',
                    fit: 'cover',
                }),
            }),
            Row({
                width: '100%',
                gap: 16,
                children: [
                    Container({
                        flex: 1,
                        bgColor: 'transparent',
                        height: isMobile ? 160 : 200,
                        borderRadius: 16,
                        overflow: 'hidden',
                        child: Image({
                            src: 'assets/landing/team.webp',
                            alt: 'The Guantanamera team raising a glass together',
                            width: '100%',
                            height: '100%',
                            fit: 'cover',
                        }),
                    }),
                    Container({
                        flex: 1,
                        bgColor: 'transparent',
                        height: isMobile ? 160 : 200,
                        borderRadius: 16,
                        overflow: 'hidden',
                        child: Image({
                            src: 'assets/landing/sea-table.webp',
                            alt: 'A table set by the sea at Guantanamera',
                            width: '100%',
                            height: '100%',
                            fit: 'cover',
                        }),
                    }),
                ],
            }),
        ],
    });

const StoryCopy = ({ isMobile }) =>
    Column({
        width: '100%',
        gap: 24,
        alignItems: 'flex-start',
        children: [
            SectionHeading({
                eyebrow: 'Nuestra casa · our house',
                title: 'A Cuban table, two minutes from the sea.',
                isMobile,
                icon: 'wb_sunny',
            }),
            Text({
                text: t('Guantanamera is not a concept. It is a Cuban home whose dining room happens to open onto Varadero. The blue sign leads to white linens, dark wood and the smell of sofrito — and past the glass, the palms do the decorating.'),
                size: 16,
                color: colors.textSecondary,
                lineHeight: 1.5,
            }),
            Text({
                text: t('Our cooks start early: beans simmer, pork marinates in sour orange and garlic, plantains wait to be smashed. Nothing is rushed. That is the recipe, and it has been for every table we have set.'),
                size: 16,
                color: colors.textSecondary,
                lineHeight: 1.5,
            }),
            Text({
                text: t('“Sabor cubano, sin prisa.” — Cuban flavor, without hurry.'),
                size: 18,
                color: colors.text,
                weight: 600,
                fontFamily: fonts.display,
                lineHeight: 1.2,
            }),
            Grid({
                items: STATS,
                columns: 2,
                gap: 16,
                renderItem: (stat) => StatCard(stat),
            }),
        ],
    });

export const StorySection = ({ isMobile }) =>
    Section({
        id: 'story',
        isMobile,
        gap: 0,
        bgColor: colors.background,
        children: [
            isMobile
                ? Column({
                      width: '100%',
                      gap: 32,
                      children: [StoryCopy({ isMobile }), PhotoCollage({ isMobile })],
                  })
                : Row({
                      width: '100%',
                      gap: 48,
                      alignItems: 'center',
                      children: [
                          Container({ flex: 1, minWidth: 0, bgColor: 'transparent', child: PhotoCollage({ isMobile }) }),
                          Container({ flex: 1, minWidth: 0, bgColor: 'transparent', child: StoryCopy({ isMobile }) }),
                      ],
                  }),
        ],
    });

export default StorySection;
