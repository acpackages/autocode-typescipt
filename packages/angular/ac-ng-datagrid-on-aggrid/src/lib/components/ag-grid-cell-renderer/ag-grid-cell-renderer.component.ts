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
  template?: TemplateRef<any>;
  component?: any;
  componentProperties?: any;
  componentRef?: any;
  componentInstance?: any;
  data: any;
  column?: IAcDataGridColumn;
  params:any;

  agInit(params: any): void {
    this.params = params;
    this.template = params.template;
    this.component = params.component;
    this.componentProperties = params.componentProperties;
  }

  ngAfterViewInit(): void {
    this.createView();
  }

  createView() {
    if (this.params.data) {
      this.data = this.params.data;
      this.column = this.params.acDatagridColumn;
      const context: any = {
          data: this.data,
          column: this.column,
        };
      if(this.template){
        this.container.createEmbeddedView(this.template, context);
      }
      else if(this.component){
        this.componentRef = this.container.createComponent(this.component);
        if(this.componentRef){
          this.componentInstance = this.componentRef.instance;
          this.componentInstance.context = context;
          if (this.componentProperties) {
            Object.keys(this.componentProperties).forEach((key) => {
              if(this.componentInstance[key]!=undefined){
                this.componentInstance[key] = this.componentProperties[key];
              }
            });
          }
        }
      }
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
