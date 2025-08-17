import { AcDDTable, AcEnumDDTableProperty } from "@autocode-ts/ac-data-dictionary";

export const AcDDETableRowKey = {
  additionalFilterColumns:AcEnumDDTableProperty.AdditionalFilterColumns,
  dataDictionaryId:'data_dictionary_id',
  index:AcEnumDDTableProperty.Index,
  orderBy:AcEnumDDTableProperty.OrderBy,
  pluralName:AcEnumDDTableProperty.PluralName,
  selectQuery:AcEnumDDTableProperty.SelectQuery,
  selectQueryColumns:AcEnumDDTableProperty.SelectQueryColumns,
  selectRequestColumns:AcEnumDDTableProperty.SelectRequestColumns,
  singularName:AcEnumDDTableProperty.SingularName,
  viewId:'view_id',
  tableId:'table_id',
  tableName:AcDDTable.KeyTableName,
  tableProperties:AcDDTable.KeyTableProperties,
  extensionsData:'extensions_data'
}

export interface IAcDDETableRow {
  additional_filter_columns?:string,
  data_dictionary_id?:string;
  index?:number,
  order_by?:string,
  plural_name?:string,
  select_query?:string,
  select_query_columns?:string,
  select_request_columns?:string,
  singular_name?:string,
  view_id?:string,
  table_id?:string;
  table_name?:string;
  table_properties?:any;
  extensions_data?:any;
}
