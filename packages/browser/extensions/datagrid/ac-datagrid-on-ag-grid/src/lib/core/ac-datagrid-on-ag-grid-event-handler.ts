/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDatagridApi, IAcDatagridCell, IAcDatagridColumn } from "@autocode-ts/ac-browser";
import { AcDatagridOnAgGridExtension } from "./ac-datagrid-on-ag-grid-extension";
import { CellClickedEvent, GridApi, CellDoubleClickedEvent, CellEditingStartedEvent, CellEditingStoppedEvent, CellKeyDownEvent, CellMouseDownEvent, FullWidthCellKeyDownEvent, CellMouseOutEvent, CellMouseOverEvent, CellSelectionChangedEvent, CellValueChangedEvent, ColumnHeaderClickedEvent, ColumnMovedEvent, ColumnResizedEvent, ColumnValueChangedEvent, ColumnVisibleEvent, FilterChangedEvent, FilterModifiedEvent, FilterOpenedEvent, PaginationChangedEvent, ComponentStateChangedEvent, RowClickedEvent, RowDataUpdatedEvent, RowDoubleClickedEvent, RowDragEndEvent, RowDragEnterEvent, RowEditingStartedEvent, RowEditingStoppedEvent, RowSelectedEvent, RowValueChangedEvent, SortChangedEvent, ModelUpdatedEvent } from "ag-grid-community";
import { AcEnumSortOrder, AcLogger } from "@autocode-ts/autocode";

export class AcDatagridOnAgGridEventHandler {
  agGridExtension!: AcDatagridOnAgGridExtension;
  datagridApi!: AcDatagridApi;
  gridApi!: GridApi;
  focusedDatagridCell?: IAcDatagridCell;
  ignoreEvents:boolean = false;
  logger!:AcLogger;

  constructor({ agGridExtension }: { agGridExtension: AcDatagridOnAgGridExtension }) {
    this.logger = agGridExtension.logger;
    this.logger.log("[AcDatagridOnAgGridEventHandler] Constructor: Logger assigned.");
    this.logger.log("[AcDatagridOnAgGridEventHandler] Constructor: Starting initialization.");
    this.agGridExtension = agGridExtension;
    this.logger.log("[AcDatagridOnAgGridEventHandler] Constructor: AgGridExtension assigned.");
    this.datagridApi = agGridExtension.datagridApi;
    this.logger.log("[AcDatagridOnAgGridEventHandler] Constructor: DatagridApi assigned.");
    this.gridApi = agGridExtension.gridApi;
    this.logger.log("[AcDatagridOnAgGridEventHandler] Constructor: GridApi assigned. Exiting constructor.");
  }

  checkEventHasColumnDetail(event: any): boolean {
    this.logger.log(`[AcDatagridOnAgGridEventHandler] checkEventHasColumnDetail: Entering with event.colDef=${!!event.colDef}, event.column=${!!event.column}.`);
    let isValid: boolean = false;
    if (event.colDef && event.colDef.field && event.colDef.field != '_ac_internal_actions') {
      isValid = true;
      this.logger.log(`[AcDatagridOnAgGridEventHandler] checkEventHasColumnDetail: Valid from colDef, field=${event.colDef.field}.`);
    }
    else if (event.column && event.column.colDef && event.column.colDef.field && event.column.colDef.field != '_ac_internal_actions') {
      isValid = true;
      this.logger.log(`[AcDatagridOnAgGridEventHandler] checkEventHasColumnDetail: Valid from column, field=${event.column.colDef.field}.`);
    }
    else {
      this.logger.log(`[AcDatagridOnAgGridEventHandler] checkEventHasColumnDetail: Invalid event, no valid column detail.`);
    }
    this.logger.log(`[AcDatagridOnAgGridEventHandler] checkEventHasColumnDetail: Exiting with isValid=${isValid}.`);
    return isValid;
  }

  registerAgGridListeners() {
    this.logger.log("[AcDatagridOnAgGridEventHandler] registerAgGridListeners: Starting registration of AG Grid event listeners.");
    this.gridApi.addEventListener('cellClicked', (event: CellClickedEvent) => {
      this.logger.log("[AcDatagridOnAgGridEventHandler] cellClicked: Event triggered.");
      if (this.checkEventHasColumnDetail(event) && !this.ignoreEvents) {
        this.logger.log("[AcDatagridOnAgGridEventHandler] cellClicked: Event valid and not ignored.");
        const datagridCell = this.agGridExtension.getDatagridCellFromEvent({ event: event });
        if(datagridCell){
          this.logger.log("[AcDatagridOnAgGridEventHandler] cellClicked: DatagridCell found, handling cell click.");
          this.datagridApi.eventHandler.handleCellClick({ datagridCell , event: event.event as any });
        } else {
          this.logger.log("[AcDatagridOnAgGridEventHandler] cellClicked: No DatagridCell found, skipping handler.");
        }
      } else {
        this.logger.log(`[AcDatagridOnAgGridEventHandler] cellClicked: Event invalid or ignored (valid=${this.checkEventHasColumnDetail(event)}, ignore=${this.ignoreEvents}).`);
      }
    });
    this.logger.log("[AcDatagridOnAgGridEventHandler] registerAgGridListeners: Registered cellClicked listener.");
    this.gridApi.addEventListener('cellDoubleClicked', (event: CellDoubleClickedEvent) => {
      this.logger.log("[AcDatagridOnAgGridEventHandler] cellDoubleClicked: Event triggered.");
      if (this.checkEventHasColumnDetail(event) && !this.ignoreEvents) {
        this.logger.log("[AcDatagridOnAgGridEventHandler] cellDoubleClicked: Event valid and not ignored.");
        const datagridCell = this.agGridExtension.getDatagridCellFromEvent({ event: event });
        if(datagridCell){
          this.logger.log("[AcDatagridOnAgGridEventHandler] cellDoubleClicked: DatagridCell found, handling cell double click.");
          this.datagridApi.eventHandler.handleCellDoubleClick({ datagridCell , event: event.event as any });
        } else {
          this.logger.log("[AcDatagridOnAgGridEventHandler] cellDoubleClicked: No DatagridCell found, skipping handler.");
        }
      } else {
        this.logger.log(`[AcDatagridOnAgGridEventHandler] cellDoubleClicked: Event invalid or ignored (valid=${this.checkEventHasColumnDetail(event)}, ignore=${this.ignoreEvents}).`);
      }
    });
    this.logger.log("[AcDatagridOnAgGridEventHandler] registerAgGridListeners: Registered cellDoubleClicked listener.");
    this.gridApi.addEventListener('cellEditingStarted', (event: CellEditingStartedEvent) => {
      this.logger.log("[AcDatagridOnAgGridEventHandler] cellEditingStarted: Event triggered.");
      if (this.checkEventHasColumnDetail(event) && !this.ignoreEvents) {
        this.logger.log("[AcDatagridOnAgGridEventHandler] cellEditingStarted: Event valid and not ignored.");
        const datagridCell = this.agGridExtension.getDatagridCellFromEvent({ event: event });
        if(datagridCell){
          this.logger.log("[AcDatagridOnAgGridEventHandler] cellEditingStarted: DatagridCell found, handling editing start.");
          this.datagridApi.eventHandler.handleCellEditingStart({ datagridCell , event: event.event as any });
        } else {
          this.logger.log("[AcDatagridOnAgGridEventHandler] cellEditingStarted: No DatagridCell found, skipping handler.");
        }
      } else {
        this.logger.log(`[AcDatagridOnAgGridEventHandler] cellEditingStarted: Event invalid or ignored (valid=${this.checkEventHasColumnDetail(event)}, ignore=${this.ignoreEvents}).`);
      }
    });
    this.logger.log("[AcDatagridOnAgGridEventHandler] registerAgGridListeners: Registered cellEditingStarted listener.");
    this.gridApi.addEventListener('cellEditingStopped', (event: CellEditingStoppedEvent) => {
      this.logger.log("[AcDatagridOnAgGridEventHandler] cellEditingStopped: Event triggered.");
      if (this.checkEventHasColumnDetail(event) && !this.ignoreEvents) {
        this.logger.log("[AcDatagridOnAgGridEventHandler] cellEditingStopped: Event valid and not ignored.");
        const datagridCell = this.agGridExtension.getDatagridCellFromEvent({ event: event });
        if(datagridCell){
          this.logger.log("[AcDatagridOnAgGridEventHandler] cellEditingStopped: DatagridCell found, handling editing stop.");
          this.datagridApi.eventHandler.handleCellEditingStop({ datagridCell , event: event.event as any });
        } else {
          this.logger.log("[AcDatagridOnAgGridEventHandler] cellEditingStopped: No DatagridCell found, skipping handler.");
        }
      } else {
        this.logger.log(`[AcDatagridOnAgGridEventHandler] cellEditingStopped: Event invalid or ignored (valid=${this.checkEventHasColumnDetail(event)}, ignore=${this.ignoreEvents}).`);
      }
    });
    this.logger.log("[AcDatagridOnAgGridEventHandler] registerAgGridListeners: Registered cellEditingStopped listener.");
    this.gridApi.addEventListener('cellKeyDown', (event: CellKeyDownEvent | FullWidthCellKeyDownEvent) => {
      this.logger.log("[AcDatagridOnAgGridEventHandler] cellKeyDown: Event triggered.");
      if (this.checkEventHasColumnDetail(event) && !this.ignoreEvents) {
        this.logger.log("[AcDatagridOnAgGridEventHandler] cellKeyDown: Event valid and not ignored.");
        const datagridCell = this.agGridExtension.getDatagridCellFromEvent({ event: event });
        if(datagridCell){
          this.logger.log("[AcDatagridOnAgGridEventHandler] cellKeyDown: DatagridCell found, handling key down.");
          this.datagridApi.eventHandler.handleCellKeyDown({ datagridCell , event: event.event as any });
        } else {
          this.logger.log("[AcDatagridOnAgGridEventHandler] cellKeyDown: No DatagridCell found, skipping handler.");
        }
      } else {
        this.logger.log(`[AcDatagridOnAgGridEventHandler] cellKeyDown: Event invalid or ignored (valid=${this.checkEventHasColumnDetail(event)}, ignore=${this.ignoreEvents}).`);
      }
    });
    this.logger.log("[AcDatagridOnAgGridEventHandler] registerAgGridListeners: Registered cellKeyDown listener.");
    this.gridApi.addEventListener('cellMouseDown', (event: CellMouseDownEvent) => {
      this.logger.log("[AcDatagridOnAgGridEventHandler] cellMouseDown: Event triggered.");
      if (this.checkEventHasColumnDetail(event) && !this.ignoreEvents) {
        this.logger.log("[AcDatagridOnAgGridEventHandler] cellMouseDown: Event valid and not ignored.");
        const datagridCell = this.agGridExtension.getDatagridCellFromEvent({ event: event });
        if(datagridCell){
          this.logger.log("[AcDatagridOnAgGridEventHandler] cellMouseDown: DatagridCell found, handling mouse down.");
          this.datagridApi.eventHandler.handleCellMouseDown({ datagridCell , event: event.event as any });
        } else {
          this.logger.log("[AcDatagridOnAgGridEventHandler] cellMouseDown: No DatagridCell found, skipping handler.");
        }
      } else {
        this.logger.log(`[AcDatagridOnAgGridEventHandler] cellMouseDown: Event invalid or ignored (valid=${this.checkEventHasColumnDetail(event)}, ignore=${this.ignoreEvents}).`);
      }
    });
    this.logger.log("[AcDatagridOnAgGridEventHandler] registerAgGridListeners: Registered cellMouseDown listener.");
    this.gridApi.addEventListener('cellMouseOut', (event: CellMouseOutEvent) => {
      this.logger.log("[AcDatagridOnAgGridEventHandler] cellMouseOut: Event triggered.");
      if (this.checkEventHasColumnDetail(event) && !this.ignoreEvents) {
        this.logger.log("[AcDatagridOnAgGridEventHandler] cellMouseOut: Event valid and not ignored.");
        const datagridCell = this.agGridExtension.getDatagridCellFromEvent({ event: event });
        if(datagridCell){
          this.logger.log("[AcDatagridOnAgGridEventHandler] cellMouseOut: DatagridCell found, handling mouse leave.");
          this.datagridApi.eventHandler.handleCellMouseLeave({ datagridCell , event: event.event as any });
        } else {
          this.logger.log("[AcDatagridOnAgGridEventHandler] cellMouseOut: No DatagridCell found, skipping handler.");
        }
      } else {
        this.logger.log(`[AcDatagridOnAgGridEventHandler] cellMouseOut: Event invalid or ignored (valid=${this.checkEventHasColumnDetail(event)}, ignore=${this.ignoreEvents}).`);
      }
    });
    this.logger.log("[AcDatagridOnAgGridEventHandler] registerAgGridListeners: Registered cellMouseOut listener.");
    this.gridApi.addEventListener('cellMouseOver', (event: CellMouseOverEvent) => {
      this.logger.log("[AcDatagridOnAgGridEventHandler] cellMouseOver: Event triggered.");
      if (this.checkEventHasColumnDetail(event) && !this.ignoreEvents) {
        this.logger.log("[AcDatagridOnAgGridEventHandler] cellMouseOver: Event valid and not ignored.");
        const datagridCell = this.agGridExtension.getDatagridCellFromEvent({ event: event });
        if(datagridCell){
          this.logger.log("[AcDatagridOnAgGridEventHandler] cellMouseOver: DatagridCell found, handling mouse over.");
          this.datagridApi.eventHandler.handleCellMouseOver({ datagridCell , event: event.event as any });
        } else {
          this.logger.log("[AcDatagridOnAgGridEventHandler] cellMouseOver: No DatagridCell found, skipping handler.");
        }
      } else {
        this.logger.log(`[AcDatagridOnAgGridEventHandler] cellMouseOver: Event invalid or ignored (valid=${this.checkEventHasColumnDetail(event)}, ignore=${this.ignoreEvents}).`);
      }
    });
    this.logger.log("[AcDatagridOnAgGridEventHandler] registerAgGridListeners: Registered cellMouseOver listener.");
    this.gridApi.addEventListener('cellValueChanged', (event: CellValueChangedEvent) => {
      this.logger.log("[AcDatagridOnAgGridEventHandler] cellValueChanged: Event triggered.");
      if (this.checkEventHasColumnDetail(event) && !this.ignoreEvents) {
        this.logger.log("[AcDatagridOnAgGridEventHandler] cellValueChanged: Event valid and not ignored.");
        const datagridCell = this.agGridExtension.getDatagridCellFromEvent({ event: event });
        if(datagridCell){
          this.logger.log("[AcDatagridOnAgGridEventHandler] cellValueChanged: DatagridCell found, handling value change.");
          this.datagridApi.eventHandler.handleCellValueChange({ datagridCell , event: event.event as any });
        } else {
          this.logger.log("[AcDatagridOnAgGridEventHandler] cellValueChanged: No DatagridCell found, skipping handler.");
        }
      } else {
        this.logger.log(`[AcDatagridOnAgGridEventHandler] cellValueChanged: Event invalid or ignored (valid=${this.checkEventHasColumnDetail(event)}, ignore=${this.ignoreEvents}).`);
      }
    });
    this.logger.log("[AcDatagridOnAgGridEventHandler] registerAgGridListeners: Registered cellValueChanged listener.");
    this.gridApi.addEventListener('columnHeaderClicked', (event: ColumnHeaderClickedEvent) => {
      this.logger.log("[AcDatagridOnAgGridEventHandler] columnHeaderClicked: Event triggered.");
      if (this.checkEventHasColumnDetail(event) && !this.ignoreEvents) {
        this.logger.log("[AcDatagridOnAgGridEventHandler] columnHeaderClicked: Event valid and not ignored.");
        const datagridColumn = this.agGridExtension.getDatagridColumnFromEvent({ event: event });
        this.logger.log("[AcDatagridOnAgGridEventHandler] columnHeaderClicked: DatagridColumn found, handling header click.");
        this.datagridApi.eventHandler.handleColumnHeaderClick({ datagridColumn: datagridColumn });
      } else {
        this.logger.log(`[AcDatagridOnAgGridEventHandler] columnHeaderClicked: Event invalid or ignored (valid=${this.checkEventHasColumnDetail(event)}, ignore=${this.ignoreEvents}).`);
      }
    });
    this.logger.log("[AcDatagridOnAgGridEventHandler] registerAgGridListeners: Registered columnHeaderClicked listener.");
    this.gridApi.addEventListener('columnMoved', (event: ColumnMovedEvent) => {
      this.logger.log("[AcDatagridOnAgGridEventHandler] columnMoved: Event triggered.");
      if (this.checkEventHasColumnDetail(event) && !this.ignoreEvents) {
        this.logger.log("[AcDatagridOnAgGridEventHandler] columnMoved: Event valid and not ignored.");
        const datagridColumn = this.agGridExtension.getDatagridColumnFromEvent({ event: event });
        this.logger.log("[AcDatagridOnAgGridEventHandler] columnMoved: DatagridColumn found, handling position change.");
        this.datagridApi.eventHandler.handleColumnPositionChange({ datagridColumn: datagridColumn });
      } else {
        this.logger.log(`[AcDatagridOnAgGridEventHandler] columnMoved: Event invalid or ignored (valid=${this.checkEventHasColumnDetail(event)}, ignore=${this.ignoreEvents}).`);
      }
    });
    this.logger.log("[AcDatagridOnAgGridEventHandler] registerAgGridListeners: Registered columnMoved listener.");
    this.gridApi.addEventListener('columnResized', (event: ColumnResizedEvent) => {
      this.logger.log("[AcDatagridOnAgGridEventHandler] columnResized: Event triggered.");
      if (this.checkEventHasColumnDetail(event) && !this.ignoreEvents) {
        this.logger.log("[AcDatagridOnAgGridEventHandler] columnResized: Event valid and not ignored.");
        const datagridColumn: IAcDatagridColumn = this.agGridExtension.getDatagridColumnFromEvent({ event: event });
        datagridColumn.width = event.column!.getActualWidth();
        this.logger.log(`[AcDatagridOnAgGridEventHandler] columnResized: Updated width to ${datagridColumn.width}, handling resize.`);
        this.datagridApi.eventHandler.handleColumnResize({ datagridColumn: datagridColumn });
      } else {
        this.logger.log(`[AcDatagridOnAgGridEventHandler] columnResized: Event invalid or ignored (valid=${this.checkEventHasColumnDetail(event)}, ignore=${this.ignoreEvents}).`);
      }
    });
    this.logger.log("[AcDatagridOnAgGridEventHandler] registerAgGridListeners: Registered columnResized listener.");
    this.gridApi.addEventListener('columnValueChanged', (event: ColumnValueChangedEvent) => {
      this.logger.log("[AcDatagridOnAgGridEventHandler] columnValueChanged: Event triggered.");
      if (this.checkEventHasColumnDetail(event) && !this.ignoreEvents) {
        this.logger.log("[AcDatagridOnAgGridEventHandler] columnValueChanged: Event valid and not ignored.");
        const datagridColumn = this.agGridExtension.getDatagridColumnFromEvent({ event: event });
        this.logger.log("[AcDatagridOnAgGridEventHandler] columnValueChanged: DatagridColumn found, handling data change.");
        this.datagridApi.eventHandler.handleColumnDataChange({ datagridColumn: datagridColumn });
      } else {
        this.logger.log(`[AcDatagridOnAgGridEventHandler] columnValueChanged: Event invalid or ignored (valid=${this.checkEventHasColumnDetail(event)}, ignore=${this.ignoreEvents}).`);
      }
    });
    this.logger.log("[AcDatagridOnAgGridEventHandler] registerAgGridListeners: Registered columnValueChanged listener.");
    this.gridApi.addEventListener('columnVisible', (event: ColumnVisibleEvent) => {
      this.logger.log("[AcDatagridOnAgGridEventHandler] columnVisible: Event triggered.");
      if (this.checkEventHasColumnDetail(event) && !this.ignoreEvents) {
        this.logger.log("[AcDatagridOnAgGridEventHandler] columnVisible: Event valid and not ignored.");
        const datagridColumn = this.agGridExtension.getDatagridColumnFromEvent({ event: event });
        this.logger.log("[AcDatagridOnAgGridEventHandler] columnVisible: DatagridColumn found, handling visibility change.");
        this.datagridApi.eventHandler.handleColumnVisibilityChange({ datagridColumn: datagridColumn });
      } else {
        this.logger.log(`[AcDatagridOnAgGridEventHandler] columnVisible: Event invalid or ignored (valid=${this.checkEventHasColumnDetail(event)}, ignore=${this.ignoreEvents}).`);
      }
    });
    this.logger.log("[AcDatagridOnAgGridEventHandler] registerAgGridListeners: Registered columnVisible listener.");
    this.gridApi.addEventListener('modelUpdated', (event: ModelUpdatedEvent) => {
      this.logger.log("[AcDatagridOnAgGridEventHandler] modelUpdated: Event triggered.");
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
      this.logger.log("[AcDatagridOnAgGridEventHandler] modelUpdated: Handling skipped due to commented code.");
    });
    this.logger.log("[AcDatagridOnAgGridEventHandler] registerAgGridListeners: Registered modelUpdated listener.");
    this.gridApi.addEventListener('paginationChanged', (event: PaginationChangedEvent) => {
      this.logger.log("[AcDatagridOnAgGridEventHandler] paginationChanged: Event triggered.");
      if (this.datagridApi.pagination && !this.ignoreEvents) {
        this.datagridApi.pagination.activePageSize = this.gridApi.paginationGetPageSize();
        this.datagridApi.pagination.activePage = this.gridApi.paginationGetCurrentPage() + 1;
        this.logger.log(`[AcDatagridOnAgGridEventHandler] paginationChanged: Updated pagination - pageSize=${this.datagridApi.pagination.activePageSize}, activePage=${this.datagridApi.pagination.activePage}.`);
        this.datagridApi.eventHandler.handlePaginationChange();
        this.logger.log("[AcDatagridOnAgGridEventHandler] paginationChanged: Handled pagination change.");
      } else {
        this.logger.log(`[AcDatagridOnAgGridEventHandler] paginationChanged: Skipped - no pagination or ignored (pagination=${!!this.datagridApi.pagination}, ignore=${this.ignoreEvents}).`);
      }
    });
    this.logger.log("[AcDatagridOnAgGridEventHandler] registerAgGridListeners: Registered paginationChanged listener.");
    this.gridApi.addEventListener('rowClicked', (event: RowClickedEvent) => {
      this.logger.log("[AcDatagridOnAgGridEventHandler] rowClicked: Event triggered.");
      if (!this.ignoreEvents) {
        this.logger.log("[AcDatagridOnAgGridEventHandler] rowClicked: Event not ignored.");
        const datagridRow = this.agGridExtension.getDatagridRowFromEvent({ event: event });
        if(datagridRow){
          this.logger.log("[AcDatagridOnAgGridEventHandler] rowClicked: DatagridRow found, handling row click.");
          this.datagridApi.eventHandler.handleRowClick({ datagridRow, event: event.event as any });
        } else {
          this.logger.log("[AcDatagridOnAgGridEventHandler] rowClicked: No DatagridRow found, skipping handler.");
        }
      } else {
        this.logger.log(`[AcDatagridOnAgGridEventHandler] rowClicked: Event ignored (ignore=${this.ignoreEvents}).`);
      }
    });
    this.logger.log("[AcDatagridOnAgGridEventHandler] registerAgGridListeners: Registered rowClicked listener.");
    this.gridApi.addEventListener('rowDataUpdated', (event: RowDataUpdatedEvent) => {
      this.logger.log("[AcDatagridOnAgGridEventHandler] rowDataUpdated: Event triggered.");
      if (!this.ignoreEvents) {
        this.logger.log("[AcDatagridOnAgGridEventHandler] rowDataUpdated: Event not ignored.");
        const datagridRow = this.agGridExtension.getDatagridRowFromEvent({ event: event });
        if(datagridRow){
          this.logger.log("[AcDatagridOnAgGridEventHandler] rowDataUpdated: DatagridRow found, handling data change.");
          this.datagridApi.eventHandler.handleRowDataChange({ datagridRow, event: event as any });
        } else {
          this.logger.log("[AcDatagridOnAgGridEventHandler] rowDataUpdated: No DatagridRow found, skipping handler.");
        }
      } else {
        this.logger.log(`[AcDatagridOnAgGridEventHandler] rowDataUpdated: Event ignored (ignore=${this.ignoreEvents}).`);
      }
    });
    this.logger.log("[AcDatagridOnAgGridEventHandler] registerAgGridListeners: Registered rowDataUpdated listener.");
    this.gridApi.addEventListener('rowDoubleClicked', (event: RowDoubleClickedEvent) => {
      this.logger.log("[AcDatagridOnAgGridEventHandler] rowDoubleClicked: Event triggered.");
      if (!this.ignoreEvents) {
        this.logger.log("[AcDatagridOnAgGridEventHandler] rowDoubleClicked: Event not ignored.");
        const datagridRow = this.agGridExtension.getDatagridRowFromEvent({ event: event });
        if(datagridRow){
          this.logger.log("[AcDatagridOnAgGridEventHandler] rowDoubleClicked: DatagridRow found, handling row double click.");
          this.datagridApi.eventHandler.handleRowDoubleClick({ datagridRow, event: event.event as any });
        } else {
          this.logger.log("[AcDatagridOnAgGridEventHandler] rowDoubleClicked: No DatagridRow found, skipping handler.");
        }
      } else {
        this.logger.log(`[AcDatagridOnAgGridEventHandler] rowDoubleClicked: Event ignored (ignore=${this.ignoreEvents}).`);
      }
    });
    this.logger.log("[AcDatagridOnAgGridEventHandler] registerAgGridListeners: Registered rowDoubleClicked listener.");
    this.gridApi.addEventListener('rowEditingStarted', (event: RowEditingStartedEvent) => {
      this.logger.log("[AcDatagridOnAgGridEventHandler] rowEditingStarted: Event triggered.");
      if (!this.ignoreEvents) {
        this.logger.log("[AcDatagridOnAgGridEventHandler] rowEditingStarted: Event not ignored.");
        const datagridRow = this.agGridExtension.getDatagridRowFromEvent({ event: event });
        if(datagridRow){
          this.logger.log("[AcDatagridOnAgGridEventHandler] rowEditingStarted: DatagridRow found, handling editing start.");
          this.datagridApi.eventHandler.handleRowEditingStart({ datagridRow, event: event.event as any });
        } else {
          this.logger.log("[AcDatagridOnAgGridEventHandler] rowEditingStarted: No DatagridRow found, skipping handler.");
        }
      } else {
        this.logger.log(`[AcDatagridOnAgGridEventHandler] rowEditingStarted: Event ignored (ignore=${this.ignoreEvents}).`);
      }
    });
    this.logger.log("[AcDatagridOnAgGridEventHandler] registerAgGridListeners: Registered rowEditingStarted listener.");
    this.gridApi.addEventListener('rowEditingStopped', (event: RowEditingStoppedEvent) => {
      this.logger.log("[AcDatagridOnAgGridEventHandler] rowEditingStopped: Event triggered.");
      if (!this.ignoreEvents) {
        this.logger.log("[AcDatagridOnAgGridEventHandler] rowEditingStopped: Event not ignored.");
        const datagridRow = this.agGridExtension.getDatagridRowFromEvent({ event: event });
        if(datagridRow){
          this.logger.log("[AcDatagridOnAgGridEventHandler] rowEditingStopped: DatagridRow found, handling editing stop.");
          this.datagridApi.eventHandler.handleRowEditingStop({ datagridRow, event: event.event as any });
        } else {
          this.logger.log("[AcDatagridOnAgGridEventHandler] rowEditingStopped: No DatagridRow found, skipping handler.");
        }
      } else {
        this.logger.log(`[AcDatagridOnAgGridEventHandler] rowEditingStopped: Event ignored (ignore=${this.ignoreEvents}).`);
      }
    });
    this.logger.log("[AcDatagridOnAgGridEventHandler] registerAgGridListeners: Registered rowEditingStopped listener.");
    this.gridApi.addEventListener('rowSelected', (event: RowSelectedEvent) => {
      this.logger.log("[AcDatagridOnAgGridEventHandler] rowSelected: Event triggered.");
      if (!this.ignoreEvents) {
        this.logger.log("[AcDatagridOnAgGridEventHandler] rowSelected: Event not ignored.");
        const datagridRow = this.agGridExtension.getDatagridRowFromEvent({ event: event });
        if(datagridRow){
          this.logger.log("[AcDatagridOnAgGridEventHandler] rowSelected: DatagridRow found, handling selection change.");
          this.datagridApi.eventHandler.handleRowSelectionChange({ datagridRow, event: event.event as any });
        } else {
          this.logger.log("[AcDatagridOnAgGridEventHandler] rowSelected: No DatagridRow found, skipping handler.");
        }
      } else {
        this.logger.log(`[AcDatagridOnAgGridEventHandler] rowSelected: Event ignored (ignore=${this.ignoreEvents}).`);
      }
    });
    this.logger.log("[AcDatagridOnAgGridEventHandler] registerAgGridListeners: Registered rowSelected listener.");
    this.gridApi.addEventListener('rowValueChanged', (event: RowValueChangedEvent) => {
      this.logger.log("[AcDatagridOnAgGridEventHandler] rowValueChanged: Event triggered.");
      if (!this.ignoreEvents) {
        this.logger.log("[AcDatagridOnAgGridEventHandler] rowValueChanged: Event not ignored.");
        const datagridRow = this.agGridExtension.getDatagridRowFromEvent({ event: event });
        if(datagridRow){
          this.logger.log("[AcDatagridOnAgGridEventHandler] rowValueChanged: DatagridRow found, handling data change.");
          this.datagridApi.eventHandler.handleRowDataChange({ datagridRow, event: event.event as any });
        } else {
          this.logger.log("[AcDatagridOnAgGridEventHandler] rowValueChanged: No DatagridRow found, skipping handler.");
        }
      } else {
        this.logger.log(`[AcDatagridOnAgGridEventHandler] rowValueChanged: Event ignored (ignore=${this.ignoreEvents}).`);
      }
    });
    this.logger.log("[AcDatagridOnAgGridEventHandler] registerAgGridListeners: Registered rowValueChanged listener.");
    this.gridApi.addEventListener('sortChanged', (event: SortChangedEvent) => {
      this.logger.log("[AcDatagridOnAgGridEventHandler] sortChanged: Event triggered.");
      if (event.columns && event.columns.length > 0  && !this.ignoreEvents) {
        this.logger.log(`[AcDatagridOnAgGridEventHandler] sortChanged: Columns changed, count=${event.columns.length}.`);
        const column: any = event.columns[0];
        let order: AcEnumSortOrder = AcEnumSortOrder.None
        if (column.sort == 'asc') {
          order = AcEnumSortOrder.Ascending;
          this.logger.log("[AcDatagridOnAgGridEventHandler] sortChanged: Mapped sort 'asc' to Ascending.");
        }
        else if (column.sort == 'desc') {
          order = AcEnumSortOrder.Descending;
          this.logger.log("[AcDatagridOnAgGridEventHandler] sortChanged: Mapped sort 'desc' to Descending.");
        } else {
          this.logger.log(`[AcDatagridOnAgGridEventHandler] sortChanged: Unknown sort ${column.sort}, defaulting to None.`);
        }
        this.datagridApi.dataManager.sortOrder.addSort({ key: column.colDef.field!, order: order });
        this.logger.log(`[AcDatagridOnAgGridEventHandler] sortChanged: Added sort for field=${column.colDef.field!}, order=${order}.`);
        this.datagridApi.eventHandler.handleSortOrderChange();
        this.logger.log("[AcDatagridOnAgGridEventHandler] sortChanged: Handled sort order change.");
      } else {
        this.logger.log(`[AcDatagridOnAgGridEventHandler] sortChanged: Skipped - no columns or ignored (columns=${!!event.columns?.length}, ignore=${this.ignoreEvents}).`);
      }
    });
    this.logger.log("[AcDatagridOnAgGridEventHandler] registerAgGridListeners: Registered sortChanged listener.");
    // this.gridApi.addEventListener('stateUpdated', (event: StateUpdatedEvent) => {
    //   this.datagridApi.eventHandler.handleStateChange({ datagridCell: this.agGridExtension.getDatagridCellFromEvent({ event: event }), event: event.event as any });
    // });
    this.logger.log("[AcDatagridOnAgGridEventHandler] registerAgGridListeners: Skipped stateUpdated listener (commented).");
    // this.gridApi.addEventListener('firstDataRendered', () => {
    //   new GlobalColumnRenderer(this.agGridExtension.agGridElement.parentElement!);
    // });
    this.logger.log("[AcDatagridOnAgGridEventHandler] registerAgGridListeners: Skipped firstDataRendered listener (commented).");
    this.logger.log("[AcDatagridOnAgGridEventHandler] registerAgGridListeners: All listeners registered. Exiting.");
  }

}
