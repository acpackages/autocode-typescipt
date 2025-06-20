import type {
    BeanCollection,
    ChartGroupsDef,
    ChartType,
    IChartService,
    LocaleTextFunc,
    MenuItemDef,
    NamedBean,
} from 'ag-grid-community';
import { BeanStub, _createIconNoSpan, _warn } from 'ag-grid-community';

export class AcDGChartMenuItemMapper extends BeanStub implements NamedBean {
    beanName = 'chartMenuItemMapper' as const;

    public getChartItems(key: 'pivotChart' | 'chartRange'): MenuItemDef | null {
        const beans = this.beans;
        const chartSvc = beans.chartSvc;
        const isPivot = key === 'pivotChart';
        if (!chartSvc) {
            return null;
        }

        const getLocaleTextFunc = this.getLocaleTextFunc.bind(this);
        const builder = isPivot
            ? new PivotMenuItemMapper(beans, chartSvc, getLocaleTextFunc)
            : new RangeMenuItemMapper(beans, chartSvc, getLocaleTextFunc);

        const isEnterprise = chartSvc.isEnterprise();

        let topLevelMenuItem: MenuItemDefWithKey | null = builder.getMenuItem();

        if (topLevelMenuItem && topLevelMenuItem.subMenu && !isEnterprise) {
            // Filter out enterprise-only menu items if 'Community Integrated'
            const filterEnterpriseItems = (m: MenuItemDefWithKey): MenuItemDefWithKey => ({
                ...m,
                subMenu: m.subMenu?.filter((menu) => !menu._enterprise).map((menu) => filterEnterpriseItems(menu)),
            });
            topLevelMenuItem = filterEnterpriseItems(topLevelMenuItem);
        }

        const chartGroupsDef = this.gos.get('chartToolPanelsDef')?.settingsPanel?.chartGroupsDef;
        if (chartGroupsDef) {
            topLevelMenuItem = this.filterAndOrderChartMenu(
                topLevelMenuItem,
                chartGroupsDef,
                builder.getConfigLookup()
            );
        }
        return this.cleanInternals(topLevelMenuItem);
    }

    // Remove our internal _key and _enterprise properties so this does not leak out of the class on the menu items.
    private cleanInternals(menuItem: MenuItemDefWithKey | null): MenuItemDef | null {
        if (!menuItem) {
            return menuItem;
        }

        const removeKeys = (m: MenuItemDefWithKey | null) => {
            delete m?._key;
            delete m?._enterprise;
            m?.subMenu?.forEach((s) => removeKeys(s));
            return m;
        };

        return removeKeys(menuItem);
    }

    private buildLookup<T extends MenuItemDefWithKey<any>>(menuItem: T) {
        const itemLookup: Record<any, T> = {} as any;
        const addItem = (item: T) => {
            itemLookup[item._key] = item;
            if (item.subMenu) {
                item.subMenu.forEach((s) => addItem(s as T));
            }
        };
        addItem(menuItem);
        return itemLookup;
    }

    /**
     * Make the MenuItem match the charts provided and their ordering on the ChartGroupsDef config object as provided by the user.
     */
    private filterAndOrderChartMenu<TKeys extends string>(
        topLevelMenuItem: MenuItemDefWithKey<TKeys>,
        chartGroupsDef: ChartGroupsDef,
        configLookup: ChartDefToMenuItems<TKeys>
    ): MenuItemDefWithKey<TKeys> | null {
        const menuItemLookup = this.buildLookup(topLevelMenuItem);
        const orderedAndFiltered: MenuItemDefWithKey = { ...topLevelMenuItem, subMenu: [] };

        for (const group of Object.keys(chartGroupsDef) as (keyof ChartGroupsDef)[]) {
            const chartTypes: ChartType[] = chartGroupsDef[group]!;
            const chartConfigGroup = configLookup[group];

            // Skip any context panels that are not enabled for the current chart type
            if (chartConfigGroup === null) continue;

            if (chartConfigGroup == undefined) {
                _warn(173, { group });
                continue;
            }

            const menuItem = menuItemLookup[chartConfigGroup._key];
            if (menuItem) {
                if (menuItem.subMenu) {
                    const subMenus = chartTypes
                        .map((chartType) => {
                            const itemKey = (chartConfigGroup as any)[chartType];
                            if (itemKey == undefined) {
                                _warn(174, { group, chartType });
                                return undefined;
                            }
                            return menuItemLookup[itemKey];
                        })
                        .filter((s) => s !== undefined) as MenuItemDefWithKey[];

                    if (subMenus.length > 0) {
                        menuItem.subMenu = subMenus;
                        orderedAndFiltered.subMenu?.push(menuItem);
                    }
                } else {
                    // Handles line case which is not actually a sub subMenu
                    orderedAndFiltered.subMenu?.push(menuItem);
                }
            }
        }
        if (orderedAndFiltered.subMenu?.length == 0) {
            return null;
        }
        return orderedAndFiltered;
    }
}

interface IAcDGMenuItemBuilder<MenuItemKeys extends string> {
    getMenuItem(): MenuItemDefWithKey<MenuItemKeys>;
    getConfigLookup(): ChartDefToMenuItems<MenuItemKeys>;
}

/** Utility type to keep chart menu item lookups in sync with ChartGroupsDef */
type ChartDefToMenuItems<MenuItemKeys extends string> = {
    [K in keyof ChartGroupsDef]-?: ChartGroupsDef[K] extends (infer P)[] | undefined
        ? [P] extends [ChartType]
            ? ({ [T in P]-?: MenuItemKeys | null } & { _key: MenuItemKeys }) | null
            : never
        : never;
};

interface IAcDGMenuItemDefWithKey<MenuItemKey extends string = any> extends MenuItemDef {
    _key: MenuItemKey;
    _enterprise?: boolean;
    subMenu?: MenuItemDefWithKey<MenuItemKey>[];
}

export type PivotMenuOptionName =
    | 'pivotChart'
    | 'pivotColumnChart'
    | 'pivotGroupedColumn'
    | 'pivotStackedColumn'
    | 'pivotNormalizedColumn'
    | 'pivotBarChart'
    | 'pivotGroupedBar'
    | 'pivotStackedBar'
    | 'pivotNormalizedBar'
    | 'pivotPieChart'
    | 'pivotPie'
    | 'pivotDonut'
    | 'pivotLineChart'
    | 'pivotStackedLine'
    | 'pivotNormalizedLine'
    | 'pivotXYChart'
    | 'pivotScatter'
    | 'pivotBubble'
    | 'pivotAreaChart'
    | 'pivotArea'
    | 'pivotStackedArea'
    | 'pivotNormalizedArea'
    | 'pivotStatisticalChart'
    | 'pivotHistogram'
    | 'pivotHierarchicalChart'
    | 'pivotTreemap'
    | 'pivotSunburst'
    | 'pivotCombinationChart'
    | 'pivotColumnLineCombo'
    | 'pivotAreaColumnCombo'
    | 'pivotFunnel'
    | 'pivotConeFunnel'
    | 'pivotPyramid';

class AcDGPivotMenuItemMapper implements MenuItemBuilder<PivotMenuOptionName> {
    constructor(
        private beans: BeanCollection,
        private chartSvc: IChartService,
        private getLocaleTextFunc: () => LocaleTextFunc
    ) {}

    getMenuItem(): MenuItemDefWithKey<PivotMenuOptionName> {
        const localeTextFunc = this.getLocaleTextFunc();
        const getMenuItem = (
            localeKey: string,
            defaultText: string,
            chartType: ChartType,
            key: PivotMenuOptionName,
            enterprise = false
        ) => {
            return {
                // will have a LRM character appended to ensure correct display in RTL languages
                name: localeTextFunc(localeKey, defaultText + '\u200E'),
                action: () => this.chartSvc.createPivotChart({ chartType }),
                _key: key,
                _enterprise: enterprise,
            };
        };
        return {
            name: localeTextFunc('pivotChart', 'Pivot Chart'),
            _key: 'pivotChart',
            subMenu: [
                {
                    _key: 'pivotColumnChart',
                    name: localeTextFunc('columnChart', 'Column'),
                    subMenu: [
                        getMenuItem('groupedColumn', 'Grouped', 'groupedColumn', 'pivotGroupedColumn'),
                        getMenuItem('stackedColumn', 'Stacked', 'stackedColumn', 'pivotStackedColumn'),
                        getMenuItem('normalizedColumn', '100% Stacked', 'normalizedColumn', 'pivotNormalizedColumn'),
                    ],
                },
                {
                    _key: 'pivotBarChart',
                    name: localeTextFunc('barChart', 'Bar'),
                    subMenu: [
                        getMenuItem('groupedBar', 'Grouped', 'groupedBar', 'pivotGroupedBar'),
                        getMenuItem('stackedBar', 'Stacked', 'stackedBar', 'pivotStackedBar'),
                        getMenuItem('normalizedBar', '100% Stacked', 'normalizedBar', 'pivotNormalizedBar'),
                    ],
                },
                {
                    _key: 'pivotPieChart',
                    name: localeTextFunc('pieChart', 'Pie'),
                    subMenu: [
                        getMenuItem('pie', 'Pie', 'pie', 'pivotPie'),
                        getMenuItem('donut', 'Donut', 'donut', 'pivotDonut'),
                    ],
                },
                {
                    _key: 'pivotLineChart',
                    name: localeTextFunc('lineChart', 'Line'),
                    subMenu: [
                        getMenuItem('lineChart', 'Line', 'line', 'pivotLineChart'),
                        getMenuItem('stackedLine', 'Stacked', 'stackedLine', 'pivotStackedLine'),
                        getMenuItem('normalizedLine', '100% Stacked', 'normalizedLine', 'pivotNormalizedLine'),
                    ],
                },
                {
                    _key: 'pivotAreaChart',
                    name: localeTextFunc('areaChart', 'Area'),
                    subMenu: [
                        getMenuItem('areaChart', 'Area', 'area', 'pivotArea'),
                        getMenuItem('stackedArea', 'Stacked', 'stackedArea', 'pivotStackedArea'),
                        getMenuItem('normalizedArea', '100% Stacked', 'normalizedArea', 'pivotNormalizedArea'),
                    ],
                },
                {
                    _key: 'pivotXYChart',
                    name: localeTextFunc('xyChart', 'X Y (Scatter)'),
                    subMenu: [
                        getMenuItem('scatter', 'Scatter', 'scatter', 'pivotScatter'),
                        getMenuItem('bubble', 'Bubble', 'bubble', 'pivotBubble'),
                    ],
                },
                {
                    _key: 'pivotStatisticalChart',
                    _enterprise: false, // histogram chart is available in both community and enterprise distributions
                    name: localeTextFunc('statisticalChart', 'Statistical'),
                    subMenu: [getMenuItem('histogramChart', 'Histogram', 'histogram', 'pivotHistogram', false)],
                },
                {
                    _key: 'pivotHierarchicalChart',
                    _enterprise: true,
                    name: localeTextFunc('hierarchicalChart', 'Hierarchical'),
                    subMenu: [
                        getMenuItem('treemapChart', 'Treemap', 'treemap', 'pivotTreemap', true),
                        getMenuItem('sunburstChart', 'Sunburst', 'sunburst', 'pivotSunburst', true),
                    ],
                },
                {
                    _key: 'pivotFunnel',
                    name: localeTextFunc('funnel', 'Funnel'),
                    subMenu: [
                        getMenuItem('funnel', 'Funnel', 'funnel', 'pivotFunnel'),
                        getMenuItem('coneFunnel', 'Cone Funnel', 'coneFunnel', 'pivotConeFunnel'),
                        getMenuItem('pyramid', 'Pyramid', 'pyramid', 'pivotPyramid'),
                    ],
                },
                {
                    _key: 'pivotCombinationChart',
                    name: localeTextFunc('combinationChart', 'Combination'),
                    subMenu: [
                        getMenuItem('columnLineCombo', 'Column & Line', 'columnLineCombo', 'pivotColumnLineCombo'),
                        getMenuItem('AreaColumnCombo', 'Area & Column', 'areaColumnCombo', 'pivotAreaColumnCombo'),
                    ],
                },
            ],
            icon: _createIconNoSpan('chart', this.beans, undefined),
        };
    }

    getConfigLookup(): ChartDefToMenuItems<PivotMenuOptionName> {
        return {
            columnGroup: {
                _key: 'pivotColumnChart',
                column: 'pivotGroupedColumn',
                stackedColumn: 'pivotStackedColumn',
                normalizedColumn: 'pivotNormalizedColumn',
            },
            barGroup: {
                _key: 'pivotBarChart',
                bar: 'pivotGroupedBar',
                stackedBar: 'pivotStackedBar',
                normalizedBar: 'pivotNormalizedBar',
            },
            pieGroup: {
                _key: 'pivotPieChart',
                pie: 'pivotPie',
                donut: 'pivotDonut',
                doughnut: 'pivotDonut',
            },
            lineGroup: {
                _key: 'pivotLineChart',
                line: 'pivotLineChart',
                stackedLine: 'pivotStackedLine',
                normalizedLine: 'pivotNormalizedLine',
            },
            areaGroup: {
                _key: 'pivotAreaChart',
                area: 'pivotArea',
                stackedArea: 'pivotStackedArea',
                normalizedArea: 'pivotNormalizedArea',
            },
            scatterGroup: {
                _key: 'pivotXYChart',
                bubble: 'pivotBubble',
                scatter: 'pivotScatter',
            },
            combinationGroup: {
                _key: 'pivotCombinationChart',
                columnLineCombo: 'pivotColumnLineCombo',
                areaColumnCombo: 'pivotAreaColumnCombo',
                customCombo: null, // Not currently supported
            },
            hierarchicalGroup: {
                _key: 'pivotHierarchicalChart',
                treemap: 'pivotTreemap',
                sunburst: 'pivotSunburst',
            },
            statisticalGroup: {
                _key: 'pivotStatisticalChart',
                histogram: 'pivotHistogram',
                // Some statistical charts do not currently support pivot mode
                rangeBar: null,
                rangeArea: null,
                boxPlot: null,
            },
            funnelGroup: {
                _key: 'pivotFunnel',
                funnel: 'pivotFunnel',
                coneFunnel: 'pivotConeFunnel',
                pyramid: 'pivotPyramid',
            },
            // Polar charts do not support pivot mode
            polarGroup: null,
            // Specialized charts do not currently support pivot mode
            specializedGroup: null,
        };
    }
}

export type RangeMenuOptionName =
    | 'chartRange'
    | 'rangeColumnChart'
    | 'rangeGroupedColumn'
    | 'rangeStackedColumn'
    | 'rangeNormalizedColumn'
    | 'rangeBarChart'
    | 'rangeGroupedBar'
    | 'rangeStackedBar'
    | 'rangeNormalizedBar'
    | 'rangePieChart'
    | 'rangePie'
    | 'rangeDonut'
    | 'rangeLineChart'
    | 'rangeStackedLine'
    | 'rangeNormalizedLine'
    | 'rangeXYChart'
    | 'rangeScatter'
    | 'rangeBubble'
    | 'rangeAreaChart'
    | 'rangeArea'
    | 'rangeStackedArea'
    | 'rangeNormalizedArea'
    | 'rangePolarChart'
    | 'rangeRadarLine'
    | 'rangeRadarArea'
    | 'rangeNightingale'
    | 'rangeRadialColumn'
    | 'rangeRadialBar'
    | 'rangeStatisticalChart'
    | 'rangeBoxPlot'
    | 'rangeHistogram'
    | 'rangeRangeBar'
    | 'rangeRangeArea'
    | 'rangeHierarchicalChart'
    | 'rangeTreemap'
    | 'rangeSunburst'
    | 'rangeSpecializedChart'
    | 'rangeWaterfall'
    | 'rangeHeatmap'
    | 'rangeCombinationChart'
    | 'rangeColumnLineCombo'
    | 'rangeAreaColumnCombo'
    | 'rangeFunnel'
    | 'rangeConeFunnel'
    | 'rangePyramid';

class AcDGRangeMenuItemMapper implements MenuItemBuilder<RangeMenuOptionName> {
    constructor(
        private beans: BeanCollection,
        private chartSvc: IChartService,
        private getLocaleTextFunc: () => LocaleTextFunc
    ) {}

    getMenuItem(): MenuItemDefWithKey<RangeMenuOptionName> {
        const localeTextFunc = this.getLocaleTextFunc();
        const getMenuItem = (
            localeKey: string,
            defaultText: string,
            chartType: ChartType,
            key: RangeMenuOptionName,
            enterprise = false
        ) => {
            return {
                name: localeTextFunc(localeKey, defaultText),
                action: () => this.chartSvc.createChartFromCurrentRange(chartType),
                _key: key,
                _enterprise: enterprise,
            };
        };

        return {
            name: localeTextFunc('chartRange', 'Chart Range'),
            _key: 'chartRange',
            subMenu: [
                {
                    name: localeTextFunc('columnChart', 'Column'),
                    subMenu: [
                        getMenuItem('groupedColumn', 'Grouped', 'groupedColumn', 'rangeGroupedColumn'),
                        getMenuItem('stackedColumn', 'Stacked', 'stackedColumn', 'rangeStackedColumn'),
                        getMenuItem('normalizedColumn', '100% Stacked', 'normalizedColumn', 'rangeNormalizedColumn'),
                    ],
                    _key: 'rangeColumnChart',
                },
                {
                    name: localeTextFunc('barChart', 'Bar'),
                    subMenu: [
                        getMenuItem('groupedBar', 'Grouped', 'groupedBar', 'rangeGroupedBar'),
                        getMenuItem('stackedBar', 'Stacked', 'stackedBar', 'rangeStackedBar'),
                        getMenuItem('normalizedBar', '100% Stacked', 'normalizedBar', 'rangeNormalizedBar'),
                    ],
                    _key: 'rangeBarChart',
                },
                {
                    name: localeTextFunc('pieChart', 'Pie'),
                    subMenu: [
                        getMenuItem('pie', 'Pie', 'pie', 'rangePie'),
                        getMenuItem('donut', 'Donut', 'donut', 'rangeDonut'),
                    ],
                    _key: 'rangePieChart',
                },
                {
                    name: localeTextFunc('lineChart', 'Line'),
                    subMenu: [
                        getMenuItem('lineChart', 'Line', 'line', 'rangeLineChart'),
                        getMenuItem('stackedLine', 'Stacked', 'stackedLine', 'rangeStackedLine'),
                        getMenuItem('normalizedLine', '100% Stacked', 'normalizedLine', 'rangeNormalizedLine'),
                    ],
                    _key: 'rangeLineChart',
                },
                {
                    name: localeTextFunc('areaChart', 'Area'),
                    subMenu: [
                        getMenuItem('areaChart', 'Area', 'area', 'rangeArea'),
                        getMenuItem('stackedArea', 'Stacked', 'stackedArea', 'rangeStackedArea'),
                        getMenuItem('normalizedArea', '100% Stacked', 'normalizedArea', 'rangeNormalizedArea'),
                    ],
                    _key: 'rangeAreaChart',
                },
                {
                    name: localeTextFunc('xyChart', 'X Y (Scatter)'),
                    subMenu: [
                        getMenuItem('scatter', 'Scatter', 'scatter', 'rangeScatter'),
                        getMenuItem('bubble', 'Bubble', 'bubble', 'rangeBubble'),
                    ],
                    _key: 'rangeXYChart',
                },
                {
                    name: localeTextFunc('polarChart', 'Polar'),
                    subMenu: [
                        getMenuItem('radarLine', 'Radar Line', 'radarLine', 'rangeRadarLine'),
                        getMenuItem('radarArea', 'Radar Area', 'radarArea', 'rangeRadarArea'),
                        getMenuItem('nightingale', 'Nightingale', 'nightingale', 'rangeNightingale'),
                        getMenuItem('radialColumn', 'Radial Column', 'radialColumn', 'rangeRadialColumn'),
                        getMenuItem('radialBar', 'Radial Bar', 'radialBar', 'rangeRadialBar'),
                    ],
                    _key: 'rangePolarChart',
                    _enterprise: true,
                },
                {
                    name: localeTextFunc('statisticalChart', 'Statistical'),
                    subMenu: [
                        getMenuItem('boxPlot', 'Box Plot', 'boxPlot', 'rangeBoxPlot', true),
                        getMenuItem('histogramChart', 'Histogram', 'histogram', 'rangeHistogram', false),
                        getMenuItem('rangeBar', 'Range Bar', 'rangeBar', 'rangeRangeBar', true),
                        getMenuItem('rangeArea', 'Range Area', 'rangeArea', 'rangeRangeArea', true),
                    ],
                    _key: 'rangeStatisticalChart',
                    _enterprise: false, // histogram chart is available in both community and enterprise distributions
                },
                {
                    name: localeTextFunc('hierarchicalChart', 'Hierarchical'),
                    subMenu: [
                        getMenuItem('treemap', 'Treemap', 'treemap', 'rangeTreemap'),
                        getMenuItem('sunburst', 'Sunburst', 'sunburst', 'rangeSunburst'),
                    ],
                    _key: 'rangeHierarchicalChart',
                    _enterprise: true,
                },
                {
                    name: localeTextFunc('specializedChart', 'Specialized'),
                    subMenu: [
                        getMenuItem('heatmap', 'Heatmap', 'heatmap', 'rangeHeatmap'),
                        getMenuItem('waterfall', 'Waterfall', 'waterfall', 'rangeWaterfall'),
                    ],
                    _key: 'rangeSpecializedChart',
                    _enterprise: true,
                },
                {
                    name: localeTextFunc('funnel', 'Funnel'),
                    subMenu: [
                        getMenuItem('funnel', 'Funnel', 'funnel', 'rangeFunnel'),
                        getMenuItem('coneFunnel', 'Cone Funnel', 'coneFunnel', 'rangeConeFunnel'),
                        getMenuItem('pyramid', 'Pyramid', 'pyramid', 'rangePyramid'),
                    ],
                    _key: 'rangeFunnel',
                    _enterprise: true,
                },
                {
                    name: localeTextFunc('combinationChart', 'Combination'),
                    subMenu: [
                        getMenuItem('columnLineCombo', 'Column & Line', 'columnLineCombo', 'rangeColumnLineCombo'),
                        getMenuItem('AreaColumnCombo', 'Area & Column', 'areaColumnCombo', 'rangeAreaColumnCombo'),
                    ],
                    _key: 'rangeCombinationChart',
                },
            ],
            icon: _createIconNoSpan('chart', this.beans, undefined),
        };
    }

    getConfigLookup(): ChartDefToMenuItems<RangeMenuOptionName> {
        return {
            columnGroup: {
                _key: 'rangeColumnChart',
                column: 'rangeGroupedColumn',
                stackedColumn: 'rangeStackedColumn',
                normalizedColumn: 'rangeNormalizedColumn',
            },
            barGroup: {
                _key: 'rangeBarChart',
                bar: 'rangeGroupedBar',
                stackedBar: 'rangeStackedBar',
                normalizedBar: 'rangeNormalizedBar',
            },
            pieGroup: {
                _key: 'rangePieChart',
                pie: 'rangePie',
                donut: 'rangeDonut',
                doughnut: 'rangeDonut',
            },
            lineGroup: {
                _key: 'rangeLineChart',
                line: 'rangeLineChart',
                stackedLine: 'rangeStackedLine',
                normalizedLine: 'rangeNormalizedLine',
            },
            areaGroup: {
                _key: 'rangeAreaChart',
                area: 'rangeArea',
                stackedArea: 'rangeStackedArea',
                normalizedArea: 'rangeNormalizedArea',
            },
            scatterGroup: {
                _key: 'rangeXYChart',
                bubble: 'rangeBubble',
                scatter: 'rangeScatter',
            },
            polarGroup: {
                _key: 'rangePolarChart',
                radarLine: 'rangeRadarLine',
                radarArea: 'rangeRadarArea',
                nightingale: 'rangeNightingale',
                radialColumn: 'rangeRadialColumn',
                radialBar: 'rangeRadialBar',
            },
            statisticalGroup: {
                _key: 'rangeStatisticalChart',
                boxPlot: 'rangeBoxPlot',
                histogram: 'rangeHistogram',
                rangeBar: 'rangeRangeBar',
                rangeArea: 'rangeRangeArea',
            },
            hierarchicalGroup: {
                _key: 'rangeHierarchicalChart',
                treemap: 'rangeTreemap',
                sunburst: 'rangeSunburst',
            },
            specializedGroup: {
                _key: 'rangeSpecializedChart',
                heatmap: 'rangeHeatmap',
                waterfall: 'rangeWaterfall',
            },
            funnelGroup: {
                _key: 'rangeFunnel',
                funnel: 'rangeFunnel',
                coneFunnel: 'rangeConeFunnel',
                pyramid: 'rangePyramid',
            },
            combinationGroup: {
                _key: 'rangeCombinationChart',
                columnLineCombo: 'rangeColumnLineCombo',
                areaColumnCombo: 'rangeAreaColumnCombo',
                customCombo: null, // Not currently supported
            },
        };
    }
}
