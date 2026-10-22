// components/layouts/LandingNav.js — the sticky chrome of the landing page.
// Desktop: wordmark with the six language buttons on the first row, the anchors
// and the phone button on the second. Mobile: wordmark + call, then the anchors
// on a wrapping line, then the languages. Nothing here scrolls sideways: a strip
// you have to drag reads as a broken bar on a phone, so the lines wrap and the
// header grows instead.
import { Button, Column, Container, Icon, Row, Text, border } from 'flet-box';
import { colors, fonts, layout } from '../../theme.js';
import { NAV_LINKS, RESTAURANT, ROUTES } from '../../data/content.js';
import { callRestaurant, goToSection } from '../../utils/links.js';
import { getLang, isCaseless, LOCALES, setLang, t } from '../../utils/i18n.js';

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
                              text: t('Cuban kitchen · Varadero'),
                              size: 12,
                              weight: 500,
                              color: colors.textSecondary,
                              letterSpacing: 1,
                          })
                        : Text({
                              text: t('Restaurante Cubano · Varadero'),
                              size: 12,
                              weight: 500,
                              color: colors.textSecondary,
                              letterSpacing: isCaseless() ? 0 : 2,
                              textTransform: isCaseless() ? 'none' : 'uppercase',
                          }),
                ],
            }),
        ],
    });

const NavLink = ({ label, id, route, icon }) => {
    const text = Text({
        text: t(label),
        size: 14,
        weight: 500,
        color: colors.textSecondary,
        // flexShrink keeps a two-word anchor on one line: squeezed, "Our story"
        // used to break in half and the last anchor fell off the edge.
        flexShrink: 0,
        cursor: 'pointer',
        onPress: () => goToSection(id, route),
    });
    // A link with an icon is not a section of the restaurant — it is a page of
    // its own, and the mark is what tells it apart from the anchors.
    return icon
        ? Row({
              width: 'auto',
              flexShrink: 0,
              gap: 6,
              alignItems: 'center',
              cursor: 'pointer',
              onPress: () => goToSection(id, route),
              children: [Icon({ name: icon, size: 16, color: colors.primary }), text],
          })
        : text;
};

const LangPill = ({ code, short }) => {
    const active = getLang() === code;
    return Container({
        width: 'auto',
        flexShrink: 0,
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 999,
        bgColor: active ? colors.primary : 'transparent',
        border: border(1, 'solid', active ? colors.primary : colors.border),
        cursor: 'pointer',
        onPress: () => setLang(code),
        child: Text({
            text: short,
            size: 11,
            weight: 600,
            color: active ? colors.white : colors.textSecondary,
            letterSpacing: 0.5,
        }),
    });
};

// Always buttons, never a <select>: a guest should see every language and tap one
// without opening anything. The pills wrap rather than shrink, so adding a locale
// to LOCALES costs a row instead of clipping a button.
const LanguageSwitcher = () =>
    Row({
        width: 'auto',
        flexShrink: 0,
        gap: 6,
        alignItems: 'center',
        wrap: 'wrap',
        children: [
            Icon({ name: 'translate', size: 18, color: colors.textSecondary }),
            ...LOCALES.map((locale) => LangPill(locale)),
        ],
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
                    children: [Brand({ isMobile: true }), Icon({
                        name: 'phone',
                        size: 24,
                        color: colors.primary,
                        onPress: () => callRestaurant(RESTAURANT.phoneHref),
                    })],
                }),
                Container({
                    width: '100%',
                    bgColor: 'transparent',
                    direction: 'row',
                    gap: 16,
                    alignItems: 'center',
                    wrap: 'wrap',
                    children: links,
                }),
                LanguageSwitcher(),
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
            // Two deliberate rows: brand with the languages above, the anchors
            // with the call-to-action below. One line cannot hold all four groups
            // inside the 1200 column (they need ~1430px), and a Row that overflows
            // silently drops the CTA onto its own line under the brand.
            minHeight: 72,
            paddingTop: 12,
            paddingBottom: 12,
            maxWidth: layout.maxWidth,
            direction: 'column',
            alignItems: 'stretch',
            gap: 12,
            paddingLeft: layout.gutterWide,
            paddingRight: layout.gutterWide,
            bgColor: 'transparent',
            children: [
                Row({
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    wrap: 'wrap',
                    gap: 16,
                    children: [Brand({ isMobile: false }), LanguageSwitcher()],
                }),
                Row({
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    wrap: 'wrap',
                    gap: 24,
                    children: [
                        Row({
                            width: 'auto',
                            gap: 24,
                            alignItems: 'center',
                            // Below ~900px the six anchors take their own row and
                            // the reserve button keeps its full width.
                            wrap: 'wrap',
                            children: links,
                        }),
                        Button({
                            text: t('Reserve a table'),
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
