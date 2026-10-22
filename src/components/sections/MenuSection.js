// components/sections/MenuSection.js — the full criollo menu, in tabs.
// Every item carries ingredients and a realistic preparation time, never a
// price: the price lives on the printed menu, not in the marketing.
import { Button, Column, Container, Icon, Row, Text, border } from 'flet-box';
import { colors, fonts } from '../../theme.js';
import { MENU, RESTAURANT } from '../../data/content.js';
import { callRestaurant } from '../../utils/links.js';
import { t, tList, tTime } from '../../utils/i18n.js';
import { Grid } from '../ui/Grid.js';
import { Section } from '../ui/Section.js';
import { SectionHeading } from '../ui/SectionHeading.js';
import { SegmentedTabs } from '../ui/SegmentedTabs.js';

const MenuItem = (item) =>
    Container({
        width: '100%',
        bgColor: 'transparent',
        gap: 4,
        paddingTop: 16,
        paddingBottom: 16,
        borderBottom: border(1, 'solid', colors.divider),
        children: [
            Row({
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 12,
                children: [
                    Text({
                        text: item.name,
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
                                text: tTime(item.time),
                                size: 12,
                                weight: 500,
                                color: colors.textSecondary,
                            }),
                        ],
                    }),
                ],
            }),
            Text({
                text: t(item.description),
                size: 14,
                color: colors.textSecondary,
                lineHeight: 1.5,
            }),
            Text({
                text: tList(item.ingredients),
                size: 12,
                color: colors.textDisabled,
                lineHeight: 1.5,
            }),
        ],
    });

const MenuPanel = (category, isMobile) =>
    Column({
        width: '100%',
        gap: 16,
        children: [
            Row({
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                wrap: true,
                gap: 8,
                children: [
                    Text({
                        text: t(category.note),
                        size: 14,
                        color: colors.textSecondary,
                        italic: true,
                    }),
                    Text({
                        text: `${category.items.length} ${t('plates · made to share')}`,
                        size: 12,
                        color: colors.textDisabled,
                    }),
                ],
            }),
            Grid({
                items: category.items,
                columns: isMobile ? 1 : 2,
                gap: isMobile ? 0 : 24,
                renderItem: (item) => MenuItem(item),
            }),
        ],
    });

export const MenuSection = ({ isMobile }) =>
    Section({
        id: 'menu',
        isMobile,
        bgColor: colors.surface,
        gap: 32,
        children: [
            SectionHeading({
                eyebrow: 'The menu',
                title: 'Cuban criollo, from starters to the whole ocean.',
                lead: 'Recipes with roots in Matanzas kitchens: garlic, sour orange, cumin and time. Ask about the catch — it changes with the boats.',
                isMobile,
                icon: 'restaurant',
            }),
            SegmentedTabs({
                tabs: MENU,
                panels: MENU.map((category) => MenuPanel(category, isMobile)),
                isMobile,
            }),
            Container({
                width: '100%',
                bgColor: colors.card,
                border: border(1, 'solid', colors.border),
                borderRadius: 16,
                padding: isMobile ? 16 : 24,
                direction: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'flex-start' : 'center',
                justifyContent: 'space-between',
                gap: 16,
                children: [
                    Column({
                        gap: 4,
                        alignItems: 'flex-start',
                        children: [
                            Text({
                                text: t('Can’t decide?'),
                                size: 18,
                                weight: 600,
                                color: colors.text,
                                fontFamily: fonts.display,
                            }),
                            Text({
                                text: t(
                                    'Order the Especial Guantanamera — lobster, shrimp, fish and pork for the middle of the table.',
                                ),
                                size: 14,
                                color: colors.textSecondary,
                                lineHeight: 1.5,
                            }),
                        ],
                    }),
                    Button({
                        text: t('Call to reserve'),
                        iconLeft: 'phone',
                        size: 'large',
                        borderRadius: 999,
                        bgColor: colors.primary,
                        color: colors.white,
                        elevation: 0,
                        onPress: () => callRestaurant(RESTAURANT.phoneHref),
                    }),
                ],
            }),
            Text({
                text: t('Vegetarian plates are available — ask your server and the kitchen will take care of it.'),
                size: 12,
                color: colors.textSecondary,
                align: 'center',
            }),
        ],
    });

export default MenuSection;
