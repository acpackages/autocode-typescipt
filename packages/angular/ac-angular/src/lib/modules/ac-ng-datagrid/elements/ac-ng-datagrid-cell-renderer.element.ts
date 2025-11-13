/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EmbeddedViewRef,
  Injector,
  TemplateRef,
  Type,
} from '@angular/core';
import { IAcDatagridCellRenderer, AcDatagridApi, AcDatagridCell, IAcDatagridCellElementArgs, AcDatagridAttributeName, acAddClassToElement, AcDatagridCssClassName, AcDatagridColumn } from '@autocode-ts/ac-browser';

/**
 * Angular Datagrid Cell Renderer
 * Supports both TemplateRef and Component renderers.
 */
export class AcNgDatagridCellRenderer implements IAcDatagridCellRenderer {
  private datagridApi!: AcDatagridApi;
  private datagridCell!: AcDatagridCell;
  private datagridRow!: AcDatagridCell;
  private datagridColumn!: AcDatagridColumn;
  public element: HTMLElement = document.createElement('div');

  private injector: Injector;
  private appRef: ApplicationRef;
  private viewRef?: EmbeddedViewRef<any>;
  private componentRef?: ComponentRef<IAcDatagridCellRenderer>;

  init(args: IAcDatagridCellElementArgs): void {
    this.datagridApi = args.datagridApi;
    this.datagridCell = args.datagridCell;
    this.datagridColumn = args.datagridCell.datagridColumn;
    this.appRef = this.datagridColumn.columnDefinition.cellRendererElementParams['___appRef___'];
    this.injector = this.datagridColumn.columnDefinition.cellRendererElementParams['___injector___'];

    this.initElement();

    const colDef = this.datagridCell.datagridColumn.columnDefinition;

    if (colDef.cellRendererTemplateRef) {
      this.renderTemplate(colDef.cellRendererTemplateRef);
    } else if (colDef.cellRendererComponent) {
      const initArgs = {...args};
      delete initArgs['___appRef___'];
      delete initArgs['___injector___'];
      this.renderComponent(colDef.cellRendererComponent,initArgs);
    } else {
      this.renderDefault();
    }
  }

  /** Initialize base element */
  private initElement() {
    acAddClassToElement({
      class_: AcDatagridCssClassName.acDatagridCellRenderer,
      element: this.element,
    });

    this.element.style.height = '100%';
    this.element.style.width = '100%';
  }

  /** Render Angular TemplateRef */
  private renderTemplate(template: TemplateRef<any>) {
    this.clear();
    const context = {
      $implicit: (this.datagridCell.datagridRow as any).data,
      datagridCell:this.datagridCell,
      datagridRow: this.datagridCell.datagridRow,
      datagridColumn: this.datagridCell.datagridColumn,
      value:(this.datagridCell.datagridRow as any).data[this.datagridCell.datagridColumn.columnDefinition.field],
    }
    this.viewRef = template.createEmbeddedView(context);
    this.appRef?.attachView(this.viewRef);

    for (const node of this.viewRef.rootNodes) {
      this.element.appendChild(node);
    }
  }

  /** Render Angular Component dynamically */
  private renderComponent(componentType: Type<IAcDatagridCellRenderer>,args: IAcDatagridCellElementArgs) {
    this.clear();

    this.componentRef = createComponent(componentType, {
      environmentInjector: this.injector as any,
    });


    const instance = this.componentRef.instance;
    instance.init(args);

    this.element.appendChild(this.componentRef.location.nativeElement);
  }

  /** Fallback plain text renderer */
  private renderDefault() {
    this.element.innerText =
      (this.datagridCell.datagridRow as any).data[
        this.datagridCell.datagridColumn.columnDefinition.field
      ] ?? '';
  }

  /** Clears view/component */
  private clear() {
    if (this.viewRef) {
      this.viewRef.destroy();
      this.viewRef = undefined;
    }
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = undefined;
    }
    this.element.innerHTML = '';
  }

  /** Called when grid refreshes */
  refresh(args: IAcDatagridCellElementArgs): void {
    this.datagridCell = args.datagridCell;
    const colDef = this.datagridCell.datagridColumn.columnDefinition;

    if (colDef.cellRendererTemplateRef) {
      this.renderTemplate(colDef.cellRendererTemplateRef);
    } else if (colDef.cellRendererComponent) {
      this.renderComponent(colDef.cellRendererComponent,args);
    } else {
      this.renderDefault();
    }
  }

  getElement(): HTMLElement {
    return this.element;
  }

  destroy(): void {
    this.clear();
    this.element.remove();
  }
}
