/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDatagridCellElement } from "./ac-datagrid-cell.element";
import { AcDatagridApi } from "../core/ac-datagrid-api";
import { AcDatagridCssClassName } from "../consts/ac-datagrid-css-class-name.const";
import { AC_DATAGRID_TAG, AcDatagridAttributeName, AcEnumDatagridHook, IAcDatagridRowHookArgs } from "../_ac-datagrid.export";
import { AcDatagridRow } from "../models/ac-datagrid-row.model";
import { acAddClassToElement, acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AcElementBase } from "../../../core/ac-element-base";

export class AcDatagridRowElement extends AcElementBase{
  private _datagridApi!: AcDatagridApi;
  get datagridApi():AcDatagridApi{
    return this._datagridApi;
  }
  set datagridApi(value:AcDatagridApi){
    this._datagridApi = value;
    this.initRow();
    // value.on({
    //   event: AcEnumDatagridEvent.RowPositionChange, callback: (event: IAcDatagridRowPositionChangeEvent) => {
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
  }

  private _datagridRow!: AcDatagridRow;
  get datagridRow():AcDatagridRow{
    return this._datagridRow;
  }
  set datagridRow(value:AcDatagridRow){
    value.element = this;
    this._datagridRow = value;
    this.initRow();
  }

  datagridCells: AcDatagridCellElement[] = [];
  swappingRowPosition: boolean = false;
  container:HTMLElement = this.ownerDocument.createElement('div');

  constructor(){
    super();
    this.style.display = 'block';
    this.style.width = 'max-content';
    this.container.style.display = 'flex';
    this.append(this.container);
  }

  initRow(){
    if(this.datagridApi && this.datagridRow){
      this.initElement();
    }
  }

  initElement() {
    this.setAttribute(AcDatagridAttributeName.acDatagridRowId, this.datagridRow.acRowId);
    if (this.datagridRow.index == 0 || this.datagridRow.index % 2 == 0) {
      acAddClassToElement({ class_: AcDatagridCssClassName.acDatagridRowEven, element: this });
    }
    else {
      acAddClassToElement({ class_: AcDatagridCssClassName.acDatagridRowOdd, element: this });
    }
    this.registerListeners();
    this.render();
  }

  registerListeners() {
    this.addEventListener('blur', (e: FocusEvent) => {
      this.datagridApi.eventHandler.handleRowBlur({ datagridRow: this.datagridRow, event: e });
    });
    this.addEventListener('focus', (e: FocusEvent) => {
      this.datagridApi.eventHandler.handleRowFocus({ datagridRow: this.datagridRow, event: e });
    });

    this.addEventListener('keydown', (e: KeyboardEvent) => {
      this.datagridApi.eventHandler.handleRowKeyDown({ datagridRow: this.datagridRow, event: e });
    });
    this.addEventListener('keypress', (e: KeyboardEvent) => {
      this.datagridApi.eventHandler.handleRowKeyPress({ datagridRow: this.datagridRow, event: e });
    });
    this.addEventListener('keyup', (e: KeyboardEvent) => {
      this.datagridApi.eventHandler.handleRowKeyDown({ datagridRow: this.datagridRow, event: e });
    });

    this.addEventListener('click', (e: MouseEvent) => {
      this.datagridApi.eventHandler.handleRowClick({ datagridRow: this.datagridRow, event: e });
    });
    this.addEventListener('dblclick', (e: MouseEvent) => {
      this.datagridApi.eventHandler.handleRowDoubleClick({ datagridRow: this.datagridRow, event: e });
    });
    this.addEventListener('mousedown', (e: MouseEvent) => {
      this.datagridApi.eventHandler.handleRowMouseDown({ datagridRow: this.datagridRow, event: e });
    });
    this.addEventListener('mouseenter', (e: MouseEvent) => {
      this.datagridApi.eventHandler.handleRowMouseEnter({ datagridRow: this.datagridRow, event: e });
    });
    this.addEventListener('mouseleave', (e: MouseEvent) => {
      this.datagridApi.eventHandler.handleRowMouseLeave({ datagridRow: this.datagridRow, event: e });
    });
    this.addEventListener('mousemove', (e: MouseEvent) => {
      this.datagridApi.eventHandler.handleRowMouseMove({ datagridRow: this.datagridRow, event: e });
    });
    this.addEventListener('mouseover', (e: MouseEvent) => {
      this.datagridApi.eventHandler.handleRowMouseOver({ datagridRow: this.datagridRow, event: e });
    });
    this.addEventListener('mouseup', (e: MouseEvent) => {
      this.datagridApi.eventHandler.handleRowMouseUp({ datagridRow: this.datagridRow, event: e });
    });

    this.addEventListener('touchcancel', (e: TouchEvent) => {
      this.datagridApi.eventHandler.handleRowTouchCancel({ datagridRow: this.datagridRow, event: e });
    }, { passive: true });
    this.addEventListener('touchend', (e: TouchEvent) => {
      this.datagridApi.eventHandler.handleRowTouchEnd({ datagridRow: this.datagridRow, event: e });
    }, { passive: true });
    this.addEventListener('touchmove', (e: TouchEvent) => {
      this.datagridApi.eventHandler.handleRowTouchMove({ datagridRow: this.datagridRow, event: e });
    }, { passive: true });
    this.addEventListener('touchstart', (e: TouchEvent) => {
      this.datagridApi.eventHandler.handleRowTouchStart({ datagridRow: this.datagridRow, event: e });
    }, { passive: true });
  }

  render() {
    this.container.innerHTML = "";
    this.datagridCells = [];
    const hookArgs:IAcDatagridRowHookArgs = {
      datagridRow:this.datagridRow,
      datagridApi:this.datagridApi
    };
    this.datagridApi.hooks.execute({hook:AcEnumDatagridHook.BeforeRowCellsCreate,args:hookArgs});
    for (const column of this.datagridApi.datagridColumns) {
      const datagridCell = new AcDatagridCellElement();
      datagridCell.datagridApi = this.datagridApi;
      datagridCell.datagridColumn = column;
      datagridCell.datagridRow = this.datagridRow;
      this.container.append(datagridCell);
      this.datagridCells.push(datagridCell);
    }
    this.datagridApi.hooks.execute({hook:AcEnumDatagridHook.RowCellsCreate,args:hookArgs});
  }
}

acRegisterCustomElement({tag:AC_DATAGRID_TAG.datagridRow,type:AcDatagridRowElement});
