import { IAcComponentElementEventFunction } from "./ac-component-element-event-function.interface";
import { IAcComponentElementPropertyValue } from "./ac-component-element-property-value.interface";



export interface IAcComponentElement{
  instanceName:string,
  instance?:any,
  name:string,
  events:Record<string,IAcComponentElementEventFunction>,
  properties:Record<string,IAcComponentElementPropertyValue>,
  elementAttributes?:any
}
