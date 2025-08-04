import { IAcDatagridCellRendererElementArgs } from "./callback-args/ac-datagrid-cell-renderer-element-args.interface";

export interface IAcDatagridCellEditorElement{
  destroy?():void;
  focus?(): void;
  blur?(): void;
  getElement():HTMLElement;
  getValue(): any;
  init(args:IAcDatagridCellRendererElementArgs):void;
  refresh(args:IAcDatagridCellRendererElementArgs):void;
}
