import { IAcDataBridgeField } from "./ac-data-bridge-field.interface";
import { IAcDataBridgeProcesedRow } from "./ac-data-bridge-processed-row.interface";

export interface IAcDataBridgeEntity{
  sourceName: string;
  templateName?: string;
  destinationName: string;
  fields: IAcDataBridgeField[];
  rowsCount: number,
  errorCount:number,
  processedCount:number,
  completedCount:number,
  percentage?:number,
  rows: any[],
  processedRows?:Record<string,IAcDataBridgeProcesedRow>
}
