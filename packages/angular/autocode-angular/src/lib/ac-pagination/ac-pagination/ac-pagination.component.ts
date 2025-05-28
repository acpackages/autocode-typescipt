/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IAcPage } from '../interfaces/ac-page.interface';
import '@autocode-typescript/autocode-extensions';
import { AcBase } from '../../_base/ac-base.component';
import { IAcPaginationEvent } from '../interfaces/ac-pagination-event.interface';
import { AcDataController } from '../../utilities/ac-data-controller';

@Component({
    selector: 'ac-pagination',
    templateUrl: './ac-pagination.component.html',
    styleUrl: './ac-pagination.component.css',
    standalone: false
})
export class AcPaginationComponent extends AcBase implements OnChanges {
  @Input() activePage: number = 1;
  private _dataController:AcDataController  = new AcDataController();
  get dataController(): AcDataController { return this._dataController; }
  @Input() set dataController(value: AcDataController) {
    this._dataController = value;
    this._dataController.on({eventName:'dataFiltered',callback:()=>{
      console.log(this);
      this.totalResults = this.dataController.dataFiltered.length;
      this.setActivePage(1);
    }});
    console.log("Setting Display Range");
    this.setActivePage(1);
  }
  private _displayPerPage:number = 25;
  get displayPerPage(): number { return this._displayPerPage; }
  @Input() set displayPerPage(value: number) {
    this._displayPerPage = value;
    this.setActivePage(this.activePage);
  }
  @Input() nextHtml: string = "Next";
  @Input() pagesDisplayCount: number = 9;
  @Input() perPageOptions:number[] = [5,10,25,50,100];
  @Input() previousHtml: string = "Previous";
  @Input() totalResults: number = 0;

  @Output() onPageChange:EventEmitter<any> = new EventEmitter();

  pageButtons: IAcPage[] = [];
  totalPages: number = 1;
  resultStartNumber:number = 0;
  resultEndNumber:number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    this.setPages();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.setPages();
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  handleNextClick(){
    if(this.activePage<this.totalPages){
      this.setActivePage(this.activePage + 1);
    }
  }

  handlePageClick(page: IAcPage) {
    if (page.pageNumber) {
      if (page.pageNumber > 0) {
        this.setActivePage(page.pageNumber);
      }
    }
  }

  handlePreviousClick(){
    if(this.activePage>1){
      this.setActivePage(this.activePage - 1);
    }
  }

  setActivePage(newActivePage:number){
    this.activePage = newActivePage;
    this.setPages();
    const eventData:IAcPaginationEvent = {
      activePage:this.activePage,
      displayPerPage:this.displayPerPage,
      totalPages:this.totalPages,
      startRecordNumber:this.resultStartNumber,
      endRecordNumber:this.resultEndNumber
    };
    this.events.execute({eventName:"pageChange",args:eventData});
    this.onPageChange.emit(eventData);
    const startIndex: number = this.resultStartNumber - 1;
    const endIndex: number = this.resultEndNumber - 1;
    this.dataController.displayRange = {startIndex:startIndex,endIndex:endIndex};
  }

  handleDisplayPerPageChange(value:any){
    this._displayPerPage = parseInt(value);
    setTimeout(() => {
      this.setActivePage(1);
    }, 50);

  }

  setPages() {
    this.pageButtons = [];
    this.totalPages = Math.ceil(this.totalResults / this.displayPerPage);
    this.resultEndNumber = this.activePage * this.displayPerPage;
    this.resultStartNumber = (this.resultEndNumber - this.displayPerPage)+1;
    if(this.resultStartNumber>this.totalResults){
      this.resultStartNumber = this.totalResults;
    }
    if(this.resultEndNumber>this.totalResults){
      this.resultEndNumber = this.totalResults;
    }
    let pagesArray:number[] = [];
    if (this.pagesDisplayCount < 7) {
      this.pagesDisplayCount = 7;
    }
    if(this.pagesDisplayCount < this.totalPages){
      pagesArray = [1];
      const pagesToAdjust: number = this.pagesDisplayCount - 4;
      const pageMedian: number = Math.floor(pagesToAdjust / 2);
      let andjustStartIndex: number = this.activePage - pageMedian;
      if (andjustStartIndex < 2) {
        andjustStartIndex = 2;
      }
      let andjustEndIndex: number = andjustStartIndex + pagesToAdjust;
      if (andjustEndIndex >= this.totalPages) {
        andjustEndIndex = this.totalPages - 1;
        andjustStartIndex = andjustEndIndex - pagesToAdjust;
      }
      if (andjustStartIndex > 2) {
        pagesArray.push(-1);
        andjustEndIndex--;
      }
      if (andjustStartIndex >= (this.totalPages - (pagesToAdjust + 1))) {
        andjustEndIndex++;
      }
      for (let i = andjustStartIndex; i <= andjustEndIndex; i++) {
        pagesArray.push(i);
      }
      if (andjustEndIndex < this.totalPages - pageMedian) {
        pagesArray.push(-1);
      }
      pagesArray.push(this.totalPages);
    }
    else{
      for(let index=1;index<=this.totalPages;index++){
        pagesArray.push(index);
      }
    }
    for (const pageNumber of pagesArray) {
      this.pageButtons.push({
        pageNumber: pageNumber,
        pageLabel: pageNumber > 0 ? pageNumber.toString() : "...",
        isActive: this.activePage == pageNumber
      });
    }
  }



}
