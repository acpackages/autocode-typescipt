import { acAddClassToElement } from "../../../utils/ac-element-functions";
import { AcEnumPaginationEvent, AcPaginationCssClassName, AcPaginationHtmlPlaceholder } from "../_ac-pagination.export";
import { AcPaginationApi } from "../core/ac-pagination-api";
import { IAcPaginationPageChangeEvent } from "../interfaces/event-params/ac-page-change-event.interface";

export class AcPageNavigationButtons {
  public element: HTMLElement = document.createElement('div');
  private paginationApi!: AcPaginationApi;
  private previousButton:HTMLElement = document.createElement('button');
  private firstButton:HTMLElement = document.createElement('button');
  private lastButton:HTMLElement = document.createElement('button');
  private nextButton:HTMLElement = document.createElement('button');
  private pageLabel:HTMLElement = document.createElement('div');

  constructor({ paginationApi }: { paginationApi: AcPaginationApi }) {
    this.paginationApi = paginationApi;
    this.paginationApi.on({event:AcEnumPaginationEvent.PageChange,callback:(event:IAcPaginationPageChangeEvent)=>{
      this.handlePageChanged(event);
    }});
    this.initElement();
  }

  initElement(){
    acAddClassToElement({class_:AcPaginationCssClassName.acPaginationNavigationButtons,element:this.element});
    acAddClassToElement({class_:AcPaginationCssClassName.acPaginationPageButton,element:this.firstButton});
    acAddClassToElement({class_:AcPaginationCssClassName.acPaginationPageButton,element:this.lastButton});
    acAddClassToElement({class_:AcPaginationCssClassName.acPaginationPageButton,element:this.previousButton});
    acAddClassToElement({class_:AcPaginationCssClassName.acPaginationPageButton,element:this.nextButton});
    this.firstButton.innerHTML = AcPaginationHtmlPlaceholder.first;
    this.element.append(this.firstButton);
    this.previousButton.innerHTML = AcPaginationHtmlPlaceholder.previous;
    this.element.append(this.previousButton);
    this.element.append(this.pageLabel);
    this.nextButton.innerHTML = AcPaginationHtmlPlaceholder.next;
    this.element.append(this.nextButton);
    this.lastButton.innerHTML = AcPaginationHtmlPlaceholder.last;
    this.element.append(this.lastButton);
    this.registerListeners();
    this.validateButtons();
    this.renderPageLabel();
  }

  handlePageChanged(event:IAcPaginationPageChangeEvent){
    this.validateButtons();
  }

  registerListeners(){
    this.firstButton.addEventListener('click',(event:Event)=>{
      this.paginationApi.activePage = 1;
      console.log(this.paginationApi.activePage);
    });
    this.previousButton.addEventListener('click',(event:Event)=>{
      this.paginationApi.activePage = this.paginationApi.activePage - 1;
      console.log(this.paginationApi.activePage);
    });
    this.nextButton.addEventListener('click',(event:Event)=>{
      this.paginationApi.activePage = this.paginationApi.activePage + 1;
      console.log(this.paginationApi.activePage);
    });
    this.lastButton.addEventListener('click',(event:Event)=>{
      this.paginationApi.activePage = this.paginationApi.totalPages;
      console.log(this.paginationApi.activePage);
    });
  }

  renderPageLabel(){
    this.pageLabel.innerHTML = `Page <b>${this.paginationApi.activePage}</b> of <b>${this.paginationApi.totalPages}</b>`;
  }

  validateButtons(){
    if(this.paginationApi.activePage <= 1){
      this.firstButton.setAttribute('disabled',"true");
      this.previousButton.setAttribute('disabled',"true");
    }
    else{
      this.firstButton.removeAttribute('disabled');
      this.previousButton.removeAttribute('disabled');
    }
    if(this.paginationApi.activePage >= this.paginationApi.totalPages){
      this.nextButton.setAttribute('disabled',"true");
      this.lastButton.setAttribute('disabled',"true");
    }
    else{
      this.nextButton.removeAttribute('disabled');
      this.lastButton.removeAttribute('disabled');
    }
  }

}
