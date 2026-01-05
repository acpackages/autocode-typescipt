export interface IAcDataBridgeForeignKeyField{
  extendingTemplateFieldName: string,
  templateDestinationFieldName?: string,
  templateDestinationName?: string,
  lookupFields?:string[],
}
