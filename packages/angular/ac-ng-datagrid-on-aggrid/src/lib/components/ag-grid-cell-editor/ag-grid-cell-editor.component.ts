/* eslint-disable @angular-eslint/component-selector */
import { AfterViewInit, Component, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { IAcDataGridColumn } from 'packages/angular/ac-angular/src/index';
@Component({
  selector: 'ag-grid-cell-editor',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './ag-grid-cell-editor.component.html',
  styleUrl: './ag-grid-cell-editor.component.css'
})
export class AgGridCellEditorComponent implements ICellEditorAngularComp, AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;
  template!: TemplateRef<any>;
  rowData: any;
  column?: IAcDataGridColumn;
  params:any;

  agInit(params: any): void {
    this.params = params;
    this.template = params.template;
  }

  ngAfterViewInit(): void {
    this.createView();
  }

  createView() {
    if (this.params.data) {
      this.rowData = this.params.data;
      this.column = this.params.acDatagridColumn;
      const context: any = {
        rowData: this.rowData,
        column: this.column,
      };
      this.container.createEmbeddedView(this.template, context);
    }
    else {
      setTimeout(() => {
        this.createView();
      }, 100);
    }
  }

  getValue() {
    return this.rowData?.[this.column?.field];
  }

  isPopup(): boolean {
    return false;
  }
}
