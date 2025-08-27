import { IAcConflictingRelationshipColumn } from "./ac-conflicting-relationship-column.interface"
import { IAcIdentifiedRelationship } from "./ac-identified-relationship.interface"

export interface IAcIdentifiedResult{
  conflictingColumns?:IAcConflictingRelationshipColumn[],
  dataDictionaryId:string,
  relationships?:IAcIdentifiedRelationship[]
}
