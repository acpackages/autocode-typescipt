import { IAcDatagridCellRendererElementArgs } from "./callback-args/ac-datagrid-cell-renderer-element-args.interface";

export interface IAcDatagridCellRendererElement{
  destroy?():void;
  getElement():HTMLElement;
  init(args:IAcDatagridCellRendererElementArgs):void;
  refresh(args:IAcDatagridCellRendererElementArgs):void;
}
