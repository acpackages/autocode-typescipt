import type { ChartController } from '../chartController';
import type { ChartOptionsService } from '../services/chartOptionsService';
import type { ChartMenuParamsFactory } from './chartMenuParamsFactory';

/**
 * Contains the per-chart common beans
 */
export interface IAcDGChartMenuContext {
    chartController: ChartController;
    chartOptionsService: ChartOptionsService;
    chartMenuParamsFactory: ChartMenuParamsFactory;
    chartAxisMenuParamsFactory: ChartMenuParamsFactory;
}
