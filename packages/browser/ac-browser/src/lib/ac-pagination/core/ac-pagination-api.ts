/* eslint-disable @typescript-eslint/no-inferrable-types */

import { AcEvents } from "@autocode-ts/autocode";
import { AcEnumPaginationEvent } from "../enums/ac-enum-pagination-event.enum";
import { AcPagination } from "../elements/ac-pagination.element";
import { IAcPaginationPageChangeEvent } from "../interfaces/event-params/ac-page-change-event.interface";
import { IAcPaginationPageSizeChangeEvent } from "../interfaces/event-params/ac-page-size-change-event.interface";


export class AcPaginationApi {
  private _activePage:number = 0;
  get activePage():number{
    return this._activePage;
  }
  set activePage(value:number){
    const previousActivePage:number = this._activePage;
    this._activePage = value;
    this.updateDisplayedRows();
    const eventParams:IAcPaginationPageChangeEvent = {
      totalPages: this.totalPages,
      activePage: this.activePage,
      previousActivePage: previousActivePage,
      startRow:this.startRow,
      endRow:this.endRow,
      paginationApi:this
    };
    this.events.execute({eventName:AcEnumPaginationEvent.PageChange,args:eventParams});
  }

  private _activePageSize:number = 50;
  get activePageSize():number{
    return this._activePageSize;
  }
  set activePageSize(value:number){
    const previousPageSize:number = this._activePageSize;
    this._activePageSize = value;
    const eventParams:IAcPaginationPageSizeChangeEvent = {
      previousPageSize: previousPageSize,
      pageSize:value,
      paginationApi:this
    };
    this.events.execute({eventName:AcEnumPaginationEvent.PageChange,args:eventParams});
    this.activePage = Math.ceil((this.startRow) / value);
  }

  private _totalRows: number = 0;
  get totalRows():number{
    return this._totalRows;
  }
  set totalRows(value:number){
    this._totalRows = value;
    this.updateDisplayedRows();
  }

  endRow:number = 0;
  events:AcEvents = new AcEvents();
  pageSizes: number[] = [5, 20, 50, 100];
  pagination: AcPagination;
  startRow:number = 0;
  totalPages:number = 1;

  constructor({ pagination }: { pagination: AcPagination }) {
    this.pagination = pagination;
  }

  on({eventName,callback}:{eventName:string,callback:Function}):string{
    return this.events.subscribe({eventName:eventName,callback:callback});
  }

  updateDisplayedRows(){
    if(this.totalRows > 0){
      if(this.activePage == 0){
        this._activePage = 1;
      }
      this.startRow = (this.activePageSize * (this.activePage - 1)) + 1;
      this.endRow = (this.startRow + this.activePageSize) - 1;
      if(this.endRow > this.totalRows){
        this.endRow = this.totalRows;
      }
      this.totalPages = Math.ceil(this.totalRows / this.activePageSize);
    }
    else{
      this.startRow = this.endRow = this.totalPages = this._activePage = 0;
    }
    if(this.pagination){
      if(this.pagination.pageDisplayedRowsLabel){
        this.pagination.pageDisplayedRowsLabel.render();
      }
      if(this.pagination.pageNavigationButtons){
        this.pagination.pageNavigationButtons.renderPageLabel();
      }
    }
  }

}
