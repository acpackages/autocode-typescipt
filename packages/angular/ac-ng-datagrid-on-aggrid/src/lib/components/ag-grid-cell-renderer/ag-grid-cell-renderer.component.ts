/* eslint-disable @angular-eslint/component-selector */
import { AfterViewInit, Component, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAcDataGridColumn } from 'packages/angular/ac-angular/src/index';

@Component({
  selector: 'ag-grid-cell-renderer',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './ag-grid-cell-renderer.component.html',
  styleUrl: './ag-grid-cell-renderer.component.css'
})
export class AgGridCellRendererComponent implements ICellRendererAngularComp, AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;
  template!: TemplateRef<any>;
  rowData: any;
  column?: IAcDataGridColumn;
  params: any = {};

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

  refresh(): boolean {
    return true;
  }
}
