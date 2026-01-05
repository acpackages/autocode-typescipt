import { IAcDataBridgeField } from "./ac-data-bridge-field.interface";
import { IAcDataBridgeForeignKeyField } from "./ac-data-bridge-foreign-key-field.interface";

export interface IAcDataBridgeEntityTemplateExtend{
  templateName:string,
  excludeFields?:string[],
  includeFields?:string[],
  parentDestinationField?:string,
  childDestinationField?:string,
  referencingFields?:IAcDataBridgeForeignKeyField[]
}

export interface IAcDataBridgeEntityTemplateDef{
  templateName: string;
  destinationName?: string;
  templateFields: IAcDataBridgeField[],
  extendChildTemplates?:IAcDataBridgeEntityTemplateExtend[],
  extendParentTemplates?:IAcDataBridgeEntityTemplateExtend[]
}
