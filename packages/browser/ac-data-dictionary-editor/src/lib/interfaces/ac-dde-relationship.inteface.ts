export interface IAcDDERelationship {
  cascadeDeleteDestination?:string;
  cascadeDeleteSource?:string;
  dataDictionaryId:string;
  destinationColumnId?:string;
  destinationTableId?:string;
  relationshipId:string;
  sourceColumnId?:string;
  sourceTableId?:string;
  extensionsData?:any;
}
