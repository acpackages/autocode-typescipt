import { IAcTableColumn } from "./ac-table-column.interface";

export interface IAcConflictingRelationshipColumn {
  columnName:string,
  sourceColumns:IAcTableColumn[]
  destinationColumns:IAcTableColumn[]
}
