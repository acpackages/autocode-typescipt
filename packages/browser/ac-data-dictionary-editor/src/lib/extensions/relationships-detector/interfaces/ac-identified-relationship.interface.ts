export interface IAcIdentifiedRelationship{
  source_table_id?:string,
  source_column_id?:string,
  source_table_name?:string,
  source_column_name?:string
  destination_table_id?:string,
  destination_column_id?:string,
  destination_table_name?:string,
  destination_column_name?:string
}
