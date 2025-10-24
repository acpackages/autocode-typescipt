/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @nx/enforce-module-boundaries */
import './../../../../../packages/browser/ac-data-dictionary-editor/src/lib/css/ac-data-dictionary-editor.css';
import './../../../../../packages/browser/extensions/datagrid/ac-datagrid-on-ag-grid/src/lib/css/ac-datagrid-on-ag-grid.css';
import { AcDataDictionaryEditor, AcDDEApi } from '@autocode-ts/ac-data-dictionary-editor';
import { PageHeader } from '../../components/page-header/page-header.component';
// import { dataDictionaryJson as actDataDictionary } from './../../../../data/act-data-dictionary-v1';
import { dataDictionaryJson as unifiDataDictionary } from './../../../../data/unifi-data-dictionary';
import { AcDataDictionary } from '@autocode-ts/ac-data-dictionary';
import { AcDDDatagridElement, AcDDInputElement, AcDDInputFieldElement, AcDDInputManager } from '@autocode-ts/ac-data-dictionary-components';
import { AcDatagrid, AcDatagridApi, AcDatagridColumnDraggingExtension, AcDatagridColumnsCustomizerExtension, AcDatagridDataExportXlsxExtension, AcDatagridExtensionManager, AcDatagridRowDraggingExtension, AcDatagridRowNumbersExtension, AcDatagridRowSelectionExtension, AcEnumDatagridExtension, IAcOnDemandRequestArgs, IAcOnDemandResponseArgs } from '@autocode-ts/ac-browser';
import { AcDatagridOnAgGridExtension, AcDatagridOnAgGridExtensionName, AgGridOnAcDatagrid } from '@autocode-ts/ac-datagrid-on-ag-grid';

export class DataDictionaryComponentsPage extends HTMLElement {
  dataDictionaryEditor!: AcDataDictionaryEditor;

  datagrid!: AcDatagrid;
  ddDatagrid!: AcDDDatagridElement;
  datagridApi!: AcDatagridApi;
  pageHeader: PageHeader = new PageHeader();
  agGridExtension!: AcDatagridOnAgGridExtension;
  columnDraggingExtension!: AcDatagridColumnDraggingExtension;
  columnsCustomizerExtension!: AcDatagridColumnsCustomizerExtension;
  dataExportXlsxExtension!: AcDatagridDataExportXlsxExtension;
  rowDraggingExtension!: AcDatagridRowDraggingExtension;
  rowNumbersExtension!: AcDatagridRowNumbersExtension;
  rowSelectionExtension!: AcDatagridRowSelectionExtension;

  editorApi!: AcDDEApi;
  // pageHeader: PageHeader = new PageHeader();
  ddInput?: AcDDInputElement;
  async connectedCallback() {
    // AcDDInputManager.registerColumnTypeInput({columnType:AcEnum})
    const html = `
    `;
    this.innerHTML = html;
    this.style.height = '100vh;'
    this.prepend(this.pageHeader.element);
    this.pageHeader.pageTitle = 'Data Dictionary Components';
    AcDataDictionary.registerDataDictionary({ jsonData: unifiDataDictionary });
    console.log(AcDataDictionary.dataDictionaries);
    console.log(AcDDInputFieldElement);
    console.log(AcDDDatagridElement);
    this.innerHTML = `
    <ac-dd-input-field table-name="accounts" column-name="account_target"></ac-dd-input-field>
    <div style="height:80vh">
    <ac-dd-datagrid source-value="accounts" source-type="table"></ac-dd-datagrid>
    </div>
    `;
    this.ddDatagrid = this.querySelector('ac-dd-datagrid')!;
    AcDatagridExtensionManager.register(AgGridOnAcDatagrid);
    this.datagrid = this.ddDatagrid.datagrid;
    this.datagridApi = this.datagrid.datagridApi;
    this.agGridExtension = this.datagridApi.enableExtension({ extensionName: AcDatagridOnAgGridExtensionName }) as AcDatagridOnAgGridExtension;
    this.columnDraggingExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.ColumnDragging }) as AcDatagridColumnDraggingExtension;
    this.columnsCustomizerExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.ColumnsCustomizer }) as AcDatagridColumnsCustomizerExtension;
    this.dataExportXlsxExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.DataExportXlsx }) as AcDatagridDataExportXlsxExtension;
    this.rowNumbersExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.RowNumbers }) as AcDatagridRowNumbersExtension;
    this.rowSelectionExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.RowSelection }) as AcDatagridRowSelectionExtension;
    this.rowDraggingExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.RowDragging }) as AcDatagridRowDraggingExtension;


    this.datagridApi.usePagination = true;

    this.columnsCustomizerExtension.showColumnCustomizerPanel = true;

    this.rowNumbersExtension.showRowNumbers = true;

    this.rowSelectionExtension.allowSelection = true;
    this.rowSelectionExtension.allowMultipleSelection = true;

    this.ddDatagrid.onDemandFunction = async (args:IAcOnDemandRequestArgs) =>{
            const pageSize: number = args.rowsCount;
            const pageNumber: number = (args.startIndex / pageSize) + 1;
            const res = await fetch(`http://localhost:8081/api/accounts/get?page_size=${pageSize}&page_number=${pageNumber}`);
            if (res.ok) {
              const response = await res.json();
              const callbackResponse:IAcOnDemandResponseArgs  = {
                data:response.rows,
                totalCount:response.total_rows
              };
              args.successCallback(callbackResponse);
              this.datagridApi.data = response.rows;
            }
            return
          }
    // new Ac
  }


}
