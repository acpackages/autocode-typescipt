import type { AgGridCommon } from './iCommon';
import type { IComponent } from './iComponent';

export interface IAcDGStatusPanelDef {
    statusPanel?: any;
    align?: string;
    key?: string;
    statusPanelParams?: any;
}

export interface IStatusPanelValueFormatterParams<TData = any, TContext = any> extends AgGridCommon<TData, TContext> {
    /* The value of the current Status Bar Panel */
    value: number | null;
    /* The total row count of the grid. */
    totalRows: number;
    /* The name of the current Status Bar Panel */
    key: string;
}
export interface IProvidedStatusPanelParams {
    valueFormatter?: (params: IStatusPanelValueFormatterParams) => string;
}

export interface IStatusPanelParams<TData = any, TContext = any> extends AgGridCommon<TData, TContext> {
    key: string;
}

export type AggregationStatusPanelAggFunc = 'count' | 'sum' | 'min' | 'max' | 'avg';

export interface IAggregationStatusPanelParams extends IProvidedStatusPanelParams {
    aggFuncs: AggregationStatusPanelAggFunc[];
}

export interface IAcDGAggregationStatusPanelParams<TData = any, TContext = any>
    extends IAggregationStatusPanelParams,
        IStatusPanelParams<TData, TContext> {
    aggFuncs: AggregationStatusPanelAggFunc[];
}

export interface IStatusPanel<TData = any, TContext = any> {
    /**
     * Called when the `statusBar` grid option is updated.
     * If this method returns `true`,
     * the grid assumes that the status panel has updated with the latest params,
     * and takes no further action.
     * If this method returns `false`, or is not implemented,
     * the grid will destroy and recreate the status panel.
     */
    refresh?(params: IStatusPanelParams<TData, TContext>): boolean;
}

export interface IStatusPanelComp<TData = any, TContext = any>
    extends IStatusPanel<TData, TContext>,
        IComponent<IStatusPanelParams<TData, TContext>> {}
