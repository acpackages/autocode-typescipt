import { AcDDStoredProcedure } from "@autocode-ts/ac-data-dictionary";

export interface IAcDDEStoredProcedureRow{
  stored_procedure_id:string;
  data_dictionary_id:string;
  [AcDDStoredProcedure.KeyStoredProcedureName]:string;
  [AcDDStoredProcedure.KeyStoredProcedureCode]:string;
}
