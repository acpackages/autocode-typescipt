import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IAcDataGridColumn } from '../../interfaces/ac-datagrid-column.interface';
import { IAcDataGridColumnWidthChangeEvent } from '../../interfaces/ac-datagrid-column-width-change-event.interface';
import { AcEvents } from '@ac_packages/autocode';
import { AcBase } from '../../../_base/ac-base.component';

@Component({
  selector: 'ac-datagrid-column-head',
  templateUrl: './ac-datagrid-column-head.component.html',
  styleUrl: './ac-datagrid-column-head.component.css',
  standalone: false
})
export class AcDatagridColumnHeadComponent extends AcBase {
  @ViewChild("th") th!: ElementRef;

  @Input listenForWidthChange: boolean = false;
  @Input rowData: any = {};
  @Input column: IAcDataGridColumn = {};

  @Output() onInit:EventEmitter<any> = new EventEmitter();
  @Output() onDestroy:EventEmitter<any> = new EventEmitter();
  @Output() onSortChange: EventEmitter<any> = new EventEmitter();
  @Output() onViewInit:EventEmitter<any> = new EventEmitter();
  @Output() onWidthChange: EventEmitter<any> = new EventEmitter();


  ngAfterViewInit(): void {
    // this.checkWidthChanged();
    super.ngAfterViewInit();
  }

  handleResize(event:any){
    this.onWidthChange.emit({'width':event.width});
  }

  handleSort(event:any){
    this.onSortChange.emit(event);
    this.events.execute('sortChange',event);
  }
}
