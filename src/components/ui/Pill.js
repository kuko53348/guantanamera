// components/ui/Pill.js — small badge used for hours, location and metadata.
import { Container, Icon, Text, border, rgba } from 'flet-box';
import { colors } from '../../theme.js';
import { isCaseless, t } from '../../utils/i18n.js';

export const Pill = ({ icon, label, tone = 'sand', size = 12 }) => {
    const tones = {
        sand: {
            bg: colors.surface,
            border: border(1, 'solid', colors.border),
            fg: colors.textSecondary,
            icon: colors.primary,
        },
        brand: {
            bg: colors.primary,
            border: border(1, 'solid', colors.primary),
            fg: colors.white,
            icon: colors.white,
        },
        sea: {
            bg: colors.card,
            border: border(1, 'solid', colors.secondary),
            fg: colors.secondary,
            icon: colors.secondary,
        },
        glass: {
            bg: rgba(20, 16, 13, 0.55),
            border: border(1, 'solid', rgba(255, 255, 255, 0.24)),
            fg: colors.white,
            icon: colors.white,
        },
    };
    const palette = tones[tone] || tones.sand;

    return Container({
        direction: 'row',
        alignItems: 'center',
        gap: 8,
        bgColor: palette.bg,
        border: palette.border,
        borderRadius: 999,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 12,
        children: [
            Icon({ name: icon, size: 16, color: palette.icon }),
            Text({
                text: t(label),
                size,
                weight: 500,
                color: palette.fg,
                letterSpacing: isCaseless() ? 0 : 1,
            }),
        ],
    });
};

export default Pill;
