// components/ui/Section.js — the page's vertical rhythm.
// Every section is centered on the same 1200px column and uses the 8-based
// spacing scale: 48 above/below on desktop, 32 on mobile.
import { Container } from 'flet-box';
import { colors, layout } from '../../theme.js';

export const Section = ({
    id,
    isMobile,
    children,
    bgColor = 'transparent',
    gap = 32,
    narrow = false,
    paddingTop,
    paddingBottom,
    ...rest
}) => {
    const gutter = isMobile ? layout.gutter : layout.gutterWide;

    return Container({
        id,
        width: '100%',
        direction: 'column',
        alignItems: 'center',
        overflow: 'visible',
        bgColor,
        paddingTop: paddingTop !== undefined ? paddingTop : isMobile ? 32 : 48,
        paddingBottom: paddingBottom !== undefined ? paddingBottom : isMobile ? 32 : 48,
        ...rest,
        child: Container({
            width: '100%',
            maxWidth: narrow ? 800 : layout.maxWidth,
            direction: 'column',
            alignItems: 'stretch',
            gap,
            overflow: 'visible',
            bgColor: 'transparent',
            paddingLeft: gutter,
            paddingRight: gutter,
            children,
        }),
    });
};

export default Section;
