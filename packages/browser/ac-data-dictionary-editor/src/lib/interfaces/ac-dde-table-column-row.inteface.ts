import { AcDDTableColumn, AcEnumDDColumnProperty } from "@autocode-ts/ac-data-dictionary";

export interface IAcDDETableColumnRow {
  column_id: string;
  table_id: string;
  data_dictionary_id: string;
  [AcDDTableColumn.KeyColumnName]: string;
  [AcDDTableColumn.KeyColumnType]: string;
  [AcEnumDDColumnProperty.AutoIncrement]?: boolean;
  [AcEnumDDColumnProperty.AutoNumberLength]?: number;
  [AcEnumDDColumnProperty.AutoNumberPrefix]?: string;
  [AcEnumDDColumnProperty.CheckInAutoNumber]?: boolean;
  [AcEnumDDColumnProperty.CheckInModify]?: boolean;
  [AcEnumDDColumnProperty.CheckInSave]?: boolean;
  [AcEnumDDColumnProperty.ColumnTitle]?: string;
  [AcEnumDDColumnProperty.DefaultValue]?: any;
  [AcEnumDDColumnProperty.ForeignKey]?: boolean;
  [AcEnumDDColumnProperty.Format]?: any;
  [AcEnumDDColumnProperty.InSearchQuery]?: boolean;
  [AcEnumDDColumnProperty.IsSelectDistinct]?: boolean;
  [AcEnumDDColumnProperty.NotNull]?: boolean;
  [AcEnumDDColumnProperty.PrimaryKey]?: boolean;
  [AcEnumDDColumnProperty.Remarks]?: string;
  [AcEnumDDColumnProperty.Required]?: boolean;
  [AcEnumDDColumnProperty.SelectOptions]?: any;
  [AcEnumDDColumnProperty.SetNullBeforeDelete]?: boolean;
  [AcEnumDDColumnProperty.Size]?: number;
  [AcEnumDDColumnProperty.UniqueKey]?: boolean;
  [AcDDTableColumn.KeyColumnProperties]: any;
}
