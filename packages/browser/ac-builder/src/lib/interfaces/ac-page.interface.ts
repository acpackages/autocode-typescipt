import { IAcPageElement } from "./ac-page-element.interface";

export interface IAcPage{
  name:string,
  html?:string,
  script?:string,
  elements?:Record<string,IAcPageElement>
}
