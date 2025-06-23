/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Input, OnChanges, Output, QueryList, SimpleChanges, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { ApplyColumnStateParams, CellClickedEvent, CellDoubleClickedEvent, CellFocusedEvent, CellKeyDownEvent, CellMouseDownEvent, CellMouseOutEvent, CellMouseOverEvent, CellValueChangedEvent, ColDef, ColumnHeaderClickedEvent, ColumnMovedEvent, ColumnResizedEvent, ColumnValueChangedEvent, ColumnVisibleEvent, ComponentStateChangedEvent, FilterChangedEvent, FilterModifiedEvent, FilterOpenedEvent, FullWidthCellKeyDownEvent, GetRowIdFunc, GetRowIdParams, GridApi, GridReadyEvent, IDatasource, IGetRowsParams, IServerSideDatasource, IServerSideGetRowsParams, IServerSideGroupSelectionState, IServerSideSelectionState, PaginationChangedEvent, RowClickedEvent, RowDataUpdatedEvent, RowDoubleClickedEvent, RowEditingStartedEvent, RowEditingStoppedEvent, RowModelType, RowNode, RowValueChangedEvent, SelectionChangedEvent, ServerSideTransaction, SortChangedEvent, StateUpdatedEvent, ValueFormatterParams } from "ag-grid-community";
import { AllCommunityModule, ClientSideRowModelModule, InfiniteRowModelModule, ModuleRegistry } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { AgGridCellEditorComponent } from '../ag-grid-cell-editor/ag-grid-cell-editor.component';
import { AgGridCellRendererComponent } from '../ag-grid-cell-renderer/ag-grid-cell-renderer.component';
import { AgGridHeaderCellComponent } from '../ag-grid-header-cell/ag-grid-header-cell.component';
import { AcEnumStringCase, AcPromiseInstance, AcPromiseManager, Autocode } from '@autocode-ts/autocode';
import { AcBase, AcDatagridColumnComponent, AutocodeService, IAcDataGridColumn, IAcDataGridDataOnDemandParams, IAcDataGridDataOnDemandResponse, IAcDataGridFilterCondition, IAcDataGridFilterGroup, IAcDataGridSort, AcEnumColumnDataType, AcEnumFormatString, AcEnumFormatDateTime, AcEnumFormatNumber, AcDataGrid } from '@autocode-ts/ac-angular';
import '@autocode-ts/ac-extensions';
import moment from 'moment';

ModuleRegistry.registerModules([AllCommunityModule]);
ModuleRegistry.registerModules([AllEnterpriseModule]);
ModuleRegistry.registerModules([ClientSideRowModelModule, InfiniteRowModelModule]);


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
  @Input() pagination: boolean = false;
  @Input() pageSizes: number[] = [20, 50, 100, 500, 100];
  @Input() filterSearchValue: string = "";

  private _data: any[] = [];
  get data(): any[] { return this._data; }
  @Input() set data(value: any[]) {
    this._data = value;
  }

  @Output() onActiveRowChange: EventEmitter<any> = new EventEmitter();
  @Output() onCellClicked: EventEmitter<any> = new EventEmitter();
  @Output() onCellDoubleClicked: EventEmitter<any> = new EventEmitter();
  @Output() onCellEditorComponentInit: EventEmitter<any> = new EventEmitter();
  @Output() onCellFocused: EventEmitter<any> = new EventEmitter();
  @Output() onCellKeyDown: EventEmitter<any> = new EventEmitter();
  @Output() onCellMouseDown: EventEmitter<any> = new EventEmitter();
  @Output() onCellMouseOut: EventEmitter<any> = new EventEmitter();
  @Output() onCellMouseOver: EventEmitter<any> = new EventEmitter();
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
  customComponents = {
    'agGridCellEditor': AgGridCellEditorComponent,
    'agGridCellRenderer': AgGridCellRendererComponent,
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
          row[this.serverSideRowKey] = startIndex;
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
    return params.data[this.serverSideRowKey];
  };

  private lastOnDemandParams: IAcDataGridDataOnDemandParams | undefined;
  private promiseManager: AcPromiseManager = new AcPromiseManager();
  private serverSideRowKey: string = "__ac_datagrid_id__";
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

  constructor(elementRef: ElementRef, autocodeService: AutocodeService, protected changeDetectorRef: ChangeDetectorRef) {
    super(elementRef, autocodeService);
  }

  override ngAfterViewInit() {
    super.ngAfterViewInit();
    this.initAgGrid();
  }

  addRow({ data, append = true }: { data?: any, append?: boolean } = {}) {
    if (this.isClientSideData) {
      if (append) {
        this.agGridApi.applyTransaction({ add: [data] });
      }
      else {
        this.agGridApi.applyTransaction({ add: [data], addIndex: 0 });
      }
    }
    else {
      if (data == undefined) {
        data = {};
      }
      data[this.serverSideRowKey] = this.getTotalRowCount();
      this.agGridApi.applyServerSideTransaction({ add: [data] });
    }
    const event: any = {
      data: data
    };
    this.onRowAdded.emit(event);
    this.events.execute({ eventName: 'rowAdded', args: event });
  }

  deleteRow({ data, index }: { data?: any, index?: number }) {
    if (index >= 0) {
      data = this.agGridApi.getDisplayedRowAtIndex(index);
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
    const colDef: ColDef = {
      field: column.field,
      headerName: column.title,
      // width:column.width,
      width: 90,
      type: this.getAgDataTypeFromAcDataType(column.dataType),
      editable: (this.editable == false ? false : true) && (column.allowEdit == false ? false : true),
      filter: column.allowFilter == false ? false : true,
      sortable: column.allowSort == false ? false : true,
      checkboxSelection: column.allowSelect,
      cellClass: column.cellClass,
      headerClass: column.headerClass,
      headerCheckboxSelection: column.allowSelect,
      headerComponent: AgGridHeaderCellComponent
    };
    if (column.editTemplate) {
      colDef.cellEditor = AgGridCellEditorComponent;
      colDef.cellEditorParams = {
        template: column.editTemplate,
        acDatagridColumn: column,
        onComponentInit: (instance: AgGridCellEditorComponent) => {
          const event: any = {
            ...instance,
            datagridInstance: this
          };
          this.onCellEditorComponentInit.emit(event);
          this.events.execute({ eventName: 'cellEditorComponentInit', args: event });
        }
      };
    }
    if (column.renderTemplate) {
      colDef.cellRenderer = AgGridCellRendererComponent;
      colDef.cellRendererParams = {
        template: column.renderTemplate,
        acDatagridColumn: column,
        onComponentInit: (instance: AgGridCellEditorComponent) => {
          const event: any = {
            ...instance,
            datagridInstance: this
          };
          this.onCellRenderComponentInit.emit(event);
          this.events.execute({ eventName: 'cellRenderComponentInit', args: event });
        }
      };
    }
    if (column.component) {
      colDef.cellRenderer = AgGridCellRendererComponent;
      colDef.cellRendererParams = {
        component: column.component,
        componentProperties: column.componentProperties,
        acDatagridColumn: column,
        onComponentInit: (instance: AgGridCellEditorComponent) => {
          const event: any = {
            ...instance,
            datagridInstance: this
          };
          this.onCellRenderComponentInit.emit(event);
          this.events.execute({ eventName: 'cellRenderComponentInit', args: event });
        }
      };
    }
    if (column.editComponent) {
      colDef.cellEditor = AgGridCellEditorComponent;
      colDef.cellEditorParams = {
        component: column.editComponent,
        componentProperties: column.editComponentProperties,
        acDatagridColumn: column,
        onComponentInit: (instance: AgGridCellEditorComponent) => {
          const event: any = {
            ...instance,
            datagridInstance: this
          };
          this.onCellEditorComponentInit.emit(event);
          this.events.execute({ eventName: 'cellEditorComponentInit', args: event });
        }
      };
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
          return params.value.convertCase(column.formatString);
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
        row[this.serverSideRowKey] = startIndex;
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
          if (!selectionState.toggledNodes.includes(node.data[this.serverSideRowKey].toString())) {
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
      console.log(`The total number of rows on the server is: ${totalRows}`);
      alert(`Total Rows: ${totalRows}`);
    } else {
      console.log("The total row count is not yet known by the grid.");
    }
  }

  getVisibleColumns(): ColDef[] {
    const allColumns = this.agGridApi.getAllDisplayedColumns();
    return allColumns.map(col => col.getColDef());
  }

  handleCellClicked(event: CellClickedEvent) {
    const eventParams: any = {
      event: event,
    };
    this.onCellClicked.emit(eventParams);
    this.events.execute({ eventName: 'cellClicked', args: eventParams });
  }

  handleCellDoubleClicked(event: CellDoubleClickedEvent) {
    const eventParams: any = {
      event: event
    };
    this.onCellDoubleClicked.emit(eventParams);
    this.events.execute({ eventName: 'cellDoubleClicked', args: eventParams });
  }

  handleCellFocused(event: CellFocusedEvent) {
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
    const eventParams: any = {
      index: rowIndex,
      event: event
    };
    this.onCellFocused.emit(eventParams);
    this.events.execute({ eventName: 'cellFocused', args: eventParams });
  }

  handleCellKeyDown(event: CellKeyDownEvent | FullWidthCellKeyDownEvent) {
    const eventParams: any = {
      event: event
    };
    this.onCellKeyDown.emit(eventParams);
    this.events.execute({ eventName: 'cellKeyDown', args: eventParams });
  }

  handleCellMouseDown(event: CellMouseDownEvent) {
    const eventParams: any = {
      event: event
    };
    this.onCellMouseDown.emit(eventParams);
    this.events.execute({ eventName: 'cellMouseDown', args: eventParams });
  }

  handleCellMouseOut(event: CellMouseOutEvent) {
    const eventParams: any = {
      event: event
    };
    this.onCellMouseOut.emit(eventParams);
    this.events.execute({ eventName: 'cellMouseOut', args: eventParams });
  }

  handleCellMouseOver(event: CellMouseOverEvent) {
    const eventParams: any = {
      event: event
    };
    this.onCellMouseOver.emit(eventParams);
    this.events.execute({ eventName: 'cellMouseOver', args: eventParams });
  }

  handleCellValueChanged(event: CellValueChangedEvent) {
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
    const eventParams: any = {
      data: rowData,
      index: rowIndex,
      event: event
    };
    this.onCellValueChanged.emit(eventParams);
    this.events.execute({ eventName: 'cellValueChanged', args: eventParams });
  }

  handleColumnHeaderClicked(event: ColumnHeaderClickedEvent) {
    const eventParams: any = {
      event: event
    };
    this.onColumnHeaderClicked.emit(eventParams);
    this.events.execute({ eventName: 'columnHeaderClicked', args: eventParams });
  }

  handleColumnMoved(event: ColumnMovedEvent) {
    const eventParams: any = {
      event: event
    };
    this.onColumnMoved.emit(eventParams);
    this.events.execute({ eventName: 'columnMouved', args: eventParams });
  }

  handleColumnResized(event: ColumnResizedEvent) {
    const eventParams: any = {
      event: event
    };
    this.onColumnResized.emit(eventParams);
    this.events.execute({ eventName: 'columnResized', args: eventParams });
  }

  handleColumnValueChanged(event: ColumnValueChangedEvent) {
    const eventParams: any = {
      event: event
    };
    this.onColumnValueChanged.emit(eventParams);
    this.events.execute({ eventName: 'columnValueChanged', args: eventParams });
  }

  handleColumnVisible(event: ColumnVisibleEvent) {
    const eventParams: any = {
      event: event
    };
    this.onColumnVisibilityChanged.emit(eventParams);
    this.events.execute({ eventName: 'columnVisibilityChanged', args: eventParams });
  }

  handleComponentStateChanged(event: ComponentStateChangedEvent) {
    // console.log(event);
  }

  handleFilterChanged(event: FilterChangedEvent) {
    const eventParams: any = {
      event: event
    };
    this.onFilterChanged.emit(eventParams);
    this.events.execute({ eventName: 'filterChanged', args: eventParams });
  }

  handleFilterModified(event: FilterModifiedEvent) {
    const eventParams: any = {
      event: event
    };
    this.onFilterModified.emit(eventParams);
    this.events.execute({ eventName: 'filterModified', args: eventParams });
  }

  handleFilterOpened(event: FilterOpenedEvent) {
    const eventParams: any = {
      event: event
    };
    this.onFilterOpened.emit(eventParams);
    this.events.execute({ eventName: 'filterOpened', args: eventParams });
  }

  handleGridReady(params: GridReadyEvent) {
    const eventParams: any = {
      event: params
    };
    this.agGridApi = params.api;
    this.onGridReady.emit(eventParams);
    this.events.execute({ eventName: 'gridReady', args: eventParams });
  }

  handlePaginationChanged(event: PaginationChangedEvent) {
    const eventParams: any = {
      event: event
    };
    this.onPaginationChanged.emit(eventParams);
    this.events.execute({ eventName: 'paginationChanged', args: eventParams });
  }

  handleRowClicked(event: RowClickedEvent) {
    const eventParams: any = {
      event: event
    };
    this.onRowClicked.emit(eventParams);
    this.events.execute({ eventName: 'rowClicked', args: eventParams });
  }

  handleRowDataUpdated(event: RowDataUpdatedEvent) {
    const eventParams: any = {
      event: event
    };
    this.onRowDataUpdated.emit(eventParams);
    this.events.execute({ eventName: 'rowDataUpdated', args: eventParams });
  }

  handleRowDoubleClicked(event: RowDoubleClickedEvent) {
    const eventParams: any = {
      event: event
    };
    this.onRowDoubleClicked.emit(eventParams);
    this.events.execute({ eventName: 'rowDoubleClicked', args: eventParams });
  }

  handleRowEditingStarted(event: RowEditingStartedEvent) {
    const eventParams: any = {
      event: event
    };
    this.onRowEditingStarted.emit(eventParams);
    this.events.execute({ eventName: 'rowEditingStarted', args: eventParams });
  }

  handleRowEditingStopped(event: RowEditingStoppedEvent) {
    const eventParams: any = {
      event: event
    };
    this.onRowEditingStopped.emit(eventParams);
    this.events.execute({ eventName: 'rowEditingStopped', args: eventParams });
  }

  handleRowSelected(event: any) {
    const eventParams: any = {
      event: event
    }
    this.onRowSelected.emit(eventParams);
    this.events.execute({ eventName: 'rowSelected', args: eventParams });
  }

  handleRowValueChanged(event: RowValueChangedEvent) {
    const eventParams: any = {
      event: event
    };
    this.onRowValueChanged.emit(eventParams);
    this.events.execute({ eventName: 'rowValueChanged', args: eventParams });
  }

  handleSelectionChanged(event: SelectionChangedEvent) {
    const eventParams: any = {
      event: event
    };
    this.onSelectionChanged.emit(eventParams);
    this.events.execute({ eventName: 'selectionChanged', args: eventParams });
  }

  handleSortChanged(event: SortChangedEvent) {
    const eventParams: any = {
      event: event
    };
    this.onSortChanged.emit(eventParams);
    this.events.execute({ eventName: 'sortChanged', args: eventParams });
  }

  handleStateUpdated(event: StateUpdatedEvent) {
    const source = event.sources[0];
    if (['columnSizing', 'columnOrder'].includes(source)) {
      const eventParams: any = {
        event: event
      };
      this.onStateUpdated.emit(eventParams);
      this.events.execute({ eventName: 'stateUpdated', args: eventParams });
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

  refreshData() {
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
    this.agGridApi.setGridOption('columnDefs', colDefs);
    setTimeout(() => {
      this.changeDetectorRef.detectChanges();
    }, 100);
  }

  setDatagridState(state: any) {
    if (state) {
      if (state['columns']) {
        const columnState: ApplyColumnStateParams = {
          state: state['columns']
        };
        this.agGridApi.applyColumnState(columnState);
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
          if (node.data[key] === data[key]) {
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
        this.agGridApi.applyServerSideTransaction({ update: [data] });
      }
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
