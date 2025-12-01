import { AcDatagrid, AcDatagridAfterRowsFooterExtension, AcDatagridApi, AcDatagridAutoAddNewRowExtension, AcDatagridColumnDraggingExtension, AcDatagridColumnsCustomizerExtension, AcDatagridDataExportXlsxExtension, AcDatagridRowDraggingExtension, AcDatagridRowNumbersExtension, AcDatagridRowSelectionExtension, AcEnumDatagridEvent, AcEnumDatagridExtension, AcEnumDatagridHook, IAcDatagridColumnDefinition } from "@autocode-ts/ac-browser";
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
  // private agGridExtension!: AcDatagridOnAgGridExtension;
  newRowDataFunction: Function = () => {
    return {};
  };

  constructor({ editorApi }: { editorApi: AcDDEApi }) {
    this.editorApi = editorApi;
    this.datagrid = new AcDatagrid();
    this.datagridApi = this.datagrid.datagridApi;
    this.datagridApi.hooks.subscribe({
      hook: AcEnumDatagridHook.FooterInit, callback: () => {
        const addNewButton: HTMLElement = this.datagrid.ownerDocument.createElement('button');
        addNewButton.setAttribute('class', 'btn btn-primary btn-add-new py-0');
        addNewButton.setAttribute('type', 'button');
        addNewButton.setAttribute('style', 'height:28px;');
        addNewButton.innerHTML = 'Add New';
        this.datagrid.datagridFooter.append(addNewButton);
        addNewButton.addEventListener('click', (event: MouseEvent) => {
          this.datagridApi.addRow({ data: this.newRowDataFunction() });
        });
      }
    });
    this.datagridApi.on({event:AcEnumDatagridEvent.RowDataChange,callback:(args:any)=>{
      // console.log(`Row data change`,args);
    }})
    this.element = this.datagrid;
    this.element.classList.add("ac-dde-datagrid")

    this.afterRowsExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.AfterRowsFooter }) as AcDatagridAfterRowsFooterExtension;
    this.autoAddNewRowExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.AutoAddNewRow }) as AcDatagridAutoAddNewRowExtension;
    this.columnDraggingExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.ColumnDragging }) as AcDatagridColumnDraggingExtension;
    this.columnsCustomizerExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.ColumnsCustomizer }) as AcDatagridColumnsCustomizerExtension;
    this.exportXlsxExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.DataExportXlsx }) as AcDatagridDataExportXlsxExtension;
    this.rowNumbersExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.RowNumbers }) as AcDatagridRowNumbersExtension;
    this.rowSelectionExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.RowSelection }) as AcDatagridRowSelectionExtension;
    this.rowDraggingExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.RowDragging }) as AcDatagridRowDraggingExtension;
    this.autoAddNewRowExtension.autoAddNewRow = false;
    // this.agGridExtension = this.datagridApi.enableExtension({ extensionName: AC_DATAGRID_ON_AG_GRID_EXTENSION_NAME }) as AcDatagridOnAgGridExtension;
    setTimeout(() => {

      this.afterRowsExtension.footerElement = this.footerElement;
      this.datagridApi.on({
        event: AcEnumDatagridEvent.StateChange, callback: (args: any) => {
          //
        }
      })
    }, 500);

    //
  }



}
