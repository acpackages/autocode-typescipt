import { acAddClassToElement, acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AcRepeaterCssClassName } from "../consts/ac-repeater-css-class-name.const";
import { AC_REPEATER_TAG } from "../consts/ac-repeater-tag.const";
import { AcRepeaterApi } from "../core/ac-repeater-api";
import { AcRepeaterBodyElement } from "./ac-repeater-body.element";
import { AcRepeaterFooterElement } from "./ac-repeater-footer.element";
import { AcRepeaterHeaderElement } from "./ac-repeater-header.element";

export class AcRepeater{
  containerElement:HTMLElement = document.createElement('div');
  repeaterApi:AcRepeaterApi = new AcRepeaterApi({repeater:this});
  repeaterBody:AcRepeaterBodyElement =  new AcRepeaterBodyElement({repeaterApi:this.repeaterApi});
  repeaterFooter:AcRepeaterFooterElement =  new AcRepeaterFooterElement({repeaterApi:this.repeaterApi});
  repeaterHeader:AcRepeaterHeaderElement =  new AcRepeaterHeaderElement({repeaterApi:this.repeaterApi});
  element:HTMLElement = document.createElement('div');

  constructor(){
    this.initElement();
  }

  private handleClick(event:any){
    // this.repeaterApi.setFocusedCell({cell:this.cell});
  }

  private handleKeyUp(event:any){
    // this.repeaterApi.setFocusedCell({cell:this.cell});
  }

  private handleFocus(event:any){
    //
  }

  init(){
    this.repeaterApi.dataManager.getData();
  }

  private initElement(){
    acAddClassToElement({class_:AcRepeaterCssClassName.acRepeater,element:this.element});
    acAddClassToElement({class_:AcRepeaterCssClassName.acRepeaterContainer,element:this.containerElement});
    this.element.append(this.containerElement);
    this.containerElement.append(this.repeaterHeader.element);
    this.containerElement.append(this.repeaterBody.element);
    this.element.append(this.repeaterFooter.element);
  }

  on({event,callback}:{event:string,callback:Function}):string{
    return this.repeaterApi.on({event:event,callback:callback});
  }

  private registerEvents(){
    this.element.addEventListener('click',(e:any)=>{
      this.handleClick(e);
    });
    this.element.addEventListener('keydown',(e:any)=>{
      this.handleKeyUp(e);
    });
  }
}

acRegisterCustomElement({tag:AC_REPEATER_TAG.repeater,type:AcRepeater});
