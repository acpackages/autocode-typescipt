import type {
    AgChartInstance,
    AgChartInstanceOptions,
    AgChartOptions,
    AgChartTheme,
    AgChartThemeOverrides,
    AgChartThemePalette,
    AgCommonThemeableChartOptions,
    AgCrosshairOptions,
} from 'ag-charts-types';

import type { ChartType, SeriesChartType, SeriesGroupType } from 'ag-grid-community';

import type { AgChartsExports } from '../../agChartsExports';
import type { CrossFilteringContext } from '../../chartService';
import { deproxy } from '../utils/integration';
import { get } from '../utils/object';
import type { ChartSeriesType } from '../utils/seriesTypeMapper';
import { getSeriesType } from '../utils/seriesTypeMapper';
import { createAgChartTheme, lookupCustomChartTheme } from './chartTheme';

export interface IAcDGChartProxyParams {
    agChartsExports: AgChartsExports;
    chartInstance?: AgChartInstance<AgChartInstanceOptions>;
    chartType: ChartType;
    customChartThemes?: { [name: string]: AgChartTheme };
    parentElement: HTMLElement;
    grouping: boolean;
    styleNonce?: string;
    getChartThemeName: () => string;
    getChartThemes: () => string[];
    getGridOptionsChartThemeOverrides: () => AgChartThemeOverrides | undefined;
    getExtraPaddingDirections: () => ExtraPaddingDirection[];
    apiChartThemeOverrides?: AgChartThemeOverrides;
    crossFiltering: boolean;
    crossFilterCallback: (event: any, reset?: boolean) => void;
    chartThemeToRestore?: string;
    chartOptionsToRestore?: AgChartThemeOverrides;
    chartPaletteToRestore?: AgChartThemePalette;
    seriesChartTypes: SeriesChartType[];
    suppressFieldDotNotation?: boolean;
    translate: (toTranslate: string, defaultText?: string) => string;
}

export type ExtraPaddingDirection = 'top' | 'right' | 'bottom' | 'left';

export interface IAcDGFieldDefinition {
    colId: string;
    displayName: string | null;
}

export interface IAcDGUpdateParams {
    data: any[];
    groupData?: any[];
    grouping: boolean;
    categories: {
        id: string;
        name: string;
        chartDataType?: string;
    }[];
    fields: FieldDefinition[];
    chartId?: string;
    getCrossFilteringContext: () => CrossFilteringContext;
    seriesChartTypes: SeriesChartType[];
    updatedOverrides?: AgChartThemeOverrides;
    seriesGroupType?: SeriesGroupType;
}

export abstract class AcDGChartProxy<
    TOptions extends AgChartOptions = AgChartOptions,
    TSeries extends ChartSeriesType = ChartSeriesType,
> {
    protected readonly agChartsExports: AgChartsExports;
    protected readonly chartType: ChartType;
    protected readonly standaloneChartType: TSeries;

    protected readonly chart: AgChartInstance<AgChartInstanceOptions>;
    protected readonly crossFiltering: boolean;
    protected readonly crossFilterCallback: (event: any, reset?: boolean) => void;

    protected clearThemeOverrides = false;

    public constructor(protected readonly chartProxyParams: ChartProxyParams) {
        this.agChartsExports = chartProxyParams.agChartsExports;
        this.chart = chartProxyParams.chartInstance!;
        this.chartType = chartProxyParams.chartType;
        this.crossFiltering = chartProxyParams.crossFiltering;
        this.crossFilterCallback = chartProxyParams.crossFilterCallback;
        this.standaloneChartType = getSeriesType(this.chartType) as TSeries;

        if (this.chart == null) {
            this.chart = chartProxyParams.agChartsExports.create(this.getCommonChartOptions());
        } else {
            // On chart change, reset formatting panel changes.
            this.clearThemeOverrides = true;
        }
    }

    protected abstract getUpdateOptions(params: UpdateParams, commonChartOptions: TOptions): TOptions;

    public crossFilteringReset(): void {
        // only required in cartesian charts
    }

    public update(params: UpdateParams): void {
        this.getChartRef().update(this.getUpdateOptions(params, this.getCommonChartOptions(params.updatedOverrides)));
    }

    public updateThemeOverrides(themeOverrides: AgChartThemeOverrides): void {
        this.getChartRef().updateDelta({ theme: { overrides: themeOverrides } });
    }

    public getChart() {
        return deproxy(this.chart);
    }

    public getChartRef() {
        return this.chart;
    }

    public downloadChart(dimensions?: { width: number; height: number }, fileName?: string, fileFormat?: string) {
        const { chart } = this;
        const rawChart = deproxy(chart);
        const imageFileName = fileName || (rawChart.title ? rawChart.title.text : 'chart');
        const { width, height } = dimensions || {};

        chart.download({ width, height, fileName: imageFileName, fileFormat });
    }

    public getChartImageDataURL(type?: string) {
        return this.getChart().getCanvasDataURL(type);
    }

    private getChartOptions(): AgChartInstanceOptions {
        return this.chart.getOptions();
    }

    public getChartThemeOverrides(): AgChartThemeOverrides {
        const chartOptionsTheme = this.getChartOptions().theme as AgChartTheme;
        return chartOptionsTheme.overrides ?? {};
    }

    public getChartPalette(): AgChartThemePalette | undefined {
        return this.agChartsExports._Theme.getChartTheme(this.getChartOptions().theme).palette;
    }

    public setPaired(paired: boolean) {
        // Special handling to make scatter charts operate in paired mode by default, where
        // columns alternate between being X and Y (and size for bubble). In standard mode,
        // the first column is used for X and every other column is treated as Y
        // (or alternates between Y and size for bubble)
        const seriesType = getSeriesType(this.chartProxyParams.chartType);
        this.chart.updateDelta({ theme: { overrides: { [seriesType]: { paired } } } });
    }

    public isPaired(): boolean {
        const seriesType = getSeriesType(this.chartProxyParams.chartType);
        return get(this.getChartThemeOverrides(), `${seriesType}.paired`, true);
    }

    public lookupCustomChartTheme(themeName: string) {
        return lookupCustomChartTheme(this.chartProxyParams, themeName);
    }

    public getSeriesGroupType(): SeriesGroupType | undefined {
        return undefined;
    }

    protected transformCategoryData(data: any[], categoryKey: string): any[] {
        // replace the values for the selected category with a complex object to allow for duplicated categories
        return data.map((d, index) => {
            const value = d[categoryKey];
            const valueString = value && value.toString ? value.toString() : '';
            const datum = { ...d };

            datum[categoryKey] = { id: index, value, toString: () => valueString };

            return datum;
        });
    }

    private getCommonChartOptions(updatedOverrides?: AgChartThemeOverrides): TOptions & { mode: 'integrated' } {
        // Only apply active overrides if chart is initialised.
        const existingOptions = (this.clearThemeOverrides ? {} : this.chart?.getOptions() ?? {}) as TOptions;
        const formattingPanelOverrides = this.chart != null ? this.getActiveFormattingPanelOverrides() : undefined;
        this.clearThemeOverrides = false;
        const styleNonce = this.chartProxyParams.styleNonce;

        const theme = createAgChartTheme(
            this.chartProxyParams,
            this,
            this.agChartsExports.isEnterprise,
            this.getChartThemeDefaults(),
            updatedOverrides ?? formattingPanelOverrides
        );

        const newOptions = {
            ...existingOptions,
            mode: 'integrated',
            ...(styleNonce ? { styleNonce } : {}),
        } as const;

        // propagate setting if set
        if (this.chartProxyParams.suppressFieldDotNotation !== undefined) {
            newOptions.suppressFieldDotNotation = this.chartProxyParams.suppressFieldDotNotation;
        }

        newOptions.theme = theme;
        newOptions.container = this.chartProxyParams.parentElement;
        return newOptions;
    }

    private getChartThemeDefaults(): AgChartThemeOverrides | undefined {
        const seriesOverrides = this.getSeriesChartThemeDefaults();
        const seriesChartOptions = seriesOverrides
            ? {
                  [this.standaloneChartType]: seriesOverrides,
              }
            : {};
        const crosshair: AgCrosshairOptions = {
            enabled: true,
            snap: true,
            label: {
                enabled: false,
            },
        };
        const common: AgCommonThemeableChartOptions = this.agChartsExports.isEnterprise
            ? {
                  zoom: {
                      enabled: true,
                  },
                  animation: {
                      enabled: true,
                      duration: 500,
                  },
                  axes: {
                      number: { crosshair },
                      category: { crosshair },
                      log: { crosshair },
                      time: { crosshair },
                  },
              }
            : {};
        common.minHeight = 0;
        common.minWidth = 0;
        common.navigator = {
            enabled: false,
        };
        return {
            common,
            ...seriesChartOptions,
        };
    }

    protected getSeriesChartThemeDefaults(): AgChartThemeOverrides[TSeries] {
        return undefined;
    }

    private getActiveFormattingPanelOverrides(): AgChartThemeOverrides {
        if (this.clearThemeOverrides) {
            return {};
        }

        const inUseTheme = this.chart?.getOptions().theme as AgChartTheme;
        return inUseTheme?.overrides ?? {};
    }

    public destroy({ keepChartInstance = false } = {}): AgChartInstance<AgChartInstanceOptions> | undefined {
        if (keepChartInstance) {
            // Reset Charts animation state, so that future updates to this re-used chart instance
            // behave as-if the chart is brand new. When switching chartTypes, this means we hide
            // the fact we are reusing the chart instance; the user sees a new chart which behaves
            // as-if it is a completely new and distinct chart instance.
            this.chart.resetAnimations();
            return this.chart;
        }

        this.destroyChart();
    }

    protected destroyChart(): void {
        if (this.chart) {
            this.chart.destroy();
            (this.chart as any) = undefined;
        }
    }
}
