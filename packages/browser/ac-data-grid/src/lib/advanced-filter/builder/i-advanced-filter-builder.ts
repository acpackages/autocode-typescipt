import type { AdvancedFilterModel, IAcDataGridEvent, BaseCellDataType, JoinAdvancedFilterModel } from 'ag-grid-community';

interface IAcDGAdvancedFilterBuilderItemEvent<T extends AdvancedFilterBuilderEvents> extends IAcDataGridEvent<T> {
    item: AdvancedFilterBuilderItem;
}

export interface IAcDGAdvancedFilterBuilderAddEvent extends AdvancedFilterBuilderItemEvent<'advancedFilterBuilderAdded'> {
    isJoin: boolean;
}

export interface IAcDGAdvancedFilterBuilderMoveEvent extends AdvancedFilterBuilderItemEvent<'advancedFilterBuilderMoved'> {
    backwards: boolean;
}

export interface IAcDGAdvancedFilterBuilderRemoveEvent
    extends AdvancedFilterBuilderItemEvent<'advancedFilterBuilderRemoved'> {}

export interface IAcDGAdvancedFilterBuilderItem {
    filterModel: AdvancedFilterModel | null;
    level: number;
    parent?: JoinAdvancedFilterModel;
    valid: boolean;
    showMove?: boolean;
}

export type CreatePillParams = CreateInputPillParams | CreateSelectPillParams;

interface IAcDGCreateInputPillParams extends BaseCreatePillParams {
    isSelect: false;
    valueFormatter: (value: string) => string;
    baseCellDataType: BaseCellDataType;
}

interface IAcDGCreateSelectPillParams extends BaseCreatePillParams {
    isSelect: true;
    displayValue: string;
    getEditorParams: () => { values?: any[] };
    pickerAriaLabelKey: string;
    pickerAriaLabelValue: string;
}

interface IAcDGBaseCreatePillParams {
    key: string;
    cssClass: string;
    update: (key: string) => void;
    ariaLabel: string;
}

export type AdvancedFilterBuilderEvents =
    | 'advancedFilterBuilderAdded'
    | 'advancedFilterBuilderMoved'
    | 'advancedFilterBuilderRemoved'
    | 'advancedFilterBuilderValueChanged'
    | 'advancedFilterBuilderValidChanged';
