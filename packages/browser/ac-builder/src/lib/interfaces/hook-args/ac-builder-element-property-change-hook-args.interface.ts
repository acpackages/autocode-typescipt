import { IAcBuilderElementProperty } from "../ac-builder-element-property.interface";
import { IAcBuilderElement } from "../ac-builder-element.interface";
import { IAcComponentElement } from "../ac-component-element.interface";

export interface IAcBuilderElementPropertyChangeHookArgs {
  builderElement: IAcBuilderElement;
  componentElement: IAcComponentElement;
  instanceName: string;
  property: IAcBuilderElementProperty;
  propertyName: string;
  newValue: any;
  oldValue: any;
};
