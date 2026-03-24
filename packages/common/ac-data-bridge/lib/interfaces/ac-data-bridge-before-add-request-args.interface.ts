export interface IAcDataBridgeBeforeAddRequestArgs{
  data:any,
  operation:'INSERT'|'UPDATE'|'SKIP',
  destination:string
}
