// components/sections/SeaBand.js — a full-bleed breath between plates.
import { Column, Container, Row, Text } from 'flet-box';
import { colors, fonts } from '../../theme.js';
import { Pill } from '../ui/Pill.js';

export const SeaBand = ({ isMobile }) =>
    Container({
        width: '100%',
        height: isMobile ? 360 : 440,
        bgImage: 'url(assets/landing/terrace.webp)',
        bgSize: 'cover',
        position: 'relative',
        children: [
            Container({
                width: '100%',
                height: '100%',
                bgColor: colors.overlay,
                justifyContent: 'center',
                alignItems: 'center',
                padding: isMobile ? 24 : 48,
                child: Column({
                    gap: 24,
                    alignItems: 'center',
                    maxWidth: 720,
                    children: [
                        Row({
                            gap: 8,
                            children: [
                                Pill({ icon: 'place', label: 'Varadero · Cuba', tone: 'glass' }),
                            ],
                        }),
                        Text({
                            text: 'The view comes with the meal.',
                            size: 32,
                            weight: 700,
                            color: colors.white,
                            fontFamily: fonts.display,
                            align: 'center',
                            lineHeight: 1.2,
                        }),
                        Text({
                            text: 'Palms, turquoise water and a table that nobody wants to leave. This is the terrace — and it is yours for as long as the coffee lasts.',
                            size: 16,
                            color: 'rgba(255,255,255,0.72)',
                            align: 'center',
                            lineHeight: 1.5,
                        }),
                    ],
                }),
            }),
        ],
    });

export default SeaBand;
