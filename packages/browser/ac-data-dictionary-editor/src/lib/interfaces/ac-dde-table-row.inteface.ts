import { AcDDTable } from "@autocode-ts/ac-data-dictionary";

export const AcDDETableRowKey = {
  dataDictionaryId:'data_dictionary_id',
  tableId:'table_id',
  tableName:AcDDTable.KeyTableName,
  tableProperties:AcDDTable.KeyTableProperties
}

export interface IAcDDETableRow {
  data_dictionary_id:string;
  table_id:string;
  table_name:string;
  table_properties:any;
}
