import { AcDatagridRowComponent } from "../components/ac-datagrid-row/ac-datagrid-row.component";

export interface IAcDataGridRowEvent{
  data:any;
  index:number,
  instance:AcDatagridRowComponent,
}
