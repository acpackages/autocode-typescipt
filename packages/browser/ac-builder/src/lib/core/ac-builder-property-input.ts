import { AcInputBase } from "@autocode-ts/ac-browser";
import { AcBuilderApi } from "./ac-builder-api";
import { IAcComponentElement } from "../interfaces/ac-component-element.interface";
import { IAcBuilderElement } from "../interfaces/ac-builder-element.interface";

export abstract class AcBuilderPropertyInput extends AcInputBase{
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  private _builderApi?:AcBuilderApi;
  get builderApi():AcBuilderApi|undefined{
    return this._builderApi;
  }
  set builderApi(value:AcBuilderApi){
    this._builderApi = value;
  }

  private _builderElement?:IAcBuilderElement;
  get builderElement():IAcBuilderElement|undefined{
    return this._builderElement;
  }
  set builderElement(value:IAcBuilderElement){
    this._builderElement = value;
  }

  private _componentElement?:IAcComponentElement;
  get componentElement():IAcComponentElement|undefined{
    return this._componentElement;
  }
  set componentElement(value:IAcComponentElement){
    this._componentElement = value;
  }

}
