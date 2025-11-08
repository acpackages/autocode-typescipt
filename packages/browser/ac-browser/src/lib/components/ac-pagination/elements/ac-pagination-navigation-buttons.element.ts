import { AcElementBase } from "../../../core/ac-element-base";
import { acAddClassToElement, acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AcEnumPaginationEvent, AcPagination, AcPaginationCssClassName, AC_PAGINATION_SVG_ICONS } from "../_ac-pagination.export";
import { IAcPaginationPageChangeEvent } from "../interfaces/event-params/ac-page-change-event.interface";

export class AcPaginationNavigationButtons extends AcElementBase{
  private _pagination!: AcPagination;
  get pagination():AcPagination{
    return this._pagination;
  }
  set pagination(value:AcPagination){
    this._pagination = value;
    this.pagination.on({event:AcEnumPaginationEvent.PageChange,callback:(event:IAcPaginationPageChangeEvent)=>{
      this.handlePageChanged(event);
    }});
  }

  private previousButton:HTMLElement;
  private firstButton:HTMLElement;
  private lastButton:HTMLElement;
  private nextButton:HTMLElement;
  private pageLabel:HTMLElement;

  constructor(){
    super();
    this.style.display = "flex";
    this.innerHTML = `
      <button type="button" class="${AcPaginationCssClassName.acPaginationPageButton}" ac-pagination-first-button style="cursor:pointer;"><ac-svg-icon>${AC_PAGINATION_SVG_ICONS.first}</ac-svg-icon></button>
      <button type="button" class="${AcPaginationCssClassName.acPaginationPageButton}" ac-pagination-previous-button style="cursor:pointer;"><ac-svg-icon>${AC_PAGINATION_SVG_ICONS.previous}</ac-svg-icon></button>
      <div ac-pagination-page-label></div>
      <button type="button" class="${AcPaginationCssClassName.acPaginationPageButton}" ac-pagination-next-button style="cursor:pointer;"><ac-svg-icon>${AC_PAGINATION_SVG_ICONS.next}</ac-svg-icon></button>
      <button type="button" class="${AcPaginationCssClassName.acPaginationPageButton}" ac-pagination-last-button style="cursor:pointer;"><ac-svg-icon>${AC_PAGINATION_SVG_ICONS.last}</ac-svg-icon></button>
    `;
    this.firstButton = this.querySelector('[ac-pagination-first-button]') as HTMLButtonElement;
    this.previousButton = this.querySelector('[ac-pagination-previous-button]') as HTMLButtonElement;
    this.pageLabel = this.querySelector('[ac-pagination-page-label]') as HTMLElement;
    this.nextButton = this.querySelector('[ac-pagination-next-button]') as HTMLButtonElement;
    this.lastButton = this.querySelector('[ac-pagination-last-button]') as HTMLButtonElement;
    this.registerListeners();
  }

  override init(){
    super.init();
    this.validateButtons();
    this.renderPageLabel();
  }

  handlePageChanged(event:IAcPaginationPageChangeEvent){
    this.validateButtons();
  }

  registerListeners(){
    this.firstButton.addEventListener('click',(event:Event)=>{
      this.pagination.activePage = 1;
    });
    this.previousButton.addEventListener('click',(event:Event)=>{
      this.pagination.activePage = this.pagination.activePage - 1;
    });
    this.nextButton.addEventListener('click',(event:Event)=>{
      this.pagination.activePage = this.pagination.activePage + 1;
    });
    this.lastButton.addEventListener('click',(event:Event)=>{
      this.pagination.activePage = this.pagination.totalPages;
    });
  }

  renderPageLabel(){
    this.pageLabel.innerHTML = `Page <b>${this.pagination.activePage}</b> of <b>${this.pagination.totalPages}</b>`;
  }

  validateButtons(){
    if(this.pagination.activePage <= 1){
      this.firstButton.setAttribute('disabled',"true");
      this.previousButton.setAttribute('disabled',"true");
      this.firstButton.style.opacity = '0.5';
      this.previousButton.style.opacity = '0.5';
    }
    else{
      this.firstButton.removeAttribute('disabled');
      this.previousButton.removeAttribute('disabled');
      this.firstButton.style.opacity = '';
      this.previousButton.style.opacity = '';
    }
    if(this.pagination.activePage >= this.pagination.totalPages){
      this.nextButton.setAttribute('disabled',"true");
      this.lastButton.setAttribute('disabled',"true");
      this.nextButton.style.opacity = '0.5';
      this.lastButton.style.opacity = '0.5';
    }
    else{
      this.nextButton.removeAttribute('disabled');
      this.lastButton.removeAttribute('disabled');
      this.nextButton.style.opacity = '';
      this.lastButton.style.opacity = '';
    }
  }

}

acRegisterCustomElement({'tag':'ac-pagination-navigation-buttons',type:AcPaginationNavigationButtons});
