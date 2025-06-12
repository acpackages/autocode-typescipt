import type { AgChartThemeOverrides } from 'ag-charts-types';

import type { ColDef } from './entities/colDef';
import type { GridOptions } from './entities/gridOptions';
import type { RowNode } from './entities/rowNode';
import type { AgEventType, AgInternalEventType, AgPublicEventType } from './eventTypes';
import type { FilterRequestSource } from './filter/iColumnFilter';
import type { CellRange, CellRangeParams } from './interfaces/IRangeService';
import type { GridState } from './interfaces/gridState';
import type { ChartType } from './interfaces/iChartOptions';
import type { RefreshModelParams } from './interfaces/iClientSideRowModel';
import type { Column, ColumnEventName, ColumnGroup, ColumnPinnedType, ProvidedColumnGroup } from './interfaces/iColumn';
import type { AgGridCommon, WithoutGridCommon } from './interfaces/iCommon';
import type { BuildEventTypeMap } from './interfaces/iEventEmitter';
import type { IFilterComp } from './interfaces/iFilter';
import type { FindMatch } from './interfaces/iFind';
import type { IRowNode, RowPinnedType } from './interfaces/iRowNode';
import type { IServerSideGroupSelectionState, IServerSideSelectionState } from './interfaces/iServerSideSelection';
import type { RowNodeTransaction } from './interfaces/rowNodeTransaction';
import type { ServerSideTransactionResult } from './interfaces/serverSideTransaction';

export const ALWAYS_SYNC_GLOBAL_EVENTS: Set<AgEventType> = new Set(['gridPreDestroyed', 'fillStart', 'pasteStart']);

export type AgEventTypeParams<TData = any, TContext = any> = BuildEventTypeMap<
    AgPublicEventType | AgInternalEventType,
    {
        columnEverythingChanged: IAcDGColumnEverythingChangedEvent<TData, TContext>;
        newColumnsLoaded: IAcDGNewColumnsLoadedEvent<TData, TContext>;
        columnPivotModeChanged: IAcDGColumnPivotModeChangedEvent<TData, TContext>;
        pivotMaxColumnsExceeded: IAcDGPivotMaxColumnsExceededEvent<TData, TContext>;
        columnRowGroupChanged: ColumnRowGroupChangedEvent<TData, TContext>;
        expandOrCollapseAll: ExpandOrCollapseAllEvent<TData, TContext>;
        columnPivotChanged: ColumnPivotChangedEvent<TData, TContext>;
        gridColumnsChanged: IAcDGGridColumnsChangedEvent<TData, TContext>;
        columnValueChanged: ColumnValueChangedEvent<TData, TContext>;
        columnMoved: ColumnMovedEvent<TData, TContext>;
        columnVisible: ColumnVisibleEvent<TData, TContext>;
        columnPinned: ColumnPinnedEvent<TData, TContext>;
        columnGroupOpened: IAcDGColumnGroupOpenedEvent<TData, TContext>;
        columnResized: ColumnResizedEvent<TData, TContext>;
        displayedColumnsChanged: IAcDGDisplayedColumnsChangedEvent<TData, TContext>;
        virtualColumnsChanged: IAcDGVirtualColumnsChangedEvent<TData, TContext>;
        columnHeaderMouseOver: ColumnHeaderMouseOverEvent<TData, TContext>;
        columnHeaderMouseLeave: ColumnHeaderMouseLeaveEvent<TData, TContext>;
        columnHeaderClicked: ColumnHeaderClickedEvent<TData, TContext>;
        columnHeaderContextMenu: ColumnHeaderContextMenuEvent<TData, TContext>;
        asyncTransactionsFlushed: AsyncTransactionsFlushedEvent<TData, TContext>;
        rowGroupOpened: RowGroupOpenedEvent<TData, TContext>;
        rowDataUpdated: IAcDGRowDataUpdatedEvent<TData, TContext>;
        pinnedRowDataChanged: IAcDGPinnedRowDataChangedEvent<TData, TContext>;
        pinnedRowsChanged: IAcDGPinnedRowsChangedEvent<TData, TContext>;
        rangeSelectionChanged: IAcDGRangeSelectionChangedEvent<TData, TContext>;
        cellSelectionChanged: IAcDGCellSelectionChangedEvent<TData, TContext>;
        chartCreated: IAcDGChartCreatedEvent<TData, TContext>;
        chartRangeSelectionChanged: IAcDGChartRangeSelectionChangedEvent<TData, TContext>;
        chartOptionsChanged: IAcDGChartOptionsChangedEvent<TData, TContext>;
        chartDestroyed: IAcDGChartDestroyedEvent<TData, TContext>;
        toolPanelVisibleChanged: ToolPanelVisibleChangedEvent<TData, TContext>;
        toolPanelSizeChanged: IAcDGToolPanelSizeChangedEvent<TData, TContext>;
        modelUpdated: IAcDGModelUpdatedEvent<TData, TContext>;
        cutStart: IAcDGCutStartEvent<TData, TContext>;
        cutEnd: IAcDGCutEndEvent<TData, TContext>;
        pasteStart: IAcDGPasteStartEvent<TData, TContext>;
        pasteEnd: IAcDGPasteEndEvent<TData, TContext>;
        fillStart: IAcDGFillStartEvent<TData, TContext>;
        fillEnd: IAcDGFillEndEvent<TData, TContext>;
        cellSelectionDeleteStart: IAcDGCellSelectionDeleteStartEvent<TData, TContext>;
        cellSelectionDeleteEnd: IAcDGCellSelectionDeleteEndEvent<TData, TContext>;
        rangeDeleteStart: IAcDGRangeDeleteStartEvent<TData, TContext>;
        rangeDeleteEnd: IAcDGRangeDeleteEndEvent<TData, TContext>;
        undoStarted: IAcDGUndoStartedEvent<TData, TContext>;
        undoEnded: IAcDGUndoEndedEvent<TData, TContext>;
        redoStarted: IAcDGRedoStartedEvent<TData, TContext>;
        redoEnded: IAcDGRedoEndedEvent<TData, TContext>;
        cellClicked: CellClickedEvent<TData, TContext>;
        cellDoubleClicked: CellDoubleClickedEvent<TData, TContext>;
        cellMouseDown: CellMouseDownEvent<TData, TContext>;
        cellContextMenu: CellContextMenuEvent<TData, TContext>;
        cellValueChanged: CellValueChangedEvent<TData, TContext>;
        cellEditRequest: CellEditRequestEvent<TData, TContext>;
        rowValueChanged: RowValueChangedEvent<TData, TContext>;
        headerFocused: HeaderFocusedEvent<TData, TContext>;
        cellFocused: CellFocusedEvent<TData, TContext>;
        rowSelected: RowSelectedEvent<TData, TContext>;
        selectionChanged: IAcDGSelectionChangedEvent<TData, TContext>;
        tooltipShow: TooltipShowEvent<TData, TContext>;
        tooltipHide: TooltipHideEvent<TData, TContext>;
        cellKeyDown: FullWidthCellKeyDownEvent<TData, TContext> | CellKeyDownEvent<TData, TContext>;
        cellMouseOver: CellMouseOverEvent<TData, TContext>;
        cellMouseOut: CellMouseOutEvent<TData, TContext>;
        filterChanged: IAcDGFilterChangedEvent<TData, TContext>;
        filterModified: IAcDGFilterModifiedEvent<TData, TContext>;
        filterOpened: IAcDGFilterOpenedEvent<TData, TContext>;
        advancedFilterBuilderVisibleChanged: AdvancedFilterBuilderVisibleChangedEvent<TData, TContext>;
        sortChanged: IAcDGSortChangedEvent<TData, TContext>;
        virtualRowRemoved: VirtualRowRemovedEvent<TData, TContext>;
        rowClicked: RowClickedEvent<TData, TContext>;
        rowDoubleClicked: RowDoubleClickedEvent<TData, TContext>;
        gridReady: IAcDGGridReadyEvent<TData, TContext>;
        gridPreDestroyed: IAcDGGridPreDestroyedEvent<TData, TContext>;
        gridSizeChanged: IAcDGGridSizeChangedEvent<TData, TContext>;
        viewportChanged: IAcDGViewportChangedEvent<TData, TContext>;
        firstDataRendered: IAcDGFirstDataRenderedEvent<TData, TContext>;
        dragStarted: IAcDGDragStartedEvent<TData, TContext>;
        dragStopped: IAcDGDragStoppedEvent<TData, TContext>;
        dragCancelled: IAcDGDragCancelledEvent<TData, TContext>;
        rowEditingStarted: RowEditingStartedEvent<TData, TContext>;
        rowEditingStopped: RowEditingStoppedEvent<TData, TContext>;
        cellEditingStarted: CellEditingStartedEvent<TData, TContext>;
        cellEditingStopped: CellEditingStoppedEvent<TData, TContext>;
        bodyScroll: BodyScrollEvent<TData, TContext>;
        bodyScrollEnd: BodyScrollEndEvent<TData, TContext>;
        paginationChanged: IAcDGPaginationChangedEvent<TData, TContext>;
        componentStateChanged: IAcDGComponentStateChangedEvent<TData, TContext>;
        storeRefreshed: StoreRefreshedEvent<TData, TContext>;
        stateUpdated: StateUpdatedEvent<TData, TContext>;
        columnMenuVisibleChanged: ColumnMenuVisibleChangedEvent<TData, TContext>;
        contextMenuVisibleChanged: ContextMenuVisibleChangedEvent<TData, TContext>;
        rowDragEnter: IAcDGRowDragEnterEvent<TData, TContext>;
        rowDragMove: IAcDGRowDragMoveEvent<TData, TContext>;
        rowDragLeave: IAcDGRowDragLeaveEvent<TData, TContext>;
        rowDragEnd: IAcDGRowDragEndEvent<TData, TContext>;
        rowDragCancel: IAcDGRowDragCancelEvent<TData, TContext>;
        findChanged: IAcDGFindChangedEvent<TData, TContext>;
        rowResizeStarted: IAcDGRowResizeStartedEvent<TData, TContext>;
        rowResizeEnded: IAcDGRowResizeEndedEvent<TData, TContext>;
        // Internal events
        beforeRefreshModel: IAcDGBeforeRefreshModelEvent<TData, TContext>;
        scrollbarWidthChanged: ScrollbarWidthChangedEvent<TData, TContext>;
        keyShortcutChangedCellStart: KeyShortcutChangedCellStartEvent<TData, TContext>;
        keyShortcutChangedCellEnd: KeyShortcutChangedCellEndEvent<TData, TContext>;
        pinnedHeightChanged: IAcDGPinnedHeightChangedEvent<TData, TContext>;
        cellFocusCleared: CellFocusClearedEvent<TData, TContext>;
        fullWidthRowFocused: FullWidthRowFocusedEvent<TData, TContext>;
        checkboxChanged: IAcDGCheckboxChangedEvent<TData, TContext>;
        heightScaleChanged: HeightScaleChangedEvent<TData, TContext>;
        suppressMovableColumns: SuppressMovableColumnsEvent<TData, TContext>;
        suppressMenuHide: SuppressMenuHideEvent<TData, TContext>;
        suppressFieldDotNotation: SuppressFieldDotNotationEvent<TData, TContext>;
        columnPanelItemDragStart: IAcDGColumnPanelItemDragStartEvent<TData, TContext>;
        columnPanelItemDragEnd: IAcDGColumnPanelItemDragEndEvent<TData, TContext>;
        bodyHeightChanged: IAcDGBodyHeightChangedEvent<TData, TContext>;
        columnContainerWidthChanged: ColumnContainerWidthChangedEvent<TData, TContext>;
        displayedColumnsWidthChanged: IAcDGDisplayedColumnsWidthChangedEvent<TData, TContext>;
        scrollVisibilityChanged: ScrollVisibilityChangedEvent<TData, TContext>;
        scrollGapChanged: ScrollOverflowChangedEvent<TData, TContext>;
        columnHoverChanged: IAcDGColumnHoverChangedEvent<TData, TContext>;
        flashCells: FlashCellsEvent<TData, TContext>;
        paginationPixelOffsetChanged: PaginationPixelOffsetChangedEvent<TData, TContext>;
        displayedRowsChanged: DisplayedRowsChangedEvent<TData, TContext>;
        leftPinnedWidthChanged: LeftPinnedWidthChangedEvent<TData, TContext>;
        rightPinnedWidthChanged: RightPinnedWidthChangedEvent<TData, TContext>;
        rowContainerHeightChanged: RowContainerHeightChangedEvent<TData, TContext>;
        headerHeightChanged: HeaderHeightChangedEvent<TData, TContext>;
        columnGroupHeaderHeightChanged: ColumnGroupHeaderHeightChangedEvent<TData, TContext>;
        columnHeaderHeightChanged: ColumnHeaderHeightChangedEvent<TData, TContext>;
        gridStylesChanged: GridStylesChangedEvent<TData, TContext>;
        storeUpdated: StoreUpdatedEvent<TData, TContext>;
        filterDestroyed: IAcDGFilterDestroyedEvent<TData, TContext>;
        rowDataUpdateStarted: IAcDGRowDataUpdateStartedEvent<TData, TContext>;
        rowCountReady: RowCountReadyEvent<TData, TContext>;
        advancedFilterEnabledChanged: AdvancedFilterEnabledChangedEvent<TData, TContext>;
        dataTypesInferred: DataTypesInferredEvent<TData, TContext>;
        fieldValueChanged: FieldValueChangedEvent<TData, TContext>;
        fieldPickerValueSelected: FieldPickerValueSelectedEvent<TData, TContext>;
        richSelectListRowSelected: RichSelectListRowSelectedEvent<TData, TContext>;
        sideBarUpdated: SideBarUpdatedEvent<TData, TContext>;
        alignedGridScroll: AlignedGridScrollEvent<TData, TContext>;
        alignedGridColumn: AlignedGridColumnEvent<TData, TContext>;
        gridOptionsChanged: GridOptionsChangedEvent<TData, TContext>;
        chartTitleEdit: ChartTitleEditEvent<TData, TContext>;
        recalculateRowBounds: RecalculateRowBoundsEvent<TData, TContext>;
        stickyTopOffsetChanged: StickyTopOffsetChangedEvent<TData, TContext>;
        overlayExclusiveChanged: IAcDataGridEvent<'overlayExclusiveChanged'>;
        rowNodeDataChanged: RowNodeDataChangedEvent<TData, TContext>;
    }
>;

/** Internal Interface for AG Grid Events */
export type AllEventsWithoutGridCommon<TData = any, TContext = any> = {
    [K in keyof AgEventTypeParams<TData, TContext>]: WithoutGridCommon<AgEventTypeParams<TData, TContext>[K]>;
}[keyof AgEventTypeParams];

/** Union Type of all AG Grid Events */
export type AllEvents<TData = any, TContext = any> = {
    [K in keyof AgEventTypeParams<TData, TContext>]: AgEventTypeParams<TData, TContext>[K];
}[keyof AgEventTypeParams];

export interface IAcDataGridEvent<TEventType extends string = string> {
    /** Event identifier */
    type: TEventType;
}

export interface IAcDataGridGridEvent<TData = any, TContext = any, TEventType extends string = string>
    extends AgGridCommon<TData, TContext>,
        IAcDataGridEvent<TEventType> {}

export interface IAcDataGridGlobalEvent<T extends AgEventType, TData = any, TContext = any>
    extends IAcDataGridGridEvent<TData, TContext, T> {}

export type AgEventListener<TData = any, TContext = any, TEventType extends AgEventType = AgEventType> = (
    params: AgEventTypeParams<TData, TContext>[TEventType]
) => void;

export type AgGlobalEventListener<TData = any, TContext = any, T extends AgEventType = AgEventType> = (
    eventType: T,
    event: AgEventTypeParams<TData, TContext>[T]
) => void;

export interface IAcDGModelUpdatedEvent<TData = any, TContext = any> extends IAcDataGridGlobalEvent<'modelUpdated', TData, TContext> {
    /** If true, the grid will try and animate the rows to the new positions */
    animate: boolean | undefined;
    /** If true, the grid has new data loaded, eg user called setRowData(), otherwise
     * it's the same data but sorted or filtered, in which case this is true, and rows
     * can animate around (eg rowNode id 24 is the same row node as last time). */
    keepRenderedRows: boolean | undefined;
    /** If true, then this update was a result of setRowData() getting called. This
     * gets the grid to scroll to the top again. */
    newData: boolean | undefined;
    /** True when pagination and a new page is navigated to. */
    newPage: boolean;
    /** True when page size changes from the page size selector. */
    newPageSize?: boolean;
    /** true if all we did is changed row height, data still the same, no need to clear the undo/redo stacks */
    keepUndoRedoStack?: boolean;
}

export interface IAcDGPaginationChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'paginationChanged', TData, TContext> {
    /** True if rows were animated to new position */
    animate?: boolean;
    /** True if rows were kept (otherwise complete redraw) */
    keepRenderedRows?: boolean;
    /** True if data was new (i.e user set new data) */
    newData?: boolean;
    /** True if user went to a new page */
    newPage: boolean;
    /** True if user changed the page size */
    newPageSize?: boolean;
}

export interface IAcDGToolPanelSizeChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'toolPanelSizeChanged', TData, TContext> {
    /** True if this is the first change to the Tool Panel size. */
    started: boolean;
    /** True if this is the last change to the Tool Panel size. */
    ended: boolean;
    /** New width of the ToolPanel component. */
    width: number;
}

export interface IAcDGColumnPivotModeChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'columnPivotModeChanged', TData, TContext> {}

export interface IAcDGVirtualColumnsChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'virtualColumnsChanged', TData, TContext> {
    afterScroll: boolean;
}

/**
 * @deprecated v32.2 Either use `displayedColumnsChanged` which is fired at the same time,
 * or use one of the more specific column events.
 */
export interface IAcDGColumnEverythingChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'columnEverythingChanged', TData, TContext> {
    source: string;
}

export interface IAcDGNewColumnsLoadedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'newColumnsLoaded', TData, TContext> {
    source: ColumnEventType;
}

export interface IAcDGGridColumnsChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'gridColumnsChanged', TData, TContext> {}

export interface IAcDGDisplayedColumnsChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'displayedColumnsChanged', TData, TContext> {
    source: ColumnEventType;
}

export interface IAcDGRowDataUpdatedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'rowDataUpdated', TData, TContext> {}

/** Raised by ClientSideRowModel */
export interface IAcDGBeforeRefreshModelEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'beforeRefreshModel', TData, TContext> {
    params: RefreshModelParams<TData>;
}

export interface IAcDGRowDataUpdateStartedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'rowDataUpdateStarted', TData, TContext> {
    firstRowData: TData | null;
}

export interface IAcDGPinnedRowDataChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'pinnedRowDataChanged', TData, TContext> {}
export interface IAcDGPinnedHeightChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'pinnedHeightChanged', TData, TContext> {}

export interface IAcDGPinnedRowsChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'pinnedRowsChanged', TData, TContext> {}

/**
 * - `api` - from API method
 * - `apiSelectAll` - from API methods `selectAll`/`deselectAll`
 * - `apiSelectAllFiltered` - from API methods `selectAllFiltered`/`deselectAllFiltered`
 * - `apiSelectAllCurrentPage` - from API methods `selectAllOnCurrentPage`/`deselectAllOnCurrentPage`
 * - `checkboxSelected` - row selection checkbox clicked
 * - `rowClicked` - row clicked when row selection enabled
 * - `rowDataChanged` - row data updated which triggered selection updates
 * - `rowGroupChanged` - grouping changed which updated the selection
 * - `selectableChanged`- selectable status of row has changed when `rowSelection.groupSelects` is `'descendants'` or `'filteredDescendants'`
 * - `spaceKey` - space key pressed on row
 * - `keyboardSelectAll` - select all via keyboard shortcut (CTRL+A)
 * - `uiSelectAll` - select all in header clicked
 * - `uiSelectAllFiltered` - select all in header clicked when `rowSelection.selectAll = 'filtered'`
 * - `uiSelectAllCurrentPage` - select all in header clicked when `rowSelection.selectAll = 'currentPage'`
 * - `masterDetail` - Syncing selection state between master row and detail grid
 * - 'gridInitializing' - set as part of initial state while the grid is initializing
 */
export type SelectionEventSourceType =
    | 'api'
    | 'apiSelectAll'
    | 'apiSelectAllFiltered'
    | 'apiSelectAllCurrentPage'
    | 'checkboxSelected'
    | 'rowClicked'
    | 'rowDataChanged'
    | 'rowGroupChanged'
    | 'selectableChanged'
    | 'spaceKey'
    | 'keyboardSelectAll'
    | 'uiSelectAll'
    | 'uiSelectAllFiltered'
    | 'uiSelectAllCurrentPage'
    | 'masterDetail'
    | 'gridInitializing';

export interface IAcDGSelectionChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'selectionChanged', TData, TContext> {
    /** The source that triggered the selection change event. */
    source: SelectionEventSourceType;
    /** The row nodes that are selected at the time the event is generated. When selecting all nodes in SSRM or when group selecting in SSRM, this will be `null`. */
    selectedNodes: IRowNode[] | null;
    /** The SSRM selection state. This can be referred to when `selectedNodes` is `null`. This will be `null` when using a row model other than SSRM. */
    serverSideState: IServerSideSelectionState | IServerSideGroupSelectionState | null;
}

export type FilterChangedEventSourceType = 'api' | 'quickFilter' | 'columnFilter' | 'advancedFilter';

export interface IAcDGFilterChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'filterChanged', TData, TContext> {
    /**
     * The source that triggered the filter change event. Can be one of the following:
     * - `api` - triggered by an API call
     * - `quickFilter` - triggered by user filtering from Quick Filter
     * - `columnFilter` - triggered by user filtering from Column Menu
     * - `advancedFilter` - triggered by user filtering from Advanced Filter
     */
    source?: FilterChangedEventSourceType;
    /** True if the filter was changed as a result of data changing */
    afterDataChange?: boolean;
    /** True if filter was changed via floating filter */
    afterFloatingFilter?: boolean;
    /**
     * Columns affected by the filter change. Array contents depend on the source of the event.
     *
     * - Expect 1 element for UI-driven column filter changes.
     * - Expect 0-N elements (all affected columns) for calls to `api.setFilterModel()`.
     * - Expect 0-N elements (removed columns) for calls to `api.setColumnDefs()`.
     * - Expect 0 elements for quick-filters and calls to `api.onFilterChanged()`.
     */
    columns: Column[];
}

export interface IAcDGFilterModifiedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'filterModified', TData, TContext> {
    filterInstance: IFilterComp;
    column: Column;
}

export interface IAcDGFilterOpenedEvent<TData = any, TContext = any> extends IAcDataGridGlobalEvent<'filterOpened', TData, TContext> {
    /** Column / ProvidedColumnGroup that contains the filter */
    column: Column | ProvidedColumnGroup;
    /** Source of the open request */
    source: FilterRequestSource;
    /** Parent element of the filter */
    eGui: HTMLElement;
}

// internal event
export interface IAcDGFilterDestroyedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'filterDestroyed', TData, TContext> {
    source: 'api' | 'columnChanged' | 'gridDestroyed' | 'advancedFilterEnabled' | 'paramsUpdated';
    column: Column;
}

export interface IAcDGFindChangedEvent<TData = any, TContext = any> extends IAcDataGridGlobalEvent<'findChanged', TData, TContext> {
    /** The current search value. */
    findSearchValue: string | undefined;
    /** The active match, or `undefined` if no active match. */
    activeMatch: FindMatch<TData> | undefined;
    /** The total number of matches in the grid. */
    totalMatches: number;
}

export interface IAcDGSortChangedEvent<TData = any, TContext = any> extends IAcDataGridGlobalEvent<'sortChanged', TData, TContext> {
    /** Source of the sort change. */
    source: string;
    /**
     * The list of columns impacted by the sort change.
     */
    columns?: Column[];
}

export interface IAcDGGridReadyEvent<TData = any, TContext = any> extends IAcDataGridGlobalEvent<'gridReady', TData, TContext> {}
export interface IAcDGGridPreDestroyedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'gridPreDestroyed', TData, TContext> {
    /** Current state of the grid */
    state: GridState;
}

export interface IAcDGColumnContainerWidthChanged<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'columnContainerWidthChanged', TData, TContext> {} // not documented
export interface IAcDGDisplayedColumnsWidthChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'displayedColumnsWidthChanged', TData, TContext> {} // not documented
export interface IAcDGColumnHoverChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'columnHoverChanged', TData, TContext> {} // not documented
export interface IAcDGBodyHeightChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'bodyHeightChanged', TData, TContext> {} // not documented

// this event is 'odd one out' as it should have properties for all the properties
// in gridOptions that can be bound by the framework. for example, the gridOptions
// has 'rowData', so this property should have 'rowData' also, so that when the row
// data changes via the framework bound property, this event has that attribute set.
export interface IAcDGComponentStateChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'componentStateChanged', TData, TContext> {}

export interface IAcDGColumnPanelItemDragStartEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'columnPanelItemDragStart', TData, TContext> {
    column: Column | ProvidedColumnGroup;
}

export interface IAcDGColumnPanelItemDragEndEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'columnPanelItemDragEnd', TData, TContext> {}

export interface IAcDataGridDragEvent<T extends AgEventType, TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<T, TData, TContext> {
    /** The DOM element that started the event. */
    target: Element;
}

export interface IAcDGDragStartedEvent<TData = any, TContext = any> extends IAcDataGridDragEvent<'dragStarted', TData, TContext> {}

export interface IAcDGDragStoppedEvent<TData = any, TContext = any> extends IAcDataGridDragEvent<'dragStopped', TData, TContext> {}

export interface IAcDGDragCancelledEvent<TData = any, TContext = any>
    extends IAcDataGridDragEvent<'dragCancelled', TData, TContext> {}

// For internal use only.
// This event allows us to detect when other inputs in the same named group are changed, so for example we can ensure
// that only one radio button in the same group is selected at any given time.
export interface IAcDGCheckboxChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'checkboxChanged', TData, TContext> {
    id: string;
    name: string;
    selected?: boolean;
    previousValue: boolean | undefined;
}

export interface IAcDGGridSizeChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'gridSizeChanged', TData, TContext> {
    /** The grid's DIV's clientWidth */
    clientWidth: number;
    /** The grid's DIV's clientHeight */
    clientHeight: number;
}

export interface IAcDGPivotMaxColumnsExceededEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'pivotMaxColumnsExceeded', TData, TContext> {
    message: string;
}

interface IAcDGRowResizeEvent<TData = any, TContext = any, T extends AgEventType = any>
    extends IAcDataGridGlobalEvent<T, TData, TContext> {
    node: IRowNode<TData>;
    event: MouseEvent | Touch;
    rowHeight: number;
}

export interface IAcDGRowResizeStartedEvent<TData = any, TContext = any>
    extends IAcDGRowResizeEvent<TData, TContext, 'rowResizeStarted'> {}

export interface IAcDGRowResizeEndedEvent<TData = any, TContext = any>
    extends IAcDGRowResizeEvent<TData, TContext, 'rowResizeEnded'> {}

export interface IAcDGRowDragEvent<TData = any, TContext = any, T extends AgEventType = any>
    extends IAcDataGridGlobalEvent<T, TData, TContext> {
    /** The row node getting dragged. Also the node that started the drag when multi-row dragging. */
    node: IRowNode<TData>;
    /** The list of nodes being dragged. */
    nodes: IRowNode<TData>[];
    /** The underlying mouse move event associated with the drag. */
    event: MouseEvent;
    /** The `eventPath` persists the `event.composedPath()` result for access within AG Grid event handlers.  */
    eventPath?: EventTarget[];
    /** Direction of the drag, either `'up'`, `'down'` or `null` (if mouse is moving horizontally and not vertically). */
    vDirection: 'up' | 'down' | null;
    /** The row index the mouse is dragging over or -1 if over no row. */
    overIndex: number;
    /** The row node the mouse is dragging over or undefined if over no row. */
    overNode?: IRowNode<TData>;
    /** The vertical pixel location the mouse is over, with `0` meaning the top of the first row.
     * This can be compared to the `rowNode.rowHeight` and `rowNode.rowTop` to work out the mouse position relative to rows.
     * The provided attributes `overIndex` and `overNode` means the `y` property is mostly redundant.
     * The `y` property can be handy if you want more information such as 'how close is the mouse to the top or bottom of the row?'
     */
    y: number;
}

export interface IAcDGRowDragEnterEvent<TData = any, TContext = any> extends IAcDGRowDragEvent<TData, TContext, 'rowDragEnter'> {}

export interface IAcDGRowDragEndEvent<TData = any, TContext = any> extends IAcDGRowDragEvent<TData, TContext, 'rowDragEnd'> {}

export interface IAcDGRowDragCancelEvent<TData = any, TContext = any>
    extends IAcDGRowDragEvent<TData, TContext, 'rowDragCancel'> {}

export interface IAcDGRowDragMoveEvent<TData = any, TContext = any> extends IAcDGRowDragEvent<TData, TContext, 'rowDragMove'> {}

export interface IAcDGRowDragLeaveEvent<TData = any, TContext = any> extends IAcDGRowDragEvent<TData, TContext, 'rowDragLeave'> {}

export interface IAcDGCutStartEvent<TData = any, TContext = any> extends IAcDataGridGlobalEvent<'cutStart', TData, TContext> {
    source: 'api' | 'ui' | 'contextMenu';
}

export interface IAcDGCutEndEvent<TData = any, TContext = any> extends IAcDataGridGlobalEvent<'cutEnd', TData, TContext> {
    source: 'api' | 'ui' | 'contextMenu';
}

export interface IAcDGPasteStartEvent<TData = any, TContext = any> extends IAcDataGridGlobalEvent<'pasteStart', TData, TContext> {
    source: string;
}

export interface IAcDGPasteEndEvent<TData = any, TContext = any> extends IAcDataGridGlobalEvent<'pasteEnd', TData, TContext> {
    source: string;
}

export interface IAcDGFillStartEvent<TData = any, TContext = any> extends IAcDataGridGlobalEvent<'fillStart', TData, TContext> {}

export interface IAcDGFillEndEvent<TData = any, TContext = any> extends IAcDataGridGlobalEvent<'fillEnd', TData, TContext> {
    initialRange: CellRange;
    finalRange: CellRange;
}

export interface IAcDGCellSelectionDeleteStartEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'cellSelectionDeleteStart', TData, TContext> {
    source: 'deleteKey';
}

export interface IAcDGCellSelectionDeleteEndEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'cellSelectionDeleteEnd', TData, TContext> {
    source: 'deleteKey';
}

export interface IAcDGRangeDeleteStartEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'rangeDeleteStart', TData, TContext> {
    source: 'deleteKey';
}

export interface IAcDGRangeDeleteEndEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'rangeDeleteEnd', TData, TContext> {
    source: 'deleteKey';
}

export interface IAcDGUndoStartedEvent<TData = any, TContext = any> extends IAcDataGridGlobalEvent<'undoStarted', TData, TContext> {
    /** Source of the event. `api` if via API method. `ui` if via keyboard shortcut. */
    source: 'api' | 'ui';
}

export interface IAcDGUndoEndedEvent<TData = any, TContext = any> extends IAcDataGridGlobalEvent<'undoEnded', TData, TContext> {
    /** Source of the event. `api` if via API method. `ui` if via keyboard shortcut. */
    source: 'api' | 'ui';
    /** `true` if any undo operations were performed. */
    operationPerformed: boolean;
}

export interface IAcDGRedoStartedEvent<TData = any, TContext = any> extends IAcDataGridGlobalEvent<'redoStarted', TData, TContext> {
    /** Source of the event. `api` if via API method. `ui` if via keyboard shortcut. */
    source: 'api' | 'ui';
}

export interface IAcDGRedoEndedEvent<TData = any, TContext = any> extends IAcDataGridGlobalEvent<'redoEnded', TData, TContext> {
    /** Source of the event. `api` if via API method. `ui` if via keyboard shortcut. */
    source: 'api' | 'ui';
    /** `true` if any redo operations were performed. */
    operationPerformed: boolean;
}

export interface IAcDGViewportChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'viewportChanged', TData, TContext> {
    /** Index of the first rendered row */
    firstRow: number;
    /** Index of the last rendered row */
    lastRow: number;
}

export interface IAcDGFirstDataRenderedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'firstDataRendered', TData, TContext> {
    /** Index of the first rendered row */
    firstRow: number;
    /** Index of the last rendered row */
    lastRow: number;
}

export interface IAcDGRangeSelectionChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'rangeSelectionChanged', TData, TContext> {
    id?: string;
    /** True for the first change event, otherwise false */
    started: boolean;
    /** True for the last change event, otherwise false */
    finished: boolean;
}

export interface IAcDGCellSelectionChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'cellSelectionChanged', TData, TContext> {
    id?: string;
    /** True for the first change event, otherwise false */
    started: boolean;
    /** True for the last change event, otherwise false */
    finished: boolean;
}

export interface IAcDGChartCreatedEvent<TData = any, TContext = any> extends IAcDataGridGlobalEvent<'chartCreated', TData, TContext> {
    /** Id of the created chart. This can later be used to reference the chart via api methods. */
    chartId: string;
}
/** @deprecated v32 Use IAcDGChartCreatedEvent instead */
export interface IAcDGChartCreated<TData = any, TContext = any> extends IAcDGChartCreatedEvent<TData, TContext> {}

export interface IAcDGChartRangeSelectionChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'chartRangeSelectionChanged', TData, TContext> {
    /** Id of the effected chart. */
    chartId: string;
    /** Same as `chartId`. */
    id: string;
    /** New cellRange selected. */
    cellRange: CellRangeParams;
}
/** @deprecated v32 Use IAcDGChartRangeSelectionChangedEvent instead */
export interface IAcDGChartRangeSelectionChanged<TData = any, TContext = any>
    extends IAcDGChartRangeSelectionChangedEvent<TData, TContext> {}

export interface IAcDGChartOptionsChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'chartOptionsChanged', TData, TContext> {
    /** Id of the effected chart. */
    chartId: string;
    /** ChartType */
    chartType: ChartType;
    /** Chart theme name of currently selected theme. */
    chartThemeName: string;
    /** Chart options.  */
    chartOptions: AgChartThemeOverrides;
}
/** @deprecated v32 Use IAcDGChartOptionsChangedEvent instead */
export interface IAcDGChartOptionsChanged<TData = any, TContext = any> extends IAcDGChartOptionsChangedEvent<TData, TContext> {}

export interface IAcDGChartDestroyedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'chartDestroyed', TData, TContext> {
    /** Id of the effected chart. */
    chartId: string;
}

/** @deprecated v32 Use IAcDGChartDestroyedEvent instead */
export interface IAcDGChartDestroyed<TData = any, TContext = any> extends IAcDGChartDestroyedEvent<TData, TContext> {}

export interface IAcDGColumnGroupOpenedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'columnGroupOpened', TData, TContext> {
    columnGroup?: ProvidedColumnGroup;
    columnGroups: ProvidedColumnGroup[];
}

export type ScrollDirection = 'horizontal' | 'vertical';

interface IAcDGBaseBodyScrollEvent<T extends AgEventType, TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<T, TData, TContext> {
    direction: ScrollDirection;
    left: number;
    top: number;
}
export interface IAcDGBodyScrollEvent<TData = any, TContext = any>
    extends BaseBodyScrollEvent<'bodyScroll', TData, TContext> {}

export interface IAcDGBodyScrollEndEvent<TData = any, TContext = any>
    extends BaseBodyScrollEvent<'bodyScrollEnd', TData, TContext> {}

interface IAcDGTooltipEvent<T extends 'tooltipShow' | 'tooltipHide', TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<T, TData, TContext> {
    parentGui: HTMLElement;
}
export interface IAcDGTooltipShowEvent<TData = any, TContext = any> extends TooltipEvent<'tooltipShow', TData, TContext> {
    tooltipGui: HTMLElement;
}

export interface IAcDGTooltipHideEvent<TData = any, TContext = any> extends TooltipEvent<'tooltipHide', TData, TContext> {}

export interface IAcDGPaginationPixelOffsetChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'paginationPixelOffsetChanged', TData, TContext> {}

export interface IAcDGStickyTopOffsetChangedEvent extends IAcDataGridEvent<'stickyTopOffsetChanged'> {
    offset: number;
}

export interface IAcDGCommonCellFocusParams {
    /** Row index of the focused cell */
    rowIndex: number | null;
    /** Column of the focused cell */
    column: Column | string | null;
    /** either 'top', 'bottom' or null / undefined (if not pinned) */
    rowPinned: RowPinnedType;
    /** Whether the cell a full width cell or a regular cell */
    isFullWidthCell?: boolean;
}

export interface IAcDGCellFocusClearedParams extends CommonCellFocusParams {}

export interface IAcDGCellFocusedParams extends CommonCellFocusParams {
    /** Whether browser focus is also set (false when editing) */
    forceBrowserFocus?: boolean;
    /** When `forceBrowserFocus` is `true`, should scroll be prevented */
    preventScrollOnBrowserFocus?: boolean;
}

export interface IAcDGHeaderFocusedParams {
    column: Column | ColumnGroup;
}

export interface IAcDGHeaderFocusedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'headerFocused', TData, TContext>,
        HeaderFocusedParams {}

export interface IAcDGCellFocusClearedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'cellFocusCleared', TData, TContext>,
        CellFocusClearedParams {}

// this does not extent CellEvent as the focus service doesn't keep a reference to
// the rowNode.
export interface IAcDGCellFocusedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'cellFocused', TData, TContext>,
        CellFocusedParams {}

export interface IAcDGFullWidthRowFocusedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'fullWidthRowFocused', TData, TContext>,
        CellFocusedParams {
    fromBelow: boolean;
}

/**
 * @deprecated v32 Please use `ExpandOrCollapseAllEvent` instead.
 */
export interface IAcDGExpandCollapseAllEvent<TData = any, TContext = any>
    extends ExpandOrCollapseAllEvent<TData, TContext> {}
export interface IAcDGExpandOrCollapseAllEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'expandOrCollapseAll', TData, TContext> {
    source: string;
}

/**---------------*/
/** COLUMN EVENTS */
/**---------------*/

export type ColumnEventType =
    | 'sizeColumnsToFit'
    | 'autosizeColumns'
    | 'autosizeColumnHeaderHeight'
    | 'alignedGridChanged'
    | 'filterChanged'
    | 'filterDestroyed'
    | 'gridOptionsChanged'
    | 'gridInitializing'
    | 'toolPanelDragAndDrop'
    | 'toolPanelUi'
    | 'uiColumnMoved'
    | 'uiColumnResized'
    | 'uiColumnDragged'
    | 'uiColumnExpanded'
    | 'uiColumnSorted'
    | 'contextMenu'
    | 'columnMenu'
    | 'rowModelUpdated'
    | 'rowDataUpdated'
    | 'api'
    | 'flex'
    | 'pivotChart'
    | 'columnRowGroupChanged'
    | 'cellDataTypeInferred'
    | 'rowNumbersService'
    | 'viewportSizeFeature';

export interface IAcDGColumnEvent<T extends AgEventType | ColumnEventName = any, TData = any, TContext = any>
    extends IAcDataGridGridEvent<TData, TContext, T> {
    /** The impacted column, only set if action was on one column */
    column: Column | null;
    /** List of all impacted columns */
    columns: Column[] | null;
    /** String describing where the event is coming from */
    source: ColumnEventType;
}

export interface IAcDGColumnResizedEvent<TData = any, TContext = any> extends ColumnEvent<'columnResized', TData, TContext> {
    /** Set to true for last event in a sequence of move events */
    finished: boolean;
    /** Any columns resized due to flex */
    flexColumns: Column[] | null;
}

export interface IAcDGColumnPivotChangedEvent<TData = any, TContext = any>
    extends ColumnEvent<'columnPivotChanged', TData, TContext> {}

export interface IAcDGColumnRowGroupChangedEvent<TData = any, TContext = any>
    extends ColumnEvent<'columnRowGroupChanged', TData, TContext> {}

export interface IAcDGColumnValueChangedEvent<TData = any, TContext = any>
    extends ColumnEvent<'columnValueChanged', TData, TContext> {}

export interface IAcDGColumnMovedEvent<TData = any, TContext = any> extends ColumnEvent<'columnMoved', TData, TContext> {
    /** The position the column was moved to */
    toIndex?: number;
    /** `True` when the column has finished moving. */
    finished: boolean;
}

export interface IAcDGColumnVisibleEvent<TData = any, TContext = any> extends ColumnEvent<'columnVisible', TData, TContext> {
    /** True if column was set to visible, false if set to hide, undefined if in a single call some columns were shown while others hidden */
    visible?: boolean;
}

export interface IAcDGColumnPinnedEvent<TData = any, TContext = any> extends ColumnEvent<'columnPinned', TData, TContext> {
    /** Either 'left', 'right', or null (it not pinned) */
    pinned: ColumnPinnedType;
}

export interface IAcDGColumnHeaderMouseOverEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'columnHeaderMouseOver', TData, TContext> {
    /** Column or column-group related to the header that triggered the event */
    column: Column | ProvidedColumnGroup;
}

export interface IAcDGColumnHeaderMouseLeaveEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'columnHeaderMouseLeave', TData, TContext> {
    /** Column or column-group related to the header that triggered the event */
    column: Column | ProvidedColumnGroup;
}

export interface IAcDGColumnHeaderClickedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'columnHeaderClicked', TData, TContext> {
    /** Column or column-group related to the header that triggered the event */
    column: Column | ProvidedColumnGroup;
}

export interface IAcDGColumnHeaderContextMenuEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'columnHeaderContextMenu', TData, TContext> {
    /** Column or column-group related to the header that triggered the event */
    column: Column | ProvidedColumnGroup;
}

/**-------------------*/
/** VISIBILITY EVENTS */
/**-------------------*/
export interface IAcDGContextMenuVisibleChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'contextMenuVisibleChanged', TData, TContext> {
    /** True if now visible; false if now hidden. */
    visible: boolean;
    /** Source of the visibility status change. */
    source: 'api' | 'ui';
}

export interface IAcDGAdvancedFilterBuilderVisibleChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'advancedFilterBuilderVisibleChanged', TData, TContext> {
    /** True if now visible; false if now hidden. */
    visible: boolean;
    /** Source of the visibility status change. */
    source: 'api' | 'ui';
}

export interface IAcDGToolPanelVisibleChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'toolPanelVisibleChanged', TData, TContext> {
    /** True if now visible; false if now hidden. */
    visible: boolean;
    source: 'sideBarButtonClicked' | 'sideBarInitializing' | 'api';
    /** Key of tool panel. */
    key: string;
    /** True if switching between tool panels. False if showing/hiding. */
    switchingToolPanel: boolean;
}

export interface IAcDGColumnMenuVisibleChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'columnMenuVisibleChanged', TData, TContext> {
    /** True if now visible; false if now hidden. */
    visible: boolean;
    /** True if switching between tabs. False if showing/hiding. Only applies to legacy tabbed menu. */
    switchingTab: boolean;
    /**
     * Currently displayed menu/tab.
     * If filter launched from floating filter, will be `'floatingFilter'`.
     * If using `columnMenu = 'new'` (default behaviour), will be `'columnMenu'` for the column menu,
     * `'columnFilter'` for the column filter, and `'columnChooser'` for the column chooser.
     * If using AG Grid Enterprise and `columnMenu = 'legacy'`,
     * will be the tab `'generalMenuTab'`, `'filterMenuTab'` or `'columnsMenuTab'`.
     * If using AG Grid Community and `columnMenu = 'legacy'`, will be `'columnMenu'`.
     */
    key:
        | 'generalMenuTab'
        | 'filterMenuTab'
        | 'columnsMenuTab'
        | 'columnMenu'
        | 'columnFilter'
        | 'floatingFilter'
        | 'columnChooser';
    /**
     * Column the menu is opened for. Will be `null` if not launched from a column
     * (e.g. column chooser from the API, or column menu via right-click on a column group or empty header).
     */
    column: Column | null;
    /**
     * Column group the menu is opened for if launched from right-click on a column group
     */
    columnGroup?: ProvidedColumnGroup | null;
}

/**------------*/
/** ROW EVENTS */
/**------------*/
interface IAcDGBaseRowEvent<T extends AgEventType, TData, TContext> extends IAcDataGridGlobalEvent<T, TData, TContext> {
    /** The row node. */
    node: IRowNode<TData>;
    /** The visible row index for the row */
    rowIndex: number | null;
    /** Either 'top', 'bottom' or null / undefined (if not set) */
    rowPinned: RowPinnedType;
    /** If event was due to browser event (eg click), this is the browser event */
    event?: Event | null;
    /** If the browser `event` is present the `eventPath` persists the `event.composedPath()` result for access within AG Grid event handlers.  */
    eventPath?: EventTarget[];
}

export interface IAcDGRowEvent<T extends AgEventType, TData = any, TContext = any> extends BaseRowEvent<T, TData, TContext> {
    /** The user provided data for the row. Data is `undefined` for row groups. */
    data: TData | undefined;
}

/** Base interface for row events that always have data set. */
interface IAcDGRowWithDataEvent<T extends AgEventType, TData = any, TContext = any>
    extends BaseRowEvent<T, TData, TContext> {
    /** The user provided data for the row. */
    data: TData;
}

export interface IAcDGRowGroupOpenedEvent<TData = any, TContext = any> extends RowEvent<'rowGroupOpened', TData, TContext> {
    /** True if the group is expanded. */
    expanded: boolean;
}

export interface IAcDGRowValueChangedEvent<TData = any, TContext = any>
    extends RowEvent<'rowValueChanged', TData, TContext> {}

export interface IAcDGRowSelectedEvent<TData = any, TContext = any> extends RowEvent<'rowSelected', TData, TContext> {
    source: SelectionEventSourceType;
}

export interface IAcDGVirtualRowRemovedEvent<TData = any, TContext = any>
    extends RowEvent<'virtualRowRemoved', TData, TContext> {}

export interface IAcDGRowClickedEvent<TData = any, TContext = any> extends RowEvent<'rowClicked', TData, TContext> {}

export interface IAcDGRowDoubleClickedEvent<TData = any, TContext = any>
    extends RowEvent<'rowDoubleClicked', TData, TContext> {}

export interface IAcDGRowEditingStartedEvent<TData = any, TContext = any>
    extends RowEvent<'rowEditingStarted', TData, TContext> {}

export interface IAcDGRowEditingStoppedEvent<TData = any, TContext = any>
    extends RowEvent<'rowEditingStopped', TData, TContext> {}

export interface IAcDGFullWidthCellKeyDownEvent<TData = any, TContext = any>
    extends RowEvent<'cellKeyDown', TData, TContext> {}

/**------------*/

/** CELL EVENTS */
/**------------*/
export interface IAcDGCellEvent<T extends AgEventType, TData = any, TValue = any> extends RowEvent<T, TData> {
    column: Column<TValue>;
    colDef: ColDef<TData, TValue>;
    /** The value for the cell if available otherwise undefined. */
    value: TValue | null | undefined;
}

/** Use for cell events that will always have a data property. */
interface IAcDGCellWithDataEvent<T extends AgEventType, TData = any, TValue = any> extends RowWithDataEvent<T, TData> {
    column: Column<TValue>;
    colDef: ColDef<TData, TValue>;
    /** The value for the cell */
    value: TValue | null | undefined;
}

export interface IAcDGCellKeyDownEvent<TData = any, TValue = any> extends CellEvent<'cellKeyDown', TData, TValue> {}

export interface IAcDGCellClickedEvent<TData = any, TValue = any> extends CellEvent<'cellClicked', TData, TValue> {}

export interface IAcDGCellMouseDownEvent<TData = any, TValue = any> extends CellEvent<'cellMouseDown', TData, TValue> {}

export interface IAcDGCellDoubleClickedEvent<TData = any, TValue = any>
    extends CellEvent<'cellDoubleClicked', TData, TValue> {}

export interface IAcDGCellMouseOverEvent<TData = any, TValue = any> extends CellEvent<'cellMouseOver', TData, TValue> {}

export interface IAcDGCellMouseOutEvent<TData = any, TValue = any> extends CellEvent<'cellMouseOut', TData, TValue> {}

export interface IAcDGCellContextMenuEvent<TData = any, TValue = any> extends CellEvent<'cellContextMenu', TData, TValue> {}

export interface IAcDGCellEditingStartedEvent<TData = any, TValue = any>
    extends CellEvent<'cellEditingStarted', TData, TValue> {}

export interface IAcDGCellEditingStoppedEvent<TData = any, TValue = any>
    extends CellEvent<'cellEditingStopped', TData, TValue> {
    /** The old value before editing */
    oldValue: TValue | null | undefined;
    /** The new value after editing */
    newValue: TValue | null | undefined;
    /** Property indicating if the value of the editor has changed */
    valueChanged: boolean;
}

export interface IAcDGCellValueChangedEvent<TData = any, TValue = any>
    extends CellWithDataEvent<'cellValueChanged', TData, TValue> {
    oldValue: TValue | null | undefined;
    newValue: TValue | null | undefined;
    source: string | undefined;
}

export interface IAcDGCellEditRequestEvent<TData = any, TValue = any>
    extends CellWithDataEvent<'cellEditRequest', TData, TValue> {
    oldValue: TValue | null | undefined;
    newValue: TValue | null | undefined;
    source: string | undefined;
}

export interface IAcDGAsyncTransactionsFlushedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'asyncTransactionsFlushed', TData, TContext> {
    /**
     * Array of result objects. for SSRM it's always list of `ServerSideTransactionResult`.
     * For Client-Side Row Model it's a list of `RowNodeTransaction`.
     */
    results: (RowNodeTransaction<TData> | ServerSideTransactionResult<TData>)[];
}
/** @deprecated v32 Use AsyncTransactionsFlushedEvent */
export interface IAcDGAsyncTransactionsFlushed<TData = any, TContext = any>
    extends AsyncTransactionsFlushedEvent<TData, TContext> {}

export interface IAcDGStoreRefreshedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'storeRefreshed', TData, TContext> {
    /** The route of the store which has finished refreshing, undefined if root level */
    route?: string[];
}

export interface IAcDGStateUpdatedEvent<TData = any, TContext = any> extends IAcDataGridGlobalEvent<'stateUpdated', TData, TContext> {
    /**
     * Which parts of the state triggered the update,
     * or `gridInitializing` when the state has been created during grid initialization,
     * or 'api' when the state has been set via `api.setState`
     */
    sources: (keyof GridState | 'gridInitializing' | 'api')[];
    /** The updated state */
    state: GridState;
}

export interface IAcDGScrollVisibilityChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'scrollVisibilityChanged', TData, TContext> {} // not documented

export interface IAcDGScrollOverflowChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'scrollGapChanged', TData, TContext> {} // not documented

export interface IAcDGStoreUpdatedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'storeUpdated', TData, TContext> {} // not documented

export interface IAcDGLeftPinnedWidthChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'leftPinnedWidthChanged', TData, TContext> {} // not documented
export interface IAcDGRightPinnedWidthChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'rightPinnedWidthChanged', TData, TContext> {} // not documented

export interface IAcDGRowContainerHeightChanged<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'rowContainerHeightChanged', TData, TContext> {} // not documented

/**-----------------*/
/** Internal EVENTS */
/**-----------------*/

// not documented
export interface IAcDGFlashCellsEvent<TData = any, TContext = any> extends IAcDataGridGlobalEvent<'flashCells', TData, TContext> {
    cells: any;
}
export interface IAcDGDisplayedRowsChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'displayedRowsChanged', TData, TContext> {
    afterScroll: boolean;
} // not documented

export interface IAcDGCssVariablesChanged<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'gridStylesChanged', TData, TContext> {
    themeChanged?: boolean;
    headerHeightChanged?: boolean;
    rowHeightChanged?: boolean;
    listItemHeightChanged?: boolean;
    rowBorderWidthChanged?: boolean;
} // not documented

export interface IAcDGAdvancedFilterEnabledChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'advancedFilterEnabledChanged', TData, TContext> {
    enabled: boolean;
}

export interface IAcDGDataTypesInferredEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'dataTypesInferred', TData, TContext> {}

export interface IAcDGFieldValueEvent<T extends AgEventType = 'fieldValueChanged', TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<T, TData, TContext> {
    value: any;
}
export interface IAcDGFieldPickerValueSelectedEvent<TData = any, TContext = any>
    extends FieldValueEvent<'fieldPickerValueSelected', TData, TContext> {
    fromEnterKey: boolean;
}
export interface IAcDGRichSelectListRowSelectedEvent<TData = any, TContext = any>
    extends FieldValueEvent<'richSelectListRowSelected', TData, TContext> {
    fromEnterKey: boolean;
}

export interface IAcDGAlignedGridColumnEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'alignedGridColumn', TData, TContext> {
    event: ColumnEvent<any> | IAcDGColumnGroupOpenedEvent;
}

export interface IAcDGAlignedGridScrollEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'alignedGridScroll', TData, TContext> {
    event: BodyScrollEvent;
}

export interface IAcDGGridOptionsChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'gridOptionsChanged', TData, TContext> {
    options: GridOptions;
}

export interface IAcDGScrollbarWidthChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'scrollbarWidthChanged', TData, TContext> {}
export interface IAcDGKeyShortcutChangedCellStartEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'keyShortcutChangedCellStart', TData, TContext> {}
export interface IAcDGKeyShortcutChangedCellEndEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'keyShortcutChangedCellEnd', TData, TContext> {}
export interface IAcDGHeightScaleChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'heightScaleChanged', TData, TContext> {}
export interface IAcDGSuppressMovableColumnsEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'suppressMovableColumns', TData, TContext> {}
export interface IAcDGSuppressMenuHideEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'suppressMenuHide', TData, TContext> {}
export interface IAcDGSuppressFieldDotNotationEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'suppressFieldDotNotation', TData, TContext> {}
export interface IAcDGColumnContainerWidthChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'columnContainerWidthChanged', TData, TContext> {}
export interface IAcDGRowContainerHeightChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'rowContainerHeightChanged', TData, TContext> {}
export interface IAcDGHeaderHeightChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'headerHeightChanged', TData, TContext> {}
export interface IAcDGColumnHeaderHeightChangedEvent<TData = any, TContext = any>
    extends ColumnEvent<'columnHeaderHeightChanged', TData, TContext> {}
export interface IAcDGColumnGroupHeaderHeightChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'columnGroupHeaderHeightChanged', TData, TContext> {
    columnGroup: ColumnGroup | null;
    source: 'autosizeColumnGroupHeaderHeight';
}
export interface IAcDGGridStylesChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'gridStylesChanged', TData, TContext> {}
export interface IAcDGRowCountReadyEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'rowCountReady', TData, TContext> {}
export interface IAcDGFieldValueChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'fieldValueChanged', TData, TContext> {}
export interface IAcDGFieldPickerValueSelectedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'fieldPickerValueSelected', TData, TContext> {}
export interface IAcDGRichSelectListRowSelectedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'richSelectListRowSelected', TData, TContext> {}
export interface IAcDGSideBarUpdatedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'sideBarUpdated', TData, TContext> {}
export interface IAcDGChartTitleEditEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'chartTitleEdit', TData, TContext> {}
export interface IAcDGRecalculateRowBoundsEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'recalculateRowBounds', TData, TContext> {}
export interface IAcDGStickyTopOffsetChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'stickyTopOffsetChanged', TData, TContext> {}
export interface IAcDGRowNodeDataChangedEvent<TData = any, TContext = any>
    extends IAcDataGridGlobalEvent<'rowNodeDataChanged', TData, TContext> {
    node: RowNode<TData>;
}
