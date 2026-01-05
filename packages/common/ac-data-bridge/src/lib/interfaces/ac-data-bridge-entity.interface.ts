import { IAcDataBridgeField } from "./ac-data-bridge-field.interface";

export interface IAcDataBridgeEntity{
  sourceName: string;
  templateName?: string;
  destinationName: string;
  fields: IAcDataBridgeField[];
  rowsCount: number,
  errorCount:number,
  processedCount:number,
  completedCount:number,
  rows: any[],
  parentTemplateEntityName?:Record<string,IAcDataBridgeEntity>
}
