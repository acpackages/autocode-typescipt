/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcEnumSortOrder, AcFilterGroup, AcHooks, Autocode } from "@autocode-ts/autocode";
import { AcDatagridDefaultColumnConfig } from "../consts/ac-datagrid-default-column-config.const";

export class AcDatagridInternalColumn {
  acColumnId: string = Autocode.uuid();
  allowFilter: boolean = false;
  allowResize: boolean = false;
  allowSort: boolean = false;
  extensionData: Record<string, any> = {};
  filterGroup: AcFilterGroup = new AcFilterGroup();
  hooks: AcHooks = new AcHooks();
  index: number = -1;
  sortOrder: AcEnumSortOrder = AcEnumSortOrder.None;
  width: number = 200;

  constructor({ index = -1, width = AcDatagridDefaultColumnConfig.width }: { index?: number, width?: number }) {
    this.index = index;
    this.width = width;
  }
}
