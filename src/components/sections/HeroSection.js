// components/sections/HeroSection.js — the blue door, and the promise.
// The banner photo is portrait (3:4), so it is given a tall column of its own
// instead of being stretched across the viewport; that is what makes a long
// photo feel intentional rather than cropped.
import { Button, Column, Container, Icon, Image, Row, Stack, Text } from 'flet-box';
import { colors, fonts } from '../../theme.js';
import { RESTAURANT, ROUTES } from '../../data/content.js';
import { callRestaurant, goToSection } from '../../utils/links.js';
import { Pill } from '../ui/Pill.js';
import { Section } from '../ui/Section.js';

const MetaItem = ({ icon, label }) =>
    Row({
        gap: 8,
        alignItems: 'center',
        children: [
            Icon({ name: icon, size: 16, color: colors.primary }),
            Text({ text: label, size: 14, weight: 500, color: colors.textSecondary }),
        ],
    });

const DoorPhoto = ({ isMobile }) =>
    Stack({
        width: isMobile ? '100%' : 440,
        height: isMobile ? 420 : 600,
        borderRadius: 16,
        overflow: 'hidden',
        bgColor: colors.surface,
        children: [
            Image({
                src: 'assets/landing/door.webp',
                alt: 'The blue Guantanamera sign above the restaurant entrance at Plaza América, Varadero',
                width: '100%',
                height: '100%',
                fit: 'cover',
            }),
            Container({
                position: 'absolute',
                bottom: 16,
                left: 16,
                bgColor: 'transparent',
                child: Pill({ icon: 'place', label: 'Our door · Plaza América', tone: 'glass' }),
            }),
        ],
    });

const HeroCopy = ({ isMobile }) =>
    Column({
        flex: 1,
        minWidth: 0,
        gap: 24,
        justifyContent: 'center',
        alignItems: 'flex-start',
        children: [
            Row({
                gap: 8,
                wrap: true,
                children: [
                    Pill({ icon: 'wb_sunny', label: 'Open every day', tone: 'sand' }),
                    Pill({ icon: 'music_note', label: 'Son cubano', tone: 'sand' }),
                ],
            }),
            Column({
                gap: 16,
                alignItems: 'flex-start',
                children: [
                    Text({
                        text: 'Varadero · Matanzas · Cuba',
                        size: 12,
                        weight: 600,
                        color: colors.primary,
                        letterSpacing: 2,
                        textTransform: 'uppercase',
                    }),
                    Text({
                        text: 'Walk through the blue door. Taste the real Cuba.',
                        size: 32,
                        weight: 700,
                        color: colors.text,
                        fontFamily: fonts.display,
                        lineHeight: 1.2,
                    }),
                    Text({
                        text: 'Cuban criollo cooking, slow-roasted lechón and piña coladas by the sea — served every day inside Plaza América, a two-minute walk from the sand.',
                        size: 18,
                        color: colors.textSecondary,
                        lineHeight: 1.5,
                    }),
                ],
            }),
            Row({
                gap: 16,
                wrap: true,
                children: [
                    Button({
                        text: 'Explore the menu',
                        iconRight: 'arrow_forward',
                        size: 'large',
                        borderRadius: 999,
                        bgColor: colors.primary,
                        color: colors.white,
                        elevation: 0,
                        onPress: () => goToSection('menu', ROUTES.menu),
                    }),
                    Button({
                        text: RESTAURANT.phone,
                        iconLeft: 'phone',
                        variant: 'outlined',
                        size: 'large',
                        borderRadius: 999,
                        color: colors.primary,
                        elevation: 0,
                        onPress: () => callRestaurant(RESTAURANT.phoneHref),
                    }),
                ],
            }),
            Container({
                width: '100%',
                height: 1,
                bgColor: colors.border,
                marginTop: 8,
            }),
            Row({
                width: '100%',
                gap: isMobile ? 16 : 24,
                wrap: true,
                children: [
                    MetaItem({ icon: 'schedule', label: 'Lunch & dinner' }),
                    MetaItem({ icon: 'directions_walk', label: '2 min from the beach' }),
                    MetaItem({ icon: 'groups', label: 'Groups welcome' }),
                ],
            }),
        ],
    });

export const HeroSection = ({ isMobile }) =>
    Section({
        id: 'top',
        isMobile,
        paddingTop: isMobile ? 16 : 32,
        paddingBottom: isMobile ? 32 : 48,
        gap: 0,
        children: [
            isMobile
                ? Column({ gap: 24, width: '100%', children: [DoorPhoto({ isMobile }), HeroCopy({ isMobile })] })
                : Row({
                      width: '100%',
                      gap: 48,
                      alignItems: 'stretch',
                      children: [DoorPhoto({ isMobile }), HeroCopy({ isMobile })],
                  }),
        ],
    });

export default HeroSection;
