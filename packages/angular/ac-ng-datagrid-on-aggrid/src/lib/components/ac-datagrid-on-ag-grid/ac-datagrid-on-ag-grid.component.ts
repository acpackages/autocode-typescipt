/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Input, OnChanges, Output, QueryList, SimpleChanges, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { CellValueChangedEvent, ColDef, GridApi, IDatasource, IGetRowsParams, IServerSideDatasource, IServerSideGetRowsParams, RowDataUpdatedEvent, RowModelType } from "ag-grid-community";
import { AllCommunityModule, ClientSideRowModelModule, InfiniteRowModelModule, ModuleRegistry } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { AgGridCellEditorComponent } from '../ag-grid-cell-editor/ag-grid-cell-editor.component';
import { AgGridCellRendererComponent } from '../ag-grid-cell-renderer/ag-grid-cell-renderer.component';
import { AgGridHeaderCellComponent } from '../ag-grid-header-cell/ag-grid-header-cell.component';
// import { AcBase } from 'packages/angular/ac-angular/src/index';
import { AcBase, AcDatagridColumnComponent, AutocodeService, IAcDataGridColumn, IAcDataGridDataOnDemandParams, IAcDataGridDataOnDemandResponse, IAcDataGridFilterCondition, IAcDataGridFilterGroup, IAcDataGridSort } from 'packages/angular/ac-angular/src/index';

ModuleRegistry.registerModules([AllCommunityModule]);
ModuleRegistry.registerModules([AllEnterpriseModule]);
ModuleRegistry.registerModules([ClientSideRowModelModule, InfiniteRowModelModule]);


@Component({
  selector: 'ac-datagrid-on-ag-grid',
  standalone: false,
  templateUrl: './ac-datagrid-on-ag-grid.component.html',
  styleUrl: './ac-datagrid-on-ag-grid.component.scss'
})
export class AcDatagridOnAgGridComponent extends AcBase implements OnChanges {
  @ContentChildren(AcDatagridColumnComponent) columnComponents?: QueryList<AcDatagridColumnComponent>;

  @ViewChild('acGrid') agGrid!: AgGridAngular;

  @Input() autoAddNewRow: boolean = false;
  @Input() selectMultiple: boolean = true;
  @Input() columns: IAcDataGridColumn[] = [];
  @Input() dataOnDemandFunction?: Function;
  @Input() editable: boolean = false;
  @Input() pagination: boolean = false;
  @Input() pageSize: boolean = false;
  @Input() filterSearchValue: string = "";

  private _data: any[] = [];
  get data(): any[] { return this._data; }
  @Input() set data(value: any[]) {
    this._data = value;
  }

  @Output() onContentElementsLoaded: EventEmitter<any> = new EventEmitter();
  @Output() onCountChange: EventEmitter<any> = new EventEmitter();
  @Output() onDataChange: EventEmitter<any> = new EventEmitter();
  @Output() onRowAdd: EventEmitter<any> = new EventEmitter();
  @Output() onRowDataChange: EventEmitter<any> = new EventEmitter();
  @Output() onRowRemove: EventEmitter<any> = new EventEmitter();
  @Output() onRowUpdate: EventEmitter<any> = new EventEmitter();
  @Output() onSelectedCellChange: EventEmitter<any> = new EventEmitter();
  @Output() onSelectedRowChange: EventEmitter<any> = new EventEmitter();

  get totalRows(): number {
    let result: number = 0;
    if (this.agGridApi) {
      result = this.agGridApi.getDisplayedRowCount();
      if (this.isClientSideData) {
        //
      }
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

  agGridApi!: GridApi;
  customComponents = {
    'agGridCellEditor': AgGridCellEditorComponent,
    'agGridCellRenderer': AgGridCellRendererComponent,
  };
  dataSource: IServerSideDatasource = {
    getRows: (params: IServerSideGetRowsParams) => {
      console.log("Getting Rows", params);
       const successCallback: Function = (response: IAcDataGridDataOnDemandResponse) => {
        console.log(response);
        params.success({rowData:response.data,rowCount: response.totalCount});
        if(this.internalDataOnDemandCallback){
          this.internalDataOnDemandCallback(response);
        }
      }
      const requestParams: IAcDataGridDataOnDemandParams = {
        successCallback: successCallback
      };
      if(!this.internalDataOnDemandSkipPagination){
        const pageSize: number = params.request.endRow - params.request.startRow;
        const pageNumber: number = (params.request.startRow / pageSize) + 1;
        requestParams.pageNumber = pageNumber;
        requestParams.pageSize = pageSize;
      }
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
      console.log(requestParams);
      this.dataOnDemandFunction?.(requestParams);
    }
  };
  defaultColDef: ColDef = {
    flex: 1,
  };
  private internalDataOnDemandCallback?:Function;
  private internalDataOnDemandSkipPagination?:boolean = false;
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

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  override ngAfterViewInit() {
    super.ngAfterViewInit();
    this.initAgGrid();

    setTimeout(() => {
      this.toggleColumnsCustomizer();
    }, 1000);
  }

  exportData({format='excel',fileName='Datagrid Export.xlsx'}:{format?:string,fileName?:string} = {}){
    const callbackFunction:Function = ()=>{
      if(format.toLowerCase()=='excel'){
        this.agGridApi.exportDataAsExcel({fileName:fileName});
      }
      if(format.toLowerCase()=='csv'){
        this.agGridApi.exportDataAsCsv({fileName:fileName});
      }
    }
    if(this.isClientSideData){
      callbackFunction();
    }
    else{
      this.agGrid.paginationPageSize = 1000000000;
      this.internalDataOnDemandCallback = (response: IAcDataGridDataOnDemandResponse)=>{
        callbackFunction();
        // this.agGrid.rowModelType = "infinite";
        // this.agGrid.datasource = null;
        // this.agGrid.datasource = this.dataSource;
      }
      this.internalDataOnDemandSkipPagination = true;
      this.agGridApi.refreshServerSide();
    }
  }

  getAcFilterOperatorFromAgGridOperator(operator: any) {
    const result = operator;
    return result;
  }

  private getAgDataGridColumnFromAcDataGridColumn(column: IAcDataGridColumn): ColDef {
    const colDef: ColDef = {
      field: column.field,
      headerName: column.title,
      editable: this.editable && column.allowEdit,
      filter: column.allowFilter,
      sortable: column.allowSort,
      checkboxSelection: column.allowSelect,
      headerCheckboxSelection: column.allowSelect,
      headerComponent: AgGridHeaderCellComponent
    };
    if (column.editTemplate) {
      colDef.cellEditor = AgGridCellEditorComponent;
      colDef.cellEditorParams = {
        template: column.editTemplate,
        acDatagridColumn: column
      };
    }
    if (column.renderTemplate) {
      colDef.cellRenderer = AgGridCellRendererComponent;
      colDef.cellRendererParams = {
        template: column.renderTemplate,
        acDatagridColumn: column
      };
    }
    return colDef;
  }

  getSelectedData() {
    let selectedData: any[] = [];
    if (this.isClientSideData) {
      selectedData = this.agGridApi.getSelectedRows();
      console.log('Selected rows (clientSide):', selectedData);
    } else {
      // console.log('Selected row IDs (infinite):', Array.from(this.agGridApi));
      // optionally fetch full row details from server using these IDs
    }
    return selectedData;
  }

  getVisibleColumns(): ColDef[] {
    const allColumns = this.agGridApi.getAllDisplayedColumns();
    return allColumns.map(col => col.getColDef());
  }

  handleCellValueChanged(event: CellValueChangedEvent) {
    console.log(event);
  }

  handleRowDataUpdated(event: RowDataUpdatedEvent) {
    console.log(event);
  }

  handleRowSelected(event: any) {
    console.log(event);
    this.getSelectedData();
  }

  initAgGrid() {
    if (this.agGrid) {
      this.agGridApi = this.agGrid.api;
      console.log(this.agGrid, this.agGridApi);
      this.setColumnsFromComponents();
      if (this.dataOnDemandFunction) {
        //
       }
      else {
        this.agGridApi.updateGridOptions({ rowData: this.data });
      }
    }
    console.log(this);
  }

  refreshData() {
    if (this.dataOnDemandFunction) {
      this.agGridApi.refreshServerSide();
    }
    else{
      this.agGridApi.refreshClientSideRowModel();
    }
  }

  setColumnsFromComponents() {
    if (this.columnComponents) {
      let index: number = -1;
      const colDefs: any[] = [];
      for (const column of this.columnComponents) {
        index++;
        const columnDetails: IAcDataGridColumn = column.columnDetails;
        columnDetails.index = index;;
        this.columns.push(columnDetails);
        colDefs.push(this.getAgDataGridColumnFromAcDataGridColumn(columnDetails));
      }
      this.agGridApi.setGridOption('columnDefs', colDefs);
      setTimeout(() => {
        this.changeDetectorRef.detectChanges();
      }, 100);
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


}
