import { IAcBuilderElementEvent } from "./ac-builder-element-event.interface";
import { IAcBuilderElementProperty } from "./ac-builder-element-property.interface";

export interface IAcBuilderElement{
  tag:string;
  name:string;
  title:string;
  category:string;
  mediaPath?:string;
  mediaSvg?:string;
  properties?:IAcBuilderElementProperty[];
  events?:IAcBuilderElementEvent[];
  initCallback?:Function;
}
