import { IAcPageElement } from "./ac-page-element.interface";

export interface IAcPage{
  name:string,
  html?:string,
  script?:string,
  className?:string,
  elements?:Record<string,IAcPageElement>
}
