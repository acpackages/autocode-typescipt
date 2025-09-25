/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcElementBase } from "../../../core/ac-element-base";
import { acAddClassToElement, acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AcDatagridCssClassName } from "../consts/ac-datagrid-css-class-name.const";
import { AcDatagridApi } from "../core/ac-datagrid-api";
import { AcDatagridBodyElement } from "./ac-datagrid-body.element";
import { AcDatagridFooterElement } from "./ac-datagrid-footer.element";
import { AcDatagridHeaderElement } from "./ac-datagrid-header.element";

export class AcDatagrid extends AcElementBase{
  containerElement:HTMLElement = document.createElement('div');
  datagridApi:AcDatagridApi = new AcDatagridApi({datagrid:this});
  datagridBody:AcDatagridBodyElement =  new AcDatagridBodyElement({datagridApi:this.datagridApi});
  datagridFooter:AcDatagridFooterElement =  new AcDatagridFooterElement({datagridApi:this.datagridApi});
  datagridHeader:AcDatagridHeaderElement =  new AcDatagridHeaderElement({datagridApi:this.datagridApi});
  element:HTMLElement = document.createElement('div');

  constructor(){
    super();
    this.style.display = 'contents';
    this.append(this.element);
    acAddClassToElement({class_:AcDatagridCssClassName.acDatagrid,element:this.element});
    acAddClassToElement({class_:AcDatagridCssClassName.acDatagridContainer,element:this.containerElement});
    this.element.append(this.containerElement);
    this.containerElement.append(this.datagridHeader.element);
    this.containerElement.append(this.datagridBody.element);
    this.element.append(this.datagridFooter.element);
    this.datagridApi.dataSource.getData();
  }
}

acRegisterCustomElement({tag:'ac-datagrid',type:AcDatagrid});
