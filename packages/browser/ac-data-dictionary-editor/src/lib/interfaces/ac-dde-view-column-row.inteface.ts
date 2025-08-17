import { AcDDViewColumn } from "@autocode-ts/ac-data-dictionary";

export const AcDDEViewColumnRowKey = {
  columnId:'column_id',
  columnName:AcDDViewColumn.KeyColumnName,
  columnProperties:AcDDViewColumn.KeyColumnProperties,
  columnSource:AcDDViewColumn.KeyColumnSource,
  columnSourceName:AcDDViewColumn.KeyColumnSourceName,
  columnType:AcDDViewColumn.KeyColumnType,
  dataDictionaryId:'data_dictionary_id',
  viewId:'view_id',
  extensionsData:'extensions_data'
}

export interface IAcDDEViewColumnRow{
  column_id?:string;
  column_name?:string;
  column_properties?:any;
  column_source?:string;
  column_source_name?:string;
  column_type?:string;
  data_dictionary_id?:string;
  view_id?:string;
  extensions_data?:any;
}
