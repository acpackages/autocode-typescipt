/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDatagridCellElement } from "./ac-datagrid-cell.element";
import { AcDatagridApi } from "../core/ac-datagrid-api";
import { AC_DATAGRID_CLASS_NAME, AcDatagridCssClassName } from "../consts/ac-datagrid-css-class-name.const";
import { AC_DATAGRID_TAG, AcDatagridAttributeName, AcEnumDatagridHook, IAcDatagridRowHookArgs } from "../_ac-datagrid.export";
import { AcDatagridRow } from "../models/ac-datagrid-row.model";
import { acAddClassToElement, acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AcElementBase } from "../../../core/ac-element-base";
import { AcEnumDataManagerHook } from "@autocode-ts/autocode";

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
    //     if (event.datagridRow.rowId == this.datagridRow.rowId && !this.swappingRowPosition) {
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
  initialized:boolean = false;

  override init(){
    super.init();
    this.style.display = 'block';
    this.style.width = 'max-content';
    this.style.height = 'max-content';
    this.container.style.display = 'flex';
    this.container.classList.add(AC_DATAGRID_CLASS_NAME.acDatagridRowContainer);
    this.append(this.container);
    this.registerListeners();
    this.setAttribute(AcDatagridAttributeName.acDatagridRowId, this.datagridRow.rowId);
    if (this.datagridRow.displayIndex == 0 || this.datagridRow.displayIndex % 2 == 0) {
      acAddClassToElement({ class_: AcDatagridCssClassName.acDatagridRowEven, element: this });
    }
    else {
      acAddClassToElement({ class_: AcDatagridCssClassName.acDatagridRowOdd, element: this });
    }
  }

  initRow(){
    if(this.datagridApi && this.datagridRow && !this.initialized){
      this.initialized = true;
      this.initElement();
      this.datagridRow.hooks.subscribe({hook:AcEnumDataManagerHook.DataChange,callback:(args:any)=>{
        // this.refreshCells();
      }});
    }
  }

  initElement() {

    this.render();
  }

  refreshCells(){
    for(const cell of this.datagridCells){
      cell.refresh();
    }
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
      if(column.visible){
        this.container.append(datagridCell);
      }
      this.datagridCells.push(datagridCell);
    }
    this.datagridApi.hooks.execute({hook:AcEnumDatagridHook.RowCellsCreate,args:hookArgs});
  }
}

acRegisterCustomElement({tag:AC_DATAGRID_TAG.datagridRow,type:AcDatagridRowElement});
