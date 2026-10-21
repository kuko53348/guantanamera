// components/sections/FlavorBand.js — the sabor ribbon and the tile strip.
// The flavors are chips with flex-wrap, not one long line: a ticker that can
// only scroll is a broken ribbon on a phone. Chips wrap and stay centered at
// every width, and the band never adds horizontal overflow to the page.
import { Container, Row, Text, border, rgba } from 'flet-box';
import { colors, layout } from '../../theme.js';

const FLAVORS = [
    'Lechón asado',
    'Tostones',
    'Paella cubana',
    'Camarones al ajillo',
    'Piña colada',
    'Son cubano',
];

const FlavorChip = ({ label }) =>
    Container({
        bgColor: rgba(255, 255, 255, 0.12),
        border: border(1, 'solid', rgba(255, 255, 255, 0.28)),
        borderRadius: 999,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 10,
        paddingRight: 10,
        child: Text({
            text: label,
            size: 12,
            weight: 600,
            color: colors.white,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
        }),
    });

export const FlavorBand = () =>
    Container({
        width: '100%',
        bgColor: colors.primary,
        overflowX: 'hidden',
        // The band paints full-bleed, but the chip line is capped at the reading
        // width; without this the capped Row sits against the left edge and the
        // ribbon reads as off-centre on a wide screen.
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 16,
        paddingRight: 16,
        child: Row({
            width: '100%',
            maxWidth: layout.maxWidth,
            justifyContent: 'center',
            alignItems: 'center',
            wrap: true,
            gap: 8,
            children: FLAVORS.map((label) => FlavorChip({ label })),
        }),
    });

export const TileStrip = ({ height = 24 }) =>
    Container({
        width: '100%',
        bgColor: 'transparent',
        height,
        bgImage: 'url(assets/landing/tile.svg)',
        bgSize: '32px 32px',
        opacity: 0.9,
    });

export default FlavorBand;
