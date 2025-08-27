import { acAddClassToElement } from "../../../utils/ac-element-functions";
import { AcRepeaterCssClassName } from "../consts/ac-repeater-css-class-name.const";
import { AcRepeaterApi } from "../core/ac-repeater-api";


export class AcRepeaterFooterElement {
  public element: HTMLElement = document.createElement('div');
  paginationContainer: HTMLElement = document.createElement('div');
  private repeaterApi: AcRepeaterApi;
  constructor({ repeaterApi }: { repeaterApi: AcRepeaterApi }) {
    this.repeaterApi = repeaterApi;
    this.initElement();
  }

  initElement() {
    acAddClassToElement({ cssClass: AcRepeaterCssClassName.acRepeaterFooter, element: this.element });
  }

  setPagination() {
    if(this.repeaterApi.usePagination && this.repeaterApi.pagination){
      acAddClassToElement({ cssClass: AcRepeaterCssClassName.acRepeaterFooterPaginationContainer, element: this.paginationContainer });
      this.element.append(this.paginationContainer);
      this.paginationContainer.append(this.repeaterApi.pagination.element);
    }
  }
}
