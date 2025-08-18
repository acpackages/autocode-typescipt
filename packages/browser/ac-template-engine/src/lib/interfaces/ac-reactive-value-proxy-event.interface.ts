import { AcReactiveValueProxy } from "../models/ac-reactive-value-proxy.model";

export interface IAcReactiveValueProxyEvent{
  event:string,
  reactiveProxyValue:AcReactiveValueProxy;
  target:any;
  property:any;
  value?:any;
  oldValue:any;
}
