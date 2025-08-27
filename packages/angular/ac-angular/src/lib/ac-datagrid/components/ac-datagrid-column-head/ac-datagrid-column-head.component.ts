/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/component-selector */
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IAcDataGridColumn } from '../../interfaces/ac-datagrid-column.interface';
import { AcBase } from '../../../_base/ac-base.component';

@Component({
  selector: 'ac-datagrid-column-head',
  templateUrl: './ac-datagrid-column-head.component.html',
  styleUrl: './ac-datagrid-column-head.component.css',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false
})
export class AcDatagridColumnHeadComponent extends AcBase {
  @ViewChild("th") th!: ElementRef;

  @Input() listenForWidthChange: boolean = false;
  @Input() data: any = {};
  @Input() column: IAcDataGridColumn = {};

  @Output() override onInit:EventEmitter<any> = new EventEmitter();
  @Output() override onDestroy:EventEmitter<any> = new EventEmitter();
  @Output() onSortChange: EventEmitter<any> = new EventEmitter();
  @Output() override onViewInit:EventEmitter<any> = new EventEmitter();
  @Output() onWidthChange: EventEmitter<any> = new EventEmitter();


  override ngAfterViewInit(): void {
    // this.checkWidthChanged();
    super.ngAfterViewInit();
  }

  handleResize(event:any){
    this.onWidthChange.emit({'width':event.width});
  }

  handleSort(event:any){
    this.onSortChange.emit(event);
    this.events.execute({event:'sortChange',args:event});
  }
}
