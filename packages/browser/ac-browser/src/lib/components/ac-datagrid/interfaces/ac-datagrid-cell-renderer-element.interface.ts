import { IAcDatagridCellElementArgs } from "./callback-args/ac-datagrid-cell-renderer-element-args.interface";

export interface IAcDatagridCellRenderer{
  destroy?():void;
  focus?(): void;
  blur?(): void;
  getElement():HTMLElement;
  init(args:IAcDatagridCellElementArgs):void;
  refresh(args:IAcDatagridCellElementArgs):void;
}
