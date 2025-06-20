import type { AgChartThemeOverrides, AgChartThemePalette } from 'ag-charts-types';

import type {
    BaseCreateChartParams,
    BeanCollection,
    CellRangeParams,
    ChartDownloadParams,
    ChartModel,
    ChartParamsCellRange,
    ChartRef,
    ChartType,
    Column,
    CreateCrossFilterChartParams,
    CreatePivotChartParams,
    CreateRangeChartParams,
    GetChartImageDataUrlParams,
    IAggFunc,
    IChartService,
    IRangeService,
    NamedBean,
    OpenChartToolPanelParams,
    PartialCellRange,
    SeriesChartType,
    SeriesGroupType,
    UpdateChartParams,
    VisibleColsService,
} from 'ag-grid-community';
import { BeanStub, _focusInto, _warn } from 'ag-grid-community';

import { VERSION as GRID_VERSION } from '../version';
import type { AgChartsExports } from './agChartsExports';
import type { GridChartParams } from './chartComp/gridChartComp';
import { GridChartComp } from './chartComp/gridChartComp';
import { validateCreateParams } from './chartComp/utils/chartParamsValidator';
import { getCanonicalChartType } from './chartComp/utils/seriesTypeMapper';
import { upgradeChartModel } from './chartModelMigration';

export interface IAcDGCrossFilteringContext {
    lastSelectedChartId: string;
}

export interface IAcDGCommonCreateChartParams extends BaseCreateChartParams {
    cellRange: PartialCellRange;
    pivotChart?: boolean;
    suppressChartRanges?: boolean;
    switchCategorySeries?: boolean;
    aggFunc?: string | IAggFunc;
    crossFiltering?: boolean;
    chartOptionsToRestore?: AgChartThemeOverrides;
    chartPaletteToRestore?: AgChartThemePalette;
    seriesChartTypes?: SeriesChartType[];
    seriesGroupType?: SeriesGroupType;
    focusDialogOnOpen?: boolean;
}

export class AcDGChartService extends BeanStub implements NamedBean, IChartService {
    beanName = 'chartSvc' as const;

    private visibleCols: VisibleColsService;
    private agChartsExports: AgChartsExports;
    private rangeSvc?: IRangeService;

    public wireBeans(beans: BeanCollection): void {
        this.visibleCols = beans.visibleCols;
        this.rangeSvc = beans.rangeSvc;
        this.agChartsExports = beans.agChartsExports as AgChartsExports;
    }

    // we destroy all charts bound to this grid when grid is destroyed. activeCharts contains all charts, including
    // those in developer provided containers.
    private activeCharts = new Set<ChartRef>();
    private activeChartComps = new Set<GridChartComp>();

    // this shared (singleton) context is used by cross filtering in line and area charts
    private crossFilteringContext: CrossFilteringContext = {
        lastSelectedChartId: '',
    };

    public isEnterprise = () => this.agChartsExports.isEnterprise;

    public updateChart(params: UpdateChartParams): void {
        if (this.activeChartComps.size === 0) {
            _warn(124);
            return;
        }

        const chartComp = [...this.activeChartComps].find((chartComp) => chartComp.getChartId() === params.chartId);
        if (!chartComp) {
            _warn(125, { chartId: params.chartId });
            return;
        }

        chartComp.update(params);
    }

    public getChartModels(): ChartModel[] {
        const models: ChartModel[] = [];

        const versionedModel = (c: ChartModel) => {
            return { ...c, version: GRID_VERSION };
        };
        this.activeChartComps.forEach((c) => models.push(versionedModel(c.getChartModel())));

        return models;
    }

    public getChartRef(chartId: string): ChartRef | undefined {
        let chartRef;
        this.activeCharts.forEach((cr) => {
            if (cr.chartId === chartId) {
                chartRef = cr;
            }
        });
        return chartRef;
    }

    public getChartComp(chartId: string): GridChartComp | undefined {
        let chartComp;
        this.activeChartComps.forEach((comp) => {
            if (comp.getChartId() === chartId) {
                chartComp = comp;
            }
        });
        return chartComp;
    }

    public getChartImageDataURL(params: GetChartImageDataUrlParams): string | undefined {
        let url: any;
        this.activeChartComps.forEach((c) => {
            if (c.getChartId() === params.chartId) {
                url = c.getChartImageDataURL(params.fileFormat);
            }
        });
        return url;
    }

    public downloadChart(params: ChartDownloadParams) {
        const chartComp = Array.from(this.activeChartComps).find((c) => c.getChartId() === params.chartId);
        chartComp?.downloadChart(params.dimensions, params.fileName, params.fileFormat);
    }

    public openChartToolPanel(params: OpenChartToolPanelParams) {
        const chartComp = Array.from(this.activeChartComps).find((c) => c.getChartId() === params.chartId);
        chartComp?.openChartToolPanel(params.panel);
    }

    public closeChartToolPanel(chartId: string) {
        const chartComp = Array.from(this.activeChartComps).find((c) => c.getChartId() === chartId);
        chartComp?.closeChartToolPanel();
    }

    public createChartFromCurrentRange(
        chartType: ChartType = 'groupedColumn',
        fromApi?: boolean
    ): ChartRef | undefined {
        const cellRange: PartialCellRange = this.getSelectedRange();
        return this.createChart({ cellRange, chartType, focusDialogOnOpen: !fromApi });
    }

    public restoreChart(model: ChartModel, chartContainer?: HTMLElement): ChartRef | undefined {
        if (!model) {
            _warn(126);
            return;
        }

        if (model.version !== GRID_VERSION) {
            model = upgradeChartModel(model);
        }

        let cellRange: PartialCellRange | undefined;
        let pivotChart: true | undefined;
        let suppressChartRanges: boolean | undefined;
        let chartPaletteToRestore: AgChartThemePalette | undefined;

        if (model.modelType === 'pivot') {
            // if required enter pivot mode
            this.gos.updateGridOptions({ options: { pivotMode: true }, source: 'pivotChart' as any });

            cellRange = this.createCellRange(undefined, true);
            pivotChart = true;
            suppressChartRanges = true;
        } else {
            cellRange = this.createCellRange(model.cellRange);
            chartPaletteToRestore = model.chartPalette;
            suppressChartRanges = model.suppressChartRanges;
        }

        if (!cellRange) {
            return;
        }

        return this.createChart({
            ...model,
            cellRange,
            pivotChart,
            suppressChartRanges,
            chartContainer,
            chartOptionsToRestore: model.chartOptions,
            chartPaletteToRestore,
        });
    }

    public createRangeChart(params: CreateRangeChartParams, fromApi?: boolean): ChartRef | undefined {
        const cellRange = this.createCellRange(params.cellRange);

        if (!cellRange) {
            return;
        }

        return this.createChart({
            ...params,
            cellRange,
            focusDialogOnOpen: !fromApi,
        });
    }

    public createPivotChart(params: CreatePivotChartParams, fromApi?: boolean): ChartRef | undefined {
        // if required enter pivot mode
        this.gos.updateGridOptions({ options: { pivotMode: true }, source: 'pivotChart' as any });

        const cellRange = this.createCellRange(undefined, true);

        if (!cellRange) {
            return;
        }

        return this.createChart({
            ...params,
            cellRange,
            pivotChart: true,
            suppressChartRanges: true,
            focusDialogOnOpen: !fromApi,
        });
    }

    public createCrossFilterChart(params: CreateCrossFilterChartParams, fromApi?: boolean): ChartRef | undefined {
        const cellRange = this.createCellRange(params.cellRange);

        if (!cellRange) {
            return;
        }

        const suppressChartRangesSupplied =
            typeof params.suppressChartRanges !== 'undefined' && params.suppressChartRanges !== null;
        const suppressChartRanges = suppressChartRangesSupplied ? params.suppressChartRanges : true;

        return this.createChart({
            ...params,
            cellRange,
            suppressChartRanges,
            crossFiltering: true,
            focusDialogOnOpen: !fromApi,
        });
    }

    private createChart(params: CommonCreateChartParams): ChartRef | undefined {
        const validationResult = validateCreateParams(params, this.agChartsExports.isEnterprise);
        if (!validationResult) {
            return undefined;
        }
        params = validationResult === true ? params : validationResult;

        const { chartType, chartContainer } = params;

        const createChartContainerFunc = this.gos.getCallback('createChartContainer');

        const gridChartParams: GridChartParams = {
            ...params,
            chartId: this.generateId(),
            chartType: getCanonicalChartType(chartType),
            insideDialog: !(chartContainer || createChartContainerFunc),
            crossFilteringContext: this.crossFilteringContext,
            crossFilteringResetCallback: () => this.activeChartComps.forEach((c) => c.crossFilteringReset()),
        };

        const chartComp = new GridChartComp(gridChartParams);
        this.createBean(chartComp);

        const chartRef = this.createChartRef(chartComp);

        if (chartContainer) {
            // if container exists, means developer initiated chart create via API, so place in provided container
            chartContainer.appendChild(chartRef.chartElement);
        } else if (createChartContainerFunc) {
            // otherwise, user created chart via grid UI, check if developer provides containers (e.g. if the application
            // is using its own dialogs rather than the grid provided dialogs)
            createChartContainerFunc(chartRef);
        } else {
            // add listener to remove from active charts list when charts are destroyed, e.g. closing chart dialog
            chartComp.addEventListener('destroyed', () => {
                this.activeChartComps.delete(chartComp);
                this.activeCharts.delete(chartRef);
            });
        }

        return chartRef;
    }

    private createChartRef(chartComp: GridChartComp): ChartRef {
        const chartRef: ChartRef = {
            destroyChart: () => {
                if (this.activeCharts.has(chartRef)) {
                    this.destroyBean(chartComp);
                    this.activeChartComps.delete(chartComp);
                    this.activeCharts.delete(chartRef);
                }
            },
            focusChart: () => {
                _focusInto(chartComp.getGui());
            },
            chartElement: chartComp.getGui(),
            chart: chartComp.getUnderlyingChart(),
            chartId: chartComp.getChartModel().chartId,
        };

        this.activeCharts.add(chartRef);
        this.activeChartComps.add(chartComp);

        return chartRef;
    }

    private getSelectedRange(): PartialCellRange {
        const ranges = this.rangeSvc?.getCellRanges();
        if (!ranges || ranges.length === 0) {
            return { columns: [] };
        }

        const uCols = new Set<Column>();

        let startRowIndex = Number.MAX_VALUE;
        let endRowIndex = -Number.MAX_VALUE;

        ranges.forEach(({ startRow: sr, endRow: er, columns: cols }) => {
            if (!(sr && er)) {
                return;
            }

            cols.forEach((col) => uCols.add(col));

            // set start/end ranges assuming rows aren't pinned
            let { rowIndex: sRowIndex, rowPinned: startRowPinned } = sr;
            let { rowIndex: eRowIndex, rowPinned: endRowPinned } = er;

            // if range crosses pinned rows, adjust the start/end row indexes to exclude pinned rows
            // pinned rows aren't part of the main row model and:
            //   * aren't easily accessible during chart data extraction
            //   * aren't included in aggregation functions
            //   * can have completely bespoke data shapes
            //
            if (startRowPinned === 'top') {
                if (endRowPinned === 'top') {
                    // range is fully pinned, ignore it
                    return;
                }
                // range crosses pinned top boundary, so start at first row in the row model
                sRowIndex = 0;
            }
            if (endRowPinned === 'bottom') {
                if (startRowPinned === 'bottom') {
                    // range is fully pinned, ignore it
                    return;
                }
                // range crosses pinned bottom boundary, so end at last row in the row model
                eRowIndex = this.beans.pageBounds.getLastRow();
            }

            if (sRowIndex !== undefined) {
                startRowIndex = Math.min(startRowIndex, sRowIndex);
            }
            if (eRowIndex !== undefined) {
                endRowIndex = Math.max(endRowIndex, eRowIndex);
            }
        });

        if (startRowIndex === Number.MAX_VALUE || endRowIndex === -Number.MAX_VALUE) {
            // if we didn't find any valid ranges, return an empty range
            return { columns: [] };
        }

        const columns = Array.from(uCols);

        return {
            // Don't specify id here, as it should be chart-specific
            // but we don't have that context yet
            columns,
            startColumn: columns[0],
            startRow: {
                rowIndex: startRowIndex,
                rowPinned: undefined,
            },
            endRow: {
                rowIndex: endRowIndex,
                rowPinned: undefined,
            },
        };
    }

    private generateId(): string {
        return `id-${Math.random().toString(36).substring(2, 18)}`;
    }

    private createCellRange(cellRangeParams?: ChartParamsCellRange, allRange?: boolean): PartialCellRange | undefined {
        const rangeParams = allRange
            ? {
                  rowStartIndex: null,
                  rowStartPinned: undefined,
                  rowEndIndex: null,
                  rowEndPinned: undefined,
                  columns: this.visibleCols.allCols.map((col) => col.getColId()),
              }
            : cellRangeParams;
        const cellRange =
            rangeParams && this.rangeSvc?.createPartialCellRangeFromRangeParams(rangeParams as CellRangeParams, true);
        if (!cellRange) {
            _warn(127, { allRange });
        }
        return cellRange;
    }

    public override destroy(): void {
        this.activeCharts.forEach((chart) => chart.destroyChart());
        super.destroy();
    }
}
