import { IAcPageElementEventFunction } from "./ac-page-element-event-function.interface";
import { IAcPageElementPropertyValue } from "./ac-page-element-property-value.interface";


export interface IAcPageElement{
  id:string,
  element?:HTMLElement,
  name:string,
  events:IAcPageElementEventFunction[],
  properties:IAcPageElementPropertyValue[]
}
