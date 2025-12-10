import { AcHooks, Autocode } from "@autocode-ts/autocode";
import { AcDatagridInternalCellElement } from "../elements/ac-datagrid-internal-cell.element";
import { AcDatagridInternalColumn } from "./ac-datagrid-internal-column.model";
import { IAcDatagridRow } from "../interfaces/ac-datagrid-row.interface";

export class AcDatagridInternalCell {
  cellId: string = Autocode.uuid();
  datagridRow!: IAcDatagridRow;
  datagridInternalColumn!: AcDatagridInternalColumn;
  extensionData: Record<string, any> = {};
  hooks: AcHooks = new AcHooks();
  instance!: AcDatagridInternalCellElement;
  get columnId(): string {
    return this.datagridInternalColumn.columnId;
  }
  get rowId(): string {
    return this.datagridRow.rowId;
  }
}
