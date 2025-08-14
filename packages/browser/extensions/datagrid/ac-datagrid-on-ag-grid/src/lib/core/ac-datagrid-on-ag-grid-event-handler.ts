/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDatagridApi, AcDatagridCell, AcDatagridColumn, AcDatagridRow } from "@autocode-ts/ac-browser";
import { AcDatagridOnAgGridExtension } from "./ac-datagrid-on-ag-grid-extension";
import { CellClickedEvent, GridApi, CellDoubleClickedEvent, CellEditingStartedEvent, CellEditingStoppedEvent, CellFocusedEvent, CellKeyDownEvent, CellMouseDownEvent, FullWidthCellKeyDownEvent, CellMouseOutEvent, CellMouseOverEvent, CellSelectionChangedEvent, CellValueChangedEvent, ColumnHeaderClickedEvent, ColumnMovedEvent, ColumnResizedEvent, ColumnValueChangedEvent, ColumnVisibleEvent, FilterChangedEvent, FilterModifiedEvent, FilterOpenedEvent, PaginationChangedEvent, ComponentStateChangedEvent, RowClickedEvent, RowDataUpdatedEvent, RowDoubleClickedEvent, RowDragEndEvent, RowDragEnterEvent, RowEditingStartedEvent, RowEditingStoppedEvent, RowSelectedEvent, RowValueChangedEvent, SelectionChangedEvent, SortChangedEvent, StateUpdatedEvent, ModelUpdatedEvent } from "ag-grid-community";
import { AcEnumSortOrder } from "@autocode-ts/autocode";

export class AcDatagridOnAgGridEventHandler {
  agGridExtension!: AcDatagridOnAgGridExtension;
  datagridApi!: AcDatagridApi;
  gridApi!: GridApi;
  focusedDatagridCell?: AcDatagridCell;

  constructor({ agGridExtension }: { agGridExtension: AcDatagridOnAgGridExtension }) {
    this.agGridExtension = agGridExtension;
    this.datagridApi = agGridExtension.datagridApi;
    this.gridApi = agGridExtension.gridApi;
  }

  checkEventHasColumnDetail(event: any): boolean {
    let isValid: boolean = false;
    if (event.colDef && event.colDef.field && event.colDef.field != '_ac_internal_actions') {
      isValid = true;
    }
    else if (event.column && event.column.colDef && event.column.colDef.field && event.column.colDef.field != '_ac_internal_actions') {
      isValid = true;
    }
    return isValid;
  }

  registerAgGridListeners() {
    this.gridApi.addEventListener('cellClicked', (event: CellClickedEvent) => {
      if (this.checkEventHasColumnDetail(event)) {
        this.datagridApi.eventHandler.handleCellClick({ datagridCell: this.agGridExtension.getDatagridCellFromEvent({ event: event }), event: event.event as any });
      }
    });
    this.gridApi.addEventListener('cellDoubleClicked', (event: CellDoubleClickedEvent) => {
      if (this.checkEventHasColumnDetail(event)) {
        this.datagridApi.eventHandler.handleCellDoubleClick({ datagridCell: this.agGridExtension.getDatagridCellFromEvent({ event: event }), event: event.event as any });
      }
    });
    this.gridApi.addEventListener('cellEditingStarted', (event: CellEditingStartedEvent) => {
      if (this.checkEventHasColumnDetail(event)) {
        this.datagridApi.eventHandler.handleCellEditingStart({ datagridCell: this.agGridExtension.getDatagridCellFromEvent({ event: event }), event: event.event as any });
      }
    });
    this.gridApi.addEventListener('cellEditingStopped', (event: CellEditingStoppedEvent) => {
      if (this.checkEventHasColumnDetail(event)) {
        this.datagridApi.eventHandler.handleCellEditingStop({ datagridCell: this.agGridExtension.getDatagridCellFromEvent({ event: event }), event: event.event as any });
      }
    });
    this.gridApi.addEventListener('cellKeyDown', (event: CellKeyDownEvent | FullWidthCellKeyDownEvent) => {
      if (this.checkEventHasColumnDetail(event)) {
        this.datagridApi.eventHandler.handleCellKeyDown({ datagridCell: this.agGridExtension.getDatagridCellFromEvent({ event: event }), event: event.event as any });
      }
    });
    this.gridApi.addEventListener('cellMouseDown', (event: CellMouseDownEvent) => {
      if (this.checkEventHasColumnDetail(event)) {
        this.datagridApi.eventHandler.handleCellMouseDown({ datagridCell: this.agGridExtension.getDatagridCellFromEvent({ event: event }), event: event.event as any });
      }
    });
    this.gridApi.addEventListener('cellMouseOut', (event: CellMouseOutEvent) => {
      if (this.checkEventHasColumnDetail(event)) {
        this.datagridApi.eventHandler.handleCellMouseLeave({ datagridCell: this.agGridExtension.getDatagridCellFromEvent({ event: event }), event: event.event as any });
      }
    });
    this.gridApi.addEventListener('cellMouseOver', (event: CellMouseOverEvent) => {
      if (this.checkEventHasColumnDetail(event)) {
        this.datagridApi.eventHandler.handleCellMouseOver({ datagridCell: this.agGridExtension.getDatagridCellFromEvent({ event: event }), event: event.event as any });
      }
    });
    this.gridApi.addEventListener('cellValueChanged', (event: CellValueChangedEvent) => {
      if (this.checkEventHasColumnDetail(event)) {
        this.datagridApi.eventHandler.handleCellValueChange({ datagridCell: this.agGridExtension.getDatagridCellFromEvent({ event: event }), event: event.event as any });
      }
    });
    this.gridApi.addEventListener('columnHeaderClicked', (event: ColumnHeaderClickedEvent) => {
      if (this.checkEventHasColumnDetail(event)) {
        this.datagridApi.eventHandler.handleColumnHeaderClick({ datagridColumn: this.agGridExtension.getDatagridColumnFromEvent({ event: event }) });
      }
    });
    this.gridApi.addEventListener('columnMoved', (event: ColumnMovedEvent) => {
      if (this.checkEventHasColumnDetail(event)) {
        this.datagridApi.eventHandler.handleColumnPositionChange({ datagridColumn: this.agGridExtension.getDatagridColumnFromEvent({ event: event }) });
      }
    });
    this.gridApi.addEventListener('columnResized', (event: ColumnResizedEvent) => {
      if (this.checkEventHasColumnDetail(event)) {
        const datagridColumn: AcDatagridColumn = this.agGridExtension.getDatagridColumnFromEvent({ event: event });
        datagridColumn.width = event.column!.getActualWidth();
        this.datagridApi.eventHandler.handleColumnResize({ datagridColumn: datagridColumn });
      }
    });
    this.gridApi.addEventListener('columnValueChanged', (event: ColumnValueChangedEvent) => {
      if (this.checkEventHasColumnDetail(event)) {
        this.datagridApi.eventHandler.handleColumnDataChange({ datagridColumn: this.agGridExtension.getDatagridColumnFromEvent({ event: event }) });
      }
    });
    this.gridApi.addEventListener('columnVisible', (event: ColumnVisibleEvent) => {
      if (this.checkEventHasColumnDetail(event)) {
        this.datagridApi.eventHandler.handleColumnVisibilityChange({ datagridColumn: this.agGridExtension.getDatagridColumnFromEvent({ event: event }) });
      }
    });
    this.gridApi.addEventListener('modelUpdated', (event: ModelUpdatedEvent) => {
      // const orderedRows: any[] = [];
      // for(const row of this.datagridApi.datagridRows){
      //   row.displayIndex = -1;
      // }
      // const displayedRows:AcDatagridRow[] = [];
      // let index:number = -1;
      // this.gridApi.forEachNodeAfterFilterAndSort(node => {
      //   index++;
      //   const datagridRow = this.datagridApi.getRowById({rowId:node.data[this.agGridExtension.rowKey]})!;
      //   datagridRow.displayIndex = index;
      //   displayedRows.push(datagridRow);
      // });
      // this.datagridApi.dataSource.displayedDatagridRows = displayedRows;
    });
    this.gridApi.addEventListener('paginationChanged', (event: PaginationChangedEvent) => {
      if (this.datagridApi.pagination) {
        this.datagridApi.pagination.activePageSize = this.gridApi.paginationGetPageSize();
        this.datagridApi.pagination.activePage = this.gridApi.paginationGetCurrentPage() + 1;
        this.datagridApi.eventHandler.handlePaginationChange();
      }
    });
    this.gridApi.addEventListener('rowClicked', (event: RowClickedEvent) => {
      this.datagridApi.eventHandler.handleRowClick({ datagridRow: this.agGridExtension.getDatagridRowFromEvent({ event: event }), event: event.event as any });
    });
    this.gridApi.addEventListener('rowDataUpdated', (event: RowDataUpdatedEvent) => {
      this.datagridApi.eventHandler.handleRowDataChange({ datagridRow: this.agGridExtension.getDatagridRowFromEvent({ event: event }) });
    });
    this.gridApi.addEventListener('rowDoubleClicked', (event: RowDoubleClickedEvent) => {
      this.datagridApi.eventHandler.handleRowDoubleClick({ datagridRow: this.agGridExtension.getDatagridRowFromEvent({ event: event }), event: event.event as any });
    });

    this.gridApi.addEventListener('rowEditingStarted', (event: RowEditingStartedEvent) => {
      this.datagridApi.eventHandler.handleRowEditingStart({ datagridRow: this.agGridExtension.getDatagridRowFromEvent({ event: event }), event: event.event as any });
    });
    this.gridApi.addEventListener('rowEditingStopped', (event: RowEditingStoppedEvent) => {
      this.datagridApi.eventHandler.handleRowEditingStop({ datagridRow: this.agGridExtension.getDatagridRowFromEvent({ event: event }), event: event.event as any });
    });
    this.gridApi.addEventListener('rowSelected', (event: RowSelectedEvent) => {
      this.datagridApi.eventHandler.handleRowSelectionChange({ datagridRow: this.agGridExtension.getDatagridRowFromEvent({ event: event }), event: event.event as any });
    });
    this.gridApi.addEventListener('rowValueChanged', (event: RowValueChangedEvent) => {
      this.datagridApi.eventHandler.handleRowDataChange({ datagridRow: this.agGridExtension.getDatagridRowFromEvent({ event: event }), event: event.event as any });
    });
    this.gridApi.addEventListener('sortChanged', (event: SortChangedEvent) => {
      if (event.columns && event.columns.length > 0) {
        const column: any = event.columns[0];
        let order: AcEnumSortOrder = AcEnumSortOrder.None
        if (column.sort == 'asc') {
          order = AcEnumSortOrder.Ascending;
        }
        else if (column.sort == 'desc') {
          order = AcEnumSortOrder.Descending;
        }
        this.datagridApi.sortOrder.addSort({ key: column.colDef.field!, order: order });
        this.datagridApi.eventHandler.handleSortOrderChange();
      }
    });
    // this.gridApi.addEventListener('stateUpdated', (event: StateUpdatedEvent) => {
    //   this.datagridApi.eventHandler.handleStateChange({ datagridCell: this.agGridExtension.getDatagridCellFromEvent({ event: event }), event: event.event as any });
    // });
  }

}
