import { AcDDTrigger } from "@autocode-ts/ac-data-dictionary";

export interface IAcDDETriggerRow{
  trigger_id:string;
  table_id:string;
  data_dictionary_id:string;
  [AcDDTrigger.KeyRowOperation]:string;
  [AcDDTrigger.KeyTriggerCode]:string;
  [AcDDTrigger.KeyTriggerExecution]:string;
  [AcDDTrigger.KeyTriggerName]:string;
}
