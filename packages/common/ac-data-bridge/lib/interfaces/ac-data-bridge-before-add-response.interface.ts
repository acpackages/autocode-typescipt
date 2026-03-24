export interface IAcDataBridgeBeforeAddResponse{
  data:any,
  operation?:'INSERT' | 'UPDATE' | 'SKIP'
}
