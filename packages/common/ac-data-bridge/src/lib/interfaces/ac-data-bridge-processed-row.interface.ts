export interface IAcDataBridgeProcesedRow{
  data: any;
  sourceRow:any;
  operation: 'INSERT' | 'UPDATE' | 'SKIP',
  rowId: string;
  sourceRowId:string;
  status: 'PENDING'|'COMPLETED'|'STARTED'|'ERROR'
}
