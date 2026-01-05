export interface IAcDataBridgeField{
  sourceFieldName?: string,
  sourceName?: string,
  templateFieldName?: string,
  templateName?: string,
  destinationName?: string,
  destinationFieldName?: string,
  isTemplatePrimaryKey?:boolean,
  isLookupReferenceField?:boolean,
  isDestinationPrimaryKey?:boolean,
  foreignKeyTemplateName?:string,
  foreignKeyTemplateFieldName?:string
}
