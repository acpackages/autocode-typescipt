import { AcDDEApi } from "../../core/ac-dde-api";
import { IAcDDEDataDictionaryRow } from "../ac-dde-data-dictionary-row.inteface";

export interface IAcDDEActiveDataDictionaryChangeHookArgs{
  activeDataDictionary:IAcDDEDataDictionaryRow
  editorApi:AcDDEApi,
  oldActiveDataDictionary?:IAcDDEDataDictionaryRow,
}
