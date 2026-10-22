// components/ui/SegmentedTabs.js — a small, brand-owned tab bar.
// The framework Tabs widget renders its pane host with the *framework* default
// surface, which follows the OS dark palette; this page owns a fixed cream
// palette and needs the pane to inherit it. Building the bar from Container +
// Text keeps every color explicit and avoids a global re-render on tab change.
import { Column, Container, Row, Text, border } from 'flet-box';
import { colors } from '../../theme.js';
import { t } from '../../utils/i18n.js';

// Survives the full re-render triggered by a viewport change.
let activeIndex = 0;

export const SegmentedTabs = ({ tabs, panels, isMobile = false }) => {
    const panelHost = Container({
        width: '100%',
        bgColor: 'transparent',
        overflow: 'visible',
        children: [panels[activeIndex] || panels[0]],
    });

    const buttons = [];
    const labels = [];

    const paint = (index) => {
        activeIndex = index;
        buttons.forEach((button, i) => {
            const isActive = i === index;
            button.update({
                bgColor: isActive ? colors.primary : 'transparent',
            });
            labels[i].update({
                color: isActive ? colors.white : colors.textSecondary,
                weight: isActive ? 600 : 500,
            });
        });

        while (panelHost.firstChild) panelHost.removeChild(panelHost.firstChild);
        panelHost.appendChild(panels[index] || panels[0]);
    };

    tabs.forEach((tab, index) => {
        const label = Text({
            text: t(isMobile ? tab.short || tab.label : tab.label),
            size: 12,
            weight: index === activeIndex ? 600 : 500,
            color: index === activeIndex ? colors.white : colors.textSecondary,
        });
        labels.push(label);

        const button = Container({
            flex: 1,
            minWidth: 0,
            height: 40,
            borderRadius: 999,
            bgColor: index === activeIndex ? colors.primary : 'transparent',
            direction: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            onPress: () => paint(index),
            child: label,
        });
        buttons.push(button);
    });

    return Column({
        width: '100%',
        gap: 24,
        children: [
            Row({
                width: '100%',
                gap: 4,
                bgColor: colors.card,
                border: border(1, 'solid', colors.border),
                borderRadius: 999,
                padding: 4,
                children: buttons,
            }),
            Container({
                width: '100%',
                bgColor: 'transparent',
                child: panelHost,
            }),
        ],
    });
};

export default SegmentedTabs;
