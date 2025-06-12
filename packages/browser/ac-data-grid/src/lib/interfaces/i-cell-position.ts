import type { Column } from './iColumn';
import type { RowPosition } from './iRowPosition';

// this is what gets pass into and out of the api, as JavaScript users

export interface IAcDGCellPosition extends RowPosition {
    /** The grid column */
    column: Column;
}
