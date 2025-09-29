import { AcBuilderElement, IAcBuilderElement, IAcBuilderElementInitArgs } from "@autocode-ts/ac-builder";
import { AcDatagrid, AcDatagridApi, AcDatagridColumnDraggingExtension, AcDatagridColumnsCustomizerExtension, AcDatagridDataExportXlsxExtension, AcDatagridExtensionManager, AcDatagridOnDemandDataSource, AcDatagridRowDraggingExtension, AcDatagridRowNumbersExtension, AcDatagridRowSelectionExtension, AcEnumDatagridExtension, IAcDatagridOnDemandRequestArgs } from "@autocode-ts/ac-browser";
import { ACI_SVG_SOLID } from "@autocode-ts/ac-icons";
import { AcDDDatagridElement } from "@autocode-ts/ac-data-dictionary-components";
import { AcDatagridOnAgGridExtension, AcDatagridOnAgGridExtensionName, AgGridOnAcDatagrid } from '@autocode-ts/ac-datagrid-on-ag-grid';

export class AcDDDatagridBuilderElement extends AcBuilderElement {

  get data(): any[] {
    return this.ddDatagrid.data;
  }
  set data(value: any[]) {
    this.ddDatagrid.data = value;
  }

  get dataDictionary(): string {
    return this.ddDatagrid.dataDictionary;
  }
  set dataDictionary(value: string) {
    this.ddDatagrid.dataDictionary = value;
  }

  get additionalColumns(): any {
    return this.ddDatagrid.additionalColumns;
  }
  set additionalColumns(value: any) {
    this.ddDatagrid.additionalColumns = value;
  }

  get sourceType(): string {
    return this.ddDatagrid.sourceType;
  }
  set sourceType(value: string) {
    this.ddDatagrid.sourceType = value;
    this.setDatagridDisplay();
  }

  get sourceValue(): string | null {
    return this.ddDatagrid.sourceValue;
  }
  set sourceValue(value: string) {
    this.ddDatagrid.sourceValue = value;
    this.setDatagridDisplay();
  }

  get excludeColumns(): any {
    return this.ddDatagrid.excludeColumns;
  }
  set excludeColumns(value: string[]) {
    this.ddDatagrid.excludeColumns = value;
  }

  private _includeColumns: string[] = [];
  get includeColumns(): any {
    return this.ddDatagrid.includeColumns;
  }
  set includeColumns(value: string[]) {
    this.ddDatagrid.includeColumns = value;
  }

  get onDemandFunction(): any {
    return this.ddDatagrid.onDemandFunction;
  };
  set onDemandFunction(value: (args: IAcDatagridOnDemandRequestArgs) => void) {
    this.ddDatagrid.onDemandFunction = value;
    this.dataSource = this.datagridApi.dataSource;
    this.datagridApi.dataSource.getData();
  }

  ddDatagrid: AcDDDatagridElement = new AcDDDatagridElement();
  datagridApi!: AcDatagridApi;
  datagrid = new AcDatagrid();

  agGridExtension!: AcDatagridOnAgGridExtension;
  columnDraggingExtension!: AcDatagridColumnDraggingExtension;
  columnsCustomizerExtension!: AcDatagridColumnsCustomizerExtension;
  dataExportXlsxExtension!: AcDatagridDataExportXlsxExtension;
  dataSource!:AcDatagridOnDemandDataSource;
  rowDraggingExtension!: AcDatagridRowDraggingExtension;
  rowNumbersExtension!: AcDatagridRowNumbersExtension;
  rowSelectionExtension!: AcDatagridRowSelectionExtension;

  constructor() {
    super();
    this.element = this.ddDatagrid;
    this.datagrid = this.ddDatagrid.datagrid;
    this.datagridApi = this.ddDatagrid.datagridApi;
    AcDatagridExtensionManager.register(AgGridOnAcDatagrid)
    this.columnDraggingExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.ColumnDragging }) as AcDatagridColumnDraggingExtension;
    this.columnsCustomizerExtension = this.datagridApi.enableExtension( {extensionName:AcEnumDatagridExtension.ColumnsCustomizer}) as AcDatagridColumnsCustomizerExtension;
    this.dataExportXlsxExtension = this.datagridApi.enableExtension( {extensionName:AcEnumDatagridExtension.DataExportXlsx}) as AcDatagridDataExportXlsxExtension;
    this.rowNumbersExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.RowNumbers }) as AcDatagridRowNumbersExtension;
    this.rowSelectionExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.RowSelection }) as AcDatagridRowSelectionExtension;
    this.rowDraggingExtension = this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.RowDragging }) as AcDatagridRowDraggingExtension;
    this.agGridExtension = this.datagridApi.enableExtension({ extensionName: AcDatagridOnAgGridExtensionName }) as AcDatagridOnAgGridExtension;
  }

  override init({ args }: { args: IAcBuilderElementInitArgs }): void {
    this.element.style.height = "100%";
    this.setDatagridDisplay();
  }

  private setDatagridDisplay() {
    if (this.ddDatagrid.sourceType && this.ddDatagrid.sourceValue) {
      this.element.innerHTML = '';
      this.element.appendChild(this.ddDatagrid);
      this.datagridApi.dataSource.getData();
    }
    else {
      this.element.innerHTML = "Data Dictionary Datagrid";
    }
  }


}

export const AC_BUILDER_DD_DATAGRID_ELEMENT: IAcBuilderElement = {
  category: "Data Dictionary",
  name: "ddDatagrid",
  tag: "div",
  title: "Datagrid",
  keepHtml:false,
  properties: [
    { name: 'sourceType', 'category': 'Data Dictionary', title: 'Source Type', type: 'select',inputProperties:{'selectOptions':[
      {label:'Sql',value:'SQL'},
      {label:'Table',value:'TABLE'},
      {label:'View',value:'VIEW'}
    ]} },
    { name: 'sourceValue', 'category': 'Data Dictionary', title: 'Source Value', type: 'ddSelectDatagridSourceValueInput' },
    { name: 'columns', 'category': 'Data Dictionary', title: 'Columns', type: 'ddDatagridColumns' },
    { name: 'data', 'category': 'Data Dictionary', title: 'Data', type: 'selectClassProperty' },
    { name: 'onDemandFunction', 'category': 'Data Dictionary', title: 'On Demand Data Function', type: 'selectClassProperty' },
  ],
  mediaSvg: ACI_SVG_SOLID.table,
  instanceClass: AcDDDatagridBuilderElement
};
