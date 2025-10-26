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
import { AcEnumConditionOperator, AcEnumLogicalOperator, AcFilterGroup, AcSortOrder, IAcOnDemandRequestArgs } from '@autocode-ts/autocode';
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

  constructor() {
    super();
    this.registerModules();
    this.gridOptions = { ...AC_DATAGRID_AGGRID_DEFAULT_OPTIONS };
    this.gridOptions.getRowId = (params: GetRowIdParams) => {
      return params.data[this.rowKey];
    };
  }

  private getAgDataTypeFromAcDataType(dataType: any) {
    let result: any = 'text';
    if (dataType == AcEnumDatagridColumnDataType.Boolean) {
      result = 'boolean';
    }
    else if (dataType == AcEnumDatagridColumnDataType.Date || dataType == AcEnumDatagridColumnDataType.Datetime) {
      result = 'dateString';
    }
    else if (dataType == AcEnumDatagridColumnDataType.Custom || dataType == AcEnumDatagridColumnDataType.Object) {
      result = 'object';
    }
    else if (dataType == AcEnumDatagridColumnDataType.Number) {
      result = 'number';
    }
    return result;
  }

  private getColDefFromAcDataGridColumn(column: AcDatagridColumn): ColDef {
    let editable: boolean = column.allowEdit;
    if (column.allowEdit != undefined) {
      editable = column.allowEdit;
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
    return colDef;
  }

  private handleCellKeyUp(args: SuppressKeyboardEventParams) {
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
      }

      if (this.navigate) {
        keysToSuppress = keysToSuppress.concat(editingKeys);
      }



      const isNavigationKey = keysToSuppress.some(function (suppressedKey) {
        return suppressedKey === key || key.toUpperCase() === suppressedKey;
      });

      if (this.navigate && !isNavigationKey) {
        this.navigate = false;
      }

      if (this.navigate && key.toLowerCase() == KEY_ESCAPE.toLowerCase()) {
        this.navigate = true;
      }
    }
    return !this.navigate;
  }

  private getConditionOperator({ agGridOperator }: { agGridOperator: string }): AcEnumConditionOperator {
    let result: AcEnumConditionOperator = AcEnumConditionOperator.EqualTo;
    switch (agGridOperator) {
      case "blank":
      case "empty":
        result = AcEnumConditionOperator.IsEmpty;
        break;
      case "contains":
        result = AcEnumConditionOperator.Contains;
        break;
      case "endsWith":
        result = AcEnumConditionOperator.EndsWith;
        break;
      case "equals":
        result = AcEnumConditionOperator.EqualTo;
        break;
      case "greaterThan":
        result = AcEnumConditionOperator.GreaterThan;
        break;
      case "greaterThanOrEqual":
        result = AcEnumConditionOperator.GreaterThanEqualTo;
        break;
      case "inRange":
        result = AcEnumConditionOperator.Between;
        break;
      case "lessThan":
        result = AcEnumConditionOperator.LessThan;
        break;
      case "lessThanOrEqual":
        result = AcEnumConditionOperator.LessThanEqualTo;
        break;
      case "notBlank":
        // result = AcEnumConditionOperator.IsNotEmpty;
        break;
      case "notEqual":
        result = AcEnumConditionOperator.NotEqualTo;
        break;
      case "notContains":
        // result = AcEnumConditionOperator.NotContains;
        break;
      case "startsWith":
        result = AcEnumConditionOperator.StartsWith;
        break;
    }
    return result;
  }

  getDatagridCellFromEvent({ event }: { event: any }): AcDatagridCell|undefined {
    let datagridCell;
    const datagridRow: AcDatagridRow = this.getDatagridRowFromEvent({ event: event })!;
    const datagridColumn: AcDatagridColumn = this.getDatagridColumnFromEvent({ event: event })!;
    if(datagridRow){
      datagridCell = datagridRow.getCellForColumn({ datagridColumn: datagridColumn })!;
    }
    else{
      console.warn("Not found row for event : ",event,this);
    }
    return datagridCell;
  }

  getDatagridColumnFromEvent({ event }: { event: any }): AcDatagridColumn {
    let field: string = '';
    if (event.colDef) {
      field = event.colDef.field!;
    }
    else if (event.column) {
      field = event.column.colDef.field!;
    }
    if (field == '') {
      console.error(event);
    }
    const datagridColumn: AcDatagridColumn = this.datagridApi.getColumnByField({ field: field })!;
    return datagridColumn;
  }

  getDatagridRowFromEvent({ event }: { event: any }): AcDatagridRow|undefined {
    let datagridRow: AcDatagridRow|undefined;
    if (event.data) {
      datagridRow = this.datagridApi.getRowById({ rowId: event.data[this.rowKey] })!;
    }
    else if (event.node && event.node.data) {
      datagridRow = this.datagridApi.getRowById({ rowId: event.node.data[this.rowKey] })!;
    }
    else if (event.rowIndex >= 0) {
      datagridRow = this.datagridApi.getRowByIndex({ index: event.rowIndex })!;
    }
    else{
      console.log("get row from event, no valid parameter found in event") ;
    }
    return datagridRow;
  }

  override getState() {
    return this.gridApi.getState();
  }

  private handleApplyFilter(args: any) {
    // if(args.search){

    // }
    // if (this.isClientSideData) {
    //   this.gridApi.applyTransaction({ remove: [args.datagridRow.data] });
    // }
    // else {
    //   this.gridApi.applyServerSideTransaction({ remove: [args.datagridRow.data] });
    // }
  }

  private handleBeforeGetOnDemandData(args: IAcDatagridBeforeGetOnDemandDataHookArgs) {
    const requestArgs: IAcOnDemandRequestArgs = args.requestArgs;
    if (this.onDemandRequestParams && this.onDemandRequestParams.request) {
      const agGridRequest: any = this.onDemandRequestParams.request;
      if (agGridRequest.startRow != undefined && agGridRequest.endRow != undefined) {
        requestArgs.startIndex = agGridRequest.startRow;
        const pageSize: number = agGridRequest.endRow - agGridRequest.startRow;
        requestArgs.rowsCount = pageSize;
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
            }
            else {
              filterGroup.addFilter({ key: column, value: filterModel.filter, operator: this.getConditionOperator({ agGridOperator: filterModel.type }) });
            }
          }
          requestArgs.filterGroup = filterGroup;
        }
      }
      if (agGridRequest.sortModel) {
        if (agGridRequest.length > 0) {
          const sortOrder: AcSortOrder = new AcSortOrder();
          for (const sortModel of agGridRequest.sortModel) {
            sortOrder.addSort({ key: sortModel.colId, order: sortModel.sort });
          }
          requestArgs.sortOrder = sortOrder;
        }
      }
    }
  }

  private handleColumnsCustomizerToggle(args: IAcDatagridColumnsCustomizerHookArgs) {
    if (args.value) {
      this.gridApi.openToolPanel('columns');
    } else {
      this.gridApi.closeToolPanel();
    }
  }

  private handleDataChange() {
    const data: any[] = [];
    for (const datagridRow of this.datagridApi.datagridRows) {
      const rowData: any = datagridRow.data;
      rowData[this.rowKey] = datagridRow.acRowId;
      data.push(rowData);
    }
    const hookArgs: IAcDatagriOnAgGridDataChangeHookArgs = {
      data: data
    }
    this.datagridApi.hooks.execute({ hook: AcEnumDatagridOnAgGridHook.DataChange, args: hookArgs });
    this.data = data;
    if (this.isClientSideData) {
      this.gridOptions['rowData'] = this.data;
      this.gridApi.setGridOption('rowData', this.data);
    }

  }

  private handleDataExportXlsx(args: IAcDatagridDataExportXlsxExportCallHookArgs) {
    if (this.isClientSideData) {
      this.gridApi.exportDataAsExcel({ fileName: args.args.fileName });
    }
    else {
      // await this.getAllServerSideRows();
      // callbackFunction();
    }
  }

  private handleDataSourceTypeChange(args: IAcDatagridDataSourceTypeChangeHookArgs) {
    if (args.dataSourceType == AcEnumDataSourceType.Offline) {
      this.isClientSideData = true;
    }
    else {
      this.isClientSideData = false;
      this.gridOptions['rowModelType'] = 'serverSide';
      this.gridOptions['serverSideDatasource'] = this.onDemandDataSource;
      this.initAgGrid('serverSide');
    }
  }

  private handleExtensionEnabled(args: IAcDatagridExtensionEnabledHookArgs) {
    if (args.extensionName == AcEnumDatagridExtension.AfterRowsFooter) {
      this.setAfterRowsFooterExtension();
    }
    else if (args.extensionName == AcEnumDatagridExtension.RowNumbers) {
      this.setRowNumbersExtension();
    }
    else if (args.extensionName == AcEnumDatagridExtension.ColumnDragging) {
      this.setColumnDraggingExtension();
    }
    else if (args.extensionName == AcEnumDatagridExtension.DataExportXlsx) {
      this.setDataExportXlsxExtension();
    }
    else if (args.extensionName == AcEnumDatagridExtension.RowDragging) {
      this.setColumnDefs();
    }
  }

  private handleGetOnDemandDataSuccessCallback(args: IAcDatagridGetOnDemandDataSuccessCallbackHookArgs) {
    if (this.onDemandRequestParams) {
      const response = args.responseArgs;
      this.onDemandRequestParams.success({ rowData: response.data, rowCount: response.totalCount });
      this.onDemandRequestParams = undefined;
    }
  }

  override handleHook({ hook, args }: { hook: string; args: any; }): void {
    if (stringEqualsIgnoreCase(hook, AcEnumDatagridHook.BeforeGetOnDemandData)) {
      this.handleBeforeGetOnDemandData(args);
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridHook.CellFocus)) {
      this.navigate = true;
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridHook.ColumnDefinitionsChange)) {
      this.setColumnDefs();
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridHook.DataChange)) {
      this.handleDataChange();
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridHook.DataSourceTypeChange)) {
      this.handleDataSourceTypeChange(args);
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridHook.ExtensionEnable)) {
      this.handleExtensionEnabled(args);
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridHook.GetOnDemandDataSuccessCallback)) {
      this.handleGetOnDemandDataSuccessCallback(args);
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridHook.RefreshRows)) {
      this.handleRefreshRows(args);
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridHook.RowAdd)) {
      this.handleRowAdd(args);
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridHook.RowDelete)) {
      this.handleRowDelete(args);
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridHook.RowFocus)) {
      this.handleRowFocus(args);
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridHook.RowUpdate)) {
      this.handleRowUpdate(args);
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridHook.UsePaginationChange)) {
      this.handleUsePaginationChange();
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridRowNumbersHook.ShowRowNumbersChange)) {
      this.setShowRowNumbers();
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridColumnsCustomizerHook.ShowColumnsCustomizerPanelChange)) {
      this.setColumnsCustomizerExtension();
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridColumnsCustomizerHook.ToggleColumnsCustomizerPanel)) {
      this.handleColumnsCustomizerToggle(args);
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridColumnDraggingHook.AllowColumnDraggingChange)) {
      this.setColumnDragging();
    }
    else if (stringEqualsIgnoreCase(hook, AcEnumDatagridDataExportXlsxHook.ExportData)) {
      this.handleDataExportXlsx(args);
    }
  }

  private handleRefreshRows(args: IAcDatagridRowAddHookArgs){
    if (!this.isClientSideData) {
      this.gridApi.refreshServerSide({ purge: true });
    }
    else {
      this.gridApi.updateGridOptions({
        rowData: this.data,
      });
    }
  }

  private handleRowAdd(args: IAcDatagridRowAddHookArgs) {
    const data: any = args.datagridRow.data;
    if (this.isClientSideData) {
      data[this.rowKey] = args.datagridRow.acRowId;
      const hookArgs: IAcDatagriOnAgGridRowAddHookArgs = {
        data: data
      };
      this.datagridApi.hooks.execute({ hook: AcEnumDatagridOnAgGridHook.BeforeRowAdd, args: hookArgs });
      if (args.append) {
        this.gridApi.applyTransaction({ add: [data] });
      }
      else {
        this.gridApi.applyTransaction({ add: [data], addIndex: 0 });
      }
      const rowIndex = this.gridApi.getDisplayedRowCount() - 1;
      const rowNode: any = this.gridApi.getDisplayedRowAtIndex(rowIndex);
      this.gridApi.refreshCells({ rowNodes: [rowNode], force: true });
      this.gridApi.redrawRows();
      if (args.highlightCells) {
        this.gridApi.flashCells({
          rowNodes: [rowNode], fadeDuration: 1000, flashDuration: 1000
        });
      }
    }
    else {
      this.gridApi.applyServerSideTransaction({ add: [data] });
    }
  }

  private handleRowDelete(args: IAcDatagridRowDeleteHookArgs) {
    if (this.isClientSideData) {
      this.gridApi.applyTransaction({ remove: [args.datagridRow.data] });
    }
    else {
      this.gridApi.applyServerSideTransaction({ remove: [args.datagridRow.data] });
    }
  }

  private handleRowFocus(args: IAcDatagridRowFocusHookArgs) {
    const pageSize = this.gridApi.paginationGetPageSize();
    const newIndex = args.index;
    let targetPage = 1;
    if (newIndex >= 0) {
      targetPage = Math.floor(newIndex / pageSize);
    }
    const activePage = this.gridApi.paginationGetCurrentPage();
    if (activePage != targetPage) {
      this.gridApi.paginationGoToPage(targetPage);
    }
    this.gridApi.ensureIndexVisible(newIndex, 'middle');
    if (args.highlightCells) {
      const node = this.gridApi.getDisplayedRowAtIndex(newIndex);
      if (node) {
        this.gridApi.flashCells({ rowNodes: [node] });
      }
    }
  }

  private handleRowUpdate(args: IAcDatagridRowUpdateHookArgs) {
    const data = args.datagridRow.data;
    const hookArgs: IAcDatagriOnAgGridRowUpdateHookArgs = {
      data: data
    };
    this.datagridApi.hooks.execute({ hook: AcEnumDatagridOnAgGridHook.BeforeRowUpdate, args: hookArgs });
    let rowNode: any;
    this.gridApi.forEachNode((node: IRowNode, index: number) => {
      if (node.data[this.rowKey] == args.datagridRow.acRowId) {
        rowNode = node;
      }
    });
    if (rowNode) {
      if (this.isClientSideData) {
        rowNode.setData(data);
      }
      else {
        data[this.rowKey] = args.datagridRow.acRowId;
        this.gridApi.applyServerSideTransaction({ update: [data] });
        rowNode.setData(data);
      }
      if (args.highlightCells) {
        this.gridApi.flashCells({
          rowNodes: [rowNode], fadeDuration: 1000, flashDuration: 1000
        });
      }
    }
  }

  private handleUsePaginationChange() {
    this.gridOptions['pagination'] = this.datagridApi.usePagination;
    this.gridApi.setGridOption('pagination', this.datagridApi.usePagination);
  }

  override init(): void {
    this.initAgGrid('clientSide');
    this.agGridEventHandler = new AcDatagridOnAgGridEventHandler({ agGridExtension: this });
    this.agGridEventHandler.registerAgGridListeners();
    new AcDatagridRowSelectionExtensionOnAgGrid({ agGridExtension: this });
    new AcDatagridTreeTableExtensionOnAgGrid({ agGridExtension: this });
    new AcDatagridRowDraggingExtensionOnAgGrid({ agGridExtension: this });
    this.setAfterRowsFooterExtension();
    this.setColumnsCustomizerExtension();
    this.setColumnDraggingExtension();
    this.setRowNumbersExtension();
  }

  private initAgGrid(modelType: RowModelType) {
    this.datagridApi.datagrid.element.innerHTML = "";
    this.datagridApi.datagrid.element.append(this.agGridElement);
    this.gridOptions['rowModelType'] = modelType;
    this.gridApi = createGrid(this.datagridApi.datagrid.element, this.gridOptions);
  }

  private registerModules() {
    ModuleRegistry.registerModules([AllCommunityModule, AllEnterpriseModule]);
  }

  setAfterRowsFooterExtension() {
    if (this.datagridApi.extensions[AcEnumDatagridExtension.AfterRowsFooter]) {
      this.afterRowsFooterExtension = this.datagridApi.extensions[AcEnumDatagridExtension.AfterRowsFooter] as AcDatagridAfterRowsFooterExtension;
      this.setAfterRowsFooter();
    }
  }

  setAfterRowsFooter() {
    if (this.afterRowsFooterExtension) {
      let retryOperation: boolean = true;
      if (this.datagridApi.datagrid && this.datagridApi.datagrid.element && this.afterRowsFooterExtension.footerElement) {
        const containerElement = this.datagridApi.datagrid.element.querySelector(".ag-center-cols-viewport");
        if (containerElement) {
          retryOperation = false;
          containerElement.append(this.afterRowsFooterExtension.footerElement);
        }
      }
      if (retryOperation) {
        setTimeout(() => {
          this.setAfterRowsFooter();
        }, 100);
      }
    }
  }

  setColumnDefs() {
    const colDefs: ColDef[] = [];
    const beforeHookArgs: IAcDatagriOnAgGridColDefsChangeHookArgs = {
      colDefs: colDefs
    }
    this.datagridApi.hooks.execute({ hook: AcEnumDatagridOnAgGridHook.BeforeColDefsChange, args: beforeHookArgs });
    for (const column of this.datagridApi.datagridColumns) {
      colDefs.push(this.getColDefFromAcDataGridColumn(column));
    }
    this.colDefs = colDefs;
    const hookArgs: IAcDatagriOnAgGridColDefsChangeHookArgs = {
      colDefs: colDefs
    }
    this.datagridApi.hooks.execute({ hook: AcEnumDatagridOnAgGridHook.ColDefsChange, args: hookArgs });
    this.gridOptions['columnDefs'] = this.colDefs;
    this.gridApi.setGridOption('columnDefs', this.colDefs);
  }

  setColumnDraggingExtension() {
    if (this.datagridApi.extensions[AcEnumDatagridExtension.ColumnDragging]) {
      this.columnDraggingExtension = this.datagridApi.extensions[AcEnumDatagridExtension.ColumnDragging] as AcDatagridColumnDraggingExtension;
      this.setColumnDragging();
    }
  }

  setColumnDragging() {
    if (this.columnDraggingExtension) {
      this.allowColumnDragging = this.columnDraggingExtension.allowColumnDragging;
      this.setColumnDefs();
    }
  }

  setColumnsCustomizerExtension() {
    if (this.datagridApi.extensions[AcEnumDatagridExtension.ColumnsCustomizer]) {
      this.columnsCustomizerExtension = this.datagridApi.extensions[AcEnumDatagridExtension.ColumnsCustomizer] as AcDatagridColumnsCustomizerExtension;
      this.setShowColumnsCustomizer();
    }
  }

  setDataExportXlsxExtension() {
    if (this.datagridApi.extensions[AcEnumDatagridExtension.DataExportXlsx]) {
      this.dataExportXlsxExtension = this.datagridApi.extensions[AcEnumDatagridExtension.DataExportXlsx] as AcDatagridDataExportXlsxExtension;
    }
  }

  setRowNumbersExtension() {
    if (this.datagridApi.extensions[AcEnumDatagridExtension.RowNumbers]) {
      this.rowNumbersExtension = this.datagridApi.extensions[AcEnumDatagridExtension.RowNumbers] as AcDatagridRowNumbersExtension;
      this.setShowRowNumbers();
    }
  }

  setShowColumnsCustomizer() {
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
      }
    }
    this.gridOptions['sideBar'] = sideBarOptions;
    this.gridApi.setGridOption('sideBar', sideBarOptions);
  }

  setShowRowNumbers() {
    let showRowNumbers: boolean = false;
    if (this.rowNumbersExtension) {
      if (this.rowNumbersExtension.showRowNumbers == true) {
        showRowNumbers = true;
      }
    }
    this.gridOptions['rowNumbers'] = showRowNumbers;
    this.gridApi.setGridOption('rowNumbers', showRowNumbers);
  }

  override setState({ state }: { state: any; }): void {
    if (state) {
      this.agGridEventHandler.ignoreEvents = true;
      this.gridApi.setState(state);
      setTimeout(() => {
        this.agGridEventHandler.ignoreEvents = false;
      }, 100);
    }
  }

}

export const AcDatagridOnAgGridExtensionName = 'agGridOnAcDatagrid';

export const AgGridOnAcDatagrid: IAcDatagridExtension = {
  extensionName: AcDatagridOnAgGridExtensionName,
  extensionClass: AcDatagridOnAgGridExtension
}

