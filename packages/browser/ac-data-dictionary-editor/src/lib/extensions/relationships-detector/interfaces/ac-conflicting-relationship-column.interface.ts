import { IAcTableColumn } from "./ac-table-column.interface";

export interface IAcConflictingRelationshipColumn {
  column_name:string,
  source_columns:IAcTableColumn[]
  destination_columns:IAcTableColumn[]
}
