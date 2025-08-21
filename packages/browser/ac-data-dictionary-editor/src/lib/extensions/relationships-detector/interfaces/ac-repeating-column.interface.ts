import { IAcTableColumn } from "./ac-table-column.interface";

export interface IAcRepeatingColumn {
  column_name:string,
  tables:IAcTableColumn[]
}
