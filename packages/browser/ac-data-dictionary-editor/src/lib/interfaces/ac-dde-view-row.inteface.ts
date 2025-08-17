import { AcDDView } from "@autocode-ts/ac-data-dictionary";

export const AcDDEViewRowKey = {
  dataDictionaryId:'data_dictionary_id',
  viewId:'view_id',
  viewName:AcDDView.KeyViewName,
  viewQuery:AcDDView.KeyViewQuery,
  extensionsData:'extensions_data'
}

export interface IAcDDEViewRow{
  data_dictionary_id:string;
  view_id:string;
  view_name?:string;
  view_query?:string;
  extensions_data?:any;
}
