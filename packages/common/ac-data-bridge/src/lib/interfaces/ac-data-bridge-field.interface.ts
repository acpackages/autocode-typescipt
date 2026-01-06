export interface IAcDataBridgeField{
  sourceFieldName?: string,
  sourceName?: string,
  templateFieldName?: string,
  templateName?: string,
  destinationName?: string,
  destinationFieldName?: string,
  isLookupTemplateField?:boolean,
  isTemplatePrimaryKey?:boolean,
  lookupForTemplateField?:string,
  isDestinationPrimaryKey?:boolean,
  foreignKeyTemplateName?:string,
  foreignKeyTemplateFieldName?:string
}
