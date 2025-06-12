import type { IRowNode } from './iRowNode';

export interface IAcDGRedrawRowsParams<TData = any> {
    /** Row nodes to redraw */
    rowNodes?: IRowNode<TData>[];
}
