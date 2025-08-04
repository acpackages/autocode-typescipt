/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcFilterGroup, AcHooks, Autocode } from "@autocode-ts/autocode";
import { AcEnumSortDirection } from "../../enums/ac-enum-sort-direction.enum";
import { IAcDatagridColDef } from "../interfaces/ac-datagrid-col-def.interface";
import { AcEnumDatagridColumnDataType } from "../enums/ac-enum-datagrid-column-data-type.enum";
import { AcDatagridHeaderCellElement } from "../elements/ac-datagrid-header-cell.element";
import { AcDatagridDefaultColumnConfig } from "../consts/ac-datagrid-default-column-config.const";
import { AcDatagridApi } from "../core/ac-datagrid-api";


export class AcDatagridColumn {
  acColumnId: string = Autocode.uuid();
  colDef!: IAcDatagridColDef;
  datagridApi!: AcDatagridApi;
  dataType: AcEnumDatagridColumnDataType = AcEnumDatagridColumnDataType.string;
  extensionData: Record<string, any> = {};
  filterGroup: AcFilterGroup = new AcFilterGroup();
  headerCellInstance?: AcDatagridHeaderCellElement;
  hooks: AcHooks = new AcHooks();
  index: number = -1;
  sortDirection: AcEnumSortDirection = AcEnumSortDirection.None;
  width: number = AcDatagridDefaultColumnConfig.width;

  get allowEdit(): boolean {
    return this.colDef.allowEdit == true;
  }
  get allowFilter(): boolean {
    return this.colDef.allowFilter == true;
  }
  get allowResize(): boolean {
    return this.colDef.allowResize == true;
  }
  get allowSort(): boolean {
    return this.colDef.allowSort == undefined || this.colDef.allowSort == true;
  }
  get title(): string {
    return this.colDef.title ?? this.colDef.field;
  }

  constructor({ colDef,datagridApi,index = -1,width = AcDatagridDefaultColumnConfig.width }: { colDef: IAcDatagridColDef,datagridApi:AcDatagridApi,index?:number,width?:number }) {
    this.colDef = colDef;
    this.datagridApi = datagridApi;
    this.index = index;
    this.width = width;
  }
}
