import { AcDDRelationship } from "@autocode-ts/ac-data-dictionary";

export interface IAcDDERelationshipRow{
  relationship_id:string;
  data_dictionary_id:string;
  [AcDDRelationship.KeyCascadeDeleteDestination]:string;
  [AcDDRelationship.KeyCascadeDeleteSource]:string;
  destination_column_id:string;
  destination_table_id:string;
  source_column_id:string;
  source_table_id:string;
}
