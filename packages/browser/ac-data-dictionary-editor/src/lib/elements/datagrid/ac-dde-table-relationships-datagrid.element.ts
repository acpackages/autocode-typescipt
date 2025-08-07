
import { AcDDEApi } from "../../core/ac-dde-api";
import { AcDatagridOnAgGridExtension, AcDatagridOnAgGridExtensionName } from "@autocode-ts/ac-datagrid-on-ag-grid";
import { AcDDECssClassName } from "../../_ac-data-dictionary-editor.export";
import { acAddClassToElement, AcDatagrid, AcDatagridApi, AcDatagridColumnDraggingExtension, AcDatagridColumnsCustomizerExtension, AcDatagridDataExportXlsxExtension, AcDatagridRowDraggingExtension, AcDatagridRowNumbersExtension, AcDatagridRowSelectionExtension, AcEnumDatagridExtension } from "@autocode-ts/ac-browser";

export class AcDDETableRelationshipsDatagrid {
  datagrid!: AcDatagrid;
    datagridApi!: AcDatagridApi;
    editorApi!: AcDDEApi;
    element: HTMLElement = document.createElement('div');
    constructor({ editorApi }: { editorApi: AcDDEApi }) {
      this.editorApi = editorApi;
      setTimeout(() => {
        this.initDatagrid();
        this.initElement();
      }, 500);
    }

    initDatagrid() {
      this.datagrid = new AcDatagrid();
      this.datagridApi = this.datagrid.datagridApi;
      this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.ColumnDragging }) as AcDatagridColumnDraggingExtension;
      this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.ColumnsCustomizer }) as AcDatagridColumnsCustomizerExtension;
      this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.DataExportXlsx }) as AcDatagridDataExportXlsxExtension;
      this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.RowNumbers }) as AcDatagridRowNumbersExtension;
      this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.RowSelection }) as AcDatagridRowSelectionExtension;
      this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.RowDragging }) as AcDatagridRowDraggingExtension;
      this.datagridApi.enableExtension({ extensionName: AcDatagridOnAgGridExtensionName }) as AcDatagridOnAgGridExtension;
      this.datagridApi.colDefs = [
        { 'field': 'table_name', 'title': 'Table Name' }
      ];
      // console.log(this, Object.values(this.editorApi.dataStorage.tables));
      // const rows: any[] = [];
      // for (const table of Object.values(this.editorApi.dataStorage.tables)) {
      //   rows.push(table.toJson());
      // }
      // console.log(rows);
      // this.datagridApi.data = rows;
    }

    initElement() {
      this.element.append(this.datagrid.element);
      acAddClassToElement({ cssClass: AcDDECssClassName.acDDEContainer, element: this.element });
    }
}
