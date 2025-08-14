import { IAcDatagridCellElementArgs } from "./callback-args/ac-datagrid-cell-renderer-element-args.interface";

export interface IAcDatagridCellEditorElement{
  destroy?():void;
  focus?(): void;
  blur?(): void;
  getElement():HTMLElement;
  getValue(): any;
  init(args:IAcDatagridCellElementArgs):void;
  refresh(args:IAcDatagridCellElementArgs):void;
}
