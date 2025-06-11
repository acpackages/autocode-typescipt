import { AcDatagridCellComponent } from "../components/ac-datagrid-cell/ac-datagrid-cell.component";
import { AcDatagridRowComponent } from "../components/ac-datagrid-row/ac-datagrid-row.component";
import { IAcDataGridColumn } from "./ac-datagrid-column.interface";

export interface IAcDataGridCellEvent{
  index:number,
  column:IAcDataGridColumn,
  field:string,
  rowInstance:AcDatagridRowComponent,
  instance:AcDatagridCellComponent,
  data:any,
  rowIndex:number
}
