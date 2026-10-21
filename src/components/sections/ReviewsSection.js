// components/sections/ReviewsSection.js — guest stories, told at the table.
import { Column, Container, Icon, Rating, Row, Text, border } from 'flet-box';
import { colors, fonts } from '../../theme.js';
import { REVIEWS } from '../../data/content.js';
import { Grid } from '../ui/Grid.js';
import { Section } from '../ui/Section.js';
import { SectionHeading } from '../ui/SectionHeading.js';

const ReviewCard = (review) =>
    Container({
        width: '100%',
        height: '100%',
        minHeight: 256,
        bgColor: colors.card,
        border: border(1, 'solid', colors.border),
        borderRadius: 16,
        padding: 24,
        gap: 16,
        children: [
            Row({
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                children: [
                    Icon({ name: 'format_quote', size: 32, color: colors.primary }),
                    Rating({
                        value: 5,
                        readOnly: true,
                        size: 16,
                        activeColor: colors.primary,
                        inactiveColor: colors.border,
                        gap: 2,
                    }),
                ],
            }),
            Text({
                text: review.quote,
                size: 16,
                color: colors.text,
                lineHeight: 1.5,
            }),
            Container({ width: '100%', height: 1, bgColor: colors.divider }),
            Column({
                gap: 0,
                alignItems: 'flex-start',
                children: [
                    Text({
                        text: review.name,
                        size: 14,
                        weight: 600,
                        color: colors.text,
                        fontFamily: fonts.display,
                    }),
                    Text({
                        text: review.origin,
                        size: 12,
                        color: colors.textSecondary,
                    }),
                ],
            }),
        ],
    });

export const ReviewsSection = ({ isMobile }) =>
    Section({
        id: 'reviews',
        isMobile,
        bgColor: colors.surface,
        gap: 32,
        children: [
            SectionHeading({
                eyebrow: 'Guest stories',
                title: 'The best reviews happen at the table.',
                lead: 'A few words from people who came for lunch and stayed until the sun went down.',
                isMobile,
                align: 'center',
                icon: 'star',
            }),
            Grid({
                items: REVIEWS,
                columns: isMobile ? 1 : 3,
                gap: 24,
                renderItem: (review) => ReviewCard(review),
            }),
            Row({
                width: '100%',
                gap: 8,
                justifyContent: 'center',
                alignItems: 'center',
                wrap: true,
                children: [
                    Rating({
                        value: 5,
                        readOnly: true,
                        size: 16,
                        activeColor: colors.primary,
                        inactiveColor: colors.border,
                        gap: 2,
                    }),
                    Text({
                        text: '4.9 / 5 · loved by guests from Varadero and everywhere else',
                        size: 12,
                        color: colors.textSecondary,
                        align: 'center',
                    }),
                ],
            }),
        ],
    });

export default ReviewsSection;
