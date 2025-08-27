/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
import { Component, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { ApplyColumnStateParams, CellClickedEvent, CellDoubleClickedEvent, CellEditingStartedEvent, CellEditingStoppedEvent, CellKeyDownEvent, CellMouseDownEvent, CellMouseOutEvent, CellMouseOverEvent, CellSelectionChangedEvent, CellValueChangedEvent, ColDef, ColumnHeaderClickedEvent, ColumnMovedEvent, ColumnResizedEvent, ColumnValueChangedEvent, ColumnVisibleEvent, ComponentStateChangedEvent, FilterChangedEvent, FilterModifiedEvent, FilterOpenedEvent, FullWidthCellKeyDownEvent, GetRowIdFunc, GetRowIdParams, GridApi, GridReadyEvent, IDatasource, IGetRowsParams, IServerSideDatasource, IServerSideGetRowsParams, IServerSideGroupSelectionState, IServerSideSelectionState, PaginationChangedEvent, RowClickedEvent, RowDataUpdatedEvent, RowDoubleClickedEvent, RowEditingStartedEvent, RowEditingStoppedEvent, RowModelType, RowNode, RowValueChangedEvent, SelectionChangedEvent, ServerSideTransaction, SortChangedEvent, StateUpdatedEvent, ValueFormatterParams, RowDragEndEvent } from "ag-grid-community";
import { AllCommunityModule, ClientSideRowModelModule, ModuleRegistry, RowDragModule } from 'ag-grid-community';
import { AllEnterpriseModule, TreeDataModule } from 'ag-grid-enterprise';
import { AgGridCellEditorComponent } from '../ag-grid-cell-editor/ag-grid-cell-editor.component';
import { AgGridCellRenderComponent } from '../ag-grid-cell-render/ag-grid-cell-render.component';
import { AgGridHeaderCellComponent } from '../ag-grid-header-cell/ag-grid-header-cell.component';
import { AcPromiseInstance, AcPromiseManager, Autocode } from '@autocode-ts/autocode';
import { AcDatagridColumnComponent, IAcDataGridColumn, IAcDataGridDataOnDemandParams, IAcDataGridDataOnDemandResponse, IAcDataGridFilterCondition, IAcDataGridFilterGroup, IAcDataGridSort, AcEnumColumnDataType, AcEnumFormatDateTime, AcEnumFormatNumber, AcDataGrid, AcBase } from '@autocode-ts/ac-angular';
// import { AcDatagridColumnComponent, IAcDataGridColumn, IAcDataGridDataOnDemandParams, IAcDataGridDataOnDemandResponse, IAcDataGridFilterCondition, IAcDataGridFilterGroup, IAcDataGridSort, AcEnumColumnDataType, AcEnumFormatDateTime, AcEnumFormatNumber, AcDataGrid, AcBase } from 'packages/angular/ac-angular/src/index';
import moment from 'moment';
import { arrayRemove, stringConvertCase } from '@autocode-ts/ac-extensions';

export const agModulesRegistered: boolean = false;
export function registerAgModules() {
  ModuleRegistry.registerModules([AllCommunityModule, RowDragModule, ClientSideRowModelModule]);
  ModuleRegistry.registerModules([AllEnterpriseModule, TreeDataModule]);
}
registerAgModules();


@Component({
  selector: 'ac-datagrid-on-ag-grid',
  standalone: false,
  templateUrl: './ac-datagrid-on-ag-grid.component.html',
  styleUrl: './ac-datagrid-on-ag-grid.component.scss'
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
  @Input() groupDefaultExpandedLevel:number = 0;
  @Input() groupLabelKey?: string;
  @Input() groupParentKey?: string;
  @Input() groupChildKey?: string;
  @Input() pagination: boolean = true;
  @Input() pageSizes: number[] = [20, 50, 100, 500, 100];
  @Input() filterSearchValue: string = "";
  @Input() footerTemplate?: TemplateRef<any>;

  private _data: any[] = [];
  get data(): any[] { return this._data; }
  @Input() set data(value: any[]) {
    this._data = value;
    if (Array.isArray(this._data)) {
      this.groupParentIndexes = {};
      for (const row of this._data) {
        const rowId = Autocode.uniqueId();
        row[this.rowKey] = rowId;
        if (this.groupParentKey && row[this.groupParentKey]) {
          this.groupParentIndexes[row[this.groupParentKey]] = rowId;
        }
      }
      if (this.groupChildKey) {
        for (const row of this._data) {
          if (row[this.groupChildKey] && this.groupParentIndexes[row[this.groupChildKey]]) {
            row[this.rowGroupParentKey] = this.groupParentIndexes[row[this.groupChildKey]];
          }
          else {
            row[this.rowGroupParentKey] = null;
          }
        }
      }
    }
    if (this.agGridApi && this.agGrid) {
      this.agGridApi.updateGridOptions({
        rowData: this.data,
      });
    }
  }

  @Output() onActiveRowChange: EventEmitter<any> = new EventEmitter();
  @Output() onCellBlurred: EventEmitter<any> = new EventEmitter();
  /* Done */
  @Output() onCellClicked: EventEmitter<any> = new EventEmitter();
  /* Done */
  @Output() onCellDoubleClicked: EventEmitter<any> = new EventEmitter();
  /* Done */
  @Output() onCellEditingStarted: EventEmitter<any> = new EventEmitter();
  /* Done */
  @Output() onCellEditingStopped: EventEmitter<any> = new EventEmitter();
  @Output() onCellEditorComponentBeforeInit: EventEmitter<any> = new EventEmitter();
  @Output() onCellEditorComponentDestroy: EventEmitter<any> = new EventEmitter();
  @Output() onCellEditorComponentInit: EventEmitter<any> = new EventEmitter();
  /* Done */
  @Output() onCellFocused: EventEmitter<any> = new EventEmitter();
  /* Done */
  @Output() onCellKeyDown: EventEmitter<any> = new EventEmitter();
  /* Done */
  @Output() onCellMouseDown: EventEmitter<any> = new EventEmitter();
  /* Done */
  @Output() onCellMouseOut: EventEmitter<any> = new EventEmitter();
  /* Done */
  @Output() onCellMouseOver: EventEmitter<any> = new EventEmitter();
  @Output() onCellRenderComponentBeforeInit: EventEmitter<any> = new EventEmitter();
  @Output() onCellRenderComponentDestroy: EventEmitter<any> = new EventEmitter();
  /* Done */
  @Output() onCellRenderComponentInit: EventEmitter<any> = new EventEmitter();
  /* Done */
  @Output() onCellValueChanged: EventEmitter<any> = new EventEmitter();
  @Output() onColumnHeaderClicked: EventEmitter<any> = new EventEmitter();
  /* Done */
  @Output() onColumnMoved: EventEmitter<any> = new EventEmitter();
  /* Done */
  @Output() onColumnResized: EventEmitter<any> = new EventEmitter();
  @Output() onColumnValueChanged: EventEmitter<any> = new EventEmitter();
  /* Done */
  @Output() onColumnVisibilityChanged: EventEmitter<any> = new EventEmitter();
  @Output() onFilterChanged: EventEmitter<any> = new EventEmitter();
  @Output() onFilterModified: EventEmitter<any> = new EventEmitter();
  @Output() onFilterOpened: EventEmitter<any> = new EventEmitter();
  @Output() onGridReady: EventEmitter<any> = new EventEmitter();
  /* Done */
  @Output() onPaginationChanged: EventEmitter<any> = new EventEmitter();
  /* Done */
  @Output() onRowAdded: EventEmitter<any> = new EventEmitter();
  /* Done */
  @Output() onRowClicked: EventEmitter<any> = new EventEmitter();
  @Output() onRowDataUpdated: EventEmitter<any> = new EventEmitter();
  /* Done */
  @Output() onRowDeleted: EventEmitter<any> = new EventEmitter();
  /* Done */
  @Output() onRowDoubleClicked: EventEmitter<any> = new EventEmitter();
  /* Done */
  @Output() onRowDragEnd: EventEmitter<any> = new EventEmitter();
  /* Done */
  @Output() onRowDragStart: EventEmitter<any> = new EventEmitter();
  @Output() onRowEditingStarted: EventEmitter<any> = new EventEmitter();
  @Output() onRowEditingStopped: EventEmitter<any> = new EventEmitter();
  @Output() onRowFocus: EventEmitter<any> = new EventEmitter();
  @Output() onRowSelected: EventEmitter<any> = new EventEmitter();
  /* Done */
  @Output() onRowUpdated: EventEmitter<any> = new EventEmitter();
  @Output() onRowValueChanged: EventEmitter<any> = new EventEmitter();
  @Output() onSelectionChanged: EventEmitter<any> = new EventEmitter();
  /* Done */
  @Output() onSortChanged: EventEmitter<any> = new EventEmitter();
  @Output() onStateUpdated: EventEmitter<any> = new EventEmitter();

  /* Done */
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
        for (const row of response.data) {
          row[this.rowKey] = Autocode.uniqueId();
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
  private draggingRow: any;
  dropTargetRowIndex: number | null = null;
  getRowId: GetRowIdFunc = (params: GetRowIdParams) => {
    return params.data[this.rowKey];
  };
  private groupParentIndexes: any = {};
  private lastFocusedCellEvent?: any;
  private lastOnDemandParams: IAcDataGridDataOnDemandParams | undefined;
  private notifyStateUpdatedTimeout: any;
  private previousGroupChildIndex: number = -1;
  private promiseManager: AcPromiseManager = new AcPromiseManager();
  private rowKey: string = "__ac_datagrid_id__";
  private rowGroupParentKey: string = "__ac_datagrid_parent_id__";
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

  /* Done */
  addRow({ data, append = true, highlightCells = false }: { data?: any, append?: boolean, highlightCells?: boolean } = {}) {
    if (this.isClientSideData) {
      if (data == undefined) {
        data = {};
      }
      data[this.rowKey] = Autocode.uniqueId();
      if(this.groupChildKey && this.groupParentKey){
        if(data[this.groupChildKey]){
          for(const rowData of this.data){
            if(rowData[this.groupParentKey] == data[this.groupChildKey]){
              data[this.rowGroupParentKey] = rowData[this.rowKey];
              break;
            }
          }
        }
      }
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
      if (highlightCells) {
        this.agGridApi.flashCells({
          rowNodes: [rowNode], fadeDuration: 1000, flashDuration: 1000
        });
      }
    }
    else {
      if (data == undefined) {
        data = {};
      }
      data[this.rowKey] = Autocode.uniqueId();
      this.agGridApi.applyServerSideTransaction({ add: [data] });
    }
    const event: any = {
      data: data
    };
    this.onRowAdded.emit(event);
    this.events.execute({ event: 'rowAdded', args: event });
  }

  /* Done */
  clearSelection() {
    this.agGridApi.deselectAll();
  }

  /* Done */
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
      this.events.execute({ event: 'rowDeleted', args: event });
    }
  }

  /* Done */
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

  /* Done */
  focusFirstRow() {
    if (this.agGridApi && this.colDefs.length > 0) {
      this.agGridApi.setFocusedCell(0, this.colDefs[0].field);
    }
  }

  /* Done */
  getAcFilterOperatorFromAgGridOperator(operator: any) {
    const result = operator;
    return result;
  }

  /* Done */
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

  /* Done */
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
      rowDrag: column.allowRowDrag,
      headerComponent: AgGridHeaderCellComponent
    };
    const handleEditorComponentBeforeInit: Function = (instance: AgGridCellEditorComponent) => {
      this.log("cellEditorComponentBeforeInit");
      this.onCellEditorComponentBeforeInit.emit(instance);
      this.events.execute({ event: 'cellEditorComponentBeforeInit', args: instance });
    };
    const handleEditorComponentDestroy: Function = (instance: AgGridCellEditorComponent) => {
      this.log("cellEditorComponentDestroy");
      this.onCellEditorComponentDestroy.emit(instance);
      this.events.execute({ event: 'cellEditorComponentDestroy', args: instance });
    };
    const handleEditorComponentInit: Function = (instance: AgGridCellEditorComponent) => {
      this.log("cellEditorComponentInit");
      this.onCellEditorComponentInit.emit(instance);
      this.events.execute({ event: 'cellEditorComponentInit', args: instance });
    };
    const handleRenderComponentBeforeInit: Function = (instance: AgGridCellRenderComponent) => {
      this.log("cellRenderComponentBeforeInit");
      this.onCellRenderComponentBeforeInit.emit(instance);
      this.events.execute({ event: 'cellRenderComponentBeforeInit', args: instance });
    };
    const handleRenderComponentDestroy: Function = (instance: AgGridCellRenderComponent) => {
      this.log("cellRenderComponentDestroy");
      this.onCellRenderComponentBeforeInit.emit(instance);
      this.events.execute({ event: 'cellRenderComponentBeforeInit', args: instance });
    };
    const handleRenderComponentInit: Function = (instance: AgGridCellRenderComponent) => {
      this.log("cellRenderComponentInit");
      this.onCellRenderComponentInit.emit(instance);
      this.events.execute({ event: 'cellRenderComponentInit', args: instance });
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
    if (column.showGroupChildCount == false) {
      if (colDef.cellRendererParams == undefined) {
        colDef.cellRendererParams = {};
      }
      colDef.cellRendererParams['suppressCount'] = true;
    }
    return colDef;
  }

  getAllServerSideRows() {
    const promiseInstance: AcPromiseInstance = this.promiseManager.create();
    const successCallback: Function = (response: IAcDataGridDataOnDemandResponse) => {
      if (!Array.isArray(response.data)) {
        response.data = [];
      }
      for (const row of response.data) {
        row[this.rowKey] = Autocode.uniqueId();
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

  /* Done */
  getGroupedData() {
    const extractGroupedTree:Function = (nodes: any[]): any[] => {
      return nodes.map((node) => {
        const item: any = {
          level: node.level,
          data: node.data ?? null,
        };
        if (node.group && node.childrenAfterGroup) {
          item.children = extractGroupedTree(node.childrenAfterGroup);
        }
        return item;
      });
    };
    const rootNodes:any[] = [];
    this.agGridApi.forEachNode((node) => {
      if (node.data[this.rowGroupParentKey]==null || node.data[this.rowGroupParentKey]==undefined) {
        rootNodes.push(node);
      }
    });
    const groupedTree = extractGroupedTree(rootNodes);
    return groupedTree;
  }

  /* Done */
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

  /* Done */
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

  /* Done */
  handleCellClicked(event: CellClickedEvent) {
    this.onCellClicked.emit(event);
    this.events.execute({ event: 'cellClicked', args: event });
  }

  /* Done */
  handleCellDoubleClicked(event: CellDoubleClickedEvent) {
    this.onCellDoubleClicked.emit(event);
    this.events.execute({ event: 'cellDoubleClicked', args: event });
  }

  /* Done */
  handleCellEditingStarted(event: CellEditingStartedEvent) {
    this.onCellEditingStarted.emit(event);
    this.events.execute({ event: 'cellEditingStarted', args: event });
    this.log("Cell Editing Started");
  }

  /* Done */
  handleCellEditingStopped(event: CellEditingStoppedEvent) {
    this.onCellEditingStopped.emit(event);
    this.events.execute({ event: 'cellEditingStopped', args: event });
    this.log("Cell Editing Stopped");
  }

  /* Done */
  handleCellFocused(event: any) {
    this.lastFocusedCellEvent = event;
    const rowIndex = event.rowIndex;
    if (this.activeRowIndex != rowIndex) {
      const activeEventParams: any = {
        index: rowIndex,
        oldIndex: this.activeRowIndex
      };
      this.onActiveRowChange.emit(activeEventParams);
      this.events.execute({ event: "activeRowChange", args: activeEventParams });
      this.activeRowIndex = rowIndex;
    }
    event.index = rowIndex;
    this.onCellFocused.emit(event);
    this.events.execute({ event: 'cellFocused', args: event });
  }

  /* Done */
  handleCellKeyDown(event: CellKeyDownEvent | FullWidthCellKeyDownEvent) {
    this.onCellKeyDown.emit(event);
    this.events.execute({ event: 'cellKeyDown', args: event });
  }

  /* Done */
  handleCellMouseDown(event: CellMouseDownEvent) {
    this.onCellMouseDown.emit(event);
    this.events.execute({ event: 'cellMouseDown', args: event });
  }

  /* Done */
  handleCellMouseOut(event: CellMouseOutEvent) {
    this.onCellMouseOut.emit(event);
    this.events.execute({ event: 'cellMouseOut', args: event });
  }

  /* Done */
  handleCellMouseOver(event: CellMouseOverEvent) {
    this.onCellMouseOver.emit(event);
    this.events.execute({ event: 'cellMouseOver', args: event });
  }

  /* Skipped */
  handleCellSelectionChanged(event: CellSelectionChangedEvent) {
  }

  /* Done */
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
    this.events.execute({ event: 'cellValueChanged', args: event });
  }

  /* Done */
  handleColumnHeaderClicked(event: ColumnHeaderClickedEvent) {
    this.onColumnHeaderClicked.emit(event);
    this.events.execute({ event: 'columnHeaderClicked', args: event });
  }

  /* Done */
  handleColumnMoved(event: ColumnMovedEvent) {
    this.onColumnMoved.emit(event);
    this.events.execute({ event: 'columnMouved', args: event });
  }

  /* Done */
  handleColumnResized(event: ColumnResizedEvent) {
    this.onColumnResized.emit(event);
    this.events.execute({ event: 'columnResized', args: event });
  }

  /* Started */
  handleColumnValueChanged(event: ColumnValueChangedEvent) {
    this.onColumnValueChanged.emit(event);
    this.events.execute({ event: 'columnValueChanged', args: event });
  }

  /* Done */
  handleColumnVisible(event: ColumnVisibleEvent) {
    this.onColumnVisibilityChanged.emit(event);
    this.events.execute({ event: 'columnVisibilityChanged', args: event });
  }

  /* Started */
  handleComponentStateChanged(event: ComponentStateChangedEvent) {
    // this.log(event);
  }

  /* Started */
  handleFilterChanged(event: FilterChangedEvent) {
    this.onFilterChanged.emit(event);
    this.events.execute({ event: 'filterChanged', args: event });
  }

  /* Started */
  handleFilterModified(event: FilterModifiedEvent) {
    this.onFilterModified.emit(event);
    this.events.execute({ event: 'filterModified', args: event });
  }

  /* Started */
  handleFilterOpened(event: FilterOpenedEvent) {
    this.onFilterOpened.emit(event);
    this.events.execute({ event: 'filterOpened', args: event });
  }

  handleGridReady(event: GridReadyEvent) {
    const gridGui = document.querySelector('.ag-root-wrapper');
    if (gridGui) {
      gridGui.addEventListener('focusout', (e: any) => {
        this.notifyCellBlurred();
      });
    }
    this.agGridApi = event.api;
    this.onGridReady.emit(event);
    this.events.execute({ event: 'gridReady', args: event });
  }

  /* Done */
  handlePaginationChanged(event: PaginationChangedEvent) {
    this.onPaginationChanged.emit(event);
    this.events.execute({ event: 'paginationChanged', args: event });
  }

  /* Done */
  handleRowClicked(event: RowClickedEvent) {
    this.onRowClicked.emit(event);
    this.events.execute({ event: 'rowClicked', args: event });
  }

  /* Started */
  handleRowDataUpdated(event: RowDataUpdatedEvent) {
    this.onRowDataUpdated.emit(event);
    this.events.execute({ event: 'rowDataUpdated', args: event });
  }

  /* Done */
  handleRowDoubleClicked(event: RowDoubleClickedEvent) {
    this.onRowDoubleClicked.emit(event);
    this.events.execute({ event: 'rowDoubleClicked', args: event });
  }

  /* Done */
  handleRowDragEnd(event: any) {
    const node = event.node;
    let currentGroupChildIndex: number = -1;
    const oldParentId = node.data[this.groupChildKey];
    let newIntParentId: any = null;
    let newParentId: any = null;
    if (this.groupParentKey && this.groupChildKey) {
      if (node.parent) {
        const parentNode = node.parent;
        if (parentNode.data) {
          newIntParentId = parentNode.data[this.rowKey];
          newParentId = parentNode.data[this.groupParentKey];
        }
        if (parentNode.childrenAfterGroup) {
          let index = 0;
          for (const child of parentNode.childrenAfterGroup) {
            if (child.data) {
              if (child.data[this.rowKey] == node.data[this.rowKey]) {
                currentGroupChildIndex = index;
                break;
              }
            }
            index++;
          }
        }
      }
      if (node.data[this.groupChildKey] != newParentId) {
        node.data[this.groupChildKey] = newParentId;
        node.data[this.rowGroupParentKey] = newIntParentId;
      }
    }
    this.draggingRow = null;
    const eventParams = {
      currentGroupChildIndex: currentGroupChildIndex,
      data: node.data,
      event: event,
      newParentId: newParentId,
      oldParentId: oldParentId,
      previousGroupChildIndex: this.previousGroupChildIndex
    };
    this.onRowDragEnd.emit(eventParams);
  }

  /* Done */
  handleRowDragStart(event: any) {
    this.draggingRow = event;
    const node = event.node;
    this.previousGroupChildIndex = -1;
    if (node.parent) {
      const parentNode = node.parent;
      if (parentNode.childrenAfterGroup) {
        let index = 0;
        for (const child of parentNode.childrenAfterGroup) {
          if (child.data) {
            if (child.data[this.rowKey] == node.data[this.rowKey]) {
              this.previousGroupChildIndex = index;
              break;
            }
          }
          index++;
        }
      }
    }
    const eventParams = {
      currentGroupChildIndex: this.previousGroupChildIndex,
      data: node.data,
      event: event,
    };
    this.onRowDragStart.emit(eventParams);
  }

  /* Started */
  handleRowEditingStarted(event: RowEditingStartedEvent) {
    this.onRowEditingStarted.emit(event);
    this.events.execute({ event: 'rowEditingStarted', args: event });
  }

  /* Started */
  handleRowEditingStopped(event: RowEditingStoppedEvent) {
    this.onRowEditingStopped.emit(event);
    this.events.execute({ event: 'rowEditingStopped', args: event });
  }

  /* Started */
  handleRowSelected(event: any) {
    this.onRowSelected.emit(event);
    this.events.execute({ event: 'rowSelected', args: event });
  }

  /* Started */
  handleRowValueChanged(event: RowValueChangedEvent) {
    this.onRowValueChanged.emit(event);
    this.events.execute({ event: 'rowValueChanged', args: event });
  }

  /* Started */
  handleSelectionChanged(event: SelectionChangedEvent) {
    this.onSelectionChanged.emit(event);
    this.events.execute({ event: 'selectionChanged', args: event });
  }

  /* Done */
  handleSortChanged(event: SortChangedEvent) {
    this.onSortChanged.emit(event);
    this.events.execute({ event: 'sortChanged', args: event });
  }

  /* Started */
  handleStateUpdated(event: StateUpdatedEvent) {
    const source = event.sources[0];
    if (['columnSizing', 'columnOrder'].includes(source)) {
      if (this.notifyStateUpdatedTimeout) {
        clearTimeout(this.notifyStateUpdatedTimeout);
      }
      this.notifyStateUpdatedTimeout = setTimeout(() => {

        this.onStateUpdated.emit(event);
        this.events.execute({ event: 'stateUpdated', args: event });
      }, 500);

    }

  }

  /* Skipped */
  initAgGrid() {
    if (this.agGrid) {
      this.agGridApi = this.agGrid.api;
      this.setColumnsFromComponents();
      if (this.dataOnDemandFunction) { /* empty */ }
      else {
        const griOptions: any = {
          rowData: this.data,
          rowDragManaged: true,
          suppressMoveWhenRowDragging: true

        };
        if (this.groupChildKey != undefined && this.groupParentKey != undefined) {
          griOptions['treeData'] = true;
          griOptions['treeDataParentIdField'] = this.rowGroupParentKey;
          for (const colDef of this.colDefs) {
            if (colDef.field == this.groupLabelKey) {
              if(colDef.cellRendererParams == undefined){
                colDef.cellRendererParams = {};
              }
              const innerRendererParams = {...colDef.cellRendererParams}
              if(colDef.cellRenderer){
                colDef.cellRendererParams.innerRenderer = colDef.cellRenderer;
                colDef.cellRendererParams.innerRendererParams = innerRendererParams;
                colDef.cellRenderer = 'agGroupCellRenderer';
              }
              griOptions['autoGroupColumnDef'] = { ...colDef };
              this.colDefs = arrayRemove(this.colDefs, colDef);
              break;
            }
          }
          this.agGridApi.updateGridOptions({ columnDefs: this.colDefs });
        }
        this.agGridApi.updateGridOptions(griOptions);
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

  /* Skipped */
  log(...args: any) {
    // console.trace();
    // console.log(args);
  }

  /* Done */
  navigateToLastRow({ highlightCells = false }: { highlightCells?: boolean } = {}) {
    const pageSize = this.agGridApi.paginationGetPageSize();
    const newIndex = this.totalRows - 1;
    if (newIndex >= 0) {
      const targetPage = Math.floor(newIndex / pageSize);
      this.agGridApi.paginationGoToPage(targetPage);

      // Delay scroll until after render
      setTimeout(() => {
        const node = this.agGridApi.getDisplayedRowAtIndex(newIndex % pageSize);
        if (node) {
          this.agGridApi.ensureIndexVisible(node.rowIndex, 'middle');
          if (highlightCells) {
            this.agGridApi.flashCells({ rowNodes: [node] });
          }
          node.setSelected(true);
        }
      });
    }
  }

  notifyCellBlurred() {
    if (this.lastFocusedCellEvent) {
      const event: any = { ...this.lastFocusedCellEvent };
      event.type = "cellBlurred";
      this.onCellBlurred.emit(event);
      this.events.execute({ event: 'cellBlurred', args: event });
      this.lastFocusedCellEvent = null;
    }
  }

  refreshData() {
    this.clearSelection();
    if (this.dataOnDemandFunction) {
      this.agGridApi.refreshServerSide({ purge: true });
    }
    else {
      this.agGridApi.updateGridOptions({
        rowData: this.data,
      });
    }
  }

  /* Skipped */
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

  /* Done */
  toggleColumnsCustomizer() {
    const isOpen = !!this.agGridApi.getOpenedToolPanel();
    if (isOpen) {
      this.agGridApi.closeToolPanel();
    } else {
      this.agGridApi.openToolPanel('columns');
    }
  }

  /* Done */
  updateRow({ data, currentData, key, index, highlightCells = true }: { data: any, currentData?: any, key?: string, index?: number, highlightCells?: boolean }) {
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
      if(this.groupChildKey && this.groupParentKey){
        if(data[this.groupChildKey]){
          for(const rowData of this.data){
            if(rowData[this.groupParentKey] == data[this.groupChildKey]){
              data[this.rowGroupParentKey] = rowData[this.rowKey];
              break;
            }
          }
        }
      }
      const rowNode = this.agGridApi.getDisplayedRowAtIndex(index);
      if (this.isClientSideData) {
        rowNode.setData(data);
      }
      else {
        data[this.rowKey] = currentData[this.rowKey];
        this.agGridApi.applyServerSideTransaction({ update: [data] });
        rowNode.setData(data);
      }
      if (highlightCells) {
        this.agGridApi.flashCells({
          rowNodes: [rowNode], fadeDuration: 1000, flashDuration: 1000
        });
      }

      const event: any = {
        data: data
      };
      this.onRowUpdated.emit(event);
      this.events.execute({ event: 'rowUpdated', args: event });
    }
    else {
      this.addRow({ data: data, highlightCells: true });
    }
  }
}


