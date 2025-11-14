import { AcHooks, Autocode } from "@autocode-ts/autocode";
import { AcDatagridInternalCellElement } from "../elements/ac-datagrid-internal-cell.element";
import { AcDatagridRow } from "./ac-datagrid-row.model";
import { AcDatagridInternalColumn } from "./ac-datagrid-internal-column.model";

export class AcDatagridInternalCell {
  cellId: string = Autocode.uuid();
  datagridRow!: AcDatagridRow;
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
