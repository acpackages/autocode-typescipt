import { AcDatagrid, AcDatagridAfterRowsFooterExtension, AcDatagridApi, AcDatagridAutoAddNewRowExtension, AcDatagridColumnDraggingExtension, AcDatagridColumnsCustomizerExtension, AcDatagridDataExportXlsxExtension, AcDatagridRowDraggingExtension, AcDatagridRowNumbersExtension, AcDatagridRowSelectionExtension, AcEnumDatagridEvent, AcEnumDatagridExtension, IAcDatagridColumnDefinition } from "@autocode-ts/ac-browser";
import { AcDatagridOnAgGridExtension, AcDatagridOnAgGridExtensionName } from "@autocode-ts/ac-datagrid-on-ag-grid";
import { AcDDEApi } from "../../core/ac-dde-api";

export class AcDDEDatagrid {
  get columnDefinitions(): IAcDatagridColumnDefinition[] {
    return this.datagridApi.columnDefinitions;
  }
  set columnDefinitions(value: IAcDatagridColumnDefinition[]) {
    this.datagridApi.columnDefinitions = value;
  }

  datagrid!: AcDatagrid;
  datagridApi!: AcDatagridApi;
  editorApi!: AcDDEApi;
  element!: HTMLElement;
  footerElement: HTMLElement = document.createElement('div');

  private afterRowsExtension!: AcDatagridAfterRowsFooterExtension;
  private autoAddNewRowExtension!: AcDatagridAutoAddNewRowExtension;
  private columnDraggingExtension!: AcDatagridColumnDraggingExtension;
  private columnsCustomizerExtension!: AcDatagridColumnsCustomizerExtension;
  private exportXlsxExtension!: AcDatagridDataExportXlsxExtension;
  private rowNumbersExtension!: AcDatagridRowNumbersExtension;
  private rowSelectionExtension!: AcDatagridRowSelectionExtension;
  private rowDraggingExtension!: AcDatagridRowDraggingExtension;
  private agGridExtension!: AcDatagridOnAgGridExtension;
  newRowDataFunction:Function = ()=>{
    return {};
  };

  constructor({ editorApi }: { editorApi: AcDDEApi }) {
    this.editorApi = editorApi;
    this.datagrid = new AcDatagrid();
    this.datagridApi = this.datagrid.datagridApi;
    this.element = this.datagrid.element;

    this.afterRowsExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.AfterRowsFooter }) as AcDatagridAfterRowsFooterExtension;
    this.autoAddNewRowExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.AutoAddNewRow }) as AcDatagridAutoAddNewRowExtension;
    this.columnDraggingExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.ColumnDragging }) as AcDatagridColumnDraggingExtension;
    this.columnsCustomizerExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.ColumnsCustomizer }) as AcDatagridColumnsCustomizerExtension;
    this.exportXlsxExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.DataExportXlsx }) as AcDatagridDataExportXlsxExtension;
    this.rowNumbersExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.RowNumbers }) as AcDatagridRowNumbersExtension;
    this.rowSelectionExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.RowSelection }) as AcDatagridRowSelectionExtension;
    this.rowDraggingExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.RowDragging }) as AcDatagridRowDraggingExtension;
    this.agGridExtension = this.datagridApi.enableExtension({ extensionName: AcDatagridOnAgGridExtensionName }) as AcDatagridOnAgGridExtension;
    this.footerElement.innerHTML = `<button class="btn btn-primary btn-add-new" type="button">Add New</button>`;
    const addNewButton: HTMLElement = this.footerElement.querySelector('.btn-add-new')!;
    addNewButton.addEventListener('click', (event: MouseEvent) => {
      this.datagridApi.addRow({data:this.newRowDataFunction()});
    });
    this.afterRowsExtension.footerElement = this.footerElement;
    this.datagridApi.on({event: AcEnumDatagridEvent.StateChange, callback: (args: any) => {
        console.log(args);
      }
    })
  }

}
