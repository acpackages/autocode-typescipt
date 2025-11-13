import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EmbeddedViewRef,
  Injector,
  TemplateRef,
  Type,
} from '@angular/core';
import { AcDatagridApi, AcDatagridCell, AcDatagridColumn, IAcDatagridCellEditor, IAcDatagridCellElementArgs } from '@autocode-ts/ac-browser';

/**
 * Angular-compatible Datagrid Cell Editor.
 * Supports both TemplateRef and Component-based editors.
 */
export class AcNgDatagridCellEditor implements IAcDatagridCellEditor {
  private datagridApi!: AcDatagridApi;
  private datagridCell!: AcDatagridCell;
  private datagridColumn!: AcDatagridColumn;
  private datagridRow!: AcDatagridColumn;
  public element: HTMLElement = document.createElement('div');

  private injector: Injector;
  private appRef: ApplicationRef;
  private viewRef?: EmbeddedViewRef<any>;
  private componentRef?: ComponentRef<IAcDatagridCellEditor>;

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

  init(args: IAcDatagridCellElementArgs): void {
    this.datagridApi = args.datagridApi;
    this.datagridCell = args.datagridCell;
    this.datagridColumn = args.datagridCell.datagridColumn;
    this.appRef = this.datagridColumn.columnDefinition.cellRendererElementParams['___appRef___'];
    this.injector = this.datagridColumn.columnDefinition.cellRendererElementParams['___injector___'];

    const colDef = this.datagridCell.datagridColumn.columnDefinition;

    // this.element.classList.add(AcDatagridCssClassName.acDatagridCellEditor);
    this.element.style.height = '100%';
    this.element.style.width = '100%';

    // Decide which to render
    if (colDef.cellEditorTemplateRef) {
      this.renderTemplate(colDef.cellEditorTemplateRef);
    } else if (colDef.cellEditorComponent) {
      const initArgs = {...args};
      delete initArgs['___appRef___'];
      delete initArgs['___injector___'];
      this.renderComponent(colDef.cellEditorComponent,initArgs);
    } else {
      this.renderDefault();
    }
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
  private renderComponent(componentType: Type<IAcDatagridCellEditor>,args: IAcDatagridCellElementArgs) {
    this.clear();

    this.componentRef = createComponent(componentType, {
      environmentInjector: this.injector as any,
    });


    const instance = this.componentRef.instance;
    instance.init(args);

    this.element.appendChild(this.componentRef.location.nativeElement);
  }

  /** Fallback default editor (plain input) */
  private renderDefault() {
    const input = document.createElement('input');
    input.style.width = '100%';
    input.value =
      (this.datagridCell.datagridRow as any).data[
        this.datagridCell.datagridColumn.columnDefinition.field
      ];
    input.addEventListener('input', () => {
      (this.datagridCell.datagridRow as any).data[
        this.datagridCell.datagridColumn.columnDefinition.field
      ] = input.value;
    });
    this.element.appendChild(input);
  }

  getElement(): HTMLElement {
    return this.element;
  }

  getValue(): any {
    return (this.datagridCell.datagridRow as any).data[
      this.datagridCell.datagridColumn.columnDefinition.field
    ];
  }

  focus() {
    const input = this.element.querySelector('input, textarea') as HTMLElement;
    if (input) input.focus();
  }

  blur() {
    const input = this.element.querySelector('input, textarea') as HTMLInputElement;
    if (input) {
      (this.datagridCell.datagridRow as any).data[
        this.datagridCell.datagridColumn.columnDefinition.field
      ] = input.value;
    }
  }

  refresh(args: IAcDatagridCellElementArgs): void {
    this.datagridCell = args.datagridCell;
    if (this.viewRef) this.viewRef.context.row = this.datagridCell.datagridRow;
  }

  destroy(): void {
    if (this.viewRef) this.viewRef.destroy();
    if (this.componentRef) this.componentRef.destroy();
    this.element.remove();
  }
}
