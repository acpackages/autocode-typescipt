import { AcDDViewColumn } from "packages/common/ac-data-dictionary/src";

export interface IAcDDEViewColumnRow{
  column_id:string;
  view_id:string;
  data_dictionary_id:string;
  [AcDDViewColumn.KeyColumnName]:string;
  [AcDDViewColumn.KeyColumnType]:string;
  [AcDDViewColumn.KeyColumnSource]:string;
  [AcDDViewColumn.KeyColumnSourceName]:string;
  [AcDDViewColumn.KeyColumnProperties]:any;
}
