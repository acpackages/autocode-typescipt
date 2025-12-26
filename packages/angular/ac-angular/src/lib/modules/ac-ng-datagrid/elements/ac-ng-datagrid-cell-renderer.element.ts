/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  ApplicationRef,
  ComponentRef,
  EmbeddedViewRef,
  TemplateRef,
  Type,
} from '@angular/core';
import { IAcDatagridCellRenderer, IAcDatagridCell, IAcDatagridCellElementArgs, IAcDatagridColumn, IAcDatagridRow, AC_DATAGRID_HOOK, AC_DATAGRID_EVENT } from '@autocode-ts/ac-browser';
import { AcRuntimeService } from '@autocode-ts/ac-ng-runtime';
import { IAcNgDatagridColumnDefinition } from '../interfaces/ac-datagrid-column-definition.interface';

/**
 * Angular Datagrid Cell Renderer
 * Supports both TemplateRef and Component renderers.
 */
export class AcNgDatagridCellRenderer implements IAcDatagridCellRenderer {
  private datagridCell?: IAcDatagridCell;
  private datagridColumn?: IAcDatagridColumn;
  private datagridRow?: IAcDatagridRow|any;
  private columnDefinition?:IAcNgDatagridColumnDefinition;
  public element: HTMLElement = document.createElement('div');

  private runtimeService?:AcRuntimeService;
  private appRef?: ApplicationRef;
  private viewRef?: EmbeddedViewRef<any>;
  private componentRef?: ComponentRef<IAcDatagridCellRenderer>;

  blur() {
    let continueOperation:boolean = true;
    if(this.componentRef){
      if(this.componentRef.instance.blur){
        continueOperation = false;
        this.componentRef.instance.blur();
      }
    }
    if(continueOperation){
      const firstChild = this.element.children[0] as HTMLElement;
      firstChild.blur();
    }
  }

  private clear() {
    if (this.viewRef) {
      this.appRef?.detachView(this.viewRef);
       for (const node of Array.from(this.viewRef.rootNodes) as HTMLElement[]) {
        node.remove();
      }
      this.viewRef.destroy();
      this.viewRef = undefined;
    }
    if (this.componentRef) {
      this.componentRef.destroy();
      if(this.componentRef.location && this.componentRef.location.nativeElement){
        this.componentRef.location.nativeElement.remove();
      }
      this.componentRef = undefined;
    }
    this.element.innerHTML = '';
  }

  destroy(): void {
    this.clear();
    (this.datagridColumn as any) = null;
    (this.datagridRow as any) = null;
    (this.columnDefinition as any) = null;
    (this.appRef as any) = null;
    (this.viewRef as any) = null;
    (this.componentRef as any) = null;
    (this.runtimeService as any) = null;

    if(this.datagridCell){
      (this.datagridCell.element as any) = null;
      (this.datagridCell as any) = null;
    }
    this.element.remove();
    (this.element as any) = null;
  }

  focus(): void {
    let continueOperation:boolean = true;
    if(this.componentRef){
      if(this.componentRef.instance.focus){
        continueOperation = false;
        this.componentRef.instance.focus();
      }
    }
    if(continueOperation){
      const firstChild = this.element.children[0] as HTMLElement;
      if(firstChild){
        firstChild.focus();
      }
    }
  }

  getContext():any{
    const context = {
      $implicit: this.datagridRow.data,
      datagridCell:this.datagridCell,
      datagridRow: this.datagridCell.datagridRow,
      datagridColumn: this.datagridCell.datagridColumn,
      value:this.datagridRow.data[this.datagridCell.datagridColumn.columnKey],
    }
    return context;
  }

  getElement(): HTMLElement {
    return this.element;
  }

  init(args: IAcDatagridCellElementArgs): void {
    this.datagridCell = args.datagridCell;
    this.datagridColumn = args.datagridCell.datagridColumn;
    this.datagridRow = args.datagridCell.datagridRow;
    this.columnDefinition = this.datagridColumn.columnDefinition;
    this.appRef = this.datagridColumn.columnDefinition.cellRendererElementParams['___appRef___'];
    this.runtimeService = this.datagridColumn.columnDefinition.cellRendererElementParams['___runtimeService___'];
    this.element.style.display = 'contents';
    if (this.columnDefinition.cellRendererTemplateRef) {
      this.renderTemplate(this.columnDefinition.cellRendererTemplateRef);
    } else if (this.columnDefinition.cellRendererComponent) {
      const initArgs = {...args};
      delete initArgs['___appRef___'];
      delete initArgs['___runtimeService___'];
      this.renderComponent(this.columnDefinition.cellRendererComponent,initArgs);
    } else {
      this.renderDefault();
    }
    args.datagridApi.hooks.execute({hook:AC_DATAGRID_HOOK.CellRendererElementInit,args:{renderer:this}});
    args.datagridApi.events.execute({event:AC_DATAGRID_EVENT.CellRendererElementInit,args:{renderer:this}});
  }

  refresh(args: IAcDatagridCellElementArgs): void {
    this.datagridCell = args.datagridCell;
    const colDef = this.columnDefinition;

    if(this.componentRef){
      this.componentRef.instance.refresh(args);
    }
    else if (colDef.cellRendererTemplateRef) {
      this.renderTemplate(colDef.cellRendererTemplateRef);
    } else {
      this.renderDefault();
    }
  }

  private renderComponent(componentType: Type<IAcDatagridCellRenderer>,args: IAcDatagridCellElementArgs) {
    this.clear();
    const properties = this.columnDefinition.cellRendererComponentProperties ? this.columnDefinition.cellRendererComponentProperties : {};
    this.componentRef = this.runtimeService.createComponent(componentType,properties);
    if (this.datagridCell.extensionData == undefined) {
      this.datagridCell.extensionData = {};
    }
    this.datagridCell.extensionData['cellRendererNgComponentRef'] = this.componentRef;
    const instance:any = this.componentRef.instance;
    if(instance.init){
      instance.init(args);
    }
    if(instance.datagridContext){
      instance.datagridContext = this.getContext();
    }
    this.element.appendChild(this.componentRef.location.nativeElement);
  }

  private renderDefault() {
    this.element.innerText =
      this.datagridRow.data[
        this.datagridCell.datagridColumn.columnKey
      ] ?? '';
  }

  private renderTemplate(template: TemplateRef<any>) {
    this.clear();

    this.viewRef = template.createEmbeddedView(this.getContext());
    this.appRef?.attachView(this.viewRef);

    for (const node of this.viewRef.rootNodes) {
      this.element.appendChild(node);
    }
  }

}
