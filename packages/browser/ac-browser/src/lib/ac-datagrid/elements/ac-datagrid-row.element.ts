/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDatagridCellElement } from "./ac-datagrid-cell.element";
import { AcDatagridApi } from "../core/ac-datagrid-api";
import { acAddClassToElement, acSwapElementsWithAnimation } from "../../utils/ac-element-functions";
import { AcDatagridCssClassName } from "../consts/ac-datagrid-css-class-name.const";
import { AcDatagridAttributeName, AcEnumDatagridEvent, AcEnumDatagridHook, IAcDatagridRowHookArgs } from "../_ac-datagrid.export";
import { IAcDatagridRowPositionChangeEvent } from "../interfaces/event-args/ac-datagrid-row-position-change-event.interface";
import { AcDatagridRow } from "../models/ac-datagrid-row.model";

export class AcDatagridRowElement {
  private datagridApi: AcDatagridApi;
  datagridCells: AcDatagridCellElement[] = [];
  private datagridRow!: AcDatagridRow;
  element: HTMLElement = document.createElement('div');
  rowWrapper: HTMLElement = document.createElement('div');
  swappingRowPosition: boolean = false;

  constructor({ datagridApi, datagridRow }: { datagridApi: AcDatagridApi, datagridRow: AcDatagridRow }) {
    this.datagridRow = datagridRow;
    this.datagridRow.instance = this;
    this.datagridApi = datagridApi;
    this.datagridApi.on({
      eventName: AcEnumDatagridEvent.RowPositionChange, callback: (event: IAcDatagridRowPositionChangeEvent) => {
        if (event.datagridRow.acRowId == this.datagridRow.acRowId && !this.swappingRowPosition) {
          if (event.datagridRow.instance && event.oldDatagridRow.instance) {
            this.swappingRowPosition = true;
            acSwapElementsWithAnimation({ element1: event.datagridRow.instance.rowWrapper, element2: event.oldDatagridRow.instance.rowWrapper, duration: 300 });
            setTimeout(() => {
              this.swappingRowPosition = false;
            }, 500);
          }
        }
      }
    });
    this.initElement();
  }

  initElement() {
    this.element.setAttribute(AcDatagridAttributeName.acDatagridRowId, this.datagridRow.acRowId);
    acAddClassToElement({ cssClass: AcDatagridCssClassName.acDatagridRowWrapper, element: this.rowWrapper });
    this.rowWrapper.appendChild(this.element);
    acAddClassToElement({ cssClass: AcDatagridCssClassName.acDatagridRow, element: this.element });
    if (this.datagridRow.index == 0 || this.datagridRow.index % 2 == 0) {
      acAddClassToElement({ cssClass: AcDatagridCssClassName.acDatagridRowEven, element: this.element });
    }
    else {
      acAddClassToElement({ cssClass: AcDatagridCssClassName.acDatagridRowOdd, element: this.element });
    }
    if (this.datagridApi.isTreeData) {
      // this.element.setAttribute(AcDatagridAttributeName.acDatagridTreeDepth, `${this.datagridRow.treeDepth}`);
      // this.datagridTree = new AcDatagridTree({ datagridApi: this.datagridApi, datagridRow: this.datagridRow });
      // this.rowWrapper.append(this.datagridTree.element);
      // this.datagridTreeChildrenToggle = new AcDatagridTreeChildrenToggle({ datagridApi: this.datagridApi, datagridRow: this.datagridRow });
      // this.datagridTree.setToggleElement({ element: this.datagridTreeChildrenToggle.element });
    }
    this.registerListeners();
    this.render();
  }

  registerListeners() {
    this.element.addEventListener('blur', (e: FocusEvent) => {
      this.datagridApi.handleRowBlur({ datagridRow: this.datagridRow, event: e });
    });
    this.element.addEventListener('focus', (e: FocusEvent) => {
      this.datagridApi.handleRowFocus({ datagridRow: this.datagridRow, event: e });
    });

    this.element.addEventListener('drag', (e: DragEvent) => {
      this.datagridApi.handleRowDrag({ datagridRow: this.datagridRow, event: e });
    });
    this.element.addEventListener('dragend', (e: DragEvent) => {
      this.datagridApi.handleRowDragEnd({ datagridRow: this.datagridRow, event: e });
    });
    this.element.addEventListener('dragenter', (e: DragEvent) => {
      this.datagridApi.handleRowDragEnter({ datagridRow: this.datagridRow, event: e });
    });
    this.element.addEventListener('dragleave', (e: DragEvent) => {
      this.datagridApi.handleRowDragLeave({ datagridRow: this.datagridRow, event: e });
    });
    this.element.addEventListener('dragover', (e: DragEvent) => {
      this.datagridApi.handleRowDragOver({ datagridRow: this.datagridRow, event: e });
    });
    this.element.addEventListener('dragstart', (e: DragEvent) => {
      this.datagridApi.handleRowDragStart({ datagridRow: this.datagridRow, event: e });
    });
    this.element.addEventListener('drop', (e: DragEvent) => {
      this.datagridApi.handleRowDragDrop({ datagridRow: this.datagridRow, event: e });
    });

    this.element.addEventListener('keydown', (e: KeyboardEvent) => {
      this.datagridApi.handleRowKeyDown({ datagridRow: this.datagridRow, event: e });
    });
    this.element.addEventListener('keypress', (e: KeyboardEvent) => {
      this.datagridApi.handleRowKeyPress({ datagridRow: this.datagridRow, event: e });
    });
    this.element.addEventListener('keyup', (e: KeyboardEvent) => {
      this.datagridApi.handleRowKeyDown({ datagridRow: this.datagridRow, event: e });
    });

    this.element.addEventListener('click', (e: MouseEvent) => {
      this.datagridApi.handleRowClick({ datagridRow: this.datagridRow, event: e });
    });
    this.element.addEventListener('dblclick', (e: MouseEvent) => {
      this.datagridApi.handleRowDoubleClick({ datagridRow: this.datagridRow, event: e });
    });
    this.element.addEventListener('mousedown', (e: MouseEvent) => {
      this.datagridApi.handleRowMouseDown({ datagridRow: this.datagridRow, event: e });
    });
    this.element.addEventListener('mouseenter', (e: MouseEvent) => {
      this.datagridApi.handleRowMouseEnter({ datagridRow: this.datagridRow, event: e });
    });
    this.element.addEventListener('mouseleave', (e: MouseEvent) => {
      this.datagridApi.handleRowMouseLeave({ datagridRow: this.datagridRow, event: e });
    });
    this.element.addEventListener('mousemove', (e: MouseEvent) => {
      this.datagridApi.handleRowMouseMove({ datagridRow: this.datagridRow, event: e });
    });
    this.element.addEventListener('mouseover', (e: MouseEvent) => {
      this.datagridApi.handleRowMouseOver({ datagridRow: this.datagridRow, event: e });
    });
    this.element.addEventListener('mouseup', (e: MouseEvent) => {
      this.datagridApi.handleRowMouseUp({ datagridRow: this.datagridRow, event: e });
    });

    this.element.addEventListener('touchcancel', (e: TouchEvent) => {
      this.datagridApi.handleRowTouchCancel({ datagridRow: this.datagridRow, event: e });
    }, { passive: true });
    this.element.addEventListener('touchend', (e: TouchEvent) => {
      this.datagridApi.handleRowTouchEnd({ datagridRow: this.datagridRow, event: e });
    }, { passive: true });
    this.element.addEventListener('touchmove', (e: TouchEvent) => {
      this.datagridApi.handleRowTouchMove({ datagridRow: this.datagridRow, event: e });
    }, { passive: true });
    this.element.addEventListener('touchstart', (e: TouchEvent) => {
      this.datagridApi.handleRowTouchStart({ datagridRow: this.datagridRow, event: e });
    }, { passive: true });
  }

  render() {
    this.element.innerHTML = "";
    this.datagridCells = [];
    const hookArgs:IAcDatagridRowHookArgs = {
      datagridRow:this.datagridRow,
      datagridApi:this.datagridApi
    };
    this.datagridApi.hooks.execute({hookName:AcEnumDatagridHook.BeforeRowCellsCreated,args:hookArgs});
    // if (this.datagridApi.allowRowDrag && false) {
    //   this.element.append(this.rowDrag.element);
    //   if(this.draggableSortInstance){
    //     this.draggableSortInstance.elementInstance.registerHandle(this.rowDrag.element);
    //   }
    // }
    // if (this.datagridApi.isTreeData && false) {
    //   this.element.append(this.datagridTreeChildrenToggle!.element);
    // }
    for (const column of this.datagridApi.datagridColumns) {
      const datagridCell = new AcDatagridCellElement({ datagridApi: this.datagridApi, datagridRow: this.datagridRow, datagridColumn: column });
      this.element.append(datagridCell.element);
      this.datagridCells.push(datagridCell);
    }
    this.datagridApi.hooks.execute({hookName:AcEnumDatagridHook.RowCellsCreated,args:hookArgs});
  }
}
