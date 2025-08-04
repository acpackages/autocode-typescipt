import { AcHooks, Autocode } from "@autocode-ts/autocode";
import { AcDatagridCellElement } from "../elements/ac-datagrid-cell.element";
import { AcDatagridRow } from "./ac-datagrid-row.model";
import { AcDatagridColumn } from "./ac-datagrid-column.model";
import { AcDatagridApi } from "../core/ac-datagrid-api";

export class AcDatagridCell {
  acCellId: string = Autocode.uuid();
  datagridApi!: AcDatagridApi;
  datagridRow!: AcDatagridRow;
  datagridColumn!: AcDatagridColumn;
  extensionData: Record<string, any> = {};
  hooks: AcHooks = new AcHooks();
  instance?: AcDatagridCellElement;

  get acColumnId(): string {
    return this.datagridColumn.acColumnId;
  }
  get acRowId(): string {
    return this.datagridRow.acRowId;
  }

  constructor({ datagridApi,datagridColumn, datagridRow, instance }:
    { datagridApi:AcDatagridApi,datagridColumn: AcDatagridColumn, datagridRow: AcDatagridRow, instance?: AcDatagridCellElement }) {
    this.datagridApi = datagridApi;
    this.datagridColumn = datagridColumn;
    this.datagridRow = datagridRow;
    this.instance = instance;
  }
}
