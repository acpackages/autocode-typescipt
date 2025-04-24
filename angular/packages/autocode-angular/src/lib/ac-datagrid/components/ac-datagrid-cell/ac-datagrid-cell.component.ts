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

  @Input dataGridInstance!: AcDatagridComponent;
  @Input index:number = -1;
  @Input rowData: any = {};
  @Input column: IAcDataGridColumn = {};
  @Input rowInstance!: AcDatagridRowComponent;

  @Output() onBlur: EventEmitter<IAcDataGridCellEvent> = new EventEmitter();
  @Output() onChange: EventEmitter<IAcDataGridCellEvent> = new EventEmitter();
  @Output() onClick: EventEmitter<IAcDataGridCellEvent> = new EventEmitter();
  @Output() onDestroy: EventEmitter<IAcDataGridCellEvent> = new EventEmitter();
  @Output() onDblClick: EventEmitter<IAcDataGridCellEvent> = new EventEmitter();
  @Output() onEnterEditMode: EventEmitter<IAcDataGridCellEvent> = new EventEmitter();
  @Output() onExitEditMode: EventEmitter<IAcDataGridCellEvent> = new EventEmitter();
  @Output() onFocus: EventEmitter<IAcDataGridCellEvent> = new EventEmitter();
  @Output() onInit: EventEmitter<IAcDataGridCellEvent> = new EventEmitter();
  @Output() onSelected:EventEmitter<IAcDataGridCellEvent> = new EventEmitter();
  @Output() onViewInit: EventEmitter<IAcDataGridCellEvent> = new EventEmitter();
  @Output() onWidthChange: EventEmitter<IAcDataGridColumnWidthChangeEvent> = new EventEmitter();

  get class():string {
    let result:string[] = ['ac-datagrid-td'];
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

  ngOnDestroy() {
    let event: IAcDataGridCellEvent = this.getEventData();
    this.onDestroy.emit(event);
    this.events.execute("destroy",event);
  }

  ngOnInit() {
    let event: IAcDataGridCellEvent = this.getEventData();
    this.onInit.emit(event);
    this.events.execute("init",event);
  }

  ngAfterViewInit() {
    let event: IAcDataGridCellEvent = this.getEventData();
    this.onViewInit.emit(event);
    this.events.execute("viewInit",event);
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

  private getEventData(){
    return {
      field: this.column.field!,
      instance: this,
      rowData: this.rowData,
      column: this.column,
      rowInstance:this.rowInstance,
      index:this.index,
      rowIndex:this.rowInstance.index
    };
  }

  handleBlur() {
    let event: IAcDataGridCellEvent = this.getEventData();;
    this.onBlur.emit(event);
    this.events.execute("blur",event);
  }

  handleChange(){
    let event: IAcDataGridCellEvent = this.getEventData();;
    this.onChange.emit(event);
    this.events.execute("change",event);
  }

  handleClick() {
    this.selectCell();
    let event: IAcDataGridCellEvent = this.getEventData();;
    this.onClick.emit(event);
    this.events.execute("click",event);
  }

  handleDblClick(){
    this.startEditing();
    let event: IAcDataGridCellEvent = this.getEventData();;
    this.onDblClick.emit(event);
  }

  handleFocus() {
    let event: IAcDataGridCellEvent = this.getEventData();;
    this.onFocus.emit(event);
    this.events.execute("focus",event);
  }

  selectCell(){
    // console.log(new Date().toISOString());
    this.rowInstance.dataGridInstance.selectedColumnIndex = this.column.index!;
    this.rowInstance.dataGridInstance.selectedRowIndex = this.rowInstance.index;
    let event: IAcDataGridCellEvent = this.getEventData();;
    this.onSelected.emit(event);
    this.events.execute("selected",event);
    this.rowInstance.dataGridInstance.handleCellSelectionChange();
  }

  startEditing() {
    this.isEditing = true;
    this.rowInstance.dataGridInstance.editingColumnIndex = this.column.index!;
    this.rowInstance.dataGridInstance.editingRowIndex = this.rowInstance.index;
    let event: IAcDataGridCellEvent = this.getEventData();;
    this.onEnterEditMode.emit(event);
    this.events.execute("enterEditMode",event);
  }

  stopEditing() {
    this.isEditing = false
    let event: IAcDataGridCellEvent = this.getEventData();;
    this.onExitEditMode.emit(event);
    this.events.execute("exitEditMode",event);
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

