import type { ChartFormatPanel, ChartFormatPanelGroup } from 'ag-grid-community';
import { Component, _warn } from 'ag-grid-community';

import type { AgGroupComponent } from '../../../../widgets/agGroupComponent';
import type { ChartSeriesType } from '../../utils/seriesTypeMapper';
import { isCartesian, isFunnel, isPolar } from '../../utils/seriesTypeMapper';
import type { ChartMenuContext } from '../chartMenuContext';
import { ChartPanelFeature } from '../chartPanelFeature';
import { CartesianAxisPanel } from './axis/cartesianAxisPanel';
import { PolarAxisPanel } from './axis/polarAxisPanel';
import { ChartPanel } from './chart/chartPanel';
import { GroupExpansionFeature } from './groupExpansionFeature';
import { LegendPanel } from './legend/legendPanel';
import { SeriesPanel } from './series/seriesPanel';
import { TitlesPanel } from './titles/titlesPanel';

export interface IAcDGFormatPanelOptions extends ChartMenuContext {
    isExpandedOnInit: boolean;
    seriesType: ChartSeriesType;
    registerGroupComponent: (groupComponent: AgGroupComponent) => void;
}

const DefaultFormatPanelDef: ChartFormatPanel = {
    groups: [{ type: 'chart' }, { type: 'titles' }, { type: 'legend' }, { type: 'series' }, { type: 'axis' }],
};

const AXIS_KEYS = ['axis', 'horizontalAxis', 'verticalAxis'];
export class AcDGFormatPanel extends Component {
    private chartPanelFeature: ChartPanelFeature;
    private groupExpansionFeature: GroupExpansionFeature;

    constructor(private readonly chartMenuContext: ChartMenuContext) {
        super(/* html */ `<div class="ag-chart-format-wrapper"></div>`);
    }

    public postConstruct() {
        this.groupExpansionFeature = this.createManagedBean(new GroupExpansionFeature(this.getGui()));
        this.chartPanelFeature = this.createManagedBean(
            new ChartPanelFeature(
                this.chartMenuContext.chartController,
                this.getGui(),
                'ag-chart-format-section',
                (_chartType, seriesType) => this.createPanels(seriesType)
            )
        );
        this.chartPanelFeature.refreshPanels();
    }

    private createPanels(seriesType: ChartSeriesType) {
        let panelExpandedOnInit = false;
        this.getFormatPanelDef().groups?.forEach(({ type: group, isOpen: isExpandedOnInit = false }) => {
            // ensure the group should be displayed for the current series type
            if (!this.isGroupPanelShownInSeries(group, seriesType)) {
                return;
            }

            if (isExpandedOnInit) {
                if (panelExpandedOnInit) {
                    _warn(145, { group });
                }
                panelExpandedOnInit = true;
            }

            const registerGroupComponent = (groupComponent: AgGroupComponent) =>
                this.groupExpansionFeature.addGroupComponent(groupComponent);

            const opts: FormatPanelOptions = {
                ...this.chartMenuContext,
                isExpandedOnInit,
                seriesType,
                registerGroupComponent,
            };

            switch (group) {
                case 'chart':
                    this.chartPanelFeature.addComponent(new ChartPanel(opts));
                    break;
                case 'titles':
                    this.chartPanelFeature.addComponent(new TitlesPanel(opts));
                    break;
                case 'legend':
                    this.chartPanelFeature.addComponent(new LegendPanel(opts, this.chartMenuContext));
                    break;
                case 'axis':
                    // Polar charts have different axis options from cartesian charts, so choose the appropriate panels
                    if (isPolar(seriesType)) {
                        this.chartPanelFeature.addComponent(new PolarAxisPanel(opts));
                    } else if (isCartesian(seriesType)) {
                        this.chartPanelFeature.addComponent(new CartesianAxisPanel('xAxis', opts));
                        this.chartPanelFeature.addComponent(new CartesianAxisPanel('yAxis', opts));
                    }
                    break;
                case 'horizontalAxis':
                    this.chartPanelFeature.addComponent(new CartesianAxisPanel('xAxis', opts));
                    break;
                case 'verticalAxis':
                    this.chartPanelFeature.addComponent(new CartesianAxisPanel('yAxis', opts));
                    break;
                case 'series':
                    this.chartPanelFeature.addComponent(new SeriesPanel(opts));
                    break;
                default:
                    _warn(147, { group });
            }
        });
    }

    private getFormatPanelDef() {
        const userProvidedFormatPanelDef = this.gos.get('chartToolPanelsDef')?.formatPanel;
        return userProvidedFormatPanelDef ? userProvidedFormatPanelDef : DefaultFormatPanelDef;
    }

    private isGroupPanelShownInSeries(group: ChartFormatPanelGroup, seriesType: ChartSeriesType): boolean {
        const enable =
            ['chart', 'titles', 'legend', 'series'].includes(group) ||
            (isCartesian(seriesType) && AXIS_KEYS.includes(group)) ||
            (isPolar(seriesType) && group === 'axis');

        const disable =
            (isFunnel(seriesType) && group === 'legend') || (isFunnel(seriesType) && AXIS_KEYS.includes(group));

        return enable && !disable;
    }
}
