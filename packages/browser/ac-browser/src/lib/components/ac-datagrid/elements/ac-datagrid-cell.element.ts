/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { acAddClassToElement, acRegisterCustomElement, acRemoveClassFromElement } from "../../../utils/ac-element-functions";
import { AcDatagridCssClassName } from "../consts/ac-datagrid-css-class-name.const";
import { AcDatagridApi } from "../core/ac-datagrid-api";
import { AcEnumDatagridEvent } from "../enums/ac-enum-datagrid-event.enum";
import { AcDatagridCellEditor } from "./ac-datagrid-cell-editor.element";
import { AcDatagridCellRendererElement } from "./ac-datagrid-cell-renderer.element";
import { AcDatagridAttributeName } from "../consts/ac-datagrid-attribute-name.const";
import { IAcDatagridColumnResizeEvent } from "../interfaces/event-args/ac-datagrid-column-resize-event.interface";
import { AcEnumDatagridHook, IAcDatagridCellEditor, IAcDatagridCellEditorElementInitEvent, IAcDatagridCellHookArgs, IAcDatagridCellRenderer, IAcDatagridCellRendererElementInitEvent } from "../_ac-datagrid.export";
import { AcDatagridColumn } from "../models/ac-datagrid-column.model";
import { AcDatagridCell } from "../models/ac-datagrid-cell.model";
import { AcDatagridRow } from "../models/ac-datagrid-row.model";
import { AcElementBase } from "../../../core/ac-element-base";

export class AcDatagridCellElement extends AcElementBase {
  private _datagridApi!: AcDatagridApi;
  get datagridApi(): AcDatagridApi {
    return this._datagridApi;
  }
  set datagridApi(value: AcDatagridApi) {
    this._datagridApi = value;
    this.initCell();
  }

  private _datagridColumn!: AcDatagridColumn;
  get datagridColumn(): AcDatagridColumn {
    return this._datagridColumn;
  }
  set datagridColumn(value: AcDatagridColumn) {
    this._datagridColumn = value;
    value.hooks.subscribe({
      hook: AcEnumDatagridHook.ColumnWidthChange, callback: (event: IAcDatagridColumnResizeEvent) => {
        this.setCellWidth();
      }
    });
    this.initCell();
  }

  private _datagridRow!: AcDatagridRow;
  get datagridRow(): AcDatagridRow {
    return this._datagridRow;
  }
  set datagridRow(value: AcDatagridRow) {
    this._datagridRow = value;
    this.initCell();
  }

  get containerWidth(): number {
    let result: number = 0;
    result = (this.container.firstChild as HTMLElement).getBoundingClientRect().width;
    return result;
  }

  container: HTMLElement = this.ownerDocument.createElement('div');
  cellEditor?: AcDatagridCellEditor;
  cellRenderer!: IAcDatagridCellRenderer;
  activeComponent?:IAcDatagridCellRenderer|IAcDatagridCellEditor;
  checkCellValueChangeTimeout: any;
  datagridCell!: AcDatagridCell;
  isEditing: boolean = false;
  swappingColumpPosition: boolean = false;

  constructor() {
    super();
    this.style.overflow = 'hidden';
  }


  override blur() {
    this.checkCellValueChange(false);
  }

  enterEditMode() {
    this.initEditorElement();
    if (this.cellEditor) {
      this.container.innerHTML = "";
      this.container.append(this.cellEditor.getElement());
      this.activeComponent = this.cellEditor;
    }
    acAddClassToElement({ class_: AcDatagridCssClassName.acDatagridCellEditing, element: this });
    this.classList.add(AcDatagridCssClassName.acDatagridCellEditing);
    this.isEditing = true;
  }

  exitEditMode() {
    this.isEditing = false;
    acRemoveClassFromElement({ class_: AcDatagridCssClassName.acDatagridCellEditing, element: this });
    if (this.cellEditor) {
      this.container.innerHTML = "";
      this.cellRenderer.refresh({ datagridApi: this.datagridApi, datagridCell: this.datagridCell });
      this.activeComponent = this.cellRenderer;
      this.container.append(this.cellRenderer.getElement());
    }
  }

  private initCell() {
    if (!this.datagridCell && this.datagridColumn && this.datagridRow && this.datagridApi) {
      this.datagridCell = new AcDatagridCell({
        datagridColumn: this.datagridColumn,
        datagridRow: this.datagridRow,
        datagridApi: this.datagridApi,
        element: this
      });
      if (this.datagridColumn.columnDefinition.cellRendererElement) {
        this.cellRenderer = new this.datagridColumn.columnDefinition.cellRendererElement();
        const elementInitEventArgs: IAcDatagridCellRendererElementInitEvent = {
          datagridApi: this.datagridApi,
          datagridCell: this.datagridCell,
          cellRendererElementInstance: this.cellRenderer,
        }
        this.datagridApi.events.execute({ event: AcEnumDatagridEvent.CellRendererElementInit, args: elementInitEventArgs });
      }
      else if (this.datagridColumn.columnDefinition.cellEditorElement && this.datagridColumn.columnDefinition.useCellEditorForRenderer == true) {
        this.initEditorElement();
        if (this.cellEditor) {
          this.cellRenderer = this.cellEditor;
        }
      }
      else {
        this.cellRenderer = new AcDatagridCellRendererElement();
      }
      this.cellRenderer.init({ datagridApi: this.datagridApi, datagridCell: this.datagridCell });
      this.activeComponent = this.cellRenderer;
      const cellCreatedHookArgs: IAcDatagridCellHookArgs = {
        datagridApi: this.datagridApi,
        datagridCell: this.datagridCell,
      };
      this.datagridApi.hooks.execute({ hook: AcEnumDatagridHook.DatagridCellCreate, args: cellCreatedHookArgs });
      this.initElement()
    }

  }

  override focus() {
    if (this.datagridColumn.allowEdit) {
      this.enterEditMode();
    }
    this.checkCellValueChange();
    if(this.activeComponent && this.activeComponent.focus){
      this.activeComponent.focus();
    }
  }

  initEditorElement() {
    if (this.cellEditor == undefined) {
      if (this.datagridColumn.columnDefinition.cellEditorElement) {
        this.cellEditor = new this.datagridColumn.columnDefinition.cellEditorElement();
      }
      else {
        this.cellEditor = new AcDatagridCellEditor();
      }
      if (this.cellEditor) {
        this.cellEditor.init({ datagridApi: this.datagridApi, datagridCell: this.datagridCell });
        this.cellEditor.getElement().addEventListener('blur',()=>{
          (this.datagridCell.datagridRow as any).data[this.datagridCell.datagridColumn.columnDefinition.field] = this.cellEditor!.getValue();
        });
        const editorInitEventArgs: IAcDatagridCellEditorElementInitEvent = {
          datagridApi: this.datagridApi,
          datagridCell: this.datagridCell,
          cellEditorElementInstance: this.cellEditor,
        }
        this.datagridApi.events.execute({ event: AcEnumDatagridEvent.CellEditorElementInit, args: editorInitEventArgs });
      }
    }
  }

  initElement() {
    this.setAttribute(AcDatagridAttributeName.acDatagridCellId, this.datagridCell.acCellId);
    this.setAttribute(AcDatagridAttributeName.acDatagridColumnId, this.datagridColumn.acColumnId);
    this.setAttribute(AcDatagridAttributeName.acDatagridRowId, this.datagridRow.acRowId);
    this.setAttribute('tabindex', "0");
    acAddClassToElement({ class_: AcDatagridCssClassName.acDatagridCellContainer, element: this.container });
    this.append(this.container);
    this.container.setAttribute('style','display:contents');
    this.container.append(this.cellRenderer.getElement());
    this.setCellWidth();
    this.setCellFocusable();
    this.registerEvents();
  }

  registerEvents() {
    this.addEventListener('focusout', (e: FocusEvent) => {
      this.datagridApi.eventHandler.handleCellBlur({ datagridCell: this.datagridCell, event: e });
    });
    this.addEventListener('focusin', (e: FocusEvent) => {
      this.datagridApi.eventHandler.handleCellFocus({ datagridCell: this.datagridCell, event: e });
    });
    this.addEventListener('keydown', (e: KeyboardEvent) => {
      this.datagridApi.eventHandler.handleCellKeyDown({ datagridCell: this.datagridCell, event: e });
    });
    this.addEventListener('keypress', (e: KeyboardEvent) => {
      this.datagridApi.eventHandler.handleCellKeyPress({ datagridCell: this.datagridCell, event: e });
    });
    this.addEventListener('keyup', (e: KeyboardEvent) => {
      this.datagridApi.eventHandler.handleCellKeyUp({ datagridCell: this.datagridCell, event: e });
      this.checkCellValueChange();
    });

    this.addEventListener('click', (e: MouseEvent) => {
      this.datagridApi.eventHandler.handleCellClick({ datagridCell: this.datagridCell, event: e });
      this.checkCellValueChange();
    });
    this.addEventListener('dblclick', (e: MouseEvent) => {
      this.datagridApi.eventHandler.handleCellDoubleClick({ datagridCell: this.datagridCell, event: e });
      this.checkCellValueChange();
    });
    this.addEventListener('mousedown', (e: MouseEvent) => {
      this.datagridApi.eventHandler.handleCellMouseDown({ datagridCell: this.datagridCell, event: e });
    });
    this.addEventListener('mouseenter', (e: MouseEvent) => {
      this.datagridApi.eventHandler.handleCellMouseEnter({ datagridCell: this.datagridCell, event: e });
      this.datagridApi.hoverCellId = this.datagridCell.acCellId;
      this.datagridApi.hoverColumnId = this.datagridCell.acColumnId;
      this.datagridApi.hoverRowId = this.datagridCell.acRowId;
    });
    this.addEventListener('mouseleave', (e: MouseEvent) => {
      this.datagridApi.eventHandler.handleCellMouseLeave({ datagridCell: this.datagridCell, event: e });
      if (this.datagridApi.hoverCellId == this.datagridCell.acCellId) {
        this.datagridApi.hoverCellId = undefined;
        this.datagridApi.hoverColumnId = undefined;
        this.datagridApi.hoverRowId = undefined;
      }
    });
    this.addEventListener('mousemove', (e: MouseEvent) => {
      this.datagridApi.eventHandler.handleCellMouseMove({ datagridCell: this.datagridCell, event: e });
    });
    this.addEventListener('mouseover', (e: MouseEvent) => {
      this.datagridApi.eventHandler.handleCellMouseOver({ datagridCell: this.datagridCell, event: e });
    });
    this.addEventListener('mouseup', (e: MouseEvent) => {
      this.datagridApi.eventHandler.handleCellMouseUp({ datagridCell: this.datagridCell, event: e });
      this.checkCellValueChange();
    });

    this.addEventListener('touchcancel', (e: TouchEvent) => {
      this.datagridApi.eventHandler.handleCellTouchCancel({ datagridCell: this.datagridCell, event: e });
    }, { passive: true });
    this.addEventListener('touchend', (e: TouchEvent) => {
      this.datagridApi.eventHandler.handleCellTouchEnd({ datagridCell: this.datagridCell, event: e });
      this.checkCellValueChange();
    }, { passive: true });
    this.addEventListener('touchmove', (e: TouchEvent) => {
      this.datagridApi.eventHandler.handleCellTouchMove({ datagridCell: this.datagridCell, event: e });
    }, { passive: true });
    this.addEventListener('touchstart', (e: TouchEvent) => {
      this.datagridApi.eventHandler.handleCellTouchStart({ datagridCell: this.datagridCell, event: e });
    }, { passive: true });

  }

  setCellWidth() {
    const width = this.datagridColumn.width;
    // if (this.datagridApi.isTreeData && this.datagridColumn.index == 0) {
    //   // width = width - (AcDatagridDefaultRowConfig.treeChildPadding * this.datagridRow.treeDepth);
    // }
    this.style.width = `${width}px`;
    this.style.maxWidth = `${width}px`;
    this.style.minWidth = `${width}px`;
  }

  setCellFocusable(){
    if(this.datagridColumn.allowFocus){
      this.setAttribute('tabindex', "0");
    }
    else{
      this.removeAttribute('tabindex');
    }
  }

  private checkCellValueChange(delayCheck: boolean = true) {
    const checkFunction: Function = () => {
      if (this.cellEditor && this.datagridCell.cellValue != this.cellEditor.getValue()) {
        this.datagridCell.cellValue = this.cellEditor.getValue();
      }
    };
    if (this.checkCellValueChangeTimeout) {
      clearTimeout(this.checkCellValueChangeTimeout);
    }
    if (delayCheck) {
      this.checkCellValueChangeTimeout = setTimeout(checkFunction, 500);
    }
    else {
      checkFunction();
    }

  }

}

acRegisterCustomElement({ tag: 'ac-datagrid-cell', type: AcDatagridCellElement });
