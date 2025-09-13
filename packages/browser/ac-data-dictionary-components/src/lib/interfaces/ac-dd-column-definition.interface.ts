import { IAcDatagridColumnDefinition } from "@autocode-ts/ac-browser";

export interface IAcDDColumnDefinition extends Omit<IAcDatagridColumnDefinition,'field'>{
  exclude?:boolean,
}
