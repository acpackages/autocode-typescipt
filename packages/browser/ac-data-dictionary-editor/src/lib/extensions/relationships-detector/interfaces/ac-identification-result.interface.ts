import { IAcConflictingRelationshipColumn } from "./ac-conflicting-relationship-column.interface"
import { IAcIdentifiedRelationship } from "./ac-identified-relationship.interface"

export interface IAcIdentifiedResult{
  conflicting_columns?:IAcConflictingRelationshipColumn[],
  data_dictionary_id:string,
  relationships?:IAcIdentifiedRelationship[]
}
