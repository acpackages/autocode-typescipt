import { AcBuilderPropertyInput } from "../core/ac-builder-property-input";

export interface IAcBuilderPropertyInputType<T extends AcBuilderPropertyInput = AcBuilderPropertyInput> {
  inputElement: new (...args: any[]) => T;
  type:string;
  properties?:any;
}
