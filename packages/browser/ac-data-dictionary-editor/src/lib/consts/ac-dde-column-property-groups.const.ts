import { AcEnumDDColumnProperty } from "@autocode-ts/ac-data-dictionary";

export const boolColumnProperties: any[] = [
  AcEnumDDColumnProperty.AutoIncrement,
  AcEnumDDColumnProperty.CheckInAutoNumber,
  AcEnumDDColumnProperty.CheckInModify,
  AcEnumDDColumnProperty.CheckInSave,
  AcEnumDDColumnProperty.ForeignKey,
  AcEnumDDColumnProperty.InSearchQuery,
  AcEnumDDColumnProperty.IsSelectDistinct,
  AcEnumDDColumnProperty.NotNull,
  AcEnumDDColumnProperty.PrimaryKey,
  AcEnumDDColumnProperty.Required,
  AcEnumDDColumnProperty.SetNullBeforeDelete,
  AcEnumDDColumnProperty.UniqueKey
];
export const numberColumnProperties: any[] = [
  AcEnumDDColumnProperty.AutoNumberLength,
  AcEnumDDColumnProperty.Size
];

export const stringColumnProperties: any[] = [
  AcEnumDDColumnProperty.AutoNumberPrefix,
  AcEnumDDColumnProperty.ColumnTitle,
  AcEnumDDColumnProperty.Format,
  AcEnumDDColumnProperty.Remarks
];
