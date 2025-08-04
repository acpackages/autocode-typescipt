import { acAddClassToElement } from "../../utils/ac-element-functions";
import { AcPaginationCssClassName } from "../consts/ac-pagination-css-class-name.const";
import { AcPaginationApi } from "../core/ac-pagination-api";
import { AcPageDisplayedRowsLabel } from "./ac-page-displayed-rows-label.element";
import { AcPageNavigationButtons } from "./ac-page-navigation-buttons.element";
import { AcPageSizeDropdown } from "./ac-page-size-dropdown.element";

export class AcPagination {
  get activePage():number{
    return this.paginationApi.activePage;
  }

  get activePageSize():number{
    return this.paginationApi.activePageSize;
  }

  get endRow():number{
    return this.paginationApi.endRow;
  }

  get pageSizes():number[]{
    return this.paginationApi.pageSizes;
  }

  get startRow():number{
    return this.paginationApi.startRow;
  }

  get totalPages():number{
    return this.paginationApi.totalPages;
  }

  get totalRows():number{
    return this.paginationApi.totalRows;
  }

  element:HTMLElement = document.createElement('div');
  pageDisplayedRowsLabel:AcPageDisplayedRowsLabel;
  pageNavigationButtons:AcPageNavigationButtons;
  pageSizeDropdown:AcPageSizeDropdown;
  paginationApi = new AcPaginationApi({pagination:this});

  constructor(){
    this.pageDisplayedRowsLabel = new AcPageDisplayedRowsLabel({paginationApi:this.paginationApi});
    this.pageNavigationButtons = new AcPageNavigationButtons({paginationApi:this.paginationApi});
    this.pageSizeDropdown = new AcPageSizeDropdown({paginationApi:this.paginationApi});
    this.initElement();
  }

  initElement() {
    acAddClassToElement({cssClass:AcPaginationCssClassName.acPagination,element:this.element});
    this.element.append(this.pageSizeDropdown.element);
    this.element.append(this.pageDisplayedRowsLabel.element);
    this.element.append(this.pageNavigationButtons.element);
  }

  on({eventName,callback}:{eventName:string,callback:Function}):string{
    return this.paginationApi.on({eventName:eventName,callback:callback});
  }

}
