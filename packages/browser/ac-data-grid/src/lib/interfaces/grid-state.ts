import type { CellRangeType } from './IRangeService';
import type { AdvancedFilterModel } from './advancedFilterModel';
import type { FilterModel } from './iFilter';
import type { RowPosition } from './iRowPosition';
import type { SortModelItem } from './iSortModelItem';
import type { ServerSideRowGroupSelectionState, ServerSideRowSelectionState } from './selectionState';

export interface IAcDGFilterState {
    filterModel?: FilterModel;
    advancedFilterModel?: AdvancedFilterModel;
}

export interface IAcDGCellSelectionCellState {
    id?: string;
    type?: CellRangeType;
    /** The start row of the range */
    startRow?: RowPosition;
    /** The end row of the range */
    endRow?: RowPosition;
    /** The columns in the range */
    colIds: string[];
    /** The start column for the range */
    startColId: string;
}

/** @deprecated v32.2 Use `CellSelectionCellState` instead. */
export interface IAcDGRangeSelectionCellState extends CellSelectionCellState {}

export interface IAcDGCellSelectionState {
    cellRanges: CellSelectionCellState[];
}

/** @deprecated v32.2 Use `CellSelectionState` instead. */
export interface IAcDGRangeSelectionState {
    cellRanges: RangeSelectionCellState[];
}

export interface IAcDGScrollState {
    top: number;
    left: number;
}

export interface IAcDGFiltersToolPanelState {
    expandedGroupIds: string[];
    expandedColIds: string[];
}

export interface IAcDGColumnToolPanelState {
    expandedGroupIds: string[];
}

export interface IAcDGSideBarState {
    /** Is side bar visible */
    visible: boolean;
    position: 'left' | 'right';
    /** Open tool panel, or null if closed */
    openToolPanel: string | null;
    /** State for each tool panel */
    toolPanels: {
        [id: string]: any;
    };
}

export interface IAcDGFocusedCellState extends RowPosition {
    colId: string;
}

export interface IAcDGPaginationState {
    /** Current page */
    page?: number;
    /** Current page size. Only use when the pageSizeSelector dropdown is visible */
    pageSize?: number;
}

export interface IAcDGSortState {
    /** Sorted columns and directions in order */
    sortModel: SortModelItem[];
}

export interface IAcDGRowGroupState {
    /** Grouped columns in order */
    groupColIds: string[];
}

export interface IAcDGAggregationColumnState {
    colId: string;
    /** Only named aggregation functions can be used in state */
    aggFunc: string;
}

export interface IAcDGAggregationState {
    aggregationModel: AggregationColumnState[];
}

export interface IAcDGPivotState {
    pivotMode: boolean;
    pivotColIds: string[];
}

export interface IAcDGColumnPinningState {
    leftColIds: string[];
    rightColIds: string[];
}

export interface IAcDGColumnVisibilityState {
    hiddenColIds: string[];
}

export interface IAcDGColumnSizeState {
    colId: string;
    width?: number;
    flex?: number;
}

export interface IAcDGColumnSizingState {
    columnSizingModel: ColumnSizeState[];
}

export interface IAcDGColumnOrderState {
    /** All colIds in order */
    orderedColIds: string[];
}

export interface IAcDGColumnGroupState {
    openColumnGroupIds: string[];
}

export interface IAcDGRowGroupExpansionState {
    expandedRowGroupIds: string[];
}

export interface IAcDGRowPinningState {
    /** Row IDs of rows pinned to the top container */
    top: string[];
    /** Row IDs of rows pinned to the bottom container */
    bottom: string[];
}

export interface IAcDGGridState {
    /** Grid version number */
    version?: string;
    /** Includes aggregation functions (column state) */
    aggregation?: AggregationState;
    /** Includes opened groups */
    columnGroup?: ColumnGroupState;
    /** Includes column ordering (column state) */
    columnOrder?: ColumnOrderState;
    /** Includes left/right pinned columns (column state) */
    columnPinning?: ColumnPinningState;
    /** Includes column width/flex (column state) */
    columnSizing?: ColumnSizingState;
    /** Includes hidden columns (column state) */
    columnVisibility?: ColumnVisibilityState;
    /** Includes Column Filters and Advanced Filter */
    filter?: FilterState;
    /** Includes currently focused cell. Works for Client-Side Row Model only */
    focusedCell?: FocusedCellState;
    /** Includes current page */
    pagination?: PaginationState;
    /** Includes currently manually pinned rows */
    rowPinning?: RowPinningState;
    /** Includes current pivot mode and pivot columns (column state) */
    pivot?: PivotState;
    /** Includes currently selected cell ranges */
    cellSelection?: CellSelectionState;
    /**
     * Includes currently selected cell ranges
     * @deprecated v32.2 Use `cellSelection` instead.
     */
    rangeSelection?: RangeSelectionState;
    /** Includes current row group columns (column state) */
    rowGroup?: RowGroupState;
    /** Includes currently expanded group rows */
    rowGroupExpansion?: RowGroupExpansionState;
    /**
     * Includes currently selected rows.
     * For Server-Side Row Model, will be `ServerSideRowSelectionState | ServerSideRowGroupSelectionState`,
     * for other row models, will be an array of row IDs.
     * Can only be set for Client-Side Row Model and Server-Side Row Model.
     */
    rowSelection?: string[] | ServerSideRowSelectionState | ServerSideRowGroupSelectionState;
    /** Includes current scroll position. Works for Client-Side Row Model only */
    scroll?: ScrollState;
    /** Includes current Side Bar positioning and opened tool panel */
    sideBar?: SideBarState;
    /** Includes current sort columns and direction (column state) */
    sort?: SortState;
    /**
     * When providing a partial `initialState` with some but not all column state properties, set this to `true`.
     * Not required if passing the whole state object retrieved from the grid.
     */
    partialColumnState?: boolean;
}
