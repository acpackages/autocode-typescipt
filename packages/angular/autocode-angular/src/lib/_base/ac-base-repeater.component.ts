/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { AcPaginationComponent } from '../ac-pagination/ac-pagination/ac-pagination.component';
import { AcBase } from './ac-base.component';
import { AcFiltersComponent } from '../ac-filters/ac-filters/ac-filters.component';
import { AutocodeService } from '../services/autocode.service';
import { AcDataController } from '../utilities/ac-data-controller';

@Component({
  imports: [],
  selector: 'ac-base-for-repeating-data',
  template: '<span></span>'
})
export class AcBaseRepeater extends AcBase {
  @Input() dataOnDemandFunction?: Function;
  @Input() autoAddNewRow: boolean = false;
  private _data:any[] = [];
  get data(): any[] { return this._data; }
  @Input() set data(value: any[]) {
    this._data = value;
    if(this.dataController){
      this.dataController.data = this.data;
    }
  }
  @Input() dataController: AcDataController = new AcDataController();
  @Input() pagination: AcPaginationComponent | undefined;
  @Input() filters: AcFiltersComponent | undefined;

  @Output() onContentElementsLoaded:EventEmitter<any> = new EventEmitter();
  @Output() onCountChange: EventEmitter<any> = new EventEmitter();
  @Output() onDataChange: EventEmitter<any> = new EventEmitter();
  @Output() onRowAdd: EventEmitter<any> = new EventEmitter();
  @Output() onRowDataChange: EventEmitter<any> = new EventEmitter();
  @Output() onRowRemove: EventEmitter<any> = new EventEmitter();
  @Output() onRowUpdate: EventEmitter<any> = new EventEmitter();
  @Output() onSelectedRowChange: EventEmitter<any> = new EventEmitter();

  override commentElementTag: boolean = false;
  isContentElementsLoaded:boolean = false;
  rows: any = {};
  sortOrder: any = {};

  constructor(elementRef:ElementRef,autocodeService:AutocodeService,protected changeDetectorRef:ChangeDetectorRef){
    super(elementRef,autocodeService);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.initPagination();
    this.initFilters();
    this.dataController.autoAddRecord = this.autoAddNewRow;
    this.dataController.data = this.data;
    this.dataController.on({eventName:'displayDataChange',callback:()=>{
      // console.log('Data changed @ ');
      // console.log(new Date().toISOString());
    }});
  }

  override ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  applyFilter(): void {
    if (this.filters) {
      this.dataController.filterGroup = this.filters.filters;
    }
  }

  applySort(): void {
    this.dataController.sortOrder = this.sortOrder;
  }

  getOrderByString() {
    const object = this;
    const orderByValues: string[] = [];
    Object.keys(object.sortOrder).forEach((dataField: any) => {
      orderByValues.push(dataField + ' ' + object.sortOrder[dataField]);
    });
    const orderByString = orderByValues.join(',');
    return orderByString;
  }

  initFilters() {
    if (this.filters) {
      this.filters.dataController = this.dataController;
    }
  }

  initPagination() {
    if (this.pagination) {
      this.pagination.dataController = this.dataController;
    }
  }

  handleCountChanged() { }

  handleDataChanged() { }

  handleRowAdded() { }

  handleRowRemoved() { }

  handleRowDataChange(event: any) {
    // console.log('Row Data Change')
    if(this.autoAddNewRow){
      // console.log("Auto add new row");
      if(event.index == this.dataController.dataDisplay.length - 1){
        // console.log('index is new');
        this.dataController.autoAddRecordUpdated();
      }
    }
    this.onRowDataChange.emit(event);
    this.events.execute({eventName:'rowDataChange'});
    // console.log(event,this);
  }

  handleRowDestroy(event: any) {
    if (event.index != undefined) {
      delete this.rows[event.index];
    }
  }

  handleRowInit(event: any) {
    if (event.index != undefined) {
      if(event.index == 0){
        // console.log(new Date().toISOString());
      }
      this.rows[event.index] = event.instance;
      if(event.index == this.dataController.dataDisplay.length - 1){
        // console.log(new Date().toISOString());
        event.instance.on('contentElementsLoaded',()=>{
          this.onContentElementsLoaded.emit();
          this.events.execute({eventName:'contentElementsLoaded'});
          // console.log(new Date().toISOString());
        });
      }
    }
  }

  handleRowViewInit(event: any) {
  }


}
