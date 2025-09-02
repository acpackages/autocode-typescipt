import { IAcPageElementEventFunction } from "./ac-page-element-event-function.interface";
import { IAcPageElementPropertyValue } from "./ac-page-element-property-value.interface";


export interface IAcPageElement{
  id:string,
  instance?:any,
  name:string,
  events:Record<string,IAcPageElementEventFunction>,
  properties:Record<string,IAcPageElementPropertyValue>
}
