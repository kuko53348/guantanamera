// components/sections/GallerySection.js — the room, the plates, the people.
// Every tile is the same size: a gallery is a set, not a competition, and a
// uniform grid keeps the captions and the eye moving at the same rhythm.
import { Button, Container, Image, Row, Text } from 'flet-box';
import { colors } from '../../theme.js';
import { GALLERY, RESTAURANT } from '../../data/content.js';
import { openExternal } from '../../utils/links.js';
import { Grid } from '../ui/Grid.js';
import { Section } from '../ui/Section.js';
import { SectionHeading } from '../ui/SectionHeading.js';

const GalleryTile = ({ item, isMobile }) =>
    Container({
        width: '100%',
        height: isMobile ? 220 : 240,
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
        bgColor: colors.surface,
        children: [
            Image({
                src: item.image,
                alt: item.alt,
                width: '100%',
                height: '100%',
                fit: 'cover',
            }),
            Container({
                position: 'absolute',
                bottom: 12,
                left: 12,
                bgColor: colors.overlay,
                borderRadius: 999,
                paddingTop: 8,
                paddingBottom: 8,
                paddingLeft: 12,
                paddingRight: 12,
                child: Text({
                    text: item.caption,
                    size: 12,
                    weight: 500,
                    color: colors.white,
                }),
            }),
        ],
    });

export const GallerySection = ({ isMobile }) =>
    Section({
        id: 'gallery',
        isMobile,
        bgColor: colors.background,
        gap: 32,
        children: [
            SectionHeading({
                eyebrow: 'La casa',
                title: 'A look inside the blue door.',
                lead: 'No filters needed: white linens, turquoise water, plantains on every plate and a team that treats the dining room like its living room.',
                isMobile,
                icon: 'photo_camera',
            }),
            Grid({
                items: GALLERY,
                columns: isMobile ? 2 : 4,
                gap: isMobile ? 12 : 16,
                renderItem: (item) => GalleryTile({ item, isMobile }),
            }),
            Row({
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 16,
                wrap: true,
                children: [
                    Text({
                        text: `Follow ${RESTAURANT.instagramHandle} for the daily plate.`,
                        size: 14,
                        color: colors.textSecondary,
                    }),
                    Button({
                        text: 'Follow on Instagram',
                        iconLeft: 'photo_camera',
                        variant: 'outlined',
                        size: 'large',
                        borderRadius: 999,
                        color: colors.primary,
                        elevation: 0,
                        onPress: () => openExternal(RESTAURANT.instagram),
                    }),
                ],
            }),
        ],
    });

export default GallerySection;
