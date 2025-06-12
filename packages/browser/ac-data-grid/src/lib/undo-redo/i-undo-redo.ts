import type { RowPinnedType } from '../interfaces/iRowNode';

export interface IAcDGCellValueChange {
    rowPinned: RowPinnedType;
    rowIndex: number;
    columnId: string;
    oldValue: any;
    newValue: any;
}

export interface IAcDGLLastFocusedCell {
    rowPinned: RowPinnedType;
    rowIndex: number;
    columnId: string;
}
