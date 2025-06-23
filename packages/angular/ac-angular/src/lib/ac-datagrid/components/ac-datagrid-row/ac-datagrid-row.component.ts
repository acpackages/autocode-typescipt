/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IAcDataGridColumn } from '../../interfaces/ac-datagrid-column.interface';
import { IAcDataGridRowEvent } from '../../interfaces/ac-datagrid-row-event.interface';
import { IAcDataGridRowDataChangeEvent } from '../../interfaces/ac-datagrid-row-data-change-event.interface';
import { AcBase } from '../../../_base/ac-base.component';
import { IAcDataGridCellEvent } from '../../interfaces/ac-datagrid-cell-event.interface';

@Component({
    selector: 'ac-datagrid-row',
    templateUrl: './ac-datagrid-row.component.html',
    styleUrl: './ac-datagrid-row.component.css',
    standalone: false
})
export class AcDatagridRowComponent extends AcBase{
  @ViewChild("tr") tr!: ElementRef;

  @Input() dataGridInstance!: any;
  @Input() index:number = -1;
  @Input() data:any = {};
  @Input() columns:IAcDataGridColumn[] = [];

  @Output() onCellEnterEditMode:EventEmitter<IAcDataGridRowEvent> = new EventEmitter();
  @Output() onCellExitEditMode:EventEmitter<IAcDataGridRowEvent> = new EventEmitter();
  @Output() override onInit:EventEmitter<IAcDataGridRowEvent> = new EventEmitter();
  @Output() override onDestroy:EventEmitter<IAcDataGridRowEvent> = new EventEmitter();
  @Output() onRowDataChange:EventEmitter<IAcDataGridRowDataChangeEvent> = new EventEmitter();
  @Output() onContentElementsLoaded:EventEmitter<IAcDataGridRowEvent> = new EventEmitter();
  @Output() override onViewInit:EventEmitter<IAcDataGridRowEvent> = new EventEmitter();
  @Output() onCellSelected:EventEmitter<IAcDataGridCellEvent> = new EventEmitter();
  @Output() onSelected:EventEmitter<IAcDataGridRowEvent> = new EventEmitter();

  cells:any = {};
  isContentElementsLoaded:boolean = false;
  notifiedChanged:boolean = false;
  previousRowData:any = {};

  override ngOnDestroy(){
    const event:IAcDataGridRowEvent = {
      index:this.index,
      instance:this,
      data:this.data
    };
    this.onDestroy.emit(event);
  }

  override ngOnInit(){
    const event:IAcDataGridRowEvent = {
      index:this.index,
      instance:this,
      data:this.data
    };
    this.onInit.emit(event);
  }

  override ngAfterViewInit(){
    const event:IAcDataGridRowEvent = {
      index:this.index,
      instance:this,
      data:this.data
    };
    this.onViewInit.emit(event);
  }

  checkChanged() {
    const changes= this.getDataChanges();
    if (Object.keys(changes).length>0) {
      this.notifiedChanged = true;
      const event:IAcDataGridRowDataChangeEvent = {changes:changes,index:this.index,newRowData:this.data,oldRowData:this.previousRowData};
      this.onRowDataChange.emit(event);
      this.events.execute({eventName:'rowDataChange',args:event});
      this.previousRowData = { ...this.data };
    }
    // setTimeout(() => {
    //   this.checkChanged();
    // }, 100);
  }

  getDataChanges() {
    let result = true;
    const objectA: any = this.data;
    const compareObject: any = this.previousRowData;
    const objectAKeys = Object.keys(objectA);
    const objectBKeys = Object.keys(compareObject);
    const changes:any = {};
    objectAKeys.forEach(key => {
      if (JSON.stringify(objectA[key]) != JSON.stringify(compareObject[key])) {
        result = false;
        changes[key] = {"new":objectA[key],"old":compareObject[key]};
      }
    });
    objectBKeys.forEach(key => {
      if (JSON.stringify(compareObject[key]) != JSON.stringify(objectA[key])) {
        result = false;
        changes[key] = {"new":objectA[key],"old":compareObject[key]};
      }
    });
    return changes;
  }

  handleCellDestroy(event:IAcDataGridCellEvent){
    if(event.index!=undefined){
      delete this.cells[event.index];
    }
  }

  handleCellInit(event:IAcDataGridCellEvent){
    if(event.index!=undefined){
      this.cells[event.index] = event.instance;
    }
  }

  handleCellViewInit(event:IAcDataGridCellEvent){
    if(event.index == this.columns.length-1){
      this.isContentElementsLoaded = true;
      this.onContentElementsLoaded.emit();
    }
  }

  stopCellEditing(){
    // this.isEditing = false
    // this.onExitEditMode.emit();
  }

}


