import { AcBuilderElement } from "../core/ac-builder-element";
import { IAcBuilderElementEvent } from "./ac-builder-element-event.interface";
import { IAcBuilderElementProperty } from "./ac-builder-element-property.interface";

export interface IAcBuilderElement<T extends AcBuilderElement = AcBuilderElement>{
  tag:string;
  name:string;
  title:string;
  category:string;
  mediaPath?:string;
  mediaSvg?:string;
  properties?:IAcBuilderElementProperty[];
  events?:IAcBuilderElementEvent[];
  instanceClass: new (...args: any[]) => T;
}
