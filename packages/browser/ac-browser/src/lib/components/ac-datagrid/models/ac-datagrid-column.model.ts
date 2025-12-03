/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcEnumSortOrder, AcEvents, AcFilterGroup, AcHooks, Autocode } from "@autocode-ts/autocode";
import { IAcDatagridColumnDefinition } from "../interfaces/ac-datagrid-column-definition.interface";
import { AcEnumDatagridColumnDataType } from "../enums/ac-enum-datagrid-column-data-type.enum";
import { AcDatagridHeaderCellElement } from "../elements/ac-datagrid-header-cell.element";
import { AC_DATAGRID_DEFAULT_COLUMN_DEFINITION } from "../consts/ac-datagrid-default-column-config.const";
import { AcDatagridApi } from "../core/ac-datagrid-api";
import { IAcDatagridColumnHookArgs } from "../interfaces/hook-args/ac-datagrid-column-hook-args.interface";
import { AcEnumDatagridHook } from "../enums/ac-enum-datagrid-hooks.enum";
import { AC_DATAGRID_ATTRIBUTE } from "../consts/ac-datagrid-attribute.const";


export class AcDatagridColumn {
  private _isActive:boolean = false;
    get isActive():boolean{
      return this._isActive;
    }
    set isActive(value:boolean){
      if(value!=this._isActive){
        this._isActive = value;
        if(this.headerCellElement){
          if(value){
            this.headerCellElement.setAttribute(AC_DATAGRID_ATTRIBUTE.acDatagridColumnActive, 'true');
          }
          else{
            this.headerCellElement.removeAttribute(AC_DATAGRID_ATTRIBUTE.acDatagridColumnActive);
          }
        }
      }
    }

  columnId: string = Autocode.uuid();
  columnDefinition!: IAcDatagridColumnDefinition;
  datagridApi!: AcDatagridApi;
  dataType: AcEnumDatagridColumnDataType = AcEnumDatagridColumnDataType.String;
  extensionData: Record<string, any> = {};
  filterGroup: AcFilterGroup = new AcFilterGroup();
  headerCellElement?: AcDatagridHeaderCellElement;
  index: number = -1;
  sortOrder: AcEnumSortOrder = AcEnumSortOrder.None;

  get allowEdit(): boolean {
    return this.columnDefinition.allowEdit == true;
  }
  get allowFilter(): boolean {
    return this.columnDefinition.allowFilter == true;
  }
  get allowFocus(): boolean {
    return this.columnDefinition.allowFocus != false || this.allowEdit;
  }
  get allowResize(): boolean {
    return this.columnDefinition.allowResize == true;
  }
  get allowSort(): boolean {
    return this.columnDefinition.allowSort == undefined || this.columnDefinition.allowSort == true;
  }
  get columnKey(): string {
    return this.columnDefinition.field;
  }
  get isFirst(): boolean {
    return this.getPreviousColumn() == undefined;
  }
  get isLast(): boolean {
    return this.getNextColumn() == undefined;
  }
  get title(): string {
    return this.columnDefinition.title ?? this.columnDefinition.field;
  }

  private _visible: boolean = AC_DATAGRID_DEFAULT_COLUMN_DEFINITION.visible;
  get visible(): boolean {
    return this._visible;
  }
  set visible(value: boolean) {
    this._visible = value;
    // const hookArgs: IAcDatagridColumnHookArgs = {
    //   datagridApi: this.datagridApi,
    //   datagridColumn: this,
    // };
    // this.hooks.execute({ hook: AcEnumDatagridHook.ColumnVisibilityChange, args: hookArgs });
  }


  private _width: number = AC_DATAGRID_DEFAULT_COLUMN_DEFINITION.width;
  get width(): number {
    return this._width;
  }
  set width(value: number) {
    this._width = value;
    const hookArgs: IAcDatagridColumnHookArgs = {
      datagridApi: this.datagridApi,
      datagridColumn: this,
    };
    // this.hooks.execute({ hook: AcEnumDatagridHook.ColumnWidthChange, args: hookArgs });
  }

  constructor({ columnDefinition, datagridApi, index = -1, width = AC_DATAGRID_DEFAULT_COLUMN_DEFINITION.width }: { columnDefinition: IAcDatagridColumnDefinition, datagridApi: AcDatagridApi, index?: number, width?: number }) {
    this.columnDefinition = columnDefinition;
    this.width = width;
    if (columnDefinition.width) {
      this.width = columnDefinition.width;
    }
    if (columnDefinition.visible != undefined) {
      this.visible = columnDefinition.visible;
    }
    this.datagridApi = datagridApi;
    this.index = index;
  }

  getNextColumn({focusable = true}:{focusable?:boolean} = {}):AcDatagridColumn | undefined{
    let column: AcDatagridColumn | undefined;
    for (const col of this.datagridApi.datagridColumns) {
      let isValid:boolean = col.visible;
      if(isValid){
        if(focusable && !col.allowFocus){
          isValid = false;
        }
      }
      if (isValid) {
        if (column) {
          if (col.index < column.index && col.index > this.index) {
            // column = col;1
          }
        }
        else {
          if (col.index > this.index) {
            // column = col;
          }
        }
      }
    }
    return column;
  }

  getPreviousColumn({focusable = true}:{focusable?:boolean} = {}):AcDatagridColumn | undefined {
    let column: AcDatagridColumn | undefined;
    for (const col of this.datagridApi.datagridColumns) {
      let isValid:boolean = col.visible;
      if(isValid){
        if(focusable && !col.allowFocus){
          isValid = false;
        }
      }
      if (isValid) {
        if (column) {
          if (col.index > column.index && col.index < this.index) {
            // column = col;
          }
        }
        else {
          if (col.index < this.index) {
            // column = col;
          }
        }
      }
    }
    return column;
  }

}
