/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcElementBase } from "../../../core/ac-element-base";
import { acAddClassToElement, acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AC_DATAGRID_HOOK } from "../_ac-datagrid.export";
import { AcDatagridCssClassName } from "../consts/ac-datagrid-css-class-name.const";
import { AcDatagridApi } from "../core/ac-datagrid-api";
import { AcDatagridBody } from "./ac-datagrid-body.element";
import { AcDatagridFooter } from "./ac-datagrid-footer.element";
import { AcDatagridHeader } from "./ac-datagrid-header.element";

export class AcDatagrid extends AcElementBase {
  containerElement: HTMLElement = this.ownerDocument.createElement('div');
  datagridApi: AcDatagridApi = new AcDatagridApi({ datagrid: this });
  datagridBody: AcDatagridBody = new AcDatagridBody();
  datagridFooter: AcDatagridFooter = new AcDatagridFooter();
  datagridHeader: AcDatagridHeader = new AcDatagridHeader();

  constructor() {
    super();
    this.datagridBody.datagridApi = this.datagridApi;
    this.datagridFooter.datagridApi = this.datagridApi;
    this.datagridHeader.datagridApi = this.datagridApi;
  }

  override destroy(): void {
    super.destroy();
    this.datagridApi.destroy();
    (this.datagridApi as any)= null;
  }

  override init(): void {
    this.append(this.containerElement);
    this.containerElement.append(this.datagridHeader);
    this.containerElement.append(this.datagridBody);
    this.append(this.datagridFooter);
    this.style.display = 'flex';
    this.style.flexDirection = 'column';
    acAddClassToElement({ class_: AcDatagridCssClassName.acDatagrid, element: this });
    acAddClassToElement({ class_: AcDatagridCssClassName.acDatagridContainer, element: this.containerElement });
    this.datagridApi.hooks.execute({hook:AC_DATAGRID_HOOK.DatagridInit});
    setTimeout(() => {
      // this.datagridApi.dataManager.getData();
    }, 50);
  }

}

acRegisterCustomElement({ tag: 'ac-datagrid', type: AcDatagrid });
