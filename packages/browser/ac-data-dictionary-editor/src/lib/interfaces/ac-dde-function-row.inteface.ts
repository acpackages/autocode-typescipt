import { AcDDFunction } from "@autocode-ts/ac-data-dictionary";

export interface IAcDDEFunctionRow{
  function_id:string;
  data_dictionary_id:string;
  [AcDDFunction.KeyFunctionName]:string;
  [AcDDFunction.KeyFunctionCode]:string;
}
