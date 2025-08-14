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
    // this.datagridApi.on({
    //   eventName: AcEnumDatagridEvent.RowPositionChange, callback: (event: IAcDatagridRowPositionChangeEvent) => {
    //     if (event.datagridRow.acRowId == this.datagridRow.acRowId && !this.swappingRowPosition) {
    //       if (event.datagridRow.instance && event.oldDatagridRow.instance) {
    //         this.swappingRowPosition = true;
    //         acSwapElementsWithAnimation({ element1: event.datagridRow.instance.rowWrapper, element2: event.oldDatagridRow.instance.rowWrapper, duration: 300 });
    //         setTimeout(() => {
    //           this.swappingRowPosition = false;
    //         }, 500);
    //       }
    //     }
    //   }
    // });
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
    this.registerListeners();
    this.render();
  }

  registerListeners() {
    this.element.addEventListener('blur', (e: FocusEvent) => {
      this.datagridApi.eventHandler.handleRowBlur({ datagridRow: this.datagridRow, event: e });
    });
    this.element.addEventListener('focus', (e: FocusEvent) => {
      this.datagridApi.eventHandler.handleRowFocus({ datagridRow: this.datagridRow, event: e });
    });

    this.element.addEventListener('keydown', (e: KeyboardEvent) => {
      this.datagridApi.eventHandler.handleRowKeyDown({ datagridRow: this.datagridRow, event: e });
    });
    this.element.addEventListener('keypress', (e: KeyboardEvent) => {
      this.datagridApi.eventHandler.handleRowKeyPress({ datagridRow: this.datagridRow, event: e });
    });
    this.element.addEventListener('keyup', (e: KeyboardEvent) => {
      this.datagridApi.eventHandler.handleRowKeyDown({ datagridRow: this.datagridRow, event: e });
    });

    this.element.addEventListener('click', (e: MouseEvent) => {
      this.datagridApi.eventHandler.handleRowClick({ datagridRow: this.datagridRow, event: e });
    });
    this.element.addEventListener('dblclick', (e: MouseEvent) => {
      this.datagridApi.eventHandler.handleRowDoubleClick({ datagridRow: this.datagridRow, event: e });
    });
    this.element.addEventListener('mousedown', (e: MouseEvent) => {
      this.datagridApi.eventHandler.handleRowMouseDown({ datagridRow: this.datagridRow, event: e });
    });
    this.element.addEventListener('mouseenter', (e: MouseEvent) => {
      this.datagridApi.eventHandler.handleRowMouseEnter({ datagridRow: this.datagridRow, event: e });
    });
    this.element.addEventListener('mouseleave', (e: MouseEvent) => {
      this.datagridApi.eventHandler.handleRowMouseLeave({ datagridRow: this.datagridRow, event: e });
    });
    this.element.addEventListener('mousemove', (e: MouseEvent) => {
      this.datagridApi.eventHandler.handleRowMouseMove({ datagridRow: this.datagridRow, event: e });
    });
    this.element.addEventListener('mouseover', (e: MouseEvent) => {
      this.datagridApi.eventHandler.handleRowMouseOver({ datagridRow: this.datagridRow, event: e });
    });
    this.element.addEventListener('mouseup', (e: MouseEvent) => {
      this.datagridApi.eventHandler.handleRowMouseUp({ datagridRow: this.datagridRow, event: e });
    });

    this.element.addEventListener('touchcancel', (e: TouchEvent) => {
      this.datagridApi.eventHandler.handleRowTouchCancel({ datagridRow: this.datagridRow, event: e });
    }, { passive: true });
    this.element.addEventListener('touchend', (e: TouchEvent) => {
      this.datagridApi.eventHandler.handleRowTouchEnd({ datagridRow: this.datagridRow, event: e });
    }, { passive: true });
    this.element.addEventListener('touchmove', (e: TouchEvent) => {
      this.datagridApi.eventHandler.handleRowTouchMove({ datagridRow: this.datagridRow, event: e });
    }, { passive: true });
    this.element.addEventListener('touchstart', (e: TouchEvent) => {
      this.datagridApi.eventHandler.handleRowTouchStart({ datagridRow: this.datagridRow, event: e });
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
