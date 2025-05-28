import { AcDatagridRowComponent } from "../components/ac-datagrid-row/ac-datagrid-row.component";

export interface IAcDataGridRowEvent{
  rowData:any;
  index:number,
  instance:AcDatagridRowComponent,
}
