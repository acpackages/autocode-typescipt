import { acAddClassToElement } from "../../utils/ac-element-functions";
import { AcDatagridCssClassName } from "../consts/ac-datagrid-css-class-name.const";
import { AcDatagridApi } from "../core/ac-datagrid-api";


export class AcDatagridFooterElement {
  public element: HTMLElement = document.createElement('div');
  paginationContainer: HTMLElement = document.createElement('div');
  private datagridApi: AcDatagridApi;
  constructor({ datagridApi }: { datagridApi: AcDatagridApi }) {
    this.datagridApi = datagridApi;
    this.initElement();
  }

  initElement() {
    acAddClassToElement({ cssClass: AcDatagridCssClassName.acDatagridFooter, element: this.element });
  }

  setPagination() {
    if(this.datagridApi.usePagination && this.datagridApi.pagination){
      acAddClassToElement({ cssClass: AcDatagridCssClassName.acDatagridFooterPaginationContainer, element: this.paginationContainer });
      this.element.append(this.paginationContainer);
      this.paginationContainer.append(this.datagridApi.pagination.element);
    }
  }
}
