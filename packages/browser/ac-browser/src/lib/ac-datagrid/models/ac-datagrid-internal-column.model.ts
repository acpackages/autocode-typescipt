/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcFilterGroup, AcHooks, Autocode } from "@autocode-ts/autocode";
import { AcEnumSortDirection } from "../../enums/ac-enum-sort-direction.enum";
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
  sortDirection: AcEnumSortDirection = AcEnumSortDirection.None;
  width: number = 200;

  constructor({ index = -1, width = AcDatagridDefaultColumnConfig.width }: { index?: number, width?: number }) {
    this.index = index;
    this.width = width;
  }
}
