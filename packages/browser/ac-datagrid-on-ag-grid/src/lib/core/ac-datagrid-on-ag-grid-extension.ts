/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDatagridExtension, AcEnumDatagridColumnDataType, AcEnumDatagridExtension, AcEnumDatagridHook, IAcDatagridColDef, AcDatagridColumn, IAcDatagridExtension, IAcDatagridExtensionEnabledHookArgs, AcDatagridRowNumbersExtension, AcEnumDatagridRowNumbersHook, AcDatagridColumnsCustomizerExtension, AcEnumDatagridColumnsCustomizerHook, AcDatagridColumnDraggingExtension, AcEnumDatagridColumnDraggingHook, IAcDatagridColumnsCustomizerHookArgs, AcDatagridDataExportXlsxExtension, AcEnumDatagridDataExportXlsxHook, IAcDatagridRowFocusHookArgs, IAcDatagridRowUpdateHookArgs, IAcDatagridRowDeleteHookArgs, AcDatagridApi, AcDatagridCell, AcDatagridRow } from '@autocode-ts/ac-browser';
import { ColDef, createGrid, ModuleRegistry, AllCommunityModule, GridApi, GetRowIdParams, GridOptions, IRowNode, AgEventListener, CellClickedEvent } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { AcDatagridRowSelectionExtensionOnAgGrid } from './ac-datagrid-row-selection-extension-on-ag-grid';
import { IAcDatagriOnAgGridColDefsChangeHookArgs } from '../interfaces/ac-datagrid-on-ag-grid-col-defs-set-hook-args.interface';
import { AcEnumDatagridOnAgGridHook } from '../enums/ac-enum-datagrid-on-ag-grid-hook.enum';
import { IAcDatagriOnAgGridDataChangeHookArgs } from '../interfaces/ac-datagrid-on-ag-grid-data-set-hook-args.interface';
import { AcDatagridTreeTableExtensionOnAgGrid } from './ac-datagrid-tree-table-extension-on-ag-grid';
import { AcDatagridRowDraggingExtensionOnAgGrid } from './ac-datagrid-row-dragging-extension-on-ag-grid';
import { AcDatagridOnAgGridCellRendererElement } from '../elements/ac-datagrid-on-ag-grid-cell-renderer-element.element';
import { IAcDatagridRowAddHookArgs } from 'packages/browser/ac-browser/src/lib/ac-datagrid/interfaces/hook-args/ac-datagrid-row-add-hook-args.interface';
import { IAcDatagriOnAgGridRowAddHookArgs } from '../interfaces/ac-datagrid-on-ag-grid-row-add-hook-args.interface';
import { IAcDatagriOnAgGridRowUpdateHookArgs } from '../interfaces/ac-datagrid-on-ag-grid-row-update-hook-args.interface';
import { IAcDatagridDataExportXlsxExportCallHookArgs } from 'packages/browser/ac-browser/src/lib/ac-datagrid/extensions/data-export-xlsx/interfaces/ac-datagrid-data-export-xlsx-export-call-hook-args.interface';

export class AcDatagridOnAgGridExtension extends AcDatagridExtension {
  agGridElement = document.createElement('div');
  allowColumnDragging: boolean = false;
  colDefs: ColDef[] = [];
  columnsCustomizerExtension?: AcDatagridColumnsCustomizerExtension;
  columnDraggingExtension?: AcDatagridColumnDraggingExtension;
  dataExportXlsxExtension?: AcDatagridDataExportXlsxExtension;
  data: any[] = [];
  gridApi!: GridApi;
  isClientSideData: boolean = true;
  rowKey: string = "__ac_row_id__";
  rowParentKey: string = "__ac_row_parent_id__";
  rowNumbersExtension?: AcDatagridRowNumbersExtension;

  constructor() {
    super();
    this.registerModules();
  }

  private getAgDataTypeFromAcDataType(dataType: any) {
    let result: any = 'text';
    if (dataType == AcEnumDatagridColumnDataType.boolean) {
      result = 'boolean';
    }
    else if (dataType == AcEnumDatagridColumnDataType.date || dataType == AcEnumDatagridColumnDataType.datetime) {
      result = 'dateString';
    }
    else if (dataType == AcEnumDatagridColumnDataType.custom || dataType == AcEnumDatagridColumnDataType.object) {
      result = 'object';
    }
    else if (dataType == AcEnumDatagridColumnDataType.number) {
      result = 'number';
    }
    return result;
  }

  private getColDefFromAcDataGridColumn(column: AcDatagridColumn): ColDef {
    let editable: boolean = column.allowEdit;
    if (column.allowEdit != undefined) {
      editable = column.allowEdit;
    }
    const datagridColDef: IAcDatagridColDef = column.colDef;
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
      cellClass: datagridColDef.cellClass,
      headerClass: datagridColDef.headerCellClass,
      suppressHeaderMenuButton: true,
      suppressMovable: !this.allowColumnDragging
    };
    if (datagridColDef.cellRendererElement) {
      colDef.cellRenderer = AcDatagridOnAgGridCellRendererElement;
      colDef.cellRendererParams = {
        datagridApi: this.datagridApi,
        agGridExtension: this,
        datagridColumn: column
      };
    }
    return colDef;
  }

  private getDatagridCell({data,colDef}:{data:any,colDef:ColDef}){
    const rowId = data[this.rowKey];
    const colField = colDef.field;
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
    this.datagridApi.hooks.execute({ hookName: AcEnumDatagridOnAgGridHook.DataChange, args: hookArgs });
    this.data = data;
    this.gridApi.setGridOption('rowData', this.data);
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

  private handleExtensionEnabled(args: IAcDatagridExtensionEnabledHookArgs) {
    if (args.extensionName == AcEnumDatagridExtension.RowNumbers) {
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

  override handleHook({ hookName, hookArgs }: { hookName: string; hookArgs: any; }): void {
    if (hookName == AcEnumDatagridHook.ColDefsChange) {
      this.setColumnDefs();
    }
    else if (hookName == AcEnumDatagridHook.DataChange) {
      this.handleDataChange();
    }
    else if (hookName == AcEnumDatagridHook.ExtensionEnabled) {
      this.handleExtensionEnabled(hookArgs);
    }
    else if (hookName == AcEnumDatagridHook.RowAdd) {
      this.handleRowAdd(hookArgs);
    }
    else if (hookName == AcEnumDatagridHook.RowDelete) {
      this.handleRowDelete(hookArgs);
    }
    else if (hookName == AcEnumDatagridHook.RowFocus) {
      this.handleRowFocus(hookArgs);
    }
    else if (hookName == AcEnumDatagridHook.RowUpdate) {
      this.handleRowUpdate(hookArgs);
    }
    else if (hookName == AcEnumDatagridHook.UsePaginationChange) {
      this.handleUsePaginationChange();
    }
    else if (hookName == AcEnumDatagridRowNumbersHook.ShowRowNumbersChange) {
      this.setShowRowNumbers();
    }
    else if (hookName == AcEnumDatagridColumnsCustomizerHook.ShowColumnsCustomizerPanelChange) {
      this.setColumnsCustomizerExtension();
    }
    else if (hookName == AcEnumDatagridColumnsCustomizerHook.ToggleColumnsCustomizerPanel) {
      this.handleColumnsCustomizerToggle(hookArgs);
    }
    else if (hookName == AcEnumDatagridColumnDraggingHook.AllowColumnDraggingChange) {
      this.setColumnDragging();
    }
    else if (hookName == AcEnumDatagridDataExportXlsxHook.ExportData) {
      this.handleDataExportXlsx(hookArgs);
    }
  }

  private handleRowAdd(args: IAcDatagridRowAddHookArgs) {
    const data: any = args.datagridRow.data;
    if (this.isClientSideData) {
      data[this.rowKey] = args.datagridRow.acRowId;
      const hookArgs: IAcDatagriOnAgGridRowAddHookArgs = {
        data: data
      };
      this.datagridApi.hooks.execute({ hookName: AcEnumDatagridOnAgGridHook.BeforeRowAdd, args: hookArgs });
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
    this.datagridApi.hooks.execute({ hookName: AcEnumDatagridOnAgGridHook.BeforeRowUpdate, args: hookArgs });
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
    this.gridApi.setGridOption('pagination', this.datagridApi.usePagination);
  }

  override init(): void {
    this.datagridApi.datagrid.element.innerHTML = "";
    this.datagridApi.datagrid.element.append(this.agGridElement);
    const gridOptions: GridOptions = {
      alwaysMultiSort: true,
      getRowId: (params: GetRowIdParams) => {
        return params.data[this.rowKey];
      },
      pagination: this.datagridApi.usePagination,
    };
    this.gridApi = createGrid(this.datagridApi.datagrid.element, gridOptions);
    // this.gridApi.addEventListener('rowDataUpdated', (args: any) => {});
    new AcDatagridRowSelectionExtensionOnAgGrid({ agGridExtension: this });
    new AcDatagridTreeTableExtensionOnAgGrid({ agGridExtension: this });
    new AcDatagridRowDraggingExtensionOnAgGrid({ agGridExtension: this });
    this.setColumnsCustomizerExtension();
    this.setColumnDraggingExtension();
    this.setRowNumbersExtension();
    this.registerAgGridListeners();
  }

  registerAgGridListeners(){
    this.gridApi.addEventListener('cellClicked',(event:CellClickedEvent)=>{
      event.event
    });
  }

  private registerModules() {
    ModuleRegistry.registerModules([AllCommunityModule, AllEnterpriseModule]);
  }

  setColumnDefs() {
    const colDefs: ColDef[] = [];
    const beforeHookArgs: IAcDatagriOnAgGridColDefsChangeHookArgs = {
      colDefs: colDefs
    }
    this.datagridApi.hooks.execute({ hookName: AcEnumDatagridOnAgGridHook.BeforeColDefsChange, args: beforeHookArgs });
    for (const column of this.datagridApi.datagridColumns) {
      colDefs.push(this.getColDefFromAcDataGridColumn(column));
    }
    this.colDefs = colDefs;
    const hookArgs: IAcDatagriOnAgGridColDefsChangeHookArgs = {
      colDefs: colDefs
    }
    this.datagridApi.hooks.execute({ hookName: AcEnumDatagridOnAgGridHook.ColDefsChange, args: hookArgs });
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
    this.gridApi.setGridOption('sideBar', sideBarOptions);
  }

  setShowRowNumbers() {
    let showRowNumbers: boolean = false;
    if (this.rowNumbersExtension) {
      if (this.rowNumbersExtension.showRowNumbers == true) {
        showRowNumbers = true;
      }
    }
    this.gridApi.setGridOption('rowNumbers', showRowNumbers);
  }

}

export const AcDatagridOnAgGridExtensionName = 'agGridOnAcDatagrid';

export const AgGridOnAcDatagrid: IAcDatagridExtension = {
  extensionName: AcDatagridOnAgGridExtensionName,
  extensionClass: AcDatagridOnAgGridExtension
}

