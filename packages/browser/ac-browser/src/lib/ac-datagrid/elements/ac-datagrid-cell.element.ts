/* eslint-disable @typescript-eslint/no-inferrable-types */
import { acAddClassToElement, acRemoveClassFromElement, acSwapElementsWithAnimation } from "../../utils/ac-element-functions";
import { AcDatagridCssClassName } from "../consts/ac-datagrid-css-class-name.const";
import { AcDatagridApi } from "../core/ac-datagrid-api";
import { AcEnumDatagridEvent } from "../enums/ac-enum-datagrid-event.enum";
import { AcDatagridCellEditorElement } from "./ac-datagrid-cell-editor.element";
import { AcDatagridCellRendererElement } from "./ac-datagrid-cell-renderer.element";
import { AcDatagridAttributeName } from "../consts/ac-datagrid-attribute-name.const";
import { IAcDatagridColumnPositionChangeEvent } from "../interfaces/event-args/ac-datagrid-column-position-change-event.interface";
import { IAcDatagridColumnResizeEvent } from "../interfaces/event-args/ac-datagrid-column-resize-event.interface";
import { AcEnumDatagridHook, IAcDatagridCellEditorElementInitEvent, IAcDatagridCellHookArgs, IAcDatagridCellRendererElement, IAcDatagridCellRendererElementInitEvent } from "../_ac-datagrid.export";
import { AcDatagridColumn } from "../models/ac-datagrid-column.model";
import { AcDatagridCell } from "../models/ac-datagrid-cell.model";
import { AcDatagridRow } from "../models/ac-datagrid-row.model";

export class AcDatagridCellElement {
  cellContainer: HTMLElement = document.createElement('div');
  cellEditor?: AcDatagridCellEditorElement;
  cellRenderer!: IAcDatagridCellRendererElement;
  datagridApi: AcDatagridApi;
  datagridCell!: AcDatagridCell;
  datagridColumn!: AcDatagridColumn;
  datagridRow!: AcDatagridRow;
  element: HTMLElement = document.createElement('div');
  isEditing: boolean = false;
  swappingColumpPosition: boolean = false;


  constructor({ datagridApi, datagridRow, datagridColumn }: { datagridApi: AcDatagridApi, datagridRow: AcDatagridRow, datagridColumn: AcDatagridColumn }) {
    this.datagridRow = datagridRow;
    this.datagridColumn = datagridColumn;
    this.datagridApi = datagridApi;
    this.datagridCell = new AcDatagridCell({
      datagridColumn: datagridColumn,
      datagridRow: datagridRow,
      datagridApi:this.datagridApi,
      instance: this
    });
    if (this.datagridColumn.columnDefinition.cellRendererElement) {
      this.cellRenderer = new this.datagridColumn.columnDefinition.cellRendererElement();
      const elementInitEventArgs: IAcDatagridCellRendererElementInitEvent = {
        datagridApi: this.datagridApi,
        datagridCell: this.datagridCell,
        cellRendererElementInstance: this.cellRenderer,
      }
      this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.CellRendererElementInit, args: elementInitEventArgs });
    }
    else if (this.datagridColumn.columnDefinition.cellEditorElement && this.datagridColumn.columnDefinition.useCellEditorForRenderer == true) {
      this.cellRenderer = new this.datagridColumn.columnDefinition.cellEditorElement();
      this.cellEditor = this.cellRenderer as any;
      const elementInitEventArgs: IAcDatagridCellRendererElementInitEvent = {
        datagridApi: this.datagridApi,
        datagridCell: this.datagridCell,
        cellRendererElementInstance: this.cellRenderer,
      }
      this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.CellRendererElementInit, args: elementInitEventArgs });
    }
    else {
      this.cellRenderer = new AcDatagridCellRendererElement();
    }
    this.cellRenderer.init({ datagridApi: this.datagridApi, datagridCell: this.datagridCell });
    this.initElement();
    this.datagridColumn.hooks.subscribe({
      hookName: AcEnumDatagridHook.ColumnWidthChange, callback: (event: IAcDatagridColumnResizeEvent) => {
        this.setCellWidth();
      }
    });
    // this.datagridApi.on({
    //   eventName: AcEnumDatagridEvent.ColumnPositionChange, callback: (event: IAcDatagridColumnPositionChangeEvent) => {
    //     if (event.datagridColumn.acColumnId == this.datagridColumn.acColumnId && !this.swappingColumpPosition && this.datagridRow.instance && this.datagridRow.instance.datagridCells) {
    //       let element1: HTMLElement | undefined;
    //       let element2: HTMLElement | undefined;
    //       for (const datagridCell of this.datagridRow.instance.datagridCells) {
    //         if (datagridCell.datagridColumn.acColumnId == event.datagridColumn.acColumnId) {
    //           element1 = datagridCell.element;
    //         }
    //         else if (datagridCell.datagridColumn.acColumnId == event.oldDatagridColumn.acColumnId) {
    //           element2 = datagridCell.element;
    //         }
    //       }
    //       if (element1 && element2) {
    //         this.swappingColumpPosition = true;
    //         acSwapElementsWithAnimation({ element1: element1, element2: element2, duration: 300 });
    //         setTimeout(() => {
    //           this.swappingColumpPosition = false;
    //         }, 500);
    //       }
    //     }
    //   }
    // });
    const cellCreatedHookArgs: IAcDatagridCellHookArgs = {
      datagridApi: this.datagridApi,
      datagridCell: this.datagridCell,
    };
    this.datagridApi.hooks.execute({ hookName: AcEnumDatagridHook.DatagridCellCreated, args: cellCreatedHookArgs });

  }

  blur(){
    if(this.cellEditor){
      this.datagridCell.cellValue = this.cellEditor.getValue();
    }
  }

  destroy(){
    //
  }

  enterEditMode() {
    if (this.cellEditor == undefined && this.datagridColumn.columnDefinition.useCellEditorForRenderer != true) {
      if (this.datagridColumn.columnDefinition.cellEditorElement) {
        this.cellEditor = new this.datagridColumn.columnDefinition.cellEditorElement();
        const editorInitEventArgs: IAcDatagridCellEditorElementInitEvent = {
          datagridApi: this.datagridApi,
          datagridCell: this.datagridCell,
          cellEditorElementInstance: this.cellEditor,
        }
        this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.CellEditorElementInit, args: editorInitEventArgs });
      }
      else {
        this.cellEditor = new AcDatagridCellEditorElement();
      }
      if (this.cellEditor) {
        this.cellEditor.init({ datagridApi: this.datagridApi, datagridCell: this.datagridCell });
      }
    }
    if(this.cellEditor){
      this.cellContainer.innerHTML = "";
      this.cellContainer.append(this.cellEditor!.getElement());
    }
    acAddClassToElement({ cssClass: AcDatagridCssClassName.acDatagridCellEditing, element: this.element });
    this.element.classList.add(AcDatagridCssClassName.acDatagridCellEditing);
    this.isEditing = true;
  }

  exitEditMode() {
    this.isEditing = false;
    acRemoveClassFromElement({ cssClass: AcDatagridCssClassName.acDatagridCellEditing, element: this.element });
    if(this.cellEditor){
      this.cellContainer.innerHTML = "";
      this.cellRenderer.refresh({ datagridApi: this.datagridApi, datagridCell: this.datagridCell });
      this.cellContainer.append(this.cellRenderer.getElement());
    }
  }

  focus(){
    if(this.cellRenderer && this.cellRenderer.focus){
      this.cellRenderer.focus();
    }
  }


  initElement() {
    this.element.setAttribute(AcDatagridAttributeName.acDatagridCellId, this.datagridCell.acCellId);
    this.element.setAttribute(AcDatagridAttributeName.acDatagridColumnId, this.datagridColumn.acColumnId);
    this.element.setAttribute(AcDatagridAttributeName.acDatagridRowId, this.datagridRow.acRowId);
    acAddClassToElement({ cssClass: AcDatagridCssClassName.acDatagridCell, element: this.element });
    this.element.setAttribute('tabindex', "-1");
    acAddClassToElement({ cssClass: AcDatagridCssClassName.acDatagridCellContainer, element: this.cellContainer });
    this.element.append(this.cellContainer);
    this.cellContainer.style.height = "100%";
    this.cellContainer.style.width = "max-content";
    this.cellContainer.append(this.cellRenderer.getElement());
    this.setCellWidth();
    this.registerEvents();
  }

  registerEvents() {
    this.element.addEventListener('focusout', (e: FocusEvent) => {
      this.datagridApi.eventHandler.handleCellBlur({ datagridCell: this.datagridCell, event: e });
    });
    this.element.addEventListener('focusin', (e: FocusEvent) => {
      this.datagridApi.eventHandler.handleCellFocus({ datagridCell: this.datagridCell, event: e });
      this.focus();
    });
    this.element.addEventListener('keydown', (e: KeyboardEvent) => {
      this.datagridApi.eventHandler.handleCellKeyDown({ datagridCell: this.datagridCell, event: e });
    });
    this.element.addEventListener('keypress', (e: KeyboardEvent) => {
      this.datagridApi.eventHandler.handleCellKeyPress({ datagridCell: this.datagridCell, event: e });
    });
    this.element.addEventListener('keyup', (e: KeyboardEvent) => {
      this.datagridApi.eventHandler.handleCellKeyUp({ datagridCell: this.datagridCell, event: e });
    });

    this.element.addEventListener('click', (e: MouseEvent) => {
      this.datagridApi.eventHandler.handleCellClick({ datagridCell: this.datagridCell, event: e });
    });
    this.element.addEventListener('dblclick', (e: MouseEvent) => {
      this.datagridApi.eventHandler.handleCellDoubleClick({ datagridCell: this.datagridCell, event: e });
    });
    this.element.addEventListener('mousedown', (e: MouseEvent) => {
      this.datagridApi.eventHandler.handleCellMouseDown({ datagridCell: this.datagridCell, event: e });
    });
    this.element.addEventListener('mouseenter', (e: MouseEvent) => {
      this.datagridApi.eventHandler.handleCellMouseEnter({ datagridCell: this.datagridCell, event: e });
      this.datagridApi.hoverCellId = this.datagridCell.acCellId;
      this.datagridApi.hoverColumnId = this.datagridCell.acColumnId;
      this.datagridApi.hoverRowId = this.datagridCell.acRowId;
    });
    this.element.addEventListener('mouseleave', (e: MouseEvent) => {
      this.datagridApi.eventHandler.handleCellMouseLeave({ datagridCell: this.datagridCell, event: e });
      if (this.datagridApi.hoverCellId == this.datagridCell.acCellId) {
          this.datagridApi.hoverCellId = undefined;
          this.datagridApi.hoverColumnId = undefined;
          this.datagridApi.hoverRowId = undefined;
        }
    });
    this.element.addEventListener('mousemove', (e: MouseEvent) => {
      this.datagridApi.eventHandler.handleCellMouseMove({ datagridCell: this.datagridCell, event: e });
    });
    this.element.addEventListener('mouseover', (e: MouseEvent) => {
      this.datagridApi.eventHandler.handleCellMouseOver({ datagridCell: this.datagridCell, event: e });
    });
    this.element.addEventListener('mouseup', (e: MouseEvent) => {
      this.datagridApi.eventHandler.handleCellMouseUp({ datagridCell: this.datagridCell, event: e });
    });

    this.element.addEventListener('touchcancel', (e: TouchEvent) => {
      this.datagridApi.eventHandler.handleCellTouchCancel({ datagridCell: this.datagridCell, event: e });
    }, { passive: true });
    this.element.addEventListener('touchend', (e: TouchEvent) => {
      this.datagridApi.eventHandler.handleCellTouchEnd({ datagridCell: this.datagridCell, event: e });
    }, { passive: true });
    this.element.addEventListener('touchmove', (e: TouchEvent) => {
      this.datagridApi.eventHandler.handleCellTouchMove({ datagridCell: this.datagridCell, event: e });
    }, { passive: true });
    this.element.addEventListener('touchstart', (e: TouchEvent) => {
      this.datagridApi.eventHandler.handleCellTouchStart({ datagridCell: this.datagridCell, event: e });
    }, { passive: true });

  }

  setCellWidth() {
    const width = this.datagridColumn.width;
    // if (this.datagridApi.isTreeData && this.datagridColumn.index == 0) {
    //   // width = width - (AcDatagridDefaultRowConfig.treeChildPadding * this.datagridRow.treeDepth);
    // }
    this.element.style.width = `${width}px`;
  }

}
