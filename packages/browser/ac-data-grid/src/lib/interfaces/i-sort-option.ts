import type { Column } from './iColumn';

export interface IAcDGSortOption {
    sort: 'asc' | 'desc';
    column: Column;
}
