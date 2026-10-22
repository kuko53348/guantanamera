// components/sections/DishBoard.js — the written menu, made visible.
// A square grid of real plates: it answers the question a menu cannot, and it
// lets the kitchen photography carry the page between the menu and the bar.
import { Container, Icon, Image, Row, Text, rgba } from 'flet-box';
import { colors } from '../../theme.js';
import { DISH_GALLERY } from '../../data/content.js';
import { t } from '../../utils/i18n.js';
import { Grid } from '../ui/Grid.js';
import { Section } from '../ui/Section.js';
import { SectionHeading } from '../ui/SectionHeading.js';

const DishTile = ({ dish, isMobile }) =>
    Container({
        width: '100%',
        height: isMobile ? 180 : 240,
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
        bgColor: colors.surface,
        children: [
            Image({
                src: dish.image,
                alt: dish.alt,
                width: '100%',
                height: '100%',
                fit: 'cover',
            }),
            Container({
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                bgColor: rgba(20, 16, 13, 0.62),
                paddingTop: 8,
                paddingBottom: 8,
                paddingLeft: 12,
                paddingRight: 12,
                child: Text({
                    text: dish.caption,
                    size: 12,
                    weight: 500,
                    color: colors.white,
                    lineHeight: 1.3,
                }),
            }),
        ],
    });

export const DishBoard = ({ isMobile }) =>
    Section({
        id: 'dishes',
        isMobile,
        bgColor: colors.background,
        gap: 32,
        children: [
            SectionHeading({
                eyebrow: 'From the pass',
                title: 'The plates, exactly as they arrive.',
                lead: 'No styling, no stand-ins: real plates from our kitchen, photographed the way they reach the table. The catch changes with the boats; the generosity does not.',
                isMobile,
                icon: 'restaurant_menu',
            }),
            Grid({
                items: DISH_GALLERY,
                columns: isMobile ? 2 : 4,
                gap: isMobile ? 12 : 16,
                renderItem: (dish) => DishTile({ dish, isMobile }),
            }),
            Row({
                width: '100%',
                gap: 8,
                alignItems: 'center',
                justifyContent: 'center',
                wrap: true,
                children: [
                    Icon({ name: 'set_meal', size: 16, color: colors.secondary }),
                    Text({
                        text: t('The card changes with the morning catch — ask your server what came in today.'),
                        size: 12,
                        color: colors.textSecondary,
                        align: 'center',
                    }),
                ],
            }),
        ],
    });

export default DishBoard;
