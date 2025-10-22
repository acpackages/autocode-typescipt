import { AcElementBase } from "../../../core/ac-element-base";
import { acAddClassToElement, acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AC_PAGINATION_TAG } from "../_ac-pagination.export";
import { AcPaginationCssClassName } from "../consts/ac-pagination-css-class-name.const";
import { AcPaginationApi } from "../core/ac-pagination-api";
import { AcPageDisplayedRowsLabel } from "./ac-page-displayed-rows-label.element";
import { AcPageNavigationButtons } from "./ac-page-navigation-buttons.element";
import { AcPageSizeDropdown } from "./ac-page-size-dropdown.element";

export class AcPagination extends AcElementBase{
  get activePage():number{
    return this.paginationApi.activePage;
  }
  set activePage(value:number){
    this.paginationApi.activePage = value;
  }

  get activePageSize():number{
    return this.paginationApi.activePageSize;
  }
  set activePageSize(value:number){
    this.paginationApi.activePageSize = value;
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
  set totalRows(value:number){
    this.paginationApi.totalRows = value;
  }
  element:HTMLElement = document.createElement('div');
  pageDisplayedRowsLabel!:AcPageDisplayedRowsLabel;
  pageNavigationButtons!:AcPageNavigationButtons;
  pageSizeDropdown!:AcPageSizeDropdown;
  paginationApi = new AcPaginationApi({pagination:this});

  override connectedCallback(){
    super.connectedCallback();
    this.pageDisplayedRowsLabel = new AcPageDisplayedRowsLabel({paginationApi:this.paginationApi});
    this.pageNavigationButtons = new AcPageNavigationButtons({paginationApi:this.paginationApi});
    this.pageSizeDropdown = new AcPageSizeDropdown({paginationApi:this.paginationApi});
    this.initElement();
  }

  initElement() {
    acAddClassToElement({class_:AcPaginationCssClassName.acPagination,element:this});
    this.append(this.pageSizeDropdown.element);
    this.append(this.pageDisplayedRowsLabel.element);
    this.append(this.pageNavigationButtons.element);
  }

}

acRegisterCustomElement({tag:AC_PAGINATION_TAG.pagination,type:AcPagination});
