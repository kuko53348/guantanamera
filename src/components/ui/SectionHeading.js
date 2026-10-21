// components/ui/SectionHeading.js — eyebrow, serif headline, optional lead.
import { Column, Icon, Row, Text } from 'flet-box';
import { colors, fonts } from '../../theme.js';

export const SectionHeading = ({
    eyebrow,
    title,
    lead,
    isMobile,
    align = 'left',
    light = false,
    icon = 'star',
}) => {
    const centered = align === 'center';
    const titleColor = light ? colors.white : colors.text;
    const leadColor = light ? 'rgba(255,255,255,0.72)' : colors.textSecondary;

    const children = [
        Row({
            gap: 8,
            alignItems: 'center',
            justifyContent: centered ? 'center' : 'flex-start',
            wrap: true,
            children: [
                Icon({
                    name: icon,
                    size: 16,
                    color: light ? 'rgba(255,255,255,0.72)' : colors.primary,
                }),
                Text({
                    text: eyebrow,
                    size: 12,
                    weight: 600,
                    color: light ? 'rgba(255,255,255,0.72)' : colors.primary,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                }),
            ],
        }),
        Text({
            text: title,
            size: isMobile ? 32 : 32,
            weight: 700,
            color: titleColor,
            fontFamily: fonts.display,
            lineHeight: 1.2,
            align: centered ? 'center' : 'left',
        }),
    ];

    if (lead) {
        children.push(
            Text({
                text: lead,
                size: 16,
                color: leadColor,
                lineHeight: 1.5,
                align: centered ? 'center' : 'left',
                maxWidth: 640,
            }),
        );
    }

    return Column({
        width: '100%',
        gap: 16,
        alignItems: centered ? 'center' : 'flex-start',
        children,
    });
};

export default SectionHeading;
