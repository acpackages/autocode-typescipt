import type { ValidationModuleName } from '../interfaces/iModule';
import type { _FindApi } from './gridApi';
import type {
    GridApi,
    _AdvancedFilterGridApi,
    _AggregationGridApi,
    _CellSelectionGridApi,
    _ClientSideRowModelGridApi,
    _ClipboardGridApi,
    _ColumnAutosizeApi,
    _ColumnChooserGridApi,
    _ColumnFilterGridApi,
    _ColumnGridApi,
    _ColumnGroupGridApi,
    _ColumnHoverApi,
    _ColumnMoveApi,
    _ColumnResizeApi,
    _CommunityMenuGridApi,
    _ContextMenuGridApi,
    _CoreGridApi,
    _CsrmSsrmSharedGridApi,
    _CsvExportGridApi,
    _DragGridApi,
    _EditGridApi,
    _EventGridApi,
    _ExcelExportGridApi,
    _FilterGridApi,
    _GridChartsGridApi,
    _HighlightChangesGridApi,
    _InfiniteRowModelGridApi,
    _KeyboardNavigationGridApi,
    _MasterDetailGridApi,
    _OverlayGridApi,
    _PaginationGridApi,
    _PinnedRowGridApi,
    _PivotGridApi,
    _QuickFilterGridApi,
    _RenderGridApi,
    _RowGridApi,
    _RowGroupingGridApi,
    _RowSelectionGridApi,
    _ScrollGridApi,
    _ServerSideRowModelGridApi,
    _SideBarGridApi,
    _SortGridApi,
    _SsrmInfiniteSharedGridApi,
    _StateGridApi,
    _StatusBarGridApi,
    _UndoRedoGridApi,
    _ValueApi,
    _ValueCacheApi,
} from './gridApi';

const mod = <TGridApi extends Partial<GridApi>>(
    moduleName: ValidationModuleName,
    input: Record<keyof TGridApi, 0>
): Record<keyof TGridApi, ValidationModuleName> => {
    for (const key of Object.keys(input)) {
        (input as any)[key] = moduleName;
    }
    return input as any;
};

export const gridApiFunctionsMap: Record<keyof GridApi, ValidationModuleName> = {
    dispatchEvent: 'CommunityCore', // this is always registered
    ...mod<_CoreGridApi<any>>('CommunityCore', {
        destroy: 0,
        getGridId: 0,
        getGridOption: 0,
        isDestroyed: 0,
        setGridOption: 0,
        updateGridOptions: 0,
        isModuleRegistered: 0,
    }),
    ...mod<_StateGridApi>('GridState', {
        getState: 0,
        setState: 0,
    }),
    ...mod<_RowSelectionGridApi<any>>('SharedRowSelection', {
        setNodesSelected: 0,
        selectAll: 0,
        deselectAll: 0,
        selectAllFiltered: 0,
        deselectAllFiltered: 0,
        selectAllOnCurrentPage: 0,
        deselectAllOnCurrentPage: 0,
        getSelectedNodes: 0,
        getSelectedRows: 0,
    }),
    ...mod<_RowGridApi<any>>('RowApi', {
        redrawRows: 0,
        setRowNodeExpanded: 0,
        getRowNode: 0,
        addRenderedRowListener: 0,
        getRenderedNodes: 0,
        forEachNode: 0,
        getFirstDisplayedRowIndex: 0,
        getLastDisplayedRowIndex: 0,
        getDisplayedRowAtIndex: 0,
        getDisplayedRowCount: 0,
    }),
    ...mod<_ScrollGridApi<any>>('ScrollApi', {
        getVerticalPixelRange: 0,
        getHorizontalPixelRange: 0,
        ensureColumnVisible: 0,
        ensureIndexVisible: 0,
        ensureNodeVisible: 0,
    }),
    ...mod<_KeyboardNavigationGridApi>('KeyboardNavigation', {
        getFocusedCell: 0,
        clearFocusedCell: 0,
        setFocusedCell: 0,
        tabToNextCell: 0,
        tabToPreviousCell: 0,
        setFocusedHeader: 0,
    }),
    ...mod<_EventGridApi<any>>('EventApi', {
        addEventListener: 0,
        addGlobalListener: 0,
        removeEventListener: 0,
        removeGlobalListener: 0,
    }),
    ...mod<_ValueCacheApi>('ValueCache', {
        expireValueCache: 0,
    }),
    ...mod<_ValueApi<any>>('CellApi', {
        getCellValue: 0,
    }),
    ...mod<_CommunityMenuGridApi>('SharedMenu', {
        showColumnMenu: 0,
        hidePopupMenu: 0,
    }),
    ...mod<_SortGridApi>('Sort', {
        onSortChanged: 0,
    }),
    ...mod<_PinnedRowGridApi>('PinnedRow', {
        getPinnedTopRowCount: 0,
        getPinnedBottomRowCount: 0,
        getPinnedTopRow: 0,
        getPinnedBottomRow: 0,
        forEachPinnedRow: 0,
    }),
    ...mod<_OverlayGridApi>('Overlay', {
        showLoadingOverlay: 0,
        showNoRowsOverlay: 0,
        hideOverlay: 0,
    }),
    ...mod<_RenderGridApi<any>>('RenderApi', {
        setGridAriaProperty: 0,
        refreshCells: 0,
        refreshHeader: 0,
        isAnimationFrameQueueEmpty: 0,
        flushAllAnimationFrames: 0,
        getSizesForCurrentTheme: 0,
        getCellRendererInstances: 0,
    }),
    ...mod<_HighlightChangesGridApi<any>>('HighlightChanges', {
        flashCells: 0,
    }),
    ...mod<_DragGridApi>('RowDrag', {
        addRowDropZone: 0,
        removeRowDropZone: 0,
        getRowDropZoneParams: 0,
    }),
    ...mod<_ColumnGridApi<any>>('ColumnApi', {
        getColumnDefs: 0,
        getColumnDef: 0,
        getDisplayNameForColumn: 0,
        getColumn: 0,
        getColumns: 0,
        applyColumnState: 0,
        getColumnState: 0,
        resetColumnState: 0,
        isPinning: 0,
        isPinningLeft: 0,
        isPinningRight: 0,
        getDisplayedColAfter: 0,
        getDisplayedColBefore: 0,
        setColumnsVisible: 0,
        setColumnsPinned: 0,
        getAllGridColumns: 0,
        getDisplayedLeftColumns: 0,
        getDisplayedCenterColumns: 0,
        getDisplayedRightColumns: 0,
        getAllDisplayedColumns: 0,
        getAllDisplayedVirtualColumns: 0,
    }),
    ...mod<_ColumnAutosizeApi>('ColumnAutoSize', {
        sizeColumnsToFit: 0,
        autoSizeColumns: 0,
        autoSizeAllColumns: 0,
    }),
    ...mod<_ColumnGroupGridApi>('ColumnGroup', {
        setColumnGroupOpened: 0,
        getColumnGroup: 0,
        getProvidedColumnGroup: 0,
        getDisplayNameForColumnGroup: 0,
        getColumnGroupState: 0,
        setColumnGroupState: 0,
        resetColumnGroupState: 0,
        getLeftDisplayedColumnGroups: 0,
        getCenterDisplayedColumnGroups: 0,
        getRightDisplayedColumnGroups: 0,
        getAllDisplayedColumnGroups: 0,
    }),
    ...mod<_ColumnMoveApi>('ColumnMove', {
        moveColumnByIndex: 0,
        moveColumns: 0,
    }),
    ...mod<_ColumnResizeApi>('ColumnResize', {
        setColumnWidths: 0,
    }),
    ...mod<_ColumnHoverApi>('ColumnHover', {
        isColumnHovered: 0,
    }),
    ...mod<_EditGridApi<any>>('EditCore', {
        getCellEditorInstances: 0,
        getEditingCells: 0,
        stopEditing: 0,
        startEditingCell: 0,
    }),
    ...mod<_UndoRedoGridApi>('UndoRedoEdit', {
        undoCellEditing: 0,
        redoCellEditing: 0,
        getCurrentUndoSize: 0,
        getCurrentRedoSize: 0,
    }),
    ...mod<_FilterGridApi>('FilterCore', {
        isAnyFilterPresent: 0,
        onFilterChanged: 0,
    }),
    ...mod<_ColumnFilterGridApi>('ColumnFilter', {
        isColumnFilterPresent: 0,
        getColumnFilterInstance: 0,
        destroyFilter: 0,
        setFilterModel: 0,
        getFilterModel: 0,
        getColumnFilterModel: 0,
        setColumnFilterModel: 0,
        showColumnFilter: 0,
    }),
    ...mod<_QuickFilterGridApi>('QuickFilter', {
        isQuickFilterPresent: 0,
        getQuickFilter: 0,
        resetQuickFilter: 0,
    }),
    ...mod<_FindApi<any>>('Find', {
        findGetActiveMatch: 0,
        findGetTotalMatches: 0,
        findGoTo: 0,
        findNext: 0,
        findPrevious: 0,
        findGetNumMatches: 0,
        findGetParts: 0,
        findClearActive: 0,
        findRefresh: 0,
    }),
    ...mod<_PaginationGridApi>('Pagination', {
        paginationIsLastPageFound: 0,
        paginationGetPageSize: 0,
        paginationGetCurrentPage: 0,
        paginationGetTotalPages: 0,
        paginationGetRowCount: 0,
        paginationGoToNextPage: 0,
        paginationGoToPreviousPage: 0,
        paginationGoToFirstPage: 0,
        paginationGoToLastPage: 0,
        paginationGoToPage: 0,
    }),
    ...mod<_CsrmSsrmSharedGridApi>('CsrmSsrmSharedApi', {
        expandAll: 0,
        collapseAll: 0,
        onRowHeightChanged: 0,
    }),
    ...mod<_SsrmInfiniteSharedGridApi>('SsrmInfiniteSharedApi', {
        setRowCount: 0,
        getCacheBlockState: 0,
        isLastRowIndexKnown: 0,
    }),

    ...mod<_ClientSideRowModelGridApi<any>>('ClientSideRowModelApi', {
        onGroupExpandedOrCollapsed: 0,
        refreshClientSideRowModel: 0,
        isRowDataEmpty: 0,
        forEachLeafNode: 0,
        forEachNodeAfterFilter: 0,
        forEachNodeAfterFilterAndSort: 0,
        resetRowHeights: 0,
        applyTransaction: 0,
        applyTransactionAsync: 0,
        flushAsyncTransactions: 0,
        getBestCostNodeSelection: 0,
    }),

    ...mod<_CsvExportGridApi>('CsvExport', {
        getDataAsCsv: 0,
        exportDataAsCsv: 0,
    }),

    ...mod<_InfiniteRowModelGridApi>('InfiniteRowModel', {
        refreshInfiniteCache: 0,
        purgeInfiniteCache: 0,
        getInfiniteRowCount: 0,
    }),

    ...mod<_AdvancedFilterGridApi>('AdvancedFilter', {
        getAdvancedFilterModel: 0,
        setAdvancedFilterModel: 0,
        showAdvancedFilterBuilder: 0,
        hideAdvancedFilterBuilder: 0,
    }),

    ...mod<_GridChartsGridApi>('IntegratedCharts', {
        getChartModels: 0,
        getChartRef: 0,
        getChartImageDataURL: 0,
        downloadChart: 0,
        openChartToolPanel: 0,
        closeChartToolPanel: 0,
        createRangeChart: 0,
        createPivotChart: 0,
        createCrossFilterChart: 0,
        updateChart: 0,
        restoreChart: 0,
    }),

    ...mod<_ClipboardGridApi>('Clipboard', {
        copyToClipboard: 0,
        cutToClipboard: 0,
        copySelectedRowsToClipboard: 0,
        copySelectedRangeToClipboard: 0,
        copySelectedRangeDown: 0,
        pasteFromClipboard: 0,
    }),

    ...mod<_ExcelExportGridApi>('ExcelExport', {
        getDataAsExcel: 0,
        exportDataAsExcel: 0,
        getSheetDataForExcel: 0,
        getMultipleSheetsAsExcel: 0,
        exportMultipleSheetsAsExcel: 0,
    }),

    ...mod<_MasterDetailGridApi>('SharedMasterDetail', {
        addDetailGridInfo: 0,
        removeDetailGridInfo: 0,
        getDetailGridInfo: 0,
        forEachDetailGridInfo: 0,
    }),

    ...mod<_ContextMenuGridApi>('ContextMenu', {
        showContextMenu: 0,
    }),

    ...mod<_ColumnChooserGridApi>('ColumnMenu', {
        showColumnChooser: 0,
        hideColumnChooser: 0,
    }),

    ...mod<_CellSelectionGridApi>('CellSelection', {
        getCellRanges: 0,
        addCellRange: 0,
        clearRangeSelection: 0,
        clearCellSelection: 0,
    }),

    ...mod<_RowGroupingGridApi>('SharedRowGrouping', {
        setRowGroupColumns: 0,
        removeRowGroupColumns: 0,
        addRowGroupColumns: 0,
        getRowGroupColumns: 0,
        moveRowGroupColumn: 0,
    }),

    ...mod<_AggregationGridApi<any>>('SharedAggregation', {
        addAggFuncs: 0,
        clearAggFuncs: 0,
        setColumnAggFunc: 0,
    }),

    ...mod<_PivotGridApi<any>>('SharedPivot', {
        isPivotMode: 0,
        getPivotResultColumn: 0,
        setValueColumns: 0,
        getValueColumns: 0,
        removeValueColumns: 0,
        addValueColumns: 0,
        setPivotColumns: 0,
        removePivotColumns: 0,
        addPivotColumns: 0,
        getPivotColumns: 0,
        setPivotResultColumns: 0,
        getPivotResultColumns: 0,
    }),

    ...mod<_ServerSideRowModelGridApi<any>>('ServerSideRowModelApi', {
        getServerSideSelectionState: 0,
        setServerSideSelectionState: 0,
        applyServerSideTransaction: 0,
        applyServerSideTransactionAsync: 0,
        applyServerSideRowData: 0,
        retryServerSideLoads: 0,
        flushServerSideAsyncTransactions: 0,
        refreshServerSide: 0,
        getServerSideGroupLevelState: 0,
    }),

    ...mod<_SideBarGridApi<any>>('SideBar', {
        isSideBarVisible: 0,
        setSideBarVisible: 0,
        setSideBarPosition: 0,
        openToolPanel: 0,
        closeToolPanel: 0,
        getOpenedToolPanel: 0,
        refreshToolPanel: 0,
        isToolPanelShowing: 0,
        getToolPanelInstance: 0,
        getSideBar: 0,
    }),

    ...mod<_StatusBarGridApi>('StatusBar', {
        getStatusPanel: 0,
    }),
};
