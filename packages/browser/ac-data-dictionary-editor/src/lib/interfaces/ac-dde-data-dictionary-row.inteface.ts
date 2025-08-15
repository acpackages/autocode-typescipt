export const AcDDEDataDictionaaryRowKey = {
  dataDictionaryId:'data_dictionary_id',
  dataDictionaryName:'data_dictionary_name',
  dataDictionaryVersion:'data_dictionary_version',
  extensionsData:'extensions_data'
}

export interface IAcDDEDataDictionaryRow{
  data_dictionary_id:string;
  data_dictionary_name:string;
  data_dictionary_version:number;
  extensions_data:any;
}
