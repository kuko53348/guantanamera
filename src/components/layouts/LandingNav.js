// components/layouts/LandingNav.js — the sticky chrome of the landing page.
// Desktop: wordmark, five anchors, phone + reserve. Mobile: wordmark + call,
// with the same anchors on a second, horizontally scrollable line.
import { Button, Column, Container, Icon, Row, Text, border } from 'flet-box';
import { colors, fonts, layout } from '../../theme.js';
import { NAV_LINKS, RESTAURANT, ROUTES } from '../../data/content.js';
import { callRestaurant, goToSection } from '../../utils/links.js';

const Brand = ({ isMobile }) =>
    Row({
        // Row and Column default to width:100%, which makes the wordmark eat
        // the whole nav line; as an inline group it must size to its content.
        width: 'auto',
        flexShrink: 0,
        gap: 12,
        alignItems: 'center',
        cursor: 'pointer',
        onPress: () => goToSection('top', ROUTES.home),
        children: [
            Container({
                width: 40,
                height: 40,
                borderRadius: 8,
                bgColor: colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
                child: Text({
                    text: 'G',
                    size: 24,
                    weight: 700,
                    color: colors.white,
                    fontFamily: fonts.display,
                }),
            }),
            Column({
                width: 'auto',
                gap: 0,
                alignItems: 'flex-start',
                children: [
                    Text({
                        text: RESTAURANT.name,
                        size: isMobile ? 18 : 24,
                        weight: 700,
                        color: colors.text,
                        fontFamily: fonts.display,
                        lineHeight: 1.2,
                    }),
                    isMobile
                        ? Text({
                              text: 'Cuban kitchen · Varadero',
                              size: 12,
                              weight: 500,
                              color: colors.textSecondary,
                              letterSpacing: 1,
                          })
                        : Text({
                              text: 'Restaurante Cubano · Varadero',
                              size: 12,
                              weight: 500,
                              color: colors.textSecondary,
                              letterSpacing: 2,
                              textTransform: 'uppercase',
                          }),
                ],
            }),
        ],
    });

const NavLink = ({ label, id, route }) =>
    Text({
        text: label,
        size: 14,
        weight: 500,
        color: colors.textSecondary,
        cursor: 'pointer',
        onPress: () => goToSection(id, route),
    });

export const LandingNav = ({ isMobile }) => {
    const links = NAV_LINKS.map((link) => NavLink(link));

    if (isMobile) {
        return Container({
            width: '100%',
            bgColor: colors.background,
            borderBottom: border(1, 'solid', colors.border),
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 16,
            paddingRight: 16,
            direction: 'column',
            gap: 8,
            children: [
                Row({
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    children: [
                        Brand({ isMobile: true }),
                        Icon({
                            name: 'phone',
                            size: 24,
                            color: colors.primary,
                            onPress: () => callRestaurant(RESTAURANT.phoneHref),
                        }),
                    ],
                }),
                Container({
                    width: '100%',
                    bgColor: 'transparent',
                    direction: 'row',
                    gap: 24,
                    alignItems: 'center',
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    children: links,
                }),
            ],
        });
    }

    return Container({
        width: '100%',
        bgColor: colors.background,
        borderBottom: border(1, 'solid', colors.border),
        // alignItems centers the 1200 column, so the nav starts where every
        // Section starts instead of hugging the viewport edge.
        alignItems: 'center',
        child: Container({
            width: '100%',
            height: 72,
            maxWidth: layout.maxWidth,
            direction: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            paddingLeft: layout.gutterWide,
            paddingRight: layout.gutterWide,
            bgColor: 'transparent',
            children: [
                Brand({ isMobile: false }),
                Row({
                    // The nav is three inline groups on one 1200 line. Each one
                    // sizes to its content so the links sit flush against the
                    // reserve button instead of stretching across the bar.
                    width: 'auto',
                    flexShrink: 0,
                    gap: 24,
                    alignItems: 'center',
                    children: [
                        Row({
                            width: 'auto',
                            gap: 24,
                            alignItems: 'center',
                            children: links,
                        }),
                        Button({
                            text: 'Reserve a table',
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
            ],
        }),
    });
};

export default LandingNav;
