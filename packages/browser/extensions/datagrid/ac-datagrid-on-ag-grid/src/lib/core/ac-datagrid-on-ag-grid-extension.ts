/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDatagridExtension, AcEnumDatagridColumnDataType, AcEnumDatagridExtension, AcEnumDatagridHook, IAcDatagridColumnDefinition, AcDatagridColumn, IAcDatagridExtension, IAcDatagridExtensionEnabledHookArgs, AcDatagridRowNumbersExtension, AcEnumDatagridRowNumbersHook, AcDatagridColumnsCustomizerExtension, AcEnumDatagridColumnsCustomizerHook, AcDatagridColumnDraggingExtension, AcEnumDatagridColumnDraggingHook, IAcDatagridColumnsCustomizerHookArgs, AcDatagridDataExportXlsxExtension, AcEnumDatagridDataExportXlsxHook, IAcDatagridRowFocusHookArgs, IAcDatagridRowUpdateHookArgs, IAcDatagridRowDeleteHookArgs, AcDatagridApi, AcDatagridCell, AcDatagridRow, IAcDatagridDataSourceTypeChangeHookArgs, AcEnumDataSourceType, IAcDatagridBeforeGetOnDemandDataHookArgs, IAcDatagridGetOnDemandDataSuccessCallbackHookArgs, AcDatagridCssClassName, AcDatagridAfterRowsFooterExtension, IAcDatagridDataExportXlsxExportCallHookArgs, IAcDatagridRowAddHookArgs, AcDatagridCellElement } from '@autocode-ts/ac-browser';
import { ColDef, createGrid, ModuleRegistry, AllCommunityModule, GridApi, GetRowIdParams, GridOptions, IRowNode, IServerSideGetRowsParams, RowModelType, IServerSideDatasource, SuppressKeyboardEventParams, ICellRendererParams } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { AcDatagridRowSelectionExtensionOnAgGrid } from './ac-datagrid-row-selection-extension-on-ag-grid';
import { IAcDatagriOnAgGridColDefsChangeHookArgs } from '../interfaces/ac-datagrid-on-ag-grid-col-defs-set-hook-args.interface';
import { AcEnumDatagridOnAgGridHook } from '../enums/ac-enum-datagrid-on-ag-grid-hook.enum';
import { IAcDatagriOnAgGridDataChangeHookArgs } from '../interfaces/ac-datagrid-on-ag-grid-data-set-hook-args.interface';
import { AcDatagridTreeTableExtensionOnAgGrid } from './ac-datagrid-tree-table-extension-on-ag-grid';
import { AcDatagridRowDraggingExtensionOnAgGrid } from './ac-datagrid-row-dragging-extension-on-ag-grid';
import { IAcDatagriOnAgGridRowAddHookArgs } from '../interfaces/ac-datagrid-on-ag-grid-row-add-hook-args.interface';
import { IAcDatagriOnAgGridRowUpdateHookArgs } from '../interfaces/ac-datagrid-on-ag-grid-row-update-hook-args.interface';
import { AcEnumConditionOperator, AcEnumLogicalOperator, AcFilterGroup, AcLogger, AcSortOrder, IAcOnDemandRequestArgs } from '@autocode-ts/autocode';
import { AcDatagridOnAgGridEventHandler } from './ac-datagrid-on-ag-grid-event-handler';
import { AcDatagridOnAgGridCell } from '../elements/ac-datagrid-on-ag-grid-cell.element';
import { stringEqualsIgnoreCase } from '@autocode-ts/ac-extensions';
import { AC_DATAGRID_AGGRID_DEFAULT_OPTIONS } from '../const/ac-datagrid-aggrid-default-options.const';

export class AcDatagridOnAgGridExtension extends AcDatagridExtension {
  agGridElement = document.createElement('div');
  agGridEventHandler!: AcDatagridOnAgGridEventHandler;
  allowColumnDragging: boolean = false;
  colDefs: ColDef[] = [];
  data: any[] = [];
  gridApi!: GridApi;
  gridOptions: GridOptions;
  isClientSideData: boolean = true;
  navigate: boolean = true;
  onDemandDataSource: IServerSideDatasource = {
    getRows: (params: IServerSideGetRowsParams) => {
      this.onDemandRequestParams = params;
      this.datagridApi.dataSource.getData();
    }
  };
  onDemandRequestParams?: IServerSideGetRowsParams;
  rowKey: string = "__ac_row_id__";
  rowParentKey: string = "__ac_row_parent_id__";

  afterRowsFooterExtension?: AcDatagridAfterRowsFooterExtension;
  columnsCustomizerExtension?: AcDatagridColumnsCustomizerExtension;
  columnDraggingExtension?: AcDatagridColumnDraggingExtension;
  dataExportXlsxExtension?: AcDatagridDataExportXlsxExtension;
  rowNumbersExtension?: AcDatagridRowNumbersExtension;

  logger:AcLogger = new AcLogger({logMessages:false});

  constructor() {
    super();
    this.logger.log("[AcDatagridOnAgGridExtension] Constructor: Starting initialization.");
    this.registerModules();
    this.logger.log("[AcDatagridOnAgGridExtension] Constructor: Modules registered.");
    this.gridOptions = { ...AC_DATAGRID_AGGRID_DEFAULT_OPTIONS };
    this.logger.log("[AcDatagridOnAgGridExtension] Constructor: Grid options initialized.");
    this.gridOptions.getRowId = (params: GetRowIdParams) => {
      return params.data[this.rowKey];
    };
    this.logger.log("[AcDatagridOnAgGridExtension] Constructor: Row ID getter configured. Exiting constructor.");
  }

  private getAgDataTypeFromAcDataType(dataType: any) {
    this.logger.log(`[AcDatagridOnAgGridExtension] getAgDataTypeFromAcDataType: Entering with dataType=${dataType}.`);
    let result: any = 'text';
    if (dataType == AcEnumDatagridColumnDataType.Boolean) {
      result = 'boolean';
      this.logger.log(`[AcDatagridOnAgGridExtension] getAgDataTypeFromAcDataType: Mapped Boolean to 'boolean'.`);
    }
    else if (dataType == AcEnumDatagridColumnDataType.Date || dataType == AcEnumDatagridColumnDataType.Datetime) {
      result = 'dateString';
      this.logger.log(`[AcDatagridOnAgGridExtension] getAgDataTypeFromAcDataType: Mapped Date/Datetime to 'dateString'.`);
    }
    else if (dataType == AcEnumDatagridColumnDataType.Custom || dataType == AcEnumDatagridColumnDataType.Object) {
      result = 'object';
      this.logger.log(`[AcDatagridOnAgGridExtension] getAgDataTypeFromAcDataType: Mapped Custom/Object to 'object'.`);
    }
    else if (dataType == AcEnumDatagridColumnDataType.Number) {
      result = 'number';
      this.logger.log(`[AcDatagridOnAgGridExtension] getAgDataTypeFromAcDataType: Mapped Number to 'number'.`);
    }
    else {
      this.logger.log(`[AcDatagridOnAgGridExtension] getAgDataTypeFromAcDataType: Defaulting to 'text' for dataType=${dataType}.`);
    }
    this.logger.log(`[AcDatagridOnAgGridExtension] getAgDataTypeFromAcDataType: Exiting with result=${result}.`);
    return result;
  }

  private getColDefFromAcDataGridColumn(column: AcDatagridColumn): ColDef {
    this.logger.log(`[AcDatagridOnAgGridExtension] getColDefFromAcDataGridColumn: Entering with column field=${column.columnDefinition?.field}.`);
    let editable: boolean = column.allowEdit;
    if (column.allowEdit != undefined) {
      editable = column.allowEdit;
      this.logger.log(`[AcDatagridOnAgGridExtension] getColDefFromAcDataGridColumn: Editable set to ${editable}.`);
    }
    const datagridColDef: IAcDatagridColumnDefinition = column.columnDefinition;
    const colDef: ColDef = {
      field: datagridColDef.field,
      headerName: datagridColDef.title,
      width: column.width,
      minWidth: datagridColDef.minWidth,
      maxWidth: datagridColDef.maxWidth,
      type: this.getAgDataTypeFromAcDataType(column.dataType),
      editable: column.allowEdit,
      filter: column.allowFilter == false ? false : true,
      sortable: column.allowSort == false ? false : true,
      cellClass: (datagridColDef.cellClass ?? '') + AcDatagridCssClassName.acDatagridCell,
      headerClass: datagridColDef.headerCellClass,
      suppressHeaderMenuButton: true,
      hide:datagridColDef.visible == false,
      suppressKeyboardEvent: (params) => {
        return this.handleCellKeyUp(params);
      },
      suppressMovable: !this.allowColumnDragging,
      cellRenderer: AcDatagridOnAgGridCell,
      cellRendererParams: {
        datagridApi: this.datagridApi,
        agGridExtension: this,
        datagridColumn: column
      }
    };
    this.logger.log(`[AcDatagridOnAgGridExtension] getColDefFromAcDataGridColumn: ColDef created with field=${colDef.field}, editable=${colDef.editable}, filter=${colDef.filter}, sortable=${colDef.sortable}.`);
    this.logger.log(`[AcDatagridOnAgGridExtension] getColDefFromAcDataGridColumn: Exiting.`);
    return colDef;
  }

  private handleCellKeyUp(args: SuppressKeyboardEventParams) {
    this.logger.log(`[AcDatagridOnAgGridExtension] handleCellKeyUp: Entering with args.event=${!!args.event}.`);
    if (args.event) {
      const event: KeyboardEvent = args.event;
      const KEY_A = "A";
      const KEY_C = "C";
      const KEY_V = "V";
      const KEY_D = "D";
      const KEY_PAGE_UP = "PageUp";
      const KEY_PAGE_DOWN = "PageDown";
      const KEY_TAB = "Tab";
      const KEY_LEFT = "ArrowLeft";
      const KEY_UP = "ArrowUp";
      const KEY_RIGHT = "ArrowRight";
      const KEY_DOWN = "ArrowDown";
      const KEY_F2 = "F2";
      const KEY_BACKSPACE = "Backspace";
      const KEY_ESCAPE = "Escape";
      const KEY_SPACE = " ";
      const KEY_DELETE = "Delete";
      const KEY_PAGE_HOME = "Home";
      const KEY_PAGE_END = "End";
      const key = event.key;
      this.logger.log(`[AcDatagridOnAgGridExtension] handleCellKeyUp: Key pressed=${key}.`);
      let keysToSuppress = [
        KEY_PAGE_UP,
        KEY_PAGE_DOWN,
        KEY_TAB,
        KEY_F2,
        KEY_ESCAPE,
      ];

      const editingKeys = [
        KEY_LEFT,
        KEY_RIGHT,
        KEY_UP,
        KEY_DOWN,
        KEY_BACKSPACE,
        KEY_DELETE,
        KEY_SPACE,
        KEY_PAGE_HOME,
        KEY_PAGE_END,
      ];

      if (event.ctrlKey || event.metaKey) {
        keysToSuppress.push(KEY_A);
        keysToSuppress.push(KEY_V);
        keysToSuppress.push(KEY_C);
        keysToSuppress.push(KEY_D);
        this.logger.log(`[AcDatagridOnAgGridExtension] handleCellKeyUp: Ctrl/Meta key detected, added copy/paste keys to suppress list.`);
      }

      if (this.navigate) {
        keysToSuppress = keysToSuppress.concat(editingKeys);
        this.logger.log(`[AcDatagridOnAgGridExtension] handleCellKeyUp: Navigation enabled, added editing keys to suppress list.`);
      }

      const isNavigationKey = keysToSuppress.some(function (suppressedKey) {
        return suppressedKey === key || key.toUpperCase() === suppressedKey;
      });

      if (this.navigate && !isNavigationKey) {
        this.navigate = false;
        this.logger.log(`[AcDatagridOnAgGridExtension] handleCellKeyUp: Non-navigation key during navigation, disabled navigation.`);
      }

      if (this.navigate && key.toLowerCase() == KEY_ESCAPE.toLowerCase()) {
        this.navigate = true;
        this.logger.log(`[AcDatagridOnAgGridExtension] handleCellKeyUp: Escape key pressed, re-enabled navigation.`);
      }
    }
    const suppressResult = !this.navigate;
    this.logger.log(`[AcDatagridOnAgGridExtension] handleCellKeyUp: Suppressing event=${suppressResult}, navigate=${this.navigate}. Exiting.`);
    return suppressResult;
  }

  private getConditionOperator({ agGridOperator }: { agGridOperator: string }): AcEnumConditionOperator {
    this.logger.log(`[AcDatagridOnAgGridExtension] getConditionOperator: Entering with agGridOperator=${agGridOperator}.`);
    let result: AcEnumConditionOperator = AcEnumConditionOperator.EqualTo;
    switch (agGridOperator) {
      case "blank":
      case "empty":
        result = AcEnumConditionOperator.IsEmpty;
        this.logger.log(`[AcDatagridOnAgGridExtension] getConditionOperator: Mapped 'blank/empty' to IsEmpty.`);
        break;
      case "contains":
        result = AcEnumConditionOperator.Contains;
        this.logger.log(`[AcDatagridOnAgGridExtension] getConditionOperator: Mapped 'contains' to Contains.`);
        break;
      case "endsWith":
        result = AcEnumConditionOperator.EndsWith;
        this.logger.log(`[AcDatagridOnAgGridExtension] getConditionOperator: Mapped 'endsWith' to EndsWith.`);
        break;
      case "equals":
        result = AcEnumConditionOperator.EqualTo;
        this.logger.log(`[AcDatagridOnAgGridExtension] getConditionOperator: Mapped 'equals' to EqualTo.`);
        break;
      case "greaterThan":
        result = AcEnumConditionOperator.GreaterThan;
        this.logger.log(`[AcDatagridOnAgGridExtension] getConditionOperator: Mapped 'greaterThan' to GreaterThan.`);
        break;
      case "greaterThanOrEqual":
        result = AcEnumConditionOperator.GreaterThanEqualTo;
        this.logger.log(`[AcDatagridOnAgGridExtension] getConditionOperator: Mapped 'greaterThanOrEqual' to GreaterThanEqualTo.`);
        break;
      case "inRange":
        result = AcEnumConditionOperator.Between;
        this.logger.log(`[AcDatagridOnAgGridExtension] getConditionOperator: Mapped 'inRange' to Between.`);
        break;
      case "lessThan":
        result = AcEnumConditionOperator.LessThan;
        this.logger.log(`[AcDatagridOnAgGridExtension] getConditionOperator: Mapped 'lessThan' to LessThan.`);
        break;
      case "lessThanOrEqual":
        result = AcEnumConditionOperator.LessThanEqualTo;
        this.logger.log(`[AcDatagridOnAgGridExtension] getConditionOperator: Mapped 'lessThanOrEqual' to LessThanEqualTo.`);
        break;
      case "notBlank":
        this.logger.log(`[AcDatagridOnAgGridExtension] getConditionOperator: 'notBlank' not mapped, defaulting to EqualTo.`);
        break;
      case "notEqual":
        result = AcEnumConditionOperator.NotEqualTo;
        this.logger.log(`[AcDatagridOnAgGridExtension] getConditionOperator: Mapped 'notEqual' to NotEqualTo.`);
        break;
      case "notContains":
        this.logger.log(`[AcDatagridOnAgGridExtension] getConditionOperator: 'notContains' not mapped, defaulting to EqualTo.`);
        break;
      case "startsWith":
        result = AcEnumConditionOperator.StartsWith;
        this.logger.log(`[AcDatagridOnAgGridExtension] getConditionOperator: Mapped 'startsWith' to StartsWith.`);
        break;
      default:
        this.logger.log(`[AcDatagridOnAgGridExtension] getConditionOperator: Unknown operator ${agGridOperator}, defaulting to EqualTo.`);
    }
    this.logger.log(`[AcDatagridOnAgGridExtension] getConditionOperator: Exiting with result=${result}.`);
    return result;
  }

  getDatagridCellFromEvent({ event }: { event: any }): AcDatagridCell|undefined {
    this.logger.log(`[AcDatagridOnAgGridExtension] getDatagridCellFromEvent: Entering with event=${!!event}.`);
    let datagridCell;
    const datagridRow: AcDatagridRow = this.getDatagridRowFromEvent({ event: event })!;
    const datagridColumn: AcDatagridColumn = this.getDatagridColumnFromEvent({ event: event })!;
    if(datagridRow){
      datagridCell = datagridRow.getCellForColumn({ datagridColumn: datagridColumn })!;
      this.logger.log(`[AcDatagridOnAgGridExtension] getDatagridCellFromEvent: Found row and column, retrieved cell.`);
    }
    else{
      console.warn("Not found row for event : ",event,this);
      this.logger.log(`[AcDatagridOnAgGridExtension] getDatagridCellFromEvent: Warning - No row found for event.`);
    }
    this.logger.log(`[AcDatagridOnAgGridExtension] getDatagridCellFromEvent: Exiting with datagridCell=${!!datagridCell}.`);
    return datagridCell;
  }

  getDatagridColumnFromEvent({ event }: { event: any }): AcDatagridColumn {
    this.logger.log(`[AcDatagridOnAgGridExtension] getDatagridColumnFromEvent: Entering with event=${!!event}.`);
    let field: string = '';
    if (event.colDef) {
      field = event.colDef.field!;
      this.logger.log(`[AcDatagridOnAgGridExtension] getDatagridColumnFromEvent: Field from colDef=${field}.`);
    }
    else if (event.column) {
      field = event.column.colDef.field!;
      this.logger.log(`[AcDatagridOnAgGridExtension] getDatagridColumnFromEvent: Field from column=${field}.`);
    }
    if (field == '') {
      console.error(event);
      this.logger.log(`[AcDatagridOnAgGridExtension] getDatagridColumnFromEvent: Error - Empty field, logged event.`);
    }
    const datagridColumn: AcDatagridColumn = this.datagridApi.getColumnByField({ field: field })!;
    this.logger.log(`[AcDatagridOnAgGridExtension] getDatagridColumnFromEvent: Retrieved column for field=${field}. Exiting.`);
    return datagridColumn;
  }

  getDatagridRowFromEvent({ event }: { event: any }): AcDatagridRow|undefined {
    this.logger.log(`[AcDatagridOnAgGridExtension] getDatagridRowFromEvent: Entering with event=${!!event}.`);
    let datagridRow: AcDatagridRow|undefined;
    if (event.data) {
      datagridRow = this.datagridApi.getRowById({ rowId: event.data[this.rowKey] })!;
      this.logger.log(`[AcDatagridOnAgGridExtension] getDatagridRowFromEvent: Row from event.data with rowId=${event.data[this.rowKey]}.`);
    }
    else if (event.node && event.node.data) {
      datagridRow = this.datagridApi.getRowById({ rowId: event.node.data[this.rowKey] })!;
      this.logger.log(`[AcDatagridOnAgGridExtension] getDatagridRowFromEvent: Row from event.node.data with rowId=${event.node.data[this.rowKey]}.`);
    }
    else if (event.rowIndex >= 0) {
      datagridRow = this.datagridApi.getRowByIndex({ index: event.rowIndex })!;
      this.logger.log(`[AcDatagridOnAgGridExtension] getDatagridRowFromEvent: Row from rowIndex=${event.rowIndex}.`);
    }
    else{
      console.log("get row from event, no valid parameter found in event") ;
      this.logger.log(`[AcDatagridOnAgGridExtension] getDatagridRowFromEvent: Log - No valid parameters in event.`);
    }
    this.logger.log(`[AcDatagridOnAgGridExtension] getDatagridRowFromEvent: Exiting with datagridRow=${!!datagridRow}.`);
    return datagridRow;
  }

  override getState() {
    this.logger.log("[AcDatagridOnAgGridExtension] getState: Entering, retrieving grid state.");
    const state = this.gridApi.getState();
    this.logger.log("[AcDatagridOnAgGridExtension] getState: Exiting with state retrieved.");
    return state;
  }

  private handleApplyFilter(args: any) {
    this.logger.log(`[AcDatagridOnAgGridExtension] handleApplyFilter: Entering with args=${!!args}.`);
    // if(args.search){

    // }
    // if (this.isClientSideData) {
    //   this.gridApi.applyTransaction({ remove: [args.datagridRow.data] });
    // }
    // else {
    //   this.gridApi.applyServerSideTransaction({ remove: [args.datagridRow.data] });
    // }
    this.logger.log("[AcDatagridOnAgGridExtension] handleApplyFilter: Filter handling logic (commented), exiting.");
  }

  private handleBeforeGetOnDemandData(args: IAcDatagridBeforeGetOnDemandDataHookArgs) {
    this.logger.log(`[AcDatagridOnAgGridExtension] handleBeforeGetOnDemandData: Entering with args=${!!args}.`);
    const requestArgs: IAcOnDemandRequestArgs = args.requestArgs;
    if (this.onDemandRequestParams && this.onDemandRequestParams.request) {
      const agGridRequest: any = this.onDemandRequestParams.request;
      if (agGridRequest.startRow != undefined && agGridRequest.endRow != undefined) {
        requestArgs.startIndex = agGridRequest.startRow;
        const pageSize: number = agGridRequest.endRow - agGridRequest.startRow;
        requestArgs.rowsCount = pageSize;
        this.logger.log(`[AcDatagridOnAgGridExtension] handleBeforeGetOnDemandData: Set pagination - startIndex=${requestArgs.startIndex}, rowsCount=${pageSize}.`);
      }
      if (agGridRequest.filterModel) {
        const filterColumns: string[] = Object.keys(agGridRequest.filterModel);
        if (filterColumns.length > 0) {
          const filterGroup: AcFilterGroup = new AcFilterGroup();
          filterGroup.operator = AcEnumLogicalOperator.And;
          for (const column of filterColumns) {
            const filterModel = agGridRequest.filterModel[column];
            if (filterModel.conditions) {
              const columnFilterGroup: AcFilterGroup = new AcFilterGroup();
              columnFilterGroup.operator = AcEnumLogicalOperator.And;
              for (const condition of filterModel.conditions) {
                columnFilterGroup.addFilter({ key: column, value: condition.value, operator: this.getConditionOperator({ agGridOperator: condition.type }) });
              }
              filterGroup.addFilterGroupModel({ filterGroup: columnFilterGroup });
              this.logger.log(`[AcDatagridOnAgGridExtension] handleBeforeGetOnDemandData: Added filter group for column=${column} with conditions.`);
            }
            else {
              filterGroup.addFilter({ key: column, value: filterModel.filter, operator: this.getConditionOperator({ agGridOperator: filterModel.type }) });
              this.logger.log(`[AcDatagridOnAgGridExtension] handleBeforeGetOnDemandData: Added single filter for column=${column}.`);
            }
          }
          requestArgs.filterGroup = filterGroup;
          this.logger.log(`[AcDatagridOnAgGridExtension] handleBeforeGetOnDemandData: Set filterGroup with ${filterColumns.length} columns.`);
        } else {
          this.logger.log("[AcDatagridOnAgGridExtension] handleBeforeGetOnDemandData: No filter columns in model.");
        }
      }
      if (agGridRequest.sortModel) {
        if (agGridRequest.length > 0) {
          const sortOrder: AcSortOrder = new AcSortOrder();
          for (const sortModel of agGridRequest.sortModel) {
            sortOrder.addSort({ key: sortModel.colId, order: sortModel.sort });
          }
          requestArgs.sortOrder = sortOrder;
          this.logger.log(`[AcDatagridOnAgGridExtension] handleBeforeGetOnDemandData: Set sortOrder with ${agGridRequest.sortModel.length} sorts.`);
        } else {
          this.logger.log("[AcDatagridOnAgGridExtension] handleBeforeGetOnDemandData: Empty sortModel, no sorting applied.");
        }
      }
    } else {
      this.logger.log("[AcDatagridOnAgGridExtension] handleBeforeGetOnDemandData: No onDemandRequestParams or request, skipping.");
    }
    this.logger.log("[AcDatagridOnAgGridExtension] handleBeforeGetOnDemandData: Exiting.");
  }

  private handleColumnsCustomizerToggle(args: IAcDatagridColumnsCustomizerHookArgs) {
    this.logger.log(`[AcDatagridOnAgGridExtension] handleColumnsCustomizerToggle: Entering with args.value=${args.value}.`);
    if (args.value) {
      this.gridApi.openToolPanel('columns');
      this.logger.log("[AcDatagridOnAgGridExtension] handleColumnsCustomizerToggle: Opened columns tool panel.");
    } else {
      this.gridApi.closeToolPanel();
      this.logger.log("[AcDatagridOnAgGridExtension] handleColumnsCustomizerToggle: Closed tool panel.");
    }
    this.logger.log("[AcDatagridOnAgGridExtension] handleColumnsCustomizerToggle: Exiting.");
  }

  private handleDataChange() {
    this.logger.log("[AcDatagridOnAgGridExtension] handleDataChange: Entering, processing data change.");
    const data: any[] = [];
    for (const datagridRow of this.datagridApi.datagridRows) {
      const rowData: any = datagridRow.data;
      rowData[this.rowKey] = datagridRow.acRowId;
      data.push(rowData);
    }
    this.logger.log(`[AcDatagridOnAgGridExtension] handleDataChange: Prepared data array with ${data.length} rows.`);
    const hookArgs: IAcDatagriOnAgGridDataChangeHookArgs = {
      data: data
    }
    this.datagridApi.hooks.execute({ hook: AcEnumDatagridOnAgGridHook.DataChange, args: hookArgs });
    this.logger.log("[AcDatagridOnAgGridExtension] handleDataChange: Executed DataChange hook.");
    this.data = data;
    if (this.isClientSideData) {
      this.gridOptions['rowData'] = this.data;
      this.gridApi.setGridOption('rowData', this.data);
      this.logger.log("[AcDatagridOnAgGridExtension] handleDataChange: Updated client-side rowData.");
    } else {
      this.logger.log("[AcDatagridOnAgGridExtension] handleDataChange: Skipped client-side update (server-side mode).");
    }
    this.logger.log("[AcDatagridOnAgGridExtension] handleDataChange: Exiting.");
  }

  private handleDataExportXlsx(args: IAcDatagridDataExportXlsxExportCallHookArgs) {
    this.logger.log(`[AcDatagridOnAgGridExtension] handleDataExportXlsx: Entering with fileName=${args.args.fileName}.`);
    if (this.isClientSideData) {
      this.gridApi.exportDataAsExcel({ fileName: args.args.fileName });
      this.logger.log("[AcDatagridOnAgGridExtension] handleDataExportXlsx: Exported data as Excel (client-side).");
    }
    else {
      // await this.getAllServerSideRows();
      // callbackFunction();
      this.logger.log("[AcDatagridOnAgGridExtension] handleDataExportXlsx: Server-side export logic pending implementation.");
    }
    this.logger.log("[AcDatagridOnAgGridExtension] handleDataExportXlsx: Exiting.");
  }

  private handleDataSourceTypeChange(args: IAcDatagridDataSourceTypeChangeHookArgs) {
    this.logger.log(`[AcDatagridOnAgGridExtension] handleDataSourceTypeChange: Entering with dataSourceType=${args.dataSourceType}.`);
    if (args.dataSourceType == AcEnumDataSourceType.Offline) {
      this.isClientSideData = true;
      this.logger.log("[AcDatagridOnAgGridExtension] handleDataSourceTypeChange: Switched to client-side data.");
    }
    else {
      this.isClientSideData = false;
      this.gridOptions['rowModelType'] = 'serverSide';
      this.gridOptions['serverSideDatasource'] = this.onDemandDataSource;
      this.initAgGrid('serverSide');
      this.logger.log("[AcDatagridOnAgGridExtension] handleDataSourceTypeChange: Switched to server-side data and re-initialized grid.");
    }
    this.logger.log("[AcDatagridOnAgGridExtension] handleDataSourceTypeChange: Exiting.");
  }

  private handleExtensionEnabled(args: IAcDatagridExtensionEnabledHookArgs) {
    this.logger.log(`[AcDatagridOnAgGridExtension] handleExtensionEnabled: Entering with extensionName=${args.extensionName}.`);
    if (args.extensionName == AcEnumDatagridExtension.AfterRowsFooter) {
      this.setAfterRowsFooterExtension();
      this.logger.log("[AcDatagridOnAgGridExtension] handleExtensionEnabled: Enabled AfterRowsFooter extension.");
    }
    else if (args.extensionName == AcEnumDatagridExtension.RowNumbers) {
      this.setRowNumbersExtension();
      this.logger.log("[AcDatagridOnAgGridExtension] handleExtensionEnabled: Enabled RowNumbers extension.");
    }
    else if (args.extensionName == AcEnumDatagridExtension.ColumnDragging) {
      this.setColumnDraggingExtension();
      this.logger.log("[AcDatagridOnAgGridExtension] handleExtensionEnabled: Enabled ColumnDragging extension.");
    }
    else if (args.extensionName == AcEnumDatagridExtension.DataExportXlsx) {
      this.setDataExportXlsxExtension();
      this.logger.log("[AcDatagridOnAgGridExtension] handleExtensionEnabled: Enabled DataExportXlsx extension.");
    }
    else if (args.extensionName == AcEnumDatagridExtension.RowDragging) {
      this.setColumnDefs();
      this.logger.log("[AcDatagridOnAgGridExtension] handleExtensionEnabled: Enabled RowDragging, updated column defs.");
    }
    else {
      this.logger.log(`[AcDatagridOnAgGridExtension] handleExtensionEnabled: Unknown extension ${args.extensionName}, skipping.`);
    }
    this.logger.log("[AcDatagridOnAgGridExtension] handleExtensionEnabled: Exiting.");
  }

  private handleGetOnDemandDataSuccessCallback(args: IAcDatagridGetOnDemandDataSuccessCallbackHookArgs) {
    this.logger.log(`[AcDatagridOnAgGridExtension] handleGetOnDemandDataSuccessCallback: Entering with response data count=${args.responseArgs.data?.length || 0}.`);
    if (this.onDemandRequestParams) {
      const response = args.responseArgs;
      this.onDemandRequestParams.success({ rowData: response.data, rowCount: response.totalCount });
      this.onDemandRequestParams = undefined;
      this.logger.log(`[AcDatagridOnAgGridExtension] handleGetOnDemandDataSuccessCallback: Called success callback with ${response.data?.length || 0} rows, cleared params.`);
    } else {
      this.logger.log("[AcDatagridOnAgGridExtension] handleGetOnDemandDataSuccessCallback: No onDemandRequestParams, skipping callback.");
    }
    this.logger.log("[AcDatagridOnAgGridExtension] handleGetOnDemandDataSuccessCallback: Exiting.");
  }

  override handleHook({ hook, args }: { hook: string; args: any; }): void {
    this.logger.log(`[AcDatagridOnAgGridExtension] handleHook: Entering with hook=${hook}.`);
    if (stringEqualsIgnoreCase(hook, AcEnumDatagridHook.BeforeGetOnDemandData)) {
      this.logger.log("[AcDatagridOnAgGridExtension] handleHook: Handling BeforeGetOnDemandData.");
      this.handleBeforeGetOnDemandData(args);
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridHook.CellFocus)) {
      this.navigate = true;
      this.logger.log("[AcDatagridOnAgGridExtension] handleHook: Handled CellFocus, enabled navigation.");
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridHook.ColumnDefinitionsChange)) {
      this.logger.log("[AcDatagridOnAgGridExtension] handleHook: Handling ColumnDefinitionsChange.");
      this.setColumnDefs();
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridHook.DataChange)) {
      this.logger.log("[AcDatagridOnAgGridExtension] handleHook: Handling DataChange.");
      this.handleDataChange();
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridHook.DataSourceTypeChange)) {
      this.logger.log("[AcDatagridOnAgGridExtension] handleHook: Handling DataSourceTypeChange.");
      this.handleDataSourceTypeChange(args);
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridHook.ExtensionEnable)) {
      this.logger.log("[AcDatagridOnAgGridExtension] handleHook: Handling ExtensionEnable.");
      this.handleExtensionEnabled(args);
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridHook.GetOnDemandDataSuccessCallback)) {
      this.logger.log("[AcDatagridOnAgGridExtension] handleHook: Handling GetOnDemandDataSuccessCallback.");
      this.handleGetOnDemandDataSuccessCallback(args);
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridHook.RefreshRows)) {
      this.logger.log("[AcDatagridOnAgGridExtension] handleHook: Handling RefreshRows.");
      this.handleRefreshRows(args);
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridHook.RowAdd)) {
      this.logger.log("[AcDatagridOnAgGridExtension] handleHook: Handling RowAdd.");
      this.handleRowAdd(args);
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridHook.RowDelete)) {
      this.logger.log("[AcDatagridOnAgGridExtension] handleHook: Handling RowDelete.");
      this.handleRowDelete(args);
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridHook.RowFocus)) {
      this.logger.log("[AcDatagridOnAgGridExtension] handleHook: Handling RowFocus.");
      this.handleRowFocus(args);
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridHook.RowUpdate)) {
      this.logger.log("[AcDatagridOnAgGridExtension] handleHook: Handling RowUpdate.");
      this.handleRowUpdate(args);
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridHook.UsePaginationChange)) {
      this.logger.log("[AcDatagridOnAgGridExtension] handleHook: Handling UsePaginationChange.");
      this.handleUsePaginationChange();
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridRowNumbersHook.ShowRowNumbersChange)) {
      this.logger.log("[AcDatagridOnAgGridExtension] handleHook: Handling ShowRowNumbersChange.");
      this.setShowRowNumbers();
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridColumnsCustomizerHook.ShowColumnsCustomizerPanelChange)) {
      this.logger.log("[AcDatagridOnAgGridExtension] handleHook: Handling ShowColumnsCustomizerPanelChange.");
      this.setColumnsCustomizerExtension();
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridColumnsCustomizerHook.ToggleColumnsCustomizerPanel)) {
      this.logger.log("[AcDatagridOnAgGridExtension] handleHook: Handling ToggleColumnsCustomizerPanel.");
      this.handleColumnsCustomizerToggle(args);
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridColumnDraggingHook.AllowColumnDraggingChange)) {
      this.logger.log("[AcDatagridOnAgGridExtension] handleHook: Handling AllowColumnDraggingChange.");
      this.setColumnDragging();
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridDataExportXlsxHook.ExportData)) {
      this.logger.log("[AcDatagridOnAgGridExtension] handleHook: Handling ExportData.");
      this.handleDataExportXlsx(args);
    }
    else {
      this.logger.log(`[AcDatagridOnAgGridExtension] handleHook: Unknown hook ${hook}, skipping.`);
    }
    this.logger.log("[AcDatagridOnAgGridExtension] handleHook: Exiting.");
  }

  private handleRefreshRows(args: IAcDatagridRowAddHookArgs){
    this.logger.log(`[AcDatagridOnAgGridExtension] handleRefreshRows: Entering with args=${!!args}.`);
    if (!this.isClientSideData) {
      this.gridApi.refreshServerSide({ purge: true });
      this.logger.log("[AcDatagridOnAgGridExtension] handleRefreshRows: Refreshed server-side rows with purge.");
    }
    else {
      this.gridApi.updateGridOptions({
        rowData: this.data,
      });
      this.logger.log("[AcDatagridOnAgGridExtension] handleRefreshRows: Updated client-side rowData.");
    }
    this.logger.log("[AcDatagridOnAgGridExtension] handleRefreshRows: Exiting.");
  }

  private handleRowAdd(args: IAcDatagridRowAddHookArgs) {
    this.logger.log(`[AcDatagridOnAgGridExtension] handleRowAdd: Entering with append=${args.append}, highlightCells=${args.highlightCells}.`);
    const data: any = args.datagridRow.data;
    if (this.isClientSideData) {
      data[this.rowKey] = args.datagridRow.acRowId;
      const hookArgs: IAcDatagriOnAgGridRowAddHookArgs = {
        data: data
      };
      this.datagridApi.hooks.execute({ hook: AcEnumDatagridOnAgGridHook.BeforeRowAdd, args: hookArgs });
      this.logger.log("[AcDatagridOnAgGridExtension] handleRowAdd: Executed BeforeRowAdd hook.");
      if (args.append) {
        this.gridApi.applyTransaction({ add: [data] });
        this.logger.log("[AcDatagridOnAgGridExtension] handleRowAdd: Applied transaction to append row.");
      }
      else {
        this.gridApi.applyTransaction({ add: [data], addIndex: 0 });
        this.logger.log("[AcDatagridOnAgGridExtension] handleRowAdd: Applied transaction to insert row at index 0.");
      }
      const rowIndex = this.gridApi.getDisplayedRowCount() - 1;
      const rowNode: any = this.gridApi.getDisplayedRowAtIndex(rowIndex);
      this.gridApi.refreshCells({ rowNodes: [rowNode], force: true });
      this.gridApi.redrawRows();
      this.logger.log(`[AcDatagridOnAgGridExtension] handleRowAdd: Refreshed and redrawn row at index ${rowIndex}.`);
      if (args.highlightCells) {
        this.gridApi.flashCells({
          rowNodes: [rowNode], fadeDuration: 1000, flashDuration: 1000
        });
        this.logger.log("[AcDatagridOnAgGridExtension] handleRowAdd: Flashed cells for highlight.");
      }
    }
    else {
      this.gridApi.applyServerSideTransaction({ add: [data] });
      this.logger.log("[AcDatagridOnAgGridExtension] handleRowAdd: Applied server-side transaction to add row.");
    }
    this.logger.log("[AcDatagridOnAgGridExtension] handleRowAdd: Exiting.");
  }

  private handleRowDelete(args: IAcDatagridRowDeleteHookArgs) {
    this.logger.log(`[AcDatagridOnAgGridExtension] handleRowDelete: Entering with rowId=${args.datagridRow.acRowId}.`);
    if (this.isClientSideData) {
      this.gridApi.applyTransaction({ remove: [args.datagridRow.data] });
      this.logger.log("[AcDatagridOnAgGridExtension] handleRowDelete: Applied client-side transaction to remove row.");
    }
    else {
      this.gridApi.applyServerSideTransaction({ remove: [args.datagridRow.data] });
      this.logger.log("[AcDatagridOnAgGridExtension] handleRowDelete: Applied server-side transaction to remove row.");
    }
    this.logger.log("[AcDatagridOnAgGridExtension] handleRowDelete: Exiting.");
  }

  private handleRowFocus(args: IAcDatagridRowFocusHookArgs) {
    this.logger.log(`[AcDatagridOnAgGridExtension] handleRowFocus: Entering with index=${args.index}, highlightCells=${args.highlightCells}.`);
    const pageSize = this.gridApi.paginationGetPageSize();
    const newIndex = args.index;
    let targetPage = 1;
    if (newIndex >= 0) {
      targetPage = Math.floor(newIndex / pageSize);
      this.logger.log(`[AcDatagridOnAgGridExtension] handleRowFocus: Calculated targetPage=${targetPage} for index=${newIndex}, pageSize=${pageSize}.`);
    }
    const activePage = this.gridApi.paginationGetCurrentPage();
    if (activePage != targetPage) {
      this.gridApi.paginationGoToPage(targetPage);
      this.logger.log(`[AcDatagridOnAgGridExtension] handleRowFocus: Navigated to page ${targetPage}.`);
    }
    this.gridApi.ensureIndexVisible(newIndex, 'middle');
    this.logger.log(`[AcDatagridOnAgGridExtension] handleRowFocus: Ensured index ${newIndex} visible in middle.`);
    if (args.highlightCells) {
      const node = this.gridApi.getDisplayedRowAtIndex(newIndex);
      if (node) {
        this.gridApi.flashCells({ rowNodes: [node] });
        this.logger.log("[AcDatagridOnAgGridExtension] handleRowFocus: Flashed cells for highlight.");
      } else {
        this.logger.log(`[AcDatagridOnAgGridExtension] handleRowFocus: No node found for index ${newIndex}, skipped flash.`);
      }
    }
    this.logger.log("[AcDatagridOnAgGridExtension] handleRowFocus: Exiting.");
  }

  private handleRowUpdate(args: IAcDatagridRowUpdateHookArgs) {
    this.logger.log(`[AcDatagridOnAgGridExtension] handleRowUpdate: Entering with rowId=${args.datagridRow.acRowId}, highlightCells=${args.highlightCells}.`);
    const data = args.datagridRow.data;
    const hookArgs: IAcDatagriOnAgGridRowUpdateHookArgs = {
      data: data
    };
    this.datagridApi.hooks.execute({ hook: AcEnumDatagridOnAgGridHook.BeforeRowUpdate, args: hookArgs });
    this.logger.log("[AcDatagridOnAgGridExtension] handleRowUpdate: Executed BeforeRowUpdate hook.");
    let rowNode: any;
    this.gridApi.forEachNode((node: IRowNode, index: number) => {
      if (node.data[this.rowKey] == args.datagridRow.acRowId) {
        rowNode = node;
      }
    });
    if (rowNode) {
      if (this.isClientSideData) {
        rowNode.setData(data);
        this.logger.log("[AcDatagridOnAgGridExtension] handleRowUpdate: Updated client-side row data.");
      }
      else {
        data[this.rowKey] = args.datagridRow.acRowId;
        this.gridApi.applyServerSideTransaction({ update: [data] });
        rowNode.setData(data);
        this.logger.log("[AcDatagridOnAgGridExtension] handleRowUpdate: Applied server-side transaction and updated row data.");
      }
      if (args.highlightCells) {
        this.gridApi.flashCells({
          rowNodes: [rowNode], fadeDuration: 1000, flashDuration: 1000
        });
        this.logger.log("[AcDatagridOnAgGridExtension] handleRowUpdate: Flashed cells for highlight.");
      }
    } else {
      this.logger.log(`[AcDatagridOnAgGridExtension] handleRowUpdate: No rowNode found for rowId=${args.datagridRow.acRowId}, skipped update.`);
    }
    this.logger.log("[AcDatagridOnAgGridExtension] handleRowUpdate: Exiting.");
  }

  private handleUsePaginationChange() {
    this.logger.log("[AcDatagridOnAgGridExtension] handleUsePaginationChange: Entering.");
    this.gridOptions['pagination'] = this.datagridApi.usePagination;
    this.gridApi.setGridOption('pagination', this.datagridApi.usePagination);
    this.logger.log(`[AcDatagridOnAgGridExtension] handleUsePaginationChange: Set pagination to ${this.datagridApi.usePagination}.`);
    this.logger.log("[AcDatagridOnAgGridExtension] handleUsePaginationChange: Exiting.");
  }

  override init(): void {
    this.logger.log("[AcDatagridOnAgGridExtension] init: Starting grid initialization.");
    this.initAgGrid('clientSide');
    this.logger.log("[AcDatagridOnAgGridExtension] init: Client-side grid initialized.");
    this.agGridEventHandler = new AcDatagridOnAgGridEventHandler({ agGridExtension: this });
    this.agGridEventHandler.registerAgGridListeners();
    this.logger.log("[AcDatagridOnAgGridExtension] init: Event handler registered.");
    new AcDatagridRowSelectionExtensionOnAgGrid({ agGridExtension: this });
    new AcDatagridTreeTableExtensionOnAgGrid({ agGridExtension: this });
    new AcDatagridRowDraggingExtensionOnAgGrid({ agGridExtension: this });
    this.logger.log("[AcDatagridOnAgGridExtension] init: Additional extensions instantiated.");
    this.setAfterRowsFooterExtension();
    this.setColumnsCustomizerExtension();
    this.setColumnDraggingExtension();
    this.setRowNumbersExtension();
    this.logger.log("[AcDatagridOnAgGridExtension] init: All extensions set. Exiting init.");
  }

  private initAgGrid(modelType: RowModelType) {
    this.logger.log(`[AcDatagridOnAgGridExtension] initAgGrid: Entering with modelType=${modelType}.`);
    this.datagridApi.datagrid.element.innerHTML = "";
    this.datagridApi.datagrid.element.append(this.agGridElement);
    this.logger.log("[AcDatagridOnAgGridExtension] initAgGrid: Cleared and appended grid element.");
    this.gridOptions['rowModelType'] = modelType;
    this.gridApi = createGrid(this.datagridApi.datagrid.element, this.gridOptions);
    this.logger.log(`[AcDatagridOnAgGridExtension] initAgGrid: Grid API created with ${modelType} model. Exiting.`);
  }

  private registerModules() {
    this.logger.log("[AcDatagridOnAgGridExtension] registerModules: Entering.");
    ModuleRegistry.registerModules([AllCommunityModule, AllEnterpriseModule]);
    this.logger.log("[AcDatagridOnAgGridExtension] registerModules: Modules registered. Exiting.");
  }

  setAfterRowsFooterExtension() {
    this.logger.log("[AcDatagridOnAgGridExtension] setAfterRowsFooterExtension: Entering.");
    if (this.datagridApi.extensions[AcEnumDatagridExtension.AfterRowsFooter]) {
      this.afterRowsFooterExtension = this.datagridApi.extensions[AcEnumDatagridExtension.AfterRowsFooter] as AcDatagridAfterRowsFooterExtension;
      this.setAfterRowsFooter();
      this.logger.log("[AcDatagridOnAgGridExtension] setAfterRowsFooterExtension: Extension assigned and footer set.");
    } else {
      this.logger.log("[AcDatagridOnAgGridExtension] setAfterRowsFooterExtension: No AfterRowsFooter extension available.");
    }
    this.logger.log("[AcDatagridOnAgGridExtension] setAfterRowsFooterExtension: Exiting.");
  }

  setAfterRowsFooter() {
    this.logger.log("[AcDatagridOnAgGridExtension] setAfterRowsFooter: Entering.");
    if (this.afterRowsFooterExtension) {
      let retryOperation: boolean = true;
      if (this.datagridApi.datagrid && this.datagridApi.datagrid.element && this.afterRowsFooterExtension.footerElement) {
        const containerElement = this.datagridApi.datagrid.element.querySelector(".ag-center-cols-viewport");
        if (containerElement) {
          retryOperation = false;
          containerElement.append(this.afterRowsFooterExtension.footerElement);
          this.logger.log("[AcDatagridOnAgGridExtension] setAfterRowsFooter: Appended footer to container.");
        } else {
          this.logger.log("[AcDatagridOnAgGridExtension] setAfterRowsFooter: No container element found.");
        }
      }
      if (retryOperation) {
        setTimeout(() => {
          this.setAfterRowsFooter();
        }, 100);
        this.logger.log("[AcDatagridOnAgGridExtension] setAfterRowsFooter: Retrying append after timeout.");
      }
    } else {
      this.logger.log("[AcDatagridOnAgGridExtension] setAfterRowsFooter: No afterRowsFooterExtension, skipping.");
    }
    this.logger.log("[AcDatagridOnAgGridExtension] setAfterRowsFooter: Exiting.");
  }

  setColumnDefs() {
    this.logger.log("[AcDatagridOnAgGridExtension] setColumnDefs: Entering.");
    const colDefs: ColDef[] = [];
    const beforeHookArgs: IAcDatagriOnAgGridColDefsChangeHookArgs = {
      colDefs: colDefs
    }
    this.datagridApi.hooks.execute({ hook: AcEnumDatagridOnAgGridHook.BeforeColDefsChange, args: beforeHookArgs });
    this.logger.log("[AcDatagridOnAgGridExtension] setColumnDefs: Executed BeforeColDefsChange hook.");
    for (const column of this.datagridApi.datagridColumns) {
      colDefs.push(this.getColDefFromAcDataGridColumn(column));
    }
    this.logger.log(`[AcDatagridOnAgGridExtension] setColumnDefs: Generated ${colDefs.length} column definitions.`);
    this.colDefs = colDefs;
    const hookArgs: IAcDatagriOnAgGridColDefsChangeHookArgs = {
      colDefs: colDefs
    }
    this.datagridApi.hooks.execute({ hook: AcEnumDatagridOnAgGridHook.ColDefsChange, args: hookArgs });
    this.logger.log("[AcDatagridOnAgGridExtension] setColumnDefs: Executed ColDefsChange hook.");
    this.gridOptions['columnDefs'] = this.colDefs;
    this.gridApi.setGridOption('columnDefs', this.colDefs);
    this.logger.log("[AcDatagridOnAgGridExtension] setColumnDefs: Updated grid options with new column defs. Exiting.");
  }

  setColumnDraggingExtension() {
    this.logger.log("[AcDatagridOnAgGridExtension] setColumnDraggingExtension: Entering.");
    if (this.datagridApi.extensions[AcEnumDatagridExtension.ColumnDragging]) {
      this.columnDraggingExtension = this.datagridApi.extensions[AcEnumDatagridExtension.ColumnDragging] as AcDatagridColumnDraggingExtension;
      this.setColumnDragging();
      this.logger.log("[AcDatagridOnAgGridExtension] setColumnDraggingExtension: Extension assigned and dragging set.");
    } else {
      this.logger.log("[AcDatagridOnAgGridExtension] setColumnDraggingExtension: No ColumnDragging extension available.");
    }
    this.logger.log("[AcDatagridOnAgGridExtension] setColumnDraggingExtension: Exiting.");
  }

  setColumnDragging() {
    this.logger.log("[AcDatagridOnAgGridExtension] setColumnDragging: Entering.");
    if (this.columnDraggingExtension) {
      this.allowColumnDragging = this.columnDraggingExtension.allowColumnDragging;
      this.setColumnDefs();
      this.logger.log(`[AcDatagridOnAgGridExtension] setColumnDragging: Set allowColumnDragging=${this.allowColumnDragging}, updated column defs.`);
    } else {
      this.logger.log("[AcDatagridOnAgGridExtension] setColumnDragging: No columnDraggingExtension, skipping.");
    }
    this.logger.log("[AcDatagridOnAgGridExtension] setColumnDragging: Exiting.");
  }

  setColumnsCustomizerExtension() {
    this.logger.log("[AcDatagridOnAgGridExtension] setColumnsCustomizerExtension: Entering.");
    if (this.datagridApi.extensions[AcEnumDatagridExtension.ColumnsCustomizer]) {
      this.columnsCustomizerExtension = this.datagridApi.extensions[AcEnumDatagridExtension.ColumnsCustomizer] as AcDatagridColumnsCustomizerExtension;
      this.setShowColumnsCustomizer();
      this.logger.log("[AcDatagridOnAgGridExtension] setColumnsCustomizerExtension: Extension assigned and customizer shown.");
    } else {
      this.logger.log("[AcDatagridOnAgGridExtension] setColumnsCustomizerExtension: No ColumnsCustomizer extension available.");
    }
    this.logger.log("[AcDatagridOnAgGridExtension] setColumnsCustomizerExtension: Exiting.");
  }

  setDataExportXlsxExtension() {
    this.logger.log("[AcDatagridOnAgGridExtension] setDataExportXlsxExtension: Entering.");
    if (this.datagridApi.extensions[AcEnumDatagridExtension.DataExportXlsx]) {
      this.dataExportXlsxExtension = this.datagridApi.extensions[AcEnumDatagridExtension.DataExportXlsx] as AcDatagridDataExportXlsxExtension;
      this.logger.log("[AcDatagridOnAgGridExtension] setDataExportXlsxExtension: Extension assigned.");
    } else {
      this.logger.log("[AcDatagridOnAgGridExtension] setDataExportXlsxExtension: No DataExportXlsx extension available.");
    }
    this.logger.log("[AcDatagridOnAgGridExtension] setDataExportXlsxExtension: Exiting.");
  }

  setRowNumbersExtension() {
    this.logger.log("[AcDatagridOnAgGridExtension] setRowNumbersExtension: Entering.");
    if (this.datagridApi.extensions[AcEnumDatagridExtension.RowNumbers]) {
      this.rowNumbersExtension = this.datagridApi.extensions[AcEnumDatagridExtension.RowNumbers] as AcDatagridRowNumbersExtension;
      this.setShowRowNumbers();
      this.logger.log("[AcDatagridOnAgGridExtension] setRowNumbersExtension: Extension assigned and row numbers shown.");
    } else {
      this.logger.log("[AcDatagridOnAgGridExtension] setRowNumbersExtension: No RowNumbers extension available.");
    }
    this.logger.log("[AcDatagridOnAgGridExtension] setRowNumbersExtension: Exiting.");
  }

  setShowColumnsCustomizer() {
    this.logger.log("[AcDatagridOnAgGridExtension] setShowColumnsCustomizer: Entering.");
    let sideBarOptions: any = undefined;
    if (this.columnsCustomizerExtension) {
      if (this.columnsCustomizerExtension.showColumnCustomizerPanel == true) {
        sideBarOptions = {
          toolPanels: [
            {
              id: 'columns',
              labelDefault: 'Columns',
              labelKey: 'columns',
              iconKey: 'columns',
              toolPanel: 'agColumnsToolPanel',
              toolPanelParams: {
                suppressPivotMode: true,
                suppressRowGroups: true,
                suppressValues: true,
                suppressPivots: true,
              }
            }
          ],
          defaultToolPanel: '', // DO NOT auto-open via config
          // hiddenByDefault: true
        };;
        this.logger.log("[AcDatagridOnAgGridExtension] setShowColumnsCustomizer: Configured sideBar with columns tool panel.");
      } else {
        this.logger.log("[AcDatagridOnAgGridExtension] setShowColumnsCustomizer: showColumnCustomizerPanel=false, no sideBar config.");
      }
    } else {
      this.logger.log("[AcDatagridOnAgGridExtension] setShowColumnsCustomizer: No columnsCustomizerExtension, no sideBar.");
    }
    this.gridOptions['sideBar'] = sideBarOptions;
    this.gridApi.setGridOption('sideBar', sideBarOptions);
    this.logger.log(`[AcDatagridOnAgGridExtension] setShowColumnsCustomizer: Updated grid sideBar to ${!!sideBarOptions}. Exiting.`);
  }

  setShowRowNumbers() {
    this.logger.log("[AcDatagridOnAgGridExtension] setShowRowNumbers: Entering.");
    let showRowNumbers: boolean = false;
    if (this.rowNumbersExtension) {
      if (this.rowNumbersExtension.showRowNumbers == true) {
        showRowNumbers = true;
        this.logger.log("[AcDatagridOnAgGridExtension] setShowRowNumbers: Extension enabled, setting showRowNumbers=true.");
      } else {
        this.logger.log("[AcDatagridOnAgGridExtension] setShowRowNumbers: Extension disabled, showRowNumbers=false.");
      }
    } else {
      this.logger.log("[AcDatagridOnAgGridExtension] setShowRowNumbers: No rowNumbersExtension, defaulting to false.");
    }
    this.gridOptions['rowNumbers'] = showRowNumbers;
    this.gridApi.setGridOption('rowNumbers', showRowNumbers);
    this.logger.log(`[AcDatagridOnAgGridExtension] setShowRowNumbers: Updated grid rowNumbers to ${showRowNumbers}. Exiting.`);
  }

  override setState({ state }: { state: any; }): void {
    this.logger.log(`[AcDatagridOnAgGridExtension] setState: Entering with state=${!!state}.`);
    if (state) {
      this.agGridEventHandler.ignoreEvents = true;
      this.gridApi.setState(state);
      setTimeout(() => {
        this.agGridEventHandler.ignoreEvents = false;
      }, 100);
      this.logger.log("[AcDatagridOnAgGridExtension] setState: Applied state and scheduled event ignore reset.");
    } else {
      this.logger.log("[AcDatagridOnAgGridExtension] setState: No state provided, skipping.");
    }
    this.logger.log("[AcDatagridOnAgGridExtension] setState: Exiting.");
  }

}

export const AcDatagridOnAgGridExtensionName = 'agGridOnAcDatagrid';

export const AgGridOnAcDatagrid: IAcDatagridExtension = {
  extensionName: AcDatagridOnAgGridExtensionName,
  extensionClass: AcDatagridOnAgGridExtension
}

