import type { Rect } from 'ag-charts-types/scene';

import type { AgChartsExports } from '../../../../../agChartsExports';
import type { MiniChartSelector } from '../../miniChartsContainer';
import { accumulateData } from '../miniChartHelpers';
import { MiniChartWithAxes } from '../miniChartWithAxes';

export class AcDGMiniWaterfallClass extends MiniChartWithAxes {
    private readonly bars: Rect[];

    private data = [4, 3, -3, 6, -3];

    constructor(
        container: HTMLElement,
        agChartsExports: AgChartsExports,
        fills: string[],
        strokes: string[],
        isCustomTheme: boolean
    ) {
        super(container, agChartsExports, 'waterfallTooltip');

        this.bars = this.createWaterfall(this.root, this.data, this.size, this.padding, 'vertical').bars;
        this.updateColors(fills, strokes, isCustomTheme);
    }

    updateColors(fills: string[], strokes: string[], isCustomTheme?: boolean) {
        const {
            data,
            agChartsExports: { _Theme },
        } = this;
        const positive = {
            fill: isCustomTheme ? fills[0] : _Theme.resolveOperation({ $palette: 'altUp.fill' }),
            stroke: isCustomTheme ? strokes[0] : _Theme.resolveOperation({ $palette: 'altUp.stroke' }),
        };
        const negative = {
            fill: isCustomTheme ? fills[1] : _Theme.resolveOperation({ $palette: 'altDown.fill' }),
            stroke: isCustomTheme ? strokes[1] : _Theme.resolveOperation({ $palette: 'altDown.stroke' }),
        };
        this.bars.forEach((bar, i) => {
            const isPositive = data[i] >= 0;
            bar.fill = isPositive ? positive.fill : negative.fill;
            bar.stroke = isPositive ? positive.stroke : negative.stroke;
        });
    }

    createWaterfall(
        root: any,
        data: number[],
        size: number,
        padding: number,
        direction: 'horizontal' | 'vertical'
    ): { bars: any[] } {
        const scalePadding = 2 * padding;

        const { processedData, min, max } = accumulateData(data.map((d) => [d]));
        const flatData = processedData.reduce((flat, d) => flat.concat(d), []);
        const { _Scene } = this.agChartsExports;
        const yScale = new _Scene.LinearScale();
        yScale.domain = [Math.min(min, 0), max];
        yScale.range = [size - scalePadding, scalePadding];

        const xScale = new _Scene.CategoryScale();
        xScale.domain = data.map((_, index) => index);
        xScale.range = [padding, size - padding];
        xScale.paddingInner = 0.2;
        xScale.paddingOuter = 0.3;

        const width = xScale.bandwidth;

        const connectorLine = new _Scene.Path();
        connectorLine.stroke = '#575757';
        connectorLine.strokeWidth = 0;
        const pixelAlignmentOffset = (Math.floor(connectorLine.strokeWidth) % 2) / 2;

        const connectorPath = connectorLine.path;
        connectorPath.clear();

        const barAlongX = direction === 'horizontal';

        const bars = flatData.map((datum, i) => {
            const previousDatum = i > 0 ? flatData[i - 1] : 0;
            const rawValue = data[i];
            const isPositive = rawValue > 0;

            const currY = Math.round(yScale.convert(datum));
            const trailY = Math.round(yScale.convert(previousDatum));
            const y = (isPositive ? currY : trailY) - pixelAlignmentOffset;
            const bottomY = (isPositive ? trailY : currY) + pixelAlignmentOffset;
            const height = Math.abs(bottomY - y);

            const x = xScale.convert(i);

            const rect = new _Scene.Rect();
            rect.x = barAlongX ? y : x;
            rect.y = barAlongX ? x : y;
            rect.width = barAlongX ? height : width;
            rect.height = barAlongX ? width : height;
            rect.strokeWidth = 0;
            rect.crisp = true;

            const moveTo = currY + pixelAlignmentOffset;
            const lineTo = trailY + pixelAlignmentOffset;

            if (i > 0) {
                const lineToX = barAlongX ? lineTo : rect.x;
                const lineToY = barAlongX ? rect.y : lineTo;
                connectorPath.lineTo(lineToX, lineToY);
            }
            const moveToX = barAlongX ? moveTo : rect.x;
            const moveToY = barAlongX ? rect.y : moveTo;
            connectorPath.moveTo(moveToX, moveToY);

            return rect;
        });

        root.append([connectorLine, ...bars]);

        return { bars };
    }
}

export const MiniWaterfall: MiniChartSelector = {
    chartType: 'waterfall',
    miniChart: MiniWaterfallClass,
};
