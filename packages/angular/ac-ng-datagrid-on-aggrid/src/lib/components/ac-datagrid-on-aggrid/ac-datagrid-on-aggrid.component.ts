/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { ApplyColumnStateParams, CellClickedEvent, CellDoubleClickedEvent, CellEditingStartedEvent, CellEditingStoppedEvent, CellKeyDownEvent, CellMouseDownEvent, CellMouseOutEvent, CellMouseOverEvent, CellValueChangedEvent, ColDef, ColumnHeaderClickedEvent, ColumnMovedEvent, ColumnResizedEvent, ColumnValueChangedEvent, ColumnVisibleEvent, ComponentStateChangedEvent, FilterChangedEvent, FilterModifiedEvent, FilterOpenedEvent, FullWidthCellKeyDownEvent, GetRowIdFunc, GetRowIdParams, GridApi, GridReadyEvent, IDatasource, IGetRowsParams, IServerSideDatasource, IServerSideGetRowsParams, IServerSideGroupSelectionState, IServerSideSelectionState, PaginationChangedEvent, RowClickedEvent, RowDataUpdatedEvent, RowDoubleClickedEvent, RowEditingStartedEvent, RowEditingStoppedEvent, RowModelType, RowNode, RowValueChangedEvent, SelectionChangedEvent, ServerSideTransaction, SortChangedEvent, StateUpdatedEvent, ValueFormatterParams } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { AgGridCellEditorComponent } from '../ag-grid-cell-editor/ag-grid-cell-editor.component';
import { AgGridCellRenderComponent } from '../ag-grid-cell-render/ag-grid-cell-render.component';
import { AgGridHeaderCellComponent } from '../ag-grid-header-cell/ag-grid-header-cell.component';
import { AcPromiseInstance, AcPromiseManager } from '@autocode-ts/autocode';
import { AcDatagridColumnComponent, IAcDataGridColumn, IAcDataGridDataOnDemandParams, IAcDataGridDataOnDemandResponse, IAcDataGridFilterCondition, IAcDataGridFilterGroup, IAcDataGridSort, AcEnumColumnDataType, AcEnumFormatDateTime, AcEnumFormatNumber, AcDataGrid, AcBase } from '@autocode-ts/ac-angular';
import moment from 'moment';
import { stringConvertCase } from '@autocode-ts/ac-extensions';

export const agModulesRegistered: boolean = false;
export function registerAgModules() {
  ModuleRegistry.registerModules([AllCommunityModule]);
  ModuleRegistry.registerModules([AllEnterpriseModule]);
}
registerAgModules();


@Component({
  selector: 'ac-datagrid-on-aggrid',
  standalone: false,
  templateUrl: './ac-datagrid-on-aggrid.component.html',
  styleUrl: './ac-datagrid-on-aggrid.component.scss'
})
export class AcDatagridOnAgGridComponent extends AcBase {
  @ContentChildren(AcDatagridColumnComponent) columnComponents?: QueryList<AcDatagridColumnComponent>;

  @ViewChild('acGrid') agGrid!: AgGridAngular;

  @Input() autoAddNewRow: boolean = false;
  @Input() selectMultiple: boolean = true;
  @Input() columns: IAcDataGridColumn[] = [];
  @Input() dataOnDemandFunction?: Function;
  @Input() defaultPageSize: number = 20;
  @Input() editable: boolean = false;
  @Input() pagination: boolean = true;
  @Input() pageSizes: number[] = [20, 50, 100, 500, 100];
  @Input() filterSearchValue: string = "";
  @Input() footerTemplate?: TemplateRef<any>;

  private _data: any[] = [];
  get data(): any[] { return this._data; }
  @Input() set data(value: any[]) {
    this._data = value;
    let index = 0;
    if(Array.isArray(this._data)){
      for(const row of this._data){
        row[this.rowKey] = index;
        index++;
      }
    }
    if (this.agGridApi && this.agGrid) {
      this.agGridApi.updateGridOptions({
        rowData: this.data,
      });
    }
  }

  @Output() onActiveRowChange: EventEmitter<any> = new EventEmitter();
  @Output() onCellClicked: EventEmitter<any> = new EventEmitter();
  @Output() onCellDoubleClicked: EventEmitter<any> = new EventEmitter();
  @Output() onCellEditingStarted: EventEmitter<any> = new EventEmitter();
  @Output() onCellEditingStopped: EventEmitter<any> = new EventEmitter();
  @Output() onCellEditorComponentBeforeInit: EventEmitter<any> = new EventEmitter();
  @Output() onCellEditorComponentDestroy: EventEmitter<any> = new EventEmitter();
  @Output() onCellEditorComponentInit: EventEmitter<any> = new EventEmitter();
  @Output() onCellFocused: EventEmitter<any> = new EventEmitter();
  @Output() onCellKeyDown: EventEmitter<any> = new EventEmitter();
  @Output() onCellMouseDown: EventEmitter<any> = new EventEmitter();
  @Output() onCellMouseOut: EventEmitter<any> = new EventEmitter();
  @Output() onCellMouseOver: EventEmitter<any> = new EventEmitter();
  @Output() onCellRenderComponentBeforeInit: EventEmitter<any> = new EventEmitter();
  @Output() onCellRenderComponentDestroy: EventEmitter<any> = new EventEmitter();
  @Output() onCellRenderComponentInit: EventEmitter<any> = new EventEmitter();
  @Output() onCellValueChanged: EventEmitter<any> = new EventEmitter();
  @Output() onColumnHeaderClicked: EventEmitter<any> = new EventEmitter();
  @Output() onColumnMoved: EventEmitter<any> = new EventEmitter();
  @Output() onColumnResized: EventEmitter<any> = new EventEmitter();
  @Output() onColumnValueChanged: EventEmitter<any> = new EventEmitter();
  @Output() onColumnVisibilityChanged: EventEmitter<any> = new EventEmitter();
  @Output() onFilterChanged: EventEmitter<any> = new EventEmitter();
  @Output() onFilterModified: EventEmitter<any> = new EventEmitter();
  @Output() onFilterOpened: EventEmitter<any> = new EventEmitter();
  @Output() onGridReady: EventEmitter<any> = new EventEmitter();
  @Output() onPaginationChanged: EventEmitter<any> = new EventEmitter();
  @Output() onRowAdded: EventEmitter<any> = new EventEmitter();
  @Output() onRowClicked: EventEmitter<any> = new EventEmitter();
  @Output() onRowDataUpdated: EventEmitter<any> = new EventEmitter();
  @Output() onRowDeleted: EventEmitter<any> = new EventEmitter();
  @Output() onRowDoubleClicked: EventEmitter<any> = new EventEmitter();
  @Output() onRowEditingStarted: EventEmitter<any> = new EventEmitter();
  @Output() onRowEditingStopped: EventEmitter<any> = new EventEmitter();
  @Output() onRowFocus: EventEmitter<any> = new EventEmitter();
  @Output() onRowSelected: EventEmitter<any> = new EventEmitter();
  @Output() onRowUpdated: EventEmitter<any> = new EventEmitter();
  @Output() onRowValueChanged: EventEmitter<any> = new EventEmitter();
  @Output() onSelectionChanged: EventEmitter<any> = new EventEmitter();
  @Output() onSortChanged: EventEmitter<any> = new EventEmitter();
  @Output() onStateUpdated: EventEmitter<any> = new EventEmitter();

  get totalRows(): number {
    let result: number = 0;
    if (this.agGridApi) {
      result = this.agGridApi.getDisplayedRowCount();
    }
    return result;
  }

  get isClientSideData(): boolean {
    let result: boolean = true;
    if (this.dataOnDemandFunction) {
      result = false;
    }
    return result;
  }

  activeRowIndex: number = -1;
  agGridApi!: GridApi;
  colDefs: ColDef[] = [];
  customComponents = {
    'agGridCellEditor': AgGridCellEditorComponent,
    'agGridCellRenderer': AgGridCellRenderComponent,
  };
  dataSource: IServerSideDatasource = {
    getRows: (params: IServerSideGetRowsParams) => {
      const requestParams: IAcDataGridDataOnDemandParams = {};
      const successCallback: Function = (response: IAcDataGridDataOnDemandResponse) => {
        if (!Array.isArray(response.data)) {
          response.data = [];
        }
        let pageNumber: number = 0;
        if (requestParams.pageNumber > 0) {
          pageNumber = requestParams.pageNumber - 1;
        }
        let pageSize: number = 0;
        if (requestParams.pageSize > 0) {
          pageSize = requestParams.pageSize
        }
        let startIndex: number = pageNumber * pageSize;
        for (const row of response.data) {
          row[this.rowKey] = startIndex;
          startIndex++;
        }
        params.success({ rowData: response.data, rowCount: response.totalCount });
      }
      requestParams.successCallback = successCallback;
      const pageSize: number = params.request.endRow - params.request.startRow;
      const pageNumber: number = (params.request.startRow / pageSize) + 1;
      requestParams.pageNumber = pageNumber;
      requestParams.pageSize = pageSize;
      if (params.request.filterModel) {
        const filterColumns: string[] = Object.keys(params.request.filterModel);
        if (filterColumns.length > 0) {
          const filterGroup: IAcDataGridFilterGroup = {
            operator: 'and',
            conditions: []
          };
          for (const column of filterColumns) {
            const filterModel = params.request.filterModel[column];
            if (filterModel.conditions) {
              const columnFilterGroup: IAcDataGridFilterGroup = {
                operator: filterModel.operator.toLowerCase(),
                conditions: []
              }
              for (const condition of filterModel.conditions) {
                const filterCondition: IAcDataGridFilterCondition = {
                  column_name: column,
                  operator: condition.type,
                  value: condition.filter
                };
                columnFilterGroup.conditions.push(filterCondition);
              }
              filterGroup.conditions.push(columnFilterGroup);
            }
            else {
              const filterCondition: IAcDataGridFilterCondition = {
                column_name: column,
                operator: filterModel.type,
                value: filterModel.filter
              };
              filterGroup.conditions.push(filterCondition);
            }
          }
          requestParams.filterGroup = filterGroup;
        }
      }
      if (this.filterSearchValue && this.filterSearchValue != "") {
        const searchFilterGroup: IAcDataGridFilterGroup = {
          operator: 'or',
          conditions: []
        };
        const visibleColumns: ColDef[] = this.getVisibleColumns();
        for (const column of visibleColumns) {
          if (column.field && column.filter) {
            const filterCondition: IAcDataGridFilterCondition = {
              column_name: column.field,
              operator: this.getAcFilterOperatorFromAgGridOperator('contains'),
              value: this.filterSearchValue
            };
            searchFilterGroup.conditions.push(filterCondition);
          }

        }
        if (requestParams.filterGroup) {
          requestParams.filterGroup.conditions.push(searchFilterGroup);
        }
        else {
          requestParams.filterGroup = searchFilterGroup;
        }
      }
      if (params.request.sortModel) {
        if (params.request.sortModel.length > 0) {
          const sort: IAcDataGridSort[] = [];
          for (const sortModel of params.request.sortModel) {
            sort.push({ column_name: sortModel.colId, order: sortModel.sort });
          }
          requestParams.sortOrder = sort;
        }
      }
      this.lastOnDemandParams = requestParams;
      this.dataOnDemandFunction?.(requestParams);
    }
  };
  defaultColDef: ColDef = {
    flex: 1,
  };

  getRowId: GetRowIdFunc = (params: GetRowIdParams) => {
    return params.data[this.rowKey];
  };

  private lastOnDemandParams: IAcDataGridDataOnDemandParams | undefined;
  private promiseManager: AcPromiseManager = new AcPromiseManager();
  private rowKey: string = "__ac_datagrid_id__";
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
  };

  override ngAfterViewInit() {
    super.ngAfterViewInit();
    this.initAgGrid();
    this.initGridFooter();
  }

  addRow({ data, append = true }: { data?: any, append?: boolean } = {}) {
    if (this.isClientSideData) {
      if(data == undefined){
        data = {};
      }
      data[this.rowKey] = this.agGridApi.getDisplayedRowCount();
      if (append) {
        this.agGridApi.applyTransaction({ add: [data] });
      }
      else {
        this.agGridApi.applyTransaction({ add: [data], addIndex: 0 });
      }
      const rowIndex = this.agGridApi.getDisplayedRowCount() - 1;
      const rowNode = this.agGridApi.getDisplayedRowAtIndex(rowIndex);
      this.agGridApi.refreshCells({ rowNodes: [rowNode], force: true });
      this.agGridApi.redrawRows();
    }
    else {
      if (data == undefined) {
        data = {};
      }
      data[this.rowKey] = this.getTotalRowCount();
      this.agGridApi.applyServerSideTransaction({ add: [data] });
    }
    const event: any = {
      data: data
    };
    this.onRowAdded.emit(event);
    this.events.execute({ eventName: 'rowAdded', args: event });
  }

  clearSelection() {
    this.agGridApi.deselectAll();
  }

  deleteRow({ data, index, key, value }: { data?: any, index?: number, key?: string, value?: any }) {
    if (index >= 0) {
      data = this.agGridApi.getDisplayedRowAtIndex(index);
    }
    else if (key && value) {
      this.agGridApi.forEachNode((node: RowNode) => {
        if (key) {
          if (node.data[key] === value) {
            data = node.data;
          }
        }
      });
    }
    if (data) {
      if (this.isClientSideData) {
        this.agGridApi.applyTransaction({ remove: [data] });
      }
      else {
        let deleteData: any;
        this.agGridApi.forEachNode((node: RowNode) => {
          if (node.data === data) {
            deleteData = node.data;
          }
        });
        this.agGridApi.applyServerSideTransaction({ remove: [deleteData] });
      }
      const event: any = {
        data: data
      };
      this.onRowDeleted.emit(event);
      this.events.execute({ eventName: 'rowDeleted', args: event });
    }
  }

  async exportData({ format = 'excel', fileName = 'Datagrid Export.xlsx' }: { format?: string, fileName?: string } = {}) {
    const callbackFunction: Function = () => {
      if (format.toLowerCase() == 'excel') {
        this.agGridApi.exportDataAsExcel({ fileName: fileName });
      }
      if (format.toLowerCase() == 'csv') {
        this.agGridApi.exportDataAsCsv({ fileName: fileName });
      }
    }
    if (this.isClientSideData) {
      callbackFunction();
    }
    else {
      await this.getAllServerSideRows();
      callbackFunction();
    }
  }

  focusFirstRow() {
    if (this.agGridApi && this.colDefs.length > 0) {
      this.agGridApi.setFocusedCell(0, this.colDefs[0].field);
    }
  }

  getAcFilterOperatorFromAgGridOperator(operator: any) {
    const result = operator;
    return result;
  }

  getAgDataTypeFromAcDataType(dataType: any) {
    let result: any = 'text';
    if (dataType == AcEnumColumnDataType.boolean) {
      result = 'boolean';
    }
    else if (dataType == AcEnumColumnDataType.date || dataType == AcEnumColumnDataType.datetime) {
      result = 'dateString';
    }
    else if (dataType == AcEnumColumnDataType.custom || dataType == AcEnumColumnDataType.object) {
      result = 'object';
    }
    else if (dataType == AcEnumColumnDataType.number) {
      result = 'number';
    }
    return result;

  }

  private getAgDataGridColumnFromAcDataGridColumn(column: IAcDataGridColumn): ColDef {
    let editable: boolean = this.editable;
    if (column.allowEdit != undefined) {
      editable = column.allowEdit;
    }
    const colDef: ColDef = {
      field: column.field,
      headerName: column.title,
      width: column.width,
      minWidth: column.minWidth,
      maxWidth: column.maxWidth,
      type: this.getAgDataTypeFromAcDataType(column.dataType),
      editable: editable,
      filter: column.allowFilter == false ? false : true,
      sortable: column.allowSort == false ? false : true,
      checkboxSelection: column.allowSelect,
      cellClass: column.cellClass,
      headerClass: column.headerClass,
      headerCheckboxSelection: column.allowSelect,
      headerComponent: AgGridHeaderCellComponent
    };
    const handleEditorComponentBeforeInit: Function = (instance: AgGridCellEditorComponent) => {
      this.log("cellEditorComponentBeforeInit");
      this.onCellEditorComponentBeforeInit.emit(instance);
      this.events.execute({ eventName: 'cellEditorComponentBeforeInit', args: instance });
    };
    const handleEditorComponentDestroy: Function = (instance: AgGridCellEditorComponent) => {
      this.log("cellEditorComponentDestroy");
      this.onCellEditorComponentDestroy.emit(instance);
      this.events.execute({ eventName: 'cellEditorComponentDestroy', args: instance });
    };
    const handleEditorComponentInit: Function = (instance: AgGridCellEditorComponent) => {
      this.log("cellEditorComponentInit");
      this.onCellEditorComponentInit.emit(instance);
      this.events.execute({ eventName: 'cellEditorComponentInit', args: instance });
    };
    const handleRenderComponentBeforeInit: Function = (instance: AgGridCellRenderComponent) => {
      this.log("cellRenderComponentBeforeInit");
      this.onCellRenderComponentBeforeInit.emit(instance);
      this.events.execute({ eventName: 'cellRenderComponentBeforeInit', args: instance });
    };
    const handleRenderComponentDestroy: Function = (instance: AgGridCellRenderComponent) => {
      this.log("cellRenderComponentDestroy");
      this.onCellRenderComponentBeforeInit.emit(instance);
      this.events.execute({ eventName: 'cellRenderComponentBeforeInit', args: instance });
    };
    const handleRenderComponentInit: Function = (instance: AgGridCellRenderComponent) => {
      this.log("cellRenderComponentInit");
      this.onCellRenderComponentInit.emit(instance);
      this.events.execute({ eventName: 'cellRenderComponentInit', args: instance });
    };
    let useSameForEdit: boolean = false;
    if (column.useSameComponentForEditing != undefined) {
      useSameForEdit = column.useSameComponentForEditing;
    }
    if (column.component || column.renderTemplate) {
      colDef.cellRenderer = AgGridCellRenderComponent;
      colDef.cellRendererParams = {
        acDatagridColumn: column,
        onComponentBeforeInit: handleRenderComponentBeforeInit,
        onComponentDestroy: handleRenderComponentDestroy,
        onComponentInit: handleRenderComponentInit
      };
      if (column.component) {
        if (useSameForEdit) {
          column.editComponent = column.component;
          column.editComponentProperties = column.componentProperties;
        }
        colDef.cellRendererParams["component"] = column.component;
        colDef.cellRendererParams["componentProperties"] = column.componentProperties;
      }
      else {
        if (useSameForEdit) {
          column.editTemplate = column.renderTemplate;
        }
        colDef.cellRendererParams["template"] = column.renderTemplate;
      }

    }
    if ((column.editComponent || column.editTemplate)) {
      colDef.cellEditor = AgGridCellEditorComponent;
      colDef.cellEditorParams = {
        acDatagridColumn: column,
        onComponentBeforeInit: handleEditorComponentBeforeInit,
        onComponentDestroy: handleEditorComponentDestroy,
        onComponentInit: handleEditorComponentInit
      };
      if (column.component) {
        colDef.cellEditorParams["component"] = column.editComponent;
        colDef.cellEditorParams["componentProperties"] = column.editComponentProperties;
      }
      else {
        colDef.cellEditorParams["template"] = column.editTemplate;
      }
    }
    if (column.allowCustomization == false) {
      colDef.suppressColumnsToolPanel = true;
    }
    if (column.formatNumber || column.formatDate || column.formatDateTime || column.formatString) {
      colDef.valueFormatter = (params: ValueFormatterParams) => {
        if (params.value == null) {
          return ''; // Handle empty values gracefully
        }
        if (column.formatDateTime) {
          if (column.formatDateTime == AcEnumFormatDateTime.display) {
            return moment(params.value).format('DD-MM-YYYY hh:mm:ss A');
          }
          else if (column.formatDateTime == AcEnumFormatDateTime.input) {
            return moment(params.value).format('YYYY-MM-DD HH:mm:ss');
          }
          else {
            return moment(params.value).format(column.formatDateTime);
          }
        }
        else if (column.formatDate) {
          if (column.formatDate == AcEnumFormatDateTime.display) {
            return moment(params.value).format('DD-MM-YYYY');
          }
          else if (column.formatDate == AcEnumFormatDateTime.input) {
            return moment(params.value).format('YYYY-MM-DD');
          }
          else {
            return moment(params.value).format(column.formatDate);
          }
        }
        else if (column.formatNumber) {
          let formatter = new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
          if (column.formatNumber == AcEnumFormatNumber.currency) {
            formatter = new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: AcDataGrid.currency,
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            });
          }
          else if (column.formatNumber == AcEnumFormatNumber.percentage) {
            formatter = new Intl.NumberFormat('en-IN', {
              style: 'percent',
              currency: 'INR',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            });
          }
          return formatter.format(params.value);
        }
        else if (column.formatString) {
          return stringConvertCase(params.value, column.formatString);
        }
        else {
          return params.value;
        }
      };
    }
    if (column.valueFormatter) {
      colDef.valueFormatter = (params: ValueFormatterParams) => {
        return column.valueFormatter(params);
      };
    }
    return colDef;
  }

  getAllServerSideRows() {
    const promiseInstance: AcPromiseInstance = this.promiseManager.create();
    const successCallback: Function = (response: IAcDataGridDataOnDemandResponse) => {
      if (!Array.isArray(response.data)) {
        response.data = [];
      }
      let startIndex: number = 0;
      for (const row of response.data) {
        row[this.rowKey] = startIndex;
        startIndex++;
      }
      this.agGridApi.applyServerSideRowData({ successParams: { rowData: response.data, rowCount: response.totalCount } });
      this.promiseManager.resolve(promiseInstance.id);
    };
    const requestData: IAcDataGridDataOnDemandParams = { ...this.lastOnDemandParams };
    requestData.pageNumber = undefined;
    requestData.pageSize = undefined;
    requestData.successCallback = successCallback;
    this.dataOnDemandFunction(requestData);
    return promiseInstance.promise;
  }

  getAvailableData(): any[] {
    const result: any[] = [];
    this.agGridApi.forEachNode(node => {
      result.push(node.data);
    });
    return result;
  }

  getGridState() {
    const state: any = {};
    state['columns'] = this.agGridApi.getColumnState();
    return state;
  }

  async getSelectedData() {
    let selectedData: any[] = [];
    const promiseInstance: AcPromiseInstance = this.promiseManager.create();
    if (this.isClientSideData) {
      selectedData = this.agGridApi.getSelectedRows();
      this.promiseManager.resolve(promiseInstance.id, selectedData);
    } else {
      const selectionState: any = this.agGridApi.getServerSideSelectionState();
      if (selectionState.selectAll) {
        await this.getAllServerSideRows();
        this.agGridApi.forEachNode((node: RowNode) => {
          if (!selectionState.toggledNodes.includes(node.data[this.rowKey].toString())) {
            selectedData.push(node.data);
          }
        });
        this.promiseManager.resolve(promiseInstance.id, selectedData);
      }
      else {
        selectedData = this.agGridApi.getSelectedRows();
        this.promiseManager.resolve(promiseInstance.id, selectedData);
      }
    }
    return promiseInstance.promise;
  }

  getTotalRowCount() {
    if (!this.agGridApi) {
      return;
    }
    const totalRows = this.agGridApi.getInfiniteRowCount();
    if (totalRows !== undefined) {
      this.log(`The total number of rows on the server is: ${totalRows}`);
      alert(`Total Rows: ${totalRows}`);
    } else {
      this.log("The total row count is not yet known by the grid.");
    }
  }

  getVisibleColumns(): ColDef[] {
    const allColumns = this.agGridApi.getAllDisplayedColumns();
    return allColumns.map(col => col.getColDef());
  }

  handleCellClicked(event: CellClickedEvent) {
    this.onCellClicked.emit(event);
    this.events.execute({ eventName: 'cellClicked', args: event });
  }

  handleCellDoubleClicked(event: CellDoubleClickedEvent) {
    this.onCellDoubleClicked.emit(event);
    this.events.execute({ eventName: 'cellDoubleClicked', args: event });
  }

  handleCellEditingStarted(event: CellEditingStartedEvent) {
    this.onCellEditingStarted.emit(event);
    this.events.execute({ eventName: 'cellEditingStarted', args: event });
    this.log("Cell Editing Started");
  }

  handleCellEditingStopped(event: CellEditingStoppedEvent) {
    this.onCellEditingStopped.emit(event);
    this.events.execute({ eventName: 'cellEditingStopped', args: event });
    this.log("Cell Editing Stopped");
  }

  handleCellFocused(event: any) {
    const rowIndex = event.rowIndex;
    if (this.activeRowIndex != rowIndex) {
      const activeEventParams: any = {
        index: rowIndex,
        oldIndex: this.activeRowIndex
      };
      this.onActiveRowChange.emit(activeEventParams);
      this.events.execute({ eventName: "activeRowChange", args: activeEventParams });
      this.activeRowIndex = rowIndex;
    }
    event.index = rowIndex;
    this.onCellFocused.emit(event);
    this.events.execute({ eventName: 'cellFocused', args: event });
  }

  handleCellKeyDown(event: CellKeyDownEvent | FullWidthCellKeyDownEvent) {
    this.onCellKeyDown.emit(event);
    this.events.execute({ eventName: 'cellKeyDown', args: event });
  }

  handleCellMouseDown(event: CellMouseDownEvent) {
    this.onCellMouseDown.emit(event);
    this.events.execute({ eventName: 'cellMouseDown', args: event });
  }

  handleCellMouseOut(event: CellMouseOutEvent) {
    this.onCellMouseOut.emit(event);
    this.events.execute({ eventName: 'cellMouseOut', args: event });
  }

  handleCellMouseOver(event: CellMouseOverEvent) {
    this.onCellMouseOver.emit(event);
    this.events.execute({ eventName: 'cellMouseOver', args: event });
  }

  handleCellValueChanged(event: any) {
    const rowIndex = event.rowIndex;
    const rowNode = event.node;
    const rowData = rowNode.data;
    if (this.autoAddNewRow) {
      const totalRows = this.agGridApi.getDisplayedRowCount();
      const isRowFilled = Object.values(rowData).some(value => value !== '' && value !== null && value !== undefined);
      if (rowIndex === totalRows - 1 && isRowFilled) {
        this.addRow();
      }
    }
    event.data = rowData;
    event.index = rowIndex;
    this.onCellValueChanged.emit(event);
    this.events.execute({ eventName: 'cellValueChanged', args: event });
  }

  handleColumnHeaderClicked(event: ColumnHeaderClickedEvent) {
    this.onColumnHeaderClicked.emit(event);
    this.events.execute({ eventName: 'columnHeaderClicked', args: event });
  }

  handleColumnMoved(event: ColumnMovedEvent) {
    this.onColumnMoved.emit(event);
    this.events.execute({ eventName: 'columnMouved', args: event });
  }

  handleColumnResized(event: ColumnResizedEvent) {
    this.onColumnResized.emit(event);
    this.events.execute({ eventName: 'columnResized', args: event });
  }

  handleColumnValueChanged(event: ColumnValueChangedEvent) {
    this.onColumnValueChanged.emit(event);
    this.events.execute({ eventName: 'columnValueChanged', args: event });
  }

  handleColumnVisible(event: ColumnVisibleEvent) {
    this.onColumnVisibilityChanged.emit(event);
    this.events.execute({ eventName: 'columnVisibilityChanged', args: event });
  }

  handleComponentStateChanged(event: ComponentStateChangedEvent) {
    // this.log(event);
  }

  handleFilterChanged(event: FilterChangedEvent) {
    this.onFilterChanged.emit(event);
    this.events.execute({ eventName: 'filterChanged', args: event });
  }

  handleFilterModified(event: FilterModifiedEvent) {
    this.onFilterModified.emit(event);
    this.events.execute({ eventName: 'filterModified', args: event });
  }

  handleFilterOpened(event: FilterOpenedEvent) {
    this.onFilterOpened.emit(event);
    this.events.execute({ eventName: 'filterOpened', args: event });
  }

  handleGridReady(event: GridReadyEvent) {
    this.agGridApi = event.api;
    this.onGridReady.emit(event);
    this.events.execute({ eventName: 'gridReady', args: event });
  }

  handlePaginationChanged(event: PaginationChangedEvent) {
    this.onPaginationChanged.emit(event);
    this.events.execute({ eventName: 'paginationChanged', args: event });
  }

  handleRowClicked(event: RowClickedEvent) {
    this.onRowClicked.emit(event);
    this.events.execute({ eventName: 'rowClicked', args: event });
  }

  handleRowDataUpdated(event: RowDataUpdatedEvent) {
    this.onRowDataUpdated.emit(event);
    this.events.execute({ eventName: 'rowDataUpdated', args: event });
  }

  handleRowDoubleClicked(event: RowDoubleClickedEvent) {
    this.onRowDoubleClicked.emit(event);
    this.events.execute({ eventName: 'rowDoubleClicked', args: event });
  }

  handleRowEditingStarted(event: RowEditingStartedEvent) {
    this.onRowEditingStarted.emit(event);
    this.events.execute({ eventName: 'rowEditingStarted', args: event });
  }

  handleRowEditingStopped(event: RowEditingStoppedEvent) {
    this.onRowEditingStopped.emit(event);
    this.events.execute({ eventName: 'rowEditingStopped', args: event });
  }

  handleRowSelected(event: any) {
    this.onRowSelected.emit(event);
    this.events.execute({ eventName: 'rowSelected', args: event });
  }

  handleRowValueChanged(event: RowValueChangedEvent) {
    this.onRowValueChanged.emit(event);
    this.events.execute({ eventName: 'rowValueChanged', args: event });
  }

  handleSelectionChanged(event: SelectionChangedEvent) {
    this.onSelectionChanged.emit(event);
    this.events.execute({ eventName: 'selectionChanged', args: event });
  }

  handleSortChanged(event: SortChangedEvent) {
    this.onSortChanged.emit(event);
    this.events.execute({ eventName: 'sortChanged', args: event });
  }

  handleStateUpdated(event: StateUpdatedEvent) {
    const source = event.sources[0];
    if (['columnSizing', 'columnOrder'].includes(source)) {
      this.onStateUpdated.emit(event);
      this.events.execute({ eventName: 'stateUpdated', args: event });
    }

  }

  initAgGrid() {
    if (this.agGrid) {
      this.agGridApi = this.agGrid.api;
      this.setColumnsFromComponents();
      if (this.dataOnDemandFunction) { /* empty */ }
      else {
        this.agGridApi.updateGridOptions({
          rowData: this.data,
        });
      }
    }
  }

  initGridFooter() {
    let continueOperation: boolean = true;
    if (this.elementRef && this.elementRef.nativeElement) {
      const container: any[] = this.elementRef.nativeElement.getElementsByClassName("ag-center-cols-container");
      if (container.length > 0) {
        continueOperation = false;
        if (this.footerTemplate) {
          const templateViewRef = this.footerTemplate.createEmbeddedView({});
          templateViewRef.detectChanges();
          const parent = container[0].parentNode;

          if (parent) {
            templateViewRef.rootNodes.forEach(node => {
              parent.insertBefore(node, container[0].nextSibling);
            });
          }
        }

      }
      // if(){

      // }
    }
    if (continueOperation) {
      this.initGridFooter();
    }
    // let rowsContainer:any = this.elementRef.nativeElement.getByClassName(".ag-center-cols-container");
  }

  log(...args: any) {
    // console.trace();
    // console.log(args);
  }

  refreshData() {
    this.clearSelection();
    if (this.dataOnDemandFunction) {
      this.agGridApi.refreshServerSide();
    }
    else {
      this.agGridApi.refreshClientSideRowModel();
    }
  }

  setColumnsFromComponents() {
    if (this.columnComponents) {
      for (const column of this.columnComponents) {
        const columnDetails: IAcDataGridColumn = column.columnDetails;
        this.columns.push(columnDetails);
      }
    }
    let index: number = -1;
    const colDefs: any[] = [];
    for (const columnDetails of this.columns) {
      index++;
      columnDetails.index = index;
      colDefs.push(this.getAgDataGridColumnFromAcDataGridColumn(columnDetails));
    }
    this.colDefs = colDefs;
    this.agGridApi.setGridOption('columnDefs', colDefs);
  }

  setDatagridState(state: any) {
    if (state) {
      if (state['columns']) {
        const columnState: ApplyColumnStateParams = {
          state: state['columns'], applyOrder: true
        };
        this.agGridApi.applyColumnState(columnState,);
      }
    }
  }

  toggleColumnsCustomizer() {
    const isOpen = !!this.agGridApi.getOpenedToolPanel();
    if (isOpen) {
      this.agGridApi.closeToolPanel();
    } else {
      this.agGridApi.openToolPanel('columns');
    }
  }

  updateRow({ data, currentData, key, index }: { data: any, currentData?: any, key?: string, index?: number }) {
    if (index >= 0) {
      currentData = this.agGridApi.getDisplayedRowAtIndex(index);
    }
    else {
      this.agGridApi.forEachNode((node: RowNode) => {
        if (key) {
          if (node.data[key] == data[key]) {
            currentData = node.data;
            index = node.rowIndex;
          }
        }
        else if (currentData) {
          if (node.data === currentData) {
            index = node.rowIndex;
          }
        }
      });
    }
    if (index >= 0) {
      const rowNode = this.agGridApi.getDisplayedRowAtIndex(index);
      if (this.isClientSideData) {
        rowNode.setData(data);
      }
      else {
        data[this.rowKey] = currentData[this.rowKey];
        this.agGridApi.applyServerSideTransaction({ update: [data] });
        rowNode.setData(data);
      }
      this.agGridApi.flashCells({
        rowNodes: [rowNode], fadeDuration: 1000, flashDuration: 1000
      });
      const event: any = {
        data: data
      };
      this.onRowUpdated.emit(event);
      this.events.execute({ eventName: 'rowUpdated', args: event });
    }
    else {
      this.addRow({ data: data });
    }
  }


}
