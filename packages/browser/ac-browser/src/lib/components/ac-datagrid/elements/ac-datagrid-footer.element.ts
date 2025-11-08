import { AcElementBase } from "../../../core/ac-element-base";
import { acAddClassToElement, acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AcTextInput } from "../../_components.export";
import { AcDatagridCssClassName } from "../consts/ac-datagrid-css-class-name.const";
import { AcDatagridApi } from "../core/ac-datagrid-api";


export class AcDatagridFooter extends AcElementBase {
  private _datagridApi!: AcDatagridApi;
  get datagridApi(): AcDatagridApi {
    return this._datagridApi;
  }
  set datagridApi(value: AcDatagridApi) {
    this._datagridApi = value;
  }

  searchInput:HTMLInputElement = this.ownerDocument.createElement('input');
  paginationContainer: HTMLElement = this.ownerDocument.createElement('div');
  searchContainer: HTMLElement = this.ownerDocument.createElement('div');

  constructor(){
    super();
    this.searchInput.placeholder = "Search rows..."
    this.searchInput.addEventListener('input',()=>{
      this.datagridApi.dataManager.searchQuery = this.searchInput.value;
    });
  }

  override init(): void {
    super.init();
    this.append(this.searchContainer);
    this.append(this.paginationContainer);
    this.setPagination();
    this.setSearchInput();
  }

  setPagination() {
    this.paginationContainer.innerHTML = "";
    if (this.datagridApi.usePagination && this.datagridApi.pagination) {
      acAddClassToElement({ class_: AcDatagridCssClassName.acDatagridFooterPaginationContainer, element: this.paginationContainer });
      this.paginationContainer.append(this.datagridApi.pagination);
    }
  }

  setSearchInput(){
    this.searchContainer.style.display = 'inline-block';
    this.searchContainer.style.paddingLeft = '5px';
    this.searchContainer.style.paddingRight = '5px';
    this.searchContainer.style.paddingTop = '5px';
    this.searchContainer.style.paddingBottom = '5px';
    this.searchContainer.innerHTML = '';
    this.searchContainer.append(this.searchInput);
  }
}

acRegisterCustomElement({tag:'ac-datagrid-footer',type:AcDatagridFooter});
