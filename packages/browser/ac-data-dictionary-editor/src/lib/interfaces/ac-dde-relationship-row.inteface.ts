import { AcDDRelationship } from "@autocode-ts/ac-data-dictionary";

export const AcDDERelationshipRowKey = {
  cascadeDeleteDestination:AcDDRelationship.KeyCascadeDeleteDestination,
  cascadeDeleteSource:AcDDRelationship.KeyCascadeDeleteSource,
  dataDictionaryId:'data_dictionary_id',
  destinationColumnId:'destination_column_id',
  destinationTableId:'destination_table_id',
  relationshipId:'relationship_id',
  sourceColumnId:'source_column_id',
  sourceTableId:'source_table_id',
  extensionsData:'extensions_data'
}

export interface IAcDDERelationshipRow{
  cascade_delete_destination?:string;
  cascade_delete_source?:string;
  data_dictionary_id:string;
  destination_column_id?:string;
  destination_table_id?:string;
  relationship_id:string;
  source_column_id?:string;
  source_table_id?:string;
  extensions_data?:any;
}
