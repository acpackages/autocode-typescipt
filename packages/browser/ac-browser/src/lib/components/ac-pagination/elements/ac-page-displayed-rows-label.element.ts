import { acAddClassToElement } from "../../../utils/ac-element-functions";
import { AcPaginationCssClassName } from "../consts/ac-pagination-css-class-name.const";
import { AcPaginationApi } from "../core/ac-pagination-api";

export class AcPageDisplayedRowsLabel {
  public element: HTMLElement = document.createElement('div');
  private paginationApi!: AcPaginationApi;

  constructor({ paginationApi }: { paginationApi: AcPaginationApi }) {
    this.paginationApi = paginationApi;
    this.initElement();
  }

  initElement(){
    acAddClassToElement({cssClass:AcPaginationCssClassName.acPageDisplayedRowsLabel,element:this.element});
    this.render();
  }

  render() {
    this.element.innerHTML = `<b>${this.paginationApi.startRow}</b> to <b>${this.paginationApi.endRow}</b> of <b>${this.paginationApi.totalRows}</b>`;
  }

}
