import { AcDDFunction } from "@autocode-ts/ac-data-dictionary";

export const AcDDEFunctionRowKey = {
  dataDictionaryId:'data_dictionary_id',
  functionId:'function_id',
  functionName:AcDDFunction.KeyFunctionName,
  functionCode:AcDDFunction.KeyFunctionCode,
  extensionsData:'extensions_data'
}

export interface IAcDDEFunctionRow{
  data_dictionary_id?:string;
  function_id?:string;
  function_name?:string;
  function_code?:string;
  extensions_data?:any;
}

