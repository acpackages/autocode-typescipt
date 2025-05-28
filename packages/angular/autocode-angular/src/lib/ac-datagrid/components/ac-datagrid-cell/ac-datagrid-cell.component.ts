/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { IAcDataGridColumn } from '../../interfaces/ac-datagrid-column.interface';
import { IAcDataGridColumnWidthChangeEvent } from '../../interfaces/ac-datagrid-column-width-change-event.interface';
import { AcDatagridRowComponent } from '../ac-datagrid-row/ac-datagrid-row.component';
import { AcBase } from '../../../_base/ac-base.component';
import { IAcDataGridCellEvent } from '../../interfaces/ac-datagrid-cell-event.interface';
import { AcDatagridComponent } from '../ac-datagrid/ac-datagrid.component';

@Component({
  selector: 'ac-datagrid-cell',
  templateUrl: './ac-datagrid-cell.component.html',
  styleUrl: './ac-datagrid-cell.component.css',
  standalone: false,
  encapsulation: ViewEncapsulation.None,
})
export class AcDatagridCellComponent extends AcBase {
  @ViewChild("td") cellTd!: ElementRef;

  @Input() dataGridInstance!: AcDatagridComponent;
  @Input() index:number = -1;
  @Input() rowData: any = {};
  @Input() column: IAcDataGridColumn = {};
  @Input() rowInstance!: AcDatagridRowComponent;

  @Output() onBlur: EventEmitter<IAcDataGridCellEvent> = new EventEmitter();
  @Output() onChange: EventEmitter<IAcDataGridCellEvent> = new EventEmitter();
  @Output() onClick: EventEmitter<IAcDataGridCellEvent> = new EventEmitter();
  @Output() override onDestroy: EventEmitter<IAcDataGridCellEvent> = new EventEmitter();
  @Output() onDblClick: EventEmitter<IAcDataGridCellEvent> = new EventEmitter();
  @Output() onEnterEditMode: EventEmitter<IAcDataGridCellEvent> = new EventEmitter();
  @Output() onExitEditMode: EventEmitter<IAcDataGridCellEvent> = new EventEmitter();
  @Output() onFocus: EventEmitter<IAcDataGridCellEvent> = new EventEmitter();
  @Output() override onInit: EventEmitter<IAcDataGridCellEvent> = new EventEmitter();
  @Output() onSelected:EventEmitter<IAcDataGridCellEvent> = new EventEmitter();
  @Output() override onViewInit: EventEmitter<IAcDataGridCellEvent> = new EventEmitter();
  @Output() onWidthChange: EventEmitter<IAcDataGridColumnWidthChangeEvent> = new EventEmitter();

  get class():string {
    const result:string[] = ['ac-datagrid-td'];
    if(this.rowInstance){
      if(this.rowInstance.index == this.rowInstance.dataGridInstance.selectedRowIndex && this.column.index == this.rowInstance.dataGridInstance.selectedColumnIndex){
        result.push('ac-datagrid-td-selected');
      }
    }
    return result.join(" ");
  }

  get width(): number {
    let result: number = 0;
    if (this.column) {
      if (this.column.state) {
        if (this.column.state!.bodyWidth > this.column.state!.headWidth) {
          result = this.column.state?.bodyWidth;
        }
        else {
          result = this.column.state?.headWidth;
        }
      }

    }
    return result;
  }

  isEditing: boolean = false;
  previousWidth: number = 0;

  override ngOnDestroy() {
    const event: IAcDataGridCellEvent = this.getEventData();
    this.onDestroy.emit(event);
    this.events.execute({eventName:"destroy",args:event});
  }

  override ngOnInit() {
    const event: IAcDataGridCellEvent = this.getEventData();
    this.onInit.emit(event);
    this.events.execute({eventName:"init",args:event});
  }

  override ngAfterViewInit() {
    const event: IAcDataGridCellEvent = this.getEventData();
    this.onViewInit.emit(event);
    this.events.execute({eventName:"viewInit",args:event});
  }

  getActualWidth(): number {
    let result: number = 0;
    if (this.cellTd) {
      result = this.cellTd.nativeElement.getBoundingClientRect().width;
      // const computedStyle = window.getComputedStyle(element);
      // const width = parseFloat(computedStyle.width);
      // const transform = computedStyle.transform;
      // if (transform && transform !== 'none') {
      //   const match = transform.match(/matrix\((.+)\)/);
      //   if (match) {
      //     const values = match[1].split(', ');
      //     const scaleX = parseFloat(values[0]); // Extract the scaleX value
      //     result = width * scaleX;
      //   }
      // } else {
      //   result = width;
      // }
    }
    return result;
  }

  private getEventData():any{
    return {
      field: this.column.field,
      instance: this,
      rowData: this.rowData,
      column: this.column,
      rowInstance:this.rowInstance,
      index:this.index,
      rowIndex:this.rowInstance.index
    };
  }

  handleBlur() {
    const event: IAcDataGridCellEvent = this.getEventData();;
    this.onBlur.emit(event);
    this.events.execute({eventName:"blur",args:event});
  }

  handleChange(){
    const event: IAcDataGridCellEvent = this.getEventData();;
    this.onChange.emit(event);
    this.events.execute({eventName:"change",args:event});
  }

  handleClick() {
    this.selectCell();
    const event: IAcDataGridCellEvent = this.getEventData();;
    this.onClick.emit(event);
    this.events.execute({eventName:"click",args:event});
  }

  handleDblClick(){
    this.startEditing();
    const event: IAcDataGridCellEvent = this.getEventData();;
    this.onDblClick.emit(event);
  }

  handleFocus() {
    const event: IAcDataGridCellEvent = this.getEventData();;
    this.onFocus.emit(event);
    this.events.execute({eventName:"focus",args:event});
  }

  selectCell(){
    // console.log(new Date().toISOString());
    this.rowInstance.dataGridInstance.selectedColumnIndex = this.column.index!;
    this.rowInstance.dataGridInstance.selectedRowIndex = this.rowInstance.index;
    const event: IAcDataGridCellEvent = this.getEventData();;
    this.onSelected.emit(event);
    this.events.execute({eventName:"selected",args:event});
    this.rowInstance.dataGridInstance.handleCellSelectionChange();
  }

  startEditing() {
    this.isEditing = true;
    this.rowInstance.dataGridInstance.editingColumnIndex = this.column.index!;
    this.rowInstance.dataGridInstance.editingRowIndex = this.rowInstance.index;
    const event: IAcDataGridCellEvent = this.getEventData();;
    this.onEnterEditMode.emit(event);
    this.events.execute({eventName:"enterEditMode",args:event});
  }

  stopEditing() {
    this.isEditing = false
    const event: IAcDataGridCellEvent = this.getEventData();;
    this.onExitEditMode.emit(event);
    this.events.execute({eventName:"exitEditMode",args:event});
  }

  toggleEditMode() {
    if (this.isEditing) {
      this.stopEditing();
    }
    else {
      this.startEditing();
    }
  }
}

