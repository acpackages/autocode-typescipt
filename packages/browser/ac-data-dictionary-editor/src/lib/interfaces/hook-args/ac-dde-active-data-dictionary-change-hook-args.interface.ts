import { AcDDEApi } from "../../core/ac-dde-api";
import { IAcDDEDataDictionary } from "../ac-dde-data-dictionary.inteface";

export interface IAcDDEActiveDataDictionaryChangeHookArgs{
  activeDataDictionary:IAcDDEDataDictionary
  editorApi:AcDDEApi,
  oldActiveDataDictionary?:IAcDDEDataDictionary,
}
