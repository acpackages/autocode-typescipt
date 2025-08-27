import { acAddClassToElement } from "../../../utils/ac-element-functions";
import { AcRepeaterCssClassName } from "../consts/ac-repeater-css-class-name.const";
import { AcRepeaterApi } from "../core/ac-repeater-api";
import { IAcRepeaterHeaderHookArgs } from "../interfaces/hook-args/ac-repeater-header-hook-args.interface";


export class AcRepeaterHeaderElement {
  public element:HTMLElement = document.createElement('div');
  private repeaterApi:AcRepeaterApi;
  headerRowElement:HTMLElement = document.createElement('div');

  constructor({repeaterApi}:{repeaterApi:AcRepeaterApi}){
    this.repeaterApi = repeaterApi;
    this.initElement();
  }

  initElement(){
    acAddClassToElement({cssClass:AcRepeaterCssClassName.acRepeaterHeader,element:this.element});
    this.element.append(this.headerRowElement);
  }

  setColumns(){
    this.headerRowElement.innerHTML = "";
    const hookArgs:IAcRepeaterHeaderHookArgs = {
      repeaterHeader:this,
      repeaterApi:this.repeaterApi
    };
  }
}
