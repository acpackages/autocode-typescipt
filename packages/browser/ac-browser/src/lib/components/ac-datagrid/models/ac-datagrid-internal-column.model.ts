/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcEnumSortOrder, AcFilterGroup, AcHooks, Autocode } from "@autocode-ts/autocode";
import { AC_DATAGRID_DEFAULT_COLUMN_DEFINITION } from "../consts/ac-datagrid-default-column-config.const";

export class AcDatagridInternalColumn {
  columnId: string = Autocode.uuid();
  allowFilter: boolean = false;
  allowResize: boolean = false;
  allowSort: boolean = false;
  extensionData: Record<string, any> = {};
  filterGroup: AcFilterGroup = new AcFilterGroup();
  hooks: AcHooks = new AcHooks();
  index: number = -1;
  sortOrder: AcEnumSortOrder = AcEnumSortOrder.None;
  width: number = 200;

  constructor({ index = -1, width = AC_DATAGRID_DEFAULT_COLUMN_DEFINITION.width }: { index?: number, width?: number }) {
    this.index = index;
    this.width = width;
  }
}
