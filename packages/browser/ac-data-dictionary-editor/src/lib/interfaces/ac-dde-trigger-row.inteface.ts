import { AcDDTrigger } from "@autocode-ts/ac-data-dictionary";

export const AcDDETriggerRowKey = {
  dataDictionaryId:'data_dictionary_id',
  rowOperation:AcDDTrigger.KeyRowOperation,
  tableId:'table_id',
  triggerCode:AcDDTrigger.KeyTriggerCode,
  triggerExecution:AcDDTrigger.KeyTriggerExecution,
  triggerId:'trigger_id',
  triggerName:AcDDTrigger.KeyTriggerName
}

export interface IAcDDETriggerRow{
  data_dictionary_id:string;
  row_operation:string;
  table_id:string;
  trigger_code:string;
  trigger_execution:string;
  trigger_id:string;
  trigger_name:string;
}
