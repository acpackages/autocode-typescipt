import { AcDDTableColumn, AcEnumDDColumnProperty } from "@autocode-ts/ac-data-dictionary";

export const AcDDETableColumnRowKey = {
  autoIncrement:AcEnumDDColumnProperty.AutoIncrement,
  autoNumberLength:AcEnumDDColumnProperty.AutoNumberLength,
  autoNumberPrefix:AcEnumDDColumnProperty.AutoNumberPrefix,
  checkInAutoNumber:AcEnumDDColumnProperty.CheckInAutoNumber,
  checkInModify:AcEnumDDColumnProperty.CheckInModify,
  checkInSave:AcEnumDDColumnProperty.CheckInSave,
  columnId:'column_id',
  columnName:AcDDTableColumn.KeyColumnName,
  columnProperties:AcDDTableColumn.KeyColumnProperties,
  columnTitle:AcEnumDDColumnProperty.ColumnTitle,
  columnType:AcDDTableColumn.KeyColumnType,
  dataDictionaryId:'data_dictionary_id',
  defaultValue:AcEnumDDColumnProperty.DefaultValue,
  foreignKey:AcEnumDDColumnProperty.ForeignKey,
  format:AcEnumDDColumnProperty.Format,
  inSearchQuery:AcEnumDDColumnProperty.InSearchQuery,
  isSelectDistinct:AcEnumDDColumnProperty.IsSelectDistinct,
  notNull:AcEnumDDColumnProperty.NotNull,
  primaryKey:AcEnumDDColumnProperty.PrimaryKey,
  remarks:AcEnumDDColumnProperty.Remarks,
  required:AcEnumDDColumnProperty.Required,
  selectOptions:AcEnumDDColumnProperty.SelectOptions,
  setNullBeforeDelete:AcEnumDDColumnProperty.SetNullBeforeDelete,
  size:AcEnumDDColumnProperty.Size,
  tableId:'table_id',
  uniqueKey:AcEnumDDColumnProperty.UniqueKey,
  extensionsData:'extensions_data'
}

export interface IAcDDETableColumnRow {
  auto_increment?: boolean;
  auto_number_length?: number;
  auto_number_prefix?: string;
  check_in_auto_number?: boolean;
  check_in_modify?: boolean;
  check_in_save?: boolean;
  column_id?: string;
  column_name?: string;
  column_properties?: any;
  column_title?: string;
  column_type?: any;
  data_dictionary_id?: string;
  default_value?: any;
  foreign_key?: boolean;
  format?: any;
  in_search_key?: boolean;
  is_select_distinct?: boolean;
  not_null?: boolean;
  primary_key?: boolean;
  remarks?: string;
  required?: boolean;
  select_options?: any;
  set_null_before_delete?: boolean;
  size?: number;
  table_id?: string;
  unique_key?: boolean;
  extensions_data?:any;
}
