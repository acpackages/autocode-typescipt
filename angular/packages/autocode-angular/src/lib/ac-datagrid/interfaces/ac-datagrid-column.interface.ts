import { TemplateRef } from "@angular/core";
import { IAcDatagridColumnState } from "./ac-datagrid-column-state.interface";

export interface IAcDataGridColumn{
  title?:string,
  field?:string,
  fieldForEdit?:string,
  allowSort?:boolean,
  allowFilter?:boolean,
  component?:any,
  componentProperties?:any,
  editComponent?:any,
  editComponentProperties?:any
  index?:number,
  width?:number,
  format?:any,
  formatDateTime?:string,
  formatNumber?:string,
  formatString?:string,
  formula?:any,
  style?:any,
  conditionalStyle?:any,
  state?:IAcDatagridColumnState,
  template?:TemplateRef<any>
}
