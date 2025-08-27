import { IAcTableColumn } from "./ac-table-column.interface";

export interface IAcRepeatingColumn {
  columnName:string,
  tables:IAcTableColumn[]
}
