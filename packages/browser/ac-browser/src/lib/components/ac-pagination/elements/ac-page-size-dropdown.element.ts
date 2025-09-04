import { acAddClassToElement } from "../../../utils/ac-element-functions";
import { AcPaginationCssClassName } from "../consts/ac-pagination-css-class-name.const";
import { AcPaginationApi } from "../core/ac-pagination-api";

export class AcPageSizeDropdown {
  public element: HTMLElement = document.createElement('div');
  private paginationApi!: AcPaginationApi;
  private selectInput: any = document.createElement('select');

  constructor({ paginationApi }: { paginationApi: AcPaginationApi }) {
    this.paginationApi = paginationApi;
    this.element.classList.add('ac-page-size-dropdown');
    this.initElement();
  }

  initElement() {
    this.element.innerHTML = '';
    acAddClassToElement({class_:AcPaginationCssClassName.acPaginationPageSizeSelect,element:this.selectInput});
    acAddClassToElement({ class_: AcPaginationCssClassName.acPaginationSizeDropdown, element: this.element });
    const pageSizeContainer: HTMLElement = document.createElement('div');
    acAddClassToElement({ class_: AcPaginationCssClassName.acPaginationSizeContainer, element: pageSizeContainer });
    this.setSelectDropdownValues();
    pageSizeContainer.append('Page Size:');
    pageSizeContainer.append(this.selectInput);
    this.element.append(pageSizeContainer);
  }

  setSelectDropdownValues(){
    this.selectInput.innerHTML = "";
    let optionsString = '';
    for(const pageSize of this.paginationApi.pageSizes){
      optionsString += `<option value="${pageSize}"`
      if(pageSize == this.paginationApi.activePageSize){
        optionsString += ` selected `;
      }
      optionsString += `>${pageSize}</option>`;
    }
    this.selectInput.innerHTML = optionsString;
    this.selectInput.value = this.paginationApi.activePageSize.toString();
    this.selectInput.addEventListener('change',(event:any)=>{
      console.log('New page size : ',this.selectInput.value);
      this.paginationApi.activePageSize = parseInt(this.selectInput.value);
    });
    console.log(this.selectInput.value);
  }
}
