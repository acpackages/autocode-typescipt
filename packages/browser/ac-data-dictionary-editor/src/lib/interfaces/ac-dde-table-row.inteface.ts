import { AcDDTable } from "@autocode-ts/ac-data-dictionary";

export interface IAcDDETableRow{
  table_id:string;
  data_dictionary_id:string;
  [AcDDTable.KeyTableName]:string;
  [AcDDTable.KeyTableProperties]:any;
}
