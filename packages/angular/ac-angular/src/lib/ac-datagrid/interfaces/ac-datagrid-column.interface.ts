import { TemplateRef } from "@angular/core";
import { IAcDatagridColumnState } from "./ac-datagrid-column-state.interface";
import { AcEnumColumnDataType } from "../enums/ac-column-data-types.enum";

export interface IAcDataGridColumn{
  title?:string,
  field?:string,
  dataType?:AcEnumColumnDataType,
  fieldForEdit?:string,
  allowSort?:boolean,
  allowEdit?:boolean,
  allowSelect?:boolean,
  allowFilter?:boolean,
  component?:any,
  componentProperties?:any,
  conditionalStyle?:any,
  editTemplate?:TemplateRef<any>,
  editComponent?:any,
  editComponentProperties?:any
  index?:number,
  width?:number,
  format?:any,
  formatDateTime?:string,
  formatNumber?:string,
  formatString?:string,
  formula?:any,
  renderTemplate?:TemplateRef<any>,
  style?:any,
  state?:IAcDatagridColumnState,
  template?:TemplateRef<any>

}
