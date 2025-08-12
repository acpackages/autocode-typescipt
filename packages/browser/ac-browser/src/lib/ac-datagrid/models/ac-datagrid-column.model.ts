/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcEnumSortOrder, AcFilterGroup, AcHooks, Autocode } from "@autocode-ts/autocode";
import { IAcDatagridColumnDefinition } from "../interfaces/ac-datagrid-column-definition.interface";
import { AcEnumDatagridColumnDataType } from "../enums/ac-enum-datagrid-column-data-type.enum";
import { AcDatagridHeaderCellElement } from "../elements/ac-datagrid-header-cell.element";
import { AcDatagridDefaultColumnConfig } from "../consts/ac-datagrid-default-column-config.const";
import { AcDatagridApi } from "../core/ac-datagrid-api";


export class AcDatagridColumn {
  acColumnId: string = Autocode.uuid();
  columnDefinition!: IAcDatagridColumnDefinition;
  datagridApi!: AcDatagridApi;
  dataType: AcEnumDatagridColumnDataType = AcEnumDatagridColumnDataType.string;
  extensionData: Record<string, any> = {};
  filterGroup: AcFilterGroup = new AcFilterGroup();
  headerCellInstance?: AcDatagridHeaderCellElement;
  hooks: AcHooks = new AcHooks();
  index: number = -1;
  sortOrder: AcEnumSortOrder = AcEnumSortOrder.None;
  width: number = AcDatagridDefaultColumnConfig.width;

  get allowEdit(): boolean {
    return this.columnDefinition.allowEdit == true;
  }
  get allowFilter(): boolean {
    return this.columnDefinition.allowFilter == true;
  }
  get allowResize(): boolean {
    return this.columnDefinition.allowResize == true;
  }
  get allowSort(): boolean {
    return this.columnDefinition.allowSort == undefined || this.columnDefinition.allowSort == true;
  }
  get title(): string {
    return this.columnDefinition.title ?? this.columnDefinition.field;
  }

  constructor({ columnDefinition,datagridApi,index = -1,width = AcDatagridDefaultColumnConfig.width }: { columnDefinition: IAcDatagridColumnDefinition,datagridApi:AcDatagridApi,index?:number,width?:number }) {
    this.columnDefinition = columnDefinition;
    this.datagridApi = datagridApi;
    this.index = index;
    this.width = width;
  }
}
