export interface IAcDataBridgeField{
  sourceFieldName?: string,
  sourceName?: string,
  templateFieldName?: string,
  templateName?: string,
  destinationName?: string,
  destinationFieldName?: string,
  isLookupTemplateField?:boolean,
  isTemplatePrimaryKey?:boolean,
  isUniqueValue?:boolean,
  lookupForTemplateField?:string,
  isDestinationPrimaryKey?:boolean,
  extensionTemplateHierarchy?:string[],
  foreignKeyTemplateName?:string,
  foreignKeyTemplateFieldName?:string,
  foreignKeyIncludeFieldsInFilter?:string[]
}
