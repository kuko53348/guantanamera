// screens/DeveloperScreen.js — the thank-you page.
// The landing page sells the restaurant and the carta lists it; this one is the
// only page that speaks for the person who wrote the code. It is its own route
// so the gratitude never competes with a guest's reason for being here, and so
// the names can be given a full screen instead of a footer line.
import { Button, Column, Container, Icon, Image, Row, Text, border } from 'flet-box';
import { colors, fonts } from '../theme.js';
import { DEVELOPER } from '../data/developer.js';
import { ROUTES } from '../data/content.js';
import { goToSection, openExternal } from '../utils/links.js';
import { t } from '../utils/i18n.js';
import { Section } from '../components/ui/Section.js';
import { SectionHeading } from '../components/ui/SectionHeading.js';
import { Grid } from '../components/ui/Grid.js';
import { FooterSection } from '../components/sections/FooterSection.js';

// The four photos are 540–700px wide, so none of them is stretched edge to edge:
// the greeting is a two-column block with the toast on the right, and the photo
// keeps its own pixels. A full-bleed band would have to upscale them, and a
// blurry thank-you note reads worse than a small one.
const HeroBand = ({ isMobile }) =>
    Section({
        id: 'top',
        isMobile,
        bgColor: colors.background,
        gap: 32,
        children: [
            Row({
                width: '100%',
                gap: 32,
                alignItems: 'center',
                wrap: isMobile,
                children: [
                    Container({
                        direction: 'column',
                        gap: 24,
                        alignItems: 'center',
                        // A Container with no bgColor paints the framework's
                        // theme-driven default, which showed up as a pale box
                        // behind the greeting.
                        bgColor: 'transparent',
                        flex: 1,
                        minWidth: isMobile ? '100%' : 320,
                        child: Column({
                            gap: 24,
                            alignItems: 'center',
                            maxWidth: 520,
                            children: [
                                SectionHeading({
                                    eyebrow: DEVELOPER.hero.eyebrow,
                                    title: DEVELOPER.hero.title,
                                    lead: DEVELOPER.hero.lead,
                                    isMobile,
                                    align: 'center',
                                    icon: 'favorite',
                                }),
                                // Two ways out of a thank-you note: keep reading,
                                // or go back to the restaurant. Both are offered
                                // here so nobody has to scroll to the bottom to
                                // leave, or hunt the header for the way home.
                                Row({
                                    gap: 16,
                                    wrap: true,
                                    children: [
                                        Button({
                                            text: t('Read their names'),
                                            iconLeft: 'south',
                                            size: 'large',
                                            borderRadius: 999,
                                            bgColor: colors.primary,
                                            color: colors.white,
                                            elevation: 0,
                                            onPress: () => goToSection('collective', ROUTES.developer),
                                        }),
                                        Button({
                                            text: t('Back to the house'),
                                            iconLeft: 'home',
                                            variant: 'outlined',
                                            size: 'large',
                                            borderRadius: 999,
                                            color: colors.primary,
                                            elevation: 0,
                                            onPress: () => goToSection('top', ROUTES.home),
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    }),
                    Container({
                        width: isMobile ? '100%' : 480,
                        height: isMobile ? 260 : 360,
                        flexShrink: 0,
                        child: Image({
                            src: DEVELOPER.hero.image,
                            alt: t(DEVELOPER.hero.alt),
                            width: '100%',
                            height: '100%',
                            fit: 'cover',
                            borderRadius: 16,
                        }),
                    }),
                ],
            }),
        ],
    });

const NameCard = (name) =>
    Container({
        width: '100%',
        direction: 'column',
        alignItems: 'center',
        gap: 8,
        padding: 16,
        bgColor: colors.card,
        border: border(1, 'solid', colors.border),
        borderRadius: 12,
        children: [
            Icon({ name: 'favorite', size: 18, color: colors.primary }),
            Text({
                text: name,
                size: 16,
                weight: 600,
                color: colors.text,
                align: 'center',
                fontFamily: fonts.display,
            }),
        ],
    });

const ThanksSection = ({ isMobile }) =>
    Section({
        id: 'collective',
        isMobile,
        narrow: true,
        bgColor: colors.background,
        gap: 24,
        children: [
            SectionHeading({
                eyebrow: DEVELOPER.thanks.eyebrow,
                title: DEVELOPER.thanks.title,
                isMobile,
                align: 'center',
                icon: 'groups',
            }),
            ...DEVELOPER.thanks.paragraphs.map((text) =>
                Text({
                    text: t(text),
                    size: 16,
                    color: colors.textSecondary,
                    lineHeight: 1.7,
                    align: 'center',
                }),
            ),
            Grid({
                items: DEVELOPER.thanks.names,
                columns: isMobile ? 2 : 4,
                gap: 16,
                renderItem: NameCard,
            }),
        ],
    });

const PhotoCard = ({ image, alt, caption }, isMobile) =>
    Column({
        width: '100%',
        gap: 12,
        children: [
            Image({
                src: image,
                alt: t(alt),
                width: '100%',
                height: isMobile ? 240 : 280,
                fit: 'cover',
                borderRadius: 16,
            }),
            Text({
                text: t(caption),
                size: 14,
                color: colors.textSecondary,
                lineHeight: 1.5,
            }),
        ],
    });

const PhotosSection = ({ isMobile }) =>
    Section({
        id: 'fotos',
        isMobile,
        bgColor: colors.surface,
        gap: 24,
        children: [
            Grid({
                items: DEVELOPER.photos,
                columns: isMobile ? 1 : 3,
                gap: 24,
                renderItem: (photo) => PhotoCard(photo, isMobile),
            }),
        ],
    });

const ContactRow = ({ label, icon, href }) =>
    Container({
        width: '100%',
        direction: 'row',
        alignItems: 'center',
        gap: 16,
        padding: 16,
        bgColor: colors.card,
        border: border(1, 'solid', colors.border),
        borderRadius: 12,
        cursor: 'pointer',
        onPress: () => openExternal(href),
        children: [
            Icon({ name: icon, size: 20, color: colors.primary }),
            Text({ text: t(label), size: 16, weight: 500, color: colors.text, flex: 1 }),
            Icon({ name: 'open_in_new', size: 18, color: colors.textDisabled }),
        ],
    });

const ContactSection = ({ isMobile }) =>
    Section({
        id: 'contacto',
        isMobile,
        narrow: true,
        bgColor: colors.background,
        gap: 24,
        children: [
            SectionHeading({
                eyebrow: DEVELOPER.contact.eyebrow,
                title: DEVELOPER.contact.title,
                isMobile,
                align: 'center',
                icon: 'send',
            }),
            Column({
                width: '100%',
                gap: 12,
                children: DEVELOPER.contact.rows.map(ContactRow),
            }),
            Button({
                text: t('Back to the house'),
                iconLeft: 'arrow_back',
                variant: 'text',
                size: 'large',
                color: colors.primary,
                elevation: 0,
                onPress: () => goToSection('top', ROUTES.home),
            }),
        ],
    });

export const DeveloperScreen = ({ isMobile = false }) =>
    Container({
        width: '100%',
        flex: 1,
        direction: 'column',
        overflowX: 'hidden',
        overflowY: 'auto',
        bgColor: colors.background,
        children: [
            HeroBand({ isMobile }),
            ThanksSection({ isMobile }),
            PhotosSection({ isMobile }),
            ContactSection({ isMobile }),
            FooterSection({ isMobile }),
        ],
    });

export default DeveloperScreen;
