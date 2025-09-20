/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { acAddClassToElement, acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AcDatagridCssClassName } from "../consts/ac-datagrid-css-class-name.const";
import { AcDatagridApi } from "../core/ac-datagrid-api";
import { AcDatagridBodyElement } from "./ac-datagrid-body.element";
import { AcDatagridFooterElement } from "./ac-datagrid-footer.element";
import { AcDatagridHeaderElement } from "./ac-datagrid-header.element";

export class AcDatagrid extends HTMLElement{
  containerElement:HTMLElement = document.createElement('div');
  datagridApi:AcDatagridApi = new AcDatagridApi({datagrid:this});
  datagridBody:AcDatagridBodyElement =  new AcDatagridBodyElement({datagridApi:this.datagridApi});
  datagridFooter:AcDatagridFooterElement =  new AcDatagridFooterElement({datagridApi:this.datagridApi});
  datagridHeader:AcDatagridHeaderElement =  new AcDatagridHeaderElement({datagridApi:this.datagridApi});
  element:HTMLElement = document.createElement('div');

  private handleClick(event:any){
    console.log(this.datagridApi);
    // this.datagridApi.setFocusedCell({cell:this.cell});
  }

  private handleKeyUp(event:any){
    console.log(event);
    // this.datagridApi.setFocusedCell({cell:this.cell});
  }

  private handleFocus(event:any){
    console.log(event);
  }

  init(){
    this.datagridApi.dataSource.getData();
  }

  connectedCallback(){
    acAddClassToElement({class_:AcDatagridCssClassName.acDatagrid,element:this.element});
    acAddClassToElement({class_:AcDatagridCssClassName.acDatagridContainer,element:this.containerElement});
    this.element.append(this.containerElement);
    this.containerElement.append(this.datagridHeader.element);
    this.containerElement.append(this.datagridBody.element);
    this.element.append(this.datagridFooter.element);
  }

  on({event,callback}:{event:string,callback:Function}):string{
    return this.datagridApi.on({event:event,callback:callback});
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

acRegisterCustomElement({tag:'ac-datagrid',type:AcDatagrid});
