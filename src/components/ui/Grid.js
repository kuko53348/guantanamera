// components/ui/Grid.js — a fixed-column grid built from real Rows.
// FletBox has GridView, but it is virtualized and needs a fixed height; a
// landing page needs every card in the document flow, so Rows are the honest
// primitive here. Empty cells keep the last row's widths aligned.
import { Column, Container, Row } from 'flet-box';

export const Grid = ({ items, columns = 2, gap = 24, renderItem }) => {
    const rows = [];
    const safeColumns = Math.max(1, columns);

    for (let start = 0; start < items.length; start += safeColumns) {
        const slice = items.slice(start, start + safeColumns);
        const cells = slice.map((item, index) =>
            Container({
                flex: 1,
                minWidth: 0,
                overflow: 'visible',
                bgColor: 'transparent',
                child: renderItem(item, start + index),
            }),
        );

        while (cells.length < safeColumns) {
            cells.push(Container({ flex: 1, minWidth: 0, bgColor: 'transparent' }));
        }

        rows.push(
            Row({
                width: '100%',
                gap,
                alignItems: 'stretch',
                children: cells,
            }),
        );
    }

    return Column({ width: '100%', gap, children: rows });
};

export default Grid;
