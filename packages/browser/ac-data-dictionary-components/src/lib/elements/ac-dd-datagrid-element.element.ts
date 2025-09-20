import { AcDatagrid, AcInputBase, acRegisterCustomElement, IAcDatagridColumnDefinition } from "@autocode-ts/ac-browser";
import { AcDDInputManager } from "../core/ac-dd-input-manager";
import { AcDataDictionary, AcDDTableColumn } from "@autocode-ts/ac-data-dictionary";

export class AcDDDatagridElement extends HTMLElement {
  get dataSourceEntity(): string {
    return this.getAttribute('data-source-entity') ?? '';
  }
  set dataSourceEntity(value: string) {
    this.setAttribute('data-source-entity', value);
    this.setDatagrid();
  }

  private _dataSourceValue:any;
  get dataSourceValue(): any {
    return this._dataSourceValue;
  }
  set dataSourceValue(value: any) {
    this._dataSourceValue = value;
    this.setDatagrid();
  }

  private _datagridColumns:IAcDatagridColumnDefinition[] = [];
  get datagridColumns(): any {
    return this._datagridColumns;
  }
  set datagridColumns(value: any) {
    this._datagridColumns = value;
    this.setDatagrid();
  }

  private _includeColumns:string[] = [];
  get includeColumns(): any {
    return this._includeColumns;
  }
  set includeColumns(value: string[]) {
    this._includeColumns = value;
    this.setDatagrid();
  }

  private _excludeColumns:string[] = [];
  get excludeColumns(): any {
    return this._excludeColumns;
  }
  set excludeColumns(value: string[]) {
    this._excludeColumns = value;
    this.setDatagrid();
  }

  datagrid:AcDatagrid = new AcDatagrid();

  columns?: AcDDTableColumn;

  constructor() {
    super();
  }

  connectedCallback(): void {
    this.append(this.datagrid);
    this.setDatagrid();
  }

  private setDatagrid() {
    if (this.dataSourceEntity && this._dataSourceValue) {
      // const column = AcDataDictionary.getTableColumn({ tableName: this.tableName, columnName: this.columnName });
      // if (column) {
      //   this.ddTableColumn = column;
      // }
      // const inputDefinition = AcDDInputManager.getColumnInputDefinition({ tableName: this.tableName, columnName: this.columnName });
      // this.inputElement = new inputDefinition.inputClass();
      // if (inputDefinition.defaultProperties) {
      //   for (const key in inputDefinition.defaultProperties) {
      //     this.inputElement[key] = inputDefinition.defaultProperties[key];
      //     console.log(key);
      //   }
      // }
    }
  }
}

acRegisterCustomElement({tag:'ac-dd-datagrid',type:AcDDDatagridElement});
