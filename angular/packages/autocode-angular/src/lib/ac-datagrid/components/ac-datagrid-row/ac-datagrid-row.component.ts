import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IAcDataGridColumn } from '../../interfaces/ac-datagrid-column.interface';
import { IAcDataGridRowEvent } from '../../interfaces/ac-datagrid-row-event.interface';
import { IAcDataGridRowDataChangeEvent } from '../../interfaces/ac-datagrid-row-data-change-event.interface';
import { AcEvents } from '@ac_packages/autocode';
import { AcBase } from '../../../_base/ac-base.component';
import { IAcDataGridCellEvent } from '../../interfaces/ac-datagrid-cell-event.interface';
import { AcDatagridComponent } from '../ac-datagrid/ac-datagrid.component';

@Component({
    selector: 'ac-datagrid-row',
    templateUrl: './ac-datagrid-row.component.html',
    styleUrl: './ac-datagrid-row.component.css',
    standalone: false
})
export class AcDatagridRowComponent extends AcBase{
  @ViewChild("tr") tr!: ElementRef;

  @Input dataGridInstance!: AcDatagridComponent;
  @Input index:number = -1;
  @Input rowData:any = {};
  @Input columns:IAcDataGridColumn[] = [];

  @Output() onCellEnterEditMode:EventEmitter<IAcDataGridRowEvent> = new EventEmitter();
  @Output() onCellExitEditMode:EventEmitter<IAcDataGridRowEvent> = new EventEmitter();
  @Output() onInit:EventEmitter<IAcDataGridRowEvent> = new EventEmitter();
  @Output() onDestroy:EventEmitter<IAcDataGridRowEvent> = new EventEmitter();
  @Output() onRowDataChange:EventEmitter<IAcDataGridRowDataChangeEvent> = new EventEmitter();
  @Output() onContentElementsLoaded:EventEmitter<IAcDataGridRowEvent> = new EventEmitter();
  @Output() onViewInit:EventEmitter<IAcDataGridRowEvent> = new EventEmitter();
  @Output() onCellSelected:EventEmitter<IAcDataGridCellEvent> = new EventEmitter();
  @Output() onSelected:EventEmitter<IAcDataGridRowEvent> = new EventEmitter();

  cells:any = {};
  events:AcEvents = new AcEvents();
  isContentElementsLoaded:boolean = false;
  notifiedChanged:boolean = false;
  previousRowData:any = {};

  ngOnDestroy(){
    let event:IAcDataGridRowEvent = {
      index:this.index,
      instance:this,
      rowData:this.rowData
    };
    this.onDestroy.emit(event);
  }

  ngOnInit(){
    let event:IAcDataGridRowEvent = {
      index:this.index,
      instance:this,
      rowData:this.rowData
    };
    this.onInit.emit(event);
  }

  ngAfterViewInit(){
    let event:IAcDataGridRowEvent = {
      index:this.index,
      instance:this,
      rowData:this.rowData
    };
    this.onViewInit.emit(event);
  }

  checkChanged() {
    let changes= this.getDataChanges();
    if (Object.keys(changes).length>0) {
      this.notifiedChanged = true;
      let event:IAcDataGridRowDataChangeEvent = {changes:changes,index:this.index,newRowData:this.rowData,oldRowData:this.previousRowData};
      this.onRowDataChange.emit(event);
      this.events.execute('rowDataChange',event);
      this.previousRowData = { ...this.rowData };
    }
    // setTimeout(() => {
    //   this.checkChanged();
    // }, 100);
  }

  getDataChanges() {
    let result = true;
    let objectA: any = this.rowData;
    let compareObject: any = this.previousRowData;
    let objectAKeys = Object.keys(objectA);
    let objectBKeys = Object.keys(compareObject);
    let changes:any = {};
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


