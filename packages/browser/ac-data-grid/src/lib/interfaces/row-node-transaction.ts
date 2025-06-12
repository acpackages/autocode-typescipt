import type { IRowNode } from './iRowNode';

export interface IAcDGRowNodeTransaction<TData = any> {
    /** Row nodes added */
    add: IRowNode<TData>[];
    /** Row nodes removed */
    remove: IRowNode<TData>[];
    /** Row nodes updated */
    update: IRowNode<TData>[];
}
