import { AcDDStoredProcedure } from "@autocode-ts/ac-data-dictionary";

export const AcDDEStoredProcedureRowKey = {
  dataDictionaryId:'data_dictionary_id',
  storedProcedureCode:AcDDStoredProcedure.KeyStoredProcedureCode,
  storedProcedureId:'stored_procedure_id',
  storedProcedureName:AcDDStoredProcedure.KeyStoredProcedureName,
  extensionsData:'extensions_data'
}

export interface IAcDDEStoredProcedureRow{
  data_dictionary_id?:string;
  stored_procedure_code?:string;
  stored_procedure_id?:string;
  stored_procedure_name?:string;
  extensions_data?:any;
}
