import { IAcComponentElement } from "./ac-component-element.interface";

export interface IAcBuilderComponent{
  name:string,
  html?:string,
  script?:string,
  className?:string,
  elements?:Record<string,IAcComponentElement>,
  elementAttributes?:any
}
