import { AcElementBase } from "../../../core/ac-element-base";
import { acAddClassToElement, acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AcEnumPaginationEvent, AcPagination, AcPaginationCssClassName, AcPaginationHtmlPlaceholder } from "../_ac-pagination.export";
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

  private previousButton:HTMLElement = document.createElement('button');
  private firstButton:HTMLElement = document.createElement('button');
  private lastButton:HTMLElement = document.createElement('button');
  private nextButton:HTMLElement = document.createElement('button');
  private pageLabel:HTMLElement = document.createElement('div');

  constructor(){
    super();
    this.style.display = "flex";
    this.registerListeners();
  }

  override connectedCallback(){
    acAddClassToElement({class_:AcPaginationCssClassName.acPaginationPageButton,element:this.firstButton});
    acAddClassToElement({class_:AcPaginationCssClassName.acPaginationPageButton,element:this.lastButton});
    acAddClassToElement({class_:AcPaginationCssClassName.acPaginationPageButton,element:this.previousButton});
    acAddClassToElement({class_:AcPaginationCssClassName.acPaginationPageButton,element:this.nextButton});
    this.firstButton.innerHTML = AcPaginationHtmlPlaceholder.first;
    this.append(this.firstButton);
    this.previousButton.innerHTML = AcPaginationHtmlPlaceholder.previous;
    this.append(this.previousButton);
    this.append(this.pageLabel);
    this.nextButton.innerHTML = AcPaginationHtmlPlaceholder.next;
    this.append(this.nextButton);
    this.lastButton.innerHTML = AcPaginationHtmlPlaceholder.last;
    this.append(this.lastButton);
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
    }
    else{
      this.firstButton.removeAttribute('disabled');
      this.previousButton.removeAttribute('disabled');
    }
    if(this.pagination.activePage >= this.pagination.totalPages){
      this.nextButton.setAttribute('disabled',"true");
      this.lastButton.setAttribute('disabled',"true");
    }
    else{
      this.nextButton.removeAttribute('disabled');
      this.lastButton.removeAttribute('disabled');
    }
  }

}

acRegisterCustomElement({'tag':'ac-pagination-navigation-buttons',type:AcPaginationNavigationButtons});
