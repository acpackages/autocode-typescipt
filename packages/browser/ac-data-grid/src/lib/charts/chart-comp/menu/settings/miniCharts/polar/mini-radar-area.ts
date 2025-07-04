import type { Path } from 'ag-charts-types/scene';

import type { AgChartsExports } from '../../../../../agChartsExports';
import type { MiniChartSelector } from '../../miniChartsContainer';
import { createPolarPaths } from '../miniChartHelpers';
import { MiniChartWithPolarAxes } from '../miniChartWithPolarAxes';

export class AcDGMiniRadarAreaClass extends MiniChartWithPolarAxes {
    private readonly areas: Path[];

    private data = [
        [8, 10, 5, 7, 4, 1, 5, 8],
        [1, 1, 2, 7, 7, 8, 10, 1],
        [4, 5, 9, 9, 4, 2, 3, 4],
    ];

    constructor(container: HTMLElement, agChartsExports: AgChartsExports, fills: string[], strokes: string[]) {
        super(container, agChartsExports, 'radarAreaTooltip');

        const { size, padding, root, data } = this;
        this.showRadiusAxisLine = false;

        const radius = (size - padding * 2) / 2;
        const innerRadius = radius - size * 0.3;

        this.areas = createPolarPaths(agChartsExports, root, data, size, radius, innerRadius).paths;

        this.updateColors(fills, strokes);
    }

    updateColors(fills: string[], strokes: string[]) {
        this.areas.forEach((area, i) => {
            area.fill = fills[i];
            area.stroke = strokes[i];
        });
    }
}

export const MiniRadarArea: MiniChartSelector = {
    chartType: 'radarArea',
    miniChart: MiniRadarAreaClass,
};
